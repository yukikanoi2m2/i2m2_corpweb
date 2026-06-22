import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const casesPage = (c: Context) => {
  const category = c.req.param('category') || ''
  
  return c.html(layout('実績・事例', `
${breadcrumb([{ label: '実績・事例' }])}
<section class="page-hero"><div class="container"><h1 class="page-title">実績・事例</h1><p class="page-lead">各事業における支援実績・事例をご紹介します。</p></div></section>

<section class="section">
  <div class="container">
    <div class="case-filter">
      <a href="/cases" class="filter-btn ${!category ? 'active' : ''}">すべて</a>
      <a href="/cases/ma" class="filter-btn ${category === 'ma' ? 'active' : ''}">M&A支援</a>
      <a href="/cases/marketing" class="filter-btn ${category === 'marketing' ? 'active' : ''}">広告支援</a>
      <a href="/cases/equipment" class="filter-btn ${category === 'equipment' ? 'active' : ''}">医療機器</a>
      <a href="/cases/management" class="filter-btn ${category === 'management' ? 'active' : ''}">経営支援</a>
    </div>
    <div class="cases-grid">
      <div class="case-card">
        <div class="case-cat">M&A支援</div>
        <h3>医療法人の事業承継支援</h3>
        <p>後継者不在の医療法人（病床数120床）に対し、地域内の医師を承継候補として開拓。6ヶ月でクロージングを実現。</p>
        <div class="case-meta"><span>医療法人</span><span>事業承継</span></div>
      </div>
      <div class="case-card">
        <div class="case-cat">M&A支援</div>
        <h3>上場企業向け買収候補先開拓</h3>
        <p>ヘルスケア領域への参入を目指す上場企業に対し、買収候補先を5社ソーシング。うち2社でDD実施。</p>
        <div class="case-meta"><span>上場企業</span><span>買収戦略</span></div>
      </div>
      <div class="case-card">
        <div class="case-cat">広告支援</div>
        <h3>クリニック新規患者数180%改善</h3>
        <p>リスティング広告+MEO対策の組み合わせにより、半年で新規患者数を1.8倍に増加。</p>
        <div class="case-meta"><span>クリニック</span><span>集患</span></div>
      </div>
      <div class="case-card">
        <div class="case-cat">広告支援</div>
        <h3>看護師採用応募数3倍</h3>
        <p>採用広告のターゲティング・クリエイティブ改善により、看護師の応募数を3倍に拡大。</p>
        <div class="case-meta"><span>病院</span><span>採用</span></div>
      </div>
      <div class="case-card">
        <div class="case-cat">医療機器</div>
        <h3>新規開業クリニックの機器一括導入</h3>
        <p>内科クリニック開業時に必要な全機器を選定・導入。予算内で完了し、開業日に間に合わせました。</p>
        <div class="case-meta"><span>内科</span><span>開業</span></div>
      </div>
      <div class="case-card">
        <div class="case-cat">経営支援</div>
        <h3>クリニック業務フロー改善</h3>
        <p>事務長代行として入り、業務フローを再設計。待ち時間30%削減、スタッフ残業50%削減を実現。</p>
        <div class="case-meta"><span>クリニック</span><span>運営改善</span></div>
      </div>
    </div>
  </div>
</section>

${ctaSection()}
`))
}
