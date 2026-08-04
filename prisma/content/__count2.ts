// TEMP — đếm phonics + first-words. Xoá sau khi dùng.
import { PHONICS_LESSONS, scoredCardCount } from "@/lib/phonics-lessons";
import {
  CORE_FIRST_WORDS_UNITS,
  FIRST_WORDS_UNITS,
  TOTAL_FIRST_WORDS,
  CORE_FIRST_WORDS_COUNT,
  FIRST_WORDS_LEVEL,
} from "@/lib/first-words";
import {
  ALL_LETTER_SOUNDS,
  SOUND_GROUPS,
  SIGHT_WORDS,
  CVC_WORDS,
  RHYME_SETS,
  DIGRAPHS,
  VOWEL_TEAMS,
} from "@/lib/phonics-data";

const out: Record<string, unknown> = {};

out.phonics = {
  lessons: PHONICS_LESSONS.length,
  cards: PHONICS_LESSONS.reduce((n, l) => n + l.cards.length, 0),
  scoredCards: PHONICS_LESSONS.reduce((n, l) => n + scoredCardCount(l), 0),
  lessonIds: PHONICS_LESSONS.map((l) => l.id),
  soundGroups: SOUND_GROUPS.length,
  allLetterSounds: ALL_LETTER_SOUNDS.length,
  digraphs: DIGRAPHS.length,
  vowelTeams: VOWEL_TEAMS.length,
  sightWords: SIGHT_WORDS.length,
  cvcWords: CVC_WORDS.length,
  rhymeSets: RHYME_SETS.length,
};

const bonusUnits = FIRST_WORDS_UNITS.filter((u) => u.bonus);
out.firstWords = {
  coreUnits: CORE_FIRST_WORDS_UNITS.length,
  coreWords: CORE_FIRST_WORDS_COUNT,
  bonusUnits: bonusUnits.length,
  bonusWords: bonusUnits.reduce((n, u) => n + u.words.length, 0),
  totalUnits: FIRST_WORDS_UNITS.length,
  totalWords: TOTAL_FIRST_WORDS,
  wordsPerCoreUnit: CORE_FIRST_WORDS_UNITS.map((u) => `${u.id}:${u.words.length}`),
  wordsPerBonusUnit: bonusUnits.map((u) => `${u.id}:${u.words.length}`),
  level: FIRST_WORDS_LEVEL,
};

console.log(JSON.stringify(out, null, 2));
