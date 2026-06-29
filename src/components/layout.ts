// i2m2 Corporate Site - Layout Component
export function layout(title: string, content: string, options?: { description?: string; fullTitle?: string }) {
  const desc = options?.description || '株式会社イズムズ（i2m2） | ヘルスケア・医療領域の総合支援企業。M&A仲介、医療マーケティング、人材紹介、医療DXなど地域価値創造事業（RVC）を展開。'
  const pageTitle = options?.fullTitle || `${title} | 株式会社イズムズ（i2m2）`
  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(pageTitle)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="株式会社イズムズ（i2m2）">
<meta property="og:title" content="${esc(pageTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="/static/ogp.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(pageTitle)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="/static/ogp.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;700;900&family=Noto+Serif+JP:wght@400;500;700&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='28' font-size='28' font-weight='bold' fill='%231a6bcc'>i</text></svg>" type="image/svg+xml">
<link href="/static/style.css" rel="stylesheet">
</head>
<body>
<!-- Opening Animation -->
<div class="opening" id="opening">
  <div class="opening-logo">
    <img src="/static/logo.png" alt="i2m2" class="opening-logo-img">
    <span class="opening-tagline">Bonanza: Fortune Smiles!</span>
  </div>
</div>
${header()}
<main id="main">
${content}
</main>
${footer()}
<script src="/static/main.js"></script>
</body>
</html>`
}

function header() {
  return `
<header class="site-header" id="siteHeader">
  <div class="header-inner">
    <a href="/" class="logo">
      <img src="/static/logo.png" alt="i2m2" class="logo-img">
    </a>
    <nav class="gnav" id="gnav">
      <ul class="gnav-list">
        <li class="gnav-item">
          <a href="/company">会社情報</a>
        </li>
        <li class="gnav-item">
          <a href="/services">事業内容</a>
        </li>
        <li class="gnav-item"><a href="/cases">実績</a></li>
        <li class="gnav-item"><a href="/ir">企業情報</a></li>
        <li class="gnav-item"><a href="/recruit">採用</a></li>
      </ul>
    </nav>
    <a href="/contact" class="header-cta">お問い合わせ</a>
    <button class="hamburger" id="hamburger" aria-label="メニュー">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
<div class="mobile-nav" id="mobileNav">
  <nav>
    <ul class="mobile-nav-list">
      <li><a href="/company">会社情報</a></li>
      <li><a href="/services">事業内容</a></li>
      <li><a href="/cases">実績</a></li>
      <li><a href="/ir">企業情報</a></li>
      <li><a href="/recruit">採用</a></li>
      <li><a href="/contact" class="mobile-cta">お問い合わせ</a></li>
    </ul>
  </nav>
</div>`
}

function footer() {
  return `
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <a href="/" class="footer-logo"><img src="/static/logo.png" alt="i2m2" class="footer-logo-img"></a>
        <p class="footer-tagline">Bonanza: Fortune Smiles!</p>
        <p class="footer-desc">ヘルスケア・医療領域を中心に、<br>地域価値創造（RVC）事業を通じて企業と地域社会の成長を支援します。</p>
        <p class="footer-desc" style="margin-top:8px;">Email: info@i2m2.com</p>
      </div>
      <div class="footer-links">
        <div class="footer-col">
          <h4>事業内容</h4>
          <ul>
            <li><a href="/services">事業一覧（RVC）</a></li>
            <li><a href="/cases">実績</a></li>
            <li><a href="/ir">企業情報</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>企業情報</h4>
          <ul>
            <li><a href="/company">会社概要</a></li>
            <li><a href="/company/message">代表メッセージ</a></li>
            <li><a href="/ir">企業情報</a></li>
            <li><a href="/recruit">採用情報</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>本社所在地</h4>
          <ul>
            <li class="footer-address">〒106-6137<br>東京都港区六本木6丁目10-1<br>六本木ヒルズ森タワー37F</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-legal">
        <a href="/legal">プライバシーポリシー</a>
        <a href="/legal/terms">利用規約</a>
        <a href="/legal/tokutei">特定商取引法に基づく表記</a>
      </div>
      <p class="footer-copy">&copy; 2025 i2m2 Co., Ltd.</p>
    </div>
  </div>
</footer>`
}

export function esc(s: any): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function sectionTitle(en: string, ja: string) {
  return `<div class="section-title" data-reveal><span class="section-title-en">${esc(en)}</span><h2 class="section-title-ja">${esc(ja)}</h2></div>`
}

export function ctaSection(options?: { title?: string; buttons?: { label: string; href: string; primary?: boolean }[] }) {
  const title = options?.title || 'お気軽にご相談ください'
  const buttons = options?.buttons || [
    { label: '無料相談はこちら', href: '/contact', primary: true },
    { label: '会社概要', href: '/company' }
  ]
  return `
<section class="cta-section">
  <div class="container">
    <h2 class="cta-title">${esc(title)}</h2>
    <p class="cta-desc">ヘルスケア・医療に関わるあらゆるご相談を承ります。</p>
    <div class="cta-buttons">
      ${buttons.map(b => `<a href="${b.href}" class="btn ${b.primary ? 'btn-primary' : 'btn-outline'}">${esc(b.label)}</a>`).join('')}
    </div>
  </div>
</section>`
}

export function breadcrumb(items: { label: string; href?: string }[]) {
  return `
<nav class="breadcrumb" aria-label="パンくず">
  <div class="container">
    <ol>
      <li><a href="/">ホーム</a></li>
      ${items.map((item, i) => i === items.length - 1
        ? `<li aria-current="page">${esc(item.label)}</li>`
        : `<li><a href="${item.href}">${esc(item.label)}</a></li>`
      ).join('')}
    </ol>
  </div>
</nav>`
}
