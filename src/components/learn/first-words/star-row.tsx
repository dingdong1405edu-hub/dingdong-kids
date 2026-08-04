"use client";
// Hàng sao — cách DUY NHẤT báo kết quả cho bé ở cấp "Bé Tập Nói", vì bé chưa đọc
// được chữ. Sao nảy lần lượt (mỗi sao trễ hơn sao trước) để bé nhìn thấy "được
// thêm sao" chứ không phải ba sao hiện ra cùng lúc.
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

// Cỡ sao ở cấp này lớn hơn phần còn lại của sản phẩm: sao là "điểm số" duy nhất
// bé đọc được, nên nó phải là thứ to nhất trên màn kết quả.
const SIZES = {
  sm: "h-6 w-6",
  md: "h-10 w-10",
  lg: "h-16 w-16 sm:h-20 sm:w-20",
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
    <div className={cn("flex items-center justify-center gap-2", className)} aria-label={`${value} trên ${max} sao`}>
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
              // Sao chưa đạt được TÔ ĐẶC màu chìm (không phải viền rỗng): bé nhìn
              // ra ngay đây là "ô còn trống", không tưởng là sao bị mờ.
              filled
                ? "fill-sunny text-sunny drop-shadow-[0_3px_8px_hsl(var(--sunny)/0.55)]"
                : "fill-muted text-border",
              animate && filled && "animate-star-pop",
            )}
            style={animate && filled ? { animationDelay: `${i * 160}ms` } : undefined}
          />
        );
      })}
    </div>
  );
}
