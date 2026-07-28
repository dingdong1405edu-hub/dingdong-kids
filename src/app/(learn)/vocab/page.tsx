import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { PracticeHub } from "@/components/learn/practice-hub";
import { TestCard } from "@/components/learn/test-card";
import { BaoBuddy } from "@/components/marketing/bao-buddy";

export const metadata: Metadata = {
  title: "Từ vựng",
  description: "Học từ vựng tiếng Anh cho bé qua tranh, âm thanh và trò chơi ghi nhớ.",
};

export default async function VocabPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [units, dueCount] = await Promise.all([
    db.vocabUnit.findMany({
      where: { published: true }, // ẩn unit nháp khỏi học viên
      orderBy: [{ level: "asc" }, { order: "asc" }],
      include: {
        lessons: {
          where: { published: true }, // ẩn bài nháp khỏi học viên
          include: { progress: { where: { userId: session.user.id, completed: true } } },
          orderBy: { order: "asc" },
        },
      },
    }),
    db.vocabReview.count({ where: { userId: session.user.id, dueAt: { lte: new Date() } } }),
  ]);

  const withStats = units.map((u) => {
    const total = u.lessons.length;
    const done = u.lessons.filter((l) => l.progress.length > 0).length;
    return { ...u, total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  });

  const next = withStats.find((u) => u.done < u.total) ?? withStats[0];
  const randomHref = next ? `/vocab/${next.id}` : undefined;

  return (
    <PracticeHub
      accent="blue"
      icon={<BookOpen className="h-7 w-7" />}
      decoChar="📚"
      title="Từ vựng"
      subtitle="Mỗi từ có tranh và tiếng đọc — nhìn, nghe rồi nhớ thật lâu"
      randomHref={randomHref}
      randomLabel="Học tiếp bài đang dở"
      tips={[
        "Mỗi chủ đề gồm nhiều bài ngắn — bé chọn bài nào cũng được.",
        "Bấm nút loa 🔊 để nghe người bản ngữ đọc từ đó.",
        "Trò chơi: nhìn tranh chọn từ, nghe rồi chọn tranh, kéo chữ ghép từ.",
        "Học xong một bài bé được thêm sao ⭐ và giữ chuỗi ngày học.",
      ]}
      gridTitle="Các chủ đề từ vựng"
      gridSubtitle="Bấm vào một chủ đề để bắt đầu."
    >
      {dueCount > 0 && (
        <Link
          href="/vocab/review"
          className="sticker mb-4 flex items-center justify-between gap-3 rounded-3xl bg-gradient-to-br from-amber-50 to-white p-4 transition-transform hover:-translate-y-0.5 dark:from-amber-500/10 dark:to-transparent"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <div className="font-display font-bold">Ôn lại từ cũ</div>
              <p className="text-sm text-muted-foreground">
                {dueCount} từ đến lúc ôn — ôn đúng lúc để nhớ thật lâu nhé!
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-300" />
        </Link>
      )}
      {withStats.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {withStats.map((u) => (
            <TestCard
              key={u.id}
              href={`/vocab/${u.id}`}
              title={u.title}
              level={u.level}
              tags={u.theme ? [u.theme] : []}
              meta={`${u.done}/${u.total} bài học`}
              score={u.pct}
              seed={u.id}
              imageUrl={u.imageUrl}
            />
          ))}
        </div>
      )}
    </PracticeHub>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border-2 border-dashed py-16 text-center text-muted-foreground">
      <BaoBuddy size={72} pose="idle" className="mx-auto mb-3" />
      <p>Chưa có chủ đề từ vựng nào. Bé quay lại sau nhé! 🌟</p>
    </div>
  );
}
