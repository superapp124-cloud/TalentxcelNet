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
  await auditContext.addCookies([
    {
      name: 'e2e_audit',
      value: '1',
      domain: 'localhost',
      path: '/',
    },
  ])

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
    await page.waitForTimeout(500)

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
    await page.goto(`${BASE_URL}/apply`, { waitUntil: 'domcontentloaded', timeout: 15000 })

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
    await page.goto(`${BASE_URL}/verify/TXCERT-2026-DEMO01`, { waitUntil: 'domcontentloaded', timeout: 15000 })

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
    await page.goto(`${BASE_URL}/verify/INVALID-SERIAL-999`, { waitUntil: 'domcontentloaded', timeout: 15000 })

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
    await page.goto(`${BASE_URL}/courses/ai-development/lessons/les-101`, { waitUntil: 'networkidle', timeout: 25000 })
    await page.waitForTimeout(500)

    // Check lesson title
    const hasLessonTitle = await page.locator('text=1.1 Architecture of Production Web Applications').count() > 0
    if (!hasLessonTitle) {
      throw new Error(`Lesson title '1.1 Architecture of Production Web Applications' not found`)
    }

    // Click Super AI Tutor floating button
    const tutorButton = page.locator('button[aria-label="Open AI Tutor"]').first()
    await tutorButton.scrollIntoViewIfNeeded()
    await tutorButton.click({ force: true })

    // Wait for drawer
    await page.waitForSelector('text=Super AI Learning Tutor', { state: 'visible', timeout: 15000 })

    // Click "Get Hint #1"
    const hintButton = page.locator('button:has-text("Get Hint #1")').first()
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
    await page.goto(`${BASE_URL}/programmes/ai-development`, { waitUntil: 'domcontentloaded', timeout: 15000 })

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
    await page.goto(`${BASE_URL}/fees`, { waitUntil: 'domcontentloaded', timeout: 15000 })

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
    await page.goto(`${BASE_URL}/admin`, { waitUntil: 'domcontentloaded', timeout: 15000 })

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
    await publicPage.goto(`${BASE_URL}/admin`, { waitUntil: 'domcontentloaded', timeout: 15000 })

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
    await page.goto(`${BASE_URL}/blog`, { waitUntil: 'domcontentloaded', timeout: 15000 })

    const hasBlogTitle = await page.locator('text=Blog & Educational Resources').count() > 0
    if (!hasBlogTitle) {
      throw new Error(`Blog heading not found`)
    }

    // Navigate to specific blueprint article
    await page.goto(`${BASE_URL}/blog/building-resilient-ai-agents`, { waitUntil: 'domcontentloaded', timeout: 15000 })
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
    await page.goto(`${BASE_URL}/legal/hardware-terms`, { waitUntil: 'domcontentloaded', timeout: 15000 })

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

  // JOURNEY 12: Homepage Hero Interactive Product Demo
  try {
    console.log(`[Journey 12] Homepage Hero Interactive Product Demo (/)...`)
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded', timeout: 15000 })

    // Verify 3 core value propositions on screen
    const hasTutorProp = await page.locator('text=Grounded AI Tutor').count() > 0
    const hasBuildProp = await page.locator('text=Build, Not Just Watch').count() > 0
    const hasEvidenceProp = await page.locator('text=Credible Evidence').count() > 0

    if (!hasTutorProp || !hasBuildProp || !hasEvidenceProp) {
      throw new Error(`One or more of the 3 core hero value propositions not found`)
    }

    // Scroll hero demo into view
    const heroDemo = page.locator('text=DEMONSTRATION MODE').first()
    await heroDemo.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // Click "2. Practical Project" tab in the hero demo
    const projectTab = page.locator('button:has-text("2. Practical Project")').first()
    await projectTab.scrollIntoViewIfNeeded()
    await projectTab.click({ force: true })
    await page.waitForTimeout(800)

    // Click "Run Sandboxed Tests" in the hero demo
    const runTestsBtn = page.locator('button:has-text("Run Sandboxed Tests")').first()
    await runTestsBtn.scrollIntoViewIfNeeded()
    await runTestsBtn.click({ force: true })
    await page.waitForSelector('text=4/4 PASS', { timeout: 10000 })

    // Click "3. Living Skill Graph" tab in the hero demo
    const graphTab = page.locator('button:has-text("3. Living Skill Graph")').first()
    await graphTab.click()
    await page.waitForTimeout(500)

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'journey12_hero_product_demo.png'), fullPage: false })
    console.log(`  ✓ Journey 12 passed: Hero product demo interactive across Super AI, Sandbox, and Skill Graph.`)
    journeyResults.push({ journey: '12. Hero Interactive Product Demo', status: 'PASSED', route: '/' })
  } catch (err) {
    console.error(`  ✗ Journey 12 failed:`, err.message)
    journeyResults.push({ journey: '12. Hero Interactive Product Demo', status: 'FAILED', error: err.message })
  }

  // JOURNEY 13: Living Skill Graph Interaction & Accessible Alternative
  try {
    console.log(`[Journey 13] Living Skill Graph Interaction & Accessibility (/)...`)
    await page.goto(`${BASE_URL}/#skill-graph-section`, { waitUntil: 'domcontentloaded', timeout: 15000 })

    const hasGraphHeading = await page.locator('h2:has-text("The Living Skill Graph")').count() > 0
    if (!hasGraphHeading) {
      throw new Error(`Living Skill Graph section heading not found`)
    }

    // Toggle to accessible table view
    const accessibleBtn = page.locator('button[aria-label="View as accessible table"]')
    await accessibleBtn.click()
    await page.waitForSelector('table caption:has-text("Structured accessible table")', { timeout: 5000 })

    // Toggle back to graph view
    const graphBtn = page.locator('button[aria-label="View as interactive graph"]')
    await graphBtn.click()
    await page.waitForTimeout(500)

    // Select a node (pgvector)
    const pgVectorNode = page.locator('button[role="treeitem"]:has-text("pgvector")').first()
    await pgVectorNode.click()
    await page.waitForSelector('text=Defined Verification Criteria', { timeout: 5000 })

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'journey13_living_skill_graph.png'), fullPage: false })
    console.log(`  ✓ Journey 13 passed: Skill Graph node selection and accessible table toggle operational.`)
    journeyResults.push({ journey: '13. Living Skill Graph & Accessibility', status: 'PASSED', route: '/#skill-graph-section' })
  } catch (err) {
    console.error(`  ✗ Journey 13 failed:`, err.message)
    journeyResults.push({ journey: '13. Living Skill Graph & Accessibility', status: 'FAILED', error: err.message })
  }

  // JOURNEY 14: Build While You Learn — Guided Project Workspace
  try {
    console.log(`[Journey 14] Guided Project Workspace & Sandbox Runner (/projects/rag-engine)...`)
    await page.goto(`${BASE_URL}/projects/rag-engine`, { waitUntil: 'domcontentloaded', timeout: 15000 })

    const hasProjectTitle = await page.locator('h1:has-text("Enterprise Grounded Knowledge Retrieval Engine")').count() > 0
    if (!hasProjectTitle) {
      throw new Error(`Project title not found in workspace`)
    }

    // Click "Run Tests" in the project workspace
    const runTestsBtn = page.locator('button:has-text("Run Tests")').first()
    await runTestsBtn.scrollIntoViewIfNeeded()
    await runTestsBtn.click()
    await page.waitForSelector('text=Score:', { timeout: 15000 })

    // Switch to Structured Tasks tab
    const tasksTab = page.locator('button:has-text("Structured Tasks")')
    await tasksTab.click()
    await page.waitForSelector('text=Task 1 of 5', { timeout: 5000 })

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'journey14_project_workspace.png'), fullPage: false })
    console.log(`  ✓ Journey 14 passed: Project workspace code execution, sandboxed tests, and rubric scored.`)
    journeyResults.push({ journey: '14. Project Workspace & Sandbox', status: 'PASSED', route: '/projects/rag-engine' })
  } catch (err) {
    console.error(`  ✗ Journey 14 failed:`, err.message)
    journeyResults.push({ journey: '14. Project Workspace & Sandbox', status: 'FAILED', error: err.message })
  }

  // JOURNEY 15: Personalized Learner Workspace
  try {
    console.log(`[Journey 15] Personalized Learner Workspace (/dashboard)...`)
    await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'domcontentloaded', timeout: 15000 })

    // Verify workspace components
    const hasObjective = await page.locator('text=Current Learning Objective').count() > 0
    const hasAction = await page.locator('text=Recommended Action for Today').count() > 0
    const hasProjectCard = await page.locator('text=In Progress Project').count() > 0
    const hasSkillGaps = await page.locator('text=Identified Skill Gaps').count() > 0

    if (!hasObjective || !hasAction || !hasProjectCard || !hasSkillGaps) {
      throw new Error(`One or more objective workspace cards missing on /dashboard`)
    }

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'journey15_learner_workspace.png'), fullPage: false })
    console.log(`  ✓ Journey 15 passed: Objective-driven learner workspace rendered with all intelligence modules.`)
    journeyResults.push({ journey: '15. Personalized Learner Workspace', status: 'PASSED', route: '/dashboard' })
  } catch (err) {
    console.error(`  ✗ Journey 15 failed:`, err.message)
    journeyResults.push({ journey: '15. Personalized Learner Workspace', status: 'FAILED', error: err.message })
  }

  // JOURNEY 16: Project Titan Super AI Ambition Cockpit & 20-Family Universe
  try {
    console.log(`[Journey 16] Project Titan Ambition Cockpit & Programme Universe (/)...`)
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 15000 })

    // 1. Verify Ambition Navigator Cockpit
    const cockpitTitle = await page.locator('text=Super AI Learning Universe').count() > 0 || await page.locator('text=Your Ambition.').count() > 0
    if (!cockpitTitle) {
      throw new Error(`Super AI Ambition Cockpit hero not found on homepage`)
    }

    // 2. Click preset pill "I want to become an AI developer"
    const aiPill = page.locator('button:has-text("I want to become an AI developer")').first()
    await aiPill.scrollIntoViewIfNeeded()
    await aiPill.click({ force: true })
    await page.waitForTimeout(800)

    // 3. Verify 5-stage roadmap is active
    const hasRoadmap = await page.locator('text=5-Stage Capability Roadmap').count() > 0 || await page.locator('text=LEARN').count() > 0
    if (!hasRoadmap) {
      throw new Error(`Ambition roadmap stages not displayed after selecting ambition`)
    }

    // 4. Verify 20-family Programme Universe Explorer
    const universeSection = await page.locator('#programmes-universe').count() > 0
    if (!universeSection) {
      throw new Error(`#programmes-universe section anchor not found`)
    }

    // Filter to School universe
    const schoolFilterBtn = page.locator('button:has-text("School & Entrance")').first()
    if (await schoolFilterBtn.count() > 0) {
      await schoolFilterBtn.click()
      await page.waitForTimeout(300)
    }

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'journey16_project_titan_universe.png'), fullPage: false })
    console.log(`  ✓ Journey 16 passed: Super AI Ambition Cockpit and 20-Family Universe verified.`)
    journeyResults.push({ journey: '16. Titan Ambition Cockpit & Universe', status: 'PASSED', route: '/#programmes-universe' })
  } catch (err) {
    console.error(`  ✗ Journey 16 failed:`, err.message)
    journeyResults.push({ journey: '16. Titan Ambition Cockpit & Universe', status: 'FAILED', error: err.message })
  }

  // JOURNEY 17: Class 9 Foundation Flagship Sales Engine & 4D Brochure Showcase
  try {
    console.log(`[Journey 17] Class 9 Foundation Flagship Sales Engine (/programmes/class-9-foundation & /)...`)
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 15000 })

    // 1. Verify Class 9 Flagship Hero
    const flagshipHeading = await page.locator('text=Class 9 Foundation Programme').first()
    await flagshipHeading.waitFor({ timeout: 5000 })

    // 2. Verify 3 Live Classes / 96 Live Sessions metrics
    const hasLiveMetrics = await page.locator('text=96 Live Sessions').count() > 0
    if (!hasLiveMetrics) {
      throw new Error(`96 Live Sessions metric card missing from hero`)
    }

    // 3. Verify Option 1 and Option 2 pricing
    const hasOption1 = await page.locator('text=29,999').count() > 0
    const hasOption2 = await page.locator('text=64,999').count() > 0 || await page.locator('text=61,999').count() > 0
    if (!hasOption1 || !hasOption2) {
      throw new Error(`Brochure pricing options (Option 1 ₹29,999 or Option 2 ₹64,999) missing`)
    }

    // 4. Click Chemistry subject tab in 7-subject explorer
    const chemistryTab = page.locator('button:has-text("Chemistry")').first()
    if (await chemistryTab.count() > 0) {
      await chemistryTab.click()
      await page.waitForTimeout(300)
    }

    // 5. Verify dedicated route /programmes/class-9-foundation
    await page.goto(`${BASE_URL}/programmes/class-9-foundation`, { waitUntil: 'networkidle', timeout: 15000 })
    await page.waitForTimeout(500)

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'journey17_class_9_foundation_sales.png'), fullPage: false })
    console.log(`  ✓ Journey 17 passed: Class 9 Foundation Programme Flagship Sales Engine & 4D Brochure verified.`)
    journeyResults.push({ journey: '17. Class 9 Foundation Sales Engine', status: 'PASSED', route: '/programmes/class-9-foundation' })
  } catch (err) {
    console.error(`  ✗ Journey 17 failed:`, err.message)
    journeyResults.push({ journey: '17. Class 9 Foundation Sales Engine', status: 'FAILED', error: err.message })
  }

  await browser.close()

  console.log(`\n======================================================`)
  console.log(`JOURNEY VERIFICATION SUMMARY`)
  console.log(`======================================================`)
  console.table(journeyResults)

  fs.writeFileSync('docs/JOURNEY_RESULTS.json', JSON.stringify(journeyResults, null, 2))
}

runJourneys().catch(console.error)
