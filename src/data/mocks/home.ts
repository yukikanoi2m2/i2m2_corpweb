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

/**
 * An English category label paired with its Japanese business name — the two
 * core businesses are always presented as this pair (see the brand direction:
 * differentiate by layout and typography, never by colour).
 */
export interface CoreKeyword {
  /** Uppercase English category, e.g. `MEDICAL DIGITALIZATION`. */
  label: string;
  /** Japanese business name, e.g. `カルテ電子化・医療DX`. */
  name: string;
}

export interface ExperienceCopy {
  eyebrow: string;
  /** Heading split into lines — each entry was a `<br>`-separated row. */
  titleLines: string[];
  subtitle: string;
  buttons: ExperienceButton[];
  /**
   * Optional two-up keyword pair rendered under the hero heading, so a first
   * time visitor reads "カルテ電子化 × 医療M&A" within seconds rather than
   * having to scroll.
   */
  keywords?: CoreKeyword[];
  /**
   * Optional numbered business blocks. When present the section renders these
   * instead of `subtitle` as a single paragraph — the two core businesses need
   * to read as two distinct things, not one run-on sentence.
   */
  items?: CoreBusinessItem[];
}

/** One of the two core businesses, as shown in the CORE BUSINESSES overlay. */
export interface CoreBusinessItem {
  /** `01` / `02`. */
  num: string;
  /** Uppercase English category. */
  label: string;
  /** Japanese business name. */
  title: string;
  description: string;
  /** Deep link into the matching block on `/services`. */
  href: string;
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
    eyebrow: "MEDICAL DX × HEALTHCARE M&A",
    titleLines: [
      "医療を、次の世代へ。",
    ],
    subtitle:
      "株式会社イズムズは、紙カルテの電子化による「医療DX」と、医療M&A・事業承継を中核事業とする事業会社です。",
    // Anchors resolve to the CORE BUSINESSES blocks on /services.
    buttons: [
      {
        label: "カルテ電子化について",
        withArrow: true,
        href: "/services#medical-digitalization",
      },
      {
        label: "M&A・事業承継について",
        withArrow: false,
        href: "/services#healthcare-ma",
      },
    ],
    keywords: [
      { label: "MEDICAL DIGITALIZATION", name: "カルテ電子化・医療DX" },
      { label: "HEALTHCARE M&A", name: "医療M&A・事業承継" },
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
        "医療機関・介護事業者との取引実績。承継とデジタル化の現場を重ねています。",
    },
    {
      id: "employees",
      title: "グループ社員",
      stat: "641名+",
      description:
        "医療の情報と事業を次の世代へつなぐ体制を、組織として支えています。",
    },
  ],
  // The two core businesses, stated as one idea rather than a service list.
  wave: {
    eyebrow: "CORE BUSINESSES",
    titleLines: ["医療の「情報」と「事業」を、", "次の世代へ。"],
    // Kept as a plain-text fallback / SEO summary; the overlay renders `items`.
    subtitle:
      "紙カルテの電子化による医療DXと、医療M&A・事業承継。この2つを中核事業としています。",
    items: [
      {
        num: "01",
        label: "MEDICAL DIGITALIZATION",
        title: "カルテ電子化・医療DX",
        description:
          "紙カルテのスキャンとAI-OCRによる電子保存で、医療情報を安全に引き継ぎます。",
        href: "/services#medical-digitalization",
      },
      {
        num: "02",
        label: "HEALTHCARE M&A",
        title: "医療M&A・事業承継",
        description:
          "医療法人・クリニックの承継を、次の担い手へつなぎます。",
        href: "/services#healthcare-ma",
      },
    ],
    buttons: [
      {
        label: "カルテ電子化について詳しく見る",
        withArrow: true,
        href: "/services#medical-digitalization",
      },
      {
        label: "M&A・事業承継について詳しく見る",
        withArrow: false,
        href: "/services#healthcare-ma",
      },
    ],
  },
  // Brand story — the "why" behind the two businesses. Uses the second copy
  // variant so it never repeats the hero heading verbatim.
  galaxy: {
    eyebrow: "OUR PURPOSE",
    titleLines: ["医療の記録を未来へ。", "医療の事業を次の担い手へ。"],
    subtitle:
      "紙のカルテに残された診療の記録も、地域で続いてきた医療機関そのものも、そのままでは次の世代に引き継げません。私たちは情報と事業の両面から、医療が続いていくための土台をつくります。",
    buttons: [
      { label: "会社概要", withArrow: true, href: "/company" },
      { label: "お問い合わせ", withArrow: false, href: "https://forms.gle/9GjvAXSTRwnANpg97" },
    ],
  },
};
