'use client';

import React from 'react';
import { Gauge } from 'lucide-react';

interface PacingGhostBarProps {
  progressPercent: number; // 0 to 100
  currentWpm: number;
  targetWpm: number;
  bestWpm: number;
  isActive: boolean;
}

export const PacingGhostBar: React.FC<PacingGhostBarProps> = ({
  progressPercent,
  currentWpm,
  targetWpm,
  bestWpm,
  isActive,
}) => {
  // If no target WPM is set and no best WPM, don't show the ghost race
  if (targetWpm === 0 && bestWpm === 0) return null;

  // Calculate simulated progress of target ghost based on expected pace
  // Clamp progress between 0 and 100
  const playerPercent = Math.min(100, Math.max(0, progressPercent));
  
  // Calculate relative delta
  const benchmarkWpm = targetWpm > 0 ? targetWpm : bestWpm;
  const delta = currentWpm - benchmarkWpm;
  const isAhead = delta >= 0;

  return (
    <div className="w-full bg-[var(--bg-panel)]/80 border border-[var(--border-subtle)] rounded-lg p-2.5 font-mono text-xs my-2">
      {/* Header Telemetry */}
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 items-start sm:items-center justify-between mb-2">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1.5 text-[var(--accent-target)] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider">
            <Gauge className="w-3.5 h-3.5" />
            <span>TAC_PACER // VELOCITY GHOST</span>
          </div>
          {isActive && benchmarkWpm > 0 && (
            <span
              className={`px-1.5 py-0.2 rounded text-[9px] sm:text-[10px] font-bold ${
                isAhead
                  ? 'bg-[var(--accent-success)]/20 text-[var(--accent-success)] border border-[var(--accent-success)]/30'
                  : 'bg-[var(--accent-danger)]/20 text-[var(--accent-danger)] border border-[var(--accent-danger)]/30'
              }`}
            >
              {isAhead ? `+${delta} WPM AHEAD` : `${delta} WPM BEHIND`}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-[var(--text-dim)]">
          {targetWpm > 0 && (
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-target)]" />
              <span>Target: <strong className="text-[var(--text-main)]">{targetWpm} WPM</strong></span>
            </div>
          )}
          {bestWpm > 0 && (
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-tactical)]" />
              <span>PB: <strong className="text-[var(--text-main)]">{bestWpm} WPM</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Race Track */}
      <div className="relative w-full h-4 bg-[var(--bg-input)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
        {/* Track Grid Lines */}
        <div className="absolute inset-0 grid grid-cols-4 opacity-15 pointer-events-none">
          <div className="border-r border-[var(--text-main)]" />
          <div className="border-r border-[var(--text-main)]" />
          <div className="border-r border-[var(--text-main)]" />
          <div />
        </div>

        {/* Player Progress Bar */}
        <div
          className="h-full bg-[var(--accent-tactical)] transition-all duration-150 relative"
          style={{ width: `${playerPercent}%` }}
        >
          {/* Leading Beacon */}
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-white" />
        </div>

        {/* Target Ghost Marker */}
        {targetWpm > 0 && (
          <div
            className="absolute top-0 bottom-0 w-1.5 bg-[var(--accent-target)] z-10 transition-all duration-300"
            style={{
              left: `${Math.min(99, Math.max(1, (playerPercent * (targetWpm / Math.max(1, currentWpm || targetWpm)))))}%`,
            }}
            title={`Target Ghost: ${targetWpm} WPM`}
          />
        )}
      </div>

      {/* Track Footnote */}
      <div className="flex items-center justify-between text-[10px] text-[var(--text-faint)] mt-1 px-1">
        <span>0% DISPATCH</span>
        <span className="font-bold text-[var(--text-dim)]">
          PLAYER: {currentWpm} WPM ({Math.round(playerPercent)}%)
        </span>
        <span>100% OBJECTIVE</span>
      </div>
    </div>
  );
};
