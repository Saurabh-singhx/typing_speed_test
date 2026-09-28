'use client';

import React, { useState } from 'react';
import { Calculator, Clock, Sparkles, TrendingUp } from 'lucide-react';

export const WpmSavingsCalculator: React.FC = () => {
  const [currentWpm, setCurrentWpm] = useState(42);
  const [targetWpm, setTargetWpm] = useState(85);
  const [dailyTypingHours, setDailyTypingHours] = useState(2.5);

  // Calculations
  // Words typed per day at current speed = dailyTypingHours * 60 * currentWpm
  const wordsPerDay = dailyTypingHours * 60 * currentWpm;
  // Time needed to type same words at target speed:
  const newMinutesNeeded = wordsPerDay / targetWpm;
  const currentMinutes = dailyTypingHours * 60;
  const minutesSavedPerDay = Math.max(0, currentMinutes - newMinutesNeeded);

  // Annual savings (250 work days per year)
  const hoursSavedPerYear = Math.round((minutesSavedPerDay * 250) / 60);
  const workDaysSaved = (hoursSavedPerYear / 8).toFixed(1);
  const speedBoostPercent = Math.round(((targetWpm - currentWpm) / Math.max(1, currentWpm)) * 100);

  return (
    <section className="w-full max-w-5xl mx-auto my-12 font-mono" id="wpm-calculator">
      <div className="p-6 rounded-xl bg-[var(--bg-panel)] border border-[var(--border-strong)] shadow-xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)] mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded bg-[var(--bg-input)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--accent-tactical)]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase text-[var(--accent-tactical)] font-bold tracking-wider">
                TACTICAL PRODUCTIVITY ROI CALCULATOR
              </div>
              <h3 className="text-xl font-black text-[var(--text-main)]">
                Calculate Time Reclaimed by Increasing WPM
              </h3>
            </div>
          </div>
          <span className="text-xs text-[var(--text-dim)]">Based on 250 operational workdays/yr</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sliders Input Column */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Current WPM */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[var(--text-dim)]">Current Typing Speed:</span>
                <span className="font-bold text-sm text-[var(--accent-tactical)]">{currentWpm} WPM</span>
              </div>
              <input
                type="range"
                min="20"
                max="120"
                step="1"
                value={currentWpm}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setCurrentWpm(val);
                  if (val >= targetWpm) setTargetWpm(val + 10);
                }}
                className="w-full h-1.5 bg-[var(--bg-input)] rounded accent-[var(--accent-tactical)] cursor-pointer"
              />
            </div>

            {/* Target WPM */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[var(--text-dim)]">Target Benchmark Speed:</span>
                <span className="font-bold text-sm text-[var(--accent-target)]">{targetWpm} WPM</span>
              </div>
              <input
                type="range"
                min={currentWpm + 5}
                max="150"
                step="1"
                value={targetWpm}
                onChange={(e) => setTargetWpm(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[var(--bg-input)] rounded accent-[var(--accent-target)] cursor-pointer"
              />
            </div>

            {/* Daily Hours */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[var(--text-dim)]">Daily Time Spent Writing & Coding:</span>
                <span className="font-bold text-sm text-[var(--accent-success)]">{dailyTypingHours} Hours / day</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="8"
                step="0.5"
                value={dailyTypingHours}
                onChange={(e) => setDailyTypingHours(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[var(--bg-input)] rounded accent-[var(--accent-success)] cursor-pointer"
              />
            </div>

            <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-dim)]">
              Increasing from <strong>{currentWpm}</strong> to <strong>{targetWpm} WPM</strong> represents a{' '}
              <strong className="text-[var(--accent-tactical)]">+{speedBoostPercent}% efficiency upgrade</strong> across all keyboard workflows.
            </div>

          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-[var(--bg-surface)] p-5 rounded-xl border border-[var(--border-strong)] space-y-4">
            
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--text-faint)] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[var(--accent-tactical)]" />
                <span>Annual Time Reclaimed</span>
              </div>
              <div className="text-4xl sm:text-5xl font-black text-[var(--accent-tactical)] mt-1">
                {hoursSavedPerYear} <span className="text-lg font-bold text-[var(--text-dim)]">HOURS</span>
              </div>
              <div className="text-xs text-[var(--text-dim)] mt-1">
                Equivalent to <strong className="text-[var(--text-main)]">~{workDaysSaved} full 8-hour working days</strong> of your life returned every year.
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
              <span className="text-[var(--text-dim)]">Daily Time Saved:</span>
              <span className="font-bold text-[var(--accent-success)]">
                {Math.round(minutesSavedPerDay)} minutes / day
              </span>
            </div>

            <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
              <span className="text-[var(--text-dim)]">Velocity Multiplier:</span>
              <span className="font-bold text-[var(--accent-target)]">
                {(targetWpm / currentWpm).toFixed(2)}x Faster
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
