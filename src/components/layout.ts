// i2m2 Corporate Site - Layout Component
export function layout(title: string, content: string, options?: { description?: string }) {
  const desc = options?.description || 'i2m2株式会社 | ヘルスケア・医療領域の総合支援企業。M&A仲介、医療マーケティング、人材紹介、医療DXなど地域価値創造事業（RVC）を展開。'
  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} | i2m2株式会社</title>
<meta name="description" content="${esc(desc)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='28' font-size='28' font-weight='bold' fill='%2300d4ff'>i</text></svg>" type="image/svg+xml">
<link href="/static/style.css" rel="stylesheet">
</head>
<body>
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
      <span class="logo-mark">i2m2</span>
      <span class="logo-sub">Bonanza</span>
    </a>
    <nav class="gnav" id="gnav">
      <ul class="gnav-list">
        <li class="gnav-item has-sub">
          <a href="/company">会社情報</a>
          <ul class="gnav-sub">
            <li><a href="/company">会社概要</a></li>
            <li><a href="/company/message">代表メッセージ</a></li>
            <li><a href="/company/philosophy">ミッション</a></li>
            <li><a href="/company/history">沿革</a></li>
          </ul>
        </li>
        <li class="gnav-item has-sub">
          <a href="/services">事業内容</a>
          <ul class="gnav-sub">
            <li><a href="/healthcare">医療機関プロデュース</a></li>
            <li><a href="/talent">医療系人材マッチング</a></li>
            <li><a href="/ma">地域価値創造事業（RVC）</a></li>
            <li><a href="/beauty">美容サロンプロデュース</a></li>
          </ul>
        </li>
        <li class="gnav-item"><a href="/cases">実績</a></li>
        <li class="gnav-item"><a href="/news">お知らせ</a></li>
        <li class="gnav-item"><a href="/recruit">採用情報</a></li>
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
    <ul>
      <li><a href="/">トップ</a></li>
      <li><a href="/company">会社情報</a></li>
      <li><a href="/services">事業内容</a></li>
      <li><a href="/healthcare">医療機関プロデュース</a></li>
      <li><a href="/talent">医療系人材マッチング</a></li>
      <li><a href="/ma">地域価値創造事業（RVC）</a></li>
      <li><a href="/beauty">美容サロンプロデュース</a></li>
      <li><a href="/cases">実績</a></li>
      <li><a href="/news">お知らせ</a></li>
      <li><a href="/recruit">採用情報</a></li>
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
        <a href="/" class="footer-logo">i2m2</a>
        <p class="footer-tagline">Bonanza: Fortune Smiles!</p>
        <p class="footer-desc">ヘルスケア・医療領域を中心に、<br>地域価値創造（RVC）事業を通じて企業と地域社会の成長を支援します。</p>
      </div>
      <div class="footer-links">
        <div class="footer-col">
          <h4>展開事業</h4>
          <ul>
            <li><a href="/healthcare">医療機関プロデュース</a></li>
            <li><a href="/talent">医療系人材マッチング</a></li>
            <li><a href="/ma">地域価値創造事業（RVC）</a></li>
            <li><a href="/beauty">美容サロンプロデュース</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>会社情報</h4>
          <ul>
            <li><a href="/company">会社概要</a></li>
            <li><a href="/company/message">代表メッセージ</a></li>
            <li><a href="/company/philosophy">ミッション</a></li>
            <li><a href="/company/history">沿革</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>その他</h4>
          <ul>
            <li><a href="/cases">実績</a></li>
            <li><a href="/news">お知らせ</a></li>
            <li><a href="/recruit">採用情報</a></li>
            <li><a href="/contact">お問い合わせ</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>アクセス</h4>
          <ul>
            <li class="footer-address">〒106-6137<br>東京都港区六本木6丁目10-1<br>六本木ヒルズ森タワー37F</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-legal">
        <a href="/legal">プライバシーポリシー</a>
        <a href="/legal/terms">サービス利用規約</a>
      </div>
      <p class="footer-copy">&copy; 2025 i2m2 Co.,Ltd. All Rights Reserved.</p>
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

// Section components
export function sectionTitle(en: string, ja: string) {
  return `<div class="section-title"><span class="section-title-en">${esc(en)}</span><h2 class="section-title-ja">${esc(ja)}</h2></div>`
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
    <p class="cta-desc">ヘルスケア・医療に関わるあらゆるご相談を承ります。まずはお気軽にお問い合わせください。</p>
    <div class="cta-buttons">
      ${buttons.map(b => `<a href="${b.href}" class="btn ${b.primary ? 'btn-primary' : 'btn-outline'}">${esc(b.label)}</a>`).join('')}
    </div>
  </div>
</section>`
}

export function breadcrumb(items: { label: string; href?: string }[]) {
  return `
<nav class="breadcrumb" aria-label="パンくず">
  <ol>
    <li><a href="/">ホーム</a></li>
    ${items.map((item, i) => i === items.length - 1
      ? `<li aria-current="page">${esc(item.label)}</li>`
      : `<li><a href="${item.href}">${esc(item.label)}</a></li>`
    ).join('')}
  </ol>
</nav>`
}
