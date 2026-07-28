import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Puzzle } from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { PracticeHub } from "@/components/learn/practice-hub";
import { PHONICS_LESSONS, scoredCardCount } from "@/lib/phonics-lessons";
import {
  PhonicsLessonList,
  type PhonicsLessonItem,
} from "@/components/learn/phonics/phonics-lesson-list";
import { SoundTable } from "@/components/learn/phonics/sound-table";

export const metadata: Metadata = {
  title: "Ghép vần",
  description: "Học âm chữ cái tiếng Anh và ghép âm thành từ — bước đầu tiên để bé tự đọc.",
};

export default async function PhonicsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  // Bài học là dữ liệu tĩnh trong @/lib/phonics-lessons — chỉ tiến độ lấy từ DB.
  const rows = await db.phonicsProgress.findMany({
    where: { userId: session.user.id },
    select: { lessonId: true, completed: true, bestScore: true },
  });
  const byLesson = new Map(rows.map((r) => [r.lessonId, r]));

  const lessons: PhonicsLessonItem[] = PHONICS_LESSONS.map((l) => {
    const p = byLesson.get(l.id);
    return {
      id: l.id,
      title: l.title,
      subtitle: l.subtitle,
      emoji: l.emoji,
      cardCount: l.cards.length,
      scoredCount: scoredCardCount(l),
      bestScore: p?.bestScore ?? 0,
      completed: p?.completed ?? false,
    };
  });

  // "Học tiếp": bài chưa xong đầu tiên, không thì quay lại bài đầu để ôn.
  const next = lessons.find((l) => !l.completed) ?? lessons[0];

  return (
    <PracticeHub
      accent="amber"
      icon={<Puzzle className="h-7 w-7" />}
      decoChar="🔤"
      title="Ghép vần"
      subtitle="Nghe âm — nhận mặt chữ — ghép thành từ. Bé tự đọc được từ đầu tiên!"
      randomHref={next ? `/phonics/${next.id}` : undefined}
      randomLabel="Học tiếp bài đang dở"
      tips={[
        "Mỗi bài chỉ khoảng 10 thẻ ngắn — học 5 phút mỗi ngày là đủ.",
        "Máy tự đọc khi thẻ hiện ra; bấm nút loa 🔊 để nghe lại bao nhiêu lần cũng được.",
        "Chọn chưa trúng cũng không sao — bé không bị mất tim ở phần này đâu.",
        "Bố mẹ đọc cùng con phần “Mẹo đọc” ở bảng tra âm bên dưới nhé.",
      ]}
      gridTitle="Các bài ghép vần"
      gridSubtitle="Học lần lượt từ bài 1, hoặc chọn nhóm âm bé thích."
    >
      <div className="space-y-10">
        <PhonicsLessonList lessons={lessons} />

        <section className="space-y-3">
          <div>
            <h2 className="font-display text-xl font-extrabold">Bảng tra âm</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Tất cả các âm tiếng Anh, xếp theo nhóm. Quên âm nào thì tra lại ở đây.
            </p>
          </div>
          <SoundTable />
        </section>
      </div>
    </PracticeHub>
  );
}
