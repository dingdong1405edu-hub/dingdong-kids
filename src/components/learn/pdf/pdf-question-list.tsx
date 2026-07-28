import * as React from "react";
import { PDF, PDF_FONT } from "@/lib/pdf/theme";
import { PdfNumChip, PdfTag, PdfAnswer, PdfAnswerLine } from "@/components/learn/pdf/pdf-document";

export interface PdfQuestion {
  id: string;
  type: string;
  /** Câu hỏi bằng tiếng Anh. */
  prompt: string;
  /** Bản dịch tiếng Việt của câu hỏi — in nhỏ bên dưới cho ba mẹ đọc cùng bé. */
  promptTranslation?: string | null;
  options?: unknown;
  correctAnswer: unknown;
  explanation?: string | null;
  /** Câu trong bài chứng minh đáp án. */
  supportingQuote?: string | null;
  quoteTranslation?: string | null;
}

const OPT_LETTERS = ["A", "B", "C", "D", "E", "F"];

const TYPE_LABEL: Record<string, string> = {
  MCQ: "Chọn đáp án",
  FILL_BLANK: "Điền vào chỗ trống",
  TRUE_FALSE: "Đúng / Sai",
  MATCHING: "Nối",
  SHORT_ANSWER: "Trả lời ngắn",
};

function optionTexts(options: unknown): string[] {
  if (!Array.isArray(options)) return [];
  return options.map((o) => {
    if (o && typeof o === "object" && "text" in o) return String((o as { text: unknown }).text);
    return String(o);
  });
}

function answerText(q: PdfQuestion, opts: string[]): string {
  // correctAnswer có thể là object {index|value|text|accepted}, hoặc (dữ liệu cũ)
  // là chuỗi / mảng. Cố gắng suy ra đáp án cho mọi dạng.
  const ca = q.correctAnswer;
  if (typeof ca === "string") return ca;
  if (Array.isArray(ca)) return ca.map(String).join(" / ");
  const o = (ca ?? {}) as { index?: number; value?: boolean; text?: string; accepted?: string[] };
  if (q.type === "MCQ" && typeof o.index === "number") return opts[o.index] ?? "";
  if (q.type === "TRUE_FALSE" && typeof o.value === "boolean") return o.value ? "Đúng" : "Sai";
  if (o.text) return o.text;
  if (Array.isArray(o.accepted) && o.accepted.length) return o.accepted.join(" / ");
  return "";
}

/** Bảng câu hỏi + đáp án (answer key) cho PDF Đọc/Nghe. */
export function PdfQuestionList({ questions }: { questions: PdfQuestion[] }) {
  if (questions.length === 0) {
    return <p style={{ fontSize: 13, color: PDF.muted }}>Chưa có câu hỏi.</p>;
  }
  return (
    <ol style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {questions.map((q, i) => {
        const opts = optionTexts(q.options);
        const ans = answerText(q, opts);
        return (
          <li
            key={q.id}
            style={{
              breakInside: "avoid",
              border: `1px solid ${PDF.line}`,
              background: PDF.paperTint,
              borderRadius: 10,
              padding: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <PdfNumChip n={i + 1} size={20} />
              <PdfTag>{TYPE_LABEL[q.type] ?? q.type}</PdfTag>
            </div>
            <div style={{ fontFamily: PDF_FONT.word, fontSize: 15, color: PDF.ink }}>{q.prompt}</div>
            {q.promptTranslation && (
              <div style={{ fontSize: 12, fontStyle: "italic", color: PDF.muted, marginTop: 2 }}>
                {q.promptTranslation}
              </div>
            )}
            {opts.length > 0 && (
              <div
                style={{
                  marginTop: 7,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  columnGap: 16,
                  rowGap: 3,
                }}
              >
                {opts.map((o, oi) => (
                  <div key={oi} style={{ fontFamily: PDF_FONT.word, fontSize: 13, color: PDF.ink2 }}>
                    <span style={{ color: PDF.faint, fontWeight: 700 }}>{OPT_LETTERS[oi] ?? oi + 1}.</span> {o}
                  </div>
                ))}
              </div>
            )}
            <PdfAnswer>
              <PdfAnswerLine>{ans || "— (xem trên dingdongkids.com)"}</PdfAnswerLine>
              {q.supportingQuote && (
                <div style={{ marginTop: 3, fontSize: 12.5, color: PDF.correct }}>
                  <span style={{ fontWeight: 700 }}>Câu trong bài: </span>
                  <span style={{ fontFamily: PDF_FONT.word }}>{q.supportingQuote}</span>
                  {q.quoteTranslation && (
                    <span style={{ color: PDF.muted, fontStyle: "italic" }}> — {q.quoteTranslation}</span>
                  )}
                </div>
              )}
              {q.explanation && (
                <div style={{ marginTop: 3, fontSize: 12.5, color: PDF.ink2 }}>
                  <span style={{ fontWeight: 700, color: PDF.ink }}>Vì sao: </span>
                  {q.explanation}
                </div>
              )}
            </PdfAnswer>
          </li>
        );
      })}
    </ol>
  );
}
