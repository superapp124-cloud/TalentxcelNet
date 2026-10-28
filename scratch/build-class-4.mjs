import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { C4_TOPICS_CATALOG } from './topics-c4.mjs'
import { C4_MONTHS_7_12 } from './curriculum-data-c4-months7-12.mjs'
import { formatModuleTs } from './module-template.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('Assembling Class 4 curriculum (36 modules)...')

const combinedC4 = [...C4_TOPICS_CATALOG, ...C4_MONTHS_7_12]

if (combinedC4.length !== 36) {
  throw new Error(`Expected 36 modules for Class 4, but found ${combinedC4.length}`)
}

const c4Modules = combinedC4.map((t, idx) => {
  // Ensure global index is 1..36
  t.globalIdx = idx + 1
  return formatModuleTs(t, 4, 'foundation_guided')
})

const targetPath = path.resolve(__dirname, '../packages/core/src/skills-engine/modules/class-4.ts')

const code = `import type { LifeSkillCurriculumModule } from '../curriculum-types'

/**
 * CLASS 4: Foundation (Ages 9-10)
 * 36 Unique Practical Life-Skills Modules
 * 12 Monthly Units x 3 Modules per Month
 */
export const CLASS_4_MODULES: LifeSkillCurriculumModule[] = ${JSON.stringify(c4Modules, null, 2)}
`

fs.writeFileSync(targetPath, code, 'utf8')
console.log(`Successfully generated ${targetPath} with ${c4Modules.length} modules!`)
