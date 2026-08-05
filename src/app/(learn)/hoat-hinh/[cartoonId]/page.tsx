import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ShadowFlow } from "@/components/learn/cartoon/shadow-flow";
import { CARTOON_SECTION } from "@/lib/cartoons";
import { findCartoon, findNextCartoon } from "@/lib/cartoons-db";

interface Props {
  params: Promise<{ cartoonId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cartoonId } = await params;
  const cartoon = await findCartoon(cartoonId);
  if (!cartoon) return { title: CARTOON_SECTION.label };
  return {
    title: `${cartoon.title} — ${CARTOON_SECTION.label}`,
    description: `Bé xem "${cartoon.titleEn}" và nói theo ${cartoon.lines.length} câu tiếng Anh.`,
  };
}

export default async function CartoonPlayPage({ params }: Props) {
  const { cartoonId } = await params;
  const cartoon = await findCartoon(cartoonId);
  if (!cartoon || cartoon.lines.length === 0) notFound();

  const session = await auth();
  if (!session?.user) redirect("/login");

  // Phim chưa duyệt chỉ người quản trị mở được — để xem thử trọn một lượt trước
  // khi đặt `published: true`. Với bé thì nó chưa tồn tại.
  const isAdmin = session.user.role === "ADMIN";
  if (!cartoon.published && !isAdmin) notFound();

  const prog = await db.cartoonProgress.findUnique({
    where: { userId_cartoonId: { userId: session.user.id, cartoonId } },
    select: { bestStars: true },
  });

  const next = await findNextCartoon(cartoonId);

  return (
    <>
      {!cartoon.published && (
        <div className="mx-auto mb-4 max-w-2xl rounded-2xl bg-amber-50 px-4 py-2.5 text-center text-[13px] font-bold text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
          Bản xem thử — phim này chưa mở cho bé (<code>published: false</code>). Xem trọn một lượt,
          kiểm mốc thời gian khớp rồi hãy bật.
        </div>
      )}
      <ShadowFlow
        cartoon={cartoon}
        bestStars={prog?.bestStars ?? 0}
        next={next ? { id: next.id, title: next.title, emoji: next.emoji } : null}
      />
    </>
  );
}
