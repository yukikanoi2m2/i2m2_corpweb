import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { topPage } from './pages/top'
import { companyPage } from './pages/company'
import { servicesPage } from './pages/services'
import { maPage } from './pages/ma'
import { marketingPage } from './pages/marketing'
import { medicalEquipmentPage } from './pages/medical-equipment'
import { medicalManagementPage } from './pages/medical-management'
import { casesPage } from './pages/cases'
import { resourcesPage } from './pages/resources'
import { columnsPage } from './pages/columns'
import { newsPage } from './pages/news'
import { recruitPage } from './pages/recruit'
import { faqPage } from './pages/faq'
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

// Service LPs
app.get('/ma', maPage)
app.get('/marketing', marketingPage)
app.get('/medical-equipment', medicalEquipmentPage)
app.get('/medical-management', medicalManagementPage)

// Cases & Results
app.get('/cases', casesPage)
app.get('/cases/:category', casesPage)

// Resources / Download
app.get('/resources', resourcesPage)

// Columns (SEO archive)
app.get('/columns', columnsPage)
app.get('/columns/:slug', columnsPage)

// News
app.get('/news', newsPage)

// Recruit
app.get('/recruit', recruitPage)

// FAQ
app.get('/faq', faqPage)

// Contact
app.get('/contact', contactPage)
app.get('/contact/:sub', contactPage)

// Legal
app.get('/legal', legalPage)
app.get('/legal/:sub', legalPage)

export default app
