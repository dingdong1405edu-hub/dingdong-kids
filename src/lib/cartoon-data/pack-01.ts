// ===========================================================================
//  GÓI PHIM 01 — "Xem hoạt hình" (nói theo phim)
//
//  ⚠️ ĐÂY KHÔNG PHẢI đường thường dùng để gắn phim.
//
//  Cách gắn phim bình thường là vào **/admin/hoat-hinh**: dán link YouTube,
//  dán phụ đề (hoặc bấm Space bắt mốc), bấm Lưu. Phim vào thẳng DB, hiện ngay,
//  KHÔNG phải sửa file này và KHÔNG phải deploy lại.
//
//  File này dành cho nội dung "chính chủ" muốn theo dõi bằng git và đi qua
//  `npm run content:check` — ví dụ phim do chính DingDong sản xuất. Nó CỐ Ý để
//  trống: một phim có mốc thời gian đoán bừa còn tệ hơn là chưa có phim.
//
//  ──────────────────────────────────────────────────────────────────────────
//  Nếu vẫn muốn thêm phim BẰNG CODE: bắt mốc ở /admin/hoat-hinh cho tiện, rồi
//  chép thủ công vào mảng dưới đây theo khuôn sau, và chạy
//  `npm run content:check cartoons`. Phim mới luôn để `published: false` cho
//  tới khi tự xem thử trọn một lượt ở `/hoat-hinh/<id>`.
//  ──────────────────────────────────────────────────────────────────────────
//
//  Khuôn một phim (studio sinh ra đúng dạng này):
//
//    {
//      id: "peppa-muddy-puddles",
//      youtubeId: "XXXXXXXXXXX",
//      title: "Vũng nước bùn",
//      titleEn: "Muddy Puddles",
//      emoji: "🐷",
//      cover: "from-pink-300 via-rose-400 to-orange-400",
//      level: "starters",
//      channel: "Peppa Pig — Official Channel",
//      published: false,
//      lines: [
//        { start: 8.2,  end: 11.4, text: "It is raining today.",  vi: "Hôm nay trời mưa." },
//        { start: 12.0, end: 15.1, text: "I love muddy puddles!", vi: "Tớ thích vũng nước bùn!" },
//      ],
//    },
//
//  CHỌN PHIM CHO ĐÚNG (quyết định chất lượng nhiều hơn cả code):
//   • Câu NGẮN, 3–8 từ. Câu dài thì bé nhớ không nổi để nhắc lại, mà máy nghe
//     giọng trẻ em cũng sai nhiều hơn → bé bị chấm oan.
//   • Nhân vật nói RÕ, không nhạc nền át tiếng. Bài hát KHÔNG hợp để nói theo.
//   • Mỗi câu nên gọn trong 2–5 giây (giới hạn cứng: 12 giây, xem validate.ts).
//   • Ưu tiên kênh chính chủ. Nhúng video của kênh khác là hợp lệ, nhưng phải
//     giữ nguyên trình chơi YouTube — đừng che, đừng gỡ nhãn kênh.
// ===========================================================================
import type { Cartoon } from "./types";

export const CARTOONS: Cartoon[] = [];
