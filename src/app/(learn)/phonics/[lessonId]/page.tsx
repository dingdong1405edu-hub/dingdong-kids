import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { PHONICS_LESSONS, getPhonicsLesson } from "@/lib/phonics-lessons";
import { PhonicsFlow } from "@/components/learn/phonics/phonics-flow";

interface Props {
  params: Promise<{ lessonId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = getPhonicsLesson(lessonId);
  return {
    title: lesson ? `Ghép vần · ${lesson.title}` : "Ghép vần",
    description: lesson?.subtitle,
  };
}

export default async function PhonicsLessonPage({ params }: Props) {
  const { lessonId } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  // Bài học nằm trong code (dữ liệu tĩnh), không phải DB — id lạ thì 404.
  const lesson = getPhonicsLesson(lessonId);
  if (!lesson) notFound();

  const progress = await db.phonicsProgress.findUnique({
    where: { userId_lessonId: { userId: session.user.id, lessonId } },
    select: { bestScore: true },
  });

  const idx = PHONICS_LESSONS.findIndex((l) => l.id === lesson.id);
  const next = idx >= 0 ? PHONICS_LESSONS[idx + 1] : undefined;

  return (
    <PhonicsFlow
      lesson={lesson}
      bestScore={progress?.bestScore ?? 0}
      nextLesson={next ? { id: next.id, title: next.title } : null}
    />
  );
}
