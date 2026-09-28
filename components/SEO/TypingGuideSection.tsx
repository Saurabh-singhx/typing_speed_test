import React from 'react';
import { BookOpen, CheckCircle2, Shield, Layers, Cpu, Terminal } from 'lucide-react';

export const TypingGuideSection: React.FC = () => {
  const switchGuides = [
    {
      name: 'Linear (Red / Black / Yellow)',
      feel: 'Smooth, unbroken travel with zero tactile bump. Preferred by competitive gamers and high-cadence typists for rapid actuation.',
      actuation: '45g - 60g force • 2.0mm pre-travel',
      sound: 'Acoustic thock / deep clack on bottom-out.'
    },
    {
      name: 'Tactile (Brown / Clear / Panda)',
      feel: 'Subtle mechanical bump at the actuation point. Ideal for writers and programmers who want confirmation without loud clatter.',
      actuation: '50g - 67g force • 2.0mm pre-travel',
      sound: 'Moderate, muted mechanical strike.'
    },
    {
      name: 'Clicky (Blue / Green / White)',
      feel: 'Crisp tactile resistance followed by an audible snap. Maximum auditory confirmation of keystrokes.',
      actuation: '55g - 65g force • 2.2mm pre-travel',
      sound: 'High-pitched mechanical snap & clack.'
    },
    {
      name: 'Electro-Capacitive (Topre)',
      feel: 'Cushioned rubber dome over a capacitive conical spring. Smooth tactile descent with a pillowy bottom-out.',
      actuation: '35g - 55g force • 4.0mm travel',
      sound: 'Damped acoustic "thock-thock" pop.'
    }
  ];

  return (
    <section className="w-full max-w-5xl mx-auto my-12 font-mono" id="typing-guide">
      <div className="space-y-8">
        
        {/* Section Heading */}
        <div className="pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent-tactical)] uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>OPERATIONAL MANUAL // CODEX</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-main)] mt-1">
            Tactical Touch Typing & Mechanical Engineering Guide
          </h2>
          <p className="text-xs text-[var(--text-dim)] mt-1">
            Fundamental ergonomics, finger anchoring, and switch acoustics for sustaining 100+ WPM without strain.
          </p>
        </div>

        {/* 3 Step Protocol Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-4 rounded-xl bg-[var(--bg-panel)] border border-[var(--border-strong)] space-y-2">
            <div className="w-8 h-8 rounded bg-[var(--bg-input)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-tactical)] font-black text-sm">
              01
            </div>
            <h3 className="font-bold text-sm text-[var(--text-main)]">
              Tactile Home Row Anchor
            </h3>
            <p className="text-xs text-[var(--text-dim)] leading-relaxed">
              Locate the physical homing nibs on the <strong className="text-[var(--text-main)]">F</strong> and <strong className="text-[var(--text-main)]">J</strong> keycaps. Left hand rests on <strong className="text-[var(--text-main)]">A-S-D-F</strong>; right hand rests on <strong className="text-[var(--text-main)]">J-K-L-;</strong>. After executing strokes on outer rings, always snap fingers back to the anchor.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-panel)] border border-[var(--border-strong)] space-y-2">
            <div className="w-8 h-8 rounded bg-[var(--bg-input)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-target)] font-black text-sm">
              02
            </div>
            <h3 className="font-bold text-sm text-[var(--text-main)]">
              Predictive Look-Ahead
            </h3>
            <p className="text-xs text-[var(--text-dim)] leading-relaxed">
              Elite typists don't look at the letter they are typing—their eyes are fixed 2 to 3 words ahead in the stream. This allows the brain to prepare the motor sequence for upcoming n-grams before your fingers complete the current word.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-panel)] border border-[var(--border-strong)] space-y-2">
            <div className="w-8 h-8 rounded bg-[var(--bg-input)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-success)] font-black text-sm">
              03
            </div>
            <h3 className="font-bold text-sm text-[var(--text-main)]">
              The 98% Accuracy Rule
            </h3>
            <p className="text-xs text-[var(--text-dim)] leading-relaxed">
              Speed without accuracy is an illusion. When you hit a typo, the brain stalls for 200-300ms, backspaces, and resets cadence. Practicing at 98%+ accuracy trains your neural pathways to type rhythmically without stumbling.
            </p>
          </div>

        </div>

        {/* Mechanical Switch Acoustic Comparison Table */}
        <div className="p-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)]">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-4 h-4 text-[var(--accent-tactical)]" />
            <h3 className="font-bold text-base text-[var(--text-main)]">
              Mechanical Switch Profiles & Acoustics
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {switchGuides.map((sw, i) => (
              <div
                key={i}
                className="p-3.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)] space-y-1.5"
              >
                <div className="font-bold text-xs text-[var(--accent-tactical)]">
                  {sw.name}
                </div>
                <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                  {sw.feel}
                </p>
                <div className="pt-1 text-[11px] text-[var(--text-faint)] flex flex-col gap-0.5">
                  <div>• Spec: {sw.actuation}</div>
                  <div>• Acoustic: {sw.sound}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
