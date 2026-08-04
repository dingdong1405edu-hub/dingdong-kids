"use client";
// Thẻ chọn phim ở trang "Xem hoạt hình".
//
// Ảnh bìa lấy thẳng từ YouTube. Nếu ảnh chưa về (mạng chậm) hoặc video đã bị gỡ
// thì lớp nền gradient + emoji ở dưới vẫn hiện — thẻ không bao giờ trống trơn,
// bé vẫn nhận ra phim bằng màu và hình.
import Image from "next/image";
import Link from "next/link";
import { Play, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  CARTOON_LEVEL_LABEL,
  CARTOON_SECTION,
  STARS_PER_LINE,
  type Cartoon,
} from "@/lib/cartoons";

interface Props {
  cartoon: Cartoon;
  /** Tổng sao cao nhất bé từng đạt ở phim này (0 = chưa xem). */
  bestStars: number;
}

export function CartoonCard({ cartoon, bestStars }: Props) {
  const maxStars = cartoon.lines.length * STARS_PER_LINE;
  const percent = maxStars > 0 ? Math.round((bestStars / maxStars) * 100) : 0;

  return (
    <Link href={`${CARTOON_SECTION.href}/${cartoon.id}`} className="group block">
      <Card className="sticker overflow-hidden transition-all duration-200 ease-toy hover:-translate-y-1.5 hover:shadow-soft-lg">
        <div className={cn("relative aspect-video w-full bg-gradient-to-br", cartoon.cover)}>
          <span
            className="absolute inset-0 flex items-center justify-center text-6xl drop-shadow"
            aria-hidden
          >
            {cartoon.emoji}
          </span>
          <Image
            src={`https://i.ytimg.com/vi/${cartoon.youtubeId}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 320px"
            className="object-cover transition-transform duration-200 ease-toy group-hover:scale-105"
          />
          {/* Nút play to đùng: bé chọn phim bằng hình, không bằng chữ. */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-soft-lg transition-transform duration-200 ease-toy group-hover:scale-110">
              <Play className="ml-1 h-8 w-8 fill-current" />
            </span>
          </span>
          {bestStars > 0 && (
            <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-extrabold text-amber-600 shadow-soft">
              <Star className="h-3.5 w-3.5 fill-current" />
              {bestStars}/{maxStars}
            </span>
          )}
        </div>

        <div className="space-y-1 p-4">
          <div className="font-display text-lg font-extrabold leading-tight">{cartoon.title}</div>
          <div className="text-[13px] font-semibold text-muted-foreground">{cartoon.titleEn}</div>
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-bold">
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
              {CARTOON_LEVEL_LABEL[cartoon.level]}
            </span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
              {cartoon.lines.length} câu
            </span>
            {percent > 0 && (
              <span className="rounded-full bg-sunny/15 px-2 py-0.5 text-amber-600">
                Bé đã đi {percent}%
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
