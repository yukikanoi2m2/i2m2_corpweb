import type { Context } from 'hono'
import { layout, breadcrumb } from '../components/layout'

export const legalPage = (c: Context) => {
  const sub = c.req.param('sub') || ''
  let title = 'プライバシーポリシー'
  let content = privacyPolicy()

  if (sub === 'antisocial') {
    title = '反社会的勢力排除方針'
    content = antisocial()
  } else if (sub === 'security') {
    title = '情報セキュリティ方針'
    content = security()
  }

  return c.html(layout(title, `
${breadcrumb([{ label: title }])}
<section class="page-hero"><div class="container"><h1 class="page-title">${title}</h1></div></section>
<section class="section">
  <div class="container narrow">
    <div class="legal-content">
      ${content}
    </div>
  </div>
</section>
`))
}

function privacyPolicy() {
  return `
<h2>個人情報の取扱いについて</h2>
<p>株式会社サンプル（以下「当社」）は、個人情報の重要性を認識し、以下の方針に基づき個人情報の保護に努めます。</p>
<h3>1. 個人情報の収集</h3>
<p>当社は、サービスの提供に必要な範囲で、適法かつ公正な手段により個人情報を収集します。</p>
<h3>2. 個人情報の利用目的</h3>
<ul>
<li>お問い合わせへの対応</li>
<li>サービスの提供・改善</li>
<li>セミナー・イベントのご案内</li>
<li>資料の送付</li>
</ul>
<h3>3. 第三者への提供</h3>
<p>当社は、法令に基づく場合を除き、ご本人の同意なく第三者に個人情報を提供しません。</p>
<h3>4. 安全管理措置</h3>
<p>当社は、個人情報の漏洩・滅失・き損を防止するため、適切な安全管理措置を講じます。</p>
<h3>5. お問い合わせ</h3>
<p>個人情報に関するお問い合わせは、当社お問い合わせ窓口までご連絡ください。</p>
<p class="legal-date">制定日：2024年4月1日</p>`
}

function antisocial() {
  return `
<h2>反社会的勢力排除方針</h2>
<p>当社は、反社会的勢力との一切の関係を遮断することを宣言し、以下の基本方針を定めます。</p>
<h3>基本方針</h3>
<ul>
<li>反社会的勢力との取引を一切行いません。</li>
<li>反社会的勢力からの不当要求に応じません。</li>
<li>反社会的勢力との関係を発見した場合、速やかに関係を解消します。</li>
<li>反社会的勢力への資金提供を行いません。</li>
<li>必要に応じて外部専門機関と連携し、毅然とした態度で対応します。</li>
</ul>
<p class="legal-date">制定日：2024年4月1日</p>`
}

function security() {
  return `
<h2>情報セキュリティ方針</h2>
<p>当社は、業務上取り扱う情報資産を適切に保護するため、以下の情報セキュリティ方針を定めます。</p>
<h3>基本方針</h3>
<ul>
<li>情報資産の機密性・完全性・可用性を確保します。</li>
<li>法令・規制・契約上のセキュリティ要件を遵守します。</li>
<li>情報セキュリティに関する教育・訓練を全従業員に実施します。</li>
<li>情報セキュリティインシデントに対して迅速に対応します。</li>
<li>情報セキュリティマネジメントシステムの継続的な改善を図ります。</li>
</ul>
<p class="legal-date">制定日：2024年4月1日</p>`
}
