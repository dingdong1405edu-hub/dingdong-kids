import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { BookText } from "lucide-react";
import { PracticeHub } from "@/components/learn/practice-hub";
import { TestCard } from "@/components/learn/test-card";
import { BaoBuddy } from "@/components/marketing/bao-buddy";

export const metadata: Metadata = {
  title: "Đọc hiểu",
  description: "Bài đọc tiếng Anh cho bé — đọc truyện ngắn, nghe cô đọc mẫu rồi trả lời câu hỏi.",
};

const QTYPE_LABEL: Record<string, string> = {
  MCQ: "Chọn đáp án",
  FILL_BLANK: "Điền từ",
  TRUE_FALSE: "Đúng / Sai",
  MATCHING: "Nối tranh",
  SHORT_ANSWER: "Trả lời ngắn",
};

export default async function ReadingPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const tests = await db.readingTest.findMany({
    where: { published: true }, // ẩn bài nháp khỏi học viên
    orderBy: [{ level: "asc" }, { order: "asc" }, { createdAt: "desc" }],
    include: { questions: { select: { type: true } } },
  });

  const attempts = await db.attempt.findMany({
    where: { userId: session.user.id, skill: "READING" },
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
    ? `/reading/${pool[Math.floor(Math.random() * pool.length)].id}`
    : undefined;

  return (
    <PracticeHub
      accent="green"
      icon={<BookText className="h-7 w-7" />}
      decoChar="📖"
      title="Đọc hiểu"
      subtitle="Mỗi lần một bài đọc ngắn — bé đọc thong thả, không bị bấm giờ"
      randomHref={randomHref}
      randomLabel="Chọn giúp bé một bài"
      tips={[
        "Bấm “Nghe cô đọc cả bài” để vừa nghe vừa nhìn chữ.",
        "Chạm vào một từ lạ để xem phiên âm và nghĩa tiếng Việt.",
        "Không bấm giờ — bé cứ đọc thật kỹ rồi mới trả lời nhé.",
        "Nộp xong sẽ có đáp án, bản dịch và giải thích từng câu.",
      ]}
      gridTitle="Chọn bài đọc"
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
                href={`/reading/${test.id}`}
                title={test.title}
                level={test.level}
                tags={types}
                meta={`${test.questions.length} câu hỏi`}
                attempts={countMap.get(test.id) ?? 0}
                score={bestMap.get(test.id) ?? null}
                seed={test.id}
                imageUrl={test.imageUrl}
                pdfHref={`/reading-pdf/${test.id}`}
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
      <p>Chưa có bài đọc nào. Thầy cô sẽ thêm bài mới sớm thôi! 🌟</p>
    </div>
  );
}
