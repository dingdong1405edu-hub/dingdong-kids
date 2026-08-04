// Kiểu dữ liệu của khu "Xem hoạt hình" (nói theo phim — shadowing).
//
// Tách khỏi `@/lib/cartoons` để các gói phim (`pack-*.ts`) nhập kiểu mà không
// tạo vòng lặp import — cùng khuôn với `@/lib/first-words-data/types`.

/**
 * MỘT CÂU trong phim: đoạn video từ `start` tới `end` chỉ chứa đúng câu này,
 * nói xong thì trình chơi DỪNG lại để bé nhắc theo.
 *
 * Mốc thời gian phải khớp thật với video, sai một nhịp là bé nghe hụt nửa câu.
 * Bắt mốc bằng studio ở `/admin/hoat-hinh` thay vì đếm tay.
 */
export interface CartoonLine {
  /** Giây bắt đầu câu (có thể lẻ: 12.4). */
  start: number;
  /** Giây kết thúc — trình chơi dừng đúng ở đây. */
  end: number;
  /** Câu tiếng Anh bé phải nhắc lại. Viết đúng như nhân vật nói. */
  text: string;
  /** Nghĩa tiếng Việt — cho bố mẹ, và cho bé đọc được chữ hiểu nội dung. */
  vi: string;
}

export interface Cartoon {
  /** id tĩnh — cũng là slug URL và khoá của `CartoonProgress`. */
  id: string;
  /**
   * Mã video YouTube (phần sau `v=`).
   *
   * Phim phải CHO PHÉP NHÚNG. Kênh tắt nhúng thì trình chơi báo lỗi 101/150 và
   * bé không xem được — kiểm bằng studio `/admin/hoat-hinh` trước khi mở.
   */
  youtubeId: string;
  /** Tên hiển thị tiếng Việt. */
  title: string;
  /** Tên gốc tiếng Anh (hiện nhỏ dưới tên tiếng Việt). */
  titleEn: string;
  emoji: string;
  /** Gradient nền thẻ phim — literal để Tailwind JIT quét được. */
  cover: string;
  /**
   * Cấp gợi ý, chỉ để xếp thứ tự và dán nhãn cho bố mẹ chọn.
   *
   * Cố ý KHÔNG dùng enum `EnglishLevel` của Prisma: khu này không bán theo gói,
   * không có Course, và còn nhận cả nhãn "tap-noi" đứng trước Pre-Starters.
   */
  level: CartoonLevel;
  /** Nguồn/kênh — ghi rõ để tôn trọng bản quyền của kênh gốc. */
  channel: string;
  lines: CartoonLine[];
  /**
   * Chỉ phim `published: true` mới hiện cho bé.
   *
   * Mặc định KHÔNG hiện: một phim mốc thời gian sai còn tệ hơn là chưa có phim
   * nào — bé bấm vào, nghe hụt câu, rồi bỏ đi. Bật cờ này sau khi đã xem thử
   * trọn một lượt bằng studio `/admin/hoat-hinh`.
   */
  published?: boolean;
}

/** Nhãn cấp của khu hoạt hình. Xem chú thích ở `Cartoon.level`. */
export type CartoonLevel = "tap-noi" | "pre-starters" | "starters" | "movers" | "flyers";
