import type {
  ClassSkillTrackMeta,
  ClassSkillProject,
  SkillStudioPlanProduct,
  SkillStage,
  LifeSkillStage,
} from './types'

// ============================================================================
// SKILL STUDIO PLANS (REAL-LIFE SKILLS FOCUS)
// ============================================================================

export const SKILL_STUDIO_PLANS: SkillStudioPlanProduct[] = [
  {
    id: 'prod_skill_monthly_999',
    title: 'Monthly Life Skills Explorer',
    period: 'monthly',
    periodLabel: 'Per Month',
    basePriceRupees: 999,
    tagline: 'Access practical life skills tracks with guided activities, decision-making scenarios, and mentor feedback.',
    features: [
      'Enroll in any 1 of the 8 real-life skill tracks at your grade level',
      'Step-by-step weekly guides: personal routines, money basics, communication',
      'Real-world practical activity evaluations and constructive mentor feedback',
      'Verified digital completion certificate upon demonstrating practical competency',
      'Cancel or switch life-skill tracks anytime with zero penalties',
    ],
  },
  {
    id: 'prod_skill_semester_2499',
    title: 'Semester Independence Fellowship',
    period: 'semester',
    periodLabel: 'Per 6 Months',
    basePriceRupees: 2499,
    tagline: 'Multi-track life acceleration: money management, safety, communication, and critical thinking.',
    popular: true,
    features: [
      'Simultaneous access to any 3 real-life skill tracks across your grade',
      'Age-appropriate budget planners, emergency contact toolkits, and timetable templates',
      'Priority evaluation for practical activities with personalized mentor feedback',
      'Personal life-skills portfolio documenting independent achievements',
      'Family discussion guides and safe home-practice checklists',
    ],
  },
  {
    id: 'prod_skill_annual_4999',
    title: 'Annual Confident Youth Pass',
    period: 'annual',
    periodLabel: 'Per Year',
    basePriceRupees: 4999,
    tagline: 'Complete annual mastery across all 8 essential life-skills domains for Classes 4–9.',
    features: [
      'Unrestricted annual access to all 8 real-life skill tracks for your grade',
      'Unlimited evaluated practical capstone activities with verified badges',
      'Complete life preparedness: financial literacy, safety & health, study independence',
      'Direct entry to the TalentXcel Young Citizens & Community Leadership Showcase',
      'Dedicated mentor office hours and verified Life Competency Portfolio',
    ],
  },
]

// ============================================================================
// STAGE RESOLVER (3 REAL-LIFE SKILL STAGES FOR CLASSES 4–9)
// ============================================================================

export function getSkillStage(classNumber: number): {
  stage: SkillStage
  stageLabel: string
  lifeSkillStage: LifeSkillStage
  lifeSkillStageLabel: string
} {
  if (classNumber <= 5) {
    return {
      stage: 'junior',
      stageLabel: 'Junior Pioneers (Classes 4–5)',
      lifeSkillStage: 'foundation_guided',
      lifeSkillStageLabel: 'Foundation & Guided Practice (Classes 4–5)',
    }
  }
  if (classNumber <= 7) {
    return {
      stage: 'middle',
      stageLabel: 'Middle Innovators (Classes 6–7)',
      lifeSkillStage: 'developing_independence',
      lifeSkillStageLabel: 'Developing Independence & Decision-Making (Classes 6–7)',
    }
  }
  if (classNumber <= 9) {
    return {
      stage: 'secondary',
      stageLabel: 'Secondary Builders (Classes 8–9)',
      lifeSkillStage: 'applied_responsibility',
      lifeSkillStageLabel: 'Applied Responsibility & Complex Scenarios (Classes 8–9)',
    }
  }
  // Senior secondary fallback (Classes 10–12)
  return {
    stage: 'senior',
    stageLabel: 'Senior Leaders (Classes 10–12)',
    lifeSkillStage: 'applied_responsibility',
    lifeSkillStageLabel: 'Young Adult Autonomy & Civic Readiness (Classes 10–12)',
  }
}

// ============================================================================
// MASTER CLASS-WISE REAL-LIFE SKILL TRACKS (CLASSES 4–9)
// ============================================================================

export function getClassSkillTracks(classNumber: number): ClassSkillTrackMeta[] {
  const { stage, stageLabel, lifeSkillStage, lifeSkillStageLabel } = getSkillStage(classNumber)

  // --------------------------------------------------------------------------
  // 1. PERSONAL INDEPENDENCE & DAILY LIVING
  // --------------------------------------------------------------------------
  const independenceTrack: ClassSkillTrackMeta = {
    id: 'track_life_independence',
    category: 'life_independence',
    title: 'Personal Independence & Daily Living',
    classNumber,
    stage,
    stageLabel,
    lifeSkillStage,
    lifeSkillStageLabel,
    iconName: 'Home',
    colorTheme: 'indigo',
    level: lifeSkillStage === 'foundation_guided' ? 'foundation' : lifeSkillStage === 'developing_independence' ? 'intermediate' : 'advanced',
    whyItMatters: 'Being able to organize your belongings, manage your daily schedule, and care for your living space builds self-reliance and confidence for life.',
    tools: ['School Timetable', 'Daily Checklist Board', 'Storage Organizers', 'Analog / Digital Clock'],
    reviewStatus: 'verified',
    ...(lifeSkillStage === 'foundation_guided'
      ? {
          classSpecificTitle: 'Organising School Bag, Timetable & Personal Space',
          description: 'Learn to pack your school bag according to the next day’s timetable, fold clothes neatly, and keep your study desk clutter-free.',
          realLifeScenario: 'Aarav often forgot his English notebook on Tuesdays because his bag was packed in a hurry before school. His pencil box was frequently missing an eraser.',
          workedExample: {
            title: 'Packing a School Bag the Night Before',
            scenario: 'You have Math, English, Science, and Art tomorrow. How do you pack systematically?',
            steps: [
              'Step 1: Check tomorrow’s school timetable on your study board.',
              'Step 2: Collect only the required textbooks, notebooks, and homework diaries for those 4 subjects.',
              'Step 3: Check your pencil box: 2 sharpened pencils, 1 eraser, 1 ruler, 1 sharpener.',
              'Step 4: Check special gear: Art sketch pad and water bottle.',
              'Step 5: Zip the bag and place it near your shoes so morning departure is calm.',
            ],
            takeaway: 'Packing the night before takes just 7 minutes and prevents morning panic and forgotten homework.',
          },
          practicalActivity: {
            title: 'School Bag & Study Space Audit Checklist',
            instructions: [
              'Clean your study desk: keep only current study materials on top.',
              'Check tomorrow’s school timetable and pack your bag in order.',
              'Check that your water bottle is washed and filled with clean drinking water.',
              'Show your organized desk and bag to a parent or caregiver for a quick check.',
            ],
            safeCheckNote: 'Never handle sharp craft cutters or heavy furniture without adult help.',
            deliverableDescription: 'A completed 5-point School Readiness Checklist signed by your caregiver.',
          },
          reflectionExercise: {
            promptQuestion: 'What is one thing that usually makes your mornings rushed, and how can preparing the night before solve it?',
            guidingPoints: [
              'Think about looking for clean socks or missing stationery in the morning.',
              'Reflect on how your mood changes when you leave for school calmly.',
            ],
          },
          assessment: {
            question: 'What is the most effective way to ensure you never forget homework books on school days?',
            contextScenario: 'You have a busy morning schedule catching the school bus at 7:30 AM.',
            options: [
              { id: 'opt_1', text: 'Pack your entire locker of books every day so you have everything.', isCorrect: false, explanation: 'Carrying excess books hurts your spine and makes it hard to find what you need.' },
              { id: 'opt_2', text: 'Check the timetable and pack your bag the previous evening after finishing homework.', isCorrect: true, explanation: 'Evening packing ensures all completed homework and next-day books are verified calmly.' },
              { id: 'opt_3', text: 'Wake up 5 minutes earlier and quickly throw books into the bag.', isCorrect: false, explanation: 'Rushed morning packing frequently leads to forgotten books and missing stationery.' },
              { id: 'opt_4', text: 'Ask your parents to pack your school bag for you.', isCorrect: false, explanation: 'Personal independence means taking responsibility for your own school belongings.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'Checking your timetable and packing the evening before builds personal responsibility and prevents forgotten schoolwork.',
          },
          learningOutcomes: [
            'Pack a school bag matching the next day’s timetable without missing items',
            'Maintain an organized study corner with separated subjects and stationary',
            'Fold school uniform and organize clothing items independently',
            'Prepare a healthy after-school snack (e.g. fruit bowl) safely with adult supervision',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'The 7-Minute Evening Bag Pack', objective: 'Matching textbooks, notebooks and pencil box to timetable', deliverable: 'School Bag Daily Checklist' },
            { weekNumber: 2, title: 'The Clean Desk Routine', objective: 'Sorting textbooks, organizing pens, and clearing paper clutter', deliverable: 'Organized Study Space Photo Log' },
            { weekNumber: 3, title: 'Clothing Care & Wardrobe Basics', objective: 'Folding uniforms, hanging blazers, and pairing socks', deliverable: 'Folded Clothes & Wardrobe Section' },
            { weekNumber: 4, title: 'Safe Simple Snack Preparation', objective: 'Washing fruit, spreading butter/jam, and wiping counters clean', deliverable: 'Healthy Snack Caregiver Sign-off' },
          ],
          capstoneProject: {
            id: `proj_indep_c${classNumber}`,
            trackId: 'track_life_independence',
            classNumber,
            title: `Class ${classNumber} 7-Day Personal Independence Challenge`,
            brief: `Execute a 7-day personal routine: pack your bag each evening, keep your study space tidy, and assist in one daily household chore.`,
            realWorldContext: 'Independence starts with self-care routines that save time, build discipline, and prepare you for growing responsibilities.',
            deliverables: ['7-Day Daily Checklist completed and verified by caregiver', 'Before and after photo/sketch of study desk', 'One-paragraph reflection on what felt easiest and hardest'],
            rubricCriteria: [
              { criterion: 'Timetable Accuracy', weightPercentage: 40, masteryDescription: '100% of required books brought to school over 7 days' },
              { criterion: 'Consistency & Follow-through', weightPercentage: 35, masteryDescription: 'Completed evening pack for all 7 consecutive days' },
              { criterion: 'Caregiver Verification', weightPercentage: 25, masteryDescription: 'Signed checklist with constructive caregiver observation' },
            ],
            estimatedHours: 4,
            difficulty: 'easy',
            status: 'verified',
          },
        }
      : lifeSkillStage === 'developing_independence'
      ? {
          classSpecificTitle: 'Daily Routines, Time Blocking & Domestic Responsibilities',
          description: 'Master time-blocked morning and evening routines, take ownership of personal laundry and room hygiene, and coordinate schedules.',
          realLifeScenario: 'Riya often stayed up late finishing homework, woke up tired, skipped breakfast, and felt stressed throughout the school day.',
          workedExample: {
            title: 'Designing a Balanced Evening Routine',
            scenario: 'You reach home at 4:00 PM. How do you balance rest, homework, family dinner, and 8 hours of sleep?',
            steps: [
              '4:00 PM – 4:30 PM: Wash up, have a healthy snack, and unwind without screens.',
              '4:30 PM – 6:00 PM: Focus block for school homework and next-day revisions.',
              '6:00 PM – 7:00 PM: Outdoor play or physical movement.',
              '7:00 PM – 8:00 PM: Light reading, family dinner, and helping clear the table.',
              '8:00 PM – 8:30 PM: Pack school bag, lay out clothes, and prepare for bed by 9:30 PM.',
            ],
            takeaway: 'Having fixed time blocks prevents homework from spilling into sleep hours.',
          },
          practicalActivity: {
            title: 'Personal Weekly Routine Chart',
            instructions: [
              'Draft a weekly planner with fixed wake-up, study, play, and sleep hours.',
              'Include one regular domestic task (e.g. folding laundry or laying the dinner table).',
              'Follow the chart for 5 weekdays and record your sleep and energy levels.',
            ],
            safeCheckNote: 'Ensure your routine includes at least 8 to 9 hours of uninterrupted night sleep.',
            deliverableDescription: 'A 5-day tracked Weekly Routine Chart with reflection notes.',
          },
          reflectionExercise: {
            promptQuestion: 'When you procrastinate on an important task, what distraction usually causes it, and how can you remove it?',
            guidingPoints: [
              'Identify whether phone notifications, TV, or disorganized materials distract you.',
              'Plan one rule to protect your focus time (e.g., phone in another room).',
            ],
          },
          assessment: {
            question: 'If you have an exam on Friday and a sports practice on Thursday evening, when is the best time to finish your exam revision?',
            contextScenario: 'You want to perform well in both sports and academics without feeling overwhelmed on Thursday night.',
            options: [
              { id: 'opt_1', text: 'Cram everything Thursday night after sports practice ends at 8 PM.', isCorrect: false, explanation: 'Late-night cramming leads to exhaustion and poor exam recall.' },
              { id: 'opt_2', text: 'Skip sports practice completely without informing your team coach.', isCorrect: false, explanation: 'Skipping commitments without communication is irresponsible to your teammates.' },
              { id: 'opt_3', text: 'Break revision into 45-minute blocks on Tuesday and Wednesday, leaving Thursday for light review.', isCorrect: true, explanation: 'Spreading preparation ahead of time prevents panic and lets you honor both commitments.' },
              { id: 'opt_4', text: 'Study early Friday morning on the school bus.', isCorrect: false, explanation: 'Last-minute bus study creates anxiety and prevents deep understanding.' },
            ],
            correctOptionId: 'opt_3',
            reasoningFeedback: 'Advance time blocking allows you to fulfill sports and academic commitments without burnout or last-minute panic.',
          },
          learningOutcomes: [
            'Design and follow a realistic 7-day schedule balancing school, hobbies, and rest',
            'Take independent ownership of personal laundry sorting and shoe maintenance',
            'Prepare a nutritious breakfast or lunchbox snack independently and safely',
            'Break multi-day school projects into daily micro-tasks on a calendar',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Time-Blocking Morning & Evening Blocks', objective: 'Structuring fixed routines for calm mornings and restful nights', deliverable: 'Personal Routine Blueprint' },
            { weekNumber: 2, title: 'Room Hygiene & Belongings Management', objective: 'Maintaining wardrobe shelves, shoe racks, and workspace hygiene', deliverable: 'Room Cleanliness Audit' },
            { weekNumber: 3, title: 'Independent Meal & Kitchen Safety', objective: 'Preparing healthy sandwiches, smoothies, or salads safely', deliverable: 'Safe Kitchen Skills Record' },
            { weekNumber: 4, title: 'Weekly Calendar & Deadline Management', objective: 'Mapping homework, tests, and family events on a wall calendar', deliverable: 'Tracked Monthly Wall Calendar' },
          ],
          capstoneProject: {
            id: `proj_indep_c${classNumber}`,
            trackId: 'track_life_independence',
            classNumber,
            title: `Class ${classNumber} Home Independence & Personal Operations System`,
            brief: `Create and sustain an integrated personal management system: weekly time-blocked calendar, personal chore log, and emergency readiness kit.`,
            realWorldContext: 'Managing your own schedule and personal environment is the hallmark of growing maturity and independence.',
            deliverables: ['Two-week completed time-blocked schedule with activity timestamps', 'Caregiver endorsement of completed domestic responsibilities', 'Written reflection on personal productivity and sleep quality'],
            rubricCriteria: [
              { criterion: 'Schedule Feasibility', weightPercentage: 40, masteryDescription: 'Realistic balance of school, chores, sleep (8+ hrs), and recreation' },
              { criterion: 'Domestic Ownership', weightPercentage: 35, masteryDescription: 'Completed assigned household responsibilities consistently without reminders' },
              { criterion: 'Personal Reflection', weightPercentage: 25, masteryDescription: 'Identified realistic bottlenecks and implemented adjustments' },
            ],
            estimatedHours: 6,
            difficulty: 'medium',
            status: 'verified',
          },
        }
      : {
          classSpecificTitle: 'Self-Regulated Autonomy, Long-Term Goal Tracking & Life Systems',
          description: 'Build mature self-management systems: long-term project planning, grocery and meal preparation logistics, and proactive stress management.',
          realLifeScenario: 'Dev had to balance Class 9 board exam preparation, football team captaincy, and chores while parents were working late.',
          workedExample: {
            title: 'Managing Complex Priorities Under Time Pressure',
            scenario: 'You have two major project submissions in 10 days, 3 unit tests, and regular household responsibilities.',
            steps: [
              'Step 1: Write down all hard deadlines on a visual timeline.',
              'Step 2: Estimate hours required for each task (e.g. Science project: 4 hours, Math revision: 3 hours).',
              'Step 3: Schedule tasks backwards from the deadline into dedicated 50-minute deep-work sessions.',
              'Step 4: Communicate your schedule clearly to parents so household chores are shared smoothly.',
              'Step 5: Review progress each evening for 5 minutes and adjust next-day blocks.',
            ],
            takeaway: 'Backward planning from deadlines eliminates procrastination and ensures steady progress.',
          },
          practicalActivity: {
            title: '14-Day Goal & Habit Tracking Ledger',
            instructions: [
              'Set 2 academic habits and 1 personal wellness habit (e.g., 8 hours sleep, 2L water).',
              'Track daily execution using a physical or digital habit matrix.',
              'Conduct a weekly review on Sunday to evaluate completion percentage.',
            ],
            safeCheckNote: 'Never sacrifice sleep or nutrition to fulfill excessive study schedules.',
            deliverableDescription: 'A 14-day Habit Matrix with analytical weekly self-assessments.',
          },
          reflectionExercise: {
            promptQuestion: 'How does personal independence prepare you for high school and university life away from home?',
            guidingPoints: [
              'Consider managing personal finances, laundry, health, and academic deadlines without parents prompting you.',
              'Reflect on what habits you need to build now.',
            ],
          },
          assessment: {
            question: 'When feeling overwhelmed by multiple upcoming deadlines, what is the most constructive first step?',
            contextScenario: 'You have three assignments due in the same week and feel paralyzed about where to begin.',
            options: [
              { id: 'opt_1', text: 'Ignore the work and watch videos to distract yourself until the night before.', isCorrect: false, explanation: 'Avoidance increases stress and guarantees panic later.' },
              { id: 'opt_2', text: 'Write down every task, rank them by urgency and effort, and start with the smallest 15-minute action.', isCorrect: true, explanation: 'Externalizing tasks on paper reduces cognitive overwhelm and builds momentum.' },
              { id: 'opt_3', text: 'Complain to teachers that too much work was assigned and refuse to submit.', isCorrect: false, explanation: 'Refusing work damages your academic standing and avoids problem-solving.' },
              { id: 'opt_4', text: 'Pull an all-nighter immediately without sleeping.', isCorrect: false, explanation: 'All-nighters cause cognitive impairment and sickness.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'Writing down all tasks and tackling the first manageable micro-step restores control and breaks paralysis.',
          },
          learningOutcomes: [
            'Maintain self-directed study schedules without parental supervision',
            'Plan and prepare balanced meals independently, adhering to kitchen hygiene and safety',
            'Manage personal wardrobe, room sanitization, and basic domestic repairs',
            'Conduct weekly self-audits to calibrate academic and health balances',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Backward Project Planning & Milestone Maps', objective: 'Breaking multi-week goals into structured daily milestones', deliverable: 'Project Milestone Roadmap' },
            { weekNumber: 2, title: 'Nutritional Self-Reliance & Kitchen Management', objective: 'Planning a 3-day balanced menu and preparing it safely', deliverable: 'Nutritional Meal Prep Log' },
            { weekNumber: 3, title: 'Stress Inoculation & Sleep Architecture', objective: 'Building sleep hygiene rules and physical recovery habits', deliverable: 'Sleep & Stress Tracking Log' },
            { weekNumber: 4, title: 'Personal Systems Audit & Future Readiness', objective: 'Consolidating personal habits into a sustainable daily routine', deliverable: 'Life Autonomy Master Plan' },
          ],
          capstoneProject: {
            id: `proj_indep_c${classNumber}`,
            trackId: 'track_life_independence',
            classNumber,
            title: `Class ${classNumber} Self-Reliance & Personal Autonomy Portfolio`,
            brief: `Execute a 14-day independent lifestyle plan: self-managed study schedules, independent laundry and meal preparation, and a weekly progress review.`,
            realWorldContext: 'True autonomy means taking responsibility for your mind, body, and living environment.',
            deliverables: ['14-day habit execution ledger with zero missed days', 'Documented meal prep with grocery budget calculation', 'Comprehensive self-reflection on autonomy and emotional regulation'],
            rubricCriteria: [
              { criterion: 'Self-Direction', weightPercentage: 40, masteryDescription: 'Completed all commitments without parental reminders or nagging' },
              { criterion: 'Practical Competency', weightPercentage: 35, masteryDescription: 'Demonstrated safe meal prep, laundry care, and tidy workspace' },
              { criterion: 'System Quality', weightPercentage: 25, masteryDescription: 'Realistic, adaptable routine suited for high school rigor' },
            ],
            estimatedHours: 8,
            difficulty: 'hard',
            status: 'verified',
          },
        }),
  }

  // --------------------------------------------------------------------------
  // 2. COMMUNICATION & CONFIDENCE
  // --------------------------------------------------------------------------
  const communicationTrack: ClassSkillTrackMeta = {
    id: 'track_life_communication',
    category: 'life_communication',
    title: 'Communication & Confidence',
    classNumber,
    stage,
    stageLabel,
    lifeSkillStage,
    lifeSkillStageLabel,
    iconName: 'MessageSquare',
    colorTheme: 'blue',
    level: lifeSkillStage === 'foundation_guided' ? 'foundation' : lifeSkillStage === 'developing_independence' ? 'intermediate' : 'advanced',
    whyItMatters: 'Speaking clearly, listening actively, asking for help without hesitation, and resolving misunderstandings respectfully are fundamental to every relationship and career.',
    tools: ['Speech Practice Cards', 'Email & Note Templates', 'Active Listening Rubric', 'Voice Recorder'],
    reviewStatus: 'verified',
    ...(lifeSkillStage === 'foundation_guided'
      ? {
          classSpecificTitle: 'Speaking Clearly, Active Listening & Asking for Help',
          description: 'Practice introducing yourself confidently, asking teachers for help politely, following multi-step spoken instructions, and expressing feelings with calm words.',
          realLifeScenario: 'Ananya did not understand a math problem on the blackboard but felt shy to raise her hand. She sat silently and struggled with homework later.',
          workedExample: {
            title: 'How to Politely Ask a Teacher for Clarification',
            scenario: 'You didn’t understand Step 2 of the teacher’s explanation. How do you ask without feeling embarrassed?',
            steps: [
              'Step 1: Wait for a natural pause when the teacher finishes speaking.',
              'Step 2: Raise your hand quietly and make polite eye contact.',
              'Step 3: When called upon, stand or speak clearly: "Excuse me, Ma’am/Sir, could you please explain Step 2 again? I didn’t quite understand how the remainder was calculated."',
              'Step 4: Listen carefully to the response and say "Thank you, that makes sense now."',
            ],
            takeaway: 'Asking questions is a sign of curiosity and intelligence, not weakness. Teachers appreciate polite questions.',
          },
          practicalActivity: {
            title: 'The 3-Step Clear Introduction Practice',
            instructions: [
              'Stand tall with a friendly smile and comfortable eye contact.',
              'State your name clearly, your favorite subject or hobby, and one interesting fact.',
              'Practice with a family member and ask for feedback on your voice volume and clarity.',
            ],
            safeCheckNote: 'Never share private information like home addresses or phone numbers with strangers.',
            deliverableDescription: 'A 1-minute introduction recorded or practiced with caregiver feedback.',
          },
          reflectionExercise: {
            promptQuestion: 'When you feel nervous speaking in front of the class, what thought can help you feel more confident?',
            guidingPoints: [
              'Remember that classmates are listening to learn, not to judge.',
              'Taking a slow, deep breath before speaking calms your heartbeat.',
            ],
          },
          assessment: {
            question: 'What is the most respectful and effective way to disagree with a friend’s opinion during a group discussion?',
            contextScenario: 'Your friend wants to make a chart on animals, but you think a chart on plants fits the science project topic better.',
            options: [
              { id: 'opt_1', text: 'Shout that their idea is terrible and refuse to work with them.', isCorrect: false, explanation: 'Insulting others causes conflict and destroys teamwork.' },
              { id: 'opt_2', text: 'Say: "I understand why you like animals, but since our topic is photosynthesis, plants might fit better. What do you think?"', isCorrect: true, explanation: 'Acknowledging their thought before explaining your reasoning is polite and collaborative.' },
              { id: 'opt_3', text: 'Stay quiet and secretly change the chart when they look away.', isCorrect: false, explanation: 'Dishonest actions ruin trust in group work.' },
              { id: 'opt_4', text: 'Complain immediately to the principal.', isCorrect: false, explanation: 'Minor differences should be discussed kindly between classmates first.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'Respectful disagreement validates the other person’s view before presenting reasons and asking for their input.',
          },
          learningOutcomes: [
            'Introduce yourself with confident posture, clear voice, and warm eye contact',
            'Ask teachers and mentors for help using polite and precise phrasing',
            'Listen attentively to multi-step instructions without interrupting',
            'Resolve simple peer disagreements using calm words rather than shouting',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'The Confident Self-Introduction', objective: 'Mastering posture, eye contact, and clear vocal articulation', deliverable: 'Introduction Video / Caregiver Note' },
            { weekNumber: 2, title: 'The Courage to Ask Questions', objective: 'Phrasing polite requests for help in classroom settings', deliverable: 'Polite Question Scripts' },
            { weekNumber: 3, title: 'Active Listening & Following Instructions', objective: 'Paraphrasing instructions before acting on them', deliverable: '3-Step Instruction Follower' },
            { weekNumber: 4, title: 'Expressing Opinions Politely', objective: 'Disagreeing kindly without insulting peers', deliverable: 'Respectful Dialogue Log' },
          ],
          capstoneProject: {
            id: `proj_comm_c${classNumber}`,
            trackId: 'track_life_communication',
            classNumber,
            title: `Class ${classNumber} Confident Storyteller & Classroom Communicator`,
            brief: `Prepare and deliver a 2-minute spoken story or hobby presentation to family or classmates, demonstrating clear voice, polite greetings, and active listening to questions.`,
            realWorldContext: 'Clear and respectful communication is the single most valuable social skill for school and friendships.',
            deliverables: ['Speech outline card with opening, main story, and closing', 'Feedback form completed by 2 listeners', 'Short reflection on vocal volume and confidence'],
            rubricCriteria: [
              { criterion: 'Voice Clarity & Audibility', weightPercentage: 40, masteryDescription: 'Spoke clearly without mumbling; well-paced and loud enough to be heard' },
              { criterion: 'Respectful Demeanour', weightPercentage: 35, masteryDescription: 'Greeted listeners, made friendly eye contact, and thanked the audience' },
              { criterion: 'Listener Engagement', weightPercentage: 25, masteryDescription: 'Answered questions calmly and listened attentively' },
            ],
            estimatedHours: 4,
            difficulty: 'easy',
            status: 'verified',
          },
        }
      : lifeSkillStage === 'developing_independence'
      ? {
          classSpecificTitle: 'Constructive Dialogue, Written Etiquette & Public Presentations',
          description: 'Learn to write clear, polite emails to teachers, handle misunderstandings constructively, express balanced opinions, and deliver engaging presentations.',
          realLifeScenario: 'Kabir was absent from school due to fever. He sent a one-word text "send homework" to his classmate, who felt offended by the demanding tone.',
          workedExample: {
            title: 'Drafting a Polite Absence Note to a Teacher',
            scenario: 'You missed school for 2 days due to viral fever. How do you write a polite email to your class teacher?',
            steps: [
              'Subject Line: Clear and informative (e.g. "Leave Note & Homework Request – Kabir Mehta, Class 7B").',
              'Salutation: Respectful greeting ("Respected Ma’am / Dear Sir,").',
              'Body: State reason and dates clearly ("I was unwell with viral fever on Monday and Tuesday and could not attend school.").',
              'Request: Polite inquiry ("I have attached my parent’s leave note and will complete missed assignments. Could you please let me know the chapters covered?").',
              'Sign-off: Professional closing ("Sincerely, Kabir Mehta, Roll No. 14").',
            ],
            takeaway: 'Polite written messages establish mutual respect and make people happy to help you.',
          },
          practicalActivity: {
            title: 'Practical Message & Email Etiquette Workshop',
            instructions: [
              'Draft an email requesting permission to join the school debate club.',
              'Draft a friendly note apologizing for accidentally spilling water on a classmate’s notebook.',
              'Review both messages to ensure tone is respectful, clear, and grammatically correct.',
            ],
            safeCheckNote: 'Never share personal passwords, home addresses, or private photos in any digital communication.',
            deliverableDescription: 'Two completed communication templates with feedback from a mentor or teacher.',
          },
          reflectionExercise: {
            promptQuestion: 'When an online message or text sounds rude, why is it better to ask in person before getting angry?',
            guidingPoints: [
              'Notice that text messages lack tone of voice, facial expressions, and body language.',
              'Misunderstandings often happen because words were typed in a hurry without bad intentions.',
            ],
          },
          assessment: {
            question: 'You notice two friends arguing intensely over whose turn it is to bat during lunch. How can you help de-escalate?',
            contextScenario: 'Voices are rising, and the game is about to end in anger.',
            options: [
              { id: 'opt_1', text: 'Pick a side and shout at the other friend to leave the field.', isCorrect: false, explanation: 'Taking sides escalates the conflict and makes the other person defensive.' },
              { id: 'opt_2', text: 'Suggest: "Let’s do rock-paper-scissors or a 3-over split so both of you get to bat before the bell rings."', isCorrect: true, explanation: 'Offering a neutral, fair compromise solves the deadlock calmly.' },
              { id: 'opt_3', text: 'Take the bat and run away with it.', isCorrect: false, explanation: 'Disruptive behavior worsens the situation.' },
              { id: 'opt_4', text: 'Cheer for them to fight it out.', isCorrect: false, explanation: 'Encouraging fights is harmful and irresponsible.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'A calm mediator proposes fair, constructive compromises that allow everyone to participate without losing face.',
          },
          learningOutcomes: [
            'Compose polite, well-structured emails and messages for school and extracurriculars',
            'Handle peer misunderstandings constructively using calm, clarifying questions',
            'Deliver a 3-minute structured presentation with visual aids and clear vocal pacing',
            'Provide helpful, constructive feedback to peers without sounding critical or unkind',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Written Etiquette for School & Life', objective: 'Writing clear subject lines, respectful salutations, and concise bodies', deliverable: '3 Professional Message Drafts' },
            { weekNumber: 2, title: 'The Art of Constructive Disagreement', objective: 'Disagreeing on ideas while maintaining respect for the person', deliverable: 'De-escalation Dialogue Script' },
            { weekNumber: 3, title: 'Structuring a 3-Minute Presentation', objective: 'Organizing opening hook, 3 key arguments, and memorable conclusion', deliverable: 'Presentation Slide/Card Deck' },
            { weekNumber: 4, title: 'Active Listening & Empathetic Feedback', objective: 'Giving constructive suggestions using the "Praise-Improve-Praise" method', deliverable: 'Peer Feedback Review Sheet' },
          ],
          capstoneProject: {
            id: `proj_comm_c${classNumber}`,
            trackId: 'track_life_communication',
            classNumber,
            title: `Class ${classNumber} Effective Communicator & Community Advocate`,
            brief: `Research a practical school improvement issue (e.g. cleaner water coolers, quieter library), write a formal proposal email to the student council, and deliver a 3-minute spoken presentation.`,
            realWorldContext: 'Communicating constructive proposals with polite evidence is how students make real positive impacts in their communities.',
            deliverables: ['1-page formal proposal letter with problem, evidence, and proposed solution', 'Video or audio recording of 3-minute presentation', 'Anticipated questions & answers card'],
            rubricCriteria: [
              { criterion: 'Tone & Structure', weightPercentage: 40, masteryDescription: 'Respectful language, logical organization, clear actionable request' },
              { criterion: 'Delivery & Body Language', weightPercentage: 35, masteryDescription: 'Clear vocal modulation, confident posture, minimal filler words' },
              { criterion: 'Practical Feasibility', weightPercentage: 25, masteryDescription: 'Realistic, respectful recommendation that benefits the whole community' },
            ],
            estimatedHours: 6,
            difficulty: 'medium',
            status: 'verified',
          },
        }
      : {
          classSpecificTitle: 'Persuasive Rhetoric, Negotiation & High-Stakes Interpersonal Communication',
          description: 'Master non-defensive communication, empathetic negotiation, formal interview and speech delivery, and navigating complex social conflicts.',
          realLifeScenario: 'A group project stalled because two team members disagreed on the topic and refused to communicate, leaving the deadline in jeopardy.',
          workedExample: {
            title: 'Facilitating a Win-Win Group Negotiation',
            scenario: 'Two team members want completely different project themes. How do you facilitate an agreement?',
            steps: [
              'Step 1: Set a calm ground rule: "Let each person explain their view for 2 minutes without interruptions."',
              'Step 2: Identify the shared goal: "We all want an A grade and a project we can be proud of."',
              'Step 3: Look for synthesis: Can we combine the environmental science theme with the visual poster concept?',
              'Step 4: Divide roles clearly so both members lead areas they are passionate about.',
              'Step 5: Document agreed responsibilities in writing with deadlines.',
            ],
            takeaway: 'Negotiation is not about winning an argument; it is about finding a workable solution that respects everyone.',
          },
          practicalActivity: {
            title: 'Difficult Conversations Role-Play Protocol',
            instructions: [
              'Practice delivering difficult news (e.g., telling a friend you cannot attend their party due to family obligations) with empathy.',
              'Practice setting boundaries when a classmate asks to copy your homework.',
              'Use "I-statements" (e.g., "I feel uncomfortable sharing my assignment because...") rather than accusatory language.',
            ],
            safeCheckNote: 'Maintain calm, steady eye contact and avoid aggressive posture.',
            deliverableDescription: 'A documented script of two boundary-setting conversations with reflection notes.',
          },
          reflectionExercise: {
            promptQuestion: 'How does listening to understand differ from listening merely to respond?',
            guidingPoints: [
              'Notice how often people formulate their counter-argument while the other person is still speaking.',
              'Reflect on how validating someone’s feeling transforms a tense conversation.',
            ],
          },
          assessment: {
            question: 'A classmate approaches you and says: "You never help in our group project, you’re just slowing us down!" What is the most mature response?',
            contextScenario: 'You contributed your assigned research yesterday, but they haven’t checked the shared folder yet.',
            options: [
              { id: 'opt_1', text: 'Shout: "You’re blind! I did all the work, you did nothing!"', isCorrect: false, explanation: 'Retaliatory insults destroy collaboration and worsen conflict.' },
              { id: 'opt_2', text: 'Calmly say: "I understand you’re feeling stressed about the deadline. I actually uploaded my section yesterday at 6 PM. Let’s open the folder together and review it."', isCorrect: true, explanation: 'De-escalates emotion, acknowledges their stress, and presents factual verification calmly.' },
              { id: 'opt_3', text: 'Walk away silently and delete your section from the project.', isCorrect: false, explanation: 'Passive-aggressive revenge sabotages everyone including yourself.' },
              { id: 'opt_4', text: 'Burst into tears and run to the principal.', isCorrect: false, explanation: 'Direct, calm communication resolves misunderstandings faster.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'Acknowledging the other person’s stress while calmly directing them to factual evidence diffuses false accusations without aggression.',
          },
          learningOutcomes: [
            'De-escalate high-emotion interpersonal conflicts using non-defensive communication',
            'Negotiate shared responsibilities in group projects with written accountability',
            'Deliver persuasive, evidence-grounded speeches before large audiences',
            'Establish healthy personal boundaries firmly and respectfully without guilt',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Non-Defensive Listening & The "I-Statement"', objective: 'Responding calmly to accusations and expressing feelings constructively', deliverable: 'De-escalation Case Study' },
            { weekNumber: 2, title: 'Principled Negotiation & Conflict Resolution', objective: 'Finding win-win compromises in collaborative projects', deliverable: 'Group Conflict Resolution Blueprint' },
            { weekNumber: 3, title: 'Persuasive Public Speaking & Rhetoric', objective: 'Mastering pacing, rhetorical pauses, and audience engagement', deliverable: '5-Minute Keynote Speech Video' },
            { weekNumber: 4, title: 'Setting Firm, Polite Boundaries', objective: 'Saying no gracefully to peer pressure and unethical requests', deliverable: 'Boundary Setting Playbook' },
          ],
          capstoneProject: {
            id: `proj_comm_c${classNumber}`,
            trackId: 'track_life_communication',
            classNumber,
            title: `Class ${classNumber} Diplomatic Leadership & Community Debate Showcase`,
            brief: `Lead a simulated town-hall deliberation on a complex community issue (e.g., student smartphone policies or school cafeteria nutrition), representing diverse stakeholder viewpoints and synthesizing a consensus resolution.`,
            realWorldContext: 'Real-world leaders achieve progress through patient diplomacy, active listening, and principled consensus building.',
            deliverables: ['Stakeholder perspective analysis (3 distinct viewpoints)', 'Consensus resolution agreement document', 'Reflection on emotional self-regulation during debate'],
            rubricCriteria: [
              { criterion: 'Empathy & Objectivity', weightPercentage: 40, masteryDescription: 'Demonstrated fair, balanced representation of opposing perspectives' },
              { criterion: 'Consensus Quality', weightPercentage: 35, masteryDescription: 'Synthesized a practical, win-win resolution acceptable to all sides' },
              { criterion: 'Emotional Poise', weightPercentage: 25, masteryDescription: 'Maintained calm, respectful, and authoritative presence under debate pressure' },
            ],
            estimatedHours: 8,
            difficulty: 'hard',
            status: 'verified',
          },
        }),
  }

  // --------------------------------------------------------------------------
  // 3. MONEY MANAGEMENT & FINANCIAL LITERACY
  // --------------------------------------------------------------------------
  const moneyTrack: ClassSkillTrackMeta = {
    id: 'track_life_money_management',
    category: 'life_money_management',
    title: 'Money Management & Financial Literacy',
    classNumber,
    stage,
    stageLabel,
    lifeSkillStage,
    lifeSkillStageLabel,
    iconName: 'Coins',
    colorTheme: 'emerald',
    level: lifeSkillStage === 'foundation_guided' ? 'foundation' : lifeSkillStage === 'developing_independence' ? 'intermediate' : 'advanced',
    whyItMatters: 'Understanding money value, budgeting wisely, saving for goals, and recognizing scams are essential life skills that protect your future independence.',
    tools: ['Rupee Currency Cards', 'Needs vs Wants Tracker', 'Weekly Budget Ledger', 'Savings Goal Jar'],
    reviewStatus: 'verified',
    ...(lifeSkillStage === 'foundation_guided'
      ? {
          classSpecificTitle: 'Understanding Money, Calculating Change & Needs vs. Wants',
          description: 'Learn the value of Indian Rupee currency (₹10 to ₹500), calculate change at the store, distinguish between essential needs and fun wants, and save coins toward a goal.',
          realLifeScenario: 'Vivaan received ₹100 from his grandfather for his birthday. He wanted to buy a packet of chips for ₹40, a toy car for ₹80, and a notebook for school for ₹30. He didn’t realize he didn’t have enough for all three.',
          workedExample: {
            title: 'Sorting Needs vs. Wants with ₹100',
            scenario: 'You have ₹100. You need a geometry ruler (₹25) for school tomorrow, and you want an ice cream (₹35) and a comic book (₹60). What do you do?',
            steps: [
              'Step 1: Identify the NEED: School ruler (₹25) is mandatory for class.',
              'Step 2: Calculate remaining balance: ₹100 - ₹25 = ₹75 remaining.',
              'Step 3: Evaluate WANTS: Ice cream is ₹35, Comic is ₹60. Both together = ₹95, which exceeds ₹75!',
              'Step 4: Make a choice: Buy the ice cream (₹35) and save ₹40 in your piggy bank toward the comic book next week.',
              'Step 5: Total spent: ₹25 + ₹35 = ₹60. Change received from ₹100: ₹40.',
            ],
            takeaway: 'Needs come first. By saving the leftover change, you can get your bigger wants later without running out of money.',
          },
          practicalActivity: {
            title: 'Grocery Store Price & Change Comparison',
            instructions: [
              'Accompany a parent on a grocery errand or inspect 3 pantry items at home.',
              'Note down the prices: Item A (e.g. Milk: ₹32), Item B (e.g. Bread: ₹40), Item C (e.g. Eggs: ₹65).',
              'If you paid with a ₹200 note for Milk and Bread, calculate the exact change due.',
            ],
            safeCheckNote: 'Never handle real bank accounts, online payment apps, or OTPs. All activities use cash calculations with caregiver supervision.',
            deliverableDescription: 'A completed 3-item Price & Change Calculation sheet verified by caregiver.',
          },
          reflectionExercise: {
            promptQuestion: 'What is something you really wanted recently that you realize now was just a temporary "want"?',
            guidingPoints: [
              'Think about toys or snacks that seemed exciting for 10 minutes and were forgotten.',
              'Reflect on how saving that money for a long-term goal would feel better.',
            ],
          },
          assessment: {
            question: 'You go to the stationery shop with a ₹100 note. You buy a notebook for ₹45 and a pen for ₹20. How much change should the shopkeeper return to you?',
            contextScenario: 'You are checking your change before walking away from the counter.',
            options: [
              { id: 'opt_1', text: '₹25', isCorrect: false, explanation: 'Incorrect subtraction: ₹100 - ₹65 = ₹35.' },
              { id: 'opt_2', text: '₹35', isCorrect: true, explanation: 'Total spent is ₹45 + ₹20 = ₹65. Change = ₹100 - ₹65 = ₹35.' },
              { id: 'opt_3', text: '₹45', isCorrect: false, explanation: 'Incorrect: ₹45 was the notebook price alone.' },
              { id: 'opt_4', text: '₹55', isCorrect: false, explanation: 'Too much change calculated.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'Adding the items (₹45 + ₹20 = ₹65) and subtracting from ₹100 gives the exact change of ₹35.',
          },
          learningOutcomes: [
            'Identify and count Indian currency denominations accurately (₹10 to ₹500)',
            'Calculate exact change required during everyday grocery and stationery purchases',
            'Classify purchases into "Needs" (essentials) and "Wants" (desires)',
            'Set up a savings jar and track progress toward a specific age-appropriate goal',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Indian Rupee Basics & Counting Change', objective: 'Calculating totals and verifying shopkeeper change accurately', deliverable: 'Stationery Shopping Receipt Log' },
            { weekNumber: 2, title: 'Needs vs. Wants: The Smart Buyer Rule', objective: 'Distinguishing essential school tools from impulsive desires', deliverable: 'Needs vs. Wants Collage' },
            { weekNumber: 3, title: 'The 3-Jar Money System', objective: 'Dividing money into Spending, Saving, and Sharing jars', deliverable: 'Personal 3-Jar Savings Plan' },
            { weekNumber: 4, title: 'Saving Toward a Goal', objective: 'Tracking weekly savings progress toward a target book or toy', deliverable: 'Savings Goal Thermometer' },
          ],
          capstoneProject: {
            id: `proj_money_c${classNumber}`,
            trackId: 'track_life_money_management',
            classNumber,
            title: `Class ${classNumber} Piggy Bank Savings & Smart Shopping Project`,
            brief: `Create a 4-week savings plan for a target item under ₹250. Track daily coin deposits, compare prices across two shops or brands, and calculate savings efficiency.`,
            realWorldContext: 'Learning to save small amounts consistently is the foundation of lifelong financial security.',
            deliverables: ['Savings goal tracker with weekly deposit milestones', 'Price comparison chart between 2 brands of the same item', 'Caregiver sign-off on change calculation accuracy'],
            rubricCriteria: [
              { criterion: 'Calculation Accuracy', weightPercentage: 40, masteryDescription: '100% accurate addition, subtraction, and change calculations' },
              { criterion: 'Needs vs Wants Distinction', weightPercentage: 35, masteryDescription: 'Clearly demonstrated why the chosen item was an earned goal' },
              { criterion: 'Consistent Tracking', weightPercentage: 25, masteryDescription: 'Recorded savings milestones over the full 4 weeks' },
            ],
            estimatedHours: 4,
            difficulty: 'easy',
            status: 'verified',
          },
        }
      : lifeSkillStage === 'developing_independence'
      ? {
          classSpecificTitle: 'Budgeting Allowances, Comparing Value & Digital Payment Awareness',
          description: 'Build a monthly budget, compare unit prices and discounts at the supermarket, understand bank accounts and digital payments (UPI) safely, and resist advertising tricks.',
          realLifeScenario: 'Aryan had a ₹500 monthly allowance. He spent ₹350 on branded snacks in the first week and had no money left for his school bus pass recharge or notebook.',
          workedExample: {
            title: 'The 50-30-20 Rule for a ₹500 Monthly Allowance',
            scenario: 'How should a Class 7 student allocate a ₹500 monthly budget?',
            steps: [
              'Needs (50% = ₹250): School stationery, emergency transport, mandatory school supplies.',
              'Wants (30% = ₹150): Fun snacks with friends, hobby stickers, or gaming treats.',
              'Savings (20% = ₹100): Set aside in a savings envelope for an annual goal (e.g. sports shoes or a book set).',
              'Rule: If you spend all your Wants budget by day 10, you wait until next month rather than dipping into Savings or Needs.',
            ],
            takeaway: 'Allocating money before spending ensures you never run out when you really need it.',
          },
          practicalActivity: {
            title: 'Supermarket Unit Price Comparison Challenge',
            instructions: [
              'Compare two brands of cooking oil, rice, or cereal at the store or online grocery app.',
              'Calculate the price per 100 grams: Item A (500g for ₹120) vs Item B (1kg for ₹220).',
              'Determine which offers the best value for money and check the expiry date.',
            ],
            safeCheckNote: 'Never share OTPs, UPI PINs, or card CVVs. Children must never conduct live digital transactions alone.',
            deliverableDescription: 'A completed Value-for-Money Analysis sheet comparing 3 product pairs.',
          },
          reflectionExercise: {
            promptQuestion: 'How do advertisements on YouTube or TV try to convince you to buy things you don’t need?',
            guidingPoints: [
              'Notice celebrity endorsements, bright cartoon mascots, and words like "Limited Time Offer!".',
              'Reflect on waiting 48 hours before buying something you saw in an ad.',
            ],
          },
          assessment: {
            question: 'You receive an SMS on your family tablet saying: "Congratulations! You have won ₹25,000 lottery from Amazon! Click this link to claim immediately into your UPI account." What should you do?',
            contextScenario: 'The message looks urgent and has an exciting cash prize.',
            options: [
              { id: 'opt_1', text: 'Click the link immediately so you don’t lose the ₹25,000.', isCorrect: false, explanation: 'Clicking malicious links downloads malware or steals financial details.' },
              { id: 'opt_2', text: 'Recognize it as a common phishing scam, do not click the link, and show it to a parent or trusted adult immediately.', isCorrect: true, explanation: 'Genuine companies never send lottery links to claim money over SMS. This is a dangerous scam.' },
              { id: 'opt_3', text: 'Forward the message to 10 friends so they can win too.', isCorrect: false, explanation: 'Forwarding spreads dangerous scams to others.' },
              { id: 'opt_4', text: 'Reply to the SMS asking for the cash to be delivered by hand.', isCorrect: false, explanation: 'Replying confirms your phone number is active to scammers.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'Unsolicited prize messages with links are classic phishing scams designed to steal money or passwords. Never click them.',
          },
          learningOutcomes: [
            'Create a 30-day budget allocating funds across Needs, Wants, and Savings',
            'Compare unit prices and nutritional/quality value before making purchasing choices',
            'Understand how bank savings accounts, debit cards, and UPI work conceptually',
            'Identify and avoid 5 common financial scams: fake SMS links, lottery calls, and fake discounts',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'The 50/30/20 Monthly Student Budget', objective: 'Allocating allowances across essentials, recreation, and savings', deliverable: 'Monthly Budget Spreadsheet/Ledger' },
            { weekNumber: 2, title: 'Supermarket Math & Unit Pricing', objective: 'Comparing price per gram, bulk discounts, and expiry dates', deliverable: 'Supermarket Value Audit' },
            { weekNumber: 3, title: 'Digital Money: Bank Accounts & UPI Safely', objective: 'Understanding banking concepts and age-appropriate financial safety', deliverable: 'Digital Banking Safety Guide' },
            { weekNumber: 4, title: 'Recognizing Scams & Advertising Traps', objective: 'Identifying phishing links, fake lottery calls, and impulse triggers', deliverable: 'Scam Detection Checklist' },
          ],
          capstoneProject: {
            id: `proj_money_c${classNumber}`,
            trackId: 'track_life_money_management',
            classNumber,
            title: `Class ${classNumber} School Trip Budget & Consumer Decision Project`,
            brief: `Given a fictional budget of ₹1,200 for a 2-day school excursion, plan itemized spending on snacks, entrance fees, and personal souvenirs while preserving a ₹200 emergency buffer.`,
            realWorldContext: 'Budgeting with emergency buffers is how responsible adults manage travel and household finances.',
            deliverables: ['Itemized budget table with unit prices', 'Alternative trade-off analysis (what was cut and why)', 'Summary of scam-awareness rules for travel'],
            rubricCriteria: [
              { criterion: 'Financial Feasibility', weightPercentage: 40, masteryDescription: 'Stayed 100% within the ₹1,200 limit with a verified ₹200 emergency reserve' },
              { criterion: 'Value-Based Decision Making', weightPercentage: 35, masteryDescription: 'Selected items offering best quality and utility rather than brand hype' },
              { criterion: 'Emergency Preparedness', weightPercentage: 25, masteryDescription: 'Demonstrated sound rules for safeguarding money in public places' },
            ],
            estimatedHours: 6,
            difficulty: 'medium',
            status: 'verified',
          },
        }
      : {
          classSpecificTitle: 'Financial Planning, Investment Foundations & Cyber Fraud Defense',
          description: 'Master personal financial accounting, compound growth principles, inflation impact, consumer rights in India (MRP & BIS standards), and cybersecurity defenses.',
          realLifeScenario: 'Meera wanted to buy a high-end drawing tablet costing ₹4,500. Instead of taking loans or borrowing from friends, she needed a structured 6-month savings and income strategy.',
          workedExample: {
            title: 'Building a 6-Month Savings Strategy for a Major Goal',
            scenario: 'You need ₹4,500 in 6 months. Your monthly allowance is ₹800, and you can earn ₹300 monthly by tutoring a neighborhood child.',
            steps: [
              'Step 1: Total monthly cash inflow: ₹800 (allowance) + ₹300 (tutoring) = ₹1,100.',
              'Step 2: Monthly target savings: ₹4,500 / 6 months = ₹750/month required.',
              'Step 3: Allowed discretionary spending: ₹1,100 - ₹750 = ₹350/month for personal wants.',
              'Step 4: Safety buffer: Keep savings in a recurring bank account or separate envelope so it cannot be touched impulsively.',
              'Step 5: Review progress on the 1st of every month.',
            ],
            takeaway: 'Discipline and steady cash-flow planning enable you to achieve significant financial goals without debt.',
          },
          practicalActivity: {
            title: 'Consumer Rights & Product Label Audit',
            instructions: [
              'Inspect 3 packaged goods at home or a local shop.',
              'Check: Maximum Retail Price (MRP), Manufacturing Date, Expiry/Best Before Date, and FSSAI/ISI quality marks.',
              'Understand that charging above MRP is illegal in India under the Consumer Protection Act.',
            ],
            safeCheckNote: 'Never share banking passwords, OTPs, or credit card details with anyone, even people claiming to be bank officials.',
            deliverableDescription: 'A 3-product Consumer Protection Audit report detailing legal labeling standards.',
          },
          reflectionExercise: {
            promptQuestion: 'Why is compound interest called the "eighth wonder of the world" when saving early in life?',
            guidingPoints: [
              'Notice how interest earned on previous interest accelerates savings exponentially over years.',
              'Reflect on how starting a small savings habit at age 14 creates huge advantages over waiting until age 30.',
            ],
          },
          assessment: {
            question: 'A caller claiming to be from your family’s electricity board says your power will be disconnected in 30 minutes unless you immediately send ₹500 via a QR code they send on WhatsApp. What should you do?',
            contextScenario: 'The caller speaks aggressively and threatens immediate power cut.',
            options: [
              { id: 'opt_1', text: 'Scan the QR code immediately to prevent the power cut.', isCorrect: false, explanation: 'Scanning scam QR codes debits money from accounts.' },
              { id: 'opt_2', text: 'Recognize the urgent pressure tactic as a classic cyber scam. Hang up immediately, do not pay, and verify on the official state electricity utility portal with your parents.', isCorrect: true, explanation: 'Utility boards never demand immediate WhatsApp QR code payments under threat of 30-minute disconnection. This is a common fraud.' },
              { id: 'opt_3', text: 'Give them your parent’s debit card number instead.', isCorrect: false, explanation: 'Never give debit card numbers over phone calls.' },
              { id: 'opt_4', text: 'Beg them for extra time and apologize.', isCorrect: false, explanation: 'Apologizing to scammers encourages them to exploit you further.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'Scammers use false urgency and threats to panic victims into paying. Real utilities follow official postal notices and secure billing portals.',
          },
          learningOutcomes: [
            'Design multi-month savings blueprints with realistic cash flows and contingency buffers',
            'Understand inflation, compound growth, and basic low-risk savings mechanisms',
            'Exercise consumer rights: verify MRP, warranty cards, and legal return policies in India',
            'Identify and protect against digital financial fraud, phishing links, and deceptive subscriptions',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Cash Flow Management & Goal Sinking Funds', objective: 'Structuring recurring savings for major personal milestones', deliverable: '6-Month Goal Funding Model' },
            { weekNumber: 2, title: 'Inflation & Compound Growth Principles', objective: 'Understanding how purchasing power changes and why early saving matters', deliverable: 'Compound Growth Calculator Chart' },
            { weekNumber: 3, title: 'Indian Consumer Rights & Labeling Laws', objective: 'Verifying MRP, ISI/FSSAI marks, and consumer dispute procedures', deliverable: 'Consumer Protection Case Study' },
            { weekNumber: 4, title: 'Cyber Fraud Defense & Digital Banking Hygiene', objective: 'Recognizing phishing vectors, QR code scams, and OTP protection', deliverable: 'Family Financial Cyber Safety Protocol' },
          ],
          capstoneProject: {
            id: `proj_money_c${classNumber}`,
            trackId: 'track_life_money_management',
            classNumber,
            title: `Class ${classNumber} Comprehensive Financial Literacy & Family Cyber Safety Audit`,
            brief: `Build a 12-month personal financial model for high school goals and draft a complete Family Cyber Financial Security Checklist to protect against scams and phishing.`,
            realWorldContext: 'Financial literacy combined with cybersecurity awareness protects your hard-earned money in an increasingly digital world.',
            deliverables: ['12-month cash flow and savings forecast spreadsheet', '10-point Family Cyber Fraud Prevention Runbook', 'Analysis of consumer rights in everyday transactions'],
            rubricCriteria: [
              { criterion: 'Financial Rigor', weightPercentage: 40, masteryDescription: 'Realistic income/expense estimates with mathematically sound contingency reserves' },
              { criterion: 'Cybersecurity Thoroughness', weightPercentage: 35, masteryDescription: 'Identified real-world attack vectors (UPI spoofing, fake SMS, lottery phishing)' },
              { criterion: 'Practical Usability', weightPercentage: 25, masteryDescription: 'Family runbook is clear, actionable, and verified with parents' },
            ],
            estimatedHours: 8,
            difficulty: 'hard',
            status: 'verified',
          },
        }),
  }

  // --------------------------------------------------------------------------
  // 4. SAFETY, HEALTH & WELL-BEING
  // --------------------------------------------------------------------------
  const safetyTrack: ClassSkillTrackMeta = {
    id: 'track_life_safety_health',
    category: 'life_safety_health',
    title: 'Safety, Health & Well-being',
    classNumber,
    stage,
    stageLabel,
    lifeSkillStage,
    lifeSkillStageLabel,
    iconName: 'ShieldCheck',
    colorTheme: 'rose',
    level: lifeSkillStage === 'foundation_guided' ? 'foundation' : lifeSkillStage === 'developing_independence' ? 'intermediate' : 'advanced',
    whyItMatters: 'Knowing how to stay safe on the road, protect your personal boundaries, respond to emergencies, and maintain physical and mental well-being keeps you healthy and protected.',
    tools: ['Emergency Contact Card', 'First Aid Guidebook', 'Safe Touch Boundary Guide', 'Hydration & Sleep Chart'],
    reviewStatus: 'verified',
    ...(lifeSkillStage === 'foundation_guided'
      ? {
          classSpecificTitle: 'Road Safety, Personal Boundaries & Emergency Contacts',
          description: 'Master zebra-crossing rules, understand safe vs. unsafe touch, memorize family emergency phone numbers, and know what to do if separated in a public place.',
          realLifeScenario: 'Siddharth was at a crowded railway station with his mother. He stopped to look at a toy stall and suddenly could not see her in the crowd.',
          workedExample: {
            title: 'What to Do If You Get Lost in a Public Place',
            scenario: 'You lose sight of your caregiver in a busy shopping market or metro station. What are the 4 safe steps?',
            steps: [
              'Step 1: STOP walking immediately. Do not wander around or run outside into the parking lot or street.',
              'Step 2: Look for a uniformed security guard, station staff, or a shopkeeper inside a permanent store.',
              'Step 3: State your full name and your parent’s mobile phone number clearly: "I am separated from my mother. Please call her number: 98XXXXXXXX."',
              'Step 4: Stay right at that counter or help desk until your caregiver arrives. Never leave with a stranger.',
            ],
            takeaway: 'Staying in one safe place with a uniformed official brings your family back to you quickly.',
          },
          practicalActivity: {
            title: 'Family Emergency Contact Card Creation',
            instructions: [
              'Write down 3 trusted contact numbers: Parent 1, Parent 2, and 1 nearby relative/neighbor.',
              'Write your residential address landmark and blood group (verified with parents).',
              'Laminate or place the card inside your school bag pocket.',
            ],
            safeCheckNote: 'Never hand this card to strangers on the street; only show it to uniformed police, security, or school authorities in an emergency.',
            deliverableDescription: 'A completed, verified Family Emergency Contact Card placed in school bag.',
          },
          reflectionExercise: {
            promptQuestion: 'Who are 3 "trusted adults" in your life that you can always talk to if something makes you feel uncomfortable or scared?',
            guidingPoints: [
              'Trusted adults can be parents, grandparents, a favorite teacher, or the school counsellor.',
              'Remember: a trusted adult will never ask you to keep secrets about your body.',
            ],
          },
          assessment: {
            question: 'When crossing a busy road with no pedestrian traffic signal, what is the safest procedure?',
            contextScenario: 'You are on the pavement and need to cross to your school bus stop.',
            options: [
              { id: 'opt_1', text: 'Run as fast as you can through moving cars.', isCorrect: false, explanation: 'Running between moving cars causes fatal accidents.' },
              { id: 'opt_2', text: 'Find the nearest zebra crossing, stop at the curb, look right, look left, and look right again; cross only when cars have stopped.', isCorrect: true, explanation: 'Stopping at the curb and checking right-left-right ensures full visibility of oncoming vehicles before crossing calmly.' },
              { id: 'opt_3', text: 'Look at your phone while walking across.', isCorrect: false, explanation: 'Distracted walking on roads is extremely dangerous.' },
              { id: 'opt_4', text: 'Close your eyes and walk slowly.', isCorrect: false, explanation: 'Dangerous and unsafe.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'Stopping at the curb and looking right, left, and right again ensures all traffic has stopped before you step onto the road.',
          },
          learningOutcomes: [
            'Demonstrate safe road crossing procedures at zebra crossings and intersections',
            'Recite two primary caregiver phone numbers and residential landmark from memory',
            'Identify safe vs. unsafe physical boundaries and assertively say "No" to unwanted touch',
            'Execute safe procedures if separated from caregivers in a crowded public venue',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Road Safety & Traffic Awareness', objective: 'Mastering zebra crossings, footpath safety, and school bus rules', deliverable: 'Safe Pedestrian Badge' },
            { weekNumber: 2, title: 'Personal Boundaries & Body Safety', objective: 'Understanding private parts, safe touch, and trusting your gut feelings', deliverable: 'Trusted Adult Circle Diagram' },
            { weekNumber: 3, title: 'Emergency Contacts & Lost Protocols', objective: 'Memorizing key phone numbers and finding official help desks', deliverable: 'Laminated Emergency Contact Card' },
            { weekNumber: 4, title: 'Healthy Hygiene & Sleep Habits', objective: 'Handwashing protocols, tooth brushing, and 9-hour sleep schedules', deliverable: '7-Day Daily Wellness Tracker' },
          ],
          capstoneProject: {
            id: `proj_safety_c${classNumber}`,
            trackId: 'track_life_safety_health',
            classNumber,
            title: `Class ${classNumber} Home & Travel Safety Readiness Plan`,
            brief: `Create a comprehensive family safety plan: map 2 emergency exits in your home, test family emergency contact recall from memory, and assemble a safe travel checklist for school commutes.`,
            realWorldContext: 'Emergency preparedness saves lives and empowers children to stay calm and safe in any situation.',
            deliverables: ['Home emergency exit sketch verified with parents', '100% accurate emergency phone number oral recall test', 'Caregiver-signed safe commute safety checklist'],
            rubricCriteria: [
              { criterion: 'Emergency Recall Accuracy', weightPercentage: 40, masteryDescription: '100% accurate recall of 2 caregiver phone numbers and home address landmark' },
              { criterion: 'Boundary & Safety Understanding', weightPercentage: 35, masteryDescription: 'Clear understanding of trusted adults and safe vs unsafe physical boundaries' },
              { criterion: 'Practical Completeness', weightPercentage: 25, masteryDescription: 'Clean, legible emergency plan kept in school bag' },
            ],
            estimatedHours: 4,
            difficulty: 'easy',
            status: 'verified',
          },
        }
      : lifeSkillStage === 'developing_independence'
      ? {
          classSpecificTitle: 'Basic First-Aid, Stress Regulation & Digital Safety Hygiene',
          description: 'Learn basic first aid for minor cuts and burns, recognize bullying vs teasing, build healthy stress-relief habits, and maintain strong online privacy settings.',
          realLifeScenario: 'Pooja scraped her knee on the playground and it was bleeding lightly. Her friend wanted to rub mud on it, while Pooja panicked.',
          workedExample: {
            title: 'First-Aid Protocol for a Minor Scrape',
            scenario: 'A classmate falls on the gravel playground and has a minor bleeding scrape. What do you do?',
            steps: [
              'Step 1: Stay calm and guide the person to sit down in a clean, shaded area.',
              'Step 2: Wash your own hands, then clean the wound under gentle running tap water to remove dirt.',
              'Step 3: Press a clean tissue or sterile gauze lightly on the scrape for 2 minutes to stop bleeding.',
              'Step 4: Apply an adhesive bandage (Band-Aid) to keep dirt out.',
              'Step 5: Alert the school nurse or teacher immediately. Never put mud, ink, or unverified powders on open wounds.',
            ],
            takeaway: 'Clean water and gentle pressure are the universal first-aid steps for minor cuts.',
          },
          practicalActivity: {
            title: 'School & Home First-Aid Kit Audit',
            instructions: [
              'Inspect your home or classroom first-aid kit with an adult.',
              'Check for: sterile gauze, adhesive bandages, antiseptic liquid (Dettol/Savlon), medical tape, and clean scissors.',
              'Check expiry dates on antiseptic ointments and note any missing items.',
            ],
            safeCheckNote: 'Never take or administer oral medicines/tablets without explicit adult and doctor guidance.',
            deliverableDescription: 'A First-Aid Kit Checklist showing verified contents and emergency phone numbers.',
          },
          reflectionExercise: {
            promptQuestion: 'What is the difference between playful banter between friends and harmful bullying?',
            guidingPoints: [
              'Playful banter is mutual, both people laugh, and it stops immediately when one person says stop.',
              'Bullying involves an imbalance of power, is repeated, causes hurt, and continues despite discomfort.',
            ],
          },
          assessment: {
            question: 'Someone in your class WhatsApp group creates a fake meme making fun of a student’s appearance and shares it widely. What is the most ethical action?',
            contextScenario: 'Other classmates are laughing and adding emojis in the chat.',
            options: [
              { id: 'opt_1', text: 'Forward the meme to other groups so more people see it.', isCorrect: false, explanation: 'Forwarding cyberbullying makes you an active participant in harassment.' },
              { id: 'opt_2', text: 'Do not share or react to the meme; speak up in the group saying "This isn’t cool", and report the cyberbullying to a teacher or parent.', isCorrect: true, explanation: 'Refusing to forward, standing up for the victim, and alerting authorities stops cyberbullying.' },
              { id: 'opt_3', text: 'Post a nastier meme making fun of the bully.', isCorrect: false, explanation: 'Retaliatory cyberbullying worsens the toxic environment.' },
              { id: 'opt_4', text: 'Laugh along publicly even though you feel bad inside.', isCorrect: false, explanation: 'Peer pressure should never override your moral principles.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'Standing up against cyberbullying and alerting trusted authorities protects the victim and stops toxic group behavior.',
          },
          learningOutcomes: [
            'Perform safe first-aid procedures for minor scrapes, nosebleeds, and light burns',
            'Distinguish between healthy teasing and persistent bullying, knowing how to safely report it',
            'Practice evidence-based stress regulation techniques: box breathing and physical decompression',
            'Configure strong privacy settings and maintain digital boundaries on all online platforms',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Everyday First-Aid Protocols', objective: 'Cleaning scrapes, managing nosebleeds, and handling minor burns safely', deliverable: 'First-Aid Quick Action Guide' },
            { weekNumber: 2, title: 'Bullying Intervention & Bystander Courage', objective: 'Recognizing verbal/cyber bullying and reporting to school counsellors', deliverable: 'Safe Bystander Action Plan' },
            { weekNumber: 3, title: 'Stress & Emotional Regulation', objective: 'Using box breathing, physical exercise, and sleep to regulate anxiety', deliverable: 'Daily Emotional Balance Log' },
            { weekNumber: 4, title: 'Digital Privacy & Cyber Hygiene', objective: 'Configuring two-factor security and protecting personal photos/data', deliverable: 'Digital Security Audit' },
          ],
          capstoneProject: {
            id: `proj_safety_c${classNumber}`,
            trackId: 'track_life_safety_health',
            classNumber,
            title: `Class ${classNumber} Health, First-Aid & Digital Well-being Master Plan`,
            brief: `Assemble a verified personal First-Aid kit inspection, design an anti-cyberbullying classroom protocol, and track personal hydration and sleep metrics for 10 days.`,
            realWorldContext: 'Taking care of your physical body, mental calmness, and online safety builds resilience for life.',
            deliverables: ['Verified first-aid kit checklist with photos', 'Anti-cyberbullying peer support pledge', '10-day sleep and hydration tracking graph'],
            rubricCriteria: [
              { criterion: 'First-Aid Knowledge', weightPercentage: 40, masteryDescription: '100% safe, scientifically correct response to cuts, nosebleeds, and burns' },
              { criterion: 'Digital Safety Rigor', weightPercentage: 35, masteryDescription: 'Strong privacy rules, zero shared passwords, clear cyberbullying reporting protocol' },
              { criterion: 'Consistency & Follow-Through', weightPercentage: 25, masteryDescription: 'Completed 10 days of verified sleep and wellness tracking' },
            ],
            estimatedHours: 6,
            difficulty: 'medium',
            status: 'verified',
          },
        }
      : {
          classSpecificTitle: 'Emergency Crisis Response, Mental Resilience & Public Transit Safety',
          description: 'Master crisis protocols (fire, natural disasters, medical emergencies), independent public commute safety, managing exam anxiety, and advanced digital privacy defense.',
          realLifeScenario: 'A small electrical spark ignited a curtain in the school laboratory. Some students panicked and rushed to the doorway, blocking the exit.',
          workedExample: {
            title: 'Executing a Calm Emergency Evacuation',
            scenario: 'A fire alarm rings in a multi-story building. What is the disciplined evacuation protocol?',
            steps: [
              'Step 1: Stop work immediately. Do not stop to pack heavy school bags or search for personal items.',
              'Step 2: Follow designated green emergency exit signs; walk briskly in single file without running or pushing.',
              'Step 3: NEVER use elevators; use stairwells with handrails.',
              'Step 4: If smoke is present, stay low to the floor where air is cleaner.',
              'Step 5: Assemble at the designated open ground assembly point and stay with your teacher for headcounts.',
            ],
            takeaway: 'Discipline and orderly movement prevent stampedes and ensure everyone escapes safely.',
          },
          practicalActivity: {
            title: 'Public Commute & Safe Travel Route Map',
            instructions: [
              'Map your daily commute to school or coaching class (bus, metro, walk).',
              'Identify 3 "safe haven" locations along the route (e.g. police chowki, hospital, well-lit petrol pump, metro customer care).',
              'Know the national emergency helpline number in India: 112 (All Emergencies) and 1098 (Childline).',
            ],
            safeCheckNote: 'Always keep your phone charged to at least 30% before traveling independently.',
            deliverableDescription: 'A Commute Safety Route Map with designated emergency shelters and helpline numbers.',
          },
          reflectionExercise: {
            promptQuestion: 'When exam pressure or expectations feel overwhelming, how can you distinguish between productive motivation and destructive anxiety?',
            guidingPoints: [
              'Productive motivation leads to focused daily action and healthy sleep.',
              'Destructive anxiety leads to negative self-talk, loss of appetite, and despair. Discussing feelings with a counsellor or parent brings perspective.',
            ],
          },
          assessment: {
            question: 'You are travelling on a city bus and notice an unattended bag under a seat with wires visible. What is the correct protocol?',
            contextScenario: 'You are traveling alone to school in the morning.',
            options: [
              { id: 'opt_1', text: 'Open the bag to inspect what is inside.', isCorrect: false, explanation: 'Never touch suspicious unattended objects; they may be dangerous.' },
              { id: 'opt_2', text: 'Alert the bus conductor or driver immediately, move passengers away from the object, and call emergency helpline 112 at the next safe stop.', isCorrect: true, explanation: 'Informing transit authorities and emergency services without touching the item is the verified safety protocol.' },
              { id: 'opt_3', text: 'Ignore it and assume someone forgot their lunchbox.', isCorrect: false, explanation: 'Ignoring suspicious objects risks everyone’s safety.' },
              { id: 'opt_4', text: 'Take a selfie with the bag and post it on Instagram.', isCorrect: false, explanation: 'Reckless and dangerous behavior.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'Never touch suspicious unattended packages in public transit. Alert authorities immediately and keep a safe distance.',
          },
          learningOutcomes: [
            'Execute safe evacuation and communication during fire, electrical, or natural hazard emergencies',
            'Navigate public transit networks safely with situational awareness and designated emergency shelters',
            'Apply cognitive reframing and emotional regulation techniques during high-stakes exams',
            'Know national emergency response helplines (112, 1098) and protocols for immediate assistance',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Disaster Preparedness & Fire Evacuation', objective: 'Mastering fire extinguisher classification (A, B, C) and evacuation routes', deliverable: 'Home/School Evacuation Map' },
            { weekNumber: 2, title: 'Independent Commute & Situational Awareness', objective: 'Navigating bus/metro routes, identifying safe shelters, and emergency numbers', deliverable: 'Safe Travel Commute Guide' },
            { weekNumber: 3, title: 'Exam Anxiety & Cognitive Resilience', objective: 'Deconstructing catastrophizing thoughts and building study recovery habits', deliverable: 'Mental Resilience Toolkit' },
            { weekNumber: 4, title: 'Emergency First-Response Protocols (112)', objective: 'Communicating clearly with emergency dispatchers during critical crises', deliverable: 'Emergency Dispatcher Script' },
          ],
          capstoneProject: {
            id: `proj_safety_c${classNumber}`,
            trackId: 'track_life_safety_health',
            classNumber,
            title: `Class ${classNumber} Comprehensive Emergency Response & Crisis Navigation Plan`,
            brief: `Develop a comprehensive personal and neighborhood emergency action plan: detailed evacuation maps, public transit emergency protocols, and emergency medical dispatch communications.`,
            realWorldContext: 'Cool-headed preparation and verified safety protocols turn panic into life-saving action.',
            deliverables: ['Detailed Home & Commute Safety Dossier', 'Crisis Dispatcher Call Script tested with caregiver', 'Written review of personal resilience and stress coping mechanisms'],
            rubricCriteria: [
              { criterion: 'Emergency Protocol Accuracy', weightPercentage: 40, masteryDescription: 'Accurately articulated verified safety procedures for fire, transit, and medical crises' },
              { criterion: 'Situational Awareness', weightPercentage: 35, masteryDescription: 'Identified realistic public shelters and emergency communication channels' },
              { criterion: 'Clarity & Readiness', weightPercentage: 25, masteryDescription: 'Clean, accessible emergency binder accessible to the entire family' },
            ],
            estimatedHours: 8,
            difficulty: 'hard',
            status: 'verified',
          },
        }),
  }

  // --------------------------------------------------------------------------
  // 5. CRITICAL THINKING & EVERYDAY PROBLEM-SOLVING
  // --------------------------------------------------------------------------
  const criticalThinkingTrack: ClassSkillTrackMeta = {
    id: 'track_life_critical_thinking',
    category: 'life_critical_thinking',
    title: 'Critical Thinking & Everyday Problem-Solving',
    classNumber,
    stage,
    stageLabel,
    lifeSkillStage,
    lifeSkillStageLabel,
    iconName: 'Compass',
    colorTheme: 'amber',
    level: lifeSkillStage === 'foundation_guided' ? 'foundation' : lifeSkillStage === 'developing_independence' ? 'intermediate' : 'advanced',
    whyItMatters: 'Breaking complex problems into clear steps, comparing options before choosing, checking facts before believing rumors, and learning from mistakes are superpower skills for school and life.',
    tools: ['Problem Decomposition Tree', 'Fact-Checking Checklist', 'Pros and Cons Matrix', 'Decision Balance Scale'],
    reviewStatus: 'verified',
    ...(lifeSkillStage === 'foundation_guided'
      ? {
          classSpecificTitle: 'Step-by-Step Problem Solving & Checking Facts',
          description: 'Learn to break big daily problems into manageable pieces, compare consequences before deciding, verify information before sharing, and treat mistakes as learning stepping stones.',
          realLifeScenario: 'Kabir lost his house key on the school playground. Instead of panicking or crying, he sat down and retraced his steps from recess.',
          workedExample: {
            title: 'Retracing Steps to Solve a Lost Item Problem',
            scenario: 'You can’t find your library book that is due today. How do you solve this step-by-step?',
            steps: [
              'Step 1: Pause and take one slow, deep breath to stop feeling anxious.',
              'Step 2: Ask: "When did I last hold this book in my hands?" (Answer: Yesterday evening on the living room sofa).',
              'Step 3: Check that specific location thoroughly, including under cushions and between sofa cracks.',
              'Step 4: Check logical transit points: Did you put it inside your backpack front zipper or on the study table?',
              'Step 5: If not found, tell the librarian honestly and ask for two days to look before paying a fine.',
            ],
            takeaway: 'Calm, step-by-step thinking finds lost items much faster than frantic searching.',
          },
          practicalActivity: {
            title: 'Fact vs. Rumor Detective Game',
            instructions: [
              'Take 3 statements you heard in school or online (e.g. "Eating carrots gives you night vision", "School will be closed next Monday", "A special pencil makes you write faster").',
              'For each statement, ask: "Who told me this? Where is the proof? Did a verified school notice confirm it?"',
              'Classify each statement as Verified Fact, Unverified Rumor, or Exaggeration.',
            ],
            safeCheckNote: 'Never believe or forward shocking claims on WhatsApp or social media without an adult verifying them.',
            deliverableDescription: 'A 3-statement Fact vs. Rumor Investigation Table.',
          },
          reflectionExercise: {
            promptQuestion: 'Think about a recent mistake you made. What did that mistake teach you for next time?',
            guidingPoints: [
              'Mistakes are natural proof that you are trying new challenges.',
              'The only bad mistake is one you hide rather than learn from.',
            ],
          },
          assessment: {
            question: 'A friend tells you: "A boy in class 5 said tomorrow is a sudden holiday, so we don’t need to do our homework!" What is the most sensible action?',
            contextScenario: 'You would love a holiday, but no official message has come from school.',
            options: [
              { id: 'opt_1', text: 'Tear up your homework and play video games all evening.', isCorrect: false, explanation: 'Relying on unverified rumors causes disciplinary trouble.' },
              { id: 'opt_2', text: 'Ask your parent to check the official school app or class teacher notice; complete your homework as planned until officially confirmed.', isCorrect: true, explanation: 'Verifying with official sources before acting prevents missed homework.' },
              { id: 'opt_3', text: 'Call 10 friends and tell them tomorrow is definitely a holiday.', isCorrect: false, explanation: 'Spreading rumors causes confusion for other families.' },
              { id: 'opt_4', text: 'Get angry at your friend for telling you.', isCorrect: false, explanation: 'Reacting with anger is unnecessary; simply verify facts.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'Critical thinkers check official, primary sources before accepting rumors as truth.',
          },
          learningOutcomes: [
            'Break a real-life challenge into 3 manageable, sequential action steps',
            'Compare options and their consequences before making everyday choices',
            'Distinguish between verified facts and unproven playground rumors',
            'Reflect on mistakes constructively and identify adjustments for next time',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Breaking Big Problems into Little Steps', objective: 'Decomposing overwhelming chores and tasks into simple actions', deliverable: '3-Step Problem Solving Tree' },
            { weekNumber: 2, title: 'The Pros & Cons Balance Scale', objective: 'Weighing positive and negative outcomes before deciding', deliverable: 'Decision Matrix for 2 Choices' },
            { weekNumber: 3, title: 'The Junior Fact-Checker Badge', objective: 'Asking "How do we know?" before believing rumors', deliverable: 'Fact-Check Investigation Card' },
            { weekNumber: 4, title: 'Learning from Everyday Oops-Moments', objective: 'Reframing mistakes as diagnostic learning feedback', deliverable: 'My Learning Stepping Stone Journal' },
          ],
          capstoneProject: {
            id: `proj_critical_c${classNumber}`,
            trackId: 'track_life_critical_thinking',
            classNumber,
            title: `Class ${classNumber} Everyday Detective & Problem-Solver Portfolio`,
            brief: `Identify an everyday problem in your daily routine (e.g. lost stationery, messy desk, forgetting water bottles), apply the 4-step problem decomposition method, and test your solution for 5 days.`,
            realWorldContext: 'Good problem solvers don’t complain about friction; they design simple, practical solutions.',
            deliverables: ['Problem decomposition diagram showing root cause', '5-day solution testing log with before and after observations', 'Caregiver evaluation on how well the solution worked'],
            rubricCriteria: [
              { criterion: 'Root Cause Identification', weightPercentage: 40, masteryDescription: 'Correctly identified why the problem occurred rather than blaming bad luck' },
              { criterion: 'Practicality of Solution', weightPercentage: 35, masteryDescription: 'Designed a simple, realistic solution that was easy to sustain' },
              { criterion: 'Reflective Learning', weightPercentage: 25, masteryDescription: 'Demonstrated clear understanding of what worked and what was adjusted' },
            ],
            estimatedHours: 4,
            difficulty: 'easy',
            status: 'verified',
          },
        }
      : lifeSkillStage === 'developing_independence'
      ? {
          classSpecificTitle: 'Evidence Evaluation, Deceptive Advertising & Strategic Decision-Making',
          description: 'Evaluate evidence objectively, spot misleading advertising and online clickbait, make decisions under incomplete information, and conduct post-mortems on decisions.',
          realLifeScenario: 'A gaming advertisement claimed: "Download this free app to get 1,000 free coins in 10 seconds!" It asked for phone number and SMS OTP verification.',
          workedExample: {
            title: 'Deconstructing a Misleading Commercial Claim',
            scenario: 'An advertisement claims a drink will "make you grow 2 inches taller in 3 weeks and score 100% in math!" How do you analyze this critically?',
            steps: [
              'Step 1: Identify the extraordinary claim: Rapid height growth and perfect math scores.',
              'Step 2: Check scientific reality: Human height depends on genetics, sleep, and balanced nutrition over years, not a quick powder.',
              'Step 3: Check commercial motive: Who made the ad? A company selling a product for profit.',
              'Step 4: Check the fine print: Look for tiny text saying "*Results may vary. When combined with balanced diet and exercise."',
              'Step 5: Conclusion: It is an exaggerated marketing gimmick designed to appeal to student insecurities.',
            ],
            takeaway: 'When a claim sounds too miraculous to be true, it is almost certainly marketing hype.',
          },
          practicalActivity: {
            title: 'Advertisement Deconstruction Lab',
            instructions: [
              'Find an ad from a magazine, television, or online video platform.',
              'Answer 4 detective questions: (1) What product are they selling? (2) What emotion (fear, excitement, popularity) are they triggering? (3) What claim is exaggerated? (4) What fact are they hiding?',
              'Share your findings with a classmate or family member.',
            ],
            safeCheckNote: 'Never click on "Win Money" or "Free Game Diamonds" pop-ups.',
            deliverableDescription: 'A 1-page Commercial Deconstruction Report analyzing an advertisement.',
          },
          reflectionExercise: {
            promptQuestion: 'Why is it tempting to believe news that confirms what we already want to believe (confirmation bias)?',
            guidingPoints: [
              'Notice how good it feels when someone agrees with our pre-existing opinion.',
              'Critical thinkers actively seek out the strongest counter-argument to test their own thinking.',
            ],
          },
          assessment: {
            question: 'You have to choose between two school clubs that meet at the exact same time: Drama Club (which you love, but will take 4 hours of weekend practice) and Science Club (which you enjoy, and finishes during school hours). Exam season starts next month. What is the most structured way to decide?',
            contextScenario: 'You cannot attend both clubs and must submit your choice today.',
            options: [
              { id: 'opt_1', text: 'Flip a coin and let luck decide your school year.', isCorrect: false, explanation: 'Flipping coins ignores consequences on your study schedule and stress levels.' },
              { id: 'opt_2', text: 'List pros, cons, and time commitments for both; evaluate your upcoming exam schedule and choose the club that balances passion with realistic academic hours.', isCorrect: true, explanation: 'A structured criteria-based decision matrix balances personal interest with realistic time commitments.' },
              { id: 'opt_3', text: 'Register for both anyway and skip meetings alternately without telling the teachers.', isCorrect: false, explanation: 'Being unreliable hurts both clubs and damages your reputation.' },
              { id: 'opt_4', text: 'Refuse to join any club and sulk.', isCorrect: false, explanation: 'Sulking misses out on valuable extracurricular growth.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'Weighing time commitments against upcoming exam priorities ensures you make sustainable choices without regret.',
          },
          learningOutcomes: [
            'Deconstruct advertising claims to identify emotional triggers and exaggerated promises',
            'Apply structured criteria-based matrices to make balanced personal decisions',
            'Cross-examine news stories across 2 independent sources before accepting as fact',
            'Perform a constructive 5-minute post-mortem after an unexpected setback',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'The Advertising Detective', objective: 'Spotting emotional persuasion, fine print, and exaggerated marketing', deliverable: 'Advertisement Deconstruction Brief' },
            { weekNumber: 2, title: 'Decision Matrices & Trade-Off Analysis', objective: 'Ranking choices using weighted criteria (time, cost, enjoyment)', deliverable: 'Club/Subject Decision Matrix' },
            { weekNumber: 3, title: 'Spotting Online Clickbait & Misinformation', objective: 'Verifying headlines, source citations, and manipulated images', deliverable: 'Clickbait Teardown Log' },
            { weekNumber: 4, title: 'The Learning Post-Mortem', objective: 'Analyzing why a plan failed and extracting 3 concrete adjustments', deliverable: 'Project Failure Analysis Case' },
          ],
          capstoneProject: {
            id: `proj_critical_c${classNumber}`,
            trackId: 'track_life_critical_thinking',
            classNumber,
            title: `Class ${classNumber} Consumer & Information Fact-Checking Dossier`,
            brief: `Investigate a viral claim or popular consumer product: analyze marketing assertions against verified scientific data, evaluate evidence sources, and publish a balanced 2-page Consumer Advisory Brief.`,
            realWorldContext: 'Critical thinkers protect themselves and their families from financial scams and health misinformation.',
            deliverables: ['2-page Consumer Fact-Check Advisory Brief', 'Evidence credibility comparison table (3 independent sources)', 'Reflection on personal cognitive biases encountered'],
            rubricCriteria: [
              { criterion: 'Evidence Verification', weightPercentage: 40, masteryDescription: 'Cited verified scientific/authoritative sources rather than unverified blogs' },
              { criterion: 'Logical Rigor', weightPercentage: 35, masteryDescription: 'Separated emotional marketing claims from empirical facts with zero bias' },
              { criterion: 'Clarity of Advice', weightPercentage: 25, masteryDescription: 'Provided clear, actionable guidance for families and classmates' },
            ],
            estimatedHours: 6,
            difficulty: 'medium',
            status: 'verified',
          },
        }
      : {
          classSpecificTitle: 'Systemic Thinking, Cognitive Biases & Multi-Variable Decision Analysis',
          description: 'Master first-principles thinking, identify cognitive biases (sunk cost fallacy, confirmation bias), make decisions under high ambiguity, and conduct root-cause audits.',
          realLifeScenario: 'A student had spent 3 months practicing for a competition they no longer enjoyed and felt burned out, but refused to switch because "I already invested so much time."',
          workedExample: {
            title: 'Overcoming the Sunk Cost Fallacy',
            scenario: 'You bought a ₹300 movie ticket, but 20 minutes in, the movie is violent, upsetting, and poorly made. What is the rational decision?',
            steps: [
              'Step 1: Recognize the sunk cost: The ₹300 is gone forever whether you stay or leave.',
              'Step 2: Evaluate the current choice: (A) Suffer for 2 more hours, or (B) Leave and spend 2 hours doing something enjoyable or productive.',
              'Step 3: Recognize the trap: Staying does not bring your ₹300 back; it only wastes 2 valuable hours of your life.',
              'Step 4: Rational action: Walk out calmly without regret. Your future time has value.',
            ],
            takeaway: 'Never let past unrecoverable investments trap you into making poor future decisions.',
          },
          practicalActivity: {
            title: 'Cognitive Bias Identification Audit',
            instructions: [
              'Review 3 major real-life decisions you or your peers made this year.',
              'Check for: (1) Sunk Cost Fallacy, (2) Bandwagon Effect ("everyone is doing it"), (3) Availability Bias ("I just saw it on the news so it must be common").',
              'Document how recognizing the bias would improve future choices.',
            ],
            safeCheckNote: 'Practice objective self-honesty without harsh self-criticism.',
            deliverableDescription: 'A 3-Case Cognitive Bias Analysis Portfolio with corrective decision frameworks.',
          },
          reflectionExercise: {
            promptQuestion: 'Why is changing your mind in the face of new verified evidence a sign of strength rather than inconsistency?',
            guidingPoints: [
              'Notice how dogmatic people cling to opinions even when proven wrong.',
              'Reflect on how world-class scientists and leaders update their views when facts change.',
            ],
          },
          assessment: {
            question: 'You are leading a school committee that has spent 2 weeks organizing an outdoor picnic. The weather forecast now shows a 90% chance of severe thunderstorms. What is the most rational decision?',
            contextScenario: 'Committee members complain: "We worked so hard on the outdoor banners! We can’t cancel now!"',
            options: [
              { id: 'opt_1', text: 'Go ahead with the outdoor picnic anyway to not waste the banners.', isCorrect: false, explanation: 'This is the sunk cost fallacy; risking children’s safety in thunderstorms to honor banners is dangerous.' },
              { id: 'opt_2', text: 'Pivot immediately to an indoor venue or reschedule: safety and comfort take precedence over already-printed banners.', isCorrect: true, explanation: 'Rational leaders prioritize safety and adapt to new evidence without succumbing to the sunk cost fallacy.' },
              { id: 'opt_3', text: 'Blame the meteorologists and tell everyone to bring umbrellas.', isCorrect: false, explanation: 'Severe thunderstorms carry lightning hazards that umbrellas cannot mitigate.' },
              { id: 'opt_4', text: 'Resign from the committee in frustration.', isCorrect: false, explanation: 'Avoidance avoids the responsibility of leadership.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'Prioritizing participant safety over already-spent effort avoids the sunk cost fallacy and demonstrates mature leadership.',
          },
          learningOutcomes: [
            'Detect and neutralize cognitive traps: sunk cost fallacy, bandwagon effect, and confirmation bias',
            'Conduct root-cause analyses using the "5 Whys" framework to resolve persistent problems',
            'Model second- and third-order consequences before executing strategic choices',
            'Facilitate structured decision meetings using objective decision trees and probability weighting',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Cognitive Biases & Mental Blindspots', objective: 'Identifying confirmation bias, availability heuristics, and herd mentality', deliverable: 'Mental Blindspot Audit Sheet' },
            { weekNumber: 2, title: 'The "5 Whys" Root Cause Analysis', objective: 'Digging beneath surface symptoms to identify structural problems', deliverable: 'Root Cause Investigation Tree' },
            { weekNumber: 3, title: 'Second-Order Thinking & Unintended Consequences', objective: 'Predicting how actions ripple through social and academic systems', deliverable: 'Consequence Ripple Map' },
            { weekNumber: 4, title: 'Decisions Under High Uncertainty', objective: 'Making sound choices with incomplete data using expected value frameworks', deliverable: 'Strategic Decision Playbook' },
          ],
          capstoneProject: {
            id: `proj_critical_c${classNumber}`,
            trackId: 'track_life_critical_thinking',
            classNumber,
            title: `Class ${classNumber} Strategic Decision-Making & Systems Problem-Solving Case Study`,
            brief: `Analyze a complex community or school operational challenge (e.g. food waste in cafeteria, congestion at school gates), conduct a root-cause 5-Whys audit, and present a viable multi-stakeholder solution.`,
            realWorldContext: 'Consultants and civic leaders solve systemic problems by diagnosing root causes rather than treating surface symptoms.',
            deliverables: ['Systems Problem Diagnostic Report with 5-Whys diagram', 'Second-order consequence impact evaluation', 'Executive recommendation memo for school administration'],
            rubricCriteria: [
              { criterion: 'Diagnostic Depth', weightPercentage: 40, masteryDescription: 'Identified root structural causes rather than superficial complaints' },
              { criterion: 'Consequence Modeling', weightPercentage: 35, masteryDescription: 'Anticipated second-order effects on students, teachers, and staff' },
              { criterion: 'Implementation Viability', weightPercentage: 25, masteryDescription: 'Solution is realistic, cost-effective, and actionable' },
            ],
            estimatedHours: 8,
            difficulty: 'hard',
            status: 'verified',
          },
        }),
  }

  // --------------------------------------------------------------------------
  // 6. SOCIAL SKILLS, EMPATHY & TEAMWORK
  // --------------------------------------------------------------------------
  const socialTrack: ClassSkillTrackMeta = {
    id: 'track_life_social_teamwork',
    category: 'life_social_teamwork',
    title: 'Social Skills, Empathy & Teamwork',
    classNumber,
    stage,
    stageLabel,
    lifeSkillStage,
    lifeSkillStageLabel,
    iconName: 'Users',
    colorTheme: 'purple',
    level: lifeSkillStage === 'foundation_guided' ? 'foundation' : lifeSkillStage === 'developing_independence' ? 'intermediate' : 'advanced',
    whyItMatters: 'Working well in teams, respecting differences, sharing responsibilities fairly, handling peer pressure, and supporting classmates build healthy friendships and community trust.',
    tools: ['Team Role Matrix', 'Empathy Perspective Cards', 'Peer Pressure Shield', 'Fair Share Task Board'],
    reviewStatus: 'verified',
    ...(lifeSkillStage === 'foundation_guided'
      ? {
          classSpecificTitle: 'Taking Turns, Sharing Fairly & Understanding Others',
          description: 'Learn to take turns patiently during games, share supplies, recognize how classmates feel through facial cues, and apologize sincerely when mistakes happen.',
          realLifeScenario: 'During art class, there was only one set of glitter pens. Two students grabbed it at the same time and began pulling.',
          workedExample: {
            title: 'How to Share Limited Supplies Fairly',
            scenario: 'Two of you want to use the blue paint at the same time. How do you resolve it peacefully?',
            steps: [
              'Step 1: Put the paint bottle down on the desk so neither person is pulling.',
              'Step 2: Agree on a timer or section split: "You use the blue paint for your sky for 5 minutes while I color my trees with green. Then we swap."',
              'Step 3: Keep your promise: when the 5 minutes are up, hand the bottle over with a smile.',
              'Step 4: Say thank you when you receive the paint.',
            ],
            takeaway: 'Taking turns ensures everyone gets what they need without fighting or ruined artwork.',
          },
          practicalActivity: {
            title: 'The Empathy Facial Expression Detective',
            instructions: [
              'Look at 4 drawings or photos of faces showing: Happy, Anxious, Left Out, Frustrated.',
              'Describe what might have caused that feeling and what one kind sentence you could say to help them.',
              'Practice making a sincere apology: "I’m sorry I accidentally knocked your pencil box. Let me help you pick them up."',
            ],
            safeCheckNote: 'Kindness is a muscle that grows stronger every time you use it.',
            deliverableDescription: 'An Empathy Action Card showing 3 supportive actions for classmates.',
          },
          reflectionExercise: {
            promptQuestion: 'How does it feel when you are sitting alone and someone invites you to join their game?',
            guidingPoints: [
              'Reflect on the relief and happiness of being included.',
              'Look around your class tomorrow for anyone sitting alone at recess and invite them over.',
            ],
          },
          assessment: {
            question: 'You accidentally bump into a classmate in the corridor, and their water bottle falls and leaks. What is the most responsible action?',
            contextScenario: 'It was completely an accident, and the bell for class is ringing.',
            options: [
              { id: 'opt_1', text: 'Run away quickly so nobody blames you.', isCorrect: false, explanation: 'Running away shows cowardice and leaves your classmate in distress.' },
              { id: 'opt_2', text: 'Laugh and say they should have held it tighter.', isCorrect: false, explanation: 'Cruel and unkind behavior.' },
              { id: 'opt_3', text: 'Stop immediately, apologize sincerely: "I’m so sorry, it was an accident. Are you okay?", and help them pick up the bottle and wipe the spill.', isCorrect: true, explanation: 'Taking responsibility for accidental damage with sincere apologies and practical help is the hallmark of good character.' },
              { id: 'opt_4', text: 'Blame someone else who was walking behind you.', isCorrect: false, explanation: 'Dishonest deflection is wrong.' },
            ],
            correctOptionId: 'opt_3',
            reasoningFeedback: 'True responsibility means owning accidents immediately, apologizing sincerely, and helping fix the mess.',
          },
          learningOutcomes: [
            'Take turns during games and group tasks without frustration or tantrums',
            'Identify emotions in peers and respond with empathetic, supportive language',
            'Deliver sincere, 3-part apologies when accidental mistakes cause disruption',
            'Include peers who are sitting alone during lunch and recess activities',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Taking Turns & Fair Sharing Protocols', objective: 'Solving limited-supply deadlocks with timers and turn-taking', deliverable: 'Fair Share Playground Agreement' },
            { weekNumber: 2, title: 'The Empathy Detective: Reading Body Language', objective: 'Recognizing sadness and exclusion in classmates', deliverable: 'Empathy Action Portfolio' },
            { weekNumber: 3, title: 'The 3-Part Sincere Apology', objective: 'Admitting mistakes, apologizing sincerely, and fixing damage', deliverable: 'Apology & Repair Practice Sheet' },
            { weekNumber: 4, title: 'Including Others at Recess', objective: 'Noticing isolated classmates and extending warm invitations', deliverable: 'Recess Kindness Log' },
          ],
          capstoneProject: {
            id: `proj_social_c${classNumber}`,
            trackId: 'track_life_social_teamwork',
            classNumber,
            title: `Class ${classNumber} Playground Kindness & Inclusion Champion`,
            brief: `Design and carry out a 5-day Kindness & Fair Play challenge: invite an isolated student to play, resolve a sharing disagreement fairly, and practice sincere apologies.`,
            realWorldContext: 'Friendship and cooperation are the building blocks of a happy school and community.',
            deliverables: ['5-Day Kindness Action Log verified by teacher or caregiver', 'Illustrated Kindness in Action poster', 'One-paragraph reflection on how sharing changed the classroom mood'],
            rubricCriteria: [
              { criterion: 'Demonstrated Empathy', weightPercentage: 40, masteryDescription: 'Actively noticed and included peers who felt left out' },
              { criterion: 'Fair Conflict Resolution', weightPercentage: 35, masteryDescription: 'Shared supplies using calm turn-taking rather than arguing' },
              { criterion: 'Sincerity & Humility', weightPercentage: 25, masteryDescription: 'Apologized readily for mistakes without making excuses' },
            ],
            estimatedHours: 4,
            difficulty: 'easy',
            status: 'verified',
          },
        }
      : lifeSkillStage === 'developing_independence'
      ? {
          classSpecificTitle: 'Teamwork Roles, Constructive Feedback & Resisting Peer Pressure',
          description: 'Divide project tasks fairly based on strengths, give constructive peer feedback without hurting feelings, stand firm against negative peer pressure, and respect cultural differences.',
          realLifeScenario: 'In a group science project, one student did all the research while two students chatted, and everyone wanted equal credit.',
          workedExample: {
            title: 'Setting Up a Fair Team Responsibility Matrix',
            scenario: 'You have a 4-person group project on Indian ecosystems due in 2 weeks. How do you divide work fairly?',
            steps: [
              'Step 1: Break project into 4 equal roles: (1) Research & Fact-finding, (2) Script & Written Content, (3) Chart & Visual Design, (4) Presentation & Q&A Lead.',
              'Step 2: Match roles to strengths and preferences through mutual discussion.',
              'Step 3: Set intermediate deadlines: Draft due on Day 5, Review on Day 9, Final Polish on Day 12.',
              'Step 4: Check in for 5 minutes at the start of every session: "Is anyone stuck and needing help?"',
              'Step 5: Hold each other accountable kindly: If someone is lagging, offer assistance before escalating to the teacher.',
            ],
            takeaway: 'Clear roles and shared deadlines prevent resentment and make teamwork enjoyable.',
          },
          practicalActivity: {
            title: 'Resisting Peer Pressure: The "Broken Record" Technique',
            instructions: [
              'Practice saying NO firmly to peer pressure (e.g. skipping class, teasing someone, sharing homework answers).',
              'Formula: State boundary + Short reason + Alternative offer ("No thanks, I don’t want to get in trouble. Let’s play basketball instead.").',
              'Repeat the core boundary calmly like a broken record if pressed.',
            ],
            safeCheckNote: 'Never compromise personal integrity or safety to fit into a social group.',
            deliverableDescription: 'A 3-scenario Peer Pressure Shield practice script with mentor sign-off.',
          },
          reflectionExercise: {
            promptQuestion: 'Why do people sometimes join in teasing a classmate even when they know inside it is wrong?',
            guidingPoints: [
              'Recognize the fear of being targeted yourself if you don’t join the crowd.',
              'Reflect on the quiet courage it takes to say: "Hey, leave them alone."',
            ],
          },
          assessment: {
            question: 'Your friends dare you to take a photo of an exam paper from the teacher’s desk when the room is empty. What is the most courageous response?',
            contextScenario: 'They say: "Come on, don’t be a coward! Everyone will think you’re a legend!"',
            options: [
              { id: 'opt_1', text: 'Do it so they don’t call you a coward.', isCorrect: false, explanation: 'Stealing exam papers is academic fraud and leads to suspension.' },
              { id: 'opt_2', text: 'Say firmly: "No, that’s cheating and could get us expelled. I’m not doing it, and you shouldn’t either."', isCorrect: true, explanation: 'Standing firm against unethical peer pressure protects your future and sets a moral standard.' },
              { id: 'opt_3', text: 'Stand outside as a lookout while someone else takes it.', isCorrect: false, explanation: 'Acting as an accomplice is equally guilty.' },
              { id: 'opt_4', text: 'Lie that your leg hurts and run away.', isCorrect: false, explanation: 'A direct, firm "No" is more powerful and stops the pressure.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'True courage is standing up for ethical principles when peers pressure you to do something wrong.',
          },
          learningOutcomes: [
            'Divide group responsibilities fairly using transparent accountability matrices',
            'Resist negative peer pressure using assertive, calm verbal boundaries',
            'Deliver constructive peer reviews using the "Commend, Recommend, Commend" technique',
            'Demonstrate respect and inclusion for students from diverse backgrounds and abilities',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'The Fair Team Responsibility Matrix', objective: 'Dividing tasks, setting milestone deadlines, and peer check-ins', deliverable: 'Team Charter & Accountability Board' },
            { weekNumber: 2, title: 'The Peer Pressure Shield', objective: 'Mastering the broken-record technique and confident refusal', deliverable: 'Boundary Defense Role-Play Script' },
            { weekNumber: 3, title: 'Constructive Critique & Feedback Etiquette', objective: 'Improving peer work without destructive criticism', deliverable: 'Peer Review Critique Matrix' },
            { weekNumber: 4, title: 'Cross-Cultural Respect & Inclusive Teamwork', objective: 'Embracing diverse viewpoints and accommodating all abilities', deliverable: 'Inclusive Collaboration Charter' },
          ],
          capstoneProject: {
            id: `proj_social_c${classNumber}`,
            trackId: 'track_life_social_teamwork',
            classNumber,
            title: `Class ${classNumber} Collaborative Group Charter & Peer Accountability System`,
            brief: `Organize a multi-member group project charter for an upcoming school topic: define explicit role assignments, fair contribution tracking, and a peer pressure resilience playbook.`,
            realWorldContext: 'High-performing teams succeed because they establish clear expectations and mutual respect from Day 1.',
            deliverables: ['Team charter document signed by all group participants', 'Peer contribution tracking ledger with weekly milestone checks', 'Personal reflection on navigating disagreements without conflict'],
            rubricCriteria: [
              { criterion: 'Equitable Role Distribution', weightPercentage: 40, masteryDescription: 'All participants assigned balanced, meaningful responsibilities matching strengths' },
              { criterion: 'Conflict Prevention Protocols', weightPercentage: 35, masteryDescription: 'Clear, documented mechanisms to resolve disagreements and uneven workloads' },
              { criterion: 'Accountability & Integrity', weightPercentage: 25, masteryDescription: 'Honest, evidence-based reflection on group dynamics' },
            ],
            estimatedHours: 6,
            difficulty: 'medium',
            status: 'verified',
          },
        }
      : {
          classSpecificTitle: 'Team Leadership, Mediating Group Disputes & Ethical Influence',
          description: 'Lead teams with emotional intelligence, mediate disputes between peers, build consensus across divergent viewpoints, and exercise positive social influence.',
          realLifeScenario: 'Two rival factions in the school sports house refused to cooperate on the annual sports day march-past choreography.',
          workedExample: {
            title: 'Mediating a Bitter Factional Dispute',
            scenario: 'How does a student leader mediate a deadlock between two entrenched groups?',
            steps: [
              'Step 1: Separate the people from the problem: Refuse to entertain personal insults.',
              'Step 2: Establish common ground: "Both groups care deeply about our house winning the overall trophy."',
              'Step 3: Solicit independent proposals in writing before meeting face to face.',
              'Step 4: Create a combined routine incorporating the best 50% of both concepts.',
              'Step 5: Celebrate collective effort publicly rather than declaring a "winning" faction.',
            ],
            takeaway: 'True leaders do not take sides; they build a bigger vision that includes everyone.',
          },
          practicalActivity: {
            title: 'Peer Mediation Simulation Protocol',
            instructions: [
              'Conduct a mock mediation session with 2 classmates simulating a common conflict (e.g. sharing credit for a successful event).',
              'Act as the neutral mediator: enforce equal speaking time, summarize each party’s core need, and guide them to craft their own compromise.',
              'Document the agreed settlement and review its durability after 3 days.',
            ],
            safeCheckNote: 'Never attempt to mediate physical violence; immediately summon adult school authorities.',
            deliverableDescription: 'A documented Peer Mediation Case Summary showing conflict diagnosis and agreed resolution.',
          },
          reflectionExercise: {
            promptQuestion: 'What distinguishes a genuine leader from someone who merely bosses people around?',
            guidingPoints: [
              'Bossing relies on fear, volume, and demanding authority.',
              'Genuine leadership inspires trust, rolls up sleeves to help with hard work, and gives credit to the team.',
            ],
          },
          assessment: {
            question: 'You are team leader, and one group member has failed to deliver their section 24 hours before submission. How should you handle it?',
            contextScenario: 'Other members want to remove their name from the report in anger.',
            options: [
              { id: 'opt_1', text: 'Publicly humiliate them in the class group chat.', isCorrect: false, explanation: 'Public shaming destroys morale and is unprofessional.' },
              { id: 'opt_2', text: 'Reach out privately: check if they are facing a crisis, evaluate what is salvageable, rally the team to complete the gap, and report the contribution breakdown transparently to the teacher.', isCorrect: true, explanation: 'Empathetic inquiry paired with transparent contribution reporting resolves the emergency while upholding fairness.' },
              { id: 'opt_3', text: 'Do nothing and let the entire team fail.', isCorrect: false, explanation: 'Passive leadership harms everyone.' },
              { id: 'opt_4', text: 'Do their work secretly and pretend they contributed equally.', isCorrect: false, explanation: 'Dishonest enablement does not help the person learn responsibility.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'A true leader checks privately for underlying emergencies, ensures team deliverables succeed, and communicates contribution reality objectively.',
          },
          learningOutcomes: [
            'Mediate peer deadlocks using principled negotiation and de-escalation techniques',
            'Inspire collaborative accountability without resorting to authoritarian pressure',
            'Navigate complex social hierarchies and resist toxic groupthink',
            'Exercise ethical leadership that gives credit to team members and takes responsibility for mistakes',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'The Emotionally Intelligent Leader', objective: 'Leading by example, active listening, and building psychological safety', deliverable: 'Leadership Philosophy Manifesto' },
            { weekNumber: 2, title: 'Peer Mediation & Conflict Neutralization', objective: 'Guiding entrenched parties toward mutually beneficial compromises', deliverable: 'Mediation Settlement Protocol' },
            { weekNumber: 3, title: 'Countering Groupthink & Moral Cowardice', objective: 'Fostering healthy dissent and moral courage in group decision-making', deliverable: 'Anti-Groupthink Defense Model' },
            { weekNumber: 4, title: 'Consensus Building in Complex Coalitions', objective: 'Synthesizing competing agendas into unified community progress', deliverable: 'Coalition Consensus Blueprint' },
          ],
          capstoneProject: {
            id: `proj_social_c${classNumber}`,
            trackId: 'track_life_social_teamwork',
            classNumber,
            title: `Class ${classNumber} Peer Mediation & Team Leadership Master Portfolio`,
            brief: `Design and lead a collaborative initiative (e.g. school recycling campaign, peer tutoring roster, sports tournament organization) involving at least 6 peers, documenting team delegation, conflict resolution, and shared achievements.`,
            realWorldContext: 'Leadership is the capacity to translate vision into shared reality through empathy and disciplined organization.',
            deliverables: ['Project delegation framework with role milestones', 'Documentation of at least 1 resolved conflict or roadblock', 'Anonymous team feedback evaluation on your leadership style'],
            rubricCriteria: [
              { criterion: 'Empathetic Delegation', weightPercentage: 40, masteryDescription: 'Assigned roles matching peer strengths; supported struggling members proactively' },
              { criterion: 'Conflict Neutralization', weightPercentage: 35, masteryDescription: 'Resolved differences smoothly without hostility or alienation' },
              { criterion: 'Team Engagement', weightPercentage: 25, masteryDescription: 'High positive peer feedback on communication, fairness, and encouragement' },
            ],
            estimatedHours: 8,
            difficulty: 'hard',
            status: 'verified',
          },
        }),
  }

  // --------------------------------------------------------------------------
  // 7. STUDY SKILLS & LEARNING INDEPENDENCE
  // --------------------------------------------------------------------------
  const studyTrack: ClassSkillTrackMeta = {
    id: 'track_life_study_skills',
    category: 'life_study_skills',
    title: 'Study Skills & Learning Independence',
    classNumber,
    stage,
    stageLabel,
    lifeSkillStage,
    lifeSkillStageLabel,
    iconName: 'BookOpen',
    colorTheme: 'sky',
    level: lifeSkillStage === 'foundation_guided' ? 'foundation' : lifeSkillStage === 'developing_independence' ? 'intermediate' : 'advanced',
    whyItMatters: 'Knowing how to study effectively, take useful notes, prepare for exams without panic, and learn from mistakes makes school enjoyable and builds self-confidence.',
    tools: ['Feynman Concept Cards', 'Cornell Note Sheets', 'Active Recall Flashcards', 'Pomodoro Timer'],
    reviewStatus: 'verified',
    ...(lifeSkillStage === 'foundation_guided'
      ? {
          classSpecificTitle: 'Planning Homework, Reading Instructions & Calm Test Preparation',
          description: 'Learn to read exam questions carefully, use highlighters for key words, take short focused 20-minute study blocks, and prepare for tests without last-minute panic.',
          realLifeScenario: 'Manav lost 8 marks on his Science test not because he didn’t know the answers, but because he didn’t read the instruction: "Choose TWO correct options."',
          workedExample: {
            title: 'The "Read Twice, Underline Once" Rule',
            scenario: 'You see an exam question: "Name two differences between solids and liquids and give one example of each."',
            steps: [
              'Step 1: Read the entire question once without picking up your pen.',
              'Step 2: Read it a second time and underline the action items: TWO differences, ONE example of EACH.',
              'Step 3: Count the required parts: 2 differences + 1 solid example + 1 liquid example = 4 total things to write.',
              'Step 4: Write your answer in clean bullet points.',
              'Step 5: Re-read your answer and tick off the 4 parts to guarantee 100% completeness.',
            ],
            takeaway: 'Underlining question instructions guarantees you never lose easy marks from rushing.',
          },
          practicalActivity: {
            title: 'The 20-Minute Focus Pomodoro Test',
            instructions: [
              'Set a timer for 20 minutes.',
              'Work on one single homework assignment (e.g. 5 math problems) with zero distractions.',
              'When the timer rings, take a mandatory 5-minute stretch and water break.',
              'Notice how much faster you finish compared to studying with distractions.',
            ],
            safeCheckNote: 'Take regular eye breaks: look at something 20 feet away for 20 seconds.',
            deliverableDescription: 'A completed 3-Session Pomodoro Focus Log with time stamps.',
          },
          reflectionExercise: {
            promptQuestion: 'When you get an exam paper back, do you look only at the marks, or do you examine the mistakes to see what to fix?',
            guidingPoints: [
              'Marks are in the past; mistakes tell you exactly what concept needs 10 minutes of practice.',
              'Reviewing errors transforms a B grade into an A grade next time.',
            ],
          },
          assessment: {
            question: 'What is the most effective way to prepare for a spelling or formula test 3 days away?',
            contextScenario: 'You have 15 challenging words or math formulas to remember.',
            options: [
              { id: 'opt_1', text: 'Do nothing until 10:00 PM the night before, then stare at the book for 3 hours.', isCorrect: false, explanation: 'Late-night passive staring leads to exhaustion and memory blanks during the test.' },
              { id: 'opt_2', text: 'Practice 5 words each day using active flashcards (test yourself, write from memory, check mistakes).', isCorrect: true, explanation: 'Spaced repetition over 3 days embeds information securely in long-term memory.' },
              { id: 'opt_3', text: 'Put the book under your pillow while sleeping.', isCorrect: false, explanation: 'Myths do not transfer knowledge into your brain.' },
              { id: 'opt_4', text: 'Write the answers on your palm.', isCorrect: false, explanation: 'Cheating is dishonest and carries severe disciplinary penalties.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'Active recall and spaced practice over multiple days build permanent memory without test anxiety.',
          },
          learningOutcomes: [
            'Read and annotate multi-part exam instructions accurately without rushing',
            'Execute 20-minute focused study sessions with zero digital or environmental distractions',
            'Create active recall flashcards for vocabulary, definitions, and core formulas',
            'Conduct a 10-minute post-exam error audit to correct misconceptions immediately',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'The "Read Twice, Underline Once" Technique', objective: 'Deconstructing test prompts and multi-part instructions', deliverable: 'Annotated Exam Prompt Worksheet' },
            { weekNumber: 2, title: 'The 20-Minute Focus Timer Routine', objective: 'Mastering single-task concentration and structured breaks', deliverable: 'Pomodoro Focus Session Log' },
            { weekNumber: 3, title: 'Active Flashcards & Self-Testing', objective: 'Testing memory from recall rather than passive re-reading', deliverable: '20 Active Recall Flashcards' },
            { weekNumber: 4, title: 'The Post-Test Mistake Audit', objective: 'Transforming test errors into diagnostic learning milestones', deliverable: 'Error Audit & Correction Ledger' },
          ],
          capstoneProject: {
            id: `proj_study_c${classNumber}`,
            trackId: 'track_life_study_skills',
            classNumber,
            title: `Class ${classNumber} Calm Exam Readiness & Study Systems Portfolio`,
            brief: `Build a 7-day study preparation system for an upcoming school test: create active flashcards, follow a 20-minute daily revision schedule, and compile a post-test error review.`,
            realWorldContext: 'Good study habits eliminate exam fear and give students lifelong confidence in their learning abilities.',
            deliverables: ['Set of 15 handmade active recall flashcards', '7-day tracked revision timetable with caregiver signature', 'Post-test reflection identifying 2 concepts mastered'],
            rubricCriteria: [
              { criterion: 'Study Method Rigor', weightPercentage: 40, masteryDescription: 'Used active recall and self-testing rather than passive staring' },
              { criterion: 'Schedule Consistency', weightPercentage: 35, masteryDescription: 'Followed daily 20-minute revision blocks without last-minute panic' },
              { criterion: 'Accuracy of Learning', weightPercentage: 25, masteryDescription: 'Correctly resolved previous homework errors during revision' },
            ],
            estimatedHours: 4,
            difficulty: 'easy',
            status: 'verified',
          },
        }
      : lifeSkillStage === 'developing_independence'
      ? {
          classSpecificTitle: 'Cornell Note-Taking, Spaced Repetition & Exam Strategy',
          description: 'Master the Cornell note-taking format, build spaced repetition schedules, explain complex topics simply using the Feynman technique, and manage test time calmly.',
          realLifeScenario: 'Kavita spent 4 hours highlighting nearly every line in her history textbook with pink and yellow markers. When the test arrived, she couldn’t remember key dates.',
          workedExample: {
            title: 'Applying the Feynman Technique to Explain a Complex Concept',
            scenario: 'You are studying photosynthesis in Science. How do you verify you truly understand it?',
            steps: [
              'Step 1: Take a blank sheet of paper and write the concept at the top: Photosynthesis.',
              'Step 2: Explain it out loud in simple words as if teaching a 4th grader, without using complex jargon.',
              'Step 3: "Plants act like tiny green solar kitchens. They take water from soil, carbon dioxide from air, and sunlight from the sky to bake sugar (glucose) for food, releasing oxygen for us to breathe."',
              'Step 4: Identify your stuck points: Did you forget what chlorophyll does? Go back to the textbook and look it up.',
              'Step 5: Re-explain until the explanation flows naturally without peeking.',
            ],
            takeaway: 'If you cannot explain a concept simply, you do not understand it deeply yet.',
          },
          practicalActivity: {
            title: 'Cornell Note-Taking Implementation',
            instructions: [
              'Divide a notebook page: 2.5-inch left margin (Cue/Questions column), 6-inch right column (Notes), and 2-inch bottom margin (Summary).',
              'Take notes during a 20-minute school lesson or textbook chapter reading.',
              'Write 3 summary bullet points at the bottom and cover the notes to test yourself using only the cue column.',
            ],
            safeCheckNote: 'Never rely on copied notes from friends; taking notes in your own words is where learning happens.',
            deliverableDescription: 'A completed 2-page Cornell Note sheet with cues and summaries.',
          },
          reflectionExercise: {
            promptQuestion: 'Why does re-reading a textbook chapter 4 times give a false illusion of competence?',
            guidingPoints: [
              'Recognize that looking at familiar text feels easy, but doesn’t prove your brain can produce the answer from memory on a blank page.',
              'Self-testing (closing the book and writing what you know) is the true test of memory.',
            ],
          },
          assessment: {
            question: 'You have a 60-minute exam with 30 multiple-choice questions (1 mark each) and 3 long-answer questions (10 marks each). What is the optimal time-allocation strategy?',
            contextScenario: 'You want to maximize your score without running out of time at the end.',
            options: [
              { id: 'opt_1', text: 'Spend 50 minutes on the multiple-choice questions and rush the long answers in the last 10 minutes.', isCorrect: false, explanation: 'This leaves 30 marks (half the exam!) crammed into 10 minutes.' },
              { id: 'opt_2', text: 'Spend 20 minutes on MCQs (approx 40 sec each), 30 minutes on long answers (10 min each), and 10 minutes for revision.', isCorrect: true, explanation: 'Proportional time allocation matches marks and leaves a 10-minute buffer to catch careless errors.' },
              { id: 'opt_3', text: 'Start with whichever question looks hardest and spend 40 minutes on it.', isCorrect: false, explanation: 'Getting bogged down on one hard question causes panic and unattempted easy questions.' },
              { id: 'opt_4', text: 'Write continuously without looking at the wall clock.', isCorrect: false, explanation: 'Ignoring time pacing leads to unattempted questions.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'Pacing your time proportionally to question marks and keeping a 10-minute review buffer prevents leaving high-value questions unattempted.',
          },
          learningOutcomes: [
            'Construct organized Cornell Notes with active cues and concise chapter summaries',
            'Implement spaced repetition schedules across 1, 3, and 7-day intervals',
            'Apply the Feynman technique to diagnose gaps in conceptual understanding',
            'Execute time-budgeted exam pacing strategies with verified review buffers',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'The Cornell Note-Taking System', objective: 'Structuring cues, notes, and summaries for active revision', deliverable: 'Cornell Note Portfolio (2 Chapters)' },
            { weekNumber: 2, title: 'The Feynman Explanation Technique', objective: 'Translating complex textbook jargon into simple analogies', deliverable: 'Feynman Concept Card Set' },
            { weekNumber: 3, title: 'Spaced Retrieval Schedules (1-3-7 Rule)', objective: 'Scheduling revision intervals to halt the forgetting curve', deliverable: 'Spaced Repetition Calendar' },
            { weekNumber: 4, title: 'Strategic Exam Pacing & Error Audits', objective: 'Allocating minutes per mark and managing exam pressure', deliverable: 'Mock Exam Pacing Runbook' },
          ],
          capstoneProject: {
            id: `proj_study_c${classNumber}`,
            trackId: 'track_life_study_skills',
            classNumber,
            title: `Class ${classNumber} Independent Study Systems & Exam Mastery Blueprint`,
            brief: `Develop a comprehensive revision system for a full academic subject: Cornell notes for 2 chapters, a 14-day spaced repetition schedule, and a time-budgeted exam strategy blueprint.`,
            realWorldContext: 'Independent study habits developed in middle school are the single highest predictor of academic success in higher education.',
            deliverables: ['Set of 4 verified Cornell Note sheets', '14-day spaced recall timetable with execution timestamps', 'Written exam pacing strategy with mark-to-minute allocations'],
            rubricCriteria: [
              { criterion: 'Note-Taking Quality', weightPercentage: 40, masteryDescription: 'Concise, high-utility notes in own words with sharp cue-column questions' },
              { criterion: 'Recall System Rigor', weightPercentage: 35, masteryDescription: 'Demonstrated spaced intervals with verified self-testing entries' },
              { criterion: 'Strategy Feasibility', weightPercentage: 25, masteryDescription: 'Pacing plan realistically accounts for question weights and review buffers' },
            ],
            estimatedHours: 6,
            difficulty: 'medium',
            status: 'verified',
          },
        }
      : {
          classSpecificTitle: 'Advanced Cognitive Synthesis, Deep Work Protocols & High-Stakes Exam Architecture',
          description: 'Master Cal Newport deep work focus sessions, synoptic note synthesis, active recall question generation, and psychological stamina for board exams.',
          realLifeScenario: 'A Class 9 student studied for 6 hours with a smartphone buzzing on the desk every 3 minutes. At the end of the day, retention was less than 20%.',
          workedExample: {
            title: 'Setting Up a 90-Minute Deep Work Focus Block',
            scenario: 'How do high-performing students study complex physics or mathematics without cognitive fatigue?',
            steps: [
              'Step 1: Environmental insulation: Phone placed on airplane mode in another room.',
              'Step 2: Clear mission objective: "Complete 12 quadratic equation proofs in 50 minutes."',
              'Step 3: Active production: Solve problems with pen and paper without checking solutions prematurely.',
              'Step 4: Interleaved break: At 50 minutes, take a 10-minute physical walk and drink water (zero social media).',
              'Step 5: Error audit: Spend final 30 minutes correcting mistakes and documenting insights.',
            ],
            takeaway: '50 minutes of deep uninterrupted focus produces more learning than 4 hours of distracted study.',
          },
          practicalActivity: {
            title: 'Self-Authored Exam Paper Generation',
            instructions: [
              'Take a completed chapter syllabus.',
              'Author 5 challenging diagnostic questions testing common student misconceptions.',
              'Write the complete marking scheme and model answer key.',
              'Swap with a study partner or solve it yourself after 3 days.',
            ],
            safeCheckNote: 'Focus on conceptual depth rather than tricky, unfair wording.',
            deliverableDescription: 'A self-authored 5-Question Diagnostic Assessment with verified marking scheme.',
          },
          reflectionExercise: {
            promptQuestion: 'How does digital multitasking (listening to music while scrolling and studying) degrade your brain’s cognitive encoding?',
            guidingPoints: [
              'Notice how attention switching creates "attention residue", making deep reasoning impossible.',
              'Commit to 3 distraction-free deep work blocks this week.',
            ],
          },
          assessment: {
            question: 'Two weeks before major board examinations, what revision activity yields the highest retention and diagnostic value?',
            contextScenario: 'You have finished reading all textbook chapters once.',
            options: [
              { id: 'opt_1', text: 'Re-read the entire textbook from page 1 again passively.', isCorrect: false, explanation: 'Passive re-reading creates recognition without recall.' },
              { id: 'opt_2', text: 'Solve past-year board examination papers under strict timed exam conditions, followed by rigorous marking against the official rubric.', isCorrect: true, explanation: 'Timed past-paper simulation reveals genuine knowledge gaps, builds pacing stamina, and mimics the real testing environment.' },
              { id: 'opt_3', text: 'Watch 8 hours of YouTube video summaries without taking notes.', isCorrect: false, explanation: 'Watching videos is passive entertainment, not active cognitive encoding.' },
              { id: 'opt_4', text: 'Stay up all night copying friends’ revision sheets.', isCorrect: false, explanation: 'Sleep deprivation impairs long-term memory consolidation.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'Timed past-paper simulation under real exam conditions is the gold standard of high-stakes academic preparation.',
          },
          learningOutcomes: [
            'Execute 90-minute distraction-free Deep Work sessions with verified production output',
            'Synthesize multi-chapter syllabi into unified conceptual mind-maps and summary matrices',
            'Author diagnostic exam questions to test boundary conditions and subtle misconceptions',
            'Maintain psychological stamina, sleep architecture, and peak performance during exam periods',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Deep Work Architecture & Distraction Defense', objective: 'Eliminating attention residue and mastering single-task focus', deliverable: 'Deep Work Session Audit Log' },
            { weekNumber: 2, title: 'Synoptic Note Synthesis & Knowledge Graphs', objective: 'Connecting disparate textbook units into cohesive mental models', deliverable: 'Multi-Chapter Knowledge Graph' },
            { weekNumber: 3, title: 'Inverted Testing: Authoring the Exam Paper', objective: 'Thinking like an examiner to anticipate high-yield test topics', deliverable: 'Self-Authored 20-Mark Exam Paper' },
            { weekNumber: 4, title: 'Peak Performance Stamina & Tapering Protocols', objective: 'Optimizing sleep, nutrition, and cognitive pacing for exam days', deliverable: 'Board Exam Performance Runbook' },
          ],
          capstoneProject: {
            id: `proj_study_c${classNumber}`,
            trackId: 'track_life_study_skills',
            classNumber,
            title: `Class ${classNumber} High-Performance Academic Mastery & Deep Work Dossier`,
            brief: `Design and execute a full 2-week board-level preparation cycle: 10 documented Deep Work sessions, a self-authored 50-mark diagnostic exam with full rubric, and a psychological stamina management plan.`,
            realWorldContext: 'Mastering deep cognitive focus and self-directed preparation prepares students for competitive exams and lifelong intellectual leadership.',
            deliverables: ['Deep Work execution ledger (15+ verified focus hours)', 'Complete 50-mark diagnostic exam paper with answer rubric', 'Personal exam psychology and stamina protocol'],
            rubricCriteria: [
              { criterion: 'Focus Discipline', weightPercentage: 40, masteryDescription: 'Demonstrated consistent deep work blocks with zero phone distractions' },
              { criterion: 'Diagnostic Question Quality', weightPercentage: 35, masteryDescription: 'Authored rigorous questions testing deep reasoning and common pitfalls' },
              { criterion: 'System Sustainability', weightPercentage: 25, masteryDescription: 'Balanced intense preparation with 8 hours of sleep and physical recovery' },
            ],
            estimatedHours: 8,
            difficulty: 'hard',
            status: 'verified',
          },
        }),
  }

  // --------------------------------------------------------------------------
  // 8. PRACTICAL CITIZENSHIP & COMMUNITY LIFE
  // --------------------------------------------------------------------------
  const citizenshipTrack: ClassSkillTrackMeta = {
    id: 'track_life_citizenship_community',
    category: 'life_citizenship_community',
    title: 'Practical Citizenship & Community Life',
    classNumber,
    stage,
    stageLabel,
    lifeSkillStage,
    lifeSkillStageLabel,
    iconName: 'Globe',
    colorTheme: 'teal',
    level: lifeSkillStage === 'foundation_guided' ? 'foundation' : lifeSkillStage === 'developing_independence' ? 'intermediate' : 'advanced',
    whyItMatters: 'Keeping shared spaces clean, conserving water and electricity, respecting public property, understanding civic services, and being considerate in public make you a responsible, respected citizen.',
    tools: ['Waste Segregation Chart', 'Energy & Water Audit Sheet', 'Civic Services Directory', 'Community Action Plan'],
    reviewStatus: 'verified',
    ...(lifeSkillStage === 'foundation_guided'
      ? {
          classSpecificTitle: 'Keeping Shared Spaces Clean, Conserving Utilities & Respecting Public Property',
          description: 'Learn green vs blue waste segregation, turn off idle taps and lights, treat park and library property gently, and practice patience in public queues.',
          realLifeScenario: 'Aarush ate a packet of biscuits in the public park. The nearest dustbin was 20 meters away, so he dropped the plastic wrapper on the grass.',
          workedExample: {
            title: 'The "Leave No Trace" Rule in Public Spaces',
            scenario: 'You finish a snack in a public park or bus stop, but there is no dustbin in sight. What do you do?',
            steps: [
              'Step 1: Never drop trash on the ground, behind a bench, or into bushes.',
              'Step 2: Fold the wrapper neatly and place it into your pocket or backpack side pocket.',
              'Step 3: Carry it with you until you spot a municipal dustbin or reach home.',
              'Step 4: Dispose of it in the correct dry waste bin.',
            ],
            takeaway: 'Responsible citizens take care of public parks just as carefully as their own living rooms.',
          },
          practicalActivity: {
            title: 'Home & School Energy and Water Audit',
            instructions: [
              'Inspect your home for 3 daily conservation habits:',
              '(1) Turning off taps tightly while brushing teeth (saves up to 6 liters of water!).',
              '(2) Switching off lights and fans when leaving an empty room.',
              '(3) Segregating dry waste (paper, plastic) from wet waste (fruit peels, food scraps).',
            ],
            safeCheckNote: 'Never touch electrical switches with wet hands.',
            deliverableDescription: 'A 5-Day Home Utility Conservation Checklist signed by a caregiver.',
          },
          reflectionExercise: {
            promptQuestion: 'Why does defacing public bus seats or writing on historic monuments harm our whole country?',
            guidingPoints: [
              'Public property belongs to every citizen and is built with shared national resources.',
              'Respecting shared heritage shows dignity, pride, and civic maturity.',
            ],
          },
          assessment: {
            question: 'You notice water overflowing from a public drinking cooler tap at school because someone didn’t turn it off properly. What is the most responsible action?',
            contextScenario: 'You are walking past to go to class.',
            options: [
              { id: 'opt_1', text: 'Walk past without caring because it isn’t your home water bill.', isCorrect: false, explanation: 'Wasting water hurts the whole community and environment.' },
              { id: 'opt_2', text: 'Stop and turn the tap off tightly; if it is broken, notify a school staff member or teacher immediately.', isCorrect: true, explanation: 'Conserving water and reporting leaks protects scarce natural resources.' },
              { id: 'opt_3', text: 'Splash water on other students for fun.', isCorrect: false, explanation: 'Irresponsible and wasteful behavior.' },
              { id: 'opt_4', text: 'Take a picture and complain on social media without turning it off.', isCorrect: false, explanation: 'Turning off the tap immediately stops the waste.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'Citizens take immediate personal action to conserve shared resources and report broken public utilities.',
          },
          learningOutcomes: [
            'Practice proper dry vs wet waste segregation in school and domestic environments',
            'Demonstrate conscious conservation of electricity and drinking water daily',
            'Exhibit considerate public manners: quiet voices in libraries, waiting in queues',
            'Respect and protect public property in parks, schools, and transport systems',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Waste Segregation & Clean Spaces', objective: 'Mastering green (wet/organic) and blue (dry/recyclable) disposal', deliverable: 'Waste Audit Action Sheet' },
            { weekNumber: 2, title: 'Water & Electricity Conservation', objective: 'Eliminating phantom electricity and leaking tap wastage', deliverable: 'Home Utility Conservation Badge' },
            { weekNumber: 3, title: 'Respecting Public Property & Heritage', objective: 'Protecting school desks, library books, and public monuments', deliverable: 'Public Property Pledge' },
            { weekNumber: 4, title: 'Public Manners & Queue Etiquette', objective: 'Patience, elevator etiquette, and considerate behavior in crowds', deliverable: 'Good Citizen Etiquette Card' },
          ],
          capstoneProject: {
            id: `proj_citizen_c${classNumber}`,
            trackId: 'track_life_citizenship_community',
            classNumber,
            title: `Class ${classNumber} Junior Eco-Citizen & Community Care Project`,
            brief: `Execute a 7-day community conservation project: conduct a home water/electricity audit, implement dry/wet waste segregation, and perform one community cleanliness action.`,
            realWorldContext: 'Clean, beautiful neighborhoods are created by citizens who take pride in shared spaces.',
            deliverables: ['7-day water and energy conservation audit log', 'Waste segregation photo log with labeled bins', 'Caregiver endorsement of civic responsibility'],
            rubricCriteria: [
              { criterion: 'Conservation Rigor', weightPercentage: 40, masteryDescription: 'Documented tangible reductions in water or electricity wastage' },
              { criterion: 'Waste Management Hygiene', weightPercentage: 35, masteryDescription: '100% correct separation of organic wet waste from recyclables' },
              { criterion: 'Civic Pride', weightPercentage: 25, masteryDescription: 'Demonstrated proactive care for shared spaces without being asked' },
            ],
            estimatedHours: 4,
            difficulty: 'easy',
            status: 'verified',
          },
        }
      : lifeSkillStage === 'developing_independence'
      ? {
          classSpecificTitle: 'Civic Services Awareness, Environmental Action & Community Responsibility',
          description: 'Understand local civic institutions (municipal ward, post office, police chowki), reduce single-use plastics, organize neighborhood cleanups, and exercise digital civic awareness.',
          realLifeScenario: 'A broken street light outside Diya’s colony remained dark for weeks, creating safety risks for pedestrians returning in the evening.',
          workedExample: {
            title: 'How to Report a Civic Issue to Municipal Authorities',
            scenario: 'There is a leaking water pipeline or open manhole in your colony. How do citizens report it in India?',
            steps: [
              'Step 1: Identify the exact location with nearby landmarks (e.g. Opposite Gate 2, Sector 4 Park).',
              'Step 2: Take a clear photo of the hazard with a parent.',
              'Step 3: Identify the responsible civic agency: Municipal Corporation / Jal Board / Ward Councillor.',
              'Step 4: File a polite, factual complaint on the city municipal grievance portal or helpline (e.g. Swachhata App or local citizen helpline).',
              'Step 5: Keep the complaint reference token number to follow up after 3 business days.',
            ],
            takeaway: 'Civic awareness means knowing your local governance systems and holding public services accountable constructively.',
          },
          practicalActivity: {
            title: 'Local Civic Services Directory Creation',
            instructions: [
              'Find and record the phone number and address of 4 local civic services in your area:',
              '(1) Local Police Station, (2) Nearest Government/District Hospital, (3) Municipal Ward Office, (4) Electricity Complaint Center.',
              'Verify that all family members know where this directory is kept.',
            ],
            safeCheckNote: 'Never prank call or make false reports to emergency or municipal services.',
            deliverableDescription: 'A completed Neighborhood Civic Services Reference Directory.',
          },
          reflectionExercise: {
            promptQuestion: 'Why is civic responsibility not just the government’s job, but every resident’s duty?',
            guidingPoints: [
              'Notice how government sanitation workers clean roads every morning, but litter returns within hours if citizens throw trash.',
              'True cleanliness and civic pride require active partnership between citizens and governance.',
            ],
          },
          assessment: {
            question: 'You and your friends want to organize an eco-friendly birthday party. Which choice best demonstrates practical environmental citizenship?',
            contextScenario: 'You are planning decorations, food service, and party favors.',
            options: [
              { id: 'opt_1', text: 'Buy 100 single-use plastic balloons, plastic thermocol plates, and plastic straws because they are cheap to throw away.', isCorrect: false, explanation: 'Single-use plastic balloons and thermocol take 500 years to decompose and choke wildlife.' },
              { id: 'opt_2', text: 'Use reusable steel/bamboo plates, cloth bunting banners, and gift small potted plants as favors.', isCorrect: true, explanation: 'Eliminating single-use plastics and opting for reusable items drastically reduces landfill waste and models sustainable living.' },
              { id: 'opt_3', text: 'Throw all party waste into the neighborhood storm drain.', isCorrect: false, explanation: 'Clogs stormwater drains and causes urban flooding.' },
              { id: 'opt_4', text: 'Order food for 50 people when only 10 are attending.', isCorrect: false, explanation: 'Massive food wastage is ethically irresponsible.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'Sustainable choices eliminate single-use plastics and food waste, demonstrating responsible citizenship.',
          },
          learningOutcomes: [
            'Map local civic infrastructure and utilize municipal grievance channels effectively',
            'Implement plastic-reduction and eco-friendly consumer habits in personal life',
            'Organize and lead local neighborhood clean-up and tree-care initiatives',
            'Understand basic rights and duties of Indian citizens under the Constitution',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Local Governance & Municipal Grievance Systems', objective: 'Understanding ward councils, citizen helplines, and municipal responsibilities', deliverable: 'Neighborhood Civic Directory' },
            { weekNumber: 2, title: 'Zero-Waste Living: Eliminating Single-Use Plastics', objective: 'Conducting personal plastic audits and adopting reusable alternatives', deliverable: 'Single-Use Plastic Reduction Audit' },
            { weekNumber: 3, title: 'Community Cleanliness & Tree Stewardship', objective: 'Adopting a local tree/park section and maintaining cleanliness', deliverable: 'Community Green Action Log' },
            { weekNumber: 4, title: 'Fundamental Rights & Civic Duties in India', objective: 'Understanding Article 51A duties: protecting nature, public property, and harmony', deliverable: 'Civic Duties Infographic' },
          ],
          capstoneProject: {
            id: `proj_citizen_c${classNumber}`,
            trackId: 'track_life_citizenship_community',
            classNumber,
            title: `Class ${classNumber} Community Civic Action & Waste Reduction Campaign`,
            brief: `Plan and execute an actionable community civic project: audit your household plastic waste, eliminate 3 single-use plastic items, and create a neighborhood civic helpline directory for your residential building or street.`,
            realWorldContext: 'Real citizenship begins on your street and in your community through concrete, helpful actions.',
            deliverables: ['Household plastic waste audit with 30-day reduction target', 'Printed and laminated building civic emergency directory', 'Caregiver and neighbor endorsement of community contribution'],
            rubricCriteria: [
              { criterion: 'Community Impact', weightPercentage: 40, masteryDescription: 'Delivered tangible utility to neighbors through accurate civic directories and waste reduction' },
              { criterion: 'Environmental Thoroughness', weightPercentage: 35, masteryDescription: 'Demonstrated real elimination of single-use plastics over 14 days' },
              { criterion: 'Civic Engagement', weightPercentage: 25, masteryDescription: 'Interacted respectfully and constructively with local community members' },
            ],
            estimatedHours: 6,
            difficulty: 'medium',
            status: 'verified',
          },
        }
      : {
          classSpecificTitle: 'Constitutional Literacy, Urban Ecology & Civic Leadership',
          description: 'Master constitutional principles, Right to Information (RTI) concepts, urban environmental sustainability, composting and rainwater harvesting, and leading community volunteer efforts.',
          realLifeScenario: 'A vacant plot near a school became an illegal garbage dump, attracting stray animals and creating health hazards.',
          workedExample: {
            title: 'Transforming an Illegal Dump into a Community Garden',
            scenario: 'How can high school students mobilize legal community action to resolve an environmental hazard?',
            steps: [
              'Step 1: Document the hazard: Take date-stamped photographs and note health risks to nearby school students.',
              'Step 2: Collect community petitions: Gather 20 signatures from local residents and parents.',
              'Step 3: Present formal petition to the local Ward Officer and Resident Welfare Association (RWA).',
              'Step 4: Coordinate with municipal sanitation for a 1-day clearing drive.',
              'Step 5: Plant hardy native flowering bushes or medicinal herbs to prevent garbage from returning.',
            ],
            takeaway: 'Organized community advocacy backed by constructive civic engagement creates lasting urban change.',
          },
          practicalActivity: {
            title: 'Urban Ecology & Water Conservation Audit',
            instructions: [
              'Investigate rainwater harvesting or wastewater recycling in your building, school, or colony.',
              'Calculate estimated rooftop rainwater capture potential (Area in sq.m × Average annual rainfall in mm × 0.8 runoff coefficient).',
              'Draft a 1-page proposal for residential water conservation or composting.',
            ],
            safeCheckNote: 'Always conduct field inspections in safe daylight hours with family awareness.',
            deliverableDescription: 'A 2-page Urban Environmental Stewardship Proposal with rainwater calculations.',
          },
          reflectionExercise: {
            promptQuestion: 'Why is the Right to Information (RTI) and public transparency critical for a healthy democracy?',
            guidingPoints: [
              'Notice how government transparency prevents corruption in public construction and services.',
              'Reflect on how an informed citizen is democracy’s greatest guardian.',
            ],
          },
          assessment: {
            question: 'What is the most effective and legal method for citizens in India to demand accountability regarding prolonged delays in municipal road repair?',
            contextScenario: 'A newly paved road developed deep potholes within 2 weeks of construction.',
            options: [
              { id: 'opt_1', text: 'Damage other municipal vehicles in protest.', isCorrect: false, explanation: 'Violent destruction of public property is criminal and self-defeating.' },
              { id: 'opt_2', text: 'File a formal query under the Right to Information (RTI) Act requesting contractor details, tender specifications, and inspection reports, while filing a grievance on the public portal.', isCorrect: true, explanation: 'The RTI Act empowers citizens to legally inspect public contracts, verify contractor guarantees, and demand official accountability.' },
              { id: 'opt_3', text: 'Accept that nothing ever improves and give up.', isCorrect: false, explanation: 'Cynicism prevents positive democratic participation.' },
              { id: 'opt_4', text: 'Bribe a local worker to patch the pothole with mud.', isCorrect: false, explanation: 'Bribery is illegal and mud washes away in the next rain.' },
            ],
            correctOptionId: 'opt_2',
            reasoningFeedback: 'Constitutional tools like the RTI Act and official municipal grievance portals empower citizens to demand transparency and accountability legally.',
          },
          learningOutcomes: [
            'Understand foundational constitutional rights, directive principles, and fundamental duties in India',
            'Utilize legal civic tools (RTI, public grievance portals) to advocate for community improvements',
            'Design and advocate for urban sustainability solutions: composting, water harvesting, and solar energy',
            'Lead multi-stakeholder community service and environmental conservation initiatives',
          ],
          weeklyModules: [
            { weekNumber: 1, title: 'Constitutional Literacy & Democratic Governance', objective: 'Understanding fundamental rights, duties, and local governance separation', deliverable: 'Constitutional Literacy Manifesto' },
            { weekNumber: 2, title: 'The Right to Information (RTI) & Civic Transparency', objective: 'Drafting factual RTI queries and utilizing public grievance portals', deliverable: 'Sample Civic Accountability Query' },
            { weekNumber: 3, title: 'Urban Ecology: Water Harvesting & Composting', objective: 'Calculating rainwater catchment and building aerobic compost systems', deliverable: 'Urban Ecological Proposal' },
            { weekNumber: 4, title: 'Community Volunteerism & Youth Leadership', objective: 'Organizing a collective civic service project with measurable outcomes', deliverable: 'Civic Project Impact Report' },
          ],
          capstoneProject: {
            id: `proj_citizen_c${classNumber}`,
            trackId: 'track_life_citizenship_community',
            classNumber,
            title: `Class ${classNumber} Civic Leadership & Urban Sustainability Master Dossier`,
            brief: `Lead an active civic improvement campaign in your school or neighborhood: conduct an ecological resource audit (water/waste), draft a formal civic petition or RTI framework, and document measurable community impact.`,
            realWorldContext: 'The greatest leaders start by making their local community cleaner, safer, and more accountable.',
            deliverables: ['Comprehensive Urban Sustainability Audit with mathematical models', 'Formal civic petition or accountability brief submitted to authorities', 'Documented community action drive with verified participant testimonials'],
            rubricCriteria: [
              { criterion: 'Civic & Legal Rigor', weightPercentage: 40, masteryDescription: 'Demonstrated accurate understanding of municipal structures and legal grievance mechanisms' },
              { criterion: 'Measurable Environmental Impact', weightPercentage: 35, masteryDescription: 'Achieved verifiable waste reduction, water conservation, or physical space improvement' },
              { criterion: 'Community Mobilization', weightPercentage: 25, masteryDescription: 'Mobilized peers and neighbors constructively without confrontation' },
            ],
            estimatedHours: 8,
            difficulty: 'hard',
            status: 'verified',
          },
        }),
  }

  return [
    independenceTrack,
    communicationTrack,
    moneyTrack,
    safetyTrack,
    criticalThinkingTrack,
    socialTrack,
    studyTrack,
    citizenshipTrack,
  ]
}

// ============================================================================
// PROJECT RESOLVER
// ============================================================================

export function getSkillProjectById(projectId: string): ClassSkillProject | undefined {
  // Check across all youth classes (4 through 12)
  for (let c = 4; c <= 12; c++) {
    const tracks = getClassSkillTracks(c)
    for (const t of tracks) {
      if (t.capstoneProject.id === projectId) {
        return t.capstoneProject
      }
    }
  }
  return undefined
}

export function getAllClassProjects(classNumber?: number): ClassSkillProject[] {
  if (classNumber) {
    return getClassSkillTracks(classNumber).map((t) => t.capstoneProject)
  }
  // Return distinct representative projects across brackets
  const sampleClasses = [4, 6, 8]
  const projects: ClassSkillProject[] = []
  for (const c of sampleClasses) {
    projects.push(...getClassSkillTracks(c).map((t) => t.capstoneProject))
  }
  return projects
}
