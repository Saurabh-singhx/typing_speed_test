'use client';

import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  Share2, 
  CheckCircle2, 
  AlertCircle, 
  Flame, 
  Zap, 
  Target, 
  Activity, 
  Clock,
  Sparkles,
  Download,
  Copy,
  Check
} from 'lucide-react';
import { TestResult, Achievement } from '@/lib/types';
import { UserStats, getRankTitle, calculateLevel } from '@/lib/storage';

interface TestResultsProps {
  result: TestResult;
  userStats: UserStats;
  newAchievements: Achievement[];
  onRestart: () => void;
}

export const TestResults: React.FC<TestResultsProps> = ({
  result,
  userStats,
  newAchievements,
  onRestart,
}) => {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isPersonalBest = result.wpm >= userStats.bestWpm && userStats.bestWpm > 0;
  const rank = getRankTitle(result.wpm);
  const levelInfo = calculateLevel(userStats.xp);

  // Trigger celebration confetti for achievements or high WPM
  useEffect(() => {
    if (isPersonalBest || result.wpm >= 100 || newAchievements.length > 0) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#eab308', '#38bdf8', '#22c55e', '#f97316'],
      });
    }
  }, [isPersonalBest, result.wpm, newAchievements]);

  // Handle Copy Scorecard Text
  const handleCopyScorecard = () => {
    const text = `🎯 KEYOPS TACTICAL TYPING REPORT 🎯
⚡ WPM: ${result.wpm} (Raw: ${result.rawWpm})
🎯 Accuracy: ${result.accuracy}%
🔥 Streak: ${result.highestStreak}x Keystroke Flow
🎖️ Rank: ${rank.title} [${rank.badge}]
⏱️ Mode: ${result.settingsSnapshot}
Benchmark your tactical typing at: https://keyops-typing.vercel.app`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Generate and download a canvas image card
  const handleDownloadScorecard = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#0a0d14';
    ctx.fillRect(0, 0, 1200, 630);

    // Subtle grid
    ctx.strokeStyle = '#162030';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1200; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 630);
      ctx.stroke();
    }
    for (let y = 0; y < 630; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1200, y);
      ctx.stroke();
    }

    // Border
    ctx.strokeStyle = '#33445e';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 1160, 590);

    // Header Tag
    ctx.fillStyle = '#eab308';
    ctx.font = 'bold 20px monospace';
    ctx.fillText('KEYOPS // TACTICAL APM BENCHMARK REPORT', 50, 70);

    // WPM Huge
    ctx.fillStyle = '#eab308';
    ctx.font = 'bold 130px monospace';
    ctx.fillText(`${result.wpm}`, 50, 210);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '24px monospace';
    ctx.fillText('WORDS PER MINUTE', 50, 250);

    // Metrics Columns
    ctx.fillStyle = '#f1f5f9';
    ctx.font = 'bold 50px monospace';
    ctx.fillText(`${result.accuracy}%`, 450, 180);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '18px monospace';
    ctx.fillText('ACCURACY', 450, 220);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 50px monospace';
    ctx.fillText(`${result.rawWpm}`, 700, 180);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '18px monospace';
    ctx.fillText('RAW WPM', 700, 220);

    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 50px monospace';
    ctx.fillText(`${result.consistency}%`, 950, 180);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '18px monospace';
    ctx.fillText('CONSISTENCY', 950, 220);

    // Rank Banner
    ctx.fillStyle = '#162030';
    ctx.fillRect(50, 310, 1100, 130);
    ctx.strokeStyle = '#202b3d';
    ctx.strokeRect(50, 310, 1100, 130);

    ctx.fillStyle = '#f1f5f9';
    ctx.font = 'bold 36px monospace';
    ctx.fillText(`OPERATOR RANK: ${rank.title.toUpperCase()}`, 80, 370);

    ctx.fillStyle = '#eab308';
    ctx.font = '20px monospace';
    ctx.fillText(`Mode: ${result.settingsSnapshot}  •  Streak: ${result.highestStreak}x  •  Chars: ${result.correctChars}/${result.incorrectChars}`, 80, 410);

    // Footer
    ctx.fillStyle = '#475569';
    ctx.font = '16px monospace';
    ctx.fillText('Tested on KEYOPS Tactical Typing Lab • Pure Precision, No Glare', 50, 560);

    const link = document.createElement('a');
    link.download = `KEYOPS_WPM_${result.wpm}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Prepare chart points
  const points = result.chartData;
  const maxWpmInChart = Math.max(80, ...points.map((p) => Math.max(p.wpm, p.rawWpm)));
  const chartHeight = 160;
  const chartWidth = 700;

  // SVG polyline coordinates
  const wpmPointsStr = points
    .map((p, i) => {
      const x = (i / Math.max(1, points.length - 1)) * chartWidth;
      const y = chartHeight - (p.wpm / maxWpmInChart) * (chartHeight - 20) - 10;
      return `${x},${y}`;
    })
    .join(' ');

  const rawPointsStr = points
    .map((p, i) => {
      const x = (i / Math.max(1, points.length - 1)) * chartWidth;
      const y = chartHeight - (p.rawWpm / maxWpmInChart) * (chartHeight - 20) - 10;
      return `${x},${y}`;
    })
    .join(' ');

  const missedKeys = Object.entries(result.missedKeysMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 font-mono animate-fadeIn">
      
      {/* Top Banner Alert if Personal Best or Achievements */}
      {isPersonalBest && (
        <div className="p-3 rounded-lg bg-[var(--accent-tactical)]/10 border border-[var(--accent-tactical)]/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[var(--accent-tactical)] text-sm font-bold">
            <Trophy className="w-4 h-4" />
            <span>NEW PERSONAL RECORD DETECTED: {result.wpm} WPM!</span>
          </div>
          <span className="text-xs text-[var(--text-dim)]">PREVIOUS: {userStats.bestWpm} WPM</span>
        </div>
      )}

      {newAchievements.length > 0 && (
        <div className="p-3 rounded-lg bg-[var(--accent-success)]/10 border border-[var(--accent-success)]/40 space-y-1">
          <div className="flex items-center gap-2 text-[var(--accent-success)] text-sm font-bold">
            <Sparkles className="w-4 h-4" />
            <span>TACTICAL BADGE UNLOCKED!</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {newAchievements.map((ach) => (
              <span
                key={ach.id}
                className="px-2 py-0.5 rounded bg-[var(--bg-input)] border border-[var(--accent-success)]/40 text-xs text-[var(--accent-success)] font-bold flex items-center gap-1"
              >
                ★ {ach.title} ({ach.codename})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Main Tactical Stats Panel */}
      <div className="bg-[var(--bg-panel)] border border-[var(--border-strong)] rounded-xl p-6 shadow-xl relative overflow-hidden">
        
        {/* Subtle HUD Grid Overlay */}
        <div className="absolute top-0 right-0 p-4 text-[10px] text-[var(--text-faint)] uppercase tracking-widest pointer-events-none">
          SEC_CODE: {result.id.slice(0, 8)} // APM VALIDATED
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end pb-6 border-b border-[var(--border-subtle)]">
          
          {/* Hero WPM */}
          <div className="md:col-span-1">
            <div className="text-xs uppercase tracking-wider text-[var(--text-dim)] mb-1 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[var(--accent-tactical)]" />
              <span>Net Speed</span>
            </div>
            <div className="text-6xl sm:text-7xl font-black text-[var(--accent-tactical)] leading-none">
              {result.wpm}
            </div>
            <div className="text-xs text-[var(--text-faint)] mt-2 font-bold tracking-widest">
              WORDS PER MINUTE
            </div>
          </div>

          {/* Accuracy */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--text-dim)] mb-1 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[var(--accent-success)]" />
              <span>Accuracy</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-[var(--text-main)] leading-none">
              {result.accuracy}%
            </div>
            <div className="text-xs text-[var(--text-faint)] mt-2">
              {result.correctChars} hits / {result.incorrectChars} misses
            </div>
          </div>

          {/* Raw WPM */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--text-dim)] mb-1 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[var(--accent-target)]" />
              <span>Raw Speed</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-[var(--accent-target)] leading-none">
              {result.rawWpm}
            </div>
            <div className="text-xs text-[var(--text-faint)] mt-2">
              Unadjusted cadence
            </div>
          </div>

          {/* Consistency & Streak */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--text-dim)] mb-1 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[var(--accent-streak)]" />
              <span>Flow Streak</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-[var(--accent-streak)] leading-none">
              {result.highestStreak}x
            </div>
            <div className="text-xs text-[var(--text-faint)] mt-2">
              Consistency: {result.consistency}%
            </div>
          </div>

        </div>

        {/* Secondary Telemetry: SVG Performance Timeline Chart */}
        <div className="py-4">
          <div className="flex items-center justify-between text-xs text-[var(--text-dim)] mb-2">
            <span className="font-bold flex items-center gap-2">
              <span>CADENCE TIMELINE</span>
              <span className="flex items-center gap-1 text-[10px] text-[var(--accent-tactical)]">
                <span className="w-2 h-0.5 bg-[var(--accent-tactical)] inline-block" /> Net WPM
              </span>
              <span className="flex items-center gap-1 text-[10px] text-[var(--accent-target)]">
                <span className="w-2 h-0.5 bg-[var(--accent-target)] inline-block" /> Raw WPM
              </span>
            </span>
            <span className="text-[10px] text-[var(--text-faint)]">
              Max Peak: {maxWpmInChart} WPM
            </span>
          </div>

          <div className="w-full bg-[var(--bg-input)] rounded-lg p-2 border border-[var(--border-subtle)] overflow-hidden">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-36 overflow-visible"
              preserveAspectRatio="none"
            >
              {/* Horizontal Reference Lines */}
              <line x1="0" y1={chartHeight / 2} x2={chartWidth} y2={chartHeight / 2} stroke="var(--border-subtle)" strokeDasharray="3,3" />
              <line x1="0" y1="10" x2={chartWidth} y2="10" stroke="var(--border-subtle)" strokeDasharray="3,3" />

              {/* Raw WPM Line */}
              <polyline
                fill="none"
                stroke="var(--accent-target)"
                strokeWidth="2"
                strokeOpacity="0.5"
                points={rawPointsStr}
              />

              {/* Net WPM Line */}
              <polyline
                fill="none"
                stroke="var(--accent-tactical)"
                strokeWidth="2.5"
                points={wpmPointsStr}
              />

              {/* Error Indicators */}
              {points.map((p, i) => {
                if (p.errors > 0) {
                  const x = (i / Math.max(1, points.length - 1)) * chartWidth;
                  const y = chartHeight - (p.wpm / maxWpmInChart) * (chartHeight - 20) - 10;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="var(--accent-danger)"
                      stroke="var(--bg-page)"
                      strokeWidth="1.5"
                    >
                      <title>{p.errors} typo(s) at {p.second}s</title>
                    </circle>
                  );
                }
                return null;
              })}
            </svg>
          </div>
        </div>

        {/* Tactical Key Heatmap / Weakness Analysis */}
        {missedKeys.length > 0 && (
          <div className="pt-3 border-t border-[var(--border-subtle)]">
            <div className="text-xs uppercase tracking-wider text-[var(--text-dim)] mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-[var(--accent-danger)]" />
              <span>Finger Weakness Telemetry (Missed Keys)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {missedKeys.map(([key, count]) => (
                <div
                  key={key}
                  className="px-2.5 py-1 rounded bg-[var(--bg-input)] border border-[var(--border-strong)] flex items-center gap-2 text-xs"
                >
                  <span className="font-mono font-bold text-[var(--accent-tactical)] px-1.5 py-0.5 rounded bg-[var(--keycap-bg)] border border-[var(--border-subtle)]">
                    {key === ' ' ? 'SPACE' : key}
                  </span>
                  <span className="text-[var(--accent-danger)] font-bold">{count}x miss</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mission Details & XP Reward Bar */}
        <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--text-dim)]">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-[var(--text-faint)]">MISSION:</span>{' '}
              <span className="text-[var(--text-main)] uppercase">{result.settingsSnapshot}</span>
            </div>
            <div>
              <span className="text-[var(--text-faint)]">TIME:</span>{' '}
              <span className="text-[var(--text-main)]">{result.duration}s</span>
            </div>
            <div>
              <span className="text-[var(--text-faint)]">CHARS:</span>{' '}
              <span className="text-[var(--accent-success)]">{result.correctChars}</span> /{' '}
              <span className="text-[var(--accent-danger)]">{result.incorrectChars}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[var(--text-faint)]">XP REWARD:</span>
            <span className="px-2 py-0.5 rounded bg-[var(--accent-tactical)]/15 text-[var(--accent-tactical)] font-bold border border-[var(--accent-tactical)]/30">
              +{result.xpEarned} XP
            </span>
          </div>
        </div>

      </div>

      {/* Action Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        
        {/* Next Mission / Restart CTA */}
        <button
          onClick={onRestart}
          className="tactical-keycap px-6 py-3 rounded-lg text-sm font-bold font-mono text-[var(--bg-page)] bg-[var(--accent-tactical)] hover:brightness-110 flex items-center gap-2 shadow-md transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>RETRY MISSION</span>
          <span className="text-[10px] opacity-75 font-normal px-1.5 py-0.5 rounded bg-black/20">
            Tab + Enter
          </span>
        </button>

        {/* Share & Download Buttons */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={handleCopyScorecard}
            className="tactical-keycap px-3.5 py-2.5 rounded-lg text-xs font-mono text-[var(--text-main)] hover:bg-[var(--bg-input)] flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[var(--accent-success)]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED TO CLIPBOARD!' : 'COPY SCORECARD'}</span>
          </button>

          <button
            onClick={handleDownloadScorecard}
            className="tactical-keycap px-3.5 py-2.5 rounded-lg text-xs font-mono text-[var(--accent-target)] hover:bg-[var(--bg-input)] flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT PNG</span>
          </button>

        </div>

      </div>

    </div>
  );
};
