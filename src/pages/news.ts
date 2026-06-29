import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

const newsData = [
  {
    id: '2026-06-group-200',
    date: '2026.06.20',
    tag: 'IR',
    tagColor: '#b8860b',
    title: 'グループ社員200名突破・総売上20億円を達成いたしました',
    content: `<p>株式会社イズムズは、2025年4月の創業から約1年2ヶ月でグループ社員200名以上、総売上20億円を突破いたしました。</p>
<p>これもひとえに、お客様・パートナー企業の皆様のご支援の賜物と心より感謝申し上げます。</p>
<p>当社は「Bonanza: Fortune Smiles!（全ての関わる人に幸運と繁栄を）」を企業理念に掲げ、ヘルスケア領域を起点とした事業を展開しております。クリニック経営支援、美容サロン事業、M&A仲介、補助金コンサルティングなど、多角的な事業を通じて急速な成長を実現してまいりました。</p>
<p>今後も引き続き、医療・介護・福祉に関わるすべての方に価値を届けるべく、事業の拡充と人材の採用に注力してまいります。</p>
<p>引き続きご支援・ご指導のほど、よろしくお願いいたします。</p>`
  },
  {
    id: '2026-06-roppongi-office',
    date: '2026.06.01',
    tag: 'お知らせ',
    tagColor: '#555',
    title: '六本木ヒルズ森タワー37Fにオフィスを開設いたしました',
    content: `<p>事業拡大に伴い、本社オフィスを六本木ヒルズ森タワー37Fに移転いたしました。</p>
<p>これにより、お客様・お取引先の皆様へのアクセス利便性が向上し、より一層迅速なサービス提供が可能となります。</p>
<h3>新オフィス所在地</h3>
<p>〒106-6137<br>東京都港区六本木6丁目10-1<br>六本木ヒルズ森タワー37F</p>
<h3>アクセス</h3>
<ul>
<li>東京メトロ日比谷線「六本木駅」1C出口 徒歩3分</li>
<li>都営大江戸線「六本木駅」3番出口 徒歩6分</li>
</ul>
<p>今後とも何卒よろしくお願いいたします。</p>`
  },
  {
    id: '2026-04-subsidy',
    date: '2026.04.15',
    tag: '事業報告',
    tagColor: '#2563a8',
    title: '補助金コンサルティングサービスを開始いたしました',
    content: `<p>医療機関向けの融資・補助金申請支援サービスを正式にリリースいたしました。</p>
<h3>対応補助金一覧</h3>
<ul>
<li>IT導入補助金</li>
<li>事業再構築補助金</li>
<li>ものづくり補助金</li>
<li>小規模事業者持続化補助金</li>
<li>各自治体独自の医療機関向け助成金</li>
</ul>
<p>補助金の選定から申請書作成、採択後の実績報告まで一気通貫でサポートいたします。医療機関の設備投資・経営改善にぜひお役立てください。</p>
<p>ご相談は無料です。お気軽にお問い合わせください。</p>`
  },
  {
    id: '2026-03-recruit',
    date: '2026.03.01',
    tag: '採用',
    tagColor: '#16a34a',
    title: 'M&Aアドバイザー・医療マーケティング担当を積極採用中です',
    content: `<p>事業拡大に伴い、以下のポジションで積極採用を行っています。</p>
<h3>募集職種</h3>
<ul>
<li>M&Aアドバイザー（医療・介護・美容領域）</li>
<li>医療マーケティング担当（広告運用・MEO・SNS）</li>
<li>人材アドバイザー（医師・看護師・薬剤師紹介）</li>
<li>補助金コンサルタント</li>
<li>事業開発担当</li>
</ul>
<h3>応募について</h3>
<p>書類選考なし・カジュアル面談から対応しております。業界未経験の方も歓迎いたします。ご興味のある方はお気軽にお問い合わせページよりご連絡ください。</p>`
  },
  {
    id: '2025-12-ma-release',
    date: '2025.12.10',
    tag: '事業報告',
    tagColor: '#2563a8',
    title: 'M&A仲介・事業承継支援サービスを正式リリースいたしました',
    content: `<p>医療・介護・美容を中心としたM&A仲介・事業承継支援サービスをリリースいたしました。</p>
<p>後継者不在による医療法人の廃業を防ぎ、地域医療インフラを守るため、以下のサービスをワンストップで提供します。</p>
<h3>サービス内容</h3>
<ul>
<li>売却希望者へのヒアリング・企業価値評価</li>
<li>買い手候補の選定・匿名打診</li>
<li>基本合意・デューデリジェンス支援</li>
<li>最終契約・クロージング</li>
<li>PMI（統合後支援）</li>
</ul>
<p>完全成功報酬型・秘密厳守にて対応いたします。まずは無料相談からお気軽にどうぞ。</p>`
  },
  {
    id: '2025-10-site-renewal',
    date: '2025.10.01',
    tag: 'お知らせ',
    tagColor: '#555',
    title: 'コーポレートサイトをリニューアルいたしました',
    content: `<p>株式会社イズムズのコーポレートサイトを全面リニューアルいたしました。</p>
<p>事業内容や実績情報をより分かりやすくお伝えできるよう、デザインと構成を一新しています。</p>
<p>今後も随時コンテンツを拡充してまいりますので、何卒よろしくお願いいたします。</p>`
  },
  {
    id: '2025-08-beauty-salon',
    date: '2025.08.20',
    tag: '事業報告',
    tagColor: '#2563a8',
    title: '新宿・恵比寿エリアにて美容サロン事業に参入いたしました',
    content: `<p>ヘルスケア×ビューティー領域の拡大として、新宿・恵比寿エリアにおいて美容サロンの経営に関与を開始いたしました。</p>
<p>医療機関との連携による美容医療とエステティックのシナジー創出を目指し、お客様に安心・安全な美容サービスを提供してまいります。</p>
<p>今後も首都圏を中心にエリアを拡大予定です。</p>`
  },
  {
    id: '2025-04-founding',
    date: '2025.04.01',
    tag: 'IR',
    tagColor: '#b8860b',
    title: '株式会社イズムズを設立いたしました',
    content: `<p>ヘルスケア領域に特化した企業として株式会社イズムズ（i2m2 Co., Ltd.）を設立いたしました。</p>
<p>「Bonanza: Fortune Smiles!」を企業理念に掲げ、医療・介護・福祉に関わるすべての方に幸運と繁栄をお届けいたします。</p>
<h3>事業内容</h3>
<ul>
<li>医療機関プロデュース（IHG™ Healthcare Services）</li>
<li>医療系人材マッチング（DR-LINK™）</li>
<li>M&A仲介・事業承継（RVC）</li>
<li>医療DX（カルテ電子化）</li>
</ul>
<p>ヘルスケアを起点に、地域社会の価値を高める事業を展開してまいります。</p>`
  }
]

// 一覧ページ
export const newsPage = (c: Context) => {
  const id = c.req.param('id')

  // 個別ページ
  if (id) {
    const article = newsData.find(n => n.id === id)
    if (!article) return c.notFound()
    return newsDetailPage(c, article)
  }

  // 一覧ページ
  return c.html(layout('お知らせ', `
${breadcrumb([{ label: 'お知らせ' }])}

<section class="page-hero" style="background:linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.85)),url('/static/images/city-arc.jpg') center/cover no-repeat;">
  <div class="container">
    <span class="page-hero__label">NEWS</span>
    <h1 class="page-hero__title-en">お知らせ</h1>
    <p class="page-hero__lead">株式会社イズムズからのお知らせ・プレスリリースをご覧いただけます。</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="news-page-list">
      ${newsData.map(item => `
      <article class="news-page-item" data-reveal>
        <a href="/news/${item.id}" class="news-page-link">
          <div class="news-page-meta">
            <time class="news-page-date">${item.date}</time>
            <span class="news-page-tag" style="background:${item.tagColor}">${item.tag}</span>
          </div>
          <h2 class="news-page-title">${item.title}</h2>
        </a>
      </article>
      `).join('')}
    </div>
  </div>
</section>
`, { description: '株式会社イズムズの最新のお知らせ・プレスリリース。事業報告、IR情報、採用情報などをご覧いただけます。' }))
}

// 個別記事ページ
function newsDetailPage(c: Context, article: typeof newsData[0]) {
  return c.html(layout(article.title, `
${breadcrumb([{ label: 'お知らせ', href: '/news' }, { label: article.title }])}

<section class="page-hero" style="background:linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.85)),url('/static/images/city-arc.jpg') center/cover no-repeat;">
  <div class="container">
    <span class="page-hero__label">NEWS</span>
    <h1 class="page-hero__title-en">お知らせ</h1>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="news-detail">
      <div class="news-detail-meta">
        <time class="news-page-date">${article.date}</time>
        <span class="news-page-tag" style="background:${article.tagColor}">${article.tag}</span>
      </div>
      <h1 class="news-detail-title">${article.title}</h1>
      <div class="news-detail-body">
        ${article.content}
      </div>
      <div class="news-detail-back">
        <a href="/news" class="btn btn-outline">← お知らせ一覧に戻る</a>
      </div>
    </div>
  </div>
</section>
`, { description: `${article.title} - 株式会社イズムズのお知らせ` }))
}
