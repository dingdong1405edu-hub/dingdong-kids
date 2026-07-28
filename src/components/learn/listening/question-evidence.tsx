"use client";
import { MapPin, Volume2, Bookmark, BookmarkCheck, Headphones } from "lucide-react";
import { TappableEnglish } from "@/components/learn/reading/word-lookup";
import { cn } from "@/lib/utils";
import type { TranscriptSegment } from "@/lib/transcript";

interface QuestionEvidenceProps {
  segment: TranscriptSegment | null;
  canReplay: boolean;
  onPlay: () => void;
  saved: boolean;
  onToggleSave: () => void;
  onWordClick: (word: string, e: React.MouseEvent) => void;
}

/** Hiện dưới mỗi câu hỏi khi chữa bài: câu trả lời nằm ở đoạn nào trong audio +
 *  nút nghe lại đúng câu đó + cất lại để ôn sau. */
export function QuestionEvidence({
  segment,
  canReplay,
  onPlay,
  saved,
  onToggleSave,
  onWordClick,
}: QuestionEvidenceProps) {
  return (
    <div className="mt-3 rounded-2xl border-2 border-primary/25 bg-primary/5 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
          <MapPin className="h-4 w-4" /> Câu trả lời nằm ở đây
        </span>
        <button
          type="button"
          onClick={onToggleSave}
          className={cn(
            "inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-bold transition-colors",
            saved ? "bg-sunny/25 text-amber-700 dark:text-amber-300" : "text-muted-foreground hover:bg-muted",
          )}
        >
          {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          {saved ? "Đã cất để ôn" : "Cất để ôn"}
        </button>
      </div>

      {segment ? (
        <div className="mt-2 flex items-start gap-2">
          {segment.speaker && (
            <span className="mt-0.5 flex h-6 shrink-0 items-center justify-center rounded-full bg-card px-2 text-[11px] font-bold text-primary">
              {segment.speaker.length === 1 ? segment.speaker.toUpperCase() : segment.speaker}
            </span>
          )}
          <TappableEnglish
            text={segment.text}
            onWordClick={onWordClick}
            className="font-primer min-w-0 flex-1 text-[15px] leading-relaxed"
          />
          {canReplay && (
            <button
              type="button"
              onClick={onPlay}
              aria-label="Nghe lại đoạn này"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 bg-card text-primary transition-colors hover:bg-primary/10"
            >
              <Volume2 className="h-5 w-5" />
            </button>
          )}
        </div>
      ) : (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Headphones className="h-4 w-4" /> Chưa dò được đúng chỗ — bé nghe lại cả lời thoại bên dưới nhé.
        </p>
      )}
    </div>
  );
}
