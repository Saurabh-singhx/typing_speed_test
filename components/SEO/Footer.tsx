import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-8 sm:py-12 px-4 sm:px-6 font-mono text-xs text-[var(--text-dim)]">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-strong)] flex items-center justify-center shadow-inner overflow-hidden p-0.5">
                <img
                  src="/logo.png"
                  alt="TypeTrack Logo"
                  className="w-full h-full object-contain rounded"
                />
              </div>
              <span className="font-bold text-base text-[var(--text-main)]">
                TYPE<span className="text-[var(--accent-tactical)]">TRACK</span> {'// TACTICAL APM LAB'}
              </span>
            </div>
            <p className="text-xs text-[var(--text-dim)] leading-relaxed max-w-md">
              A high-precision tactical typing benchmark designed for esports players, software developers, and mechanical keyboard purists. Zero distracting neon glow—only chiseled tactile feedback, procedural switch acoustics, and real-time telemetry.
            </p>
            <div className="text-[10px] text-[var(--text-dim)] font-semibold flex items-center gap-3">
              <span>STATUS: NOMINAL</span>
              <span>•</span>
              <span>0-LATENCY WEB AUDIO</span>
              <span>•</span>
              <span>100% CLIENT-SIDE PRIVACY</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="font-bold text-[var(--text-main)] text-xs uppercase tracking-wider">
              Telemetry & Intel
            </div>
            <ul className="space-y-0.5 text-xs">
              <li>
                <a
                  href="#wpm-tiers"
                  className="inline-flex items-center min-h-[44px] sm:min-h-[36px] py-2 text-[var(--text-dim)] hover:text-[var(--accent-tactical)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-tactical)] rounded"
                >
                  Global WPM Tiers
                </a>
              </li>
              <li>
                <a
                  href="#wpm-calculator"
                  className="inline-flex items-center min-h-[44px] sm:min-h-[36px] py-2 text-[var(--text-dim)] hover:text-[var(--accent-tactical)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-tactical)] rounded"
                >
                  Typing ROI Calculator
                </a>
              </li>
              <li>
                <a
                  href="#typing-guide"
                  className="inline-flex items-center min-h-[44px] sm:min-h-[36px] py-2 text-[var(--text-dim)] hover:text-[var(--accent-tactical)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-tactical)] rounded"
                >
                  Ergonomics & Switches
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="inline-flex items-center min-h-[44px] sm:min-h-[36px] py-2 text-[var(--text-dim)] hover:text-[var(--accent-tactical)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-tactical)] rounded"
                >
                  Debrief & FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Tactical Shortcut Reference */}
          <div className="space-y-2">
            <div className="font-bold text-[var(--text-main)] text-xs uppercase tracking-wider">
              Operator Hotkeys
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span>Restart Run:</span>
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--keycap-bg)] border border-[var(--border-strong)] text-[var(--text-main)] font-mono text-[10px]">
                  Tab + Enter
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Abort / Reset:</span>
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--keycap-bg)] border border-[var(--border-strong)] text-[var(--text-main)] font-mono text-[10px]">
                  Esc
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Wipe Active Word:</span>
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--keycap-bg)] border border-[var(--border-strong)] text-[var(--text-main)] font-mono text-[10px]">
                  Ctrl + Backspace
                </kbd>
              </div>
            </div>
          </div>

        </div>

        {/* International Language Editions (SEO Crawlability & Hreflang) */}
        <div className="pt-6 border-t border-[var(--border-subtle)] space-y-2.5">
          <div className="text-[10px] uppercase font-bold text-[var(--accent-tactical)] tracking-wider">
            International Language Editions
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <Link href="/" hrefLang="en" className="text-[var(--text-dim)] hover:text-[var(--accent-tactical)] transition-colors inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-[36px] py-1.5 px-2 -mx-1 rounded hover:bg-[var(--bg-panel)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-tactical)]">
              <span>🇺🇸</span>
              <span>English (Tactical Typing Test)</span>
            </Link>
            <Link href="/es" hrefLang="es" className="text-[var(--text-dim)] hover:text-[var(--accent-tactical)] transition-colors inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-[36px] py-1.5 px-2 -mx-1 rounded hover:bg-[var(--bg-panel)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-tactical)]">
              <span>🇪🇸</span>
              <span>Español (Test de Mecanografía)</span>
            </Link>
            <Link href="/de" hrefLang="de" className="text-[var(--text-dim)] hover:text-[var(--accent-tactical)] transition-colors inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-[36px] py-1.5 px-2 -mx-1 rounded hover:bg-[var(--bg-panel)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-tactical)]">
              <span>🇩🇪</span>
              <span>Deutsch (Tipptest Online)</span>
            </Link>
            <Link href="/fr" hrefLang="fr" className="text-[var(--text-dim)] hover:text-[var(--accent-tactical)] transition-colors inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-[36px] py-1.5 px-2 -mx-1 rounded hover:bg-[var(--bg-panel)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-tactical)]">
              <span>🇫🇷</span>
              <span>Français (Test de Frappe)</span>
            </Link>
            <Link href="/pt" hrefLang="pt" className="text-[var(--text-dim)] hover:text-[var(--accent-tactical)] transition-colors inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-[36px] py-1.5 px-2 -mx-1 rounded hover:bg-[var(--bg-panel)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-tactical)]">
              <span>🇧🇷</span>
              <span>Português (Teste de Digitação)</span>
            </Link>
            <Link href="/ru" hrefLang="ru" className="text-[var(--text-dim)] hover:text-[var(--accent-tactical)] transition-colors inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-[36px] py-1.5 px-2 -mx-1 rounded hover:bg-[var(--bg-panel)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-tactical)]">
              <span>🇷🇺</span>
              <span>Русский (Тест Скорости Печати)</span>
            </Link>
            <Link href="/hi" hrefLang="hi" className="text-[var(--text-dim)] hover:text-[var(--accent-tactical)] transition-colors inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-[36px] py-1.5 px-2 -mx-1 rounded hover:bg-[var(--bg-panel)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-tactical)]">
              <span>🇮🇳</span>
              <span>हिन्दी (हिंदी टाइपिंग टेस्ट)</span>
            </Link>
            <Link href="/it" hrefLang="it" className="text-[var(--text-dim)] hover:text-[var(--accent-tactical)] transition-colors inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-[36px] py-1.5 px-2 -mx-1 rounded hover:bg-[var(--bg-panel)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-tactical)]">
              <span>🇮🇹</span>
              <span>Italiano (Test di Battitura)</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[var(--text-dim)]">
          <div>
            © {new Date().getFullYear()} TypeTrack. Precision mechanical typing benchmark.
          </div>
          <div className="flex items-center gap-4">
            <span>Built with Next.js & Web Audio API</span>
            <span>•</span>
            <span>All keystroke data remains local</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
