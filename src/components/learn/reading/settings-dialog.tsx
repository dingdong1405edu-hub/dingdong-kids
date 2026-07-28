"use client";
import { Type, AlignJustify, Palette, Volume2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { FONT_SIZES, LEADINGS, THEMES, type ReadingSettings } from "./types";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  settings: ReadingSettings;
  onChange: (s: ReadingSettings) => void;
  /** Đề có audio đọc mẫu hay không — không có thì ẩn hẳn tuỳ chọn "Đọc to". */
  hasAudio?: boolean;
}

function SegRow<T extends string | number>({
  options,
  value,
  onSelect,
}: {
  options: { label: string; value: T }[];
  value: T;
  onSelect: (v: T) => void;
}) {
  return (
    <div className="flex gap-2">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          onClick={() => onSelect(o.value)}
          className={cn(
            "flex-1 rounded-2xl border-2 px-2 py-2 text-sm font-bold transition-colors",
            value === o.value
              ? "border-primary bg-primary/10 text-primary"
              : "border-input text-muted-foreground hover:border-primary/40",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function SettingsDialog({ open, onOpenChange, settings, onChange, hasAudio }: SettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-3xl">
        <DialogHeader>
          <DialogTitle>Đọc sao cho dễ nhất?</DialogTitle>
          <DialogDescription>Chỉnh cho vừa mắt bé nhé.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <span className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground">
              <Type className="h-4 w-4" /> Cỡ chữ
            </span>
            <SegRow
              options={FONT_SIZES}
              value={settings.fontSize}
              onSelect={(v) => onChange({ ...settings, fontSize: v })}
            />
          </div>
          <div className="space-y-2">
            <span className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground">
              <AlignJustify className="h-4 w-4" /> Giãn dòng
            </span>
            <SegRow
              options={LEADINGS}
              value={settings.leading}
              onSelect={(v) => onChange({ ...settings, leading: v })}
            />
          </div>
          <div className="space-y-2">
            <span className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground">
              <Palette className="h-4 w-4" /> Màu nền
            </span>
            <SegRow
              options={THEMES}
              value={settings.theme}
              onSelect={(v) => onChange({ ...settings, theme: v })}
            />
          </div>

          {/* Chỉ hiện khi đề thật sự có audio đọc mẫu — bật một nút không phát ra
              tiếng sẽ khiến bé tưởng máy hỏng. */}
          {hasAudio && (
            <button
              type="button"
              onClick={() => onChange({ ...settings, readAloud: !settings.readAloud })}
              aria-pressed={settings.readAloud}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border-2 px-3 py-3 text-left transition-colors",
                settings.readAloud ? "border-primary bg-primary/10" : "border-input",
              )}
            >
              <Volume2 className={cn("h-5 w-5 shrink-0", settings.readAloud ? "text-primary" : "text-muted-foreground")} />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold">Đọc to cả bài</span>
                <span className="block text-xs text-muted-foreground">Hiện nút nghe cô đọc ở đầu bài</span>
              </span>
              <span
                className={cn(
                  "flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors",
                  settings.readAloud ? "bg-primary" : "bg-muted",
                )}
              >
                <span
                  className={cn(
                    "h-5 w-5 rounded-full bg-white shadow transition-transform",
                    settings.readAloud && "translate-x-5",
                  )}
                />
              </span>
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
