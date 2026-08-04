"use client";
import { useEffect, useRef, useState } from "react";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakFlameProps {
  streak: number;
}

/**
 * Chuỗi ngày học liên tiếp. Ngọn lửa vẽ to và lắc nhẹ khi bé còn giữ chuỗi —
 * mốc mới thì bật lên (`animate-star-pop`) như một phần thưởng.
 */
export function StreakFlame({ streak }: StreakFlameProps) {
  const alive = streak > 0;

  const prev = useRef(streak);
  const [gained, setGained] = useState(false);
  useEffect(() => {
    if (streak > prev.current) {
      setGained(true);
      const t = setTimeout(() => setGained(false), 700);
      prev.current = streak;
      return () => clearTimeout(t);
    }
    prev.current = streak;
  }, [streak]);

  return (
    <div className="flex items-center gap-2">
      <Flame
        className={cn(
          "h-9 w-9",
          alive
            // Ruột vàng nắng, viền cam nắng — cùng cặp màu với gờ nút chính.
            ? "fill-sunny text-brand-sun drop-shadow-[0_2px_0_hsl(var(--shadow-hue)/0.20)]"
            : "fill-muted-foreground/20 text-muted-foreground/50",
          gained && "animate-star-pop",
        )}
      />
      <div>
        <div className={cn("font-display text-2xl font-extrabold leading-none", alive ? "text-brand-gold" : "text-muted-foreground")}>
          {streak}
        </div>
        <div className="text-xs font-bold text-muted-foreground">ngày liên tiếp</div>
      </div>
    </div>
  );
}
