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
          "h-8 w-8",
          alive
            ? "text-orange-500 fill-sunny drop-shadow-sm"
            : "text-muted-foreground/50 fill-muted-foreground/20",
          gained && "animate-star-pop",
        )}
      />
      <div>
        <div className="font-display text-xl font-extrabold leading-none">{streak}</div>
        <div className="text-xs font-semibold text-muted-foreground">ngày liên tiếp</div>
      </div>
    </div>
  );
}
