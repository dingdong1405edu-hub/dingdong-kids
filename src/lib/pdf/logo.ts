import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Logo thương hiệu dạng data-URI để nhúng thẳng vào HTML khi tạo PDF.
 *
 * PDF tạo bằng `page.setContent(html)` nên KHÔNG có base URL → đường dẫn tương đối
 * như "/logo.png" sẽ không tải được. Đọc file 1 lần từ public/ rồi cache lại
 * thành base64. Chỉ chạy ở server (Node) trong route handler /api/pdf/*.
 *
 * KHÔNG gắn cứng một tên file: quét public/ tìm ảnh tên bắt đầu bằng "logo" để
 * logo vẫn hiện dù file được đổi tên trong lúc chuyển thương hiệu.
 */
const LOGO_FILE_RE = /^logo[\w.-]*\.(png|jpg|jpeg|webp)$/i;

const MIME_BY_EXT: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
};

let cached: string | null = null;

export function getLogoDataUri(): string {
  if (cached !== null) return cached;
  try {
    const dir = join(process.cwd(), "public");
    // "logo.png" trước tiên (tên chuẩn), rồi tới các biến thể tên khác.
    const names = readdirSync(dir)
      .filter((n) => LOGO_FILE_RE.test(n))
      .sort((a, b) => a.length - b.length);
    for (const name of names) {
      try {
        const buf = readFileSync(join(dir, name));
        const ext = name.split(".").pop()?.toLowerCase() ?? "png";
        cached = `data:${MIME_BY_EXT[ext] ?? "image/png"};base64,${buf.toString("base64")}`;
        return cached;
      } catch {
        // thử tên tiếp theo
      }
    }
  } catch {
    // không đọc được thư mục public/ → rơi xuống chuỗi rỗng
  }
  // Thiếu file → trả chuỗi rỗng; header PDF vẫn hiện chữ "DingDong Kids".
  cached = "";
  return cached;
}
