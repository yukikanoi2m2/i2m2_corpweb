import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const beautyPage = (c: Context) => {
  return c.html(layout('美容サロンプロデュース | BEAUTY', `
${breadcrumb([{ label: '事業内容', href: '/services' }, { label: '美容サロンプロデュース' }])}

<section class="lp-hero lp-hero-beauty">
  <div class="container">
    <div class="lp-hero-content">
      <span class="lp-hero-brand">BEAUTY — Salon Operations</span>
      <h1 class="lp-hero-title">美容サロンプロデュース</h1>
      <p class="lp-hero-desc">メディカルサロンの企画・立ち上げ・運営支援。<br>韓国クリニックの日本進出プロデュース（4everclinic）も手掛けています。</p>
      <a href="/contact" class="btn btn-primary btn-lg">サロン事業のご相談</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionTitle('SERVICE', 'サービス内容')}
    <div class="lp-features">
      <div class="lp-feature">
        <div class="lp-feature-icon"><i class="fas fa-spa"></i></div>
        <h3>メディカルサロン企画・運営</h3>
        <p>医療とビューティの融合。医師監修のもとエビデンスベースの美容施術を提供するサロンの企画から運営までをサポートします。</p>
      </div>
      <div class="lp-feature">
        <div class="lp-feature-icon"><i class="fas fa-globe-asia"></i></div>
        <h3>海外クリニック日本進出支援</h3>
        <p>4everclinic日本進出事業のプロデュース・運営支援。韓国の最先端美容医療技術を日本市場へ展開します。</p>
      </div>
      <div class="lp-feature">
        <div class="lp-feature-icon"><i class="fas fa-store"></i></div>
        <h3>店舗開発・立地選定</h3>
        <p>ターゲット層・商圏分析に基づく最適な立地選定。内装デザイン・設備導入までワンストップで対応。</p>
      </div>
      <div class="lp-feature">
        <div class="lp-feature-icon"><i class="fas fa-bullhorn"></i></div>
        <h3>マーケティング・集客支援</h3>
        <p>SNS運用、Web広告、インフルエンサー施策など美容業界に特化した集客施策を展開します。</p>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionTitle('CONCEPT', 'メディカルビューティ')}
    <div class="concept-block">
      <p class="section-lead">医療の知見とビューティの感性を融合し、安全性と効果を両立した新しい美容サービスを創造します。i2m2グループのヘルスケア事業との連携により、医療法人運営のノウハウを美容事業にも活かしています。</p>
    </div>
  </div>
</section>

${ctaSection({ title: '美容サロン事業について、お気軽にご相談ください', buttons: [{ label: '無料相談する', href: '/contact', primary: true }, { label: '事業一覧に戻る', href: '/services' }] })}
`))
}
