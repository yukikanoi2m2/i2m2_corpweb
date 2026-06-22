import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const servicesPage = (c: Context) => {
  return c.html(layout('事業内容', `
${breadcrumb([{ label: '事業内容' }])}
<section class="page-hero"><div class="container"><h1 class="page-title">事業内容</h1><p class="page-lead">医療・ヘルスケア領域を中心に、法人の多様な課題に応える4つの事業を展開しています。</p></div></section>

<section class="section">
  <div class="container">
    <div class="services-overview">
      <a href="/ma" class="so-card">
        <div class="so-num">01</div>
        <div class="so-icon"><i class="fas fa-building-columns"></i></div>
        <h2>M&A支援事業</h2>
        <p>医療法人・クリニック・中小企業のM&A仲介、事業承継支援、上場企業向け買収候補先開拓。</p>
        <ul>
          <li>M&A仲介・FA支援</li>
          <li>事業承継支援</li>
          <li>医療・ヘルスケア領域M&A</li>
          <li>買収候補先開拓</li>
          <li>PMI支援</li>
        </ul>
        <span class="so-link">詳細を見る <i class="fas fa-arrow-right"></i></span>
      </a>
      <a href="/marketing" class="so-card">
        <div class="so-num">02</div>
        <div class="so-icon"><i class="fas fa-chart-line"></i></div>
        <h2>広告・マーケティング支援事業</h2>
        <p>医療機関・法人向けのWeb広告運用、集患・採用支援、LP制作、SEO/MEO対策。</p>
        <ul>
          <li>Web広告運用</li>
          <li>集患支援</li>
          <li>採用広告支援</li>
          <li>LP・ホームページ制作</li>
          <li>SEO・MEO対策</li>
        </ul>
        <span class="so-link">詳細を見る <i class="fas fa-arrow-right"></i></span>
      </a>
      <a href="/medical-equipment" class="so-card">
        <div class="so-num">03</div>
        <div class="so-icon"><i class="fas fa-microscope"></i></div>
        <h2>医療機器代理店事業</h2>
        <p>医療機器の販売・導入支援、クリニック開業支援、消耗品調達、コスト最適化提案。</p>
        <ul>
          <li>医療機器販売・導入支援</li>
          <li>クリニック開業支援</li>
          <li>消耗品・備品調達</li>
          <li>メーカー連携</li>
          <li>コスト最適化</li>
        </ul>
        <span class="so-link">詳細を見る <i class="fas fa-arrow-right"></i></span>
      </a>
      <a href="/medical-management" class="so-card">
        <div class="so-num">04</div>
        <div class="so-icon"><i class="fas fa-user-doctor"></i></div>
        <h2>医療機関経営支援事業</h2>
        <p>クリニック運営支援、事務長代行、採用・人事支援、DX導入、収益改善。</p>
        <ul>
          <li>クリニック運営支援</li>
          <li>事務長代行</li>
          <li>採用・人事支援</li>
          <li>DX・システム導入</li>
          <li>病児保育事業支援</li>
        </ul>
        <span class="so-link">詳細を見る <i class="fas fa-arrow-right"></i></span>
      </a>
    </div>
  </div>
</section>

${ctaSection()}
`))
}
