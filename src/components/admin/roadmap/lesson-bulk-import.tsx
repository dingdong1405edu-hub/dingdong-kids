"use client";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Upload,
  ClipboardPaste,
  FileJson,
  Download,
  Sparkles,
  Loader2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
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
import { bulkImportRoadmapLessonsAction } from "@/server/actions/roadmap-admin";

const SAMPLE = `[
  {
    "topic": "My Family",
    "topicVi": "Gia đình của bé",
    "icon": "👨‍👩‍👧",
    "xpReward": 20,
    "chapter": "",
    "vocab": {
      "words": [
        {
          "word": "mother",
          "ipa": "/ˈmʌðər/",
          "meaning": "mẹ",
          "partOfSpeech": "danh từ",
          "examples": [ { "sentence": "This is my mother.", "meaning": "Đây là mẹ của tớ." } ]
        },
        {
          "word": "father",
          "ipa": "/ˈfɑːðər/",
          "meaning": "bố",
          "partOfSpeech": "danh từ",
          "examples": [ { "sentence": "My father is tall.", "meaning": "Bố tớ cao." } ]
        }
      ]
    },
    "phonics": {
      "sounds": [
        {
          "letters": "m",
          "sound": "/m/",
          "hint": "Ngậm môi lại và ngân qua mũi — giống chữ “m” tiếng Việt.",
          "words": [
            { "word": "mother", "meaning": "mẹ", "emoji": "👩" },
            { "word": "moon", "meaning": "mặt trăng", "emoji": "🌙" }
          ]
        }
      ]
    },
    "reading": {
      "title": "My family",
      "passages": [
        {
          "passage": "This is my family. I have a mother, a father and a baby sister. We are happy.",
          "questions": [
            { "type": "MCQ", "prompt": "How many people are in the family?", "options": ["Two","Three","Four","Five"], "answer": 2, "explanation": "Bài đọc kể có mẹ, bố, em gái và bạn nhỏ — tất cả là 4 người.", "supportingQuote": "I have a mother, a father and a baby sister" },
            { "type": "TRUE_FALSE", "prompt": "The family is happy.", "answer": true }
          ]
        }
      ]
    },
    "listening": {
      "title": "Meet my family",
      "clips": [
        {
          "audioUrl": "",
          "transcript": "Girl: Hello! I am Mai. This is my mother. This is my father. I love my family.",
          "questions": [
            { "type": "MCQ", "prompt": "What is the girl's name?", "options": ["Lan","Mai","Anna"], "answer": 1 }
          ]
        }
      ]
    },
    "speaking": {
      "part1Sentences": [ { "text": "This is my mother." } ],
      "part3Questions": [ { "question": "Who is in your family?" } ]
    }
  }
]`;

export function RoadmapLessonBulkImport({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [json, setJson] = useState("");
  const [publish, setPublish] = useState(false);
  const [pending, setPending] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const preview = useMemo<{ error: string } | { lessons: number; sections: number } | null>(() => {
    const trimmed = json.trim();
    if (!trimmed) return null;
    let parsed: unknown;
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      return { error: "JSON chưa hợp lệ — kiểm tra dấu ngoặc/dấu phẩy." };
    }
    if (!Array.isArray(parsed)) return { error: "Cần một MẢNG JSON: [ { …bài… } ]." };
    const SKILLS = ["vocab", "grammar", "phonics", "reading", "listening", "writing", "speaking"];
    let lessons = 0;
    let sections = 0;
    for (const it of parsed) {
      if (it && typeof it === "object" && typeof (it as Record<string, unknown>).topic === "string") {
        lessons++;
        const o = it as Record<string, unknown>;
        const src = (o.sections && typeof o.sections === "object" ? (o.sections as Record<string, unknown>) : {}) as Record<string, unknown>;
        for (const s of SKILLS) {
          if (o[s] != null || src[s] != null || src[s.toUpperCase()] != null || o[s.toUpperCase()] != null) sections++;
        }
      }
    }
    return { lessons, sections };
  }, [json]);

  const canImport = !!preview && !("error" in preview) && preview.lessons > 0;

  function reset() {
    setJson("");
    setFileName(null);
    setPublish(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleFile(file: File | undefined) {
    if (!file) return;
    try {
      const text = await file.text();
      setJson(text);
      setFileName(file.name);
    } catch {
      toast.error("Không đọc được file. Hãy dùng file .json hợp lệ.");
    }
  }

  function downloadSample() {
    const blob = new Blob(["﻿" + SAMPLE], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mau-bai-lo-trinh.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleImport() {
    if (pending || !canImport) return;
    setPending(true);
    const res = await bulkImportRoadmapLessonsAction({ courseId, json, publish });
    setPending(false);
    if (res.ok) {
      const draftNote = publish ? "" : " Các phần đang ở Bản nháp — nhớ xuất bản.";
      toast.success(`Đã tạo ${res.lessonsCreated} bài · ${res.sectionsCreated} phần.${draftNote}`);
      if (res.warnings && res.warnings.length) {
        toast.message(`${res.warnings.length} cảnh báo — vài phần bị bỏ qua (xem Console).`, { duration: 8000 });
        // In cảnh báo ra console để admin tra cứu.
        console.warn("Bulk import warnings:\n" + res.warnings.join("\n"));
      }
      reset();
      setOpen(false);
      router.refresh();
    } else {
      toast.error(res.error ?? "Lỗi nhập hàng loạt.");
    }
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
        <Button variant="outline" size="sm" className="gap-1.5">
          <Upload className="h-4 w-4" /> Nhập bài hàng loạt (JSON)
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileJson className="h-5 w-5 text-primary" /> Nhập bài hàng loạt
          </DialogTitle>
          <DialogDescription>
            Dán một MẢNG bài. Mỗi bài cần <code>topic</code> (tiếng Anh) và có thể kèm nội dung các
            kỹ năng: <code>vocab</code>, <code>phonics</code>, <code>grammar</code>, <code>reading</code>,
            <code> listening</code>, <code>writing</code>, <code>speaking</code>. Đọc/Nghe hỗ trợ nhiều đoạn
            (<code>passages</code>/<code>clips</code>). Để trống <code>audioUrl</code> rồi bấm
            &ldquo;Tạo audio&rdquo; sau khi nhập — hệ thống tự sinh giọng đọc bằng TTS.
            Khớp chương theo tên (để trống nếu chưa phân chương).
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="paste">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="paste">
              <ClipboardPaste className="mr-1.5 h-4 w-4" /> Dán JSON
            </TabsTrigger>
            <TabsTrigger value="file">
              <FileJson className="mr-1.5 h-4 w-4" /> Tải file .json
            </TabsTrigger>
          </TabsList>

          <TabsContent value="paste" className="space-y-2">
            <Textarea
              value={json}
              onChange={(e) => {
                setJson(e.target.value);
                setFileName(null);
              }}
              placeholder={SAMPLE}
              className="min-h-72 font-mono text-xs"
              spellCheck={false}
              disabled={pending}
            />
          </TabsContent>

          <TabsContent value="file" className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={(e) => handleFile(e.target.files?.[0])}
              disabled={pending}
              className="block w-full text-sm file:mr-3 file:rounded-md file:border file:border-input file:bg-background file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-muted"
            />
            {fileName && <p className="text-[11px] text-muted-foreground">Đã đọc: {fileName}</p>}
            {json && (
              <Textarea
                value={json}
                onChange={(e) => setJson(e.target.value)}
                className="min-h-48 font-mono text-xs"
                spellCheck={false}
                disabled={pending}
              />
            )}
          </TabsContent>
        </Tabs>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setJson(SAMPLE)}
            disabled={pending}
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline disabled:opacity-50"
          >
            <Sparkles className="h-3.5 w-3.5" /> Dùng mẫu
          </button>
          <button
            type="button"
            onClick={downloadSample}
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <Download className="h-3.5 w-3.5" /> Tải file mẫu (.json)
          </button>
          <label className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium">
            <input type="checkbox" checked={publish} onChange={(e) => setPublish(e.target.checked)} disabled={pending} />
            Xuất bản ngay (hiện cho học viên)
          </label>
        </div>

        {preview && (
          <div className="text-sm">
            {"error" in preview ? (
              <span className="flex items-center gap-1.5 text-brand-gold">
                <AlertTriangle className="h-4 w-4" /> {preview.error}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-brand-teal">
                <CheckCircle2 className="h-4 w-4" />
                {preview.lessons} bài · {preview.sections} phần kỹ năng
              </span>
            )}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-1">
          <Button variant="ghost" onClick={() => setOpen(false)} disabled={pending}>
            Hủy
          </Button>
          <Button onClick={handleImport} disabled={!canImport || pending} className="gap-1.5">
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {pending ? "Đang nhập..." : "Nhập hàng loạt"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
