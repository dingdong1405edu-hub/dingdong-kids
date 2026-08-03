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

/**
 * Cụm phụ âm ĐẦU (initial blends) — hai phụ âm đứng cạnh nhau, MỖI CHỮ VẪN GIỮ
 * âm của mình (khác hẳn phụ âm ghép sh/ch/th: hai chữ chỉ còn MỘT âm).
 *
 * Đây là chỗ trẻ Việt sai nhiều nhất: tiếng Việt không cho phép hai phụ âm đứng
 * liền nhau nên bé tự chèn một nguyên âm vào giữa — "blue" → "bơ-lu",
 * "stop" → "sờ-tốp". Mọi `hint` dưới đây đều nhắm thẳng vào lỗi đó.
 */
export const INITIAL_BLENDS: Sound[] = [
  { letter: "bl", sound: "/bl/", word: "blue", meaning: "màu xanh dương", emoji: "💙", hint: "Bật /b/ xong TRƯỢT NGAY sang /l/, không có “ơ” chen vào giữa. “blue” là “blu”, KHÔNG phải “bơ-lu”." },
  { letter: "cl", sound: "/kl/", word: "clock", meaning: "đồng hồ", emoji: "🕐", hint: "Cuống lưỡi bật /k/ trong khi đầu lưỡi đã sẵn sàng cho /l/. Đừng đọc thành “cơ-lốc”." },
  { letter: "fl", sound: "/fl/", word: "flag", meaning: "lá cờ", emoji: "🚩", hint: "MỘT hơi duy nhất: răng chạm môi thổi /f/ rồi dính luôn vào /l/, không nghỉ giữa chừng." },
  { letter: "gl", sound: "/gl/", word: "glass", meaning: "cái cốc", emoji: "🥛", hint: "/g/ rồi /l/ liền nhau. Đọc chậm rồi nhanh dần cũng được, miễn là KHÔNG thêm nguyên âm." },
  { letter: "pl", sound: "/pl/", word: "plant", meaning: "cái cây", emoji: "🪴", hint: "Mím môi bật /p/ rồi đưa lưỡi lên /l/ ngay. “plant” chứ không phải “pơ-lăn”." },
  { letter: "br", sound: "/br/", word: "bread", meaning: "bánh mì", emoji: "🍞", hint: "/r/ là CONG LƯỠI mà không chạm vào đâu cả. Đừng rung lưỡi, và đừng đọc thành “bơ-rét”." },
  { letter: "cr", sound: "/kr/", word: "crab", meaning: "con cua", emoji: "🦀", hint: "/k/ rồi cong lưỡi /r/, dính nhau nhanh như một cái búng tay." },
  { letter: "dr", sound: "/dr/", word: "drum", meaning: "cái trống", emoji: "🥁", hint: "Nghe hơi giống “tr” tiếng Việt nhưng CÓ rung dây thanh — và vẫn là HAI âm /d/ + /r/." },
  { letter: "fr", sound: "/fr/", word: "frog", meaning: "con ếch", emoji: "🐸", hint: "Thổi /f/ qua răng rồi cong lưỡi /r/. Không có nguyên âm nào ở giữa hai âm này." },
  { letter: "gr", sound: "/gr/", word: "grapes", meaning: "chùm nho", emoji: "🍇", hint: "/g/ + /r/. Môi tròn dần trong lúc lưỡi cong lên, đừng chen “ơ” vào." },
  { letter: "tr", sound: "/tr/", word: "train", meaning: "tàu hoả", emoji: "🚂", hint: "KHÔNG phải “tr” tiếng Việt (nghe gần như “ch”). Đây là HAI âm: /t/ bật hơi rồi cong lưỡi /r/." },
  { letter: "st", sound: "/st/", word: "star", meaning: "ngôi sao", emoji: "⭐", hint: "Rít /s/ rồi bật /t/ liền tay. “stop” là “stop”, KHÔNG phải “sờ-tốp”." },
  { letter: "sp", sound: "/sp/", word: "spoon", meaning: "cái thìa", emoji: "🥄", hint: "Giữ hơi rít /s/ rồi mím môi bật /p/ ra ngay. Một hơi, hai âm." },
  { letter: "sk", sound: "/sk/", word: "sky", meaning: "bầu trời", emoji: "🌤️", hint: "/s/ dính /k/, cùng kiểu với “st” và “sp”. Đừng đọc thành “sờ-cai”." },
];

/**
 * Cụm phụ âm CUỐI (final blends) — hai phụ âm khép lại cuối từ.
 *
 * Tiếng Việt chỉ có một phụ âm cuối và phát rất nhẹ, nên trẻ Việt nuốt gọn:
 * "hand" → "han", "jump" → "jăm". Mất phụ âm cuối là mất luôn nghĩa
 * ("tent" thành "ten"), vì vậy `hint` nào cũng nhắc bật cho hết đuôi từ.
 */
export const FINAL_BLENDS: Sound[] = [
  { letter: "-nd", sound: "/nd/", word: "hand", meaning: "bàn tay", emoji: "✋", hint: "Đọc /n/ xong phải BẬT THÊM /d/. Nuốt mất thành “han” là lỗi số một của trẻ Việt." },
  { letter: "-nt", sound: "/nt/", word: "tent", meaning: "cái lều", emoji: "⛺", hint: "Khép bằng /t/ bật hơi. “tent” (cái lều) khác “ten” (số 10) đúng ở chữ t cuối này." },
  { letter: "-st", sound: "/st/", word: "ghost", meaning: "con ma", emoji: "👻", hint: "Rít /s/ rồi bật /t/. Đừng dừng lại ở giữa chừng — phải nghe thấy cả hai âm." },
  { letter: "-mp", sound: "/mp/", word: "lamp", meaning: "cái đèn", emoji: "💡", hint: "Ngậm môi /m/ rồi bật /p/ bằng chính đôi môi đó. “jump” là “jump”, không phải “jăm”." },
  { letter: "-nk", sound: "/ŋk/", word: "drink", meaning: "đồ uống", emoji: "🥤", hint: "Âm “ng” trong cổ họng rồi bật /k/. Giống “ưng” + “c”, nhưng phải nghe rõ /k/ ở cuối." },
  { letter: "-lt", sound: "/lt/", word: "salt", meaning: "muối", emoji: "🧂", hint: "Đầu lưỡi chạm lợi cho /l/ rồi bật /t/ ngay tại chỗ đó, không rời lưỡi ra." },
  { letter: "-sk", sound: "/sk/", word: "mask", meaning: "khẩu trang", emoji: "😷", hint: "Rít /s/ rồi bật /k/ ở cuống họng. “mask” mà bỏ đuôi thì thành “mat” — sai nghĩa hẳn." },
  { letter: "-ft", sound: "/ft/", word: "gift", meaning: "món quà", emoji: "🎁", hint: "Thổi /f/ (răng chạm môi) rồi bật /t/. Hai âm rất nhẹ nhưng vẫn phải nghe thấy." },
  { letter: "-lf", sound: "/lf/", word: "wolf", meaning: "con sói", emoji: "🐺", hint: "/l/ rồi /f/. Kết thúc bằng hơi thổi qua răng, đừng bỏ lửng ở “wo”." },
];

/**
 * Magic E — nguyên âm dài kiểu a_e i_e o_e u_e.
 *
 * Luật: chữ "e" cuối KHÔNG được đọc, nhưng nó làm nguyên âm phía trước đọc đúng
 * TÊN chữ cái của mình (a → "ây", i → "ai"…). Trẻ Việt hay đọc luôn chữ e cuối
 * ("cake" → "ca-kê") nên mọi `hint` đều nói rõ chữ e đó là CÂM.
 */
export const MAGIC_E: Sound[] = [
  { letter: "a_e", sound: "/eɪ/", word: "cake", meaning: "bánh sinh nhật", emoji: "🎂", hint: "Chữ “e” cuối CÂM — tuyệt đối không đọc. Nó chỉ làm chữ “a” đọc đúng tên nó: “ây”. “cake” = “kêik”, KHÔNG phải “ca-kê”." },
  { letter: "i_e", sound: "/aɪ/", word: "bike", meaning: "xe đạp", emoji: "🚲", hint: "“i” đọc thành “ai”, chữ “e” cuối im lặng. “bike” = “baik”, không phải “bi-kê”." },
  { letter: "o_e", sound: "/əʊ/", word: "nose", meaning: "cái mũi", emoji: "👃", hint: "“o” đọc thành “âu”, “e” cuối im. Nhớ khép bằng /z/ có rung chứ không phải /s/." },
  { letter: "u_e", sound: "/juː/", word: "cute", meaning: "dễ thương", emoji: "🥰", hint: "“u” đọc thành “iu”, “e” cuối im. “cute” = “kiut”, không phải “cu-tê”." },
];

/**
 * Nguyên âm có R (r-controlled) — chữ r đứng ngay sau nguyên âm và "nhuộm" luôn
 * nguyên âm đó. er · ir · ur viết khác nhau nhưng đọc GIỐNG HỆT nhau.
 *
 * Tiếng Việt không có /r/ ở cuối vần nên trẻ bỏ mất: "car" thành "ca",
 * "bird" thành "bơt". Mọi `hint` đều nhắc CONG LƯỠI và giữ tới hết từ.
 */
export const R_CONTROLLED: Sound[] = [
  { letter: "ar", sound: "/ɑːr/", word: "car", meaning: "ô tô", emoji: "🚗", hint: "“a” dài rồi CONG LƯỠI. Tiếng Việt không có /r/ cuối nên bé hay bỏ mất — “car” thành “ca” là người nghe không hiểu." },
  { letter: "or", sound: "/ɔːr/", word: "horse", meaning: "con ngựa", emoji: "🐴", hint: "Tròn môi “o” dài rồi cong lưỡi. Giữ lưỡi cong đến hết từ, đừng thả ra sớm." },
  { letter: "er", sound: "/ɜːr/", word: "her", meaning: "cô ấy", emoji: "👩", hint: "“ơ” dài cộng cong lưỡi. er · ir · ur viết KHÁC nhau nhưng đọc GIỐNG HỆT nhau." },
  { letter: "ir", sound: "/ɜːr/", word: "bird", meaning: "con chim", emoji: "🐦", hint: "Giống hệt “er” và “ur”. Nhớ cả /r/ giữa từ lẫn /d/ cuối từ: “bird”, không phải “bơt”." },
  { letter: "ur", sound: "/ɜːr/", word: "nurse", meaning: "y tá", emoji: "👩‍⚕️", hint: "Vẫn là “ơ” dài cong lưỡi. Ba cách viết — một âm duy nhất, học một lần dùng được cả ba." },
];

/** Từ có hình — đơn vị nhỏ nhất mà thẻ nào cũng cần: mặt chữ + nghĩa + hình. */
export interface PicWord {
  word: string;
  meaning: string;
  /** Emoji minh hoạ — trẻ chưa đọc được thì nhìn hình mà hiểu. */
  emoji: string;
}

/** Từ CVC (phụ âm–nguyên âm–phụ âm) để luyện ghép vần. */
export interface CvcWord extends PicWord {
  parts: string[]; // ["c", "a", "t"]
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

/**
 * Từ mở đầu bằng CỤM phụ âm. Cả cụm là MỘT mảnh khi ghép ("fl" + "a" + "g") —
 * tách rời thành f-l-a-g là dạy sai, vì đúng chỗ tách ra ấy trẻ Việt sẽ chèn
 * nguyên âm vào.
 */
export const BLEND_WORDS: CvcWord[] = [
  { word: "flag", parts: ["fl", "a", "g"], meaning: "lá cờ", emoji: "🚩" },
  { word: "stop", parts: ["st", "o", "p"], meaning: "dừng lại", emoji: "🛑" },
  { word: "frog", parts: ["fr", "o", "g"], meaning: "con ếch", emoji: "🐸" },
  { word: "drum", parts: ["dr", "u", "m"], meaning: "cái trống", emoji: "🥁" },
  { word: "clock", parts: ["cl", "o", "ck"], meaning: "đồng hồ", emoji: "🕐" },
  { word: "crab", parts: ["cr", "a", "b"], meaning: "con cua", emoji: "🦀" },
  { word: "glass", parts: ["gl", "a", "ss"], meaning: "cái cốc", emoji: "🥛" },
  { word: "spoon", parts: ["sp", "oo", "n"], meaning: "cái thìa", emoji: "🥄" },
];

/** Từ KẾT bằng cụm phụ âm — cả cụm cuối là một mảnh ("h" + "a" + "nd"). */
export const FINAL_BLEND_WORDS: CvcWord[] = [
  { word: "hand", parts: ["h", "a", "nd"], meaning: "bàn tay", emoji: "✋" },
  { word: "tent", parts: ["t", "e", "nt"], meaning: "cái lều", emoji: "⛺" },
  { word: "jump", parts: ["j", "u", "mp"], meaning: "nhảy lên", emoji: "🦘" },
  { word: "gift", parts: ["g", "i", "ft"], meaning: "món quà", emoji: "🎁" },
  { word: "mask", parts: ["m", "a", "sk"], meaning: "khẩu trang", emoji: "😷" },
  { word: "pink", parts: ["p", "i", "nk"], meaning: "màu hồng", emoji: "🌸" },
  { word: "salt", parts: ["s", "a", "lt"], meaning: "muối", emoji: "🧂" },
];

/** Từ có nguyên âm R — nguyên âm và chữ r đi liền thành MỘT mảnh ("c" + "ar"). */
export const R_WORDS: CvcWord[] = [
  { word: "car", parts: ["c", "ar"], meaning: "ô tô", emoji: "🚗" },
  { word: "corn", parts: ["c", "or", "n"], meaning: "bắp ngô", emoji: "🌽" },
  { word: "bird", parts: ["b", "ir", "d"], meaning: "con chim", emoji: "🐦" },
  { word: "shirt", parts: ["sh", "ir", "t"], meaning: "cái áo", emoji: "👕" },
];

/**
 * Cặp tối thiểu — hai từ chỉ khác nhau ĐÚNG MỘT chỗ. Dùng cho thẻ "phân biệt":
 * máy đọc một trong hai, bé chỉ ra vừa nghe từ nào.
 */
export interface MinimalPair {
  a: Sound;
  b: Sound;
  /** Hai âm khác nhau ở ĐÂU — thẻ so sánh không có lời giải thích thì vô nghĩa. */
  note: string;
}

/** Magic E: bỏ/thêm đúng một chữ "e" câm là đổi hẳn nguyên âm. */
export const MAGIC_E_PAIRS: MinimalPair[] = [
  {
    a: { letter: "a", sound: "/æ/", word: "cap", meaning: "mũ lưỡi trai", emoji: "🧢", hint: "Nguyên âm NGẮN, dứt khoát, miệng mở rộng." },
    b: { letter: "a_e", sound: "/eɪ/", word: "cape", meaning: "áo choàng", emoji: "🦸", hint: "Thêm “e” câm là “a” dài ra thành “ây”." },
    note: "Hai từ chỉ khác đúng một chữ “e” câm ở cuối: “cap” nguyên âm NGẮN, “cape” nguyên âm DÀI. Chữ “e” đó không bao giờ được đọc thành “ê”.",
  },
  {
    a: { letter: "i", sound: "/ɪ/", word: "kit", meaning: "bộ đồ nghề", emoji: "🧰", hint: "“i” ngắn và nhẹ, không kéo dài." },
    b: { letter: "i_e", sound: "/aɪ/", word: "kite", meaning: "cái diều", emoji: "🪁", hint: "Có “e” câm thì “i” đọc thành “ai”." },
    note: "“kit” đọc ngắn, “kite” đọc “kait”. Chữ “e” cuối im lặng, chỉ làm nhiệm vụ kéo dài chữ “i” phía trước.",
  },
  {
    a: { letter: "o", sound: "/ɒ/", word: "not", meaning: "không", emoji: "❌", hint: "“o” ngắn, tròn môi vừa phải." },
    b: { letter: "o_e", sound: "/əʊ/", word: "note", meaning: "mẩu giấy ghi", emoji: "📝", hint: "Có “e” câm thì “o” đọc thành “âu”." },
    note: "“not” và “note” viết gần y hệt nhưng nghĩa khác hẳn. Nghe kỹ nguyên âm: ngắn là “not”, dài là “note”.",
  },
  {
    a: { letter: "u", sound: "/ʌ/", word: "cut", meaning: "cắt", emoji: "✂️", hint: "“u” đọc như “ơ”, miệng thả lỏng." },
    b: { letter: "u_e", sound: "/juː/", word: "cute", meaning: "dễ thương", emoji: "🥰", hint: "Có “e” câm thì “u” đọc thành “iu”." },
    note: "“cut” là “kăt”, “cute” là “kiut”. Chữ “e” cuối vẫn CÂM — đọc thành “cu-tê” là sai.",
  },
];

/** Nguyên âm có R: bỏ mất /r/ là ra một từ khác hẳn. */
export const R_PAIRS: MinimalPair[] = [
  {
    a: { letter: "at", sound: "/æt/", word: "cat", meaning: "con mèo", emoji: "🐱", hint: "Nguyên âm ngắn, khép bằng /t/." },
    b: { letter: "ar", sound: "/ɑːr/", word: "car", meaning: "ô tô", emoji: "🚗", hint: "“a” dài rồi cong lưỡi cho /r/." },
    note: "Bỏ mất tiếng /r/ ở cuối thì “car” nghe thành “ca” — người nghe sẽ tưởng bé nói “cat”. Phải cong lưỡi tới hết từ.",
  },
  {
    a: { letter: "ed", sound: "/ed/", word: "bed", meaning: "cái giường", emoji: "🛏️", hint: "“e” ngắn, gọn, không cong lưỡi." },
    b: { letter: "ir", sound: "/ɜːrd/", word: "bird", meaning: "con chim", emoji: "🐦", hint: "“ơ” DÀI cộng cong lưỡi rồi mới đóng /d/." },
    note: "“bed” là “e” ngắn; “bird” là “ơ” dài có cong lưỡi. Hai từ này trẻ Việt rất hay đọc giống nhau.",
  },
  {
    a: { letter: "ou", sound: "/aʊs/", word: "house", meaning: "ngôi nhà", emoji: "🏠", hint: "Trượt từ “a” sang “u”, không có /r/." },
    b: { letter: "or", sound: "/ɔːrs/", word: "horse", meaning: "con ngựa", emoji: "🐴", hint: "Tròn môi “o” dài rồi cong lưỡi." },
    note: "“house” không có âm /r/, “horse” thì có. Nghe xem lưỡi có cong lên ở giữa từ hay không.",
  },
];

/** Sight words: những cái bẫy khiến bé đánh vần ra một từ khác. */
export const SIGHT_WORD_PAIRS: MinimalPair[] = [
  {
    a: { letter: "said", sound: "/sed/", word: "said", meaning: "đã nói", emoji: "💬", hint: "Viết “ai” nhưng đọc vần với “bed”." },
    b: { letter: "say", sound: "/seɪ/", word: "say", meaning: "nói", emoji: "🗣️", hint: "“ay” đọc là “ây”, đúng luật." },
    note: "Cùng một gốc nhưng “said” đọc là /sed/ — vần với “bed”, KHÔNG phải “sây-đờ”. Đây là từ phải nhớ nguyên mặt chữ.",
  },
  {
    a: { letter: "one", sound: "/wʌn/", word: "one", meaning: "số một", emoji: "☝️", hint: "Tự nhiên mọc ra âm /w/ ở đầu." },
    b: { letter: "on", sound: "/ɒn/", word: "on", meaning: "ở trên", emoji: "🔛", hint: "Đọc đúng như đánh vần." },
    note: "“one” bắt đầu bằng âm /w/ dù chẳng có chữ w nào — nghe như “oăn”. Còn “on” thì đọc đúng như viết.",
  },
  {
    a: { letter: "come", sound: "/kʌm/", word: "come", meaning: "đến, lại đây", emoji: "🤗", hint: "Có “e” câm nhưng nguyên âm vẫn NGẮN." },
    b: { letter: "home", sound: "/həʊm/", word: "home", meaning: "ngôi nhà", emoji: "🏠", hint: "Đúng luật Magic E: “o” đọc thành “âu”." },
    note: "Cùng đuôi “-ome” nhưng đọc khác hẳn: “home” theo luật Magic E, còn “come” thì phá luật nên phải học thuộc.",
  },
];

/**
 * Bài chọn MẶT CHỮ: bé nghe một từ rồi chỉ ra từ nào trong số các từ trông na ná
 * nhau. Các lựa chọn `others` đều là TỪ THẬT — không bao giờ đưa từ bịa cho trẻ
 * chưa đọc thạo nhìn.
 */
export interface SpellingChoice {
  heard: PicWord;
  others: string[];
}

/** Nghe rồi chọn: có "e" câm hay không? */
export const MAGIC_E_SPELLING: SpellingChoice[] = [
  { heard: { word: "kite", meaning: "cái diều", emoji: "🪁" }, others: ["kit", "kick"] },
  { heard: { word: "cap", meaning: "mũ lưỡi trai", emoji: "🧢" }, others: ["cape", "cup"] },
  { heard: { word: "note", meaning: "mẩu giấy ghi", emoji: "📝" }, others: ["not", "nut"] },
  { heard: { word: "pine", meaning: "cây thông", emoji: "🌲" }, others: ["pin", "pen"] },
];

/**
 * Nghe rồi chọn đúng sight word. `word` phải có trong SIGHT_WORDS (bộ dựng tra
 * theo mặt chữ nên gõ sai là hỏng ngay lúc build, không lọt ra tới bài học).
 */
export const SIGHT_WORD_SPELLING: Array<{ word: string; others: string[] }> = [
  { word: "the", others: ["they", "then"] },
  { word: "said", others: ["say", "sad"] },
  { word: "come", others: ["some", "home"] },
  { word: "one", others: ["on", "own"] },
  { word: "what", others: ["want", "watch"] },
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
  // ── Vần cho các nhóm âm nâng cao. CHỈ ĐƯỢC THÊM VÀO CUỐI: bộ dựng thẻ nối vần
  //    trỏ theo CHỈ SỐ, chèn vào giữa là mọi bài cũ đổi hết nội dung.
  {
    rime: "ock",
    words: [
      { word: "clock", emoji: "🕐", meaning: "đồng hồ" },
      { word: "sock", emoji: "🧦", meaning: "chiếc tất" },
      { word: "rock", emoji: "🪨", meaning: "hòn đá" },
    ],
  },
  {
    rime: "and",
    words: [
      { word: "hand", emoji: "✋", meaning: "bàn tay" },
      { word: "sand", emoji: "🏖️", meaning: "cát" },
      { word: "band", emoji: "🎸", meaning: "ban nhạc" },
    ],
  },
  {
    rime: "ake",
    words: [
      { word: "cake", emoji: "🎂", meaning: "bánh sinh nhật" },
      { word: "snake", emoji: "🐍", meaning: "con rắn" },
      { word: "lake", emoji: "🏞️", meaning: "cái hồ" },
    ],
  },
  {
    rime: "ird",
    words: [
      { word: "bird", emoji: "🐦", meaning: "con chim" },
      { word: "third", emoji: "3️⃣", meaning: "thứ ba" },
      { word: "word", emoji: "💬", meaning: "từ, chữ" },
    ],
  },
];

/**
 * Từ nhìn–nhận–ngay (sight words): những từ cực hay gặp nhưng đánh vần theo luật
 * phonics thì ra SAI (the, said, was, one…). Trẻ phải nhớ nguyên mặt chữ.
 * Danh sách theo mức độ phổ biến (Dolch pre-primer → primer) rồi tới nhóm phá
 * luật nặng nhất.
 *
 * Dùng chung kiểu `Sound` với các nhóm âm khác để bảng tra cứu hiển thị được và
 * bộ dựng thẻ tái sử dụng được: ở đây `letter` chính là CẢ TỪ, vì đơn vị bé phải
 * nhớ là nguyên mặt chữ chứ không phải từng âm rời.
 */
export const SIGHT_WORDS: Sound[] = [
  { letter: "the", sound: "/ðə/", word: "the", meaning: "(đứng trước danh từ) cái đó, con đó", emoji: "👉", hint: "Đặt lưỡi GIỮA HAI HÀM RĂNG rồi mới ra tiếng. Đánh vần “t-h-e” ra “thi” là sai — nhớ nguyên mặt chữ." },
  { letter: "a", sound: "/ə/", word: "a", meaning: "một (cái, con)", emoji: "1️⃣", hint: "Đứng trước danh từ thì đọc nhẹ tênh như “ơ”, KHÔNG đọc thành “ây”." },
  { letter: "I", sound: "/aɪ/", word: "I", meaning: "tôi, tớ", emoji: "🙋", hint: "Luôn VIẾT HOA dù nằm giữa câu. Đọc là “ai”." },
  { letter: "is", sound: "/ɪz/", word: "is", meaning: "thì, là (số ít)", emoji: "✅", hint: "Chữ “s” ở đây đọc thành /z/ CÓ rung dây thanh, không phải /s/." },
  { letter: "it", sound: "/ɪt/", word: "it", meaning: "nó (đồ vật, con vật)", emoji: "🧸", hint: "Ngắn và gọn, nhưng vẫn phải bật /t/ ở cuối." },
  { letter: "in", sound: "/ɪn/", word: "in", meaning: "ở trong", emoji: "📥", hint: "Đưa lưỡi lên lợi cho /n/ ngân qua mũi, đừng bỏ lửng." },
  { letter: "and", sound: "/ænd/", word: "and", meaning: "và", emoji: "➕", hint: "Nói nhanh nghe như “ợn”, nhưng đọc chậm thì phải có đủ cả /n/ lẫn /d/." },
  { letter: "you", sound: "/juː/", word: "you", meaning: "bạn, các bạn", emoji: "🧒", hint: "Mở đầu bằng /j/ (giống “d” miền Nam) rồi tới “u” dài." },
  { letter: "we", sound: "/wiː/", word: "we", meaning: "chúng tớ", emoji: "👫", hint: "Tròn môi cho /w/ rồi kéo dài “i”." },
  { letter: "my", sound: "/maɪ/", word: "my", meaning: "của tớ", emoji: "🎒", hint: "Chữ “y” cuối đóng vai nguyên âm, đọc là “ai”." },
  { letter: "to", sound: "/tuː/", word: "to", meaning: "đến, tới", emoji: "➡️", hint: "Chỉ có một chữ “o” nhưng lại đọc là “u” dài." },
  { letter: "he", sound: "/hiː/", word: "he", meaning: "bạn ấy (nam)", emoji: "👦", hint: "Chỉ thở nhẹ ra cho /h/ rồi “i” dài — đừng dùng cổ họng." },
  { letter: "she", sound: "/ʃiː/", word: "she", meaning: "bạn ấy (nữ)", emoji: "👧", hint: "CHU MÔI cho /ʃ/. Đọc thành “si” là lỗi trẻ Việt hay mắc nhất ở từ này." },
  { letter: "go", sound: "/ɡəʊ/", word: "go", meaning: "đi", emoji: "🏃", hint: "Chữ “o” cuối đọc là “âu”, không phải “o”." },
  { letter: "see", sound: "/siː/", word: "see", meaning: "nhìn thấy", emoji: "👀", hint: "“ee” là “i” dài — cười miệng rộng và giữ lâu một chút." },
  { letter: "like", sound: "/laɪk/", word: "like", meaning: "thích", emoji: "❤️", hint: "Có “e” câm cuối nên “i” đọc thành “ai”; chữ e đó im lặng." },
  { letter: "have", sound: "/hæv/", word: "have", meaning: "có", emoji: "🤲", hint: "Có “e” câm nhưng KHÔNG làm “a” dài ra — “have” vẫn đọc ngắn. Từ này phá luật Magic E." },
  { letter: "said", sound: "/sed/", word: "said", meaning: "đã nói", emoji: "💬", hint: "Viết s-a-i-d nhưng đọc vần với “bed”. Không có “ai” nào ở đây cả." },
  { letter: "was", sound: "/wɒz/", word: "was", meaning: "đã là", emoji: "⏪", hint: "Chữ “a” đọc thành “o”, chữ “s” đọc thành /z/ — hai lần phá luật trong một từ ngắn." },
  { letter: "are", sound: "/ɑːr/", word: "are", meaning: "thì, là (số nhiều)", emoji: "👥", hint: "Đọc y hệt tên chữ “r”: “a” dài rồi cong lưỡi. Chữ “e” cuối câm." },
  { letter: "come", sound: "/kʌm/", word: "come", meaning: "đến, lại đây", emoji: "🤗", hint: "Có “e” câm nhưng KHÔNG theo luật Magic E: đọc ngắn “kăm”, không phải “côm”." },
  { letter: "one", sound: "/wʌn/", word: "one", meaning: "số một", emoji: "☝️", hint: "Tự nhiên mọc ra âm /w/ ở đầu dù chẳng có chữ w nào. Nghe như “oăn”." },
  { letter: "two", sound: "/tuː/", word: "two", meaning: "số hai", emoji: "✌️", hint: "Chữ “w” hoàn toàn CÂM. Đọc y hệt “to” và “too”." },
  { letter: "some", sound: "/sʌm/", word: "some", meaning: "một vài", emoji: "🍪", hint: "Cùng kiểu với “come”: có “e” câm mà nguyên âm vẫn NGẮN." },
  { letter: "what", sound: "/wɒt/", word: "what", meaning: "cái gì", emoji: "❓", hint: "“wh” đọc thành /w/, chữ h câm. Nhớ bật /t/ ở cuối." },
  { letter: "where", sound: "/weər/", word: "where", meaning: "ở đâu", emoji: "📍", hint: "“wh” là /w/, đuôi “-ere” phải cong lưỡi. Đừng bỏ mất /r/." },
  { letter: "who", sound: "/huː/", word: "who", meaning: "ai", emoji: "🕵️", hint: "Ở từ này “wh” lại đọc thành /h/ — chữ w câm, ngược hẳn với “what”." },
  { letter: "love", sound: "/lʌv/", word: "love", meaning: "yêu, thương", emoji: "💖", hint: "“o” đọc thành “ơ”, “e” cuối câm, khép lại bằng /v/ có rung." },
  { letter: "put", sound: "/pʊt/", word: "put", meaning: "đặt, để", emoji: "📦", hint: "“u” ở đây đọc như trong “book”, KHÔNG giống “u” trong “cut”." },
  { letter: "of", sound: "/ɒv/", word: "of", meaning: "của", emoji: "🧩", hint: "Chữ “f” đọc thành /v/ có rung. Gần như chỉ mỗi từ này làm thế." },
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
  { id: "initial-blends", title: "Cụm phụ âm đầu", subtitle: "bl cl st tr — hai phụ âm dính liền, KHÔNG chèn “ơ” vào giữa", sounds: INITIAL_BLENDS },
  { id: "final-blends", title: "Cụm phụ âm cuối", subtitle: "-nd -nt -mp -nk — đừng nuốt mất đuôi từ", sounds: FINAL_BLENDS },
  { id: "magic-e", title: "Magic E · nguyên âm dài", subtitle: "cake bike nose cute — chữ “e” cuối CÂM mà vẫn có phép", sounds: MAGIC_E },
  { id: "r-controlled", title: "Nguyên âm có R", subtitle: "ar or er ir ur — cong lưỡi, đừng bỏ mất /r/", sounds: R_CONTROLLED },
  { id: "sight-words", title: "Từ nhìn là đọc", subtitle: "the said was one two — ghép vần không ra, phải nhớ mặt chữ", sounds: SIGHT_WORDS },
];
