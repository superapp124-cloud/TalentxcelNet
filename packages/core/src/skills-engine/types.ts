import type { DifficultyLevel } from '../types'

export type SkillStage = 'junior' | 'middle' | 'secondary' | 'senior'

export type LifeSkillStage =
  | 'foundation_guided' // Classes 4–5: Foundation and guided practice
  | 'developing_independence' // Classes 6–7: Developing independence and decision-making
  | 'applied_responsibility' // Classes 8–9: Applied responsibility, complex scenarios, greater independence

export type LifeSkillCategory =
  | 'life_independence'
  | 'life_communication'
  | 'life_money_management'
  | 'life_safety_health'
  | 'life_critical_thinking'
  | 'life_social_teamwork'
  | 'life_study_skills'
  | 'life_citizenship_community'

export interface LifeSkillWorkedExample {
  title: string
  scenario: string
  steps: string[]
  takeaway: string
}

export interface LifeSkillPracticalActivity {
  title: string
  instructions: string[]
  safeCheckNote: string
  deliverableDescription: string
}

export interface LifeSkillReflection {
  promptQuestion: string
  guidingPoints: string[]
}

export interface LifeSkillAssessmentOption {
  id: string
  text: string
  isCorrect: boolean
  explanation: string
}

export interface LifeSkillAssessment {
  question: string
  contextScenario: string
  options: LifeSkillAssessmentOption[]
  correctOptionId: string
  reasoningFeedback: string
}

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

export interface ClassSkillTrackMeta {
  id: string
  category: LifeSkillCategory | string
  title: string
  classSpecificTitle: string
  classNumber: number
  stage: SkillStage
  stageLabel: string
  lifeSkillStage: LifeSkillStage
  lifeSkillStageLabel: string
  level: 'foundation' | 'intermediate' | 'advanced'
  description: string
  whyItMatters: string
  realLifeScenario: string
  workedExample: LifeSkillWorkedExample
  practicalActivity: LifeSkillPracticalActivity
  reflectionExercise: LifeSkillReflection
  assessment: LifeSkillAssessment
  iconName: string
  colorTheme: string
  tools: string[]
  learningOutcomes: string[]
  weeklyModules: SkillWeeklyModule[]
  capstoneProject: ClassSkillProject
  reviewStatus: 'verified' | 'active'
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
