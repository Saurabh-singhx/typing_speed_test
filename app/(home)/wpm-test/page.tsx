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
const pageUrl = `${baseUrl}/wpm-test`;

export const metadata: Metadata = {
  title: 'WPM Test - Calculate Words Per Minute & Typing Speed',
  description: 'Free WPM test to calculate your Words Per Minute (WPM) and Characters Per Minute (CPM). Features real-time accuracy telemetry, Net WPM vs Gross WPM breakdown, and speed rank tiers.',
  keywords: [
    'wpm test',
    'words per minute test',
    'wpm calculator',
    'words per minute calculator',
    'check wpm',
    'calculate wpm',
    'cpm test',
    'characters per minute test',
    'wpm speed test',
    'how many words per minute do i type'
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: pageUrl,
    title: 'WPM Test - Calculate Words Per Minute & Typing Speed | TypeTrack',
    description: 'Calculate your exact WPM and CPM typing speed with normalized 5-keystroke telemetry.',
    siteName: 'TypeTrack WPM Test',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WPM Test Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WPM Test - Calculate Words Per Minute & Typing Speed',
    description: 'Calculate your exact WPM and CPM typing speed with normalized 5-keystroke telemetry.',
    images: ['/og-image.png'],
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${pageUrl}/#webapp`,
      "name": "WPM Test - Calculate Words Per Minute & Typing Speed",
      "url": pageUrl,
      "applicationCategory": "EducationalApplication, ToolApplication",
      "operatingSystem": "All",
      "description": "Calculate Words Per Minute (WPM) and Characters Per Minute (CPM) with live accuracy telemetry and percentile benchmarking.",
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
          "name": "WPM Test",
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
          "name": "What does WPM stand for and how is it calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WPM stands for Words Per Minute. Standard typing tests define 1 word as 5 characters. The formula is: WPM = (Total Correct Characters / 5) / Time in Minutes."
          }
        },
        {
          "@type": "Question",
          "name": "How to convert CPM to WPM?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Divide your Characters Per Minute (CPM) by 5. For example, 250 CPM equals 50 WPM, and 400 CPM equals 80 WPM."
          }
        }
      ]
    }
  ]
};

export default function WpmTestPage() {
  return (
    <>
      <JsonLd data={jsonLdData} />
      <TypingApp 
        initialMode="time"
        initialTimeLimit={60}
        pageTitle="WPM Test (Words Per Minute)"
        pageSubtitle="Standardized 5-keystroke speed & CPM telemetry calculator"
        footer={<Footer />}
      >
        <LandingIntentSection intent="wpm-test" />
        <WpmRanksSection lang="en" />
        <WpmSavingsCalculator lang="en" />
        <TypingGuideSection lang="en" />
        <FaqSection lang="en" />
      </TypingApp>
    </>
  );
}
