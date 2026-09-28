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
  Achievement 
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

export default function Home() {
  const [settings, setSettings] = useState<TestSettings>(DEFAULT_SETTINGS);
  const [userStats, setUserStats] = useState(INITIAL_STATS);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  // Load persistent settings & stats on mount
  useEffect(() => {
    const savedSettings = loadSettings();
    const savedStats = loadUserStats();

    setSettings(savedSettings);
    setUserStats(savedStats);

    // Apply theme to document element
    document.documentElement.setAttribute('data-theme', savedSettings.theme);

    // Configure sound synthesizer
    soundFx.setSoundType(savedSettings.soundType);
    soundFx.setVolume(savedSettings.soundVolume);

    setIsClientLoaded(true);
  }, []);

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
              key={`${settings.mode}-${settings.timeLimit}-${settings.wordCount}-${settings.punctuation}-${settings.numbers}-${settings.hardcore}`}
              settings={settings}
              bestWpm={userStats.bestWpm}
              onFinishTest={handleFinishTest}
              onAbortHardcore={handleRestart}
            />
          )}
        </div>

        {/* Comprehensive SEO & Informational Sections */}
        <div className="w-full pt-12 border-t border-[var(--border-subtle)] space-y-16">
          <WpmRanksSection />
          <WpmSavingsCalculator />
          <TypingGuideSection />
          <FaqSection />
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
}
