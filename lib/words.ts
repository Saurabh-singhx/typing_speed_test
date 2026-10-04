import { LanguageCode } from './types';
import { WORDS_EN, QUOTES_EN } from './words/en';
import { WORDS_ES, QUOTES_ES } from './words/es';
import { WORDS_DE, QUOTES_DE } from './words/de';
import { WORDS_FR, QUOTES_FR } from './words/fr';
import { WORDS_PT, QUOTES_PT } from './words/pt';
import { WORDS_RU, QUOTES_RU } from './words/ru';
import { WORDS_HI, QUOTES_HI } from './words/hi';
import { WORDS_IT, QUOTES_IT } from './words/it';

// Export legacy defaults for backward compatibility
export const COMMON_WORDS = WORDS_EN;
export const TACTICAL_QUOTES = QUOTES_EN;

const WORDS_BY_LANG: Record<LanguageCode, string[]> = {
  en: WORDS_EN,
  es: WORDS_ES,
  de: WORDS_DE,
  fr: WORDS_FR,
  pt: WORDS_PT,
  ru: WORDS_RU,
  hi: WORDS_HI,
  it: WORDS_IT,
};

const QUOTES_BY_LANG: Record<LanguageCode, { text: string; source: string }[]> = {
  en: QUOTES_EN,
  es: QUOTES_ES,
  de: QUOTES_DE,
  fr: QUOTES_FR,
  pt: QUOTES_PT,
  ru: QUOTES_RU,
  hi: QUOTES_HI,
  it: QUOTES_IT,
};

/**
 * Splits text into user-perceived grapheme clusters (essential for Hindi matras, emojis, and combined characters).
 */
export function splitGraphemes(text: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    try {
      const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text), (s) => s.segment);
    } catch {
      return Array.from(text);
    }
  }
  return Array.from(text);
}

// Cadence Buckets for natural typing rhythm
interface CadenceBuckets {
  short: string[];   // 3-4 characters (quick transition cadence)
  medium: string[];  // 5-6 characters (rhythmic anchor cadence)
  long: string[];    // 7-8 characters (flow stamina cadence)
}

const CADENCE_BUCKETS_BY_LANG: Partial<Record<LanguageCode, CadenceBuckets>> = {};

function getCadenceBuckets(lang: LanguageCode): CadenceBuckets {
  if (CADENCE_BUCKETS_BY_LANG[lang]) {
    return CADENCE_BUCKETS_BY_LANG[lang]!;
  }
  const list = WORDS_BY_LANG[lang] || WORDS_EN;
  const buckets: CadenceBuckets = {
    short: [],
    medium: [],
    long: [],
  };

  for (const w of list) {
    if (w.length <= 4) {
      buckets.short.push(w);
    } else if (w.length <= 6) {
      buckets.medium.push(w);
    } else {
      buckets.long.push(w);
    }
  }

  // Fallbacks if any bucket is sparse
  if (buckets.short.length === 0) buckets.short = list;
  if (buckets.medium.length === 0) buckets.medium = list;
  if (buckets.long.length === 0) buckets.long = list;

  CADENCE_BUCKETS_BY_LANG[lang] = buckets;
  return buckets;
}

// Session Anti-Repetition Ring Buffer (tracks last 80 generated words)
const recentHistoryByLang: Record<string, string[]> = {};
const MAX_HISTORY_WINDOW = 80;

// Signature Monkeytype natural typing cadence pattern
const CADENCE_RHYTHM_PATTERN: ('short' | 'medium' | 'long')[] = [
  'medium', 'short', 'medium', 'long', 'medium', 'short', 'long', 'medium',
];

export function getRandomWords(
  count: number,
  options?: { punctuation?: boolean; numbers?: boolean },
  language: LanguageCode = 'en'
): string[] {
  const wordList = WORDS_BY_LANG[language] || WORDS_EN;
  const buckets = getCadenceBuckets(language);
  const result: string[] = [];

  // Initialize or fetch language recent history
  if (!recentHistoryByLang[language]) {
    recentHistoryByLang[language] = [];
  }
  const recentHistory = recentHistoryByLang[language];
  const recentSet = new Set(recentHistory);
  const usedInCurrentTest = new Set<string>();

  // Localized punctuation marks
  const punctuationMarks = language === 'es' 
    ? [",", ".", "!", "?", ";", ":", "-"]
    : language === 'hi'
    ? ["।", ",", "!", "?", "-"]
    : [",", ".", "!", "?", ";", ":", "-", "'"];

  for (let i = 0; i < count; i++) {
    // Inject realistic numbers occasionally if enabled
    if (options?.numbers && Math.random() < 0.14) {
      let numWord = '';
      const numRoll = Math.random();
      if (numRoll < 0.35) {
        // Current/recent year
        numWord = `${Math.floor(Math.random() * 30 + 2000)}`;
      } else if (numRoll < 0.65) {
        // 2-3 digit score / metric
        numWord = `${Math.floor(Math.random() * 890 + 10)}`;
      } else if (numRoll < 0.85) {
        // Percentage
        numWord = `${Math.floor(Math.random() * 95 + 5)}%`;
      } else {
        // Currency / count
        numWord = `$${Math.floor(Math.random() * 250 + 5)}`;
      }

      result.push(numWord);
      continue;
    }

    // Determine target cadence bucket for rhythmic variety
    const targetBucketType = CADENCE_RHYTHM_PATTERN[i % CADENCE_RHYTHM_PATTERN.length];
    const candidatePool = buckets[targetBucketType] || wordList;

    let pickedWord = '';

    // Attempt 1: Pick a word not in current test and not in recent history
    for (let attempt = 0; attempt < 40; attempt++) {
      const candidate = candidatePool[Math.floor(Math.random() * candidatePool.length)];
      if (!usedInCurrentTest.has(candidate) && !recentSet.has(candidate)) {
        pickedWord = candidate;
        break;
      }
    }

    // Attempt 2: If pool was exhausted, pick word not in current test
    if (!pickedWord) {
      for (let attempt = 0; attempt < 30; attempt++) {
        const candidate = candidatePool[Math.floor(Math.random() * candidatePool.length)];
        if (!usedInCurrentTest.has(candidate)) {
          pickedWord = candidate;
          break;
        }
      }
    }

    // Attempt 3: Fallback to entire wordlist
    if (!pickedWord) {
      for (let attempt = 0; attempt < 30; attempt++) {
        const candidate = wordList[Math.floor(Math.random() * wordList.length)];
        if (!usedInCurrentTest.has(candidate)) {
          pickedWord = candidate;
          break;
        }
      }
    }

    // Ultimate fallback if count > wordList.length
    if (!pickedWord) {
      pickedWord = wordList[Math.floor(Math.random() * wordList.length)];
    }

    usedInCurrentTest.add(pickedWord);

    // Track in session history buffer
    recentHistory.push(pickedWord);
    if (recentHistory.length > MAX_HISTORY_WINDOW) {
      recentHistory.shift();
    }

    let formattedWord = pickedWord;

    // Sentence Capitalization (if punctuation mode is active)
    if (
      language !== 'hi' &&
      options?.punctuation &&
      (i === 0 || 
        result[i - 1]?.endsWith(".") || 
        result[i - 1]?.endsWith("!") || 
        result[i - 1]?.endsWith("?") ||
        result[i - 1]?.endsWith(".\"") ||
        result[i - 1]?.endsWith("!\""))
    ) {
      formattedWord = formattedWord.charAt(0).toUpperCase() + formattedWord.slice(1);
    }

    // Natural Punctuation Injection (~22% cadence)
    if (options?.punctuation && i < count - 1 && Math.random() < 0.22) {
      const p = punctuationMarks[Math.floor(Math.random() * punctuationMarks.length)];
      if (p === "'" && language === 'en') {
        formattedWord = `${formattedWord}'s`;
      } else {
        formattedWord = `${formattedWord}${p}`;
      }
    }

    result.push(formattedWord);
  }

  // Ensure last word has a concluding sentence punctuation if punctuation is enabled
  if (options?.punctuation && result.length > 0) {
    const lastIdx = result.length - 1;
    const endMark = language === 'hi' ? '।' : '.';
    if (
      !result[lastIdx].endsWith(".") && 
      !result[lastIdx].endsWith("!") && 
      !result[lastIdx].endsWith("?") && 
      !result[lastIdx].endsWith("।")
    ) {
      result[lastIdx] = `${result[lastIdx]}${endMark}`;
    }
  }

  return result;
}

export function getRandomQuote(language: LanguageCode = 'en'): { text: string; source: string } {
  const quoteList = QUOTES_BY_LANG[language] || QUOTES_EN;
  return quoteList[Math.floor(Math.random() * quoteList.length)];
}
