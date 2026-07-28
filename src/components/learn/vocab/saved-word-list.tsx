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
        <div key={w.id} className="flex items-start gap-3 rounded-2xl border bg-card p-4">
          <span className={cn("font-primer text-3xl font-bold leading-none")}>{w.word}</span>
          <div className="min-w-0 flex-1">
            <div className="text-sm text-muted-foreground">{w.ipa}</div>
            <div className="text-sm font-medium leading-snug">{w.meaning}</div>
            {w.level && (
              <span className="mt-1 inline-block rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                {levelLabel(w.level)}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => playWord({ word: w.word })}
              aria-label="Nghe"
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted"
            >
              <Volume2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => remove(w.id)}
              disabled={removingId === w.id}
              aria-label="Xoá"
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive disabled:opacity-50"
            >
              {removingId === w.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
