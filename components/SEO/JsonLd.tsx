import React from 'react';
import { JSON_LD_DATA } from '@/lib/seo-data';

export const JsonLd: React.FC = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
    />
  );
};
