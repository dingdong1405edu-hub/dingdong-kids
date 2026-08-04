import { cn } from "@/lib/utils";

/**
 * Dấu ấn thương hiệu DingDong Kids: đầu **gấu Ding** — chính là linh vật trẻ
 * gặp trong bài học (xem `DingArt`), không phải một biểu tượng riêng. Trẻ chưa
 * đọc được chữ nhận ra sản phẩm bằng khuôn mặt quen thuộc.
 *
 * Vẽ thẳng bằng SVG (không dùng file ảnh) để nét luôn sắc ở mọi kích thước và
 * không phụ thuộc asset. Truyền kích thước qua className, vd "h-9 w-9".
 */
export function Logo({ className, alt = "DingDong Kids" }: { className?: string; alt?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label={alt}
      className={cn("shrink-0 select-none", className)}
    >
      {/* Tai — vẽ trước thân để viền nằm dưới, trông liền khối */}
      <g fill="none" stroke="#3D2410" strokeWidth="4.5" strokeLinejoin="round">
        <circle cx="23" cy="28" r="14.5" fill="#F2B93A" />
        <circle cx="77" cy="28" r="14.5" fill="#F2B93A" />
        <circle cx="23" cy="28" r="6.5" fill="#F58CA0" stroke="none" />
        <circle cx="77" cy="28" r="6.5" fill="#F58CA0" stroke="none" />
        <circle cx="50" cy="57" r="34" fill="#F2B93A" />
      </g>

      {/* Má ửng hồng */}
      <ellipse cx="21" cy="68" rx="8" ry="5.4" fill="#F58CA0" opacity="0.9" />
      <ellipse cx="79" cy="68" rx="8" ry="5.4" fill="#F58CA0" opacity="0.9" />

      {/* Mõm sáng màu */}
      <ellipse cx="50" cy="72" rx="17" ry="12" fill="#FBEBC8" />

      {/* Mắt + đốm sáng */}
      <circle cx="37" cy="52" r="4.6" fill="#3D2410" />
      <circle cx="63" cy="52" r="4.6" fill="#3D2410" />
      <circle cx="38.6" cy="50.4" r="1.7" fill="#fff" />
      <circle cx="64.6" cy="50.4" r="1.7" fill="#fff" />

      {/* Mũi + miệng cười */}
      <ellipse cx="50" cy="66" rx="5.6" ry="4.1" fill="#3D2410" />
      <path
        d="M50 70v4M50 74q-4.6 4.4-8 .8M50 74q4.6 4.4 8 .8"
        stroke="#3D2410"
        strokeWidth="3.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Chữ "DingDongKids" ba màu — đi kèm `<Logo>` trong thanh điều hướng và chân
 * trang. Tách riêng để nơi nào chỉ cần biểu tượng thì không phải gánh cả chữ.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-[1.28rem] font-extrabold tracking-tight", className)}>
      <span className="text-brand-blue">Ding</span>
      <span className="text-brand-gold">Dong</span>
      <span className="text-brand-sky">Kids</span>
    </span>
  );
}
