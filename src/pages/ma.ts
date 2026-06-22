import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const maPage = (c: Context) => {
  return c.html(layout('地域価値創造事業（RVC）| M&A・事業承継', `
${breadcrumb([{ label: '事業内容', href: '/services' }, { label: '地域価値創造事業（RVC）' }])}

<section class="lp-hero lp-hero-ma">
  <div class="container">
    <div class="lp-hero-content">
      <span class="lp-hero-brand">RVC — Community Value Creation</span>
      <h1 class="lp-hero-title">地域価値創造事業</h1>
      <p class="lp-hero-desc">M&A仲介・事業承継・事業再生/再建・事業ファンド。<br>医療・介護・福祉はもちろん、美容、IT、飲食など業種を問わず対応します。</p>
      <div class="lp-hero-stats">
        <div class="lp-stat"><strong>20億円+</strong><span>累計取扱高</span></div>
        <div class="lp-stat"><strong>1000件+</strong><span>グループ総取引</span></div>
        <div class="lp-stat"><strong>全業種</strong><span>対応範囲</span></div>
      </div>
      <a href="/contact" class="btn btn-primary btn-lg">M&A無料相談</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionTitle('SERVICE', 'サービス内容')}
    <div class="lp-features">
      <div class="lp-feature">
        <div class="lp-feature-icon"><i class="fas fa-handshake"></i></div>
        <h3>M&A仲介</h3>
        <p>売却・買収の両面アドバイザリー。医療法人・中小企業のM&Aに精通したコンサルタントが、ソーシング〜クロージングまで一気通貫で支援します。</p>
      </div>
      <div class="lp-feature">
        <div class="lp-feature-icon"><i class="fas fa-arrow-right-arrow-left"></i></div>
        <h3>事業承継支援</h3>
        <p>後継者不在問題の解決。親族承継・従業員承継・第三者承継（M&A）など最適な手法を提案。事業承継部門専門の融資・補助金コンサルも対応。</p>
      </div>
      <div class="lp-feature">
        <div class="lp-feature-icon"><i class="fas fa-rotate"></i></div>
        <h3>事業再生・再建</h3>
        <p>経営難に陥った事業の再生支援。財務改善、オペレーション改革、事業計画策定、金融機関交渉を一括対応。</p>
      </div>
      <div class="lp-feature">
        <div class="lp-feature-icon"><i class="fas fa-landmark"></i></div>
        <h3>事業ファンド（RVCファンド）</h3>
        <p>地域の有望事業に出資・育成するファンド運営。投資後のハンズオン支援で企業価値の向上を図ります。</p>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionTitle('INDUSTRIES', '対応業種')}
    <p class="section-lead">M&A・事業承継に限り、業種を問わず幅広く対応しております。</p>
    <div class="domain-grid">
      <div class="domain-item"><i class="fas fa-hospital"></i><span>医療</span></div>
      <div class="domain-item"><i class="fas fa-hand-holding-heart"></i><span>介護・福祉</span></div>
      <div class="domain-item"><i class="fas fa-spa"></i><span>美容</span></div>
      <div class="domain-item"><i class="fas fa-laptop-code"></i><span>IT</span></div>
      <div class="domain-item"><i class="fas fa-utensils"></i><span>飲食</span></div>
      <div class="domain-item"><i class="fas fa-pills"></i><span>調剤薬局</span></div>
      <div class="domain-item"><i class="fas fa-building"></i><span>一般企業</span></div>
      <div class="domain-item"><i class="fas fa-ellipsis"></i><span>その他全業種</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionTitle('FLOW', 'M&Aの流れ')}
    <div class="lp-flow">
      <div class="lp-flow-step">
        <div class="lp-flow-num">01</div>
        <h4>初回相談（無料）</h4>
        <p>現状ヒアリングと方向性の確認。秘密厳守で対応いたします。</p>
      </div>
      <div class="lp-flow-step">
        <div class="lp-flow-num">02</div>
        <h4>企業価値評価</h4>
        <p>財務分析・事業分析に基づく適正な企業価値算定。</p>
      </div>
      <div class="lp-flow-step">
        <div class="lp-flow-num">03</div>
        <h4>マッチング・交渉</h4>
        <p>最適な候補先の選定、条件交渉、基本合意までサポート。</p>
      </div>
      <div class="lp-flow-step">
        <div class="lp-flow-num">04</div>
        <h4>デューデリジェンス・クロージング</h4>
        <p>DD対応支援、最終契約書作成、対価の受渡しまで一気通貫。</p>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionTitle('SUBSIDY', '融資・補助金サポート')}
    <div class="concept-block">
      <p class="section-lead">事業承継に関連する融資相談、各種補助金（事業承継補助金、経営革新計画等）の申請支援も専門部門で対応しています。採択率を高める事業計画策定から申請書作成までトータルでサポートします。</p>
    </div>
  </div>
</section>

${ctaSection({ title: 'M&A・事業承継のご相談（秘密厳守）', buttons: [{ label: '無料相談はこちら', href: '/contact', primary: true }, { label: '事業一覧に戻る', href: '/services' }] })}
`))
}
