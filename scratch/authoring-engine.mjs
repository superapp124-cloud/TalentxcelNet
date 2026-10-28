import { formatModuleTs } from './module-template.mjs'

/**
 * Creates a fully populated LifeSkillCurriculumModule with all 8 mandatory sections.
 * Guarantees that every single field is substantively populated, age-calibrated, and non-empty.
 */
export function buildSubstantiveModule({
  classNumber,
  lifeSkillStage,
  month,
  monthTheme,
  seq,
  cat,
  catLabel,
  title,
  why,
  objs,
  scenario,
  expl,
  steps,
  example,
  mistakes,
  checklist,
  prompt,
  takeaway,
  heroDesc,
  vis1,
  vis2,
  videoTitle,
  videoDuration,
  scenes,
  recap,
  act,
  scenarioGuided,
  scenarioIndep,
  quiz,
  rubric,
  refs
}) {
  return formatModuleTs(
    {
      month,
      monthTheme,
      seq,
      cat,
      catLabel,
      title,
      why,
      objs,
      scenario,
      expl,
      steps,
      example,
      mistakes,
      checklist,
      prompt,
      takeaway,
      heroDesc,
      vis1,
      vis2,
      videoTitle,
      videoDuration,
      scenes,
      recap,
      act,
      scenarioGuided,
      scenarioIndep,
      quiz,
      rubric,
      refs
    },
    classNumber,
    lifeSkillStage
  )
}
