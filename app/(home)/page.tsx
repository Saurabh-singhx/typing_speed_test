import { Metadata } from 'next';
import { TypingApp } from '@/components/TypingApp';
import { JsonLd } from '@/components/SEO/JsonLd';
import { WpmRanksSection } from '@/components/SEO/WpmRanksSection';
import { WpmSavingsCalculator } from '@/components/SEO/WpmSavingsCalculator';
import { TypingGuideSection } from '@/components/SEO/TypingGuideSection';
import { FaqSection } from '@/components/SEO/FaqSection';
import { Footer } from '@/components/SEO/Footer';
import { SITE_CONFIG } from '@/lib/seo-data';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://typetrack.saurabhx.site';

export const metadata: Metadata = {
  title: 'Typing Test - Free Typing Speed Test (WPM Test)',
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
    types: {
      'text/markdown': `${baseUrl}/llms.txt`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES', 'de_DE', 'fr_FR', 'pt_BR', 'ru_RU', 'hi_IN', 'it_IT'],
    url: baseUrl,
    title: 'Typing Test - Free Typing Speed Test (WPM Test) | TypeTrack',
    description: SITE_CONFIG.description,
    siteName: 'TypeTrack Free Typing Test',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TypeTrack Free Typing Speed Test',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Typing Test - Free Typing Speed Test (WPM Test)',
    description: SITE_CONFIG.description,
    creator: SITE_CONFIG.creator,
    images: ['/og-image.png'],
  },
};

export default function Home() {
  return (
    <>
      <JsonLd lang="en" />
      <TypingApp initialLanguage="en" footer={<Footer />}>
        <WpmRanksSection lang="en" />
        <WpmSavingsCalculator lang="en" />
        <TypingGuideSection lang="en" />
        <FaqSection lang="en" />
      </TypingApp>
    </>
  );
}
