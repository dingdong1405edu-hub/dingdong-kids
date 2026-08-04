"use client";
import { useEffect, useRef, useState } from "react";
import { Send, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChatMessage, DingAvatar } from "./chat-message";
import type { UseDingChat } from "./use-ding-chat";

const SUGGESTIONS = [
  "Cách đọc đuôi -s và -ed",
  "Khi nào dùng a, an và the?",
  "Vài câu chào hỏi cơ bản",
  "Mẹo nhớ từ vựng dễ hơn",
];

export function ChatPanel({
  chat,
  userName,
  onClose,
}: {
  chat: UseDingChat;
  userName?: string | null;
  onClose: () => void;
}) {
  const { messages, isStreaming, error, send, reset } = chat;
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const firstName = userName?.trim().split(/\s+/).pop();

  // Cuộn xuống cuối khi có tin mới / đang stream.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, isStreaming]);

  // Tự focus ô nhập khi mở panel.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function submit() {
    const text = input.trim();
    if (!text || isStreaming) return;
    send(text);
    setInput("");
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-border bg-card shadow-soft-xl">
      {/* Header — dải vàng nắng để bé thấy ngay "đây là chỗ hỏi bạn Ding" */}
      <div className="flex items-center gap-3 border-b-2 border-border bg-band-yel px-4 py-3">
        <DingAvatar className="h-10 w-10 animate-bob" />
        <div className="min-w-0 flex-1 leading-tight">
          <div className="flex items-center gap-1.5 font-display text-[1.05rem] font-extrabold text-foreground">
            Ding
            <span className="inline-flex items-center gap-1 rounded-full bg-band-mint px-2 py-0.5 text-[10px] font-extrabold text-brand-teal">
              <span className="h-1.5 w-1.5 animate-dot-pulse rounded-full bg-brand-lime" /> Online
            </span>
          </div>
          <div className="truncate text-[11px] font-semibold text-muted-foreground">
            Trợ lý học tiếng Anh
          </div>
        </div>
        {messages.length > 0 && (
          <button
            type="button"
            onClick={reset}
            disabled={isStreaming}
            aria-label="Xoá hội thoại"
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card/70 text-muted-foreground transition-colors hover:bg-card hover:text-brand-coral disabled:opacity-40"
          >
            <Trash2 className="h-[18px] w-[18px]" />
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng trợ lý"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card/70 text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
        >
          <X className="h-[18px] w-[18px]" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3.5 py-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-2 text-center">
            <DingAvatar className="h-20 w-20 animate-bob text-4xl" />
            <div>
              <p className="font-display text-[1.05rem] font-extrabold text-foreground">
                Chào {firstName ? firstName : "bạn"}! Mình là Ding 🐻
              </p>
              <p className="mt-1 text-xs font-semibold text-muted-foreground">
                Hỏi mình bất cứ điều gì về tiếng Anh — từ vựng, ngữ pháp, ghép vần, phát âm hay
                cách ôn thi Cambridge nhé!
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border-2 border-border bg-band-sky px-3.5 py-1.5 text-xs font-bold text-brand-blue transition-all duration-200 ease-toy hover:-translate-y-0.5 hover:shadow-soft"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <ChatMessage
              key={i}
              role={m.role}
              content={m.content}
              streaming={isStreaming && i === messages.length - 1}
            />
          ))
        )}

        {error && (
          <p className="rounded-xl border-2 border-destructive/40 bg-band-coral px-3 py-2 text-center text-xs font-bold text-brand-coral">
            {error}
          </p>
        )}
      </div>

      {/* Input */}
      <div className="border-t-2 border-border bg-muted/60 p-2.5">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            rows={1}
            placeholder="Nhập câu hỏi cho Ding…"
            className={cn(
              // Cùng ngôn ngữ với <Input>: viền dày 2px, bo lớn, focus vàng nắng.
              "max-h-28 min-h-[48px] flex-1 resize-none rounded-lg border-2 border-input bg-card px-3.5 py-3 text-sm font-semibold text-foreground",
              "placeholder:font-medium placeholder:text-muted-foreground/70 focus-visible:border-brand-yellow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/30"
            )}
          />
          <Button
            type="button"
            size="icon"
            onClick={submit}
            disabled={!input.trim() || isStreaming}
            aria-label="Gửi"
            className="shrink-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="mt-1.5 px-1 text-[10px] font-semibold text-muted-foreground">
          Ding là AI nên đôi khi có thể nhầm — hãy kiểm tra lại thông tin quan trọng.
        </p>
      </div>
    </div>
  );
}
