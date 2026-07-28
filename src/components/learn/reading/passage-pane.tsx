"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpenText, Highlighter, Pause, Play } from "lucide-react";
import { cn, coverEmoji, coverGradient, countWords, levelBadgeClass, levelLabel } from "@/lib/utils";
import { splitPassageTokens, type ReadingSettings, type ReadingTestData } from "./types";
import { speakEnglish, stopSpeaking } from "./speak-en";

interface PassagePaneProps {
  test: ReadingTestData;
  settings: ReadingSettings;
  /** "lookup" = chạm/bôi đen để tra nghĩa; "highlight" = tô để đánh dấu màu. */
  mode: "lookup" | "highlight";
  highlightColor: string;
  highlights: Record<number, string>;
  /** Bé bấm vào MỘT từ tiếng Anh trong đoạn văn (chế độ tra nghĩa). */
  onWordClick: (word: string, e: React.MouseEvent) => void;
  /** Bé kéo bôi đen một cụm trong đoạn văn (chế độ tra nghĩa). */
  onSelectText?: (text: string, x: number, y: number) => void;
  /** Tô màu các token trong vùng bôi đen (chế độ bút). */
  onHighlight: (indices: number[], color: string) => void;
  /** Xoá tô của một token khi chạm vào (chế độ bút). */
  onEraseHighlight: (index: number) => void;
  /** "Chỗ chứa đáp án" cần tô sáng + cuộn tới (khi bé bấm xem ở phần câu hỏi).
   *  `nonce` đổi sau mỗi lần bấm để cuộn lại dù cùng một vị trí. */
  evidence?: { indices: number[]; nonce: number } | null;
}

/** Khay "Nghe cô đọc cả bài": ưu tiên file audio thật, thiếu thì giọng trình duyệt. */
function ReadAloudBar({ audioUrl, passage }: { audioUrl?: string | null; passage: string }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      stopSpeaking();
    };
  }, []);

  function toggle() {
    if (playing) {
      audioRef.current?.pause();
      stopSpeaking();
      setPlaying(false);
      return;
    }
    setPlaying(true);
    if (audioUrl?.trim()) {
      let a = audioRef.current;
      if (!a) {
        a = new Audio(audioUrl);
        a.addEventListener("ended", () => setPlaying(false));
        // File hỏng/404 → rơi về giọng đọc trình duyệt, không để bé bấm vào chỗ chết.
        a.addEventListener("error", () => speakEnglish(passage, 0.8));
        audioRef.current = a;
      }
      void a.play().catch(() => speakEnglish(passage, 0.8));
      return;
    }
    speakEnglish(passage, 0.8);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="btn-chunky mb-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-base font-bold text-primary-foreground"
    >
      {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      {playing ? "Tạm dừng" : "Nghe cô đọc cả bài"}
    </button>
  );
}

export function PassagePane({
  test,
  settings,
  mode,
  highlightColor,
  highlights,
  onWordClick,
  onSelectText,
  onHighlight,
  onEraseHighlight,
  evidence,
}: PassagePaneProps) {
  const wordCount = useMemo(() => countWords(test.passage), [test.passage]);
  const tokens = useMemo(() => splitPassageTokens(test.passage), [test.passage]);
  const proseRef = useRef<HTMLDivElement>(null);
  const evidenceSet = useMemo(() => new Set(evidence?.indices ?? []), [evidence]);

  // Khi bé bấm "xem chỗ chứa đáp án": cuộn tới token đầu tiên của vùng đó.
  // Dep theo `evidence` (object mới mỗi lần bấm nhờ nonce) → cuộn lại cả khi cùng vị trí.
  useEffect(() => {
    if (!evidence || evidence.indices.length === 0) return;
    const el = proseRef.current?.querySelector<HTMLElement>(`[data-idx="${evidence.indices[0]}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [evidence]);

  // Nuốt đúng 1 "click đuôi" của thao tác kéo tô 1 từ (click rơi trên chính từ đó)
  // để tô xong không bị chính click ấy xoá. Kéo tô nhiều từ không sinh click trên
  // token (rơi vào phần tử cha) nên không cần — và không được — nuốt, tránh chặn
  // nhầm thao tác xoá ngay sau đó.
  const suppressEraseRef = useRef(false);

  // Xử lý kết thúc thao tác bôi đen: tra cụm (lookup) hoặc tô màu (highlight).
  function detectSelection() {
    const sel = typeof window !== "undefined" ? window.getSelection() : null;
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) return;
    const text = sel.toString().trim();
    if (!text || !/[A-Za-z]/.test(text)) return;

    if (mode === "highlight") {
      const root = proseRef.current;
      const indices: number[] = [];
      const range = sel.getRangeAt(0);
      if (root) {
        root.querySelectorAll<HTMLElement>("[data-idx]").forEach((el) => {
          if (!sel.containsNode(el, true)) return;
          // containsNode(…, true) coi cả phần tử chỉ "chạm mép" là được chứa → loại bỏ
          // phần tử mà vùng chọn kết thúc ngay ở đầu nó (hoặc bắt đầu ngay ở cuối nó),
          // nếu không sẽ tô dư một token ở rìa so với phần thực sự bôi đen.
          const elRange = document.createRange();
          elRange.selectNodeContents(el);
          if (range.compareBoundaryPoints(Range.END_TO_START, elRange) >= 0) return;
          if (range.compareBoundaryPoints(Range.START_TO_END, elRange) <= 0) return;
          const idx = Number(el.dataset.idx);
          if (Number.isInteger(idx)) indices.push(idx);
        });
      }
      if (indices.length) {
        onHighlight(indices, highlightColor);
        // Chỉ tô đúng 1 token mới sinh click đuôi trên token đó → nuốt 1 click kế tiếp.
        // Hẹn giờ tự gỡ phòng khi click đuôi không xuất hiện (vd trên cảm ứng).
        if (indices.length === 1) {
          suppressEraseRef.current = true;
          setTimeout(() => {
            suppressEraseRef.current = false;
          }, 400);
        }
      }
      sel.removeAllRanges(); // không để vùng bôi kẹt lại sau khi đã tô
      return;
    }

    if (!onSelectText) return;
    const rect = sel.getRangeAt(0).getBoundingClientRect();
    onSelectText(text, rect.left + rect.width / 2, rect.top);
  }

  function handleTokenClick(word: string, e: React.MouseEvent, idx: number) {
    if (mode === "highlight") {
      if (suppressEraseRef.current) {
        suppressEraseRef.current = false; // nuốt đúng click đuôi của thao tác tô vừa rồi
        return;
      }
      onEraseHighlight(idx);
      return;
    }
    onWordClick(word, e);
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Pane header */}
      <div className="flex shrink-0 items-center justify-between border-b bg-card/70 px-4 py-2 backdrop-blur">
        <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Bài đọc</span>
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
          {wordCount} từ
        </span>
      </div>

      {/* Khung đọc cuộn được (theme + cỡ chữ áp ở đây) */}
      <div
        className={cn("reading-surface min-h-0 flex-1 overflow-y-auto", `reading-theme-${settings.theme}`)}
        style={
          {
            "--reading-fontsize": `${settings.fontSize}px`,
            "--reading-leading": `${settings.leading}`,
          } as React.CSSProperties
        }
      >
        <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-7">
          {/* Ảnh bìa */}
          {test.imageUrl ? (
            <div className="relative mb-5 overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={test.imageUrl} alt={test.title} className="h-44 w-full object-cover sm:h-56" />
              <span
                className={cn(
                  "absolute bottom-2 left-2 rounded-full px-2.5 py-0.5 text-[11px] font-bold shadow",
                  levelBadgeClass(test.level),
                )}
              >
                {levelLabel(test.level)}
              </span>
            </div>
          ) : (
            <div
              className={cn(
                "relative mb-5 flex h-32 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br",
                coverGradient(test.id),
              )}
            >
              <span className="text-6xl" aria-hidden>
                {coverEmoji(test.id)}
              </span>
              <span
                className={cn(
                  "absolute bottom-2 left-2 rounded-full px-2.5 py-0.5 text-[11px] font-bold shadow",
                  levelBadgeClass(test.level),
                )}
              >
                {levelLabel(test.level)}
              </span>
            </div>
          )}

          <h1 className="font-display mb-4 text-xl font-bold leading-tight sm:text-2xl">{test.title}</h1>

          {settings.readAloud && test.audioUrl && (
            <ReadAloudBar audioUrl={test.audioUrl} passage={test.passage} />
          )}

          {/* Đoạn văn: mỗi TỪ là một span bấm tra được. `whitespace-pre-wrap` giữ
              nguyên xuống dòng của đề mà không cần chèn <br/> thủ công. */}
          <div
            ref={proseRef}
            className="reading-prose font-primer whitespace-pre-wrap"
            onMouseUp={detectSelection}
            onTouchEnd={() => setTimeout(detectSelection, 0)}
          >
            {tokens.map((tk, i) => (
              <span
                key={i}
                data-idx={i}
                className={cn(tk.isWord && "lookup-word", evidenceSet.has(i) && "reading-evidence")}
                style={highlights[i] ? { backgroundColor: highlights[i] } : undefined}
                onClick={tk.isWord ? (e) => handleTokenClick(tk.text, e, i) : undefined}
              >
                {tk.text}
              </span>
            ))}
          </div>

          <p className="reading-muted mt-7 flex items-start gap-1.5 text-sm text-muted-foreground">
            {mode === "highlight" ? (
              <>
                <Highlighter className="mt-0.5 h-4 w-4 shrink-0" /> Kéo bôi đen để tô màu — chạm vào chỗ đã tô để xoá.
              </>
            ) : (
              <>
                <BookOpenText className="mt-0.5 h-4 w-4 shrink-0" /> Bấm vào một từ — hoặc kéo bôi đen cả cụm — để nghe
                đọc, xem nghĩa &amp; cất vào sổ từ.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
