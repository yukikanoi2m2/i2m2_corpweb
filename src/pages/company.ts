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
          <tr><th>設立</th><td>2025年4月</td></tr>
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
            RVC（Community Value / M&A・事業承継）
          </td></tr>
          <tr><th>グループ実績</th><td>グループ社員200名以上 / 総売上20億円突破 / 複数クリニック・美容サロン経営</td></tr>
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
        <div class="history-year">2025.04</div>
        <div class="history-content">
          <h4>株式会社イズムズ 設立</h4>
          <p>ヘルスケア領域に特化した企業として創業。以降、複数クリニックの経営に関与。</p>
        </div>
      </div>
      <div class="history-item">
        <div class="history-year">2025.08</div>
        <div class="history-content">
          <h4>美容サロン事業 参入</h4>
          <p>新宿・恵比寿エリアにて美容サロンの経営に関与。ヘルスケア×ビューティー領域を拡大。</p>
        </div>
      </div>
      <div class="history-item">
        <div class="history-year">2025.12</div>
        <div class="history-content">
          <h4>M&amp;Aサービス リリース</h4>
          <p>医療・介護・美容を中心としたM&amp;A仲介・事業承継支援サービスを正式リリース。</p>
        </div>
      </div>
      <div class="history-item">
        <div class="history-year">2026.04</div>
        <div class="history-content">
          <h4>補助金コンサルティング リリース</h4>
          <p>融資・補助金申請支援サービスを開始。医療機関の資金調達を総合的にサポート。</p>
        </div>
      </div>
      <div class="history-item">
        <div class="history-year">2026.06</div>
        <div class="history-content">
          <h4>グループ社員200名突破・総売上20億円達成</h4>
          <p>創業1年2ヶ月でグループ社員200名以上、総売上20億円を突破。六本木ヒルズ森タワー37Fにオフィスを構える。</p>
        </div>
      </div>
    </div>
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

${ctaSection({ title: '事業内容・お取引についてのご質問もお気軽にどうぞ。' })}
`, { description: '株式会社イズムズ（i2m2 Co., Ltd.）の会社概要。2025年設立。六本木ヒルズ森タワー37F。ヘルスケア領域を中心に事業を展開。' }))
}

function messagePage(c: Context) {
  return c.html(layout('代表者メッセージ', `
${breadcrumb([{ label: '会社情報', href: '/company' }, { label: '代表者メッセージ' }])}

<section class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">代表者メッセージ</h1>
    <p class="page-hero-desc">MESSAGE FROM CEO</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="message-page-wrap">
      <div class="message-page-content">
        <h2>Bonanza: Fortune Smiles!</h2>
        <p>医療の現場に、確かな価値を届けたい。</p>
        <p>株式会社イズムズは2025年4月の創業以来、医療・ヘルスケア領域を中心に、クリニック経営支援・美容サロン運営・M&A仲介・補助金コンサルティングと事業を拡大してまいりました。</p>
        <p>日本の医療現場は今、深刻な課題を抱えています。後継者不在による医療法人の廃業、クリニックの集患難、医療従事者の慢性的な不足——。</p>
        <p>私たちはこれらの課題に対し、単なるコンサルティングではなく、現場に深く入り込んだ「伴走型支援」で向き合ってきました。</p>
        <p>創業から1年2ヶ月でグループ社員200名以上・総売上20億円を突破できたのは、ひとえにお客様・パートナーの皆様からのご信頼のおかげと感謝しております。</p>
        <p>私たちの目標は、ヘルスケアを起点とした事業プラットフォームを日本全国に広げ、地域社会の持続的な発展に貢献することです。</p>
        <p>引き続きご支援・ご指導のほど、よろしくお願いいたします。</p>
        <p class="message-author-block">株式会社イズムズ<br>代表取締役 中村 美華</p>
      </div>
    </div>
  </div>
</section>

${ctaSection({ title: '事業内容・お取引についてのご質問もお気軽にどうぞ。' })}
`, { description: '株式会社イズムズ 代表取締役 中村美華からのメッセージ。医療現場への伴走支援への思いをお伝えします。' }))
}

function philosophyPage(c: Context) {
  return c.html(layout('ミッション', `
${breadcrumb([{ label: '会社情報', href: '/company' }, { label: 'ミッション' }])}

<section class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">ミッション</h1>
    <p class="page-hero-desc">Mission / Vision / Values</p>
  </div>
</section>

<!-- MISSION -->
<section class="section">
  <div class="container">
    ${sectionTitle('MISSION', '全ての関わる人に幸運と繁栄を。')}
    <div class="philosophy-block">
      <div class="philosophy-main">
        <h2 class="philosophy-title">Bonanza: Fortune Smiles!</h2>
        <p class="philosophy-desc">医療・介護・福祉の現場に関わるすべての人が、安心して働き、患者さんが安心して治療を受けられる。そのための環境づくりを、私たちは事業を通じて実現します。</p>
      </div>
    </div>
  </div>
</section>

<!-- VISION -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('VISION', '地域医療インフラの担い手へ')}
    <div class="philosophy-block">
      <div class="philosophy-main">
        <h2 class="philosophy-title">Regional Value Creation</h2>
        <p class="philosophy-desc">ヘルスケアを起点に、M&A・人材・マーケティング・DXを一気通貫で提供できる会社として、日本各地の医療機関・事業者の持続的な成長を支えます。</p>
      </div>
    </div>
  </div>
</section>

<!-- VALUES -->
<section class="section">
  <div class="container">
    ${sectionTitle('VALUES', '私たちの価値観')}
    <div class="philosophy-block">
      <div class="philosophy-values">
        <div class="philosophy-value">
          <h3>ヘルスケアを起点に、地域を支える</h3>
          <p>地域に根ざした医療と事業の発展が、社会全体の豊かさにつながると信じて行動します。</p>
        </div>
        <div class="philosophy-value">
          <h3>ワンストップ支援</h3>
          <p>M&A・マーケティング・人材・DXを自社グループで完結。お客様の多様な課題をひとつの窓口で解決します。</p>
        </div>
        <div class="philosophy-value">
          <h3>誠実・透明な経営</h3>
          <p>関連法令・各種ガイドラインを遵守し、すべてのステークホルダーから信頼される経営を維持します。</p>
        </div>
        <div class="philosophy-value">
          <h3>現場への伴走</h3>
          <p>数字だけでなく、現場のリアルな課題に向き合い、お客様と共に考え、共に動くことを大切にします。</p>
        </div>
      </div>
    </div>
  </div>
</section>

${ctaSection({ title: '私たちの理念に共感いただけましたら、ぜひご一緒にお仕事しましょう。' })}
`, { description: '「全ての関わる人に幸運と繁栄を」をミッションに掲げる株式会社イズムズのMission・Vision・Valuesをご紹介します。' }))
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
        <div class="history-year">2025.04</div>
        <div class="history-content">
          <h4>株式会社イズムズ 設立</h4>
          <p>ヘルスケア領域に特化した企業として創業。以降、複数クリニックの経営に関与。</p>
        </div>
      </div>
      <div class="history-item">
        <div class="history-year">2025.08</div>
        <div class="history-content">
          <h4>美容サロン事業 参入</h4>
          <p>新宿・恵比寿エリアにて美容サロンの経営に関与。ヘルスケア×ビューティー領域を拡大。</p>
        </div>
      </div>
      <div class="history-item">
        <div class="history-year">2025.12</div>
        <div class="history-content">
          <h4>M&amp;Aサービス リリース</h4>
          <p>医療・介護・美容を中心としたM&amp;A仲介・事業承継支援サービスを正式リリース。</p>
        </div>
      </div>
      <div class="history-item">
        <div class="history-year">2026.04</div>
        <div class="history-content">
          <h4>補助金コンサルティング リリース</h4>
          <p>融資・補助金申請支援サービスを開始。医療機関の資金調達を総合的にサポート。</p>
        </div>
      </div>
      <div class="history-item">
        <div class="history-year">2026.06</div>
        <div class="history-content">
          <h4>グループ社員200名突破・総売上20億円達成</h4>
          <p>創業1年2ヶ月でグループ社員200名以上、総売上20億円を突破。六本木ヒルズ森タワー37Fにオフィスを構える。</p>
        </div>
      </div>
    </div>
  </div>
</section>

${ctaSection()}
`))
}
