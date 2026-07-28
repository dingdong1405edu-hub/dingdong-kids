import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-guard";
import { synthesizeSpeech, isTtsConfigured, TTS_VOICES, DEFAULT_VOICE } from "@/lib/tts";

export const runtime = "nodejs";

/**
 * Giới hạn độ dài cho MỘT lần bấm "🔊 Tạo audio" trong trang quản trị.
 *
 * Đủ rộng cho một đoạn đọc hoặc một lời thoại bài nghe dài, nhưng vẫn chặn việc
 * lỡ tay dán cả trang sách vào ô nhập — Deepgram Aura tính tiền theo ký tự.
 * `synthesizeSpeech()` còn một chốt chặn cứng nữa ở tầng lib; ở đây báo lỗi sớm
 * để admin thấy ngay số ký tự thừa thay vì nhận lỗi khó hiểu từ API.
 */
const MAX_TEXT_CHARS = 1500;

const VOICE_IDS = new Set<string>(TTS_VOICES.map((v) => v.id));

const schema = z.object({
  text: z.string().trim().min(1).max(MAX_TEXT_CHARS),
  /** Bỏ trống = dùng giọng "cô giáo" mặc định. */
  voice: z.string().trim().optional(),
});

/**
 * Sinh audio đọc một đoạn văn bản TIẾNG ANH — endpoint đứng sau nút
 * "🔊 Tạo audio" của trang quản trị. Trả `{ ok: true, url }` với url dạng
 * `/api/files/<id>` để gắn thẳng vào `audioUrl` của từ vựng / câu hỏi / bài nghe.
 *
 * Vì sao cần: người học là TRẺ EM 4–15 tuổi, nhiều bé chưa đọc thạo, nên mọi từ
 * và mọi câu hỏi đều phải nghe được. Deepgram Aura có giọng tiếng Anh chất lượng
 * cao nên admin không phải tự thu MP3 nữa.
 *
 * Kết quả được CACHE theo (văn bản + giọng) trong `Upload.ttsKey` — bấm lại nút
 * cho cùng một câu sẽ dùng lại tệp cũ, không tốn thêm chi phí.
 */
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ ok: false, error: "Không có quyền truy cập" }, { status: 401 });
  }

  if (!isTtsConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Chức năng tạo audio chưa được cấu hình (thiếu DEEPGRAM_API_KEY)." },
      { status: 503 },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: `Văn bản trống hoặc dài quá ${MAX_TEXT_CHARS} ký tự.` },
      { status: 400 },
    );
  }

  // Giọng lạ (client tự chế) → lặng lẽ dùng giọng mặc định thay vì báo lỗi:
  // admin chỉ muốn có audio, không cần biết id giọng đã đổi.
  const voice = parsed.data.voice && VOICE_IDS.has(parsed.data.voice) ? parsed.data.voice : DEFAULT_VOICE;

  try {
    const url = await synthesizeSpeech(parsed.data.text, voice);
    return NextResponse.json({ ok: true, url });
  } catch (e) {
    console.error("TTS error:", e);
    return NextResponse.json({ ok: false, error: "Tạo audio thất bại, thử lại giúp mình nhé." }, { status: 500 });
  }
}

/** Danh sách giọng đọc cho ô chọn giọng trong trang quản trị. */
export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ ok: false, error: "Không có quyền truy cập" }, { status: 401 });
  }
  return NextResponse.json({
    ok: true,
    configured: isTtsConfigured(),
    defaultVoice: DEFAULT_VOICE,
    voices: TTS_VOICES,
    maxChars: MAX_TEXT_CHARS,
  });
}
