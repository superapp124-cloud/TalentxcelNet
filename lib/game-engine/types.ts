// ============================================================================
// TalentXcel Universal Gamified Learning Engine - TypeScript Types
// ============================================================================

export type SubjectCode =
  | 'math'
  | 'science'
  | 'english'
  | 'social_studies'
  | 'coding'
  | 'reasoning'
  | 'general_knowledge'
  | 'hindi'

export type EnvironmentType =
  | 'kingdom'
  | 'laboratory'
  | 'magical_library'
  | 'floating_island'
  | 'cyberpunk'
  | 'cosmic_nebula'
  | 'discovery_map'
  | 'parchment_scroll'

export type InteractiveGadgetType =
  | 'stepping_path'
  | 'cell_organelle_explorer'
  | 'spell_book'
  | 'map_pin_explorer'
  | 'code_runner_terminal'
  | 'cube_rotation_bench'
  | 'monument_viewer'
  | 'parchment_scroll'

export type GameQuestionType =
  | 'mcq'
  | 'solve_unlock'
  | 'experiment_identify'
  | 'word_arena'
  | 'code_debug'
  | 'pattern_cube'
  | 'map_explorer'
  | 'parchment_scroll'

export interface QuestionOption {
  id: string
  label: 'A' | 'B' | 'C' | 'D'
  text: string
  subtext?: string
  badgeColor?: string
  imageUrl?: string
  svgGraphic?: string
}

export interface GameChallenge {
  id: string
  subjectCode: SubjectCode
  chapterSlug: string
  questionOrder: number
  questionType: GameQuestionType
  promptHeader: string // e.g. "Solve the Integer Challenge!", "Identify the Organelle marked '?'", "Complete the sentence:"
  questionText: string
  options: QuestionOption[]
  correctOptionId: string
  marks: number
  hint: string
  socraticClue: string
  explanation: string
  codeSnippet?: string // For coding questions
  diagramData?: {
    type: 'plant_cell' | 'landform_mountain' | 'cube_series' | 'taj_mahal' | 'stepping_stones'
    highlightId?: string
    pinLabel?: string
  }
}

export interface GameChapterConfig {
  slug: string
  title: string
  subjectCode: SubjectCode
  classNumber: number
  gameTitle: string // e.g. "Integer Kingdom", "Cell Explorer", "Time Traveller"
  level: number
  storyline: string
  environmentType: EnvironmentType
  interactiveGadget: InteractiveGadgetType
  accentGradient: string
  primaryHex: string
  bossChallengeName: string
  challenges: GameChallenge[]
}

export interface GameSubjectConfig {
  code: SubjectCode
  title: string
  gameWorldName: string
  icon: string
  accentGradient: string
  primaryHex: string
  secondaryHex: string
  badgeText: string
  avatarName: string
  chapters: GameChapterConfig[]
}

export interface PowerupInventory {
  hint: number
  fiftyFifty: number
  skip: number
  secondChance: number
  doubleXp: number
}

export interface GameSessionState {
  sessionId: string
  subjectCode: SubjectCode
  chapterSlug: string
  currentQuestionIndex: number
  totalQuestions: number
  earnedXp: number
  gems: number
  hearts: number
  maxHearts: number
  currentStreak: number
  maxStreak: number
  selectedOptionId: string | null
  eliminatedOptionIds: string[]
  isSubmitted: boolean
  isCorrect: boolean | null
  showHint: boolean
  showSolution: boolean
  showCodeRunner: boolean
  isCompleted: boolean
  isGameOver: boolean
  startTime: number
  questionStartTime: number
  powerups: PowerupInventory
  answersLog: {
    questionId: string
    isCorrect: boolean
    timeSpentMs: number
    awardedXp: number
  }[]
}
