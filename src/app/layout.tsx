import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  // metadataBase để Next resolve canonical/og:image tương đối về domain thật
  // (thiếu nó, canonical trên Railway sẽ trỏ về localhost).
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DingDong Kids — Học tiếng Anh vui cho bé 4-15 tuổi",
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Nền tảng học tiếng Anh cho trẻ em Việt Nam theo chuẩn Cambridge Young Learners (Pre-Starters → Preliminary B1). Bé học từ vựng, ghép vần, ngữ pháp, đọc, nghe, viết, nói qua trò chơi; AI chấm bài viết và phát âm; phụ huynh theo dõi tiến độ mỗi ngày.",
  keywords: [
    "học tiếng Anh cho trẻ em",
    "tiếng Anh cho bé",
    "tiếng Anh trẻ em online",
    "Cambridge Young Learners",
    "Starters Movers Flyers",
    "phonics cho bé",
    "luyện phát âm tiếng Anh cho trẻ",
    "DingDong Kids",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "vi_VN",
    images: [
      { url: "/og-cover.png", width: 1200, height: 630, alt: "DingDong Kids — Học tiếng Anh vui cho bé 4-15 tuổi" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-cover.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Khai báo hỗ trợ cả 2 giao diện để trình duyệt KHÔNG tự "bôi đen" trang.
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfaf1" },
    { media: "(prefers-color-scheme: dark)", color: "#121621" },
  ],
};

/**
 * Chạy TRƯỚC khi trình duyệt vẽ: đặt class `.dark` + `color-scheme` theo lựa
 * chọn đã lưu (hoặc cài đặt thiết bị) để tránh nhấp nháy (FOUC) và chặn trình
 * duyệt tự động đảo màu. Key phải trùng THEME_STORAGE_KEY trong theme-provider.
 */
const themeScript = `(function(){try{var k='dingdong-theme';var s=localStorage.getItem(k);if(s!=='light'&&s!=='dark'&&s!=='system')s='system';var d=s==='dark'||(s==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;if(d)r.classList.add('dark');r.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Toaster richColors position="top-right" theme="system" />
      </body>
    </html>
  );
}
