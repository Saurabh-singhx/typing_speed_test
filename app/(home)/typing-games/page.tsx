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
const pageUrl = `${baseUrl}/typing-games`;

export const metadata: Metadata = {
  title: 'Free Online Typing Games - Kinetic Shatter Stream & Boss Raid',
  description: 'Play free online typing games. Shatter falling words with kinetic canvas shard physics in Shatter Stream, or defeat combat AI sentinels in Boss Raid mode. Boost APM while playing.',
  keywords: [
    'typing games',
    'typing games online',
    'free typing games',
    'speed typing games',
    'arcade typing game',
    'combat typing game',
    'fun typing test',
    'kinetic typing game',
    'apm typing game'
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: pageUrl,
    title: 'Free Online Typing Games - Kinetic Shatter Stream & Boss Raid | TypeTrack',
    description: 'Experience adrenaline-fueled arcade typing games with real-time physics and combat boss raids.',
    siteName: 'TypeTrack Typing Games',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shatter Stream & Boss Raid Typing Games',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Typing Games - Kinetic Shatter Stream & Boss Raid',
    description: 'Experience adrenaline-fueled arcade typing games with real-time physics and combat boss raids.',
    images: ['/og-image.png'],
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${pageUrl}/#webapp`,
      "name": "Free Online Typing Games - Kinetic Shatter Stream & Boss Raid",
      "url": pageUrl,
      "applicationCategory": "GameApplication",
      "operatingSystem": "All",
      "description": "High-velocity arcade typing game featuring 2D polygon shard physics, procedural sound effects, and boss raid combat.",
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
          "name": "Typing Games",
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
          "name": "Do typing games improve your real typing speed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Fast-paced typing games stimulate neurological reflex loops, improve Actions Per Minute (APM), and encourage instantaneous key actuation under time pressure."
          }
        },
        {
          "@type": "Question",
          "name": "What is Shatter Stream mode?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Shatter Stream is an arcade mode where typed words shatter into kinetic polygon shards accompanied by procedural acoustic cracking sounds."
          }
        }
      ]
    }
  ]
};

export default function TypingGamesPage() {
  return (
    <>
      <JsonLd data={jsonLdData} />
      <TypingApp 
        initialMode="shatter"
        pageTitle="Arcade Typing Games"
        pageSubtitle="Kinetic Shatter Stream & Combat Boss Raid arena"
        footer={<Footer />}
      >
        <LandingIntentSection intent="games" />
        <WpmRanksSection lang="en" />
        <WpmSavingsCalculator lang="en" />
        <TypingGuideSection lang="en" />
        <FaqSection lang="en" />
      </TypingApp>
    </>
  );
}
