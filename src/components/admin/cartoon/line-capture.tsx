"use client";
// Bắt mốc thời gian BẰNG TAY — đường lui khi phim không có phụ đề.
//
// Tối ưu cho tốc độ gõ: phím cách đặt mốc (đầu → cuối → đầu…), Enter thêm câu.
// Người vận hành để tay trên bàn phím, mắt nhìn video, không phải rê chuột —
// khác biệt giữa "bắt một phim mất 5 phút" và "mất nửa tiếng".
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, Pause, Rewind, FlagTriangleRight, Square, Plus } from "lucide-react";
import type { CartoonLine } from "@/lib/cartoons";
import type { UseYouTubePlayer } from "@/components/learn/cartoon/use-youtube-player";

interface Props {
  player: UseYouTubePlayer;
  onAdd: (line: CartoonLine) => void;
}

const fmt = (n: number) => n.toFixed(1);

export function LineCapture({ player, onAdd }: Props) {
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [vi, setVi] = useState("");
  const textRef = useRef<HTMLInputElement | null>(null);

  const canAdd = start !== null && end !== null && end > start && text.trim().length > 0;

  function markStart() {
    setStart(Number(player.currentTime().toFixed(1)));
    setEnd(null);
  }

  function markEnd() {
    if (start === null) return;
    setEnd(Number(player.currentTime().toFixed(1)));
    player.pause();
    textRef.current?.focus();
  }

  function add() {
    if (start === null || end === null || end <= start || !text.trim()) return;
    onAdd({ start, end, text: text.trim(), vi: vi.trim() });
    setStart(null);
    setEnd(null);
    setText("");
    setVi("");
  }

  // Phím cách = đặt mốc kế tiếp. Bỏ qua khi con trỏ đang ở ô nhập, nếu không
  // gõ một dấu cách trong câu là nhảy mất mốc.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = e.target as HTMLElement | null;
      const typing =
        el?.tagName === "INPUT" || el?.tagName === "TEXTAREA" || el?.isContentEditable;
      if (typing || e.code !== "Space") return;
      e.preventDefault();
      if (start === null || end !== null) markStart();
      else markEnd();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => player.play()}>
          <Play className="mr-1.5 h-4 w-4" /> Phát
        </Button>
        <Button variant="outline" onClick={() => player.pause()}>
          <Pause className="mr-1.5 h-4 w-4" /> Dừng
        </Button>
        <Button variant="outline" onClick={() => player.seek(Math.max(0, player.currentTime() - 2))}>
          <Rewind className="mr-1.5 h-4 w-4" /> Lùi 2s
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
          <FlagTriangleRight className="mr-1.5 h-4 w-4" /> Đặt ĐẦU
          {start !== null && <span className="ml-2 opacity-80">{fmt(start)}s</span>}
        </Button>
        <Button onClick={markEnd} disabled={start === null} className="font-bold">
          <Square className="mr-1.5 h-4 w-4" /> Đặt CUỐI
          {end !== null && <span className="ml-2 opacity-80">{fmt(end)}s</span>}
        </Button>
        <span className="self-center text-xs font-semibold text-muted-foreground">
          Mẹo: bấm phím <kbd className="rounded border px-1">Space</kbd> để đặt mốc, không cần rê chuột
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="cap-en">Câu tiếng Anh</Label>
          <Input
            id="cap-en"
            ref={textRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="I love muddy puddles!"
            className="font-primer"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cap-vi">Nghĩa tiếng Việt</Label>
          <Input
            id="cap-vi"
            value={vi}
            onChange={(e) => setVi(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Tớ thích vũng nước bùn!"
          />
        </div>
      </div>

      <Button onClick={add} disabled={!canAdd} className="w-full font-bold">
        <Plus className="mr-1.5 h-4 w-4" /> Thêm câu
        {start !== null && end !== null && end > start && (
          <span className="ml-2 opacity-80">
            ({fmt(start)} → {fmt(end)}s · {fmt(end - start)}s)
          </span>
        )}
      </Button>
    </div>
  );
}
