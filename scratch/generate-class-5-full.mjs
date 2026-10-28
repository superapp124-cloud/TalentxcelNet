import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { formatModuleTs } from './module-template.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('Generating Class 5 (36 Modules)...')

// Helper function to build a structured module
function makeMod({
  month, theme, seq, cat, catLabel, title, why, objs,
  scenario, expl, steps, example, mistakes, checklist,
  prompt, takeaway, heroDesc, vis1, vis2,
  videoTitle, videoDuration, scenes, recap,
  act, guided, indep, quiz, rubric, refs
}) {
  return {
    month, monthTheme: theme, seq, cat, catLabel, title, why, objs,
    scenario, expl, steps, example, mistakes, checklist,
    prompt, takeaway, heroDesc, vis1, vis2,
    videoTitle, videoDuration, scenes, recap,
    act, scenarioGuided: guided, scenarioIndep: indep, quiz, rubric, refs
  }
}

// All 36 Modules for Class 5
export const C5_ALL_MODULES = [
  // MONTH 1: Weekly Routine Planning & Morning Rhythm
  makeMod({
    month: 1, theme: 'Weekly Routine Planning & Morning Rhythm', seq: 1,
    cat: 'life_independence', catLabel: 'Personal Independence & Daily Living',
    title: 'Creating a Weekly After-School Schedule with Fixed Play & Study Blocks',
    why: 'When after-school hours are unplanned, homework gets delayed until bedtime and playtime gets squeezed out. A visual weekly timetable gives you freedom, fun, and timely rest.',
    objs: ['Design a Monday-to-Friday after-school schedule grid with 1-hour blocks', 'Allocate fixed, protected slots for outdoor play (1 hour) and focused homework (1.5 hours)', 'Build in a 20-minute buffer for relaxation or reading before dinner', 'Stick to the schedule independently without needing parental nagging'],
    scenario: 'Vihaan came home at 3:30 PM, watched TV while eating biscuits, started browsing his tablet, and suddenly it was 8:00 PM. He still had Math worksheets and Science definitions left, leading to tears and a stressful late dinner.',
    expl: 'Time is like a school backpack: if you throw things in randomly, nothing fits! But if you pack big rocks first (homework, sports, sleep) and small sand after (cartoons, gaming), everything fits comfortably with zero stress.',
    steps: ['Draw a grid with 5 columns (Monday to Friday) and 5 rows (3:30 PM to 8:30 PM).', 'Block out 3:30 to 4:00 PM for washing hands, healthy snack, and unwinding.', 'Block out 4:30 to 5:30 PM for outdoor games, cycling, or physical sports.', 'Block out 5:45 to 7:15 PM for focused homework sprints with a 5-minute break.', 'Reserve 7:30 to 8:30 PM for dinner, family time, and bag packing.'],
    example: { title: 'Vihaan’s Balanced Weekday Grid', scenario: 'Vihaan tests his new after-school timetable on Tuesday.', steps: ['Eats poha and changes out of uniform by 4:00 PM.', 'Plays cricket with building friends until 5:30 PM.', 'Finishes Math and English homework by 7:00 PM.', 'Enjoys dinner peacefully with grandparents at 8:00 PM.'], takeaway: 'Scheduling play first ensures you play guilt-free and study with deep focus.' },
    mistakes: [
      { mistake: 'Scheduling 4 solid hours of continuous study with no play or breaks.', correction: 'Unrealistic schedules cause burnout; always include 60 minutes of active physical play.' },
      { mistake: 'Leaving schedule flexible with no set start time for homework.', correction: 'Ambiguity invites procrastination; anchor homework to an exact clock time (e.g. 5:45 PM).' }
    ],
    checklist: ['Is physical playtime clearly scheduled?', 'Is homework scheduled before 7:30 PM?', 'Is there a wind-down buffer before dinner?', 'Is the schedule posted where the family can see it?'],
    prompt: 'How does knowing you have protected playtime make sitting down for homework feel easier?',
    takeaway: 'Schedule your play and schedule your study: a predictable rhythm creates effortless success.',
    heroDesc: 'Student reviewing a colorful weekly timetable pinned above a wooden study desk.',
    vis1: { title: 'The After-School Rhythm Map', caption: '3:30pm Arrive -> 4:30pm Outdoor Play -> 5:45pm Homework Sprint -> 7:30pm Family & Dinner.' },
    vis2: { title: 'The 3 Non-Negotiables', caption: '1. Sixty minutes outdoor play, 2. Single-task study block, 3. Consistent 9:30 PM lights out.' },
    videoTitle: 'Own Your Afternoons: The Weekly Timetable', videoDuration: '3 mins 20 secs',
    scenes: [
      { visual: "Child rushing through homework late at night vs child enjoying balanced evening.", narration: "Unplanned afternoons slip away like water through fingers." },
      { visual: "Color-coding play blocks in green and study blocks in blue.", narration: "Protect your playtime. Lock in your homework sprint. Own your evening." },
      { visual: "Ticking off afternoon tasks with a satisfied smile.", narration: "A clear rhythm turns stressful evenings into calm family time." }
    ],
    recap: "Draft your Monday-to-Friday after-school schedule grid today.",
    act: {
      title: '5-Day After-School Schedule Blueprint',
      obj: 'Construct and follow a color-coded weekday after-school schedule for 5 days.',
      mats: ['A4 paper or cardboard', 'Color markers (Green for play, Blue for study, Yellow for meals)', 'Ruler'],
      steps: ['Draw 5 weekday columns from 3:30 PM to 9:00 PM.', 'Color play blocks in green and study blocks in blue.', 'Post grid next to study desk.', 'Track daily on-time starts for 5 days.'],
      output: 'A completed 5-day schedule tracker with caregiver verification signatures.',
      precautions: 'Ensure schedule accommodates actual school bus arrival times.',
      alt: 'Create a visual clock wheel showing hourly activity wedges.'
    },
    guided: {
      context: 'It is 5:45 PM—the scheduled start time for homework—but a friend rings the doorbell asking to play extra video games.',
      optimal: 'Politely say: "My homework block is 5:45 to 7:00 PM. Let us play together tomorrow at 4:30 PM during play hour."',
      optReason: 'Protects personal commitments while maintaining a friendly, cooperative relationship.',
      nonOpt1: 'Abandon homework, play games until 9 PM, and stay up until midnight crying over Math.',
      nonOptReason1: 'Breaks self-trust and causes severe academic distress.',
      nonOpt2: 'Slam the door rudely in the friend’s face without explanation.',
      nonOptReason2: 'Damages friendship unnecessarily when clear communication works better.',
      takeaway: 'Boundary setting with peers protects your evening peace and personal goals.'
    },
    indep: {
      context: 'School announces a special 2-hour sports practice on Wednesday from 5:00 to 7:00 PM.',
      prompt: 'Explain how you will adjust your Wednesday schedule to ensure homework still gets completed.',
      rubric: 'Shifted homework block to 3:45-4:45 PM before sports, or planned a light evening review session.'
    },
    quiz: {
      q: 'Why should an after-school schedule include guaranteed outdoor playtime rather than only study blocks?',
      context: 'Designing a balanced weekday schedule for Class 5.',
      optCorrect: 'Because physical play releases pent-up energy, boosts oxygen to the brain, and sharpens study focus.',
      optWrong1: 'Because sports are more important than doing homework.',
      optWrong2: 'Because school rules require students to play video games.',
      optWrong3: 'Because parents prefer children staying outside until night.',
      remediation: 'Physical activity refreshes neural pathways; balanced days include both hard work and active play.'
    },
    rubric: {
      task: 'Design a realistic weekly after-school schedule and execute it for 5 consecutive school days.',
      mastery: 'Realistic time blocks, clear color coding, 100% homework/play balance, self-directed execution.',
      crit1: { name: 'Schedule Design & Realism', weight: 40, emerging: 'Unrealistic or missing blocks.', developing: 'Covers only study, forgets play.', proficient: 'Balanced allocation of play, study, meals, and rest.', exemplary: 'Optimally phased schedule with transition buffers.' },
      crit2: { name: 'Adherence & Independence', weight: 35, emerging: 'Requires constant parent nagging.', developing: 'Follows 2-3 days.', proficient: 'Follows schedule for 5 days with minimal reminders.', exemplary: 'Self-initiates transitions using clock prompts.' },
      crit3: { name: 'Reflection & Adjustment', weight: 25, emerging: 'Does not review bottlenecks.', developing: 'Notices delays but makes no changes.', proficient: 'Adjusts unrealistic blocks thoughtfully.', exemplary: 'Proactively optimizes weekly schedule based on experience.' }
    },
    refs: [
      'What part of your after-school time felt easiest to manage this week?',
      'Did you ever feel tempted to delay homework? What brought you back to the desk?',
      'How did your parents react when they saw you start homework without being asked?',
      'How will your schedule change when exam revision weeks begin?'
    ]
  }),
  makeMod({
    month: 1, theme: 'Weekly Routine Planning & Morning Rhythm', seq: 2,
    cat: 'life_independence', catLabel: 'Personal Independence & Daily Living',
    title: 'Morning Speed Routine: Getting Dressed, Beds Made & Shoes On in 15 Minutes',
    why: 'Morning chaos leads to missed buses, forgotten items, and stressful family arguments. A streamlined 15-minute speed routine gives you a calm, victorious start to every morning.',
    objs: ['Execute a 5-step morning checklist without adult prompting', 'Make bed immediately upon waking: straighten sheet and fluff pillow in 60 seconds', 'Put on uniform, socks, and polished shoes within 8 minutes', 'Check bag, water bottle, and snack box before stepping to the front door'],
    scenario: 'Rohan woke up at 6:45 AM for a 7:15 AM school bus. He spent 10 minutes hunting for his left shoe, couldn’t find his belt, and ran to the bus stop with untied laces and toast half-hanging out of his mouth.',
    expl: 'Pilots and athletes don’t invent their routine every morning—they follow a pre-flight checklist! When your clothes, shoes, and bag are stationed the night before, your morning becomes an effortless 15-minute glide.',
    steps: ['Rise at the first alarm bell; immediately stretch and make your bed (60 seconds).', 'Wash face, brush teeth with 2-minute circles, and comb hair.', 'Step into clean uniform laid out the night before, buttoning from top to bottom.', 'Slip into socks and tie shoes using the bunny-ear knot.', 'Grab packed water bottle and tiffin from kitchen counter and head to the door.'],
    example: { title: 'Rohan’s 15-Minute Morning Glide', scenario: 'Rohan executes his morning checklist.', steps: ['Alarm rings at 6:30 AM; stands immediately.', 'Fluffs pillow and pulls quilt tight (1 min).', 'Brushes teeth and washes face (4 mins).', 'Dresses in pre-set uniform and ties shoes (6 mins).', 'Eats warm breakfast calmly at table (10 mins).'], takeaway: 'Preparation the night before turns morning panic into peaceful family breakfast.' },
    mistakes: [
      { mistake: 'Hitting the snooze button 4 times and sleeping in 10-minute bursts.', correction: 'Snoozing creates sleep inertia; stand up immediately and drink a glass of water.' },
      { mistake: 'Leaving shoe polishing and uniform searching for morning time.', correction: 'Always lay out uniform, belt, socks, and shoes completely before sleeping.' }
    ],
    checklist: ['Did I get up at first alarm?', 'Is my bed made neatly?', 'Is uniform worn with belt and shoes tied?', 'Are water bottle and tiffin packed in bag?'],
    prompt: 'How did having 10 relaxed minutes to eat breakfast change your school bus ride?',
    takeaway: 'Win the first fifteen minutes of your day, and you win the whole day.',
    heroDesc: 'Child adjusting tie in front of mirror with neatly made bed in background and school shoes tied.',
    vis1: { title: 'The 15-Minute Launch Sequence', caption: '0-2m Rise & Make Bed -> 2-6m Teeth & Wash -> 6-12m Uniform & Shoes -> 12-15m Bag & Go.' },
    vis2: { title: 'The Bedside Launchpad', caption: 'Uniform on chair, socks rolled inside shoes, packed bag beside door.' },
    videoTitle: 'The 15-Minute Morning Launch', videoDuration: '3 mins 10 secs',
    scenes: [
      { visual: "Frantic morning searching under beds vs calm prepared launch.", narration: "The secret to a calm morning begins ten hours earlier." },
      { visual: "Sixty-second bed making and uniform step-in.", narration: "Make your bed. Put on your armor. Step into your shoes." },
      { visual: "Family smiling over warm parathas at breakfast table.", narration: "Start your day with calm confidence. The school bus will never leave you behind." }
    ],
    recap: "Set up your 'Launchpad' tonight: lay out uniform, socks, and shoes completely.",
    act: {
      title: '7-Day Morning Launch Challenge',
      obj: 'Complete morning rising, bed making, dressing, and shoe tying in under 15 minutes for 7 school days.',
      mats: ['Clock or stopwatch', 'Night-before Launchpad station', 'Morning tracking card'],
      steps: ['Set uniform, socks, and shoes on chair tonight.', 'Record wake-up time upon alarm.', 'Execute checklist without distractions.', 'Record finish time when dressed and shoes tied.'],
      output: 'A 7-day launch log showing elapsed minutes with caregiver initials.',
      precautions: 'Do not run recklessly down stairs when putting on shoes; sit on a chair to tie laces safely.',
      alt: 'Focus on mastering the 60-second bed-making and shoe-tying speed trial.'
    },
    guided: {
      context: 'Tanvi wakes up feeling groggy and wants to lie in bed scrolling through cartoons on a phone.',
      optimal: 'Push the blanket back immediately, sit upright on the edge of the bed, and drink a glass of water.',
      optReason: 'Sitting upright and drinking cold water instantly signals the brain that sleep mode is over.',
      nonOpt1: 'Pull the blanket over head and sleep for another 20 minutes until mother screams.',
      nonOptReason1: 'Creates severe lateness, stress, and starts the day with an argument.',
      nonOpt2: 'Watch 15 minutes of videos in bed while pretending to be asleep.',
      nonOptReason2: 'Wastes critical preparation time and strains tired eyes.',
      takeaway: 'Action cures sluggishness: feet on the floor within 5 seconds of the alarm.'
    },
    indep: {
      context: 'You notice your school uniform shirt is missing a button right as you dress at 6:40 AM.',
      prompt: 'Explain what you will do calmly to solve this without panicking.',
      rubric: 'Checked for spare uniform shirt; alerted parent immediately; adjusted sweater/tie neatly.'
    },
    quiz: {
      q: 'What is the single most important action to take the night before to ensure a 15-minute morning routine?',
      context: 'Setting up an effortless morning launch.',
      optCorrect: 'Laying out uniform, socks, shoes, belt, and packed school bag in a designated spot.',
      optWrong1: 'Setting four loud alarms five minutes apart.',
      optWrong2: 'Sleeping in school uniform with shoes on.',
      optWrong3: 'Skipping breakfast completely to save time.',
      remediation: 'Eliminate morning decisions the night before by preparing all clothing and gear in advance.'
    },
    rubric: {
      task: 'Execute a full morning preparation sequence from alarm to departure under timed observation.',
      mastery: 'Under 15 minutes, neat bed made, fully groomed uniform, calm disposition, zero nagging required.',
      crit1: { name: 'Time Management & Speed', weight: 40, emerging: 'Takes >30 minutes.', developing: 'Takes 20-25 minutes.', proficient: 'Completes all steps in under 15 minutes.', exemplary: 'Effortless 12-minute execution with time to spare.' },
      crit2: { name: 'Grooming & Bed Neatness', weight: 35, emerging: 'Bed unmade, untucked shirt.', developing: 'Bed messy, shoes untied.', proficient: 'Bed made flat; uniform tidy, shoes properly laced.', exemplary: 'Hospital-corner bed corners and immaculate attire.' },
      crit3: { name: 'Self-Reliance', weight: 25, emerging: 'Requires repeated parental prompts.', developing: 'Needs 1-2 reminders.', proficient: '100% self-directed execution from alarm to shoes.', exemplary: 'Assists younger sibling with morning launch.' }
    },
    refs: [
      'How does making your bed first thing in the morning give you a sense of achievement?',
      'What was the biggest morning time-waster you eliminated this week?',
      'How did your morning mood feel when you didn’t have to rush?',
      'What can you do on Sunday evenings to prepare for Monday morning?'
    ]
  }),
  makeMod({
    month: 1, theme: 'Weekly Routine Planning & Morning Rhythm', seq: 3,
    cat: 'life_study_skills', catLabel: 'Study Skills & Learning Independence',
    title: 'Setting Up Subject Folders & Keeping Loose Handouts Sorted',
    why: 'Loose worksheets crammed into bags get crumpled, stained, and lost before exams. Setting up dedicated subject folders ensures you can find any worksheet in five seconds.',
    objs: ['Label 4 clear plastic L-folders with bold subject names: Math, Science, English, Social Studies', 'File daily school worksheets into the correct folder on the afternoon they are received', 'Purge outdated announcements and scrap paper weekly', 'Locate any requested homework sheet in under 10 seconds'],
    scenario: 'Sneha’s teacher asked for the 3-page Science plant life cycle worksheet handed out last Thursday. Sneha dug through her bag, pulling out crumpled biscuit wrappers, old circulars, and ripped papers, but the worksheet was nowhere to be found.',
    expl: 'Your backpack is for transporting knowledge, not storing crumpled trash! A loose sheet of paper has zero structural strength—it gets torn and mashed by heavy books. Keeping 4 flat plastic folders acts like a filing cabinet inside your bag.',
    steps: ['Get 4 plastic sleeve folders or L-cut file jackets in different colors.', 'Write bold subject labels at the top right: MATH, SCIENCE, ENGLISH, SOCIAL STUDIES.', 'Every afternoon when unpacking your bag, slide new loose worksheets into their matching folder.', 'Place heavy textbooks first, then notebooks, then the 4 slender folders against the front wall.', 'Every Friday evening, review folders and remove old permission slips and completed notices.'],
    example: { title: 'Sneha’s 4-Folder Filing Cabinet', scenario: 'Sneha reorganizes her loose sheets.', steps: ['Cleans all crumpled paper out of backpack.', 'Labels blue for Math, green for Science, red for English.', 'Files 6 loose worksheets into matching folders.', 'Finds Science homework sheet instantly next day.'], takeaway: 'Ten seconds of filing saves twenty minutes of frantic searching.' },
    mistakes: [
      { mistake: 'Folding worksheets into tiny squares and shoving them inside textbook pages.', correction: 'Creased folds tear easily and fall out; always file sheets flat inside folders.' },
      { mistake: 'Letting 6 months of old circulars accumulate until folders bulge and split.', correction: 'Do a 2-minute Friday cleanout to archive old sheets into a home box.' }
    ],
    checklist: ['Are all 4 folders clearly labeled?', 'Are worksheets filed flat with no folded edges?', 'Are folders stored upright in bag?', 'Did I do the Friday cleanout?'],
    prompt: 'How much faster can you find your homework worksheet when it has a dedicated home?',
    takeaway: 'File it flat, find it fast: organized folders turn chaos into effortless clarity.',
    heroDesc: 'Student sliding a crisp science worksheet into a labeled green plastic folder at an organized desk.',
    vis1: { title: 'The 4-Subject Color Code', caption: 'Blue = Mathematics, Green = Science, Red = English, Yellow = Social Studies.' },
    vis2: { title: 'Backpack Packing Hierarchy', caption: 'Back: Heavy Textbooks -> Center: Notebooks -> Front: Slim Subject Folders.' },
    videoTitle: 'The 5-Second Paper Filing System', videoDuration: '2 mins 55 secs',
    scenes: [
      { visual: "Student pulling crumpled, torn worksheet from messy bag.", narration: "Nothing feels worse than knowing you did your homework, but losing the sheet." },
      { visual: "Demonstrating labeling four slim plastic folders and filing worksheets flat.", narration: "Four slim folders. Four subject colors. Flat, clean, and ready in five seconds." },
      { visual: "Instantly handing neat, uncrumpled homework to smiling teacher.", narration: "When your papers are organized, your mind is free to learn." }
    ],
    recap: "Label 4 plastic folders for your core subjects and sort all loose sheets today.",
    act: {
      title: 'School Bag Paper Filing Setup',
      obj: 'Label 4 subject folders, sort all loose papers in your backpack, and maintain for 2 weeks.',
      mats: ['4 plastic L-folders or paper document files', 'Permanent marker or label stickers', 'Current school backpack'],
      steps: ['Empty every single sheet of paper from your backpack.', 'Recycle useless trash, wrappers, and outdated flyers.', 'Label folders: MATH, SCIENCE, ENGLISH, SOCIAL STUDIES.', 'File all active worksheets flat into corresponding folders.'],
      output: 'A fully organized backpack with 4 labeled subject folders and zero loose paper.',
      precautions: 'Do not throw away parent consent slips or test papers without adult verification.',
      alt: 'Use a single multi-pocket accordion folder if individual files are unavailable.'
    },
    guided: {
      context: 'You receive a two-page Math mock test paper 5 minutes before the final school bell rings.',
      optimal: 'Take 5 seconds to open the Blue Math folder and slide both pages flat inside before zipping bag.',
      optReason: 'Ensures the papers arrive home pristine, uncreased, and ready for evening review.',
      nonOpt1: 'Crumple papers into a ball and stuff them into the side water bottle mesh.',
      nonOptReason1: 'Papers get soaked by bottle condensation and torn by bushes.',
      nonOpt2: 'Toss papers loosely into the bottom of the main bag compartment.',
      nonOptReason2: 'Heavy textbooks will crush and dog-ear the edges during the bus ride.',
      takeaway: 'Five seconds of discipline protects hours of valuable schoolwork.'
    },
    indep: {
      context: 'Your teacher hands you a signed permission slip for a field trip that must be returned tomorrow.',
      prompt: 'Explain exactly where you will keep this slip so your parents can sign it tonight.',
      rubric: 'Placed in front folder pocket; showed parent during 4 PM bag unpack; returned signed slip to folder.'
    },
    quiz: {
      q: 'Why should loose school worksheets never be stored directly loose at the bottom of a backpack?',
      context: 'Protecting school assignments and handouts.',
      optCorrect: 'Because heavy textbooks and water bottles crush, tear, and soil loose papers during transport.',
      optWrong1: 'Because backpacks have paper-eating zippers.',
      optWrong2: 'Because school rules forbid bringing paper home.',
      optWrong3: 'Because loose papers make the backpack 10 times heavier.',
      remediation: 'Always protect thin paper inside sturdy plastic or card folders to maintain integrity.'
    },
    rubric: {
      task: 'Organize, label, and maintain a 4-folder filing system for loose school worksheets.',
      mastery: 'Clean subject labeling, 100% loose sheets sorted flat, zero bag clutter, instant retrieval speed.',
      crit1: { name: 'Folder Labeling & Structure', weight: 40, emerging: 'Unlabeled or single generic file.', developing: '2 folders labeled.', proficient: '4 distinct subjects neatly labeled and color-coded.', exemplary: 'Professional labeling with subject indices and emergency pouch.' },
      crit2: { name: 'Filing Discipline & Paper Condition', weight: 35, emerging: 'Crumpled, torn papers.', developing: 'Papers folded in half.', proficient: 'All worksheets filed completely flat without tears.', exemplary: 'Pristine paper preservation across multiple weeks.' },
      crit3: { name: 'Retrieval Speed', weight: 25, emerging: 'Takes >30 seconds to find sheet.', developing: 'Takes 15-20 seconds.', proficient: 'Retrieves specified worksheet in under 10 seconds.', exemplary: 'Instant 5-second retrieval with total composure.' }
    },
    refs: [
      'Have you ever lost homework that you had already finished? How did it feel?',
      'Which subject gives you the most loose worksheets each week?',
      'How does keeping clean folders make studying for exams easier?',
      'How will you teach this filing system to a classmate whose bag is messy?'
    ]
  })
]

// Now let's author Months 2 through 12 topics
// ...
