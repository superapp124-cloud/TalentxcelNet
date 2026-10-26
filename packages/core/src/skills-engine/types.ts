import type { DifficultyLevel } from '../types'

export type SkillStage = 'junior' | 'middle' | 'secondary' | 'senior'

export interface SkillWeeklyModule {
  weekNumber: number
  title: string
  objective: string
  deliverable: string
}

export interface SkillProjectRubricItem {
  criterion: string
  weightPercentage: number
  masteryDescription: string
}

export interface ClassSkillProject {
  id: string
  trackId: string
  classNumber: number
  title: string
  brief: string
  realWorldContext: string
  deliverables: string[]
  rubricCriteria: SkillProjectRubricItem[]
  estimatedHours: number
  difficulty: DifficultyLevel
  starterCodeOrTemplate?: string
  status: 'verified' | 'active'
}

export interface EasternSkillHeritage {
  tradition: 'japanese' | 'chinese' | 'pan_asian'
  originalName: string // e.g. "そろばん & 暗算 (Soroban & Anzan)", "奥数 (Aoshu Olympiad Math)", "ものづくり (Monozukuri)"
  englishConcept: string
  keyDiscipline: string
  dailyDeliberateDrill: string
  gradeTargetNote: string
}

export interface ClassSkillTrackMeta {
  id: string
  category: string
  title: string
  classSpecificTitle: string
  classNumber: number
  stage: SkillStage
  stageLabel: string
  level: 'foundation' | 'intermediate' | 'advanced'
  description: string
  philosophy: 'japanese_kaizen' | 'chinese_progression' | 'universal_mastery'
  philosophyNote: string
  easternHeritage?: EasternSkillHeritage
  iconName: string
  colorTheme: string
  tools: string[]
  learningOutcomes: string[]
  weeklyModules: SkillWeeklyModule[]
  capstoneProject: ClassSkillProject
}

export interface SkillStudioPlanProduct {
  id: string
  title: string
  period: 'monthly' | 'semester' | 'annual'
  periodLabel: string
  basePriceRupees: number
  tagline: string
  features: string[]
  popular?: boolean
}
