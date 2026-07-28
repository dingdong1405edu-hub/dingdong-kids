"use client";
import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn, xpToLevel } from "@/lib/utils";

interface XPBarProps {
  xp: number;
}

/**
 * Thanh sao của bé. Dùng vàng nắng (`text-sunny`) thay vàng mặc định cho khớp
 * bảng màu mới; mỗi lần bé kiếm thêm sao thì ngôi sao "bật" ra
 * (`animate-star-pop`) để phần thưởng thấy rõ ngay lập tức.
 */
export function XPBar({ xp }: XPBarProps) {
  const { level, progress, next } = xpToLevel(xp);

  const prev = useRef(xp);
  const [gained, setGained] = useState(false);
  useEffect(() => {
    if (xp > prev.current) {
      setGained(true);
      const t = setTimeout(() => setGained(false), 700);
      prev.current = xp;
      return () => clearTimeout(t);
    }
    prev.current = xp;
  }, [xp]);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 font-display font-extrabold">
          <Star
            className={cn("h-5 w-5 text-sunny fill-sunny drop-shadow-sm", gained && "animate-star-pop")}
          />
          Bậc {level}
        </span>
        <span className="text-xs font-semibold tabular-nums text-muted-foreground">
          {xp} / {next} ⭐
        </span>
      </div>
      <Progress value={progress} className="h-3" />
    </div>
  );
}
