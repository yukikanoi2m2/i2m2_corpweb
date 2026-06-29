import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const recruitPage = (c: Context) => {
  return c.html(layout('採用情報', `
${breadcrumb([{ label: '採用情報' }])}

<section class="page-hero" style="background:linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.85)),url('/static/images/sealed-letter.jpg') center/cover no-repeat;">
  <div class="container">
    <h1 class="page-hero-title">採用情報</h1>
    <p class="page-hero-desc">地域の未来を共につくる仲間を募集。</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="recruit-message">
      <h2>共に地域の未来を創る仲間を募集しています</h2>
      <p>i2m2は『全ての関わる人に幸運と繁栄を』をミッションに掲げ、ヘルスケアを起点とした事業を展開しています。創業2年で累計取扱高20億円を超えた当社で、あなたの経験を活かしてみませんか。</p>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionTitle('POSITIONS', '募集職種')}
    <div class="recruit-positions">
      <div class="recruit-card">
        <h3>M&Aアドバイザー</h3>
        <p>医療法人・中小企業のM&A案件のソーシングからクロージングまでを担当。</p>
        <ul class="service-card-tags"><li>正社員</li><li>東京</li><li>RVC事業部</li></ul>
      </div>
      <div class="recruit-card">
        <h3>医療マーケティングコンサルタント</h3>
        <p>クリニック向けのデジタルマーケティング戦略策定・広告運用を担当。</p>
        <ul class="service-card-tags"><li>正社員</li><li>東京</li><li>IHG事業部</li></ul>
      </div>
      <div class="recruit-card">
        <h3>医療系キャリアアドバイザー</h3>
        <p>医師・看護師等の転職支援。求職者のキャリアカウンセリングから入職後フォローまで。</p>
        <ul class="service-card-tags"><li>正社員</li><li>東京</li><li>DR-LINK事業部</li></ul>
      </div>
    </div>
  </div>
</section>

${ctaSection({ title: 'まずはカジュアルにお話ししましょう。書類選考はございません。', buttons: [{ label: '応募する', href: '/contact', primary: true }] })}
`, { description: '創業2年で累計取扱高20億円超のヘルスケア企業で働きませんか。M&Aアドバイザー・医療マーケ・人材アドバイザー募集中。' }))
}
