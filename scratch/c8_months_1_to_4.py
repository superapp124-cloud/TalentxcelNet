# scratch/c8_months_1_to_4.py

months_1_to_4 = [
    # MONTH 1: Advanced Academic Organization & High-Stakes Planning
    {
        "month": 1, "theme": "High-School Transition, Deep Focus & Exam Calendaring", "seq": 1,
        "cat": "life_study_skills", "cat_label": "Study Skills & Learning Independence",
        "title": "Building an 8-Week Master Exam Revision Timetable: Spaced Repetition and Buffer Weeks",
        "why": "In Class 8, syllabi expand across multiple science, social science, and mathematics chapters. Cramming the weekend before exams produces extreme panic and memory blanks. An 8-week backward-planned timetable with built-in spaced repetition and buffer periods guarantees calm mastery.",
        "objs": [
            "Calculate total syllabus volume by counting chapters across all 6 core academic subjects",
            "Construct an 8-week backward-planned revision calendar with dedicated slots for initial review and spaced recall",
            "Incorporate a non-negotiable 1-week 'Emergency Buffer' before exam commencement to absorb illness or delays",
            "Track daily revision completion using an objective color-coded status tracker"
        ],
        "scenario": "Priya entered Class 8 and discovered her half-yearly exams covered 38 chapters across Science, Math, Social Studies, English, and Hindi. With 4 weeks remaining, she attempted to study 4 hours a night without a plan, panicked, and spent 3 days stuck on a single difficult Physics chapter.",
        "expl": "Preparing for secondary school exams is not a sprint of exhaustion; it is an engineering project! Professional project managers never build skyscrapers by working randomly. They backward-plan from the delivery deadline, assign daily milestones, and insert contingency buffers. Spaced repetition ensures you review a topic 1 day, 7 days, and 21 days after first learning it, converting fragile short-term recall into rock-solid long-term memory.",
        "steps": [
            "Conduct the Chapter Inventory: On a master sheet, list every single chapter to be examined across all subjects (e.g. 12 Math, 10 Science, 8 History/Civics/Geo, 8 Languages).",
            "Determine Available Working Days: Count the exact number of days remaining until Day 1 of exams. Subtract 7 full days to serve as your 'Buffer Week'.",
            "Calculate Daily Velocity: Divide total chapters by available non-buffer days. If you have 38 chapters and 38 days, your required pace is 1 chapter per day.",
            "Schedule Dual-Slot Days: Divide daily study time into two 45-minute blocks: Block 1 for New Revision (today's scheduled chapter), Block 2 for Spaced Recall (a 20-minute quiz on a chapter studied 7 days ago).",
            "Protect the Buffer Week: Reserve the final 7 days exclusively for full-length timed mock papers and resting your brain—never for learning new topics for the first time.",
            "Mount the Grid: Tape the calendar visibly at eye level above your desk; cross off completed sessions with a green highlighter."
        ],
        "example": {
            "title": "Priya's 8-Week Master Blueprint",
            "scenario": "Priya organizes her 38 chapters over 56 calendar days.",
            "steps": [
                "Leaves Days 50 to 56 as an untouched Buffer & Mock Exam Week.",
                "Distributes 38 chapters across Days 1 to 45 (approx 1 chapter per day with rest Sundays).",
                "Pairs tough Science chapters (e.g., Chemical Reactions) with lighter English literature analysis.",
                "When she catches a seasonal cold on Day 18, she rests guilt-free, knowing her schedule has room.",
                "Enters exam hall calm, having reviewed each chapter three times over two months."
            ],
            "takeaway": "Backward planning with a protected buffer week turns high-stakes secondary exams into predictable, relaxed execution."
        },
        "mistakes": [
            ("Planning 10 hours of study every single day without rest days.", "Unrealistic schedules cause instant burnout by day 4; schedule sustainable 90-to-120 minute focused blocks with scheduled leisure."),
            ("Failing to include buffer days and abandoning the entire timetable after one unexpected event.", "Life always brings disruptions; building a 7-day buffer absorbs disruptions without destroying your study plan.")
        ],
        "checklist": [
            "Are all chapters across all subjects cataloged on an inventory sheet?",
            "Is the final 7-day period strictly reserved as an Emergency Buffer & Mock Exam week?",
            "Are revision blocks limited to 45-minute high-focus sprints with 10-minute breaks?",
            "Does the schedule incorporate spaced recall intervals (Day 1, Day 7, Day 21)?",
            "Is the timetable posted publicly above your study desk?"
        ],
        "prompt": "How does knowing you have a 7-day emergency buffer change your anxiety levels when unexpected family events or illness occur?",
        "takeaway": "Plan backward, build buffers: secondary school academic success belongs to architects of time, not midnight crammers.",
        "vis1": {"title": "The 8-Week Spaced Revision Architecture", "caption": "Weeks 1-6: First pass + 7-day spaced recall | Week 7: Rapid synthesis | Week 8: Mock exams & buffer."},
        "vis2": {"title": "The 3-Interval Memory Retention Curve", "caption": "Day 1 (100%) -> Day 7 Recall Spike -> Day 21 Master Consolidation. Never study a chapter only once!"},
        "act": {
            "title": "The Master 8-Week Exam Matrix Construction",
            "obj": "Map out an actual 8-week backward-planned study calendar for upcoming term examinations with chapter quotas and buffer periods.",
            "steps": [
                "Obtain your school syllabus and list every chapter for your next major exam cycle.",
                "Draw an 8-week grid on an A3 chart paper (56 daily blocks).",
                "Color-code Week 8 in yellow as 'Mock Paper & Buffer Zone'.",
                "Evenly distribute subjects so you never study two dense mathematical/numerical subjects back-to-back.",
                "Affix the chart above your desk and sign it with a personal commitment signature."
            ],
            "output": "A completed A3 Master Exam Revision Chart showing 56 scheduled days, chapter assignments, and highlighted buffer zones."
        },
        "guided": {
            "context": "You have an exam in 6 weeks with 24 chapters. A classmate suggests studying all 24 chapters during the final 4 days before exams.",
            "optimal": "Reject the suggestion; map out 1 chapter every weekday for 5 weeks, reserving the 6th week for mock papers and rapid revision.",
            "opt_reason": "Prevents catastrophic working memory overload and leverages spaced repetition for durable retention.",
            "non1": "Agree with your friend and play video games for the next 5 weeks.",
            "non1_reason": "Guarantees panic, sleep deprivation, and poor exam performance.",
            "non2": "Study 14 hours a day starting tonight until you collapse from exhaustion.",
            "non2_reason": "Leads to severe burnout and physical illness well before exam week.",
            "takeaway": "Divide syllabus volume over weeks, not panicked midnight hours."
        },
        "indep": {
            "context": "Why does the human hippocampus require repeated sleep consolidation cycles across weeks to convert facts into semantic memory?",
            "prompt": "Explain the neurobiological basis of spaced repetition and synaptic consolidation in adolescent learning.",
            "rubric": "Explained synaptic plasticity, hippocampal-to-neocortical memory transfer, and the role of slow-wave sleep in memory retention."
        },
        "quiz": {
            "q": "What is the primary function of an 'Emergency Buffer Week' in a secondary school exam study plan?",
            "opt_correct": "To provide dedicated contingency time that absorbs unexpected delays, illnesses, or difficult topics without derailing the overall schedule.",
            "opt_w1": "To take a complete week-long vacation from all schoolwork.",
            "opt_w2": "To cram all chapters for the very first time.",
            "opt_w3": "To stay up all night drinking caffeine."
        },
        "rubric": {
            "task": "Create and execute an 8-week backward-planned academic revision schedule incorporating spaced repetition intervals.",
            "mastery": "Accurately audits syllabus volume, computes realistic daily velocity, integrates spaced recall sessions, and maintains progress tracking.",
            "c1": "Syllabus Deconstruction & Time Velocity Calculation",
            "c2": "Spaced Repetition & Buffer Scheduling",
            "c3": "Calendar Adherence & Habit Tracking"
        },
        "refs": [
            "How does Hermann Ebbinghaus's Forgetting Curve demonstrate the necessity of multi-week review intervals?",
            "What is the difference between active recall (testing yourself) and passive review (re-reading highlighted text)?",
            "Why is interleaving different subjects more effective for brain consolidation than 8 hours of a single subject?",
            "How does sleep architecture (specifically REM and slow-wave sleep) physically write memories into brain tissue?"
        ]
    },
    {
        "month": 1, "theme": "High-School Transition, Deep Focus & Exam Calendaring", "seq": 2,
        "cat": "life_study_skills", "cat_label": "Study Skills & Learning Independence",
        "title": "The Leitner Flashcard Box System: Systematically Mastering High-Volume Terminology",
        "why": "Class 8 introduces hundreds of technical definitions, historical dates, scientific formulas, and Sanskrit/Hindi grammar rules. Passive re-reading is proven to be the least effective study technique. The physical Leitner 5-box flashcard system automates active retrieval practice and saves 50% of revision time.",
        "objs": [
            "Construct a physical 5-compartment Leitner flashcard organizer from cardboard or shoe boxes",
            "Author 50 high-yield flashcards with a concise question/prompt on front and an active answer on back",
            "Execute the Leitner progression algorithm: correct cards move forward to less frequent review; incorrect cards drop back to Box 1",
            "Contrast active retrieval effort with the passive 'illusion of competence' caused by skimming textbooks"
        ],
        "scenario": "Tanmay spent three hours reading through his Class 8 Biology chapter on Cell Structure with a fluorescent yellow highlighter. During the unit test, when asked to define 'Mitochondria cristae function', his mind went completely blank. He complained: 'I spent hours highlighting that page, why couldn't I remember it?'",
        "expl": "Highlighting a textbook feels productive because your eyes recognize the text, creating a dangerous psychological trap called the 'Illusion of Competence'. Recognition is NOT recall! In an exam, you don't have the textbook open to recognize words; your brain must pull the answer out of thin air. The Leitner Box system, invented by German scientist Sebastian Leitner, forces your brain to retrieve answers under effort. Cards you know well are reviewed only once every 2 weeks, while cards you struggle with are drilled daily.",
        "steps": [
            "Build the 5 Compartments: Divide a small shoe box into 5 labeled compartments: Box 1 (Everyday), Box 2 (Every 3 days), Box 3 (Once a week), Box 4 (Every 2 weeks), Box 5 (Monthly/Mastered).",
            "Author True Retrieval Cards: Keep cards index-sized (3x5 inches). Write ONE clear question on the front ('What is the chemical formula for Rust?') and the answer on the back ('Hydrated Iron(III) Oxide: Fe2O3·nH2O').",
            "Shuffle New Cards into Box 1: Begin every new chapter with all cards placed in Box 1.",
            "Run the Daily Retrieval Drill: Pick up Box 1 cards. Read the prompt out loud, pause, and force yourself to state the answer before flipping the card.",
            "The Advancement Rule: If you get it right without hesitation, promote the card to Box 2. If you hesitate or make any error, it stays in Box 1!",
            "The Demotion Penalty: When reviewing higher boxes (e.g. Box 3 or 4), if you miss a card, it immediately drops all the way back to Box 1! This ruthlessly eliminates false confidence."
        ],
        "example": {
            "title": "Tanmay's Biology Turnaround",
            "scenario": "Tanmay builds a 50-card Leitner deck for Cell Biology and Photosynthesis.",
            "steps": [
                "Creates cards with diagrams and definitions on separate sides.",
                "Week 1: Box 1 has 50 cards. Reviews daily for 15 minutes.",
                "Week 2: 35 cards graduate to Box 2; 15 difficult terminology cards stay in Box 1.",
                "Week 3: 20 cards advance to Box 3 (weekly review).",
                "Before final exams, Box 1 only contains 4 tricky concepts, which he drills in 3 minutes.",
                "Scores 25/25 on terminology in the final exam."
            ],
            "takeaway": "Automating active retrieval with Leitner compartments directs 90% of your energy toward your weakest concepts."
        },
        "mistakes": [
            ("Writing entire encyclopedia paragraphs on a single card.", "Flashcards must test atomic units of knowledge; one question, one clear answer per card."),
            ("Flipping the card immediately without forcing yourself to speak or write the answer first.", "Flipping early destroys active recall and re-triggers the illusion of competence.")
        ],
        "checklist": [
            "Do I have a physical 5-compartment organizer labeled Box 1 through Box 5?",
            "Are my flashcards atomic (single prompt on front, concise answer on back)?",
            "Do I speak or write the answer before flipping to check?",
            "Do correct answers advance forward and missed answers drop back to Box 1?",
            "Am I reviewing Box 1 daily and higher boxes on their scheduled intervals?"
        ],
        "prompt": "Why does making your brain struggle for 10 seconds to recall an answer create stronger neural connections than immediately glancing at the solution?",
        "takeaway": "Test, don't glance: the Leitner box transforms fragile reading into permanent memory retrieval.",
        "vis1": {"title": "The 5-Compartment Leitner Progression", "caption": "Box 1 (Daily) -> Box 2 (Every 3 Days) -> Box 3 (Weekly) -> Box 4 (Fortnightly) -> Box 5 (Mastered)."},
        "vis2": {"title": "The Golden Rule of Demotion", "caption": "Correct = Advance 1 Box. Any Mistake = Drop immediately back to Box 1 for daily reinforcement."},
        "act": {
            "title": "The 50-Card Leitner Box Construction Project",
            "obj": "Build a functional 5-slot flashcard organizer and populate it with 50 high-yield terminology cards from Science or Social Studies.",
            "steps": [
                "Find a shoe box or cardboard container and cut 4 dividers to create 5 slots.",
                "Label the slots: 1 (Daily), 2 (3-Day), 3 (Weekly), 4 (Fortnightly), 5 (Retired).",
                "Cut 50 blank index cards (approximately 3x5 inches).",
                "Pick 2 challenging school chapters and write 50 precise question-answer flashcards.",
                "Complete your first 15-minute Box 1 sorting session."
            ],
            "output": "A fully functional physical 5-box Leitner organizer populated with 50 custom academic flashcards."
        },
        "guided": {
            "context": "You are testing yourself with a Box 3 flashcard on the Treaty of Versailles. You remember 2 out of the 3 key provisions, but forget the third.",
            "optimal": "Mark it incorrect and return the card to Box 1 for daily review until all 3 provisions are retrieved effortlessly.",
            "opt_reason": "Enforces uncompromising mastery and prevents partial knowledge from costing exam marks.",
            "non1": "Promote it to Box 4 anyway, saying 'I basically knew it.'",
            "non1_reason": "Self-delusion that causes sudden blanks under examination stress.",
            "non2": "Tear up the flashcard and throw the box away.",
            "non2_reason": "Destructive emotional overreaction to a routine retrieval error.",
            "takeaway": "Be ruthless with yourself during flashcard drills so exams feel effortless."
        },
        "indep": {
            "context": "How does the 'Testing Effect' (retrieval practice) fundamentally alter memory consolidation compared to repeated reading?",
            "prompt": "Evaluate empirical research on retrieval-induced facilitation in cognitive psychology.",
            "rubric": "Detailed explanation of memory reconsolidation, synaptic trace strengthening, and error-driven learning mechanisms."
        },
        "quiz": {
            "q": "What happens to a flashcard in Box 4 if you make a mistake while reviewing it in the Leitner system?",
            "opt_correct": "It drops immediately back to Box 1 for daily practice until mastered again.",
            "opt_w1": "It stays in Box 4 forever.",
            "opt_w2": "It gets thrown in the trash bin.",
            "opt_w3": "It gets promoted to Box 5."
        },
        "rubric": {
            "task": "Construct a Leitner 5-box system, author 50 atomic flashcards, and demonstrate the correct advancement and demotion rules.",
            "mastery": "Creates well-crafted atomic cards, follows scheduling intervals strictly, demotes missed cards to Box 1, and articulates the testing effect.",
            "c1": "Flashcard Atomic Quality & Synthesis",
            "c2": "Leitner Box Construction & Interval Maintenance",
            "c3": "Active Retrieval Rigor & Honest Self-Assessment"
        },
        "refs": [
            "Why did cognitive psychologist Robert Bjork coin the term 'desirable difficulty' to describe active recall?",
            "How can digital apps like Anki replicate Leitner boxes, and what are the unique tactile benefits of physical cards?",
            "Why is creating your own flashcards significantly more effective than downloading pre-made decks from the internet?",
            "How does drawing quick schematic diagrams on flashcards leverage the dual-coding theory of memory?"
        ]
    },
    {
        "month": 1, "theme": "High-School Transition, Deep Focus & Exam Calendaring", "seq": 3,
        "cat": "life_independence", "cat_label": "Personal Independence & Daily Living",
        "title": "Setting Up an Ergonomic, Distraction-Free Secondary Study Sanctuary",
        "why": "Studying in bed or on a cluttered dining table surrounded by smartphones and television noise destroys cognitive endurance within 20 minutes. Creating an ergonomically sound, dedicated study sanctuary prevents chronic neck/back strain and establishes a Pavlovian neurological trigger for deep focus.",
        "objs": [
            "Audit your current study environment for ergonomic alignment (chair height, desk height, screen/book distance, lighting)",
            "Implement the 'Smartphone in Another Room' protocol to eliminate ambient cognitive drain",
            "Organize essential study supplies within arm's reach to eliminate movement distractions",
            "Establish a consistent 2-minute pre-study ritual that signals your brain to enter focused attention"
        ],
        "scenario": "Shreya attempted to study her Class 8 History chapter while lying propped up on pillows in bed with her smartphone charging on the nightstand. Every 6 minutes, her phone screen lit up with notifications. After 40 minutes, her neck ached, she had re-read the same page four times, and she felt drowsy.",
        "expl": "Your physical environment controls your mental state! When you lie in bed with a textbook, your brain receives conflicting biological signals: 'Bed means sleep, but book means work.' The result is brain fog and exhaustion. Furthermore, cognitive scientists proved that having a smartphone on your desk—even if turned face down and silenced—reduces your working memory capacity by 15% simply because your brain expends subconscious energy resisting it. A dedicated study sanctuary teaches your brain that sitting in this chair means deep, uninterrupted focus.",
        "steps": [
            "Choose a Dedicated Work Surface: Use a flat desk or table. Never study in bed or on a soft couch.",
            "Calibrate Ergonomic Posture: Adjust chair height so your feet rest flat on the floor with knees at a 90-degree angle. Your elbows should rest naturally at a 90-degree angle on the desk surface.",
            "Elevate Your Reading Angle: Prop heavy textbooks or tablet screens on a simple bookstand at eye level so your neck remains upright, eliminating the 25-kg pressure of 'tech-neck'.",
            "Optimize Illuminance: Position your desk lamp so light shines from the side opposite your writing hand (from the left if you are right-handed) to eliminate harsh pencil shadows.",
            "Establish the Digital Quarantine: Place your smartphone on 'Do Not Disturb' mode in a completely separate room (e.g. parents' bedroom) during study blocks.",
            "Equip the Supply Station: Keep pens, rulers, highlighters, post-it notes, and a filled water bottle within arm's reach so you never break focus to hunt for supplies."
        ],
        "example": {
            "title": "Shreya's Study Sanctuary Transformation",
            "scenario": "Shreya shifts from studying in bed to a dedicated corner desk.",
            "steps": [
                "Clears an unused small wooden table in the quiet corner of her bedroom.",
                "Adds a firm cushion to her wooden chair so her feet touch the floor comfortably.",
                "Uses two thick books as a makeshift stand to elevate her textbook to eye level.",
                "Leaves her phone in the kitchen docking station before every 45-minute sprint.",
                "Finds she completes 15 pages in 45 minutes with zero neck pain or drowsiness."
            ],
            "takeaway": "An ergonomic desk and phone quarantine double your study speed while safeguarding your physical health."
        },
        "mistakes": [
            ("Studying on a bed or reclining couch.", "Associating study with sleep surfaces induces drowsiness and causes severe cervical spine strain."),
            ("Leaving your phone on your study desk 'just for checking the dictionary or time.'", "The mere presence of a phone triggers continuous dopamine checks; use a simple Rs 100 digital kitchen timer and paper dictionary instead.")
        ],
        "checklist": [
            "Are my feet flat on the floor with knees and hips at 90-degree angles?",
            "Is my textbook or screen elevated to eye level with a stand?",
            "Is my desk lamp positioned to avoid writing hand shadows?",
            "Is my smartphone physically outside the study room in a separate quarantine zone?",
            "Are all necessary pens, paper, and water within arm's reach before starting?"
        ],
        "prompt": "How does physically walking into a clean, dedicated study space make you feel ready to work compared to sitting amidst clutter on a bed?",
        "takeaway": "Design your space, sharpen your mind: a clean ergonomic sanctuary turns focus into an effortless habit.",
        "vis1": {"title": "The 90-90-90 Ergonomic Alignment", "caption": "Feet flat (90 deg) | Knees bent (90 deg) | Elbows on desk (90 deg) | Head upright with eye-level reading."},
        "vis2": {"title": "The Digital Quarantine Protocol", "caption": "Study Desk (Clean, analog focus tools) <--- Physical Wall ---> Smartphone (Charging in another room)."},
        "act": {
            "title": "The Study Sanctuary Ergonomic Audit & Setup",
            "obj": "Transform your personal study area into a certified ergonomic, distraction-free focus sanctuary.",
            "steps": [
                "Photograph your current study setup from the side while sitting down.",
                "Check your posture: Are feet flat? Is your neck bent downwards? Adjust chair height or add a footrest/cushion.",
                "Construct or position a bookstand to elevate heavy reading material.",
                "Remove all non-study clutter, dirty dishes, and electronic toys from the desk surface.",
                "Designate an official 'Phone Quarantine Basket' located outside your study room."
            ],
            "output": "A documented before-and-after photo inventory and an ergonomic compliance checklist signed by you and a family member."
        },
        "guided": {
            "context": "You sit down to study for a major physics exam. Your phone buzzes on the desk with a message from a gaming group.",
            "optimal": "Stand up immediately, walk the phone into the hallway or kitchen, put it on silent, and return to your desk.",
            "opt_reason": "Eliminates cognitive friction and prevents endless social media rabbit holes during study hours.",
            "non1": "Open the message, reply briefly, and keep the phone in your lap under the desk.",
            "non1_reason": "Guarantees divided attention and ruins deep cognitive retention.",
            "non2": "Smash your phone on the floor with a hammer.",
            "non2_reason": "Irrational destruction of property that fails to build mature self-regulation.",
            "takeaway": "Physical distance is the most reliable willpower tool for digital devices."
        },
        "indep": {
            "context": "Why does the 'Brain Drain Hypothesis' demonstrate that the physical presence of a smartphone reduces available cognitive capacity even when turned off?",
            "prompt": "Analyze cognitive load theory and attentional capture mechanisms regarding ubiquitous mobile devices.",
            "rubric": "Explained top-down attentional control, subconscious inhibitory effort, and empirical working memory test results."
        },
        "quiz": {
            "q": "What is the primary reason why studying in bed causes poor academic focus and retention?",
            "opt_correct": "The brain associates beds with sleep and relaxation, creating biological drowsiness and poor posture.",
            "opt_w1": "Bed mattresses emit invisible brain-jamming radiation.",
            "opt_w2": "Pillows absorb your memories like a sponge.",
            "opt_w3": "Beds make textbooks heavier to hold."
        },
        "rubric": {
            "task": "Audit personal study environment, configure ergonomic sitting posture, and enforce strict digital device quarantine.",
            "mastery": "Applies ergonomic standards accurately, eliminates environmental distractions, establishes phone quarantine protocol, and maintains focus stamina.",
            "c1": "Ergonomic Alignment & Eye-Level Optimization",
            "c2": "Digital Distraction Quarantine Rigor",
            "c3": "Environmental Order & Focus Routine Maintenance"
        },
        "refs": [
            "What did the University of Texas 'Brain Drain' study discover about cognitive capacity and smartphone proximity?",
            "How does ambient blue light from screens suppress melatonin secretion and destroy restorative deep sleep?",
            "Why do classical authors and mathematicians like Cal Newport emphasize the role of dedicated architecture in 'Deep Work'?",
            "How does the Pomodoro technique (25m work / 5m break) complement an ergonomic study sanctuary?"
        ]
    },

    # MONTH 2: Public Speaking, Debate & Constructive Disagreement
    {
        "month": 2, "theme": "Formal Debate, Disagreeing Agreeably & Speech Structure", "seq": 1,
        "cat": "life_communication", "cat_label": "Communication & Confidence",
        "title": "The Parliamentary Debate Framework: Point-Counterpoint Without Personal Attacks",
        "why": "Adolescents frequently confuse arguing with shouting, mocking, or insulting the other person. In high school, college, and adult careers, debate is a formal collaborative inquiry. The Parliamentary debate structure teaches students to deconstruct an argument's premises and evidence with intellectual poise and emotional composure.",
        "objs": [
            "Distinguish between attacking an opponent's argument (Ad Rem) versus attacking their character/intelligence (Ad Hominem)",
            "Structure a 3-minute formal debate speech using the ARE framework: Assertion, Reasoning, and Evidence",
            "Formulate an effective rebuttal using the 'They Said... We Say... Because...' 3-step transition formula",
            "Maintain professional debate etiquette: respectful tone, timed delivery, and acknowledging valid opposing points"
        ],
        "scenario": "During a Class 8 school debate on 'Should school uniforms be mandatory?', Rohan became angry when his classmate Sneha presented strong data. Rohan yelled: 'You only say that because you have terrible fashion sense and want everyone to look boring!' The audience laughed uncomfortably, and the judges penalized Rohan's team.",
        "expl": "A debate is not a street brawl; it is an intellectual chess match! When you resort to personal insults (called 'Ad Hominem' fallacies), you immediately signal to the audience that you have run out of logical arguments. Great debaters attack the ARGUMENT, never the PERSON. By structuring your points using Assertion, Reasoning, and Evidence (ARE), you present an unshakeable wall of logic while earning universal respect for your maturity and elegance.",
        "steps": [
            "Adopt the ARE Formula: Every point must have: 1. Assertion (The clear claim), 2. Reasoning (Why the claim is logically true), 3. Evidence (A verifiable fact, study, or concrete example).",
            "Ban Ad Hominem Attacks: Never comment on your opponent's age, clothes, grades, speaking style, or personality. Treat their character with absolute respect.",
            "Listen with the 'Flow Sheet': Fold a paper in half. On the left, write your opponent's exact arguments as they speak; on the right, sketch your rebuttal points.",
            "Deploy the 3-Step Rebuttal Formula: When speaking, state: 'My opponent argued that [X]. However, we contend that [Y], because [logical reason or counter-evidence Z].'",
            "Concede Valid Points Magnanimously: If an opponent makes an undeniable point, say: 'While my opponent rightly notes [X], the broader systemic consequence remains [Y].' Conceding minor truths makes your core rebuttal far stronger.",
            "Modulate Tone and Tempo: Speak at 130 words per minute with grounded posture. Shouting weakens your authority; calm clarity commands the room."
        ],
        "example": {
            "title": "Rohan's Debate Transformation",
            "scenario": "Rohan participates in a formal debate on 'Social Media Age Limits for Teens'.",
            "steps": [
                "Listens quietly to the opposing team's claim that social media connects lonely teens.",
                "Rises calmly and deploys the 3-step rebuttal: 'Our opponents argue that social media reduces teen isolation. However, peer-reviewed clinical data shows the opposite, because algorithmic feeds replace genuine face-to-face interaction with anxiety-inducing comparison loops.'",
                "Cites a 2023 adolescent mental health study showing a 40% rise in depressive symptoms.",
                "Ends by thanking the judges and shaking the opposing debaters' hands.",
                "Wins the Best Speaker award for intellectual composure."
            ],
            "takeaway": "Dismantling arguments with data and poise commands immense respect; insulting opponents destroys your credibility."
        },
        "mistakes": [
            ("Interrupting the speaker while they are delivering their speech.", "Interrupting violates basic debate ethics and leads to instant point deductions; record notes on your flow sheet and wait for your rebuttal turn."),
            ("Shouting louder when your argument is weak.", "Volume is never a substitute for logic; when you shout, listeners perceive panic rather than conviction.")
        ],
        "checklist": [
            "Does my speech follow the ARE structure (Assertion, Reasoning, Evidence)?",
            "Am I attacking the argument (Ad Rem) and completely avoiding personal attacks (Ad Hominem)?",
            "Did I track the opponent's points on a structured flow sheet?",
            "Did I use the 3-step rebuttal formula ('They said... We say... Because...')?",
            "Did I maintain calm vocal pacing without shouting or interrupting?"
        ],
        "prompt": "Why does watching someone remain calm and polite during an intense debate make them appear far more powerful than someone who is red-faced and screaming?",
        "takeaway": "Attack the logic, respect the person: formal debate turns heated conflict into elevated intellectual discovery.",
        "vis1": {"title": "The ARE Argument Architecture", "caption": "Assertion (What you claim) + Reasoning (Why it happens) + Evidence (Proof & data) = Unshakeable Logic."},
        "vis2": {"title": "The 3-Step Rebuttal Transition", "caption": "Step 1: 'They argued X' -> Step 2: 'However, we contend Y' -> Step 3: 'Because evidence Z demonstrates...'"},
        "act": {
            "title": "The Mini-Parliamentary Debate Drill",
            "obj": "Prepare a 3-minute debate speech on a current civic issue using the ARE framework and deliver a structured rebuttal against a peer.",
            "steps": [
                "Select a debate resolution (e.g. 'Should homework be banned for middle school students?').",
                "Draft 2 primary arguments using the ARE (Assertion, Reasoning, Evidence) template.",
                "Partner with a classmate or family member assigned to the opposing view.",
                "Take 2 minutes to flow their speech on paper without speaking.",
                "Deliver a 90-second rebuttal using the 'They said... We say... Because...' formula."
            ],
            "output": "A written ARE speech outline and a completed Flow Sheet detailing opponent claims and structured rebuttals."
        },
        "guided": {
            "context": "During a classroom debate, an opponent smirks and says: 'Only someone who fails math would make such a ridiculous point.'",
            "optimal": "Ignore the personal insult entirely; address the judges: 'My opponent questions my academic record, but has yet to address the published economic data on the board. Let us examine the numbers.'",
            "opt_reason": "Highlights the opponent's childish fallacy while keeping the focus squarely on your superior evidence.",
            "non1": "Yell: 'You're the one who fails math, you idiot!'",
            "non1_reason": "Drags you down into a mud-slinging brawl and disqualifies both speakers.",
            "non2": "Burst into tears and run out of the classroom.",
            "non2_reason": "Surrenders control to an opponent's cheap taunt.",
            "takeaway": "When opponents attack your character, it means they know their arguments have failed."
        },
        "indep": {
            "context": "How did classical Aristotelian rhetoric balance Ethos (credibility), Pathos (emotional resonance), and Logos (logical rigor) in public discourse?",
            "prompt": "Evaluate how modern political polarization undermines Logos in favor of weaponized tribal Pathos.",
            "rubric": "Comprehensive analysis of Aristotle's rhetorical triad, fallacious appeals, and strategies for restoring evidence-based civic discourse."
        },
        "quiz": {
            "q": "What is an 'Ad Hominem' fallacy in a debate?",
            "opt_correct": "Attacking the personal character, appearance, or background of the opponent rather than addressing the substance of their argument.",
            "opt_w1": "Citing a peer-reviewed scientific paper.",
            "opt_w2": "Speaking slightly over your allotted time limit.",
            "opt_w3": "Using a whiteboard to display statistical graphs."
        },
        "rubric": {
            "task": "Construct and deliver an ARE-structured argument, record an opponent's claims on a flow sheet, and deliver an evidence-based rebuttal without personal attacks.",
            "mastery": "Demonstrates flawless ARE reasoning, uses polite flow-sheet rebuttals, maintains emotional composure, and avoids all Ad Hominem fallacies.",
            "c1": "ARE Logical Argumentation Rigor",
            "c2": "Flow-Sheet Analysis & Rebuttal Precision",
            "c3": "Debate Poise & Professional Etiquette"
        },
        "refs": [
            "How does the Oxford Union debate format maintain strict parliamentary decorum during world-class debates?",
            "What is a 'Straw Man' fallacy, and how can you call it out when an opponent misrepresents your argument?",
            "Why is the principle of 'Steel-manning' (making your opponent's argument as strong as possible before refuting it) the hallmark of great thinkers?",
            "How do legal advocates in supreme courts present arguments without raising their voices?"
        ]
    },
    {
        "month": 2, "theme": "Formal Debate, Disagreeing Agreeably & Speech Structure", "seq": 2,
        "cat": "life_communication", "cat_label": "Communication & Confidence",
        "title": "Handling Difficult Q&A Panels: Buying Time and Structuring Impromptu Answers",
        "why": "Presenting prepared slides is relatively easy, but facing unexpected questions from teachers, judges, or critical classmates triggers intense stage fright, babbling, or defensive defensiveness. Mastering structured impromptu answering techniques gives students poise under pressure.",
        "objs": [
            "Execute the 3-second 'Pause and Reframe' technique to buy cognitive thinking time without panicking",
            "Structure impromptu answers using the PREP model: Point, Reason, Example, Point",
            "Gracefully handle questions when you do not know the answer without faking or lying",
            "Defuse aggressive or hostile questions by acknowledging the underlying concern respectfully"
        ],
        "scenario": "Ananya finished her Class 8 Science presentation on solar desalination. During the Q&A, an audience member challenged: 'Isn't your design completely useless because the glass panes will shatter in high winds?' Ananya turned pale, mumbled incoherently, and apologized repeatedly even though her design actually included reinforced polycarbonate.",
        "expl": "When someone asks an aggressive or unexpected question, your amygdala interprets it as an attack, triggering a fight-or-flight surge of adrenaline. Most people react by rushing to speak immediately, which leads to rambling nonsense. Professional spokespeople and scientists never rush! They pause, take a breath, thank the questioner, reframe the question, and structure their response using the PREP framework: Point, Reason, Example, and Point restatement.",
        "steps": [
            "The 3-Second Breath: When a question ends, do not blurt out the first thought. Plant your feet, inhale slowly through your nose, and hold silence for 3 seconds. To the audience, silence looks like deep intelligence, not hesitation!",
            "Acknowledge and Reframe: Say: 'Thank you for raising that practical durability issue. The question touches on how the system withstands extreme weather conditions.' This proves you listened and buys thinking time.",
            "Deploy the PREP Framework: 1. Point (State your direct conclusion clearly), 2. Reason (Explain the mechanism), 3. Example (Provide a specific fact or data point), 4. Point (Reiterate your conclusion).",
            "The Honest Boundary Formula: If you genuinely do not know the answer, never fabricate facts! Say: 'We did not measure that specific variable in this preliminary model; that is an excellent area for our phase two testing.'",
            "Maintain Open Body Language: Keep your hands uncrossed and open, maintain gentle eye contact with the questioner, and avoid defensive crossed arms or rolling your eyes."
        ],
        "example": {
            "title": "Ananya's Q&A Mastery",
            "scenario": "Ananya faces the same wind-durability challenge during the district science fair.",
            "steps": [
                "Takes a calm 3-second breath and smiles warmly.",
                "Reframes: 'That is a vital engineering question regarding field durability in coastal windstorms.'",
                "Applies PREP: Point: 'Our unit is engineered specifically to withstand 60 km/h gusts.' Reason: 'Instead of brittle glass, we utilized 4mm multi-wall polycarbonate sheeting bonded to a steel frame.' Example: 'During wind tunnel fan testing, the unit sustained zero deflection at maximum fan velocity.' Point: 'Therefore, structural integrity is fully maintained even in storm conditions.'",
                "Judges nod in deep admiration of her technical poise.",
                "Wins First Prize in Environmental Innovation."
            ],
            "takeaway": "Pausing to reframe and applying PREP turns hostile challenges into shining demonstrations of expertise."
        },
        "mistakes": [
            ("Rambling instantly to avoid awkward silence, filling the air with 'um', 'uh', and contradictions.", "Silence is not awkward; a confident 3-second pause demonstrates composure and gives your brain time to structure a brilliant answer."),
            ("Faking an answer or inventing statistics when you do not know the fact.", "Fabricating answers destroys your reputation permanently; admitting limitations with a forward-looking plan demonstrates true scientific integrity.")
        ],
        "checklist": [
            "Did I pause for 3 seconds before answering without blurting?",
            "Did I thank the questioner and reframe the core issue?",
            "Did my response follow PREP (Point, Reason, Example, Point)?",
            "If unknown, did I state boundaries honestly without fabricating?",
            "Did I maintain open, uncrossed posture and calm eye contact?"
        ],
        "prompt": "Why does admitting 'We have not tested that variable yet, but it is our next research priority' earn more trust than pretending you know everything?",
        "takeaway": "Breathe, reframe, and PREP: structured impromptu answers turn unexpected grilling into moments of triumph.",
        "vis1": {"title": "The 3-Second Pause & Reframe Sequence", "caption": "Question Ends -> Inhale (3s Silence) -> Acknowledge & Reframe -> Deploy Structured Answer."},
        "vis2": {"title": "The PREP Framework for Impromptu Answers", "caption": "Point (Direct Claim) -> Reason (Why) -> Example (Proof/Case) -> Point (Reiterated Conclusion)."},
        "act": {
            "title": "The Q&A Pressure Hot-Seat Drill",
            "obj": "Present a 1-minute topic overview and respond to 3 unscripted, challenging peer questions using the PREP model.",
            "steps": [
                "Prepare a brief 60-second summary of any topic you know well (e.g. a hobby, sports rule, or science topic).",
                "Deliver your mini-presentation to a group of 3 peers or family members.",
                "Instruct the audience to ask 1 easy question, 1 tough question, and 1 question with an unknown fact.",
                "Execute the 3-second pause and PREP formula for each.",
                "Practice the 'Honest Boundary' formula on the unknown question."
            ],
            "output": "A peer feedback evaluation card rating your pause duration, PREP structure adherence, and emotional composure."
        },
        "guided": {
            "context": "A student asks you a question during your history presentation in an aggressive, sarcastic tone designed to make you look silly.",
            "optimal": "Smile slightly, take a calm breath, strip away the sarcasm, and address the factual core: 'The question asks whether our historical sources were biased. That is central to historical analysis...'",
            "opt_reason": "Refuses to take the bait, de-escalates hostility, and elevates the intellectual level of the room.",
            "non1": "Snap back: 'Why don't you shut up and read the book yourself!'",
            "non1_reason": "Makes you look immature and loses the respect of the teacher and audience.",
            "non2": "Freeze up and refuse to answer any more questions.",
            "non2_reason": "Allows a rude questioner to derail your entire presentation.",
            "takeaway": "Respond to the question's factual core, completely ignoring the speaker's sarcastic tone."
        },
        "indep": {
            "context": "How do corporate CEOs and diplomats maintain composure under relentless, hostile grilling by investigative journalists?",
            "prompt": "Analyze the 'Bridging Technique' used in high-stakes public crisis communications.",
            "rubric": "Detailed explanation of rhetorical bridging, message pivots, cognitive grounding under cortisol spikes, and ethics of transparency."
        },
        "quiz": {
            "q": "What is the best way to handle a question during a presentation if you genuinely do not know the factual answer?",
            "opt_correct": "Acknowledge the value of the question, state honestly that you do not have that specific data, and explain how you will investigate it.",
            "opt_w1": "Make up a plausible-sounding statistic on the spot.",
            "opt_w2": "Pretend you didn't hear the question and ask for the next one.",
            "opt_w3": "Tell the questioner their question is stupid."
        },
        "rubric": {
            "task": "Field unscripted presentation questions, execute the 3-second pause, apply PREP structure, and handle knowledge gaps with intellectual integrity.",
            "mastery": "Pauses calmly, reframes effectively, articulates clear PREP components, handles tough/unknown queries with humility and poise.",
            "c1": "Impulse Control & 3-Second Pause Execution",
            "c2": "PREP Structural Coherence & Evidence",
            "c3": "Integrity & Grace Under Hostile Questioning"
        },
        "refs": [
            "How does Toastmasters International train executive impromptu speaking through their 'Table Topics' methodology?",
            "What did physiological studies reveal about how deliberate slow exhales lower adrenaline during public speaking?",
            "How does the 'Steer and Anchor' communication technique work in live television debates?",
            "Why is transparency about what you don't know the single greatest predictor of perceived scientific credibility?"
        ]
    },
    {
        "month": 2, "theme": "Formal Debate, Disagreeing Agreeably & Speech Structure", "seq": 3,
        "cat": "life_social_teamwork", "cat_label": "Social Skills, Empathy & Teamwork",
        "title": "Separating the Idea from the Person: Constructive Peer Critique in Group Projects",
        "why": "Group projects in Class 8 frequently dissolve into hurt feelings, silent resentment, or bitter shouting because students take criticism of their work as an attack on their personal self-worth. Learning to critique ideas rigorously while cherishing people unconditionally is the cornerstone of mature collaboration.",
        "objs": [
            "Distinguish between evaluating an objective work output versus attacking personal identity",
            "Apply the 'I-Statement Feedback' protocol: Describe Observation, Impact, and Collaborative Solution",
            "Receive feedback without defensiveness using the 'Curious Inquiry' mindset instead of instant justification",
            "Establish a team 'Critique Charter' at the start of any multi-week group assignment"
        ],
        "scenario": "In a Class 8 Social Science group project on Indian Heritage, Kabir submitted a presentation slide covered in 400 words of tiny, unreadable yellow text. His teammate Meera blurted: 'Kabir, this is awful! You always make such ugly, lazy slides!' Kabir felt deeply insulted, slammed his notebook shut, and refused to talk to the group for a week.",
        "expl": "When someone says 'Your work is lazy', your brain hears 'YOU are a bad person.' That triggers a defensive emotional fortress. In professional design studios and engineering teams, people rip ideas apart every single day—and then go out for lunch as best friends! Why? Because they separate the IDEA on the table from the HUMAN BEING in the chair. You can love your teammate while recognizing that yellow text on a white slide is unreadable.",
        "steps": [
            "Put the Work 'On the Table': Mentally visualize the slide, essay, or poster as an object sitting in the center of the table. You and your teammate are standing side-by-side looking at it together, rather than standing across from each other pointing fingers.",
            "Ban Identity Labels: Never use words like 'lazy', 'careless', 'dumb', 'always', or 'never'.",
            "Deploy the 3-Part Constructive Critique Formula: 1. Objective Fact ('On slide 3, there are 400 words in 12pt yellow font'), 2. Practical Impact ('From the back of the classroom, the audience won't be able to read it'), 3. Collaborative Upgrade ('What if we summarize this into 3 bullet points with a bold photograph?').",
            "The Receiving Rule: When someone critiques your work, do not explain or defend for 10 seconds. Say: 'Tell me more about what isn't working for you.'",
            "Celebrate Improvements: When a teammate updates the work based on feedback, praise the result enthusiastically: 'That looks ten times cleaner, fantastic job!'"
        ],
        "example": {
            "title": "Meera & Kabir's Collaborative Evolution",
            "scenario": "Meera re-approaches Kabir using the constructive critique formula.",
            "steps": [
                "Apologizes for her initial harsh wording: 'I am sorry Kabir, I spoke out of stress and was disrespectful.'",
                "Puts the slide 'on the table': 'Let's look at slide 3 together. We have so much great research here, but the yellow font blends into the background.'",
                "Suggests an upgrade: 'Can we break your research into 3 clear headings with a high-res photo of the temple?'",
                "Kabir relaxes immediately: 'Good point, yellow is hard to see. I will change it to black text with white backing.'",
                "The group earns an A+ for both visual design and content."
            ],
            "takeaway": "Critiquing the work objectively while respecting the person transforms friction into award-winning teamwork."
        },
        "mistakes": [
            ("Delivering vague, passive-aggressive remarks: 'Well, some of us actually care about our grades.'", "Sarcasm poisons team psychological safety; communicate specific factual observations directly and kindly."),
            ("Taking every editing suggestion as an insult to your personal intelligence.", "Your work is an evolving craft, not your personal soul; feedback is free coaching that makes your work shine.")
        ],
        "checklist": [
            "Am I talking about the specific piece of work rather than the person's character?",
            "Did I avoid toxic generalizations like 'You always' or 'You never'?",
            "Did I state the objective fact, the practical impact, and a constructive upgrade?",
            "When receiving feedback, did I listen without interrupting or making excuses?",
            "Did we establish a respectful team critique charter before starting?"
        ],
        "prompt": "How does imagining the project sitting physically between you and your teammate help you solve problems together without hurting feelings?",
        "takeaway": "Tough on problems, tender on people: separating ideas from identity makes creative teams unstoppable.",
        "vis1": {"title": "The 'Work on the Table' Mental Model", "caption": "Bad: Person vs Person (Finger-pointing) <---> Good: Both Partners Side-by-Side examining the Work on the Table."},
        "vis2": {"title": "The 3-Part Critique Formula", "caption": "1. Objective Fact (What is seen) -> 2. Practical Impact (Why it matters) -> 3. Actionable Upgrade (Collaborative fix)."},
        "act": {
            "title": "The Peer Editing Lab & Critique Protocol",
            "obj": "Review a classmate's draft essay or presentation slide and write 2 structured, constructive critiques using the 3-part formula.",
            "steps": [
                "Swap a recent essay draft, presentation slide, or lab report with a peer.",
                "Read the peer's work completely without writing any comments first.",
                "Identify 1 element that works brilliantly and state why.",
                "Identify 1 element that needs improvement and write a 3-part critique (Fact, Impact, Upgrade).",
                "Meet in person to discuss your feedback using the 'Side-by-Side' physical posture."
            ],
            "output": "A peer review sheet containing documented positive reinforcement and a 3-part constructive upgrade suggestion."
        },
        "guided": {
            "context": "Your group partner writes an introductory paragraph for your history report that is full of grammatical mistakes and run-on sentences.",
            "optimal": "Sit together and say: 'You gathered fantastic historical points here. Let us read these two long sentences aloud so we can break them into punchy, clear lines for the judges.'",
            "opt_reason": "Validates the underlying knowledge while offering collaborative, non-judgmental editorial improvement.",
            "non1": "Rewrite the whole paragraph behind their back without telling them.",
            "non1_reason": "Breeds resentment and denies your teammate the opportunity to learn and contribute.",
            "non2": "Post a screenshot of their bad grammar in the school group chat to humiliate them.",
            "non2_reason": "Cruel cyber-bullying that destroys team trust and violates basic ethics.",
            "takeaway": "Great teammates coach each other to greatness; they don't humiliate or bypass each other."
        },
        "indep": {
            "context": "Why do Pixar and Google engineering teams institute 'Braintrust' meetings where brutal candid feedback is given with zero hurt feelings?",
            "prompt": "Examine Amy Edmondson's research on 'Psychological Safety' and radical candor in high-performing teams.",
            "rubric": "Comprehensive analysis of psychological safety, non-defensive feedback cultures, and decoupling ego from intellectual work."
        },
        "quiz": {
            "q": "What is the key principle of separating the idea from the person when giving feedback?",
            "opt_correct": "Focusing critique strictly on the tangible work output and its practical impact, while treating the teammate with unconditional respect.",
            "opt_w1": "Never giving any criticism under any circumstances so nobody ever feels sad.",
            "opt_w2": "Writing anonymous mean notes and slipping them into their locker.",
            "opt_w3": "Telling them their ideas are amazing even when they are completely wrong."
        },
        "rubric": {
            "task": "Deliver constructive peer feedback using the 3-part formula, maintain psychological safety, and receive critiques non-defensively.",
            "mastery": "Applies 'Work on the Table' framing, avoids identity labeling, formulates actionable upgrades, and demonstrates gracious receptive listening.",
            "c1": "Objective Factual Feedback Formulation",
            "c2": "Actionable Collaborative Upgrade Proposals",
            "c3": "Non-Defensive Receptive Listening"
        },
        "refs": [
            "How does Ed Catmull describe the mechanics of Pixar's famous 'Braintrust' feedback culture in 'Creativity, Inc.'?",
            "What is Kim Scott's 'Radical Candor' framework (Caring Personally while Challenging Directly)?",
            "How does Marshall Rosenberg's Nonviolent Communication (NVC) distinguish between observations and moralistic judgments?",
            "Why is psychological safety considered by Google's Project Aristotle to be the #1 predictor of team success?"
        ]
    },

    # MONTH 3: Practical Financial Foundations & Banking Literacy
    {
        "month": 3, "theme": "Personal Banking, Teen Savings & Safe Transactions", "seq": 1,
        "cat": "life_money_management", "cat_label": "Money Management & Financial Literacy",
        "title": "Understanding Bank Accounts: Passbooks, Cheques, Debit Cards, and Net Banking",
        "why": "By Class 8 (age 13-14), students can open and operate minor savings bank accounts under RBI guidelines. Financial ignorance leads to vulnerability, account misuse, or falling prey to banking scams. Understanding how modern banks work, what passbooks record, and how debit cards function is a fundamental prerequisite for financial adulthood.",
        "objs": [
            "Explain the operational anatomy of a Savings Bank Account (Account Number, IFSC Code, Passbook, Balance)",
            "Identify the parts of a physical bank cheque (Payee, Date, Amount in words/figures, Account Payee crossing, Signature line)",
            "Differentiate between Debit Cards (spending your own deposited money) and Credit Cards (borrowing money at high interest)",
            "Articulate the golden security rules of PINs, CVVs, and Net Banking credentials"
        ],
        "scenario": "Aditya received a cash prize of Rs 3,000 for winning a state debate competition. He kept the currency notes stuffed under his mattress for six months. When he finally checked, two notes had been torn and nibbled by silverfish insects. His father asked: 'Why didn't you deposit it into your bank savings account?' Aditya admitted: 'I don't know how a bank account actually works.'",
        "expl": "A bank is not just a big concrete building; it is a secure, digital vault for your money! When you leave cash at home, it earns zero interest, risks theft or damage, and loses purchasing power to inflation. In a Savings Bank Account, your money is legally protected, earns quarterly interest, and can be tracked down to the exact paisa through a passbook or mobile app statement. Understanding account numbers, IFSC routing codes, cheques, and debit cards empowers you to manage your own money like a responsible young adult.",
        "steps": [
            "Deconstruct Account Identifiers: Your Account Number is your unique personal account locker; your bank's IFSC (Indian Financial System Code) is an 11-character code that tells other banks exactly which branch holds your account.",
            "Decode the Passbook Columns: 1. Date of transaction, 2. Particulars/Description (who paid or who was paid), 3. Withdrawals (Debit/Dr - money leaving), 4. Deposits (Credit/Cr - money entering), 5. Balance (total remaining).",
            "Master the Anatomy of a Cheque: Write the Payee name clearly; write the amount in figures with '/-' at the end; write the amount in words ending with 'Only'; write today's date; cross the top left corner with two parallel lines and write 'A/C PAYEE' so only the recipient's bank can deposit it; sign matching your bank signature.",
            "Understand Debit Cards: A debit card is a plastic key that instantly pulls money from YOUR existing bank balance. The 16-digit card number identifies the card, the Expiry Date validates it, and the 3-digit CVV on the back authorizes online transactions.",
            "The Sacred PIN Rule: Your 4-digit ATM PIN and UPI PIN are TOP SECRET passwords. Never share them with friends, never write them on the card, and never tell a caller claiming to be from the bank."
        ],
        "example": {
            "title": "Aditya Opens a Minor Savings Account",
            "scenario": "Aditya and his mother visit a public sector bank to open a youth savings account.",
            "steps": [
                "Fills out the KYC (Know Your Customer) form with his Aadhaar, school ID, and passport photos.",
                "Deposits his Rs 3,000 debate winnings at the cash counter.",
                "Receives his first Passbook and watches the teller print: 'Dep Cash: +3000.00 | Bal: 3000.00'.",
                "Receives a crossed Account Payee cheque from his school for a Rs 1,500 scholarship and deposits it in the bank drop-box.",
                "Observes his balance grow to Rs 4,500 plus quarterly interest of Rs 35.",
                "Learns that his money is safe, growing, and completely trackable."
            ],
            "takeaway": "A formal savings account protects your earnings, pays interest, and provides a clear audit trail of every rupee."
        },
        "mistakes": [
            ("Writing your ATM PIN on the back of your debit card with a marker.", "If you lose the card, anyone who finds it can instantly withdraw all your money from an ATM; memorize your PIN and never write it down."),
            ("Leaving blank spaces on a bank cheque after writing the name or amount.", "Fraudsters can add extra names or zeros; always draw a firm horizontal line through unused blank spaces on a cheque.")
        ],
        "checklist": [
            "Do I know where my Account Number and 11-digit IFSC code are located?",
            "Can I read all 5 columns of a bank passbook (Date, Particulars, Debit, Credit, Balance)?",
            "Do I know how to cross a cheque with 'A/C PAYEE' to prevent fraud?",
            "Do I understand that a Debit Card spends my money, not the bank's money?",
            "Is my ATM PIN memorized and never shared with anyone?"
        ],
        "prompt": "Why do banks pay you interest just for keeping your money in a savings account?",
        "takeaway": "Deposit, record, protect: master the tools of modern banking to build unshakeable financial sovereignty.",
        "vis1": {"title": "The 5 Columns of a Bank Passbook", "caption": "Date | Transaction Particulars | Debit (-) | Credit (+) | Running Balance. Always audit your balance!"},
        "vis2": {"title": "The Anatomy of a Safe Cheque", "caption": "Double Crossing ('A/C Payee') -> Payee Name -> Amount in Words ('Only') -> Amount in Figures ('/-') -> Authorized Signature."},
        "act": {
            "title": "The Specimen Banking Documents Lab",
            "obj": "Fill out a specimen bank deposit slip and practice writing a mock crossed cheque safely.",
            "steps": [
                "Obtain a sample bank deposit slip and dummy cheque leaf (from educational printable or bank specimen).",
                "Fill in Account Number, Date, and Branch IFSC.",
                "Write out a specimen cheque for Rs 2,500 to a friend with 'A/C Payee' parallel crossing.",
                "Ensure no trailing whitespace exists after the name or amount.",
                "Review the finished cheque against the anti-fraud security checklist."
            ],
            "output": "A correctly completed specimen deposit slip and a safely formatted, crossed specimen cheque leaf."
        },
        "guided": {
            "context": "A man in a sharp suit calls your phone claiming to be the Bank Manager. He says your debit card will be blocked in 10 minutes unless you read him the 3-digit CVV number on the back.",
            "optimal": "Hang up the phone immediately; tell your parents and report the fraudulent number to the National Cyber Crime portal (1930).",
            "opt_reason": "Real banks explicitly state that they will NEVER ask for CVV, PIN, or OTP over the phone.",
            "non1": "Read him the CVV quickly because you don't want your card blocked.",
            "non1_reason": "Allows the scammer to drain your bank account within seconds.",
            "non2": "Argue with him for 30 minutes and give him a fake credit card number.",
            "non2_reason": "Wastes time and exposes your personal details to professional criminals.",
            "takeaway": "Banks never ask for CVVs or PINs; any caller demanding them is 100% a criminal."
        },
        "indep": {
            "context": "How does the Reserve Bank of India (RBI) regulate fractional reserve banking and protect depositor balances through DICGC insurance?",
            "prompt": "Analyze the systemic role of central bank regulatory frameworks in maintaining public trust in commercial banking.",
            "rubric": "Detailed explanation of DICGC insurance limits, statutory liquidity ratios, CRR, and prudential banking supervision."
        },
        "quiz": {
            "q": "What does drawing two parallel lines with 'A/C PAYEE' across the top left corner of a bank cheque accomplish?",
            "opt_correct": "It ensures the cheque cannot be encashed for physical currency over the counter; it must be deposited directly into the payee's bank account.",
            "opt_w1": "It cancels the cheque permanently so it cannot be used.",
            "opt_w2": "It gives the recipient double the amount of money.",
            "opt_w3": "It instructs the post office to deliver the cheque faster."
        },
        "rubric": {
            "task": "Explain bank account architecture, audit a passbook statement, fill out a crossed cheque safely, and demonstrate airtight PIN/CVV security protocols.",
            "mastery": "Accurately interprets passbook entries, correctly writes and crosses cheques without security loopholes, and articulates anti-phishing bank protocols.",
            "c1": "Bank Account Mechanics & Passbook Literacy",
            "c2": "Cheque Authoring & Anti-Fraud Crossing Rigor",
            "c3": "Credential Protection & Cybersecurity Vigilance"
        },
        "refs": [
            "What are the official RBI guidelines regarding minor savings bank accounts for children above 10 years of age?",
            "How does the Unified Payments Interface (UPI) interact with underlying bank account clearing houses (NPCI)?",
            "What is the difference between NEFT, RTGS, and IMPS electronic money transfers?",
            "Why is the CVV (Card Verification Value) never stored on a merchant's server after a transaction?"
        ]
    },
    {
        "month": 3, "theme": "Personal Banking, Teen Savings & Safe Transactions", "seq": 2,
        "cat": "life_money_management", "cat_label": "Money Management & Financial Literacy",
        "title": "The Rule of 72 and Compound Interest: Why Starting to Save in Class 8 Matters",
        "why": "Most teenagers believe saving money is something only adults with full-time jobs need to worry about. Understanding the mathematical superpower of compound interest and the mental model of the 'Rule of 72' reveals that TIME—not high income—is the greatest generator of financial freedom.",
        "objs": [
            "Contrast Simple Interest (linear growth on principal) with Compound Interest (exponential growth on principal plus accumulated interest)",
            "Apply the mental math 'Rule of 72' to instantly calculate how many years it takes an investment to double at any interest rate",
            "Calculate the devastating opportunity cost of waiting until age 25 versus starting to invest small sums at age 14",
            "Design a personal 'Save 20% First' habit from festival cash gifts or family allowances"
        ],
        "scenario": "Two cousins, Aryan (age 14) and Vikram (age 22), receive cash gifts from their grandparents. Vikram says: 'There's no point in saving Rs 500 a month in Class 8; that's pocket change. I'll start saving when I make Rs 50,000 a month after college.' Aryan decides to save his Rs 500 every single month in a compound-growth fund.",
        "expl": "Albert Einstein reportedly called compound interest the 'Eighth Wonder of the World: he who understands it, earns it; he who doesn't, pays it!' When you earn simple interest, only your original money works. But with compound interest, your money earns interest, and then that interest earns interest, creating a snowball that grows exponentially over decades. Because an adolescent has 40 to 50 years of investment runway ahead of them, a single rupee saved in Class 8 can grow into 30 to 50 rupees by adulthood. The mental math shortcut 'Rule of 72' tells you: divide 72 by the annual return rate, and you get the exact number of years it takes for your money to DOUBLE!",
        "steps": [
            "Understand the Doubling Formula: Rule of 72 = 72 / Annual Interest Rate. If a fund yields 12% annually, 72 / 12 = 6 years to double your money!",
            "Trace the Snowball: At 12% return, Rs 10,000 doubles to Rs 20,000 in 6 years (age 20). In 12 years (age 26), it doubles again to Rs 40,000. In 18 years (age 32), Rs 80,000. In 36 years (age 50), Rs 6,40,000—without ever adding another paisa!",
            "Contrast with Simple Interest: Simple interest on Rs 10,000 at 10% gives Rs 1,000 every year forever (linear). Compound interest creates an accelerating hockey-stick curve.",
            "Recognize the Cost of Delay: Waiting 10 years to start saving cuts your final compound wealth by over 60%, because you lose the final doubling cycles where the numbers are massive.",
            "Adopt the 'Pay Yourself First' Law: Whenever you receive cash—birthday gifts, festival gifts, chores—automatically put 20% into savings BEFORE spending a single rupee on snacks or games.",
            "Let the Snowball Roll: Never interrupt compounding unnecessarily by dipping into long-term savings for temporary impulse buys."
        ],
        "example": {
            "title": "Aryan vs Vikram: The 30-Year Compounding Race",
            "scenario": "Comparing Aryan (starts at 14) and Vikram (waits until 24).",
            "steps": [
                "Aryan invests Rs 1,000 a month from age 14 to 24 (invests Rs 1,20,000 total), then stops adding money completely.",
                "Vikram invests Rs 1,000 a month from age 24 to 54 (invests Rs 3,60,000 total—three times more cash!).",
                "At an 11% average market compounding rate, by age 54, Aryan's early nest egg has grown to over Rs 85 Lakhs!",
                "Vikram's nest egg reaches only Rs 28 Lakhs, despite investing three times as much of his hard-earned money.",
                "Aryan wins by Rs 57 Lakhs simply because his money had 10 extra years to compound."
            ],
            "takeaway": "Time in the market beats timing the market: starting small in Class 8 yields monumental wealth over a lifetime."
        },
        "mistakes": [
            ("Believing that saving Rs 200 or Rs 500 a month is too small to make any difference.", "In compounding, time is vastly more powerful than capital; small amounts started early crush large amounts started late."),
            ("Withdrawing compound savings to buy temporary trendy gadgets.", "Pulling money out restarts the compounding clock back at year zero, destroying decades of future growth.")
        ],
        "checklist": [
            "Can I explain the difference between linear simple interest and exponential compound interest?",
            "Can I calculate doubling time using the Rule of 72 (72 / rate = years)?",
            "Do I understand why starting in Class 8 is mathematically superior to starting at age 25?",
            "Do I practice the 'Pay Yourself First' rule by setting aside 20% of all cash gifts immediately?",
            "Am I committed to letting long-term savings compound without touching them?"
        ],
        "prompt": "If you could choose between Rs 1 Crore in cash right now, or a single 1-Rupee coin that doubles every day for 30 days, which would make you richer?",
        "takeaway": "Start early, let it roll: compound interest turns small teen savings into unshakeable future security.",
        "vis1": {"title": "Linear Simple vs Exponential Compound Growth", "caption": "Simple Interest (Flat straight line) vs Compound Interest (Rocketing exponential curve after Year 10)."},
        "vis2": {"title": "The Rule of 72 Mental Calculator", "caption": "72 / 6% = 12 Yrs to Double | 72 / 9% = 8 Yrs to Double | 72 / 12% = 6 Yrs to Double!"},
        "act": {
            "title": "The Rule of 72 & Compound Growth Simulator",
            "obj": "Calculate and chart the compound growth of Rs 5,000 over 30 years across 3 different annual interest rates (4%, 8%, 12%).",
            "steps": [
                "Draw a comparison table with columns: Year 0, Year 6, Year 12, Year 18, Year 24, Year 30.",
                "Calculate doubling cycles using the Rule of 72 for 4% (18 yrs), 8% (9 yrs), and 12% (6 yrs).",
                "Fill in the principal values across 30 years.",
                "Observe how Rs 5,000 at 12% becomes Rs 1,60,000 in 30 years (32x growth!).",
                "Write a 1-paragraph reflection on what this means for your personal pocket money habits."
            ],
            "output": "A completed multi-tier compound growth comparison graph and written financial reflection."
        },
        "guided": {
            "context": "You receive Rs 2,000 for Diwali. Your friend tells you to spend it all on limited-edition sneakers that will wear out in 8 months.",
            "optimal": "Spend Rs 1,000 on celebration and place Rs 1,000 into a locked savings/compounding account for your future self.",
            "opt_reason": "Balances immediate festive joy with the discipline of building a compounding financial foundation.",
            "non1": "Spend the entire Rs 2,000 immediately plus borrow Rs 500 from your friend.",
            "non1_reason": "Instills dangerous debt habits and leaves you with zero future assets.",
            "non2": "Burn the cash in the Diwali bonfire.",
            "non2_reason": "Insane destruction of financial resources.",
            "takeaway": "Enjoy today, but always feed your future compounding snowball."
        },
        "indep": {
            "context": "Why is Warren Buffett's net worth overwhelmingly attributed to the fact that he began investing at age 11 and maintained compounding past age 90?",
            "prompt": "Analyze Morgan Housel's 'Psychology of Money' thesis regarding time horizon as the ultimate financial lever.",
            "rubric": "Comprehensive analysis of longevity, emotional discipline during market drawdowns, and mathematical asymmetry of long-tail compounding."
        },
        "quiz": {
            "q": "Using the Rule of 72, approximately how many years will it take for an investment to double at an annual interest rate of 8%?",
            "opt_correct": "9 years (72 divided by 8).",
            "opt_w1": "8 years.",
            "opt_w2": "72 years.",
            "opt_w3": "16 years."
        },
        "rubric": {
            "task": "Explain compound interest mechanics, compute doubling periods using the Rule of 72, and construct a long-term adolescent savings plan.",
            "mastery": "Applies Rule of 72 accurately, articulates exponential growth dynamics, calculates opportunity costs of delay, and establishes savings discipline.",
            "c1": "Mathematical Compounding & Rule of 72 Mastery",
            "c2": "Opportunity Cost & Time Horizon Analysis",
            "c3": "Adolescent Savings Habit Implementation"
        },
        "refs": [
            "Why is the mathematical constant 'e' fundamentally connected to continuous compound interest in calculus?",
            "How does inflation (e.g. 6% annual rise in consumer prices) quietly eat away the purchasing power of money kept under a mattress?",
            "What is a Public Provident Fund (PPF) in India, and how does its 15-year tax-free compounding structure work?",
            "How does the concept of 'delayed gratification' in the Stanford Marshmallow Experiment predict adult financial independence?"
        ]
    },
    {
        "month": 3, "theme": "Personal Banking, Teen Savings & Safe Transactions", "seq": 3,
        "cat": "life_money_management", "cat_label": "Money Management & Financial Literacy",
        "title": "Spotting Digital Payment Frauds: Fake Payment Screenshots, QR Code Scams & Phishing",
        "why": "With UPI, digital wallets, and online gaming microtransactions everywhere, teenagers in Class 8 are top targets for cyber-fraudsters. Scammers exploit youthful excitement through fake lottery messages, social media account takeovers, and inverted QR codes designed to steal money.",
        "objs": [
            "Identify the fundamental difference between sending money (entering PIN) versus receiving money (NEVER entering PIN)",
            "Detect fraudulent 'Fake Payment' screenshot generators used by dishonest buyers in peer transactions",
            "Recognize phishing SMS/WhatsApp links masquerading as bank alerts, electricity bill warnings, or free courier deliveries",
            "Execute the immediate 3-step emergency incident response if a family member or friend falls for an online scam"
        ],
        "scenario": "Manish advertised his old bicycle for Rs 2,500 on an online classifieds site. A buyer messaged immediately: 'I am in the Army and cannot visit in person. I will pay you via UPI right now. Scan this QR code and enter your UPI PIN to claim the Rs 2,500 transfer.' Manish opened his UPI app and hovered over the scan button.",
        "expl": "In the world of digital banking, there is ONE universal, unbreakable golden rule: YOU NEVER ENTER YOUR UPI PIN TO RECEIVE MONEY! A UPI PIN is an authorization to DEDUCT money from your account. When someone asks you to scan a QR code or enter your PIN to 'receive payment' or 'claim a prize', they are literally tricking you into approving a transfer from your account to theirs! Furthermore, scammers use smartphone apps that generate convincing fake 'Transaction Successful' confirmation screens. Learning digital defense shields your family's hard-earned money from cyber-criminals.",
        "steps": [
            "The Golden Rule of UPI: You only enter your UPI PIN when YOU are sending money or checking your balance. Receiving money happens automatically in the background—zero PIN required!",
            "Beware the QR Trap: Scanning a QR code sent by a stranger is ALWAYS an instruction to PAY them, never to receive funds.",
            "Verify the Actual Bank SMS, Not a Screenshot: If someone shows you a screenshot on their phone saying 'Payment of Rs 2,500 Successful', do NOT accept it. Wait until you see the credited amount in your own banking app or official bank SMS notification.",
            "Inspect Phishing Links: Scammers send SMS messages like: 'Your bank account will be suspended today! Update KYC here: http://bit.ly/bank-kyc-verify'. Real banks never use short links (bit.ly) or unofficial domain extensions.",
            "The Emergency 1930 Protocol: If money is fraudulently deducted, dial the National Cyber Crime Helpline '1930' within the first 2 hours (the 'Golden Hour') to freeze the funds before the scammer can withdraw them.",
            "Report and Block: Block the phone number and report the fraudulent UPI ID directly inside the payment app."
        ],
        "example": {
            "title": "Manish Dodges the QR Scam",
            "scenario": "Manish spots the scammer's trickery before losing his money.",
            "steps": [
                "Notices the buyer insists on sending a QR code to 'receive funds'.",
                "Remembers the Golden Rule: 'Receiving money never requires a PIN!'",
                "Inspects the QR text and sees small print: 'Paying Rs 2,500 to Merchant Army_Canteen'.",
                "Realizes scanning it would have deducted Rs 2,500 from his father's account.",
                "Messages back: 'I only accept cash in person or direct bank transfer without QR codes.'",
                "The scammer deletes the chat and vanishes immediately.",
                "Manish reports the scammer's profile on the classifieds portal."
            ],
            "takeaway": "Remembering that receiving money NEVER requires entering a PIN prevents 95% of digital UPI fraud."
        },
        "mistakes": [
            ("Entering your UPI PIN because someone claims it is a 'Security Verification to unblock your reward.'", "There is no such thing as an unblocking verification PIN; any prompt asking for your PIN will deduct money from your account."),
            ("Clicking links in panic messages claiming 'Your electricity / SIM card will be disconnected tonight.'", "Utility companies never send urgent disconnection threats with private WhatsApp numbers or Bitly links; always check via official portals.")
        ],
        "checklist": [
            "Do I understand that receiving money NEVER requires entering my UPI PIN?",
            "Do I know that scanning a QR code is strictly an action to send money?",
            "Do I verify credits by checking my own bank balance rather than trusting a buyer's screenshot?",
            "Do I avoid clicking shortened or suspicious links in unexpected SMS messages?",
            "Do I have the National Cyber Fraud helpline number (1930) saved in my phone?"
        ],
        "prompt": "Why do cyber-scammers rely on artificial urgency ('Act in 10 minutes or your account will be deleted!') to trick intelligent people?",
        "takeaway": "Never enter your PIN to receive money: calm skepticism is your strongest digital financial shield.",
        "vis1": {"title": "The Golden Rule of UPI Security", "caption": "Sending Money = Enter UPI PIN | Receiving Money = ZERO PIN REQUIRED! Never enter a PIN to receive cash."},
        "vis2": {"title": "Anatomy of a Phishing SMS", "caption": "Urgent Threat ('Account Blocked!') + Shortened Suspicious URL + Demands KYC Update = 100% Phishing Trap."},
        "act": {
            "title": "The Digital Cyber-Defense Forensic Audit",
            "obj": "Examine 3 simulated transaction scenarios and identify deceptive fraud markers in fake screenshots and phishing messages.",
            "steps": [
                "Review 3 case studies of real cyber-scams: a QR code receive-money scam, a fake payment screenshot, and an urgent KYC phishing SMS.",
                "Circle every red flag on the printed scenarios (e.g. mismatched fonts, generic greetings, unofficial URLs, urgency triggers).",
                "Draft an educational 1-page 'Cyber Defense Cheat Sheet' for your family refrigerator.",
                "Share the cheat sheet with your parents and grandparents, explaining the 'Never enter PIN to receive money' rule."
            ],
            "output": "A forensic red-flag analysis sheet and an authored Family Cyber-Security Refrigerator Guide."
        },
        "guided": {
            "context": "You receive a message from a classmate's hacked Instagram account: 'Hey, I'm stuck in an emergency and need Rs 1,000 urgently on UPI, please send it to this number right now!'",
            "optimal": "Do not send money; call your classmate directly on their regular cellular phone number to verbally verify the emergency.",
            "opt_reason": "Account takeovers are common; verbal verification stops fraudsters from exploiting friendship trust.",
            "non1": "Transfer the Rs 1,000 immediately without asking questions.",
            "non1_reason": "Transfers your money directly to a criminal who hijacked your friend's account.",
            "non2": "Insult the account and post about it publicly.",
            "non2_reason": "Unhelpful drama that fails to verify if your friend actually needs help or has been hacked.",
            "takeaway": "Always verify unexpected emergency money requests through a direct, spoken phone call."
        },
        "indep": {
            "context": "How do social engineering attacks exploit behavioral cognitive biases (authority, scarcity, urgency, and fear) rather than software hacking?",
            "prompt": "Evaluate psychological manipulation techniques used in modern phishing architectures and behavioral countermeasures.",
            "rubric": "Comprehensive analysis of Cialdini's influence principles in cyber-attacks, amygdala hijack under panic, and organizational security training."
        },
        "quiz": {
            "q": "Under what circumstance should you enter your 4-digit or 6-digit UPI PIN when someone is paying money into your account?",
            "opt_correct": "NEVER under any circumstances. You never need to enter a PIN to receive money on UPI.",
            "opt_w1": "Only if the sender is an official government or military officer.",
            "opt_w2": "Only if the amount is greater than Rs 10,000.",
            "opt_w3": "Only if you scan a special gold-colored refund QR code."
        },
        "rubric": {
            "task": "Identify cyber-fraud tactics, articulate the UPI PIN rule, detect phishing cues, and demonstrate emergency response protocols.",
            "mastery": "Flawlessly identifies scam triggers, enforces the zero-PIN rule for receiving funds, spots fake transaction artifacts, and details the 1930 reporting protocol.",
            "c1": "UPI Architecture & Transaction Rule Mastery",
            "c2": "Forensic Phishing & Social Engineering Detection",
            "c3": "Emergency Incident Response & Escalation Protocol"
        },
        "refs": [
            "How does the National Cyber Crime Reporting Portal (cybercrime.gov.in) and the 1930 helpline freeze stolen funds in transit?",
            "What is 'SIM Swapping', and how do telecom two-factor authentication safeguards protect bank accounts?",
            "Why do legitimate banks use registered alphanumeric sender IDs (e.g. VM-HDFCBK) rather than ordinary 10-digit mobile numbers?",
            "How does the Reserve Bank of India's 'Limited Liability of Customers in Unauthorised Electronic Banking Transactions' circular protect consumers?"
        ]
    },

    # MONTH 4: Physical Safety, First Aid & Substance Awareness
    {
        "month": 4, "theme": "Emergency Triage, Heat Emergencies & Resisting Peer Risk", "seq": 1,
        "cat": "life_safety_health", "cat_label": "Safety, Health & Well-being",
        "title": "Triage and First Aid for Fractures, Sprains, and Concussions on the Sports Field",
        "why": "Class 8 students participate vigorously in competitive sports like football, cricket, basketball, and athletics. Serious injuries—broken bones, ligament tears, and brain concussions—happen suddenly. Panicked handling (such as trying to yank a broken arm straight or letting a dazed player return to the field) can cause lifelong paralysis or brain trauma. Knowing field triage saves teammates from permanent damage.",
        "objs": [
            "Distinguish between a sprain (ligament damage), a closed fracture, and an open compound fracture",
            "Apply the modern RICE / PRICE protocol for soft-tissue sprains and joint swellings",
            "Immobilize a suspected limb fracture using makeshift rigid splints without manipulating broken bone fragments",
            "Identify the danger signs of a concussion (head injury) and enforce the mandatory 'When in Doubt, Sit Out' protocol"
        ],
        "scenario": "During an inter-house football match, Sahil jumped for a header, collided heavily with another player, and landed awkwardly. His right wrist was visibly deformed at an unnatural angle, and he was dazed, asking repeatedly: 'What score is it?' Two teammates tried to pull his arm to 'pop it back in' while the coach was fetching water.",
        "expl": "In an athletic emergency, poor first aid does more damage than the initial injury! Never attempt to straighten, yank, or force a deformed limb back into place; doing so can sever major arteries and lacerate nerves. A fracture requires rigid IMMOBILIZATION exactly in the position found until paramedics arrive. Furthermore, any blow to the head that causes confusion, dizziness, memory loss, or nausea is a CONCUSSION—a bruised brain! Letting a concussed athlete continue playing risks 'Second Impact Syndrome', which can be fatal. Sports heroes protect their teammates through calm, disciplined triage.",
        "steps": [
            "Scene Safety & Stop the Game: Shout firmly: 'Stop play! Medical injury on the field!' Wave to officials and summon the school nurse or physical education instructor immediately.",
            "Do Not Move a Deformed Limb: If an arm or leg looks crooked, swollen, or misshapen, DO NOT try to straighten it. Support it gently with folded jackets in the exact position it is resting.",
            "Check Circulation (PMS): Check Pulse, Motor function (can they gently wiggle fingers/toes?), and Sensation (can they feel you touching their fingertips?).",
            "Apply the PRICE Protocol for Sprains: Protect the joint, Rest the limb, Ice wrapped in cloth for 15-20 minutes (never ice directly on skin), Compress gently with an elastic bandage, Elevate above heart level if comfortable.",
            "Splinting Fractures: If transport is required, immobilize the joint ABOVE and the joint BELOW the fracture using a flat wooden board, rolled magazine, or umbrella tied loosely with cloth strips.",
            "Concussion Screen (Red Flags): Check for: 1. Loss of consciousness, 2. Repeating questions / amnesia, 3. Unequal pupil sizes, 4. Vomiting or dizziness. If ANY of these occur, they are strictly forbidden from returning to play."
        ],
        "example": {
            "title": "Sahil's Emergency Field Triage",
            "scenario": "Teammates manage Sahil's wrist fracture and head impact safely.",
            "steps": [
                "Teammate Varun steps between Sahil and the boys trying to pull his wrist: 'Stop! Do not touch his arm, it might be a broken bone!'",
                "Places a folded tracksuit under Sahil's arm to keep it completely still.",
                "Notices Sahil repeating 'What score is it?' and recognizes a concussion.",
                "Insists Sahil remain seated on the turf and does not allow him to walk.",
                "The school doctor arrives with a splint and praises Varun's intervention, noting that pulling the arm would have ruptured the radial artery.",
                "Sahil receives surgery, heals cleanly, and returns to sports next season."
            ],
            "takeaway": "Never pull a broken bone, and never ignore head daze: disciplined immobilization and concussion vigilance protect teammates' lives."
        },
        "mistakes": [
            ("Trying to 'pull' or 'reset' a deformed arm or dislocated shoulder on the sports field.", "Bone fragments have razor-sharp edges; pulling them blindly can permanently sever radial nerves and lacerate blood vessels."),
            ("Allowing a player who 'got their bell rung' to re-enter the game because they say 'I'm fine.'", "Concussed brains have impaired judgment; an athlete with head trauma must never return to the field on the same day.")
        ],
        "checklist": [
            "Did I stop play immediately and summon adult medical personnel?",
            "Did I keep the injured limb strictly in the position found without pulling?",
            "Did I apply cloth-wrapped ice (not bare ice) for soft-tissue swelling?",
            "Did I check for concussion red flags (amnesia, dizziness, nausea, unequal pupils)?",
            "Did I enforce the 'When in Doubt, Sit Out' head injury protocol?"
        ],
        "prompt": "Why is saying 'Tough it out and get back in the game' dangerous and unscientific when someone has sustained a blow to the head?",
        "takeaway": "Immobilize the break, bench the concussion: true athletic leadership prioritizes teammate health over game scores.",
        "vis1": {"title": "The PRICE Soft-Tissue Protocol", "caption": "Protect (Brace) -> Rest (No weight) -> Ice (Cloth-wrapped 15m) -> Compress (Gentle wrap) -> Elevate (Above heart)."},
        "vis2": {"title": "Concussion Red-Flag Checklist", "caption": "Confusion / Memory Loop | Severe Headache | Nausea / Vomiting | Dizziness. ANY flag = Mandatory Sit-Out!"},
        "act": {
            "title": "The Field Splinting & Concussion Triage Simulation",
            "obj": "Demonstrate the safe anatomical splinting of a simulated forearm fracture and conduct a 5-question concussion screening test.",
            "steps": [
                "Pair with a partner who acts as an injured basketball player with a suspected forearm fracture.",
                "Use a rolled newspaper, cardboard sheet, or flat ruler as a makeshift splint.",
                "Secure the splint above and below the wrist using 3 cloth bandanas without compressing circulation.",
                "Verify finger pulse and sensory feeling after splinting.",
                "Conduct the Maddocks Concussion Scorecard: ask venue, opponent, current half, who scored last, and who won the last game."
            ],
            "output": "A successfully applied, stable arm splint evaluated for circulation safety and a completed Concussion Maddocks Scorecard."
        },
        "guided": {
            "context": "During cricket practice, the batsman gets struck hard on the helmet by a fast bouncer. He stumbles, takes off his helmet, smiles, and says: 'I'm good, let's keep playing.'",
            "optimal": "Walk over, escort him off the pitch to the bench, notify the coach, and monitor him for delayed concussion symptoms.",
            "opt_reason": "Adrenaline masks brain injury symptoms; a high-velocity helmet strike requires mandatory withdrawal and evaluation.",
            "non1": "Cheer his bravery and bowl the next ball even faster.",
            "non1_reason": "Risks catastrophic Second Impact Syndrome if struck again while brain is bruised.",
            "non2": "Dump a bucket of ice water over his head.",
            "non2_reason": "Causes physical shock without assessing neurological trauma.",
            "takeaway": "Any direct head impact on the sports pitch mandates immediate sideline evaluation."
        },
        "indep": {
            "context": "What is the neuropathology of 'Second Impact Syndrome', and why does adolescent brain physiology make teens especially vulnerable to fatal cerebral edema?",
            "prompt": "Analyze cerebrovascular autoregulation failure following premature return-to-play after sports concussions.",
            "rubric": "Detailed explanation of diffuse cerebral swelling, loss of vascular tone, intracranial pressure spikes, and youth return-to-play protocols."
        },
        "quiz": {
            "q": "What should you do if an athlete's limb appears bent at an unnatural angle following a sports collision?",
            "opt_correct": "Immobilize it strictly in the position found using soft support or splints; never attempt to pull or straighten the bone.",
            "opt_w1": "Pull it hard to pop the bone back into place.",
            "opt_w2": "Make the player walk on it to test their courage.",
            "opt_w3": "Apply hot deep-heat cream directly over the broken area."
        },
        "rubric": {
            "task": "Demonstrate sports field emergency triage, perform anatomical fracture splinting, apply PRICE protocols, and administer concussion screens.",
            "mastery": "Maintains strict non-manipulation of fractures, executes effective makeshift splints, verifies neurovascular circulation, and executes concussion withdrawal protocols.",
            "c1": "Fracture Immobilization & Circulation Verification",
            "c2": "PRICE Soft-Tissue Protocol Execution",
            "c3": "Concussion Triage & Athlete Protection Protocols"
        },
        "refs": [
            "What is the international SCAT5 (Sports Concussion Assessment Tool) protocol used by FIFA and the International Olympic Committee?",
            "How does applying ice directly to bare skin cause frostbite tissue necrosis, and why must a wet cloth barrier always be used?",
            "What are the specific signs of a basilar skull fracture (e.g. Battle's sign, raccoon eyes, clear fluid leaking from ears)?",
            "Why do orthopedic surgeons require X-rays before attempting any fracture reduction?"
        ]
    },
    {
        "month": 4, "theme": "Emergency Triage, Heat Emergencies & Resisting Peer Risk", "seq": 2,
        "cat": "life_safety_health", "cat_label": "Safety, Health & Well-being",
        "title": "Heat Exhaustion vs Heat Stroke: Prevention, Emergency Hydration, and Cooling Protocols",
        "why": "During Indian summer sports tournaments and school sports days, ambient temperatures frequently exceed 42°C with high humidity. Heat exhaustion can escalate within 15 minutes into heat stroke—a life-threatening medical emergency where internal core temperature exceeds 40°C, causing brain swelling and organ shutdown. Knowing the critical boundary line and emergency immersion cooling saves lives.",
        "objs": [
            "Differentiate between Heat Exhaustion (heavy sweating, cool clammy skin, nausea) and Heat Stroke (hot dry/sweaty skin, confusion, loss of consciousness)",
            "Execute the 'Rapid Evaporative Cooling' emergency protocol: shade, fan, ice water on neck/armpits/groin",
            "Prepare a scientifically balanced Oral Rehydration Salt (ORS) solution according to WHO formulations",
            "Implement a structured hydration timeline before, during, and after outdoor athletic training"
        ],
        "scenario": "During an afternoon Class 8 cricket tournament in May, Dev was fielding in the blazing sun for two hours. He felt dizzy, sat down on the boundary rope, and started slurring his speech. His skin felt burning hot and dry to the touch, and when asked where he was, he mumbled: 'I need to find my bicycle.'",
        "expl": "Your body regulates heat like a car radiator: when you overheat, you sweat, and evaporation cools your blood. In Heat Exhaustion, your radiator is struggling—you are sweating profusely, pale, dizzy, and dehydrated. But when your body crosses the boundary into HEAT STROKE, your internal thermostat completely fails! Core temperature spikes above 40°C, cooking brain neurons like an egg. When an athlete becomes confused, delirious, or collapses with burning skin, DO NOT give them liquids to swallow (they might choke!). Call an ambulance immediately and chill them aggressively with cold water and ice packs on their major arteries.",
        "steps": [
            "Spot the Tipping Point: If the person is merely sweating, tired, and nauseous = Heat Exhaustion. If they show CONFUSION, slurred speech, delirium, seizures, or unconsciousness = MEDICAL EMERGENCY: HEAT STROKE!",
            "Call 108 / 112 Immediately: For suspected heat stroke, dispatch emergency paramedics without delaying a single minute.",
            "Move to Deep Shade: Carry or escort the victim to a cool, air-conditioned room or dense tree shade immediately.",
            "Strip Excess Clothing: Unbutton shirts, remove heavy socks, shoes, pads, and helmets to expose skin to air circulation.",
            "Aggressive Cooling: Douse the body with cold water or cover with wet towels while fanning vigorously. Apply ice bags or cold cans to the high-blood-flow zones: the neck, armpits, and groin.",
            "The Hydration Rule: If the person is conscious, alert, and can swallow easily, give slow sips of cool water or WHO-ORS. NEVER pour liquids into the mouth of a drowsy or unconscious person!"
        ],
        "example": {
            "title": "Dev's Heat Stroke Rescue",
            "scenario": "Teammates save Dev from fatal heat hyperthermia.",
            "steps": [
                "Teammates notice Dev's confusion, hot dry skin, and slurred speech.",
                "Instantly recognize Heat Stroke (not simple fatigue).",
                "Shout for the coach to dial 108 for an ambulance.",
                "Carry Dev into the air-conditioned pavilion changing room.",
                "Remove his cricket pads, jersey, and socks.",
                "Wrap his neck and armpits with ice-cold wet towels and turn two fans directly on his skin.",
                "His core temperature stabilizes until paramedics arrive, preventing permanent neurological injury."
            ],
            "takeaway": "Confusion plus burning heat equals Heat Stroke: rapid aggressive external cooling saves lives before ambulances arrive."
        },
        "mistakes": [
            ("Forcing water down the throat of a confused or unconscious heat victim.", "Impaired consciousness paralyzes the gag reflex; liquid enters the lungs, causing asphyxiation or fatal pneumonia."),
            ("Assuming someone isn't having heat stroke because they are still sweating.", "Classic exertional heat stroke in athletes often presents with heavy sweat combined with acute neurological delirium; any confusion in extreme heat is an emergency.")
        ],
        "checklist": [
            "Did I evaluate mental status (alert vs confused/delirious)?",
            "Was an ambulance summoned immediately for heat stroke symptoms?",
            "Was the patient moved to deep shade and stripped of heavy athletic gear?",
            "Were ice or cold wet towels placed on the neck, armpits, and groin?",
            "Was oral hydration restricted strictly to fully conscious, alert individuals?"
        ],
        "prompt": "Why are ice packs placed specifically on the neck, armpits, and groin rather than on the feet or hands during a heat stroke emergency?",
        "takeaway": "Recognize the confusion, cool the core: knowing the difference between exhaustion and heat stroke saves teammates' lives.",
        "vis1": {"title": "Heat Exhaustion vs Heat Stroke Diagnosis", "caption": "Exhaustion: Sweating heavily, pale, clammy, alert <---> STROKE: Burning hot skin, DELIRIUM, confusion, red alert! Call 108."},
        "vis2": {"title": "The 3 Major Artery Cooling Zones", "caption": "Apply cold packs directly to: Carotid (Neck), Axillary (Armpits), and Femoral (Groin) for rapid core temperature drop."},
        "act": {
            "title": "The Summer Athletic Hydration Plan & ORS Lab",
            "obj": "Formulate a sports hydration protocol for extreme heat and prepare a certified WHO Oral Rehydration Solution.",
            "steps": [
                "Measure 1 Liter of clean boiled or filtered drinking water into a pitcher.",
                "Dissolve 1 sachet of certified WHO-ORS (or homemade: 6 level teaspoons sugar + half level teaspoon salt).",
                "Taste the solution: it should taste no saltier than tears.",
                "Draft a personal training hydration schedule: 500ml 2 hours before play, 150ml every 20 minutes during play, 500ml post-game.",
                "Check your hydration status using the 8-stage urine color scale chart."
            ],
            "output": "A prepared sample liter of ORS and a personalized Summer Sports Hydration & Heat Safety Protocol."
        },
        "guided": {
            "context": "During cross-country running practice in 40°C heat, a runner collapses, vomits, and begins trembling uncontrollably with glassy eyes.",
            "optimal": "Call emergency services immediately, carry them to shade, strip excess clothing, and douse with water while fanning.",
            "opt_reason": "Tremors and collapse under extreme heat indicate central nervous system distress requiring aggressive rapid cooling.",
            "non1": "Tell them to get up and finish the last 200 meters to show mental toughness.",
            "non1_reason": "Criminal negligence that can result in immediate cardiac arrest or fatal cerebral edema.",
            "non2": "Cover them with heavy woolen blankets.",
            "non2_reason": "Insulates internal heat and accelerates organ cooking.",
            "takeaway": "Heat collapse requires instant cooling, not motivational speeches."
        },
        "indep": {
            "context": "How does extreme hyperthermia induce Systemic Inflammatory Response Syndrome (SIRS) and disseminated intravascular coagulation (DIC) at a cellular level?",
            "prompt": "Evaluate thermal denaturation of blood proteins and gastrointestinal barrier breakdown during exertional heat stroke.",
            "rubric": "Detailed explanation of cellular heat-shock proteins, endotoxin leakage from ischemic gut, cytokine storms, and multi-organ failure."
        },
        "quiz": {
            "q": "What is the critical symptom that distinguishes life-threatening Heat Stroke from ordinary Heat Exhaustion?",
            "opt_correct": "Neurological dysfunction such as confusion, slurred speech, delirium, seizures, or loss of consciousness.",
            "opt_w1": "Feeling thirsty.",
            "opt_w2": "Heavy sweating during exercise.",
            "opt_w3": "Tired leg muscles after running."
        },
        "rubric": {
            "task": "Differentiate heat illness stages, demonstrate external evaporative cooling techniques, and formulate evidence-based sports hydration plans.",
            "mastery": "Identifies neurological delirium as a heat stroke marker, executes carotid/axillary/femoral cooling protocols, and articulates safe fluid administration limits.",
            "c1": "Differential Diagnosis of Heat Exhaustion vs Stroke",
            "c2": "Rapid Core-Cooling Protocol Execution",
            "c3": "Fluid & Electrolyte Science Literacy"
        },
        "refs": [
            "What does the American College of Sports Medicine (ACSM) specify regarding Wet Bulb Globe Temperature (WBGT) thresholds for canceling youth sports?",
            "Why is cold water immersion (ice-bath tub) considered the absolute clinical gold standard for exertional heat stroke treatment?",
            "How does sodium depletion (hyponatremia) occur when athletes drink massive amounts of plain water without electrolytes?",
            "What physiological adaptations occur in the human cardiovascular system during a 14-day heat acclimatization protocol?"
        ]
    },
    {
        "month": 4, "theme": "Emergency Triage, Heat Emergencies & Resisting Peer Risk", "seq": 3,
        "cat": "life_safety_health", "cat_label": "Safety, Health & Well-being",
        "title": "The Honest Truth About Vaping and Smoking: Refusal Scripts for Extreme Peer Pressure",
        "why": "In Class 8, students encounter older peers and social circles introducing electronic cigarettes ('vapes', e-hookahs) and tobacco cigarettes. Tobacco companies market vapes with fruity candy flavors, sleek USB-like designs, and false claims that 'it's just harmless water vapor.' Equipping adolescents with neurobiological facts and unshakeable verbal refusal scripts protects them from chemical addiction.",
        "objs": [
            "Debunk the 'harmless water vapor' myth by examining the chemical composition of vape aerosol (ultra-fine heavy metal particles, formaldehyde, high-dose nicotine salts)",
            "Explain how the adolescent prefrontal cortex is uniquely vulnerable to rapid, permanent nicotine receptor rewiring",
            "Deploy 3 unshakeable, socially poised refusal scripts ('The Clear Direct', 'The Athletic Excuse', 'The Broken Record')",
            "Exit unsafe unsupervised party or bathroom settings without escalating conflict or losing face"
        ],
        "scenario": "At an older student's birthday party, three popular Class 9 students pull out a sleek, neon-colored vape that smells like sweet mango. They pass it around, laughing. One blows a cloud of smoke and thrusts the device into 13-year-old Armaan's hands: 'Take a puff, Armaan! Don't be a baby; it's just flavored water vapor, there's no smoke!' Everyone watches.",
        "expl": "Vaping companies spent billions designing devices specifically to hook teenage brains! The vapor is NOT water; it is a toxic chemical aerosol of propylene glycol, cancer-causing formaldehyde, and microscopic particles of lead, nickel, and tin that scar lung alveoli forever (a condition called 'Popcorn Lung'). Even worse, modern nicotine salts deliver a jolt of nicotine equivalent to an entire pack of 20 cigarettes in a single pod! Because your teenage brain is actively rewiring its neural pathways, nicotine rewires your dopamine circuits within weeks, causing chronic anxiety, depression, and severe addiction. Resisting peer pressure isn't about being weak; it is the ultimate test of courage and independent thinking.",
        "steps": [
            "Know the Chemical Reality: E-cigarettes contain ultra-potent liquid nicotine, volatile organic compounds, and heavy metal nanoparticles that inflame lung tissue.",
            "Recognize the Exploitation: Big Tobacco companies rely on hooking teens by age 15 because 90% of adult smokers started as adolescents. When peers vape, they aren't 'rebels'—they are unpaid corporate customers being manipulated.",
            "Deploy Script 1 (The Clear Casual): 'No thanks, not my thing.' Say it with relaxed eye contact, relaxed shoulders, and zero nervousness.",
            "Deploy Script 2 (The High-Stakes Anchor): 'I can't mess up my lungs; our football district trials are next week and my coach will bench me.' (Nobody argues with sports or health commitments).",
            "Deploy Script 3 (The Humorous Deflector): 'Nah, I prefer having working lungs when I'm 20, thanks.'",
            "The 2-Minute Physical Exit: If peers continue pressuring you ('Come on, just once!'), do not stand there arguing. Step backward, say: 'I need to grab a soda from the kitchen,' and walk away into a safe, well-lit social area."
        ],
        "example": {
            "title": "Armaan's High-Pressure Refusal",
            "scenario": "Armaan handles the mango vape peer challenge with social poise.",
            "steps": [
                "Keeps hands open and doesn't take the device: 'No thanks, guys, not my thing.'",
                "The older boy mocks: 'What, are you scared of mango vapor?'",
                "Armaan smiles calmly: 'I've got state swimming finals in three weeks, man; my coach tests my lung capacity every Tuesday. You guys have fun, I'm heading over to get food.'",
                "Walks away calmly to rejoin other friends.",
                "Two other younger boys follow Armaan out, secretly relieved someone had the courage to say no.",
                "Armaan remains athletic, healthy, and earns deep quiet respect for having a spine."
            ],
            "takeaway": "A calm, unshakeable refusal paired with a sports or personal commitment breaks peer pressure instantly."
        },
        "mistakes": [
            ("Taking 'just one puff to fit in' and avoid being called a baby.", "One pod can initiate nicotine receptor upregulation in an adolescent brain, opening the floodgates to chemical dependence."),
            ("Lecturing peers aggressively on cancer risks in the middle of a party.", "Preaching makes you sound self-righteous and provokes defensive mockery; deliver your personal refusal firmly and exit gracefully.")
        ],
        "checklist": [
            "Do I understand that vape aerosol contains heavy metals, formaldehyde, and nicotine salts—not water vapor?",
            "Do I know that nicotine permanently rewires the developing adolescent brain?",
            "Do I have 2 practiced refusal scripts ready on the tip of my tongue?",
            "Do I know how to use an athletic/health anchor to deflect pressure?",
            "Do I have a safe physical exit strategy for unsupervised settings?"
        ],
        "prompt": "Why does having the courage to say 'No' in front of older peers actually inspire other younger kids to protect themselves too?",
        "takeaway": "Your lungs, your brain, your choice: say no with poise and refuse to let tobacco marketing hijack your future.",
        "vis1": {"title": "What Is Really Inside Vape Aerosol?", "caption": "Not Water Vapor! -> Nicotine Salts (High-dose addiction) + Formaldehyde + Diacetyl + Microscopic Lead & Nickel particles."},
        "vis2": {"title": "The 3-Step Social Refusal Matrix", "caption": "1. Casual Refusal ('Not my thing') -> 2. The Anchor ('Got sports trials') -> 3. The Graceful Exit ('Grabbing a drink')."},
        "act": {
            "title": "The Peer Pressure Resistance Roleplay Lab",
            "obj": "Script, rehearse, and deliver 3 distinct refusal responses under simulated high-pressure peer scenarios.",
            "steps": [
                "Partner with a classmate or parent who plays the role of an older student pressuring you to vape.",
                "Practice delivering 'The Clear Casual' with upright posture and steady vocal pitch.",
                "Practice delivering 'The Athletic Anchor' when the roleplayer escalates teasing.",
                "Practice executing a physical step-back and graceful room exit.",
                "Reverse roles and evaluate each other's body language and vocal conviction."
            ],
            "output": "A documented personal 'Substance Refusal Action Plan' signed with 3 personalized verbal scripts."
        },
        "guided": {
            "context": "In the school washroom between periods, two senior boys block the exit and say: 'Take a hit of this pod or we'll tell everyone you're a snitch.'",
            "optimal": "Keep hands down, look them in the eye, say firmly: 'I don't vape. Let me through, the bell rang,' and push past them to the corridor.",
            "opt_reason": "Aggressive intimidation requires firm boundary assertion and an immediate return to public, supervised spaces.",
            "non1": "Cower and take a puff of the vape out of fear.",
            "non1_reason": "Surrenders your bodily sovereignty and invites continued blackmail and bullying.",
            "non2": "Start a fistfight inside the washroom.",
            "non2_reason": "High risk of physical injury and school suspension.",
            "takeaway": "Never compromise your health under threats; exit to public areas and report extortion to counselors."
        },
        "indep": {
            "context": "How does nicotine exposure during adolescence uniquely disrupt synaptic pruning in the prefrontal cortex, predisposing individuals to lifelong mood and substance disorders?",
            "prompt": "Evaluate neurobiological literature on nicotinic acetylcholine receptor (nAChR) upregulation and emotional dysregulation in teenage brains.",
            "rubric": "Comprehensive analysis of prefrontal cortex maturation, dopamine sensitization, executive function deficits, and epigenetic vulnerabilities."
        },
        "quiz": {
            "q": "What is the true composition of the aerosol emitted by electronic cigarettes and vaping devices?",
            "opt_correct": "A toxic chemical aerosol containing nicotine salts, heavy metals, volatile organic compounds, and flavor chemicals like diacetyl.",
            "opt_w1": "Pure 100% distilled spring water vapor with natural fruit vitamins.",
            "opt_w2": "Medicinal oxygen mist designed to clear asthma airways.",
            "opt_w3": "Harmless vegetable oil that is completely absorbed by the stomach."
        },
        "rubric": {
            "task": "Debunk e-cigarette aerosol myths, explain adolescent nicotine addiction neurobiology, and demonstrate confident peer refusal scripts.",
            "mastery": "Articulates aerosol toxicology accurately, explains dopamine receptor rewiring in teens, and delivers grounded, socially poised refusal scripts under pressure.",
            "c1": "Toxicological & Neurobiological Literacy",
            "c2": "Refusal Script Architecture & Vocal Conviction",
            "c3": "Social Boundary Maintenance & Threat De-escalation"
        },
        "refs": [
            "What did the U.S. Surgeon General's Advisory on E-cigarette Epidemic Among Youth conclude regarding adolescent brain vulnerability?",
            "How does 'Popcorn Lung' (bronchiolitis obliterans) develop from inhaling diacetyl flavoring chemicals in vape liquids?",
            "What marketing strategies did Juul and e-cigarette brands use that were found to illegally target underage youth?",
            "How does India's Prohibition of Electronic Cigarettes Act (PECA 2019) legally ban the manufacture, import, and sale of vapes?"
        ]
    }
]

print(f"Months 1-4 authored successfully ({len(months_1_to_4)} modules).")

