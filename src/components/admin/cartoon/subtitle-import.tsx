"use client";
// Dán phụ đề SRT/VTT → ra sẵn toàn bộ câu kèm mốc thời gian.
//
// Đây là đường NHANH NHẤT để gắn một bộ phim: một phim 15 câu bắt tay mất
// khoảng mười lăm phút, dán phụ đề mất mười giây.
//
// Nguồn phụ đề hợp lệ: tệp .srt/.vtt của chính mình, phụ đề tải từ YouTube
// Studio (nếu là kênh của mình), hoặc do chủ kênh gửi. KHÔNG lấy bằng endpoint
// `timedtext` — nó không chính thức và vi phạm điều khoản của YouTube.
import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FileUp, Wand2 } from "lucide-react";
import { subtitlesToLines } from "@/lib/subtitle";
import type { CartoonLine } from "@/lib/cartoons";

interface Props {
  /** Câu đọc ra được ghi ĐÈ hay nối thêm là do nơi gọi quyết định. */
  onImport: (lines: CartoonLine[]) => void;
}

export function SubtitleImport({ onImport }: Props) {
  const [raw, setRaw] = useState("");
  const [maxSeconds, setMaxSeconds] = useState(6);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // Xem trước ngay khi gõ: người vận hành thấy được kết quả trước khi bấm nhận,
  // nên chỉnh "câu dài tối đa" cho vừa rồi mới đưa vào.
  const preview = useMemo(() => {
    if (!raw.trim()) return [];
    try {
      return subtitlesToLines(raw, { maxSeconds });
    } catch {
      return [];
    }
  }, [raw, maxSeconds]);

  async function pickFile(file: File | undefined) {
    if (!file) return;
    setRaw(await file.text());
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="srt">Dán nội dung tệp .srt / .vtt</Label>
          <Textarea
            id="srt"
            rows={7}
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder={"1\n00:00:08,200 --> 00:00:11,400\nIt is raining today.\n\n2\n..."}
            className="font-mono text-xs"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <Button variant="outline" onClick={() => fileRef.current?.click()}>
          <FileUp className="mr-1.5 h-4 w-4" /> Chọn tệp
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept=".srt,.vtt,text/plain"
          className="hidden"
          onChange={(e) => void pickFile(e.target.files?.[0])}
        />

        <div className="w-40 space-y-1.5">
          <Label htmlFor="maxsec">Câu dài tối đa (giây)</Label>
          <Input
            id="maxsec"
            type="number"
            min={2}
            max={12}
            step={1}
            value={maxSeconds}
            onChange={(e) => setMaxSeconds(Math.min(12, Math.max(2, Number(e.target.value) || 6)))}
          />
        </div>

        <Button
          onClick={() => onImport(preview)}
          disabled={preview.length === 0}
          className="font-bold"
        >
          <Wand2 className="mr-1.5 h-4 w-4" /> Nhận {preview.length} câu
        </Button>
      </div>

      <p className="text-xs font-semibold text-muted-foreground">
        Phụ đề hay cắt một câu làm hai ba dòng — công cụ tự gộp lại tới khi gặp dấu chấm câu, và
        cắt khi vượt số giây ở trên. Dòng nhạc nền (♪, [Music]) bị bỏ. Nghĩa tiếng Việt để trống,
        điền sau ở danh sách bên dưới.
      </p>

      {preview.length > 0 && (
        <div className="max-h-48 space-y-1 overflow-y-auto rounded-xl bg-muted/50 p-3">
          {preview.slice(0, 40).map((l, i) => (
            <div key={i} className="flex gap-3 text-xs">
              <span className="w-24 shrink-0 font-mono text-muted-foreground">
                {l.start.toFixed(1)}→{l.end.toFixed(1)}
              </span>
              <span className="truncate font-semibold">{l.text}</span>
            </div>
          ))}
          {preview.length > 40 && (
            <p className="text-xs font-semibold text-muted-foreground">
              …và {preview.length - 40} câu nữa
            </p>
          )}
        </div>
      )}
    </div>
  );
}
