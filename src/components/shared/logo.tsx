import { cn } from "@/lib/utils";

/**
 * Dấu ấn thương hiệu DingDong Kids: chiếc chuông vàng (tiếng "ding dong" báo giờ
 * học vui) trên nền xanh biển bo tròn, kèm ngôi sao thưởng.
 *
 * Vẽ thẳng bằng SVG (không dùng file ảnh) để: nét luôn sắc ở mọi kích thước,
 * không phụ thuộc asset, và đổi màu được theo giao diện sáng/tối.
 * Truyền kích thước qua className, vd "h-9 w-9".
 */
export function Logo({ className, alt = "DingDong Kids" }: { className?: string; alt?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={alt}
      className={cn("shrink-0 select-none", className)}
    >
      <defs>
        <linearGradient id="dd-logo-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38b6f5" />
          <stop offset="100%" stopColor="#0c78c4" />
        </linearGradient>
        <linearGradient id="dd-logo-bell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe08a" />
          <stop offset="100%" stopColor="#f6b721" />
        </linearGradient>
      </defs>

      {/* Nền squircle — bo rất tròn cho hợp mắt trẻ nhỏ */}
      <rect x="1" y="1" width="62" height="62" rx="19" fill="url(#dd-logo-sky)" />
      <rect x="1" y="1" width="62" height="62" rx="19" fill="none" stroke="#0a6ba9" strokeWidth="2" />

      {/* Chuông */}
      <path
        d="M32 13c2 0 3.4 1.4 3.4 3.1v1.3c6 1.6 9.8 6.6 9.8 12.9 0 5.9 1 8.6 2.7 10.6.9 1 .2 2.6-1.2 2.6H17.3c-1.4 0-2.1-1.6-1.2-2.6 1.7-2 2.7-4.7 2.7-10.6 0-6.3 3.8-11.3 9.8-12.9v-1.3c0-1.7 1.4-3.1 3.4-3.1Z"
        fill="url(#dd-logo-bell)"
        stroke="#8a5a10"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* Quả lắc */}
      <path
        d="M26.5 47.5h11c0 3.1-2.5 5.5-5.5 5.5s-5.5-2.4-5.5-5.5Z"
        fill="#ffd15c"
        stroke="#8a5a10"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* Ánh sáng mềm trên thân chuông */}
      <ellipse cx="26" cy="26" rx="3.2" ry="5" fill="#fff" opacity="0.55" transform="rotate(-18 26 26)" />

      {/* Ngôi sao thưởng */}
      <path
        d="M50 12.5l1.6 3.6 3.9.4-2.9 2.6.8 3.9-3.4-2-3.4 2 .8-3.9-2.9-2.6 3.9-.4Z"
        fill="#fff3c4"
      />
    </svg>
  );
}
