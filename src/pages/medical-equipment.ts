import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const medicalEquipmentPage = (c: Context) => {
  return c.html(layout('医療機器代理店', `
${breadcrumb([{ label: '事業内容', href: '/services' }, { label: '医療機器代理店' }])}

<!-- HERO -->
<section class="lp-hero lp-hero-equipment">
  <div class="container">
    <div class="lp-hero-content">
      <div class="lp-hero-tag">Medical Equipment</div>
      <h1 class="lp-hero-title">医療機器の導入・販売・調達を<br><span class="accent">実務面から支援</span></h1>
      <p class="lp-hero-desc">開業準備から既存院の機器入替、消耗品調達まで。メーカー横断の提案力とコスト最適化でサポートします。</p>
      <div class="lp-hero-actions">
        <a href="/contact/medical" class="btn btn-primary btn-lg">見積もり相談 <i class="fas fa-arrow-right"></i></a>
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
      <div class="pain-item"><i class="fas fa-box-open"></i><p>開業時に必要な機器を揃えたい</p></div>
      <div class="pain-item"><i class="fas fa-sync-alt"></i><p>既存機器の入れ替えを検討中</p></div>
      <div class="pain-item"><i class="fas fa-balance-scale"></i><p>メーカー比較が難しい</p></div>
      <div class="pain-item"><i class="fas fa-yen-sign"></i><p>導入コストを適正化したい</p></div>
      <div class="pain-item"><i class="fas fa-boxes"></i><p>消耗品調達を効率化したい</p></div>
      <div class="pain-item"><i class="fas fa-tools"></i><p>保守・サポート体制を見直したい</p></div>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('SERVICES', '提供サービス')}
    <div class="service-detail-grid">
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-microscope"></i></div><h3>医療機器販売</h3><p>複数メーカーの製品から最適な機器をご提案します。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-cogs"></i></div><h3>導入支援</h3><p>選定から設置・稼働確認までトータルで支援。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-store"></i></div><h3>クリニック開業支援</h3><p>開業時に必要な機器・備品を一括でコーディネート。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-truck"></i></div><h3>消耗品・備品調達</h3><p>定期的な消耗品調達を効率化し、コスト削減を実現。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-link"></i></div><h3>メーカー連携</h3><p>各メーカーとの強固な関係で、最新情報・特別価格を提供。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-headset"></i></div><h3>導入後サポート</h3><p>故障対応・定期メンテナンス・使い方サポートまで。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-calculator"></i></div><h3>コスト最適化提案</h3><p>既存の調達構造を見直し、年間コスト削減を提案。</p></div>
    </div>
  </div>
</section>

<!-- DOMAIN -->
<section class="section">
  <div class="container">
    ${sectionTitle('PRODUCTS', '取扱領域')}
    <div class="domain-chips">
      <span class="chip">診察関連機器</span>
      <span class="chip">検査機器</span>
      <span class="chip">処置関連機器</span>
      <span class="chip">院内備品</span>
      <span class="chip">消耗品</span>
      <span class="chip">IT・DX関連機器</span>
    </div>
  </div>
</section>

<!-- FLOW -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('FLOW', '導入の流れ')}
    <div class="flow-steps">
      <div class="flow-step"><div class="flow-num">01</div><h4>ヒアリング</h4><p>ご要望・予算・スケジュールを確認。</p></div>
      <div class="flow-step"><div class="flow-num">02</div><h4>必要機器の整理</h4><p>診療科・用途に応じた機器リストを作成。</p></div>
      <div class="flow-step"><div class="flow-num">03</div><h4>製品候補の提案</h4><p>複数メーカーから比較検討資料を提示。</p></div>
      <div class="flow-step"><div class="flow-num">04</div><h4>見積もり</h4><p>最適な価格・条件で見積もりを提出。</p></div>
      <div class="flow-step"><div class="flow-num">05</div><h4>発注</h4><p>確定後、メーカーへ発注手配。</p></div>
      <div class="flow-step"><div class="flow-num">06</div><h4>納品・設置</h4><p>搬入・設置・動作確認を実施。</p></div>
      <div class="flow-step"><div class="flow-num">07</div><h4>導入後フォロー</h4><p>使い方レクチャー・保守体制を構築。</p></div>
    </div>
  </div>
</section>

<!-- CASES -->
<section class="section">
  <div class="container">
    ${sectionTitle('CASES', '実績・事例')}
    <div class="results-grid">
      <div class="result-card"><div class="result-category">開業</div><h3>内科クリニック新規開業の機器一括導入</h3><p>開業1ヶ月前から準備を開始し、予算内で全機器の導入を完了。</p></div>
      <div class="result-card"><div class="result-category">入替</div><h3>既存院の検査機器リプレイス</h3><p>10年使用した検査機器を最新モデルに更新。業務効率20%向上。</p></div>
      <div class="result-card"><div class="result-category">コスト</div><h3>消耗品調達コスト年間15%削減</h3><p>調達先の見直しと一括発注により、年間コストを大幅削減。</p></div>
    </div>
  </div>
</section>

<!-- COLUMNS -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('COLUMN', '関連コラム')}
    <div class="column-list">
      <a href="/columns/clinic-opening-equipment" class="column-item"><span class="column-cat">開業</span><h4>クリニック開業時に必要な医療機器</h4></a>
      <a href="/columns/equipment-introduction-points" class="column-item"><span class="column-cat">導入</span><h4>医療機器導入時に確認すべきポイント</h4></a>
      <a href="/columns/manufacturer-comparison" class="column-item"><span class="column-cat">比較</span><h4>メーカー比較で見るべき項目</h4></a>
      <a href="/columns/maintenance-contract" class="column-item"><span class="column-cat">保守</span><h4>医療機器と保守契約の考え方</h4></a>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section">
  <div class="container">
    ${sectionTitle('FAQ', 'よくある質問')}
    <div class="faq-list">
      <details class="faq-item"><summary>取り扱いメーカーは限定されますか？</summary><p>特定メーカーに限定せず、複数メーカーの製品から最適なものをご提案します。</p></details>
      <details class="faq-item"><summary>対応エリアはどこですか？</summary><p>全国対応可能です。設置工事が必要な場合は、地域の協力業者と連携します。</p></details>
      <details class="faq-item"><summary>見積もりだけでも依頼できますか？</summary><p>もちろん可能です。お気軽にお問い合わせください。</p></details>
      <details class="faq-item"><summary>導入後の保守対応は？</summary><p>メーカー保証に加え、当社独自のサポート体制で迅速に対応します。</p></details>
    </div>
  </div>
</section>

<!-- CTA -->
${ctaSection({
  title: '医療機器の導入・調達をご検討中の方',
  buttons: [
    { label: '導入相談・見積もり', href: '/contact/medical', primary: true },
    { label: '開業準備相談', href: '/contact/medical' },
    { label: '資料ダウンロード', href: '/resources' }
  ]
})}
`, { description: '医療機器の販売・導入支援・クリニック開業支援・消耗品調達。メーカー横断の提案力でコスト最適化を実現。' }))
}
