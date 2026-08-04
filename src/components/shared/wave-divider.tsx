import { cn } from "@/lib/utils";

/**
 * Dải sóng ngăn giữa hai khối màu — chữ ký thị giác của giao diện DingDong Kids.
 * Không có nó, hai khối pastel cạnh nhau tạo một đường cắt thẳng cứng nhắc,
 * đúng thứ giao diện trẻ em cần tránh.
 *
 * Cách dùng: đặt GIỮA hai `<section>`, `top` = màu khối phía TRÊN,
 * `bottom` = màu khối phía DƯỚI.
 *
 *   <section className="bg-band-sun">…</section>
 *   <WaveDivider top="sun" bottom="coral" />
 *   <section className="bg-band-coral">…</section>
 *
 * Đường sóng lặp lại ĐÚNG hai lần trong viewBox và svg rộng 200% → hoạt hình
 * dịch ngang -50% khép kín, không thấy mối nối.
 */
export type BandName = "cream" | "sun" | "coral" | "lav" | "yel" | "mint" | "sky" | "white";

const BAND_COLOR: Record<BandName, string> = {
  cream: "hsl(var(--band-cream))",
  sun: "hsl(var(--band-sun))",
  coral: "hsl(var(--band-coral))",
  lav: "hsl(var(--band-lav))",
  yel: "hsl(var(--band-yel))",
  mint: "hsl(var(--band-mint))",
  sky: "hsl(var(--band-sky))",
  white: "hsl(var(--card))",
};

/** Một "ô" sóng rộng 1200, lặp hai lần → viewBox rộng 2400. Điểm đầu và điểm
 *  cuối của mỗi ô đều ở y=60 nên hai ô nối vào nhau liền mạch. */
const WAVE =
  "M0,60 C150,20 300,20 450,55 C600,90 750,95 900,65 C1000,45 1120,40 1200,60 " +
  "C1350,20 1500,20 1650,55 C1800,90 1950,95 2100,65 C2200,45 2320,40 2400,60 " +
  "L2400,100 L0,100 Z";

export function WaveDivider({
  top,
  bottom,
  flip = false,
  className,
}: {
  /** Màu khối phía trên — nền của chính dải sóng. */
  top: BandName;
  /** Màu khối phía dưới — màu của con sóng. */
  bottom: BandName;
  /** Lật ngang để hai dải sóng liên tiếp không trông giống hệt nhau. */
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative z-[4] overflow-hidden leading-[0]", className)}
      style={{ background: BAND_COLOR[top] }}
    >
      <svg
        viewBox="0 0 2400 100"
        preserveAspectRatio="none"
        className={cn(
          "h-[clamp(30px,4.4vw,52px)] w-[200%] animate-wave-slide",
          flip && "scale-x-[-1]"
        )}
      >
        {/* Lớp sóng sau, mờ hơn và nhô cao hơn → cảm giác có chiều sâu. */}
        <path d={WAVE} fill={BAND_COLOR[bottom]} opacity="0.45" transform="translate(0,-14)" />
        <path d={WAVE} fill={BAND_COLOR[bottom]} />
      </svg>
    </div>
  );
}
