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

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

// ======== PAGES ========
// Top
app.get('/', topPage)

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

// Legal
app.get('/legal', legalPage)
app.get('/legal/:sub', legalPage)

export default app
