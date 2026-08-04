"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { GraduationCap, LogOut, Menu, X } from "lucide-react";
import { Logo, Wordmark } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";

// Giữ ĐÚNG 5 mục: rộng hơn nữa thì ở khoảng 980–1100px thanh nav tràn ra ngoài
// (logo + 5 mục + 2 nút hành động đã chiếm gần hết bề ngang). Mục "Hỏi đáp" và
// "Cách học" nằm ở footer.
const LINKS = [
  { href: "/#features", label: "Bé học gì" },
  { href: "/#tap-noi", label: "Bé Tập Nói" },
  { href: "/#levels", label: "Lộ trình" },
  { href: "/#pricing", label: "Bảng giá" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
];

/** Menu mobile không bị giới hạn bề ngang nên liệt kê được đầy đủ hơn. */
const MOBILE_LINKS = [...LINKS, { href: "/#faq", label: "Hỏi đáp" }];

/**
 * Mỗi mục nav nhận một màu pastel riêng khi rê chuột — nav trở thành một dãy
 * kẹo màu thay vì một danh sách chữ. Lấy theo thứ tự nên số mục đổi vẫn chạy.
 */
const LINK_TINTS = [
  "hover:bg-band-sun",
  "hover:bg-band-coral",
  "hover:bg-band-mint",
  "hover:bg-band-lav",
  "hover:bg-band-sky",
  "hover:bg-band-yel",
];

/** Ngưỡng đổi sang menu hamburger — PHẢI khớp các biến thể `min-[981px]:` bên dưới. */
const MOBILE_BREAKPOINT = 980;

/** Anchor hash (#...) → thẻ <a>; route thuần (/gioi-thieu) → <Link> của Next. */
const isRoute = (href: string) => href.startsWith("/") && !href.includes("#");

/** Kiểu chung cho một mục nav desktop: viên kẹo bo tròn, nhích lên & nghiêng khi rê. */
const linkClass =
  "inline-flex min-h-11 items-center rounded-full px-3.5 py-2 font-display text-[0.95rem] font-extrabold text-foreground transition-all duration-200 ease-toy hover:-translate-y-0.5 hover:-rotate-2";

/** Mục trong menu mobile — hàng cao, gạch chân mảnh ngăn cách. */
const mobileLinkClass =
  "flex min-h-[52px] w-full items-center gap-2.5 rounded-xl border-b-2 border-border px-3 py-3 text-left font-display text-[1.02rem] font-extrabold text-foreground transition-colors last:border-b-0 hover:bg-muted";

/**
 * Thanh điều hướng cố định — đổ bóng khi cuộn, có menu mobile.
 * `isAuthed` được suy ra ở server (qua `auth()`) nên không bị nhấp nháy: đã đăng
 * nhập thì hiện "Vào học" + "Đăng xuất"; chưa thì hiện "Đăng nhập" + "Học miễn phí".
 */
export function MarketingNav({ isAuthed = false }: { isAuthed?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Khi menu mobile mở: khoá cuộn nền, đóng bằng Esc, và tự đóng khi phóng to
  // sang desktop (tránh menu kẹt mở khi xoay ngang / đổi kích thước).
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onResize = () => window.innerWidth > MOBILE_BREAKPOINT && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const logout = () => signOut({ callbackUrl: "/" });

  /**
   * Đóng menu. `returnFocus` dùng khi menu đóng bằng Esc / chạm nền: tiêu điểm
   * bàn phím phải quay về nút hamburger, nếu không người dùng bàn phím bị "rơi"
   * về đầu trang. KHÔNG trả tiêu điểm khi đóng do bấm vào một liên kết — lúc đó
   * trình duyệt cần giữ tiêu điểm để nhảy tới đúng vùng nội dung.
   */
  const close = (returnFocus = false) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  };

  return (
    <>
    <nav
      // Kem mờ + làm nhoè nền: nội dung trôi phía dưới vẫn thấy màu, không thành
      // một thanh đặc chắn ngang trang. Chiều cao 74px giữ nguyên vì các trang
      // marketing chừa đúng khoảng đó ở đầu nội dung.
      className={`fixed inset-x-0 top-0 z-[1000] border-b-2 border-border px-5 backdrop-blur-xl transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-background/95 shadow-soft-lg" : "bg-background/80"
      }`}
      aria-label="Điều hướng chính"
    >
      <div className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-h-12 shrink-0 items-center gap-2.5"
          aria-label="DingDong Kids — về trang chủ"
          onClick={() => close()}
        >
          <Logo className="h-11 w-11 animate-tilt" />
          <Wordmark className="text-[1.35rem]" />
        </Link>

        <ul className="hidden list-none items-center gap-1 min-[981px]:flex">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              {isRoute(l.href) ? (
                <Link href={l.href} className={`${linkClass} ${LINK_TINTS[i % LINK_TINTS.length]}`}>
                  {l.label}
                </Link>
              ) : (
                <a href={l.href} className={`${linkClass} ${LINK_TINTS[i % LINK_TINTS.length]}`}>
                  {l.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          {isAuthed ? (
            <>
              <Button
                type="button"
                onClick={logout}
                variant="ghost"
                size="sm"
                className="hidden min-[981px]:inline-flex"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" /> Đăng xuất
              </Button>
              <Button asChild size="sm" className="hidden min-[981px]:inline-flex">
                <Link href="/dashboard">
                  <GraduationCap className="h-[18px] w-[18px]" aria-hidden="true" /> Vào học
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden min-[981px]:inline-flex">
                <Link href="/login">Đăng nhập</Link>
              </Button>
              <Button asChild size="sm" className="hidden min-[981px]:inline-flex">
                <Link href="/register">Học miễn phí</Link>
              </Button>
            </>
          )}
          <button
            ref={toggleRef}
            type="button"
            className="-mr-1.5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted text-brand-gold transition-colors hover:bg-band-sun min-[981px]:hidden"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        // Luôn nằm trong cây (chỉ mờ + trượt) để chuyển động mượt; `invisible`
        // giữ nó ngoài tầm với của chuột lẫn bàn phím khi đang đóng.
        className={`absolute inset-x-0 top-full flex flex-col gap-0.5 rounded-b-2xl border-t-2 border-border bg-background px-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] pt-2.5 shadow-soft-xl transition-all duration-300 ease-toy min-[981px]:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
        }`}
      >
        {MOBILE_LINKS.map((l) =>
          isRoute(l.href) ? (
            <Link key={l.href} href={l.href} className={mobileLinkClass} onClick={() => close()}>
              {l.label}
            </Link>
          ) : (
            <a key={l.href} href={l.href} className={mobileLinkClass} onClick={() => close()}>
              {l.label}
            </a>
          ),
        )}
        {isAuthed ? (
          <>
            <button
              type="button"
              className={mobileLinkClass}
              onClick={() => {
                close();
                logout();
              }}
            >
              <LogOut className="h-[18px] w-[18px]" aria-hidden="true" /> Đăng xuất
            </button>
            <Button asChild className="mt-2.5 w-full">
              <Link href="/dashboard" onClick={() => close()}>
                <GraduationCap className="h-[18px] w-[18px]" aria-hidden="true" /> Vào học →
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" className={mobileLinkClass} onClick={() => close()}>
              Đăng nhập
            </Link>
            <Button asChild className="mt-2.5 w-full">
              <Link href="/register" onClick={() => close()}>
                Học miễn phí →
              </Link>
            </Button>
          </>
        )}
      </div>
    </nav>

    {/* Lớp phủ — đặt NGOÀI <nav> (navbar có backdrop-filter nên sẽ "giam" phần tử
        fixed bên trong); để đây mới phủ đúng toàn màn hình. Chạm để đóng menu.
        aria-hidden cố định: nút X trong menu đã đảm nhận việc đóng cho screen reader.
        Nâu cacao cố định (không dùng token): lớp phủ phải tối ở CẢ hai chế độ.
        `min-h-0` để thắng quy tắc min-height:48px của globals.css. */}
    <button
      type="button"
      aria-hidden="true"
      tabIndex={-1}
      className={`fixed inset-x-0 bottom-0 top-[74px] z-[990] min-h-0 cursor-default bg-[hsl(27_58%_10%/0.45)] transition-opacity duration-300 min-[981px]:hidden ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={() => close(true)}
    />
    </>
  );
}
