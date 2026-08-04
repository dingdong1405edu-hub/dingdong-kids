"use client";
// Màn ăn mừng khi bé nói hết một bộ phim.
//
// Cùng tinh thần với `UnitComplete` của cấp "Bé Tập Nói": phần thưởng phải NHÌN
// THẤY được (Ding reo, số sao to), và không có nhãn tiêu cực nào — ít sao thì
// rủ bé xem lại, không chê.
import Link from "next/link";
import { motion } from "framer-motion";
import { RotateCcw, ArrowRight, Home, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import { CARTOON_SECTION } from "@/lib/cartoons";

interface Props {
  title: string;
  stars: number;
  maxStars: number;
  linesSaid: number;
  totalLines: number;
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
    return {
      emoji: "🏆",
      title: "Bé nói như diễn viên!",
      line: "Bé nhắc lại được gần hết các câu. Chọn phim mới thôi!",
    };
  if (ratio >= 0.6)
    return { emoji: "🌟", title: "Bé làm tốt lắm!", line: "Bé đã nói theo được nhiều câu rồi đấy." };
  if (ratio >= 0.3)
    return {
      emoji: "🌈",
      title: "Bé cố lên nào!",
      line: "Xem lại một lượt nữa là bé nói theo được ngay thôi.",
    };
  return { emoji: "🍿", title: "Bé xem chăm quá!", line: "Phim này còn mới. Bé xem lại một lượt nhé." };
}

export function CartoonComplete({
  title,
  stars,
  maxStars,
  linesSaid,
  totalLines,
  xpEarned,
  saving,
  bestStars,
  next,
  onRestart,
}: Props) {
  const ratio = maxStars > 0 ? stars / maxStars : 0;
  const praise = praiseFor(ratio);
  const isRecord = stars > bestStars;

  return (
    <div className="mx-auto max-w-md space-y-5 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16 }}
        className="flex flex-col items-center gap-2"
      >
        <DingBuddy size={112} pose="cheer" className="animate-bounce-soft" />
        <span className="text-6xl" aria-hidden>
          {praise.emoji}
        </span>
      </motion.div>

      <div>
        <h1 className="font-display text-3xl font-extrabold">{praise.title}</h1>
        <p className="mt-1 text-[15px] font-semibold text-muted-foreground">{praise.line}</p>
      </div>

      <Card className="sticker rounded-3xl">
        <CardContent className="space-y-3 p-5">
          <div className="flex items-center justify-center gap-2">
            <Star className="h-9 w-9 fill-sunny text-sunny" />
            <span className="font-display text-4xl font-extrabold">{stars}</span>
            <span className="font-display text-xl font-bold text-muted-foreground">/{maxStars}</span>
          </div>

          {isRecord && bestStars > 0 && (
            <p className="font-display text-sm font-extrabold text-sunny">🎉 Kỷ lục mới của bé!</p>
          )}

          <p className="text-sm font-semibold text-muted-foreground">
            Bé nói theo được <span className="font-display text-foreground">{linesSaid}</span>/
            {totalLines} câu
          </p>

          <p className="text-sm font-bold text-primary">
            {saving ? "Đang lưu kết quả…" : xpEarned > 0 ? `+${xpEarned} XP` : "Đã lưu kết quả"}
          </p>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {next && (
          <Link href={`${CARTOON_SECTION.href}/${next.id}`} className="block">
            <Button className="btn-chunky h-16 w-full rounded-2xl font-display text-lg font-extrabold">
              {next.emoji} Xem tiếp: {next.title} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        )}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={onRestart} className="h-14 rounded-2xl font-bold">
            <RotateCcw className="mr-2 h-5 w-5" /> Xem lại
          </Button>
          <Link href={CARTOON_SECTION.href} className="block">
            <Button variant="outline" className="h-14 w-full rounded-2xl font-bold">
              <Home className="mr-2 h-5 w-5" /> Phim khác
            </Button>
          </Link>
        </div>
      </div>

      <p className="text-xs font-semibold text-muted-foreground">{title}</p>
    </div>
  );
}
