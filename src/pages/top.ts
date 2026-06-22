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

<!-- VISUAL SHOWCASE (Movie / Photo placeholder) -->
<section class="section section-showcase">
  <div class="container">
    <div class="showcase-video">
      <div class="video-placeholder">
        <div class="video-placeholder-inner">
          <i class="fas fa-play-circle"></i>
          <span>CORPORATE MOVIE</span>
          <small>coming soon</small>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ABOUT -->
<section class="section section-why" id="about">
  <div class="container">
    <div class="about-visual-layout">
      <div class="about-text-side">
        ${sectionTitle('ABOUT', '私たちについて')}
        <p class="section-lead">ヘルスケア×地域価値創造（RVC）。<br>M&Aから経営支援まで一気通貫。</p>
      </div>
      <div class="about-image-side">
        <div class="image-placeholder image-placeholder-lg">
          <i class="fas fa-city"></i>
          <span>Office Image</span>
        </div>
      </div>
    </div>
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

<!-- MISSION -->
<section class="section section-mission">
  <div class="container">
    <div class="mission-block">
      <span class="mission-label">OUR MISSION</span>
      <h2 class="mission-text">Bonanza: Fortune Smiles!</h2>
      <p class="mission-desc">全ての関わる人に幸運と繁栄を。</p>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section class="section section-services" id="services">
  <div class="container">
    ${sectionTitle('SERVICES', '展開事業')}
    <div class="services-grid">
      <a href="/healthcare" class="service-card service-ma">
        <div class="service-card-visual">
          <div class="image-placeholder image-placeholder-card">
            <i class="fas fa-hospital-user"></i>
          </div>
        </div>
        <div class="service-card-body">
          <div class="service-card-brand">IHG™</div>
          <h3>Healthcare Services</h3>
          <p>医療機関プロデュース</p>
          <ul class="service-card-tags">
            <li>広告運用</li><li>コンサル</li><li>医療DX</li>
          </ul>
        </div>
        <span class="service-card-link"><i class="fas fa-arrow-right"></i></span>
      </a>
      <a href="/talent" class="service-card service-marketing">
        <div class="service-card-visual">
          <div class="image-placeholder image-placeholder-card">
            <i class="fas fa-user-nurse"></i>
          </div>
        </div>
        <div class="service-card-body">
          <div class="service-card-brand">DR-LINK™</div>
          <h3>Healthcare Talent</h3>
          <p>医療系人材マッチング</p>
          <ul class="service-card-tags">
            <li>人材紹介</li><li>医療職</li><li>マッチング</li>
          </ul>
        </div>
        <span class="service-card-link"><i class="fas fa-arrow-right"></i></span>
      </a>
      <a href="/ma" class="service-card service-equipment">
        <div class="service-card-visual">
          <div class="image-placeholder image-placeholder-card">
            <i class="fas fa-building-columns"></i>
          </div>
        </div>
        <div class="service-card-body">
          <div class="service-card-brand">RVC</div>
          <h3>Community Value</h3>
          <p>M&A・事業承継・事業再生</p>
          <ul class="service-card-tags">
            <li>M&A</li><li>事業承継</li><li>事業再生</li>
          </ul>
        </div>
        <span class="service-card-link"><i class="fas fa-arrow-right"></i></span>
      </a>
    </div>
  </div>
</section>

<!-- GALLERY -->
<section class="section section-gallery">
  <div class="container">
    ${sectionTitle('GALLERY', 'フォトギャラリー')}
    <div class="gallery-grid">
      <div class="gallery-item gallery-item-wide">
        <div class="image-placeholder">
          <i class="fas fa-building"></i>
          <span>六本木ヒルズ森タワー</span>
        </div>
      </div>
      <div class="gallery-item">
        <div class="image-placeholder">
          <i class="fas fa-handshake"></i>
          <span>M&A成約</span>
        </div>
      </div>
      <div class="gallery-item">
        <div class="image-placeholder">
          <i class="fas fa-users"></i>
          <span>チームミーティング</span>
        </div>
      </div>
      <div class="gallery-item">
        <div class="image-placeholder">
          <i class="fas fa-hospital"></i>
          <span>医療機関支援</span>
        </div>
      </div>
      <div class="gallery-item gallery-item-wide">
        <div class="image-placeholder">
          <i class="fas fa-chart-line"></i>
          <span>事業成長イメージ</span>
        </div>
      </div>
    </div>
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
    <div class="results-grid">
      <div class="result-card">
        <div class="result-card-img">
          <div class="image-placeholder image-placeholder-sm"><i class="fas fa-hospital"></i></div>
        </div>
        <div class="result-card-body">
          <div class="result-category">M&A / RVC</div>
          <h3>医療法人の事業承継支援</h3>
          <p>後継者不在の医療法人に対し最適な承継先を開拓しクロージングを実現。</p>
        </div>
      </div>
      <div class="result-card">
        <div class="result-card-img">
          <div class="image-placeholder image-placeholder-sm"><i class="fas fa-ad"></i></div>
        </div>
        <div class="result-card-body">
          <div class="result-category">Healthcare Marketing</div>
          <h3>クリニック集患数大幅改善</h3>
          <p>Web広告+MEO対策により、新規患者数を大幅に拡大。</p>
        </div>
      </div>
      <div class="result-card">
        <div class="result-card-img">
          <div class="image-placeholder image-placeholder-sm"><i class="fas fa-globe-asia"></i></div>
        </div>
        <div class="result-card-body">
          <div class="result-category">Global</div>
          <h3>韓国クリニック日本進出</h3>
          <p>4everclinicの日本進出プロデュース・運営支援を一気通貫対応。</p>
        </div>
      </div>
    </div>
    <div class="text-center mt-40">
      <a href="/cases" class="btn btn-outline">実績一覧を見る</a>
    </div>
  </div>
</section>

<!-- MESSAGE -->
<section class="section section-message">
  <div class="container">
    <div class="message-wrap">
      <div class="message-content">
        ${sectionTitle('MESSAGE', '代表メッセージ')}
        <p class="message-text">「Bonanza: Fortune Smiles!」をミッションに掲げ、地域価値創造事業を展開しています。</p>
        <p class="message-author">代表取締役</p>
        <a href="/company/message" class="btn btn-outline btn-sm">全文を読む</a>
      </div>
      <div class="message-visual">
        <div class="image-placeholder image-placeholder-portrait">
          <i class="fas fa-user-tie"></i>
          <span>代表写真</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- IR -->
<section class="section section-news">
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

<!-- ACCESS -->
<section class="section section-access">
  <div class="container">
    ${sectionTitle('ACCESS', 'アクセス')}
    <div class="access-grid">
      <div class="access-card">
        <h3><i class="fas fa-building"></i> 東京オフィス</h3>
        <p class="access-address">〒106-6137<br>東京都港区六本木6丁目10-1<br>六本木ヒルズ森タワー37F</p>
        <p class="access-transport"><i class="fas fa-train"></i> 六本木駅 1C出口 徒歩3分</p>
      </div>
      <div class="access-card">
        <h3><i class="fas fa-home"></i> 本社</h3>
        <p class="access-address">〒270-2224<br>千葉県松戸市大橋149-1</p>
      </div>
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
