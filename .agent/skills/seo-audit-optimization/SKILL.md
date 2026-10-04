---
name: seo-audit-optimization
description: Master modern SEO audits, Core Web Vitals optimization, Schema.org JSON-LD structured data, Next.js metadata architecture, programmatic SEO, and internationalized (hreflang) indexing.
---

# SEO Audit & Technical Optimization

Comprehensive guide and implementation framework for auditing, architecting, and optimizing modern web applications for search engine visibility, crawl efficiency, rich snippets, and Core Web Vitals.

## Use this skill when

- Conducting comprehensive SEO audits (technical, on-page, structured data)
- Implementing or fixing Next.js App Router metadata (`generateMetadata`, `viewport`, `robots.ts`, `sitemap.ts`)
- Generating Schema.org JSON-LD structured data (`SoftwareApplication`, `WebApplication`, `FAQPage`, `BreadcrumbList`, `Organization`)
- Configuring internationalization (i18n) SEO with `hreflang`, canonical tags, and localized sitemaps
- Optimizing Open Graph, Twitter Cards, and social sharing previews (1200x630px specs)
- Auditing and improving Core Web Vitals (LCP, INP, CLS) and page speed performance
- Enforcing semantic HTML5 heading hierarchy (single `h1`, logical nesting `h2-h6`) and accessibility-driven crawlability
- Diagnosing indexing issues (soft 404s, redirect chains, canonical mismatch, crawl budget bottlenecks)

## Do not use this skill when

- Managing paid search ad campaigns (Google Ads / PPC)
- Performing black-hat link farming or keyword stuffing
- The task is strictly backend database performance with no web/search impact

## Core Principles & Instructions

1. **Technical Foundation First**:
   - Ensure clean, valid, dynamic `robots.txt` allowing desired crawlers and disallowing private routes.
   - Implement dynamic XML sitemaps with `<loc>`, `<lastmod>`, `<changefreq>`, and `<xhtml:link rel="alternate">` for multilinguality.
   - Verify self-referencing canonical URLs on every indexed page to avoid duplicate content penalties.
   - Configure accurate `hreflang` attributes matching ISO 639-1 language and ISO 3166-1 Alpha 2 region codes, including `x-default`.

2. **Metadata & OpenGraph Architecture**:
   - Use framework-native metadata APIs (e.g., Next.js `Metadata` and `generateMetadata`).
   - Title tag pattern: `Primary Keyword - Secondary Hook | Brand Name` (optimal length: 50–60 characters).
   - Meta description: Actionable summary with primary keyword and CTA (optimal length: 150–160 characters).
   - Complete Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) and Twitter Cards (`summary_large_image`).
   - Separate responsive `viewport` configurations from general metadata per modern framework standards.

3. **Structured Data (Schema.org JSON-LD)**:
   - Inject verified JSON-LD scripts inside `<head>` or root layouts.
   - Use specific schemas: `SoftwareApplication` / `WebApplication` for interactive apps, `FAQPage` for FAQs, `BreadcrumbList` for navigation, and `Organization` for branding.
   - Validate syntax against Google's Rich Results Test guidelines.

4. **Semantic HTML & Content Crawlability**:
   - Exactly one logical `<h1>` element per page.
   - Sequential, non-skipping heading structure (`<h1>` -> `<h2>` -> `<h3>`).
   - Meaningful alt text on all informative `<img>` tags (`alt=""` for purely decorative icons with `aria-hidden="true"`).
   - Client-rendered applications must provide server-rendered fallback content or SSG/ISR static generation so crawlers receive readable HTML.

5. **Performance & Core Web Vitals (CWV)**:
   - Target LCP < 2.5s (preload critical hero fonts and images, avoid blocking scripts).
   - Target INP < 200ms (minimize main thread blocking, break long tasks, optimize event handlers).
   - Target CLS < 0.1 (reserve explicit dimensions on images/canvases/embeds, prevent layout shifts).

For full checklists, Schema templates, and Next.js copy-paste snippets, refer to `resources/implementation-playbook.md`.

## Resources

- `resources/implementation-playbook.md`: Detailed audit checklists, JSON-LD Schema templates, Next.js App Router patterns, and remediation workflows.
