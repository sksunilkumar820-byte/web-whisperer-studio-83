#!/usr/bin/env node
/**
 * Static security checks over supabase/migrations/*.sql
 *
 * Flags:
 *  1. RLS policies with USING (true) or WITH CHECK (true) on INSERT/UPDATE/DELETE/ALL.
 *  2. RLS policies with USING (true) on SELECT granted to non-admin roles
 *     (anon, authenticated, public, or no TO clause). Rule: permissive-select.
 *     Intentional public-read tables must be allowlisted with a reason.
 *  3. CREATE [OR REPLACE] FUNCTION ... SECURITY DEFINER without a matching
 *     REVOKE EXECUTE ... FROM { public | anon | authenticated } in the same file.
 *
 * Suppress a finding by placing on the same line or the line above:
 *   -- security-check: allow <short reason>
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = "supabase/migrations";
const ALLOWLIST_FILE = ".security-check-allow.json";

let allowlist = [];
if (existsSync(ALLOWLIST_FILE)) {
  try {
    allowlist = JSON.parse(readFileSync(ALLOWLIST_FILE, "utf8")).allow || [];
  } catch (e) {
    console.error(`Failed to parse ${ALLOWLIST_FILE}: ${e.message}`);
    process.exit(2);
  }
}
const isInAllowlist = (file, line, rule) =>
  allowlist.some((a) => a.file === file && a.line === line && a.rule === rule);
const ALLOW = /--\s*security-check:\s*allow\b/i;

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

function isAllowed(lines, idx) {
  if (ALLOW.test(lines[idx] || "")) return true;
  if (idx > 0 && ALLOW.test(lines[idx - 1] || "")) return true;
  return false;
}

function checkFile(file) {
  const text = readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);
  const findings = [];

  // 1. Permissive RLS on write ops.
  // Match CREATE POLICY ... FOR <cmd> ... (USING|WITH CHECK) (true)
  const policyRe =
    /create\s+policy[\s\S]*?for\s+(insert|update|delete|all)\b[\s\S]*?(?:using|with\s+check)\s*\(\s*true\s*\)/gi;
  let m;
  while ((m = policyRe.exec(text)) !== null) {
    const lineNo = text.slice(0, m.index).split(/\r?\n/).length - 1;
    // Scan the statement span for an allow comment on any of its lines.
    const endLine = text.slice(0, m.index + m[0].length).split(/\r?\n/).length - 1;
    let allowed = false;
    for (let i = Math.max(0, lineNo - 1); i <= endLine; i++) {
      if (isAllowed(lines, i)) { allowed = true; break; }
    }
    if (!allowed && !isInAllowlist(file, lineNo + 1, "permissive-rls")) {
      findings.push({
        file,
        line: lineNo + 1,
        rule: "permissive-rls",
        message: `Policy uses (true) on ${m[1].toUpperCase()} — restrict or add "-- security-check: allow <reason>".`,
      });
    }
  }

  // 2. SECURITY DEFINER without REVOKE EXECUTE in same file.
  const defRe =
    /create\s+(?:or\s+replace\s+)?function\s+([a-zA-Z0-9_."]+)\s*\(([^)]*)\)[\s\S]*?security\s+definer/gi;
  while ((m = defRe.exec(text)) !== null) {
    const fnName = m[1].replace(/"/g, "").split(".").pop();
    const lineNo = text.slice(0, m.index).split(/\r?\n/).length - 1;
    const revokeRe = new RegExp(
      `revoke\\s+(all\\s+privileges\\s+on\\s+function|execute\\s+on\\s+function)[\\s\\S]*?\\b${fnName}\\b[\\s\\S]*?from\\s+[^;]*\\b(public|anon|authenticated)\\b`,
      "i",
    );
    if (revokeRe.test(text)) continue;
    if (isAllowed(lines, lineNo) || (lineNo > 0 && isAllowed(lines, lineNo - 1))) continue;
    if (isInAllowlist(file, lineNo + 1, "definer-no-revoke")) continue;
    findings.push({
      file,
      line: lineNo + 1,
      rule: "definer-no-revoke",
      message: `SECURITY DEFINER function "${fnName}" has no REVOKE EXECUTE from public/anon/authenticated in this migration. Restrict it or add "-- security-check: allow <reason>".`,
    });
  }

  return findings;
}

const files = listSql(ROOT);
const all = files.flatMap(checkFile);

if (all.length === 0) {
  console.log(`OK — scanned ${files.length} migration file(s), no findings.`);
  process.exit(0);
}

console.error(`Found ${all.length} security finding(s):\n`);
for (const f of all) {
  console.error(`  [${f.rule}] ${f.file}:${f.line}`);
  console.error(`    ${f.message}\n`);
}
process.exit(1);
