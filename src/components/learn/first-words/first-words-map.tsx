"use client";
// Bản đồ chủ đề của cấp "Bé Tập Nói".
//
// KHÔNG khoá chủ đề theo thứ tự như bản đồ Duolingo của các cấp lớn: bé 3–5 tuổi
// học theo hứng thú, hôm nay thích con vật, mai thích màu sắc. Bắt bé đi đúng
// tuyến chỉ làm bé bỏ cuộc. Mọi chủ đề mở sẵn, sao đã đạt hiện ngay trên thẻ.
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import { Ambient } from "@/components/motion/ambient";
import { FIRST_WORDS_LEVEL, STARS_PER_WORD, type FirstWordsUnit } from "@/lib/first-words";

export interface UnitProgressDTO {
  bestStars: number;
  wordsSaid: number;
}

interface Props {
  units: FirstWordsUnit[];
  /** unitId → tiến độ tốt nhất của bé. */
  progress: Record<string, UnitProgressDTO>;
}

export function FirstWordsMap({ units, progress }: Props) {
  const totalStars = units.reduce((n, u) => n + (progress[u.id]?.bestStars ?? 0), 0);
  const maxStars = units.reduce((n, u) => n + u.words.length * STARS_PER_WORD, 0);
  const saidTotal = units.reduce((n, u) => n + (progress[u.id]?.wordsSaid ?? 0), 0);
  const wordTotal = units.reduce((n, u) => n + u.words.length, 0);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-white shadow-soft-lg sm:p-8",
          FIRST_WORDS_LEVEL.hero,
        )}
      >
        <Ambient variant="calm" className="opacity-40" />
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <DingBuddy size={92} pose="wave" className="shrink-0 animate-bounce-soft" />
          <div className="min-w-0 flex-1">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/25 px-3 py-1 text-xs font-bold backdrop-blur">
              <Mic className="h-3.5 w-3.5" /> {FIRST_WORDS_LEVEL.age} · {FIRST_WORDS_LEVEL.sub}
            </div>
            <h1 className="font-display text-2xl font-extrabold sm:text-3xl">
              {FIRST_WORDS_LEVEL.emoji} {FIRST_WORDS_LEVEL.label}
            </h1>
            <p className="mt-1 text-[15px] text-white/90">
              Bé nhìn hình, nghe cô đọc rồi nói theo. Không cần biết chữ — cô sẽ chấm sao cho bé!
            </p>
          </div>

          {/* Tổng sao — phần thưởng lớn nhất, để chỗ bé nhìn thấy đầu tiên */}
          <div className="flex shrink-0 items-center gap-2 rounded-3xl bg-white/20 px-5 py-3 backdrop-blur">
            <Star className="h-9 w-9 fill-white text-white drop-shadow" strokeWidth={2.5} />
            <div className="leading-tight">
              <div className="font-display text-3xl font-extrabold tabular-nums">{totalStars}</div>
              <div className="text-[11px] font-bold text-white/80">/ {maxStars} sao</div>
            </div>
          </div>
        </div>

        <p className="relative z-10 mt-4 text-[13px] font-semibold text-white/85">
          Bé đã nói được {saidTotal}/{wordTotal} từ · Học thoải mái, hoàn toàn miễn phí 💛
        </p>
      </div>

      {/* Lưới chủ đề */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {units.map((u, i) => {
          const p = progress[u.id];
          const stars = p?.bestStars ?? 0;
          const max = u.words.length * STARS_PER_WORD;
          const pct = max > 0 ? Math.min(100, Math.round((stars / max) * 100)) : 0;
          const done = stars >= max;

          return (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`${FIRST_WORDS_LEVEL.href}/${u.id}`} className="group block">
                <div className="sticker flex flex-col items-center gap-2 rounded-3xl p-3 transition-transform duration-200 hover:-translate-y-1.5">
                  <div
                    className={cn(
                      "relative flex aspect-square w-full items-center justify-center rounded-[1.75rem] bg-gradient-to-br shadow-soft",
                      u.cover,
                    )}
                  >
                    <span
                      className="select-none text-[64px] leading-none drop-shadow transition-transform duration-300 group-hover:scale-110 sm:text-[72px]"
                      aria-hidden
                    >
                      {u.emoji}
                    </span>
                    {done && (
                      <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
                        <Star className="h-5 w-5 fill-sunny text-sunny" strokeWidth={2.5} />
                      </span>
                    )}
                  </div>

                  <div className="w-full text-center">
                    <div className="font-display text-[15px] font-extrabold leading-tight">{u.title}</div>
                    <div className="text-[11px] font-semibold text-muted-foreground">{u.words.length} từ</div>
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
        })}
      </div>

      {/* Lời nhắn cho bố mẹ — bé không đọc phần này, nên viết thẳng vào việc */}
      <div className="rounded-3xl border-2 border-dashed border-border/70 bg-muted/30 p-5">
        <p className="font-display text-base font-extrabold">👨‍👩‍👧 Bố mẹ đọc nhé</p>
        <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed text-muted-foreground">
          <li>• Bé cần được cấp quyền <b>micro</b> để tập nói và được AI chấm phát âm.</li>
          <li>• Nút 👁️ ở góc trên bài học bật/tắt phần chữ tiếng Anh — mặc định ẩn để bé nghe bằng tai chứ không đoán theo mặt chữ.</li>
          <li>• Máy nhận giọng trẻ em kém chính xác hơn giọng người lớn, nên phần chấm ở đây cố ý <b>rất rộng lượng</b>: bé chịu nói là đã có sao.</li>
          <li>• Xong cấp này, bé sang <b>Pre-Starters</b> để bắt đầu nhận mặt chữ.</li>
        </ul>
      </div>
    </div>
  );
}
