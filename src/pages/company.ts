import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const companyPage = (c: Context) => {
  const sub = c.req.param('sub') || ''
  
  let content = ''
  let title = '会社概要'

  if (sub === 'message') {
    title = '代表メッセージ'
    content = messageContent()
  } else if (sub === 'philosophy') {
    title = '経営理念'
    content = philosophyContent()
  } else if (sub === 'history') {
    title = '沿革'
    content = historyContent()
  } else {
    content = overviewContent()
  }

  return c.html(layout(title, `
${breadcrumb([{ label: title }])}
<section class="page-hero"><div class="container"><h1 class="page-title">${title}</h1></div></section>
${content}
${ctaSection()}
`))
}

function overviewContent() {
  return `
<section class="section">
  <div class="container">
    <table class="info-table">
      <tr><th>会社名</th><td>株式会社サンプル</td></tr>
      <tr><th>所在地</th><td>〒100-0001 東京都千代田区千代田1-1-1</td></tr>
      <tr><th>代表者</th><td>代表取締役 山田 太郎</td></tr>
      <tr><th>設立</th><td>2010年4月</td></tr>
      <tr><th>資本金</th><td>1,000万円</td></tr>
      <tr><th>事業内容</th><td>M&A仲介・FA事業<br>広告・マーケティング支援事業<br>医療機器代理店事業<br>医療機関経営支援事業</td></tr>
      <tr><th>取引銀行</th><td>三菱UFJ銀行 / みずほ銀行 / 三井住友銀行</td></tr>
      <tr><th>顧問士業</th><td>弁護士法人○○ / 税理士法人○○ / 社会保険労務士法人○○</td></tr>
      <tr><th>加盟団体</th><td>一般社団法人○○協会</td></tr>
    </table>
  </div>
</section>`
}

function messageContent() {
  return `
<section class="section">
  <div class="container narrow">
    <div class="message-page">
      <div class="message-photo-large"><i class="fas fa-user-tie"></i></div>
      <h2>医療・ヘルスケア領域の発展に貢献する</h2>
      <p>私たちは2010年の創業以来、医療・ヘルスケア領域における法人の課題解決に取り組んでまいりました。</p>
      <p>「後継者がいない」「集患に困っている」「良い人材が採用できない」——医療機関や法人が抱える課題は多岐にわたります。しかし、これらの課題に対して本当に寄り添い、実務レベルで解決できるパートナーは多くありません。</p>
      <p>当社は、M&A支援・広告マーケティング・医療機器調達・経営支援という4つの事業を通じて、お客様の課題に対してワンストップで応えられる体制を構築しています。</p>
      <p>戦略を描くだけでなく、現場に入り込み、泥臭く実行すること。それが私たちの強みであり、これからも変わらない姿勢です。</p>
      <p>医療・ヘルスケア領域のさらなる発展のため、これからも全力で取り組んでまいります。</p>
      <p class="message-author-large">代表取締役<br><strong>山田 太郎</strong></p>
    </div>
  </div>
</section>`
}

function philosophyContent() {
  return `
<section class="section">
  <div class="container narrow">
    <div class="philosophy-section">
      <div class="phil-item">
        <h3 class="phil-label">Mission</h3>
        <p class="phil-text">医療・ヘルスケア領域の法人が抱える課題を、実務力で解決する。</p>
      </div>
      <div class="phil-item">
        <h3 class="phil-label">Vision</h3>
        <p class="phil-text">医療と経営をつなぐ、最も信頼されるパートナーになる。</p>
      </div>
      <div class="phil-item">
        <h3 class="phil-label">Value</h3>
        <ul class="phil-values">
          <li>実行にこだわる — 提案だけで終わらせない</li>
          <li>現場に入る — 机上の空論を排除する</li>
          <li>誠実であり続ける — 信頼は最大の資産</li>
          <li>横断的に考える — 縦割りを超えた解決策</li>
          <li>長期的な視点 — 一過性でない価値を提供する</li>
        </ul>
      </div>
    </div>
  </div>
</section>`
}

function historyContent() {
  return `
<section class="section">
  <div class="container narrow">
    <div class="history-timeline">
      <div class="history-item"><div class="history-year">2010</div><div class="history-text">東京都千代田区にて創業。医療機関向けコンサルティング事業を開始。</div></div>
      <div class="history-item"><div class="history-year">2012</div><div class="history-text">医療機器代理店事業を開始。</div></div>
      <div class="history-item"><div class="history-year">2014</div><div class="history-text">広告・マーケティング支援事業を開始。医療機関の集患支援を本格化。</div></div>
      <div class="history-item"><div class="history-year">2016</div><div class="history-text">M&A仲介事業を開始。医療法人の事業承継支援に注力。</div></div>
      <div class="history-item"><div class="history-year">2018</div><div class="history-text">支援実績100件突破。上場企業向け買収候補先開拓支援を開始。</div></div>
      <div class="history-item"><div class="history-year">2020</div><div class="history-text">医療機関経営支援事業を本格展開。事務長代行サービスを開始。</div></div>
      <div class="history-item"><div class="history-year">2022</div><div class="history-text">病児保育事業支援を開始。支援実績300件突破。</div></div>
      <div class="history-item"><div class="history-year">2024</div><div class="history-text">支援実績500件突破。さらなる事業拡大に向けた体制強化を推進中。</div></div>
    </div>
  </div>
</section>`
}
