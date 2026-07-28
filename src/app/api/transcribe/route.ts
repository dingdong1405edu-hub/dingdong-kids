import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { transcribeAudio, isTranscriptionConfigured } from "@/lib/stt";

/**
 * Ghi âm của bé → văn bản tiếng Anh (Deepgram `en-US`, dự phòng Groq Whisper).
 * Dùng cho phần Luyện nói: có transcript rồi mới chấm phát âm / ngữ điệu được.
 */
export async function POST(req: NextRequest) {
  const session = await auth();
  // Thông báo lỗi ở đây được client hiển thị THẲNG cho bé qua toast
  // (xem speaking-client.tsx), nên phải là tiếng Việt dễ hiểu, không phải mã lỗi.
  if (!session?.user) {
    return NextResponse.json({ error: "Bé hãy đăng nhập rồi luyện nói nhé!" }, { status: 401 });
  }

  if (!isTranscriptionConfigured()) {
    return NextResponse.json(
      { error: "Chức năng nhận dạng giọng nói chưa được cấu hình (thiếu DEEPGRAM_API_KEY hoặc GROQ_API_KEY)." },
      { status: 503 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("audio") as File | null;
  if (!file) return NextResponse.json({ error: "Chưa có bản ghi âm nào" }, { status: 400 });

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const transcript = await transcribeAudio(buffer, file.type);
    return NextResponse.json({ transcript });
  } catch (e) {
    console.error("Transcribe error:", e);
    return NextResponse.json(
      { error: "Máy chưa nghe rõ. Bé nói to và chậm hơn một chút rồi thu lại nhé!" },
      { status: 500 }
    );
  }
}
