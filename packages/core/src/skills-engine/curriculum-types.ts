import type { LifeSkillCategory, LifeSkillStage } from './types'

export type ModulePublicationStatus =
  | 'draft'
  | 'editorial_review'
  | 'approved'
  | 'published'

export type MediaAssetStatus = 'ready' | 'pending' | 'in_production'

export interface VisualAsset {
  id: string
  title: string
  diagramType: 'infographic' | 'checklist' | 'process_flow' | 'annotated_example' | 'decision_tree'
  url: string
  altText: string
  caption: string
  status: MediaAssetStatus
}

export interface HeroVisualAsset {
  url: string
  altText: string
  description: string
  attribution: string
  status: MediaAssetStatus
}

export interface VideoStoryboardScene {
  scene: number
  visualDescription: string
  narrationTranscript: string
}

export interface ModuleVideoContent {
  videoTitle: string
  duration: string
  videoUrl: string | null
  status: 'available' | 'in_production' | 'storyboard_ready'
  storyboardBrief: VideoStoryboardScene[]
  practicalChallengeRecap: string
}

export interface ModuleWorkedExample {
  title: string
  scenario: string
  steps: string[]
  takeaway: string
}

export interface ModuleCommonMistake {
  mistake: string
  correction: string
}

export interface ModulePracticalActivity {
  title: string
  objective: string
  materials: string[]
  procedure: string[]
  expectedOutput: string
  completionChecklist: string[]
  safetyPrecautions: string
  alternativeActivity: string
}

export interface ScenarioChoiceOption {
  option: string
  isOptimal: boolean
  reason: string
}

export interface ModuleScenarioPractice {
  guidedScenario: {
    context: string
    choiceOptions: ScenarioChoiceOption[]
    keyTakeaway: string
  }
  independentScenario: {
    context: string
    challengePrompt: string
    selfEvaluationRubric: string
  }
}

export interface AssessmentOption {
  id: string
  text: string
  isCorrect: boolean
  feedback: string
}

export interface ModuleAssessment {
  question: string
  contextScenario: string
  options: AssessmentOption[]
  correctOptionId: string
  remediationActivity: string
}

export interface RubricCriterion {
  criterion: string
  weightPercentage: number
  emerging: string
  developing: string
  proficient: string
  exemplary: string
}

export interface ModuleRubric {
  performanceTask: string
  masteryCriteria: string
  criteria: RubricCriterion[]
}

export interface ModuleReflectionPrompt {
  id: string
  prompt: string
}

export interface LifeSkillCurriculumModule {
  id: string
  classNumber: 4 | 5 | 6 | 7 | 8 | 9
  lifeSkillStage: LifeSkillStage
  month: number // 1 to 12
  monthTheme: string
  sequenceNumber: 1 | 2 | 3 // sequence within the month
  globalIndex: number // 1 to 36 within class
  category: LifeSkillCategory
  categoryLabel: string
  title: string
  whyItMatters: string
  learningObjectives: string[] // 3 to 5 objectives
  prerequisites: string[]
  estimatedDuration: string
  materials: string[]
  safetyGuidance: string
  contentVersion: string
  publicationStatus: ModulePublicationStatus

  // B. Substantive Lesson Content
  openingScenario: string
  explanation: string
  stepByStep: string[]
  workedExample: ModuleWorkedExample
  commonMistakes: ModuleCommonMistake[]
  decisionChecklist: string[]
  reflectionPrompt: string
  summaryTakeaway: string

  // C. Image and Visual Content
  heroVisual: HeroVisualAsset
  instructionalVisuals: VisualAsset[]

  // D. Instructional Video Content
  videoContent: ModuleVideoContent

  // E. Practical Activity
  practicalActivity: ModulePracticalActivity

  // F. Scenario Practice
  scenarioPractice: ModuleScenarioPractice

  // G. Assessment and Rubric
  assessment: ModuleAssessment
  rubric: ModuleRubric

  // H. Learner Reflection Prompts
  reflectionPrompts: ModuleReflectionPrompt[]
}

export interface MonthlyUnit {
  month: number
  monthName: string
  academicMonthLabel: string // e.g. "April", "May", or "Month 1"
  theme: string
  themeDescription: string
  monthlyChallenge: string
  modules: LifeSkillCurriculumModule[]
}

export interface ClassCurriculum {
  classNumber: 4 | 5 | 6 | 7 | 8 | 9
  classTitle: string
  developmentalFocus: string
  totalModules: number
  monthlyUnits: MonthlyUnit[]
  domainDistribution: Record<LifeSkillCategory, number>
}

export interface CurriculumAuditReport {
  totalModulesTarget: 216
  totalModulesAuthored: number
  totalPublished: number
  totalApproved: number
  totalInReview: number
  classesCount: 6
  modulesPerClass: Record<number, number>
  uniquenessPassed: boolean
  duplicateTitlesFound: string[]
  duplicateObjectivesFound: string[]
  duplicateScenariosFound: string[]
  domainCoverage: Record<LifeSkillCategory, number>
  videoStatusBreakdown: {
    available: number
    inProduction: number
    storyboardReady: number
  }
  visualAssetsBreakdown: {
    ready: number
    pending: number
  }
}
