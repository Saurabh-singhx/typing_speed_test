export type LanguageCode = 'en' | 'es' | 'de' | 'fr' | 'pt' | 'ru' | 'hi' | 'it';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  slug: string;
  defaultLayout: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogLocale: string;
}

export type TestMode = 'time' | 'words' | 'quote' | 'boss';
export type TimeOption = 15 | 30 | 60 | 120;
export type WordOption = 10 | 25 | 50 | 100;
export type CaretStyle = 'line' | 'block' | 'underline' | 'box';
export type SoundType = 'thock' | 'clicky' | 'topre' | 'arcade' | 'off';

export type GameTheme = 'tactical' | 'obsidian' | 'cyberdeck' | 'arctic' | 'mecha';

export interface TestSettings {
  language: LanguageCode;
  mode: TestMode;
  timeLimit: TimeOption;
  wordCount: WordOption;
  punctuation: boolean;
  numbers: boolean;
  hardcore: boolean; // Sudden death (1 typo = instant fail)
  targetWpm: number; // For ghost pacer (e.g., 60, 80, 100, 120)
  soundType: SoundType;
  soundVolume: number; // 0 to 1
  caretStyle: CaretStyle;
  theme: GameTheme;
}

export interface WpmPoint {
  second: number;
  wpm: number;
  rawWpm: number;
  errors: number;
}

export interface TestResult {
  id: string;
  timestamp: number;
  wpm: number;
  rawWpm: number;
  accuracy: number;
  consistency: number;
  correctChars: number;
  incorrectChars: number;
  extraChars: number;
  missedChars: number;
  duration: number; // in seconds
  mode: TestMode;
  settingsSnapshot: string;
  chartData: WpmPoint[];
  missedKeysMap: Record<string, number>;
  highestStreak: number;
  xpEarned: number;
}

export interface UserStats {
  totalTests: number;
  totalTimeSeconds: number;
  totalWordsTyped: number;
  bestWpm: number;
  averageWpm: number;
  averageAccuracy: number;
  currentStreakDays: number;
  lastActiveDate: string;
  xp: number;
  level: number;
  unlockedAchievements: string[];
}

export interface Achievement {
  id: string;
  title: string;
  codename: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlocked: boolean;
  progress?: { current: number; max: number };
}

export interface BossEnemy {
  id: string;
  name: string;
  title: string;
  maxHp: number;
  currentHp: number;
  shieldMax: number;
  shieldCurrent: number;
  attackInterval: number; // in seconds
  timeRemaining: number;
  avatarIcon: string;
  status: 'alive' | 'defeated' | 'failed';
}
