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
          // Viền dày màu mặt thẻ (`ring-card`) → khung trắng ở chế độ sáng, khung
          // nâu ở chế độ tối; không cần cặp `dark:` viết tay nữa.
          "relative flex h-64 w-64 items-center justify-center rounded-3xl bg-gradient-to-br shadow-soft-xl sm:h-72 sm:w-72",
          "ring-8 ring-card",
          cover,
        )}
      >
        {/* Bong bóng trang trí cho tấm hình bớt phẳng. Vệt sáng để trắng cố định
            vì nền gradient của chủ đề LUÔN tươi ở cả hai chế độ màu. */}
        <span className="pointer-events-none absolute left-6 top-6 h-12 w-12 rounded-full bg-[hsl(0_0%_100%/0.32)] blur-[2px]" aria-hidden />
        <span className="pointer-events-none absolute bottom-8 right-7 h-7 w-7 rounded-full bg-[hsl(0_0%_100%/0.26)] blur-[1px]" aria-hidden />

        <span
          className="select-none text-[128px] leading-none drop-shadow-[0_8px_14px_hsl(var(--shadow-hue)/0.35)] sm:text-[150px]"
          aria-hidden
        >
          {word.emoji}
        </span>

        {/* Huy hiệu loa — nhắc bé rằng bấm vào là có tiếng */}
        <span
          className={cn(
            "absolute -bottom-3 -right-2 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-card text-primary shadow-soft-lg",
            speaking ? "animate-wiggle" : "animate-bounce-soft",
          )}
          aria-hidden
        >
          <Volume2 className="h-9 w-9" strokeWidth={2.5} />
        </span>
      </motion.button>

      {showText ? (
        <div className="text-center">
          {/* Từ đang học ≥ 40px và dùng phông dạy đọc Andika (chữ a/g một tầng). */}
          <div className="font-primer text-5xl font-bold lowercase tracking-wide text-foreground">
            {word.word}
          </div>
          <div className="mt-0.5 text-base font-bold text-muted-foreground">{word.vi}</div>
        </div>
      ) : (
        // Giữ chỗ để tấm hình không nhảy lên xuống khi bố mẹ bật/tắt công tắc chữ.
        <div className="h-[84px]" aria-hidden />
      )}
    </div>
  );
}
