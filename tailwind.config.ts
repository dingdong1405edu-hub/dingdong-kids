import type { Config } from "tailwindcss";

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
        /** Vàng nắng — màu nhấn phụ, dùng cho sao/thưởng/streak. */
        sunny: {
          DEFAULT: "hsl(var(--sunny))",
          foreground: "hsl(var(--sunny-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
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
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
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
      },
      fontFamily: {
        // Baloo 2 — chữ tròn, mập, rất hợp trẻ em; Nunito cho phần thân chữ.
        sans: ["Nunito", "system-ui", "sans-serif"],
        display: ["'Baloo 2'", "Nunito", "system-ui", "sans-serif"],
        /** Phông chữ dạy đọc: chữ "a" và "g" một tầng, giống chữ trẻ tập viết. */
        primer: ["'Andika'", "'Comic Sans MS'", "Nunito", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px -1px rgba(16,24,40,0.04), 0 4px 16px -4px rgba(16,24,40,0.08)",
        "soft-lg": "0 2px 4px -2px rgba(16,24,40,0.05), 0 12px 32px -8px rgba(16,24,40,0.12)",
        "soft-primary": "0 8px 24px -8px hsl(var(--primary) / 0.4)",
        /** Gờ 3D kiểu nút bấm đồ chơi — dùng cho nút chính & node lộ trình. */
        chunky: "0 6px 0 0 hsl(var(--primary) / 0.55)",
        "chunky-sm": "0 4px 0 0 rgb(0 0 0 / 0.14)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
