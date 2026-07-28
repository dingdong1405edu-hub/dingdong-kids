"use client";
import { useMemo, useRef, useState } from "react";
import { Upload, FileSpreadsheet, ClipboardPaste, Download, AlertTriangle, ImageOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { VocabSectionContent } from "@/lib/roadmap-content";

type Word = VocabSectionContent["words"][number];

interface RawRow {
  word: string;
  ipa: string;
  meaning: string;
  partOfSpeech: string;
  imageUrl: string;
  exSentence: string;
  exMeaning: string;
}
interface PreviewRow extends RawRow {
  valid: boolean;
}

const HEADER_RE = /word|từ|ipa|phiên âm|nghĩa|meaning|loại|ảnh|image/i;
/** Có ít nhất một chữ cái Latin → coi như đây là một từ tiếng Anh. */
const hasLetters = (s: string) => /[a-zA-Z]/.test(s);

function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else quoted = false;
      } else cur += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out;
}

/** Cột: 0 từ · 1 IPA · 2 nghĩa · 3 từ loại · 4 link ảnh · 5 câu ví dụ · 6 nghĩa ví dụ. */
function rowsFromMatrix(matrix: unknown[][]): RawRow[] {
  const cleaned = matrix
    .map((r) => (Array.isArray(r) ? r.map((c) => (c == null ? "" : String(c)).trim()) : []))
    .filter((r) => r.some((c) => c !== ""));
  if (cleaned.length === 0) return [];
  let start = 0;
  const first = cleaned[0];
  if (first && HEADER_RE.test(first.join(" ")) && !first[0]?.includes(" ")) start = 1;
  return cleaned.slice(start).map((c) => ({
    word: c[0] ?? "",
    ipa: c[1] ?? "",
    meaning: c[2] ?? "",
    partOfSpeech: c[3] ?? "",
    imageUrl: c[4] ?? "",
    exSentence: c[5] ?? "",
    exMeaning: c[6] ?? "",
  }));
}

function parsePasted(text: string): RawRow[] {
  const matrix = text
    .split(/\r?\n/)
    .map((line) => (line.includes("\t") ? line.split("\t") : splitCsvLine(line)));
  return rowsFromMatrix(matrix);
}

function finalize(rows: RawRow[]): PreviewRow[] {
  return rows.map((r) => ({
    ...r,
    valid: r.word !== "" && r.meaning !== "" && hasLetters(r.word),
  }));
}

const SAMPLE_CSV =
  "từ,IPA,nghĩa,từ loại,link ảnh,câu ví dụ,nghĩa câu ví dụ\n" +
  "cat,/kæt/,con mèo,danh từ,,My cat is small.,Con mèo của tôi bé xíu.\n" +
  "apple,/ˈæp.əl/,quả táo,danh từ,,I eat an apple every day.,Tôi ăn một quả táo mỗi ngày.\n" +
  "jump,/dʒʌmp/,nhảy,động từ,,Frogs can jump very high.,Ếch nhảy rất cao.\n";

/** Nhập từ vựng hàng loạt (dán bảng / .csv / .xlsx) vào nội dung lộ trình. */
export function RoadmapVocabImport({ onImport }: { onImport: (words: Word[]) => void }) {
  const [open, setOpen] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [rows, setRows] = useState<RawRow[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const preview = useMemo(() => finalize(rows), [rows]);
  const validCount = preview.filter((r) => r.valid).length;
  const skipCount = preview.length - validCount;
  const noImageCount = preview.filter((r) => r.valid && !r.imageUrl).length;

  function reset() {
    setPasteText("");
    setRows([]);
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handlePaste(text: string) {
    setPasteText(text);
    setFileName(null);
    setRows(parsePasted(text));
  }

  async function handleFile(file: File | undefined) {
    if (!file) return;
    try {
      const XLSX = await import("xlsx");
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(new Uint8Array(buf), { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      if (!ws) throw new Error("File rỗng.");
      const matrix = XLSX.utils.sheet_to_json(ws, { header: 1, blankrows: false, defval: "" }) as unknown[][];
      setPasteText("");
      setFileName(file.name);
      setRows(rowsFromMatrix(matrix));
    } catch {
      toast.error("Không đọc được file. Hãy dùng .csv hoặc .xlsx hợp lệ.");
    }
  }

  function downloadSample() {
    const blob = new Blob(["﻿" + SAMPLE_CSV], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mau-tu-vung.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport() {
    const words: Word[] = preview
      .filter((r) => r.valid)
      .map((r) => ({
        word: r.word,
        ipa: r.ipa,
        meaning: r.meaning,
        partOfSpeech: r.partOfSpeech,
        imageUrl: r.imageUrl || null,
        audioUrl: null,
        examples: r.exSentence ? [{ sentence: r.exSentence, meaning: r.exMeaning }] : [],
      }));
    if (words.length === 0) {
      toast.error("Không có dòng hợp lệ để nhập.");
      return;
    }
    onImport(words);
    toast.success(`Đã thêm ${words.length} từ${skipCount ? `, bỏ qua ${skipCount}` : ""}.`);
    reset();
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          <Upload className="mr-1 h-4 w-4" /> Nhập hàng loạt
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nhập từ vựng hàng loạt</DialogTitle>
          <DialogDescription>
            Cột theo thứ tự: <b>Từ tiếng Anh</b> · <b>IPA</b> · <b>Nghĩa tiếng Việt</b> · Từ loại · Link ảnh ·
            Câu ví dụ · Nghĩa câu ví dụ. Dán bảng từ Excel/Google Sheets hoặc tải file .csv / .xlsx. Nhập xong
            nhớ bấm “🔊 Tạo audio” cho từng từ.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="paste">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="paste">
              <ClipboardPaste className="mr-1.5 h-4 w-4" /> Dán bảng
            </TabsTrigger>
            <TabsTrigger value="file">
              <FileSpreadsheet className="mr-1.5 h-4 w-4" /> Tải file
            </TabsTrigger>
          </TabsList>

          <TabsContent value="paste" className="space-y-2">
            <Textarea
              value={pasteText}
              onChange={(e) => handlePaste(e.target.value)}
              rows={6}
              className="font-mono text-sm"
              placeholder={"cat\t/kæt/\tcon mèo\tdanh từ\napple\t\tquả táo"}
            />
            <p className="text-[11px] text-muted-foreground">
              Mỗi dòng một từ. Bôi đen các ô trong Excel rồi Ctrl+C → dán vào đây (ngăn cách bằng Tab), hoặc dán CSV.
            </p>
          </TabsContent>

          <TabsContent value="file" className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => handleFile(e.target.files?.[0])}
              className="block w-full text-sm file:mr-3 file:rounded-md file:border file:border-input file:bg-background file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-muted"
            />
            {fileName && <p className="text-[11px] text-muted-foreground">Đã đọc: {fileName}</p>}
            <button
              type="button"
              onClick={downloadSample}
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <Download className="h-3.5 w-3.5" /> Tải file mẫu (.csv)
            </button>
          </TabsContent>
        </Tabs>

        {preview.length > 0 && (
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="font-medium text-green-600">{validCount} hợp lệ</span>
              {skipCount > 0 && (
                <span className="flex items-center gap-1 text-amber-600">
                  <AlertTriangle className="h-3.5 w-3.5" /> {skipCount} bị bỏ qua
                </span>
              )}
              {noImageCount > 0 && (
                <span className="flex items-center gap-1 text-amber-600">
                  <ImageOff className="h-3.5 w-3.5" /> {noImageCount} từ chưa có ảnh
                </span>
              )}
            </div>
            <div className="max-h-64 overflow-y-auto rounded-md border">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-muted/80 text-xs">
                  <tr>
                    <th className="px-2 py-1.5">#</th>
                    <th className="px-2 py-1.5">Từ</th>
                    <th className="px-2 py-1.5">IPA</th>
                    <th className="px-2 py-1.5">Nghĩa</th>
                    <th className="px-2 py-1.5">Ảnh</th>
                    <th className="px-2 py-1.5">Ví dụ</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.slice(0, 200).map((r, i) => (
                    <tr key={i} className={cn("border-t", !r.valid && "bg-destructive/10 text-muted-foreground")}>
                      <td className="px-2 py-1 text-xs text-muted-foreground">{i + 1}</td>
                      <td className="px-2 py-1 font-primer">{r.word || "—"}</td>
                      <td className="px-2 py-1 text-xs">{r.ipa || "—"}</td>
                      <td className="px-2 py-1 text-xs">{r.meaning || "—"}</td>
                      <td className="px-2 py-1 text-xs">{r.imageUrl ? "✓" : "—"}</td>
                      <td className="px-2 py-1 font-primer text-xs">{r.exSentence || ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button type="button" onClick={handleImport} disabled={validCount === 0}>
            Thêm {validCount} từ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
