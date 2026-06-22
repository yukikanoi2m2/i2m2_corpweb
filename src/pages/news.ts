import type { Context } from 'hono'
import { layout, breadcrumb } from '../components/layout'

export const newsPage = (c: Context) => {
  return c.html(layout('お知らせ', `
${breadcrumb([{ label: 'お知らせ' }])}
<section class="page-hero"><div class="container"><h1 class="page-title">お知らせ</h1></div></section>

<section class="section">
  <div class="container narrow">
    <ul class="news-page-list">
      <li class="news-page-item"><time>2024.12.01</time><span class="news-tag">お知らせ</span><a href="#">年末年始休業のお知らせ（12/28〜1/5）</a></li>
      <li class="news-page-item"><time>2024.11.15</time><span class="news-tag tag-seminar">セミナー</span><a href="#">【12/10開催】医療M&Aセミナー「後継者不在問題への対策」</a></li>
      <li class="news-page-item"><time>2024.11.01</time><span class="news-tag tag-media">メディア</span><a href="#">業界専門誌「Medical Business」に弊社代表インタビューが掲載</a></li>
      <li class="news-page-item"><time>2024.10.20</time><span class="news-tag tag-case">事例</span><a href="#">新規M&A成約事例を公開しました（医療法人の事業承継）</a></li>
      <li class="news-page-item"><time>2024.10.10</time><span class="news-tag">お知らせ</span><a href="#">ホームページをリニューアルしました</a></li>
      <li class="news-page-item"><time>2024.09.25</time><span class="news-tag tag-seminar">セミナー</span><a href="#">【10/15開催】クリニック経営改善セミナーのご案内</a></li>
      <li class="news-page-item"><time>2024.09.10</time><span class="news-tag tag-recruit">採用</span><a href="#">M&Aアドバイザー（経験者）を募集開始</a></li>
      <li class="news-page-item"><time>2024.08.30</time><span class="news-tag tag-case">事例</span><a href="#">広告支援事例を追加しました（クリニック集患改善）</a></li>
    </ul>
  </div>
</section>
`))
}
