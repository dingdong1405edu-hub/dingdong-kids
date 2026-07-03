import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Chỉ dẫn crawler — chặn khu vực riêng tư, khai báo sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/api/",
          "/dashboard",
          "/profile",
          "/goals",
          "/payment/success",
          "/payment/cancel",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
