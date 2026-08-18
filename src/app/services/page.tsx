"use client";

import { animated, easings, useSpring, useTrail } from "@react-spring/web";
import { useEffect, useState } from "react";

import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border";
import { Eyebrow } from "@/components/ui/eyebrow";

const SERVICES = [
  {
    num: "01",
    category: "マーケティング事業",
    title: "医療マーケティング・広告運用",
    description:
      "クリニック・病院の集患を最大化するデジタルマーケティング。リスティング広告、MEO対策、SNS運用、LP制作まで一気通貫で支援します。累計広告運用額3億円+の実績。",
  },
  {
    num: "02",
    category: "DX事業",
    title: "紙カルテ・スキャン・OCR電子保存",
    description:
      "紙カルテのスキャン・OCR読み取り・電子保存をワンストップで提供。診療録の電子化により、検索性向上・スペース削減・BCP対策を実現します。",
  },
  {
    num: "03",
    category: "経営支援事業",
    title: "経営改善支援",
    description:
      "医療機関の経営課題を包括的にサポート。資金繰り改善、事業計画策定、財務分析、経営戦略立案など、選定から実行支援まで一気通貫で対応します。",
  },
  {
    num: "04",
    category: "人材事業",
    title: "医療系人材マッチング",
    description:
      "医師・看護師・薬剤師・介護職など医療系専門職の転職支援。採用ニーズの発掘からキャリアカウンセリング、入職後の定着サポートまで対応します。",
  },
  {
    num: "05",
    category: "M&A事業",
    title: "M&A・事業承継・事業再生",
    description:
      "医療・介護・福祉を中心に全業種対応のM&A仲介。後継者不在問題の解決から事業再生・PMIまで、完全成功報酬型・秘密厳守で対応します。",
  },
];

const STRENGTHS = [
  {
    stat: "36\u5104\u5186+",
    label: "\u7dcf\u58f2\u4e0a",
    description:
      "\u5275\u696d1\u5e742\u30f6\u6708\u3067\u30b0\u30eb\u30fc\u30d7\u793e\u54e1641\u540d\u4ee5\u4e0a\u3001\u7dcf\u58f2\u4e0a36\u5104\u5186\u3092\u7a81\u7834\u3002",
  },
  {
    stat: "\u30ef\u30f3\u30b9\u30c8\u30c3\u30d7",
    label: "\u652f\u63f4\u4f53\u5236",
    description:
      "\u96c6\u60a3\u30fb\u4eba\u6750\u30fb\u8cc7\u91d1\u8abf\u9054\u30fbM&A\u30fbDX\u307e\u3067\u3001\u3072\u3068\u3064\u306e\u7a93\u53e3\u3067\u89e3\u6c7a\u3002",
  },
  {
    stat: "\u8aa0\u5b9f\u30fb\u900f\u660e",
    label: "\u4e8b\u696d\u904b\u55b6",
    description:
      "\u6cd5\u4ee4\u9075\u5b88\u3068\u60c5\u5831\u7ba1\u7406\u3092\u5fb9\u5e95\u3057\u3001\u5b89\u5fc3\u306e\u4f53\u5236\u3092\u69cb\u7bc9\u3002",
  },
];

const ACCENT_RING =
  "linear-gradient(90deg, var(--accent-warm), var(--accent-cool), var(--accent-warm))";

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const headerSpring = useSpring({
    from: { opacity: 0, y: 40 },
    to: { opacity: mounted ? 1 : 0, y: mounted ? 0 : 40 },
    config: { duration: 1000, easing: easings.easeOutQuart },
    delay: 200,
  });

  const trail = useTrail(SERVICES.length, {
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
        <Eyebrow>SERVICES</Eyebrow>
        <h1 className="mt-10 font-display text-display-sm font-light leading-title tracking-title text-foreground">
          事業内容
        </h1>
        <p className="mt-5 text-lead font-light leading-relaxed tracking-wide text-muted">
          ヘルスケアを起点に、
          <br className="sm:hidden" />
          医療機関の成長を多角的に支援します。
        </p>
      </animated.section>

      {/* Services list */}
      <section className="mx-auto mt-14 max-w-5xl px-5 sm:mt-20 sm:px-6">
        <div className="flex flex-col gap-5 sm:gap-6">
          {trail.map((style, i) => {
            const service = SERVICES[i];
            return (
              <animated.div
                key={service.num}
                style={style}
                className="relative overflow-hidden rounded-2xl border border-border-glass bg-surface-glass p-6 backdrop-blur-md sm:p-10"
              >
                <AnimatedGradientBorder
                  gradient={ACCENT_RING}
                  durationMs={5000}
                  className="rounded-2xl"
                />
                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
                  <span className="shrink-0 font-display text-stat font-extralight text-gradient-accent">
                    {service.num}
                  </span>
                  <div className="flex-1">
                    <p className="mb-1.5 text-eyebrow font-medium uppercase tracking-[0.2em] text-muted">
                      {service.category}
                    </p>
                    <h2 className="mb-3 font-display text-xl font-normal tracking-tight text-foreground sm:text-2xl">
                      {service.title}
                    </h2>
                    <p className="text-lead font-light leading-[1.8] text-muted">
                      {service.description}
                    </p>
                  </div>
                </div>
              </animated.div>
            );
          })}
        </div>
      </section>

      {/* Strengths */}
      <section className="mx-auto mt-20 max-w-5xl px-5 sm:mt-28 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-3 sm:gap-6">
          {strengthTrail.map((style, i) => {
            const s = STRENGTHS[i];
            return (
              <animated.article
                key={s.label}
                style={style}
                className="rounded-2xl border border-border-glass bg-surface-glass p-8 backdrop-blur-md"
              >
                <p className="mb-2 font-display text-stat font-extralight text-gradient-accent">
                  {s.stat}
                </p>
                <p className="mb-3 text-kicker font-semibold uppercase tracking-[0.2em] text-foreground/90">
                  {s.label}
                </p>
                <p className="text-lead font-light leading-[1.8] text-muted">
                  {s.description}
                </p>
              </animated.article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-20 max-w-3xl px-5 text-center sm:mt-28 sm:px-6">
        <p className="text-lead font-light leading-[1.8] tracking-wide text-muted">
          各サービスの詳細は担当者よりご案内いたします。
        </p>
        <h2 className="mt-4 font-display text-display-sm font-light leading-title tracking-title text-foreground whitespace-nowrap">
          お気軽にご相談ください
        </h2>
      </section>
    </main>
  );
}
