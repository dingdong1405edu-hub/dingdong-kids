"use client";

import Link from "next/link";
import { Check, ChevronRight, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SkillMeta } from "@/lib/roadmap";

interface SkillTileProps {
  meta: SkillMeta;
  published: boolean;
  done: boolean;
  onClick: () => void;
  /** Nếu có (phần đã publish): hiện nút "Tải PDF" cạnh ô kỹ năng. */
  pdfHref?: string;
}

/** Một ô kỹ năng (từ vựng / ghép vần / ngữ pháp / đọc / nghe / viết / nói) trong hộp thoại bài học. */
export function SkillTile({ meta, published, done, onClick, pdfHref }: SkillTileProps) {
  const Icon = meta.icon;
  return (
    <div
      className={cn(
        "group flex items-center gap-2 rounded-2xl border-2 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft",
        // Kỹ năng đã học xong khoác dải bạc hà để bé nhận ra ngay bằng MÀU,
        // không phải đọc chữ.
        done ? "border-brand-lime/50 bg-band-mint" : "border-border bg-card hover:border-primary/40",
      )}
    >
      <button type="button" onClick={onClick} className="flex min-w-0 flex-1 items-center gap-3 text-left">
        <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl", meta.iconBg, meta.iconText)}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5 font-display font-extrabold leading-tight">
            {meta.label}
            <span className="text-xs font-semibold text-muted-foreground">{meta.labelEn}</span>
          </div>
          <div className="text-[11px] font-semibold text-muted-foreground">
            {done ? "Bé đã học xong 🌟" : published ? "Sẵn sàng học" : "Sắp có nội dung"}
          </div>
        </div>
        {/* Dấu tích dùng brand-teal: đọc rõ trên dải bạc hà ở CẢ hai chế độ sáng/tối
            nên không cần cặp dark: thủ công. */}
        {done ? (
          <Check className="h-5 w-5 shrink-0 text-brand-teal" strokeWidth={3} />
        ) : published ? (
          <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        ) : (
          <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
            Sắp có
          </span>
        )}
      </button>
      {pdfHref && published && (
        <Link
          href={pdfHref}
          title="Tải PDF"
          aria-label={`Tải PDF ${meta.label}`}
          className="flex shrink-0 items-center gap-1 rounded-xl border-2 border-border px-2 py-1.5 text-[11px] font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <FileDown className="h-4 w-4" /> PDF
        </Link>
      )}
    </div>
  );
}
