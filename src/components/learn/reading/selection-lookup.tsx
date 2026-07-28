"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, BookmarkPlus, BookmarkCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { lookupWordAction } from "@/server/actions/word-lookup";
import { saveWordAction } from "@/server/actions/saved-word";
import { coerceWordInfo, posLabel, SpeakButton, type WordInfo } from "./word-lookup";

export interface SelectionAnchor {
  text: string;
  x: number;
  y: number;
}

// Bôi đen cả câu có thể dính rất nhiều từ; giới hạn số lượt tra để không bắn
// hàng chục request AI cùng lúc (và để popup không dài vô tận trên điện thoại).
const MAX_WORDS = 8;

const WORD_RE = /[A-Za-z]+(?:['’-][A-Za-z]+)*/g;

/** Các từ tiếng Anh duy nhất trong cụm bé vừa bôi đen, giữ thứ tự xuất hiện. */
function wordsIn(text: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const m of text.matchAll(WORD_RE)) {
    const w = m[0];
    const key = w.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(w);
    if (out.length >= MAX_WORDS) break;
  }
  return out;
}

/**
 * Popup khi bé kéo bôi đen một CỤM trong bài đọc: tra từng TỪ tiếng Anh trong
 * cụm (IPA + nghĩa tiếng Việt), nghe phát âm và cất từng từ vào sổ từ.
 */
export function SelectionLookup({
  anchor,
  onClose,
  source,
}: {
  anchor: SelectionAnchor;
  onClose: () => void;
  source?: string;
}) {
  const [entries, setEntries] = useState<WordInfo[] | null>(null);
  const [savedWords, setSavedWords] = useState<Record<string, "saving" | "saved">>({});
  // Portal-to-body cần DOM; chỉ mở cổng sau khi mount (giống TestShell).
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let active = true;
    setEntries(null);
    setSavedWords({});
    const words = wordsIn(anchor.text);
    if (words.length === 0) {
      setEntries([]);
      return;
    }
    void Promise.all(words.map((w) => lookupWordAction(w))).then((results: unknown[]) => {
      if (!active) return;
      const found: WordInfo[] = [];
      results.forEach((r, i) => {
        const info = coerceWordInfo(r, words[i]);
        if (info) found.push(info);
      });
      setEntries(found);
    });
    return () => {
      active = false;
    };
  }, [anchor.text]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onClose, true);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onClose, true);
    };
  }, [onClose]);

  async function save(e: WordInfo) {
    if (savedWords[e.word]) return;
    setSavedWords((s) => ({ ...s, [e.word]: "saving" }));
    const res = await saveWordAction({
      word: e.word,
      ipa: e.ipa,
      meaning: e.meaning,
      level: e.level,
      source,
    });
    if (res.ok) {
      setSavedWords((s) => ({ ...s, [e.word]: "saved" }));
      toast.success(`Đã cất “${e.word}” vào sổ từ 🌟`);
    } else {
      setSavedWords((s) => {
        const next = { ...s };
        delete next[e.word];
        return next;
      });
      toast.error(res.error ?? "Chưa lưu được, bé thử lại nhé");
    }
  }

  const vw = typeof window !== "undefined" ? window.innerWidth : 360;
  const vh = typeof window !== "undefined" ? window.innerHeight : 640;
  const W = 310;
  const left = Math.min(Math.max(anchor.x - W / 2, 10), vw - W - 10);
  const placeAbove = anchor.y > vh * 0.58;
  const style: React.CSSProperties = { left, width: W, position: "fixed", zIndex: 60, maxHeight: "70dvh" };
  if (placeAbove) style.bottom = vh - anchor.y + 14;
  else style.top = anchor.y + 16;

  if (!mounted) return null;

  // Portal ra <body> để popup thoát khỏi transform của <main> trong
  // DashboardShell — nếu không nó bị kẹt sau lớp phủ toàn màn hình của TestShell.
  return createPortal(
    <div
      ref={ref}
      style={style}
      className="animate-pop-in flex flex-col overflow-hidden rounded-3xl border-2 border-primary/25 bg-popover shadow-soft-lg"
    >
      <div className="flex items-center justify-between gap-2 border-b px-4 py-2">
        <span className="font-primer min-w-0 flex-1 truncate text-sm font-semibold">{anchor.text}</span>
        <SpeakButton text={anchor.text} label="Nghe đọc cả cụm" />
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-2.5">
        {entries === null ? (
          <p className="flex items-center gap-2 px-2 py-3 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Đang tra từ…
          </p>
        ) : entries.length === 0 ? (
          <p className="px-2 py-3 text-sm text-muted-foreground">Chưa tra được từ nào trong cụm này.</p>
        ) : (
          <ul className="space-y-2">
            {entries.map((e) => {
              const st = savedWords[e.word];
              return (
                <li key={e.word} className="rounded-2xl border p-2.5">
                  <div className="flex items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="font-primer text-lg font-bold leading-tight text-primary">{e.word}</div>
                      {e.ipa && <div className="text-xs text-muted-foreground">{e.ipa}</div>}
                      <div className="mt-0.5 text-sm leading-snug">
                        {e.partOfSpeech && (
                          <span className="mr-1 text-xs font-semibold text-muted-foreground">
                            ({posLabel(e.partOfSpeech)})
                          </span>
                        )}
                        {e.meaning}
                      </div>
                    </div>
                    <SpeakButton text={e.word} />
                    <button
                      type="button"
                      onClick={() => save(e)}
                      disabled={!!st}
                      aria-label="Cất vào sổ từ"
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors",
                        st === "saved"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                      )}
                    >
                      {st === "saving" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : st === "saved" ? (
                        <BookmarkCheck className="h-5 w-5" />
                      ) : (
                        <BookmarkPlus className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>,
    document.body,
  );
}
