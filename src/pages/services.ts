import type { Context } from 'hono'
import { layout, breadcrumb, ctaSection } from '../components/layout'

export const servicesPage = (c: Context) => {
  return c.html(layout('事業内容', `
${breadcrumb([{ label: '事業内容' }])}

<section class="page-hero page-hero--services" style="background:linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.8)),url('/static/images/city-connection.jpg') center/cover no-repeat;">
  <div class="container">
    <span class="page-hero__label">BUSINESS</span>
    <h1 class="page-hero__title-en">Services</h1>
    <p class="page-hero__title-ja">— 事業内容 —</p>
    <p class="page-hero__lead">
      ヘルスケアを起点に、<br class="u-pc-only">
      医療機関の成長を多角的に支援します。
    </p>
  </div>
</section>

<!-- ブランド一覧 -->
<section class="section">
  <div class="container">
    <div class="services-section-header">
      <span class="services-section-header__en">BRANDS</span>
      <h2 class="services-section-header__ja">グループブランド</h2>
    </div>
    <div class="services-brands">

      <!-- Brand 01: MedReach -->
      <div class="services-brand-card" data-reveal>
        <div class="services-brand-card__number">01</div>
        <div class="services-brand-card__body">
          <div class="services-brand-card__logo">MedReach™ <span>by i2m2</span></div>
          <h3 class="services-brand-card__title">医療マーケティング・広告運用</h3>
          <p class="services-brand-card__desc">
            クリニック・病院の集患を最大化するデジタルマーケティング。リスティング広告、MEO対策、SNS運用、LP制作まで一気通貫で支援します。累計広告運用額5,000万円+の実績。
          </p>
          <ul class="services-brand-card__tags">
            <li>リスティング広告</li><li>MEO対策</li><li>SNS運用</li><li>LP制作</li><li>SEO</li>
          </ul>
          <a href="https://medreach.i2m2.com" target="_blank" rel="noopener" class="services-brand-card__link">
            <span>詳細を見る</span><i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>

      <!-- Brand 02: CliniCore -->
      <div class="services-brand-card" data-reveal>
        <div class="services-brand-card__number">02</div>
        <div class="services-brand-card__body">
          <div class="services-brand-card__logo">CliniCore™ <span>by i2m2</span></div>
          <h3 class="services-brand-card__title">紙カルテ・スキャン・OCR電子保存</h3>
          <p class="services-brand-card__desc">
            紙カルテのスキャン・OCR読み取り・電子保存をワンストップで提供。診療録の電子化により、検索性向上・スペース削減・BCP対策を実現します。
          </p>
          <ul class="services-brand-card__tags">
            <li>紙カルテ電子化</li><li>OCR</li><li>スキャン代行</li><li>電子保存</li><li>BCP対策</li>
          </ul>
          <a href="https://clinicore.i2m2.com" target="_blank" rel="noopener" class="services-brand-card__link">
            <span>詳細を見る</span><i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>

      <!-- Brand 03: GrowFund -->
      <div class="services-brand-card" data-reveal>
        <div class="services-brand-card__number">03</div>
        <div class="services-brand-card__body">
          <div class="services-brand-card__logo">GrowFund™ <span>by i2m2</span></div>
          <h3 class="services-brand-card__title">補助金・融資活用コンサルティング</h3>
          <p class="services-brand-card__desc">
            医療機関向けの補助金・融資申請を完全サポート。IT導入補助金、事業再構築補助金、ものづくり補助金など、選定から採択後の実績報告まで一気通貫で対応します。
          </p>
          <ul class="services-brand-card__tags">
            <li>IT導入補助金</li><li>事業再構築</li><li>ものづくり補助金</li><li>融資支援</li><li>実績報告</li>
          </ul>
          <a href="https://growfund.i2m2.com" target="_blank" rel="noopener" class="services-brand-card__link">
            <span>詳細を見る</span><i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>

      <!-- Brand 04: DR-LINK -->
      <div class="services-brand-card" data-reveal>
        <div class="services-brand-card__number">04</div>
        <div class="services-brand-card__body">
          <div class="services-brand-card__logo">DR-LINK™ <span>by i2m2</span></div>
          <h3 class="services-brand-card__title">医療系人材マッチング</h3>
          <p class="services-brand-card__desc">
            医師・看護師・薬剤師・介護職など医療系専門職の転職支援。採用ニーズの発掘からキャリアカウンセリング、入職後の定着サポートまで対応します。
          </p>
          <ul class="services-brand-card__tags">
            <li>医師紹介</li><li>看護師採用</li><li>薬剤師</li><li>介護人材</li><li>定着支援</li>
          </ul>
          <a href="https://drlink.i2m2.com" target="_blank" rel="noopener" class="services-brand-card__link">
            <span>詳細を見る</span><i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>

      <!-- Brand 05: つむぎパートナーズ -->
      <div class="services-brand-card" data-reveal>
        <div class="services-brand-card__number">05</div>
        <div class="services-brand-card__body">
          <div class="services-brand-card__logo">つむぎパートナーズ <span>by i2m2</span></div>
          <h3 class="services-brand-card__title">M&A・事業承継・事業再生</h3>
          <p class="services-brand-card__desc">
            医療・介護・福祉を中心に全業種対応のM&A仲介。後継者不在問題の解決から事業再生・PMIまで、完全成功報酬型・秘密厳守で対応します。
          </p>
          <ul class="services-brand-card__tags">
            <li>M&A仲介</li><li>事業承継</li><li>事業再生</li><li>PMI</li><li>全業種対応</li>
          </ul>
          <a href="https://tsumugi-partners.i2m2.com" target="_blank" rel="noopener" class="services-brand-card__link">
            <span>詳細を見る</span><i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- 強み -->
<section class="section section-alt">
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
        <div class="services-strength__icon"><i class="fas fa-layer-group"></i></div>
        <h3>ワンストップ支援</h3>
        <p>集患・人材・資金調達・M&A・DXまで、医療機関の課題をひとつの窓口で解決します。</p>
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
      <a href="/ir" class="btn btn-outline">企業情報を見る</a>
    </div>
  </div>
</section>
`, { description: '株式会社イズムズの事業内容。MedReach™（医療マーケティング）、CliniCore™（カルテ電子化）、GrowFund™（補助金）、DR-LINK™（人材）、つむぎパートナーズ（M&A）の5ブランドを展開。' }))
}
