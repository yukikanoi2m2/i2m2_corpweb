import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection } from '../components/layout'

export const topPage = (c: Context) => {
  return c.html(layout('地域価値創造事業', `
<!-- HERO -->
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-overlay"></div>
  <div class="container hero-content">
    <div class="hero-tag"><span class="hero-tag-dot"></span>Regional Value Creation</div>
    <h1 class="hero-title">
      <span class="hero-line"><span>ヘルスケアから、</span></span>
      <span class="hero-line"><span class="hero-accent">地域の未来を創る。</span></span>
    </h1>
    <p class="hero-desc">医療機関プロデュース・人材マッチング・M&A/事業承継・美容サロン運営。<br>地域価値創造事業（RVC）として、多角的に企業と地域の成長を支援します。</p>
    <div class="hero-actions">
      <a href="/contact" class="btn btn-primary btn-lg"><i class="fas fa-paper-plane"></i> 無料相談</a>
      <a href="/services" class="btn btn-outline btn-lg">事業内容を見る <i class="fas fa-arrow-right"></i></a>
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
    <span class="ticker-item"><span class="ticker-dot"></span>Beauty Salon</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Subsidy Consulting</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Regional Value Creation</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Healthcare Marketing</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Medical Staffing</span>
    <span class="ticker-item"><span class="ticker-dot"></span>M&A Advisory</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Business Succession</span>
  </div>
</div>

<!-- ABOUT -->
<section class="section section-why" id="about">
  <div class="container">
    ${sectionTitle('ABOUT', '私たちについて')}
    <div class="about-lead">
      <p class="section-lead">i2m2は、ヘルスケア・医療領域を起点に<strong>地域価値創造事業（RVC＝Regional Value Creation）</strong>を展開する企業です。<br>医療、介護、福祉、美容、IT、飲食など幅広い業種に対し、M&A仲介から経営支援まで一気通貫のソリューションを提供します。</p>
    </div>
    <div class="why-grid">
      <div class="why-card">
        <div class="why-icon"><i class="fas fa-hospital"></i></div>
        <h3>ヘルスケア特化</h3>
        <p>医療・介護・福祉業界に精通した専門チームが、業界固有の課題を理解し最適な支援を提供します。</p>
      </div>
      <div class="why-card">
        <div class="why-icon"><i class="fas fa-layer-group"></i></div>
        <h3>ワンストップRVC</h3>
        <p>M&A・マーケティング・人材・DXを一社で完結。地域の事業を多角的に支え、価値を創造します。</p>
      </div>
      <div class="why-card">
        <div class="why-icon"><i class="fas fa-chart-line"></i></div>
        <h3>累計取扱高20億円超</h3>
        <p>グループ総取引1000件以上、取引先100社超の実績。確かな経験に基づく実践的な支援です。</p>
      </div>
      <div class="why-card">
        <div class="why-icon"><i class="fas fa-shield-halved"></i></div>
        <h3>上場準備のガバナンス</h3>
        <p>クリーンな経営体制と高い透明性。コンプライアンスを徹底し、信頼性の高いサービスを提供します。</p>
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
      <p class="mission-desc">全ての関わる人に幸運と繁栄を。医療・ヘルスケアを基点として地域社会の価値を高め、<br>人々の健康と豊かさを支えるインフラとなることを目指します。</p>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section class="section section-services" id="services">
  <div class="container">
    ${sectionTitle('SERVICES', '展開事業')}
    <p class="section-lead">ヘルスケア・医療領域を中心に、地域価値創造（RVC）の4つの事業を展開しています。</p>
    <div class="services-grid">
      <a href="/healthcare" class="service-card service-ma">
        <div class="service-card-num">01</div>
        <div class="service-card-icon"><i class="fas fa-hospital-user"></i></div>
        <div class="service-card-brand">IHG™</div>
        <h3>Healthcare Services<br><small>医療機関プロデュース</small></h3>
        <p>医療クリニックのマーケ支援（広告運用）、コンサルティング、財務管理、カルテ電子化（医療DX）。</p>
        <ul class="service-card-tags">
          <li>広告運用</li><li>コンサル</li><li>医療DX</li>
        </ul>
        <span class="service-card-link">詳しく見る <i class="fas fa-arrow-right"></i></span>
      </a>
      <a href="/talent" class="service-card service-marketing">
        <div class="service-card-num">02</div>
        <div class="service-card-icon"><i class="fas fa-user-nurse"></i></div>
        <div class="service-card-brand">DR-LINK™</div>
        <h3>Healthcare Talent<br><small>医療系人材マッチング</small></h3>
        <p>医療職の人材紹介・マッチング。医師、看護師、薬剤師、介護職など幅広い職種に対応。</p>
        <ul class="service-card-tags">
          <li>人材紹介</li><li>医療職</li><li>マッチング</li>
        </ul>
        <span class="service-card-link">詳しく見る <i class="fas fa-arrow-right"></i></span>
      </a>
      <a href="/ma" class="service-card service-equipment">
        <div class="service-card-num">03</div>
        <div class="service-card-icon"><i class="fas fa-building-columns"></i></div>
        <div class="service-card-brand">RVC</div>
        <h3>Community Value<br><small>地域価値創造事業</small></h3>
        <p>M&A仲介、事業承継、事業再生・再建。医療・介護・福祉のほか美容、IT、飲食など他業種にも対応。</p>
        <ul class="service-card-tags">
          <li>M&A</li><li>事業承継</li><li>事業再生</li>
        </ul>
        <span class="service-card-link">詳しく見る <i class="fas fa-arrow-right"></i></span>
      </a>
      <a href="/beauty" class="service-card service-management">
        <div class="service-card-num">04</div>
        <div class="service-card-icon"><i class="fas fa-spa"></i></div>
        <div class="service-card-brand">BEAUTY</div>
        <h3>Salon Operations<br><small>美容サロンプロデュース</small></h3>
        <p>メディカルサロンの企画・運営支援。韓国クリニック日本進出（4everclinic）のプロデュースも。</p>
        <ul class="service-card-tags">
          <li>サロン運営</li><li>メディカル美容</li><li>海外展開</li>
        </ul>
        <span class="service-card-link">詳しく見る <i class="fas fa-arrow-right"></i></span>
      </a>
    </div>
  </div>
</section>

<!-- ADDITIONAL SERVICES -->
<section class="section section-additional">
  <div class="container">
    ${sectionTitle('ADDITIONAL', 'その他の事業')}
    <div class="additional-grid">
      <div class="additional-item">
        <div class="additional-icon"><i class="fas fa-file-invoice-dollar"></i></div>
        <h4>融資・補助金コンサル</h4>
        <p>事業承継部門専門で融資相談や各種補助金の申請支援を行います。</p>
      </div>
      <div class="additional-item">
        <div class="additional-icon"><i class="fas fa-laptop-medical"></i></div>
        <h4>カルテ電子化（医療DX）</h4>
        <p>紙カルテからの移行支援、電子カルテシステム導入・運用をトータルサポート。</p>
      </div>
      <div class="additional-item">
        <div class="additional-icon"><i class="fas fa-ad"></i></div>
        <h4>広告運用</h4>
        <p>医療機関向けのWeb広告運用。累計運用額5,000万円以上の実績。</p>
      </div>
    </div>
  </div>
</section>

<!-- DOMAIN -->
<section class="section section-domain">
  <div class="container">
    ${sectionTitle('DOMAIN', '対応領域')}
    <div class="domain-grid">
      <div class="domain-item"><i class="fas fa-hospital"></i><span>医療法人</span></div>
      <div class="domain-item"><i class="fas fa-stethoscope"></i><span>クリニック</span></div>
      <div class="domain-item"><i class="fas fa-hand-holding-heart"></i><span>介護・福祉</span></div>
      <div class="domain-item"><i class="fas fa-spa"></i><span>美容サロン</span></div>
      <div class="domain-item"><i class="fas fa-laptop-code"></i><span>IT</span></div>
      <div class="domain-item"><i class="fas fa-utensils"></i><span>飲食</span></div>
      <div class="domain-item"><i class="fas fa-pills"></i><span>調剤薬局</span></div>
      <div class="domain-item"><i class="fas fa-building"></i><span>中小企業</span></div>
    </div>
    <p class="domain-note">※ M&A・事業承継に関しては業種を問わず対応可能です。</p>
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
        <div class="result-category">M&A / RVC</div>
        <h3>医療法人の事業承継支援</h3>
        <p>後継者不在の医療法人に対し最適な承継先を開拓。事業再生フェーズからの支援も含めクロージングを実現。</p>
      </div>
      <div class="result-card">
        <div class="result-category">Healthcare Marketing</div>
        <h3>クリニック集患数大幅改善</h3>
        <p>Web広告+MEO対策により、新規患者数を大幅に拡大。ROASの最適化も実現。</p>
      </div>
      <div class="result-card">
        <div class="result-category">Global Expansion</div>
        <h3>韓国クリニック日本進出支援</h3>
        <p>4everclinicの日本進出事業プロデュース・運営支援。マーケティングから法務まで一気通貫対応。</p>
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
        <p class="message-text">i2m2は「Bonanza: Fortune Smiles!」をミッションに掲げ、ヘルスケア・医療領域を起点とした地域価値創造事業（RVC）を展開しています。</p>
        <p class="message-text">M&A・事業承継から医療マーケティング、人材マッチング、医療DXまで——地域に根差した企業の成長を多角的に支援し、全てのステークホルダーに幸運と繁栄をもたらすことが私たちの使命です。</p>
        <p class="message-author">代表取締役</p>
        <a href="/company/message" class="btn btn-outline btn-sm">メッセージ全文を読む</a>
      </div>
      <div class="message-visual">
        <div class="message-photo-placeholder"><i class="fas fa-user-tie"></i></div>
      </div>
    </div>
  </div>
</section>

<!-- NEWS -->
<section class="section section-news">
  <div class="container">
    ${sectionTitle('NEWS', 'お知らせ')}
    <ul class="news-list">
      <li class="news-item">
        <time>2025.06.01</time>
        <span class="news-tag">お知らせ</span>
        <a href="/news">六本木ヒルズオフィス開設のお知らせ</a>
      </li>
      <li class="news-item">
        <time>2025.05.15</time>
        <span class="news-tag">事業</span>
        <a href="/news">医療DX（カルテ電子化）サービス開始のご案内</a>
      </li>
      <li class="news-item">
        <time>2025.04.20</time>
        <span class="news-tag">メディア</span>
        <a href="/news">業界専門誌に弊社記事が掲載されました</a>
      </li>
      <li class="news-item">
        <time>2025.03.10</time>
        <span class="news-tag">事例</span>
        <a href="/news">4everclinic日本進出プロジェクト始動</a>
      </li>
    </ul>
    <div class="text-center mt-30">
      <a href="/news" class="btn btn-outline btn-sm">お知らせ一覧</a>
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
        <p class="access-transport"><i class="fas fa-train"></i> 東京メトロ日比谷線「六本木駅」1C出口 徒歩3分<br><i class="fas fa-train"></i> 都営大江戸線「六本木駅」3番出口 徒歩6分</p>
      </div>
      <div class="access-card">
        <h3><i class="fas fa-home"></i> 本社</h3>
        <p class="access-address">〒270-2224<br>千葉県松戸市大橋149-1</p>
        <p class="access-transport"><i class="fas fa-train"></i> JR常磐線・新京成線「松戸駅」よりバス15分</p>
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
