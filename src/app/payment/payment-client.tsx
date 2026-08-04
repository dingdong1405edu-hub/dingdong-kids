"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Check, Loader2, ShieldCheck, Sparkles, ArrowLeft, Map, Infinity as InfinityIcon } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatVnd, type PaymentPlan } from "@/lib/payment-plans";
import { SUPPORT_EMAIL } from "@/lib/site";
import { createPaymentOrder } from "@/server/actions/payment";

interface Props {
  plans: PaymentPlan[];
  configured: boolean;
  loggedIn: boolean;
  defaultName: string;
  defaultEmail: string;
  initialPlanId: string | null;
}

export function PaymentClient({
  plans,
  configured,
  loggedIn,
  defaultName,
  defaultEmail,
  initialPlanId,
}: Props) {
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const roadmapPlans = plans.filter((p) => p.category === "roadmap");
  const freestylePlans = plans.filter((p) => p.category === "freestyle");

  function handleBuy(planId: string) {
    if (!loggedIn) {
      toast.error("Vui lòng đăng nhập để mua gói.");
      return;
    }
    if (!configured) {
      toast.error("Cổng thanh toán đang được hoàn tất cấu hình. Vui lòng quay lại sau.");
      return;
    }
    setPendingId(planId);
    startTransition(async () => {
      const res = await createPaymentOrder({
        planId,
        buyerName: name.trim() || undefined,
        buyerEmail: email.trim() || undefined,
      });
      if (res.ok) {
        window.location.href = res.checkoutUrl; // sang trang thanh toán PayOS
      } else {
        toast.error(res.error);
        setPendingId(null);
      }
    });
  }

  const renderCard = (plan: PaymentPlan) => {
    const loading = isPending && pendingId === plan.id;
    const highlighted = plan.highlighted || plan.id === initialPlanId;
    return (
      <div
        key={plan.id}
        className={cn(
          // Thẻ giá là một khối đồ chơi: bo rất tròn, viền dày, nhô lên khi rê chuột.
          "relative flex flex-col rounded-2xl border-2 bg-card p-6 shadow-soft transition-transform duration-200 ease-toy hover:-translate-y-1.5",
          highlighted ? "border-brand-sun shadow-soft-primary" : "border-border"
        )}
      >
        {plan.promoNote ? (
          <Badge className="absolute -top-3 left-1/2 max-w-[calc(100%-1rem)] -translate-x-1/2 whitespace-nowrap shadow-soft">
            {plan.promoNote}
          </Badge>
        ) : (
          highlighted && (
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-soft">Phổ biến nhất</Badge>
          )
        )}

        <h3 className="font-display text-xl font-extrabold">{plan.name}</h3>
        <p className="mt-1 min-h-10 text-sm font-semibold text-muted-foreground">{plan.description}</p>

        <div className="mt-4 flex items-end gap-1">
          <span className="font-display text-4xl font-extrabold tracking-tight text-brand-gold">
            {formatVnd(plan.amount)}
          </span>
          {plan.period && (
            <span className="mb-1.5 text-sm font-bold text-muted-foreground">{plan.period}</span>
          )}
        </div>

        <ul className="mt-5 flex-1 space-y-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm font-semibold">
              <span className="tick mt-1">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <Button
          className="mt-6 w-full"
          size="lg"
          variant={highlighted ? "default" : "outline"}
          disabled={isPending}
          onClick={() => handleBuy(plan.id)}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Đang tạo đơn…
            </>
          ) : (
            "Thanh toán"
          )}
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Link
            href={loggedIn ? "/dashboard" : "/"}
            className="mb-6 inline-flex items-center gap-2 self-start text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Quay lại
          </Link>
          <Link href="/" aria-label="DingDong Kids — về trang chủ">
            <Logo className="mb-4 h-12 w-12" />
          </Link>
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Nâng cấp tài khoản
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Bảng giá DingDong Kids</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Học theo lộ trình từng cấp độ Cambridge, hoặc dùng Gói Tự do để mở mọi tính năng luyện tập ngoài
            lộ trình. Mọi gói trả phí đều có{" "}
            <span className="font-semibold text-foreground">tim không giới hạn</span>. Thanh toán an
            toàn qua PayOS.
          </p>
        </div>

        {!loggedIn && (
          <div className="mx-auto mb-8 max-w-xl rounded-lg border border-brand-yellow bg-band-sun px-4 py-3 text-center text-sm text-brand-gold">
            Bạn cần{" "}
            <Link href="/login" className="font-semibold underline">
              đăng nhập
            </Link>{" "}
            để mua gói (quyền lợi gắn với tài khoản của bạn).
          </div>
        )}
        {loggedIn && !configured && (
          <div className="mx-auto mb-8 max-w-xl rounded-lg border border-brand-yellow bg-band-sun px-4 py-3 text-center text-sm text-brand-gold">
            Cổng thanh toán đang được hoàn tất cấu hình. Bạn vẫn xem được bảng giá; nút thanh toán sẽ
            hoạt động ngay khi hoàn tất.
          </div>
        )}

        {/* Thông tin người mua (tùy chọn) */}
        <div className="mx-auto mb-12 grid max-w-xl gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="buyerName">Họ tên (tùy chọn)</Label>
            <Input
              id="buyerName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nguyễn Văn A"
              autoComplete="name"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="buyerEmail">Email (tùy chọn)</Label>
            <Input
              id="buyerEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ban@email.com"
              autoComplete="email"
            />
          </div>
        </div>

        {/* Gói Lộ trình */}
        <section className="mb-12">
          <div className="mb-5 flex items-center gap-2">
            <Map className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Học theo lộ trình (Pre-Starters → B1)</h2>
          </div>
          <p className="mb-5 text-sm text-muted-foreground">
            Mỗi gói mở khóa toàn bộ lộ trình một cấp độ Cambridge trong 6 tháng. Từ Movers trở lên được{" "}
            <span className="font-semibold text-foreground">tặng kèm Gói Tự do</span>.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{roadmapPlans.map(renderCard)}</div>
        </section>

        {/* Gói Tự do */}
        <section>
          <div className="mb-5 flex items-center gap-2">
            <InfinityIcon className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Gói Tự do</h2>
          </div>
          <p className="mb-5 text-sm text-muted-foreground">
            Mở tất cả tính năng (trừ học theo lộ trình) cùng tim không giới hạn.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:max-w-2xl">{freestylePlans.map(renderCard)}</div>
        </section>

        {/* FAQ mua hàng */}
        <section className="mx-auto mt-14 max-w-2xl">
          <h2 className="mb-4 text-center text-lg font-bold">Câu hỏi thường gặp</h2>
          <div className="space-y-3 text-sm">
            {[
              {
                q: "Thanh toán bằng cách nào?",
                a: "Quét mã QR hoặc chuyển khoản ngân hàng qua cổng PayOS. Bạn được chuyển sang trang PayOS để hoàn tất giao dịch.",
              },
              {
                q: "Bao lâu thì gói được kích hoạt?",
                a: "Ngay khi PayOS xác nhận thanh toán thành công, quyền lợi được kích hoạt tự động trên tài khoản của bạn.",
              },
              {
                q: "Gói có tự động gia hạn không?",
                a: "Không. Gói hết hạn thì tài khoản trở về chế độ miễn phí; toàn bộ tiến độ học của bạn được giữ nguyên.",
              },
              {
                q: "Nếu thanh toán rồi mà chưa được kích hoạt?",
                a: `Hãy gửi email tới ${SUPPORT_EMAIL} kèm thông tin giao dịch; chúng tôi sẽ kiểm tra và kích hoạt lại hoặc hoàn tiền theo từng trường hợp.`,
              },
            ].map((f) => (
              <details key={f.q} className="group rounded-lg border bg-card px-4 py-3">
                <summary className="cursor-pointer list-none font-semibold text-foreground">
                  {f.q}
                </summary>
                <p className="mt-2 leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Trust footer */}
        <div className="mt-10 flex flex-col items-center gap-2 text-center text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Thanh toán bảo mật qua PayOS · Thông tin thẻ/ngân hàng không lưu trên hệ thống của chúng tôi.
          </div>
          <div>
            Bằng việc thanh toán, bạn đồng ý với{" "}
            <Link href="/dieu-khoan" className="underline hover:text-foreground">
              Điều khoản sử dụng
            </Link>{" "}
            của DingDong Kids.
          </div>
        </div>
      </div>
    </div>
  );
}
