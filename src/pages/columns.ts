import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const columnsPage = (c: Context) => {
  const slug = c.req.param('slug') || ''
  
  if (slug) {
    return c.html(layout('コラム詳細', articleDetail(slug)))
  }

  return c.html(layout('コラム', `
${breadcrumb([{ label: 'コラム' }])}
<section class="page-hero"><div class="container"><h1 class="page-title">コラム</h1><p class="page-lead">M&A・広告・医療機器・医療経営に関するお役立ち情報を発信しています。</p></div></section>

<section class="section">
  <div class="container">
    <div class="case-filter">
      <a href="/columns" class="filter-btn active">すべて</a>
      <a href="/columns" class="filter-btn">M&A</a>
      <a href="/columns" class="filter-btn">広告・マーケティング</a>
      <a href="/columns" class="filter-btn">医療機器</a>
      <a href="/columns" class="filter-btn">医療経営</a>
      <a href="/columns" class="filter-btn">事業承継</a>
      <a href="/columns" class="filter-btn">クリニック開業</a>
    </div>
    <div class="columns-grid">
      <a href="/columns/medical-ma-points" class="col-card"><span class="col-cat">M&A</span><h3>医療法人M&Aで重視すべきポイント</h3><p>医療法人のM&Aを検討する際に、押さえておくべき重要なポイントを解説。</p><time>2024.11.20</time></a>
      <a href="/columns/clinic-succession" class="col-card"><span class="col-cat">事業承継</span><h3>クリニック承継における注意点</h3><p>クリニックの承継を成功させるために確認すべき項目と注意事項。</p><time>2024.11.10</time></a>
      <a href="/columns/sale-preparation" class="col-card"><span class="col-cat">M&A</span><h3>会社売却時に準備すべき資料</h3><p>会社売却をスムーズに進めるために事前準備すべき資料一覧。</p><time>2024.10.30</time></a>
      <a href="/columns/medical-ad-expression" class="col-card"><span class="col-cat">広告</span><h3>医療広告で注意すべき表現</h3><p>医療広告ガイドラインに沿った適正な広告表現のポイント。</p><time>2024.10.20</time></a>
      <a href="/columns/clinic-patient-acquisition" class="col-card"><span class="col-cat">集患</span><h3>クリニック集患広告の基本</h3><p>クリニックの集患に効果的な広告手法と運用のコツ。</p><time>2024.10.10</time></a>
      <a href="/columns/clinic-opening-equipment" class="col-card"><span class="col-cat">開業</span><h3>クリニック開業時に必要な医療機器</h3><p>開業時の機器選定で失敗しないためのガイド。</p><time>2024.09.30</time></a>
      <a href="/columns/jimucho-outsource" class="col-card"><span class="col-cat">経営</span><h3>クリニック事務長代行とは</h3><p>事務長代行サービスの概要と活用メリットを解説。</p><time>2024.09.20</time></a>
      <a href="/columns/medical-dx-caution" class="col-card"><span class="col-cat">DX</span><h3>医療DX導入時の注意点</h3><p>医療機関のDX推進で失敗しないためのポイント。</p><time>2024.09.10</time></a>
    </div>
  </div>
</section>

${ctaSection()}
`))
}

function articleDetail(slug: string) {
  return `
${breadcrumb([{ label: 'コラム', href: '/columns' }, { label: '記事詳細' }])}
<article class="article-page">
  <div class="container narrow">
    <div class="article-header">
      <span class="article-cat">M&A</span>
      <time>2024.11.20</time>
      <h1>コラム記事タイトル</h1>
    </div>
    <div class="article-body">
      <p>この記事では、医療法人のM&Aにおいて重視すべきポイントについて詳しく解説します。</p>
      <h2>ポイント1: 事前準備の重要性</h2>
      <p>M&Aを成功させるためには、十分な事前準備が欠かせません。特に医療法人の場合、行政手続きや届出が必要となるケースが多いため、早い段階からの準備が重要です。</p>
      <h2>ポイント2: 専門家への相談</h2>
      <p>医療法人のM&Aは通常の企業M&Aと異なる点が多くあります。医療業界に精通したアドバイザーへの相談を推奨します。</p>
    </div>
    <!-- 関連サービスLP CTA -->
    <div class="article-cta-box">
      <h3>M&Aに関するご相談</h3>
      <p>医療法人・クリニックのM&A、事業承継に関する無料相談を受付中です。</p>
      <div class="article-cta-buttons">
        <a href="/ma" class="btn btn-primary">M&A支援サービスを見る</a>
        <a href="/contact/ma" class="btn btn-outline">無料相談はこちら</a>
      </div>
    </div>
    <!-- 関連資料 -->
    <div class="article-related-resources">
      <h3>関連資料ダウンロード</h3>
      <a href="/resources" class="resource-link"><i class="fas fa-file-pdf"></i> 医療法人M&Aガイド</a>
      <a href="/resources" class="resource-link"><i class="fas fa-file-pdf"></i> 事業承継チェックリスト</a>
    </div>
    <!-- 関連FAQ -->
    <div class="article-related-faq">
      <h3>関連FAQ</h3>
      <details class="faq-item"><summary>相談費用はかかりますか？</summary><p>初回相談は無料です。</p></details>
      <details class="faq-item"><summary>情報は外部に漏れませんか？</summary><p>NDA締結の上で進行します。</p></details>
    </div>
  </div>
</article>`
}
