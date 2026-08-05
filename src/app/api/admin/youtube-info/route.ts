import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";

/**
 * Tra thông tin một video YouTube bằng **oEmbed** — công khai, KHÔNG cần API key.
 *
 * Làm được hai việc cùng lúc, và cả hai đều cần trước khi gắn phim:
 *
 *  1. Điền sẵn tên phim + tên kênh, người vận hành khỏi gõ tay.
 *  2. **Kiểm phim có cho nhúng không.** oEmbed trả 401/403 với video tắt nhúng
 *     và 404 với video riêng tư/đã gỡ — biết ngay từ lúc dán link, thay vì gắn
 *     xong rồi mới phát hiện bé chỉ nhìn thấy ô đen.
 *
 * Vì sao không dùng YouTube Data API: nó cần `YOUTUBE_API_KEY` (thêm một biến
 * môi trường + hạn ngạch phải theo dõi) mà vẫn KHÔNG cho biết video có nhúng
 * được không. oEmbed vừa nhẹ hơn vừa trả lời đúng câu hỏi mình cần.
 *
 * Chỉ ADMIN gọi được: endpoint này đi ra Internet, không để thành cổng chuyển
 * tiếp cho người ngoài.
 */

/** Đừng để một video treo làm treo luôn form của người vận hành. */
const TIMEOUT_MS = 6000;

export interface YouTubeInfoResponse {
  ok: boolean;
  /** Tên video theo YouTube. */
  title?: string;
  /** Tên kênh phát hành. */
  channel?: string;
  thumbnail?: string;
  /** Lý do không dùng được, viết sẵn cho người vận hành đọc. */
  error?: string;
}

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json<YouTubeInfoResponse>(
      { ok: false, error: "Không có quyền" },
      { status: 403 },
    );
  }

  const videoId = (req.nextUrl.searchParams.get("v") ?? "").trim();
  if (!/^[\w-]{11}$/.test(videoId)) {
    return NextResponse.json<YouTubeInfoResponse>(
      { ok: false, error: "Mã video không hợp lệ" },
      { status: 400 },
    );
  }

  const url = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(
    `https://www.youtube.com/watch?v=${videoId}`,
  )}`;

  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      // Tên phim gần như không đổi — cache một ngày để bấm đi bấm lại không
      // gọi ra ngoài mỗi lần.
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json<YouTubeInfoResponse>({
        ok: false,
        error:
          res.status === 404
            ? "Không tìm thấy video này (đã bị gỡ hoặc để riêng tư)."
            : "Video này KHÔNG CHO NHÚNG — bé sẽ không xem được. Hãy chọn phim khác.",
      });
    }

    const data = (await res.json()) as {
      title?: unknown;
      author_name?: unknown;
      thumbnail_url?: unknown;
    };

    return NextResponse.json<YouTubeInfoResponse>({
      ok: true,
      title: typeof data.title === "string" ? data.title : "",
      channel: typeof data.author_name === "string" ? data.author_name : "",
      thumbnail: typeof data.thumbnail_url === "string" ? data.thumbnail_url : "",
    });
  } catch {
    // Mạng hỏng / quá hạn chờ. KHÔNG chặn người vận hành: họ vẫn gõ tay được,
    // và trình chơi ở ngay bên cạnh cũng tự báo nếu phim không nhúng được.
    return NextResponse.json<YouTubeInfoResponse>({
      ok: false,
      error: "Chưa hỏi được YouTube (mạng chậm?). Cứ điền tay, phần xem thử bên dưới vẫn chạy.",
    });
  }
}
