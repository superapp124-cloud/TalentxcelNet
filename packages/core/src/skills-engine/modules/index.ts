import { LifeSkillCurriculumModule } from '../curriculum-types'
import { CLASS_4_MODULES } from './class-4'
import { CLASS_5_MODULES } from './class-5'
import { CLASS_6_MODULES } from './class-6'
import { CLASS_7_MODULES } from './class-7'
import { CLASS_8_MODULES } from './class-8'
import { CLASS_9_MODULES } from './class-9'

export {
  CLASS_4_MODULES,
  CLASS_5_MODULES,
  CLASS_6_MODULES,
  CLASS_7_MODULES,
  CLASS_8_MODULES,
  CLASS_9_MODULES,
}

export const ALL_CURRICULUM_MODULES: LifeSkillCurriculumModule[] = [
  ...CLASS_4_MODULES,
  ...CLASS_5_MODULES,
  ...CLASS_6_MODULES,
  ...CLASS_7_MODULES,
  ...CLASS_8_MODULES,
  ...CLASS_9_MODULES,
]

export function getClassCurriculumModules(classNumber: number): LifeSkillCurriculumModule[] {
  switch (classNumber) {
    case 4:
      return CLASS_4_MODULES
    case 5:
      return CLASS_5_MODULES
    case 6:
      return CLASS_6_MODULES
    case 7:
      return CLASS_7_MODULES
    case 8:
      return CLASS_8_MODULES
    case 9:
      return CLASS_9_MODULES
    default:
      return []
  }
}
