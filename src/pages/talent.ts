import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const talentPage = (c: Context) => {
  return c.html(layout('医療系人材マッチング | DR-LINK™', `
${breadcrumb([{ label: '事業内容', href: '/services' }, { label: '医療系人材マッチング' }])}

<section class="lp-hero lp-hero-talent">
  <div class="container">
    <div class="lp-hero-content">
      <span class="lp-hero-brand">DR-LINK™ — Healthcare Talent</span>
      <h1 class="lp-hero-title">医療系人材マッチング</h1>
      <p class="lp-hero-desc">医師・看護師・薬剤師・介護職など医療系専門職の人材紹介。<br>適材適所のマッチングで、医療機関の人材課題を解決します。</p>
      <a href="/contact" class="btn btn-primary btn-lg">人材についてご相談</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionTitle('MATCHING', '対応職種')}
    <div class="lp-features">
      <div class="lp-feature">
        <div class="lp-feature-icon"><i class="fas fa-user-doctor"></i></div>
        <h3>医師</h3>
        <p>各診療科の医師紹介。常勤・非常勤・スポット勤務など多様な勤務形態に対応します。</p>
      </div>
      <div class="lp-feature">
        <div class="lp-feature-icon"><i class="fas fa-user-nurse"></i></div>
        <h3>看護師・准看護師</h3>
        <p>病院、クリニック、介護施設、訪問看護ステーションなどへの紹介。夜勤対応・日勤のみなど条件調整も。</p>
      </div>
      <div class="lp-feature">
        <div class="lp-feature-icon"><i class="fas fa-pills"></i></div>
        <h3>薬剤師</h3>
        <p>調剤薬局、病院薬剤部、ドラッグストアへの紹介。管理薬剤師ポジションにも対応。</p>
      </div>
      <div class="lp-feature">
        <div class="lp-feature-icon"><i class="fas fa-hand-holding-heart"></i></div>
        <h3>介護・福祉職</h3>
        <p>介護福祉士、ケアマネジャー、理学療法士、作業療法士など介護・福祉分野の専門職。</p>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionTitle('STRENGTH', '当社の強み')}
    <div class="why-grid">
      <div class="why-card">
        <div class="why-icon"><i class="fas fa-hospital"></i></div>
        <h3>医療業界専門</h3>
        <p>医療・介護業界に特化した専門コンサルタントが、業界特有の事情を理解した上でマッチングします。</p>
      </div>
      <div class="why-card">
        <div class="why-icon"><i class="fas fa-handshake"></i></div>
        <h3>ミスマッチ防止</h3>
        <p>詳細なヒアリングと施設見学で双方の期待を擦り合わせ。入職後のフォローも充実しています。</p>
      </div>
      <div class="why-card">
        <div class="why-icon"><i class="fas fa-clock"></i></div>
        <h3>スピード対応</h3>
        <p>急募案件にも迅速に対応。登録人材ネットワークを活用し、最短での紹介を実現します。</p>
      </div>
    </div>
  </div>
</section>

${ctaSection({ title: '医療人材のお悩み、お気軽にご相談ください', buttons: [{ label: '人材相談する', href: '/contact', primary: true }, { label: '事業一覧に戻る', href: '/services' }] })}
`))
}
