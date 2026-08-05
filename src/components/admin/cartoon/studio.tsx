"use client";
// ===========================================================================
//  STUDIO GẮN PHIM — nơi một link YouTube trở thành bài học nói theo phim.
//
//  Ba đường vào, dùng đường nào cũng ra cùng một kết quả:
//   1. Dán link → studio tự hỏi YouTube tên phim + tên kênh, và tự biết phim
//      đó có CHO NHÚNG không (oEmbed, không cần API key).
//   2. Dán phụ đề .srt/.vtt → ra sẵn toàn bộ câu kèm mốc thời gian.
//   3. Không có phụ đề thì bắt tay bằng phím Space.
//
//  Bấm Lưu là phim vào thẳng DB — KHÔNG phải sửa code, KHÔNG phải deploy lại.
//  Phim luôn ra đời ở trạng thái đóng; mở cho bé là một thao tác riêng, sau khi
//  đã tự xem thử trọn một lượt.
// ===========================================================================
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, X, Youtube, ListPlus, Hand } from "lucide-react";
import { cn } from "@/lib/utils";
import { useYouTubePlayer } from "@/components/learn/cartoon/use-youtube-player";
import {
  CARTOON_COVERS,
  CARTOON_EMOJIS,
  CARTOON_LEVEL_LABEL,
  CARTOON_LEVEL_ORDER,
  type CartoonLevel,
  type CartoonLine,
} from "@/lib/cartoons";
import { saveCartoonAction } from "@/server/actions/cartoon-admin";
import type { YouTubeInfoResponse } from "@/app/api/admin/youtube-info/route";
import { SubtitleImport } from "./subtitle-import";
import { LineCapture } from "./line-capture";
import { LineList } from "./line-list";

/** Lấy mã video từ mọi kiểu link YouTube hay gặp (watch, youtu.be, shorts, embed). */
export function parseYouTubeId(input: string): string {
  const s = input.trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  const m =
    s.match(/[?&]v=([\w-]{11})/) ??
    s.match(/youtu\.be\/([\w-]{11})/) ??
    s.match(/\/(?:embed|shorts|live)\/([\w-]{11})/);
  return m?.[1] ?? "";
}

/** Tên phim → slug URL. Bỏ dấu tiếng Việt để địa chỉ không thành chuỗi %C3%A9. */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export interface AdminCartoon {
  id: string;
  slug: string;
  youtubeId: string;
  title: string;
  titleEn: string;
  emoji: string;
  cover: string;
  level: string;
  channel: string;
  published: boolean;
  order: number;
  lines: CartoonLine[];
}

interface Props {
  /** Có giá trị = đang SỬA một phim đã lưu. */
  initial?: AdminCartoon | null;
  onDone: () => void;
}

export function CartoonStudio({ initial, onDone }: Props) {
  const [urlInput, setUrlInput] = useState(initial?.youtubeId ?? "");
  const [videoId, setVideoId] = useState(initial?.youtubeId ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [titleEn, setTitleEn] = useState(initial?.titleEn ?? "");
  const [emoji, setEmoji] = useState(initial?.emoji ?? "🎬");
  const [cover, setCover] = useState(initial?.cover ?? CARTOON_COVERS[0]);
  const [level, setLevel] = useState<CartoonLevel>((initial?.level as CartoonLevel) ?? "starters");
  const [channel, setChannel] = useState(initial?.channel ?? "");
  const [lines, setLines] = useState<CartoonLine[]>(initial?.lines ?? []);

  const [checking, setChecking] = useState(false);
  const [embedNote, setEmbedNote] = useState<string>("");
  const [saving, setSaving] = useState(false);

  const player = useYouTubePlayer(videoId);

  /** Hỏi YouTube tên phim + tên kênh, và kiểm phim có nhúng được không. */
  const fetchInfo = useCallback(async (id: string) => {
    setChecking(true);
    setEmbedNote("");
    try {
      const res = await fetch(`/api/admin/youtube-info?v=${id}`);
      const data = (await res.json()) as YouTubeInfoResponse;
      if (!data.ok) {
        setEmbedNote(data.error ?? "Không tra được thông tin video.");
        return;
      }
      // Chỉ điền vào ô CÒN TRỐNG — đang sửa phim cũ thì không được ghi đè.
      setTitleEn((v) => v || (data.title ?? ""));
      setChannel((v) => v || (data.channel ?? ""));
      setSlug((v) => v || slugify(data.title ?? ""));
      setEmbedNote("");
    } catch {
      setEmbedNote("Chưa hỏi được YouTube. Cứ điền tay, phần xem thử bên cạnh vẫn chạy.");
    } finally {
      setChecking(false);
    }
  }, []);

  function load() {
    const id = parseYouTubeId(urlInput);
    if (!id) {
      toast.error("Link không hợp lệ — cần link YouTube hoặc mã 11 ký tự.");
      return;
    }
    setVideoId(id);
    void fetchInfo(id);
  }

  // Đang sửa phim cũ: hỏi thông tin ngay để biết video còn nhúng được không —
  // kênh có thể đã tắt nhúng hoặc gỡ video sau khi mình gắn.
  useEffect(() => {
    if (initial?.youtubeId) void fetchInfo(initial.youtubeId);
  }, [initial?.youtubeId, fetchInfo]);

  async function save(publishNow: boolean) {
    if (lines.length === 0) {
      toast.error("Phim phải có ít nhất một câu.");
      return;
    }
    setSaving(true);
    const res = await saveCartoonAction({
      id: initial?.id,
      slug,
      youtubeId: videoId,
      title,
      titleEn,
      emoji,
      cover,
      level,
      channel,
      published: publishNow,
      order: initial?.order ?? 0,
      lines,
    });
    setSaving(false);

    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success(publishNow ? "Đã lưu và mở cho bé xem." : "Đã lưu. Phim chưa mở cho bé.");
    onDone();
  }

  const blocked = player.status === "blocked";

  return (
    <div className="space-y-5">
      {/* 1 — Link */}
      <Card>
        <CardContent className="space-y-3 p-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="min-w-[260px] flex-1 space-y-1.5">
              <Label htmlFor="yt-url">1. Dán link YouTube</Label>
              <Input
                id="yt-url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && load()}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            <Button onClick={load} disabled={!parseYouTubeId(urlInput) || checking}>
              {checking ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Youtube className="mr-1.5 h-4 w-4" />}
              Mở phim
            </Button>
          </div>

          {embedNote && (
            <p className="rounded-xl bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
              {embedNote}
            </p>
          )}
          {blocked && (
            <p className="rounded-xl bg-rose-50 px-4 py-2.5 text-sm font-bold text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
              Trình chơi báo lỗi {player.errorCode}: kênh này TẮT NHÚNG hoặc video đã bị gỡ. Bé sẽ
              không xem được — chọn phim khác.
            </p>
          )}
        </CardContent>
      </Card>

      {videoId && (
        <>
          <div className="overflow-hidden rounded-2xl bg-black">
            <div ref={player.hostRef} className="aspect-video w-full" />
          </div>

          {/* 2 — Câu + mốc thời gian */}
          <Card>
            <CardContent className="space-y-4 p-4">
              <Label>2. Lấy câu và mốc thời gian</Label>
              <Tabs defaultValue="subtitle">
                <TabsList>
                  <TabsTrigger value="subtitle">
                    <ListPlus className="mr-1.5 h-4 w-4" /> Dán phụ đề
                  </TabsTrigger>
                  <TabsTrigger value="manual">
                    <Hand className="mr-1.5 h-4 w-4" /> Bắt bằng tay
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="subtitle" className="pt-4">
                  <SubtitleImport
                    onImport={(imported) => {
                      setLines(imported);
                      toast.success(`Đã nhận ${imported.length} câu. Nhớ nghe thử vài câu nhé.`);
                    }}
                  />
                </TabsContent>
                <TabsContent value="manual" className="pt-4">
                  <LineCapture player={player} onAdd={(l) => setLines((prev) => [...prev, l])} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center justify-between">
                <Label>{lines.length} câu</Label>
                {lines.length > 0 && (
                  <Button size="sm" variant="ghost" onClick={() => setLines([])}>
                    Xoá hết
                  </Button>
                )}
              </div>
              <LineList
                lines={lines}
                onChange={setLines}
                onPreview={(l) => player.playRange(l.start, l.end)}
              />
            </CardContent>
          </Card>

          {/* 3 — Thông tin hiển thị */}
          <Card>
            <CardContent className="space-y-4 p-4">
              <Label>3. Thông tin hiển thị cho bé</Label>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="c-title">Tên tiếng Việt</Label>
                  <Input
                    id="c-title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!initial) setSlug(slugify(e.target.value));
                    }}
                    placeholder="Vũng nước bùn"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-title-en">Tên tiếng Anh</Label>
                  <Input
                    id="c-title-en"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="Muddy Puddles"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-slug">Địa chỉ (slug)</Label>
                  <Input
                    id="c-slug"
                    value={slug}
                    onChange={(e) => setSlug(slugify(e.target.value))}
                    placeholder="vung-nuoc-bun"
                  />
                  <p className="text-xs text-muted-foreground">/hoat-hinh/{slug || "…"}</p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-channel">Kênh gốc</Label>
                  <Input
                    id="c-channel"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    placeholder="Peppa Pig — Official Channel"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Cấp gợi ý</Label>
                <div className="flex flex-wrap gap-2">
                  {CARTOON_LEVEL_ORDER.map((lv) => (
                    <Button
                      key={lv}
                      type="button"
                      size="sm"
                      variant={level === lv ? "default" : "outline"}
                      onClick={() => setLevel(lv)}
                    >
                      {CARTOON_LEVEL_LABEL[lv]}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Hình đại diện</Label>
                <div className="flex flex-wrap gap-1.5">
                  {CARTOON_EMOJIS.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setEmoji(e)}
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl text-xl transition-colors",
                        emoji === e ? "bg-primary/15 ring-2 ring-primary" : "bg-muted hover:bg-muted/70",
                      )}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Màu nền thẻ</Label>
                <div className="flex flex-wrap gap-2">
                  {CARTOON_COVERS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCover(c)}
                      aria-label="Chọn màu nền"
                      className={cn(
                        "h-11 w-16 rounded-xl bg-gradient-to-br transition-transform",
                        c,
                        cover === c ? "scale-105 ring-2 ring-primary ring-offset-2" : "hover:scale-105",
                      )}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => void save(false)} disabled={saving} className="font-bold">
              {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Save className="mr-1.5 h-4 w-4" />}
              Lưu (chưa mở cho bé)
            </Button>
            <Button
              variant="outline"
              onClick={() => void save(true)}
              disabled={saving || blocked}
              className="font-bold"
            >
              Lưu và MỞ cho bé
            </Button>
            <Button variant="ghost" onClick={onDone} disabled={saving}>
              <X className="mr-1.5 h-4 w-4" /> Huỷ
            </Button>
          </div>
          <p className="text-xs font-semibold text-muted-foreground">
            Nên lưu ở trạng thái đóng trước, tự xem thử trọn một lượt ở <code>/hoat-hinh/{slug || "…"}</code>{" "}
            rồi mới mở cho bé — mốc thời gian chỉ đúng khi tai người xác nhận.
          </p>
        </>
      )}
    </div>
  );
}
