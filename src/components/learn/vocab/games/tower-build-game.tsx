"use client";
// ===========================================================================
//  GAME 8 — "XÂY THÁP" 🏗️
//
//  Cơ chế TÍCH LUỸ NHÌN THẤY ĐƯỢC. Mỗi câu đúng đặt thêm một tầng, Ding trèo
//  lên cao dần. Xong bài thì Ding chạm tới ngôi sao trên đỉnh.
//
//  Vì sao hút trẻ: khác với thanh tiến độ (một vạch trừu tượng), cái tháp là
//  công trình BÉ TỰ XÂY. Bé nhìn thấy công sức của mình chồng lên nhau và muốn
//  xây cho xong. Đây cũng là game duy nhất trong bộ có cảm giác "thành quả để
//  lại" chứ không phải chơi xong là hết.
//
//  Tháp mọc từ DƯỚI LÊN, tầng mới đẩy các tầng cũ lên — hướng chuyển động khớp
//  với trực giác "xây cao lên" của bé.
// ===========================================================================
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2 } from "lucide-react";
import { playWord } from "@/lib/speech";
import { shuffle } from "@/lib/english";
import { cn } from "@/lib/utils";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import type { VocabWordCard } from "@/types";
import type { VocabGameProps } from "./types";
import { WordVisual } from "../word-visual";
import { GameShell, StarBurst, GameDone } from "./game-shell";

const TOTAL_ROUNDS = 5;
const MIN_WORDS = 3;

/** Màu từng tầng — chuỗi class nguyên vẹn để Tailwind JIT quét được. */
const FLOOR_COLORS = [
  "bg-rose-400",
  "bg-amber-400",
  "bg-emerald-400",
  "bg-sky-400",
  "bg-violet-400",
];

const PRAISE = [
  "Thêm một tầng rồi! 🧱",
  "Tháp cao lên kìa! 🏗️",
  "Bé xây giỏi quá! 🌟",
  "Vững ghê! 👏",
  "Sắp tới ngôi sao rồi! ⭐",
];

interface Round {
  target: VocabWordCard;
  options: VocabWordCard[];
}

function buildRounds(words: VocabWordCard[]): Round[] {
  const pool = Array.from(new Map(words.map((w) => [w.id, w])).values());
  if (pool.length < MIN_WORDS) return [];

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
      Math.min(3, pool.length) - 1,
    );
    return { target, options: shuffle([target, ...others]) };
  });
}

export function TowerBuildGame({ words, onDone }: VocabGameProps) {
  const wordKey = words.map((w) => w.id).join("|");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rounds = useMemo(() => buildRounds(words), [wordKey]);

  const [roundIndex, setRoundIndex] = useState(0);
  /** Các tầng đã xây — mỗi tầng là emoji của từ bé trả lời đúng. */
  const [floors, setFloors] = useState<VocabWordCard[]>([]);
  const [solved, setSolved] = useState(false);
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [burst, setBurst] = useState(0);
  const [praise, setPraise] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const finished = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const replayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current: Round | undefined = rounds[roundIndex];
  const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    const list = timers.current;
    return () => {
      list.forEach(clearTimeout);
      list.length = 0;
      if (replayTimer.current) clearTimeout(replayTimer.current);
    };
  }, []);

  useEffect(() => {
    if (rounds.length > 0 || finished.current) return;
    finished.current = true;
    onDone(1);
  }, [rounds.length, onDone]);

  useEffect(() => {
    if (done || !current) return;
    const t = setTimeout(() => {
      playWord({ word: current.target.word, audioUrl: current.target.audioUrl });
    }, 350);
    return () => clearTimeout(t);
  }, [roundIndex, done, current]);

  useEffect(() => {
    if (!wrongId) return;
    const t = setTimeout(() => setWrongId(null), 600);
    return () => clearTimeout(t);
  }, [wrongId]);

  function replay() {
    if (!current) return;
    playWord({ word: current.target.word, audioUrl: current.target.audioUrl });
  }

  function handlePick(opt: VocabWordCard) {
    if (!current || solved || done) return;

    if (opt.id !== current.target.id) {
      setMistakes((m) => m + 1);
      setWrongId(null);
      requestAnimationFrame(() => setWrongId(opt.id));
      if (replayTimer.current) clearTimeout(replayTimer.current);
      replayTimer.current = setTimeout(replay, 240);
      return;
    }

    if (replayTimer.current) clearTimeout(replayTimer.current);
    setSolved(true);
    setFloors((f) => [...f, current.target]);
    setBurst((b) => b + 1);
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

  if (rounds.length === 0 || !current) return null;

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

  const reachedTop = floors.length >= rounds.length;

  return (
    <>
      <StarBurst trigger={burst} />
      <GameShell
        prompt={solved && praise ? praise : "Nghe rồi chọn đúng để xây thêm tầng nhé! 🧱"}
        round={roundIndex + 1}
        totalRounds={rounds.length}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Ngôi sao mục tiêu + Ding trèo lên theo số tầng */}
          <div className="flex w-full items-end justify-center gap-3">
            <div className="flex flex-col items-center">
              <motion.span
                animate={reachedTop ? { scale: [1, 1.4, 1], rotate: [0, 20, 0] } : {}}
                transition={{ duration: 0.8, repeat: reachedTop ? Infinity : 0 }}
                className="text-4xl"
                aria-hidden
              >
                ⭐
              </motion.span>

              {/* Tháp: tầng mới chèn ở TRÊN nên dùng flex-col-reverse để mọc lên */}
              <div className="flex w-24 flex-col-reverse items-center gap-1 pt-1">
                <AnimatePresence>
                  {floors.map((f, i) => (
                    <motion.div
                      key={`${f.id}-${i}`}
                      initial={{ opacity: 0, y: -28, scale: 0.7 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 240, damping: 18 }}
                      className={cn(
                        "flex h-10 w-full items-center justify-center rounded-lg border-2 border-black/10",
                        FLOOR_COLORS[i % FLOOR_COLORS.length],
                      )}
                    >
                      <WordVisual word={f} emojiClass="text-2xl" />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {/* Nền móng */}
                <div className="h-3 w-full rounded-b-lg bg-stone-400" />
              </div>
            </div>

            <DingBuddy
              size={72}
              pose={solved ? "cheer" : "idle"}
              className="mb-1 shrink-0"
            />
          </div>

          <p className="text-sm font-semibold text-muted-foreground">
            Tháp cao {floors.length}/{rounds.length} tầng
          </p>

          <button
            type="button"
            onClick={replay}
            aria-label="Nghe lại từ"
            className="btn-chunky flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            <Volume2 className="h-9 w-9" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={roundIndex}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid w-full grid-cols-3 gap-2 sm:gap-3"
            >
              {current.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handlePick(opt)}
                  disabled={solved}
                  aria-label={`Viên gạch ${opt.meaning || opt.word}`}
                  className={cn(
                    "sticker flex min-h-[7rem] w-full min-w-0 items-center justify-center",
                    "bg-card p-2 transition-transform active:scale-95",
                    wrongId === opt.id && "animate-wrong",
                    solved && opt.id === current.target.id && "animate-pop-in ring-4 ring-sunny",
                    solved && opt.id !== current.target.id && "opacity-40",
                  )}
                >
                  <WordVisual word={opt} emojiClass="text-5xl sm:text-6xl" quiz />
                </button>
              ))}
            </motion.div>
          </AnimatePresence>

          {solved && (
            <div className="animate-pop-in flex flex-col items-center rounded-2xl bg-sunny/20 px-4 py-2 text-center">
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
