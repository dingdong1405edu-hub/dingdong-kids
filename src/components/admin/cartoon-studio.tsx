"use client";
// ===========================================================================
//  STUDIO BẮT MỐC THỜI GIAN — công cụ soạn nội dung cho khu "Xem hoạt hình".
//
//  Vì sao phải có: mốc `start`/`end` của từng câu là thứ DUY NHẤT quyết định
//  bài học chạy đúng hay hỏng, mà không có cách nào lấy nó tự động — YouTube
//  không cho đọc phụ đề qua API chính thức, và phụ đề tự động cũng không ngắt
//  theo câu. Đếm tay bằng đồng hồ thì sai vài trăm mili giây là bé nghe hụt.
//
//  Cách dùng: dán link → nghe → tới đầu câu bấm "Đặt ĐẦU", nói xong bấm
//  "Đặt CUỐI" → gõ câu + nghĩa → "Thêm câu". Cuối cùng bấm "Chép mã" và dán
//  vào src/lib/cartoon-data/pack-01.ts.
//
//  Thuần client, KHÔNG ghi DB: nội dung phim là dữ liệu tĩnh trong code (cùng
//  khuôn @/lib/first-words), nên đầu ra của studio là một đoạn TypeScript.
// ===========================================================================
import { useMemo, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Play,
  Pause,
  Plus,
  Trash2,
  Copy,
  Check,
  Rewind,
  FlagTriangleRight,
  Square,
} from "lucide-react";
import { useYouTubePlayer } from "@/components/learn/cartoon/use-youtube-player";
import type { CartoonLine } from "@/lib/cartoons";

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

const fmt = (n: number) => n.toFixed(1);

export function CartoonStudio() {
  const [urlInput, setUrlInput] = useState("");
  const [videoId, setVideoId] = useState("");
  const [lines, setLines] = useState<CartoonLine[]>([]);
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [vi, setVi] = useState("");
  const [copied, setCopied] = useState(false);
  const textRef = useRef<HTMLInputElement | null>(null);

  const player = useYouTubePlayer(videoId);

  function load() {
    const id = parseYouTubeId(urlInput);
    if (!id) return;
    setLines([]);
    setStart(null);
    setEnd(null);
    setVideoId(id);
  }

  function markStart() {
    const t = player.currentTime();
    setStart(Number(t.toFixed(1)));
    setEnd(null);
  }

  function markEnd() {
    const t = Number(player.currentTime().toFixed(1));
    setEnd(t);
    player.pause();
    textRef.current?.focus();
  }

  function addLine() {
    if (start === null || end === null || end <= start || !text.trim()) return;
    setLines((prev) =>
      [...prev, { start, end, text: text.trim(), vi: vi.trim() }].sort((a, b) => a.start - b.start),
    );
    setStart(null);
    setEnd(null);
    setText("");
    setVi("");
  }

  /** Nghe thử đúng đoạn vừa bắt — cách duy nhất chắc chắn mốc không lệch. */
  function preview(l: CartoonLine) {
    player.playRange(l.start, l.end);
  }

  const snippet = useMemo(() => {
    const body = lines
      .map(
        (l) =>
          `      { start: ${fmt(l.start)}, end: ${fmt(l.end)}, text: ${JSON.stringify(l.text)}, vi: ${JSON.stringify(l.vi)} },`,
      )
      .join("\n");
    return `  {
    id: "doi-ten-phim",
    youtubeId: ${JSON.stringify(videoId)},
    title: "Tên tiếng Việt",
    titleEn: "English title",
    emoji: "🎬",
    cover: "from-violet-300 via-fuchsia-400 to-rose-400",
    level: "starters",
    channel: "Tên kênh gốc",
    published: false,
    lines: [
${body}
    ],
  },`;
  }, [lines, videoId]);

  async function copySnippet() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* trình duyệt chặn clipboard — người dùng bôi đen chép tay được */
    }
  }

  const canAdd = start !== null && end !== null && end > start && text.trim().length > 0;

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="flex flex-wrap items-end gap-3 p-4">
          <div className="min-w-[260px] flex-1 space-y-1.5">
            <Label htmlFor="yt-url">Link YouTube hoặc mã video</Label>
            <Input
              id="yt-url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && load()}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
          <Button onClick={load} disabled={!parseYouTubeId(urlInput)}>
            Mở phim
          </Button>
        </CardContent>
      </Card>

      {videoId && (
        <>
          <div className="overflow-hidden rounded-2xl bg-black">
            <div ref={player.hostRef} className="aspect-video w-full" />
          </div>

          {player.status === "blocked" && (
            <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
              Kênh này TẮT NHÚNG (lỗi {player.errorCode}) hoặc video đã bị gỡ. Bé sẽ không xem được
              — phải chọn phim khác.
            </p>
          )}
          {player.status === "offline" && (
            <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
              Chưa nạp được trình chơi YouTube (mạng hỏng hoặc bị chặn). Thử tải lại trang.
            </p>
          )}

          <Card>
            <CardContent className="space-y-4 p-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => player.play()}>
                  <Play className="mr-1.5 h-4 w-4" /> Phát
                </Button>
                <Button variant="outline" onClick={() => player.pause()}>
                  <Pause className="mr-1.5 h-4 w-4" /> Dừng
                </Button>
                <Button
                  variant="outline"
                  onClick={() => player.seek(Math.max(0, player.currentTime() - 2))}
                >
                  <Rewind className="mr-1.5 h-4 w-4" /> Lùi 2 giây
                </Button>
                <Button variant="outline" onClick={() => player.setRate(0.75)}>
                  0.75×
                </Button>
                <Button variant="outline" onClick={() => player.setRate(1)}>
                  1×
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button onClick={markStart} className="font-bold">
                  <FlagTriangleRight className="mr-1.5 h-4 w-4" /> Đặt ĐẦU câu
                  {start !== null && <span className="ml-2 opacity-80">{fmt(start)}s</span>}
                </Button>
                <Button onClick={markEnd} disabled={start === null} className="font-bold">
                  <Square className="mr-1.5 h-4 w-4" /> Đặt CUỐI câu
                  {end !== null && <span className="ml-2 opacity-80">{fmt(end)}s</span>}
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="line-en">Câu tiếng Anh (nhân vật nói)</Label>
                  <Input
                    id="line-en"
                    ref={textRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="I love muddy puddles!"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="line-vi">Nghĩa tiếng Việt</Label>
                  <Input
                    id="line-vi"
                    value={vi}
                    onChange={(e) => setVi(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addLine()}
                    placeholder="Tớ thích vũng nước bùn!"
                  />
                </div>
              </div>

              <Button onClick={addLine} disabled={!canAdd} className="w-full font-bold">
                <Plus className="mr-1.5 h-4 w-4" /> Thêm câu
                {start !== null && end !== null && end > start && (
                  <span className="ml-2 opacity-80">
                    ({fmt(start)} → {fmt(end)}s · {fmt(end - start)}s)
                  </span>
                )}
              </Button>
              <p className="text-xs font-semibold text-muted-foreground">
                Câu nên gọn trong 2–5 giây. Dài quá 12 giây thì `npm run content:check` báo lỗi —
                bé không nhớ nổi cả câu để nhắc lại.
              </p>
            </CardContent>
          </Card>

          {lines.length > 0 && (
            <Card>
              <CardContent className="space-y-2 p-4">
                <p className="font-display text-sm font-extrabold">Đã bắt {lines.length} câu</p>
                {lines.map((l, i) => (
                  <div
                    key={`${l.start}-${i}`}
                    className="flex items-center gap-3 rounded-xl bg-muted/50 px-3 py-2"
                  >
                    <span className="w-24 shrink-0 font-mono text-xs text-muted-foreground">
                      {fmt(l.start)}→{fmt(l.end)}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold">{l.text}</span>
                    <Button size="sm" variant="ghost" onClick={() => preview(l)} aria-label="Nghe thử">
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setLines((prev) => prev.filter((_, j) => j !== i))}
                      aria-label="Xoá câu"
                    >
                      <Trash2 className="h-4 w-4 text-rose-500" />
                    </Button>
                  </div>
                ))}

                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="snippet">
                      Dán đoạn này vào <code>src/lib/cartoon-data/pack-01.ts</code>
                    </Label>
                    <Button size="sm" variant="outline" onClick={copySnippet}>
                      {copied ? (
                        <>
                          <Check className="mr-1.5 h-4 w-4" /> Đã chép
                        </>
                      ) : (
                        <>
                          <Copy className="mr-1.5 h-4 w-4" /> Chép mã
                        </>
                      )}
                    </Button>
                  </div>
                  <Textarea id="snippet" readOnly rows={12} value={snippet} className="font-mono text-xs" />
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
