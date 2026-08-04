"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, LayoutGroup } from "framer-motion";
import {
  X,
  LayoutDashboard,
  Route,
  Gamepad2,
  Clapperboard,
  Target,
  BookOpen,
  SpellCheck,
  AudioLines,
  BookText,
  Headphones,
  PenLine,
  Mic,
  GraduationCap,
  Library,
  BookMarked,
  Users2,
  UserRound,
  MessageCircleHeart,
  Crown,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { cn, levelLabel } from "@/lib/utils";
import { Logo, Wordmark } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}
interface NavGroup {
  title?: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
      { href: "/roadmap", label: "Lộ trình", icon: Route },
      { href: "/goals", label: "Mục tiêu", icon: Target },
    ],
  },
  {
    // Khu CHƠI — không chấm điểm gắt, không bài tập. Đặt ngay dưới lộ trình vì
    // với trẻ con đây mới là lý do mở app; học xong thì phải có chỗ để chơi.
    title: "Trải nghiệm",
    items: [
      { href: "/games", label: "Sân chơi", icon: Gamepad2 },
      { href: "/hoat-hinh", label: "Xem hoạt hình", icon: Clapperboard },
    ],
  },
  {
    title: "Luyện kỹ năng",
    items: [
      { href: "/vocab", label: "Từ vựng", icon: BookOpen },
      { href: "/grammar", label: "Ngữ pháp", icon: SpellCheck },
      { href: "/phonics", label: "Ghép vần", icon: AudioLines },
      { href: "/reading", label: "Đọc hiểu", icon: BookText },
      { href: "/listening", label: "Nghe hiểu", icon: Headphones },
      { href: "/writing", label: "Viết luận", icon: PenLine },
      { href: "/speaking", label: "Luyện nói", icon: Mic },
    ],
  },
  {
    title: "Luyện thi & Tài liệu",
    items: [
      { href: "/exam", label: "Thi thử", icon: GraduationCap },
      { href: "/materials", label: "Tài liệu", icon: Library },
      { href: "/so-tu", label: "Sổ từ", icon: BookMarked },
    ],
  },
  {
    title: "Khác",
    items: [
      { href: "/community", label: "Cộng đồng", icon: Users2 },
      { href: "/profile", label: "Hồ sơ", icon: UserRound },
      { href: "/lien-he", label: "Liên hệ & Góp ý", icon: MessageCircleHeart },
    ],
  },
];

interface SidebarUser {
  role: string;
  level: string;
}

function NavLink({
  item,
  active,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        // Mục menu là một "viên kẹo" bo tròn hoàn toàn, cao ≥48px cho ngón tay trẻ.
        "group relative flex min-h-12 items-center gap-3 rounded-full px-3.5 py-2.5 font-display transition-colors",
        active
          ? "text-[1.02rem] font-extrabold text-brand-gold"
          : "text-[0.96rem] font-bold text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {active && (
        <>
          <motion.span
            layoutId="nav-active"
            transition={{ type: "spring", stiffness: 400, damping: 34 }}
            className="absolute inset-0 rounded-full bg-band-sun"
          />
          <motion.span
            layoutId="nav-active-bar"
            transition={{ type: "spring", stiffness: 400, damping: 34 }}
            className="absolute left-0 top-1/2 h-6 w-1.5 -translate-y-1/2 rounded-r-full bg-brand-sun"
          />
        </>
      )}
      {/* Icon mục đang chọn to hơn hẳn — trẻ nhận ra "mình đang ở đây" bằng hình. */}
      <Icon
        className={cn(
          "relative z-10 shrink-0 transition-transform group-hover:scale-110",
          active ? "h-[23px] w-[23px]" : "h-[20px] w-[20px]"
        )}
      />
      <span className="relative z-10">{item.label}</span>
    </Link>
  );
}

function NavContent({ user, onNavigate }: { user: SidebarUser; onNavigate?: () => void }) {
  const pathname = usePathname();
  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <Link
        href="/"
        className="flex h-[74px] items-center gap-2.5 border-b-2 border-border px-5"
        aria-label="DingDong Kids — về trang chủ"
      >
        <Logo className="h-10 w-10 animate-tilt" />
        <div className="leading-tight">
          <Wordmark className="text-[1.05rem]" />
          <div className="eyebrow text-[9px] text-muted-foreground">Học tiếng Anh</div>
        </div>
      </Link>

      {/* Nav */}
      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className="space-y-1">
            {group.title && (
              <p className="eyebrow px-3.5 pb-1 text-[10px] text-muted-foreground/80">
                {group.title}
              </p>
            )}
            {group.items.map((item) => (
              <NavLink key={item.href} item={item} active={isActive(item)} onNavigate={onNavigate} />
            ))}
          </div>
        ))}

        {user.role === "ADMIN" && (
          <div className="space-y-1">
            <p className="eyebrow px-3.5 pb-1 text-[10px] text-muted-foreground/80">
              Quản trị
            </p>
            <Link
              href="/admin"
              onClick={onNavigate}
              className={cn(
                "group relative flex min-h-12 items-center gap-3 rounded-full px-3.5 py-2.5 font-display transition-colors",
                pathname.startsWith("/admin")
                  ? "text-[1.02rem] font-extrabold text-brand-gold"
                  : "text-[0.96rem] font-bold text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {pathname.startsWith("/admin") && (
                <>
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-band-sun"
                  />
                  <motion.span
                    layoutId="nav-active-bar"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    className="absolute left-0 top-1/2 h-6 w-1.5 -translate-y-1/2 rounded-r-full bg-brand-sun"
                  />
                </>
              )}
              <Shield
                className={cn(
                  "relative z-10 shrink-0 transition-transform group-hover:scale-110",
                  pathname.startsWith("/admin") ? "h-[23px] w-[23px]" : "h-[20px] w-[20px]"
                )}
              />
              <span className="relative z-10">Trang quản trị</span>
            </Link>
          </div>
        )}
      </nav>

      {/* Bottom cards — hai khối pastel: vàng nắng cho phần thưởng, bạc hà cho mục tiêu */}
      <div className="space-y-2 border-t-2 border-border p-3">
        <div className="flex items-center justify-between rounded-xl bg-muted px-3 py-1">
          <span className="text-[13px] font-bold text-muted-foreground">Giao diện</span>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2.5 rounded-xl bg-band-yel p-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-brand-gold shadow-soft">
            <Crown className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-[14px] font-extrabold text-brand-gold">Premium</div>
            <div className="text-[11px] font-semibold text-muted-foreground">Mở khoá toàn bộ bài học</div>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-band-mint p-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-lg shadow-soft">🎓</div>
          <div className="leading-tight">
            <div className="text-[11px] font-semibold text-muted-foreground">Cấp độ mục tiêu</div>
            <div className="font-display text-[14px] font-extrabold text-brand-teal">{levelLabel(user.level)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Sidebar({
  user,
  mobileOpen,
  onClose,
}: {
  user: SidebarUser;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Desktop: fixed sidebar */}
      <aside className="hidden border-r-2 border-border bg-card/85 backdrop-blur-xl lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block lg:w-64">
        <LayoutGroup id="sb-desktop">
          <NavContent user={user} />
        </LayoutGroup>
      </aside>

      {/* Mobile: slide-over drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Nâu cacao CỐ ĐỊNH: lớp phủ phải tối ở cả chế độ sáng lẫn tối, nên
              không dùng token (token `foreground` đảo thành kem ở chế độ tối). */}
          <div
            className="animate-fade-in absolute inset-0 bg-[hsl(27_58%_10%/0.55)] backdrop-blur-sm"
            onClick={onClose}
          />
          <aside className="animate-fade-up absolute inset-y-0 left-0 w-72 max-w-[82%] rounded-r-2xl bg-card shadow-soft-xl">
            <button
              onClick={onClose}
              aria-label="Đóng menu"
              className="absolute right-3 top-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-band-coral hover:text-brand-coral"
            >
              <X className="h-5 w-5" />
            </button>
            <LayoutGroup id="sb-mobile">
              <NavContent user={user} onNavigate={onClose} />
            </LayoutGroup>
          </aside>
        </div>
      )}
    </>
  );
}
