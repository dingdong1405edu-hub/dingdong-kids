"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTheme, type ThemeMode } from "./theme-provider";

const OPTIONS: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Sáng", icon: Sun },
  { value: "dark", label: "Tối", icon: Moon },
  { value: "system", label: "Theo thiết bị", icon: Monitor },
];

/**
 * Nút đổi giao diện sáng/tối. Mặc định "Theo thiết bị" (bám OS), người dùng
 * có thể ghi đè và lựa chọn được lưu lại. Dùng được cả ở topbar (token) lẫn
 * thanh điều hướng trang chủ — màu bám theo `--foreground` nên hợp mọi nền.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const TriggerIcon = resolvedTheme === "dark" ? Moon : Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Đổi giao diện sáng/tối"
          title="Giao diện sáng/tối"
          className={cn(
            // 48px vuông: globals.css ép mọi <button> cao tối thiểu 48px, nên nếu
            // để bề ngang nhỏ hơn thì nút tròn bị kéo thành hình bầu dục.
            "inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-card/70 text-brand-gold transition-all duration-200 ease-toy hover:-translate-y-0.5 hover:bg-band-sun hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            className,
          )}
        >
          <TriggerIcon className="h-[20px] w-[20px]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[176px]">
        {OPTIONS.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className="gap-2.5"
          >
            <Icon className="h-[18px] w-[18px] text-brand-gold" />
            <span className="flex-1">{label}</span>
            {theme === value && <Check className="h-[18px] w-[18px] text-brand-teal" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
