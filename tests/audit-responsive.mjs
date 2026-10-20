import { chromium } from 'playwright'

const viewports = [
  { name: 'galaxy_360', width: 360, height: 740 },
  { name: 'iphone_375', width: 375, height: 667 },
  { name: 'user_400', width: 400, height: 853 },
  { name: 'iphone_pro_430', width: 430, height: 932 },
  { name: 'tablet_768', width: 768, height: 1024 },
  { name: 'laptop_1366', width: 1366, height: 768 },
]

async function runAudit() {
  const browser = await chromium.launch()
  let allClean = true

  console.log('======================================================')
  console.log('📱 MULTI-VIEWPORT RESPONSIVE AUDIT')
  console.log('Target: http://localhost:3000')
  console.log('======================================================')

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } })
    const consoleErrors = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text())
    })
    page.on('pageerror', (err) => consoleErrors.push(err.message))

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const innerWidth = await page.evaluate(() => window.innerWidth)
    const isOverflowing = scrollWidth > innerWidth

    console.log(
      `Viewport [${vp.name.padEnd(14)}] ${vp.width}x${vp.height} -> scrollWidth: ${scrollWidth}, innerWidth: ${innerWidth} | Overflow: ${
        isOverflowing ? '❌ YES' : '✅ NO'
      }`
    )

    if (consoleErrors.length > 0) {
      console.log(`  Console errors on [${vp.name}]:`, consoleErrors.slice(0, 3))
    }

    if (isOverflowing) allClean = false

    await page.screenshot({ path: `docs/qa-screenshots/responsive_${vp.name}.png`, fullPage: false })
    await page.close()
  }

  await browser.close()
  console.log('======================================================')
  console.log('RESPONSIVE AUDIT RESULT:', allClean ? 'ALL VIEWPORTS 100% RESPONSIVE ✅' : 'OVERFLOW DETECTED ❌')
  console.log('======================================================')

  if (!allClean) process.exit(1)
}

runAudit().catch((err) => {
  console.error('Audit failed with error:', err)
  process.exit(1)
})
