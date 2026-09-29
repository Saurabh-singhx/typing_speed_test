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

export function getRandomWords(
  count: number,
  options?: { punctuation?: boolean; numbers?: boolean },
  language: LanguageCode = 'en'
): string[] {
  const wordList = WORDS_BY_LANG[language] || WORDS_EN;
  const result: string[] = [];
  
  // Localized punctuation marks
  const punctuationMarks = language === 'es' 
    ? [".", ",", "!", "?", ";", ":", "-"]
    : language === 'hi'
    ? ["।", ",", "!", "?", "-"]
    : [".", ",", "!", "?", ";", ":", "-", "'"];

  for (let i = 0; i < count; i++) {
    // Pick random word
    let word = wordList[Math.floor(Math.random() * wordList.length)];

    // Inject numbers occasionally if enabled
    if (options?.numbers && Math.random() < 0.15) {
      if (Math.random() < 0.5) {
        word = Math.floor(Math.random() * 999 + 1).toString();
      } else {
        word = `${Math.floor(Math.random() * 20 + 2020)}`;
      }
    }

    // Capitalize occasionally or if following punctuation (only for alphabetic languages)
    if (
      language !== 'hi' &&
      options?.punctuation &&
      (i === 0 || result[i - 1]?.endsWith(".") || result[i - 1]?.endsWith("!") || result[i - 1]?.endsWith("?"))
    ) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    // Append punctuation if enabled
    if (options?.punctuation && i < count - 1 && Math.random() < 0.22) {
      const p = punctuationMarks[Math.floor(Math.random() * punctuationMarks.length)];
      if (p === "'" && language === 'en') {
        word = `${word}'s`;
      } else {
        word = `${word}${p}`;
      }
    }

    result.push(word);
  }

  // Ensure last word has a concluding sentence punctuation if punctuation is enabled
  if (options?.punctuation && result.length > 0) {
    const lastIdx = result.length - 1;
    const endMark = language === 'hi' ? '।' : '.';
    if (!result[lastIdx].endsWith(".") && !result[lastIdx].endsWith("!") && !result[lastIdx].endsWith("।")) {
      result[lastIdx] = `${result[lastIdx]}${endMark}`;
    }
  }

  return result;
}

export function getRandomQuote(language: LanguageCode = 'en'): { text: string; source: string } {
  const quoteList = QUOTES_BY_LANG[language] || QUOTES_EN;
  return quoteList[Math.floor(Math.random() * quoteList.length)];
}
