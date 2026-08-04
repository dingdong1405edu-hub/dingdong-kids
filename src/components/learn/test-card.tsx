import Link from "next/link";
import { Users, FileDown } from "lucide-react";
import { cn, coverGradient, levelBadgeClass, levelLabel, socialProofCount } from "@/lib/utils";
import { DingCover } from "@/components/learn/ding-cover";

/** Chấm màu đầu mỗi dòng nhãn — xoay vòng theo bảng brand cho vui mắt. */
const TAG_DOTS = ["bg-brand-teal", "bg-brand-gold", "bg-brand-coral", "bg-brand-sky", "bg-brand-grape"];

interface TestCardProps {
  href: string;
  title: string;
  level?: string;
  tags?: string[];
  attempts?: number;
  score?: number | null;
  meta?: string;
  seed?: string;
  /** Ảnh minh hoạ của bài. Chưa có thì hiện bìa gradient + emoji (DingCover). */
  imageUrl?: string | null;
  /** Khi có → hiện nút "Tải PDF" góc phải (link riêng, không lồng trong link thẻ). */
  pdfHref?: string;
}

/**
 * Thẻ một bài luyện tập. Kiểu "miếng dán" (.sticker) bo tròn, ảnh bìa cao và
 * tiêu đề to để bé nhận ra bài bằng HÌNH trước khi đọc chữ.
 */
export function TestCard({ href, title, level, tags, attempts, score, meta, seed, imageUrl, pdfHref }: TestCardProps) {
  const s = seed ?? href;
  const grad = coverGradient(s);

  return (
    <div className="group relative block">
      {pdfHref && (
        <Link
          href={pdfHref}
          aria-label="Tải PDF"
          title="Tải PDF"
          className="absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded-full bg-card/95 px-3 py-1.5 font-display text-[11px] font-extrabold text-foreground shadow-soft transition-colors hover:bg-card"
        >
          <FileDown className="h-3.5 w-3.5" /> PDF
        </Link>
      )}
      <Link href={href} className="block">
        <div className="sticker h-full overflow-hidden bg-card p-0 transition-all duration-200 ease-toy hover:-translate-y-1.5 hover:border-brand-gold/50 hover:shadow-soft-lg">
          {/* Bìa */}
          <div className={cn("relative h-32 overflow-hidden", imageUrl && "bg-gradient-to-br", imageUrl && grad)}>
            {imageUrl ? (
              // Ảnh admin tải lên. Dùng <img> thường (không next/image) để mọi URL
              // admin nhập đều hiện được mà không phải khai báo remotePatterns.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
            ) : (
              // Chưa có ảnh → bìa gradient + emoji cho đỡ trống.
              <DingCover
                seed={s}
                className="absolute inset-0 transition-transform duration-200 group-hover:scale-105"
              />
            )}
            {/* Lớp phủ cacao mờ viết bằng hsl literal (không dùng token): nó nằm
                TRÊN ảnh bìa nhiều màu nên phải tối ở CẢ hai chế độ, nếu theo
                token thì ở chế độ tối nó sẽ đảo thành kem và chữ trắng mất hút. */}
            {typeof attempts === "number" && (
              <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-[hsl(27_58%_15%/0.55)] px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
                <Users className="h-3 w-3" /> {(attempts + socialProofCount(s)).toLocaleString("vi-VN")} bạn nhỏ đã làm
              </span>
            )}
            {level && (
              <span className={cn("absolute bottom-2 left-2 rounded-full px-3 py-1 font-display text-[11px] font-extrabold shadow-soft", levelBadgeClass(level))}>
                {levelLabel(level)}
              </span>
            )}
            {typeof score === "number" && (
              <span className="absolute bottom-2 right-2 rounded-full bg-card/95 px-3 py-1 font-display text-[11px] font-extrabold text-brand-teal shadow-soft">
                {Math.round(score)}%
              </span>
            )}
          </div>

          {/* Thân thẻ */}
          <div className="p-4">
            <h3 className="line-clamp-2 min-h-[2.75rem] font-display text-[16px] font-extrabold leading-snug transition-colors group-hover:text-brand-gold">
              {title}
            </h3>
            {meta && <p className="mt-1 text-xs font-semibold text-muted-foreground">{meta}</p>}
            {tags && tags.length > 0 && (
              <ul className="mt-2 space-y-1">
                {tags.map((t, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                    <span className={cn("h-2 w-2 shrink-0 rounded-full", TAG_DOTS[i % TAG_DOTS.length])} />
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
