"use client";
import { cn } from "@/lib/utils";

interface ReadingPaletteProps {
  total: number;
  answered: boolean[];
  flagged: boolean[];
  current?: number;
  correctness?: (boolean | undefined)[];
  onJump: (i: number) => void;
}

export function ReadingPalette({ total, answered, flagged, current, correctness, onJump }: ReadingPaletteProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
      {Array.from({ length: total }).map((_, i) => {
        const c = correctness?.[i];
        const isFlagged = flagged[i];
        return (
          <button
            key={i}
            onClick={() => onJump(i)}
            aria-label={`Câu ${i + 1}`}
            className={cn(
              // 48px — vùng chạm tối thiểu của dự án; ngón tay trẻ em kém chính
              // xác, và đặt nhỏ hơn thì nút tròn bị base CSS kéo thành bầu dục.
              "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors",
              c === true
                ? "border-emerald-500 bg-emerald-500 text-white"
                : c === false
                  ? "border-rose-400 bg-rose-400 text-white"
                  : i === current
                    ? "border-primary bg-primary text-primary-foreground"
                    : answered[i]
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-input bg-background text-muted-foreground hover:border-primary/40",
              isFlagged && c === undefined && "ring-2 ring-sunny ring-offset-1",
            )}
          >
            {i + 1}
            {isFlagged && (
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border border-white bg-sunny" />
            )}
          </button>
        );
      })}
    </div>
  );
}
