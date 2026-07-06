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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" class="p-japan-map" aria-label="日本地図 グループ展開エリア">
              <!-- Hokkaido -->
              <path class="p-map-region" d="M570,120 C590,100 630,90 660,100 C690,110 710,130 720,160 C730,190 720,220 700,240 C680,255 650,260 620,250 C590,240 570,220 560,195 C550,170 555,140 570,120Z"/>
              <!-- Tohoku -->
              <path class="p-map-region p-map-region--active" d="M580,280 C600,270 620,275 635,290 C650,305 660,325 660,350 C660,375 655,400 640,420 C625,435 605,440 585,430 C565,420 555,400 550,375 C545,350 550,320 560,300 C565,288 572,282 580,280Z"/>
              <!-- Kanto -->
              <path class="p-map-region p-map-region--active" d="M540,435 C565,425 590,430 610,445 C630,460 640,480 635,500 C630,520 615,535 595,540 C575,545 555,540 540,525 C525,510 520,490 525,470 C530,452 535,442 540,435Z"/>
              <!-- Chubu -->
              <path class="p-map-region" d="M470,400 C500,390 530,395 550,410 C565,425 570,445 560,465 C550,485 530,495 505,495 C480,495 460,485 450,465 C440,445 445,420 460,405 C463,402 467,400 470,400Z"/>
              <!-- Kansai -->
              <path class="p-map-region p-map-region--active" d="M430,500 C455,492 480,498 498,515 C515,530 520,550 515,570 C510,590 495,600 475,605 C455,608 435,600 420,585 C405,570 402,550 408,530 C414,512 422,504 430,500Z"/>
              <!-- Chugoku -->
              <path class="p-map-region" d="M340,520 C370,512 400,518 420,535 C435,548 438,565 430,582 C420,598 400,608 378,608 C355,608 335,598 325,580 C315,562 318,540 330,525 C333,522 337,520 340,520Z"/>
              <!-- Shikoku -->
              <path class="p-map-region" d="M380,615 C405,608 430,615 448,630 C462,642 465,658 458,672 C450,686 432,692 412,690 C392,688 375,678 368,662 C360,645 365,625 375,618 C377,616 378,615 380,615Z"/>
              <!-- Kyushu -->
              <path class="p-map-region p-map-region--active" d="M280,590 C310,580 340,588 358,608 C375,625 378,648 370,670 C362,692 345,710 322,718 C300,725 278,720 262,705 C245,690 240,668 245,648 C250,625 260,605 272,595 C275,592 278,590 280,590Z"/>
              <!-- Okinawa -->
              <path class="p-map-region p-map-region--active" d="M220,850 C235,842 252,845 265,855 C275,865 278,878 272,892 C265,905 252,912 238,910 C224,908 212,898 208,885 C204,870 210,855 220,850Z"/>
              
              <!-- Gold dots for active locations -->
              <circle class="p-map-dot p-map-dot--pulse" cx="580" cy="480" r="10"/><!-- Kanto -->
              <circle class="p-map-dot" cx="600" cy="350" r="8"/><!-- Tohoku -->
              <circle class="p-map-dot" cx="470" cy="550" r="8"/><!-- Kansai -->
              <circle class="p-map-dot" cx="245" cy="875" r="8"/><!-- Okinawa -->
              
              <!-- Connection lines -->
              <line class="p-map-line" x1="580" y1="480" x2="600" y2="350"/>
              <line class="p-map-line" x1="580" y1="480" x2="470" y2="550"/>
              <line class="p-map-line" x1="470" y1="550" x2="320" y2="650"/>
              <line class="p-map-line" x1="320" y1="650" x2="245" y2="875"/>
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
              <span class="p-network-stat__icon"><i class="fas fa-briefcase"></i></span>
              <div class="p-network-stat__body">
                <strong class="p-network-stat__num">5</strong><span class="p-network-stat__unit">ブランド</span>
                <span class="p-network-stat__label">展開サービス</span>
              </div>
            </div>
            <div class="p-network-stat">
              <span class="p-network-stat__icon"><i class="fas fa-rocket"></i></span>
              <div class="p-network-stat__body">
                <strong class="p-network-stat__num">14</strong><span class="p-network-stat__unit">ヶ月</span>
                <span class="p-network-stat__label">創業からの期間</span>
              </div>
            </div>
            <div class="p-network-stat">
              <span class="p-network-stat__icon"><i class="fas fa-users"></i></span>
              <div class="p-network-stat__body">
                <strong class="p-network-stat__num">200</strong><span class="p-network-stat__unit">名+</span>
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
`, { description: '株式会社イズムズ（i2m2）は医療マーケティング・人材・M&A・DXをワンストップで提供するヘルスケア特化の総合支援会社。創業1年3ヶ月でグループ社員200名・総売上20億円突破。', fullTitle: '株式会社イズムズ｜コーポレートサイト' }))
}
