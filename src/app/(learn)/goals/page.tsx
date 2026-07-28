import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { levelLabel, xpToLevel } from "@/lib/utils";
import { LEVELS, themeFor, type Level } from "@/lib/roadmap";
import { EnglishLevel } from "@prisma/client";
import { Target, Flame, Star, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Mục tiêu của bé",
  description: "Chọn cấp độ tiếng Anh cho bé theo chuẩn Cambridge và theo dõi sao thưởng mỗi ngày.",
};

const ALL_LEVELS = Object.values(EnglishLevel);

/** Mô tả ngắn, dễ hiểu cho phụ huynh + bé về từng cấp Cambridge. */
const LEVEL_NOTE: Record<Level, string> = {
  PRE_STARTERS: "Nghe – nói, nhận mặt chữ cái, màu sắc và con vật",
  STARTERS: "Khoảng 300 từ · chào hỏi, gia đình, đồ chơi, số đếm",
  MOVERS: "Khoảng 800 từ · trường lớp, thời tiết, đồ ăn, thể thao",
  FLYERS: "Khoảng 1300 từ · kể chuyện ngắn, sở thích, kỳ nghỉ",
  KET: "Giao tiếp A2 · viết đoạn ngắn, hiểu bài đọc dài hơn",
  PET: "Trình độ B1 · nói trôi chảy, viết bài có bố cục",
};

async function setGoalAction(fd: FormData): Promise<void> {
  "use server";
  const session = await auth();
  if (!session?.user) return;
  const level = fd.get("level") as EnglishLevel;
  if (!ALL_LEVELS.includes(level)) return;
  await db.user.update({ where: { id: session.user.id }, data: { level } });
  revalidatePath("/goals");
  revalidatePath("/dashboard");
}

export default async function GoalsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { level: true, xp: true, streakDays: true },
  });
  if (!user) redirect("/login");

  const { level, progress, next } = xpToLevel(user.xp);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="sticker relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 to-white p-5 dark:from-sky-500/10 dark:to-transparent sm:p-6">
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-chunky-sm">
            <Target className="h-7 w-7" />
          </div>
          <div>
            <h1 className="font-display text-xl font-extrabold sm:text-2xl">Mục tiêu của bé</h1>
            <p className="mt-0.5 text-[15px] text-muted-foreground">
              Chọn cấp độ bé muốn chinh phục — lộ trình sẽ tự đổi theo mục tiêu.
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-4 -top-6 select-none text-[120px] leading-none opacity-15">
          🎯
        </div>
      </div>

      {/* Progress cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="sticker">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Star className="h-4 w-4 text-sunny" /> Sao thưởng
            </div>
            <div className="font-display mt-1 text-2xl font-bold">Cấp {level}</div>
            <Progress value={progress} className="mt-3 h-2" />
            <div className="mt-1 text-xs text-muted-foreground">
              {user.xp} / {next} XP để lên cấp tiếp theo
            </div>
          </CardContent>
        </Card>
        <Card className="sticker">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Flame className="h-4 w-4 text-orange-500" /> Chuỗi ngày học
            </div>
            <div className="font-display mt-1 text-2xl font-bold">{user.streakDays} ngày</div>
            <p className="mt-3 text-xs text-muted-foreground">
              Học mỗi ngày một chút để giữ ngọn lửa cháy nhé 🔥
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Choose target */}
      <Card className="sticker">
        <CardHeader>
          <CardTitle className="font-display text-base">Bé muốn học tới đâu?</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={setGoalAction} className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {LEVELS.map((l) => {
                const selected = l === user.level;
                const t = themeFor(l);
                return (
                  <label key={l} className="relative block cursor-pointer">
                    <input
                      type="radio"
                      name="level"
                      value={l}
                      defaultChecked={selected}
                      className="peer sr-only"
                    />
                    <span className="flex flex-col rounded-2xl border-2 border-border/60 p-4 transition-colors hover:border-primary/40 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:ring-2 peer-checked:ring-primary/25">
                      <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-primary opacity-0 transition-opacity peer-checked:opacity-100" />
                      <span className="text-2xl" aria-hidden>
                        {t.emoji}
                      </span>
                      <span className="font-display mt-1 text-base font-bold">{levelLabel(l)}</span>
                      <span className="text-xs font-semibold text-muted-foreground">{t.age}</span>
                      <span className="mt-1 text-xs text-muted-foreground">{LEVEL_NOTE[l]}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            <button type="submit" className="btn-chunky rounded-2xl bg-primary px-6 py-3 font-extrabold text-white">
              Lưu mục tiêu
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
