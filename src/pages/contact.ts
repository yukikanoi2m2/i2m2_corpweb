import type { Context } from 'hono'
import { layout, breadcrumb } from '../components/layout'

export const contactPage = (c: Context) => {
  return c.html(layout('お問い合わせ', `
${breadcrumb([{ label: 'お問い合わせ' }])}

<section class="page-hero" style="background:linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.85)),url('/static/images/contract-signing.jpg') center/cover no-repeat;">
  <div class="container">
    <h1 class="page-hero-title">お問い合わせ</h1>
    <p class="page-hero-desc">Contact</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="contact-form-wrap">
      <h2>お問い合わせ</h2>
      <p class="contact-note">以下のフォームにご記入の上、送信してください。</p>
      <form class="contact-form" action="https://formsubmit.co/info@i2m2.com" method="POST">
        <input type="hidden" name="_subject" value="【i2m2】お問い合わせ">
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_autoresponse" value="お問い合わせいただきありがとうございます。2営業日以内に担当者よりご連絡いたします。- 株式会社イズムズ">
        <div class="form-group">
          <label>お問い合わせ種別 <span class="required">必須</span></label>
          <select name="category" required style="width:100%;padding:14px 16px;background:var(--bg-gray);border:1px solid rgba(255,255,255,.1);border-radius:8px;color:var(--color-text);font-size:14px;font-family:var(--font);">
            <option value="">選択してください</option>
            <option value="healthcare">医療機関プロデュース（IHG™）について</option>
            <option value="talent">医療系人材マッチング（DR-LINK™）について</option>
            <option value="ma">M&A・事業承継（RVC）について</option>
            <option value="dx">医療DX（カルテ電子化）について</option>
            <option value="recruit">採用について</option>
            <option value="other">その他</option>
          </select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>会社名 / 法人名 <span class="required">必須</span></label>
            <input type="text" name="company" placeholder="例：○○株式会社" required>
          </div>
          <div class="form-group">
            <label>ご担当者名 <span class="required">必須</span></label>
            <input type="text" name="name" placeholder="例：山田 太郎" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>役職</label>
            <input type="text" name="position" placeholder="例：代表取締役、事務長">
          </div>
          <div class="form-group">
            <label>メールアドレス <span class="required">必須</span></label>
            <input type="email" name="email" placeholder="example@company.co.jp" required>
          </div>
        </div>
        <div class="form-group">
          <label>電話番号</label>
          <input type="tel" name="phone" placeholder="03-xxxx-xxxx">
        </div>
        <div class="form-group">
          <label>ご相談内容 <span class="required">必須</span></label>
          <textarea rows="6" name="message" placeholder="ご相談内容をご記入ください" required></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary btn-lg">送信する</button>
        </div>
      </form>
      <div style="margin-top:24px;font-size:12px;color:var(--color-text-dim);line-height:2;">
        <p>＊送信後、自動返信メールをお送りします。</p>
        <p>＊担当者より2営業日以内にご連絡いたします。</p>
        <p>＊いただいた情報は<a href="/legal" style="color:var(--accent-light);">プライバシーポリシー</a>に従い適切に管理します。</p>
        <p>＊秘密厳守でご対応いたします。</p>
      </div>
    </div>
  </div>
</section>
`, { description: '株式会社イズムズへのお問い合わせはこちら。秘密厳守・2営業日以内にご返答します。' }))
}
