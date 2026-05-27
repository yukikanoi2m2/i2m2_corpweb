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
  <title>i2m2 — 株式会社イズムズ | Healthcare &amp; Medical Support</title>
  <meta name="description" content="株式会社イズムズは医療・ヘルスケア分野における専門的な支援サービスを提供しています。">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,900&family=Figtree:wght@400;700;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
  <link href="/static/style.css" rel="stylesheet">
</head>
<body>

<!-- ──── CURSOR ──── -->
<div id="cursor-dot"></div>
<div id="cursor-ring"></div>

<!-- ──── LOADING ──── -->
<div id="loading">
  <div class="ld-logo">i2m2</div>
  <div class="ld-tag">Healthcare &amp; Medical Support</div>
  <div class="ld-bar"><div class="ld-fill"></div></div>
</div>

<!-- ──── HEADER ──── -->
<header class="header" id="hdr">
  <a class="h-logo" href="#top">i2m2</a>
  <nav class="h-nav">
    <a href="#takeout">テイクアウト</a>
    <a href="#services">サービス</a>
    <a href="#works">実績</a>
    <a href="#insights">インサイト</a>
    <a href="#team">チーム</a>
    <a href="#contact">お問い合わせ</a>
  </nav>
  <a class="h-cta" href="#contact">
    <i class="fas fa-arrow-right"></i> CONTACT
  </a>
  <button class="h-burger" id="menuToggle" aria-label="menu">
    <span></span><span></span><span></span>
  </button>
</header>

<!-- ──── FULLSCREEN MENU ──── -->
<div class="menu-overlay" id="menuOverlay">
  <div class="menu-inner">
    <nav class="menu-links">
      <a class="menu-link" href="#takeout"  data-mc><span class="m-idx">01</span>テイクアウト</a>
      <a class="menu-link" href="#services" data-mc><span class="m-idx">02</span>サービス</a>
      <a class="menu-link" href="#works"    data-mc><span class="m-idx">03</span>実績・事例</a>
      <a class="menu-link" href="#about"    data-mc><span class="m-idx">04</span>私たちについて</a>
      <a class="menu-link" href="#team"     data-mc><span class="m-idx">05</span>チーム</a>
      <a class="menu-link" href="#contact"  data-mc><span class="m-idx">06</span>お問い合わせ</a>
    </nav>
    <div class="menu-side">
      <div>
        <div class="ms-label">Contact</div>
        <div class="ms-contact">
          <a href="mailto:info@i2m2.com">info@i2m2.com</a>
          <a href="tel:0312345678">03-1234-5678</a>
          <a href="https://i2m2.com" target="_blank">i2m2.com ↗</a>
        </div>
      </div>
      <div>
        <div class="ms-label">Location</div>
        <div class="ms-contact">
          <a href="#">東京都港区</a>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════
     § 1  HERO — Video Background
═══════════════════════════════════════ -->
<section class="hero" id="top">
  <div class="hero-vid-wrap">
    <video class="hero-vid" autoplay muted loop playsinline preload="auto">
      <source src="/static/main_acer04.webm" type="video/webm">
    </video>
  </div>
  <div class="hero-overlay"></div>
  <div class="hero-topline"></div>

  <div class="hero-body">
    <div class="hero-kicker">
      <span class="hero-kicker-dot"></span>
      Healthcare &amp; Medical Innovation
    </div>

    <h1 class="hero-title">
      Medical<br>
      <span class="gold-fill">Support</span><br>
      <span class="outline">Excellence.</span>
    </h1>

    <p class="hero-sub">
      医療・ヘルスケア分野の専門家と企業をつなぐ。<br>
      最高水準のサポートで、医療の未来を切り拓く。
    </p>

    <div class="hero-foot">
      <div style="display:flex;gap:14px;flex-wrap:wrap;">
        <a class="btn-primary" href="#takeout">
          サービスを見る <i class="fas fa-arrow-right"></i>
        </a>
        <a class="btn-outline" href="#contact">
          <i class="fas fa-paper-plane"></i> お問い合わせ
        </a>
      </div>
      <div class="hero-stats">
        <div class="hs-item">
          <span class="hs-num">15+</span>
          <span class="hs-lbl">Years Experience</span>
        </div>
        <div class="hs-item">
          <span class="hs-num">300+</span>
          <span class="hs-lbl">Medical Partners</span>
        </div>
        <div class="hs-item">
          <span class="hs-num">98%</span>
          <span class="hs-lbl">Satisfaction</span>
        </div>
      </div>
    </div>
  </div>
  <div class="hero-scroll">
    <div class="hero-scroll-line"><div class="hero-scroll-fill"></div></div>
    SCROLL
  </div>
</section>

<!-- ═══════════════════════════════════════
     § TICKER 1 — cream strip
═══════════════════════════════════════ -->
<div class="ticker">
  <div class="ticker-inner">
    ${Array(2).fill(`
    <span class="ticker-item gold-item">i2m2 <span class="ticker-sep"></span></span>
    <span class="ticker-item">Healthcare Support <span class="ticker-sep"></span></span>
    <span class="ticker-item gold-item">Medical Innovation <span class="ticker-sep"></span></span>
    <span class="ticker-item">株式会社イズムズ <span class="ticker-sep"></span></span>
    <span class="ticker-item gold-item">Clinical Excellence <span class="ticker-sep"></span></span>
    <span class="ticker-item">MedTech Solutions <span class="ticker-sep"></span></span>
    <span class="ticker-item gold-item">Patient Care <span class="ticker-sep"></span></span>
    <span class="ticker-item">Medical Staffing <span class="ticker-sep"></span></span>
    `).join('')}
  </div>
</div>

<!-- ═══════════════════════════════════════
     § 2  TAKEOUT — soijeong signature concept
          "どんなサービスをご注文しますか？"
═══════════════════════════════════════ -->
<section class="sec takeout-sec" id="takeout">
  <div class="container">

    <!-- Big center headline — soijeong style -->
    <div class="takeout-center rev">
      <div class="takeout-q">Takeout?</div>
      <p class="takeout-subtitle">
        どんなサービスをご注文しますか？<br>
        メニューから選んで、テイクアウトしてください！
      </p>
      <p class="takeout-hint">i2m2が提供する医療支援サービスをご覧ください</p>
    </div>

    <!-- Menu cards — 4 services -->
    <div class="takeout-menu">

      <div class="menu-card rev d1">
        <div class="mc-badge">HOT</div>
        <div class="mc-no">MENU · 01</div>
        <div class="mc-icon">👨‍⚕️</div>
        <h3 class="mc-name">医療人材<br>紹介・派遣</h3>
        <p class="mc-desc">医師・看護師・薬剤師・コメディカルの専門紹介。高い定着率と迅速なマッチング。</p>
        <div class="mc-tags">
          <span class="mc-tag">医師</span>
          <span class="mc-tag">看護師</span>
          <span class="mc-tag">薬剤師</span>
          <span class="mc-tag">コメディカル</span>
        </div>
      </div>

      <div class="menu-card rev d2">
        <div class="mc-no">MENU · 02</div>
        <div class="mc-icon">🏨</div>
        <h3 class="mc-name">病院・クリニック<br>経営支援</h3>
        <p class="mc-desc">収益改善・患者満足度向上・診療体制最適化。医療経営の課題をトータルサポート。</p>
        <div class="mc-tags">
          <span class="mc-tag">経営改善</span>
          <span class="mc-tag">収益最適化</span>
          <span class="mc-tag">DX推進</span>
        </div>
      </div>

      <div class="menu-card rev d3">
        <div class="mc-no">MENU · 03</div>
        <div class="mc-icon">💊</div>
        <h3 class="mc-name">製薬・MR<br>支援サービス</h3>
        <p class="mc-desc">製薬会社・医療機器メーカー向けMRサポート、学術活動支援、プロモーション支援。</p>
        <div class="mc-tags">
          <span class="mc-tag">MR支援</span>
          <span class="mc-tag">学術活動</span>
          <span class="mc-tag">プロモーション</span>
        </div>
      </div>

      <div class="menu-card rev d4">
        <div class="mc-no">MENU · 04</div>
        <div class="mc-icon">📱</div>
        <h3 class="mc-name">医療DX・<br>デジタル化支援</h3>
        <p class="mc-desc">電子カルテ・オンライン診療・医療AI活用など、医療機関のデジタル変革を推進。</p>
        <div class="mc-tags">
          <span class="mc-tag">電子カルテ</span>
          <span class="mc-tag">AI活用</span>
          <span class="mc-tag">オンライン診療</span>
        </div>
      </div>

    </div><!-- /takeout-menu -->

    <!-- CTA below menu -->
    <div style="text-align:center; margin-top:48px;" class="rev d5">
      <a class="btn-primary" href="#contact">
        プロジェクトを相談する <i class="fas fa-arrow-right"></i>
      </a>
    </div>

  </div>
</section>

<!-- ═══════════════════════════════════════
     § TICKER 2 — dark strip (soijeong "A small thing...")
═══════════════════════════════════════ -->
<div class="marquee-dark">
  <div class="marquee-dark-inner">
    ${Array(4).fill(`
    <span class="mdi-item">A small thing has made a big things. <span class="mdi-sep"></span></span>
    <span class="mdi-item">Healthcare Excellence. <span class="mdi-sep"></span></span>
    <span class="mdi-item">医療の未来を共に創る。 <span class="mdi-sep"></span></span>
    `).join('')}
  </div>
</div>

<!-- ═══════════════════════════════════════
     § 3  SERVICES — "What We Service"
          soijeong: accordion/expand list style
═══════════════════════════════════════ -->
<section class="sec svc-sec" id="services">
  <div class="container">
    <div class="svc-header rev">
      <div>
        <div class="sec-eye">
          <div class="sec-eye-bar"></div>
          <div class="sec-eye-txt">What We Service</div>
        </div>
        <h2 class="sec-title">
          i2m2が提供する<br>
          <span class="gold">医療支援</span>サービス
        </h2>
      </div>
      <div class="svc-header-right rev d2">
        <p>医療・ヘルスケア分野に特化した専門家チームが、あなたの課題に合わせた最適なソリューションを提供します。</p>
      </div>
    </div>

    <div class="svc-list">

      <div class="svc-item">
        <div class="svc-item-head svc-toggler" data-target="svc1">
          <span class="svc-num">01</span>
          <div class="svc-icon-wrap">👨‍⚕️</div>
          <div style="flex:1;">
            <div class="svc-title-main">医療人材紹介・派遣</div>
            <div class="svc-title-sub">Medical Staffing &amp; Placement</div>
          </div>
          <div class="svc-arr"><i class="fas fa-plus"></i></div>
        </div>
        <div class="svc-body" id="svc1">
          <div class="svc-body-col">
            <h5>人材紹介</h5>
            <ul>
              <li>医師・専門医の紹介</li>
              <li>看護師・助産師の紹介</li>
              <li>薬剤師・管理栄養士の紹介</li>
              <li>コメディカルスタッフ全般</li>
            </ul>
          </div>
          <div class="svc-body-col">
            <h5>採用支援</h5>
            <ul>
              <li>採用戦略策定・求人設計</li>
              <li>面接・選考プロセス支援</li>
              <li>オンボーディング支援</li>
              <li>定着率改善コンサルティング</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="svc-item">
        <div class="svc-item-head svc-toggler" data-target="svc2">
          <span class="svc-num">02</span>
          <div class="svc-icon-wrap">🏨</div>
          <div style="flex:1;">
            <div class="svc-title-main">病院・クリニック経営支援</div>
            <div class="svc-title-sub">Hospital Management Consulting</div>
          </div>
          <div class="svc-arr"><i class="fas fa-plus"></i></div>
        </div>
        <div class="svc-body" id="svc2">
          <div class="svc-body-col">
            <h5>経営改善</h5>
            <ul>
              <li>収益構造の分析・改善</li>
              <li>診療体制の最適化</li>
              <li>コスト削減・効率化</li>
              <li>患者満足度向上施策</li>
            </ul>
          </div>
          <div class="svc-body-col">
            <h5>DX推進</h5>
            <ul>
              <li>電子カルテ導入支援</li>
              <li>オンライン診療システム構築</li>
              <li>業務自動化・RPA導入</li>
              <li>データ分析・BI活用</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="svc-item">
        <div class="svc-item-head svc-toggler" data-target="svc3">
          <span class="svc-num">03</span>
          <div class="svc-icon-wrap">💊</div>
          <div style="flex:1;">
            <div class="svc-title-main">製薬・MR支援サービス</div>
            <div class="svc-title-sub">Pharma &amp; MR Support</div>
          </div>
          <div class="svc-arr"><i class="fas fa-plus"></i></div>
        </div>
        <div class="svc-body" id="svc3">
          <div class="svc-body-col">
            <h5>MR活動支援</h5>
            <ul>
              <li>MR研修・スキル向上</li>
              <li>訪問・情報提供活動支援</li>
              <li>学術資材の作成・管理</li>
              <li>KPI管理・効果測定</li>
            </ul>
          </div>
          <div class="svc-body-col">
            <h5>プロモーション</h5>
            <ul>
              <li>医療機関向けプロモーション</li>
              <li>デジタルマーケティング支援</li>
              <li>学術イベント・講演会企画</li>
              <li>製品情報管理・コンプライアンス対応</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="svc-item">
        <div class="svc-item-head svc-toggler" data-target="svc4">
          <span class="svc-num">04</span>
          <div class="svc-icon-wrap">🎓</div>
          <div style="flex:1;">
            <div class="svc-title-main">医療研修・教育プログラム</div>
            <div class="svc-title-sub">Medical Training &amp; Education</div>
          </div>
          <div class="svc-arr"><i class="fas fa-plus"></i></div>
        </div>
        <div class="svc-body" id="svc4">
          <div class="svc-body-col">
            <h5>スタッフ研修</h5>
            <ul>
              <li>医療接遇・コミュニケーション研修</li>
              <li>専門技術・スキルアップ研修</li>
              <li>チームビルディング研修</li>
              <li>管理職・リーダー育成</li>
            </ul>
          </div>
          <div class="svc-body-col">
            <h5>教育支援</h5>
            <ul>
              <li>eラーニングシステム導入</li>
              <li>研修プログラムカスタマイズ</li>
              <li>資格取得支援</li>
              <li>効果測定・フォローアップ</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="svc-item">
        <div class="svc-item-head svc-toggler" data-target="svc5">
          <span class="svc-num">05</span>
          <div class="svc-icon-wrap">🌐</div>
          <div style="flex:1;">
            <div class="svc-title-main">在宅医療・介護支援</div>
            <div class="svc-title-sub">Home Care &amp; Long-term Care Support</div>
          </div>
          <div class="svc-arr"><i class="fas fa-plus"></i></div>
        </div>
        <div class="svc-body" id="svc5">
          <div class="svc-body-col">
            <h5>在宅医療</h5>
            <ul>
              <li>訪問診療・往診体制構築</li>
              <li>在宅医療チーム育成</li>
              <li>地域医療連携体制づくり</li>
              <li>ICT活用による情報共有</li>
            </ul>
          </div>
          <div class="svc-body-col">
            <h5>介護連携</h5>
            <ul>
              <li>医療・介護の連携体制構築</li>
              <li>介護スタッフ教育支援</li>
              <li>地域包括ケアシステム構築</li>
              <li>家族支援・カウンセリング</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════
     § 4  PORTFOLIO — "注文したメニューが出ました"
          soijeong signature phrase
═══════════════════════════════════════ -->
<section class="sec sec-cream" id="works">
  <div class="container">
    <div class="pf-head-row rev">
      <div>
        <div class="sec-eye">
          <div class="sec-eye-bar"></div>
          <div class="sec-eye-txt">Portfolio</div>
        </div>
        <h2 class="sec-title">
          ご注文のメニュー<br><span class="gold">出来上がりました！</span>
        </h2>
      </div>
      <a class="btn-outline rev d2" href="#contact">
        実績一覧 <i class="fas fa-arrow-right"></i>
      </a>
    </div>

    <!-- Filter buttons -->
    <div class="pf-filters rev d1">
      <button class="pf-filter-btn on" data-filter="all">All</button>
      <button class="pf-filter-btn" data-filter="hospital">病院・クリニック</button>
      <button class="pf-filter-btn" data-filter="pharma">製薬・医療機器</button>
      <button class="pf-filter-btn" data-filter="dx">医療DX</button>
      <button class="pf-filter-btn" data-filter="care">在宅・介護</button>
    </div>

    <!-- Grid -->
    <div class="pf-grid">

      <div class="pf-card span2 rev d1" data-filter="hospital">
        <div class="pf-thumb" style="background:linear-gradient(135deg,#f0ebe0,#e8d8b0);">🏥</div>
        <div class="pf-hover-layer">
          <div class="pf-cat">病院・クリニック</div>
          <div class="pf-name">大学病院グループ 人材マネジメント改革</div>
          <div class="pf-tags">医師300名 派遣調整 / 離職率40%改善 / コスト最適化</div>
        </div>
        <div class="pf-view-btn">View</div>
      </div>

      <div class="pf-card rev d2" data-filter="dx">
        <div class="pf-thumb" style="background:linear-gradient(135deg,#e8f0f8,#d0e4f0);">📱</div>
        <div class="pf-hover-layer">
          <div class="pf-cat">医療DX</div>
          <div class="pf-name">オンライン診療 システム導入支援</div>
          <div class="pf-tags">50クリニック導入 / 患者満足度向上</div>
        </div>
        <div class="pf-view-btn">View</div>
      </div>

      <div class="pf-card rev d1" data-filter="pharma">
        <div class="pf-thumb" style="background:linear-gradient(135deg,#f5eef8,#e8d5f0);">💊</div>
        <div class="pf-hover-layer">
          <div class="pf-cat">製薬・医療機器</div>
          <div class="pf-name">大手製薬会社 MR活動最適化</div>
          <div class="pf-tags">MR200名支援 / 情報提供効率2倍</div>
        </div>
        <div class="pf-view-btn">View</div>
      </div>

      <div class="pf-card span2 rev d2" data-filter="care">
        <div class="pf-thumb" style="background:linear-gradient(135deg,#eef5ec,#d8ecd4);">🏡</div>
        <div class="pf-hover-layer">
          <div class="pf-cat">在宅・介護</div>
          <div class="pf-name">地域包括ケアシステム構築コンサルティング</div>
          <div class="pf-tags">3市町村連携 / 在宅移行率向上</div>
        </div>
        <div class="pf-view-btn">View</div>
      </div>

      <div class="pf-card rev d3" data-filter="hospital">
        <div class="pf-thumb" style="background:linear-gradient(135deg,#fff5e8,#fde8c4);">⚕️</div>
        <div class="pf-hover-layer">
          <div class="pf-cat">病院・クリニック</div>
          <div class="pf-name">急性期病院 経営改善プロジェクト</div>
          <div class="pf-tags">収益35%改善 / 稼働率向上</div>
        </div>
        <div class="pf-view-btn">View</div>
      </div>

    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════
     § 5  NUMBERS — count-up dark panel
═══════════════════════════════════════ -->
<section class="sec nums-sec" id="numbers">
  <div class="container">
    <div style="text-align:center; margin-bottom:64px;" class="rev">
      <div class="sec-eye" style="justify-content:center;">
        <div class="sec-eye-bar"></div>
        <div class="sec-eye-txt">Numbers</div>
        <div class="sec-eye-bar"></div>
      </div>
      <h2 class="sec-title" style="color:#fff; margin-bottom:0;">
        数字で見る <span class="gold">i2m2</span>
      </h2>
    </div>

    <div class="nums-grid">
      <div class="num-cell rev d1">
        <div class="num-val" data-n="15" data-s="+">0</div>
        <div class="num-lbl">Years of Experience<br>設立からの年数</div>
      </div>
      <div class="num-cell rev d2">
        <div class="num-val" data-n="300" data-s="+">0</div>
        <div class="num-lbl">Medical Partners<br>医療パートナー数</div>
      </div>
      <div class="num-cell rev d3">
        <div class="num-val" data-n="5000" data-s="+">0</div>
        <div class="num-lbl">Staff Placed<br>紹介・派遣実績</div>
      </div>
      <div class="num-cell rev d4">
        <div class="num-val" data-n="98" data-s="%">0</div>
        <div class="num-lbl">Client Satisfaction<br>顧客満足度</div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════
     § 6  PROCESS — 5 steps
═══════════════════════════════════════ -->
<section class="sec proc-sec" id="process">
  <div class="container">
    <div style="text-align:center;" class="rev">
      <div class="sec-eye" style="justify-content:center;">
        <div class="sec-eye-bar"></div>
        <div class="sec-eye-txt">Our Process</div>
        <div class="sec-eye-bar"></div>
      </div>
      <h2 class="sec-title">
        <span class="gold">5つのステップ</span>で<br>理想の医療環境へ
      </h2>
      <p class="sec-desc" style="margin:0 auto;">
        初回相談から継続的なフォローまで、一貫した体制でお客様の課題を解決します。
      </p>
    </div>

    <div class="proc-steps">
      <div class="proc-step rev d1">
        <div class="proc-circle">01</div>
        <h4>初回ヒアリング</h4>
        <p>現状の課題・ニーズを丁寧にお伺いします</p>
      </div>
      <div class="proc-step rev d2">
        <div class="proc-circle">02</div>
        <h4>現状分析</h4>
        <p>専門チームが詳細な分析・診断を実施</p>
      </div>
      <div class="proc-step rev d3">
        <div class="proc-circle">03</div>
        <h4>ソリューション設計</h4>
        <p>最適なプランをカスタマイズして提案</p>
      </div>
      <div class="proc-step rev d4">
        <div class="proc-circle">04</div>
        <h4>実施・導入支援</h4>
        <p>専任チームが現場での実装をサポート</p>
      </div>
      <div class="proc-step rev d5">
        <div class="proc-circle">05</div>
        <h4>継続的フォロー</h4>
        <p>定期レビューで効果を最大化します</p>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════
     § DARK MARQUEE — "A small thing..."
═══════════════════════════════════════ -->
<div class="marquee-dark">
  <div class="marquee-dark-inner" style="animation-direction:reverse;">
    ${Array(4).fill(`
    <span class="mdi-item">We always think 'better good' <span class="mdi-sep"></span></span>
    <span class="mdi-item">医療の未来を共に。 <span class="mdi-sep"></span></span>
    <span class="mdi-item">Healthcare Innovation <span class="mdi-sep"></span></span>
    `).join('')}
  </div>
</div>

<!-- ═══════════════════════════════════════
     § 7  ABOUT — "안녕하세요" style dark section
          soijeong: dark bg, "For the Better"
═══════════════════════════════════════ -->
<section class="sec about-sec" id="about">
  <div class="container">
    <div class="about-inner">
      <div class="about-left rev-l">
        <div class="sec-eye" style="margin-bottom:20px;">
          <div class="sec-eye-bar"></div>
          <div class="sec-eye-txt" style="color:var(--g2);">About i2m2</div>
        </div>
        <h2>
          こんにちは。<br>
          <span class="gold">i2m2</span>です。<br>
          <span class="outline">For the</span><br>
          <span class="gold">Better.</span>
        </h2>
        <p class="about-desc">
          株式会社イズムズは、医療・ヘルスケア分野における総合的なサポートカンパニーです。医療機関、製薬会社、医療機器メーカーをつなぎ、患者さんへの最高の医療提供を支援します。
        </p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <a class="btn-primary" href="#contact">
            お問い合わせ <i class="fas fa-arrow-right"></i>
          </a>
          <a class="btn-outline" href="https://i2m2.com" target="_blank" style="border-color:rgba(200,162,39,.4);color:var(--g3);">
            公式サイト ↗
          </a>
        </div>
      </div>

      <div class="about-right rev-r">
        <div class="about-feat">
          <div class="af-icon">🎯</div>
          <div>
            <div class="af-title">専門特化型アプローチ</div>
            <div class="af-desc">医療分野に完全特化。業界特有の規制・倫理基準を熟知したプロチームが対応します。20年以上の実績で培った知見を活かします。</div>
          </div>
        </div>
        <div class="about-feat">
          <div class="af-icon">🤝</div>
          <div>
            <div class="af-title">ワンストップソリューション</div>
            <div class="af-desc">人材紹介から業務支援、研修・教育まで、医療機関のあらゆるニーズに一括対応。複数業者に依頼する手間をゼロに。</div>
          </div>
        </div>
        <div class="about-feat">
          <div class="af-icon">📊</div>
          <div>
            <div class="af-title">データドリブン経営支援</div>
            <div class="af-desc">最新のヘルスケアデータ分析を活用し、経営改善・効率化をサポート。数字に基づいた確かな提案で成果を出します。</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════
     § 8  NEWSLETTER / INSIGHTS
          soijeong layout: sticky left + card list right
═══════════════════════════════════════ -->
<section class="sec nl-sec" id="insights">
  <div class="container">
    <div class="nl-layout">
      <div class="nl-left rev-l">
        <div class="sec-eye">
          <div class="sec-eye-bar"></div>
          <div class="sec-eye-txt">Insights</div>
        </div>
        <h2 class="sec-title" style="font-size:clamp(26px,3vw,40px);">
          医療業界の<br><span class="gold">最新インサイト</span>
        </h2>
        <p class="nl-subtitle">
          医療・ヘルスケア業界の最新トレンド、規制動向、実践的ノウハウをお届け。ニュースレターに登録して、業界トップの情報を受け取ってください。
        </p>
        <div class="nl-form">
          <input type="text"  id="nlName"  placeholder="お名前">
          <input type="email" id="nlEmail" placeholder="メールアドレス">
          <button class="nl-submit" onclick="submitNL()">
            ニュースレター登録 →
          </button>
        </div>
        <p id="nlOk" style="margin-top:12px;font-size:13px;color:var(--g1);display:none;">✓ ご登録ありがとうございます！</p>
      </div>

      <div class="nl-cards">
        <div class="nl-card rev d1">
          <div class="nl-img">📋</div>
          <div>
            <div class="nl-series">TREND · 2025.01</div>
            <div class="nl-title">2025年の医療DX：AIと電子カルテ統合が加速する時代へ</div>
            <div class="nl-excerpt">医療現場でのAI活用が急速に拡大しています。診断支援AIから業務効率化ツールまで、2025年に注目すべき医療テクノロジートレンドを解説します。</div>
            <div class="nl-tag-row">
              <span class="nl-tag">AI医療</span>
              <span class="nl-tag">電子カルテ</span>
              <span class="nl-tag">DX</span>
            </div>
          </div>
        </div>

        <div class="nl-card rev d2">
          <div class="nl-img">👨‍⚕️</div>
          <div>
            <div class="nl-series">STAFFING · 2024.12</div>
            <div class="nl-title">医師不足問題の解決策：地域偏在と専門医配置の最適化</div>
            <div class="nl-excerpt">日本の医師不足・地域偏在問題に対し、i2m2が実践してきた解決策と成功事例を紹介します。人材配置の革新的アプローチとは。</div>
            <div class="nl-tag-row">
              <span class="nl-tag">医師不足</span>
              <span class="nl-tag">地域医療</span>
              <span class="nl-tag">人材配置</span>
            </div>
          </div>
        </div>

        <div class="nl-card rev d3">
          <div class="nl-img">🏥</div>
          <div>
            <div class="nl-series">MANAGEMENT · 2024.11</div>
            <div class="nl-title">病院経営改革の成功事例：収益改善と職員満足度を同時に実現</div>
            <div class="nl-excerpt">収益改善と職員の働きやすさを両立した病院グループの取り組み。i2m2が支援した改革プロセスと定量的な成果を詳しく報告します。</div>
            <div class="nl-tag-row">
              <span class="nl-tag">経営改革</span>
              <span class="nl-tag">収益改善</span>
              <span class="nl-tag">職員満足度</span>
            </div>
          </div>
        </div>

        <div class="nl-card rev d4">
          <div class="nl-img">🌐</div>
          <div>
            <div class="nl-series">POLICY · 2024.10</div>
            <div class="nl-title">診療報酬改定2024：医療機関が知るべき変更点と対応策</div>
            <div class="nl-excerpt">2024年診療報酬改定の重要変更点を解説。収益への影響と具体的な対応策について、専門家の視点からアドバイスします。</div>
            <div class="nl-tag-row">
              <span class="nl-tag">診療報酬</span>
              <span class="nl-tag">制度改正</span>
              <span class="nl-tag">対応策</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════
     § 9  AWARDS — "Award Winner"
═══════════════════════════════════════ -->
<section class="sec award-sec" id="awards">
  <div class="container">
    <div class="rev">
      <div class="sec-eye">
        <div class="sec-eye-bar"></div>
        <div class="sec-eye-txt">Recognition</div>
      </div>
      <h2 class="sec-title">
        受賞・認定・<span class="gold">Award Winner</span>
      </h2>
    </div>

    <div class="award-list">
      <div class="award-row rev d1">
        <div class="aw-yr">2024</div>
        <div class="aw-name">ヘルスケアイノベーション大賞 最優秀賞</div>
        <div class="aw-org">日本ヘルスケア協会</div>
        <div class="aw-pill">⭐ 最優秀</div>
      </div>
      <div class="award-row rev d2">
        <div class="aw-yr">2024</div>
        <div class="aw-name">医療人材サービス優良企業認定</div>
        <div class="aw-org">厚生労働省関連機関</div>
        <div class="aw-pill">🏆 認定</div>
      </div>
      <div class="award-row rev d3">
        <div class="aw-yr">2023</div>
        <div class="aw-name">日経ヘルスケア誌「注目の医療支援企業30社」選出</div>
        <div class="aw-org">日本経済新聞社</div>
        <div class="aw-pill">📰 掲載</div>
      </div>
      <div class="award-row rev d4">
        <div class="aw-yr">2023</div>
        <div class="aw-name">医療経営コンサルティングアワード 優秀賞</div>
        <div class="aw-org">全日本病院協会</div>
        <div class="aw-pill">🥇 優秀賞</div>
      </div>
      <div class="award-row rev d5">
        <div class="aw-yr">2022</div>
        <div class="aw-name">ホワイト企業認定（働きやすい職場環境企業）</div>
        <div class="aw-org">日本次世代企業普及機構</div>
        <div class="aw-pill">✅ 認定</div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════
     § 10  TEAM
═══════════════════════════════════════ -->
<section class="sec team-sec" id="team">
  <div class="container">
    <div style="text-align:center;" class="rev">
      <div class="sec-eye" style="justify-content:center;">
        <div class="sec-eye-bar"></div>
        <div class="sec-eye-txt">Our Team</div>
        <div class="sec-eye-bar"></div>
      </div>
      <h2 class="sec-title">
        少数精鋭の<span class="gold">プロチーム</span><br>
        <span class="outline-d">One-Team.</span>
      </h2>
      <p class="sec-desc" style="margin:0 auto;">
        医療業界に精通した専門家が集結。経験と情熱を持って、お客様の課題に向き合います。
      </p>
    </div>

    <div class="team-grid">
      <div class="team-card rev d1">
        <div class="tc-photo">👨‍💼</div>
        <div class="tc-info">
          <div class="tc-role">CEO &amp; Founder</div>
          <div class="tc-name">鈴木 健一郎</div>
          <div class="tc-bio">元大手製薬会社取締役。医療業界30年の経験を持つ創業者。</div>
        </div>
      </div>
      <div class="team-card rev d2">
        <div class="tc-photo">👩‍⚕️</div>
        <div class="tc-info">
          <div class="tc-role">CMO · Medical Director</div>
          <div class="tc-name">田中 美咲</div>
          <div class="tc-bio">内科専門医・MBA取得。臨床×経営両面の視点を持つ医療ディレクター。</div>
        </div>
      </div>
      <div class="team-card rev d3">
        <div class="tc-photo">👨‍💻</div>
        <div class="tc-info">
          <div class="tc-role">CTO · Digital Health</div>
          <div class="tc-name">山田 龍司</div>
          <div class="tc-bio">医療IT分野15年の経験。電子カルテ・AI医療ツールの導入専門家。</div>
        </div>
      </div>
      <div class="team-card rev d4">
        <div class="tc-photo">👩‍💼</div>
        <div class="tc-info">
          <div class="tc-role">COO · Operations</div>
          <div class="tc-name">中村 さおり</div>
          <div class="tc-bio">大手医療グループ出身。300以上のプロジェクトを率いたオペレーションのプロ。</div>
        </div>
      </div>
    </div>

    <div style="text-align:center; margin-top:48px;" class="rev d5">
      <a class="btn-outline" href="#contact">
        採用情報を見る <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════
     § 11  CTA — soijeong final: centered + rings
═══════════════════════════════════════ -->
<section class="cta-sec" id="contact">
  <div class="cta-ring"></div>
  <div class="cta-ring"></div>
  <div class="cta-ring"></div>
  <div class="cta-glow"></div>

  <div class="cta-body rev">
    <p class="cta-kicker">Let's Work Together</p>
    <h2 class="cta-title">
      共に医療の<br><span class="gold">未来を創ろう</span>
    </h2>
    <p class="cta-sub">
      医療機関・製薬会社・医療機器メーカーの皆様、まずはお気軽にご相談ください。専門コンサルタントが丁寧にヒアリングし、最適な解決策をご提案します。
    </p>
    <div class="cta-info-row">
      <div class="ci">
        <span class="ci-l">Tel</span>
        <span class="ci-v">03-XXXX-XXXX</span>
      </div>
      <div class="ci-divider"></div>
      <div class="ci">
        <span class="ci-l">Email</span>
        <span class="ci-v">info@i2m2.com</span>
      </div>
      <div class="ci-divider"></div>
      <div class="ci">
        <span class="ci-l">Hours</span>
        <span class="ci-v">平日 9:00〜18:00</span>
      </div>
    </div>
    <div class="cta-btns">
      <a class="btn-primary" href="mailto:info@i2m2.com">
        <i class="fas fa-envelope"></i> 無料相談を申し込む
      </a>
      <a class="btn-outline" href="tel:03XXXXXXXX" style="border-color:rgba(200,162,39,.4);color:var(--g3);">
        <i class="fas fa-phone"></i> 電話で問い合わせる
      </a>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════
     § FOOTER
═══════════════════════════════════════ -->
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <span class="f-brand-logo">i2m2</span>
        <div class="f-brand-sub">株式会社イズムズ</div>
        <p class="f-brand-desc">医療・ヘルスケア分野における総合的なサポートカンパニー。医療の未来を、共に創ります。</p>
        <div class="f-socials">
          <a class="f-soc" href="https://i2m2.com" target="_blank" aria-label="Web"><i class="fas fa-globe"></i></a>
          <a class="f-soc" href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          <a class="f-soc" href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a class="f-soc" href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        </div>
      </div>
      <div>
        <div class="f-col-title">Services</div>
        <div class="f-col-links">
          <a class="f-col-link" href="#takeout">医療人材紹介・派遣</a>
          <a class="f-col-link" href="#takeout">病院経営支援</a>
          <a class="f-col-link" href="#takeout">製薬・MR支援</a>
          <a class="f-col-link" href="#takeout">医療DX支援</a>
          <a class="f-col-link" href="#services">医療研修・教育</a>
          <a class="f-col-link" href="#services">在宅医療支援</a>
        </div>
      </div>
      <div>
        <div class="f-col-title">Company</div>
        <div class="f-col-links">
          <a class="f-col-link" href="#about">会社概要</a>
          <a class="f-col-link" href="#team">チーム紹介</a>
          <a class="f-col-link" href="#awards">受賞・実績</a>
          <a class="f-col-link" href="#insights">インサイト</a>
          <a class="f-col-link" href="https://i2m2.com" target="_blank">コーポレートサイト ↗</a>
        </div>
      </div>
      <div>
        <div class="f-col-title">Contact</div>
        <div class="f-col-links">
          <a class="f-col-link" href="#contact">お問い合わせ</a>
          <a class="f-col-link" href="#contact">採用情報</a>
          <a class="f-col-link" href="#insights">ニュースレター</a>
          <a class="f-col-link" href="mailto:info@i2m2.com">info@i2m2.com</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="f-copy">
        &copy; 2025 <a href="https://i2m2.com" target="_blank">株式会社イズムズ (i2m2 Co., Ltd.)</a>. All rights reserved.
      </div>
      <div class="f-legal">
        <a href="#">プライバシーポリシー</a>
        <a href="#">利用規約</a>
        <a href="#">個人情報保護方針</a>
      </div>
    </div>
  </div>
</footer>

<!-- ═══════════════════════════════════════
     JAVASCRIPT — full dynamic
═══════════════════════════════════════ -->
<script>
(function(){
'use strict';

/* ── Loading ── */
window.addEventListener('load', function(){
  setTimeout(function(){
    var el = document.getElementById('loading');
    if(el){ el.classList.add('out'); setTimeout(function(){ el.style.display='none'; }, 800); }
  }, 2400);
});

/* ── Custom Cursor ── */
var dot  = document.getElementById('cursor-dot');
var ring = document.getElementById('cursor-ring');
var mx=0, my=0, rx=0, ry=0;

document.addEventListener('mousemove', function(e){
  mx=e.clientX; my=e.clientY;
  if(dot){ dot.style.left=mx+'px'; dot.style.top=my+'px'; }
});
(function raf(){
  rx += (mx-rx)*0.1;
  ry += (my-ry)*0.1;
  if(ring){ ring.style.left=rx+'px'; ring.style.top=ry+'px'; }
  requestAnimationFrame(raf);
})();

var hoverEls = document.querySelectorAll('a,button,.pf-card,.nl-card,.svc-item,.award-row,.team-card,.menu-card');
hoverEls.forEach(function(el){
  el.addEventListener('mouseenter', function(){ document.body.classList.add('cur-hover'); });
  el.addEventListener('mouseleave', function(){ document.body.classList.remove('cur-hover'); });
});
document.addEventListener('mousedown', function(){ document.body.classList.add('cur-click'); });
document.addEventListener('mouseup',   function(){ document.body.classList.remove('cur-click'); });

/* ── Header scroll ── */
var hdr = document.getElementById('hdr');
window.addEventListener('scroll', function(){
  if(hdr) hdr.classList.toggle('on', window.scrollY > 40);
}, { passive:true });

/* ── Fullscreen Menu ── */
var menuToggle  = document.getElementById('menuToggle');
var menuOverlay = document.getElementById('menuOverlay');
var menuOpen    = false;

function toggleMenu(){
  menuOpen = !menuOpen;
  menuToggle.classList.toggle('open', menuOpen);
  menuOverlay.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
}
if(menuToggle) menuToggle.addEventListener('click', toggleMenu);
document.querySelectorAll('[data-mc]').forEach(function(a){
  a.addEventListener('click', function(){ if(menuOpen) toggleMenu(); });
});

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click', function(e){
    var t = document.querySelector(this.getAttribute('href'));
    if(t){ e.preventDefault(); window.scrollTo({top: t.offsetTop - 72, behavior:'smooth'}); }
  });
});

/* ── Scroll Reveal ── */
var io = new IntersectionObserver(function(entries){
  entries.forEach(function(en){
    if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
  });
}, { threshold:0.1, rootMargin:'0px 0px -50px 0px' });
document.querySelectorAll('.rev,.rev-l,.rev-r').forEach(function(el){ io.observe(el); });

/* ── Counter Animation ── */
function countUp(el){
  var target = parseInt(el.getAttribute('data-n'), 10);
  var suffix = el.getAttribute('data-s') || '';
  var dur = 1800, t0 = null;
  function step(ts){
    if(!t0) t0 = ts;
    var p = Math.min((ts-t0)/dur, 1);
    var e = 1 - Math.pow(1-p, 4);
    el.textContent = Math.floor(e*target).toLocaleString() + suffix;
    if(p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
var ioNum = new IntersectionObserver(function(entries){
  entries.forEach(function(en){
    if(en.isIntersecting){ countUp(en.target); ioNum.unobserve(en.target); }
  });
}, { threshold:0.5 });
document.querySelectorAll('.num-val[data-n]').forEach(function(el){ ioNum.observe(el); });

/* ── Service Accordion ── */
document.querySelectorAll('.svc-toggler').forEach(function(head){
  head.addEventListener('click', function(){
    var id = this.getAttribute('data-target');
    var body = document.getElementById(id);
    if(!body) return;
    var isOpen = body.classList.contains('open');
    // close all
    document.querySelectorAll('.svc-body.open').forEach(function(b){ b.classList.remove('open'); });
    document.querySelectorAll('.svc-arr i').forEach(function(i){ i.className = 'fas fa-plus'; });
    if(!isOpen){
      body.classList.add('open');
      var icon = this.querySelector('.svc-arr i');
      if(icon) icon.className = 'fas fa-minus';
    }
  });
});

/* ── Portfolio Filter ── */
var fBtns  = document.querySelectorAll('.pf-filter-btn');
var fCards = document.querySelectorAll('.pf-card');
fBtns.forEach(function(btn){
  btn.addEventListener('click', function(){
    var cat = this.getAttribute('data-filter');
    fBtns.forEach(function(b){ b.classList.remove('on'); });
    this.classList.add('on');
    fCards.forEach(function(c){
      var cc = c.getAttribute('data-filter');
      if(cat === 'all' || cc === cat){
        c.style.opacity = '1'; c.style.transform = '';
      } else {
        c.style.opacity = '0.18'; c.style.transform = 'scale(0.97)';
      }
      c.style.transition = 'opacity .4s ease, transform .4s ease';
    });
  });
});

/* ── Parallax Hero Video ── */
var heroVid = document.querySelector('.hero-vid');
window.addEventListener('scroll', function(){
  if(!heroVid) return;
  var sy = window.scrollY;
  if(sy < window.innerHeight){
    heroVid.style.transform = 'scale(1) translateY(' + (sy * 0.25) + 'px)';
  }
}, { passive:true });

/* ── Process circle highlight on scroll ── */
var ioProc = new IntersectionObserver(function(entries){
  entries.forEach(function(en){
    if(en.isIntersecting) en.target.classList.add('in');
  });
}, { threshold:0.6 });
document.querySelectorAll('.proc-step').forEach(function(s){ ioProc.observe(s); });

/* ── Menu card 3D tilt ── */
document.querySelectorAll('.menu-card').forEach(function(card){
  card.addEventListener('mousemove', function(e){
    var r = card.getBoundingClientRect();
    var x = (e.clientX - r.left)/r.width  - 0.5;
    var y = (e.clientY - r.top) /r.height - 0.5;
    card.style.transform = 'translateY(-8px) perspective(700px) rotateY('+(x*8)+'deg) rotateX('+(-y*8)+'deg)';
  });
  card.addEventListener('mouseleave', function(){
    card.style.transform = '';
    card.style.transition = 'transform .5s ease';
  });
  card.addEventListener('mouseenter', function(){
    card.style.transition = 'transform .1s ease, box-shadow .4s';
  });
});

/* ── Newsletter ── */
window.submitNL = function(){
  var n = document.getElementById('nlName');
  var e = document.getElementById('nlEmail');
  var ok = document.getElementById('nlOk');
  if(e && e.value && e.value.indexOf('@') > -1){
    if(ok) ok.style.display = 'block';
    if(n) n.value = '';
    if(e) e.value = '';
  } else {
    alert('有効なメールアドレスを入力してください。');
  }
};

/* ── Team card subtle lift with gold border glow ── */
document.querySelectorAll('.team-card').forEach(function(card){
  card.addEventListener('mouseenter', function(){
    card.style.boxShadow = '0 24px 64px rgba(0,0,0,0.1), 0 0 0 1px rgba(200,162,39,0.3)';
  });
  card.addEventListener('mouseleave', function(){
    card.style.boxShadow = '';
  });
});

console.log('%c i2m2 Co., Ltd. ', 'background:#C9A227;color:#000;font-weight:900;font-size:16px;padding:4px 10px;border-radius:4px;');
console.log('%c 株式会社イズムズ — Healthcare & Medical Support ', 'color:#C9A227;font-size:10px;letter-spacing:2px;');

})();
</script>

</body>
</html>`)
})

export default app
