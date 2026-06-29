import type { Context } from 'hono'
import { layout, breadcrumb } from '../components/layout'

export const servicesPage = (c: Context) => {
  return c.html(layout('事業内容', `
${breadcrumb([{ label: '事業内容' }])}

<section class="page-hero page-hero--services" style="background:linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.8)),url('/static/images/city-connection.jpg') center/cover no-repeat;">
  <div class="container">
    <span class="page-hero__label">BUSINESS</span>
    <h1 class="page-hero__title-en">Regional Value Creation</h1>
    <p class="page-hero__title-ja">— 地域価値創造事業 —</p>
    <p class="page-hero__lead">
      ヘルスケアを起点に、<br class="u-pc-only">
      地域社会の価値を高める。
    </p>
  </div>
</section>

<!-- RVC概念説明 -->
<section class="section">
  <div class="container">
    <div class="services-philosophy">
      <div class="services-philosophy__visual">
        <div class="services-orbit">
          <div class="services-orbit__center">
            <span class="services-orbit__label">RVC</span>
            <span class="services-orbit__sub">地域価値創造</span>
          </div>
          <div class="services-orbit__ring">
            <span class="services-orbit__node services-orbit__node--1">M&A</span>
            <span class="services-orbit__node services-orbit__node--2">医療DX</span>
            <span class="services-orbit__node services-orbit__node--3">人材</span>
            <span class="services-orbit__node services-orbit__node--4">マーケ</span>
          </div>
        </div>
      </div>
      <div class="services-philosophy__text">
        <h2 class="services-philosophy__heading">一つの軸、多角的な展開</h2>
        <p>i2m2は「地域価値創造（Regional Value Creation）」という一つの共通理念のもと、<br>ヘルスケア・医療を起点にした多角的な事業を展開しています。</p>
        <p>M&Aによる事業承継から、医療DXによる業務革新、人材マッチング、マーケティング支援まで——<br>それぞれが独立した事業でありながら、地域の価値を高めるという同じゴールに向かっています。</p>
      </div>
    </div>
  </div>
</section>

<!-- 事業領域 -->
<section class="section section-alt">
  <div class="container">
    <div class="services-section-header">
      <span class="services-section-header__en">DOMAINS</span>
      <h2 class="services-section-header__ja">事業領域</h2>
    </div>
    <div class="services-domains">
      <!-- Domain 1 -->
      <div class="services-domain" data-reveal>
        <div class="services-domain__number">01</div>
        <div class="services-domain__content">
          <div class="services-domain__brand">IHG™ Healthcare Services</div>
          <h3 class="services-domain__title">医療機関プロデュース</h3>
          <p class="services-domain__desc">
            クリニックの広告運用（5,000万円+実績）、経営コンサルティング、カルテ電子化（医療DX）、<br class="u-pc-only">
            補助金・融資支援まで、医療機関の成長に必要な全てを一気通貫で提供。
          </p>
          <ul class="services-domain__tags">
            <li>リスティング広告</li><li>MEO対策</li><li>電子カルテ導入</li><li>経営コンサル</li><li>補助金申請</li>
          </ul>
        </div>
      </div>
      <!-- Domain 2 -->
      <div class="services-domain" data-reveal>
        <div class="services-domain__number">02</div>
        <div class="services-domain__content">
          <div class="services-domain__brand">DR-LINK™ Healthcare Talent</div>
          <h3 class="services-domain__title">医療系人材マッチング</h3>
          <p class="services-domain__desc">
            医師・看護師・薬剤師・介護職など医療系専門職の転職支援。<br class="u-pc-only">
            採用ニーズの発掘からキャリアカウンセリング、入職後の定着サポートまで。
          </p>
          <ul class="services-domain__tags">
            <li>医師紹介</li><li>看護師採用</li><li>介護人材</li><li>定着支援</li>
          </ul>
        </div>
      </div>
      <!-- Domain 3 -->
      <div class="services-domain" data-reveal>
        <div class="services-domain__number">03</div>
        <div class="services-domain__content">
          <div class="services-domain__brand">RVC Community Value</div>
          <h3 class="services-domain__title">M&A仲介・事業承継</h3>
          <p class="services-domain__desc">
            医療・介護・福祉はもちろん、IT・飲食・美容など全業種対応。<br class="u-pc-only">
            事業承継、事業再生、地域活性ファンドの運営を通じてコミュニティの価値を守り、高める。
          </p>
          <ul class="services-domain__tags">
            <li>M&A仲介</li><li>事業承継</li><li>事業再生</li><li>全業種対応</li>
          </ul>
        </div>
      </div>
      <!-- Domain 4 -->
      <div class="services-domain" data-reveal>
        <div class="services-domain__number">04</div>
        <div class="services-domain__content">
          <div class="services-domain__brand">4everclinic</div>
          <h3 class="services-domain__title">海外クリニック進出支援</h3>
          <p class="services-domain__desc">
            アジア圏の医療機関の日本進出を全面サポート。<br class="u-pc-only">
            法務・マーケティング・店舗開発・スタッフ採用までワンストップで対応。
          </p>
          <ul class="services-domain__tags">
            <li>日本進出</li><li>法務支援</li><li>マーケティング</li><li>運営支援</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 強み -->
<section class="section">
  <div class="container">
    <div class="services-section-header">
      <span class="services-section-header__en">STRENGTH</span>
      <h2 class="services-section-header__ja">i2m2の強み</h2>
    </div>
    <div class="services-strengths">
      <div class="services-strength" data-reveal>
        <div class="services-strength__icon"><i class="fas fa-chart-line"></i></div>
        <h3>総売上 20億円+</h3>
        <p>創業1年2ヶ月でグループ社員200名以上、総売上20億円を突破。急成長を続けています。</p>
      </div>
      <div class="services-strength" data-reveal>
        <div class="services-strength__icon"><i class="fas fa-map-marked-alt"></i></div>
        <h3>首都圏起点、全国へ。</h3>
        <p>六本木ヒルズを拠点に、全国の医療機関・事業者への支援を展開しています。</p>
      </div>
      <div class="services-strength" data-reveal>
        <div class="services-strength__icon"><i class="fas fa-shield-halved"></i></div>
        <h3>誠実・透明な事業運営</h3>
        <p>法令遵守と情報管理を徹底し、お取引先の皆様に安心いただける体制を構築しています。</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="section section-cta">
  <div class="container" style="text-align:center;">
    <p class="cta-lead">各サービスの詳細・料金は担当者より<br class="u-sp-only">丁寧にご案内いたします。</p>
    <h2 class="cta-title">まずはお気軽にご相談ください</h2>
    <div class="cta-buttons">
      <a href="/contact" class="btn btn-primary btn-lg">無料相談はこちら</a>
      <a href="/ir" class="btn btn-outline">IR情報を見る</a>
    </div>
  </div>
</section>
`, { description: '医療機関プロデュース（IHG™）・医療系人材マッチング（DR-LINK™）・M&A仲介（RVC）・医療DXをワンストップで提供。ヘルスケア特化の総合支援会社。' }))
}
