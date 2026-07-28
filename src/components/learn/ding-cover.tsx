import { cn, coverEmoji, coverGradient } from "@/lib/utils";

/**
 * DingCover — ảnh bìa DỰ PHÒNG cho các thẻ (bài học / tài liệu) chưa có ảnh riêng.
 *
 * Bản cũ dán một ảnh linh vật cố định. Với DingDong Kids, mỗi thẻ nhận một dải
 * gradient + một emoji chủ đề trẻ em CHỌN THEO SEED (tất định — không nhảy khi
 * tải lại trang, và hai thẻ cạnh nhau ra hai màu khác nhau cho vui mắt). Nhờ vậy
 * lưới thẻ trông sinh động mà không cần ảnh thật.
 *
 * Thuần trang trí → `aria-hidden` để trình đọc màn hình không đọc lặp (thẻ đã có
 * tiêu đề riêng ở <h3>).
 *
 * Kích thước ô do phía gọi quyết định qua `className`
 * (vd `absolute inset-0` hoặc `h-32 w-full rounded-xl`).
 */
export function DingCover({ className, seed = "dingdong" }: { className?: string; seed?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        coverGradient(seed),
        className,
      )}
    >
      {/* Emoji chủ đề — to, hơi nghiêng cho có nhịp. */}
      <span className="select-none text-5xl leading-none drop-shadow-sm [transform:rotate(-6deg)]">
        {coverEmoji(seed)}
      </span>
      {/* Ding (chú gấu con) ló ra góc dưới như một miếng dán. */}
      <span className="absolute -bottom-1 right-1.5 select-none text-2xl leading-none opacity-90">
        🐻
      </span>
      {/* Bong bóng sáng mờ cho bìa bớt phẳng. */}
      <span className="pointer-events-none absolute -left-6 -top-8 h-20 w-20 rounded-full bg-white/25" />
    </div>
  );
}

/** Tên cũ — giữ lại để các trang chưa đổi tên import vẫn chạy. */
export const BaoCover = DingCover;
