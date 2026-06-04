import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
  <meta name="description" content="홈페이지 제작·반응형홈페이지제작 전문 소이정 | 수원 홈페이지 제작업체, 모바일앱 개발, 웹시스템 구축, 마케팅 서비스까지 원스톱 제공 종합 에이전시"/>
  <title>홈페이지 제작 · 반응형 홈페이지 · CMS 개발 | 소이정 디지털&디자인 에이전시</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"><\/script>
  <link rel="stylesheet" href="/static/style.css"/>
</head>
<body class="main scroll_none">

<div class="ms-preloader"></div>

<div id="wrapper">

  <!-- HEADER -->
  <header id="header" class="header top">
    <div class="logo">
      <a href="/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 85" width="160" height="50">
          <text x="0" y="60" font-family="'Noto Sans KR', sans-serif" font-size="56" font-weight="700" fill="#ff5e10" letter-spacing="-2">soijeong</text>
        </svg>
      </a>
    </div>
    <nav class="nav active" id="navBtn" onclick="openNav()">
      <div class="nav_box">
        <div class="hbgOpen">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </nav>
  </header>

<!-- ══ § 1 HERO ══ -->
<section class="hero" id="top">
  <div class="hero-vid-wrap">
    <video class="hero-vid" id="heroVid" autoplay muted loop playsinline preload="none"
      poster="/static/frame_5s.jpg">
      <source data-src="/static/hero_video.mp4" type="video/mp4">
      <source data-src="/static/main_acer04.webm" type="video/webm">
    </video>
    <!-- poster画像が動画ロード前の背景として機能するため、placeholderは不要 -->
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
  <!-- ── Dynamic Keyword Slider ── -->
  <div class="tk-slider-wrap">
    <div class="tk-label">We Provide</div>
    <div class="tk-slider" id="tkSlider">
      <div class="tk-slide active" data-color="#D4AF37">
        <div class="tk-kw"><span class="tk-arrow">&rsaquo;&rsaquo;</span> <span class="tk-word">Consulting</span></div>
        <div class="tk-desc">医療経営のコンサルティング</div>
      </div>
      <div class="tk-slide" data-color="#C9A961">
        <div class="tk-kw"><span class="tk-arrow">&rsaquo;&rsaquo;</span> <span class="tk-word">Strategy Planning</span></div>
        <div class="tk-desc">戦略的な経営ビジョン構築</div>
      </div>
      <div class="tk-slide" data-color="#E8C84A">
        <div class="tk-kw"><span class="tk-arrow">&rsaquo;&rsaquo;</span> <span class="tk-word">Marketing</span></div>
        <div class="tk-desc">医療機関のマーケティング施策</div>
      </div>
      <div class="tk-slide" data-color="#D4AF37">
        <div class="tk-kw"><span class="tk-arrow">&rsaquo;&rsaquo;</span> <span class="tk-word">Produce</span></div>
        <div class="tk-desc">事業創出・新規プロジェクト</div>
      </div>
      <div class="tk-slide" data-color="#C9A961">
        <div class="tk-kw"><span class="tk-arrow">&rsaquo;&rsaquo;</span> <span class="tk-word">Training</span></div>
        <div class="tk-desc">人材育成・組織開発</div>
      </div>
      <div class="tk-slide" data-color="#E5D4B8">
        <div class="tk-kw"><span class="tk-arrow">&rsaquo;&rsaquo;</span> <span class="tk-word">System Implementation</span></div>
        <div class="tk-desc">DX推進・システム導入支援</div>
      </div>
    </div>
    <div class="tk-dots" id="tkDots">
      <button class="tk-dot active" data-idx="0"></button>
      <button class="tk-dot" data-idx="1"></button>
      <button class="tk-dot" data-idx="2"></button>
      <button class="tk-dot" data-idx="3"></button>
      <button class="tk-dot" data-idx="4"></button>
      <button class="tk-dot" data-idx="5"></button>
    </div>
  </div>

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

  <!-- MAIN CONTENT -->
  <main id="container">
    <div id="renewal_page" class="renewal_main">

      <!-- MAIN VISUAL -->
      <section class="main_visual_new">
        <div class="tit_box">
          <div class="tit">
            <div class="txt">
              <div class="slide_txt">
                <span>W</span><span>e</span><span>b</span><span>s</span><span>i</span><span>t</span><span>e</span>
                <span class="line"></span>
              </div>
              <div class="basic_txt">
                <span>T</span><span>a</span><span>k</span><span>e</span><span>o</span><span>u</span><span>t</span><span class="pre">?</span>
              </div>
            </div>
          </div>
        </div>
        <div class="visual_overlay">
          <div class="visual_gradient"></div>
        </div>
        <div class="scroll_hint">
          <span>Scroll</span>
          <div class="scroll_line"></div>
        </div>
      </section>

      <!-- SERVICE SECTION -->
      <section class="service_sect_wrap" id="about">
        <div class="service_sect">
          <div class="in">
            <div class="sect_tit_box">
              <div class="txt_box">
                <p class="txt"><span>우리는 이런 일을 해요</span></p>
                <p class="tit pop"><span>Creative Service</span></p>
              </div>
              <a class="main_btn" href="#services">
                <span>메뉴 더보기</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em"><path d="M495 273l17-17-17-17L359 103l-17-17L308.1 120l17 17 95 95L24 232 0 232l0 48 24 0 396.1 0-95 95-17 17 33.9 33.9 17-17L495 273z"/></svg>
              </a>
            </div>
          </div>
          <div class="service_cards_row">
            <div class="service_card card_1">
              <div class="card_inner">
                <div class="top">
                  <p class="txt">AI / SEO·GEO Growth</p>
                  <p class="tit">AI 개발 및 검색 최적화</p>
                </div>
                <ul>
                  <li>AI 기술 개발(RAG·챗봇 등)</li>
                  <li>LLM 적용·업무 자동화</li>
                  <li>SEO 설계·기술 최적화</li>
                  <li>AI 검색 최적화(GEO/AEO)</li>
                  <li>관리자 업무 자동화</li>
                  <li>전환 최적화(CRO)</li>
                </ul>
                <div class="card_num">01</div>
              </div>
            </div>
            <div class="service_card card_2">
              <div class="card_inner">
                <div class="top">
                  <p class="txt">System Development</p>
                  <p class="tit">웹·앱 시스템 개발</p>
                </div>
                <ul>
                  <li>반응형·적응형 홈페이지</li>
                  <li>프론트엔드·백엔드 개발</li>
                  <li>API 개발·외부 연동</li>
                  <li>성능 최적화</li>
                  <li>모바일 앱 개발</li>
                  <li>보안 (SSL·인증·취약점)</li>
                </ul>
                <div class="card_num">02</div>
              </div>
            </div>
            <div class="service_card card_3">
              <div class="card_inner">
                <div class="top">
                  <p class="txt">Creative Design</p>
                  <p class="tit">크리에이티브 디자인</p>
                </div>
                <ul>
                  <li>3D 모델링·3D 모션</li>
                  <li>3D 쇼룸(WebGL)</li>
                  <li>UI·UX 디자인</li>
                  <li>인터랙티브 디자인</li>
                  <li>모션 그래픽·VFX</li>
                  <li>브랜드 캐릭터 개발</li>
                </ul>
                <div class="card_num">03</div>
              </div>
            </div>
            <div class="service_card card_4">
              <div class="card_inner">
                <div class="top">
                  <p class="txt">Strategy &amp; Consulting</p>
                  <p class="tit">브랜드전략 및 경험 컨설팅</p>
                </div>
                <ul>
                  <li>브랜딩 전략·자산 개발</li>
                  <li>서비스 구조 설계·기획</li>
                  <li>사용자 전환·행동 설계</li>
                  <li>UX 컨설팅·사용성 테스트</li>
                  <li>콘텐츠 전략·카피라이팅</li>
                  <li>맞춤형 관리자 설계(CMS)</li>
                </ul>
                <div class="card_num">04</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SERVICE TAG MARQUEE -->
      <section class="service_tag_wrap">
        <div class="sect_tit_box">
          <div class="txt_box">
            <p class="txt"><span>주문하고 싶은 서비스가 있나요?</span></p>
            <p class="tit pop"><span>What We Service</span></p>
          </div>
        </div>
        <div class="marquee_container">
          <div class="marquee_row marquee_left">
            <div class="marquee_inner">
              <div class="marquee_items">
                <span class="tag_item orange">#쇼핑몰 솔루션</span>
                <span class="tag_item">#API 개발</span>
                <span class="tag_item orange">#3D 디자인</span>
                <span class="tag_item">#AI Animation</span>
                <span class="tag_item orange">#AI 맞춤 CMS개발</span>
                <span class="tag_item">#반응형홈페이지</span>
                <span class="tag_item orange">#병원홈페이지제작</span>
                <span class="tag_item">#디지털 전략 컨설팅</span>
                <span class="tag_item orange">#모바일앱</span>
                <span class="tag_item">#홈페이지제작</span>
                <span class="tag_item">#홈페이지리뉴얼</span>
              </div>
              <div class="marquee_items" aria-hidden="true">
                <span class="tag_item orange">#쇼핑몰 솔루션</span>
                <span class="tag_item">#API 개발</span>
                <span class="tag_item orange">#3D 디자인</span>
                <span class="tag_item">#AI Animation</span>
                <span class="tag_item orange">#AI 맞춤 CMS개발</span>
                <span class="tag_item">#반응형홈페이지</span>
                <span class="tag_item orange">#병원홈페이지제작</span>
                <span class="tag_item">#디지털 전략 컨설팅</span>
                <span class="tag_item orange">#모바일앱</span>
                <span class="tag_item">#홈페이지제작</span>
                <span class="tag_item">#홈페이지리뉴얼</span>
              </div>
            </div>
          </div>
          <div class="marquee_row marquee_right">
            <div class="marquee_inner">
              <div class="marquee_items">
                <span class="tag_item orange">#생성형 AI 맞춤개발</span>
                <span class="tag_item">#WebGL 쇼룸제작</span>
                <span class="tag_item orange">#보안/SSL</span>
                <span class="tag_item">#마케팅운영</span>
                <span class="tag_item orange">#웹 접근성</span>
                <span class="tag_item">#CRM통합</span>
                <span class="tag_item orange">#데이터 분석</span>
                <span class="tag_item">#3D 스마트 카탈로그</span>
                <span class="tag_item orange">#AI 기반 솔루션</span>
                <span class="tag_item">#반응형홈페이지제작</span>
              </div>
              <div class="marquee_items" aria-hidden="true">
                <span class="tag_item orange">#생성형 AI 맞춤개발</span>
                <span class="tag_item">#WebGL 쇼룸제작</span>
                <span class="tag_item orange">#보안/SSL</span>
                <span class="tag_item">#마케팅운영</span>
                <span class="tag_item orange">#웹 접근성</span>
                <span class="tag_item">#CRM통합</span>
                <span class="tag_item orange">#데이터 분석</span>
                <span class="tag_item">#3D 스마트 카탈로그</span>
                <span class="tag_item orange">#AI 기반 솔루션</span>
                <span class="tag_item">#반응형홈페이지제작</span>
              </div>
            </div>
          </div>
          <div class="marquee_row marquee_left">
            <div class="marquee_inner">
              <div class="marquee_items">
                <span class="tag_item orange">#LOGO디자인</span>
                <span class="tag_item">#AI자동 SEO최적화</span>
                <span class="tag_item orange">#브랜딩</span>
                <span class="tag_item">#콘텐츠기획</span>
                <span class="tag_item orange">#SNS콘텐츠</span>
                <span class="tag_item">#기업홈페이지제작</span>
                <span class="tag_item orange">#UI/UX개선</span>
                <span class="tag_item">#캐릭터디자인</span>
                <span class="tag_item orange">#기업형 AI 기술 도입</span>
                <span class="tag_item">#웹사이트제작</span>
              </div>
              <div class="marquee_items" aria-hidden="true">
                <span class="tag_item orange">#LOGO디자인</span>
                <span class="tag_item">#AI자동 SEO최적화</span>
                <span class="tag_item orange">#브랜딩</span>
                <span class="tag_item">#콘텐츠기획</span>
                <span class="tag_item orange">#SNS콘텐츠</span>
                <span class="tag_item">#기업홈페이지제작</span>
                <span class="tag_item orange">#UI/UX개선</span>
                <span class="tag_item">#캐릭터디자인</span>
                <span class="tag_item orange">#기업형 AI 기술 도입</span>
                <span class="tag_item">#웹사이트제작</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- TAKEOUT SECTION -->
      <section class="box_sect" id="project">
        <div class="tit_box">
          <div class="desc"><p>쏙쏙! 원하는 서비스만 골라 주문하세요!</p></div>
          <div class="tit"><p>Website Takeout?</p></div>
          <div class="btn">
            <a href="#inquiry" class="main_btn org">
              <span>프로젝트 문의</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em"><path d="M495 273l17-17-17-17L359 103l-17-17L308.1 120l17 17 95 95L24 232 0 232l0 48 24 0 396.1 0-95 95-17 17 33.9 33.9 17-17L495 273z"/></svg>
            </a>
          </div>
        </div>
        <div class="takeout_visual">
          <div class="takeout_grid">
            <div class="grid_item g1"><span>#홈페이지</span></div>
            <div class="grid_item g2"><span>#모바일앱</span></div>
            <div class="grid_item g3"><span>#AI개발</span></div>
            <div class="grid_item g4"><span>#브랜딩</span></div>
            <div class="grid_item g5"><span>#CMS</span></div>
            <div class="grid_item g6"><span>#SEO</span></div>
          </div>
        </div>
      </section>

      <!-- PORTFOLIO SECTION -->
      <section class="project_section" id="portfolio">
        <div class="in">
          <div class="sect_tit_box">
            <div class="txt_box">
              <p class="txt"><span>PORTFOLIO</span></p>
              <p class="tit"><span>주문하신 메뉴 나왔습니다!</span></p>
            </div>
            <a href="#portfolio" class="main_btn org">
              <span>포트폴리오</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em"><path d="M495 273l17-17-17-17L359 103l-17-17L308.1 120l17 17 95 95L24 232 0 232l0 48 24 0 396.1 0-95 95-17 17 33.9 33.9 17-17L495 273z"/></svg>
            </a>
          </div>
        </div>
        <div class="project_list">
          <ul>
            <li>
              <a href="#" class="pjt_item">
                <div class="hover_box">
                  <p class="part">WEB&amp;UX / Mobile</p>
                  <p class="tit">한국야쿠르트 쇼핑몰 '프레딧' 연간 유지보수</p>
                  <div class="tag">이커머스 구축, UI/UX 디자인, 연간 유지보수</div>
                </div>
                <div class="img" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);">
                  <div class="img_text">야쿠르트 프레딧</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" class="pjt_item">
                <div class="hover_box">
                  <p class="part">WEB&amp;UX / Mobile</p>
                  <p class="tit">아이누리한의원 홈페이지 제작</p>
                  <div class="tag">웹·모바일 웹사이트 구축, CMS·시스템 개발, UI/UX 디자인</div>
                </div>
                <div class="img" style="background: linear-gradient(135deg, #2d5016 0%, #4a7c2f 50%, #6aab3f 100%);">
                  <div class="img_text">아이누리한의원</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" class="pjt_item">
                <div class="hover_box">
                  <p class="part">WEB&amp;UX / Mobile</p>
                  <p class="tit">자코모 글로벌 브랜드 홈페이지 제작</p>
                  <div class="tag">웹·모바일 웹사이트 구축, UI/UX 디자인, 3D 그래픽</div>
                </div>
                <div class="img" style="background: linear-gradient(135deg, #2c0735 0%, #6a0572 50%, #ab47bc 100%);">
                  <div class="img_text">자코모 JACOMO</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" class="pjt_item">
                <div class="hover_box">
                  <p class="part">WEB&amp;UX / Mobile</p>
                  <p class="tit">도루코 컬러 커스터마이징 시스템 및 홈페이지 제작</p>
                  <div class="tag">웹·모바일 웹사이트 구축, CMS·시스템 개발, 3D 그래픽</div>
                </div>
                <div class="img" style="background: linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #415a77 100%);">
                  <div class="img_text">도루코 DORCO</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" class="pjt_item">
                <div class="hover_box">
                  <p class="part">WEB&amp;UX / Mobile / Identity</p>
                  <p class="tit">KICC 음성인식 앱 UI/UX 디자인</p>
                  <div class="tag">UI/UX 디자인, 웹·모바일 웹사이트 구축, 브랜딩</div>
                </div>
                <div class="img" style="background: linear-gradient(135deg, #1a0533 0%, #3d1766 50%, #7b2d8b 100%);">
                  <div class="img_text">KICC</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" class="pjt_item">
                <div class="hover_box">
                  <p class="part">WEB&amp;UX / Mobile</p>
                  <p class="tit">듀얼소닉 쇼핑몰 홈페이지 제작</p>
                  <div class="tag">웹·모바일 웹사이트 구축, 이커머스 구축, UI/UX 디자인</div>
                </div>
                <div class="img" style="background: linear-gradient(135deg, #0a192f 0%, #172a45 50%, #1e3a5f 100%);">
                  <div class="img_text">듀얼소닉</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <!-- MARQUEE TEXT -->
      <div class="pjt_flow_txt">
        <div class="flow_inner">
          <span>A small thing has made a big things. </span>
          <span>A small thing has made a big things. </span>
          <span>A small thing has made a big things. </span>
          <span>A small thing has made a big things. </span>
        </div>
      </div>

      <!-- SOLUTION SECTION -->
      <section class="solution" id="solution">
        <div class="cont_box">
          <div class="sect_tit_box">
            <div class="txt_box">
              <p class="txt"><span>AI부터 GEO까지</span></p>
              <p class="tit"><span>보유 솔루션으로 <br> 가능해요.</span></p>
              <div class="paging">
                <div class="page_btn prev" id="solPrev">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="1em"><path d="M18.2 273l-17-17 17-17L171.8 85.4l17-17 33.9 33.9-17 17L93.1 232 424 232l24 0 0 48-24 0L93.1 280 205.8 392.6l17 17-33.9 33.9-17-17L18.2 273z"/></svg>
                </div>
                <div class="num_wrap" id="solPaging"></div>
                <div class="page_btn next" id="solNext">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="1em"><path d="M429.8 273l17-17-17-17L276.2 85.4l-17-17-33.9 33.9 17 17L354.9 232 24 232 0 232l0 48 24 0 330.9 0L242.2 392.6l-17 17 33.9 33.9 17-17L429.8 273z"/></svg>
                </div>
              </div>
            </div>
          </div>
          <div class="slide swiper-container sol_swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <a href="#" class="sol_box" style="background: linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%);">
                  <div class="top_txt"><p class="txt">solutions</p><p class="num">01</p></div>
                  <div class="bot_txt">
                    <p class="txt">AI 기업 전용 통합관리시스템</p>
                    <p class="sol_tit">AI S-CMS</p>
                    <span class="arr_svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em"><path d="M495 273l17-17-17-17L359 103l-17-17L308.1 120l17 17 95 95L24 232 0 232l0 48 24 0 396.1 0-95 95-17 17 33.9 33.9 17-17L495 273z"/></svg></span>
                  </div>
                </a>
              </div>
              <div class="swiper-slide">
                <a href="#" class="sol_box" style="background: linear-gradient(135deg, #0a0a2e 0%, #1a1a4a 100%);">
                  <div class="top_txt"><p class="txt">solutions</p><p class="num">02</p></div>
                  <div class="bot_txt">
                    <p class="txt">AI 병원 전용 통합관리 CMS</p>
                    <p class="sol_tit">AI S-MEDI +</p>
                    <span class="arr_svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em"><path d="M495 273l17-17-17-17L359 103l-17-17L308.1 120l17 17 95 95L24 232 0 232l0 48 24 0 396.1 0-95 95-17 17 33.9 33.9 17-17L495 273z"/></svg></span>
                  </div>
                </a>
              </div>
              <div class="swiper-slide">
                <a href="#" class="sol_box" style="background: linear-gradient(135deg, #1a0a0a 0%, #3a1a1a 100%);">
                  <div class="top_txt"><p class="txt">solutions</p><p class="num">03</p></div>
                  <div class="bot_txt">
                    <p class="txt">AI 법률전용 콘텐츠관리솔루션</p>
                    <p class="sol_tit">S-LawNET</p>
                    <span class="arr_svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em"><path d="M495 273l17-17-17-17L359 103l-17-17L308.1 120l17 17 95 95L24 232 0 232l0 48 24 0 396.1 0-95 95-17 17 33.9 33.9 17-17L495 273z"/></svg></span>
                  </div>
                </a>
              </div>
              <div class="swiper-slide">
                <a href="#" class="sol_box" style="background: linear-gradient(135deg, #0a1a0a 0%, #1a3a1a 100%);">
                  <div class="top_txt"><p class="txt">solutions</p><p class="num">04</p></div>
                  <div class="bot_txt">
                    <p class="txt">AI 랜딩페이지관리시스템</p>
                    <p class="sol_tit">영업DB관리시스템</p>
                    <span class="arr_svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em"><path d="M495 273l17-17-17-17L359 103l-17-17L308.1 120l17 17 95 95L24 232 0 232l0 48 24 0 396.1 0-95 95-17 17 33.9 33.9 17-17L495 273z"/></svg></span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- BETTER SECTION -->
      <section class="better">
        <div class="greeting_container">
          <div class="greeting_wrap">
            <div class="txt_wrap">
              <div class="txt txt_top">
                <p>안녕하세요.</p>
                <p>더할 나위 없이 즐거운 우리는 소이정입니다.</p>
              </div>
              <div class="txt txt_left">For the</div>
              <div class="txt txt_right">Better</div>
            </div>
            <div class="greeting_video">
              <div class="mo_txt">For the Better</div>
              <div class="video_bg_overlay"></div>
              <div class="greeting_visual">
                <div class="greeting_gradient"></div>
                <p class="greeting_tagline">We always think 'better good'</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- NEWSLETTER SECTION -->
      <section class="story" id="newsletter">
        <div class="sect_tit_box">
          <div class="txt_box">
            <p class="txt"><span>요즘 뜨는 혹은 드는 생각들</span></p>
            <p class="tit"><span>뉴스레터에 담아 보내요</span></p>
          </div>
          <a href="#newsletter" class="main_btn bk">
            <span>더보기</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em"><path d="M495 273l17-17-17-17L359 103l-17-17L308.1 120l17 17 95 95L24 232 0 232l0 48 24 0 396.1 0-95 95-17 17 33.9 33.9 17-17L495 273z"/></svg>
          </a>
        </div>
        <div class="nl_list swiper-container nl_swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide nl_item">
              <a href="#" class="nl_link">
                <div class="img_box">
                  <div class="img visual_img" style="background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);"></div>
                </div>
                <div class="txt_box">
                  <div class="sub_txt"><span class="badge">시리즈</span><span class="txt"> 알려드려요, 요즘 핫한거</span></div>
                  <div class="main_txt">
                    <p class="tit">'카카오페이 하지 마세요.' 가정의 달, 카카오페이의 특별한 메시지</p>
                    <p class="info">5월은 유독, 마음이 바빠지는 달이예요. 어린이날, 어버이날, 스승의날처럼 고마운 사람들을 떠올리게 되는 날들이 이어지기 때문인데요.</p>
                  </div>
                </div>
                <div class="tag_box">
                  <span class="tag">#트렌트</span><span class="tag">#마케팅</span><span class="tag">#브랜딩</span>
                </div>
              </a>
            </div>
            <div class="swiper-slide nl_item">
              <a href="#" class="nl_link">
                <div class="img_box">
                  <div class="img visual_img" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
                </div>
                <div class="txt_box">
                  <div class="sub_txt"><span class="badge">시리즈</span><span class="txt"> 알려드려요, 요즘 핫한거</span></div>
                  <div class="main_txt">
                    <p class="tit">가정의 달 맞이, I SEE YOU? &lt;아이CU&gt; 캠페인</p>
                    <p class="info">가정의 달, 우리 곁의 아동안전을 다시 생각하게 만든 2026 아이CU 캠페인</p>
                  </div>
                </div>
                <div class="tag_box">
                  <span class="tag">#트렌트</span><span class="tag">#마케팅</span><span class="tag">#브랜딩</span>
                </div>
              </a>
            </div>
            <div class="swiper-slide nl_item">
              <a href="#" class="nl_link">
                <div class="img_box">
                  <div class="img visual_img" style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);"></div>
                </div>
                <div class="txt_box">
                  <div class="sub_txt"><span class="badge">시리즈</span><span class="txt"> 알려드려요, 요즘 핫한거</span></div>
                  <div class="main_txt">
                    <p class="tit">벼락치기조차 전략이 되는 시대! 요즘 학습 플랫폼 &lt;유니브 AI&gt;</p>
                    <p class="info">시험 기간만 되면 대학생들의 하루는 극단적으로 바빠지곤 하죠.</p>
                  </div>
                </div>
                <div class="tag_box">
                  <span class="tag">#트렌트</span><span class="tag">#AI</span><span class="tag">#에듀테크</span>
                </div>
              </a>
            </div>
            <div class="swiper-slide nl_item">
              <a href="#" class="nl_link">
                <div class="img_box">
                  <div class="img visual_img" style="background: linear-gradient(135deg, #fc5c7d 0%, #6a3093 100%);"></div>
                </div>
                <div class="txt_box">
                  <div class="sub_txt"><span class="badge">시리즈</span><span class="txt"> 알려드려요, 요즘 핫한거</span></div>
                  <div class="main_txt">
                    <p class="tit">곁에 두기만 해도 마음이 편안! 불안을 다루는 요즘 굿즈</p>
                    <p class="info">불안을 떠올렸을 때 어떤 이미지가 연상되시나요?</p>
                  </div>
                </div>
                <div class="tag_box">
                  <span class="tag">#트렌트</span><span class="tag">#마케팅</span><span class="tag">#굿즈</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- SUBSCRIBE SECTION -->
      <div class="news_wrap">
        <p class="tit">Subscribe to<br> our newsletter</p>
        <form id="subscriberFrm" onsubmit="subscribeNewsletter(event)" autocomplete="off">
          <div class="news_btn">
            <input type="email" placeholder="Your email address" id="emailInput" required/>
            <button type="submit" class="ico">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em"><path d="M495 273l17-17-17-17L359 103l-17-17L308.1 120l17 17 95 95L24 232 0 232l0 48 24 0 396.1 0-95 95-17 17 33.9 33.9 17-17L495 273z"/></svg>
            </button>
          </div>
          <div class="chk_box">
            <input type="checkbox" id="marketingChkMain" required/>
            <label for="marketingChkMain">
              <span class="txt">(필수) 개인정보 동의 및 마케팅 정보 수신 동의</span>
            </label>
          </div>
        </form>
      </div>

      <!-- AWARD SECTION -->
      <section class="award">
        <div class="sect_tit_box">
          <div class="txt_box">
            <p class="txt"><span>인정받은 영예의 순간들</span></p>
            <p class="tit pop"><span>Award Winner</span></p>
          </div>
          <a href="#portfolio" class="main_btn org">
            <span>더보기</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em"><path d="M495 273l17-17-17-17L359 103l-17-17L308.1 120l17 17 95 95L24 232 0 232l0 48 24 0 396.1 0-95 95-17 17 33.9 33.9 17-17L495 273z"/></svg>
          </a>
        </div>
        <div class="award_list swiper-container award_swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide award_item active">
              <a href="#">
                <div class="award_inner">
                  <div class="award_top">
                    <span class="award_badge">GD Web Award</span>
                    <span class="award_year">2025</span>
                  </div>
                  <div class="award_body">
                    <p class="award_tit">소이정 2025 GRAND PRIZE 수상</p>
                    <p class="award_desc">수상작 SOI.LAB 3D는 단순한 기술 구현을 넘어 실용성과 몰입감을 갖춘 3D 경험을 제공하고자 개발된 소이정의 차세대 솔루션입니다.</p>
                  </div>
                  <div class="award_arr">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em"><path d="M500.7 267.3L512 256l-11.3-11.3-144-144L345.4 89.4 322.7 112l11.3 11.3L450.7 240 16 240 0 240l0 32 16 0 434.7 0L334.1 388.7 322.7 400l22.6 22.6 11.3-11.3 144-144z"/></svg>
                  </div>
                </div>
              </a>
            </div>
            <div class="swiper-slide award_item">
              <a href="#">
                <div class="award_inner">
                  <div class="award_top">
                    <span class="award_badge">GD Web Award</span>
                    <span class="award_year">2025</span>
                  </div>
                  <div class="award_body">
                    <p class="award_tit">참포도나무병원 리뉴얼 홈페이지 제작</p>
                    <p class="award_desc">참포도나무병원이 쌓아온 브랜드 정체성을 극대화하면서도 병원의 전문성을 효과적으로 전달하는데 중점을 두었습니다.</p>
                  </div>
                  <div class="award_arr">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em"><path d="M500.7 267.3L512 256l-11.3-11.3-144-144L345.4 89.4 322.7 112l11.3 11.3L450.7 240 16 240 0 240l0 32 16 0 434.7 0L334.1 388.7 322.7 400l22.6 22.6 11.3-11.3 144-144z"/></svg>
                  </div>
                </div>
              </a>
            </div>
            <div class="swiper-slide award_item">
              <a href="#">
                <div class="award_inner">
                  <div class="award_top">
                    <span class="award_badge">GD Web Award</span>
                    <span class="award_year">2024</span>
                  </div>
                  <div class="award_body">
                    <p class="award_tit">소이정 2024 GRAND PRIZE 수상</p>
                    <p class="award_desc">브랜드 아이덴티티를 강화하고 트렌디한 컬러 및 모션 그래픽을 조화롭게 활용하여 더욱 풍부한 브랜드 경험을 제공하였습니다.</p>
                  </div>
                  <div class="award_arr">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em"><path d="M500.7 267.3L512 256l-11.3-11.3-144-144L345.4 89.4 322.7 112l11.3 11.3L450.7 240 16 240 0 240l0 32 16 0 434.7 0L334.1 388.7 322.7 400l22.6 22.6 11.3-11.3 144-144z"/></svg>
                  </div>
                </div>
              </a>
            </div>
            <div class="swiper-slide award_item">
              <a href="#">
                <div class="award_inner">
                  <div class="award_top">
                    <span class="award_badge">GD Web Award</span>
                    <span class="award_year">2023</span>
                  </div>
                  <div class="award_body">
                    <p class="award_tit">서울랜드 홈페이지 리뉴얼</p>
                    <p class="award_desc">즐거움을 강조하는 클라이언트의 요구사항을 적극 반영한 이번 프로젝트는 서울랜드만의 유니크한 공간으로 탄생되었습니다.</p>
                  </div>
                  <div class="award_arr">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em"><path d="M500.7 267.3L512 256l-11.3-11.3-144-144L345.4 89.4 322.7 112l11.3 11.3L450.7 240 16 240 0 240l0 32 16 0 434.7 0L334.1 388.7 322.7 400l22.6 22.6 11.3-11.3 144-144z"/></svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- MEMBER SECTION -->
      <section class="member" id="team">
        <div class="in">
          <div class="tit_box">
            <div class="desc"><p>소수정예로 뭉친 One-Team</p></div>
            <div class="tit"><p>우리를 소개합니다</p></div>
            <div class="btn">
              <a href="#team" class="main_btn org">
                <span>멤버 보러가기</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em"><path d="M495 273l17-17-17-17L359 103l-17-17L308.1 120l17 17 95 95L24 232 0 232l0 48 24 0 396.1 0-95 95-17 17 33.9 33.9 17-17L495 273z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div class="member_faces">
          <div class="face_item" style="background: #ff5e10;">기획</div>
          <div class="face_item" style="background: #e64900;">디자인</div>
          <div class="face_item" style="background: #ff7a3d;">개발</div>
          <div class="face_item" style="background: #cc3d00;">마케팅</div>
          <div class="face_item" style="background: #ff9966;">전략</div>
          <div class="face_item" style="background: #dd4400;">운영</div>
        </div>
        <div class="member_txt">
          A creative agency that fosters close connections, <br>
          shares meaningful moments, and delivers strategic vision with
          cultural insight and innovative solutions.
        </div>
      </section>

      <!-- BOTTOM CTA -->
      <div class="machine_btm">
        <div class="sub_btn">
          <a href="#inquiry" class="btn" type="button">
            <span class="txt">프로젝트 문의</span>
            <span class="ico"></span>
          </a>
        </div>
        <div class="machine_visual">
          <div class="machine_icon">🤖</div>
          <p class="machine_copy">Website Takeout!</p>
        </div>
      </div>

    </div><!-- /renewal_page -->
  </main>

  <!-- QUICK BUTTON -->
  <div class="quick_wrap">
    <div class="quick_top" id="quickTop">
      <div class="txt">TOP</div>
    </div>
    <a href="#inquiry" class="quick_inquiry">
      <div class="hover_box">
        <div class="txt_box">
          <div class="txt">견적 문의</div>
          <div class="ico"></div>
        </div>
      </div>
    </a>
  </div>

  <!-- FOOTER -->
  <footer id="footer">
    <div class="footer">
      <div class="ft_top_sect">
        <div class="left">
          <div class="sns_wrap">
            <a href="#" class="sns naver" title="소이정 블로그">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 8.24" height="1em"><path d="M9,0V8.24H5.92L3.07,4.08V8.24H0V0H3.08L5.93,4.16V0Z"/></svg>
            </a>
            <a href="#" class="sns youtube" title="소이정 유튜브">
              <i class="fab fa-youtube"></i>
            </a>
            <a href="#" class="sns insta" title="소이정 인스타그램">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
          <div class="num_wrap">
            <p class="num"><b>T.</b> 031 293 0128</p>
            <p class="num"><b>M.</b> <a href="mailto:admin@soijeong.com">admin@soijeong.com</a></p>
            <p class="num"><a href="#contact"><b>업무제휴</b></a></p>
          </div>
        </div>
        <div class="right">
          <div class="ft_menu">
            <div class="menu_box">
              <p class="depth1">About Us</p>
              <div class="depth2">
                <a href="#about">About 소이정</a>
                <a href="#team">소이정 사람들</a>
                <a href="#philosophy">우리의 철학</a>
                <a href="#culture">기업문화</a>
              </div>
            </div>
            <div class="menu_box">
              <p class="depth1">Solution</p>
              <div class="depth2">
                <a href="#solution">3D Lab</a>
                <a href="#solution">기타 솔루션</a>
              </div>
            </div>
            <div class="menu_box">
              <p class="depth1">Project</p>
              <div class="depth2">
                <a href="#portfolio">포트폴리오</a>
                <a href="#inquiry">견적 문의</a>
                <a href="#faq">자주묻는 질문</a>
              </div>
            </div>
            <div class="menu_box">
              <p class="depth1">Community</p>
              <div class="depth2">
                <a href="#news">새소식</a>
                <a href="#newsletter">뉴스레터</a>
                <a href="#careers">상시채용</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ft_middle_sect">
        <div class="left">
          <form id="footerSubscriberFrm" onsubmit="subscribeNewsletter(event)" autocomplete="off">
            <div class="news">
              <p class="tit">뉴스레터 구독</p>
              <div class="subs_btn">
                <input type="email" placeholder="Your email address" id="footerEmail" required/>
                <button type="submit" class="ico">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1.5em"><path d="M495 273l17-17-17-17L359 103l-17-17L308.1 120l17 17 95 95L24 232 0 232l0 48 24 0 396.1 0-95 95-17 17 33.9 33.9 17-17L495 273z"/></svg>
                </button>
              </div>
              <div class="chk_box">
                <input type="checkbox" id="marketingChkFooter" required/>
                <label for="marketingChkFooter">
                  <span class="txt">(필수) 개인정보 수집 및 마케팅 정보 수신 동의</span>
                </label>
              </div>
            </div>
          </form>
        </div>
        <div class="right">
          <div class="copy">&copy; 2024 SOIJEONG</div>
          <p class="ft_logo_txt">soijeong</p>
        </div>
      </div>
      <div class="ft_btm_sect">
        <div class="copy">&copy; 2024 SOIJEONG</div>
        <div class="tag_wrap">
          <div class="tag">여성기업</div>
          <div class="tag">벤처기업</div>
          <div class="tag">가족친화인증기업</div>
          <div class="tag">산업디자인전문기업</div>
        </div>
      </div>
    </div>
  </footer>

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
        <video class="pf-card-video" autoplay muted loop playsinline preload="none" poster="/static/frame_5s.jpg" data-lazy-video>
          <source data-src="/static/hero_video.mp4" type="video/mp4">
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
        <video class="pf-card-video" autoplay muted loop playsinline preload="none" poster="/static/frame_5s.jpg" data-lazy-video>
          <source data-src="/static/hero_video.mp4" type="video/mp4">
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
        <video class="pf-card-video" autoplay muted loop playsinline preload="none" poster="/static/frame_5s.jpg" data-lazy-video>
          <source data-src="/static/hero_video.mp4" type="video/mp4">
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
        <video class="pf-card-video" autoplay muted loop playsinline preload="none" poster="/static/frame_5s.jpg" data-lazy-video>
          <source data-src="/static/hero_video.mp4" type="video/mp4">
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
        <video class="pf-card-video" autoplay muted loop playsinline preload="none" poster="/static/frame_5s.jpg" data-lazy-video>
          <source data-src="/static/hero_video.mp4" type="video/mp4">
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
<!-- ── Moving Text Wall: Success Stories ── -->
<div class="mv-wall mv-wall--dark">
  <div class="mv-track mv-track--reverse">
    <span class="mv-item">1,200+ Healthcare Institutions Supported</span>
    <span class="mv-sep">★</span>
    <span class="mv-item">1,200+ Healthcare Institutions Supported</span>
    <span class="mv-sep">★</span>
    <span class="mv-item">1,200+ Healthcare Institutions Supported</span>
    <span class="mv-sep">★</span>
    <span class="mv-item">1,200+ Healthcare Institutions Supported</span>
    <span class="mv-sep">★</span>
    <span class="mv-item">1,200+ Healthcare Institutions Supported</span>
    <span class="mv-sep">★</span>
    <span class="mv-item">1,200+ Healthcare Institutions Supported</span>
    <span class="mv-sep">★</span>
    <span class="mv-item">1,200+ Healthcare Institutions Supported</span>
    <span class="mv-sep">★</span>
    <span class="mv-item">1,200+ Healthcare Institutions Supported</span>
    <span class="mv-sep">★</span>
    <span class="mv-item">1,200+ Healthcare Institutions Supported</span>
    <span class="mv-sep">★</span>
    <span class="mv-item">1,200+ Healthcare Institutions Supported</span>
    <span class="mv-sep">★</span>
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
    <video class="about-vid" autoplay muted loop playsinline preload="none" poster="/static/frame_5s.jpg" data-lazy-video>
      <source data-src="/static/hero_video.mp4" type="video/mp4">
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
    <div class="mv-wall mv-wall--about">
      <div class="mv-track">
        <span class="mv-item">We Support Healthcare Excellence</span>
        <span class="mv-sep">✦</span>
        <span class="mv-item">We Support Healthcare Excellence</span>
        <span class="mv-sep">✦</span>
        <span class="mv-item">We Support Healthcare Excellence</span>
        <span class="mv-sep">✦</span>
        <span class="mv-item">We Support Healthcare Excellence</span>
        <span class="mv-sep">✦</span>
        <span class="mv-item">We Support Healthcare Excellence</span>
        <span class="mv-sep">✦</span>
        <!-- duplicate for seamless loop -->
        <span class="mv-item">We Support Healthcare Excellence</span>
        <span class="mv-sep">✦</span>
        <span class="mv-item">We Support Healthcare Excellence</span>
        <span class="mv-sep">✦</span>
        <span class="mv-item">We Support Healthcare Excellence</span>
        <span class="mv-sep">✦</span>
        <span class="mv-item">We Support Healthcare Excellence</span>
        <span class="mv-sep">✦</span>
        <span class="mv-item">We Support Healthcare Excellence</span>
        <span class="mv-sep">✦</span>
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

<!-- ── Moving Text Wall: Our Approach ── -->
<div class="mv-wall mv-wall--light">
  <div class="mv-track">
    <span class="mv-item mv-item--outline">Strategy + Technology + Human Touch</span>
    <span class="mv-sep">◆</span>
    <span class="mv-item mv-item--outline">Strategy + Technology + Human Touch</span>
    <span class="mv-sep">◆</span>
    <span class="mv-item mv-item--outline">Strategy + Technology + Human Touch</span>
    <span class="mv-sep">◆</span>
    <span class="mv-item mv-item--outline">Strategy + Technology + Human Touch</span>
    <span class="mv-sep">◆</span>
    <span class="mv-item mv-item--outline">Strategy + Technology + Human Touch</span>
    <span class="mv-sep">◆</span>
    <span class="mv-item mv-item--outline">Strategy + Technology + Human Touch</span>
    <span class="mv-sep">◆</span>
    <span class="mv-item mv-item--outline">Strategy + Technology + Human Touch</span>
    <span class="mv-sep">◆</span>
    <span class="mv-item mv-item--outline">Strategy + Technology + Human Touch</span>
    <span class="mv-sep">◆</span>
    <span class="mv-item mv-item--outline">Strategy + Technology + Human Touch</span>
    <span class="mv-sep">◆</span>
    <span class="mv-item mv-item--outline">Strategy + Technology + Human Touch</span>
    <span class="mv-sep">◆</span>
  </div>
</div>

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
<script>
/* ── Hero video: load after page paint ── */
(function(){
  var hv = document.getElementById('heroVid');
  if(!hv) return;
  function loadHero(){
    hv.querySelectorAll('source[data-src]').forEach(function(s){
      s.setAttribute('src',s.getAttribute('data-src'));
      s.removeAttribute('data-src');
    });
    hv.load();
    hv.play().catch(function(){});
  }
  if(document.readyState==='complete'){ setTimeout(loadHero,100); }
  else { window.addEventListener('load', function(){ setTimeout(loadHero,100); }); }
})();

/* ── Lazy-load other videos (data-lazy-video) via IntersectionObserver ── */
(function(){
  var videos = document.querySelectorAll('video[data-lazy-video]:not(#heroVid)');
  if (!videos.length) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var v = e.target;
      v.querySelectorAll('source[data-src]').forEach(function(s){
        s.setAttribute('src', s.getAttribute('data-src'));
        s.removeAttribute('data-src');
      });
      v.load();
      v.play().catch(function(){});
      io.unobserve(v);
    });
  }, {rootMargin: '300px'});
  videos.forEach(function(v){ io.observe(v); });
})();
</script>
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
    document.querySelector('.main_visual_new .tit_box')?.classList.add('active');
    setTimeout(() => {
      document.querySelector('.main_visual_new .tit_box')?.classList.add('on');
    }, 1800);
  }, 800);
});

// ===== NAV =====
function openNav() {
  document.getElementById('myNav').classList.add('open');
  document.getElementById('header').classList.add('open');
  document.querySelector('body').classList.add('none_scroll');
  document.querySelector('.hbgOpen')?.classList.add('active');
}
function closeNav() {
  document.getElementById('myNav').classList.remove('open');
  document.getElementById('header').classList.remove('open');
  document.querySelector('body').classList.remove('none_scroll');
  document.querySelector('.hbgOpen')?.classList.remove('active');
}

// ===== SCROLL HEADER =====
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if(window.scrollY <= 0) {
    header.classList.add('top');
  } else {
    header.classList.remove('top');
  }
});

// ===== TOP BUTTON =====
document.getElementById('quickTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Quick wrap scroll hide
window.addEventListener('scroll', () => {
  const qw = document.querySelector('.quick_wrap');
  const scrollPos = window.scrollY + window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;
  if(qw) {
    if(scrollPos >= docHeight - 500) { qw.classList.add('remove'); }
    else { qw.classList.remove('remove'); }
  }
});

// ===== SLIDE TXT ANIMATION =====
setTimeout(() => {
  const words = [
    ['A','I',' ','t','e','c','h'],
    ['D','e','s','i','g','n'],
    ['S','y','s','t','e','m'],
    ['M','o','b','i','l','e'],
    ['W','e','b','s','i','t','e'],
  ];
  let currentWord = 0;
  const slideTxt = document.querySelector('.main_visual_new .tit_box .txt .slide_txt');
  if(!slideTxt) return;

  function updateText() {
    const currentSpans = slideTxt.querySelectorAll('span:not(.line)');
    currentSpans.forEach((span, i) => {
      setTimeout(() => span.classList.add('changing'), i * 20);
    });
    const lineEl = slideTxt.querySelector('.line');
    if(lineEl) { setTimeout(() => lineEl.classList.add('changing'), currentSpans.length * 20); }

    setTimeout(() => {
      const newWord = words[currentWord];
      slideTxt.innerHTML = '';
      newWord.forEach((letter, i) => {
        const span = document.createElement('span');
        span.classList.add('changing');
        span.textContent = letter === ' ' ? '\u00a0' : letter;
        slideTxt.appendChild(span);
        span.offsetHeight;
        setTimeout(() => { span.classList.remove('changing'); span.classList.add('changed'); }, i * 50);
      });
      if(newWord.length < 8) {
        const line = document.createElement('span');
        line.classList.add('line', 'changing');
        slideTxt.appendChild(line);
        setTimeout(() => { line.classList.remove('changing'); line.classList.add('changed'); }, newWord.length * 50 + 450);
      }
      currentWord = (currentWord + 1) % words.length;
    }, currentSpans.length * 50 + 500);
  }
  setInterval(updateText, 5000);
}, 2000);

// ===== INTERSECTION OBSERVER for animations =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.sect_tit_box, .service_card, .project_list, .award_item, .nl_item, .tit_box').forEach(el => io.observe(el));

// ===== SWIPER: SOLUTION =====
const solSwiper = new Swiper('.sol_swiper', {
  slidesPerView: 1.5,
  spaceBetween: 20,
  speed: 800,
  loop: true,
  breakpoints: {
    500: { slidesPerView: 2.5 },
    1024: { slidesPerView: 3.5 }
  },
  navigation: { nextEl: '#solNext', prevEl: '#solPrev' },
  pagination: {
    el: '#solPaging',
    type: 'fraction',
    renderFraction: (curr, total) => '<span class="' + curr + '"></span> / <span class="' + total + '"></span>'
  }
});

// ===== SWIPER: NEWSLETTER =====
new Swiper('.nl_swiper', {
  slidesPerView: 1.2,
  spaceBetween: 16,
  speed: 600,
  loop: false,
  breakpoints: {
    600: { slidesPerView: 2.2 },
    1024: { slidesPerView: 3.2 }
  }
});

// ===== AWARD HOVER =====
const awardItems = document.querySelectorAll('.award_item');
awardItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    awardItems.forEach(i => { i.classList.remove('active'); i.classList.add('inactive'); });
    item.classList.remove('inactive');
    item.classList.add('active');
  });
});

// ===== SUBSCRIBE =====
function subscribeNewsletter(e) {
  e.preventDefault();
  const emailEl = e.target.querySelector('input[type="email"]');
  if(emailEl && emailEl.value) {
    alert('구독해 주셔서 감사합니다!\\n' + emailEl.value);
    emailEl.value = '';
  }
}

// ===== MARQUEE (fallback if CSS not enough) =====
// handled by CSS animations

// ===== MOBILE NAV ACCORDION =====
document.querySelectorAll('.nav_item > a').forEach(link => {
  link.addEventListener('click', function(e) {
    if(window.innerWidth < 769) {
      e.preventDefault();
      const li = this.parentElement;
      const isOpen = li.classList.contains('open');
      document.querySelectorAll('.nav_item').forEach(i => i.classList.remove('open'));
      if(!isOpen) li.classList.add('open');
    }
  });
});
<\/script>
</body>
</html>`)
})

export default app
