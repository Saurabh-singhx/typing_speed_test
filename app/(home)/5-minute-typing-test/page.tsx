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
const pageUrl = `${baseUrl}/5-minute-typing-test`;

export const metadata: Metadata = {
  title: '5 Minute Typing Test - Official WPM & Endurance Assessment',
  description: 'Take an official 5-minute typing test for jobs, civil service exams, court transcribers, and data entry assessments. Measure long-form stamina, net WPM, and accuracy.',
  keywords: [
    '5 minute typing test',
    'typing test 5 minutes',
    '5 min typing test',
    '5 min typing speed test',
    'typing test for jobs',
    'government typing test',
    'ssc typing test',
    'cpct typing test',
    'civil service typing test',
    'data entry typing test 5 minutes'
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: pageUrl,
    title: '5 Minute Typing Test - Official WPM & Endurance Assessment | TypeTrack',
    description: 'Official 5-minute typing speed test designed for job applications, civil service, and data entry assessments.',
    siteName: 'TypeTrack 5 Minute Typing Test',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '5 Minute Typing Test',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '5 Minute Typing Test - Official WPM & Endurance Assessment',
    description: 'Official 5-minute typing speed test designed for job applications, civil service, and data entry assessments.',
    images: ['/og-image.png'],
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${pageUrl}/#webapp`,
      "name": "5 Minute Typing Test - Official WPM & Endurance Assessment",
      "url": pageUrl,
      "applicationCategory": "EducationalApplication, AssessmentApplication",
      "operatingSystem": "All",
      "description": "5-minute typing speed assessment standard for job applicants, court transcribers, and civil service tests.",
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
          "name": "5 Minute Typing Test",
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
          "name": "Why do employers and exams require a 5 minute typing test?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "5-minute tests measure sustained cognitive focus, error containment, and typing endurance without sprint distortion, matching actual workplace conditions."
          }
        },
        {
          "@type": "Question",
          "name": "What is the passing score for a 5-minute typing test?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most civil service and corporate data entry positions require 35 to 45 Net WPM with at least 95% accuracy. Advanced legal or medical transcription roles require 60 to 75+ WPM."
          }
        }
      ]
    }
  ]
};

export default function FiveMinuteTypingTestPage() {
  return (
    <>
      <JsonLd data={jsonLdData} />
      <TypingApp 
        initialMode="time"
        initialTimeLimit={300}
        pageTitle="5 Minute Typing Test"
        pageSubtitle="300-second official endurance & job assessment"
        footer={<Footer />}
      >
        <LandingIntentSection intent="5-minute" />
        <WpmRanksSection lang="en" />
        <WpmSavingsCalculator lang="en" />
        <TypingGuideSection lang="en" />
        <FaqSection lang="en" />
      </TypingApp>
    </>
  );
}
