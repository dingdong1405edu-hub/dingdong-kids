import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Headphones } from "lucide-react";
import { PracticeHub } from "@/components/learn/practice-hub";
import { TestCard } from "@/components/learn/test-card";
import { BaoBuddy } from "@/components/marketing/bao-buddy";

export const metadata: Metadata = {
  title: "Nghe hiểu",
  description: "Bài nghe tiếng Anh cho bé — nghe giọng bản ngữ rồi chọn tranh, chọn đáp án đúng.",
};

const QTYPE_LABEL: Record<string, string> = {
  MCQ: "Chọn đáp án",
  FILL_BLANK: "Điền từ",
  TRUE_FALSE: "Đúng / Sai",
  MATCHING: "Nối tranh",
  SHORT_ANSWER: "Trả lời ngắn",
};

export default async function ListeningPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const tests = await db.listeningTest.findMany({
    where: { published: true }, // ẩn bài nháp khỏi học viên
    orderBy: [{ level: "asc" }, { order: "asc" }, { createdAt: "desc" }],
    include: { questions: { select: { type: true } } },
  });

  const attempts = await db.attempt.findMany({
    where: { userId: session.user.id, skill: "LISTENING" },
    select: { refId: true, score: true },
  });
  const countMap = new Map<string, number>();
  const bestMap = new Map<string, number>();
  for (const a of attempts) {
    countMap.set(a.refId, (countMap.get(a.refId) ?? 0) + 1);
    if (a.score != null) bestMap.set(a.refId, Math.max(bestMap.get(a.refId) ?? 0, a.score));
  }

  const unattempted = tests.filter((t) => !countMap.has(t.id));
  const pool = unattempted.length ? unattempted : tests;
  const randomHref = pool.length
    ? `/listening/${pool[Math.floor(Math.random() * pool.length)].id}`
    : undefined;

  return (
    <PracticeHub
      accent="teal"
      icon={<Headphones className="h-7 w-7" />}
      decoChar="🎧"
      title="Nghe hiểu"
      subtitle="Nghe giọng bản ngữ rồi chọn đáp án — tai bé quen tiếng Anh rất nhanh"
      randomHref={randomHref}
      randomLabel="Chọn giúp bé một bài"
      tips={[
        "Bé được nghe 2–3 lần tuỳ cấp độ, cứ bình tĩnh nghe nhé.",
        "Có thể chỉnh tốc độ chậm lại nếu bé thấy nhanh quá.",
        "Lời thoại sẽ hiện ra sau khi bé nộp bài.",
        "Nộp xong có luôn chỗ “đáp án nằm ở đoạn này” để bé nghe lại.",
      ]}
      gridTitle="Chọn bài nghe"
      gridSubtitle="Bấm vào bài bé thích."
    >
      {tests.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tests.map((test) => {
            const types = [...new Set(test.questions.map((q) => QTYPE_LABEL[q.type] ?? q.type))];
            return (
              <TestCard
                key={test.id}
                href={`/listening/${test.id}`}
                title={test.title}
                level={test.level}
                tags={types.length ? types : ["Nghe hiểu"]}
                meta={`${test.questions.length} câu hỏi`}
                attempts={countMap.get(test.id) ?? 0}
                score={bestMap.get(test.id) ?? null}
                seed={test.id}
                imageUrl={test.imageUrl}
                pdfHref={`/listening-pdf/${test.id}`}
              />
            );
          })}
        </div>
      )}
    </PracticeHub>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border-2 border-dashed py-16 text-center text-muted-foreground">
      <BaoBuddy size={72} pose="idle" className="mx-auto mb-3" />
      <p>Chưa có bài nghe nào. Bé quay lại sau nhé! 🌟</p>
    </div>
  );
}
