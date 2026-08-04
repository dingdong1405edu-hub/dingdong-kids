import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[110px] w-full rounded-lg border-2 border-input bg-background px-4 py-3 font-semibold leading-relaxed text-foreground transition-[border-color,box-shadow] placeholder:font-medium placeholder:text-muted-foreground/70 focus-visible:border-brand-yellow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/30 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
