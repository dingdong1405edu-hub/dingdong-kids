// Kiểu dữ liệu của cấp "Bé Tập Nói". Tách khỏi `@/lib/first-words` để các gói
// chủ đề (`pack-*.ts`) nhập kiểu mà không tạo vòng lặp import.
//
// `@/lib/first-words` xuất lại đúng hai kiểu này, nên mọi nơi đang import từ đó
// vẫn chạy nguyên như cũ.

export interface FirstWord {
  /** Từ tiếng Anh bé nghe rồi nhắc lại. Viết thường, không dấu câu. */
  word: string;
  /** Nghĩa tiếng Việt — dành cho BỐ MẸ, bé chưa đọc được. */
  vi: string;
  /** Hình minh hoạ. Với bé chưa biết chữ đây là nội dung chính, không phải trang trí. */
  emoji: string;
}

export interface FirstWordsUnit {
  /** id tĩnh — cũng là slug URL và khoá của FirstWordsProgress. */
  id: string;
  /** Tên chủ đề tiếng Việt (bố mẹ đọc). */
  title: string;
  /** Tên chủ đề tiếng Anh. */
  titleEn: string;
  emoji: string;
  /** Gradient nền bong bóng chủ đề — literal để Tailwind JIT quét được. */
  cover: string;
  words: FirstWord[];
  /**
   * Chủ đề KHÁM PHÁ THÊM: học được y hệt chủ đề chính, nhưng KHÔNG tính vào
   * mốc tốt nghiệp.
   *
   * Lý do: mốc tốt nghiệp là 80% số từ của "chặng chính". Nếu mọi chủ đề thêm
   * đều tính vào đó thì mỗi lần bổ sung nội dung là một lần đẩy tấm bằng ra xa
   * hơn — bé học chăm vẫn thấy mục tiêu lùi lại, và phễu mời lên Pre-Starters
   * (xem CLAUDE.md §6.1) hỏng theo.
   */
  bonus?: boolean;
}
