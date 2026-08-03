// Gói chủ đề KHÁM PHÁ THÊM số 02 cho cấp "Bé Tập Nói".
//
// Luật của cấp này (xem CLAUDE.md §6.1) — bé 3–5 tuổi CHƯA BIẾT CHỮ:
//  • Mỗi từ phải "vẽ được" bằng ĐÚNG MỘT emoji rõ nghĩa.
//  • Từ phải NGẮN (1–2 âm tiết) — máy nhận giọng trẻ em vốn đã kém.
//  • Không có từ trừu tượng mà emoji không diễn tả nổi.
//  • KHÔNG trùng từ với bất kỳ chủ đề nào khác (npm run content:check bắt lỗi này).
import type { FirstWordsUnit } from "./types";

export const UNITS: FirstWordsUnit[] = [
  {
    id: "fruits",
    title: "Hoa quả",
    titleEn: "Fruits",
    emoji: "🍓",
    cover: "from-pink-300 via-rose-400 to-red-500",
    words: [
      { word: "pear", vi: "quả lê", emoji: "🍐" },
      { word: "peach", vi: "quả đào", emoji: "🍑" },
      { word: "mango", vi: "quả xoài", emoji: "🥭" },
      { word: "melon", vi: "quả dưa", emoji: "🍈" },
      { word: "cherry", vi: "quả anh đào", emoji: "🍒" },
      { word: "lemon", vi: "quả chanh", emoji: "🍋" },
      { word: "kiwi", vi: "quả kiwi", emoji: "🥝" },
      { word: "grapes", vi: "chùm nho", emoji: "🍇" },
    ],
  },
  {
    id: "vegetables",
    title: "Rau củ",
    titleEn: "Vegetables",
    emoji: "🥕",
    cover: "from-emerald-300 via-green-400 to-teal-500",
    words: [
      { word: "carrot", vi: "củ cà rốt", emoji: "🥕" },
      { word: "potato", vi: "củ khoai tây", emoji: "🥔" },
      { word: "tomato", vi: "quả cà chua", emoji: "🍅" },
      { word: "onion", vi: "củ hành", emoji: "🧅" },
      { word: "corn", vi: "bắp ngô", emoji: "🌽" },
      { word: "beans", vi: "hạt đậu", emoji: "🫘" },
      { word: "mushroom", vi: "cây nấm", emoji: "🍄" },
      { word: "pumpkin", vi: "quả bí ngô", emoji: "🎃" },
    ],
  },
  {
    id: "meals",
    title: "Món ăn",
    titleEn: "Meals",
    emoji: "🍕",
    cover: "from-yellow-300 via-amber-400 to-orange-500",
    words: [
      { word: "soup", vi: "bát súp", emoji: "🥣" },
      { word: "noodles", vi: "mì", emoji: "🍜" },
      { word: "pizza", vi: "bánh pizza", emoji: "🍕" },
      { word: "burger", vi: "bánh mì kẹp", emoji: "🍔" },
      { word: "salad", vi: "rau trộn", emoji: "🥗" },
      { word: "meat", vi: "miếng thịt", emoji: "🥩" },
      { word: "chips", vi: "khoai tây chiên", emoji: "🍟" },
      { word: "cheese", vi: "phô mai", emoji: "🧀" },
    ],
  },
  {
    id: "sweets",
    title: "Đồ ngọt",
    titleEn: "Sweets",
    emoji: "🍭",
    cover: "from-fuchsia-300 via-pink-400 to-purple-500",
    words: [
      { word: "sweets", vi: "kẹo", emoji: "🍬" },
      { word: "lollipop", vi: "kẹo mút", emoji: "🍭" },
      { word: "cookie", vi: "bánh quy", emoji: "🍪" },
      { word: "donut", vi: "bánh rán", emoji: "🍩" },
      { word: "ice cream", vi: "kem", emoji: "🍦" },
      { word: "chocolate", vi: "sô-cô-la", emoji: "🍫" },
      { word: "honey", vi: "mật ong", emoji: "🍯" },
      { word: "pudding", vi: "bánh flan", emoji: "🍮" },
    ],
  },
  {
    id: "drinks",
    title: "Đồ uống",
    titleEn: "Drinks",
    emoji: "🧃",
    cover: "from-cyan-300 via-teal-400 to-blue-500",
    words: [
      { word: "juice", vi: "nước ép", emoji: "🧃" },
      { word: "tea", vi: "trà", emoji: "🍵" },
      { word: "milkshake", vi: "sữa lắc", emoji: "🧋" },
      { word: "smoothie", vi: "sinh tố", emoji: "🍹" },
      { word: "coconut", vi: "quả dừa", emoji: "🥥" },
      { word: "soda", vi: "nước ngọt", emoji: "🥤" },
      { word: "cocoa", vi: "ca cao", emoji: "☕" },
      { word: "ice", vi: "đá lạnh", emoji: "🧊" },
    ],
  },
];
