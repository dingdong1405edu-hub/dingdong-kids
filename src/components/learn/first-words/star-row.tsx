"use client";
// Hàng sao — cách DUY NHẤT báo kết quả cho bé ở cấp "Bé Tập Nói", vì bé chưa đọc
// được chữ. Sao nảy lần lượt (mỗi sao trễ hơn sao trước) để bé nhìn thấy "được
// thêm sao" chứ không phải ba sao hiện ra cùng lúc.
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const SIZES = {
  sm: "h-5 w-5",
  md: "h-9 w-9",
  lg: "h-14 w-14 sm:h-16 sm:w-16",
} as const;

interface Props {
  /** Số sao đã đạt. */
  value: number;
  max?: number;
  size?: keyof typeof SIZES;
  /** Bật hiệu ứng nảy (dùng ở màn kết quả, tắt ở danh sách chủ đề). */
  animate?: boolean;
  className?: string;
}

export function StarRow({ value, max = 3, size = "md", animate = false, className }: Props) {
  return (
    <div className={cn("flex items-center justify-center gap-1.5", className)} aria-label={`${value} trên ${max} sao`}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < value;
        return (
          <Star
            key={i}
            aria-hidden
            strokeWidth={2.5}
            className={cn(
              SIZES[size],
              "transition-colors",
              filled ? "fill-sunny text-sunny drop-shadow-[0_2px_6px_hsl(var(--sunny)/0.5)]" : "text-muted-foreground/25",
              animate && filled && "animate-star-pop",
            )}
            style={animate && filled ? { animationDelay: `${i * 160}ms` } : undefined}
          />
        );
      })}
    </div>
  );
}
