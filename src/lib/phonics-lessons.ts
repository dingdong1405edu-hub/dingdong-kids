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

/** Thẻ nghe: đọc từ ví dụ, trẻ chọn chữ cái tạo ra âm đầu. */
function listen(s: Sound, distractors: string[]): ListenCard {
  return {
    kind: "listen",
    prompt: "Nghe và chọn chữ tạo ra âm này",
    word: s.word,
    meaning: s.meaning,
    emoji: s.emoji,
    answer: s.letter,
    options: [s.letter, ...distractors],
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
const cvc = (w: string): CvcWord => {
  const c = CVC_WORDS.find((x) => x.word === w);
  if (!c) throw new Error(`Không tìm thấy từ CVC: ${w}`);
  return c;
};

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
];

/** Tìm bài theo id (id tĩnh — cũng là khoá lưu trong PhonicsProgress). */
export function getPhonicsLesson(id: string): PhonicsLesson | undefined {
  return PHONICS_LESSONS.find((l) => l.id === id);
}

/** Số thẻ CÓ TÍNH ĐIỂM trong một bài (thẻ "teach" không tính). */
export function scoredCardCount(lesson: PhonicsLesson): number {
  return lesson.cards.filter((c) => c.kind !== "teach").length;
}
