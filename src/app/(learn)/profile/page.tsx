import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { levelLabelWithAge, levelLabel, xpToLevel, cn } from "@/lib/utils";
import { LEVELS } from "@/lib/roadmap";
import { EnglishLevel } from "@prisma/client";
import { Flame, Heart, Star, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Hồ sơ của bé",
  description: "Xem sao thưởng, chuỗi ngày học và đổi cấp độ tiếng Anh của bé.",
};

const ALL_LEVELS = Object.values(EnglishLevel);

/** Nhãn tiếng Việt cho từng kỹ năng (thay vì in tên enum ra màn hình). */
const SKILL_LABEL: Record<string, string> = {
  VOCAB: "Từ vựng",
  PHONICS: "Ghép vần",
  GRAMMAR: "Ngữ pháp",
  READING: "Đọc hiểu",
  LISTENING: "Nghe hiểu",
  WRITING: "Tập viết",
  SPEAKING: "Luyện nói",
  MOCK: "Thi thử",
};

async function updateProfileAction(fd: FormData): Promise<void> {
  "use server";
  const session = await auth();
  if (!session?.user) return;
  const name = ((fd.get("name") as string) || "").trim() || null;
  const level = fd.get("level") as EnglishLevel;
  await db.user.update({
    where: { id: session.user.id },
    data: { name, ...(ALL_LEVELS.includes(level) ? { level } : {}) },
  });
  revalidatePath("/profile");
  revalidatePath("/dashboard");
}

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      attempts: { orderBy: { createdAt: "desc" }, take: 8 },
      _count: { select: { vocabProgress: true, grammarProgress: true, phonicsProgress: true, attempts: true } },
    },
  });
  if (!user) redirect("/login");

  const { level } = xpToLevel(user.xp);
  const display = user.name ?? user.email.split("@")[0];

  const stats = [
    { icon: Star, cls: "text-sunny", label: "Sao thưởng", value: `${user.xp} XP` },
    { icon: Trophy, cls: "text-violet-500", label: "Cấp độ", value: `Cấp ${level}` },
    { icon: Flame, cls: "text-orange-500", label: "Chuỗi ngày", value: `${user.streakDays}` },
    { icon: Heart, cls: "text-rose-500", label: "Tim", value: `${user.hearts}/5` },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="hero-brand relative overflow-hidden rounded-3xl p-6 text-white shadow-soft-lg">
        <div className="relative z-10 flex items-center gap-4">
          <div className="font-display flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold backdrop-blur">
            {display.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">{display}</h1>
            <p className="text-sm text-white/85">{user.email}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge className="border-white/20 bg-white/20 text-white hover:bg-white/25">
                {user.role === "ADMIN" ? "Quản trị viên" : "Học viên nhí"}
              </Badge>
              <Badge className="border-white/20 bg-white/20 text-white hover:bg-white/25">
                Mục tiêu: {levelLabelWithAge(user.level)}
              </Badge>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-4 -top-6 select-none text-[120px] leading-none opacity-20">
          🧒
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="sticker">
            <CardContent className="flex items-center gap-3 p-4">
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl bg-muted", s.cls)}>
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-muted-foreground">{s.label}</div>
                <div className="font-display text-lg font-bold leading-tight">{s.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Edit form */}
        <Card className="sticker">
          <CardHeader>
            <CardTitle className="font-display text-base">Thông tin tài khoản</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={updateProfileAction} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Tên hiển thị</Label>
                <Input id="name" name="name" defaultValue={user.name ?? ""} placeholder="Tên của bé" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="level">Cấp độ mục tiêu</Label>
                <select
                  id="level"
                  name="level"
                  defaultValue={user.level}
                  className="flex h-12 w-full rounded-2xl border-2 border-input bg-transparent px-3 py-1 text-[15px] font-semibold shadow-sm"
                >
                  {LEVELS.map((l) => (
                    <option key={l} value={l}>
                      {levelLabel(l)}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn-chunky rounded-2xl bg-primary px-6 py-3 font-extrabold text-white">
                Lưu thay đổi
              </button>
            </form>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card className="sticker">
          <CardHeader>
            <CardTitle className="font-display text-base">Bé vừa học gì?</CardTitle>
          </CardHeader>
          <CardContent>
            {user.attempts.length > 0 ? (
              <div className="divide-y">
                {user.attempts.map((a) => (
                  <div key={a.id} className="flex items-center justify-between py-2.5 text-sm first:pt-0 last:pb-0">
                    <span className="font-semibold">{SKILL_LABEL[a.skill] ?? a.skill}</span>
                    <div className="flex items-center gap-3">
                      {a.score !== null && <span className="font-bold">{Math.round(a.score)}%</span>}
                      <span className="text-xs text-muted-foreground">
                        {new Date(a.createdAt).toLocaleDateString("vi")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-6 text-center text-sm text-muted-foreground">
                Bé chưa học bài nào. Cùng bắt đầu nhé! 🚀
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
