"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, BookmarkPlus, BookmarkCheck, Loader2, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { cn, levelLabel } from "@/lib/utils";
import { lookupWordAction } from "@/server/actions/word-lookup";
import { saveWordAction } from "@/server/actions/saved-word";
import { splitPassageTokens } from "./types";
import { speakEnglish } from "./speak-en";

export interface LookupAnchor {
  /** Từ tiếng Anh bé vừa bấm (đã bỏ dấu câu hai đầu). */
  word: string;
  x: number;
  y: number;
}

export interface WordInfo {
  word: string;
  /** Phiên âm IPA, vd "/ˈel.ɪ.fənt/". Có thể rỗng nếu AI không trả về. */
  ipa: string;
  /** Nghĩa tiếng Việt, viết cho trẻ em. */
  meaning: string;
  /** Từ loại (noun / verb / adjective…). */
  partOfSpeech: string;
  /** Cấp Cambridge ước lượng (STARTERS, MOVERS…). */
  level: string;
  examples: Array<{ sentence: string; meaning: string }>;
}

const POS_VI: Record<string, string> = {
  noun: "danh từ",
  verb: "động từ",
  adjective: "tính từ",
  adverb: "trạng từ",
  pronoun: "đại từ",
  preposition: "giới từ",
  conjunction: "liên từ",
  determiner: "từ hạn định",
  interjection: "thán từ",
  number: "số đếm",
};

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/**
 * Server action trả về shape do `generateWordLookup` quy định; ta vẫn coerce thủ
 * công để popup không vỡ nếu từ điển thiếu trường (dữ liệu cũ / AI trả thiếu).
 *
 * Chấp nhận cả hai kiểu vỏ: trả thẳng object từ, hoặc bọc trong `{ ok, data }`
 * theo quy ước server action của dự án — popup không nên vỡ chỉ vì lớp vỏ.
 */
export function coerceWordInfo(raw: unknown, fallbackWord: string): WordInfo | null {
  if (!raw || typeof raw !== "object") return null;
  const outer = raw as Record<string, unknown>;
  const r =
    outer.data && typeof outer.data === "object" ? (outer.data as Record<string, unknown>) : outer;
  const meaning = str(r.meaning);
  if (!meaning) return null;
  const examples = (Array.isArray(r.examples) ? r.examples : [])
    .filter((e): e is Record<string, unknown> => !!e && typeof e === "object")
    .map((e) => ({ sentence: str(e.sentence), meaning: str(e.meaning) }))
    .filter((e) => e.sentence)
    .slice(0, 2);
  return {
    word: str(r.word) || fallbackWord,
    ipa: str(r.ipa),
    meaning,
    partOfSpeech: str(r.partOfSpeech),
    level: str(r.level),
    examples,
  };
}

/** Nhãn từ loại bằng tiếng Việt; không nhận ra thì giữ nguyên bản tiếng Anh. */
export function posLabel(pos: string): string {
  return POS_VI[pos.toLowerCase()] ?? pos;
}

/** Nút loa tròn, to, dùng lại ở nhiều chỗ trong module Đọc/Nghe. */
export function SpeakButton({
  text,
  audioUrl,
  className,
  label = "Nghe phát âm",
}: {
  text: string;
  audioUrl?: string | null;
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        if (audioUrl?.trim()) {
          try {
            const a = new Audio(audioUrl);
            a.play().catch(() => speakEnglish(text));
            return;
          } catch {
            /* rơi xuống giọng trình duyệt */
          }
        }
        speakEnglish(text);
      }}
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform hover:bg-primary/20 active:scale-95",
        className,
      )}
    >
      <Volume2 className="h-5 w-5" />
    </button>
  );
}

/**
 * Đoạn văn bản tiếng Anh mà MỖI TỪ đều bấm được để tra nghĩa. Dùng ở những nơi
 * ngoài khung bài đọc chính (lời thoại bài nghe, hộp "đáp án nằm ở đâu"), nơi
 * không có sẵn CSS `.reading-prose .lookup-word` nên tự lo phần tô khi rê chuột.
 */
export function TappableEnglish({
  text,
  onWordClick,
  className,
}: {
  text: string;
  onWordClick?: (word: string, e: React.MouseEvent) => void;
  className?: string;
}) {
  const tokens = useMemo(() => splitPassageTokens(text), [text]);
  if (!onWordClick) return <span className={className}>{text}</span>;
  return (
    <span className={className}>
      {tokens.map((tk, i) =>
        tk.isWord ? (
          <span
            key={i}
            onClick={(e) => onWordClick(tk.text, e)}
            className="cursor-pointer rounded transition-colors hover:bg-primary/15"
          >
            {tk.text}
          </span>
        ) : (
          <span key={i}>{tk.text}</span>
        ),
      )}
    </span>
  );
}

/**
 * Popup tra từ khi bé bấm vào MỘT từ trong bài đọc: phiên âm IPA + nghĩa tiếng
 * Việt + ví dụ + nút loa + cất vào sổ từ.
 *
 * Đơn vị tra là TỪ (không phải ký tự) — tiếng Anh có ranh giới từ rõ ràng nên
 * chỉ cần tách theo khoảng trắng/dấu câu là đủ.
 */
export function WordLookup({
  anchor,
  onClose,
  source,
}: {
  anchor: LookupAnchor;
  onClose: () => void;
  /** Ngữ cảnh lưu (vd "reading:<id>") để ghi nguồn vào sổ từ. */
  source?: string;
}) {
  const [info, setInfo] = useState<WordInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  // Portal-to-body cần DOM; chỉ mở cổng sau khi mount (giống TestShell).
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setInfo(null);
    setSaveState("idle");
    void lookupWordAction(anchor.word).then((r: unknown) => {
      if (!active) return;
      setInfo(coerceWordInfo(r, anchor.word));
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [anchor.word]);

  const save = useCallback(async () => {
    if (!info || saveState !== "idle") return;
    setSaveState("saving");
    const res = await saveWordAction({
      word: info.word,
      ipa: info.ipa,
      meaning: info.meaning,
      level: info.level,
      source,
    });
    if (res.ok) {
      setSaveState("saved");
      toast.success("Đã cất vào sổ từ của bé 🌟");
    } else {
      setSaveState("idle");
      toast.error(res.error ?? "Chưa lưu được, bé thử lại nhé");
    }
  }, [info, saveState, source]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    // Cuộn ở pha capture: cuộn khung đoạn văn (scroll container bên trong) cũng
    // đóng popup, không để nó lơ lửng giữa màn hình.
    window.addEventListener("scroll", onClose, true);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onClose, true);
    };
  }, [onClose]);

  const vw = typeof window !== "undefined" ? window.innerWidth : 360;
  const vh = typeof window !== "undefined" ? window.innerHeight : 640;
  const W = 300;
  const left = Math.min(Math.max(anchor.x - W / 2, 10), vw - W - 10);
  const placeAbove = anchor.y > vh * 0.58;
  const style: React.CSSProperties = { left, width: W, position: "fixed", zIndex: 60, maxHeight: "70dvh" };
  if (placeAbove) style.bottom = vh - anchor.y + 14;
  else style.top = anchor.y + 16;

  if (!mounted) return null;

  // Portal ra <body> để popup thoát khỏi transform của <main> trong
  // DashboardShell (containing block của `position: fixed`) — nếu không nó bị
  // kẹt ở stacking context thấp hơn, nằm sau lớp phủ toàn màn hình của TestShell.
  return createPortal(
    <div
      ref={ref}
      style={style}
      className="animate-pop-in overflow-y-auto rounded-3xl border-2 border-primary/25 bg-popover p-4 text-popover-foreground shadow-soft-lg"
    >
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <div className="font-primer break-words text-3xl font-bold leading-tight text-primary">{anchor.word}</div>
          {info?.ipa && <div className="mt-0.5 text-sm text-muted-foreground">{info.ipa}</div>}
        </div>
        <SpeakButton text={anchor.word} />
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
          style={{ minHeight: 36 }}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-3 border-t pt-3 text-sm">
        {loading ? (
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Đang tra từ…
          </span>
        ) : info ? (
          <>
            <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
              {info.partOfSpeech && (
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                  {posLabel(info.partOfSpeech)}
                </span>
              )}
              {info.level && (
                <span className="rounded-full bg-sunny/25 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:text-amber-300">
                  {levelLabel(info.level)}
                </span>
              )}
            </div>
            <p className="text-base font-semibold leading-snug">{info.meaning}</p>

            {info.examples.length > 0 && (
              <ul className="mt-2.5 space-y-1.5">
                {info.examples.map((ex, i) => (
                  <li key={i} className="rounded-2xl bg-muted/60 p-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-primer min-w-0 flex-1 text-sm leading-snug">{ex.sentence}</span>
                      <SpeakButton text={ex.sentence} className="h-9 w-9" label="Nghe câu ví dụ" />
                    </div>
                    {ex.meaning && <p className="mt-0.5 text-xs italic text-muted-foreground">{ex.meaning}</p>}
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              onClick={save}
              disabled={saveState !== "idle"}
              className={cn(
                "btn-chunky mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-2xl py-2.5 text-sm font-bold transition-colors",
                saveState === "saved"
                  ? "bg-emerald-500 text-white"
                  : "bg-primary text-primary-foreground hover:brightness-105",
              )}
            >
              {saveState === "saving" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : saveState === "saved" ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <BookmarkPlus className="h-4 w-4" />
              )}
              {saveState === "saved" ? "Đã có trong sổ từ" : "Cất vào sổ từ"}
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Từ này chưa có trong sổ tra. Bé bấm nút loa để nghe đọc nhé 🔊
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
}
