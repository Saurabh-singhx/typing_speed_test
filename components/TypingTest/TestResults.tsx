'use client';

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  AlertCircle, 
  Flame, 
  Zap, 
  Target, 
  Activity, 
  Sparkles,
  Download,
  Copy,
  Check
} from 'lucide-react';
import { TestResult, Achievement } from '@/lib/types';
import { UserStats, getRankTitle } from '@/lib/storage';

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
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const isPersonalBest = result.wpm >= userStats.bestWpm && userStats.bestWpm > 0;
  const rank = getRankTitle(result.wpm);

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

  // Instant keyboard restart shortcut (Enter, Tab, or Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        onRestart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRestart]);

  // Handle Copy Scorecard Text
  const handleCopyScorecard = () => {
    const text = `🎯 TYPETRACK TACTICAL TYPING REPORT 🎯
⚡ WPM: ${result.wpm} (Raw: ${result.rawWpm})
🎯 Accuracy: ${result.accuracy}%
🔥 Streak: ${result.highestStreak}x Keystroke Flow
🎖️ Rank: ${rank.title} [${rank.badge}]
⏱️ Mode: ${result.settingsSnapshot}
Benchmark your typing speed at: https://typetrack.saurabhx.site`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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

  // Cross-browser canvas rounded rect helper
  const drawRoundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    if (typeof ctx.roundRect === 'function') {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
    } else {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }
  };

  // Generate and download/share an exact 1:1 Neomorphic Canvas Scorecard
  const handleDownloadScorecard = async () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 700;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsExporting(false);
        return;
      }

      // Read current computed theme colors or fallback to Neomorphism palette
      const rootStyles = typeof window !== 'undefined' ? getComputedStyle(document.documentElement) : null;
      const getVar = (name: string, fallback: string) =>
        rootStyles ? (rootStyles.getPropertyValue(name).trim() || fallback) : fallback;

      const bgPage = getVar('--bg-page', '#191c24');
      const bgPanel = getVar('--bg-panel', '#232836');
      const bgInput = getVar('--bg-input', '#171a22');
      const textMain = getVar('--text-main', '#f8fafc');
      const textDim = getVar('--text-dim', '#94a3b8');
      const textFaint = getVar('--text-faint', '#64748b');
      const accentTactical = getVar('--accent-tactical', '#6366f1');
      const accentTarget = getVar('--accent-target', '#38bdf8');
      const accentSuccess = getVar('--accent-success', '#10b981');
      const accentDanger = getVar('--accent-danger', '#f43f5e');
      const accentStreak = getVar('--accent-streak', '#f59e0b');
      const borderSubtle = getVar('--border-subtle', 'rgba(255, 255, 255, 0.06)');

      // 1. Overall Dark Background (matching app page)
      ctx.fillStyle = bgPage;
      ctx.fillRect(0, 0, 1200, 700);

      // Soft ambient radial glow
      const bgGlow = ctx.createRadialGradient(600, 350, 40, 600, 350, 580);
      bgGlow.addColorStop(0, 'rgba(99, 102, 241, 0.08)');
      bgGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, 1200, 700);

      // 2. Main Neomorphic Scorecard Extruded Panel (x: 40, y: 30, w: 1120, h: 640)
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
      ctx.shadowBlur = 28;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 12;
      drawRoundRect(ctx, 40, 30, 1120, 640, 24);
      ctx.fillStyle = bgPanel;
      ctx.fill();
      ctx.restore();

      // Card subtle border
      drawRoundRect(ctx, 40, 30, 1120, 640, 24);
      ctx.strokeStyle = borderSubtle;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 3. Scorecard Header Bar
      // Amber/Tactical Status Dot
      ctx.save();
      ctx.shadowColor = accentTactical;
      ctx.shadowBlur = 8;
      ctx.fillStyle = accentTactical;
      ctx.beginPath();
      ctx.arc(74, 65, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Title: PERFORMANCE SCORECARD
      ctx.fillStyle = textMain;
      ctx.font = 'bold 15px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      ctx.fillText('PERFORMANCE SCORECARD', 90, 70);

      // Mode Pill
      const modeText = `${result.mode.toUpperCase()} MODE`;
      ctx.font = 'bold 11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      const modeW = ctx.measureText(modeText).width;
      drawRoundRect(ctx, 335, 54, modeW + 18, 22, 11);
      ctx.fillStyle = bgInput;
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = accentTarget;
      ctx.fillText(modeText, 344, 69);

      // Right Header Info: SEC_CODE & APM VALIDATED
      ctx.font = '12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      ctx.fillStyle = textDim;
      ctx.fillText('SEC_CODE: ', 850, 70);
      ctx.fillStyle = textMain;
      ctx.font = 'bold 12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      ctx.fillText(result.id.slice(0, 8), 925, 70);

      ctx.fillStyle = textFaint;
      ctx.fillText('•', 995, 70);

      // Glowing Green APM Dot & Label
      ctx.save();
      ctx.shadowColor = accentSuccess;
      ctx.shadowBlur = 8;
      ctx.fillStyle = accentSuccess;
      ctx.beginPath();
      ctx.arc(1012, 65, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = accentSuccess;
      ctx.font = 'bold 12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      ctx.fillText('APM VALIDATED', 1022, 70);

      // Header Bottom Divider
      ctx.strokeStyle = borderSubtle;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(65, 92);
      ctx.lineTo(1135, 92);
      ctx.stroke();

      // 4. The 4 Metric Inset Tiles
      const tileY = 110;
      const tileH = 120;
      const tileW = 250;
      const tileGap = 23;
      const startX = 65;

      const metricTiles = [
        {
          icon: '⚡',
          label: 'NET SPEED',
          value: `${result.wpm}`,
          color: accentTactical,
          sub: 'WORDS PER MINUTE',
        },
        {
          icon: '🎯',
          label: 'ACCURACY',
          value: `${result.accuracy}%`,
          color: textMain,
          sub: `${result.correctChars} hits / ${result.incorrectChars} misses`,
        },
        {
          icon: '📊',
          label: 'RAW SPEED',
          value: `${result.rawWpm}`,
          color: accentTarget,
          sub: 'Unadjusted cadence',
        },
        {
          icon: '🔥',
          label: 'FLOW STREAK',
          value: `${result.highestStreak}x`,
          color: accentStreak,
          sub: `Consistency: ${result.consistency}%`,
        },
      ];

      metricTiles.forEach((t, i) => {
        const tx = startX + i * (tileW + tileGap);
        drawRoundRect(ctx, tx, tileY, tileW, tileH, 16);
        ctx.fillStyle = bgInput;
        ctx.fill();
        ctx.strokeStyle = borderSubtle;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label
        ctx.fillStyle = textDim;
        ctx.font = 'bold 11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
        ctx.fillText(`${t.icon} ${t.label}`, tx + 16, tileY + 26);

        // Value
        ctx.fillStyle = t.color;
        ctx.font = '900 44px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
        ctx.fillText(t.value, tx + 16, tileY + 78);

        // Subtitle
        ctx.fillStyle = textFaint;
        ctx.font = 'bold 11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
        ctx.fillText(t.sub, tx + 16, tileY + 105);
      });

      // 5. Cadence Timeline Curve Chart
      ctx.fillStyle = textDim;
      ctx.font = 'bold 12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      ctx.fillText('CADENCE TIMELINE', 65, 256);

      // Legend Net WPM
      ctx.fillStyle = accentTactical;
      ctx.fillRect(215, 249, 14, 3);
      ctx.fillStyle = accentTactical;
      ctx.font = 'bold 11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      ctx.fillText('Net WPM', 235, 256);

      // Legend Raw WPM
      ctx.fillStyle = accentTarget;
      ctx.fillRect(315, 249, 14, 3);
      ctx.fillStyle = accentTarget;
      ctx.font = 'bold 11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      ctx.fillText('Raw WPM', 335, 256);

      // Max Peak
      ctx.fillStyle = textFaint;
      ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      const peakText = `Max Peak: ${maxWpmInChart} WPM`;
      ctx.fillText(peakText, 1135 - ctx.measureText(peakText).width, 256);

      // Inset Chart Box
      const chartX = 65;
      const chartY = 270;
      const chartW = 1070;
      const chartH = 160;
      drawRoundRect(ctx, chartX, chartY, chartW, chartH, 16);
      ctx.fillStyle = bgInput;
      ctx.fill();
      ctx.strokeStyle = borderSubtle;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Reference Grid Lines
      ctx.strokeStyle = borderSubtle;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);

      // Midline
      ctx.beginPath();
      ctx.moveTo(chartX + 15, chartY + chartH / 2);
      ctx.lineTo(chartX + chartW - 15, chartY + chartH / 2);
      ctx.stroke();

      // Topline
      ctx.beginPath();
      ctx.moveTo(chartX + 15, chartY + 22);
      ctx.lineTo(chartX + chartW - 15, chartY + 22);
      ctx.stroke();
      ctx.setLineDash([]); // Reset dashed

      // Draw Timeline Points
      if (points.length > 0) {
        const plotX = chartX + 24;
        const plotY = chartY + 16;
        const plotW = chartW - 48;
        const plotH = chartH - 32;

        const getPointX = (idx: number) => plotX + (idx / Math.max(1, points.length - 1)) * plotW;
        const getPointY = (val: number) => plotY + plotH - (val / maxWpmInChart) * (plotH - 10);

        // Area Gradient under Net WPM
        const areaGrad = ctx.createLinearGradient(0, plotY, 0, plotY + plotH);
        areaGrad.addColorStop(0, 'rgba(99, 102, 241, 0.25)');
        areaGrad.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

        ctx.beginPath();
        ctx.moveTo(getPointX(0), plotY + plotH);
        points.forEach((p, i) => {
          ctx.lineTo(getPointX(i), getPointY(p.wpm));
        });
        ctx.lineTo(getPointX(points.length - 1), plotY + plotH);
        ctx.closePath();
        ctx.fillStyle = areaGrad;
        ctx.fill();

        // Raw WPM Polyline
        ctx.beginPath();
        points.forEach((p, i) => {
          const px = getPointX(i);
          const py = getPointY(p.rawWpm);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.strokeStyle = accentTarget;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Net WPM Polyline with soft glow
        ctx.save();
        ctx.shadowColor = accentTactical;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        points.forEach((p, i) => {
          const px = getPointX(i);
          const py = getPointY(p.wpm);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.strokeStyle = accentTactical;
        ctx.lineWidth = 2.6;
        ctx.stroke();
        ctx.restore();

        // Typo Error Circles
        points.forEach((p, i) => {
          if (p.errors > 0) {
            const ex = getPointX(i);
            const ey = getPointY(p.wpm);
            ctx.beginPath();
            ctx.arc(ex, ey, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = accentDanger;
            ctx.fill();
            ctx.strokeStyle = bgInput;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        });
      }

      // 6. Missed Keys or Key Strengths
      const missedKeysY = 452;
      if (missedKeys.length > 0) {
        ctx.fillStyle = accentDanger;
        ctx.font = 'bold 11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
        ctx.fillText('⚠️ FINGER WEAKNESS TELEMETRY (MISSED KEYS):', 65, missedKeysY + 14);

        let badgeX = 370;
        missedKeys.slice(0, 7).forEach(([key, count]) => {
          const label = key === ' ' ? 'SPACE' : key.toUpperCase();
          const text = `${label} ${count}x`;
          ctx.font = 'bold 11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
          const bw = ctx.measureText(text).width + 16;

          drawRoundRect(ctx, badgeX, missedKeysY, bw, 20, 6);
          ctx.fillStyle = bgInput;
          ctx.fill();
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = accentDanger;
          ctx.fillText(text, badgeX + 8, missedKeysY + 14);
          badgeX += bw + 8;
        });
      } else {
        ctx.fillStyle = accentSuccess;
        ctx.font = 'bold 11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
        ctx.fillText('★ FLAWLESS PRECISION: ZERO UNREGISTERED KEYSTROKE DEFECTS RECORDED', 65, missedKeysY + 14);
      }

      // 7. Mission Details & XP Reward Bar
      const barY = 496;
      ctx.strokeStyle = borderSubtle;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(65, barY);
      ctx.lineTo(1135, barY);
      ctx.stroke();

      ctx.font = '12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      let curX = 65;

      ctx.fillStyle = textDim;
      ctx.fillText('MISSION: ', curX, barY + 28);
      curX += ctx.measureText('MISSION: ').width;
      ctx.fillStyle = textMain;
      ctx.fillText(`${result.settingsSnapshot.toUpperCase()}`, curX, barY + 28);
      curX += ctx.measureText(`${result.settingsSnapshot.toUpperCase()}`).width + 25;

      ctx.fillStyle = textDim;
      ctx.fillText('TIME: ', curX, barY + 28);
      curX += ctx.measureText('TIME: ').width;
      ctx.fillStyle = textMain;
      ctx.fillText(`${result.duration}s`, curX, barY + 28);
      curX += ctx.measureText(`${result.duration}s`).width + 25;

      ctx.fillStyle = textDim;
      ctx.fillText('CHARS: ', curX, barY + 28);
      curX += ctx.measureText('CHARS: ').width;
      ctx.fillStyle = accentSuccess;
      ctx.fillText(`${result.correctChars}`, curX, barY + 28);
      curX += ctx.measureText(`${result.correctChars}`).width;
      ctx.fillStyle = textDim;
      ctx.fillText(' / ', curX, barY + 28);
      curX += ctx.measureText(' / ').width;
      ctx.fillStyle = accentDanger;
      ctx.fillText(`${result.incorrectChars}`, curX, barY + 28);
      curX += ctx.measureText(`${result.incorrectChars}`).width + 25;

      ctx.fillStyle = textDim;
      ctx.fillText('OPERATOR RANK: ', curX, barY + 28);
      curX += ctx.measureText('OPERATOR RANK: ').width;
      ctx.fillStyle = accentTarget;
      ctx.fillText(`${rank.title.toUpperCase()}`, curX, barY + 28);

      // XP Reward Pill on Right
      const xpText = `★ +${result.xpEarned} XP`;
      ctx.font = 'bold 12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      const xpW = ctx.measureText(xpText).width + 24;
      const xpX = 1135 - xpW;
      drawRoundRect(ctx, xpX, barY + 13, xpW, 26, 8);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = accentTactical;
      ctx.fillText(xpText, xpX + 12, barY + 30);

      // 8. Bottom Brand Stamp Footer
      const footerY = 562;
      ctx.strokeStyle = borderSubtle;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(65, footerY);
      ctx.lineTo(1135, footerY);
      ctx.stroke();

      ctx.fillStyle = textMain;
      ctx.font = 'bold 13px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      ctx.fillText('TYPE', 65, footerY + 28);
      const typeW = ctx.measureText('TYPE').width;

      ctx.fillStyle = accentTactical;
      ctx.fillText('TRACK', 65 + typeW, footerY + 28);
      const trackW = ctx.measureText('TRACK').width;

      ctx.fillStyle = textFaint;
      ctx.fillText(' // TACTICAL APM LAB', 65 + typeW + trackW, footerY + 28);

      const rightStamp = 'VERIFIED TELEMETRY • typetrack.saurabhx.site';
      ctx.fillStyle = textFaint;
      ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      const rightStampW = ctx.measureText(rightStamp).width;
      ctx.fillText(rightStamp, 1135 - rightStampW, footerY + 28);

      // 9. Export via Web Share API on Mobile or Direct Download on Desktop
      const fileName = `TYPETRACK_WPM_${result.wpm}_${result.mode}_${result.id.slice(0, 6)}.png`;

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setIsExporting(false);
          return;
        }

        // Check Web Share API Level 2 file sharing (iOS Safari & Chrome Android)
        const file = new File([blob], fileName, { type: 'image/png' });
        if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: `TypeTrack Scorecard - ${result.wpm} WPM`,
              text: `🎯 My TypeTrack Tactical Scorecard: ${result.wpm} WPM with ${result.accuracy}% accuracy in ${result.mode} mode!`,
            });
            setIsExporting(false);
            setExported(true);
            setTimeout(() => setExported(false), 2500);
            return;
          } catch (err: unknown) {
            if (err instanceof Error && err.name === 'AbortError') {
              setIsExporting(false);
              return;
            }
          }
        }

        // Direct Download fallback
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = fileName;
        link.href = url;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
        setIsExporting(false);
        setExported(true);
        setTimeout(() => setExported(false), 2500);
      }, 'image/png');
    } catch {
      setIsExporting(false);
    }
  };

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
      <div className="neo-extruded rounded-3xl p-5 sm:p-8 relative overflow-hidden">
        
        {/* Scorecard Header Bar with Aligned Top-Right Telemetry */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 mb-5 border-b border-[var(--border-subtle)] text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-tactical)] shadow-[0_0_8px_var(--accent-tactical)] animate-pulse" />
            <h2 className="font-bold text-[var(--text-main)] tracking-wider uppercase text-xs sm:text-sm inline">
              PERFORMANCE SCORECARD
            </h2>
            <span className="text-[10px] font-mono text-[var(--accent-target)] px-2.5 py-0.5 rounded-full neo-inset uppercase font-semibold">
              {result.mode} mode
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-wider ml-auto">
            <span>SEC_CODE: <span className="font-bold text-[var(--text-main)]">{result.id.slice(0, 8)}</span></span>
            <span className="text-[var(--border-strong)]">•</span>
            <span className="text-[var(--accent-success)] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-success)] shadow-[0_0_6px_var(--accent-success)] inline-block" />
              APM VALIDATED
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 items-stretch pb-6 sm:pb-8 border-b border-[var(--border-subtle)]">
          
          {/* Hero WPM */}
          <div className="col-span-1 min-w-0 neo-inset p-4 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--text-dim)] mb-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[var(--accent-tactical)] shrink-0" />
                <span>Net Speed</span>
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-[var(--accent-tactical)] leading-none truncate">
                {result.wpm}
              </div>
            </div>
            <div className="text-[10px] sm:text-xs text-[var(--text-dim)] mt-2 font-bold tracking-widest">
              WORDS PER MINUTE
            </div>
          </div>

          {/* Accuracy */}
          <div className="col-span-1 min-w-0 neo-inset p-4 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--text-dim)] mb-1 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[var(--accent-success)] shrink-0" />
                <span>Accuracy</span>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] leading-none truncate">
                {result.accuracy}%
              </div>
            </div>
            <div className="text-[10px] sm:text-xs text-[var(--text-dim)] mt-2 truncate">
              {result.correctChars} hits / {result.incorrectChars} misses
            </div>
          </div>

          {/* Raw WPM */}
          <div className="col-span-1 min-w-0 neo-inset p-4 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--text-dim)] mb-1 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[var(--accent-target)] shrink-0" />
                <span>Raw Speed</span>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--accent-target)] leading-none truncate">
                {result.rawWpm}
              </div>
            </div>
            <div className="text-[10px] sm:text-xs text-[var(--text-dim)] mt-2 truncate">
              Unadjusted cadence
            </div>
          </div>

          {/* Consistency & Streak */}
          <div className="col-span-1 min-w-0 neo-inset p-4 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--text-dim)] mb-1 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[var(--accent-streak)] shrink-0" />
                <span>Flow Streak</span>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--accent-streak)] leading-none truncate">
                {result.highestStreak}x
              </div>
            </div>
            <div className="text-[10px] sm:text-xs text-[var(--text-dim)] mt-2 truncate">
              Consistency: {result.consistency}%
            </div>
          </div>

        </div>

        {/* Secondary Telemetry: SVG Performance Timeline Chart */}
        <div className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-[var(--text-dim)] mb-2">
            <span className="font-bold flex flex-wrap items-center gap-2">
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

          <div className="w-full bg-[var(--bg-input)] rounded-2xl p-3 sm:p-4 neo-inset overflow-hidden">
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
        <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-dim)]">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
            <div>
              <span className="text-[var(--text-dim)] font-semibold">MISSION:</span>{' '}
              <span className="text-[var(--text-main)] uppercase">{result.settingsSnapshot}</span>
            </div>
            <div>
              <span className="text-[var(--text-dim)] font-semibold">TIME:</span>{' '}
              <span className="text-[var(--text-main)]">{result.duration}s</span>
            </div>
            <div>
              <span className="text-[var(--text-dim)] font-semibold">CHARS:</span>{' '}
              <span className="text-[var(--accent-success)]">{result.correctChars}</span> /{' '}
              <span className="text-[var(--accent-danger)]">{result.incorrectChars}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[var(--text-dim)] font-semibold">XP REWARD:</span>
            <span className="px-2 py-0.5 rounded bg-[var(--accent-tactical)]/15 text-[var(--accent-tactical)] font-bold border border-[var(--accent-tactical)]/30">
              +{result.xpEarned} XP
            </span>
          </div>
        </div>

      </div>

      {/* Action Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Next Mission / Restart CTA */}
        <button
          onClick={onRestart}
          className="neo-btn w-full sm:w-auto px-8 py-3.5 min-h-[48px] rounded-2xl text-base font-black font-mono text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-500 hover:from-indigo-400 hover:to-indigo-500 active:scale-95 flex items-center justify-center gap-3 shadow-[0_4px_24px_rgba(99,102,241,0.5),0_0_12px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_28px_rgba(99,102,241,0.7)] transition-all cursor-pointer ring-1 ring-white/20"
        >
          <RotateCcw className="w-5 h-5 text-white shrink-0" />
          <span className="text-white tracking-wider font-black">START AGAIN</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-black/40 text-white/95 border border-white/25 shadow-inner">
            <kbd className="bg-transparent border-0 text-white font-black shadow-none p-0">Enter</kbd> or <kbd className="bg-transparent border-0 text-white font-black shadow-none p-0">Tab</kbd>
          </span>
        </button>

        {/* Share & Download Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          
          <button
            onClick={handleCopyScorecard}
            className="neo-btn flex-1 sm:flex-initial px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-mono text-[var(--text-main)] hover:bg-[var(--bg-panel)] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[var(--accent-success)]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED!' : 'COPY CARD'}</span>
          </button>

          <button
            onClick={handleDownloadScorecard}
            disabled={isExporting}
            className="neo-btn flex-1 sm:flex-initial px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-mono text-[var(--accent-target)] hover:bg-[var(--bg-panel)] flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-60"
          >
            {exported ? (
              <>
                <Check className="w-3.5 h-3.5 text-[var(--accent-success)]" />
                <span>SAVED!</span>
              </>
            ) : isExporting ? (
              <>
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[var(--accent-target)] border-t-transparent animate-spin" />
                <span>EXPORTING...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>EXPORT PNG</span>
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
};
