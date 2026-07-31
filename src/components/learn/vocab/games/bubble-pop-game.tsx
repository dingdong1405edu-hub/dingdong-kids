"use client";
// ===========================================================================
//  GAME 2 — "CHÍCH BONG BÓNG" (game thưởng, chơi sau khi bé đã quen mặt từ)
//
//  Máy ĐỌC LÊN một từ, bé chích (chạm) vào bong bóng có đúng hình của từ đó.
//  Bong bóng trôi bồng bềnh — nhưng CHẬM và biên độ NHỎ có chủ đích: bé 4 tuổi
//  chưa phối hợp tay–mắt kịp với mục tiêu chạy nhanh, chích trượt vài lần là bé
//  bỏ cuộc. Ở đây bong bóng chỉ nhấp nhô tại chỗ (±10–14px, một nhịp 3.6–5 giây),
//  KHÔNG bay ngang, KHÔNG trôi mất — chuyển động để cho vui, không để làm khó.
//
//  Trước khi bé chích, trên bong bóng KHÔNG có chữ tiếng Anh — chỉ có hình. Có
//  chữ thì bé dò chữ chứ không nghe nữa, mất hết phần luyện nghe. Chữ chỉ hiện
//  SAU khi chích trúng, để bé đối chiếu âm vừa nghe với mặt chữ.
//
//  Chích sai KHÔNG bị phạt: bong bóng nảy + rung một cái (KHÔNG nổ), máy đọc lại
//  từ đúng, bé chích tiếp tới khi trúng. Số lần trượt chỉ để tính sao, và luôn
//  còn tối thiểu 1 sao.
// ===========================================================================
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { Volume2 } from "lucide-react";
import { playWord } from "@/lib/speech";
import { shuffle } from "@/lib/english";
import { cn } from "@/lib/utils";
import type { VocabWordCard } from "@/types";
import type { VocabGameProps } from "./types";
import { WordVisual } from "../word-visual";
import { GameShell, StarBurst, GameDone } from "./game-shell";

/** 5 lượt — vừa đủ vui mà bé chưa kịp chán (nguyên tắc 5). */
const TOTAL_ROUNDS = 5;
/** Số bong bóng cùng lúc trên màn. Nhiều hơn 4 là mắt bé nhìn không xuể. */
const MAX_BUBBLES = 4;
/** Dưới 3 từ thì màn hình lèo tèo, không thành trò chơi. */
const MIN_WORDS = 3;

/**
 * Màu bong bóng — viết NGUYÊN chuỗi class Tailwind (không ghép chuỗi động, ghép
 * động thì Tailwind không quét ra và bong bóng sẽ mất màu khi build production).
 */
const BUBBLE_COLORS = [
  "from-sky-200 to-sky-400",
  "from-rose-200 to-rose-400",
  "from-amber-200 to-amber-400",
  "from-emerald-200 to-emerald-400",
  "from-violet-200 to-violet-400",
  "from-orange-200 to-orange-400",
];

/** Lời khen xoay vòng — trẻ chán rất nhanh nếu lúc nào cũng một câu. */
const PRAISE = [
  "Bé chích trúng rồi! 🫧",
  "Bụp! Giỏi quá đi! 🎉",
  "Tai bé thính ghê! 👂",
  "Chính xác luôn! 👏",
  "Tuyệt vời! 🐻",
];

/** Câu nhắc khi bé chích nhầm — không bao giờ nói "sai" (xem CLAUDE.md §8). */
const NUDGE = "Bé nghe lại rồi chích bong bóng khác nhé! 🌟";

interface Bubble {
  /** Khoá duy nhất — bong bóng mới luôn có khoá mới để chạy lại hiệu ứng nổi lên. */
  key: string;
  /** Ô cố định trên lưới — nhờ vậy các bong bóng còn lại không nhảy chỗ. */
  slot: number;
  word: VocabWordCard;
  color: string;
  /** Biên độ nhấp nhô (px) — cố tình nhỏ: 10–14px. */
  drift: number;
  /** Chu kỳ một nhịp nổi (giây) — chậm: 3.6–5s. */
  period: number;
  /** Lệch pha để cả đám không nhấp nhô cùng một nhịp. */
  delay: number;
}

interface Round {
  bubbles: Bubble[];
  /** Bong bóng phải chích trong lượt này. */
  targetKey: string;
  target: VocabWordCard;
}

const FLOAT_EASE = "easeInOut" as const;

/** Nhịp trôi bồng bềnh của một bong bóng (chỉ nhấp nhô tại chỗ). */
function floatFor(b: Bubble): TargetAndTransition {
  return {
    y: [0, -b.drift, 0, b.drift, 0],
    rotate: [0, -2, 0, 2, 0],
    transition: {
      duration: b.period,
      repeat: Number.POSITIVE_INFINITY,
      ease: FLOAT_EASE,
      delay: b.delay,
    },
  };
}

/**
 * Dựng sẵn 5 lượt.
 *
 * Bong bóng nằm ở các Ô CỐ ĐỊNH. Mỗi lượt nổ đúng một bong bóng; sang lượt sau
 * bong bóng đó BIẾN MẤT và một bong bóng MỚI (từ khác, nếu bài còn từ chưa hiện)
 * nổi lên đúng ô đó. Cách này giữ đủ 3–4 bong bóng suốt game mà những bong bóng
 * còn lại không bị đổi chỗ — bé đang nhắm tay vào đâu thì nó vẫn ở đó.
 */
function buildRounds(words: VocabWordCard[]): Round[] {
  // Lọc trùng id TRƯỚC: hai bong bóng cùng một từ thì hai bong bóng có cùng một
  // bức hình — bé không thể nào biết phải chích cái nào, chích cái kia lại bị
  // tính là trượt. Với bé chưa đọc được chữ, hình là manh mối DUY NHẤT nên màn
  // hình không bao giờ được có hai hình giống hệt nhau (nguyên tắc 1 + 3).
  const pool = words.filter((w, i, all) => all.findIndex((x) => x.id === w.id) === i);
  if (pool.length < MIN_WORDS) return [];

  const size = Math.min(MAX_BUBBLES, pool.length);
  let counter = 0;

  const make = (word: VocabWordCard, slot: number): Bubble => {
    counter += 1;
    return {
      key: `bubble-${counter}`,
      slot,
      word,
      color: BUBBLE_COLORS[counter % BUBBLE_COLORS.length],
      drift: 10 + (slot % 3) * 2,
      period: 3.6 + slot * 0.45,
      delay: slot * 0.4,
    };
  };

  let slots = shuffle(pool)
    .slice(0, size)
    .map((w, i) => make(w, i));

  const rounds: Round[] = [];
  let prevWordId = "";

  for (let r = 0; r < TOTAL_ROUNDS; r++) {
    // Không lấy lại từ của lượt ngay trước — bé tưởng màn hình bị đứng.
    const pickable = slots.filter((b) => b.word.id !== prevWordId);
    const target = shuffle(pickable.length > 0 ? pickable : slots)[0];
    rounds.push({ bubbles: slots, targetKey: target.key, target: target.word });
    prevWordId = target.word.id;

    // Thay bong bóng vừa nổ bằng một từ chưa có trên màn. Bài quá ít từ thì đành
    // dùng lại từ đó — nhưng vẫn là một bong bóng mới (khoá mới, nổi lên lại).
    const stillShown = new Set(
      slots.filter((b) => b.key !== target.key).map((b) => b.word.id),
    );
    const spare = pool.filter(
      (w) => !stillShown.has(w.id) && w.id !== target.word.id,
    );
    const nextWord = spare.length > 0 ? shuffle(spare)[0] : target.word;
    slots = slots.map((b) => (b.key === target.key ? make(nextWord, b.slot) : b));
  }

  return rounds;
}

export function BubblePopGame({ words, onDone }: VocabGameProps) {
  // Khoá theo DANH SÁCH ID, không theo tham chiếu mảng: nếu nơi gọi truyền
  // `words={lesson.words.filter(...)}` thì mỗi lần render là một mảng mới —
  // dựng lại lượt chơi giữa chừng sẽ đổi bong bóng đúng ngay dưới tay bé, và
  // mọi bong bóng đổi khoá nên cả màn hình nhấp nháy nổi lên lại từ đầu.
  const wordKey = words.map((w) => w.id).join("|");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rounds = useMemo(() => buildRounds(words), [wordKey]);

  const [roundIndex, setRoundIndex] = useState(0);
  /** Lượt này đã chích trúng chưa — trúng rồi thì khoá màn lại và hiện chữ. */
  const [solved, setSolved] = useState(false);
  const [wrongKey, setWrongKey] = useState<string | null>(null);
  const [nudge, setNudge] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [burst, setBurst] = useState(0);
  const [praise, setPraise] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  /** Chặn gọi `onDone` hai lần (bấm nhanh / effect chạy lại). */
  const finished = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  /** Hẹn giờ đọc lại sau khi bé chích nhầm — giữ riêng để không chồng tiếng. */
  const replayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const raf = useRef<number | null>(null);

  const current: Round | undefined = rounds[roundIndex];
  const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;

  /** Bé (hoặc bố mẹ) bật "giảm chuyển động" thì tắt nhịp nhấp nhô vô hạn — cùng
   *  cách globals.css tắt `.animate-float-y`. Hiệu ứng nổ/rung là một-lần-rồi-thôi
   *  nên vẫn giữ: đó là phản hồi, không phải trang trí. */
  const reduced = useReducedMotion();

  /**
   * Nhịp trôi tính MỘT LẦN cho cả game và giữ nguyên tham chiếu qua mỗi lần
   * render — nếu tạo mới mỗi lần thì framer-motion tưởng có nhịp khác và giật
   * bong bóng về vị trí đầu mỗi khi bé chạm màn hình.
   */
  const floats = useMemo(() => {
    const map = new Map<string, TargetAndTransition>();
    if (reduced) return map;
    for (const round of rounds) {
      for (const b of round.bubbles) {
        if (!map.has(b.key)) map.set(b.key, floatFor(b));
      }
    }
    return map;
  }, [rounds, reduced]);

  const later = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  }, []);

  // Dọn hẹn giờ khi rời màn — tránh setState trên component đã gỡ.
  useEffect(() => {
    const list = timers.current;
    return () => {
      list.forEach(clearTimeout);
      list.length = 0;
      if (replayTimer.current) clearTimeout(replayTimer.current);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Không dựng nổi lượt nào (bài có ít hơn 3 từ KHÁC NHAU) → coi như xong, tặng
  // 1 sao. Phải bám theo `rounds.length` chứ không phải `words.length`: bài có
  // đủ 3 từ nhưng trùng id thì `buildRounds` vẫn trả về rỗng, mà khi đó bé sẽ
  // ngồi trước màn hình trắng vĩnh viễn vì luồng học chờ `onDone` mãi không tới.
  useEffect(() => {
    if (rounds.length > 0 || finished.current) return;
    finished.current = true;
    onDone(1);
  }, [rounds.length, onDone]);

  // NGUYÊN TẮC 2: tự đọc từ ngay khi vào lượt mới. Bé chưa đọc được chữ và cũng
  // chưa biết nút loa ở đâu — chờ bong bóng nổi lên xong (350ms) rồi đọc.
  useEffect(() => {
    if (done || !current) return;
    const t = setTimeout(() => {
      playWord({ word: current.target.word, audioUrl: current.target.audioUrl });
    }, 350);
    return () => clearTimeout(t);
  }, [roundIndex, done, current]);

  // Rung xong thì trả bong bóng về bình thường — không để lại vệt gì trên màn.
  useEffect(() => {
    if (!wrongKey) return;
    const t = setTimeout(() => setWrongKey(null), 650);
    return () => clearTimeout(t);
  }, [wrongKey]);

  // Câu nhắc "chích bong bóng khác" tự tắt, để câu nhắc gốc quay lại.
  useEffect(() => {
    if (!nudge) return;
    const t = setTimeout(() => setNudge(false), 2200);
    return () => clearTimeout(t);
  }, [nudge]);

  const replay = useCallback(() => {
    if (!current) return;
    playWord({ word: current.target.word, audioUrl: current.target.audioUrl });
  }, [current]);

  function handleTap(b: Bubble) {
    if (!current || solved || done) return;

    if (b.key !== current.targetKey) {
      // NGUYÊN TẮC 3: không thua, không trừ điểm — bong bóng chỉ nảy lên rung
      // một cái (KHÔNG nổ), rồi máy đọc lại từ đúng cho bé nghe thêm lần nữa.
      setMistakes((m) => m + 1);
      setNudge(true);
      // Gán null trước rồi mới gán khoá ở khung hình sau: bé hay chích liên tiếp
      // vào đúng một bong bóng, mà React bỏ qua setState khi giá trị không đổi
      // nên bong bóng sẽ đứng im từ cú chích thứ hai trở đi — bé tưởng máy hỏng.
      setWrongKey(null);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setWrongKey(b.key));

      // Một hẹn giờ DUY NHẤT cho việc đọc lại: bé chích liên tiếp 3–4 cái thì
      // nếu mỗi cú chích hẹn một lần đọc, các giọng sẽ chồng lên nhau (đường
      // `audioUrl` tạo <audio> mới nên không tự ngắt như giọng trình duyệt).
      if (replayTimer.current) clearTimeout(replayTimer.current);
      replayTimer.current = setTimeout(replay, 240);
      return;
    }

    // Trúng: bong bóng nổ + sao bay + đọc lại từ + hiện chữ để bé đối chiếu.
    if (replayTimer.current) clearTimeout(replayTimer.current);
    setSolved(true);
    setNudge(false);
    setBurst((x) => x + 1);
    setPraise(PRAISE[roundIndex % PRAISE.length]);
    replay();
    later(() => {
      if (roundIndex < rounds.length - 1) {
        setRoundIndex((i) => i + 1);
        setSolved(false);
        setPraise(null);
      } else {
        setDone(true);
      }
    }, 1400);
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

  return (
    <>
      <StarBurst trigger={burst} />
      <GameShell
        prompt={
          solved && praise
            ? praise
            : nudge
              ? NUDGE
              : "Nghe rồi chích đúng bong bóng nhé! 🫧"
        }
        round={roundIndex + 1}
        totalRounds={rounds.length}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Nút loa to — bé bấm nghe lại bao nhiêu lần cũng được */}
          <button
            type="button"
            onClick={replay}
            aria-label="Nghe lại từ"
            className={cn(
              "btn-chunky flex h-24 w-24 items-center justify-center rounded-full",
              "bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95",
            )}
          >
            <Volume2 className="h-11 w-11" />
          </button>
          <p className="text-sm font-semibold text-muted-foreground">
            Bấm loa để nghe lại
          </p>

          {/* "Hồ nước" chứa bong bóng */}
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-3xl p-3 sm:p-5",
              "bg-gradient-to-b from-sky-50 to-cyan-100/80",
              "dark:from-sky-950/50 dark:to-slate-900/70",
            )}
          >
            {/* Bọt nước trang trí — chỉ để nền có sức sống, bé không chạm được */}
            <span
              aria-hidden
              className="animate-float-y pointer-events-none absolute left-4 top-6 h-6 w-6 rounded-full bg-white/50"
            />
            <span
              aria-hidden
              className="animate-float-y2 pointer-events-none absolute right-6 top-1/3 h-4 w-4 rounded-full bg-white/40"
            />
            <span
              aria-hidden
              className="animate-float-y pointer-events-none absolute bottom-5 left-1/3 h-3 w-3 rounded-full bg-white/40"
            />

            <div className="relative grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-4 sm:gap-4">
              {current.bubbles.map((b) => {
                const isTarget = b.key === current.targetKey;
                const popping = solved && isTarget;
                const wobbling = wrongKey === b.key;

                return (
                  // Lớp NGOÀI lo chuyện trôi nổi, lớp TRONG lo nổ / rung — tách
                  // ra để hai chuyển động không giành nhau thuộc tính transform.
                  <motion.div
                    key={b.key}
                    animate={floats.get(b.key)}
                    className={cn(
                      "flex items-center justify-center",
                      // So le một chút cho giống bong bóng thật, đừng thẳng hàng
                      b.slot % 2 === 1 && "mt-5 sm:mt-7",
                    )}
                  >
                    <motion.button
                      type="button"
                      disabled={solved}
                      onClick={() => handleTap(b)}
                      // Nhãn cho trình đọc màn hình dùng NGHĨA TIẾNG VIỆT: bé chưa
                      // đọc được, nhưng bố mẹ / công nghệ hỗ trợ thì hiểu ngay.
                      aria-label={`Bong bóng ${b.word.meaning || b.word.word}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={
                        popping
                          ? {
                              // NỔ: phồng to một cái rồi biến mất.
                              scale: [1, 1.4, 0],
                              opacity: [1, 1, 0],
                              transition: { duration: 0.5, ease: "easeOut" },
                            }
                          : wobbling
                            ? {
                                // Chích sai: nảy nhẹ + rung, KHÔNG nổ, không đỏ.
                                scale: [1, 1.08, 1],
                                x: [0, -10, 10, -7, 7, 0],
                                rotate: [0, -6, 6, -4, 4, 0],
                                transition: { duration: 0.6 },
                              }
                            : { scale: 1, opacity: 1 }
                      }
                      whileTap={{ scale: 0.93 }}
                      transition={{ type: "spring", stiffness: 320, damping: 18 }}
                      className={cn(
                        // Vùng chạm chính: 112px, lên 128px từ màn sm (nguyên tắc 4)
                        "relative flex h-28 w-28 items-center justify-center rounded-full sm:h-32 sm:w-32",
                        "bg-gradient-to-br",
                        b.color,
                        "ring-4 ring-white/60 dark:ring-white/20",
                        "shadow-[0_6px_0_0_rgba(0,0,0,0.12)]",
                        solved && !isTarget && "opacity-45",
                      )}
                    >
                      {/* Vệt sáng cho ra chất bong bóng xà phòng */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute left-[18%] top-[14%] h-5 w-7 -rotate-12 rounded-full bg-white/70 blur-[1px]"
                      />
                      <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full sm:h-24 sm:w-24">
                        <WordVisual word={b.word} emojiClass="text-5xl sm:text-6xl" quiz />
                      </span>
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Chữ chỉ hiện SAU khi chích trúng — trước đó mà hiện thì bé dò chữ
              chứ không nghe nữa. */}
          {solved && (
            <div className="animate-pop-in flex flex-col items-center gap-0.5 rounded-2xl bg-sunny/20 px-4 py-2 text-center">
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
