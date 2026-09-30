'use client';

import React from 'react';
import { 
  BarChart3, 
  X, 
  Zap, 
  Target, 
  Clock, 
  FileText, 
  Award, 
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { UserStats, calculateLevel, getRankTitle, INITIAL_STATS, saveUserStats } from '@/lib/storage';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStats: UserStats;
  onStatsReset: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  userStats,
  onStatsReset,
}) => {
  if (!isOpen) return null;

  const levelInfo = calculateLevel(userStats.xp);
  const rank = getRankTitle(userStats.bestWpm);
  const totalMinutes = Math.round(userStats.totalTimeSeconds / 60);

  const handleReset = () => {
    if (confirm('Are you sure you want to purge all local operator telemetry and reset progress?')) {
      saveUserStats(INITIAL_STATS);
      onStatsReset();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl bg-[var(--bg-panel)] border border-[var(--border-strong)] rounded-xl shadow-2xl overflow-hidden font-mono">
        
        {/* Header */}
        <div className="p-3 sm:p-4 border-b border-[var(--border-subtle)] flex items-center justify-between gap-2 bg-[var(--bg-surface)]">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded bg-[var(--keycap-bg)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--accent-target)] shrink-0">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-bold text-[var(--text-main)] truncate">
                LIFETIME OPERATOR TELEMETRY
              </div>
              <div className="text-[10px] text-[var(--text-dim)] uppercase truncate">
                STATUS: ACTIVE PROFILE // LVL {levelInfo.level}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-input)] shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          
          {/* Level & Rank Hero */}
          <div className="p-3 sm:p-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-strong)] flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-[10px] sm:text-xs text-[var(--text-dim)] uppercase">Rank Qualification</div>
              <div className={`text-base sm:text-xl font-black ${rank.color} mt-0.5 truncate`}>
                {rank.title} [{rank.badge}]
              </div>
              <div className="text-[10px] sm:text-[11px] text-[var(--text-faint)] mt-1 truncate">
                Level {levelInfo.level} Operative ({levelInfo.currentLevelXp} / {levelInfo.nextLevelXp} XP)
              </div>
            </div>

            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[var(--bg-input)] border-2 border-[var(--accent-tactical)] flex items-center justify-center text-center shrink-0">
              <div>
                <div className="text-[8px] sm:text-[9px] text-[var(--text-faint)]">LVL</div>
                <div className="text-base sm:text-lg font-black text-[var(--accent-tactical)] leading-none">
                  {levelInfo.level}
                </div>
              </div>
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            
            <div className="p-3 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)]">
              <div className="flex items-center gap-1.5 text-[var(--text-dim)] mb-1">
                <Zap className="w-3.5 h-3.5 text-[var(--accent-tactical)]" />
                <span>Peak Record</span>
              </div>
              <div className="text-2xl font-black text-[var(--accent-tactical)]">
                {userStats.bestWpm} <span className="text-xs font-normal text-[var(--text-faint)]">WPM</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)]">
              <div className="flex items-center gap-1.5 text-[var(--text-dim)] mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-[var(--accent-target)]" />
                <span>Average WPM</span>
              </div>
              <div className="text-2xl font-black text-[var(--accent-target)]">
                {userStats.averageWpm} <span className="text-xs font-normal text-[var(--text-faint)]">WPM</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)]">
              <div className="flex items-center gap-1.5 text-[var(--text-dim)] mb-1">
                <Target className="w-3.5 h-3.5 text-[var(--accent-success)]" />
                <span>Accuracy</span>
              </div>
              <div className="text-2xl font-black text-[var(--accent-success)]">
                {userStats.averageAccuracy}%
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)]">
              <div className="flex items-center gap-1.5 text-[var(--text-dim)] mb-1">
                <Clock className="w-3.5 h-3.5 text-[var(--text-faint)]" />
                <span>Time Deployed</span>
              </div>
              <div className="text-2xl font-black text-[var(--text-main)]">
                {totalMinutes} <span className="text-xs font-normal text-[var(--text-faint)]">MIN</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)]">
              <div className="flex items-center gap-1.5 text-[var(--text-dim)] mb-1">
                <FileText className="w-3.5 h-3.5 text-[var(--text-faint)]" />
                <span>Words Typed</span>
              </div>
              <div className="text-2xl font-black text-[var(--text-main)]">
                {userStats.totalWordsTyped}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)]">
              <div className="flex items-center gap-1.5 text-[var(--text-dim)] mb-1">
                <Award className="w-3.5 h-3.5 text-[var(--accent-tactical)]" />
                <span>Tests Finished</span>
              </div>
              <div className="text-2xl font-black text-[var(--text-main)]">
                {userStats.totalTests}
              </div>
            </div>

          </div>

        </div>

        {/* Footer & Reset */}
        <div className="p-4 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
          <button
            onClick={handleReset}
            className="text-[var(--accent-danger)] hover:underline flex items-center gap-1 text-[11px]"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Local Stats</span>
          </button>

          <button
            onClick={onClose}
            className="tactical-keycap px-4 py-1.5 rounded text-[var(--text-main)] bg-[var(--keycap-bg)] hover:bg-[var(--bg-input)] font-bold text-xs"
          >
            CLOSE
          </button>
        </div>

      </div>
    </div>
  );
};
