"use client";
// ===========================================================================
//  GAME 6 — "CÂU CÁ" 🎣
//
//  Cơ chế MỤC TIÊU DI ĐỘNG. Cá bơi ngang qua ao, mỗi con cõng hình của một từ.
//  Máy đọc một từ, bé chạm đúng con cá đó → lưỡi câu thả xuống, móc cá lên xô.
//
//  Vì sao hút trẻ: có ĐỘNG TÁC và có THÀNH QUẢ NHÌN THẤY ĐƯỢC (xô đầy dần). Bé
//  không chỉ "chọn đáp án" mà "câu được con cá", nên mỗi lần đúng là một chiến
//  công nhỏ chứ không phải một ô tick.
//
//  Cá bơi CHẬM và biên độ hẹp: bé 4–6 tuổi chưa ngắm được mục tiêu chạy nhanh.
//  Ở đây chuyển động để tạo cảm giác sống động, không phải để thử phản xạ.
// ===========================================================================
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { playWord } from "@/lib/speech";
import { shuffle } from "@/lib/english";
import { cn } from "@/lib/utils";
import type { VocabWordCard } from "@/types";
import type { VocabGameProps } from "./types";
import { WordVisual } from "../word-visual";
import { GameShell, StarBurst, GameDone } from "./game-shell";

const TOTAL_ROUNDS = 5;
const MIN_WORDS = 3;

const PRAISE = [
  "Câu được rồi! 🎣",
  "Cá to ghê! 🐟",
  "Bé câu giỏi quá! 🌟",
  "Trúng rồi đó! 👏",
  "Tuyệt vời! 🐻",
];

interface Round {
  target: VocabWordCard;
  fishes: VocabWordCard[];
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
    return { target, fishes: shuffle([target, ...others]) };
  });
}

export function FishingGame({ words, onDone }: VocabGameProps) {
  const reduceMotion = useReducedMotion();
  const wordKey = words.map((w) => w.id).join("|");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rounds = useMemo(() => buildRounds(words), [wordKey]);

  const [roundIndex, setRoundIndex] = useState(0);
  /** id con cá vừa câu được — đang bị kéo lên. */
  const [caught, setCaught] = useState<string | null>(null);
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [bucket, setBucket] = useState(0);
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

  function handleCast(fish: VocabWordCard) {
    if (!current || caught || done) return;

    if (fish.id !== current.target.id) {
      // Câu hụt: cá quẫy một cái rồi bơi tiếp. Không mất lượt, không mất cá.
      setMistakes((m) => m + 1);
      setWrongId(null);
      requestAnimationFrame(() => setWrongId(fish.id));
      if (replayTimer.current) clearTimeout(replayTimer.current);
      replayTimer.current = setTimeout(replay, 240);
      return;
    }

    if (replayTimer.current) clearTimeout(replayTimer.current);
    setCaught(fish.id);
    setBurst((b) => b + 1);
    setPraise(PRAISE[roundIndex % PRAISE.length]);
    replay();
    later(() => setBucket((n) => n + 1), 700);
    later(() => {
      if (roundIndex < rounds.length - 1) {
        setRoundIndex((i) => i + 1);
        setCaught(null);
        setPraise(null);
      } else {
        setDone(true);
      }
    }, 1500);
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

  return (
    <>
      <StarBurst trigger={burst} />
      <GameShell
        prompt={caught && praise ? praise : "Nghe rồi câu đúng con cá nhé! 🎣"}
        round={roundIndex + 1}
        totalRounds={rounds.length}
      >
        <div className="flex flex-col items-center gap-3">
          {/* Cần câu + xô đựng cá */}
          <div className="flex w-full items-end justify-between px-2">
            <span className="text-5xl" aria-hidden>
              🎣
            </span>
            <div className="flex flex-col items-center">
              <span className="text-4xl" aria-hidden>
                🪣
              </span>
              <span className="font-display text-sm font-extrabold text-primary">
                {bucket} con
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={replay}
            aria-label="Nghe lại từ"
            className="btn-chunky flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            <Volume2 className="h-9 w-9" />
          </button>

          {/* Ao cá */}
          <div className="relative w-full overflow-hidden rounded-3xl border-4 border-sky-300 bg-gradient-to-b from-sky-100 to-sky-300 p-3 dark:border-sky-500/40 dark:from-sky-900/40 dark:to-sky-800/40">
            <div className="grid grid-cols-3 gap-2">
              <AnimatePresence>
                {current.fishes.map((f, i) => {
                  if (caught === f.id) return null; // đã lên xô
                  return (
                    <motion.button
                      key={`${roundIndex}-${f.id}`}
                      type="button"
                      onClick={() => handleCast(f)}
                      disabled={!!caught}
                      aria-label={`Cá ${f.meaning || f.word}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        reduceMotion
                          ? { opacity: 1, x: 0 }
                          : { opacity: 1, x: [0, 10, 0, -10, 0] }
                      }
                      exit={{ opacity: 0, y: -140, scale: 0.6 }}
                      transition={
                        reduceMotion
                          ? { duration: 0.2 }
                          : {
                              opacity: { duration: 0.25 },
                              x: {
                                duration: 4 + i * 0.6,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.3,
                              },
                            }
                      }
                      className={cn(
                        "flex min-h-[6rem] w-full min-w-0 items-center justify-center rounded-2xl",
                        "border-4 border-white/70 bg-white/80 shadow-md dark:bg-white/10",
                        wrongId === f.id && "animate-wrong",
                      )}
                    >
                      <WordVisual word={f} emojiClass="text-4xl sm:text-5xl" quiz />
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {caught && (
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
