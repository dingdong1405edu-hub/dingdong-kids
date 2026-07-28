import * as React from "react";
import { PdfDocument, PdfSection, PdfNotice } from "@/components/learn/pdf/pdf-document";
import { PdfQuestionList, type PdfQuestion } from "@/components/learn/pdf/pdf-question-list";
import type { PassageScope } from "@/components/learn/reading/reading-pdf";
import { PDF, PDF_FONT } from "@/lib/pdf/theme";

interface Props {
  title: string;
  level: string;
  transcript?: string | null;
  questions: PdfQuestion[];
  scope?: PassageScope;
}

/** PDF nghe hiểu: ghi chú nghe online + lời thoại + câu hỏi & đáp án. */
export function ListeningPdf({ title, level, transcript, questions, scope = "both" }: Props) {
  return (
    <PdfDocument kicker="Nghe hiểu" title={title} level={level}>
      <PdfNotice>
        🎧 Phần âm thanh nghe trực tiếp trên <b>DingDong Kids</b> — bản in này chỉ gồm lời thoại &amp; đáp án.
      </PdfNotice>
      {scope !== "questions" && transcript && (
        <PdfSection title="Lời thoại">
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
              {transcript}
            </p>
          </div>
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
