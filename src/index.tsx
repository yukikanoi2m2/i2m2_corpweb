import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './public' }))

app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>i2m2 Co., Ltd. — 株式会社イズムズ | Healthcare Support</title>
  <meta name="description" content="株式会社イズムズは医療・ヘルスケア分野における専門的な支援サービスを提供しています。">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Figtree:wght@400;500;700;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <link href="/static/style.css" rel="stylesheet">
</head>
<body>

<!-- CURSOR -->
<div id="cursor-dot"></div>
<div id="cursor-ring"></div>

<!-- LOADING -->
<div id="loading">
  <div class="ld-logo">i2m2</div>
  <div class="ld-sub">Healthcare &amp; Medical Support</div>
  <div class="ld-bar"><div class="ld-prog"></div></div>
</div>

<!-- HEADER -->
<header class="header" id="header">
  <a class="h-logo" href="#hero">i2m2</a>
  <nav class="h-nav">
    <a href="#concept">コンセプト</a>
    <a href="#services">サービス</a>
    <a href="#works">実績</a>
    <a href="#numbers">数字で見る</a>
    <a href="#team">チーム</a>
    <a href="#contact">お問い合わせ</a>
  </nav>
  <a class="h-cta" href="#contact">CONTACT</a>
  <button class="h-burger" id="menuBtn" aria-label="メニュー">
    <span></span><span></span><span></span>
  </button>
</header>

<!-- FULLSCREEN MENU -->
<div class="menu-overlay" id="menuOverlay">
  <nav class="menu-links">
    <a class="menu-link" href="#concept"  data-close-menu><span class="menu-num">01 /</span>コンセプト</a>
    <a class="menu-link" href="#services" data-close-menu><span class="menu-num">02 /</span>サービス</a>
    <a class="menu-link" href="#works"    data-close-menu><span class="menu-num">03 /</span>実績・事例</a>
    <a class="menu-link" href="#numbers"  data-close-menu><span class="menu-num">04 /</span>数字で見る</a>
    <a class="menu-link" href="#team"     data-close-menu><span class="menu-num">05 /</span>チーム</a>
    <a class="menu-link" href="#contact"  data-close-menu><span class="menu-num">06 /</span>お問い合わせ</a>
  </nav>
</div>

<!-- =============================================
     HERO — Video Background
     ============================================= -->
<section class="hero" id="hero">
  <div class="hero-video-wrap">
    <video class="hero-video" autoplay muted loop playsinline preload="auto">
      <source src="/static/main_acer04.webm" type="video/webm">
    </video>
  </div>
  <div class="hero-overlay"></div>
  <div class="hero-gold-line"></div>

  <div class="hero-content">
    <div class="hero-tag">
      <span class="hero-dot"></span>
      Healthcare &amp; Medical Innovation
    </div>

    <h1 class="hero-title">
      <span class="gold">Medical</span><br>
      <span class="stroke">Support</span><br>
      <span>Excellence.</span>
    </h1>

    <p class="hero-sub">
      医療・ヘルスケア分野の専門家と企業をつなぐ。<br>
      最高水準のサポートで、医療の未来を切り拓く。
    </p>

    <div class="hero-bottom">
      <div class="hero-actions">
        <a class="btn-gold" href="#concept">
          <i class="fas fa-arrow-right"></i>
          私たちについて
        </a>
        <a class="btn-ghost" href="#services">
          <i class="fas fa-star"></i>
          サービス一覧
        </a>
      </div>
      <div class="hero-stats">
        <div class="h-stat">
          <span class="h-stat-n">15+</span>
          <span class="h-stat-l">Years Experience</span>
        </div>
        <div class="h-stat">
          <span class="h-stat-n">300+</span>
          <span class="h-stat-l">Medical Partners</span>
        </div>
        <div class="h-stat">
          <span class="h-stat-n">98%</span>
          <span class="h-stat-l">Client Satisfaction</span>
        </div>
      </div>
    </div>
  </div>

  <div class="hero-scroll">
    <div class="scroll-track"><div class="scroll-thumb"></div></div>
    SCROLL
  </div>
</section>

<!-- =============================================
     MARQUEE
     ============================================= -->
<div class="marquee-wrap">
  <div class="marquee-inner">
    ${Array(2).fill(`
    <span class="marquee-item">Healthcare Support <span class="m-sep"></span></span>
    <span class="marquee-item">Medical Innovation <span class="m-sep"></span></span>
    <span class="marquee-item">株式会社イズムズ <span class="m-sep"></span></span>
    <span class="marquee-item">Clinical Support <span class="m-sep"></span></span>
    <span class="marquee-item">MedTech Solutions <span class="m-sep"></span></span>
    <span class="marquee-item">Healthcare Excellence <span class="m-sep"></span></span>
    <span class="marquee-item">Patient Care Support <span class="m-sep"></span></span>
    <span class="marquee-item">Medical Staffing <span class="m-sep"></span></span>
    `).join('')}
  </div>
</div>

<!-- =============================================
     CONCEPT / TAKEOUT
     ============================================= -->
<section class="sec sec-dark" id="concept">
  <div class="container">
    <div class="takeout-wrap">
      <!-- Left: Cards -->
      <div class="rev-l">
        <div class="takeout-card" style="margin-bottom:24px; position:relative;">
          <div class="tc-num">01</div>
          <div class="tc-icon">🏥</div>
          <div class="tc-float">i2m2 Way</div>
          <h3 class="tc-title">医療現場を知る<br>プロフェッショナル</h3>
          <p class="tc-desc">
            医療・ヘルスケア業界に特化した20年以上の経験。現場の声をダイレクトに反映した、実践的なソリューションを提供します。
          </p>
        </div>
        <div class="takeout-card" style="position:relative;">
          <div class="tc-num">02</div>
          <div class="tc-icon">⚕️</div>
          <h3 class="tc-title">テクノロジーと<br>ヒューマンタッチの融合</h3>
          <p class="tc-desc">
            最新のデジタル技術と豊富な人的ネットワークを組み合わせ、医療従事者と患者双方に価値を提供します。
          </p>
        </div>
      </div>

      <!-- Right: Features -->
      <div class="rev-r">
        <div class="sec-eye">
          <div class="sec-eye-line"></div>
          <div class="sec-eye-text">Our Concept</div>
        </div>
        <h2 class="sec-title">
          医療の未来を<br>
          <span class="gold">共に創る</span><br>
          <span class="stroke">Partners.</span>
        </h2>
        <p class="sec-desc">
          株式会社イズムズは、医療・ヘルスケア分野における総合的なサポートカンパニーです。医療機関、製薬会社、医療機器メーカーをつなぎ、患者さんへの最高の医療提供を支援します。
        </p>

        <div class="feature-list" style="margin-top:40px;">
          <div class="feature-item rev d1">
            <div class="fi-icon">🎯</div>
            <div>
              <div class="fi-title">専門特化型アプローチ</div>
              <div class="fi-desc">医療分野に完全特化。業界特有の規制・倫理基準を熟知したプロチームが対応します。</div>
            </div>
          </div>
          <div class="feature-item rev d2">
            <div class="fi-icon">🤝</div>
            <div>
              <div class="fi-title">ワンストップソリューション</div>
              <div class="fi-desc">人材紹介から業務支援、研修・教育まで、医療機関のあらゆるニーズに一括対応します。</div>
            </div>
          </div>
          <div class="feature-item rev d3">
            <div class="fi-icon">📊</div>
            <div>
              <div class="fi-title">データドリブン経営支援</div>
              <div class="fi-desc">最新のヘルスケアデータ分析を活用し、経営改善・効率化をサポートします。</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- =============================================
     SERVICES
     ============================================= -->
<section class="sec sec-darker" id="services">
  <div class="container">
    <div class="svc-header rev">
      <div>
        <div class="sec-eye">
          <div class="sec-eye-line"></div>
          <div class="sec-eye-text">Our Services</div>
        </div>
        <h2 class="sec-title">
          提供する<br><span class="gold">サービス</span>
        </h2>
      </div>
      <a class="btn-ghost rev d2" href="#contact">
        詳細を問い合わせる <i class="fas fa-arrow-right"></i>
      </a>
    </div>

    <div class="svc-grid">
      <div class="svc-card rev d1">
        <div class="svc-no">01</div>
        <span class="svc-icon">👨‍⚕️</span>
        <h3 class="svc-name">医療人材紹介・派遣</h3>
        <p class="svc-text">医師・看護師・薬剤師・コメディカルの紹介・派遣。高い定着率と迅速なマッチングで医療機関を支援します。</p>
        <div class="svc-tags">
          <span class="svc-tag">医師</span>
          <span class="svc-tag">看護師</span>
          <span class="svc-tag">薬剤師</span>
          <span class="svc-tag">コメディカル</span>
        </div>
        <div class="svc-arr"><i class="fas fa-arrow-right"></i></div>
      </div>

      <div class="svc-card rev d2">
        <div class="svc-no">02</div>
        <span class="svc-icon">🏨</span>
        <h3 class="svc-name">病院・クリニック経営支援</h3>
        <p class="svc-text">収益改善・患者満足度向上・診療体制最適化など、医療機関経営の課題をトータルサポートします。</p>
        <div class="svc-tags">
          <span class="svc-tag">経営改善</span>
          <span class="svc-tag">収益最適化</span>
          <span class="svc-tag">DX推進</span>
        </div>
        <div class="svc-arr"><i class="fas fa-arrow-right"></i></div>
      </div>

      <div class="svc-card rev d3">
        <div class="svc-no">03</div>
        <span class="svc-icon">💊</span>
        <h3 class="svc-name">製薬・MR支援サービス</h3>
        <p class="svc-text">製薬会社・医療機器メーカー向けのMRサポート、学術活動支援、プロモーション支援を提供します。</p>
        <div class="svc-tags">
          <span class="svc-tag">MR支援</span>
          <span class="svc-tag">学術活動</span>
          <span class="svc-tag">プロモーション</span>
        </div>
        <div class="svc-arr"><i class="fas fa-arrow-right"></i></div>
      </div>

      <div class="svc-card rev d1">
        <div class="svc-no">04</div>
        <span class="svc-icon">📱</span>
        <h3 class="svc-name">医療DX・デジタル化支援</h3>
        <p class="svc-text">電子カルテ導入、オンライン診療システム、医療AIツール活用など、医療機関のデジタル変革を推進します。</p>
        <div class="svc-tags">
          <span class="svc-tag">電子カルテ</span>
          <span class="svc-tag">オンライン診療</span>
          <span class="svc-tag">AI活用</span>
        </div>
        <div class="svc-arr"><i class="fas fa-arrow-right"></i></div>
      </div>

      <div class="svc-card rev d2">
        <div class="svc-no">05</div>
        <span class="svc-icon">🎓</span>
        <h3 class="svc-name">医療研修・教育プログラム</h3>
        <p class="svc-text">医療従事者向けの専門研修、接遇向上、チームビルディング、管理職育成プログラムを提供します。</p>
        <div class="svc-tags">
          <span class="svc-tag">専門研修</span>
          <span class="svc-tag">接遇向上</span>
          <span class="svc-tag">リーダー育成</span>
        </div>
        <div class="svc-arr"><i class="fas fa-arrow-right"></i></div>
      </div>

      <div class="svc-card rev d3">
        <div class="svc-no">06</div>
        <span class="svc-icon">🌐</span>
        <h3 class="svc-name">在宅医療・介護支援</h3>
        <p class="svc-text">在宅医療・介護分野のコンサルティング、連携体制構築、スタッフ支援を通じて地域医療を支えます。</p>
        <div class="svc-tags">
          <span class="svc-tag">在宅医療</span>
          <span class="svc-tag">介護支援</span>
          <span class="svc-tag">地域連携</span>
        </div>
        <div class="svc-arr"><i class="fas fa-arrow-right"></i></div>
      </div>
    </div>
  </div>
</section>

<!-- =============================================
     PORTFOLIO / WORKS
     ============================================= -->
<section class="sec sec-dark" id="works">
  <div class="container">
    <div class="rev">
      <div class="sec-eye">
        <div class="sec-eye-line"></div>
        <div class="sec-eye-text">Our Works</div>
      </div>
      <h2 class="sec-title">
        支援実績・<span class="gold">導入事例</span>
      </h2>
    </div>

    <div class="pf-filter rev d1">
      <button class="pf-btn on" data-cat="all">All</button>
      <button class="pf-btn" data-cat="hospital">病院・クリニック</button>
      <button class="pf-btn" data-cat="pharma">製薬・医療機器</button>
      <button class="pf-btn" data-cat="dx">医療DX</button>
      <button class="pf-btn" data-cat="care">在宅・介護</button>
    </div>

    <div class="pf-grid">
      <div class="pf-card wide rev d1" data-cat="hospital">
        <div class="pf-inner">
          <div class="pf-thumb" style="background:linear-gradient(135deg,#1a1a1a,#2a2a2a);font-size:80px;display:flex;align-items:center;justify-content:center;">🏥</div>
          <div class="pf-overlay">
            <div class="pf-cat">病院・クリニック</div>
            <div class="pf-name">大学病院グループ　人材マネジメント改革</div>
            <div class="pf-tags-s">医師 300名 派遣調整 / 離職率 40% 改善 / 年間コスト最適化</div>
          </div>
          <div class="pf-eye"><i class="fas fa-eye"></i></div>
        </div>
      </div>

      <div class="pf-card rev d2" data-cat="dx">
        <div class="pf-inner">
          <div class="pf-thumb" style="background:linear-gradient(135deg,#0e1a2e,#1a2e3a);font-size:70px;display:flex;align-items:center;justify-content:center;">📱</div>
          <div class="pf-overlay">
            <div class="pf-cat">医療DX</div>
            <div class="pf-name">オンライン診療システム導入支援</div>
            <div class="pf-tags-s">50クリニック導入 / 患者満足度向上 / 売上 120% 達成</div>
          </div>
          <div class="pf-eye"><i class="fas fa-eye"></i></div>
        </div>
      </div>

      <div class="pf-card rev d1" data-cat="pharma">
        <div class="pf-inner">
          <div class="pf-thumb" style="background:linear-gradient(135deg,#1a0e2e,#2e1a0e);font-size:70px;display:flex;align-items:center;justify-content:center;">💊</div>
          <div class="pf-overlay">
            <div class="pf-cat">製薬・医療機器</div>
            <div class="pf-name">大手製薬会社 MR活動最適化プロジェクト</div>
            <div class="pf-tags-s">MR 200名支援 / 情報提供効率 2倍向上 / 処方増加率達成</div>
          </div>
          <div class="pf-eye"><i class="fas fa-eye"></i></div>
        </div>
      </div>

      <div class="pf-card wide rev d2" data-cat="care">
        <div class="pf-inner">
          <div class="pf-thumb" style="background:linear-gradient(135deg,#0e2a1a,#1a2a0e);font-size:80px;display:flex;align-items:center;justify-content:center;">🏡</div>
          <div class="pf-overlay">
            <div class="pf-cat">在宅・介護</div>
            <div class="pf-name">地域包括ケアシステム構築コンサルティング</div>
            <div class="pf-tags-s">3市町村連携 / 在宅移行率向上 / 地域医療連携体制構築</div>
          </div>
          <div class="pf-eye"><i class="fas fa-eye"></i></div>
        </div>
      </div>

      <div class="pf-card rev d3" data-cat="hospital">
        <div class="pf-inner">
          <div class="pf-thumb" style="background:linear-gradient(135deg,#2a1a0e,#1a0e0e);font-size:70px;display:flex;align-items:center;justify-content:center;">⚕️</div>
          <div class="pf-overlay">
            <div class="pf-cat">病院・クリニック</div>
            <div class="pf-name">急性期病院 経営改善プロジェクト</div>
            <div class="pf-tags-s">収益 35% 改善 / 稼働率向上 / スタッフ満足度向上</div>
          </div>
          <div class="pf-eye"><i class="fas fa-eye"></i></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- =============================================
     NUMBERS
     ============================================= -->
<section class="sec sec-darker" id="numbers">
  <div class="container">
    <div style="text-align:center; margin-bottom:64px;" class="rev">
      <div class="sec-eye" style="justify-content:center;">
        <div class="sec-eye-line"></div>
        <div class="sec-eye-text">Numbers</div>
        <div class="sec-eye-line"></div>
      </div>
      <h2 class="sec-title" style="margin-bottom:0;">
        数字で見る<span class="gold"> i2m2</span>
      </h2>
    </div>

    <div class="num-grid">
      <div class="num-item rev d1">
        <div class="num-val" data-count="15" data-suffix="+">0</div>
        <div class="num-label">Years of Experience<br>設立からの年数</div>
      </div>
      <div class="num-item rev d2">
        <div class="num-val" data-count="300" data-suffix="+">0</div>
        <div class="num-label">Medical Partners<br>医療パートナー数</div>
      </div>
      <div class="num-item rev d3">
        <div class="num-val" data-count="5000" data-suffix="+">0</div>
        <div class="num-label">Staff Placed<br>紹介・派遣実績</div>
      </div>
      <div class="num-item rev d4">
        <div class="num-val" data-count="98" data-suffix="%">0</div>
        <div class="num-label">Client Satisfaction<br>顧客満足度</div>
      </div>
    </div>
  </div>
</section>

<!-- =============================================
     PROCESS
     ============================================= -->
<section class="sec sec-mid" id="process">
  <div class="container">
    <div style="text-align:center;" class="rev">
      <div class="sec-eye" style="justify-content:center;">
        <div class="sec-eye-line"></div>
        <div class="sec-eye-text">Our Process</div>
        <div class="sec-eye-line"></div>
      </div>
      <h2 class="sec-title">
        <span class="gold">5つのステップ</span>で<br>理想の医療環境へ
      </h2>
      <p class="sec-desc" style="margin:0 auto;">
        初回相談から運用サポートまで、一貫した体制でお客様の課題を解決します。
      </p>
    </div>

    <div class="proc-grid">
      <div class="proc-step rev d1">
        <div class="proc-num">01</div>
        <h4>初回ヒアリング</h4>
        <p>現状の課題・ニーズを丁寧にお伺いします</p>
      </div>
      <div class="proc-step rev d2">
        <div class="proc-num">02</div>
        <h4>現状分析</h4>
        <p>専門チームが詳細な分析・診断を実施</p>
      </div>
      <div class="proc-step rev d3">
        <div class="proc-num">03</div>
        <h4>ソリューション設計</h4>
        <p>最適なプランを提案・カスタマイズ</p>
      </div>
      <div class="proc-step rev d4">
        <div class="proc-num">04</div>
        <h4>実施・導入支援</h4>
        <p>専任チームが現場での実装をサポート</p>
      </div>
      <div class="proc-step rev d5">
        <div class="proc-num">05</div>
        <h4>継続的フォロー</h4>
        <p>導入後も定期レビューで効果を最大化</p>
      </div>
    </div>
  </div>
</section>

<!-- =============================================
     NEWSLETTER / BLOG
     ============================================= -->
<section class="sec sec-dark" id="insights">
  <div class="container">
    <div class="nl-grid">
      <div class="nl-sticky">
        <div class="sec-eye">
          <div class="sec-eye-line"></div>
          <div class="sec-eye-text">Insights</div>
        </div>
        <h2 class="nl-title">医療業界の<br>最新インサイト</h2>
        <p class="nl-sub">
          医療・ヘルスケア業界の最新トレンド、規制動向、実践的なノウハウをお届けします。ニュースレターに登録して、業界トップの情報を受け取ってください。
        </p>
        <div class="nl-form">
          <input type="text" placeholder="お名前" id="nlName">
          <input type="email" placeholder="メールアドレス" id="nlEmail">
          <button type="button" onclick="handleNewsletter()">
            ニュースレター登録 →
          </button>
        </div>
        <div id="nlMsg" style="margin-top:12px;font-size:13px;color:var(--g2);display:none;">
          ご登録ありがとうございます！
        </div>
      </div>

      <div class="blog-list">
        <div class="blog-card rev d1">
          <div class="blog-img">📋</div>
          <div>
            <div class="blog-series">HEALTHCARE TREND · 2024.12</div>
            <div class="blog-title">2025年の医療DX：AIと電子カルテ統合が加速する時代へ</div>
            <div class="blog-excerpt">医療現場でのAI活用が急速に拡大しています。診断支援AIから業務効率化ツールまで、2025年に注目すべき医療テクノロジートレンドを解説します。</div>
            <div class="blog-tags">
              <span class="blog-tag">AI医療</span>
              <span class="blog-tag">電子カルテ</span>
              <span class="blog-tag">DX</span>
            </div>
          </div>
        </div>

        <div class="blog-card rev d2">
          <div class="blog-img">👨‍⚕️</div>
          <div>
            <div class="blog-series">STAFFING INSIGHT · 2024.11</div>
            <div class="blog-title">医師不足問題の解決策：地域偏在と専門医配置の最適化</div>
            <div class="blog-excerpt">日本の医師不足・地域偏在問題に対し、私たちが実践してきた解決策と成功事例を紹介します。人材配置の革新的アプローチとは。</div>
            <div class="blog-tags">
              <span class="blog-tag">医師不足</span>
              <span class="blog-tag">地域医療</span>
              <span class="blog-tag">人材配置</span>
            </div>
          </div>
        </div>

        <div class="blog-card rev d3">
          <div class="blog-img">🏥</div>
          <div>
            <div class="blog-series">MANAGEMENT · 2024.10</div>
            <div class="blog-title">病院経営改革の成功事例：収益改善と職員満足度を同時に実現</div>
            <div class="blog-excerpt">収益改善と職員の働きやすさを両立した病院グループの取り組み。i2m2が支援した改革プロセスと定量的な成果を詳しく報告します。</div>
            <div class="blog-tags">
              <span class="blog-tag">経営改革</span>
              <span class="blog-tag">収益改善</span>
              <span class="blog-tag">職員満足度</span>
            </div>
          </div>
        </div>

        <div class="blog-card rev d4">
          <div class="blog-img">🌐</div>
          <div>
            <div class="blog-series">POLICY UPDATE · 2024.09</div>
            <div class="blog-title">診療報酬改定2024：医療機関が知るべき変更点と対応策</div>
            <div class="blog-excerpt">2024年診療報酬改定の重要変更点を分かりやすく解説。収益への影響と具体的な対応策について、専門家の視点からアドバイスします。</div>
            <div class="blog-tags">
              <span class="blog-tag">診療報酬</span>
              <span class="blog-tag">制度改正</span>
              <span class="blog-tag">対応策</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- =============================================
     AWARDS / RECOGNITION
     ============================================= -->
<section class="sec sec-darker" id="awards">
  <div class="container">
    <div class="rev">
      <div class="sec-eye">
        <div class="sec-eye-line"></div>
        <div class="sec-eye-text">Recognition</div>
      </div>
      <h2 class="sec-title">
        受賞・認定・<span class="gold">メディア掲載</span>
      </h2>
    </div>

    <div class="award-list">
      <div class="award-item rev d1">
        <div class="aw-yr">2024</div>
        <div class="aw-name">ヘルスケアイノベーション大賞 最優秀賞</div>
        <div class="aw-org">日本ヘルスケア協会</div>
        <div class="aw-badge">⭐ 最優秀</div>
      </div>
      <div class="award-item rev d2">
        <div class="aw-yr">2024</div>
        <div class="aw-name">医療人材サービス優良企業認定</div>
        <div class="aw-org">厚生労働省関連機関</div>
        <div class="aw-badge">🏆 認定</div>
      </div>
      <div class="award-item rev d3">
        <div class="aw-yr">2023</div>
        <div class="aw-name">日経ヘルスケア誌「注目の医療支援企業30社」選出</div>
        <div class="aw-org">日本経済新聞社</div>
        <div class="aw-badge">📰 掲載</div>
      </div>
      <div class="award-item rev d4">
        <div class="aw-yr">2023</div>
        <div class="aw-name">医療経営コンサルティングアワード 優秀賞</div>
        <div class="aw-org">全日本病院協会</div>
        <div class="aw-badge">🥇 優秀賞</div>
      </div>
      <div class="award-item rev d5">
        <div class="aw-yr">2022</div>
        <div class="aw-name">働きやすい職場環境企業認定（ホワイト企業認定）</div>
        <div class="aw-org">一般財団法人日本次世代企業普及機構</div>
        <div class="aw-badge">✅ 認定</div>
      </div>
    </div>
  </div>
</section>

<!-- =============================================
     TEAM
     ============================================= -->
<section class="sec sec-dark" id="team">
  <div class="container">
    <div class="rev" style="text-align:center; margin-bottom:16px;">
      <div class="sec-eye" style="justify-content:center;">
        <div class="sec-eye-line"></div>
        <div class="sec-eye-text">Our Team</div>
        <div class="sec-eye-line"></div>
      </div>
      <h2 class="sec-title">
        医療の未来を担う<br><span class="gold">専門家チーム</span>
      </h2>
    </div>

    <div class="team-grid">
      <div class="team-card rev d1">
        <div class="team-photo">👨‍💼</div>
        <div class="team-info">
          <div class="team-role">CEO &amp; Founder</div>
          <div class="team-name">鈴木 健一郎</div>
          <div class="team-desc">元大手製薬会社取締役。医療業界30年の経験を持つ創業者。</div>
        </div>
      </div>
      <div class="team-card rev d2">
        <div class="team-photo">👩‍⚕️</div>
        <div class="team-info">
          <div class="team-role">CMO · Medical Director</div>
          <div class="team-name">田中 美咲</div>
          <div class="team-desc">内科専門医・MBA取得。臨床現場と経営両面からの視点を持つ医療ディレクター。</div>
        </div>
      </div>
      <div class="team-card rev d3">
        <div class="team-photo">👨‍💻</div>
        <div class="team-info">
          <div class="team-role">CTO · Digital Health</div>
          <div class="team-name">山田 龍司</div>
          <div class="team-desc">医療IT分野15年の経験。電子カルテシステム・AI医療ツールの導入専門家。</div>
        </div>
      </div>
      <div class="team-card rev d4">
        <div class="team-photo">👩‍💼</div>
        <div class="team-info">
          <div class="team-role">COO · Operations</div>
          <div class="team-name">中村 さおり</div>
          <div class="team-desc">大手医療グループ出身。300以上のプロジェクトを率いたオペレーションのプロ。</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- =============================================
     CTA
     ============================================= -->
<section class="cta-wrap" id="contact">
  <div class="cta-ring"></div>
  <div class="cta-ring"></div>
  <div class="cta-ring"></div>
  <div class="cta-glow"></div>

  <div class="cta-inner rev">
    <div class="cta-eye">Let's Work Together</div>
    <h2 class="cta-title">
      共に医療の<br><span class="gold">未来を創ろう</span>
    </h2>
    <p class="cta-sub">
      医療機関・製薬会社・医療機器メーカーの皆様、まずはお気軽にご相談ください。専門コンサルタントが丁寧にヒアリングし、最適な解決策をご提案します。
    </p>

    <div class="cta-info">
      <div class="ci-item">
        <span class="ci-lbl">Tel</span>
        <span class="ci-val">03-XXXX-XXXX</span>
      </div>
      <div class="ci-sep"></div>
      <div class="ci-item">
        <span class="ci-lbl">Email</span>
        <span class="ci-val">info@i2m2.com</span>
      </div>
      <div class="ci-sep"></div>
      <div class="ci-item">
        <span class="ci-lbl">Hours</span>
        <span class="ci-val">平日 9:00〜18:00</span>
      </div>
    </div>

    <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap;">
      <a class="btn-gold" href="mailto:info@i2m2.com">
        <i class="fas fa-envelope"></i>
        無料相談を申し込む
      </a>
      <a class="btn-ghost" href="tel:03XXXXXXXX">
        <i class="fas fa-phone"></i>
        電話で問い合わせる
      </a>
    </div>
  </div>
</section>

<!-- =============================================
     FOOTER
     ============================================= -->
<footer class="footer">
  <div class="container">
    <div class="footer-top">
      <div>
        <span class="f-logo">i2m2</span>
        <div class="f-sub">株式会社イズムズ</div>
        <p class="f-desc">
          医療・ヘルスケア分野における総合的なサポートカンパニー。医療の未来を、共に創ります。
        </p>
        <div class="f-socials">
          <a class="f-soc" href="https://i2m2.com" target="_blank" aria-label="Website"><i class="fas fa-globe"></i></a>
          <a class="f-soc" href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          <a class="f-soc" href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a class="f-soc" href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        </div>
      </div>

      <div class="f-col">
        <h4>Services</h4>
        <div class="f-links">
          <a class="f-link" href="#services">医療人材紹介・派遣</a>
          <a class="f-link" href="#services">病院経営支援</a>
          <a class="f-link" href="#services">製薬・MR支援</a>
          <a class="f-link" href="#services">医療DX支援</a>
          <a class="f-link" href="#services">医療研修・教育</a>
          <a class="f-link" href="#services">在宅医療支援</a>
        </div>
      </div>

      <div class="f-col">
        <h4>Company</h4>
        <div class="f-links">
          <a class="f-link" href="#concept">会社概要</a>
          <a class="f-link" href="#team">チーム紹介</a>
          <a class="f-link" href="#awards">受賞・実績</a>
          <a class="f-link" href="#insights">インサイト</a>
          <a class="f-link" href="https://i2m2.com" target="_blank">コーポレートサイト</a>
        </div>
      </div>

      <div class="f-col">
        <h4>Contact</h4>
        <div class="f-links">
          <a class="f-link" href="#contact">お問い合わせ</a>
          <a class="f-link" href="#contact">採用情報</a>
          <a class="f-link" href="#insights">ニュースレター</a>
          <a class="f-link" href="mailto:info@i2m2.com">info@i2m2.com</a>
        </div>
      </div>
    </div>

    <div class="footer-bot">
      <div class="f-copy">
        &copy; 2024 <a href="https://i2m2.com" target="_blank">株式会社イズムズ (i2m2 Co., Ltd.)</a>. All rights reserved.
      </div>
      <div class="f-bot-links">
        <a class="f-bot-link" href="#">プライバシーポリシー</a>
        <a class="f-bot-link" href="#">利用規約</a>
        <a class="f-bot-link" href="#">個人情報保護方針</a>
      </div>
    </div>
  </div>
</footer>

<!-- =============================================
     JAVASCRIPT — Full Dynamic
     ============================================= -->
<script>
(function () {
  'use strict';

  /* ─── Loading ─── */
  window.addEventListener('load', function () {
    setTimeout(function () {
      var ld = document.getElementById('loading');
      if (ld) {
        ld.classList.add('out');
        setTimeout(function () { ld.style.display = 'none'; }, 900);
      }
    }, 2200);
  });

  /* ─── Custom Cursor ─── */
  var dot  = document.getElementById('cursor-dot');
  var ring = document.getElementById('cursor-ring');
  var mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a,button,.pf-card,.blog-card,.svc-card,.award-item,.team-card').forEach(function (el) {
    el.addEventListener('mouseenter', function () { document.body.classList.add('cur-hover'); });
    el.addEventListener('mouseleave', function () { document.body.classList.remove('cur-hover'); });
  });

  document.addEventListener('mousedown', function () { document.body.classList.add('cur-click'); });
  document.addEventListener('mouseup',   function () { document.body.classList.remove('cur-click'); });

  /* ─── Header scroll ─── */
  var header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    if (header) {
      header.classList.toggle('on', window.scrollY > 40);
    }
  }, { passive: true });

  /* ─── Fullscreen Menu ─── */
  var menuBtn     = document.getElementById('menuBtn');
  var menuOverlay = document.getElementById('menuOverlay');
  var isMenuOpen  = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    menuBtn.classList.toggle('open', isMenuOpen);
    menuOverlay.classList.toggle('open', isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }

  if (menuBtn) menuBtn.addEventListener('click', toggleMenu);

  document.querySelectorAll('[data-close-menu]').forEach(function (el) {
    el.addEventListener('click', function () {
      if (isMenuOpen) toggleMenu();
    });
  });

  /* ─── Smooth scroll ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 68, behavior: 'smooth' });
      }
    });
  });

  /* ─── Scroll Reveal (IntersectionObserver) ─── */
  var ioOpts = { threshold: 0.12, rootMargin: '0px 0px -60px 0px' };
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, ioOpts);

  document.querySelectorAll('.rev,.rev-l,.rev-r').forEach(function (el) { io.observe(el); });

  /* ─── Counter Animation ─── */
  function animCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var start  = 0;
    var dur    = 2000;
    var t0     = null;

    function step(ts) {
      if (!t0) t0 = ts;
      var prog = Math.min((ts - t0) / dur, 1);
      var ease = 1 - Math.pow(1 - prog, 3);
      var val  = Math.floor(ease * target);
      el.textContent = val.toLocaleString() + suffix;
      if (prog < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var ioNum = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        animCount(en.target);
        ioNum.unobserve(en.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.num-val[data-count]').forEach(function (el) { ioNum.observe(el); });

  /* ─── Portfolio Filter ─── */
  var pfBtns  = document.querySelectorAll('.pf-btn');
  var pfCards = document.querySelectorAll('.pf-card');

  pfBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = this.getAttribute('data-cat');
      pfBtns.forEach(function (b) { b.classList.remove('on'); });
      this.classList.add('on');

      pfCards.forEach(function (card) {
        var cardCat = card.getAttribute('data-cat');
        if (cat === 'all' || cardCat === cat) {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
          card.style.display = '';
        } else {
          card.style.opacity = '0.15';
          card.style.transform = 'scale(0.97)';
        }
      });
    });
  });

  /* ─── Process Step Highlight on scroll ─── */
  var procSteps = document.querySelectorAll('.proc-step');
  var ioProc = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('active');
      }
    });
  }, { threshold: 0.6 });
  procSteps.forEach(function (s) { ioProc.observe(s); });

  /* ─── Parallax Hero ─── */
  var heroVid = document.querySelector('.hero-video');
  window.addEventListener('scroll', function () {
    if (!heroVid) return;
    var sy = window.scrollY;
    if (sy < window.innerHeight) {
      heroVid.style.transform = 'scale(1) translateY(' + (sy * 0.3) + 'px)';
    }
  }, { passive: true });

  /* ─── Newsletter ─── */
  window.handleNewsletter = function () {
    var name  = document.getElementById('nlName');
    var email = document.getElementById('nlEmail');
    var msg   = document.getElementById('nlMsg');
    if (email && email.value && email.value.includes('@')) {
      if (msg) { msg.style.display = 'block'; }
      if (name)  { name.value  = ''; }
      if (email) { email.value = ''; }
    } else {
      alert('有効なメールアドレスを入力してください。');
    }
  };

  /* ─── Hover tilt effect on cards ─── */
  document.querySelectorAll('.takeout-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width  - 0.5;
      var y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = 'perspective(800px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg) translateZ(4px)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
      card.style.transition = 'transform 0.6s ease';
    });
    card.addEventListener('mouseenter', function () {
      card.style.transition = 'transform 0.1s ease';
    });
  });

  /* ─── Svc card animated border ─── */
  document.querySelectorAll('.svc-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      var y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });

  console.log('%c i2m2 Co., Ltd. ', 'background:#C49A2E;color:#000;font-weight:900;font-size:18px;padding:4px 12px;border-radius:4px;');
  console.log('%c Healthcare & Medical Support Excellence ', 'color:#C49A2E;font-size:11px;letter-spacing:2px;');

})();
</script>

</body>
</html>`)
})

export default app
