import * as React from "react";
import { PdfDocument, PdfSection, PdfNotice, PdfCard, PdfNumChip, PdfAnswer, PdfAnswerLine } from "@/components/learn/pdf/pdf-document";
import { PdfPassage, type PassageScope } from "@/components/learn/reading/reading-pdf";
import { PdfQuestionList, type PdfQuestion } from "@/components/learn/pdf/pdf-question-list";
import { PDF, PDF_FONT } from "@/lib/pdf/theme";
import { SITE_NAME } from "@/lib/site";
import { roadmapQuestionId, type RoadmapQuestion } from "@/lib/roadmap-content";

/** Chuyển câu hỏi lộ trình (Đọc/Nghe) → PdfQuestion cho bảng đáp án in. */
export function toPdfQuestions(questions: RoadmapQuestion[]): PdfQuestion[] {
  return questions.map((q, i) => ({
    id: roadmapQuestionId(i),
    type: q.type,
    prompt: q.prompt,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation ?? null,
    supportingQuote: q.supportingQuote ?? null,
  }));
}

interface PassageData {
  passage: string;
  /** Tên riêng của đoạn (vd "My pet dog"). */
  title?: string;
  questions: PdfQuestion[];
}

/** PDF đọc hiểu lộ trình — hỗ trợ nhiều đoạn (mỗi đoạn kèm câu hỏi & đáp án). */
export function RoadmapReadingPdf({
  title,
  subtitle,
  level,
  passages,
  scope = "both",
}: {
  title: string;
  subtitle?: string | null;
  level: string;
  passages: PassageData[];
  scope?: PassageScope;
}) {
  const multi = passages.length > 1;
  return (
    <PdfDocument kicker="Đọc hiểu" title={title || "Bài đọc hiểu"} subtitle={subtitle} level={level}>
      {passages.map((p, i) => (
        <PdfSection key={i} title={p.title || (multi ? `Bài đọc ${i + 1}` : "Đoạn văn")}>
          {scope !== "questions" && <PdfPassage passage={p.passage} />}
          {scope !== "passage" && (
            <div style={{ marginTop: scope === "questions" ? 0 : 10 }}>
              <PdfQuestionList questions={p.questions} />
            </div>
          )}
        </PdfSection>
      ))}
    </PdfDocument>
  );
}

interface ReorderSentence {
  words: string[];
  answer: string;
  translation?: string;
}

/** PDF tập viết lộ trình kiểu "sắp xếp từ thành câu": mỗi câu có thẻ từ cho sẵn
 *  + câu đúng & nghĩa tiếng Việt. */
export function RoadmapWritingReorderPdf({
  title,
  subtitle,
  level,
  sentences,
}: {
  title: string;
  subtitle?: string | null;
  level: string;
  sentences: ReorderSentence[];
}) {
  return (
    <PdfDocument
      kicker="Tập viết câu"
      title={title || "Tập viết câu"}
      subtitle={subtitle ?? "Sắp xếp từ thành câu"}
      level={level}
    >
      <PdfNotice>
        ✍️ Con hãy sắp xếp các thẻ từ cho sẵn thành một câu tiếng Anh đúng, rồi đối chiếu với đáp án
        &amp; nghĩa tiếng Việt ở ngay bên dưới mỗi câu.
      </PdfNotice>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sentences.map((s, i) => (
          <PdfCard key={i}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
              <PdfNumChip n={i + 1} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.words.map((w, j) => (
                    <span
                      key={j}
                      style={{
                        fontFamily: PDF_FONT.word,
                        fontSize: 14,
                        fontWeight: 600,
                        color: PDF.ink,
                        border: `1px solid ${PDF.line}`,
                        background: "#fff",
                        borderRadius: 7,
                        padding: "3px 9px",
                      }}
                    >
                      {w}
                    </span>
                  ))}
                </div>
                <PdfAnswer>
                  <PdfAnswerLine>{s.answer}</PdfAnswerLine>
                  {s.translation && (
                    <div style={{ marginTop: 3, fontSize: 12.5, color: PDF.muted }}>{s.translation}</div>
                  )}
                </PdfAnswer>
              </div>
            </div>
          </PdfCard>
        ))}
      </div>
    </PdfDocument>
  );
}

interface ClipData {
  title?: string;
  transcript?: string | null;
  questions: PdfQuestion[];
}

/** PDF nghe hiểu lộ trình — hỗ trợ nhiều đoạn nghe (lời thoại + câu hỏi & đáp án). */
export function RoadmapListeningPdf({
  title,
  subtitle,
  level,
  clips,
  scope = "both",
}: {
  title: string;
  subtitle?: string | null;
  level: string;
  clips: ClipData[];
  scope?: PassageScope;
}) {
  const multi = clips.length > 1;
  return (
    <PdfDocument kicker="Nghe hiểu" title={title || "Bài nghe hiểu"} subtitle={subtitle} level={level}>
      <PdfNotice>
        🎧 Phần âm thanh nghe trực tiếp trên <b>{SITE_NAME}</b> — bản in này chỉ gồm lời thoại &amp;
        đáp án để bố mẹ cùng con kiểm tra lại.
      </PdfNotice>
      {clips.map((c, i) => (
        <PdfSection
          key={i}
          title={multi ? `Đoạn nghe ${i + 1}${c.title ? ` · ${c.title}` : ""}` : "Lời thoại"}
        >
          {scope !== "questions" && c.transcript && <PdfPassage passage={c.transcript} />}
          {scope !== "passage" && (
            <div style={{ marginTop: scope === "questions" ? 0 : 10 }}>
              <PdfQuestionList questions={c.questions} />
            </div>
          )}
        </PdfSection>
      ))}
    </PdfDocument>
  );
}
