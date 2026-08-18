import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

/** Public routes, in navigation order. `""` is the home route. */
const ROUTES = [
  "",
  "/services",
  "/company",
  "/careers",
  "/contact",
  "/privacy-policy",
] as const;

/**
 * Generates `/sitemap.xml` — one entry per public route. The home page carries
 * the highest priority; the rest sit just below it.
 */
// Emitted as a static file at build time (required by `output: "export"`).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
