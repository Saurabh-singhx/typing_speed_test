import { Metadata } from 'next';
import { TypingApp } from '@/components/TypingApp';
import { JsonLd } from '@/components/SEO/JsonLd';
import { LandingIntentSection } from '@/components/SEO/LandingIntentSection';
import { WpmRanksSection } from '@/components/SEO/WpmRanksSection';
import { WpmSavingsCalculator } from '@/components/SEO/WpmSavingsCalculator';
import { TypingGuideSection } from '@/components/SEO/TypingGuideSection';
import { FaqSection } from '@/components/SEO/FaqSection';
import { Footer } from '@/components/SEO/Footer';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://typetrack.saurabhx.site';
const pageUrl = `${baseUrl}/3-minute-typing-test`;

export const metadata: Metadata = {
  title: '3 Minute Typing Test - Free 180-Second WPM & Stamina Test',
  description: 'Test your typing stamina and sustained accuracy with our free 3-minute typing test. Measure consistency, Words Per Minute (WPM), and error recovery over 180 seconds.',
  keywords: [
    '3 minute typing test',
    'typing test 3 minutes',
    '3 min typing test',
    '3 min typing speed test',
    '180 second typing test',
    'typing stamina test',
    'sustained typing speed test',
    'typing test 3 min free'
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: pageUrl,
    title: '3 Minute Typing Test - Free 180-Second WPM & Stamina Test | TypeTrack',
    description: 'Measure your sustained typing endurance, consistency, and WPM across a 3-minute challenge.',
    siteName: 'TypeTrack 3 Minute Typing Test',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '3 Minute Typing Test',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '3 Minute Typing Test - Free 180-Second WPM & Stamina Test',
    description: 'Measure your sustained typing endurance, consistency, and WPM across a 3-minute challenge.',
    images: ['/og-image.png'],
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${pageUrl}/#webapp`,
      "name": "3 Minute Typing Test - Free 180-Second WPM & Stamina Test",
      "url": pageUrl,
      "applicationCategory": "EducationalApplication, GameApplication",
      "operatingSystem": "All",
      "description": "Evaluate sustained typing speed and cadence consistency over 3 minutes with real-time telemetry and error tracking.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}/#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "3 Minute Typing Test",
          "item": pageUrl
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why take a 3 minute typing test instead of a 1 minute test?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A 3-minute test measures sustained typing endurance and stamina, eliminating anomalies from quick bursts. It offers a more realistic assessment of everyday typing for writers and programmers."
          }
        },
        {
          "@type": "Question",
          "name": "How to avoid finger fatigue during a 3-minute typing test?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Keep wrists elevated in a neutral position, avoid bottoming out heavy keys aggressively, and maintain a steady, relaxed rhythm rather than erratic bursts."
          }
        }
      ]
    }
  ]
};

export default function ThreeMinuteTypingTestPage() {
  return (
    <>
      <JsonLd data={jsonLdData} />
      <TypingApp 
        initialMode="time"
        initialTimeLimit={180}
        pageTitle="3 Minute Typing Test"
        pageSubtitle="180-second sustained stamina & accuracy benchmark"
        footer={<Footer />}
      >
        <LandingIntentSection intent="3-minute" />
        <WpmRanksSection lang="en" />
        <WpmSavingsCalculator lang="en" />
        <TypingGuideSection lang="en" />
        <FaqSection lang="en" />
      </TypingApp>
    </>
  );
}
