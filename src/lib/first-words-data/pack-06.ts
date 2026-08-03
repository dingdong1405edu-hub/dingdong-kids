// Gói chủ đề KHÁM PHÁ THÊM số 06 cho cấp "Bé Tập Nói".
//
// Luật của cấp này (xem CLAUDE.md §6.1) — bé 3–5 tuổi CHƯA BIẾT CHỮ:
//  • Mỗi từ phải "vẽ được" bằng ĐÚNG MỘT emoji rõ nghĩa.
//  • Từ phải NGẮN (1–2 âm tiết) — máy nhận giọng trẻ em vốn đã kém.
//  • Không có từ trừu tượng mà emoji không diễn tả nổi.
//  • KHÔNG trùng từ với bất kỳ chủ đề nào khác (npm run content:check bắt lỗi này).
import type { FirstWordsUnit } from "./types";

export const UNITS: FirstWordsUnit[] = [
  {
    id: "jobs",
    title: "Nghề nghiệp",
    titleEn: "Jobs",
    emoji: "🧑‍🚒",
    cover: "from-blue-300 via-cyan-400 to-teal-400",
    words: [
      { word: "doctor", vi: "bác sĩ", emoji: "👨‍⚕️" },
      { word: "nurse", vi: "y tá", emoji: "👩‍⚕️" },
      { word: "cook", vi: "đầu bếp", emoji: "👨‍🍳" },
      { word: "farmer", vi: "bác nông dân", emoji: "👨‍🌾" },
      { word: "pilot", vi: "phi công", emoji: "👨‍✈️" },
      { word: "police", vi: "chú cảnh sát", emoji: "👮" },
      { word: "singer", vi: "ca sĩ", emoji: "👩‍🎤" },
      { word: "painter", vi: "hoạ sĩ", emoji: "👨‍🎨" },
    ],
  },
  {
    id: "space",
    title: "Vũ trụ",
    titleEn: "In space",
    emoji: "🚀",
    cover: "from-indigo-400 via-violet-500 to-fuchsia-500",
    words: [
      { word: "rocket", vi: "tên lửa", emoji: "🚀" },
      { word: "planet", vi: "hành tinh", emoji: "🪐" },
      { word: "alien", vi: "người ngoài hành tinh", emoji: "👽" },
      { word: "comet", vi: "sao chổi", emoji: "☄️" },
      { word: "space", vi: "vũ trụ", emoji: "🌌" },
      { word: "ufo", vi: "đĩa bay", emoji: "🛸" },
      { word: "spaceman", vi: "phi hành gia", emoji: "🧑‍🚀" },
      { word: "earth", vi: "trái đất", emoji: "🌍" },
    ],
  },
  {
    id: "shapes",
    title: "Hình khối",
    titleEn: "Shapes",
    emoji: "🔷",
    cover: "from-emerald-300 via-teal-400 to-cyan-400",
    words: [
      { word: "circle", vi: "hình tròn", emoji: "⭕" },
      { word: "square", vi: "hình vuông", emoji: "🟦" },
      { word: "heart", vi: "hình trái tim", emoji: "❤️" },
      { word: "triangle", vi: "hình tam giác", emoji: "🔺" },
      { word: "oval", vi: "hình bầu dục", emoji: "🥚" },
      { word: "line", vi: "đường thẳng", emoji: "➖" },
      { word: "dot", vi: "chấm tròn", emoji: "⚫" },
      { word: "diamond", vi: "viên kim cương", emoji: "💎" },
    ],
  },
  {
    // Số 9 → 16, nối tiếp chủ đề "Số đếm" (1–8) ở chặng chính.
    // Emoji số chỉ có tới 🔟, nên từ 11 trở lên dùng mặt đồng hồ (11h, 12h) và
    // ảnh NHÓM đồ vật để bố mẹ cùng bé đếm — số thật nằm ở giọng đọc.
    id: "big-numbers",
    title: "Số lớn hơn",
    titleEn: "Bigger numbers",
    emoji: "🔢",
    cover: "from-amber-300 via-yellow-400 to-lime-400",
    words: [
      { word: "nine", vi: "số 9", emoji: "9️⃣" },
      { word: "ten", vi: "số 10", emoji: "🔟" },
      { word: "eleven", vi: "số 11", emoji: "🕚" },
      { word: "twelve", vi: "số 12", emoji: "🕛" },
      { word: "thirteen", vi: "số 13", emoji: "🎳" },
      { word: "fourteen", vi: "số 14", emoji: "🍇" },
      { word: "fifteen", vi: "số 15", emoji: "🍿" },
      { word: "sixteen", vi: "số 16", emoji: "🧮" },
    ],
  },
  {
    id: "party",
    title: "Tiệc sinh nhật",
    titleEn: "Birthday party",
    emoji: "🎉",
    cover: "from-fuchsia-300 via-pink-400 to-rose-400",
    words: [
      { word: "gift", vi: "món quà", emoji: "🎁" },
      { word: "ribbon", vi: "cái nơ", emoji: "🎀" },
      { word: "party", vi: "bữa tiệc", emoji: "🥳" },
      { word: "clown", vi: "chú hề", emoji: "🤡" },
      { word: "confetti", vi: "pháo giấy", emoji: "🎊" },
      { word: "card", vi: "tấm thiệp", emoji: "💌" },
      { word: "crown", vi: "vương miện", emoji: "👑" },
      { word: "cupcake", vi: "bánh nướng nhỏ", emoji: "🧁" },
    ],
  },
];
