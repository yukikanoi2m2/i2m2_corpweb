import type { Context } from 'hono'
import { layout, breadcrumb, esc } from '../components/layout'

export const contactPage = (c: Context) => {
  const sub = c.req.param('sub') || ''
  
  let title = 'お問い合わせ'
  let formTitle = '総合お問い合わせ'
  let inquiryTypes = ['M&Aに関するご相談', '広告・マーケティングに関するご相談', '医療機器に関するご相談', '医療経営に関するご相談', '採用に関するお問い合わせ', 'その他']
  
  if (sub === 'ma') {
    title = 'M&A無料相談'
    formTitle = 'M&A無料相談'
    inquiryTypes = ['売却相談', '買収相談', '事業承継相談', '医療法人・クリニック承継相談', '企業価値評価の相談', '買収ニーズ登録', 'その他']
  } else if (sub === 'marketing') {
    title = '広告相談'
    formTitle = '広告・マーケティング相談'
    inquiryTypes = ['集患相談', '採用広告相談', 'Web広告運用相談', 'LP・ホームページ制作相談', 'SEO/MEO相談', 'その他']
  } else if (sub === 'medical') {
    title = '医療機器相談'
    formTitle = '医療機器相談'
    inquiryTypes = ['製品導入相談', '見積もり依頼', '開業準備相談', 'メーカー連携相談', '保守・サポート相談', 'その他']
  }

  return c.html(layout(title, `
${breadcrumb([{ label: title }])}
<section class="page-hero"><div class="container"><h1 class="page-title">${esc(title)}</h1><p class="page-lead">下記フォームよりお気軽にお問い合わせください。通常1営業日以内にご返信いたします。</p></div></section>

<section class="section">
  <div class="container narrow">
    <div class="contact-tabs">
      <a href="/contact" class="contact-tab ${!sub ? 'active' : ''}">総合</a>
      <a href="/contact/ma" class="contact-tab ${sub === 'ma' ? 'active' : ''}">M&A相談</a>
      <a href="/contact/marketing" class="contact-tab ${sub === 'marketing' ? 'active' : ''}">広告相談</a>
      <a href="/contact/medical" class="contact-tab ${sub === 'medical' ? 'active' : ''}">医療機器</a>
    </div>
    <form class="contact-form" action="#" method="POST">
      <h2 class="form-title">${esc(formTitle)}</h2>
      <div class="form-group">
        <label>会社名・医療機関名 <span class="required">必須</span></label>
        <input type="text" name="company" required placeholder="株式会社○○ / ○○クリニック">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>お名前 <span class="required">必須</span></label>
          <input type="text" name="name" required placeholder="山田 太郎">
        </div>
        <div class="form-group">
          <label>役職</label>
          <input type="text" name="position" placeholder="代表取締役">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>メールアドレス <span class="required">必須</span></label>
          <input type="email" name="email" required placeholder="example@company.co.jp">
        </div>
        <div class="form-group">
          <label>電話番号</label>
          <input type="tel" name="phone" placeholder="03-0000-0000">
        </div>
      </div>
      <div class="form-group">
        <label>お問い合わせ種別 <span class="required">必須</span></label>
        <select name="type" required>
          <option value="">選択してください</option>
          ${inquiryTypes.map(t => `<option value="${esc(t)}">${esc(t)}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>お問い合わせ内容 <span class="required">必須</span></label>
        <textarea name="message" rows="6" required placeholder="ご相談内容をご記入ください"></textarea>
      </div>
      <div class="form-group form-check">
        <label><input type="checkbox" required> <a href="/legal">プライバシーポリシー</a>に同意する</label>
      </div>
      <div class="form-submit">
        <button type="submit" class="btn btn-primary btn-lg">送信する</button>
      </div>
    </form>
  </div>
</section>
`))
}
