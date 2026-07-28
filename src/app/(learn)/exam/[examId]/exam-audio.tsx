"use client";
import { useMemo } from "react";
import type { EnglishLevel } from "@prisma/client";
import { AudioPlayer } from "@/components/learn/listening/audio-player";
import { Tapescript } from "@/components/learn/listening/tapescript";
import { useListeningAudio } from "@/components/learn/listening/use-listening-audio";
import { splitTranscript } from "@/lib/transcript";

/** Cấp nhỏ được nghe nhiều lần hơn — trẻ mới làm quen cần thời gian bắt âm. */
const EXTRA_PLAY_LEVELS: EnglishLevel[] = ["PRE_STARTERS", "STARTERS", "MOVERS"];

/**
 * Bộ điều khiển audio cho MỘT tiểu phần nghe. Mỗi tiểu phần có engine riêng (như
 * đề thật phát audio theo từng phần). Có MP3 thì phát MP3; không thì đọc lời thoại
 * bằng giọng trình duyệt; sau khi nộp thì nghe lại thoải mái + hiện lời thoại.
 */
export function ExamAudio({
  audioUrl,
  transcript,
  level,
  submitted,
  onWordClick,
}: {
  audioUrl: string | null;
  transcript: string | null;
  level: EnglishLevel;
  submitted: boolean;
  onWordClick: (word: string, e: React.MouseEvent) => void;
}) {
  const segments = useMemo(() => splitTranscript(transcript), [transcript]);
  const maxPlays = EXTRA_PLAY_LEVELS.includes(level) ? 3 : 2;

  const audio = useListeningAudio({ audioUrl, segments, maxPlays, reviewMode: submitted });

  // Không có gì để phát/đọc → không render khối audio.
  if (!audioUrl && segments.length === 0) return null;

  return (
    <div className="space-y-3">
      <AudioPlayer audio={audio} reviewMode={submitted} segmentCount={segments.length} />
      {submitted && segments.length > 0 && (
        <Tapescript
          segments={segments}
          evidenceMap={new Map()}
          currentSegment={audio.currentSegment}
          canReplay={audio.canSpeakSegments}
          onPlaySegment={(i) => audio.speakSegment(i)}
          onWordClick={onWordClick}
        />
      )}
    </div>
  );
}
