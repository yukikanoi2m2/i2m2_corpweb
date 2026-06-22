import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const irPage = (c: Context) => {
  return c.html(layout('IR情報', `
${breadcrumb([{ label: 'IR情報' }])}

<section class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">IR情報</h1>
    <p class="page-hero-desc">Investor Relations</p>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionTitle('HIGHLIGHTS', '業績ハイライト')}
    <div class="results-numbers">
      <div class="result-num-item">
        <strong>20<span>億円</span></strong>
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
    ${sectionTitle('CORPORATE', '企業情報')}
    <div class="ir-corporate-grid">
      <div class="ir-card">
        <div class="ir-card-icon"><i class="fas fa-building"></i></div>
        <h3>会社概要</h3>
        <table class="ir-table">
          <tr><th>商号</th><td>株式会社i2m2</td></tr>
          <tr><th>設立</th><td>2020年</td></tr>
          <tr><th>資本金</th><td>非公開</td></tr>
          <tr><th>代表者</th><td>代表取締役</td></tr>
          <tr><th>本社</th><td>千葉県松戸市大橋149-1</td></tr>
          <tr><th>東京オフィス</th><td>東京都港区六本木6-10-1<br>六本木ヒルズ森タワー37F</td></tr>
          <tr><th>事業内容</th><td>医療機関プロデュース、医療系人材マッチング、M&A/事業承継、医療DX</td></tr>
        </table>
      </div>
      <div class="ir-card">
        <div class="ir-card-icon"><i class="fas fa-chart-pie"></i></div>
        <h3>事業ポートフォリオ</h3>
        <ul class="ir-portfolio">
          <li>
            <span class="ir-portfolio-name">IHG™ Healthcare Services</span>
            <span class="ir-portfolio-desc">医療機関マーケティング・コンサル・DX</span>
          </li>
          <li>
            <span class="ir-portfolio-name">DR-LINK™ Healthcare Talent</span>
            <span class="ir-portfolio-desc">医療系人材紹介・マッチング</span>
          </li>
          <li>
            <span class="ir-portfolio-name">RVC Community Value</span>
            <span class="ir-portfolio-desc">M&A仲介・事業承継・事業再生</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionTitle('NEWS', 'IR・お知らせ')}
    <ul class="news-list news-list-page">
      <li class="news-item">
        <time>2025.06.01</time>
        <span class="news-tag">IR</span>
        <a href="#">六本木ヒルズ森タワー37Fにオフィスを開設いたしました</a>
      </li>
      <li class="news-item">
        <time>2025.05.15</time>
        <span class="news-tag">事業報告</span>
        <a href="#">医療DX（カルテ電子化）サービスを開始いたしました</a>
      </li>
      <li class="news-item">
        <time>2025.04.20</time>
        <span class="news-tag">メディア</span>
        <a href="#">業界専門誌に弊社取り組みが掲載されました</a>
      </li>
      <li class="news-item">
        <time>2025.03.10</time>
        <span class="news-tag">事業報告</span>
        <a href="#">累計取扱高20億円を突破いたしました</a>
      </li>
      <li class="news-item">
        <time>2025.01.15</time>
        <span class="news-tag">組織</span>
        <a href="#">グループ取引先100社達成に関するお知らせ</a>
      </li>
      <li class="news-item">
        <time>2024.12.01</time>
        <span class="news-tag">IR</span>
        <a href="#">IPO準備に向けた監査法人との契約締結のお知らせ</a>
      </li>
      <li class="news-item">
        <time>2024.10.01</time>
        <span class="news-tag">ガバナンス</span>
        <a href="#">コンプライアンス委員会の設置について</a>
      </li>
    </ul>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionTitle('GOVERNANCE', 'ガバナンス体制')}
    <div class="additional-grid">
      <div class="additional-item">
        <div class="additional-icon"><i class="fas fa-shield-halved"></i></div>
        <h4>コンプライアンス</h4>
        <p>コンプライアンス委員会を設置し、法令遵守と企業倫理の徹底を図っています。</p>
      </div>
      <div class="additional-item">
        <div class="additional-icon"><i class="fas fa-scale-balanced"></i></div>
        <h4>内部統制</h4>
        <p>IPO準備に向け、内部統制システムの整備を進め、透明性の高い経営を実現しています。</p>
      </div>
      <div class="additional-item">
        <div class="additional-icon"><i class="fas fa-file-contract"></i></div>
        <h4>監査体制</h4>
        <p>監査法人との連携のもと、財務報告の信頼性確保と適正な開示体制を構築しています。</p>
      </div>
    </div>
  </div>
</section>

${ctaSection({ title: 'IR・投資に関するお問い合わせ' })}
`))
}
