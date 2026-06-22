import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const medicalManagementPage = (c: Context) => {
  return c.html(layout('医療機関経営支援', `
${breadcrumb([{ label: '事業内容', href: '/services' }, { label: '医療機関経営支援' }])}

<!-- HERO -->
<section class="lp-hero lp-hero-management">
  <div class="container">
    <div class="lp-hero-content">
      <div class="lp-hero-tag">Medical Management</div>
      <h1 class="lp-hero-title">医療機関の経営・運営課題を<br><span class="accent">実務から支援</span></h1>
      <p class="lp-hero-desc">事務長代行・採用支援・DX導入・収益改善。医療機関の「困った」を現場レベルで解決します。</p>
      <div class="lp-hero-actions">
        <a href="/contact" class="btn btn-primary btn-lg">経営相談 <i class="fas fa-arrow-right"></i></a>
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
      <div class="pain-item"><i class="fas fa-user-clock"></i><p>事務長機能が不足している</p></div>
      <div class="pain-item"><i class="fas fa-user-minus"></i><p>採用・定着に課題がある</p></div>
      <div class="pain-item"><i class="fas fa-chart-line"></i><p>収益改善を進めたい</p></div>
      <div class="pain-item"><i class="fas fa-sitemap"></i><p>業務フローを整備したい</p></div>
      <div class="pain-item"><i class="fas fa-baby"></i><p>病児保育事業を立ち上げたい</p></div>
      <div class="pain-item"><i class="fas fa-laptop-medical"></i><p>システム導入を進めたい</p></div>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('SERVICES', '提供サービス')}
    <div class="service-detail-grid">
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-hospital"></i></div><h3>クリニック運営支援</h3><p>日々の運営課題を現場目線でサポートします。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-baby"></i></div><h3>病児保育事業支援</h3><p>施設立ち上げから運営安定化まで包括的に支援。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-user-tie"></i></div><h3>事務長代行</h3><p>医師が診療に集中できるよう、経営管理業務を代行。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-users"></i></div><h3>採用・人事支援</h3><p>採用計画策定から面接・定着支援まで対応。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-laptop-code"></i></div><h3>DX・システム導入支援</h3><p>電子カルテ・予約システム等のIT導入を推進。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-chart-bar"></i></div><h3>収益改善支援</h3><p>診療報酬最適化・コスト見直しで経営改善を実現。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-clinic-medical"></i></div><h3>開業・分院展開支援</h3><p>新規開業や分院出店の事業計画から実行まで支援。</p></div>
    </div>
  </div>
</section>

<!-- DOMAIN -->
<section class="section">
  <div class="container">
    ${sectionTitle('DOMAIN', '支援領域')}
    <div class="domain-chips">
      <span class="chip">経営管理</span>
      <span class="chip">人事・採用</span>
      <span class="chip">集患</span>
      <span class="chip">オペレーション改善</span>
      <span class="chip">システム導入</span>
      <span class="chip">行政対応</span>
      <span class="chip">周辺事業開発</span>
    </div>
  </div>
</section>

<!-- FLOW -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('FLOW', '支援の流れ')}
    <div class="flow-steps">
      <div class="flow-step"><div class="flow-num">01</div><h4>現状ヒアリング</h4><p>経営状況・課題を詳しくお伺いします。</p></div>
      <div class="flow-step"><div class="flow-num">02</div><h4>課題整理</h4><p>課題を構造化し、優先度を整理。</p></div>
      <div class="flow-step"><div class="flow-num">03</div><h4>優先順位設計</h4><p>短期・中長期の改善ロードマップを策定。</p></div>
      <div class="flow-step"><div class="flow-num">04</div><h4>実行支援</h4><p>現場に入り込み、施策を実行。</p></div>
      <div class="flow-step"><div class="flow-num">05</div><h4>定例改善</h4><p>定期ミーティングでPDCAを回す。</p></div>
      <div class="flow-step"><div class="flow-num">06</div><h4>効果検証</h4><p>KPIを確認し、次の施策を立案。</p></div>
    </div>
  </div>
</section>

<!-- CASES -->
<section class="section">
  <div class="container">
    ${sectionTitle('CASES', '実績・事例')}
    <div class="results-grid">
      <div class="result-card"><div class="result-category">運営</div><h3>クリニック業務フロー改善</h3><p>待ち時間30%短縮、スタッフ残業時間50%削減を実現。</p></div>
      <div class="result-card"><div class="result-category">病児保育</div><h3>病児保育施設の新規立ち上げ</h3><p>行政申請から運営開始まで6ヶ月で実現。初年度稼働率80%達成。</p></div>
      <div class="result-card"><div class="result-category">採用</div><h3>看護師採用コスト40%削減</h3><p>採用チャネル最適化と定着支援により、採用単価と離職率を大幅改善。</p></div>
    </div>
  </div>
</section>

<!-- COLUMNS -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('COLUMN', '関連コラム')}
    <div class="column-list">
      <a href="/columns/jimucho-outsource" class="column-item"><span class="column-cat">経営</span><h4>クリニック事務長代行とは</h4></a>
      <a href="/columns/medical-recruitment-kpi" class="column-item"><span class="column-cat">採用</span><h4>医療機関の採用改善で見るべき指標</h4></a>
      <a href="/columns/sick-child-care-start" class="column-item"><span class="column-cat">病児保育</span><h4>病児保育事業を始める際のポイント</h4></a>
      <a href="/columns/medical-dx-caution" class="column-item"><span class="column-cat">DX</span><h4>医療DX導入時の注意点</h4></a>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section">
  <div class="container">
    ${sectionTitle('FAQ', 'よくある質問')}
    <div class="faq-list">
      <details class="faq-item"><summary>事務長代行はどの範囲まで対応しますか？</summary><p>経理・人事・総務・業者対応・行政手続きなど、医師が診療に集中するために必要な管理業務全般を代行します。</p></details>
      <details class="faq-item"><summary>小規模クリニックでも対応可能ですか？</summary><p>医師1名のクリニックから対応可能です。規模に応じた柔軟なプランをご用意しています。</p></details>
      <details class="faq-item"><summary>病児保育事業の立ち上げ支援とは？</summary><p>行政への申請手続き、施設設計、人員配置計画、運営マニュアル作成、開所後のフォローまで一貫して支援します。</p></details>
      <details class="faq-item"><summary>契約期間の縛りはありますか？</summary><p>最低3ヶ月からの契約となりますが、課題解決後はスポット対応に切り替えも可能です。</p></details>
    </div>
  </div>
</section>

<!-- CTA -->
${ctaSection({
  title: '医療機関の経営課題をご相談ください',
  buttons: [
    { label: '経営相談', href: '/contact', primary: true },
    { label: '事務長代行の相談', href: '/contact' },
    { label: '病児保育事業相談', href: '/contact' }
  ]
})}
`, { description: '医療機関の経営支援。事務長代行・採用支援・DX導入・収益改善・病児保育事業支援をワンストップで提供。' }))
}
