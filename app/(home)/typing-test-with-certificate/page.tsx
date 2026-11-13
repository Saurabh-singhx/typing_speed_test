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
const pageUrl = `${baseUrl}/typing-test-with-certificate`;

export const metadata: Metadata = {
  title: 'Typing Test with Certificate - Free Official WPM Certification',
  description: 'Earn a free typing speed certificate online. Verify your WPM and accuracy with Bronze, Silver, Gold, and Platinum certificates for your resume and job applications.',
  keywords: [
    'typing test with certificate',
    'free typing test certificate',
    'typing speed test with certificate',
    'typing certificate free online',
    'official typing test certificate',
    'typing test for resume',
    'typing certificate for jobs',
    'verified typing test',
    'wpm test certificate',
    'data entry typing certificate'
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: pageUrl,
    title: 'Typing Test with Certificate - Free Official WPM Certification | TypeTrack',
    description: 'Get an official, verifiable typing certificate for your CV, resume, or LinkedIn profile.',
    siteName: 'TypeTrack Typing Certificate',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Typing Test Certificate Verification',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Typing Test with Certificate - Free Official WPM Certification',
    description: 'Get an official, verifiable typing certificate for your CV, resume, or LinkedIn profile.',
    images: ['/og-image.png'],
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${pageUrl}/#webapp`,
      "name": "Typing Test with Certificate - Free Official WPM Certification",
      "url": pageUrl,
      "applicationCategory": "EducationalApplication, AssessmentApplication",
      "operatingSystem": "All",
      "description": "Free verified typing certificate generator based on live Words Per Minute (WPM) and accuracy assessment.",
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
          "name": "Typing Test with Certificate",
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
          "name": "How do I earn a typing test certificate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Complete any timed typing test on TypeTrack with at least 40 WPM and 94% accuracy. Your certificate tier (Bronze, Silver, Gold, or Platinum) unlocks automatically based on your highest score."
          }
        },
        {
          "@type": "Question",
          "name": "Can I put this typing certificate on my resume or LinkedIn?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! You can list your certified WPM, CPM, and accuracy under your resume's Skills or Certifications section to demonstrate verified keyboard proficiency to hiring managers."
          }
        }
      ]
    }
  ]
};

export default function TypingTestWithCertificatePage() {
  return (
    <>
      <JsonLd data={jsonLdData} />
      <TypingApp 
        initialTab="certificates"
        pageTitle="Typing Test with Certificate"
        pageSubtitle="Official verified WPM, CPM & accuracy certification tiers"
        footer={<Footer />}
      >
        <LandingIntentSection intent="certificate" />
        <WpmRanksSection lang="en" />
        <WpmSavingsCalculator lang="en" />
        <TypingGuideSection lang="en" />
        <FaqSection lang="en" />
      </TypingApp>
    </>
  );
}
