'use client';

import React from 'react';
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
  CheckCircle2,
  Lock
} from 'lucide-react';
import { ACHIEVEMENTS_LIST, UserStats } from '@/lib/storage';

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

  const unlockedSet = new Set(userStats.unlockedAchievements);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'target': return <Target className="w-5 h-5" />;
      case 'crosshair': return <Crosshair className="w-5 h-5" />;
      case 'zap': return <Zap className="w-5 h-5" />;
      case 'flame': return <Flame className="w-5 h-5" />;
      case 'activity': return <Activity className="w-5 h-5" />;
      case 'shield': return <Shield className="w-5 h-5" />;
      case 'sword': return <Sword className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'text-purple-400 border-purple-500/40 bg-purple-950/20';
      case 'gold': return 'text-amber-400 border-amber-500/40 bg-amber-950/20';
      case 'silver': return 'text-slate-300 border-slate-500/40 bg-slate-900/40';
      default: return 'text-orange-400 border-orange-600/40 bg-orange-950/20';
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="achievements-modal-title"
    >
      <div className="w-full max-w-2xl bg-[var(--bg-panel)] border border-[var(--border-strong)] rounded-xl shadow-2xl overflow-hidden font-mono animate-modal">
        
        {/* Header */}
        <div className="p-3 sm:p-4 border-b border-[var(--border-subtle)] flex items-center justify-between gap-2 bg-[var(--bg-surface)]">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded bg-[var(--keycap-bg)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--accent-tactical)] shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 id="achievements-modal-title" className="text-xs sm:text-sm font-bold text-[var(--text-main)] truncate">
                OPERATIONAL BADGES & RECOGNITION
              </h2>
              <div className="text-[11px] text-[var(--text-dim)] truncate">
                {unlockedSet.size} of {ACHIEVEMENTS_LIST.length} OBJECTIVES UNLOCKED
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-input)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="p-3 sm:p-4 max-h-[75vh] overflow-y-auto space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {ACHIEVEMENTS_LIST.map((ach) => {
              const isUnlocked = unlockedSet.has(ach.id);
              const tierBadge = getTierColor(ach.tier);

              return (
                <div
                  key={ach.id}
                  className={`p-3 rounded-lg border transition-all ${
                    isUnlocked
                      ? 'bg-[var(--bg-surface)] border-[var(--border-strong)]'
                      : 'bg-[var(--bg-input)]/50 border-[var(--border-subtle)] opacity-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded flex items-center justify-center border shrink-0 ${
                        isUnlocked ? tierBadge : 'border-slate-800 text-slate-700 bg-slate-900/20'
                      }`}
                    >
                      {isUnlocked ? getIcon(ach.icon) : <Lock className="w-4 h-4" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-bold text-xs text-[var(--text-main)] truncate">
                          {ach.title}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded border text-[var(--text-dim)] shrink-0">
                          {ach.codename}
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--text-dim)] leading-tight">
                        {ach.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-[9px]">
                        <span className="capitalize text-[var(--text-faint)]">{ach.tier} Tier</span>
                        {isUnlocked ? (
                          <span className="text-[var(--accent-success)] flex items-center gap-1 font-bold">
                            <CheckCircle2 className="w-3 h-3" /> UNLOCKED
                          </span>
                        ) : (
                          <span className="text-[var(--text-faint)]">CLASSIFIED</span>
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
        <div className="p-3 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] text-[10px] text-center text-[var(--text-faint)]">
          Badges persist locally in your browser. Complete tests across all modes to unlock the full registry.
        </div>

      </div>
    </div>
  );
};
