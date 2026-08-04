"use client";

import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds (use for staggering siblings). */
  delay?: number;
  /** Vertical offset to slide up from. */
  y?: number;
}

/** Fade + slide-up when scrolled into view (once). Peaceful, gentle easing. */
export function Reveal({ children, className, delay = 0, y = 22 }: RevealProps) {
  // reduced-motion: KHÔNG đổi cây render (SSR trả về motion.div với opacity:0
  // inline — đổi sang <div> thường sẽ hydration-mismatch và kẹt vô hình).
  // Chỉ đưa transition về 0s để nội dung hiện ngay, không chuyển động.
  const reduced = useReducedMotion();
  return (
    <motion.div
      // `reveal-root` là móc cho quy tắc <noscript> trong app/layout.tsx: HTML
      // do server trả về có sẵn `opacity:0` inline, nên nếu JS không chạy được
      // thì phần lớn trang chủ sẽ trắng trơn. Quy tắc đó bật lại opacity.
      className={className ? `reveal-root ${className}` : "reveal-root"}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={reduced ? { duration: 0 } : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
