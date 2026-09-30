'use client';

import React, { useState } from 'react';
import { 
  Clock, 
  AlignLeft, 
  Quote, 
  Swords, 
  Hash, 
  AtSign, 
  Skull, 
  Globe,
  ChevronDown
} from 'lucide-react';
import { TestMode, TimeOption, WordOption, CaretStyle, TestSettings } from '@/lib/types';
import { SUPPORTED_LANGUAGES, getLanguageInfo } from '@/lib/languages';

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
  const [showLangMenu, setShowLangMenu] = useState(false);
  const currentLang = settings.language || 'en';
  const currentLangInfo = getLanguageInfo(currentLang);

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
    <div className={`w-full flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono shadow-sm transition-opacity ${
      disabled ? 'opacity-40 pointer-events-none' : 'opacity-100'
    }`}>
      
      {/* Backdrop to close language menu */}
      {showLangMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowLangMenu(false)}
        />
      )}

      {/* Language Selector Pill */}
      <div className="relative shrink-0">
        <button
          onClick={() => setShowLangMenu(!showLangMenu)}
          title="Select Language & Word Bank"
          className="px-2 sm:px-2.5 py-1 rounded flex items-center gap-1 sm:gap-1.5 bg-[var(--bg-panel)] border border-[var(--border-subtle)] text-[var(--text-main)] hover:border-[var(--accent-tactical)]/50 transition-colors shadow-sm whitespace-nowrap"
        >
          <Globe className="w-3.5 h-3.5 text-[var(--accent-tactical)]" />
          <span className="text-xs">{currentLangInfo.flag}</span>
          <span className="font-bold text-[var(--accent-tactical)] uppercase text-[11px] sm:text-xs">{currentLang}</span>
          <ChevronDown className="w-3 h-3 text-[var(--text-faint)]" />
        </button>

        {showLangMenu && (
          <div className="absolute left-0 mt-1 w-48 max-w-[calc(100vw-2.5rem)] rounded bg-[var(--bg-panel)] border border-[var(--border-strong)] p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] px-2 py-1 border-b border-[var(--border-subtle)] mb-1 flex items-center justify-between">
              <span>Language Bank</span>
              <span>8 Localized</span>
            </div>
            <div className="space-y-0.5">
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    onUpdateSettings({ language: l.code });
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between transition-colors ${
                    currentLang === l.code
                      ? 'bg-[var(--accent-tactical)]/15 text-[var(--accent-tactical)] font-bold'
                      : 'text-[var(--text-dim)] hover:bg-[var(--bg-input)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{l.flag}</span>
                    <span>{l.nativeName}</span>
                  </span>
                  <span className="text-[10px] uppercase font-mono text-[var(--text-faint)]">{l.code}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="h-4 w-px bg-[var(--border-subtle)] shrink-0 hidden lg:block" />
      
      {/* Primary Mode Selector */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-1 bg-[var(--bg-panel)] p-1 rounded border border-[var(--border-subtle)]">
        {modes.map((m) => {
          const isActive = settings.mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onUpdateSettings({ mode: m.id })}
              className={`px-1.5 sm:px-2.5 py-1 rounded flex items-center gap-1 sm:gap-1.5 transition-all whitespace-nowrap text-xs ${
                isActive
                  ? 'bg-[var(--keycap-bg)] text-[var(--accent-tactical)] border border-[var(--border-strong)] font-bold shadow-sm'
                  : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-input)]'
              }`}
            >
              {m.icon}
              <span>{m.label}</span>
              {m.id === 'boss' && (
                <span className="hidden sm:inline-block text-[9px] px-1 py-0.2 rounded bg-[var(--accent-danger)]/20 text-[var(--accent-danger)] border border-[var(--accent-danger)]/30">
                  COMBAT
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="h-4 w-px bg-[var(--border-subtle)] shrink-0 hidden lg:block" />

      {/* Sub-Options based on Mode */}
      {settings.mode === 'time' && (
        <div className="flex items-center gap-1 bg-[var(--bg-panel)] p-1 rounded border border-[var(--border-subtle)] shrink-0">
          {timeOptions.map((t) => (
            <button
              key={t}
              onClick={() => onUpdateSettings({ timeLimit: t })}
              className={`px-1.5 sm:px-2 py-1 rounded transition-colors whitespace-nowrap text-xs ${
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
        <div className="flex items-center gap-1 bg-[var(--bg-panel)] p-1 rounded border border-[var(--border-subtle)] shrink-0">
          {wordOptions.map((w) => (
            <button
              key={w}
              onClick={() => onUpdateSettings({ wordCount: w })}
              className={`px-1.5 sm:px-2 py-1 rounded transition-colors whitespace-nowrap text-xs ${
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

      <div className="h-4 w-px bg-[var(--border-subtle)] shrink-0 hidden lg:block" />

      {/* Modifiers: Punctuation, Numbers, Hardcore */}
      <div className="flex items-center gap-1 bg-[var(--bg-panel)] p-1 rounded border border-[var(--border-subtle)] shrink-0">
        
        {/* Punctuation */}
        <button
          onClick={() => onUpdateSettings({ punctuation: !settings.punctuation })}
          title="Toggle Punctuation"
          className={`px-1.5 sm:px-2 py-1 rounded flex items-center gap-1 transition-colors whitespace-nowrap ${
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
          className={`px-1.5 sm:px-2 py-1 rounded flex items-center gap-1 transition-colors whitespace-nowrap ${
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
          className={`px-1.5 sm:px-2 py-1 rounded flex items-center gap-1 transition-colors whitespace-nowrap ${
            settings.hardcore
              ? 'bg-[var(--accent-danger)]/20 text-[var(--accent-danger)] border border-[var(--accent-danger)]/50 font-bold'
              : 'text-[var(--text-faint)] hover:text-[var(--text-dim)]'
          }`}
        >
          <Skull className="w-3 h-3" />
          <span><span className="hidden sm:inline">sudden </span>death</span>
        </button>
      </div>

      <div className="h-4 w-px bg-[var(--border-subtle)] hidden lg:block" />

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
