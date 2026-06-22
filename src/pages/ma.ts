import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const maPage = (c: Context) => {
  return c.html(layout('M&A支援', `
${breadcrumb([{ label: '事業内容', href: '/services' }, { label: 'M&A支援' }])}

<!-- HERO -->
<section class="lp-hero lp-hero-ma">
  <div class="container">
    <div class="lp-hero-content">
      <div class="lp-hero-tag">M&A Advisory</div>
      <h1 class="lp-hero-title">医療・ヘルスケア領域に強い<br><span class="accent">M&A支援</span></h1>
      <p class="lp-hero-desc">医療法人・クリニック・中小企業のM&A仲介、事業承継支援、上場企業向け買収候補先開拓まで。業界知見と実務力で最適なマッチングを実現します。</p>
      <div class="lp-hero-actions">
        <a href="/contact/ma" class="btn btn-primary btn-lg">M&A無料相談 <i class="fas fa-arrow-right"></i></a>
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
      <div class="pain-item"><i class="fas fa-user-slash"></i><p>後継者がいない</p></div>
      <div class="pain-item"><i class="fas fa-exchange-alt"></i><p>会社・クリニックを譲渡したい</p></div>
      <div class="pain-item"><i class="fas fa-search"></i><p>買収候補先を探している</p></div>
      <div class="pain-item"><i class="fas fa-hospital"></i><p>医療法人・クリニック承継を検討</p></div>
      <div class="pain-item"><i class="fas fa-building"></i><p>上場企業として買収戦略を推進したい</p></div>
      <div class="pain-item"><i class="fas fa-question-circle"></i><p>M&Aの進め方がわからない</p></div>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('SERVICES', '提供サービス')}
    <div class="service-detail-grid">
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-handshake"></i></div><h3>M&A仲介</h3><p>売り手・買い手双方の利益を考慮し、最適なマッチングを支援します。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-user-tie"></i></div><h3>FA支援</h3><p>お客様の立場に立ったファイナンシャルアドバイザリーを提供します。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-people-arrows"></i></div><h3>事業承継支援</h3><p>後継者不在問題に対し、第三者承継・親族内承継を包括的にサポート。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-bullseye"></i></div><h3>買収候補先開拓</h3><p>上場企業・事業会社向けに、戦略に合致した候補先をソーシングします。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-hospital-user"></i></div><h3>医療法人・クリニック承継</h3><p>医療法人特有の規制・手続きを理解した専門支援を行います。</p></div>
      <div class="sd-card"><div class="sd-icon"><i class="fas fa-clipboard-check"></i></div><h3>PMI支援</h3><p>M&A成立後の統合プロセスを支援し、シナジー最大化を図ります。</p></div>
    </div>
  </div>
</section>

<!-- DOMAIN -->
<section class="section">
  <div class="container">
    ${sectionTitle('DOMAIN', '対応領域')}
    <div class="domain-chips">
      <span class="chip">医療法人</span>
      <span class="chip">クリニック</span>
      <span class="chip">介護事業</span>
      <span class="chip">調剤薬局</span>
      <span class="chip">ヘルスケア企業</span>
      <span class="chip">中小企業</span>
    </div>
  </div>
</section>

<!-- FLOW -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('FLOW', 'M&Aの流れ')}
    <div class="flow-steps">
      <div class="flow-step"><div class="flow-num">01</div><h4>初回相談</h4><p>無料・秘密厳守でご相談をお伺いします。</p></div>
      <div class="flow-step"><div class="flow-num">02</div><h4>企業価値評価</h4><p>財務・事業内容を分析し適正価格を算出。</p></div>
      <div class="flow-step"><div class="flow-num">03</div><h4>候補先探索</h4><p>独自ネットワークから最適な相手を探索。</p></div>
      <div class="flow-step"><div class="flow-num">04</div><h4>トップ面談</h4><p>経営者同士の面談を設定・同席支援。</p></div>
      <div class="flow-step"><div class="flow-num">05</div><h4>基本合意</h4><p>条件交渉をサポートし基本合意を締結。</p></div>
      <div class="flow-step"><div class="flow-num">06</div><h4>デューデリジェンス</h4><p>外部専門家と連携しDD実施を支援。</p></div>
      <div class="flow-step"><div class="flow-num">07</div><h4>最終契約</h4><p>最終条件の調整・契約締結を支援。</p></div>
      <div class="flow-step"><div class="flow-num">08</div><h4>クロージング</h4><p>対価の受渡し、届出手続き等を完了。</p></div>
      <div class="flow-step"><div class="flow-num">09</div><h4>PMI支援</h4><p>統合後の運営安定化を継続的にサポート。</p></div>
    </div>
  </div>
</section>

<!-- WHY -->
<section class="section">
  <div class="container">
    ${sectionTitle('STRENGTHS', '選ばれる理由')}
    <div class="strengths-list">
      <div class="strength-item"><div class="strength-num">01</div><div><h4>医療業界への深い理解</h4><p>医療法人の特殊性・規制環境を熟知した専門チームが対応します。</p></div></div>
      <div class="strength-item"><div class="strength-num">02</div><div><h4>実務支援力</h4><p>アドバイスだけでなく、書類作成・交渉同席・行政手続きまで伴走します。</p></div></div>
      <div class="strength-item"><div class="strength-num">03</div><div><h4>守秘義務体制</h4><p>情報管理を徹底し、従業員・取引先への配慮を最優先に進めます。</p></div></div>
      <div class="strength-item"><div class="strength-num">04</div><div><h4>買い手・売り手双方への対応力</h4><p>両者の利害を調整し、Win-Winの成約を目指します。</p></div></div>
      <div class="strength-item"><div class="strength-num">05</div><div><h4>上場企業対応も可能な法人品質</h4><p>大手企業の要求水準にも対応できる体制・品質を備えています。</p></div></div>
    </div>
  </div>
</section>

<!-- CASES -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('CASES', '実績・事例')}
    <div class="results-grid">
      <div class="result-card"><div class="result-category">事業承継</div><h3>医療法人の第三者承継支援</h3><p>後継者不在の医療法人に対し、地域の医師を承継先として開拓。スムーズな引継ぎを実現。</p></div>
      <div class="result-card"><div class="result-category">クリニック承継</div><h3>クリニック承継による開業支援</h3><p>閉院予定のクリニックを承継希望の医師にマッチング。患者・スタッフの引継ぎも支援。</p></div>
      <div class="result-card"><div class="result-category">上場企業支援</div><h3>上場企業向け買収候補先開拓</h3><p>ヘルスケア領域の成長戦略に沿った候補先を複数ソーシングし、デューデリジェンスまで支援。</p></div>
    </div>
  </div>
</section>

<!-- COLUMNS -->
<section class="section">
  <div class="container">
    ${sectionTitle('COLUMN', '関連コラム')}
    <div class="column-list">
      <a href="/columns/medical-ma-points" class="column-item"><span class="column-cat">M&A</span><h4>医療法人M&Aで重視すべきポイント</h4></a>
      <a href="/columns/clinic-succession" class="column-item"><span class="column-cat">事業承継</span><h4>クリニック承継における注意点</h4></a>
      <a href="/columns/sale-preparation" class="column-item"><span class="column-cat">売却</span><h4>会社売却時に準備すべき資料</h4></a>
      <a href="/columns/acquisition-sourcing" class="column-item"><span class="column-cat">買収</span><h4>買収候補先探索の進め方</h4></a>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('FAQ', 'よくある質問')}
    <div class="faq-list">
      <details class="faq-item"><summary>相談費用はかかりますか？</summary><p>初回相談は無料です。着手金・中間金の有無は案件規模により異なりますので、まずはお気軽にご相談ください。</p></details>
      <details class="faq-item"><summary>情報は外部に漏れませんか？</summary><p>秘密保持契約（NDA）を締結の上で進行します。社内でも情報アクセスを厳格に制限しています。</p></details>
      <details class="faq-item"><summary>成約までどのくらいの期間がかかりますか？</summary><p>案件により異なりますが、6ヶ月〜1年が目安です。スケジュール感は初回相談時にお伝えします。</p></details>
      <details class="faq-item"><summary>医療法人特有の手続きにも対応できますか？</summary><p>はい。医療法人の認可手続き・届出・行政対応にも精通したチームが対応します。</p></details>
      <details class="faq-item"><summary>買収側としての相談もできますか？</summary><p>もちろん可能です。買収ニーズの登録、候補先のソーシング、DDサポートまで一貫して支援します。</p></details>
    </div>
  </div>
</section>

<!-- CTA -->
${ctaSection({
  title: 'M&Aに関する無料相談を受付中',
  buttons: [
    { label: 'M&A無料相談', href: '/contact/ma', primary: true },
    { label: '企業価値評価の相談', href: '/contact/ma' },
    { label: '買収ニーズ登録', href: '/contact/ma' }
  ]
})}
`, { description: '医療・ヘルスケア領域に強いM&A支援。M&A仲介、事業承継支援、買収候補先開拓、医療法人承継をワンストップで提供。' }))
}
