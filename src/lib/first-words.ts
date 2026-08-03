// ===========================================================================
//  BÉ TẬP NÓI (First Words) — cấp ĐỨNG TRƯỚC Pre-Starters trên lộ trình.
//
//  Dành cho bé 3–5 tuổi CHƯA BIẾT CHỮ. Nguyên tắc thiết kế của cả cấp này:
//   • Bé KHÔNG phải đọc bất cứ chữ nào để học được. Kênh truyền đạt là HÌNH
//     (emoji cỡ lớn) + TIẾNG (audio tự phát). Chữ tiếng Anh mặc định ẨN, chỉ
//     bật lên khi bố mẹ muốn xem.
//   • Mỗi từ chỉ một vòng: nhìn hình → nghe cô đọc → bé nhắc lại → AI chấm.
//   • Từ phải "vẽ được" bằng đúng MỘT emoji rõ nghĩa. Từ trừu tượng (happy,
//     big, go…) không đưa vào đây vì bé chưa đọc được để hiểu chú thích.
//   • Từ phải NGẮN (1 âm tiết là chính) — nhận dạng giọng trẻ em vốn đã kém,
//     từ càng dài càng dễ bị máy nghe nhầm rồi chấm oan bé.
//
//  Nội dung CỐ ĐỊNH trong code (cùng khuôn @/lib/phonics-lessons); chỉ tiến độ
//  lưu DB qua model FirstWordsProgress. KHÔNG import @prisma/client ở đây —
//  file này chạy cả phía client.
// ===========================================================================

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
}

/** Mỗi từ tối đa 3 sao. */
export const STARS_PER_WORD = 3;

/** XP tối đa cho một chủ đề (đủ 3 sao mọi từ mới lấy trọn). */
export const XP_PER_UNIT = 20;

export const FIRST_WORDS_UNITS: FirstWordsUnit[] = [
  {
    id: "animals",
    title: "Con vật",
    titleEn: "Animals",
    emoji: "🐶",
    cover: "from-amber-300 via-orange-400 to-rose-400",
    words: [
      { word: "dog", vi: "con chó", emoji: "🐶" },
      { word: "cat", vi: "con mèo", emoji: "🐱" },
      { word: "bird", vi: "con chim", emoji: "🐦" },
      { word: "fish", vi: "con cá", emoji: "🐟" },
      { word: "duck", vi: "con vịt", emoji: "🦆" },
      { word: "pig", vi: "con lợn", emoji: "🐷" },
      { word: "cow", vi: "con bò", emoji: "🐄" },
      { word: "bear", vi: "con gấu", emoji: "🐻" },
    ],
  },
  {
    id: "food",
    title: "Đồ ăn",
    titleEn: "Food",
    emoji: "🍎",
    cover: "from-red-300 via-rose-400 to-orange-400",
    words: [
      { word: "apple", vi: "quả táo", emoji: "🍎" },
      { word: "banana", vi: "quả chuối", emoji: "🍌" },
      { word: "milk", vi: "sữa", emoji: "🥛" },
      { word: "egg", vi: "quả trứng", emoji: "🥚" },
      { word: "cake", vi: "bánh ngọt", emoji: "🍰" },
      { word: "bread", vi: "bánh mì", emoji: "🍞" },
      { word: "rice", vi: "cơm", emoji: "🍚" },
      { word: "water", vi: "nước", emoji: "💧" },
    ],
  },
  {
    id: "family",
    title: "Gia đình",
    titleEn: "Family",
    emoji: "👨‍👩‍👧",
    cover: "from-pink-300 via-fuchsia-400 to-purple-400",
    words: [
      { word: "mummy", vi: "mẹ", emoji: "👩" },
      { word: "daddy", vi: "bố", emoji: "👨" },
      { word: "baby", vi: "em bé", emoji: "👶" },
      { word: "sister", vi: "chị / em gái", emoji: "👧" },
      { word: "brother", vi: "anh / em trai", emoji: "👦" },
      { word: "grandma", vi: "bà", emoji: "👵" },
      { word: "grandpa", vi: "ông", emoji: "👴" },
      { word: "family", vi: "gia đình", emoji: "👨‍👩‍👧‍👦" },
    ],
  },
  {
    id: "colours",
    title: "Màu sắc",
    titleEn: "Colours",
    emoji: "🎨",
    cover: "from-sky-300 via-violet-400 to-fuchsia-400",
    words: [
      { word: "red", vi: "màu đỏ", emoji: "🔴" },
      { word: "blue", vi: "màu xanh dương", emoji: "🔵" },
      { word: "yellow", vi: "màu vàng", emoji: "🟡" },
      { word: "green", vi: "màu xanh lá", emoji: "🟢" },
      { word: "orange", vi: "màu cam", emoji: "🟠" },
      { word: "purple", vi: "màu tím", emoji: "🟣" },
      { word: "black", vi: "màu đen", emoji: "⚫" },
      { word: "white", vi: "màu trắng", emoji: "⚪" },
    ],
  },
  {
    id: "toys",
    title: "Đồ chơi",
    titleEn: "Toys",
    emoji: "🧸",
    cover: "from-teal-300 via-emerald-400 to-lime-400",
    words: [
      { word: "ball", vi: "quả bóng", emoji: "⚽" },
      { word: "doll", vi: "búp bê", emoji: "🪆" },
      { word: "car", vi: "ô tô", emoji: "🚗" },
      { word: "teddy", vi: "gấu bông", emoji: "🧸" },
      { word: "kite", vi: "cái diều", emoji: "🪁" },
      { word: "drum", vi: "cái trống", emoji: "🥁" },
      { word: "balloon", vi: "bóng bay", emoji: "🎈" },
      { word: "bike", vi: "xe đạp", emoji: "🚲" },
    ],
  },
  {
    id: "body",
    title: "Cơ thể",
    titleEn: "My body",
    emoji: "👋",
    cover: "from-rose-300 via-pink-400 to-red-400",
    words: [
      { word: "eye", vi: "con mắt", emoji: "👁️" },
      { word: "ear", vi: "cái tai", emoji: "👂" },
      { word: "nose", vi: "cái mũi", emoji: "👃" },
      { word: "mouth", vi: "cái miệng", emoji: "👄" },
      { word: "hand", vi: "bàn tay", emoji: "✋" },
      { word: "foot", vi: "bàn chân", emoji: "🦶" },
      { word: "hair", vi: "tóc", emoji: "💇" },
      { word: "tooth", vi: "cái răng", emoji: "🦷" },
    ],
  },
  {
    id: "numbers",
    title: "Số đếm",
    titleEn: "Numbers",
    emoji: "🔢",
    cover: "from-indigo-300 via-blue-400 to-sky-400",
    words: [
      { word: "one", vi: "số 1", emoji: "1️⃣" },
      { word: "two", vi: "số 2", emoji: "2️⃣" },
      { word: "three", vi: "số 3", emoji: "3️⃣" },
      { word: "four", vi: "số 4", emoji: "4️⃣" },
      { word: "five", vi: "số 5", emoji: "5️⃣" },
      { word: "six", vi: "số 6", emoji: "6️⃣" },
      { word: "seven", vi: "số 7", emoji: "7️⃣" },
      { word: "eight", vi: "số 8", emoji: "8️⃣" },
    ],
  },
  {
    id: "home",
    title: "Trong nhà",
    titleEn: "At home",
    emoji: "🏠",
    cover: "from-orange-300 via-amber-400 to-yellow-400",
    words: [
      { word: "bed", vi: "cái giường", emoji: "🛏️" },
      { word: "chair", vi: "cái ghế", emoji: "🪑" },
      { word: "door", vi: "cái cửa", emoji: "🚪" },
      { word: "window", vi: "cửa sổ", emoji: "🪟" },
      { word: "cup", vi: "cái cốc", emoji: "🥤" },
      { word: "spoon", vi: "cái thìa", emoji: "🥄" },
      { word: "book", vi: "quyển sách", emoji: "📚" },
      { word: "clock", vi: "đồng hồ", emoji: "🕐" },
    ],
  },
  {
    id: "clothes",
    title: "Quần áo",
    titleEn: "Clothes",
    emoji: "👕",
    cover: "from-cyan-300 via-sky-400 to-blue-400",
    words: [
      { word: "hat", vi: "cái mũ", emoji: "🧢" },
      { word: "shirt", vi: "cái áo", emoji: "👕" },
      { word: "shoes", vi: "đôi giày", emoji: "👟" },
      { word: "socks", vi: "đôi tất", emoji: "🧦" },
      { word: "dress", vi: "cái váy", emoji: "👗" },
      { word: "coat", vi: "áo khoác", emoji: "🧥" },
      { word: "bag", vi: "cái cặp", emoji: "🎒" },
      { word: "glasses", vi: "cái kính", emoji: "👓" },
    ],
  },
  {
    id: "outside",
    title: "Ngoài trời",
    titleEn: "Outside",
    emoji: "🌳",
    cover: "from-lime-300 via-green-400 to-emerald-400",
    words: [
      { word: "sun", vi: "mặt trời", emoji: "☀️" },
      { word: "moon", vi: "mặt trăng", emoji: "🌙" },
      { word: "star", vi: "ngôi sao", emoji: "⭐" },
      { word: "tree", vi: "cái cây", emoji: "🌳" },
      { word: "flower", vi: "bông hoa", emoji: "🌼" },
      { word: "rain", vi: "mưa", emoji: "🌧️" },
      { word: "cloud", vi: "đám mây", emoji: "☁️" },
      { word: "sea", vi: "biển", emoji: "🌊" },
    ],
  },
];

/** Tổng số từ toàn cấp — dùng cho thẻ giới thiệu ở trang lộ trình. */
export const TOTAL_FIRST_WORDS = FIRST_WORDS_UNITS.reduce((n, u) => n + u.words.length, 0);

export function getFirstWordsUnit(id: string): FirstWordsUnit | undefined {
  return FIRST_WORDS_UNITS.find((u) => u.id === id);
}

/** Chủ đề kế tiếp (null nếu đã là chủ đề cuối). */
export function nextFirstWordsUnit(id: string): FirstWordsUnit | null {
  const i = FIRST_WORDS_UNITS.findIndex((u) => u.id === id);
  return i >= 0 ? (FIRST_WORDS_UNITS[i + 1] ?? null) : null;
}

/** Số sao tối đa của một chủ đề. */
export function maxStarsOf(unit: FirstWordsUnit): number {
  return unit.words.length * STARS_PER_WORD;
}

/**
 * DANH SÁCH TRẮNG cho các endpoint sinh audio / chấm phát âm.
 *
 * Nội dung ở đây là tĩnh nên tập từ hợp lệ là HỮU HẠN và biết trước. Chặn ở
 * boundary theo danh sách này để không ai biến `/api/speak` thành cổng đọc văn
 * bản tuỳ ý — Deepgram Aura tính tiền theo ký tự.
 */
const WORD_SET: ReadonlySet<string> = new Set(
  FIRST_WORDS_UNITS.flatMap((u) => u.words.map((w) => w.word.toLowerCase())),
);

export function isFirstWord(text: string): boolean {
  return WORD_SET.has(text.trim().toLowerCase());
}

/** Nghĩa tiếng Việt của một từ (để prompt chấm bài có ngữ cảnh). Null nếu không có. */
export function firstWordMeaning(word: string): string | null {
  const key = word.trim().toLowerCase();
  for (const u of FIRST_WORDS_UNITS) {
    const hit = u.words.find((w) => w.word.toLowerCase() === key);
    if (hit) return hit.vi;
  }
  return null;
}

// ===== Nhận diện cấp trên lộ trình =====

/**
 * Cấp này KHÔNG nằm trong enum `EnglishLevel` của Prisma: nó không có Course,
 * không có 7 kỹ năng, không bán theo gói — chỉ là một khu riêng đứng trước
 * Pre-Starters. Gom hằng số hiển thị vào đây để trang lộ trình và bản đồ dùng
 * chung một nguồn.
 */
export const FIRST_WORDS_LEVEL = {
  slug: "tap-noi",
  href: "/roadmap/tap-noi",
  label: "Bé Tập Nói",
  labelEn: "First Words",
  sub: "Bé chưa biết chữ",
  age: "3–5 tuổi",
  emoji: "🧸",
  cardCover: "from-pink-300 via-fuchsia-400 to-violet-400",
  hero: "from-pink-500 via-fuchsia-500 to-violet-500",
  accentText: "text-fuchsia-600",
  accentBg: "bg-fuchsia-500",
} as const;
