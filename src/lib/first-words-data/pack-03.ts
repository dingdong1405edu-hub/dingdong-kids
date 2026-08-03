// Gói chủ đề KHÁM PHÁ THÊM số 03 cho cấp "Bé Tập Nói".
//
// Luật của cấp này (xem CLAUDE.md §6.1) — bé 3–5 tuổi CHƯA BIẾT CHỮ:
//  • Mỗi từ phải "vẽ được" bằng ĐÚNG MỘT emoji rõ nghĩa.
//  • Từ phải NGẮN (1–2 âm tiết) — máy nhận giọng trẻ em vốn đã kém.
//  • Không có từ trừu tượng mà emoji không diễn tả nổi.
//  • KHÔNG trùng từ với bất kỳ chủ đề nào khác (npm run content:check bắt lỗi này).
import type { FirstWordsUnit } from "./types";

// ---------------------------------------------------------------------------
// Chủ đề của gói này: ĐỒ VẬT TRONG NHÀ, tách theo từng phòng.
//
// Vì emoji là kênh truyền nghĩa DUY NHẤT, một số đồ rất quen thuộc phải bỏ ra
// ngoài vì Unicode không có hình cho chúng: gối, chăn, khăn tắm, lược, thảm,
// ngăn kéo, rèm, cái bàn, hồ dán, cái bảng. Đưa vào thì bé chỉ thấy một ô trống
// hoặc một hình gần đúng — sai còn tệ hơn thiếu. Chỗ đó thay bằng đồ khác cùng
// phòng mà bé nhìn hình là đoán ra ngay.
// ---------------------------------------------------------------------------
export const UNITS: FirstWordsUnit[] = [
  {
    id: "kitchen",
    title: "Nhà bếp",
    titleEn: "Kitchen",
    emoji: "🍳",
    cover: "from-red-300 via-orange-400 to-amber-500",
    words: [
      { word: "pot", vi: "cái nồi", emoji: "🍲" },
      { word: "pan", vi: "cái chảo", emoji: "🍳" },
      { word: "bowl", vi: "cái bát", emoji: "🥣" },
      { word: "plate", vi: "cái đĩa", emoji: "🍽️" },
      { word: "fork", vi: "cái nĩa", emoji: "🍴" },
      { word: "knife", vi: "con dao", emoji: "🔪" },
      { word: "kettle", vi: "cái ấm đun nước", emoji: "🫖" },
      { word: "salt", vi: "muối", emoji: "🧂" },
    ],
  },
  {
    id: "bathroom",
    title: "Nhà tắm",
    titleEn: "Bathroom",
    emoji: "🛁",
    cover: "from-sky-300 via-cyan-400 to-teal-400",
    words: [
      { word: "soap", vi: "xà phòng", emoji: "🧼" },
      { word: "brush", vi: "bàn chải đánh răng", emoji: "🪥" },
      { word: "bath", vi: "bồn tắm", emoji: "🛁" },
      { word: "tap", vi: "vòi nước", emoji: "🚰" },
      { word: "shower", vi: "vòi hoa sen", emoji: "🚿" },
      { word: "mirror", vi: "cái gương", emoji: "🪞" },
      { word: "sponge", vi: "miếng bọt biển", emoji: "🧽" },
      { word: "toilet", vi: "bồn cầu", emoji: "🚽" },
    ],
  },
  {
    id: "bedroom",
    title: "Phòng ngủ",
    titleEn: "Bedroom",
    emoji: "😴",
    cover: "from-violet-300 via-purple-400 to-indigo-500",
    words: [
      { word: "lamp", vi: "cái đèn", emoji: "💡" },
      { word: "alarm", vi: "đồng hồ báo thức", emoji: "⏰" },
      { word: "torch", vi: "cái đèn pin", emoji: "🔦" },
      { word: "candle", vi: "cây nến", emoji: "🕯️" },
      { word: "story", vi: "quyển truyện", emoji: "📖" },
      { word: "basket", vi: "cái giỏ đựng đồ", emoji: "🧺" },
      { word: "puzzle", vi: "trò xếp hình", emoji: "🧩" },
      { word: "yawn", vi: "ngáp", emoji: "🥱" },
    ],
  },
  {
    id: "living-room",
    title: "Phòng khách",
    titleEn: "Living room",
    emoji: "🛋️",
    cover: "from-emerald-300 via-teal-400 to-cyan-500",
    words: [
      { word: "sofa", vi: "ghế sofa", emoji: "🛋️" },
      { word: "tv", vi: "cái ti vi", emoji: "📺" },
      { word: "radio", vi: "cái đài", emoji: "📻" },
      { word: "phone", vi: "điện thoại", emoji: "📱" },
      { word: "plant", vi: "cây cảnh", emoji: "🪴" },
      { word: "picture", vi: "bức tranh", emoji: "🖼️" },
      { word: "laptop", vi: "máy tính", emoji: "💻" },
      { word: "camera", vi: "máy ảnh", emoji: "📷" },
    ],
  },
  {
    id: "school-things",
    title: "Đồ dùng học tập",
    titleEn: "School things",
    emoji: "✏️",
    cover: "from-yellow-300 via-lime-400 to-green-400",
    words: [
      { word: "pen", vi: "cái bút mực", emoji: "🖊️" },
      { word: "pencil", vi: "bút chì", emoji: "✏️" },
      { word: "crayon", vi: "bút sáp màu", emoji: "🖍️" },
      { word: "paint", vi: "màu vẽ", emoji: "🎨" },
      { word: "ruler", vi: "cái thước", emoji: "📏" },
      { word: "paper", vi: "tờ giấy", emoji: "📄" },
      { word: "scissors", vi: "cái kéo", emoji: "✂️" },
      { word: "clip", vi: "cái kẹp giấy", emoji: "📎" },
    ],
  },
];
