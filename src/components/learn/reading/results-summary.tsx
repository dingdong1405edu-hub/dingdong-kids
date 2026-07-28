"use client";
import { Clock } from "lucide-react";
import { cn, levelBadgeClass, levelLabel } from "@/lib/utils";
import { PassStatus } from "@/components/learn/roadmap/pass-status";

interface ResultsSummaryProps {
  score: number;
  correct: number;
  total: number;
  level: string;
  elapsedLabel?: string;
  /** Nếu có (ngữ cảnh lộ trình): hiện nhãn "Đạt/Chưa đạt" theo ngưỡng %. */
  passThreshold?: number;
}

/** Lời khen theo mức điểm — luôn tích cực, không bao giờ dán nhãn "kém". */
function praise(pct: number): string {
  if (pct >= 90) return "Siêu quá! 🌟";
  if (pct >= 70) return "Bé làm tốt lắm! 👏";
  if (pct >= 50) return "Khá rồi đó, cố thêm chút nữa nhé! 💪";
  return "Bé đã cố gắng rồi! Cùng xem lại nhé 🐻";
}

export function ResultsSummary({ score, correct, total, level, elapsedLabel, passThreshold }: ResultsSummaryProps) {
  const pct = Math.round(score);
  const r = 26;
  const circumference = 2 * Math.PI * r;
  const dash = (pct / 100) * circumference;
  const color = pct >= 80 ? "text-emerald-500" : pct >= 50 ? "text-sunny" : "text-primary";

  return (
    <div className="flex items-center gap-4 rounded-3xl border-2 bg-gradient-to-br from-primary/5 to-transparent p-4">
      <div className="relative h-16 w-16 shrink-0">
        <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
          <circle cx="32" cy="32" r={r} fill="none" stroke="currentColor" strokeWidth="7" className="text-muted" />
          <circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            className={color}
          />
        </svg>
        <span className={cn("absolute inset-0 flex items-center justify-center text-sm font-extrabold", color)}>
          {pct}%
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-display text-base font-bold">{praise(pct)}</span>
          <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-bold", levelBadgeClass(level))}>
            {levelLabel(level)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Đúng{" "}
          <b className="text-foreground">
            {correct}/{total}
          </b>{" "}
          câu
        </p>
        {elapsedLabel && (
          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> {elapsedLabel}
          </p>
        )}
        {passThreshold != null && <PassStatus score={pct} threshold={passThreshold} className="mt-1.5" />}
      </div>
    </div>
  );
}
