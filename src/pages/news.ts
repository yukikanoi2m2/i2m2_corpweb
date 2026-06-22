import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const newsPage = (c: Context) => {
  return c.html(layout('お知らせ', `
${breadcrumb([{ label: 'お知らせ' }])}

<section class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">お知らせ</h1>
    <p class="page-hero-desc">News</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <ul class="news-list news-list-page">
      <li class="news-item">
        <time>2025.06.01</time>
        <span class="news-tag">お知らせ</span>
        <a href="#">六本木ヒルズ森タワー37Fにオフィスを開設いたしました</a>
      </li>
      <li class="news-item">
        <time>2025.05.15</time>
        <span class="news-tag">事業</span>
        <a href="#">医療DX（カルテ電子化）サービスを開始いたしました</a>
      </li>
      <li class="news-item">
        <time>2025.04.20</time>
        <span class="news-tag">メディア</span>
        <a href="#">業界専門誌に弊社取り組みが掲載されました</a>
      </li>
      <li class="news-item">
        <time>2025.03.10</time>
        <span class="news-tag">事業</span>
        <a href="#">4everclinic日本進出プロジェクトを始動いたしました</a>
      </li>
      <li class="news-item">
        <time>2025.02.01</time>
        <span class="news-tag">お知らせ</span>
        <a href="#">美容サロンプロデュース事業を本格始動いたしました</a>
      </li>
      <li class="news-item">
        <time>2025.01.15</time>
        <span class="news-tag">実績</span>
        <a href="#">グループ累計取扱高20億円を達成いたしました</a>
      </li>
      <li class="news-item">
        <time>2024.12.01</time>
        <span class="news-tag">お知らせ</span>
        <a href="#">年末年始休業のお知らせ</a>
      </li>
    </ul>
  </div>
</section>

${ctaSection()}
`))
}
