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
  // Public unlock for user interaction
  public unlock() {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    this.ensureKeepAlive();
  }

  private keepAliveOsc: OscillatorNode | null = null;
  private ensureKeepAlive() {
    if (!this.ctx || this.keepAliveOsc) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      gain.gain.value = 0.00001; // virtually silent keepalive for Linux/mobile audio sinks
      osc.frequency.value = 1;
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      this.keepAliveOsc = osc;
    } catch {}
  }

  private getDestination(): AudioNode {
    if (!this.ctx) return null as unknown as AudioNode;
    return this.ctx.destination;
  }

  // Play Keystroke Fracture / Crack Sound (Satisfying Brittle Glass / Heavy Stone / Cyber Crack)
  public playShatterCrack(profile: 'crystal' | 'stone' | 'laser' = 'crystal', comboMultiplier: number = 1.0) {
    this.initContext();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        this.playShatterCrack(profile, comboMultiplier);
      }).catch(() => {});
      return;
    }

    try {
      const now = this.ctx.currentTime;
      const dest = this.getDestination();
      if (!dest) return;

      const vol = Math.max(0.4, this.volume > 0 ? this.volume : 0.65);
      const jitter = (0.94 + Math.random() * 0.12) * Math.min(1.25, 0.95 + comboMultiplier * 0.05);

      if (profile === 'crystal') {
        // 1. Sharp brittle high-frequency snap impulse (white noise burst)
        const bufferSize = Math.max(1, Math.floor(this.ctx.sampleRate * 0.018));
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.22));
        }
        const noiseSource = this.ctx.createBufferSource();
        noiseSource.buffer = buffer;

        const noiseFilter = this.ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(4900 * jitter, now);
        noiseFilter.Q.setValueAtTime(6, now);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.45 * vol, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);

        noiseSource.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(dest);
        noiseSource.start(now);
        noiseSource.stop(now + 0.025);

        // 2. Crystalline resonant tine ping (dual inharmonic sine ring)
        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(2850 * jitter, now);
        osc1.frequency.exponentialRampToValueAtTime(1600 * jitter, now + 0.035);

        gain1.gain.setValueAtTime(0.38 * vol, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc1.connect(gain1);
        gain1.connect(dest);
        osc1.start(now);
        osc1.stop(now + 0.055);

        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(4200 * jitter, now);
        gain2.gain.setValueAtTime(0.28 * vol, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc2.connect(gain2);
        gain2.connect(dest);
        osc2.start(now);
        osc2.stop(now + 0.04);

        // 3. Tactile sub-punch thud (triangle crunch)
        const punchOsc = this.ctx.createOscillator();
        const punchGain = this.ctx.createGain();
        punchOsc.type = 'triangle';
        punchOsc.frequency.setValueAtTime(175 * jitter, now);
        punchOsc.frequency.exponentialRampToValueAtTime(42, now + 0.03);

        punchGain.gain.setValueAtTime(0.42 * vol, now);
        punchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.038);

        punchOsc.connect(punchGain);
        punchGain.connect(dest);
        punchOsc.start(now);
        punchOsc.stop(now + 0.045);

        // 4. Spiderweb micro-crackle tick (secondary delayed micro-pop)
        const tickOsc = this.ctx.createOscillator();
        const tickGain = this.ctx.createGain();
        tickOsc.type = 'square';
        tickOsc.frequency.setValueAtTime(3200 * jitter, now + 0.008);
        tickGain.gain.setValueAtTime(0.18 * vol, now + 0.008);
        tickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.016);

        tickOsc.connect(tickGain);
        tickGain.connect(dest);
        tickOsc.start(now + 0.008);
        tickOsc.stop(now + 0.02);

      } else if (profile === 'stone') {
        // Heavy crunchy rock/granite fracture
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220 * jitter, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.06);

        gain.gain.setValueAtTime(0.48 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

        osc.connect(gain);
        gain.connect(dest);
        osc.start(now);
        osc.stop(now + 0.08);

        // Low-mid stone crunch noise
        const bufferSize = Math.max(1, Math.floor(this.ctx.sampleRate * 0.03));
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400 * jitter, now);
        filter.Q.setValueAtTime(4, now);

        const nGain = this.ctx.createGain();
        nGain.gain.setValueAtTime(0.42 * vol, now);
        nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        noise.connect(filter);
        filter.connect(nGain);
        nGain.connect(dest);
        noise.start(now);
        noise.stop(now + 0.045);

      } else {
        // Cyber / Mecha Laser Impact (high-tech snappy crack)
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(3800 * jitter, now);
        osc.frequency.exponentialRampToValueAtTime(240, now + 0.03);

        gain.gain.setValueAtTime(0.38 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(dest);
        osc.start(now);
        osc.stop(now + 0.045);
      }
    } catch (e) {
      console.error('Audio playShatterCrack error:', e);
    }
  }

  // Play Rewarding Word Shatter / Complete Obliteration Sound
  public playWordShatter(combo: number = 0, profile: 'crystal' | 'stone' | 'laser' = 'crystal') {
    this.initContext();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        this.playWordShatter(combo, profile);
      }).catch(() => {});
      return;
    }

    try {
      const now = this.ctx.currentTime;
      const dest = this.getDestination();
      if (!dest) return;

      const vol = Math.max(0.45, this.volume > 0 ? this.volume : 0.7);

      // 1. Deep Sub-Bass Seismic Boom (movie trailer impact weight)
      const isStone = profile === 'stone';
      const isLaser = profile === 'laser';
      const baseBoomFreq = isStone ? 85 : isLaser ? 135 : 110;

      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      const subFilter = this.ctx.createBiquadFilter();

      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(baseBoomFreq, now);
      subOsc.frequency.exponentialRampToValueAtTime(26, now + 0.32);

      subFilter.type = 'lowpass';
      subFilter.frequency.setValueAtTime(isStone ? 140 : 200, now);

      subGain.gain.setValueAtTime(0.55 * vol, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      subOsc.connect(subFilter);
      subFilter.connect(subGain);
      subGain.connect(dest);
      subOsc.start(now);
      subOsc.stop(now + 0.42);

      // 2. Glass Blast Shard Dispersion (sweeping noise shower)
      const noiseLen = Math.max(1, Math.floor(this.ctx.sampleRate * 0.16));
      const noiseBuf = this.ctx.createBuffer(1, noiseLen, this.ctx.sampleRate);
      const nData = noiseBuf.getChannelData(0);
      for (let i = 0; i < noiseLen; i++) {
        nData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (noiseLen * 0.28));
      }
      const blastNoise = this.ctx.createBufferSource();
      blastNoise.buffer = noiseBuf;

      const blastFilter = this.ctx.createBiquadFilter();
      blastFilter.type = 'bandpass';
      blastFilter.frequency.setValueAtTime(isStone ? 2800 : isLaser ? 7800 : 6200, now);
      blastFilter.frequency.exponentialRampToValueAtTime(1400, now + 0.14);
      blastFilter.Q.setValueAtTime(isStone ? 2.5 : 4.5, now);

      const blastGain = this.ctx.createGain();
      blastGain.gain.setValueAtTime(0.45 * vol, now);
      blastGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      blastNoise.connect(blastFilter);
      blastFilter.connect(blastGain);
      blastGain.connect(dest);
      blastNoise.start(now);
      blastNoise.stop(now + 0.2);

      // 3. Rewarding Crystalline Harmonic Chime (ascending celestial chord)
      let notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      if (combo >= 6) {
        notes = [880.00, 1108.73, 1318.51, 1760.00, 2217.46, 2637.02]; // A5 Major 9th
      } else if (combo >= 3) {
        notes = [659.25, 830.61, 987.77, 1318.51, 1661.22]; // E5 Major
      }

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const startTime = now + idx * 0.022; // Cascading arpeggio
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        const peakGain = (0.32 - idx * 0.025) * vol;
        gain.gain.setValueAtTime(peakGain, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.42);

        osc.connect(gain);
        gain.connect(dest);
        osc.start(startTime);
        osc.stop(startTime + 0.46);
      });

      // 4. Sonic Shockwave Ring Tone
      const waveOsc = this.ctx.createOscillator();
      const waveGain = this.ctx.createGain();
      waveOsc.type = 'triangle';
      waveOsc.frequency.setValueAtTime(340, now);
      waveOsc.frequency.exponentialRampToValueAtTime(80, now + 0.18);

      waveGain.gain.setValueAtTime(0.3 * vol, now);
      waveGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      waveOsc.connect(waveGain);
      waveGain.connect(dest);
      waveOsc.start(now);
      waveOsc.stop(now + 0.22);
    } catch (e) {
      console.error('Audio playWordShatter error:', e);
    }
  }

  // Play Dramatic Time Freeze / Vacuum Suction Pre-explosion Pop
  public playTimeFreezeSound() {
    this.initContext();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
      return;
    }

    try {
      const now = this.ctx.currentTime;
      const dest = this.getDestination();
      if (!dest) return;

      const vol = Math.max(0.35, this.volume > 0 ? this.volume : 0.6);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(60, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);

      gain.gain.setValueAtTime(0.24 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(gain);
      gain.connect(dest);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      console.error('Audio playTimeFreezeSound error:', e);
    }
  }

  // Play Word Escape / Breach Penalty Sizzle
  public playBreachEscape() {
    this.initContext();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
      return;
    }

    try {
      const now = this.ctx.currentTime;
      const dest = this.getDestination();
      if (!dest) return;

      const vol = Math.max(0.35, this.volume > 0 ? this.volume : 0.6);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.12);

      gain.gain.setValueAtTime(0.28 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(dest);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {
      console.error('Audio playBreachEscape error:', e);
    }
  }
}

export const soundFx = new SoundSynthesizer();

