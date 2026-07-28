"use client";
// Nút loa của phần Ghép vần. Ưu tiên file audio thật (admin tải lên hoặc sinh
// bằng TTS ở server — xem @/lib/tts); nếu chưa có thì `playWord` tự đọc bằng
// giọng en-US của trình duyệt. Trẻ 4–7 tuổi chưa đọc được nên MỌI từ tiếng Anh
// trên màn hình đều phải bấm nghe được.
import { Volume2 } from "lucide-react";
import { playWord } from "@/lib/speech";
import { cn } from "@/lib/utils";

type SoundVariant = "circle" | "pill" | "chip";

interface Props {
  /** Từ / âm cần đọc lên. */
  text: string;
  /** File audio có sẵn (nếu có) — dùng trước giọng trình duyệt. */
  audioUrl?: string | null;
  /** Chữ hiện trên nút (chỉ dùng cho kiểu "pill"). */
  label?: string;
  variant?: SoundVariant;
  className?: string;
}

export function SoundButton({ text, audioUrl, label = "Nghe lại", variant = "pill", className }: Props) {
  const play = () => playWord({ word: text, audioUrl });

  if (variant === "circle") {
    return (
      <button
        type="button"
        onClick={play}
        aria-label={`Nghe ${text}`}
        className={cn(
          "btn-chunky flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground",
          "transition-transform hover:scale-[1.04] active:scale-95",
          className,
        )}
      >
        <Volume2 className="h-11 w-11" />
      </button>
    );
  }

  if (variant === "chip") {
    return (
      <button
        type="button"
        onClick={play}
        aria-label={`Nghe ${text}`}
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary",
          "transition-colors hover:bg-primary/20 active:translate-y-[2px]",
          className,
        )}
      >
        <Volume2 className="h-6 w-6" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={play}
      aria-label={`Nghe ${text}`}
      className={cn(
        "btn-chunky inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border-4 border-primary/25",
        "bg-card px-5 py-3 font-display text-base font-extrabold text-primary hover:bg-primary/5",
        className,
      )}
    >
      <Volume2 className="h-5 w-5" /> {label}
    </button>
  );
}
