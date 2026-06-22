import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const faqPage = (c: Context) => {
  return c.html(layout('よくある質問', `
${breadcrumb([{ label: 'よくある質問' }])}
<section class="page-hero"><div class="container"><h1 class="page-title">よくある質問</h1></div></section>

<section class="section">
  <div class="container narrow">
    ${sectionTitle('M&A', 'M&Aに関するFAQ')}
    <div class="faq-list">
      <details class="faq-item"><summary>相談費用はかかりますか？</summary><p>初回相談は無料です。着手金・中間金の有無は案件規模により異なりますので、まずはお気軽にご相談ください。</p></details>
      <details class="faq-item"><summary>情報は外部に漏れませんか？</summary><p>秘密保持契約（NDA）を締結の上で進行します。社内でも情報アクセスを厳格に制限しています。</p></details>
      <details class="faq-item"><summary>売却価格はどのように決まりますか？</summary><p>財務分析・事業価値評価に基づき算出します。複数の評価手法を用いて適正な価格帯をご提示します。</p></details>
      <details class="faq-item"><summary>成約までどのくらいの期間がかかりますか？</summary><p>案件により異なりますが、6ヶ月〜1年程度が目安です。</p></details>
      <details class="faq-item"><summary>必要な資料は何ですか？</summary><p>初回相談時は特に資料不要です。本格検討段階で決算書等をご用意いただきます。</p></details>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container narrow">
    ${sectionTitle('MARKETING', '広告支援に関するFAQ')}
    <div class="faq-list">
      <details class="faq-item"><summary>対応媒体は何ですか？</summary><p>Google広告、Yahoo!広告、Facebook/Instagram広告、LINE広告等の主要媒体に対応しています。</p></details>
      <details class="faq-item"><summary>最低予算はありますか？</summary><p>月額10万円程度から対応可能です。予算に応じた最適なプランをご提案します。</p></details>
      <details class="faq-item"><summary>契約期間の縛りはありますか？</summary><p>最低3ヶ月からの契約です。効果検証のため一定期間の運用を推奨しています。</p></details>
      <details class="faq-item"><summary>レポートはどのくらいの頻度で？</summary><p>月次レポートを標準提供。週次でのミーティング対応も可能です。</p></details>
    </div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    ${sectionTitle('EQUIPMENT', '医療機器代理店に関するFAQ')}
    <div class="faq-list">
      <details class="faq-item"><summary>取り扱いメーカーは限定されますか？</summary><p>特定メーカーに限定せず、複数メーカーの製品から最適なものをご提案します。</p></details>
      <details class="faq-item"><summary>対応エリアはどこですか？</summary><p>全国対応可能です。設置工事が必要な場合は地域の協力業者と連携します。</p></details>
      <details class="faq-item"><summary>見積もりだけでも依頼できますか？</summary><p>もちろん可能です。お気軽にお問い合わせください。</p></details>
      <details class="faq-item"><summary>導入後の保守対応は？</summary><p>メーカー保証に加え、当社独自のサポート体制で迅速に対応します。</p></details>
      <details class="faq-item"><summary>メーカーの指定は可能ですか？</summary><p>可能です。ご指定メーカーの製品手配も対応いたします。</p></details>
    </div>
  </div>
</section>

${ctaSection()}
`))
}
