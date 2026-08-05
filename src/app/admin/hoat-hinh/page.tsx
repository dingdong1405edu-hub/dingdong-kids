import { requireAdmin } from "@/lib/admin-guard";
import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { CartoonAdmin } from "@/components/admin/cartoon/cartoon-admin";
import type { AdminCartoon } from "@/components/admin/cartoon/studio";
import { readLines } from "@/lib/cartoons-db";
import { CARTOONS } from "@/lib/cartoons";
import { Clapperboard } from "lucide-react";

export const dynamic = "force-dynamic";

/**
 * Quản lý phim của khu "Xem hoạt hình" (Trải nghiệm).
 *
 * Hai nguồn phim chạy song song:
 *  • DB (model `Cartoon`) — gắn ngay tại đây, không phải deploy lại. Đường
 *    thường dùng.
 *  • Code (`src/lib/cartoon-data`) — nội dung "chính chủ", theo dõi bằng git và
 *    đi qua `npm run content:check`. Chỉ hiện ở đây để biết, không sửa được.
 */
export default async function AdminCartoonPage() {
  await requireAdmin();

  const rows = await db.cartoon.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  const films: AdminCartoon[] = rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    youtubeId: r.youtubeId,
    title: r.title,
    titleEn: r.titleEn,
    emoji: r.emoji,
    cover: r.cover,
    level: r.level,
    channel: r.channel,
    published: r.published,
    order: r.order,
    lines: readLines(r.lines),
  }));

  const codeFilms = CARTOONS.map((c) => ({
    id: c.id,
    title: c.title,
    lines: c.lines.length,
    published: Boolean(c.published),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 font-display text-2xl font-extrabold">
          <Clapperboard className="h-6 w-6 text-primary" /> Xem hoạt hình
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {films.length + codeFilms.length} phim ·{" "}
          {films.filter((f) => f.published).length + codeFilms.filter((f) => f.published).length} đã mở
          cho bé.
        </p>
      </div>

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="space-y-1.5 p-4 text-sm">
          <p className="font-bold">Gắn một phim mất chưa tới một phút</p>
          <ol className="ml-4 list-decimal space-y-1 text-muted-foreground">
            <li>
              Dán link YouTube → hệ thống tự lấy tên phim, tên kênh, và tự kiểm phim có{" "}
              <strong>cho nhúng</strong> không. Không cho nhúng thì phải đổi phim, bé sẽ chỉ thấy ô đen.
            </li>
            <li>
              Có tệp phụ đề <code>.srt</code>/<code>.vtt</code> thì dán vào — ra sẵn toàn bộ câu kèm
              mốc thời gian. Không có thì bắt tay: bấm <kbd>Space</kbd> ở đầu và cuối mỗi câu.
            </li>
            <li>
              Bấm ▶ nghe thử vài câu, chỉnh mốc bằng nút <strong>−/+</strong> nếu lệch, rồi{" "}
              <strong>Lưu</strong>. Xem thử trọn một lượt xong mới bấm <strong>Mở cho bé</strong>.
            </li>
          </ol>
          <p className="pt-1 text-xs">
            Phụ đề phải là tệp của mình hoặc do chủ kênh cung cấp — không lấy tự động từ YouTube,
            điều khoản của họ không cho phép.
          </p>
        </CardContent>
      </Card>

      <CartoonAdmin films={films} codeFilms={codeFilms} />
    </div>
  );
}
