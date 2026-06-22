import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const resourcesPage = (c: Context) => {
  return c.html(layout('資料ダウンロード', `
${breadcrumb([{ label: '資料ダウンロード' }])}
<section class="page-hero"><div class="container"><h1 class="page-title">資料ダウンロード</h1><p class="page-lead">各サービスに関する資料を無料でダウンロードいただけます。</p></div></section>

<section class="section">
  <div class="container">
    ${sectionTitle('M&A', 'M&A支援関連資料')}
    <div class="resource-grid">
      <div class="resource-card"><div class="resource-icon"><i class="fas fa-file-pdf"></i></div><h3>医療法人M&Aガイド</h3><p>医療法人のM&Aに関する基礎知識と進め方をまとめた資料です。</p><a href="/contact" class="btn btn-sm btn-primary">ダウンロード</a></div>
      <div class="resource-card"><div class="resource-icon"><i class="fas fa-file-pdf"></i></div><h3>事業承継チェックリスト</h3><p>事業承継を検討する際に確認すべき項目を網羅したチェックリスト。</p><a href="/contact" class="btn btn-sm btn-primary">ダウンロード</a></div>
      <div class="resource-card"><div class="resource-icon"><i class="fas fa-file-pdf"></i></div><h3>買収ニーズ登録資料</h3><p>買収ニーズをご登録いただくための資料です。</p><a href="/contact" class="btn btn-sm btn-primary">ダウンロード</a></div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionTitle('MARKETING', '広告支援関連資料')}
    <div class="resource-grid">
      <div class="resource-card"><div class="resource-icon"><i class="fas fa-file-pdf"></i></div><h3>医療広告運用ガイド</h3><p>医療広告ガイドラインを踏まえた広告運用の基本をまとめた資料。</p><a href="/contact" class="btn btn-sm btn-primary">ダウンロード</a></div>
      <div class="resource-card"><div class="resource-icon"><i class="fas fa-file-pdf"></i></div><h3>集患改善チェックリスト</h3><p>クリニックの集患を改善するためのチェック項目一覧。</p><a href="/contact" class="btn btn-sm btn-primary">ダウンロード</a></div>
      <div class="resource-card"><div class="resource-icon"><i class="fas fa-file-pdf"></i></div><h3>採用広告改善資料</h3><p>医療機関の採用広告を改善するためのポイント資料。</p><a href="/contact" class="btn btn-sm btn-primary">ダウンロード</a></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionTitle('EQUIPMENT', '医療機器関連資料')}
    <div class="resource-grid">
      <div class="resource-card"><div class="resource-icon"><i class="fas fa-file-pdf"></i></div><h3>開業時医療機器リスト</h3><p>クリニック開業時に必要な医療機器の一覧と選定ポイント。</p><a href="/contact" class="btn btn-sm btn-primary">ダウンロード</a></div>
      <div class="resource-card"><div class="resource-icon"><i class="fas fa-file-pdf"></i></div><h3>医療機器導入チェックリスト</h3><p>機器導入時に確認すべき項目をまとめたチェックリスト。</p><a href="/contact" class="btn btn-sm btn-primary">ダウンロード</a></div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionTitle('MANAGEMENT', '経営支援関連資料')}
    <div class="resource-grid">
      <div class="resource-card"><div class="resource-icon"><i class="fas fa-file-pdf"></i></div><h3>クリニック経営改善チェックリスト</h3><p>経営改善のために確認すべきポイントを網羅した資料。</p><a href="/contact" class="btn btn-sm btn-primary">ダウンロード</a></div>
      <div class="resource-card"><div class="resource-icon"><i class="fas fa-file-pdf"></i></div><h3>事務長代行サービス資料</h3><p>事務長代行サービスの内容・対応範囲をまとめた資料。</p><a href="/contact" class="btn btn-sm btn-primary">ダウンロード</a></div>
    </div>
  </div>
</section>

${ctaSection()}
`))
}
