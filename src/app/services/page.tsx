"use client";

import { animated, easings, useSpring, useTrail } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * The two core businesses. Presented as large, hero-grade blocks (not a service
 * card grid) so a visitor reads "カルテ電子化と医療M&Aの会社" immediately.
 *
 * `id` doubles as the anchor target for the CTAs in the home hero and the
 * CORE BUSINESSES overlay — keep both in sync with `data/mocks/home.ts`.
 */
const CORE_BUSINESSES = [
  {
    id: "medical-digitalization",
    num: "01",
    label: "MEDICAL DIGITALIZATION",
    title: "カルテ電子化・医療DX",
    lead: "医療の「情報」を、失われる前に引き継ぐ。",
    description:
      "紙カルテのスキャン・AI-OCRによる読み取り・電子保存までを担い、診療録を検索できる医療情報へと変換します。保管スペースの削減とBCP対策に加え、次の診療体制へ安全にデータを移行できる状態をつくります。",
    keywords: [
      "紙カルテ電子化",
      "カルテスキャン",
      "AI-OCR",
      "電子保存",
      "医療情報",
      "データ移行",
      "医療DX",
    ],
  },
  {
    id: "healthcare-ma",
    num: "02",
    label: "HEALTHCARE M&A",
    title: "医療M&A・事業承継",
    lead: "医療の「事業」を、次の担い手へ渡す。",
    description:
      "医療法人・クリニック・介護事業者の承継を、後継者不在の課題整理から相手先の選定、条件調整、承継後の経営支援まで一貫して担います。地域で続いてきた医療を止めないことを前提に、事業再生も含めて検討します。",
    keywords: [
      "医療M&A",
      "医療法人M&A",
      "クリニックM&A",
      "事業承継",
      "介護M&A",
      "事業再生",
      "経営支援",
    ],
  },
];

/**
 * WHY i2m2 — the reason to choose us, deliberately *not* framed as
 * "何でもワンストップ".
 *
 * SECURITY & CONFIDENTIALITY intentionally cites no certification scheme: none
 * is verifiable anywhere in this codebase. It is worded off the measures the
 * privacy policy actually commits to (§6 委託先の監督 / §7 安全管理措置) and
 * links there, so the claim stays checkable.
 */
const STRENGTHS = [
  {
    num: "01",
    label: "HEALTHCARE EXPERTISE",
    title: "医療領域に絞った専門性",
    description:
      "医療機関の診療記録と経営の実務を前提に設計。医療法人・クリニック・介護事業者の現場に固有の事情を踏まえて進めます。",
  },
  {
    num: "02",
    label: "DIGITAL × BUSINESS",
    title: "情報と事業の両面から",
    description:
      "カルテ電子化で医療情報を、M&A・事業承継で事業そのものを引き継ぐ。承継の局面で必要になる両面を、同じ体制で扱えます。",
  },
  {
    num: "03",
    label: "SECURITY & CONFIDENTIALITY",
    title: "診療情報の取り扱いと秘密保持",
    description:
      "アクセス権限の管理と通信の暗号化を含む安全管理措置を講じ、業務委託先も適切な監督のもとで取り扱います。詳細はプライバシーポリシーに記載しています。",
  },
  {
    num: "04",
    label: "CONTINUITY",
    title: "引き継いだ後まで見据える",
    description:
      "電子化したデータが実際に使われる状態まで、承継後の経営が続く状態まで。渡して終わりにしない前提で関わります。",
  },
];

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const headerSpring = useSpring({
    from: { opacity: 0, y: 40 },
    to: { opacity: mounted ? 1 : 0, y: mounted ? 0 : 40 },
    config: { duration: 1000, easing: easings.easeOutQuart },
    delay: 200,
  });

  const trail = useTrail(CORE_BUSINESSES.length, {
    from: { opacity: 0, y: 30 },
    to: { opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 },
    config: { duration: 800, easing: easings.easeOutQuart },
    delay: 600,
  });

  const strengthTrail = useTrail(STRENGTHS.length, {
    from: { opacity: 0, y: 20 },
    to: { opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 },
    config: { duration: 800, easing: easings.easeOutQuart },
    delay: 1200,
  });

  return (
    <main className="relative min-h-screen bg-background pt-24 pb-16 sm:pt-28 sm:pb-20">
      {/* Page header */}
      <animated.section
        style={headerSpring}
        className="mx-auto max-w-4xl px-5 text-center sm:px-6"
      >
        <Eyebrow>CORE BUSINESSES</Eyebrow>
        <h1 className="mt-10 text-balance-ja font-display text-display-sm font-light leading-title tracking-title text-foreground">
          事業内容
        </h1>
        <p className="mt-5 text-lead font-light leading-relaxed tracking-wide text-muted">
          医療の「情報」と「事業」を、
          <br className="sm:hidden" />
          次の世代へ。
        </p>
      </animated.section>

      {/* Core businesses — large blocks rather than a card grid. Two columns on
          desktop (number + label / body), stacked on mobile. The generous
          padding and `text-display-sm` heading are what create the visual gap
          against any lesser section on the site. */}
      <section className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24 sm:px-6">
        <div className="flex flex-col gap-16 sm:gap-28">
          {trail.map((style, i) => {
            const business = CORE_BUSINESSES[i];
            return (
              <animated.article
                key={business.id}
                id={business.id}
                style={style}
                // `scroll-mt` keeps the fixed header from covering the heading
                // when arriving via the #anchor CTAs.
                className="scroll-mt-28 border-t border-border-glass pt-10 sm:pt-14"
              >
                <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
                  {/* Left column — identity */}
                  <div className="flex flex-col lg:w-[40%] lg:shrink-0">
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-stat font-extralight leading-none text-gradient-accent">
                        {business.num}
                      </span>
                      <span className="text-eyebrow font-medium uppercase tracking-[0.2em] text-muted">
                        BUSINESS
                      </span>
                    </div>
                    <p className="mt-6 text-eyebrow font-medium uppercase tracking-[0.2em] text-gradient-accent">
                      {business.label}
                    </p>
                    <h2 className="mt-3 text-balance-ja font-display text-display-sm font-light leading-title tracking-title text-foreground">
                      {business.title}
                    </h2>
                  </div>

                  {/* Right column — substance */}
                  <div className="flex flex-1 flex-col">
                    <p className="font-display text-xl font-light leading-relaxed tracking-tight text-foreground sm:text-2xl">
                      {business.lead}
                    </p>
                    <p className="mt-5 text-lead font-light leading-[1.9] text-muted">
                      {business.description}
                    </p>
                    <ul className="mt-8 flex flex-wrap gap-2">
                      {business.keywords.map((keyword) => (
                        <li
                          key={keyword}
                          className="rounded-full border border-border-glass bg-surface-glass px-4 py-2 text-kicker font-light tracking-wide text-muted backdrop-blur-md"
                        >
                          {keyword}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </animated.article>
            );
          })}
        </div>
      </section>

      {/* WHY i2m2 — smaller type and a tighter grid than CORE BUSINESSES above,
          so the hierarchy between the two sections is unambiguous. */}
      <section className="mx-auto mt-24 max-w-5xl px-5 sm:mt-36 sm:px-6">
        <div className="text-center">
          <p className="text-eyebrow font-medium uppercase tracking-[0.25em] text-muted">
            WHY i2m2
          </p>
          <h2 className="mt-4 font-display text-2xl font-light leading-title tracking-title text-foreground sm:text-3xl">
            医療の承継に、専門で向き合う。
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6">
          {strengthTrail.map((style, i) => {
            const s = STRENGTHS[i];
            return (
              <animated.article
                key={s.label}
                style={style}
                className="rounded-2xl border border-border-glass bg-surface-glass p-7 backdrop-blur-md sm:p-8"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-lg font-extralight text-gradient-accent">
                    {s.num}
                  </span>
                  <p className="text-eyebrow font-medium uppercase tracking-[0.2em] text-muted">
                    {s.label}
                  </p>
                </div>
                <h3 className="mt-4 font-display text-lg font-normal tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 text-lead font-light leading-[1.8] text-muted">
                  {s.description}
                </p>
                {/* Only the security item makes a checkable claim, so only it
                    links to the document that backs the claim up. */}
                {s.num === "03" && (
                  <Link
                    href="/privacy-policy"
                    className="mt-4 inline-flex text-kicker font-medium tracking-wide text-foreground/70 underline decoration-border-glass-strong underline-offset-4"
                  >
                    プライバシーポリシー
                  </Link>
                )}
              </animated.article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-24 max-w-3xl px-5 text-center sm:mt-36 sm:px-6">
        <h2 className="text-balance-ja font-display text-display-sm font-light leading-title tracking-title text-foreground">
          医療のデジタル化・事業承継について、
          <br className="max-sm:hidden" />
          まずはご相談ください。
        </h2>
        <p className="mt-5 text-lead font-light leading-[1.8] tracking-wide text-muted">
          カルテ電子化・M&Aのいずれのご相談も、同じ窓口で承ります。
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-surface-button px-10 text-button font-medium text-foreground shadow-glass-btn backdrop-blur-2xl"
          >
            お問い合わせ
            <span className="text-foreground/60">&rarr;</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
