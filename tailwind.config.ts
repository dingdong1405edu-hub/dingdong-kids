import type { Config } from "tailwindcss";

/**
 * Hệ thiết kế "Sân chơi kem & mật ong" — nền kem ấm, chữ cacao, khối màu pastel
 * xen kẽ, nút 3D có gờ, bo góc rất lớn.
 *
 * QUY TẮC MÀU (bắt buộc theo khi viết component mới):
 *  1. Nền / chữ / thẻ / viền  → LUÔN dùng token ngữ nghĩa: `bg-background`,
 *     `text-foreground`, `bg-card`, `text-muted-foreground`, `border-border`.
 *     Chỉ những token này mới tự đổi theo chế độ sáng/tối.
 *  2. Màu nhấn (vui mắt, phân biệt module) → dùng `brand-*`: `text-brand-coral`,
 *     `bg-brand-grape`… Đã bọc biến CSS nên cũng tự dịu lại ở chế độ tối.
 *  3. Nền khối lớn xen kẽ giữa các section → dùng `band-*`: `bg-band-mint`,
 *     `bg-band-lav`… Ở chế độ tối chúng tự thành sắc tối cùng tông.
 *  4. KHÔNG dùng bảng màu mặc định của Tailwind (`bg-sky-500`, `text-rose-600`…)
 *     cho giao diện mới — chúng không biết tới chế độ tối và lệch tông thương hiệu.
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /** Vàng nắng #FFD43B — nút hành động chính, sao, streak, phần thưởng. */
        sunny: {
          DEFAULT: "hsl(var(--sunny))",
          foreground: "hsl(var(--sunny-foreground))",
        },

        /**
         * Bảng màu nhấn. Đặt trong namespace `brand` để KHÔNG đè lên bảng màu
         * mặc định của Tailwind (`yellow-500`, `sky-400`… vẫn dùng được ở mã cũ).
         * Mỗi màu bọc một biến CSS nên chế độ tối tự hạ chroma, không chói mắt.
         */
        brand: {
          yellow: "hsl(var(--c-yellow))", // #FFD43B vàng nắng
          sun: "hsl(var(--c-sun))", // #FFA51F cam nắng — gờ dưới nút vàng
          gold: "hsl(var(--c-gold))", // #DE9310 mật ong đậm — chữ nhấn đọc rõ
          honey: "hsl(var(--c-honey))", // #F2B93A lông gấu Ding
          coral: "hsl(var(--c-coral))", // #FF6B5A
          pink: "hsl(var(--c-pink))", // #FF4F97
          lime: "hsl(var(--c-lime))", // #4CD473
          teal: "hsl(var(--c-teal))", // #17BFAA
          sky: "hsl(var(--c-sky))", // #25AEF5
          blue: "hsl(var(--c-blue))", // #3D6FE0
          grape: "hsl(var(--c-grape))", // #8B4EFF
          cocoa: "hsl(var(--c-cocoa))", // #3D2410 chữ chính
          mocha: "hsl(var(--c-mocha))", // #7E6449 chữ phụ
        },

        /**
         * Nền khối lớn (pastel). Dùng cho `<section>` xen kẽ, ngăn nhau bằng
         * dải sóng `<WaveDivider>`.
         */
        band: {
          cream: "hsl(var(--band-cream))",
          sun: "hsl(var(--band-sun))",
          coral: "hsl(var(--band-coral))",
          lav: "hsl(var(--band-lav))",
          yel: "hsl(var(--band-yel))",
          mint: "hsl(var(--band-mint))",
          sky: "hsl(var(--band-sky))",
        },
      },

      /**
       * Bo góc lớn hơn mặc định ở MỌI bậc — giao diện trẻ em không có góc nhọn.
       * `lg` = 20px là bậc gốc (`--radius`); `xl`/`2xl`/`3xl` được kéo giãn so
       * với mặc định Tailwind (12/16/24px) để thẻ và khung lớn trông mềm hơn.
       */
      borderRadius: {
        lg: "var(--radius)", // 20px
        md: "calc(var(--radius) - 4px)", // 16px
        sm: "calc(var(--radius) - 8px)", // 12px
        xl: "calc(var(--radius) + 6px)", // 26px
        "2xl": "calc(var(--radius) + 14px)", // 34px
        "3xl": "calc(var(--radius) + 24px)", // 44px
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "correct-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "wrong-shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-8px)" },
          "75%": { transform: "translateX(8px)" },
        },
        /** Nảy vui khi trả lời đúng — trẻ thích phản hồi có chuyển động. */
        "pop-in": {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "60%": { transform: "scale(1.12)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-7px)" },
        },
        /** Chữ cái trang trí trôi lên xuống quanh khối nội dung. */
        drift: {
          "0%, 100%": { transform: "translateY(0) rotate(var(--rot, 0deg))" },
          "50%": { transform: "translateY(-14px) rotate(calc(var(--rot, 0deg) + 6deg))" },
        },
        /** Bong bóng tròn trang trí bay lơ lửng. */
        "float-blob": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(12px, -18px) scale(1.08)" },
          "66%": { transform: "translate(-8px, -10px) scale(0.95)" },
        },
        /** Emoji/thẻ từ nhún nhẹ như đang thở. */
        bob: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-6px) rotate(4deg)" },
        },
        /** Logo gấu Ding nghiêng đầu. */
        tilt: {
          "0%, 100%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(-8deg) scale(1.06)" },
        },
        /** Băng chữ chạy ngang (marquee) — track phải nhân đôi nội dung. */
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        /** Dải sóng ngăn giữa hai khối màu trôi ngang. */
        "wave-slide": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        /** Chữ cầu vồng đổi màu liên tục. */
        hue: { to: { backgroundPosition: "300% 0" } },
        /** Chấm "đang mở" nhấp nháy trên huy hiệu. */
        "dot-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 4px hsl(var(--c-lime) / 0.30)" },
          "50%": { boxShadow: "0 0 0 10px hsl(var(--c-lime) / 0)" },
        },
        /** Cột sóng âm khi ghi âm / phát audio. */
        "eq-bar": {
          "0%, 100%": { height: "25%" },
          "50%": { height: "100%" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "correct-pulse": "correct-pulse 0.3s ease-in-out",
        "wrong-shake": "wrong-shake 0.3s ease-in-out",
        "pop-in": "pop-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        wiggle: "wiggle 0.6s ease-in-out infinite",
        "bounce-soft": "bounce-soft 2.4s ease-in-out infinite",
        drift: "drift 11s ease-in-out infinite",
        "float-blob": "float-blob 14s ease-in-out infinite",
        bob: "bob 3.4s ease-in-out infinite",
        tilt: "tilt 5s ease-in-out infinite",
        marquee: "marquee-x 28s linear infinite",
        "wave-slide": "wave-slide 15s linear infinite",
        hue: "hue 7s linear infinite",
        "dot-pulse": "dot-pulse 2s ease-in-out infinite",
        "eq-bar": "eq-bar 1.25s ease-in-out infinite",
      },

      fontFamily: {
        // Baloo 2 — chữ tròn, mập, rất hợp trẻ em; Nunito cho phần thân chữ.
        sans: ["Nunito", "system-ui", "sans-serif"],
        display: ["'Baloo 2'", "Nunito", "system-ui", "sans-serif"],
        /** Phông chữ dạy đọc: chữ "a" và "g" một tầng, giống chữ trẻ tập viết. */
        primer: ["'Andika'", "'Comic Sans MS'", "Nunito", "sans-serif"],
      },

      /**
       * Bóng đổ ám nâu cacao (không phải xám xanh) để hoà với nền kem — bóng
       * xám trên nền ấm luôn trông bẩn.
       */
      boxShadow: {
        soft: "0 5px 16px hsl(var(--shadow-hue) / 0.10)",
        "soft-lg": "0 16px 38px hsl(var(--shadow-hue) / 0.14), 0 3px 8px hsl(var(--shadow-hue) / 0.06)",
        "soft-xl": "0 30px 68px hsl(var(--shadow-hue) / 0.20), 0 5px 14px hsl(var(--shadow-hue) / 0.08)",
        "soft-primary": "0 14px 30px hsl(var(--c-sun) / 0.38)",
        /** Gờ 3D kiểu nút bấm đồ chơi — dùng cho nút chính & node lộ trình. */
        chunky: "0 7px 0 0 hsl(var(--c-sun))",
        "chunky-sm": "0 4px 0 0 hsl(var(--shadow-hue) / 0.20)",
        /** Bóng lệch kiểu miếng dán trên vở. */
        sticker: "4px 5px 0 0 hsl(var(--shadow-hue) / 0.16)",
      },

      transitionTimingFunction: {
        /** Nảy nhẹ ở cuối — chuyển động đồ chơi, dùng cho hover/nhấn. */
        toy: "cubic-bezier(.34,1.46,.5,1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
