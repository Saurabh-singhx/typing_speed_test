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

  // Dedicated entries for each localized language route
  const localizedEntries: MetadataRoute.Sitemap = SUPPORTED_LANGUAGES.filter(
    (lang) => lang.code !== 'en'
  ).map((lang) => ({
    url: `${baseUrl}/${lang.code}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.9,
    alternates: {
      languages: hreflangMap,
    },
  }));

  return [rootEntry, ...localizedEntries];
}
