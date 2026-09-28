'use client';

import React from 'react';
import { 
  Clock, 
  AlignLeft, 
  Quote, 
  Swords, 
  Hash, 
  AtSign, 
  Skull, 
  Terminal 
} from 'lucide-react';
import { TestMode, TimeOption, WordOption, CaretStyle, TestSettings } from '@/lib/types';

interface TestSettingsBarProps {
  settings: TestSettings;
  onUpdateSettings: (newSettings: Partial<TestSettings>) => void;
  disabled?: boolean;
}

export const TestSettingsBar: React.FC<TestSettingsBarProps> = ({
  settings,
  onUpdateSettings,
  disabled = false,
}) => {
  const modes: { id: TestMode; label: string; icon: React.ReactNode }[] = [
    { id: 'time', label: 'Time', icon: <Clock className="w-3.5 h-3.5" /> },
    { id: 'words', label: 'Words', icon: <AlignLeft className="w-3.5 h-3.5" /> },
    { id: 'quote', label: 'Quote', icon: <Quote className="w-3.5 h-3.5" /> },
    { id: 'boss', label: 'Boss Raid', icon: <Swords className="w-3.5 h-3.5 text-[var(--accent-danger)]" /> },
  ];

  const timeOptions: TimeOption[] = [15, 30, 60, 120];
  const wordOptions: WordOption[] = [10, 25, 50, 100];
  const caretOptions: { id: CaretStyle; label: string }[] = [
    { id: 'line', label: '|' },
    { id: 'block', label: '█' },
    { id: 'underline', label: '_' },
    { id: 'box', label: '[]' },
  ];

  return (
    <div className={`w-full flex flex-wrap items-center justify-center gap-2 p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono shadow-sm transition-opacity ${
      disabled ? 'opacity-40 pointer-events-none' : 'opacity-100'
    }`}>
      
      {/* Primary Mode Selector */}
      <div className="flex items-center gap-1 bg-[var(--bg-panel)] p-1 rounded border border-[var(--border-subtle)]">
        {modes.map((m) => {
          const isActive = settings.mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onUpdateSettings({ mode: m.id })}
              className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-[var(--keycap-bg)] text-[var(--accent-tactical)] border border-[var(--border-strong)] font-bold shadow-sm'
                  : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-input)]'
              }`}
            >
              {m.icon}
              <span>{m.label}</span>
              {m.id === 'boss' && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-[var(--accent-danger)]/20 text-[var(--accent-danger)] border border-[var(--accent-danger)]/30">
                  COMBAT
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="h-4 w-px bg-[var(--border-subtle)] hidden sm:block" />

      {/* Sub-Options based on Mode */}
      {settings.mode === 'time' && (
        <div className="flex items-center gap-1 bg-[var(--bg-panel)] p-1 rounded border border-[var(--border-subtle)]">
          {timeOptions.map((t) => (
            <button
              key={t}
              onClick={() => onUpdateSettings({ timeLimit: t })}
              className={`px-2 py-1 rounded transition-colors ${
                settings.timeLimit === t
                  ? 'bg-[var(--keycap-bg)] text-[var(--accent-tactical)] border border-[var(--border-strong)] font-bold'
                  : 'text-[var(--text-dim)] hover:text-[var(--text-main)]'
              }`}
            >
              {t}s
            </button>
          ))}
        </div>
      )}

      {settings.mode === 'words' && (
        <div className="flex items-center gap-1 bg-[var(--bg-panel)] p-1 rounded border border-[var(--border-subtle)]">
          {wordOptions.map((w) => (
            <button
              key={w}
              onClick={() => onUpdateSettings({ wordCount: w })}
              className={`px-2 py-1 rounded transition-colors ${
                settings.wordCount === w
                  ? 'bg-[var(--keycap-bg)] text-[var(--accent-tactical)] border border-[var(--border-strong)] font-bold'
                  : 'text-[var(--text-dim)] hover:text-[var(--text-main)]'
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      )}

      <div className="h-4 w-px bg-[var(--border-subtle)] hidden sm:block" />

      {/* Modifiers: Punctuation, Numbers, Hardcore */}
      <div className="flex items-center gap-1 bg-[var(--bg-panel)] p-1 rounded border border-[var(--border-subtle)]">
        
        {/* Punctuation */}
        <button
          onClick={() => onUpdateSettings({ punctuation: !settings.punctuation })}
          title="Toggle Punctuation"
          className={`px-2 py-1 rounded flex items-center gap-1 transition-colors ${
            settings.punctuation
              ? 'bg-[var(--accent-tactical)]/20 text-[var(--accent-tactical)] border border-[var(--accent-tactical)]/40 font-bold'
              : 'text-[var(--text-faint)] hover:text-[var(--text-dim)]'
          }`}
        >
          <AtSign className="w-3 h-3" />
          <span>punct</span>
        </button>

        {/* Numbers */}
        <button
          onClick={() => onUpdateSettings({ numbers: !settings.numbers })}
          title="Toggle Numbers"
          className={`px-2 py-1 rounded flex items-center gap-1 transition-colors ${
            settings.numbers
              ? 'bg-[var(--accent-tactical)]/20 text-[var(--accent-tactical)] border border-[var(--accent-tactical)]/40 font-bold'
              : 'text-[var(--text-faint)] hover:text-[var(--text-dim)]'
          }`}
        >
          <Hash className="w-3 h-3" />
          <span>nums</span>
        </button>

        {/* Hardcore / Sudden Death */}
        <button
          onClick={() => onUpdateSettings({ hardcore: !settings.hardcore })}
          title="Sudden Death: 1 typo = Instant Mission Abort!"
          className={`px-2 py-1 rounded flex items-center gap-1 transition-colors ${
            settings.hardcore
              ? 'bg-[var(--accent-danger)]/20 text-[var(--accent-danger)] border border-[var(--accent-danger)]/50 font-bold'
              : 'text-[var(--text-faint)] hover:text-[var(--text-dim)]'
          }`}
        >
          <Skull className="w-3 h-3" />
          <span>sudden death</span>
        </button>
      </div>

      <div className="h-4 w-px bg-[var(--border-subtle)] hidden md:block" />

      {/* Caret Style */}
      <div className="hidden md:flex items-center gap-1 bg-[var(--bg-panel)] p-1 rounded border border-[var(--border-subtle)]">
        <span className="text-[10px] text-[var(--text-faint)] px-1 uppercase tracking-wider">Caret</span>
        {caretOptions.map((c) => (
          <button
            key={c.id}
            onClick={() => onUpdateSettings({ caretStyle: c.id })}
            title={`Caret style: ${c.id}`}
            className={`px-1.5 py-0.5 rounded text-[11px] font-mono transition-colors ${
              settings.caretStyle === c.id
                ? 'bg-[var(--keycap-bg)] text-[var(--accent-tactical)] border border-[var(--border-strong)] font-bold'
                : 'text-[var(--text-faint)] hover:text-[var(--text-dim)]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

    </div>
  );
};
