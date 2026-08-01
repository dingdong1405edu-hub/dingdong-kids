"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PDF_SCOPES, normalizeScope, payloadToElement, type PdfPayload } from "@/components/learn/pdf/payload";

interface Props {
  payload: PdfPayload;
  /** URL endpoint tạo PDF, vd "/api/pdf/reading/abc" (scope sẽ được nối thêm). */
  downloadBase: string;
  backHref: string;
}

/**
 * Trang XEM TRƯỚC tài liệu PDF: hiển thị đúng nội dung sẽ in, cho chọn phạm vi in
 * (Mẫu câu/Bài tập/Cả 2 với ngữ pháp; Bài đọc/Câu hỏi/Cả 2 với đọc–nghe) rồi mới
 * bấm "Tải PDF" (tạo file thật ở server, tải về cả trên điện thoại lẫn máy tính).
 *
 * Người bấm ở đây là BA MẸ (in bài ra cho bé làm trên giấy), nên chữ viết cho
 * người lớn chứ không phải cho trẻ.
 */
export function PdfPreviewClient({ payload, downloadBase, backHref }: Props) {
  const scopes = PDF_SCOPES[payload.kind];
  const [scope, setScope] = useState<string>(normalizeScope(payload.kind, undefined));

  const params = new URLSearchParams();
  if (scopes) params.set("scope", scope);
  const qs = params.toString();
  const downloadUrl = qs ? `${downloadBase}?${qs}` : downloadBase;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {/* Thanh công cụ */}
      <div className="sticker flex flex-col gap-3 bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Quay lại
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {scopes && (
            <div className="flex rounded-2xl border-2 p-0.5">
              {scopes.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setScope(s.key)}
                  className={cn(
                    "rounded-xl px-3 py-1.5 text-sm font-bold transition-colors",
                    scope === s.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
          <Button asChild className="btn-chunky gap-1.5 font-extrabold">
            <a href={downloadUrl} download>
              <Download className="h-4 w-4" /> Tải PDF
            </a>
          </Button>
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Xem trước nội dung bên dưới rồi bấm <span className="font-bold">“Tải PDF”</span> để in cho bé làm trên giấy.
      </p>

      {/* Bản xem trước (đúng như file PDF) */}
      <div className="overflow-x-auto rounded-3xl border-2 bg-muted/30 p-3 sm:p-6">
        <div className="mx-auto w-full max-w-[760px] rounded-2xl bg-white p-5 shadow-soft sm:p-8 md:p-10">
          {payloadToElement(payload, scope)}
        </div>
      </div>
    </div>
  );
}
