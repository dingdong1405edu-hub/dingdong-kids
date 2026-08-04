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

const R = 70;
const C = 2 * Math.PI * R;

export function MicOrb({ state, maxSeconds, onStart, onStop, disabled }: Props) {
  const recording = state === "recording";
  const checking = state === "checking";

  return (
    <div className="relative flex h-44 w-44 items-center justify-center">
      {/* Sóng lan ra khi đang thu — tín hiệu "máy đang nghe bé nói" */}
      {recording &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute rounded-full bg-brand-coral/30"
            initial={{ width: 144, height: 144, opacity: 0.55 }}
            animate={{ width: 214, height: 214, opacity: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
          />
        ))}

      {/* Vòng đếm ngược tới lúc tự dừng */}
      {recording && (
        <svg className="absolute h-[158px] w-[158px] -rotate-90" viewBox="0 0 158 158" aria-hidden>
          {/* Rãnh của vòng đếm dùng `text-muted` để thấy rõ trên nền kem lẫn nền đêm cacao. */}
          <circle cx="79" cy="79" r={R} fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
          <motion.circle
            cx="79"
            cy="79"
            r={R}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
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
          // Ba trạng thái = ba MÀU khác hẳn nhau, vì bé không đọc được nhãn:
          // nho–xanh "mời bấm" · san hô "đang nghe bé" · mật ong "cô đang nghĩ".
          // Viền ngoài lấy màu mặt thẻ nên tự hợp cả chế độ sáng lẫn tối.
          "relative flex h-36 w-36 items-center justify-center rounded-full text-white shadow-soft-xl",
          "ring-8 ring-card transition-colors disabled:opacity-80",
          recording
            ? "bg-gradient-to-b from-brand-coral to-brand-pink"
            : checking
              ? "bg-gradient-to-b from-brand-honey to-brand-gold"
              : "bg-gradient-to-b from-brand-grape to-brand-blue",
        )}
      >
        {checking ? (
          <Loader2 className="h-16 w-16 animate-spin" strokeWidth={2.5} />
        ) : recording ? (
          <Square className="h-14 w-14 fill-current" strokeWidth={2.5} />
        ) : (
          <Mic className="h-16 w-16" strokeWidth={2.5} />
        )}
      </motion.button>
    </div>
  );
}
