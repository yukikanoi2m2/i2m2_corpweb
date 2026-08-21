/**
 * Metadata for `/services`. The page itself is a Client Component, which cannot
 * export `metadata` — so the route's title/description live in this server
 * layout instead.
 */
import type { Metadata } from "next";

import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";

export const metadata: Metadata = buildMetadata({
  title: "事業内容｜カルテ電子化・医療DX / 医療M&A・事業承継｜株式会社イズムズ",
  description:
    "株式会社イズムズの中核事業。紙カルテのスキャン・AI-OCRによる電子保存で医療情報を引き継ぐ「カルテ電子化・医療DX」と、医療法人・クリニックの承継を担う「医療M&A・事業承継」をご紹介します。",
  url: "/services",
});

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
