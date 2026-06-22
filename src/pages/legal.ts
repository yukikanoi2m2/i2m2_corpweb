import type { Context } from 'hono'
import { layout, breadcrumb } from '../components/layout'

export const legalPage = (c: Context) => {
  const sub = c.req.param('sub')

  if (sub === 'terms') return termsPage(c)

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
      <p>i2m2株式会社（以下「当社」）は、個人情報の保護に関する法律その他の関連法令を遵守し、以下のとおり個人情報保護方針を定め、これを実行してまいります。</p>
      <h3>1. 個人情報の収集</h3>
      <p>当社は、お問い合わせやサービスのご利用に際して必要な範囲で、適法かつ公正な手段により個人情報を収集いたします。</p>
      <h3>2. 個人情報の利用目的</h3>
      <p>お問い合わせへの対応、サービスの提供、契約の履行、改善のための分析に利用いたします。</p>
      <h3>3. 個人情報の第三者提供</h3>
      <p>法令に基づく場合を除き、ご本人の同意なく第三者に提供することはありません。</p>
      <h3>4. お問い合わせ</h3>
      <p>個人情報に関するお問い合わせは、当社お問い合わせ窓口までご連絡ください。</p>
      <p class="legal-date">制定日：2025年1月1日<br>i2m2株式会社</p>
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
      <p>この利用規約は、i2m2株式会社が提供する各種サービスの利用条件を定めるものです。</p>
      <h3>第1条（適用）</h3>
      <p>本規約は、当社が提供するすべてのサービスの利用に関わる一切の関係に適用されるものとします。</p>
      <h3>第2条（秘密保持）</h3>
      <p>当社は、M&A仲介をはじめとする業務において知り得た情報について、秘密保持義務を遵守いたします。</p>
      <h3>第3条（免責事項）</h3>
      <p>当社の責めに帰すことのできない事由により損害が発生した場合は、責任を負いかねます。</p>
      <p class="legal-date">制定日：2025年1月1日<br>i2m2株式会社</p>
    </div>
  </div>
</section>
`))
}
