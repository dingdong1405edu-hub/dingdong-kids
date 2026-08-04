"use client";
// ===========================================================================
//  GAME 4 — "CHO DING ĂN" (game có nhân vật, tạo gắn kết cảm xúc)
//
//  Ding ngồi giữa màn hình và "đòi" một món: máy ĐỌC LÊN tên món bằng tiếng
//  Anh, bé chạm vào đúng món trong ba ô ở dưới để đưa cho Ding. Món chọn đúng
//  BAY LÊN phía Ding rồi biến mất — bé nhìn thấy rõ mình vừa cho bạn gấu ăn.
//
//  Vì sao phải có nhân vật? Bé 4–6 tuổi làm bài để "giúp bạn gấu" thì cố hơn
//  hẳn làm bài để "trả lời đúng". Ding vui hay Ding nghĩ ngợi chính là phản hồi
//  mà bé hiểu ngay mà không cần đọc chữ.
//
//  Bài từ vựng không phải lúc nào cũng là đồ ăn (có bài toàn con vật, đồ vật)
//  nên câu thoại đổi theo loại từ: đồ ăn → "cho Ding ăn", đồ uống → "cho Ding
//  uống", con vật → "chơi với bạn ấy", còn lại → "Ding muốn xem". Ding không
//  bao giờ đòi ăn cái bàn.
//
//  Chọn sai KHÔNG bị phạt: món lắc ngang như lắc đầu, Ding nghiêng đầu nghĩ
//  một chút rồi đòi lại, máy đọc lại từ đúng, bé thử tiếp. Số lần sai chỉ dùng
//  để tính sao (tối thiểu vẫn 1 sao).
// ===========================================================================
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import type { DingPose } from "@/components/marketing/ding-art";
import { playWord } from "@/lib/speech";
import { shuffle } from "@/lib/english";
import { cn } from "@/lib/utils";
import type { VocabWordCard } from "@/types";
import type { VocabGameProps } from "./types";
import { WordVisual } from "../word-visual";
import { GameShell, StarBurst, GameDone } from "./game-shell";

/** 5 lượt — đủ để bé nhớ mặt từ mà chưa kịp chán (nguyên tắc 5). */
const TOTAL_ROUNDS = 5;

/** Số món bày ra mỗi lượt (không bao giờ vượt quá số từ đang có). */
const OPTIONS_PER_ROUND = 3;

/** Câu Ding lẩm bẩm khi bé đưa nhầm — không trách bé, chỉ ngơ ngác một chút. */
const WRONG_ASIDE = "Chưa phải món này… 🤔";

// --------------------------------------------------------------------------
//  DING ĐANG ĐÒI GÌ? — đoán "loại" của từ để câu thoại nghe tự nhiên.
//  Ưu tiên EMOJI trước (từ nào cũng có emoji, và emoji là dữ liệu đáng tin
//  nhất), sau đó tới từ tiếng Anh, cuối cùng mới tới nghĩa tiếng Việt.
//  Không đoán ra thì rơi về "show" — câu trung tính, luôn hợp lý.
// --------------------------------------------------------------------------
type AskKind = "eat" | "drink" | "pet" | "show";

const FOOD_EMOJI = new Set(
  Array.from(
    "🍏🍎🍐🍊🍋🍌🍉🍇🍓🫐🍈🍒🍑🥭🍍🥥🥝🍅🍆🥑🥦🥬🥒🫑🌽🥕🫒🧄🧅🥔🍠🥐🥯🍞🥖🥨🧀🥚🍳🧈🥞🧇🥓🥩🍗🍖🌭🍔🍟🍕🫓🥪🥙🧆🌮🌯🫔🥗🥘🫕🍝🍜🍲🍛🍣🍱🥟🍤🍙🍚🍘🍥🥠🥮🍢🍡🍧🍨🍦🥧🧁🍰🎂🍮🍭🍬🍫🍿🍩🍪🌰🥜🍯",
  ),
);

const DRINK_EMOJI = new Set(Array.from("🥛🍼☕🫖🍵🧃🥤🧋🍹🧉🚰"));

const PET_EMOJI = new Set(
  Array.from(
    "🐶🐱🐭🐹🐰🦊🐻🐼🐨🐯🦁🐮🐷🐸🐵🐒🐔🐧🐦🐤🐣🐥🦆🦅🦉🦇🐺🐗🐴🦄🐝🐛🦋🐌🐞🐜🦗🐢🐍🦎🦖🦕🐙🦑🦐🦞🦀🐡🐠🐟🐬🐳🐋🦈🐊🐅🐆🦓🦍🦧🐘🦛🦏🐪🐫🦒🦘🦬🐃🐂🐄🐎🐖🐏🐑🦙🐐🦌🐕🐩🦮🐈🐓🦃🦤🦚🦜🦢🦩🐇🦝🦨🦡🦫🦦🦥🐁🐀🐿🦔",
  ),
);

const FOOD_WORDS = [
  "apple", "banana", "orange", "grape", "grapes", "mango", "pear", "peach",
  "cherry", "lemon", "melon", "watermelon", "strawberry", "pineapple", "coconut",
  "fruit", "bread", "rice", "noodle", "noodles", "cake", "egg", "eggs", "meat",
  "beef", "pork", "ham", "sausage", "soup", "candy", "sweets", "cookie",
  "cookies", "biscuit", "pizza", "burger", "hamburger", "sandwich", "salad",
  "cheese", "butter", "jam", "honey", "chocolate", "ice cream", "carrot",
  "potato", "tomato", "corn", "bean", "beans", "onion", "cucumber", "pumpkin",
  "mushroom", "nut", "nuts", "popcorn", "yogurt", "pancake", "donut", "chips",
  "fries", "toast", "food", "breakfast", "lunch", "dinner", "vegetable",
  "vegetables", "snack",
];

const DRINK_WORDS = [
  "water", "milk", "juice", "tea", "coffee", "lemonade", "soda", "smoothie",
  "cocoa", "drink",
];

/** Nghĩa tiếng Việt — chỉ dùng khi emoji lẫn từ tiếng Anh đều không nhận ra.
 *  Cố tình KHÔNG bắt "quả"/"nước" chung chung, kẻo "quả bóng" thành đồ ăn. */
const FOOD_VI = ["bánh", "kẹo", "cơm", "thịt", "trứng", "kem", "phở", "bún", "sô cô la", "sô-cô-la", "trái cây"];
const DRINK_VI = ["sữa", "nước cam", "nước ép", "trà", "cà phê", "nước lọc"];

/** Tách emoji thành từng ký tự, bỏ dấu biến thể U+FE0F để so khớp không lệch. */
function emojiKeys(emoji: string): string[] {
  return Array.from(emoji.replace(/️/g, ""));
}

function askKindOf(word: VocabWordCard): AskKind {
  for (const ch of emojiKeys(word.emoji ?? "")) {
    if (FOOD_EMOJI.has(ch)) return "eat";
    if (DRINK_EMOJI.has(ch)) return "drink";
    if (PET_EMOJI.has(ch)) return "pet";
  }
  const en = word.word.trim().toLowerCase();
  if (DRINK_WORDS.includes(en)) return "drink";
  if (FOOD_WORDS.includes(en)) return "eat";

  const vi = (word.meaning ?? "").toLowerCase();
  if (DRINK_VI.some((k) => vi.includes(k))) return "drink";
  if (FOOD_VI.some((k) => vi.includes(k))) return "eat";
  return "show";
}

/**
 * Lời Ding nói theo từng loại món. Toàn bộ tiếng Việt, nói với bé.
 * `bubble` là câu trong bong bóng thoại lúc Ding đang đòi — CỐ TÌNH KHÔNG phải
 * tên món bằng tiếng Anh: bé mà dò được chữ thì hết phần luyện nghe, mà với từ
 * chưa có ảnh thì `WordVisual` hiện chữ cái đầu ⇒ chữ trong bong bóng còn chỉ
 * thẳng ra đáp án. Manh mối duy nhất phải là ÂM THANH (nguyên tắc 1).
 */
const LINES: Record<AskKind, { ask: string; bubble: string; thanks: string; praise: string }> = {
  eat: {
    ask: "Ding đói bụng rồi! Bé cho Ding ăn món này nhé 🐻",
    bubble: "Ding đói… 👂",
    thanks: "Ngon quá! Cảm ơn bé 🐻",
    praise: "Ding ăn ngon lành luôn! 🌟",
  },
  drink: {
    ask: "Ding khát nước rồi! Bé cho Ding uống cái này nhé 🐻",
    bubble: "Ding khát… 👂",
    thanks: "Mát quá! Cảm ơn bé 🐻",
    praise: "Ding uống hết sạch rồi! 🌟",
  },
  pet: {
    ask: "Ding muốn chơi với bạn này! Bé đưa cho Ding nhé 🐻",
    bubble: "Ding muốn chơi… 👂",
    thanks: "Bạn ấy dễ thương ghê! Cảm ơn bé 🐻",
    praise: "Ding có bạn mới rồi! 🎉",
  },
  show: {
    ask: "Ding muốn xem cái này! Bé đưa cho Ding nhé 🐻",
    bubble: "Ding muốn xem… 👂",
    thanks: "Ding thích lắm! Cảm ơn bé 🐻",
    praise: "Bé đưa đúng rồi! 👏",
  },
};

interface Round {
  target: VocabWordCard;
  options: VocabWordCard[];
  kind: AskKind;
}

/**
 * Dựng sẵn 5 lượt: mỗi lượt một món Ding đòi + các món gây nhiễu.
 * Xáo trộn rồi lấy lần lượt, hết thì xáo lại; tránh hai lượt liền nhau trùng
 * từ để bé không tưởng màn hình bị đứng.
 */
function buildRounds(words: VocabWordCard[]): Round[] {
  // Lọc trùng id TRƯỚC: bài lỡ có hai bản ghi cùng id thì (a) vòng "tránh hai
  // lượt liền nhau trùng từ" bên dưới có thể quay mãi không thoát — treo cả
  // trình duyệt, và (b) hai ô cùng id sẽ đụng `key` của React.
  const pool = words.filter((w, i, all) => all.findIndex((x) => x.id === w.id) === i);
  if (pool.length < 2) return [];

  const targets: VocabWordCard[] = [];
  while (targets.length < TOTAL_ROUNDS) {
    for (const w of shuffle(pool)) {
      if (targets.length >= TOTAL_ROUNDS) break;
      const prev = targets[targets.length - 1];
      if (prev && prev.id === w.id) continue;
      targets.push(w);
    }
  }

  return targets.map((target) => {
    const others = shuffle(pool.filter((w) => w.id !== target.id)).slice(
      0,
      Math.min(OPTIONS_PER_ROUND, pool.length) - 1,
    );
    return {
      target,
      options: shuffle([target, ...others]),
      kind: askKindOf(target),
    };
  });
}

/** Món đang bay về phía Ding. Quãng đường đo thẳng trên màn hình (px) nên
 *  đường bay trúng nhân vật ở mọi cỡ máy, không phải đoán bằng số cố định. */
interface Flight {
  id: string;
  dx: number;
  dy: number;
}

export function FeedDingGame({ words, onDone }: VocabGameProps) {
  // Khoá theo DANH SÁCH ID, không theo tham chiếu mảng: nếu nơi gọi truyền
  // `words={lesson.words.filter(...)}` thì mỗi lần render là một mảng mới —
  // dựng lại lượt chơi giữa chừng sẽ đổi món ngay dưới tay bé (và đọc lại từ).
  const wordKey = words.map((w) => w.id).join("|");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rounds = useMemo(() => buildRounds(words), [wordKey]);

  const [roundIndex, setRoundIndex] = useState(0);
  /** "ask" = đợi bé chọn · "fly" = món đang bay tới Ding · "cheer" = Ding vui. */
  const [phase, setPhase] = useState<"ask" | "fly" | "cheer">("ask");
  const [pose, setPose] = useState<DingPose>("idle");
  /** Lời Ding nói xen vào khi bé đưa nhầm — hết giờ thì quay lại đòi món. */
  const [aside, setAside] = useState<string | null>(null);
  const [flight, setFlight] = useState<Flight | null>(null);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [burst, setBurst] = useState(0);
  const [done, setDone] = useState(false);

  // Bé (hoặc máy của bé) chọn "giảm chuyển động" thì bỏ đường bay và cú lắc —
  // đổi sang mờ dần / nháy nhẹ, vẫn hiểu chuyện gì vừa xảy ra.
  const reduceMotion = useReducedMotion();

  /** Chặn gọi `onDone` hai lần (bấm nhanh / effect chạy lại). */
  const finished = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  /** Hẹn giờ đọc lại sau khi bé đưa nhầm — giữ riêng để không chồng tiếng. */
  const replayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Hẹn giờ đưa Ding từ "nghĩ ngợi" về bình thường — bé chạm nhầm liên tiếp
   *  thì phải gia hạn, không để cái hẹn cũ cắt ngang cái mới. */
  const thinkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const raf = useRef<number | null>(null);
  const dingRef = useRef<HTMLButtonElement | null>(null);
  const optionRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const current: Round | undefined = rounds[roundIndex];
  const solved = phase !== "ask";
  const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
  const lines = LINES[current ? current.kind : "show"];

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  // Dọn hẹn giờ khi rời màn — tránh setState trên component đã gỡ.
  useEffect(() => {
    const list = timers.current;
    return () => {
      list.forEach(clearTimeout);
      list.length = 0;
      if (replayTimer.current) clearTimeout(replayTimer.current);
      if (thinkTimer.current) clearTimeout(thinkTimer.current);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Không dựng nổi lượt nào (bài có ít hơn 2 từ khác nhau) → coi như xong,
  // tặng 1 sao để bé không kẹt ở màn hình trống.
  useEffect(() => {
    if (rounds.length > 0 || finished.current) return;
    finished.current = true;
    onDone(1);
  }, [rounds.length, onDone]);

  // NGUYÊN TẮC 2: Ding "đòi" món bằng GIỌNG NÓI ngay khi vào lượt mới — bé chưa
  // đọc được chữ và cũng chưa biết nút loa ở đâu. Chờ hiệu ứng vào xong (350ms).
  useEffect(() => {
    if (done || !current) return;
    const t = setTimeout(() => {
      playWord({ word: current.target.word, audioUrl: current.target.audioUrl });
    }, 350);
    return () => clearTimeout(t);
  }, [roundIndex, done, current]);

  // Lắc xong thì trả ô về bình thường — không để lại dấu vết "bé vừa sai".
  useEffect(() => {
    if (!shakeId) return;
    const t = setTimeout(() => setShakeId(null), 600);
    return () => clearTimeout(t);
  }, [shakeId]);

  const replay = useCallback(() => {
    if (!current) return;
    playWord({ word: current.target.word, audioUrl: current.target.audioUrl });
  }, [current]);

  function handleGive(option: VocabWordCard) {
    if (!current || solved || done) return;

    if (option.id !== current.target.id) {
      // NGUYÊN TẮC 3: không thua, không trừ điểm. Món lắc ngang như lắc đầu,
      // Ding nghiêng đầu nghĩ một chút, rồi máy ĐỌC LẠI từ đúng cho bé nghe
      // thêm một lần nữa và thử tiếp.
      setMistakes((m) => m + 1);
      setPose("think");
      setAside(WRONG_ASIDE);

      // Gán null trước rồi mới gán id ở khung hình sau: bé hay chạm liên tiếp
      // vào đúng một ô, mà React bỏ qua setState khi giá trị không đổi nên
      // hiệu ứng lắc sẽ không chạy lại — bé chạm mà màn hình im re.
      setShakeId(null);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setShakeId(option.id));

      if (replayTimer.current) clearTimeout(replayTimer.current);
      replayTimer.current = setTimeout(replay, 260);

      if (thinkTimer.current) clearTimeout(thinkTimer.current);
      thinkTimer.current = setTimeout(() => {
        // Nếu bé đã đưa đúng trong lúc chờ thì giữ nguyên Ding đang vui.
        setPose((p) => (p === "think" ? "idle" : p));
        setAside((a) => (a === WRONG_ASIDE ? null : a));
      }, 950);
      return;
    }

    // Đúng: món bay lên phía Ding. Đo khoảng cách thật giữa ô và nhân vật để
    // đường bay trúng Ding trên mọi cỡ màn hình.
    const el = optionRefs.current[option.id];
    const ding = dingRef.current;
    let dx = 0;
    let dy = -180;
    if (el && ding) {
      const a = el.getBoundingClientRect();
      const b = ding.getBoundingClientRect();
      dx = b.left + b.width / 2 - (a.left + a.width / 2);
      dy = b.top + b.height / 2 - (a.top + a.height / 2);
    }
    if (replayTimer.current) clearTimeout(replayTimer.current);
    if (thinkTimer.current) clearTimeout(thinkTimer.current);
    setAside(null);
    setShakeId(null);
    setFlight({ id: option.id, dx, dy });
    setPhase("fly");

    // Món tới miệng Ding → Ding reo lên, sao bay, đọc lại từ, cảm ơn bé.
    later(() => {
      setPhase("cheer");
      setPose("cheer");
      setBurst((b) => b + 1);
      replay();
    }, 620);

    later(() => {
      if (roundIndex < rounds.length - 1) {
        setRoundIndex((i) => i + 1);
        setPhase("ask");
        setPose("idle");
        setFlight(null);
      } else {
        setDone(true);
      }
    }, 2000);
  }

  if (!current) return null;

  if (done) {
    return (
      <GameDone
        stars={stars}
        onNext={() => {
          if (finished.current) return;
          finished.current = true;
          onDone(stars);
        }}
      />
    );
  }

  // Bong bóng thoại: lúc đòi thì là câu gợi "nghe đi" (KHÔNG hiện tên món bằng
  // tiếng Anh — xem ghi chú ở LINES), xong rồi thì là lời cảm ơn.
  const bubble = phase === "cheer" ? lines.thanks : aside ?? lines.bubble;

  return (
    <>
      <StarBurst trigger={burst} />
      <GameShell
        prompt={phase === "cheer" ? lines.praise : lines.ask}
        round={roundIndex + 1}
        totalRounds={rounds.length}
      >
        <div className="flex flex-col items-center gap-4">
          {/* ---- Ding ngồi giữa: chạm vào Ding là nghe lại món bạn ấy đòi ----
               Khối màu kem-mật ong sau lưng Ding tách nhân vật khỏi phần chọn
               món bên dưới, để mắt bé biết "đây là bạn gấu, kia là đồ chọn". */}
          <div className="flex w-full flex-col items-center gap-2 rounded-3xl bg-gradient-to-b from-band-sun to-band-coral py-3 shadow-soft">
            <button
              ref={dingRef}
              type="button"
              onClick={replay}
              aria-label="Chạm vào Ding để nghe lại xem Ding muốn gì"
              className="rounded-3xl p-1 transition-transform active:scale-95"
            >
              <DingBuddy size={124} pose={pose} message={bubble} className="mx-auto" />
            </button>
            {/* `text-foreground` chứ KHÔNG phải `text-sunny-foreground`: ở chế độ
                tối, chữ của nền vàng là màu nâu rất tối — đặt trên nền mờ sẽ mất hút. */}
            <span className="flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-sm font-bold text-foreground shadow-soft">
              <Volume2 className="h-4 w-4 text-brand-gold" /> Chạm vào Ding để nghe lại
            </span>
          </div>

          {/* ---- Các món để bé chọn ---- */}
          <AnimatePresence mode="wait">
            <motion.div
              key={roundIndex}
              initial={{ opacity: 0, scale: 0.92, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "grid w-full gap-2 sm:gap-3",
                current.options.length >= 3 ? "grid-cols-3" : "grid-cols-2",
              )}
            >
              {current.options.map((opt) => {
                const fly = flight && flight.id === opt.id ? flight : null;
                return (
                  <motion.button
                    key={opt.id}
                    ref={(el) => {
                      optionRefs.current[opt.id] = el;
                    }}
                    type="button"
                    onClick={() => handleGive(opt)}
                    disabled={solved}
                    // Nhãn cho trình đọc màn hình dùng NGHĨA TIẾNG VIỆT: bé chưa
                    // đọc được, nhưng bố mẹ / công nghệ hỗ trợ thì hiểu ngay.
                    aria-label={`Đưa cho Ding: ${opt.meaning || opt.word}`}
                    animate={
                      fly
                        ? reduceMotion
                          ? { opacity: 0, scale: 0.8 }
                          : { x: fly.dx, y: fly.dy, scale: 0.3, rotate: 12, opacity: 0 }
                        : { x: 0, y: 0, scale: 1, rotate: 0, opacity: solved ? 0.35 : 1 }
                    }
                    transition={fly ? { duration: 0.62, ease: "easeInOut" } : { duration: 0.25 }}
                    className={cn(
                      // Ô chơi chính: cao 128px (nguyên tắc 4 cần ≥ 96px). Bề
                      // ngang để co giãn theo cột — đặt hình cứng 80px + đệm ở
                      // trong thì 3 ô ép ô rộng tối thiểu 96px, cộng khe là tràn
                      // ngang trên máy hẹp 320px và cả trang bị kéo ngang.
                      "sticker flex min-h-[8rem] w-full min-w-0 flex-col items-center justify-center gap-1.5",
                      "overflow-hidden bg-card p-2 active:scale-95",
                      fly && "relative z-40",
                    )}
                  >
                    {/* Lắc NGANG như lắc đầu "không phải cái này đâu". Để ở lớp
                        trong nên không đụng vào chuyển động bay của khung ngoài. */}
                    <motion.span
                      animate={
                        shakeId === opt.id
                          ? reduceMotion
                            ? { opacity: [1, 0.4, 1] }
                            : { x: [0, -12, 12, -9, 9, 0] }
                          : { x: 0, opacity: 1 }
                      }
                      transition={{ duration: 0.45 }}
                      className="flex aspect-square w-full max-w-[5rem] items-center justify-center overflow-hidden rounded-2xl sm:max-w-[6rem]"
                    >
                      <WordVisual word={opt} emojiClass="text-5xl sm:text-6xl" quiz />
                    </motion.span>
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Đối chiếu âm với mặt chữ + nghĩa — chỉ sau khi bé đã làm đúng.
              (Ô của món đúng lúc này đã bay vào Ding và mờ hẳn, nên chữ phải
              hiện ở đây thì bé mới thấy.) */}
          {phase === "cheer" && (
            <div className="animate-pop-in flex flex-col items-center gap-0.5 rounded-2xl bg-band-sun px-5 py-2 text-center shadow-soft">
              <span className="font-primer text-2xl font-bold leading-none">
                {current.target.word}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                {current.target.meaning}
              </span>
            </div>
          )}
        </div>
      </GameShell>
    </>
  );
}
