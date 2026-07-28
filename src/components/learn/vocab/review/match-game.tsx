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
    return cn(
      "flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border-2 px-3 py-3 text-center transition-all",
      isMatched && "border-green-400 dark:border-green-500/40 bg-green-50 dark:bg-green-500/15 text-green-600 dark:text-green-300 opacity-60",
      !isMatched && isSelected && "border-primary bg-primary/10 ring-2 ring-primary/30",
      !isMatched && isWrong && "border-red-500 bg-red-50 dark:bg-red-500/15",
      !isMatched && !isSelected && !isWrong && "border-border hover:border-primary/50 hover:bg-muted/40",
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 py-4">
      <p className="text-sm font-medium text-muted-foreground">Nối từ tiếng Anh với nghĩa</p>
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
              <span className="font-primer text-2xl font-semibold">{t.text}</span>
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
                <img src={t.imageUrl} alt="" className="h-9 w-9 shrink-0 rounded-lg object-cover" />
              )}
              <span className="text-sm">{t.text}</span>
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
