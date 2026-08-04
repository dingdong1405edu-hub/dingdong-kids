"use client";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  href: string;
  /** Emoji của module (vd "📚" Từ vựng, "🔤" Ghép vần, "🎧" Nghe hiểu). */
  icon: string;
  title: string;
  subtitle: string;
  progress?: number;
  color: string;
  available?: boolean;
}

/**
 * Thẻ vào một module học. Kiểu "miếng dán" (.sticker) + emoji to để bé nhận ra
 * module bằng HÌNH trước khi đọc chữ.
 */
export function ModuleCard({
  href,
  icon,
  title,
  subtitle,
  progress,
  color,
  available = true,
}: ModuleCardProps) {
  if (!available) {
    return (
      <Card className="sticker cursor-not-allowed bg-muted/60 opacity-70">
        <CardContent className="p-5">
          <div
            className={cn(
              "mb-3 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl grayscale",
              color,
            )}
          >
            {icon}
          </div>
          <div className="font-display text-lg font-extrabold">{title}</div>
          <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
            <Lock className="h-3.5 w-3.5" /> Chưa mở khoá
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link href={href} className="group block h-full">
      <Card className="sticker h-full bg-card transition-all duration-200 ease-toy hover:-translate-y-1.5 hover:border-brand-gold/50 hover:shadow-soft-lg">
        <CardContent className="flex h-full flex-col p-5">
          {/* Ô emoji to hơn chữ rất nhiều: bé chọn module bằng HÌNH, không bằng chữ. */}
          <div
            className={cn(
              "mb-3 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl shadow-soft transition-transform duration-200 ease-toy group-hover:scale-110 group-hover:-rotate-6",
              color,
            )}
          >
            {icon}
          </div>
          <div className="font-display text-lg font-extrabold leading-tight">{title}</div>
          <div className="mt-0.5 text-[13px] leading-snug text-muted-foreground">{subtitle}</div>

          {progress !== undefined ? (
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-[11px] font-bold text-muted-foreground">
                <span>Bé đã đi được</span>
                <span className="font-display text-sm text-brand-gold">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          ) : (
            <div className="mt-auto pt-4">
              <span className="inline-flex items-center gap-1 font-display text-xs font-extrabold text-brand-gold opacity-0 transition-opacity group-hover:opacity-100">
                Học thôi! <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
