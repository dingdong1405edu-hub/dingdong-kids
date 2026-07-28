import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Route } from "lucide-react";
import { Ambient } from "@/components/motion/ambient";
import { CourseWorldCard } from "@/components/learn/roadmap/course-world-card";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import { levelToSlug } from "@/lib/roadmap";

export const metadata: Metadata = {
  title: "Học theo lộ trình",
  description: "Bản đồ học tiếng Anh cho bé theo chuẩn Cambridge, từ Pre-Starters tới Preliminary.",
};

export default async function RoadmapPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const userId = session.user.id;

  const courses = await db.course.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    include: { _count: { select: { lessons: true } } },
  });

  // Đếm số bài đã hoàn thành theo từng khóa.
  const progresses = await db.roadmapProgress.findMany({
    where: { userId, completed: true },
    select: { lesson: { select: { courseId: true } } },
  });
  const doneByCourse = new Map<string, number>();
  for (const p of progresses) {
    const cid = p.lesson.courseId;
    doneByCourse.set(cid, (doneByCourse.get(cid) ?? 0) + 1);
  }

  // "Đề xuất" = khóa đầu tiên chưa hoàn thành.
  const recommendedId =
    courses.find((c) => (doneByCourse.get(c.id) ?? 0) < c._count.lessons)?.id ?? courses[0]?.id;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="hero-brand relative overflow-hidden rounded-3xl p-6 text-white shadow-soft-lg sm:p-8">
        <Ambient variant="calm" className="opacity-40" />
        <div className="relative z-10 max-w-2xl">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">
            <Route className="h-3.5 w-3.5" /> Học theo lộ trình
          </div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Bé chọn thế giới nào?</h1>
          <p className="mt-1.5 text-[15px] text-white/90">
            6 thế giới từ Pre-Starters tới Preliminary. Mỗi thế giới là một bản đồ gồm từ vựng, ghép
            vần, ngữ pháp, nghe, nói, đọc và viết. Đi từng bước, mở khoá từng bài như một cuộc phiêu lưu.
          </p>
        </div>
        <div className="pointer-events-none absolute -right-4 -top-8 select-none text-[140px] leading-none opacity-20">
          🗺️
        </div>
      </div>

      {/* Lưới khóa học */}
      {courses.length === 0 ? (
        <div className="sticker rounded-3xl border-dashed py-16 text-center text-muted-foreground">
          <DingBuddy size={72} pose="idle" className="mx-auto mb-3" />
          <p>Bản đồ đang được cô vẽ nốt. Bé quay lại sau nhé 🌟</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, i) => (
            <CourseWorldCard
              key={c.id}
              index={i}
              slug={levelToSlug(c.level)}
              level={c.level}
              title={c.title}
              subtitle={c.subtitle}
              description={c.description}
              total={c._count.lessons}
              done={doneByCourse.get(c.id) ?? 0}
              recommended={c.id === recommendedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
