import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const casesPage = (c: Context) => {
  return c.html(layout('実績', `
${breadcrumb([{ label: '実績' }])}

<section class="page-hero" style="background:linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.85)),url('/static/images/business-negotiation.jpg') center/cover no-repeat;">
  <div class="container">
    <h1 class="page-hero-title">実績</h1>
    <p class="page-hero-desc">Track Record</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="results-numbers">
      <div class="result-num-item">
        <strong>20<span>億円+</span></strong>
        <span>累計取扱高</span>
      </div>
      <div class="result-num-item">
        <strong>1000<span>件+</span></strong>
        <span>グループ総取引</span>
      </div>
      <div class="result-num-item">
        <strong>100<span>社+</span></strong>
        <span>取引先企業</span>
      </div>
      <div class="result-num-item">
        <strong>5000<span>万円+</span></strong>
        <span>広告運用額</span>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionTitle('CASES', '事例紹介')}
    <div class="results-grid">
      <div class="result-card">
        <div class="result-category">RVC / M&A</div>
        <h3>医療法人の事業承継支援</h3>
        <p>後継者不在の医療法人に対し最適な承継先を開拓。財務改善の段階から伴走し、クロージングまで一気通貫で支援しました。</p>
      </div>
      <div class="result-card">
        <div class="result-category">IHG™ / マーケティング</div>
        <h3>クリニック集患数大幅改善</h3>
        <p>Google広告＋MEO対策により新規患者数を大幅に拡大。月次レポートとPDCA運用で持続的な成長を実現。</p>
      </div>
      <div class="result-card">
        <div class="result-category">海外展開 / 4everclinic</div>
        <h3>韓国クリニック日本進出支援</h3>
        <p>4everclinicの日本進出事業プロデュース。法務・マーケティング・店舗開発まで一気通貫で対応。</p>
      </div>
      <div class="result-card">
        <div class="result-category">DR-LINK™ / 人材</div>
        <h3>専門医の採用成功</h3>
        <p>慢性的な医師不足に悩むクリニックに対し、適切な専門医をマッチング。入職後の定着フォローも実施。</p>
      </div>
      <div class="result-card">
        <div class="result-category">RVC / 事業再生</div>
        <h3>介護施設の経営再建</h3>
        <p>経営難に陥った介護施設の財務改善・オペレーション改革を支援し、黒字転換を達成。</p>
      </div>
      <div class="result-card">
        <div class="result-category">IHG™ / 医療DX</div>
        <h3>カルテ電子化プロジェクト</h3>
        <p>紙カルテ運用からの完全移行を実現。スタッフ研修含め3ヶ月で本稼働開始、業務効率の大幅な改善を実現しました。</p>
      </div>
    </div>
  </div>
</section>

${ctaSection({ title: '地域医療の課題、まずご相談ください。' })}
`, { description: '累計取扱高20億円以上・グループ総取引1,000件以上。医療M&A・クリニックマーケ・人材マッチング・医療DXの支援実績。' }))
}
