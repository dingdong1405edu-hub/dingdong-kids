import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Huy hiệu: viên thuốc tròn hoàn toàn, chữ rất đậm — dùng cho nhãn cấp độ,
 * trạng thái bài học, số đếm. Không viền cứng; phân biệt nhau bằng nền màu
 * pastel để hoà với các khối `band-*` của trang.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold leading-tight transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-sunny text-sunny-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border-2 border-border bg-transparent text-foreground",
        /** "Xong / đúng" — bạc hà. */
        success: "bg-band-mint text-brand-teal",
        /** Thông tin trung tính — trời xanh nhạt. */
        info: "bg-band-sky text-brand-blue",
        /** Mới / nổi bật — oải hương. */
        fresh: "bg-band-lav text-brand-grape",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
