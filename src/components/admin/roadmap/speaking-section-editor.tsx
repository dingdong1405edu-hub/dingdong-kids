"use client";
import { useState } from "react";
import { Plus, Trash2, FileJson } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { buildSpeakingContent } from "@/lib/roadmap-authoring";
import type { SpeakingSectionContent } from "@/lib/roadmap-content";

type Sentence = { text: string };
type QItem = { question: string };

const FULL_JSON_PLACEHOLDER = `{
  "part1Sentences": [
    { "text": "Nice to meet you!" },
    { "text": "Thank you for your help." }
  ],
  "part2Passage": { "text": "My name is Mai. I am eight years old and I love animals." },
  "part3Questions": [
    { "question": "Do you like learning English?" },
    { "question": "Where do you live?" }
  ]
}`;

export function SpeakingSectionEditor({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const v = (value ?? {}) as Partial<SpeakingSectionContent>;
  const part1: Sentence[] = Array.isArray(v.part1Sentences) ? (v.part1Sentences as Sentence[]) : [];
  const passage = (v.part2Passage ?? { text: "" }) as Sentence;
  const part3: QItem[] = Array.isArray(v.part3Questions) ? (v.part3Questions as QItem[]) : [];

  function commit(next: Partial<SpeakingSectionContent>) {
    const merged = { part1Sentences: part1, part2Passage: passage, part3Questions: part3, ...next };
    // Đoạn văn trống → lưu null (schema không nhận { text: "" }); cho phép bộ chỉ có Phần 1 / Phần 3.
    const p = merged.part2Passage;
    onChange({ ...merged, part2Passage: p && p.text.trim() ? p : null });
  }

  const [json, setJson] = useState("");
  function applyJson() {
    try {
      onChange(buildSpeakingContent(JSON.parse(json)));
      toast.success("Đã áp dụng JSON.");
      setJson("");
    } catch {
      toast.error("JSON không hợp lệ.");
    }
  }

  return (
    <div className="space-y-4">
      {/* Dán JSON cả phần Nói: Phần 1 (lặp câu) + Phần 2 (đọc đoạn) + Phần 3 (trả lời) */}
      <details className="rounded-xl border border-primary/30 bg-primary/5 p-3">
        <summary className="cursor-pointer text-sm font-semibold text-primary">
          <FileJson className="mr-1 inline h-4 w-4" /> Dán JSON cả phần (Phần 1 + 2 + 3)
        </summary>
        <div className="mt-2 space-y-2">
          <Textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            placeholder={FULL_JSON_PLACEHOLDER}
            className="min-h-40 font-mono text-xs"
            spellCheck={false}
          />
          <p className="text-[11px] text-muted-foreground">
            Một object: <code>part1Sentences</code> (mảng câu lặp lại) ·{" "}
            <code>part2Passage</code> (đoạn đọc) · <code>part3Questions</code> (mảng câu hỏi trả lời).
            Mỗi câu/đoạn có <code>text</code>/<code>question</code>, kèm{" "}
            <code>audioUrl</code>/<code>imageUrl</code> tuỳ chọn. Dán sẽ <b>thay toàn bộ</b> nội
            dung phần Nói bên dưới.
          </p>
          <Button type="button" size="sm" variant="outline" onClick={applyJson} className="gap-1.5">
            <FileJson className="h-4 w-4" /> Áp dụng JSON
          </Button>
        </div>
      </details>

      {/* Phần 1: Lặp câu */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold">Phần 1 · Nhắc lại câu</Label>
        {part1.map((s, i) => (
          <div key={i} className="grid grid-cols-1 gap-1.5 sm:grid-cols-[1fr_auto]">
            <Input
              value={s.text}
              onChange={(e) => commit({ part1Sentences: part1.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)) })}
              placeholder="Nice to meet you!"
              className="h-8 font-primer text-sm"
            />
            <Button type="button" size="sm" variant="ghost" onClick={() => commit({ part1Sentences: part1.filter((_, j) => j !== i) })}>
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </Button>
          </div>
        ))}
        <Button type="button" size="sm" variant="outline" onClick={() => commit({ part1Sentences: [...part1, { text: "" }] })}>
          <Plus className="h-3.5 w-3.5" /> Thêm câu
        </Button>
      </div>

      {/* Phần 2: Đọc đoạn văn */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold">Phần 2 · Đọc to đoạn văn</Label>
        <Textarea
          value={passage.text}
          onChange={(e) => commit({ part2Passage: { ...passage, text: e.target.value } })}
          placeholder="My name is Mai. I am eight years old…"
          className="min-h-16 font-primer text-sm"
        />
      </div>

      {/* Phần 3: Trả lời câu hỏi */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold">Phần 3 · Trả lời câu hỏi</Label>
        {part3.map((q, i) => (
          <div key={i} className="grid grid-cols-1 gap-1.5 sm:grid-cols-[1fr_auto]">
            <Input
              value={q.question}
              onChange={(e) => commit({ part3Questions: part3.map((x, j) => (j === i ? { ...x, question: e.target.value } : x)) })}
              placeholder="Do you like learning English?"
              className="h-8 font-primer text-sm"
            />
            <Button type="button" size="sm" variant="ghost" onClick={() => commit({ part3Questions: part3.filter((_, j) => j !== i) })}>
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </Button>
          </div>
        ))}
        <Button type="button" size="sm" variant="outline" onClick={() => commit({ part3Questions: [...part3, { question: "" }] })}>
          <Plus className="h-3.5 w-3.5" /> Thêm câu hỏi
        </Button>
      </div>
    </div>
  );
}
