"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { setContentPublishedAction } from "@/server/actions/admin";

// Phải khớp với ContentModel trong src/server/actions/admin.ts.
export type PublishModel =
  | "vocabUnit"
  | "vocabLesson"
  | "grammarUnit"
  | "grammarLesson"
  | "reading"
  | "listening"
  | "writing"
  | "speaking"
  | "speakingTopic"
  | "mockExam"
  | "course"
  | "roadmapSection";

/**
 * Nút bật/tắt hiển thị một nội dung trên web học viên.
 *  • published = true  → "Đang hiện" (xanh); bấm để ẩn (chuyển về bản nháp).
 *  • published = false → "Bản nháp"  (hổ phách); bấm để xuất bản.
 * Toast xác nhận hành động vừa làm; router.refresh() để cập nhật danh sách.
 */
export function PublishToggle({
  model,
  id,
  published,
  className,
}: {
  model: PublishModel;
  id: string;
  published: boolean;
  className?: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();

  function toggle() {
    start(async () => {
      const res = await setContentPublishedAction(model, id, !published);
      if (res.ok) {
        toast.success(
          published ? "Đã ẩn — chuyển về bản nháp." : "Đã xuất bản — học viên có thể thấy."
        );
        router.refresh();
      } else {
        toast.error(res.error ?? "Không đổi được trạng thái.");
      }
    });
  }

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      onClick={toggle}
      disabled={pending}
      aria-pressed={published}
      title={published ? "Đang hiển thị cho học viên — bấm để ẩn" : "Đang ẩn — bấm để xuất bản"}
      className={cn(
        published
          ? "border-brand-lime text-brand-teal hover:text-brand-teal"
          : "border-brand-yellow text-brand-gold hover:text-brand-gold",
        className
      )}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : published ? (
        <Eye className="h-4 w-4" />
      ) : (
        <EyeOff className="h-4 w-4" />
      )}
      {published ? "Đang hiện" : "Bản nháp"}
    </Button>
  );
}
