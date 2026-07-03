import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { PAYMENT_PLANS } from "@/lib/payment-plans";
import { isPayosConfigured } from "@/lib/payos";
import { SITE_NAME } from "@/lib/site";
import { PaymentClient } from "./payment-client";

export const metadata: Metadata = {
  title: "Bảng giá & Thanh toán",
  description:
    "Bảng giá DingDong HSK: Gói Lộ trình theo cấp HSK 1–6 (6 tháng) và Gói Tự do mở mọi tính năng luyện tập. Thanh toán an toàn qua PayOS, kích hoạt ngay khi thanh toán thành công.",
  alternates: { canonical: "/payment" },
  openGraph: {
    title: "Bảng giá DingDong HSK",
    description:
      "Gói Lộ trình theo cấp HSK 1–6 và Gói Tự do mở mọi tính năng luyện tập. Thanh toán an toàn qua PayOS.",
    url: "/payment",
    type: "website",
    locale: "vi_VN",
    siteName: SITE_NAME,
    images: [{ url: "/bao-cover.png", width: 1376, height: 768, alt: "DingDong HSK — Học tiếng Trung chuẩn HSK" }],
  },
};

export const dynamic = "force-dynamic";

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const session = await auth();
  const sp = await searchParams;

  return (
    <PaymentClient
      plans={PAYMENT_PLANS}
      configured={isPayosConfigured()}
      loggedIn={!!session?.user}
      defaultName={session?.user?.name ?? ""}
      defaultEmail={session?.user?.email ?? ""}
      initialPlanId={sp.plan ?? null}
    />
  );
}
