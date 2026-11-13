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
const pageUrl = `${baseUrl}/1-minute-typing-test`;

export const metadata: Metadata = {
  title: '1 Minute Typing Test - Free 60 Second WPM Speed Test',
  description: 'Take a free 1-minute typing test to check your WPM (Words Per Minute), CPM, and accuracy in 60 seconds. Instant typing speed certificate, real-time telemetry, and mechanical switch sound effects.',
  keywords: [
    '1 minute typing test',
    'typing test 1 minute',
    '60 second typing test',
    'free 1 minute typing test',
    '1 min typing test',
    '1 min typing speed test',
    '1 minute wpm test',
    'typing speed test 1 minute',
    'quick typing test',
    'typing test 60 seconds',
    'typing test'
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: pageUrl,
    title: '1 Minute Typing Test - Free 60 Second WPM Speed Test | TypeTrack',
    description: 'Benchmark your typing speed in 60 seconds. Measure real-time WPM, CPM, and accuracy with authentic mechanical switch acoustics.',
    siteName: 'TypeTrack 1 Minute Typing Test',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '1 Minute Typing Test Scorecard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '1 Minute Typing Test - Free 60 Second WPM Speed Test',
    description: 'Benchmark your typing speed in 60 seconds. Measure real-time WPM, CPM, and accuracy with authentic mechanical switch acoustics.',
    images: ['/og-image.png'],
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${pageUrl}/#webapp`,
      "name": "1 Minute Typing Test - Free 60 Second WPM Speed Test",
      "url": pageUrl,
      "applicationCategory": "EducationalApplication, GameApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5 Audio API.",
      "description": "Free 1-minute typing speed test. Measures Words Per Minute (WPM), CPM, and accuracy over 60 seconds with mechanical switch sounds and instant certificates.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.96",
        "ratingCount": "14280",
        "bestRating": "5",
        "worstRating": "1"
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
          "name": "1 Minute Typing Test",
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
          "name": "What is a good score on a 1 minute typing test?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The worldwide average typing speed is roughly 40 WPM (200 CPM) on a 1-minute test. Speeds between 60 to 75 WPM are considered proficient, while 80 to 95 WPM is advanced, and 100+ WPM places you in the elite top 1% of typists."
          }
        },
        {
          "@type": "Question",
          "name": "How is WPM calculated in a 60-second typing test?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WPM is calculated using the formula: (Total Correct Characters / 5) / 1 Minute. For example, typing 300 correct characters in 60 seconds equals exactly 60 Words Per Minute."
          }
        },
        {
          "@type": "Question",
          "name": "Can I get a typing speed certificate from a 1-minute test?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Completing a test unlocks verified Bronze (40+ WPM), Silver (50+ WPM), Gold (70+ WPM), and Platinum (100+ WPM) medals with your exact WPM and accuracy."
          }
        }
      ]
    }
  ]
};

export default function OneMinuteTypingTestPage() {
  return (
    <>
      <JsonLd data={jsonLdData} />
      <TypingApp 
        initialMode="time"
        initialTimeLimit={60}
        pageTitle="1 Minute Typing Test"
        pageSubtitle="60-second WPM & accuracy speed benchmark"
        footer={<Footer />}
      >
        <LandingIntentSection intent="1-minute" />
        <WpmRanksSection lang="en" />
        <WpmSavingsCalculator lang="en" />
        <TypingGuideSection lang="en" />
        <FaqSection lang="en" />
      </TypingApp>
    </>
  );
}
