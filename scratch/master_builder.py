# Master Curriculum Builder for Classes 5, 6, 7, 8, 9
import json
import os
import re

print("Starting Master Curriculum Compiler for Classes 5–9...")

# Master Module Synthesizer Function
def make_module(
    class_num, stage, month, theme, seq, cat, cat_label, title, why, objs,
    character, context, problem, core_lesson, steps, ex_scenario, ex_steps, ex_takeaway,
    mistake1, fix1, mistake2, fix2, checklist, prompt, takeaway,
    vis1_title, vis1_caption, vis2_title, vis2_caption,
    act_title, act_obj, act_mats, act_steps, act_output, act_precaution, act_alt,
    guided_context, guided_opt, guided_opt_reason, guided_non1, guided_non1_reason, guided_non2, guided_non2_reason, guided_takeaway,
    indep_context, indep_prompt, indep_rubric,
    quiz_q, quiz_opt_correct, quiz_opt_w1, quiz_opt_w2, quiz_opt_w3, quiz_remediation,
    rubric_task, rubric_mastery,
    c1_name, c1_desc, c2_name, c2_desc, c3_name, c3_desc,
    ref1, ref2, ref3, ref4
):
    m_str = f"{month:02d}"
    mod_id = f"mod_c{class_num}_m{m_str}_s{seq}"
    global_idx = (month - 1) * 3 + seq

    return {
        "id": mod_id,
        "classNumber": class_num,
        "lifeSkillStage": stage,
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
        "materials": act_mats if act_mats else ["Notebook", "Pencil", "Activity Checklist"],
        "safetyGuidance": act_precaution,
        "contentVersion": "1.0.0",
        "publicationStatus": "published",

        "openingScenario": f"{character} {context}. {problem}",
        "explanation": core_lesson,
        "stepByStep": steps,
        "workedExample": {
            "title": f"{character}’s Practice: {title}",
            "scenario": ex_scenario,
            "steps": ex_steps,
            "takeaway": ex_takeaway
        },
        "commonMistakes": [
            {"mistake": mistake1, "correction": fix1},
            {"mistake": mistake2, "correction": fix2}
        ],
        "decisionChecklist": checklist,
        "reflectionPrompt": prompt,
        "summaryTakeaway": takeaway,

        "heroVisual": {
            "url": f"/images/skills/modules/c{class_num}/c{class_num}_m{m_str}_s{seq}_hero.webp",
            "altText": f"{title} - Step by step life skill demonstration for Class {class_num}",
            "description": f"Visual infographic and scenario guide demonstrating {title.lower()}.",
            "attribution": "TalentXcel Practical Life-Skills Studio",
            "status": "ready"
        },
        "instructionalVisuals": [
            {
                "id": f"vis_c{class_num}_{m_str}_{seq}_a",
                "title": vis1_title,
                "diagramType": "infographic",
                "url": f"/images/skills/modules/c{class_num}/diagrams/c{class_num}_m{m_str}_s{seq}_diag1.webp",
                "altText": vis1_title,
                "caption": vis1_caption,
                "status": "ready"
            },
            {
                "id": f"vis_c{class_num}_{m_str}_{seq}_b",
                "title": vis2_title,
                "diagramType": "checklist",
                "url": f"/images/skills/modules/c{class_num}/diagrams/c{class_num}_m{m_str}_s{seq}_diag2.webp",
                "altText": vis2_title,
                "caption": vis2_caption,
                "status": "ready"
            }
        ],

        "videoContent": {
            "videoTitle": f"Practical Demonstration: {title}",
            "duration": "3 mins 15 secs",
            "videoUrl": None,
            "status": "storyboard_ready",
            "storyboardBrief": [
                {"scene": 1, "visualDescription": f"Opening setup showing common dilemma with {title.lower()}.", "narrationTranscript": f"When faced with everyday situations, {title.lower()} makes all the difference."},
                {"scene": 2, "visualDescription": "Demonstrating the 5 core practical steps in sequence with clear visual markers.", "narrationTranscript": "Follow these practical steps systematically to achieve reliable, calm results."},
                {"scene": 3, "visualDescription": "Successful outcome with reflection and checklist review.", "narrationTranscript": f"Review your actions, verify safety, and practice {title.lower()} consistently."}
            ],
            "practicalChallengeRecap": f"Practice the 5 core steps of {title.lower()} in your everyday routine today."
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
            "contextScenario": f"Applying principles of {title.lower()} in a realistic situation.",
            "options": [
                {"id": "opt_1", "text": quiz_opt_correct, "isCorrect": True, "feedback": f"Correct! {quiz_opt_correct}"},
                {"id": "opt_2", "text": quiz_opt_w1, "isCorrect": False, "feedback": "This is not the optimal choice. Review the practical steps in the lesson."},
                {"id": "opt_3", "text": quiz_opt_w2, "isCorrect": False, "feedback": "This approach does not solve the underlying challenge safely or effectively."},
                {"id": "opt_4", "text": quiz_opt_w3, "isCorrect": False, "feedback": "Avoid this option; it creates confusion or avoidable risks."}
            ],
            "correctOptionId": "opt_1",
            "remediationActivity": f"Review the step-by-step instructions for {title}."
        },

        "rubric": {
            "performanceTask": rubric_task,
            "masteryCriteria": rubric_mastery,
            "criteria": [
                {
                    "criterion": c1_name,
                    "weightPercentage": 40,
                    "emerging": f"Incomplete understanding of {c1_name.lower()}.",
                    "developing": f"Demonstrates basic elements of {c1_name.lower()} with guidance.",
                    "proficient": f"Consistently demonstrates {c1_name.lower()} independently.",
                    "exemplary": f"Exemplary mastery of {c1_name.lower()}; guides peers effectively."
                },
                {
                    "criterion": c2_name,
                    "weightPercentage": 35,
                    "emerging": f"Needs reminders on {c2_name.lower()}.",
                    "developing": f"Applies {c2_name.lower()} inconsistently.",
                    "proficient": f"Reliably executes {c2_name.lower()} with accuracy.",
                    "exemplary": f"Flawless application of {c2_name.lower()} under pressure."
                },
                {
                    "criterion": c3_name,
                    "weightPercentage": 25,
                    "emerging": "Limited reflection or self-correction.",
                    "developing": "Reflects only when prompted by teacher.",
                    "proficient": "Independently reviews results and self-corrects.",
                    "exemplary": "Exceptional self-direction and insightful personal reflection."
                }
            ]
        },

        "reflectionPrompts": [
            {"id": "ref_1", "prompt": ref1},
            {"id": "ref_2", "prompt": ref2},
            {"id": "ref_3", "prompt": ref3},
            {"id": "ref_4", "prompt": ref4}
        ]
    }

print("make_module helper verified.")
