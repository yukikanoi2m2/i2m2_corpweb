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
    <p class="page-hero__lead">
      株式会社イズムズは、ヘルスケア領域を中心に<br class="u-pc-only">
      医療機関・地域社会への貢献を目指す会社です。
    </p>
  </div>
</section>

<!-- 会社説明資料スライド -->
<section class="p-company-slide">
  <div class="container">
    <p class="p-company-slide__label">会社説明資料</p>
    <div class="p-company-slide__wrapper">
      <iframe
        src="https://docs.google.com/presentation/d/1dvFFGTMeE8gJMrUEZObYi-ibxQqzE7qrch_1h61SJS8/embed?start=false&loop=false&delayms=3000"
        frameborder="0"
        width="960"
        height="569"
        allowfullscreen="true"
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        title="株式会社イズムズ 会社説明資料"
      ></iframe>
    </div>
  </div>
</section>

<!-- 会社概要テーブル -->
<section class="section">
  <div class="container">
    ${sectionTitle('PROFILE', '会社概要')}
    <div class="company-table-wrap">
      <table class="company-table">
        <tbody>
          <tr><th>商号</th><td>株式会社イズムズ（i2m2 Co., Ltd.）</td></tr>
          <tr><th>設立</th><td>2025年4月2日</td></tr>
          <tr><th>代表者</th><td>代表取締役 中村美華</td></tr>
          <tr><th>本社所在地</th><td>〒106-6137 東京都港区六本木6-10-1 六本木ヒルズ森タワー37F</td></tr>
          <tr><th>事業内容</th><td>
            医療機関プロデュース<br>
            医療系人材マッチング（DR-LINK™）<br>
            M&amp;A仲介・事業承継・事業再生（RVC）<br>
            医療DX（カルテ電子化）<br>
            経営改善支援
          </td></tr>
          <tr><th>グループ実績</th><td>
            グループ総売上 36億円突破（2026年6月時点）<br>
            グループ社員 641名<br>
            複数クリニック・美容サロン経営<br>
            広告運用額 36億円以上
          </td></tr>
          <tr><th>連絡先</th><td><a href="/contact" style="color:var(--accent-light);text-decoration:underline;">お問い合わせフォーム</a></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- 私たちの強み -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('OUR STRENGTHS', '私たちの強み')}
    <div class="additional-grid">
      <div class="additional-item">
        <div class="additional-icon"><i class="fas fa-heartbeat"></i></div>
        <h4>ヘルスケア領域への深い専門性</h4>
        <p>医療マーケティング・人材・M&A・DXを一気通貫で提供できるヘルスケア特化の総合支援会社です。クリニックの集患支援から医療法人の事業承継まで、幅広い経営課題に対応します。</p>
      </div>
      <div class="additional-item">
        <div class="additional-icon"><i class="fas fa-chart-bar"></i></div>
        <h4>豊富な支援実績</h4>
        <p>グループ総取引889件・累計取扱高36億円以上の実績を持ちます。医療・介護・美容など幅広い業種のお客様とお取引しています。</p>
      </div>
      <div class="additional-item">
        <div class="additional-icon"><i class="fas fa-handshake"></i></div>
        <h4>誠実・透明な事業運営</h4>
        <p>医療情報・個人情報の適切な管理を徹底し、関連法令・各種ガイドラインを遵守した事業運営を行っています。お取引先の皆様との長期的な信頼関係を最優先に考えています。</p>
      </div>
    </div>
  </div>
</section>

<!-- コンプライアンス -->
<section class="section">
  <div class="container">
    ${sectionTitle('COMPLIANCE', 'コンプライアンス')}
    <div class="ir-card" style="max-width:800px; margin:0 auto;">
      <p style="font-size:14px; color:var(--color-text); line-height:2.2;">
        株式会社イズムズは、医療・個人情報等の機密情報を適切に管理し、医療広告ガイドライン・職業安定法・個人情報保護法をはじめとする関連法令および各種ガイドラインを遵守した事業運営を行っています。
      </p>
      <p style="font-size:14px; color:var(--color-text); line-height:2.2; margin-top:16px;">
        お客様・金融機関・取引先の皆様に安心してご利用・お取引いただけるよう、情報管理体制の継続的な改善に努めてまいります。
      </p>
      <p style="font-size:14px; color:var(--color-text); line-height:2.2; margin-top:16px;">
        個人情報の取り扱いについては、<a href="/legal" style="color:var(--accent-light); text-decoration:underline;">プライバシーポリシー</a>をご参照ください。
      </p>
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
          <h4>経営改善支援サービス リリース</h4>
          <p>経営改善支援サービスを開始。医療機関の資金調達を総合的にサポート。</p>
        </div>
      </div>
      <div class="history-item">
        <div class="history-year">2026.06</div>
        <div class="history-content">
          <h4>グループ社員641名突破・総売上36億円達成</h4>
          <p>創業1年2ヶ月でグループ社員641名以上、総売上36億円を突破。東京都港区六本木に本社を移転。</p>
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
        <p class="access-address">〒106-6137<br>東京都港区六本木6-10-1<br>六本木ヒルズ森タワー37F</p>
        <p class="access-transport"><i class="fas fa-train"></i> 東京メトロ日比谷線「六本木駅」1C出口 徒歩0分（コンコース直結）</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.6605334212863!2d139.72663167663563!3d35.66073447259391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b828453ffff%3A0xb8603beeb9b150d8!2z5YWt5pys5pyo44OS44Or44K65qOu44K_44Ov44O8!5e0!3m2!1sja!2sjp!4v1784793998296!5m2!1sja!2sjp"
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

<!-- お知らせ -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('NEWS', 'お知らせ')}
    <ul class="news-list">
      <li class="news-item">
        <time>2026.06</time>
        <span class="news-tag">IR</span>
        <a href="/news">グループ社員641名突破・総売上36億円を達成いたしました</a>
      </li>
      <li class="news-item">
        <time>2026.04</time>
        <span class="news-tag">事業報告</span>
        <a href="/news">経営改善支援サービスを開始いたしました</a>
      </li>
      <li class="news-item">
        <time>2025.12</time>
        <span class="news-tag">事業報告</span>
        <a href="/news">M&amp;A仲介・事業承継支援サービスを正式リリースいたしました</a>
      </li>
    </ul>
  </div>
</section>

${ctaSection({ title: 'お取引・事業連携に関するご相談はお気軽にどうぞ。' })}
`, { description: '株式会社イズムズ（i2m2 Co., Ltd.）の会社概要・企業情報。2025年設立。東京都港区六本木。ヘルスケア領域を中心に事業を展開。' }))
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
        <p>株式会社イズムズは2025年4月の創業以来、医療・ヘルスケア領域を中心に、クリニック経営支援・美容サロン運営・M&A仲介・経営改善支援と事業を拡大してまいりました。</p>
        <p>日本の医療現場は今、深刻な課題を抱えています。後継者不在による医療法人の廃業、クリニックの集患難、医療従事者の慢性的な不足——。</p>
        <p>私たちはこれらの課題に対し、単なるコンサルティングではなく、現場に深く入り込んだ「伴走型支援」で向き合ってきました。</p>
        <p>創業から1年2ヶ月でグループ社員641名以上・総売上36億円を突破できたのは、ひとえにお客様・パートナーの皆様からのご信頼のおかげと感謝しております。</p>
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
          <h4>経営改善支援サービス リリース</h4>
          <p>経営改善支援サービスを開始。医療機関の資金調達を総合的にサポート。</p>
        </div>
      </div>
      <div class="history-item">
        <div class="history-year">2026.06</div>
        <div class="history-content">
          <h4>グループ社員641名突破・総売上36億円達成</h4>
          <p>創業1年2ヶ月でグループ社員641名以上、総売上36億円を突破。東京都港区六本木に本社を移転。</p>
        </div>
      </div>
    </div>
  </div>
</section>

${ctaSection()}
`))
}
