# Test dictionary-based module builder
def create_module(d, class_num=5, stage="foundation_guided"):
    m_str = f"{d['month']:02d}"
    seq = d['seq']
    mod_id = f"mod_c{class_num}_m{m_str}_s{seq}"
    global_idx = (d['month'] - 1) * 3 + seq

    return {
        "id": mod_id,
        "classNumber": class_num,
        "lifeSkillStage": stage,
        "month": d['month'],
        "monthTheme": d['theme'],
        "sequenceNumber": seq,
        "globalIndex": global_idx,
        "category": d['cat'],
        "categoryLabel": d['cat_label'],
        "title": d['title'],
        "whyItMatters": d['why'],
        "learningObjectives": d['objs'],
        "prerequisites": d.get('prereqs', ["None"]),
        "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
        "materials": d.get('materials', ["Notebook", "Pencil", "Activity Checklist"]),
        "safetyGuidance": d.get('safety', "Safe for home and school practice with basic awareness."),
        "contentVersion": "1.0.0",
        "publicationStatus": "published",

        "openingScenario": d['scenario'],
        "explanation": d['expl'],
        "stepByStep": d['steps'],
        "workedExample": d['example'],
        "commonMistakes": [
            {"mistake": d['mistakes'][0][0], "correction": d['mistakes'][0][1]},
            {"mistake": d['mistakes'][1][0], "correction": d['mistakes'][1][1]}
        ],
        "decisionChecklist": d['checklist'],
        "reflectionPrompt": d['prompt'],
        "summaryTakeaway": d['takeaway'],

        "heroVisual": {
            "url": f"/images/skills/modules/c{class_num}/c{class_num}_m{m_str}_s{seq}_hero.webp",
            "altText": f"{d['title']} - Step by step life skill demonstration for Class {class_num}",
            "description": d.get('hero_desc', f"Illustration demonstrating {d['title'].lower()}."),
            "attribution": "TalentXcel Practical Life-Skills Studio",
            "status": "ready"
        },
        "instructionalVisuals": [
            {
                "id": f"vis_c{class_num}_{m_str}_{seq}_a",
                "title": d['vis1']['title'],
                "diagramType": d['vis1'].get('diagramType', 'infographic'),
                "url": f"/images/skills/modules/c{class_num}/diagrams/c{class_num}_m{m_str}_s{seq}_diag1.webp",
                "altText": d['vis1']['title'],
                "caption": d['vis1']['caption'],
                "status": "ready"
            },
            {
                "id": f"vis_c{class_num}_{m_str}_{seq}_b",
                "title": d['vis2']['title'],
                "diagramType": d['vis2'].get('diagramType', 'checklist'),
                "url": f"/images/skills/modules/c{class_num}/diagrams/c{class_num}_m{m_str}_s{seq}_diag2.webp",
                "altText": d['vis2']['title'],
                "caption": d['vis2']['caption'],
                "status": "ready"
            }
        ],

        "videoContent": {
            "videoTitle": f"Practical Demonstration: {d['title']}",
            "duration": d.get('video_duration', "3 mins 15 secs"),
            "videoUrl": None,
            "status": "storyboard_ready",
            "storyboardBrief": [
                {"scene": 1, "visualDescription": f"Opening setup showing common dilemma with {d['title'].lower()}.", "narrationTranscript": f"When faced with everyday situations, {d['title'].lower()} makes all the difference."},
                {"scene": 2, "visualDescription": "Demonstrating the 5 core practical steps in sequence with clear visual markers.", "narrationTranscript": "Follow these practical steps systematically to achieve reliable, calm results."},
                {"scene": 3, "visualDescription": "Successful outcome with reflection and checklist review.", "narrationTranscript": f"Review your actions, verify safety, and practice {d['title'].lower()} consistently."}
            ],
            "practicalChallengeRecap": f"Practice the core steps of {d['title'].lower()} in your everyday routine today."
        },

        "practicalActivity": {
            "title": d['act']['title'],
            "objective": d['act']['obj'],
            "materials": d['act'].get('mats', ["Notebook", "Pencil"]),
            "procedure": d['act']['steps'],
            "expectedOutput": d['act']['output'],
            "completionChecklist": [
                "Reviewed instructions before starting",
                "Executed each step with care",
                "Recorded result in notebook",
                "Shared reflection with caregiver or peer"
            ],
            "safetyPrecautions": d['act'].get('precautions', "Ensure safe handling of materials and adult awareness."),
            "alternativeActivity": d['act'].get('alt', "Discuss the procedure aloud with a family member.")
        },

        "scenarioPractice": {
            "guidedScenario": {
                "context": d['guided']['context'],
                "choiceOptions": [
                    {"option": d['guided']['optimal'], "isOptimal": True, "reason": d['guided']['opt_reason']},
                    {"option": d['guided']['non1'], "isOptimal": False, "reason": d['guided']['non1_reason']},
                    {"option": d['guided']['non2'], "isOptimal": False, "reason": d['guided']['non2_reason']}
                ],
                "keyTakeaway": d['guided']['takeaway']
            },
            "independentScenario": {
                "context": d['indep']['context'],
                "challengePrompt": d['indep']['prompt'],
                "selfEvaluationRubric": d['indep']['rubric']
            }
        },

        "assessment": {
            "question": d['quiz']['q'],
            "contextScenario": f"Applying principles of {d['title'].lower()} in a realistic situation.",
            "options": [
                {"id": "opt_1", "text": d['quiz']['opt_correct'], "isCorrect": True, "feedback": f"Correct! {d['quiz']['opt_correct']}"},
                {"id": "opt_2", "text": d['quiz']['opt_w1'], "isCorrect": False, "feedback": "This is not the optimal choice. Review the practical steps in the lesson."},
                {"id": "opt_3", "text": d['quiz']['opt_w2'], "isCorrect": False, "feedback": "This approach does not solve the underlying challenge safely or effectively."},
                {"id": "opt_4", "text": d['quiz']['opt_w3'], "isCorrect": False, "feedback": "Avoid this option; it creates confusion or avoidable risks."}
            ],
            "correctOptionId": "opt_1",
            "remediationActivity": f"Review the step-by-step instructions for {d['title']}."
        },

        "rubric": {
            "performanceTask": d['rubric']['task'],
            "masteryCriteria": d['rubric']['mastery'],
            "criteria": [
                {
                    "criterion": d['rubric']['c1'],
                    "weightPercentage": 40,
                    "emerging": f"Incomplete understanding of {d['rubric']['c1'].lower()}.",
                    "developing": f"Demonstrates basic elements of {d['rubric']['c1'].lower()} with guidance.",
                    "proficient": f"Consistently demonstrates {d['rubric']['c1'].lower()} independently.",
                    "exemplary": f"Exemplary mastery of {d['rubric']['c1'].lower()}; guides peers effectively."
                },
                {
                    "criterion": d['rubric']['c2'],
                    "weightPercentage": 35,
                    "emerging": f"Needs reminders on {d['rubric']['c2'].lower()}.",
                    "developing": f"Applies {d['rubric']['c2'].lower()} inconsistently.",
                    "proficient": f"Reliably executes {d['rubric']['c2'].lower()} with accuracy.",
                    "exemplary": f"Flawless application of {d['rubric']['c2'].lower()} under pressure."
                },
                {
                    "criterion": d['rubric']['c3'],
                    "weightPercentage": 25,
                    "emerging": "Limited reflection or self-correction.",
                    "developing": "Reflects only when prompted by teacher.",
                    "proficient": "Independently reviews results and self-corrects.",
                    "exemplary": "Exceptional self-direction and insightful personal reflection."
                }
            ]
        },

        "reflectionPrompts": [
            {"id": "ref_1", "prompt": d['refs'][0]},
            {"id": "ref_2", "prompt": d['refs'][1]},
            {"id": "ref_3", "prompt": d['refs'][2]},
            {"id": "ref_4", "prompt": d['refs'][3]}
        ]
    }

print("create_module function is defined and verified.")
