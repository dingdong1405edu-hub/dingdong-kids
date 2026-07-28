import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { gradeSpeaking, isGradingConfigured } from "@/lib/groq";
import { z } from "zod";

/**
 * Ba dạng bài nói theo format Cambridge Young Learners Speaking:
 *  - `repeat` — nghe rồi nhắc lại đúng câu mẫu (`referenceText`).
 *  - `read`   — đọc to đoạn văn ngắn trên màn hình (`referenceText`).
 *  - `answer` — trả lời câu hỏi của giám khảo (`question`).
 */
const schema = z.object({
  transcript: z.string(),
  referenceText: z.string().nullable(),
  part: z.enum(["repeat", "read", "answer"]),
  question: z.string().nullable(),
  level: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!isGradingConfigured()) {
    return NextResponse.json(
      { error: "Chức năng chấm bài bằng AI chưa được cấu hình (thiếu GROQ_API_KEY)." },
      { status: 503 }
    );
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });

  try {
    const result = await gradeSpeaking(parsed.data);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Chưa chấm được bài, bé thử lại nhé!" }, { status: 500 });
  }
}
