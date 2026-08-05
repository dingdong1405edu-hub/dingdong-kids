"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlowHeader } from "./flow-header";
import { TheoryViewer } from "./theory-viewer";
import type { GrammarSection } from "@/types";

interface Props {
  section: GrammarSection;
  sectionIndex: number;
  sectionCount: number;
  progress: number;
  closeHref: string;
  ctaLabel: string;
  onReviewTheory?: () => void;
  onContinue: () => void;
}

/** One section's theory screen. The learner studies this part, then taps the
 *  CTA to drill the exercises for THIS part immediately (interleaved flow). */
export function SectionTheory({
  section,
  sectionIndex,
  sectionCount,
  progress,
  closeHref,
  ctaLabel,
  onReviewTheory,
  onContinue,
}: Props) {
  return (
    <div className="study-frame mx-auto w-full max-w-2xl">
      <FlowHeader progress={progress} closeHref={closeHref} onReviewTheory={onReviewTheory} />

      <div className="pb-2 text-center text-sm font-semibold text-muted-foreground">
        Chặng {sectionIndex + 1}/{sectionCount} · Cùng xem nào 👀
      </div>

      <div className="study-body py-4">
        <motion.div
          key={section.id || sectionIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <TheoryViewer section={section} />
        </motion.div>
      </div>

      <div className="flex justify-end border-t py-4">
        <Button size="lg" onClick={onContinue} className="btn-chunky px-8 font-extrabold">
          {ctaLabel}
          <ArrowRight className="ml-1.5 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
