import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { MockExamClient } from "./mock-exam-client";
import type { ExamData } from "./types";

interface Props {
  params: Promise<{ examId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { examId } = await params;
  const e = await db.mockExam.findUnique({ where: { id: examId }, select: { title: true } });
  return {
    title: e?.title ?? "Thi thử",
    description: "Đề thi thử tiếng Anh cho bé theo đúng format Cambridge.",
  };
}

export default async function MockExamPage({ params }: Props) {
  const { examId } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  const exam = await db.mockExam.findUnique({
    where: { id: examId },
    include: {
      sections: {
        orderBy: { order: "asc" },
        include: {
          parts: {
            orderBy: { order: "asc" },
            include: { questions: { orderBy: { order: "asc" } } },
          },
        },
      },
    },
  });
  if (!exam) notFound();

  // Đề nháp chỉ admin xem được (chặn học viên truy cập trực tiếp qua URL).
  if (!exam.published && session.user.role !== "ADMIN") notFound();

  const data: ExamData = {
    id: exam.id,
    title: exam.title,
    level: exam.level,
    description: exam.description,
    totalTime: exam.totalTime,
    sections: exam.sections.map((s) => ({
      id: s.id,
      skill: s.skill,
      title: s.title,
      instructions: s.instructions,
      parts: s.parts.map((p) => ({
        id: p.id,
        title: p.title,
        instructions: p.instructions,
        imageUrl: p.imageUrl,
        passage: p.passage,
        audioUrl: p.audioUrl,
        transcript: p.transcript,
        writingPrompt: p.writingPrompt,
        writingMinWords: p.writingMinWords,
        questions: p.questions.map((q) => ({
          id: q.id,
          type: q.type,
          prompt: q.prompt,
          promptTranslation: q.promptTranslation,
          imageUrl: q.imageUrl,
          audioUrl: q.audioUrl,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          supportingQuote: q.supportingQuote,
          quoteTranslation: q.quoteTranslation,
          order: q.order,
        })),
      })),
    })),
  };

  return <MockExamClient exam={data} />;
}
