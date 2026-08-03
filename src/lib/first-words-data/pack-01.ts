// Gói chủ đề KHÁM PHÁ THÊM số 01 cho cấp "Bé Tập Nói".
//
// Luật của cấp này (xem CLAUDE.md §6.1) — bé 3–5 tuổi CHƯA BIẾT CHỮ:
//  • Mỗi từ phải "vẽ được" bằng ĐÚNG MỘT emoji rõ nghĩa.
//  • Từ phải NGẮN (1–2 âm tiết) — máy nhận giọng trẻ em vốn đã kém.
//  • Không có từ trừu tượng mà emoji không diễn tả nổi.
//  • KHÔNG trùng từ với bất kỳ chủ đề nào khác (npm run content:check bắt lỗi này).
import type { FirstWordsUnit } from "./types";

/**
 * Gói 01 — ĐỘNG VẬT mở rộng, nối tiếp chủ đề chính "Con vật".
 *
 * Chủ đề chính đã lấy hết những con quen nhất (chó, mèo, cá, vịt, lợn, bò, gấu,
 * chim) nên gói này đi theo NƠI SỐNG: trang trại → rừng → biển → vườn → bầu
 * trời. Cách chia đó cho bé một mạch nghĩa nhìn là hiểu, và cho mỗi chủ đề một
 * bảng màu riêng để bé nhớ bằng màu chứ không phải bằng chữ.
 */
export const UNITS: FirstWordsUnit[] = [
  {
    id: "farm-animals",
    title: "Con vật ở trang trại",
    titleEn: "Farm animals",
    emoji: "🐴",
    cover: "from-yellow-300 via-amber-400 to-lime-500",
    words: [
      { word: "horse", vi: "con ngựa", emoji: "🐴" },
      { word: "sheep", vi: "con cừu", emoji: "🐑" },
      { word: "goat", vi: "con dê", emoji: "🐐" },
      { word: "hen", vi: "con gà mái", emoji: "🐔" },
      { word: "rooster", vi: "con gà trống", emoji: "🐓" },
      { word: "mouse", vi: "con chuột", emoji: "🐭" },
      { word: "rabbit", vi: "con thỏ", emoji: "🐰" },
      { word: "donkey", vi: "con lừa", emoji: "🫏" },
    ],
  },
  {
    id: "wild-animals",
    title: "Thú rừng",
    titleEn: "Wild animals",
    emoji: "🦁",
    cover: "from-emerald-300 via-green-500 to-teal-600",
    words: [
      { word: "lion", vi: "con sư tử", emoji: "🦁" },
      { word: "tiger", vi: "con hổ", emoji: "🐯" },
      { word: "monkey", vi: "con khỉ", emoji: "🐵" },
      { word: "elephant", vi: "con voi", emoji: "🐘" },
      { word: "zebra", vi: "con ngựa vằn", emoji: "🦓" },
      { word: "giraffe", vi: "con hươu cao cổ", emoji: "🦒" },
      { word: "panda", vi: "con gấu trúc", emoji: "🐼" },
      { word: "fox", vi: "con cáo", emoji: "🦊" },
    ],
  },
  {
    id: "sea-animals",
    title: "Dưới biển",
    titleEn: "Sea animals",
    emoji: "🐬",
    cover: "from-teal-300 via-cyan-500 to-blue-600",
    words: [
      { word: "shark", vi: "con cá mập", emoji: "🦈" },
      { word: "whale", vi: "con cá voi", emoji: "🐳" },
      { word: "crab", vi: "con cua", emoji: "🦀" },
      { word: "turtle", vi: "con rùa", emoji: "🐢" },
      { word: "dolphin", vi: "con cá heo", emoji: "🐬" },
      { word: "octopus", vi: "con bạch tuộc", emoji: "🐙" },
      { word: "seal", vi: "con hải cẩu", emoji: "🦭" },
      { word: "shrimp", vi: "con tôm", emoji: "🦐" },
    ],
  },
  {
    id: "insects",
    title: "Côn trùng",
    titleEn: "Insects",
    emoji: "🐝",
    cover: "from-orange-300 via-rose-400 to-fuchsia-500",
    words: [
      { word: "bee", vi: "con ong", emoji: "🐝" },
      { word: "ant", vi: "con kiến", emoji: "🐜" },
      { word: "spider", vi: "con nhện", emoji: "🕷️" },
      { word: "butterfly", vi: "con bướm", emoji: "🦋" },
      { word: "snail", vi: "con ốc sên", emoji: "🐌" },
      { word: "ladybug", vi: "con bọ rùa", emoji: "🐞" },
      { word: "worm", vi: "con giun", emoji: "🪱" },
      { word: "fly", vi: "con ruồi", emoji: "🪰" },
    ],
  },
  {
    id: "birds",
    title: "Các loài chim",
    titleEn: "Birds",
    emoji: "🦜",
    cover: "from-sky-400 via-violet-500 to-indigo-600",
    words: [
      { word: "owl", vi: "con cú", emoji: "🦉" },
      { word: "eagle", vi: "con đại bàng", emoji: "🦅" },
      { word: "penguin", vi: "chim cánh cụt", emoji: "🐧" },
      { word: "parrot", vi: "con vẹt", emoji: "🦜" },
      { word: "swan", vi: "con thiên nga", emoji: "🦢" },
      { word: "peacock", vi: "con công", emoji: "🦚" },
      { word: "chick", vi: "gà con", emoji: "🐤" },
      { word: "goose", vi: "con ngỗng", emoji: "🪿" },
    ],
  },
];
