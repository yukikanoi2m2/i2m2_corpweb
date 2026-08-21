/**
 * Metadata for `/privacy-policy` — see the note in `services/layout.tsx` for
 * why this lives in a layout rather than the page.
 */
import type { Metadata } from "next";

import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";

export const metadata: Metadata = buildMetadata({
  title: "プライバシーポリシー｜株式会社イズムズ（i2m2）",
  description:
    "株式会社イズムズ（i2m2）のプライバシーポリシー。個人情報の利用目的、第三者提供、安全管理措置の取り扱いについて記載しています。",
  url: "/privacy-policy",
});

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
