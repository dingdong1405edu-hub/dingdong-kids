"use client";
import type { EnglishLevel, Skill } from "@prisma/client";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { TappableEnglish } from "@/components/learn/reading/word-lookup";
import { QuestionCard } from "@/components/learn/reading/question-card";
import type { ReadingQuestion } from "@/components/learn/reading/types";
import { countWords } from "@/lib/utils";
import { Info, PenLine, Hand } from "lucide-react";
import type { WritingGradeResult } from "@/lib/groq";
import type { ExamPartData } from "./types";
import { ExamAudio } from "./exam-audio";

type EssayResult = WritingGradeResult | { ungraded: true };

const CRITERIA_LABELS: Record<string, string> = {
  taskResponse: "Bám sát đề · Task",
  grammar: "Ngữ pháp · Grammar",
  vocabulary: "Từ vựng · Vocabulary",
  coherence: "Mạch lạc · Coherence",
};

interface ExamPartProps {
  part: ExamPartData;
  skill: Skill;
  level: EnglishLevel;
  partLabel: string;
  globalIndexOf: (qid: string) => number;
  answers: Record<string, unknown>;
  onAnswer: (qid: string, v: unknown) => void;
  flags: Record<string, boolean>;
  onToggleFlag: (qid: string) => void;
  currentQid: string | null;
  onActivate: (globalIdx: number) => void;
  submitted: boolean;
  details: Record<string, boolean>;
  essays: Record<string, string>;
  onEssayChange: (partId: string, v: string) => void;
  essayResults: Record<string, EssayResult>;
  onWordClick: (word: string, e: React.MouseEvent) => void;
  registerRef: (qid: string, el: HTMLDivElement | null) => void;
}

export function ExamPart(props: ExamPartProps) {
  const { part, skill, level, partLabel, submitted, onWordClick } = props;
  const isEssay = !!part.writingPrompt;

  return (
    <section className="space-y-3 rounded-3xl border-2 bg-card p-4">
      {/* Part header */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-display rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
          {partLabel}
        </span>
      </div>
      {part.instructions && (
        <div className="flex items-start gap-2 rounded-2xl border-2 border-brand-sky/40 bg-band-sky/60 p-3 text-[15px] text-brand-sky">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-sky" />
          <p className="whitespace-pre-line">{part.instructions}</p>
        </div>
      )}

      {part.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={part.imageUrl} alt="" className="max-h-72 w-full rounded-2xl object-contain" />
      )}

      {/* Nghe: mỗi tiểu phần một engine audio riêng */}
      {skill === "LISTENING" && (
        <ExamAudio
          audioUrl={part.audioUrl}
          transcript={part.transcript}
          level={level}
          submitted={submitted}
          onWordClick={onWordClick}
        />
      )}

      {/* Đọc: đoạn văn, bấm vào từ để tra nghĩa */}
      {skill === "READING" && part.passage && (
        <div className="rounded-2xl border-2 bg-[#fbf9f4] p-4 dark:bg-muted">
          <TappableEnglish
            text={part.passage}
            onWordClick={onWordClick}
            className="font-primer block whitespace-pre-line text-[19px] leading-loose"
          />
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Hand className="h-3.5 w-3.5" /> Bấm vào một từ để nghe, xem nghĩa và cất vào sổ từ.
          </p>
        </div>
      )}

      {/* Viết: ô soạn bài + nhận xét của AI */}
      {isEssay && (
        <EssayBlock
          part={part}
          value={props.essays[part.id] ?? ""}
          onChange={(v) => props.onEssayChange(part.id, v)}
          submitted={submitted}
          result={props.essayResults[part.id]}
        />
      )}

      {/* Câu hỏi */}
      {part.questions.length > 0 && (
        <div className="space-y-3">
          {part.questions.map((q) => {
            const gi = props.globalIndexOf(q.id);
            return (
              <QuestionCard
                key={q.id}
                question={q as ReadingQuestion}
                index={gi}
                userAnswer={props.answers[q.id]}
                onAnswer={(v) => props.onAnswer(q.id, v)}
                submitted={submitted}
                isCorrect={props.details[q.id]}
                flagged={!!props.flags[q.id]}
                onToggleFlag={() => props.onToggleFlag(q.id)}
                isCurrent={props.currentQid === q.id}
                onActivate={() => props.onActivate(gi)}
                cardRef={(el) => props.registerRef(q.id, el)}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

function EssayBlock({
  part,
  value,
  onChange,
  submitted,
  result,
}: {
  part: ExamPartData;
  value: string;
  onChange: (v: string) => void;
  submitted: boolean;
  result: EssayResult | undefined;
}) {
  // Tiếng Anh đếm TỪ, không đếm ký tự — ngưỡng `minWords` cũng tính theo từ.
  const wordCount = countWords(value);
  const minWords = part.writingMinWords ?? 0;
  const progress = minWords > 0 ? Math.min(100, Math.round((wordCount / minWords) * 100)) : 0;

  return (
    <div className="space-y-3 rounded-2xl border-2 border-brand-grape/40 bg-band-lav/40 p-4">
      <div className="font-display flex items-center gap-2 text-sm font-bold text-brand-grape">
        <PenLine className="h-4 w-4" /> Bài viết
      </div>
      <p className="whitespace-pre-line text-[15px]">{part.writingPrompt}</p>

      {!submitted ? (
        <>
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="writing-lines font-primer min-h-48 text-[17px]"
            placeholder="Bé viết bài của mình ở đây..."
          />
          {minWords > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{wordCount} từ</span>
                <span>Bé thử viết ít nhất {minWords} từ nhé</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </>
      ) : (
        <EssayFeedback value={value} result={result} />
      )}
    </div>
  );
}

function EssayFeedback({ value, result }: { value: string; result: EssayResult | undefined }) {
  if (!result || "ungraded" in result) {
    return (
      <div className="space-y-2">
        <div className="font-primer rounded-2xl border-2 bg-card p-3 text-[15px] leading-relaxed">
          {value || <span className="text-muted-foreground">(Bé chưa viết phần này)</span>}
        </div>
        {result && "ungraded" in result && (
          <p className="text-xs text-brand-gold">
            Bài viết đã lưu nhưng chưa chấm được (thiếu cấu hình chấm điểm).
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-brand-grape">Kết quả phần viết</span>
        <span className="font-display text-2xl font-bold text-brand-grape">
          {result.score}/100
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {Object.entries(result.criteria ?? {}).map(([key, val]) => {
          if (!val) return null;
          return (
            <div key={key} className="rounded-2xl border-2 bg-card p-2">
              <div className="text-[11px] text-muted-foreground">{CRITERIA_LABELS[key] ?? key}</div>
              <div className="font-display text-lg font-bold">{val.score}</div>
            </div>
          );
        })}
      </div>
      {result.annotations?.length > 0 && (
        <div className="space-y-2">
          {result.annotations.map((a, i) => (
            <div key={i} className="rounded-2xl border-2 bg-card p-2 text-sm">
              <span className="font-primer text-brand-coral line-through">{a.original}</span>
              <span className="mx-1">→</span>
              <span className="font-primer font-semibold text-brand-teal">
                {a.correction}
              </span>
              {a.explanation && <p className="mt-1 text-xs text-muted-foreground">{a.explanation}</p>}
            </div>
          ))}
        </div>
      )}
      {result.correctedVersion && (
        <div>
          <div className="mb-1 text-xs font-semibold text-muted-foreground">Bài viết sau khi sửa</div>
          <div className="font-primer rounded-2xl bg-band-mint p-3 text-[15px] leading-relaxed">
            {result.correctedVersion}
          </div>
        </div>
      )}
      {result.overallFeedback && (
        <p className="rounded-2xl bg-muted p-3 text-[15px]">{result.overallFeedback}</p>
      )}
    </div>
  );
}
