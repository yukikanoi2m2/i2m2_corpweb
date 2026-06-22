import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const servicesPage = (c: Context) => {
  return c.html(layout('事業内容', `
${breadcrumb([{ label: '事業内容' }])}

<section class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">事業内容</h1>
    <p class="page-hero-desc">地域価値創造事業（RVC）として、ヘルスケア・医療を起点に4つの事業を展開しています。</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="services-detail-grid">
      <a href="/healthcare" class="service-detail-card">
        <div class="service-detail-num">01</div>
        <div class="service-detail-brand">IHG™</div>
        <h3>Healthcare Services<br><span>医療機関プロデュース</span></h3>
        <p>医療クリニックの広告運用、経営コンサルティング、財務管理、カルテ電子化（医療DX）、融資・補助金コンサルティング。</p>
        <ul class="service-card-tags"><li>広告運用</li><li>経営コンサル</li><li>医療DX</li><li>補助金</li></ul>
        <span class="service-card-link">詳しく見る <i class="fas fa-arrow-right"></i></span>
      </a>
      <a href="/talent" class="service-detail-card">
        <div class="service-detail-num">02</div>
        <div class="service-detail-brand">DR-LINK™</div>
        <h3>Healthcare Talent<br><span>医療系人材マッチング</span></h3>
        <p>医師、看護師、薬剤師、介護職など医療系専門職の人材紹介・マッチング。採用支援から定着サポートまで。</p>
        <ul class="service-card-tags"><li>医師紹介</li><li>看護師</li><li>介護職</li><li>マッチング</li></ul>
        <span class="service-card-link">詳しく見る <i class="fas fa-arrow-right"></i></span>
      </a>
      <a href="/ma" class="service-detail-card">
        <div class="service-detail-num">03</div>
        <div class="service-detail-brand">RVC</div>
        <h3>Community Value<br><span>地域価値創造事業</span></h3>
        <p>M&A仲介、事業承継、事業再生・再建、事業ファンド運営。医療・介護・福祉はもちろん、美容・IT・飲食など全業種対応。</p>
        <ul class="service-card-tags"><li>M&A</li><li>事業承継</li><li>事業再生</li><li>全業種</li></ul>
        <span class="service-card-link">詳しく見る <i class="fas fa-arrow-right"></i></span>
      </a>
      <a href="/beauty" class="service-detail-card">
        <div class="service-detail-num">04</div>
        <div class="service-detail-brand">BEAUTY</div>
        <h3>Salon Operations<br><span>美容サロンプロデュース</span></h3>
        <p>メディカルサロンの企画・運営支援。韓国クリニック（4everclinic）の日本進出プロデュースも手掛けています。</p>
        <ul class="service-card-tags"><li>メディカルサロン</li><li>海外展開</li><li>運営支援</li></ul>
        <span class="service-card-link">詳しく見る <i class="fas fa-arrow-right"></i></span>
      </a>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionTitle('ADDITIONAL', 'その他のサービス')}
    <div class="additional-grid">
      <div class="additional-item">
        <div class="additional-icon"><i class="fas fa-file-invoice-dollar"></i></div>
        <h4>融資・補助金コンサルティング</h4>
        <p>事業承継部門専門の融資相談、各種補助金の申請支援。採択率を高める事業計画策定を支援します。</p>
      </div>
      <div class="additional-item">
        <div class="additional-icon"><i class="fas fa-laptop-medical"></i></div>
        <h4>カルテ電子化（医療DX）</h4>
        <p>紙カルテから電子カルテへの完全移行。システム選定・データ移行・スタッフ研修までワンストップ。</p>
      </div>
      <div class="additional-item">
        <div class="additional-icon"><i class="fas fa-globe-asia"></i></div>
        <h4>海外クリニック日本進出支援</h4>
        <p>4everclinic日本進出事業のプロデュース。法務・マーケティング・運営の全面支援。</p>
      </div>
    </div>
  </div>
</section>

${ctaSection({ title: '事業に関するご相談はこちら' })}
`))
}
