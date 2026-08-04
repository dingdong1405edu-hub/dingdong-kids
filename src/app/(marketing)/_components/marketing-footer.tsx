import Link from "next/link";
import { Facebook, Youtube } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { SOCIAL_LINKS, SUPPORT_EMAIL } from "@/lib/site";

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
 * MÀU CỐ ĐỊNH, KHÔNG DÙNG TOKEN — có chủ đích.
 * Chân trang luôn là một khối nâu cacao đậm với chữ kem ở CẢ chế độ sáng lẫn
 * tối (nó là "mặt đất" khép lại trang). Token `--c-cocoa` đảo nghĩa ở chế độ
 * tối (sáng: nâu đậm làm chữ · tối: kem), nên `bg-brand-cocoa` sẽ biến chân
 * trang thành một mảng kem chói vào ban đêm.
 */
const FOOTER_BG = "bg-[hsl(27_58%_13%)]";
const CREAM = "text-[hsl(44_60%_92%)]";
const CREAM_DIM = "text-[hsl(44_28%_78%)]";
const HAIRLINE = "border-[hsl(0_0%_100%/0.13)]";

/** Liên kết trong chân trang: chữ kem dịu, sáng lên thành vàng nắng khi rê chuột. */
const footerLinkClass = `inline-flex min-h-9 items-center text-[0.95rem] font-semibold ${CREAM_DIM} transition-colors hover:text-brand-yellow`;

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
    <footer className={`${FOOTER_BG} ${CREAM} pt-14`}>
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Link
              href="/"
              className="flex min-h-12 items-center gap-2.5"
              aria-label="DingDong Kids — về trang chủ"
            >
              <Logo className="h-12 w-12" />
              {/* Chữ kem đặc, KHÔNG dùng <Wordmark> ba màu: màu xanh của wordmark
                  được chọn để đọc trên nền kem, đặt lên nền nâu đậm sẽ chìm. */}
              <span className="font-display text-[1.35rem] font-extrabold tracking-tight">
                DingDong Kids
              </span>
            </Link>
            <p className={`mt-4 text-[0.95rem] font-semibold leading-relaxed ${CREAM_DIM}`}>
              Nền tảng học tiếng Anh cho trẻ em Việt 3–15 tuổi: lộ trình Cambridge Young Learners,
              ghép vần, và AI chấm bài viết cùng luyện nói. Chặng đầu miễn phí 100%.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} của DingDong Kids (mở tab mới)`}
                  title={s.label}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(0_0%_100%/0.1)] text-[hsl(44_60%_92%)] transition-all duration-200 ease-toy hover:-translate-y-1 hover:bg-brand-yellow hover:text-[hsl(27_58%_15%)]"
                >
                  {SOCIAL_ICONS[s.key]}
                </a>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-[1.05rem] font-extrabold text-brand-yellow">{col.title}</h3>
              <ul className="mt-3 list-none space-y-1">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {isRoute(l.href) ? (
                      <Link href={l.href} className={footerLinkClass}>
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.href} className={footerLinkClass}>
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className={`flex flex-col items-center gap-3 border-t-2 ${HAIRLINE} py-7 text-center text-sm font-semibold ${CREAM_DIM}`}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
            <Link href="/dieu-khoan" className="transition-colors hover:text-brand-yellow">
              Điều khoản sử dụng
            </Link>
            <span aria-hidden>·</span>
            <Link href="/chinh-sach" className="transition-colors hover:text-brand-yellow">
              Chính sách bảo mật
            </Link>
            <span aria-hidden>·</span>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="transition-colors hover:text-brand-yellow">
              {SUPPORT_EMAIL}
            </a>
          </div>
          © {year} DingDong Kids · Thanh toán an toàn qua PayOS
        </div>
      </div>
    </footer>
  );
}
