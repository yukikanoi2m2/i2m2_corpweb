"use client";

import { animated, easings, useSpring, useTrail } from "@react-spring/web";

import { useEffect, useState } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";

const PROFILE_DATA = [
  { label: "商号", value: "株式会社イズムズ（i2m2 Co., Ltd.）" },
  { label: "設立", value: "2025年4月2日" },
  { label: "代表者", value: "代表取締役 中村美華" },
  {
    label: "本社所在地",
    value: "〒106-6137 東京都港区六本木6-10-1 六本木ヒルズ森タワー37F",
  },
  {
    label: "事業内容",
    // Core businesses first, related ones after — the ordering is the message.
    value:
      "【中核事業】カルテ電子化・医療DX ／ 医療M&A・事業承継\n【関連事業】医療機関プロデュース",
  },
  {
    label: "関係会社",
    // 法人を1行ずつ縦に並べ、末尾に「その他数社」を置く一般的な会社概要の書式。
    // 改行は下の `whitespace-pre-line` が描画するので、ここでは `\n` のままにする
    // （マークアップをデータに埋め込まない）。社数が増えたら行を足すだけでよい。
    value: "医療法人白生会\n有限会社福寿\nその他数社",
  },
];

/**
 * Kept in step with the WHY i2m2 block on /services — same four pillars, but
 * summarised, since /services is where the detail belongs.
 *
 * As on /services, the security item names no certification scheme: none is
 * verifiable in this codebase. It restates the privacy policy's §7 measures.
 */
const STRENGTHS = [
  {
    label: "HEALTHCARE EXPERTISE",
    title: "医療領域に絞った専門性",
    description:
      "医療機関の診療記録と経営の実務を前提に、現場固有の事情を踏まえて進めます。",
  },
  {
    label: "DIGITAL × BUSINESS",
    title: "情報と事業の両面から",
    description:
      "カルテ電子化で医療情報を、M&A・事業承継で事業そのものを引き継ぎます。",
  },
  {
    label: "SECURITY & CONFIDENTIALITY",
    title: "診療情報の取り扱いと秘密保持",
    description:
      "アクセス権限の管理と通信の暗号化を含む安全管理措置を講じ、委託先も適切に監督します。",
  },
  {
    label: "CONTINUITY",
    title: "引き継いだ後まで見据える",
    description:
      "電子化したデータが使われる状態まで、承継後の経営が続く状態まで関わります。",
  },
];

const HISTORY = [
  {
    date: "2025.04",
    title: "株式会社イズムズ 設立",
    description:
      "医療領域に特化した企業として創業。以降、複数クリニックの経営に関与。",
  },
  {
    date: "2025.12",
    title: "医療M&A・事業承継サービス リリース",
    description:
      "医療・介護を中心としたM&A仲介・事業承継支援サービスを正式リリース。",
  },
  {
    date: "2026.07",
    // 2025.04 設立からの経過月数。`date` を動かすときは、この本文と
    // careers.tsx / data/mocks/home.ts の同じ文言も合わせて直すこと
    // （同一マイルストーンを3箇所から参照している）。
    title: "グループ社員641名突破・総売上36億円達成",
    description:
      "創業1年3ヶ月でグループ社員641名以上、総売上36億円を突破。東京都港区六本木に本社を移転。",
  },
];

export default function CompanyPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const headerSpring = useSpring({
    from: { opacity: 0, y: 40 },
    to: { opacity: mounted ? 1 : 0, y: mounted ? 0 : 40 },
    config: { duration: 1000, easing: easings.easeOutQuart },
    delay: 200,
  });

  const profileSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 },
    config: { duration: 800, easing: easings.easeOutQuart },
    delay: 500,
  });

  const strengthTrail = useTrail(STRENGTHS.length, {
    from: { opacity: 0, y: 20 },
    to: { opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 },
    config: { duration: 800, easing: easings.easeOutQuart },
    delay: 800,
  });

  const historyTrail = useTrail(HISTORY.length, {
    from: { opacity: 0, x: -20 },
    to: { opacity: mounted ? 1 : 0, x: mounted ? 0 : -20 },
    config: { duration: 700, easing: easings.easeOutQuart },
    delay: 1000,
  });

  return (
    <main className="relative min-h-screen bg-background pt-24 pb-16 sm:pt-28 sm:pb-20">
      {/* Page header */}
      <animated.section
        style={headerSpring}
        className="mx-auto max-w-4xl px-5 text-center sm:px-6"
      >
        <Eyebrow>COMPANY</Eyebrow>
        <h1 className="mt-10 text-balance-ja font-display text-display-sm font-light leading-title tracking-title text-foreground">
          会社概要
        </h1>
        <p className="mt-5 text-lead font-light leading-[1.8] tracking-wide text-muted">
          株式会社イズムズは、紙カルテの電子化による医療DXと、
          <br className="max-sm:hidden" />
          医療M&A・事業承継を中核事業とする事業会社です。
          <br className="max-sm:hidden" />
          医療の「情報」と「事業」を、次の世代へつないでいきます。
        </p>
      </animated.section>

      {/* Company profile table */}
      <animated.section
        style={profileSpring}
        className="mx-auto mt-14 max-w-4xl px-5 sm:mt-20 sm:px-6"
      >
        <h2 className="mb-8 text-center font-display text-kicker font-medium uppercase tracking-[0.25em] text-muted">
          PROFILE
        </h2>
        <div className="overflow-hidden rounded-2xl border border-border-glass bg-surface-glass backdrop-blur-md">
          {PROFILE_DATA.map((row, i) => (
            <div
              key={row.label}
              className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-8 sm:px-8 sm:py-5 ${
                i < PROFILE_DATA.length - 1
                  ? "border-b border-border-glass"
                  : ""
              }`}
            >
              <span className="w-32 shrink-0 text-eyebrow font-medium uppercase tracking-[0.15em] text-muted">
                {row.label}
              </span>
              {/* `whitespace-pre-line` so the 事業内容 row can break between
                  中核事業 and 関連事業 without embedding markup in the data. */}
              <span className="whitespace-pre-line text-lead font-light leading-[1.8] text-foreground">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </animated.section>

      {/* Strengths */}
      <section className="mx-auto mt-20 max-w-5xl px-5 sm:mt-28 sm:px-6">
        <h2 className="mb-10 text-center text-balance-ja font-display text-display-sm font-light leading-title tracking-title text-foreground">
          私たちの強み
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          {strengthTrail.map((style, i) => {
            const s = STRENGTHS[i];
            return (
              <animated.article
                key={s.title}
                style={style}
                className="rounded-2xl border border-border-glass bg-surface-glass p-6 backdrop-blur-md sm:p-8"
              >
                <p className="mb-3 text-eyebrow font-medium uppercase tracking-[0.2em] text-gradient-accent">
                  {s.label}
                </p>
                <h3 className="mb-3 font-display text-base font-normal tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {s.description}
                </p>
              </animated.article>
            );
          })}
        </div>
      </section>

      {/* History */}
      <section className="mx-auto mt-20 max-w-4xl px-5 sm:mt-28 sm:px-6">
        <h2 className="mb-10 text-center text-balance-ja font-display text-display-sm font-light leading-title tracking-title text-foreground">
          沿革
        </h2>
        <div className="relative border-l border-border-glass-strong pl-8">
          {historyTrail.map((style, i) => {
            const h = HISTORY[i];
            return (
              <animated.div
                key={h.date}
                style={style}
                className={`relative ${i < HISTORY.length - 1 ? "pb-10" : ""}`}
              >
                {/* Dot */}
                <span className="absolute -left-[calc(2rem+5px)] top-1.5 size-2.5 rounded-full bg-accent-warm" />
                <time className="text-eyebrow font-medium tracking-[0.15em] text-gradient-accent">
                  {h.date}
                </time>
                <h3 className="mt-2 font-display text-lg font-normal tracking-tight text-foreground">
                  {h.title}
                </h3>
                <p className="mt-1 text-lead font-light leading-[1.8] text-muted">
                  {h.description}
                </p>
              </animated.div>
            );
          })}
        </div>
      </section>

      {/* Access */}
      <section className="mx-auto mt-20 max-w-4xl px-5 sm:mt-28 sm:px-6">
        <h2 className="mb-8 text-center text-balance-ja font-display text-display-sm font-light leading-title tracking-title text-foreground">
          アクセス
        </h2>
        <div className="rounded-2xl border border-border-glass bg-surface-glass p-6 backdrop-blur-md sm:p-10">
          <h3 className="mb-4 font-display text-lg font-normal tracking-tight text-foreground">
            本社
          </h3>
          <p className="text-lead font-light leading-[1.8] text-muted">
            〒106-6137
            <br />
            東京都港区六本木6-10-1
            <br />
            六本木ヒルズ森タワー37F
          </p>
          <p className="mt-4 text-sm text-muted">
            東京メトロ日比谷線「六本木駅」1C出口 徒歩0分（コンコース直結）
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-20 max-w-3xl px-5 text-center sm:mt-28 sm:px-6">
        <h2 className="text-balance-ja font-display text-display-sm font-light leading-title tracking-title text-foreground">
          医療のデジタル化・事業承継について、
          <br className="max-sm:hidden" />
          まずはご相談ください。
        </h2>
        <p className="mt-4 text-lead font-light leading-[1.8] tracking-wide text-muted">
          カルテ電子化・M&Aのいずれのご相談も承ります。
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://forms.gle/9GjvAXSTRwnANpg97"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-surface-button px-8 text-button font-medium text-foreground shadow-glass-btn backdrop-blur-2xl transition-transform hover:scale-105"
          >
            お問い合わせ
          </a>
        </div>
      </section>
    </main>
  );
}
