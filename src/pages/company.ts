import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const companyPage = (c: Context) => {
  const sub = c.req.param('sub')

  if (sub === 'message') return messagePage(c)
  if (sub === 'philosophy') return philosophyPage(c)
  if (sub === 'history') return historyPage(c)

  return c.html(layout('会社概要', `
${breadcrumb([{ label: '会社概要' }])}

<section class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">会社概要</h1>
    <p class="page-hero-desc">Company Overview</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="company-table-wrap">
      <table class="company-table">
        <tbody>
          <tr><th>会社名</th><td>i2m2株式会社（アイツーエムツー）</td></tr>
          <tr><th>所在地</th><td>
            【東京オフィス】〒106-6137 東京都港区六本木6丁目10-1 六本木ヒルズ森タワー37F<br>
            【本社】〒270-2224 千葉県松戸市大橋149-1
          </td></tr>
          <tr><th>事業内容</th><td>
            ヘルスケアマーケティング事業<br>
            M&A仲介事業<br>
            人材紹介事業<br>
            医療クリニック・美容サロン等の経営支援<br>
            融資・補助金コンサルティング<br>
            カルテ電子化（医療DX）<br>
            その他事業再生支援
          </td></tr>
          <tr><th>展開ブランド</th><td>
            IHG™（Healthcare Services / 医療機関プロデュース）<br>
            DR-LINK™（Healthcare Talent / 医療系人材マッチング）<br>
            RVC（Community Value / 地域価値創造事業）
          </td></tr>
          <tr><th>グループ実績</th><td>累計取扱高20億円以上 / グループ総取引1000件以上 / 取引先100社以上</td></tr>
          <tr><th>関連事業</th><td>4everclinic 日本進出事業のプロデュース・運営支援</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionTitle('ACCESS', 'アクセス')}
    <div class="access-grid">
      <div class="access-card">
        <h3><i class="fas fa-building"></i> 東京オフィス</h3>
        <p class="access-address">〒106-6137<br>東京都港区六本木6丁目10-1<br>六本木ヒルズ森タワー37F</p>
        <p class="access-transport"><i class="fas fa-train"></i> 東京メトロ日比谷線「六本木駅」1C出口 徒歩3分<br><i class="fas fa-train"></i> 都営大江戸線「六本木駅」3番出口 徒歩6分</p>
      </div>
      <div class="access-card">
        <h3><i class="fas fa-home"></i> 本社</h3>
        <p class="access-address">〒270-2224<br>千葉県松戸市大橋149-1</p>
        <p class="access-transport"><i class="fas fa-train"></i> JR常磐線・新京成線「松戸駅」よりバス15分</p>
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
      <div class="message-page-content">
        <h2>Bonanza: Fortune Smiles!</h2>
        <p>i2m2は「全ての関わる人に幸運と繁栄を」をミッションに掲げ、ヘルスケア・医療領域を起点とした地域価値創造事業（RVC）を展開しています。</p>
        <p>私たちは、医療・介護・福祉のみならず、美容、IT、飲食など幅広い業種のお客様と向き合い、M&A仲介から経営支援まで一気通貫のソリューションを提供してまいりました。</p>
        <p>累計取扱高20億円超、グループ総取引1000件以上の実績を持つ私たちですが、大切にしているのは数字だけではありません。一つ一つの案件に真摯に向き合い、お客様の事業と地域社会に持続的な価値を創造すること—それが私たちの存在意義だと考えています。</p>
        <p>医療DXや事業承継といった社会的課題の解決を通じて、地域の未来を創る企業であり続けます。</p>
        <p class="message-author-block">i2m2株式会社 代表取締役</p>
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
          <h3>クリーン経営</h3>
          <p>高い透明性とガバナンスを維持し、全てのステークホルダーから信頼される企業であり続けます。</p>
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
          <h4>i2m2株式会社設立</h4>
          <p>千葉県松戸市に本社を設立。ヘルスケアマーケティング事業を開始。</p>
        </div>
      </div>
      <div class="history-item">
        <div class="history-year">2024</div>
        <div class="history-content">
          <h4>M&A仲介事業・人材紹介事業を開始</h4>
          <p>地域価値創造事業（RVC）の理念のもと、事業領域を拡大。グループ総取引1000件達成。</p>
        </div>
      </div>
      <div class="history-item">
        <div class="history-year">2025</div>
        <div class="history-content">
          <h4>東京・六本木ヒルズオフィス開設</h4>
          <p>六本木ヒルズ森タワー37Fにオフィスを開設。医療DX事業、美容サロンプロデュース事業を本格始動。4everclinic日本進出支援プロジェクト開始。</p>
        </div>
      </div>
    </div>
  </div>
</section>

${ctaSection()}
`))
}
