export const CLASS_4_RAW = [
  // MONTH 1: Daily Personal Routines & Self-Reliance (Independence)
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
  },

  // MONTH 2: Speaking Up & Clear Communication (Communication)
  {
    month: 2, monthTheme: 'Speaking Up & Clear Communication', seq: 1,
    cat: 'life_communication', catLabel: 'Communication & Confidence',
    title: 'Speaking Clearly, Politely, and Making Eye Contact',
    why: 'Clear speech and warm eye contact help teachers, friends, and family understand your thoughts and respect your voice.',
    objs: ['Speak in a calm, clear voice loud enough for the listener to hear', 'Look at the listener’s forehead or eyes respectfully while speaking', 'Use polite words like "please", "thank you", and "excuse me"', 'Avoid mumbling, whispering, or looking at your shoes when answering'],
    scenario: 'When the teacher called on Sneha to answer a question, she looked down at her shoes and mumbled so quietly that the teacher had to ask three times.',
    expl: 'Your voice is your tool to share ideas with the world. You do not need to shout, but speaking with an upright posture and looking towards the listener shows that you respect yourself and the person you are talking to.',
    steps: ['Stand or sit upright with shoulders relaxed and chin level.', 'Look towards the listener’s face—if direct eye contact feels shy, look at the space between their eyebrows.', 'Take one calm breath before beginning your sentence.', 'Speak at a steady pace, pronouncing the end of words clearly.', 'Finish your sentence with a calm smile.'],
    example: {
      title: 'Sneha’s Morning Assembly Greeting',
      scenario: 'Sneha had to present the thought of the day in front of 30 classmates.',
      steps: ['She took a slow breath behind the podium.', 'She found three friendly faces in the front row and smiled.', 'She spoke the sentence slowly, holding her cue card at chest level.', 'Every classmate heard and clapped warmly.'],
      takeaway: 'One calm breath before speaking instantly steadies your voice.'
    },
    mistakes: [
      { mistake: 'Covering your mouth with your hand or collar while speaking.', correction: 'Keep hands resting comfortably by your sides so your voice carries forward clearly.' },
      { mistake: 'Rushing through sentences so fast that words blur together.', correction: 'Pause between sentences; pausing makes you sound thoughtful and confident.' }
    ],
    checklist: ['Did I take a calm breath before speaking?', 'Am I looking towards the listener’s face?', 'Is my voice loud enough without shouting?', 'Did I speak at a steady, unhurried pace?'],
    prompt: 'When you spoke clearly to someone today, how did they respond differently than when you mumbled?',
    takeaway: 'Posture, one calm breath, and gentle eye contact turn nervous murmurs into confident communication.',
    heroDesc: 'Child speaking calmly with upright posture to a listening group.',
    vis1: { title: 'Eye Contact Triangle', caption: 'Look at the left eye, right eye, and forehead center.' },
    vis2: { title: 'Clear Voice Projection Rules', caption: 'Chest open, steady breathing, unhurried pace.' },
    videoTitle: 'Speaking with Confidence and Clarity',
    videoDuration: '3 mins 15 secs',
    scenes: [
      { visual: "Mumbling looking down vs upright clear speaking.", narration: "When you look down, words get lost. Upright posture gives you voice power." },
      { visual: "Demonstrating the eyebrow focal point.", narration: "If nervous, look between their eyebrows. It looks natural and feels calm." },
      { visual: "Classroom presentation with smiling finish.", narration: "Speak clearly, smile warmly, and let your voice be heard." }
    ],
    recap: "Practice speaking a 3-sentence introduction with eye contact today.",
    act: {
      title: 'The 60-Second Clear Speaker Mirror Drill',
      obj: 'Practice delivering a 3-sentence introduction with eye contact and clear speech in front of a mirror or caregiver.',
      mats: ['Mirror or family listener', 'Cue card'],
      steps: ['Stand in front of a mirror with relaxed shoulders.', 'Say: "Good morning, my name is [Name]. Today I learned about school bag organization. Thank you for listening."', 'Practice 3 times until your voice is steady and eyes stay focused in the mirror.', 'Perform the introduction for a family member and ask for feedback.'],
      output: 'Demonstration of confident delivery verified by caregiver with a positive checklist.',
      precautions: 'Do not strain your throat shouting; focus on steady projection.',
      alt: 'Record your voice on a phone and listen back to check clarity.'
    },
    scenarioGuided: {
      context: 'During Science class, the teacher asks you to explain what happens to water when it freezes.',
      optimal: 'Stand up straight, look towards the teacher, take a breath, and say: "When water freezes, it turns into solid ice."',
      optReason: 'Clear posture and direct eye contact make your explanation audible and confident.',
      nonOpt1: 'Whisper the answer while looking down at your pencil case.',
      nonOptReason1: 'Whispering makes it impossible for the teacher and class to hear your correct thought.',
      nonOpt2: 'Shout the answer at maximum volume before the teacher calls your name.',
      nonOptReason2: 'Shouting interrupts the classroom peace and is impolite.',
      takeaway: 'Speak with calm, clear volume while looking at the listener.'
    },
    scenarioIndep: {
      context: 'You are introducing yourself to the school librarian to ask where mystery books are shelved.',
      prompt: 'Write out the exact polite sentence you will use, including your name, class, and greeting.',
      rubric: 'Did you include "Excuse me", your name, and a clear polite question?'
    },
    quiz: {
      q: 'What is a helpful trick if looking directly into someone’s eyes makes you feel nervous?',
      context: 'You are presenting an English poem in front of your class.',
      optCorrect: 'Look at the spot right between their eyebrows or the tops of their ears.',
      optWrong1: 'Stare at the ceiling and close your eyes completely.',
      optWrong2: 'Turn your back to the audience and face the blackboard.',
      optWrong3: 'Read the poem from a notebook hiding your entire face.',
      remediation: 'Practice the mirror drill focusing on the forehead center point.'
    },
    rubric: {
      task: 'Deliver a 60-second clear verbal introduction with eye contact and polite tone.',
      mastery: 'Audible volume, unhurried pace, eye contact maintained, polite greeting used.',
      crit1: { name: 'Vocal Clarity & Volume', weight: 40, emerging: 'Inaudible mumble.', developing: 'Audible but rushed.', proficient: 'Clear, steady, audible volume throughout.', exemplary: 'Excellent projection with expressive emphasis.' },
      crit2: { name: 'Eye Contact & Posture', weight: 35, emerging: 'Looking at floor.', developing: 'Occasional glances up.', proficient: 'Consistent eye contact with upright posture.', exemplary: 'Warm eye contact engaging multiple listeners.' },
      crit3: { name: 'Politeness & Structure', weight: 25, emerging: 'No greeting used.', developing: 'Abrupt finish.', proficient: 'Clear greeting, core message, polite finish.', exemplary: 'Poised greeting, engaging delivery, gracious thank you.' }
    },
    refs: [
      "How did your chest feel when you took a calm breath before speaking?",
      "Why do people listen more closely when you make eye contact?",
      "Who is someone in your life who speaks very clearly? What do they do?",
      "How will you practice this when answering questions in class tomorrow?"
    ]
  },
  {
    month: 2, monthTheme: 'Speaking Up & Clear Communication', seq: 2,
    cat: 'life_communication', catLabel: 'Communication & Confidence',
    title: 'Asking for Help When You Do Not Understand a Concept',
    why: 'Asking questions when you are confused is a sign of bravery and intelligence, not weakness. It stops small doubts from becoming big problems.',
    objs: ['Identify when you are stuck or confused during a lesson', 'Raise your hand calmly and wait for the teacher to acknowledge you', 'Phrase your question specifically using "Could you explain step 2 again?"', 'Listen carefully to the explanation and express polite gratitude'],
    scenario: 'Arjun did not understand how to do long division with remainders, but he stayed silent because he thought everyone else understood. When the test arrived, he left the questions blank.',
    expl: 'Nobody knows everything immediately. Even top scientists ask questions every day. When you say, "Excuse me ma’am, I understand step 1, but could you please show step 2 again?", you help yourself and often help classmates who were also shy to ask.',
    steps: ['Notice when your brain feels foggy or a step doesn’t make sense.', 'Raise your hand quietly without calling out or waving frantically.', 'When the teacher calls on you, stand or speak clearly.', 'State exactly what is confusing you rather than saying "I don’t get anything."', 'Say "Thank you, that makes sense now" when they help.'],
    example: {
      title: 'Arjun Asks About Fractions',
      scenario: 'The teacher explains numerator and denominator on the board. Arjun is confused which one goes on top.',
      steps: ['Arjun raises his hand and waits for the teacher to nod.', 'He asks: "Ma’am, could you remind me which number is the numerator—the top or bottom one?"', 'The teacher smiles and says: "N is North (top), D is Down (bottom)."', 'Arjun writes it in his notebook and says: "Thank you ma’am!"'],
      takeaway: 'Specific questions get fast, helpful answers.'
    },
    mistakes: [
      { mistake: 'Saying "I don’t understand anything at all" when only one step is confusing.', correction: 'Point to the exact sentence or step where you got stuck.' },
      { mistake: 'Waiting until the exam day to admit you do not understand a topic.', correction: 'Ask during or immediately after the class while the topic is fresh.' }
    ],
    checklist: ['Did I identify the exact step that confused me?', 'Did I raise my hand politely without interrupting?', 'Did I use a respectful tone: "Could you please explain...?"', 'Did I write down the answer so I remember it?'],
    prompt: 'What was a question you were afraid to ask, and how did asking it actually help you?',
    takeaway: 'Smart learners ask questions early; asking for help is the fastest way to master any new skill.',
    heroDesc: 'Student raising hand calmly in class with a curious, attentive expression.',
    vis1: { title: 'The Question Formulation Ladder', caption: 'I noticed -> I tried -> I got stuck at -> Could you explain step X?' },
    vis2: { title: 'Polite Question Starters', caption: '"Could you please repeat...", "May I ask about...", "I did not follow step 3."' },
    videoTitle: 'How to Ask Smart Questions in Class',
    videoDuration: '3 mins 05 secs',
    scenes: [
      { visual: "Student looking puzzled during math class.", narration: "It's normal to feel stuck. Staying silent lets doubts grow." },
      { visual: "Hand raised calmly without yelling out.", narration: "Raise your hand politely. Be specific about where you got stuck." },
      { visual: "Teacher explaining step with a warm smile.", narration: "Teachers love questions! It shows you are actively thinking." }
    ],
    recap: "Formulate one specific question today about a topic you want to understand better.",
    act: {
      title: 'The Specific Question Roleplay Challenge',
      obj: 'Practice formulating and asking 3 specific questions about everyday tasks or school subjects.',
      mats: ['Notebook', 'Pen'],
      steps: ['Write down 2 things in your schoolwork that feel tricky.', 'Draft a 1-sentence question for each using: "Could you please help me understand...?"', 'Practice asking a parent or teacher one of those questions during study time.', 'Write down their helpful answer in your notebook.'],
      output: 'A recorded question and answer pair verified by a teacher or caregiver.',
      precautions: 'Do not interrupt someone while they are actively speaking; wait for a natural pause.',
      alt: 'Write your question on a sticky note and hand it to your teacher after class.'
    },
    scenarioGuided: {
      context: 'You are working on Math word problem #4 and do not understand whether to add or multiply.',
      optimal: '"Excuse me ma’am, on question 4, I understand the total apples, but should I multiply by boxes or add them?"',
      optReason: 'Naming the exact question and decision point makes helping quick and direct.',
      nonOpt1: 'Slam your pencil down and say "This homework is stupid!"',
      nonOptReason1: 'Anger does not solve confusion and disrespects the learning environment.',
      nonOpt2: 'Wait quietly until homework submission tomorrow and leave it blank.',
      nonOptReason2: 'Ignoring confusion leaves learning gaps that compound over time.',
      takeaway: 'Frame your question with the exact problem number and step.'
    },
    scenarioIndep: {
      context: 'You missed two days of school due to a mild fever and do not know what chapters were taught.',
      prompt: 'Draft the polite message you will say to your class teacher when you return to school.',
      rubric: 'Did you mention your absence politely, ask for the missed chapter titles, and offer to copy notes?'
    },
    quiz: {
      q: 'Which of the following is the most helpful way to ask your teacher for help with a word problem?',
      context: 'You are stuck on Math question number 4.',
      optCorrect: '"Ma’am, I set up the addition, but I am not sure if I should subtract in the second step. Could you check?"',
      optWrong1: '"I can’t do Math, it is impossible."',
      optWrong2: '"Give me the final answer so I can write it down."',
      optWrong3: 'Sit quietly and pretend you finished all the questions.',
      remediation: 'Review the Question Formulation Ladder and practice phrasing specific requests.'
    },
    rubric: {
      task: 'Formulate and present a specific clarification question for a confusing scenario.',
      mastery: 'Points out specific step; uses respectful tone; listens actively to explanation.',
      crit1: { name: 'Specificity of Question', weight: 40, emerging: '"I don\'t get anything."', developing: 'Identifies general subject only.', proficient: 'Pinpoints the exact step or word causing confusion.', exemplary: 'Explains what was tried and frames a precise query.' },
      crit2: { name: 'Politeness & Timing', weight: 35, emerging: 'Interrupts loudly.', developing: 'Asks abruptly without greeting.', proficient: 'Waits for pause, uses polite phrasing.', exemplary: 'Gracious timing, respectful posture, express gratitude.' },
      crit3: { name: 'Note-Taking & Action', weight: 25, emerging: 'Forgets answer immediately.', developing: 'Listens but writes nothing down.', proficient: 'Notes key point in margin.', exemplary: 'Applies solution immediately to solve next problem.' }
    },
    refs: [
      "Why do some students feel shy about asking questions?",
      "How did asking a question help someone else in class who had the same doubt?",
      "What is the difference between asking for the answer vs asking for an explanation?",
      "How will you remind yourself that asking questions shows curiosity?"
    ]
  },
  {
    month: 2, monthTheme: 'Speaking Up & Clear Communication', seq: 3,
    cat: 'life_communication', catLabel: 'Communication & Confidence',
    title: 'Introducing Yourself and Making a New Friend',
    why: 'Knowing how to greet people, share your name, and ask a friendly question helps you make friends in school, neighborhood parks, and sports teams.',
    objs: ['Smile warmly and say a clear greeting like "Hello, I am [Name]"', 'Ask an open, friendly question like "Would you like to play catch?"', 'Listen attentively to the other person’s answer', 'Remember and use their name politely during conversation'],
    scenario: 'A new boy named Ishaan joined the class in July. He stood alone near the playground fence during recess because he did not know anyone yet.',
    expl: 'Starting a friendship only takes three simple things: a friendly smile, your name, and an invitation to do something together. Everyone feels a little shy in a new group; when you take the first step, you make someone’s day brighter.',
    steps: ['Smile and approach the person with a calm, friendly posture.', 'Say: "Hi! My name is [Your Name]. Welcome to our class."', 'Ask a simple question: "What game do you like playing during recess?"', 'Listen carefully to what they say without interrupting.', 'Invite them to join: "We are playing four-square, would you like to join us?"'],
    example: {
      title: 'Rohan Welcomes Ishaan',
      scenario: 'Rohan sees Ishaan standing alone near the swings.',
      steps: ['Rohan walks over with a football and smiles.', 'He says: "Hi, I’m Rohan! Are you new to Section B?"', 'Ishaan says: "Yes, I just moved here from Pune."', 'Rohan says: "Awesome! Do you want to pass the ball with us?"', 'Ishaan’s face lights up and he joins the game.'],
      takeaway: 'A friendly greeting can turn a lonely recess into a lasting friendship.'
    },
    mistakes: [
      { mistake: 'Talking only about yourself without asking the other person anything.', correction: 'Ask questions about what games, books, or sports they enjoy and listen.' },
      { mistake: 'Teasing someone about their accent or new uniform.', correction: 'Always be welcoming and kind; remember how it feels to be the new person.' }
    ],
    checklist: ['Did I smile warmly before speaking?', 'Did I share my name clearly?', 'Did I ask a friendly question about their interests?', 'Did I invite them to participate in an activity?'],
    prompt: 'Can you remember someone who was kind to you on your first day of school? How did it feel?',
    takeaway: 'A warm smile, your name, and a simple invitation can start a great friendship.',
    heroDesc: 'Two children greeting each other with a warm smile on the school sports field.',
    vis1: { title: 'The 3-Step Friendship Bridge', caption: 'Step 1: Smile & Name -> Step 2: Friendly Question -> Step 3: Invitation.' },
    vis2: { title: 'Great Icebreaker Questions', caption: '"What sport do you like?", "Who is your favorite superhero?", "Do you read comics?"' },
    videoTitle: 'The 3-Step Friendship Formula',
    videoDuration: '3 mins 00 secs',
    scenes: [
      { visual: "New student standing alone by playground fence.", narration: "Being new can feel lonely. Taking the first step shows true leadership." },
      { visual: "Demonstrating the 3-step greeting formula.", narration: "Smile, say your name, and invite them to play." },
      { visual: "Group laughing and playing together.", narration: "Friendship starts with a single kind greeting." }
    ],
    recap: "Greet someone you haven't spoken to yet this week with a warm smile.",
    act: {
      title: 'The 3-Step Friendship Handshake Practice',
      obj: 'Practice introducing yourself to a family member, neighbor, or classmate using the 3-step method.',
      mats: ['Partner or mirror'],
      steps: ['Stand 3 feet apart with a smile.', 'Step 1: Greet and state name clearly.', 'Step 2: Ask one friendly question.', 'Step 3: Listen and offer a shared activity.', 'Repeat until it feels natural, relaxed, and cheerful.'],
      output: 'Demonstrated introduction observed and signed off by a caregiver or teacher.',
      precautions: 'Always practice introductions in safe, supervised environments.',
      alt: 'Write a warm welcome card for a new classmate or neighbor.'
    },
    scenarioGuided: {
      context: 'You see a classmate sitting alone during art period whose colored pencils rolled under the bench.',
      optimal: 'Walk over, help pick up the pencils, and say: "Here you go! I’m Dev. What are you drawing today?"',
      optReason: 'Offering practical help followed by a friendly question creates an instant warm connection.',
      nonOpt1: 'Laugh at them for dropping their pencils.',
      nonOptReason1: 'Laughing hurts feelings and makes classmates feel insecure.',
      nonOpt2: 'Walk past without looking or saying anything.',
      nonOptReason2: 'Ignoring opportunities for kindness misses a chance to make a good friend.',
      takeaway: 'Kindness in small moments opens the door to strong friendships.'
    },
    scenarioIndep: {
      context: 'You join a new weekend swimming or karate batch where you do not know anyone.',
      prompt: 'Write what you will say to the student standing next to you before class starts.',
      rubric: 'Did you include a warm greeting, your name, and an interest question about the class?'
    },
    quiz: {
      q: 'What is the best way to invite a new classmate who is standing alone during games period?',
      context: 'You and your friends are choosing teams for dodgeball.',
      optCorrect: 'Walk up with a smile, say "Hi, I’m Zara. We have a spot on our team, would you like to play with us?"',
      optWrong1: 'Stare at them from across the field and whisper to your friend.',
      optWrong2: 'Tell them they can only watch from the sidelines because they came late.',
      optWrong3: 'Ignore them because someone else will probably talk to them.',
      remediation: 'Review the 3-Step Friendship Bridge and practice inviting someone.'
    },
    rubric: {
      task: 'Roleplay introducing yourself to someone new and inviting them to an activity.',
      mastery: 'Warm smile; clear name introduction; open question asked; inclusive invitation offered.',
      crit1: { name: 'Greeting & Non-Verbal Warmth', weight: 40, emerging: 'Cold or distracted posture.', developing: 'Says name but does not smile.', proficient: 'Warm smile, friendly posture, clear introduction.', exemplary: 'Radiant warmth, excellent presence, gracious demeanor.' },
      crit2: { name: 'Active Listening & Inquiry', weight: 35, emerging: 'Talks only about self.', developing: 'Asks a question but interrupts answer.', proficient: 'Listens attentively to response.', exemplary: 'Builds conversation upon their specific interest.' },
      crit3: { name: 'Inclusivity & Follow-Through', weight: 25, emerging: 'Walks away without inviting.', developing: 'Invites hesitantly.', proficient: 'Clear invitation to join games or lunch.', exemplary: 'Introduces new friend to the wider group.' }
    },
    refs: [
      "How do you feel on your first day in a new place?",
      "Why is it harder to introduce yourself than to wait for someone else?",
      "What makes a question 'friendly' rather than intrusive?",
      "Who will you greet with a warm smile tomorrow at school?"
    ]
  }
]
