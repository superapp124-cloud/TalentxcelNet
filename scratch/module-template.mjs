export function formatModuleTs(def, classNum, stage) {
  const mStr = String(def.month).padStart(2, '0')
  const modId = `mod_c${classNum}_m${mStr}_s${def.seq}`
  const globalIdx = (def.month - 1) * 3 + def.seq

  const heroUrl = `/images/skills/modules/c${classNum}/c${classNum}_m${mStr}_s${def.seq}_hero.webp`
  const vis1Url = `/images/skills/modules/c${classNum}/diagrams/c${classNum}_m${mStr}_s${def.seq}_diag1.webp`
  const vis2Url = `/images/skills/modules/c${classNum}/diagrams/c${classNum}_m${mStr}_s${def.seq}_diag2.webp`

  return {
    id: modId,
    classNumber: classNum,
    lifeSkillStage: stage,
    month: def.month,
    monthTheme: def.monthTheme,
    sequenceNumber: def.seq,
    globalIndex: globalIdx,
    category: def.cat,
    categoryLabel: def.catLabel,
    title: def.title,
    whyItMatters: def.why,
    learningObjectives: def.objs,
    prerequisites: def.prereqs || ['None'],
    estimatedDuration: def.duration || '45 minutes (20m lesson + 25m practical activity)',
    materials: def.materials || ['Notebook', 'Pencil', 'Activity Checklist'],
    safetyGuidance: def.safety || 'Safe for home and school practice with basic adult awareness.',
    contentVersion: '1.0.0',
    publicationStatus: 'published',

    openingScenario: def.scenario,
    explanation: def.expl,
    stepByStep: def.steps,
    workedExample: def.example,
    commonMistakes: def.mistakes,
    decisionChecklist: def.checklist,
    reflectionPrompt: def.prompt,
    summaryTakeaway: def.takeaway,

    heroVisual: {
      url: heroUrl,
      altText: `${def.title} - Step by step life skill demonstration for Class ${classNum}`,
      description: def.heroDesc || `Visual illustration teaching ${def.title.toLowerCase()}.`,
      attribution: 'TalentXcel Practical Life-Skills Studio',
      status: 'ready'
    },
    instructionalVisuals: [
      {
        id: `vis_c${classNum}_${mStr}_${def.seq}_a`,
        title: def.vis1?.title || 'Key Steps Breakdown',
        diagramType: 'infographic',
        url: vis1Url,
        altText: def.vis1?.title || 'Instructional diagram',
        caption: def.vis1?.caption || 'Follow these step-by-step actions in order.',
        status: 'ready'
      },
      {
        id: `vis_c${classNum}_${mStr}_${def.seq}_b`,
        title: def.vis2?.title || 'Practical Decision Checklist',
        diagramType: 'checklist',
        url: vis2Url,
        altText: def.vis2?.title || 'Practical checklist',
        caption: def.vis2?.caption || 'Verify each step before completing.',
        status: 'ready'
      }
    ],

    videoContent: {
      videoTitle: def.videoTitle || `How to: ${def.title}`,
      duration: def.videoDuration || '3 mins 30 secs',
      videoUrl: null, // Honest pending state: videos are in storyboard production
      status: 'storyboard_ready',
      storyboardBrief: def.scenes.map((s, idx) => ({
        scene: idx + 1,
        visualDescription: s.visual,
        narrationTranscript: s.narration
      })),
      practicalChallengeRecap: def.recap || `Practice the core steps of ${def.title.toLowerCase()} today.`
    },

    practicalActivity: {
      title: def.act.title,
      objective: def.act.obj,
      materials: def.act.mats || ['Notebook', 'Writing tool'],
      procedure: def.act.steps,
      expectedOutput: def.act.output,
      completionChecklist: def.act.checklist || [
        'Reviewed instructions before starting',
        'Executed each step with care',
        'Recorded result in notebook',
        'Shared reflection with caregiver or peer'
      ],
      safetyPrecautions: def.act.precautions || 'Ensure safe handling of materials and ask for adult assistance if needed.',
      alternativeActivity: def.act.alt || 'Observe a family member or discuss the steps aloud if physical materials are unavailable.'
    },

    scenarioPractice: {
      guidedScenario: {
        context: def.scenarioGuided.context,
        choiceOptions: [
          {
            option: def.scenarioGuided.optimal,
            isOptimal: true,
            reason: def.scenarioGuided.optReason
          },
          {
            option: def.scenarioGuided.nonOpt1,
            isOptimal: false,
            reason: def.scenarioGuided.nonOptReason1
          },
          {
            option: def.scenarioGuided.nonOpt2,
            isOptimal: false,
            reason: def.scenarioGuided.nonOptReason2
          }
        ],
        keyTakeaway: def.scenarioGuided.takeaway
      },
      independentScenario: {
        context: def.scenarioIndep.context,
        challengePrompt: def.scenarioIndep.prompt,
        selfEvaluationRubric: def.scenarioIndep.rubric
      }
    },

    assessment: {
      question: def.quiz.q,
      contextScenario: def.quiz.context,
      options: [
        {
          id: 'opt_1',
          text: def.quiz.optCorrect,
          isCorrect: true,
          feedback: `Correct! ${def.quiz.optCorrect}`
        },
        {
          id: 'opt_2',
          text: def.quiz.optWrong1,
          isCorrect: false,
          feedback: 'This is not the optimal choice. Review the practical steps in the lesson.'
        },
        {
          id: 'opt_3',
          text: def.quiz.optWrong2,
          isCorrect: false,
          feedback: 'This approach does not solve the underlying challenge safely or effectively.'
        },
        {
          id: 'opt_4',
          text: def.quiz.optWrong3,
          isCorrect: false,
          feedback: 'Avoid this option; it creates confusion or avoidable risks.'
        }
      ],
      correctOptionId: 'opt_1',
      remediationActivity: def.quiz.remediation || `Re-read the step-by-step instructions for ${def.title}.`
    },

    rubric: {
      performanceTask: def.rubric.task,
      masteryCriteria: def.rubric.mastery,
      criteria: [
        {
          criterion: def.rubric.crit1.name,
          weightPercentage: def.rubric.crit1.weight || 40,
          emerging: def.rubric.crit1.emerging,
          developing: def.rubric.crit1.developing,
          proficient: def.rubric.crit1.proficient,
          exemplary: def.rubric.crit1.exemplary
        },
        {
          criterion: def.rubric.crit2.name,
          weightPercentage: def.rubric.crit2.weight || 35,
          emerging: def.rubric.crit2.emerging,
          developing: def.rubric.crit2.developing,
          proficient: def.rubric.crit2.proficient,
          exemplary: def.rubric.crit2.exemplary
        },
        {
          criterion: def.rubric.crit3.name,
          weightPercentage: def.rubric.crit3.weight || 25,
          emerging: def.rubric.crit3.emerging,
          developing: def.rubric.crit3.developing,
          proficient: def.rubric.crit3.proficient,
          exemplary: def.rubric.crit3.exemplary
        }
      ]
    },

    reflectionPrompts: def.refs.map((prompt, i) => ({
      id: `ref_${i + 1}`,
      prompt
    }))
  }
}
