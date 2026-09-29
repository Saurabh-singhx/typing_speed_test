import React from 'react';
import { JSON_LD_DATA } from '@/lib/seo-data';
import { LanguageCode } from '@/lib/types';
import { generateLocalizedJsonLd } from '@/lib/seo-i18n';

interface JsonLdProps {
  data?: object;
  lang?: LanguageCode;
}

export const JsonLd: React.FC<JsonLdProps> = ({ data, lang }) => {
  const jsonContent = data || (lang ? generateLocalizedJsonLd(lang) : JSON_LD_DATA);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonContent) }}
    />
  );
};
