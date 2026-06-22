import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection } from '../components/layout'

export const topPage = (c: Context) => {
  return c.html(layout('トップ', `
<!-- HERO -->
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-overlay"></div>
  <div class="container hero-content">
    <div class="hero-tag"><span class="hero-tag-dot"></span>Medical × Business Innovation</div>
    <h1 class="hero-title">
      <span class="hero-line">医療・ヘルスケア領域の</span>
      <span class="hero-line hero-accent">成長を、総合的に支援する。</span>
    </h1>
    <p class="hero-desc">M&A支援・広告マーケティング・医療機器代理店・医療経営支援。<br>法人の課題に合わせた最適なソリューションを提供します。</p>
    <div class="hero-actions">
      <a href="/contact" class="btn btn-primary btn-lg"><i class="fas fa-paper-plane"></i> 無料相談</a>
      <a href="/services" class="btn btn-outline btn-lg">事業内容を見る <i class="fas fa-arrow-right"></i></a>
    </div>
    <div class="hero-stats">
      <div class="hero-stat"><strong>500<span>+</span></strong><span>支援実績</span></div>
      <div class="hero-stat"><strong>15<span>年</span></strong><span>業界経験</span></div>
      <div class="hero-stat"><strong>98<span>%</span></strong><span>顧客満足度</span></div>
    </div>
  </div>
  <div class="hero-scroll"><span>Scroll</span><div class="hero-scroll-line"></div></div>
</section>

<!-- WHY US -->
<section class="section section-why" id="why">
  <div class="container">
    ${sectionTitle('WHY US', '選ばれる理由')}
    <div class="why-grid">
      <div class="why-card">
        <div class="why-icon"><i class="fas fa-hospital"></i></div>
        <h3>医療・ヘルスケア特化</h3>
        <p>医療業界に精通した専門チームが、業界特有の課題や規制を理解した上で最適な支援を提供します。</p>
      </div>
      <div class="why-card">
        <div class="why-icon"><i class="fas fa-layer-group"></i></div>
        <h3>ワンストップ対応</h3>
        <p>M&A・広告・機器調達・経営支援を一社で完結。複数の課題を横断的に解決します。</p>
      </div>
      <div class="why-card">
        <div class="why-icon"><i class="fas fa-handshake"></i></div>
        <h3>実務支援力</h3>
        <p>戦略提案だけでなく、実行フェーズまで伴走。現場に入り込んで成果を出します。</p>
      </div>
      <div class="why-card">
        <div class="why-icon"><i class="fas fa-shield-halved"></i></div>
        <h3>法人品質の信頼性</h3>
        <p>上場企業から中小企業まで対応可能な体制。秘密保持・コンプライアンスを徹底します。</p>
      </div>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section class="section section-services" id="services">
  <div class="container">
    ${sectionTitle('SERVICES', '主要サービス')}
    <p class="section-lead">医療・ヘルスケア領域を中心に、法人の多様な課題に対応する4つの事業を展開しています。</p>
    <div class="services-grid">
      <a href="/ma" class="service-card service-ma">
        <div class="service-card-num">01</div>
        <div class="service-card-icon"><i class="fas fa-building-columns"></i></div>
        <h3>M&A支援</h3>
        <p>医療法人・クリニック・中小企業のM&A仲介、事業承継支援、買収候補先開拓。</p>
        <ul class="service-card-tags">
          <li>M&A仲介</li><li>事業承継</li><li>医療M&A</li>
        </ul>
        <span class="service-card-link">詳しく見る <i class="fas fa-arrow-right"></i></span>
      </a>
      <a href="/marketing" class="service-card service-marketing">
        <div class="service-card-num">02</div>
        <div class="service-card-icon"><i class="fas fa-chart-line"></i></div>
        <h3>広告・マーケティング支援</h3>
        <p>医療機関・法人向けのWeb広告運用、集患支援、採用広告、LP制作。</p>
        <ul class="service-card-tags">
          <li>Web広告</li><li>集患</li><li>SEO/MEO</li>
        </ul>
        <span class="service-card-link">詳しく見る <i class="fas fa-arrow-right"></i></span>
      </a>
      <a href="/medical-equipment" class="service-card service-equipment">
        <div class="service-card-num">03</div>
        <div class="service-card-icon"><i class="fas fa-microscope"></i></div>
        <h3>医療機器代理店</h3>
        <p>医療機器の販売・導入支援、クリニック開業支援、消耗品調達、コスト最適化。</p>
        <ul class="service-card-tags">
          <li>機器販売</li><li>開業支援</li><li>調達</li>
        </ul>
        <span class="service-card-link">詳しく見る <i class="fas fa-arrow-right"></i></span>
      </a>
      <a href="/medical-management" class="service-card service-management">
        <div class="service-card-num">04</div>
        <div class="service-card-icon"><i class="fas fa-user-doctor"></i></div>
        <h3>医療機関経営支援</h3>
        <p>クリニック運営支援、事務長代行、採用・人事支援、DX導入、収益改善。</p>
        <ul class="service-card-tags">
          <li>運営支援</li><li>事務長代行</li><li>DX</li>
        </ul>
        <span class="service-card-link">詳しく見る <i class="fas fa-arrow-right"></i></span>
      </a>
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
      <div class="domain-item"><i class="fas fa-hand-holding-heart"></i><span>介護事業</span></div>
      <div class="domain-item"><i class="fas fa-pills"></i><span>調剤薬局</span></div>
      <div class="domain-item"><i class="fas fa-heartbeat"></i><span>ヘルスケア企業</span></div>
      <div class="domain-item"><i class="fas fa-building"></i><span>中小企業</span></div>
      <div class="domain-item"><i class="fas fa-chart-pie"></i><span>上場企業</span></div>
      <div class="domain-item"><i class="fas fa-baby"></i><span>病児保育</span></div>
    </div>
  </div>
</section>

<!-- RESULTS -->
<section class="section section-results">
  <div class="container">
    ${sectionTitle('RESULTS', '実績・事例')}
    <div class="results-grid">
      <div class="result-card">
        <div class="result-category">M&A支援</div>
        <h3>医療法人の事業承継支援</h3>
        <p>後継者不在の医療法人に対し、最適な承継先を開拓。6ヶ月でクロージングを実現。</p>
        <a href="/cases" class="result-link">詳細を見る →</a>
      </div>
      <div class="result-card">
        <div class="result-category">広告支援</div>
        <h3>クリニック集患数180%改善</h3>
        <p>Web広告+MEO対策の併用により、新規患者数を半年で1.8倍に拡大。</p>
        <a href="/cases" class="result-link">詳細を見る →</a>
      </div>
      <div class="result-card">
        <div class="result-category">医療機器</div>
        <h3>新規開業クリニックの機器一括導入</h3>
        <p>開業準備から機器選定・設置まで一貫支援。コスト15%削減を実現。</p>
        <a href="/cases" class="result-link">詳細を見る →</a>
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
        <p class="message-text">私たちは、医療・ヘルスケア領域における法人の成長を、M&A・広告・医療機器・経営支援の4つの事業を通じて総合的にサポートしています。</p>
        <p class="message-text">「必要なサービスを、必要なときに、必要な分だけ」。お客様の課題に真摯に向き合い、実務レベルで成果を出すことにこだわり続けます。</p>
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
        <time>2024.12.01</time>
        <span class="news-tag">お知らせ</span>
        <a href="/news">年末年始休業のお知らせ</a>
      </li>
      <li class="news-item">
        <time>2024.11.15</time>
        <span class="news-tag">セミナー</span>
        <a href="/news">医療M&Aセミナー開催のご案内</a>
      </li>
      <li class="news-item">
        <time>2024.11.01</time>
        <span class="news-tag">メディア</span>
        <a href="/news">業界専門誌に弊社記事が掲載されました</a>
      </li>
      <li class="news-item">
        <time>2024.10.20</time>
        <span class="news-tag">事例</span>
        <a href="/news">新規M&A成約事例を公開しました</a>
      </li>
    </ul>
    <div class="text-center mt-30">
      <a href="/news" class="btn btn-outline btn-sm">お知らせ一覧</a>
    </div>
  </div>
</section>

<!-- CTA -->
${ctaSection({
  title: 'まずはお気軽にご相談ください',
  buttons: [
    { label: '無料相談・お問い合わせ', href: '/contact', primary: true },
    { label: '資料ダウンロード', href: '/resources' }
  ]
})}
`))
}
