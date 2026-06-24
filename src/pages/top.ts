import type { Context } from 'hono'
import { layout } from '../components/layout'

export const topPage = (c: Context) => {
  return c.html(layout('地域価値創造事業', `
<!-- Side Navigation (donuts-style) -->
<nav class="l-nav">
  <ul class="l-nav__list">
    <li class="l-nav__item active"><a class="l-nav__link" href="#front-main">TOP</a></li>
    <li class="l-nav__item"><a class="l-nav__link" href="#front-about">ABOUT</a></li>
    <li class="l-nav__item"><a class="l-nav__link" href="#front-services">SERVICES</a></li>
    <li class="l-nav__item"><a class="l-nav__link" href="#front-results">RESULTS</a></li>
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
            ヘルスケアから、地域の未来を創る —i2m2—
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
              <div class="p-bar__more"><a href="/ir" class="p-bar__more-link">view all</a></div>
            </div>
            <div class="p-bar__body">
              <div class="p-bar__ticker">
                <div class="p-bar__ticker-track">
                  <a class="p-bar__item" href="/ir">
                    <span class="p-bar__date">2025.06.01</span>
                    <span class="p-bar__label" style="background:#b8860b">IR</span>
                    <span class="p-bar__title">六本木ヒルズ森タワー37Fにオフィスを開設</span>
                  </a>
                  <a class="p-bar__item" href="/ir">
                    <span class="p-bar__date">2025.05.15</span>
                    <span class="p-bar__label" style="background:#2563a8">事業</span>
                    <span class="p-bar__title">医療DX（カルテ電子化）サービス提供開始</span>
                  </a>
                  <a class="p-bar__item" href="/ir">
                    <span class="p-bar__date">2025.03.10</span>
                    <span class="p-bar__label" style="background:#b8860b">IR</span>
                    <span class="p-bar__title">累計取扱高20億円を突破</span>
                  </a>
                  <!-- Duplicated for seamless loop -->
                  <a class="p-bar__item" href="/ir">
                    <span class="p-bar__date">2025.06.01</span>
                    <span class="p-bar__label" style="background:#b8860b">IR</span>
                    <span class="p-bar__title">六本木ヒルズ森タワー37Fにオフィスを開設</span>
                  </a>
                  <a class="p-bar__item" href="/ir">
                    <span class="p-bar__date">2025.05.15</span>
                    <span class="p-bar__label" style="background:#2563a8">事業</span>
                    <span class="p-bar__title">医療DX（カルテ電子化）サービス提供開始</span>
                  </a>
                  <a class="p-bar__item" href="/ir">
                    <span class="p-bar__date">2025.03.10</span>
                    <span class="p-bar__label" style="background:#b8860b">IR</span>
                    <span class="p-bar__title">累計取扱高20億円を突破</span>
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
            <span class="c-text-letters js-text-letters">CHANGE THE GAME</span>
          </h2>
          <p class="c-heading-sub p-front-about__text">
            事業領域に制限はなく、<br>ヘルスケアを起点にさまざまな可能性を追求する
          </p>
        </div>
        <a href="/company" class="c-btn">
          <span class="c-btn__inner">COMPANY PROFILE <span class="c-arrow"></span></span>
        </a>
        <div class="p-front-about__stats">
          <div class="p-stat-item">
            <strong class="p-stat-num" data-target="20">0</strong>
            <span class="p-stat-unit">億円+</span>
            <span class="p-stat-label">累計取扱高</span>
          </div>
          <div class="p-stat-item">
            <strong class="p-stat-num" data-target="1000">0</strong>
            <span class="p-stat-unit">件+</span>
            <span class="p-stat-label">グループ総取引</span>
          </div>
          <div class="p-stat-item">
            <strong class="p-stat-num" data-target="100">0</strong>
            <span class="p-stat-unit">社+</span>
            <span class="p-stat-label">取引先企業</span>
          </div>
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
        <p class="c-heading-sub c-heading-sub--large">M&A・医療マーケ・人材・DX<br class="u-sp-only">ワンストップで地域価値を創出</p>
        <h2 class="c-heading c-heading--1">
          <span class="c-text-letters js-text-letters">SERVICES</span>
        </h2>
        <div class="c-card-slider">
          <button class="c-pager-btn c-pager-btn--prev js-slider-prev" aria-label="前へ">
            <span class="c-arrow c-arrow--prev"></span>
          </button>
          <div class="c-card-slider__inner">
            <div class="c-card-slider__track js-card-track">
              <!-- Card 1 -->
              <section class="c-card">
                <a class="c-card__inner" href="/services">
                  <div class="c-card__thumb c-card__thumb--radius">
                    <img src="/static/images/healthcare-dashboard.jpg" alt="Healthcare Marketing" class="c-card__thumb-placeholder">
                  </div>
                  <div class="c-card__title">IHG™ Healthcare Services</div>
                  <div class="c-card__content">医療機関プロデュース — 広告運用・コンサル・カルテ電子化（医療DX）・補助金支援</div>
                </a>
              </section>
              <!-- Card 2 -->
              <section class="c-card">
                <a class="c-card__inner" href="/services">
                  <div class="c-card__thumb c-card__thumb--radius">
                    <img src="/static/images/hero-meeting.jpg" alt="Healthcare Talent" class="c-card__thumb-placeholder">
                  </div>
                  <div class="c-card__title">DR-LINK™ Healthcare Talent</div>
                  <div class="c-card__content">医療系人材マッチング — 医師・看護師・薬剤師の転職・紹介</div>
                </a>
              </section>
              <!-- Card 3 -->
              <section class="c-card">
                <a class="c-card__inner" href="/services">
                  <div class="c-card__thumb c-card__thumb--radius">
                    <img src="/static/images/contract-signing.jpg" alt="M&A" class="c-card__thumb-placeholder">
                  </div>
                  <div class="c-card__title">RVC Community Value</div>
                  <div class="c-card__content">M&amp;A仲介・事業承継・事業再生 — 地域価値創造ファンド</div>
                </a>
              </section>
              <!-- Card 4 -->
              <section class="c-card">
                <a class="c-card__inner" href="/services">
                  <div class="c-card__thumb c-card__thumb--radius">
                    <img src="/static/images/dx-dashboard.jpg" alt="Medical DX" class="c-card__thumb-placeholder">
                  </div>
                  <div class="c-card__title">カルテ電子化（医療DX）</div>
                  <div class="c-card__content">予約・内診・オンライン診療・経営分析まで一元化できるクラウド型電子カルテ</div>
                </a>
              </section>
              <!-- Card 5 -->
              <section class="c-card">
                <a class="c-card__inner" href="/services">
                  <div class="c-card__thumb c-card__thumb--radius">
                    <img src="/static/images/city-connection.jpg" alt="Marketing" class="c-card__thumb-placeholder">
                  </div>
                  <div class="c-card__title">広告運用・マーケティング</div>
                  <div class="c-card__content">5,000万円+の広告運用実績。医療特化のリスティング・SNS・MEO対策</div>
                </a>
              </section>
              <!-- Card 6 -->
              <section class="c-card">
                <a class="c-card__inner" href="/services">
                  <div class="c-card__thumb c-card__thumb--radius">
                    <img src="/static/images/business-negotiation.jpg" alt="Consulting" class="c-card__thumb-placeholder">
                  </div>
                  <div class="c-card__title">補助金・融資コンサルティング</div>
                  <div class="c-card__content">補助金申請支援・融資サポート・事業計画策定</div>
                </a>
              </section>
              <!-- Card 7 -->
              <section class="c-card">
                <a class="c-card__inner" href="/services">
                  <div class="c-card__thumb c-card__thumb--radius">
                    <img src="/static/images/city-arc.jpg" alt="Global Expansion" class="c-card__thumb-placeholder">
                  </div>
                  <div class="c-card__title">海外展開支援 (4everclinic)</div>
                  <div class="c-card__content">アジア圏への医療機関進出コンサルティング</div>
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
        <p class="c-heading-sub c-heading-sub--large">全ての関わる人に幸運と繁栄を。<br class="u-sp-only">地域社会の価値を高めるインフラへ。</p>
        <h2 class="c-heading c-heading--1">
          <span class="c-text-letters js-text-letters">TRACK RECORD</span>
        </h2>
        <div class="p-results-grid">
          <div class="p-result-card">
            <strong class="p-result-num" data-target="20">0</strong>
            <span class="p-result-unit">億円</span>
            <span class="p-result-label">累計取扱高</span>
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
          <div class="p-result-card">
            <strong class="p-result-num" data-target="5000">0</strong>
            <span class="p-result-unit">万円+</span>
            <span class="p-result-label">広告運用額</span>
          </div>
        </div>
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
          価値が残り続けるものを創る、<br>世界を変える挑戦をしよう
        </p>
        <div class="p-front-recruit__actions">
          <a href="/recruit" class="c-btn c-btn--primary">
            <span class="c-btn__inner">RECRUIT <span class="c-arrow"></span></span>
          </a>
          <a href="/contact" class="c-btn">
            <span class="c-btn__inner">CONTACT <span class="c-arrow"></span></span>
          </a>
        </div>
      </div>
    </div>
  </section>
</article>
`))
}
