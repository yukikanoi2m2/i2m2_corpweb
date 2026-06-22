import type { Context } from 'hono'
import { layout, breadcrumb, ctaSection } from '../components/layout'

export const seminarPage = (c: Context) => {
  return c.html(layout('セミナー情報', `
${breadcrumb([{ label: 'セミナー情報' }])}
<section class="page-hero"><div class="container"><h1 class="page-title">セミナー情報</h1></div></section>
<section class="section"><div class="container"><p>現在準備中です。</p></div></section>
`))
}
