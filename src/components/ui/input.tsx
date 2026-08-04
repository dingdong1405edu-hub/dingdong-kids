import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Ô nhập kiểu vở học trò: viền dày 2px, bo góc lớn, cao 48px cho vừa ngón tay
 * trẻ. Khi focus thì viền chuyển vàng nắng kèm quầng sáng — trẻ (và phụ huynh
 * điền hộ) thấy ngay mình đang gõ vào ô nào.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-lg border-2 border-input bg-background px-4 py-2 font-semibold text-foreground transition-[border-color,box-shadow] file:border-0 file:bg-transparent file:font-semibold placeholder:font-medium placeholder:text-muted-foreground/70 focus-visible:border-brand-yellow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/30 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
