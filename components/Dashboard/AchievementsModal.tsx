'use client';

import React, { useState } from 'react';
import { 
  Trophy, 
  X, 
  Target, 
  Crosshair, 
  Zap, 
  Flame, 
  Activity, 
  Shield, 
  Sword, 
  Award,
  Clock,
  Sparkles,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { getAchievementsWithProgress, UserStats } from '@/lib/storage';
import { AchievementCategory, AchievementTier } from '@/lib/types';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStats: UserStats;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  userStats,
}) => {
  const [activeCategory, setActiveCategory] = useState<AchievementCategory | 'all'>('all');

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

  const achievementsWithProgress = getAchievementsWithProgress(userStats);
  const totalAchievements = achievementsWithProgress.length;
  const unlockedCount = achievementsWithProgress.filter((a) => a.unlocked).length;
  const totalXpAvailable = achievementsWithProgress.reduce((acc, a) => acc + a.xpReward, 0);
  const unlockedXp = achievementsWithProgress
    .filter((a) => a.unlocked)
    .reduce((acc, a) => acc + a.xpReward, 0);

  const categories: { id: AchievementCategory | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'ALL OBJECTIVES', count: totalAchievements },
    { id: 'speed', label: 'SPEED', count: achievementsWithProgress.filter((a) => a.category === 'speed').length },
    { id: 'precision', label: 'PRECISION', count: achievementsWithProgress.filter((a) => a.category === 'precision').length },
    { id: 'endurance', label: 'ENDURANCE', count: achievementsWithProgress.filter((a) => a.category === 'endurance').length },
    { id: 'arcade', label: 'ARCADE & RAIDS', count: achievementsWithProgress.filter((a) => a.category === 'arcade').length },
    { id: 'career', label: 'CAREER', count: achievementsWithProgress.filter((a) => a.category === 'career').length },
  ];

  const filteredAchievements = activeCategory === 'all'
    ? achievementsWithProgress
    : achievementsWithProgress.filter((a) => a.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'target': return <Target className="w-5 h-5" />;
      case 'crosshair': return <Crosshair className="w-5 h-5" />;
      case 'zap': return <Zap className="w-5 h-5" />;
      case 'flame': return <Flame className="w-5 h-5" />;
      case 'activity': return <Activity className="w-5 h-5" />;
      case 'shield': return <Shield className="w-5 h-5" />;
      case 'sword': return <Sword className="w-5 h-5" />;
      case 'clock': return <Clock className="w-5 h-5" />;
      case 'sparkles': return <Sparkles className="w-5 h-5" />;
      case 'trophy': return <Trophy className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  const getTierStyles = (tier: AchievementTier) => {
    switch (tier) {
      case 'mythic':
        return {
          badge: 'text-sky-300 border-sky-400/50 bg-sky-950/30 shadow-[0_0_12px_rgba(56,189,248,0.25)]',
          pill: 'text-sky-300 border-sky-400/30 bg-sky-950/40',
        };
      case 'platinum':
        return {
          badge: 'text-purple-400 border-purple-500/50 bg-purple-950/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]',
          pill: 'text-purple-400 border-purple-500/30 bg-purple-950/40',
        };
      case 'gold':
        return {
          badge: 'text-amber-400 border-amber-500/50 bg-amber-950/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]',
          pill: 'text-amber-400 border-amber-500/30 bg-amber-950/40',
        };
      case 'silver':
        return {
          badge: 'text-slate-300 border-slate-400/40 bg-slate-900/40',
          pill: 'text-slate-300 border-slate-400/30 bg-slate-900/40',
        };
      default:
        return {
          badge: 'text-amber-600 border-amber-700/40 bg-amber-950/20',
          pill: 'text-amber-600 border-amber-700/30 bg-amber-950/30',
        };
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
      aria-labelledby="achievements-modal-title"
    >
      <div className="w-full max-w-3xl rounded-3xl neo-extruded shadow-2xl overflow-hidden font-mono animate-modal flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--border-subtle)] flex items-center justify-between gap-3 bg-[var(--bg-surface)] shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl neo-inset flex items-center justify-center text-[var(--accent-tactical)] shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 id="achievements-modal-title" className="text-xs sm:text-sm md:text-base font-black text-[var(--text-main)] tracking-wider truncate">
                  OPERATIONAL BADGES & REGISTRY
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] neo-inset font-bold text-[var(--accent-target)]">
                  {Math.round((unlockedCount / totalAchievements) * 100)}% COMPLETE
                </span>
              </div>
              <div className="text-[11px] text-[var(--text-dim)] flex items-center gap-2 mt-0.5">
                <span>{unlockedCount} / {totalAchievements} Unlocked</span>
                <span>•</span>
                <span className="text-[var(--accent-tactical)] font-bold">{unlockedXp.toLocaleString()} / {totalXpAvailable.toLocaleString()} XP Earned</span>
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

        {/* Category Tabs Filter Bar */}
        <div className="px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-panel)]/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold tracking-wider shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-[var(--accent-tactical)] text-[var(--bg-page)] shadow-[0_0_12px_rgba(var(--accent-tactical-rgb),0.35)]'
                  : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] neo-inset'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[9px] ${activeCategory === cat.id ? 'bg-black/20 text-white' : 'text-[var(--text-faint)]'}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Badges Grid with Live Progress */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
            {filteredAchievements.map((ach) => {
              const tierStyles = getTierStyles(ach.tier);
              const progressCurrent = ach.progress?.current ?? 0;
              const progressMax = ach.progress?.max ?? 1;
              const progressRatio = Math.min(100, Math.round((progressCurrent / progressMax) * 100));

              return (
                <div
                  key={ach.id}
                  className={`p-4 rounded-2xl transition-all relative overflow-hidden flex flex-col justify-between ${
                    ach.unlocked
                      ? 'neo-inset border border-[var(--border-subtle)] bg-[var(--bg-input)]/60'
                      : 'bg-[var(--bg-input)]/25 border border-[var(--border-subtle)] opacity-75 hover:opacity-95'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Badge Icon */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 transition-transform ${
                        ach.unlocked ? tierStyles.badge : 'border-slate-800 text-slate-700 bg-slate-900/30'
                      }`}
                    >
                      {ach.unlocked ? getIcon(ach.icon) : <Lock className="w-4 h-4" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5 mb-1">
                        <span className="font-bold text-xs sm:text-sm text-[var(--text-main)] truncate">
                          {ach.title}
                        </span>
                        <span className="text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded border text-[var(--text-faint)] border-[var(--border-subtle)] shrink-0 uppercase">
                          {ach.codename}
                        </span>
                      </div>

                      <p className="text-[11px] text-[var(--text-dim)] leading-snug">
                        {ach.description}
                      </p>

                      {/* Live Progress Bar for Locked Objectives */}
                      {!ach.unlocked && ach.progress && ach.progress.max > 1 && (
                        <div className="mt-2.5 space-y-1">
                          <div className="flex items-center justify-between text-[9px] text-[var(--text-faint)] font-bold">
                            <span>PROGRESS: {progressCurrent.toLocaleString()} / {progressMax.toLocaleString()} {ach.progress.unit}</span>
                            <span>{progressRatio}%</span>
                          </div>
                          <div className="w-full h-1.5 neo-inset rounded-full overflow-hidden p-[1px]">
                            <div 
                              className="h-full bg-[var(--accent-target)] rounded-full transition-all duration-300"
                              style={{ width: `${progressRatio}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="mt-2.5 flex items-center justify-between text-[10px] pt-1 border-t border-[var(--border-subtle)]/60">
                        <div className="flex items-center gap-1.5">
                          <span className={`capitalize text-[9px] font-bold px-1.5 py-0.5 rounded border ${tierStyles.pill}`}>
                            {ach.tier}
                          </span>
                          <span className="text-[var(--accent-tactical)] font-bold text-[10px]">
                            +{ach.xpReward} XP
                          </span>
                        </div>

                        {ach.unlocked ? (
                          <span className="text-[var(--accent-success)] flex items-center gap-1 font-bold text-[10px]">
                            <CheckCircle2 className="w-3 h-3" /> UNLOCKED
                          </span>
                        ) : (
                          <span className="text-[var(--text-faint)] text-[9px] font-semibold">
                            CLASSIFIED
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] text-[10px] text-center text-[var(--text-dim)] flex flex-wrap items-center justify-between px-5 gap-2 shrink-0">
          <span>🎮 Operative Gamerscore: {unlockedXp.toLocaleString()} XP</span>
          <span>Badges and milestones save automatically to browser telemetry</span>
        </div>

      </div>
    </div>
  );
};
