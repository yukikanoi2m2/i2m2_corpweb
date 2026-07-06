import type { Context } from 'hono'
import { layout } from '../components/layout'

export const topPage = (c: Context) => {
  return c.html(layout('TOP', `
<!-- Side Navigation (donuts-style) -->
<nav class="l-nav">
  <ul class="l-nav__list">
    <li class="l-nav__item active"><a class="l-nav__link" href="#front-main">TOP</a></li>
    <li class="l-nav__item"><a class="l-nav__link" href="#front-about">ABOUT</a></li>
    <li class="l-nav__item"><a class="l-nav__link" href="#front-services">SERVICES</a></li>
    <li class="l-nav__item"><a class="l-nav__link" href="#front-results">RESULTS</a></li>
    <li class="l-nav__item"><a class="l-nav__link" href="#front-network">NETWORK</a></li>
    <li class="l-nav__item"><a class="l-nav__link" href="#front-recruit">RECRUIT</a></li>
  </ul>
</nav>

<!-- Noise texture background -->
<canvas class="c-background-noise c-background-noise--fixed"></canvas>

<article>
  <!-- ========================================
       SECTION: MAIN / HERO (full viewport)
       ======================================== -->
  <section id="front-main" class="p-snap-section">
    <div class="p-slide-section p-front-main">
      <div class="p-slide-section__bg" style="background:url('/static/images/tokyo-night.jpg') center/cover no-repeat;opacity:.3;"></div>
      <div class="p-slide-section__body p-slide-section__body--center">
        <div class="p-front-main__logo">
          <img src="/static/logo.png" alt="i2m2" class="p-front-main__logo-img">
        </div>
        <div class="p-front-main__body">
          <h2 class="p-front-main__heading c-heading">
            <span class="c-text-letters js-text-letters">REGIONAL VALUE<br class="u-sp-only"> CREATION</span>
          </h2>
          <p class="c-heading-sub p-front-main__sub-text">
            地域の価値を、医療から。
          </p>
          <div class="p-front-main__scroll-icon">
            <button class="c-scroll-icon__button" aria-label="次のセクションへ">
              <span>Scroll</span>
            </button>
          </div>
        </div>
        <!-- NEWS ticker -->
        <div class="p-front-main__foot">
          <div class="p-bar">
            <div class="p-bar__head">
              <div class="p-bar__heading">NEWS</div>
              <div class="p-bar__more"><a href="/news" class="p-bar__more-link">view all</a></div>
            </div>
            <div class="p-bar__body">
              <div class="p-bar__ticker">
                <div class="p-bar__ticker-track">
                  <a class="p-bar__item" href="/news">
                    <span class="p-bar__date">2026.06</span>
                    <span class="p-bar__label" style="background:#b8860b">IR</span>
                    <span class="p-bar__title">グループ社員200名突破・総売上20億円達成</span>
                  </a>
                  <a class="p-bar__item" href="/news">
                    <span class="p-bar__date">2026.04</span>
                    <span class="p-bar__label" style="background:#2563a8">事業</span>
                    <span class="p-bar__title">補助金コンサルティングサービス提供開始</span>
                  </a>
                  <a class="p-bar__item" href="/news">
                    <span class="p-bar__date">2025.12</span>
                    <span class="p-bar__label" style="background:#2563a8">事業</span>
                    <span class="p-bar__title">M&amp;A仲介・事業承継支援サービスリリース</span>
                  </a>
                  <!-- Duplicated for seamless loop -->
                  <a class="p-bar__item" href="/news">
                    <span class="p-bar__date">2026.06</span>
                    <span class="p-bar__label" style="background:#b8860b">IR</span>
                    <span class="p-bar__title">グループ社員200名突破・総売上20億円達成</span>
                  </a>
                  <a class="p-bar__item" href="/news">
                    <span class="p-bar__date">2026.04</span>
                    <span class="p-bar__label" style="background:#2563a8">事業</span>
                    <span class="p-bar__title">補助金コンサルティングサービス提供開始</span>
                  </a>
                  <a class="p-bar__item" href="/news">
                    <span class="p-bar__date">2025.12</span>
                    <span class="p-bar__label" style="background:#2563a8">事業</span>
                    <span class="p-bar__title">M&amp;A仲介・事業承継支援サービスリリース</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================
       SECTION: ABOUT
       ======================================== -->
  <section id="front-about" class="p-snap-section">
    <div class="p-slide-section p-front-about">
      <div class="p-slide-section__bg p-front-about__bg"></div>
      <div class="p-slide-section__body p-slide-section__body--center">
        <div>
          <h2 class="c-heading">
            <span class="c-text-letters js-text-letters">CREATE LOCAL VALUE</span>
          </h2>
          <p class="c-heading-sub p-front-about__text">
            医療を起点に、<br>地域の未来をつくる。
          </p>
        </div>
        <a href="/company" class="c-btn">
          <span class="c-btn__inner">COMPANY PROFILE <span class="c-arrow"></span></span>
        </a>
        <div class="p-front-about__brands">
          <a href="https://medreach.i2m2.com/" class="p-brand-item" target="_blank" rel="noopener">
            <span class="p-brand-item__name">MedReach&trade;</span>
            <span class="p-brand-item__desc">医療マーケティング</span>
          </a>
          <a href="https://karteo.i2m2.com/" class="p-brand-item" target="_blank" rel="noopener">
            <span class="p-brand-item__name">karteo&trade;</span>
            <span class="p-brand-item__desc">カルテDX</span>
          </a>
          <a href="https://growfund.i2m2.com/" class="p-brand-item" target="_blank" rel="noopener">
            <span class="p-brand-item__name">GrowFund&trade;</span>
            <span class="p-brand-item__desc">補助金・融資</span>
          </a>
          <a href="https://dr-link.i2m2.com/" class="p-brand-item" target="_blank" rel="noopener">
            <span class="p-brand-item__name">DR-LINK&trade;</span>
            <span class="p-brand-item__desc">医療人材</span>
          </a>
          <a href="https://tsumugi-partners.i2m2.com/" class="p-brand-item" target="_blank" rel="noopener">
            <span class="p-brand-item__name">つむぎパートナーズ</span>
            <span class="p-brand-item__desc">M&amp;A・事業承継</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================
       SECTION: SERVICES (card slider — donuts style)
       ======================================== -->
  <section id="front-services" class="p-snap-section">
    <div class="p-slide-section p-front-services">
      <div class="p-slide-section__bg p-front-services__bg"></div>
      <div class="p-slide-section__body p-slide-section__body--cards">
        <p class="c-heading-sub c-heading-sub--large">M&A・マーケ・人材・DX<br class="u-sp-only">ひとつの窓口で。</p>
        <h2 class="c-heading c-heading--1">
          <span class="c-text-letters js-text-letters">SERVICES</span>
        </h2>
        <div class="c-card-slider">
          <button class="c-pager-btn c-pager-btn--prev js-slider-prev" aria-label="前へ">
            <span class="c-arrow c-arrow--prev"></span>
          </button>
          <div class="c-card-slider__inner">
            <div class="c-card-slider__track js-card-track">
              <!-- Card 1: MedReach -->
              <section class="c-card">
                <a class="c-card__inner" href="https://medreach.i2m2.com" target="_blank" rel="noopener">
                  <div class="c-card__thumb c-card__thumb--radius">
                    <img src="/static/images/healthcare-dashboard.jpg" alt="MedReach" class="c-card__thumb-placeholder">
                  </div>
                  <div class="c-card__title">MedReach™</div>
                  <div class="c-card__content">医療マーケティング・広告運用</div>
                </a>
              </section>
              <!-- Card 2: karteo -->
              <section class="c-card">
                <a class="c-card__inner" href="https://karteo.i2m2.com" target="_blank" rel="noopener">
                  <div class="c-card__thumb c-card__thumb--radius">
                    <img src="/static/images/dx-dashboard.jpg" alt="karteo" class="c-card__thumb-placeholder">
                  </div>
                  <div class="c-card__title">karteo™</div>
                  <div class="c-card__content">紙カルテ・スキャン・OCR電子保存</div>
                </a>
              </section>
              <!-- Card 3: GrowFund -->
              <section class="c-card">
                <a class="c-card__inner" href="https://growfund.i2m2.com" target="_blank" rel="noopener">
                  <div class="c-card__thumb c-card__thumb--radius">
                    <img src="/static/images/contract-signing.jpg" alt="GrowFund" class="c-card__thumb-placeholder">
                  </div>
                  <div class="c-card__title">GrowFund™</div>
                  <div class="c-card__content">補助金・融資活用コンサルティング</div>
                </a>
              </section>
              <!-- Card 4: DR-LINK -->
              <section class="c-card">
                <a class="c-card__inner" href="https://dr-link.i2m2.com" target="_blank" rel="noopener">
                  <div class="c-card__thumb c-card__thumb--radius">
                    <img src="/static/images/hero-meeting.jpg" alt="DR-LINK" class="c-card__thumb-placeholder">
                  </div>
                  <div class="c-card__title">DR-LINK™</div>
                  <div class="c-card__content">医療系人材マッチング</div>
                </a>
              </section>
              <!-- Card 5: つむぎパートナーズ -->
              <section class="c-card">
                <a class="c-card__inner" href="https://tsumugi-partners.i2m2.com" target="_blank" rel="noopener">
                  <div class="c-card__thumb c-card__thumb--radius">
                    <img src="/static/images/city-arc.jpg" alt="つむぎパートナーズ" class="c-card__thumb-placeholder">
                  </div>
                  <div class="c-card__title">つむぎパートナーズ</div>
                  <div class="c-card__content">M&amp;A・事業承継・事業再生</div>
                </a>
              </section>

            </div>
          </div>
          <button class="c-pager-btn c-pager-btn--next js-slider-next" aria-label="次へ">
            <span class="c-arrow c-arrow--next"></span>
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================
       SECTION: RESULTS (Track Record)
       ======================================== -->
  <section id="front-results" class="p-snap-section">
    <div class="p-slide-section p-front-results">
      <div class="p-slide-section__bg p-front-results__bg" style="background:url('/static/images/business-negotiation.jpg') center/cover no-repeat;opacity:.15;"></div>
      <div class="p-slide-section__body p-slide-section__body--center">
        <p class="c-heading-sub c-heading-sub--large">数字が証明する、<br class="u-sp-only">i2m2の地域への貢献。</p>
        <h2 class="c-heading c-heading--1">
          <span class="c-text-letters js-text-letters">TRACK RECORD</span>
        </h2>
        <div class="p-results-grid">
          <div class="p-result-card">
            <strong class="p-result-num" data-target="20">0</strong>
            <span class="p-result-unit">億円+</span>
            <span class="p-result-label">総売上</span>
          </div>
          <div class="p-result-card">
            <strong class="p-result-num" data-target="1000">0</strong>
            <span class="p-result-unit">件+</span>
            <span class="p-result-label">グループ総取引</span>
          </div>
          <div class="p-result-card">
            <strong class="p-result-num" data-target="100">0</strong>
            <span class="p-result-unit">社+</span>
            <span class="p-result-label">取引先企業</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================
       SECTION: GROUP NETWORK (Japan Map)
       ======================================== -->
  <section id="front-network" class="p-snap-section">
    <div class="p-slide-section p-front-network">
      <div class="p-slide-section__bg" style="opacity:.05;"></div>
      <div class="p-slide-section__body p-slide-section__body--network">
        <p class="c-heading-sub c-heading-sub--large">全国の医療機関・企業を支援。</p>
        <h2 class="c-heading c-heading--1">
          <span class="c-text-letters js-text-letters">GROUP NETWORK</span>
        </h2>
        <div class="p-network-container">
          <!-- Japan Map SVG -->
          <div class="p-network-map">
            <svg viewBox="0 0 560 700" class="p-japan-map" aria-label="日本地図 グループ展開エリア">
              <!-- Simplified Japan outline paths -->
              <!-- Hokkaido -->
              <path class="p-map-region" d="M380,80 Q420,60 450,70 Q480,80 490,110 Q500,140 480,160 Q460,170 440,160 Q420,150 400,140 Q380,130 370,110 Q360,90 380,80Z" data-region="hokkaido"/>
              <!-- Tohoku -->
              <path class="p-map-region p-map-region--active" d="M390,175 Q410,170 420,180 Q435,190 440,210 Q445,230 440,250 Q435,270 420,280 Q405,285 395,275 Q385,265 380,245 Q375,225 378,205 Q380,185 390,175Z" data-region="tohoku"/>
              <!-- Kanto -->
              <path class="p-map-region p-map-region--active" d="M370,285 Q395,280 415,290 Q430,300 435,315 Q438,330 425,340 Q410,348 390,345 Q370,342 360,330 Q352,318 355,305 Q358,292 370,285Z" data-region="kanto"/>
              <!-- Chubu -->
              <path class="p-map-region" d="M330,270 Q355,265 370,280 Q380,290 375,305 Q370,320 355,330 Q340,338 320,335 Q300,330 295,315 Q290,300 300,285 Q310,272 330,270Z" data-region="chubu"/>
              <!-- Kansai -->
              <path class="p-map-region p-map-region--active" d="M295,330 Q315,325 330,335 Q345,345 345,360 Q345,375 330,382 Q315,388 300,385 Q285,380 278,368 Q272,355 278,342 Q284,332 295,330Z" data-region="kansai"/>
              <!-- Chugoku -->
              <path class="p-map-region" d="M235,345 Q260,340 278,350 Q290,358 288,372 Q285,385 270,390 Q255,394 240,390 Q225,385 220,372 Q215,360 222,350 Q228,342 235,345Z" data-region="chugoku"/>
              <!-- Shikoku -->
              <path class="p-map-region" d="M260,395 Q280,392 295,400 Q305,408 302,418 Q298,428 283,430 Q268,432 255,425 Q245,418 248,408 Q252,398 260,395Z" data-region="shikoku"/>
              <!-- Kyushu -->
              <path class="p-map-region p-map-region--active" d="M200,390 Q220,385 235,395 Q248,405 248,420 Q248,438 238,450 Q228,462 212,465 Q196,465 185,455 Q175,442 178,425 Q180,408 188,398 Q194,392 200,390Z" data-region="kyushu"/>
              <!-- Okinawa -->
              <path class="p-map-region p-map-region--active" d="M160,560 Q170,555 178,560 Q185,565 183,575 Q180,585 172,588 Q164,590 158,585 Q152,578 155,570 Q157,563 160,560Z" data-region="okinawa"/>
              
              <!-- Gold dots for active locations -->
              <circle class="p-map-dot p-map-dot--pulse" cx="400" cy="310" r="6"/><!-- Kanto HQ -->
              <circle class="p-map-dot" cx="410" cy="220" r="5"/><!-- Tohoku -->
              <circle class="p-map-dot" cx="310" cy="355" r="5"/><!-- Kansai -->
              <circle class="p-map-dot" cx="170" cy="575" r="5"/><!-- Okinawa -->
              
              <!-- Connection lines -->
              <line class="p-map-line" x1="400" y1="310" x2="410" y2="220"/>
              <line class="p-map-line" x1="400" y1="310" x2="310" y2="355"/>
              <line class="p-map-line" x1="310" y1="355" x2="220" y2="430"/>
              <line class="p-map-line" x1="220" y1="430" x2="170" y2="575"/>
            </svg>
          </div>
          <!-- Network Stats -->
          <div class="p-network-stats">
            <div class="p-network-stat">
              <span class="p-network-stat__icon"><i class="fas fa-map-marker-alt"></i></span>
              <div class="p-network-stat__body">
                <strong class="p-network-stat__num">4</strong><span class="p-network-stat__unit">エリア</span>
                <span class="p-network-stat__label">展開地域</span>
              </div>
            </div>
            <div class="p-network-stat">
              <span class="p-network-stat__icon"><i class="fas fa-hospital"></i></span>
              <div class="p-network-stat__body">
                <strong class="p-network-stat__num">200+</strong><span class="p-network-stat__unit">件</span>
                <span class="p-network-stat__label">支援医療機関</span>
              </div>
            </div>
            <div class="p-network-stat">
              <span class="p-network-stat__icon"><i class="fas fa-handshake"></i></span>
              <div class="p-network-stat__body">
                <strong class="p-network-stat__num">100+</strong><span class="p-network-stat__unit">社</span>
                <span class="p-network-stat__label">パートナー企業</span>
              </div>
            </div>
            <div class="p-network-stat">
              <span class="p-network-stat__icon"><i class="fas fa-users"></i></span>
              <div class="p-network-stat__body">
                <strong class="p-network-stat__num">200+</strong><span class="p-network-stat__unit">名</span>
                <span class="p-network-stat__label">グループ社員数</span>
              </div>
            </div>
            <div class="p-network-regions">
              <h3 class="p-network-regions__title">主要展開エリア</h3>
              <ul class="p-network-regions__list">
                <li class="p-network-regions__item p-network-regions__item--hq">
                  <span class="p-network-regions__dot"></span>
                  <span class="p-network-regions__name">関東（東京・神奈川）</span>
                </li>
                <li class="p-network-regions__item">
                  <span class="p-network-regions__dot"></span>
                  <span class="p-network-regions__name">東北（宮城・青森）</span>
                </li>
                <li class="p-network-regions__item">
                  <span class="p-network-regions__dot"></span>
                  <span class="p-network-regions__name">関西（大阪・兵庫）</span>
                </li>
                <li class="p-network-regions__item">
                  <span class="p-network-regions__dot"></span>
                  <span class="p-network-regions__name">九州（沖縄）</span>
                </li>
              </ul>
            </div>
            <div class="p-network-regions">
              <h3 class="p-network-regions__title">グループ企業</h3>
              <ul class="p-network-regions__list">
                <li class="p-network-regions__item p-network-regions__item--hq">
                  <span class="p-network-regions__dot"></span>
                  <span class="p-network-regions__name">医療法人白生会</span>
                </li>
                <li class="p-network-regions__item">
                  <span class="p-network-regions__dot"></span>
                  <span class="p-network-regions__name">有限会社福寿</span>
                </li>
                <li class="p-network-regions__item p-network-regions__item--etc">
                  <span class="p-network-regions__dot"></span>
                  <span class="p-network-regions__name">ほか複数社</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <a href="/cases" class="c-btn" style="margin-top:32px;">
          <span class="c-btn__inner">VIEW ALL CASES <span class="c-arrow"></span></span>
        </a>
      </div>
    </div>
  </section>

  <!-- ========================================
       SECTION: RECRUIT
       ======================================== -->
  <section id="front-recruit" class="p-snap-section">
    <div class="p-slide-section p-front-recruit">
      <div class="p-slide-section__bg p-front-recruit__bg"></div>
      <div class="p-slide-section__body p-slide-section__body--center">
        <h2 class="c-heading">
          <span class="c-text-letters js-text-letters">JOIN OUR TEAM</span>
        </h2>
        <p class="c-heading-sub">
          地域医療の未来を、<br>一緒につくりませんか。
        </p>
        <div class="p-front-recruit__actions">
          <a href="/recruit" class="c-btn c-btn--primary">
            <span class="c-btn__inner">RECRUIT <span class="c-arrow"></span></span>
          </a>
          <a href="/contact" class="c-btn">
            <span class="c-btn__inner">CONTACT <span class="c-arrow"></span></span>
          </a>
        </div>
        <p class="c-heading-sub" style="font-size:.85rem;opacity:.7;margin-top:24px;">まずはお気軽にご相談ください。<br>秘密厳守・2営業日以内にご返答します。</p>
      </div>
    </div>
  </section>
</article>
`, { description: '株式会社イズムズ（i2m2）はヘルスケアを起点にM&A・医療マーケティング・人材・DXをワンストップで提供。累計取扱高20億円以上。', fullTitle: '株式会社イズムズ｜コーポレートサイト' }))
}
