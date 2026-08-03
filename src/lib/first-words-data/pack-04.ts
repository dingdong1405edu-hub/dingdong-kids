// Gói chủ đề KHÁM PHÁ THÊM số 04 cho cấp "Bé Tập Nói".
//
// Luật của cấp này (xem CLAUDE.md §6.1) — bé 3–5 tuổi CHƯA BIẾT CHỮ:
//  • Mỗi từ phải "vẽ được" bằng ĐÚNG MỘT emoji rõ nghĩa.
//  • Từ phải NGẮN (1–2 âm tiết) — máy nhận giọng trẻ em vốn đã kém.
//  • Không có từ trừu tượng mà emoji không diễn tả nổi.
//  • KHÔNG trùng từ với bất kỳ chủ đề nào khác (npm run content:check bắt lỗi này).
import type { FirstWordsUnit } from "./types";

// Chủ đề của gói này: THẾ GIỚI NGOÀI KIA — thứ bé nhìn thấy khi ra khỏi nhà.
// Cố ý không lấn sang chủ đề "outside" của chặng chính (sun/moon/star/tree/
// flower/rain/cloud/sea): ở đây là xe cộ, nơi chốn, cảnh vật, thời tiết, khu vườn.
export const UNITS: FirstWordsUnit[] = [
  {
    id: "vehicles",
    title: "Xe cộ",
    titleEn: "Vehicles",
    emoji: "🚌",
    cover: "from-blue-300 via-indigo-400 to-violet-400",
    words: [
      { word: "bus", vi: "xe buýt", emoji: "🚌" },
      { word: "train", vi: "tàu hoả", emoji: "🚂" },
      { word: "plane", vi: "máy bay", emoji: "✈️" },
      { word: "boat", vi: "chiếc thuyền", emoji: "⛵" },
      { word: "truck", vi: "xe tải", emoji: "🚚" },
      { word: "taxi", vi: "xe taxi", emoji: "🚕" },
      { word: "ship", vi: "tàu thuỷ", emoji: "🚢" },
      { word: "scooter", vi: "xe máy", emoji: "🛵" },
    ],
  },
  {
    id: "places",
    title: "Nơi chốn",
    titleEn: "Places",
    emoji: "🏫",
    cover: "from-fuchsia-300 via-purple-400 to-indigo-400",
    words: [
      { word: "shop", vi: "cửa hàng", emoji: "🏪" },
      { word: "park", vi: "công viên", emoji: "🛝" },
      { word: "zoo", vi: "sở thú", emoji: "🦁" },
      { word: "beach", vi: "bãi biển", emoji: "🏖️" },
      { word: "school", vi: "trường học", emoji: "🏫" },
      { word: "farm", vi: "nông trại", emoji: "🚜" },
      { word: "house", vi: "ngôi nhà", emoji: "🏠" },
      { word: "castle", vi: "lâu đài", emoji: "🏰" },
    ],
  },
  {
    id: "nature",
    title: "Thiên nhiên",
    titleEn: "Nature",
    emoji: "🌍",
    cover: "from-emerald-300 via-teal-400 to-cyan-400",
    words: [
      { word: "hill", vi: "ngọn đồi", emoji: "⛰️" },
      { word: "river", vi: "dòng sông", emoji: "🏞️" },
      { word: "rock", vi: "hòn đá", emoji: "🪨" },
      { word: "grass", vi: "bãi cỏ", emoji: "🌿" },
      { word: "leaf", vi: "chiếc lá", emoji: "🍁" },
      { word: "sand", vi: "cát", emoji: "🏜️" },
      { word: "wood", vi: "khúc gỗ", emoji: "🪵" },
      { word: "field", vi: "cánh đồng", emoji: "🌾" },
    ],
  },
  {
    id: "weather",
    title: "Thời tiết",
    titleEn: "Weather",
    emoji: "🌦️",
    cover: "from-cyan-300 via-sky-400 to-indigo-400",
    words: [
      { word: "hot", vi: "trời nóng", emoji: "🥵" },
      { word: "cold", vi: "trời lạnh", emoji: "🥶" },
      { word: "windy", vi: "trời gió", emoji: "🌬️" },
      { word: "sunny", vi: "trời nắng", emoji: "🌞" },
      { word: "cloudy", vi: "trời nhiều mây", emoji: "⛅" },
      { word: "snowy", vi: "trời có tuyết", emoji: "⛄" },
      { word: "storm", vi: "cơn bão", emoji: "⛈️" },
      { word: "rainbow", vi: "cầu vồng", emoji: "🌈" },
    ],
  },
  {
    id: "garden",
    title: "Khu vườn",
    titleEn: "In the garden",
    emoji: "🪴",
    cover: "from-yellow-300 via-lime-400 to-green-400",
    words: [
      { word: "seed", vi: "hạt giống", emoji: "🌱" },
      { word: "rose", vi: "hoa hồng", emoji: "🌹" },
      { word: "tulip", vi: "hoa tulip", emoji: "🌷" },
      { word: "sunflower", vi: "hoa hướng dương", emoji: "🌻" },
      { word: "bucket", vi: "cái xô", emoji: "🪣" },
      { word: "cactus", vi: "cây xương rồng", emoji: "🌵" },
      { word: "bug", vi: "con sâu", emoji: "🐛" },
      { word: "nest", vi: "tổ chim", emoji: "🪺" },
    ],
  },
];
