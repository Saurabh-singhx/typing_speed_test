import { TestSettings, UserStats, TestResult, Achievement } from './types';
export type { UserStats };

const SETTINGS_KEY = 'keyops_tactical_settings_v1';
const STATS_KEY = 'keyops_tactical_stats_v1';
const HISTORY_KEY = 'keyops_tactical_history_v1';

export const DEFAULT_SETTINGS: TestSettings = {
  mode: 'time',
  timeLimit: 30,
  wordCount: 25,
  punctuation: false,
  numbers: false,
  hardcore: false,
  targetWpm: 80,
  soundType: 'thock',
  soundVolume: 0.5,
  caretStyle: 'line',
  theme: 'tactical',
};

export const INITIAL_STATS: UserStats = {
  totalTests: 0,
  totalTimeSeconds: 0,
  totalWordsTyped: 0,
  bestWpm: 0,
  averageWpm: 0,
  averageAccuracy: 100,
  currentStreakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  xp: 0,
  level: 1,
  unlockedAchievements: [],
};

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'first_blood',
    title: 'First Blood',
    codename: 'OP_RECRUIT',
    description: 'Complete your first tactical typing test.',
    icon: 'target',
    tier: 'bronze',
    unlocked: false,
  },
  {
    id: 'sharpshooter',
    title: 'Deadly Precision',
    codename: 'OP_SNIPER',
    description: 'Finish any test with 100% accuracy.',
    icon: 'crosshair',
    tier: 'silver',
    unlocked: false,
  },
  {
    id: 'century_club',
    title: 'Century Club',
    codename: 'OP_MACH1',
    description: 'Break past 100 WPM on any official test.',
    icon: 'zap',
    tier: 'gold',
    unlocked: false,
  },
  {
    id: 'hyperdrive',
    title: 'Apex Overdrive',
    codename: 'OP_HYPER',
    description: 'Achieve 130+ WPM with at least 98% accuracy.',
    icon: 'flame',
    tier: 'platinum',
    unlocked: false,
  },
  {
    id: 'combo_king',
    title: 'Flow State',
    codename: 'OP_COMBO',
    description: 'Reach a streak multiplier of 50 flawless keystrokes.',
    icon: 'activity',
    tier: 'silver',
    unlocked: false,
  },
  {
    id: 'iron_discipline',
    title: 'Hardcore Survivor',
    codename: 'OP_SURVIVOR',
    description: 'Complete a Sudden Death test without a single typo.',
    icon: 'shield',
    tier: 'gold',
    unlocked: false,
  },
  {
    id: 'titan_slayer',
    title: 'Titan Slayer',
    codename: 'OP_TITAN',
    description: 'Defeat the Sentinel Rogue AI in Boss Raid mode.',
    icon: 'sword',
    tier: 'platinum',
    unlocked: false,
  },
  {
    id: 'veteran_typist',
    title: 'Combat Veteran',
    codename: 'OP_VETERAN',
    description: 'Complete 25 total typing tests.',
    icon: 'award',
    tier: 'silver',
    unlocked: false,
  }
];

export function calculateLevel(xp: number): { level: number; currentLevelXp: number; nextLevelXp: number; progressPercent: number } {
  // Level progression formula: Level L requires L * 250 XP
  // Total XP to reach level L = 125 * (L - 1) * L
  let level = 1;
  while (xp >= 125 * level * (level + 1)) {
    level++;
  }
  const currentBase = 125 * (level - 1) * level;
  const nextBase = 125 * level * (level + 1);
  const currentLevelXp = xp - currentBase;
  const neededForNext = nextBase - currentBase;
  const progressPercent = Math.min(100, Math.round((currentLevelXp / neededForNext) * 100));

  return { level, currentLevelXp, nextLevelXp: neededForNext, progressPercent };
}

export function getRankTitle(wpm: number): { title: string; badge: string; color: string } {
  if (wpm >= 120) return { title: 'Apex Grandmaster', badge: 'APX', color: 'text-amber-400' };
  if (wpm >= 100) return { title: 'Esports Operative', badge: 'ESP', color: 'text-emerald-400' };
  if (wpm >= 80) return { title: 'Cyber Vanguard', badge: 'VAN', color: 'text-cyan-400' };
  if (wpm >= 60) return { title: 'Tactical Specialist', badge: 'TAC', color: 'text-blue-400' };
  if (wpm >= 40) return { title: 'Field Scout', badge: 'SCT', color: 'text-slate-300' };
  return { title: 'Cadet Trainee', badge: 'REC', color: 'text-slate-400' };
}

export function loadSettings(): TestSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (!data) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: TestSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings to localStorage', e);
  }
}

export function loadUserStats(): UserStats {
  if (typeof window === 'undefined') return INITIAL_STATS;
  try {
    const data = localStorage.getItem(STATS_KEY);
    if (!data) return INITIAL_STATS;
    return { ...INITIAL_STATS, ...JSON.parse(data) };
  } catch {
    return INITIAL_STATS;
  }
}

export function saveUserStats(stats: UserStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats', e);
  }
}

export function loadHistory(): TestResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function recordTestResult(result: TestResult): { updatedStats: UserStats; newAchievements: Achievement[] } {
  const currentStats = loadUserStats();
  const history = loadHistory();

  // Update history (keep last 50)
  const updatedHistory = [result, ...history].slice(0, 50);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (e) {
    console.error(e);
  }

  // Calculate new stats
  const totalTests = currentStats.totalTests + 1;
  const totalTimeSeconds = currentStats.totalTimeSeconds + result.duration;
  const wordsInThisTest = Math.round(result.correctChars / 5);
  const totalWordsTyped = currentStats.totalWordsTyped + wordsInThisTest;
  const bestWpm = Math.max(currentStats.bestWpm, result.wpm);

  // Moving average
  const averageWpm = Math.round(
    (currentStats.averageWpm * currentStats.totalTests + result.wpm) / totalTests
  );
  const averageAccuracy = Math.round(
    (currentStats.averageAccuracy * currentStats.totalTests + result.accuracy) / totalTests
  );

  // XP calculation: (WPM * Accuracy / 100) * duration multiplier + streak bonus
  const baseScore = result.wpm * (result.accuracy / 100);
  const timeFactor = Math.max(0.5, result.duration / 30);
  const xpEarned = Math.round(baseScore * timeFactor * 10 + result.highestStreak * 2);
  const newXp = currentStats.xp + xpEarned;
  const { level } = calculateLevel(newXp);

  // Check achievements
  const unlockedIds = new Set(currentStats.unlockedAchievements);
  const newlyUnlocked: Achievement[] = [];

  ACHIEVEMENTS_LIST.forEach((ach) => {
    if (unlockedIds.has(ach.id)) return;

    let unlocked = false;
    if (ach.id === 'first_blood' && totalTests >= 1) unlocked = true;
    if (ach.id === 'sharpshooter' && result.accuracy === 100 && result.wpm >= 40) unlocked = true;
    if (ach.id === 'century_club' && result.wpm >= 100) unlocked = true;
    if (ach.id === 'hyperdrive' && result.wpm >= 130 && result.accuracy >= 98) unlocked = true;
    if (ach.id === 'combo_king' && result.highestStreak >= 50) unlocked = true;
    if (ach.id === 'iron_discipline' && result.settingsSnapshot.includes('hardcore') && result.accuracy === 100) unlocked = true;
    if (ach.id === 'titan_slayer' && result.mode === 'boss' && result.accuracy >= 90) unlocked = true;
    if (ach.id === 'veteran_typist' && totalTests >= 25) unlocked = true;

    if (unlocked) {
      unlockedIds.add(ach.id);
      newlyUnlocked.push({ ...ach, unlocked: true });
    }
  });

  const updatedStats: UserStats = {
    ...currentStats,
    totalTests,
    totalTimeSeconds,
    totalWordsTyped,
    bestWpm,
    averageWpm,
    averageAccuracy,
    xp: newXp,
    level,
    unlockedAchievements: Array.from(unlockedIds),
  };

  saveUserStats(updatedStats);
  return { updatedStats, newAchievements: newlyUnlocked };
}
