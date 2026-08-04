"use client";
import { Play, Pause, RotateCcw, Volume2, Radio, AlertTriangle } from "lucide-react";
import { cn, formatDuration } from "@/lib/utils";
import type { ListeningAudio } from "./use-listening-audio";

// Dải tốc độ cho TRẺ EM: chỉ có chậm và bình thường. Nghe nhanh hơn giọng chuẩn
// không giúp trẻ luyện nghe, chỉ làm các em nản — nên bỏ hẳn 1.25x/1.5x.
const SPEEDS: { value: number; label: string; emoji: string }[] = [
  { value: 0.5, label: "Rất chậm", emoji: "🐢" },
  { value: 0.75, label: "Chậm", emoji: "🐰" },
  { value: 1, label: "Thường", emoji: "⭐" },
];

function Equalizer({ active }: { active: boolean }) {
  // Five bars; in "playing" state they bounce with staggered delays.
  const delays = ["0s", "0.15s", "0.3s", "0.45s", "0.2s"];
  return (
    <div className="flex h-6 items-end gap-[3px]">
      {delays.map((d, i) => (
        <span
          key={i}
          className={cn("w-[3px] rounded-full bg-primary", active && "animate-eq")}
          style={{ height: "100%", animationDelay: d, transform: active ? undefined : "scaleY(0.35)" }}
        />
      ))}
    </div>
  );
}

export function AudioPlayer({
  audio,
  reviewMode,
  segmentCount,
}: {
  audio: ListeningAudio;
  reviewMode: boolean;
  segmentCount: number;
}) {
  const {
    mode,
    playing,
    status,
    rate,
    remainingPlays,
    canStart,
    currentSegment,
    currentTime,
    duration,
    toggle,
    restart,
    seek,
    setRate,
  } = audio;

  const ttsProgress =
    segmentCount > 0 && currentSegment !== null ? ((currentSegment + 1) / segmentCount) * 100 : 0;
  const fileProgress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const blocked = !canStart && status === "idle";
  // Restart always begins a fresh play-through, so it's unavailable whenever a
  // fresh start can't be charged — even while paused (avoids a dead control that
  // would silently discard the paused listen).
  const restartBlocked = !canStart;

  return (
    <div className="rounded-3xl border-2 bg-gradient-to-br from-primary/10 to-transparent p-4 shadow-soft">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Nghe / Tạm dừng — nút to nhất trên màn hình, bé bấm không trượt */}
        <button
          onClick={toggle}
          disabled={mode === "none" || blocked}
          aria-label={playing ? "Tạm dừng" : "Nghe"}
          className={cn(
            "btn-chunky flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-white transition-transform active:scale-95",
            mode === "none" || blocked ? "cursor-not-allowed bg-muted" : "bg-primary hover:brightness-105",
          )}
        >
          {playing ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 translate-x-0.5" />}
        </button>

        {/* Giữa: tiến trình / trạng thái */}
        <div className="min-w-0 flex-1">
          {mode === "mp3" ? (
            <>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={(e) => seek(Number(e.target.value))}
                aria-label="Tua audio"
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-primary/15 accent-primary"
                style={{
                  backgroundImage: `linear-gradient(to right, hsl(var(--primary)) ${fileProgress}%, transparent ${fileProgress}%)`,
                }}
              />
              <div className="mt-1 flex items-center justify-between text-xs tabular-nums text-muted-foreground">
                <span>{formatDuration(Math.floor(currentTime))}</span>
                <span>{duration ? formatDuration(Math.floor(duration)) : "--:--"}</span>
              </div>
            </>
          ) : mode === "tts" ? (
            <div className="flex items-center gap-3">
              <Equalizer active={playing} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-sm font-bold text-primary">
                  <Radio className="h-4 w-4" /> Giọng đọc máy
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-primary/15">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${ttsProgress}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-brand-gold">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>Máy này chưa phát được tiếng. Bé đọc lời thoại bên dưới nhé.</span>
            </div>
          )}
        </div>

        {/* Nghe lại từ đầu */}
        {mode !== "none" && (
          <button
            onClick={restart}
            disabled={restartBlocked}
            aria-label="Nghe lại từ đầu"
            title="Nghe lại từ đầu"
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
              restartBlocked
                ? "cursor-not-allowed border-input text-muted-foreground/50"
                : "border-primary/30 text-primary hover:bg-primary/10",
            )}
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Hàng điều khiển */}
      {mode !== "none" && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-primary/15 pt-3">
          {/* Số lần được nghe */}
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold",
              reviewMode
                ? "bg-band-mint text-brand-teal"
                : remainingPlays && remainingPlays > 0
                  ? "bg-primary/10 text-primary"
                  : "bg-sunny/25 text-brand-gold",
            )}
          >
            <Volume2 className="h-4 w-4" />
            {reviewMode ? "Nghe lại thoải mái" : `Còn ${remainingPlays} lần nghe`}
          </span>

          {/* Tốc độ */}
          <div className="flex items-center gap-1.5">
            {SPEEDS.map((s) => (
              <button
                key={s.value}
                onClick={() => setRate(s.value)}
                title={`Tốc độ ${s.value}x`}
                aria-pressed={rate === s.value}
                className={cn(
                  "rounded-2xl border-2 px-3 py-1.5 text-xs font-bold transition-colors",
                  rate === s.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input text-muted-foreground hover:border-primary/40",
                )}
              >
                <span aria-hidden>{s.emoji}</span> {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
