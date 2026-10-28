import { formatModuleTs } from './module-template.mjs'

/**
 * Transforms a topic blueprint into a fully populated, 100% type-safe LifeSkillCurriculumModule.
 */
export function createSubstantiveModule(blueprint, classNum, stage) {
  const mStr = String(blueprint.month).padStart(2, '0')
  const modId = `mod_c${classNum}_m${mStr}_s${blueprint.seq}`
  const globalIdx = (blueprint.month - 1) * 3 + blueprint.seq

  const heroUrl = `/images/skills/modules/c${classNum}/c${classNum}_m${mStr}_s${blueprint.seq}_hero.webp`
  const vis1Url = `/images/skills/modules/c${classNum}/diagrams/c${classNum}_m${mStr}_s${blueprint.seq}_diag1.webp`
  const vis2Url = `/images/skills/modules/c${classNum}/diagrams/c${classNum}_m${mStr}_s${blueprint.seq}_diag2.webp`

  return {
    id: modId,
    classNumber: classNum,
    lifeSkillStage: stage,
    month: blueprint.month,
    monthTheme: blueprint.monthTheme,
    sequenceNumber: blueprint.seq,
    globalIndex: globalIdx,
    category: blueprint.cat,
    categoryLabel: blueprint.catLabel,
    title: blueprint.title,
    whyItMatters: blueprint.why,
    learningObjectives: blueprint.objs,
    prerequisites: blueprint.prereqs || ['None'],
    estimatedDuration: blueprint.duration || '45 minutes (20m lesson + 25m practical activity)',
    materials: blueprint.materials || ['Notebook', 'Pencil', 'Activity Checklist'],
    safetyGuidance: blueprint.safety || 'Safe for home and school practice with basic awareness.',
    contentVersion: '1.0.0',
    publicationStatus: 'published',

    openingScenario: blueprint.scenario,
    explanation: blueprint.expl,
    stepByStep: blueprint.steps,
    workedExample: blueprint.example,
    commonMistakes: blueprint.mistakes,
    decisionChecklist: blueprint.checklist,
    reflectionPrompt: blueprint.prompt,
    summaryTakeaway: blueprint.takeaway,

    heroVisual: {
      url: heroUrl,
      altText: `${blueprint.title} - Step by step life skill demonstration for Class ${classNum}`,
      description: blueprint.heroDesc || `Visual illustration teaching ${blueprint.title.toLowerCase()}.`,
      attribution: 'TalentXcel Practical Life-Skills Studio',
      status: 'ready'
    },
    instructionalVisuals: [
      {
        id: `vis_c${classNum}_${mStr}_${blueprint.seq}_a`,
        title: blueprint.vis1?.title || 'Key Steps Breakdown',
        diagramType: blueprint.vis1?.diagramType || 'infographic',
        url: vis1Url,
        altText: blueprint.vis1?.title || 'Instructional diagram',
        caption: blueprint.vis1?.caption || 'Follow these step-by-step actions in order.',
        status: 'ready'
      },
      {
        id: `vis_c${classNum}_${mStr}_${blueprint.seq}_b`,
        title: blueprint.vis2?.title || 'Practical Decision Checklist',
        diagramType: blueprint.vis2?.diagramType || 'checklist',
        url: vis2Url,
        altText: blueprint.vis2?.title || 'Practical checklist',
        caption: blueprint.vis2?.caption || 'Verify each step before completing.',
        status: 'ready'
      }
    ],

    videoContent: {
      videoTitle: blueprint.videoTitle || `How to: ${blueprint.title}`,
      duration: blueprint.videoDuration || '3 mins 15 secs',
      videoUrl: null, // Honest pending state: videos are in storyboard production
      status: 'storyboard_ready',
      storyboardBrief: blueprint.scenes.map((s, idx) => ({
        scene: idx + 1,
        visualDescription: s.visual,
        narrationTranscript: s.narration
      })),
      practicalChallengeRecap: blueprint.recap || `Practice the core steps of ${blueprint.title.toLowerCase()} today.`
    },

    practicalActivity: {
      title: blueprint.act.title,
      objective: blueprint.act.obj,
      materials: blueprint.act.mats || ['Notebook', 'Writing tool'],
      procedure: blueprint.act.steps,
      expectedOutput: blueprint.act.output,
      completionChecklist: blueprint.act.checklist || [
        'Reviewed instructions before starting',
        'Executed each step with care',
        'Recorded result in notebook',
        'Shared reflection with caregiver or peer'
      ],
      safetyPrecautions: blueprint.act.precautions || 'Ensure safe handling of materials and ask for adult assistance if needed.',
      alternativeActivity: blueprint.act.alt || 'Observe a family member or discuss the steps aloud if physical materials are unavailable.'
    },

    scenarioPractice: {
      guidedScenario: {
        context: blueprint.scenarioGuided.context,
        choiceOptions: [
          {
            option: blueprint.scenarioGuided.optimal,
            isOptimal: true,
            reason: blueprint.scenarioGuided.optReason
          },
          {
            option: blueprint.scenarioGuided.nonOpt1,
            isOptimal: false,
            reason: blueprint.scenarioGuided.nonOptReason1
          },
          {
            option: blueprint.scenarioGuided.nonOpt2,
            isOptimal: false,
            reason: blueprint.scenarioGuided.nonOptReason2
          }
        ],
        keyTakeaway: blueprint.scenarioGuided.takeaway
      },
      independentScenario: {
        context: blueprint.scenarioIndep.context,
        challengePrompt: blueprint.scenarioIndep.prompt,
        selfEvaluationRubric: blueprint.scenarioIndep.rubric
      }
    },

    assessment: {
      question: blueprint.quiz.q,
      contextScenario: blueprint.quiz.context,
      options: [
        {
          id: 'opt_1',
          text: blueprint.quiz.optCorrect,
          isCorrect: true,
          feedback: `Correct! ${blueprint.quiz.optCorrect}`
        },
        {
          id: 'opt_2',
          text: blueprint.quiz.optWrong1,
          isCorrect: false,
          feedback: 'This is not the optimal choice. Review the practical steps in the lesson.'
        },
        {
          id: 'opt_3',
          text: blueprint.quiz.optWrong2,
          isCorrect: false,
          feedback: 'This approach does not solve the underlying challenge safely or effectively.'
        },
        {
          id: 'opt_4',
          text: blueprint.quiz.optWrong3,
          isCorrect: false,
          feedback: 'Avoid this option; it creates confusion or avoidable risks.'
        }
      ],
      correctOptionId: 'opt_1',
      remediationActivity: blueprint.quiz.remediation || `Re-read the step-by-step instructions for ${blueprint.title}.`
    },

    rubric: {
      performanceTask: blueprint.rubric.task,
      masteryCriteria: blueprint.rubric.mastery,
      criteria: [
        {
          criterion: blueprint.rubric.crit1.name,
          weightPercentage: blueprint.rubric.crit1.weight || 40,
          emerging: blueprint.rubric.crit1.emerging,
          developing: blueprint.rubric.crit1.developing,
          proficient: blueprint.rubric.crit1.proficient,
          exemplary: blueprint.rubric.crit1.exemplary
        },
        {
          criterion: blueprint.rubric.crit2.name,
          weightPercentage: blueprint.rubric.crit2.weight || 35,
          emerging: blueprint.rubric.crit2.emerging,
          developing: blueprint.rubric.crit2.developing,
          proficient: blueprint.rubric.crit2.proficient,
          exemplary: blueprint.rubric.crit2.exemplary
        },
        {
          criterion: blueprint.rubric.crit3.name,
          weightPercentage: blueprint.rubric.crit3.weight || 25,
          emerging: blueprint.rubric.crit3.emerging,
          developing: blueprint.rubric.crit3.developing,
          proficient: blueprint.rubric.crit3.proficient,
          exemplary: blueprint.rubric.crit3.exemplary
        }
      ]
    },

    reflectionPrompts: (blueprint.refs || [
      `What was the most challenging part of learning ${blueprint.title.toLowerCase()}?`,
      'How does this practical life skill help you in everyday situations?',
      'Who in your family or school can you teach this skill to?',
      'How will you continue practicing this skill over the coming weeks?'
    ]).map((prompt, i) => ({
      id: `ref_${i + 1}`,
      prompt
    }))
  }
}
