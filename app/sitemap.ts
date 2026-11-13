import { MetadataRoute } from 'next';
import { SUPPORTED_LANGUAGES } from '@/lib/languages';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://typetrack.saurabhx.site';
  const currentDate = new Date();

  const hreflangMap: Record<string, string> = {
    'x-default': baseUrl,
    'en': baseUrl,
  };

  SUPPORTED_LANGUAGES.forEach((lang) => {
    if (lang.code !== 'en') {
      hreflangMap[lang.code] = `${baseUrl}/${lang.code}`;
    }
  });

  // Base root entry
  const rootEntry: MetadataRoute.Sitemap[number] = {
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 1.0,
    alternates: {
      languages: hreflangMap,
    },
  };

  // High-intent search landing pages
  const landingPages: { path: string; priority: number }[] = [
    { path: '/1-minute-typing-test', priority: 0.95 },
    { path: '/typing-test-with-certificate', priority: 0.95 },
    { path: '/wpm-test', priority: 0.9 },
    { path: '/3-minute-typing-test', priority: 0.9 },
    { path: '/5-minute-typing-test', priority: 0.9 },
    { path: '/typing-practice', priority: 0.9 },
    { path: '/typing-games', priority: 0.9 },
  ];

  const landingEntries: MetadataRoute.Sitemap = landingPages.map((lp) => ({
    url: `${baseUrl}${lp.path}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: lp.priority,
  }));

  // Dedicated entries for each localized language route
  const localizedEntries: MetadataRoute.Sitemap = SUPPORTED_LANGUAGES.filter(
    (lang) => lang.code !== 'en'
  ).map((lang) => ({
    url: `${baseUrl}/${lang.code}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.85,
    alternates: {
      languages: hreflangMap,
    },
  }));

  return [rootEntry, ...landingEntries, ...localizedEntries];
}
