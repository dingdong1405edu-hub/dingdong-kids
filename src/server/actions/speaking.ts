"use server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { gradeSpeaking, gradeSpeakingTopic, isGradingConfigured } from "@/lib/groq";
import { Skill, Prisma } from "@prisma/client";

const schema = z.object({
  setId: z.string(),
  transcript: z.string().min(1),
  referenceText: z.string().nullable(),
  part: z.enum(["repeat", "read", "answer"]),
  question: z.string().nullable(),
  index: z.number().int().nonnegative(),
  durationSec: z.number().optional(),
});

// Chấm MỘT bản ghi âm luyện nói (format Cambridge Speaking) bằng Groq rồi lưu
// thành một Attempt (giống gradeWritingAction). Bước audio→transcript vẫn nằm ở
// route /api/transcribe (Deepgram, dự phòng Groq Whisper) vì phải nhận tệp audio
// multipart; ở đây chỉ chấm văn bản + lưu kết quả, để trang danh sách bài nói
// đếm được số lượt làm và điểm cao nhất như mọi kỹ năng khác.
export async function gradeSpeakingAction(input: z.infer<typeof schema>) {
  const session = await auth();
  if (!session?.user) return { ok: false as const, error: "Unauthorized" };

  if (!isGradingConfigured()) {
    return {
      ok: false as const,
      error: "Chức năng chấm điểm AI chưa được cấu hình (thiếu GROQ_API_KEY).",
    };
  }

  const { setId, transcript, referenceText, part, question, index, durationSec } =
    schema.parse(input);

  // Cấp độ luôn lấy từ DB, không bao giờ tin client.
  const set = await db.speakingSet.findUnique({ where: { id: setId } });
  if (!set) return { ok: false as const, error: "Set not found" };

  try {
    const result = await gradeSpeaking({
      transcript,
      referenceText,
      part,
      question,
      level: set.level,
    });

    await db.$transaction([
      db.attempt.create({
        data: {
          userId: session.user.id,
          skill: Skill.SPEAKING,
          refId: setId,
          rawAnswer: { transcript, part, index, referenceText, question } as Prisma.InputJsonValue,
          score: result.score,
          feedback: result as unknown as Prisma.InputJsonValue,
          durationSec,
        },
      }),
      db.user.update({
        where: { id: session.user.id },
        data: { xp: { increment: Math.round(result.score / 10) }, lastActiveAt: new Date() },
      }),
    ]);

    return { ok: true as const, result };
  } catch (e) {
    console.error("Speaking grade error:", e);
    return { ok: false as const, error: "AI grading failed" };
  }
}

const topicSchema = z.object({
  topicId: z.string(),
  transcript: z.string().min(1),
  durationSec: z.number().optional(),
});

// Chấm một bài "Nói theo chủ đề": bé ghi âm trả lời mở → transcript (Deepgram,
// ở /api/transcribe) → Groq chấm chi tiết. Lưu 1 Attempt (skill = SPEAKING,
// refId = topicId, rawAnswer.kind = "topic") để hub vẫn đếm lượt làm + điểm cao
// nhất theo refId như mọi kỹ năng khác. Câu hỏi/chủ đề/cấp độ lấy từ DB (không
// tin client).
export async function gradeSpeakingTopicAction(input: z.infer<typeof topicSchema>) {
  const session = await auth();
  if (!session?.user) return { ok: false as const, error: "Unauthorized" };

  if (!isGradingConfigured()) {
    return {
      ok: false as const,
      error: "Chức năng chấm điểm AI chưa được cấu hình (thiếu GROQ_API_KEY).",
    };
  }

  const { topicId, transcript, durationSec } = topicSchema.parse(input);

  const topic = await db.speakingTopic.findUnique({ where: { id: topicId } });
  if (!topic) return { ok: false as const, error: "Không tìm thấy chủ đề." };

  try {
    const result = await gradeSpeakingTopic({
      transcript,
      topic: topic.topic,
      question: topic.question,
      referenceTranscript: topic.transcript,
      outline: topic.outline,
      level: topic.level,
      minWords: topic.minWords,
      durationSec: durationSec ?? null,
    });

    await db.$transaction([
      db.attempt.create({
        data: {
          userId: session.user.id,
          skill: Skill.SPEAKING,
          refId: topicId,
          rawAnswer: { kind: "topic", transcript } as Prisma.InputJsonValue,
          score: result.score,
          feedback: result as unknown as Prisma.InputJsonValue,
          durationSec,
        },
      }),
      db.user.update({
        where: { id: session.user.id },
        data: { xp: { increment: Math.round(result.score / 10) }, lastActiveAt: new Date() },
      }),
    ]);

    return { ok: true as const, result };
  } catch (e) {
    console.error("Speaking topic grade error:", e);
    return { ok: false as const, error: "AI grading failed" };
  }
}
