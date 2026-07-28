import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { ListeningTestClient } from "./listening-test-client";

interface Props {
  params: Promise<{ testId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { testId } = await params;
  const t = await db.listeningTest.findUnique({
    where: { id: testId },
    select: { title: true, published: true },
  });
  if (!t || !t.published) return { title: "Nghe hiểu" };
  return {
    title: t.title,
    description: "Bài nghe hiểu tiếng Anh cho bé — nghe rồi chọn đáp án đúng.",
  };
}

export default async function ListeningTestPage({ params }: Props) {
  const { testId } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  const test = await db.listeningTest.findUnique({
    where: { id: testId },
    include: { questions: { orderBy: { order: "asc" } } },
  });
  if (!test || !test.published) notFound(); // chặn truy cập trực tiếp đề nháp

  return <ListeningTestClient test={test} userId={session.user.id} />;
}
