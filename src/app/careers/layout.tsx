/**
 * Metadata for `/careers` — see the note in `services/layout.tsx` for why this
 * lives in a layout rather than the page.
 */
import type { Metadata } from "next";

import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";

export const metadata: Metadata = buildMetadata({
  title: "採用情報｜株式会社イズムズ（i2m2）",
  description:
    "株式会社イズムズ（i2m2）の採用情報。カルテ電子化・医療DXと医療M&A・事業承継の中核2事業で、医療の情報と事業を次の世代へつなぐ仲間を募集しています。",
  url: "/careers",
});

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
