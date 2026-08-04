"use client";
import { Trophy, CheckCircle2, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { sectionLabel } from "@/lib/mock-exam";
import type { ExamGradeResult } from "@/server/actions/exam-submit";

export function ExamResults({
  result,
  elapsedLabel,
}: {
  result: ExamGradeResult;
  elapsedLabel: string;
}) {
  const { overall, passed, sections } = result;

  return (
    <div className="sticker overflow-hidden">
      {/* Banner */}
      <div
        className={cn(
          "flex items-center justify-between gap-4 p-5",
          passed
            ? "bg-gradient-to-br from-band-mint to-white dark:to-transparent"
            : "bg-gradient-to-br from-band-sun to-white dark:to-transparent",
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
              passed
                ? "bg-band-mint text-brand-teal"
                : "bg-band-sun text-brand-gold",
            )}
          >
            <Trophy className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold",
                  passed ? "bg-brand-teal text-white" : "bg-brand-yellow text-white",
                )}
              >
                {passed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                {passed ? "Bé làm được rồi!" : "Bé đã cố gắng lắm!"}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {elapsedLabel}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Điểm chung của cả bài thi</p>
          </div>
        </div>
        <div className="text-right">
          <div
            className={cn(
              "font-display text-4xl font-extrabold",
              passed ? "text-brand-teal" : "text-brand-gold",
            )}
          >
            {overall}
          </div>
          <div className="text-xs text-muted-foreground">/ 100 · đạt khi ≥ 60</div>
        </div>
      </div>

      {/* Per-section breakdown */}
      <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
        {sections.map((s, i) => (
          <div key={i} className="bg-card p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {sectionLabel(s.skill, s.title)}
            </div>
            <div className="font-display mt-1 text-2xl font-bold">
              {s.score === null ? "—" : s.score}
              {s.score !== null && <span className="text-sm font-normal text-muted-foreground"> / 100</span>}
            </div>
            {s.total > 0 && (
              <div className="text-xs text-muted-foreground">
                {s.correct}/{s.total} câu đúng
              </div>
            )}
            {s.score === null && (
              <div className="text-xs text-brand-gold">Phần này chưa chấm được</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
