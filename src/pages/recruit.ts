import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const recruitPage = (c: Context) => {
  return c.html(layout('採用情報', `
${breadcrumb([{ label: '採用情報' }])}
<section class="page-hero"><div class="container"><h1 class="page-title">採用情報</h1><p class="page-lead">医療・ヘルスケア領域の発展に貢献する仲間を募集しています。</p></div></section>

<section class="section">
  <div class="container narrow">
    <div class="recruit-message">
      <h2>採用メッセージ</h2>
      <p>私たちは、医療・ヘルスケア領域における法人の課題解決に真摯に取り組む仲間を求めています。「提案だけで終わらせない」——実行にこだわる姿勢を持つ方のご応募をお待ちしています。</p>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionTitle('POSITIONS', '募集職種')}
    <div class="recruit-grid">
      <div class="recruit-card"><h3>M&Aアドバイザー</h3><p>医療・ヘルスケア領域のM&A案件を担当。ソーシングからクロージングまで一貫して対応。</p><span class="recruit-type">正社員</span></div>
      <div class="recruit-card"><h3>法人営業</h3><p>M&A・広告・医療機器等の法人向け営業全般。新規開拓・既存フォロー。</p><span class="recruit-type">正社員</span></div>
      <div class="recruit-card"><h3>広告運用担当</h3><p>医療機関向けWeb広告の運用・改善。Google/Yahoo!/SNS広告全般。</p><span class="recruit-type">正社員</span></div>
      <div class="recruit-card"><h3>医療機器営業</h3><p>医療機器の販売・導入提案。メーカーとの折衝・クリニックへの提案活動。</p><span class="recruit-type">正社員</span></div>
      <div class="recruit-card"><h3>経営支援コンサルタント</h3><p>医療機関の経営支援・事務長代行。現場に入り込んだ運営改善。</p><span class="recruit-type">正社員</span></div>
      <div class="recruit-card"><h3>バックオフィス</h3><p>経理・人事・総務等の管理部門業務。事業成長を内側から支える。</p><span class="recruit-type">正社員</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    ${sectionTitle('ENVIRONMENT', '働く環境')}
    <div class="env-list">
      <div class="env-item"><i class="fas fa-clock"></i><span>フレックスタイム制（コアタイム10:00-15:00）</span></div>
      <div class="env-item"><i class="fas fa-home"></i><span>リモートワーク可（週2日まで）</span></div>
      <div class="env-item"><i class="fas fa-graduation-cap"></i><span>資格取得支援制度</span></div>
      <div class="env-item"><i class="fas fa-book"></i><span>書籍購入補助</span></div>
      <div class="env-item"><i class="fas fa-baby"></i><span>産休・育休取得実績あり</span></div>
      <div class="env-item"><i class="fas fa-chart-line"></i><span>成果連動型インセンティブ</span></div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container narrow">
    ${sectionTitle('FLOW', '選考フロー')}
    <div class="flow-steps flow-horizontal">
      <div class="flow-step"><div class="flow-num">1</div><h4>エントリー</h4></div>
      <div class="flow-step"><div class="flow-num">2</div><h4>書類選考</h4></div>
      <div class="flow-step"><div class="flow-num">3</div><h4>面接（2回）</h4></div>
      <div class="flow-step"><div class="flow-num">4</div><h4>内定</h4></div>
    </div>
  </div>
</section>

${ctaSection({ title: 'エントリーはこちら', buttons: [{ label: 'エントリーフォーム', href: '/contact', primary: true }] })}
`))
}
