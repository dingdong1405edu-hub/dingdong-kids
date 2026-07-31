// ===========================================================================
//  HỢP ĐỒNG TRÒ CHƠI TỪ VỰNG — dùng chung cho mọi game trong thư mục này.
//
//  Các game này dành cho bé 4–7 tuổi CHƯA ĐỌC ĐƯỢC CHỮ, dùng trong mức
//  "Nghe & nhắc lại". Nguyên tắc thiết kế BẮT BUỘC:
//
//   1. KHÔNG CẦN BIẾT ĐỌC. Mọi thông tin phải truyền bằng HÌNH + ÂM THANH.
//      Chữ tiếng Anh chỉ là thứ bé đang làm quen, không bao giờ là manh mối duy
//      nhất để chơi được.
//   2. TỰ ĐỘNG PHÁT ÂM khi vào lượt mới. Bé không biết bấm nút loa ở đâu.
//   3. KHÔNG BAO GIỜ "THUA". Chọn sai thì nhẹ nhàng cho thử lại, không trừ
//      điểm, không màn hình đỏ. Mục tiêu là bé dám thử, không phải bé đúng.
//   4. VÙNG CHẠM TO (≥ 96px cho ô chơi chính). Ngón tay trẻ kém chính xác.
//   5. LƯỢT NGẮN: 4–6 lượt là xong một game. Trẻ 4 tuổi mất tập trung sau ~2 phút.
//   6. PHẢN HỒI NGAY: đúng thì có sao bay + âm thanh + nhân vật khen.
// ===========================================================================
import type { VocabWordCard } from "@/types";

export interface VocabGameProps {
  /** Các từ của bài (đã lọc ≥ 2 từ). Game tự chọn/xáo trộn theo nhu cầu. */
  words: VocabWordCard[];
  /**
   * Gọi khi bé chơi xong. `stars` từ 1–3 để thưởng:
   *   3 = làm đúng gần hết ngay lần đầu
   *   2 = có vài lần thử lại
   *   1 = xong bài (luôn tối thiểu 1 — bé chơi hết là đã đáng khen)
   */
  onDone: (stars: number) => void;
}

/** Mô tả một game để menu hiển thị và trình chơi lắp vào. */
export interface VocabGameMeta {
  id: string;
  /** Tên tiếng Việt hiện cho bé, ngắn và vui. */
  title: string;
  /** Một câu mô tả cách chơi, viết cho PHỤ HUYNH đọc cho bé. */
  hint: string;
  emoji: string;
  /** Số từ tối thiểu để game chạy được (vd ghép đôi cần ≥ 3). */
  minWords: number;
}
