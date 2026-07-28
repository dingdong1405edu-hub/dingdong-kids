import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Mic, MessagesSquare } from "lucide-react";
import { PracticeHub } from "@/components/learn/practice-hub";
import { TestCard } from "@/components/learn/test-card";
import { DingBuddy } from "@/components/marketing/ding-buddy";

export const metadata: Metadata = {
  title: "Luyện nói",
  description: "Bé nói tiếng Anh và được máy nghe, khen ngợi rồi chỉ chỗ phát âm cần sửa.",
};

export default async function SpeakingPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [sets, topics] = await Promise.all([
    db.speakingSet.findMany({
      where: { published: true }, // ẩn bộ nháp khỏi học viên
      orderBy: [{ level: "asc" }, { order: "asc" }, { createdAt: "desc" }],
    }),
    db.speakingTopic.findMany({
      where: { published: true },
      orderBy: [{ level: "asc" }, { order: "asc" }, { createdAt: "desc" }],
    }),
  ]);

  // Attempt.skill = SPEAKING cho cả bộ đề lẫn chủ đề; refId là cuid riêng nên không
  // đụng nhau — dùng chung map đếm lượt làm + điểm cao nhất.
  const attempts = await db.attempt.findMany({
    where: { userId: session.user.id, skill: "SPEAKING" },
    select: { refId: true, score: true },
  });
  const countMap = new Map<string, number>();
  const bestMap = new Map<string, number>();
  for (const a of attempts) {
    countMap.set(a.refId, (countMap.get(a.refId) ?? 0) + 1);
    if (a.score != null) bestMap.set(a.refId, Math.max(bestMap.get(a.refId) ?? 0, a.score));
  }

  // "Chọn giúp bé" gộp cả bộ 3 phần lẫn chủ đề nói; ưu tiên bài chưa làm.
  const allItems = [
    ...topics.map((t) => ({ id: t.id, href: `/speaking/topic/${t.id}` })),
    ...sets.map((s) => ({ id: s.id, href: `/speaking/${s.id}` })),
  ];
  const unstarted = allItems.filter((i) => !countMap.has(i.id));
  const list = unstarted.length ? unstarted : allItems;
  const randomHref = list.length
    ? list[Math.floor(Math.random() * list.length)].href
    : undefined;

  return (
    <PracticeHub
      accent="indigo"
      icon={<Mic className="h-7 w-7" />}
      decoChar="🎤"
      title="Luyện nói"
      subtitle="Bé nói to lên — máy nghe rồi khen và chỉ chỗ phát âm cần sửa"
      randomHref={randomHref}
      randomLabel="Chọn giúp bé một bài"
      tips={[
        "Nhắc lại câu: nghe câu mẫu rồi ghi âm nói y như vậy.",
        "Đọc to đoạn văn: đọc chậm, rõ từng từ là được điểm cao.",
        "Trả lời câu hỏi: bé trả lời theo ý mình, không có đáp án sai đâu.",
        "Nói theo chủ đề: trả lời một đoạn dài, máy sẽ khen và gợi ý cách nói hay hơn.",
      ]}
      gridTitle="Chọn bài nói"
      gridSubtitle="Bấm vào bài bé thích."
    >
      <div className="space-y-8">
        {/* Nói theo chủ đề */}
        {topics.length > 0 && (
          <section className="space-y-3">
            <div>
              <h2 className="font-display flex items-center gap-2 text-lg font-bold">
                <MessagesSquare className="h-5 w-5 text-indigo-600" /> Nói theo chủ đề
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Máy hỏi một câu, bé trả lời thành một đoạn dài — rồi được khen và gợi ý cách nói hay hơn.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {topics.map((t) => (
                <TestCard
                  key={t.id}
                  href={`/speaking/topic/${t.id}`}
                  title={t.topic || t.title || `Chủ đề · ${t.id.slice(-4)}`}
                  level={t.level}
                  tags={["Trả lời tự do", "Có gợi ý", "Được khen & sửa"]}
                  attempts={countMap.get(t.id) ?? 0}
                  score={bestMap.get(t.id) ?? null}
                  seed={t.id}
                  imageUrl={t.imageUrl}
                />
              ))}
            </div>
          </section>
        )}

        {/* Bộ đề 3 phần */}
        <section className="space-y-3">
          {topics.length > 0 && (
            <h2 className="font-display flex items-center gap-2 text-lg font-bold">
              <Mic className="h-5 w-5 text-indigo-600" /> Bộ luyện 3 phần
            </h2>
          )}
          {sets.length === 0 && topics.length === 0 ? (
            <EmptyState />
          ) : sets.length === 0 ? (
            <p className="text-sm text-muted-foreground">Chưa có bộ luyện 3 phần nào.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sets.map((set) => (
                <TestCard
                  key={set.id}
                  href={`/speaking/${set.id}`}
                  title={set.title || `Bộ nói · ${set.id.slice(-4)}`}
                  level={set.level}
                  tags={["Nhắc lại câu", "Đọc to đoạn văn", "Trả lời câu hỏi"]}
                  attempts={countMap.get(set.id) ?? 0}
                  score={bestMap.get(set.id) ?? null}
                  seed={set.id}
                  imageUrl={set.imageUrl}
                  pdfHref={`/speaking-pdf/${set.id}`}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </PracticeHub>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border-2 border-dashed py-16 text-center text-muted-foreground">
      <DingBuddy size={72} pose="idle" className="mx-auto mb-3" />
      <p>Chưa có bài nói nào. Bé quay lại sau nhé! 🌟</p>
    </div>
  );
}
