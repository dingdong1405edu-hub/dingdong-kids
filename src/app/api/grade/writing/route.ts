import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { gradeWriting, isGradingConfigured } from "@/lib/groq";
import { z } from "zod";

/**
 * Đề bài viết cho trẻ rất ngắn (vài câu về gia đình, con vật, món ăn yêu
 * thích...). Độ dài đo bằng SỐ TỪ (`minWords`): tiếng Anh có dấu cách nên đếm
 * từ mới là thước đo đúng, đếm ký tự sẽ phạt oan những bé viết từ dài.
 */
const schema = z.object({
  submission: z.string(),
  level: z.string(),
  taskPrompt: z.string(),
  minWords: z.number(),
  /** Dàn ý gợi ý của đề (nếu có) — giúp AI chấm đúng phần bé cần viết. */
  outline: z.string().nullable().optional(),
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
    const result = await gradeWriting(parsed.data);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Chưa chấm được bài, bé thử lại nhé!" }, { status: 500 });
  }
}
