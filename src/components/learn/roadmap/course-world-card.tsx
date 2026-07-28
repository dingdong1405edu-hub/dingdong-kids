"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { themeFor } from "@/lib/roadmap";

interface CourseWorldCardProps {
  slug: string;
  level: string;
  title: string;
  /** Dòng phụ tiếng Việt của khoá (Course.subtitle). */
  subtitle?: string | null;
  description?: string | null;
  total: number;
  done: number;
  recommended?: boolean;
  index: number;
}

/** Thẻ "thế giới" cho một cấp Cambridge ở trang chọn lộ trình. */
export function CourseWorldCard({
  slug,
  level,
  title,
  subtitle,
  description,
  total,
  done,
  recommended,
  index,
}: CourseWorldCardProps) {
  const t = themeFor(level);
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const complete = total > 0 && done >= total;
  const cta = done === 0 ? "Bắt đầu học" : complete ? "Ôn lại" : "Học tiếp";

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link href={`/roadmap/${slug}`} className="group block h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-3xl border-2 border-border/60 bg-card shadow-soft transition-all duration-200 hover:-translate-y-1.5 hover:shadow-soft-lg">
          {/* Cover */}
          <div className={cn("relative h-36 overflow-hidden bg-gradient-to-br", t.cardCover)}>
            <span
              className="pointer-events-none absolute -right-3 -top-3 select-none text-[116px] leading-none opacity-30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              aria-hidden
            >
              {t.emoji}
            </span>
            <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/25 px-2.5 py-1 text-xs font-extrabold text-white backdrop-blur">
                {t.label}
              </span>
              <span className="rounded-full bg-white/25 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
                {t.age}
              </span>
              {recommended && (
                <span className={cn("rounded-full bg-white px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide shadow", t.accentText)}>
                  Đề xuất
                </span>
              )}
            </div>
            {complete && (
              <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
                <Check className={cn("h-5 w-5", t.accentText)} strokeWidth={3} />
              </span>
            )}
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <div className="font-display text-xl font-extrabold leading-tight drop-shadow">{title}</div>
              <div className="text-sm font-semibold text-white/90">{subtitle ?? t.sub}</div>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col p-4">
            {description && <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">{description}</p>}
            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                <span className="tabular-nums">{done}/{total} bài</span>
                <span className="tabular-nums">{pct}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                <div className={cn("h-full rounded-full transition-all", t.accentBg)} style={{ width: `${pct}%` }} />
              </div>
            </div>
            <div className={cn("mt-4 inline-flex items-center gap-1 font-display text-base font-extrabold", t.accentText)}>
              {cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
