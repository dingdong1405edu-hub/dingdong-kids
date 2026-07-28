"use client";
import { useState } from "react";
import { Lightbulb, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  /** Nội dung giải thích. Rỗng/null → không render gì. */
  explanation?: string | null;
  className?: string;
  /** Mặc định mở (chữa bài) hay đóng (chỉ hiện nút bấm để xem). */
  defaultOpen?: boolean;
}

/**
 * Hộp "Vì sao lại thế nhỉ?" dùng chung cho MỌI câu quiz/trắc nghiệm trong app.
 * Luôn có nút bấm để mở/đóng, hiển thị cho CẢ câu đúng lẫn sai — bé không chỉ
 * thấy mỗi chữ "Giỏi quá" khi trả lời đúng mà còn hiểu tại sao.
 */
export function AnswerExplanation({ explanation, className, defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  if (!explanation) return null;
  return (
    <div
      className={cn(
        "rounded-2xl border-2 border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-400/30 dark:bg-amber-500/15 dark:text-amber-100",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 px-3.5 py-2 text-left text-sm font-extrabold"
      >
        <Lightbulb className="h-4 w-4 shrink-0" />
        <span className="flex-1">Vì sao lại thế nhỉ?</span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="px-3.5 pb-3 text-[15px] leading-relaxed">{explanation}</div>}
    </div>
  );
}
