/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper. Update the placeholder values per project.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  /**
   * Legal entity name. Used as the OG `siteName` and as the JSON-LD
   * Organization name — so it stays the plain company name, without the
   * marketing suffix that belongs in `title`.
   */
  name: "株式会社イズムズ（i2m2）",
  /** Default `<title>` — leads with the two core businesses. */
  title: "株式会社イズムズ（i2m2）｜カルテ電子化・医療M&A",
  description: "株式会社イズムズ（i2m2）は、医療機関の紙カルテ電子化・医療DXと、医療M&A・事業承継を中核とする事業会社です。医療の「情報」と「事業」を、次の世代へつなぎます。",
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
