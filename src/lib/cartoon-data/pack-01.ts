// ===========================================================================
//  GÓI PHIM 01 — "Xem hoạt hình" (nói theo phim)
//
//  CỐ Ý ĐỂ TRỐNG. Không có phim mẫu nào ở đây, vì một phim có mốc thời gian
//  đoán bừa còn tệ hơn là chưa có phim: bé bấm vào, nghe hụt nửa câu, rồi bỏ đi
//  và không quay lại. Mốc thời gian chỉ đúng khi được bắt trên chính video thật.
//
//  ──────────────────────────────────────────────────────────────────────────
//  THÊM MỘT PHIM — ba bước:
//
//  1. Mở `/admin/hoat-hinh`, dán link YouTube. Studio sẽ tự kiểm phim đó có
//     CHO PHÉP NHÚNG không (kênh tắt nhúng thì bé không xem được, phải bỏ).
//  2. Bấm ▶ nghe. Đến đầu câu bấm "Đặt ĐẦU", nói xong câu bấm "Đặt CUỐI", gõ
//     câu tiếng Anh + nghĩa tiếng Việt, bấm "Thêm câu". Lặp cho hết các câu
//     muốn dạy (10–20 câu là vừa một buổi của bé).
//  3. Bấm "Chép mã", dán đoạn vừa chép vào mảng `CARTOONS` dưới đây, rồi chạy
//     `npm run content:check cartoons`.
//
//  Phim mới luôn ra đời với `published: false` — bé CHƯA nhìn thấy. Tự xem thử
//  trọn một lượt ở `/hoat-hinh/<id>` rồi mới đổi thành `true`.
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
