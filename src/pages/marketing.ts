import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const marketingPage = (c: Context) => {
  return c.html(layout('広告・マーケティング支援', `
${breadcrumb([{ label: '事業内容', href: '/services' }, { label: '広告・マーケティング支援' }])}

<!-- HERO -->
<section class="lp-hero lp-hero-marketing">
  <div class="container">
    <div class="lp-hero-content">
      <div class="lp-hero-tag">Advertising & Marketing</div>
      <h1 class="lp-hero-title">医療機関・法人向け<br><span class="accent">広告・マーケティング支援</span></h1>
      <p class="lp-hero-desc">集患・採用・ブランディング。医療広告ガイドラインを踏まえた適正な運用で、確実に成果を出します。</p>
      <div class="lp-hero-actions">
        <a href="/contact/marketing" class="btn btn-primary btn-lg">広告相談 <i class="fas fa-arrow-right"></i></a>
        <a href="/resources" class="btn btn-outline">資料ダウンロード</a>
      </div>
    </div>
  </div>
</section>

<!-- PAIN POINTS -->
<section class="section section-pain">
  <div class="container">
    ${sectionTitle('ISSUES', 'このようなお悩みはありませんか')}
    <div class="pain-grid">
      <div class="pain-item"><i class="fas fa-user-minus"></i><p>集患が伸びない</p></div>
      <div class="pain-item"><i class="fas fa-users-slash"></i><p>採用応募が集まらない</p></div>
      <div class="pain-item"><i class="fas fa-money-bill-wave"></i><p>Web広告の費用対効果が見えない</p></div>
      <div class="pain-item"><i class="fas fa-globe"></i><p>ホームページやLPを改善したい</p></div>
      <div class="pain-item"><i class="fas fa-map-marker-alt"></i><p>MEO・SEOを強化したい</p></div>
      <div class="pain-item"><i class="fas fa-bullhorn"></i><p>SNS活用の方法がわからない</p></div>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('SERVICES', '提供サービス')}
    <div class="service-detail-grid">
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-ad"></i></div><h3>Web広告運用</h3><p>Google・Yahoo!・SNS広告を医療業界に最適化して運用します。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-hospital"></i></div><h3>医療機関向け集患支援</h3><p>地域・診療科に応じた集患戦略を立案・実行します。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-user-plus"></i></div><h3>採用広告支援</h3><p>医師・看護師・コメディカルの採用に特化した広告を展開。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-laptop-code"></i></div><h3>LP・ホームページ制作</h3><p>CV最適化されたLP・ホームページを制作・改善します。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-search"></i></div><h3>SEO・MEO対策</h3><p>検索上位表示とGoogleマップ対策で自然流入を増加。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-hashtag"></i></div><h3>SNS運用支援</h3><p>Instagram・LINE等のSNSを活用した認知拡大を支援。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-palette"></i></div><h3>クリエイティブ制作</h3><p>バナー・動画・パンフレット等の制作を一括対応。</p></div>
    </div>
  </div>
</section>

<!-- GUIDELINES -->
<section class="section">
  <div class="container">
    ${sectionTitle('COMPLIANCE', '医療広告ガイドラインへの配慮')}
    <div class="guideline-wrap">
      <p class="section-lead">医療広告には厳格なルールがあります。当社は法令・ガイドラインを遵守した運用体制を整備しています。</p>
      <div class="guideline-grid">
        <div class="guideline-item"><i class="fas fa-check-circle"></i><span>表現チェック体制</span></div>
        <div class="guideline-item"><i class="fas fa-check-circle"></i><span>誇大表現の回避</span></div>
        <div class="guideline-item"><i class="fas fa-check-circle"></i><span>掲載内容の確認フロー</span></div>
        <div class="guideline-item"><i class="fas fa-check-circle"></i><span>法令・ガイドライン踏まえた運用</span></div>
      </div>
    </div>
  </div>
</section>

<!-- FLOW -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('FLOW', '支援の流れ')}
    <div class="flow-steps">
      <div class="flow-step"><div class="flow-num">01</div><h4>ヒアリング</h4><p>課題・目標・予算をヒアリング。</p></div>
      <div class="flow-step"><div class="flow-num">02</div><h4>現状分析</h4><p>アクセス解析・競合調査を実施。</p></div>
      <div class="flow-step"><div class="flow-num">03</div><h4>戦略設計</h4><p>最適な媒体・施策を組み合わせた戦略を策定。</p></div>
      <div class="flow-step"><div class="flow-num">04</div><h4>広告配信・制作</h4><p>クリエイティブ制作・広告配信を開始。</p></div>
      <div class="flow-step"><div class="flow-num">05</div><h4>レポーティング</h4><p>定期レポートで効果を可視化。</p></div>
      <div class="flow-step"><div class="flow-num">06</div><h4>改善提案</h4><p>PDCAサイクルで継続的に改善。</p></div>
    </div>
  </div>
</section>

<!-- CASES -->
<section class="section">
  <div class="container">
    ${sectionTitle('CASES', '実績・事例')}
    <div class="results-grid">
      <div class="result-card"><div class="result-category">集患</div><h3>新規患者数180%改善</h3><p>Web広告+MEO対策の併用で半年間で新規患者数を大幅に増加。</p></div>
      <div class="result-card"><div class="result-category">採用</div><h3>看護師応募数3倍に</h3><p>採用広告のターゲティング最適化により応募数を大幅改善。</p></div>
      <div class="result-card"><div class="result-category">LP改善</div><h3>予約CVR 2.5倍</h3><p>LP改善とA/Bテストにより予約コンバージョン率を大幅向上。</p></div>
    </div>
  </div>
</section>

<!-- COLUMNS -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('COLUMN', '関連コラム')}
    <div class="column-list">
      <a href="/columns/medical-ad-expression" class="column-item"><span class="column-cat">広告</span><h4>医療広告で注意すべき表現</h4></a>
      <a href="/columns/clinic-patient-acquisition" class="column-item"><span class="column-cat">集患</span><h4>クリニック集患広告の基本</h4></a>
      <a href="/columns/recruitment-ad-tips" class="column-item"><span class="column-cat">採用</span><h4>採用広告で応募数を増やすポイント</h4></a>
      <a href="/columns/meo-checklist" class="column-item"><span class="column-cat">MEO</span><h4>MEO対策で確認すべき項目</h4></a>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section">
  <div class="container">
    ${sectionTitle('FAQ', 'よくある質問')}
    <div class="faq-list">
      <details class="faq-item"><summary>最低予算はありますか？</summary><p>月額10万円程度から対応可能です。予算に応じた最適なプランをご提案します。</p></details>
      <details class="faq-item"><summary>医療広告ガイドラインへの対応は？</summary><p>専門チームが表現チェックを行い、ガイドラインに準拠した広告運用を実施します。</p></details>
      <details class="faq-item"><summary>契約期間の縛りはありますか？</summary><p>最低3ヶ月からの契約となります。効果検証のため一定期間の運用を推奨しています。</p></details>
      <details class="faq-item"><summary>レポートはどのくらいの頻度で？</summary><p>月次レポートを標準提供。週次でのミーティング対応も可能です。</p></details>
    </div>
  </div>
</section>

<!-- CTA -->
${ctaSection({
  title: '広告・マーケティングのご相談',
  buttons: [
    { label: '広告運用相談', href: '/contact/marketing', primary: true },
    { label: '集患相談', href: '/contact/marketing' },
    { label: '採用広告相談', href: '/contact/marketing' }
  ]
})}
`, { description: '医療機関・法人向け広告運用支援。Web広告、集患、採用広告、SEO/MEO、LP制作をワンストップで提供。' }))
}
