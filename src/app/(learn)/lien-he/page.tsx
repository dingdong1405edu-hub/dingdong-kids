import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircleHeart, Sparkles, Clock, Info } from "lucide-react";
import { auth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeedbackForm } from "@/components/learn/feedback-form";

export const metadata: Metadata = {
  title: "Liên hệ & Góp ý",
  description: "Liên hệ đội ngũ DingDong Kids và gửi góp ý để lớp học tiếng Anh của bé tốt hơn mỗi ngày.",
};

const SUPPORT_EMAIL = "dingdong1405edu@gmail.com";

export default async function ContactPage() {
  const session = await auth();
  const defaultEmail = session?.user?.email ?? "";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display flex items-center gap-2 text-2xl font-bold">
          <MessageCircleHeart className="h-6 w-6 text-primary" />
          Liên hệ &amp; Góp ý
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Mọi góp ý, báo lỗi hay câu hỏi của phụ huynh và các bé đều giúp DingDong Kids tốt hơn mỗi
          ngày. Chúng mình đọc tất cả 🧸
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Cột thông tin liên hệ */}
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-base">Thông tin liên hệ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-medium text-foreground">Email</span>
                  <span className="break-all text-muted-foreground">{SUPPORT_EMAIL}</span>
                </span>
              </a>

              <div className="flex items-start gap-3 rounded-lg p-2">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300">
                  <Clock className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-medium text-foreground">Thời gian phản hồi</span>
                  <span className="text-muted-foreground">Thường trong 1–2 ngày làm việc</span>
                </span>
              </div>

              <div className="flex items-start gap-3 rounded-lg p-2">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
                  <Info className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-medium text-foreground">Tìm hiểu thêm</span>
                  <Link href="/gioi-thieu" className="text-primary hover:underline">
                    Câu chuyện DingDong Kids
                  </Link>
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Gợi ý dùng trợ lý Ding cho câu hỏi học tập tức thời */}
          <Card className="sticker border-primary/30 bg-gradient-to-br from-primary/5 to-amber-50 dark:to-amber-500/10">
            <CardContent className="flex items-start gap-3 p-4">
              <span className="text-2xl" aria-hidden>
                🐻
              </span>
              <div className="text-sm">
                <p className="flex items-center gap-1.5 font-semibold text-foreground">
                  Cần giải đáp ngay? <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                </p>
                <p className="mt-1 text-muted-foreground">
                  Bấm vào bong bóng <span className="font-medium text-primary">chú gấu Ding</span> ở góc
                  phải màn hình để hỏi nhanh về từ vựng, ngữ pháp, cách phát âm hay mẹo ôn thi — trả
                  lời ngay, miễn phí.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cột form góp ý */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-base">Gửi góp ý cho chúng mình</CardTitle>
            </CardHeader>
            <CardContent>
              <FeedbackForm defaultEmail={defaultEmail} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
