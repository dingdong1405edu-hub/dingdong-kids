"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { FIRST_WORDS_LEVEL } from "@/lib/first-words";

interface Props {
  totalStars: number;
  maxStars: number;
  /** Số chủ đề bé đã chơi ít nhất một lần. */
  doneUnits: number;
  totalUnits: number;
  totalWords: number;
}

/**
 * Thẻ "thế giới" của cấp **Bé Tập Nói** — đứng TRƯỚC Pre-Starters ở trang lộ trình.
 *
 * Tách khỏi `CourseWorldCard` vì cấp này khác chất: không có Course trong DB,
 * không chia 7 kỹ năng, không bán theo gói, và tiến độ đo bằng SAO chứ không
 * phải số bài đã xong. Nhồi hết vào một component chung sẽ phải cắm đầy nhánh
 * `if` cho một trường hợp duy nhất.
 */
export function FirstWordsWorldCard({ totalStars, maxStars, doneUnits, totalUnits, totalWords }: Props) {
  const pct = maxStars > 0 ? Math.round((totalStars / maxStars) * 100) : 0;
  const fresh = totalStars === 0;
  const cta = fresh ? "Bắt đầu học" : doneUnits >= totalUnits ? "Ôn lại" : "Học tiếp";

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link href={FIRST_WORDS_LEVEL.href} className="group block h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-3xl border-2 border-fuchsia-200 bg-card shadow-soft transition-all duration-200 hover:-translate-y-1.5 hover:shadow-soft-lg dark:border-fuchsia-500/30">
          {/* Cover */}
          <div className={cn("relative h-36 overflow-hidden bg-gradient-to-br", FIRST_WORDS_LEVEL.cardCover)}>
            <span
              className="pointer-events-none absolute -right-3 -top-3 select-none text-[116px] leading-none opacity-30 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
              aria-hidden
            >
              {FIRST_WORDS_LEVEL.emoji}
            </span>
            <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/25 px-2.5 py-1 text-xs font-extrabold text-white backdrop-blur">
                {FIRST_WORDS_LEVEL.labelEn}
              </span>
              <span className="rounded-full bg-white/25 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
                {FIRST_WORDS_LEVEL.age}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-fuchsia-600 shadow">
                <Sparkles className="h-3 w-3" /> Miễn phí
              </span>
            </div>
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <div className="font-display text-xl font-extrabold leading-tight drop-shadow">
                {FIRST_WORDS_LEVEL.label}
              </div>
              <div className="text-sm font-semibold text-white/90">{FIRST_WORDS_LEVEL.sub}</div>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col p-4">
            <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
              Chưa biết chữ vẫn học được: bé nhìn hình, nghe cô đọc rồi nói theo từng từ — cô AI chấm phát âm và
              tặng sao cho bé.
            </p>
            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                <span className="tabular-nums">
                  {totalUnits} chủ đề · {totalWords} từ
                </span>
                <span className="inline-flex items-center gap-1 tabular-nums">
                  <Star className="h-3.5 w-3.5 fill-sunny text-sunny" />
                  {totalStars}/{maxStars}
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-sunny transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
            <div
              className={cn(
                "mt-4 inline-flex items-center gap-1 font-display text-base font-extrabold",
                FIRST_WORDS_LEVEL.accentText,
              )}
            >
              {cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
