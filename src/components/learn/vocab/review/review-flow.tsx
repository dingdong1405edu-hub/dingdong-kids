"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { countWords } from "@/lib/utils";
import {
  isDue,
  ratingToQuality,
  correctnessToQuality,
  type SrsRating,
} from "@/lib/srs";
import { reviewWordAction } from "@/server/actions/vocab-review";
import { emitDing } from "@/lib/ding-bus";
import { McqCard, type OptionKind } from "./mcq-card";
import { SrsFlashcard } from "./srs-flashcard";
import { MatchGame } from "./match-game";
import type { VocabWordCard, WordReviewState } from "@/types";

interface Props {
  /** Các từ ứng viên cho phiên ôn (từ của bài, hoặc tổng hợp đến hạn). */
  words: VocabWordCard[];
  /** Trạng thái SRS hiện tại của từng từ. */
  reviews: WordReviewState[];
  /** Kho từ để lấy đáp án nhiễu (mặc định = words). */
  pool?: VocabWordCard[];
  title?: string;
  /**
   * Ghi nhận lượt ôn (cập nhật lịch SRS). Mặc định ghi vào VocabReview theo
   * `word.id` (từ vựng Luyện kỹ năng). Lộ trình truyền hàm riêng để ghi vào
   * RoadmapWordReview theo `word.word`. Gọi nền (fire-and-forget).
   */
  persist?: (word: VocabWordCard, quality: number) => void;
  /** Cho phép "Phản ánh từ này" trên flashcard — tắt ở lộ trình (từ là JSON). */
  reportable?: boolean;
  onExit: () => void;
}

/** Ghi mặc định cho từ vựng Luyện kỹ năng (VocabReview theo wordId). */
function defaultPersist(word: VocabWordCard, quality: number) {
  void reviewWordAction({ wordId: word.id, quality }).catch(() => {});
}

// ── Mô tả task trong hàng đợi ──────────────────────────────────────────────────

type PromptType = "word" | "meaning" | "listen";
type Variant = "meaning" | "word" | "ipa" | "listen";

interface BuiltMcq {
  question: string;
  prompt: { type: PromptType; word: VocabWordCard };
  options: string[];
  optionKind: OptionKind;
  correctIndex: number;
  audioWord?: VocabWordCard;
  autoPlay?: boolean;
}

type Task =
  | { kind: "match"; words: VocabWordCard[] }
  | { kind: "flashcard"; word: VocabWordCard; isNew: boolean; grade: boolean }
  | { kind: "mcq"; word: VocabWordCard; q: BuiltMcq; grade: boolean };

const SESSION_CAP = 24;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Dựng "giải thích đáp án" cho MCQ ôn từ ngay từ dữ liệu của từ (từ + IPA +
 *  nghĩa + 1 ví dụ) — để câu trắc nghiệm nào cũng có nút giải thích, kể cả khi đúng. */
function wordExplanation(word: VocabWordCard): string {
  let s = `${word.word}${word.ipa ? ` (${word.ipa})` : ""} — ${word.meaning}`;
  const ex = word.examples?.[0];
  if (ex) s += `. Ví dụ: ${ex.sentence} — ${ex.meaning}`;
  return s;
}

function feasibleVariants(word: VocabWordCard, poolSize: number): Variant[] {
  const v: Variant[] = [];
  if (poolSize >= 2) {
    v.push("meaning", "word", "listen");
    // Chỉ hỏi IPA khi cả kho từ đều có phiên âm, nếu không đáp án sẽ rỗng.
    if (word.ipa) v.push("ipa");
  }
  return v;
}

function buildMcq(word: VocabWordCard, variant: Variant, pool: VocabWordCard[]): BuiltMcq | null {
  const valueOf = (w: VocabWordCard) =>
    variant === "word" || variant === "listen" ? w.word : variant === "ipa" ? w.ipa : w.meaning;
  const correctVal = valueOf(word);
  // Khử trùng đáp án theo GIÁ TRỊ HIỂN THỊ (không chỉ so với đáp án đúng): tránh
  // hai nút giống hệt nhau khi gặp từ đồng âm (IPA) hoặc nghĩa trùng.
  const seenValues = new Set<string>([correctVal]);
  const distractors: VocabWordCard[] = [];
  for (const w of shuffle(pool.filter((x) => x.id !== word.id))) {
    const v = valueOf(w);
    if (seenValues.has(v)) continue;
    seenValues.add(v);
    distractors.push(w);
    if (distractors.length === 3) break;
  }
  const optionWords = shuffle([word, ...distractors]);
  if (optionWords.length < 2) return null;

  const optionKind: OptionKind =
    variant === "word" || variant === "listen" ? "word" : variant === "ipa" ? "ipa" : "text";
  const question =
    variant === "word"
      ? "Chọn từ tiếng Anh đúng"
      : variant === "ipa"
        ? "Chọn phiên âm đúng"
        : variant === "listen"
          ? "Nghe và chọn từ đúng"
          : "Từ này nghĩa là gì?";
  const prompt: { type: PromptType; word: VocabWordCard } =
    variant === "word"
      ? { type: "meaning", word }
      : variant === "listen"
        ? { type: "listen", word }
        : { type: "word", word };

  return {
    question,
    prompt,
    options: optionWords.map(valueOf),
    optionKind,
    correctIndex: optionWords.findIndex((w) => w.id === word.id),
    audioWord: variant === "listen" ? word : undefined,
    autoPlay: variant === "listen",
  };
}

function primaryTask(word: VocabWordCard, isNew: boolean, pool: VocabWordCard[]): Task {
  if (isNew) return { kind: "flashcard", word, isNew: true, grade: true };
  const variants = feasibleVariants(word, pool.length);
  if (variants.length) {
    const v = variants[Math.floor(Math.random() * variants.length)];
    const q = buildMcq(word, v, pool);
    if (q) return { kind: "mcq", word, q, grade: true };
  }
  return { kind: "flashcard", word, isNew: false, grade: true };
}

interface Session {
  queue: Task[];
  totalGraded: number;
  early: boolean;
}

function buildSession(words: VocabWordCard[], reviews: WordReviewState[], pool: VocabWordCard[]): Session {
  const now = new Date();
  const byId = new Map(reviews.map((r) => [r.wordId, r]));
  let due = words.filter((w) => isDue(byId.get(w.id)?.dueAt ?? null, now));
  const early = due.length === 0;
  if (early) due = [...words]; // không có từ đến hạn → cho ôn sớm toàn bộ
  const ordered = shuffle(due).slice(0, SESSION_CAP);

  const queue: Task[] = [];
  if (ordered.length >= 4) {
    queue.push({ kind: "match", words: ordered.slice(0, Math.min(6, ordered.length)) });
  }
  for (const w of ordered) {
    const rev = byId.get(w.id);
    const isNew = !rev || rev.repetitions === 0;
    queue.push(primaryTask(w, isNew, pool));
  }
  return { queue, totalGraded: ordered.length, early };
}

export function ReviewFlow({
  words,
  reviews,
  pool,
  title = "Ôn từ",
  persist = defaultPersist,
  reportable = true,
  onExit,
}: Props) {
  const distractorPool = pool ?? words;
  const [session] = useState<Session>(() => buildSession(words, reviews, distractorPool));
  const [queue, setQueue] = useState<Task[]>(session.queue);
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(0);
  const [remembered, setRemembered] = useState(0);
  const [forgot, setForgot] = useState(0);
  const finishedRef = useRef(false);

  const total = Math.max(1, session.totalGraded);
  const current = queue[index];
  // Thanh tiến trình theo hàng đợi (đã gồm cả thẻ học lại được thêm vào): chỉ đạt
  // 100% khi thực sự hết phiên, không "đầy sớm" như khi chia theo số từ.
  const progress = queue.length > 0 ? Math.round((index / queue.length) * 100) : 0;

  function advance() {
    const nextIndex = index + 1;
    // Dùng updater để đọc độ dài hàng đợi (đã gồm thẻ vừa học lại) + số từ nhớ tốt
    // mới nhất, biết chính xác khi rời task cuối → phát đúng MỘT lần kết thúc phiên.
    setQueue((q) => {
      const finishing = nextIndex >= q.length;
      setRemembered((r) => {
        if (finishing && !finishedRef.current) {
          finishedRef.current = true;
          emitDing(r / total >= 0.8 ? "celebrate" : "complete");
        }
        return r;
      });
      return q;
    });
    setIndex(nextIndex);
  }
  function requeue(word: VocabWordCard) {
    setQueue((q) => [...q, { kind: "flashcard", word, isNew: false, grade: false }]);
  }
  function grade(word: VocabWordCard, quality: number) {
    const ok = quality >= 3;
    setRemembered((n) => n + (ok ? 1 : 0));
    setForgot((n) => n + (ok ? 0 : 1));
    setDone((n) => n + 1);
    persist(word, quality);
  }

  function onFlashcardRate(task: Extract<Task, { kind: "flashcard" }>, rating: SrsRating) {
    if (task.grade) {
      const q = ratingToQuality(rating);
      if (rating === "again") requeue(task.word);
      grade(task.word, q);
    }
    advance();
  }
  function onMcqAnswered(task: Extract<Task, { kind: "mcq" }>, correct: boolean) {
    emitDing(correct ? "correct" : "wrong");
    const q = correctnessToQuality(correct);
    if (!correct) requeue(task.word);
    grade(task.word, q);
    advance();
  }

  // Không có từ để ôn (bài rỗng) — bảo vệ.
  if (words.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <DingBuddy size={88} pose="idle" className="mx-auto" />
        <h2 className="font-display text-xl font-extrabold">Chưa có từ để ôn</h2>
        <Button variant="outline" onClick={onExit}>
          Quay lại
        </Button>
      </div>
    );
  }

  // Kết thúc phiên.
  if (!current) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md rounded-3xl text-center shadow-soft-lg">
          <CardContent className="space-y-4 px-6 pb-6 pt-8">
            <DingBuddy size={104} pose="cheer" message="Cố lên nào!" className="mx-auto" />
            <h2 className="font-display text-2xl font-extrabold">Hoàn thành phiên ôn!</h2>
            <p className="text-[15px] text-muted-foreground">
              Đã ôn {total} từ — lịch ôn kế tiếp đã được cập nhật theo trí nhớ của bạn.
            </p>
            {/* Hai ô kết quả là khối màu, không phải chữ màu — nhìn ra ngay. */}
            <div className="flex justify-center gap-3 py-1 text-sm">
              <div className="min-w-[7rem] rounded-2xl bg-band-mint px-4 py-3">
                <div className="font-display text-3xl font-extrabold text-brand-teal">
                  {remembered}
                </div>
                <div className="font-semibold text-muted-foreground">Nhớ tốt</div>
              </div>
              <div className="min-w-[7rem] rounded-2xl bg-band-coral px-4 py-3">
                <div className="font-display text-3xl font-extrabold text-foreground">{forgot}</div>
                <div className="font-semibold text-muted-foreground">Cần ôn lại</div>
              </div>
            </div>
            <Button size="lg" className="w-full" onClick={onExit}>
              Hoàn tất
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="study-frame mx-auto w-full max-w-2xl">
      <div className="flex items-center gap-3 py-4">
        <button
          type="button"
          onClick={onExit}
          className="text-muted-foreground transition-colors hover:text-brand-coral"
          aria-label="Thoát"
        >
          <X className="h-6 w-6" />
        </button>
        <Progress value={progress} className="h-3 flex-1" />
        <span className="w-10 shrink-0 text-right font-display text-sm font-extrabold text-muted-foreground">
          {Math.min(done + 1, total)}/{total}
        </span>
      </div>

      <div className="pb-1 text-center">
        <span className="eyebrow text-brand-gold">
          {title}
          {session.early && " · ôn sớm"}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="study-body flex flex-col"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {current.kind === "match" && <MatchGame words={current.words} onDone={advance} />}

          {current.kind === "flashcard" && (
            <SrsFlashcard
              word={current.word}
              isNew={current.isNew}
              allowReport={reportable}
              onRate={(rating) => onFlashcardRate(current, rating)}
            />
          )}

          {current.kind === "mcq" && (
            <McqCard
              question={current.q.question}
              promptNode={<PromptNode prompt={current.q.prompt} />}
              options={current.q.options}
              optionKind={current.q.optionKind}
              correctIndex={current.q.correctIndex}
              audioWord={current.q.audioWord}
              autoPlay={current.q.autoPlay}
              explanation={wordExplanation(current.word)}
              onAnswered={(correct) => onMcqAnswered(current, correct)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Vùng đề bài cho MCQ. */
function PromptNode({ prompt }: { prompt: { type: PromptType; word: VocabWordCard } }) {
  if (prompt.type === "meaning") {
    return (
      <div className="px-4 text-center font-display text-3xl font-extrabold">
        {prompt.word.meaning}
      </div>
    );
  }
  if (prompt.type === "listen") {
    return <div className="text-7xl">🔊</div>;
  }
  // Từ đang hỏi ≥40px, phông tập đọc.
  return (
    <div className="font-primer text-6xl font-bold leading-none tracking-wide">
      {prompt.word.word}
    </div>
  );
}
