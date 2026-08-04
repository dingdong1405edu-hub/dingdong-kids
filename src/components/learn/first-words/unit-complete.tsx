"use client";
// Màn ăn mừng cuối một chủ đề "Bé Tập Nói".
//
// Bé chưa đọc được nên phần thưởng phải NHÌN THẤY: Ding reo, số sao to đùng,
// hoa giấy rơi. Chữ ở đây viết cho bố mẹ đang ngồi cạnh, không phải cho bé.
// Không có nhãn tiêu cực nào — ít sao thì rủ bé chơi lại, không chê.
import Link from "next/link";
import { motion } from "framer-motion";
import { RotateCcw, ArrowRight, Home, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import { FIRST_WORDS_LEVEL } from "@/lib/first-words";

interface Props {
  unitTitle: string;
  stars: number;
  maxStars: number;
  wordsSaid: number;
  totalWords: number;
  xpEarned: number;
  saving: boolean;
  /** Kỷ lục cũ — để khoe "kỷ lục mới" khi bé vượt qua. */
  bestStars: number;
  next: { id: string; title: string; emoji: string } | null;
  onRestart: () => void;
}

/** Lời chúc theo tỉ lệ sao — luôn tích cực. */
function praiseFor(ratio: number): { emoji: string; title: string; line: string } {
  if (ratio >= 0.9)
    return { emoji: "🏆", title: "Bé nói giỏi quá!", line: "Bé đọc rõ gần hết các từ rồi. Sang chủ đề mới thôi!" };
  if (ratio >= 0.6)
    return { emoji: "🌟", title: "Bé làm tốt lắm!", line: "Bé đã nói được nhiều từ rồi đấy." };
  if (ratio >= 0.3)
    return { emoji: "🌈", title: "Bé cố lên nào!", line: "Nghe cô đọc thêm một lượt là bé nói được ngay thôi." };
  return { emoji: "🐣", title: "Bé đã rất chăm!", line: "Những từ này còn mới. Bé chơi lại một lượt nữa nhé." };
}

export function UnitComplete({
  unitTitle,
  stars,
  maxStars,
  wordsSaid,
  totalWords,
  xpEarned,
  saving,
  bestStars,
  next,
  onRestart,
}: Props) {
  const ratio = maxStars > 0 ? stars / maxStars : 0;
  const p = praiseFor(ratio);
  const newBest = stars > bestStars && bestStars > 0;

  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      {/* Hoa giấy — phần thưởng bé nhìn thấy được mà không cần đọc chữ nào */}
      {["🎉", "⭐", "🎈", "✨", "🎊", "💫", "🌟", "🎁"].map((c, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute select-none text-4xl"
          style={{ left: `${8 + i * 11}%` }}
          initial={{ top: "-10%", opacity: 0, rotate: 0 }}
          animate={{ top: "105%", opacity: [0, 1, 1, 0], rotate: 360 }}
          transition={{ duration: 3.6 + (i % 3), repeat: Infinity, delay: i * 0.35, ease: "linear" }}
        >
          {c}
        </motion.span>
      ))}

      <Card className="sticker relative z-10 w-full max-w-md rounded-3xl text-center">
        <CardContent className="space-y-4 px-6 pb-6 pt-8">
          <DingBuddy size={96} pose="cheer" className="mx-auto animate-bounce-soft" />

          <div className="animate-star-pop text-7xl" aria-hidden>
            {p.emoji}
          </div>
          <h2 className="font-display text-3xl font-extrabold text-foreground">{p.title}</h2>
          <p className="text-[15px] font-semibold text-muted-foreground">{p.line}</p>

          {/* Tổng sao — con số duy nhất bé cần "đọc" được, và nó là hình ngôi sao.
              Đặt trên nền vàng nắng nhạt để cả khối trông như một tấm huy hiệu. */}
          <div className="flex items-center justify-center gap-2 rounded-2xl bg-band-sun py-3">
            <Star
              className="h-14 w-14 fill-sunny text-sunny drop-shadow-[0_3px_8px_hsl(var(--sunny)/0.55)]"
              strokeWidth={2.5}
              aria-hidden
            />
            <span className="text-gradient-sunny font-display text-6xl font-extrabold tabular-nums">
              {stars}
            </span>
            <span className="font-display text-2xl font-extrabold text-foreground/60">/{maxStars}</span>
          </div>

          <p className="text-sm font-semibold text-muted-foreground">
            Bé nói được {wordsSaid}/{totalWords} từ · {unitTitle}
            {newBest && " · Kỷ lục mới! 🎉"}
          </p>
          {xpEarned > 0 && (
            <p className="font-display text-lg font-extrabold text-brand-gold">+{xpEarned} sao kinh nghiệm</p>
          )}
          {saving && <p className="text-sm font-semibold text-muted-foreground">Đang lưu kết quả…</p>}

          <div className="flex flex-col gap-3 pt-2">
            {next ? (
              <Link href={`${FIRST_WORDS_LEVEL.href}/${next.id}`}>
                <Button className="btn-chunky h-auto w-full py-6 text-xl">
                  <span className="mr-2 text-3xl" aria-hidden>
                    {next.emoji}
                  </span>
                  {next.title} <ArrowRight className="ml-1.5 h-6 w-6" />
                </Button>
              </Link>
            ) : (
              <Link href={FIRST_WORDS_LEVEL.href}>
                <Button className="btn-chunky h-auto w-full py-6 text-xl">
                  <Home className="mr-2 h-6 w-6" /> Về bản đồ của bé
                </Button>
              </Link>
            )}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onRestart}
                className="btn-chunky h-auto flex-1 border-4 py-5 text-base"
              >
                <RotateCcw className="mr-1.5 h-6 w-6" /> Chơi lại
              </Button>
              {next && (
                <Link href={FIRST_WORDS_LEVEL.href} className="flex-1">
                  <Button variant="outline" className="btn-chunky h-auto w-full border-4 py-5 text-base">
                    <Home className="mr-1.5 h-6 w-6" /> Bản đồ
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
