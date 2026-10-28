import fs from 'fs'
import path from 'path'

// Helper to build a complete curriculum module object with all 8 mandatory sections
export function createCurriculumModule({
  classNumber,
  lifeSkillStage,
  month,
  monthTheme,
  sequenceNumber,
  globalIndex,
  category,
  categoryLabel,
  title,
  whyItMatters,
  learningObjectives,
  prerequisites = ['None'],
  estimatedDuration = '45 minutes (20m lesson + 25m practical activity)',
  materials = ['Notebook', 'Pencil', 'Checklist sheet'],
  safetyGuidance = 'Safe for independent practice at home or school.',
  openingScenario,
  explanation,
  stepByStep,
  workedExample,
  commonMistakes,
  decisionChecklist,
  reflectionPrompt,
  summaryTakeaway,
  heroVisual,
  instructionalVisuals,
  videoContent,
  practicalActivity,
  scenarioPractice,
  assessment,
  rubric,
  reflectionPrompts
}) {
  const modId = `mod_c${classNumber}_m${String(month).padStart(2, '0')}_s${sequenceNumber}`
  return {
    id: modId,
    classNumber,
    lifeSkillStage,
    month,
    monthTheme,
    sequenceNumber,
    globalIndex,
    category,
    categoryLabel,
    title,
    whyItMatters,
    learningObjectives,
    prerequisites,
    estimatedDuration,
    materials,
    safetyGuidance,
    contentVersion: '1.0.0',
    publicationStatus: 'published',

    openingScenario,
    explanation,
    stepByStep,
    workedExample,
    commonMistakes,
    decisionChecklist,
    reflectionPrompt,
    summaryTakeaway,

    heroVisual,
    instructionalVisuals,

    videoContent,
    practicalActivity,
    scenarioPractice,
    assessment,
    rubric,
    reflectionPrompts
  }
}
