import type { Metadata } from 'next';
import Link from 'next/link';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AlertTriangle, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: '404 - Sector Not Found | TypeTrack',
  description: 'The requested tactical typing test coordinate was not found.',
  robots: {
    index: false,
    follow: false,
  },
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function NotFound() {
  return (
    <html
      lang="en"
      data-theme="neomorphism"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col items-center justify-center bg-[var(--bg-page)] text-[var(--text-main)] font-mono p-4">
        <div className="max-w-md w-full p-6 rounded-xl bg-[var(--bg-panel)] border border-[var(--border-strong)] text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 mx-auto rounded bg-[var(--accent-danger)]/15 border border-[var(--accent-danger)]/30 flex items-center justify-center text-[var(--accent-danger)]">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] text-[var(--accent-danger)] font-bold tracking-widest uppercase">
              ERR_SECTOR_404 // TELEMETRY LOST
            </div>
            <h1 className="text-2xl font-black text-[var(--text-main)] mt-1">
              Sector Not Found
            </h1>
            <p className="text-xs text-[var(--text-dim)] mt-2">
              The requested tactical coordinate does not exist or has been decommissioned.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              href="/"
              className="tactical-keycap px-4 py-2 rounded text-xs font-bold text-[var(--bg-page)] bg-[var(--accent-tactical)] hover:brightness-110 flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span>RETURN TO BASE</span>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
