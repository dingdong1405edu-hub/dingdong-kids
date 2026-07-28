import * as React from "react";
import { PdfDocument } from "@/components/learn/pdf/pdf-document";
import { PDF, PDF_FONT } from "@/lib/pdf/theme";

interface Sentence {
  text: string;
}
interface Question {
  question: string;
  /** Câu trả lời mẫu để ba mẹ gợi ý khi bé bí. */
  sampleAnswer?: string;
}

interface Props {
  title: string;
  level: string;
  part1: Sentence[];
  part2: Sentence | null;
  part3: Question[];
}

function PartBlock({
  n,
  label,
  hint,
  children,
}: {
  n: number;
  label: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 16, breakInside: "avoid" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: 8,
            background: PDF.brand,
            color: "#fff",
            fontSize: 12,
            fontWeight: 800,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {n}
        </span>
        <h2 style={{ margin: 0, fontFamily: PDF_FONT.display, fontSize: 14, fontWeight: 800, color: PDF.brandDark }}>
          {label}
        </h2>
        <span style={{ fontSize: 12, color: PDF.faint }}>{hint}</span>
      </div>
      {children}
    </section>
  );
}

function SentenceRow({ n, text, note }: { n: number; text: string; note?: string }) {
  return (
    <li style={{ breakInside: "avoid", display: "flex", gap: 7, padding: "4px 0", alignItems: "baseline" }}>
      <span style={{ color: PDF.faint, fontWeight: 700, fontSize: 12, minWidth: 16 }}>{n}.</span>
      <span>
        <span style={{ fontFamily: PDF_FONT.word, fontSize: 15, color: PDF.ink }}>{text}</span>
        {note && (
          <span style={{ marginLeft: 8, fontSize: 12, fontStyle: "italic", color: PDF.muted }}>({note})</span>
        )}
      </span>
    </li>
  );
}

/**
 * PDF luyện nói theo format Cambridge Speaking: 3 phần — nhắc lại câu, đọc to
 * đoạn văn, trả lời câu hỏi về bản thân. Bản in dành cho ba mẹ ngồi cùng bé:
 * ba mẹ đọc mẫu, bé nhắc lại.
 */
export function SpeakingPdf({ title, level, part1, part2, part3 }: Props) {
  return (
    <PdfDocument kicker="Luyện nói" title={title} level={level}>
      <div
        style={{
          marginBottom: 14,
          borderRadius: 10,
          border: `1px solid ${PDF.goldBorder}`,
          background: PDF.goldSoft,
          color: "#7a5a16",
          padding: "9px 13px",
          fontSize: 12.5,
          lineHeight: 1.5,
        }}
      >
        🗣️ Ba mẹ đọc mẫu từng câu, bé nghe rồi nói to lại. Khen bé trước, sửa sau — sai một chút cũng không sao cả.
      </div>

      {part1.length > 0 && (
        <PartBlock n={1} label="Nghe rồi nhắc lại" hint="Ba mẹ đọc — bé nói theo">
          <ol style={{ display: "flex", flexDirection: "column" }}>
            {part1.map((s, i) => (
              <SentenceRow key={i} n={i + 1} text={s.text} />
            ))}
          </ol>
        </PartBlock>
      )}

      {part2 && part2.text && (
        <PartBlock n={2} label="Đọc to đoạn văn" hint="Bé tự đọc thành tiếng">
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
                fontFamily: PDF_FONT.word,
                fontSize: 16,
                lineHeight: 2,
                color: PDF.ink,
                margin: 0,
              }}
            >
              {part2.text}
            </p>
          </div>
        </PartBlock>
      )}

      {part3.length > 0 && (
        <PartBlock n={3} label="Trả lời câu hỏi" hint="Bé trả lời theo ý mình">
          <ol style={{ display: "flex", flexDirection: "column" }}>
            {part3.map((q, i) => (
              <SentenceRow key={i} n={i + 1} text={q.question} note={q.sampleAnswer} />
            ))}
          </ol>
        </PartBlock>
      )}
    </PdfDocument>
  );
}
