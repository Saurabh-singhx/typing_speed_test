'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  TestSettings, 
  TestResult, 
  WpmPoint, 
  ShatterSpeed, 
  ShatterFxIntensity, 
  ShatterSoundProfile,
  ShatterTargetMode,
  ShatterStreamDensity
} from '@/lib/types';
import { getRandomWords, splitGraphemes } from '@/lib/words';
import { soundFx } from '@/lib/audio';
import { 
  Zap, 
  RotateCcw, 
  Flame, 
  Crosshair, 
  Sparkles,
  Trophy,
  Volume2,
  ShieldAlert
} from 'lucide-react';

interface ShatterStreamArenaProps {
  settings: TestSettings;
  bestWpm: number;
  onFinishTest: (result: TestResult) => void;
  onAbort: () => void;
}

interface MovingWord {
  id: string;
  original: string;
  graphemes: string[];
  crackedGraphemes: boolean[];
  x: number;
  y: number;
  width: number;
  status: 'active' | 'queued' | 'shattered' | 'escaped';
}

interface Shard {
  x: number;
  y: number;
  vx: number;
  vy: number;
  spin: number;
  angle: number;
  size: number;
  alpha: number;
  decay: number;
  vertices: { x: number; y: number }[];
  color: string;
  glowColor: string;
  bounceCount: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
  lineWidth: number;
}

interface FloatingBadge {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  alpha: number;
  scale: number;
}

export const ShatterStreamArena: React.FC<ShatterStreamArenaProps> = ({
  settings,
  bestWpm,
  onFinishTest,
  onAbort,
}) => {
  // Settings & Parameters
  const targetMode: ShatterTargetMode = settings.shatterTargetMode || 'time';
  const speedPreset: ShatterSpeed = settings.shatterSpeed || 'normal';
  const fxIntensity: ShatterFxIntensity = settings.shatterFxIntensity || 'full';
  const soundProfile: ShatterSoundProfile = settings.shatterSoundProfile || 'crystal';
  const streamDensity: ShatterStreamDensity = settings.shatterStreamDensity || 'normal';
  const targetWordsCount = settings.wordCount || 25;
  const timeLimit = settings.timeLimit || 30;
  const maxSurvivalBreaches = settings.hardcore ? 1 : 5;

  // Arena & Words State
  const [words, setWords] = useState<MovingWord[]>([]);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [shatteredCount, setShatteredCount] = useState(0);
  const [escapedCount, setEscapedCount] = useState(0);
  const [comboStreak, setComboStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  // Live Telemetry
  const [liveWpm, setLiveWpm] = useState(0);
  const [liveAccuracy, setLiveAccuracy] = useState(100);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Environmental FX States
  const [impactFrameActive, setImpactFrameActive] = useState(false);
  const [colorDrainActive, setColorDrainActive] = useState(false);
  const [flashAlpha, setFlashAlpha] = useState(0);
  const [screenTrauma, setScreenTrauma] = useState(0);
  const [floatingBadges, setFloatingBadges] = useState<FloatingBadge[]>([]);

  // Refs for Animation & Particle Engine
  const arenaRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const hitStopRemainingRef = useRef<number>(0);
  const isFinishedRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timeElapsedRef = useRef(0);
  const shatteredCountRef = useRef(0);
  const activeWordIndexRef = useRef(0);
  const wordsRef = useRef<MovingWord[]>([]);
  const surgeVelocityRef = useRef<number>(0);
  const liveWpmRef = useRef<number>(0);
  const keystrokeTimestampsRef = useRef<number[]>([]);

  // Stats Counters
  const totalCorrectCharsRef = useRef(0);
  const totalIncorrectCharsRef = useRef(0);
  const startTimeRef = useRef<number>(0);
  const chartDataRef = useRef<WpmPoint[]>([]);
  const missedKeysMapRef = useRef<Record<string, number>>({});

  // Dynamic Particles
  const shardsRef = useRef<Shard[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);

  // Base speed in pixels per second with adaptive APM scaling
  const getSpeedPxPerSec = useCallback((streak: number): number => {
    let base = 95;
    if (speedPreset === 'chill') base = 48;
    else if (speedPreset === 'slow') base = 68;
    else if (speedPreset === 'normal') base = 98;
    else if (speedPreset === 'fast') base = 150;
    else if (speedPreset === 'hyper') base = 215;
    else if (speedPreset === 'insane') base = 295;
    else if (speedPreset === 'ramp') {
      base = 75 + Math.min(180, streak * 6);
    }

    // Dynamic APM Scaling: If the typist is typing fast, stream naturally flows faster
    const currentWpm = liveWpmRef.current;
    if (currentWpm > 45) {
      const dynamicBoost = Math.min(1.85, 1 + (currentWpm - 45) * 0.008);
      base *= dynamicBoost;
    }

    // In survival mode: ramp up speed as more words are shattered
    if (targetMode === 'survival') {
      const survivalEscalation = 1 + Math.min(1.2, (shatteredCountRef.current / 8) * 0.08);
      base *= survivalEscalation;
    }

    return base;
  }, [speedPreset, targetMode]);

  // Unlock AudioContext eagerly on mount and interaction
  useEffect(() => {
    soundFx.unlock();
  }, []);

  // Initialize Word Stream
  const initWordStream = useCallback(() => {
    soundFx.unlock();

    const wordsToFetch = targetMode === 'words' 
      ? Math.max(60, targetWordsCount + 20)
      : 80;

    const rawWords = getRandomWords(
      wordsToFetch,
      { punctuation: settings.punctuation, numbers: settings.numbers },
      settings.language
    );

    const arenaWidth = arenaRef.current?.clientWidth || 800;
    const isMobile = arenaWidth < 640;
    // Word 0 starts near the right edge of the arena so it is immediately visible!
    let spawnCursorX = isMobile
      ? Math.max(220, arenaWidth - 60)
      : Math.max(480, Math.min(750, arenaWidth - 120));

    // Dynamic Word Gap based on streamDensity
    let wordGap = isMobile ? 120 : 180;
    if (streamDensity === 'relaxed') {
      wordGap = isMobile ? 170 : 250;
    } else if (streamDensity === 'rush') {
      wordGap = isMobile ? 75 : 110;
    }

    const movingList: MovingWord[] = rawWords.map((w, idx) => {
      const graphemes = splitGraphemes(w);
      const approxWidth = Math.max(80, graphemes.length * (isMobile ? 18 : 24) + 24);
      const wordObj: MovingWord = {
        id: `word_${idx}_${Date.now()}`,
        original: w,
        graphemes,
        crackedGraphemes: new Array(graphemes.length).fill(false),
        x: spawnCursorX,
        y: isMobile ? 115 : 130, // Centered vertically in arena track
        width: approxWidth,
        status: idx === 0 ? 'active' : 'queued',
      };
      spawnCursorX += approxWidth + wordGap;
      return wordObj;
    });

    wordsRef.current = movingList;
    setWords(movingList);
    activeWordIndexRef.current = 0;
    setActiveWordIndex(0);
    setShatteredCount(0);
    setEscapedCount(0);
    setComboStreak(0);
    setHighestStreak(0);
    setHasStarted(false);
    setIsFinished(false);
    setLiveWpm(0);
    setLiveAccuracy(100);
    setTimeElapsed(0);

    if (timerRef.current) clearInterval(timerRef.current);
    isFinishedRef.current = false;
    timeElapsedRef.current = 0;
    shatteredCountRef.current = 0;

    totalCorrectCharsRef.current = 0;
    totalIncorrectCharsRef.current = 0;
    startTimeRef.current = 0;
    surgeVelocityRef.current = 0;
    liveWpmRef.current = 0;
    keystrokeTimestampsRef.current = [];
    chartDataRef.current = [];
    missedKeysMapRef.current = {};
    shardsRef.current = [];
    sparksRef.current = [];
    shockwavesRef.current = [];
    setFloatingBadges([]);

    setTimeout(() => {
      hiddenInputRef.current?.focus();
    }, 60);
  }, [settings, targetWordsCount, streamDensity, targetMode]);

  useEffect(() => {
    initWordStream();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [initWordStream]);

  // Spawn Polygon Shards for Breaking Letter
  const spawnLetterShards = useCallback((originX: number, originY: number) => {
    const shardCount = 14 + Math.floor(Math.random() * 8);
    const themeAccent = getComputedStyle(document.documentElement).getPropertyValue('--accent-tactical').trim() || '#eab308';
    const targetCyan = getComputedStyle(document.documentElement).getPropertyValue('--accent-target').trim() || '#38bdf8';

    for (let i = 0; i < shardCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 9;
      const vx = Math.cos(angle) * speed * 1.1;
      const vy = -Math.abs(Math.sin(angle) * speed) - (2 + Math.random() * 5);

      const shardRadius = 6 + Math.random() * 10;
      const numVerts = 3 + Math.floor(Math.random() * 2);
      const vertices: { x: number; y: number }[] = [];
      for (let v = 0; v < numVerts; v++) {
        const vAngle = (v / numVerts) * Math.PI * 2 + (Math.random() - 0.5) * 0.7;
        const dist = shardRadius * (0.5 + Math.random() * 0.7);
        vertices.push({
          x: Math.cos(vAngle) * dist,
          y: Math.sin(vAngle) * dist,
        });
      }

      shardsRef.current.push({
        x: originX + (Math.random() - 0.5) * 16,
        y: originY + (Math.random() - 0.5) * 16,
        vx,
        vy,
        spin: (Math.random() - 0.5) * 0.45,
        angle: Math.random() * Math.PI * 2,
        size: shardRadius,
        alpha: 1.0,
        decay: 0.018 + Math.random() * 0.015,
        vertices,
        color: Math.random() > 0.4 ? '#ffffff' : themeAccent,
        glowColor: targetCyan,
        bounceCount: 0,
      });
    }

    for (let s = 0; s < 6; s++) {
      sparksRef.current.push({
        x: originX,
        y: originY,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8 - 3,
        alpha: 1.0,
        size: 2 + Math.random() * 2.5,
        color: themeAccent,
      });
    }
  }, []);

  // Spawn Full Word Explosion Shards & Shockwave Ring
  const spawnWordExplosion = useCallback((centerX: number, centerY: number, combo: number) => {
    const explosionCount = 36 + Math.min(24, combo * 4);
    const themeAccent = getComputedStyle(document.documentElement).getPropertyValue('--accent-tactical').trim() || '#eab308';
    const targetCyan = getComputedStyle(document.documentElement).getPropertyValue('--accent-target').trim() || '#38bdf8';

    for (let i = 0; i < explosionCount; i++) {
      const angle = (i / explosionCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const speed = 6 + Math.random() * 12;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 2.5;

      const shardRadius = 8 + Math.random() * 12;
      const numVerts = 3 + Math.floor(Math.random() * 2);
      const vertices: { x: number; y: number }[] = [];
      for (let v = 0; v < numVerts; v++) {
        const vAngle = (v / numVerts) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
        const dist = shardRadius * (0.6 + Math.random() * 0.6);
        vertices.push({
          x: Math.cos(vAngle) * dist,
          y: Math.sin(vAngle) * dist,
        });
      }

      shardsRef.current.push({
        x: centerX + (Math.random() - 0.5) * 20,
        y: centerY + (Math.random() - 0.5) * 20,
        vx,
        vy,
        spin: (Math.random() - 0.5) * 0.55,
        angle: Math.random() * Math.PI * 2,
        size: shardRadius,
        alpha: 1.0,
        decay: 0.014 + Math.random() * 0.012,
        vertices,
        color: i % 2 === 0 ? '#ffffff' : (i % 3 === 0 ? targetCyan : themeAccent),
        glowColor: targetCyan,
        bounceCount: 0,
      });
    }

    shockwavesRef.current.push({
      x: centerX,
      y: centerY,
      radius: 12,
      maxRadius: 180,
      alpha: 1.0,
      color: themeAccent,
      lineWidth: 4,
    });

    const badgeText = combo >= 5 ? `🔥 HYPER SHATTER x${combo}` : combo >= 2 ? `CRACKED! x${combo}` : `+100 SHATTERED!`;
    const newBadge: FloatingBadge = {
      id: `badge_${Date.now()}_${Math.random()}`,
      text: badgeText,
      x: centerX,
      y: centerY - 25,
      color: combo >= 5 ? '#f59e0b' : '#38bdf8',
      alpha: 1.0,
      scale: 1.25,
    };
    setFloatingBadges((prev) => [...prev.slice(-4), newBadge]);
  }, []);

  // Trigger Dynamic Environmental Impacts
  const triggerImpactEffects = useCallback((isWordClear: boolean, combo: number) => {
    if (fxIntensity === 'minimal') return;

    if (isWordClear) {
      hitStopRemainingRef.current = 65; // Freeze movement for 65ms
      soundFx.playTimeFreezeSound();

      if (fxIntensity === 'full') {
        setImpactFrameActive(true);
        setTimeout(() => setImpactFrameActive(false), 45);
      }

      setFlashAlpha(0.75);

      setColorDrainActive(true);
      setTimeout(() => setColorDrainActive(false), 190);

      setScreenTrauma((prev) => Math.min(24, prev + 12 + Math.min(8, combo * 1.5)));

    } else {
      setScreenTrauma((prev) => Math.min(8, prev + 3));
      if (fxIntensity === 'full' && Math.random() < 0.2) {
        setFlashAlpha(0.2);
      }
    }
  }, [fxIntensity]);

  // Finish and compile test telemetry
  const finalizeTest = useCallback((isAbort: boolean = false) => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsFinished(true);

    if (isAbort) {
      onAbort();
      return;
    }

    soundFx.playComplete();

    const exactDurationSec = startTimeRef.current
      ? Math.max(0.5, (Date.now() - startTimeRef.current) / 1000)
      : Math.max(1, timeElapsedRef.current || 1);

    const finalWpm = Math.round((totalCorrectCharsRef.current / 5) / (exactDurationSec / 60));
    const finalRaw = Math.round(((totalCorrectCharsRef.current + totalIncorrectCharsRef.current) / 5) / (exactDurationSec / 60));
    const totalHits = totalCorrectCharsRef.current + totalIncorrectCharsRef.current;
    const finalAcc = totalHits > 0 ? Math.round((totalCorrectCharsRef.current / totalHits) * 100) : 100;
    const duration = Math.max(1, Math.round(exactDurationSec));

    const result: TestResult = {
      id: `SHT_${Date.now()}`,
      timestamp: Date.now(),
      wpm: finalWpm,
      rawWpm: finalRaw,
      accuracy: finalAcc,
      consistency: 88,
      correctChars: totalCorrectCharsRef.current,
      incorrectChars: totalIncorrectCharsRef.current,
      extraChars: 0,
      missedChars: escapedCount * 5,
      duration,
      mode: 'shatter',
      settingsSnapshot: targetMode === 'time'
        ? `shatter ${timeLimit}s ${speedPreset}`
        : targetMode === 'words'
        ? `shatter ${targetWordsCount}w ${speedPreset}`
        : `shatter survival ${speedPreset}`,
      chartData: chartDataRef.current.length > 0 ? chartDataRef.current : [{ second: 1, wpm: finalWpm, rawWpm: finalRaw, errors: 0 }],
      missedKeysMap: missedKeysMapRef.current,
      highestStreak,
      xpEarned: Math.round(finalWpm * (finalAcc / 100) * 12 + highestStreak * 3),
    };

    onFinishTest(result);
  }, [
    escapedCount, 
    speedPreset, 
    targetWordsCount, 
    timeLimit,
    targetMode,
    highestStreak, 
    onFinishTest, 
    onAbort
  ]);

  // Keystroke Processor
  const handleKeyStrike = useCallback((key: string) => {
    if (isFinishedRef.current) return;

    soundFx.unlock();

    if (!hasStarted) {
      setHasStarted(true);
      startTimeRef.current = Date.now();
    }

    const currentIdx = activeWordIndexRef.current;
    const currentWord = wordsRef.current[currentIdx];
    if (!currentWord) return;
    if (currentWord.status === 'shattered' || currentWord.status === 'escaped') return;

    // Find next uncracked grapheme
    const uncrackedIdx = currentWord.crackedGraphemes.findIndex((c) => !c);
    if (uncrackedIdx === -1) return;

    const targetChar = currentWord.graphemes[uncrackedIdx];
    const isMatch = key.toLowerCase() === targetChar.toLowerCase() || key === targetChar;

    if (isMatch) {
      // 1. Success Strike: Shatter this character!
      totalCorrectCharsRef.current += 1;
      const nextCombo = comboStreak + 1;
      setComboStreak(nextCombo);
      setHighestStreak((h) => Math.max(h, nextCombo));

      // Calculate instantaneous high-precision live WPM & Accuracy on every single key hit
      const now = Date.now();
      keystrokeTimestampsRef.current.push(now);
      if (keystrokeTimestampsRef.current.length > 25) {
        keystrokeTimestampsRef.current = keystrokeTimestampsRef.current.slice(-25);
      }
      const elapsedSec = Math.max(0.3, (now - startTimeRef.current) / 1000);
      const computedWpm = Math.round((totalCorrectCharsRef.current / 5) / (elapsedSec / 60));
      setLiveWpm(computedWpm);
      liveWpmRef.current = computedWpm;

      const totalHits = totalCorrectCharsRef.current + totalIncorrectCharsRef.current;
      setLiveAccuracy(totalHits > 0 ? Math.round((totalCorrectCharsRef.current / totalHits) * 100) : 100);

      // Forward kinetic pulse when cracking letters (+8px surge)
      surgeVelocityRef.current = Math.min(220, surgeVelocityRef.current + 8);

      // Play satisfying crack audio with progressive character satisfaction
      soundFx.playShatterCrack(soundProfile, nextCombo >= 20 ? 3 : nextCombo >= 10 ? 2 : 1, uncrackedIdx);

      // Trigger environmental micro-impact
      triggerImpactEffects(false, nextCombo);

      // Calculate character's coordinate for shard explosion
      const charWidth = 22;
      const charX = currentWord.x + uncrackedIdx * charWidth + charWidth / 2;
      const charY = currentWord.y + 16;
      spawnLetterShards(charX, charY);

      // Update word's cracked state synchronously in memory
      currentWord.crackedGraphemes[uncrackedIdx] = true;
      const allCracked = currentWord.crackedGraphemes.every(Boolean);

      if (allCracked) {
        // FULL WORD OBLITERATED!
        currentWord.status = 'shattered';
        const finalWordCenterX = currentWord.x + currentWord.width / 2;
        const finalWordCenterY = currentWord.y + 16;

        soundFx.playWordShatter(nextCombo, soundProfile);
        spawnWordExplosion(finalWordCenterX, finalWordCenterY, nextCombo);
        triggerImpactEffects(true, nextCombo);

        shatteredCountRef.current += 1;
        setShatteredCount(shatteredCountRef.current);
        if (targetMode === 'words' && shatteredCountRef.current >= targetWordsCount) {
          setTimeout(() => finalizeTest(false), 250);
        }

        // Advance to NEXT word strictly in order: currentIdx -> currentIdx + 1
        const nextActiveIdx = currentIdx + 1;
        activeWordIndexRef.current = nextActiveIdx;
        setActiveWordIndex(nextActiveIdx);
        if (wordsRef.current[nextActiveIdx]) {
          wordsRef.current[nextActiveIdx].status = 'active';
        }

        // FAST-FORWARD STREAM & REEL IN QUEUE:
        // When typing fast, smoothly pull the next queued words into the ready engagement zone
        // so the player never experiences dead waiting time!
        const nextWord = wordsRef.current[nextActiveIdx];
        if (nextWord) {
          const targetReadyX = 320; // Ready engagement zone right before crosshair (180px)
          if (nextWord.x > targetReadyX) {
            const pullDistance = Math.min(nextWord.x - targetReadyX, 280);
            for (let i = nextActiveIdx; i < wordsRef.current.length; i++) {
              wordsRef.current[i].x -= pullDistance;
            }
          }
          // Kinetic surge speed boost so the incoming word whooshes right into position
          surgeVelocityRef.current = Math.min(280, surgeVelocityRef.current + 110);
        }

        // Auto-replenish queued words if running low
        const remainingQueued = wordsRef.current.filter((w) => w.status === 'queued' || w.status === 'active').length;
        if (remainingQueued < 10) {
          const extraWords = getRandomWords(25, { punctuation: settings.punctuation, numbers: settings.numbers }, settings.language);
          const lastWord = wordsRef.current[wordsRef.current.length - 1];
          let nextSpawnX = (lastWord ? Math.max(900, lastWord.x + lastWord.width) : 900) + 180;
          extraWords.forEach((ew, eIdx) => {
            const eGraphemes = splitGraphemes(ew);
            const approxW = Math.max(90, eGraphemes.length * 24 + 32);
            wordsRef.current.push({
              id: `word_rep_${Date.now()}_${eIdx}`,
              original: ew,
              graphemes: eGraphemes,
              crackedGraphemes: new Array(eGraphemes.length).fill(false),
              x: nextSpawnX,
              y: 130,
              width: approxW,
              status: 'queued',
            });
            nextSpawnX += approxW + 180;
          });
        }

        setWords([...wordsRef.current]);

      } else {
        // Just cracked a single character within current active word
        setWords([...wordsRef.current]);
      }

    } else {
      // Typo Strike
      totalIncorrectCharsRef.current += 1;
      soundFx.playError();
      setComboStreak(0);

      const now = Date.now();
      const elapsedSec = Math.max(0.3, (now - startTimeRef.current) / 1000);
      const computedWpm = Math.round((totalCorrectCharsRef.current / 5) / (elapsedSec / 60));
      setLiveWpm(computedWpm);
      liveWpmRef.current = computedWpm;

      const totalHits = totalCorrectCharsRef.current + totalIncorrectCharsRef.current;
      setLiveAccuracy(totalHits > 0 ? Math.round((totalCorrectCharsRef.current / totalHits) * 100) : 100);

      if (targetChar) {
        missedKeysMapRef.current[targetChar] = (missedKeysMapRef.current[targetChar] || 0) + 1;
      }

      if (settings.hardcore) {
        soundFx.playError();
        finalizeTest(true);
      }
    }
  }, [
    hasStarted,
    comboStreak,
    soundProfile,
    settings.hardcore,
    targetWordsCount,
    spawnLetterShards,
    spawnWordExplosion,
    triggerImpactEffects,
    finalizeTest,
    settings.language,
    settings.numbers,
    settings.punctuation,
    targetMode
  ]);

  // Main 1-second Telemetry Timer
  useEffect(() => {
    if (!hasStarted || isFinished) return;

    timerRef.current = setInterval(() => {
      if (startTimeRef.current === 0) return;
      const now = Date.now();
      const elapsedSecExact = Math.max(0.5, (now - startTimeRef.current) / 1000);
      const elapsed = Math.max(1, Math.round(elapsedSecExact));
      timeElapsedRef.current = elapsed;
      setTimeElapsed(elapsed);

      const totalChars = totalCorrectCharsRef.current;
      const totalErrors = totalIncorrectCharsRef.current;
      const currentWpm = Math.round((totalChars / 5) / (elapsedSecExact / 60));
      const currentAcc = totalChars + totalErrors > 0 
        ? Math.round((totalChars / (totalChars + totalErrors)) * 100) 
        : 100;

      setLiveWpm(currentWpm);
      liveWpmRef.current = currentWpm;
      setLiveAccuracy(currentAcc);

      chartDataRef.current.push({
        second: elapsed,
        wpm: currentWpm,
        rawWpm: currentWpm,
        errors: totalErrors,
      });

      // Time limit check in time mode (executed outside setState)
      if (targetMode === 'time' && elapsed >= timeLimit) {
        if (timerRef.current) clearInterval(timerRef.current);
        finalizeTest(false);
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasStarted, isFinished, targetMode, timeLimit, finalizeTest]);

  // Global Keydown Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished) return;

      soundFx.unlock();

      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (e.key === 'Tab') {
        e.preventDefault();
        initWordStream();
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        finalizeTest(true);
        return;
      }

      // Spacebar: smoothly consume Space so typists' muscle memory between words is not penalized!
      if (e.key === ' ') {
        e.preventDefault();
        return;
      }

      if (e.key.length === 1) {
        e.preventDefault();
        handleKeyStrike(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyStrike, isFinished, initWordStream, finalizeTest]);

  // Screen Shake Spring Decay
  useEffect(() => {
    if (screenTrauma <= 0) return;
    const interval = setInterval(() => {
      setScreenTrauma((prev) => Math.max(0, prev * 0.82 - 0.2));
    }, 16);
    return () => clearInterval(interval);
  }, [screenTrauma]);

  // Flash Alpha Fade Decay
  useEffect(() => {
    if (flashAlpha <= 0) return;
    const interval = setInterval(() => {
      setFlashAlpha((prev) => Math.max(0, prev - 0.08));
    }, 16);
    return () => clearInterval(interval);
  }, [flashAlpha]);

  // Floating Badges Animation Decay
  useEffect(() => {
    if (floatingBadges.length === 0) return;
    const interval = setInterval(() => {
      setFloatingBadges((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y - 1.5, alpha: b.alpha - 0.04 }))
          .filter((b) => b.alpha > 0)
      );
    }, 24);
    return () => clearInterval(interval);
  }, [floatingBadges]);

  // Main High-Performance Physics Loop (Canvas Shards, Shockwaves, Conveyor Movement)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const renderLoop = (time: number) => {
      if (!isRunning) return;

      if (lastTimeRef.current === 0) {
        lastTimeRef.current = time;
      }
      const dtMs = Math.min(50, time - lastTimeRef.current);
      lastTimeRef.current = time;
      const dtSec = dtMs / 1000;

      let effectiveDtSec = dtSec;
      if (hitStopRemainingRef.current > 0) {
        hitStopRemainingRef.current -= dtMs;
        effectiveDtSec = 0; // Frozen!
      }

      // 1. Move Words horizontally if active and not frozen
      if (hasStarted && !isFinishedRef.current && effectiveDtSec > 0) {
        const baseSpeed = getSpeedPxPerSec(comboStreak);
        const effectiveSpeed = baseSpeed + surgeVelocityRef.current;
        if (surgeVelocityRef.current > 0) {
          // Surge smoothly decays back to baseline over ~300ms
          surgeVelocityRef.current = Math.max(0, surgeVelocityRef.current - dtMs * 0.45);
        }
        const shiftAmount = effectiveSpeed * effectiveDtSec;

        let activeIdx = activeWordIndexRef.current;
        let activeChanged = false;

        for (let i = 0; i < wordsRef.current.length; i++) {
          const word = wordsRef.current[i];
          if (word.status === 'shattered' || word.status === 'escaped') continue;

          word.x -= shiftAmount;

          // Only escape when completely off-screen to the left (x + width < -20)
          if (word.x + word.width < -20) {
            word.status = 'escaped';
            soundFx.playBreachEscape();
            setComboStreak(0);
            setEscapedCount((ec) => {
              const nextVal = ec + 1;
              if (targetMode === 'survival' && nextVal >= maxSurvivalBreaches) {
                setTimeout(() => finalizeTest(false), 200);
              }
              return nextVal;
            });

            if (i === activeIdx) {
              activeIdx = i + 1;
              activeChanged = true;
              if (wordsRef.current[activeIdx]) {
                wordsRef.current[activeIdx].status = 'active';
              }
            }
          }
        }

        if (activeChanged) {
          activeWordIndexRef.current = activeIdx;
          setActiveWordIndex(activeIdx);
        }

        // Auto-replenish queued words if running low
        const remainingQueued = wordsRef.current.filter((w) => w.status === 'queued' || w.status === 'active').length;
        if (remainingQueued < 10) {
          const extraWords = getRandomWords(25, { punctuation: settings.punctuation, numbers: settings.numbers }, settings.language);
          const lastWord = wordsRef.current[wordsRef.current.length - 1];
          const replenishmentGap = streamDensity === 'relaxed' ? 250 : streamDensity === 'rush' ? 110 : 180;
          let nextSpawnX = (lastWord ? Math.max(900, lastWord.x + lastWord.width) : 900) + replenishmentGap;
          extraWords.forEach((ew, eIdx) => {
            const eGraphemes = splitGraphemes(ew);
            const approxW = Math.max(90, eGraphemes.length * 24 + 32);
            wordsRef.current.push({
              id: `word_esc_rep_${Date.now()}_${eIdx}`,
              original: ew,
              graphemes: eGraphemes,
              crackedGraphemes: new Array(eGraphemes.length).fill(false),
              x: nextSpawnX,
              y: 130,
              width: approxW,
              status: 'queued',
            });
            nextSpawnX += approxW + replenishmentGap;
          });
        }

        setWords([...wordsRef.current]);
      }

      // 2. Clear & Render Canvas Particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const floorY = canvas.height - 18;

      // Update & Render Shards
      const aliveShards: Shard[] = [];
      for (const shard of shardsRef.current) {
        if (effectiveDtSec > 0) {
          shard.x += shard.vx;
          shard.y += shard.vy;
          shard.vy += 0.52; // Gravity
          shard.vx *= 0.985; // Air friction
          shard.angle += shard.spin;
          shard.alpha -= shard.decay;

          if (shard.y >= floorY && shard.bounceCount < 2) {
            shard.y = floorY;
            shard.vy = -shard.vy * 0.38;
            shard.vx *= 0.8;
            shard.spin *= 0.6;
            shard.bounceCount += 1;
          }
        }

        if (shard.alpha > 0.02) {
          ctx.save();
          ctx.translate(shard.x, shard.y);
          ctx.rotate(shard.angle);
          ctx.globalAlpha = shard.alpha;

          ctx.beginPath();
          shard.vertices.forEach((v, idx) => {
            if (idx === 0) ctx.moveTo(v.x, v.y);
            else ctx.lineTo(v.x, v.y);
          });
          ctx.closePath();

          ctx.fillStyle = shard.color;
          ctx.shadowColor = shard.glowColor;
          ctx.shadowBlur = 8;
          ctx.fill();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.restore();
          aliveShards.push(shard);
        }
      }
      shardsRef.current = aliveShards;

      // Update & Render Sparks
      const aliveSparks: Spark[] = [];
      for (const sp of sparksRef.current) {
        if (effectiveDtSec > 0) {
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.vy += 0.25;
          sp.alpha -= 0.035;
        }

        if (sp.alpha > 0.05) {
          ctx.save();
          ctx.globalAlpha = sp.alpha;
          ctx.fillStyle = sp.color;
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          aliveSparks.push(sp);
        }
      }
      sparksRef.current = aliveSparks;

      // Update & Render Shockwaves
      const aliveShockwaves: Shockwave[] = [];
      for (const sw of shockwavesRef.current) {
        if (effectiveDtSec > 0) {
          sw.radius += (sw.maxRadius - sw.radius) * 0.18 + 2.5;
          sw.alpha -= 0.04;
        }

        if (sw.alpha > 0.02 && sw.radius < sw.maxRadius) {
          ctx.save();
          ctx.globalAlpha = sw.alpha;
          ctx.strokeStyle = sw.color;
          ctx.lineWidth = sw.lineWidth;
          ctx.shadowColor = sw.color;
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
          aliveShockwaves.push(sw);
        }
      }
      shockwavesRef.current = aliveShockwaves;

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [
    hasStarted, 
    isFinished, 
    comboStreak, 
    getSpeedPxPerSec,
    settings.language,
    settings.numbers,
    settings.punctuation,
    targetMode,
    maxSurvivalBreaches,
    streamDensity,
    finalizeTest
  ]);

  // Adjust canvas size to parent container
  useEffect(() => {
    const handleResize = () => {
      if (!arenaRef.current || !canvasRef.current) return;
      canvasRef.current.width = arenaRef.current.clientWidth;
      canvasRef.current.height = arenaRef.current.clientHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleArenaClick = () => {
    soundFx.unlock();
    hiddenInputRef.current?.focus();
  };

  // Sound test handler
  const handleTestSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.unlock();
    soundFx.playShatterCrack(soundProfile, 1);
  };

  const shakeX = screenTrauma > 0 ? (Math.random() - 0.5) * screenTrauma * 1.5 : 0;
  const shakeY = screenTrauma > 0 ? (Math.random() - 0.5) * screenTrauma * 1.5 : 0;
  const shakeTransform = `translate(${shakeX}px, ${shakeY}px)`;

  return (
    <div className="w-full flex flex-col items-center select-none font-mono">
      
      {/* Top HUD Telemetry Panel */}
      <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 bg-[var(--bg-panel)] rounded-t-2xl neo-extruded text-xs">
        
        {/* Left Status & Goal */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="px-2.5 py-1 rounded-xl neo-inset text-amber-300 flex items-center gap-1.5 font-bold tracking-wider">
            <Zap className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>SHATTER STREAM</span>
          </div>

          <div className="flex items-center gap-1 text-[var(--text-dim)]">
            <span>SPEED:</span>
            <span className="font-bold text-amber-300 uppercase">{speedPreset}</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-[var(--text-dim)]">
            <span>GOAL:</span>
            <span className="font-bold text-[var(--text-main)] uppercase">{targetMode}</span>
          </div>

          {/* Sound Profile + Test Button */}
          <div className="hidden sm:flex items-center gap-1.5 text-[var(--text-dim)]">
            <span>SOUND:</span>
            <span className="font-bold text-[var(--text-main)] capitalize">{soundProfile}</span>
            <button
              onClick={handleTestSound}
              title="Test audio"
              className="px-2 py-0.5 rounded-lg neo-btn text-[10px] text-[var(--text-main)] flex items-center gap-1 transition-all"
            >
              <Volume2 className="w-3 h-3 text-amber-400" />
              <span>Test</span>
            </button>
          </div>
        </div>

        {/* Live APM, Accuracy, and Progress Telemetry */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="text-right px-2.5 py-1 rounded-xl neo-inset">
            <div className="text-[9px] text-[var(--text-dim)] uppercase">Live WPM</div>
            <div className={`text-sm sm:text-base font-bold transition-all ${
              liveWpm >= 100
                ? 'text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)] scale-105'
                : liveWpm >= 70
                ? 'text-cyan-300 drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]'
                : 'text-[var(--accent-tactical)]'
            }`}>
              {liveWpm}
            </div>
          </div>

          {bestWpm > 0 && (
            <div className="hidden md:flex flex-col text-right px-2.5 py-1 rounded-xl neo-inset">
              <div className="text-[9px] text-[var(--text-dim)] uppercase flex items-center justify-end gap-1">
                <Trophy className="w-2.5 h-2.5 text-amber-500" />
                <span>Best</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-amber-500/90">
                {bestWpm}
              </div>
            </div>
          )}

          <div className="text-right px-2.5 py-1 rounded-xl neo-inset">
            <div className="text-[9px] text-[var(--text-dim)] uppercase">Accuracy</div>
            <div className="text-sm sm:text-base font-bold text-[var(--text-main)]">
              {liveAccuracy}%
            </div>
          </div>

          <div className="text-right px-2.5 py-1 rounded-xl neo-inset">
            <div className="text-[9px] text-[var(--text-dim)] uppercase">
              {targetMode === 'time' ? 'Time Left' : targetMode === 'words' ? 'Shattered' : 'Shields'}
            </div>
            <div className={`text-sm sm:text-base font-bold ${
              targetMode === 'survival'
                ? (maxSurvivalBreaches - escapedCount <= 2 ? 'text-red-400 animate-pulse' : 'text-emerald-400')
                : 'text-amber-400'
            }`}>
              {targetMode === 'time'
                ? `${Math.max(0, timeLimit - timeElapsed)}s`
                : targetMode === 'words'
                ? `${shatteredCount} / ${targetWordsCount}`
                : (
                  <span className="flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                    <span>{Math.max(0, maxSurvivalBreaches - escapedCount)} / {maxSurvivalBreaches}</span>
                  </span>
                )}
            </div>
          </div>

          {/* Combo Multiplier Badge */}
          <div className={`px-2.5 py-1 rounded-xl neo-inset flex items-center gap-1 font-bold transition-all ${
            comboStreak >= 10 
              ? 'text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)] animate-pulse'
              : comboStreak >= 5 
              ? 'text-cyan-300'
              : 'text-[var(--text-dim)]'
          }`}>
            <Flame className={`w-3.5 h-3.5 ${comboStreak >= 5 ? 'text-amber-400' : 'text-[var(--text-dim)]'}`} />
            <span>{comboStreak}x</span>
          </div>

          {/* Quick Restart */}
          <button
            onClick={initWordStream}
            title="Restart Stream (Tab)"
            className="p-2 rounded-xl neo-btn text-[var(--text-dim)] hover:text-[var(--text-main)] transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Kinetic Firing Arena Corridor */}
      <div
        ref={arenaRef}
        onClick={handleArenaClick}
        style={{
          transform: shakeTransform,
          transition: screenTrauma > 0 ? 'none' : 'transform 0.15s ease-out',
        }}
        className={`w-full max-w-5xl h-[280px] sm:h-[340px] bg-[var(--bg-input)] neo-inset-deep rounded-b-2xl relative overflow-hidden cursor-text ${
          colorDrainActive ? 'saturate-[0.15] contrast-[1.4] filter' : ''
        }`}
      >
        {/* Zero-latency mobile virtual keyboard & desktop IME input overlay */}
        <input
          id="shatter-mobile-input"
          ref={hiddenInputRef}
          type="text"
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => {
            const val = e.target.value;
            if (val.length > 0) {
              const char = val[val.length - 1];
              if (char !== ' ') {
                handleKeyStrike(char);
              }
              e.target.value = '';
            }
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-text z-30"
          style={{ fontSize: '16px' }}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Shatter Stream kinetic typing test input"
        />

        {/* Top & Bottom Magnetic Acceleration Hazard Rails */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[repeating-linear-gradient(90deg,rgba(234,179,8,0.25),rgba(234,179,8,0.25)_15px,transparent_15px,transparent_30px)] border-b border-[var(--border-subtle)] z-10 opacity-70" />
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-[repeating-linear-gradient(90deg,rgba(56,189,248,0.25),rgba(56,189,248,0.25)_15px,transparent_15px,transparent_30px)] border-t border-[var(--border-subtle)] z-10 opacity-70" />

        {/* Tactical Crosshair / Impact Target Zone Guide (x = 70px on mobile, 180px on desktop) */}
        <div className="absolute top-0 bottom-0 left-[70px] sm:left-[180px] w-0.5 bg-gradient-to-b from-cyan-400 via-amber-400 to-cyan-400 z-10 opacity-80 shadow-[0_0_12px_rgba(56,189,248,0.8)] pointer-events-none">
          <div className="absolute -top-1 -left-2 text-[10px] font-bold text-cyan-300 tracking-wider uppercase px-1 rounded bg-black/70 border border-cyan-500/50">
            FIRING ZONE
          </div>
          <div className="absolute -bottom-1 -left-2 text-[10px] font-bold text-amber-300 tracking-wider uppercase px-1 rounded bg-black/70 border border-amber-500/50">
            LOCK RETICLE
          </div>
        </div>

        {/* Perspective Background Grid Lines */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, var(--border-subtle) 1px, transparent 1px), linear-gradient(to bottom, var(--border-subtle) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Full-Bleed HTML5 Physics Shard Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-20"
        />

        {/* Fullscreen Stark Anime Impact Frame (Monochrome Inverted Flash for 45ms) */}
        {impactFrameActive && (
          <div className="absolute inset-0 bg-black z-50 flex items-center justify-center pointer-events-none mix-blend-difference overflow-hidden">
            <svg className="w-full h-full opacity-90 stroke-white" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="0" y1="0" x2="50" y2="50" strokeWidth="0.8" />
              <line x1="100" y1="0" x2="50" y2="50" strokeWidth="0.8" />
              <line x1="0" y1="100" x2="50" y2="50" strokeWidth="0.8" />
              <line x1="100" y1="100" x2="50" y2="50" strokeWidth="0.8" />
              <line x1="50" y1="0" x2="50" y2="50" strokeWidth="1.2" />
              <line x1="50" y1="100" x2="50" y2="50" strokeWidth="1.2" />
              <line x1="0" y1="50" x2="50" y2="50" strokeWidth="1.2" />
              <line x1="100" y1="50" x2="50" y2="50" strokeWidth="1.2" />
            </svg>
          </div>
        )}

        {/* Flash Frame Bloom Overlay */}
        {flashAlpha > 0 && (
          <div 
            className="absolute inset-0 bg-white pointer-events-none z-40 transition-opacity"
            style={{ opacity: flashAlpha }}
          />
        )}

        {/* Floating Scores & Combo Badges */}
        {floatingBadges.map((badge) => (
          <div
            key={badge.id}
            className="absolute font-black tracking-wider text-xs sm:text-sm pointer-events-none z-30 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            style={{
              left: `${badge.x}px`,
              top: `${badge.y}px`,
              color: badge.color,
              opacity: badge.alpha,
              transform: `scale(${badge.scale})`,
            }}
          >
            {badge.text}
          </div>
        ))}

        {/* Horizontal Moving Words Conveyor */}
        <div className="absolute inset-0 pointer-events-none">
          {words.map((word, wIdx) => {
            if (word.status === 'shattered' || word.status === 'escaped') return null;
            const isActive = wIdx === activeWordIndex;
            const uncrackedIdx = word.crackedGraphemes.findIndex((c) => !c);

            return (
              <div
                key={word.id}
                className={`absolute flex items-center transition-opacity duration-150 ${
                  isActive ? 'opacity-100 z-20' : 'opacity-60 z-10'
                }`}
                style={{
                  left: `${word.x}px`,
                  top: `${word.y}px`,
                }}
              >
                {/* Active Target Reticle Bracket Indicator */}
                {isActive && (
                  <div className="absolute -left-6 -top-3 -bottom-3 -right-6 rounded border border-cyan-400/60 bg-cyan-950/20 shadow-[0_0_15px_rgba(56,189,248,0.3)] animate-pulse pointer-events-none">
                    <span className="absolute -top-2.5 left-2 px-1 text-[8px] bg-black/80 text-cyan-300 font-bold border border-cyan-500/40 rounded uppercase">
                      TARGET LOCKED
                    </span>
                  </div>
                )}

                {/* Individual Characters & Fracture Animations */}
                <div className="flex items-center tracking-wide text-2xl sm:text-3xl font-bold font-mono">
                  {word.graphemes.map((char, cIdx) => {
                    const isCracked = word.crackedGraphemes[cIdx];
                    const isNextTarget = isActive && cIdx === uncrackedIdx;

                    return (
                      <span
                        key={cIdx}
                        className={`relative inline-block px-0.5 transition-all ${
                          isCracked
                            ? 'text-transparent scale-95'
                            : isNextTarget
                            ? 'text-amber-300 scale-110 drop-shadow-[0_0_12px_rgba(234,179,8,0.9)]'
                            : isActive
                            ? 'text-[var(--text-main)]'
                            : 'text-[var(--text-dim)]'
                        }`}
                      >
                        {char}

                        {/* Pulsing Target Reticle Indicator on Expected Letter */}
                        {isNextTarget && (
                          <>
                            <span className="absolute -bottom-1.5 left-0 right-0 h-1 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(234,179,8,1)] animate-pulse" />
                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rotate-45 animate-ping" />
                          </>
                        )}

                        {/* Fractured & Falling Text Pieces */}
                        {isCracked && (
                          <>
                            <span
                              className="absolute inset-0 text-amber-300 font-black pointer-events-none transition-all duration-300 drop-shadow-[0_0_6px_rgba(234,179,8,0.5)]"
                              style={{
                                clipPath: 'polygon(0% 0%, 100% 0%, 100% 45%, 0% 60%)',
                                transform: 'translate(-5px, -8px) rotate(-14deg)',
                                opacity: 0.35,
                              }}
                            >
                              {char}
                            </span>

                            <span
                              className="absolute inset-0 text-amber-500 font-black pointer-events-none transition-all duration-500"
                              style={{
                                clipPath: 'polygon(0% 60%, 100% 45%, 100% 100%, 0% 100%)',
                                transform: 'translate(4px, 18px) rotate(22deg)',
                                opacity: 0.2,
                              }}
                            >
                              {char}
                            </span>

                            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-amber-400/90" viewBox="0 0 20 28">
                              <polyline points="1,15 8,13 11,17 19,12" fill="none" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Start / Unfocused Overlay */}
        {!hasStarted && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center gap-2 z-40">
            <div className="text-sm sm:text-base font-bold text-amber-300 tracking-wider flex items-center gap-2 animate-bounce">
              <Crosshair className="w-5 h-5 text-cyan-400" />
              <span>CLICK OR STRIKE ANY KEY TO COMMENCE HORIZON STREAM</span>
            </div>
            <div className="text-xs text-[var(--text-dim)] max-w-md text-center px-4">
              Type the incoming target words before they breach the perimeter. Every keystroke shatters fragments with intense kinetic force!
            </div>
          </div>
        )}

        {!isFocused && hasStarted && !isFinished && (
          <div 
            onClick={handleArenaClick}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-40 cursor-pointer"
          >
            <div className="px-4 py-2 rounded bg-[var(--bg-panel)] border border-amber-500/50 text-amber-300 font-bold text-xs shadow-xl animate-pulse">
              CLICK OR TAP HERE TO RE-FOCUS ARENA
            </div>
          </div>
        )}

        {/* Finished Overlay with Start Again CTA */}
        {isFinished && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="max-w-md w-full p-6 sm:p-8 rounded-2xl neo-extruded flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-2xl neo-inset flex items-center justify-center text-amber-400">
                <Trophy className="w-8 h-8 text-amber-400" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-amber-400 tracking-wider">
                TEST COMPLETE!
              </div>
              <div className="text-xs sm:text-sm text-[var(--text-dim)] font-mono">
                {shatteredCount} words shattered • {liveWpm} WPM • {liveAccuracy}% ACC
              </div>
              <button
                onClick={() => initWordStream()}
                className="mt-3 px-8 py-3.5 rounded-2xl neo-btn bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-500 hover:from-indigo-400 hover:to-indigo-500 text-white font-black text-sm sm:text-base tracking-wider flex items-center gap-2.5 hover:brightness-110 shadow-[0_4px_24px_rgba(99,102,241,0.5)] cursor-pointer transition-all active:scale-95 ring-1 ring-white/20"
              >
                <RotateCcw className="w-5 h-5 text-white" />
                <span className="text-white font-black tracking-wider">START AGAIN</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tactical Sub-Telemetry Footer */}
      <div className="w-full max-w-5xl mt-2 flex flex-wrap items-center justify-between text-[11px] text-[var(--text-dim)] px-2">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>VFX: Impact Frames, Color Drain, Flash Bloom & 65ms Hit-Stop Active</span>
        </span>
        <span className="font-semibold text-amber-400/90">
          MAX COMBO STREAK: {highestStreak}x
        </span>
      </div>

    </div>
  );
};
