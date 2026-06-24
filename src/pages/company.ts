import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const companyPage = (c: Context) => {
  const sub = c.req.param('sub')

  if (sub === 'message') return messagePage(c)
  if (sub === 'philosophy') return philosophyPage(c)
  if (sub === 'history') return historyPage(c)

  return c.html(layout('会社概要', `
${breadcrumb([{ label: '会社概要' }])}

<section class="page-hero" style="background:linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.85)),url('/static/images/tokyo-night.jpg') center/cover no-repeat;">
  <div class="container">
    <span class="page-hero__label">COMPANY</span>
    <h1 class="page-hero__title-en">Company Overview</h1>
    <p class="page-hero__title-ja">— 会社概要 —</p>
  </div>
</section>

<!-- 会社説明スライド -->
<!-- =====================================================
     会社説明スライド 差し替え手順
     SpeakerDeck の場合：
       src を "https://speakerdeck.com/player/【スライドID】" に変更
     Google スライドの場合：
       src を "https://docs.google.com/presentation/d/【ID】/embed" に変更
     PLACEHOLDERを実際のURLに差し替えると自動で表示されます
     ===================================================== -->
<section id="company-slide" class="p-company-slide-section">
  <div class="container">
    <div class="p-company-slide">
      <iframe
        id="company-slide-iframe"
        frameborder="0"
        src="https://speakerdeck.com/player/PLACEHOLDER"
        title="i2m2 Co., Ltd. 会社説明資料"
        allowfullscreen="true"
        style="
          border: 0px;
          background: rgba(0,0,0,0.1);
          border-radius: 6px;
          box-shadow: rgba(0,0,0,0.2) 0px 5px 40px;
          width: 100%;
          height: auto;
          aspect-ratio: 560 / 315;
        "
        data-ratio="1.7777">
      </iframe>
      <p class="p-company-slide__note">
        ※ 会社説明資料をご覧いただけます。
      </p>
    </div>
  </div>
</section>
<script>
  (function() {
    var iframe = document.getElementById('company-slide-iframe');
    if (iframe && iframe.src.includes('PLACEHOLDER')) {
      var section = iframe.closest('.p-company-slide-section');
      if (section) section.style.display = 'none';
    }
  })();
</script>

<!-- 会社概要テーブル -->
<section class="section">
  <div class="container">
    ${sectionTitle('PROFILE', '会社概要')}
    <div class="company-table-wrap">
      <table class="company-table">
        <tbody>
          <tr><th>会社名</th><td>株式会社イズムズ（i2m2 Co., Ltd.）</td></tr>
          <tr><th>設立</th><td>2023年</td></tr>
          <tr><th>所在地</th><td>
            〒106-6137 東京都港区六本木6丁目10-1 六本木ヒルズ森タワー37F
          </td></tr>
          <tr><th>事業内容</th><td>
            ヘルスケアマーケティング事業<br>
            M&amp;A仲介事業<br>
            人材紹介事業<br>
            医療クリニック等の経営支援<br>
            融資・補助金コンサルティング<br>
            カルテ電子化（医療DX）<br>
            その他事業再生支援
          </td></tr>
          <tr><th>展開ブランド</th><td>
            IHG™（Healthcare Services / 医療機関プロデュース）<br>
            DR-LINK™（Healthcare Talent / 医療系人材マッチング）<br>
            RVC（Community Value / 地域価値創造事業）
          </td></tr>
          <tr><th>グループ実績</th><td>累計取扱高20億円以上 / グループ総取引1,000件以上 / 取引先100社以上</td></tr>
          <tr><th>連絡先</th><td>info@i2m2.com</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- 沿革 -->
<section id="company-history" class="section section-alt">
  <div class="container">
    ${sectionTitle('HISTORY', '沿革')}
    <div class="history-timeline">
      <div class="history-item">
        <div class="history-year">2023</div>
        <div class="history-content">
          <h4>株式会社イズムズ 設立</h4>
          <p>IHG™ Healthcare Services（医療機関プロデュース事業）開始</p>
        </div>
      </div>
      <div class="history-item">
        <div class="history-year">2024</div>
        <div class="history-content">
          <h4>DR-LINK™ Healthcare Talent 開始</h4>
          <p>医療系人材マッチング事業を開始。累計取引1,000件突破。</p>
        </div>
      </div>
      <div class="history-item">
        <div class="history-year">2025</div>
        <div class="history-content">
          <h4>東京・六本木ヒルズオフィス開設</h4>
          <p>六本木ヒルズ森タワー37Fにオフィスを移転。医療DX（カルテ電子化）サービス提供開始。</p>
        </div>
      </div>
    </div>
    <p style="font-size:0.75rem;color:#888;margin-top:8px;">
      ※ 正確な年月は確認の上、差し替えてください。
    </p>
  </div>
</section>

<!-- アクセス -->
<section class="section">
  <div class="container">
    ${sectionTitle('ACCESS', 'アクセス')}
    <div class="access-grid" style="grid-template-columns:1fr;">
      <div class="access-card">
        <h3><i class="fas fa-building"></i> 本社</h3>
        <p class="access-address">〒106-6137<br>東京都港区六本木6丁目10-1<br>六本木ヒルズ森タワー37F</p>
        <p class="access-transport"><i class="fas fa-train"></i> 東京メトロ日比谷線「六本木駅」1C出口 徒歩3分<br><i class="fas fa-train"></i> 都営大江戸線「六本木駅」3番出口 徒歩6分</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7479863805396!2d139.72935491524772!3d35.66027198019437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b770dce4f4b%3A0x4d7e4e4b13b59e3!2z5YWt5pys5pyo5qCh5aOr5aSn5a2m!5e0!3m2!1sja!2sjp!4v1680000000000!5m2!1sja!2sjp"
          width="100%"
          height="400"
          style="border:0; border-radius:6px; margin-top:16px;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  </div>
</section>

${ctaSection()}
`))
}

function messagePage(c: Context) {
  return c.html(layout('代表メッセージ', `
${breadcrumb([{ label: '会社情報', href: '/company' }, { label: '代表メッセージ' }])}

<section class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">代表メッセージ</h1>
    <p class="page-hero-desc">Message from CEO</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="message-page-wrap">
      <div style="text-align:center;margin-bottom:40px;">
        <img src="/static/images/ceo-portrait.jpg" alt="代表取締役" style="width:200px;height:200px;object-fit:cover;border-radius:50%;border:3px solid rgba(184,134,11,.3);margin:0 auto;">
      </div>
      <div class="message-page-content">
        <h2>Bonanza: Fortune Smiles!</h2>
        <p>株式会社イズムズは「全ての関わる人に幸運と繁栄を」をミッションに掲げ、ヘルスケア・医療領域を起点とした地域価値創造事業（RVC）を展開しています。</p>
        <p>私たちは、医療・介護・福祉のみならず、美容、IT、飲食など幅広い業種のお客様と向き合い、M&A仲介から経営支援まで一気通貫のソリューションを提供してまいりました。</p>
        <p>累計取扱高20億円超、グループ総取引1,000件以上の実績を持つ私たちですが、大切にしているのは数字だけではありません。一つ一つの案件に真摯に向き合い、お客様の事業と地域社会に持続的な価値を創造すること—それが私たちの存在意義だと考えています。</p>
        <p>医療DXや事業承継といった社会的課題の解決を通じて、地域の未来を創る企業であり続けます。</p>
        <p class="message-author-block">i2m2 Co., Ltd. 代表取締役</p>
      </div>
    </div>
  </div>
</section>

${ctaSection()}
`))
}

function philosophyPage(c: Context) {
  return c.html(layout('ミッション', `
${breadcrumb([{ label: '会社情報', href: '/company' }, { label: 'ミッション' }])}

<section class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">ミッション</h1>
    <p class="page-hero-desc">Our Mission</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="philosophy-block">
      <div class="philosophy-main">
        <h2 class="philosophy-title">Bonanza: Fortune Smiles!</h2>
        <p class="philosophy-desc">全ての関わる人に幸運と繁栄を。</p>
      </div>
      <div class="philosophy-values">
        <div class="philosophy-value">
          <h3>地域価値創造 — Regional Value Creation</h3>
          <p>ヘルスケアを起点に、地域社会の価値を高める事業を多角的に展開し、地域の持続的な発展に貢献します。</p>
        </div>
        <div class="philosophy-value">
          <h3>ワンストップ支援</h3>
          <p>M&A・マーケティング・人材・DXをグループ内で完結。お客様の多様な課題に対し横断的な解決策を提供します。</p>
        </div>
        <div class="philosophy-value">
          <h3>誠実な経営</h3>
          <p>高い透明性と法令遵守を維持し、全てのステークホルダーから信頼される企業であり続けます。</p>
        </div>
      </div>
    </div>
  </div>
</section>

${ctaSection()}
`))
}

function historyPage(c: Context) {
  return c.html(layout('沿革', `
${breadcrumb([{ label: '会社情報', href: '/company' }, { label: '沿革' }])}

<section class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">沿革</h1>
    <p class="page-hero-desc">History</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="history-timeline">
      <div class="history-item">
        <div class="history-year">2023</div>
        <div class="history-content">
          <h4>株式会社イズムズ 設立</h4>
          <p>IHG™ Healthcare Services（医療機関プロデュース事業）開始。</p>
        </div>
      </div>
      <div class="history-item">
        <div class="history-year">2024</div>
        <div class="history-content">
          <h4>DR-LINK™ Healthcare Talent 開始</h4>
          <p>医療系人材マッチング事業を開始。グループ総取引1,000件達成。</p>
        </div>
      </div>
      <div class="history-item">
        <div class="history-year">2025</div>
        <div class="history-content">
          <h4>東京・六本木ヒルズオフィス開設</h4>
          <p>六本木ヒルズ森タワー37Fにオフィスを移転。医療DX（カルテ電子化）サービス提供開始。</p>
        </div>
      </div>
    </div>
  </div>
</section>

${ctaSection()}
`))
}
