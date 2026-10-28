'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { 
  Play, 
  BarChart3, 
  Award, 
  Trophy, 
  Activity, 
  Clock, 
  Zap, 
  Swords, 
  Target 
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { TestSettingsBar } from '@/components/TypingTest/TestSettingsBar';
import { CertificateLevelsSection } from '@/components/TypingTest/CertificateLevelsSection';
import { CertificateMedal } from '@/components/TypingTest/CertificateMedal';

// Lightweight skeletons to eliminate layout shifts (CLS 0.000)
const ShatterArenaSkeleton = () => (
  <div className="w-full max-w-5xl mx-auto space-y-2 font-mono animate-pulse" aria-hidden="true">
    <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2.5 rounded-t-2xl neo-extruded text-xs min-h-[46px]">
      <div className="flex items-center gap-2">
        <div className="h-6 w-24 rounded-xl neo-inset opacity-60" />
        <div className="h-6 w-20 rounded-xl neo-inset opacity-60" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-6 w-16 rounded-xl neo-inset opacity-60" />
        <div className="h-6 w-8 rounded-xl neo-inset opacity-60" />
      </div>
    </div>
    <div className="w-full max-w-5xl h-[280px] sm:h-[340px] bg-[var(--bg-input)] neo-inset-deep rounded-b-2xl relative overflow-hidden flex flex-col items-center justify-center gap-2">
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-tactical)]">
        <span className="w-2 h-2 rounded-full bg-[var(--accent-tactical)] animate-ping" />
        <span className="tracking-widest font-bold">CALIBRATING APM TELEMETRY ARENA...</span>
      </div>
    </div>
  </div>
);

const TypingEngineSkeleton = () => (
  <div className="w-full max-w-5xl mx-auto space-y-2.5 sm:space-y-3 font-mono animate-pulse" aria-hidden="true">
    <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl neo-extruded text-xs min-h-[48px]">
      <div className="flex items-center gap-2">
        <div className="h-7 w-20 rounded-xl neo-inset opacity-60" />
        <div className="h-7 w-24 rounded-xl neo-inset opacity-60" />
      </div>
      <div className="h-7 w-16 rounded-xl neo-inset opacity-60" />
    </div>
    <div className="w-full h-7 rounded-xl neo-inset opacity-40" />
    <div className="w-full min-h-[150px] sm:min-h-[180px] max-h-[200px] sm:max-h-[230px] p-4 sm:p-7 rounded-2xl neo-inset-deep border border-[var(--border-subtle)] flex items-center justify-center">
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-tactical)]">
        <span className="w-2 h-2 rounded-full bg-[var(--accent-tactical)] animate-pulse" />
        <span className="tracking-widest font-bold">INITIALIZING KEYBOARD INTERFACE...</span>
      </div>
    </div>
  </div>
);

// Dynamically import results, modals & specialized arenas to keep initial page load bundle lean
const TestResults = dynamic(
  () => import('@/components/TypingTest/TestResults').then((mod) => mod.TestResults),
  { ssr: false }
);
const ShatterStreamArena = dynamic(
  () => import('@/components/TypingTest/ShatterStreamArena').then((mod) => mod.ShatterStreamArena),
  { 
    ssr: false,
    loading: () => <ShatterArenaSkeleton />,
  }
);
const TypingEngine = dynamic(
  () => import('@/components/TypingTest/TypingEngine').then((mod) => mod.TypingEngine),
  { 
    ssr: false,
    loading: () => <TypingEngineSkeleton />,
  }
);
const AchievementsModal = dynamic(
  () => import('@/components/Dashboard/AchievementsModal').then((mod) => mod.AchievementsModal),
  { ssr: false }
);
const StatsModal = dynamic(
  () => import('@/components/Dashboard/StatsModal').then((mod) => mod.StatsModal),
  { ssr: false }
);

import { 
  TestSettings, 
  TestResult, 
  GameTheme, 
  SoundType, 
  Achievement,
  LanguageCode 
} from '@/lib/types';
import { 
  DEFAULT_SETTINGS, 
  INITIAL_STATS, 
  loadSettings, 
  saveSettings, 
  loadUserStats, 
  recordTestResult,
  loadHistory,
  calculateLevel,
  getRankTitle
} from '@/lib/storage';
import { soundFx } from '@/lib/audio';

interface TypingAppProps {
  initialLanguage?: LanguageCode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export const TypingApp: React.FC<TypingAppProps> = ({ initialLanguage, children, footer }) => {
  const [settings, setSettings] = useState<TestSettings>(() => ({
    ...DEFAULT_SETTINGS,
    ...(initialLanguage ? { language: initialLanguage } : {}),
  }));
  const [userStats, setUserStats] = useState(INITIAL_STATS);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [levelUpData, setLevelUpData] = useState<{ leveledUp: boolean; oldLevel: number; newLevel: number } | null>(null);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'test' | 'results' | 'certificates'>('test');

  // Fetch latest test from history if not currently in an active result
  const latestHistoryResult = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const history = loadHistory();
    return history.length > 0 ? history[0] : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testResult, activeTab]);

  const modeTimeLabel = useMemo(() => {
    if (settings.mode === 'time') {
      return settings.timeLimit === 60 ? '1 minute' : `${settings.timeLimit} seconds`;
    }
    if (settings.mode === 'words') {
      return `${settings.wordCount} words`;
    }
    if (settings.mode === 'quote') {
      return 'Quote mode';
    }
    if (settings.mode === 'boss') {
      return 'Boss Raid Combat';
    }
    return 'Shatter Stream Arcade';
  }, [settings.mode, settings.timeLimit, settings.wordCount]);

  const handleStartOrFocusTest = () => {
    if (testResult) {
      handleRestart();
    } else {
      const input = (document.getElementById('typing-test-input') || document.getElementById('shatter-mobile-input')) as HTMLInputElement | null;
      if (input) {
        input.focus();
      }
    }
  };

  // Load persistent settings & stats on mount
  useEffect(() => {
    const savedSettings = loadSettings();
    const savedStats = loadUserStats();

    // If an initial language was specified via URL, prioritize it over generic saved settings
    const activeLanguage = initialLanguage || savedSettings.language || 'en';
    const mergedSettings: TestSettings = {
      ...savedSettings,
      language: activeLanguage,
    };

    setSettings(mergedSettings);
    setUserStats(savedStats);

    // Set HTML lang attribute for accessibility and screen readers
    document.documentElement.setAttribute('lang', activeLanguage);

    // Apply theme to document element
    document.documentElement.setAttribute('data-theme', mergedSettings.theme);

    // Configure sound synthesizer
    soundFx.setSoundType(mergedSettings.soundType);
    soundFx.setVolume(mergedSettings.soundVolume);
  }, [initialLanguage]);

  // Update Settings Handler
  const handleUpdateSettings = (newPartial: Partial<TestSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newPartial };
      saveSettings(updated);

      if (newPartial.theme) {
        document.documentElement.setAttribute('data-theme', newPartial.theme);
      }
      if (newPartial.soundType !== undefined) {
        soundFx.setSoundType(updated.soundType);
      }
      if (newPartial.soundVolume !== undefined) {
        soundFx.setVolume(updated.soundVolume);
      }
      if (newPartial.language) {
        document.documentElement.setAttribute('lang', newPartial.language);
        // Smoothly update browser URL without full reload
        const newPath = newPartial.language === 'en' ? '/' : `/${newPartial.language}`;
        if (typeof window !== 'undefined' && window.location.pathname !== newPath) {
          window.history.pushState(null, '', newPath);
        }
      }

      return updated;
    });

    // Reset current active test if settings change
    setTestResult(null);
  };

  // Test Completed Handler
  const handleFinishTest = (result: TestResult) => {
    const { updatedStats, newAchievements: newlyUnlocked, leveledUp, oldLevel, newLevel } = recordTestResult(result);
    setUserStats(updatedStats);
    setNewAchievements(newlyUnlocked);
    setLevelUpData(leveledUp ? { leveledUp, oldLevel, newLevel } : null);
    setTestResult(result);
    setActiveTab('test');
  };

  // Restart / Next Test Handler
  const handleRestart = () => {
    setTestResult(null);
    setNewAchievements([]);
    setLevelUpData(null);
  };

  const currentLang = settings.language || 'en';

  return (
    <div 
      className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-main)] transition-colors font-sans"
      onPointerDown={() => soundFx.unlock()}
    >
      
      {/* Top Navbar */}
      <Navbar
        theme={settings.theme}
        onThemeChange={(theme: GameTheme) => handleUpdateSettings({ theme })}
        soundType={settings.soundType}
        onSoundChange={(soundType: SoundType) => handleUpdateSettings({ soundType })}
        volume={settings.soundVolume}
        onVolumeChange={(soundVolume: number) => handleUpdateSettings({ soundVolume })}
        targetWpm={settings.targetWpm}
        onTargetWpmChange={(targetWpm: number) => handleUpdateSettings({ targetWpm })}
        language={currentLang}
        onLanguageChange={(lang: LanguageCode) => handleUpdateSettings({ language: lang })}
        userStats={userStats}
        onOpenAchievements={() => setShowAchievementsModal(true)}
        onOpenStats={() => setShowStatsModal(true)}
      />

      {/* Main Container: 2-Column Clarity Layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 pt-6 pb-12 flex flex-col md:flex-row gap-6 items-start">
        
        {/* Left Column: Navigation Sidebar */}
        <aside className="w-full md:w-64 lg:w-72 shrink-0 space-y-4">
          {/* Navigation Pill List */}
          <nav className="tw-card p-2 sm:p-2.5 flex md:flex-col gap-1.5 overflow-x-auto no-scrollbar" aria-label="Sidebar navigation">
            <button
              onClick={() => {
                setActiveTab('test');
                if (testResult) handleRestart();
              }}
              className={`tw-sidebar-item whitespace-nowrap ${
                activeTab === 'test' ? 'tw-sidebar-item-active' : ''
              }`}
            >
              <Play className={`w-4 h-4 shrink-0 ${activeTab === 'test' ? 'text-white fill-white' : 'text-[#16a34a] fill-[#16a34a]'}`} />
              <span>Type test</span>
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className={`tw-sidebar-item whitespace-nowrap ${
                activeTab === 'results' ? 'tw-sidebar-item-active' : ''
              }`}
            >
              <BarChart3 className={`w-4 h-4 shrink-0 ${activeTab === 'results' ? 'text-white' : 'text-[var(--accent-tactical)]'}`} />
              <span>Results</span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`tw-sidebar-item whitespace-nowrap ${
                activeTab === 'certificates' ? 'tw-sidebar-item-active' : ''
              }`}
            >
              <Award className={`w-4 h-4 shrink-0 ${activeTab === 'certificates' ? 'text-white' : 'text-amber-500'}`} />
              <span>Certificate</span>
            </button>

            <button
              onClick={() => setShowStatsModal(true)}
              className="tw-sidebar-item whitespace-nowrap"
            >
              <Activity className="w-4 h-4 shrink-0 text-cyan-500" />
              <span>Lifetime Stats</span>
            </button>

            <button
              onClick={() => setShowAchievementsModal(true)}
              className="tw-sidebar-item whitespace-nowrap"
            >
              <Trophy className="w-4 h-4 shrink-0 text-amber-500" />
              <span>Achievements</span>
            </button>
          </nav>

          {/* User Progression / Rank Card */}
          <div className="hidden md:block tw-card p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-[var(--text-main)]">
                LVL {calculateLevel(userStats.xp).level}
              </span>
              <span className="text-[11px] font-bold text-[var(--accent-tactical)]">
                {getRankTitle(userStats.bestWpm).title}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#5911f0] to-[#59c73d] rounded-full transition-all duration-300"
                style={{ width: `${calculateLevel(userStats.xp).progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-[var(--text-faint)] font-medium">
              <span>{calculateLevel(userStats.xp).currentLevelXp} / {calculateLevel(userStats.xp).nextLevelXp} XP</span>
              <span className="font-semibold text-[var(--text-main)]">Best: {userStats.bestWpm} WPM</span>
            </div>
          </div>
        </aside>

        {/* Right Column: Dynamic Content Area */}
        <section className="flex-1 min-w-0 w-full space-y-6">
          
          {/* TAB 1: TYPE TEST */}
          {activeTab === 'test' && (
            <div className="space-y-6">
              
              {/* Start Test Header Row Card */}
              <div
                id="start-test-header"
                onClick={handleStartOrFocusTest}
                className="tw-card tw-card-hover p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#16a34a]/15 flex items-center justify-center shrink-0">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-[#16a34a] fill-[#16a34a] ml-0.5" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-lg sm:text-xl font-extrabold text-[var(--text-main)] truncate m-0 leading-tight">
                      Typing Speed Test
                    </h1>
                    <p className="text-xs sm:text-sm text-[var(--text-dim)] m-0 flex items-center gap-1.5 font-medium mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-[var(--text-faint)] shrink-0" />
                      <span>{modeTimeLabel}</span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartOrFocusTest();
                  }}
                  className="tw-btn-success text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 shrink-0"
                >
                  {testResult ? 'Start new test' : 'Start test'}
                </button>
              </div>

              {/* Test Settings Bar */}
              {!testResult && (
                <TestSettingsBar
                  settings={settings}
                  onUpdateSettings={handleUpdateSettings}
                />
              )}

              {/* Dynamic Engine Arena or Test Results Scorecard */}
              <div className="w-full min-h-[350px] sm:min-h-[400px]">
                {testResult ? (
                  <TestResults
                    result={testResult}
                    userStats={userStats}
                    newAchievements={newAchievements}
                    levelUpData={levelUpData}
                    onRestart={handleRestart}
                  />
                ) : settings.mode === 'shatter' ? (
                  <ShatterStreamArena
                    key={`shatter-${settings.language}-${settings.shatterSpeed}-${settings.wordCount}-${settings.timeLimit}-${settings.shatterSoundProfile}-${settings.shatterFxIntensity}-${settings.shatterTargetMode}-${settings.shatterStreamDensity}`}
                    settings={settings}
                    bestWpm={userStats.bestWpm}
                    onFinishTest={handleFinishTest}
                    onAbort={handleRestart}
                  />
                ) : (
                  <TypingEngine
                    key={`${settings.language}-${settings.mode}-${settings.timeLimit}-${settings.wordCount}-${settings.punctuation}-${settings.numbers}-${settings.hardcore}`}
                    settings={settings}
                    bestWpm={userStats.bestWpm}
                    onFinishTest={handleFinishTest}
                    onAbortHardcore={handleRestart}
                  />
                )}
              </div>

              {/* Certificate Levels Overview */}
              {!testResult && (
                <div className="pt-2">
                  <CertificateLevelsSection userStats={userStats} />
                </div>
              )}

              {/* Fast Ways to Practice (Featuring OUR actual modes) */}
              {!testResult && (
                <div className="pt-4 space-y-3">
                  <h3 className="text-base sm:text-lg font-extrabold text-[var(--text-main)]">
                    Fast ways to improve your typing
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Shatter Stream Mode Tile */}
                    <div
                      onClick={() => {
                        handleUpdateSettings({ mode: 'shatter' });
                        handleRestart();
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      className="tw-card tw-card-hover p-5 flex flex-col justify-between cursor-pointer group"
                    >
                      <div>
                        <div className="inline-block px-2.5 py-1 rounded-full bg-[#5911f0]/15 text-[#5911f0] text-[11px] font-bold uppercase tracking-wider mb-4">
                          for velocity
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Zap className="w-6 h-6 fill-amber-500" />
                        </div>
                        <h4 className="text-lg font-extrabold text-[var(--text-main)] mb-1">
                          Shatter Stream
                        </h4>
                        <p className="text-xs sm:text-sm text-[var(--text-dim)] mb-6">
                          shatter falling words under kinetic time pressure
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateSettings({ mode: 'shatter' });
                          handleRestart();
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className="tw-btn-primary w-full py-2.5 text-sm font-bold"
                      >
                        Start arcade
                      </button>
                    </div>

                    {/* Boss Raid Combat Tile */}
                    <div
                      onClick={() => {
                        handleUpdateSettings({ mode: 'boss' });
                        handleRestart();
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      className="tw-card tw-card-hover p-5 flex flex-col justify-between cursor-pointer group"
                    >
                      <div>
                        <div className="inline-block px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 text-[11px] font-bold uppercase tracking-wider mb-4">
                          for combat APM
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Swords className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-extrabold text-[var(--text-main)] mb-1">
                          Boss Raid Arena
                        </h4>
                        <p className="text-xs sm:text-sm text-[var(--text-dim)] mb-6">
                          defeat the Sentinel AI with critical combo speed
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateSettings({ mode: 'boss' });
                          handleRestart();
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className="tw-btn-success w-full py-2.5 text-sm font-bold"
                      >
                        Start combat
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: RESULTS */}
          {activeTab === 'results' && (
            <div className="space-y-6">
              {testResult ? (
                <TestResults
                  result={testResult}
                  userStats={userStats}
                  newAchievements={newAchievements}
                  levelUpData={levelUpData}
                  onRestart={() => {
                    handleRestart();
                    setActiveTab('test');
                  }}
                />
              ) : latestHistoryResult ? (
                <TestResults
                  result={latestHistoryResult}
                  userStats={userStats}
                  newAchievements={[]}
                  levelUpData={null}
                  onRestart={() => {
                    handleRestart();
                    setActiveTab('test');
                  }}
                />
              ) : (
                /* Empty Results State */
                <div className="space-y-6">
                  <div id="metric-tiles" className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="tw-card tw-card-flat p-4 sm:p-5 flex items-center gap-4">
                      <CertificateMedal tier="locked" size={50} />
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-[var(--text-main)] opacity-50">None</h3>
                        <span className="text-[11px] font-bold text-[var(--text-faint)] uppercase tracking-wider">Certificate</span>
                      </div>
                    </div>
                    <div className="tw-card tw-card-flat p-4 sm:p-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-[var(--accent-tactical)] flex items-center justify-center shrink-0">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-[var(--text-main)] opacity-50">0 CPM</h3>
                        <span className="text-[11px] font-bold text-[var(--text-faint)] uppercase tracking-wider">Speed</span>
                      </div>
                    </div>
                    <div className="tw-card tw-card-flat p-4 sm:p-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-[#16a34a] flex items-center justify-center shrink-0">
                        <Target className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-[var(--text-main)] opacity-50">0 %</h3>
                        <span className="text-[11px] font-bold text-[var(--text-faint)] uppercase tracking-wider">Accuracy</span>
                      </div>
                    </div>
                  </div>

                  <div className="tw-card tw-card-flat p-8 sm:p-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#5911f0]/10 text-[var(--accent-tactical)] mx-auto flex items-center justify-center">
                      <BarChart3 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-[var(--text-main)]">Your Results</h3>
                    <p className="text-sm text-[var(--text-dim)] max-w-md mx-auto">
                      Complete a typing test to track your typing velocity, accuracy percentage, and cadence graph.
                    </p>
                    <button
                      onClick={() => {
                        setActiveTab('test');
                        handleRestart();
                      }}
                      className="tw-btn-primary text-base px-8 py-3"
                    >
                      Start test
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CERTIFICATE */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <div id="metric-tiles" className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="tw-card tw-card-flat p-4 sm:p-5 flex items-center gap-4">
                  <CertificateMedal
                    tier={
                      userStats.bestWpm >= 70 && userStats.averageAccuracy >= 98
                        ? 'gold'
                        : userStats.bestWpm >= 50 && userStats.averageAccuracy >= 96
                        ? 'silver'
                        : userStats.bestWpm >= 40 && userStats.averageAccuracy >= 94
                        ? 'bronze'
                        : 'locked'
                    }
                    size={50}
                  />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[var(--text-main)]">
                      {userStats.bestWpm >= 70 && userStats.averageAccuracy >= 98
                        ? 'Gold'
                        : userStats.bestWpm >= 50 && userStats.averageAccuracy >= 96
                        ? 'Silver'
                        : userStats.bestWpm >= 40 && userStats.averageAccuracy >= 94
                        ? 'Bronze'
                        : 'In Progress'}
                    </h3>
                    <span className="text-[11px] font-bold text-[var(--text-faint)] uppercase tracking-wider">
                      Current Certificate
                    </span>
                  </div>
                </div>

                <div className="tw-card tw-card-flat p-4 sm:p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-[var(--accent-tactical)] flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[var(--text-main)]">
                      {userStats.bestWpm * 5} <span className="text-xs font-bold text-[var(--text-faint)]">CPM</span>{' '}
                      <span className="text-sm font-semibold text-[var(--text-dim)]">({userStats.bestWpm} WPM)</span>
                    </h3>
                    <span className="text-[11px] font-bold text-[var(--text-faint)] uppercase tracking-wider">
                      Best Speed
                    </span>
                  </div>
                </div>

                <div className="tw-card tw-card-flat p-4 sm:p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-[#16a34a] flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[var(--text-main)]">
                      {userStats.averageAccuracy || 100} %
                    </h3>
                    <span className="text-[11px] font-bold text-[var(--text-faint)] uppercase tracking-wider">
                      Avg Accuracy
                    </span>
                  </div>
                </div>
              </div>

              <CertificateLevelsSection userStats={userStats} />
            </div>
          )}

          {/* Localized SEO Sections */}
          {children && (
            <div className="w-full pt-10 border-t border-[var(--border-subtle)] space-y-12">
              {children}
            </div>
          )}

        </section>

      </main>

      {/* Footer */}
      {footer}

      {/* Modals */}
      <AchievementsModal
        isOpen={showAchievementsModal}
        onClose={() => setShowAchievementsModal(false)}
        userStats={userStats}
      />

      <StatsModal
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
        userStats={userStats}
        onStatsReset={() => setUserStats(loadUserStats())}
        onOpenAchievements={() => {
          setShowStatsModal(false);
          setShowAchievementsModal(true);
        }}
      />

    </div>
  );
};
