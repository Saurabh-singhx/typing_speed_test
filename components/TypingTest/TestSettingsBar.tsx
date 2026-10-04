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
  ChevronDown,
  Zap,
  Gauge,
  Sparkles,
  ShieldAlert,
  Layers
} from 'lucide-react';
import { 
  TestMode, 
  TimeOption, 
  WordOption, 
  CaretStyle, 
  TestSettings,
  ShatterSpeed,
  ShatterFxIntensity,
  ShatterSoundProfile,
  ShatterTargetMode,
  ShatterStreamDensity
} from '@/lib/types';
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

  const modes: { id: TestMode; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'shatter', label: 'Shatter Stream', icon: <Zap className="w-3.5 h-3.5 text-amber-400" />, badge: 'ARCADE' },
    { id: 'time', label: 'Time', icon: <Clock className="w-3.5 h-3.5" /> },
    { id: 'words', label: 'Words', icon: <AlignLeft className="w-3.5 h-3.5" /> },
    { id: 'quote', label: 'Quote', icon: <Quote className="w-3.5 h-3.5" /> },
    { id: 'boss', label: 'Boss Raid', icon: <Swords className="w-3.5 h-3.5 text-[var(--accent-danger)]" />, badge: 'COMBAT' },
  ];

  const timeOptions: TimeOption[] = [15, 30, 60, 120];
  const wordOptions: WordOption[] = [10, 25, 50, 100];
  const shatterSpeedOptions: { id: ShatterSpeed; label: string; tooltip: string }[] = [
    { id: 'chill', label: '0.5x', tooltip: 'Warmup & Flow' },
    { id: 'slow', label: '0.8x', tooltip: 'Tactical Pacing' },
    { id: 'normal', label: '1.2x', tooltip: 'Balanced Standard' },
    { id: 'fast', label: '1.8x', tooltip: 'Rapid Velocity' },
    { id: 'hyper', label: '2.5x', tooltip: 'Hyper Velocity' },
    { id: 'insane', label: '3.2x', tooltip: 'Insane Overdrive' },
    { id: 'ramp', label: 'Ramp⚡', tooltip: 'APM dynamic speed scaling' },
  ];
  const shatterDensityOptions: { id: ShatterStreamDensity; label: string; tooltip: string }[] = [
    { id: 'relaxed', label: 'Spaced', tooltip: 'Wide word spacing' },
    { id: 'normal', label: 'Flow', tooltip: 'Natural tactical pacing' },
    { id: 'rush', label: 'Rush', tooltip: 'High-density word barrage' },
  ];
  const shatterSoundProfiles: { id: ShatterSoundProfile; label: string }[] = [
    { id: 'crystal', label: '💎 Crystal' },
    { id: 'stone', label: '🪨 Stone' },
    { id: 'laser', label: '⚡ Laser' },
    { id: 'glass', label: '🪟 Glass' },
  ];
  const fxOptions: { id: ShatterFxIntensity; label: string }[] = [
    { id: 'full', label: '💥 Full' },
    { id: 'balanced', label: '⚡ Balanced' },
    { id: 'minimal', label: '🎯 Minimal' },
  ];
  const shatterTargetOptions: { id: ShatterTargetMode; label: string; icon: React.ReactNode; tooltip: string }[] = [
    { id: 'time', label: 'Time', icon: <Clock className="w-3 h-3" />, tooltip: 'Time Attack: Score until clock expires' },
    { id: 'words', label: 'Words', icon: <AlignLeft className="w-3 h-3" />, tooltip: 'Word Quota: Obliterate a fixed quota of target words' },
    { id: 'survival', label: 'Survival', icon: <ShieldAlert className="w-3 h-3 text-red-400" />, tooltip: 'Survival: Endless accelerating waves with 5 perimeter breach lives' },
  ];
  const caretOptions: { id: CaretStyle; label: string }[] = [
    { id: 'line', label: '|' },
    { id: 'block', label: '█' },
    { id: 'underline', label: '_' },
    { id: 'box', label: '[]' },
  ];

  return (
    <div className={`w-full flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-2xl neo-extruded text-xs font-mono transition-opacity ${
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
          aria-label={`Select language. Currently ${currentLang}`}
          aria-haspopup="true"
          aria-expanded={showLangMenu}
          className="px-2.5 sm:px-3 py-1.5 rounded-xl flex items-center gap-1.5 neo-btn text-[var(--text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] transition-colors whitespace-nowrap"
        >
          <Globe className="w-3.5 h-3.5 text-[var(--accent-tactical)]" />
          <span className="text-xs">{currentLangInfo.flag}</span>
          <span className="font-bold text-[var(--accent-tactical)] uppercase text-[11px] sm:text-xs">{currentLang}</span>
          <ChevronDown className="w-3 h-3 text-[var(--text-faint)]" />
        </button>

        {showLangMenu && (
          <div
            role="menu"
            aria-label="Language selection"
            className="absolute left-0 mt-2 w-52 max-w-[calc(100vw-2.5rem)] rounded-2xl neo-extruded p-2 shadow-2xl z-50 animate-modal"
          >
            <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-dim)] px-2 py-1 border-b border-[var(--border-subtle)] mb-1 flex items-center justify-between">
              <span>Language Bank</span>
              <span>8 Localized</span>
            </div>
            <div className="space-y-0.5">
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  role="menuitem"
                  onClick={() => {
                    onUpdateSettings({ language: l.code });
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 min-h-[44px] rounded-xl text-xs flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] ${
                    currentLang === l.code
                      ? 'bg-[var(--accent-tactical)]/15 text-[var(--accent-tactical)] font-bold'
                      : 'text-[var(--text-dim)] hover:bg-[var(--bg-input)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{l.flag}</span>
                    <span>{l.nativeName}</span>
                  </span>
                  <span className="text-[11px] uppercase font-mono text-[var(--text-faint)]">{l.code}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="h-5 w-px bg-gradient-to-b from-transparent via-[var(--border-strong)] to-transparent shrink-0 hidden lg:block" />
      
      {/* Primary Mode Selector */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-1 neo-inset p-1 rounded-xl">
        {modes.map((m) => {
          const isActive = settings.mode === m.id;

          if (m.id === 'shatter') {
            return (
              <button
                key={m.id}
                onClick={() => onUpdateSettings({ mode: m.id })}
                aria-pressed={isActive}
                title="Shatter Stream: Kinetic destruction typing mode"
                className={`relative px-3 py-1.5 min-h-[36px] sm:min-h-[32px] rounded-xl flex items-center gap-1.5 transition-all whitespace-nowrap text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/25 via-amber-400/20 to-orange-500/25 text-amber-200 font-extrabold border border-amber-400/80 shadow-[0_0_18px_rgba(245,158,11,0.45)] ring-1 ring-amber-400/50 scale-[1.02]'
                    : 'text-amber-400/90 hover:text-amber-300 hover:bg-amber-500/10 border border-amber-500/20 hover:border-amber-400/40 font-semibold'
                }`}
              >
                <Zap className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400 fill-amber-400 animate-pulse drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'text-amber-400'}`} />
                <span>{m.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-black tracking-wider uppercase transition-all ${
                  isActive 
                    ? 'bg-amber-400/30 text-amber-200 border border-amber-400/60 shadow-[0_0_8px_rgba(245,158,11,0.3)]' 
                    : 'hidden sm:inline-block bg-amber-500/15 text-amber-300/90 border border-amber-500/30'
                }`}>
                  {isActive ? 'KINETIC' : 'HOT'}
                </span>
              </button>
            );
          }

          return (
            <button
              key={m.id}
              onClick={() => onUpdateSettings({ mode: m.id })}
              aria-pressed={isActive}
              className={`px-2.5 sm:px-3 py-1.5 min-h-[36px] sm:min-h-[32px] rounded-lg flex items-center gap-1 sm:gap-1.5 transition-all whitespace-nowrap text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] ${
                isActive
                  ? 'neo-pill-active font-bold shadow-sm'
                  : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-panel)]/50'
              }`}
            >
              {m.icon}
              <span>{m.label}</span>
              {m.id === 'boss' && (
                <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded-md bg-red-950/70 text-red-300 border border-red-500/40 font-bold tracking-wider">
                  COMBAT
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="h-5 w-px bg-gradient-to-b from-transparent via-[var(--border-strong)] to-transparent shrink-0 hidden lg:block" />

      {/* Sub-Options based on Mode */}
      {settings.mode === 'time' && (
        <div className="flex items-center gap-1 neo-inset p-1 rounded-xl shrink-0">
          {timeOptions.map((t) => (
            <button
              key={t}
              onClick={() => onUpdateSettings({ timeLimit: t })}
              aria-pressed={settings.timeLimit === t}
              className={`px-2 py-1 rounded-lg transition-all whitespace-nowrap text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] ${
                settings.timeLimit === t
                  ? 'neo-pill-active font-bold'
                  : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-panel)]/50'
              }`}
            >
              {t}s
            </button>
          ))}
        </div>
      )}

      {settings.mode === 'words' && (
        <div className="flex items-center gap-1 neo-inset p-1 rounded-xl shrink-0">
          {wordOptions.map((w) => (
            <button
              key={w}
              onClick={() => onUpdateSettings({ wordCount: w })}
              aria-pressed={settings.wordCount === w}
              className={`px-2 py-1 rounded-lg transition-all whitespace-nowrap text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] ${
                settings.wordCount === w
                  ? 'neo-pill-active font-bold'
                  : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-panel)]/50'
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      )}

      {/* Shatter Stream Specialized Controls */}
      {settings.mode === 'shatter' && (
        <>
          {/* Target / Goal Mode */}
          <div className="flex items-center gap-1 neo-inset p-1 rounded-xl shrink-0">
            {shatterTargetOptions.map((opt) => {
              const active = (settings.shatterTargetMode || 'time') === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onUpdateSettings({ shatterTargetMode: opt.id })}
                  aria-pressed={active}
                  title={opt.tooltip}
                  className={`px-2 py-1 rounded-lg flex items-center gap-1 text-xs transition-all ${
                    active
                      ? opt.id === 'survival'
                        ? 'neo-pill-active text-red-400 font-bold'
                        : 'neo-pill-active text-amber-300 font-bold'
                      : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-panel)]/50'
                  }`}
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Goal Selectors (Time or Word pills) */}
          {(settings.shatterTargetMode || 'time') === 'time' && (
            <div className="flex items-center gap-1 neo-inset p-1 rounded-xl shrink-0">
              {timeOptions.map((t) => (
                <button
                  key={t}
                  onClick={() => onUpdateSettings({ timeLimit: t })}
                  aria-pressed={settings.timeLimit === t}
                  className={`px-2 py-1 rounded-lg text-xs transition-all ${
                    settings.timeLimit === t
                      ? 'neo-pill-active text-amber-300 font-bold'
                      : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-panel)]/50'
                  }`}
                >
                  {t}s
                </button>
              ))}
            </div>
          )}

          {settings.shatterTargetMode === 'words' && (
            <div className="flex items-center gap-1 neo-inset p-1 rounded-xl shrink-0">
              {wordOptions.map((w) => (
                <button
                  key={w}
                  onClick={() => onUpdateSettings({ wordCount: w })}
                  aria-pressed={settings.wordCount === w}
                  className={`px-2 py-1 rounded-lg text-xs transition-all ${
                    settings.wordCount === w
                      ? 'neo-pill-active text-amber-300 font-bold'
                      : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-panel)]/50'
                  }`}
                >
                  {w}w
                </button>
              ))}
            </div>
          )}

          {settings.shatterTargetMode === 'survival' && (
            <div className="flex items-center gap-1.5 neo-inset px-2.5 py-1 rounded-xl shrink-0 text-xs text-red-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse mr-0.5" />
              <span>5 Lives • Endless Waves</span>
            </div>
          )}

          {/* Speed Presets */}
          <div className="flex items-center gap-1 neo-inset p-1 rounded-xl shrink-0">
            <span className="text-[10px] text-[var(--text-dim)] uppercase px-1.5 font-bold flex items-center gap-1">
              <Gauge className="w-3 h-3 text-amber-400" />
              <span>Speed:</span>
            </span>
            {shatterSpeedOptions.map((sp) => {
              const active = (settings.shatterSpeed || 'normal') === sp.id;
              return (
                <button
                  key={sp.id}
                  onClick={() => onUpdateSettings({ shatterSpeed: sp.id })}
                  aria-pressed={active}
                  title={sp.tooltip}
                  className={`px-1.5 sm:px-2 py-0.5 rounded-lg transition-all whitespace-nowrap text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] ${
                    active
                      ? 'neo-pill-active text-amber-300 font-bold'
                      : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-panel)]/50'
                  }`}
                >
                  {sp.label}
                </button>
              );
            })}
          </div>

          {/* Stream Density Flow */}
          <div className="hidden lg:flex items-center gap-1 neo-inset p-1 rounded-xl shrink-0">
            <span className="text-[10px] text-[var(--text-dim)] uppercase px-1 font-bold flex items-center gap-0.5">
              <Layers className="w-3 h-3 text-amber-400" />
              <span>Flow:</span>
            </span>
            {shatterDensityOptions.map((den) => {
              const active = (settings.shatterStreamDensity || 'normal') === den.id;
              return (
                <button
                  key={den.id}
                  onClick={() => onUpdateSettings({ shatterStreamDensity: den.id })}
                  aria-pressed={active}
                  title={den.tooltip}
                  className={`px-2 py-0.5 rounded-lg transition-all text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] ${
                    active
                      ? 'neo-pill-active text-amber-300 font-bold'
                      : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-panel)]/50'
                  }`}
                >
                  {den.label}
                </button>
              );
            })}
          </div>

          {/* Sound Profile */}
          <div className="hidden sm:flex items-center gap-1 neo-inset p-1 rounded-xl shrink-0">
            {shatterSoundProfiles.map((snd) => {
              const active = (settings.shatterSoundProfile || 'crystal') === snd.id;
              return (
                <button
                  key={snd.id}
                  onClick={() => onUpdateSettings({ shatterSoundProfile: snd.id })}
                  aria-pressed={active}
                  className={`px-2 py-0.5 rounded-lg transition-all whitespace-nowrap text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] ${
                    active
                      ? 'neo-pill-active text-amber-300 font-bold'
                      : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-panel)]/50'
                  }`}
                >
                  {snd.label}
                </button>
              );
            })}
          </div>

          {/* VFX Toggle */}
          <div className="flex items-center gap-1 neo-inset p-1 rounded-xl shrink-0">
            <span className="text-[10px] text-[var(--text-dim)] uppercase px-1 font-bold flex items-center gap-0.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
            </span>
            {fxOptions.map((fx) => {
              const active = (settings.shatterFxIntensity || 'full') === fx.id;
              return (
                <button
                  key={fx.id}
                  onClick={() => onUpdateSettings({ shatterFxIntensity: fx.id })}
                  aria-pressed={active}
                  title={`Visual impact effects: ${fx.label}`}
                  className={`px-2 py-0.5 rounded-lg transition-all whitespace-nowrap text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] ${
                    active
                      ? 'neo-pill-active text-cyan-300 font-bold'
                      : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-panel)]/50'
                  }`}
                >
                  {fx.label}
                </button>
              );
            })}
          </div>
        </>
      )}

      <div className="h-5 w-px bg-gradient-to-b from-transparent via-[var(--border-strong)] to-transparent shrink-0 hidden lg:block" />

      {/* Modifiers: Punctuation, Numbers, Hardcore */}
      <div className="flex items-center gap-1 neo-inset p-1 rounded-xl shrink-0">
        
        {/* Punctuation */}
        <button
          onClick={() => onUpdateSettings({ punctuation: !settings.punctuation })}
          title="Toggle Punctuation"
          aria-label="Toggle Punctuation"
          aria-pressed={settings.punctuation}
          className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] ${
            settings.punctuation
              ? 'neo-pill-active font-bold text-[var(--accent-tactical)]'
              : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-panel)]/50'
          }`}
        >
          <AtSign className="w-3 h-3" />
          <span>punct</span>
        </button>

        {/* Numbers */}
        <button
          onClick={() => onUpdateSettings({ numbers: !settings.numbers })}
          title="Toggle Numbers"
          aria-label="Toggle Numbers"
          aria-pressed={settings.numbers}
          className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] ${
            settings.numbers
              ? 'neo-pill-active font-bold text-[var(--accent-tactical)]'
              : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-panel)]/50'
          }`}
        >
          <Hash className="w-3 h-3" />
          <span>nums</span>
        </button>

        {/* Hardcore / Sudden Death */}
        <button
          onClick={() => onUpdateSettings({ hardcore: !settings.hardcore })}
          title="Sudden Death: 1 typo = Instant Mission Abort!"
          aria-label="Sudden Death mode: 1 typo equals instant mission abort"
          aria-pressed={settings.hardcore}
          className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] ${
            settings.hardcore
              ? 'neo-pill-active font-bold text-[var(--accent-danger)] border-[var(--accent-danger)]/50'
              : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-panel)]/50'
          }`}
        >
          <Skull className="w-3 h-3" />
          <span><span className="hidden sm:inline">sudden </span>death</span>
        </button>
      </div>

      <div className="h-5 w-px bg-gradient-to-b from-transparent via-[var(--border-strong)] to-transparent hidden lg:block" />

      {/* Caret Style */}
      <div className="hidden md:flex items-center gap-1 neo-inset p-1 rounded-xl">
        <span className="text-[11px] text-[var(--text-dim)] px-1.5 uppercase tracking-wider font-semibold">Caret</span>
        {caretOptions.map((c) => (
          <button
            key={c.id}
            onClick={() => onUpdateSettings({ caretStyle: c.id })}
            title={`Caret style: ${c.id}`}
            aria-label={`Caret style: ${c.id}`}
            aria-pressed={settings.caretStyle === c.id}
            className={`px-2.5 py-0.5 min-w-[24px] min-h-[24px] flex items-center justify-center rounded-lg text-[11px] font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] ${
              settings.caretStyle === c.id
                ? 'neo-pill-active font-bold shadow-sm'
                : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-panel)]/50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

    </div>
  );
};
