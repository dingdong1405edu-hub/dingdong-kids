import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { PracticeHub } from "@/components/learn/practice-hub";
import { TestCard } from "@/components/learn/test-card";
import { DingBuddy } from "@/components/marketing/ding-buddy";

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
        // Dải nhắc ôn tập: khối band-* nên tự dịu ở chế độ tối (bản cũ dùng
        // gradient amber → white kèm cặp dark: viết tay, vỡ nền vào ban đêm).
        <Link
          href="/vocab/review"
          className="sticker mb-4 flex items-center justify-between gap-3 rounded-3xl bg-gradient-to-br from-band-sun to-card p-5 transition-transform duration-200 ease-toy hover:-translate-y-1"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-band-lav text-brand-grape">
              <Sparkles className="h-7 w-7" />
            </div>
            <div>
              <div className="font-display text-lg font-extrabold">Ôn lại từ cũ</div>
              <p className="text-sm text-muted-foreground">
                {dueCount} từ đến lúc ôn — ôn đúng lúc để nhớ thật lâu nhé!
              </p>
            </div>
          </div>
          <ArrowRight className="h-6 w-6 shrink-0 text-brand-gold" />
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
    <div className="rounded-3xl border-2 border-dashed border-border bg-band-cream py-16 text-center text-muted-foreground">
      <DingBuddy size={72} pose="idle" className="mx-auto mb-3" />
      <p className="text-[15px] font-semibold">Chưa có chủ đề từ vựng nào. Bé quay lại sau nhé! 🌟</p>
    </div>
  );
}
