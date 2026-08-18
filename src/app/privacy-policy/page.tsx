"use client";

import { animated, easings, useSpring, useTrail } from "@react-spring/web";
import { useEffect, useState } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Privacy policy — the destination of the cookie banner / preferences modal
 * "プライバシーポリシー" links, which previously 404'd. Content covers the
 * three consent categories the cookie store actually manages (necessary,
 * analytics, marketing).
 */

interface Section {
  heading: string;
  body: string[];
  list?: string[];
}

const SECTIONS: Section[] = [
  {
    heading: "1. 基本方針",
    body: [
      "株式会社イズムズ（以下「当社」）は、当社ウェブサイトのご利用にあたり取得する個人情報の重要性を認識し、個人情報の保護に関する法律その他の関係法令およびガイドラインを遵守するとともに、以下の方針に基づき適切に取り扱います。",
    ],
  },
  {
    heading: "2. 取得する情報",
    body: ["当社は、当社ウェブサイトの運営にあたり、以下の情報を取得する場合があります。"],
    list: [
      "お問い合わせフォーム等を通じてお客様が入力された氏名・メールアドレス・お問い合わせ内容",
      "ブラウザから自動的に送信される IP アドレス、ユーザーエージェント、参照元 URL",
      "Cookie および類似技術により取得される閲覧履歴等の利用状況に関する情報",
    ],
  },
  {
    heading: "3. 利用目的",
    body: ["取得した情報は、以下の目的の範囲内で利用します。"],
    list: [
      "お問い合わせへの回答および必要な連絡のため",
      "当社ウェブサイトの利用状況の把握、および表示内容・機能の改善のため",
      "当社サービスに関する情報提供および広告配信の効果測定のため",
      "法令に基づく対応、その他上記に付随する業務のため",
    ],
  },
  {
    heading: "4. Cookie の利用について",
    body: [
      "当社ウェブサイトでは、利便性の向上および利用状況の分析のために Cookie を使用します。Cookie は以下の3つのカテゴリーに分類しており、「必須」を除くすべてのカテゴリーについて、お客様は同意の可否をいつでも選択・変更できます。",
    ],
    list: [
      "必須：サイトの動作に必要な Cookie です。同意設定の保存、セキュリティ、ページ遷移に使用し、無効にすることはできません。",
      "アナリティクス：どのページが閲覧されているかを匿名化された統計として把握し、サイト改善に用います。個人を特定するプロファイルは作成しません。",
      "マーケティング：広告の効果測定や、関連性の高いコンテンツの再表示に用います。いつでもオプトアウトできます。",
    ],
  },
  {
    heading: "5. 同意の変更・撤回",
    body: [
      "Cookie の利用に関する同意は、画面上の Cookie 設定からいつでも変更または撤回できます。撤回後は、必須 Cookie を除く Cookie の利用を停止します。なお、ブラウザの設定により Cookie を無効化することも可能ですが、その場合サイトの一部機能が正常に動作しないことがあります。",
    ],
  },
  {
    heading: "6. 第三者提供",
    body: [
      "当社は、お客様の同意がある場合、または法令に基づき開示が必要な場合を除き、取得した個人情報を第三者に提供しません。ただし、利用目的の達成に必要な範囲で、適切な監督のもと業務委託先に取り扱いを委託する場合があります。",
    ],
  },
  {
    heading: "7. 安全管理措置",
    body: [
      "当社は、取得した個人情報の漏洩、滅失または毀損を防止するため、アクセス権限の管理、通信の暗号化その他必要かつ適切な安全管理措置を講じます。",
    ],
  },
  {
    heading: "8. 開示・訂正・削除等のご請求",
    body: [
      "お客様は、当社が保有するご自身の個人情報について、開示、訂正、利用停止または削除を請求することができます。ご請求は下記のお問い合わせ窓口までご連絡ください。ご本人であることを確認のうえ、法令に従い対応いたします。",
    ],
  },
  {
    heading: "9. 本方針の変更",
    body: [
      "当社は、法令の改正や事業内容の変更等に応じて、本方針を変更する場合があります。変更後の内容は当社ウェブサイトに掲載した時点から適用されます。",
    ],
  },
  {
    heading: "10. お問い合わせ窓口",
    body: [
      "本方針および個人情報の取り扱いに関するお問い合わせは、当社お問い合わせページよりご連絡ください。",
      "株式会社イズムズ　〒106-6137 東京都港区六本木6-10-1 六本木ヒルズ森タワー37F",
    ],
  },
];

const LAST_UPDATED = "2026年8月18日";

export default function PrivacyPolicyPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const headerSpring = useSpring({
    from: { opacity: 0, y: 40 },
    to: { opacity: mounted ? 1 : 0, y: mounted ? 0 : 40 },
    config: { duration: 1000, easing: easings.easeOutQuart },
    delay: 200,
  });

  const sectionTrail = useTrail(SECTIONS.length, {
    from: { opacity: 0, y: 20 },
    to: { opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 },
    config: { duration: 800, easing: easings.easeOutQuart },
    delay: 500,
  });

  return (
    <main className="relative min-h-screen bg-background pt-24 pb-16 sm:pt-28 sm:pb-20">
      {/* Page header */}
      <animated.section
        style={headerSpring}
        className="mx-auto max-w-4xl px-5 text-center sm:px-6"
      >
        <Eyebrow>PRIVACY POLICY</Eyebrow>
        <h1 className="mt-10 font-display text-display-sm font-light leading-title tracking-title text-foreground">
          プライバシーポリシー
        </h1>
        <p className="mt-5 text-lead font-light leading-[1.8] tracking-wide text-muted">
          個人情報および Cookie の取り扱いについて
        </p>
      </animated.section>

      {/* Policy body */}
      <div className="mx-auto mt-14 max-w-4xl px-5 sm:mt-20 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-border-glass bg-surface-glass backdrop-blur-md">
          {sectionTrail.map((style, i) => {
            const section = SECTIONS[i];
            return (
              <animated.section
                key={section.heading}
                style={style}
                className={`px-5 py-6 sm:px-8 sm:py-8 ${
                  i < SECTIONS.length - 1 ? "border-b border-border-glass" : ""
                }`}
              >
                <h2 className="font-display text-lead font-medium leading-title tracking-title text-foreground">
                  {section.heading}
                </h2>

                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-lead font-light leading-[1.9] tracking-wide text-muted"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.list && (
                  <ul className="mt-4 space-y-3">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-lead font-light leading-[1.9] tracking-wide text-muted"
                      >
                        <span aria-hidden="true" className="text-foreground/40">
                          —
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </animated.section>
            );
          })}
        </div>

        <p className="mt-8 text-right text-eyebrow font-light tracking-wide text-muted">
          制定日：{LAST_UPDATED}
        </p>
      </div>
    </main>
  );
}
