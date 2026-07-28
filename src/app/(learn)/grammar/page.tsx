import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { SpellCheck } from "lucide-react";
import { PracticeHub } from "@/components/learn/practice-hub";
import { TestCard } from "@/components/learn/test-card";
import { DingBuddy } from "@/components/marketing/ding-buddy";

export const metadata: Metadata = {
  title: "Ngữ pháp",
  description: "Bé học cách đặt câu tiếng Anh đúng qua ví dụ có tranh và bài tập ngắn.",
};

export default async function GrammarPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const units = await db.grammarUnit.findMany({
    where: { published: true }, // ẩn unit nháp khỏi học viên
    orderBy: [{ level: "asc" }, { order: "asc" }],
    include: {
      lessons: {
        where: { published: true }, // ẩn bài nháp khỏi học viên
        include: { progress: { where: { userId: session.user.id, completed: true } } },
        orderBy: { order: "asc" },
      },
    },
  });

  const withStats = units.map((u) => {
    const total = u.lessons.length;
    const done = u.lessons.filter((l) => l.progress.length > 0).length;
    return { ...u, total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  });

  const next = withStats.find((u) => u.done < u.total) ?? withStats[0];
  const randomHref = next ? `/grammar/${next.id}` : undefined;

  return (
    <PracticeHub
      accent="violet"
      icon={<SpellCheck className="h-7 w-7" />}
      decoChar="📝"
      title="Ngữ pháp"
      subtitle="Học cách đặt câu tiếng Anh đúng — dễ hiểu, nhiều ví dụ có tranh"
      randomHref={randomHref}
      randomLabel="Học tiếp bài đang dở"
      tips={[
        "Mỗi bài có phần giải thích ngắn rồi tới trò chơi luyện tập ngay.",
        "Ví dụ nào cũng có câu tiếng Anh, nghĩa tiếng Việt và nút loa 🔊.",
        "Trả lời chưa đúng thì được xem đáp án và thử lại — không sao cả!",
        "Làm xong bài kiểm tra cuối để nhận sao ⭐ và mở bài tiếp theo.",
      ]}
      gridTitle="Các chủ đề ngữ pháp"
      gridSubtitle="Bấm vào một chủ đề để bắt đầu."
    >
      {withStats.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {withStats.map((u) => (
            <TestCard
              key={u.id}
              href={`/grammar/${u.id}`}
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
      <DingBuddy size={72} pose="idle" className="mx-auto mb-3" />
      <p>Chưa có chủ đề ngữ pháp nào. Bé quay lại sau nhé! 🌟</p>
    </div>
  );
}
