"use client";
import { Volume2, FileText } from "lucide-react";
import { TappableEnglish } from "@/components/learn/reading/word-lookup";
import { cn } from "@/lib/utils";
import type { TranscriptSegment } from "@/lib/transcript";

const SPEAKER_STYLES: Record<string, string> = {
  A: "bg-primary/15 text-primary",
  B: "bg-band-lav text-brand-grape",
};

function speakerStyle(speaker: string): string {
  return SPEAKER_STYLES[speaker.toUpperCase()] ?? "bg-muted text-muted-foreground";
}

/** Nhãn người nói: chữ cái thì viết hoa, tên đầy đủ (Mum, Miss Kim…) thì giữ nguyên. */
function speakerLabel(speaker: string): string {
  return speaker.length === 1 ? speaker.toUpperCase() : speaker;
}

interface TapescriptProps {
  segments: TranscriptSegment[];
  /** segment index → list of question numbers (1-based) it answers. */
  evidenceMap: Map<number, number[]>;
  currentSegment: number | null;
  /** Whether per-sentence replay can actually produce sound (browser en voice). */
  canReplay?: boolean;
  onPlaySegment: (i: number) => void;
  onWordClick: (word: string, e: React.MouseEvent) => void;
}

export function Tapescript({
  segments,
  evidenceMap,
  currentSegment,
  canReplay = true,
  onPlaySegment,
  onWordClick,
}: TapescriptProps) {
  if (segments.length === 0) {
    return (
      <div className="rounded-3xl border-2 border-dashed p-6 text-center text-sm text-muted-foreground">
        Bài nghe này chưa có lời thoại.
      </div>
    );
  }

  return (
    <div className="rounded-3xl border-2 bg-card p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-bold text-primary">
        <FileText className="h-4 w-4" /> Lời thoại
      </div>
      <p className="mb-3 text-sm text-muted-foreground">
        {canReplay ? "Bấm loa để nghe lại từng câu. " : ""}Câu được tô màu là chỗ có câu trả lời. Bấm vào một từ để xem
        nghĩa.
      </p>

      <ol className="space-y-2">
        {segments.map((seg, i) => {
          const qs = evidenceMap.get(i);
          const isEvidence = !!qs && qs.length > 0;
          const isCurrent = currentSegment === i;
          return (
            <li
              key={i}
              className={cn(
                "group flex items-start gap-2 rounded-2xl border-2 p-3 transition-colors",
                isCurrent
                  ? "border-primary/50 bg-primary/10"
                  : isEvidence
                    ? "border-sunny/60 bg-sunny/15"
                    : "border-transparent hover:bg-muted/50",
              )}
            >
              {seg.speaker ? (
                <span
                  className={cn(
                    "mt-0.5 flex h-7 shrink-0 items-center justify-center rounded-full px-2 text-xs font-bold",
                    speakerStyle(seg.speaker),
                  )}
                >
                  {speakerLabel(seg.speaker)}
                </span>
              ) : (
                <span className="mt-0.5 h-7 w-7 shrink-0" />
              )}

              <div className="min-w-0 flex-1">
                <TappableEnglish
                  text={seg.text}
                  onWordClick={onWordClick}
                  className="font-primer block text-[16px] leading-relaxed"
                />
                {isEvidence && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {qs!.map((n) => (
                      <span
                        key={n}
                        className="rounded-full bg-sunny/40 px-2 py-0.5 text-[11px] font-bold text-brand-gold"
                      >
                        Đáp án câu {n}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {canReplay && (
                <button
                  type="button"
                  onClick={() => onPlaySegment(i)}
                  aria-label="Nghe lại câu này"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary/15 hover:text-primary"
                >
                  <Volume2 className="h-5 w-5" />
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
