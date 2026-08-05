"use client";
// Trang quản lý phim của khu "Xem hoạt hình": danh sách + studio gắn phim.
//
// Giữ danh sách và studio trong CÙNG một component client để gắn xong là thấy
// ngay phim vừa thêm trong danh sách, không phải tải lại trang — người vận hành
// thường gắn liền mấy phim một lượt.
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Eye, EyeOff, ExternalLink, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { CARTOON_LEVEL_LABEL, type CartoonLevel } from "@/lib/cartoons";
import { deleteCartoonAction, toggleCartoonAction } from "@/server/actions/cartoon-admin";
import { CartoonStudio, type AdminCartoon } from "./studio";

interface Props {
  films: AdminCartoon[];
  /** Phim nằm trong code (@/lib/cartoon-data) — chỉ hiện để biết, không sửa được ở đây. */
  codeFilms: { id: string; title: string; lines: number; published: boolean }[];
}

export function CartoonAdmin({ films, codeFilms }: Props) {
  const [editing, setEditing] = useState<AdminCartoon | null>(null);
  const [mode, setMode] = useState<"list" | "studio">("list");
  const [busy, setBusy] = useState<string | null>(null);

  function openNew() {
    setEditing(null);
    setMode("studio");
  }

  function openEdit(film: AdminCartoon) {
    setEditing(film);
    setMode("studio");
  }

  async function toggle(film: AdminCartoon) {
    setBusy(film.id);
    const res = await toggleCartoonAction({ id: film.id, published: !film.published });
    setBusy(null);
    if (!res.ok) toast.error(res.error);
    else toast.success(film.published ? "Đã đóng phim với bé." : "Đã mở phim cho bé xem.");
  }

  async function remove(film: AdminCartoon) {
    if (!window.confirm(`Xoá phim «${film.title}»? Sao bé đã đạt vẫn được giữ lại.`)) return;
    setBusy(film.id);
    const res = await deleteCartoonAction({ id: film.id });
    setBusy(null);
    if (!res.ok) toast.error(res.error);
    else toast.success("Đã xoá phim.");
  }

  if (mode === "studio") {
    return (
      <CartoonStudio
        // Đổi phim đang sửa phải dựng lại studio từ đầu, nếu không các ô nhập
        // vẫn giữ giá trị của phim trước.
        key={editing?.id ?? "new"}
        initial={editing}
        onDone={() => {
          setMode("list");
          setEditing(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-5">
      <Button onClick={openNew} className="font-bold">
        <Plus className="mr-1.5 h-4 w-4" /> Gắn phim mới
      </Button>

      {films.length === 0 && codeFilms.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="font-display text-lg font-extrabold">Chưa có phim nào</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Bấm &ldquo;Gắn phim mới&rdquo;, dán một link YouTube là xong.
            </p>
          </CardContent>
        </Card>
      )}

      {films.length > 0 && (
        <div className="space-y-2">
          {films.map((f) => (
            <Card key={f.id}>
              <CardContent className="flex flex-wrap items-center gap-3 p-3">
                <span className="text-2xl" aria-hidden>
                  {f.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-bold">{f.title || f.titleEn}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {f.lines.length} câu · {CARTOON_LEVEL_LABEL[f.level as CartoonLevel] ?? f.level}
                    {f.channel ? ` · ${f.channel}` : ""}
                    {f.lines.some((l) => !l.vi) ? " · ⚠ có câu thiếu nghĩa tiếng Việt" : ""}
                  </div>
                </div>

                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-bold",
                    f.published
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
                  )}
                >
                  {f.published ? "Đã mở" : "Chưa mở"}
                </span>

                <div className="flex items-center gap-1">
                  <Link href={`/hoat-hinh/${f.slug}`} target="_blank">
                    <Button size="sm" variant="ghost" aria-label="Xem thử">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={busy === f.id}
                    onClick={() => void toggle(f)}
                    aria-label={f.published ? "Đóng với bé" : "Mở cho bé"}
                  >
                    {f.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => openEdit(f)} aria-label="Sửa">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={busy === f.id}
                    onClick={() => void remove(f)}
                    aria-label="Xoá"
                  >
                    <Trash2 className="h-4 w-4 text-rose-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {codeFilms.length > 0 && (
        <Card>
          <CardContent className="space-y-2 p-4">
            <p className="flex items-center gap-1.5 font-display text-sm font-extrabold">
              <Lock className="h-4 w-4" /> Phim nằm trong code
            </p>
            <p className="text-xs text-muted-foreground">
              Sửa ở <code>src/lib/cartoon-data/</code> rồi deploy lại. Không sửa được từ đây.
            </p>
            {codeFilms.map((f) => (
              <div key={f.id} className="flex items-center gap-3 rounded-xl bg-muted/50 px-3 py-2 text-sm">
                <span className="font-bold">{f.title}</span>
                <span className="text-muted-foreground">{f.lines} câu</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {f.published ? "Đã mở" : "Chưa mở"}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
