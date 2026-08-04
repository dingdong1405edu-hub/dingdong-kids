"use client";
// Một ô chủ đề trên bản đồ "Bé Tập Nói".
//
// Bé chưa đọc được chữ nên ô này phải nói hết mọi thứ bằng HÌNH: emoji cỡ lớn
// là danh tính chủ đề, thanh vàng là "bé đã đi được bao xa", ngôi sao góc trên
// là "xong rồi". Chữ trên ô dành cho bố mẹ.
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { FIRST_WORDS_LEVEL, STARS_PER_WORD, type FirstWordsUnit } from "@/lib/first-words";

interface Props {
  unit: FirstWordsUnit;
  /** Sao cao nhất bé từng đạt ở chủ đề này. */
  stars: number;
  /** Thứ tự trong lưới — chỉ dùng để so le hiệu ứng hiện ra. */
  index: number;
}

export function FirstWordsUnitCard({ unit, stars, index }: Props) {
  const max = unit.words.length * STARS_PER_WORD;
  const pct = max > 0 ? Math.min(100, Math.round((stars / max) * 100)) : 0;
  const done = max > 0 && stars >= max;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      // Chặn độ trễ: với hàng chục chủ đề, so le tuyến tính sẽ khiến ô cuối
      // hiện ra sau vài giây — bé tưởng trang bị lỗi.
      transition={{ delay: Math.min(index, 11) * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`${FIRST_WORDS_LEVEL.href}/${unit.id}`} className="group block">
        <div className="sticker flex flex-col items-center gap-2 rounded-3xl p-3 transition-transform duration-200 hover:-translate-y-1.5">
          <div
            className={cn(
              "relative flex aspect-square w-full items-center justify-center rounded-[1.75rem] bg-gradient-to-br shadow-soft",
              unit.cover,
            )}
          >
            <span
              className="select-none text-[64px] leading-none drop-shadow transition-transform duration-300 group-hover:scale-110 sm:text-[72px]"
              aria-hidden
            >
              {unit.emoji}
            </span>
            {done && (
              <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-card shadow">
                <Star className="h-5 w-5 fill-sunny text-sunny" strokeWidth={2.5} />
              </span>
            )}
          </div>

          <div className="w-full text-center">
            <div className="font-display text-[15px] font-extrabold leading-tight">{unit.title}</div>
            <div className="text-[11px] font-semibold text-muted-foreground">
              {unit.words.length} từ
            </div>
          </div>

          <div className="w-full">
            <div className="h-2.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-sunny transition-all" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-1 flex items-center justify-center gap-1 text-[11px] font-extrabold tabular-nums text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-sunny text-sunny" /> {stars}/{max}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
