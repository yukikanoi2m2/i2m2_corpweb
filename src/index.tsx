import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { topPage } from './pages/top'
import { companyPage } from './pages/company'
import { servicesPage } from './pages/services'
import { casesPage } from './pages/cases'
import { irPage } from './pages/ir'
import { recruitPage } from './pages/recruit'
import { contactPage } from './pages/contact'
import { legalPage } from './pages/legal'
import { newsPage } from './pages/news'
import { contactSubmit, adminContacts, adminContactDetail } from './api/contact'

type Env = { Bindings: { DB: D1Database } }
const app = new Hono<Env>()

app.use('/static/*', serveStatic({ root: './' }))

// ======== PAGES ========
// Top
app.get('/', topPage)

// News
app.get('/news', newsPage)
app.get('/news/:id', newsPage)

// Company
app.get('/company', companyPage)
app.get('/company/:sub', companyPage)

// Services (unified — RVC overview)
app.get('/services', servicesPage)

// Legacy LP routes → redirect to /services
app.get('/healthcare', (c) => c.redirect('/services', 301))
app.get('/talent', (c) => c.redirect('/services', 301))
app.get('/ma', (c) => c.redirect('/services', 301))

// Cases & Results
app.get('/cases', casesPage)
app.get('/cases/:category', casesPage)

// IR Information
app.get('/ir', irPage)

// Recruit
app.get('/recruit', recruitPage)

// Contact
app.get('/contact', contactPage)
app.get('/contact/:sub', contactPage)
app.post('/api/contact', contactSubmit)

// Admin
app.get('/admin/contacts', adminContacts)
app.get('/admin/contacts/:id', adminContactDetail)

// Legal
app.get('/legal', legalPage)
app.get('/legal/:sub', legalPage)

export default app
