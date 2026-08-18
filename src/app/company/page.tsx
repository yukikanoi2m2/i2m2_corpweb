"use client";

import { animated, easings, useSpring, useTrail } from "@react-spring/web";

import { useEffect, useState } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";

const PROFILE_DATA = [
  { label: "\u5546\u53f7", value: "\u682a\u5f0f\u4f1a\u793e\u30a4\u30ba\u30e0\u30ba\uff08i2m2 Co., Ltd.\uff09" },
  { label: "\u8a2d\u7acb", value: "2025\u5e744\u67082\u65e5" },
  { label: "\u4ee3\u8868\u8005", value: "\u4ee3\u8868\u53d6\u7de0\u5f79 \u4e2d\u6751\u7f8e\u83ef" },
  {
    label: "\u672c\u793e\u6240\u5728\u5730",
    value: "\u3012106-6137 \u6771\u4eac\u90fd\u6e2f\u533a\u516d\u672c\u67286-10-1 \u516d\u672c\u6728\u30d2\u30eb\u30ba\u68ee\u30bf\u30ef\u30fc37F",
  },
  {
    label: "\u4e8b\u696d\u5185\u5bb9",
    value:
      "\u533b\u7642\u6a5f\u95a2\u30d7\u30ed\u30c7\u30e5\u30fc\u30b9 / M&A\u4ef2\u4ecb\u30fb\u4e8b\u696d\u627f\u7d99\u30fb\u4e8b\u696d\u518d\u751f",
  },
  { label: "関係会社", value: "医療法人白生会 その他数社" },
];

const STRENGTHS = [
  {
    title: "\u30d8\u30eb\u30b9\u30b1\u30a2\u9818\u57df\u3078\u306e\u6df1\u3044\u5c02\u9580\u6027",
    description:
      "\u96c6\u60a3\u304b\u3089\u4e8b\u696d\u627f\u7d99\u307e\u3067\u3001\u533b\u7642\u7d4c\u55b6\u3092\u30ef\u30f3\u30b9\u30c8\u30c3\u30d7\u3067\u652f\u63f4\u3002",
  },
  {
    title: "\u8c4a\u5bcc\u306a\u652f\u63f4\u5b9f\u7e3e",
    description:
      "\u533b\u7642\u30fb\u4ecb\u8b77\u30fb\u7f8e\u5bb9\u306a\u3069\u5e45\u5e83\u3044\u696d\u7a2e\u3067\u591a\u6570\u306e\u53d6\u5f15\u5b9f\u7e3e\u3002",
  },
  {
    title: "\u8aa0\u5b9f\u30fb\u900f\u660e\u306a\u4e8b\u696d\u904b\u55b6",
    description:
      "\u6cd5\u4ee4\u9075\u5b88\u30fb\u60c5\u5831\u7ba1\u7406\u3092\u5fb9\u5e95\u3057\u305f\u4fe1\u983c\u306e\u4f53\u5236\u3002",
  },
];

const HISTORY = [
  {
    date: "2025.04",
    title: "\u682a\u5f0f\u4f1a\u793e\u30a4\u30ba\u30e0\u30ba \u8a2d\u7acb",
    description: "\u30d8\u30eb\u30b9\u30b1\u30a2\u9818\u57df\u306b\u7279\u5316\u3057\u305f\u4f01\u696d\u3068\u3057\u3066\u5275\u696d\u3002\u4ee5\u964d\u3001\u8907\u6570\u30af\u30ea\u30cb\u30c3\u30af\u306e\u7d4c\u55b6\u306b\u95a2\u4e0e\u3002",
  },
  {
    date: "2025.08",
    title: "\u7f8e\u5bb9\u5916\u79d1\u30af\u30ea\u30cb\u30c3\u30af\u4e8b\u696d \u53c2\u5165",
    description:
      "\u65b0\u5bbf\u30fb\u6075\u6bd4\u5bff\u30a8\u30ea\u30a2\u306b\u3066\u7f8e\u5bb9\u5916\u79d1\u30af\u30ea\u30cb\u30c3\u30af\u306e\u7d4c\u55b6\u306b\u95a2\u4e0e\u3002\u30d8\u30eb\u30b9\u30b1\u30a2\xd7\u30d3\u30e5\u30fc\u30c6\u30a3\u30fc\u9818\u57df\u3092\u62e1\u5927\u3002",
  },
  {
    date: "2025.12",
    title: "M&A\u30b5\u30fc\u30d3\u30b9 \u30ea\u30ea\u30fc\u30b9",
    description:
      "\u533b\u7642\u30fb\u4ecb\u8b77\u30fb\u7f8e\u5bb9\u3092\u4e2d\u5fc3\u3068\u3057\u305fM&A\u4ef2\u4ecb\u30fb\u4e8b\u696d\u627f\u7d99\u652f\u63f4\u30b5\u30fc\u30d3\u30b9\u3092\u6b63\u5f0f\u30ea\u30ea\u30fc\u30b9\u3002",
  },
  {
    date: "2026.04",
    title: "\u7d4c\u55b6\u6539\u5584\u652f\u63f4\u30b5\u30fc\u30d3\u30b9 \u30ea\u30ea\u30fc\u30b9",
    description: "\u7d4c\u55b6\u6539\u5584\u652f\u63f4\u30b5\u30fc\u30d3\u30b9\u3092\u958b\u59cb\u3002\u533b\u7642\u6a5f\u95a2\u306e\u8cc7\u91d1\u8abf\u9054\u3092\u7dcf\u5408\u7684\u306b\u30b5\u30dd\u30fc\u30c8\u3002",
  },
  {
    date: "2026.06",
    title: "\u30b0\u30eb\u30fc\u30d7\u793e\u54e1641\u540d\u7a81\u7834\u30fb\u7dcf\u58f2\u4e0a36\u5104\u5186\u9054\u6210",
    description:
      "\u5275\u696d1\u5e742\u30f6\u6708\u3067\u30b0\u30eb\u30fc\u30d7\u793e\u54e1641\u540d\u4ee5\u4e0a\u3001\u7dcf\u58f2\u4e0a36\u5104\u5186\u3092\u7a81\u7834\u3002\u6771\u4eac\u90fd\u6e2f\u533a\u516d\u672c\u6728\u306b\u672c\u793e\u3092\u79fb\u8ee2\u3002",
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
        <h1 className="mt-10 font-display text-display-sm font-light leading-title tracking-title text-foreground">
          会社概要
        </h1>
        <p className="mt-5 text-lead font-light leading-[1.8] tracking-wide text-muted">
          株式会社イズムズは、ヘルスケア領域を中心に
          <br className="sm:hidden" />
          医療機関・地域社会への貢献を目指す会社です。
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
              <span className="text-lead font-light leading-[1.8] text-foreground">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </animated.section>

      {/* Strengths */}
      <section className="mx-auto mt-20 max-w-5xl px-5 sm:mt-28 sm:px-6">
        <h2 className="mb-10 text-center font-display text-display-sm font-light leading-title tracking-title text-foreground">
          私たちの強み
        </h2>
        <div className="grid gap-5 sm:grid-cols-3 sm:gap-6">
          {strengthTrail.map((style, i) => {
            const s = STRENGTHS[i];
            return (
              <animated.article
                key={s.title}
                style={style}
                className="rounded-2xl border border-border-glass bg-surface-glass p-6 backdrop-blur-md sm:p-8"
              >
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
        <h2 className="mb-10 text-center font-display text-display-sm font-light leading-title tracking-title text-foreground">
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
        <h2 className="mb-8 text-center font-display text-display-sm font-light leading-title tracking-title text-foreground">
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
        <h2 className="font-display text-display-sm font-light leading-title tracking-title text-foreground">
          お取引・事業連携に関するご相談は
          <br className="sm:hidden" />
          お気軽にどうぞ。
        </h2>
        <p className="mt-4 text-lead font-light leading-[1.8] tracking-wide text-muted">
          ヘルスケア・医療に関わるあらゆるご相談を承ります。
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
