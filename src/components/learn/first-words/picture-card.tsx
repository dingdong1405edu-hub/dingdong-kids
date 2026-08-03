"use client";
// Tấm hình khổng lồ — với bé CHƯA BIẾT CHỮ, đây là toàn bộ "đề bài". Không có
// chữ nào bắt buộc phải đọc: bé nhìn hình, bấm loa để nghe, thế là đủ.
//
// Chữ tiếng Anh + nghĩa tiếng Việt chỉ hiện khi bố mẹ bật công tắc "hiện chữ"
// (xem first-words-flow.tsx). Mặc định TẮT — hiện chữ cho bé chưa biết đọc chỉ
// làm rối màn hình và khiến bé đoán theo hình dạng chữ thay vì nghe bằng tai.
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FirstWord } from "@/lib/first-words";

interface Props {
  word: FirstWord;
  /** Gradient nền — lấy theo chủ đề để mỗi thế giới một sắc riêng. */
  cover: string;
  showText: boolean;
  /** Đang phát tiếng → hình nảy nhẹ theo, bé thấy được "cái hình đang nói". */
  speaking: boolean;
  onPlay: () => void;
}

export function PictureCard({ word, cover, showText, speaking, onPlay }: Props) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Cả tấm hình LÀ nút loa: bé 3 tuổi bấm trúng cả mảng to dễ hơn nhiều so
          với bấm trúng một cái nút nhỏ ở góc. */}
      <motion.button
        type="button"
        onClick={onPlay}
        aria-label={`Nghe từ ${word.word}`}
        whileTap={{ scale: 0.94 }}
        animate={speaking ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={speaking ? { duration: 0.7, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
        className={cn(
          "relative flex h-56 w-56 items-center justify-center rounded-[2.5rem] bg-gradient-to-br shadow-soft-lg sm:h-64 sm:w-64",
          "ring-8 ring-white/60 dark:ring-white/10",
          cover,
        )}
      >
        {/* Bong bóng trang trí cho tấm hình bớt phẳng */}
        <span className="pointer-events-none absolute left-5 top-5 h-10 w-10 rounded-full bg-white/30 blur-[2px]" aria-hidden />
        <span className="pointer-events-none absolute bottom-7 right-6 h-6 w-6 rounded-full bg-white/25 blur-[1px]" aria-hidden />

        <span className="select-none text-[110px] leading-none drop-shadow-lg sm:text-[126px]" aria-hidden>
          {word.emoji}
        </span>

        {/* Huy hiệu loa — nhắc bé rằng bấm vào là có tiếng */}
        <span
          className={cn(
            "absolute -bottom-3 -right-2 flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary shadow-soft-lg dark:bg-card",
            speaking ? "animate-wiggle" : "animate-bounce-soft",
          )}
          aria-hidden
        >
          <Volume2 className="h-8 w-8" strokeWidth={2.5} />
        </span>
      </motion.button>

      {showText ? (
        <div className="text-center">
          <div className="font-primer text-4xl font-bold lowercase tracking-wide">{word.word}</div>
          <div className="text-sm font-semibold text-muted-foreground">{word.vi}</div>
        </div>
      ) : (
        // Giữ chỗ để tấm hình không nhảy lên xuống khi bố mẹ bật/tắt công tắc chữ.
        <div className="h-[62px]" aria-hidden />
      )}
    </div>
  );
}
