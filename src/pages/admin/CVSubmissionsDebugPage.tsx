import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Loader2, RefreshCw, Download, FileX, FileCheck, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
};

type Row = Inquiry & {
  isCvDrop: boolean;
  filePath: string | null;
  cleanMessage: string;
  fileStatus: "pending" | "ok" | "missing" | "none";
};

const FILE_RE = /\[File:\s*([^\]]+)\]/;

const parseRow = (i: Inquiry): Row => {
  const isCvDrop = i.message.startsWith("[CV Drop]");
  const match = i.message.match(FILE_RE);
  const filePath = match ? match[1].trim() : null;
  const cleanMessage = i.message
    .replace(/^\[CV Drop\]\s*/, "")
    .replace(FILE_RE, "")
    .trim();
  return {
    ...i,
    isCvDrop,
    filePath,
    cleanMessage,
    fileStatus: filePath ? "pending" : "none",
  };
};

const DEFAULT_BATCH_SIZE = 5;
const MIN_BATCH = 1;
const MAX_BATCH = 20;

const CVSubmissionsDebugPage = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [verifyProgress, setVerifyProgress] = useState({ done: 0, total: 0 });
  const [batchSize, setBatchSize] = useState<number>(DEFAULT_BATCH_SIZE);
  const { toast } = useToast();

  const verifyInBatches = async (parsed: Row[], size: number) => {
    const toCheck = parsed.filter((r) => r.filePath);
    setVerifyProgress({ done: 0, total: toCheck.length });
    if (toCheck.length === 0) return;

    const statusByPath = new Map<string, "ok" | "missing">();
    let done = 0;

    for (let i = 0; i < toCheck.length; i += BATCH_SIZE) {
      const batch = toCheck.slice(i, i + BATCH_SIZE);
      const results = await Promise.all(
        batch.map(async (r) => {
          const { data: signed, error: sErr } = await supabase.storage
            .from("cv-uploads")
            .createSignedUrl(r.filePath!, 60);
          return {
            path: r.filePath!,
            status: (!sErr && signed?.signedUrl ? "ok" : "missing") as "ok" | "missing",
          };
        })
      );
      results.forEach((res) => statusByPath.set(res.path, res.status));
      done += batch.length;
      setVerifyProgress({ done, total: toCheck.length });
      // Apply progressive update so UI reflects partial results
      setRows((prev) =>
        prev.map((r) =>
          r.filePath && statusByPath.has(r.filePath)
            ? { ...r, fileStatus: statusByPath.get(r.filePath)! }
            : r
        )
      );
    }
  };

  const load = async () => {
    setRefreshing(true);
    const { data, error } = await supabase
      .from("contact_inquiries")
      .select("id, name, email, phone, message, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      toast({ title: "Failed to load", description: error.message, variant: "destructive" });
      setLoading(false);
      setRefreshing(false);
      return;
    }

    const parsed = (data ?? []).map(parseRow);
    setRows(parsed);
    setLoading(false);

    await verifyInBatches(parsed);
    setRefreshing(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDownload = async (path: string) => {
    const { data, error } = await supabase.storage
      .from("cv-uploads")
      .createSignedUrl(path, 60);
    if (error || !data?.signedUrl) {
      toast({ title: "Download failed", description: error?.message ?? "No URL", variant: "destructive" });
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const cvCount = rows.filter((r) => r.isCvDrop).length;
  const withFile = rows.filter((r) => r.fileStatus === "ok").length;
  const broken = rows.filter((r) => r.fileStatus === "missing").length;

  const verifying = verifyProgress.total > 0 && verifyProgress.done < verifyProgress.total;
  const verifyPct = verifyProgress.total ? (verifyProgress.done / verifyProgress.total) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold">CV Submissions Debug</h2>
          <p className="text-sm text-muted-foreground">
            End-to-end verification: form → database → storage. Showing latest 50 inquiries.
          </p>
        </div>
        <Button onClick={load} disabled={refreshing} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {verifying && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Verifying file storage in batches…</span>
            <span>{verifyProgress.done} / {verifyProgress.total}</span>
          </div>
          <Progress value={verifyPct} className="h-2" />
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Inquiries</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{rows.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">CV Drops</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{cvCount}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Files OK</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-primary">{withFile}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Broken Links</CardTitle></CardHeader>
          <CardContent><div className={`text-2xl font-bold ${broken > 0 ? "text-destructive" : ""}`}>{broken}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : rows.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No submissions yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>When</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Name / Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>File</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(r.created_at), { addSuffix: true })}
                      </TableCell>
                      <TableCell>
                        {r.isCvDrop ? (
                          <Badge variant="default">CV Drop</Badge>
                        ) : (
                          <Badge variant="secondary">Contact</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{r.name}</div>
                        <a href={`mailto:${r.email}`} className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1">
                          <Mail className="h-3 w-3" />{r.email}
                        </a>
                      </TableCell>
                      <TableCell className="text-sm">{r.phone || "—"}</TableCell>
                      <TableCell>
                        {r.fileStatus === "none" && <span className="text-xs text-muted-foreground">No file</span>}
                        {r.fileStatus === "pending" && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                        {r.fileStatus === "ok" && r.filePath && (
                          <Button size="sm" variant="outline" onClick={() => handleDownload(r.filePath!)}>
                            <Download className="h-3 w-3 mr-1" />
                            <FileCheck className="h-3 w-3 mr-1 text-primary" />
                            Open
                          </Button>
                        )}
                        {r.fileStatus === "missing" && (
                          <Badge variant="destructive" className="gap-1">
                            <FileX className="h-3 w-3" />Missing
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="text-sm line-clamp-2">{r.cleanMessage || "—"}</div>
                        {r.filePath && (
                          <code className="text-[10px] text-muted-foreground break-all">{r.filePath}</code>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CVSubmissionsDebugPage;
