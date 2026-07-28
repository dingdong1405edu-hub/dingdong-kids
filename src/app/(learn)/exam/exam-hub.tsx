"use client";
import { useState } from "react";
import { cn, levelLabel } from "@/lib/utils";
import { LEVELS, themeFor } from "@/lib/roadmap";
import { TestCard } from "@/components/learn/test-card";

export interface ExamCardData {
  id: string;
  title: string;
  level: string;
  composition: string; // "Nghe · Đọc · Viết"
  meta: string; // "40 câu · 85 phút"
  bestScore: number | null;
  isDraft: boolean;
}

export function ExamHub({
  exams,
  defaultLevel,
}: {
  exams: ExamCardData[];
  defaultLevel: string;
}) {
  const countByLevel = (lvl: string) => exams.filter((e) => e.level === lvl).length;
  // Mặc định: cấp của bé nếu có đề, nếu không thì cấp đầu tiên có đề.
  const initial =
    countByLevel(defaultLevel) > 0
      ? defaultLevel
      : (LEVELS as readonly string[]).find((l) => countByLevel(l) > 0) ?? defaultLevel;
  const [level, setLevel] = useState(initial);

  const list = exams.filter((e) => e.level === level);

  return (
    <div className="space-y-5">
      {/* Chọn cấp — như đăng ký thi thật */}
      <div>
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Bé thi cấp nào?
        </h2>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {LEVELS.map((l) => {
            const n = countByLevel(l);
            const active = level === l;
            const t = themeFor(l);
            return (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 rounded-2xl border-2 px-2 py-3 text-center transition-colors",
                  active
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/40",
                )}
              >
                <span className="text-xl" aria-hidden>
                  {t.emoji}
                </span>
                <span
                  className={cn(
                    "font-display text-sm font-extrabold",
                    active ? "text-primary" : "text-foreground",
                  )}
                >
                  {levelLabel(l)}
                </span>
                <span className="text-[11px] text-muted-foreground">{n} đề</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Đề của cấp đang chọn */}
      {list.length === 0 ? (
        <p className="rounded-3xl border-2 border-dashed px-4 py-10 text-center text-[15px] text-muted-foreground">
          Chưa có đề thi thử cho {levelLabel(level)}. Bé chọn cấp khác hoặc quay lại sau nhé 🌟
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((e) => (
            <TestCard
              key={e.id}
              href={`/exam/${e.id}`}
              title={e.title}
              level={e.level}
              meta={e.meta}
              score={e.bestScore}
              attempts={0}
              tags={[e.composition, ...(e.isDraft ? ["• Bản nháp (chỉ admin thấy)"] : [])]}
              seed={e.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
