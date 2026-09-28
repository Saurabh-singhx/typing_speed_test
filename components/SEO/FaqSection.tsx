'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/seo-data';

export const FaqSection: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="w-full max-w-5xl mx-auto my-12 font-mono" id="faq">
      
      {/* Header */}
      <div className="pb-3 border-b border-[var(--border-subtle)] mb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent-tactical)] uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>DEBRIEF & FAQ</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[var(--text-main)] mt-1">
          Frequently Asked Questions
        </h2>
        <p className="text-xs text-[var(--text-dim)] mt-1">
          Everything you need to know about typing speed measurement, APM formulas, and keyboard ergonomics.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndices.includes(idx);

          return (
            <div
              key={idx}
              className="rounded-lg bg-[var(--bg-panel)] border border-[var(--border-subtle)] overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleIndex(idx)}
                className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-[var(--bg-surface)] transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-sm text-[var(--text-main)]">
                  {item.question}
                </span>
                <span className="text-[var(--text-dim)] shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-[var(--text-dim)] leading-relaxed border-t border-[var(--border-subtle)]/50 bg-[var(--bg-input)]/30">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
