"use client";
// Khung dùng chung cho mọi trò chơi từ vựng: thanh tiến độ, câu nhắc, lớp phủ
// khen thưởng khi xong. Game chỉ lo phần chơi, không phải tự vẽ lại mấy thứ này
// — nhờ vậy các game trông cùng một nhà.
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import { cn } from "@/lib/utils";

interface Props {
  /** Câu nhắc ngắn, viết cho bé (hoặc bố mẹ đọc cho bé). */
  prompt: string;
  /** Lượt hiện tại (1-based) và tổng số lượt — để vẽ thanh tiến độ. */
  round: number;
  totalRounds: number;
  children: React.ReactNode;
}

export function GameShell({ prompt, round, totalRounds, children }: Props) {
  const pct = totalRounds > 0 ? Math.round(((round - 1) / totalRounds) * 100) : 0;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Progress value={pct} className="h-3 flex-1" />
        <span className="text-sm font-bold text-muted-foreground">
          {Math.min(round, totalRounds)}/{totalRounds}
        </span>
      </div>
      <p className="text-center font-display text-lg font-extrabold">{prompt}</p>
      {children}
    </div>
  );
}

/**
 * Ngôi sao bay lên khi bé làm đúng. Tách riêng để mọi game cùng một kiểu khen.
 * Tự biến mất sau khi chạy xong — nơi gọi chỉ cần đổi `trigger` là nó chạy lại.
 */
export function StarBurst({ trigger }: { trigger: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (trigger === 0) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, [trigger]);

  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.4, 1.3, 1],
                x: (i - 2) * 60,
                y: -90 - i * 12,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, delay: i * 0.05 }}
              className="absolute text-5xl"
            >
              ⭐
            </motion.span>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

/** Màn "xong game": Ding khen + số sao đạt được + nút chơi tiếp. */
export function GameDone({
  stars,
  onNext,
  nextLabel = "Chơi tiếp",
}: {
  stars: number;
  onNext: () => void;
  nextLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-6 text-center">
      <DingBuddy size={104} pose="cheer" message="Giỏi quá!" className="mx-auto" />
      <div className="flex gap-1.5">
        {[1, 2, 3].map((n) => (
          <motion.span
            key={n}
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: n * 0.14, type: "spring", stiffness: 260, damping: 14 }}
            className={cn("text-5xl", n <= stars ? "" : "opacity-25 grayscale")}
          >
            ⭐
          </motion.span>
        ))}
      </div>
      <button
        type="button"
        onClick={onNext}
        className="btn-chunky rounded-2xl bg-primary px-8 py-3 font-display text-lg font-extrabold text-primary-foreground"
      >
        {nextLabel}
      </button>
    </div>
  );
}
