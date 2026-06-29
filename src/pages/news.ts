import type { Context } from 'hono'
import { layout, sectionTitle, breadcrumb } from '../components/layout'

const newsData = [
  {
    date: '2026.06.20',
    tag: 'IR',
    tagColor: '#b8860b',
    title: 'グループ社員200名突破・総売上20億円を達成いたしました',
    content: '株式会社イズムズは、2025年4月の創業から約1年2ヶ月でグループ社員200名以上、総売上20億円を突破いたしました。これもひとえに、お客様・パートナー企業の皆様のご支援の賜物と心より感謝申し上げます。今後もヘルスケア領域を起点とした地域価値創造事業に邁進してまいります。'
  },
  {
    date: '2026.06.01',
    tag: 'お知らせ',
    tagColor: '#555',
    title: '六本木ヒルズ森タワー37Fにオフィスを開設いたしました',
    content: '事業拡大に伴い、本社オフィスを六本木ヒルズ森タワー37Fに移転いたしました。これにより、お客様・お取引先の皆様へのアクセス利便性が向上し、より一層迅速なサービス提供が可能となります。'
  },
  {
    date: '2026.04.15',
    tag: '事業報告',
    tagColor: '#2563a8',
    title: '補助金コンサルティングサービスを開始いたしました',
    content: '医療機関向けの融資・補助金申請支援サービスを正式にリリースいたしました。IT導入補助金、事業再構築補助金、ものづくり補助金など、各種補助金の申請から採択まで一気通貫でサポートいたします。医療機関の設備投資・経営改善にお役立てください。'
  },
  {
    date: '2026.03.01',
    tag: '採用',
    tagColor: '#16a34a',
    title: 'M&Aアドバイザー・医療マーケティング担当を積極採用中です',
    content: '事業拡大に伴い、M&Aアドバイザー、医療マーケティング担当、人材アドバイザーなど複数ポジションで積極採用を行っています。書類選考なし・カジュアル面談から対応しておりますので、ご興味のある方はお気軽にお問い合わせください。'
  },
  {
    date: '2025.12.10',
    tag: '事業報告',
    tagColor: '#2563a8',
    title: 'M&A仲介・事業承継支援サービスを正式リリースいたしました',
    content: '医療・介護・美容を中心としたM&A仲介・事業承継支援サービスをリリースいたしました。後継者不在による医療法人の廃業を防ぎ、地域医療インフラを守るため、買い手候補の選定から基本合意・クロージングまで一気通貫で支援します。秘密厳守にて対応いたします。'
  },
  {
    date: '2025.10.01',
    tag: 'お知らせ',
    tagColor: '#555',
    title: 'コーポレートサイトをリニューアルいたしました',
    content: '株式会社イズムズのコーポレートサイトを全面リニューアルいたしました。事業内容や実績情報をより分かりやすくお伝えできるよう、デザインと構成を一新しています。今後とも何卒よろしくお願いいたします。'
  },
  {
    date: '2025.08.20',
    tag: '事業報告',
    tagColor: '#2563a8',
    title: '新宿・恵比寿エリアにて美容サロン事業に参入いたしました',
    content: 'ヘルスケア×ビューティー領域の拡大として、新宿・恵比寿エリアにおいて美容サロンの経営に関与を開始いたしました。医療機関との連携による美容医療とエステティックのシナジー創出を目指してまいります。'
  },
  {
    date: '2025.04.01',
    tag: 'IR',
    tagColor: '#b8860b',
    title: '株式会社イズムズを設立いたしました',
    content: 'ヘルスケア領域に特化した地域価値創造企業として株式会社イズムズ（i2m2 Co., Ltd.）を設立いたしました。「Bonanza: Fortune Smiles!」を企業理念に掲げ、医療・介護・福祉に関わるすべての方に幸運と繁栄をお届けいたします。'
  }
]

export const newsPage = (c: Context) => {
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
        <div class="news-page-meta">
          <time class="news-page-date">${item.date}</time>
          <span class="news-page-tag" style="background:${item.tagColor}">${item.tag}</span>
        </div>
        <h2 class="news-page-title">${item.title}</h2>
        <p class="news-page-body">${item.content}</p>
      </article>
      `).join('')}
    </div>
  </div>
</section>
`, { description: '株式会社イズムズの最新のお知らせ・プレスリリース。事業報告、IR情報、採用情報などをご覧いただけます。' }))
}
