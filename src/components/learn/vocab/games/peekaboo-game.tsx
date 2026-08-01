"use client";
// ===========================================================================
//  GAME 7 — "Ú OÀ" 🚪
//
//  Cơ chế BẤT NGỜ — LẬT MỞ. Ba cánh cửa đóng kín, máy đọc một từ, bé đoán từ đó
//  trốn sau cánh nào rồi mở ra.
//
//  Vì sao hút trẻ: "ú oà" là trò chơi đầu đời của mọi đứa trẻ. Cảm giác không
//  biết sau cánh cửa có gì rồi bật ra là loại phần thưởng mạnh nhất ở tuổi này —
//  mạnh hơn cả điểm số. Mở nhầm cũng vui vì có con bướm bay ra, nên bé KHÔNG SỢ
//  chọn sai (chính là nguyên tắc 3, ở đây được biến thành phần thưởng).
//
//  Vị trí trốn ĐỔI sau mỗi lượt để bé không học vẹt "cứ bấm ô giữa".
// ===========================================================================
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

/** Thứ bay ra khi mở nhầm cửa — vui chứ không phải hình phạt. */
const SURPRISES = ["🦋", "🐝", "🍃", "🎈", "✨"];

const PRAISE = [
  "Ú oà! Đúng rồi! 🎉",
  "Bé tìm giỏi ghê! 🌟",
  "Tìm ra rồi! 👏",
  "Tai bé thính quá! 👂",
  "Tuyệt vời! 🐻",
];

interface Round {
  target: VocabWordCard;
  /** Thứ nấp sau từng cánh cửa, theo đúng thứ tự trái → phải. */
  doors: VocabWordCard[];
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
    // Xáo trộn → vị trí trốn đổi mỗi lượt, bé không đoán mò theo thói quen.
    return { target, doors: shuffle([target, ...others]) };
  });
}

export function PeekabooGame({ words, onDone }: VocabGameProps) {
  const wordKey = words.map((w) => w.id).join("|");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rounds = useMemo(() => buildRounds(words), [wordKey]);

  const [roundIndex, setRoundIndex] = useState(0);
  /** Các cửa đã mở trong lượt này (kể cả mở nhầm). */
  const [opened, setOpened] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
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

  function replay() {
    if (!current) return;
    playWord({ word: current.target.word, audioUrl: current.target.audioUrl });
  }

  function handleOpen(door: VocabWordCard) {
    if (!current || solved || done || opened.includes(door.id)) return;

    setOpened((o) => [...o, door.id]);

    if (door.id !== current.target.id) {
      // Mở nhầm: bươm bướm bay ra, cửa TỰ ĐÓNG lại sau 1.1s để bé thử tiếp.
      setMistakes((m) => m + 1);
      if (replayTimer.current) clearTimeout(replayTimer.current);
      replayTimer.current = setTimeout(replay, 700);
      later(() => setOpened((o) => o.filter((id) => id !== door.id)), 1100);
      return;
    }

    if (replayTimer.current) clearTimeout(replayTimer.current);
    setSolved(true);
    setBurst((b) => b + 1);
    setPraise(PRAISE[roundIndex % PRAISE.length]);
    replay();
    later(() => {
      if (roundIndex < rounds.length - 1) {
        setRoundIndex((i) => i + 1);
        setOpened([]);
        setSolved(false);
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
        prompt={solved && praise ? praise : "Nghe rồi mở đúng cánh cửa nhé! 🚪"}
        round={roundIndex + 1}
        totalRounds={rounds.length}
      >
        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={replay}
            aria-label="Nghe lại từ"
            className="btn-chunky flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            <Volume2 className="h-9 w-9" />
          </button>

          <div className="grid w-full grid-cols-3 gap-2 sm:gap-3">
            {current.doors.map((d, i) => {
              const isOpen = opened.includes(d.id);
              const isTarget = d.id === current.target.id;
              return (
                <button
                  key={`${roundIndex}-${d.id}`}
                  type="button"
                  onClick={() => handleOpen(d)}
                  disabled={solved}
                  aria-label={isOpen ? `Cửa đã mở: ${d.meaning || d.word}` : `Cánh cửa ${i + 1}`}
                  className={cn(
                    "relative flex min-h-[7.5rem] w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border-4",
                    isOpen && isTarget
                      ? "animate-pop-in border-sunny bg-card"
                      : isOpen
                        ? "border-primary/30 bg-card"
                        : "border-amber-700/40 bg-gradient-to-b from-amber-500 to-amber-700",
                    solved && !isTarget && "opacity-40",
                  )}
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.span
                        key="open"
                        initial={{ scale: 0.3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 16 }}
                        className="flex items-center justify-center"
                      >
                        {isTarget ? (
                          <WordVisual word={d} emojiClass="text-5xl sm:text-6xl" quiz />
                        ) : (
                          // Mở nhầm → bươm bướm bay ra, vui chứ không phải phạt
                          <motion.span
                            animate={{ y: -18, rotate: 12 }}
                            transition={{ duration: 0.9 }}
                            className="text-5xl"
                          >
                            {SURPRISES[i % SURPRISES.length]}
                          </motion.span>
                        )}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="closed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-1"
                      >
                        <span className="text-5xl" aria-hidden>
                          🚪
                        </span>
                        <span className="h-2 w-2 rounded-full bg-amber-200" aria-hidden />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

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
