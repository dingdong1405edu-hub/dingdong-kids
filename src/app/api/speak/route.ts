import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { isFirstWord } from "@/lib/first-words";
import { isTtsConfigured, synthesizeMany } from "@/lib/tts";

/**
 * Sinh (hoặc lấy lại từ cache) giọng đọc cho các từ của cấp "Bé Tập Nói".
 *
 * Trang bài học chỉ tra CACHE khi render (cachedSpeechUrls) nên mở ra là chạy
 * ngay; từ nào chưa có audio thì client gọi endpoint này ở nền để sinh dần. Lần
 * đầu tiên trong đời dự án tốn một lượt gọi Aura cho mỗi từ, sau đó mọi bé đều
 * dùng lại bản đã lưu trong bảng Upload.
 *
 * CHẶN Ở BOUNDARY: chỉ chấp nhận từ nằm trong danh sách nội dung tĩnh
 * (`isFirstWord`). Aura tính tiền theo ký tự — không được để endpoint này thành
 * cổng đọc văn bản tuỳ ý.
 */
const schema = z.object({
  texts: z.array(z.string().min(1).max(40)).min(1).max(12),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Bé hãy đăng nhập nhé!" }, { status: 401 });
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const texts = [...new Set(parsed.data.texts.map((t) => t.trim().toLowerCase()))].filter(isFirstWord);
  if (texts.length === 0) {
    return NextResponse.json({ error: "Không có từ nào hợp lệ" }, { status: 400 });
  }

  // Chưa cấu hình Deepgram: KHÔNG phải lỗi. Client tự đọc bằng giọng en-US của
  // trình duyệt (Web Speech) — bé vẫn nghe được, chỉ là giọng kém tự nhiên hơn.
  if (!isTtsConfigured()) return NextResponse.json({ urls: {} });

  const generated = await synthesizeMany(texts);
  const urls: Record<string, string> = {};
  texts.forEach((t, i) => {
    const url = generated[i];
    if (url) urls[t] = url;
  });

  return NextResponse.json({ urls });
}
