import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const healthcarePage = (c: Context) => {
  return c.html(layout('医療機関プロデュース | IHG™', `
${breadcrumb([{ label: '事業内容', href: '/services' }, { label: '医療機関プロデュース' }])}

<section class="lp-hero lp-hero-healthcare">
  <div class="container">
    <div class="lp-hero-content">
      <span class="lp-hero-brand">IHG™ — Healthcare Services</span>
      <h1 class="lp-hero-title">医療機関プロデュース</h1>
      <p class="lp-hero-desc">クリニック・医療機関の広告運用、経営コンサルティング、財務管理、<br>カルテ電子化（医療DX）まで一気通貫で支援します。</p>
      <a href="/contact" class="btn btn-primary btn-lg">無料相談はこちら</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionTitle('SERVICE', 'サービス内容')}
    <div class="lp-features">
      <div class="lp-feature">
        <div class="lp-feature-icon"><i class="fas fa-bullhorn"></i></div>
        <h3>広告運用・集患マーケティング</h3>
        <p>Google広告、SNS広告、MEO対策など医療機関に特化したデジタルマーケティング。累計広告運用額5,000万円以上の実績で、新規患者獲得を支援します。</p>
      </div>
      <div class="lp-feature">
        <div class="lp-feature-icon"><i class="fas fa-chart-pie"></i></div>
        <h3>経営コンサルティング</h3>
        <p>収益分析、コスト最適化、診療圏分析、開業支援。医療業界に精通したコンサルタントが経営課題を解決します。</p>
      </div>
      <div class="lp-feature">
        <div class="lp-feature-icon"><i class="fas fa-laptop-medical"></i></div>
        <h3>カルテ電子化（医療DX）</h3>
        <p>紙カルテから電子カルテへの移行支援。システム選定からデータ移行、スタッフ研修までトータルサポート。業務効率化と医療の質向上を実現します。</p>
      </div>
      <div class="lp-feature">
        <div class="lp-feature-icon"><i class="fas fa-calculator"></i></div>
        <h3>財務管理・資金調達支援</h3>
        <p>融資・補助金コンサルティング、事業計画策定、資金繰り改善。医療機関の財務基盤を強化します。</p>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionTitle('FLOW', 'ご支援の流れ')}
    <div class="lp-flow">
      <div class="lp-flow-step">
        <div class="lp-flow-num">01</div>
        <h4>ヒアリング</h4>
        <p>現状の課題と目標を詳細にヒアリング。経営状況・マーケティング状況を分析します。</p>
      </div>
      <div class="lp-flow-step">
        <div class="lp-flow-num">02</div>
        <h4>戦略策定</h4>
        <p>データに基づく施策提案。広告運用計画、DX導入計画、財務改善計画を策定します。</p>
      </div>
      <div class="lp-flow-step">
        <div class="lp-flow-num">03</div>
        <h4>実行・運用</h4>
        <p>広告運用開始、DXシステム導入、経営改善施策を実行。専任担当者が伴走支援します。</p>
      </div>
      <div class="lp-flow-step">
        <div class="lp-flow-num">04</div>
        <h4>効果測定・改善</h4>
        <p>月次レポートとKPI管理で効果を可視化。PDCAサイクルで継続的に改善します。</p>
      </div>
    </div>
  </div>
</section>

${ctaSection({ title: '医療機関の経営課題、まずはご相談ください', buttons: [{ label: '無料相談する', href: '/contact', primary: true }, { label: '事業一覧に戻る', href: '/services' }] })}
`))
}
