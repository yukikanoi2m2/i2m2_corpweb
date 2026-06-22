import type { Context } from 'hono'
import { layout, sectionTitle, ctaSection, breadcrumb } from '../components/layout'

export const irPage = (c: Context) => {
  return c.html(layout('IR情報', `
${breadcrumb([{ label: 'IR情報' }])}

<section class="page-hero">
  <div class="container">
    <h1 class="page-hero-title">IR情報</h1>
    <p class="page-hero-desc">Investor Relations</p>
  </div>
</section>

<!-- 業績ハイライト -->
<section class="section">
  <div class="container">
    ${sectionTitle('HIGHLIGHTS', '業績ハイライト')}
    <div class="results-numbers">
      <div class="result-num-item">
        <strong>20<span>億円</span></strong>
        <span>累計取扱高</span>
      </div>
      <div class="result-num-item">
        <strong>1000<span>件+</span></strong>
        <span>グループ総取引</span>
      </div>
      <div class="result-num-item">
        <strong>100<span>社+</span></strong>
        <span>取引先企業</span>
      </div>
      <div class="result-num-item">
        <strong>5000<span>万円+</span></strong>
        <span>広告運用額</span>
      </div>
    </div>
  </div>
</section>

<!-- 企業情報 -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('CORPORATE', '企業情報')}
    <div class="ir-corporate-grid">
      <div class="ir-card">
        <div class="ir-card-icon"><i class="fas fa-building"></i></div>
        <h3>会社概要</h3>
        <table class="ir-table">
          <tr><th>商号</th><td>株式会社i2m2</td></tr>
          <tr><th>設立</th><td>2020年</td></tr>
          <tr><th>資本金</th><td>非公開</td></tr>
          <tr><th>代表者</th><td>代表取締役</td></tr>
          <tr><th>本社</th><td>千葉県松戸市大橋149-1</td></tr>
          <tr><th>東京オフィス</th><td>東京都港区六本木6-10-1<br>六本木ヒルズ森タワー37F</td></tr>
          <tr><th>事業内容</th><td>医療機関プロデュース、医療系人材マッチング、M&amp;A/事業承継、医療DX</td></tr>
          <tr><th>従業員数</th><td>グループ全体 ※非公開</td></tr>
          <tr><th>主要取引銀行</th><td>※非公開</td></tr>
          <tr><th>決算期</th><td>※非公開</td></tr>
        </table>
      </div>
      <div class="ir-card">
        <div class="ir-card-icon"><i class="fas fa-chart-pie"></i></div>
        <h3>事業ポートフォリオ</h3>
        <ul class="ir-portfolio">
          <li>
            <span class="ir-portfolio-name">IHG™ Healthcare Services</span>
            <span class="ir-portfolio-desc">医療機関マーケティング・コンサル・DX — 売上構成比 約40%</span>
          </li>
          <li>
            <span class="ir-portfolio-name">DR-LINK™ Healthcare Talent</span>
            <span class="ir-portfolio-desc">医療系人材紹介・マッチング — 売上構成比 約25%</span>
          </li>
          <li>
            <span class="ir-portfolio-name">RVC Community Value</span>
            <span class="ir-portfolio-desc">M&amp;A仲介・事業承継・事業再生 — 売上構成比 約35%</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- 経営方針・成長戦略 -->
<section class="section">
  <div class="container">
    ${sectionTitle('STRATEGY', '経営方針・成長戦略')}
    <div class="ir-corporate-grid">
      <div class="ir-card">
        <div class="ir-card-icon"><i class="fas fa-bullseye"></i></div>
        <h3>中期経営計画</h3>
        <table class="ir-table">
          <tr><th>計画期間</th><td>2025年〜2027年（3ヶ年）</td></tr>
          <tr><th>売上目標</th><td>2027年度 50億円（累計取扱高ベース）</td></tr>
          <tr><th>基本方針</th><td>ヘルスケア領域を核とした地域価値創造（RVC）プラットフォームの確立</td></tr>
          <tr><th>重点施策1</th><td>医療DXプラットフォームの全国展開</td></tr>
          <tr><th>重点施策2</th><td>M&amp;A案件の大型化・質的向上</td></tr>
          <tr><th>重点施策3</th><td>地方エリアへの拠点拡大</td></tr>
        </table>
      </div>
      <div class="ir-card">
        <div class="ir-card-icon"><i class="fas fa-rocket"></i></div>
        <h3>成長ドライバー</h3>
        <ul class="ir-portfolio">
          <li>
            <span class="ir-portfolio-name">市場機会</span>
            <span class="ir-portfolio-desc">医療・介護市場は約60兆円。DX化率は未だ30%未満であり巨大な成長余地</span>
          </li>
          <li>
            <span class="ir-portfolio-name">競争優位性</span>
            <span class="ir-portfolio-desc">マーケ×人材×M&Aのワンストップ提供は業界唯一。クロスセル率40%超</span>
          </li>
          <li>
            <span class="ir-portfolio-name">ストック型収益</span>
            <span class="ir-portfolio-desc">DXプロダクト（月額課金）によりARR比率を2027年に30%まで拡大目標</span>
          </li>
          <li>
            <span class="ir-portfolio-name">IPOに向けた取り組み</span>
            <span class="ir-portfolio-desc">監査法人選任済み。内部統制整備を推進中。2027年度の上場を目指す</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- 財務情報 -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('FINANCIAL', '財務情報')}
    <div class="ir-corporate-grid">
      <div class="ir-card">
        <div class="ir-card-icon"><i class="fas fa-chart-line"></i></div>
        <h3>主要財務指標（直近期）</h3>
        <table class="ir-table">
          <tr><th>売上高</th><td>※上場準備中のため非公開</td></tr>
          <tr><th>営業利益</th><td>※上場準備中のため非公開</td></tr>
          <tr><th>経常利益</th><td>※上場準備中のため非公開</td></tr>
          <tr><th>自己資本比率</th><td>※上場準備中のため非公開</td></tr>
          <tr><th>ROE</th><td>※上場準備中のため非公開</td></tr>
        </table>
        <p style="margin-top:16px; font-size:12px; color:var(--color-text-dim);">
          ※ IPO準備中のため、詳細な財務数値は有価証券届出書の提出時に開示予定です。
        </p>
      </div>
      <div class="ir-card">
        <div class="ir-card-icon"><i class="fas fa-coins"></i></div>
        <h3>株主・資本政策</h3>
        <table class="ir-table">
          <tr><th>発行済株式数</th><td>※非公開</td></tr>
          <tr><th>主要株主</th><td>代表取締役（創業者）</td></tr>
          <tr><th>配当方針</th><td>成長投資優先。中長期的に配当実施を検討</td></tr>
          <tr><th>株式上場</th><td>2027年度を目標にIPO準備中</td></tr>
          <tr><th>想定市場</th><td>東京証券取引所グロース市場</td></tr>
          <tr><th>主幹事証券</th><td>選定中</td></tr>
          <tr><th>監査法人</th><td>契約締結済み</td></tr>
        </table>
      </div>
    </div>
  </div>
</section>

<!-- リスク情報 -->
<section class="section">
  <div class="container">
    ${sectionTitle('RISK', 'リスク情報')}
    <div class="additional-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:24px;">
      <div class="additional-item" style="background:var(--bg-gray); border-radius:12px; padding:24px;">
        <div class="additional-icon" style="font-size:24px; color:var(--accent-light); margin-bottom:12px;"><i class="fas fa-exclamation-triangle"></i></div>
        <h4 style="color:var(--color-white); font-size:15px; font-weight:700; margin-bottom:8px;">事業リスク</h4>
        <p style="font-size:13px; color:var(--color-text-sub); line-height:1.8;">医療制度改定、競合参入、人材確保の困難性、M&A案件の変動性等のリスクがあります。</p>
      </div>
      <div class="additional-item" style="background:var(--bg-gray); border-radius:12px; padding:24px;">
        <div class="additional-icon" style="font-size:24px; color:var(--accent-light); margin-bottom:12px;"><i class="fas fa-gavel"></i></div>
        <h4 style="color:var(--color-white); font-size:15px; font-weight:700; margin-bottom:8px;">法規制リスク</h4>
        <p style="font-size:13px; color:var(--color-text-sub); line-height:1.8;">医療広告ガイドライン、職業安定法、金融商品取引法等の法規制の変更リスクがあります。</p>
      </div>
      <div class="additional-item" style="background:var(--bg-gray); border-radius:12px; padding:24px;">
        <div class="additional-icon" style="font-size:24px; color:var(--accent-light); margin-bottom:12px;"><i class="fas fa-shield-halved"></i></div>
        <h4 style="color:var(--color-white); font-size:15px; font-weight:700; margin-bottom:8px;">情報セキュリティ</h4>
        <p style="font-size:13px; color:var(--color-text-sub); line-height:1.8;">医療情報等の個人情報を取扱うため、情報漏洩リスクに対しISMS準拠の管理体制を構築しています。</p>
      </div>
    </div>
  </div>
</section>

<!-- ガバナンス -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('GOVERNANCE', 'コーポレート・ガバナンス')}
    <div class="ir-corporate-grid">
      <div class="ir-card">
        <div class="ir-card-icon"><i class="fas fa-users"></i></div>
        <h3>経営体制</h3>
        <table class="ir-table">
          <tr><th>取締役会</th><td>取締役3名（うち社外取締役1名）</td></tr>
          <tr><th>監査役会</th><td>監査役2名（うち社外監査役1名）</td></tr>
          <tr><th>コンプライアンス委員会</th><td>設置済み（2024年10月〜）</td></tr>
          <tr><th>リスク管理委員会</th><td>設置済み</td></tr>
          <tr><th>報酬委員会</th><td>設置予定（IPO準備時）</td></tr>
        </table>
      </div>
      <div class="ir-card">
        <div class="ir-card-icon"><i class="fas fa-scale-balanced"></i></div>
        <h3>内部統制・コンプライアンス</h3>
        <ul class="ir-portfolio">
          <li>
            <span class="ir-portfolio-name">内部統制システム</span>
            <span class="ir-portfolio-desc">J-SOX対応の内部統制報告制度に準じた体制を構築中</span>
          </li>
          <li>
            <span class="ir-portfolio-name">反社会的勢力排除</span>
            <span class="ir-portfolio-desc">反社チェック体制の整備、取引先審査プロセスの厳格化</span>
          </li>
          <li>
            <span class="ir-portfolio-name">情報管理</span>
            <span class="ir-portfolio-desc">インサイダー取引防止規程、情報管理規程を制定</span>
          </li>
          <li>
            <span class="ir-portfolio-name">内部通報制度</span>
            <span class="ir-portfolio-desc">社外窓口を含む内部通報（ホットライン）制度を運用</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- IRニュース -->
<section class="section">
  <div class="container">
    ${sectionTitle('NEWS', 'IRニュース・適時開示')}
    <ul class="news-list news-list-page">
      <li class="news-item">
        <time>2025.06.01</time>
        <span class="news-tag">IR</span>
        <a href="#">六本木ヒルズ森タワー37Fにオフィスを開設いたしました</a>
      </li>
      <li class="news-item">
        <time>2025.05.15</time>
        <span class="news-tag">事業報告</span>
        <a href="#">医療DX（カルテ電子化）サービスを開始いたしました</a>
      </li>
      <li class="news-item">
        <time>2025.04.20</time>
        <span class="news-tag">メディア</span>
        <a href="#">業界専門誌に弊社取り組みが掲載されました</a>
      </li>
      <li class="news-item">
        <time>2025.03.10</time>
        <span class="news-tag">事業報告</span>
        <a href="#">累計取扱高20億円を突破いたしました</a>
      </li>
      <li class="news-item">
        <time>2025.01.15</time>
        <span class="news-tag">組織</span>
        <a href="#">グループ取引先100社達成に関するお知らせ</a>
      </li>
      <li class="news-item">
        <time>2024.12.01</time>
        <span class="news-tag">IR</span>
        <a href="#">IPO準備に向けた監査法人との契約締結のお知らせ</a>
      </li>
      <li class="news-item">
        <time>2024.10.01</time>
        <span class="news-tag">ガバナンス</span>
        <a href="#">コンプライアンス委員会の設置について</a>
      </li>
      <li class="news-item">
        <time>2024.08.15</time>
        <span class="news-tag">IR</span>
        <a href="#">第4期決算公告</a>
      </li>
    </ul>
  </div>
</section>

<!-- IRカレンダー・ディスクロージャーポリシー -->
<section class="section section-alt">
  <div class="container">
    ${sectionTitle('DISCLOSURE', 'ディスクロージャーポリシー')}
    <div class="ir-corporate-grid">
      <div class="ir-card">
        <div class="ir-card-icon"><i class="fas fa-calendar-alt"></i></div>
        <h3>IRカレンダー</h3>
        <table class="ir-table">
          <tr><th>定時株主総会</th><td>毎年6月（予定）</td></tr>
          <tr><th>決算発表</th><td>期末後45日以内を目標</td></tr>
          <tr><th>中間報告</th><td>第2四半期末後45日以内（予定）</td></tr>
          <tr><th>有価証券報告書</th><td>定時株主総会後速やかに提出</td></tr>
        </table>
      </div>
      <div class="ir-card">
        <div class="ir-card-icon"><i class="fas fa-file-alt"></i></div>
        <h3>情報開示方針</h3>
        <ul class="ir-portfolio">
          <li>
            <span class="ir-portfolio-name">基本方針</span>
            <span class="ir-portfolio-desc">株主・投資家の皆様に対し、適時・適切・公平な情報開示を基本方針とします</span>
          </li>
          <li>
            <span class="ir-portfolio-name">開示基準</span>
            <span class="ir-portfolio-desc">金融商品取引法、東京証券取引所の適時開示規則に従い情報開示を行います</span>
          </li>
          <li>
            <span class="ir-portfolio-name">沈黙期間</span>
            <span class="ir-portfolio-desc">決算期末日翌日から決算発表日までをサイレントピリオドとし、業績に関するコメントを控えます</span>
          </li>
          <li>
            <span class="ir-portfolio-name">将来予測に関する注意</span>
            <span class="ir-portfolio-desc">本ページに記載の将来に関する記述は、現時点で入手可能な情報に基づく見通しであり、実際の業績は様々な要因により異なる可能性があります</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- IRお問い合わせ -->
<section class="section">
  <div class="container">
    ${sectionTitle('CONTACT', 'IR・投資家様お問い合わせ')}
    <div class="ir-card" style="max-width:600px; margin:0 auto;">
      <div class="ir-card-icon"><i class="fas fa-envelope"></i></div>
      <h3>IR担当</h3>
      <table class="ir-table">
        <tr><th>窓口</th><td>経営企画部 IR担当</td></tr>
        <tr><th>メール</th><td>ir@i2m2.co.jp</td></tr>
        <tr><th>TEL</th><td>※上場後に公開予定</td></tr>
        <tr><th>所在地</th><td>〒106-6137 東京都港区六本木6-10-1<br>六本木ヒルズ森タワー37F</td></tr>
      </table>
    </div>
  </div>
</section>

${ctaSection({ title: 'IR・投資に関するお問い合わせ', buttons: [{ label: 'お問い合わせ', href: '/contact', primary: true }, { label: '会社概要', href: '/company' }] })}
`))
}
