"use client";
// ===========================================================================
//  BÁO CÁO CHO BỐ MẸ — phần này KHÔNG dành cho bé đọc.
//
//  Người trả tiền là phụ huynh, và câu hỏi họ thật sự cần trả lời là "con tôi
//  đang ở đâu, vướng chỗ nào, giờ làm gì tiếp". Màn hình đầy sao của bé không
//  trả lời được câu đó. Vì vậy đây là khối duy nhất trong cả cấp viết bằng
//  giọng người lớn: số liệu gọn, từ bé còn yếu, và MỘT việc nên làm tiếp.
// ===========================================================================
import Link from "next/link";
import { Star, Mic, BookOpenCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FIRST_WORDS_LEVEL,
  REVIEW_MAX_WORDS,
  REVIEW_UNIT_ID,
  type WeakWord,
} from "@/lib/first-words";

interface Props {
  totalStars: number;
  maxStars: number;
  wordsSaid: number;
  totalWords: number;
  /** Số chủ đề bé đã chơi ít nhất một lần. */
  startedUnits: number;
  totalUnits: number;
  weakWords: WeakWord[];
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-card px-3 py-3 text-center shadow-soft">
      <div className="mb-1 flex justify-center text-muted-foreground">{icon}</div>
      <div className="font-display text-xl font-extrabold tabular-nums">{value}</div>
      <div className="text-[11px] font-semibold text-muted-foreground">{label}</div>
    </div>
  );
}

export function ParentReport({
  totalStars,
  maxStars,
  wordsSaid,
  totalWords,
  startedUnits,
  totalUnits,
  weakWords,
}: Props) {
  const untouched = totalStars === 0;

  return (
    <div className="rounded-3xl border-2 border-dashed border-border/70 bg-muted/30 p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-display text-base font-extrabold">👨‍👩‍👧 Góc bố mẹ</p>
        {!untouched && (
          <span className="rounded-full bg-card px-2.5 py-1 text-[11px] font-bold text-muted-foreground shadow-soft">
            {startedUnits}/{totalUnits} chủ đề đã học
          </span>
        )}
      </div>

      {untouched ? (
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          Bé chưa bắt đầu chủ đề nào. Bố mẹ ngồi cạnh bé buổi đầu tiên nhé — chọn một chủ đề bé thích,
          bấm <b>Bắt đầu</b>, rồi để bé nhìn hình và nói theo. Mỗi buổi 5–10 phút là vừa sức.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2.5">
            <Stat
              icon={<Star className="h-4 w-4 fill-sunny text-sunny" />}
              value={`${totalStars}/${maxStars}`}
              label="sao đã đạt"
            />
            <Stat
              icon={<Mic className="h-4 w-4" />}
              value={`${wordsSaid}/${totalWords}`}
              label="từ bé nói được"
            />
            <Stat
              icon={<BookOpenCheck className="h-4 w-4" />}
              value={`${weakWords.length}`}
              label="từ cần ôn lại"
            />
          </div>

          {weakWords.length > 0 ? (
            <div className="mt-4">
              <p className="text-[13px] font-bold">Bé còn vướng ở những từ này:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {weakWords.slice(0, REVIEW_MAX_WORDS).map((w) => (
                  <span
                    key={`${w.unitId}-${w.word}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-[13px] font-semibold shadow-soft"
                  >
                    <span aria-hidden>{w.emoji}</span>
                    <span className="font-primer">{w.word}</span>
                    <span className="text-muted-foreground">· {w.vi}</span>
                    <span className="inline-flex items-center gap-0.5 text-[11px] font-extrabold text-sunny">
                      {w.stars}
                      <Star className="h-3 w-3 fill-sunny" />
                    </span>
                  </span>
                ))}
              </div>
              <Link href={`${FIRST_WORDS_LEVEL.href}/${REVIEW_UNIT_ID}`} className="mt-3 block">
                <Button className="btn-chunky h-14 w-full rounded-2xl font-display text-base font-extrabold">
                  🔁 Ôn lại {Math.min(weakWords.length, REVIEW_MAX_WORDS)} từ này với bé
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Button>
              </Link>
            </div>
          ) : (
            <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
              Chưa có từ nào cần ôn — những từ bé đã thử đều đạt 3 sao. Bố mẹ cho bé mở thêm một chủ đề mới nhé.
            </p>
          )}
        </>
      )}

      <ul className="mt-4 space-y-1.5 border-t border-border/60 pt-3 text-[13px] leading-relaxed text-muted-foreground">
        <li>• Bé cần được cấp quyền <b>micro</b> để tập nói và được AI chấm phát âm.</li>
        <li>
          • Nút 👁️ trong bài học bật/tắt phần chữ tiếng Anh — mặc định ẩn để bé nghe bằng tai chứ không
          đoán theo mặt chữ.
        </li>
        <li>
          • Máy nhận giọng trẻ em kém chính xác hơn giọng người lớn, nên phần chấm ở đây cố ý{" "}
          <b>rất rộng lượng</b>: bé chịu nói là đã có sao.
        </li>
      </ul>
    </div>
  );
}
