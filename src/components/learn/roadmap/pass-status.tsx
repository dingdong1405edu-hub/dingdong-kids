"use client";
import { Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/** Ngưỡng "qua bài" cho mọi phần trong lộ trình (chỉ khen/động viên, KHÔNG khoá). */
export const ROADMAP_PASS_THRESHOLD = 60;

interface Props {
  score: number;
  threshold?: number;
  /** Hiện kèm số % trước nhãn. */
  showScore?: boolean;
  className?: string;
}

/**
 * Nhãn kết quả một phần lộ trình. Với trẻ em: đạt ngưỡng thì KHEN, chưa đạt thì
 * ĐỘNG VIÊN — không bao giờ dùng nhãn tiêu cực kiểu "Chưa đạt / Yếu".
 */
export function PassStatus({ score, threshold = ROADMAP_PASS_THRESHOLD, showScore = false, className }: Props) {
  const pct = Math.round(score);
  const passed = pct >= threshold;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display text-sm font-extrabold",
        // Đạt → dải bạc hà + chữ xanh ngọc; chưa đạt → dải nắng + chữ mật ong.
        // Cả hai nhóm token đã tự đổi theo chế độ tối nên bỏ hẳn cặp dark: thủ công.
        passed ? "bg-band-mint text-brand-teal" : "bg-band-sun text-brand-gold",
        className,
      )}
    >
      {passed ? <Star className="h-4 w-4 fill-current" /> : <Sparkles className="h-4 w-4" />}
      {showScore && <span className="tabular-nums">{pct}% ·</span>}
      {passed ? "Bé làm tốt lắm!" : `Sắp giỏi rồi — thử lại nhé (${threshold}%)`}
    </span>
  );
}
