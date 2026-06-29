import type { Context } from 'hono'
import { layout, breadcrumb } from '../components/layout'

export const contactPage = (c: Context) => {
  const sub = c.req.param('sub')

  // 送信完了ページ
  if (sub === 'thanks') {
    return c.html(layout('送信完了', `
${breadcrumb([{ label: 'お問い合わせ', href: '/contact' }, { label: '送信完了' }])}

<section class="page-hero" style="background:linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.85)),url('/static/images/contract-signing.jpg') center/cover no-repeat;">
  <div class="container">
    <h1 class="page-hero-title">送信完了</h1>
    <p class="page-hero-desc">Thank You</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="contact-form-wrap" style="text-align:center;">
      <div style="font-size:48px;margin-bottom:24px;">✅</div>
      <h2>お問い合わせありがとうございます</h2>
      <p class="contact-note" style="margin-top:16px;">
        お問い合わせ内容を受け付けました。<br>
        担当者より2営業日以内にご連絡いたします。
      </p>
      <div style="margin-top:40px;">
        <a href="/" class="btn btn-primary">トップに戻る</a>
      </div>
    </div>
  </div>
</section>
`, { description: 'お問い合わせ送信完了 - 株式会社イズムズ' }))
  }

  // お問い合わせフォーム
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
      <form class="contact-form" action="/api/contact" method="POST">
        <div class="form-group">
          <label>お問い合わせ種別 <span class="required">必須</span></label>
          <select name="category" required style="width:100%;padding:14px 16px;background:var(--bg-gray);border:1px solid rgba(255,255,255,.1);border-radius:8px;color:var(--color-text);font-size:14px;font-family:var(--font);">
            <option value="">選択してください</option>
            <option value="医療機関プロデュース（IHG™）">医療機関プロデュース（IHG™）について</option>
            <option value="医療系人材マッチング（DR-LINK™）">医療系人材マッチング（DR-LINK™）について</option>
            <option value="ヘルスケアM&A（つむぎパートナーズ）">ヘルスケアM&A（つむぎパートナーズ）について</option>
            <option value="医療DX（カルテ電子化）">医療DX（カルテ電子化）について</option>
            <option value="補助金・融資支援">補助金・融資支援について</option>
            <option value="採用">採用について</option>
            <option value="その他">その他</option>
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
        <p>＊担当者より2営業日以内にご連絡いたします。</p>
        <p>＊いただいた情報は<a href="/legal" style="color:var(--accent-light);">プライバシーポリシー</a>に従い適切に管理します。</p>
        <p>＊秘密厳守でご対応いたします。</p>
      </div>
    </div>
  </div>
</section>
`, { description: '株式会社イズムズへのお問い合わせはこちら。秘密厳守・2営業日以内にご返答します。' }))
}
