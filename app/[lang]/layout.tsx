import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { SITE_CONFIG } from '@/lib/seo-data';
import { isValidLanguage, SUPPORTED_LANGUAGES } from '@/lib/languages';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#191c24',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  interactiveWidget: 'resizes-content',
};

export const metadata: Metadata = {
  title: {
    default: 'TypeTrack // Tactical Typing Speed Test & APM Benchmark',
    template: '%s | TypeTrack',
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: 'TypeTrack' }],
  creator: 'TypeTrack',
  metadataBase: new URL(SITE_CONFIG.url),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'googleb5195719520931eb',
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

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.filter((l) => l.code !== 'en').map((l) => ({
    lang: l.code,
  }));
}

export default async function LocalizedLayout({ children, params }: Props) {
  const { lang } = await params;
  const validLang = isValidLanguage(lang) ? lang : 'en';

  return (
    <html
      lang={validLang}
      dir="ltr"
      data-theme="neomorphism"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-page)] text-[var(--text-main)] transition-colors">
        {children}
      </body>
    </html>
  );
}
