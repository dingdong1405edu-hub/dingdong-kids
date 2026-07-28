// ===========================================================================
//  CẤU HÌNH GÓI & CHÍNH SÁCH GIÁ  —  CHỈNH SỬA TẠI ĐÂY
//  File KHÔNG chứa secret, dùng được ở cả client lẫn server (đừng import prisma).
//
//  • amount       : SỐ TIỀN VND nguyên (vd 900000 = 900.000đ).
//  • durationDays : số ngày quyền lợi có hiệu lực (180 = 6 tháng, 30 = 1 tháng…).
//  • code         : nội dung chuyển khoản (≤ 25 ký tự, không dấu).
//  • grants       : quyền lợi được cấp khi thanh toán thành công.
//      - { type: "ROADMAP", level } → mở khóa lộ trình cấp đó.
//      - { type: "FREESTYLE" }      → mọi tính năng ngoài lộ trình + tim ∞.
//    (Mọi gói trả phí đều cho TIM KHÔNG GIỚI HẠN — xem src/lib/entitlements.ts.)
// ===========================================================================

export type GrantType = "ROADMAP" | "FREESTYLE";
export type LevelStr = "PRE_STARTERS" | "STARTERS" | "MOVERS" | "FLYERS" | "KET" | "PET";
export type PlanCategory = "roadmap" | "freestyle";

export interface PlanGrant {
  type: GrantType;
  level?: LevelStr;
}

export interface PaymentPlan {
  id: string;
  category: PlanCategory;
  name: string;
  /** Nội dung chuyển khoản (≤ 25 ký tự, ưu tiên không dấu). */
  code: string;
  /** 👉 GIÁ (VND). */
  amount: number;
  /** Thời hạn quyền lợi (ngày). */
  durationDays: number;
  /** Cấp độ (chỉ gói lộ trình) — để hiển thị. */
  level?: LevelStr;
  /** Nhãn chu kỳ cạnh giá, vd "/ 6 tháng". */
  period?: string;
  description: string;
  features: string[];
  grants: PlanGrant[];
  /** Ghi chú khuyến mãi hiển thị trên thẻ. */
  promoNote?: string;
  highlighted?: boolean;
}

// --- Gói LỘ TRÌNH (theo cấp độ, 6 tháng). Từ Movers trở lên tặng Gói Tự do. ---
export const ROADMAP_PLANS: PaymentPlan[] = [
  {
    id: "roadmap-pre-starters",
    category: "roadmap",
    name: "Lộ trình Pre-Starters",
    code: "DDKIDS PRESTARTERS",
    amount: 900000, // 👉 GIÁ
    durationDays: 180,
    level: "PRE_STARTERS",
    period: "/ 6 tháng",
    description: "Toàn bộ lộ trình Pre-Starters (4–5 tuổi) trong 6 tháng.",
    features: [
      "Mở khóa toàn bộ bài lộ trình Pre-Starters",
      "Tim không giới hạn",
      "Theo dõi tiến độ & điểm thưởng",
    ],
    grants: [{ type: "ROADMAP", level: "PRE_STARTERS" }],
  },
  {
    id: "roadmap-starters",
    category: "roadmap",
    name: "Lộ trình Starters",
    code: "DDKIDS STARTERS",
    amount: 1200000, // 👉 GIÁ
    durationDays: 180,
    level: "STARTERS",
    period: "/ 6 tháng",
    description: "Toàn bộ lộ trình Starters (6–7 tuổi) trong 6 tháng.",
    features: [
      "Mở khóa toàn bộ bài lộ trình Starters",
      "Tim không giới hạn",
      "Theo dõi tiến độ & điểm thưởng",
    ],
    grants: [{ type: "ROADMAP", level: "STARTERS" }],
  },
  {
    id: "roadmap-movers",
    category: "roadmap",
    name: "Lộ trình Movers",
    code: "DDKIDS MOVERS",
    amount: 1500000, // 👉 GIÁ
    durationDays: 180,
    level: "MOVERS",
    period: "/ 6 tháng",
    description: "Lộ trình Movers (7–9 tuổi) + tặng Gói Tự do.",
    features: ["Mở khóa toàn bộ bài lộ trình Movers", "🎁 Tặng kèm Gói Tự do", "Tim không giới hạn"],
    grants: [{ type: "ROADMAP", level: "MOVERS" }, { type: "FREESTYLE" }],
    highlighted: true,
  },
  {
    id: "roadmap-flyers",
    category: "roadmap",
    name: "Lộ trình Flyers",
    code: "DDKIDS FLYERS",
    amount: 1800000, // 👉 GIÁ
    durationDays: 180,
    level: "FLYERS",
    period: "/ 6 tháng",
    description: "Lộ trình Flyers (9–11 tuổi) + tặng Gói Tự do.",
    features: ["Mở khóa toàn bộ bài lộ trình Flyers", "🎁 Tặng kèm Gói Tự do", "Tim không giới hạn"],
    grants: [{ type: "ROADMAP", level: "FLYERS" }, { type: "FREESTYLE" }],
  },
  {
    id: "roadmap-ket",
    category: "roadmap",
    name: "Lộ trình Key (A2)",
    code: "DDKIDS KEY A2",
    amount: 2100000, // 👉 GIÁ
    durationDays: 180,
    level: "KET",
    period: "/ 6 tháng",
    description: "Lộ trình Key A2 (11–13 tuổi) + tặng Gói Tự do.",
    features: ["Mở khóa toàn bộ bài lộ trình Key A2", "🎁 Tặng kèm Gói Tự do", "Tim không giới hạn"],
    grants: [{ type: "ROADMAP", level: "KET" }, { type: "FREESTYLE" }],
  },
  {
    id: "roadmap-pet",
    category: "roadmap",
    name: "Lộ trình Preliminary (B1)",
    code: "DDKIDS PRELIM B1",
    amount: 2400000, // 👉 GIÁ
    durationDays: 180,
    level: "PET",
    period: "/ 6 tháng",
    description: "Lộ trình Preliminary B1 (13–15 tuổi) + tặng Gói Tự do.",
    features: [
      "Mở khóa toàn bộ bài lộ trình Preliminary B1",
      "🎁 Tặng kèm Gói Tự do",
      "Tim không giới hạn",
    ],
    grants: [{ type: "ROADMAP", level: "PET" }, { type: "FREESTYLE" }],
  },
];

// --- Gói TỰ DO (mọi tính năng ngoài lộ trình + tim không giới hạn) -----------
export const FREESTYLE_PLANS: PaymentPlan[] = [
  {
    id: "freestyle-1m",
    category: "freestyle",
    name: "Gói Tự do",
    code: "DDKIDS TU DO 1THANG",
    amount: 250000, // 👉 GIÁ
    durationDays: 30,
    period: "/ tháng",
    description: "Mọi tính năng ngoài lộ trình, tim không giới hạn.",
    features: [
      "Tất cả tính năng (trừ học theo lộ trình)",
      "Tim không giới hạn",
      "AI chấm viết & luyện nói",
    ],
    grants: [{ type: "FREESTYLE" }],
  },
  {
    id: "freestyle-3m",
    category: "freestyle",
    name: "Gói Tự do · 3 tháng",
    code: "DDKIDS TU DO 3THANG",
    amount: 600000, // 👉 GIÁ (tháng đầu giảm còn 100k → 100k + 250k + 250k)
    durationDays: 90,
    period: "/ 3 tháng",
    description: "Ưu đãi tháng đầu chỉ 100k.",
    features: ["Mọi quyền lợi Gói Tự do", "Tháng đầu chỉ 100k", "Tiết kiệm hơn trả từng tháng"],
    grants: [{ type: "FREESTYLE" }],
    promoNote: "🔥 Tháng đầu 100k",
    highlighted: true,
  },
];

export const PAYMENT_PLANS: PaymentPlan[] = [...ROADMAP_PLANS, ...FREESTYLE_PLANS];

export function getPlan(id: string): PaymentPlan | undefined {
  return PAYMENT_PLANS.find((p) => p.id === id);
}

/** Gói lộ trình tương ứng một cấp độ (để liên kết "Nâng cấp" từ trang lộ trình). */
export function roadmapPlanForLevel(level: string): PaymentPlan | undefined {
  return ROADMAP_PLANS.find((p) => p.level === level);
}

/** Định dạng tiền VN, vd 900000 → "900.000 ₫". */
export function formatVnd(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}
