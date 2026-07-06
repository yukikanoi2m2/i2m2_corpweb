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
      <div class="p-front-network__bg"></div>
      <div class="p-slide-section__body p-network-body">

        <!-- 左：テキスト＆数値 -->
        <div class="p-network-left">
          <p class="c-heading-sub c-heading-sub--large">全国の医療機関・企業を支援。</p>
          <h2 class="c-heading c-heading--1">
            <span class="c-text-letters js-text-letters">GROUP NETWORK</span>
          </h2>

          <div class="p-network-stats">
            <div class="p-network-stat">
              <strong class="p-result-num" data-target="47">0</strong>
              <span class="p-result-unit">都道府県</span>
              <span class="p-result-label">全国対応</span>
            </div>
            <div class="p-network-stat">
              <strong class="p-result-num" data-target="200">0</strong>
              <span class="p-result-unit">名+</span>
              <span class="p-result-label">グループ社員</span>
            </div>
            <div class="p-network-stat">
              <strong class="p-result-num" data-target="5">0</strong>
              <span class="p-result-unit">ブランド</span>
              <span class="p-result-label">展開サービス</span>
            </div>
          </div>

          <div class="p-network-offices">
            <h3 class="p-network-offices__title">グループ会社 所在地</h3>
            <ul class="p-network-offices__list">
              <li><span class="p-network-dot"></span>青森県</li>
              <li><span class="p-network-dot"></span>宮城県</li>
              <li><span class="p-network-dot"></span>埼玉県</li>
              <li><span class="p-network-dot"></span>千葉県（本社）</li>
              <li><span class="p-network-dot"></span>東京都</li>
              <li><span class="p-network-dot"></span>神奈川県</li>
            </ul>
          </div>

          <a href="/cases" class="c-btn c-btn--primary p-network-cta">
            <span class="c-btn__inner">VIEW ALL CASES <span class="c-arrow"></span></span>
          </a>
        </div>

        <!-- 右：日本地図SVG -->
        <div class="p-network-right">
          <div class="p-japan-map" aria-label="グループ会社所在地マップ">
            <svg viewBox="0 0 500 600" xmlns="http://www.w3.org/2000/svg" class="p-japan-svg">
              <!-- 日本列島シルエット -->
              <!-- 北海道 -->
              <path class="jp-land" d="M310,30 L340,25 L370,35 L390,50 L385,70 L370,85 L355,90 L335,85 L315,75 L300,60 L305,40 Z"/>
              <!-- 本州 -->
              <path class="jp-land" d="M295,95 L315,88 L330,100 L340,120 L335,145 L325,165 L310,180 L300,200 L290,215 L285,235 L275,255 L265,270 L255,285 L245,295 L235,305 L225,310 L215,315 L205,320 L195,318 L185,310 L178,300 L175,285 L180,270 L190,260 L200,250 L205,240 L210,228 L215,215 L220,200 L225,185 L230,170 L235,158 L240,145 L245,132 L250,118 L258,106 L270,98 L282,94 Z"/>
              <!-- 四国 -->
              <path class="jp-land" d="M205,335 L225,325 L245,330 L255,345 L250,360 L235,368 L218,365 L205,355 Z"/>
              <!-- 九州 -->
              <path class="jp-land" d="M175,330 L195,320 L205,332 L205,355 L200,370 L190,385 L178,395 L165,400 L152,395 L145,380 L148,365 L158,352 L168,340 Z"/>
              <!-- 沖縄 -->
              <ellipse class="jp-land jp-okinawa" cx="160" cy="445" rx="18" ry="9"/>

              <!-- グループ会社所在地ピン -->
              <!-- 青森 -->
              <circle class="jp-pin" cx="330" cy="118" r="7"/>
              <circle class="jp-pin-pulse" cx="330" cy="118" r="7"/>
              <!-- 宮城 -->
              <circle class="jp-pin" cx="325" cy="155" r="7"/>
              <circle class="jp-pin-pulse" cx="325" cy="155" r="7"/>
              <!-- 埼玉 -->
              <circle class="jp-pin" cx="298" cy="210" r="7"/>
              <circle class="jp-pin-pulse" cx="298" cy="210" r="7"/>
              <!-- 千葉（本社） -->
              <circle class="jp-pin jp-pin--hq" cx="308" cy="218" r="9"/>
              <circle class="jp-pin-pulse jp-pin-pulse--hq" cx="308" cy="218" r="9"/>
              <!-- 東京 -->
              <circle class="jp-pin" cx="295" cy="215" r="7"/>
              <circle class="jp-pin-pulse" cx="295" cy="215" r="7"/>
              <!-- 神奈川 -->
              <circle class="jp-pin" cx="290" cy="225" r="7"/>
              <circle class="jp-pin-pulse" cx="290" cy="225" r="7"/>

              <!-- 本社ラベル -->
              <text class="jp-label" x="320" y="214">本社</text>
            </svg>
            <p class="p-japan-map__note">● 本社（千葉）&nbsp;&nbsp;● グループ会社所在地</p>
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
        <p class="c-heading-sub" style="font-size:.85rem;opacity:.7;margin-top:24px;">お気軽にお問い合わせください。<br>秘密厳守・2営業日以内にご返答します。</p>
      </div>
    </div>
  </section>
</article>
`, { description: '株式会社イズムズ（i2m2）は医療マーケティング・人材・M&A・DXをワンストップで提供するヘルスケア特化の総合支援会社。創業1年3ヶ月でグループ社員200名・総売上20億円突破。', fullTitle: '株式会社イズムズ｜コーポレートサイト' }))
}
