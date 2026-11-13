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
const pageUrl = `${baseUrl}/typing-practice`;

export const metadata: Metadata = {
  title: 'Typing Practice Online - Free Touch Typing & Speed Trainer',
  description: 'Practice touch typing online for free. Learn the 10-finger home row technique (ASDF JKL;), build muscle memory with mechanical switch audio, and boost your WPM.',
  keywords: [
    'typing practice',
    'touch typing practice',
    'typing practice online',
    'typing test for beginners',
    'learn touch typing',
    '10 finger typing practice',
    'typing practice free',
    'keyboard practice online',
    'how to type faster practice'
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: pageUrl,
    title: 'Typing Practice Online - Free Touch Typing & Speed Trainer | TypeTrack',
    description: 'Learn touch typing with authentic mechanical switch acoustics, zero-distraction layout, and real-time accuracy coaching.',
    siteName: 'TypeTrack Typing Practice',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Touch Typing Practice Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Typing Practice Online - Free Touch Typing & Speed Trainer',
    description: 'Learn touch typing with authentic mechanical switch acoustics, zero-distraction layout, and real-time accuracy coaching.',
    images: ['/og-image.png'],
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${pageUrl}/#webapp`,
      "name": "Typing Practice Online - Free Touch Typing & Speed Trainer",
      "url": pageUrl,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "description": "Interactive touch typing trainer and 10-finger keyboard practice interface with real-time acoustic feedback.",
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
          "name": "Typing Practice",
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
          "name": "How do I practice touch typing without looking at the keyboard?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Place your index fingers on the tactile bumps of F and J keys (the home row). Keep eyes locked on the screen and trust your finger muscles to reach for neighboring keys."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to learn touch typing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Practicing for 15 minutes daily typically builds strong muscle memory within 2 to 3 weeks, allowing you to reach 50-60+ WPM without visual scanning."
          }
        }
      ]
    }
  ]
};

export default function TypingPracticePage() {
  return (
    <>
      <JsonLd data={jsonLdData} />
      <TypingApp 
        initialMode="words"
        initialWordCount={25}
        pageTitle="Touch Typing Practice"
        pageSubtitle="10-finger muscle memory & home-row anchor exercises"
        footer={<Footer />}
      >
        <LandingIntentSection intent="practice" />
        <WpmRanksSection lang="en" />
        <WpmSavingsCalculator lang="en" />
        <TypingGuideSection lang="en" />
        <FaqSection lang="en" />
      </TypingApp>
    </>
  );
}
