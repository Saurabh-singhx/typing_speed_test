# SEO Audit & Technical Optimization Playbook

Actionable checklists, Schema.org JSON-LD templates, Next.js metadata recipes, and audit workflows.

---

## 1. Technical SEO Audit Checklist

### Crawlability & Indexing
- [ ] **`robots.txt`**: Served at `/robots.txt` with status 200, points to XML sitemap URL, allows public pages, disallows private/auth/admin endpoints.
- [ ] **Dynamic Sitemap (`sitemap.xml`)**: Lists all canonical URLs, includes `<lastmod>`, contains alternates for multilingual routes.
- [ ] **Canonical URLs**: Self-referencing canonical on primary URLs. Query parameters (e.g. `?ref=`, `?page=1`) point back to root canonical.
- [ ] **`hreflang` Setup**: Present on multilingual sites, includes `x-default`, bi-directional linking between language pairs.
- [ ] **Status Codes**: 200 OK for valid pages, 301 for permanent redirects (no redirect chains > 1), 404/410 for deleted content with custom error UI.
- [ ] **Indexability Headers**: Ensure `X-Robots-Tag` or `<meta name="robots" content="index, follow">` are configured correctly.

### Meta & Document Architecture
- [ ] **Title Tags**: 50–60 characters. Format: `{Primary Keyword} | {Site Name}` or `{Primary Topic} - {Secondary Hook} | {Brand}`.
- [ ] **Meta Descriptions**: 140–160 characters. Compelling benefit, primary keyword, call to action.
- [ ] **Viewport**: Mobile-responsive `width=device-width, initial-scale=1`.
- [ ] **Theme Color & Favicons**: SVG favicon, 32x32 PNG, 180x180 Apple Touch Icon, `manifest.json`.
- [ ] **Open Graph (OG)**: `og:title`, `og:description`, `og:image` (1200x630, <5MB), `og:url`, `og:type`, `og:site_name`, `og:locale`.
- [ ] **Twitter Cards**: `twitter:card` set to `summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`.

---

## 2. Structured Data (Schema.org JSON-LD) Templates

### A. WebApplication / SoftwareApplication
Ideal for interactive tools, typing apps, calculators, and games:

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "TypeTrack - Pro Typing Speed Test",
  "url": "https://typetrack.io",
  "description": "Master typing speed with real-time WPM tracking, live sound feedback, dynamic shatter modes, and multi-language support.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript. Requires HTML5.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "1250"
  },
  "featureList": [
    "Real-time WPM & Accuracy Telemetry",
    "Procedural Dynamic Audio Synthesizer",
    "Shatter Stream Kinetic Typing Engine",
    "Multi-language Typing Tests (English, Spanish, French, German, Japanese, and more)",
    "Pacer Speed Ghost Mode"
  ]
}
```

### B. FAQPage
Generates rich FAQ accordion dropdowns in Google Search results:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is WPM (Words Per Minute) calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WPM is calculated by taking the total number of characters typed, dividing by 5 (the standard definition of a word in typing tests), and dividing by the elapsed time in minutes. Net WPM subtracts uncorrected errors."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good typing speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The average typing speed is roughly 40 WPM. Speeds between 60 to 70 WPM are considered proficient, while 80+ WPM places you in the top tier of typists."
      }
    }
  ]
}
```

### C. BreadcrumbList
Enables clean breadcrumb hierarchy in SERPs:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://typetrack.io"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Spanish Typing Test",
      "item": "https://typetrack.io/es"
    }
  ]
}
```

---

## 3. Next.js App Router Metadata Best Practices

### Root Metadata (`app/layout.tsx`)
```typescript
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://typetrack.io'),
  title: {
    default: 'TypeTrack | Pro Typing Speed Test & WPM Trainer',
    template: '%s | TypeTrack',
  },
  description: 'Test your typing speed (WPM) and accuracy with modern real-time telemetry, procedural acoustic sounds, and kinetic visual modes.',
  keywords: ['typing test', 'wpm test', 'speed typing', 'typing practice', 'words per minute', 'keyboard trainer'],
  authors: [{ name: 'TypeTrack Team' }],
  creator: 'TypeTrack',
  publisher: 'TypeTrack',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'es': '/es',
      'de': '/de',
      'fr': '/fr',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://typetrack.io',
    siteName: 'TypeTrack',
    title: 'TypeTrack | Pro Typing Speed Test & WPM Trainer',
    description: 'Elevate your keyboard velocity with real-time WPM tracking and dynamic typing tests.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TypeTrack Typing Speed Test Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TypeTrack | Pro Typing Speed Test & WPM Trainer',
    description: 'Elevate your keyboard velocity with real-time WPM tracking and dynamic typing tests.',
    images: ['/og-image.png'],
  },
};
```

---

## 4. Internationalization (i18n) Programmatic SEO Checklist
- [ ] Every language version is represented in `generateStaticParams` for pre-rendering static HTML.
- [ ] OpenGraph `locale` is dynamically set per language (e.g. `es_ES`, `de_DE`, `fr_FR`, `ja_JP`).
- [ ] Root `html` element has dynamic `lang="{code}"` and `dir="{ltr|rtl}"`.
- [ ] Alternate links are mirrored across all language variants (every language page points to itself and all sibling languages via `hreflang`).
- [ ] Server-rendered static text content exists on the page (SEO content sections, FAQs, guides) so search engine crawlers index rich contextual keywords without relying on user client execution.

---

## 5. Core Web Vitals (CWV) Targets
| Metric | Good | Needs Improvement | Poor | Primary Mitigations |
| :--- | :--- | :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | 2.5s – 4.0s | > 4.0s | Preload fonts, dynamic import non-critical modals, inline critical CSS |
| **INP** (Interaction to Next Paint) | ≤ 200ms | 200ms – 500ms | > 500ms | Debounce keyboard analytics, avoid layout thrashing, use `requestAnimationFrame` for animations |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | 0.1 – 0.25 | > 0.25 | Reserve fixed aspect ratios on arenas and canvases, avoid unsized layout jumps |
