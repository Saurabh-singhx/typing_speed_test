'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Navbar';
import { TestSettingsBar } from '@/components/TypingTest/TestSettingsBar';

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

import { getLocalizedHeader } from '@/lib/seo-header';
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
  recordTestResult 
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
  };

  // Restart / Next Test Handler
  const handleRestart = () => {
    setTestResult(null);
    setNewAchievements([]);
    setLevelUpData(null);
  };

  const currentLang = settings.language || 'en';
  const localizedHeader = getLocalizedHeader(currentLang);

  return (
    <div 
      className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-main)] transition-colors"
      onPointerDown={() => soundFx.unlock()}
    >
      
      {/* Tactical Top Navbar */}
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

      {/* Main Testing Arena */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-2.5 sm:px-6 py-4 sm:py-8 flex flex-col items-center justify-start space-y-4 sm:space-y-6 overflow-x-hidden">
        
        {/* Semantic H1 & Tactical Intro Header - Visible when not in scorecard */}
        {!testResult && (
          <header className="w-full text-center space-y-1.5 max-w-3xl mx-auto pt-1 px-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neo-inset text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-[var(--accent-tactical)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-tactical)] animate-pulse" />
              <span>{localizedHeader.badgeText}</span>
            </div>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-black font-mono tracking-tight text-[var(--text-main)] px-2">
              {localizedHeader.headline}
            </h1>
            <p className="text-[11px] sm:text-sm text-[var(--text-dim)] font-mono max-w-xl mx-auto leading-relaxed px-2">
              {localizedHeader.subheadline}
            </p>
          </header>
        )}

        {/* Settings Bar - Hidden when viewing performance scorecard */}
        {!testResult && (
          <TestSettingsBar
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
          />
        )}

        {/* Dynamic Display: Active Engine vs Test Telemetry Results */}
        <div className="w-full my-auto py-2 sm:py-4 min-h-[350px] sm:min-h-[420px]">
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

        {/* Comprehensive Localized SEO & Informational Sections */}
        {children && (
          <div className="w-full pt-12 border-t border-[var(--border-subtle)] space-y-16">
            {children}
          </div>
        )}

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
