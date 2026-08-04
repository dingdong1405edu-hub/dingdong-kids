import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Nút kiểu đồ chơi: viên thuốc bo tròn hoàn toàn, chữ Baloo đậm, có GỜ 3D phía
 * dưới (`.btn-chunky` trong globals.css) — rê chuột thì nhô lên, bấm thì lún
 * xuống. Trẻ nhỏ nhận ra "bấm được" qua khối, không qua chữ.
 *
 * Màu gờ đặt bằng biến `--edge` để mỗi variant có gờ tối hơn mặt nút một bậc.
 * Riêng `ghost` và `link` KHÔNG có gờ (chúng là hành động phụ, không nên hút mắt).
 *
 * Chiều cao: 48px là sàn khả dụng cho ngón tay trẻ (globals.css cũng ép
 * `min-height: 48px` cho mọi <button>), nên `size` ở đây khớp luôn con số đó
 * thay vì để chiều cao khai báo lệch với chiều cao thật khi render.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-display font-extrabold transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        /** Hành động chính — vàng nắng, chữ cacao. Nút CTA của cả sản phẩm. */
        default: "btn-chunky [--edge:hsl(var(--c-sun))] bg-sunny text-sunny-foreground",
        /** Hành động phụ — thẻ trắng nổi trên nền kem. */
        secondary: "btn-chunky [--edge:hsl(var(--border))] bg-card text-foreground",
        /** Hành động nguy hiểm (xoá, huỷ) — san hô. */
        destructive:
          "btn-chunky [--edge:hsl(6_72%_50%)] bg-destructive text-destructive-foreground",
        /** Nhấn mạnh vui vẻ — hồng kẹo, dùng cho "đăng ký", "nhận thưởng". */
        candy: "btn-chunky [--edge:hsl(335_72%_49%)] bg-brand-pink text-white",
        /** Viền dày, nền trong — hành động ngang hàng nhưng ít nổi hơn. */
        outline:
          "border-[3px] border-border bg-card/70 text-foreground hover:-translate-y-0.5 hover:border-brand-gold hover:bg-card hover:shadow-soft",
        /** Không nền — dùng trong thanh công cụ, menu. */
        ghost: "text-foreground hover:bg-muted hover:text-foreground",
        /** Chữ có gạch chân — dùng trong đoạn văn. */
        link: "text-brand-gold underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-7 text-[1.02rem]",
        sm: "h-10 px-5 text-[0.95rem]",
        lg: "h-14 px-9 text-[1.12rem]",
        icon: "h-12 w-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
