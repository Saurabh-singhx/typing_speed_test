'use client';

import React from 'react';
import { Check, Award } from 'lucide-react';
import { UserStats } from '@/lib/storage';
import { CertificateMedal } from './CertificateMedal';

interface CertificateLevelsSectionProps {
  userStats: UserStats;
}

export const CertificateLevelsSection: React.FC<CertificateLevelsSectionProps> = ({ userStats }) => {
  const bestCpm = Math.round(userStats.bestWpm * 5);
  const bestWpm = userStats.bestWpm;
  const bestAccuracy = userStats.averageAccuracy || 0;

  const tiers = [
    {
      id: 'gold',
      title: 'Gold certificate',
      medalTier: 'gold' as const,
      percentile: '8% of users reached this level',
      cpm: 350,
      wpm: 70,
      accuracy: 99.5,
      isUnlocked: bestWpm >= 70 && bestAccuracy >= 98,
    },
    {
      id: 'silver',
      title: 'Silver certificate',
      medalTier: 'silver' as const,
      percentile: '21% of users reached this level',
      cpm: 250,
      wpm: 50,
      accuracy: 98.5,
      isUnlocked: bestWpm >= 50 && bestAccuracy >= 96,
    },
    {
      id: 'bronze',
      title: 'Bronze certificate',
      medalTier: 'bronze' as const,
      percentile: '39% of users reached this level',
      cpm: 200,
      wpm: 40,
      accuracy: 96.5,
      isUnlocked: bestWpm >= 40 && bestAccuracy >= 94,
    },
  ];

  return (
    <div className="w-full space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-extrabold text-[var(--text-main)] flex items-center gap-2">
          <Award className="w-5 h-5 text-[var(--accent-tactical)]" />
          <span>Certificate Levels</span>
        </h3>
        <span className="text-xs font-semibold text-[var(--text-faint)]">
          {bestWpm > 0 ? `Your Best: ${bestWpm} WPM (${bestCpm} CPM)` : 'Take a test to qualify'}
        </span>
      </div>

      <div className="space-y-3">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`tw-card tw-card-hover p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
              tier.isUnlocked
                ? 'border-[#16a34a] bg-gradient-to-r from-emerald-500/5 to-transparent'
                : ''
            }`}
          >
            {/* Left: Medal + Title + Percentile */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="shrink-0 flex items-center justify-center">
                <CertificateMedal tier={tier.medalTier} size={50} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-base sm:text-lg font-extrabold text-[var(--text-main)]">
                    {tier.title}
                  </h4>
                  {tier.isUnlocked && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#16a34a]/15 text-[#15803d] border border-[#16a34a]/30">
                      <Check className="w-3 h-3" /> Unlocked
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-dim)] m-0">
                  {tier.percentile}
                </p>
              </div>
            </div>

            {/* Right: Metrics */}
            <div className="flex items-center justify-end gap-6 sm:gap-8 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--border-subtle)]">
              <div className="text-center sm:text-right">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-faint)]">
                  speed
                </span>
                <span className="text-base sm:text-lg font-extrabold text-[var(--text-main)]">
                  {tier.cpm} CPM <span className="text-xs font-semibold text-[var(--text-dim)]">({tier.wpm} WPM)</span>
                </span>
              </div>

              <div className="w-[2px] h-9 bg-[var(--border-subtle)] shrink-0" />

              <div className="text-center sm:text-right">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-faint)]">
                  accuracy
                </span>
                <span className="text-base sm:text-lg font-extrabold text-[var(--text-main)]">
                  {tier.accuracy} %
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
