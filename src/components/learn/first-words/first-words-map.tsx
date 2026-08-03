"use client";
// Bản đồ chủ đề của cấp "Bé Tập Nói".
//
// KHÔNG khoá chủ đề theo thứ tự như bản đồ Duolingo của các cấp lớn: bé 3–5 tuổi
// học theo hứng thú, hôm nay thích con vật, mai thích màu sắc. Bắt bé đi đúng
// tuyến chỉ làm bé bỏ cuộc. Mọi chủ đề mở sẵn, sao đã đạt hiện ngay trên thẻ.
import { Star, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import { Ambient } from "@/components/motion/ambient";
import {
  collectWeakWords,
  FIRST_WORDS_LEVEL,
  STARS_PER_WORD,
  type FirstWordsUnit,
} from "@/lib/first-words";
import { ParentReport } from "./parent-report";
import { GraduationCard } from "./graduation-card";
import { FirstWordsUnitCard } from "./unit-card";

export interface UnitProgressDTO {
  bestStars: number;
  wordsSaid: number;
  /** Sao của từng từ trong chủ đề — nguồn để tìm từ bé còn yếu. */
  wordStars: number[];
}

interface Props {
  units: FirstWordsUnit[];
  /** unitId → tiến độ tốt nhất của bé. */
  progress: Record<string, UnitProgressDTO>;
  childName: string;
  /** Link gói Pre-Starters cho thẻ tốt nghiệp. */
  upgradeHref: string;
}

/** Ngưỡng "tốt nghiệp": nói được 80% số từ của CHẶNG CHÍNH. */
const GRADUATION_RATIO = 0.8;

export function FirstWordsMap({ units, progress, childName, upgradeHref }: Props) {
  const totalStars = units.reduce((n, u) => n + (progress[u.id]?.bestStars ?? 0), 0);
  const maxStars = units.reduce((n, u) => n + u.words.length * STARS_PER_WORD, 0);
  const saidTotal = units.reduce((n, u) => n + (progress[u.id]?.wordsSaid ?? 0), 0);
  const wordTotal = units.reduce((n, u) => n + u.words.length, 0);

  const startedUnits = units.filter((u) => (progress[u.id]?.bestStars ?? 0) > 0).length;
  const weakWords = collectWeakWords(
    Object.fromEntries(units.map((u) => [u.id, progress[u.id]?.wordStars])),
  );

  // Chặng chính ↔ khám phá thêm. Tấm bằng CHỈ tính theo chặng chính: nếu tính
  // cả chủ đề thêm thì mỗi lần bổ sung nội dung là một lần đẩy mục tiêu ra xa,
  // bé học chăm vẫn thấy tấm bằng lùi lại.
  const coreUnits = units.filter((u) => !u.bonus);
  const bonusUnits = units.filter((u) => u.bonus);
  const coreWords = coreUnits.reduce((n, u) => n + u.words.length, 0);
  const coreSaid = coreUnits.reduce((n, u) => n + (progress[u.id]?.wordsSaid ?? 0), 0);
  const needSaid = Math.ceil(coreWords * GRADUATION_RATIO);
  const graduated = coreSaid >= needSaid;

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

      {/* Tốt nghiệp → mời lên Pre-Starters. Chỉ hiện khi bé đã có thành quả thật;
          bé chưa học gì thì không chào mời (xem graduation-card.tsx). */}
      {saidTotal > 0 && (
        <GraduationCard
          ready={graduated}
          wordsSaid={coreSaid}
          totalWords={coreWords}
          totalStars={totalStars}
          childName={childName}
          upgradeHref={upgradeHref}
          wordsToGo={Math.max(1, needSaid - coreSaid)}
        />
      )}

      {/* Lưới chủ đề — chặng chính trước, để bé và bố mẹ thấy rõ đường đi. */}
      {bonusUnits.length > 0 && (
        <h2 className="font-display text-lg font-extrabold">🎯 Chặng chính</h2>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {coreUnits.map((u, i) => (
          <FirstWordsUnitCard
            key={u.id}
            unit={u}
            stars={progress[u.id]?.bestStars ?? 0}
            index={i}
          />
        ))}
      </div>

      {bonusUnits.length > 0 && (
        <>
          <div className="pt-2">
            <h2 className="font-display text-lg font-extrabold">🌈 Khám phá thêm</h2>
            <p className="text-[13px] font-semibold text-muted-foreground">
              {bonusUnits.length} chủ đề chơi thêm cho vui — không bắt buộc để nhận bằng khen.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {bonusUnits.map((u, i) => (
              <FirstWordsUnitCard
                key={u.id}
                unit={u}
                stars={progress[u.id]?.bestStars ?? 0}
                index={i}
              />
            ))}
          </div>
        </>
      )}

      <ParentReport
        totalStars={totalStars}
        maxStars={maxStars}
        wordsSaid={saidTotal}
        totalWords={wordTotal}
        startedUnits={startedUnits}
        totalUnits={units.length}
        weakWords={weakWords}
      />
    </div>
  );
}
