import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TypingApp } from '@/components/TypingApp';
import { JsonLd } from '@/components/SEO/JsonLd';
import { isValidLanguage, getLanguageInfo, SUPPORTED_LANGUAGES } from '@/lib/languages';

type Props = {
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.filter((l) => l.code !== 'en').map((l) => ({
    lang: l.code,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLanguage(lang)) {
    return {};
  }

  const info = getLanguageInfo(lang);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://typetrack.saurabhx.site';
  const pageUrl = `${baseUrl}/${lang}`;

  return {
    title: {
      absolute: info.metaTitle,
    },
    description: info.metaDescription,
    keywords: info.keywords,
    alternates: {
      canonical: pageUrl,
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
      locale: info.ogLocale,
      alternateLocale: ['en_US', 'es_ES', 'de_DE', 'fr_FR', 'pt_BR', 'ru_RU', 'hi_IN', 'it_IT'].filter(
        (l) => l !== info.ogLocale
      ),
      url: pageUrl,
      title: info.metaTitle,
      description: info.metaDescription,
      siteName: 'TypeTrack Tactical Typing',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: info.metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: info.metaTitle,
      description: info.metaDescription,
      images: ['/og-image.png'],
    },
  };
}

export default async function LocalizedTypingPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLanguage(lang)) {
    notFound();
  }

  return (
    <>
      <JsonLd lang={lang} />
      <TypingApp initialLanguage={lang} />
    </>
  );
}
