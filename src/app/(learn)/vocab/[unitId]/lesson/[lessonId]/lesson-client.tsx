"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LessonEngine } from "@/components/learn/lesson-engine";
import { completeLessonAction } from "@/server/actions/lesson";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import type { Exercise } from "@/types";

interface Props {
  lesson: {
    id: string;
    title: string;
    unitId: string;
    exercises: unknown;
  };
  unitId: string;
  hearts: number;
  skill: "vocab" | "grammar";
}

interface LessonResult {
  correct: number;
  total: number;
  heartsLost: number;
}

export function LessonClient({ lesson, unitId, hearts, skill }: Props) {
  const router = useRouter();
  const [result, setResult] = useState<LessonResult & { xpEarned?: number } | null>(null);
  const [startTime] = useState(Date.now());

  const exercises = lesson.exercises as Exercise[];

  async function handleComplete(res: LessonResult) {
    const duration = Math.round((Date.now() - startTime) / 1000);
    const saved = await completeLessonAction({
      lessonId: lesson.id,
      skill,
      correct: res.correct,
      total: res.total,
      heartsLost: res.heartsLost,
      durationSec: duration,
    });

    if (saved.ok) {
      setResult({ ...res, xpEarned: saved.xpEarned });
    } else {
      toast.error("Lỗi lưu kết quả");
      setResult(res);
    }
  }

  if (result) {
    const pct = Math.round((result.correct / result.total) * 100);
    const passed = pct >= 60;
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="sticker max-w-md w-full rounded-3xl text-center">
          <CardContent className="pt-8 pb-6 space-y-4">
            <DingBuddy
              size={104}
              pose={passed ? "cheer" : "idle"}
              message={passed ? "Giỏi quá!" : "Cố lên nhé!"}
              className="mx-auto"
            />
            <h2 className="font-display text-2xl font-extrabold">{passed ? "Bé giỏi lắm! 🌟" : "Gần đúng rồi!"}</h2>
            <div className="font-display text-6xl font-extrabold text-gradient-sunny">{pct}%</div>
            <div className="text-muted-foreground text-[15px]">
              Bé làm đúng {result.correct}/{result.total} câu
            </div>
            {/* Sao thưởng: vàng nắng quá nhạt để làm CHỮ trên nền kem → mật ong đậm. */}
            {result.xpEarned !== undefined && result.xpEarned > 0 && (
              <div className="font-display text-lg font-extrabold text-brand-gold">
                +{result.xpEarned} sao ⭐
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => window.location.reload()}
              >
                Chơi lại
              </Button>
              <Button className="flex-1" onClick={() => router.push(`/${skill}/${unitId}`)}>
                Tiếp tục
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <LessonEngine
      exercises={exercises}
      hearts={hearts}
      lessonId={lesson.id}
      unitId={unitId}
      skill={skill}
      onComplete={handleComplete}
    />
  );
}
