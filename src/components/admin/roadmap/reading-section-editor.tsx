"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, FileJson, BookOpenText } from "lucide-react";
import type { EnglishLevel } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MediaField } from "./media-field";
import { TtsButton } from "@/components/admin/tts-button";
import { QuestionRows } from "./question-rows";
import { RoadmapQuestionsImporter } from "./questions-importer";
import { normalizeReadingContent, type RoadmapQuestion } from "@/lib/roadmap-content";
import { buildReadingContent } from "@/lib/roadmap-authoring";

const FULL_JSON_PLACEHOLDER = `{
  "title": "Chú chó của bé Mai",
  "timeLimit": 600,
  "passages": [
    {
      "passage": "Mai has a little dog. His name is Bong. They run in the garden every morning.",
      "passageTranslation": "Bé Mai có một chú chó nhỏ tên là Bông. Sáng nào hai bạn cũng chạy chơi trong vườn.",
      "passageAnalysis": [
        { "en": "Mai has a little dog.", "vi": "Bé Mai có một chú chó nhỏ.", "note": "has = có, dùng cho she/he/it." }
      ],
      "questions": [
        { "type": "MCQ", "prompt": "What pet does Mai have?", "promptTranslation": "Bé Mai nuôi con vật gì?", "options": ["a dog","a cat","a fish","a bird"], "optionsTranslation": ["một chú chó","một chú mèo","một chú cá","một chú chim"], "answer": 0, "explanation": "Câu đầu nói Mai có một chú chó nhỏ.", "supportingQuote": "Mai has a little dog.", "quoteTranslation": "Bé Mai có một chú chó nhỏ." },
        { "type": "TRUE_FALSE", "prompt": "They run in the garden.", "promptTranslation": "Hai bạn chạy chơi trong vườn.", "answer": true, "explanation": "Câu cuối kể hai bạn chạy trong vườn mỗi sáng." },
        { "type": "FILL_BLANK", "prompt": "The dog's name is ___.", "answer": "Bong", "accepted": ["bong"] }
      ]
    },
    {
      "passage": "In the afternoon, Mai gives Bong a bath. Bong loves water!",
      "questions": [
        { "type": "MCQ", "prompt": "When does Mai give Bong a bath?", "options": ["in the afternoon","at night","before school","on Sunday"], "answer": 0, "explanation": "Câu đầu đoạn hai cho biết buổi chiều." }
      ]
    }
  ]
}`;

type ReadingState = ReturnType<typeof normalizeReadingContent>;
type PassageState = ReadingState["passages"][number];

export function ReadingSectionEditor({
  value,
  onChange,
  level,
}: {
  value: unknown;
  onChange: (v: unknown) => void;
  level: EnglishLevel;
}) {
  // Luôn làm việc trên dạng chuẩn nhiều-đoạn (đọc được cả nội dung cũ một-đoạn).
  const v = normalizeReadingContent(value);
  if (v.passages.length === 0) v.passages = [{ passage: "", questions: [] }];

  function set(patch: Partial<ReadingState>) {
    onChange({ ...v, ...patch });
  }
  function setPassage(i: number, patch: Partial<PassageState>) {
    set({ passages: v.passages.map((p, j) => (j === i ? { ...p, ...patch } : p)) });
  }
  function addPassage() {
    set({ passages: [...v.passages, { passage: "", questions: [] }] });
  }
  function removePassage(i: number) {
    if (v.passages.length <= 1) return;
    set({ passages: v.passages.filter((_, j) => j !== i) });
  }

  const [json, setJson] = useState("");
  function applyJson() {
    if (!json.trim()) {
      toast.error("Ô JSON đang trống.");
      return;
    }
    try {
      const content = buildReadingContent(JSON.parse(json), v.title);
      onChange(content);
      const n = (content as ReadingState).passages?.length ?? 0;
      toast.success(`Đã nạp ${n} đoạn đọc từ JSON.`);
      setJson("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "JSON không hợp lệ.");
    }
  }

  return (
    <div className="space-y-3">
      {/* Dán JSON cả phần Đọc: nhiều đoạn + câu hỏi + giải thích trong một lần */}
      <details className="rounded-xl border border-primary/30 bg-primary/5 p-3">
        <summary className="cursor-pointer text-sm font-semibold text-primary">
          <FileJson className="mr-1 inline h-4 w-4" /> Dán JSON cả phần (nhiều bài đọc + câu hỏi + giải thích)
        </summary>
        <div className="mt-2 space-y-2">
          <Textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            placeholder={FULL_JSON_PLACEHOLDER}
            className="min-h-44 font-mono text-xs"
            spellCheck={false}
          />
          <p className="text-[11px] text-muted-foreground">
            Một object có <code>passages</code> (mảng nhiều đoạn), mỗi đoạn kèm <code>questions</code> và (tùy chọn){" "}
            <code>passageTranslation</code> (dịch cả đoạn) + <code>passageAnalysis</code> (phân tích từng câu:{" "}
            <code>en·vi·note</code>) — hiện khi chữa bài. Câu hỏi dùng
            <code> answer</code> (MCQ: chỉ số từ 0; TRUE_FALSE: true/false; FILL_BLANK: từ tiếng Anh) và nên kèm
            bản dịch tiếng Việt (<code>promptTranslation</code>, <code>optionsTranslation</code>,{" "}
            <code>quoteTranslation</code>). Dán sẽ <b>thay toàn bộ</b> nội dung phần Đọc bên dưới.
          </p>
          <Button type="button" size="sm" variant="outline" onClick={applyJson} className="gap-1.5">
            <FileJson className="h-4 w-4" /> Áp dụng JSON
          </Button>
        </div>
      </details>

      {/* Thông tin chung của phần */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
        <div className="space-y-1">
          <Label className="text-xs">Tiêu đề phần Đọc</Label>
          <Input value={v.title} onChange={(e) => set({ title: e.target.value })} placeholder="Chú chó của bé Mai" className="h-9" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Thời gian (giây)</Label>
          <Input
            type="number"
            min={0}
            value={v.timeLimit}
            onChange={(e) => set({ timeLimit: Number(e.target.value) || 0 })}
            className="h-9 w-28"
          />
        </div>
      </div>

      {/* Danh sách đoạn đọc */}
      {v.passages.map((p, i) => (
        <div key={i} className="space-y-3 rounded-xl border bg-card p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-semibold">
              <BookOpenText className="h-4 w-4 text-primary" /> Đoạn {i + 1}
              {v.passages.length > 1 && <span className="text-xs font-normal text-muted-foreground">/ {v.passages.length}</span>}
            </span>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => removePassage(i)}
              disabled={v.passages.length <= 1}
              className="text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" /> Xoá đoạn
            </Button>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Đoạn văn (tiếng Anh)</Label>
            <Textarea
              value={p.passage}
              onChange={(e) => setPassage(i, { passage: e.target.value })}
              placeholder="Mai has a little dog. His name is Bong…"
              className="min-h-28 font-primer text-sm"
            />
            <div className="flex items-center gap-1.5 pt-0.5">
              {/* Bài đọc mẫu: bé vừa nghe vừa dò theo chữ — bước quan trọng để tập đọc. */}
              <TtsButton size="xs" text={p.passage} onDone={(url) => setPassage(i, { audioUrl: url })} label="Tạo audio đọc mẫu" />
              <Input
                value={p.audioUrl ?? ""}
                onChange={(e) => setPassage(i, { audioUrl: e.target.value || null })}
                placeholder="Audio đọc mẫu cả đoạn"
                className="h-8 text-sm"
              />
            </div>
            {p.audioUrl ? <audio src={p.audioUrl} controls className="h-8 w-full" /> : null}
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Dịch đoạn văn (tiếng Việt · tuỳ chọn)</Label>
            <Textarea
              value={p.passageTranslation ?? ""}
              onChange={(e) => setPassage(i, { passageTranslation: e.target.value })}
              placeholder="Bản dịch cả đoạn — hiện cho bé khi chữa bài."
              className="min-h-20 text-sm"
            />
            <p className="text-[11px] text-muted-foreground">
              Phân tích từng câu (<code>passageAnalysis</code>) nhập qua ô “Dán JSON cả phần” ở trên.
            </p>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Ảnh minh hoạ đoạn (tuỳ chọn)</Label>
            <MediaField kind="image" value={p.imageUrl ?? undefined} onChange={(url) => setPassage(i, { imageUrl: url })} />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Câu hỏi của đoạn {i + 1}</Label>
            <RoadmapQuestionsImporter
              skill="READING"
              source={p.passage}
              level={level}
              onImport={(qs) => setPassage(i, { questions: [...(p.questions as RoadmapQuestion[]), ...qs] })}
            />
            <QuestionRows
              value={p.questions as RoadmapQuestion[]}
              onChange={(qs) => setPassage(i, { questions: qs })}
              quoteLabel="Trích đoạn văn chứng minh đáp án (tuỳ chọn)"
            />
          </div>
        </div>
      ))}

      <Button type="button" size="sm" variant="outline" onClick={addPassage} className="gap-1.5">
        <Plus className="h-4 w-4" /> Thêm đoạn đọc
      </Button>
    </div>
  );
}
