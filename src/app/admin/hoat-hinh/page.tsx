import { requireAdmin } from "@/lib/admin-guard";
import { Card, CardContent } from "@/components/ui/card";
import { CartoonStudio } from "@/components/admin/cartoon-studio";
import { CARTOONS } from "@/lib/cartoons";
import { Clapperboard } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

/**
 * Studio soạn nội dung cho khu "Xem hoạt hình" (Trải nghiệm).
 *
 * Trang này KHÔNG ghi database — phim là dữ liệu tĩnh trong code
 * (src/lib/cartoon-data), cùng khuôn với "Bé Tập Nói" và Phonics. Đầu ra của
 * studio là một đoạn TypeScript để dán vào `pack-01.ts`.
 *
 * Vì sao không làm CRUD trên DB cho tiện: nội dung ở đây rất ít thay đổi
 * (thêm phim mới vài tuần một lần), lại cần đi qua `npm run content:check` —
 * cổng bắt lỗi mốc thời gian mà một form web không kiểm được. Giữ trong code
 * còn cho phép xem lại lịch sử sửa nội dung bằng git.
 */
export default async function AdminCartoonPage() {
  await requireAdmin();

  const total = CARTOONS.length;
  const published = CARTOONS.filter((c) => c.published).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 font-display text-2xl font-extrabold">
          <Clapperboard className="h-6 w-6 text-primary" /> Hoạt hình — bắt mốc thời gian
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Kho hiện có <strong>{total}</strong> phim ({published} đã mở cho bé). Nội dung nằm trong{" "}
          <code>src/lib/cartoon-data/pack-01.ts</code>.
        </p>
      </div>

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="space-y-1.5 p-4 text-sm">
          <p className="font-bold">Ba bước thêm một phim</p>
          <ol className="ml-4 list-decimal space-y-1 text-muted-foreground">
            <li>
              Dán link YouTube rồi bấm <strong>Mở phim</strong>. Nếu báo &ldquo;kênh tắt nhúng&rdquo;
              thì phải đổi phim khác — bé sẽ không xem được.
            </li>
            <li>
              Nghe tới đầu câu bấm <strong>Đặt ĐẦU</strong>, nhân vật nói xong bấm{" "}
              <strong>Đặt CUỐI</strong>, gõ câu tiếng Anh + nghĩa, bấm <strong>Thêm câu</strong>.
              Bấm ▶ ở mỗi dòng để nghe thử lại đúng đoạn vừa bắt.
            </li>
            <li>
              Bấm <strong>Chép mã</strong>, dán vào <code>pack-01.ts</code>, chạy{" "}
              <code>npm run content:check cartoons</code>, xem thử ở{" "}
              <code>/hoat-hinh/&lt;id&gt;</code> rồi mới đặt <code>published: true</code>.
            </li>
          </ol>
        </CardContent>
      </Card>

      <CartoonStudio />

      {total > 0 && (
        <Card>
          <CardContent className="space-y-2 p-4">
            <p className="font-display text-sm font-extrabold">Phim đang có trong kho</p>
            {CARTOONS.map((c) => (
              <div
                key={c.id}
                className="flex flex-wrap items-center gap-3 rounded-xl bg-muted/50 px-3 py-2 text-sm"
              >
                <span className="text-lg" aria-hidden>
                  {c.emoji}
                </span>
                <span className="font-bold">{c.title}</span>
                <span className="text-muted-foreground">{c.lines.length} câu</span>
                <span
                  className={
                    c.published
                      ? "rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                      : "rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                  }
                >
                  {c.published ? "Đã mở" : "Chưa mở"}
                </span>
                <Link
                  href={`/hoat-hinh/${c.id}`}
                  className="ml-auto text-primary underline underline-offset-2"
                >
                  Xem thử
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
