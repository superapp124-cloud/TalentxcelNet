import json
import os

print("Generating Class 5 complete curriculum (36 modules)...")

def make_mod(
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

modules = []

# MONTH 1
modules.append(make_mod(
    1, "Weekly Routine Planning & Morning Rhythm", 1,
    "life_independence", "Personal Independence & Daily Living",
    "Creating a Weekly After-School Schedule with Fixed Play & Study Blocks",
    "When after-school hours are unplanned, homework gets delayed until bedtime and playtime gets squeezed out. A visual weekly timetable gives you freedom, fun, and timely rest.",
    ["Design a Monday-to-Friday after-school schedule grid with 1-hour blocks", "Allocate fixed, protected slots for outdoor play (1 hour) and focused homework (1.5 hours)", "Build in a 20-minute buffer for relaxation or reading before dinner", "Stick to the schedule independently without needing parental nagging"],
    "Vihaan came home at 3:30 PM, watched TV while eating biscuits, started browsing his tablet, and suddenly it was 8:00 PM. He still had Math worksheets and Science definitions left, leading to tears and a stressful late dinner.",
    "Time is like a school backpack: if you throw things in randomly, nothing fits! But if you pack big rocks first (homework, sports, sleep) and small sand after (cartoons, gaming), everything fits comfortably with zero stress.",
    ["Draw a grid with 5 columns (Monday to Friday) and 5 rows (3:30 PM to 8:30 PM).", "Block out 3:30 to 4:00 PM for washing hands, healthy snack, and unwinding.", "Block out 4:30 to 5:30 PM for outdoor games, cycling, or physical sports.", "Block out 5:45 to 7:15 PM for focused homework sprints with a 5-minute break.", "Reserve 7:30 to 8:30 PM for dinner, family time, and bag packing."],
    "Vihaan’s Balanced Weekday Grid", "Vihaan tests his new after-school timetable on Tuesday.",
    ["Eats poha and changes out of uniform by 4:00 PM.", "Plays cricket with building friends until 5:30 PM.", "Finishes Math and English homework by 7:00 PM.", "Enjoys dinner peacefully with grandparents at 8:00 PM."],
    "Scheduling play first ensures you play guilt-free and study with deep focus.",
    [("Scheduling 4 solid hours of continuous study with no play or breaks.", "Unrealistic schedules cause burnout; always include 60 minutes of active physical play."), ("Leaving schedule flexible with no set start time for homework.", "Ambiguity invites procrastination; anchor homework to an exact clock time (e.g. 5:45 PM).")],
    ["Is physical playtime clearly scheduled?", "Is homework scheduled before 7:30 PM?", "Is there a wind-down buffer before dinner?", "Is the schedule posted where the family can see it?"],
    "How does knowing you have protected playtime make sitting down for homework feel easier?",
    "Schedule your play and schedule your study: a predictable rhythm creates effortless success.",
    "Student reviewing a colorful weekly timetable pinned above a wooden study desk.",
    "The After-School Rhythm Map", "3:30pm Arrive -> 4:30pm Outdoor Play -> 5:45pm Homework Sprint -> 7:30pm Family & Dinner.",
    "The 3 Non-Negotiables", "1. Sixty minutes outdoor play, 2. Single-task study block, 3. Consistent 9:30 PM lights out.",
    "Own Your Afternoons: The Weekly Timetable", "3 mins 20 secs",
    [("Child rushing through homework late at night vs child enjoying balanced evening.", "Unplanned afternoons slip away like water through fingers."), ("Color-coding play blocks in green and study blocks in blue.", "Protect your playtime. Lock in your homework sprint. Own your evening."), ("Ticking off afternoon tasks with a satisfied smile.", "A clear rhythm turns stressful evenings into calm family time.")],
    "Draft your Monday-to-Friday after-school schedule grid today.",
    "5-Day After-School Schedule Blueprint", "Construct and follow a color-coded weekday after-school schedule for 5 days.",
    ["A4 paper or cardboard", "Color markers", "Ruler"],
    ["Draw 5 weekday columns from 3:30 PM to 9:00 PM.", "Color play blocks in green and study blocks in blue.", "Post grid next to study desk.", "Track daily on-time starts for 5 days."],
    "A completed 5-day schedule tracker with caregiver verification signatures.",
    "Ensure schedule accommodates actual school bus arrival times.", "Create a visual clock wheel showing hourly activity wedges.",
    "It is 5:45 PM—the scheduled start time for homework—but a friend rings the doorbell asking to play extra video games.",
    "Politely say: 'My homework block is 5:45 to 7:00 PM. Let us play together tomorrow at 4:30 PM during play hour.'",
    "Protects personal commitments while maintaining a friendly, cooperative relationship.",
    "Abandon homework, play games until 9 PM, and stay up until midnight crying over Math.", "Breaks self-trust and causes severe academic distress.",
    "Slam the door rudely in the friend’s face without explanation.", "Damages friendship unnecessarily when clear communication works better.",
    "Boundary setting with peers protects your evening peace and personal goals.",
    "School announces a special 2-hour sports practice on Wednesday from 5:00 to 7:00 PM.",
    "Explain how you will adjust your Wednesday schedule to ensure homework still gets completed.",
    "Shifted homework block to 3:45-4:45 PM before sports, or planned a light evening review session.",
    "Why should an after-school schedule include guaranteed outdoor playtime rather than only study blocks?",
    "Designing a balanced weekday schedule for Class 5.",
    "Because physical play releases pent-up energy, boosts oxygen to the brain, and sharpens study focus.",
    "Because sports are more important than doing homework.",
    "Because school rules require students to play video games.",
    "Because parents prefer children staying outside until night.",
    "Physical activity refreshes neural pathways; balanced days include both hard work and active play.",
    "Design a realistic weekly after-school schedule and execute it for 5 consecutive school days.",
    "Realistic time blocks, clear color coding, 100% homework/play balance, self-directed execution.",
    "Schedule Design & Realism", "Unrealistic or missing blocks.", "Covers only study, forgets play.", "Balanced allocation of play, study, meals, and rest.", "Optimally phased schedule with transition buffers.",
    "Adherence & Independence", "Requires constant parent nagging.", "Follows 2-3 days.", "Follows schedule for 5 days with minimal reminders.", "Self-initiates transitions using clock prompts.",
    "Reflection & Adjustment", "Does not review bottlenecks.", "Notices delays but makes no changes.", "Adjusts unrealistic blocks thoughtfully.", "Proactively optimizes weekly schedule based on experience.",
    "What part of your after-school time felt easiest to manage this week?",
    "Did you ever feel tempted to delay homework? What brought you back to the desk?",
    "How did your parents react when they saw you start homework without being asked?",
    "How will your schedule change when exam revision weeks begin?"
))

modules.append(make_mod(
    1, "Weekly Routine Planning & Morning Rhythm", 2,
    "life_independence", "Personal Independence & Daily Living",
    "Morning Speed Routine: Getting Dressed, Beds Made & Shoes On in 15 Minutes",
    "Morning chaos leads to missed buses, forgotten items, and stressful family arguments. A streamlined 15-minute speed routine gives you a calm, victorious start to every morning.",
    ["Execute a 5-step morning checklist without adult prompting", "Make bed immediately upon waking: straighten sheet and fluff pillow in 60 seconds", "Put on uniform, socks, and polished shoes within 8 minutes", "Check bag, water bottle, and snack box before stepping to the front door"],
    "Rohan woke up at 6:45 AM for a 7:15 AM school bus. He spent 10 minutes hunting for his left shoe, couldn’t find his belt, and ran to the bus stop with untied laces and toast half-hanging out of his mouth.",
    "Pilots and athletes don’t invent their routine every morning—they follow a pre-flight checklist! When your clothes, shoes, and bag are stationed the night before, your morning becomes an effortless 15-minute glide.",
    ["Rise at the first alarm bell; immediately stretch and make your bed (60 seconds).", "Wash face, brush teeth with 2-minute circles, and comb hair.", "Step into clean uniform laid out the night before, buttoning from top to bottom.", "Slip into socks and tie shoes using the bunny-ear knot.", "Grab packed water bottle and tiffin from kitchen counter and head to the door."],
    "Rohan’s 15-Minute Morning Glide", "Rohan executes his morning checklist.",
    ["Alarm rings at 6:30 AM; stands immediately.", "Fluffs pillow and pulls quilt tight (1 min).", "Brushes teeth and washes face (4 mins).", "Dresses in pre-set uniform and ties shoes (6 mins).", "Eats warm breakfast calmly at table (10 mins)."],
    "Preparation the night before turns morning panic into peaceful family breakfast.",
    [("Hitting the snooze button 4 times and sleeping in 10-minute bursts.", "Snoozing creates sleep inertia; stand up immediately and drink a glass of water."), ("Leaving shoe polishing and uniform searching for morning time.", "Always lay out uniform, belt, socks, and shoes completely before sleeping.")],
    ["Did I get up at first alarm?", "Is my bed made neatly?", "Is uniform worn with belt and shoes tied?", "Are water bottle and tiffin packed in bag?"],
    "How did having 10 relaxed minutes to eat breakfast change your school bus ride?",
    "Win the first fifteen minutes of your day, and you win the whole day.",
    "Child adjusting tie in front of mirror with neatly made bed in background and school shoes tied.",
    "The 15-Minute Launch Sequence", "0-2m Rise & Make Bed -> 2-6m Teeth & Wash -> 6-12m Uniform & Shoes -> 12-15m Bag & Go.",
    "The Bedside Launchpad", "Uniform on chair, socks rolled inside shoes, packed bag beside door.",
    "The 15-Minute Morning Launch", "3 mins 10 secs",
    [("Frantic morning searching under beds vs calm prepared launch.", "The secret to a calm morning begins ten hours earlier."), ("Sixty-second bed making and uniform step-in.", "Make your bed. Put on your armor. Step into your shoes."), ("Family smiling over warm parathas at breakfast table.", "Start your day with calm confidence. The school bus will never leave you behind.")],
    "Set up your 'Launchpad' tonight: lay out uniform, socks, and shoes completely.",
    "7-Day Morning Launch Challenge", "Complete morning rising, bed making, dressing, and shoe tying in under 15 minutes for 7 school days.",
    ["Clock or stopwatch", "Night-before Launchpad station", "Morning tracking card"],
    ["Set uniform, socks, and shoes on chair tonight.", "Record wake-up time upon alarm.", "Execute checklist without distractions.", "Record finish time when dressed and shoes tied."],
    "A 7-day launch log showing elapsed minutes with caregiver initials.",
    "Do not run recklessly down stairs when putting on shoes; sit on a chair to tie laces safely.",
    "Focus on mastering the 60-second bed-making and shoe-tying speed trial.",
    "Tanvi wakes up feeling groggy and wants to lie in bed scrolling through cartoons on a phone.",
    "Push the blanket back immediately, sit upright on the edge of the bed, and drink a glass of water.",
    "Sitting upright and drinking cold water instantly signals the brain that sleep mode is over.",
    "Pull the blanket over head and sleep for another 20 minutes until mother screams.",
    "Creates severe lateness, stress, and starts the day with an argument.",
    "Watch 15 minutes of videos in bed while pretending to be asleep.",
    "Wastes critical preparation time and strains tired eyes.",
    "Action cures sluggishness: feet on the floor within 5 seconds of the alarm.",
    "You notice your school uniform shirt is missing a button right as you dress at 6:40 AM.",
    "Explain what you will do calmly to solve this without panicking.",
    "Checked for spare uniform shirt; alerted parent immediately; adjusted sweater/tie neatly.",
    "What is the single most important action to take the night before to ensure a 15-minute morning routine?",
    "Setting up an effortless morning launch.",
    "Laying out uniform, socks, shoes, belt, and packed school bag in a designated spot.",
    "Setting four loud alarms five minutes apart.",
    "Sleeping in school uniform with shoes on.",
    "Skipping breakfast completely to save time.",
    "Eliminate morning decisions the night before by preparing all clothing and gear in advance.",
    "Execute a full morning preparation sequence from alarm to departure under timed observation.",
    "Under 15 minutes, neat bed made, fully groomed uniform, calm disposition, zero nagging required.",
    "Time Management & Speed", "Takes >30 minutes.", "Takes 20-25 minutes.", "Completes all steps in under 15 minutes.", "Effortless 12-minute execution with time to spare.",
    "Grooming & Bed Neatness", "Bed unmade, untucked shirt.", "Bed messy, shoes untied.", "Bed made flat; uniform tidy, shoes properly laced.", "Hospital-corner bed corners and immaculate attire.",
    "Self-Reliance", "Requires repeated parental prompts.", "Needs 1-2 reminders.", "100% self-directed execution from alarm to shoes.", "Assists younger sibling with morning launch.",
    "How does making your bed first thing in the morning give you a sense of achievement?",
    "What was the biggest morning time-waster you eliminated this week?",
    "How did your morning mood feel when you didn’t have to rush?",
    "What can you do on Sunday evenings to prepare for Monday morning?"
))

modules.append(make_mod(
    1, "Weekly Routine Planning & Morning Rhythm", 3,
    "life_study_skills", "Study Skills & Learning Independence",
    "Setting Up Subject Folders & Keeping Loose Handouts Sorted",
    "Loose worksheets crammed into bags get crumpled, stained, and lost before exams. Setting up dedicated subject folders ensures you can find any worksheet in five seconds.",
    ["Label 4 clear plastic L-folders with bold subject names: Math, Science, English, Social Studies", "File daily school worksheets into the correct folder on the afternoon they are received", "Purge outdated announcements and scrap paper weekly", "Locate any requested homework sheet in under 10 seconds"],
    "Sneha’s teacher asked for the 3-page Science plant life cycle worksheet handed out last Thursday. Sneha dug through her bag, pulling out crumpled biscuit wrappers, old circulars, and ripped papers, but the worksheet was nowhere to be found.",
    "Your backpack is for transporting knowledge, not storing crumpled trash! A loose sheet of paper has zero structural strength—it gets torn and mashed by heavy books. Keeping 4 flat plastic folders acts like a filing cabinet inside your bag.",
    ["Get 4 plastic sleeve folders or L-cut file jackets in different colors.", "Write bold subject labels at the top right: MATH, SCIENCE, ENGLISH, SOCIAL STUDIES.", "Every afternoon when unpacking your bag, slide new loose worksheets into their matching folder.", "Place heavy textbooks first, then notebooks, then the 4 slender folders against the front wall.", "Every Friday evening, review folders and remove old permission slips and completed notices."],
    "Sneha’s 4-Folder Filing Cabinet", "Sneha reorganizes her loose sheets.",
    ["Cleans all crumpled paper out of backpack.", "Labels blue for Math, green for Science, red for English.", "Files 6 loose worksheets into matching folders.", "Finds Science homework sheet instantly next day."],
    "Ten seconds of filing saves twenty minutes of frantic searching.",
    [("Folding worksheets into tiny squares and shoving them inside textbook pages.", "Creased folds tear easily and fall out; always file sheets flat inside folders."), ("Letting 6 months of old circulars accumulate until folders bulge and split.", "Do a 2-minute Friday cleanout to archive old sheets into a home box.")],
    ["Are all 4 folders clearly labeled?", "Are worksheets filed flat with no folded edges?", "Are folders stored upright in bag?", "Did I do the Friday cleanout?"],
    "How much faster can you find your homework worksheet when it has a dedicated home?",
    "File it flat, find it fast: organized folders turn chaos into effortless clarity.",
    "Student sliding a crisp science worksheet into a labeled green plastic folder at an organized desk.",
    "The 4-Subject Color Code", "Blue = Mathematics, Green = Science, Red = English, Yellow = Social Studies.",
    "Backpack Packing Hierarchy", "Back: Heavy Textbooks -> Center: Notebooks -> Front: Slim Subject Folders.",
    "The 5-Second Paper Filing System", "2 mins 55 secs",
    [("Student pulling crumpled, torn worksheet from messy bag.", "Nothing feels worse than knowing you did your homework, but losing the sheet."), ("Demonstrating labeling four slim plastic folders and filing worksheets flat.", "Four slim folders. Four subject colors. Flat, clean, and ready in five seconds."), ("Instantly handing neat, uncrumpled homework to smiling teacher.", "When your papers are organized, your mind is free to learn.")],
    "Label 4 plastic folders for your core subjects and sort all loose sheets today.",
    "School Bag Paper Filing Setup", "Label 4 subject folders, sort all loose papers in your backpack, and maintain for 2 weeks.",
    ["4 plastic L-folders", "Marker or labels", "Current school backpack"],
    ["Empty every single sheet of paper from your backpack.", "Recycle useless trash, wrappers, and outdated flyers.", "Label folders: MATH, SCIENCE, ENGLISH, SOCIAL STUDIES.", "File all active worksheets flat into corresponding folders."],
    "A fully organized backpack with 4 labeled subject folders and zero loose paper.",
    "Do not throw away parent consent slips or test papers without adult verification.",
    "Use a single multi-pocket accordion folder if individual files are unavailable.",
    "You receive a two-page Math mock test paper 5 minutes before the final school bell rings.",
    "Take 5 seconds to open the Blue Math folder and slide both pages flat inside before zipping bag.",
    "Ensures the papers arrive home pristine, uncreased, and ready for evening review.",
    "Crumple papers into a ball and stuff them into the side water bottle mesh.",
    "Papers get soaked by bottle condensation and torn by bushes.",
    "Toss papers loosely into the bottom of the main bag compartment.",
    "Heavy textbooks will crush and dog-ear the edges during the bus ride.",
    "Five seconds of discipline protects hours of valuable schoolwork.",
    "Your teacher hands you a signed permission slip for a field trip that must be returned tomorrow.",
    "Explain exactly where you will keep this slip so your parents can sign it tonight.",
    "Placed in front folder pocket; showed parent during 4 PM bag unpack; returned signed slip to folder.",
    "Why should loose school worksheets never be stored directly loose at the bottom of a backpack?",
    "Protecting school assignments and handouts.",
    "Because heavy textbooks and water bottles crush, tear, and soil loose papers during transport.",
    "Because backpacks have paper-eating zippers.",
    "Because school rules forbid bringing paper home.",
    "Because loose papers make the backpack 10 times heavier.",
    "Always protect thin paper inside sturdy plastic or card folders to maintain integrity.",
    "Organize, label, and maintain a 4-folder filing system for loose school worksheets.",
    "Clean subject labeling, 100% loose sheets sorted flat, zero bag clutter, instant retrieval speed.",
    "Folder Labeling & Structure", "Unlabeled or single generic file.", "2 folders labeled.", "4 distinct subjects neatly labeled and color-coded.", "Professional labeling with subject indices and emergency pouch.",
    "Filing Discipline & Paper Condition", "Crumpled, torn papers.", "Papers folded in half.", "All worksheets filed completely flat without tears.", "Pristine paper preservation across multiple weeks.",
    "Retrieval Speed", "Takes >30 seconds to find sheet.", "Takes 15-20 seconds.", "Retrieves specified worksheet in under 10 seconds.", "Instant 5-second retrieval with total composure.",
    "Have you ever lost homework that you had already finished? How did it feel?",
    "Which subject gives you the most loose worksheets each week?",
    "How does keeping clean folders make studying for exams easier?",
    "How will you teach this filing system to a classmate whose bag is messy?"
))

print(f"Generated Month 1: {len(modules)} modules so far.")
