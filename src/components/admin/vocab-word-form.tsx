"use client";
import { useState } from "react";
import { Plus, Trash2, AlertTriangle, Save, X, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/image-upload";
import { TtsButton } from "@/components/admin/tts-button";
import { markWord, cn } from "@/lib/utils";
import { saveVocabWordAction } from "@/server/actions/admin";
import type { VocabWordCard, WordExample } from "@/types";

interface Props {
  lessonId: string;
  unitId: string;
  word?: VocabWordCard;
  onSaved: () => void;
  onCancel: () => void;
}

const emptyExample = (): WordExample => ({ sentence: "", meaning: "" });

/** Từ loại viết bằng tiếng Việt, đúng mức trẻ hiểu được. */
const PARTS_OF_SPEECH = [
  "danh từ",
  "động từ",
  "tính từ",
  "trạng từ",
  "giới từ",
  "đại từ",
  "số đếm",
  "cụm từ",
];

export function VocabWordForm({ lessonId, unitId, word, onSaved, onCancel }: Props) {
  const [text, setText] = useState(word?.word ?? "");
  const [ipa, setIpa] = useState(word?.ipa ?? "");
  const [meaning, setMeaning] = useState(word?.meaning ?? "");
  const [partOfSpeech, setPartOfSpeech] = useState(word?.partOfSpeech ?? "");
  const [imageUrl, setImageUrl] = useState(word?.imageUrl ?? "");
  const [audioUrl, setAudioUrl] = useState(word?.audioUrl ?? "");
  const [examples, setExamples] = useState<WordExample[]>(
    word?.examples?.length ? word.examples : [emptyExample()]
  );
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateExample(i: number, patch: Partial<WordExample>) {
    setExamples((prev) => prev.map((ex, j) => (j === i ? { ...ex, ...patch } : ex)));
  }

  async function handleSubmit() {
    setPending(true);
    setError(null);
    const cleaned = examples.filter((ex) => ex.sentence.trim());
    const res = await saveVocabWordAction({
      id: word?.id,
      lessonId,
      unitId,
      word: text.trim(),
      ipa: ipa.trim(),
      meaning: meaning.trim(),
      partOfSpeech: partOfSpeech.trim(),
      imageUrl: imageUrl.trim() || undefined,
      audioUrl: audioUrl.trim() || undefined,
      examples: cleaned,
    });
    setPending(false);
    if (res.ok) onSaved();
    else setError(res.error ?? "Chưa lưu được — thử lại giúp mình nhé.");
  }

  return (
    <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label>Từ tiếng Anh</Label>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="font-primer text-lg"
            placeholder="elephant"
          />
        </div>
        <div className="space-y-1">
          <Label>Phiên âm IPA</Label>
          <Input value={ipa} onChange={(e) => setIpa(e.target.value)} placeholder="/ˈel.ɪ.fənt/" />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label>Nghĩa tiếng Việt</Label>
          <Input value={meaning} onChange={(e) => setMeaning(e.target.value)} placeholder="con voi" />
        </div>
        <div className="space-y-1">
          <Label>Từ loại</Label>
          <Input
            value={partOfSpeech}
            onChange={(e) => setPartOfSpeech(e.target.value)}
            list="vocab-part-of-speech"
            placeholder="danh từ"
          />
          <datalist id="vocab-part-of-speech">
            {PARTS_OF_SPEECH.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
        </div>
      </div>

      {/* Ảnh: với trẻ nhỏ, ảnh chính là "nghĩa" — nhiều bé chưa đọc thạo tiếng Việt. */}
      <div className="space-y-1">
        <Label>
          Ảnh minh hoạ <span className="text-destructive">*</span>
        </Label>
        <ImageUpload name="__vocabImage" defaultValue={imageUrl} onValueChange={setImageUrl} />
        {!imageUrl.trim() && (
          <p className="flex items-start gap-1.5 rounded-md border border-brand-yellow bg-band-sun px-2.5 py-1.5 text-xs text-brand-gold">
            <ImageOff className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              Từ này chưa có ảnh. Trẻ nhỏ học bằng HÌNH là chính — hãy thêm ảnh trước khi xuất bản bài.
            </span>
          </p>
        )}
      </div>

      {/* Audio: mọi từ đều phải nghe được. */}
      <div className="space-y-1">
        <Label>Audio đọc từ</Label>
        <div className="flex flex-wrap items-center gap-1.5">
          <TtsButton text={text} onDone={setAudioUrl} />
          <Input
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
            placeholder="Bấm “Tạo audio” hoặc dán liên kết .mp3"
            className="min-w-48 flex-1"
          />
        </div>
        {audioUrl && <audio src={audioUrl} controls className="mt-1 h-8 w-full" />}
      </div>

      {/* Examples */}
      <div className="space-y-2">
        <Label>Câu ví dụ</Label>
        {examples.map((ex, i) => {
          const missing =
            ex.sentence.trim() !== "" &&
            text.trim() !== "" &&
            !ex.sentence.toLowerCase().includes(text.trim().toLowerCase());
          return (
            <div key={i} className="space-y-1.5 rounded-md border bg-background p-2.5">
              <div className="flex items-start gap-1.5">
                <Input
                  value={ex.sentence}
                  onChange={(e) => updateExample(i, { sentence: e.target.value })}
                  className={cn("font-primer", missing && "border-destructive")}
                  placeholder="The elephant is very big."
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setExamples((p) => p.filter((_, j) => j !== i))}
                  aria-label="Xoá câu ví dụ"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                value={ex.meaning}
                onChange={(e) => updateExample(i, { meaning: e.target.value })}
                className="text-sm"
                placeholder="Con voi rất to."
              />
              <div className="flex flex-wrap items-center gap-1.5">
                <TtsButton
                  size="xs"
                  text={ex.sentence}
                  onDone={(url) => updateExample(i, { audioUrl: url })}
                />
                <Input
                  value={ex.audioUrl ?? ""}
                  onChange={(e) => updateExample(i, { audioUrl: e.target.value })}
                  className="min-w-40 flex-1 text-sm"
                  placeholder="Audio câu ví dụ"
                />
              </div>
              {missing && (
                <p className="flex items-center gap-1 text-xs text-destructive">
                  <AlertTriangle className="h-3.5 w-3.5" /> Câu ví dụ chưa chứa từ “{text.trim()}”.
                </p>
              )}
            </div>
          );
        })}
        <Button type="button" variant="outline" size="sm" onClick={() => setExamples((p) => [...p, emptyExample()])}>
          <Plus className="mr-1 h-4 w-4" /> Thêm ví dụ
        </Button>
      </div>

      {/* Preview */}
      {text.trim() && (
        <div className="rounded-lg border bg-background p-3">
          <div className="mb-1 text-xs font-semibold uppercase text-muted-foreground">Xem trước thẻ</div>
          <div className="flex items-center gap-3">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt="" className="h-16 w-16 rounded-xl border object-cover" />
            ) : (
              <span className="flex h-16 w-16 items-center justify-center rounded-xl border border-dashed text-muted-foreground">
                <ImageOff className="h-5 w-5" />
              </span>
            )}
            <div>
              <div className="font-primer text-3xl font-bold text-primary">{text}</div>
              <div className="text-sm text-muted-foreground">{ipa}</div>
              <div className="text-sm">
                {meaning}
                {partOfSpeech && <span className="ml-1 text-muted-foreground">({partOfSpeech})</span>}
              </div>
            </div>
          </div>
          {examples.filter((e) => e.sentence.trim()).length > 0 && (
            <div className="mt-2 space-y-0.5 text-sm">
              {examples
                .filter((e) => e.sentence.trim())
                .map((ex, i) => (
                  <div key={i} className="font-primer">
                    {markWord(ex.sentence, text.trim()).map((seg, j) =>
                      seg.match ? (
                        <span key={j} className="font-bold text-primary">
                          {seg.text}
                        </span>
                      ) : (
                        <span key={j}>{seg.text}</span>
                      )
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex gap-2">
        <Button type="button" onClick={handleSubmit} disabled={pending}>
          <Save className="mr-1.5 h-4 w-4" />
          {pending ? "Đang lưu..." : word ? "Cập nhật từ" : "Thêm từ"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          <X className="mr-1.5 h-4 w-4" /> Hủy
        </Button>
      </div>
    </div>
  );
}
