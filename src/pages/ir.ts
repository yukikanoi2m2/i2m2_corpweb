import type { Context } from 'hono'
import { layout, sectionTitle, breadcrumb } from '../components/layout'

export const irPage = (c: Context) => {
  return c.html(layout('企業情報', `
${breadcrumb([{ label: '企業情報' }])}

<section class="page-hero">
  <div class="container">
    <span class="page-hero__label">COMPANY INFORMATION</span>
    <h1 class="page-hero__title-en">企業情報</h1>
    <p class="page-hero__lead">
      株式会社イズムズは、ヘルスケア領域を中心に<br class="u-pc-only">
      医療機関・地域社会への貢献を目指す会社です。<br>
      お客様・金融機関・パートナー企業の皆様に<br class="u-pc-only">
      安心してお取引いただけるよう、<br class="u-pc-only">
      透明性ある事業運営と誠実なコミュニケーションを<br class="u-pc-only">
      大切にしています。
    </p>
  </div>
</section>

<!-- 会社概要 -->
<section class="section">
  <div class="container">
    ${sectionTitle('COMPANY PROFILE', '会社概要')}
    <div class="ir-card" style="max-width:800px; margin:0 auto;">
      <table class="ir-table">
        <tr><th>商号</th><td>株式会社イズムズ（i2m2 Co., Ltd.）</td></tr>
        <tr><th>設立</th><td>2023年</td></tr>
        <tr><th>資本金</th><td>非公開</td></tr>
        <tr><th>代表者</th><td>代表取締役（氏名は後日追記）</td></tr>
        <tr><th>本社所在地</th><td>〒106-6137 東京都港区六本木6丁目10-1<br>六本木ヒルズ森タワー37F</td></tr>
        <tr><th>事業内容</th><td>
          医療機関プロデュース（IHG™）<br>
          医療系人材マッチング（DR-LINK™）<br>
          M&amp;A仲介・事業承継・事業再生（RVC）<br>
          医療DX（カルテ電子化）
        </td></tr>
        <tr><th>主な取引実績</th><td>
          累計取扱高 20億円以上<br>
          グループ総取引 1,000件以上<br>
          取引先企業 100社以上<br>
          広告運用額 5,000万円以上
        </td></tr>
      </table>
    </div>
  </div>
</section>

<!-- 私たちの強み -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('OUR STRENGTHS', '私たちの強み')}
    <div class="additional-grid">
      <div class="additional-item">
        <div class="additional-icon"><i class="fas fa-heartbeat"></i></div>
        <h4>ヘルスケア領域への深い専門性</h4>
        <p>医療マーケティング・人材・M&A・DXを一気通貫で提供できるヘルスケア特化の総合支援会社です。クリニックの集患支援から医療法人の事業承継まで、幅広い経営課題に対応します。</p>
      </div>
      <div class="additional-item">
        <div class="additional-icon"><i class="fas fa-chart-bar"></i></div>
        <h4>豊富な実績と取引実績</h4>
        <p>グループ総取引1,000件以上・累計取扱高20億円以上の実績を持ちます。医療・介護・美容など幅広い業種のお客様とお取引しています。</p>
      </div>
      <div class="additional-item">
        <div class="additional-icon"><i class="fas fa-handshake"></i></div>
        <h4>誠実・透明な事業運営</h4>
        <p>医療情報・個人情報の適切な管理を徹底し、関連法令・各種ガイドラインを遵守した事業運営を行っています。お取引先の皆様との長期的な信頼関係を最優先に考えています。</p>
      </div>
    </div>
  </div>
</section>

<!-- コンプライアンス -->
<section class="section">
  <div class="container">
    ${sectionTitle('COMPLIANCE', 'コンプライアンス')}
    <div class="ir-card" style="max-width:800px; margin:0 auto;">
      <p style="font-size:14px; color:var(--color-text); line-height:2.2;">
        株式会社イズムズは、医療・個人情報等の機密情報を適切に管理し、医療広告ガイドライン・職業安定法・個人情報保護法をはじめとする関連法令および各種ガイドラインを遵守した事業運営を行っています。
      </p>
      <p style="font-size:14px; color:var(--color-text); line-height:2.2; margin-top:16px;">
        お客様・金融機関・取引先の皆様に安心してご利用・お取引いただけるよう、情報管理体制の継続的な改善に努めてまいります。
      </p>
      <p style="font-size:14px; color:var(--color-text); line-height:2.2; margin-top:16px;">
        個人情報の取り扱いについては、<a href="/legal" style="color:var(--accent-light); text-decoration:underline;">プライバシーポリシー</a>をご参照ください。
      </p>
    </div>
  </div>
</section>

<!-- お知らせ -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('NEWS', 'お知らせ')}
    <ul class="news-list">
      <li class="news-item">
        <time>2025.06.01</time>
        <span class="news-tag">お知らせ</span>
        <a href="#">六本木ヒルズ森タワー37Fにオフィスを開設いたしました</a>
      </li>
      <li class="news-item">
        <time>2025.05.15</time>
        <span class="news-tag">事業報告</span>
        <a href="#">医療DX（カルテ電子化）サービスを開始いたしました</a>
      </li>
      <li class="news-item">
        <time>2025.03.10</time>
        <span class="news-tag">事業報告</span>
        <a href="#">累計取扱高20億円を突破いたしました</a>
      </li>
    </ul>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <div class="container">
    <p class="cta-desc">事業内容・お取引に関するご相談はお気軽にどうぞ。</p>
    <div class="cta-buttons">
      <a href="/contact" class="btn btn-primary btn-lg">お問い合わせはこちら</a>
    </div>
  </div>
</section>
`))
}
