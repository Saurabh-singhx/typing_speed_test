import React from 'react';
import Script from 'next/script';
import { SITE_CONFIG } from '@/lib/seo-data';

interface GoogleAnalyticsProps {
  gaId?: string;
}

export const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({
  gaId = SITE_CONFIG.gaId,
}) => {
  if (!gaId) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};
