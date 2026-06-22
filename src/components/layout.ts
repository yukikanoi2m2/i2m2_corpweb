// Common layout for the corporate site
export function layout(title: string, content: string, options?: { description?: string }) {
  const desc = options?.description || 'M&A・広告・医療機器代理店事業を展開する法人向け総合支援企業のコーポレートサイト'
  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} | 株式会社サンプル</title>
<meta name="description" content="${esc(desc)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
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
      <span class="logo-text">CORP<span class="logo-accent">.</span></span>
    </a>
    <nav class="gnav" id="gnav">
      <ul class="gnav-list">
        <li class="gnav-item has-sub">
          <a href="/company">会社情報</a>
          <ul class="gnav-sub">
            <li><a href="/company">会社概要</a></li>
            <li><a href="/company/message">代表メッセージ</a></li>
            <li><a href="/company/philosophy">経営理念</a></li>
            <li><a href="/company/history">沿革</a></li>
          </ul>
        </li>
        <li class="gnav-item has-sub">
          <a href="/services">事業内容</a>
          <ul class="gnav-sub">
            <li><a href="/ma">M&A支援</a></li>
            <li><a href="/marketing">広告・マーケティング支援</a></li>
            <li><a href="/medical-equipment">医療機器代理店</a></li>
            <li><a href="/medical-management">医療経営支援</a></li>
          </ul>
        </li>
        <li class="gnav-item"><a href="/cases">実績・事例</a></li>
        <li class="gnav-item"><a href="/resources">資料ダウンロード</a></li>
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
      <li><a href="/ma">M&A支援</a></li>
      <li><a href="/marketing">広告支援</a></li>
      <li><a href="/medical-equipment">医療機器代理店</a></li>
      <li><a href="/medical-management">医療経営支援</a></li>
      <li><a href="/cases">実績・事例</a></li>
      <li><a href="/resources">資料ダウンロード</a></li>
      <li><a href="/news">お知らせ</a></li>
      <li><a href="/recruit">採用情報</a></li>
      <li><a href="/faq">よくある質問</a></li>
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
        <a href="/" class="footer-logo">CORP<span class="logo-accent">.</span></a>
        <p class="footer-desc">M&A・広告・医療機器代理店事業を展開し、<br>医療・ヘルスケア領域を中心に法人の成長を総合的に支援します。</p>
      </div>
      <div class="footer-links">
        <div class="footer-col">
          <h4>事業内容</h4>
          <ul>
            <li><a href="/ma">M&A支援</a></li>
            <li><a href="/marketing">広告・マーケティング支援</a></li>
            <li><a href="/medical-equipment">医療機器代理店</a></li>
            <li><a href="/medical-management">医療経営支援</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>会社情報</h4>
          <ul>
            <li><a href="/company">会社概要</a></li>
            <li><a href="/company/message">代表メッセージ</a></li>
            <li><a href="/company/philosophy">経営理念</a></li>
            <li><a href="/company/history">沿革</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>その他</h4>
          <ul>
            <li><a href="/cases">実績・事例</a></li>
            <li><a href="/resources">資料ダウンロード</a></li>
            <li><a href="/columns">コラム</a></li>
            <li><a href="/news">お知らせ</a></li>
            <li><a href="/recruit">採用情報</a></li>
            <li><a href="/faq">よくある質問</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>お問い合わせ</h4>
          <ul>
            <li><a href="/contact">総合お問い合わせ</a></li>
            <li><a href="/contact/ma">M&A無料相談</a></li>
            <li><a href="/contact/marketing">広告相談</a></li>
            <li><a href="/contact/medical">医療機器相談</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-legal">
        <a href="/legal">プライバシーポリシー</a>
        <a href="/legal/antisocial">反社会的勢力排除方針</a>
        <a href="/legal/security">情報セキュリティ方針</a>
      </div>
      <p class="footer-copy">&copy; 2024 株式会社サンプル All Rights Reserved.</p>
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
    { label: '資料ダウンロード', href: '/resources' }
  ]
  return `
<section class="cta-section">
  <div class="container">
    <h2 class="cta-title">${esc(title)}</h2>
    <p class="cta-desc">まずはお気軽にお問い合わせください。専門スタッフが丁寧にご対応いたします。</p>
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
