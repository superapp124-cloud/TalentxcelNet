import json
import os

print("Assembling Class 5 curriculum...")

# Template helper function that creates a fully populated module dictionary
def make_c5_module(
    month, theme, seq, cat, cat_label, title, why, objs,
    scenario, expl, steps, ex_title, ex_scen, ex_steps, ex_takeaway,
    mistakes, checklist, prompt, takeaway, hero_desc,
    vis1_title, vis1_caption, vis2_title, vis2_caption,
    video_title, video_duration, scenes, recap,
    act_title, act_obj, act_mats, act_steps, act_output, act_precaution, act_alt,
    guided_context, guided_opt, guided_opt_reason, guided_non1, guided_non1_reason, guided_non2, guided_non2_reason, guided_takeaway,
    indep_context, indep_prompt, indep_rubric,
    quiz_q, quiz_context, quiz_opt_correct, quiz_opt_w1, quiz_opt_w2, quiz_opt_w3, quiz_remediation,
    rubric_task, rubric_mastery,
    c1_name, c1_em, c1_dev, c1_prof, c1_ex,
    c2_name, c2_em, c2_dev, c2_prof, c2_ex,
    c3_name, c3_em, c3_dev, c3_prof, c3_ex,
    ref1, ref2, ref3, ref4
):
    m_str = f"{month:02d}"
    mod_id = f"mod_c5_m{m_str}_s{seq}"
    global_idx = (month - 1) * 3 + seq

    return {
        "id": mod_id,
        "classNumber": 5,
        "lifeSkillStage": "foundation_guided",
        "month": month,
        "monthTheme": theme,
        "sequenceNumber": seq,
        "globalIndex": global_idx,
        "category": cat,
        "categoryLabel": cat_label,
        "title": title,
        "whyItMatters": why,
        "learningObjectives": objs,
        "prerequisites": ["None"],
        "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
        "materials": ["Notebook", "Pencil", "Activity Checklist"],
        "safetyGuidance": "Safe for home and school practice with basic awareness.",
        "contentVersion": "1.0.0",
        "publicationStatus": "published",

        "openingScenario": scenario,
        "explanation": expl,
        "stepByStep": steps,
        "workedExample": {
            "title": ex_title,
            "scenario": ex_scen,
            "steps": ex_steps,
            "takeaway": ex_takeaway
        },
        "commonMistakes": [
            {"mistake": mistakes[0][0], "correction": mistakes[0][1]},
            {"mistake": mistakes[1][0], "correction": mistakes[1][1]}
        ],
        "decisionChecklist": checklist,
        "reflectionPrompt": prompt,
        "summaryTakeaway": takeaway,

        "heroVisual": {
            "url": f"/images/skills/modules/c5/c5_m{m_str}_s{seq}_hero.webp",
            "altText": f"{title} - Step by step life skill demonstration for Class 5",
            "description": hero_desc,
            "attribution": "TalentXcel Practical Life-Skills Studio",
            "status": "ready"
        },
        "instructionalVisuals": [
            {
                "id": f"vis_c5_{m_str}_{seq}_a",
                "title": vis1_title,
                "diagramType": "infographic",
                "url": f"/images/skills/modules/c5/diagrams/c5_m{m_str}_s{seq}_diag1.webp",
                "altText": vis1_title,
                "caption": vis1_caption,
                "status": "ready"
            },
            {
                "id": f"vis_c5_{m_str}_{seq}_b",
                "title": vis2_title,
                "diagramType": "checklist",
                "url": f"/images/skills/modules/c5/diagrams/c5_m{m_str}_s{seq}_diag2.webp",
                "altText": vis2_title,
                "caption": vis2_caption,
                "status": "ready"
            }
        ],

        "videoContent": {
            "videoTitle": video_title,
            "duration": video_duration,
            "videoUrl": None,
            "status": "storyboard_ready",
            "storyboardBrief": [
                {"scene": idx + 1, "visualDescription": s[0], "narrationTranscript": s[1]}
                for idx, s in enumerate(scenes)
            ],
            "practicalChallengeRecap": recap
        },

        "practicalActivity": {
            "title": act_title,
            "objective": act_obj,
            "materials": act_mats,
            "procedure": act_steps,
            "expectedOutput": act_output,
            "completionChecklist": [
                "Reviewed instructions before starting",
                "Executed each step with care",
                "Recorded result in notebook",
                "Shared reflection with caregiver or peer"
            ],
            "safetyPrecautions": act_precaution,
            "alternativeActivity": act_alt
        },

        "scenarioPractice": {
            "guidedScenario": {
                "context": guided_context,
                "choiceOptions": [
                    {"option": guided_opt, "isOptimal": True, "reason": guided_opt_reason},
                    {"option": guided_non1, "isOptimal": False, "reason": guided_non1_reason},
                    {"option": guided_non2, "isOptimal": False, "reason": guided_non2_reason}
                ],
                "keyTakeaway": guided_takeaway
            },
            "independentScenario": {
                "context": indep_context,
                "challengePrompt": indep_prompt,
                "selfEvaluationRubric": indep_rubric
            }
        },

        "assessment": {
            "question": quiz_q,
            "contextScenario": quiz_context,
            "options": [
                {"id": "opt_1", "text": quiz_opt_correct, "isCorrect": True, "feedback": f"Correct! {quiz_opt_correct}"},
                {"id": "opt_2", "text": quiz_opt_w1, "isCorrect": False, "feedback": "This is not the optimal choice. Review the practical steps in the lesson."},
                {"id": "opt_3", "text": quiz_opt_w2, "isCorrect": False, "feedback": "This approach does not solve the underlying challenge safely or effectively."},
                {"id": "opt_4", "text": quiz_opt_w3, "isCorrect": False, "feedback": "Avoid this option; it creates confusion or avoidable risks."}
            ],
            "correctOptionId": "opt_1",
            "remediationActivity": quiz_remediation
        },

        "rubric": {
            "performanceTask": rubric_task,
            "masteryCriteria": rubric_mastery,
            "criteria": [
                {"criterion": c1_name, "weightPercentage": 40, "emerging": c1_em, "developing": c1_dev, "proficient": c1_prof, "exemplary": c1_ex},
                {"criterion": c2_name, "weightPercentage": 35, "emerging": c2_em, "developing": c2_dev, "proficient": c2_prof, "exemplary": c2_ex},
                {"criterion": c3_name, "weightPercentage": 25, "emerging": c3_em, "developing": c3_dev, "proficient": c3_prof, "exemplary": c3_ex}
            ]
        },

        "reflectionPrompts": [
            {"id": "ref_1", "prompt": ref1},
            {"id": "ref_2", "prompt": ref2},
            {"id": "ref_3", "prompt": ref3},
            {"id": "ref_4", "prompt": ref4}
        ]
    }
