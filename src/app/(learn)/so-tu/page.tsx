import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { BookMarked } from "lucide-react";
import { SavedWordList, type SavedWordItem } from "@/components/learn/vocab/saved-word-list";
import { DingBuddy } from "@/components/marketing/ding-buddy";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sổ từ",
  description: "Những từ tiếng Anh bé đã lưu lại khi đọc truyện và làm bài.",
};

/** "Sổ từ" — danh sách từ bé đã lưu khi tra cứu (đọc hiểu, …). */
export default async function SoTuPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const rows = await db.savedWord.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 500,
  });

  const words: SavedWordItem[] = rows.map((w) => ({
    id: w.id,
    word: w.word,
    ipa: w.ipa,
    meaning: w.meaning,
    level: w.level,
    createdAt: w.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <BookMarked className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">Sổ từ của bé 📒</h1>
          <p className="text-[15px] text-muted-foreground">
            Những từ bé đã cất vào sổ. Tất cả {words.length} từ.
          </p>
        </div>
      </div>

      {words.length === 0 ? (
        <div className="sticker rounded-3xl border-dashed py-16 text-center">
          <DingBuddy size={72} pose="idle" className="mx-auto mb-3" />
          <p className="text-[15px] text-muted-foreground">
            Sổ còn trống. Khi đọc truyện, bé bấm vào một từ rồi chọn “Lưu vào sổ từ” nhé 🌟
          </p>
        </div>
      ) : (
        <SavedWordList words={words} />
      )}
    </div>
  );
}
