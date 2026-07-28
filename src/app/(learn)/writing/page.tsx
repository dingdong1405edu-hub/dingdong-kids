import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { PenLine } from "lucide-react";
import { PracticeHub } from "@/components/learn/practice-hub";
import { TestCard } from "@/components/learn/test-card";
import { BaoBuddy } from "@/components/marketing/bao-buddy";

export const metadata: Metadata = {
  title: "Tập viết",
  description: "Bé tập viết câu tiếng Anh — cô AI khen trước rồi chỉ chỗ cần sửa.",
};

const TYPE_LABEL: Record<string, string> = {
  FREE: "Viết tự do",
  GUIDED: "Có gợi ý",
  PICTURE_DESCRIPTION: "Tả tranh",
};

export default async function WritingPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const tasks = await db.writingTask.findMany({
    where: { published: true }, // ẩn đề nháp khỏi học viên
    orderBy: [{ level: "asc" }, { order: "asc" }, { createdAt: "desc" }],
  });

  const attempts = await db.attempt.findMany({
    where: { userId: session.user.id, skill: "WRITING" },
    select: { refId: true, score: true },
  });
  const countMap = new Map<string, number>();
  const bestMap = new Map<string, number>();
  for (const a of attempts) {
    countMap.set(a.refId, (countMap.get(a.refId) ?? 0) + 1);
    if (a.score != null) bestMap.set(a.refId, Math.max(bestMap.get(a.refId) ?? 0, a.score));
  }

  const pool = tasks.filter((t) => !countMap.has(t.id));
  const randomHref = (pool.length ? pool : tasks).length
    ? `/writing/${(pool.length ? pool : tasks)[Math.floor(Math.random() * (pool.length ? pool : tasks).length)].id}`
    : undefined;

  return (
    <PracticeHub
      accent="rose"
      icon={<PenLine className="h-7 w-7" />}
      decoChar="🖊️"
      title="Tập viết"
      subtitle="Viết câu tiếng Anh của riêng bé — cô AI khen trước rồi mới chỉ chỗ sửa"
      randomHref={randomHref}
      randomLabel="Chọn giúp bé một đề"
      tips={[
        "Bé viết vào ô soạn thảo, số từ hiện ngay bên dưới.",
        "Bấm “Gợi ý dàn ý” nếu bé chưa biết bắt đầu từ đâu.",
        "Cô AI chấm 3 điều: Ngữ pháp, Từ vựng và Ý mạch lạc.",
        "Bé sẽ thấy điểm mạnh, chỗ cần sửa và bản viết đã sửa lại.",
      ]}
      gridTitle="Chọn đề viết"
      gridSubtitle="Bấm vào đề bé muốn viết."
    >
      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tasks.map((task) => (
            <TestCard
              key={task.id}
              href={`/writing/${task.id}`}
              title={task.prompt}
              level={task.level}
              tags={[TYPE_LABEL[task.taskType] ?? task.taskType, `Từ ${task.minWords} từ trở lên`]}
              meta={`${Math.round(task.timeLimit / 60)} phút`}
              attempts={countMap.get(task.id) ?? 0}
              score={bestMap.get(task.id) ?? null}
              seed={task.id}
              imageUrl={task.imageUrl}
              pdfHref={`/writing-pdf/${task.id}`}
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
      <p>Chưa có đề viết nào. Bé quay lại sau nhé! 🌟</p>
    </div>
  );
}
