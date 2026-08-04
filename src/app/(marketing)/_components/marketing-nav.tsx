"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { GraduationCap, LogOut, Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import styles from "../landing.module.css";

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

/** Ngưỡng đổi sang menu hamburger — PHẢI khớp @media trong landing.module.css. */
const MOBILE_BREAKPOINT = 980;

/** Anchor hash (#...) → thẻ <a>; route thuần (/gioi-thieu) → <Link> của Next. */
const isRoute = (href: string) => href.startsWith("/") && !href.includes("#");

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
      className={`${styles.navbar}${scrolled ? ` ${styles.navbarScrolled}` : ""}`}
      aria-label="Điều hướng chính"
    >
      <div className={styles.navContainer}>
        <Link
          href="/"
          className={styles.navLogo}
          aria-label="DingDong Kids — về trang chủ"
          onClick={() => close()}
        >
          <Logo className={styles.navLogoIcon} />
          <span>
            DingDong <b>Kids</b>
          </span>
        </Link>

        <ul className={styles.navLinks}>
          {LINKS.map((l) => (
            <li key={l.href}>
              {isRoute(l.href) ? (
                <Link href={l.href}>{l.label}</Link>
              ) : (
                <a href={l.href}>{l.label}</a>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.navActions}>
          <ThemeToggle />
          {isAuthed ? (
            <>
              <button type="button" onClick={logout} className={styles.navLogin}>
                <LogOut className="h-4 w-4" aria-hidden="true" /> Đăng xuất
              </button>
              <Link href="/dashboard" className={styles.navCta}>
                <GraduationCap className="h-[18px] w-[18px]" aria-hidden="true" /> Vào học
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.navLogin}>
                Đăng nhập
              </Link>
              <Link href="/register" className={styles.navCta}>
                Học miễn phí
              </Link>
            </>
          )}
          <button
            ref={toggleRef}
            type="button"
            className={styles.mobileBtn}
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
        className={`${styles.mobileMenu}${open ? ` ${styles.mobileMenuOpen}` : ""}`}
      >
        {MOBILE_LINKS.map((l) =>
          isRoute(l.href) ? (
            <Link key={l.href} href={l.href} onClick={() => close()}>
              {l.label}
            </Link>
          ) : (
            <a key={l.href} href={l.href} onClick={() => close()}>
              {l.label}
            </a>
          ),
        )}
        {isAuthed ? (
          <>
            <button
              type="button"
              onClick={() => {
                close();
                logout();
              }}
            >
              <LogOut className="h-[18px] w-[18px]" aria-hidden="true" /> Đăng xuất
            </button>
            <Link href="/dashboard" className={styles.mobileCta} onClick={() => close()}>
              <GraduationCap className="h-[18px] w-[18px]" aria-hidden="true" /> Vào học →
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" onClick={() => close()}>
              Đăng nhập
            </Link>
            <Link href="/register" className={styles.mobileCta} onClick={() => close()}>
              Học miễn phí →
            </Link>
          </>
        )}
      </div>
    </nav>

    {/* Lớp phủ — đặt NGOÀI <nav> (navbar có backdrop-filter nên sẽ "giam" phần tử
        fixed bên trong); để đây mới phủ đúng toàn màn hình. Chạm để đóng menu.
        aria-hidden cố định: nút X trong menu đã đảm nhận việc đóng cho screen reader. */}
    <button
      type="button"
      aria-hidden="true"
      tabIndex={-1}
      className={`${styles.mobileBackdrop}${open ? ` ${styles.mobileBackdropOpen}` : ""}`}
      onClick={() => close(true)}
    />
    </>
  );
}
