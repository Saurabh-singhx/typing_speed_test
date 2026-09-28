'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  TestSettings, 
  TestResult, 
  WpmPoint, 
  CaretStyle, 
  TestMode 
} from '@/lib/types';
import { getRandomWords, getRandomQuote } from '@/lib/words';
import { soundFx } from '@/lib/audio';
import { PacingGhostBar } from './PacingGhostBar';
import { BossRaidArena } from './BossRaidArena';
import { Flame, RotateCcw, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';

interface TypingEngineProps {
  settings: TestSettings;
  bestWpm: number;
  onFinishTest: (result: TestResult) => void;
  onAbortHardcore: () => void;
}

interface CharState {
  char: string;
  status: 'correct' | 'incorrect' | 'extra' | 'untyped';
}

interface WordState {
  original: string;
  chars: CharState[];
  isCompleted: boolean;
}

export const TypingEngine: React.FC<TypingEngineProps> = ({
  settings,
  bestWpm,
  onFinishTest,
  onAbortHardcore,
}) => {
  // Test State
  const [words, setWords] = useState<WordState[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(settings.timeLimit);
  
  // Real-time Telemetry
  const [liveWpm, setLiveWpm] = useState(0);
  const [liveRawWpm, setLiveRawWpm] = useState(0);
  const [liveAccuracy, setLiveAccuracy] = useState(100);
  const [comboStreak, setComboStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [chartData, setChartData] = useState<WpmPoint[]>([]);
  const [missedKeysMap, setMissedKeysMap] = useState<Record<string, number>>({});
  
  // Hardcore Fail Modal
  const [hardcoreFailed, setHardcoreFailed] = useState(false);

  // Boss Raid Mechanics
  const [bossHp, setBossHp] = useState(1000);
  const [maxBossHp] = useState(1000);
  const [lastDmg, setLastDmg] = useState(0);
  const [isCrit, setIsCrit] = useState(false);
  const lastWordTimeRef = useRef<number>(Date.now());

  // Refs for tracking
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordsContainerRef = useRef<HTMLDivElement | null>(null);
  const wordsWrapperRef = useRef<HTMLDivElement | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const caretRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const totalCorrectCharsRef = useRef(0);
  const totalIncorrectCharsRef = useRef(0);
  const totalExtraCharsRef = useRef(0);
  const secondErrorsRef = useRef(0);

  // Combo multiplier
  const comboMultiplier = comboStreak >= 50 ? 3 : comboStreak >= 25 ? 2 : comboStreak >= 10 ? 1.5 : 1;

  // Initialize Word Bank
  const initWordBank = useCallback(() => {
    let wordList: string[] = [];

    if (settings.mode === 'quote') {
      const q = getRandomQuote();
      wordList = q.text.split(' ');
    } else if (settings.mode === 'boss') {
      wordList = getRandomWords(80, { punctuation: false, numbers: false });
      setBossHp(1000);
      setTimeRemaining(50);
    } else if (settings.mode === 'words') {
      wordList = getRandomWords(settings.wordCount, {
        punctuation: settings.punctuation,
        numbers: settings.numbers,
      });
    } else {
      // Time mode - generate enough words for the duration
      const count = Math.max(80, Math.round(settings.timeLimit * 2.5));
      wordList = getRandomWords(count, {
        punctuation: settings.punctuation,
        numbers: settings.numbers,
      });
      setTimeRemaining(settings.timeLimit);
    }

    const stateList: WordState[] = wordList.map((word) => ({
      original: word,
      chars: word.split('').map((c) => ({ char: c, status: 'untyped' })),
      isCompleted: false,
    }));

    setWords(stateList);
    setCurrentWordIndex(0);
    setCurrentInput('');
    setHasStarted(false);
    setIsFinished(false);
    setElapsedSeconds(0);
    setLiveWpm(0);
    setLiveRawWpm(0);
    setLiveAccuracy(100);
    setComboStreak(0);
    setHighestStreak(0);
    setChartData([]);
    setMissedKeysMap({});
    setHardcoreFailed(false);
    totalCorrectCharsRef.current = 0;
    totalIncorrectCharsRef.current = 0;
    totalExtraCharsRef.current = 0;
    secondErrorsRef.current = 0;

    // Reset container scroll
    if (wordsContainerRef.current) {
      wordsContainerRef.current.scrollTop = 0;
    }

    // Focus input and update caret
    setTimeout(() => {
      hiddenInputRef.current?.focus();
      updateCaret();
    }, 50);
  }, [settings]);

  // Restart on settings change
  useEffect(() => {
    initWordBank();
    if (timerRef.current) clearInterval(timerRef.current);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [initWordBank]);

  // Position caret element smoothly at active letter
  const updateCaret = useCallback(() => {
    if (!wordsContainerRef.current || !wordsWrapperRef.current || !caretRef.current) return;
    const activeWordElem = wordsContainerRef.current.querySelector(
      `[data-word-index="${currentWordIndex}"]`
    ) as HTMLElement | null;

    if (!activeWordElem) return;

    const wrapperRect = wordsWrapperRef.current.getBoundingClientRect();
    const chars = activeWordElem.querySelectorAll('.char-item');
    const inputLen = currentInput.length;

    let targetLeft = 0;
    let targetTop = 0;
    let targetWidth = 10;
    let targetHeight = 28;

    if (chars.length === 0) {
      const wordRect = activeWordElem.getBoundingClientRect();
      targetLeft = wordRect.left - wrapperRect.left;
      targetTop = wordRect.top - wrapperRect.top;
      targetWidth = 10;
      targetHeight = wordRect.height || 28;
    } else if (inputLen < chars.length) {
      const charElem = chars[inputLen] as HTMLElement;
      const charRect = charElem.getBoundingClientRect();
      targetLeft = charRect.left - wrapperRect.left;
      targetTop = charRect.top - wrapperRect.top;
      targetWidth = charRect.width;
      targetHeight = charRect.height;

      if (settings.caretStyle === 'line') {
        targetLeft -= 1;
      } else if (settings.caretStyle === 'underline') {
        targetTop = charRect.bottom - wrapperRect.top - 2;
      }
    } else {
      // Completed all characters in current word (waiting for space) or extra characters
      const lastChar = chars[chars.length - 1] as HTMLElement;
      const lastCharRect = lastChar.getBoundingClientRect();
      targetLeft = lastCharRect.right - wrapperRect.left;
      targetTop = lastCharRect.top - wrapperRect.top;
      targetHeight = lastCharRect.height;
      targetWidth = Math.max(8, lastCharRect.width * 0.7);

      if (settings.caretStyle === 'line') {
        targetLeft -= 1;
      } else if (settings.caretStyle === 'underline') {
        targetTop = lastCharRect.bottom - wrapperRect.top - 2;
      }
    }

    caretRef.current.style.left = `${targetLeft}px`;
    caretRef.current.style.top = `${targetTop}px`;

    if (settings.caretStyle === 'line') {
      caretRef.current.style.width = '2.5px';
      caretRef.current.style.height = `${targetHeight}px`;
    } else if (settings.caretStyle === 'underline') {
      caretRef.current.style.width = `${Math.max(8, targetWidth)}px`;
      caretRef.current.style.height = '3px';
    } else {
      // block or box
      caretRef.current.style.width = `${Math.max(8, targetWidth)}px`;
      caretRef.current.style.height = `${targetHeight}px`;
    }

    caretRef.current.style.opacity = '1';

    // Scroll active word into view smoothly if wrapped
    if (activeWordElem.offsetTop > 120 && wordsContainerRef.current) {
      wordsContainerRef.current.scrollTop = activeWordElem.offsetTop - 60;
    }
  }, [currentWordIndex, currentInput, settings.caretStyle]);

  useEffect(() => {
    updateCaret();
    const rafId = requestAnimationFrame(updateCaret);
    return () => cancelAnimationFrame(rafId);
  }, [updateCaret, currentWordIndex, currentInput, words]);

  // Handle window resizing and font loading to keep caret aligned
  useEffect(() => {
    const handleResize = () => {
      updateCaret();
    };
    window.addEventListener('resize', handleResize);

    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        updateCaret();
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateCaret]);

  // Complete and Finalize Test
  const finishTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsFinished(true);
    soundFx.playComplete();

    const duration = Math.max(1, elapsedSeconds || 1);
    const finalWpm = Math.round((totalCorrectCharsRef.current / 5) / (duration / 60));
    const finalRaw = Math.round(((totalCorrectCharsRef.current + totalIncorrectCharsRef.current + totalExtraCharsRef.current) / 5) / (duration / 60));
    const totalHits = totalCorrectCharsRef.current + totalIncorrectCharsRef.current;
    const finalAcc = totalHits > 0 ? Math.round((totalCorrectCharsRef.current / totalHits) * 100) : 100;

    // Consistency score: standard deviation of chart points
    let consistency = 85;
    if (chartData.length > 2) {
      const avg = chartData.reduce((s, p) => s + p.wpm, 0) / chartData.length;
      const variance = chartData.reduce((s, p) => s + Math.pow(p.wpm - avg, 2), 0) / chartData.length;
      const stdDev = Math.sqrt(variance);
      consistency = Math.max(40, Math.min(99, Math.round(100 - (stdDev / Math.max(1, avg)) * 50)));
    }

    const testSummarySnapshot = `${settings.mode} ${
      settings.mode === 'time'
        ? `${settings.timeLimit}s`
        : settings.mode === 'words'
        ? `${settings.wordCount}w`
        : settings.mode
    }${settings.hardcore ? ' (hardcore)' : ''}`;

    const result: TestResult = {
      id: `TAC_${Date.now()}`,
      timestamp: Date.now(),
      wpm: finalWpm,
      rawWpm: finalRaw,
      accuracy: finalAcc,
      consistency,
      correctChars: totalCorrectCharsRef.current,
      incorrectChars: totalIncorrectCharsRef.current,
      extraChars: totalExtraCharsRef.current,
      missedChars: 0,
      duration,
      mode: settings.mode,
      settingsSnapshot: testSummarySnapshot,
      chartData: chartData.length > 0 ? chartData : [{ second: 1, wpm: finalWpm, rawWpm: finalRaw, errors: 0 }],
      missedKeysMap,
      highestStreak,
      xpEarned: Math.round(finalWpm * (finalAcc / 100) * 10),
    };

    onFinishTest(result);
  }, [
    elapsedSeconds,
    settings,
    chartData,
    missedKeysMap,
    highestStreak,
    onFinishTest,
  ]);

  // Main 1-second interval timer
  useEffect(() => {
    if (!hasStarted || isFinished) return;

    timerRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.round((now - startTimeRef.current) / 1000);
      setElapsedSeconds(elapsed);

      // Running WPM Calculation
      const durationMin = Math.max(0.016, elapsed / 60);
      const currWpm = Math.round((totalCorrectCharsRef.current / 5) / durationMin);
      const currRaw = Math.round(((totalCorrectCharsRef.current + totalIncorrectCharsRef.current + totalExtraCharsRef.current) / 5) / durationMin);
      const totalHits = totalCorrectCharsRef.current + totalIncorrectCharsRef.current;
      const currAcc = totalHits > 0 ? Math.round((totalCorrectCharsRef.current / totalHits) * 100) : 100;

      setLiveWpm(currWpm);
      setLiveRawWpm(currRaw);
      setLiveAccuracy(currAcc);

      // Record point for timeline chart
      setChartData((prev) => [
        ...prev,
        {
          second: elapsed,
          wpm: currWpm,
          rawWpm: currRaw,
          errors: secondErrorsRef.current,
        },
      ]);
      secondErrorsRef.current = 0; // reset errors for this second slice

      // Check mode termination
      if (settings.mode === 'time') {
        const remaining = Math.max(0, settings.timeLimit - elapsed);
        setTimeRemaining(remaining);
        if (remaining <= 0) {
          finishTest();
        }
      } else if (settings.mode === 'boss') {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasStarted, isFinished, settings, finishTest]);

  // Handle Keystrokes
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Quick Restart Shortcuts: Tab + Enter or Escape
    if (e.key === 'Escape' || (e.key === 'Enter' && e.shiftKey)) {
      e.preventDefault();
      initWordBank();
      return;
    }

    if (isFinished || hardcoreFailed) return;

    // Start timer on first genuine keystroke
    if (!hasStarted && e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      setHasStarted(true);
      startTimeRef.current = Date.now();
      lastWordTimeRef.current = Date.now();
    }

    // Play switch acoustic feedback
    soundFx.playKey(e.key);

    // Ctrl + Backspace or Alt + Backspace: Delete full word
    if (e.key === 'Backspace' && (e.ctrlKey || e.altKey)) {
      e.preventDefault();
      setCurrentInput('');
      updateWordChars(currentWordIndex, '');
      return;
    }

    // Spacebar: Advance Word
    if (e.key === ' ') {
      e.preventDefault();
      if (currentInput.trim().length === 0) return; // Don't advance on empty space

      advanceWord();
      return;
    }

    // Single Backspace
    if (e.key === 'Backspace') {
      if (currentInput.length > 0) {
        const nextInput = currentInput.slice(0, -1);
        setCurrentInput(nextInput);
        updateWordChars(currentWordIndex, nextInput);
      } else if (currentWordIndex > 0) {
        // Allow hopping back to previous word if it was wrong
        const prevWord = words[currentWordIndex - 1];
        if (prevWord && prevWord.chars.some((c) => c.status === 'incorrect' || c.status === 'extra')) {
          setCurrentWordIndex(currentWordIndex - 1);
          setCurrentInput(prevWord.original);
          updateWordChars(currentWordIndex - 1, prevWord.original);
        }
      }
      return;
    }

    // Single Printable Character
    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      const nextInput = currentInput + e.key;
      const targetChar = words[currentWordIndex]?.original[currentInput.length];
      const isMatch = e.key === targetChar;

      if (isMatch) {
        totalCorrectCharsRef.current += 1;
        setComboStreak((prev) => {
          const next = prev + 1;
          if (next === 10 || next === 25 || next === 50) {
            soundFx.playStreakMilestone(next >= 50 ? 3 : next >= 25 ? 2 : 1.5);
          }
          setHighestStreak((h) => Math.max(h, next));
          return next;
        });
      } else {
        totalIncorrectCharsRef.current += 1;
        secondErrorsRef.current += 1;
        soundFx.playError();
        setComboStreak(0); // Reset combo

        // Record missed key
        if (targetChar) {
          setMissedKeysMap((prev) => ({
            ...prev,
            [targetChar]: (prev[targetChar] || 0) + 1,
          }));
        }

        // Hardcore Sudden Death check
        if (settings.hardcore) {
          setHardcoreFailed(true);
          soundFx.playError();
          if (timerRef.current) clearInterval(timerRef.current);
          return;
        }
      }

      setCurrentInput(nextInput);
      updateWordChars(currentWordIndex, nextInput);
    }
  };

  // Update char statuses in active word
  const updateWordChars = (wordIdx: number, inputVal: string) => {
    setWords((prevWords) => {
      const newWords = [...prevWords];
      const targetWord = newWords[wordIdx];
      if (!targetWord) return prevWords;

      const orig = targetWord.original;
      const chars: CharState[] = [];

      for (let i = 0; i < Math.max(orig.length, inputVal.length); i++) {
        if (i < inputVal.length) {
          if (i < orig.length) {
            chars.push({
              char: orig[i],
              status: inputVal[i] === orig[i] ? 'correct' : 'incorrect',
            });
          } else {
            // Extra characters typed beyond original word length
            chars.push({
              char: inputVal[i],
              status: 'extra',
            });
            totalExtraCharsRef.current += 1;
          }
        } else {
          chars.push({
            char: orig[i],
            status: 'untyped',
          });
        }
      }

      newWords[wordIdx] = { ...targetWord, chars };
      return newWords;
    });
  };

  // Advance to next word
  const advanceWord = () => {
    const activeWord = words[currentWordIndex];
    if (!activeWord) return;

    // Check boss raid damage
    if (settings.mode === 'boss') {
      const now = Date.now();
      const wordTimeMs = now - lastWordTimeRef.current;
      lastWordTimeRef.current = now;

      const isFast = wordTimeMs < 850;
      const baseDmg = activeWord.original.length * 20;
      const finalDmg = Math.round(baseDmg * comboMultiplier * (isFast ? 1.6 : 1));

      setIsCrit(isFast);
      setLastDmg(finalDmg);
      setBossHp((prev) => {
        const next = Math.max(0, prev - finalDmg);
        if (next <= 0) {
          finishTest();
        }
        return next;
      });
    }

    // Check if test completed in word/quote mode
    const isLastWord = currentWordIndex >= words.length - 1;
    if (isLastWord) {
      finishTest();
      return;
    }

    setCurrentWordIndex((prev) => prev + 1);
    setCurrentInput('');
  };

  // Calculate Progress Percent for Pacing Ghost Bar
  let progressPercent = 0;
  if (settings.mode === 'time') {
    progressPercent = Math.min(100, (elapsedSeconds / settings.timeLimit) * 100);
  } else if (settings.mode === 'boss') {
    progressPercent = Math.min(100, ((maxBossHp - bossHp) / maxBossHp) * 100);
  } else {
    progressPercent = Math.min(100, (currentWordIndex / Math.max(1, words.length)) * 100);
  }

  return (
    <div
      ref={containerRef}
      onClick={() => hiddenInputRef.current?.focus()}
      className="w-full max-w-5xl mx-auto space-y-3 font-mono cursor-text select-none focus:outline-none"
    >
      
      {/* Hidden zero-latency input listener */}
      <input
        ref={hiddenInputRef}
        type="text"
        value={currentInput}
        onChange={() => {}} // Controlled by onKeyDown
        onKeyDown={handleKeyDown}
        className="opacity-0 absolute -top-9999 left-0 pointer-events-none"
        autoFocus
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />

      {/* Live Tactical Telemetry HUD */}
      <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs">
        
        {/* Left Telemetry: Time / Words Remaining */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase text-[var(--text-faint)]">
              {settings.mode === 'time' ? 'TIME REMAINING' : settings.mode === 'words' ? 'WORDS LEFT' : 'CADENCE'}
            </span>
            <span className="text-base font-black text-[var(--accent-tactical)]">
              {settings.mode === 'time'
                ? `${timeRemaining}s`
                : settings.mode === 'words'
                ? `${words.length - currentWordIndex}`
                : `${elapsedSeconds}s`}
            </span>
          </div>

          <div className="h-3.5 w-px bg-[var(--border-subtle)]" />

          {/* Live Speed */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase text-[var(--text-faint)]">WPM</span>
            <span className="text-base font-black text-[var(--text-main)]">
              {liveWpm}
            </span>
          </div>

          <div className="h-3.5 w-px bg-[var(--border-subtle)] hidden sm:block" />

          {/* Live Accuracy */}
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-[10px] uppercase text-[var(--text-faint)]">ACC</span>
            <span className={`text-base font-black ${liveAccuracy >= 95 ? 'text-[var(--accent-success)]' : 'text-[var(--accent-tactical)]'}`}>
              {liveAccuracy}%
            </span>
          </div>
        </div>

        {/* Right Telemetry: Flow Streak & Multiplier */}
        <div className="flex items-center gap-3">
          {comboStreak > 3 && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--bg-input)] border border-[var(--accent-streak)]/40 text-[var(--accent-streak)] font-bold text-xs animate-pulse">
              <Flame className="w-3.5 h-3.5" />
              <span>{comboStreak}x STREAK</span>
              <span className="text-[10px] text-[var(--text-dim)]">({comboMultiplier}x XP)</span>
            </div>
          )}

          {/* Restart Button Shortcut */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              initWordBank();
            }}
            title="Restart Test (Esc or Tab+Enter)"
            className="tactical-keycap p-1.5 rounded text-[var(--text-dim)] hover:text-[var(--accent-tactical)]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Pacing Ghost Bar (Interactive Race Track against Target WPM) */}
      <PacingGhostBar
        progressPercent={progressPercent}
        currentWpm={liveWpm}
        targetWpm={settings.targetWpm}
        bestWpm={bestWpm}
        isActive={hasStarted}
      />

      {/* Boss Raid Combat Arena (if in Boss Raid Mode) */}
      {settings.mode === 'boss' && (
        <BossRaidArena
          bossHp={bossHp}
          maxHp={maxBossHp}
          timeRemaining={timeRemaining}
          lastDamage={lastDmg}
          isCrit={isCrit}
          comboMultiplier={comboMultiplier}
        />
      )}

      {/* Sudden Death Abort Modal */}
      {hardcoreFailed && (
        <div className="p-4 rounded-lg bg-[var(--accent-danger)]/15 border-2 border-[var(--accent-danger)] text-center space-y-2 animate-bounce">
          <div className="flex items-center justify-center gap-2 text-[var(--accent-danger)] font-black text-sm uppercase tracking-widest">
            <ShieldAlert className="w-5 h-5" />
            <span>MISSION COMPROMISED // ACCURACY INTEGRITY LOST</span>
          </div>
          <p className="text-xs text-[var(--text-dim)]">
            Sudden Death mode aborts on a single mistake. Focus on clean, deliberate keystrokes.
          </p>
          <button
            onClick={initWordBank}
            className="tactical-keycap px-4 py-2 rounded text-xs font-bold text-white bg-[var(--accent-danger)] hover:brightness-110"
          >
            RE-ENGAGE SYSTEM (Tab + Enter)
          </button>
        </div>
      )}

      {/* Primary Words Display Arena */}
      {!hardcoreFailed && (
        <div
          ref={wordsContainerRef}
          className="relative w-full min-h-[170px] max-h-[220px] p-6 rounded-xl bg-[var(--bg-input)] border border-[var(--border-strong)] overflow-hidden shadow-inner leading-relaxed text-xl sm:text-2xl"
        >
          {/* Render Words */}
          <div ref={wordsWrapperRef} className="flex flex-wrap gap-x-3 gap-y-2 relative">
            {/* Smooth Tactical Caret */}
            <div
              ref={caretRef}
              className={`caret-${settings.caretStyle}`}
              style={{
                display: isFinished ? 'none' : 'block',
                opacity: 0,
              }}
            />

            {words.map((w, wordIdx) => {
              const isCurrent = wordIdx === currentWordIndex;
              return (
                <div
                  key={wordIdx}
                  data-word-index={wordIdx}
                  className={`inline-flex items-center tracking-wide transition-opacity duration-150 ${
                    isCurrent
                      ? 'opacity-100 font-semibold'
                      : wordIdx < currentWordIndex
                      ? 'opacity-50'
                      : 'opacity-70'
                  }`}
                >
                  {w.chars.map((c, charIdx) => {
                    let charColor = 'text-[var(--text-faint)]'; // Untyped
                    let bgStyle = '';

                    if (c.status === 'correct') {
                      charColor = 'text-[var(--text-main)]';
                    } else if (c.status === 'incorrect') {
                      charColor = 'text-[var(--accent-danger)] underline decoration-[var(--accent-danger)] decoration-2';
                      bgStyle = 'bg-[var(--accent-danger)]/15';
                    } else if (c.status === 'extra') {
                      charColor = 'text-[var(--accent-danger)]';
                      bgStyle = 'bg-[var(--accent-danger)]/20 px-0.5 rounded';
                    }

                    return (
                      <span
                        key={charIdx}
                        className={`char-item font-mono transition-colors ${charColor} ${bgStyle}`}
                      >
                        {c.char}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Click to Focus Hint Overlay when unfocused */}
          {!hasStarted && (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-input)]/40 pointer-events-none">
              <div className="px-3 py-1.5 rounded bg-[var(--bg-panel)] border border-[var(--border-strong)] text-[11px] text-[var(--accent-tactical)] font-bold tracking-widest uppercase flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-tactical)] animate-ping" />
                <span>START TYPING TO ENGAGE SYSTEM</span>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Tactical Shortcut Footer Hints */}
      <div className="flex items-center justify-between text-[11px] text-[var(--text-faint)] px-1">
        <div className="flex items-center gap-3">
          <span><strong className="text-[var(--text-dim)]">Tab + Enter</strong> or <strong className="text-[var(--text-dim)]">Esc</strong> to restart</span>
          <span>•</span>
          <span><strong className="text-[var(--text-dim)]">Ctrl + Backspace</strong> to wipe word</span>
        </div>
        <div>
          <span>TACTICAL KEYBOARD LAB // 0-LATENCY SYNC</span>
        </div>
      </div>

    </div>
  );
};
