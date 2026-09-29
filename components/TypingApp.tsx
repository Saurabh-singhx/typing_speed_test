'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { TestSettingsBar } from '@/components/TypingTest/TestSettingsBar';
import { TypingEngine } from '@/components/TypingTest/TypingEngine';
import { TestResults } from '@/components/TypingTest/TestResults';
import { AchievementsModal } from '@/components/Dashboard/AchievementsModal';
import { StatsModal } from '@/components/Dashboard/StatsModal';
import { WpmRanksSection } from '@/components/SEO/WpmRanksSection';
import { WpmSavingsCalculator } from '@/components/SEO/WpmSavingsCalculator';
import { TypingGuideSection } from '@/components/SEO/TypingGuideSection';
import { FaqSection } from '@/components/SEO/FaqSection';
import { Footer } from '@/components/SEO/Footer';
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
}

export const TypingApp: React.FC<TypingAppProps> = ({ initialLanguage }) => {
  const [settings, setSettings] = useState<TestSettings>(() => ({
    ...DEFAULT_SETTINGS,
    ...(initialLanguage ? { language: initialLanguage } : {}),
  }));
  const [userStats, setUserStats] = useState(INITIAL_STATS);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
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
    const { updatedStats, newAchievements: newlyUnlocked } = recordTestResult(result);
    setUserStats(updatedStats);
    setNewAchievements(newlyUnlocked);
    setTestResult(result);
  };

  // Restart / Next Test Handler
  const handleRestart = () => {
    setTestResult(null);
    setNewAchievements([]);
  };

  const currentLang = settings.language || 'en';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-main)] transition-colors">
      
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
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col items-center justify-start space-y-6">
        
        {/* Settings Bar */}
        <TestSettingsBar
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          disabled={testResult !== null}
        />

        {/* Dynamic Display: Active Engine vs Test Telemetry Results */}
        <div className="w-full my-auto py-4">
          {testResult ? (
            <TestResults
              result={testResult}
              userStats={userStats}
              newAchievements={newAchievements}
              onRestart={handleRestart}
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
        <div className="w-full pt-12 border-t border-[var(--border-subtle)] space-y-16">
          <WpmRanksSection lang={currentLang} />
          <WpmSavingsCalculator lang={currentLang} />
          <TypingGuideSection lang={currentLang} />
          <FaqSection lang={currentLang} />
        </div>

      </main>

      {/* Footer */}
      <Footer />

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
      />

    </div>
  );
};
