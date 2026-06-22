import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { topPage } from './pages/top'
import { companyPage } from './pages/company'
import { servicesPage } from './pages/services'
import { maPage } from './pages/ma'
import { healthcarePage } from './pages/healthcare'
import { talentPage } from './pages/talent'
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

// Services overview
app.get('/services', servicesPage)

// Service LPs (i2m2 structure)
app.get('/healthcare', healthcarePage)   // IHG™ Healthcare Services
app.get('/talent', talentPage)           // DR-LINK™ Healthcare Talent
app.get('/ma', maPage)                   // RVC Community Value

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
