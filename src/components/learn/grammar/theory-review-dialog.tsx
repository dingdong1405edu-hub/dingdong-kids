"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TheoryViewer } from "./theory-viewer";
import type { GrammarSection } from "@/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sections: GrammarSection[];
}

/** "Xem lại lý thuyết" — a scrollable overlay listing every theory section, so
 *  learners can review the rules at any point during flashcards or the test
 *  without losing their progress in the underlying phase. */
export function TheoryReviewDialog({ open, onOpenChange, sections }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display font-extrabold">Xem lại mẫu câu</DialogTitle>
          <DialogDescription>Bé xem lại các mẫu câu của bài này nhé 🐻</DialogDescription>
        </DialogHeader>
        <div className="space-y-8 pt-2">
          {sections.map((section, i) => (
            <div key={section.id || i}>
              {i > 0 && <div className="mb-6 border-t" />}
              <TheoryViewer section={section} />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
