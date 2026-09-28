import React from 'react';
import { Keyboard, Shield, Terminal, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-12 px-4 sm:px-6 font-mono text-xs text-[var(--text-dim)]">
      <div className="max-w-7xl mx-auto space-y-8">
        
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
                TYPE<span className="text-[var(--accent-tactical)]">TRACK</span> // TACTICAL APM LAB
              </span>
            </div>
            <p className="text-xs text-[var(--text-dim)] leading-relaxed max-w-md">
              A high-precision tactical typing benchmark designed for esports players, software developers, and mechanical keyboard purists. Zero distracting neon glow—only chiseled tactile feedback, procedural switch acoustics, and real-time telemetry.
            </p>
            <div className="text-[10px] text-[var(--text-faint)] flex items-center gap-3">
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
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#wpm-tiers" className="hover:text-[var(--accent-tactical)] transition-colors">
                  Global WPM Tiers
                </a>
              </li>
              <li>
                <a href="#wpm-calculator" className="hover:text-[var(--accent-tactical)] transition-colors">
                  Typing ROI Calculator
                </a>
              </li>
              <li>
                <a href="#typing-guide" className="hover:text-[var(--accent-tactical)] transition-colors">
                  Ergonomics & Switches
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[var(--accent-tactical)] transition-colors">
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

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[var(--text-faint)]">
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
