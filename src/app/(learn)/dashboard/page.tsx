import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ModuleCard } from "@/components/learn/module-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, levelLabelWithAge, xpToLevel } from "@/lib/utils";
import { PHONICS_LESSONS } from "@/lib/phonics-lessons";
import Link from "next/link";
import { Flame, Heart, Star, Trophy, GraduationCap, Route, ArrowRight, Sparkles, type LucideIcon } from "lucide-react";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { Ambient } from "@/components/motion/ambient";
import { DingBuddy } from "@/components/marketing/ding-buddy";

export const metadata: Metadata = {
  title: "Trang chính",
  description: "Bảng điều khiển học tiếng Anh cho bé — sao thưởng, chuỗi ngày học và các trò chơi luyện tập.",
};

function StatCard({
  icon: Icon,
  iconClass,
  label,
  value,
  suffix,
  prefix,
}: {
  icon: LucideIcon;
  iconClass: string;
  label: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
}) {
  return (
    <Card className="sticker">
      <CardContent className="flex items-center gap-3 p-4">
        <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted", iconClass)}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold text-muted-foreground">{label}</div>
          <div className="font-display text-2xl font-bold leading-tight">
            {prefix && <span className="mr-1 text-sm font-medium text-muted-foreground">{prefix}</span>}
            {typeof value === "number" ? <AnimatedNumber value={value} /> : value}
            {suffix && <span className="ml-1 text-xs font-normal text-muted-foreground">{suffix}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      attempts: { orderBy: { createdAt: "desc" }, take: 5 },
      vocabProgress: { where: { completed: true } },
      grammarProgress: { where: { completed: true } },
      phonicsProgress: { where: { completed: true } },
    },
  });
  if (!user) redirect("/login");

  // Chỉ đếm nội dung đã xuất bản (bỏ bản nháp) để % tiến độ khớp những gì bé thấy.
  const vocabCount = await db.vocabLesson.count({
    where: { published: true, unit: { published: true, level: user.level } },
  });
  const grammarCount = await db.grammarLesson.count({
    where: { published: true, unit: { published: true, level: user.level } },
  });
  // Bài ghép vần nằm cố định trong code (src/lib/phonics-lessons.ts), không ở DB.
  const phonicsCount = PHONICS_LESSONS.length;

  const vocabProgress = vocabCount > 0 ? Math.round((user.vocabProgress.length / vocabCount) * 100) : 0;
  const grammarProgress = grammarCount > 0 ? Math.round((user.grammarProgress.length / grammarCount) * 100) : 0;
  const phonicsProgress = phonicsCount > 0 ? Math.round((user.phonicsProgress.length / phonicsCount) * 100) : 0;
  const { level } = xpToLevel(user.xp);
  const firstName = user.name?.split(" ").pop() ?? "bé";

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="hero-brand relative overflow-hidden rounded-3xl p-6 text-white shadow-soft-lg sm:p-8">
        <Ambient variant="calm" className="opacity-50" />
        <div className="relative z-10 max-w-xl">
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Chào {firstName} 👋</h1>
          <p className="mt-1.5 text-[15px] text-white/90">
            Hôm nay mình học thêm vài từ tiếng Anh mới nhé!
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm font-bold backdrop-blur">
            <GraduationCap className="h-4 w-4" />
            Cấp của bé: {levelLabelWithAge(user.level)}
          </div>
        </div>
        <div className="pointer-events-none absolute -right-2 -top-6 select-none text-[130px] leading-none opacity-20">
          🌈
        </div>
        <DingBuddy
          size={88}
          pose="wave"
          className="pointer-events-none absolute bottom-2 right-4 z-10 hidden sm:block"
        />
      </div>

      {/* Featured: Học theo lộ trình */}
      <Link href="/roadmap" className="group block">
        <div className="sticker relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-50 via-cyan-50 to-emerald-50 p-5 transition-all duration-200 hover:-translate-y-0.5 dark:from-sky-500/10 dark:via-cyan-500/10 dark:to-emerald-500/10 sm:p-6">
          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-600 text-white shadow-chunky-sm">
                <Route className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-lg font-extrabold sm:text-xl">Học theo lộ trình</h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white">
                    <Sparkles className="h-3 w-3" /> Mới
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Bản đồ phiêu lưu từ Pre-Starters tới Preliminary — từ vựng, ghép vần, ngữ pháp, nghe, nói, đọc, viết.
                </p>
              </div>
            </div>
            <span className="btn-chunky inline-flex shrink-0 items-center gap-1.5 self-start rounded-2xl bg-primary px-5 py-2.5 text-sm font-extrabold text-white sm:self-auto">
              Khám phá <ArrowRight className="h-4 w-4" />
            </span>
          </div>
          <div className="pointer-events-none absolute -right-2 -top-4 select-none text-[100px] leading-none opacity-15">
            🗺️
          </div>
        </div>
      </Link>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Flame} iconClass="text-orange-500" label="Chuỗi ngày" value={user.streakDays} suffix="ngày" />
        <StatCard icon={Heart} iconClass="text-rose-500" label="Tim" value={user.hearts} suffix="/ 5" />
        <StatCard icon={Star} iconClass="text-sunny" label="Sao thưởng" value={user.xp} suffix="XP" />
        <StatCard icon={Trophy} iconClass="text-violet-500" label="Cấp độ" value={level} prefix="Cấp" />
      </div>

      {/* Modules */}
      <div>
        <h2 className="font-display mb-3 text-lg font-bold">Bé muốn chơi gì hôm nay?</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ModuleCard href="/games" icon="🎮" title="Sân chơi" subtitle="Chơi thoải mái — không chấm điểm" color="bg-fuchsia-100 dark:bg-fuchsia-500/15" />
          <ModuleCard href="/vocab" icon="📚" title="Từ vựng" subtitle="Học từ mới qua tranh và tiếng" progress={vocabProgress} color="bg-blue-100 dark:bg-blue-500/15" />
          <ModuleCard href="/phonics" icon="🔤" title="Ghép vần" subtitle="Phonics — nghe âm, ghép chữ thành từ" progress={phonicsProgress} color="bg-amber-100 dark:bg-amber-500/15" />
          <ModuleCard href="/grammar" icon="📝" title="Ngữ pháp" subtitle="Đặt câu đúng, thật dễ hiểu" progress={grammarProgress} color="bg-green-100 dark:bg-green-500/15" />
          <ModuleCard href="/reading" icon="📖" title="Đọc hiểu" subtitle="Đọc truyện ngắn rồi trả lời" color="bg-orange-100 dark:bg-orange-500/15" />
          <ModuleCard href="/listening" icon="🎧" title="Nghe hiểu" subtitle="Nghe rồi chọn tranh đúng" color="bg-teal-100 dark:bg-teal-500/15" />
          <ModuleCard href="/writing" icon="🖊️" title="Tập viết" subtitle="Viết câu, cô AI giúp bé sửa" color="bg-rose-100 dark:bg-rose-500/15" />
          <ModuleCard href="/speaking" icon="🎤" title="Luyện nói" subtitle="Nói to lên, máy nghe và khen bé" color="bg-indigo-100 dark:bg-indigo-500/15" />
        </div>
      </div>

      {/* Recent activity */}
      <Card className="sticker">
        <CardHeader>
          <CardTitle className="font-display text-base">Bé vừa học gì?</CardTitle>
        </CardHeader>
        <CardContent>
          {user.attempts.length > 0 ? (
            <div className="divide-y">
              {user.attempts.map((attempt) => (
                <div key={attempt.id} className="flex items-center justify-between py-2.5 text-sm first:pt-0 last:pb-0">
                  <span className="font-semibold capitalize">{attempt.skill.toLowerCase()}</span>
                  <div className="flex items-center gap-3">
                    {attempt.score !== null && (
                      <span className="font-bold">{Math.round(attempt.score)}%</span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {new Date(attempt.createdAt).toLocaleDateString("vi")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-sm text-muted-foreground">
              <DingBuddy size={72} pose="idle" className="mx-auto mb-3" />
              Bé chưa học bài nào. Cùng bắt đầu nhé! 🚀
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
