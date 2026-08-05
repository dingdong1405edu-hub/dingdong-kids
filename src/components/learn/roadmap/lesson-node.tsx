"use client";

import { motion } from "framer-motion";
import { Lock, Gift, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CourseTheme, LessonStatus } from "@/lib/roadmap";

interface LessonNodeProps {
  status: LessonStatus;
  kind?: "lesson" | "trophy";
  order?: number;
  /** Emoji trang trí của bài (RoadmapLesson.icon). */
  icon?: string | null;
  label?: string;
  theme: CourseTheme;
  size?: number;
  onClick: () => void;
}

/** Độ dày "gờ" 3D dưới nút — nhìn như nút bấm đồ chơi bấm được. */
const LEDGE = 8;

/**
 * Một node trên bản đồ học — nút tròn kiểu 3D (có gờ bóng đổ) như Duolingo.
 * Trạng thái: done (đã xong, gắn ngôi sao vàng) · current (đang học: vòng nhịp +
 * nảy nhẹ + bong bóng "Bắt đầu") · locked (khoá). `kind="trophy"` là hộp quà
 * phần thưởng cuối chương.
 *
 * Vùng chạm luôn ≥ 76px để ngón tay trẻ nhỏ bấm không trượt.
 */
export function LessonNode({
  status,
  kind = "lesson",
  order,
  icon,
  label,
  theme,
  size = 84,
  onClick,
}: LessonNodeProps) {
  const isTrophy = kind === "trophy";
  const locked = status === "locked";
  const current = status === "current";
  const done = status === "done";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      style={{ width: size, height: size }}
      className="relative"
    >
      {/* Bong bóng "BẮT ĐẦU" cho bài hiện tại */}
      {current && !isTrophy && (
        <div className="absolute -top-10 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-card px-3.5 py-1.5 shadow-soft-lg">
          <span className={cn("font-display text-xs font-extrabold uppercase tracking-wide", theme.accentText)}>
            Bắt đầu
          </span>
          {/* Mũi nhọn của bong bóng — cùng màu mặt thẻ để nối liền, không viền */}
          <span className="absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-[2px] bg-card" />
        </div>
      )}

      {/* Vòng nhịp lan toả quanh node đang học */}
      {current && (
        <>
          <motion.span
            aria-hidden
            animate={{ scale: [1, 1.28, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeOut" }}
            className={cn("absolute inset-0 rounded-full ring-4", theme.ring)}
          />
          <motion.span
            aria-hidden
            animate={{ scale: [1, 1.14, 1], opacity: [0.55, 0, 0.55] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeOut", delay: 0.45 }}
            className={cn("absolute inset-0 rounded-full ring-4", theme.ring)}
          />
        </>
      )}

      <button
        type="button"
        onClick={onClick}
        aria-label={`${label ?? (isTrophy ? "Phần thưởng chương" : `Bài ${order}`)}${locked ? " — đang khoá" : ""}`}
        aria-disabled={locked || undefined}
        className={cn(
          // Node đang học ĐỨNG YÊN. Trước đây nó nhún liên tục (animate-bounce-soft),
          // nghĩa là đúng cái nút bé cần bấm thì cứ chạy khỏi ngón tay — với tay trẻ
          // 4–7 tuổi đó là lỗi khả dụng, không phải hiệu ứng vui. Hai vòng nhịp lan
          // toả phía trên đã đủ chỉ "con đang ở đây" mà không làm xê dịch vùng chạm.
          "group relative block h-full w-full rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40",
        )}
      >
        {/* Gờ 3D phía dưới — node khoá dùng sắc chìm để trông "tắt", hộp quà dùng
            cam nắng cho khớp mặt nút vàng */}
        <span
          className={cn(
            "absolute inset-x-0 bottom-0 rounded-full",
            locked ? "bg-muted-foreground/35" : isTrophy ? "bg-brand-sun" : theme.nodeBase,
          )}
          style={{ top: LEDGE }}
        />
        {/* Mặt node */}
        <span
          className={cn(
            "absolute inset-x-0 top-0 flex items-center justify-center rounded-full text-4xl leading-none transition-transform duration-100 group-active:translate-y-[4px]",
            locked
              ? "bg-muted text-muted-foreground/70"
              : isTrophy
                ? "bg-gradient-to-b from-brand-yellow to-brand-sun text-sunny-foreground"
                : cn(theme.nodeFace, "text-white"),
            !locked && "shadow-soft-lg",
            !locked && theme.glow,
          )}
          style={{ bottom: LEDGE }}
        >
          {/* Ánh sáng phản chiếu ở nửa trên — làm nút trông tròn căng như kẹo */}
          {!locked && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-[14%] top-[8%] h-[34%] rounded-[999px] bg-card/35 blur-[1px]"
            />
          )}
          {isTrophy ? (
            <Gift className={cn("h-8 w-8", locked ? "" : "drop-shadow-soft")} strokeWidth={2.2} />
          ) : locked ? (
            <Lock className="h-7 w-7" />
          ) : icon ? (
            <span className="relative drop-shadow-soft">{icon}</span>
          ) : (
            <span className="relative font-display text-2xl font-extrabold">{order}</span>
          )}
        </span>

        {/* Ngôi sao "đã xong" — bật ra như dán sticker */}
        {done && (
          <span className="absolute -right-1 -top-1 z-10 flex h-8 w-8 animate-star-pop items-center justify-center rounded-full bg-card shadow-soft">
            <Star className="h-5 w-5 fill-sunny text-sunny" strokeWidth={2} />
          </span>
        )}
      </button>
    </motion.div>
  );
}
