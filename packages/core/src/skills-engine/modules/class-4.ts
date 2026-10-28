import type { LifeSkillCurriculumModule } from '../curriculum-types'

/**
 * CLASS 4: Foundation (Ages 9-10)
 * 36 Unique Practical Life-Skills Modules
 * 12 Monthly Units x 3 Modules per Month
 */
export const CLASS_4_MODULES: LifeSkillCurriculumModule[] = [
  {
    "id": "mod_c4_m01_s1",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 1,
    "monthTheme": "Daily Personal Routines & Self-Reliance",
    "sequenceNumber": 1,
    "globalIndex": 1,
    "category": "life_independence",
    "categoryLabel": "Personal Independence & Daily Living",
    "title": "Pack a School Bag Using Tomorrow's Timetable",
    "whyItMatters": "Packing your bag the night before based on your timetable prevents forgotten homework, eliminates morning panic, and builds self-reliance.",
    "learningObjectives": [
      "Check tomorrow's school timetable and identify required subjects",
      "Select only matching notebooks, textbooks, and diaries",
      "Verify stationery items (2 pencils, eraser, ruler, sharpener)",
      "Place packed bag and water bottle in a designated morning spot"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Aarav woke up late on Tuesday, grabbed random books in a rush, and arrived at school only to discover he forgot his Science notebook and colored pencils for Art.",
    "explanation": "A school bag is your learning toolkit. When you pack it randomly, you carry extra weight you do not need and forget things you actually need. Packing systematically takes only 7 minutes when done the night before.",
    "stepByStep": [
      "Place tomorrow's timetable flat on your study desk.",
      "Read each period in order and pull out only the required textbook and notebook for that subject.",
      "Open your pencil box and verify you have: 2 sharpened pencils, 1 clean eraser, 1 ruler, and 1 sharpener.",
      "Check if any homework diary or parent consent slip needs to be signed and placed in the front zip pocket.",
      "Zip all compartments completely and set the bag beside your school shoes."
    ],
    "workedExample": {
      "title": "Wednesday Pack for Class 4",
      "scenario": "Wednesday has Math, English, EVS, and Library.",
      "steps": [
        "Diya reads Wednesday column.",
        "Places Math textbook against back panel.",
        "Adds English and EVS in middle.",
        "Adds Library book to return.",
        "Verifies pencil box."
      ],
      "takeaway": "Heavy books closest to back panel keep posture healthy."
    },
    "commonMistakes": [
      {
        "mistake": "Leaving all textbooks in the bag for the whole week.",
        "correction": "Carrying unnecessary weight strains your spine; remove yesterday’s unused books daily."
      },
      {
        "mistake": "Packing in the morning 10 minutes before the bus.",
        "correction": "Pack every evening right after finishing homework."
      }
    ],
    "decisionChecklist": [
      "Did I read tomorrow's timetable?",
      "Are only required books inside?",
      "Is pencil box equipped?",
      "Is diary signed?"
    ],
    "reflectionPrompt": "How did preparing your school bag in the evening change the way your morning felt?",
    "summaryTakeaway": "Seven minutes of thoughtful evening packing gives you a calm, organized start to every school day.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m01_s1_hero.webp",
      "altText": "Pack a School Bag Using Tomorrow's Timetable - Step by step life skill demonstration for Class 4",
      "description": "Student methodically matching textbooks against a visual schedule board.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_01_1_a",
        "title": "Backpack Weight Hierarchy",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m01_s1_diag1.webp",
        "altText": "Backpack Weight Hierarchy",
        "caption": "Heavy books at back, medium in middle, light/stationery in front.",
        "status": "ready"
      },
      {
        "id": "vis_c4_01_1_b",
        "title": "5-Point Bag Audit Checklist",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m01_s1_diag2.webp",
        "altText": "5-Point Bag Audit Checklist",
        "caption": "Check off every period before zipping the main compartment.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "The 7-Minute Evening Bag Pack",
      "duration": "3 mins 20 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Rushed morning vs calm prepared morning.",
          "narrationTranscript": "Let's make mornings calm."
        },
        {
          "scene": 2,
          "visualDescription": "Matching books to schedule.",
          "narrationTranscript": "Pull out only needed books."
        },
        {
          "scene": 3,
          "visualDescription": "Pencil box check.",
          "narrationTranscript": "You are 100% prepared."
        }
      ],
      "practicalChallengeRecap": "Pack your bag tonight in under 7 minutes using your printed timetable."
    },
    "practicalActivity": {
      "title": "7-Day Evening School Bag Challenge",
      "objective": "Independently pack bag for 7 consecutive school evenings.",
      "materials": [
        "School bag",
        "Timetable",
        "Check-off sheet"
      ],
      "procedure": [
        "Pin timetable above desk.",
        "Empty yesterday's books at 7:30 PM.",
        "Pack matching books.",
        "Verify with caregiver."
      ],
      "expectedOutput": "Completed 7-day tracking sheet with 7 caregiver checkmarks.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Ensure total weight is easy to carry comfortably.",
      "alternativeActivity": "Organize your home study shelf."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Rohan sees that tomorrow has Double Math and Art class.",
        "choiceOptions": [
          {
            "option": "Pack both Math books, Art sketchbook, and library book.",
            "isOptimal": true,
            "reason": "Covers tomorrow's classes and avoids library fines."
          },
          {
            "option": "Leave Art at home.",
            "isOptimal": false,
            "reason": "Cannot participate in art class."
          },
          {
            "option": "Pack every single subject.",
            "isOptimal": false,
            "reason": "Strains back unnecessarily."
          }
        ],
        "keyTakeaway": "Stick strictly to timetable."
      },
      "independentScenario": {
        "context": "Tomorrow is Friday with Sports first period.",
        "challengePrompt": "Explain what extra items you must pack tonight.",
        "selfEvaluationRubric": "Packed sports shoes in separate pouch and water bottle in side mesh."
      }
    },
    "assessment": {
      "question": "Why should the heaviest textbooks be placed closest to the back panel of your backpack?",
      "contextScenario": "Packing heavy Math book and three thin notebooks.",
      "options": [
        {
          "id": "opt_1",
          "text": "Because it keeps weight centered close to spine, protecting posture.",
          "isCorrect": true,
          "feedback": "Correct! Because it keeps weight centered close to spine, protecting posture."
        },
        {
          "id": "opt_2",
          "text": "Because it hides big books.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Because heavy books look better deep inside.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "It makes no difference.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Re-read Backpack Weight Hierarchy."
    },
    "rubric": {
      "performanceTask": "Pack school bag according to randomly drawn weekday timetable in under 5 minutes.",
      "masteryCriteria": "100% books matched, heavy books against back, stationery verified.",
      "criteria": [
        {
          "criterion": "Timetable Accuracy",
          "weightPercentage": 40,
          "emerging": "Misses >1 subject.",
          "developing": "Misses 1 workbook.",
          "proficient": "Matches 100% of required books.",
          "exemplary": "Matches all subjects and diary."
        },
        {
          "criterion": "Weight Distribution",
          "weightPercentage": 35,
          "emerging": "Randomly tossed.",
          "developing": "Stacked but water bottle inside.",
          "proficient": "Heavy books at back, bottle outside.",
          "exemplary": "Ergonomic hierarchy."
        },
        {
          "criterion": "Speed & Independence",
          "weightPercentage": 25,
          "emerging": "Needs adult guidance.",
          "developing": "Takes >15 mins.",
          "proficient": "Under 7 minutes independently.",
          "exemplary": "Under 5 minutes with tidy desk."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "What was hardest about packing the night before?"
      },
      {
        "id": "ref_2",
        "prompt": "Did you ever forget a book before?"
      },
      {
        "id": "ref_3",
        "prompt": "Where will you keep your bag at night?"
      },
      {
        "id": "ref_4",
        "prompt": "How will you help a younger sibling?"
      }
    ]
  },
  {
    "id": "mod_c4_m01_s2",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 1,
    "monthTheme": "Daily Personal Routines & Self-Reliance",
    "sequenceNumber": 2,
    "globalIndex": 2,
    "category": "life_independence",
    "categoryLabel": "Personal Independence & Daily Living",
    "title": "Organizing Your Study Desk & Keeping Stationery Ready",
    "whyItMatters": "A clean, clutter-free study surface lets your brain focus on learning instead of searching for lost erasers and scrap papers.",
    "learningObjectives": [
      "Clear clutter from the desk surface before beginning study time",
      "Create designated homes for pens, pencils, rulers, and paper",
      "Sharpen 2 pencils and test pens before beginning homework",
      "Wipe down and tidy the desk at the end of each study session"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Kabir sat down to do homework. First he could not find a sharpened pencil. Then his ruler was under comic books. After 20 minutes, he felt too tired to start.",
    "explanation": "Your brain can only focus on one thing at a time. When your desk is covered in toys and wrappers, your eyes get distracted. Giving tools a permanent home saves energy.",
    "stepByStep": [
      "Clear everything off desk surface except study lamp and pencil stand.",
      "Wipe surface clean with dry duster cloth.",
      "Sharpen 2 pencils over a bin and test eraser.",
      "Bring out ONLY the current subject book.",
      "Return tools to holder when finished."
    ],
    "workedExample": {
      "title": "Kabir’s Desk Reset",
      "scenario": "Kabir cleans biscuit wrappers and unsharpened pencils.",
      "steps": [
        "Discards wrappers.",
        "Stacks drawings in art folder.",
        "Sharpens 2 pencils into pen cup.",
        "Opens only Math book."
      ],
      "takeaway": "A clear desk means homework gets done in half the time."
    },
    "commonMistakes": [
      {
        "mistake": "Studying on a bed with pillows.",
        "correction": "Always sit upright at a table with feet touching floor."
      },
      {
        "mistake": "Leaving pencil shavings on desk.",
        "correction": "Use container sharpener or sharpen over dustbin."
      }
    ],
    "decisionChecklist": [
      "Is desk surface free of toys and wrappers?",
      "Are 2 pencils sharpened and eraser clean?",
      "Is only current subject open?",
      "Is chair comfortable with good light?"
    ],
    "reflectionPrompt": "How did sitting at a clean desk change how fast you finished homework?",
    "summaryTakeaway": "A five-minute desk reset before studying gives you calm focus and faster homework completion.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m01_s2_hero.webp",
      "altText": "Organizing Your Study Desk & Keeping Stationery Ready - Step by step life skill demonstration for Class 4",
      "description": "Organized desk setup showing dedicated stationery cup, open workbook, and natural light.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_01_2_a",
        "title": "Desk Focus Zones",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m01_s2_diag1.webp",
        "altText": "Desk Focus Zones",
        "caption": "70% center writing area, stationery at top corner, books shelved below.",
        "status": "ready"
      },
      {
        "id": "vis_c4_01_2_b",
        "title": "60-Second Post-Study Reset",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m01_s2_diag2.webp",
        "altText": "60-Second Post-Study Reset",
        "caption": "Close books, cap pens, bin shavings, push chair in.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "The 5-Minute Desk Reset Method",
      "duration": "2 mins 55 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Cluttered desk vs clear study workspace.",
          "narrationTranscript": "A clear desk boosts focus instantly."
        },
        {
          "scene": 2,
          "visualDescription": "Demonstrating stationery cup and workspace zone.",
          "narrationTranscript": "Keep only one subject on desk at a time."
        },
        {
          "scene": 3,
          "visualDescription": "Child capping pens and pushing chair in.",
          "narrationTranscript": "A 60-second reset leaves desk inviting."
        }
      ],
      "practicalChallengeRecap": "Reset your study desk today and keep it 100% clutter-free."
    },
    "practicalActivity": {
      "title": "Study Space Transformation Project",
      "objective": "Clean, organize, and maintain study area for 5 consecutive days.",
      "materials": [
        "Cleaning cloth",
        "Pen holder",
        "Dustbin"
      ],
      "procedure": [
        "Take sketch of desk now.",
        "Remove items and wipe clean.",
        "Sort stationery.",
        "Maintain 60-second reset for 5 days."
      ],
      "expectedOutput": "Clean study space maintained over 5 days with caregiver sign-off.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Do not keep open drinks next to lamps or sockets.",
      "alternativeActivity": "Organize a Portable Study Caddy box if using shared dining table."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Ananya is about to start studying, but desk has brother’s board game on it.",
        "choiceOptions": [
          {
            "option": "Help brother pack board game before starting.",
            "isOptimal": true,
            "reason": "Clearing space ensures room to write without distraction."
          },
          {
            "option": "Push pieces into a messy pile in corner.",
            "isOptimal": false,
            "reason": "Cramped writing leads to poor handwriting."
          },
          {
            "option": "Sit on living room rug with TV on.",
            "isOptimal": false,
            "reason": "TV distracts from memorizing spelling."
          }
        ],
        "keyTakeaway": "Always secure dedicated clear writing surface."
      },
      "independentScenario": {
        "context": "Finished Science drawing with crayons everywhere.",
        "challengePrompt": "Describe 3 actions before dinner to make desk ready for tomorrow.",
        "selfEvaluationRubric": "Put crayons in box, bin shavings, close notebook."
      }
    },
    "assessment": {
      "question": "What is the biggest benefit of keeping only one textbook and notebook on your desk at a time?",
      "contextScenario": "Working on English grammar exercises.",
      "options": [
        {
          "id": "opt_1",
          "text": "It prevents your mind from wandering to other subjects and reduces visual overwhelm.",
          "isCorrect": true,
          "feedback": "Correct! It prevents your mind from wandering to other subjects and reduces visual overwhelm."
        },
        {
          "id": "opt_2",
          "text": "It makes parents think homework is short.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "It allows eating snacks while writing.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "It saves electricity.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Clear desk surface completely before opening next notebook."
    },
    "rubric": {
      "performanceTask": "Perform full study desk audit and 60-second reset after study session.",
      "masteryCriteria": "Surface clean; tools stored upright; no trash; comfortable seating.",
      "criteria": [
        {
          "criterion": "Workspace Decluttering",
          "weightPercentage": 40,
          "emerging": "Wrappers left.",
          "developing": "Trash gone but unneeded books stacked.",
          "proficient": "Writing area 100% clear.",
          "exemplary": "Immaculately clean surface."
        },
        {
          "criterion": "Tool Readiness",
          "weightPercentage": 35,
          "emerging": "Broken pencils.",
          "developing": "Pencils sharpened only when told.",
          "proficient": "Independently checks and sharpens 2 pencils.",
          "exemplary": "Maintains complete stationery readiness."
        },
        {
          "criterion": "Reset Consistency",
          "weightPercentage": 25,
          "emerging": "Leaves desk messy.",
          "developing": "Resets only with reminders.",
          "proficient": "Consistently resets in under 2 minutes.",
          "exemplary": "Rapid reset and sets out next planner item."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "What item on your desk distracts you most?"
      },
      {
        "id": "ref_2",
        "prompt": "How does your body feel at a clean desk vs bed?"
      },
      {
        "id": "ref_3",
        "prompt": "Where will you keep pencil shavings container?"
      },
      {
        "id": "ref_4",
        "prompt": "How can you remind yourself to push chair in?"
      }
    ]
  },
  {
    "id": "mod_c4_m01_s3",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 1,
    "monthTheme": "Daily Personal Routines & Self-Reliance",
    "sequenceNumber": 3,
    "globalIndex": 3,
    "category": "life_independence",
    "categoryLabel": "Personal Independence & Daily Living",
    "title": "Folding Clothes & Pairing Socks Neatly",
    "whyItMatters": "Taking care of your own clothes protects your school uniform from wrinkles, keeps your wardrobe organized, and builds daily independence.",
    "learningObjectives": [
      "Fold a T-shirt or school shirt using the 3-step flat fold technique",
      "Roll and pair socks so they never get separated in the drawer",
      "Hang school trousers or skirts neatly on a hanger",
      "Place folded items into the correct drawer or shelf compartment"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Dev spends 10 minutes digging through laundry looking for matching white school socks, finding only single mismatched socks.",
    "explanation": "Clothes thrown in a heap get wrinkled and lost. Pairing socks and folding shirts right after laundry takes 15 seconds to find in the morning.",
    "stepByStep": [
      "Lay shirt face-down flat on clean bed or table, smoothing wrinkles with palms.",
      "Fold left third inward with sleeve pointing down.",
      "Fold right third inward forming neat rectangle.",
      "Fold bottom hem up to collar creating compact square.",
      "For socks: lay one atop mate, tuck top cuff over both heels to lock."
    ],
    "workedExample": {
      "title": "T-Shirt Fold Demonstration",
      "scenario": "Priya has 3 washed shirts from the rack.",
      "steps": [
        "Places shirt face down.",
        "Folds left side, folds right side, folds in half.",
        "Stacks shirts on shelf.",
        "Pairs 3 sets of socks with sock-lock."
      ],
      "takeaway": "Smooth hands make flat folds without needing an iron."
    },
    "commonMistakes": [
      {
        "mistake": "Stuffing socks into drawer as loose single pieces.",
        "correction": "Always cuff them together as pairs immediately from the laundry line."
      },
      {
        "mistake": "Folding clothes in the air without flat surface.",
        "correction": "Always lay shirts on flat bed or table so fold lines are straight."
      }
    ],
    "decisionChecklist": [
      "Did I smooth out wrinkles before folding?",
      "Are sleeves folded neatly inside edges?",
      "Are matching socks cuffed securely?",
      "Is stack placed in designated shelf?"
    ],
    "reflectionPrompt": "How did it feel when you were able to pick out your uniform in seconds today?",
    "summaryTakeaway": "Folding your clothes and pairing socks takes five minutes and saves morning stress every single day.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m01_s3_hero.webp",
      "altText": "Folding Clothes & Pairing Socks Neatly - Step by step life skill demonstration for Class 4",
      "description": "Hands demonstrating flat-fold technique for school uniform shirts.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_01_3_a",
        "title": "3-Step Shirt Fold",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m01_s3_diag1.webp",
        "altText": "3-Step Shirt Fold",
        "caption": "Fold left third, fold right third, fold bottom to collar.",
        "status": "ready"
      },
      {
        "id": "vis_c4_01_3_b",
        "title": "Sock-Lock Pairing Method",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m01_s3_diag2.webp",
        "altText": "Sock-Lock Pairing Method",
        "caption": "Roll heels together and fold top cuff over the bundle.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Folding Clothes Like a Pro: 3-Step Method",
      "duration": "3 mins 10 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Messy pile vs neat folded stack.",
          "narrationTranscript": "Let's learn the 3-step fold."
        },
        {
          "scene": 2,
          "visualDescription": "Hands smoothing fabric on flat table.",
          "narrationTranscript": "Smooth wrinkles, fold inward, then fold in half."
        },
        {
          "scene": 3,
          "visualDescription": "Cuffing socks and placing in drawer.",
          "narrationTranscript": "Lock your socks together so pairs never get separated."
        }
      ],
      "practicalChallengeRecap": "Fold 3 shirts and pair 3 sets of socks today."
    },
    "practicalActivity": {
      "title": "Wardrobe Wardens Practical Fold Challenge",
      "objective": "Practice folding 3 shirts and pairing 4 sets of socks, then organize drawer.",
      "materials": [
        "3 clean shirts",
        "4 pairs clean socks",
        "1 drawer section"
      ],
      "procedure": [
        "Find clean flat surface on bed.",
        "Use 3-step method to fold 3 shirts.",
        "Pair and cuff-lock 4 sock sets.",
        "Arrange neatly in drawer."
      ],
      "expectedOutput": "Neatly organized drawer section with 3 flat folded shirts and 4 locked sock pairs.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Do not jump on bed while folding.",
      "alternativeActivity": "Practice folding 2 clean bath towels into neat thirds."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Meera takes off uniform after returning home, rushing to play outside.",
        "choiceOptions": [
          {
            "option": "Take 60 seconds to hang tunic and put socks in wash basket.",
            "isOptimal": true,
            "reason": "Hanging prevents wrinkles and laundry basket ensures wash."
          },
          {
            "option": "Toss uniform onto floor.",
            "isOptimal": false,
            "reason": "Gets clothes dusty and wrinkled."
          },
          {
            "option": "Cram uniform inside school bag.",
            "isOptimal": false,
            "reason": "Causes deep creases and stale odors."
          }
        ],
        "keyTakeaway": "60 seconds to hang or fold preserves uniform freshness."
      },
      "independentScenario": {
        "context": "Pulled clean laundry off clothesline into room.",
        "challengePrompt": "Explain how you will separate socks from shirts and fold them.",
        "selfEvaluationRubric": "Mentioned pairing socks first, flat surface for shirts, stacking neatly."
      }
    },
    "assessment": {
      "question": "Why should you fold one sock cuff over the other when putting socks away?",
      "contextScenario": "Organizing sock drawer after laundry.",
      "options": [
        {
          "id": "opt_1",
          "text": "It locks the pair together so matching socks never get separated or lost in the drawer.",
          "isCorrect": true,
          "feedback": "Correct! It locks the pair together so matching socks never get separated or lost in the drawer."
        },
        {
          "id": "opt_2",
          "text": "It makes socks stretch bigger.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "It changes color.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "It is a school rule.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Practice cuff-locking 3 pairs of socks until you can pair a set in under 10 seconds."
    },
    "rubric": {
      "performanceTask": "Demonstrate folding 2 shirts and pairing 2 sets of socks in under 3 minutes.",
      "masteryCriteria": "Folds straight, edges aligned, sleeves tucked inside, socks firmly paired.",
      "criteria": [
        {
          "criterion": "Fold Alignment & Neatness",
          "weightPercentage": 40,
          "emerging": "Wrinkles trapped; uneven.",
          "developing": "Sleeves stick out.",
          "proficient": "Clean rectangular fold with sleeves inside.",
          "exemplary": "Crisp retail-quality fold with zero creases."
        },
        {
          "criterion": "Sock Pairing Technique",
          "weightPercentage": 35,
          "emerging": "Socks left loose.",
          "developing": "Rolled loosely.",
          "proficient": "Cuff folded securely over both heels.",
          "exemplary": "Fast secure lock with colors matched."
        },
        {
          "criterion": "Independence & Care",
          "weightPercentage": 25,
          "emerging": "Gives up after one try.",
          "developing": "Needs reminders.",
          "proficient": "Completes both items independently.",
          "exemplary": "Independent execution and puts items into drawer."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Which was easier: folding shirt or pairing socks?"
      },
      {
        "id": "ref_2",
        "prompt": "How long did you spend looking for socks before?"
      },
      {
        "id": "ref_3",
        "prompt": "What other clothing can you practice folding?"
      },
      {
        "id": "ref_4",
        "prompt": "How can keeping clothes tidy help your family?"
      }
    ]
  },
  {
    "id": "mod_c4_m02_s1",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 2,
    "monthTheme": "Speaking Up & Clear Communication",
    "sequenceNumber": 1,
    "globalIndex": 4,
    "category": "life_communication",
    "categoryLabel": "Communication & Confidence",
    "title": "Speaking Clearly, Politely, and Making Eye Contact",
    "whyItMatters": "Clear speech and warm eye contact help teachers, friends, and family understand your thoughts and respect your voice.",
    "learningObjectives": [
      "Speak in a calm, clear voice loud enough for the listener to hear",
      "Look at the listener’s forehead or eyes respectfully while speaking",
      "Use polite words like please, thank you, and excuse me",
      "Avoid mumbling, whispering, or looking at your shoes when answering"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "When the teacher called on Sneha to answer, she looked at her shoes and mumbled so quietly the teacher had to ask three times.",
    "explanation": "Your voice is your tool to share ideas. Standing upright and looking towards the listener shows that you respect yourself and the listener.",
    "stepByStep": [
      "Stand or sit upright with shoulders relaxed and chin level.",
      "Look towards the listener’s face—if direct eye contact feels shy, look between eyebrows.",
      "Take one calm breath before beginning sentence.",
      "Speak at steady pace, pronouncing word ends clearly.",
      "Finish sentence with calm smile."
    ],
    "workedExample": {
      "title": "Sneha’s Morning Assembly Greeting",
      "scenario": "Sneha presents the thought of the day in front of 30 classmates.",
      "steps": [
        "Takes slow breath behind podium.",
        "Finds three friendly faces in front row and smiles.",
        "Speaks sentence slowly, holding cue card at chest level.",
        "Classmates hear clearly and clap warmly."
      ],
      "takeaway": "One calm breath before speaking instantly steadies your voice."
    },
    "commonMistakes": [
      {
        "mistake": "Covering mouth with hand or collar while speaking.",
        "correction": "Keep hands resting comfortably by your sides so voice carries forward."
      },
      {
        "mistake": "Rushing through sentences so words blur together.",
        "correction": "Pause between sentences; pausing makes you sound thoughtful and confident."
      }
    ],
    "decisionChecklist": [
      "Did I take a calm breath before speaking?",
      "Am I looking towards listener’s face?",
      "Is my voice loud enough without shouting?",
      "Did I speak at steady pace?"
    ],
    "reflectionPrompt": "When you spoke clearly to someone today, how did they respond differently than when you mumbled?",
    "summaryTakeaway": "Posture, one calm breath, and gentle eye contact turn nervous murmurs into confident communication.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m02_s1_hero.webp",
      "altText": "Speaking Clearly, Politely, and Making Eye Contact - Step by step life skill demonstration for Class 4",
      "description": "Child speaking calmly with upright posture to a listening group.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_02_1_a",
        "title": "Eye Contact Triangle",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m02_s1_diag1.webp",
        "altText": "Eye Contact Triangle",
        "caption": "Look at left eye, right eye, and forehead center.",
        "status": "ready"
      },
      {
        "id": "vis_c4_02_1_b",
        "title": "Clear Voice Projection Rules",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m02_s1_diag2.webp",
        "altText": "Clear Voice Projection Rules",
        "caption": "Chest open, steady breathing, unhurried pace.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Speaking with Confidence and Clarity",
      "duration": "3 mins 15 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Mumbling looking down vs upright clear speaking.",
          "narrationTranscript": "Upright posture gives voice power."
        },
        {
          "scene": 2,
          "visualDescription": "Eyebrow focal point.",
          "narrationTranscript": "Look between eyebrows if nervous."
        },
        {
          "scene": 3,
          "visualDescription": "Classroom presentation with smile.",
          "narrationTranscript": "Speak clearly and let voice be heard."
        }
      ],
      "practicalChallengeRecap": "Practice speaking a 3-sentence introduction with eye contact today."
    },
    "practicalActivity": {
      "title": "The 60-Second Clear Speaker Mirror Drill",
      "objective": "Practice delivering 3-sentence introduction with eye contact in front of mirror.",
      "materials": [
        "Mirror or listener",
        "Cue card"
      ],
      "procedure": [
        "Stand in front of mirror with relaxed shoulders.",
        "Say: \"Good morning, my name is [Name]. Today I learned about school bag organization. Thank you.\"",
        "Practice 3 times until voice is steady.",
        "Perform for family member."
      ],
      "expectedOutput": "Demonstration of confident delivery verified by caregiver.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Do not strain throat shouting; focus on steady projection.",
      "alternativeActivity": "Record voice on phone and listen back to check clarity."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Teacher asks what happens to water when it freezes.",
        "choiceOptions": [
          {
            "option": "Stand straight, look at teacher, say: \"When water freezes, it turns into solid ice.\"",
            "isOptimal": true,
            "reason": "Clear posture and eye contact make explanation audible and confident."
          },
          {
            "option": "Whisper while looking at pencil case.",
            "isOptimal": false,
            "reason": "Whispering makes it impossible for class to hear."
          },
          {
            "option": "Shout at maximum volume before called upon.",
            "isOptimal": false,
            "reason": "Shouting interrupts class and is impolite."
          }
        ],
        "keyTakeaway": "Speak with calm, clear volume while looking at listener."
      },
      "independentScenario": {
        "context": "Introducing yourself to librarian to ask where mystery books are.",
        "challengePrompt": "Write the exact polite sentence you will use.",
        "selfEvaluationRubric": "Included excuse me, name, and clear polite question."
      }
    },
    "assessment": {
      "question": "What is a helpful trick if looking directly into someone’s eyes makes you feel nervous?",
      "contextScenario": "Presenting English poem in front of class.",
      "options": [
        {
          "id": "opt_1",
          "text": "Look at the spot right between their eyebrows or the tops of their ears.",
          "isCorrect": true,
          "feedback": "Correct! Look at the spot right between their eyebrows or the tops of their ears."
        },
        {
          "id": "opt_2",
          "text": "Stare at ceiling with eyes closed.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Turn back to audience.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Read from notebook hiding face.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Practice mirror drill focusing on forehead center."
    },
    "rubric": {
      "performanceTask": "Deliver a 60-second clear verbal introduction with eye contact and polite tone.",
      "masteryCriteria": "Audible volume, unhurried pace, eye contact maintained, polite greeting used.",
      "criteria": [
        {
          "criterion": "Vocal Clarity & Volume",
          "weightPercentage": 40,
          "emerging": "Inaudible mumble.",
          "developing": "Audible but rushed.",
          "proficient": "Clear, steady, audible volume.",
          "exemplary": "Excellent projection with expressive emphasis."
        },
        {
          "criterion": "Eye Contact & Posture",
          "weightPercentage": 35,
          "emerging": "Looking at floor.",
          "developing": "Occasional glance up.",
          "proficient": "Consistent eye contact with upright posture.",
          "exemplary": "Engaging multiple listeners."
        },
        {
          "criterion": "Politeness & Structure",
          "weightPercentage": 25,
          "emerging": "No greeting.",
          "developing": "Abrupt finish.",
          "proficient": "Clear greeting, message, polite finish.",
          "exemplary": "Poised greeting, engaging delivery, gracious thank you."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "How did your chest feel with a calm breath?"
      },
      {
        "id": "ref_2",
        "prompt": "Why do people listen more closely with eye contact?"
      },
      {
        "id": "ref_3",
        "prompt": "Who in your life speaks very clearly?"
      },
      {
        "id": "ref_4",
        "prompt": "How will you practice answering questions tomorrow?"
      }
    ]
  },
  {
    "id": "mod_c4_m02_s2",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 2,
    "monthTheme": "Speaking Up & Clear Communication",
    "sequenceNumber": 2,
    "globalIndex": 5,
    "category": "life_communication",
    "categoryLabel": "Communication & Confidence",
    "title": "Asking for Help When You Do Not Understand a Concept",
    "whyItMatters": "Asking questions when confused is a sign of bravery and intelligence, stopping small doubts from becoming big problems.",
    "learningObjectives": [
      "Identify when you are stuck or confused during a lesson",
      "Raise hand calmly and wait for teacher to acknowledge",
      "Phrase question specifically using \"Could you explain step 2 again?\"",
      "Listen carefully and express polite gratitude"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Arjun did not understand long division with remainders, but stayed silent because he thought everyone else knew. On the test, he left questions blank.",
    "explanation": "Nobody knows everything immediately. Saying \"Excuse me ma’am, could you show step 2 again?\" helps you and classmates who were also shy to ask.",
    "stepByStep": [
      "Notice when brain feels foggy or a step doesn’t make sense.",
      "Raise hand quietly without calling out or waving.",
      "When teacher calls on you, stand or speak clearly.",
      "State exactly what is confusing you rather than saying \"I don’t get anything.\"",
      "Say \"Thank you, that makes sense now\" when they help."
    ],
    "workedExample": {
      "title": "Arjun Asks About Fractions",
      "scenario": "Arjun is confused whether numerator is top or bottom number.",
      "steps": [
        "Arjun raises hand and waits for nod.",
        "Asks: \"Ma’am, could you remind me which is numerator—top or bottom?\"",
        "Teacher explains: \"N is North (top), D is Down (bottom).\"",
        "Arjun writes it down and says \"Thank you ma’am!\""
      ],
      "takeaway": "Specific questions get fast, helpful answers."
    },
    "commonMistakes": [
      {
        "mistake": "Saying \"I don’t understand anything at all\".",
        "correction": "Point to the exact sentence or step where you got stuck."
      },
      {
        "mistake": "Waiting until exam day to admit confusion.",
        "correction": "Ask during or right after class while topic is fresh."
      }
    ],
    "decisionChecklist": [
      "Did I identify the exact step that confused me?",
      "Did I raise hand politely without interrupting?",
      "Did I use respectful tone?",
      "Did I write down the answer?"
    ],
    "reflectionPrompt": "What was a question you were afraid to ask, and how did asking it help?",
    "summaryTakeaway": "Smart learners ask questions early; asking for help is the fastest way to master any new skill.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m02_s2_hero.webp",
      "altText": "Asking for Help When You Do Not Understand a Concept - Step by step life skill demonstration for Class 4",
      "description": "Student raising hand calmly in class with an attentive expression.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_02_2_a",
        "title": "Question Formulation Ladder",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m02_s2_diag1.webp",
        "altText": "Question Formulation Ladder",
        "caption": "I noticed -> I tried -> I got stuck at -> Could you explain step X?",
        "status": "ready"
      },
      {
        "id": "vis_c4_02_2_b",
        "title": "Polite Question Starters",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m02_s2_diag2.webp",
        "altText": "Polite Question Starters",
        "caption": "\"Could you please repeat...\", \"May I ask about...\", \"I did not follow step 3.\"",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "How to Ask Smart Questions in Class",
      "duration": "3 mins 05 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Student looking puzzled.",
          "narrationTranscript": "It's normal to feel stuck. Staying silent lets doubts grow."
        },
        {
          "scene": 2,
          "visualDescription": "Hand raised calmly.",
          "narrationTranscript": "Raise hand politely. Be specific about confusion."
        },
        {
          "scene": 3,
          "visualDescription": "Teacher explaining step with smile.",
          "narrationTranscript": "Teachers love questions! It shows you are thinking."
        }
      ],
      "practicalChallengeRecap": "Formulate one specific question today about a topic you want to understand."
    },
    "practicalActivity": {
      "title": "The Specific Question Roleplay Challenge",
      "objective": "Practice formulating and asking 3 specific questions.",
      "materials": [
        "Notebook",
        "Pen"
      ],
      "procedure": [
        "Write down 2 tricky things in schoolwork.",
        "Draft 1-sentence question for each: \"Could you please help me understand...?\"",
        "Ask parent or teacher one question.",
        "Write down answer in notebook."
      ],
      "expectedOutput": "Recorded question and answer pair verified by adult.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Do not interrupt someone while they are speaking.",
      "alternativeActivity": "Write question on sticky note and hand to teacher after class."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Stuck on Math problem #4 and do not know whether to add or multiply.",
        "choiceOptions": [
          {
            "option": "\"Excuse me ma’am, on question 4, should I multiply by boxes or add them?\"",
            "isOptimal": true,
            "reason": "Naming question number and decision point makes helping quick."
          },
          {
            "option": "Slam pencil down and say \"This homework is stupid!\"",
            "isOptimal": false,
            "reason": "Anger does not solve confusion and is disrespectful."
          },
          {
            "option": "Wait until submission tomorrow and leave blank.",
            "isOptimal": false,
            "reason": "Ignoring confusion leaves learning gaps."
          }
        ],
        "keyTakeaway": "Frame question with exact problem number and step."
      },
      "independentScenario": {
        "context": "Missed two days of school due to mild fever.",
        "challengePrompt": "Draft the polite message you will say to class teacher when you return.",
        "selfEvaluationRubric": "Mentioned absence politely, asked for missed chapter titles, offered to copy notes."
      }
    },
    "assessment": {
      "question": "Which is the most helpful way to ask your teacher for help with a word problem?",
      "contextScenario": "Stuck on Math question number 4.",
      "options": [
        {
          "id": "opt_1",
          "text": "\"Ma’am, I set up the addition, but I am not sure if I should subtract in the second step. Could you check?\"",
          "isCorrect": true,
          "feedback": "Correct! \"Ma’am, I set up the addition, but I am not sure if I should subtract in the second step. Could you check?\""
        },
        {
          "id": "opt_2",
          "text": "\"I can’t do Math.\"",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "\"Give me the final answer.\"",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Sit quietly and pretend you finished.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Review Question Formulation Ladder and practice phrasing specific requests."
    },
    "rubric": {
      "performanceTask": "Formulate and present a specific clarification question for a confusing scenario.",
      "masteryCriteria": "Points out specific step; uses respectful tone; listens actively to explanation.",
      "criteria": [
        {
          "criterion": "Specificity of Question",
          "weightPercentage": 40,
          "emerging": "\"I don't get anything.\"",
          "developing": "Identifies general subject.",
          "proficient": "Pinpoints exact step or word.",
          "exemplary": "Explains what was tried and frames precise query."
        },
        {
          "criterion": "Politeness & Timing",
          "weightPercentage": 35,
          "emerging": "Interrupts loudly.",
          "developing": "Asks abruptly.",
          "proficient": "Waits for pause, polite phrasing.",
          "exemplary": "Gracious timing, respectful posture, expresses gratitude."
        },
        {
          "criterion": "Note-Taking & Action",
          "weightPercentage": 25,
          "emerging": "Forgets immediately.",
          "developing": "Listens but writes nothing.",
          "proficient": "Notes key point in margin.",
          "exemplary": "Applies solution immediately to solve next problem."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Why do some students feel shy about asking questions?"
      },
      {
        "id": "ref_2",
        "prompt": "How did asking a question help someone else in class?"
      },
      {
        "id": "ref_3",
        "prompt": "Difference between asking for answer vs asking for explanation?"
      },
      {
        "id": "ref_4",
        "prompt": "How will you remind yourself that asking questions shows curiosity?"
      }
    ]
  },
  {
    "id": "mod_c4_m02_s3",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 2,
    "monthTheme": "Speaking Up & Clear Communication",
    "sequenceNumber": 3,
    "globalIndex": 6,
    "category": "life_communication",
    "categoryLabel": "Communication & Confidence",
    "title": "Introducing Yourself and Making a New Friend",
    "whyItMatters": "Knowing how to greet people, share your name, and ask a friendly question helps you make friends in school, parks, and sports teams.",
    "learningObjectives": [
      "Smile warmly and say a clear greeting like \"Hello, I am [Name]\"",
      "Ask an open, friendly question like \"Would you like to play catch?\"",
      "Listen attentively to the other person’s answer",
      "Remember and use their name politely during conversation"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "A new boy named Ishaan joined in July. He stood alone near the playground fence during recess because he did not know anyone yet.",
    "explanation": "Starting a friendship takes three simple things: a friendly smile, your name, and an invitation to do something together.",
    "stepByStep": [
      "Smile and approach person with calm, friendly posture.",
      "Say: \"Hi! My name is [Name]. Welcome to our class.\"",
      "Ask simple question: \"What game do you like playing during recess?\"",
      "Listen carefully to what they say without interrupting.",
      "Invite them to join: \"Would you like to play with us?\""
    ],
    "workedExample": {
      "title": "Rohan Welcomes Ishaan",
      "scenario": "Rohan sees Ishaan standing alone near swings.",
      "steps": [
        "Rohan walks over with football and smiles.",
        "Says: \"Hi, I’m Rohan! Are you new to Section B?\"",
        "Ishaan says: \"Yes, I just moved from Pune.\"",
        "Rohan says: \"Do you want to pass the ball with us?\"",
        "Ishaan’s face lights up and joins game."
      ],
      "takeaway": "A friendly greeting can turn a lonely recess into a lasting friendship."
    },
    "commonMistakes": [
      {
        "mistake": "Talking only about yourself without asking anything.",
        "correction": "Ask questions about games, books, or sports they enjoy and listen."
      },
      {
        "mistake": "Teasing someone about accent or new uniform.",
        "correction": "Always be welcoming and kind; remember how it feels to be new."
      }
    ],
    "decisionChecklist": [
      "Did I smile warmly before speaking?",
      "Did I share my name clearly?",
      "Did I ask friendly question about interests?",
      "Did I invite them to participate?"
    ],
    "reflectionPrompt": "Can you remember someone who was kind to you on your first day of school?",
    "summaryTakeaway": "A warm smile, your name, and a simple invitation can start a great friendship.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m02_s3_hero.webp",
      "altText": "Introducing Yourself and Making a New Friend - Step by step life skill demonstration for Class 4",
      "description": "Two children greeting each other with a warm smile on the school sports field.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_02_3_a",
        "title": "3-Step Friendship Bridge",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m02_s3_diag1.webp",
        "altText": "3-Step Friendship Bridge",
        "caption": "Step 1: Smile & Name -> Step 2: Friendly Question -> Step 3: Invitation.",
        "status": "ready"
      },
      {
        "id": "vis_c4_02_3_b",
        "title": "Great Icebreaker Questions",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m02_s3_diag2.webp",
        "altText": "Great Icebreaker Questions",
        "caption": "\"What sport do you like?\", \"Who is your favorite superhero?\", \"Do you read comics?\"",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "The 3-Step Friendship Formula",
      "duration": "3 mins 00 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "New student standing alone.",
          "narrationTranscript": "Taking the first step shows true leadership."
        },
        {
          "scene": 2,
          "visualDescription": "Demonstrating 3-step greeting formula.",
          "narrationTranscript": "Smile, say your name, and invite them to play."
        },
        {
          "scene": 3,
          "visualDescription": "Group laughing and playing.",
          "narrationTranscript": "Friendship starts with a single kind greeting."
        }
      ],
      "practicalChallengeRecap": "Greet someone you haven't spoken to yet this week with a warm smile."
    },
    "practicalActivity": {
      "title": "The 3-Step Friendship Handshake Practice",
      "objective": "Practice introducing yourself using 3-step method.",
      "materials": [
        "Partner or mirror"
      ],
      "procedure": [
        "Stand 3 feet apart with smile.",
        "Step 1: Greet and state name clearly.",
        "Step 2: Ask friendly question.",
        "Step 3: Listen and offer shared activity."
      ],
      "expectedOutput": "Demonstrated introduction signed off by caregiver or teacher.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Always practice introductions in safe supervised environments.",
      "alternativeActivity": "Write a warm welcome card for a new classmate or neighbor."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Classmate sitting alone during art whose colored pencils rolled under bench.",
        "choiceOptions": [
          {
            "option": "Walk over, help pick up pencils, say: \"Here you go! I’m Dev. What are you drawing?\"",
            "isOptimal": true,
            "reason": "Offering practical help followed by friendly question creates instant connection."
          },
          {
            "option": "Laugh at them for dropping pencils.",
            "isOptimal": false,
            "reason": "Laughing hurts feelings and makes classmates insecure."
          },
          {
            "option": "Walk past without saying anything.",
            "isOptimal": false,
            "reason": "Misses chance to make a good friend."
          }
        ],
        "keyTakeaway": "Kindness in small moments opens the door to friendship."
      },
      "independentScenario": {
        "context": "Join a new swimming or karate batch where you know no one.",
        "challengePrompt": "Write what you will say to student standing next to you.",
        "selfEvaluationRubric": "Included warm greeting, name, and interest question."
      }
    },
    "assessment": {
      "question": "What is the best way to invite a new classmate standing alone during games period?",
      "contextScenario": "Choosing teams for dodgeball.",
      "options": [
        {
          "id": "opt_1",
          "text": "Walk up with a smile, say \"Hi, I’m Zara. We have a spot on our team, would you like to play with us?\"",
          "isCorrect": true,
          "feedback": "Correct! Walk up with a smile, say \"Hi, I’m Zara. We have a spot on our team, would you like to play with us?\""
        },
        {
          "id": "opt_2",
          "text": "Stare from across field and whisper.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Tell them they can only watch from sidelines.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Ignore them.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Review 3-Step Friendship Bridge and practice inviting someone."
    },
    "rubric": {
      "performanceTask": "Roleplay introducing yourself to someone new and inviting them to an activity.",
      "masteryCriteria": "Warm smile; clear name introduction; open question asked; inclusive invitation offered.",
      "criteria": [
        {
          "criterion": "Greeting & Warmth",
          "weightPercentage": 40,
          "emerging": "Cold or distracted.",
          "developing": "Says name without smile.",
          "proficient": "Warm smile, friendly posture, clear introduction.",
          "exemplary": "Radiant warmth, excellent presence."
        },
        {
          "criterion": "Active Listening & Inquiry",
          "weightPercentage": 35,
          "emerging": "Talks only about self.",
          "developing": "Asks but interrupts answer.",
          "proficient": "Listens attentively to response.",
          "exemplary": "Builds conversation upon specific interest."
        },
        {
          "criterion": "Inclusivity & Follow-Through",
          "weightPercentage": 25,
          "emerging": "Walks away without inviting.",
          "developing": "Invites hesitantly.",
          "proficient": "Clear invitation to join games or lunch.",
          "exemplary": "Introduces new friend to wider group."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "How do you feel on your first day in a new place?"
      },
      {
        "id": "ref_2",
        "prompt": "Why is it harder to introduce yourself than to wait?"
      },
      {
        "id": "ref_3",
        "prompt": "What makes a question 'friendly' rather than intrusive?"
      },
      {
        "id": "ref_4",
        "prompt": "Who will you greet with a warm smile tomorrow?"
      }
    ]
  },
  {
    "id": "mod_c4_m03_s1",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 3,
    "monthTheme": "Understanding Money Basics",
    "sequenceNumber": 1,
    "globalIndex": 7,
    "category": "life_money_management",
    "categoryLabel": "Money Management & Financial Literacy",
    "title": "Identifying Indian Coins and Currency Notes (₹1 to ₹500)",
    "whyItMatters": "Recognizing currency notes, their security features, and values helps you understand prices and handle money responsibly.",
    "learningObjectives": [
      "Identify Indian coins: ₹1, ₹2, ₹5, ₹10, and ₹20",
      "Identify Mahatma Gandhi new series currency notes: ₹10, ₹20, ₹50, ₹100, ₹200, ₹500",
      "Recognize key features: Ashoka Pillar emblem, Reserve Bank of India text, rupee symbol ₹",
      "Understand that higher number values represent greater purchasing power"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Samar was sent to the bakery with a ₹100 note to buy bread for ₹40. He did not know how to verify if the note was ₹100 or ₹10.",
    "explanation": "Money in India is issued by the Reserve Bank of India. Each coin and note has a specific color, number, and size. Knowing currency protects against counting errors.",
    "stepByStep": [
      "Look at the large numeral printed on the front and back of the note.",
      "Notice the color: ₹10 is brown, ₹20 is greenish-yellow, ₹50 is cyan blue, ₹100 is lavender, ₹200 is bright orange, ₹500 is stone grey.",
      "Find the Mahatma Gandhi portrait in the center and the Rupee symbol ₹ next to the number.",
      "Check coins by reading the number stamped on the front and observing thickness.",
      "Never write on, tear, or crumple currency notes."
    ],
    "workedExample": {
      "title": "Sorting Notes in Samar’s Wallet",
      "scenario": "Samar has one ₹100, one ₹50, two ₹20s, and three ₹5 coins.",
      "steps": [
        "Stacks notes in order: ₹100 at back, ₹50 middle, ₹20s front.",
        "Counts coins: 3 x ₹5 = ₹15.",
        "Adds notes: 100 + 50 + 20 + 20 = 190.",
        "Total = ₹190 + ₹15 = ₹205."
      ],
      "takeaway": "Sorting money by value makes counting simple and accurate."
    },
    "commonMistakes": [
      {
        "mistake": "Confusing ₹10 note with ₹50 note in dim light.",
        "correction": "Always check the printed numeral and color carefully under good lighting."
      },
      {
        "mistake": "Writing pen marks or names on currency notes.",
        "correction": "It is illegal to deface Indian currency; keep notes flat and clean."
      }
    ],
    "decisionChecklist": [
      "Can I identify the printed number on both sides?",
      "Do I recognize colors of ₹10, ₹50, ₹100, ₹500 notes?",
      "Did I handle notes gently?",
      "Do I understand which note has higher value?"
    ],
    "reflectionPrompt": "Why do you think currency notes have different colors and sizes for each value?",
    "summaryTakeaway": "Knowing Indian coins and notes helps you shop accurately and treat money with care.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m03_s1_hero.webp",
      "altText": "Identifying Indian Coins and Currency Notes (₹1 to ₹500) - Step by step life skill demonstration for Class 4",
      "description": "Display of Indian currency notes and coins arranged by value.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_03_1_a",
        "title": "Indian Currency Palette",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m03_s1_diag1.webp",
        "altText": "Indian Currency Palette",
        "caption": "₹10 brown, ₹50 cyan, ₹100 lavender, ₹200 orange, ₹500 stone grey.",
        "status": "ready"
      },
      {
        "id": "vis_c4_03_1_b",
        "title": "Security Features Quick Check",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m03_s1_diag2.webp",
        "altText": "Security Features Quick Check",
        "caption": "Gandhi portrait, RBI text, Ashoka emblem, clear numeral.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Know Your Indian Currency: Coins and Notes",
      "duration": "3 mins 30 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Close-up of Indian coins and colorful notes.",
          "narrationTranscript": "Each Indian note has unique colors and numbers."
        },
        {
          "scene": 2,
          "visualDescription": "Comparing ₹10 vs ₹100 notes.",
          "narrationTranscript": "Check the numeral and security strip carefully."
        },
        {
          "scene": 3,
          "visualDescription": "Neat wallet organization.",
          "narrationTranscript": "Keep notes flat and sorted by value."
        }
      ],
      "practicalChallengeRecap": "Inspect sample notes with an adult and identify 3 key security features."
    },
    "practicalActivity": {
      "title": "Play-Money Currency Sorting Workshop",
      "objective": "Identify, sort, and calculate total value of a sample set of coins and notes.",
      "materials": [
        "Play currency or clean notes with adult"
      ],
      "procedure": [
        "Gather 5 different denominations.",
        "Arrange from smallest to largest value.",
        "Identify color and numeral.",
        "Calculate combined total."
      ],
      "expectedOutput": "Completed currency identification card signed by adult.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Wash hands after handling real circulating coins and notes.",
      "alternativeActivity": "Draw and color replicas of ₹10, ₹50, and ₹100 notes."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "You receive a shiny coin stamped with numeral 10.",
        "choiceOptions": [
          {
            "option": "Check the ₹10 numeral and two-toned ring, knowing it equals ten 1-rupee coins.",
            "isOptimal": true,
            "reason": "Recognizing 10-rupee coin prevents confusing it with smaller coins."
          },
          {
            "option": "Assume all coins are only worth 1 rupee.",
            "isOptimal": false,
            "reason": "Coins have different values stamped clearly on face."
          },
          {
            "option": "Refuse the coin thinking only paper notes are real money.",
            "isOptimal": false,
            "reason": "Coins are official legal tender in India."
          }
        ],
        "keyTakeaway": "Coins are durable official currency with stamped numerical values."
      },
      "independentScenario": {
        "context": "Your piggy bank has five ₹10 coins, three ₹20 notes, and one ₹50 note.",
        "challengePrompt": "Calculate the total money step-by-step.",
        "selfEvaluationRubric": "Correctly calculated: 50 + 60 + 50 = ₹160 total."
      }
    },
    "assessment": {
      "question": "Which color is the new Mahatma Gandhi series ₹100 currency note?",
      "contextScenario": "Helping check change from the grocery store.",
      "options": [
        {
          "id": "opt_1",
          "text": "Lavender (light purple)",
          "isCorrect": true,
          "feedback": "Correct! Lavender (light purple)"
        },
        {
          "id": "opt_2",
          "text": "Bright green",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Dark black",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Bright red",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Review the Indian Currency Palette infographic."
    },
    "rubric": {
      "performanceTask": "Accurately identify and calculate values of 5 mixed currency notes and coins.",
      "masteryCriteria": "100% accurate identification of denomination, color, and sum calculation.",
      "criteria": [
        {
          "criterion": "Denomination Identification",
          "weightPercentage": 40,
          "emerging": "Confuses denominations.",
          "developing": "Identifies notes but confuses coins.",
          "proficient": "Identifies all 5 correctly.",
          "exemplary": "Identifies denominations and security features."
        },
        {
          "criterion": "Sum Calculation",
          "weightPercentage": 35,
          "emerging": "Calculation errors.",
          "developing": "Slow with multiple attempts.",
          "proficient": "Accurate addition on first try.",
          "exemplary": "Fast mental addition using grouping."
        },
        {
          "criterion": "Care of Currency",
          "weightPercentage": 25,
          "emerging": "Crumples notes.",
          "developing": "Handles loosely.",
          "proficient": "Keeps notes flat and organized.",
          "exemplary": "Sorts by value facing same direction."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Why is it important to wash hands after handling money?"
      },
      {
        "id": "ref_2",
        "prompt": "What symbol appears next to the number on all modern notes?"
      },
      {
        "id": "ref_3",
        "prompt": "How does knowing currency help you shop independently?"
      },
      {
        "id": "ref_4",
        "prompt": "Why should we never draw or write on paper money?"
      }
    ]
  },
  {
    "id": "mod_c4_m03_s2",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 3,
    "monthTheme": "Understanding Money Basics",
    "sequenceNumber": 2,
    "globalIndex": 8,
    "category": "life_money_management",
    "categoryLabel": "Money Management & Financial Literacy",
    "title": "Calculating Simple Change at a Local Neighborhood Store",
    "whyItMatters": "Checking your change ensures you receive the correct money back when paying with a larger currency note.",
    "learningObjectives": [
      "Identify item cost from price tag or label",
      "Calculate change by subtracting item cost from cash given",
      "Count change returned before leaving counter",
      "Politely inform shopkeeper if change is incorrect"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Tanvi bought a notebook for ₹35, gave a ₹50 note, and was handed a ₹10 coin. She walked out without checking and lost ₹5.",
    "explanation": "Change = Money Given minus Cost of Item. In Tanvi’s case: ₹50 - ₹35 = ₹15. Counting change at the counter protects your money and resolves honest mistakes instantly.",
    "stepByStep": [
      "Check price before taking item to counter.",
      "Calculate in head: Change = Cash Given - Price.",
      "Hand cash and wait calmly.",
      "Count coins and notes in palm before pocketing.",
      "If mistaken, say politely: \"Excuse me bhaiya, change should be ₹15.\""
    ],
    "workedExample": {
      "title": "Tanvi Checks Her Change",
      "scenario": "Tanvi pays ₹50 for a ₹35 notebook.",
      "steps": [
        "Counts up from 35 to 50: 35 + 5 = 40, 40 + 10 = 50 (Total ₹15).",
        "Shopkeeper hands ₹10 coin and ₹5 coin.",
        "Tanvi counts: 10 + 5 = 15.",
        "Smiles and pockets change."
      ],
      "takeaway": "Counting up from price to amount paid is the quickest way to verify change."
    },
    "commonMistakes": [
      {
        "mistake": "Rushing out and counting change on the street.",
        "correction": "Always count change right at the shop counter."
      },
      {
        "mistake": "Getting angry if change is wrong.",
        "correction": "Point out mistakes calmly and politely."
      }
    ],
    "decisionChecklist": [
      "Do I know exact price?",
      "Did I calculate expected change?",
      "Did I count coins in hand?",
      "Did I say thank you?"
    ],
    "reflectionPrompt": "Why is it better to check change at the counter rather than after reaching home?",
    "summaryTakeaway": "Always calculate change before paying and count it in your palm before leaving the counter.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m03_s2_hero.webp",
      "altText": "Calculating Simple Change at a Local Neighborhood Store - Step by step life skill demonstration for Class 4",
      "description": "Child counting coins carefully at a neighborhood stationery counter.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_03_2_a",
        "title": "Count-Up Method for Change",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m03_s2_diag1.webp",
        "altText": "Count-Up Method for Change",
        "caption": "Start at cost -> add coins to next ten -> add tens to cash given.",
        "status": "ready"
      },
      {
        "id": "vis_c4_03_2_b",
        "title": "Counter Verification Etiquette",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m03_s2_diag2.webp",
        "altText": "Counter Verification Etiquette",
        "caption": "Stay at counter, count in palm, speak politely if mismatch.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Smart Shopper: How to Check Your Change",
      "duration": "3 mins 10 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Child handing ₹50 note for ₹35 item.",
          "narrationTranscript": "Calculate before you pay: 50 minus 35 is 15."
        },
        {
          "scene": 2,
          "visualDescription": "Counting coins in palm at counter.",
          "narrationTranscript": "Count in your hand before stepping away."
        },
        {
          "scene": 3,
          "visualDescription": "Polite clarification with shopkeeper.",
          "narrationTranscript": "A calm, polite correction fixes any honest mistake."
        }
      ],
      "practicalChallengeRecap": "Practice the count-up method on 3 sample purchases today."
    },
    "practicalActivity": {
      "title": "Mock Kitchen Grocery Checkout",
      "objective": "Practice buying 3 items using play money and calculating correct change.",
      "materials": [
        "3 household items",
        "Play currency",
        "Price tags"
      ],
      "procedure": [
        "Label items: Soap ₹25, Biscuits ₹30, Pen ₹15.",
        "Use ₹50 or ₹100 note to buy each.",
        "Calculate change in notebook.",
        "Have partner verify calculations."
      ],
      "expectedOutput": "Completed math change calculation sheet showing 3 correct transactions.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Keep play money separate from real household money.",
      "alternativeActivity": "Check receipt and change together next time you visit a local market with parents."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "You buy a bottle of glue for ₹18 and pay with a ₹20 note.",
        "choiceOptions": [
          {
            "option": "Expect ₹2 change and verify you receive two ₹1 coins or one ₹2 coin.",
            "isOptimal": true,
            "reason": "₹20 - ₹18 = ₹2 exactly."
          },
          {
            "option": "Expect ₹5 change.",
            "isOptimal": false,
            "reason": "Incorrect subtraction."
          },
          {
            "option": "Leave without taking any coins because ₹2 seems small.",
            "isOptimal": false,
            "reason": "Every rupee matters; saving small change builds savings."
          }
        ],
        "keyTakeaway": "Exact change calculation ensures financial accuracy."
      },
      "independentScenario": {
        "context": "You buy 2 sketch pens at ₹12 each and give a ₹50 note.",
        "challengePrompt": "Calculate total cost and exact change step-by-step.",
        "selfEvaluationRubric": "Total cost 12 x 2 = ₹24; Change 50 - 24 = ₹26."
      }
    },
    "assessment": {
      "question": "If you buy an eraser for ₹8 and give the shopkeeper a ₹20 note, how much change should you receive?",
      "contextScenario": "Calculating change at school stationery counter.",
      "options": [
        {
          "id": "opt_1",
          "text": "₹12 (one ₹10 coin and one ₹2 coin)",
          "isCorrect": true,
          "feedback": "Correct! ₹12 (one ₹10 coin and one ₹2 coin)"
        },
        {
          "id": "opt_2",
          "text": "₹8",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "₹15",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "₹2",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Use count-up method: 8 + 2 = 10, 10 + 10 = 20 (Total ₹12)."
    },
    "rubric": {
      "performanceTask": "Calculate and verify change across 3 simulated grocery transactions.",
      "masteryCriteria": "100% accuracy in mental subtraction and physical coin counting at counter.",
      "criteria": [
        {
          "criterion": "Mental Calculation Accuracy",
          "weightPercentage": 40,
          "emerging": "Incorrect subtraction.",
          "developing": "Requires pencil and paper.",
          "proficient": "Accurate mental subtraction.",
          "exemplary": "Fast mental count-up method."
        },
        {
          "criterion": "Counter Verification Habit",
          "weightPercentage": 35,
          "emerging": "Pockets money without looking.",
          "developing": "Counts only after leaving.",
          "proficient": "Counts coins in palm at counter.",
          "exemplary": "Systematic coin and note count."
        },
        {
          "criterion": "Polite Communication",
          "weightPercentage": 25,
          "emerging": "Rude or silent.",
          "developing": "Hesitant.",
          "proficient": "Polite request if correction needed.",
          "exemplary": "Courteous greeting and thank you."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Why do shopkeepers appreciate customers who know the price?"
      },
      {
        "id": "ref_2",
        "prompt": "How does the count-up method prevent subtraction errors?"
      },
      {
        "id": "ref_3",
        "prompt": "What should you do if you realize change is short after walking away?"
      },
      {
        "id": "ref_4",
        "prompt": "How can you keep small change organized in your pocket?"
      }
    ]
  },
  {
    "id": "mod_c4_m03_s3",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 3,
    "monthTheme": "Understanding Money Basics",
    "sequenceNumber": 3,
    "globalIndex": 9,
    "category": "life_money_management",
    "categoryLabel": "Money Management & Financial Literacy",
    "title": "Needs vs. Wants: Sorting Grocery and Toy Choices",
    "whyItMatters": "Understanding the difference between what you truly need to live and learn versus what is nice to have helps you make smart spending choices.",
    "learningObjectives": [
      "Define a \"Need\": essential for health, safety, food, shelter, and school",
      "Define a \"Want\": fun or desirable, but you can live comfortably without it",
      "Categorize 10 common household and school items into Needs or Wants",
      "Recognize that buying needs first prevents money shortages later"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Aditya had ₹100 given for school notebooks. At the shop, he saw a flashy spinning top for ₹90. He bought the toy, but then could not buy the notebook required for class.",
    "explanation": "Money is limited, but desires are endless. A Need is essential: water, food, uniform, notebooks. A Want is fun: video games, fancy stickers, extra toys. Smart people buy needs first and save for wants.",
    "stepByStep": [
      "Before buying, pause and ask: \"What happens if I don’t buy this today?\"",
      "If answer is \"I will be hungry, sick, or cannot do schoolwork\", it is a NEED.",
      "If answer is \"It just looks fun\", it is a WANT.",
      "Check if you fulfilled all essential needs first.",
      "If it is a want, decide if you can save for it over time."
    ],
    "workedExample": {
      "title": "Aditya’s Shopping Cart Sort",
      "scenario": "Aditya has ₹200. Lists: Notebook (₹50), Apple (₹30), Action figure (₹180).",
      "steps": [
        "Notebook = NEED (school).",
        "Apple = NEED (health).",
        "Action figure = WANT (toy).",
        "Needs = ₹80.",
        "Buys needs for ₹80 and saves remaining ₹120 toward toy."
      ],
      "takeaway": "Needs come first. Leftover money can be saved toward exciting wants."
    },
    "commonMistakes": [
      {
        "mistake": "Calling everything you really like a \"Need\".",
        "correction": "Strong desire does not make something a survival requirement."
      },
      {
        "mistake": "Spending lunch or bus money on candy.",
        "correction": "Never spend money allocated for safety or food on entertainment."
      }
    ],
    "decisionChecklist": [
      "Is this necessary for school, health, or safety?",
      "Can I learn and stay healthy without it today?",
      "Have essential needs been paid first?",
      "Am I buying on impulse or thoughtful plan?"
    ],
    "reflectionPrompt": "Think of one item you bought recently. Was it a Need or a Want? Do you still use it?",
    "summaryTakeaway": "Take care of your needs first; saving for your wants makes enjoying them even sweeter.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m03_s3_hero.webp",
      "altText": "Needs vs. Wants: Sorting Grocery and Toy Choices - Step by step life skill demonstration for Class 4",
      "description": "Balance scale showing essential apple and notebook balancing against a toy robot.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_03_3_a",
        "title": "The Needs vs Wants Filter",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m03_s3_diag1.webp",
        "altText": "The Needs vs Wants Filter",
        "caption": "Need = Health, Safety, Education. Want = Entertainment, Upgrades, Treats.",
        "status": "ready"
      },
      {
        "id": "vis_c4_03_3_b",
        "title": "The 24-Hour Want Rule",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m03_s3_diag2.webp",
        "altText": "The 24-Hour Want Rule",
        "caption": "Wait 24 hours before buying a want to see if you still desire it.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Needs vs Wants: The Smart Money Filter",
      "duration": "3 mins 20 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Student deciding between notebook and flashy toy.",
          "narrationTranscript": "Money is limited. How do we choose wisely?"
        },
        {
          "scene": 2,
          "visualDescription": "Needs pyramid: food, health, school supplies.",
          "narrationTranscript": "Needs keep us healthy and learning. They come first."
        },
        {
          "scene": 3,
          "visualDescription": "Savings jar accumulating coins for a want.",
          "narrationTranscript": "Save for wants patiently. It feels amazing when you earn it."
        }
      ],
      "practicalChallengeRecap": "Identify 3 needs and 3 wants in your room today."
    },
    "practicalActivity": {
      "title": "The Needs vs. Wants Home Audit",
      "objective": "Audit 10 items in your room or bag and categorize each into Needs or Wants.",
      "materials": [
        "Notebook",
        "Pen"
      ],
      "procedure": [
        "Draw two-column chart: Needs vs Wants.",
        "List 5 items from bag and 5 from room.",
        "Write 1-sentence reason next to each.",
        "Discuss chart with parent."
      ],
      "expectedOutput": "Completed 10-item classification chart signed by caregiver.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Be honest about entertainment items.",
      "alternativeActivity": "Sort items in a grocery shopping list before accompanying parents to market."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "You have ₹60. You need a geometry box for Math exam (₹45) and want chocolate bar (₹30).",
        "choiceOptions": [
          {
            "option": "Buy the geometry box for ₹45 and save the remaining ₹15 in your piggy bank.",
            "isOptimal": true,
            "reason": "Geometry box is essential for your school exam; chocolate is an optional treat."
          },
          {
            "option": "Buy chocolate bar and borrow someone else’s geometry tools during exam.",
            "isOptimal": false,
            "reason": "Borrowing during an exam causes panic and is often prohibited."
          },
          {
            "option": "Buy both by asking shopkeeper for a loan.",
            "isOptimal": false,
            "reason": "Never borrow money or take debt for unnecessary treats."
          }
        ],
        "keyTakeaway": "Prioritizing school needs ensures academic success."
      },
      "independentScenario": {
        "context": "Your sports shoes have holes in the soles, and a new comic book just released.",
        "challengePrompt": "Classify both items and explain which should be purchased first.",
        "selfEvaluationRubric": "Classified shoes as Need and comic as Want; explained safety and school requirement."
      }
    },
    "assessment": {
      "question": "Which of the following items is an essential NEED for a Class 4 student?",
      "contextScenario": "Preparing for new school term.",
      "options": [
        {
          "id": "opt_1",
          "text": "A geometry ruler and pencil for drawing diagrams in Math",
          "isCorrect": true,
          "feedback": "Correct! A geometry ruler and pencil for drawing diagrams in Math"
        },
        {
          "id": "opt_2",
          "text": "A mechanical pencil that lights up and plays music",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "A pack of 50 cartoon sticker sheets",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "A third pair of sports sneakers in neon color",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Review Needs vs Wants Filter: educational tools take precedence over decorative novelties."
    },
    "rubric": {
      "performanceTask": "Categorize and justify 10 diverse everyday expenditure items into Needs and Wants.",
      "masteryCriteria": "100% accurate classification with logical justifications based on health, safety, and school.",
      "criteria": [
        {
          "criterion": "Classification Accuracy",
          "weightPercentage": 40,
          "emerging": "<6 correct.",
          "developing": "7-8 correct.",
          "proficient": "9-10 correct with sound reasoning.",
          "exemplary": "10/10 with mature explanations."
        },
        {
          "criterion": "Understanding of Scarcity",
          "weightPercentage": 35,
          "emerging": "Assumes money is infinite.",
          "developing": "Recognizes limits but prioritizes wants.",
          "proficient": "Prioritizes needs before allocating wants.",
          "exemplary": "Demonstrates deferred gratification."
        },
        {
          "criterion": "Practical Application",
          "weightPercentage": 25,
          "emerging": "Cannot apply to personal life.",
          "developing": "Applies only with prompting.",
          "proficient": "Applies independently to personal budget.",
          "exemplary": "Creates actionable savings goal for a want."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Why is it easy to confuse a strong want with a need?"
      },
      {
        "id": "ref_2",
        "prompt": "How does advertising make us feel like wants are needs?"
      },
      {
        "id": "ref_3",
        "prompt": "What happens if a family spends all money on wants first?"
      },
      {
        "id": "ref_4",
        "prompt": "What want are you currently saving money to buy?"
      }
    ]
  },
  {
    "id": "mod_c4_m04_s1",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 4,
    "monthTheme": "Safety at Home, School & on the Road",
    "sequenceNumber": 1,
    "globalIndex": 10,
    "category": "life_safety_health",
    "categoryLabel": "Safety, Health & Well-being",
    "title": "Crossing the Road Safely & Understanding Zebra Crossings",
    "whyItMatters": "Mastering safe pedestrian rules keeps you safe from moving traffic and protects your life on the way to school and back.",
    "learningObjectives": [
      "Identify safe crossing zones: Zebra crossings, pedestrian bridges, and traffic signals",
      "Practice the Stop-Look-Listen-Think pedestrian sequence",
      "Make direct eye contact with waiting drivers before stepping onto the road",
      "Never run, dart between parked cars, or use a mobile screen while walking"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Vikram saw his friend on the other side of a busy street and dashed across without stopping. A motorcycle braked sharply, honking loudly, missing Vikram by inches.",
    "explanation": "Cars and buses cannot stop instantly; they need distance to brake. Walking onto the road without checking is dangerous. Crossing at zebra crossings and looking both ways gives drivers time to see you and stop safely.",
    "stepByStep": [
      "Stop on the footpath curb one full step back from the road.",
      "Look right, look left, and look right again for approaching vehicles.",
      "Listen carefully for vehicle horns, engine noises, and turning cars.",
      "When traffic is clear or red pedestrian signal lights up, walk forward at a brisk, steady pace.",
      "Keep looking left and right while crossing; never look down at your shoes or a phone."
    ],
    "workedExample": {
      "title": "Pooja Crosses at the Zebra Marking",
      "scenario": "Pooja reaches the school crossing where an auto-rickshaw is slowing down.",
      "steps": [
        "Pooja stops at the curb and looks right.",
        "She catches the rickshaw driver’s eye and sees him stop.",
        "She checks left for turning scooters.",
        "She walks briskly across the white zebra lines.",
        "She reaches the opposite footpath safely."
      ],
      "takeaway": "Eye contact with drivers ensures they have truly seen you and stopped."
    },
    "commonMistakes": [
      {
        "mistake": "Running across the road thinking it is safer because it is faster.",
        "correction": "Running increases the risk of tripping and falling in traffic; walk briskly with calm awareness."
      },
      {
        "mistake": "Crossing from behind a large stationary bus or truck.",
        "correction": "Never step out from blind spots; walk to an open crossing where you can see and be seen."
      }
    ],
    "decisionChecklist": [
      "Am I at a zebra crossing or safe intersection?",
      "Did I do Look-Right, Look-Left, Look-Right?",
      "Did vehicles stop completely before I stepped onto the road?",
      "Did I walk without looking at any screen or phone?"
    ],
    "reflectionPrompt": "Why is listening just as important as looking when crossing a road?",
    "summaryTakeaway": "Stop, Look, Listen, and Think: four words that protect your life every time you step near a road.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m04_s1_hero.webp",
      "altText": "Crossing the Road Safely & Understanding Zebra Crossings - Step by step life skill demonstration for Class 4",
      "description": "Child holding adult’s hand crossing safely over bright white zebra stripes.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_04_1_a",
        "title": "The 4-Step Crossing Sequence",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m04_s1_diag1.webp",
        "altText": "The 4-Step Crossing Sequence",
        "caption": "Stop at curb -> Look Right -> Look Left -> Look Right -> Walk briskly.",
        "status": "ready"
      },
      {
        "id": "vis_c4_04_1_b",
        "title": "Pedestrian Danger Zones",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m04_s1_diag2.webp",
        "altText": "Pedestrian Danger Zones",
        "caption": "Blind spots behind parked buses, turning corners, reversing cars.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Road Safety Hero: The Zebra Crossing Rule",
      "duration": "3 mins 15 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Busy city traffic with speeding cars.",
          "narrationTranscript": "Roads are busy. How do we cross safely?"
        },
        {
          "scene": 2,
          "visualDescription": "Child demonstrating Stop-Look-Listen-Think.",
          "narrationTranscript": "Stop at the curb. Look right, left, and right again."
        },
        {
          "scene": 3,
          "visualDescription": "Walking briskly across zebra stripes.",
          "narrationTranscript": "Walk with confidence, head up, eyes alert."
        }
      ],
      "practicalChallengeRecap": "Practice the Look-Right, Look-Left sequence with a parent at your next road crossing."
    },
    "practicalActivity": {
      "title": "Neighborhood Pedestrian Safety Walk",
      "objective": "Map out the safest pedestrian route from home to the local park or school bus stop.",
      "materials": [
        "Notebook",
        "Colored sketch pens"
      ],
      "procedure": [
        "Walk your daily school route with an adult.",
        "Identify all zebra crossings, footpaths, and blind spots.",
        "Draw a simple safety map marking safe crossing points with green stars.",
        "Pin the map near your front door."
      ],
      "expectedOutput": "A hand-drawn pedestrian safety route map verified by a parent.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Never conduct road audits alone; always walk with an adult.",
      "alternativeActivity": "Identify pedestrian traffic signs from an illustrated chart."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "You need to cross a two-lane road. A ball bounces onto the street.",
        "choiceOptions": [
          {
            "option": "Stop at the curb, let the ball roll, look for traffic, and ask an adult for help if needed.",
            "isOptimal": true,
            "reason": "A toy can always be replaced; your physical safety is irreplaceable."
          },
          {
            "option": "Sprint onto the road instantly to grab the ball before a car flattens it.",
            "isOptimal": false,
            "reason": "Darting into traffic is the leading cause of pedestrian accidents."
          },
          {
            "option": "Close your eyes and run blindly.",
            "isOptimal": false,
            "reason": "Extremely dangerous and reckless."
          }
        ],
        "keyTakeaway": "Never chase a ball or pet into the street."
      },
      "independentScenario": {
        "context": "The traffic signal turns green for vehicles, but an elderly person is halfway across.",
        "challengePrompt": "Explain what drivers and pedestrians should do in this situation.",
        "selfEvaluationRubric": "Mentioned waiting patiently until the pedestrian reaches the curb safely."
      }
    },
    "assessment": {
      "question": "What is the correct looking sequence before stepping onto a road in India?",
      "contextScenario": "Standing at the edge of the footpath.",
      "options": [
        {
          "id": "opt_1",
          "text": "Look right, look left, and look right again.",
          "isCorrect": true,
          "feedback": "Correct! Look right, look left, and look right again."
        },
        {
          "id": "opt_2",
          "text": "Look straight at your shoes and run fast.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Look only to the left because cars come from that side.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Honk a whistle and jump onto the road.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Remember: In India, traffic drives on the left, so vehicles closest to you approach from your right."
    },
    "rubric": {
      "performanceTask": "Demonstrate safe road-crossing protocols during a supervised outdoor walk.",
      "masteryCriteria": "Executes Stop-Look-Listen sequence flawlessly, checks blind spots, walks briskly.",
      "criteria": [
        {
          "criterion": "Curb Discipline & Stopping",
          "weightPercentage": 40,
          "emerging": "Steps onto road without stopping.",
          "developing": "Stops only when reminded.",
          "proficient": "Stops one step back from curb independently.",
          "exemplary": "Proactively identifies safest crossing point."
        },
        {
          "criterion": "Visual & Auditory Scanning",
          "weightPercentage": 35,
          "emerging": "Glances in one direction only.",
          "developing": "Looks both ways quickly without pausing.",
          "proficient": "Complete Right-Left-Right scan and listens.",
          "exemplary": "Makes deliberate eye contact with drivers."
        },
        {
          "criterion": "Crossing Pace & Focus",
          "weightPercentage": 25,
          "emerging": "Runs or looks at phone.",
          "developing": "Walks too slowly while distracted.",
          "proficient": "Walks briskly and alertly across.",
          "exemplary": "Continuous vigilance until reaching opposite curb."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Why do we look right first in India?"
      },
      {
        "id": "ref_2",
        "prompt": "What should you do if an approaching car doesn't slow down at a zebra crossing?"
      },
      {
        "id": "ref_3",
        "prompt": "How can you help a younger sibling stay safe near traffic?"
      },
      {
        "id": "ref_4",
        "prompt": "Why should we avoid wearing headphones while walking on the street?"
      }
    ]
  },
  {
    "id": "mod_c4_m04_s2",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 4,
    "monthTheme": "Safety at Home, School & on the Road",
    "sequenceNumber": 2,
    "globalIndex": 11,
    "category": "life_safety_health",
    "categoryLabel": "Safety, Health & Well-being",
    "title": "Personal Boundaries: Safe Touch, Unsafe Touch & Saying \"No\"",
    "whyItMatters": "Understanding that your body belongs to you gives you the confidence to protect personal boundaries and speak up immediately to trusted adults.",
    "learningObjectives": [
      "Understand the \"Swimsuit Rule\": parts covered by a swimsuit are private",
      "Distinguish Safe Touch (warm hug from parents, high-five) from Unsafe/Confusing Touch",
      "Practice the 3-step boundary defense: Say NO, Run away, Tell a trusted adult",
      "Identify at least 3 trusted adults you can talk to if anyone makes you feel uncomfortable"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "An older neighbor asked Kabir to sit on his lap and told him, \"Don’t tell your mummy, it’s our little secret.\" Kabir felt an uncomfortable knot in his stomach.",
    "explanation": "Your body belongs to you. Nobody has the right to touch your private parts or ask you to touch theirs. Good secrets are fun surprises (like a birthday party). Bad secrets make you feel scared, guilty, or uneasy. You must NEVER keep a bad secret.",
    "stepByStep": [
      "Trust your body’s warning feelings: fluttering tummy, racing heart, or feeling scared.",
      "If someone touches you uncomfortably or asks you to keep a secret, say a loud, firm: \"NO! STOP!\"",
      "Move away immediately toward a bright, public area.",
      "Tell a trusted adult right away (mother, father, favorite teacher, school counselor).",
      "Keep telling trusted adults until someone takes action and protects you."
    ],
    "workedExample": {
      "title": "Kabir Tells His Mother",
      "scenario": "Kabir remembered the rule: No secrets that make you feel uncomfortable.",
      "steps": [
        "Kabir stood up from the neighbor and said: \"I need to go home now.\"",
        "He walked directly into his house.",
        "He told his mother: \"Mummy, uncle asked me to keep a secret that felt bad.\"",
        "His mother hugged him and said: \"You did the right thing by telling me immediately.\""
      ],
      "takeaway": "Telling a trusted adult is brave and keeps you safe. You are never in trouble for reporting."
    },
    "commonMistakes": [
      {
        "mistake": "Believing threats like \"If you tell anyone, your parents will be angry with you.\"",
        "correction": "Threats are lies used by unsafe people; parents love you and will always protect you."
      },
      {
        "mistake": "Staying silent because the person is someone you know or a family acquaintance.",
        "correction": "The boundary rule applies to everyone, whether a stranger or someone familiar."
      }
    ],
    "decisionChecklist": [
      "Do I understand that my body belongs to me?",
      "Do I know my 3 trusted adults?",
      "Do I remember the 3 steps: Say NO, Get Away, Tell an Adult?",
      "Do I know that unsafe touches are never my fault?"
    ],
    "reflectionPrompt": "Who are 3 adults in your life who make you feel completely safe and heard?",
    "summaryTakeaway": "Your body is your personal territory. You have the right to say a firm \"NO\" and tell a trusted adult anytime.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m04_s2_hero.webp",
      "altText": "Personal Boundaries: Safe Touch, Unsafe Touch & Saying \"No\" - Step by step life skill demonstration for Class 4",
      "description": "Child holding hand up in a firm stop gesture with a confident, safe expression.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_04_2_a",
        "title": "The Safe Boundary Circle",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m04_s2_diag1.webp",
        "altText": "The Safe Boundary Circle",
        "caption": "Public areas vs Private zones protected by the swimsuit rule.",
        "status": "ready"
      },
      {
        "id": "vis_c4_04_2_b",
        "title": "The 3-Step Safety Shield",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m04_s2_diag2.webp",
        "altText": "The 3-Step Safety Shield",
        "caption": "Step 1: Say NO firmly -> Step 2: Get Away -> Step 3: Tell a Trusted Adult.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "My Body Belongs to Me: Safe Boundaries",
      "duration": "3 mins 30 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Illustration of personal space bubble around child.",
          "narrationTranscript": "Every person has a personal space bubble that must be respected."
        },
        {
          "scene": 2,
          "visualDescription": "Swimsuit rule infographic.",
          "narrationTranscript": "Private parts are private. Safe touch makes you feel loved and secure."
        },
        {
          "scene": 3,
          "visualDescription": "Child talking openly to parents.",
          "narrationTranscript": "Never keep unsafe secrets. Tell a trusted adult right away."
        }
      ],
      "practicalChallengeRecap": "Write down your 3 Trusted Adults in your notebook today."
    },
    "practicalActivity": {
      "title": "My 5-Finger Trusted Adults Hand Chart",
      "objective": "Draw your hand outline and write the name and contact of one trusted adult on each finger.",
      "materials": [
        "Paper",
        "Colors",
        "Pencil"
      ],
      "procedure": [
        "Trace your hand on a blank sheet.",
        "On thumb: write Parent 1.",
        "On index: write Parent 2.",
        "On middle: write Favorite Teacher.",
        "On ring and pinky: write School Counselor and Grandparent.",
        "Decorate with colors and keep on study desk."
      ],
      "expectedOutput": "A completed 5-Finger Safety Network chart.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Ensure every person listed is someone who listens patiently and protects you.",
      "alternativeActivity": "Discuss boundary safety scenarios aloud with a parent or school counselor."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "A stranger at the park gate offers you chocolate if you come to his car to see his cute puppy.",
        "choiceOptions": [
          {
            "option": "Step back, say a loud \"NO!\", and immediately run to the playground supervisor or your parent.",
            "isOptimal": true,
            "reason": "Strangers using treats or animals to lure children away are dangerous."
          },
          {
            "option": "Go take a quick look at the puppy because you love dogs.",
            "isOptimal": false,
            "reason": "Never accompany an unknown adult anywhere without explicit parent permission."
          },
          {
            "option": "Take the chocolate and eat it silently.",
            "isOptimal": false,
            "reason": "Never accept unsealed food from strangers."
          }
        ],
        "keyTakeaway": "Never go anywhere with someone you do not know, no matter what they offer."
      },
      "independentScenario": {
        "context": "An older student on the school bus insists on tickling you even after you asked them to stop.",
        "challengePrompt": "Describe what you will say loudly and who on the bus you will inform immediately.",
        "selfEvaluationRubric": "Mentioned saying \"Stop touching me!\", moving seats, and informing the bus conductor or teacher."
      }
    },
    "assessment": {
      "question": "What is the most important difference between a good secret and an unsafe secret?",
      "contextScenario": "Evaluating a situation where someone says \"Don’t tell your parents.\"",
      "options": [
        {
          "id": "opt_1",
          "text": "Good secrets are happy surprises that are revealed soon; unsafe secrets make you feel scared, uneasy, or guilty.",
          "isCorrect": true,
          "feedback": "Correct! Good secrets are happy surprises that are revealed soon; unsafe secrets make you feel scared, uneasy, or guilty."
        },
        {
          "id": "opt_2",
          "text": "Good secrets are whispered; bad secrets are written down.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "All secrets are always safe to keep.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Secrets told by older people must never be broken.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Remember: If any secret makes you feel uneasy or involves your body, break it immediately by telling a trusted adult."
    },
    "rubric": {
      "performanceTask": "Identify safe vs unsafe touch scenarios and demonstrate the 3-Step Safety Shield response.",
      "masteryCriteria": "Correctly identifies boundaries, demonstrates firm verbal refusal, identifies trusted reporting channels.",
      "criteria": [
        {
          "criterion": "Boundary Recognition",
          "weightPercentage": 40,
          "emerging": "Cannot identify private zones.",
          "developing": "Identifies zones but confused about secrets.",
          "proficient": "Clearly identifies private parts and distinguishes good vs bad secrets.",
          "exemplary": "Flawless boundary identification with mature understanding."
        },
        {
          "criterion": "Verbal Refusal (Say NO)",
          "weightPercentage": 35,
          "emerging": "Passive silence.",
          "developing": "Quiet refusal.",
          "proficient": "Loud, firm verbal \"NO! STOP!\" with palm gesture.",
          "exemplary": "Unwavering assertive command with decisive retreat."
        },
        {
          "criterion": "Safety Network Identification",
          "weightPercentage": 25,
          "emerging": "Cannot name trusted adults.",
          "developing": "Names 1 adult.",
          "proficient": "Names 3 distinct trusted adults across home and school.",
          "exemplary": "Full 5-finger network with phone numbers memorized."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Why do unsafe people tell children to keep secrets?"
      },
      {
        "id": "ref_2",
        "prompt": "Who are the trusted adults at your school you can go to anytime?"
      },
      {
        "id": "ref_3",
        "prompt": "Why is reporting an unsafe situation brave rather than 'tattling'?"
      },
      {
        "id": "ref_4",
        "prompt": "How can you support a friend who shares an uncomfortable secret with you?"
      }
    ]
  },
  {
    "id": "mod_c4_m04_s3",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 4,
    "monthTheme": "Safety at Home, School & on the Road",
    "sequenceNumber": 3,
    "globalIndex": 12,
    "category": "life_safety_health",
    "categoryLabel": "Safety, Health & Well-being",
    "title": "Memorizing Family Phone Numbers & Emergency Helpline 112",
    "whyItMatters": "Knowing your parents’ 10-digit phone numbers and the national emergency number 112 ensures you can get help quickly if lost or in an emergency.",
    "learningObjectives": [
      "Memorize at least two primary family contact 10-digit mobile numbers",
      "Learn the all-India emergency helpline number 112 (Police, Fire, Ambulance)",
      "Practice dialing phone numbers on a keypad or landline correctly",
      "Know how to state your full name, location, and nature of emergency calmly"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Diya got separated from her father at a crowded metro station during festival rush. Security guards asked for her father’s phone number, but she only knew he had a black smartphone.",
    "explanation": "In a crowded place, phones can run out of battery or get lost. If you memorize your parents’ phone numbers in your head, you can borrow any shopkeeper’s or police officer’s phone and connect in seconds. The single emergency number in India is 112.",
    "stepByStep": [
      "Break the 10-digit phone number into memorable chunks: 3 digits - 3 digits - 4 digits (e.g. 981 - 234 - 5678).",
      "Repeat the number rhythmically like a song five times every morning.",
      "Practice typing the digits on an inactive keypad or drawing the numbers.",
      "In an emergency, dial 112 and stay calm.",
      "State clearly: \"My name is [Name]. I am at [Location]. I am lost / need help.\""
    ],
    "workedExample": {
      "title": "Diya Memorizes Her Mother’s Number",
      "scenario": "Diya’s mother’s number is 98765-43210.",
      "steps": [
        "Diya chants: \"987... 654... 3210.\"",
        "She writes it with her finger on her desk.",
        "She dials it on her mother’s phone with permission.",
        "When tested 3 days later, she recites it instantly without peeking."
      ],
      "takeaway": "Chunking 10 digits into three rhythmic pieces makes memorizing effortless."
    },
    "commonMistakes": [
      {
        "mistake": "Relying only on the phone’s contact list without memorizing.",
        "correction": "If the phone battery dies or gets misplaced, you must know the numbers from memory."
      },
      {
        "mistake": "Prank calling emergency helpline 112.",
        "correction": "112 is strictly for real emergencies; prank calls block life-saving help for others and are illegal."
      }
    ],
    "decisionChecklist": [
      "Do I know my mother or father’s 10-digit number by heart?",
      "Do I know a backup family number?",
      "Do I know the national emergency number 112?",
      "Do I know my full home address and nearest landmark?"
    ],
    "reflectionPrompt": "How would you feel if you were lost in a market, but knew exactly which number to dial?",
    "summaryTakeaway": "Ten digits memorized in your head can be your lifeline in any unexpected emergency.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m04_s3_hero.webp",
      "altText": "Memorizing Family Phone Numbers & Emergency Helpline 112 - Step by step life skill demonstration for Class 4",
      "description": "Child dialing phone number with confidence beside a friendly police officer.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_04_3_a",
        "title": "The 10-Digit Chunking Rhythm",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m04_s3_diag1.webp",
        "altText": "The 10-Digit Chunking Rhythm",
        "caption": "Area Code (3 digits) + Middle Block (3 digits) + Final Block (4 digits).",
        "status": "ready"
      },
      {
        "id": "vis_c4_04_3_b",
        "title": "Emergency Call Script",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m04_s3_diag2.webp",
        "altText": "Emergency Call Script",
        "caption": "1. Who I am -> 2. Where I am -> 3. What happened -> 4. Phone number.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Emergency Readiness: Memorize Your Lifeline Numbers",
      "duration": "3 mins 10 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Child separated in crowded festival market.",
          "narrationTranscript": "Crowded places can be overwhelming if you get separated."
        },
        {
          "scene": 2,
          "visualDescription": "Chunking phone digits into a rhythmic song.",
          "narrationTranscript": "Break 10 numbers into 3 easy chunks. Chant it like a song."
        },
        {
          "scene": 3,
          "visualDescription": "Security desk phone call connecting with parents.",
          "narrationTranscript": "One quick phone call and you are reunited safely."
        }
      ],
      "practicalChallengeRecap": "Recite your parent's 10-digit number 5 times right now without looking."
    },
    "practicalActivity": {
      "title": "Emergency Contact Speed-Dial Drill",
      "objective": "Memorize and write down 2 family contact numbers from memory without hesitation.",
      "materials": [
        "Paper",
        "Pencil",
        "Timer"
      ],
      "procedure": [
        "Practice reciting parent 1’s number 5 times.",
        "Practice reciting parent 2’s number 5 times.",
        "Close your eyes and recite both numbers to a parent.",
        "Write both numbers on a wallet card and place it in your school bag pocket."
      ],
      "expectedOutput": "A laminated emergency contact ID card placed in your school bag.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Never share personal phone numbers with strangers online or unverified callers.",
      "alternativeActivity": "Practice dialing on an unplugged landline or toy phone."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "You are at a busy shopping mall and cannot find your mother near the elevator.",
        "choiceOptions": [
          {
            "option": "Walk directly to the official mall customer service desk or security guard in uniform and ask them to dial your mother’s number.",
            "isOptimal": true,
            "reason": "Uniformed guards and official desks are safe authorized helpers."
          },
          {
            "option": "Wander out of the mall into the parking lot looking for the family car.",
            "isOptimal": false,
            "reason": "Leaving the safe building increases danger and makes finding you much harder."
          },
          {
            "option": "Start crying in the corner and hide behind a pillar.",
            "isOptimal": false,
            "reason": "Hiding makes it difficult for security staff and family to spot you."
          }
        ],
        "keyTakeaway": "Stay inside where you got lost and seek uniformed help immediately."
      },
      "independentScenario": {
        "context": "You witness a small electrical fire starting in the school corridor during lunch break.",
        "challengePrompt": "State who you will inform immediately and what emergency number an adult will dial.",
        "selfEvaluationRubric": "Informed nearest teacher/staff; identified fire safety response and 112/101 emergency services."
      }
    },
    "assessment": {
      "question": "What is the single all-India emergency helpline number for police, medical, and disaster help?",
      "contextScenario": "Emergency preparedness knowledge check.",
      "options": [
        {
          "id": "opt_1",
          "text": "112",
          "isCorrect": true,
          "feedback": "Correct! 112"
        },
        {
          "id": "opt_2",
          "text": "911",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "999",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "000",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Remember: 112 is the pan-India unified emergency helpline number."
    },
    "rubric": {
      "performanceTask": "Recite 2 primary family phone numbers and the national emergency number accurately from memory.",
      "masteryCriteria": "100% accuracy in digits, zero peeking, clear recitation within 15 seconds.",
      "criteria": [
        {
          "criterion": "Primary Number Accuracy",
          "weightPercentage": 40,
          "emerging": "Knows <7 digits.",
          "developing": "Knows all digits with pauses/hesitation.",
          "proficient": "Recites 10 digits fluently from memory.",
          "exemplary": "Instant recall with correct chunking cadence."
        },
        {
          "criterion": "Backup Contact & 112",
          "weightPercentage": 35,
          "emerging": "Does not know backup or 112.",
          "developing": "Knows 112 but forgets backup.",
          "proficient": "Recites backup contact and 112 accurately.",
          "exemplary": "Knows 2 backups, home address, and 112."
        },
        {
          "criterion": "Emergency Communication Protocol",
          "weightPercentage": 25,
          "emerging": "Panics without stating details.",
          "developing": "States name but forgets location.",
          "proficient": "States name, location, and problem clearly.",
          "exemplary": "Calm, authoritative communication of situation."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "What rhythm or tune helps you remember 10-digit numbers?"
      },
      {
        "id": "ref_2",
        "prompt": "Why is 112 used as a single unified emergency number?"
      },
      {
        "id": "ref_3",
        "prompt": "Where should you keep a written backup of emergency numbers in your bag?"
      },
      {
        "id": "ref_4",
        "prompt": "Who are the safest people to approach if you are lost in a railway station?"
      }
    ]
  },
  {
    "id": "mod_c4_m05_s1",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 5,
    "monthTheme": "Everyday Problem-Solving & Asking Questions",
    "sequenceNumber": 1,
    "globalIndex": 13,
    "category": "life_critical_thinking",
    "categoryLabel": "Critical Thinking & Everyday Problem-Solving",
    "title": "Breaking a Big Task into Three Manageable Steps",
    "whyItMatters": "Big assignments or chores feel overwhelming when viewed as one giant mountain. Breaking tasks into smaller steps makes starting easy and builds steady progress.",
    "learningObjectives": [
      "Identify the starting point, middle action, and final finish of any big task",
      "Write down 3 numbered steps before starting an assignment",
      "Focus on completing step 1 before worrying about step 2 or 3",
      "Celebrate completing each mini-step with a checkmark"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Sneha was assigned a 4-page Science project on birds due in one week. Looking at the blank poster paper made her panic, and she sat crying without writing a single word.",
    "explanation": "How do you eat a giant bowl of fruit? One bite at a time. When you divide a big challenge into 3 small bites (Step 1: Gather info, Step 2: Draw or write, Step 3: Color and check), the mountain becomes a pleasant staircase.",
    "stepByStep": [
      "Name the big task at the top of your sheet (e.g. Science Bird Poster).",
      "Divide a blank page into 3 boxes labeled: 1. Start Small, 2. Build Middle, 3. Finish & Polish.",
      "Write ONE simple action in Box 1 that takes under 15 minutes (e.g. pick 3 birds and find pictures).",
      "Write the core action in Box 2 (e.g. write 2 facts about each bird).",
      "Write the check action in Box 3 (e.g. glue pictures and check spellings)."
    ],
    "workedExample": {
      "title": "Sneha’s 3-Step Bird Poster Plan",
      "scenario": "Sneha breaks her poster project into 3 steps.",
      "steps": [
        "Step 1 (Day 1): Choose Parrot, Peafowl, and Sparrow and find 3 photos.",
        "Step 2 (Day 2): Write 2 sentences about each bird’s habitat and diet.",
        "Step 3 (Day 3): Paste photos on chart paper and write bold title."
      ],
      "takeaway": "Doing one small step each afternoon makes big homework feel effortless."
    },
    "commonMistakes": [
      {
        "mistake": "Trying to do the entire project in one frantic night before submission.",
        "correction": "Procrastinating causes panic and sloppy work; spread the 3 steps over 3 days."
      },
      {
        "mistake": "Making 20 tiny complicated steps that feel confusing.",
        "correction": "Keep it to 3 clear, distinct milestones: Start, Middle, Finish."
      }
    ],
    "decisionChecklist": [
      "Did I break the task into exactly 3 clear steps?",
      "Does Step 1 take under 15 minutes to start?",
      "Can I finish Step 1 before thinking about Step 2?",
      "Did I tick off Step 1 with a pencil checkmark?"
    ],
    "reflectionPrompt": "Think of a chore or project that feels too big right now. What is the very first 5-minute step you can take today?",
    "summaryTakeaway": "Any mountain can be climbed when you break the journey into three simple steps.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m05_s1_hero.webp",
      "altText": "Breaking a Big Task into Three Manageable Steps - Step by step life skill demonstration for Class 4",
      "description": "Student climbing a visual 3-step staircase representing a broken-down project.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_05_1_a",
        "title": "The 3-Step Project Staircase",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m05_s1_diag1.webp",
        "altText": "The 3-Step Project Staircase",
        "caption": "Step 1: Prepare & Research -> Step 2: Create Core Content -> Step 3: Polish & Check.",
        "status": "ready"
      },
      {
        "id": "vis_c4_05_1_b",
        "title": "The 15-Minute Rule",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m05_s1_diag2.webp",
        "altText": "The 15-Minute Rule",
        "caption": "If Step 1 takes more than 15 minutes, break it down further.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Tackle Any Mountain: The 3-Step Method",
      "duration": "3 mins 15 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Student frozen in panic looking at big project.",
          "narrationTranscript": "Big tasks can feel terrifying when viewed all at once."
        },
        {
          "scene": 2,
          "visualDescription": "Drawing a 3-box staircase on paper.",
          "narrationTranscript": "Draw three simple boxes: Start, Middle, Finish."
        },
        {
          "scene": 3,
          "visualDescription": "Ticking off step 1 with a satisfied smile.",
          "narrationTranscript": "Celebrate step 1. You are already on your way to success."
        }
      ],
      "practicalChallengeRecap": "Pick one big task today and write its 3 steps on a sticky note."
    },
    "practicalActivity": {
      "title": "The 3-Step Chore Breaker Challenge",
      "objective": "Pick a messy bedroom area (study shelf, toy box, or wardrobe) and clean it using 3 steps.",
      "materials": [
        "Paper",
        "Pencil",
        "3-step template"
      ],
      "procedure": [
        "Identify the messy zone.",
        "Write Step 1 (e.g. pick up trash), Step 2 (sort books), Step 3 (wipe shelf).",
        "Complete Step 1 and tick it off.",
        "Complete Steps 2 and 3 sequentially."
      ],
      "expectedOutput": "A signed 3-step completion checklist with before and after observations.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Do not lift heavy furniture; focus on organizing personal belongings.",
      "alternativeActivity": "Break a Math homework assignment of 15 questions into 3 sets of 5 questions."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "You need to read a 12-page chapter in EVS before tomorrow’s class.",
        "choiceOptions": [
          {
            "option": "Divide into 3 chunks: read 4 pages before snacks, 4 pages before dinner, and 4 pages after dinner.",
            "isOptimal": true,
            "reason": "Spreading the reading in small chunks prevents fatigue and deepens memory."
          },
          {
            "option": "Read all 12 pages in 5 minutes by skimming headlines without understanding.",
            "isOptimal": false,
            "reason": "Skimming too fast misses critical concepts."
          },
          {
            "option": "Give up because 12 pages is too long.",
            "isOptimal": false,
            "reason": "Giving up guarantees falling behind in class."
          }
        ],
        "keyTakeaway": "Chunking study material keeps mental energy high."
      },
      "independentScenario": {
        "context": "You want to learn how to tie your shoelaces independently.",
        "challengePrompt": "Break learning to tie shoelaces into 3 clear physical practice steps.",
        "selfEvaluationRubric": "Step 1: Cross and pull tight knot; Step 2: Form bunny ear loop; Step 3: Wrap and pull through."
      }
    },
    "assessment": {
      "question": "Why is it best to make Step 1 of any project take less than 15 minutes?",
      "contextScenario": "Overcoming procrastination on a school assignment.",
      "options": [
        {
          "id": "opt_1",
          "text": "Because an easy, quick first step overcomes fear and gets your momentum started immediately.",
          "isCorrect": true,
          "feedback": "Correct! Because an easy, quick first step overcomes fear and gets your momentum started immediately."
        },
        {
          "id": "opt_2",
          "text": "Because school rules say students cannot work more than 15 minutes.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Because you should do the hardest part of the project in the first 15 minutes.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Because Step 1 is not important.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Remember: Overcoming initial inertia is the hardest part of starting; a tiny first step gets you moving."
    },
    "rubric": {
      "performanceTask": "Break a multi-day school project into a viable 3-step action plan with realistic timelines.",
      "masteryCriteria": "3 distinct sequential steps, realistic duration, clear deliverables, logical milestone pacing.",
      "criteria": [
        {
          "criterion": "Step Decomposition",
          "weightPercentage": 40,
          "emerging": "Steps are vague or single giant block.",
          "developing": "2 steps defined.",
          "proficient": "3 distinct logical steps with clear boundaries.",
          "exemplary": "Optimal step sizing with measurable deliverables."
        },
        {
          "criterion": "Feasibility & Pacing",
          "weightPercentage": 35,
          "emerging": "Unrealistic workload.",
          "developing": "Too much crammed into Step 1.",
          "proficient": "Step 1 is quick and easy to initiate.",
          "exemplary": "Balanced cognitive load across all 3 steps."
        },
        {
          "criterion": "Action & Execution",
          "weightPercentage": 25,
          "emerging": "Does not start Step 1.",
          "developing": "Starts only with supervision.",
          "proficient": "Executes Step 1 independently.",
          "exemplary": "Executes full plan with self-monitoring checkmarks."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Why does looking at a big project make our brain want to play video games instead?"
      },
      {
        "id": "ref_2",
        "prompt": "How did ticking off Step 1 feel in your body?"
      },
      {
        "id": "ref_3",
        "prompt": "What is a project in real life that adults break into steps?"
      },
      {
        "id": "ref_4",
        "prompt": "How can you use this method before final exams?"
      }
    ]
  },
  {
    "id": "mod_c4_m05_s2",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 5,
    "monthTheme": "Everyday Problem-Solving & Asking Questions",
    "sequenceNumber": 2,
    "globalIndex": 14,
    "category": "life_critical_thinking",
    "categoryLabel": "Critical Thinking & Everyday Problem-Solving",
    "title": "Checking Facts Before Believing a School Yard Rumor",
    "whyItMatters": "Believing or spreading rumors causes hurt feelings and unnecessary panic. Learning to verify facts makes you a fair, trustworthy, and wise student.",
    "learningObjectives": [
      "Distinguish between a verified fact (proven true) and a rumor/gossip (unverified talk)",
      "Ask the 3 Truth Questions: Who said it? Did they see it? Is there proof?",
      "Pause before repeating sensational playground gossip to others",
      "Politely say \"I will check with the teacher before believing that\""
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "During recess, a classmate whispered to Samar: \"Tomorrow is a surprise inspection and everyone who forgets their sports uniform will get suspended from school!\" Samar felt terrified all afternoon.",
    "explanation": "Rumors spread like wildfire because they sound dramatic and scary. But rumors are often exaggerated or completely made up. A critical thinker does not swallow gossip whole. They ask: \"Who told you? Did a teacher announce it on the microphone? Is it in the school diary?\" If there is no official source, it is just empty chatter.",
    "stepByStep": [
      "When you hear dramatic news, do not panic or repeat it immediately.",
      "Ask the speaker: \"Did you see this yourself, or did someone else tell you?\"",
      "Check the official source: Is it written on the school notice board or homework diary?",
      "If there is no verified proof, treat it as unconfirmed talk.",
      "Say: \"Let’s not spread this until we ask our class teacher directly.\""
    ],
    "workedExample": {
      "title": "Samar Verifies the Uniform Rumor",
      "scenario": "Samar wonders if the suspension rumor is true.",
      "steps": [
        "Samar pauses and doesn’t tell his bus friends.",
        "He checks his school diary: No notice about inspections.",
        "At 2:00 PM, he politely asks his class teacher: \"Sir, is there a special uniform check tomorrow?\"",
        "The teacher laughs: \"No Samar, tomorrow is regular uniform day. Who started that rumor?\"",
        "Samar sighs with relief: The rumor was 100% false!"
      ],
      "takeaway": "Checking with the official authority eliminates false panic in 30 seconds."
    },
    "commonMistakes": [
      {
        "mistake": "Adding your own dramatic details when forwarding a rumor.",
        "correction": "Never exaggerate or repeat unverified stories; gossiping damages trust."
      },
      {
        "mistake": "Believing something just because a popular classmate said it.",
        "correction": "Popularity does not make a statement true; only verified evidence makes it true."
      }
    ],
    "decisionChecklist": [
      "Who told me this information?",
      "Did they witness it with their own eyes?",
      "Is there official written proof or teacher confirmation?",
      "Could repeating this hurt someone or cause panic?"
    ],
    "reflectionPrompt": "Have you ever believed a rumor that turned out to be completely false? How did you feel when you learned the truth?",
    "summaryTakeaway": "Before you believe or repeat a rumor, run it through the filter: Who said it? Where is the proof?",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m05_s2_hero.webp",
      "altText": "Checking Facts Before Believing a School Yard Rumor - Step by step life skill demonstration for Class 4",
      "description": "Child holding a magnifying glass inspecting a speech bubble labeled Fact vs Rumor.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_05_2_a",
        "title": "The 3-Way Rumor Filter",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m05_s2_diag1.webp",
        "altText": "The 3-Way Rumor Filter",
        "caption": "1. Source Check -> 2. Evidence Check -> 3. Harm Check.",
        "status": "ready"
      },
      {
        "id": "vis_c4_05_2_b",
        "title": "Fact vs Opinion vs Rumor",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m05_s2_diag2.webp",
        "altText": "Fact vs Opinion vs Rumor",
        "caption": "Fact: Proven true. Opinion: Personal feeling. Rumor: Unverified gossip.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "The Truth Detective: How to Spot Playground Rumors",
      "duration": "3 mins 20 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Whispering chain in school corridor spreading panic.",
          "narrationTranscript": "Rumors grow bigger and scarier with every whisper."
        },
        {
          "scene": 2,
          "visualDescription": "Magnifying glass inspecting facts on a notice board.",
          "narrationTranscript": "Stop the chain! Ask for real proof from the official source."
        },
        {
          "scene": 3,
          "visualDescription": "Teacher clarifying the truth with a smile.",
          "narrationTranscript": "Always verify with trusted adults before believing gossip."
        }
      ],
      "practicalChallengeRecap": "Ask 'Is that a proven fact or a rumor?' next time you hear dramatic school gossip."
    },
    "practicalActivity": {
      "title": "Playground Fact-Checker Investigation",
      "objective": "Analyze 3 sample school statements and classify each as Fact, Opinion, or Rumor.",
      "materials": [
        "Paper",
        "Pencil"
      ],
      "procedure": [
        "Read statement 1: \"School starts at 8:00 AM.\" (Fact).",
        "Read statement 2: \"Math is the most boring subject.\" (Opinion).",
        "Read statement 3: \"A ghost was seen in the art room.\" (Rumor).",
        "Write down the verification method for each statement."
      ],
      "expectedOutput": "A completed 3-statement classification worksheet with proof sources.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Do not use real classmates’ personal private lives in exercise examples.",
      "alternativeActivity": "Discuss how weather forecasts differ from playground rumors."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "A friend tells you: \"Aarav cheated on the spelling test, everyone is saying so.\"",
        "choiceOptions": [
          {
            "option": "Say: \"I didn’t see that, and repeating it could hurt Aarav. Let’s not spread gossip.\"",
            "isOptimal": true,
            "reason": "Refusing to spread unproven accusations protects friends from unfair bullying."
          },
          {
            "option": "Tell 5 other classmates Aarav is a cheater.",
            "isOptimal": false,
            "reason": "Spreading unverified accusations damages reputations and is cruel."
          },
          {
            "option": "Go yell at Aarav in the cafeteria.",
            "isOptimal": false,
            "reason": "Confronting someone based on second-hand rumors causes unnecessary drama."
          }
        ],
        "keyTakeaway": "Be the student where harmful rumors stop, not where they spread."
      },
      "independentScenario": {
        "context": "Someone forwards a message claiming that the school will remain closed for a month due to alien sightings.",
        "challengePrompt": "Explain how you will verify this and why you will not forward it to your family group.",
        "selfEvaluationRubric": "Identified that the claim is absurd and unverified; checked official school circular."
      }
    },
    "assessment": {
      "question": "What is the very first question a critical thinker asks when hearing sensational gossip?",
      "contextScenario": "Evaluating a playground rumor.",
      "options": [
        {
          "id": "opt_1",
          "text": "\"Did you see this yourself, and what is the official proof?\"",
          "isCorrect": true,
          "feedback": "Correct! \"Did you see this yourself, and what is the official proof?\""
        },
        {
          "id": "opt_2",
          "text": "\"How can I tell this to as many people as possible?\"",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "\"Should I make up an even scarier detail?\"",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "\"Can I post this on the internet immediately?\"",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Review the 3-Way Rumor Filter: Source, Evidence, Harm."
    },
    "rubric": {
      "performanceTask": "Analyze a simulated rumor scenario and construct a verified investigation response.",
      "masteryCriteria": "Correctly identifies unverified claims, identifies authorized source, demonstrates boundary against spreading.",
      "criteria": [
        {
          "criterion": "Rumor vs Fact Discrimination",
          "weightPercentage": 40,
          "emerging": "Accepts all rumors as facts.",
          "developing": "Distinguishes obvious falsehoods only.",
          "proficient": "Accurately distinguishes facts, opinions, and rumors.",
          "exemplary": "Deep understanding of source credibility and bias."
        },
        {
          "criterion": "Source Verification Strategy",
          "weightPercentage": 35,
          "emerging": "Asks other children.",
          "developing": "Checks notice board only if reminded.",
          "proficient": "Identifies authoritative source (teacher/circular).",
          "exemplary": "Systematic multi-source verification protocol."
        },
        {
          "criterion": "Refusal to Forward",
          "weightPercentage": 25,
          "emerging": "Eagerly repeats gossip.",
          "developing": "Hesitates but shares with close friend.",
          "proficient": "Firmly refuses to repeat unverified claims.",
          "exemplary": "Actively de-escalates peer panic and stops gossip chain."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Why do people enjoy listening to gossip?"
      },
      {
        "id": "ref_2",
        "prompt": "How does it feel when someone spreads a false story about you?"
      },
      {
        "id": "ref_3",
        "prompt": "What is the difference between a fact and a personal opinion?"
      },
      {
        "id": "ref_4",
        "prompt": "How can you politely stop a friend who is gossiping?"
      }
    ]
  },
  {
    "id": "mod_c4_m05_s3",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 5,
    "monthTheme": "Everyday Problem-Solving & Asking Questions",
    "sequenceNumber": 3,
    "globalIndex": 15,
    "category": "life_critical_thinking",
    "categoryLabel": "Critical Thinking & Everyday Problem-Solving",
    "title": "Pausing and Counting to Five When Frustrated",
    "whyItMatters": "When you get angry or frustrated, your brain acts without thinking. Learning the 5-second pause keeps you in control and prevents hurtful reactions.",
    "learningObjectives": [
      "Recognize physical warning signs of anger: clenched fists, racing heart, hot cheeks",
      "Practice the \"5-4-3-2-1 Calm Down\" breathing pause before speaking or reacting",
      "Step back physically from a frustrating situation instead of lashing out",
      "Choose a calm, respectful response after your brain has cooled down"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "During art class, someone accidentally bumped Diya’s elbow, causing her paintbrush to smudge red paint across her drawing. Diya felt boiling anger and wanted to rip up the other person’s paper.",
    "explanation": "Anger is a normal human emotion, but acting on sudden anger causes broken things, hurt friends, and disciplinary trouble. When you are angry, your emotional brain takes over. Taking five slow breaths gives your logical brain time to wake up so you make wise choices.",
    "stepByStep": [
      "Notice your anger signals: clenched fists, clenched jaw, or hot face.",
      "Stop moving your hands and freeze your feet.",
      "Take a deep breath through your nose while counting in your head: 1... 2... 3... 4... 5.",
      "Exhale slowly through your mouth like blowing out a candle.",
      "Ask your calm brain: \"Was this an accident, and what is the best way to fix this?\""
    ],
    "workedExample": {
      "title": "Diya’s Paint Smudge Pause",
      "scenario": "Diya’s painting is smudged. Her fists clench.",
      "steps": [
        "Diya freezes her hands and closes her eyes.",
        "She counts slowly to 5 while taking a deep belly breath.",
        "Her racing heart slows down.",
        "She looks at her classmate and says: \"That startled me! But I know it was an accident. Can you pass me a wet wipe?\"",
        "She turns the smudge into a sunset cloud and saves her painting."
      ],
      "takeaway": "Five seconds of calm breathing turned a potential playground fight into creative art."
    },
    "commonMistakes": [
      {
        "mistake": "Shouting or throwing pencils immediately when something goes wrong.",
        "correction": "Reacting instantly causes regret; freeze your hands and take 5 seconds to breathe."
      },
      {
        "mistake": "Bottling up anger forever and refusing to talk to anyone.",
        "correction": "Express how you feel calmly once you are cool: \"I felt upset when my paper was smudged.\""
      }
    ],
    "decisionChecklist": [
      "Did I notice my body’s anger signals early?",
      "Did I freeze my hands before reacting?",
      "Did I count slowly to 5 with deep breathing?",
      "Did I choose a solution rather than revenge?"
    ],
    "reflectionPrompt": "What physical sign happens in your body first when you get angry? How can you use that as your alarm to pause?",
    "summaryTakeaway": "Five seconds of quiet breathing gives your wise brain time to take the wheel.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m05_s3_hero.webp",
      "altText": "Pausing and Counting to Five When Frustrated - Step by step life skill demonstration for Class 4",
      "description": "Child taking a deep calming breath with hand over heart counting to five.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_05_3_a",
        "title": "The Anger Thermometer",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m05_s3_diag1.webp",
        "altText": "The Anger Thermometer",
        "caption": "Green (Calm) -> Yellow (Frustrated - Time to Pause) -> Red (Boiling - Freeze!).",
        "status": "ready"
      },
      {
        "id": "vis_c4_05_3_b",
        "title": "The 5-Finger Breathing Technique",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m05_s3_diag2.webp",
        "altText": "The 5-Finger Breathing Technique",
        "caption": "Trace up your finger (breathe in) and trace down (breathe out).",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "The Power of the 5-Second Pause",
      "duration": "3 mins 10 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Child clenching fists in sudden frustration.",
          "narrationTranscript": "When accidents happen, anger flares like a sudden fire."
        },
        {
          "scene": 2,
          "visualDescription": "Animation of counting 1 to 5 with slow breathing.",
          "narrationTranscript": "Freeze! Count to five. Give your wise brain time to cool down."
        },
        {
          "scene": 3,
          "visualDescription": "Calmly solving the problem together.",
          "narrationTranscript": "Respond with words, not fists. You are the master of your emotions."
        }
      ],
      "practicalChallengeRecap": "Practice the 5-finger breathing technique whenever you feel impatient today."
    },
    "practicalActivity": {
      "title": "The 5-Finger Breath Anchor Routine",
      "objective": "Practice and master the 5-finger breathing method until it becomes an automatic habit.",
      "materials": [
        "Your own hand"
      ],
      "procedure": [
        "Hold your left hand out with fingers spread wide.",
        "Use your right index finger to trace up your thumb while inhaling for 3 counts.",
        "Trace down the other side while exhaling for 3 counts.",
        "Repeat for all 5 fingers until all 10 breaths are complete.",
        "Observe how calm your shoulders and chest feel."
      ],
      "expectedOutput": "A demonstrated 5-finger calm breathing drill verified by a caregiver.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Breathe gently; do not hold breath to the point of lightheadedness.",
      "alternativeActivity": "Count backwards from 10 to 1 while walking slowly in a circle."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "You spent 30 minutes building a domino tower and your toddler cousin knocks it over.",
        "choiceOptions": [
          {
            "option": "Freeze your hands, take 3 deep belly breaths, and say: \"I’m sad that fell, but we can build a new one together.\"",
            "isOptimal": true,
            "reason": "Toddlers do not understand domino physics; yelling will terrify the cousin without rebuilding the tower."
          },
          {
            "option": "Push your cousin down onto the floor.",
            "isOptimal": false,
            "reason": "Physical violence is dangerous and wrong."
          },
          {
            "option": "Scream and kick the door.",
            "isOptimal": false,
            "reason": "Temper tantrums damage property and hurt your own body."
          }
        ],
        "keyTakeaway": "Take a deep breath and respond to accidents with maturity."
      },
      "independentScenario": {
        "context": "You receive a lower grade than expected on a Math test you studied hard for.",
        "challengePrompt": "Describe how you will pause before reacting, and what respectful question you will ask your teacher.",
        "selfEvaluationRubric": "Described physical pause/breathing, avoided blaming, asked teacher to explain mistake."
      }
    },
    "assessment": {
      "question": "Why does counting to five slowly help prevent angry outbursts?",
      "contextScenario": "Understanding the biology of anger.",
      "options": [
        {
          "id": "opt_1",
          "text": "It lowers your heart rate and allows your logical thinking brain to regain control from the emotional brain.",
          "isCorrect": true,
          "feedback": "Correct! It lowers your heart rate and allows your logical thinking brain to regain control from the emotional brain."
        },
        {
          "id": "opt_2",
          "text": "It makes the person who upset you disappear.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "It casts a magic spell on your hands.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "It proves that you are weak.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Remember: Deep breathing activates the body’s natural relaxation response."
    },
    "rubric": {
      "performanceTask": "Demonstrate emotional de-escalation using the 5-Second Pause in a simulated frustrating situation.",
      "masteryCriteria": "Recognizes triggers, demonstrates controlled physical pause, speaks with calm de-escalation tone.",
      "criteria": [
        {
          "criterion": "Physical Freeze & Pause",
          "weightPercentage": 40,
          "emerging": "Reacts impulsively without pause.",
          "developing": "Pauses only when shouted at by an adult.",
          "proficient": "Independently freezes hands and takes 5-count breath.",
          "exemplary": "Immediate self-regulation with serene posture."
        },
        {
          "criterion": "Breathing & Self-Soothing",
          "weightPercentage": 35,
          "emerging": "Hyperventilates or stomps.",
          "developing": "Quick shallow breaths.",
          "proficient": "Deep diaphragmatic breathing across 5 counts.",
          "exemplary": "Masters 5-finger breath with noticeable drop in tension."
        },
        {
          "criterion": "Constructive Verbal Response",
          "weightPercentage": 25,
          "emerging": "Uses insults or blame.",
          "developing": "Silent sulking.",
          "proficient": "Expresses feelings calmly: \"I feel frustrated, let's fix this.\"",
          "exemplary": "De-escalates situation and proposes win-win solution."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Where in your body do you first feel anger rising?"
      },
      {
        "id": "ref_2",
        "prompt": "What is the difference between feeling angry vs acting angrily?"
      },
      {
        "id": "ref_3",
        "prompt": "How does a 5-second pause prevent playground detentions?"
      },
      {
        "id": "ref_4",
        "prompt": "Who is someone you admire who stays calm under pressure?"
      }
    ]
  },
  {
    "id": "mod_c4_m06_s1",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 6,
    "monthTheme": "Friendship, Sharing & Teamwork",
    "sequenceNumber": 1,
    "globalIndex": 16,
    "category": "life_social_teamwork",
    "categoryLabel": "Social Skills, Empathy & Teamwork",
    "title": "Taking Turns Fairly During Games and Activities",
    "whyItMatters": "Fair turn-taking keeps games fun, builds trust among friends, and ensures everyone gets an equal chance to play and shine.",
    "learningObjectives": [
      "Understand why rules and turn-taking exist in multiplayer games",
      "Use a fair turn-selection method: counting rhymes, coin toss, or queue order",
      "Wait patiently without snatching or whining while another player takes their turn",
      "Congratulate opponents politely when the game ends"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "During board games period, Dev insisted on rolling the dice three times in a row because he rolled a two earlier. His friends got frustrated and packed the game away.",
    "explanation": "Games are only fun when everyone agrees to the rules. If one person dominates the game, other players feel cheated and leave. Taking turns shows maturity and ensures people love playing with you again tomorrow.",
    "stepByStep": [
      "Agree on the turn order before rolling the first die or starting the game.",
      "Keep your hands off the game pieces while another player is taking their turn.",
      "Cheer for your friends when they make a good move.",
      "When your turn ends, pass the dice or bat promptly to the next player.",
      "Say \"Good game!\" to all players when finished."
    ],
    "workedExample": {
      "title": "Ludo Fair Play in Section A",
      "scenario": "Four friends are playing Ludo.",
      "steps": [
        "They roll once each to see who goes highest.",
        "They follow clockwise order strictly.",
        "When Pooja rolls a 6, she takes her bonus roll without arguing.",
        "Everyone celebrates whoever reaches home first."
      ],
      "takeaway": "Clear rules agreed beforehand prevent 99% of playground arguments."
    },
    "commonMistakes": [
      {
        "mistake": "Changing the game rules halfway through when you are losing.",
        "correction": "Never change rules in the middle; stick to the agreed rules until the game ends."
      },
      {
        "mistake": "Refusing to pass game equipment when your turn is over.",
        "correction": "Pass equipment immediately with a smile; your turn will come back soon."
      }
    ],
    "decisionChecklist": [
      "Did all players agree on turn order before starting?",
      "Am I waiting patiently during other players’ turns?",
      "Did I pass equipment promptly?",
      "Was I a gracious player win or lose?"
    ],
    "reflectionPrompt": "How do you feel when someone hogs the game pieces and won’t share?",
    "summaryTakeaway": "Fair play and patient turn-taking make you the kind of player everyone wants on their team.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m06_s1_hero.webp",
      "altText": "Taking Turns Fairly During Games and Activities - Step by step life skill demonstration for Class 4",
      "description": "Four children sitting in a circle taking turns rolling dice on a board game.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_06_1_a",
        "title": "The Fair Turn Wheel",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m06_s1_diag1.webp",
        "altText": "The Fair Turn Wheel",
        "caption": "Player 1 -> Player 2 -> Player 3 -> Player 4 (Clockwise rotation).",
        "status": "ready"
      },
      {
        "id": "vis_c4_06_1_b",
        "title": "Dispute Resolvers",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m06_s1_diag2.webp",
        "altText": "Dispute Resolvers",
        "caption": "Coin toss, Rock-Paper-Scissors, High Roll.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Play Fair, Have Fun: The Turn-Taking Rule",
      "duration": "3 mins 15 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Children arguing over who rolls the dice.",
          "narrationTranscript": "Arguments ruin games. Clear rules keep playtime fun."
        },
        {
          "scene": 2,
          "visualDescription": "Rock-Paper-Scissors deciding turn order.",
          "narrationTranscript": "Use a fair decider before starting. Everyone agrees."
        },
        {
          "scene": 3,
          "visualDescription": "High-fives after a competitive game.",
          "narrationTranscript": "Win or lose, fair players are true winners."
        }
      ],
      "practicalChallengeRecap": "Play a game today and let another player take the first turn."
    },
    "practicalActivity": {
      "title": "Board Game Fairness Referee Challenge",
      "objective": "Host a 15-minute game with family or friends acting as the Fair Play Referee.",
      "materials": [
        "Board game or cards",
        "Scorecard"
      ],
      "procedure": [
        "Explain turn order clearly before opening the box.",
        "Enforce polite passing of dice/cards.",
        "Resolve any disputed move using Rock-Paper-Scissors.",
        "Award a \"Best Sportsmanship\" badge at the end."
      ],
      "expectedOutput": "A signed game session log certifying zero arguments during play.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Keep games lighthearted; focus on fun rather than winning.",
      "alternativeActivity": "Practice taking turns passing a ball with a sibling."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "You and a classmate both reach the single classroom swing at the exact same second.",
        "choiceOptions": [
          {
            "option": "Propose: \"Let’s take 20 pushes each. You go first, and I will count for you.\"",
            "isOptimal": true,
            "reason": "Equal timed sharing resolves competition peacefully and builds friendship."
          },
          {
            "option": "Shove the other student away and jump onto the swing.",
            "isOptimal": false,
            "reason": "Physical shoving causes injuries and school detention."
          },
          {
            "option": "Run to the teacher crying immediately.",
            "isOptimal": false,
            "reason": "Try a fair sharing compromise before escalating to a teacher."
          }
        ],
        "keyTakeaway": "Propose timed turns when equipment is limited."
      },
      "independentScenario": {
        "context": "During cricket recess, the batsman gets bowled out but claims it was a trial ball.",
        "challengePrompt": "Explain how you will calmly remind them of the pre-game rules.",
        "selfEvaluationRubric": "Reminded batsman politely that trial balls were not agreed upon before starting."
      }
    },
    "assessment": {
      "question": "What is the fairest way to decide who goes first in a new board game?",
      "contextScenario": "Setting up a game with friends.",
      "options": [
        {
          "id": "opt_1",
          "text": "Use a neutral decider like rolling the highest number on a die or Rock-Paper-Scissors.",
          "isCorrect": true,
          "feedback": "Correct! Use a neutral decider like rolling the highest number on a die or Rock-Paper-Scissors."
        },
        {
          "id": "opt_2",
          "text": "Whoever shouts \"I go first!\" loudest.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Whoever brought the game gets all the turns.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "The oldest person always gets the first turn.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Remember: Neutral chance deciders ensure no favoritism."
    },
    "rubric": {
      "performanceTask": "Facilitate a multiplayer turn-taking activity and demonstrate fair dispute resolution.",
      "masteryCriteria": "Sets clear turn rules, demonstrates patience, uses neutral dispute deciders, models sportsmanship.",
      "criteria": [
        {
          "criterion": "Rule Establishment",
          "weightPercentage": 40,
          "emerging": "Starts without agreeing rules.",
          "developing": "Vague rules.",
          "proficient": "Establishes clear turn order before play.",
          "exemplary": "Proactively anticipates edge cases and secures consensus."
        },
        {
          "criterion": "Turn Patience & Passing",
          "weightPercentage": 35,
          "emerging": "Snatches or whines.",
          "developing": "Hesitates to pass.",
          "proficient": "Waits patiently and passes equipment promptly.",
          "exemplary": "Actively encourages others during their turns."
        },
        {
          "criterion": "Sportsmanship & Resolution",
          "weightPercentage": 25,
          "emerging": "Storms off if losing.",
          "developing": "Complains about losses.",
          "proficient": "Gracious in winning and losing.",
          "exemplary": "Praises opponents and models joyous sportsmanship."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Why is winning fairly much better than winning by cheating?"
      },
      {
        "id": "ref_2",
        "prompt": "How does turn-taking make friendships stronger?"
      },
      {
        "id": "ref_3",
        "prompt": "What game at school has the most disputes? How can you fix it?"
      },
      {
        "id": "ref_4",
        "prompt": "How will you handle someone who refuses to follow the rules?"
      }
    ]
  },
  {
    "id": "mod_c4_m06_s2",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 6,
    "monthTheme": "Friendship, Sharing & Teamwork",
    "sequenceNumber": 2,
    "globalIndex": 17,
    "category": "life_social_teamwork",
    "categoryLabel": "Social Skills, Empathy & Teamwork",
    "title": "Active Listening: Not Interrupting While Others Speak",
    "whyItMatters": "Listening completely before replying shows deep respect, prevents misunderstandings, and helps you learn valuable details.",
    "learningObjectives": [
      "Keep mouth quiet and eyes focused while another person is speaking",
      "Wait for a full 2-second pause before beginning your reply",
      "Nod or use gentle body language to show you are following along",
      "Paraphrase what you heard: \"So you are saying that...\""
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Priya was telling Kabir about her lost kitten. Before Priya could finish, Kabir blurted out: \"Oh, that reminds me of my dog who did a flip yesterday!\" Priya felt unheard and stopped talking.",
    "explanation": "Most people don’t listen to understand; they listen waiting for their turn to speak. Active listening means giving the speaker your full attention. When someone speaks, lock your lips, open your ears, and imagine being in their shoes. It is the greatest gift you can give a friend.",
    "stepByStep": [
      "Look at the speaker with open, attentive eyes.",
      "Keep your hands still and put down pencils or toys.",
      "Do not interrupt, even if an exciting thought pops into your head.",
      "Wait until their voice stops and count 1... 2... in your head.",
      "Respond to THEIR topic first before switching to your own story."
    ],
    "workedExample": {
      "title": "Kabir Learns to Listen to Priya",
      "scenario": "Priya shares her worry about her lost kitten.",
      "steps": [
        "Kabir holds his thought about his dog.",
        "He listens until Priya finishes: \"...and we haven’t found him yet.\"",
        "Kabir pauses for 2 seconds.",
        "He says: \"Priya, I’m so sorry. Where was he last seen? Can I help you look?\"",
        "Priya feels supported and smiles."
      ],
      "takeaway": "Responding to the other person’s story first builds deep empathy."
    },
    "commonMistakes": [
      {
        "mistake": "Cutting someone off mid-sentence to share your own story.",
        "correction": "Hold your thought in your mental pocket until the other person completes theirs."
      },
      {
        "mistake": "Looking around the room or tapping pens while someone talks.",
        "correction": "Give full eye contact; distracted listening makes people feel unimportant."
      }
    ],
    "decisionChecklist": [
      "Did I let the speaker finish every sentence without cutting in?",
      "Did I wait 2 seconds after they stopped before replying?",
      "Did I respond to their topic rather than hijacking the conversation?",
      "Did I nod or show attentiveness?"
    ],
    "reflectionPrompt": "How does it feel when someone cuts you off mid-sentence? How does it feel when someone listens deeply?",
    "summaryTakeaway": "Listen with your ears, eyes, and heart: never interrupt a friend who is speaking.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m06_s2_hero.webp",
      "altText": "Active Listening: Not Interrupting While Others Speak - Step by step life skill demonstration for Class 4",
      "description": "Two children sitting face-to-face in attentive, active listening posture.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_06_2_a",
        "title": "The Listening Posture Checklist",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m06_s2_diag1.webp",
        "altText": "The Listening Posture Checklist",
        "caption": "Eyes on speaker, lips closed, hands still, brain focused.",
        "status": "ready"
      },
      {
        "id": "vis_c4_06_2_b",
        "title": "The 2-Second Pause Rule",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m06_s2_diag2.webp",
        "altText": "The 2-Second Pause Rule",
        "caption": "Count 1... 2... after the speaker finishes before opening your mouth.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "The Art of Active Listening",
      "duration": "3 mins 10 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Child constantly interrupting a friend.",
          "narrationTranscript": "Interrupting tells the other person: 'My words matter more than yours.'"
        },
        {
          "scene": 2,
          "visualDescription": "Demonstrating the 2-second pause.",
          "narrationTranscript": "Wait 2 seconds. Let their words settle."
        },
        {
          "scene": 3,
          "visualDescription": "Friend feeling valued and understood.",
          "narrationTranscript": "When you listen deeply, you become a trusted, cherished friend."
        }
      ],
      "practicalChallengeRecap": "Practice the 2-second pause in every conversation during dinner tonight."
    },
    "practicalActivity": {
      "title": "The 3-Minute Story Partner Listening Drill",
      "objective": "Practice listening to a partner for 3 full minutes without interrupting once.",
      "materials": [
        "Timer",
        "Partner"
      ],
      "procedure": [
        "Partner talks for 2 minutes about their favorite holiday or hobby.",
        "You must remain silent, nodding and making eye contact.",
        "When timer rings, pause 2 seconds.",
        "Summarize what they said in 2 sentences: \"I heard you say that...\""
      ],
      "expectedOutput": "A signed listening evaluation card from your partner.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Focus on listening to remember details, not just waiting to speak.",
      "alternativeActivity": "Listen to a short audio story and write down 3 key facts without pausing."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Your classmate is excitedly explaining how they built a Lego castle.",
        "choiceOptions": [
          {
            "option": "Listen until they finish, then ask: \"That sounds amazing! How did you make the drawbridge work?\"",
            "isOptimal": true,
            "reason": "Asking a follow-up question proves you were genuinely listening."
          },
          {
            "option": "Interrupt: \"Lego castles are boring, I play Minecraft.\"",
            "isOptimal": false,
            "reason": "Dismissing their interest hurts feelings and is rude."
          },
          {
            "option": "Look at your shoes and yawn loudly.",
            "isOptimal": false,
            "reason": "Yawning and looking away shows blatant disrespect."
          }
        ],
        "keyTakeaway": "Ask follow-up questions about their story before sharing your own."
      },
      "independentScenario": {
        "context": "Your teacher is giving 3-step instructions for the afternoon Science experiment.",
        "challengePrompt": "Explain how you will practice active listening so you don’t miss step 2.",
        "selfEvaluationRubric": "Kept hands still, eyes on teacher, waited until instruction finished before picking up tools."
      }
    },
    "assessment": {
      "question": "What is the purpose of the 2-Second Pause Rule in active listening?",
      "contextScenario": "Communicating with classmates.",
      "options": [
        {
          "id": "opt_1",
          "text": "To ensure the speaker has completely finished their thought before you start speaking.",
          "isCorrect": true,
          "feedback": "Correct! To ensure the speaker has completely finished their thought before you start speaking."
        },
        {
          "id": "opt_2",
          "text": "To make the speaker think you forgot English.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "To count how many seconds the conversation took.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "To let you check your phone.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Remember: A 2-second pause prevents accidental interruptions."
    },
    "rubric": {
      "performanceTask": "Demonstrate active listening and accurate paraphrasing during a 3-minute conversation.",
      "masteryCriteria": "Zero interruptions, attentive body language, accurate summary of speaker’s core message.",
      "criteria": [
        {
          "criterion": "Non-Interruption Discipline",
          "weightPercentage": 40,
          "emerging": "Interrupts multiple times.",
          "developing": "Interrupts once.",
          "proficient": "Zero interruptions throughout.",
          "exemplary": "Flawless listening discipline with mindful pause."
        },
        {
          "criterion": "Attentive Non-Verbals",
          "weightPercentage": 35,
          "emerging": "Fidgets or looks away.",
          "developing": "Occasional eye contact.",
          "proficient": "Sustained eye contact, nodding, open posture.",
          "exemplary": "Deep presence and empathetic facial expressions."
        },
        {
          "criterion": "Accurate Paraphrasing",
          "weightPercentage": 25,
          "emerging": "Cannot recall what was said.",
          "developing": "Recalls one minor fact.",
          "proficient": "Accurately summarizes core message.",
          "exemplary": "Summarizes facts and captures the speaker’s emotion."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Why is listening harder than speaking?"
      },
      {
        "id": "ref_2",
        "prompt": "What is an interruption 'hijack' and how can you avoid it?"
      },
      {
        "id": "ref_3",
        "prompt": "How does active listening help you score better in school exams?"
      },
      {
        "id": "ref_4",
        "prompt": "Who is the best listener in your family? What makes them special?"
      }
    ]
  },
  {
    "id": "mod_c4_m06_s3",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 6,
    "monthTheme": "Friendship, Sharing & Teamwork",
    "sequenceNumber": 3,
    "globalIndex": 18,
    "category": "life_social_teamwork",
    "categoryLabel": "Social Skills, Empathy & Teamwork",
    "title": "Sharing Responsibilities in a Classroom Clean-up Team",
    "whyItMatters": "When everyone does their fair share of a group task, cleaning gets done four times faster and pride in your shared classroom grows.",
    "learningObjectives": [
      "Divide a group task into specific, balanced roles (e.g. sweep, wipe, arrange, check)",
      "Focus on finishing your assigned job cheerfully without complaining",
      "Help a teammate who finishes slower after your own job is complete",
      "Appreciate the collective power of teamwork: Together Everyone Achieves More"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "At the end of art period, desks were covered in paper scraps and glue. While three students worked hard sweeping and wiping, two boys ran around playing tag instead of helping.",
    "explanation": "A classroom belongs to everyone. When some students refuse to help, teammates feel exhausted and resentful. When every person takes one specific job—one wipes boards, one picks paper, one straightens benches—a messy room becomes sparkling clean in just 4 minutes.",
    "stepByStep": [
      "Gather your team and assign specific roles before starting.",
      "Stick to your assigned job until it is 100% complete.",
      "Do not wander off or distract teammates who are working.",
      "When your job is done, ask: \"Who needs a hand with their area?\"",
      "Celebrate a clean room together with a team high-five."
    ],
    "workedExample": {
      "title": "Section B’s 4-Minute Blitz",
      "scenario": "Four students clean Art Room 3.",
      "steps": [
        "Rohan wipes the 4 tables.",
        "Diya collects glue bottles into the cupboard.",
        "Aarav sweeps paper scraps into the dustpan.",
        "Sneha pushes all chairs in neatly.",
        "Room is inspected clean in 3 minutes 45 seconds."
      ],
      "takeaway": "Clear roles turn messy chaos into high-speed teamwork."
    },
    "commonMistakes": [
      {
        "mistake": "Standing around waiting for someone to tell you what to do every 10 seconds.",
        "correction": "Take initiative: look around for what needs cleaning and start."
      },
      {
        "mistake": "Leaving immediately the second your personal desk is clean while teammates struggle.",
        "correction": "Teamwork means the job is only finished when the WHOLE room is ready."
      }
    ],
    "decisionChecklist": [
      "Do I know my specific assigned role?",
      "Did I complete my role thoroughly without complaining?",
      "Did I offer help to teammates when finished?",
      "Is the shared room completely clean?"
    ],
    "reflectionPrompt": "How does it feel to step into a clean, fresh classroom that you helped organize?",
    "summaryTakeaway": "Many hands make light work: doing your fair share builds team trust and clean spaces.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m06_s3_hero.webp",
      "altText": "Sharing Responsibilities in a Classroom Clean-up Team - Step by step life skill demonstration for Class 4",
      "description": "Four primary school students cheerfully working together cleaning a classroom.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_06_3_a",
        "title": "The Clean-Up Roles Quad",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m06_s3_diag1.webp",
        "altText": "The Clean-Up Roles Quad",
        "caption": "Table Wiper, Floor Sweeper, Supply Organizer, Chair Inspector.",
        "status": "ready"
      },
      {
        "id": "vis_c4_06_3_b",
        "title": "The Teamwork Multiplier",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m06_s3_diag2.webp",
        "altText": "The Teamwork Multiplier",
        "caption": "1 person = 20 minutes. 4 people = 4 minutes!",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Teamwork Champions: The Classroom Clean-up Blitz",
      "duration": "3 mins 15 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Messy art classroom after a busy craft lesson.",
          "narrationTranscript": "A huge mess looks scary for one person to clean alone."
        },
        {
          "scene": 2,
          "visualDescription": "Team dividing into 4 specific assigned zones.",
          "narrationTranscript": "Divide and conquer! Each person takes one specific job."
        },
        {
          "scene": 3,
          "visualDescription": "Spotless classroom in 4 minutes with team high-five.",
          "narrationTranscript": "Together, we achieve more in less time."
        }
      ],
      "practicalChallengeRecap": "Take responsibility for one shared family or classroom chore today."
    },
    "practicalActivity": {
      "title": "The 5-Minute Family Living Room Clean-Up Blitz",
      "objective": "Organize a 5-minute family cleanup where each person takes one specific zone.",
      "materials": [
        "Dust cloth",
        "Dustpan/broom",
        "Timer"
      ],
      "procedure": [
        "Set timer for 5 minutes.",
        "Assign roles: Person 1 couch cushions, Person 2 books/magazines, Person 3 toys/shoes.",
        "Work at high energy until timer rings.",
        "Inspect the sparkling living room together."
      ],
      "expectedOutput": "A family chore completion certificate with signed roles.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Do not handle breakable glass or heavy items without adult supervision.",
      "alternativeActivity": "Straighten and clean your school classroom library corner with a friend."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Your group finished a Science poster. There are marker caps and scrap cardboard on the floor.",
        "choiceOptions": [
          {
            "option": "Pick up marker caps, match them to markers, and sweep scraps into the dustbin together.",
            "isOptimal": true,
            "reason": "Completing clean-up immediately preserves school supplies and leaves the room tidy."
          },
          {
            "option": "Run out for recess and leave the mess for the school janitor.",
            "isOptimal": false,
            "reason": "Leaving messes for others shows disrespect for school staff."
          },
          {
            "option": "Blame your friend for using too many markers.",
            "isOptimal": false,
            "reason": "Blaming doesn’t clean the floor; teamwork does."
          }
        ],
        "keyTakeaway": "True champions clean up their own workspace cheerfully."
      },
      "independentScenario": {
        "context": "You finish your lunch in the school canteen. A friend accidentally drops their lunch tray.",
        "challengePrompt": "Describe how you will help them clean up before the bell rings.",
        "selfEvaluationRubric": "Helped pick up fallen napkins/tray, notified cleaning staff for wet spills, offered comfort."
      }
    },
    "assessment": {
      "question": "Why is dividing specific roles better than everyone doing random chores during group clean-up?",
      "contextScenario": "Organizing a team task.",
      "options": [
        {
          "id": "opt_1",
          "text": "Because clear roles prevent duplicate effort, confusion, and ensure every area gets cleaned.",
          "isCorrect": true,
          "feedback": "Correct! Because clear roles prevent duplicate effort, confusion, and ensure every area gets cleaned."
        },
        {
          "id": "opt_2",
          "text": "Because it allows some students to sleep while others work.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Because school rules require rigid assignments.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Because random cleaning is too fast.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Remember: Clear roles = high efficiency and zero confusion."
    },
    "rubric": {
      "performanceTask": "Lead or participate in a structured group clean-up task with defined responsibilities.",
      "masteryCriteria": "Executes assigned role diligently, coordinates with teammates, supports others upon completion.",
      "criteria": [
        {
          "criterion": "Role Fulfillment",
          "weightPercentage": 40,
          "emerging": "Avoids work.",
          "developing": "Works only when watched.",
          "proficient": "Completes assigned role thoroughly.",
          "exemplary": "Flawless execution with proactive excellence."
        },
        {
          "criterion": "Collaboration & Attitude",
          "weightPercentage": 35,
          "emerging": "Complains or bickers.",
          "developing": "Works silently without helping others.",
          "proficient": "Cheerful, cooperative attitude.",
          "exemplary": "Inspires team energy and resolves bottlenecks."
        },
        {
          "criterion": "Follow-Through & Inspection",
          "weightPercentage": 25,
          "emerging": "Leaves half-finished.",
          "developing": "Stops before room is complete.",
          "proficient": "Helps team until entire room passes audit.",
          "exemplary": "Conducts final quality check with pride."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Why is it unfair to leave clean-up for the school janitor or parents?"
      },
      {
        "id": "ref_2",
        "prompt": "What does T.E.A.M. stand for? (Together Everyone Achieves More)"
      },
      {
        "id": "ref_3",
        "prompt": "Which role do you enjoy most in a group clean-up?"
      },
      {
        "id": "ref_4",
        "prompt": "How does teamwork prepare you for grown-up jobs?"
      }
    ]
  },
  {
    "id": "mod_c4_m07_s1",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 7,
    "monthTheme": "Study Habits, Homework Routines & Focus",
    "sequenceNumber": 1,
    "globalIndex": 19,
    "category": "life_study_skills",
    "categoryLabel": "Study Skills & Learning Independence",
    "title": "The 25-Minute Homework Sprint with a 5-Minute Brain Break",
    "whyItMatters": "Young brains can only maintain peak focus for about 25 minutes before wandering. Working in focused sprints prevents daydreaming and leaves plenty of evening play time.",
    "learningObjectives": [
      "Set a kitchen or sand timer for 25 minutes of single-task homework",
      "Remove all toys, tablets, and snack distractions from desk during the sprint",
      "Take a 5-minute movement break (stretching, water) without looking at screens",
      "Track completed study sprints on a daily homework log"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Arjun sat down at 5 PM to do 4 Math sums. He glanced at comic books, doodled on margins, and got up for water four times. By 7 PM he was still not done and felt exhausted.",
    "explanation": "Focus is like a flashlight beam. When you shine it everywhere, you stumble in the dark. But when you lock it onto one subject for 25 minutes, you finish in one-fourth the time. After the timer rings, your brain gets a 5-minute reward break.",
    "stepByStep": [
      "Pick ONE single assignment (e.g. Math page 42).",
      "Clear everything else from desk and set a timer for 25 minutes.",
      "Work without getting up until the timer chimes.",
      "Stand up, stretch your arms, drink a glass of water for exactly 5 minutes.",
      "Return refreshed for your next task or declare homework finished!"
    ],
    "workedExample": {
      "title": "Arjun’s 25-Minute Sprint Victory",
      "scenario": "Arjun tries a 25-minute timer for English spelling.",
      "steps": [
        "Puts comic book in drawer.",
        "Sets kitchen timer for 25 minutes.",
        "Finishes 15 spelling sentences in 18 minutes.",
        "Spends remaining 7 minutes checking handwriting.",
        "Enjoys 5 minutes playing with his dog."
      ],
      "takeaway": "Timed sprints make homework feel like a fast, exciting challenge."
    },
    "commonMistakes": [
      {
        "mistake": "Checking mobile games or watching TV during the 5-minute break.",
        "correction": "Screen breaks overstimulate your eyes; stretch, do jumping jacks, or sip water instead."
      },
      {
        "mistake": "Trying to work for 2 hours straight without any rest.",
        "correction": "Your brain tires out quickly; taking regular 5-minute breaks keeps you sharp all evening."
      }
    ],
    "decisionChecklist": [
      "Is only one subject on the desk?",
      "Is the 25-minute timer ticking?",
      "Did I stay seated without distraction?",
      "Did I take a screen-free 5-minute movement break?"
    ],
    "reflectionPrompt": "How did working against a 25-minute clock change how fast your homework got done?",
    "summaryTakeaway": "One 25-minute focused sprint beats two hours of distracted daydreaming every single time.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m07_s1_hero.webp",
      "altText": "The 25-Minute Homework Sprint with a 5-Minute Brain Break - Step by step life skill demonstration for Class 4",
      "description": "Student sitting cheerfully with a small desk timer and completed worksheet.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_07_1_a",
        "title": "The 25/5 Sprint Rhythm",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m07_s1_diag1.webp",
        "altText": "The 25/5 Sprint Rhythm",
        "caption": "25 minutes deep concentration + 5 minutes movement & hydration.",
        "status": "ready"
      },
      {
        "id": "vis_c4_07_1_b",
        "title": "Distraction-Free Workspace Setup",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m07_s1_diag2.webp",
        "altText": "Distraction-Free Workspace Setup",
        "caption": "Only pencil, notebook, and timer allowed on desk.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Master the 25-Minute Study Sprint",
      "duration": "3 mins 15 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Frustrated student staring at clock vs focused student with timer.",
          "narrationTranscript": "Ever spent two hours on homework that should take twenty minutes?"
        },
        {
          "scene": 2,
          "visualDescription": "Demonstrating setting a 25-minute timer and clearing desk.",
          "narrationTranscript": "Lock your focus for just twenty-five minutes. No distractions, just one task."
        },
        {
          "scene": 3,
          "visualDescription": "Timer dings; student stretching and drinking water.",
          "narrationTranscript": "Ding! Take a five-minute movement break. Your brain will thank you."
        }
      ],
      "practicalChallengeRecap": "Set a 25-minute timer for your first homework task this evening."
    },
    "practicalActivity": {
      "title": "5-Day 25/5 Homework Sprint Tracker",
      "objective": "Complete at least one 25-minute focused study sprint each day for 5 days.",
      "materials": [
        "Timer (kitchen timer or alarm)",
        "Homework books",
        "Sprint tracking sheet"
      ],
      "procedure": [
        "Prepare books before starting timer.",
        "Start 25-minute timer and sit until it rings.",
        "Record start time and task completed.",
        "Get caregiver initials after the 5-minute break."
      ],
      "expectedOutput": "Completed 5-day sprint log with caregiver signatures.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Use a physical timer or study clock rather than a smartphone with gaming apps.",
      "alternativeActivity": "Use a simple sand timer or have a caregiver call out the 25-minute mark."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Pooja has 10 Math problems and an English reading chapter due tomorrow.",
        "choiceOptions": [
          {
            "option": "Set a 25-minute timer for Math, take a 5-minute stretch, then do a 25-minute timer for English.",
            "isOptimal": true,
            "reason": "Separating subjects into distinct sprints maintains high mental clarity."
          },
          {
            "option": "Switch between Math and English every 3 minutes whenever a sum feels hard.",
            "isOptimal": false,
            "reason": "Task switching creates mental confusion and doubles homework time."
          },
          {
            "option": "Wait until 9 PM and rush through both without a timer.",
            "isOptimal": false,
            "reason": "Late night rush leads to careless mistakes and sleepy mornings."
          }
        ],
        "keyTakeaway": "One sprint per subject keeps learning smooth and organized."
      },
      "independentScenario": {
        "context": "Your younger brother keeps asking you to play video games while your timer is running.",
        "challengePrompt": "Explain what you will tell him and how you will include him in your 5-minute break.",
        "selfEvaluationRubric": "Politely asked brother to wait until timer rings; offered to play catch during 5-minute break."
      }
    },
    "assessment": {
      "question": "What should you do during your 5-minute brain break after a 25-minute study sprint?",
      "contextScenario": "Timer just chimed after finishing Science notes.",
      "options": [
        {
          "id": "opt_1",
          "text": "Stand up, stretch your body, drink fresh water, and give your eyes a rest.",
          "isCorrect": true,
          "feedback": "Correct! Stand up, stretch your body, drink fresh water, and give your eyes a rest."
        },
        {
          "id": "opt_2",
          "text": "Play a fast-paced video game on your phone.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Start a 30-minute cartoon on television.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Eat spicy chips while reading the next chapter.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Keep your 5-minute break active and screen-free so your eyes and brain relax."
    },
    "rubric": {
      "performanceTask": "Plan and execute a single 25-minute study sprint with zero unauthorized departures from desk.",
      "masteryCriteria": "Desk prepared, timer set, single subject maintained, healthy movement break executed.",
      "criteria": [
        {
          "criterion": "Focus Maintenance",
          "weightPercentage": 40,
          "emerging": "Leaves desk >3 times.",
          "developing": "Leaves desk once for supplies.",
          "proficient": "Stays seated and focused for full 25 minutes.",
          "exemplary": "100% focused with zero self-interruptions."
        },
        {
          "criterion": "Workspace Preparation",
          "weightPercentage": 35,
          "emerging": "Distractions left on desk.",
          "developing": "Partial clearing.",
          "proficient": "All extraneous items cleared before timer starts.",
          "exemplary": "Immaculate single-subject desk setup."
        },
        {
          "criterion": "Break Quality",
          "weightPercentage": 25,
          "emerging": "Uses screen during break.",
          "developing": "Takes 15-minute break instead of 5.",
          "proficient": "Exactly 5 minutes of physical movement/hydration.",
          "exemplary": "Punctual return to desk refreshed."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "How did 25 minutes feel compared to what you expected?"
      },
      {
        "id": "ref_2",
        "prompt": "What was the biggest distraction you had to put away?"
      },
      {
        "id": "ref_3",
        "prompt": "What physical stretch felt best during your 5-minute break?"
      },
      {
        "id": "ref_4",
        "prompt": "How can you use this timer habit during exam revision weeks?"
      }
    ]
  },
  {
    "id": "mod_c4_m07_s2",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 7,
    "monthTheme": "Study Habits, Homework Routines & Focus",
    "sequenceNumber": 2,
    "globalIndex": 20,
    "category": "life_study_skills",
    "categoryLabel": "Study Skills & Learning Independence",
    "title": "Color-Coding Important Keywords Without Highlighting Everything",
    "whyItMatters": "When you color an entire textbook page yellow, nothing stands out. Learning to highlight only 3 to 5 critical keywords makes revision effortless and sharp.",
    "learningObjectives": [
      "Distinguish between a key fact (name, date, rule) and descriptive filler words",
      "Apply the \"Goldilocks Rule\": highlight no more than 1 keyword per paragraph",
      "Use yellow for definitions, blue for examples, and green for dates or numbers",
      "Review notes using only the colored words to recite the concept aloud"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Tanvi opened her EVS book before the unit test. Almost every sentence on the page was painted with neon pink highlighter. When she tried to revise, her eyes hurt and she couldn’t tell what was actually important.",
    "explanation": "A highlighter is a spotlight, not a paintbrush! If you turn on spotlights all over the stadium, it’s just daylight. Highlighting works only when 90% of the page stays plain black text and only 10% shines bright.",
    "stepByStep": [
      "Read the entire paragraph once from start to finish BEFORE picking up your marker.",
      "Ask yourself: \"What is the ONE main thing this paragraph is teaching?\"",
      "Uncap your marker and highlight only 2 to 4 words (the core noun and action).",
      "Write a one-word keyword in the pencil margin next to the paragraph.",
      "Close your eyes and test if you can explain the concept using just those highlighted words."
    ],
    "workedExample": {
      "title": "Tanvi’s Water Cycle Highlighting",
      "scenario": "Paragraph on Evaporation in EVS textbook.",
      "steps": [
        "Reads 5-line paragraph on how sun heats water into vapor.",
        "Identifies core idea: Sun heats water -> water vapor.",
        "Highlights ONLY: \"Sun heats water\" and \"evaporation\".",
        "Recites: \"Evaporation means sun heating water into gas.\""
      ],
      "takeaway": "Less color on the page means more knowledge in your head."
    },
    "commonMistakes": [
      {
        "mistake": "Highlighting while reading for the very first time.",
        "correction": "Always read the paragraph first so you know what the main conclusion is before marking."
      },
      {
        "mistake": "Coloring whole sentences including words like \"and\", \"the\", and \"because\".",
        "correction": "Highlight only key nouns and verbs; leave filler words alone."
      }
    ],
    "decisionChecklist": [
      "Did I read the paragraph first?",
      "Are fewer than 5 words highlighted?",
      "Did I avoid coloring whole sentences?",
      "Can I explain the idea using only the marked words?"
    ],
    "reflectionPrompt": "Look at a page you highlighted in the past. Is it a spotlight or a coloring book?",
    "summaryTakeaway": "Highlighting is a spotlight for your brain: mark only the key words that unlock the whole idea.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m07_s2_hero.webp",
      "altText": "Color-Coding Important Keywords Without Highlighting Everything - Step by step life skill demonstration for Class 4",
      "description": "Textbook page showing sparse, crisp highlighting on three key terms with pencil margin notes.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_07_2_a",
        "title": "The 10% Highlighting Rule",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m07_s2_diag1.webp",
        "altText": "The 10% Highlighting Rule",
        "caption": "Only 10% of text should be highlighted; 90% remains uncolored.",
        "status": "ready"
      },
      {
        "id": "vis_c4_07_2_b",
        "title": "3-Color Code System",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m07_s2_diag2.webp",
        "altText": "3-Color Code System",
        "caption": "Yellow = Main Definition, Green = Key Fact/Number, Blue = Important Example.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "The Spotlight Highlighting Method",
      "duration": "3 mins 05 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Page glowing completely neon vs clean page with 3 sharp highlights.",
          "narrationTranscript": "When everything is highlighted, nothing is important."
        },
        {
          "scene": 2,
          "visualDescription": "Student reading paragraph first, then capping marker on 3 words.",
          "narrationTranscript": "Read first. Identify the big idea. Then highlight only the power words."
        },
        {
          "scene": 3,
          "visualDescription": "Testing recall by looking only at highlighted terms.",
          "narrationTranscript": "Can you explain the lesson from three words? That is true mastery."
        }
      ],
      "practicalChallengeRecap": "Practice highlighting only 3 power words on your next textbook page."
    },
    "practicalActivity": {
      "title": "The 3-Word Paragraph Challenge",
      "objective": "Read a 3-paragraph textbook passage and highlight exactly 3 power words per paragraph.",
      "materials": [
        "Textbook or photocopied reading passage",
        "Yellow highlighter",
        "Pencil"
      ],
      "procedure": [
        "Read paragraph 1 completely.",
        "Circle the 3 most important words in pencil.",
        "Highlight only those 3 circled words.",
        "Repeat for paragraphs 2 and 3."
      ],
      "expectedOutput": "A clean passage with exactly 9 highlighted words total and margin summaries.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Do not use dark permanent markers that bleed through thin textbook paper.",
      "alternativeActivity": "Use a light pencil underline if you are not allowed to highlight in school library books."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Vihaan is studying a history paragraph: \"King Ashoka ruled Pataliputra in 268 BCE and fought the Kalinga War before embracing Buddhism.\"",
        "choiceOptions": [
          {
            "option": "Highlight \"Ashoka\", \"268 BCE\", \"Kalinga War\", and \"embraced Buddhism\".",
            "isOptimal": true,
            "reason": "Captures the ruler, date, pivotal event, and outcome in four concise terms."
          },
          {
            "option": "Highlight the entire sentence from King to Buddhism with bright pink marker.",
            "isOptimal": false,
            "reason": "Full sentence highlighting wastes ink and offers zero visual contrast."
          },
          {
            "option": "Highlight the words \"ruled\", \"and\", \"the\", and \"before\".",
            "isOptimal": false,
            "reason": "Highlighting connector words misses all factual content."
          }
        ],
        "keyTakeaway": "Select proper nouns, key verbs, and dates that anchor the historical event."
      },
      "independentScenario": {
        "context": "You are reading a science definition of Photosynthesis.",
        "challengePrompt": "Write down the exact 3 or 4 words you would highlight from the 4-line definition.",
        "selfEvaluationRubric": "Selected sunlight, carbon dioxide, chlorophyll, and food/glucose."
      }
    },
    "assessment": {
      "question": "Why should you always read a paragraph completely before highlighting any word?",
      "contextScenario": "Preparing to annotate a chapter in Social Studies.",
      "options": [
        {
          "id": "opt_1",
          "text": "Because you cannot know what is truly important until you understand the whole paragraph.",
          "isCorrect": true,
          "feedback": "Correct! Because you cannot know what is truly important until you understand the whole paragraph."
        },
        {
          "id": "opt_2",
          "text": "Because highlighters dry out if left uncapped too long.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Because teachers only check textbooks after school.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Because reading first makes the ink look darker.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Never mark on your first pass; understand first, then highlight the core concept."
    },
    "rubric": {
      "performanceTask": "Annotate a one-page textbook section using the 10% keyword highlighting method.",
      "masteryCriteria": "Under 10% text highlighted; core concepts captured; neat margin tags added.",
      "criteria": [
        {
          "criterion": "Keyword Selection",
          "weightPercentage": 40,
          "emerging": "Highlights entire sentences.",
          "developing": "Highlights 8-10 words per paragraph.",
          "proficient": "Selects 3-5 high-yield keywords per paragraph.",
          "exemplary": "Flawless selection of critical terminology."
        },
        {
          "criterion": "Visual Restraint",
          "weightPercentage": 35,
          "emerging": ">40% page colored.",
          "developing": "20-30% colored.",
          "proficient": "Strict adherence to under 10% colored area.",
          "exemplary": "Pristine contrast with zero bleed-through."
        },
        {
          "criterion": "Margin Summarization",
          "weightPercentage": 25,
          "emerging": "No margin notes.",
          "developing": "Incomplete notes.",
          "proficient": "Neat 1-2 word pencil margin guide next to each block.",
          "exemplary": "Self-quizzing cues written neatly in margins."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Why is it tempting to color whole sentences when reading?"
      },
      {
        "id": "ref_2",
        "prompt": "How does a clean page make your eyes feel during late-night revision?"
      },
      {
        "id": "ref_3",
        "prompt": "Which color code did you find most helpful for definitions?"
      },
      {
        "id": "ref_4",
        "prompt": "How will you teach this to a friend who highlights their whole book?"
      }
    ]
  },
  {
    "id": "mod_c4_m07_s3",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 7,
    "monthTheme": "Study Habits, Homework Routines & Focus",
    "sequenceNumber": 3,
    "globalIndex": 21,
    "category": "life_study_skills",
    "categoryLabel": "Study Skills & Learning Independence",
    "title": "Building a \"What's Due Tomorrow\" Sticky-Note Homework Tracker",
    "whyItMatters": "Forgetting an assignment leads to morning stress and lower grades. A simple 3-column sticky-note board makes all your responsibilities visible at a glance.",
    "learningObjectives": [
      "Set up 3 columns on a study corkboard or wall: \"To Do\", \"Doing Now\", \"Done\"",
      "Write each subject assignment on an individual small sticky note",
      "Move the sticky note physically across columns as you complete each task",
      "Discard or archive \"Done\" notes at night to experience a clean slate"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Ishaan went to sleep confident that he had finished everything. Next morning at school, his Hindi teacher asked for the poem recitation chart. Ishaan had completely forgotten about it because it wasn’t in his main notebook.",
    "explanation": "Our brains are great for thinking, but terrible at remembering lists of five different tasks! When you write tasks on colorful sticky notes and post them on a mini-board, you never have to ask \"What was I supposed to do?\" Moving a note to \"Done\" gives your brain a real dopamine boost!",
    "stepByStep": [
      "Draw 3 vertical columns on a sheet of cardboard: TO DO, DOING, DONE.",
      "Open your school diary and write every homework task on a separate sticky note.",
      "Stick all notes in the TO DO column.",
      "When you sit down to work, move ONE note into DOING.",
      "When finished and checked, move it into DONE with a high five!"
    ],
    "workedExample": {
      "title": "Ishaan’s Visual Board Setup",
      "scenario": "Homework list: Math Ex 3.2, English sentences, EVS leaf drawing.",
      "steps": [
        "Writes 3 sticky notes.",
        "Places all 3 in TO DO.",
        "Moves Math to DOING.",
        "Moves Math to DONE and starts English.",
        "By 6:30 PM all 3 notes are in DONE."
      ],
      "takeaway": "Seeing notes move to DONE proves your progress and builds confidence."
    },
    "commonMistakes": [
      {
        "mistake": "Writing 5 different subjects onto one single crowded sticky note.",
        "correction": "Use one note per subject so you can move each task independently as you finish."
      },
      {
        "mistake": "Leaving finished notes on the board for three weeks.",
        "correction": "Clear the DONE column every night so tomorrow starts with a fresh, clear board."
      }
    ],
    "decisionChecklist": [
      "Did I check my school diary for all subjects?",
      "Is each task written on its own note?",
      "Is only ONE note in DOING right now?",
      "Did I clear the DONE column before bed?"
    ],
    "reflectionPrompt": "How did physically moving a note to the DONE column feel after finishing a hard task?",
    "summaryTakeaway": "Make your responsibilities visible: write it, move it, and celebrate getting it done.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m07_s3_hero.webp",
      "altText": "Building a \"What's Due Tomorrow\" Sticky-Note Homework Tracker - Step by step life skill demonstration for Class 4",
      "description": "Child smiling while moving a bright yellow sticky note from DOING into DONE on a colorful wall board.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_07_3_a",
        "title": "The 3-Column Task Flow",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m07_s3_diag1.webp",
        "altText": "The 3-Column Task Flow",
        "caption": "TO DO (What waits) -> DOING (Only 1 item) -> DONE (Celebrate!).",
        "status": "ready"
      },
      {
        "id": "vis_c4_07_3_b",
        "title": "Single Task Sticky Note Template",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m07_s3_diag2.webp",
        "altText": "Single Task Sticky Note Template",
        "caption": "Subject name at top, specific page/exercise number, due date.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "The Visual Homework Board That Works",
      "duration": "2 mins 50 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Child confused about forgotten homework.",
          "narrationTranscript": "Our brains can't hold five homework assignments in memory at once."
        },
        {
          "scene": 2,
          "visualDescription": "Creating TO DO, DOING, DONE columns with sticky notes.",
          "narrationTranscript": "Three simple columns turn homework into a satisfying game."
        },
        {
          "scene": 3,
          "visualDescription": "Moving sticky note to DONE with a satisfying tap.",
          "narrationTranscript": "Move it to DONE. That feeling of accomplishment is 100% earned."
        }
      ],
      "practicalChallengeRecap": "Create your 3-column sticky-note board above your desk today."
    },
    "practicalActivity": {
      "title": "Cardboard Kanban Board Construction",
      "objective": "Construct a reusable 3-column sticky note board and track today’s homework.",
      "materials": [
        "A4 cardboard or chart paper",
        "Marker",
        "Sticky notes pad",
        "Tape or blue-tac"
      ],
      "procedure": [
        "Rule 2 lines to make 3 equal columns: TO DO, DOING, DONE.",
        "Check today’s school diary.",
        "Write one note for each subject.",
        "Complete all tasks by moving notes across."
      ],
      "expectedOutput": "A functioning 3-column board mounted near study desk with completed notes in DONE.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Do not use tape that peels paint off your bedroom wall.",
      "alternativeActivity": "Draw 3 columns on a small dry-erase whiteboard if available."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Simran has 4 tasks in TO DO. She tries to move all 4 into DOING at the same time.",
        "choiceOptions": [
          {
            "option": "Pick the highest priority task, move ONLY that one into DOING, and leave the other 3 in TO DO.",
            "isOptimal": true,
            "reason": "Human brains can only do one task well at a time; multitasking causes errors."
          },
          {
            "option": "Move all 4 into DONE before starting to feel good.",
            "isOptimal": false,
            "reason": "Faking progress leaves assignments uncompleted and creates trouble at school."
          },
          {
            "option": "Tear up all sticky notes because 4 tasks feel overwhelming.",
            "isOptimal": false,
            "reason": "Quitting guarantees failing grades and disappointed teachers."
          }
        ],
        "keyTakeaway": "Keep DOING strictly limited to one single task at any moment."
      },
      "independentScenario": {
        "context": "Teacher assigns a Science chart due in 4 days and Math due tomorrow.",
        "challengePrompt": "Explain how you will arrange these two notes on your board today.",
        "selfEvaluationRubric": "Put Math into DOING for today; placed Science chart in TO DO with due date clearly marked."
      }
    },
    "assessment": {
      "question": "Why should you have only ONE sticky note in the \"DOING\" column at any moment?",
      "contextScenario": "Working through a busy evening of assignments.",
      "options": [
        {
          "id": "opt_1",
          "text": "Because focusing on one single task finishes it faster and prevents feeling overwhelmed.",
          "isCorrect": true,
          "feedback": "Correct! Because focusing on one single task finishes it faster and prevents feeling overwhelmed."
        },
        {
          "id": "opt_2",
          "text": "Because sticky notes fall down if placed close together.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Because school rules allow only one homework per student.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Because the teacher will check your DOING column.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Keep your working column single-task focused to protect your concentration."
    },
    "rubric": {
      "performanceTask": "Build a 3-column task board and track a full evening of homework independently.",
      "masteryCriteria": "Board built cleanly; tasks accurately transcribed; single WIP maintained; evening reset completed.",
      "criteria": [
        {
          "criterion": "Board Layout & Legibility",
          "weightPercentage": 40,
          "emerging": "Messy, illegible columns.",
          "developing": "Columns drawn without headers.",
          "proficient": "Clear 3-column structure with bold labels.",
          "exemplary": "Visually appealing, durable study station fixture."
        },
        {
          "criterion": "Task Granularity",
          "weightPercentage": 35,
          "emerging": "Single note says \"Homework\".",
          "developing": "Missing page numbers.",
          "proficient": "Each subject on distinct note with page numbers.",
          "exemplary": "Precise task definitions with estimated sprint times."
        },
        {
          "criterion": "Workflow Fidelity",
          "weightPercentage": 25,
          "emerging": "Does not move notes.",
          "developing": "Puts all in DOING.",
          "proficient": "Strict 1-task DOING limit; moves to DONE.",
          "exemplary": "Self-directed audit and nightly board reset."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "What was the most satisfying part of moving notes to DONE?"
      },
      {
        "id": "ref_2",
        "prompt": "Did you find any task you almost forgot before writing it down?"
      },
      {
        "id": "ref_3",
        "prompt": "Where is the best spot near your desk to keep your board visible?"
      },
      {
        "id": "ref_4",
        "prompt": "How can this board help you track weekend chores too?"
      }
    ]
  },
  {
    "id": "mod_c4_m08_s1",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 8,
    "monthTheme": "Home Care, Meal Etiquette & Kitchen Safety",
    "sequenceNumber": 1,
    "globalIndex": 22,
    "category": "life_independence",
    "categoryLabel": "Personal Independence & Daily Living",
    "title": "Preparing a Simple Supervised Cold Snack (Peanut Butter & Banana Slices)",
    "whyItMatters": "Being able to make your own healthy after-school snack builds self-reliance, helps busy parents, and teaches safe food preparation.",
    "learningObjectives": [
      "Wash hands with soap for 20 seconds before touching any food or utensils",
      "Use a round-tipped plastic or butter knife safely with fingers curled like a bear claw",
      "Peel a ripe banana and slice into even bite-sized rounds",
      "Spread peanut butter or jam on bread or crackers and clean prep surface afterwards"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Rohan came home from school starving. His mother was on a work phone call. Instead of waiting impatiently or whining, Rohan decided to prepare a healthy banana snack by himself.",
    "explanation": "Preparing your own snack is one of the first steps of growing up! You don’t need a gas stove or fire to make delicious food. With clean hands and a dull butter knife, you can make energy-rich snacks safely in 5 minutes.",
    "stepByStep": [
      "Wash hands thoroughly with soap and warm water; dry on a clean kitchen towel.",
      "Place a clean chopping board on the counter.",
      "Peel a banana and place it flat on the board.",
      "Hold the banana with fingers curled like a \"bear claw\" and slice gently using a round-tip butter knife.",
      "Spread topping on whole-wheat bread or biscuit rounds and arrange banana slices on top."
    ],
    "workedExample": {
      "title": "Rohan’s Energy Snack Plate",
      "scenario": "Rohan makes afternoon snack for himself and sister.",
      "steps": [
        "Washes hands.",
        "Slices 1 banana into 8 neat rounds.",
        "Spreads 1 spoon of peanut butter on 2 whole-grain rusks.",
        "Places 4 banana coins on each.",
        "Wipes board and washes butter knife."
      ],
      "takeaway": "A tidy cook cleans up as soon as the snack is prepared."
    },
    "commonMistakes": [
      {
        "mistake": "Using a sharp chef’s knife from the wooden knife block without adult permission.",
        "correction": "Always use a blunt butter knife or plastic kid-safe knife; never touch sharp knives without adult supervision."
      },
      {
        "mistake": "Leaving sticky peanut butter spoons and banana peels on the dining counter.",
        "correction": "Throw peels in the wet-waste bin and put utensils in the kitchen sink immediately."
      }
    ],
    "decisionChecklist": [
      "Did I wash hands with soap first?",
      "Did I use a blunt butter knife?",
      "Were fingers curled in a bear claw?",
      "Did I wipe the counter and put dishes in sink?"
    ],
    "reflectionPrompt": "How did preparing your own snack feel compared to asking an adult to do it for you?",
    "summaryTakeaway": "Clean hands, safe tools, and tidy habits make you an independent snack master.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m08_s1_hero.webp",
      "altText": "Preparing a Simple Supervised Cold Snack (Peanut Butter & Banana Slices) - Step by step life skill demonstration for Class 4",
      "description": "Child safely slicing a banana on a wooden chopping board using a blunt butter knife with bear-claw fingers.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_08_1_a",
        "title": "The Bear-Claw Finger Guard",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m08_s1_diag1.webp",
        "altText": "The Bear-Claw Finger Guard",
        "caption": "Curl fingertips under like a bear paw so knife blade never touches skin.",
        "status": "ready"
      },
      {
        "id": "vis_c4_08_1_b",
        "title": "Cold Snack Master Station",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m08_s1_diag2.webp",
        "altText": "Cold Snack Master Station",
        "caption": "Chopping board, blunt knife, clean plate, wet-waste peel bowl.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Safe Snacking: The Bear-Claw Banana Slice",
      "duration": "3 mins 20 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Child washing hands thoroughly at kitchen sink.",
          "narrationTranscript": "Rule number one of any kitchen: twenty seconds of soapy water."
        },
        {
          "scene": 2,
          "visualDescription": "Demonstrating curled fingers 'bear claw' holding banana.",
          "narrationTranscript": "Curl your fingertips like a gentle bear claw. Slice with a blunt butter knife."
        },
        {
          "scene": 3,
          "visualDescription": "Plating snack and wiping counter with damp cloth.",
          "narrationTranscript": "Independent chefs always leave the kitchen cleaner than they found it."
        }
      ],
      "practicalChallengeRecap": "Make a supervised cold banana or cucumber snack today and clean your prep area."
    },
    "practicalActivity": {
      "title": "Independent Afternoon Snack Project",
      "objective": "Prepare a 2-ingredient healthy cold snack safely under adult supervision and clean up.",
      "materials": [
        "1 banana or cucumber",
        "Blunt butter knife",
        "Chopping board",
        "Plate",
        "Clean duster"
      ],
      "procedure": [
        "Ask an adult for permission and supervision.",
        "Wash hands with soap.",
        "Peel and slice using the bear claw technique.",
        "Plate and serve.",
        "Wipe chopping board and wash knife."
      ],
      "expectedOutput": "A served snack plate and an adult-verified clean kitchen counter.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Do not use stoves, microwaves, or sharp pointed knives.",
      "alternativeActivity": "Assemble a dry trail-mix cup with roasted peanuts, raisins, and roasted murmura."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Reyansh is slicing a cucumber and the knife slips slightly.",
        "choiceOptions": [
          {
            "option": "Stop immediately, check fingers, adjust grip into a firm bear claw, and cut slowly.",
            "isOptimal": true,
            "reason": "Slowing down and curling fingers prevents accidental nicks or slips."
          },
          {
            "option": "Hurry up and chop faster before anyone sees.",
            "isOptimal": false,
            "reason": "Rushing with slipping tools leads to injury."
          },
          {
            "option": "Switch to a giant sharp cleaver from the drawer.",
            "isOptimal": false,
            "reason": "Using unauthorized sharp blades creates severe danger."
          }
        ],
        "keyTakeaway": "Control and patience are the marks of a skilled home chef."
      },
      "independentScenario": {
        "context": "You finished making your snack and your friend arrives to play.",
        "challengePrompt": "Explain what you must do with your dirty plate, knife, and peels before running out.",
        "selfEvaluationRubric": "Bin banana peel in green bin, wash knife/board in sink, wipe counter before going out."
      }
    },
    "assessment": {
      "question": "Why should you curl your non-knife fingers into a \"bear claw\" when slicing food?",
      "contextScenario": "Preparing cucumber or banana slices with a butter knife.",
      "options": [
        {
          "id": "opt_1",
          "text": "Because curled knuckles guide the blade safely while protecting your fingertips from getting nicked.",
          "isCorrect": true,
          "feedback": "Correct! Because curled knuckles guide the blade safely while protecting your fingertips from getting nicked."
        },
        {
          "id": "opt_2",
          "text": "Because it makes you look like a wild animal.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Because bananas slice faster when clawed.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Because it keeps the cutting board from moving.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Always tuck fingertips under; let your flat knuckle rest against the blade side."
    },
    "rubric": {
      "performanceTask": "Prepare a healthy cold snack using proper hygiene, knife technique, and kitchen clean-up.",
      "masteryCriteria": "Thorough handwashing, flawless bear-claw grip, even slices, pristine cleanup.",
      "criteria": [
        {
          "criterion": "Food Hygiene & Prep",
          "weightPercentage": 40,
          "emerging": "Touches food without washing hands.",
          "developing": "Rinses with water only.",
          "proficient": "20-second soap handwash; clean board setup.",
          "exemplary": "Flawless sanitary prep with clean apron/towel."
        },
        {
          "criterion": "Cutting Technique",
          "weightPercentage": 35,
          "emerging": "Fingers flat near blade.",
          "developing": "Inconsistent claw grip.",
          "proficient": "Consistent bear claw; blunt knife used safely.",
          "exemplary": "Even, disciplined knife strokes with complete control."
        },
        {
          "criterion": "Workstation Cleanup",
          "weightPercentage": 25,
          "emerging": "Leaves peels and mess on counter.",
          "developing": "Cleans only when told.",
          "proficient": "Independently wipes counter, bins peels, washes knife.",
          "exemplary": "Spotless reset of kitchen station."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "What was the tastiest part of making your own snack?"
      },
      {
        "id": "ref_2",
        "prompt": "Why is handwashing with soap non-negotiable before touching food?"
      },
      {
        "id": "ref_3",
        "prompt": "How does curling your fingers make cutting feel safer?"
      },
      {
        "id": "ref_4",
        "prompt": "What healthy snack will you make for your parents this weekend?"
      }
    ]
  },
  {
    "id": "mod_c4_m08_s2",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 8,
    "monthTheme": "Home Care, Meal Etiquette & Kitchen Safety",
    "sequenceNumber": 2,
    "globalIndex": 23,
    "category": "life_independence",
    "categoryLabel": "Personal Independence & Daily Living",
    "title": "Clearing the Dining Table & Rinsing Your Plate After Meals",
    "whyItMatters": "Leaving your dirty dishes for others shows disrespect. Clearing your own plate, disposing of food scraps, and rinsing builds family teamwork and gratitude.",
    "learningObjectives": [
      "Pick up your plate and glass with two hands at the end of every meal",
      "Scrape leftover food scraps into the green wet-waste compost bin using a fork",
      "Rinse the plate under the kitchen tap to prevent dried curry stains",
      "Place the rinsed dish neatly into the kitchen wash basin"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Every dinner, Aarav would eat, push his chair back, say \"I am done!\", and run straight to watch cartoons, leaving a messy plate with rice grains scattered on the table.",
    "explanation": "In a loving family, everyone works together. When you leave your dirty plate on the table, someone else has to bend down, pick up your mess, and scrape cold food. Taking 60 seconds to clear your own spot shows true respect and maturity.",
    "stepByStep": [
      "Check your table area for fallen crumbs or napkins and scoop them onto your plate.",
      "Pick up your plate and glass using two steady hands.",
      "Walk calmly to the kitchen; do not run or balance dishes recklessly.",
      "Use a fork or spoon to scrape all food waste into the green wet-waste dustbin.",
      "Turn on the tap briefly, rinse away loose curry/sauce, and place dish gently in the sink."
    ],
    "workedExample": {
      "title": "Aarav’s 60-Second Table Reset",
      "scenario": "Dinner finishes at 8:30 PM.",
      "steps": [
        "Aarav pushes his chair in.",
        "Picks up his thali and katori.",
        "Scrapes leftover roti crusts into wet bin.",
        "Rinses plate under running water for 5 seconds.",
        "Places plate neatly in sink."
      ],
      "takeaway": "Sixty seconds of effort makes your home feel cooperative and clean."
    },
    "commonMistakes": [
      {
        "mistake": "Leaving food scraps on the plate when putting it in the sink.",
        "correction": "Food scraps clog the drain pipe; always scrape solids into the wet-waste bin first."
      },
      {
        "mistake": "Stacking a greasy plate right on top of a clean drinking glass.",
        "correction": "Keep glassware and oily plates separated to prevent broken glass."
      }
    ],
    "decisionChecklist": [
      "Did I push my chair in?",
      "Did I carry dishes with two hands?",
      "Did I scrape all leftovers into the wet bin?",
      "Did I rinse off loose food before setting in sink?"
    ],
    "reflectionPrompt": "How would you feel if a guest ate at your house and left their dirty plate on your sofa?",
    "summaryTakeaway": "Clearing your own plate after every meal is the simplest sign of respect and family teamwork.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m08_s2_hero.webp",
      "altText": "Clearing the Dining Table & Rinsing Your Plate After Meals - Step by step life skill demonstration for Class 4",
      "description": "Child holding a stainless steel thali with two hands and scraping food scraps into a green organic waste bin.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_08_2_a",
        "title": "The 3-Step Dish Departure",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m08_s2_diag1.webp",
        "altText": "The 3-Step Dish Departure",
        "caption": "1. Scrape scraps to wet bin -> 2. Rinse loose food under tap -> 3. Stack gently in sink.",
        "status": "ready"
      },
      {
        "id": "vis_c4_08_2_b",
        "title": "Table Manners Audit",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m08_s2_diag2.webp",
        "altText": "Table Manners Audit",
        "caption": "Push chair in, wipe your crumb zone, thank the cook.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "The 60-Second Post-Meal Routine",
      "duration": "2 mins 45 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Messy dining table with abandoned dirty plates.",
          "narrationTranscript": "A meal isn't finished until the table is cleared."
        },
        {
          "scene": 2,
          "visualDescription": "Child scraping food into compost bin and rinsing plate.",
          "narrationTranscript": "Scrape food into the green bin. Rinse off the sauce so it doesn't dry like glue."
        },
        {
          "scene": 3,
          "visualDescription": "Placing dish neatly in sink and pushing chair in.",
          "narrationTranscript": "Push in your chair. Sixty seconds of teamwork makes a happy home."
        }
      ],
      "practicalChallengeRecap": "Clear, scrape, rinse, and stack your plate after every meal today."
    },
    "practicalActivity": {
      "title": "7-Day Clean Table Family Pledge",
      "objective": "Independently clear, scrape, and rinse your plate after every lunch and dinner for 7 days.",
      "materials": [
        "Your meal plate",
        "Fork/spoon for scraping",
        "Kitchen sink",
        "Pledge chart"
      ],
      "procedure": [
        "Finish meal completely.",
        "Scrape leftovers into wet-waste bin.",
        "Rinse under tap for 5 seconds.",
        "Place neatly in sink.",
        "Record tick on pledge chart."
      ],
      "expectedOutput": "A 14-meal signed tracking chart signed by a family member.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Walk slowly when carrying ceramic or glass plates to avoid breakage.",
      "alternativeActivity": "Help wipe down the dining table with a damp cloth if using plastic plates."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Dev finishes dinner and sees that his little sister has also finished hers but is too small to reach the sink.",
        "choiceOptions": [
          {
            "option": "Clear his own plate first, then help carry his sister’s unbreakable bowl to the sink.",
            "isOptimal": true,
            "reason": "Demonstrates initiative, family leadership, and protective care."
          },
          {
            "option": "Laugh at his sister and leave both plates on the table.",
            "isOptimal": false,
            "reason": "Unkind and leaves double the work for parents."
          },
          {
            "option": "Try to carry 6 plates, glasses, and bowls stacked in a wobbly tower.",
            "isOptimal": false,
            "reason": "Risk of dropping and shattering dishes all over the floor."
          }
        ],
        "keyTakeaway": "Be helpful, but make multiple safe trips instead of carrying dangerous towers."
      },
      "independentScenario": {
        "context": "You are eating dinner at your best friend’s house with their family.",
        "challengePrompt": "Explain what you will do with your plate when dinner finishes.",
        "selfEvaluationRubric": "Asked host where to put plate, thanked them for the meal, scraped and rinsed plate politely."
      }
    },
    "assessment": {
      "question": "Why is it important to rinse your plate under the tap before putting it into the kitchen sink?",
      "contextScenario": "Clearing your dinner plate after eating dal and rice.",
      "options": [
        {
          "id": "opt_1",
          "text": "Because rinsing washes away loose food before it dries into rock-hard crusts that are tough to wash.",
          "isCorrect": true,
          "feedback": "Correct! Because rinsing washes away loose food before it dries into rock-hard crusts that are tough to wash."
        },
        {
          "id": "opt_2",
          "text": "Because water makes plates weigh less.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Because you don’t need soap if you rinse.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Because kitchen sinks require running water 24/7.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Always rinse immediately so curry and grease wash away easily during dishwashing."
    },
    "rubric": {
      "performanceTask": "Clear a meal setting including food disposal, dish rinsing, and chair reset.",
      "masteryCriteria": "Two-hand carry, 100% scrap removal, thorough rinse, chair aligned, gratitude expressed.",
      "criteria": [
        {
          "criterion": "Carrying & Safety",
          "weightPercentage": 40,
          "emerging": "Carries carelessly with one hand.",
          "developing": "Rushes to sink.",
          "proficient": "Calm, steady two-hand carry.",
          "exemplary": "Flawless balance with zero spills or clatter."
        },
        {
          "criterion": "Scraping & Rinsing",
          "weightPercentage": 35,
          "emerging": "Dumps plate with food into sink.",
          "developing": "Misses sticky scraps.",
          "proficient": "Scrapes all food to wet bin; thorough rinse.",
          "exemplary": "Pristine pre-rinse preventing drain clogs."
        },
        {
          "criterion": "Table Courtesy",
          "weightPercentage": 25,
          "emerging": "Leaves chair out and crumbs on table.",
          "developing": "Pushes chair only when reminded.",
          "proficient": "Pushes chair in and thanks family cook.",
          "exemplary": "Wipes crumb area and assists others."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Who usually cleans the dishes in your home?"
      },
      {
        "id": "ref_2",
        "prompt": "How did they react when you cleared and rinsed your plate independently?"
      },
      {
        "id": "ref_3",
        "prompt": "Why do dried food stains take so much elbow grease to wash off later?"
      },
      {
        "id": "ref_4",
        "prompt": "How does clearing your plate make you feel more responsible?"
      }
    ]
  },
  {
    "id": "mod_c4_m08_s3",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 8,
    "monthTheme": "Home Care, Meal Etiquette & Kitchen Safety",
    "sequenceNumber": 3,
    "globalIndex": 24,
    "category": "life_safety_health",
    "categoryLabel": "Safety, Health & Well-being",
    "title": "Kitchen Safety: The Three-Foot Boundary Away from Stoves & Steam",
    "whyItMatters": "Kitchens have hot gas flames, boiling water, and sharp appliances. Knowing the safety boundaries prevents painful burns, scalds, and accidents.",
    "learningObjectives": [
      "Identify the \"Hot Zone\": a 3-foot safety perimeter around gas stoves and ovens",
      "Turn pot and pan handles inward toward the back of the stove, never sticking out into the aisle",
      "Never open a boiling cooker lid or touch steam whistling from a pressure cooker",
      "Know the immediate first aid for a minor burn: 10 minutes of cool running tap water"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Priya ran into the kitchen chasing her bouncing tennis ball. She brushed past the stove where a pot of boiling milk was simmering with the handle sticking straight out into the doorway.",
    "explanation": "The kitchen is a wonderful place for cooking, but the stove area is a high-hazard zone. Boiling liquids, splattering hot oil, and pressure cooker steam can cause severe burns in a split second. Keeping a 3-foot safety zone keeps you and your family safe.",
    "stepByStep": [
      "Treat the gas stove and oven as a \"Red Zone\": stay at least 3 big steps (3 feet) back unless guided by an adult.",
      "If you see a pan handle sticking out into the walkway, politely notify an adult or gently turn it inward.",
      "Never touch or hover your face over a pressure cooker weight or bubbling soup pot.",
      "If oil is frying, stay out of the kitchen to avoid hot oil splatters.",
      "If someone gets a minor burn, immediately run cool tap water over it for 10 minutes (NEVER ice or toothpaste)."
    ],
    "workedExample": {
      "title": "Priya’s Kitchen Safety Catch",
      "scenario": "Priya notices milk boiling with handle facing forward.",
      "steps": [
        "Stops 3 feet away.",
        "Alerts father: \"Papa, the milk pan handle is sticking out.\"",
        "Father turns handle sideways.",
        "Priya plays ball outside in the garden."
      ],
      "takeaway": "Alerting an adult about sticking handles prevents catastrophic kitchen spills."
    },
    "commonMistakes": [
      {
        "mistake": "Putting ice cubes or toothpaste on a hot burn.",
        "correction": "Toothpaste traps heat inside the skin; always use cool running tap water for 10 full minutes."
      },
      {
        "mistake": "Trying to pull off a whistling pressure cooker whistle with bare hands.",
        "correction": "Steam reaches over 100°C and causes instant deep burns; never touch a hot cooker."
      }
    ],
    "decisionChecklist": [
      "Am I standing at least 3 feet away from active burners?",
      "Are all pan handles turned inward?",
      "Are my face and hands far away from steam?",
      "Do I know to use cool water for burns?"
    ],
    "reflectionPrompt": "Look at your home kitchen stove. Are the pan handles turned inward right now?",
    "summaryTakeaway": "Respect the kitchen hot zone: stay three feet back, turn handles in, and treat steam with caution.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m08_s3_hero.webp",
      "altText": "Kitchen Safety: The Three-Foot Boundary Away from Stoves & Steam - Step by step life skill demonstration for Class 4",
      "description": "Diagram of a kitchen stove showing the 3-foot yellow warning perimeter and pan handles safely turned inward.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_08_3_a",
        "title": "The 3-Foot Stove Boundary",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m08_s3_diag1.webp",
        "altText": "The 3-Foot Stove Boundary",
        "caption": "Yellow safety perimeter around gas burners, hot ovens, and boiling kettles.",
        "status": "ready"
      },
      {
        "id": "vis_c4_08_3_b",
        "title": "Handle Direction Rule",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m08_s3_diag2.webp",
        "altText": "Handle Direction Rule",
        "caption": "SAFE: Handle turned sideways over counter. DANGEROUS: Handle pointing out into aisle.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Kitchen Danger Zones: Stay Safe Around Stoves",
      "duration": "3 mins 10 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Child running near stove with handle sticking out.",
          "narrationTranscript": "One accidental bump can send boiling soup flying."
        },
        {
          "scene": 2,
          "visualDescription": "Turning pan handles inward and marking 3-foot zone.",
          "narrationTranscript": "Keep pan handles pointing inward and keep three feet of safe space."
        },
        {
          "scene": 3,
          "visualDescription": "Running cool tap water over a finger for 10 minutes.",
          "narrationTranscript": "Burn emergency? Ten minutes of cool running water. No ice, no toothpaste."
        }
      ],
      "practicalChallengeRecap": "Audit your kitchen stove today to ensure all pot handles point safely inward."
    },
    "practicalActivity": {
      "title": "Kitchen Hot-Zone Safety Audit",
      "objective": "Inspect your home kitchen with a parent and verify stove boundaries and emergency burn response.",
      "materials": [
        "Kitchen audit checklist",
        "Measuring tape or 3-step ruler",
        "Pencil"
      ],
      "procedure": [
        "Walk into kitchen with an adult.",
        "Identify the 3-foot perimeter around stove.",
        "Check if pan handles on the counter point inward.",
        "Locate cold tap water station for burn first aid."
      ],
      "expectedOutput": "A signed Kitchen Safety Checklist verified by an adult family member.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Do not touch burners, knobs, or hot surfaces during the audit.",
      "alternativeActivity": "Draw a poster showing the \"3-Foot Kitchen Hot Zone\" and tape it on the fridge."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Kabir sees steam pouring out of the rice pot on the stove while his mother is in the bathroom.",
        "choiceOptions": [
          {
            "option": "Stay 3 feet back, do not touch the pot, and call out loudly to mother that the pot is steaming.",
            "isOptimal": true,
            "reason": "Maintains personal safety while informing the responsible adult."
          },
          {
            "option": "Try to lift the hot metal lid with bare hands to check the rice.",
            "isOptimal": false,
            "reason": "Hot metal and trapped steam cause instant severe hand burns."
          },
          {
            "option": "Throw cold water at the burning gas flame.",
            "isOptimal": false,
            "reason": "Can cause a sudden flare-up, steam explosion, or gas leak."
          }
        ],
        "keyTakeaway": "Never attempt to handle active boiling cookware without adult hands."
      },
      "independentScenario": {
        "context": "Your younger cousin runs into the kitchen toward the stove to grab a hot sweet.",
        "challengePrompt": "Explain what physical action and words you will use to protect them.",
        "selfEvaluationRubric": "Gently blocked cousin from entering hot zone, guided them back, and warned about hot stove."
      }
    },
    "assessment": {
      "question": "What is the correct first-aid action for a minor burn caused by touching hot cookware?",
      "contextScenario": "Accidentally brushed forearm against a hot frying pan.",
      "options": [
        {
          "id": "opt_1",
          "text": "Hold the burned area under cool running tap water for 10 to 15 minutes immediately.",
          "isCorrect": true,
          "feedback": "Correct! Hold the burned area under cool running tap water for 10 to 15 minutes immediately."
        },
        {
          "id": "opt_2",
          "text": "Smear white toothpaste or butter all over the burn.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Rub a large ice cube directly onto the blistered skin.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Cover the burn with hot turmeric paste and wrap tightly.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Cool running water gently removes heat from deep skin layers without causing frostbite or infection."
    },
    "rubric": {
      "performanceTask": "Conduct a kitchen safety demonstration explaining hot zones, handle placement, and burn first aid.",
      "masteryCriteria": "Accurate boundary definition, handle risk explained, proper burn first aid demonstrated.",
      "criteria": [
        {
          "criterion": "Perimeter Awareness",
          "weightPercentage": 40,
          "emerging": "Unaware of stove risks.",
          "developing": "Knows fire is hot but forgets steam.",
          "proficient": "Clearly identifies 3-foot zone and steam hazards.",
          "exemplary": "Thorough identification of heat, steam, and splatter zones."
        },
        {
          "criterion": "Cookware Handle Safety",
          "weightPercentage": 35,
          "emerging": "Leaves handles outward.",
          "developing": "Identifies risk only when prompted.",
          "proficient": "Explains handle inward rule correctly.",
          "exemplary": "Proactively checks handle orientation in kitchen."
        },
        {
          "criterion": "First Aid Knowledge",
          "weightPercentage": 25,
          "emerging": "Recommends toothpaste or ice.",
          "developing": "Mentions water but for <1 minute.",
          "proficient": "Specifies 10 minutes of cool running tap water.",
          "exemplary": "Accurately explains cooling mechanism and cautions against ice."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Why is steam from a cooker just as dangerous as an open fire flame?"
      },
      {
        "id": "ref_2",
        "prompt": "Have you ever seen a pot handle sticking out in a way that could get bumped?"
      },
      {
        "id": "ref_3",
        "prompt": "Why does toothpaste actually harm a burn instead of helping it?"
      },
      {
        "id": "ref_4",
        "prompt": "What is your family’s safety rule when someone is frying foods in hot oil?"
      }
    ]
  },
  {
    "id": "mod_c4_m09_s1",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 9,
    "monthTheme": "Personal Hygiene, Screen Limits & Healthy Sleep",
    "sequenceNumber": 1,
    "globalIndex": 25,
    "category": "life_safety_health",
    "categoryLabel": "Safety, Health & Well-being",
    "title": "The Two-Minute Circular Toothbrushing & Handwash Routine",
    "whyItMatters": "Cavities and tummy bugs are completely preventable. Mastering the 2-minute circular brushing technique and 20-second soap handwash keeps you healthy and cavity-free.",
    "learningObjectives": [
      "Brush teeth for 2 full minutes twice daily using gentle circular motions",
      "Clean the front, chewing surfaces, and back of every tooth, plus gently brush the tongue",
      "Wash hands with soap for 20 seconds, lathering between fingers, backs of hands, and under nails",
      "Rinse mouth thoroughly and store toothbrush upright in a dry holder"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Siddharth brushed his teeth in 25 seconds flat: a few quick horizontal scrubs across his front teeth, a quick spit, and he ran out. At his dental checkup, the dentist found two cavities on his back molars.",
    "explanation": "Plaque is a sticky film of bacteria that loves to hide in the grooves of your back molars and along the gumline. Scrubbing back-and-forth like a saw damages your gums! Tiny circles gently polish away plaque without hurting your teeth.",
    "stepByStep": [
      "Place a pea-sized dot of fluoride toothpaste on soft bristles.",
      "Tilt brush at a 45-degree angle toward the gumline.",
      "Move the brush in small, gentle circles: 30 seconds for top-right, top-left, bottom-right, bottom-left (2 minutes total).",
      "Brush the flat chewing surfaces back and forth.",
      "Gently sweep your tongue from back to front, spit out toothpaste, and rinse brush."
    ],
    "workedExample": {
      "title": "Siddharth’s 2-Minute Toothbrush Tune",
      "scenario": "Siddharth sings a 2-minute song while brushing.",
      "steps": [
        "Sings verse 1 for upper teeth.",
        "Sings verse 2 for lower teeth.",
        "Cleans chewing surfaces on chorus.",
        "Cleans tongue on outro.",
        "Spits clean with sparkling breath."
      ],
      "takeaway": "Two minutes twice a day saves you from painful dental drills."
    },
    "commonMistakes": [
      {
        "mistake": "Pressing as hard as possible until the toothbrush bristles bend flat.",
        "correction": "Pressing hard wears away protective enamel; use light, gentle circular pressure."
      },
      {
        "mistake": "Swallowing toothpaste or rinsing hands with plain water without soap.",
        "correction": "Always spit out toothpaste, and always lather soap for 20 seconds to kill germs."
      }
    ],
    "decisionChecklist": [
      "Did I brush for a full 2 minutes?",
      "Did I reach the very back molars?",
      "Did I use gentle circles instead of hard scrubbing?",
      "Did I lather soap for 20 seconds before eating?"
    ],
    "reflectionPrompt": "How clean and smooth do your teeth feel when you run your tongue over them after 2 full minutes?",
    "summaryTakeaway": "Two minutes of gentle circles in the morning and before bed protects your smile for life.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m09_s1_hero.webp",
      "altText": "The Two-Minute Circular Toothbrushing & Handwash Routine - Step by step life skill demonstration for Class 4",
      "description": "Child smiling into bathroom mirror while demonstrating circular toothbrushing at a 45-degree angle.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_09_1_a",
        "title": "The 4-Quadrant 2-Minute Map",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m09_s1_diag1.webp",
        "altText": "The 4-Quadrant 2-Minute Map",
        "caption": "30 seconds per quadrant: Top-Right, Top-Left, Bottom-Left, Bottom-Right.",
        "status": "ready"
      },
      {
        "id": "vis_c4_09_1_b",
        "title": "The 20-Second Handwash Steps",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m09_s1_diag2.webp",
        "altText": "The 20-Second Handwash Steps",
        "caption": "Palms, backs of hands, between fingers, thumbs, fingernails, rinse.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "The 2-Minute Circular Brushing Technique",
      "duration": "3 mins 00 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Animation showing sticky plaque hiding between back molars.",
          "narrationTranscript": "Plaque loves hiding where quick brushers never reach."
        },
        {
          "scene": 2,
          "visualDescription": "Demonstrating 45-degree angle and small circular brush strokes.",
          "narrationTranscript": "Gentle circles, quadrant by quadrant. Two full minutes, morning and night."
        },
        {
          "scene": 3,
          "visualDescription": "Soap lathering palms, knuckles, and fingernails for 20 seconds.",
          "narrationTranscript": "Twenty seconds of soapy lather washes germs right down the drain."
        }
      ],
      "practicalChallengeRecap": "Brush for a full 2 minutes tonight using a timer or favourite two-minute song."
    },
    "practicalActivity": {
      "title": "14-Day Sparkle Smile & Clean Hands Tracker",
      "objective": "Track 2-minute morning/night brushing and 20-second handwashing for 14 days.",
      "materials": [
        "Soft toothbrush",
        "Toothpaste",
        "2-minute sand timer or clock",
        "Tracker sheet"
      ],
      "procedure": [
        "Set timer before unseating brush.",
        "Brush all 4 quadrants thoroughly.",
        "Spit and rinse brush.",
        "Tick morning and night boxes on tracker."
      ],
      "expectedOutput": "A completed 14-day hygiene log with 28 verified checkmarks.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Do not swallow toothpaste; spit thoroughly after brushing.",
      "alternativeActivity": "Use a smartphone dental timer app with fun musical quadrants."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Ananya is exhausted at 9:30 PM and wants to skip brushing her teeth just for tonight.",
        "choiceOptions": [
          {
            "option": "Remind herself that night-time is when bacteria multiply fastest, and spend 2 minutes brushing.",
            "isOptimal": true,
            "reason": "Night brushing cleans away food sugars that would otherwise rot teeth during 8 hours of sleep."
          },
          {
            "option": "Just chew a mint candy in bed and go to sleep.",
            "isOptimal": false,
            "reason": "Candy adds sugar, causing twice as much bacterial decay."
          },
          {
            "option": "Rinse mouth with a sip of water for 3 seconds.",
            "isOptimal": false,
            "reason": "Water does not remove sticky plaque from molar grooves."
          }
        ],
        "keyTakeaway": "Night brushing is the most critical dental defense of the whole day."
      },
      "independentScenario": {
        "context": "You just finished playing football on the dusty school ground and are sitting down for lunch.",
        "challengePrompt": "Explain step-by-step how you will wash your hands with soap before touching your sandwich.",
        "selfEvaluationRubric": "Wet hands, pump soap, lather palms/backs/between fingers for 20 seconds, rinse clean, dry with napkin."
      }
    },
    "assessment": {
      "question": "Why should you brush your teeth in small gentle circles rather than scrubbing hard back and forth?",
      "contextScenario": "Learning daily dental hygiene technique.",
      "options": [
        {
          "id": "opt_1",
          "text": "Because gentle circles protect delicate gums and enamel while effectively sweeping plaque away.",
          "isCorrect": true,
          "feedback": "Correct! Because gentle circles protect delicate gums and enamel while effectively sweeping plaque away."
        },
        {
          "id": "opt_2",
          "text": "Because circles make your toothpaste change color.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Because scrubbing back and forth takes too much toothpaste.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Because circular brushing only works on baby teeth.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Hard back-and-forth sawing damages gum tissue; use gentle circles like polishing an apple."
    },
    "rubric": {
      "performanceTask": "Demonstrate the 4-quadrant circular brushing technique and 20-second handwash sequence.",
      "masteryCriteria": "Full 2-minute duration, 45-degree angle, circular motion, all surfaces covered, thorough handwash.",
      "criteria": [
        {
          "criterion": "Brushing Technique & Motion",
          "weightPercentage": 40,
          "emerging": "Hard horizontal sawing.",
          "developing": "Circles on front only.",
          "proficient": "Consistent small circular motions across all teeth.",
          "exemplary": "Flawless 45-degree angle and gentle gumline polish."
        },
        {
          "criterion": "Quadrant Timing",
          "weightPercentage": 35,
          "emerging": "Finishes in under 45 seconds.",
          "developing": "Rushes back teeth.",
          "proficient": "Spends full 30 seconds per quadrant (2 min total).",
          "exemplary": "Disciplined timing with dedicated tongue cleaning."
        },
        {
          "criterion": "Hand Hygiene Mastery",
          "weightPercentage": 25,
          "emerging": "Rinses without soap.",
          "developing": "Washes only palms.",
          "proficient": "20-second soap lather covering backs and fingers.",
          "exemplary": "Full surgical-clean routine with nail lathering."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "What song do you like to hum to keep your brushing going for 2 minutes?"
      },
      {
        "id": "ref_2",
        "prompt": "Why is night brushing even more important than morning brushing?"
      },
      {
        "id": "ref_3",
        "prompt": "How does keeping your toothbrush upright help it stay clean?"
      },
      {
        "id": "ref_4",
        "prompt": "What did your dentist tell you about taking care of your teeth?"
      }
    ]
  },
  {
    "id": "mod_c4_m09_s2",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 9,
    "monthTheme": "Personal Hygiene, Screen Limits & Healthy Sleep",
    "sequenceNumber": 2,
    "globalIndex": 26,
    "category": "life_study_skills",
    "categoryLabel": "Study Skills & Learning Independence",
    "title": "Screen-Time Boundaries: The 30-Minute Digital Sunset Before Bed",
    "whyItMatters": "Blue light from phone and tablet screens tricks your brain into thinking it is daytime, destroying deep sleep. A 30-minute digital sunset ensures restful sleep and morning energy.",
    "learningObjectives": [
      "Power down or dock all digital devices at least 30 minutes before sleep",
      "Explain how blue screen light suppresses melatonin (the sleep hormone)",
      "Substitute screen time with relaxing offline habits (reading books, sketching, journaling)",
      "Set up a family charging dock outside the bedroom"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Tara played video games on a tablet in bed until 10 PM. Even after switching the screen off, her eyes felt strained, her brain felt racing, and she tossed and turned until midnight, waking up irritable and sluggish.",
    "explanation": "Our eyes have special sensors that look for blue light from the sun. Screens blast your eyes with artificial blue light! When you look at a screen in bed, your brain thinks \"The sun is up, stay awake!\" A 30-minute screen sunset gives your brain time to produce melatonin and prepare for blissful sleep.",
    "stepByStep": [
      "Pick your bedtime target (e.g. 9:30 PM).",
      "Set your \"Digital Sunset\" 30 minutes prior (at 9:00 PM).",
      "Turn off all screens, phones, tablets, and gaming consoles.",
      "Plug devices into a family charging dock in the living room.",
      "Spend the final 30 minutes reading a paper book, listening to soft music, or talking with family."
    ],
    "workedExample": {
      "title": "Tara’s 30-Minute Sunset Routine",
      "scenario": "Tara switches off tablet at 9:00 PM.",
      "steps": [
        "Puts tablet on living room charger.",
        "Brushes teeth and washes face.",
        "Reads two chapters of a mystery novel in bed.",
        "Turns off bedside lamp at 9:30 PM.",
        "Falls asleep in under 10 minutes."
      ],
      "takeaway": "A 30-minute screen break leads to fast, deep, restorative sleep."
    },
    "commonMistakes": [
      {
        "mistake": "Keeping a smartphone or tablet under your pillow to check messages at night.",
        "correction": "Bed is strictly for sleeping; charge devices outside the bedroom."
      },
      {
        "mistake": "Watching \"just one more 2-minute short video\" in the dark.",
        "correction": "Short video algorithms are designed to trap you; stick to your firm 9:00 PM cutoff."
      }
    ],
    "decisionChecklist": [
      "Are all screens off 30 minutes before bedtime?",
      "Are devices docked outside the bedroom?",
      "Am I doing a calm, offline activity?",
      "Is my bedroom dim and quiet?"
    ],
    "reflectionPrompt": "How did your sleep feel on nights when you didn’t look at a screen in bed?",
    "summaryTakeaway": "Give your eyes a digital sunset every night to enjoy deep sleep and boundless morning energy.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m09_s2_hero.webp",
      "altText": "Screen-Time Boundaries: The 30-Minute Digital Sunset Before Bed - Step by step life skill demonstration for Class 4",
      "description": "Child putting tablet into a wooden charging dock in the living room and walking to bedroom with a storybook.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_09_2_a",
        "title": "The Melatonin Clock",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m09_s2_diag1.webp",
        "altText": "The Melatonin Clock",
        "caption": "Blue screen light blocks sleep hormones. Digital Sunset allows melatonin to rise naturally.",
        "status": "ready"
      },
      {
        "id": "vis_c4_09_2_b",
        "title": "Offline Bedtime Alternatives",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m09_s2_diag2.webp",
        "altText": "Offline Bedtime Alternatives",
        "caption": "Read paper book, sketch diary, light body stretches, family chat.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "The Power of the 30-Minute Digital Sunset",
      "duration": "2 mins 55 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Child staring at glowing screen in dark room vs calm bedroom reading book.",
          "narrationTranscript": "Blue light tells your brain the sun is shining at midnight."
        },
        {
          "scene": 2,
          "visualDescription": "Docking device at 9:00 PM in living room.",
          "narrationTranscript": "Create a 30-minute digital sunset. Plug your device in the hallway."
        },
        {
          "scene": 3,
          "visualDescription": "Child drifting into deep peaceful sleep.",
          "narrationTranscript": "Wake up energized, refreshed, and ready to conquer tomorrow."
        }
      ],
      "practicalChallengeRecap": "Shut off all screens 30 minutes before bed tonight and read a paper book instead."
    },
    "practicalActivity": {
      "title": "7-Night Digital Sunset Experiment",
      "objective": "Dock all screens 30 minutes before bed for 7 consecutive nights and track morning alertness.",
      "materials": [
        "Storybook or notebook",
        "Bedside lamp",
        "7-night sleep journal"
      ],
      "procedure": [
        "Establish target bedtime.",
        "Announce Digital Sunset 30 mins prior.",
        "Dock devices outside bedroom.",
        "Engage in offline wind-down.",
        "Rate morning freshness from 1 to 5 stars."
      ],
      "expectedOutput": "A completed 7-night sleep tracker showing morning energy ratings.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Do not replace gaming screens with television screens; all electronic displays must rest.",
      "alternativeActivity": "Listen to an audio bedtime story or calm instrumental music in the dark."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Nikhil gets a notification on his tablet right as his 9:00 PM digital sunset begins.",
        "choiceOptions": [
          {
            "option": "Ignore the notification, dock the tablet on the charger, and inspect it tomorrow morning.",
            "isOptimal": true,
            "reason": "Notifications are rarely emergencies; protecting sleep is the top priority."
          },
          {
            "option": "Unlock tablet to see who messaged, reply, and start playing a game.",
            "isOptimal": false,
            "reason": "One message turns into 45 minutes of wasted sleep time."
          },
          {
            "option": "Take tablet into bed and hide under the blanket so parents don’t notice.",
            "isOptimal": false,
            "reason": "Harms eyesight, breaks parental trust, and guarantees morning exhaustion."
          }
        ],
        "keyTakeaway": "No notification is more important than your health and sleep."
      },
      "independentScenario": {
        "context": "Your friend boasts that they play video games until 1 AM every night and only sleep 4 hours.",
        "challengePrompt": "Explain what you would tell them about how sleep affects brain growth, mood, and sports.",
        "selfEvaluationRubric": "Explained that deep sleep repairs muscles, consolidates memories, and boosts daytime mood."
      }
    },
    "assessment": {
      "question": "Why does looking at a phone or tablet screen in bed make it hard to fall asleep?",
      "contextScenario": "Understanding the biology of sleep and blue light.",
      "options": [
        {
          "id": "opt_1",
          "text": "Because artificial blue light blocks the production of melatonin, tricking your brain into thinking it is daytime.",
          "isCorrect": true,
          "feedback": "Correct! Because artificial blue light blocks the production of melatonin, tricking your brain into thinking it is daytime."
        },
        {
          "id": "opt_2",
          "text": "Because phone batteries get hot and warm up the room.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Because video games delete your dreams.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Because Wi-Fi signals keep your ears awake.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Blue light stops melatonin release; power down 30 minutes early to let your brain wind down."
    },
    "rubric": {
      "performanceTask": "Establish and execute a 30-minute pre-bed digital sunset routine for 5 consecutive school nights.",
      "masteryCriteria": "Punctual screen cutoff, device docked outside room, relaxing offline activity, improved sleep quality.",
      "criteria": [
        {
          "criterion": "Sunset Punctuality",
          "weightPercentage": 40,
          "emerging": "Uses screen in bed.",
          "developing": "Turns off only 5 mins before bed.",
          "proficient": "Consistently docks devices 30 mins before sleep.",
          "exemplary": "100% disciplined cutoff with zero reminder."
        },
        {
          "criterion": "Device Boundary",
          "weightPercentage": 35,
          "emerging": "Keeps device on nightstand.",
          "developing": "Device in room but across desk.",
          "proficient": "Docks device in designated non-bedroom area.",
          "exemplary": "Family dock championing with siblings."
        },
        {
          "criterion": "Wind-Down Quality",
          "weightPercentage": 25,
          "emerging": "Stares at TV instead.",
          "developing": "Paces restlessly.",
          "proficient": "Calm offline engagement (reading, drawing).",
          "exemplary": "Deep restful bedtime rituals established."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "What book or activity do you enjoy most during your digital sunset?"
      },
      {
        "id": "ref_2",
        "prompt": "How does your mood differ in the morning after a good night’s sleep?"
      },
      {
        "id": "ref_3",
        "prompt": "Why is it harder to stop watching short videos than reading a book?"
      },
      {
        "id": "ref_4",
        "prompt": "What family rule can everyone adopt about keeping phones out of bedrooms?"
      }
    ]
  },
  {
    "id": "mod_c4_m09_s3",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 9,
    "monthTheme": "Personal Hygiene, Screen Limits & Healthy Sleep",
    "sequenceNumber": 3,
    "globalIndex": 27,
    "category": "life_citizenship_community",
    "categoryLabel": "Practical Citizenship & Community Life",
    "title": "Saving Water at the School Tap & Reporting Dripping Faucets",
    "whyItMatters": "Fresh clean water is a precious resource. Turning taps off tightly, using cups to rinse, and reporting leaks prevents thousands of liters from going to waste.",
    "learningObjectives": [
      "Turn off taps completely while soaping hands or brushing teeth",
      "Use a tumbler or cup for mouth rinsing instead of letting the tap run continuously",
      "Identify a leaking or dripping tap and report it promptly to school maintenance or teacher",
      "Practice filling your personal water bottle without overflowing and wasting water"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "During recess, Aarav saw that someone left the water tap running full blast in the school washroom. Water was overflowing onto the tiles while three boys walked past without caring.",
    "explanation": "Every drop of clean water required pumps, electricity, and treatment to reach your school tap. A faucet running for just 10 minutes wastes over 100 liters of pure water! A responsible citizen never walks past running water. Turning it off takes two seconds and saves nature.",
    "stepByStep": [
      "When washing hands, turn the tap OFF while lathering soap for 20 seconds.",
      "Turn the tap back on only to rinse away the suds.",
      "When done, turn the handle firmly until the water flow stops completely (don’t force it too hard).",
      "If you hear a persistent drip-drip even when closed, tell your teacher or school guard.",
      "Never leave taps running unattended."
    ],
    "workedExample": {
      "title": "Aarav’s 2-Second Water Rescue",
      "scenario": "Aarav sees running washroom tap.",
      "steps": [
        "Steps forward and turns handle clockwise.",
        "Water flow stops instantly.",
        "Notices small drip from base.",
        "Tells school attendant: \"Tap 3 has a drip at the base.\"",
        "Attendant tightens washer with wrench."
      ],
      "takeaway": "Stopping a tap takes two seconds and saves hundreds of liters of water."
    },
    "commonMistakes": [
      {
        "mistake": "Leaving the bathroom tap running full speed while brushing teeth for 2 minutes.",
        "correction": "Letting the tap run wastes 20 liters; always use a cup or turn tap off until rinsing."
      },
      {
        "mistake": "Ignoring a running tap because \"it wasn’t me who left it open.\"",
        "correction": "Citizens take responsibility for shared resources; turn it off regardless of who left it."
      }
    ],
    "decisionChecklist": [
      "Is the tap turned off while soaping hands?",
      "Is the handle firmly closed with no drips?",
      "Did I use a tumbler to rinse?",
      "Did I report any broken washers to an adult?"
    ],
    "reflectionPrompt": "How many people in your city or village do you think struggle to get clean drinking water?",
    "summaryTakeaway": "Every drop counts: turn taps off firmly, never walk past a leak, and protect our water.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m09_s3_hero.webp",
      "altText": "Saving Water at the School Tap & Reporting Dripping Faucets - Step by step life skill demonstration for Class 4",
      "description": "Student reaching out to firmly shut off a gushing public school water tap.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_09_3_a",
        "title": "The Running Tap Disaster",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m09_s3_diag1.webp",
        "altText": "The Running Tap Disaster",
        "caption": "A running tap wastes 10-12 liters every minute. A dripping tap wastes 30 liters a day.",
        "status": "ready"
      },
      {
        "id": "vis_c4_09_3_b",
        "title": "The Soapy Pause Technique",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m09_s3_diag2.webp",
        "altText": "The Soapy Pause Technique",
        "caption": "Wet hands -> TURN TAP OFF -> Lather soap 20s -> Turn tap on -> Rinse.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Water Guardians: Stop the School Leak",
      "duration": "2 mins 50 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Close-up of tap left gushing water onto bathroom floor.",
          "narrationTranscript": "Millions of liters of clean drinking water are wasted by open taps every day."
        },
        {
          "scene": 2,
          "visualDescription": "Child stepping up and turning the faucet firmly to the off position.",
          "narrationTranscript": "Be a water hero. It takes two seconds to turn the handle and save the day."
        },
        {
          "scene": 3,
          "visualDescription": "Reporting a persistent drip to the school caretaker.",
          "narrationTranscript": "See a persistent drip? Report it. One small voice protects our community's future."
        }
      ],
      "practicalChallengeRecap": "Never walk past a running tap: turn it off firmly wherever you see it today."
    },
    "practicalActivity": {
      "title": "School & Home Water Leak Audit",
      "objective": "Inspect all water taps at home and in school; turn off open taps and log any leaks.",
      "materials": [
        "Audit paper",
        "Pencil",
        "Dry cloth to check tap drips"
      ],
      "procedure": [
        "Check bathroom, kitchen, and washbasin taps at home.",
        "Check water points at school during recess.",
        "Firmly close any half-open taps.",
        "Report any dripping faucets to parents or teachers."
      ],
      "expectedOutput": "A Water Audit Sheet detailing number of taps inspected and leaks reported.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Do not use excessive force to wrench old rusty plumbing handles.",
      "alternativeActivity": "Place a measuring cup under a dripping tap at home for 1 hour to measure wasted water."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Kiran notices that the school drinking water fountain has a stuck push-button that won’t pop back up.",
        "choiceOptions": [
          {
            "option": "Try gently tapping the button once, and immediately notify the nearest teacher on corridor duty.",
            "isOptimal": true,
            "reason": "Ensures water is stopped quickly by an adult with tools or facility keys."
          },
          {
            "option": "Shrug shoulders and walk away to play football.",
            "isOptimal": false,
            "reason": "Allows hundreds of liters of drinking water to flood the playground."
          },
          {
            "option": "Kick the water pipe with heavy sports shoes.",
            "isOptimal": false,
            "reason": "Risk of cracking the PVC pipe and causing a massive pipe burst."
          }
        ],
        "keyTakeaway": "Quick reporting to school staff solves facility problems safely."
      },
      "independentScenario": {
        "context": "You see a classmate playing with the garden hose at school, spraying water on the concrete pavement.",
        "challengePrompt": "Explain what you will say to them politely to help them conserve water.",
        "selfEvaluationRubric": "Politely reminded friend that water is scarce; suggested turning off hose and playing games instead."
      }
    },
    "assessment": {
      "question": "How much water can be wasted by letting a bathroom tap run continuously while brushing teeth for 2 minutes?",
      "contextScenario": "Evaluating water conservation during daily hygiene.",
      "options": [
        {
          "id": "opt_1",
          "text": "Up to 15 to 20 liters of clean drinking water.",
          "isCorrect": true,
          "feedback": "Correct! Up to 15 to 20 liters of clean drinking water."
        },
        {
          "id": "opt_2",
          "text": "Less than half a cup.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Zero water because it goes back into the tank.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Only 1 teaspoon.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Running taps flow at 8-10 liters per minute; turn it off while brushing to save over 15 liters."
    },
    "rubric": {
      "performanceTask": "Conduct a public water conservation audit and demonstrate the soapy-pause handwash method.",
      "masteryCriteria": "Identifies tap state, executes soapy pause, demonstrates proper reporting protocol.",
      "criteria": [
        {
          "criterion": "Tap Operation & Discipline",
          "weightPercentage": 40,
          "emerging": "Leaves taps dripping.",
          "developing": "Closes taps loosely.",
          "proficient": "Firmly secures tap handles after use.",
          "exemplary": "Instinctively turns off taps while lathering soap."
        },
        {
          "criterion": "Civic Initiative",
          "weightPercentage": 35,
          "emerging": "Walks past running taps.",
          "developing": "Closes tap only when told.",
          "proficient": "Closes running public taps independently.",
          "exemplary": "Proactively audits taps and reports plumbing issues."
        },
        {
          "criterion": "Conservation Awareness",
          "weightPercentage": 25,
          "emerging": "Unaware of water scarcity.",
          "developing": "Vague estimates.",
          "proficient": "Explains impact of dripping taps accurately.",
          "exemplary": "Inspires peers to practice water conservation."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Have you ever seen an open water tap in a public park or railway station?"
      },
      {
        "id": "ref_2",
        "prompt": "How does closing a tap help families who have to fetch water from wells?"
      },
      {
        "id": "ref_3",
        "prompt": "What can your school do to celebrate students who stop water waste?"
      },
      {
        "id": "ref_4",
        "prompt": "How will you remind your family to turn off the tap while brushing?"
      }
    ]
  },
  {
    "id": "mod_c4_m10_s1",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 10,
    "monthTheme": "Smart Spending, Saving Habits & Spotting Ad Traps",
    "sequenceNumber": 1,
    "globalIndex": 28,
    "category": "life_money_management",
    "categoryLabel": "Money Management & Financial Literacy",
    "title": "The 3-Envelope Savings System: Spend, Save, and Share",
    "whyItMatters": "Spending all your money the minute you receive it leaves you empty-handed for big goals. Dividing cash into 3 envelopes builds lifelong wealth and generosity.",
    "learningObjectives": [
      "Label 3 envelopes or jars: SPEND (everyday needs), SAVE (future big goals), SHARE (helping others)",
      "Divide birthday cash or festival pocket money into the 3 envelopes (50% Spend, 40% Save, 10% Share)",
      "Set a specific, exciting goal for the SAVE envelope (e.g. a ₹400 book or badminton racket)",
      "Track balances on the front of each envelope using pencil tick marks"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Vihaan received ₹500 from his grandfather for his birthday. He rushed to the stationary shop and bought 10 cheap plastic toy cars that broke by Friday evening. On Saturday, his friends invited him to the planetarium, but he had ₹0 left.",
    "explanation": "Money is like water: if you pour it all out in one second, you get a muddy puddle and no drinking water tomorrow! The 3-Envelope System gives every rupee a distinct job: SPEND gives you fun today, SAVE buys your dream goal tomorrow, and SHARE brings joy to someone in need.",
    "stepByStep": [
      "Get 3 paper envelopes or small jars.",
      "Label them with bold markers: 1. SPEND, 2. SAVE, 3. SHARE.",
      "Whenever you receive money (e.g. ₹100), divide it: ₹50 in SPEND, ₹40 in SAVE, ₹10 in SHARE.",
      "Use SPEND for small snacks or pencil erasers.",
      "Never touch SAVE until you reach your written goal!"
    ],
    "workedExample": {
      "title": "Vihaan’s 3-Envelope Turnaround",
      "scenario": "Vihaan receives ₹200 festival gift.",
      "steps": [
        "Puts ₹100 in SPEND for weekend ice cream.",
        "Puts ₹80 in SAVE toward a new helmet.",
        "Puts ₹20 in SHARE for stray animal food.",
        "Writes new balance on envelope fronts."
      ],
      "takeaway": "Having money in SAVE means you are always prepared and building for something great."
    },
    "commonMistakes": [
      {
        "mistake": "Borrowing money from the SAVE envelope to buy chips or candy.",
        "correction": "Treat the SAVE envelope as a locked vault until your specific goal is reached."
      },
      {
        "mistake": "Leaving cash lying loose in school bags or on desks.",
        "correction": "Always store your envelopes in a safe drawer known to your parents."
      }
    ],
    "decisionChecklist": [
      "Are all 3 envelopes clearly labeled?",
      "Did I divide new money before spending any?",
      "Do I have a specific written goal on my SAVE envelope?",
      "Did I write the updated amount on the back?"
    ],
    "reflectionPrompt": "What big goal would you love to save for over the next three months?",
    "summaryTakeaway": "Spend some, save more, and share a little: that is the golden secret of smart money management.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m10_s1_hero.webp",
      "altText": "The 3-Envelope Savings System: Spend, Save, and Share - Step by step life skill demonstration for Class 4",
      "description": "Child placing a 50-rupee note into a clearly labeled green SAVE envelope on a wooden desk.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_10_1_a",
        "title": "The 50/40/10 Ratio Split",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m10_s1_diag1.webp",
        "altText": "The 50/40/10 Ratio Split",
        "caption": "50% Spend (Today) + 40% Save (Big Goal) + 10% Share (Kindness).",
        "status": "ready"
      },
      {
        "id": "vis_c4_10_1_b",
        "title": "The Goal Tracking Thermometer",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m10_s1_diag2.webp",
        "altText": "The Goal Tracking Thermometer",
        "caption": "Coloring in thermometer levels on the SAVE envelope as savings grow.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "The 3-Envelope Money Magic",
      "duration": "3 mins 15 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Child spending entire pocket money at once and feeling empty pockets.",
          "narrationTranscript": "Spent all your money on day one? There is a smarter way."
        },
        {
          "scene": 2,
          "visualDescription": "Demonstrating labeling SPEND, SAVE, SHARE envelopes.",
          "narrationTranscript": "Three envelopes give every rupee a mission. Fifty percent to spend, forty to save, ten to share."
        },
        {
          "scene": 3,
          "visualDescription": "Purchasing a long-awaited bicycle helmet with saved money.",
          "narrationTranscript": "Patience pays off. Achieve big dreams one rupee at a time."
        }
      ],
      "practicalChallengeRecap": "Label 3 envelopes today and divide your next pocket money using the 50/40/10 rule."
    },
    "practicalActivity": {
      "title": "3-Envelope System Setup & Goal Setting",
      "objective": "Construct and decorate 3 envelopes, write a specific savings goal, and make your first allocation.",
      "materials": [
        "3 paper envelopes or envelopes folded from paper",
        "Colored markers",
        "Any coins or cash notes"
      ],
      "procedure": [
        "Decorate Envelope 1: SPEND (with pictures of everyday fun).",
        "Decorate Envelope 2: SAVE (draw your target goal and target amount).",
        "Decorate Envelope 3: SHARE (draw helping hands).",
        "Make your first deposit and write the tally on the back."
      ],
      "expectedOutput": "A fully functional 3-envelope kit with an active written savings goal.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Keep envelopes in a secure, designated home spot with parental awareness.",
      "alternativeActivity": "Use 3 small plastic containers or jars with labeled masking tape."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Meera has ₹300 in her SAVE envelope for a science microscope kit costing ₹500. A shiny laser toy catches her eye for ₹200.",
        "choiceOptions": [
          {
            "option": "Remind herself of her dream microscope, leave the SAVE envelope untouched, and walk away.",
            "isOptimal": true,
            "reason": "Staying committed to a high-value long-term goal prevents impulse-buy regret."
          },
          {
            "option": "Take ₹200 out of SAVE to buy the laser toy right now.",
            "isOptimal": false,
            "reason": "Resets her savings to ₹100 and delays her microscope by months."
          },
          {
            "option": "Take the money out of the SHARE envelope instead.",
            "isOptimal": false,
            "reason": "Breaks the integrity of money earmarked for helping others."
          }
        ],
        "keyTakeaway": "Delaying short-term temptation unlocks long-term dreams."
      },
      "independentScenario": {
        "context": "You receive ₹150 for helping clean the family storeroom.",
        "challengePrompt": "Calculate how much money goes into SPEND, SAVE, and SHARE using the 50/40/10 rule.",
        "selfEvaluationRubric": "Correctly calculated: ₹75 in SPEND, ₹60 in SAVE, and ₹15 in SHARE."
      }
    },
    "assessment": {
      "question": "Why should you divide money into envelopes immediately when you receive it rather than at the end of the month?",
      "contextScenario": "Applying the 3-Envelope savings discipline.",
      "options": [
        {
          "id": "opt_1",
          "text": "Because if you keep it all together, you will spend it on small impulses and have nothing left to save.",
          "isCorrect": true,
          "feedback": "Correct! Because if you keep it all together, you will spend it on small impulses and have nothing left to save."
        },
        {
          "id": "opt_2",
          "text": "Because bank notes lose value if kept in one pocket.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Because envelopes make money multiply automatically.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Because parents require envelopes by law.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Always \"pay your savings first\" before you start spending on daily treats."
    },
    "rubric": {
      "performanceTask": "Set up a 3-envelope budget system with accurate mathematical allocation and goal declaration.",
      "masteryCriteria": "Envelopes labeled, 50/40/10 allocation executed, realistic goal declared, log maintained.",
      "criteria": [
        {
          "criterion": "System Setup & Labeling",
          "weightPercentage": 40,
          "emerging": "Messy single container.",
          "developing": "2 envelopes created.",
          "proficient": "3 distinct labeled envelopes with goal and rules.",
          "exemplary": "Beautifully decorated system with clear ledger lines."
        },
        {
          "criterion": "Math & Allocation",
          "weightPercentage": 35,
          "emerging": "Random division.",
          "developing": "Calculation errors.",
          "proficient": "Accurate 50/40/10 percentage division.",
          "exemplary": "Flawless mental math and tracking ledger."
        },
        {
          "criterion": "Savings Discipline",
          "weightPercentage": 25,
          "emerging": "Raids savings for candy.",
          "developing": "Tempted but resists with help.",
          "proficient": "Maintains savings sanctity independently.",
          "exemplary": "Inspiring self-control and consistent progress updates."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "What item is drawn on your SAVE envelope right now?"
      },
      {
        "id": "ref_2",
        "prompt": "How does putting money in the SHARE envelope make you feel about helping others?"
      },
      {
        "id": "ref_3",
        "prompt": "Why do impulse purchases often end up gathering dust on a shelf?"
      },
      {
        "id": "ref_4",
        "prompt": "How can you use this system when you get festival money or birthday gifts?"
      }
    ]
  },
  {
    "id": "mod_c4_m10_s2",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 10,
    "monthTheme": "Smart Spending, Saving Habits & Spotting Ad Traps",
    "sequenceNumber": 2,
    "globalIndex": 29,
    "category": "life_critical_thinking",
    "categoryLabel": "Critical Thinking & Everyday Problem-Solving",
    "title": "Spotting Toy Ad Traps & Commercial Tricks on Television",
    "whyItMatters": "Advertisements are designed to make cheap toys look magical and huge using special effects. Learning to decode ad tricks saves your pocket money from bitter disappointment.",
    "learningObjectives": [
      "Identify common TV ad tricks: special lighting, slow-motion flying, dramatic music, and miniature camera angles",
      "Spot the tiny disclaimer at the bottom: \"Batteries not included\", \"Assembly required\", \"Does not actually fly\"",
      "Ask the 3 Smart Consumer Questions: \"Does it really do that?\", \"Will I play with it next month?\", \"Is it made of cheap plastic?\"",
      "Compare an ad’s video promise with how the actual toy looks inside a plain cardboard box"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Arnav watched a commercial for \"Hyper-Rocket 3000\". In the ad, the rocket zoomed across the galaxy with roaring engine sounds and laser lights! When he bought it with his savings, it was a 4-inch hollow plastic tube that hopped 2 feet when squeezed.",
    "explanation": "Advertisers spend millions of rupees on special effects, wind machines, and dramatic lighting to make toys look alive! But toys don’t fly by magic—they sit on tables. Critical thinkers look past the special effects and ask: \"What does this plastic object actually do when I hold it in my hands?\"",
    "stepByStep": [
      "Watch the commercial closely: is the toy flying because of hidden wires, wind blowers, or computer animation?",
      "Look at the very bottom of the TV screen for tiny white text (disclaimers).",
      "Ask an adult: \"Does this require expensive batteries or extra sets to work?\"",
      "Wait 48 hours before buying anything you saw in an advertisement (The 48-Hour Cool-Down Rule).",
      "Read real user reviews or inspect the toy in person at a shop before spending your cash."
    ],
    "workedExample": {
      "title": "Arnav’s Ad Detective Eye",
      "scenario": "Arnav watches an ad for a roaring dinosaur robot.",
      "steps": [
        "Notices loud studio sound effects not made by the toy.",
        "Spots tiny words at bottom: \"Movement simulated by animator.\"",
        "Realizes the toy cannot walk on carpets.",
        "Decides to keep his savings in his envelope."
      ],
      "takeaway": "Advertisements show you a fantasy movie; real toys must be judged in reality."
    },
    "commonMistakes": [
      {
        "mistake": "Believing that a toy actually flies across the room on its own because you saw it on TV.",
        "correction": "TV ads use high-powered fans, nylon strings, and editing to simulate flight; always check the disclaimers."
      },
      {
        "mistake": "Demanding that parents buy a toy immediately during a commercial break.",
        "correction": "Practice the 48-hour cool-down rule; after two days, you often realize you don’t even want it."
      }
    ],
    "decisionChecklist": [
      "Did I look for tiny disclaimer text at the bottom?",
      "Are special effects or computer graphics making it look cooler?",
      "Did I apply the 48-Hour Cool-Down Rule?",
      "Do I know what it looks like without special lights?"
    ],
    "reflectionPrompt": "Have you ever bought a toy that looked amazing in an ad but turned out to be boring or flimsy in real life?",
    "summaryTakeaway": "Advertisements sell excitement, not truth: be a smart consumer detective and look past the special effects.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m10_s2_hero.webp",
      "altText": "Spotting Toy Ad Traps & Commercial Tricks on Television - Step by step life skill demonstration for Class 4",
      "description": "Child holding a magnifying glass in front of a television commercial, revealing the tiny disclaimer text at the bottom of the screen.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_10_2_a",
        "title": "The 4 Common Toy Ad Illusions",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m10_s2_diag1.webp",
        "altText": "The 4 Common Toy Ad Illusions",
        "caption": "1. Fast camera cuts, 2. Studio sound effects, 3. Hidden nylon strings, 4. Macro zoom.",
        "status": "ready"
      },
      {
        "id": "vis_c4_10_2_b",
        "title": "The 48-Hour Cool-Down Rule",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m10_s2_diag2.webp",
        "altText": "The 48-Hour Cool-Down Rule",
        "caption": "Wait 2 full days after seeing an ad. If you still want it, evaluate its real value.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Ad Detectives: Busting Toy Commercial Tricks",
      "duration": "3 mins 10 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Exciting toy ad with lasers and explosions vs real plastic toy sitting silently.",
          "narrationTranscript": "Ever bought a toy that looked epic on screen, but was a let-down in real life?"
        },
        {
          "scene": 2,
          "visualDescription": "Magnifying glass zooming in on tiny disclaimer: 'Does not actually fly'.",
          "narrationTranscript": "Watch the bottom of the screen. Advertisers have to tell the truth in tiny print."
        },
        {
          "scene": 3,
          "visualDescription": "Child waiting 48 hours and deciding their money is better saved.",
          "narrationTranscript": "Use the forty-eight hour cool-down rule. Smart thinkers protect their hard-earned money."
        }
      ],
      "practicalChallengeRecap": "Spot two commercial tricks during your next television or video ad break."
    },
    "practicalActivity": {
      "title": "Commercial Detective Investigation Sheet",
      "objective": "Analyze one toy or snack commercial and write down the tricks used to make it look appealing.",
      "materials": [
        "TV or video ad stream",
        "Detective notepad",
        "Pencil"
      ],
      "procedure": [
        "Select a 30-second toy or cereal commercial.",
        "Count how many camera cuts occur in 30 seconds.",
        "Look for tiny disclaimer text at the bottom and copy it down.",
        "Write down whether the toy does what the ad shows."
      ],
      "expectedOutput": "A completed Ad Detective Report detailing camera tricks, sound effects, and disclaimers.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Do not click on suspicious ad links or buy in-app purchases on tablets.",
      "alternativeActivity": "Analyze a glossy toy catalog page and compare the picture to the product specs."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Tanmay sees an ad for a chocolate milk powder that promises: \"Drink this and run as fast as a cheetah!\"",
        "choiceOptions": [
          {
            "option": "Recognize that no drink can instantly make you an Olympic sprinter, and laugh at the silly advertising trick.",
            "isOptimal": true,
            "reason": "Distinguishes between scientific biological reality and marketing exaggeration."
          },
          {
            "option": "Believe the ad 100% and beg mother to buy 5 jars so he wins his school sports day.",
            "isOptimal": false,
            "reason": "Falling for marketing claims leads to wasted money and false expectations."
          },
          {
            "option": "Refuse to ever drink milk again because ads are annoying.",
            "isOptimal": false,
            "reason": "Extreme reaction that harms healthy nutrition."
          }
        ],
        "keyTakeaway": "Recognize advertising hyperbole and don’t mistake cartoons for health facts."
      },
      "independentScenario": {
        "context": "A video shows a toy car driving through walls and smashing rocks without a scratch.",
        "challengePrompt": "Explain what studio tricks were likely used to film that scene.",
        "selfEvaluationRubric": "Identified fake prop walls (foam), slow motion, studio sound effects, and video cuts."
      }
    },
    "assessment": {
      "question": "What does the tiny text \"Assembly required and batteries not included\" at the bottom of a toy commercial mean?",
      "contextScenario": "Evaluating a toy ad with motorized racing cars.",
      "options": [
        {
          "id": "opt_1",
          "text": "The toy comes in pieces that you must put together yourself, and it will not run until you buy extra batteries.",
          "isCorrect": true,
          "feedback": "Correct! The toy comes in pieces that you must put together yourself, and it will not run until you buy extra batteries."
        },
        {
          "id": "opt_2",
          "text": "The toy is completely free of charge.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "The toy never needs batteries because it runs on solar power.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "The toy comes fully built inside a golden box.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Always read the disclaimers to know what extra work or costs are required."
    },
    "rubric": {
      "performanceTask": "Analyze an advertisement and present a 2-minute breakdown of the techniques used to influence consumers.",
      "masteryCriteria": "Identifies disclaimers, highlights special effects, assesses product realism, explains consumer bias.",
      "criteria": [
        {
          "criterion": "Ad Trick Identification",
          "weightPercentage": 40,
          "emerging": "Believes all ad claims.",
          "developing": "Spots sound effects only.",
          "proficient": "Identifies camera angles, audio tricks, and graphics.",
          "exemplary": "Comprehensive breakdown of psychological appeal and production illusion."
        },
        {
          "criterion": "Disclaimer Decoding",
          "weightPercentage": 35,
          "emerging": "Misses disclaimers entirely.",
          "developing": "Sees text but cannot read it.",
          "proficient": "Reads and translates fine-print disclaimers accurately.",
          "exemplary": "Evaluates hidden costs (batteries, expansions) systematically."
        },
        {
          "criterion": "Consumer Restraint",
          "weightPercentage": 25,
          "emerging": "Demands instant purchase.",
          "developing": "Resists with adult coaxing.",
          "proficient": "Applies 48-Hour Cool-Down Rule independently.",
          "exemplary": "Advises peers and siblings on smart consumer habits."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Why do companies hire famous movie stars or sports players to sell snacks?"
      },
      {
        "id": "ref_2",
        "prompt": "What was the funniest exaggeration you ever noticed in a TV commercial?"
      },
      {
        "id": "ref_3",
        "prompt": "How does the 48-Hour Cool-Down Rule save you from buyer’s remorse?"
      },
      {
        "id": "ref_4",
        "prompt": "If you invented a toy, how would you advertise it honestly?"
      }
    ]
  },
  {
    "id": "mod_c4_m10_s3",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 10,
    "monthTheme": "Smart Spending, Saving Habits & Spotting Ad Traps",
    "sequenceNumber": 3,
    "globalIndex": 30,
    "category": "life_money_management",
    "categoryLabel": "Money Management & Financial Literacy",
    "title": "Comparing Prices and Reading MRP Labels on School Supplies",
    "whyItMatters": "Shops often sell identical items at different prices, or sell smaller packs that cost more per piece. Reading MRP and comparing prices makes your family’s money go twice as far.",
    "learningObjectives": [
      "Locate and read the MRP (Maximum Retail Price) and expiry or manufacturing date on packaging",
      "Compare two brands of pencils or notebooks to determine which offers better value",
      "Check that a shopkeeper does not charge more than the printed MRP",
      "Count your change carefully before walking away from the cashier counter"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Divya went to a stationery shop to buy notebooks for school. One shiny notebook with a movie character cover cost ₹90 for 100 pages. Right next to it was a neat, plain notebook with identical smooth paper that cost ₹45 for 120 pages.",
    "explanation": "Every packaged product in India has an \"MRP\" printed on it by law. MRP stands for Maximum Retail Price—no shopkeeper can legally charge you more than that amount! Smart shoppers don’t just look at the cover picture; they check the page count, quality, and price per unit.",
    "stepByStep": [
      "Pick up the product and flip to the back or bottom panel.",
      "Find the printed text that says \"M.R.P. ₹ [Amount] inclusive of all taxes\".",
      "Compare page count or quantity: (e.g. 120 pages for ₹45 vs 100 pages for ₹90).",
      "Ask yourself: \"Am I paying double just for a cartoon sticker on the cover?\"",
      "Hand the exact cash or check the change against your bill."
    ],
    "workedExample": {
      "title": "Divya’s Smart Notebook Selection",
      "scenario": "Divya compares two notebook options.",
      "steps": [
        "Inspects fancy movie notebook: ₹90 for 100 pages.",
        "Inspects standard study notebook: ₹45 for 120 pages.",
        "Realizes she can buy TWO plain notebooks (240 pages total) for ₹90.",
        "Chooses the plain notebooks and uses savings for geometry set."
      ],
      "takeaway": "Smart shoppers buy utility and quality, not overpriced packaging."
    },
    "commonMistakes": [
      {
        "mistake": "Letting a shopkeeper charge ₹25 for an item with an MRP of ₹20 because \"it was cold in the fridge\".",
        "correction": "By Indian law, charging above the printed MRP is illegal; politely point out the printed price."
      },
      {
        "mistake": "Walking out of a store without counting the coins returned by the cashier.",
        "correction": "Always count your change right at the billing desk before stepping away."
      }
    ],
    "decisionChecklist": [
      "Did I find and read the printed MRP?",
      "Did I check quantity or page count?",
      "Am I paying for quality rather than just branding?",
      "Did I count my change at the register?"
    ],
    "reflectionPrompt": "Look at the back of your favorite pen or snack. What is its printed MRP?",
    "summaryTakeaway": "Check the MRP, compare page counts, and count your change: smart shoppers get true value for every rupee.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m10_s3_hero.webp",
      "altText": "Comparing Prices and Reading MRP Labels on School Supplies - Step by step life skill demonstration for Class 4",
      "description": "Child comparing two notebooks at a stationery counter, pointing to the printed MRP price stamp on the back cover.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_10_3_a",
        "title": "Deconstructing the MRP Stamp",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m10_s3_diag1.webp",
        "altText": "Deconstructing the MRP Stamp",
        "caption": "M.R.P. ₹, Batch Number, Date of Mfg, Net Quantity, Customer Care Number.",
        "status": "ready"
      },
      {
        "id": "vis_c4_10_3_b",
        "title": "The Unit Value Comparison",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m10_s3_diag2.webp",
        "altText": "The Unit Value Comparison",
        "caption": "Pack A: ₹50 for 5 pens = ₹10/pen. Pack B: ₹30 for 2 pens = ₹15/pen. Pack A wins!",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Stationery Smarts: Master the MRP Label",
      "duration": "3 mins 05 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Child looking at two identical stationery items with vastly different prices.",
          "narrationTranscript": "Fancy covers can double the price of simple notebooks. Look closer."
        },
        {
          "scene": 2,
          "visualDescription": "Finger pointing to 'M.R.P. ₹ 40.00 incl. of all taxes'.",
          "narrationTranscript": "M-R-P. Maximum Retail Price. No shopkeeper can legally charge a single paisa more."
        },
        {
          "scene": 3,
          "visualDescription": "Counting coins returned by shopkeeper calmly at counter.",
          "narrationTranscript": "Count your change before you take a single step away from the counter."
        }
      ],
      "practicalChallengeRecap": "Check the MRP on three school items in your backpack today."
    },
    "practicalActivity": {
      "title": "Stationery Store Price Audit Project",
      "objective": "Visit a local stationery shop or supermarket with a parent and compare 3 pairs of school items.",
      "materials": [
        "Notepad",
        "Pencil",
        "Parent accompaniment"
      ],
      "procedure": [
        "Select 2 brands of pencils (box of 10).",
        "Compare MRP and calculate price per pencil.",
        "Select 2 brands of erasers or rulers.",
        "Note which product gives the best value for money."
      ],
      "expectedOutput": "A completed 3-item Price Comparison Table with value recommendations.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Do not handle fragile store merchandise roughly or open sealed packs.",
      "alternativeActivity": "Compare 3 food items in your home pantry by reading their printed MRP and net weight."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "The corner shopkeeper hands Harsh a bottle of water with MRP printed as ₹20, but demands ₹23 saying \"cooling charges\".",
        "choiceOptions": [
          {
            "option": "Politely say: \"Uncle, the printed MRP is ₹20 inclusive of all taxes, so legally cooling charges cannot be added.\"",
            "isOptimal": true,
            "reason": "Asserts legal consumer rights politely and firmly based on government standards."
          },
          {
            "option": "Shout and throw the bottle at the shopkeeper in anger.",
            "isOptimal": false,
            "reason": "Rude and aggressive behavior does not solve consumer disputes."
          },
          {
            "option": "Pay ₹50 and run away feeling intimidated.",
            "isOptimal": false,
            "reason": "Allows illegal overcharging to continue unchecked."
          }
        ],
        "keyTakeaway": "Know your consumer rights: MRP is the absolute legal ceiling."
      },
      "independentScenario": {
        "context": "You buy an eraser for ₹5 and a sharpener for ₹10. You hand the shopkeeper a ₹50 note.",
        "challengePrompt": "Calculate the total cost and the exact change the shopkeeper must return to you.",
        "selfEvaluationRubric": "Total cost = ₹15 (5 + 10). Change to receive = ₹35 (50 - 15)."
      }
    },
    "assessment": {
      "question": "What does \"MRP\" printed on Indian consumer goods stand for, and what does it legally mean?",
      "contextScenario": "Purchasing stationery at a school market.",
      "options": [
        {
          "id": "opt_1",
          "text": "Maximum Retail Price: the highest price a seller can legally charge for that product.",
          "isCorrect": true,
          "feedback": "Correct! Maximum Retail Price: the highest price a seller can legally charge for that product."
        },
        {
          "id": "opt_2",
          "text": "Minimum Regular Price: the lowest price you must pay.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Market Rate Payment: a suggested price that can be doubled on weekends.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Manufacturer Receipt Paper: an internal tracking code.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "MRP is the legally enforced price ceiling; charging above MRP violates consumer protection law."
    },
    "rubric": {
      "performanceTask": "Compare two competing consumer products by calculating unit cost and verifying MRP compliance.",
      "masteryCriteria": "Locates MRP, accurately calculates unit price, determines superior value, verifies change.",
      "criteria": [
        {
          "criterion": "Label Reading Accuracy",
          "weightPercentage": 40,
          "emerging": "Cannot find MRP.",
          "developing": "Finds MRP but misses expiry/quantity.",
          "proficient": "Reads MRP, date, and net quantity flawlessly.",
          "exemplary": "Thorough inspection of all statutory packaging data."
        },
        {
          "criterion": "Unit Cost Comparison",
          "weightPercentage": 35,
          "emerging": "Judges only by cartoon cover.",
          "developing": "Struggles with division math.",
          "proficient": "Calculates price per unit (per pen/per page) correctly.",
          "exemplary": "Clear explanation of cost-efficiency and value tradeoffs."
        },
        {
          "criterion": "Cashier Interaction",
          "weightPercentage": 25,
          "emerging": "Walks away without checking change.",
          "developing": "Counts change only when prompted.",
          "proficient": "Counts change at register calmly before departing.",
          "exemplary": "Polite, confident consumer communication."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Why does the Indian government mandate printing the MRP on every package?"
      },
      {
        "id": "ref_2",
        "prompt": "Have you ever seen an item where you were paying extra just for a cartoon sticker?"
      },
      {
        "id": "ref_3",
        "prompt": "How does comparing prices help your family save for holidays or big goals?"
      },
      {
        "id": "ref_4",
        "prompt": "What will you say if someone tries to charge you more than the printed price?"
      }
    ]
  },
  {
    "id": "mod_c4_m11_s1",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 11,
    "monthTheme": "Everyday Kindness, Empathy & Polite Manners",
    "sequenceNumber": 1,
    "globalIndex": 31,
    "category": "life_communication",
    "categoryLabel": "Communication & Confidence",
    "title": "Writing a Polite Thank-You Note to School Support Staff",
    "whyItMatters": "School bus drivers, security guards, and cleaning staff work hard every day to keep us safe and comfortable. Expressing gratitude makes others feel valued and builds humble empathy.",
    "learningObjectives": [
      "Identify the daily contributions of non-teaching school staff (bus drivers, security, sweepers, helpers)",
      "Write a sincere 3-sentence thank-you note with proper greeting, specific appreciation, and signature",
      "Deliver the note in person with a warm smile and clear eye contact",
      "Reflect on how acknowledging service workers changes the culture of your school"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Every morning in pouring rain and freezing winter, Bahadur uncle, the school security guard, stood at the school gate directing traffic and holding an umbrella for arriving children. Most students walked past him without even looking up or saying good morning.",
    "explanation": "True character is how you treat people who can do nothing for you. School support staff work long hours so your classrooms are clean, your buses arrive safely, and your campus is secure. A small handwritten thank-you card takes 5 minutes to make, but they will cherish it for years.",
    "stepByStep": [
      "Pick one support staff member to appreciate (bus driver, security guard, cleaner, or cafeteria staff).",
      "Fold a clean piece of paper into a greeting card and draw a neat border.",
      "Sentence 1 (Greeting & Thank You): \"Dear [Name/Uncle/Didi], Thank you so much for [specific task, e.g. keeping our bus safe every morning].\"",
      "Sentence 2 (Impact): \"Your hard work and cheerful smile make my school days so much brighter.\"",
      "Sentence 3 (Closing): \"With warm gratitude, [Your Name, Class 4-B].\"",
      "Hand it to them personally with two hands and a warm \"Dhanyawad / Thank you!\""
    ],
    "workedExample": {
      "title": "Kabir’s Card for Bahadur Uncle",
      "scenario": "Kabir writes a card for the gate guard.",
      "steps": [
        "Draws an umbrella and smiling sun on the card cover.",
        "Writes 3 heartfelt sentences.",
        "Hands it to Bahadur uncle as he enters the school gate.",
        "Uncle smiles with tears of joy and pins it in the guard cabin."
      ],
      "takeaway": "Gratitude costs nothing to give, but means everything to receive."
    },
    "commonMistakes": [
      {
        "mistake": "Writing a generic one-word note like \"Thanks\" without naming what they do.",
        "correction": "Mention their specific job (e.g. driving through heavy traffic safely) so they know you noticed their effort."
      },
      {
        "mistake": "Leaving the note on a random bench instead of handing it to them with eye contact.",
        "correction": "Look them in the eye and say \"Thank you\" directly so they feel your personal sincerity."
      }
    ],
    "decisionChecklist": [
      "Did I address them respectfully by name or title?",
      "Did I mention a specific thing they do for our school?",
      "Is my handwriting neat and legible?",
      "Did I hand it over with a smile and eye contact?"
    ],
    "reflectionPrompt": "How did the person’s face change when you handed them their thank-you card?",
    "summaryTakeaway": "Never miss an opportunity to appreciate the quiet heroes who keep our everyday world running.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m11_s1_hero.webp",
      "altText": "Writing a Polite Thank-You Note to School Support Staff - Step by step life skill demonstration for Class 4",
      "description": "Student handing a colorful handmade thank-you card to a smiling school bus driver wearing uniform.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_11_1_a",
        "title": "The 3-Sentence Gratitude Formula",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m11_s1_diag1.webp",
        "altText": "The 3-Sentence Gratitude Formula",
        "caption": "1. Specific Action -> 2. Personal Impact -> 3. Sincere Blessing / Closing.",
        "status": "ready"
      },
      {
        "id": "vis_c4_11_1_b",
        "title": "Respect in Action Checklist",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m11_s1_diag2.webp",
        "altText": "Respect in Action Checklist",
        "caption": "Smile, eye contact, respectful title (Uncle/Didi/Sir), two-hand delivery.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "The Power of a Thank-You Card",
      "duration": "2 mins 45 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Security guard standing in rain directing school traffic.",
          "narrationTranscript": "Every day, quiet heroes keep us safe, dry, and protected."
        },
        {
          "scene": 2,
          "visualDescription": "Child carefully folding paper and writing heartfelt 3-sentence note.",
          "narrationTranscript": "A three-sentence card takes five minutes, but carries a lifetime of kindness."
        },
        {
          "scene": 3,
          "visualDescription": "Guard smiling warmly and proudly holding the card.",
          "narrationTranscript": "See people. Acknowledge their hard work. Watch the world brighten up."
        }
      ],
      "practicalChallengeRecap": "Write and deliver a 3-sentence thank-you note to a school helper or community worker today."
    },
    "practicalActivity": {
      "title": "School Support Staff Appreciation Card",
      "objective": "Author, illustrate, and deliver an original thank-you card to a school helper or transport driver.",
      "materials": [
        "A4 drawing paper or cardstock",
        "Colored pencils or sketch pens",
        "Ruler"
      ],
      "procedure": [
        "Fold card in half.",
        "Draw a cheerful front cover design.",
        "Write the 3-sentence appreciation message inside.",
        "Deliver in person with clear greeting and eye contact."
      ],
      "expectedOutput": "A completed, delivered gratitude card with a written reflection on the recipient’s reaction.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Do not interrupt staff during safety-critical moments (e.g. while driving or operating heavy gates).",
      "alternativeActivity": "Write a thank-you note to your apartment building security guard or municipal sanitation worker."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Naveen is in the school bus and sees that the bus attendant helped carry a sick child’s bag.",
        "choiceOptions": [
          {
            "option": "Say aloud: \"Thank you so much, Bhaiya, for helping him out; that was very kind of you.\"",
            "isOptimal": true,
            "reason": "Publicly reinforces kind behavior and shows appreciation for daily care."
          },
          {
            "option": "Ignore it and look out the window.",
            "isOptimal": false,
            "reason": "Misses a prime opportunity to spread positivity."
          },
          {
            "option": "Tease the sick child for needing help.",
            "isOptimal": false,
            "reason": "Cruel and disrespectful behavior that damages team spirit."
          }
        ],
        "keyTakeaway": "Speak up when you see acts of service and kindness around you."
      },
      "independentScenario": {
        "context": "The school cleaning lady just finished mopping the hallway tiles outside your classroom.",
        "challengePrompt": "Explain how you will walk across the hallway and what you will say to her.",
        "selfEvaluationRubric": "Walked on dry edge to avoid ruining wet floor, smiled and thanked her for keeping school clean."
      }
    },
    "assessment": {
      "question": "What makes a thank-you note to a school worker truly meaningful and memorable?",
      "contextScenario": "Writing an appreciation note for the school bus driver.",
      "options": [
        {
          "id": "opt_1",
          "text": "Mentioning the specific action they take every day to help you and expressing genuine gratitude.",
          "isCorrect": true,
          "feedback": "Correct! Mentioning the specific action they take every day to help you and expressing genuine gratitude."
        },
        {
          "id": "opt_2",
          "text": "Using expensive imported glitter pens.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Making the note 10 pages long with complicated vocabulary.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Asking them for candy in return.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Sincerity and specific appreciation matter more than fancy decorations or expensive paper."
    },
    "rubric": {
      "performanceTask": "Write, illustrate, and deliver a personalized 3-sentence thank-you card to a school worker.",
      "masteryCriteria": "Specific appreciation, warm tone, neat calligraphy, respectful face-to-face delivery.",
      "criteria": [
        {
          "criterion": "Message Content & Structure",
          "weightPercentage": 40,
          "emerging": "Generic one-liner.",
          "developing": "Lacks specific contribution details.",
          "proficient": "Follows 3-sentence formula with specific job role.",
          "exemplary": "Deeply heartfelt, eloquent, and personal gratitude."
        },
        {
          "criterion": "Card Presentation",
          "weightPercentage": 35,
          "emerging": "Torn scrap paper.",
          "developing": "Untidy writing.",
          "proficient": "Neat cardstock fold, clean margins, legible penmanship.",
          "exemplary": "Beautifully illustrated with thoughtful decorative border."
        },
        {
          "criterion": "Delivery Demeanor",
          "weightPercentage": 25,
          "emerging": "Throws note and runs away.",
          "developing": "Delivers without looking up.",
          "proficient": "Warm smile, clear eye contact, polite address.",
          "exemplary": "Gracious, memorable personal exchange of respect."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Who is one worker at school whose name you don’t know yet? How can you find out?"
      },
      {
        "id": "ref_2",
        "prompt": "How do you feel when someone notices and thanks you for a hard chore you did?"
      },
      {
        "id": "ref_3",
        "prompt": "Why is saying \"Uncle\" or \"Didi\" with respect important in Indian culture?"
      },
      {
        "id": "ref_4",
        "prompt": "How can our whole class celebrate our support staff on Annual Day?"
      }
    ]
  },
  {
    "id": "mod_c4_m11_s2",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 11,
    "monthTheme": "Everyday Kindness, Empathy & Polite Manners",
    "sequenceNumber": 2,
    "globalIndex": 32,
    "category": "life_social_teamwork",
    "categoryLabel": "Social Skills, Empathy & Teamwork",
    "title": "Welcoming a New Student & Inviting Someone to Sit at Lunch",
    "whyItMatters": "Starting at a new school is scary and lonely. Reaching out with a simple invitation to sit together turns anxiety into friendship and prevents bullying.",
    "learningObjectives": [
      "Notice classmates sitting alone during recess, lunch, or free periods",
      "Approach with a friendly smile and use the Welcome Invitation formula: \"Hi, I’m [Name]. Would you like to sit with us?\"",
      "Ask two open-ended questions about their previous school, hobbies, or sports",
      "Introduce the new student to at least two other classmates"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "On Monday, a new girl named Zoya joined Class 4. During lunch break, everyone rushed to their familiar friend circles. Zoya sat on an empty corner bench alone, opening her tiffin box with downcast eyes, feeling completely invisible.",
    "explanation": "Remember your first day in a strange place? Every room looks intimidating and you wonder if anyone will like you. It takes immense bravery to be new, but it takes only 5 seconds of kindness to say: \"Hey, there’s an open spot here, come sit with us!\" One warm invite can change someone’s entire school year.",
    "stepByStep": [
      "Scan the lunchroom or playground for anyone sitting alone with slumped shoulders.",
      "Walk over calmly with a welcoming smile.",
      "Introduce yourself: \"Hi, I am [Your Name]. Welcome to Class 4! Would you like to sit with us at our table?\"",
      "If they say yes, show them where to keep their water bottle and introduce your table mates.",
      "Ask an easy question: \"What was your favorite subject at your old school?\" or \"Do you like badminton or football?\""
    ],
    "workedExample": {
      "title": "Pooja’s Lunch Table Welcome",
      "scenario": "Pooja notices Zoya sitting alone.",
      "steps": [
        "Pooja walks to Zoya’s bench.",
        "Says: \"Hi Zoya, I’m Pooja! We have space at our table, come join us.\"",
        "Zoya’s face lights up with relief.",
        "Pooja introduces her to Ananya and Meera.",
        "They share parathas and laugh together."
      ],
      "takeaway": "An open seat at lunch can create a friendship that lasts for years."
    },
    "commonMistakes": [
      {
        "mistake": "Whispering and giggling with your friends while pointing at the new kid.",
        "correction": "Whispering makes newcomers feel judged and insecure; approach them directly with openness."
      },
      {
        "mistake": "Interrogating them with rapid-fire questions like a police officer.",
        "correction": "Ask gentle, friendly questions and give them time to answer without pressure."
      }
    ],
    "decisionChecklist": [
      "Did I look around for anyone sitting alone?",
      "Did I introduce myself by name?",
      "Did I offer a clear, welcoming seat?",
      "Did I introduce them to my friends?"
    ],
    "reflectionPrompt": "How would you want your classmates to treat you if your family moved to a brand new city tomorrow?",
    "summaryTakeaway": "Make room at your table: an inclusive leader never lets anyone feel invisible.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m11_s2_hero.webp",
      "altText": "Welcoming a New Student & Inviting Someone to Sit at Lunch - Step by step life skill demonstration for Class 4",
      "description": "Smiling student gesturing to an empty chair at a lunch table, welcoming a shy new classmate holding her lunchbox.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_11_2_a",
        "title": "The Inclusion Radar",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m11_s2_diag1.webp",
        "altText": "The Inclusion Radar",
        "caption": "Scan the room: Look for solo benches, downcast eyes, or hesitation at the doorway.",
        "status": "ready"
      },
      {
        "id": "vis_c4_11_2_b",
        "title": "The 3-Step Friendship Bridge",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m11_s2_diag2.webp",
        "altText": "The 3-Step Friendship Bridge",
        "caption": "1. Warm Greeting & Name -> 2. The Open Seat Invite -> 3. Friendly Common Ground.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Nobody Eats Alone: The Welcome Circle",
      "duration": "3 mins 00 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "New student standing awkwardly in crowded noisy lunch cafeteria.",
          "narrationTranscript": "The loneliest place in the world can be a crowded room where you don't know anyone."
        },
        {
          "scene": 2,
          "visualDescription": "Child waving and pointing to an open seat beside them.",
          "narrationTranscript": "It takes five seconds of courage to say: 'Hey, come sit with us!'"
        },
        {
          "scene": 3,
          "visualDescription": "Group sharing tiffin food and laughing together.",
          "narrationTranscript": "Kindness builds a bigger table, not a higher fence."
        }
      ],
      "practicalChallengeRecap": "Spot anyone sitting alone today and invite them to join your group."
    },
    "practicalActivity": {
      "title": "The \"Open Seat\" Lunchtime Mission",
      "objective": "Identify a student sitting by themselves and invite them to share lunch or play a game.",
      "materials": [
        "School tiffin box",
        "Notepad for evening reflection"
      ],
      "procedure": [
        "Look around during lunch break for solo students.",
        "Walk over and use the Welcome Invitation formula.",
        "Learn 2 interesting facts about them.",
        "Introduce them to another classmate."
      ],
      "expectedOutput": "A written reflection detailing the conversation and how the student responded.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "If they genuinely prefer quiet time alone, respect their boundary politely.",
      "alternativeActivity": "Invite a student who was picked last in sports to be your practice partner."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Your usual friend group tells you: \"Don’t invite the new boy, our table is already full!\"",
        "choiceOptions": [
          {
            "option": "Squeeze your chair over and say: \"There’s always room for one more friend, let’s make space.\"",
            "isOptimal": true,
            "reason": "Models true leadership and prevents exclusive cliquish behavior."
          },
          {
            "option": "Agree with the group and ignore the new boy.",
            "isOptimal": false,
            "reason": "Participates in passive bullying and exclusion."
          },
          {
            "option": "Get into a screaming fistfight with your friends.",
            "isOptimal": false,
            "reason": "Aggression creates drama and makes the new student feel uncomfortable."
          }
        ],
        "keyTakeaway": "True leaders make the circle bigger, welcoming newcomers with pride."
      },
      "independentScenario": {
        "context": "A new student does not speak your local state language fluently and feels shy.",
        "challengePrompt": "Explain how you will communicate and make them feel welcome without making them feel embarrassed.",
        "selfEvaluationRubric": "Spoke clearly in common language/English, used friendly smiles and gestures, helped explain class routines."
      }
    },
    "assessment": {
      "question": "What is the most welcoming action you can take when you see a new classmate standing alone during lunch?",
      "contextScenario": "Recess in a crowded school cafeteria.",
      "options": [
        {
          "id": "opt_1",
          "text": "Walk over with a warm smile, introduce yourself by name, and invite them to sit at your table.",
          "isCorrect": true,
          "feedback": "Correct! Walk over with a warm smile, introduce yourself by name, and invite them to sit at your table."
        },
        {
          "id": "opt_2",
          "text": "Stare at them from across the room and talk about them with your friends.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Wait until the end of the term to see if they make other friends first.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Tell them that school lunch tables have reserved seating rules.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Take the initiative immediately; a warm invitation dispels anxiety and builds inclusion."
    },
    "rubric": {
      "performanceTask": "Role-play or execute welcoming an isolated peer into a group activity or lunch circle.",
      "masteryCriteria": "Immediate recognition, warm approach, clear invitation, active inclusion, peer introductions.",
      "criteria": [
        {
          "criterion": "Inclusion Initiative",
          "weightPercentage": 40,
          "emerging": "Ignores isolated peers.",
          "developing": "Welcomes only when told by teacher.",
          "proficient": "Proactively spots solo peers and initiates contact.",
          "exemplary": "Natural, champion inclusive leader in school culture."
        },
        {
          "criterion": "Conversational Warmth",
          "weightPercentage": 35,
          "emerging": "Awkward or interrogating tone.",
          "developing": "Asks one closed question.",
          "proficient": "Warm greeting, open questions, respectful listening.",
          "exemplary": "Exceptional empathy making the newcomer feel at home."
        },
        {
          "criterion": "Group Integration",
          "weightPercentage": 25,
          "emerging": "Leaves them sitting silently.",
          "developing": "Introduces to one person.",
          "proficient": "Introduces to entire table; facilitates shared talk.",
          "exemplary": "Integrates peer smoothly into ongoing playground games."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Have you ever felt like an outsider in a group? How did it feel?"
      },
      {
        "id": "ref_2",
        "prompt": "Why do school cliques hurt everyone involved?"
      },
      {
        "id": "ref_3",
        "prompt": "What is an easy question you can ask someone you just met to break the ice?"
      },
      {
        "id": "ref_4",
        "prompt": "How does welcoming others make our classroom a happier, safer place?"
      }
    ]
  },
  {
    "id": "mod_c4_m11_s3",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 11,
    "monthTheme": "Everyday Kindness, Empathy & Polite Manners",
    "sequenceNumber": 3,
    "globalIndex": 33,
    "category": "life_social_teamwork",
    "categoryLabel": "Social Skills, Empathy & Teamwork",
    "title": "Reading Body Language to Understand When a Friend Feels Down",
    "whyItMatters": "People don’t always say \"I am sad\" with words. Learning to read slumped shoulders, quiet sighs, and crossed arms helps you offer support when friends need it most.",
    "learningObjectives": [
      "Identify 4 non-verbal cues of sadness or frustration: slumped posture, downcast eyes, crossed arms, and sudden silence",
      "Understand that angry words often hide hurt feelings underneath",
      "Use the Gentle Check-In formula: \"You seem a bit quiet today, is everything okay?\"",
      "Know when to listen quietly without trying to force immediate cheerfulness"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "During art class, Rohan usually cracks funny jokes and shares paints eagerly. Today, he sat with his head resting on his forearm, staring at the floor, and quietly pushed his drawing book away.",
    "explanation": "More than half of human communication happens without making a single sound! Our bodies tell the truth even when our lips stay sealed. When a friend goes unusually quiet, frowns, or slumps their head, their body is signaling: \"I am having a hard day.\" Being an empathetic friend means noticing these clues and offering a gentle ear.",
    "stepByStep": [
      "Observe changes from their normal baseline behavior (e.g. normally chatty vs suddenly silent).",
      "Look at their eyes and posture: are shoulders rounded and eyes avoiding contact?",
      "Move closer quietly without drawing a big crowd.",
      "Offer a gentle check-in: \"Hey Rohan, you seem a bit quiet today. Do you want to talk about it, or would you like some quiet time?\"",
      "If they want to talk, listen without interrupting; if they want quiet, simply sit beside them in friendly solidarity."
    ],
    "workedExample": {
      "title": "Samar’s Empathetic Check-In",
      "scenario": "Samar notices Rohan looking miserable.",
      "steps": [
        "Notices Rohan’s slumped shoulders.",
        "Sits beside him quietly.",
        "Whispers: \"Hey buddy, I’m here if something went wrong.\"",
        "Rohan confesses he lost his mother’s fountain pen.",
        "Samar helps him search the art cupboard."
      ],
      "takeaway": "Just noticing someone’s sadness can lift half the weight off their shoulders."
    },
    "commonMistakes": [
      {
        "mistake": "Telling an upset friend: \"Oh, cheer up, you are overreacting!\" or \"Smile, it’s not a big deal!\"",
        "correction": "Invalidating someone’s feelings makes them feel misunderstood; listen and validate their experience instead."
      },
      {
        "mistake": "Shouting across the room: \"Hey everyone, look, why is he crying?!\"",
        "correction": "Never broadcast someone’s vulnerability; offer private, discreet support."
      }
    ],
    "decisionChecklist": [
      "Did I notice the physical body language cues?",
      "Did I check in privately without a big audience?",
      "Did I offer to listen without forcing advice?",
      "Did I show patience and understanding?"
    ],
    "reflectionPrompt": "When you are sad or upset, what does your body do, and what kind of support do you wish for?",
    "summaryTakeaway": "Listen with your eyes as well as your ears: true friendship notices the words people cannot say.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m11_s3_hero.webp",
      "altText": "Reading Body Language to Understand When a Friend Feels Down - Step by step life skill demonstration for Class 4",
      "description": "Child sitting supportively beside an upset classmate on a playground bench, offering gentle presence and listening.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_11_3_a",
        "title": "The Body Language Clue Card",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m11_s3_diag1.webp",
        "altText": "The Body Language Clue Card",
        "caption": "Downcast eyes = Sadness; Clenched fists = Frustration; Slumped chest = Discouragement.",
        "status": "ready"
      },
      {
        "id": "vis_c4_11_3_b",
        "title": "The 3-Step Empathy Check-In",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m11_s3_diag2.webp",
        "altText": "The 3-Step Empathy Check-In",
        "caption": "1. Notice the Clue -> 2. Private Gentle Check -> 3. Listen Without Judgment.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Reading the Silent Clues: Body Language & Empathy",
      "duration": "3 mins 05 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Child with slumped shoulders and tearful eyes looking down at desk.",
          "narrationTranscript": "Words aren't the only way people speak. Bodies tell the real story."
        },
        {
          "scene": 2,
          "visualDescription": "Friend sitting quietly beside them, speaking in a gentle voice.",
          "narrationTranscript": "You don't need magic answers. Just say: 'I noticed you're quiet today. I'm here.'"
        },
        {
          "scene": 3,
          "visualDescription": "Two friends sharing a quiet nod of mutual understanding.",
          "narrationTranscript": "True empathy is sitting together in the dark until the sun comes out."
        }
      ],
      "practicalChallengeRecap": "Notice the body language of three people around you today and offer gentle support if needed."
    },
    "practicalActivity": {
      "title": "Empathy Detective: Body Language Observation",
      "objective": "Observe non-verbal emotional cues in friends, family, or story characters and record insights.",
      "materials": [
        "Observation journal",
        "Pencil"
      ],
      "procedure": [
        "Watch characters in a book or people in a public setting.",
        "Note 3 physical body postures (shoulders, hands, eyes).",
        "Deduce what emotion they might be experiencing.",
        "Practice the Gentle Check-In line aloud."
      ],
      "expectedOutput": "A completed 3-case emotional observation entry with check-in strategies.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Do not stare rudely at strangers; observe naturally and respectfully.",
      "alternativeActivity": "Role-play with a parent: guess each other’s emotion based purely on silent body posture."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Your friend Maya strikes out in a baseball game, tosses the bat into the dirt, and sits with arms tightly crossed refusing to look at anyone.",
        "choiceOptions": [
          {
            "option": "Give her 2 minutes to cool down, then sit near her and say: \"Tough luck on that pitch Maya, but you made great contact.\"",
            "isOptimal": true,
            "reason": "Respects her initial frustration while offering supportive encouragement without criticism."
          },
          {
            "option": "Laugh loudly and say: \"Wow, you are the worst batter on our team!\"",
            "isOptimal": false,
            "reason": "Cruel teasing that turns a sports mistake into personal humiliation."
          },
          {
            "option": "Try to pry her arms open physically and force her to smile.",
            "isOptimal": false,
            "reason": "Invades personal space and ignores boundaries."
          }
        ],
        "keyTakeaway": "Give space when anger is hot, then offer calm, steady reassurance."
      },
      "independentScenario": {
        "context": "Your sibling comes home from school, slams their bedroom door, and refuses to speak during snack time.",
        "challengePrompt": "Explain what physical signs showed they had a bad day, and how you will approach them kindly.",
        "selfEvaluationRubric": "Identified door slam and silence as emotional cues; offered water/snack and private listening."
      }
    },
    "assessment": {
      "question": "Which set of physical body language cues most likely indicates that a classmate is feeling sad or discouraged?",
      "contextScenario": "Observing peers during afternoon recess.",
      "options": [
        {
          "id": "opt_1",
          "text": "Slumped shoulders, head looking down at the floor, and unusual silence during group games.",
          "isCorrect": true,
          "feedback": "Correct! Slumped shoulders, head looking down at the floor, and unusual silence during group games."
        },
        {
          "id": "opt_2",
          "text": "Standing tall, shouting excitedly, and jumping up and down.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Chewing gum while singing a song loudly.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Running laps around the football pitch with a wide grin.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Sadness and discouragement make the body collapse inward; look for downcast postures."
    },
    "rubric": {
      "performanceTask": "Identify emotional body language cues in a peer scenario and execute a sensitive check-in intervention.",
      "masteryCriteria": "Accurate cue detection, respectful approach, non-judgmental listening, supportive closing.",
      "criteria": [
        {
          "criterion": "Cue Recognition",
          "weightPercentage": 40,
          "emerging": "Oblivious to non-verbal signals.",
          "developing": "Recognizes only extreme crying.",
          "proficient": "Spots subtle changes in posture, eye contact, and tone.",
          "exemplary": "Remarkable intuitive emotional acuity."
        },
        {
          "criterion": "Check-In Delivery",
          "weightPercentage": 35,
          "emerging": "Demands or mocks.",
          "developing": "Asks publicly.",
          "proficient": "Gentle, private inquiry respecting boundaries.",
          "exemplary": "Masterful soothing presence that creates instant psychological safety."
        },
        {
          "criterion": "Active Listening",
          "weightPercentage": 25,
          "emerging": "Interrupts with unsolicited advice.",
          "developing": "Listens impatiently.",
          "proficient": "Listens attentively without interrupting or judging.",
          "exemplary": "Empathetic validation and practical peer support."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "What does your body do when you feel anxious or sad?"
      },
      {
        "id": "ref_2",
        "prompt": "Why is it bad advice to tell an upset person to \"just smile\"?"
      },
      {
        "id": "ref_3",
        "prompt": "How does simply having a friend sit quietly beside you help you feel better?"
      },
      {
        "id": "ref_4",
        "prompt": "Who is someone in your life who is really good at noticing when you feel down?"
      }
    ]
  },
  {
    "id": "mod_c4_m12_s1",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 12,
    "monthTheme": "School Pride, Waste Care & Community Respect",
    "sequenceNumber": 1,
    "globalIndex": 34,
    "category": "life_citizenship_community",
    "categoryLabel": "Practical Citizenship & Community Life",
    "title": "Sorting Waste into Green (Wet) and Blue (Dry) Bins",
    "whyItMatters": "Mixed garbage rots in open landfills, polluting ground water and choking cities. Sorting wet organic scraps from dry plastics lets nature compost while materials get recycled.",
    "learningObjectives": [
      "Distinguish between Wet Waste (organic kitchen scraps, fruit peels, leftover food) and Dry Waste (paper, plastic, metal, cardboard)",
      "Use Green bins for wet/compostable items and Blue bins for dry/recyclable items",
      "Rinse milk pouches and juice cartons before placing them in the dry bin",
      "Teach your family or classmates how to maintain separate waste bins at home"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "At school, Kabir threw a half-eaten banana peel and an oily samosa wrapper into the classroom recycling box filled with clean notebook paper. The banana rot and oil soaked through the paper, ruining the entire box of recyclable paper.",
    "explanation": "When you throw wet food on clean paper, both become useless trash that must be burned or dumped in a mountain of garbage! In India, we use a simple color code: GREEN for Wet Organic Waste (nature can turn this into rich fertilizer) and BLUE for Dry Recyclable Waste (factories can melt and remake these). Sorting takes 2 seconds and saves our planet.",
    "stepByStep": [
      "Look at what you want to throw away.",
      "Ask: \"Did it come from plants/animals that can rot?\" (Fruit peels, food, tea leaves) -> GREEN BIN.",
      "Ask: \"Is it man-made packaging that can be recycled?\" (Plastic wrappers, paper, cardboard, bottles) -> BLUE BIN.",
      "Always squeeze and rinse food residue out of plastic containers before dry disposal.",
      "Never mix hazardous waste (batteries, broken glass) with regular bins."
    ],
    "workedExample": {
      "title": "Kabir’s Waste Sorting Station",
      "scenario": "Kabir reorganizes his classroom bins.",
      "steps": [
        "Labels one bucket GREEN (Wet Waste).",
        "Labels second bucket BLUE (Dry Waste).",
        "Puts banana peel in GREEN.",
        "Puts juice box in BLUE after rinsing.",
        "The class diverts 80% of waste from landfills."
      ],
      "takeaway": "Clean segregation at source turns waste into wealth."
    },
    "commonMistakes": [
      {
        "mistake": "Throwing plastic wrappers and toffee packets into the wet waste bin.",
        "correction": "Plastics never decompose; they poison compost and harm cattle if mixed with wet waste."
      },
      {
        "mistake": "Throwing oily gravies and liquid soup directly into the dry paper bin.",
        "correction": "Liquids contaminate clean paper; scrape solids into wet bin and rinse containers."
      }
    ],
    "decisionChecklist": [
      "Did I separate food scraps from packaging?",
      "Did I use the Green bin for organic waste?",
      "Did I use the Blue bin for clean dry recyclables?",
      "Did I rinse sticky containers before binning?"
    ],
    "reflectionPrompt": "Look at the trash bins in your kitchen right now. Are they mixed or segregated?",
    "summaryTakeaway": "Green for Nature, Blue for Recyclables: separate your waste at source to protect mother Earth.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m12_s1_hero.webp",
      "altText": "Sorting Waste into Green (Wet) and Blue (Dry) Bins - Step by step life skill demonstration for Class 4",
      "description": "Child holding a fruit peel in one hand and clean plastic bottle in other, standing before Green and Blue segregated bins.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_12_1_a",
        "title": "The Two-Bin Rule",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m12_s1_diag1.webp",
        "altText": "The Two-Bin Rule",
        "caption": "GREEN BIN: Fruit peels, vegetable trimmings, leftover food. BLUE BIN: Paper, plastic, metal, glass.",
        "status": "ready"
      },
      {
        "id": "vis_c4_12_1_b",
        "title": "Rinse Before Recycling",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m12_s1_diag2.webp",
        "altText": "Rinse Before Recycling",
        "caption": "Give milk pouches, yogurt cups, and juice boxes a quick rinse before the dry bin.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Green Bin, Blue Bin: Sort It Right!",
      "duration": "3 mins 15 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Massive smoking garbage landfill vs clean green park.",
          "narrationTranscript": "Landfills grow because people mix clean paper with rotten food."
        },
        {
          "scene": 2,
          "visualDescription": "Color-coded Green and Blue bins with clear visual labels.",
          "narrationTranscript": "Green for what nature made. Blue for what factories can recycle."
        },
        {
          "scene": 3,
          "visualDescription": "Child rinsing a plastic container and placing in blue bin.",
          "narrationTranscript": "Rinse it clean, sort it right. Be a citizen your city can be proud of."
        }
      ],
      "practicalChallengeRecap": "Set up two separate bins (Wet & Dry) at home or in your classroom today."
    },
    "practicalActivity": {
      "title": "Home Waste Segregation Champion Challenge",
      "objective": "Audit and maintain separate Green (wet) and Blue (dry) bins at home for 7 days.",
      "materials": [
        "2 dustbins or buckets",
        "Green and Blue markers or colored paper labels",
        "Tracker log"
      ],
      "procedure": [
        "Label bucket 1 \"WET / ORGANIC (Green)\".",
        "Label bucket 2 \"DRY / RECYCLABLE (Blue)\".",
        "Explain the system to parents and siblings.",
        "Monitor waste sorting for 7 days."
      ],
      "expectedOutput": "A verified 7-day home waste segregation log signed by a parent.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Do not touch medical waste or broken glass; have an adult handle hazardous items.",
      "alternativeActivity": "Conduct a recess cleanup audit of 10 items thrown away by classmates."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Tanvi finishes an ice-cream cup. The paper cup has a plastic spoon and a puddle of melted sticky chocolate.",
        "choiceOptions": [
          {
            "option": "Lick or rinse the chocolate puddle, put the paper cup and plastic spoon into the BLUE dry bin.",
            "isOptimal": true,
            "reason": "Keeps dry recyclables free from excessive rot while sending plastic to recycling."
          },
          {
            "option": "Toss the whole sticky mess onto the playground grass.",
            "isOptimal": false,
            "reason": "Littering pollutes the school and attracts flies."
          },
          {
            "option": "Throw the plastic spoon into the wet compost bin.",
            "isOptimal": false,
            "reason": "Plastic never decomposes and ruins compost quality."
          }
        ],
        "keyTakeaway": "Take 10 seconds to rinse sticky recyclables before discarding."
      },
      "independentScenario": {
        "context": "You have: 1 apple core, 1 cardboard carton, 1 plastic chip packet, and tea leaves.",
        "challengePrompt": "Classify each of these 4 items into either the Green bin or the Blue bin.",
        "selfEvaluationRubric": "Green: apple core, tea leaves. Blue: cardboard carton, plastic chip packet."
      }
    },
    "assessment": {
      "question": "Which item belongs strictly in the GREEN waste bin?",
      "contextScenario": "Sorting garbage after school lunch.",
      "options": [
        {
          "id": "opt_1",
          "text": "Orange peels and leftover roti crusts.",
          "isCorrect": true,
          "feedback": "Correct! Orange peels and leftover roti crusts."
        },
        {
          "id": "opt_2",
          "text": "A crushed aluminum soda can.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "A plastic ballpoint pen with no ink.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "A glossy cardboard shoebox.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Green is exclusively for biodegradable organic material that nature can turn into soil."
    },
    "rubric": {
      "performanceTask": "Categorize a 12-item waste sorting tray into Wet (Green), Dry (Blue), and Hazardous categories.",
      "masteryCriteria": "100% sorting accuracy, explains decomposition rationale, demonstrates rinsing protocol.",
      "criteria": [
        {
          "criterion": "Sorting Accuracy",
          "weightPercentage": 40,
          "emerging": "Mixes plastics with food.",
          "developing": "1-2 items misplaced.",
          "proficient": "100% correct sorting of organic vs recyclable items.",
          "exemplary": "Flawless categorization including hazardous separation."
        },
        {
          "criterion": "Recycling Hygiene",
          "weightPercentage": 35,
          "emerging": "Throws greasy items in dry bin.",
          "developing": "Rinses only when told.",
          "proficient": "Consistently rinses liquid containers before dry binning.",
          "exemplary": "Pre-cleans recyclables systematically."
        },
        {
          "criterion": "Civic Advocacy",
          "weightPercentage": 25,
          "emerging": "Lacks personal interest.",
          "developing": "Follows rules at home only.",
          "proficient": "Actively promotes two-bin system among peers.",
          "exemplary": "Creates signage and leads classroom waste monitoring."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "What happens to garbage when it gets dumped into a city landfill?"
      },
      {
        "id": "ref_2",
        "prompt": "Why is compost so valuable for farmers and gardeners?"
      },
      {
        "id": "ref_3",
        "prompt": "How does sorting waste help municipal sanitation workers do their jobs safely?"
      },
      {
        "id": "ref_4",
        "prompt": "What simple change can your school canteen make to reduce single-use plastic?"
      }
    ]
  },
  {
    "id": "mod_c4_m12_s2",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 12,
    "monthTheme": "School Pride, Waste Care & Community Respect",
    "sequenceNumber": 2,
    "globalIndex": 35,
    "category": "life_citizenship_community",
    "categoryLabel": "Practical Citizenship & Community Life",
    "title": "Handling Library Books with Care & Respecting Shared Property",
    "whyItMatters": "Public and school library books are shared treasures meant to inspire hundreds of children. Treating books gently, turning pages by corners, and using bookmarks preserves them for everyone.",
    "learningObjectives": [
      "Turn pages from the top corner gently without licking fingers or tearing paper",
      "Use a paper bookmark instead of folding dog-ears or laying books face-down",
      "Keep food, open juice bottles, and markers completely away from library books",
      "Return borrowed books on or before the due date so other students can enjoy them"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "Aryan checked out a beautiful illustrated encyclopedia on sea creatures. He ate butter popcorn while reading it, dog-eared page 45 to mark his place, and stuffed it into his backpack next to an open water bottle that leaked.",
    "explanation": "A library book does not belong to you—it belongs to the entire community! When you tear a page, make oily fingerprint smudges, or break the spine, the next child cannot read it. Taking care of shared books proves that you are a trustworthy and civilized scholar.",
    "stepByStep": [
      "Make sure your hands are clean and dry before opening a library book.",
      "Never eat or drink while reading; keep water bottles in a separate compartment.",
      "Turn pages by gently lifting the top outer corner with fingertips (never lick fingers!).",
      "Use a flat paper bookmark to mark your spot; NEVER fold dog-ears or lay open books face down.",
      "Return the book to the librarian on time with pride."
    ],
    "workedExample": {
      "title": "Aryan’s Book Care Transformation",
      "scenario": "Aryan borrows a space exploration book.",
      "steps": [
        "Makes a handmade cardboard bookmark.",
        "Puts water bottle in exterior mesh pocket.",
        "Turns glossy pages by the top corner.",
        "Returns book in mint condition on Thursday.",
        "Librarian praises his stewardship."
      ],
      "takeaway": "Returning a book in perfect condition is a mark of true student honor."
    },
    "commonMistakes": [
      {
        "mistake": "Folding page corners (\"dog-earing\") to remember where you stopped reading.",
        "correction": "Dog-earing weakens and permanently creases pages; always use a paper bookmark or ribbon."
      },
      {
        "mistake": "Writing answers or doodling with pen inside library books.",
        "correction": "Never mark shared books; use your own notebook to write thoughts or quotes."
      }
    ],
    "decisionChecklist": [
      "Are my hands clean and dry?",
      "Is my water bottle far away from the book?",
      "Did I use a bookmark instead of dog-ears?",
      "Did I turn pages gently from the top corner?"
    ],
    "reflectionPrompt": "How would you feel if you borrowed a book you were excited about, only to find the last chapter torn out?",
    "summaryTakeaway": "Treat shared library books like precious gold: preserve the knowledge for the children who come after you.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m12_s2_hero.webp",
      "altText": "Handling Library Books with Care & Respecting Shared Property - Step by step life skill demonstration for Class 4",
      "description": "Student gently using a flat decorated bookmark inside a hardcover library book, turning page by top corner.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_12_2_a",
        "title": "The Book Anatomy Code of Care",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m12_s2_diag1.webp",
        "altText": "The Book Anatomy Code of Care",
        "caption": "Protect the spine: Do not force open flat; do not stack face down; use bookmarks.",
        "status": "ready"
      },
      {
        "id": "vis_c4_12_2_b",
        "title": "Corner Page Turn Technique",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m12_s2_diag2.webp",
        "altText": "Corner Page Turn Technique",
        "caption": "Lift top corner gently between index finger and thumb. No finger licking!",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Guardians of the Bookshelf: Library Care",
      "duration": "2 mins 50 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Torn, dog-eared, stained book vs crisp well-kept library book.",
          "narrationTranscript": "A library book is a shared gift passed from student to student."
        },
        {
          "scene": 2,
          "visualDescription": "Demonstrating top-corner page turning and inserting bookmark.",
          "narrationTranscript": "Turn pages gently from the corner. Never fold dog-ears into the paper."
        },
        {
          "scene": 3,
          "visualDescription": "Handing book to school librarian with a respectful smile.",
          "narrationTranscript": "Return it clean, on time, and proud. You are a true guardian of knowledge."
        }
      ],
      "practicalChallengeRecap": "Make your own paper bookmark today and never fold a book page again."
    },
    "practicalActivity": {
      "title": "Craft a Personalized Library Bookmark",
      "objective": "Design and craft a durable paper bookmark with reading tips and use it for all shared books.",
      "materials": [
        "Cardstock or thick paper strip (2 x 6 inches)",
        "Markers",
        "Hole punch and ribbon/yarn"
      ],
      "procedure": [
        "Cut cardstock into a 2x6 inch strip.",
        "Write an inspiring reading motto on one side (e.g. \"Readers are Leaders\").",
        "Write 3 Book Care Rules on the reverse.",
        "Punch hole at top and tie ribbon."
      ],
      "expectedOutput": "A finished durable bookmark in active daily use with a reading book.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Use child-safe scissors when cutting cardstock.",
      "alternativeActivity": "Perform a gentle eraser cleanup on pencil marks in your personal textbooks."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Diya is reading a library book and feels thirsty. Her water tumbler is right beside the open page.",
        "choiceOptions": [
          {
            "option": "Close the book, move tumbler to a separate side table, drink, wipe hands, and reopen book.",
            "isOptimal": true,
            "reason": "Completely eliminates the risk of catastrophic water spills onto shared books."
          },
          {
            "option": "Drink with one hand while holding the heavy book directly under the glass.",
            "isOptimal": false,
            "reason": "High risk of water condensation dripping and warping pages."
          },
          {
            "option": "Leave the open book face down on the dining table as a cup coaster.",
            "isOptimal": false,
            "reason": "Breaks the book binding and permanently ruins the cover."
          }
        ],
        "keyTakeaway": "Keep food and beverages strictly separated from books and electronic devices."
      },
      "independentScenario": {
        "context": "You notice that a classmate has drawn pencil doodles inside a school library dictionary.",
        "challengePrompt": "Explain how you will gently erase the marks or report the issue to the librarian.",
        "selfEvaluationRubric": "Offered to gently erase pencil marks using a clean soft vinyl eraser without tearing paper."
      }
    },
    "assessment": {
      "question": "Why should you use a flat bookmark instead of folding the corner of a book page (dog-earing)?",
      "contextScenario": "Marking your reading position in a library novel.",
      "options": [
        {
          "id": "opt_1",
          "text": "Because folding corners permanently creases, weakens, and eventually tears the paper over time.",
          "isCorrect": true,
          "feedback": "Correct! Because folding corners permanently creases, weakens, and eventually tears the paper over time."
        },
        {
          "id": "opt_2",
          "text": "Because bookmarks make the book heavier.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "Because librarians charge a fee for books with bookmarks.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Because dog-ears make books change language.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Dog-earing causes permanent fiber breakage in paper; use flat paper bookmarks."
    },
    "rubric": {
      "performanceTask": "Demonstrate proper book handling: page turning, bookmark usage, shelf return, and spill prevention.",
      "masteryCriteria": "Clean hands, top-corner page manipulation, bookmark habit, undamaged spine, punctual return.",
      "criteria": [
        {
          "criterion": "Physical Book Handling",
          "weightPercentage": 40,
          "emerging": "Roughly turns pages; licks fingers.",
          "developing": "Lacks gentle corner touch.",
          "proficient": "Flawless top-corner page lifting with clean dry hands.",
          "exemplary": "Exceptional preservationist care of all printed materials."
        },
        {
          "criterion": "Marking & Bookmarks",
          "weightPercentage": 35,
          "emerging": "Folds dog-ears or scribbles.",
          "developing": "Uses bulky objects like pens.",
          "proficient": "Consistently utilizes flat bookmarks.",
          "exemplary": "Advocates for bookmark use across the classroom."
        },
        {
          "criterion": "Shared Responsibility",
          "weightPercentage": 25,
          "emerging": "Loses books or returns late.",
          "developing": "Returns only after reminders.",
          "proficient": "Returns library books on or before due date in mint condition.",
          "exemplary": "Volunteers as student library assistant."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "What is the oldest book you have ever held in your hands?"
      },
      {
        "id": "ref_2",
        "prompt": "Why is it painful to find a book with pages torn or scribbled on?"
      },
      {
        "id": "ref_3",
        "prompt": "What reading motto did you choose to write on your bookmark?"
      },
      {
        "id": "ref_4",
        "prompt": "How does taking care of public books show respect for other students?"
      }
    ]
  },
  {
    "id": "mod_c4_m12_s3",
    "classNumber": 4,
    "lifeSkillStage": "foundation_guided",
    "month": 12,
    "monthTheme": "School Pride, Waste Care & Community Respect",
    "sequenceNumber": 3,
    "globalIndex": 36,
    "category": "life_citizenship_community",
    "categoryLabel": "Practical Citizenship & Community Life",
    "title": "Pedestrian Etiquette: Walking on Footpaths & Holding Hands in Crowds",
    "whyItMatters": "Busy roads and crowded markets have heavy traffic, turning vehicles, and uneven surfaces. Practicing pedestrian safety and crowd awareness keeps you and your family safe.",
    "learningObjectives": [
      "Always walk on the raised footpath or against traffic on roads without sidewalks",
      "Hold an adult’s hand firmly in crowded markets, railway stations, and busy road intersections",
      "Never look down at phone screens or chase loose balls into active streets",
      "Look Left-Right-Left and make eye contact with drivers before crossing at a zebra crossing"
    ],
    "prerequisites": [
      "None"
    ],
    "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
    "materials": [
      "Notebook",
      "Pencil",
      "Activity Checklist"
    ],
    "safetyGuidance": "Safe for home and school practice with basic adult awareness.",
    "contentVersion": "1.0.0",
    "publicationStatus": "published",
    "openingScenario": "During Diwali shopping in a crowded bazaar, 9-year-old Samar saw a glittering toy balloon across the lane. He let go of his mother’s hand and darted between parked scooters into the middle of the street, while a speeding delivery motorcycle swerved sharply.",
    "explanation": "Crowds and streets move fast. In a split second, a child can get separated from family or stepped into the path of an oncoming vehicle. Being a smart pedestrian means having street awareness: keeping your ears unplugged, staying on the pedestrian footpath, and holding hands in busy crowds.",
    "stepByStep": [
      "Always stay on the footpath; if there is no sidewalk, walk on the right side facing oncoming traffic so you can see vehicles.",
      "In crowded markets or bus terminals, hold your guardian’s hand or stay within arm’s reach at all times.",
      "Before crossing any street: STOP at the curb, LOOK right, look left, and look right again.",
      "Make sure the approaching driver has stopped completely before stepping onto the road.",
      "If a ball or pet runs into the street, NEVER chase it; ask an adult for help."
    ],
    "workedExample": {
      "title": "Samar’s Safe Market Walk",
      "scenario": "Samar shops with father in busy market.",
      "steps": [
        "Holds father’s hand firmly.",
        "Keeps eyes scanning the walkway for uneven bricks.",
        "Stops at zebra crossing.",
        "Looks Right-Left-Right.",
        "Crosses calmly with group."
      ],
      "takeaway": "Holding hands and staying alert ensures every market trip ends safely."
    },
    "commonMistakes": [
      {
        "mistake": "Running into the street to grab a cricket ball without stopping at the curb.",
        "correction": "A lost ball can be replaced for ₹50; your life is priceless. Always stop and check traffic."
      },
      {
        "mistake": "Wearing headphones or looking at a screen while walking on a busy road.",
        "correction": "You need your ears to hear vehicle horns, screeching brakes, and emergency sirens."
      }
    ],
    "decisionChecklist": [
      "Am I walking on the raised footpath?",
      "Am I holding a parent’s hand in crowds?",
      "Are my ears unplugged and eyes alert?",
      "Did I do the Stop-Look-Listen check before crossing?"
    ],
    "reflectionPrompt": "Why is it important to see the driver’s eyes before stepping in front of a car at a crossing?",
    "summaryTakeaway": "Walk alert, hold hands in crowds, and never step into a street without looking: safety first, always.",
    "heroVisual": {
      "url": "/images/skills/modules/c4/c4_m12_s3_hero.webp",
      "altText": "Pedestrian Etiquette: Walking on Footpaths & Holding Hands in Crowds - Step by step life skill demonstration for Class 4",
      "description": "Child holding parent’s hand while walking safely along a designated pedestrian footpath beside a busy city street.",
      "attribution": "TalentXcel Practical Life-Skills Studio",
      "status": "ready"
    },
    "instructionalVisuals": [
      {
        "id": "vis_c4_12_3_a",
        "title": "The Pedestrian Hierarchy",
        "diagramType": "infographic",
        "url": "/images/skills/modules/c4/diagrams/c4_m12_s3_diag1.webp",
        "altText": "The Pedestrian Hierarchy",
        "caption": "1. Footpath -> 2. Zebra Crossing -> 3. Walk Facing Traffic if No Sidewalk.",
        "status": "ready"
      },
      {
        "id": "vis_c4_12_3_b",
        "title": "The 3-Second Street Stop",
        "diagramType": "checklist",
        "url": "/images/skills/modules/c4/diagrams/c4_m12_s3_diag2.webp",
        "altText": "The 3-Second Street Stop",
        "caption": "STOP at curb -> LOOK Right, Left, Right -> LISTEN for horns -> WALK calmly.",
        "status": "ready"
      }
    ],
    "videoContent": {
      "videoTitle": "Street Smart: Walking Safely in Public",
      "duration": "3 mins 10 secs",
      "videoUrl": null,
      "status": "storyboard_ready",
      "storyboardBrief": [
        {
          "scene": 1,
          "visualDescription": "Crowded market with auto-rickshaws, bikes, and shoppers.",
          "narrationTranscript": "Busy streets are exciting, but dangers move fast."
        },
        {
          "scene": 2,
          "visualDescription": "Child holding parent's hand firmly and stopping at curb.",
          "narrationTranscript": "Hold hands in crowds. Never let go to chase a toy or ball."
        },
        {
          "scene": 3,
          "visualDescription": "Checking Right-Left-Right and making eye contact with driver.",
          "narrationTranscript": "Make eye contact. Be sure the driver sees you before you cross."
        }
      ],
      "practicalChallengeRecap": "Practice the Stop-Look-Listen pedestrian check next time you cross a road with an adult."
    },
    "practicalActivity": {
      "title": "Pedestrian Route Safety Audit",
      "objective": "Walk a 10-minute neighborhood route with an adult and identify pedestrian safety features.",
      "materials": [
        "Walking shoes",
        "Audit checklist",
        "Parent escort"
      ],
      "procedure": [
        "Walk from home to a local store or park.",
        "Identify where footpaths exist and where they are blocked.",
        "Count zebra crossings and traffic signals.",
        "Practice making eye contact with stopped drivers."
      ],
      "expectedOutput": "A completed Pedestrian Safety Walk Map with marked safe crossing points.",
      "completionChecklist": [
        "Reviewed instructions before starting",
        "Executed each step with care",
        "Recorded result in notebook",
        "Shared reflection with caregiver or peer"
      ],
      "safetyPrecautions": "Always stay within arm’s reach of an adult when walking near active traffic.",
      "alternativeActivity": "Map out the safest walking route inside your school campus from gate to classroom."
    },
    "scenarioPractice": {
      "guidedScenario": {
        "context": "Arjun is walking home from school and sees his favorite teacher on the other side of a 4-lane avenue.",
        "choiceOptions": [
          {
            "option": "Walk to the official traffic signal zebra crossing 50 meters away, wait for green pedestrian light, and cross.",
            "isOptimal": true,
            "reason": "Using official pedestrian infrastructure protects against high-speed traffic."
          },
          {
            "option": "Dash across the 4 lanes between moving cars while waving hands.",
            "isOptimal": false,
            "reason": "Extreme risk of fatal collision; drivers cannot brake in time."
          },
          {
            "option": "Jump over the concrete median divider.",
            "isOptimal": false,
            "reason": "Illegal, reckless, and risks tripping onto oncoming traffic."
          }
        ],
        "keyTakeaway": "Extra steps to a safe crossing are always worth your life."
      },
      "independentScenario": {
        "context": "You are playing cricket in a residential lane and the tennis ball rolls under a parked car.",
        "challengePrompt": "Explain how you will safely retrieve the ball.",
        "selfEvaluationRubric": "Checked if car engine was running/driver inside; knelt without entering street; retrieved safely."
      }
    },
    "assessment": {
      "question": "If a road does not have a raised sidewalk or footpath, on which side of the road should pedestrians walk?",
      "contextScenario": "Walking on a neighborhood lane without footpaths.",
      "options": [
        {
          "id": "opt_1",
          "text": "On the side facing oncoming traffic (the right side in India) so you can see vehicles approaching.",
          "isCorrect": true,
          "feedback": "Correct! On the side facing oncoming traffic (the right side in India) so you can see vehicles approaching."
        },
        {
          "id": "opt_2",
          "text": "In the dead center of the road.",
          "isCorrect": false,
          "feedback": "This is not the optimal choice. Review the practical steps in the lesson."
        },
        {
          "id": "opt_3",
          "text": "With your back turned to traffic on the left edge.",
          "isCorrect": false,
          "feedback": "This approach does not solve the underlying challenge safely or effectively."
        },
        {
          "id": "opt_4",
          "text": "Walking backwards with eyes closed.",
          "isCorrect": false,
          "feedback": "Avoid this option; it creates confusion or avoidable risks."
        }
      ],
      "correctOptionId": "opt_1",
      "remediationActivity": "Walking facing oncoming traffic gives you visual warning if a vehicle approaches too close."
    },
    "rubric": {
      "performanceTask": "Demonstrate street crossing protocol, crowd hand-holding compliance, and hazard perception.",
      "masteryCriteria": "Stop-Look-Listen mastery, maintains hand grip, faces traffic, rejects distractions.",
      "criteria": [
        {
          "criterion": "Street Crossing Execution",
          "weightPercentage": 40,
          "emerging": "Darts into street.",
          "developing": "Looks one way only.",
          "proficient": "Full Stop-Look-Listen sequence at curb.",
          "exemplary": "Flawless right-left-right scan and driver eye contact."
        },
        {
          "criterion": "Crowd Discipline",
          "weightPercentage": 35,
          "emerging": "Runs away in crowds.",
          "developing": "Holds hand only when pulled.",
          "proficient": "Maintains firm hand grip or arm’s length in crowds.",
          "exemplary": "Proactively alerts adults to crowded bottlenecks."
        },
        {
          "criterion": "Situational Awareness",
          "weightPercentage": 25,
          "emerging": "Distracted by phone/toys.",
          "developing": "Reminded to pay attention.",
          "proficient": "Eyes up, ears clear of headphones, scans obstacles.",
          "exemplary": "Models exemplary pedestrian vigilance for younger peers."
        }
      ]
    },
    "reflectionPrompts": [
      {
        "id": "ref_1",
        "prompt": "Why is it dangerous to wear earphones or look at a phone while walking on the street?"
      },
      {
        "id": "ref_2",
        "prompt": "Have you ever felt lost in a crowded market? How did you reconnect with family?"
      },
      {
        "id": "ref_3",
        "prompt": "Why does holding hands in crowds keep families united and safe?"
      },
      {
        "id": "ref_4",
        "prompt": "What can your city do to make pedestrian footpaths wider and safer for children?"
      }
    ]
  }
]
