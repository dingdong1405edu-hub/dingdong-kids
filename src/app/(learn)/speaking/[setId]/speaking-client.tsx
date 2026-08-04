"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { levelLabel } from "@/lib/utils";
import { gradeSpeakingAction } from "@/server/actions/speaking";
import { emitDing } from "@/lib/ding-bus";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import { PassStatus } from "@/components/learn/roadmap/pass-status";
import { playEnglish } from "@/components/learn/reading/speak-en";
import { Mic, Square, Loader2, CheckCircle2, Volume2 } from "lucide-react";
import type { EnglishLevel } from "@prisma/client";

interface SpeakingSetData {
  id: string;
  level: EnglishLevel;
  title: string;
  part1Sentences: unknown;
  part2Passage: unknown;
  part3Questions: unknown;
}

interface GradeResult {
  score: number;
  criteria: {
    pronunciation: { score: number; errors: Array<{ word: string; issue: string; correct: string }> };
    /** Trọng âm & ngữ điệu — bé nhấn đúng từ, lên/xuống giọng đúng chỗ. */
    intonation: { score: number; errors: Array<{ word: string; expected: string; detected: string }> };
    fluency: { score: number; wordsPerMinute: number; feedback: string };
  };
  transcript: string;
  overallFeedback: string;
}

/** Nội dung JSON của một bộ nói. `meaning` là nghĩa tiếng Việt hiện dưới câu. */
interface Sentence { text: string; meaning?: string; audioUrl?: string }
interface Passage { text: string; meaning?: string; audioUrl?: string }
interface QuestionItem { question: string; meaning?: string; audioUrl?: string }

/** Hàm chấm một đoạn ghi âm — mặc định gọi gradeSpeakingAction; lộ trình truyền bản riêng. */
type GradeFn = (args: {
  transcript: string;
  referenceText: string | null;
  part: "repeat" | "read" | "answer";
  question: string | null;
  index: number;
  durationSec: number;
}) => Promise<{ ok: boolean; result?: unknown; error?: string }>;

/** Nút loa: phát audio thật nếu có, thiếu thì dùng giọng en-US của trình duyệt. */
function ListenButton({ text, audioUrl, label = "Nghe" }: { text: string; audioUrl?: string; label?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => () => audioRef.current?.pause(), []);
  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      className="gap-1.5 rounded-xl"
      onClick={() => {
        audioRef.current?.pause();
        audioRef.current = playEnglish({ text, audioUrl, rate: 0.85 });
      }}
    >
      <Volume2 className="h-4 w-4" /> {label}
    </Button>
  );
}

function AudioRecorder({
  onRecorded,
  disabled,
}: {
  onRecorded: (blob: Blob, durationSec: number) => void;
  disabled?: boolean;
}) {
  const [recording, setRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const startedAt = useRef(0);

  async function start() {
    // Trình duyệt CHỈ cho dùng micro trên "secure context" (https:// hoặc
    // localhost). Mở bằng IP mạng LAN (http://192.168.x.x:3000) thì
    // `navigator.mediaDevices` là undefined — không xin quyền được, và người
    // dùng sẽ tưởng nút ghi âm hỏng. Phải nói rõ nguyên nhân.
    if (typeof window !== "undefined" && !window.isSecureContext) {
      toast.error("Trang chưa chạy HTTPS nên trình duyệt khoá micro. Hãy mở bằng https:// hoặc localhost.", {
        duration: 8000,
      });
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error("Trình duyệt này không ghi âm được. Bé thử Chrome hoặc Safari bản mới nhé.", {
        duration: 8000,
      });
      return;
    }

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      toast.error("Chưa bật micro. Bố mẹ bấm 🔒 trên thanh địa chỉ → cho phép Micro, rồi tải lại trang.", {
        duration: 8000,
      });
      return;
    }
    try {
      streamRef.current = stream;
      // Safari/iOS không nhận "audio/webm" và ném lỗi nếu ép → để trình duyệt tự chọn.
      const mime = typeof MediaRecorder !== "undefined" &&
        ["audio/webm", "audio/mp4", "audio/ogg"].find((c) => MediaRecorder.isTypeSupported?.(c));
      const mr = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      chunks.current = [];
      mr.ondataavailable = (e) => chunks.current.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(chunks.current, { type: mr.mimeType || mime || "audio/webm" });
        const durationSec = Math.max(1, Math.round((Date.now() - startedAt.current) / 1000));
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        onRecorded(blob, durationSec);
      };
      startedAt.current = Date.now();
      mr.start();
      mediaRecorder.current = mr;
      setRecording(true);
    } catch {
      stream.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      toast.error("Trình duyệt này chưa ghi âm được. Bé thử Chrome hoặc Safari mới nhé.");
    }
  }

  function stop() {
    mediaRecorder.current?.stop();
    setRecording(false);
  }

  // Rời trang khi đang ghi → dừng mic để không kẹt đèn micro / rò tài nguyên.
  useEffect(
    () => () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    },
    [],
  );

  return (
    <div className="relative inline-flex">
      {recording && (
        <motion.span
          className="absolute inset-0 rounded-2xl bg-brand-coral/30"
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <Button
        onClick={recording ? stop : start}
        disabled={disabled}
        variant={recording ? "destructive" : "default"}
        size="sm"
        className="btn-chunky relative rounded-xl"
      >
        {recording ? (
          <><Square className="h-4 w-4 mr-2" /> Dừng</>
        ) : (
          <><Mic className="h-4 w-4 mr-2" /> Ghi âm</>
        )}
      </Button>
    </div>
  );
}

async function transcribeAndGrade(params: {
  blob: Blob;
  durationSec: number;
  grade: GradeFn;
  referenceText: string | null;
  part: "repeat" | "read" | "answer";
  question: string | null;
  index: number;
}): Promise<GradeResult> {
  const { blob, durationSec, grade, referenceText, part, question, index } = params;

  // 1) Audio → transcript via Deepgram (multipart upload stays an API route).
  const fd = new FormData();
  fd.append("audio", blob, "recording.webm");
  const transcribeRes = await fetch("/api/transcribe", { method: "POST", body: fd });
  if (!transcribeRes.ok) {
    const err = (await transcribeRes.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error || "Chưa nghe được giọng của bé");
  }
  const { transcript } = (await transcribeRes.json()) as { transcript: string };
  if (!transcript.trim()) {
    throw new Error("Chưa nghe rõ, bé nói to hơn một chút rồi ghi âm lại nhé.");
  }

  // 2) Transcript → score via Groq, persisted as an Attempt (server action).
  emitDing("thinking");
  const res = await grade({ transcript, referenceText, part, question, index, durationSec });
  if (!res.ok || !res.result) {
    throw new Error(res.error || "Chưa chấm được, bé thử lại nhé");
  }
  return res.result as GradeResult;
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? "text-brand-teal" : score >= 60 ? "text-brand-gold" : "text-brand-sun";
  return (
    <motion.span
      key={score}
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 14 }}
      className={`font-display font-bold text-2xl ${color}`}
    >
      {score}
    </motion.span>
  );
}

export function SpeakingClient({
  set,
  gradeAction,
  onFinish,
  passThreshold,
}: {
  set: SpeakingSetData;
  userId?: string;
  /** Chấm tuỳ biến (lộ trình). Nếu có → dùng thay gradeSpeakingAction. */
  gradeAction?: GradeFn;
  /** Nút "Hoàn thành phần Nói" (lộ trình). Nhận điểm trung bình các đoạn đã chấm. */
  onFinish?: (score: number) => Promise<void> | void;
  /** Lộ trình: ngưỡng "qua bài" → hiện kết quả % + nhãn Đạt/Chưa đạt sau khi hoàn thành. */
  passThreshold?: number;
}) {
  const sentences = (Array.isArray(set.part1Sentences) ? set.part1Sentences : []) as Sentence[];
  const passage = (set.part2Passage ?? { text: "" }) as Passage;
  const questions = (Array.isArray(set.part3Questions) ? set.part3Questions : []) as QuestionItem[];

  const grade: GradeFn = gradeAction ?? ((args) => gradeSpeakingAction({ setId: set.id, ...args }));
  const [finishing, setFinishing] = useState(false);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const [part1Results, setPart1Results] = useState<(GradeResult | null)[]>(Array(sentences.length).fill(null));
  const [part1Loading, setPart1Loading] = useState<boolean[]>(Array(sentences.length).fill(false));
  const [part2Result, setPart2Result] = useState<GradeResult | null>(null);
  const [part2Loading, setPart2Loading] = useState(false);
  const [part3Results, setPart3Results] = useState<(GradeResult | null)[]>(Array(questions.length).fill(null));
  const [part3Loading, setPart3Loading] = useState<boolean[]>(Array(questions.length).fill(false));
  const [showMeaning, setShowMeaning] = useState(false);

  const gradedScores = [...part1Results, part2Result, ...part3Results]
    .filter((r): r is GradeResult => r != null)
    .map((r) => r.score);
  const anyHigh = gradedScores.some((s) => s >= 80);
  /** Điểm tổng phần Nói = trung bình các đoạn đã chấm (0 nếu chưa ghi âm đoạn nào). */
  const overallScore = gradedScores.length
    ? Math.round(gradedScores.reduce((a, b) => a + b, 0) / gradedScores.length)
    : 0;

  async function handleFinish() {
    if (!onFinish) return;
    setFinishing(true);
    try {
      await onFinish(overallScore);
      setFinalScore(overallScore);
      setFinished(true);
      emitDing(overallScore >= (passThreshold ?? 80) ? "celebrate" : "complete");
      toast.success("Bé đã xong phần Nói!");
    } catch {
      toast.error("Chưa ghi nhận được, bé thử lại sau nhé.");
    } finally {
      setFinishing(false);
    }
  }

  async function gradePart1(idx: number, blob: Blob, durationSec: number) {
    setPart1Loading((l) => { const n = [...l]; n[idx] = true; return n; });
    try {
      const res = await transcribeAndGrade({
        blob, durationSec, grade, referenceText: sentences[idx].text,
        part: "repeat", question: null, index: idx,
      });
      setPart1Results((r) => { const n = [...r]; n[idx] = res; return n; });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Chưa chấm được, bé thử lại nhé");
    } finally {
      setPart1Loading((l) => { const n = [...l]; n[idx] = false; return n; });
    }
  }

  async function gradePart2(blob: Blob, durationSec: number) {
    setPart2Loading(true);
    try {
      const res = await transcribeAndGrade({
        blob, durationSec, grade, referenceText: passage.text,
        part: "read", question: null, index: 0,
      });
      setPart2Result(res);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Chưa chấm được, bé thử lại nhé");
    } finally {
      setPart2Loading(false);
    }
  }

  async function gradePart3(idx: number, blob: Blob, durationSec: number) {
    setPart3Loading((l) => { const n = [...l]; n[idx] = true; return n; });
    try {
      const res = await transcribeAndGrade({
        blob, durationSec, grade, referenceText: null,
        part: "answer", question: questions[idx].question, index: idx,
      });
      setPart3Results((r) => { const n = [...r]; n[idx] = res; return n; });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Chưa chấm được, bé thử lại nhé");
    } finally {
      setPart3Loading((l) => { const n = [...l]; n[idx] = false; return n; });
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="sticker relative overflow-hidden rounded-3xl bg-gradient-to-br from-band-lav to-white dark:to-transparent p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <DingBuddy size={60} pose={anyHigh ? "cheer" : "idle"} className="shrink-0" />
            <div>
              <h1 className="font-display text-xl font-extrabold">Luyện nói</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">Ghi âm · máy nghe rồi khen và chỉ chỗ cần sửa</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <Badge variant="outline">{levelLabel(set.level)}</Badge>
            <Button size="sm" variant="outline" className="rounded-xl" onClick={() => setShowMeaning(!showMeaning)}>
              {showMeaning ? "Ẩn" : "Hiện"} nghĩa
            </Button>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-2 -top-4 select-none text-[100px] leading-none opacity-15">
          🎤
        </div>
      </div>

      <Tabs defaultValue="part1">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="part1">Nhắc lại câu</TabsTrigger>
          <TabsTrigger value="part2">Đọc to đoạn văn</TabsTrigger>
          <TabsTrigger value="part3">Trả lời câu hỏi</TabsTrigger>
        </TabsList>

        {/* Phần 1 — Nhắc lại câu */}
        <TabsContent value="part1" className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Bé bấm loa để nghe câu mẫu, rồi ghi âm nhắc lại thật giống nhé.
          </p>
          {sentences.map((s, idx) => (
            <Card key={idx} className="sticker">
              <CardContent className="p-4 space-y-3">
                <div className="font-primer text-2xl font-semibold">{s.text}</div>
                {showMeaning && s.meaning && <div className="text-sm text-muted-foreground">{s.meaning}</div>}
                <div className="flex flex-wrap items-center gap-3">
                  <ListenButton text={s.text} audioUrl={s.audioUrl} label="Nghe câu mẫu" />
                  <AudioRecorder
                    onRecorded={(blob, durationSec) => gradePart1(idx, blob, durationSec)}
                    disabled={part1Loading[idx]}
                  />
                  {part1Loading[idx] && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                  {part1Results[idx] && (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-teal" />
                      <ScoreBadge score={part1Results[idx]!.score} />
                    </div>
                  )}
                </div>
                {part1Results[idx] && (
                  <div className="text-sm text-muted-foreground bg-muted rounded-2xl p-3">
                    {part1Results[idx]!.overallFeedback}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Phần 2 — Đọc to đoạn văn */}
        <TabsContent value="part2">
          <Card className="sticker">
            <CardHeader>
              <CardTitle className="font-display text-base">Bé đọc to đoạn này nhé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-2xl p-4">
                <div className="font-primer text-xl leading-loose">{passage.text}</div>
                {showMeaning && passage.meaning && (
                  <div className="text-sm text-muted-foreground mt-2">{passage.meaning}</div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <ListenButton text={passage.text} audioUrl={passage.audioUrl} label="Nghe cô đọc" />
                <AudioRecorder
                  onRecorded={(blob, durationSec) => gradePart2(blob, durationSec)}
                  disabled={part2Loading}
                />
                {part2Loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                {part2Result && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-teal" />
                    <ScoreBadge score={part2Result.score} />
                  </div>
                )}
              </div>
              {part2Result && (
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Phát âm", score: part2Result.criteria.pronunciation.score },
                    { label: "Ngữ điệu", score: part2Result.criteria.intonation.score },
                    { label: "Trôi chảy", score: part2Result.criteria.fluency.score },
                  ].map(({ label, score }) => (
                    <div key={label} className="text-center rounded-2xl border p-3">
                      <div className="text-xs text-muted-foreground">{label}</div>
                      <div className="font-display text-xl font-bold">{score}</div>
                      <Progress value={score} className="h-1 mt-1" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Phần 3 — Trả lời câu hỏi */}
        <TabsContent value="part3" className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Bé nghe câu hỏi, nghĩ một chút rồi trả lời theo ý mình nhé.
          </p>
          {questions.map((q, idx) => (
            <Card key={idx} className="sticker">
              <CardContent className="p-4 space-y-3">
                <div className="font-primer text-xl font-semibold">{q.question}</div>
                {showMeaning && q.meaning && <div className="text-sm text-muted-foreground">{q.meaning}</div>}
                <div className="flex flex-wrap items-center gap-3">
                  <ListenButton text={q.question} audioUrl={q.audioUrl} label="Nghe câu hỏi" />
                  <AudioRecorder
                    onRecorded={(blob, durationSec) => gradePart3(idx, blob, durationSec)}
                    disabled={part3Loading[idx]}
                  />
                  {part3Loading[idx] && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                  {part3Results[idx] && (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-teal" />
                      <ScoreBadge score={part3Results[idx]!.score} />
                    </div>
                  )}
                </div>
                {part3Results[idx] && (
                  <div className="text-sm text-muted-foreground bg-muted rounded-2xl p-3">
                    <strong>Bé đã nói:</strong> {part3Results[idx]!.transcript}
                    <br />
                    {part3Results[idx]!.overallFeedback}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {onFinish && (
        <div className="sticker flex flex-col items-center gap-2 rounded-3xl bg-muted/30 p-4 text-center">
          {finished && finalScore != null ? (
            <>
              <div className="font-display text-3xl font-extrabold text-primary">Kết quả: {finalScore}%</div>
              <p className="text-xs text-muted-foreground">Điểm trung bình các đoạn bé đã ghi âm.</p>
              {passThreshold != null && <PassStatus score={finalScore} threshold={passThreshold} />}
            </>
          ) : (
            <p className="text-xs text-muted-foreground">
              Bé luyện đủ 3 phần rồi bấm hoàn thành để ghi nhận phần Nói nhé.
            </p>
          )}
          <Button onClick={handleFinish} disabled={finishing || finished} className="btn-chunky gap-1.5">
            {finishing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
            {finished ? "Đã xong" : "Hoàn thành phần Nói"}
          </Button>
        </div>
      )}
    </div>
  );
}
