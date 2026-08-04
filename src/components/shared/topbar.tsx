"use client";
import Link from "next/link";
import { Menu, Flame, Heart, Star, LogOut, Settings, Sparkles, type LucideIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Logo, Wordmark } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface TopbarUser {
  name?: string | null;
  email: string;
  image?: string | null;
  xp: number;
  hearts: number;
  unlimitedHearts: boolean;
  streakDays: number;
  role: string;
}

/**
 * Huy hiệu chỉ số (streak / tim / XP). Đây là chỗ trẻ nhìn vào để biết mình
 * được thưởng gì, nên phải TO và có màu riêng — không phải một con số xám nhỏ.
 *
 * `className` áp lên KHUNG chứ không lên icon: icon lấy màu qua kế thừa
 * (`fill-current` + stroke currentColor), nhờ vậy mỗi huy hiệu chỉ cần một cặp
 * "nền pastel + màu chữ" là cả khối đồng bộ.
 */
function Stat({ icon: Icon, value, className }: { icon: LucideIcon; value: number; className: string }) {
  return (
    <div
      className={cn(
        "flex min-h-11 items-center gap-1.5 rounded-full px-3 py-1 font-display text-[1rem] font-extrabold shadow-soft",
        className
      )}
    >
      <Icon className="h-[19px] w-[19px] fill-current" />
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

export function Topbar({ user, onMenu }: { user: TopbarUser; onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center gap-2 border-b-2 border-border bg-background/85 px-3 backdrop-blur sm:gap-3 sm:px-6">
      <Button variant="ghost" size="icon" className="-ml-1 shrink-0 lg:hidden" onClick={onMenu} aria-label="Mở menu">
        <Menu className="h-6 w-6" />
      </Button>
      <Link href="/" className="flex shrink-0 items-center gap-2 lg:hidden" aria-label="DingDong Kids — về trang chủ">
        <Logo className="h-9 w-9" />
        {/* Ẩn chữ trên điện thoại rất nhỏ để chừa chỗ cho dải chỉ số (streak/tim/XP) */}
        <span className="hidden min-[380px]:inline">
          <Wordmark className="text-[1.05rem]" />
        </span>
      </Link>

      <div className="flex-1" />

      {!user.unlimitedHearts && (
        <Button asChild size="sm" className="mr-1 hidden sm:inline-flex">
          <Link href="/payment">
            <Sparkles className="h-4 w-4" /> Nâng cấp
          </Link>
        </Button>
      )}

      {/* Ba huy hiệu tròn: cam (streak) · san hô (tim) · vàng (XP) */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <Stat icon={Flame} value={user.streakDays} className="bg-band-sun text-brand-sun" />
        {user.unlimitedHearts ? (
          <div
            className="flex min-h-11 items-center gap-1.5 rounded-full bg-band-coral px-3 py-1 font-display text-[1rem] font-extrabold text-brand-coral shadow-soft"
            title="Tim không giới hạn"
          >
            <Heart className="h-[19px] w-[19px] fill-current" />
            <span className="leading-none">∞</span>
          </div>
        ) : (
          <Stat icon={Heart} value={user.hearts} className="bg-band-coral text-brand-coral" />
        )}
        <Stat icon={Star} value={user.xp} className="bg-band-yel text-brand-gold" />
      </div>

      <ThemeToggle className="hidden sm:inline-flex" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0 rounded-full">
            <Avatar className="h-11 w-11">
              <AvatarImage src={user.image ?? undefined} />
              {/* sunny + sunny-foreground: cặp này giữ đủ tương phản ở CẢ hai chế độ */}
              <AvatarFallback className="bg-sunny text-[1.05rem] text-sunny-foreground">
                {(user.name?.charAt(0) ?? user.email.charAt(0)).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60">
          <div className="px-3 py-2">
            <p className="truncate font-display text-[0.98rem] font-extrabold">{user.name ?? "Học viên"}</p>
            <p className="truncate text-xs font-semibold text-muted-foreground">{user.email}</p>
          </div>
          <DropdownMenuSeparator />
          {!user.unlimitedHearts && (
            <DropdownMenuItem asChild>
              <Link href="/payment">
                <Sparkles className="mr-2 h-4 w-4" /> Nâng cấp
              </Link>
            </DropdownMenuItem>
          )}
          {user.role === "ADMIN" && (
            <DropdownMenuItem asChild>
              <Link href="/admin">
                <Settings className="mr-2 h-4 w-4" /> Trang quản trị
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" /> Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
