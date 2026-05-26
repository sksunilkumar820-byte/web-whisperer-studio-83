#!/usr/bin/env node
/**
 * Static security checks over supabase/migrations/*.sql
 *
 * Rules:
 *  - permissive-rls       : USING/WITH CHECK (true) on INSERT/UPDATE/DELETE/ALL
 *  - permissive-select    : SELECT USING (true) granted to non-privileged roles
 *  - definer-no-revoke    : SECURITY DEFINER fn with no REVOKE EXECUTE from public/anon/authenticated
 *
 * Every detection is reported. Each detection has one of:
 *  - status="unsuppressed"          → counts toward failure
 *  - status="suppressed-comment"    → matched an inline `-- security-check: allow <reason>`
 *  - status="suppressed-allowlist"  → matched .security-check-allow.json entry
 *
 * Outputs (also written when there are zero findings):
 *  - reports/db-security/findings.json
 *  - reports/db-security/findings.html
 *
 * Exit codes: 0 if no unsuppressed findings; 1 otherwise; 2 on tool error.
 */
import { readFileSync, readdirSync, statSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";

const ROOT = "supabase/migrations";
const ALLOWLIST_FILE = ".security-check-allow.json";
const OUT_DIR = "reports/db-security";
const OUT_JSON = join(OUT_DIR, "findings.json");
const OUT_HTML = join(OUT_DIR, "findings.html");

let allowlist = [];
if (existsSync(ALLOWLIST_FILE)) {
  try {
    allowlist = JSON.parse(readFileSync(ALLOWLIST_FILE, "utf8")).allow || [];
  } catch (e) {
    console.error(`Failed to parse ${ALLOWLIST_FILE}: ${e.message}`);
    process.exit(2);
  }
}
const findAllowlistEntry = (file, line, rule) =>
  allowlist.find((a) => a.file === file && a.line === line && a.rule === rule);
const ALLOW = /--\s*security-check:\s*allow\s*(.*)$/i;

function listSql(dir) {
  let out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out = out.concat(listSql(p));
    else if (name.endsWith(".sql")) out.push(p);
  }
  return out;
}

// Look for an allow comment on any line in [start, end]; return reason or null.
function findAllowComment(lines, start, end) {
  for (let i = Math.max(0, start - 1); i <= end; i++) {
    const mm = (lines[i] || "").match(ALLOW);
    if (mm) return (mm[1] || "").trim() || "(no reason given)";
  }
  return null;
}

function classify(file, lineNo, rule, lines, startLine, endLine) {
  const inline = findAllowComment(lines, startLine, endLine);
  if (inline !== null) {
    return { status: "suppressed-comment", suppressionReason: inline };
  }
  const entry = findAllowlistEntry(file, lineNo, rule);
  if (entry) {
    return { status: "suppressed-allowlist", suppressionReason: entry.reason || "(no reason given)" };
  }
  return { status: "unsuppressed", suppressionReason: null };
}

function checkFile(file) {
  const text = readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);
  const findings = [];
  let m;

  // 1. Permissive RLS on write ops.
  const policyRe =
    /create\s+policy[\s\S]*?for\s+(insert|update|delete|all)\b[\s\S]*?(?:using|with\s+check)\s*\(\s*true\s*\)/gi;
  while ((m = policyRe.exec(text)) !== null) {
    const startLine = text.slice(0, m.index).split(/\r?\n/).length - 1;
    const endLine = text.slice(0, m.index + m[0].length).split(/\r?\n/).length - 1;
    const lineNo = startLine + 1;
    const rule = "permissive-rls";
    findings.push({
      file, line: lineNo, rule,
      message: `Policy uses (true) on ${m[1].toUpperCase()} — restrict or add "-- security-check: allow <reason>".`,
      ...classify(file, lineNo, rule, lines, startLine, endLine),
    });
  }

  // 1b. Permissive SELECT (true) granted to non-privileged roles.
  const selectRe =
    /create\s+policy\s+[^;]*?for\s+select\b([^;]*?)using\s*\(\s*true\s*\)/gi;
  while ((m = selectRe.exec(text)) !== null) {
    const between = m[1];
    const toMatch = between.match(/\bto\s+([a-z_,\s"]+?)(?=\busing\b|$)/i);
    const roles = toMatch
      ? toMatch[1].split(",").map((r) => r.trim().replace(/"/g, "").toLowerCase()).filter(Boolean)
      : ["public"];
    const privileged = new Set(["service_role", "postgres", "supabase_admin"]);
    if (roles.length > 0 && roles.every((r) => privileged.has(r))) continue;

    const startLine = text.slice(0, m.index).split(/\r?\n/).length - 1;
    const endLine = text.slice(0, m.index + m[0].length).split(/\r?\n/).length - 1;
    const lineNo = startLine + 1;
    const rule = "permissive-select";
    findings.push({
      file, line: lineNo, rule, roles,
      message: `SELECT policy uses USING (true) for role(s) [${roles.join(", ")}] — restrict via has_role()/auth.uid(), or add "-- security-check: allow <reason>" for intentional public reads.`,
      ...classify(file, lineNo, rule, lines, startLine, endLine),
    });
  }

  // 2. SECURITY DEFINER without REVOKE EXECUTE in same file.
  const defRe =
    /create\s+(?:or\s+replace\s+)?function\s+([a-zA-Z0-9_."]+)\s*\(([^)]*)\)[\s\S]*?security\s+definer/gi;
  while ((m = defRe.exec(text)) !== null) {
    const fnName = m[1].replace(/"/g, "").split(".").pop();
    const startLine = text.slice(0, m.index).split(/\r?\n/).length - 1;
    const lineNo = startLine + 1;
    const revokeRe = new RegExp(
      `revoke\\s+(all\\s+privileges\\s+on\\s+function|execute\\s+on\\s+function)[\\s\\S]*?\\b${fnName}\\b[\\s\\S]*?from\\s+[^;]*\\b(public|anon|authenticated)\\b`,
      "i",
    );
    if (revokeRe.test(text)) continue;
    const rule = "definer-no-revoke";
    findings.push({
      file, line: lineNo, rule, function: fnName,
      message: `SECURITY DEFINER function "${fnName}" has no REVOKE EXECUTE from public/anon/authenticated in this migration. Restrict it or add "-- security-check: allow <reason>".`,
      ...classify(file, lineNo, rule, lines, startLine, startLine),
    });
  }

  return findings;
}

const files = listSql(ROOT);
const all = files.flatMap(checkFile);

const summary = {
  generatedAt: new Date().toISOString(),
  scannedFiles: files.length,
  totals: {
    all: all.length,
    unsuppressed: all.filter((f) => f.status === "unsuppressed").length,
    suppressedByComment: all.filter((f) => f.status === "suppressed-comment").length,
    suppressedByAllowlist: all.filter((f) => f.status === "suppressed-allowlist").length,
  },
  findings: all,
};

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_JSON, JSON.stringify(summary, null, 2));

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const badge = (status) => {
  const color =
    status === "unsuppressed" ? "#b91c1c" :
    status === "suppressed-comment" ? "#0369a1" :
    "#15803d";
  return `<span style="background:${color};color:#fff;padding:2px 8px;border-radius:999px;font-size:12px">${esc(status)}</span>`;
};
const rows = all
  .slice()
  .sort((a, b) => (a.status === b.status ? 0 : a.status === "unsuppressed" ? -1 : 1))
  .map(
    (f) => `<tr>
      <td>${badge(f.status)}</td>
      <td><code>${esc(f.rule)}</code></td>
      <td><code>${esc(f.file)}:${f.line}</code></td>
      <td>${esc(f.message)}</td>
      <td>${f.suppressionReason ? esc(f.suppressionReason) : ""}</td>
    </tr>`,
  )
  .join("\n");

const html = `<!doctype html><html><head><meta charset="utf-8"><title>DB Security Findings</title>
<style>
body{font-family:system-ui,sans-serif;margin:24px;color:#0f172a}
h1{margin:0 0 4px}
.meta{color:#64748b;margin-bottom:16px;font-size:14px}
.cards{display:flex;gap:12px;margin:16px 0}
.card{flex:1;background:#f1f5f9;padding:12px 16px;border-radius:8px}
.card .n{font-size:24px;font-weight:600}
.card .l{font-size:12px;color:#475569;text-transform:uppercase;letter-spacing:.05em}
table{border-collapse:collapse;width:100%;font-size:14px}
th,td{text-align:left;padding:8px 10px;border-bottom:1px solid #e2e8f0;vertical-align:top}
th{background:#f8fafc;font-weight:600}
code{font-family:ui-monospace,Menlo,monospace;font-size:12px;background:#f1f5f9;padding:1px 4px;border-radius:3px}
</style></head><body>
<h1>DB Security Findings</h1>
<div class="meta">Generated ${esc(summary.generatedAt)} • Scanned ${summary.scannedFiles} migration file(s)</div>
<div class="cards">
  <div class="card"><div class="n">${summary.totals.all}</div><div class="l">Total</div></div>
  <div class="card" style="background:#fee2e2"><div class="n">${summary.totals.unsuppressed}</div><div class="l">Unsuppressed</div></div>
  <div class="card" style="background:#dbeafe"><div class="n">${summary.totals.suppressedByComment}</div><div class="l">Inline-comment suppressed</div></div>
  <div class="card" style="background:#dcfce7"><div class="n">${summary.totals.suppressedByAllowlist}</div><div class="l">Allowlist suppressed</div></div>
</div>
${all.length === 0 ? "<p>No findings.</p>" : `<table>
<thead><tr><th>Status</th><th>Rule</th><th>Location</th><th>Message</th><th>Suppression reason</th></tr></thead>
<tbody>${rows}</tbody></table>`}
</body></html>`;
writeFileSync(OUT_HTML, html);

// Console output
console.log(
  `Scanned ${files.length} migration file(s). ` +
    `Total findings: ${summary.totals.all} ` +
    `(unsuppressed: ${summary.totals.unsuppressed}, ` +
    `comment-suppressed: ${summary.totals.suppressedByComment}, ` +
    `allowlisted: ${summary.totals.suppressedByAllowlist}).`,
);
console.log(`Report: ${OUT_JSON}`);
console.log(`Report: ${OUT_HTML}`);

if (summary.totals.unsuppressed > 0) {
  console.error(`\n${summary.totals.unsuppressed} unsuppressed finding(s):`);
  for (const f of all.filter((x) => x.status === "unsuppressed")) {
    console.error(`  [${f.rule}] ${f.file}:${f.line}\n    ${f.message}`);
  }
  process.exit(1);
}
process.exit(0);
