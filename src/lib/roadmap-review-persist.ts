import type { VocabWordCard } from "@/types";
import { reviewRoadmapWordAction } from "@/server/actions/roadmap-review";

/**
 * Ghi một lượt ôn từ vựng lộ trình vào RoadmapWordReview (khoá theo `word`).
 * Truyền làm prop `persist` cho ReviewFlow ở các luồng ôn của lộ trình. Gọi nền
 * (fire-and-forget) — lỗi không chặn trải nghiệm ôn.
 */
export function persistRoadmapReview(word: VocabWordCard, quality: number) {
  void reviewRoadmapWordAction({
    word: word.word,
    ipa: word.ipa,
    meaning: word.meaning,
    examples: word.examples,
    imageUrl: word.imageUrl,
    audioUrl: word.audioUrl,
    quality,
  }).catch(() => {});
}
