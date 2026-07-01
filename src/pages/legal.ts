import type { Context } from 'hono'
import { layout, breadcrumb } from '../components/layout'

export const legalPage = (c: Context) => {
  const sub = c.req.param('sub')

  if (sub === 'terms') return termsPage(c)
  if (sub === 'tokutei') return tokuteiPage(c)

  return c.html(layout('プライバシーポリシー', `
${breadcrumb([{ label: 'プライバシーポリシー' }])}

<section class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">プライバシーポリシー</h1>
    <p class="page-hero-desc">Privacy Policy</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="legal-content">
      <p class="legal-date">制定日：2025年1月1日<br>最終改訂：2025年6月<br>株式会社イズムズ</p>

      <h3>第1条（個人情報の収集）</h3>
      <p>当社は、お問い合わせやサービスのご利用に際して必要な範囲で、適法かつ公正な手段により個人情報を収集いたします。</p>

      <h3>第2条（利用目的）</h3>
      <p>取得した個人情報は以下の目的に利用します。</p>
      <ul style="margin:8px 0 16px 20px;color:var(--color-text-sub);font-size:14px;line-height:2;">
        <li>サービスの提供および契約の履行</li>
        <li>お問い合わせへの対応</li>
        <li>採用選考への対応</li>
        <li>マーケティング分析（統計処理・個人を特定しない形式）</li>
        <li>法令上の義務の履行</li>
      </ul>

      <h3>第3条（第三者提供の禁止）</h3>
      <p>法令に基づく場合を除き、ご本人の同意なく第三者に個人情報を提供することはありません。</p>

      <h3>第4条（業務委託先への提供）</h3>
      <p>業務遂行のため外部委託先に個人情報を提供する場合があります。この場合、委託先に対して適切な監督を行います。</p>

      <h3>第5条（安全管理措置）</h3>
      <p>不正アクセス・情報漏洩・滅失・毀損の防止のため、合理的な安全管理措置を講じます。</p>

      <h3>第6条（保有個人データの開示・訂正・削除）</h3>
      <p>ご本人から個人情報の開示・訂正・削除の請求があった場合、法令に従い合理的な期間内に対応いたします。お問い合わせ窓口（info@i2m2.com）までご連絡ください。</p>

      <h3>第7条（Cookieの使用）</h3>
      <p>当サイトはGoogle Analyticsを使用しています。取得されるデータは匿名で統計処理され、個人を特定しません。ブラウザの設定によりCookieを無効にすることができます。</p>

      <h3>第8条（プライバシーポリシーの改定）</h3>
      <p>本ポリシーは必要に応じて改定します。改定後は当サイトに掲載した時点で効力が生じます。</p>
    </div>
  </div>
</section>
`))
}

function termsPage(c: Context) {
  return c.html(layout('サービス利用規約', `
${breadcrumb([{ label: 'サービス利用規約' }])}

<section class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">サービス利用規約</h1>
    <p class="page-hero-desc">Terms of Service</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="legal-content">
      <p class="legal-date">制定日：2025年1月1日<br>最終改訂：2025年6月<br>株式会社イズムズ</p>

      <h3>第1条（適用範囲）</h3>
      <p>本規約は、株式会社イズムズ（以下「当社」）が提供するすべてのサービスの利用に関わる一切の関係に適用されます。</p>

      <h3>第2条（定義）</h3>
      <p>「サービス」とは、当社が提供する医療機関プロデュース・医療系人材マッチング・M&A仲介・医療DX支援およびこれらに附帯する業務を指します。</p>

      <h3>第3条（料金・費用）</h3>
      <p>各サービスの料金は、別途お見積もりまたは個別契約書にて定めます。お問い合わせの時点では費用は発生しません。</p>

      <h3>第4条（秘密保持）</h3>
      <p>当社は、M&A仲介をはじめとする業務において知り得た情報について、秘密保持義務を遵守いたします。この義務は契約終了後も継続します。</p>

      <h3>第5条（禁止事項）</h3>
      <p>利用者は以下の行為を行ってはなりません。</p>
      <ul style="margin:8px 0 16px 20px;color:var(--color-text-sub);font-size:14px;line-height:2;">
        <li>虚偽の情報を提供すること</li>
        <li>当社サービスを通じた不正行為</li>
        <li>第三者への情報の無断開示・漏洩</li>
        <li>当社の知的財産権を侵害する行為</li>
        <li>その他法令または公序良俗に反する行為</li>
      </ul>

      <h3>第6条（知的財産権）</h3>
      <p>当サイト上のすべてのコンテンツ（文章・画像・ロゴ等）の著作権は当社に帰属します。無断転載・複製・二次利用を禁止します。</p>

      <h3>第7条（免責事項）</h3>
      <p>当社の責めに帰すことのできない事由により損害が発生した場合は、責任を負いかねます。</p>

      <h3>第8条（損害賠償の制限）</h3>
      <p>当社に帰責事由がある場合でも、損害賠償の範囲は直接かつ通常の損害に限り、当該サービスの受領済み報酬額を上限とします。</p>

      <h3>第9条（準拠法・管轄裁判所）</h3>
      <p>本規約は日本法に準拠します。本規約に関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</p>

      <h3>第10条（改定）</h3>
      <p>当社は本規約を必要に応じて改定できるものとします。改定後は当サイトに掲載した時点で効力が生じます。</p>
    </div>
  </div>
</section>
`))
}

function tokuteiPage(c: Context) {
  return c.html(layout('特定商取引法に基づく表記', `
${breadcrumb([{ label: '特定商取引法に基づく表記' }])}

<section class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">特定商取引法に基づく表記</h1>
    <p class="page-hero-desc">Specified Commercial Transactions Act</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="company-table-wrap">
      <table class="company-table">
        <tbody>
          <tr><th>販売業者</th><td>株式会社イズムズ</td></tr>
          <tr><th>代表責任者</th><td>代表取締役（非公開）</td></tr>
          <tr><th>所在地</th><td>〒271-0068 千葉県松戸市大橋149-1<br><small>（所在地は請求があり次第、遅滞なく開示します）</small></td></tr>
          <tr><th>電話番号</th><td>お問い合わせフォームよりご連絡ください。<br><small>ご請求があった場合は遅滞なく開示いたします。</small></td></tr>
          <tr><th>メールアドレス</th><td>info@i2m2.com</td></tr>
          <tr><th>サービス内容</th><td>医療機関プロデュース、医療系人材マッチング、M&A仲介・事業承継支援、医療DX支援、および付帯するコンサルティング業務</td></tr>
          <tr><th>料金</th><td>サービスの内容・規模により異なります。詳細は担当者より個別にご案内いたします。</td></tr>
          <tr><th>支払い方法</th><td>銀行振込（詳細は個別契約書にて案内）</td></tr>
          <tr><th>支払い時期</th><td>契約締結後、個別契約書に定める期日まで</td></tr>
          <tr><th>サービス提供</th><td>契約締結後、別途ご案内いたします。</td></tr>
          <tr><th>キャンセル</th><td>個別契約の定めによります。契約締結前のお問い合わせはキャンセル料不要です。</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
`))
}
