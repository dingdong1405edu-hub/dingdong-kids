// ===========================================================================
//  THÔNG TIN SITE DÙNG CHUNG — nguồn duy nhất cho SEO, footer, JSON-LD.
//  Đổi domain / kênh mạng xã hội / email: chỉ cần sửa tại đây.
// ===========================================================================

/** Domain production (canonical) — KHÔNG lấy từ env để canonical không bao giờ trỏ nhầm về URL nội bộ Railway. */
export const SITE_URL = "https://dingdonghsk.com";

export const SITE_NAME = "DingDong HSK";

export const SUPPORT_EMAIL = "dingdong1405edu@gmail.com";

/** Kênh mạng xã hội chính thức (hiện ở footer + JSON-LD sameAs). */
export const SOCIAL_LINKS = [
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61591472526867",
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@ng51871",
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCvHm4kSK-lJKHNGWnbZADXQ",
  },
] as const;
