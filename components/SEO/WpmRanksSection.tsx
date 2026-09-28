import React from 'react';
import { WPM_RANK_TIERS } from '@/lib/seo-data';
import { Award, Zap, ShieldCheck } from 'lucide-react';

export const WpmRanksSection: React.FC = () => {
  return (
    <section className="w-full max-w-5xl mx-auto my-12 font-mono" id="wpm-tiers">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-[var(--border-subtle)] mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent-tactical)] uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>GLOBAL APM BENCHMARKS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-main)] mt-1">
            Typing Speed Tiers & Percentile Distribution
          </h2>
        </div>
        <div className="text-xs text-[var(--text-dim)]">
          Validated against 100,000+ benchmark sessions
        </div>
      </div>

      {/* Grid of Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {WPM_RANK_TIERS.map((tier, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border ${tier.color} transition-all hover:border-[var(--accent-tactical)]/50`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 border border-current">
                {tier.tag}
              </span>
              <span className="text-xs font-bold opacity-80">{tier.percentile}</span>
            </div>

            <div className="text-lg font-black tracking-wide text-white mb-0.5">
              {tier.tier}
            </div>

            <div className="text-2xl font-black text-[var(--accent-tactical)] mb-2">
              {tier.range}
            </div>

            <p className="text-xs text-[var(--text-dim)] leading-relaxed">
              {tier.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Footnote Insight */}
      <div className="mt-4 p-3.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-start gap-3 text-xs text-[var(--text-dim)]">
        <ShieldCheck className="w-4 h-4 text-[var(--accent-success)] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[var(--text-main)]">Pro Tip for Velocity:</strong> Reaching 100+ WPM doesn't require moving your fingers twice as fast; it requires eliminating backspace hesitation and mastering multi-letter chunking (n-grams).
        </div>
      </div>

    </section>
  );
};
