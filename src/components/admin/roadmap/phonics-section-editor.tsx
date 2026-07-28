"use client";
import { Plus, Trash2, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TtsButton } from "@/components/admin/tts-button";
import { cn } from "@/lib/utils";
import { rime } from "@/lib/english";
import { PHONICS_LESSONS, type PhonicsCard, type PhonicsLesson } from "@/lib/phonics-lessons";
import type { PhonicsSectionContent } from "@/lib/roadmap-content";

type Sound = PhonicsSectionContent["sounds"][number];
type SampleWord = Sound["words"][number];

/**
 * Phần GHÉP VẦN (Phonics) của một bài lộ trình.
 *
 * Cách dùng nhanh nhất: bấm chọn một BÀI GHÉP VẦN DỰNG SẴN (bộ bài chuẩn
 * s-a-t-p-i-n → phụ âm ghép → nguyên âm ghép → ghép vần thành từ). Trình soạn
 * rút các âm + từ mẫu của bài đó ra thành danh sách bên dưới, admin có thể sửa
 * lại từng dòng cho hợp chủ đề của bài (animals, food, toys…).
 *
 * Vì sao lưu ra danh sách âm chứ không chỉ lưu mã bài: nội dung phần này được
 * lưu trong `RoadmapSection.content` và trình chơi đọc thẳng từ đó, nên khi giữ
 * đủ dữ liệu âm + từ mẫu thì bài vẫn chạy đúng kể cả sau khi bộ bài dựng sẵn
 * được cập nhật. Mã bài (`lessonId`) vẫn được ghi kèm để biết bài lấy từ đâu.
 */
export function PhonicsSectionEditor({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const v = (value ?? {}) as Partial<PhonicsSectionContent> & { lessonId?: string };
  const sounds: Sound[] = Array.isArray(v.sounds) ? (v.sounds as Sound[]) : [];
  // Bài dựng sẵn đang chọn: theo mã bài nếu còn, nếu không thì dò theo tiêu đề
  // (nội dung sau khi lưu vào máy chủ chỉ giữ tiêu đề + danh sách âm).
  const picked =
    PHONICS_LESSONS.find((l) => l.id === v.lessonId) ??
    PHONICS_LESSONS.find((l) => l.title === v.title);

  function set(patch: Partial<PhonicsSectionContent> & { lessonId?: string }) {
    onChange({ ...v, ...patch });
  }
  function setSounds(next: Sound[]) {
    set({ sounds: next });
  }
  function updateSound(i: number, patch: Partial<Sound>) {
    setSounds(sounds.map((s, j) => (j === i ? { ...s, ...patch } : s)));
  }
  function updateWord(i: number, wi: number, patch: Partial<SampleWord>) {
    const words = (sounds[i].words ?? []).map((w, k) => (k === wi ? { ...w, ...patch } : w));
    updateSound(i, { words });
  }

  function pickLesson(lesson: PhonicsLesson) {
    const derived = lessonToSounds(lesson);
    if (derived.length === 0) {
      toast.error("Bài này chưa rút được âm nào — chọn bài khác giúp mình nhé.");
      return;
    }
    onChange({ title: lesson.title, lessonId: lesson.id, sounds: derived });
    toast.success(`Đã nạp ${derived.length} âm từ bài «${lesson.title}».`);
  }

  return (
    <div className="space-y-4">
      {/* Chọn bài dựng sẵn */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1.5 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Chọn bài Ghép vần có sẵn
        </Label>
        <p className="text-[11px] text-muted-foreground">
          Bấm một thẻ để nạp sẵn các âm + từ mẫu. Nạp xong vẫn sửa được từng dòng bên dưới.
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {PHONICS_LESSONS.map((l) => {
            const active = picked?.id === l.id;
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => pickLesson(l)}
                className={cn(
                  "flex items-start gap-2 rounded-xl border-2 p-2.5 text-left transition",
                  active
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/50 hover:bg-muted/40",
                )}
              >
                <span className="text-xl leading-none">{l.emoji}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1 text-sm font-semibold">
                    {l.title}
                    {active && <Check className="h-3.5 w-3.5 text-primary" />}
                  </span>
                  <span className="block truncate text-[11px] text-muted-foreground">{l.subtitle}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tiêu đề phần */}
      <div className="space-y-1">
        <Label className="text-xs">Tiêu đề phần Ghép vần</Label>
        <Input
          value={v.title ?? ""}
          onChange={(e) => set({ title: e.target.value })}
          placeholder="Nhóm 1 · s a t p i n"
          className="h-9"
        />
      </div>

      {/* Danh sách âm */}
      {sounds.length === 0 ? (
        <p className="rounded-xl border border-dashed py-6 text-center text-xs text-muted-foreground">
          Chưa có âm nào. Chọn một bài có sẵn ở trên, hoặc bấm “Thêm âm” để tự soạn.
        </p>
      ) : (
        sounds.map((s, i) => (
          <div key={i} className="space-y-2 rounded-xl border bg-card p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">Âm {i + 1}</span>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setSounds(sounds.filter((_, j) => j !== i))}
                aria-label="Xoá âm"
              >
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">
              <Input
                value={s.letters}
                onChange={(e) => updateSound(i, { letters: e.target.value })}
                placeholder="Chữ / cụm chữ: s, sh, ai"
                className="h-8 font-primer text-sm"
              />
              <Input
                value={s.sound ?? ""}
                onChange={(e) => updateSound(i, { sound: e.target.value })}
                placeholder="Cách đọc: /s/"
                className="h-8 text-sm"
              />
              <Input
                value={s.hint ?? ""}
                onChange={(e) => updateSound(i, { hint: e.target.value })}
                placeholder="Mẹo nhớ: Rắn kêu sss…"
                className="h-8 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Từ mẫu (bé nhìn ảnh/emoji để đoán âm)</Label>
              {(s.words ?? []).map((w, wi) => (
                <div key={wi} className="space-y-1.5 rounded-lg border bg-muted/20 p-2">
                  <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-[1.2fr_1.2fr_auto_auto]">
                    <Input
                      value={w.word}
                      onChange={(e) => updateWord(i, wi, { word: e.target.value })}
                      placeholder="sun"
                      className="h-8 font-primer text-sm"
                    />
                    <Input
                      value={w.meaning ?? ""}
                      onChange={(e) => updateWord(i, wi, { meaning: e.target.value })}
                      placeholder="mặt trời"
                      className="h-8 text-sm"
                    />
                    <Input
                      value={w.emoji ?? ""}
                      onChange={(e) => updateWord(i, wi, { emoji: e.target.value })}
                      placeholder="☀️"
                      className="h-8 w-16 text-center text-sm"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        updateSound(i, { words: (s.words ?? []).filter((_, k) => k !== wi) })
                      }
                      aria-label="Xoá từ mẫu"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TtsButton
                      size="xs"
                      text={w.word}
                      onDone={(url) => updateWord(i, wi, { audioUrl: url })}
                    />
                    <Input
                      value={w.audioUrl ?? ""}
                      onChange={(e) => updateWord(i, wi, { audioUrl: e.target.value || null })}
                      placeholder="Audio đọc từ — bấm “Tạo audio” là xong"
                      className="h-8 text-sm"
                    />
                  </div>
                  {w.audioUrl ? <audio src={w.audioUrl} controls className="h-8 w-full" /> : null}
                </div>
              ))}
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() =>
                  updateSound(i, { words: [...(s.words ?? []), { word: "", meaning: "", emoji: "" }] })
                }
              >
                <Plus className="h-3.5 w-3.5" /> Thêm từ mẫu
              </Button>
            </div>
          </div>
        ))
      )}

      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() =>
          setSounds([...sounds, { letters: "", sound: "", hint: "", words: [{ word: "", meaning: "", emoji: "" }] }])
        }
      >
        <Plus className="h-3.5 w-3.5" /> Thêm âm
      </Button>
    </div>
  );
}

/**
 * Rút danh sách âm + từ mẫu ra từ một bài Ghép vần dựng sẵn.
 *
 * Mỗi loại thẻ đóng góp một kiểu dữ liệu khác nhau: thẻ "dạy" cho đủ chữ/cách
 * đọc/mẹo nhớ; thẻ "nghe" và "ghép" chỉ cho thêm từ mẫu; thẻ "vần" gom các từ
 * cùng vần vào một mục (vd vần "at": cat, hat). Viết tại chỗ vì chỉ trình soạn
 * này cần — không thêm vào thư viện dùng chung.
 */
function lessonToSounds(lesson: PhonicsLesson): Sound[] {
  const byKey = new Map<string, Sound>();

  const bucket = (letters: string, extra?: { sound?: string; hint?: string }) => {
    const key = letters.toLowerCase();
    const found = byKey.get(key);
    if (found) {
      if (extra?.sound && !found.sound) found.sound = extra.sound;
      if (extra?.hint && !found.hint) found.hint = extra.hint;
      return found;
    }
    const created: Sound = {
      letters,
      sound: extra?.sound ?? "",
      hint: extra?.hint ?? "",
      words: [],
    };
    byKey.set(key, created);
    return created;
  };

  const addWord = (target: Sound, word: string, meaning = "", emoji = "") => {
    const w = word.trim();
    if (!w) return;
    if (target.words.some((x) => x.word.toLowerCase() === w.toLowerCase())) return;
    target.words.push({ word: w, meaning, emoji });
  };

  for (const card of lesson.cards as PhonicsCard[]) {
    switch (card.kind) {
      case "teach":
        addWord(bucket(card.big, { sound: card.sound, hint: card.hint }), card.word, card.meaning, card.emoji);
        break;
      case "listen":
        addWord(bucket(card.answer), card.word, card.meaning, card.emoji);
        break;
      case "blend": {
        // parts = ["c","a","t"] → nguyên âm ở giữa là âm đang luyện.
        const letters = card.parts[1] ?? card.parts[0] ?? card.answer.charAt(0);
        addWord(bucket(letters), card.answer, card.meaning, card.emoji);
        break;
      }
      case "rhyme": {
        const key = rime(card.base.word) || card.base.word;
        const target = bucket(key);
        addWord(target, card.base.word, "", card.base.emoji);
        const answer = card.options.find((o) => o.word === card.answer);
        if (answer) addWord(target, answer.word, "", answer.emoji);
        break;
      }
      default:
        // Thẻ "phân biệt hai âm dễ lẫn" không có chữ cái đi kèm — bỏ qua,
        // vì các âm đó đã có mục riêng từ thẻ dạy rồi.
        break;
    }
  }

  return [...byKey.values()].filter((s) => s.letters.trim() && s.words.length > 0);
}
