import Link from "next/link";
import { Facebook, Youtube } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { SOCIAL_LINKS, SUPPORT_EMAIL } from "@/lib/site";
import styles from "../landing.module.css";

/** Icon TikTok (lucide chưa có) — path chuẩn từ logo TikTok, tô bằng currentColor. */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .595.047.88.14V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.44 6.37 6.37 0 0 0 1.83-4.44V8.55a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.87.02z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  facebook: <Facebook className="h-[18px] w-[18px]" aria-hidden="true" />,
  tiktok: <TikTokIcon className="h-[17px] w-[17px]" />,
  youtube: <Youtube className="h-[19px] w-[19px]" aria-hidden="true" />,
};

// Mỗi nhãn phải trỏ tới MỘT đích riêng. Bản trước có 4 nhãn khác nhau cùng
// dẫn về /#features — người đọc bấm ba lần vẫn thấy đúng một chỗ.
const learnLinks = [
  { label: "Bé học những gì", href: "/#features" },
  { label: "Chặng Bé Tập Nói", href: "/#tap-noi" },
  { label: "AI chấm bài", href: "/#ai" },
  { label: "Lộ trình Cambridge", href: "/#levels" },
];

const exploreLinks = [
  { label: "Cách bắt đầu", href: "/#how" },
  { label: "Cam kết với bố mẹ", href: "/#cam-ket" },
  { label: "Bảng giá", href: "/#pricing" },
  { label: "Bảng giá chi tiết từng cấp", href: "/payment" },
  { label: "Câu hỏi thường gặp", href: "/#faq" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
];

/** Hash link (/#features) → <a>; route thuần → <Link>. */
const isRoute = (href: string) => href.startsWith("/") && !href.includes("#");

/**
 * Footer dùng chung cho các trang marketing (trang chủ, giới thiệu, pháp lý).
 * Cột "Tài khoản" đổi theo trạng thái đăng nhập; Cộng đồng/Liên hệ nằm sau
 * đăng nhập nên chỉ hiện với người đã có tài khoản.
 */
export function MarketingFooter({ isAuthed = false }: { isAuthed?: boolean }) {
  const accountLinks = isAuthed
    ? [
        { label: "Vào học", href: "/dashboard" },
        { label: "Hồ sơ của tôi", href: "/profile" },
        { label: "Cộng đồng", href: "/community" },
        { label: "Liên hệ & góp ý", href: "/lien-he" },
      ]
    : [
        { label: "Đăng nhập", href: "/login" },
        { label: "Đăng ký miễn phí", href: "/register" },
        { label: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
      ];

  const cols = [
    { title: "Học tập", links: learnLinks },
    { title: "Khám phá", links: exploreLinks },
    { title: "Tài khoản", links: accountLinks },
  ];

  // Năm bản quyền tính lúc render — hardcode "2026" sẽ cũ đi vào ngày 1/1 năm sau.
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.footerLogo} aria-label="DingDong Kids — về trang chủ">
              <Logo className={styles.footerLogoIcon} />
              DingDong Kids
            </Link>
            <p>
              Nền tảng học tiếng Anh cho trẻ em Việt 3–15 tuổi: lộ trình Cambridge Young Learners,
              ghép vần, và AI chấm bài viết cùng luyện nói. Chặng đầu miễn phí 100%.
            </p>
            <div className={styles.footerSocial}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} của DingDong Kids (mở tab mới)`}
                  title={s.label}
                >
                  {SOCIAL_ICONS[s.key]}
                </a>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h3 className={styles.footerColTitle}>{col.title}</h3>
              <ul className={styles.footerLinks}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    {isRoute(l.href) ? <Link href={l.href}>{l.label}</Link> : <a href={l.href}>{l.label}</a>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.footerLegal}>
            <Link href="/dieu-khoan">Điều khoản sử dụng</Link>
            <span aria-hidden>·</span>
            <Link href="/chinh-sach">Chính sách bảo mật</Link>
            <span aria-hidden>·</span>
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </div>
          © {year} DingDong Kids · Thanh toán an toàn qua PayOS
        </div>
      </div>
    </footer>
  );
}
