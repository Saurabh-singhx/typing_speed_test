'use client';

import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Palette, 
  Trophy, 
  BarChart3, 
  Gauge, 
  ChevronDown,
  Globe,
  X,
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { GameTheme, SoundType, LanguageCode } from '@/lib/types';
import { UserStats, calculateLevel, getRankTitle } from '@/lib/storage';
import { SUPPORTED_LANGUAGES, getLanguageInfo } from '@/lib/languages';

interface NavbarProps {
  theme: GameTheme;
  onThemeChange: (theme: GameTheme) => void;
  soundType: SoundType;
  onSoundChange: (sound: SoundType) => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
  targetWpm: number;
  onTargetWpmChange: (wpm: number) => void;
  language?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
  userStats: UserStats;
  onOpenAchievements: () => void;
  onOpenStats: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onThemeChange,
  soundType,
  onSoundChange,
  volume,
  onVolumeChange,
  targetWpm,
  onTargetWpmChange,
  language = 'en',
  onLanguageChange,
  userStats,
  onOpenAchievements,
  onOpenStats,
}) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showSoundMenu, setShowSoundMenu] = useState(false);
  const [showPacerMenu, setShowPacerMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowThemeMenu(false);
        setShowSoundMenu(false);
        setShowPacerMenu(false);
        setShowLangMenu(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentLangInfo = getLanguageInfo(language);

  const levelInfo = calculateLevel(userStats.xp);
  const rank = getRankTitle(userStats.bestWpm);

  const themes: { id: GameTheme; name: string; tag: string }[] = [
    { id: 'tactical', name: 'Tactical Gunmetal', tag: 'Charcoal & Amber' },
    { id: 'obsidian', name: 'Obsidian Stealth', tag: 'OLED Black & Graphite' },
    { id: 'cyberdeck', name: 'Cyberdeck 1984', tag: 'Retro Terminal Olive' },
    { id: 'arctic', name: 'Subzero Arctic', tag: 'Deep Navy & Cyan' },
    { id: 'mecha', name: 'Titan Mecha', tag: 'Cockpit Slate & Hazard' },
  ];

  const soundOptions: { id: SoundType; name: string; desc: string }[] = [
    { id: 'thock', name: 'Linear Thock', desc: 'Deep acoustic clack' },
    { id: 'clicky', name: 'Clicky Blue', desc: 'Tactile mechanical snap' },
    { id: 'topre', name: 'Topre Dome', desc: 'Cushioned capacitive pop' },
    { id: 'arcade', name: 'Arcade 8-Bit', desc: 'Retro electronic chirp' },
    { id: 'off', name: 'Mute / Silent', desc: 'No switch audio' },
  ];

  const targetWpmOptions = [0, 50, 60, 80, 100, 120, 140];

  return (
    <header className="w-full border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/95 backdrop-blur sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 relative">
        
        {/* Brand Logo & Telemetry Status */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-strong)] flex items-center justify-center shadow-inner overflow-hidden p-0.5 shrink-0">
              <img
                src="/logo.png"
                alt="TypeTrack Logo"
                className="w-full h-full object-contain rounded"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-mono font-black tracking-wider text-sm sm:text-base md:text-lg text-[var(--text-main)] truncate">
                  TYPE<span className="text-[var(--accent-tactical)]">TRACK</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest px-1 sm:px-1.5 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--text-dim)] border border-[var(--border-strong)] shrink-0">
                  v2.0
                </span>
              </div>
              <div className="hidden sm:flex text-[10px] font-mono tracking-widest uppercase text-[var(--text-dim)] items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-success)] animate-pulse" />
                <span>SYS_READY // APM TELEMETRY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Operator Rank & XP Bar (Interactive - Tablet/Desktop) */}
        <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded bg-[var(--bg-panel)] border border-[var(--border-subtle)]">
          <div className="text-right">
            <div className="text-[11px] font-mono font-bold text-[var(--text-main)] flex items-center justify-end gap-1.5">
              <span className="text-[var(--accent-tactical)]">LVL {levelInfo.level}</span>
              <span className="text-[var(--text-faint)]">•</span>
              <span className={rank.color}>{rank.title}</span>
            </div>
            <div className="text-[9px] font-mono text-[var(--text-dim)]">
              {levelInfo.currentLevelXp} / {levelInfo.nextLevelXp} XP ({levelInfo.progressPercent}%)
            </div>
          </div>
          <div className="w-20 h-2 bg-[var(--bg-input)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
            <div 
              className="h-full bg-[var(--accent-tactical)] transition-all duration-300 rounded-full"
              style={{ width: `${levelInfo.progressPercent}%` }}
            />
          </div>
        </div>

        {/* Tactical Controls & Modals (Desktop) */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2">
          {(showPacerMenu || showSoundMenu || showThemeMenu || showLangMenu) && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => {
                setShowPacerMenu(false);
                setShowSoundMenu(false);
                setShowThemeMenu(false);
                setShowLangMenu(false);
              }}
            />
          )}
          
          {/* Ghost Pacer Target Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowPacerMenu(!showPacerMenu);
                setShowThemeMenu(false);
                setShowSoundMenu(false);
                setShowLangMenu(false);
              }}
              title="Target Pacing Ghost"
              aria-haspopup="true"
              aria-expanded={showPacerMenu}
              className="tactical-keycap px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded text-xs font-mono flex items-center gap-1 sm:gap-1.5 text-[var(--text-dim)] hover:text-[var(--text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)]"
            >
              <Gauge className="w-3.5 h-3.5 text-[var(--accent-target)]" />
              <span className="hidden md:inline">Pacer:</span>
              <span className="font-bold text-[11px] sm:text-xs text-[var(--text-main)]">
                {targetWpm === 0 ? 'OFF' : `${targetWpm}`}
              </span>
              <ChevronDown className="w-3 h-3 text-[var(--text-faint)]" />
            </button>

            {showPacerMenu && (
              <div
                role="menu"
                aria-label="Target pacing ghost options"
                className="absolute right-0 mt-2 w-48 max-w-[calc(100vw-1.5rem)] rounded bg-[var(--bg-panel)] border border-[var(--border-strong)] p-1.5 shadow-xl z-50 animate-modal"
              >
                <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-dim)] px-2 py-1 border-b border-[var(--border-subtle)] mb-1">
                  Target Pacing Ghost
                </div>
                {targetWpmOptions.map((wpm) => (
                  <button
                    key={wpm}
                    role="menuitem"
                    onClick={() => {
                      onTargetWpmChange(wpm);
                      setShowPacerMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-mono flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] ${
                      targetWpm === wpm
                        ? 'bg-[var(--accent-tactical)]/15 text-[var(--accent-tactical)] font-bold'
                        : 'text-[var(--text-dim)] hover:bg-[var(--bg-input)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    <span>{wpm === 0 ? 'Disable Ghost' : `${wpm} WPM Pace`}</span>
                    {targetWpm === wpm && <span className="text-[11px] font-bold text-[var(--accent-tactical)]">ACTIVE</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Switch Sound Synthesizer Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowSoundMenu(!showSoundMenu);
                setShowThemeMenu(false);
                setShowPacerMenu(false);
                setShowLangMenu(false);
              }}
              title="Mechanical Switch Audio"
              aria-haspopup="true"
              aria-expanded={showSoundMenu}
              className="tactical-keycap px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded text-xs font-mono flex items-center gap-1 sm:gap-1.5 text-[var(--text-dim)] hover:text-[var(--text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)]"
            >
              {soundType === 'off' ? (
                <VolumeX className="w-3.5 h-3.5 text-[var(--text-faint)]" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-[var(--accent-tactical)]" />
              )}
              <span className="hidden md:inline capitalize">{soundType}</span>
              <ChevronDown className="w-3 h-3 text-[var(--text-faint)]" />
            </button>

            {showSoundMenu && (
              <div
                role="menu"
                aria-label="Mechanical switch sound options"
                className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-1.5rem)] rounded bg-[var(--bg-panel)] border border-[var(--border-strong)] p-2 shadow-xl z-50 animate-modal"
              >
                <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-dim)] px-2 py-1 border-b border-[var(--border-subtle)] mb-1 flex items-center justify-between">
                  <span>Switch Acoustics</span>
                  <span>WebAudio</span>
                </div>
                {soundOptions.map((s) => (
                  <button
                    key={s.id}
                    role="menuitem"
                    onClick={() => {
                      onSoundChange(s.id);
                      setShowSoundMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] ${
                      soundType === s.id
                        ? 'bg-[var(--accent-tactical)]/15 text-[var(--accent-tactical)] font-bold'
                        : 'text-[var(--text-dim)] hover:bg-[var(--bg-input)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{s.name}</span>
                      {soundType === s.id && <span className="text-[11px] font-bold text-[var(--accent-tactical)]">ON</span>}
                    </div>
                    <div className="text-[11px] text-[var(--text-faint)]">{s.desc}</div>
                  </button>
                ))}

                {soundType !== 'off' && (
                  <div className="mt-2 pt-2 border-t border-[var(--border-subtle)] px-2">
                    <label id="desktop-volume-label" htmlFor="desktop-volume-slider" className="flex items-center justify-between text-[11px] font-mono text-[var(--text-dim)] mb-1 cursor-pointer">
                      <span>Volume</span>
                      <span className="font-bold text-[var(--text-main)]">{Math.round(volume * 100)}%</span>
                    </label>
                    <input
                      id="desktop-volume-slider"
                      name="desktopVolume"
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      aria-labelledby="desktop-volume-label"
                      aria-label="Sound switch volume"
                      aria-valuemin={0}
                      aria-valuemax={1}
                      aria-valuenow={volume}
                      aria-valuetext={`${Math.round(volume * 100)} percent`}
                      onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-[var(--bg-input)] rounded accent-[var(--accent-tactical)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)]"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Theme Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowThemeMenu(!showThemeMenu);
                setShowSoundMenu(false);
                setShowPacerMenu(false);
                setShowLangMenu(false);
              }}
              title="Change Theme"
              aria-haspopup="true"
              aria-expanded={showThemeMenu}
              className="tactical-keycap px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded text-xs font-mono flex items-center gap-1 sm:gap-1.5 text-[var(--text-dim)] hover:text-[var(--text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)]"
            >
              <Palette className="w-3.5 h-3.5 text-[var(--accent-tactical)]" />
              <span className="hidden md:inline capitalize">{theme}</span>
              <ChevronDown className="w-3 h-3 text-[var(--text-faint)]" />
            </button>

            {showThemeMenu && (
              <div
                role="menu"
                aria-label="Color theme options"
                className="absolute right-0 mt-2 w-52 max-w-[calc(100vw-1.5rem)] rounded bg-[var(--bg-panel)] border border-[var(--border-strong)] p-1.5 shadow-xl z-50 animate-modal"
              >
                <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-dim)] px-2 py-1 border-b border-[var(--border-subtle)] mb-1">
                  Matte Gaming Palettes
                </div>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    role="menuitem"
                    onClick={() => {
                      onThemeChange(t.id);
                      setShowThemeMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] ${
                      theme === t.id
                        ? 'bg-[var(--accent-tactical)]/15 text-[var(--accent-tactical)] font-bold'
                        : 'text-[var(--text-dim)] hover:bg-[var(--bg-input)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    <div>{t.name}</div>
                    <div className="text-[11px] text-[var(--text-faint)]">{t.tag}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLangMenu(!showLangMenu);
                setShowThemeMenu(false);
                setShowSoundMenu(false);
                setShowPacerMenu(false);
              }}
              title="Select Language & Word Bank"
              aria-haspopup="true"
              aria-expanded={showLangMenu}
              className="tactical-keycap px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded text-xs font-mono flex items-center gap-1 sm:gap-1.5 text-[var(--text-dim)] hover:text-[var(--text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)]"
            >
              <Globe className="w-3.5 h-3.5 text-[var(--accent-tactical)]" />
              <span className="text-xs">{currentLangInfo.flag}</span>
              <span className="font-bold text-[11px] sm:text-xs text-[var(--text-main)] uppercase">{language}</span>
              <ChevronDown className="w-3 h-3 text-[var(--text-faint)]" />
            </button>

            {showLangMenu && (
              <div
                role="menu"
                aria-label="Language selection options"
                className="absolute right-0 mt-2 w-52 max-w-[calc(100vw-1.5rem)] rounded bg-[var(--bg-panel)] border border-[var(--border-strong)] p-1.5 shadow-2xl z-50 animate-modal"
              >
                <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-dim)] px-2 py-1 border-b border-[var(--border-subtle)] mb-1 flex items-center justify-between">
                  <span>Language</span>
                  <span>8 Languages</span>
                </div>
                <div className="space-y-0.5">
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      role="menuitem"
                      onClick={() => {
                        onLanguageChange?.(l.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-mono flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] ${
                        language === l.code
                          ? 'bg-[var(--accent-tactical)]/15 text-[var(--accent-tactical)] font-bold'
                          : 'text-[var(--text-dim)] hover:bg-[var(--bg-input)] hover:text-[var(--text-main)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{l.flag}</span>
                        <span>{l.nativeName}</span>
                      </div>
                      <span className="text-[11px] text-[var(--text-faint)] uppercase">{l.code}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Badges / Achievements Trigger */}
          <button
            onClick={onOpenAchievements}
            title="Tactical Badges & Achievements"
            aria-label="Tactical Badges & Achievements"
            className="tactical-keycap p-2 rounded text-[var(--text-dim)] hover:text-[var(--accent-tactical)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] relative"
          >
            <Trophy className="w-4 h-4" />
            {userStats.unlockedAchievements.length > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--accent-tactical)]" />
            )}
          </button>

          {/* Lifetime Telemetry Stats Trigger */}
          <button
            onClick={onOpenStats}
            title="Lifetime Typing Telemetry"
            aria-label="Lifetime Typing Telemetry"
            className="tactical-keycap p-2 rounded text-[var(--text-dim)] hover:text-[var(--accent-target)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)]"
          >
            <BarChart3 className="w-4 h-4" />
          </button>

        </div>

        {/* Mobile Tactical Controls (< md) */}
        <div className="flex md:hidden items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Quick Mute / Unmute Button */}
          <button
            onClick={() => {
              if (soundType === 'off') {
                onSoundChange('thock');
              } else {
                onSoundChange('off');
              }
            }}
            title={soundType === 'off' ? 'Unmute Switch Audio' : 'Mute Switch Audio'}
            className="tactical-keycap p-2 rounded text-[var(--text-dim)] hover:text-[var(--text-main)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)]"
            aria-label={soundType === 'off' ? 'Unmute Switch Audio' : 'Mute Switch Audio'}
          >
            {soundType === 'off' ? (
              <VolumeX className="w-4 h-4 text-[var(--text-faint)]" />
            ) : (
              <Volume2 className="w-4 h-4 text-[var(--accent-tactical)]" />
            )}
          </button>

          {/* Badges / Achievements Trigger */}
          <button
            onClick={onOpenAchievements}
            title="Tactical Badges & Achievements"
            className="tactical-keycap p-2 rounded text-[var(--text-dim)] hover:text-[var(--accent-tactical)] relative active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)]"
            aria-label="Tactical Badges & Achievements"
          >
            <Trophy className="w-4 h-4" />
            {userStats.unlockedAchievements.length > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--accent-tactical)]" />
            )}
          </button>

          {/* Lifetime Telemetry Stats Trigger */}
          <button
            onClick={onOpenStats}
            title="Lifetime Typing Telemetry"
            className="tactical-keycap p-2 rounded text-[var(--text-dim)] hover:text-[var(--accent-target)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)]"
            aria-label="Lifetime Typing Telemetry"
          >
            <BarChart3 className="w-4 h-4" />
          </button>

          {/* Mobile Menu / Settings Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            title="Tactical Config & Pacer Menu"
            className={`tactical-keycap p-2 rounded flex items-center justify-center transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-tactical)] ${
              mobileMenuOpen
                ? 'bg-[var(--accent-tactical)] text-[var(--bg-page)] border-[var(--accent-tactical)] font-bold'
                : 'text-[var(--text-dim)] hover:text-[var(--text-main)]'
            }`}
            aria-label="Toggle Tactical Options & Settings"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <SlidersHorizontal className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Command Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-[52px] sm:top-[57px] bg-black/75 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Dropdown Panel */}
          <div className="absolute top-full left-0 right-0 max-h-[calc(100vh-56px)] overflow-y-auto bg-[var(--bg-surface)] border-b border-[var(--border-strong)] shadow-2xl p-4 space-y-4 z-50 md:hidden font-mono animate-in slide-in-from-top-2 duration-150">
            
            {/* Operator Telemetry Card */}
            <div className="p-3 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-subtle)] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[var(--accent-tactical)]/15 text-[var(--accent-tactical)] text-xs font-bold border border-[var(--accent-tactical)]/30">
                    LVL {levelInfo.level}
                  </span>
                  <span className={`text-xs font-bold ${rank.color}`}>
                    {rank.title}
                  </span>
                </div>
                <span className="text-[10px] text-[var(--text-dim)]">
                  {levelInfo.currentLevelXp} / {levelInfo.nextLevelXp} XP ({levelInfo.progressPercent}%)
                </span>
              </div>
              <div className="w-full h-2 bg-[var(--bg-input)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                <div
                  className="h-full bg-[var(--accent-tactical)] transition-all duration-300 rounded-full"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Switch Acoustic Synthesizer */}
            <div className="space-y-2">
              <div className="text-[10px] uppercase tracking-wider text-[var(--text-dim)] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-[var(--accent-tactical)]" />
                  <span>Switch Acoustics</span>
                </span>
                <span className="text-[9px] text-[var(--text-faint)]">WebAudio 0-Latency</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {soundOptions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onSoundChange(s.id)}
                    className={`p-2 rounded text-left text-xs transition-colors flex flex-col justify-between border ${
                      soundType === s.id
                        ? 'bg-[var(--accent-tactical)]/15 text-[var(--accent-tactical)] border-[var(--accent-tactical)]/50 font-bold'
                        : 'bg-[var(--bg-panel)] text-[var(--text-dim)] border-[var(--border-subtle)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{s.name}</span>
                      {soundType === s.id && <span className="text-[9px]">ACTIVE</span>}
                    </div>
                    <span className="text-[9px] text-[var(--text-faint)]">{s.desc}</span>
                  </button>
                ))}
              </div>
              {soundType !== 'off' && (
                <div className="p-2.5 rounded bg-[var(--bg-panel)] border border-[var(--border-subtle)] space-y-1">
                  <label id="mobile-volume-label" htmlFor="mobile-volume-slider" className="flex items-center justify-between text-[10px] text-[var(--text-dim)] cursor-pointer">
                    <span>Acoustic Volume</span>
                    <span className="font-bold text-[var(--text-main)]">{Math.round(volume * 100)}%</span>
                  </label>
                  <input
                    id="mobile-volume-slider"
                    name="mobileVolume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    aria-labelledby="mobile-volume-label"
                    aria-label="Acoustic Volume"
                    aria-valuemin={0}
                    aria-valuemax={1}
                    aria-valuenow={volume}
                    aria-valuetext={`${Math.round(volume * 100)} percent`}
                    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[var(--bg-input)] rounded accent-[var(--accent-tactical)] cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Target Pacing Ghost */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-wider text-[var(--text-dim)] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-[var(--accent-target)]" />
                  <span>Target Pacing Ghost</span>
                </span>
                <span className="text-[9px] text-[var(--text-faint)]">{targetWpm === 0 ? 'Disabled' : `${targetWpm} WPM`}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {targetWpmOptions.map((wpm) => (
                  <button
                    key={wpm}
                    onClick={() => onTargetWpmChange(wpm)}
                    className={`flex-1 min-w-[48px] py-1.5 px-2 rounded text-xs text-center transition-colors border ${
                      targetWpm === wpm
                        ? 'bg-[var(--accent-target)]/20 text-[var(--accent-target)] border-[var(--accent-target)]/50 font-bold'
                        : 'bg-[var(--bg-panel)] text-[var(--text-dim)] border-[var(--border-subtle)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    {wpm === 0 ? 'OFF' : `${wpm}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Matte Gaming Palettes */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-wider text-[var(--text-dim)] flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[var(--accent-tactical)]" />
                <span>Matte Gaming Palettes</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onThemeChange(t.id)}
                    className={`p-2 rounded text-left text-xs transition-colors flex items-center justify-between border ${
                      theme === t.id
                        ? 'bg-[var(--accent-tactical)]/15 text-[var(--accent-tactical)] border-[var(--accent-tactical)]/50 font-bold'
                        : 'bg-[var(--bg-panel)] text-[var(--text-dim)] border-[var(--border-subtle)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    <div>
                      <div>{t.name}</div>
                      <div className="text-[9px] text-[var(--text-faint)]">{t.tag}</div>
                    </div>
                    {theme === t.id && <span className="text-[10px] font-bold">ACTIVE</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-wider text-[var(--text-dim)] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[var(--accent-tactical)]" />
                  <span>Language & Word Bank</span>
                </span>
                <span className="text-[9px] text-[var(--text-faint)]">{currentLangInfo.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {SUPPORTED_LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onLanguageChange?.(l.code);
                    }}
                    className={`p-2 rounded text-left text-xs transition-colors flex items-center justify-between border ${
                      language === l.code
                        ? 'bg-[var(--accent-tactical)]/15 text-[var(--accent-tactical)] border-[var(--accent-tactical)]/50 font-bold'
                        : 'bg-[var(--bg-panel)] text-[var(--text-dim)] border-[var(--border-subtle)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{l.flag}</span>
                      <span>{l.nativeName}</span>
                    </div>
                    <span className="text-[9px] text-[var(--text-faint)] uppercase">{l.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Close Drawer Button */}
            <div className="pt-1">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="tactical-keycap w-full py-2.5 rounded text-xs font-bold text-[var(--text-main)] bg-[var(--bg-panel)] hover:bg-[var(--bg-input)] border border-[var(--border-strong)] flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5 text-[var(--accent-tactical)]" />
                <span>CONFIRM & RETURN TO BENCHMARK</span>
              </button>
            </div>

          </div>
        </>
      )}
    </header>
  );
};
