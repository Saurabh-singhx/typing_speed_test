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
  RefreshCw,
  Trophy,
  Flame,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { UserStats, calculateLevel, INITIAL_STATS, saveUserStats } from '@/lib/storage';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStats: UserStats;
  onStatsReset: () => void;
  onOpenAchievements?: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  userStats,
  onStatsReset,
  onOpenAchievements,
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const levelInfo = calculateLevel(userStats.xp);
  const totalMinutes = Math.round(userStats.totalTimeSeconds / 60);

  const handleReset = () => {
    if (confirm('Are you sure you want to purge all local operator telemetry and reset progress? This cannot be undone.')) {
      saveUserStats(INITIAL_STATS);
      onStatsReset();
      onClose();
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="stats-modal-title"
    >
      <div className="w-full max-w-2xl rounded-3xl neo-extruded shadow-2xl overflow-hidden font-mono animate-modal flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--border-subtle)] flex items-center justify-between gap-3 bg-[var(--bg-surface)] shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl neo-inset flex items-center justify-center text-[var(--accent-target)] shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 id="stats-modal-title" className="text-xs sm:text-sm md:text-base font-black text-[var(--text-main)] tracking-wider truncate">
                LIFETIME OPERATOR TELEMETRY
              </h2>
              <div className="text-[11px] text-[var(--text-dim)] uppercase truncate mt-0.5">
                STATUS: ACTIVE OPERATIVE // LEVEL {levelInfo.level} [{levelInfo.rank.badge}]
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="tactical-keycap p-2.5 rounded-xl text-[var(--text-dim)] hover:text-[var(--text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
          
          {/* Operative Level & Rank Hero Banner */}
          <div className="p-4 sm:p-5 rounded-3xl neo-inset space-y-3.5 border border-[var(--border-subtle)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[10px] text-[var(--text-dim)] uppercase tracking-wider font-bold">
                  Operative Rank Qualification
                </div>
                <div className={`text-lg sm:text-2xl font-black ${levelInfo.rank.color} mt-0.5 flex items-center gap-2`}>
                  <span>{levelInfo.rank.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full neo-extruded border border-[var(--border-subtle)] text-[var(--text-main)]">
                    {levelInfo.rank.badge}
                  </span>
                </div>
                <div className="text-[11px] text-[var(--text-dim)] mt-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--accent-tactical)] shrink-0" />
                  <span>Active Perk: <strong className="text-[var(--text-main)]">{levelInfo.rank.perk}</strong></span>
                </div>
              </div>

              {/* Hexagonal LVL Box */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl neo-extruded flex items-center justify-center text-center shrink-0 border border-[var(--border-subtle)]">
                <div>
                  <div className="text-[8px] sm:text-[9px] text-[var(--text-faint)] font-bold tracking-widest">LVL</div>
                  <div className="text-xl sm:text-2xl font-black text-[var(--accent-tactical)] leading-none">
                    {levelInfo.level}
                  </div>
                </div>
              </div>
            </div>

            {/* Level XP Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] text-[var(--text-dim)] font-mono">
                <span>XP PROGRESSION: <strong className="text-[var(--text-main)]">{levelInfo.currentLevelXp.toLocaleString()}</strong> / {levelInfo.nextLevelXp.toLocaleString()} XP</span>
                <span className="font-bold text-[var(--accent-target)]">{levelInfo.progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 neo-inset rounded-full overflow-hidden p-[1px]">
                <div 
                  className="h-full bg-gradient-to-r from-[var(--accent-tactical)] to-[var(--accent-target)] rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(var(--accent-tactical-rgb),0.5)]"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Upcoming Perk Teaser */}
            {levelInfo.nextRank && (
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] text-[var(--text-dim)]">
                <span>NEXT PRESTIGE TIER: <strong className="text-[var(--text-main)]">LVL {levelInfo.nextRank.minLevel} [{levelInfo.nextRank.title}]</strong></span>
                <span className="text-[var(--accent-tactical)] font-semibold">Unlocks {levelInfo.nextRank.perk}</span>
              </div>
            )}
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            
            <div className="p-3.5 rounded-2xl neo-inset flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-[var(--text-dim)] mb-1">
                <Zap className="w-3.5 h-3.5 text-[var(--accent-tactical)] shrink-0" />
                <span className="truncate">Peak Speed</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[var(--accent-tactical)] leading-none">
                {userStats.bestWpm} <span className="text-[10px] font-normal text-[var(--text-dim)]">WPM</span>
              </div>
              <div className="text-[10px] text-[var(--text-faint)] mt-2">All-time record</div>
            </div>

            <div className="p-3.5 rounded-2xl neo-inset flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-[var(--text-dim)] mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-[var(--accent-target)] shrink-0" />
                <span className="truncate">Average Speed</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[var(--accent-target)] leading-none">
                {userStats.averageWpm} <span className="text-[10px] font-normal text-[var(--text-dim)]">WPM</span>
              </div>
              <div className="text-[10px] text-[var(--text-faint)] mt-2">Rolling average</div>
            </div>

            <div className="p-3.5 rounded-2xl neo-inset flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-[var(--text-dim)] mb-1">
                <Target className="w-3.5 h-3.5 text-[var(--accent-success)] shrink-0" />
                <span className="truncate">Accuracy</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[var(--accent-success)] leading-none">
                {userStats.averageAccuracy}%
              </div>
              <div className="text-[10px] text-[var(--text-faint)] mt-2">Hit ratio</div>
            </div>

            <div className="p-3.5 rounded-2xl neo-inset flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-[var(--text-dim)] mb-1">
                <Flame className="w-3.5 h-3.5 text-[var(--accent-danger)] shrink-0" />
                <span className="truncate">Max Streak</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[var(--accent-danger)] leading-none">
                {userStats.highestStreak || 0}x
              </div>
              <div className="text-[10px] text-[var(--text-faint)] mt-2">Flawless combo</div>
            </div>

            <div className="p-3.5 rounded-2xl neo-inset flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-[var(--text-dim)] mb-1">
                <FileText className="w-3.5 h-3.5 text-[var(--text-dim)] shrink-0" />
                <span className="truncate">Words Typed</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-[var(--text-main)] leading-none">
                {userStats.totalWordsTyped.toLocaleString()}
              </div>
              <div className="text-[10px] text-[var(--text-faint)] mt-2">Verified vocabulary</div>
            </div>

            <div className="p-3.5 rounded-2xl neo-inset flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-[var(--text-dim)] mb-1">
                <Clock className="w-3.5 h-3.5 text-[var(--text-dim)] shrink-0" />
                <span className="truncate">Time Deployed</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-[var(--text-main)] leading-none">
                {totalMinutes} <span className="text-[10px] font-normal text-[var(--text-dim)]">MIN</span>
              </div>
              <div className="text-[10px] text-[var(--text-faint)] mt-2">Total session time</div>
            </div>

            <div className="p-3.5 rounded-2xl neo-inset flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-[var(--text-dim)] mb-1">
                <Award className="w-3.5 h-3.5 text-[var(--text-dim)] shrink-0" />
                <span className="truncate">Tests Finished</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-[var(--text-main)] leading-none">
                {userStats.totalTests}
              </div>
              <div className="text-[10px] text-[var(--text-faint)] mt-2">Recorded missions</div>
            </div>

            <div className="p-3.5 rounded-2xl neo-inset flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-[var(--text-dim)] mb-1">
                <Trophy className="w-3.5 h-3.5 text-[var(--accent-tactical)] shrink-0" />
                <span className="truncate">Badges Earned</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-[var(--accent-tactical)] leading-none">
                {userStats.unlockedAchievements.length}
              </div>
              <div className="text-[10px] text-[var(--text-faint)] mt-2">Objectives cleared</div>
            </div>

          </div>

          {/* Quick link to Badges Modal */}
          {onOpenAchievements && (
            <button
              onClick={() => {
                onClose();
                onOpenAchievements();
              }}
              className="w-full p-3.5 rounded-2xl neo-extruded hover:bg-[var(--bg-panel)] flex items-center justify-between text-xs font-mono transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <Trophy className="w-4 h-4 text-[var(--accent-tactical)]" />
                <span className="font-bold text-[var(--text-main)]">View Full Operational Badges Registry</span>
                <span className="text-[10px] text-[var(--text-dim)]">({userStats.unlockedAchievements.length} Unlocked)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--text-faint)] group-hover:translate-x-1 transition-transform" />
            </button>
          )}

        </div>

        {/* Footer & Reset */}
        <div className="p-4 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] flex items-center justify-between text-xs shrink-0">
          <button
            onClick={handleReset}
            className="text-[var(--accent-danger)] hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Local Stats</span>
          </button>

          <button
            onClick={onClose}
            className="tactical-keycap px-4 py-2 rounded-xl text-[var(--text-main)] bg-[var(--keycap-bg)] hover:bg-[var(--bg-input)] font-bold text-xs cursor-pointer"
          >
            CLOSE
          </button>
        </div>

      </div>
    </div>
  );
};
