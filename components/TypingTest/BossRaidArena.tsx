'use client';

import React from 'react';
import { Shield, Cpu, Flame, Crosshair } from 'lucide-react';

interface BossRaidArenaProps {
  bossHp: number;
  maxHp: number;
  timeRemaining: number;
  lastDamage: number;
  isCrit: boolean;
  comboMultiplier: number;
}

export const BossRaidArena: React.FC<BossRaidArenaProps> = ({
  bossHp,
  maxHp,
  timeRemaining,
  lastDamage,
  isCrit,
  comboMultiplier,
}) => {
  const hpPercent = Math.max(0, Math.min(100, (bossHp / maxHp) * 100));

  return (
    <div className="w-full bg-[var(--bg-panel)] border-2 border-[var(--accent-danger)]/40 rounded-lg p-3 sm:p-4 my-2 font-mono relative overflow-hidden">
      {/* Background Warning Stripes (Muted, Non-Neon) */}
      <div className="absolute top-0 right-0 left-0 h-1 bg-[repeating-linear-gradient(45deg,#ef4444,#ef4444_10px,#000_10px,#000_20px)] opacity-60" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        {/* Boss ID & Status */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded bg-[var(--bg-input)] border border-[var(--accent-danger)]/50 flex items-center justify-center text-[var(--accent-danger)] shrink-0">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="font-bold text-xs sm:text-sm text-[var(--text-main)] tracking-wider">
                SENTINEL-MK9 // ROGUE MAINFRAME
              </span>
              <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent-danger)]/20 text-[var(--accent-danger)] border border-[var(--accent-danger)]/40 uppercase font-bold shrink-0">
                BOSS RAID
              </span>
            </div>
            <div className="text-[10px] text-[var(--text-dim)] flex flex-wrap items-center gap-1.5 sm:gap-2 mt-0.5">
              <span>SECURITY THREAT: TIER 5</span>
              <span>•</span>
              <span>WEAKNESS: HIGH APM PRECISION</span>
            </div>
          </div>
        </div>

        {/* Tactical Timers & Combos */}
        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0">
          {isCrit && lastDamage > 0 && (
            <div className="flex items-center gap-1 text-[var(--accent-tactical)] animate-bounce font-bold text-xs bg-[var(--accent-tactical)]/10 px-2 py-1 rounded border border-[var(--accent-tactical)]/30">
              <Flame className="w-3.5 h-3.5" />
              <span>CRIT HIT! -{lastDamage} HP</span>
            </div>
          )}

          <div className="text-right">
            <div className="text-[10px] uppercase text-[var(--text-dim)] font-semibold">Core Overload In</div>
            <div className="text-lg font-black text-[var(--accent-danger)] leading-none">
              {timeRemaining}s
            </div>
          </div>
        </div>
      </div>

      {/* Boss Health Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] text-[var(--text-dim)]">
          <span className="flex items-center gap-1 text-[var(--accent-danger)]">
            <Shield className="w-3.5 h-3.5" />
            <span>CORE INTEGRITY</span>
          </span>
          <span className="font-bold">
            {bossHp} / {maxHp} HP ({Math.round(hpPercent)}%)
          </span>
        </div>

        <div className="relative w-full h-3.5 bg-[var(--bg-input)] rounded-full overflow-hidden border border-[var(--border-strong)]">
          <div
            className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 transition-all duration-150 rounded-full"
            style={{ width: `${hpPercent}%` }}
          />
        </div>
      </div>

      {/* Tactical Raid Hint */}
      <div className="mt-2.5 pt-2 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-[10px] text-[var(--text-dim)]">
        <span className="flex items-center gap-1">
          <Crosshair className="w-3 h-3 text-[var(--accent-tactical)] shrink-0" />
          <span>Every clean keystroke drains boss core. Mistypes reduce fire rate.</span>
        </span>
        <span className="font-bold text-[var(--accent-tactical)] shrink-0">
          COMBO DMG MULTIPLIER: {comboMultiplier}x
        </span>
      </div>
    </div>
  );
};
