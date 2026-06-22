import type { Context } from 'hono'
import { layout, sectionTitle, breadcrumb } from '../components/layout'

export const contactPage = (c: Context) => {
  const sub = c.req.param('sub')
  const formType = sub || 'general'
  const titles: Record<string, string> = {
    general: '総合お問い合わせ',
    ma: 'M&A・事業承継のご相談',
    healthcare: '医療機関プロデュースのご相談',
    talent: '人材紹介のご相談',
  }
  const title = titles[formType] || titles.general

  return c.html(layout(title, `
${breadcrumb([{ label: 'お問い合わせ' }])}

<section class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">お問い合わせ</h1>
    <p class="page-hero-desc">Contact</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="contact-tabs">
      <a href="/contact" class="contact-tab ${formType === 'general' ? 'active' : ''}">総合</a>
      <a href="/contact/ma" class="contact-tab ${formType === 'ma' ? 'active' : ''}">M&A・事業承継</a>
      <a href="/contact/healthcare" class="contact-tab ${formType === 'healthcare' ? 'active' : ''}">医療機関</a>
      <a href="/contact/talent" class="contact-tab ${formType === 'talent' ? 'active' : ''}">人材紹介</a>
    </div>
    <div class="contact-form-wrap">
      <h2>${title}</h2>
      <p class="contact-note">以下のフォームにご記入の上、送信してください。担当者より2営業日以内にご連絡いたします。<br>秘密厳守で対応いたします。</p>
      <form class="contact-form" action="https://formsubmit.co/info@i2m2.com" method="POST">
        <div class="form-row">
          <div class="form-group">
            <label>会社名 / 法人名 <span class="required">必須</span></label>
            <input type="text" placeholder="例：○○株式会社" required>
          </div>
          <div class="form-group">
            <label>ご担当者名 <span class="required">必須</span></label>
            <input type="text" placeholder="例：山田 太郎" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>メールアドレス <span class="required">必須</span></label>
            <input type="email" placeholder="example@company.co.jp" required>
          </div>
          <div class="form-group">
            <label>電話番号</label>
            <input type="tel" placeholder="03-xxxx-xxxx">
          </div>
        </div>
        <div class="form-group">
          <label>ご相談内容 <span class="required">必須</span></label>
          <textarea rows="6" placeholder="ご相談内容をご記入ください" required></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary btn-lg">送信する</button>
        </div>
      </form>
    </div>
  </div>
</section>
`))
}
