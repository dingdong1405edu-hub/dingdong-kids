import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { TopicSpeakingClient, type TopicData, type TopicHint } from "./topic-speaking-client";

interface Props {
  params: Promise<{ topicId: string }>;
}

/** `hints` lưu dạng Json tự do → lọc về [{ text, vi }] an toàn cho client. */
function asHints(v: unknown): TopicHint[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((h): h is Record<string, unknown> => !!h && typeof h === "object")
    .map((h) => ({
      text: typeof h.text === "string" ? h.text : "",
      vi: typeof h.vi === "string" ? h.vi : "",
    }))
    .filter((h) => h.text || h.vi);
}

export default async function SpeakingTopicPage({ params }: Props) {
  const { topicId } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  const t = await db.speakingTopic.findUnique({ where: { id: topicId } });
  if (!t || !t.published) notFound(); // chặn truy cập trực tiếp bản nháp

  const data: TopicData = {
    id: t.id,
    level: t.level,
    title: t.title,
    topic: t.topic,
    question: t.question,
    questionVi: t.questionVi,
    outline: t.outline,
    audioUrl: t.audioUrl,
    transcript: t.transcript,
    hints: asHints(t.hints),
    sampleAnswer: t.sampleAnswer,
    minWords: t.minWords,
    prepSeconds: t.prepSeconds,
  };

  return <TopicSpeakingClient topic={data} />;
}
