import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { formatModuleTs } from './module-template.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 36 Modules for Class 4 (Foundation, Ages 9-10)
// Domains: Independence (5), Comm (4), Money (5), Safety (5), CritThink (4), Social (5), Study (4), Citizen (4) = 36
const C4_RAW = [
  // M1: Daily Personal Routines & Self-Reliance
  {
    month: 1, monthTheme: 'Daily Personal Routines & Self-Reliance', seq: 1,
    cat: 'life_independence', catLabel: 'Personal Independence & Daily Living',
    title: "Pack a School Bag Using Tomorrow's Timetable",
    why: "Packing your bag the night before based on your timetable prevents forgotten homework, eliminates morning panic, and builds self-reliance.",
    objs: ["Check tomorrow's school timetable and identify required subjects", "Select only matching notebooks, textbooks, and diaries", "Verify stationery items (2 pencils, eraser, ruler, sharpener)", "Place packed bag and water bottle in a designated morning spot"],
    scenario: "Aarav woke up late on Tuesday, grabbed random books in a rush, and arrived at school only to discover he forgot his Science notebook and colored pencils for Art.",
    expl: "A school bag is your learning toolkit. When you pack it randomly, you carry extra weight you do not need and forget things you actually need. Packing systematically takes only 7 minutes when done the night before.",
    steps: ["Place tomorrow's timetable flat on your study desk.", "Read each period in order and pull out only the required textbook and notebook for that subject.", "Open your pencil box and verify you have: 2 sharpened pencils, 1 clean eraser, 1 ruler, and 1 sharpener.", "Check if any homework diary or parent consent slip needs to be signed and placed in the front zip pocket.", "Zip all compartments completely and set the bag beside your school shoes."],
    example: {
      title: "Wednesday Pack for Class 4",
      scenario: "Wednesday has Math, English, Environmental Studies (EVS), and Library. How should Diya pack?",
      steps: ["Diya reads Wednesday column: Math, English, EVS, Library.", "She places Math textbook and notebook against the back panel.", "She adds English reader and workbook in middle compartment.", "She adds EVS textbook and her Library book to return.", "She verifies her pencil pouch and adds a bookmark."],
      takeaway: "Grouping heavy books closest to the back panel makes the backpack much easier and healthier to carry."
    },
    mistakes: [
      { mistake: "Leaving all textbooks in the bag for the whole week to avoid repacking.", correction: "Carrying unnecessary heavy books hurts your shoulders and spine; remove yesterday’s unused books daily." },
      { mistake: "Packing in the morning 10 minutes before the school bus arrives.", correction: "Pack every evening right after finishing homework when your desk is already clear." }
    ],
    checklist: ["Did I read tomorrow's timetable completely?", "Are only required books inside the bag?", "Is my pencil box fully equipped with 2 pencils and eraser?", "Is the homework diary signed and packed in front pocket?"],
    prompt: "How did preparing your school bag in the evening change the way your morning felt before going to school?",
    takeaway: "Seven minutes of thoughtful evening packing gives you a calm, organized start to every school day.",
    heroDesc: "Student methodically matching textbooks against a visual schedule board.",
    vis1: { title: "Backpack Weight Hierarchy", caption: "Heavy books at back, medium in middle, light/stationery in front." },
    vis2: { title: "5-Point Bag Audit Checklist", caption: "Check off every period before zipping the main compartment." },
    videoTitle: "The 7-Minute Evening Bag Pack",
    videoDuration: "3 mins 20 secs",
    scenes: [
      { visual: "Rushed morning vs calm prepared morning.", narration: "Rushing leads to forgotten homework. Let's make mornings calm." },
      { visual: "Matching books to the timetable schedule.", narration: "Look at tomorrow's timetable. Pull out only the needed books." },
      { visual: "Pencil box check and final bag placement.", narration: "Check your pencils, zip up, and you are 100% ready for tomorrow." }
    ],
    recap: "Pack your bag tonight in under 7 minutes using your printed timetable.",
    act: {
      title: "7-Day Evening School Bag Challenge",
      obj: "Independently pack your school bag for 7 consecutive school evenings without missing any books.",
      mats: ["School bag", "Class timetable", "Daily check-off sheet", "Pencil box"],
      steps: ["Pin your class timetable directly above your study desk.", "At 7:30 PM each evening, empty unnecessary papers and yesterday’s books.", "Check tomorrow’s subjects and pack the exact books needed.", "Show your packed bag and checklist to a parent or caregiver for verification."],
      output: "A completed 7-day tracking sheet with 7 caregiver checkmarks and zero forgotten books at school.",
      precautions: "Do not overload your bag. Ensure the total weight is easy to carry comfortably.",
      alt: "Organize your home study shelf: arrange storybooks by size and test all coloring pens."
    },
    scenarioGuided: {
      context: "Rohan sees that tomorrow has Double Math and Art class. He also has a library book due in 3 days.",
      optimal: "Pack both Math books, Art sketchbook, and the library book today.",
      optReason: "Packing Art and Math covers tomorrow’s classes, and packing the library book early prevents overdue fines.",
      nonOpt1: "Leave the Art sketchbook at home because it is bulky and bring only Math.",
      nonOptReason1: "Leaving required supplies behind means you cannot participate in the practical art lesson.",
      nonOpt2: "Pack every single subject book just in case the timetable changes unexpectedly.",
      nonOptReason2: "Packing unnecessary books strains your back and makes finding items slow and frustrating.",
      takeaway: "Stick strictly to the timetable and pack scheduled specialty gear the night before."
    },
    scenarioIndep: {
      context: "Tomorrow is Friday with Sports in the first period followed by regular classes.",
      prompt: "Explain what extra items you must pack tonight, and where you will keep your water bottle to protect textbooks.",
      rubric: "Did you mention packing sports shoes/socks in a separate pouch and placing the water bottle in the external side mesh pocket?"
    },
    quiz: {
      q: "Why should the heaviest textbooks be placed closest to the back panel of your school backpack?",
      context: "You are packing a heavy Math encyclopedia and three thin exercise notebooks.",
      optCorrect: "Because it keeps the weight centered close to your spine, protecting your posture and making the bag feel lighter.",
      optWrong1: "Because it hides big books so teachers cannot see how many you brought.",
      optWrong2: "Because heavy books look better when stored in the deepest part of the backpack.",
      optWrong3: "It makes no difference where you place books inside the bag.",
      remediation: "Re-read the Backpack Weight Hierarchy infographic and rearrange your textbooks by weight."
    },
    rubric: {
      task: "Demonstrate packing a school bag according to a randomly drawn weekday timetable in under 5 minutes.",
      mastery: "Accurately selects 100% of required books, excludes non-timetable books, places heavy books against the back panel, and verifies stationery.",
      crit1: { name: "Timetable Accuracy", weight: 40, emerging: "Brings wrong books or misses >1 subject.", developing: "Misses 1 workbook or includes 2 extras.", proficient: "Matches 100% of required books with no extras.", exemplary: "Matches all subjects, packs specialty gear, and verifies diary." },
      crit2: { name: "Weight Distribution & Ergonomics", weight: 35, emerging: "Items tossed randomly.", developing: "Books stacked together but water bottle placed inside next to papers.", proficient: "Heavy books against back panel; water bottle in side mesh.", exemplary: "Ergonomic hierarchy with stationery in front pouch." },
      crit3: { name: "Independence & Speed", weight: 25, emerging: "Requires continuous adult guidance.", developing: "Packs independently but takes >15 minutes.", proficient: "Completes independent pack in under 7 minutes.", exemplary: "Under 5 minutes with calm confidence and tidy desk." }
    },
    refs: [
      "What was the hardest part about packing your bag the night before?",
      "Did you ever forget a book before this module? What happened?",
      "What will you change about where you keep your bag at night?",
      "How will you help a younger sibling or friend organize their school bag?"
    ]
  },
  {
    month: 1, monthTheme: 'Daily Personal Routines & Self-Reliance', seq: 2,
    cat: 'life_independence', catLabel: 'Personal Independence & Daily Living',
    title: 'Organizing Your Study Desk & Keeping Stationery Ready',
    why: 'A clean, clutter-free study surface lets your brain focus on learning instead of searching for lost erasers and scrap papers.',
    objs: ['Clear clutter from the desk surface before beginning study time', 'Create designated homes for pens, pencils, rulers, and paper', 'Sharpen 2 pencils and test pens before beginning homework', 'Wipe down and tidy the desk at the end of each study session'],
    scenario: 'Kabir sat down to do his Math homework. First he could not find a sharpened pencil. Then his ruler was under a pile of comic books. After 20 minutes of searching, he felt too tired to even start.',
    expl: 'Your brain can only focus on one thing at a time. When your study desk is covered in toys, wrappers, and unneeded books, your eyes keep getting distracted. Giving every tool a permanent home saves energy for thinking.',
    steps: ['Clear everything off your desk surface except your study lamp and pencil stand.', 'Wipe the surface clean with a dry duster cloth.', 'Sharpen 2 pencils over a bin and test your eraser.', 'Bring out ONLY the one textbook and one notebook you are currently working on.', 'When finished, return tools to their holder before opening your next subject.'],
    example: {
      title: 'Kabir’s Desk Transformation',
      scenario: 'Kabir’s small desk has old drawings, biscuit wrappers, and 6 unsharpened pencils.',
      steps: ['Kabir puts biscuit wrappers in the waste bin.', 'He stacks old drawings in an art folder and slides it onto a lower shelf.', 'He sharpens 2 good pencils, puts them in his pen cup, and donates dried markers.', 'His desk surface now has only his open Math book and pencil cup.'],
      takeaway: 'A clear desk means a clear mind. Homework gets done in half the time.'
    },
    mistakes: [
      { mistake: 'Studying on a bed with pillows where it is easy to get sleepy and misplace pencils.', correction: 'Always sit upright at a table or firm desk with both feet touching the floor.' },
      { mistake: 'Leaving pencil shavings on the desk surface after sharpening.', correction: 'Use a container sharpener or sharpen directly over the dustbin.' }
    ],
    checklist: ['Is my desk surface free of toys and food wrappers?', 'Are my 2 pencils sharpened and eraser clean?', 'Is only my current subject open on the table?', 'Is my chair positioned comfortably with good lighting?'],
    prompt: 'How did sitting at a clean desk change how fast you finished your homework?',
    takeaway: 'A five-minute desk reset before studying gives you calm focus and faster homework completion.',
    heroDesc: 'Organized desk setup showing dedicated stationery cup, open workbook, and natural light.',
    vis1: { title: 'Desk Focus Zones', caption: '70% center writing area, stationery at top corner, books shelved below.' },
    vis2: { title: '60-Second Post-Study Reset', caption: 'Close books, cap pens, bin shavings, push chair in.' },
    videoTitle: 'The 5-Minute Desk Reset Method',
    videoDuration: '2 mins 55 secs',
    scenes: [
      { visual: "Cluttered desk vs clear study workspace.", narration: "Clutter steals attention. A clear desk boosts focus instantly." },
      { visual: "Demonstrating the stationery cup and workspace zone.", narration: "Keep only one subject on your desk at a time." },
      { visual: "Child capping pens and pushing chair in.", narration: "A 60-second reset leaves your desk inviting for tomorrow." }
    ],
    recap: "Reset your study desk today and keep it 100% clutter-free.",
    act: {
      title: 'Study Space Transformation Project',
      obj: 'Clean, organize, and maintain your primary study area for 5 consecutive days.',
      mats: ['Cleaning cloth', 'Pen holder/cup', 'Labels or sticky notes', 'Dustbin'],
      steps: ['Take a sketch or photo of your desk as it is now.', 'Remove all items and wipe the table clean.', 'Sort stationery: discard dried markers, sharpen pencils.', 'Set up pen cup and keep only active books on top.', 'Maintain the 60-second reset for 5 days.'],
      output: 'A clean, functional study space maintained over 5 days with caregiver sign-off.',
      precautions: 'Do not keep open drinks or water next to lamps or electrical sockets.',
      alt: 'Organize a Portable Study Caddy box if you study on a shared dining table.'
    },
    scenarioGuided: {
      context: 'Ananya is about to start studying for her Hindi spelling test, but her desk has her brother’s board game on it.',
      optimal: 'Help her brother pack the board game back into its box before starting.',
      optReason: 'Clearing the space first ensures room to write without distracting colorful pieces.',
      nonOpt1: 'Push the pieces into a messy pile in the corner and squeeze her notebook on the edge.',
      nonOptReason1: 'Writing in a cramped space leads to poor handwriting and lost pieces.',
      nonOpt2: 'Sit on the living room rug with the TV on instead.',
      nonOptReason2: 'The living room TV distracts from memorizing spelling words.',
      takeaway: 'Always secure a dedicated, clear writing surface before starting study.'
    },
    scenarioIndep: {
      context: 'You just finished a 45-minute Science drawing activity with crayons and pencils everywhere.',
      prompt: 'Describe the 3 actions you will take right now before having dinner, so your desk is ready for tomorrow.',
      rubric: 'Did you mention putting crayons back in the box, throwing scrap shavings in the bin, and closing your notebook?'
    },
    quiz: {
      q: 'What is the biggest benefit of keeping only one textbook and notebook on your desk at a time?',
      context: 'You are working on English grammar exercises.',
      optCorrect: 'It prevents your mind from wandering to other subjects and reduces visual overwhelm.',
      optWrong1: 'It makes your parents think you only have 5 minutes of homework.',
      optWrong2: 'It allows you to eat snacks easily while writing.',
      optWrong3: 'It saves electricity by reducing the shadow of the desk lamp.',
      remediation: 'Practice clearing your desk surface completely before opening your next notebook.'
    },
    rubric: {
      task: 'Perform a full study desk audit and 60-second reset after a study session.',
      mastery: 'Surface clean and clear; tools stored upright in holders; no trash; comfortable seating.',
      crit1: { name: 'Workspace Decluttering', weight: 40, emerging: 'Multiple toys or wrappers left.', developing: 'Trash removed but unneeded books still on desk.', proficient: 'Writing area 100% clear with only active study materials.', exemplary: 'Immaculately clean surface with zoned stationery.' },
      crit2: { name: 'Tool Readiness', weight: 35, emerging: 'Unsharpened pencils, missing eraser.', developing: 'Pencils sharpened only when reminded.', proficient: 'Independently checks and sharpens 2 pencils.', exemplary: 'Maintains complete stationery readiness.' },
      crit3: { name: "Reset Consistency", weight: 25, emerging: "Leaves desk messy.", developing: "Resets only after reminders.", proficient: "Consistently resets in under 2 minutes.", exemplary: "Rapid reset and sets out tomorrow's first planner item." }
    },
    refs: [
      "What item on your desk distracts you the most when studying?",
      "How does your body feel when sitting at a clean desk vs a crowded bed?",
      "Where do you plan to keep your pencil shavings container?",
      "How can you remind yourself to push your chair in after studying?"
    ]
  },
  {
    month: 1, monthTheme: 'Daily Personal Routines & Self-Reliance', seq: 3,
    cat: 'life_independence', catLabel: 'Personal Independence & Daily Living',
    title: 'Folding Clothes & Pairing Socks Neatly',
    why: 'Taking care of your own clothes protects your school uniform from wrinkles, keeps your wardrobe organized, and builds daily independence.',
    objs: ['Fold a T-shirt or school shirt using the 3-step flat fold technique', 'Roll and pair socks so they never get separated in the drawer', 'Hang school trousers or skirts neatly on a hanger', 'Place folded items into the correct drawer or shelf compartment'],
    scenario: 'Every morning, Dev spends 10 minutes digging through an unorganized laundry basket looking for a matching white school sock, usually finding only one blue and one white sock.',
    expl: 'Clothes that are thrown in a heap get wrinkled and lost. When you pair socks and fold shirts right after they are washed and dried, finding your uniform in the morning takes just 15 seconds.',
    steps: ['Lay the shirt face-down flat on a clean bed or table, smoothing out big wrinkles with your hands.', 'Fold the left third inward with its sleeve pointing down.', 'Fold the right third inward so it forms a neat rectangle.', 'Fold the bottom hem up to the collar to create a compact, stable square.', 'For socks: lay one sock directly on top of its mate, then tuck the top cuff over both heels to lock them together.'],
    example: {
      title: 'The T-Shirt Fold Demonstration',
      scenario: 'Priya has 3 freshly washed cotton school shirts that came off the drying rack.',
      steps: ['Priya places the first shirt face down on her bed and flattens it with her palms.', 'She folds the left side in, folds the right side in, then folds in half.', 'She stacks the three shirts with collars facing forward in her shelf.', 'She takes 3 pairs of socks, pairs them heel-to-heel, and rolls them into neat sock balls.'],
      takeaway: 'Smooth hands make flat folds. You never need an iron if you fold clothes promptly.'
    },
    mistakes: [
      { mistake: 'Stuffing socks into a drawer as loose single pieces.', correction: 'Always cuff them together as pairs immediately when removing them from the laundry line.' },
      { mistake: 'Folding clothes in the air without resting them on a flat surface.', correction: 'Always lay shirts on a flat bed or table so the fold lines are straight.' }
    ],
    checklist: ['Did I smooth out wrinkles before making folds?', 'Are the sleeves folded neatly inside the edges?', 'Are both matching socks cuffed securely together?', 'Is the folded stack placed in the designated shelf?'],
    prompt: 'How did it feel when you were able to pick out your complete uniform in seconds today?',
    takeaway: 'Folding your clothes and pairing socks takes five minutes and saves morning stress every single day.',
    heroDesc: 'Hands demonstrating flat-fold technique for school uniform shirts.',
    vis1: { title: '3-Step Shirt Fold', caption: 'Fold left third, fold right third, fold bottom to collar.' },
    vis2: { title: 'Sock-Lock Pairing Method', caption: 'Roll heels together and fold top cuff over the bundle.' },
    videoTitle: 'Folding Clothes Like a Pro: 3-Step Method',
    videoDuration: '3 mins 10 secs',
    scenes: [
      { visual: "Messy pile vs neat folded stack.", narration: "Finding wrinkled clothes wastes time. Let's learn the 3-step fold." },
      { visual: "Hands smoothing fabric on a flat table.", narration: "Smooth out wrinkles, fold inward, then fold in half." },
      { visual: "Cuffing socks and placing in drawer.", narration: "Lock your socks together so pairs never get separated." }
    ],
    recap: "Fold 3 shirts and pair 3 sets of socks today.",
    act: {
      title: 'Wardrobe Wardens Practical Fold Challenge',
      obj: 'Practice folding 3 shirts and pairing 4 sets of socks, then organize your uniform drawer.',
      mats: ['3 clean T-shirts or shirts', '4 pairs of clean socks', '1 clothes drawer or shelf section'],
      steps: ['Find a clean, flat surface on your bed or table.', 'Use the 3-step method to fold all 3 shirts.', 'Pair and cuff-lock all 4 sets of socks.', 'Arrange shirts vertically or stacked neatly in your wardrobe drawer.', 'Show your completed drawer to your caregiver.'],
      output: 'A neatly organized drawer section with 3 flat folded shirts and 4 locked sock pairs.',
      precautions: 'Do not jump on beds while folding; keep the surface clear and clean.',
      alt: 'Practice folding 2 clean bath towels into neat thirds.'
    },
    scenarioGuided: {
      context: 'Meera takes off her school uniform after returning home. She is in a hurry to go out and play badminton.',
      optimal: 'Take 60 seconds to hang her tunic on a hanger and put socks in the wash basket before leaving.',
      optReason: 'Hanging the tunic prevents wrinkles, and putting socks in laundry ensures they get washed.',
      nonOpt1: 'Toss the uniform onto the floor near her bed and run outside.',
      nonOptReason1: 'Leaving clothes on the floor gets them dusty and wrinkled.',
      nonOpt2: 'Cram the uniform inside her school bag so nobody sees it.',
      nonOptReason2: 'Stuffing clothes in a bag causes deep creases and stale odors.',
      takeaway: 'Taking 60 seconds to hang or fold uniform immediately preserves its freshness.'
    },
    scenarioIndep: {
      context: 'You just pulled your clean laundry off the clothesline and brought it into your room.',
      prompt: 'Explain how you will separate socks from shirts and the exact steps you will use to fold them so they fit in your drawer.',
      rubric: 'Did you mention pairing socks first, using a flat surface for shirts, and stacking neatly?'
    },
    quiz: {
      q: 'Why should you fold one sock cuff over the other when putting socks away?',
      context: 'You are organizing your sock drawer after weekend laundry.',
      optCorrect: 'It locks the pair together so matching socks never get separated or lost in the drawer.',
      optWrong1: 'It makes the socks stretch and grow bigger.',
      optWrong2: 'It changes the color of the socks.',
      optWrong3: 'It is a school rule that teachers inspect every Monday.',
      remediation: 'Practice cuff-locking 3 pairs of socks until you can pair a set in under 10 seconds.'
    },
    rubric: {
      task: 'Demonstrate folding 2 shirts and pairing 2 sets of socks in under 3 minutes.',
      mastery: 'Folds are straight, edges aligned, sleeves tucked inside, and socks firmly paired.',
      crit1: { name: 'Fold Alignment & Neatness', weight: 40, emerging: 'Wrinkles trapped; edges uneven.', developing: 'Folds shirt but sleeves stick out.', proficient: 'Clean rectangular fold with sleeves tucked inside.', exemplary: 'Crisp retail-quality fold with zero creases.' },
      crit2: { name: 'Sock Pairing Technique', weight: 35, emerging: 'Socks left loose.', developing: 'Rolled loosely without locking cuff.', proficient: 'Cuff folded securely over both heels.', exemplary: 'Fast secure lock with colors matched.' },
      crit3: { name: 'Independence & Care', weight: 25, emerging: 'Gives up after one attempt.', developing: 'Needs reminders at each step.', proficient: 'Completes both items independently.', exemplary: 'Independent execution and puts items into drawer.' }
    },
    refs: [
      "Which was easier for you: folding a shirt or pairing socks?",
      "How long did you usually spend looking for clean socks before learning this method?",
      "What other clothing items can you practice folding at home?",
      "How can keeping your clothes tidy help your parents or family?"
    ]
  }
]

// To build the remaining 33 modules for Class 4, let's create a builder helper that imports or generates them systematically
console.log(`Writing Class 4 modules. Generating remaining 33 topics...`)
