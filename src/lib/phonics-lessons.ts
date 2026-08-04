// Bài học PHONICS kiểu flashcard (Duolingo-style). Mỗi bài là một chuỗi thẻ:
//  - "teach"       : giới thiệu một âm (xem + nghe), KHÔNG tính điểm.
//  - "listen"      : nghe một từ rồi chọn chữ/âm đúng (tính điểm).
//  - "blend"       : nhìn từng chữ c–a–t rồi chọn từ ghép được (tính điểm).
//  - "rhyme"       : chọn từ cùng vần (tính điểm).
//  - "discriminate": nghe một trong hai âm dễ lẫn rồi chọn đúng âm vừa nghe.
//
// Trẻ có thể học lần lượt theo thứ tự, hoặc nhảy thẳng vào nhóm mình thích từ
// bảng tra cứu (mỗi nhóm trỏ về một bài ở đây).
//
// Nội dung CỐ ĐỊNH trong code; chỉ tiến độ lưu DB (model PhonicsProgress).

import {
  GROUP_SATPIN,
  GROUP_MDGOCK,
  GROUP_EURHBFL,
  GROUP_JVWXYZ,
  DIGRAPHS,
  VOWEL_TEAMS,
  INITIAL_BLENDS,
  FINAL_BLENDS,
  MAGIC_E,
  R_CONTROLLED,
  SIGHT_WORDS,
  CVC_WORDS,
  BLEND_WORDS,
  FINAL_BLEND_WORDS,
  R_WORDS,
  MAGIC_E_PAIRS,
  R_PAIRS,
  SIGHT_WORD_PAIRS,
  MAGIC_E_SPELLING,
  SIGHT_WORD_SPELLING,
  RHYME_SETS,
  type Sound,
  type CvcWord,
  type PicWord,
  type MinimalPair,
} from "./phonics-data";

export interface TeachCard {
  kind: "teach";
  category: string; // "Âm chữ cái" | "Phụ âm ghép" | "Nguyên âm ghép"
  big: string; // chữ hiển thị lớn
  sound: string; // "/s/"
  word: string;
  meaning: string;
  emoji: string;
  hint: string;
}

export interface ListenCard {
  kind: "listen";
  prompt: string;
  /** Từ được đọc lên (TTS sinh audio từ đây). */
  word: string;
  meaning: string;
  emoji: string;
  answer: string; // chữ/âm đúng
  options: string[]; // gồm cả answer (client tự xáo trộn)
}

export interface BlendCard {
  kind: "blend";
  prompt: string;
  parts: string[]; // ["c", "a", "t"]
  answer: string; // "cat"
  meaning: string;
  emoji: string;
  options: string[];
}

export interface RhymeCard {
  kind: "rhyme";
  prompt: string;
  /** Từ gốc cần tìm từ cùng vần. */
  base: { word: string; emoji: string };
  answer: string;
  options: Array<{ word: string; emoji: string }>;
}

export interface DiscriminateCard {
  kind: "discriminate";
  prompt: string;
  a: { word: string; sound: string; emoji: string; meaning: string };
  b: { word: string; sound: string; emoji: string; meaning: string };
  note: string;
}

export type PhonicsCard = TeachCard | ListenCard | BlendCard | RhymeCard | DiscriminateCard;

export interface PhonicsLesson {
  id: string;
  title: string;
  subtitle: string;
  kind: "letters" | "digraphs" | "vowels" | "blending" | "review";
  /** Emoji hiển thị trên thẻ bài trong danh sách. */
  emoji: string;
  cards: PhonicsCard[];
}

// ── Bộ dựng thẻ ──────────────────────────────────────────────────────────────

function teach(s: Sound, category: string): TeachCard {
  return {
    kind: "teach",
    category,
    big: s.letter,
    sound: s.sound,
    word: s.word,
    meaning: s.meaning,
    emoji: s.emoji,
    hint: s.hint,
  };
}

/**
 * Thẻ nghe: đọc từ ví dụ, trẻ chọn chữ cái tạo ra âm đầu.
 * `prompt` đổi được vì với cụm phụ âm CUỐI thì câu hỏi phải là "kết thúc bằng
 * âm nào" — hỏi sai chỗ là bé nhìn nhầm đầu từ.
 */
function listen(
  s: Sound,
  distractors: string[],
  prompt = "Nghe và chọn chữ tạo ra âm này",
): ListenCard {
  return {
    kind: "listen",
    prompt,
    word: s.word,
    meaning: s.meaning,
    emoji: s.emoji,
    answer: s.letter,
    options: [s.letter, ...distractors],
  };
}

/**
 * Biến thể của thẻ nghe: bé nghe CẢ TỪ rồi chọn đúng mặt chữ giữa mấy từ trông
 * na ná nhau (cap ↔ cape, come ↔ some). Dùng cho Magic E và sight words — nơi
 * cái phải phân biệt là toàn bộ từ chứ không phải một chữ cái rời.
 */
function listenWord(
  w: PicWord,
  others: string[],
  prompt = "Nghe rồi chọn đúng mặt chữ",
): ListenCard {
  return {
    kind: "listen",
    prompt,
    word: w.word,
    meaning: w.meaning,
    emoji: w.emoji,
    answer: w.word,
    options: [w.word, ...others],
  };
}

function blend(w: CvcWord, distractors: string[]): BlendCard {
  return {
    kind: "blend",
    prompt: "Ghép các âm lại thành từ nào?",
    parts: w.parts,
    answer: w.word,
    meaning: w.meaning,
    emoji: w.emoji,
    options: [w.word, ...distractors],
  };
}

function discrim(a: Sound, b: Sound, note: string): DiscriminateCard {
  return {
    kind: "discriminate",
    prompt: "Bạn vừa nghe âm nào?",
    a: { word: a.word, sound: a.sound, emoji: a.emoji, meaning: a.meaning },
    b: { word: b.word, sound: b.sound, emoji: b.emoji, meaning: b.meaning },
    note,
  };
}

/** Thẻ so sánh dựng thẳng từ một cặp tối thiểu đã soạn sẵn trong dữ liệu. */
const pairCard = (p: MinimalPair): DiscriminateCard => discrim(p.a, p.b, p.note);

/** Dựng các thẻ nối vần từ một bộ RHYME_SETS. */
function rhymeCards(setIndex: number): RhymeCard[] {
  const set = RHYME_SETS[setIndex];
  const others = RHYME_SETS.filter((_, i) => i !== setIndex);
  return set.words.slice(0, 2).map((base, i) => {
    const answer = set.words[(i + 1) % set.words.length];
    const wrong = others.slice(0, 2).map((o) => o.words[0]);
    return {
      kind: "rhyme" as const,
      prompt: `Từ nào cùng vần với “${base.word}”?`,
      base: { word: base.word, emoji: base.emoji },
      answer: answer.word,
      options: [
        { word: answer.word, emoji: answer.emoji },
        ...wrong.map((w) => ({ word: w.word, emoji: w.emoji })),
      ],
    };
  });
}

const letterOf = (list: Sound[], l: string): Sound => {
  const s = list.find((x) => x.letter === l);
  if (!s) throw new Error(`Không tìm thấy âm: ${l}`);
  return s;
};
/** Toàn bộ kho từ ghép vần được: CVC cơ bản + từ có cụm phụ âm + từ có nguyên âm R. */
const BLENDABLE: CvcWord[] = [...CVC_WORDS, ...BLEND_WORDS, ...FINAL_BLEND_WORDS, ...R_WORDS];
const cvc = (w: string): CvcWord => {
  const c = BLENDABLE.find((x) => x.word === w);
  if (!c) throw new Error(`Không tìm thấy từ ghép vần: ${w}`);
  return c;
};
/** Tra một sight word theo mặt chữ — gõ sai là hỏng ngay lúc build. */
const sight = (w: string): Sound => letterOf(SIGHT_WORDS, w);

// ── Danh sách bài học ────────────────────────────────────────────────────────

export const PHONICS_LESSONS: PhonicsLesson[] = [
  {
    id: "phonics-satpin",
    title: "Nhóm 1 · s a t p i n",
    subtitle: "6 âm đầu tiên — ghép được nhiều từ nhất",
    kind: "letters",
    emoji: "🌟",
    cards: [
      ...GROUP_SATPIN.map((s) => teach(s, "Âm chữ cái")),
      listen(letterOf(GROUP_SATPIN, "s"), ["t", "n"]),
      listen(letterOf(GROUP_SATPIN, "p"), ["a", "i"]),
      listen(letterOf(GROUP_SATPIN, "n"), ["s", "t"]),
      blend(cvc("cat"), ["cap", "cut"]),
    ],
  },
  {
    id: "phonics-mdgock",
    title: "Nhóm 2 · m d g o c k",
    subtitle: "Thêm 6 âm, đọc được từ dài hơn",
    kind: "letters",
    emoji: "🎯",
    cards: [
      ...GROUP_MDGOCK.map((s) => teach(s, "Âm chữ cái")),
      listen(letterOf(GROUP_MDGOCK, "m"), ["n", "d"]),
      listen(letterOf(GROUP_MDGOCK, "d"), ["g", "o"]),
      listen(letterOf(GROUP_MDGOCK, "o"), ["a", "c"]),
      blend(cvc("dog"), ["dig", "big"]),
      blend(cvc("map"), ["mop", "cap"]),
    ],
  },
  {
    id: "phonics-eurhbfl",
    title: "Nhóm 3 · e u r h b f l",
    subtitle: "Đủ 5 nguyên âm ngắn a e i o u",
    kind: "letters",
    emoji: "🎨",
    cards: [
      ...GROUP_EURHBFL.map((s) => teach(s, "Âm chữ cái")),
      listen(letterOf(GROUP_EURHBFL, "f"), ["b", "l"]),
      listen(letterOf(GROUP_EURHBFL, "r"), ["l", "h"]),
      discrim(
        letterOf(GROUP_EURHBFL, "b"),
        letterOf(GROUP_SATPIN, "p"),
        "/b/ có rung dây thanh, /p/ thì không. Đặt tay lên cổ để cảm nhận."
      ),
      blend(cvc("bed"), ["bad", "bud"]),
      blend(cvc("cup"), ["cap", "cop"]),
    ],
  },
  {
    id: "phonics-jvwxyz",
    title: "Nhóm 4 · j v w x y z qu",
    subtitle: "Hoàn thành đủ 26 chữ cái",
    kind: "letters",
    emoji: "🏁",
    cards: [
      ...GROUP_JVWXYZ.map((s) => teach(s, "Âm chữ cái")),
      listen(letterOf(GROUP_JVWXYZ, "v"), ["w", "j"]),
      listen(letterOf(GROUP_JVWXYZ, "z"), ["s", "x"]),
      discrim(
        letterOf(GROUP_JVWXYZ, "v"),
        letterOf(GROUP_EURHBFL, "f"),
        "/v/ có rung, /f/ không rung. Cả hai đều để răng trên chạm môi dưới."
      ),
      blend(cvc("fox"), ["box", "fix"]),
      blend(cvc("bus"), ["bug", "bat"]),
    ],
  },
  {
    id: "phonics-digraphs",
    title: "Phụ âm ghép · sh ch th ng",
    subtitle: "Hai chữ cái nhưng chỉ đọc MỘT âm",
    kind: "digraphs",
    emoji: "🔗",
    cards: [
      ...DIGRAPHS.map((s) => teach(s, "Phụ âm ghép")),
      listen(DIGRAPHS[0], ["ch", "th"]), // sh
      listen(DIGRAPHS[1], ["sh", "ng"]), // ch
      discrim(
        DIGRAPHS[0], // sh — /ʃ/
        GROUP_SATPIN[0], // s — /s/
        "Trẻ Việt hay đọc “sh” thành “s”. Nhớ CHU MÔI khi đọc /ʃ/."
      ),
      discrim(
        DIGRAPHS[2], // th — /θ/
        GROUP_SATPIN[2], // t — /t/
        "“th” phải đặt lưỡi GIỮA HAI HÀM RĂNG. Đọc thành /t/ là lỗi phổ biến nhất."
      ),
    ],
  },
  {
    id: "phonics-vowel-teams",
    title: "Nguyên âm ghép · ai ee oa oo",
    subtitle: "Hai nguyên âm tạo một âm dài",
    kind: "vowels",
    emoji: "🌈",
    cards: [
      ...VOWEL_TEAMS.map((s) => teach(s, "Nguyên âm ghép")),
      listen(VOWEL_TEAMS[1], ["ai", "oa"]), // ee
      listen(VOWEL_TEAMS[3], ["oo", "ow"]), // oa
      listen(VOWEL_TEAMS[5], ["or", "ur"]), // ar
    ],
  },
  {
    id: "phonics-blending",
    title: "Ghép vần thành từ",
    subtitle: "Nghe từng âm rồi ghép lại — bước quyết định để biết đọc",
    kind: "blending",
    emoji: "🧩",
    cards: [
      blend(cvc("cat"), ["cot", "cut"]),
      blend(cvc("pig"), ["pin", "peg"]),
      blend(cvc("sun"), ["sit", "son"]),
      blend(cvc("hat"), ["hit", "hot"]),
      blend(cvc("net"), ["not", "nut"]),
      blend(cvc("box"), ["bag", "bus"]),
    ],
  },
  {
    id: "phonics-rhymes",
    title: "Tìm từ cùng vần",
    subtitle: "cat – hat – bat: nghe ra vần là đọc được cả họ từ",
    kind: "review",
    emoji: "🎵",
    cards: [...rhymeCards(0), ...rhymeCards(1), ...rhymeCards(2), ...rhymeCards(4)],
  },
  {
    id: "phonics-initial-blends",
    title: "Cụm phụ âm đầu · bl cl st tr",
    subtitle: "Hai phụ âm dính liền — tuyệt đối không chèn “ơ” vào giữa",
    kind: "blending",
    emoji: "🤝",
    cards: [
      ...INITIAL_BLENDS.map((s) => teach(s, "Cụm phụ âm đầu")),
      listen(letterOf(INITIAL_BLENDS, "bl"), ["br", "cl"], "Nghe từ — từ này BẮT ĐẦU bằng cụm nào?"),
      listen(letterOf(INITIAL_BLENDS, "tr"), ["dr", "st"], "Nghe từ — từ này BẮT ĐẦU bằng cụm nào?"),
      listen(letterOf(INITIAL_BLENDS, "sp"), ["st", "sk"], "Nghe từ — từ này BẮT ĐẦU bằng cụm nào?"),
      discrim(
        letterOf(INITIAL_BLENDS, "bl"),
        letterOf(INITIAL_BLENDS, "br"),
        "/l/ thì đầu lưỡi CHẠM lợi trên; /r/ thì cong lưỡi lên mà KHÔNG chạm vào đâu cả.",
      ),
      discrim(
        letterOf(INITIAL_BLENDS, "tr"),
        letterOf(DIGRAPHS, "ch"),
        "“tr” tiếng Anh là HAI âm /t/ + /r/ dính nhau, không phải “tr” tiếng Việt (nghe gần như “ch”).",
      ),
      blend(cvc("flag"), ["flat", "frog"]),
      blend(cvc("stop"), ["step", "shop"]),
      blend(cvc("crab"), ["cab", "grab"]),
      blend(cvc("clock"), ["block", "clap"]),
      ...rhymeCards(5),
    ],
  },
  {
    id: "phonics-final-blends",
    title: "Cụm phụ âm cuối · -nd -nt -mp -nk",
    subtitle: "Đuôi từ có HAI phụ âm — nuốt mất một cái là sai nghĩa luôn",
    kind: "blending",
    emoji: "🔚",
    cards: [
      ...FINAL_BLENDS.map((s) => teach(s, "Cụm phụ âm cuối")),
      listen(letterOf(FINAL_BLENDS, "-nd"), ["-nt", "-mp"], "Nghe từ — từ này KẾT THÚC bằng cụm nào?"),
      listen(letterOf(FINAL_BLENDS, "-mp"), ["-nk", "-st"], "Nghe từ — từ này KẾT THÚC bằng cụm nào?"),
      listen(letterOf(FINAL_BLENDS, "-ft"), ["-lt", "-sk"], "Nghe từ — từ này KẾT THÚC bằng cụm nào?"),
      discrim(
        letterOf(FINAL_BLENDS, "-nd"),
        letterOf(FINAL_BLENDS, "-nt"),
        "Cùng bắt đầu bằng /n/, khác ở âm chốt: /d/ CÓ rung, /t/ thì bật hơi không rung.",
      ),
      discrim(
        letterOf(FINAL_BLENDS, "-nk"),
        letterOf(FINAL_BLENDS, "-nt"),
        "/ŋk/ đóng ở cuống họng (như “ưng”), /nt/ đóng ở đầu lưỡi trên lợi. Sờ tay lên cằm sẽ thấy khác.",
      ),
      blend(cvc("hand"), ["sand", "hat"]),
      blend(cvc("tent"), ["ten", "test"]),
      blend(cvc("jump"), ["just", "jug"]),
      blend(cvc("mask"), ["mat", "map"]),
      ...rhymeCards(6),
    ],
  },
  {
    id: "phonics-magic-e",
    title: "Magic E · a_e i_e o_e u_e",
    subtitle: "Chữ “e” cuối câm nhưng có phép: cap → cape, kit → kite",
    kind: "vowels",
    emoji: "🪄",
    cards: [
      ...MAGIC_E.map((s) => teach(s, "Magic E")),
      ...MAGIC_E_PAIRS.map(pairCard),
      ...MAGIC_E_SPELLING.map((c) => listenWord(c.heard, c.others)),
      ...rhymeCards(7),
    ],
  },
  {
    id: "phonics-r-controlled",
    title: "Nguyên âm có R · ar or er ir ur",
    subtitle: "Cong lưỡi tới hết từ — bỏ mất /r/ là “car” thành “ca”",
    kind: "vowels",
    emoji: "🚗",
    cards: [
      ...R_CONTROLLED.map((s) => teach(s, "Nguyên âm có R")),
      listen(letterOf(R_CONTROLLED, "ar"), ["or", "ir"], "Nghe từ — nguyên âm trong từ này viết thế nào?"),
      listen(letterOf(R_CONTROLLED, "or"), ["ar", "ur"], "Nghe từ — nguyên âm trong từ này viết thế nào?"),
      ...R_PAIRS.map(pairCard),
      blend(cvc("car"), ["cat", "cap"]),
      blend(cvc("corn"), ["cone", "coin"]),
      blend(cvc("bird"), ["bed", "bad"]),
      ...rhymeCards(3),
      ...rhymeCards(8),
    ],
  },
  {
    id: "phonics-sight-words",
    title: "Từ nhìn là đọc",
    subtitle: "the · said · was · one · two — ghép vần ra sai, phải nhớ mặt chữ",
    kind: "review",
    emoji: "👀",
    cards: [
      // Chỉ dạy những từ PHÁ LUẬT nặng nhất; cả danh sách 30 từ vẫn tra được ở
      // bảng tra âm, nhưng nhồi hết vào một bài thì bé ngồi xem 30 thẻ liền.
      ...["the", "said", "was", "are", "have", "come", "one", "two", "some", "what", "who", "of"].map((w) =>
        teach(sight(w), "Từ nhìn là đọc"),
      ),
      ...SIGHT_WORD_PAIRS.map(pairCard),
      ...SIGHT_WORD_SPELLING.map((q) => listenWord(sight(q.word), q.others)),
    ],
  },
];

/** Tìm bài theo id (id tĩnh — cũng là khoá lưu trong PhonicsProgress). */
export function getPhonicsLesson(id: string): PhonicsLesson | undefined {
  return PHONICS_LESSONS.find((l) => l.id === id);
}

/** Số thẻ CÓ TÍNH ĐIỂM trong một bài (thẻ "teach" không tính). */
export function scoredCardCount(lesson: PhonicsLesson): number {
  return lesson.cards.filter((c) => c.kind !== "teach").length;
}
