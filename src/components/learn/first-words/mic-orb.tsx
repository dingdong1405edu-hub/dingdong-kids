"use client";
// Nút micro khổng lồ — thao tác chính của cả cấp "Bé Tập Nói".
//
// Vì sao to đến thế: ngón tay bé 3–5 tuổi bấm rất lệch, và bé không đọc được
// chữ trên nút. Một vòng tròn lớn, nảy nhẹ, có sóng lan ra khi đang thu là thứ
// bé hiểu ngay mà không cần ai giải thích.
//
// Bé cũng hay quên bấm dừng → có vòng đếm ngược chạy hết là tự dừng (khớp với
// `maxSeconds` của useRecorder), để bé thấy được "còn bao lâu nữa".
import { motion } from "framer-motion";
import { Loader2, Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";

export type MicOrbState = "idle" | "recording" | "checking";

interface Props {
  state: MicOrbState;
  /** Số giây tối đa của một lần thu — dùng vẽ vòng đếm ngược. */
  maxSeconds: number;
  onStart: () => void;
  onStop: () => void;
  disabled?: boolean;
}

const R = 62;
const C = 2 * Math.PI * R;

export function MicOrb({ state, maxSeconds, onStart, onStop, disabled }: Props) {
  const recording = state === "recording";
  const checking = state === "checking";

  return (
    <div className="relative flex h-40 w-40 items-center justify-center">
      {/* Sóng lan ra khi đang thu — tín hiệu "máy đang nghe bé nói" */}
      {recording &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute rounded-full bg-rose-400/30"
            initial={{ width: 128, height: 128, opacity: 0.55 }}
            animate={{ width: 190, height: 190, opacity: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
          />
        ))}

      {/* Vòng đếm ngược tới lúc tự dừng */}
      {recording && (
        <svg className="absolute h-[140px] w-[140px] -rotate-90" viewBox="0 0 140 140" aria-hidden>
          <circle cx="70" cy="70" r={R} fill="none" stroke="currentColor" strokeWidth="7" className="text-white/35" />
          <motion.circle
            cx="70"
            cy="70"
            r={R}
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
            className="text-sunny"
            strokeDasharray={C}
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: C }}
            transition={{ duration: maxSeconds, ease: "linear" }}
          />
        </svg>
      )}

      <motion.button
        type="button"
        disabled={disabled || checking}
        onClick={recording ? onStop : onStart}
        aria-label={recording ? "Dừng thu âm" : "Bấm để nói"}
        whileTap={{ scale: 0.92 }}
        animate={recording || checking ? { scale: 1 } : { scale: [1, 1.05, 1] }}
        transition={
          recording || checking
            ? { duration: 0.2 }
            : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
        }
        className={cn(
          "relative flex h-32 w-32 items-center justify-center rounded-full text-white shadow-soft-lg",
          "ring-8 ring-white/70 transition-colors disabled:opacity-80 dark:ring-white/10",
          recording
            ? "bg-gradient-to-b from-rose-400 to-rose-600"
            : checking
              ? "bg-gradient-to-b from-slate-400 to-slate-600"
              : "bg-gradient-to-b from-fuchsia-400 to-violet-600",
        )}
      >
        {checking ? (
          <Loader2 className="h-14 w-14 animate-spin" strokeWidth={2.5} />
        ) : recording ? (
          <Square className="h-12 w-12 fill-white" strokeWidth={2.5} />
        ) : (
          <Mic className="h-14 w-14" strokeWidth={2.5} />
        )}
      </motion.button>
    </div>
  );
}
