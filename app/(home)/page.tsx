import { Metadata } from 'next';
import { TypingApp } from '@/components/TypingApp';
import { JsonLd } from '@/components/SEO/JsonLd';
import { SITE_CONFIG } from '@/lib/seo-data';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://typetrack.saurabhx.site';

export const metadata: Metadata = {
  title: 'TypeTrack // Tactical Typing Speed Test & APM Benchmark',
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  alternates: {
    canonical: baseUrl,
    languages: {
      'en': baseUrl,
      'es': `${baseUrl}/es`,
      'de': `${baseUrl}/de`,
      'fr': `${baseUrl}/fr`,
      'pt': `${baseUrl}/pt`,
      'ru': `${baseUrl}/ru`,
      'hi': `${baseUrl}/hi`,
      'it': `${baseUrl}/it`,
      'x-default': baseUrl,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES', 'de_DE', 'fr_FR', 'pt_BR', 'ru_RU', 'hi_IN', 'it_IT'],
    url: baseUrl,
    title: 'TypeTrack // Tactical Typing Speed Test & APM Benchmark',
    description: SITE_CONFIG.description,
    siteName: 'TypeTrack Tactical Typing',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TypeTrack Tactical Typing Speed Test',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TypeTrack // Tactical Typing Speed Test',
    description: SITE_CONFIG.description,
    creator: SITE_CONFIG.creator,
    images: ['/og-image.png'],
  },
};

export default function Home() {
  return (
    <>
      <JsonLd lang="en" />
      <TypingApp initialLanguage="en" />
    </>
  );
}
