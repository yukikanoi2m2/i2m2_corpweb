import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'

type Env = { Bindings: { DB: D1Database } }
const app = new Hono<Env>()

app.use('/static/*', serveStatic({ root: './public' }))

/* ============================================================
   HELPERS
   ============================================================ */
function slugify(s: string) {
  return s.trim().toLowerCase()
    .replace(/[^\w\u3000-\u9fff\u30a0-\u30ff\u3040-\u309f]+/g, '-')
    .replace(/^-+|-+$/g, '').slice(0, 80) || Date.now().toString()
}
function esc(s: string) {
  return (s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}
async function sha256hex(s: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('')
}
function randomToken() {
  const arr = new Uint8Array(32)
  crypto.getRandomValues(arr)
  return Array.from(arr).map(b=>b.toString(16).padStart(2,'0')).join('')
}
async function getSession(c: any) {
  const token = getCookie(c, 'adm_session')
  if (!token) return null
  const db: D1Database = c.env.DB
  const sess = await db.prepare(
    `SELECT s.user_id, u.username FROM admin_sessions s
     JOIN admin_users u ON s.user_id=u.id
     WHERE s.token=? AND s.expires_at > datetime('now')`
  ).bind(token).first<{user_id:number, username:string}>()
  return sess ?? null
}
function catLabel(cat: string) {
  const map: Record<string,string> = {trend:'トレンド',staffing:'人材',management:'経営',policy:'制度・政策',news:'お知らせ',event:'イベント'}
  return map[cat] ?? cat
}
function dateJP(iso: string) {
  if (!iso) return ''
  return iso.slice(0,10).replace(/-/g,'.')
}

/* ============================================================
   HTML SHELLS
   ============================================================ */
const HEAD = (title = 'i2m2', extra = '') => `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} — i2m2 株式会社イズムズ</title>
<meta name="description" content="株式会社イズムズ（i2m2）は医療・ヘルスケア分野の総合サポートカンパニー。人材紹介・病院経営支援・医療DX推進を提供しています。">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
<link rel="icon" href="/static/favicon.svg" type="image/svg+xml">
<link href="/static/style.css" rel="stylesheet">
${extra}
</head><body>`

/* ============================================================
   MAIN PAGE (/)
   ============================================================ */
app.get('/', async (c) => {
  // Fetch latest published articles for news section
  const db = c.env.DB
  let newsRows: any[] = []
  try {
    const r = await db.prepare(
      `SELECT id,slug,title,excerpt,category,cover_emoji,author,published_at
       FROM articles WHERE status='published'
       ORDER BY published_at DESC LIMIT 4`
    ).all()
    newsRows = r.results ?? []
  } catch(_) {}

  const newsCards = newsRows.length ? newsRows.map((a: any) => `
    <a class="nl-card rev" href="/news/${esc(a.slug)}">
      <div class="nl-img">${esc(a.cover_emoji)}</div>
      <div>
        <div class="nl-series">${catLabel(a.category).toUpperCase()} · ${dateJP(a.published_at)}</div>
        <div class="nl-title">${esc(a.title)}</div>
        <div class="nl-excerpt">${esc(a.excerpt)}</div>
        <div class="nl-tag-row">
          ${(JSON.parse(a.tags||'[]') as string[]).slice(0,3).map(t=>`<span class="nl-tag">${esc(t)}</span>`).join('')}
        </div>
      </div>
    </a>`).join('') : `<p style="color:var(--t3);font-size:14px;">記事を準備中です。</p>`

  return c.html(HEAD('ホーム', `
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  `) + `

<!-- ── CURSOR ── -->
<div id="cur-dot"></div>
<div id="cur-ring"></div>

<!-- ── LOADING ── -->
<div id="loading">
  <div class="ld-logo" id="ldLogo">i2m2</div>
  <div class="ld-tag">Healthcare &amp; Medical Support</div>
  <div class="ld-bar"><div class="ld-fill"></div></div>
</div>

<!-- ── HEADER ── -->
<header class="header" id="hdr">
  <a class="h-logo" href="/">i2m2</a>
  <nav class="h-nav">
    <a href="#takeout">テイクアウト</a>
    <a href="#services">サービス</a>
    <a href="#works">実績</a>
    <a href="#insights">インサイト</a>
    <a href="#team">チーム</a>
    <a href="/news">ニュース</a>
    <a href="#contact">お問い合わせ</a>
  </nav>
  <a class="h-cta" href="#contact"><i class="fas fa-arrow-right"></i> CONTACT</a>
  <button class="h-burger" id="menuToggle" aria-label="menu">
    <span></span><span></span><span></span>
  </button>
</header>

<!-- ── FULLSCREEN MENU ── -->
<div class="menu-overlay" id="menuOverlay">
  <div class="menu-inner">
    <nav class="menu-links">
      <a class="menu-link" href="#takeout"  data-mc><span class="m-idx">01</span>テイクアウト</a>
      <a class="menu-link" href="#services" data-mc><span class="m-idx">02</span>サービス</a>
      <a class="menu-link" href="#works"    data-mc><span class="m-idx">03</span>実績・事例</a>
      <a class="menu-link" href="#about"    data-mc><span class="m-idx">04</span>私たちについて</a>
      <a class="menu-link" href="#team"     data-mc><span class="m-idx">05</span>チーム</a>
      <a class="menu-link" href="/news"     data-mc><span class="m-idx">06</span>ニュース</a>
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
        <div class="ms-contact"><a href="#">東京都港区</a></div>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════
     § 1  HERO
══════════════════════════════════════════ -->
<section class="hero" id="top">
  <!-- Video / placeholder -->
  <div class="hero-vid-wrap">
    <video class="hero-vid" id="heroVid" autoplay muted loop playsinline preload="auto">
      <source src="/static/main_acer04.webm" type="video/webm">
    </video>
    <!-- CSS animated placeholder (shows when no video) -->
    <div class="hero-placeholder" id="heroPlaceholder">
      <div class="hp-grid">
        ${Array(20).fill('<div class="hp-cell"></div>').join('')}
      </div>
      <div class="hp-orbs">
        <div class="hp-orb hp-orb1"></div>
        <div class="hp-orb hp-orb2"></div>
        <div class="hp-orb hp-orb3"></div>
      </div>
    </div>
  </div>
  <div class="hero-overlay"></div>
  <div class="hero-topline"></div>

  <!-- Floating particles canvas -->
  <canvas id="heroParticles" style="position:absolute;inset:0;pointer-events:none;z-index:1;"></canvas>

  <div class="hero-body" id="heroBody">
    <div class="hero-kicker" id="heroKicker">
      <span class="hero-kicker-dot"></span>
      Healthcare &amp; Medical Innovation
    </div>

    <h1 class="hero-title" id="heroTitle">
      <span class="ht-word" data-word="Medical">Medical</span><br>
      <span class="ht-word gold-fill" data-word="Support">Support</span><br>
      <span class="ht-word outline" data-word="Excellence.">Excellence.</span>
    </h1>

    <p class="hero-sub" id="heroSub">
      医療・ヘルスケア分野の専門家と企業をつなぐ。<br>
      最高水準のサポートで、医療の未来を切り拓く。
    </p>

    <div class="hero-foot" id="heroFoot">
      <div style="display:flex;gap:14px;flex-wrap:wrap;">
        <a class="btn-primary mag-btn" href="#takeout">
          サービスを見る <i class="fas fa-arrow-right"></i>
        </a>
        <a class="btn-outline mag-btn" href="#contact">
          <i class="fas fa-paper-plane"></i> お問い合わせ
        </a>
      </div>
      <div class="hero-stats" id="heroStats">
        <div class="hs-item">
          <span class="hs-num" data-count="15" data-s="+">0</span>
          <span class="hs-lbl">Years Experience</span>
        </div>
        <div class="hs-item">
          <span class="hs-num" data-count="300" data-s="+">0</span>
          <span class="hs-lbl">Medical Partners</span>
        </div>
        <div class="hs-item">
          <span class="hs-num" data-count="98" data-s="%">0</span>
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

<!-- ── TICKER 1 ── -->
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

<!-- ══════════════════════════════════════════
     § 2  TAKEOUT
══════════════════════════════════════════ -->
<section class="sec takeout-sec" id="takeout">
  <div class="container">
    <div class="takeout-center">
      <div class="split-wrap" data-split="Takeout?">
        <div class="takeout-q split-text">Takeout?</div>
      </div>
      <p class="takeout-subtitle gsap-fade">
        どんなサービスをご注文しますか？<br>
        メニューから選んで、テイクアウトしてください！
      </p>
      <p class="takeout-hint gsap-fade">i2m2が提供する医療支援サービスをご覧ください</p>
    </div>

    <div class="takeout-menu">
      <div class="menu-card gsap-card" style="--ci:0">
        <div class="mc-badge">HOT</div>
        <div class="mc-no">MENU · 01</div>
        <div class="mc-icon">👨‍⚕️</div>
        <h3 class="mc-name">医療人材<br>紹介・派遣</h3>
        <p class="mc-desc">医師・看護師・薬剤師・コメディカルの専門紹介。高い定着率と迅速なマッチング。</p>
        <div class="mc-tags">
          <span class="mc-tag">医師</span><span class="mc-tag">看護師</span>
          <span class="mc-tag">薬剤師</span><span class="mc-tag">コメディカル</span>
        </div>
        <div class="mc-glow"></div>
      </div>

      <div class="menu-card gsap-card" style="--ci:1">
        <div class="mc-no">MENU · 02</div>
        <div class="mc-icon">🏨</div>
        <h3 class="mc-name">病院・クリニック<br>経営支援</h3>
        <p class="mc-desc">収益改善・患者満足度向上・診療体制最適化。医療経営の課題をトータルサポート。</p>
        <div class="mc-tags">
          <span class="mc-tag">経営改善</span><span class="mc-tag">収益最適化</span>
          <span class="mc-tag">DX推進</span>
        </div>
        <div class="mc-glow"></div>
      </div>

      <div class="menu-card gsap-card" style="--ci:2">
        <div class="mc-no">MENU · 03</div>
        <div class="mc-icon">💊</div>
        <h3 class="mc-name">製薬・MR<br>支援サービス</h3>
        <p class="mc-desc">製薬会社・医療機器メーカー向けMRサポート、学術活動支援、プロモーション支援。</p>
        <div class="mc-tags">
          <span class="mc-tag">MR支援</span><span class="mc-tag">学術活動</span>
          <span class="mc-tag">プロモーション</span>
        </div>
        <div class="mc-glow"></div>
      </div>

      <div class="menu-card gsap-card" style="--ci:3">
        <div class="mc-no">MENU · 04</div>
        <div class="mc-icon">📱</div>
        <h3 class="mc-name">医療DX・<br>デジタル化支援</h3>
        <p class="mc-desc">電子カルテ・オンライン診療・医療AI活用など、医療機関のデジタル変革を推進。</p>
        <div class="mc-tags">
          <span class="mc-tag">電子カルテ</span><span class="mc-tag">AI活用</span>
          <span class="mc-tag">オンライン診療</span>
        </div>
        <div class="mc-glow"></div>
      </div>
    </div>

    <div style="text-align:center;margin-top:48px;" class="gsap-fade">
      <a class="btn-primary mag-btn" href="#contact">
        プロジェクトを相談する <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  </div>
</section>

<!-- ── DARK TICKER ── -->
<div class="marquee-dark">
  <div class="marquee-dark-inner">
    ${Array(4).fill(`
    <span class="mdi-item">A small thing has made a big things. <span class="mdi-sep"></span></span>
    <span class="mdi-item">Healthcare Excellence. <span class="mdi-sep"></span></span>
    <span class="mdi-item">医療の未来を共に創る。 <span class="mdi-sep"></span></span>
    `).join('')}
  </div>
</div>

<!-- ══════════════════════════════════════════
     § 3  SERVICES
══════════════════════════════════════════ -->
<section class="sec svc-sec" id="services">
  <div class="container">
    <div class="svc-header">
      <div class="gsap-fade">
        <div class="sec-eye">
          <div class="sec-eye-bar"></div>
          <div class="sec-eye-txt">What We Service</div>
        </div>
        <h2 class="sec-title split-wrap" data-split="i2m2が提供する医療支援サービス">
          i2m2が提供する<br><span class="gold">医療支援</span>サービス
        </h2>
      </div>
      <div class="svc-header-right gsap-fade">
        <p>医療・ヘルスケア分野に特化した専門家チームが、あなたの課題に合わせた最適なソリューションを提供します。</p>
      </div>
    </div>

    <div class="svc-list">
      ${[
        {no:'01',icon:'👨‍⚕️',title:'医療人材紹介・派遣',sub:'Medical Staffing & Placement',id:'svc1',
         col1:{h:'人材紹介',items:['医師・専門医の紹介','看護師・助産師の紹介','薬剤師・管理栄養士の紹介','コメディカルスタッフ全般']},
         col2:{h:'採用支援',items:['採用戦略策定・求人設計','面接・選考プロセス支援','オンボーディング支援','定着率改善コンサルティング']}},
        {no:'02',icon:'🏨',title:'病院・クリニック経営支援',sub:'Hospital Management Consulting',id:'svc2',
         col1:{h:'経営改善',items:['収益構造の分析・改善','診療体制の最適化','コスト削減・効率化','患者満足度向上施策']},
         col2:{h:'DX推進',items:['電子カルテ導入支援','オンライン診療システム構築','業務自動化・RPA導入','データ分析・BI活用']}},
        {no:'03',icon:'💊',title:'製薬・MR支援サービス',sub:'Pharma & MR Support',id:'svc3',
         col1:{h:'MR活動支援',items:['MR研修・スキル向上','訪問・情報提供活動支援','学術資材の作成・管理','KPI管理・効果測定']},
         col2:{h:'プロモーション',items:['医療機関向けプロモーション','デジタルマーケティング支援','学術イベント・講演会企画','製品情報管理・コンプライアンス']}},
        {no:'04',icon:'🎓',title:'医療研修・教育プログラム',sub:'Medical Training & Education',id:'svc4',
         col1:{h:'スタッフ研修',items:['医療接遇・コミュニケーション研修','専門技術・スキルアップ研修','チームビルディング研修','管理職・リーダー育成']},
         col2:{h:'教育支援',items:['eラーニングシステム導入','研修プログラムカスタマイズ','資格取得支援','効果測定・フォローアップ']}},
        {no:'05',icon:'🌐',title:'在宅医療・介護支援',sub:'Home Care & Long-term Care',id:'svc5',
         col1:{h:'在宅医療',items:['訪問診療・往診体制構築','在宅医療チーム育成','地域医療連携体制づくり','ICT活用による情報共有']},
         col2:{h:'介護連携',items:['医療・介護の連携体制構築','介護スタッフ教育支援','地域包括ケアシステム構築','家族支援・カウンセリング']}}
      ].map(s=>`
      <div class="svc-item gsap-svc-item">
        <div class="svc-item-head svc-toggler" data-target="${s.id}">
          <span class="svc-num">${s.no}</span>
          <div class="svc-icon-wrap">${s.icon}</div>
          <div style="flex:1;">
            <div class="svc-title-main">${s.title}</div>
            <div class="svc-title-sub">${s.sub}</div>
          </div>
          <div class="svc-arr"><i class="fas fa-plus"></i></div>
        </div>
        <div class="svc-body" id="${s.id}">
          <div class="svc-body-col"><h5>${s.col1.h}</h5><ul>${s.col1.items.map(i=>`<li>${i}</li>`).join('')}</ul></div>
          <div class="svc-body-col"><h5>${s.col2.h}</h5><ul>${s.col2.items.map(i=>`<li>${i}</li>`).join('')}</ul></div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     § 4  PORTFOLIO
══════════════════════════════════════════ -->
<section class="sec sec-cream" id="works">
  <div class="container">
    <div class="pf-head-row gsap-fade">
      <div>
        <div class="sec-eye"><div class="sec-eye-bar"></div><div class="sec-eye-txt">Portfolio</div></div>
        <h2 class="sec-title">ご注文のメニュー<br><span class="gold">出来上がりました！</span></h2>
      </div>
      <a class="btn-outline mag-btn gsap-fade" href="/news">実績一覧 <i class="fas fa-arrow-right"></i></a>
    </div>

    <div class="pf-filters gsap-fade">
      <button class="pf-filter-btn on" data-filter="all">All</button>
      <button class="pf-filter-btn" data-filter="hospital">病院・クリニック</button>
      <button class="pf-filter-btn" data-filter="pharma">製薬・医療機器</button>
      <button class="pf-filter-btn" data-filter="dx">医療DX</button>
      <button class="pf-filter-btn" data-filter="care">在宅・介護</button>
    </div>

    <div class="pf-grid">
      <div class="pf-card span2 gsap-card" style="--ci:0" data-filter="hospital">
        <div class="pf-thumb" style="background:linear-gradient(135deg,#f0ebe0,#e8d8b0);">🏥</div>
        <div class="pf-hover-layer">
          <div class="pf-cat">病院・クリニック</div>
          <div class="pf-name">大学病院グループ 人材マネジメント改革</div>
          <div class="pf-tags">医師300名 派遣調整 / 離職率40%改善</div>
        </div>
        <div class="pf-view-btn">View</div>
      </div>

      <div class="pf-card gsap-card" style="--ci:1" data-filter="dx">
        <div class="pf-thumb" style="background:linear-gradient(135deg,#e8f0f8,#d0e4f0);">📱</div>
        <div class="pf-hover-layer">
          <div class="pf-cat">医療DX</div>
          <div class="pf-name">オンライン診療システム導入支援</div>
          <div class="pf-tags">50クリニック / 患者満足度向上</div>
        </div>
        <div class="pf-view-btn">View</div>
      </div>

      <div class="pf-card gsap-card" style="--ci:0" data-filter="pharma">
        <div class="pf-thumb" style="background:linear-gradient(135deg,#f5eef8,#e8d5f0);">💊</div>
        <div class="pf-hover-layer">
          <div class="pf-cat">製薬・医療機器</div>
          <div class="pf-name">大手製薬会社 MR活動最適化</div>
          <div class="pf-tags">MR200名支援 / 情報提供効率2倍</div>
        </div>
        <div class="pf-view-btn">View</div>
      </div>

      <div class="pf-card span2 gsap-card" style="--ci:1" data-filter="care">
        <div class="pf-thumb" style="background:linear-gradient(135deg,#eef5ec,#d8ecd4);">🏡</div>
        <div class="pf-hover-layer">
          <div class="pf-cat">在宅・介護</div>
          <div class="pf-name">地域包括ケアシステム構築コンサルティング</div>
          <div class="pf-tags">3市町村連携 / 在宅移行率向上</div>
        </div>
        <div class="pf-view-btn">View</div>
      </div>

      <div class="pf-card gsap-card" style="--ci:2" data-filter="hospital">
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

<!-- ══════════════════════════════════════════
     § 5  NUMBERS
══════════════════════════════════════════ -->
<section class="sec nums-sec" id="numbers">
  <div class="container">
    <div class="nums-header gsap-fade">
      <div class="sec-eye" style="justify-content:center;">
        <div class="sec-eye-bar"></div>
        <div class="sec-eye-txt">Numbers</div>
        <div class="sec-eye-bar"></div>
      </div>
      <h2 class="sec-title" style="color:#fff;text-align:center;margin-bottom:0;">
        数字で見る <span class="gold">i2m2</span>
      </h2>
    </div>
    <div class="nums-grid">
      <div class="num-cell gsap-num">
        <div class="num-val" data-n="15" data-s="+">0</div>
        <div class="num-lbl">Years of Experience<br>設立からの年数</div>
      </div>
      <div class="num-cell gsap-num">
        <div class="num-val" data-n="300" data-s="+">0</div>
        <div class="num-lbl">Medical Partners<br>医療パートナー数</div>
      </div>
      <div class="num-cell gsap-num">
        <div class="num-val" data-n="5000" data-s="+">0</div>
        <div class="num-lbl">Staff Placed<br>紹介・派遣実績</div>
      </div>
      <div class="num-cell gsap-num">
        <div class="num-val" data-n="98" data-s="%">0</div>
        <div class="num-lbl">Client Satisfaction<br>顧客満足度</div>
      </div>
    </div>
  </div>
</section>

<!-- ── DARK TICKER 2 ── -->
<div class="marquee-dark">
  <div class="marquee-dark-inner" style="animation-direction:reverse;">
    ${Array(4).fill(`
    <span class="mdi-item">We always think 'better good' <span class="mdi-sep"></span></span>
    <span class="mdi-item">医療の未来を共に。 <span class="mdi-sep"></span></span>
    <span class="mdi-item">Healthcare Innovation <span class="mdi-sep"></span></span>
    `).join('')}
  </div>
</div>

<!-- ══════════════════════════════════════════
     § 6  PROCESS
══════════════════════════════════════════ -->
<section class="sec proc-sec" id="process">
  <div class="container">
    <div style="text-align:center;" class="gsap-fade">
      <div class="sec-eye" style="justify-content:center;">
        <div class="sec-eye-bar"></div><div class="sec-eye-txt">Our Process</div><div class="sec-eye-bar"></div>
      </div>
      <h2 class="sec-title"><span class="gold">5つのステップ</span>で<br>理想の医療環境へ</h2>
      <p class="sec-desc" style="margin:0 auto;">初回相談から継続的なフォローまで、一貫した体制でお客様の課題を解決します。</p>
    </div>
    <div class="proc-steps">
      ${['初回ヒアリング','現状分析','ソリューション設計','実施・導入支援','継続的フォロー'].map((t,i)=>`
      <div class="proc-step gsap-proc" style="--pi:${i}">
        <div class="proc-circle">${String(i+1).padStart(2,'0')}</div>
        <h4>${t}</h4>
        <p>${['現状の課題・ニーズを丁寧にお伺いします','専門チームが詳細な分析・診断を実施','最適なプランをカスタマイズして提案','専任チームが現場での実装をサポート','定期レビューで効果を最大化します'][i]}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     § 7  ABOUT
══════════════════════════════════════════ -->
<section class="sec about-sec" id="about">
  <div class="container">
    <div class="about-inner">
      <div class="about-left gsap-fade-l">
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
          <a class="btn-primary mag-btn" href="#contact">お問い合わせ <i class="fas fa-arrow-right"></i></a>
          <a class="btn-outline mag-btn" href="https://i2m2.com" target="_blank" style="border-color:rgba(200,162,39,.4);color:var(--g3);">公式サイト ↗</a>
        </div>
      </div>
      <div class="about-right gsap-fade-r">
        ${[
          {icon:'🎯',t:'専門特化型アプローチ',d:'医療分野に完全特化。業界特有の規制・倫理基準を熟知したプロチームが対応します。20年以上の実績で培った知見を活かします。'},
          {icon:'🤝',t:'ワンストップソリューション',d:'人材紹介から業務支援、研修・教育まで、医療機関のあらゆるニーズに一括対応。複数業者に依頼する手間をゼロに。'},
          {icon:'📊',t:'データドリブン経営支援',d:'最新のヘルスケアデータ分析を活用し、経営改善・効率化をサポート。数字に基づいた確かな提案で成果を出します。'}
        ].map(f=>`
        <div class="about-feat">
          <div class="af-icon">${f.icon}</div>
          <div><div class="af-title">${f.t}</div><div class="af-desc">${f.d}</div></div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     § 8  INSIGHTS / NEWS (DB driven)
══════════════════════════════════════════ -->
<section class="sec nl-sec" id="insights">
  <div class="container">
    <div class="nl-layout">
      <div class="nl-left gsap-fade-l">
        <div class="sec-eye"><div class="sec-eye-bar"></div><div class="sec-eye-txt">Insights &amp; News</div></div>
        <h2 class="sec-title" style="font-size:clamp(26px,3vw,40px);">
          医療業界の<br><span class="gold">最新インサイト</span>
        </h2>
        <p class="nl-subtitle">
          医療・ヘルスケア業界の最新トレンド、規制動向、実践的ノウハウをお届け。
        </p>
        <a class="btn-primary mag-btn" href="/news" style="display:inline-flex;align-items:center;gap:8px;margin-bottom:20px;">
          記事一覧を見る <i class="fas fa-arrow-right"></i>
        </a>
        <div class="nl-form">
          <input type="text"  id="nlName"  placeholder="お名前">
          <input type="email" id="nlEmail" placeholder="メールアドレス">
          <button class="nl-submit" onclick="submitNL()">ニュースレター登録 →</button>
        </div>
        <p id="nlOk" style="margin-top:12px;font-size:13px;color:var(--g1);display:none;">✓ ご登録ありがとうございます！</p>
      </div>
      <div class="nl-cards gsap-fade-r">
        ${newsCards}
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     § 9  AWARDS
══════════════════════════════════════════ -->
<section class="sec award-sec" id="awards">
  <div class="container">
    <div class="gsap-fade">
      <div class="sec-eye"><div class="sec-eye-bar"></div><div class="sec-eye-txt">Recognition</div></div>
      <h2 class="sec-title">受賞・認定・<span class="gold">Award Winner</span></h2>
    </div>
    <div class="award-list">
      ${[
        {yr:'2024',name:'ヘルスケアイノベーション大賞 最優秀賞',org:'日本ヘルスケア協会',badge:'⭐ 最優秀'},
        {yr:'2024',name:'医療人材サービス優良企業認定',org:'厚生労働省関連機関',badge:'🏆 認定'},
        {yr:'2023',name:'日経ヘルスケア誌「注目の医療支援企業30社」選出',org:'日本経済新聞社',badge:'📰 掲載'},
        {yr:'2023',name:'医療経営コンサルティングアワード 優秀賞',org:'全日本病院協会',badge:'🥇 優秀賞'},
        {yr:'2022',name:'ホワイト企業認定（働きやすい職場環境企業）',org:'日本次世代企業普及機構',badge:'✅ 認定'},
      ].map(a=>`
      <div class="award-row gsap-award">
        <div class="aw-yr">${a.yr}</div>
        <div class="aw-name">${a.name}</div>
        <div class="aw-org">${a.org}</div>
        <div class="aw-pill">${a.badge}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     § 10  TEAM
══════════════════════════════════════════ -->
<section class="sec team-sec" id="team">
  <div class="container">
    <div style="text-align:center;" class="gsap-fade">
      <div class="sec-eye" style="justify-content:center;">
        <div class="sec-eye-bar"></div><div class="sec-eye-txt">Our Team</div><div class="sec-eye-bar"></div>
      </div>
      <h2 class="sec-title">少数精鋭の<span class="gold">プロチーム</span><br><span class="outline-d">One-Team.</span></h2>
      <p class="sec-desc" style="margin:0 auto;">医療業界に精通した専門家が集結。経験と情熱を持って、お客様の課題に向き合います。</p>
    </div>
    <div class="team-grid">
      ${[
        {e:'👨‍💼',role:'CEO & Founder',name:'鈴木 健一郎',bio:'元大手製薬会社取締役。医療業界30年の経験を持つ創業者。'},
        {e:'👩‍⚕️',role:'CMO · Medical Director',name:'田中 美咲',bio:'内科専門医・MBA取得。臨床×経営両面の視点を持つ医療ディレクター。'},
        {e:'👨‍💻',role:'CTO · Digital Health',name:'山田 龍司',bio:'医療IT分野15年の経験。電子カルテ・AI医療ツールの導入専門家。'},
        {e:'👩‍💼',role:'COO · Operations',name:'中村 さおり',bio:'大手医療グループ出身。300以上のプロジェクトを率いたオペレーションのプロ。'},
      ].map((m,i)=>`
      <div class="team-card gsap-card" style="--ci:${i}">
        <div class="tc-photo">${m.e}</div>
        <div class="tc-info">
          <div class="tc-role">${m.role}</div>
          <div class="tc-name">${m.name}</div>
          <div class="tc-bio">${m.bio}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     § 11  CTA
══════════════════════════════════════════ -->
<section class="cta-sec" id="contact">
  <div class="cta-ring"></div><div class="cta-ring"></div><div class="cta-ring"></div>
  <div class="cta-glow"></div>
  <div class="cta-body gsap-fade">
    <p class="cta-kicker">Let's Work Together</p>
    <h2 class="cta-title">共に医療の<br><span class="gold">未来を創ろう</span></h2>
    <p class="cta-sub">医療機関・製薬会社・医療機器メーカーの皆様、まずはお気軽にご相談ください。専門コンサルタントが丁寧にヒアリングし、最適な解決策をご提案します。</p>
    <div class="cta-info-row">
      <div class="ci"><span class="ci-l">Tel</span><span class="ci-v">03-XXXX-XXXX</span></div>
      <div class="ci-divider"></div>
      <div class="ci"><span class="ci-l">Email</span><span class="ci-v">info@i2m2.com</span></div>
      <div class="ci-divider"></div>
      <div class="ci"><span class="ci-l">Hours</span><span class="ci-v">平日 9:00〜18:00</span></div>
    </div>
    <div class="cta-btns">
      <a class="btn-primary mag-btn" href="mailto:info@i2m2.com"><i class="fas fa-envelope"></i> 無料相談を申し込む</a>
      <a class="btn-outline mag-btn" href="tel:03XXXXXXXX" style="border-color:rgba(200,162,39,.4);color:var(--g3);"><i class="fas fa-phone"></i> 電話で問い合わせる</a>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     FOOTER
══════════════════════════════════════════ -->
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <span class="f-brand-logo">i2m2</span>
        <div class="f-brand-sub">株式会社イズムズ</div>
        <p class="f-brand-desc">医療・ヘルスケア分野における総合的なサポートカンパニー。医療の未来を、共に創ります。</p>
        <div class="f-socials">
          <a class="f-soc" href="https://i2m2.com" target="_blank"><i class="fas fa-globe"></i></a>
          <a class="f-soc" href="#"><i class="fab fa-linkedin-in"></i></a>
          <a class="f-soc" href="#"><i class="fab fa-twitter"></i></a>
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
        </div>
      </div>
      <div>
        <div class="f-col-title">Company</div>
        <div class="f-col-links">
          <a class="f-col-link" href="#about">会社概要</a>
          <a class="f-col-link" href="#team">チーム紹介</a>
          <a class="f-col-link" href="#awards">受賞・実績</a>
          <a class="f-col-link" href="/news">ニュース</a>
          <a class="f-col-link" href="https://i2m2.com" target="_blank">コーポレートサイト ↗</a>
        </div>
      </div>
      <div>
        <div class="f-col-title">Contact</div>
        <div class="f-col-links">
          <a class="f-col-link" href="#contact">お問い合わせ</a>
          <a class="f-col-link" href="/news">ニュース一覧</a>
          <a class="f-col-link" href="mailto:info@i2m2.com">info@i2m2.com</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="f-copy">&copy; 2025 <a href="https://i2m2.com" target="_blank">株式会社イズムズ (i2m2 Co., Ltd.)</a>. All rights reserved.</div>
      <div class="f-legal">
        <a href="#">プライバシーポリシー</a>
        <a href="#">利用規約</a>
      </div>
    </div>
  </div>
</footer>

<script src="/static/main.js"></script>
</body></html>`)
})

/* ============================================================
   NEWS LIST  /news
   ============================================================ */
app.get('/news', async (c) => {
  const db = c.env.DB
  const cat = c.req.query('cat') ?? 'all'
  const page = parseInt(c.req.query('page') ?? '1', 10)
  const limit = 9
  const offset = (page - 1) * limit

  let rows: any[] = [], total = 0
  try {
    const where = cat !== 'all' ? `AND category=?` : ''
    const args = cat !== 'all' ? [cat, limit, offset] : [limit, offset]
    const r = await db.prepare(
      `SELECT id,slug,title,excerpt,category,cover_emoji,author,tags,published_at
       FROM articles WHERE status='published' ${where}
       ORDER BY published_at DESC LIMIT ? OFFSET ?`
    ).bind(...args).all()
    rows = r.results ?? []
    const ct = await db.prepare(
      `SELECT COUNT(*) as n FROM articles WHERE status='published' ${where}`
    ).bind(...(cat !== 'all' ? [cat] : [])).first<{n:number}>()
    total = ct?.n ?? 0
  } catch(_) {}

  const cats = [
    {v:'all',l:'すべて'},{v:'trend',l:'トレンド'},{v:'staffing',l:'人材'},
    {v:'management',l:'経営'},{v:'policy',l:'制度・政策'},
    {v:'news',l:'お知らせ'},{v:'event',l:'イベント'}
  ]
  const totalPages = Math.max(1, Math.ceil(total / limit))

  const cards = rows.map((a: any) => `
  <a class="news-card gsap-card" href="/news/${esc(a.slug)}" style="--ci:${rows.indexOf(a)%3}">
    <div class="nc-thumb">${esc(a.cover_emoji)}</div>
    <div class="nc-body">
      <div class="nc-meta">
        <span class="nc-cat">${catLabel(a.category)}</span>
        <span class="nc-date">${dateJP(a.published_at)}</span>
      </div>
      <div class="nc-title">${esc(a.title)}</div>
      <div class="nc-excerpt">${esc(a.excerpt)}</div>
      <div class="nc-tags">
        ${(JSON.parse(a.tags||'[]') as string[]).slice(0,3).map(t=>`<span class="nc-tag">${esc(t)}</span>`).join('')}
      </div>
    </div>
  </a>`).join('')

  const pager = totalPages > 1 ? `
  <div class="pager">
    ${Array.from({length:totalPages},(_,i)=>i+1).map(p=>`
    <a class="pg-btn${p===page?' on':''}" href="/news?cat=${encodeURIComponent(cat)}&page=${p}">${p}</a>`).join('')}
  </div>` : ''

  return c.html(HEAD('ニュース・インサイト') + `
<header class="header on" id="hdr">
  <a class="h-logo" href="/">i2m2</a>
  <nav class="h-nav">
    <a href="/#takeout">テイクアウト</a>
    <a href="/#services">サービス</a>
    <a href="/news" style="color:var(--g1);">ニュース</a>
    <a href="/#contact">お問い合わせ</a>
  </nav>
  <a class="h-cta" href="/#contact"><i class="fas fa-arrow-right"></i> CONTACT</a>
  <button class="h-burger" id="menuToggle" aria-label="menu"><span></span><span></span><span></span></button>
</header>

<div class="menu-overlay" id="menuOverlay">
  <div class="menu-inner">
    <nav class="menu-links">
      <a class="menu-link" href="/" data-mc><span class="m-idx">←</span>トップへ戻る</a>
      <a class="menu-link" href="/news" data-mc><span class="m-idx">01</span>ニュース一覧</a>
      <a class="menu-link" href="/#contact" data-mc><span class="m-idx">02</span>お問い合わせ</a>
    </nav>
  </div>
</div>

<div class="page-hero">
  <div class="ph-bg"></div>
  <div class="ph-body">
    <div class="sec-eye" style="justify-content:center;margin-bottom:16px;">
      <div class="sec-eye-bar"></div><div class="sec-eye-txt">Insights &amp; News</div><div class="sec-eye-bar"></div>
    </div>
    <h1 class="ph-title">医療業界の<span class="gold">最新インサイト</span></h1>
    <p class="ph-sub">トレンド・人材・経営・制度改正など、医療ヘルスケア業界の最新情報をお届けします。</p>
  </div>
</div>

<div class="news-wrap">
  <div class="container">
    <div class="news-cats">
      ${cats.map(ct=>`<a class="nc-filter${ct.v===cat?' on':''}" href="/news?cat=${ct.v}">${ct.l}</a>`).join('')}
    </div>
    <div class="news-grid">${cards || '<p style="color:var(--t3);text-align:center;padding:60px 0;">記事がありません</p>'}</div>
    ${pager}
  </div>
</div>

<footer class="footer" style="margin-top:0;">
  <div class="container">
    <div class="footer-bottom" style="padding:32px 0;">
      <div class="f-copy">&copy; 2025 <a href="/">株式会社イズムズ (i2m2)</a>. All rights reserved.</div>
      <div class="f-legal"><a href="/">トップページ</a><a href="/news">ニュース</a></div>
    </div>
  </div>
</footer>
<script src="/static/main.js"></script>
</body></html>`)
})

/* ============================================================
   NEWS DETAIL  /news/:slug
   ============================================================ */
app.get('/news/:slug', async (c) => {
  const db = c.env.DB
  const slug = c.req.param('slug')
  let article: any = null
  let related: any[] = []
  try {
    article = await db.prepare(
      `SELECT * FROM articles WHERE slug=? AND status='published'`
    ).bind(slug).first()
    if (article) {
      const r = await db.prepare(
        `SELECT slug,title,category,cover_emoji,published_at FROM articles
         WHERE status='published' AND id!=? AND category=? ORDER BY RANDOM() LIMIT 3`
      ).bind(article.id, article.category).all()
      related = r.results ?? []
    }
  } catch(_) {}

  if (!article) {
    return c.html(HEAD('記事が見つかりません') + `
<header class="header on"><a class="h-logo" href="/">i2m2</a></header>
<div style="min-height:60vh;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:20px;">
  <h1 style="font-size:48px;font-weight:900;color:var(--t1);">404</h1>
  <p style="color:var(--t3);">記事が見つかりません</p>
  <a class="btn-primary" href="/news">記事一覧へ</a>
</div></body></html>`, 404)
  }

  const tags: string[] = JSON.parse(article.tags || '[]')

  return c.html(HEAD(article.title) + `
<header class="header on" id="hdr">
  <a class="h-logo" href="/">i2m2</a>
  <nav class="h-nav">
    <a href="/">トップ</a>
    <a href="/news" style="color:var(--g1);">ニュース</a>
    <a href="/#contact">お問い合わせ</a>
  </nav>
  <a class="h-cta" href="/#contact"><i class="fas fa-arrow-right"></i> CONTACT</a>
  <button class="h-burger" id="menuToggle" aria-label="menu"><span></span><span></span><span></span></button>
</header>

<div class="menu-overlay" id="menuOverlay">
  <div class="menu-inner">
    <nav class="menu-links">
      <a class="menu-link" href="/" data-mc><span class="m-idx">←</span>トップへ</a>
      <a class="menu-link" href="/news" data-mc><span class="m-idx">01</span>ニュース一覧</a>
    </nav>
  </div>
</div>

<article class="article-wrap">
  <div class="art-hero">
    <div class="art-hero-emoji">${esc(article.cover_emoji)}</div>
    <div class="art-hero-body">
      <div class="art-cat-row">
        <span class="nc-cat">${catLabel(article.category)}</span>
        <span style="font-size:12px;color:var(--t3);">${dateJP(article.published_at)}</span>
      </div>
      <h1 class="art-title">${esc(article.title)}</h1>
      <p class="art-excerpt">${esc(article.excerpt)}</p>
      <div class="art-meta">
        <span class="art-author"><i class="fas fa-user"></i> ${esc(article.author)}</span>
        ${tags.map(t=>`<span class="nc-tag">${esc(t)}</span>`).join('')}
      </div>
    </div>
  </div>

  <div class="container">
    <div class="art-layout">
      <div class="art-body">
        ${article.body}
      </div>
      <aside class="art-aside">
        <div class="aside-box">
          <div class="aside-title">i2m2 について</div>
          <p style="font-size:13px;color:var(--t3);line-height:1.8;margin-bottom:16px;">医療・ヘルスケア分野の総合サポートカンパニー。人材紹介・病院経営支援・医療DX推進を提供しています。</p>
          <a class="btn-primary" href="/#contact" style="width:100%;justify-content:center;">無料相談 →</a>
        </div>
        ${related.length ? `
        <div class="aside-box" style="margin-top:20px;">
          <div class="aside-title">関連記事</div>
          ${related.map((r:any)=>`
          <a class="rel-card" href="/news/${esc(r.slug)}">
            <div class="rel-emoji">${esc(r.cover_emoji)}</div>
            <div>
              <div class="rel-cat">${catLabel(r.category)}</div>
              <div class="rel-title">${esc(r.title)}</div>
            </div>
          </a>`).join('')}
        </div>` : ''}
      </aside>
    </div>

    <div class="art-back">
      <a class="btn-outline" href="/news"><i class="fas fa-arrow-left"></i> 記事一覧へ戻る</a>
    </div>
  </div>
</article>

<footer class="footer">
  <div class="container">
    <div class="footer-bottom" style="padding:32px 0;">
      <div class="f-copy">&copy; 2025 <a href="/">株式会社イズムズ (i2m2)</a>. All rights reserved.</div>
      <div class="f-legal"><a href="/">トップページ</a><a href="/news">ニュース</a></div>
    </div>
  </div>
</footer>
<script src="/static/main.js"></script>
</body></html>`)
})

/* ============================================================
   ADMIN — LOGIN
   ============================================================ */
app.get('/admin/login', async (c) => {
  const sess = await getSession(c)
  if (sess) return c.redirect('/admin')
  const err = c.req.query('err') ?? ''
  return c.html(HEAD('管理画面ログイン') + `
<div class="admin-login-wrap">
  <div class="admin-login-box">
    <div class="adl-logo">i2m2</div>
    <div class="adl-title">管理画面</div>
    ${err ? `<div class="adl-error">${err==='1'?'ユーザー名またはパスワードが違います。':'エラーが発生しました。'}</div>` : ''}
    <form method="post" action="/admin/login">
      <div class="adl-field"><label>ユーザー名</label><input type="text" name="username" required autofocus></div>
      <div class="adl-field"><label>パスワード</label><input type="password" name="password" required></div>
      <button type="submit" class="adl-btn">ログイン</button>
    </form>
  </div>
</div>
</body></html>`)
})

app.post('/admin/login', async (c) => {
  const db = c.env.DB
  const body = await c.req.parseBody()
  const username = (body['username'] as string)?.trim() ?? ''
  const password  = (body['password'] as string) ?? ''
  const hash = await sha256hex(password)
  try {
    const user = await db.prepare(
      `SELECT id FROM admin_users WHERE username=? AND password=?`
    ).bind(username, hash).first<{id:number}>()
    if (!user) return c.redirect('/admin/login?err=1')
    const token = randomToken()
    const expires = new Date(Date.now() + 86400_000 * 7).toISOString().replace('T',' ').slice(0,19)
    await db.prepare(
      `INSERT INTO admin_sessions (token,user_id,expires_at) VALUES (?,?,?)`
    ).bind(token, user.id, expires).run()
    setCookie(c, 'adm_session', token, { path:'/', httpOnly:true, maxAge:604800, sameSite:'Lax' })
    return c.redirect('/admin')
  } catch(e) { return c.redirect('/admin/login?err=2') }
})

app.get('/admin/logout', async (c) => {
  const token = getCookie(c, 'adm_session')
  if (token) {
    try { await c.env.DB.prepare(`DELETE FROM admin_sessions WHERE token=?`).bind(token).run() } catch(_) {}
  }
  deleteCookie(c, 'adm_session', { path:'/' })
  return c.redirect('/admin/login')
})

/* ── ADMIN AUTH MIDDLEWARE ── */
async function requireAdmin(c: any, next: any) {
  const sess = await getSession(c)
  if (!sess) return c.redirect('/admin/login')
  c.set('adminUser', sess)
  await next()
}

/* ── ADMIN DASHBOARD ── */
app.get('/admin', requireAdmin, async (c) => {
  const db = c.env.DB
  const user = c.get('adminUser')
  let stats = {total:0, published:0, draft:0}
  let recent: any[] = []
  try {
    const r = await db.prepare(`SELECT status, COUNT(*) as n FROM articles GROUP BY status`).all()
    ;(r.results as any[]).forEach((row:any) => {
      stats.total += row.n
      if (row.status === 'published') stats.published = row.n
      if (row.status === 'draft')     stats.draft = row.n
    })
    const rr = await db.prepare(`SELECT id,slug,title,status,category,published_at,updated_at FROM articles ORDER BY updated_at DESC LIMIT 10`).all()
    recent = rr.results ?? []
  } catch(_) {}

  return c.html(HEAD('Admin Dashboard') + adminNav(user.username) + `
<div class="adm-content">
  <div class="adm-page-title">ダッシュボード</div>
  <div class="adm-stats">
    <div class="adm-stat"><div class="as-n">${stats.total}</div><div class="as-l">記事総数</div></div>
    <div class="adm-stat"><div class="as-n" style="color:#16a34a;">${stats.published}</div><div class="as-l">公開中</div></div>
    <div class="adm-stat"><div class="as-n" style="color:#ca8a04;">${stats.draft}</div><div class="as-l">下書き</div></div>
  </div>

  <div class="adm-section">
    <div class="adm-section-head">
      <span>最近の記事</span>
      <a class="adm-btn-sm" href="/admin/articles/new">+ 新規作成</a>
    </div>
    <table class="adm-table">
      <thead><tr><th>タイトル</th><th>カテゴリ</th><th>ステータス</th><th>公開日</th><th>操作</th></tr></thead>
      <tbody>
        ${recent.map((a:any)=>`
        <tr>
          <td><a href="/admin/articles/${a.id}/edit" class="adm-link">${esc(a.title)}</a></td>
          <td>${catLabel(a.category)}</td>
          <td><span class="adm-status ${a.status}">${a.status==='published'?'公開中':'下書き'}</span></td>
          <td>${dateJP(a.published_at)}</td>
          <td class="adm-actions">
            ${a.status==='draft'?`<a href="/admin/articles/${a.id}/publish" class="adm-act-btn pub">公開</a>`:`<a href="/admin/articles/${a.id}/unpublish" class="adm-act-btn drft">下書きに戻す</a>`}
            <a href="/news/${esc(a.slug)}" target="_blank" class="adm-act-btn view">表示</a>
            <a href="/admin/articles/${a.id}/edit" class="adm-act-btn edit">編集</a>
            <a href="/admin/articles/${a.id}/delete" class="adm-act-btn del" onclick="return confirm('削除しますか？')">削除</a>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>
</body></html>`)
})

/* ── ADMIN ARTICLES LIST ── */
app.get('/admin/articles', requireAdmin, async (c) => {
  const db = c.env.DB
  const user = c.get('adminUser')
  const page = parseInt(c.req.query('page')?? '1', 10)
  const cat = c.req.query('cat') ?? 'all'
  const status = c.req.query('status') ?? 'all'
  const limit = 20, offset = (page-1)*limit

  let rows: any[] = []
  try {
    let where = '1=1'
    const args: any[] = []
    if (cat !== 'all')    { where += ' AND category=?'; args.push(cat) }
    if (status !== 'all') { where += ' AND status=?';   args.push(status) }
    args.push(limit, offset)
    const r = await db.prepare(
      `SELECT id,slug,title,status,category,published_at,updated_at FROM articles WHERE ${where} ORDER BY updated_at DESC LIMIT ? OFFSET ?`
    ).bind(...args).all()
    rows = r.results ?? []
  } catch(_) {}

  return c.html(HEAD('記事一覧') + adminNav(user.username) + `
<div class="adm-content">
  <div class="adm-page-title">記事一覧
    <a class="adm-btn-primary" href="/admin/articles/new">+ 新規作成</a>
  </div>

  <div class="adm-filters">
    <a class="adm-filter-btn${status==='all'?' on':''}" href="/admin/articles?status=all&cat=${cat}">すべて</a>
    <a class="adm-filter-btn${status==='published'?' on':''}" href="/admin/articles?status=published&cat=${cat}">公開中</a>
    <a class="adm-filter-btn${status==='draft'?' on':''}" href="/admin/articles?status=draft&cat=${cat}">下書き</a>
  </div>

  <table class="adm-table">
    <thead><tr><th>タイトル</th><th>カテゴリ</th><th>ステータス</th><th>更新日</th><th>操作</th></tr></thead>
    <tbody>
      ${rows.length ? rows.map((a:any)=>`
      <tr>
        <td><a href="/admin/articles/${a.id}/edit" class="adm-link">${esc(a.title)}</a></td>
        <td>${catLabel(a.category)}</td>
        <td><span class="adm-status ${a.status}">${a.status==='published'?'公開中':'下書き'}</span></td>
        <td>${dateJP(a.updated_at)}</td>
        <td class="adm-actions">
          ${a.status==='draft'?`<a href="/admin/articles/${a.id}/publish" class="adm-act-btn pub">公開</a>`:`<a href="/admin/articles/${a.id}/unpublish" class="adm-act-btn drft">下書き</a>`}
          <a href="/news/${esc(a.slug)}" target="_blank" class="adm-act-btn view">表示</a>
          <a href="/admin/articles/${a.id}/edit" class="adm-act-btn edit">編集</a>
          <a href="/admin/articles/${a.id}/delete" class="adm-act-btn del" onclick="return confirm('削除しますか？')">削除</a>
        </td>
      </tr>`).join('') : '<tr><td colspan="5" style="text-align:center;padding:40px;color:#888;">記事がありません</td></tr>'}
    </tbody>
  </table>
</div>
</body></html>`)
})

/* ── ARTICLE NEW FORM ── */
app.get('/admin/articles/new', requireAdmin, (c) => {
  const user = c.get('adminUser')
  return c.html(HEAD('新規記事作成') + adminNav(user.username) + articleForm(null))
})

/* ── ARTICLE EDIT FORM ── */
app.get('/admin/articles/:id/edit', requireAdmin, async (c) => {
  const user = c.get('adminUser')
  const id = parseInt(c.req.param('id'), 10)
  const db = c.env.DB
  const article = await db.prepare(`SELECT * FROM articles WHERE id=?`).bind(id).first()
  if (!article) return c.redirect('/admin/articles')
  return c.html(HEAD('記事編集') + adminNav(user.username) + articleForm(article))
})

/* ── ARTICLE CREATE ── */
app.post('/admin/articles', requireAdmin, async (c) => {
  const db = c.env.DB
  const body = await c.req.parseBody()
  const title  = (body['title'] as string)?.trim() ?? ''
  const slug   = (body['slug'] as string)?.trim() || slugify(title)
  const excerpt = (body['excerpt'] as string)?.trim() ?? ''
  const bdy    = (body['body'] as string) ?? ''
  const category = (body['category'] as string) ?? 'news'
  const tags   = JSON.stringify(((body['tags'] as string)?.split(',').map((t:string)=>t.trim()).filter(Boolean)) ?? [])
  const status = (body['status'] as string) ?? 'draft'
  const emoji  = (body['cover_emoji'] as string)?.trim() || '📋'
  const author = (body['author'] as string)?.trim() || 'i2m2 編集部'
  const pubAt  = status === 'published' ? new Date().toISOString().replace('T',' ').slice(0,19) : null
  try {
    await db.prepare(
      `INSERT INTO articles (slug,title,excerpt,body,category,tags,status,cover_emoji,author,published_at)
       VALUES (?,?,?,?,?,?,?,?,?,?)`
    ).bind(slug,title,excerpt,bdy,category,tags,status,emoji,author,pubAt).run()
  } catch(e) { console.error(e) }
  return c.redirect('/admin/articles')
})

/* ── ARTICLE UPDATE ── */
app.post('/admin/articles/:id', requireAdmin, async (c) => {
  const db = c.env.DB
  const id = parseInt(c.req.param('id'), 10)
  const body = await c.req.parseBody()
  const title   = (body['title'] as string)?.trim() ?? ''
  const slug    = (body['slug'] as string)?.trim() || slugify(title)
  const excerpt = (body['excerpt'] as string)?.trim() ?? ''
  const bdy     = (body['body'] as string) ?? ''
  const category = (body['category'] as string) ?? 'news'
  const tags    = JSON.stringify(((body['tags'] as string)?.split(',').map((t:string)=>t.trim()).filter(Boolean)) ?? [])
  const status  = (body['status'] as string) ?? 'draft'
  const emoji   = (body['cover_emoji'] as string)?.trim() || '📋'
  const author  = (body['author'] as string)?.trim() || 'i2m2 編集部'
  const now     = new Date().toISOString().replace('T',' ').slice(0,19)
  const cur = await db.prepare(`SELECT published_at FROM articles WHERE id=?`).bind(id).first<{published_at:string|null}>()
  const pubAt = status === 'published' ? (cur?.published_at ?? now) : null
  try {
    await db.prepare(
      `UPDATE articles SET slug=?,title=?,excerpt=?,body=?,category=?,tags=?,status=?,cover_emoji=?,author=?,published_at=?,updated_at=datetime('now') WHERE id=?`
    ).bind(slug,title,excerpt,bdy,category,tags,status,emoji,author,pubAt,id).run()
  } catch(e) { console.error(e) }
  return c.redirect('/admin/articles')
})

/* ── PUBLISH / UNPUBLISH ── */
app.get('/admin/articles/:id/publish', requireAdmin, async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const now = new Date().toISOString().replace('T',' ').slice(0,19)
  try { await c.env.DB.prepare(`UPDATE articles SET status='published',published_at=?,updated_at=datetime('now') WHERE id=?`).bind(now,id).run() } catch(_) {}
  return c.redirect('/admin/articles')
})
app.get('/admin/articles/:id/unpublish', requireAdmin, async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  try { await c.env.DB.prepare(`UPDATE articles SET status='draft',updated_at=datetime('now') WHERE id=?`).bind(id).run() } catch(_) {}
  return c.redirect('/admin/articles')
})

/* ── DELETE ── */
app.get('/admin/articles/:id/delete', requireAdmin, async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  try { await c.env.DB.prepare(`DELETE FROM articles WHERE id=?`).bind(id).run() } catch(_) {}
  return c.redirect('/admin/articles')
})

/* ── API: articles (JSON) ── */
app.get('/api/articles', async (c) => {
  const db = c.env.DB
  try {
    const r = await db.prepare(
      `SELECT id,slug,title,excerpt,category,cover_emoji,author,tags,published_at
       FROM articles WHERE status='published' ORDER BY published_at DESC LIMIT 20`
    ).all()
    return c.json({ ok:true, articles: r.results })
  } catch(e) { return c.json({ ok:false, error: String(e) }, 500) }
})

/* ── HELPERS: admin nav & article form ── */
function adminNav(username: string) {
  return `
<style>
body{background:#f5f5f3;font-family:'Noto Sans JP',sans-serif;}
.adm-nav{position:fixed;top:0;left:0;width:220px;height:100vh;background:#1a1a18;padding:0;z-index:100;display:flex;flex-direction:column;}
.adm-nav-logo{padding:24px 24px 20px;font-family:'DM Sans',sans-serif;font-size:22px;font-weight:900;background:linear-gradient(135deg,#8B6914,#C9A227,#F0D060,#C9A227);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;border-bottom:1px solid rgba(255,255,255,.06);}
.adm-nav-links{padding:16px 0;flex:1;}
.adm-nav-link{display:flex;align-items:center;gap:10px;padding:11px 24px;font-size:13px;color:rgba(255,255,255,.4);transition:all .2s;text-decoration:none;}
.adm-nav-link:hover,.adm-nav-link.on{color:#fff;background:rgba(255,255,255,.06);}
.adm-nav-link i{width:16px;text-align:center;}
.adm-nav-footer{padding:16px 24px;border-top:1px solid rgba(255,255,255,.06);font-size:12px;color:rgba(255,255,255,.25);}
.adm-nav-footer a{color:#C9A227;text-decoration:none;}
.adm-content{margin-left:220px;padding:40px 48px;min-height:100vh;}
.adm-page-title{font-size:24px;font-weight:900;color:#1a1a18;margin-bottom:32px;display:flex;align-items:center;justify-content:space-between;gap:16px;}
.adm-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:32px;}
.adm-stat{background:#fff;border-radius:16px;padding:28px 24px;border:1px solid #e8e8e0;}
.as-n{font-size:42px;font-weight:900;font-family:'DM Sans',sans-serif;color:#C9A227;line-height:1;margin-bottom:8px;}
.as-l{font-size:13px;color:#888;}
.adm-section{background:#fff;border-radius:16px;border:1px solid #e8e8e0;overflow:hidden;}
.adm-section-head{padding:18px 24px;border-bottom:1px solid #f0f0e8;display:flex;align-items:center;justify-content:space-between;font-weight:700;font-size:14px;}
.adm-table{width:100%;border-collapse:collapse;font-size:13px;}
.adm-table th{padding:12px 16px;background:#fafaf8;text-align:left;font-size:11px;color:#888;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid #f0f0e8;}
.adm-table td{padding:13px 16px;border-bottom:1px solid #f8f8f4;vertical-align:middle;}
.adm-table tr:last-child td{border-bottom:none;}
.adm-link{color:#C9A227;font-weight:700;text-decoration:none;}
.adm-status.published{background:#dcfce7;color:#16a34a;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;}
.adm-status.draft{background:#fef3c7;color:#ca8a04;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;}
.adm-actions{display:flex;gap:6px;flex-wrap:wrap;}
.adm-act-btn{font-size:11px;padding:4px 10px;border-radius:6px;font-weight:700;text-decoration:none;border:1px solid;transition:all .15s;}
.adm-act-btn.pub{background:#dcfce7;color:#16a34a;border-color:#bbf7d0;}
.adm-act-btn.drft{background:#fef3c7;color:#ca8a04;border-color:#fde68a;}
.adm-act-btn.view{background:#eff6ff;color:#2563eb;border-color:#bfdbfe;}
.adm-act-btn.edit{background:#f3f4f6;color:#374151;border-color:#d1d5db;}
.adm-act-btn.del{background:#fee2e2;color:#dc2626;border-color:#fecaca;}
.adm-act-btn:hover{opacity:.8;transform:translateY(-1px);}
.adm-btn-sm{font-size:12px;padding:7px 14px;border-radius:8px;background:#C9A227;color:#1a1a18;font-weight:800;text-decoration:none;}
.adm-btn-primary{font-size:13px;padding:9px 18px;border-radius:8px;background:#C9A227;color:#1a1a18;font-weight:800;text-decoration:none;}
.adm-filters{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;}
.adm-filter-btn{padding:6px 16px;border-radius:20px;border:1px solid #e8e8e0;font-size:12px;font-weight:700;color:#888;text-decoration:none;transition:all .2s;}
.adm-filter-btn.on,.adm-filter-btn:hover{background:#C9A227;color:#1a1a18;border-color:#C9A227;}
/* Form */
.adm-form{background:#fff;border-radius:16px;border:1px solid #e8e8e0;padding:32px;}
.adm-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.adm-field{display:flex;flex-direction:column;gap:7px;margin-bottom:20px;}
.adm-field label{font-size:12px;font-weight:700;color:#555;letter-spacing:.5px;text-transform:uppercase;}
.adm-field input,.adm-field select,.adm-field textarea{padding:10px 14px;border:1.5px solid #e8e8e0;border-radius:10px;font-size:14px;font-family:'Noto Sans JP',sans-serif;outline:none;transition:border-color .2s;}
.adm-field input:focus,.adm-field select:focus,.adm-field textarea:focus{border-color:#C9A227;background:#fffef5;}
.adm-field textarea{resize:vertical;min-height:320px;font-family:monospace;}
.adm-form-actions{display:flex;gap:12px;margin-top:24px;}
.adm-submit{padding:12px 28px;background:#C9A227;color:#1a1a18;border:none;border-radius:10px;font-size:14px;font-weight:900;cursor:pointer;transition:all .2s;font-family:'Noto Sans JP',sans-serif;}
.adm-submit:hover{background:#b8860b;transform:translateY(-1px);}
.adm-cancel{padding:12px 20px;border:1.5px solid #e8e8e0;border-radius:10px;font-size:14px;color:#888;text-decoration:none;font-weight:600;}
/* Login */
.admin-login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f5f5f3;}
.admin-login-box{background:#fff;border-radius:20px;padding:48px;border:1px solid #e8e8e0;width:100%;max-width:400px;box-shadow:0 8px 40px rgba(0,0,0,.08);}
.adl-logo{font-family:'DM Sans',sans-serif;font-size:40px;font-weight:900;background:linear-gradient(135deg,#8B6914,#C9A227,#F0D060);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:4px;letter-spacing:-2px;}
.adl-title{font-size:15px;color:#888;margin-bottom:32px;font-weight:600;}
.adl-error{background:#fee2e2;color:#dc2626;padding:10px 14px;border-radius:8px;font-size:13px;margin-bottom:18px;}
.adl-field{margin-bottom:16px;}
.adl-field label{display:block;font-size:12px;font-weight:700;color:#555;margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px;}
.adl-field input{width:100%;padding:11px 14px;border:1.5px solid #e8e8e0;border-radius:10px;font-size:14px;outline:none;font-family:'Noto Sans JP',sans-serif;}
.adl-field input:focus{border-color:#C9A227;}
.adl-btn{width:100%;padding:13px;background:#C9A227;color:#1a1a18;border:none;border-radius:10px;font-size:14px;font-weight:900;cursor:pointer;margin-top:8px;font-family:'Noto Sans JP',sans-serif;}
.adl-btn:hover{background:#b8860b;}
</style>
<div class="adm-nav">
  <div class="adm-nav-logo">i2m2</div>
  <div class="adm-nav-links">
    <a class="adm-nav-link" href="/admin"><i class="fas fa-home"></i> ダッシュボード</a>
    <a class="adm-nav-link" href="/admin/articles"><i class="fas fa-newspaper"></i> 記事管理</a>
    <a class="adm-nav-link" href="/admin/articles/new"><i class="fas fa-plus"></i> 新規作成</a>
    <a class="adm-nav-link" href="/news" target="_blank"><i class="fas fa-external-link-alt"></i> サイトを確認</a>
    <a class="adm-nav-link" href="/" target="_blank"><i class="fas fa-globe"></i> トップページ</a>
  </div>
  <div class="adm-nav-footer">
    <i class="fas fa-user"></i> ${esc(username)}<br>
    <a href="/admin/logout">ログアウト</a>
  </div>
</div>`
}

function articleForm(a: any) {
  const isEdit = !!a
  const tags = a ? (JSON.parse(a.tags||'[]') as string[]).join(', ') : ''
  const cats = ['trend','staffing','management','policy','news','event']
  const catLabels: Record<string,string> = {trend:'トレンド',staffing:'人材',management:'経営',policy:'制度・政策',news:'お知らせ',event:'イベント'}
  return `
<div class="adm-content">
  <div class="adm-page-title">${isEdit ? '記事を編集' : '新規記事作成'}</div>
  <form method="post" action="${isEdit ? `/admin/articles/${a.id}` : '/admin/articles'}">
    <div class="adm-form">
      <div class="adm-form-grid">
        <div class="adm-field" style="grid-column:1/-1;">
          <label>タイトル *</label>
          <input type="text" name="title" value="${esc(a?.title??'')}" required placeholder="記事タイトルを入力">
        </div>
        <div class="adm-field">
          <label>スラッグ（URL）</label>
          <input type="text" name="slug" value="${esc(a?.slug??'')}" placeholder="自動生成（空欄可）">
        </div>
        <div class="adm-field">
          <label>著者</label>
          <input type="text" name="author" value="${esc(a?.author??'i2m2 編集部')}">
        </div>
        <div class="adm-field">
          <label>カテゴリ</label>
          <select name="category">
            ${cats.map(v=>`<option value="${v}"${a?.category===v?' selected':''}>${catLabels[v]}</option>`).join('')}
          </select>
        </div>
        <div class="adm-field">
          <label>ステータス</label>
          <select name="status">
            <option value="draft"${!a||a.status==='draft'?' selected':''}>下書き</option>
            <option value="published"${a?.status==='published'?' selected':''}>公開</option>
          </select>
        </div>
        <div class="adm-field">
          <label>カバー絵文字</label>
          <input type="text" name="cover_emoji" value="${esc(a?.cover_emoji??'📋')}" placeholder="例: 🏥 📋 💊">
        </div>
        <div class="adm-field">
          <label>タグ（カンマ区切り）</label>
          <input type="text" name="tags" value="${esc(tags)}" placeholder="例: AI医療, 電子カルテ, DX">
        </div>
        <div class="adm-field" style="grid-column:1/-1;">
          <label>概要文（excerpt）</label>
          <input type="text" name="excerpt" value="${esc(a?.excerpt??'')}" placeholder="記事の概要（一覧ページに表示）">
        </div>
        <div class="adm-field" style="grid-column:1/-1;">
          <label>本文（HTML可）</label>
          <textarea name="body">${esc(a?.body??'')}</textarea>
        </div>
      </div>
      <div class="adm-form-actions">
        <button type="submit" class="adm-submit">${isEdit ? '更新する' : '保存する'}</button>
        <a class="adm-cancel" href="/admin/articles">キャンセル</a>
        ${isEdit && a.status==='published' ? `<a class="adm-cancel" href="/news/${esc(a.slug)}" target="_blank" style="color:#2563eb;">表示確認 ↗</a>` : ''}
      </div>
    </div>
  </form>
</div>
</body></html>`
}

export default app
