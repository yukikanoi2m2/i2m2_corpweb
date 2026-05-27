import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Static files
app.use('/static/*', serveStatic({ root: './' }))

// Main Page
app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CREATIVE AGENCY | デジタル&デザインエージェンシー</title>
  <meta name="description" content="AI・SEO・Webサイト制作・アプリ開発・クリエイティブデザインまで。ワンストップで提供する総合デジタルエージェンシー。" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400&family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap" rel="stylesheet" />

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

  <!-- CSS -->
  <link rel="stylesheet" href="/static/style.css" />
</head>
<body>

  <!-- ========== LOADING SCREEN ========== -->
  <div id="loading-screen">
    <div class="loading-content">
      <div class="loading-logo">CREATIVE<span>.</span></div>
      <div class="loading-bar-wrap">
        <div class="loading-bar"></div>
      </div>
    </div>
  </div>

  <!-- ========== CUSTOM CURSOR ========== -->
  <div class="cursor-dot" id="cursorDot"></div>
  <div class="cursor-ring" id="cursorRing"></div>

  <!-- ========== NAVIGATION ========== -->
  <header class="site-header" id="siteHeader">
    <a href="/" class="header-logo">CREATIVE<span>.</span></a>

    <nav class="nav-menu">
      <a href="#services" class="nav-link">サービス</a>
      <a href="#portfolio" class="nav-link">実績</a>
      <a href="#process" class="nav-link">プロセス</a>
      <a href="#team" class="nav-link">チーム</a>
      <a href="#contact" class="nav-link">お問い合わせ</a>
      <a href="#contact" class="nav-cta">プロジェクト相談</a>
    </nav>

    <button class="hamburger" id="hamburger" aria-label="メニュー">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </header>

  <!-- Mobile Navigation -->
  <nav class="mobile-nav" id="mobileNav">
    <div class="mobile-nav-links">
      <a href="#services" class="mobile-nav-link" data-close-nav>サービス</a>
      <a href="#portfolio" class="mobile-nav-link" data-close-nav>実績</a>
      <a href="#process" class="mobile-nav-link" data-close-nav>プロセス</a>
      <a href="#team" class="mobile-nav-link" data-close-nav>チーム</a>
      <a href="#contact" class="mobile-nav-link" data-close-nav>お問い合わせ</a>
    </div>
  </nav>

  <!-- ========== HERO ========== -->
  <section class="hero-section">
    <div class="hero-bg"></div>
    <div class="hero-noise"></div>
    <div class="hero-grid"></div>

    <div class="hero-content">
      <div class="hero-tag">
        <span class="hero-tag-dot"></span>
        新規プロジェクト受付中
      </div>

      <h1 class="hero-title">
        DIGITAL<br />
        <span class="outline">CREATIVE</span><br />
        <span class="accent">AGENCY<span class="line-2">Your idea, Our craft.</span></span>
      </h1>

      <p class="hero-desc">
        AIからSEOまで、デジタルブランドを<br />
        次のステージへ引き上げる<br />
        総合クリエイティブエージェンシーです。
      </p>

      <div class="hero-actions">
        <a href="#contact" class="btn-primary">
          <i class="fas fa-rocket"></i>
          プロジェクト相談
        </a>
        <a href="#portfolio" class="btn-secondary">
          <span class="arrow-circle"><i class="fas fa-arrow-right"></i></span>
          実績を見る
        </a>
      </div>

      <div class="hero-stats">
        <div class="hero-stat">
          <span class="hero-stat-num">200<span>+</span></span>
          <span class="hero-stat-label">完成プロジェクト</span>
        </div>
        <div class="hero-stat">
          <span class="hero-stat-num">98<span>%</span></span>
          <span class="hero-stat-label">顧客満足度</span>
        </div>
        <div class="hero-stat">
          <span class="hero-stat-num">10<span>+</span></span>
          <span class="hero-stat-label">受賞歴</span>
        </div>
      </div>
    </div>

    <div class="hero-scroll-indicator">
      <span>SCROLL</span>
      <div class="scroll-line"></div>
    </div>
  </section>

  <!-- ========== MARQUEE ========== -->
  <section class="marquee-section">
    <div class="marquee-track" id="marqueeTrack">
      <!-- items duplicated by JS for infinite loop -->
      <div class="marquee-item"><span class="marquee-dot"></span> AI / SEO Growth</div>
      <div class="marquee-item"><span class="marquee-dot"></span> System Development</div>
      <div class="marquee-item"><span class="marquee-dot"></span> Creative Design</div>
      <div class="marquee-item"><span class="marquee-dot"></span> Brand Strategy</div>
      <div class="marquee-item"><span class="marquee-dot"></span> UX Consulting</div>
      <div class="marquee-item"><span class="marquee-dot"></span> Mobile App</div>
      <div class="marquee-item"><span class="marquee-dot"></span> 3D / WebGL</div>
      <div class="marquee-item"><span class="marquee-dot"></span> AI / SEO Growth</div>
      <div class="marquee-item"><span class="marquee-dot"></span> System Development</div>
      <div class="marquee-item"><span class="marquee-dot"></span> Creative Design</div>
      <div class="marquee-item"><span class="marquee-dot"></span> Brand Strategy</div>
      <div class="marquee-item"><span class="marquee-dot"></span> UX Consulting</div>
      <div class="marquee-item"><span class="marquee-dot"></span> Mobile App</div>
      <div class="marquee-item"><span class="marquee-dot"></span> 3D / WebGL</div>
    </div>
  </section>

  <!-- ========== CONCEPT SECTION ========== -->
  <section class="concept-section" id="about">
    <div class="container">
      <div class="section-eyebrow reveal">
        <span class="section-eyebrow-line"></span>
        About Us
      </div>
      <h2 class="section-title reveal">
        小さなことが<br />
        <span class="accent">大きな</span>違いを<br />
        <span class="outline">生み出す</span>
      </h2>
      <p class="section-desc reveal reveal-delay-1">
        想像は広く、実装は精巧に。<br />
        AIと最先端テクノロジーで新しいデジタル体験を完成させます。
      </p>

      <div class="concept-grid">
        <div class="concept-visual reveal">
          <div class="concept-card-big">
            <div class="concept-card-big-bg"></div>
            <div class="concept-card-big-num">01</div>
            <div class="concept-card-big-icon">🎯</div>
            <h3>戦略から実装まで<br />ワンチームで</h3>
            <p>
              ブランド戦略・UX設計からフロントエンド・バックエンド実装まで、
              少数精鋭の専門チームがワンストップで担当します。
            </p>
            <div class="concept-float-badge">✨ ワンストップ</div>
          </div>
        </div>

        <div class="concept-text-side">
          <div class="concept-feature-item reveal reveal-delay-1">
            <div class="concept-feature-icon">🤖</div>
            <div class="concept-feature-content">
              <h4>AI駆動の開発</h4>
              <p>RAG・チャットボット・業務自動化など、最新AI技術を活用してビジネスを加速させます。</p>
            </div>
          </div>

          <div class="concept-feature-item reveal reveal-delay-2">
            <div class="concept-feature-icon">📈</div>
            <div class="concept-feature-content">
              <h4>SEO / GEO 最適化</h4>
              <p>検索エンジン最適化からAI検索最適化(GEO/AEO)まで、オーガニック流入を最大化します。</p>
            </div>
          </div>

          <div class="concept-feature-item reveal reveal-delay-3">
            <div class="concept-feature-icon">🎨</div>
            <div class="concept-feature-content">
              <h4>クリエイティブデザイン</h4>
              <p>3Dモデリング・WebGL・モーショングラフィックスで唯一無二のブランド体験を構築します。</p>
            </div>
          </div>

          <div class="concept-feature-item reveal reveal-delay-4">
            <div class="concept-feature-icon">🔒</div>
            <div class="concept-feature-content">
              <h4>セキュリティ対応</h4>
              <p>SSL・認証・脆弱性対応から Core Web Vitals 最適化まで、堅牢なシステムを構築します。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== SERVICES SECTION ========== -->
  <section class="services-section" id="services">
    <div class="container">
      <div class="services-header">
        <div>
          <div class="section-eyebrow reveal">
            <span class="section-eyebrow-line"></span>
            Our Services
          </div>
          <h2 class="section-title reveal">
            ご注文の<br />メニューをどうぞ
          </h2>
        </div>
        <a href="#contact" class="btn-primary reveal" style="height:fit-content">
          <i class="fas fa-utensils"></i>
          メニューを全て見る
        </a>
      </div>

      <div class="services-grid">
        <div class="service-card reveal">
          <div class="service-card-num">01 / 04</div>
          <div class="service-card-icon">🤖</div>
          <h3>AI / SEO・GEO Growth</h3>
          <p>AI開発・検索最適化で集客を最大化。LLM活用から業務自動化まで幅広く対応します。</p>
          <div class="service-card-tags">
            <span class="service-tag">AI開発(RAG)</span>
            <span class="service-tag">チャットボット</span>
            <span class="service-tag">SEO設計</span>
            <span class="service-tag">GEO/AEO</span>
            <span class="service-tag">業務自動化</span>
            <span class="service-tag">CRO</span>
          </div>
          <div class="service-card-arrow"><i class="fas fa-arrow-right"></i></div>
        </div>

        <div class="service-card reveal reveal-delay-1">
          <div class="service-card-num">02 / 04</div>
          <div class="service-card-icon">💻</div>
          <h3>System Development</h3>
          <p>レスポンシブサイトからAPIインテグレーション・モバイルアプリまで、フルスタック開発。</p>
          <div class="service-card-tags">
            <span class="service-tag">Web制作</span>
            <span class="service-tag">フロント/バック</span>
            <span class="service-tag">API連携</span>
            <span class="service-tag">Core Web Vitals</span>
            <span class="service-tag">モバイルアプリ</span>
            <span class="service-tag">セキュリティ</span>
          </div>
          <div class="service-card-arrow"><i class="fas fa-arrow-right"></i></div>
        </div>

        <div class="service-card reveal reveal-delay-2">
          <div class="service-card-num">03 / 04</div>
          <div class="service-card-icon">🎨</div>
          <h3>Creative Design</h3>
          <p>3Dモデリング・WebGL・モーショングラフィックスで、他にはない唯一無二の体験を創ります。</p>
          <div class="service-card-tags">
            <span class="service-tag">3Dモデリング</span>
            <span class="service-tag">3Dショールーム</span>
            <span class="service-tag">UI/UXデザイン</span>
            <span class="service-tag">インタラクティブ</span>
            <span class="service-tag">モーション</span>
            <span class="service-tag">ブランドキャラ</span>
          </div>
          <div class="service-card-arrow"><i class="fas fa-arrow-right"></i></div>
        </div>

        <div class="service-card reveal reveal-delay-3">
          <div class="service-card-num">04 / 04</div>
          <div class="service-card-icon">📊</div>
          <h3>Strategy & Consulting</h3>
          <p>ブランド戦略・UXコンサルティング・コンテンツ戦略で、ビジネス全体の方向性を設計します。</p>
          <div class="service-card-tags">
            <span class="service-tag">ブランド戦略</span>
            <span class="service-tag">UXコンサル</span>
            <span class="service-tag">CMS設計</span>
            <span class="service-tag">コンテンツ戦略</span>
            <span class="service-tag">ダッシュボード</span>
            <span class="service-tag">自動レポート</span>
          </div>
          <div class="service-card-arrow"><i class="fas fa-arrow-right"></i></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== PORTFOLIO ========== -->
  <section class="portfolio-section" id="portfolio">
    <div class="container">
      <div class="section-eyebrow reveal">
        <span class="section-eyebrow-line"></span>
        Portfolio
      </div>
      <h2 class="section-title reveal">
        ご注文の<br />メニューが<span class="accent">届きました</span>
      </h2>

      <div class="portfolio-filter reveal">
        <button class="filter-btn active" data-filter="all">ALL</button>
        <button class="filter-btn" data-filter="web">WEB & UX</button>
        <button class="filter-btn" data-filter="app">Mobile</button>
        <button class="filter-btn" data-filter="design">Design</button>
        <button class="filter-btn" data-filter="brand">Branding</button>
      </div>

      <div class="portfolio-grid">
        <div class="portfolio-card large reveal" data-cat="web">
          <div class="portfolio-placeholder">🛍️</div>
          <div class="portfolio-card-overlay">
            <div class="portfolio-card-cat">WEB & UX / E-commerce</div>
            <div class="portfolio-card-title">大手飲料メーカー ECサイトリニューアル</div>
            <div class="portfolio-card-tags-list">EC構築 · UI/UXデザイン · 年間保守 · グラフィックデザイン</div>
          </div>
          <div class="portfolio-card-view"><i class="fas fa-arrow-up-right-from-square"></i></div>
        </div>

        <div class="portfolio-card reveal reveal-delay-1" data-cat="web">
          <div class="portfolio-placeholder" style="background:linear-gradient(135deg,#e8f4f0,#c5e0d8)">🏥</div>
          <div class="portfolio-card-overlay">
            <div class="portfolio-card-cat">WEB & UX / Medical</div>
            <div class="portfolio-card-title">医療法人 ホームページ制作</div>
            <div class="portfolio-card-tags-list">Web制作 · CMS開発 · UI/UXデザイン</div>
          </div>
          <div class="portfolio-card-view"><i class="fas fa-arrow-up-right-from-square"></i></div>
        </div>

        <div class="portfolio-card reveal reveal-delay-2" data-cat="brand">
          <div class="portfolio-placeholder" style="background:linear-gradient(135deg,#f5e8d0,#e8c890)">👗</div>
          <div class="portfolio-card-overlay">
            <div class="portfolio-card-cat">WEB & UX / Brand</div>
            <div class="portfolio-card-title">グローバルファッションブランド サイト制作</div>
            <div class="portfolio-card-tags-list">Web制作 · UI/UX · CMS · 3D</div>
          </div>
          <div class="portfolio-card-view"><i class="fas fa-arrow-up-right-from-square"></i></div>
        </div>

        <div class="portfolio-card reveal" data-cat="design">
          <div class="portfolio-placeholder" style="background:linear-gradient(135deg,#e8e0f0,#c8b8e8)">✂️</div>
          <div class="portfolio-card-overlay">
            <div class="portfolio-card-cat">WEB & UX / Customization</div>
            <div class="portfolio-card-title">カラーカスタマイズシステム制作</div>
            <div class="portfolio-card-tags-list">Web制作 · CMS · 3Dインタラクティブ</div>
          </div>
          <div class="portfolio-card-view"><i class="fas fa-arrow-up-right-from-square"></i></div>
        </div>

        <div class="portfolio-card large reveal reveal-delay-1" data-cat="app">
          <div class="portfolio-placeholder" style="background:linear-gradient(135deg,#d0e8f8,#a8cce8)">🎤</div>
          <div class="portfolio-card-overlay">
            <div class="portfolio-card-cat">WEB & UX / Mobile / Identity</div>
            <div class="portfolio-card-title">音声認識AIアプリ UI/UXデザイン</div>
            <div class="portfolio-card-tags-list">UI/UXデザイン · モバイル · ブランディング · 3D</div>
          </div>
          <div class="portfolio-card-view"><i class="fas fa-arrow-up-right-from-square"></i></div>
        </div>

        <div class="portfolio-card reveal reveal-delay-2" data-cat="web">
          <div class="portfolio-placeholder" style="background:linear-gradient(135deg,#e0f0e8,#b8d8c0)">🔊</div>
          <div class="portfolio-card-overlay">
            <div class="portfolio-card-cat">WEB & UX / E-commerce</div>
            <div class="portfolio-card-title">音響機器ECサイト制作</div>
            <div class="portfolio-card-tags-list">Web制作 · EC · UI/UX · CI/BI</div>
          </div>
          <div class="portfolio-card-view"><i class="fas fa-arrow-up-right-from-square"></i></div>
        </div>
      </div>

      <div style="text-align:center;margin-top:48px" class="reveal">
        <a href="#contact" class="btn-primary">
          <i class="fas fa-th-large"></i>
          すべての実績を見る
        </a>
      </div>
    </div>
  </section>

  <!-- ========== NUMBERS ========== -->
  <section class="numbers-section">
    <div class="container">
      <div class="numbers-grid">
        <div class="number-item reveal">
          <div class="number-value" data-count="200">0<span>+</span></div>
          <div class="number-label">完成プロジェクト</div>
        </div>
        <div class="number-item reveal reveal-delay-1">
          <div class="number-value" data-count="98">0<span>%</span></div>
          <div class="number-label">顧客継続率</div>
        </div>
        <div class="number-item reveal reveal-delay-2">
          <div class="number-value" data-count="12">0<span>+</span></div>
          <div class="number-label">受賞歴</div>
        </div>
        <div class="number-item reveal reveal-delay-3">
          <div class="number-value" data-count="8">0<span>+</span></div>
          <div class="number-label">設立年</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== PROCESS ========== -->
  <section class="process-section" id="process">
    <div class="container">
      <div class="section-eyebrow reveal">
        <span class="section-eyebrow-line"></span>
        Our Process
      </div>
      <h2 class="section-title reveal">
        こうして<br />
        プロジェクトを<span class="accent">進めます</span>
      </h2>

      <div class="process-steps">
        <div class="process-step active reveal">
          <div class="process-step-num">01</div>
          <h4>ヒアリング</h4>
          <p>ご要望・目標・現状を深く理解するためのヒアリングセッション</p>
        </div>
        <div class="process-step reveal reveal-delay-1">
          <div class="process-step-num">02</div>
          <h4>戦略立案</h4>
          <p>データに基づく戦略とロードマップを策定します</p>
        </div>
        <div class="process-step reveal reveal-delay-2">
          <div class="process-step-num">03</div>
          <h4>デザイン</h4>
          <p>UI/UXプロトタイプでビジュアルを具体化します</p>
        </div>
        <div class="process-step reveal reveal-delay-3">
          <div class="process-step-num">04</div>
          <h4>開発・実装</h4>
          <p>高品質なコードで機能を実装。テストを徹底します</p>
        </div>
        <div class="process-step reveal reveal-delay-4">
          <div class="process-step-num">05</div>
          <h4>納品・保守</h4>
          <p>スムーズなローンチと継続的なサポートをご提供</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== NEWSLETTER / INSIGHTS ========== -->
  <section class="newsletter-section" id="insights">
    <div class="container">
      <div class="section-eyebrow reveal">
        <span class="section-eyebrow-line"></span>
        Insights
      </div>
      <h2 class="section-title reveal">
        最新トレンドを<br />
        ニュースレターで<span class="accent">お届け</span>
      </h2>

      <div class="newsletter-grid">
        <div class="newsletter-subscribe reveal">
          <h3>Subscribe to<br />our newsletter</h3>
          <p>
            デジタルマーケティング・AI・デザイントレンドなど、
            役立つ情報を定期的にお届けします。
          </p>
          <form class="subscribe-form" onsubmit="handleSubscribe(event)">
            <input type="text" placeholder="お名前" required />
            <input type="email" placeholder="メールアドレス" required />
            <button type="submit">
              <i class="fas fa-paper-plane"></i> 購読する
            </button>
          </form>
        </div>

        <div class="blog-list">
          <div class="blog-card reveal">
            <div class="blog-card-img">
              <div class="placeholder">📱</div>
            </div>
            <div class="blog-card-body">
              <div class="blog-card-series">シリーズ: 最新トレンド</div>
              <div class="blog-card-title">AIがウェブデザインを変える！2025年注目の7つのトレンド</div>
              <div class="blog-card-excerpt">
                生成AIの台頭により、Webデザインの現場は劇的に変化しています。
                Figmaの自動化機能からAI駆動のUXパーソナライゼーションまで、
                今年押さえるべきトレンドを徹底解説します。
              </div>
              <div class="blog-card-tags">
                <span class="blog-tag">#トレンド</span>
                <span class="blog-tag">#AI</span>
                <span class="blog-tag">#デザイン</span>
              </div>
            </div>
          </div>

          <div class="blog-card reveal reveal-delay-1">
            <div class="blog-card-img">
              <div class="placeholder">🔍</div>
            </div>
            <div class="blog-card-body">
              <div class="blog-card-series">シリーズ: SEO知識</div>
              <div class="blog-card-title">GEO（Generative Engine Optimization）完全ガイド</div>
              <div class="blog-card-excerpt">
                ChatGPTやPerplexityなどのAI検索エンジンが普及する中、
                従来のSEOだけでは不十分です。GEOの基本概念から実践的な最適化手法まで、
                わかりやすく解説します。
              </div>
              <div class="blog-card-tags">
                <span class="blog-tag">#SEO</span>
                <span class="blog-tag">#GEO</span>
                <span class="blog-tag">#マーケティング</span>
              </div>
            </div>
          </div>

          <div class="blog-card reveal reveal-delay-2">
            <div class="blog-card-img">
              <div class="placeholder">🎯</div>
            </div>
            <div class="blog-card-body">
              <div class="blog-card-series">シリーズ: ブランディング</div>
              <div class="blog-card-title">小さなこだわりが大きな差を生む！ブランド体験設計の極意</div>
              <div class="blog-card-excerpt">
                マイクロインタラクション・ローディングアニメーション・コピーライティングなど、
                ユーザーが「また来たい」と思うブランド体験を設計するための具体的な手法を紹介します。
              </div>
              <div class="blog-card-tags">
                <span class="blog-tag">#ブランディング</span>
                <span class="blog-tag">#UX</span>
                <span class="blog-tag">#体験設計</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== AWARDS ========== -->
  <section class="awards-section">
    <div class="container">
      <div class="section-eyebrow reveal" style="color:rgba(255,92,0,1)">
        <span class="section-eyebrow-line"></span>
        Award Winner
      </div>
      <h2 class="section-title reveal" style="color:#fff">
        受賞した<br />
        <span class="accent">栄誉</span>の瞬間たち
      </h2>

      <div class="awards-list">
        <div class="award-item reveal">
          <div class="award-year">2024</div>
          <div class="award-name">Best Digital Agency of the Year</div>
          <div class="award-org">Japan Web Awards</div>
          <div class="award-badge">🏆 Gold</div>
        </div>
        <div class="award-item reveal reveal-delay-1">
          <div class="award-year">2024</div>
          <div class="award-name">Outstanding UX Design Excellence</div>
          <div class="award-org">Asia Design Awards</div>
          <div class="award-badge">🥈 Silver</div>
        </div>
        <div class="award-item reveal reveal-delay-2">
          <div class="award-year">2023</div>
          <div class="award-name">Most Innovative AI Integration</div>
          <div class="award-org">Digital Innovation Awards</div>
          <div class="award-badge">🏆 Gold</div>
        </div>
        <div class="award-item reveal reveal-delay-3">
          <div class="award-year">2023</div>
          <div class="award-name">Best E-Commerce Website Design</div>
          <div class="award-org">CSS Design Awards</div>
          <div class="award-badge">⭐ Special</div>
        </div>
        <div class="award-item reveal reveal-delay-4">
          <div class="award-year">2022</div>
          <div class="award-name">Creative Excellence in Web Development</div>
          <div class="award-org">Awwwards</div>
          <div class="award-badge">🏅 SOTD</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== TEAM ========== -->
  <section class="team-section" id="team">
    <div class="container">
      <div class="team-intro">
        <div class="section-eyebrow reveal">
          <span class="section-eyebrow-line"></span>
          Our Team
        </div>
        <h2 class="section-title reveal">
          少数精鋭の<br />
          <span class="accent">ワンチーム</span>
        </h2>
        <p class="team-desc reveal">
          "A creative agency that fosters close connections, shares meaningful moments,
          and delivers strategic vision with cultural insight and innovative solutions."
        </p>
      </div>

      <div class="team-grid">
        <div class="team-card reveal">
          <div class="team-card-img" style="font-size:80px;background:linear-gradient(135deg,#f5e8e0,#e8d0c0)">👩‍💼</div>
          <div class="team-card-info">
            <div class="team-card-role">CEO / Creative Director</div>
            <div class="team-card-name">田中 美咲</div>
            <div class="team-card-desc">ブランド戦略・UX設計のスペシャリスト。10年以上の実績。</div>
          </div>
        </div>

        <div class="team-card reveal reveal-delay-1">
          <div class="team-card-img" style="font-size:80px;background:linear-gradient(135deg,#e0e8f5,#c0d0e8)">👨‍💻</div>
          <div class="team-card-info">
            <div class="team-card-role">CTO / Lead Developer</div>
            <div class="team-card-name">鈴木 健太</div>
            <div class="team-card-desc">フルスタック開発・AI実装のエキスパート。</div>
          </div>
        </div>

        <div class="team-card reveal reveal-delay-2">
          <div class="team-card-img" style="font-size:80px;background:linear-gradient(135deg,#e8f5e0,#c8e0b8)">👩‍🎨</div>
          <div class="team-card-info">
            <div class="team-card-role">Art Director / 3D Designer</div>
            <div class="team-card-name">山田 さくら</div>
            <div class="team-card-desc">3D・モーション・インタラクティブデザインの専門家。</div>
          </div>
        </div>

        <div class="team-card reveal reveal-delay-3">
          <div class="team-card-img" style="font-size:80px;background:linear-gradient(135deg,#f5e8f5,#e0c8e0)">👨‍📊</div>
          <div class="team-card-info">
            <div class="team-card-role">Growth Hacker / SEO Strategist</div>
            <div class="team-card-name">伊藤 隼人</div>
            <div class="team-card-desc">SEO・GEO・データドリブンマーケティングの専門家。</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== CTA ========== -->
  <section class="cta-section" id="contact">
    <div class="cta-big-text">START</div>
    <div class="cta-content reveal">
      <div class="cta-label">Project Inquiry</div>
      <h2 class="cta-title">
        一緒に<br />
        始めましょう。
      </h2>
      <p class="cta-subtitle">
        アイデアをお持ちでしたら、<br />
        まずはお気軽にご相談ください。
      </p>
      <a href="mailto:hello@creative-agency.jp" class="cta-btn-white">
        <i class="fas fa-envelope"></i>
        プロジェクトを相談する
      </a>
    </div>
  </section>

  <!-- ========== FOOTER ========== -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="/" class="footer-logo">CREATIVE<span>.</span></a>
          <p>
            AIからSEO・Web開発・クリエイティブデザインまで。<br />
            デジタルブランドを次のステージへ引き上げる<br />
            総合クリエイティブエージェンシー。
          </p>
          <div class="footer-socials">
            <a href="#" class="social-icon" aria-label="Twitter/X"><i class="fab fa-x-twitter"></i></a>
            <a href="#" class="social-icon" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-icon" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" class="social-icon" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          </div>
        </div>

        <div class="footer-col">
          <h4>Services</h4>
          <div class="footer-links">
            <a href="#services" class="footer-link">AI / SEO Growth</a>
            <a href="#services" class="footer-link">System Development</a>
            <a href="#services" class="footer-link">Creative Design</a>
            <a href="#services" class="footer-link">Strategy & Consulting</a>
          </div>
        </div>

        <div class="footer-col">
          <h4>Company</h4>
          <div class="footer-links">
            <a href="#about" class="footer-link">About Us</a>
            <a href="#portfolio" class="footer-link">Portfolio</a>
            <a href="#team" class="footer-link">Team</a>
            <a href="#insights" class="footer-link">Insights</a>
          </div>
        </div>

        <div class="footer-col">
          <h4>Contact</h4>
          <div class="footer-links">
            <a href="mailto:hello@creative-agency.jp" class="footer-link">hello@creative-agency.jp</a>
            <a href="tel:0312345678" class="footer-link">03-1234-5678</a>
            <span class="footer-link">東京都渋谷区 〇〇町 1-2-3</span>
            <a href="#contact" class="footer-link">プロジェクト相談 →</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-copy">
          © 2025 Creative Agency. All rights reserved. 
          <a href="#">プライバシーポリシー</a>
        </div>
        <div class="footer-bottom-links">
          <a href="#" class="footer-bottom-link">利用規約</a>
          <a href="#" class="footer-bottom-link">サイトマップ</a>
          <a href="#" class="footer-bottom-link">特定商取引法</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- ========== JAVASCRIPT ========== -->
  <script>
    // ===== LOADING =====
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
      }, 2000);
    });

    // ===== CUSTOM CURSOR =====
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .service-card, .portfolio-card, .blog-card, .team-card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // ===== HEADER SCROLL =====
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    document.querySelectorAll('[data-close-nav]').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // ===== SCROLL REVEAL =====
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(el => observer.observe(el));

    // ===== COUNTER ANIMATION =====
    function animateCounter(el) {
      const target = parseInt(el.getAttribute('data-count'));
      const suffix = el.querySelector('span') ? el.querySelector('span').outerHTML : '';
      const duration = 1500;
      const start = performance.now();
      function update(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.innerHTML = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }

    const numberObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          numberObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => numberObserver.observe(el));

    // ===== PORTFOLIO FILTER =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        portfolioCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-cat') === filter) {
            card.style.opacity = '1';
            card.style.transform = '';
            card.style.display = '';
          } else {
            card.style.opacity = '0.3';
            card.style.transform = 'scale(0.95)';
          }
        });
      });
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offset = 72;
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - offset,
            behavior: 'smooth'
          });
        }
      });
    });

    // ===== SUBSCRIBE FORM =====
    function handleSubscribe(e) {
      e.preventDefault();
      const btn = e.target.querySelector('button');
      btn.innerHTML = '<i class="fas fa-check"></i> 登録完了！';
      btn.style.background = '#22c55e';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> 購読する';
        btn.style.background = '';
        e.target.reset();
      }, 3000);
    }

    // ===== PARALLAX HERO =====
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroContent = document.querySelector('.hero-content');
      if (heroContent && scrollY < window.innerHeight) {
        heroContent.style.transform = \`translateY(\${scrollY * 0.3}px)\`;
        heroContent.style.opacity = 1 - scrollY / (window.innerHeight * 0.7);
      }
    });

    // ===== PROCESS STEP HOVER =====
    document.querySelectorAll('.process-step').forEach(step => {
      step.addEventListener('mouseenter', () => {
        document.querySelectorAll('.process-step').forEach(s => s.classList.remove('active'));
        step.classList.add('active');
      });
    });
  </script>

</body>
</html>`)
})

export default app
