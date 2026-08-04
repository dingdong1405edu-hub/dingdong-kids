"use client";
import { cn } from "@/lib/utils";
import type { ChatRole } from "./use-ding-chat";

/** Avatar tròn của chú gấu Ding — dùng ở bong bóng trả lời và header panel. */
export function DingAvatar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        // Vàng nắng → cam nắng: đúng bộ lông của gấu Ding trong <Logo>.
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-yellow to-brand-sun text-base shadow-soft ring-2 ring-brand-honey/50",
        className
      )}
      aria-hidden
    >
      🐻
    </div>
  );
}

/** Render văn bản với markdown nhẹ: **đậm**. Xuống dòng do CSS whitespace-pre-wrap giữ. */
function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.length >= 4 && part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function ChatMessage({
  role,
  content,
  streaming,
}: {
  role: ChatRole;
  content: string;
  streaming?: boolean;
}) {
  const isUser = role === "user";

  // Ô trả lời còn rỗng trong lúc đang chờ stream → ba chấm "đang gõ".
  if (!isUser && !content && streaming) {
    return (
      <div className="flex items-end gap-2">
        <DingAvatar className="h-8 w-8" />
        <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-muted px-4 py-3">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-end gap-2", isUser ? "justify-end" : "justify-start")}>
      {!isUser && <DingAvatar className="h-8 w-8" />}
      <div
        className={cn(
          "max-w-[82%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm font-semibold leading-relaxed shadow-soft",
          isUser
            ? "rounded-br-md bg-sunny text-sunny-foreground"
            : "rounded-bl-md bg-muted text-foreground"
        )}
      >
        {renderInline(content)}
      </div>
    </div>
  );
}
