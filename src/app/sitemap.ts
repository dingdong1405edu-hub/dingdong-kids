import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap các trang công khai — Next tự phục vụ tại /sitemap.xml.
 * Không khai lastModified: sitemap được dựng lại mỗi lần deploy (rất thường
 * xuyên) nên lastmod "mới tinh" giả sẽ khiến Google bỏ qua tín hiệu này.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/gioi-thieu`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/payment`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/login`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/register`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/dieu-khoan`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/chinh-sach`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
