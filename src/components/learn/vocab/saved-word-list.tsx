"use client";
import { useState, useTransition } from "react";
import { Volume2, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn, levelLabel } from "@/lib/utils";
import { playWord } from "@/lib/speech";
import { removeSavedWordAction } from "@/server/actions/saved-word";

export interface SavedWordItem {
  id: string;
  word: string;
  ipa: string;
  meaning: string;
  level: string | null;
  createdAt: string;
}

export function SavedWordList({ words }: { words: SavedWordItem[] }) {
  const [items, setItems] = useState(words);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function remove(id: string) {
    setRemovingId(id);
    startTransition(async () => {
      const res = await removeSavedWordAction(id);
      if (res.ok) {
        setItems((xs) => xs.filter((x) => x.id !== id));
        toast.success("Đã xoá khỏi sổ từ");
      } else {
        toast.error(res.error ?? "Xoá thất bại");
      }
      setRemovingId(null);
    });
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((w) => (
        // Mỗi từ là một thẻ dán: bo lớn, bóng ám nâu, nhô lên khi rê chuột.
        <div
          key={w.id}
          className="flex items-start gap-3 rounded-2xl bg-card p-4 shadow-soft transition-transform duration-200 ease-toy hover:-translate-y-1"
        >
          <span className={cn("font-primer text-3xl font-bold leading-none text-brand-gold")}>
            {w.word}
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-muted-foreground">{w.ipa}</div>
            <div className="font-display text-base font-extrabold leading-snug">{w.meaning}</div>
            {w.level && (
              <span className="mt-1 inline-block rounded-full bg-band-lav px-2.5 py-0.5 text-[11px] font-extrabold text-brand-grape">
                {levelLabel(w.level)}
              </span>
            )}
          </div>
          {/* Nút loa nổi rõ (vàng nắng) — nghe là việc bé làm nhiều nhất ở sổ từ. */}
          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => playWord({ word: w.word })}
              aria-label="Nghe"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-sunny text-sunny-foreground shadow-chunky-sm transition-transform duration-200 ease-toy hover:-translate-y-0.5"
            >
              <Volume2 className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => remove(w.id)}
              disabled={removingId === w.id}
              aria-label="Xoá"
              className="flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-destructive disabled:opacity-50"
            >
              {removingId === w.id ? <Loader2 className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
