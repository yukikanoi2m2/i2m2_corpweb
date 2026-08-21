/**
 * Metadata for `/contact` — see the note in `services/layout.tsx` for why this
 * lives in a layout rather than the page.
 */
import type { Metadata } from "next";

import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";

export const metadata: Metadata = buildMetadata({
  title: "お問い合わせ｜株式会社イズムズ（i2m2）",
  description:
    "カルテ電子化・医療DX、医療M&A・事業承継に関するご相談はこちら。株式会社イズムズ（i2m2）へお気軽にお問い合わせください。",
  url: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
