"use client";
import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeartBarProps {
  hearts: number;
  maxHearts?: number;
  unlimited?: boolean;
}

/**
 * Dãy tim của bé. Tim vẽ TO hơn bản người lớn (dễ nhìn, dễ chạm trên máy tính
 * bảng) và khi được tặng thêm tim thì quả tim mới "bật" ra bằng `animate-star-pop`
 * để bé thấy ngay là mình vừa được thưởng.
 */
export function HeartBar({ hearts, maxHearts = 5, unlimited = false }: HeartBarProps) {
  // Chỉ chạy hiệu ứng khi số tim TĂNG (được tặng / hồi lại), không chạy khi mất tim.
  const prev = useRef(hearts);
  const [gained, setGained] = useState(false);
  useEffect(() => {
    if (hearts > prev.current) {
      setGained(true);
      const t = setTimeout(() => setGained(false), 700);
      prev.current = hearts;
      return () => clearTimeout(t);
    }
    prev.current = hearts;
  }, [hearts]);

  if (unlimited) {
    return (
      <div className="flex items-center gap-1.5 text-brand-coral" title="Tim không giới hạn">
        <Heart className="h-7 w-7 fill-brand-coral drop-shadow-[0_2px_0_hsl(var(--shadow-hue)/0.18)]" />
        <span className="font-display text-xl font-extrabold leading-none">∞</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1" title={`${hearts}/${maxHearts} tim`}>
      {Array.from({ length: maxHearts }).map((_, i) => {
        const filled = i < hearts;
        return (
          <Heart
            key={i}
            className={cn(
              "h-7 w-7 transition-all duration-200 ease-toy",
              filled
                // San hô thương hiệu thay đỏ mặc định — cùng tông với nút "nguy hiểm".
                ? "fill-brand-coral text-brand-coral drop-shadow-[0_2px_0_hsl(var(--shadow-hue)/0.18)]"
                : "scale-90 fill-muted-foreground/20 text-muted-foreground/40",
              // Quả tim vừa nhận được sẽ nảy lên.
              gained && filled && i === hearts - 1 && "animate-star-pop",
            )}
          />
        );
      })}
    </div>
  );
}
