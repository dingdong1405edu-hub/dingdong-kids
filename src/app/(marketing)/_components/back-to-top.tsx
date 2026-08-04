"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Nút cuộn lên đầu trang — hiện khi cuộn quá 1 màn hình. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Lên đầu trang"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      // Viên kẹo vàng có gờ 3D, cùng ngôn ngữ với nút CTA của cả trang.
      // Khi ẩn thì tắt cả pointer-events để không chặn thao tác ở góc màn hình.
      className={`btn-chunky fixed bottom-6 right-6 z-[900] inline-flex h-14 w-14 items-center justify-center rounded-full bg-sunny text-sunny-foreground transition-all duration-300 ease-toy max-sm:bottom-[18px] max-sm:right-[18px] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}
