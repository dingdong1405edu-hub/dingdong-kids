"use client";
import { useId, useRef, useState } from "react";
import { Loader2, Trash2, Link2, UploadCloud, Sparkles, Music2, Replace, FileAudio, Languages } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TtsButton } from "@/components/admin/tts-button";
import { cn, countWords } from "@/lib/utils";
import {
  transcribeListeningAudioAction,
  generateTranscriptExplanationAction,
} from "@/server/actions/admin";

interface ListeningAudioFieldsProps {
  /** Tên trường ẩn chứa URL audio. */
  audioName?: string;
  /** Tên trường textarea của lời thoại. */
  transcriptName?: string;
  /** Tên trường textarea của phần dịch & giải thích (tiếng Việt). */
  transcriptExplanationName?: string;
  defaultAudioUrl?: string | null;
  defaultTranscript?: string | null;
  defaultTranscriptExplanation?: string | null;
  /** Mã bài nghe — cần cho nút AI "dịch & giải thích" (chỉ có ở trang sửa). */
  listeningId?: string;
  /** Hậu tố để hai form (tạo + sửa) không trùng id phần tử. */
  idSuffix?: string;
}

/**
 * Ô soạn audio + lời thoại của một bài nghe. Gộp trong MỘT client component để
 * các nút AI đọc/ghi được giá trị lời thoại đang gõ. Gửi kèm <form> server action
 * ba trường: `audioUrl` (ẩn) + `transcript` + `transcriptExplanation`.
 *
 *  - CÁCH NHANH NHẤT: gõ lời thoại rồi bấm "🔊 Tạo audio từ lời thoại" — máy đọc
 *    bằng giọng tiếng Anh sẵn có, không phải tự thu MP3 nữa.
 *  - Vẫn tải MP3 thật lên được (giọng người thu, hội thoại nhiều người…) qua
 *    POST /api/admin/audio, hoặc dán liên kết audio.
 *  - Audio → lời thoại: Deepgram ghi lại lời thoại tiếng Anh từ file audio.
 *  - Lời thoại → dịch & giải thích (tiếng Việt) bằng Groq, hiện ở phần chữa bài.
 */
export function ListeningAudioFields({
  audioName = "audioUrl",
  transcriptName = "transcript",
  transcriptExplanationName = "transcriptExplanation",
  defaultAudioUrl,
  defaultTranscript,
  defaultTranscriptExplanation,
  listeningId,
  idSuffix = "",
}: ListeningAudioFieldsProps) {
  const [audioUrl, setAudioUrl] = useState(defaultAudioUrl ?? "");
  const [transcript, setTranscript] = useState(defaultTranscript ?? "");
  const [explanation, setExplanation] = useState(defaultTranscriptExplanation ?? "");
  const [uploading, setUploading] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [explaining, setExplaining] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  // Suffix keeps element ids distinct when both the create + edit forms mount.
  const fieldId = `${useId()}${idSuffix}`;

  const wordCount = countWords(transcript);
  const busy = uploading || transcribing || explaining;

  async function uploadFile(file: File) {
    if (!file.type.startsWith("audio/") && !/\.(mp3|wav|ogg|m4a)$/i.test(file.name)) {
      toast.error("Vui lòng chọn tệp âm thanh (MP3, WAV, OGG, M4A)");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast.error("Tệp âm thanh vượt quá 20MB");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/audio", { method: "POST", body: fd });
      const data = (await res.json()) as { ok: boolean; url?: string; error?: string };
      if (data.ok && data.url) {
        setAudioUrl(data.url);
        toast.success("Đã tải audio lên");
      } else {
        toast.error(data.error ?? "Tải audio thất bại");
      }
    } catch {
      toast.error("Lỗi kết nối khi tải audio");
    } finally {
      setUploading(false);
    }
  }

  async function generateTranscriptFromAudio() {
    if (!audioUrl.trim()) {
      toast.error("Hãy tải audio lên (hoặc dán liên kết) trước khi ghi lời thoại");
      return;
    }
    setTranscribing(true);
    try {
      const res = await transcribeListeningAudioAction(audioUrl);
      if (res.ok) {
        setTranscript(res.transcript);
        toast.success("Đã ghi lời thoại từ audio.");
      } else {
        toast.error(res.error);
      }
    } catch {
      toast.error("Chưa ghi được lời thoại từ audio, thử lại nhé.");
    } finally {
      setTranscribing(false);
    }
  }

  async function explainTranscript() {
    if (!listeningId) {
      toast.error("Hãy lưu bài nghe trước, rồi mới dịch lời thoại.");
      return;
    }
    if (!transcript.trim()) {
      toast.error("Hãy có lời thoại trước khi dịch.");
      return;
    }
    setExplaining(true);
    try {
      const res = await generateTranscriptExplanationAction(listeningId);
      if (res.ok) {
        setExplanation(res.text);
        toast.success("Đã dịch & giải thích lời thoại.");
      } else {
        toast.error(res.error);
      }
    } catch {
      toast.error("Lỗi khi dịch lời thoại");
    } finally {
      setExplaining(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Hidden submitted value */}
      <input type="hidden" name={audioName} value={audioUrl} />

      {/* Transcript */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label htmlFor={`${fieldId}-transcript`}>Lời thoại (tiếng Anh)</Label>
          <span className="text-xs text-muted-foreground">{wordCount} từ</span>
        </div>
        <Textarea
          id={`${fieldId}-transcript`}
          name={transcriptName}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          className="font-primer min-h-32"
          placeholder={"A: Hello! What is your name?\nB: My name is Lucy. And you?"}
        />
        <p className="text-xs text-muted-foreground">
          Mẹo: dùng nhãn <code className="font-mono">A:</code> / <code className="font-mono">B:</code> đầu dòng cho
          hội thoại — hệ thống sẽ tách câu, đổi giọng A/B và dò “đáp án nằm ở câu nào”.
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          {/* Cách nhanh nhất: gõ lời thoại → máy đọc thành audio ngay. */}
          <TtsButton
            text={transcript}
            onDone={setAudioUrl}
            disabled={busy}
            label="Tạo audio từ lời thoại"
            title={transcript.trim() ? "Máy đọc lời thoại thành file audio" : "Gõ lời thoại trước đã"}
          />
          <button
            type="button"
            onClick={generateTranscriptFromAudio}
            disabled={busy || !audioUrl.trim()}
            title={!audioUrl.trim() ? "Cần có audio ở dưới trước" : undefined}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {transcribing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileAudio className="h-4 w-4" />}
            {transcribing ? "Đang ghi lời thoại…" : "Ngược lại: ghi lời thoại TỪ audio"}
          </button>
        </div>
      </div>

      {/* Audio */}
      <div className="space-y-2">
        <Label>Audio bài nghe</Label>

        {audioUrl ? (
          <div className="rounded-xl border bg-muted/30 p-3">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Music2 className="h-4 w-4 text-brand-teal" /> Audio hiện tại
            </div>
            <audio controls src={audioUrl} className="w-full" />
            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition hover:text-foreground"
              >
                <Replace className="h-3.5 w-3.5" /> Đổi tệp khác
              </button>
              <button
                type="button"
                onClick={() => setAudioUrl("")}
                className="inline-flex items-center gap-1 text-xs font-medium text-destructive transition hover:opacity-80"
              >
                <Trash2 className="h-3.5 w-3.5" /> Xoá audio
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor={fieldId}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const file = e.dataTransfer.files?.[0];
              if (file) uploadFile(file);
            }}
            className={cn(
              "flex h-28 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed bg-muted/20 text-center transition-colors",
              dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
            )}
          >
            {uploading ? (
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            ) : (
              <UploadCloud className="h-6 w-6 text-muted-foreground" />
            )}
            <div className="text-sm font-medium">
              {uploading ? "Đang tải lên..." : "Kéo thả file MP3 vào đây hoặc bấm để chọn"}
            </div>
            <div className="text-xs text-muted-foreground">MP3, WAV, OGG, M4A · tối đa 20MB</div>
          </label>
        )}

        <input
          id={fieldId}
          ref={fileRef}
          type="file"
          accept="audio/*,.mp3,.wav,.ogg,.m4a"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadFile(file);
            e.target.value = "";
          }}
        />

        {/* URL fallback */}
        <div className="flex flex-wrap items-center gap-3 pt-0.5">
          <button
            type="button"
            onClick={() => setShowUrl((v) => !v)}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground"
          >
            <Link2 className="h-3.5 w-3.5" /> {showUrl ? "Ẩn" : "Hoặc dán liên kết audio"}
          </button>
        </div>
        {showUrl && (
          <Input
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
            placeholder="https://... hoặc /api/files/..."
            className="text-sm"
          />
        )}
        <p className="text-xs text-muted-foreground">
          Cách nhanh: gõ lời thoại ở trên rồi bấm{" "}
          <span className="font-medium">“🔊 Tạo audio từ lời thoại”</span> — máy đọc giúp. Muốn giọng người
          thật (hội thoại nhiều nhân vật, tiếng động nền…) thì tải MP3 lên ở đây. Bài chưa có audio thì trình
          duyệt vẫn đọc tạm bằng giọng máy, nhưng nghe kém hay hơn nhiều.
        </p>
      </div>

      {/* Transcript explanation (Vietnamese translation + notes) */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label htmlFor={`${fieldId}-explain`}>Dịch &amp; giải thích lời thoại (tiếng Việt)</Label>
          <button
            type="button"
            onClick={explainTranscript}
            disabled={busy || !listeningId || !transcript.trim()}
            title={!listeningId ? "Lưu bài nghe trước đã" : !transcript.trim() ? "Cần có lời thoại trước" : undefined}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border border-brand-grape bg-band-lav px-3 py-1.5 text-sm font-semibold text-brand-grape transition hover:bg-band-lav disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-brand-grape/20",
            )}
          >
            {explaining ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {explaining ? "Đang dịch…" : "AI dịch & giải thích"}
          </button>
        </div>
        <Textarea
          id={`${fieldId}-explain`}
          name={transcriptExplanationName}
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          className="min-h-28"
          placeholder={"Tóm tắt + bản dịch tiếng Việt + từ vựng. Bấm “AI dịch & giải thích” để tạo tự động rồi chỉnh lại."}
        />
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Languages className="h-3.5 w-3.5" /> Hiện ở phần chữa bài để học viên hiểu kỹ nội dung nghe.
          {!listeningId && " (Lưu bài nghe xong mới dùng được nút AI.)"}
        </p>
      </div>
    </div>
  );
}
