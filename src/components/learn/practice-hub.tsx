import Link from "next/link";
import { Sparkles, ArrowRight, Info, CheckCircle2, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Accent = "red" | "green" | "blue" | "amber" | "teal" | "rose" | "indigo" | "violet";

/**
 * Mỗi khu luyện tập một sắc riêng, lấy từ hệ `brand-*` / `band-*` (xem
 * DESIGN-SYSTEM.md §2) thay cho bảng màu mặc định của Tailwind. Nhờ vậy KHÔNG
 * cần cặp `dark:` viết tay nữa — nhóm token này tự dịu lại ở chế độ tối.
 *
 * `btn` đặt luôn `--edge` (màu gờ 3D dưới nút, tối hơn mặt nút một bậc) vì
 * <Button> mặc định lấy gờ cam nắng đi với nút vàng; đổi mặt nút mà quên gờ thì
 * nút trông như bị dán sai mảnh.
 */
const ACCENTS: Record<Accent, { text: string; iconBg: string; btn: string; banner: string }> = {
  red: { text: "text-brand-coral", iconBg: "bg-brand-coral/15 text-brand-coral", btn: "bg-brand-coral text-white [--edge:hsl(6_72%_50%)]", banner: "border-2 border-brand-coral/30 from-band-coral to-card" },
  green: { text: "text-brand-teal", iconBg: "bg-brand-lime/20 text-brand-teal", btn: "bg-brand-lime text-white [--edge:hsl(137_58%_38%)]", banner: "border-2 border-brand-lime/30 from-band-mint to-card" },
  blue: { text: "text-brand-sky", iconBg: "bg-brand-sky/15 text-brand-sky", btn: "bg-brand-sky text-white [--edge:hsl(201_85%_38%)]", banner: "border-2 border-brand-sky/30 from-band-sky to-card" },
  amber: { text: "text-brand-gold", iconBg: "bg-brand-gold/15 text-brand-gold", btn: "bg-sunny text-sunny-foreground [--edge:hsl(var(--c-sun))]", banner: "border-2 border-brand-honey/35 from-band-yel to-card" },
  teal: { text: "text-brand-teal", iconBg: "bg-brand-teal/15 text-brand-teal", btn: "bg-brand-teal text-white [--edge:hsl(172_79%_28%)]", banner: "border-2 border-brand-teal/30 from-band-sky to-card" },
  rose: { text: "text-brand-pink", iconBg: "bg-brand-pink/15 text-brand-pink", btn: "bg-brand-pink text-white [--edge:hsl(335_72%_49%)]", banner: "border-2 border-brand-pink/30 from-band-coral to-card" },
  indigo: { text: "text-brand-blue", iconBg: "bg-brand-blue/15 text-brand-blue", btn: "bg-brand-blue text-white [--edge:hsl(222_72%_40%)]", banner: "border-2 border-brand-blue/30 from-band-lav to-card" },
  violet: { text: "text-brand-grape", iconBg: "bg-brand-grape/15 text-brand-grape", btn: "bg-brand-grape text-white [--edge:hsl(261_72%_48%)]", banner: "border-2 border-brand-grape/30 from-band-lav to-card" },
};

interface PracticeHubProps {
  accent?: Accent;
  icon: React.ReactNode;
  /** Emoji trang trí lớn, mờ ở góc banner. */
  decoChar?: string;
  title: string;
  subtitle: string;
  randomHref?: string;
  randomLabel?: string;
  tips?: string[];
  gridTitle?: string;
  gridSubtitle?: string;
  children?: React.ReactNode;
}

/** Khung đầu trang cho mọi khu luyện tập (Đọc, Nghe, Nói, Viết, Ngữ pháp…). */
export function PracticeHub({
  accent = "blue",
  icon,
  decoChar = "🎈",
  title,
  subtitle,
  randomHref,
  randomLabel = "Chọn giúp bé một bài",
  tips,
  gridTitle,
  gridSubtitle,
  children,
}: PracticeHubProps) {
  const a = ACCENTS[accent];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className={cn("relative overflow-hidden rounded-3xl border bg-gradient-to-br p-5 shadow-soft sm:p-6", a.banner)}>
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {/* Ô biểu tượng to như miếng dán — bé nhận ra khu luyện tập bằng hình. */}
            <div className={cn("flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl shadow-soft-lg", a.iconBg)}>
              {icon}
            </div>
            <div>
              <h1 className="font-display text-2xl font-extrabold sm:text-3xl">
                Luyện <span className={a.text}>{title}</span>
              </h1>
              <p className="mt-0.5 text-[15px] font-semibold text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          {randomHref && (
            <Link href={randomHref} className="shrink-0">
              <Button className={cn("btn-chunky h-12 gap-2 px-6 text-sm font-extrabold", a.btn)}>
                <Sparkles className="h-4 w-4" /> {randomLabel} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
        <div className="pointer-events-none absolute -right-4 -top-6 z-0 select-none text-[130px] leading-none opacity-[0.16] animate-emoji">
          {decoChar}
        </div>
      </div>

      {/* Hộp mách nhỏ */}
      {tips && tips.length > 0 && (
        <div className="sticker bg-card p-5">
          {/* Nhãn nhỏ in hoa. Không dùng class .eyebrow ở đây vì nó ép
              display:inline-block, sẽ phá hàng ngang flex của dòng này. */}
          <div className="mb-3 flex items-center gap-2 text-[13px] font-black uppercase tracking-[0.16em] text-muted-foreground">
            <Info className={cn("h-4 w-4", a.text)} /> Mách nhỏ trước khi làm
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {tips.map((t, i) => (
              <div key={i} className="flex items-start gap-2.5 text-[15px]">
                <CheckCircle2 className={cn("mt-0.5 h-4 w-4 shrink-0", a.text)} />
                <span className="font-semibold text-muted-foreground">{t}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Danh sách bài */}
      {children && (
        <div>
          {gridTitle && (
            <div className="mb-3">
              <h2 className="flex items-center gap-2 font-display text-xl font-extrabold">
                <ListChecks className={cn("h-5 w-5", a.text)} /> {gridTitle}
              </h2>
              {gridSubtitle && <p className="mt-0.5 text-sm font-semibold text-muted-foreground">{gridSubtitle}</p>}
            </div>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
