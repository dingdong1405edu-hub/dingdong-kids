// ===========================================================================
//  DỮ LIỆU PHONICS — âm chữ cái, nguyên âm ghép, phụ âm ghép của tiếng Anh.
//  Nội dung CỐ ĐỊNH trong code (không nằm DB) giống cách bản tiếng Trung để dữ
//  liệu phiên âm trong code — chỉ tiến độ học viên mới lưu DB (PhonicsProgress).
//
//  `hint` luôn viết theo góc nhìn NGƯỜI VIỆT: nêu đúng lỗi mà trẻ Việt hay mắc
//  (nuốt phụ âm cuối, lẫn /θ/ với /t/, lẫn /ʃ/ với /s/, quên âm /r/ cuối…).
// ===========================================================================

export interface Sound {
  /** Chữ cái hoặc tổ hợp chữ, vd "s", "sh", "ai". */
  letter: string;
  /** Ký hiệu âm đọc, vd "/s/". */
  sound: string;
  /** Từ ví dụ chứa âm này. */
  word: string;
  /** Nghĩa tiếng Việt của từ ví dụ. */
  meaning: string;
  /** Emoji minh hoạ — trẻ chưa đọc được thì nhìn hình. */
  emoji: string;
  /** Mẹo phát âm viết cho người Việt. */
  hint: string;
}

/** Nhóm 1 — s a t p i n: 6 âm đầu tiên, ghép được rất nhiều từ (sat, pin, tap…). */
export const GROUP_SATPIN: Sound[] = [
  { letter: "s", sound: "/s/", word: "sun", meaning: "mặt trời", emoji: "☀️", hint: "Rít hơi qua kẽ răng như tiếng rắn. Giống “x” tiếng Việt nhưng dài hơi hơn." },
  { letter: "a", sound: "/æ/", word: "apple", meaning: "quả táo", emoji: "🍎", hint: "Mở miệng rộng, giữa “a” và “e” tiếng Việt. Đừng đọc thành “a” thuần." },
  { letter: "t", sound: "/t/", word: "tap", meaning: "vòi nước", emoji: "🚰", hint: "Đầu lưỡi chạm lợi trên rồi bật ra có hơi. Mạnh hơn “t” tiếng Việt." },
  { letter: "p", sound: "/p/", word: "pig", meaning: "con lợn", emoji: "🐷", hint: "Mím môi rồi bật hơi. Đưa tờ giấy trước miệng phải thấy giấy rung." },
  { letter: "i", sound: "/ɪ/", word: "ink", meaning: "mực", emoji: "🖋️", hint: "Ngắn và nhẹ, KHÔNG kéo dài thành “i” như tiếng Việt." },
  { letter: "n", sound: "/n/", word: "net", meaning: "cái lưới", emoji: "🥅", hint: "Đầu lưỡi chạm lợi trên, hơi thoát qua mũi." },
];

/** Nhóm 2 — m d g o c k. */
export const GROUP_MDGOCK: Sound[] = [
  { letter: "m", sound: "/m/", word: "moon", meaning: "mặt trăng", emoji: "🌙", hint: "Ngậm môi, ngân qua mũi. Giống “m” tiếng Việt." },
  { letter: "d", sound: "/d/", word: "dog", meaning: "con chó", emoji: "🐶", hint: "Giống “đ” tiếng Việt nhưng đầu lưỡi đặt cao hơn, sát lợi." },
  { letter: "g", sound: "/g/", word: "goat", meaning: "con dê", emoji: "🐐", hint: "Cuống lưỡi chạm ngạc mềm. Giống “g” trong “gà”." },
  { letter: "o", sound: "/ɒ/", word: "orange", meaning: "quả cam", emoji: "🍊", hint: "Tròn môi, ngắn. Giữa “o” và “a” tiếng Việt." },
  { letter: "c", sound: "/k/", word: "cat", meaning: "con mèo", emoji: "🐱", hint: "Bật hơi mạnh ở cuống họng. “c” và “k” đọc GIỐNG NHAU." },
  { letter: "k", sound: "/k/", word: "key", meaning: "chìa khoá", emoji: "🔑", hint: "Cùng âm với “c”. Thường đứng trước e, i, y." },
];

/** Nhóm 3 — e u r h b f l. */
export const GROUP_EURHBFL: Sound[] = [
  { letter: "e", sound: "/e/", word: "egg", meaning: "quả trứng", emoji: "🥚", hint: "Ngắn, gọn. Giống “e” trong “em” nhưng dứt khoát hơn." },
  { letter: "u", sound: "/ʌ/", word: "umbrella", meaning: "cái ô", emoji: "☂️", hint: "Giống “ơ” tiếng Việt, miệng thả lỏng." },
  { letter: "r", sound: "/r/", word: "rain", meaning: "mưa", emoji: "🌧️", hint: "Cong lưỡi lên nhưng KHÔNG chạm vào đâu cả. Đừng rung lưỡi như “r” tiếng Việt." },
  { letter: "h", sound: "/h/", word: "hat", meaning: "cái mũ", emoji: "🎩", hint: "Chỉ là hơi thở ra, không dùng cổ họng." },
  { letter: "b", sound: "/b/", word: "ball", meaning: "quả bóng", emoji: "⚽", hint: "Mím môi rồi bật ra, có rung dây thanh. Khác /p/ ở chỗ CÓ tiếng." },
  { letter: "f", sound: "/f/", word: "fish", meaning: "con cá", emoji: "🐟", hint: "Răng trên chạm môi dưới rồi thổi hơi. Tiếng Việt KHÔNG có âm này (khác “ph”)." },
  { letter: "l", sound: "/l/", word: "leaf", meaning: "chiếc lá", emoji: "🍃", hint: "Đầu lưỡi chạm lợi trên, hơi thoát hai bên lưỡi." },
];

/** Nhóm 4 — j v w x y z qu. */
export const GROUP_JVWXYZ: Sound[] = [
  { letter: "j", sound: "/dʒ/", word: "jam", meaning: "mứt", emoji: "🍓", hint: "Giống “ch” tiếng Việt nhưng CÓ rung dây thanh, tròn môi hơn." },
  { letter: "v", sound: "/v/", word: "van", meaning: "xe tải nhỏ", emoji: "🚐", hint: "Như /f/ nhưng có tiếng. Răng trên chạm môi dưới — KHÔNG đọc thành “d”." },
  { letter: "w", sound: "/w/", word: "water", meaning: "nước", emoji: "💧", hint: "Tròn môi thật nhỏ rồi mở ra. Giống “qu” trong “quà” bỏ phần “c”." },
  { letter: "x", sound: "/ks/", word: "box", meaning: "cái hộp", emoji: "📦", hint: "Hai âm dính liền: /k/ + /s/. Thường ở cuối từ." },
  { letter: "y", sound: "/j/", word: "yellow", meaning: "màu vàng", emoji: "💛", hint: "Giống “d” miền Nam trong “dạ”. Đầu từ là phụ âm, cuối từ lại là nguyên âm." },
  { letter: "z", sound: "/z/", word: "zoo", meaning: "sở thú", emoji: "🦓", hint: "Như /s/ nhưng có rung. Tiếng Việt không có — trẻ hay đọc nhầm thành /s/." },
  { letter: "qu", sound: "/kw/", word: "queen", meaning: "nữ hoàng", emoji: "👑", hint: "Luôn đi cùng nhau: /k/ + /w/. Giống “qu” tiếng Việt." },
];

/** Phụ âm ghép (consonant digraphs) — hai chữ, MỘT âm. */
export const DIGRAPHS: Sound[] = [
  { letter: "sh", sound: "/ʃ/", word: "ship", meaning: "con tàu", emoji: "🚢", hint: "Chu môi ra trước như bảo “suỵt”. Trẻ Việt hay đọc nhầm thành /s/." },
  { letter: "ch", sound: "/tʃ/", word: "chair", meaning: "cái ghế", emoji: "🪑", hint: "Giống “ch” tiếng Việt nhưng chu môi và bật mạnh hơn." },
  { letter: "th", sound: "/θ/", word: "three", meaning: "số ba", emoji: "3️⃣", hint: "ĐẶT LƯỠI GIỮA HAI HÀM RĂNG rồi thổi. Trẻ Việt hay đọc thành /t/ — sai." },
  { letter: "th", sound: "/ð/", word: "this", meaning: "cái này", emoji: "👉", hint: "Lưỡi giữa hai hàm răng, CÓ rung dây thanh. Đừng đọc thành /d/." },
  { letter: "ng", sound: "/ŋ/", word: "ring", meaning: "chiếc nhẫn", emoji: "💍", hint: "Giống “ng” cuối trong “sông”. Chỉ đứng cuối từ." },
  { letter: "ck", sound: "/k/", word: "duck", meaning: "con vịt", emoji: "🦆", hint: "Vẫn là âm /k/, chỉ khác cách viết. Đứng sau nguyên âm ngắn." },
  { letter: "wh", sound: "/w/", word: "whale", meaning: "cá voi", emoji: "🐋", hint: "Đọc như /w/ trong tiếng Anh–Mỹ hiện đại." },
  { letter: "ph", sound: "/f/", word: "phone", meaning: "điện thoại", emoji: "📱", hint: "Đọc y hệt /f/. Đừng nhầm với “ph” tiếng Việt (âm /f/ thì đúng, nhưng ph ≠ p+h)." },
];

/** Nguyên âm ghép (vowel digraphs) — hai chữ tạo một nguyên âm dài. */
export const VOWEL_TEAMS: Sound[] = [
  { letter: "ai", sound: "/eɪ/", word: "rain", meaning: "mưa", emoji: "🌧️", hint: "Trượt từ “ê” sang “i”. Hai âm dính liền thành một." },
  { letter: "ee", sound: "/iː/", word: "tree", meaning: "cái cây", emoji: "🌳", hint: "“i” kéo dài, cười miệng rộng." },
  { letter: "igh", sound: "/aɪ/", word: "night", meaning: "ban đêm", emoji: "🌃", hint: "Trượt từ “a” sang “i”. Chữ “gh” hoàn toàn câm." },
  { letter: "oa", sound: "/əʊ/", word: "boat", meaning: "con thuyền", emoji: "⛵", hint: "Trượt từ “ơ” sang “u”, môi tròn dần." },
  { letter: "oo", sound: "/uː/", word: "moon", meaning: "mặt trăng", emoji: "🌕", hint: "“u” dài, môi tròn nhỏ. (Trong “book” thì lại là /ʊ/ ngắn.)" },
  { letter: "ar", sound: "/ɑːr/", word: "star", meaning: "ngôi sao", emoji: "⭐", hint: "“a” dài rồi cong lưỡi. NHỚ phát âm chữ r ở cuối." },
  { letter: "or", sound: "/ɔːr/", word: "fork", meaning: "cái nĩa", emoji: "🍴", hint: "“o” dài tròn môi rồi cong lưỡi." },
  { letter: "ur", sound: "/ɜːr/", word: "bird", meaning: "con chim", emoji: "🐦", hint: "“ơ” dài, cong lưỡi. Giống “er” và “ir”." },
  { letter: "ow", sound: "/aʊ/", word: "cow", meaning: "con bò", emoji: "🐄", hint: "Trượt từ “a” sang “u”, giống “ao” tiếng Việt." },
  { letter: "oi", sound: "/ɔɪ/", word: "coin", meaning: "đồng xu", emoji: "🪙", hint: "Trượt từ “o” sang “i”, giống “oi” tiếng Việt." },
];

/** Từ CVC (phụ âm–nguyên âm–phụ âm) để luyện ghép vần. */
export interface CvcWord {
  word: string;
  parts: string[]; // ["c", "a", "t"]
  meaning: string;
  emoji: string;
}

export const CVC_WORDS: CvcWord[] = [
  { word: "cat", parts: ["c", "a", "t"], meaning: "con mèo", emoji: "🐱" },
  { word: "dog", parts: ["d", "o", "g"], meaning: "con chó", emoji: "🐶" },
  { word: "pig", parts: ["p", "i", "g"], meaning: "con lợn", emoji: "🐷" },
  { word: "sun", parts: ["s", "u", "n"], meaning: "mặt trời", emoji: "☀️" },
  { word: "hat", parts: ["h", "a", "t"], meaning: "cái mũ", emoji: "🎩" },
  { word: "bed", parts: ["b", "e", "d"], meaning: "cái giường", emoji: "🛏️" },
  { word: "cup", parts: ["c", "u", "p"], meaning: "cái cốc", emoji: "🥤" },
  { word: "bus", parts: ["b", "u", "s"], meaning: "xe buýt", emoji: "🚌" },
  { word: "fox", parts: ["f", "o", "x"], meaning: "con cáo", emoji: "🦊" },
  { word: "net", parts: ["n", "e", "t"], meaning: "cái lưới", emoji: "🥅" },
  { word: "map", parts: ["m", "a", "p"], meaning: "bản đồ", emoji: "🗺️" },
  { word: "box", parts: ["b", "o", "x"], meaning: "cái hộp", emoji: "📦" },
];

/** Các cặp từ cùng vần — dùng cho bài nối vần. */
export const RHYME_SETS: Array<{ rime: string; words: Array<{ word: string; emoji: string; meaning: string }> }> = [
  {
    rime: "at",
    words: [
      { word: "cat", emoji: "🐱", meaning: "con mèo" },
      { word: "hat", emoji: "🎩", meaning: "cái mũ" },
      { word: "bat", emoji: "🦇", meaning: "con dơi" },
    ],
  },
  {
    rime: "og",
    words: [
      { word: "dog", emoji: "🐶", meaning: "con chó" },
      { word: "frog", emoji: "🐸", meaning: "con ếch" },
      { word: "log", emoji: "🪵", meaning: "khúc gỗ" },
    ],
  },
  {
    rime: "un",
    words: [
      { word: "sun", emoji: "☀️", meaning: "mặt trời" },
      { word: "run", emoji: "🏃", meaning: "chạy" },
      { word: "bun", emoji: "🍞", meaning: "bánh mì tròn" },
    ],
  },
  {
    rime: "ar",
    words: [
      { word: "star", emoji: "⭐", meaning: "ngôi sao" },
      { word: "car", emoji: "🚗", meaning: "ô tô" },
      { word: "jar", emoji: "🫙", meaning: "cái lọ" },
    ],
  },
  {
    rime: "ee",
    words: [
      { word: "tree", emoji: "🌳", meaning: "cái cây" },
      { word: "bee", emoji: "🐝", meaning: "con ong" },
      { word: "three", emoji: "3️⃣", meaning: "số ba" },
    ],
  },
];

/**
 * Từ nhìn–nhận–ngay (sight words): những từ cực hay gặp nhưng KHÔNG đánh vần
 * theo quy tắc phonics được (the, said, was…). Trẻ phải học thuộc mặt chữ.
 * Danh sách theo mức độ phổ biến (Dolch pre-primer → primer).
 */
export const SIGHT_WORDS: Array<{ word: string; meaning: string }> = [
  { word: "the", meaning: "(mạo từ xác định)" },
  { word: "a", meaning: "một" },
  { word: "I", meaning: "tôi / tớ" },
  { word: "is", meaning: "thì, là (số ít)" },
  { word: "it", meaning: "nó" },
  { word: "in", meaning: "trong" },
  { word: "and", meaning: "và" },
  { word: "you", meaning: "bạn" },
  { word: "we", meaning: "chúng tôi" },
  { word: "my", meaning: "của tôi" },
  { word: "to", meaning: "đến, tới" },
  { word: "he", meaning: "anh ấy" },
  { word: "she", meaning: "cô ấy" },
  { word: "go", meaning: "đi" },
  { word: "see", meaning: "nhìn thấy" },
  { word: "like", meaning: "thích" },
  { word: "have", meaning: "có" },
  { word: "said", meaning: "đã nói" },
  { word: "was", meaning: "đã là" },
  { word: "are", meaning: "thì, là (số nhiều)" },
];

/** Toàn bộ âm đơn (26 chữ cái + qu) theo thứ tự dạy. */
export const ALL_LETTER_SOUNDS: Sound[] = [
  ...GROUP_SATPIN,
  ...GROUP_MDGOCK,
  ...GROUP_EURHBFL,
  ...GROUP_JVWXYZ,
];

/** Bảng tra cứu mọi âm (dùng cho trang bảng phonics). */
export const SOUND_GROUPS: Array<{ id: string; title: string; subtitle: string; sounds: Sound[] }> = [
  { id: "satpin", title: "Nhóm 1 · s a t p i n", subtitle: "6 âm đầu tiên — ghép được nhiều từ nhất", sounds: GROUP_SATPIN },
  { id: "mdgock", title: "Nhóm 2 · m d g o c k", subtitle: "Thêm 6 âm, bắt đầu đọc được từ dài hơn", sounds: GROUP_MDGOCK },
  { id: "eurhbfl", title: "Nhóm 3 · e u r h b f l", subtitle: "Đủ nguyên âm ngắn a e i o u", sounds: GROUP_EURHBFL },
  { id: "jvwxyz", title: "Nhóm 4 · j v w x y z qu", subtitle: "Hoàn thành 26 chữ cái", sounds: GROUP_JVWXYZ },
  { id: "digraphs", title: "Phụ âm ghép", subtitle: "sh ch th ng — hai chữ, một âm", sounds: DIGRAPHS },
  { id: "vowel-teams", title: "Nguyên âm ghép", subtitle: "ai ee oa oo ar or — nguyên âm dài", sounds: VOWEL_TEAMS },
];
