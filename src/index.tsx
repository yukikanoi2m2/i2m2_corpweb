import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'

type Env = { Bindings: { DB: D1Database } }
const app = new Hono<Env>()
app.use('/static/*', serveStatic({ root: './public' }))

/* ── helpers ── */
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
  const arr = new Uint8Array(32); crypto.getRandomValues(arr)
  return Array.from(arr).map(b=>b.toString(16).padStart(2,'0')).join('')
}
async function getSession(c: any) {
  const token = getCookie(c, 'adm_session'); if (!token) return null
  const db: D1Database = c.env.DB
  const sess = await db.prepare(
    `SELECT s.user_id,u.username FROM admin_sessions s JOIN admin_users u ON s.user_id=u.id WHERE s.token=? AND s.expires_at>datetime('now')`
  ).bind(token).first<{user_id:number,username:string}>()
  return sess ?? null
}
function catLabel(cat: string) {
  const m: Record<string,string> = {trend:'トレンド',staffing:'人材',management:'経営',policy:'制度・政策',news:'お知らせ',event:'イベント'}
  return m[cat] ?? cat
}
function dateJP(iso: string) { return iso ? iso.slice(0,10).replace(/-/g,'.') : '' }

/* ── HTML shell ── */
const HEAD = (title='i2m2', extra='') => `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} — i2m2 株式会社イズムズ</title>
<meta name="description" content="株式会社イズムズ（i2m2）は医療・ヘルスケア分野の総合サポートカンパニー。人材紹介・病院経営支援・医療DX推進。">
<link rel="icon" href="/static/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700;9..40,900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
<link href="/static/style.css" rel="stylesheet">
${extra}
</head><body>`

/* ====================================================================
   § MAIN PAGE
==================================================================== */
app.get('/', async (c) => {
  const db = c.env.DB
  let newsRows: any[] = []
  try {
    const r = await db.prepare(
      `SELECT id,slug,title,excerpt,category,cover_emoji,author,published_at,tags
       FROM articles WHERE status='published' ORDER BY published_at DESC LIMIT 4`
    ).all()
    newsRows = r.results ?? []
  } catch(_) {}

  const newsCards = newsRows.length ? newsRows.map((a:any) => `
    <a class="nl-card" href="/news/${esc(a.slug)}">
      <div class="nl-img">${esc(a.cover_emoji)}</div>
      <div>
        <div class="nl-series">${catLabel(a.category).toUpperCase()} · ${dateJP(a.published_at)}</div>
        <div class="nl-title-sm">${esc(a.title)}</div>
        <div class="nl-excerpt-sm">${esc(a.excerpt)}</div>
        <div class="nl-tag-row">${(JSON.parse(a.tags||'[]') as string[]).slice(0,3).map(t=>`<span class="nl-tag">${esc(t)}</span>`).join('')}</div>
      </div>
    </a>`).join('')
  : `<p style="color:#777;font-size:14px;padding:20px 0;">記事を準備中です。</p>`

  return c.html(HEAD('ホーム', `
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  `) + `
<div id="scrollProgress"></div>
<div id="cur-dot"></div>
<div id="cur-ring"></div>

<!-- LOADING -->
<div id="loading">
  <div class="ld-logo">i2m2</div>
  <div class="ld-tag">Healthcare &amp; Medical Innovation</div>
  <div class="ld-bar"><div class="ld-fill"></div></div>
</div>

<!-- HEADER -->
<header class="header" id="hdr">
  <a class="h-logo" href="/">i2m2</a>
  <nav class="h-nav">
    <a href="#takeout">テイクアウト</a>
    <a href="#services">サービス</a>
    <a href="#portfolio">実績</a>
    <a href="#about">会社概要</a>
    <a href="#newsletter">インサイト</a>
    <a href="/news">ニュース</a>
  </nav>
  <a class="h-cta" href="#contact">Contact</a>
  <button class="h-burger" id="menuToggle" aria-label="menu">
    <span></span><span></span><span></span>
  </button>
</header>

<!-- FULLSCREEN MENU -->
<div class="menu-overlay" id="menuOverlay">
  <div class="menu-inner">
    <nav class="menu-links">
      <a class="menu-link" href="#takeout"   data-mc><span class="m-idx">01</span>テイクアウト</a>
      <a class="menu-link" href="#services"  data-mc><span class="m-idx">02</span>サービス</a>
      <a class="menu-link" href="#portfolio" data-mc><span class="m-idx">03</span>実績・事例</a>
      <a class="menu-link" href="#about"     data-mc><span class="m-idx">04</span>会社概要</a>
      <a class="menu-link" href="#newsletter" data-mc><span class="m-idx">05</span>インサイト</a>
      <a class="menu-link" href="/news"      data-mc><span class="m-idx">06</span>ニュース</a>
    </nav>
    <div class="menu-side">
      <div>
        <div class="ms-label">Contact</div>
        <div class="ms-contact">
          <a href="mailto:info@i2m2.co.jp">info@i2m2.co.jp</a>
          <a href="tel:0312345678">03-1234-5678</a>
        </div>
      </div>
      <div>
        <div class="ms-label">Location</div>
        <div class="ms-contact"><a href="#">東京都港区</a></div>
      </div>
    </div>
  </div>
</div>

<!-- ══ § 1 HERO ══ -->
<section class="hero" id="top">
  <div class="hero-vid-wrap">
    <video class="hero-vid" id="heroVid" autoplay muted loop playsinline preload="auto"
      poster="/static/frame_5s.jpg">
      <source src="/static/hero_video.mp4" type="video/mp4">
      <source src="/static/main_acer04.webm" type="video/webm">
    </video>
    <div class="hero-placeholder" id="heroPlaceholder">
      <div class="hp-grid">${Array(20).fill('<div class="hp-cell"></div>').join('')}</div>
      <div class="hp-orbs">
        <div class="hp-orb hp-orb1"></div>
        <div class="hp-orb hp-orb2"></div>
        <div class="hp-orb hp-orb3"></div>
      </div>
    </div>
  </div>
  <div class="hero-overlay"></div>
  <canvas id="heroParticles"></canvas>

  <div class="hero-body" id="heroBody">
    <div class="hero-text">
      <div class="hero-tag" id="heroTag">
        <span class="hero-tag-dot"></span>
        Healthcare &amp; Medical Innovation
      </div>
      <h1 class="hero-title" id="heroTitle">
        <span class="line"><span class="word" style="animation-delay:0.5s">Medical</span></span>
        <span class="line"><span class="word gold" style="animation-delay:0.7s">Support</span></span>
        <span class="line"><span class="word out" style="animation-delay:0.9s">Excellence.</span></span>
      </h1>
      <div class="hero-meta" id="heroMeta">
        <div class="hero-meta-item"><strong data-count="15" data-s="+">0</strong>Years Exp.</div>
        <div class="hero-meta-item"><strong data-count="300" data-s="+">0</strong>Partners</div>
        <div class="hero-meta-item"><strong data-count="98" data-s="%">0</strong>Satisfaction</div>
      </div>
    </div>
    <div class="hero-actions" id="heroActions">
      <a class="hero-cta gold-btn" href="#takeout">サービスを見る <i class="fas fa-arrow-right"></i></a>
      <a class="hero-cta" href="#contact"><i class="fas fa-paper-plane"></i> お問い合わせ</a>
    </div>
  </div>
  <div class="hero-scroll">
    <div class="hero-scroll-arrow"></div>
    <span>Scroll</span>
  </div>
</section>

<!-- ══ § 2 TICKER ══ -->
<div class="ticker">
  <div class="ticker-track" id="tickerTrack">
    ${Array(6).fill(`
    <span class="ticker-item">
      <span class="ticker-dot"></span> Medical Staffing
      <span class="ticker-dot"></span> Hospital Management
      <span class="ticker-dot"></span> Healthcare DX
      <span class="ticker-dot"></span> Medical Consulting
    </span>`).join('')}
  </div>
</div>

<!-- ══ § 3 TAKEOUT ══ -->
<section class="takeout" id="takeout">
  <div class="takeout-head">
    <div class="takeout-concept" data-reveal>
      Takeout<span class="q">?</span>
    </div>
    <div class="takeout-right" data-reveal data-d="2">
      <p class="takeout-sub">
        必要なサービスだけを<br>
        選んでテイクアウトできる。<br>
        それがi2m2の医療支援スタイルです。
      </p>
      <p class="takeout-hint">医療機関のニーズに合わせて、最適なサポートをご提供します。</p>
    </div>
  </div>
  <div class="takeout-menu">
    <div class="menu-card" data-reveal data-d="1">
      <span class="mc-emoji">🏥</span>
      <div class="mc-badge gold">Popular</div>
      <div class="mc-title">Medical Staffing</div>
      <div class="mc-sub">医師・看護師・医療技術職の紹介・派遣</div>
      <ul class="mc-list">
        <li>常勤医師の紹介・採用支援</li>
        <li>看護師・コメディカル紹介</li>
        <li>スポット・非常勤対応</li>
        <li>採用戦略コンサルティング</li>
        <li>定着率向上プログラム</li>
      </ul>
    </div>
    <div class="menu-card" data-reveal data-d="2">
      <span class="mc-emoji">📊</span>
      <div class="mc-badge">New</div>
      <div class="mc-title">Hospital Management</div>
      <div class="mc-sub">病院経営の課題を多角的に支援</div>
      <ul class="mc-list">
        <li>経営分析・改善コンサル</li>
        <li>診療報酬最適化</li>
        <li>収益改善・コスト削減</li>
        <li>人事制度・組織設計</li>
        <li>医療機能評価対応</li>
      </ul>
    </div>
    <div class="menu-card" data-reveal data-d="3">
      <span class="mc-emoji">🤖</span>
      <div class="mc-title">Healthcare DX</div>
      <div class="mc-sub">医療現場のデジタル変革を推進</div>
      <ul class="mc-list">
        <li>AI診断支援システム導入</li>
        <li>電子カルテ最適化</li>
        <li>業務自動化（RPA）</li>
        <li>データ分析・可視化</li>
        <li>遠隔診療システム構築</li>
      </ul>
    </div>
    <div class="menu-card" data-reveal data-d="4">
      <span class="mc-emoji">🌿</span>
      <div class="mc-title">Home Healthcare</div>
      <div class="mc-sub">在宅医療・地域医療を包括的にサポート</div>
      <ul class="mc-list">
        <li>在宅医療ネットワーク構築</li>
        <li>訪問診療体制整備</li>
        <li>地域連携コーディネート</li>
        <li>ケアマネージャー支援</li>
        <li>介護施設との連携強化</li>
      </ul>
    </div>
  </div>
  <div class="takeout-cta" data-reveal>
    <a class="takeout-cta-btn" href="#services">
      メニューをすべて見る <i class="fas fa-arrow-right"></i>
    </a>
  </div>
  <div class="service-label" data-reveal>
    <span class="service-label-text">What We Service</span>
    <a class="service-label-cta" href="#contact">プロジェクト相談</a>
  </div>
</section>

<!-- ══ § 4 SERVICES ACCORDION ══ -->
<section class="services" id="services">
  <div class="svc-wrap">
    <div class="svc-header" data-reveal>
      <div>
        <div class="sec-tag">Our Services</div>
        <h2 class="svc-sec-title">i2m2が提供する<br>医療支援サービス</h2>
      </div>
      <p class="svc-sec-sub">想像は広く、実装は精緻に。<br>医療現場の課題に向き合い、<br>最適解を一緒に見つけます。</p>
    </div>
    <div class="svc-list">
      <div class="svc-item">
        <div class="svc-trigger">
          <span class="svc-num">01</span>
          <span class="svc-name">Medical Staffing <span class="svc-name-jp">医療人材紹介</span></span>
          <span class="svc-icon">＋</span>
        </div>
        <div class="svc-body">
          <div class="svc-body-inner">
            <p class="svc-desc">日本全国の医療機関と医師・看護師・コメディカルスタッフをつなぐ総合的な人材紹介サービス。常勤・非常勤・スポット対応まで幅広くサポートします。採用から定着まで一貫してご支援します。</p>
            <div class="svc-items">
              <span class="svc-tag">常勤医師紹介</span>
              <span class="svc-tag">看護師紹介</span>
              <span class="svc-tag">コメディカル</span>
              <span class="svc-tag">スポット派遣</span>
              <span class="svc-tag">採用コンサル</span>
              <span class="svc-tag">定着支援</span>
              <span class="svc-tag">給与交渉代行</span>
              <span class="svc-tag">研修プログラム</span>
            </div>
          </div>
        </div>
      </div>
      <div class="svc-item">
        <div class="svc-trigger">
          <span class="svc-num">02</span>
          <span class="svc-name">Hospital Management <span class="svc-name-jp">病院経営支援</span></span>
          <span class="svc-icon">＋</span>
        </div>
        <div class="svc-body">
          <div class="svc-body-inner">
            <p class="svc-desc">経営分析から改革実行まで、医療機関の経営課題を多角的に支援します。診療報酬改定への対応、収益構造の最適化、組織体制の強化を通じて、持続可能な医療経営を実現します。</p>
            <div class="svc-items">
              <span class="svc-tag">経営分析</span>
              <span class="svc-tag">診療報酬最適化</span>
              <span class="svc-tag">収益改善</span>
              <span class="svc-tag">コスト削減</span>
              <span class="svc-tag">組織設計</span>
              <span class="svc-tag">人事制度構築</span>
              <span class="svc-tag">第三者評価対応</span>
              <span class="svc-tag">M&amp;Aコンサル</span>
            </div>
          </div>
        </div>
      </div>
      <div class="svc-item">
        <div class="svc-trigger">
          <span class="svc-num">03</span>
          <span class="svc-name">Healthcare DX <span class="svc-name-jp">医療DX推進</span></span>
          <span class="svc-icon">＋</span>
        </div>
        <div class="svc-body">
          <div class="svc-body-inner">
            <p class="svc-desc">AI・IoT・データ分析を活用して医療現場のデジタル変革を推進します。電子カルテの最適化から遠隔診療システムの構築まで、医療機関に合わせたDXソリューションをご提供します。</p>
            <div class="svc-items">
              <span class="svc-tag">AI診断支援</span>
              <span class="svc-tag">電子カルテ最適化</span>
              <span class="svc-tag">業務自動化</span>
              <span class="svc-tag">データ可視化</span>
              <span class="svc-tag">遠隔診療</span>
              <span class="svc-tag">セキュリティ対策</span>
              <span class="svc-tag">システム統合</span>
              <span class="svc-tag">研修・教育</span>
            </div>
          </div>
        </div>
      </div>
      <div class="svc-item">
        <div class="svc-trigger">
          <span class="svc-num">04</span>
          <span class="svc-name">Home Healthcare <span class="svc-name-jp">在宅・地域医療</span></span>
          <span class="svc-icon">＋</span>
        </div>
        <div class="svc-body">
          <div class="svc-body-inner">
            <p class="svc-desc">地域包括ケアシステムの構築と在宅医療体制の整備を支援します。医療・介護・福祉の連携を強化し、地域住民が安心して暮らせる環境づくりに貢献します。</p>
            <div class="svc-items">
              <span class="svc-tag">在宅医療体制整備</span>
              <span class="svc-tag">訪問診療支援</span>
              <span class="svc-tag">地域連携</span>
              <span class="svc-tag">多職種連携</span>
              <span class="svc-tag">ICT活用</span>
              <span class="svc-tag">介護施設連携</span>
            </div>
          </div>
        </div>
      </div>
      <div class="svc-item">
        <div class="svc-trigger">
          <span class="svc-num">05</span>
          <span class="svc-name">Medical Consulting <span class="svc-name-jp">医療コンサルティング</span></span>
          <span class="svc-icon">＋</span>
        </div>
        <div class="svc-body">
          <div class="svc-body-inner">
            <p class="svc-desc">医療機関の戦略立案から実行支援まで、豊富な現場経験を持つ専門家チームが伴走します。新規開業、事業承継、病院再生など、あらゆるフェーズでご相談を承ります。</p>
            <div class="svc-items">
              <span class="svc-tag">戦略立案</span>
              <span class="svc-tag">新規開業支援</span>
              <span class="svc-tag">事業承継</span>
              <span class="svc-tag">病院再生</span>
              <span class="svc-tag">許認可申請</span>
              <span class="svc-tag">補助金活用</span>
              <span class="svc-tag">マーケティング</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ § 5 PORTFOLIO ══ -->
<section class="portfolio" id="portfolio">
  <div class="pf-wrap">
    <div class="pf-head" data-reveal>
      <div>
        <div class="pf-label">Portfolio</div>
        <h2 class="pf-title">ご注文の<br>メニューが出ました！</h2>
      </div>
      <a class="pf-more" href="/news">実績一覧 <i class="fas fa-arrow-right"></i></a>
    </div>
    <div class="pf-filters" data-reveal>
      <button class="pf-filter-btn active" data-cat="all">All</button>
      <button class="pf-filter-btn" data-cat="hospital">病院支援</button>
      <button class="pf-filter-btn" data-cat="dx">DX・IT</button>
      <button class="pf-filter-btn" data-cat="staffing">人材紹介</button>
      <button class="pf-filter-btn" data-cat="consulting">経営コンサル</button>
    </div>
    <div class="pf-grid">
      <div class="pf-card span2" data-cat="hospital">
        <!-- 仮動画：後で専用動画に差し替え予定 -->
        <video class="pf-card-video" autoplay muted loop playsinline poster="/static/frame_5s.jpg">
          <source src="/static/hero_video.mp4" type="video/mp4">
        </video>
        <div class="pf-card-overlay"></div>
        <div class="view-hint">View</div>
        <div class="pf-card-info">
          <div class="pf-card-cat">Hospital Management / 病院経営支援</div>
          <div class="pf-card-title">大学病院附属クリニック — 経営改革プロジェクト</div>
        </div>
      </div>
      <div class="pf-card" data-cat="dx">
        <!-- 仮動画：後で専用動画に差し替え予定 -->
        <video class="pf-card-video" autoplay muted loop playsinline poster="/static/frame_5s.jpg">
          <source src="/static/hero_video.mp4" type="video/mp4">
        </video>
        <div class="pf-card-overlay"></div>
        <div class="view-hint">View</div>
        <div class="pf-card-info">
          <div class="pf-card-cat">Healthcare DX</div>
          <div class="pf-card-title">AI診断支援システム 導入・最適化</div>
        </div>
      </div>
      <div class="pf-card" data-cat="staffing">
        <!-- 仮動画：後で専用動画に差し替え予定 -->
        <video class="pf-card-video" autoplay muted loop playsinline poster="/static/frame_5s.jpg">
          <source src="/static/hero_video.mp4" type="video/mp4">
        </video>
        <div class="pf-card-overlay"></div>
        <div class="view-hint">View</div>
        <div class="pf-card-info">
          <div class="pf-card-cat">Medical Staffing</div>
          <div class="pf-card-title">地方中核病院 医師採用・定着率改善</div>
        </div>
      </div>
      <div class="pf-card span2" data-cat="consulting">
        <!-- 仮動画：後で専用動画に差し替え予定 -->
        <video class="pf-card-video" autoplay muted loop playsinline poster="/static/frame_5s.jpg">
          <source src="/static/hero_video.mp4" type="video/mp4">
        </video>
        <div class="pf-card-overlay"></div>
        <div class="view-hint">View</div>
        <div class="pf-card-info">
          <div class="pf-card-cat">Medical Consulting</div>
          <div class="pf-card-title">クリニックチェーン 新規開業 × 事業承継 コンサルティング</div>
        </div>
      </div>
      <div class="pf-card" data-cat="dx">
        <!-- 仮動画：後で専用動画に差し替え予定 -->
        <video class="pf-card-video" autoplay muted loop playsinline poster="/static/frame_5s.jpg">
          <source src="/static/hero_video.mp4" type="video/mp4">
        </video>
        <div class="pf-card-overlay"></div>
        <div class="view-hint">View</div>
        <div class="pf-card-info">
          <div class="pf-card-cat">Healthcare DX</div>
          <div class="pf-card-title">遠隔診療プラットフォーム 構築・運用</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ § 6 DARK TICKER + NUMBERS ══ -->
<div class="dark-ticker">
  <div class="dark-ticker-track">
    ${Array(4).fill(`
    <span class="dark-ticker-item">
      A small thing has made a big things.
      <span class="dt-sep">·</span>
      A small thing has made a big things.
      <span class="dt-sep">·</span>
    </span>`).join('')}
  </div>
</div>
<section class="numbers" id="insights">
  <div class="nums-wrap">
    <div class="nums-top" data-reveal>
      <h2 class="nums-title">AIから<br>地域医療まで<br><em>可能にします。</em></h2>
      <p class="nums-sub">保有するソリューションと専門家ネットワークで、医療の未来をともに拓きます。</p>
    </div>
    <div class="nums-grid">
      <div class="num-cell" data-reveal data-d="1">
        <div class="num-val"><span data-count="15" data-s="">0</span><span class="num-suffix">年</span></div>
        <div class="num-lbl">医療業界での<br>豊富な支援実績</div>
      </div>
      <div class="num-cell" data-reveal data-d="2">
        <div class="num-val"><span data-count="300" data-s="">0</span><span class="num-suffix">+</span></div>
        <div class="num-lbl">全国の医療機関<br>パートナー数</div>
      </div>
      <div class="num-cell" data-reveal data-d="3">
        <div class="num-val"><span data-count="98" data-s="">0</span><span class="num-suffix">%</span></div>
        <div class="num-lbl">クライアント<br>満足度</div>
      </div>
      <div class="num-cell" data-reveal data-d="4">
        <div class="num-val"><span data-count="1200" data-s="">0</span><span class="num-suffix">+</span></div>
        <div class="num-lbl">成功した人材<br>マッチング数</div>
      </div>
    </div>
  </div>
</section>

<!-- ══ § 7 ABOUT — "For the Better" ══ -->
<section class="about" id="about">
  <!-- 仮動画背景：後で専用動画に差し替え予定 -->
  <div class="about-vid-wrap">
    <video class="about-vid" autoplay muted loop playsinline poster="/static/frame_5s.jpg">
      <source src="/static/hero_video.mp4" type="video/mp4">
    </video>
    <div class="about-vid-overlay"></div>
  </div>
  <div class="about-ticker-v">
    <div class="about-ticker-v-track">
      We always think better good · We always think better good · We always think better good ·
    </div>
  </div>
  <div class="about-wrap">
    <div class="about-hello" data-reveal>こんにちは。</div>
    <div class="about-marquee-wrap">
      <div class="about-marquee-track">
        ${Array(4).fill(`<span class="about-marquee-item">We always think <span>'better good'</span></span>`).join('')}
      </div>
    </div>
    <div data-reveal>
      <div class="about-for">For the</div>
      <div class="about-better">Better</div>
    </div>
    <div class="about-body" data-reveal>
      <div class="about-desc">
        <strong>これ以上なく、医療に寄り添う。</strong><br><br>
        私たちi2m2は、医療・ヘルスケア分野に特化した総合サポートカンパニーです。
        人材紹介から病院経営支援、医療DX推進まで、医療機関が抱えるあらゆる課題に
        専門家チームが一貫して対応します。<br><br>
        小さな一歩が、大きな変革へとつながる。
        そのプロセスをともに歩み、医療の未来をより良くするために。
        私たちは今日も、医療現場の「Better」を追い続けています。
      </div>
      <div class="about-stats">
        <div class="about-stat">
          <span class="about-stat-n" data-count="2009" data-s="">2009</span>
          <span class="about-stat-l">年の創業</span>
        </div>
        <div class="about-stat">
          <span class="about-stat-n" data-count="50" data-s="">0</span>
          <span class="about-stat-l">名以上の専門コンサルタント</span>
        </div>
        <div class="about-stat">
          <span class="about-stat-n" data-count="47" data-s="">0</span>
          <span class="about-stat-l">都道府県での支援実績</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ § 8 NEWSLETTER ══ -->
<section class="newsletter-sec" id="newsletter">
  <div class="nl-wrap">
    <div class="nl-left">
      <div class="nl-top-label">Latest Insights</div>
      <h2 class="nl-title" data-reveal>最近のトレンドや<br>気になるトピックを<br>ニュースレターでお届け</h2>
      <p class="nl-sub" data-reveal data-d="2">医療業界の最新動向、経営改革事例、DX活用事例など、<br>現場で使えるインサイトをお届けします。</p>
      <div class="nl-cards">
        ${newsCards}
      </div>
    </div>
    <div class="nl-sticky">
      <div class="nl-sticky-box">
        <div class="nl-s-label">Subscribe</div>
        <div class="nl-s-title">ニュースレター<br>登録</div>
        <form class="nl-s-form" onsubmit="submitNL(event)">
          <input class="nl-s-input" type="email" placeholder="メールアドレス" required>
          <button class="nl-s-btn" type="submit">登録する</button>
          <div class="nl-msg"></div>
        </form>
      </div>
    </div>
  </div>
</section>

<!-- ══ § 9 AWARDS ══ -->
<section class="awards" id="awards">
  <div class="aw-wrap">
    <div class="aw-head" data-reveal>
      <div>
        <div class="aw-label">Award Winner</div>
        <h2 class="aw-title">認められた、<br>栄光の瞬間</h2>
      </div>
      <a class="aw-more" href="/news">もっと見る</a>
    </div>
    <div class="aw-list">
      <div class="aw-item" data-reveal>
        <span class="aw-year">2024</span>
        <div class="aw-medal">🏆</div>
        <span class="aw-name">医療経営優秀企業賞 — 厚生労働省推薦</span>
        <span class="aw-cat">Hospital Management</span>
      </div>
      <div class="aw-item" data-reveal data-d="1">
        <span class="aw-year">2024</span>
        <div class="aw-medal">🥇</div>
        <span class="aw-name">ヘルスケアDXアワード グランプリ</span>
        <span class="aw-cat">Healthcare DX</span>
      </div>
      <div class="aw-item" data-reveal data-d="2">
        <span class="aw-year">2023</span>
        <div class="aw-medal">⭐</div>
        <span class="aw-name">医療人材紹介 顧客満足度 No.1 — 日本医療総合研究所調査</span>
        <span class="aw-cat">Medical Staffing</span>
      </div>
      <div class="aw-item" data-reveal data-d="3">
        <span class="aw-year">2023</span>
        <div class="aw-medal">🎖</div>
        <span class="aw-name">在宅医療推進貢献賞 — 日本在宅医療連合学会</span>
        <span class="aw-cat">Home Healthcare</span>
      </div>
      <div class="aw-item" data-reveal data-d="4">
        <span class="aw-year">2022</span>
        <div class="aw-medal">🏅</div>
        <span class="aw-name">ベストコンサルティングファーム賞 — 医療経営協会</span>
        <span class="aw-cat">Consulting</span>
      </div>
    </div>
  </div>
</section>

<!-- ══ § 10 TEAM ══ -->
<section class="team" id="team">
  <div class="tm-wrap">
    <div class="tm-head" data-reveal>
      <div class="tm-label">Our Team</div>
      <h2 class="tm-title">少数精鋭の<br>One-Teamです</h2>
      <p class="tm-sub">医療・経営・IT・法務の専門家が一体となって、クライアントの課題に向き合います。A creative team that fosters close connections and delivers strategic vision with cultural insight.</p>
    </div>
    <div class="tm-grid">
      <div class="team-card" data-reveal data-d="1">
        <div class="tc-avatar">👨‍⚕️</div>
        <div class="tc-body">
          <div class="tc-name">田中 健一</div>
          <div class="tc-role">代表取締役 / 医療経営コンサルタント</div>
        </div>
      </div>
      <div class="team-card" data-reveal data-d="2">
        <div class="tc-avatar">👩‍💼</div>
        <div class="tc-body">
          <div class="tc-name">鈴木 美咲</div>
          <div class="tc-role">医療人材部門 ディレクター</div>
        </div>
      </div>
      <div class="team-card" data-reveal data-d="3">
        <div class="tc-avatar">👨‍💻</div>
        <div class="tc-body">
          <div class="tc-name">佐藤 雄太</div>
          <div class="tc-role">Healthcare DX 責任者</div>
        </div>
      </div>
      <div class="team-card" data-reveal data-d="4">
        <div class="tc-avatar">👩‍⚕️</div>
        <div class="tc-body">
          <div class="tc-name">山田 恵子</div>
          <div class="tc-role">在宅医療コンサルタント</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ § 11 CTA ══ -->
<section class="cta-section" id="contact">
  <div class="cta-rings">
    <div class="cta-ring"></div>
    <div class="cta-ring"></div>
    <div class="cta-ring"></div>
  </div>
  <div class="cta-inner" data-reveal>
    <div class="cta-label">Let's Work Together</div>
    <h2 class="cta-main-title">
      Project<br>
      <span class="out">Inquiry.</span>
    </h2>
    <div class="cta-btn-row">
      <a class="cta-btn cta-btn-fill" href="mailto:info@i2m2.co.jp">
        <i class="fas fa-envelope"></i> メールでご相談
      </a>
      <a class="cta-btn cta-btn-out" href="tel:0312345678">
        <i class="fas fa-phone"></i> 電話でご相談
      </a>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="ft-wrap">
    <div class="ft-top">
      <div>
        <div class="ft-logo">i2m2</div>
        <p class="ft-tagline">医療・ヘルスケア分野の総合サポートカンパニー。人材・経営・DXで医療の未来を切り拓きます。</p>
      </div>
      <div class="ft-cols">
        <div>
          <div class="ft-col-title">Services</div>
          <div class="ft-links">
            <a href="#takeout">Medical Staffing</a>
            <a href="#takeout">Hospital Management</a>
            <a href="#takeout">Healthcare DX</a>
            <a href="#takeout">Home Healthcare</a>
            <a href="#takeout">Medical Consulting</a>
          </div>
        </div>
        <div>
          <div class="ft-col-title">Company</div>
          <div class="ft-links">
            <a href="#about">会社概要</a>
            <a href="#team">チーム</a>
            <a href="#awards">受賞歴</a>
            <a href="/news">ニュース</a>
            <a href="/admin/login">管理画面</a>
          </div>
        </div>
        <div>
          <div class="ft-col-title">Contact</div>
          <div class="ft-links">
            <a href="mailto:info@i2m2.co.jp">info@i2m2.co.jp</a>
            <a href="tel:0312345678">03-1234-5678</a>
            <a href="#">東京都港区</a>
          </div>
        </div>
      </div>
    </div>
    <div class="ft-bottom">
      <span>© 2024 <span class="ft-gold">i2m2</span> 株式会社イズムズ. All rights reserved.</span>
      <span>Healthcare &amp; Medical Support</span>
    </div>
  </div>
</footer>

<script src="/static/main.js"></script>
`)
})

/* ====================================================================
   § NEWS LISTING
==================================================================== */
app.get('/news', async (c) => {
  const db = c.env.DB
  const cat = c.req.query('cat') || 'all'
  const page = parseInt(c.req.query('page') || '1')
  const PER = 9
  let rows: any[] = [], total = 0

  try {
    const where = cat !== 'all' ? `WHERE status='published' AND category='${cat}'` : `WHERE status='published'`
    const cnt = await db.prepare(`SELECT COUNT(*) as n FROM articles ${where}`).first<{n:number}>()
    total = cnt?.n ?? 0
    const r = await db.prepare(
      `SELECT id,slug,title,excerpt,category,cover_emoji,author,published_at,tags
       FROM articles ${where} ORDER BY published_at DESC LIMIT ${PER} OFFSET ${(page-1)*PER}`
    ).all()
    rows = r.results ?? []
  } catch(_) {}

  const cats = [
    {k:'all',l:'すべて'}, {k:'trend',l:'トレンド'}, {k:'staffing',l:'人材'},
    {k:'management',l:'経営'}, {k:'policy',l:'制度・政策'}, {k:'news',l:'お知らせ'}
  ]
  const totalPages = Math.ceil(total / PER)

  const cards = rows.map(a => `
    <a class="nc-card" href="/news/${esc(a.slug)}">
      <div class="nc-img">${esc(a.cover_emoji)}</div>
      <div class="nc-body">
        <div class="nc-meta">
          <span class="nc-meta-cat">${catLabel(a.category)}</span>
          <span>${dateJP(a.published_at)}</span>
        </div>
        <div class="nc-title">${esc(a.title)}</div>
        <div class="nc-excerpt">${esc(a.excerpt)}</div>
      </div>
      <div class="nc-footer">
        <span>${esc(a.author)}</span>
        <span class="nc-read-more">Read more →</span>
      </div>
    </a>`).join('')

  const pagerHtml = totalPages > 1 ? `<div class="pager">
    ${page > 1 ? `<a class="pg-btn arrow" href="/news?cat=${cat}&page=${page-1}">‹</a>` : ''}
    ${Array.from({length:totalPages},(_,i)=>`<a class="pg-btn${i+1===page?' active':''}" href="/news?cat=${cat}&page=${i+1}">${i+1}</a>`).join('')}
    ${page < totalPages ? `<a class="pg-btn arrow" href="/news?cat=${cat}&page=${page+1}">›</a>` : ''}
  </div>` : ''

  return c.html(HEAD('ニュース・インサイト') + `
<div id="scrollProgress"></div>
<div id="cur-dot"></div><div id="cur-ring"></div>
<header class="header scrolled" id="hdr">
  <a class="h-logo" href="/">i2m2</a>
  <nav class="h-nav">
    <a href="/#takeout">テイクアウト</a><a href="/#services">サービス</a>
    <a href="/#portfolio">実績</a><a href="/#about">会社概要</a><a href="/news" class="active">ニュース</a>
  </nav>
  <a class="h-cta" href="/#contact">Contact</a>
  <button class="h-burger" id="menuToggle"><span></span><span></span><span></span></button>
</header>
<div class="menu-overlay" id="menuOverlay">
  <div class="menu-inner">
    <nav class="menu-links">
      <a class="menu-link" href="/#takeout" data-mc><span class="m-idx">01</span>テイクアウト</a>
      <a class="menu-link" href="/#services" data-mc><span class="m-idx">02</span>サービス</a>
      <a class="menu-link" href="/#portfolio" data-mc><span class="m-idx">03</span>実績・事例</a>
      <a class="menu-link" href="/#about" data-mc><span class="m-idx">04</span>会社概要</a>
      <a class="menu-link" href="/news" data-mc><span class="m-idx">05</span>ニュース</a>
    </nav>
  </div>
</div>
<div class="page-hero">
  <div class="ph-bg-grid"></div>
  <div class="ph-body">
    <div class="ph-bread"><a href="/">Home</a> <span>/</span> News</div>
    <div class="ph-cat">Latest Insights</div>
    <h1 class="ph-title">ニュース &amp;<br>インサイト</h1>
    <p class="ph-sub">医療業界の最新動向、経営改革事例、DX活用事例など、現場で使えるインサイトをお届けします。</p>
  </div>
</div>
<div class="news-wrap">
  <div class="news-cats">
    ${cats.map(({k,l})=>`<a class="nc-btn${cat===k?' active':''}" href="/news?cat=${k}">${l}</a>`).join('')}
  </div>
  <div class="news-grid">
    ${cards || `<div class="news-empty"><div style="font-size:48px;margin-bottom:16px;">📰</div><p>記事がありません。</p></div>`}
  </div>
  ${pagerHtml}
</div>
<footer class="footer">
  <div class="ft-wrap">
    <div class="ft-bottom">
      <span>© 2024 <span class="ft-gold">i2m2</span> 株式会社イズムズ.</span>
      <a href="/" style="color:rgba(255,255,255,0.3);">← ホームへ</a>
    </div>
  </div>
</footer>
<script src="/static/main.js"></script>
`)
})

/* ====================================================================
   § ARTICLE DETAIL
==================================================================== */
app.get('/news/:slug', async (c) => {
  const db = c.env.DB
  const slug = c.req.param('slug')
  let art: any = null, related: any[] = []
  try {
    art = await db.prepare(`SELECT * FROM articles WHERE slug=? AND status='published'`).bind(slug).first()
    if (art) {
      const r = await db.prepare(
        `SELECT slug,title,cover_emoji,published_at FROM articles WHERE status='published' AND id!=? ORDER BY published_at DESC LIMIT 4`
      ).bind(art.id).all()
      related = r.results ?? []
    }
  } catch(_) {}
  if (!art) return c.html(HEAD('404') + `<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:sans-serif;flex-direction:column;gap:16px;"><h1>404</h1><a href="/news">← ニュース一覧</a></div><script src="/static/main.js"></script>`, 404)

  const tags = JSON.parse(art.tags||'[]') as string[]
  const relCards = related.map(r => `
    <a class="rel-card" href="/news/${esc(r.slug)}">
      <div class="rel-thumb">${esc(r.cover_emoji)}</div>
      <div>
        <div class="rel-title">${esc(r.title)}</div>
        <div class="rel-date">${dateJP(r.published_at)}</div>
      </div>
    </a>`).join('')

  return c.html(HEAD(art.title) + `
<div id="scrollProgress"></div>
<div id="cur-dot"></div><div id="cur-ring"></div>
<header class="header scrolled" id="hdr">
  <a class="h-logo" href="/">i2m2</a>
  <nav class="h-nav">
    <a href="/#takeout">テイクアウト</a><a href="/#services">サービス</a>
    <a href="/news" class="active">ニュース</a><a href="/#contact">Contact</a>
  </nav>
  <a class="h-cta" href="/#contact">Contact</a>
  <button class="h-burger" id="menuToggle"><span></span><span></span><span></span></button>
</header>
<div class="menu-overlay" id="menuOverlay">
  <div class="menu-inner">
    <nav class="menu-links">
      <a class="menu-link" href="/" data-mc><span class="m-idx">00</span>ホーム</a>
      <a class="menu-link" href="/news" data-mc><span class="m-idx">01</span>ニュース</a>
    </nav>
  </div>
</div>
<div class="page-hero">
  <div class="ph-bg-grid"></div>
  <div class="ph-body">
    <div class="ph-bread"><a href="/">Home</a> <span>/</span> <a href="/news">News</a> <span>/</span> Article</div>
    <span class="ph-cat">${catLabel(art.category)}</span>
    <h1 class="ph-title">${esc(art.title)}</h1>
    <p class="ph-sub">${esc(art.excerpt)}</p>
  </div>
</div>
<div class="article-wrap">
  <div class="art-main">
    <div class="art-hero">${esc(art.cover_emoji)}</div>
    <div class="art-meta">
      <span class="art-meta-cat">${catLabel(art.category)}</span>
      <span>${dateJP(art.published_at)}</span>
      <span>${esc(art.author)}</span>
    </div>
    <h1 class="art-title">${esc(art.title)}</h1>
    <p class="art-excerpt">${esc(art.excerpt)}</p>
    <div class="art-body">${art.body.replace(/\n/g,'<br>')}</div>
    <div class="art-tags">${tags.map(t=>`<span class="art-tag">${esc(t)}</span>`).join('')}</div>
  </div>
  <aside class="art-aside">
    <div class="aside-box">
      <div class="aside-title">Related Articles</div>
      <div class="aside-body">${relCards || '<p style="font-size:13px;color:#999;">関連記事がありません。</p>'}</div>
    </div>
    <div class="aside-box" style="margin-top:16px;">
      <div class="aside-title">Newsletter</div>
      <div class="aside-body">
        <p style="font-size:13px;color:#666;margin-bottom:14px;line-height:1.6;">最新インサイトをメールでお届けします。</p>
        <form onsubmit="submitNL(event)" style="display:flex;flex-direction:column;gap:10px;">
          <input type="email" placeholder="メールアドレス" required style="padding:10px 12px;border:1px solid rgba(17,17,17,0.12);border-radius:8px;font-size:13px;outline:none;width:100%;">
          <button type="submit" class="btn-primary" style="justify-content:center;">登録する</button>
          <div class="nl-msg"></div>
        </form>
      </div>
    </div>
  </aside>
</div>
<footer class="footer">
  <div class="ft-wrap">
    <div class="ft-bottom">
      <span>© 2024 <span class="ft-gold">i2m2</span> 株式会社イズムズ.</span>
      <a href="/news" style="color:rgba(255,255,255,0.3);">← ニュース一覧</a>
    </div>
  </div>
</footer>
<script src="/static/main.js"></script>
`)
})

/* ====================================================================
   § ADMIN — login
==================================================================== */
app.get('/admin/login', (c) => {
  const err = c.req.query('err')
  return c.html(HEAD('管理画面ログイン') + `
<div class="adm-login-wrap">
  <div class="adm-login-box">
    <div class="adm-login-logo">i2m2</div>
    <div class="adm-login-sub">Admin Dashboard</div>
    ${err ? `<div class="adm-error">ユーザー名またはパスワードが違います。</div>` : ''}
    <form class="adm-login-form" method="POST" action="/admin/login">
      <div class="adm-field">
        <label class="adm-label">Username</label>
        <input class="adm-input" name="username" type="text" autocomplete="username" required>
      </div>
      <div class="adm-field">
        <label class="adm-label">Password</label>
        <input class="adm-input" name="password" type="password" autocomplete="current-password" required>
      </div>
      <button class="adm-login-btn" type="submit">ログイン</button>
    </form>
  </div>
</div>
<script src="/static/main.js"></script>
`)
})

app.post('/admin/login', async (c) => {
  const db = c.env.DB
  const body = await c.req.parseBody()
  const username = String(body.username || '').trim()
  const password  = String(body.password  || '')
  const hash = await sha256hex(password)
  const user = await db.prepare(
    `SELECT id,username FROM admin_users WHERE username=? AND password=?`
  ).bind(username, hash).first<{id:number,username:string}>()
  if (!user) return c.redirect('/admin/login?err=1')
  const token = randomToken()
  await db.prepare(`INSERT INTO admin_sessions (token,user_id,expires_at) VALUES (?,?,datetime('now','+7 days'))`)
    .bind(token, user.id).run()
  setCookie(c, 'adm_session', token, { path:'/', httpOnly:true, sameSite:'Lax', maxAge:604800 })
  return c.redirect('/admin')
})

app.get('/admin/logout', async (c) => {
  const token = getCookie(c, 'adm_session')
  if (token) {
    try { await c.env.DB.prepare(`DELETE FROM admin_sessions WHERE token=?`).bind(token).run() } catch(_) {}
  }
  deleteCookie(c, 'adm_session', { path:'/' })
  return c.redirect('/admin/login')
})

/* ====================================================================
   § ADMIN — dashboard
==================================================================== */
function adminNav(username: string, active: string) {
  return `
<div class="adm-wrap">
<header class="adm-header">
  <a class="adm-logo" href="/admin">i2m2 Admin</a>
  <nav class="adm-nav">
    <a href="/admin" class="${active==='dashboard'?'active':''}">ダッシュボード</a>
    <a href="/admin/articles" class="${active==='articles'?'active':''}">記事管理</a>
    <a href="/news" target="_blank">サイト表示</a>
    <a href="/admin/logout">ログアウト</a>
  </nav>
  <div class="adm-user">👤 ${esc(username)}</div>
</header>
<div class="adm-body">`
}

app.get('/admin', async (c) => {
  const sess = await getSession(c)
  if (!sess) return c.redirect('/admin/login')
  const db = c.env.DB
  let stats = { total:0, pub:0, draft:0 }
  try {
    const r = await db.prepare(`SELECT COUNT(*) as total, SUM(CASE WHEN status='published' THEN 1 ELSE 0 END) as pub, SUM(CASE WHEN status='draft' THEN 1 ELSE 0 END) as draft FROM articles`).first<any>()
    if (r) stats = { total: r.total||0, pub: r.pub||0, draft: r.draft||0 }
  } catch(_) {}
  let recent: any[] = []
  try {
    const r2 = await db.prepare(`SELECT id,slug,title,status,category,published_at FROM articles ORDER BY created_at DESC LIMIT 6`).all()
    recent = r2.results ?? []
  } catch(_) {}

  return c.html(HEAD('Admin Dashboard') +
    adminNav(sess.username, 'dashboard') + `
  <div class="adm-page-title">ダッシュボード</div>
  <div class="adm-stats">
    <div class="adm-stat"><div class="adm-stat-n">${stats.total}</div><div class="adm-stat-l">Total Articles</div></div>
    <div class="adm-stat"><div class="adm-stat-n">${stats.pub}</div><div class="adm-stat-l">Published</div></div>
    <div class="adm-stat"><div class="adm-stat-n">${stats.draft}</div><div class="adm-stat-l">Draft</div></div>
    <div class="adm-stat"><div class="adm-stat-n"><a class="adm-btn adm-btn-primary" href="/admin/articles/new">＋ 新規作成</a></div><div class="adm-stat-l">New Article</div></div>
  </div>
  <div class="adm-table-wrap">
    <table class="adm-table">
      <thead><tr><th>タイトル</th><th>カテゴリ</th><th>ステータス</th><th>公開日</th><th>操作</th></tr></thead>
      <tbody>
        ${recent.map(a=>`<tr>
          <td><a href="/news/${esc(a.slug)}" target="_blank" style="color:inherit;">${esc(a.title)}</a></td>
          <td><span class="badge badge-cat">${catLabel(a.category)}</span></td>
          <td><span class="badge ${a.status==='published'?'badge-pub':'badge-draft'}">${a.status==='published'?'公開':'下書き'}</span></td>
          <td>${dateJP(a.published_at)}</td>
          <td class="adm-actions">
            <a class="adm-btn adm-btn-secondary" href="/admin/articles/${a.id}/edit">編集</a>
            ${a.status==='published'
              ? `<a class="adm-btn adm-btn-secondary" href="/admin/articles/${a.id}/unpublish">非公開</a>`
              : `<a class="adm-btn adm-btn-success" href="/admin/articles/${a.id}/publish">公開</a>`}
            <a class="adm-btn adm-btn-danger" href="/admin/articles/${a.id}/delete" data-confirm="この記事を削除しますか？">削除</a>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div></div>
<script src="/static/main.js"></script>
`)
})

/* ====================================================================
   § ADMIN — article list
==================================================================== */
app.get('/admin/articles', async (c) => {
  const sess = await getSession(c)
  if (!sess) return c.redirect('/admin/login')
  const db = c.env.DB
  const status = c.req.query('status') || 'all'
  let rows: any[] = []
  try {
    const where = status !== 'all' ? `WHERE status='${status}'` : ''
    const r = await db.prepare(`SELECT id,slug,title,status,category,published_at,author FROM articles ${where} ORDER BY created_at DESC`).all()
    rows = r.results ?? []
  } catch(_) {}

  return c.html(HEAD('記事管理') +
    adminNav(sess.username, 'articles') + `
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
    <div class="adm-page-title" style="margin:0">記事管理 <small>${rows.length}件</small></div>
    <a class="adm-btn adm-btn-primary" href="/admin/articles/new">＋ 新規作成</a>
  </div>
  <div class="adm-filters">
    <a class="adm-filter-btn${status==='all'?' active':''}" href="/admin/articles?status=all">すべて</a>
    <a class="adm-filter-btn${status==='published'?' active':''}" href="/admin/articles?status=published">公開</a>
    <a class="adm-filter-btn${status==='draft'?' active':''}" href="/admin/articles?status=draft">下書き</a>
  </div>
  <div class="adm-table-wrap">
    <table class="adm-table">
      <thead><tr><th>タイトル</th><th>カテゴリ</th><th>著者</th><th>ステータス</th><th>公開日</th><th>操作</th></tr></thead>
      <tbody>
        ${rows.map(a=>`<tr>
          <td style="max-width:300px;">${esc(a.title)}</td>
          <td><span class="badge badge-cat">${catLabel(a.category)}</span></td>
          <td style="font-size:12px;">${esc(a.author)}</td>
          <td><span class="badge ${a.status==='published'?'badge-pub':'badge-draft'}">${a.status==='published'?'公開':'下書き'}</span></td>
          <td style="font-size:12px;">${dateJP(a.published_at)}</td>
          <td class="adm-actions">
            <a class="adm-btn adm-btn-secondary" href="/admin/articles/${a.id}/edit">編集</a>
            ${a.status==='published'
              ? `<a class="adm-btn adm-btn-secondary" href="/admin/articles/${a.id}/unpublish">非公開</a>`
              : `<a class="adm-btn adm-btn-success" href="/admin/articles/${a.id}/publish">公開</a>`}
            <a class="adm-btn adm-btn-danger" href="/admin/articles/${a.id}/delete" data-confirm="削除しますか？">削除</a>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div></div>
<script src="/static/main.js"></script>
`)
})

/* ====================================================================
   § ADMIN — new / edit article form
==================================================================== */
function articleForm(a: any) {
  const cats = ['trend','staffing','management','policy','news','event']
  const catLabels: Record<string,string> = {trend:'トレンド',staffing:'人材',management:'経営',policy:'制度・政策',news:'お知らせ',event:'イベント'}
  const emojis = ['🏥','📊','🤖','🌿','💊','🔬','🩺','📋','💡','🏆','📰','🌐']
  return `
  <form class="adm-form" method="POST" action="${a ? `/admin/articles/${a.id}` : '/admin/articles'}">
    <div class="adm-form-row">
      <div class="adm-field">
        <label class="adm-label" for="title">タイトル *</label>
        <input class="adm-input" id="title" name="title" type="text" required value="${a?esc(a.title):''}">
      </div>
      <div class="adm-field">
        <label class="adm-label" for="slug">スラッグ（URL）</label>
        <input class="adm-input" id="slug" name="slug" type="text" value="${a?esc(a.slug):''}">
        <div class="adm-hint">空欄でタイトルから自動生成</div>
      </div>
    </div>
    <div class="adm-form-row">
      <div class="adm-field">
        <label class="adm-label" for="category">カテゴリ</label>
        <select class="adm-select" id="category" name="category">
          ${cats.map(k=>`<option value="${k}"${a?.category===k?' selected':''}>${catLabels[k]}</option>`).join('')}
        </select>
      </div>
      <div class="adm-field">
        <label class="adm-label" for="cover_emoji">カバー絵文字</label>
        <input class="adm-input" id="cover_emoji" name="cover_emoji" type="text" value="${a?esc(a.cover_emoji):'🏥'}" list="emoji-list">
        <datalist id="emoji-list">${emojis.map(e=>`<option value="${e}">`).join('')}</datalist>
      </div>
    </div>
    <div class="adm-field">
      <label class="adm-label" for="author">著者</label>
      <input class="adm-input" id="author" name="author" type="text" value="${a?esc(a.author):'i2m2 編集部'}">
    </div>
    <div class="adm-field">
      <label class="adm-label" for="excerpt">抜粋（一覧表示用）</label>
      <textarea class="adm-textarea" id="excerpt" name="excerpt" rows="3" maxlength="200">${a?esc(a.excerpt):''}</textarea>
    </div>
    <div class="adm-field">
      <label class="adm-label" for="body">本文</label>
      <textarea class="adm-textarea" id="body" name="body" rows="16" style="min-height:320px;">${a?esc(a.body):''}</textarea>
      <div class="adm-hint">Markdown対応。改行は段落として表示されます。</div>
    </div>
    <div class="adm-field">
      <label class="adm-label" for="tags">タグ（カンマ区切り）</label>
      <input class="adm-input" id="tags" name="tags" type="text" value="${a?(JSON.parse(a.tags||'[]') as string[]).join(','):''}">
    </div>
    <div class="adm-form-row">
      <div class="adm-field">
        <label class="adm-label" for="status">ステータス</label>
        <select class="adm-select" id="status" name="status">
          <option value="draft"${!a||a.status==='draft'?' selected':''}>下書き</option>
          <option value="published"${a?.status==='published'?' selected':''}>公開</option>
        </select>
      </div>
      <div class="adm-field">
        <label class="adm-label" for="published_at">公開日時</label>
        <input class="adm-input" id="published_at" name="published_at" type="datetime-local" value="${a?.published_at?.slice(0,16)||new Date().toISOString().slice(0,16)}">
      </div>
    </div>
    <div style="display:flex;gap:12px;align-items:center;">
      <button class="adm-btn adm-btn-primary" type="submit" style="padding:10px 24px;font-size:13px;">${a?'更新する':'作成する'}</button>
      <a class="adm-btn adm-btn-secondary" href="/admin/articles">キャンセル</a>
    </div>
  </form>`
}

app.get('/admin/articles/new', async (c) => {
  const sess = await getSession(c)
  if (!sess) return c.redirect('/admin/login')
  return c.html(HEAD('新規記事作成') +
    adminNav(sess.username, 'articles') + `
  <div class="adm-page-title">新規記事作成</div>
  ${articleForm(null)}
</div></div>
<script src="/static/main.js"></script>
`)
})

app.post('/admin/articles', async (c) => {
  const sess = await getSession(c)
  if (!sess) return c.redirect('/admin/login')
  const db = c.env.DB
  const b = await c.req.parseBody()
  const title = String(b.title||'').trim()
  const slug  = slugify(String(b.slug||title))
  const tags  = JSON.stringify(String(b.tags||'').split(',').map((t:string)=>t.trim()).filter(Boolean))
  try {
    await db.prepare(`INSERT INTO articles (slug,title,excerpt,body,category,tags,status,featured,cover_emoji,author,published_at) VALUES (?,?,?,?,?,?,?,0,?,?,?)`)
      .bind(slug, title, String(b.excerpt||''), String(b.body||''), String(b.category||'news'), tags, String(b.status||'draft'), String(b.cover_emoji||'📰'), String(b.author||'i2m2 編集部'), String(b.published_at||new Date().toISOString()))
      .run()
  } catch(e) { return c.html(HEAD('エラー') + `<p style="padding:40px;color:red;">Error: ${String(e)}</p>`) }
  return c.redirect('/admin/articles')
})

app.get('/admin/articles/:id/edit', async (c) => {
  const sess = await getSession(c)
  if (!sess) return c.redirect('/admin/login')
  const db = c.env.DB
  const art = await db.prepare(`SELECT * FROM articles WHERE id=?`).bind(c.req.param('id')).first()
  if (!art) return c.redirect('/admin/articles')
  return c.html(HEAD('記事編集') +
    adminNav(sess.username, 'articles') + `
  <div class="adm-page-title">記事編集</div>
  ${articleForm(art)}
</div></div>
<script src="/static/main.js"></script>
`)
})

app.post('/admin/articles/:id', async (c) => {
  const sess = await getSession(c)
  if (!sess) return c.redirect('/admin/login')
  const db = c.env.DB
  const id = c.req.param('id')
  const b = await c.req.parseBody()
  const title = String(b.title||'').trim()
  const slug  = slugify(String(b.slug||title))
  const tags  = JSON.stringify(String(b.tags||'').split(',').map((t:string)=>t.trim()).filter(Boolean))
  try {
    await db.prepare(`UPDATE articles SET slug=?,title=?,excerpt=?,body=?,category=?,tags=?,status=?,cover_emoji=?,author=?,published_at=?,updated_at=datetime('now') WHERE id=?`)
      .bind(slug, title, String(b.excerpt||''), String(b.body||''), String(b.category||'news'), tags, String(b.status||'draft'), String(b.cover_emoji||'📰'), String(b.author||'i2m2 編集部'), String(b.published_at||new Date().toISOString()), id)
      .run()
  } catch(e) { return c.html(HEAD('エラー') + `<p style="padding:40px;color:red;">Error: ${String(e)}</p>`) }
  return c.redirect('/admin/articles')
})

app.get('/admin/articles/:id/publish', async (c) => {
  const sess = await getSession(c); if (!sess) return c.redirect('/admin/login')
  await c.env.DB.prepare(`UPDATE articles SET status='published',published_at=COALESCE(NULLIF(published_at,''),datetime('now')),updated_at=datetime('now') WHERE id=?`).bind(c.req.param('id')).run()
  return c.redirect('/admin/articles')
})
app.get('/admin/articles/:id/unpublish', async (c) => {
  const sess = await getSession(c); if (!sess) return c.redirect('/admin/login')
  await c.env.DB.prepare(`UPDATE articles SET status='draft',updated_at=datetime('now') WHERE id=?`).bind(c.req.param('id')).run()
  return c.redirect('/admin/articles')
})
app.get('/admin/articles/:id/delete', async (c) => {
  const sess = await getSession(c); if (!sess) return c.redirect('/admin/login')
  await c.env.DB.prepare(`DELETE FROM articles WHERE id=?`).bind(c.req.param('id')).run()
  return c.redirect('/admin/articles')
})

/* ── JSON API ── */
app.get('/api/articles', async (c) => {
  const db = c.env.DB
  try {
    const r = await db.prepare(`SELECT id,slug,title,excerpt,category,cover_emoji,author,published_at,tags FROM articles WHERE status='published' ORDER BY published_at DESC LIMIT 20`).all()
    return c.json({ ok:true, articles: r.results })
  } catch(e) { return c.json({ ok:false, error: String(e) }, 500) }
})

export default app
