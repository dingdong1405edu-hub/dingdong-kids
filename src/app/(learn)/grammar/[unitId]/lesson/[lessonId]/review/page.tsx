import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { GrammarReview } from "@/components/learn/grammar/grammar-review";
import { grammarReviewExercises } from "@/lib/grammar";
import type { Exercise } from "@/types";

interface Props {
  params: Promise<{ unitId: string; lessonId: string }>;
}

export const metadata: Metadata = {
  title: "Ôn tập ngữ pháp",
  description: "Ôn lại bài ngữ pháp tiếng Anh bằng câu hỏi nhanh và thẻ ghi nhớ.",
};

/** Ôn tập một bài — không lý thuyết, trộn quiz + flashcard của riêng bài đó. */
export default async function GrammarLessonReviewPage({ params }: Props) {
  const { unitId, lessonId } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  const lesson = await db.grammarLesson.findUnique({
    where: { id: lessonId },
    include: { unit: { select: { published: true } } },
  });
  if (!lesson || !lesson.published || !lesson.unit.published) notFound(); // ẩn bài/unit nháp

  const exercises: Exercise[] = grammarReviewExercises(lesson.exercises);

  return (
    <GrammarReview
      title={lesson.title || "Ôn tập ngữ pháp"}
      exercises={exercises}
      closeHref={`/grammar/${unitId}`}
    />
  );
}
