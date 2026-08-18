/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper. Update the placeholder values per project.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "株式会社イズムズ｜コーポレートサイト",
  description: "株式会社イズムズ（i2m2）は医療マーケティング・人材・M&A・DXをワンストップで提供するヘルスケア特化の総合支援会社。創業1年2ヶ月でグループ社員641名・総売上36億円を達成。",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "https://i2m2.com",
  /** Default Open Graph / Twitter share image (path under `public/`). */
  ogImage: "/open-graph.png",
  twitterHandle: "@i2m2_inc",
  author: "株式会社イズムズ",
  /** Browser theme-color (address bar / PWA). */
  themeColor: "#030305",
} as const;
