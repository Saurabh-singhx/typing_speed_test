import { TestSettings, UserStats, TestResult, Achievement } from './types';
export type { UserStats };

const SETTINGS_KEY = 'typetrack_settings_v1';
const STATS_KEY = 'typetrack_stats_v1';
const HISTORY_KEY = 'typetrack_history_v1';

// Fallback keys to seamlessly migrate existing user progress
const LEGACY_SETTINGS_KEY = 'keyops_tactical_settings_v1';
const LEGACY_STATS_KEY = 'keyops_tactical_stats_v1';
const LEGACY_HISTORY_KEY = 'keyops_tactical_history_v1';

export const DEFAULT_SETTINGS: TestSettings = {
  language: 'en',
  mode: 'shatter',
  timeLimit: 30,
  wordCount: 25,
  punctuation: false,
  numbers: false,
  hardcore: false,
  targetWpm: 80,
  soundType: 'thock',
  soundVolume: 0.5,
  caretStyle: 'line',
  theme: 'neomorphism',
  shatterSpeed: 'normal',
  shatterFxIntensity: 'full',
  shatterSoundProfile: 'crystal',
  shatterTargetMode: 'time',
  shatterStreamDensity: 'normal',
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

export interface LevelRankInfo {
  minLevel: number;
  maxLevel: number;
  title: string;
  badge: string;
  color: string;
  borderGlow: string;
  perk: string;
}

export const LEVEL_RANKS: LevelRankInfo[] = [
  { minLevel: 1, maxLevel: 4, title: 'Cadet Trainee', badge: 'REC', color: 'text-slate-400', borderGlow: 'border-slate-500/30', perk: 'Basic Keystroke Telemetry' },
  { minLevel: 5, maxLevel: 9, title: 'Field Scout', badge: 'SCT', color: 'text-cyan-400', borderGlow: 'border-cyan-500/40', perk: 'Custom Keycap Accent' },
  { minLevel: 10, maxLevel: 14, title: 'Tactical Specialist', badge: 'TAC', color: 'text-blue-400', borderGlow: 'border-blue-500/40', perk: 'Dual-Tone HUD Telemetry' },
  { minLevel: 15, maxLevel: 19, title: 'Cyber Vanguard', badge: 'VAN', color: 'text-indigo-400', borderGlow: 'border-indigo-500/40', perk: 'Kinetic Surge Particle FX' },
  { minLevel: 20, maxLevel: 24, title: 'Recon Phantom', badge: 'PHT', color: 'text-emerald-400', borderGlow: 'border-emerald-500/40', perk: 'Ghost Pulse Caret Glow' },
  { minLevel: 25, maxLevel: 29, title: 'Esports Operative', badge: 'ESP', color: 'text-amber-400', borderGlow: 'border-amber-500/40', perk: 'Golden WPM Scorecard Crown' },
  { minLevel: 30, maxLevel: 39, title: 'Apex Grandmaster', badge: 'APX', color: 'text-purple-400', borderGlow: 'border-purple-500/40', perk: 'Apex Holo-Banner & Crest' },
  { minLevel: 40, maxLevel: 49, title: 'Chrono Striker', badge: 'CHR', color: 'text-rose-400', borderGlow: 'border-rose-500/40', perk: 'Chrono Temporal Shimmer' },
  { minLevel: 50, maxLevel: 74, title: 'Shadow Commander', badge: 'CMD', color: 'text-yellow-400', borderGlow: 'border-yellow-500/50', perk: 'Obsidian Command Matrix' },
  { minLevel: 75, maxLevel: 9999, title: 'Quantum Architect', badge: 'QNT', color: 'text-sky-300', borderGlow: 'border-sky-400/60', perk: 'Quantum Overclock Godmode' },
];

export function getRankByLevel(level: number): LevelRankInfo {
  const rank = LEVEL_RANKS.find((r) => level >= r.minLevel && level <= r.maxLevel);
  return rank || LEVEL_RANKS[0];
}

export const ACHIEVEMENTS_LIST: Achievement[] = [
  // --- SPEED & VELOCITY ---
  {
    id: 'first_blood',
    title: 'First Deployment',
    codename: 'OP_RECRUIT',
    description: 'Complete your first official typing session.',
    icon: 'target',
    tier: 'bronze',
    category: 'speed',
    xpReward: 50,
    unlocked: false,
  },
  {
    id: 'cadet_stride',
    title: 'Velocity Cadet',
    codename: 'OP_STRIDE',
    description: 'Break past 50 WPM on any verified test.',
    icon: 'zap',
    tier: 'bronze',
    category: 'speed',
    xpReward: 75,
    unlocked: false,
  },
  {
    id: 'mach_one',
    title: 'Sound Barrier',
    codename: 'OP_MACH1',
    description: 'Achieve 80+ WPM with at least 95% accuracy.',
    icon: 'zap',
    tier: 'silver',
    category: 'speed',
    xpReward: 150,
    unlocked: false,
  },
  {
    id: 'century_club',
    title: 'Century Striker',
    codename: 'OP_CENTURY',
    description: 'Break past 100 WPM on any official test.',
    icon: 'flame',
    tier: 'gold',
    category: 'speed',
    xpReward: 300,
    unlocked: false,
  },
  {
    id: 'hypersonic',
    title: 'Hypersonic Phantom',
    codename: 'OP_HYPER',
    description: 'Clock 120+ WPM with at least 96% accuracy.',
    icon: 'flame',
    tier: 'gold',
    category: 'speed',
    xpReward: 450,
    unlocked: false,
  },
  {
    id: 'hyperdrive',
    title: 'Apex Overdrive',
    codename: 'OP_APEX',
    description: 'Achieve 140+ WPM with 98%+ accuracy.',
    icon: 'trophy',
    tier: 'platinum',
    category: 'speed',
    xpReward: 650,
    unlocked: false,
  },
  {
    id: 'lightspeed',
    title: 'Cosmic Tachyon',
    codename: 'OP_COSMIC',
    description: 'Blast past 160+ WPM on an official test.',
    icon: 'sparkles',
    tier: 'mythic',
    category: 'speed',
    xpReward: 1200,
    unlocked: false,
  },

  // --- PRECISION & MARKSMANSHIP ---
  {
    id: 'sharpshooter',
    title: 'Surgical Precision',
    codename: 'OP_SNIPER',
    description: 'Finish a test with 100% accuracy (minimum 40 WPM).',
    icon: 'crosshair',
    tier: 'silver',
    category: 'precision',
    xpReward: 150,
    unlocked: false,
  },
  {
    id: 'zen_focus',
    title: 'Zen Equilibrium',
    codename: 'OP_ZEN',
    description: 'Achieve a consistency rating of 90%+ on any test.',
    icon: 'activity',
    tier: 'silver',
    category: 'precision',
    xpReward: 180,
    unlocked: false,
  },
  {
    id: 'zero_defect',
    title: 'Zero-Defect Arsenal',
    codename: 'OP_ZERO',
    description: 'Type 300+ correct characters in a single test without a single typo.',
    icon: 'shield',
    tier: 'gold',
    category: 'precision',
    xpReward: 300,
    unlocked: false,
  },
  {
    id: 'ghost_protocol',
    title: 'Ghost in the Wire',
    codename: 'OP_GHOST',
    description: 'Finish a 60s or 50-word test with 99%+ accuracy and 80+ WPM.',
    icon: 'crosshair',
    tier: 'platinum',
    category: 'precision',
    xpReward: 500,
    unlocked: false,
  },
  {
    id: 'iron_discipline',
    title: 'Hardcore Survivor',
    codename: 'OP_SURVIVOR',
    description: 'Complete a Sudden Death test without triggering failure.',
    icon: 'shield',
    tier: 'gold',
    category: 'precision',
    xpReward: 350,
    unlocked: false,
  },

  // --- ENDURANCE & MOMENTUM ---
  {
    id: 'combo_initiate',
    title: 'Kinetic Flow',
    codename: 'OP_FLOW25',
    description: 'Reach a streak multiplier of 25 flawless keystrokes.',
    icon: 'activity',
    tier: 'bronze',
    category: 'endurance',
    xpReward: 100,
    unlocked: false,
  },
  {
    id: 'combo_master',
    title: 'Flow State',
    codename: 'OP_FLOW50',
    description: 'Reach a streak multiplier of 50 flawless keystrokes.',
    icon: 'activity',
    tier: 'silver',
    category: 'endurance',
    xpReward: 200,
    unlocked: false,
  },
  {
    id: 'streak_centurion',
    title: 'Untouchable Momentum',
    codename: 'OP_FLOW100',
    description: 'Achieve a 100+ keystroke uninterrupted flow streak.',
    icon: 'zap',
    tier: 'gold',
    category: 'endurance',
    xpReward: 400,
    unlocked: false,
  },
  {
    id: 'marathon_runner',
    title: 'Iron Lungs',
    codename: 'OP_MARATHON',
    description: 'Complete a 120-second continuous combat endurance test.',
    icon: 'clock',
    tier: 'silver',
    category: 'endurance',
    xpReward: 250,
    unlocked: false,
  },
  {
    id: 'century_words',
    title: 'The Centurion',
    codename: 'OP_WORDS100',
    description: 'Complete a 100-word marathon test without resetting.',
    icon: 'award',
    tier: 'silver',
    category: 'endurance',
    xpReward: 250,
    unlocked: false,
  },

  // --- ARCADE & RAIDS ---
  {
    id: 'shatter_demolisher',
    title: 'Crystal Breaker',
    codename: 'OP_SHATTER',
    description: 'Shatter 25 words in Shatter Stream mode.',
    icon: 'zap',
    tier: 'silver',
    category: 'arcade',
    xpReward: 200,
    unlocked: false,
  },
  {
    id: 'shatter_grandmaster',
    title: 'Absolute Zero',
    codename: 'OP_CRYSTAL',
    description: 'Shatter 50 words with 95%+ accuracy in Shatter Stream mode.',
    icon: 'sparkles',
    tier: 'gold',
    category: 'arcade',
    xpReward: 450,
    unlocked: false,
  },
  {
    id: 'titan_slayer',
    title: 'Titan Neutralizer',
    codename: 'OP_TITAN',
    description: 'Defeat the Sentinel Rogue AI in Boss Raid mode.',
    icon: 'sword',
    tier: 'gold',
    category: 'arcade',
    xpReward: 350,
    unlocked: false,
  },
  {
    id: 'blitzkrieg_raid',
    title: 'Raid Blitzkrieg',
    codename: 'OP_BLITZ',
    description: 'Defeat the Boss in Boss Raid mode in under 45 seconds.',
    icon: 'sword',
    tier: 'platinum',
    category: 'arcade',
    xpReward: 600,
    unlocked: false,
  },

  // --- CAREER & MASTERY ---
  {
    id: 'veteran_typist',
    title: 'Field Veteran',
    codename: 'OP_VETERAN',
    description: 'Complete 25 total typing tests.',
    icon: 'award',
    tier: 'silver',
    category: 'career',
    xpReward: 200,
    unlocked: false,
  },
  {
    id: 'centurion_operator',
    title: 'Centurion Operative',
    codename: 'OP_CENTURION',
    description: 'Complete 100 total typing tests.',
    icon: 'award',
    tier: 'gold',
    category: 'career',
    xpReward: 500,
    unlocked: false,
  },
  {
    id: 'grand_scholar',
    title: 'Lexicon Virtuoso',
    codename: 'OP_LEXICON',
    description: 'Type over 5,000 total words across your career.',
    icon: 'trophy',
    tier: 'gold',
    category: 'career',
    xpReward: 450,
    unlocked: false,
  },
  {
    id: 'night_owl',
    title: 'Night Raid',
    codename: 'OP_NOCTURNAL',
    description: 'Complete a combat typing session between midnight and 5:00 AM.',
    icon: 'target',
    tier: 'bronze',
    category: 'career',
    xpReward: 100,
    unlocked: false,
  },
];

export function calculateLevel(xp: number): {
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercent: number;
  rank: LevelRankInfo;
  nextRank?: LevelRankInfo;
} {
  // Level progression formula: Level L requires 100 * L * (L + 1) cumulative XP
  let level = 1;
  while (xp >= 100 * level * (level + 1)) {
    level++;
  }
  const currentBase = 100 * (level - 1) * level;
  const nextBase = 100 * level * (level + 1);
  const currentLevelXp = Math.max(0, xp - currentBase);
  const neededForNext = Math.max(1, nextBase - currentBase);
  const progressPercent = Math.min(100, Math.round((currentLevelXp / neededForNext) * 100));
  const rank = getRankByLevel(level);
  const nextRank = LEVEL_RANKS.find((r) => r.minLevel > level);

  return { level, currentLevelXp, nextLevelXp: neededForNext, progressPercent, rank, nextRank };
}

export function getRankTitle(wpm: number): { title: string; badge: string; color: string } {
  if (wpm >= 120) return { title: 'Apex Grandmaster', badge: 'APX', color: 'text-amber-400' };
  if (wpm >= 100) return { title: 'Esports Operative', badge: 'ESP', color: 'text-emerald-400' };
  if (wpm >= 80) return { title: 'Cyber Vanguard', badge: 'VAN', color: 'text-cyan-400' };
  if (wpm >= 60) return { title: 'Tactical Specialist', badge: 'TAC', color: 'text-blue-400' };
  if (wpm >= 40) return { title: 'Field Scout', badge: 'SCT', color: 'text-slate-300' };
  return { title: 'Cadet Trainee', badge: 'REC', color: 'text-slate-400' };
}

// Compute real-time live progress towards locked objectives
export function getAchievementsWithProgress(stats: UserStats): Achievement[] {
  const unlockedSet = new Set(stats.unlockedAchievements);

  return ACHIEVEMENTS_LIST.map((ach) => {
    const isUnlocked = unlockedSet.has(ach.id);
    let current = 0;
    let max = 1;
    let unit = '';

    switch (ach.id) {
      case 'first_blood':
        current = Math.min(1, stats.totalTests);
        max = 1;
        unit = 'test';
        break;
      case 'cadet_stride':
        current = Math.min(50, stats.bestWpm);
        max = 50;
        unit = 'WPM';
        break;
      case 'mach_one':
        current = Math.min(80, stats.bestWpm);
        max = 80;
        unit = 'WPM';
        break;
      case 'century_club':
        current = Math.min(100, stats.bestWpm);
        max = 100;
        unit = 'WPM';
        break;
      case 'hypersonic':
        current = Math.min(120, stats.bestWpm);
        max = 120;
        unit = 'WPM';
        break;
      case 'hyperdrive':
        current = Math.min(140, stats.bestWpm);
        max = 140;
        unit = 'WPM';
        break;
      case 'lightspeed':
        current = Math.min(160, stats.bestWpm);
        max = 160;
        unit = 'WPM';
        break;
      case 'zero_defect':
        current = Math.min(300, stats.bestFlawlessChars || 0);
        max = 300;
        unit = 'chars';
        break;
      case 'combo_initiate':
        current = Math.min(25, stats.highestStreak || 0);
        max = 25;
        unit = 'streak';
        break;
      case 'combo_master':
        current = Math.min(50, stats.highestStreak || 0);
        max = 50;
        unit = 'streak';
        break;
      case 'streak_centurion':
        current = Math.min(100, stats.highestStreak || 0);
        max = 100;
        unit = 'streak';
        break;
      case 'veteran_typist':
        current = Math.min(25, stats.totalTests);
        max = 25;
        unit = 'tests';
        break;
      case 'centurion_operator':
        current = Math.min(100, stats.totalTests);
        max = 100;
        unit = 'tests';
        break;
      case 'grand_scholar':
        current = Math.min(5000, stats.totalWordsTyped);
        max = 5000;
        unit = 'words';
        break;
      case 'shatter_demolisher':
        current = Math.min(25, stats.shatteredWordsTotal || 0);
        max = 25;
        unit = 'words';
        break;
      case 'shatter_grandmaster':
        current = Math.min(50, stats.shatteredWordsTotal || 0);
        max = 50;
        unit = 'words';
        break;
      case 'titan_slayer':
        current = Math.min(1, stats.bossesDefeated || 0);
        max = 1;
        unit = 'defeat';
        break;
      default:
        current = isUnlocked ? 1 : 0;
        max = 1;
        unit = '';
        break;
    }

    return {
      ...ach,
      unlocked: isUnlocked,
      progress: { current, max, unit },
    };
  });
}

export function loadSettings(): TestSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const data = localStorage.getItem(SETTINGS_KEY) || localStorage.getItem(LEGACY_SETTINGS_KEY);
    if (!data) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(data);
    // Smoothly upgrade previous default 'tactical' theme to 'neomorphism'
    if (parsed.theme === 'tactical' && !localStorage.getItem('typetrack_theme_migrated_neo_v1')) {
      parsed.theme = 'neomorphism';
      localStorage.setItem('typetrack_theme_migrated_neo_v1', 'true');
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...DEFAULT_SETTINGS, ...parsed, theme: 'neomorphism' }));
    }
    // Smoothly upgrade default mode to 'shatter'
    if (!localStorage.getItem('typetrack_mode_migrated_shatter_v1')) {
      parsed.mode = 'shatter';
      localStorage.setItem('typetrack_mode_migrated_shatter_v1', 'true');
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...DEFAULT_SETTINGS, ...parsed, mode: 'shatter' }));
    }
    return { ...DEFAULT_SETTINGS, ...parsed };
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
    const data = localStorage.getItem(STATS_KEY) || localStorage.getItem(LEGACY_STATS_KEY);
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
    const data = localStorage.getItem(HISTORY_KEY) || localStorage.getItem(LEGACY_HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function recordTestResult(result: TestResult): {
  updatedStats: UserStats;
  newAchievements: Achievement[];
  leveledUp: boolean;
  oldLevel: number;
  newLevel: number;
} {
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
  const highestStreak = Math.max(currentStats.highestStreak || 0, result.highestStreak || 0);

  // Best flawless characters in a single test
  const isFlawless = result.incorrectChars === 0;
  const bestFlawlessChars = Math.max(
    currentStats.bestFlawlessChars || 0,
    isFlawless ? result.correctChars : 0
  );

  // Track arcade metrics
  const isShatter = result.mode === 'shatter';
  const shatteredWordsTotal = (currentStats.shatteredWordsTotal || 0) + (isShatter ? wordsInThisTest : 0);
  const isBossDefeat = result.mode === 'boss' && result.accuracy >= 85;
  const bossesDefeated = (currentStats.bossesDefeated || 0) + (isBossDefeat ? 1 : 0);

  // Moving averages
  const averageWpm = Math.round(
    (currentStats.averageWpm * currentStats.totalTests + result.wpm) / totalTests
  );
  const averageAccuracy = Math.round(
    (currentStats.averageAccuracy * currentStats.totalTests + result.accuracy) / totalTests
  );

  // Base test XP: (WPM * Accuracy / 100) * duration multiplier + streak bonus
  const baseScore = result.wpm * (result.accuracy / 100);
  const timeFactor = Math.max(0.5, result.duration / 30);
  const xpEarnedFromTest = Math.round(baseScore * timeFactor * 10 + (result.highestStreak || 0) * 2);

  // Check achievements & calculate bonus achievement XP
  const unlockedIds = new Set(currentStats.unlockedAchievements);
  const newlyUnlocked: Achievement[] = [];
  let bonusAchievementXp = 0;
  const currentHour = new Date().getHours();

  ACHIEVEMENTS_LIST.forEach((ach) => {
    if (unlockedIds.has(ach.id)) return;

    let unlocked = false;
    // Speed
    if (ach.id === 'first_blood' && totalTests >= 1) unlocked = true;
    if (ach.id === 'cadet_stride' && result.wpm >= 50) unlocked = true;
    if (ach.id === 'mach_one' && result.wpm >= 80 && result.accuracy >= 95) unlocked = true;
    if (ach.id === 'century_club' && result.wpm >= 100) unlocked = true;
    if (ach.id === 'hypersonic' && result.wpm >= 120 && result.accuracy >= 96) unlocked = true;
    if (ach.id === 'hyperdrive' && result.wpm >= 140 && result.accuracy >= 98) unlocked = true;
    if (ach.id === 'lightspeed' && result.wpm >= 160) unlocked = true;

    // Precision
    if (ach.id === 'sharpshooter' && result.accuracy === 100 && result.wpm >= 40) unlocked = true;
    if (ach.id === 'zen_focus' && result.consistency >= 90 && result.duration >= 15) unlocked = true;
    if (ach.id === 'zero_defect' && result.correctChars >= 300 && result.incorrectChars === 0) unlocked = true;
    if (ach.id === 'ghost_protocol' && (result.duration >= 60 || wordsInThisTest >= 50) && result.accuracy >= 99 && result.wpm >= 80) unlocked = true;
    if (ach.id === 'iron_discipline' && result.settingsSnapshot.includes('hardcore') && result.accuracy === 100) unlocked = true;

    // Endurance
    if (ach.id === 'combo_initiate' && (result.highestStreak || 0) >= 25) unlocked = true;
    if (ach.id === 'combo_master' && (result.highestStreak || 0) >= 50) unlocked = true;
    if (ach.id === 'streak_centurion' && (result.highestStreak || 0) >= 100) unlocked = true;
    if (ach.id === 'marathon_runner' && result.duration >= 115) unlocked = true;
    if (ach.id === 'century_words' && wordsInThisTest >= 95) unlocked = true;

    // Arcade
    if (ach.id === 'shatter_demolisher' && isShatter && wordsInThisTest >= 20) unlocked = true;
    if (ach.id === 'shatter_grandmaster' && isShatter && wordsInThisTest >= 45 && result.accuracy >= 95) unlocked = true;
    if (ach.id === 'titan_slayer' && isBossDefeat) unlocked = true;
    if (ach.id === 'blitzkrieg_raid' && isBossDefeat && result.duration <= 45) unlocked = true;

    // Career
    if (ach.id === 'veteran_typist' && totalTests >= 25) unlocked = true;
    if (ach.id === 'centurion_operator' && totalTests >= 100) unlocked = true;
    if (ach.id === 'grand_scholar' && totalWordsTyped >= 5000) unlocked = true;
    if (ach.id === 'night_owl' && (currentHour >= 0 && currentHour < 5)) unlocked = true;

    if (unlocked) {
      unlockedIds.add(ach.id);
      bonusAchievementXp += ach.xpReward;
      newlyUnlocked.push({ ...ach, unlocked: true });
    }
  });

  const totalXpEarned = xpEarnedFromTest + bonusAchievementXp;
  const newXp = currentStats.xp + totalXpEarned;
  const oldLevel = currentStats.level || 1;
  const { level: newLevel } = calculateLevel(newXp);
  const leveledUp = newLevel > oldLevel;

  const updatedStats: UserStats = {
    ...currentStats,
    totalTests,
    totalTimeSeconds,
    totalWordsTyped,
    bestWpm,
    averageWpm,
    averageAccuracy,
    highestStreak,
    bestFlawlessChars,
    shatteredWordsTotal,
    bossesDefeated,
    xp: newXp,
    level: newLevel,
    unlockedAchievements: Array.from(unlockedIds),
  };

  saveUserStats(updatedStats);
  return { updatedStats, newAchievements: newlyUnlocked, leveledUp, oldLevel, newLevel };
}
