"use client";
// ===========================================================================
//  GAME 5 — "ẤP TRỨNG" 🥚
//
//  Cơ chế PHẦN THƯỞNG TÍCH LUỸ, khác hẳn bốn game "nghe rồi chạm" trước đó.
//  Mỗi câu đúng làm quả trứng nứt thêm một chút. Trả lời đủ số câu thì trứng NỞ
//  ra một bạn nhỏ.
//
//  Vì sao hút trẻ: bé không chơi vì muốn "trả lời đúng" mà vì MUỐN BIẾT TRONG
//  TRỨNG CÓ GÌ. Tò mò mạnh hơn động lực điểm số rất nhiều ở tuổi này, và phần
//  thưởng nhìn thấy được lớn dần khiến bé không muốn bỏ giữa chừng.
//
//  Con vật nở ra được chọn TẤT ĐỊNH theo bộ từ của bài — cùng một bài thì luôn
//  nở ra cùng một bạn, nên bé kể lại với bố mẹ được ("con ấp ra con voi!").
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

/** 4 câu là nứt hết vỏ — ngắn để bé thấy được phần thưởng trước khi chán. */
const TOTAL_ROUNDS = 4;
const MIN_WORDS = 3;

/** Các bạn có thể nở ra. Chọn theo bộ từ nên mỗi bài một bạn khác nhau. */
const HATCHLINGS = ["🐣", "🐥", "🐤", "🦆", "🐧", "🦜", "🐢", "🦕"];

const PRAISE = [
  "Trứng nứt thêm rồi! 🥚",
  "Sắp nở rồi kìa! ✨",
  "Bé giỏi quá! 🌟",
  "Nghe kỹ ghê! 👂",
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

export function EggHatchGame({ words, onDone }: VocabGameProps) {
  const wordKey = words.map((w) => w.id).join("|");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rounds = useMemo(() => buildRounds(words), [wordKey]);

  /** Bạn nở ra — tất định theo bộ từ để bé kể lại được với bố mẹ. */
  const hatchling = useMemo(() => {
    let h = 0;
    for (let i = 0; i < wordKey.length; i++) h = (h * 31 + wordKey.charCodeAt(i)) >>> 0;
    return HATCHLINGS[h % HATCHLINGS.length];
  }, [wordKey]);

  const [roundIndex, setRoundIndex] = useState(0);
  const [cracks, setCracks] = useState(0);
  const [solved, setSolved] = useState(false);
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [burst, setBurst] = useState(0);
  const [praise, setPraise] = useState<string | null>(null);
  const [hatched, setHatched] = useState(false);
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

  // Không dựng được lượt nào → coi như xong, vẫn tặng 1 sao (bám `rounds`,
  // không bám `words.length`: bài có 3 bản ghi trùng id vẫn ra 0 lượt).
  useEffect(() => {
    if (rounds.length > 0 || finished.current) return;
    finished.current = true;
    onDone(1);
  }, [rounds.length, onDone]);

  // Tự đọc từ khi vào lượt mới — bé chưa đọc được chữ.
  useEffect(() => {
    if (done || hatched || !current) return;
    const t = setTimeout(() => {
      playWord({ word: current.target.word, audioUrl: current.target.audioUrl });
    }, 350);
    return () => clearTimeout(t);
  }, [roundIndex, done, hatched, current]);

  // Rung xong thì trả ô về bình thường.
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
    if (!current || solved || done || hatched) return;

    if (opt.id !== current.target.id) {
      setMistakes((m) => m + 1);
      // Đặt null rồi gán lại để rung chạy lại khi bé chạm liên tiếp cùng một ô.
      setWrongId(null);
      requestAnimationFrame(() => setWrongId(opt.id));
      if (replayTimer.current) clearTimeout(replayTimer.current);
      replayTimer.current = setTimeout(replay, 240);
      return;
    }

    if (replayTimer.current) clearTimeout(replayTimer.current);
    setSolved(true);
    setCracks((c) => c + 1);
    setBurst((b) => b + 1);
    setPraise(PRAISE[roundIndex % PRAISE.length]);
    replay();

    later(() => {
      if (roundIndex < rounds.length - 1) {
        setRoundIndex((i) => i + 1);
        setSolved(false);
        setPraise(null);
      } else {
        setHatched(true); // 🎉 màn nở trứng
        later(() => setDone(true), 2600);
      }
    }, 1300);
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

  // ── Màn NỞ TRỨNG — phần thưởng bé chờ suốt game ──
  if (hatched) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
        <motion.div
          initial={{ scale: 0.4, rotate: -20, opacity: 0 }}
          animate={{ scale: [0.4, 1.35, 1], rotate: [-20, 10, 0], opacity: 1 }}
          transition={{ duration: 0.9, times: [0, 0.6, 1] }}
          className="text-[9rem] leading-none"
        >
          {hatchling}
        </motion.div>
        {/* Vỏ trứng vỡ văng hai bên */}
        <div className="flex gap-10 text-4xl">
          <motion.span animate={{ x: -30, rotate: -40, y: 10 }} transition={{ duration: 0.6 }}>
            🥚
          </motion.span>
          <motion.span animate={{ x: 30, rotate: 40, y: 10 }} transition={{ duration: 0.6 }}>
            🥚
          </motion.span>
        </div>
        <p className="animate-pop-in font-display text-2xl font-extrabold text-primary">
          Nở rồi! Bé ấp giỏi quá 🎉
        </p>
      </div>
    );
  }

  const crackPct = Math.round((cracks / rounds.length) * 100);

  return (
    <>
      <StarBurst trigger={burst} />
      <GameShell
        prompt={solved && praise ? praise : "Nghe rồi chọn đúng để trứng nứt nhé! 🥚"}
        round={roundIndex + 1}
        totalRounds={rounds.length}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Quả trứng — rung lắc mạnh dần theo số vết nứt */}
          <motion.div
            animate={{ rotate: [-3 - cracks, 3 + cracks, -3 - cracks] }}
            transition={{ duration: Math.max(0.5, 1.6 - cracks * 0.25), repeat: Infinity }}
            className="relative text-[7rem] leading-none"
          >
            🥚
            {cracks > 0 && (
              <span className="absolute inset-0 flex items-center justify-center text-[7rem] opacity-70">
                {"⚡".repeat(Math.min(cracks, 3))}
              </span>
            )}
          </motion.div>
          <div className="w-40 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-sunny transition-all duration-500"
              style={{ width: `${crackPct}%` }}
            />
          </div>
          <p className="text-sm font-semibold text-muted-foreground">
            {cracks}/{rounds.length} vết nứt
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
                  aria-label={`Hình ${opt.meaning || opt.word}`}
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
