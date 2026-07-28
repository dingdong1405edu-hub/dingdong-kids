"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDingChat } from "./use-ding-chat";
import { ChatPanel } from "./chat-panel";
import { DingCompanion } from "@/components/marketing/ding-companion";

/**
 * Bong bóng trợ lý "Ding" nổi ở góc phải dưới mọi trang trong khu vực học. Sở hữu
 * trạng thái hội thoại (useDingChat) ở đây nên cuộc trò chuyện được giữ nguyên khi
 * đóng/mở panel hoặc chuyển trang (DashboardShell không bị unmount).
 */
export function ChatWidget({ userName }: { userName?: string | null }) {
  const [open, setOpen] = useState(false);
  const chat = useDingChat();

  // Esc để đóng panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Nút mở = chính linh vật Ding (động, phản ứng theo bài học) */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-4 right-4 z-30 sm:bottom-5 sm:right-5"
          >
            <DingCompanion onOpen={() => setOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Trợ lý học tập Ding"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className="fixed inset-x-3 bottom-3 z-50 h-[70vh] max-h-[calc(100dvh-1.5rem)] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:h-[600px] sm:w-[380px]"
          >
            <ChatPanel chat={chat} userName={userName} onClose={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
