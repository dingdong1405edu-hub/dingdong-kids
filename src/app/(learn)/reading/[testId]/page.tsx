import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { ReadingTestClient } from "./reading-test-client";

interface Props {
  params: Promise<{ testId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { testId } = await params;
  const t = await db.readingTest.findUnique({
    where: { id: testId },
    select: { title: true, published: true },
  });
  if (!t || !t.published) return { title: "Đọc hiểu" };
  return {
    title: t.title,
    description: "Bài đọc hiểu tiếng Anh cho bé — đọc truyện ngắn rồi trả lời câu hỏi.",
  };
}

export default async function ReadingTestPage({ params }: Props) {
  const { testId } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  const test = await db.readingTest.findUnique({
    where: { id: testId },
    include: { questions: { orderBy: { order: "asc" } } },
  });
  if (!test || !test.published) notFound(); // chặn truy cập trực tiếp đề nháp

  return <ReadingTestClient test={test} userId={session.user.id} />;
}
