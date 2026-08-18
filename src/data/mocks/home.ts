/**
 * Placeholder copy for the home experience — mirrors the static text in the
 * source `index.html`. Passed into the view via props; never imported directly
 * into a component (see component-conventions.md → Data rules).
 */

export interface ExperienceButton {
  label: string;
  /** Primary buttons render the circular arrow glyph; secondary do not. */
  withArrow: boolean;
  /** Optional navigation href — if provided, button becomes a link. */
  href?: string;
}

export interface ExperienceCopy {
  eyebrow: string;
  /** Heading split into lines — each entry was a `<br>`-separated row. */
  titleLines: string[];
  subtitle: string;
  buttons: ExperienceButton[];
}

export interface StatCardContent {
  id: string;
  title: string;
  stat: string;
  description: string;
}

export interface HomeContent {
  hero: ExperienceCopy;
  cards: StatCardContent[];
  wave: ExperienceCopy;
  galaxy: ExperienceCopy;
}

export const homeContent: HomeContent = {
  hero: {
    eyebrow: "REGIONAL VALUE CREATION",
    titleLines: [
      "地域の価値を、",
      "医療から。",
    ],
    subtitle:
      "株式会社イズムズは、医療マーケティング・人材・M&A・DXをワンストップで提供するヘルスケア特化の総合支援会社です。",
    buttons: [
      { label: "サービスを見る", withArrow: true, href: "/services" },
      { label: "会社概要", withArrow: false, href: "/company" },
    ],
  },
  cards: [
    {
      id: "revenue",
      title: "グループ総売上",
      stat: "36億円",
      description:
        "創業1年2ヶ月でグループ総売上36億円を突破。急成長を実現しています。",
    },
    {
      id: "deals",
      title: "グループ総取引",
      stat: "289件+",
      description:
        "医療・介護・美容など幅広い業種のお客様と多数のお取引実績があります。",
    },
    {
      id: "employees",
      title: "グループ社員",
      stat: "641名+",
      description:
        "全国6エリアで活躍する仲間たち。地域医療の未来を共に創造しています。",
    },
  ],
  wave: {
    eyebrow: "CREATE LOCAL VALUE",
    titleLines: ["医療を起点に、", "地域の未来をつくる。"],
    subtitle:
      "M&A・マーケティング・人材・DX — ひとつの窓口で。ヘルスケア領域の経営課題をワンストップで解決し、持続可能な地域医療を実現します。",
    buttons: [
      { label: "お問い合わせ", withArrow: true, href: "https://forms.gle/9GjvAXSTRwnANpg97" },
      { label: "採用情報", withArrow: false, href: "/careers" },
    ],
  },
  galaxy: {
    eyebrow: "SERVICES",
    titleLines: ["すべてが繋がる。"],
    subtitle:
      "医療マーケティング、カルテDX、経営改善支援、医療人材、M&A — 5つの事業が連携し、医療機関の成長を加速させます。",
    buttons: [
      { label: "サービス一覧", withArrow: true, href: "/services" },
      { label: "会社概要", withArrow: false, href: "/company" },
    ],
  },
};
