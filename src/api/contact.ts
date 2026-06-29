import type { Context } from 'hono'

type Env = { Bindings: { DB: D1Database } }

// お問い合わせ受付API
export const contactSubmit = async (c: Context<Env>) => {
  try {
    const body = await c.req.parseBody()
    const { category, company, name, position, email, phone, message } = body as Record<string, string>

    // バリデーション
    if (!category || !company || !name || !email || !message) {
      return c.json({ error: '必須項目を入力してください' }, 400)
    }

    // D1に保存
    await c.env.DB.prepare(`
      INSERT INTO contacts (category, company, name, position, email, phone, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(category, company, name, position || '', email, phone || '', message).run()

    // 完了ページにリダイレクト
    return c.redirect('/contact/thanks')
  } catch (e: any) {
    console.error('Contact submit error:', e)
    return c.json({ error: '送信に失敗しました。時間をおいて再度お試しください。' }, 500)
  }
}

// 管理画面: お問い合わせ一覧
export const adminContacts = async (c: Context<Env>) => {
  // シンプルなBasic認証
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !validateAuth(authHeader)) {
    return new Response('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="i2m2 Admin"' }
    })
  }

  const { results } = await c.env.DB.prepare(
    'SELECT * FROM contacts ORDER BY created_at DESC LIMIT 100'
  ).all()

  const contacts = results || []

  return c.html(`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>お問い合わせ管理 | i2m2</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: "Noto Sans JP", sans-serif; background: #f5f5f5; color: #333; }
    .admin-header { background: #1a1a1a; color: #fff; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; }
    .admin-header h1 { font-size: 16px; font-weight: 600; }
    .admin-header a { color: #b8860b; font-size: 13px; text-decoration: none; }
    .admin-container { max-width: 1200px; margin: 24px auto; padding: 0 16px; }
    .admin-stats { display: flex; gap: 16px; margin-bottom: 24px; }
    .admin-stat { background: #fff; border-radius: 8px; padding: 20px; flex: 1; box-shadow: 0 2px 8px rgba(0,0,0,.06); }
    .admin-stat-num { font-size: 32px; font-weight: 700; color: #b8860b; }
    .admin-stat-label { font-size: 12px; color: #888; margin-top: 4px; }
    .admin-table-wrap { background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.06); }
    table { width: 100%; border-collapse: collapse; }
    th { background: #fafafa; padding: 12px 16px; font-size: 12px; font-weight: 600; color: #666; text-align: left; border-bottom: 1px solid #eee; }
    td { padding: 12px 16px; font-size: 13px; border-bottom: 1px solid #f0f0f0; vertical-align: top; }
    tr:hover { background: #fafafa; }
    .badge { font-size: 10px; padding: 3px 8px; border-radius: 3px; font-weight: 600; }
    .badge-new { background: #fef3cd; color: #856404; }
    .badge-read { background: #d4edda; color: #155724; }
    .msg-preview { max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #666; }
    @media (max-width: 768px) { .admin-stats { flex-direction: column; } table { font-size: 12px; } td, th { padding: 8px; } }
  </style>
</head>
<body>
  <header class="admin-header">
    <h1>📋 お問い合わせ管理</h1>
    <a href="/">← サイトに戻る</a>
  </header>
  <div class="admin-container">
    <div class="admin-stats">
      <div class="admin-stat">
        <div class="admin-stat-num">${contacts.length}</div>
        <div class="admin-stat-label">総件数</div>
      </div>
      <div class="admin-stat">
        <div class="admin-stat-num">${(contacts as any[]).filter((c: any) => c.status === 'new').length}</div>
        <div class="admin-stat-label">未読</div>
      </div>
    </div>
    <div class="admin-table-wrap">
      <table>
        <thead>
          <tr>
            <th>状態</th>
            <th>日時</th>
            <th>種別</th>
            <th>会社名</th>
            <th>担当者</th>
            <th>メール</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          ${(contacts as any[]).map((c: any) => `
          <tr>
            <td><span class="badge ${c.status === 'new' ? 'badge-new' : 'badge-read'}">${c.status === 'new' ? '未読' : '既読'}</span></td>
            <td style="white-space:nowrap;">${new Date(c.created_at).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}</td>
            <td>${c.category}</td>
            <td>${c.company}</td>
            <td>${c.name}</td>
            <td><a href="mailto:${c.email}">${c.email}</a></td>
            <td class="msg-preview" title="${escHtml(c.message)}">${escHtml(c.message)}</td>
          </tr>
          `).join('')}
          ${contacts.length === 0 ? '<tr><td colspan="7" style="text-align:center;padding:40px;color:#999;">お問い合わせはまだありません</td></tr>' : ''}
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>`)
}

// 管理画面: 個別詳細API
export const adminContactDetail = async (c: Context<Env>) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !validateAuth(authHeader)) {
    return new Response('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="i2m2 Admin"' }
    })
  }

  const id = c.req.param('id')
  const contact = await c.env.DB.prepare('SELECT * FROM contacts WHERE id = ?').bind(id).first()
  if (!contact) return c.notFound()

  // 既読にする
  await c.env.DB.prepare("UPDATE contacts SET status = 'read', read_at = CURRENT_TIMESTAMP WHERE id = ? AND status = 'new'").bind(id).run()

  return c.json(contact)
}

// Basic認証チェック (admin:i2m2admin2025)
function validateAuth(header: string): boolean {
  const encoded = header.replace('Basic ', '')
  try {
    const decoded = atob(encoded)
    return decoded === 'admin:i2m2admin2025'
  } catch {
    return false
  }
}

function escHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
