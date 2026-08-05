import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Film } from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { CartoonCard } from "@/components/learn/cartoon/cartoon-card";
import { DingBuddy } from "@/components/marketing/ding-buddy";
import { CARTOON_LEVEL_ORDER, CARTOON_SECTION } from "@/lib/cartoons";
import { listCartoons } from "@/lib/cartoons-db";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: CARTOON_SECTION.label,
  description:
    "Bé xem hoạt hình tiếng Anh, phim dừng lại sau mỗi câu để bé nói theo nhân vật và được chấm sao.",
};

/**
 * XEM HOẠT HÌNH — khu "Trải nghiệm".
 *
 * Bé xem phim tiếng Anh, phim tự dừng sau mỗi câu để bé nhắc lại (shadowing) và
 * được chấm sao. Miễn phí, KHÔNG trừ tim: đây là chỗ bé vào khi chỉ muốn xem —
 * và với trẻ con, "được xem hoạt hình" là lý do quay lại app mạnh nhất.
 *
 * Nội dung TĨNH trong code (@/lib/cartoon-data), chỉ tiến độ nằm ở DB.
 */
export default async function CartoonListPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [progress, published] = await Promise.all([
    db.cartoonProgress.findMany({
      where: { userId: session.user.id },
      select: { cartoonId: true, bestStars: true },
    }),
    // Gộp phim gắn từ trang quản trị với phim nằm trong code.
    listCartoons({ publishedOnly: true }),
  ]);
  const starsBy = new Map(progress.map((p) => [p.cartoonId, p.bestStars]));

  // Phim dễ lên trước — bé mở trang là gặp ngay thứ mình nói theo được.
  const cartoons = [...published].sort(
    (a, b) => CARTOON_LEVEL_ORDER.indexOf(a.level) - CARTOON_LEVEL_ORDER.indexOf(b.level),
  );

  return (
    <div className="space-y-6">
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-white shadow-soft-lg sm:p-8",
          CARTOON_SECTION.hero,
        )}
      >
        <div className="relative z-10 max-w-xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/70">
            Trải nghiệm
          </p>
          <h1 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">
            {CARTOON_SECTION.emoji} {CARTOON_SECTION.label}
          </h1>
          <p className="mt-2 text-[15px] font-semibold text-white/90">
            Phim chạy đúng một câu rồi dừng lại. Bé nói theo nhân vật, máy nghe và tặng sao.
          </p>
        </div>
        <DingBuddy
          size={104}
          pose="cheer"
          className="absolute -bottom-2 right-3 hidden opacity-90 sm:block"
        />
      </div>

      {cartoons.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed p-10 text-center">
          <Film className="mx-auto h-14 w-14 text-muted-foreground/50" />
          <p className="mt-3 font-display text-xl font-extrabold">Rạp phim sắp mở cửa!</p>
          <p className="mx-auto mt-1 max-w-md text-sm font-semibold text-muted-foreground">
            Chưa có bộ phim nào được mở. Cô đang chọn phim thật hay cho bé, mai bé quay lại xem nhé!
          </p>
          {session.user.role === "ADMIN" && (
            <p className="mx-auto mt-4 max-w-md rounded-2xl bg-muted/60 p-3 text-[13px] font-semibold text-muted-foreground">
              Quản trị: dán link YouTube ở{" "}
              <Link href="/admin/hoat-hinh" className="text-primary underline underline-offset-2">
                /admin/hoat-hinh
              </Link>{" "}
              là gắn được phim ngay, không phải sửa code.
            </p>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cartoons.map((c) => (
            <CartoonCard key={c.id} cartoon={c} bestStars={starsBy.get(c.id) ?? 0} />
          ))}
        </div>
      )}

      <p className="text-center text-xs font-semibold text-muted-foreground">
        Video do các kênh YouTube gốc phát hành, DingDong Kids chỉ nhúng lại và thêm phần luyện nói.
      </p>
    </div>
  );
}
