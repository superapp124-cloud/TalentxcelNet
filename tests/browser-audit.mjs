import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'http://localhost:3000'
const OUTPUT_DIR = path.resolve('docs/qa-screenshots')

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1280, height: 800 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
]

const ROUTES = [
  { path: '/', label: 'homepage' },
  { path: '/programmes', label: 'programmes-catalogue' },
  { path: '/programmes/ai-development', label: 'programme-detail-ai' },
  { path: '/fees', label: 'fees-calculator' },
  { path: '/how-it-works', label: 'how-it-works' },
  { path: '/apply', label: 'admissions-application' },
  { path: '/contact', label: 'contact-enquiry' },
  { path: '/auth/login', label: 'auth-login' },
  { path: '/auth/register', label: 'auth-register' },
  { path: '/dashboard', label: 'learner-dashboard' },
  { path: '/admin', label: 'admin-overview' },
  { path: '/admin/admissions', label: 'admin-admissions-crm' },
  { path: '/admin/payments', label: 'admin-payments' },
  { path: '/admin/hardware', label: 'admin-hardware' },
  { path: '/admin/ai-analytics', label: 'admin-ai-analytics' },
  { path: '/courses/ai-development/lessons/mod1-lesson1', label: 'course-player' },
  { path: '/verify/TX-2026-AID-0042', label: 'certificate-verify' },
  { path: '/laptop-requirements', label: 'laptop-requirements' },
  { path: '/projects', label: 'projects-portfolio' },
  { path: '/faculty', label: 'faculty' },
  { path: '/about', label: 'about' },
  { path: '/faq', label: 'faq' },
  { path: '/legal/privacy', label: 'legal-privacy' },
]

async function runAudit() {
  console.log(`Starting real browser visual and functional audit against ${BASE_URL}...`)
  const browser = await chromium.launch({ headless: true })
  
  const auditReport = {
    timestamp: new Date().toISOString(),
    routesAudited: ROUTES.length,
    viewportsTested: VIEWPORTS.length,
    results: [],
  }

  for (const vp of VIEWPORTS) {
    console.log(`\n=== Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`)
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    })

    for (const route of ROUTES) {
      const page = await context.newPage()
      const consoleErrors = []
      const failedRequests = []

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text())
        }
      })

      page.on('requestfailed', (req) => {
        failedRequests.push(`${req.method()} ${req.url()}: ${req.failure()?.errorText || 'Failed'}`)
      })

      const targetUrl = `${BASE_URL}${route.path}`
      let status = 0
      let title = ''
      let hasHorizontalOverflow = false
      let scrollWidth = 0
      let clientWidth = 0

      try {
        const response = await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 15000 })
        status = response ? response.status() : 0
        title = await page.title()

        // Check horizontal overflow
        const overflowData = await page.evaluate(() => {
          const doc = document.documentElement
          return {
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            hasOverflow: doc.scrollWidth > doc.clientWidth,
          }
        })
        hasHorizontalOverflow = overflowData.hasOverflow
        scrollWidth = overflowData.scrollWidth
        clientWidth = overflowData.clientWidth

        // Capture screenshot for key viewports (desktop and mobile for every route, laptop/tablet for main routes)
        if (vp.name === 'desktop' || vp.name === 'mobile' || route.path === '/') {
          const shotPath = path.join(OUTPUT_DIR, `${vp.name}_${route.label}.png`)
          await page.screenshot({ path: shotPath, fullPage: false })
        }

        const resultItem = {
          route: route.path,
          label: route.label,
          viewport: vp.name,
          status,
          title,
          hasHorizontalOverflow,
          scrollWidth,
          clientWidth,
          consoleErrorsCount: consoleErrors.length,
          consoleErrors,
          failedRequestsCount: failedRequests.length,
          failedRequests,
          passed: status === 200 && !hasHorizontalOverflow && consoleErrors.length === 0,
        }
        auditReport.results.push(resultItem)

        const statusIcon = resultItem.passed ? '✓ PASS' : '⚠ DEFECT'
        console.log(`[${statusIcon}] ${route.path.padEnd(35)} | Status: ${status} | Overflow: ${hasHorizontalOverflow ? 'YES (' + scrollWidth + 'px)' : 'No'} | Errors: ${consoleErrors.length}`)
      } catch (err) {
        console.error(`[FAIL] ${route.path}: ${err.message}`)
        auditReport.results.push({
          route: route.path,
          label: route.label,
          viewport: vp.name,
          status: 0,
          error: err.message,
          passed: false,
        })
      } finally {
        await page.close()
      }
    }
    await context.close()
  }

  await browser.close()

  const reportPath = path.resolve('docs/AUDIT_REPORT.json')
  fs.writeFileSync(reportPath, JSON.stringify(auditReport, null, 2))
  console.log(`\nAudit complete. Detailed report saved to ${reportPath}`)
}

runAudit().catch((err) => {
  console.error('Fatal audit failure:', err)
  process.exit(1)
})
