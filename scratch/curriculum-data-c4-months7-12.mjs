// Class 4: Months 7-12 Topic Definitions
export const C4_MONTHS_7_12 = [
  // MONTH 7: Study Habits, Homework Routines & Focus
  {
    month: 7, monthTheme: 'Study Habits, Homework Routines & Focus', seq: 1,
    cat: 'life_study_skills', catLabel: 'Study Skills & Learning Independence',
    title: 'The 25-Minute Homework Sprint with a 5-Minute Brain Break',
    why: 'Young brains can only maintain peak focus for about 25 minutes before wandering. Working in focused sprints prevents daydreaming and leaves plenty of evening play time.',
    objs: ['Set a kitchen or sand timer for 25 minutes of single-task homework', 'Remove all toys, tablets, and snack distractions from desk during the sprint', 'Take a 5-minute movement break (stretching, water) without looking at screens', 'Track completed study sprints on a daily homework log'],
    scenario: 'Arjun sat down at 5 PM to do 4 Math sums. He glanced at comic books, doodled on margins, and got up for water four times. By 7 PM he was still not done and felt exhausted.',
    expl: 'Focus is like a flashlight beam. When you shine it everywhere, you stumble in the dark. But when you lock it onto one subject for 25 minutes, you finish in one-fourth the time. After the timer rings, your brain gets a 5-minute reward break.',
    steps: ['Pick ONE single assignment (e.g. Math page 42).', 'Clear everything else from desk and set a timer for 25 minutes.', 'Work without getting up until the timer chimes.', 'Stand up, stretch your arms, drink a glass of water for exactly 5 minutes.', 'Return refreshed for your next task or declare homework finished!'],
    example: { title: 'Arjun’s 25-Minute Sprint Victory', scenario: 'Arjun tries a 25-minute timer for English spelling.', steps: ['Puts comic book in drawer.', 'Sets kitchen timer for 25 minutes.', 'Finishes 15 spelling sentences in 18 minutes.', 'Spends remaining 7 minutes checking handwriting.', 'Enjoys 5 minutes playing with his dog.'], takeaway: 'Timed sprints make homework feel like a fast, exciting challenge.' },
    mistakes: [
      { mistake: 'Checking mobile games or watching TV during the 5-minute break.', correction: 'Screen breaks overstimulate your eyes; stretch, do jumping jacks, or sip water instead.' },
      { mistake: 'Trying to work for 2 hours straight without any rest.', correction: 'Your brain tires out quickly; taking regular 5-minute breaks keeps you sharp all evening.' }
    ],
    checklist: ['Is only one subject on the desk?', 'Is the 25-minute timer ticking?', 'Did I stay seated without distraction?', 'Did I take a screen-free 5-minute movement break?'],
    prompt: 'How did working against a 25-minute clock change how fast your homework got done?',
    takeaway: 'One 25-minute focused sprint beats two hours of distracted daydreaming every single time.',
    heroDesc: 'Student sitting cheerfully with a small desk timer and completed worksheet.',
    vis1: { title: 'The 25/5 Sprint Rhythm', caption: '25 minutes deep concentration + 5 minutes movement & hydration.' },
    vis2: { title: 'Distraction-Free Workspace Setup', caption: 'Only pencil, notebook, and timer allowed on desk.' },
    videoTitle: 'Master the 25-Minute Study Sprint', videoDuration: '3 mins 15 secs',
    scenes: [
      { visual: "Frustrated student staring at clock vs focused student with timer.", narration: "Ever spent two hours on homework that should take twenty minutes?" },
      { visual: "Demonstrating setting a 25-minute timer and clearing desk.", narration: "Lock your focus for just twenty-five minutes. No distractions, just one task." },
      { visual: "Timer dings; student stretching and drinking water.", narration: "Ding! Take a five-minute movement break. Your brain will thank you." }
    ],
    recap: "Set a 25-minute timer for your first homework task this evening.",
    act: {
      title: '5-Day 25/5 Homework Sprint Tracker',
      obj: 'Complete at least one 25-minute focused study sprint each day for 5 days.',
      mats: ['Timer (kitchen timer or alarm)', 'Homework books', 'Sprint tracking sheet'],
      steps: ['Prepare books before starting timer.', 'Start 25-minute timer and sit until it rings.', 'Record start time and task completed.', 'Get caregiver initials after the 5-minute break.'],
      output: 'Completed 5-day sprint log with caregiver signatures.',
      precautions: 'Use a physical timer or study clock rather than a smartphone with gaming apps.',
      alt: 'Use a simple sand timer or have a caregiver call out the 25-minute mark.'
    },
    scenarioGuided: {
      context: 'Pooja has 10 Math problems and an English reading chapter due tomorrow.',
      optimal: 'Set a 25-minute timer for Math, take a 5-minute stretch, then do a 25-minute timer for English.',
      optReason: 'Separating subjects into distinct sprints maintains high mental clarity.',
      nonOpt1: 'Switch between Math and English every 3 minutes whenever a sum feels hard.',
      nonOptReason1: 'Task switching creates mental confusion and doubles homework time.',
      nonOpt2: 'Wait until 9 PM and rush through both without a timer.',
      nonOptReason2: 'Late night rush leads to careless mistakes and sleepy mornings.',
      takeaway: 'One sprint per subject keeps learning smooth and organized.'
    },
    scenarioIndep: {
      context: 'Your younger brother keeps asking you to play video games while your timer is running.',
      prompt: 'Explain what you will tell him and how you will include him in your 5-minute break.',
      rubric: 'Politely asked brother to wait until timer rings; offered to play catch during 5-minute break.'
    },
    quiz: {
      q: 'What should you do during your 5-minute brain break after a 25-minute study sprint?',
      context: 'Timer just chimed after finishing Science notes.',
      optCorrect: 'Stand up, stretch your body, drink fresh water, and give your eyes a rest.',
      optWrong1: 'Play a fast-paced video game on your phone.',
      optWrong2: 'Start a 30-minute cartoon on television.',
      optWrong3: 'Eat spicy chips while reading the next chapter.',
      remediation: 'Keep your 5-minute break active and screen-free so your eyes and brain relax.'
    },
    rubric: {
      task: 'Plan and execute a single 25-minute study sprint with zero unauthorized departures from desk.',
      mastery: 'Desk prepared, timer set, single subject maintained, healthy movement break executed.',
      crit1: { name: 'Focus Maintenance', weight: 40, emerging: 'Leaves desk >3 times.', developing: 'Leaves desk once for supplies.', proficient: 'Stays seated and focused for full 25 minutes.', exemplary: '100% focused with zero self-interruptions.' },
      crit2: { name: 'Workspace Preparation', weight: 35, emerging: 'Distractions left on desk.', developing: 'Partial clearing.', proficient: 'All extraneous items cleared before timer starts.', exemplary: 'Immaculate single-subject desk setup.' },
      crit3: { name: 'Break Quality', weight: 25, emerging: 'Uses screen during break.', developing: 'Takes 15-minute break instead of 5.', proficient: 'Exactly 5 minutes of physical movement/hydration.', exemplary: 'Punctual return to desk refreshed.' }
    },
    refs: [
      'How did 25 minutes feel compared to what you expected?',
      'What was the biggest distraction you had to put away?',
      'What physical stretch felt best during your 5-minute break?',
      'How can you use this timer habit during exam revision weeks?'
    ]
  },
  {
    month: 7, monthTheme: 'Study Habits, Homework Routines & Focus', seq: 2,
    cat: 'life_study_skills', catLabel: 'Study Skills & Learning Independence',
    title: 'Color-Coding Important Keywords Without Highlighting Everything',
    why: 'When you color an entire textbook page yellow, nothing stands out. Learning to highlight only 3 to 5 critical keywords makes revision effortless and sharp.',
    objs: ['Distinguish between a key fact (name, date, rule) and descriptive filler words', 'Apply the "Goldilocks Rule": highlight no more than 1 keyword per paragraph', 'Use yellow for definitions, blue for examples, and green for dates or numbers', 'Review notes using only the colored words to recite the concept aloud'],
    scenario: 'Tanvi opened her EVS book before the unit test. Almost every sentence on the page was painted with neon pink highlighter. When she tried to revise, her eyes hurt and she couldn’t tell what was actually important.',
    expl: 'A highlighter is a spotlight, not a paintbrush! If you turn on spotlights all over the stadium, it’s just daylight. Highlighting works only when 90% of the page stays plain black text and only 10% shines bright.',
    steps: ['Read the entire paragraph once from start to finish BEFORE picking up your marker.', 'Ask yourself: "What is the ONE main thing this paragraph is teaching?"', 'Uncap your marker and highlight only 2 to 4 words (the core noun and action).', 'Write a one-word keyword in the pencil margin next to the paragraph.', 'Close your eyes and test if you can explain the concept using just those highlighted words.'],
    example: { title: 'Tanvi’s Water Cycle Highlighting', scenario: 'Paragraph on Evaporation in EVS textbook.', steps: ['Reads 5-line paragraph on how sun heats water into vapor.', 'Identifies core idea: Sun heats water -> water vapor.', 'Highlights ONLY: "Sun heats water" and "evaporation".', 'Recites: "Evaporation means sun heating water into gas."'], takeaway: 'Less color on the page means more knowledge in your head.' },
    mistakes: [
      { mistake: 'Highlighting while reading for the very first time.', correction: 'Always read the paragraph first so you know what the main conclusion is before marking.' },
      { mistake: 'Coloring whole sentences including words like "and", "the", and "because".', correction: 'Highlight only key nouns and verbs; leave filler words alone.' }
    ],
    checklist: ['Did I read the paragraph first?', 'Are fewer than 5 words highlighted?', 'Did I avoid coloring whole sentences?', 'Can I explain the idea using only the marked words?'],
    prompt: 'Look at a page you highlighted in the past. Is it a spotlight or a coloring book?',
    takeaway: 'Highlighting is a spotlight for your brain: mark only the key words that unlock the whole idea.',
    heroDesc: 'Textbook page showing sparse, crisp highlighting on three key terms with pencil margin notes.',
    vis1: { title: 'The 10% Highlighting Rule', caption: 'Only 10% of text should be highlighted; 90% remains uncolored.' },
    vis2: { title: '3-Color Code System', caption: 'Yellow = Main Definition, Green = Key Fact/Number, Blue = Important Example.' },
    videoTitle: 'The Spotlight Highlighting Method', videoDuration: '3 mins 05 secs',
    scenes: [
      { visual: "Page glowing completely neon vs clean page with 3 sharp highlights.", narration: "When everything is highlighted, nothing is important." },
      { visual: "Student reading paragraph first, then capping marker on 3 words.", narration: "Read first. Identify the big idea. Then highlight only the power words." },
      { visual: "Testing recall by looking only at highlighted terms.", narration: "Can you explain the lesson from three words? That is true mastery." }
    ],
    recap: "Practice highlighting only 3 power words on your next textbook page.",
    act: {
      title: 'The 3-Word Paragraph Challenge',
      obj: 'Read a 3-paragraph textbook passage and highlight exactly 3 power words per paragraph.',
      mats: ['Textbook or photocopied reading passage', 'Yellow highlighter', 'Pencil'],
      steps: ['Read paragraph 1 completely.', 'Circle the 3 most important words in pencil.', 'Highlight only those 3 circled words.', 'Repeat for paragraphs 2 and 3.'],
      output: 'A clean passage with exactly 9 highlighted words total and margin summaries.',
      precautions: 'Do not use dark permanent markers that bleed through thin textbook paper.',
      alt: 'Use a light pencil underline if you are not allowed to highlight in school library books.'
    },
    scenarioGuided: {
      context: 'Vihaan is studying a history paragraph: "King Ashoka ruled Pataliputra in 268 BCE and fought the Kalinga War before embracing Buddhism."',
      optimal: 'Highlight "Ashoka", "268 BCE", "Kalinga War", and "embraced Buddhism".',
      optReason: 'Captures the ruler, date, pivotal event, and outcome in four concise terms.',
      nonOpt1: 'Highlight the entire sentence from King to Buddhism with bright pink marker.',
      nonOptReason1: 'Full sentence highlighting wastes ink and offers zero visual contrast.',
      nonOpt2: 'Highlight the words "ruled", "and", "the", and "before".',
      nonOptReason2: 'Highlighting connector words misses all factual content.',
      takeaway: 'Select proper nouns, key verbs, and dates that anchor the historical event.'
    },
    scenarioIndep: {
      context: 'You are reading a science definition of Photosynthesis.',
      prompt: 'Write down the exact 3 or 4 words you would highlight from the 4-line definition.',
      rubric: 'Selected sunlight, carbon dioxide, chlorophyll, and food/glucose.'
    },
    quiz: {
      q: 'Why should you always read a paragraph completely before highlighting any word?',
      context: 'Preparing to annotate a chapter in Social Studies.',
      optCorrect: 'Because you cannot know what is truly important until you understand the whole paragraph.',
      optWrong1: 'Because highlighters dry out if left uncapped too long.',
      optWrong2: 'Because teachers only check textbooks after school.',
      optWrong3: 'Because reading first makes the ink look darker.',
      remediation: 'Never mark on your first pass; understand first, then highlight the core concept.'
    },
    rubric: {
      task: 'Annotate a one-page textbook section using the 10% keyword highlighting method.',
      mastery: 'Under 10% text highlighted; core concepts captured; neat margin tags added.',
      crit1: { name: 'Keyword Selection', weight: 40, emerging: 'Highlights entire sentences.', developing: 'Highlights 8-10 words per paragraph.', proficient: 'Selects 3-5 high-yield keywords per paragraph.', exemplary: 'Flawless selection of critical terminology.' },
      crit2: { name: 'Visual Restraint', weight: 35, emerging: '>40% page colored.', developing: '20-30% colored.', proficient: 'Strict adherence to under 10% colored area.', exemplary: 'Pristine contrast with zero bleed-through.' },
      crit3: { name: 'Margin Summarization', weight: 25, emerging: 'No margin notes.', developing: 'Incomplete notes.', proficient: 'Neat 1-2 word pencil margin guide next to each block.', exemplary: 'Self-quizzing cues written neatly in margins.' }
    },
    refs: [
      'Why is it tempting to color whole sentences when reading?',
      'How does a clean page make your eyes feel during late-night revision?',
      'Which color code did you find most helpful for definitions?',
      'How will you teach this to a friend who highlights their whole book?'
    ]
  },
  {
    month: 7, monthTheme: 'Study Habits, Homework Routines & Focus', seq: 3,
    cat: 'life_study_skills', catLabel: 'Study Skills & Learning Independence',
    title: 'Building a "What\'s Due Tomorrow" Sticky-Note Homework Tracker',
    why: 'Forgetting an assignment leads to morning stress and lower grades. A simple 3-column sticky-note board makes all your responsibilities visible at a glance.',
    objs: ['Set up 3 columns on a study corkboard or wall: "To Do", "Doing Now", "Done"', 'Write each subject assignment on an individual small sticky note', 'Move the sticky note physically across columns as you complete each task', 'Discard or archive "Done" notes at night to experience a clean slate'],
    scenario: 'Ishaan went to sleep confident that he had finished everything. Next morning at school, his Hindi teacher asked for the poem recitation chart. Ishaan had completely forgotten about it because it wasn’t in his main notebook.',
    expl: 'Our brains are great for thinking, but terrible at remembering lists of five different tasks! When you write tasks on colorful sticky notes and post them on a mini-board, you never have to ask "What was I supposed to do?" Moving a note to "Done" gives your brain a real dopamine boost!',
    steps: ['Draw 3 vertical columns on a sheet of cardboard: TO DO, DOING, DONE.', 'Open your school diary and write every homework task on a separate sticky note.', 'Stick all notes in the TO DO column.', 'When you sit down to work, move ONE note into DOING.', 'When finished and checked, move it into DONE with a high five!'],
    example: { title: 'Ishaan’s Visual Board Setup', scenario: 'Homework list: Math Ex 3.2, English sentences, EVS leaf drawing.', steps: ['Writes 3 sticky notes.', 'Places all 3 in TO DO.', 'Moves Math to DOING.', 'Moves Math to DONE and starts English.', 'By 6:30 PM all 3 notes are in DONE.'], takeaway: 'Seeing notes move to DONE proves your progress and builds confidence.' },
    mistakes: [
      { mistake: 'Writing 5 different subjects onto one single crowded sticky note.', correction: 'Use one note per subject so you can move each task independently as you finish.' },
      { mistake: 'Leaving finished notes on the board for three weeks.', correction: 'Clear the DONE column every night so tomorrow starts with a fresh, clear board.' }
    ],
    checklist: ['Did I check my school diary for all subjects?', 'Is each task written on its own note?', 'Is only ONE note in DOING right now?', 'Did I clear the DONE column before bed?'],
    prompt: 'How did physically moving a note to the DONE column feel after finishing a hard task?',
    takeaway: 'Make your responsibilities visible: write it, move it, and celebrate getting it done.',
    heroDesc: 'Child smiling while moving a bright yellow sticky note from DOING into DONE on a colorful wall board.',
    vis1: { title: 'The 3-Column Task Flow', caption: 'TO DO (What waits) -> DOING (Only 1 item) -> DONE (Celebrate!).' },
    vis2: { title: 'Single Task Sticky Note Template', caption: 'Subject name at top, specific page/exercise number, due date.' },
    videoTitle: 'The Visual Homework Board That Works', videoDuration: '2 mins 50 secs',
    scenes: [
      { visual: "Child confused about forgotten homework.", narration: "Our brains can't hold five homework assignments in memory at once." },
      { visual: "Creating TO DO, DOING, DONE columns with sticky notes.", narration: "Three simple columns turn homework into a satisfying game." },
      { visual: "Moving sticky note to DONE with a satisfying tap.", narration: "Move it to DONE. That feeling of accomplishment is 100% earned." }
    ],
    recap: "Create your 3-column sticky-note board above your desk today.",
    act: {
      title: 'Cardboard Kanban Board Construction',
      obj: 'Construct a reusable 3-column sticky note board and track today’s homework.',
      mats: ['A4 cardboard or chart paper', 'Marker', 'Sticky notes pad', 'Tape or blue-tac'],
      steps: ['Rule 2 lines to make 3 equal columns: TO DO, DOING, DONE.', 'Check today’s school diary.', 'Write one note for each subject.', 'Complete all tasks by moving notes across.'],
      output: 'A functioning 3-column board mounted near study desk with completed notes in DONE.',
      precautions: 'Do not use tape that peels paint off your bedroom wall.',
      alt: 'Draw 3 columns on a small dry-erase whiteboard if available.'
    },
    scenarioGuided: {
      context: 'Simran has 4 tasks in TO DO. She tries to move all 4 into DOING at the same time.',
      optimal: 'Pick the highest priority task, move ONLY that one into DOING, and leave the other 3 in TO DO.',
      optReason: 'Human brains can only do one task well at a time; multitasking causes errors.',
      nonOpt1: 'Move all 4 into DONE before starting to feel good.',
      nonOptReason1: 'Faking progress leaves assignments uncompleted and creates trouble at school.',
      nonOpt2: 'Tear up all sticky notes because 4 tasks feel overwhelming.',
      nonOptReason2: 'Quitting guarantees failing grades and disappointed teachers.',
      takeaway: 'Keep DOING strictly limited to one single task at any moment.'
    },
    scenarioIndep: {
      context: 'Teacher assigns a Science chart due in 4 days and Math due tomorrow.',
      prompt: 'Explain how you will arrange these two notes on your board today.',
      rubric: 'Put Math into DOING for today; placed Science chart in TO DO with due date clearly marked.'
    },
    quiz: {
      q: 'Why should you have only ONE sticky note in the "DOING" column at any moment?',
      context: 'Working through a busy evening of assignments.',
      optCorrect: 'Because focusing on one single task finishes it faster and prevents feeling overwhelmed.',
      optWrong1: 'Because sticky notes fall down if placed close together.',
      optWrong2: 'Because school rules allow only one homework per student.',
      optWrong3: 'Because the teacher will check your DOING column.',
      remediation: 'Keep your working column single-task focused to protect your concentration.'
    },
    rubric: {
      task: 'Build a 3-column task board and track a full evening of homework independently.',
      mastery: 'Board built cleanly; tasks accurately transcribed; single WIP maintained; evening reset completed.',
      crit1: { name: 'Board Layout & Legibility', weight: 40, emerging: 'Messy, illegible columns.', developing: 'Columns drawn without headers.', proficient: 'Clear 3-column structure with bold labels.', exemplary: 'Visually appealing, durable study station fixture.' },
      crit2: { name: 'Task Granularity', weight: 35, emerging: 'Single note says "Homework".', developing: 'Missing page numbers.', proficient: 'Each subject on distinct note with page numbers.', exemplary: 'Precise task definitions with estimated sprint times.' },
      crit3: { name: 'Workflow Fidelity', weight: 25, emerging: 'Does not move notes.', developing: 'Puts all in DOING.', proficient: 'Strict 1-task DOING limit; moves to DONE.', exemplary: 'Self-directed audit and nightly board reset.' }
    },
    refs: [
      'What was the most satisfying part of moving notes to DONE?',
      'Did you find any task you almost forgot before writing it down?',
      'Where is the best spot near your desk to keep your board visible?',
      'How can this board help you track weekend chores too?'
    ]
  },

  // MONTH 8: Home Care, Meal Etiquette & Kitchen Safety
  {
    month: 8, monthTheme: 'Home Care, Meal Etiquette & Kitchen Safety', seq: 1,
    cat: 'life_independence', catLabel: 'Personal Independence & Daily Living',
    title: 'Preparing a Simple Supervised Cold Snack (Peanut Butter & Banana Slices)',
    why: 'Being able to make your own healthy after-school snack builds self-reliance, helps busy parents, and teaches safe food preparation.',
    objs: ['Wash hands with soap for 20 seconds before touching any food or utensils', 'Use a round-tipped plastic or butter knife safely with fingers curled like a bear claw', 'Peel a ripe banana and slice into even bite-sized rounds', 'Spread peanut butter or jam on bread or crackers and clean prep surface afterwards'],
    scenario: 'Rohan came home from school starving. His mother was on a work phone call. Instead of waiting impatiently or whining, Rohan decided to prepare a healthy banana snack by himself.',
    expl: 'Preparing your own snack is one of the first steps of growing up! You don’t need a gas stove or fire to make delicious food. With clean hands and a dull butter knife, you can make energy-rich snacks safely in 5 minutes.',
    steps: ['Wash hands thoroughly with soap and warm water; dry on a clean kitchen towel.', 'Place a clean chopping board on the counter.', 'Peel a banana and place it flat on the board.', 'Hold the banana with fingers curled like a "bear claw" and slice gently using a round-tip butter knife.', 'Spread topping on whole-wheat bread or biscuit rounds and arrange banana slices on top.'],
    example: { title: 'Rohan’s Energy Snack Plate', scenario: 'Rohan makes afternoon snack for himself and sister.', steps: ['Washes hands.', 'Slices 1 banana into 8 neat rounds.', 'Spreads 1 spoon of peanut butter on 2 whole-grain rusks.', 'Places 4 banana coins on each.', 'Wipes board and washes butter knife.'], takeaway: 'A tidy cook cleans up as soon as the snack is prepared.' },
    mistakes: [
      { mistake: 'Using a sharp chef’s knife from the wooden knife block without adult permission.', correction: 'Always use a blunt butter knife or plastic kid-safe knife; never touch sharp knives without adult supervision.' },
      { mistake: 'Leaving sticky peanut butter spoons and banana peels on the dining counter.', correction: 'Throw peels in the wet-waste bin and put utensils in the kitchen sink immediately.' }
    ],
    checklist: ['Did I wash hands with soap first?', 'Did I use a blunt butter knife?', 'Were fingers curled in a bear claw?', 'Did I wipe the counter and put dishes in sink?'],
    prompt: 'How did preparing your own snack feel compared to asking an adult to do it for you?',
    takeaway: 'Clean hands, safe tools, and tidy habits make you an independent snack master.',
    heroDesc: 'Child safely slicing a banana on a wooden chopping board using a blunt butter knife with bear-claw fingers.',
    vis1: { title: 'The Bear-Claw Finger Guard', caption: 'Curl fingertips under like a bear paw so knife blade never touches skin.' },
    vis2: { title: 'Cold Snack Master Station', caption: 'Chopping board, blunt knife, clean plate, wet-waste peel bowl.' },
    videoTitle: 'Safe Snacking: The Bear-Claw Banana Slice', videoDuration: '3 mins 20 secs',
    scenes: [
      { visual: "Child washing hands thoroughly at kitchen sink.", narration: "Rule number one of any kitchen: twenty seconds of soapy water." },
      { visual: "Demonstrating curled fingers 'bear claw' holding banana.", narration: "Curl your fingertips like a gentle bear claw. Slice with a blunt butter knife." },
      { visual: "Plating snack and wiping counter with damp cloth.", narration: "Independent chefs always leave the kitchen cleaner than they found it." }
    ],
    recap: "Make a supervised cold banana or cucumber snack today and clean your prep area.",
    act: {
      title: 'Independent Afternoon Snack Project',
      obj: 'Prepare a 2-ingredient healthy cold snack safely under adult supervision and clean up.',
      mats: ['1 banana or cucumber', 'Blunt butter knife', 'Chopping board', 'Plate', 'Clean duster'],
      steps: ['Ask an adult for permission and supervision.', 'Wash hands with soap.', 'Peel and slice using the bear claw technique.', 'Plate and serve.', 'Wipe chopping board and wash knife.'],
      output: 'A served snack plate and an adult-verified clean kitchen counter.',
      precautions: 'Do not use stoves, microwaves, or sharp pointed knives.',
      alt: 'Assemble a dry trail-mix cup with roasted peanuts, raisins, and roasted murmura.'
    },
    scenarioGuided: {
      context: 'Reyansh is slicing a cucumber and the knife slips slightly.',
      optimal: 'Stop immediately, check fingers, adjust grip into a firm bear claw, and cut slowly.',
      optReason: 'Slowing down and curling fingers prevents accidental nicks or slips.',
      nonOpt1: 'Hurry up and chop faster before anyone sees.',
      nonOptReason1: 'Rushing with slipping tools leads to injury.',
      nonOpt2: 'Switch to a giant sharp cleaver from the drawer.',
      nonOptReason2: 'Using unauthorized sharp blades creates severe danger.',
      takeaway: 'Control and patience are the marks of a skilled home chef.'
    },
    scenarioIndep: {
      context: 'You finished making your snack and your friend arrives to play.',
      prompt: 'Explain what you must do with your dirty plate, knife, and peels before running out.',
      rubric: 'Bin banana peel in green bin, wash knife/board in sink, wipe counter before going out.'
    },
    quiz: {
      q: 'Why should you curl your non-knife fingers into a "bear claw" when slicing food?',
      context: 'Preparing cucumber or banana slices with a butter knife.',
      optCorrect: 'Because curled knuckles guide the blade safely while protecting your fingertips from getting nicked.',
      optWrong1: 'Because it makes you look like a wild animal.',
      optWrong2: 'Because bananas slice faster when clawed.',
      optWrong3: 'Because it keeps the cutting board from moving.',
      remediation: 'Always tuck fingertips under; let your flat knuckle rest against the blade side.'
    },
    rubric: {
      task: 'Prepare a healthy cold snack using proper hygiene, knife technique, and kitchen clean-up.',
      mastery: 'Thorough handwashing, flawless bear-claw grip, even slices, pristine cleanup.',
      crit1: { name: 'Food Hygiene & Prep', weight: 40, emerging: 'Touches food without washing hands.', developing: 'Rinses with water only.', proficient: '20-second soap handwash; clean board setup.', exemplary: 'Flawless sanitary prep with clean apron/towel.' },
      crit2: { name: 'Cutting Technique', weight: 35, emerging: 'Fingers flat near blade.', developing: 'Inconsistent claw grip.', proficient: 'Consistent bear claw; blunt knife used safely.', exemplary: 'Even, disciplined knife strokes with complete control.' },
      crit3: { name: 'Workstation Cleanup', weight: 25, emerging: 'Leaves peels and mess on counter.', developing: 'Cleans only when told.', proficient: 'Independently wipes counter, bins peels, washes knife.', exemplary: 'Spotless reset of kitchen station.' }
    },
    refs: [
      'What was the tastiest part of making your own snack?',
      'Why is handwashing with soap non-negotiable before touching food?',
      'How does curling your fingers make cutting feel safer?',
      'What healthy snack will you make for your parents this weekend?'
    ]
  },
  {
    month: 8, monthTheme: 'Home Care, Meal Etiquette & Kitchen Safety', seq: 2,
    cat: 'life_independence', catLabel: 'Personal Independence & Daily Living',
    title: 'Clearing the Dining Table & Rinsing Your Plate After Meals',
    why: 'Leaving your dirty dishes for others shows disrespect. Clearing your own plate, disposing of food scraps, and rinsing builds family teamwork and gratitude.',
    objs: ['Pick up your plate and glass with two hands at the end of every meal', 'Scrape leftover food scraps into the green wet-waste compost bin using a fork', 'Rinse the plate under the kitchen tap to prevent dried curry stains', 'Place the rinsed dish neatly into the kitchen wash basin'],
    scenario: 'Every dinner, Aarav would eat, push his chair back, say "I am done!", and run straight to watch cartoons, leaving a messy plate with rice grains scattered on the table.',
    expl: 'In a loving family, everyone works together. When you leave your dirty plate on the table, someone else has to bend down, pick up your mess, and scrape cold food. Taking 60 seconds to clear your own spot shows true respect and maturity.',
    steps: ['Check your table area for fallen crumbs or napkins and scoop them onto your plate.', 'Pick up your plate and glass using two steady hands.', 'Walk calmly to the kitchen; do not run or balance dishes recklessly.', 'Use a fork or spoon to scrape all food waste into the green wet-waste dustbin.', 'Turn on the tap briefly, rinse away loose curry/sauce, and place dish gently in the sink.'],
    example: { title: 'Aarav’s 60-Second Table Reset', scenario: 'Dinner finishes at 8:30 PM.', steps: ['Aarav pushes his chair in.', 'Picks up his thali and katori.', 'Scrapes leftover roti crusts into wet bin.', 'Rinses plate under running water for 5 seconds.', 'Places plate neatly in sink.'], takeaway: 'Sixty seconds of effort makes your home feel cooperative and clean.' },
    mistakes: [
      { mistake: 'Leaving food scraps on the plate when putting it in the sink.', correction: 'Food scraps clog the drain pipe; always scrape solids into the wet-waste bin first.' },
      { mistake: 'Stacking a greasy plate right on top of a clean drinking glass.', correction: 'Keep glassware and oily plates separated to prevent broken glass.' }
    ],
    checklist: ['Did I push my chair in?', 'Did I carry dishes with two hands?', 'Did I scrape all leftovers into the wet bin?', 'Did I rinse off loose food before setting in sink?'],
    prompt: 'How would you feel if a guest ate at your house and left their dirty plate on your sofa?',
    takeaway: 'Clearing your own plate after every meal is the simplest sign of respect and family teamwork.',
    heroDesc: 'Child holding a stainless steel thali with two hands and scraping food scraps into a green organic waste bin.',
    vis1: { title: 'The 3-Step Dish Departure', caption: '1. Scrape scraps to wet bin -> 2. Rinse loose food under tap -> 3. Stack gently in sink.' },
    vis2: { title: 'Table Manners Audit', caption: 'Push chair in, wipe your crumb zone, thank the cook.' },
    videoTitle: 'The 60-Second Post-Meal Routine', videoDuration: '2 mins 45 secs',
    scenes: [
      { visual: "Messy dining table with abandoned dirty plates.", narration: "A meal isn't finished until the table is cleared." },
      { visual: "Child scraping food into compost bin and rinsing plate.", narration: "Scrape food into the green bin. Rinse off the sauce so it doesn't dry like glue." },
      { visual: "Placing dish neatly in sink and pushing chair in.", narration: "Push in your chair. Sixty seconds of teamwork makes a happy home." }
    ],
    recap: "Clear, scrape, rinse, and stack your plate after every meal today.",
    act: {
      title: '7-Day Clean Table Family Pledge',
      obj: 'Independently clear, scrape, and rinse your plate after every lunch and dinner for 7 days.',
      mats: ['Your meal plate', 'Fork/spoon for scraping', 'Kitchen sink', 'Pledge chart'],
      steps: ['Finish meal completely.', 'Scrape leftovers into wet-waste bin.', 'Rinse under tap for 5 seconds.', 'Place neatly in sink.', 'Record tick on pledge chart.'],
      output: 'A 14-meal signed tracking chart signed by a family member.',
      precautions: 'Walk slowly when carrying ceramic or glass plates to avoid breakage.',
      alt: 'Help wipe down the dining table with a damp cloth if using plastic plates.'
    },
    scenarioGuided: {
      context: 'Dev finishes dinner and sees that his little sister has also finished hers but is too small to reach the sink.',
      optimal: 'Clear his own plate first, then help carry his sister’s unbreakable bowl to the sink.',
      optReason: 'Demonstrates initiative, family leadership, and protective care.',
      nonOpt1: 'Laugh at his sister and leave both plates on the table.',
      nonOptReason1: 'Unkind and leaves double the work for parents.',
      nonOpt2: 'Try to carry 6 plates, glasses, and bowls stacked in a wobbly tower.',
      nonOptReason2: 'Risk of dropping and shattering dishes all over the floor.',
      takeaway: 'Be helpful, but make multiple safe trips instead of carrying dangerous towers.'
    },
    scenarioIndep: {
      context: 'You are eating dinner at your best friend’s house with their family.',
      prompt: 'Explain what you will do with your plate when dinner finishes.',
      rubric: 'Asked host where to put plate, thanked them for the meal, scraped and rinsed plate politely.'
    },
    quiz: {
      q: 'Why is it important to rinse your plate under the tap before putting it into the kitchen sink?',
      context: 'Clearing your dinner plate after eating dal and rice.',
      optCorrect: 'Because rinsing washes away loose food before it dries into rock-hard crusts that are tough to wash.',
      optWrong1: 'Because water makes plates weigh less.',
      optWrong2: 'Because you don’t need soap if you rinse.',
      optWrong3: 'Because kitchen sinks require running water 24/7.',
      remediation: 'Always rinse immediately so curry and grease wash away easily during dishwashing.'
    },
    rubric: {
      task: 'Clear a meal setting including food disposal, dish rinsing, and chair reset.',
      mastery: 'Two-hand carry, 100% scrap removal, thorough rinse, chair aligned, gratitude expressed.',
      crit1: { name: 'Carrying & Safety', weight: 40, emerging: 'Carries carelessly with one hand.', developing: 'Rushes to sink.', proficient: 'Calm, steady two-hand carry.', exemplary: 'Flawless balance with zero spills or clatter.' },
      crit2: { name: 'Scraping & Rinsing', weight: 35, emerging: 'Dumps plate with food into sink.', developing: 'Misses sticky scraps.', proficient: 'Scrapes all food to wet bin; thorough rinse.', exemplary: 'Pristine pre-rinse preventing drain clogs.' },
      crit3: { name: 'Table Courtesy', weight: 25, emerging: 'Leaves chair out and crumbs on table.', developing: 'Pushes chair only when reminded.', proficient: 'Pushes chair in and thanks family cook.', exemplary: 'Wipes crumb area and assists others.' }
    },
    refs: [
      'Who usually cleans the dishes in your home?',
      'How did they react when you cleared and rinsed your plate independently?',
      'Why do dried food stains take so much elbow grease to wash off later?',
      'How does clearing your plate make you feel more responsible?'
    ]
  },
  {
    month: 8, monthTheme: 'Home Care, Meal Etiquette & Kitchen Safety', seq: 3,
    cat: 'life_safety_health', catLabel: 'Safety, Health & Well-being',
    title: 'Kitchen Safety: The Three-Foot Boundary Away from Stoves & Steam',
    why: 'Kitchens have hot gas flames, boiling water, and sharp appliances. Knowing the safety boundaries prevents painful burns, scalds, and accidents.',
    objs: ['Identify the "Hot Zone": a 3-foot safety perimeter around gas stoves and ovens', 'Turn pot and pan handles inward toward the back of the stove, never sticking out into the aisle', 'Never open a boiling cooker lid or touch steam whistling from a pressure cooker', 'Know the immediate first aid for a minor burn: 10 minutes of cool running tap water'],
    scenario: 'Priya ran into the kitchen chasing her bouncing tennis ball. She brushed past the stove where a pot of boiling milk was simmering with the handle sticking straight out into the doorway.',
    expl: 'The kitchen is a wonderful place for cooking, but the stove area is a high-hazard zone. Boiling liquids, splattering hot oil, and pressure cooker steam can cause severe burns in a split second. Keeping a 3-foot safety zone keeps you and your family safe.',
    steps: ['Treat the gas stove and oven as a "Red Zone": stay at least 3 big steps (3 feet) back unless guided by an adult.', 'If you see a pan handle sticking out into the walkway, politely notify an adult or gently turn it inward.', 'Never touch or hover your face over a pressure cooker weight or bubbling soup pot.', 'If oil is frying, stay out of the kitchen to avoid hot oil splatters.', 'If someone gets a minor burn, immediately run cool tap water over it for 10 minutes (NEVER ice or toothpaste).'],
    example: { title: 'Priya’s Kitchen Safety Catch', scenario: 'Priya notices milk boiling with handle facing forward.', steps: ['Stops 3 feet away.', 'Alerts father: "Papa, the milk pan handle is sticking out."', 'Father turns handle sideways.', 'Priya plays ball outside in the garden.'], takeaway: 'Alerting an adult about sticking handles prevents catastrophic kitchen spills.' },
    mistakes: [
      { mistake: 'Putting ice cubes or toothpaste on a hot burn.', correction: 'Toothpaste traps heat inside the skin; always use cool running tap water for 10 full minutes.' },
      { mistake: 'Trying to pull off a whistling pressure cooker whistle with bare hands.', correction: 'Steam reaches over 100°C and causes instant deep burns; never touch a hot cooker.' }
    ],
    checklist: ['Am I standing at least 3 feet away from active burners?', 'Are all pan handles turned inward?', 'Are my face and hands far away from steam?', 'Do I know to use cool water for burns?'],
    prompt: 'Look at your home kitchen stove. Are the pan handles turned inward right now?',
    takeaway: 'Respect the kitchen hot zone: stay three feet back, turn handles in, and treat steam with caution.',
    heroDesc: 'Diagram of a kitchen stove showing the 3-foot yellow warning perimeter and pan handles safely turned inward.',
    vis1: { title: 'The 3-Foot Stove Boundary', caption: 'Yellow safety perimeter around gas burners, hot ovens, and boiling kettles.' },
    vis2: { title: 'Handle Direction Rule', caption: 'SAFE: Handle turned sideways over counter. DANGEROUS: Handle pointing out into aisle.' },
    videoTitle: 'Kitchen Danger Zones: Stay Safe Around Stoves', videoDuration: '3 mins 10 secs',
    scenes: [
      { visual: "Child running near stove with handle sticking out.", narration: "One accidental bump can send boiling soup flying." },
      { visual: "Turning pan handles inward and marking 3-foot zone.", narration: "Keep pan handles pointing inward and keep three feet of safe space." },
      { visual: "Running cool tap water over a finger for 10 minutes.", narration: "Burn emergency? Ten minutes of cool running water. No ice, no toothpaste." }
    ],
    recap: "Audit your kitchen stove today to ensure all pot handles point safely inward.",
    act: {
      title: 'Kitchen Hot-Zone Safety Audit',
      obj: 'Inspect your home kitchen with a parent and verify stove boundaries and emergency burn response.',
      mats: ['Kitchen audit checklist', 'Measuring tape or 3-step ruler', 'Pencil'],
      steps: ['Walk into kitchen with an adult.', 'Identify the 3-foot perimeter around stove.', 'Check if pan handles on the counter point inward.', 'Locate cold tap water station for burn first aid.'],
      output: 'A signed Kitchen Safety Checklist verified by an adult family member.',
      precautions: 'Do not touch burners, knobs, or hot surfaces during the audit.',
      alt: 'Draw a poster showing the "3-Foot Kitchen Hot Zone" and tape it on the fridge.'
    },
    scenarioGuided: {
      context: 'Kabir sees steam pouring out of the rice pot on the stove while his mother is in the bathroom.',
      optimal: 'Stay 3 feet back, do not touch the pot, and call out loudly to mother that the pot is steaming.',
      optReason: 'Maintains personal safety while informing the responsible adult.',
      nonOpt1: 'Try to lift the hot metal lid with bare hands to check the rice.',
      nonOptReason1: 'Hot metal and trapped steam cause instant severe hand burns.',
      nonOpt2: 'Throw cold water at the burning gas flame.',
      nonOptReason2: 'Can cause a sudden flare-up, steam explosion, or gas leak.',
      takeaway: 'Never attempt to handle active boiling cookware without adult hands.'
    },
    scenarioIndep: {
      context: 'Your younger cousin runs into the kitchen toward the stove to grab a hot sweet.',
      prompt: 'Explain what physical action and words you will use to protect them.',
      rubric: 'Gently blocked cousin from entering hot zone, guided them back, and warned about hot stove.'
    },
    quiz: {
      q: 'What is the correct first-aid action for a minor burn caused by touching hot cookware?',
      context: 'Accidentally brushed forearm against a hot frying pan.',
      optCorrect: 'Hold the burned area under cool running tap water for 10 to 15 minutes immediately.',
      optWrong1: 'Smear white toothpaste or butter all over the burn.',
      optWrong2: 'Rub a large ice cube directly onto the blistered skin.',
      optWrong3: 'Cover the burn with hot turmeric paste and wrap tightly.',
      remediation: 'Cool running water gently removes heat from deep skin layers without causing frostbite or infection.'
    },
    rubric: {
      task: 'Conduct a kitchen safety demonstration explaining hot zones, handle placement, and burn first aid.',
      mastery: 'Accurate boundary definition, handle risk explained, proper burn first aid demonstrated.',
      crit1: { name: 'Perimeter Awareness', weight: 40, emerging: 'Unaware of stove risks.', developing: 'Knows fire is hot but forgets steam.', proficient: 'Clearly identifies 3-foot zone and steam hazards.', exemplary: 'Thorough identification of heat, steam, and splatter zones.' },
      crit2: { name: 'Cookware Handle Safety', weight: 35, emerging: 'Leaves handles outward.', developing: 'Identifies risk only when prompted.', proficient: 'Explains handle inward rule correctly.', exemplary: 'Proactively checks handle orientation in kitchen.' },
      crit3: { name: 'First Aid Knowledge', weight: 25, emerging: 'Recommends toothpaste or ice.', developing: 'Mentions water but for <1 minute.', proficient: 'Specifies 10 minutes of cool running tap water.', exemplary: 'Accurately explains cooling mechanism and cautions against ice.' }
    },
    refs: [
      'Why is steam from a cooker just as dangerous as an open fire flame?',
      'Have you ever seen a pot handle sticking out in a way that could get bumped?',
      'Why does toothpaste actually harm a burn instead of helping it?',
      'What is your family’s safety rule when someone is frying foods in hot oil?'
    ]
  },

  // MONTH 9: Personal Hygiene, Screen Limits & Healthy Sleep
  {
    month: 9, monthTheme: 'Personal Hygiene, Screen Limits & Healthy Sleep', seq: 1,
    cat: 'life_safety_health', catLabel: 'Safety, Health & Well-being',
    title: 'The Two-Minute Circular Toothbrushing & Handwash Routine',
    why: 'Cavities and tummy bugs are completely preventable. Mastering the 2-minute circular brushing technique and 20-second soap handwash keeps you healthy and cavity-free.',
    objs: ['Brush teeth for 2 full minutes twice daily using gentle circular motions', 'Clean the front, chewing surfaces, and back of every tooth, plus gently brush the tongue', 'Wash hands with soap for 20 seconds, lathering between fingers, backs of hands, and under nails', 'Rinse mouth thoroughly and store toothbrush upright in a dry holder'],
    scenario: 'Siddharth brushed his teeth in 25 seconds flat: a few quick horizontal scrubs across his front teeth, a quick spit, and he ran out. At his dental checkup, the dentist found two cavities on his back molars.',
    expl: 'Plaque is a sticky film of bacteria that loves to hide in the grooves of your back molars and along the gumline. Scrubbing back-and-forth like a saw damages your gums! Tiny circles gently polish away plaque without hurting your teeth.',
    steps: ['Place a pea-sized dot of fluoride toothpaste on soft bristles.', 'Tilt brush at a 45-degree angle toward the gumline.', 'Move the brush in small, gentle circles: 30 seconds for top-right, top-left, bottom-right, bottom-left (2 minutes total).', 'Brush the flat chewing surfaces back and forth.', 'Gently sweep your tongue from back to front, spit out toothpaste, and rinse brush.'],
    example: { title: 'Siddharth’s 2-Minute Toothbrush Tune', scenario: 'Siddharth sings a 2-minute song while brushing.', steps: ['Sings verse 1 for upper teeth.', 'Sings verse 2 for lower teeth.', 'Cleans chewing surfaces on chorus.', 'Cleans tongue on outro.', 'Spits clean with sparkling breath.'], takeaway: 'Two minutes twice a day saves you from painful dental drills.' },
    mistakes: [
      { mistake: 'Pressing as hard as possible until the toothbrush bristles bend flat.', correction: 'Pressing hard wears away protective enamel; use light, gentle circular pressure.' },
      { mistake: 'Swallowing toothpaste or rinsing hands with plain water without soap.', correction: 'Always spit out toothpaste, and always lather soap for 20 seconds to kill germs.' }
    ],
    checklist: ['Did I brush for a full 2 minutes?', 'Did I reach the very back molars?', 'Did I use gentle circles instead of hard scrubbing?', 'Did I lather soap for 20 seconds before eating?'],
    prompt: 'How clean and smooth do your teeth feel when you run your tongue over them after 2 full minutes?',
    takeaway: 'Two minutes of gentle circles in the morning and before bed protects your smile for life.',
    heroDesc: 'Child smiling into bathroom mirror while demonstrating circular toothbrushing at a 45-degree angle.',
    vis1: { title: 'The 4-Quadrant 2-Minute Map', caption: '30 seconds per quadrant: Top-Right, Top-Left, Bottom-Left, Bottom-Right.' },
    vis2: { title: 'The 20-Second Handwash Steps', caption: 'Palms, backs of hands, between fingers, thumbs, fingernails, rinse.' },
    videoTitle: 'The 2-Minute Circular Brushing Technique', videoDuration: '3 mins 00 secs',
    scenes: [
      { visual: "Animation showing sticky plaque hiding between back molars.", narration: "Plaque loves hiding where quick brushers never reach." },
      { visual: "Demonstrating 45-degree angle and small circular brush strokes.", narration: "Gentle circles, quadrant by quadrant. Two full minutes, morning and night." },
      { visual: "Soap lathering palms, knuckles, and fingernails for 20 seconds.", narration: "Twenty seconds of soapy lather washes germs right down the drain." }
    ],
    recap: "Brush for a full 2 minutes tonight using a timer or favourite two-minute song.",
    act: {
      title: '14-Day Sparkle Smile & Clean Hands Tracker',
      obj: 'Track 2-minute morning/night brushing and 20-second handwashing for 14 days.',
      mats: ['Soft toothbrush', 'Toothpaste', '2-minute sand timer or clock', 'Tracker sheet'],
      steps: ['Set timer before unseating brush.', 'Brush all 4 quadrants thoroughly.', 'Spit and rinse brush.', 'Tick morning and night boxes on tracker.'],
      output: 'A completed 14-day hygiene log with 28 verified checkmarks.',
      precautions: 'Do not swallow toothpaste; spit thoroughly after brushing.',
      alt: 'Use a smartphone dental timer app with fun musical quadrants.'
    },
    scenarioGuided: {
      context: 'Ananya is exhausted at 9:30 PM and wants to skip brushing her teeth just for tonight.',
      optimal: 'Remind herself that night-time is when bacteria multiply fastest, and spend 2 minutes brushing.',
      optReason: 'Night brushing cleans away food sugars that would otherwise rot teeth during 8 hours of sleep.',
      nonOpt1: 'Just chew a mint candy in bed and go to sleep.',
      nonOptReason1: 'Candy adds sugar, causing twice as much bacterial decay.',
      nonOpt2: 'Rinse mouth with a sip of water for 3 seconds.',
      nonOptReason2: 'Water does not remove sticky plaque from molar grooves.',
      takeaway: 'Night brushing is the most critical dental defense of the whole day.'
    },
    scenarioIndep: {
      context: 'You just finished playing football on the dusty school ground and are sitting down for lunch.',
      prompt: 'Explain step-by-step how you will wash your hands with soap before touching your sandwich.',
      rubric: 'Wet hands, pump soap, lather palms/backs/between fingers for 20 seconds, rinse clean, dry with napkin.'
    },
    quiz: {
      q: 'Why should you brush your teeth in small gentle circles rather than scrubbing hard back and forth?',
      context: 'Learning daily dental hygiene technique.',
      optCorrect: 'Because gentle circles protect delicate gums and enamel while effectively sweeping plaque away.',
      optWrong1: 'Because circles make your toothpaste change color.',
      optWrong2: 'Because scrubbing back and forth takes too much toothpaste.',
      optWrong3: 'Because circular brushing only works on baby teeth.',
      remediation: 'Hard back-and-forth sawing damages gum tissue; use gentle circles like polishing an apple.'
    },
    rubric: {
      task: 'Demonstrate the 4-quadrant circular brushing technique and 20-second handwash sequence.',
      mastery: 'Full 2-minute duration, 45-degree angle, circular motion, all surfaces covered, thorough handwash.',
      crit1: { name: 'Brushing Technique & Motion', weight: 40, emerging: 'Hard horizontal sawing.', developing: 'Circles on front only.', proficient: 'Consistent small circular motions across all teeth.', exemplary: 'Flawless 45-degree angle and gentle gumline polish.' },
      crit2: { name: 'Quadrant Timing', weight: 35, emerging: 'Finishes in under 45 seconds.', developing: 'Rushes back teeth.', proficient: 'Spends full 30 seconds per quadrant (2 min total).', exemplary: 'Disciplined timing with dedicated tongue cleaning.' },
      crit3: { name: 'Hand Hygiene Mastery', weight: 25, emerging: 'Rinses without soap.', developing: 'Washes only palms.', proficient: '20-second soap lather covering backs and fingers.', exemplary: 'Full surgical-clean routine with nail lathering.' }
    },
    refs: [
      'What song do you like to hum to keep your brushing going for 2 minutes?',
      'Why is night brushing even more important than morning brushing?',
      'How does keeping your toothbrush upright help it stay clean?',
      'What did your dentist tell you about taking care of your teeth?'
    ]
  },
  {
    month: 9, monthTheme: 'Personal Hygiene, Screen Limits & Healthy Sleep', seq: 2,
    cat: 'life_study_skills', catLabel: 'Study Skills & Learning Independence',
    title: 'Screen-Time Boundaries: The 30-Minute Digital Sunset Before Bed',
    why: 'Blue light from phone and tablet screens tricks your brain into thinking it is daytime, destroying deep sleep. A 30-minute digital sunset ensures restful sleep and morning energy.',
    objs: ['Power down or dock all digital devices at least 30 minutes before sleep', 'Explain how blue screen light suppresses melatonin (the sleep hormone)', 'Substitute screen time with relaxing offline habits (reading books, sketching, journaling)', 'Set up a family charging dock outside the bedroom'],
    scenario: 'Tara played video games on a tablet in bed until 10 PM. Even after switching the screen off, her eyes felt strained, her brain felt racing, and she tossed and turned until midnight, waking up irritable and sluggish.',
    expl: 'Our eyes have special sensors that look for blue light from the sun. Screens blast your eyes with artificial blue light! When you look at a screen in bed, your brain thinks "The sun is up, stay awake!" A 30-minute screen sunset gives your brain time to produce melatonin and prepare for blissful sleep.',
    steps: ['Pick your bedtime target (e.g. 9:30 PM).', 'Set your "Digital Sunset" 30 minutes prior (at 9:00 PM).', 'Turn off all screens, phones, tablets, and gaming consoles.', 'Plug devices into a family charging dock in the living room.', 'Spend the final 30 minutes reading a paper book, listening to soft music, or talking with family.'],
    example: { title: 'Tara’s 30-Minute Sunset Routine', scenario: 'Tara switches off tablet at 9:00 PM.', steps: ['Puts tablet on living room charger.', 'Brushes teeth and washes face.', 'Reads two chapters of a mystery novel in bed.', 'Turns off bedside lamp at 9:30 PM.', 'Falls asleep in under 10 minutes.'], takeaway: 'A 30-minute screen break leads to fast, deep, restorative sleep.' },
    mistakes: [
      { mistake: 'Keeping a smartphone or tablet under your pillow to check messages at night.', correction: 'Bed is strictly for sleeping; charge devices outside the bedroom.' },
      { mistake: 'Watching "just one more 2-minute short video" in the dark.', correction: 'Short video algorithms are designed to trap you; stick to your firm 9:00 PM cutoff.' }
    ],
    checklist: ['Are all screens off 30 minutes before bedtime?', 'Are devices docked outside the bedroom?', 'Am I doing a calm, offline activity?', 'Is my bedroom dim and quiet?'],
    prompt: 'How did your sleep feel on nights when you didn’t look at a screen in bed?',
    takeaway: 'Give your eyes a digital sunset every night to enjoy deep sleep and boundless morning energy.',
    heroDesc: 'Child putting tablet into a wooden charging dock in the living room and walking to bedroom with a storybook.',
    vis1: { title: 'The Melatonin Clock', caption: 'Blue screen light blocks sleep hormones. Digital Sunset allows melatonin to rise naturally.' },
    vis2: { title: 'Offline Bedtime Alternatives', caption: 'Read paper book, sketch diary, light body stretches, family chat.' },
    videoTitle: 'The Power of the 30-Minute Digital Sunset', videoDuration: '2 mins 55 secs',
    scenes: [
      { visual: "Child staring at glowing screen in dark room vs calm bedroom reading book.", narration: "Blue light tells your brain the sun is shining at midnight." },
      { visual: "Docking device at 9:00 PM in living room.", narration: "Create a 30-minute digital sunset. Plug your device in the hallway." },
      { visual: "Child drifting into deep peaceful sleep.", narration: "Wake up energized, refreshed, and ready to conquer tomorrow." }
    ],
    recap: "Shut off all screens 30 minutes before bed tonight and read a paper book instead.",
    act: {
      title: '7-Night Digital Sunset Experiment',
      obj: 'Dock all screens 30 minutes before bed for 7 consecutive nights and track morning alertness.',
      mats: ['Storybook or notebook', 'Bedside lamp', '7-night sleep journal'],
      steps: ['Establish target bedtime.', 'Announce Digital Sunset 30 mins prior.', 'Dock devices outside bedroom.', 'Engage in offline wind-down.', 'Rate morning freshness from 1 to 5 stars.'],
      output: 'A completed 7-night sleep tracker showing morning energy ratings.',
      precautions: 'Do not replace gaming screens with television screens; all electronic displays must rest.',
      alt: 'Listen to an audio bedtime story or calm instrumental music in the dark.'
    },
    scenarioGuided: {
      context: 'Nikhil gets a notification on his tablet right as his 9:00 PM digital sunset begins.',
      optimal: 'Ignore the notification, dock the tablet on the charger, and inspect it tomorrow morning.',
      optReason: 'Notifications are rarely emergencies; protecting sleep is the top priority.',
      nonOpt1: 'Unlock tablet to see who messaged, reply, and start playing a game.',
      nonOptReason1: 'One message turns into 45 minutes of wasted sleep time.',
      nonOpt2: 'Take tablet into bed and hide under the blanket so parents don’t notice.',
      nonOptReason2: 'Harms eyesight, breaks parental trust, and guarantees morning exhaustion.',
      takeaway: 'No notification is more important than your health and sleep.'
    },
    scenarioIndep: {
      context: 'Your friend boasts that they play video games until 1 AM every night and only sleep 4 hours.',
      prompt: 'Explain what you would tell them about how sleep affects brain growth, mood, and sports.',
      rubric: 'Explained that deep sleep repairs muscles, consolidates memories, and boosts daytime mood.'
    },
    quiz: {
      q: 'Why does looking at a phone or tablet screen in bed make it hard to fall asleep?',
      context: 'Understanding the biology of sleep and blue light.',
      optCorrect: 'Because artificial blue light blocks the production of melatonin, tricking your brain into thinking it is daytime.',
      optWrong1: 'Because phone batteries get hot and warm up the room.',
      optWrong2: 'Because video games delete your dreams.',
      optWrong3: 'Because Wi-Fi signals keep your ears awake.',
      remediation: 'Blue light stops melatonin release; power down 30 minutes early to let your brain wind down.'
    },
    rubric: {
      task: 'Establish and execute a 30-minute pre-bed digital sunset routine for 5 consecutive school nights.',
      mastery: 'Punctual screen cutoff, device docked outside room, relaxing offline activity, improved sleep quality.',
      crit1: { name: 'Sunset Punctuality', weight: 40, emerging: 'Uses screen in bed.', developing: 'Turns off only 5 mins before bed.', proficient: 'Consistently docks devices 30 mins before sleep.', exemplary: '100% disciplined cutoff with zero reminder.' },
      crit2: { name: 'Device Boundary', weight: 35, emerging: 'Keeps device on nightstand.', developing: 'Device in room but across desk.', proficient: 'Docks device in designated non-bedroom area.', exemplary: 'Family dock championing with siblings.' },
      crit3: { name: 'Wind-Down Quality', weight: 25, emerging: 'Stares at TV instead.', developing: 'Paces restlessly.', proficient: 'Calm offline engagement (reading, drawing).', exemplary: 'Deep restful bedtime rituals established.' }
    },
    refs: [
      'What book or activity do you enjoy most during your digital sunset?',
      'How does your mood differ in the morning after a good night’s sleep?',
      'Why is it harder to stop watching short videos than reading a book?',
      'What family rule can everyone adopt about keeping phones out of bedrooms?'
    ]
  },
  {
    month: 9, monthTheme: 'Personal Hygiene, Screen Limits & Healthy Sleep', seq: 3,
    cat: 'life_citizenship_community', catLabel: 'Practical Citizenship & Community Life',
    title: 'Saving Water at the School Tap & Reporting Dripping Faucets',
    why: 'Fresh clean water is a precious resource. Turning taps off tightly, using cups to rinse, and reporting leaks prevents thousands of liters from going to waste.',
    objs: ['Turn off taps completely while soaping hands or brushing teeth', 'Use a tumbler or cup for mouth rinsing instead of letting the tap run continuously', 'Identify a leaking or dripping tap and report it promptly to school maintenance or teacher', 'Practice filling your personal water bottle without overflowing and wasting water'],
    scenario: 'During recess, Aarav saw that someone left the water tap running full blast in the school washroom. Water was overflowing onto the tiles while three boys walked past without caring.',
    expl: 'Every drop of clean water required pumps, electricity, and treatment to reach your school tap. A faucet running for just 10 minutes wastes over 100 liters of pure water! A responsible citizen never walks past running water. Turning it off takes two seconds and saves nature.',
    steps: ['When washing hands, turn the tap OFF while lathering soap for 20 seconds.', 'Turn the tap back on only to rinse away the suds.', 'When done, turn the handle firmly until the water flow stops completely (don’t force it too hard).', 'If you hear a persistent drip-drip even when closed, tell your teacher or school guard.', 'Never leave taps running unattended.'],
    example: { title: 'Aarav’s 2-Second Water Rescue', scenario: 'Aarav sees running washroom tap.', steps: ['Steps forward and turns handle clockwise.', 'Water flow stops instantly.', 'Notices small drip from base.', 'Tells school attendant: "Tap 3 has a drip at the base."', 'Attendant tightens washer with wrench.'], takeaway: 'Stopping a tap takes two seconds and saves hundreds of liters of water.' },
    mistakes: [
      { mistake: 'Leaving the bathroom tap running full speed while brushing teeth for 2 minutes.', correction: 'Letting the tap run wastes 20 liters; always use a cup or turn tap off until rinsing.' },
      { mistake: 'Ignoring a running tap because "it wasn’t me who left it open."', correction: 'Citizens take responsibility for shared resources; turn it off regardless of who left it.' }
    ],
    checklist: ['Is the tap turned off while soaping hands?', 'Is the handle firmly closed with no drips?', 'Did I use a tumbler to rinse?', 'Did I report any broken washers to an adult?'],
    prompt: 'How many people in your city or village do you think struggle to get clean drinking water?',
    takeaway: 'Every drop counts: turn taps off firmly, never walk past a leak, and protect our water.',
    heroDesc: 'Student reaching out to firmly shut off a gushing public school water tap.',
    vis1: { title: 'The Running Tap Disaster', caption: 'A running tap wastes 10-12 liters every minute. A dripping tap wastes 30 liters a day.' },
    vis2: { title: 'The Soapy Pause Technique', caption: 'Wet hands -> TURN TAP OFF -> Lather soap 20s -> Turn tap on -> Rinse.' },
    videoTitle: 'Water Guardians: Stop the School Leak', videoDuration: '2 mins 50 secs',
    scenes: [
      { visual: "Close-up of tap left gushing water onto bathroom floor.", narration: "Millions of liters of clean drinking water are wasted by open taps every day." },
      { visual: "Child stepping up and turning the faucet firmly to the off position.", narration: "Be a water hero. It takes two seconds to turn the handle and save the day." },
      { visual: "Reporting a persistent drip to the school caretaker.", narration: "See a persistent drip? Report it. One small voice protects our community's future." }
    ],
    recap: "Never walk past a running tap: turn it off firmly wherever you see it today.",
    act: {
      title: 'School & Home Water Leak Audit',
      obj: 'Inspect all water taps at home and in school; turn off open taps and log any leaks.',
      mats: ['Audit paper', 'Pencil', 'Dry cloth to check tap drips'],
      steps: ['Check bathroom, kitchen, and washbasin taps at home.', 'Check water points at school during recess.', 'Firmly close any half-open taps.', 'Report any dripping faucets to parents or teachers.'],
      output: 'A Water Audit Sheet detailing number of taps inspected and leaks reported.',
      precautions: 'Do not use excessive force to wrench old rusty plumbing handles.',
      alt: 'Place a measuring cup under a dripping tap at home for 1 hour to measure wasted water.'
    },
    scenarioGuided: {
      context: 'Kiran notices that the school drinking water fountain has a stuck push-button that won’t pop back up.',
      optimal: 'Try gently tapping the button once, and immediately notify the nearest teacher on corridor duty.',
      optReason: 'Ensures water is stopped quickly by an adult with tools or facility keys.',
      nonOpt1: 'Shrug shoulders and walk away to play football.',
      nonOptReason1: 'Allows hundreds of liters of drinking water to flood the playground.',
      nonOpt2: 'Kick the water pipe with heavy sports shoes.',
      nonOptReason2: 'Risk of cracking the PVC pipe and causing a massive pipe burst.',
      takeaway: 'Quick reporting to school staff solves facility problems safely.'
    },
    scenarioIndep: {
      context: 'You see a classmate playing with the garden hose at school, spraying water on the concrete pavement.',
      prompt: 'Explain what you will say to them politely to help them conserve water.',
      rubric: 'Politely reminded friend that water is scarce; suggested turning off hose and playing games instead.'
    },
    quiz: {
      q: 'How much water can be wasted by letting a bathroom tap run continuously while brushing teeth for 2 minutes?',
      context: 'Evaluating water conservation during daily hygiene.',
      optCorrect: 'Up to 15 to 20 liters of clean drinking water.',
      optWrong1: 'Less than half a cup.',
      optWrong2: 'Zero water because it goes back into the tank.',
      optWrong3: 'Only 1 teaspoon.',
      remediation: 'Running taps flow at 8-10 liters per minute; turn it off while brushing to save over 15 liters.'
    },
    rubric: {
      task: 'Conduct a public water conservation audit and demonstrate the soapy-pause handwash method.',
      mastery: 'Identifies tap state, executes soapy pause, demonstrates proper reporting protocol.',
      crit1: { name: 'Tap Operation & Discipline', weight: 40, emerging: 'Leaves taps dripping.', developing: 'Closes taps loosely.', proficient: 'Firmly secures tap handles after use.', exemplary: 'Instinctively turns off taps while lathering soap.' },
      crit2: { name: 'Civic Initiative', weight: 35, emerging: 'Walks past running taps.', developing: 'Closes tap only when told.', proficient: 'Closes running public taps independently.', exemplary: 'Proactively audits taps and reports plumbing issues.' },
      crit3: { name: 'Conservation Awareness', weight: 25, emerging: 'Unaware of water scarcity.', developing: 'Vague estimates.', proficient: 'Explains impact of dripping taps accurately.', exemplary: 'Inspires peers to practice water conservation.' }
    },
    refs: [
      'Have you ever seen an open water tap in a public park or railway station?',
      'How does closing a tap help families who have to fetch water from wells?',
      'What can your school do to celebrate students who stop water waste?',
      'How will you remind your family to turn off the tap while brushing?'
    ]
  },

  // MONTH 10: Smart Spending, Saving Habits & Spotting Ad Traps
  {
    month: 10, monthTheme: 'Smart Spending, Saving Habits & Spotting Ad Traps', seq: 1,
    cat: 'life_money_management', catLabel: 'Money Management & Financial Literacy',
    title: 'The 3-Envelope Savings System: Spend, Save, and Share',
    why: 'Spending all your money the minute you receive it leaves you empty-handed for big goals. Dividing cash into 3 envelopes builds lifelong wealth and generosity.',
    objs: ['Label 3 envelopes or jars: SPEND (everyday needs), SAVE (future big goals), SHARE (helping others)', 'Divide birthday cash or festival pocket money into the 3 envelopes (50% Spend, 40% Save, 10% Share)', 'Set a specific, exciting goal for the SAVE envelope (e.g. a ₹400 book or badminton racket)', 'Track balances on the front of each envelope using pencil tick marks'],
    scenario: 'Vihaan received ₹500 from his grandfather for his birthday. He rushed to the stationary shop and bought 10 cheap plastic toy cars that broke by Friday evening. On Saturday, his friends invited him to the planetarium, but he had ₹0 left.',
    expl: 'Money is like water: if you pour it all out in one second, you get a muddy puddle and no drinking water tomorrow! The 3-Envelope System gives every rupee a distinct job: SPEND gives you fun today, SAVE buys your dream goal tomorrow, and SHARE brings joy to someone in need.',
    steps: ['Get 3 paper envelopes or small jars.', 'Label them with bold markers: 1. SPEND, 2. SAVE, 3. SHARE.', 'Whenever you receive money (e.g. ₹100), divide it: ₹50 in SPEND, ₹40 in SAVE, ₹10 in SHARE.', 'Use SPEND for small snacks or pencil erasers.', 'Never touch SAVE until you reach your written goal!'],
    example: { title: 'Vihaan’s 3-Envelope Turnaround', scenario: 'Vihaan receives ₹200 festival gift.', steps: ['Puts ₹100 in SPEND for weekend ice cream.', 'Puts ₹80 in SAVE toward a new helmet.', 'Puts ₹20 in SHARE for stray animal food.', 'Writes new balance on envelope fronts.'], takeaway: 'Having money in SAVE means you are always prepared and building for something great.' },
    mistakes: [
      { mistake: 'Borrowing money from the SAVE envelope to buy chips or candy.', correction: 'Treat the SAVE envelope as a locked vault until your specific goal is reached.' },
      { mistake: 'Leaving cash lying loose in school bags or on desks.', correction: 'Always store your envelopes in a safe drawer known to your parents.' }
    ],
    checklist: ['Are all 3 envelopes clearly labeled?', 'Did I divide new money before spending any?', 'Do I have a specific written goal on my SAVE envelope?', 'Did I write the updated amount on the back?'],
    prompt: 'What big goal would you love to save for over the next three months?',
    takeaway: 'Spend some, save more, and share a little: that is the golden secret of smart money management.',
    heroDesc: 'Child placing a 50-rupee note into a clearly labeled green SAVE envelope on a wooden desk.',
    vis1: { title: 'The 50/40/10 Ratio Split', caption: '50% Spend (Today) + 40% Save (Big Goal) + 10% Share (Kindness).' },
    vis2: { title: 'The Goal Tracking Thermometer', caption: 'Coloring in thermometer levels on the SAVE envelope as savings grow.' },
    videoTitle: 'The 3-Envelope Money Magic', videoDuration: '3 mins 15 secs',
    scenes: [
      { visual: "Child spending entire pocket money at once and feeling empty pockets.", narration: "Spent all your money on day one? There is a smarter way." },
      { visual: "Demonstrating labeling SPEND, SAVE, SHARE envelopes.", narration: "Three envelopes give every rupee a mission. Fifty percent to spend, forty to save, ten to share." },
      { visual: "Purchasing a long-awaited bicycle helmet with saved money.", narration: "Patience pays off. Achieve big dreams one rupee at a time." }
    ],
    recap: "Label 3 envelopes today and divide your next pocket money using the 50/40/10 rule.",
    act: {
      title: '3-Envelope System Setup & Goal Setting',
      obj: 'Construct and decorate 3 envelopes, write a specific savings goal, and make your first allocation.',
      mats: ['3 paper envelopes or envelopes folded from paper', 'Colored markers', 'Any coins or cash notes'],
      steps: ['Decorate Envelope 1: SPEND (with pictures of everyday fun).', 'Decorate Envelope 2: SAVE (draw your target goal and target amount).', 'Decorate Envelope 3: SHARE (draw helping hands).', 'Make your first deposit and write the tally on the back.'],
      output: 'A fully functional 3-envelope kit with an active written savings goal.',
      precautions: 'Keep envelopes in a secure, designated home spot with parental awareness.',
      alt: 'Use 3 small plastic containers or jars with labeled masking tape.'
    },
    scenarioGuided: {
      context: 'Meera has ₹300 in her SAVE envelope for a science microscope kit costing ₹500. A shiny laser toy catches her eye for ₹200.',
      optimal: 'Remind herself of her dream microscope, leave the SAVE envelope untouched, and walk away.',
      optReason: 'Staying committed to a high-value long-term goal prevents impulse-buy regret.',
      nonOpt1: 'Take ₹200 out of SAVE to buy the laser toy right now.',
      nonOptReason1: 'Resets her savings to ₹100 and delays her microscope by months.',
      nonOpt2: 'Take the money out of the SHARE envelope instead.',
      nonOptReason2: 'Breaks the integrity of money earmarked for helping others.',
      takeaway: 'Delaying short-term temptation unlocks long-term dreams.'
    },
    scenarioIndep: {
      context: 'You receive ₹150 for helping clean the family storeroom.',
      prompt: 'Calculate how much money goes into SPEND, SAVE, and SHARE using the 50/40/10 rule.',
      rubric: 'Correctly calculated: ₹75 in SPEND, ₹60 in SAVE, and ₹15 in SHARE.'
    },
    quiz: {
      q: 'Why should you divide money into envelopes immediately when you receive it rather than at the end of the month?',
      context: 'Applying the 3-Envelope savings discipline.',
      optCorrect: 'Because if you keep it all together, you will spend it on small impulses and have nothing left to save.',
      optWrong1: 'Because bank notes lose value if kept in one pocket.',
      optWrong2: 'Because envelopes make money multiply automatically.',
      optWrong3: 'Because parents require envelopes by law.',
      remediation: 'Always "pay your savings first" before you start spending on daily treats.'
    },
    rubric: {
      task: 'Set up a 3-envelope budget system with accurate mathematical allocation and goal declaration.',
      mastery: 'Envelopes labeled, 50/40/10 allocation executed, realistic goal declared, log maintained.',
      crit1: { name: 'System Setup & Labeling', weight: 40, emerging: 'Messy single container.', developing: '2 envelopes created.', proficient: '3 distinct labeled envelopes with goal and rules.', exemplary: 'Beautifully decorated system with clear ledger lines.' },
      crit2: { name: 'Math & Allocation', weight: 35, emerging: 'Random division.', developing: 'Calculation errors.', proficient: 'Accurate 50/40/10 percentage division.', exemplary: 'Flawless mental math and tracking ledger.' },
      crit3: { name: 'Savings Discipline', weight: 25, emerging: 'Raids savings for candy.', developing: 'Tempted but resists with help.', proficient: 'Maintains savings sanctity independently.', exemplary: 'Inspiring self-control and consistent progress updates.' }
    },
    refs: [
      'What item is drawn on your SAVE envelope right now?',
      'How does putting money in the SHARE envelope make you feel about helping others?',
      'Why do impulse purchases often end up gathering dust on a shelf?',
      'How can you use this system when you get festival money or birthday gifts?'
    ]
  },
  {
    month: 10, monthTheme: 'Smart Spending, Saving Habits & Spotting Ad Traps', seq: 2,
    cat: 'life_critical_thinking', catLabel: 'Critical Thinking & Everyday Problem-Solving',
    title: 'Spotting Toy Ad Traps & Commercial Tricks on Television',
    why: 'Advertisements are designed to make cheap toys look magical and huge using special effects. Learning to decode ad tricks saves your pocket money from bitter disappointment.',
    objs: ['Identify common TV ad tricks: special lighting, slow-motion flying, dramatic music, and miniature camera angles', 'Spot the tiny disclaimer at the bottom: "Batteries not included", "Assembly required", "Does not actually fly"', 'Ask the 3 Smart Consumer Questions: "Does it really do that?", "Will I play with it next month?", "Is it made of cheap plastic?"', 'Compare an ad’s video promise with how the actual toy looks inside a plain cardboard box'],
    scenario: 'Arnav watched a commercial for "Hyper-Rocket 3000". In the ad, the rocket zoomed across the galaxy with roaring engine sounds and laser lights! When he bought it with his savings, it was a 4-inch hollow plastic tube that hopped 2 feet when squeezed.',
    expl: 'Advertisers spend millions of rupees on special effects, wind machines, and dramatic lighting to make toys look alive! But toys don’t fly by magic—they sit on tables. Critical thinkers look past the special effects and ask: "What does this plastic object actually do when I hold it in my hands?"',
    steps: ['Watch the commercial closely: is the toy flying because of hidden wires, wind blowers, or computer animation?', 'Look at the very bottom of the TV screen for tiny white text (disclaimers).', 'Ask an adult: "Does this require expensive batteries or extra sets to work?"', 'Wait 48 hours before buying anything you saw in an advertisement (The 48-Hour Cool-Down Rule).', 'Read real user reviews or inspect the toy in person at a shop before spending your cash.'],
    example: { title: 'Arnav’s Ad Detective Eye', scenario: 'Arnav watches an ad for a roaring dinosaur robot.', steps: ['Notices loud studio sound effects not made by the toy.', 'Spots tiny words at bottom: "Movement simulated by animator."', 'Realizes the toy cannot walk on carpets.', 'Decides to keep his savings in his envelope.'], takeaway: 'Advertisements show you a fantasy movie; real toys must be judged in reality.' },
    mistakes: [
      { mistake: 'Believing that a toy actually flies across the room on its own because you saw it on TV.', correction: 'TV ads use high-powered fans, nylon strings, and editing to simulate flight; always check the disclaimers.' },
      { mistake: 'Demanding that parents buy a toy immediately during a commercial break.', correction: 'Practice the 48-hour cool-down rule; after two days, you often realize you don’t even want it.' }
    ],
    checklist: ['Did I look for tiny disclaimer text at the bottom?', 'Are special effects or computer graphics making it look cooler?', 'Did I apply the 48-Hour Cool-Down Rule?', 'Do I know what it looks like without special lights?'],
    prompt: 'Have you ever bought a toy that looked amazing in an ad but turned out to be boring or flimsy in real life?',
    takeaway: 'Advertisements sell excitement, not truth: be a smart consumer detective and look past the special effects.',
    heroDesc: 'Child holding a magnifying glass in front of a television commercial, revealing the tiny disclaimer text at the bottom of the screen.',
    vis1: { title: 'The 4 Common Toy Ad Illusions', caption: '1. Fast camera cuts, 2. Studio sound effects, 3. Hidden nylon strings, 4. Macro zoom.' },
    vis2: { title: 'The 48-Hour Cool-Down Rule', caption: 'Wait 2 full days after seeing an ad. If you still want it, evaluate its real value.' },
    videoTitle: 'Ad Detectives: Busting Toy Commercial Tricks', videoDuration: '3 mins 10 secs',
    scenes: [
      { visual: "Exciting toy ad with lasers and explosions vs real plastic toy sitting silently.", narration: "Ever bought a toy that looked epic on screen, but was a let-down in real life?" },
      { visual: "Magnifying glass zooming in on tiny disclaimer: 'Does not actually fly'.", narration: "Watch the bottom of the screen. Advertisers have to tell the truth in tiny print." },
      { visual: "Child waiting 48 hours and deciding their money is better saved.", narration: "Use the forty-eight hour cool-down rule. Smart thinkers protect their hard-earned money." }
    ],
    recap: "Spot two commercial tricks during your next television or video ad break.",
    act: {
      title: 'Commercial Detective Investigation Sheet',
      obj: 'Analyze one toy or snack commercial and write down the tricks used to make it look appealing.',
      mats: ['TV or video ad stream', 'Detective notepad', 'Pencil'],
      steps: ['Select a 30-second toy or cereal commercial.', 'Count how many camera cuts occur in 30 seconds.', 'Look for tiny disclaimer text at the bottom and copy it down.', 'Write down whether the toy does what the ad shows.'],
      output: 'A completed Ad Detective Report detailing camera tricks, sound effects, and disclaimers.',
      precautions: 'Do not click on suspicious ad links or buy in-app purchases on tablets.',
      alt: 'Analyze a glossy toy catalog page and compare the picture to the product specs.'
    },
    scenarioGuided: {
      context: 'Tanmay sees an ad for a chocolate milk powder that promises: "Drink this and run as fast as a cheetah!"',
      optimal: 'Recognize that no drink can instantly make you an Olympic sprinter, and laugh at the silly advertising trick.',
      optReason: 'Distinguishes between scientific biological reality and marketing exaggeration.',
      nonOpt1: 'Believe the ad 100% and beg mother to buy 5 jars so he wins his school sports day.',
      nonOptReason1: 'Falling for marketing claims leads to wasted money and false expectations.',
      nonOpt2: 'Refuse to ever drink milk again because ads are annoying.',
      nonOptReason2: 'Extreme reaction that harms healthy nutrition.',
      takeaway: 'Recognize advertising hyperbole and don’t mistake cartoons for health facts.'
    },
    scenarioIndep: {
      context: 'A video shows a toy car driving through walls and smashing rocks without a scratch.',
      prompt: 'Explain what studio tricks were likely used to film that scene.',
      rubric: 'Identified fake prop walls (foam), slow motion, studio sound effects, and video cuts.'
    },
    quiz: {
      q: 'What does the tiny text "Assembly required and batteries not included" at the bottom of a toy commercial mean?',
      context: 'Evaluating a toy ad with motorized racing cars.',
      optCorrect: 'The toy comes in pieces that you must put together yourself, and it will not run until you buy extra batteries.',
      optWrong1: 'The toy is completely free of charge.',
      optWrong2: 'The toy never needs batteries because it runs on solar power.',
      optWrong3: 'The toy comes fully built inside a golden box.',
      remediation: 'Always read the disclaimers to know what extra work or costs are required.'
    },
    rubric: {
      task: 'Analyze an advertisement and present a 2-minute breakdown of the techniques used to influence consumers.',
      mastery: 'Identifies disclaimers, highlights special effects, assesses product realism, explains consumer bias.',
      crit1: { name: 'Ad Trick Identification', weight: 40, emerging: 'Believes all ad claims.', developing: 'Spots sound effects only.', proficient: 'Identifies camera angles, audio tricks, and graphics.', exemplary: 'Comprehensive breakdown of psychological appeal and production illusion.' },
      crit2: { name: 'Disclaimer Decoding', weight: 35, emerging: 'Misses disclaimers entirely.', developing: 'Sees text but cannot read it.', proficient: 'Reads and translates fine-print disclaimers accurately.', exemplary: 'Evaluates hidden costs (batteries, expansions) systematically.' },
      crit3: { name: 'Consumer Restraint', weight: 25, emerging: 'Demands instant purchase.', developing: 'Resists with adult coaxing.', proficient: 'Applies 48-Hour Cool-Down Rule independently.', exemplary: 'Advises peers and siblings on smart consumer habits.' }
    },
    refs: [
      'Why do companies hire famous movie stars or sports players to sell snacks?',
      'What was the funniest exaggeration you ever noticed in a TV commercial?',
      'How does the 48-Hour Cool-Down Rule save you from buyer’s remorse?',
      'If you invented a toy, how would you advertise it honestly?'
    ]
  },
  {
    month: 10, monthTheme: 'Smart Spending, Saving Habits & Spotting Ad Traps', seq: 3,
    cat: 'life_money_management', catLabel: 'Money Management & Financial Literacy',
    title: 'Comparing Prices and Reading MRP Labels on School Supplies',
    why: 'Shops often sell identical items at different prices, or sell smaller packs that cost more per piece. Reading MRP and comparing prices makes your family’s money go twice as far.',
    objs: ['Locate and read the MRP (Maximum Retail Price) and expiry or manufacturing date on packaging', 'Compare two brands of pencils or notebooks to determine which offers better value', 'Check that a shopkeeper does not charge more than the printed MRP', 'Count your change carefully before walking away from the cashier counter'],
    scenario: 'Divya went to a stationery shop to buy notebooks for school. One shiny notebook with a movie character cover cost ₹90 for 100 pages. Right next to it was a neat, plain notebook with identical smooth paper that cost ₹45 for 120 pages.',
    expl: 'Every packaged product in India has an "MRP" printed on it by law. MRP stands for Maximum Retail Price—no shopkeeper can legally charge you more than that amount! Smart shoppers don’t just look at the cover picture; they check the page count, quality, and price per unit.',
    steps: ['Pick up the product and flip to the back or bottom panel.', 'Find the printed text that says "M.R.P. ₹ [Amount] inclusive of all taxes".', 'Compare page count or quantity: (e.g. 120 pages for ₹45 vs 100 pages for ₹90).', 'Ask yourself: "Am I paying double just for a cartoon sticker on the cover?"', 'Hand the exact cash or check the change against your bill.'],
    example: { title: 'Divya’s Smart Notebook Selection', scenario: 'Divya compares two notebook options.', steps: ['Inspects fancy movie notebook: ₹90 for 100 pages.', 'Inspects standard study notebook: ₹45 for 120 pages.', 'Realizes she can buy TWO plain notebooks (240 pages total) for ₹90.', 'Chooses the plain notebooks and uses savings for geometry set.'], takeaway: 'Smart shoppers buy utility and quality, not overpriced packaging.' },
    mistakes: [
      { mistake: 'Letting a shopkeeper charge ₹25 for an item with an MRP of ₹20 because "it was cold in the fridge".', correction: 'By Indian law, charging above the printed MRP is illegal; politely point out the printed price.' },
      { mistake: 'Walking out of a store without counting the coins returned by the cashier.', correction: 'Always count your change right at the billing desk before stepping away.' }
    ],
    checklist: ['Did I find and read the printed MRP?', 'Did I check quantity or page count?', 'Am I paying for quality rather than just branding?', 'Did I count my change at the register?'],
    prompt: 'Look at the back of your favorite pen or snack. What is its printed MRP?',
    takeaway: 'Check the MRP, compare page counts, and count your change: smart shoppers get true value for every rupee.',
    heroDesc: 'Child comparing two notebooks at a stationery counter, pointing to the printed MRP price stamp on the back cover.',
    vis1: { title: 'Deconstructing the MRP Stamp', caption: 'M.R.P. ₹, Batch Number, Date of Mfg, Net Quantity, Customer Care Number.' },
    vis2: { title: 'The Unit Value Comparison', caption: 'Pack A: ₹50 for 5 pens = ₹10/pen. Pack B: ₹30 for 2 pens = ₹15/pen. Pack A wins!' },
    videoTitle: 'Stationery Smarts: Master the MRP Label', videoDuration: '3 mins 05 secs',
    scenes: [
      { visual: "Child looking at two identical stationery items with vastly different prices.", narration: "Fancy covers can double the price of simple notebooks. Look closer." },
      { visual: "Finger pointing to 'M.R.P. ₹ 40.00 incl. of all taxes'.", narration: "M-R-P. Maximum Retail Price. No shopkeeper can legally charge a single paisa more." },
      { visual: "Counting coins returned by shopkeeper calmly at counter.", narration: "Count your change before you take a single step away from the counter." }
    ],
    recap: "Check the MRP on three school items in your backpack today.",
    act: {
      title: 'Stationery Store Price Audit Project',
      obj: 'Visit a local stationery shop or supermarket with a parent and compare 3 pairs of school items.',
      mats: ['Notepad', 'Pencil', 'Parent accompaniment'],
      steps: ['Select 2 brands of pencils (box of 10).', 'Compare MRP and calculate price per pencil.', 'Select 2 brands of erasers or rulers.', 'Note which product gives the best value for money.'],
      output: 'A completed 3-item Price Comparison Table with value recommendations.',
      precautions: 'Do not handle fragile store merchandise roughly or open sealed packs.',
      alt: 'Compare 3 food items in your home pantry by reading their printed MRP and net weight.'
    },
    scenarioGuided: {
      context: 'The corner shopkeeper hands Harsh a bottle of water with MRP printed as ₹20, but demands ₹23 saying "cooling charges".',
      optimal: 'Politely say: "Uncle, the printed MRP is ₹20 inclusive of all taxes, so legally cooling charges cannot be added."',
      optReason: 'Asserts legal consumer rights politely and firmly based on government standards.',
      nonOpt1: 'Shout and throw the bottle at the shopkeeper in anger.',
      nonOptReason1: 'Rude and aggressive behavior does not solve consumer disputes.',
      nonOpt2: 'Pay ₹50 and run away feeling intimidated.',
      nonOptReason2: 'Allows illegal overcharging to continue unchecked.',
      takeaway: 'Know your consumer rights: MRP is the absolute legal ceiling.'
    },
    scenarioIndep: {
      context: 'You buy an eraser for ₹5 and a sharpener for ₹10. You hand the shopkeeper a ₹50 note.',
      prompt: 'Calculate the total cost and the exact change the shopkeeper must return to you.',
      rubric: 'Total cost = ₹15 (5 + 10). Change to receive = ₹35 (50 - 15).'
    },
    quiz: {
      q: 'What does "MRP" printed on Indian consumer goods stand for, and what does it legally mean?',
      context: 'Purchasing stationery at a school market.',
      optCorrect: 'Maximum Retail Price: the highest price a seller can legally charge for that product.',
      optWrong1: 'Minimum Regular Price: the lowest price you must pay.',
      optWrong2: 'Market Rate Payment: a suggested price that can be doubled on weekends.',
      optWrong3: 'Manufacturer Receipt Paper: an internal tracking code.',
      remediation: 'MRP is the legally enforced price ceiling; charging above MRP violates consumer protection law.'
    },
    rubric: {
      task: 'Compare two competing consumer products by calculating unit cost and verifying MRP compliance.',
      mastery: 'Locates MRP, accurately calculates unit price, determines superior value, verifies change.',
      crit1: { name: 'Label Reading Accuracy', weight: 40, emerging: 'Cannot find MRP.', developing: 'Finds MRP but misses expiry/quantity.', proficient: 'Reads MRP, date, and net quantity flawlessly.', exemplary: 'Thorough inspection of all statutory packaging data.' },
      crit2: { name: 'Unit Cost Comparison', weight: 35, emerging: 'Judges only by cartoon cover.', developing: 'Struggles with division math.', proficient: 'Calculates price per unit (per pen/per page) correctly.', exemplary: 'Clear explanation of cost-efficiency and value tradeoffs.' },
      crit3: { name: 'Cashier Interaction', weight: 25, emerging: 'Walks away without checking change.', developing: 'Counts change only when prompted.', proficient: 'Counts change at register calmly before departing.', exemplary: 'Polite, confident consumer communication.' }
    },
    refs: [
      'Why does the Indian government mandate printing the MRP on every package?',
      'Have you ever seen an item where you were paying extra just for a cartoon sticker?',
      'How does comparing prices help your family save for holidays or big goals?',
      'What will you say if someone tries to charge you more than the printed price?'
    ]
  },

  // MONTH 11: Everyday Kindness, Empathy & Polite Manners
  {
    month: 11, monthTheme: 'Everyday Kindness, Empathy & Polite Manners', seq: 1,
    cat: 'life_communication', catLabel: 'Communication & Confidence',
    title: 'Writing a Polite Thank-You Note to School Support Staff',
    why: 'School bus drivers, security guards, and cleaning staff work hard every day to keep us safe and comfortable. Expressing gratitude makes others feel valued and builds humble empathy.',
    objs: ['Identify the daily contributions of non-teaching school staff (bus drivers, security, sweepers, helpers)', 'Write a sincere 3-sentence thank-you note with proper greeting, specific appreciation, and signature', 'Deliver the note in person with a warm smile and clear eye contact', 'Reflect on how acknowledging service workers changes the culture of your school'],
    scenario: 'Every morning in pouring rain and freezing winter, Bahadur uncle, the school security guard, stood at the school gate directing traffic and holding an umbrella for arriving children. Most students walked past him without even looking up or saying good morning.',
    expl: 'True character is how you treat people who can do nothing for you. School support staff work long hours so your classrooms are clean, your buses arrive safely, and your campus is secure. A small handwritten thank-you card takes 5 minutes to make, but they will cherish it for years.',
    steps: ['Pick one support staff member to appreciate (bus driver, security guard, cleaner, or cafeteria staff).', 'Fold a clean piece of paper into a greeting card and draw a neat border.', 'Sentence 1 (Greeting & Thank You): "Dear [Name/Uncle/Didi], Thank you so much for [specific task, e.g. keeping our bus safe every morning]."', 'Sentence 2 (Impact): "Your hard work and cheerful smile make my school days so much brighter."', 'Sentence 3 (Closing): "With warm gratitude, [Your Name, Class 4-B]."', 'Hand it to them personally with two hands and a warm "Dhanyawad / Thank you!"'],
    example: { title: 'Kabir’s Card for Bahadur Uncle', scenario: 'Kabir writes a card for the gate guard.', steps: ['Draws an umbrella and smiling sun on the card cover.', 'Writes 3 heartfelt sentences.', 'Hands it to Bahadur uncle as he enters the school gate.', 'Uncle smiles with tears of joy and pins it in the guard cabin.'], takeaway: 'Gratitude costs nothing to give, but means everything to receive.' },
    mistakes: [
      { mistake: 'Writing a generic one-word note like "Thanks" without naming what they do.', correction: 'Mention their specific job (e.g. driving through heavy traffic safely) so they know you noticed their effort.' },
      { mistake: 'Leaving the note on a random bench instead of handing it to them with eye contact.', correction: 'Look them in the eye and say "Thank you" directly so they feel your personal sincerity.' }
    ],
    checklist: ['Did I address them respectfully by name or title?', 'Did I mention a specific thing they do for our school?', 'Is my handwriting neat and legible?', 'Did I hand it over with a smile and eye contact?'],
    prompt: 'How did the person’s face change when you handed them their thank-you card?',
    takeaway: 'Never miss an opportunity to appreciate the quiet heroes who keep our everyday world running.',
    heroDesc: 'Student handing a colorful handmade thank-you card to a smiling school bus driver wearing uniform.',
    vis1: { title: 'The 3-Sentence Gratitude Formula', caption: '1. Specific Action -> 2. Personal Impact -> 3. Sincere Blessing / Closing.' },
    vis2: { title: 'Respect in Action Checklist', caption: 'Smile, eye contact, respectful title (Uncle/Didi/Sir), two-hand delivery.' },
    videoTitle: 'The Power of a Thank-You Card', videoDuration: '2 mins 45 secs',
    scenes: [
      { visual: "Security guard standing in rain directing school traffic.", narration: "Every day, quiet heroes keep us safe, dry, and protected." },
      { visual: "Child carefully folding paper and writing heartfelt 3-sentence note.", narration: "A three-sentence card takes five minutes, but carries a lifetime of kindness." },
      { visual: "Guard smiling warmly and proudly holding the card.", narration: "See people. Acknowledge their hard work. Watch the world brighten up." }
    ],
    recap: "Write and deliver a 3-sentence thank-you note to a school helper or community worker today.",
    act: {
      title: 'School Support Staff Appreciation Card',
      obj: 'Author, illustrate, and deliver an original thank-you card to a school helper or transport driver.',
      mats: ['A4 drawing paper or cardstock', 'Colored pencils or sketch pens', 'Ruler'],
      steps: ['Fold card in half.', 'Draw a cheerful front cover design.', 'Write the 3-sentence appreciation message inside.', 'Deliver in person with clear greeting and eye contact.'],
      output: 'A completed, delivered gratitude card with a written reflection on the recipient’s reaction.',
      precautions: 'Do not interrupt staff during safety-critical moments (e.g. while driving or operating heavy gates).',
      alt: 'Write a thank-you note to your apartment building security guard or municipal sanitation worker.'
    },
    scenarioGuided: {
      context: 'Naveen is in the school bus and sees that the bus attendant helped carry a sick child’s bag.',
      optimal: 'Say aloud: "Thank you so much, Bhaiya, for helping him out; that was very kind of you."',
      optReason: 'Publicly reinforces kind behavior and shows appreciation for daily care.',
      nonOpt1: 'Ignore it and look out the window.',
      nonOptReason1: 'Misses a prime opportunity to spread positivity.',
      nonOpt2: 'Tease the sick child for needing help.',
      nonOptReason2: 'Cruel and disrespectful behavior that damages team spirit.',
      takeaway: 'Speak up when you see acts of service and kindness around you.'
    },
    scenarioIndep: {
      context: 'The school cleaning lady just finished mopping the hallway tiles outside your classroom.',
      prompt: 'Explain how you will walk across the hallway and what you will say to her.',
      rubric: 'Walked on dry edge to avoid ruining wet floor, smiled and thanked her for keeping school clean.'
    },
    quiz: {
      q: 'What makes a thank-you note to a school worker truly meaningful and memorable?',
      context: 'Writing an appreciation note for the school bus driver.',
      optCorrect: 'Mentioning the specific action they take every day to help you and expressing genuine gratitude.',
      optWrong1: 'Using expensive imported glitter pens.',
      optWrong2: 'Making the note 10 pages long with complicated vocabulary.',
      optWrong3: 'Asking them for candy in return.',
      remediation: 'Sincerity and specific appreciation matter more than fancy decorations or expensive paper.'
    },
    rubric: {
      task: 'Write, illustrate, and deliver a personalized 3-sentence thank-you card to a school worker.',
      mastery: 'Specific appreciation, warm tone, neat calligraphy, respectful face-to-face delivery.',
      crit1: { name: 'Message Content & Structure', weight: 40, emerging: 'Generic one-liner.', developing: 'Lacks specific contribution details.', proficient: 'Follows 3-sentence formula with specific job role.', exemplary: 'Deeply heartfelt, eloquent, and personal gratitude.' },
      crit2: { name: 'Card Presentation', weight: 35, emerging: 'Torn scrap paper.', developing: 'Untidy writing.', proficient: 'Neat cardstock fold, clean margins, legible penmanship.', exemplary: 'Beautifully illustrated with thoughtful decorative border.' },
      crit3: { name: 'Delivery Demeanor', weight: 25, emerging: 'Throws note and runs away.', developing: 'Delivers without looking up.', proficient: 'Warm smile, clear eye contact, polite address.', exemplary: 'Gracious, memorable personal exchange of respect.' }
    },
    refs: [
      'Who is one worker at school whose name you don’t know yet? How can you find out?',
      'How do you feel when someone notices and thanks you for a hard chore you did?',
      'Why is saying "Uncle" or "Didi" with respect important in Indian culture?',
      'How can our whole class celebrate our support staff on Annual Day?'
    ]
  },
  {
    month: 11, monthTheme: 'Everyday Kindness, Empathy & Polite Manners', seq: 2,
    cat: 'life_social_teamwork', catLabel: 'Social Skills, Empathy & Teamwork',
    title: 'Welcoming a New Student & Inviting Someone to Sit at Lunch',
    why: 'Starting at a new school is scary and lonely. Reaching out with a simple invitation to sit together turns anxiety into friendship and prevents bullying.',
    objs: ['Notice classmates sitting alone during recess, lunch, or free periods', 'Approach with a friendly smile and use the Welcome Invitation formula: "Hi, I’m [Name]. Would you like to sit with us?"', 'Ask two open-ended questions about their previous school, hobbies, or sports', 'Introduce the new student to at least two other classmates'],
    scenario: 'On Monday, a new girl named Zoya joined Class 4. During lunch break, everyone rushed to their familiar friend circles. Zoya sat on an empty corner bench alone, opening her tiffin box with downcast eyes, feeling completely invisible.',
    expl: 'Remember your first day in a strange place? Every room looks intimidating and you wonder if anyone will like you. It takes immense bravery to be new, but it takes only 5 seconds of kindness to say: "Hey, there’s an open spot here, come sit with us!" One warm invite can change someone’s entire school year.',
    steps: ['Scan the lunchroom or playground for anyone sitting alone with slumped shoulders.', 'Walk over calmly with a welcoming smile.', 'Introduce yourself: "Hi, I am [Your Name]. Welcome to Class 4! Would you like to sit with us at our table?"', 'If they say yes, show them where to keep their water bottle and introduce your table mates.', 'Ask an easy question: "What was your favorite subject at your old school?" or "Do you like badminton or football?"'],
    example: { title: 'Pooja’s Lunch Table Welcome', scenario: 'Pooja notices Zoya sitting alone.', steps: ['Pooja walks to Zoya’s bench.', 'Says: "Hi Zoya, I’m Pooja! We have space at our table, come join us."', 'Zoya’s face lights up with relief.', 'Pooja introduces her to Ananya and Meera.', 'They share parathas and laugh together.'], takeaway: 'An open seat at lunch can create a friendship that lasts for years.' },
    mistakes: [
      { mistake: 'Whispering and giggling with your friends while pointing at the new kid.', correction: 'Whispering makes newcomers feel judged and insecure; approach them directly with openness.' },
      { mistake: 'Interrogating them with rapid-fire questions like a police officer.', correction: 'Ask gentle, friendly questions and give them time to answer without pressure.' }
    ],
    checklist: ['Did I look around for anyone sitting alone?', 'Did I introduce myself by name?', 'Did I offer a clear, welcoming seat?', 'Did I introduce them to my friends?'],
    prompt: 'How would you want your classmates to treat you if your family moved to a brand new city tomorrow?',
    takeaway: 'Make room at your table: an inclusive leader never lets anyone feel invisible.',
    heroDesc: 'Smiling student gesturing to an empty chair at a lunch table, welcoming a shy new classmate holding her lunchbox.',
    vis1: { title: 'The Inclusion Radar', caption: 'Scan the room: Look for solo benches, downcast eyes, or hesitation at the doorway.' },
    vis2: { title: 'The 3-Step Friendship Bridge', caption: '1. Warm Greeting & Name -> 2. The Open Seat Invite -> 3. Friendly Common Ground.' },
    videoTitle: 'Nobody Eats Alone: The Welcome Circle', videoDuration: '3 mins 00 secs',
    scenes: [
      { visual: "New student standing awkwardly in crowded noisy lunch cafeteria.", narration: "The loneliest place in the world can be a crowded room where you don't know anyone." },
      { visual: "Child waving and pointing to an open seat beside them.", narration: "It takes five seconds of courage to say: 'Hey, come sit with us!'" },
      { visual: "Group sharing tiffin food and laughing together.", narration: "Kindness builds a bigger table, not a higher fence." }
    ],
    recap: "Spot anyone sitting alone today and invite them to join your group.",
    act: {
      title: 'The "Open Seat" Lunchtime Mission',
      obj: 'Identify a student sitting by themselves and invite them to share lunch or play a game.',
      mats: ['School tiffin box', 'Notepad for evening reflection'],
      steps: ['Look around during lunch break for solo students.', 'Walk over and use the Welcome Invitation formula.', 'Learn 2 interesting facts about them.', 'Introduce them to another classmate.'],
      output: 'A written reflection detailing the conversation and how the student responded.',
      precautions: 'If they genuinely prefer quiet time alone, respect their boundary politely.',
      alt: 'Invite a student who was picked last in sports to be your practice partner.'
    },
    scenarioGuided: {
      context: 'Your usual friend group tells you: "Don’t invite the new boy, our table is already full!"',
      optimal: 'Squeeze your chair over and say: "There’s always room for one more friend, let’s make space."',
      optReason: 'Models true leadership and prevents exclusive cliquish behavior.',
      nonOpt1: 'Agree with the group and ignore the new boy.',
      nonOptReason1: 'Participates in passive bullying and exclusion.',
      nonOpt2: 'Get into a screaming fistfight with your friends.',
      nonOptReason2: 'Aggression creates drama and makes the new student feel uncomfortable.',
      takeaway: 'True leaders make the circle bigger, welcoming newcomers with pride.'
    },
    scenarioIndep: {
      context: 'A new student does not speak your local state language fluently and feels shy.',
      prompt: 'Explain how you will communicate and make them feel welcome without making them feel embarrassed.',
      rubric: 'Spoke clearly in common language/English, used friendly smiles and gestures, helped explain class routines.'
    },
    quiz: {
      q: 'What is the most welcoming action you can take when you see a new classmate standing alone during lunch?',
      context: 'Recess in a crowded school cafeteria.',
      optCorrect: 'Walk over with a warm smile, introduce yourself by name, and invite them to sit at your table.',
      optWrong1: 'Stare at them from across the room and talk about them with your friends.',
      optWrong2: 'Wait until the end of the term to see if they make other friends first.',
      optWrong3: 'Tell them that school lunch tables have reserved seating rules.',
      remediation: 'Take the initiative immediately; a warm invitation dispels anxiety and builds inclusion.'
    },
    rubric: {
      task: 'Role-play or execute welcoming an isolated peer into a group activity or lunch circle.',
      mastery: 'Immediate recognition, warm approach, clear invitation, active inclusion, peer introductions.',
      crit1: { name: 'Inclusion Initiative', weight: 40, emerging: 'Ignores isolated peers.', developing: 'Welcomes only when told by teacher.', proficient: 'Proactively spots solo peers and initiates contact.', exemplary: 'Natural, champion inclusive leader in school culture.' },
      crit2: { name: 'Conversational Warmth', weight: 35, emerging: 'Awkward or interrogating tone.', developing: 'Asks one closed question.', proficient: 'Warm greeting, open questions, respectful listening.', exemplary: 'Exceptional empathy making the newcomer feel at home.' },
      crit3: { name: 'Group Integration', weight: 25, emerging: 'Leaves them sitting silently.', developing: 'Introduces to one person.', proficient: 'Introduces to entire table; facilitates shared talk.', exemplary: 'Integrates peer smoothly into ongoing playground games.' }
    },
    refs: [
      'Have you ever felt like an outsider in a group? How did it feel?',
      'Why do school cliques hurt everyone involved?',
      'What is an easy question you can ask someone you just met to break the ice?',
      'How does welcoming others make our classroom a happier, safer place?'
    ]
  },
  {
    month: 11, monthTheme: 'Everyday Kindness, Empathy & Polite Manners', seq: 3,
    cat: 'life_social_teamwork', catLabel: 'Social Skills, Empathy & Teamwork',
    title: 'Reading Body Language to Understand When a Friend Feels Down',
    why: 'People don’t always say "I am sad" with words. Learning to read slumped shoulders, quiet sighs, and crossed arms helps you offer support when friends need it most.',
    objs: ['Identify 4 non-verbal cues of sadness or frustration: slumped posture, downcast eyes, crossed arms, and sudden silence', 'Understand that angry words often hide hurt feelings underneath', 'Use the Gentle Check-In formula: "You seem a bit quiet today, is everything okay?"', 'Know when to listen quietly without trying to force immediate cheerfulness'],
    scenario: 'During art class, Rohan usually cracks funny jokes and shares paints eagerly. Today, he sat with his head resting on his forearm, staring at the floor, and quietly pushed his drawing book away.',
    expl: 'More than half of human communication happens without making a single sound! Our bodies tell the truth even when our lips stay sealed. When a friend goes unusually quiet, frowns, or slumps their head, their body is signaling: "I am having a hard day." Being an empathetic friend means noticing these clues and offering a gentle ear.',
    steps: ['Observe changes from their normal baseline behavior (e.g. normally chatty vs suddenly silent).', 'Look at their eyes and posture: are shoulders rounded and eyes avoiding contact?', 'Move closer quietly without drawing a big crowd.', 'Offer a gentle check-in: "Hey Rohan, you seem a bit quiet today. Do you want to talk about it, or would you like some quiet time?"', 'If they want to talk, listen without interrupting; if they want quiet, simply sit beside them in friendly solidarity.'],
    example: { title: 'Samar’s Empathetic Check-In', scenario: 'Samar notices Rohan looking miserable.', steps: ['Notices Rohan’s slumped shoulders.', 'Sits beside him quietly.', 'Whispers: "Hey buddy, I’m here if something went wrong."', 'Rohan confesses he lost his mother’s fountain pen.', 'Samar helps him search the art cupboard.'], takeaway: 'Just noticing someone’s sadness can lift half the weight off their shoulders.' },
    mistakes: [
      { mistake: 'Telling an upset friend: "Oh, cheer up, you are overreacting!" or "Smile, it’s not a big deal!"', correction: 'Invalidating someone’s feelings makes them feel misunderstood; listen and validate their experience instead.' },
      { mistake: 'Shouting across the room: "Hey everyone, look, why is he crying?!"', correction: 'Never broadcast someone’s vulnerability; offer private, discreet support.' }
    ],
    checklist: ['Did I notice the physical body language cues?', 'Did I check in privately without a big audience?', 'Did I offer to listen without forcing advice?', 'Did I show patience and understanding?'],
    prompt: 'When you are sad or upset, what does your body do, and what kind of support do you wish for?',
    takeaway: 'Listen with your eyes as well as your ears: true friendship notices the words people cannot say.',
    heroDesc: 'Child sitting supportively beside an upset classmate on a playground bench, offering gentle presence and listening.',
    vis1: { title: 'The Body Language Clue Card', caption: 'Downcast eyes = Sadness; Clenched fists = Frustration; Slumped chest = Discouragement.' },
    vis2: { title: 'The 3-Step Empathy Check-In', caption: '1. Notice the Clue -> 2. Private Gentle Check -> 3. Listen Without Judgment.' },
    videoTitle: 'Reading the Silent Clues: Body Language & Empathy', videoDuration: '3 mins 05 secs',
    scenes: [
      { visual: "Child with slumped shoulders and tearful eyes looking down at desk.", narration: "Words aren't the only way people speak. Bodies tell the real story." },
      { visual: "Friend sitting quietly beside them, speaking in a gentle voice.", narration: "You don't need magic answers. Just say: 'I noticed you're quiet today. I'm here.'" },
      { visual: "Two friends sharing a quiet nod of mutual understanding.", narration: "True empathy is sitting together in the dark until the sun comes out." }
    ],
    recap: "Notice the body language of three people around you today and offer gentle support if needed.",
    act: {
      title: 'Empathy Detective: Body Language Observation',
      obj: 'Observe non-verbal emotional cues in friends, family, or story characters and record insights.',
      mats: ['Observation journal', 'Pencil'],
      steps: ['Watch characters in a book or people in a public setting.', 'Note 3 physical body postures (shoulders, hands, eyes).', 'Deduce what emotion they might be experiencing.', 'Practice the Gentle Check-In line aloud.'],
      output: 'A completed 3-case emotional observation entry with check-in strategies.',
      precautions: 'Do not stare rudely at strangers; observe naturally and respectfully.',
      alt: 'Role-play with a parent: guess each other’s emotion based purely on silent body posture.'
    },
    scenarioGuided: {
      context: 'Your friend Maya strikes out in a baseball game, tosses the bat into the dirt, and sits with arms tightly crossed refusing to look at anyone.',
      optimal: 'Give her 2 minutes to cool down, then sit near her and say: "Tough luck on that pitch Maya, but you made great contact."',
      optReason: 'Respects her initial frustration while offering supportive encouragement without criticism.',
      nonOpt1: 'Laugh loudly and say: "Wow, you are the worst batter on our team!"',
      nonOptReason1: 'Cruel teasing that turns a sports mistake into personal humiliation.',
      nonOpt2: 'Try to pry her arms open physically and force her to smile.',
      nonOptReason2: 'Invades personal space and ignores boundaries.',
      takeaway: 'Give space when anger is hot, then offer calm, steady reassurance.'
    },
    scenarioIndep: {
      context: 'Your sibling comes home from school, slams their bedroom door, and refuses to speak during snack time.',
      prompt: 'Explain what physical signs showed they had a bad day, and how you will approach them kindly.',
      rubric: 'Identified door slam and silence as emotional cues; offered water/snack and private listening.'
    },
    quiz: {
      q: 'Which set of physical body language cues most likely indicates that a classmate is feeling sad or discouraged?',
      context: 'Observing peers during afternoon recess.',
      optCorrect: 'Slumped shoulders, head looking down at the floor, and unusual silence during group games.',
      optWrong1: 'Standing tall, shouting excitedly, and jumping up and down.',
      optWrong2: 'Chewing gum while singing a song loudly.',
      optWrong3: 'Running laps around the football pitch with a wide grin.',
      remediation: 'Sadness and discouragement make the body collapse inward; look for downcast postures.'
    },
    rubric: {
      task: 'Identify emotional body language cues in a peer scenario and execute a sensitive check-in intervention.',
      mastery: 'Accurate cue detection, respectful approach, non-judgmental listening, supportive closing.',
      crit1: { name: 'Cue Recognition', weight: 40, emerging: 'Oblivious to non-verbal signals.', developing: 'Recognizes only extreme crying.', proficient: 'Spots subtle changes in posture, eye contact, and tone.', exemplary: 'Remarkable intuitive emotional acuity.' },
      crit2: { name: 'Check-In Delivery', weight: 35, emerging: 'Demands or mocks.', developing: 'Asks publicly.', proficient: 'Gentle, private inquiry respecting boundaries.', exemplary: 'Masterful soothing presence that creates instant psychological safety.' },
      crit3: { name: 'Active Listening', weight: 25, emerging: 'Interrupts with unsolicited advice.', developing: 'Listens impatiently.', proficient: 'Listens attentively without interrupting or judging.', exemplary: 'Empathetic validation and practical peer support.' }
    },
    refs: [
      'What does your body do when you feel anxious or sad?',
      'Why is it bad advice to tell an upset person to "just smile"?',
      'How does simply having a friend sit quietly beside you help you feel better?',
      'Who is someone in your life who is really good at noticing when you feel down?'
    ]
  },

  // MONTH 12: School Pride, Waste Care & Community Respect
  {
    month: 12, monthTheme: 'School Pride, Waste Care & Community Respect', seq: 1,
    cat: 'life_citizenship_community', catLabel: 'Practical Citizenship & Community Life',
    title: 'Sorting Waste into Green (Wet) and Blue (Dry) Bins',
    why: 'Mixed garbage rots in open landfills, polluting ground water and choking cities. Sorting wet organic scraps from dry plastics lets nature compost while materials get recycled.',
    objs: ['Distinguish between Wet Waste (organic kitchen scraps, fruit peels, leftover food) and Dry Waste (paper, plastic, metal, cardboard)', 'Use Green bins for wet/compostable items and Blue bins for dry/recyclable items', 'Rinse milk pouches and juice cartons before placing them in the dry bin', 'Teach your family or classmates how to maintain separate waste bins at home'],
    scenario: 'At school, Kabir threw a half-eaten banana peel and an oily samosa wrapper into the classroom recycling box filled with clean notebook paper. The banana rot and oil soaked through the paper, ruining the entire box of recyclable paper.',
    expl: 'When you throw wet food on clean paper, both become useless trash that must be burned or dumped in a mountain of garbage! In India, we use a simple color code: GREEN for Wet Organic Waste (nature can turn this into rich fertilizer) and BLUE for Dry Recyclable Waste (factories can melt and remake these). Sorting takes 2 seconds and saves our planet.',
    steps: ['Look at what you want to throw away.', 'Ask: "Did it come from plants/animals that can rot?" (Fruit peels, food, tea leaves) -> GREEN BIN.', 'Ask: "Is it man-made packaging that can be recycled?" (Plastic wrappers, paper, cardboard, bottles) -> BLUE BIN.', 'Always squeeze and rinse food residue out of plastic containers before dry disposal.', 'Never mix hazardous waste (batteries, broken glass) with regular bins.'],
    example: { title: 'Kabir’s Waste Sorting Station', scenario: 'Kabir reorganizes his classroom bins.', steps: ['Labels one bucket GREEN (Wet Waste).', 'Labels second bucket BLUE (Dry Waste).', 'Puts banana peel in GREEN.', 'Puts juice box in BLUE after rinsing.', 'The class diverts 80% of waste from landfills.'], takeaway: 'Clean segregation at source turns waste into wealth.' },
    mistakes: [
      { mistake: 'Throwing plastic wrappers and toffee packets into the wet waste bin.', correction: 'Plastics never decompose; they poison compost and harm cattle if mixed with wet waste.' },
      { mistake: 'Throwing oily gravies and liquid soup directly into the dry paper bin.', correction: 'Liquids contaminate clean paper; scrape solids into wet bin and rinse containers.' }
    ],
    checklist: ['Did I separate food scraps from packaging?', 'Did I use the Green bin for organic waste?', 'Did I use the Blue bin for clean dry recyclables?', 'Did I rinse sticky containers before binning?'],
    prompt: 'Look at the trash bins in your kitchen right now. Are they mixed or segregated?',
    takeaway: 'Green for Nature, Blue for Recyclables: separate your waste at source to protect mother Earth.',
    heroDesc: 'Child holding a fruit peel in one hand and clean plastic bottle in other, standing before Green and Blue segregated bins.',
    vis1: { title: 'The Two-Bin Rule', caption: 'GREEN BIN: Fruit peels, vegetable trimmings, leftover food. BLUE BIN: Paper, plastic, metal, glass.' },
    vis2: { title: 'Rinse Before Recycling', caption: 'Give milk pouches, yogurt cups, and juice boxes a quick rinse before the dry bin.' },
    videoTitle: 'Green Bin, Blue Bin: Sort It Right!', videoDuration: '3 mins 15 secs',
    scenes: [
      { visual: "Massive smoking garbage landfill vs clean green park.", narration: "Landfills grow because people mix clean paper with rotten food." },
      { visual: "Color-coded Green and Blue bins with clear visual labels.", narration: "Green for what nature made. Blue for what factories can recycle." },
      { visual: "Child rinsing a plastic container and placing in blue bin.", narration: "Rinse it clean, sort it right. Be a citizen your city can be proud of." }
    ],
    recap: "Set up two separate bins (Wet & Dry) at home or in your classroom today.",
    act: {
      title: 'Home Waste Segregation Champion Challenge',
      obj: 'Audit and maintain separate Green (wet) and Blue (dry) bins at home for 7 days.',
      mats: ['2 dustbins or buckets', 'Green and Blue markers or colored paper labels', 'Tracker log'],
      steps: ['Label bucket 1 "WET / ORGANIC (Green)".', 'Label bucket 2 "DRY / RECYCLABLE (Blue)".', 'Explain the system to parents and siblings.', 'Monitor waste sorting for 7 days.'],
      output: 'A verified 7-day home waste segregation log signed by a parent.',
      precautions: 'Do not touch medical waste or broken glass; have an adult handle hazardous items.',
      alt: 'Conduct a recess cleanup audit of 10 items thrown away by classmates.'
    },
    scenarioGuided: {
      context: 'Tanvi finishes an ice-cream cup. The paper cup has a plastic spoon and a puddle of melted sticky chocolate.',
      optimal: 'Lick or rinse the chocolate puddle, put the paper cup and plastic spoon into the BLUE dry bin.',
      optReason: 'Keeps dry recyclables free from excessive rot while sending plastic to recycling.',
      nonOpt1: 'Toss the whole sticky mess onto the playground grass.',
      nonOptReason1: 'Littering pollutes the school and attracts flies.',
      nonOpt2: 'Throw the plastic spoon into the wet compost bin.',
      nonOptReason2: 'Plastic never decomposes and ruins compost quality.',
      takeaway: 'Take 10 seconds to rinse sticky recyclables before discarding.'
    },
    scenarioIndep: {
      context: 'You have: 1 apple core, 1 cardboard carton, 1 plastic chip packet, and tea leaves.',
      prompt: 'Classify each of these 4 items into either the Green bin or the Blue bin.',
      rubric: 'Green: apple core, tea leaves. Blue: cardboard carton, plastic chip packet.'
    },
    quiz: {
      q: 'Which item belongs strictly in the GREEN waste bin?',
      context: 'Sorting garbage after school lunch.',
      optCorrect: 'Orange peels and leftover roti crusts.',
      optWrong1: 'A crushed aluminum soda can.',
      optWrong2: 'A plastic ballpoint pen with no ink.',
      optWrong3: 'A glossy cardboard shoebox.',
      remediation: 'Green is exclusively for biodegradable organic material that nature can turn into soil.'
    },
    rubric: {
      task: 'Categorize a 12-item waste sorting tray into Wet (Green), Dry (Blue), and Hazardous categories.',
      mastery: '100% sorting accuracy, explains decomposition rationale, demonstrates rinsing protocol.',
      crit1: { name: 'Sorting Accuracy', weight: 40, emerging: 'Mixes plastics with food.', developing: '1-2 items misplaced.', proficient: '100% correct sorting of organic vs recyclable items.', exemplary: 'Flawless categorization including hazardous separation.' },
      crit2: { name: 'Recycling Hygiene', weight: 35, emerging: 'Throws greasy items in dry bin.', developing: 'Rinses only when told.', proficient: 'Consistently rinses liquid containers before dry binning.', exemplary: 'Pre-cleans recyclables systematically.' },
      crit3: { name: 'Civic Advocacy', weight: 25, emerging: 'Lacks personal interest.', developing: 'Follows rules at home only.', proficient: 'Actively promotes two-bin system among peers.', exemplary: 'Creates signage and leads classroom waste monitoring.' }
    },
    refs: [
      'What happens to garbage when it gets dumped into a city landfill?',
      'Why is compost so valuable for farmers and gardeners?',
      'How does sorting waste help municipal sanitation workers do their jobs safely?',
      'What simple change can your school canteen make to reduce single-use plastic?'
    ]
  },
  {
    month: 12, monthTheme: 'School Pride, Waste Care & Community Respect', seq: 2,
    cat: 'life_citizenship_community', catLabel: 'Practical Citizenship & Community Life',
    title: 'Handling Library Books with Care & Respecting Shared Property',
    why: 'Public and school library books are shared treasures meant to inspire hundreds of children. Treating books gently, turning pages by corners, and using bookmarks preserves them for everyone.',
    objs: ['Turn pages from the top corner gently without licking fingers or tearing paper', 'Use a paper bookmark instead of folding dog-ears or laying books face-down', 'Keep food, open juice bottles, and markers completely away from library books', 'Return borrowed books on or before the due date so other students can enjoy them'],
    scenario: 'Aryan checked out a beautiful illustrated encyclopedia on sea creatures. He ate butter popcorn while reading it, dog-eared page 45 to mark his place, and stuffed it into his backpack next to an open water bottle that leaked.',
    expl: 'A library book does not belong to you—it belongs to the entire community! When you tear a page, make oily fingerprint smudges, or break the spine, the next child cannot read it. Taking care of shared books proves that you are a trustworthy and civilized scholar.',
    steps: ['Make sure your hands are clean and dry before opening a library book.', 'Never eat or drink while reading; keep water bottles in a separate compartment.', 'Turn pages by gently lifting the top outer corner with fingertips (never lick fingers!).', 'Use a flat paper bookmark to mark your spot; NEVER fold dog-ears or lay open books face down.', 'Return the book to the librarian on time with pride.'],
    example: { title: 'Aryan’s Book Care Transformation', scenario: 'Aryan borrows a space exploration book.', steps: ['Makes a handmade cardboard bookmark.', 'Puts water bottle in exterior mesh pocket.', 'Turns glossy pages by the top corner.', 'Returns book in mint condition on Thursday.', 'Librarian praises his stewardship.'], takeaway: 'Returning a book in perfect condition is a mark of true student honor.' },
    mistakes: [
      { mistake: 'Folding page corners ("dog-earing") to remember where you stopped reading.', correction: 'Dog-earing weakens and permanently creases pages; always use a paper bookmark or ribbon.' },
      { mistake: 'Writing answers or doodling with pen inside library books.', correction: 'Never mark shared books; use your own notebook to write thoughts or quotes.' }
    ],
    checklist: ['Are my hands clean and dry?', 'Is my water bottle far away from the book?', 'Did I use a bookmark instead of dog-ears?', 'Did I turn pages gently from the top corner?'],
    prompt: 'How would you feel if you borrowed a book you were excited about, only to find the last chapter torn out?',
    takeaway: 'Treat shared library books like precious gold: preserve the knowledge for the children who come after you.',
    heroDesc: 'Student gently using a flat decorated bookmark inside a hardcover library book, turning page by top corner.',
    vis1: { title: 'The Book Anatomy Code of Care', caption: 'Protect the spine: Do not force open flat; do not stack face down; use bookmarks.' },
    vis2: { title: 'Corner Page Turn Technique', caption: 'Lift top corner gently between index finger and thumb. No finger licking!' },
    videoTitle: 'Guardians of the Bookshelf: Library Care', videoDuration: '2 mins 50 secs',
    scenes: [
      { visual: "Torn, dog-eared, stained book vs crisp well-kept library book.", narration: "A library book is a shared gift passed from student to student." },
      { visual: "Demonstrating top-corner page turning and inserting bookmark.", narration: "Turn pages gently from the corner. Never fold dog-ears into the paper." },
      { visual: "Handing book to school librarian with a respectful smile.", narration: "Return it clean, on time, and proud. You are a true guardian of knowledge." }
    ],
    recap: "Make your own paper bookmark today and never fold a book page again.",
    act: {
      title: 'Craft a Personalized Library Bookmark',
      obj: 'Design and craft a durable paper bookmark with reading tips and use it for all shared books.',
      mats: ['Cardstock or thick paper strip (2 x 6 inches)', 'Markers', 'Hole punch and ribbon/yarn'],
      steps: ['Cut cardstock into a 2x6 inch strip.', 'Write an inspiring reading motto on one side (e.g. "Readers are Leaders").', 'Write 3 Book Care Rules on the reverse.', 'Punch hole at top and tie ribbon.'],
      output: 'A finished durable bookmark in active daily use with a reading book.',
      precautions: 'Use child-safe scissors when cutting cardstock.',
      alt: 'Perform a gentle eraser cleanup on pencil marks in your personal textbooks.'
    },
    scenarioGuided: {
      context: 'Diya is reading a library book and feels thirsty. Her water tumbler is right beside the open page.',
      optimal: 'Close the book, move tumbler to a separate side table, drink, wipe hands, and reopen book.',
      optReason: 'Completely eliminates the risk of catastrophic water spills onto shared books.',
      nonOpt1: 'Drink with one hand while holding the heavy book directly under the glass.',
      nonOptReason1: 'High risk of water condensation dripping and warping pages.',
      nonOpt2: 'Leave the open book face down on the dining table as a cup coaster.',
      nonOptReason2: 'Breaks the book binding and permanently ruins the cover.',
      takeaway: 'Keep food and beverages strictly separated from books and electronic devices.'
    },
    scenarioIndep: {
      context: 'You notice that a classmate has drawn pencil doodles inside a school library dictionary.',
      prompt: 'Explain how you will gently erase the marks or report the issue to the librarian.',
      rubric: 'Offered to gently erase pencil marks using a clean soft vinyl eraser without tearing paper.'
    },
    quiz: {
      q: 'Why should you use a flat bookmark instead of folding the corner of a book page (dog-earing)?',
      context: 'Marking your reading position in a library novel.',
      optCorrect: 'Because folding corners permanently creases, weakens, and eventually tears the paper over time.',
      optWrong1: 'Because bookmarks make the book heavier.',
      optWrong2: 'Because librarians charge a fee for books with bookmarks.',
      optWrong3: 'Because dog-ears make books change language.',
      remediation: 'Dog-earing causes permanent fiber breakage in paper; use flat paper bookmarks.'
    },
    rubric: {
      task: 'Demonstrate proper book handling: page turning, bookmark usage, shelf return, and spill prevention.',
      mastery: 'Clean hands, top-corner page manipulation, bookmark habit, undamaged spine, punctual return.',
      crit1: { name: 'Physical Book Handling', weight: 40, emerging: 'Roughly turns pages; licks fingers.', developing: 'Lacks gentle corner touch.', proficient: 'Flawless top-corner page lifting with clean dry hands.', exemplary: 'Exceptional preservationist care of all printed materials.' },
      crit2: { name: 'Marking & Bookmarks', weight: 35, emerging: 'Folds dog-ears or scribbles.', developing: 'Uses bulky objects like pens.', proficient: 'Consistently utilizes flat bookmarks.', exemplary: 'Advocates for bookmark use across the classroom.' },
      crit3: { name: 'Shared Responsibility', weight: 25, emerging: 'Loses books or returns late.', developing: 'Returns only after reminders.', proficient: 'Returns library books on or before due date in mint condition.', exemplary: 'Volunteers as student library assistant.' }
    },
    refs: [
      'What is the oldest book you have ever held in your hands?',
      'Why is it painful to find a book with pages torn or scribbled on?',
      'What reading motto did you choose to write on your bookmark?',
      'How does taking care of public books show respect for other students?'
    ]
  },
  {
    month: 12, monthTheme: 'School Pride, Waste Care & Community Respect', seq: 3,
    cat: 'life_citizenship_community', catLabel: 'Practical Citizenship & Community Life',
    title: 'Pedestrian Etiquette: Walking on Footpaths & Holding Hands in Crowds',
    why: 'Busy roads and crowded markets have heavy traffic, turning vehicles, and uneven surfaces. Practicing pedestrian safety and crowd awareness keeps you and your family safe.',
    objs: ['Always walk on the raised footpath or against traffic on roads without sidewalks', 'Hold an adult’s hand firmly in crowded markets, railway stations, and busy road intersections', 'Never look down at phone screens or chase loose balls into active streets', 'Look Left-Right-Left and make eye contact with drivers before crossing at a zebra crossing'],
    scenario: 'During Diwali shopping in a crowded bazaar, 9-year-old Samar saw a glittering toy balloon across the lane. He let go of his mother’s hand and darted between parked scooters into the middle of the street, while a speeding delivery motorcycle swerved sharply.',
    expl: 'Crowds and streets move fast. In a split second, a child can get separated from family or stepped into the path of an oncoming vehicle. Being a smart pedestrian means having street awareness: keeping your ears unplugged, staying on the pedestrian footpath, and holding hands in busy crowds.',
    steps: ['Always stay on the footpath; if there is no sidewalk, walk on the right side facing oncoming traffic so you can see vehicles.', 'In crowded markets or bus terminals, hold your guardian’s hand or stay within arm’s reach at all times.', 'Before crossing any street: STOP at the curb, LOOK right, look left, and look right again.', 'Make sure the approaching driver has stopped completely before stepping onto the road.', 'If a ball or pet runs into the street, NEVER chase it; ask an adult for help.'],
    example: { title: 'Samar’s Safe Market Walk', scenario: 'Samar shops with father in busy market.', steps: ['Holds father’s hand firmly.', 'Keeps eyes scanning the walkway for uneven bricks.', 'Stops at zebra crossing.', 'Looks Right-Left-Right.', 'Crosses calmly with group.'], takeaway: 'Holding hands and staying alert ensures every market trip ends safely.' },
    mistakes: [
      { mistake: 'Running into the street to grab a cricket ball without stopping at the curb.', correction: 'A lost ball can be replaced for ₹50; your life is priceless. Always stop and check traffic.' },
      { mistake: 'Wearing headphones or looking at a screen while walking on a busy road.', correction: 'You need your ears to hear vehicle horns, screeching brakes, and emergency sirens.' }
    ],
    checklist: ['Am I walking on the raised footpath?', 'Am I holding a parent’s hand in crowds?', 'Are my ears unplugged and eyes alert?', 'Did I do the Stop-Look-Listen check before crossing?'],
    prompt: 'Why is it important to see the driver’s eyes before stepping in front of a car at a crossing?',
    takeaway: 'Walk alert, hold hands in crowds, and never step into a street without looking: safety first, always.',
    heroDesc: 'Child holding parent’s hand while walking safely along a designated pedestrian footpath beside a busy city street.',
    vis1: { title: 'The Pedestrian Hierarchy', caption: '1. Footpath -> 2. Zebra Crossing -> 3. Walk Facing Traffic if No Sidewalk.' },
    vis2: { title: 'The 3-Second Street Stop', caption: 'STOP at curb -> LOOK Right, Left, Right -> LISTEN for horns -> WALK calmly.' },
    videoTitle: 'Street Smart: Walking Safely in Public', videoDuration: '3 mins 10 secs',
    scenes: [
      { visual: "Crowded market with auto-rickshaws, bikes, and shoppers.", narration: "Busy streets are exciting, but dangers move fast." },
      { visual: "Child holding parent's hand firmly and stopping at curb.", narration: "Hold hands in crowds. Never let go to chase a toy or ball." },
      { visual: "Checking Right-Left-Right and making eye contact with driver.", narration: "Make eye contact. Be sure the driver sees you before you cross." }
    ],
    recap: "Practice the Stop-Look-Listen pedestrian check next time you cross a road with an adult.",
    act: {
      title: 'Pedestrian Route Safety Audit',
      obj: 'Walk a 10-minute neighborhood route with an adult and identify pedestrian safety features.',
      mats: ['Walking shoes', 'Audit checklist', 'Parent escort'],
      steps: ['Walk from home to a local store or park.', 'Identify where footpaths exist and where they are blocked.', 'Count zebra crossings and traffic signals.', 'Practice making eye contact with stopped drivers.'],
      output: 'A completed Pedestrian Safety Walk Map with marked safe crossing points.',
      precautions: 'Always stay within arm’s reach of an adult when walking near active traffic.',
      alt: 'Map out the safest walking route inside your school campus from gate to classroom.'
    },
    scenarioGuided: {
      context: 'Arjun is walking home from school and sees his favorite teacher on the other side of a 4-lane avenue.',
      optimal: 'Walk to the official traffic signal zebra crossing 50 meters away, wait for green pedestrian light, and cross.',
      optReason: 'Using official pedestrian infrastructure protects against high-speed traffic.',
      nonOpt1: 'Dash across the 4 lanes between moving cars while waving hands.',
      nonOptReason1: 'Extreme risk of fatal collision; drivers cannot brake in time.',
      nonOpt2: 'Jump over the concrete median divider.',
      nonOptReason2: 'Illegal, reckless, and risks tripping onto oncoming traffic.',
      takeaway: 'Extra steps to a safe crossing are always worth your life.'
    },
    scenarioIndep: {
      context: 'You are playing cricket in a residential lane and the tennis ball rolls under a parked car.',
      prompt: 'Explain how you will safely retrieve the ball.',
      rubric: 'Checked if car engine was running/driver inside; knelt without entering street; retrieved safely.'
    },
    quiz: {
      q: 'If a road does not have a raised sidewalk or footpath, on which side of the road should pedestrians walk?',
      context: 'Walking on a neighborhood lane without footpaths.',
      optCorrect: 'On the side facing oncoming traffic (the right side in India) so you can see vehicles approaching.',
      optWrong1: 'In the dead center of the road.',
      optWrong2: 'With your back turned to traffic on the left edge.',
      optWrong3: 'Walking backwards with eyes closed.',
      remediation: 'Walking facing oncoming traffic gives you visual warning if a vehicle approaches too close.'
    },
    rubric: {
      task: 'Demonstrate street crossing protocol, crowd hand-holding compliance, and hazard perception.',
      mastery: 'Stop-Look-Listen mastery, maintains hand grip, faces traffic, rejects distractions.',
      crit1: { name: 'Street Crossing Execution', weight: 40, emerging: 'Darts into street.', developing: 'Looks one way only.', proficient: 'Full Stop-Look-Listen sequence at curb.', exemplary: 'Flawless right-left-right scan and driver eye contact.' },
      crit2: { name: 'Crowd Discipline', weight: 35, emerging: 'Runs away in crowds.', developing: 'Holds hand only when pulled.', proficient: 'Maintains firm hand grip or arm’s length in crowds.', exemplary: 'Proactively alerts adults to crowded bottlenecks.' },
      crit3: { name: 'Situational Awareness', weight: 25, emerging: 'Distracted by phone/toys.', developing: 'Reminded to pay attention.', proficient: 'Eyes up, ears clear of headphones, scans obstacles.', exemplary: 'Models exemplary pedestrian vigilance for younger peers.' }
    },
    refs: [
      'Why is it dangerous to wear earphones or look at a phone while walking on the street?',
      'Have you ever felt lost in a crowded market? How did you reconnect with family?',
      'Why does holding hands in crowds keep families united and safe?',
      'What can your city do to make pedestrian footpaths wider and safer for children?'
    ]
  }
]
