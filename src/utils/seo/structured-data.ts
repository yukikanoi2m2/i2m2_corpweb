/**
 * @fileoverview JSON-LD structured data helpers.
 *
 * Structured data lets search engines understand the site as entities
 * (Organization, WebSite) rather than just text — improving rich results.
 * Render the output inside a `<script type="application/ld+json">` tag.
 */

import { siteConfig } from "@/lib/site";

/**
 * Organization + WebSite schema for the site root. Emit once, in the root
 * layout. The two nodes are linked by `@id` so crawlers treat them as related.
 */
export function getSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/android-icon-192x192.png`,
        description: siteConfig.description,
        // Mirrors the head-office address rendered on /company and /contact —
        // keep the three in sync if it ever moves.
        address: {
          "@type": "PostalAddress",
          postalCode: "106-6137",
          addressCountry: "JP",
          addressRegion: "東京都",
          addressLocality: "港区",
          streetAddress: "六本木6-10-1 六本木ヒルズ森タワー37F",
        },
        // The two core businesses, so crawlers read the company as a
        // medical-DX / healthcare-M&A operator rather than a generic consultancy.
        knowsAbout: [
          "カルテ電子化",
          "紙カルテのスキャン・AI-OCR・電子保存",
          "医療DX",
          "医療情報のデータ移行",
          "医療M&A",
          "医療法人・クリニックの事業承継",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };
}
