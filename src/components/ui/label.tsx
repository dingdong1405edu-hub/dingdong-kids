"use client";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Nhãn ô nhập: Baloo đậm, cỡ hơi lớn hơn mặc định. Người đọc nhãn ở đây thường
 * là phụ huynh đang điền hộ bé trên điện thoại — chữ mảnh trên nền kem rất khó đọc.
 */
const labelVariants = cva(
  "inline-block font-display text-[0.95rem] font-extrabold leading-snug text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
