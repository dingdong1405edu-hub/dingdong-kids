import Link from "next/link";
import { Users, FileDown } from "lucide-react";
import { cn, coverGradient, levelBadgeClass, levelLabel, socialProofCount } from "@/lib/utils";
import { DingCover } from "@/components/learn/ding-cover";

const TAG_DOTS = ["bg-emerald-500", "bg-amber-500", "bg-rose-500", "bg-sky-500", "bg-violet-500"];

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
          className="absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded-full bg-card/95 px-2.5 py-1.5 text-[11px] font-bold text-foreground shadow-soft transition-colors hover:bg-card"
        >
          <FileDown className="h-3.5 w-3.5" /> PDF
        </Link>
      )}
      <Link href={href} className="block">
        <div className="sticker h-full overflow-hidden bg-card p-0 transition-all duration-200 hover:-translate-y-1.5 hover:border-primary/40">
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
            {typeof attempts === "number" && (
              <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
                <Users className="h-3 w-3" /> {(attempts + socialProofCount(s)).toLocaleString("vi-VN")} bạn nhỏ đã làm
              </span>
            )}
            {level && (
              <span className={cn("absolute bottom-2 left-2 rounded-full px-2.5 py-0.5 text-[11px] font-extrabold shadow-soft", levelBadgeClass(level))}>
                {levelLabel(level)}
              </span>
            )}
            {typeof score === "number" && (
              <span className="absolute bottom-2 right-2 rounded-full bg-card/95 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-700 shadow-soft dark:text-emerald-300">
                {Math.round(score)}%
              </span>
            )}
          </div>

          {/* Thân thẻ */}
          <div className="p-4">
            <h3 className="line-clamp-2 min-h-[2.75rem] font-display text-[15px] font-extrabold leading-snug transition-colors group-hover:text-primary">
              {title}
            </h3>
            {meta && <p className="mt-1 text-xs text-muted-foreground">{meta}</p>}
            {tags && tags.length > 0 && (
              <ul className="mt-2 space-y-1">
                {tags.map((t, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", TAG_DOTS[i % TAG_DOTS.length])} />
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
