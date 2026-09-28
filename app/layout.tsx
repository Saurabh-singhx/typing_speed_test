import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SITE_CONFIG } from '@/lib/seo-data';
import { JsonLd } from '@/components/SEO/JsonLd';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'KEYOPS // Tactical Typing Speed Test & APM Benchmark',
    template: '%s | KEYOPS Typing',
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: 'KEYOPS Labs' }],
  creator: 'KEYOPS',
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: 'KEYOPS // Tactical Typing Speed Test & APM Benchmark',
    description: SITE_CONFIG.description,
    siteName: 'KEYOPS Tactical Typing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KEYOPS // Tactical Typing Speed Test',
    description: SITE_CONFIG.description,
    creator: SITE_CONFIG.creator,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="tactical"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg-page)] text-[var(--text-main)] transition-colors">
        {children}
      </body>
    </html>
  );
}
