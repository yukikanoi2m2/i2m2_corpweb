import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection } from '../components/layout'

export const topPage = (c: Context) => {
  return c.html(layout('地域価値創造事業', `
<!-- HERO -->
<section class="hero">
  <div class="hero-canvas"><canvas></canvas></div>
  <div class="hero-gradient"></div>
  <div class="container hero-content">
    <div class="hero-tag"><span class="hero-tag-dot"></span>Regional Value Creation</div>
    <h1 class="hero-title">
      <span class="hero-line"><span>ヘルスケアから、</span></span>
      <span class="hero-line"><span class="hero-accent">地域の未来を創る。</span></span>
    </h1>
    <p class="hero-desc">M&A・医療マーケティング・人材・DXを<br>ワンストップで支援します。</p>
    <div class="hero-actions">
      <a href="/contact" class="btn btn-primary btn-lg"><i class="fas fa-paper-plane"></i> 無料相談</a>
      <a href="/services" class="btn btn-outline btn-lg">事業内容 <i class="fas fa-arrow-right"></i></a>
    </div>
    <div class="hero-stats">
      <div class="hero-stat"><strong>20<span>億円+</span></strong><span>累計取扱高</span></div>
      <div class="hero-stat"><strong>1000<span>件+</span></strong><span>グループ総取引</span></div>
      <div class="hero-stat"><strong>100<span>社+</span></strong><span>取引先企業</span></div>
    </div>
  </div>
  <div class="hero-scroll"><span>Scroll</span><div class="hero-scroll-line"></div></div>
</section>

<!-- TICKER -->
<div class="ticker">
  <div class="ticker-track">
    <span class="ticker-item"><span class="ticker-dot"></span>Healthcare Marketing</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Medical Staffing</span>
    <span class="ticker-item"><span class="ticker-dot"></span>M&A Advisory</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Business Succession</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Medical DX</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Regional Value Creation</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Healthcare Marketing</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Medical Staffing</span>
    <span class="ticker-item"><span class="ticker-dot"></span>M&A Advisory</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Business Succession</span>
  </div>
</div>

<!-- STATEMENT -->
<section class="section section-statement">
  <div class="container">
    <p class="statement-copy">事業領域に制限はなく、<br>ヘルスケアを起点に<br class="sp-only">さまざまな可能性を追求する</p>
  </div>
</section>

<!-- SERVICES — donuts style full-width cards -->
<section class="section section-services-full" id="services">
  <div class="container">
    <div class="section-header-row">
      ${sectionTitle('SERVICES', '展開事業')}
    </div>
    <div class="services-card-grid">
      <a href="/healthcare" class="svc-card svc-card-large">
        <div class="svc-card-bg">
          <div class="svc-card-placeholder"><i class="fas fa-hospital-user"></i></div>
        </div>
        <div class="svc-card-overlay"></div>
        <div class="svc-card-content">
          <span class="svc-card-brand">IHG™</span>
          <h3>Healthcare Services</h3>
          <p>医療機関プロデュース — 広告運用・コンサル・カルテ電子化（医療DX）・補助金支援</p>
        </div>
      </a>
      <a href="/talent" class="svc-card">
        <div class="svc-card-bg">
          <div class="svc-card-placeholder"><i class="fas fa-user-nurse"></i></div>
        </div>
        <div class="svc-card-overlay"></div>
        <div class="svc-card-content">
          <span class="svc-card-brand">DR-LINK™</span>
          <h3>Healthcare Talent</h3>
          <p>医療系人材マッチング</p>
        </div>
      </a>
      <a href="/ma" class="svc-card">
        <div class="svc-card-bg">
          <div class="svc-card-placeholder"><i class="fas fa-building-columns"></i></div>
        </div>
        <div class="svc-card-overlay"></div>
        <div class="svc-card-content">
          <span class="svc-card-brand">RVC</span>
          <h3>Community Value</h3>
          <p>M&A仲介・事業承継・事業再生</p>
        </div>
      </a>
    </div>
  </div>
</section>

<!-- ADDITIONAL SERVICES — smaller tiles -->
<section class="section section-additional-full">
  <div class="container">
    <div class="additional-tile-grid">
      <div class="add-tile">
        <div class="add-tile-bg"><div class="svc-card-placeholder add-placeholder"><i class="fas fa-laptop-medical"></i></div></div>
        <div class="add-tile-content">
          <h4>カルテ電子化<br><small>医療DX</small></h4>
        </div>
      </div>
      <div class="add-tile">
        <div class="add-tile-bg"><div class="svc-card-placeholder add-placeholder"><i class="fas fa-ad"></i></div></div>
        <div class="add-tile-content">
          <h4>広告運用<br><small>5,000万円+実績</small></h4>
        </div>
      </div>
      <div class="add-tile">
        <div class="add-tile-bg"><div class="svc-card-placeholder add-placeholder"><i class="fas fa-file-invoice-dollar"></i></div></div>
        <div class="add-tile-content">
          <h4>補助金コンサル<br><small>融資・申請支援</small></h4>
        </div>
      </div>
      <div class="add-tile">
        <div class="add-tile-bg"><div class="svc-card-placeholder add-placeholder"><i class="fas fa-globe-asia"></i></div></div>
        <div class="add-tile-content">
          <h4>海外展開支援<br><small>4everclinic</small></h4>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- STATEMENT 2 -->
<section class="section section-statement section-statement-dark">
  <div class="container">
    <p class="statement-copy">全ての関わる人に幸運と繁栄を。<br>地域社会の価値を高めるインフラへ。</p>
    <span class="statement-sub">Bonanza: Fortune Smiles!</span>
  </div>
</section>

<!-- RESULTS -->
<section class="section section-results">
  <div class="container">
    ${sectionTitle('TRACK RECORD', '実績')}
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

<!-- ABOUT / WHY -->
<section class="section section-why" id="about">
  <div class="container">
    ${sectionTitle('WHY i2m2', '選ばれる理由')}
    <div class="why-grid">
      <div class="why-card">
        <div class="why-icon"><i class="fas fa-hospital"></i></div>
        <h3>ヘルスケア特化</h3>
        <p>医療・介護・福祉に精通した専門チーム</p>
      </div>
      <div class="why-card">
        <div class="why-icon"><i class="fas fa-layer-group"></i></div>
        <h3>ワンストップRVC</h3>
        <p>M&A・マーケ・人材・DXを一社完結</p>
      </div>
      <div class="why-card">
        <div class="why-icon"><i class="fas fa-chart-line"></i></div>
        <h3>取扱高20億円超</h3>
        <p>グループ1000件以上の取引実績</p>
      </div>
      <div class="why-card">
        <div class="why-icon"><i class="fas fa-shield-halved"></i></div>
        <h3>IPO準備体制</h3>
        <p>クリーン経営と高い透明性</p>
      </div>
    </div>
  </div>
</section>

<!-- IR -->
<section class="section section-news section-alt">
  <div class="container">
    ${sectionTitle('IR', 'IR情報')}
    <ul class="news-list">
      <li class="news-item">
        <time>2025.06.01</time>
        <span class="news-tag">IR</span>
        <a href="/ir">六本木ヒルズ森タワー37Fにオフィスを開設</a>
      </li>
      <li class="news-item">
        <time>2025.05.15</time>
        <span class="news-tag">事業報告</span>
        <a href="/ir">医療DX（カルテ電子化）サービス提供開始</a>
      </li>
      <li class="news-item">
        <time>2025.03.10</time>
        <span class="news-tag">事業報告</span>
        <a href="/ir">累計取扱高20億円を突破</a>
      </li>
    </ul>
    <div class="text-center mt-30">
      <a href="/ir" class="btn btn-outline btn-sm">IR情報一覧</a>
    </div>
  </div>
</section>

<!-- RECRUIT STATEMENT -->
<section class="section section-statement">
  <div class="container">
    <p class="statement-copy">価値が残り続けるものを創る、<br>世界を変える挑戦をしよう</p>
    <div class="statement-action">
      <a href="/recruit" class="btn btn-primary btn-lg">採用情報 <i class="fas fa-arrow-right"></i></a>
    </div>
  </div>
</section>

<!-- CTA -->
${ctaSection({
  title: 'まずはお気軽にご相談ください',
  buttons: [
    { label: '無料相談・お問い合わせ', href: '/contact', primary: true },
    { label: '会社概要を見る', href: '/company' }
  ]
})}
`))
}
