/**
 * Metadata for `/company` — see the note in `services/layout.tsx` for why this
 * lives in a layout rather than the page.
 */
import type { Metadata } from "next";

import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";

export const metadata: Metadata = buildMetadata({
  title: "会社概要｜株式会社イズムズ（i2m2）",
  description:
    "株式会社イズムズ（i2m2）の会社概要。カルテ電子化・医療DXと医療M&A・事業承継を中核事業とする事業会社です。本社は東京都港区六本木6-10-1 六本木ヒルズ森タワー37F。",
  url: "/company",
});

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
