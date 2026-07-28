"use client";
import { Plus, Trash2, ImageOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MediaField } from "./media-field";
import { ExampleRows } from "./example-rows";
import { RoadmapVocabImport } from "./vocab-import";
import { TtsButton } from "@/components/admin/tts-button";
import type { VocabSectionContent, WordExample } from "@/lib/roadmap-content";

type Word = VocabSectionContent["words"][number];

export function VocabSectionEditor({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const v = (value ?? {}) as Partial<VocabSectionContent>;
  const words: Word[] = Array.isArray(v.words) ? (v.words as Word[]) : [];

  function setWords(next: Word[]) {
    onChange({ ...v, words: next });
  }
  function update(i: number, patch: Partial<Word>) {
    setWords(words.map((w, j) => (j === i ? { ...w, ...patch } : w)));
  }
  function add() {
    setWords([
      ...words,
      { word: "", ipa: "", meaning: "", partOfSpeech: "", imageUrl: null, audioUrl: null, examples: [] },
    ]);
  }
  function remove(i: number) {
    setWords(words.filter((_, j) => j !== i));
  }

  // Trẻ nhỏ nhận nghĩa qua ẢNH trước cả chữ, nên thiếu ảnh là thiếu nghiêm trọng.
  const noImage = words.filter((w) => !w.imageUrl).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          Mỗi từ gồm từ tiếng Anh, phiên âm IPA, nghĩa, từ loại, ẢNH và audio. Bé học từng từ: xem thẻ →
          nghe → nhớ lại → chơi flashcard.
        </p>
        <RoadmapVocabImport onImport={(ws) => setWords([...words, ...ws])} />
      </div>

      {noImage > 0 && (
        <p className="flex items-start gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-2.5 py-2 text-[11px] text-amber-800 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-300">
          <ImageOff className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{noImage} từ chưa có ảnh minh hoạ — hãy bổ sung trước khi xuất bản phần này.</span>
        </p>
      )}

      {words.map((w, i) => (
        <div key={i} className="space-y-2 rounded-xl border bg-card p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Từ {i + 1}</span>
            <Button type="button" size="sm" variant="ghost" onClick={() => remove(i)} aria-label="Xoá từ">
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-4">
            <Input
              value={w.word}
              onChange={(e) => update(i, { word: e.target.value })}
              placeholder="elephant"
              className="h-8 font-primer text-sm"
            />
            <Input
              value={w.ipa ?? ""}
              onChange={(e) => update(i, { ipa: e.target.value })}
              placeholder="/ˈel.ɪ.fənt/"
              className="h-8 text-sm"
            />
            <Input
              value={w.meaning}
              onChange={(e) => update(i, { meaning: e.target.value })}
              placeholder="con voi"
              className="h-8 text-sm"
            />
            <Input
              value={w.partOfSpeech ?? ""}
              onChange={(e) => update(i, { partOfSpeech: e.target.value })}
              placeholder="danh từ"
              className="h-8 text-sm"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <TtsButton size="xs" text={w.word} onDone={(url) => update(i, { audioUrl: url })} />
            <Input
              value={w.audioUrl ?? ""}
              onChange={(e) => update(i, { audioUrl: e.target.value || null })}
              placeholder="Audio đọc từ — bấm “Tạo audio” là xong"
              className="h-8 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Ảnh minh hoạ (rất nên có)</Label>
            <MediaField kind="image" value={w.imageUrl} onChange={(url) => update(i, { imageUrl: url })} />
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Câu ví dụ</Label>
            <ExampleRows
              value={(w.examples ?? []) as WordExample[]}
              onChange={(ex) => update(i, { examples: ex })}
            />
          </div>
        </div>
      ))}
      <Button type="button" size="sm" variant="outline" onClick={add}>
        <Plus className="h-3.5 w-3.5" /> Thêm từ
      </Button>
    </div>
  );
}
