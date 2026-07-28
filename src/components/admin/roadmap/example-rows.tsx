"use client";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TtsButton } from "@/components/admin/tts-button";
import type { WordExample } from "@/lib/roadmap-content";

/**
 * Trình soạn danh sách câu ví dụ `{ sentence, meaning, audioUrl }` — dùng cho
 * phần Từ vựng của lộ trình. Mỗi câu có nút "🔊 Tạo audio" vì trẻ phải NGHE được
 * câu mẫu, không chỉ đọc.
 */
export function ExampleRows({
  value,
  onChange,
}: {
  value: WordExample[];
  onChange: (v: WordExample[]) => void;
}) {
  const rows = value ?? [];

  function update(i: number, patch: Partial<WordExample>) {
    onChange(rows.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  }
  function add() {
    onChange([...rows, { sentence: "", meaning: "" }]);
  }
  function remove(i: number) {
    onChange(rows.filter((_, j) => j !== i));
  }

  return (
    <div className="space-y-2">
      {rows.map((ex, i) => (
        <div key={i} className="space-y-1.5 rounded-lg border bg-muted/20 p-2">
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-[1.4fr_1.2fr_auto]">
            <Input
              value={ex.sentence}
              onChange={(e) => update(i, { sentence: e.target.value })}
              placeholder="My cat is very small."
              className="h-8 font-primer text-sm"
            />
            <Input
              value={ex.meaning}
              onChange={(e) => update(i, { meaning: e.target.value })}
              placeholder="Con mèo của tôi bé xíu."
              className="h-8 text-sm"
            />
            <Button type="button" size="sm" variant="ghost" onClick={() => remove(i)} aria-label="Xoá ví dụ">
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </Button>
          </div>
          <div className="flex items-center gap-1.5">
            <TtsButton size="xs" text={ex.sentence} onDone={(url) => update(i, { audioUrl: url })} />
            <Input
              value={ex.audioUrl ?? ""}
              onChange={(e) => update(i, { audioUrl: e.target.value || null })}
              placeholder="Audio câu ví dụ — bấm “Tạo audio” là xong"
              className="h-8 text-sm"
            />
          </div>
        </div>
      ))}
      <Button type="button" size="sm" variant="outline" onClick={add}>
        <Plus className="h-3.5 w-3.5" /> Thêm ví dụ
      </Button>
    </div>
  );
}
