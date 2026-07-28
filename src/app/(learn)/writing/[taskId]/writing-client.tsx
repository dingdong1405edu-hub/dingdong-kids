"use client";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BaoBuddy } from "@/components/marketing/bao-buddy";
import { countWords, levelLabel, formatDuration } from "@/lib/utils";
import { gradeWritingAction } from "@/server/actions/writing";
import { emitDing } from "@/lib/ding-bus";
import { PassStatus } from "@/components/learn/roadmap/pass-status";
import { Clock, Loader2, Lightbulb, ChevronDown, CheckCircle2, ArrowUpCircle } from "lucide-react";
import type { EnglishLevel, WritingTaskType } from "@prisma/client";

interface Task {
  id: string;
  taskType: WritingTaskType;
  prompt: string;
  outline?: string | null;
  imageUrl?: string | null;
  minWords: number;
  timeLimit: number;
  level: EnglishLevel;
}

interface CriterionBase {
  score: number;
  feedback: string;
}
interface GradeResult {
  score: number;
  bandLabel?: string;
  criteria: {
    taskResponse?: CriterionBase;
    grammar: CriterionBase & { errors: string[] };
    vocabulary: CriterionBase & { suggestions: string[] };
    coherence: CriterionBase;
  };
  annotations: Array<{ original: string; type?: string; issue: string; correction: string; explanation: string }>;
  strengths?: string[];
  improvements?: string[];
  correctedVersion: string;
  overallFeedback: string;
}

const CRITERIA_LABELS: Record<string, string> = {
  taskResponse: "Bám sát đề",
  grammar: "Ngữ pháp",
  vocabulary: "Từ vựng",
  coherence: "Ý mạch lạc",
};

export function WritingClient({
  task,
  onGrade,
  passThreshold,
}: {
  task: Task;
  userId?: string;
  /** Chấm bài tuỳ biến (lộ trình). Nếu có → dùng thay gradeWritingAction. */
  onGrade?: (args: {
    submission: string;
    durationSec: number;
  }) => Promise<{ ok: boolean; result?: unknown; error?: string }>;
  /** Lộ trình: ngưỡng "qua bài" để hiện nhãn Đạt/Chưa đạt trên màn kết quả. */
  passThreshold?: number;
}) {
  const [text, setText] = useState("");
  const [timeLeft, setTimeLeft] = useState(task.timeLimit);
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [showOutline, setShowOutline] = useState(false);
  const startTime = useRef(Date.now());

  const outlineItems = (task.outline ?? "")
    .split("\n")
    .map((line) => line.replace(/^\s*[-*•]\s*/, "").trim())
    .filter(Boolean);
  const hasOutline = outlineItems.length > 0;

  // Tiếng Anh đếm TỪ, không đếm ký tự — ngưỡng `minWords` cũng tính theo từ.
  const wordCount = countWords(text);
  const progress = Math.min(100, Math.round((wordCount / Math.max(1, task.minWords)) * 100));

  useEffect(() => {
    if (result) return;
    const t = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) { clearInterval(t); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [result]);

  // Autosave
  useEffect(() => {
    const key = `writing-draft-${task.id}`;
    const saved = localStorage.getItem(key);
    if (saved) setText(saved);
  }, [task.id]);

  useEffect(() => {
    const key = `writing-draft-${task.id}`;
    const t = setTimeout(() => localStorage.setItem(key, text), 1000);
    return () => clearTimeout(t);
  }, [text, task.id]);

  async function handleGrade() {
    if (wordCount < task.minWords) {
      toast.error(`Bé viết thêm nhé — cần ít nhất ${task.minWords} từ (đang có ${wordCount}).`);
      return;
    }
    setGrading(true);
    emitDing("thinking");
    const duration = Math.round((Date.now() - startTime.current) / 1000);
    const res = onGrade
      ? await onGrade({ submission: text, durationSec: duration })
      : await gradeWritingAction({
          taskId: task.id,
          submission: text,
          durationSec: duration,
        });
    setGrading(false);
    if (res.ok && res.result) {
      const graded = res.result as GradeResult;
      setResult(graded);
      const highScore = passThreshold != null ? graded.score >= passThreshold : graded.score >= 80;
      emitDing(highScore ? "celebrate" : "complete");
      localStorage.removeItem(`writing-draft-${task.id}`);
    } else {
      toast.error(res.error ?? "Chưa chấm được bài, bé thử lại nhé");
    }
  }

  if (result) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <BaoBuddy
          size={88}
          pose={result.score >= 60 ? "cheer" : "idle"}
          message={result.score >= 60 ? "Bé viết hay lắm!" : "Cố lên nhé!"}
          className="mx-auto"
        />
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Cô đã đọc bài của bé</h2>
          <div className="flex flex-col items-end gap-1.5">
            <div className="font-display text-4xl font-bold text-primary">{result.score}/100</div>
            {result.bandLabel && (
              <div className="text-xs font-medium text-muted-foreground">{result.bandLabel}</div>
            )}
            {passThreshold != null && <PassStatus score={result.score} threshold={passThreshold} />}
          </div>
        </div>

        {/* Criteria */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(result.criteria ?? {}).map(([key, val]) => {
            if (!val) return null;
            return (
              <Card key={key} className="sticker">
                <CardContent className="pt-4">
                  <div className="text-xs text-muted-foreground">{CRITERIA_LABELS[key] ?? key}</div>
                  <div className="font-display text-2xl font-bold">{val.score}</div>
                  <Progress value={val.score} className="h-1.5 mt-1" />
                  <p className="text-xs text-muted-foreground mt-2">{val.feedback}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Strengths — luôn khen trước khi sửa */}
        {result.strengths && result.strengths.length > 0 && (
          <Card className="sticker">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" /> Bé làm tốt chỗ này
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm">
                {result.strengths.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Annotations */}
        {(result.annotations?.length ?? 0) > 0 && (
          <Card className="sticker">
            <CardHeader><CardTitle className="font-display text-base">Cùng sửa lại nhé</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {result.annotations.map((ann, i) => (
                <div key={i} className="rounded-2xl border p-3 text-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    {ann.type && (
                      <Badge variant="secondary" className="text-[10px]">{ann.type}</Badge>
                    )}
                    <span className="font-primer text-red-600 dark:text-red-400 line-through">{ann.original}</span>
                    <span>→</span>
                    <span className="font-primer font-semibold text-green-700 dark:text-green-300">{ann.correction}</span>
                  </div>
                  {ann.issue && <div className="text-muted-foreground mt-1 font-medium">{ann.issue}</div>}
                  <div className="text-muted-foreground mt-1">{ann.explanation}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Improvements */}
        {result.improvements && result.improvements.length > 0 && (
          <Card className="sticker">
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <ArrowUpCircle className="h-4 w-4 text-primary" /> Lần sau bé thử nhé
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm">
                {result.improvements.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary">→</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Corrected version */}
        <Card className="sticker">
          <CardHeader><CardTitle className="font-display text-base">Bài đã sửa lại</CardTitle></CardHeader>
          <CardContent>
            <div className="font-primer text-[17px] leading-relaxed bg-green-50 dark:bg-green-500/10 rounded-2xl p-3">
              {result.correctedVersion}
            </div>
          </CardContent>
        </Card>

        <Card className="sticker">
          <CardHeader><CardTitle className="font-display text-base">Lời nhắn của cô</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm">{result.overallFeedback}</p>
          </CardContent>
        </Card>

        <Button variant="outline" onClick={() => { setResult(null); setText(""); }}>
          Viết lại bài khác
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-bold">Bài viết của bé</h1>
        <Badge variant={timeLeft < 120 ? "destructive" : "outline"}>
          <Clock className="h-3 w-3 mr-1" />
          {formatDuration(timeLeft)}
        </Badge>
      </div>

      <Card className="sticker">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{levelLabel(task.level)}</Badge>
          </div>
          <p className="text-[15px] mb-1">{task.prompt}</p>

          {task.imageUrl && (
            // Đề tả tranh: ảnh là phần đề bài, luôn hiện to cho bé nhìn rõ.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={task.imageUrl}
              alt="Tranh của đề bài"
              className="mt-3 max-h-72 w-full rounded-2xl object-contain"
            />
          )}

          {hasOutline && (
            <div className="mt-3 border-t pt-3">
              <button
                type="button"
                onClick={() => setShowOutline((v) => !v)}
                aria-expanded={showOutline}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
              >
                <Lightbulb className="h-4 w-4" />
                {showOutline ? "Ẩn dàn ý gợi ý" : "Gợi ý dàn ý"}
                <ChevronDown className={`h-4 w-4 transition-transform ${showOutline ? "rotate-180" : ""}`} />
              </button>
              {showOutline && (
                <ul className="mt-2 space-y-1.5 rounded-2xl bg-amber-50 dark:bg-amber-500/10 p-3 text-sm text-amber-900 dark:text-amber-200">
                  {outlineItems.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="select-none text-amber-500 dark:text-amber-400">•</span>
                      <span className="whitespace-pre-line">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="writing-lines min-h-48 font-primer text-[19px] leading-8"
        placeholder="Bé viết bằng tiếng Anh ở đây nhé..."
        disabled={grading}
        lang="en"
        spellCheck
      />

      <div className="flex items-center justify-between">
        <div className="space-y-1 flex-1 mr-4">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{wordCount} từ</span>
            <span>Cần ít nhất: {task.minWords} từ</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <Button className="btn-chunky" onClick={handleGrade} disabled={grading || wordCount < task.minWords}>
          {grading ? (
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Cô đang đọc...</>
          ) : "Nộp bài cho cô"}
        </Button>
      </div>
    </div>
  );
}
