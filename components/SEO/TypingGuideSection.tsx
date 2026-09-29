import React from 'react';
import { BookOpen } from 'lucide-react';
import { LanguageCode } from '@/lib/types';
import { getLocalizedContent } from '@/lib/seo-i18n';

interface TypingGuideSectionProps {
  lang?: LanguageCode;
}

export const TypingGuideSection: React.FC<TypingGuideSectionProps> = ({ lang = 'en' }) => {
  const content = getLocalizedContent(lang);

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
            {content.guideTitle}
          </h2>
          <p className="text-xs text-[var(--text-dim)] mt-1">
            {content.guideSubtitle}
          </p>
        </div>

        {/* Dynamic Protocol Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.guideSteps.map((step, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[var(--bg-panel)] border border-[var(--border-strong)] space-y-2 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded bg-[var(--bg-input)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-tactical)] font-black text-sm mb-2">
                  {`0${idx + 1}`}
                </div>
                <h3 className="font-bold text-sm text-[var(--text-main)] mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className="pt-2 border-t border-[var(--border-subtle)]/50 text-[11px] text-[var(--accent-tactical)] font-mono">
                {step.tip}
              </div>
            </div>
          ))}
        </div>

        {/* Switch Acoustics Engineering */}
        <div className="p-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
          <h3 className="text-sm font-bold text-[var(--text-main)] uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-tactical)]" />
            <span>Switch Acoustic Signatures & Actuation Ergonomics</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {switchGuides.map((sw, i) => (
              <div key={i} className="p-3 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-subtle)] space-y-2">
                <div className="font-bold text-xs text-[var(--text-main)]">
                  {sw.name}
                </div>
                <p className="text-[11px] text-[var(--text-dim)] leading-relaxed">
                  {sw.feel}
                </p>
                <div className="text-[10px] text-[var(--accent-tactical)] font-mono">
                  {sw.actuation}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
