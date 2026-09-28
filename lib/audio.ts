import { SoundType } from './types';

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private soundType: SoundType = 'thock';
  private volume: number = 0.5;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setSoundType(type: SoundType) {
    this.soundType = type;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  // Play keystroke sound based on current selected switch type
  public playKey(key: string = '') {
    if (this.soundType === 'off' || this.volume <= 0) return;
    this.initContext();
    if (!this.ctx) return;

    const isSpace = key === ' ';
    const isEnter = key === 'Enter';
    const now = this.ctx.currentTime;

    // Pitch jitter for natural acoustic resonance
    const pitchJitter = 0.95 + Math.random() * 0.1;

    switch (this.soundType) {
      case 'thock':
        this.playThock(now, isSpace, pitchJitter);
        break;
      case 'clicky':
        this.playClicky(now, isSpace || isEnter, pitchJitter);
        break;
      case 'topre':
        this.playTopre(now, isSpace, pitchJitter);
        break;
      case 'arcade':
        this.playArcade(now, isSpace, pitchJitter);
        break;
    }
  }

  // Linear / Thocky mechanical switch (Deep low-frequency clack)
  private playThock(now: number, isSpace: boolean, jitter: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isSpace ? 450 : 600, now);

    const baseFreq = (isSpace ? 110 : 155) * jitter;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.05);

    const peakVol = (isSpace ? 0.35 : 0.28) * this.volume;
    gain.gain.setValueAtTime(peakVol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (isSpace ? 0.07 : 0.05));

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Tactile Clicky switch (Cherry Blue style click + clack)
  private playClicky(now: number, isSpace: boolean, jitter: number) {
    if (!this.ctx) return;

    // 1. High frequency click
    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    clickOsc.type = 'sine';
    clickOsc.frequency.setValueAtTime(2600 * jitter, now);
    clickOsc.frequency.exponentialRampToValueAtTime(800, now + 0.015);

    clickGain.gain.setValueAtTime(0.22 * this.volume, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

    clickOsc.connect(clickGain);
    clickGain.connect(this.ctx.destination);
    clickOsc.start(now);
    clickOsc.stop(now + 0.025);

    // 2. Bottom out clack
    const bodyOsc = this.ctx.createOscillator();
    const bodyGain = this.ctx.createGain();
    bodyOsc.type = 'triangle';
    bodyOsc.frequency.setValueAtTime((isSpace ? 160 : 220) * jitter, now + 0.005);
    bodyOsc.frequency.exponentialRampToValueAtTime(70, now + 0.04);

    bodyGain.gain.setValueAtTime(0.18 * this.volume, now + 0.005);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    bodyOsc.connect(bodyGain);
    bodyGain.connect(this.ctx.destination);
    bodyOsc.start(now + 0.005);
    bodyOsc.stop(now + 0.06);
  }

  // Topre Electro-Capacitive switch (Damped rounded dome sound)
  private playTopre(now: number, isSpace: boolean, jitter: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const baseFreq = (isSpace ? 140 : 190) * jitter;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.06);

    gain.gain.setValueAtTime(0.25 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  // Retro Arcade 8-bit blip
  private playArcade(now: number, isSpace: boolean, jitter: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    const baseFreq = (isSpace ? 280 : 440) * jitter;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.03);

    gain.gain.setValueAtTime(0.12 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.045);
  }

  // Tactile Error Sound (Subtle low buzz alert)
  public playError() {
    if (this.soundType === 'off' || this.volume <= 0) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(95, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.08);

    gain.gain.setValueAtTime(0.2 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Streak Combo Fanfare (Tactical ascending chime)
  public playStreakMilestone(multiplier: number) {
    if (this.soundType === 'off' || this.volume <= 0) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const freqs = multiplier >= 3 ? [523.25, 659.25, 783.99, 1046.50] : [440, 554.37, 659.25];

    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const startTime = now + idx * 0.06;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.15 * this.volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  }

  // Victory / Completion sound
  public playComplete() {
    if (this.soundType === 'off' || this.volume <= 0) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = now + i * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.18 * this.volume, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(noteTime);
      osc.stop(noteTime + 0.35);
    });
  }
}

export const soundFx = new SoundSynthesizer();
