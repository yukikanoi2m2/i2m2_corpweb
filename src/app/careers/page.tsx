"use client";

import { animated, easings, useSpring, useTrail } from "@react-spring/web";
import { useEffect, useState } from "react";

import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border";
import { Eyebrow } from "@/components/ui/eyebrow";

const POSITIONS = [
  {
    title: "マーケティングコンサルタント",
    department: "マーケティング事業部",
    type: "正社員",
    description:
      "医療機関向けデジタルマーケティングの企画・運用。広告運用経験者歓迎。",
  },
  {
    title: "M&Aアドバイザー",
    department: "M&A事業部",
    type: "正社員",
    description:
      "医療・介護領域のM&A案件を担当。金融業界経験者歓迎。",
  },
  {
    title: "DXエンジニア",
    department: "DX事業部",
    type: "正社員 / 業務委託",
    description:
      "医療系システムの開発。Python/TypeScript経験者歓迎。",
  },
  {
    title: "キャリアアドバイザー",
    department: "人材事業部",
    type: "正社員",
    description:
      "医療系人材のキャリアカウンセリング・マッチング業務。",
  },
];

const VALUES = [
  {
    title: "誠実であること",
    description: "クライアントと社員の信頼を第一に、透明性のある事業運営を徹底します。",
  },
  {
    title: "スピード感",
    description: "創業1年2ヶ月で641名を超える組織に。変化を恐れず、素早く実行します。",
  },
  {
    title: "地域への貢献",
    description: "医療を起点に地域社会の価値を高める。ひとりひとりの仕事が社会に繋がります。",
  },
];

const ACCENT_RING =
  "linear-gradient(90deg, var(--accent-warm), var(--accent-cool), var(--accent-warm))";

export default function CareersPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const headerSpring = useSpring({
    from: { opacity: 0, y: 40 },
    to: { opacity: mounted ? 1 : 0, y: mounted ? 0 : 40 },
    config: { duration: 1000, easing: easings.easeOutQuart },
    delay: 200,
  });

  const valuesTrail = useTrail(VALUES.length, {
    from: { opacity: 0, y: 20 },
    to: { opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 },
    config: { duration: 800, easing: easings.easeOutQuart },
    delay: 500,
  });

  const posTrail = useTrail(POSITIONS.length, {
    from: { opacity: 0, y: 30 },
    to: { opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 },
    config: { duration: 800, easing: easings.easeOutQuart },
    delay: 800,
  });

  return (
    <main className="relative min-h-screen bg-background pt-24 pb-16 sm:pt-28 sm:pb-20">
      {/* Page header */}
      <animated.section
        style={headerSpring}
        className="mx-auto max-w-4xl px-5 text-center sm:px-6"
      >
        <Eyebrow>CAREERS</Eyebrow>
        <h1 className="mt-10 font-display text-display-sm font-light leading-title tracking-title text-foreground">
          採用情報
        </h1>
        <p className="mt-5 text-lead font-light leading-[1.8] tracking-wide text-muted">
          医療を起点に、地域の未来をつくる仲間を募集しています。
        </p>
      </animated.section>

      {/* Values */}
      <section className="mx-auto mt-14 max-w-5xl px-5 sm:mt-20 sm:px-6">
        <h2 className="mb-8 text-center font-display text-kicker font-medium uppercase tracking-[0.25em] text-muted">
          OUR VALUES
        </h2>
        <div className="grid gap-5 sm:grid-cols-3 sm:gap-6">
          {valuesTrail.map((style, i) => {
            const v = VALUES[i];
            return (
              <animated.article
                key={v.title}
                style={style}
                className="rounded-2xl border border-border-glass bg-surface-glass p-6 backdrop-blur-md sm:p-8"
              >
                <h3 className="mb-3 font-display text-lg font-normal tracking-tight text-foreground">
                  {v.title}
                </h3>
                <p className="text-lead font-light leading-[1.8] text-muted">
                  {v.description}
                </p>
              </animated.article>
            );
          })}
        </div>
      </section>

      {/* Open positions */}
      <section className="mx-auto mt-20 max-w-5xl px-5 sm:mt-28 sm:px-6">
        <h2 className="mb-10 text-center font-display text-display-sm font-light leading-title tracking-title text-foreground">
          募集職種
        </h2>
        <div className="flex flex-col gap-5 sm:gap-6">
          {posTrail.map((style, i) => {
            const pos = POSITIONS[i];
            return (
              <animated.div
                key={pos.title}
                style={style}
                className="relative overflow-hidden rounded-2xl border border-border-glass bg-surface-glass p-6 backdrop-blur-md sm:p-10"
              >
                <AnimatedGradientBorder
                  gradient={ACCENT_RING}
                  durationMs={6000}
                  className="rounded-2xl"
                />
                <div className="relative">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="text-eyebrow font-medium uppercase tracking-[0.15em] text-gradient-accent">
                      {pos.department}
                    </span>
                    <span className="rounded-full border border-border-glass px-3 py-0.5 text-[10px] font-medium tracking-wider text-muted">
                      {pos.type}
                    </span>
                  </div>
                  <h3 className="mb-3 font-display text-xl font-normal tracking-tight text-foreground sm:text-2xl">
                    {pos.title}
                  </h3>
                  <p className="text-lead font-light leading-[1.8] text-muted">
                    {pos.description}
                  </p>
                </div>
              </animated.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-20 max-w-3xl px-5 text-center sm:mt-28 sm:px-6">
        <h2 className="font-display text-display-sm font-light leading-title tracking-title text-foreground">
          一緒に、地域の未来をつくりませんか。
        </h2>
        <p className="mt-4 text-lead font-light leading-[1.8] tracking-wide text-muted">
          ご応募・カジュアル面談のご希望は、お問い合わせフォームよりご連絡ください。
        </p>
      </section>
    </main>
  );
}
