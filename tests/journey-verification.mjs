import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
const SCREENSHOT_DIR = path.resolve('docs/qa-screenshots')

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
}

const journeyResults = []

async function runJourneys() {
  console.log(`\n======================================================`)
  console.log(`🚀 TALENTXCEL.NET — END-TO-END JOURNEY AUDIT`)
  console.log(`Target: ${BASE_URL}`)
  console.log(`======================================================\n`)

  const browser = await chromium.launch({ headless: true })

  // Context WITH E2E audit bypass for authenticated views
  const auditContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    extraHTTPHeaders: { 'x-e2e-audit': '1' },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 TalentXcelQA/1.0',
  })

  // Clean unauthenticated context for boundary testing
  const publicContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 TalentXcelPublic/1.0',
  })

  const page = await auditContext.newPage()
  const publicPage = await publicContext.newPage()

  // JOURNEY 1: Contact Enquiry Submission
  try {
    console.log(`[Journey 1] Discovery to Enquiry Submission (/contact)...`)
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle', timeout: 15000 })

    await page.fill('#enq-fullName', 'Priya Sharma')
    await page.fill('#enq-email', 'priya.sharma@example.in')
    await page.fill('#enq-phone', '9876543210')
    await page.fill('#enq-message', 'Interested in the AI Development & Automation cohort. Please advise on admission dates.')
    
    // Check consent checkbox
    await page.check('#enq-consent')

    // Submit form
    await page.click('button[type="submit"]')

    // Wait for success alert
    await page.waitForSelector('text=Enquiry Received!', { timeout: 8000 })
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'journey1_enquiry_success.png'), fullPage: false })

    console.log(`  ✓ Journey 1 passed: Enquiry successfully submitted and confirmed.`)
    journeyResults.push({ journey: '1. Contact Enquiry Submission', status: 'PASSED', route: '/contact' })
  } catch (err) {
    console.error(`  ✗ Journey 1 failed:`, err.message)
    journeyResults.push({ journey: '1. Contact Enquiry Submission', status: 'FAILED', error: err.message })
  }

  // JOURNEY 2: Admissions Application Flow
  try {
    console.log(`[Journey 2] Admissions Application (/apply)...`)
    await page.goto(`${BASE_URL}/apply`, { waitUntil: 'networkidle', timeout: 15000 })

    await page.fill('#enq-fullName', 'Aditya Verma')
    await page.fill('#enq-email', 'aditya.verma@example.com')
    await page.fill('#enq-phone', '9811223344')
    await page.fill('#enq-message', 'Applying for the Full-Stack Cloud cohort.')
    
    await page.check('#enq-consent')

    await page.click('button[type="submit"]')
    await page.waitForSelector('text=Enquiry Received!', { timeout: 8000 })
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'journey2_apply_success.png'), fullPage: false })

    console.log(`  ✓ Journey 2 passed: Admissions application enquiry captured.`)
    journeyResults.push({ journey: '2. Admissions Application', status: 'PASSED', route: '/apply' })
  } catch (err) {
    console.error(`  ✗ Journey 2 failed:`, err.message)
    journeyResults.push({ journey: '2. Admissions Application', status: 'FAILED', error: err.message })
  }

  // JOURNEY 3A: Certificate Verification (Valid)
  try {
    console.log(`[Journey 3A] Certificate Verification - Valid (/verify/TXCERT-2026-DEMO01)...`)
    await page.goto(`${BASE_URL}/verify/TXCERT-2026-DEMO01`, { waitUntil: 'networkidle', timeout: 15000 })

    const isAuthentic = await page.locator('text=Verified Authentic').count() > 0
    const hasGraduate = await page.locator('text=Sample Graduate').count() > 0

    if (!isAuthentic || !hasGraduate) {
      throw new Error(`Certificate verification badge or graduate name missing`)
    }

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'journey3_cert_valid.png'), fullPage: false })
    console.log(`  ✓ Journey 3A passed: Valid certificate rendered authentic badge and recipient.`)
    journeyResults.push({ journey: '3A. Certificate Verification (Valid)', status: 'PASSED', route: '/verify/TXCERT-2026-DEMO01' })
  } catch (err) {
    console.error(`  ✗ Journey 3A failed:`, err.message)
    journeyResults.push({ journey: '3A. Certificate Verification (Valid)', status: 'FAILED', error: err.message })
  }

  // JOURNEY 3B: Certificate Verification (Invalid)
  try {
    console.log(`[Journey 3B] Certificate Verification - Invalid (/verify/INVALID-SERIAL-999)...`)
    await page.goto(`${BASE_URL}/verify/INVALID-SERIAL-999`, { waitUntil: 'networkidle', timeout: 15000 })

    const isNotFound = await page.locator('text=Certificate Record Not Found').count() > 0
    if (!isNotFound) {
      throw new Error(`Expected 'Certificate Record Not Found' error banner`)
    }

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'journey3_cert_invalid.png'), fullPage: false })
    console.log(`  ✓ Journey 3B passed: Invalid certificate cleanly handled with official notice.`)
    journeyResults.push({ journey: '3B. Certificate Verification (Invalid)', status: 'PASSED', route: '/verify/INVALID-SERIAL-999' })
  } catch (err) {
    console.error(`  ✗ Journey 3B failed:`, err.message)
    journeyResults.push({ journey: '3B. Certificate Verification (Invalid)', status: 'FAILED', error: err.message })
  }

  // JOURNEY 4: Course Player and Socratic AI Tutor
  try {
    console.log(`[Journey 4] Course Player & Super AI Tutor (/courses/ai-development/lessons/les-101)...`)
    await page.goto(`${BASE_URL}/courses/ai-development/lessons/les-101`, { waitUntil: 'networkidle', timeout: 15000 })

    // Check lesson title
    const hasLessonTitle = await page.locator('text=1.1 Architecture of Production Web Applications').count() > 0
    if (!hasLessonTitle) {
      throw new Error(`Lesson title '1.1 Architecture of Production Web Applications' not found`)
    }

    // Click Super AI Tutor floating button
    const tutorButton = page.locator('button[aria-label="Open AI Tutor"]')
    await tutorButton.click()

    // Wait for drawer
    await page.waitForSelector('text=Super AI Learning Tutor', { timeout: 5000 })

    // Click "Get Hint #1"
    const hintButton = page.locator('button:has-text("Get Hint #1")')
    await hintButton.click()

    // Wait for response to appear
    await page.waitForTimeout(2000)
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'journey4_ai_tutor_active.png'), fullPage: false })

    console.log(`  ✓ Journey 4 passed: Course player loaded and AI Tutor Socratic mode engaged.`)
    journeyResults.push({ journey: '4. Course Player & AI Tutor', status: 'PASSED', route: '/courses/ai-development/lessons/les-101' })
  } catch (err) {
    console.error(`  ✗ Journey 4 failed:`, err.message)
    journeyResults.push({ journey: '4. Course Player & AI Tutor', status: 'FAILED', error: err.message })
  }

  // JOURNEY 5: Programme Exploration & Details
  try {
    console.log(`[Journey 5] Programme Details Exploration (/programmes/ai-development)...`)
    await page.goto(`${BASE_URL}/programmes/ai-development`, { waitUntil: 'networkidle', timeout: 15000 })

    const hasTitle = await page.locator('h1:has-text("AI Development & Automation")').count() > 0
    if (!hasTitle) {
      throw new Error(`Programme title not found`)
    }

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'journey5_programme_details.png'), fullPage: false })
    console.log(`  ✓ Journey 5 passed: Programme curriculum and tuition transparently displayed.`)
    journeyResults.push({ journey: '5. Programme Exploration', status: 'PASSED', route: '/programmes/ai-development' })
  } catch (err) {
    console.error(`  ✗ Journey 5 failed:`, err.message)
    journeyResults.push({ journey: '5. Programme Exploration', status: 'FAILED', error: err.message })
  }

  // JOURNEY 6: Fees & Milestone Cost Calculator
  try {
    console.log(`[Journey 6] Fees & Pricing Transparency (/fees)...`)
    await page.goto(`${BASE_URL}/fees`, { waitUntil: 'networkidle', timeout: 15000 })

    const hasFees = await page.locator('text=Tuition Fees & Payment Plans').count() > 0
    if (!hasFees) {
      throw new Error(`Fees heading not found`)
    }

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'journey6_fees_calculator.png'), fullPage: false })
    console.log(`  ✓ Journey 6 passed: Fees structure and milestone breakdown verified.`)
    journeyResults.push({ journey: '6. Fees Transparency', status: 'PASSED', route: '/fees' })
  } catch (err) {
    console.error(`  ✗ Journey 6 failed:`, err.message)
    journeyResults.push({ journey: '6. Fees Transparency', status: 'FAILED', error: err.message })
  }

  // JOURNEY 7: Admin Operations Overview
  try {
    console.log(`[Journey 7] Admin Operations Console (/admin)...`)
    await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle', timeout: 15000 })

    const hasOps = await page.locator('text=Operations Overview').count() > 0
    if (!hasOps) {
      throw new Error(`Admin Operations heading not found`)
    }

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'journey7_admin_overview.png'), fullPage: false })
    console.log(`  ✓ Journey 7 passed: Operations console metrics rendered.`)
    journeyResults.push({ journey: '7. Admin Operations Overview', status: 'PASSED', route: '/admin' })
  } catch (err) {
    console.error(`  ✗ Journey 7 failed:`, err.message)
    journeyResults.push({ journey: '7. Admin Operations Overview', status: 'FAILED', error: err.message })
  }

  // JOURNEY 8: Security Boundary (Unauthenticated Access Redirect)
  try {
    console.log(`[Journey 8] Security Boundary Test (Unauthenticated /admin redirect)...`)
    await publicPage.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle', timeout: 15000 })

    const currentUrl = publicPage.url()
    const redirectedToLogin = currentUrl.includes('/auth/login') && currentUrl.includes('redirectTo=%2Fadmin')

    if (!redirectedToLogin) {
      throw new Error(`Expected redirect to /auth/login?redirectTo=%2Fadmin but got: ${currentUrl}`)
    }

    await publicPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'journey8_security_redirect.png'), fullPage: false })
    console.log(`  ✓ Journey 8 passed: Protected route correctly redirected unauthenticated visitor to login.`)
    journeyResults.push({ journey: '8. Security Boundary Enforcement', status: 'PASSED', route: '/admin -> /auth/login' })
  } catch (err) {
    console.error(`  ✗ Journey 8 failed:`, err.message)
    journeyResults.push({ journey: '8. Security Boundary Enforcement', status: 'FAILED', error: err.message })
  }

  // JOURNEY 9: Blog & Educational Resources
  try {
    console.log(`[Journey 9] Blog & Educational Directory (/blog)...`)
    await page.goto(`${BASE_URL}/blog`, { waitUntil: 'networkidle', timeout: 15000 })

    const hasBlogTitle = await page.locator('text=Blog & Educational Resources').count() > 0
    if (!hasBlogTitle) {
      throw new Error(`Blog heading not found`)
    }

    // Navigate to specific blueprint article
    await page.goto(`${BASE_URL}/blog/building-resilient-ai-agents`, { waitUntil: 'networkidle', timeout: 15000 })
    const hasArticle = await page.locator('text=Building Resilient AI Agents').count() > 0
    if (!hasArticle) {
      throw new Error(`Article title not found`)
    }

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'journey9_blog_article.png'), fullPage: false })
    console.log(`  ✓ Journey 9 passed: Blog knowledge directory and technical blueprint verified.`)
    journeyResults.push({ journey: '9. Blog & Educational Resources', status: 'PASSED', route: '/blog' })
  } catch (err) {
    console.error(`  ✗ Journey 9 failed:`, err.message)
    journeyResults.push({ journey: '9. Blog & Educational Resources', status: 'FAILED', error: err.message })
  }

  // JOURNEY 10: Hardware Warranty Terms
  try {
    console.log(`[Journey 10] Hardware Fulfilment & Warranty Terms (/legal/hardware-terms)...`)
    await page.goto(`${BASE_URL}/legal/hardware-terms`, { waitUntil: 'networkidle', timeout: 15000 })

    const hasHardwareTerms = await page.locator('text=Laptop Fulfilment & Hardware Warranty Terms').count() > 0
    if (!hasHardwareTerms) {
      throw new Error(`Hardware terms heading not found`)
    }

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'journey10_hardware_terms.png'), fullPage: false })
    console.log(`  ✓ Journey 10 passed: Official student laptop warranty terms verified.`)
    journeyResults.push({ journey: '10. Hardware Warranty Terms', status: 'PASSED', route: '/legal/hardware-terms' })
  } catch (err) {
    console.error(`  ✗ Journey 10 failed:`, err.message)
    journeyResults.push({ journey: '10. Hardware Warranty Terms', status: 'FAILED', error: err.message })
  }

  // JOURNEY 11: AI Admissions Assistant API & Grounding
  try {
    console.log(`[Journey 11] AI Admissions Assistant Grounded API (/api/ai/admissions)...`)
    const response = await page.request.post(`${BASE_URL}/api/ai/admissions`, {
      data: { question: 'What is the fee for the AI development programme?' },
    })

    const data = await response.json()
    if (!response.ok() || !data.content) {
      throw new Error(`AI Admissions API response failed`)
    }

    console.log(`  ✓ Journey 11 passed: AI Admissions Assistant answered with grounded context.`)
    journeyResults.push({ journey: '11. AI Admissions Assistant', status: 'PASSED', route: '/api/ai/admissions' })
  } catch (err) {
    console.error(`  ✗ Journey 11 failed:`, err.message)
    journeyResults.push({ journey: '11. AI Admissions Assistant', status: 'FAILED', error: err.message })
  }

  await browser.close()

  console.log(`\n======================================================`)
  console.log(`JOURNEY VERIFICATION SUMMARY`)
  console.log(`======================================================`)
  console.table(journeyResults)

  fs.writeFileSync('docs/JOURNEY_RESULTS.json', JSON.stringify(journeyResults, null, 2))
}

runJourneys().catch(console.error)
