import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>株式会社イズムズ｜i2m2 Co., Ltd. — Bonanza: Fortune Smiles!</title>
  <meta name="description" content="医療を中心に多角的な分野で包括的なビジネスを展開する事業会社。「革新的な選択肢を、あなたと社会に」のコンセプトのもと社会インフラのスマート化に向けた様々な取り組みをおこなっております。" />
  <meta property="og:title" content="株式会社イズムズ｜i2m2 Co., Ltd." />
  <meta property="og:description" content="革新的な選択肢を、あなたと社会に。ヘルスケアの現場を支え、成長と安心をともに創るサポートカンパニー。" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://i2m2.com/" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Figtree:wght@300;400;500;600;700;800;900&family=Noto+Serif+JP:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;700&display=swap" rel="stylesheet" />

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

  <!-- Styles -->
  <link rel="stylesheet" href="/static/style.css" />
</head>
<body>

<!-- ===== LOADING ===== -->
<div id="loading-screen">
  <div class="loading-logo-wrap">
    <div class="loading-logo-mark">i2m2</div>
    <div class="loading-tagline">Bonanza: Fortune Smiles!</div>
  </div>
  <div class="loading-bar-wrap">
    <div class="loading-bar"></div>
  </div>
</div>

<!-- ===== CURSOR ===== -->
<div class="cursor-dot" id="cursorDot"></div>
<div class="cursor-ring" id="cursorRing"></div>

<!-- ===== HEADER ===== -->
<header class="site-header" id="siteHeader">
  <a href="/" class="header-logo">
    <!-- SVG Logo mark (cross + i2m2) -->
    <svg class="header-logo-img" viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="120" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#A87E1A"/>
          <stop offset="35%" stop-color="#F2D472"/>
          <stop offset="65%" stop-color="#C49A2E"/>
          <stop offset="100%" stop-color="#A87E1A"/>
        </linearGradient>
      </defs>
      <!-- Cross icon -->
      <rect x="2" y="9" width="6" height="18" rx="1.5" fill="url(#logoGrad)"/>
      <rect x="-4" y="15" width="18" height="6" rx="1.5" fill="url(#logoGrad)"/>
      <!-- i2m2 text -->
      <text x="22" y="26" font-family="Figtree,sans-serif" font-weight="800" font-size="22" fill="url(#logoGrad)" letter-spacing="-0.5">i2m2</text>
      <!-- tagline -->
      <text x="22" y="35" font-family="Figtree,sans-serif" font-weight="400" font-size="7" fill="#C49A2E" letter-spacing="0.5">Bonanza: Fortune Smiles!</text>
    </svg>
  </a>

  <nav class="nav-menu">
    <a href="#about" class="nav-link">About</a>
    <a href="#services" class="nav-link">Services</a>
    <a href="#works" class="nav-link">Works</a>
    <a href="#company" class="nav-link">Company</a>
    <a href="#news" class="nav-link">News</a>
    <a href="#contact" class="nav-cta">Contact</a>
  </nav>

  <button class="hamburger" id="hamburger" aria-label="メニュー">
    <span></span><span></span><span></span>
  </button>
</header>

<!-- Mobile Nav -->
<nav class="mobile-nav" id="mobileNav">
  <div class="mobile-nav-links">
    <a href="#about"    class="mobile-nav-link" data-close>About</a>
    <a href="#services" class="mobile-nav-link" data-close>Services</a>
    <a href="#works"    class="mobile-nav-link" data-close>Works</a>
    <a href="#company"  class="mobile-nav-link" data-close>Company</a>
    <a href="#news"     class="mobile-nav-link" data-close>News</a>
    <a href="#contact"  class="mobile-nav-link" data-close>Contact</a>
  </div>
</nav>

<!-- ===== HERO ===== -->
<section class="hero-section">
  <div class="hero-bg-lines">
    <!-- decorative SVG lines -->
    <svg class="hero-lines-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      <line x1="0" y1="300" x2="1440" y2="300" stroke="#C49A2E" stroke-width="0.5"/>
      <line x1="0" y1="600" x2="1440" y2="600" stroke="#C49A2E" stroke-width="0.5"/>
      <line x1="360" y1="0" x2="360" y2="900" stroke="#C49A2E" stroke-width="0.5"/>
      <line x1="720" y1="0" x2="720" y2="900" stroke="#C49A2E" stroke-width="0.5"/>
      <line x1="1080" y1="0" x2="1080" y2="900" stroke="#C49A2E" stroke-width="0.5"/>
      <circle cx="720" cy="450" r="200" stroke="#C49A2E" stroke-width="0.5" fill="none"/>
      <circle cx="720" cy="450" r="350" stroke="#C49A2E" stroke-width="0.3" fill="none"/>
    </svg>
  </div>

  <div class="hero-content">
    <div class="hero-eyebrow">
      <div class="hero-eyebrow-line"></div>
      <span class="hero-eyebrow-text">i2m2 Co., Ltd. — Bonanza: Fortune Smiles!</span>
    </div>

    <h1 class="hero-title">
      Innovative<br />
      <span class="gold-word">Choices</span> for<br />
      You &amp; Society.
    </h1>

    <p class="hero-title-jp">
      革新的な選択肢を、あなたと社会に。<br />
      ヘルスケアの現場を支え、成長と安心をともに創る。
    </p>

    <div class="hero-tagline">Bonanza : Fortune Smiles!</div>

    <div class="hero-actions">
      <a href="#about" class="btn-gold">
        <i class="fas fa-arrow-down"></i>
        私たちについて
      </a>
      <a href="#contact" class="btn-outline-gold">
        <i class="fas fa-envelope"></i>
        お問い合わせ
      </a>
    </div>
  </div>

  <!-- Floating Business Card -->
  <div class="hero-card-float">
    <div class="business-card">
      <div class="bc-company">i2m2 Co., Ltd.</div>
      <div class="bc-name">SHUNSUKE NAKAMURA</div>
      <div class="bc-title">Founder</div>
      <div class="bc-divider"></div>
      <div class="bc-info">
        <div class="bc-info-row">
          <span class="bc-info-label">Main</span>
          <span>+81 3-6455-1006</span>
        </div>
        <div class="bc-info-row">
          <span class="bc-info-label">Email</span>
          <span>info@i2m2.com</span>
        </div>
        <div class="bc-info-row">
          <span class="bc-info-label">Direct</span>
          <span>nakamura@i2m2.com</span>
        </div>
        <div class="bc-info-row">
          <span class="bc-info-label">Web</span>
          <span>https://i2m2.com</span>
        </div>
      </div>
      <div class="bc-address">
        <div class="bc-address-title">Tokyo Office</div>
        Roppongi Hills Mori Tower 37F<br />
        6-10-1 Roppongi, Minato-ku<br />
        Tokyo 106-6137
      </div>
    </div>
  </div>

  <div class="hero-scroll">
    <span>Scroll</span>
    <div class="scroll-mouse">
      <div class="scroll-wheel"></div>
    </div>
  </div>
</section>

<!-- ===== MARQUEE ===== -->
<div class="marquee-section">
  <div class="marquee-track" id="marqueeTrack">
    <div class="marquee-item"><span class="marquee-sep"></span>Healthcare Support</div>
    <div class="marquee-item"><span class="marquee-sep"></span>Smart Infrastructure</div>
    <div class="marquee-item"><span class="marquee-sep"></span>Medical Operations</div>
    <div class="marquee-item"><span class="marquee-sep"></span>Beauty &amp; Wellness</div>
    <div class="marquee-item"><span class="marquee-sep"></span>HR Solutions</div>
    <div class="marquee-item"><span class="marquee-sep"></span>Bonanza: Fortune Smiles!</div>
    <div class="marquee-item"><span class="marquee-sep"></span>i2m2 Co., Ltd.</div>
    <div class="marquee-item"><span class="marquee-sep"></span>Healthcare Support</div>
    <div class="marquee-item"><span class="marquee-sep"></span>Smart Infrastructure</div>
    <div class="marquee-item"><span class="marquee-sep"></span>Medical Operations</div>
    <div class="marquee-item"><span class="marquee-sep"></span>Beauty &amp; Wellness</div>
    <div class="marquee-item"><span class="marquee-sep"></span>HR Solutions</div>
    <div class="marquee-item"><span class="marquee-sep"></span>Bonanza: Fortune Smiles!</div>
    <div class="marquee-item"><span class="marquee-sep"></span>i2m2 Co., Ltd.</div>
  </div>
</div>

<!-- ===== ABOUT ===== -->
<section class="about-section" id="about">
  <div class="container">
    <div class="about-grid">
      <div class="about-visual reveal">
        <div class="about-big-num">i2m2</div>
        <div class="about-card">
          <div class="about-card-concept">Our Concept</div>
          <h2 class="about-card-headline">
            革新的な選択肢を、<br />
            <strong>あなたと社会</strong>に。
          </h2>
          <p class="about-card-body">
            私たちは、医療を中心に多角的な分野で包括的なビジネスを展開する事業会社です。<br /><br />
            「革新的な選択肢を、あなたと社会に」のコンセプトのもと、社会インフラのスマート化に向けた様々な取り組みをおこなっております。<br /><br />
            人に寄り添い、現場の成長を後押しする。それがイズムズのスタイルです。施設だけでなく、そこで働くスタッフ一人ひとりの安心と成長に目を向け、共に前進します。
          </p>
          <div class="about-stats">
            <div class="about-stat">
              <div class="about-stat-num" data-count="100">0<span>+</span></div>
              <div class="about-stat-label">支援施設数</div>
            </div>
            <div class="about-stat">
              <div class="about-stat-num" data-count="15">0<span>+</span></div>
              <div class="about-stat-label">事業年数</div>
            </div>
            <div class="about-stat">
              <div class="about-stat-num" data-count="98">0<span>%</span></div>
              <div class="about-stat-label">顧客継続率</div>
            </div>
            <div class="about-stat">
              <div class="about-stat-num" data-count="3">0</div>
              <div class="about-stat-label">拠点</div>
            </div>
          </div>
        </div>
      </div>

      <div class="reveal reveal-delay-2">
        <div class="section-label">
          <div class="section-label-line"></div>
          <span class="section-label-text">About us</div>
        </div>
        <h2 class="section-title">
          私たちに<br /><strong>ついて</strong>
        </h2>
        <p class="section-desc">
          ヘルスケアの現場を支え、成長と安心をともに創るサポートカンパニー。<br /><br />
          医療機関や各種施設の運営や成長を支え、現場の課題解決と効率化を実現する伴走型サポート会社として、地域に必要なインフラを創るパートナーとして、信頼を積み重ねています。<br /><br />
          支援する現場の成長は、私たち自身の成長にもつながります。
        </p>

        <div style="margin-top: 48px; display: flex; flex-direction: column; gap: 20px;">
          <div style="display: flex; gap: 20px; align-items: flex-start;">
            <div style="width: 40px; height: 40px; border: 1px solid var(--border-gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--gold-400); font-size: 16px;">
              <i class="fas fa-hospital"></i>
            </div>
            <div>
              <div style="font-size: 14px; font-weight: 600; color: var(--text-white); margin-bottom: 4px;">医療施設支援</div>
              <div style="font-size: 13px; color: var(--text-muted); line-height: 1.8;">医療機関の運営最適化・人材確保・経営改善をトータルサポート</div>
            </div>
          </div>
          <div style="display: flex; gap: 20px; align-items: flex-start;">
            <div style="width: 40px; height: 40px; border: 1px solid var(--border-gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--gold-400); font-size: 16px;">
              <i class="fas fa-spa"></i>
            </div>
            <div>
              <div style="font-size: 14px; font-weight: 600; color: var(--text-white); margin-bottom: 4px;">美容・ウェルネス</div>
              <div style="font-size: 13px; color: var(--text-muted); line-height: 1.8;">美容クリニック・エステサロン等の施設運営と成長支援</div>
            </div>
          </div>
          <div style="display: flex; gap: 20px; align-items: flex-start;">
            <div style="width: 40px; height: 40px; border: 1px solid var(--border-gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--gold-400); font-size: 16px;">
              <i class="fas fa-network-wired"></i>
            </div>
            <div>
              <div style="font-size: 14px; font-weight: 600; color: var(--text-white); margin-bottom: 4px;">インフラ・DX推進</div>
              <div style="font-size: 13px; color: var(--text-muted); line-height: 1.8;">社会インフラのスマート化・デジタルトランスフォーメーション支援</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== SERVICES ===== -->
<section class="services-section" id="services">
  <div class="container">
    <div class="services-intro">
      <div>
        <div class="section-label reveal">
          <div class="section-label-line"></div>
          <span class="section-label-text">Our Services</span>
        </div>
        <h2 class="section-title reveal">
          私たちの<br /><strong>サービス</strong>
        </h2>
      </div>
      <p class="section-desc reveal" style="max-width: 380px; text-align: right;">
        医療から美容、インフラまで。<br />
        現場のニーズに応えるソリューションを提供します。
      </p>
    </div>

    <div class="services-grid">
      <div class="service-card reveal">
        <div class="service-num">Service 01</div>
        <span class="service-icon">🏥</span>
        <h3 class="service-title">医療施設 運営支援</h3>
        <p class="service-desc">医療機関の経営・運営課題を解決し、患者満足度と収益性を同時に向上させる伴走型サポート。</p>
        <ul class="service-list">
          <li class="service-list-item">施設運営コンサルティング</li>
          <li class="service-list-item">人材確保・育成支援</li>
          <li class="service-list-item">経営改善・コスト最適化</li>
          <li class="service-list-item">患者体験向上プログラム</li>
        </ul>
        <div class="service-arrow"><i class="fas fa-arrow-right"></i></div>
      </div>

      <div class="service-card reveal reveal-delay-1">
        <div class="service-num">Service 02</div>
        <span class="service-icon">✨</span>
        <h3 class="service-title">美容・ウェルネス 事業支援</h3>
        <p class="service-desc">美容クリニック・エステ・整体など、ウェルネス領域の施設開業から成長フェーズまで一貫して支援。</p>
        <ul class="service-list">
          <li class="service-list-item">施設開業サポート</li>
          <li class="service-list-item">集客・マーケティング設計</li>
          <li class="service-list-item">スタッフ採用・教育</li>
          <li class="service-list-item">売上改善・リピート戦略</li>
        </ul>
        <div class="service-arrow"><i class="fas fa-arrow-right"></i></div>
      </div>

      <div class="service-card reveal reveal-delay-2">
        <div class="service-num">Service 03</div>
        <span class="service-icon">📊</span>
        <h3 class="service-title">経営コンサルティング</h3>
        <p class="service-desc">データに基づく経営分析・戦略立案で、中長期的な成長を実現するための包括的な経営支援。</p>
        <ul class="service-list">
          <li class="service-list-item">経営戦略・事業計画策定</li>
          <li class="service-list-item">財務・収支改善</li>
          <li class="service-list-item">組織設計・人事制度構築</li>
          <li class="service-list-item">M&A・事業承継支援</li>
        </ul>
        <div class="service-arrow"><i class="fas fa-arrow-right"></i></div>
      </div>

      <div class="service-card reveal reveal-delay-1">
        <div class="service-num">Service 04</div>
        <span class="service-icon">🔬</span>
        <h3 class="service-title">HR・人材ソリューション</h3>
        <p class="service-desc">医療・介護・福祉分野における人材不足を解決。採用から定着・育成まで一気通貫で対応。</p>
        <ul class="service-list">
          <li class="service-list-item">医療職種採用支援</li>
          <li class="service-list-item">人材育成・研修プログラム</li>
          <li class="service-list-item">職場環境改善・定着促進</li>
          <li class="service-list-item">働き方改革コンサル</li>
        </ul>
        <div class="service-arrow"><i class="fas fa-arrow-right"></i></div>
      </div>

      <div class="service-card reveal reveal-delay-2">
        <div class="service-num">Service 05</div>
        <span class="service-icon">🌐</span>
        <h3 class="service-title">DX・インフラ スマート化</h3>
        <p class="service-desc">社会インフラのデジタル化を推進。医療DXから施設管理のIoT化まで、革新的な選択肢を提供。</p>
        <ul class="service-list">
          <li class="service-list-item">医療DX・電子カルテ導入</li>
          <li class="service-list-item">施設管理システム構築</li>
          <li class="service-list-item">業務自動化・効率化</li>
          <li class="service-list-item">データ分析・可視化</li>
        </ul>
        <div class="service-arrow"><i class="fas fa-arrow-right"></i></div>
      </div>

      <div class="service-card reveal reveal-delay-3">
        <div class="service-num">Service 06</div>
        <span class="service-icon">🏗️</span>
        <h3 class="service-title">施設開発・不動産支援</h3>
        <p class="service-desc">医療・福祉施設の新規開業・移転・リニューアルに必要な物件探しから設計・工事まで幅広く支援。</p>
        <ul class="service-list">
          <li class="service-list-item">物件探索・条件交渉</li>
          <li class="service-list-item">施設設計・内装コーディネート</li>
          <li class="service-list-item">許認可取得サポート</li>
          <li class="service-list-item">開業後フォローアップ</li>
        </ul>
        <div class="service-arrow"><i class="fas fa-arrow-right"></i></div>
      </div>
    </div>
  </div>
</section>

<!-- ===== WORKS ===== -->
<section class="works-section" id="works">
  <div class="container">
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 60px;">
      <div>
        <div class="section-label reveal">
          <div class="section-label-line"></div>
          <span class="section-label-text">Works</span>
        </div>
        <h2 class="section-title reveal">
          実績<strong>紹介</strong>
        </h2>
        <p class="section-desc reveal">
          医療・美容の現場と共に歩み、<br />
          着実に成果を上げてきた施設運営の実績。
        </p>
      </div>
      <a href="#contact" class="btn-outline-gold reveal" style="flex-shrink:0;">
        <i class="fas fa-arrow-right"></i>
        全て見る
      </a>
    </div>

    <div class="works-grid reveal">
      <div class="work-card">
        <div class="work-bg-icon">🏥</div>
        <div class="work-cat">Medical / Clinic</div>
        <h3 class="work-title">都内クリニックチェーン<br />運営効率化・収益改善プロジェクト</h3>
        <p class="work-desc">スタッフ採用難・患者単価低迷・予約管理の非効率を解決。導入後12ヶ月で売上130%達成。</p>
        <div class="work-tags">
          <span class="work-tag">経営改善</span>
          <span class="work-tag">HR</span>
          <span class="work-tag">DX</span>
        </div>
      </div>

      <div class="works-grid-right">
        <div class="work-card work-card-sm">
          <div class="work-bg-icon">✨</div>
          <div class="work-cat">Beauty / Wellness</div>
          <h3 class="work-title">美容クリニック新規開業支援</h3>
          <p class="work-desc">物件選定から内装・採用・集客まで開業プロセスを一貫サポート。</p>
          <div class="work-tags">
            <span class="work-tag">開業支援</span>
            <span class="work-tag">マーケ</span>
          </div>
        </div>
        <div class="work-card work-card-sm">
          <div class="work-bg-icon">🏗️</div>
          <div class="work-cat">Facility / Infrastructure</div>
          <h3 class="work-title">介護施設 業務DX化</h3>
          <p class="work-desc">記録業務のデジタル化・シフト管理自動化で残業時間を40%削減。</p>
          <div class="work-tags">
            <span class="work-tag">DX</span>
            <span class="work-tag">介護</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== COMPANY ===== -->
<section class="company-section" id="company">
  <div class="container">
    <div class="section-label reveal">
      <div class="section-label-line"></div>
      <span class="section-label-text">Company</span>
    </div>
    <h2 class="section-title reveal">会社<strong>情報</strong></h2>

    <div class="company-grid">
      <div class="company-table reveal">
        <div class="company-row">
          <div class="company-row-label">Company</div>
          <div class="company-row-value">株式会社イズムズ<br /><span style="font-size:12px;color:var(--text-muted);font-family:var(--font-en);">i2m2 Co., Ltd.</span></div>
        </div>
        <div class="company-row">
          <div class="company-row-label">Tagline</div>
          <div class="company-row-value" style="color:var(--gold-300);">Bonanza: Fortune Smiles!</div>
        </div>
        <div class="company-row">
          <div class="company-row-label">Concept</div>
          <div class="company-row-value">革新的な選択肢を、あなたと社会に。</div>
        </div>
        <div class="company-row">
          <div class="company-row-label">Founder</div>
          <div class="company-row-value">中村 俊介 (SHUNSUKE NAKAMURA)</div>
        </div>
        <div class="company-row">
          <div class="company-row-label">Main Tel</div>
          <div class="company-row-value" style="font-family:var(--font-en);">+81 3-6455-1006</div>
        </div>
        <div class="company-row">
          <div class="company-row-label">Email</div>
          <div class="company-row-value">
            <a href="mailto:info@i2m2.com" style="color:var(--gold-300);">info@i2m2.com</a>
          </div>
        </div>
        <div class="company-row">
          <div class="company-row-label">Website</div>
          <div class="company-row-value">
            <a href="https://i2m2.com" target="_blank" style="color:var(--gold-300);">https://i2m2.com</a>
          </div>
        </div>
        <div class="company-row">
          <div class="company-row-label">Head Office</div>
          <div class="company-row-value">〒270-2224 千葉県松戸市大橋149-1</div>
        </div>
        <div class="company-row">
          <div class="company-row-label">Tokyo Office</div>
          <div class="company-row-value">
            六本木ヒルズ森タワー37F<br />
            〒106-0032 東京都港区六本木6丁目10-1
          </div>
        </div>
      </div>

      <div class="company-map-card reveal reveal-delay-2">
        <div class="company-map-header">
          <span class="company-map-icon">📍</span>
          <span class="company-map-title">Office Locations</span>
        </div>
        <div class="company-map-placeholder">🗾</div>
        <div class="company-addresses">
          <div class="company-address-item">
            <div class="company-address-dot"></div>
            <div>
              <div class="company-address-label">Tokyo Office</div>
              <div class="company-address-text">
                六本木ヒルズ森タワー 37F<br />
                東京都港区六本木6-10-1<br />
                〒106-6137
              </div>
            </div>
          </div>
          <div class="company-address-item">
            <div class="company-address-dot" style="background:var(--gold-300)"></div>
            <div>
              <div class="company-address-label">Head Office</div>
              <div class="company-address-text">
                千葉県松戸市大橋149-1<br />
                〒270-2224
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== NEWS ===== -->
<section class="news-section" id="news">
  <div class="container">
    <div style="display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <div class="section-label reveal">
          <div class="section-label-line"></div>
          <span class="section-label-text">News</span>
        </div>
        <h2 class="section-title reveal">お<strong>知らせ</strong></h2>
      </div>
      <a href="#" class="btn-outline-gold reveal">
        <i class="fas fa-list"></i>
        一覧を見る
      </a>
    </div>

    <div class="news-list reveal">
      <div class="news-item">
        <span class="news-date">2025.05.27</span>
        <span class="news-cat">お知らせ</span>
        <span class="news-title">株式会社イズムズ コーポレートサイトをリニューアルしました</span>
        <i class="fas fa-arrow-right news-arrow"></i>
      </div>
      <div class="news-item">
        <span class="news-date">2025.04.15</span>
        <span class="news-cat">サービス</span>
        <span class="news-title">医療施設向け新DXソリューションパッケージのご提供を開始しました</span>
        <i class="fas fa-arrow-right news-arrow"></i>
      </div>
      <div class="news-item">
        <span class="news-date">2025.03.01</span>
        <span class="news-cat">実績</span>
        <span class="news-title">都内クリニックチェーン様との運営支援契約を締結しました</span>
        <i class="fas fa-arrow-right news-arrow"></i>
      </div>
      <div class="news-item">
        <span class="news-date">2025.01.10</span>
        <span class="news-cat">お知らせ</span>
        <span class="news-title">六本木ヒルズ森タワーへの東京オフィス移転のご案内</span>
        <i class="fas fa-arrow-right news-arrow"></i>
      </div>
      <div class="news-item">
        <span class="news-date">2024.11.20</span>
        <span class="news-cat">採用</span>
        <span class="news-title">2025年度 新卒・中途採用の募集を開始しました</span>
        <i class="fas fa-arrow-right news-arrow"></i>
      </div>
    </div>
  </div>
</section>

<!-- ===== CONTACT ===== -->
<section class="contact-section" id="contact">
  <div class="contact-bg"></div>
  <div class="contact-gold-ring"></div>
  <div class="contact-gold-ring"></div>

  <div class="container">
    <div class="contact-content">
      <div class="contact-label reveal">Contact</div>
      <h2 class="contact-title reveal">
        まずは<br /><strong>お気軽に</strong><br />ご相談ください。
      </h2>
      <p class="contact-sub reveal">
        数ある会社から弊社にご興味・関心をいただきありがとうございます。<br />
        お客様の現状を把握し、最適なご提案をさせていただきます。
      </p>

      <div class="contact-info-row reveal">
        <div class="contact-info-item">
          <span class="contact-info-label">Main</span>
          <a href="tel:+81364551006" class="contact-info-value">+81 3-6455-1006</a>
        </div>
        <div class="contact-info-sep"></div>
        <div class="contact-info-item">
          <span class="contact-info-label">Email</span>
          <a href="mailto:info@i2m2.com" class="contact-info-value">info@i2m2.com</a>
        </div>
        <div class="contact-info-sep"></div>
        <div class="contact-info-item">
          <span class="contact-info-label">Direct</span>
          <a href="mailto:nakamura@i2m2.com" class="contact-info-value">nakamura@i2m2.com</a>
        </div>
      </div>

      <form class="contact-form reveal reveal-delay-2" onsubmit="handleContact(event)">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Company</label>
            <input type="text" class="form-input" placeholder="会社名" />
          </div>
          <div class="form-group">
            <label class="form-label">Name</label>
            <input type="text" class="form-input" placeholder="お名前" required />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" placeholder="メールアドレス" required />
        </div>
        <div class="form-group">
          <label class="form-label">Phone</label>
          <input type="tel" class="form-input" placeholder="電話番号" />
        </div>
        <div class="form-group">
          <label class="form-label">Message</label>
          <textarea class="form-textarea" placeholder="お問い合わせ内容をご記入ください" required></textarea>
        </div>
        <button type="submit" class="form-submit">
          <i class="fas fa-paper-plane"></i>　送信する
        </button>
      </form>
    </div>
  </div>
</section>

<!-- ===== FOOTER ===== -->
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <!-- Footer logo SVG -->
        <div class="footer-brand-name">i2m2</div>
        <div class="footer-brand-sub">Bonanza: Fortune Smiles!</div>
        <p class="footer-brand-desc">
          医療を中心に多角的な分野で包括的なビジネスを展開する事業会社。革新的な選択肢を、あなたと社会に提供し続けます。
        </p>
        <div class="footer-socials">
          <a href="#" class="footer-social-btn" aria-label="X"><i class="fab fa-x-twitter"></i></a>
          <a href="#" class="footer-social-btn" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          <a href="#" class="footer-social-btn" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        </div>
      </div>

      <div class="footer-col">
        <h4>Services</h4>
        <div class="footer-links">
          <a href="#services" class="footer-link">医療施設 運営支援</a>
          <a href="#services" class="footer-link">美容・ウェルネス 支援</a>
          <a href="#services" class="footer-link">経営コンサルティング</a>
          <a href="#services" class="footer-link">HR・人材ソリューション</a>
          <a href="#services" class="footer-link">DX・インフラ支援</a>
        </div>
      </div>

      <div class="footer-col">
        <h4>Company</h4>
        <div class="footer-links">
          <a href="#about"   class="footer-link">About Us</a>
          <a href="#works"   class="footer-link">Works</a>
          <a href="#company" class="footer-link">Company Info</a>
          <a href="#news"    class="footer-link">News</a>
          <a href="#contact" class="footer-link">Contact</a>
        </div>
      </div>

      <div class="footer-col">
        <h4>Contact</h4>
        <div class="footer-links">
          <a href="tel:+81364551006"         class="footer-link">+81 3-6455-1006</a>
          <a href="mailto:info@i2m2.com"     class="footer-link">info@i2m2.com</a>
          <span class="footer-link">六本木ヒルズ森タワー37F</span>
          <span class="footer-link">東京都港区六本木6-10-1</span>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-copy">
        © 2025 株式会社イズムズ / i2m2 Co., Ltd. All rights reserved.
        &nbsp;|&nbsp;
        <a href="#">プライバシーポリシー</a>
      </div>
      <div class="footer-bottom-links">
        <a href="#" class="footer-bottom-link">利用規約</a>
        <a href="#" class="footer-bottom-link">特定商取引法</a>
        <a href="#" class="footer-bottom-link">サイトマップ</a>
      </div>
    </div>
  </div>
</footer>

<!-- ===== SCRIPTS ===== -->
<script>
// Loading
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
  }, 2200);
});

// Cursor
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
});
(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a, button, .service-card, .work-card, .news-item').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// Header scroll
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// Hamburger
const burger   = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
burger.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  document.body.style.overflow = open ? 'hidden' : '';
});
document.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Scroll Reveal
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Counter
function counter(el) {
  const target = parseInt(el.dataset.count);
  const suffix = el.querySelector('span') ? el.querySelector('span').outerHTML : '';
  const dur = 1800;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const v = 1 - Math.pow(1 - p, 4);
    el.innerHTML = Math.round(v * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { counter(e.target); cntObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => cntObs.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 80, behavior: 'smooth' });
  });
});

// Contact form
function handleContact(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.innerHTML = '<i class="fas fa-check"></i>　送信完了しました';
  btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i>　送信する';
    btn.style.background = '';
    e.target.reset();
  }, 4000);
}
</script>

</body>
</html>`)
})

export default app
