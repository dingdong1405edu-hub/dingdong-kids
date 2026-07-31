// Hình minh hoạ của một từ vựng, theo thứ tự ưu tiên:
//   1. Ảnh thật admin tải lên (`imageUrl`)
//   2. Emoji đi kèm từ (`emoji`)
//   3. Chữ cái đầu của từ — HOẶC dấu "?" khi đang ở trong trò chơi
//
// Với bé CHƯA ĐỌC ĐƯỢC CHỮ, màn hình mà không có hình thì bé không có manh mối
// nào để đoán nghĩa — nên ở đây không bao giờ được trả về khung trống. Trước đây
// mọi từ đều hiện chung một biểu tượng khung ảnh, khiến phần "Nghe & nhắc lại"
// nhìn như nhau ở mọi từ và bé không học được gì.
import { cn } from "@/lib/utils";

interface Props {
  word: { word: string; imageUrl?: string | null; emoji?: string | null };
  /** Cỡ chữ của emoji (class Tailwind), vd "text-8xl". */
  emojiClass?: string;
  /**
   * Đang dùng trong TRÒ CHƠI có đáp án — khi từ thiếu cả ảnh lẫn emoji thì hiện
   * dấu "?" thay vì chữ cái đầu.
   *
   * Chữ cái đầu LÀM LỘ ĐÁP ÁN: máy đọc "apple", ba ô hiện "a / b / c" thì bé chỉ
   * cần dò chữ cái là xong, không cần nghe nữa — hỏng đúng cái mà game đang định
   * luyện. Ở màn học (không có đáp án để lộ) thì chữ cái đầu lại hữu ích, nên
   * đây là tuỳ chọn chứ không phải mặc định.
   */
  quiz?: boolean;
  className?: string;
}

export function WordVisual({ word, emojiClass = "text-8xl", quiz = false, className }: Props) {
  if (word.imageUrl) {
    return (
      // Ảnh do admin tải lên: dùng <img> thường (không next/image) để mọi URL
      // admin nhập đều hiện được mà không phải khai báo remotePatterns.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={word.imageUrl}
        alt=""
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  if (word.emoji) {
    return (
      <span className={cn("select-none leading-none", emojiClass, className)} aria-hidden>
        {word.emoji}
      </span>
    );
  }

  // Chưa có gì cả — ít nhất cho bé một thứ để bám vào, còn hơn khung trống.
  return (
    <span
      className={cn("font-primer font-bold uppercase text-primary/40", emojiClass, className)}
      aria-hidden
    >
      {quiz ? "?" : word.word.charAt(0)}
    </span>
  );
}
