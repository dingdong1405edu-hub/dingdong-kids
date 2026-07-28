/**
 * Bảng màu & font dùng chung cho MỌI tài liệu PDF (đọc/nghe/viết/nói/từ vựng/ngữ
 * pháp/ghép vần — cả Luyện kỹ năng lẫn Lộ trình).
 *
 * PDF được tạo ở server bằng Chromium (xem src/lib/pdf/*). Các component PDF dùng
 * INLINE STYLE (không Tailwind) để render độc lập qua renderToStaticMarkup → HTML
 * → Chromium. Vì vậy mọi màu/độ giãn cách gom về đây cho đồng nhất & đúng thương
 * hiệu mới (xanh biển tươi + nắng vàng + nền kem ấm, hợp mắt trẻ em).
 */
export const PDF = {
  // Thương hiệu — đồng bộ với app (globals.css: --primary 202 90% 48% = #0c98e9).
  brand: "#0c98e9",
  brandDark: "#0a78b8",
  brandDeep: "#075888",
  brandSoft: "#e6f4fd", // nền xanh rất nhạt cho khối nhấn
  brandSoftBorder: "#bfe3f9",

  // Vàng nắng — dùng cho sao, phần thưởng, khối nhấn vui (globals.css: --sunny).
  gold: "#fbba23",
  goldSoft: "#fff6dd",
  goldBorder: "#fbe4a8",

  ink: "#2a2f45", // chữ chính
  ink2: "#4a4f63", // chữ phụ đậm
  muted: "#6b7180", // chữ phụ
  faint: "#9aa0ad", // nhãn mờ
  line: "#e4e7ee", // viền/đường kẻ
  lineSoft: "#eef1f6",
  paper: "#ffffff",
  paperTint: "#fbfaf6", // nền card kem rất nhạt

  // Ngữ nghĩa — "sai" dùng cam ấm thay đỏ gắt, tránh cảm giác bị mắng.
  correct: "#2f9e54",
  correctSoft: "#eaf7ef",
  wrong: "#e06c2b",
  wrongSoft: "#fdf0e6",
} as const;

/**
 * Font cho PDF.
 *  - `sans`: chữ giao diện/tiếng Việt (Nunito).
 *  - `word`: PHÔNG DẠY ĐỌC (Andika — chữ a/g một tầng) dùng cho từ vựng, câu
 *    tiếng Anh, mọi chỗ trẻ đang tập nhận mặt chữ.
 *  - `ipa`: phông có chân cho ký hiệu phiên âm IPA (rõ dấu nhấn).
 */
export const PDF_FONT = {
  sans: "'Nunito', system-ui, sans-serif",
  display: "'Baloo 2', 'Nunito', system-ui, sans-serif",
  word: "'Andika', 'Nunito', system-ui, sans-serif",
  /** Bí danh của `word` — đọc tự nhiên hơn ở chỗ in câu tiếng Anh. */
  english: "'Andika', 'Nunito', system-ui, sans-serif",
  ipa: "'Noto Serif', Georgia, serif",
} as const;
