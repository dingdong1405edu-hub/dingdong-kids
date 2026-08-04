"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VocabWordCard } from "@/types";

interface Props {
  /** 3–6 từ để nối. */
  words: VocabWordCard[];
  onDone: () => void;
}

type Side = "word" | "meaning";
interface Tile {
  id: string;
  wordId: string;
  side: Side;
  text: string;
  /** Ảnh minh hoạ (chỉ ở cột nghĩa) — bé chưa đọc thạo vẫn nhận ra được. */
  imageUrl?: string | null;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Mini-game khởi động kiểu Duolingo: nối từ tiếng Anh ↔ nghĩa. Mang tính làm nóng
 * (KHÔNG tính vào lịch SRS) — phần chấm điểm nhớ do flashcard & trắc nghiệm đảm
 * nhiệm. Nối đúng hết → onDone().
 */
export function MatchGame({ words, onDone }: Props) {
  const left = useMemo(
    () =>
      shuffle(
        words.map((w) => ({
          id: `w-${w.id}`,
          wordId: w.id,
          side: "word" as Side,
          text: w.word,
        })),
      ),
    [words],
  );
  const right = useMemo(
    () =>
      shuffle(
        words.map((w) => ({
          id: `m-${w.id}`,
          wordId: w.id,
          side: "meaning" as Side,
          text: w.meaning,
          imageUrl: w.imageUrl,
        })),
      ),
    [words],
  );

  const [selected, setSelected] = useState<Tile | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongId, setWrongId] = useState<string | null>(null);

  function tap(tile: Tile) {
    if (matched.has(tile.wordId)) return;
    if (!selected) {
      setSelected(tile);
      return;
    }
    if (selected.id === tile.id) {
      setSelected(null);
      return;
    }
    if (selected.side === tile.side) {
      // đổi lựa chọn trong cùng cột
      setSelected(tile);
      return;
    }
    if (selected.wordId === tile.wordId) {
      const next = new Set(matched);
      next.add(tile.wordId);
      setMatched(next);
      setSelected(null);
      if (next.size === words.length) window.setTimeout(onDone, 350);
    } else {
      setWrongId(tile.id);
      setSelected(null);
      window.setTimeout(() => setWrongId(null), 480);
    }
  }

  function tileClass(tile: Tile) {
    const isMatched = matched.has(tile.wordId);
    const isSelected = selected?.id === tile.id;
    const isWrong = wrongId === tile.id;
    // Trạng thái ô nối phân biệt bằng khối màu band-* (tự dịu ở chế độ tối) —
    // trước đây dùng bảng màu mặc định Tailwind kèm cặp dark: viết tay.
    return cn(
      "flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border-[3px] px-3 py-3 text-center transition-all duration-200 ease-toy",
      isMatched && "border-brand-lime bg-band-mint text-brand-teal opacity-60",
      !isMatched && isSelected && "-translate-y-0.5 border-brand-gold bg-band-sun shadow-soft",
      !isMatched && isWrong && "animate-wrong-shake border-brand-coral bg-band-coral",
      !isMatched &&
        !isSelected &&
        !isWrong &&
        "border-border bg-card hover:-translate-y-0.5 hover:border-brand-gold hover:shadow-soft",
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 py-4">
      <p className="font-display text-lg font-extrabold text-muted-foreground">
        Nối từ tiếng Anh với nghĩa
      </p>
      <div className="grid w-full max-w-md grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          {left.map((t) => (
            <button
              key={t.id}
              type="button"
              disabled={matched.has(t.wordId)}
              onClick={() => tap(t)}
              className={tileClass(t)}
            >
              <span className="font-primer text-2xl font-bold">{t.text}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {right.map((t) => (
            <button
              key={t.id}
              type="button"
              disabled={matched.has(t.wordId)}
              onClick={() => tap(t)}
              className={tileClass(t)}
            >
              {t.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.imageUrl} alt="" className="h-11 w-11 shrink-0 rounded-xl object-cover" />
              )}
              <span className="text-[15px] font-bold">{t.text}</span>
            </button>
          ))}
        </div>
      </div>
      <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={onDone}>
        Bỏ qua phần khởi động
      </Button>
    </div>
  );
}
