import * as React from "react";
import { PdfDocument, PdfSection } from "@/components/learn/pdf/pdf-document";
import { PdfQuestionList, type PdfQuestion } from "@/components/learn/pdf/pdf-question-list";
import { PDF, PDF_FONT } from "@/lib/pdf/theme";

/** Phạm vi in cho Đọc/Nghe: cả 2 · chỉ bài đọc (lời thoại) · chỉ câu hỏi & đáp án. */
export type PassageScope = "both" | "passage" | "questions";

interface Props {
  title: string;
  level: string;
  passage: string;
  questions: PdfQuestion[];
  scope?: PassageScope;
}

/**
 * Khối bài đọc (nền nhạt, gạch nhấn bên trái).
 *
 * Văn bản thuần, cỡ chữ lớn và giãn dòng rộng để trẻ không lạc dòng khi đọc
 * trên giấy — không chèn lớp phiên âm nào lên trên mặt chữ.
 */
export function PdfPassage({ passage }: { passage: string }) {
  return (
    <div
      style={{
        borderRadius: 10,
        border: `1px solid ${PDF.line}`,
        borderLeft: `3px solid ${PDF.brand}`,
        background: PDF.paperTint,
        padding: "12px 14px",
      }}
    >
      <p
        style={{
          whiteSpace: "pre-line",
          fontFamily: PDF_FONT.sans,
          fontSize: 16,
          lineHeight: 2,
          color: PDF.ink,
          margin: 0,
        }}
      >
        {passage}
      </p>
    </div>
  );
}

/** PDF đọc hiểu: bài đọc + câu hỏi & đáp án. */
export function ReadingPdf({ title, level, passage, questions, scope = "both" }: Props) {
  return (
    <PdfDocument kicker="Đọc hiểu" title={title} level={level}>
      {scope !== "questions" && (
        <PdfSection title="Bài đọc">
          <PdfPassage passage={passage} />
        </PdfSection>
      )}
      {scope !== "passage" && (
        <PdfSection title="Câu hỏi & đáp án">
          <PdfQuestionList questions={questions} />
        </PdfSection>
      )}
    </PdfDocument>
  );
}
