"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CourseTheme } from "@/lib/roadmap";

interface ChapterBannerProps {
  index: number;
  title: string;
  /** Nhóm "Chưa phân chương" — không hiện nhãn "Chương N". */
  unchaptered?: boolean;
  theme: CourseTheme;
  done: number;
  total: number;
}

/** Banner đầu mỗi chương trên bản đồ học (kiểu "unit" của Duolingo). */
export function ChapterBanner({ index, title, unchaptered = false, theme, done, total }: ChapterBannerProps) {
  const complete = total > 0 && done >= total;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-r p-4 text-white shadow-chunky-sm",
        theme.hero,
      )}
    >
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/80">
            {unchaptered ? "Bài lẻ" : `Chặng ${index}`}
          </div>
          <div className="truncate font-display text-xl font-extrabold leading-tight">{title}</div>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-1">
          <span className="text-2xl leading-none drop-shadow-sm" aria-hidden>
            {complete ? "🎉" : theme.emoji}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-extrabold tabular-nums backdrop-blur">
            {complete && <Check className="h-3 w-3" strokeWidth={3} />}
            {done}/{total}
          </span>
        </div>
      </div>

      {/* Thanh tiến độ nhỏ của chặng */}
      <div className="relative z-10 mt-2.5 h-1.5 overflow-hidden rounded-full bg-black/15">
        <div className="h-full rounded-full bg-white/90 transition-all" style={{ width: `${pct}%` }} />
      </div>

      {/* Emoji trang trí mờ ở góc */}
      <span
        className="pointer-events-none absolute -right-4 -top-5 select-none text-[92px] leading-none opacity-15"
        aria-hidden
      >
        {theme.emoji}
      </span>
    </div>
  );
}
