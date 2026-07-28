import * as React from "react";
import { PdfDocument, PdfTag } from "@/components/learn/pdf/pdf-document";
import { PDF, PDF_FONT } from "@/lib/pdf/theme";

interface Props {
  title: string;
  taskTypeLabel: string;
  level: string;
  /** Đề bài bằng tiếng Anh (bản chính). */
  prompt: string;
  /** Dàn ý gợi ý, mỗi ý một dòng. */
  outline?: string | null;
  /** Số TỪ tối thiểu (tiếng Anh đếm từ, không đếm ký tự). */
  minWords: number;
  timeLimit: number;
}

/** PDF tập viết: đề bài + dàn ý gợi ý + yêu cầu (số từ, thời gian) + giấy kẻ ly để bé viết tay. */
export function WritingPdf({ title, taskTypeLabel, level, prompt, outline, minWords, timeLimit }: Props) {
  const outlineItems = (outline ?? "")
    .split("\n")
    .map((line) => line.replace(/^\s*[-*•]\s*/, "").trim())
    .filter(Boolean);

  return (
    <PdfDocument kicker="Tập viết" title={title} subtitle={taskTypeLabel} level={level}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
        <PdfTag tone="brand">Viết ít nhất {minWords} từ</PdfTag>
        {timeLimit > 0 && <PdfTag tone="gold">{Math.round(timeLimit / 60)} phút</PdfTag>}
      </div>

      <div
        style={{
          borderRadius: 10,
          border: `1px solid ${PDF.line}`,
          borderLeft: `3px solid ${PDF.brand}`,
          background: PDF.paperTint,
          padding: "12px 14px",
          marginBottom: 12,
        }}
      >
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: PDF.gold }}>
          Đề bài
        </div>
        <p
          style={{
            marginTop: 4,
            whiteSpace: "pre-line",
            fontFamily: PDF_FONT.word,
            fontSize: 15,
            color: PDF.ink,
            lineHeight: 1.7,
          }}
        >
          {prompt}
        </p>
      </div>

      {outlineItems.length > 0 && (
        <div
          style={{
            borderRadius: 10,
            border: `1px solid ${PDF.goldBorder}`,
            background: PDF.goldSoft,
            padding: "12px 14px",
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: PDF.gold }}>
            Gợi ý cho bé
          </div>
          <ul style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 4 }}>
            {outlineItems.map((item, i) => (
              <li key={i} style={{ display: "flex", gap: 7, fontSize: 14, color: PDF.ink2 }}>
                <span style={{ color: PDF.gold, fontWeight: 800 }}>•</span>
                <span style={{ whiteSpace: "pre-line" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <div style={{ marginBottom: 6, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: PDF.faint }}>
          Bé viết ở đây
        </div>
        <WritingLines />
      </div>
    </PdfDocument>
  );
}

/**
 * Giấy kẻ ly kiểu vở tập viết tiếng Anh: mỗi dòng có một đường kẻ chân (baseline)
 * và một đường đứt ở giữa để bé canh chiều cao chữ thường (x-height). Dựng bằng
 * BORDER chứ không phải ảnh nền — border luôn in ra được, không phụ thuộc cài đặt
 * "in nền" của máy in.
 */
function WritingLines() {
  const rows = 12;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 34,
            borderBottom: `1.5px solid ${PDF.line}`,
            breakInside: "avoid",
          }}
        >
          <div style={{ height: 17, borderBottom: `1px dashed ${PDF.goldBorder}` }} />
        </div>
      ))}
    </div>
  );
}
