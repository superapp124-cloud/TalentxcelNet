import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Full 36 Module definitions for Class 4 (Foundation, Ages 9-10)
const C4_TOPICS = [
  // MONTH 1: Daily Personal Routines & Self-Reliance
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
    actTitle: "7-Day Evening School Bag Challenge",
    actObj: "Independently pack your school bag for 7 consecutive school evenings without missing any books.",
    actSteps: ["Pin your class timetable directly above your study desk.", "At 7:30 PM each evening, empty unnecessary papers and yesterday’s books.", "Check tomorrow’s subjects and pack the exact books needed.", "Show your packed bag and checklist to a parent or caregiver for verification."],
    actOutput: "A completed 7-day tracking sheet with 7 caregiver checkmarks and zero forgotten books at school.",
    q: "Why should the heaviest textbooks be placed closest to the back panel of your school backpack?",
    qContext: "You are packing a heavy Math encyclopedia and three thin exercise notebooks.",
    optCorrect: "Because it keeps the weight centered close to your spine, protecting your posture and making the bag feel lighter.",
    optWrong1: "Because it hides big books so teachers cannot see how many you brought.",
    optWrong2: "Because heavy books look better when stored in the deepest part of the backpack.",
    optWrong3: "It makes no difference where you place books inside the bag."
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
    actTitle: 'Study Space Transformation Project',
    actObj: 'Clean, organize, and maintain your primary study area for 5 consecutive days.',
    actSteps: ['Take a quick photo or draw a sketch of your desk right now.', 'Remove all items and wipe the table clean.', 'Sort stationery: keep only working pens and sharpened pencils.', 'Create a dedicated pen stand and paper tray.', 'Perform the 1-minute reset at the end of each study session for 5 days.'],
    actOutput: 'A clean, functional study space maintained over 5 days with caregiver sign-off.',
    q: 'What is the biggest benefit of keeping only one textbook and notebook on your desk at a time?',
    qContext: 'You are working on English grammar exercises.',
    optCorrect: 'It prevents your mind from wandering to other subjects and reduces visual overwhelm.',
    optWrong1: 'It makes your parents think you only have 5 minutes of homework.',
    optWrong2: 'It allows you to eat snacks easily while writing.',
    optWrong3: 'It saves electricity by reducing the shadow of the desk lamp.'
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
    actTitle: 'Wardrobe Wardens Practical Fold Challenge',
    actObj: 'Practice folding 3 shirts and pairing 4 sets of socks, then organize your uniform drawer.',
    actSteps: ['Find a clean, flat surface on your bed or table.', 'Use the 3-step method to fold all 3 shirts.', 'Pair and cuff-lock all 4 sets of socks.', 'Arrange shirts vertically or stacked neatly in your wardrobe drawer.', 'Show your completed drawer to your caregiver.'],
    actOutput: 'A neatly organized drawer section with 3 flat folded shirts and 4 locked sock pairs.',
    q: 'Why should you fold one sock cuff over the other when putting socks away?',
    qContext: 'You are organizing your sock drawer after weekend laundry.',
    optCorrect: 'It locks the pair together so matching socks never get separated or lost in the drawer.',
    optWrong1: 'It makes the socks stretch and grow bigger.',
    optWrong2: 'It changes the color of the socks.',
    optWrong3: 'It is a school rule that teachers inspect every Monday.'
  },

  // MONTH 2: Speaking Up & Clear Communication
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
    actTitle: 'The 60-Second Clear Speaker Mirror Drill',
    actObj: 'Practice delivering a 3-sentence introduction with eye contact and clear speech in front of a mirror or caregiver.',
    actSteps: ['Stand in front of a mirror with relaxed shoulders.', 'Say: "Good morning, my name is [Name]. Today I learned about school bag organization. Thank you for listening."', 'Practice 3 times until your voice is steady and eyes stay focused in the mirror.', 'Perform the introduction for a family member and ask for feedback.'],
    actOutput: 'Demonstration of confident delivery verified by caregiver with a positive checklist.',
    q: 'What is a helpful trick if looking directly into someone’s eyes makes you feel nervous?',
    qContext: 'You are presenting an English poem in front of your class.',
    optCorrect: 'Look at the spot right between their eyebrows or the tops of their ears.',
    optWrong1: 'Stare at the ceiling and close your eyes completely.',
    optWrong2: 'Turn your back to the audience and face the blackboard.',
    optWrong3: 'Read the poem from a notebook hiding your entire face.'
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
    actTitle: 'The Specific Question Roleplay Challenge',
    actObj: 'Practice formulating and asking 3 specific questions about everyday tasks or school subjects.',
    actSteps: ['Write down 2 things in your schoolwork that feel tricky.', 'Draft a 1-sentence question for each using: "Could you please help me understand...?"', 'Practice asking a parent or teacher one of those questions during study time.', 'Write down their helpful answer in your notebook.'],
    actOutput: 'A recorded question and answer pair verified by a teacher or caregiver.',
    q: 'Which of the following is the most helpful way to ask your teacher for help with a word problem?',
    qContext: 'You are stuck on Math question number 4.',
    optCorrect: '"Ma’am, I set up the addition, but I am not sure if I should subtract in the second step. Could you check?"',
    optWrong1: '"I can’t do Math, it is impossible."',
    optWrong2: '"Give me the final answer so I can write it down."',
    optWrong3: 'Sit quietly and pretend you finished all the questions.'
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
    actTitle: 'The 3-Step Friendship Handshake Practice',
    actObj: 'Practice introducing yourself to a family member, neighbor, or classmate using the 3-step method.',
    actSteps: ['Stand 3 feet apart with a smile.', 'Step 1: Greet and state name clearly.', 'Step 2: Ask one friendly question.', 'Step 3: Listen and offer a shared activity.', 'Repeat until it feels natural, relaxed, and cheerful.'],
    actOutput: 'Demonstrated introduction observed and signed off by a caregiver or teacher.',
    q: 'What is the best way to invite a new classmate who is standing alone during games period?',
    qContext: 'You and your friends are choosing teams for dodgeball.',
    optCorrect: 'Walk up with a smile, say "Hi, I’m Zara. We have a spot on our team, would you like to play with us?"',
    optWrong1: 'Stare at them from across the field and whisper to your friend.',
    optWrong2: 'Tell them they can only watch from the sidelines because they came late.',
    optWrong3: 'Ignore them because someone else will probably talk to them.'
  },

  // MONTH 3: Understanding Money Basics
  {
    month: 3, monthTheme: 'Understanding Money Basics', seq: 1,
    cat: 'life_money_management', catLabel: 'Money Management & Financial Literacy',
    title: 'Identifying Indian Coins and Currency Notes (₹1 to ₹500)',
    why: 'Recognizing currency notes, their security features, and values helps you understand prices and handle money responsibly.',
    objs: ['Identify Indian coins: ₹1, ₹2, ₹5, ₹10, and ₹20', 'Identify Mahatma Gandhi new series currency notes: ₹10, ₹20, ₹50, ₹100, ₹200, ₹500', 'Recognize key features: Ashoka Pillar emblem, Reserve Bank of India text, rupee symbol ₹', 'Understand that higher number values represent greater purchasing power'],
    scenario: 'Samar was sent to the neighborhood bakery with a ₹100 note to buy a loaf of bread for ₹40. He did not know how to verify if the note was ₹100 or ₹10.',
    expl: 'Money in India is issued by the Reserve Bank of India (RBI). Each coin and note has a specific color, number, and size. Knowing your currency protects you from making counting errors and helps you respect hard-earned money.',
    steps: ['Look at the large numeral printed on the front and back of the note.', 'Notice the color: ₹10 is brown, ₹20 is greenish-yellow, ₹50 is cyan blue, ₹100 is lavender, ₹200 is bright orange, ₹500 is stone grey.', 'Find the Mahatma Gandhi portrait in the center and the Rupee symbol ₹ next to the number.', 'Check coins by reading the number stamped on the front and observing the thickness and edges.', 'Never write on, tear, or fold currency notes into tight balls.'],
    example: {
      title: 'Sorting Notes in Samar’s Wallet',
      scenario: 'Samar has one ₹100 note, one ₹50 note, two ₹20 notes, and three ₹5 coins.',
      steps: ['Samar stacks the notes in order of value: ₹100 at the back, ₹50 in the middle, ₹20s in front.', 'He counts the coins: 3 coins of ₹5 = ₹15.', 'He adds the notes: ₹100 + ₹50 + ₹20 + ₹20 = ₹190.', 'Total money = ₹190 + ₹15 = ₹205.'],
      takeaway: 'Sorting money by value makes counting simple, fast, and accurate.'
    },
    mistakes: [
      { mistake: 'Confusing a ₹10 note with a ₹50 note in dim light.', correction: 'Always check the printed number numeral and color carefully under good lighting.' },
      { mistake: 'Writing pen marks or names on currency notes.', correction: 'It is illegal to deface Indian currency notes; keep them flat, clean, and dry.' }
    ],
    checklist: ['Can I identify the printed number on both sides?', 'Do I recognize the color of ₹10, ₹50, ₹100, ₹500 notes?', 'Did I handle the notes gently without crumpling?', 'Do I understand which note has higher purchasing value?'],
    prompt: 'Why do you think currency notes have different colors and sizes for each value?',
    takeaway: 'Knowing Indian coins and notes helps you shop accurately and treat money with care.',
    actTitle: 'Play-Money Currency Sorting Workshop',
    actObj: 'Correctly identify, sort, and calculate the total value of a sample set of coins and notes.',
    actSteps: ['Gather 5 different denominations of play coins and notes (or inspect clean currency with an adult).', 'Arrange them from smallest value to largest value.', 'Identify the color and numeral on each note.', 'Calculate the combined total of the collection.'],
    actOutput: 'A completed currency identification card signed off by an adult supervisor.',
    q: 'Which color is the new Mahatma Gandhi series ₹100 currency note?',
    qContext: 'You are helping your mother check change from the grocery store.',
    optCorrect: 'Lavender (light purple)',
    optWrong1: 'Bright green',
    optWrong2: 'Dark black',
    optWrong3: 'Bright red'
  },
  {
    month: 3, monthTheme: 'Understanding Money Basics', seq: 2,
    cat: 'life_money_management', catLabel: 'Money Management & Financial Literacy',
    title: 'Calculating Simple Change at a Local Neighborhood Store',
    why: 'Checking your change ensures you receive the correct money back when paying with a larger currency note.',
    objs: ['Identify the cost of an item from its price tag or shelf label', 'Calculate change by subtracting item cost from the money given', 'Count the change returned before leaving the shop counter', 'Politely inform the shopkeeper if the change returned is incorrect'],
    scenario: 'Tanvi bought a notebook for ₹35 at the stationery shop and handed the shopkeeper a ₹50 note. The shopkeeper handed back a ₹10 coin. Tanvi put it in her pocket and walked out without checking.',
    expl: 'When you buy something, the change you get back should equal: Money Given minus Cost of Item. In Tanvi’s case: ₹50 - ₹35 = ₹15. The shopkeeper made an accidental mistake and gave ₹10 instead of ₹15. Checking before stepping away protects your money.',
    steps: ['Check the price of the item before taking it to the counter.', 'Calculate in your head or on fingers: Change = Cash Given - Price.', 'Hand the cash to the shopkeeper and wait calmly at the counter.', 'Count the coins and notes in your palm before putting them in your pocket.', 'If there is a mistake, say politely: "Excuse me bhaiya, I gave ₹50 for a ₹35 notebook, so change should be ₹15."'],
    example: {
      title: 'Tanvi Checks Her Change',
      scenario: 'Tanvi pays ₹50 for a ₹35 notebook.',
      steps: ['Tanvi counts up from ₹35 to ₹50: 35 + 5 = 40, 40 + 10 = 50. Total change needed is ₹15.', 'The shopkeeper hands her a ₹10 coin and a ₹5 coin.', 'Tanvi counts: 10 + 5 = 15.', 'She smiles, says "Thank you!", and pockets the change safely.'],
      takeaway: 'Counting up from the price to the amount paid is the quickest way to verify change.'
    },
    mistakes: [
      { mistake: 'Rushing out of the shop and counting change on the street.', correction: 'Always count your change right at the shop counter before stepping outside.' },
      { mistake: 'Getting angry or shouting if the change is wrong.', correction: 'Shopkeepers serve many people; point out mistakes calmly and politely.' }
    ],
    checklist: ['Do I know the exact price of the item?', 'Did I calculate the expected change before paying?', 'Did I count the coins and notes in my hand?', 'Did I say thank you to the shopkeeper?'],
    prompt: 'Why is it better to check change at the counter rather than after reaching home?',
    takeaway: 'Always calculate change before paying and count it in your palm before leaving the counter.',
    actTitle: 'Mock Kitchen Grocery Checkout',
    actObj: 'Practice buying 3 kitchen items using play money and calculating correct change in 3 rounds.',
    actSteps: ['Label 3 items with prices: Soap ₹25, Biscuits ₹30, Pen ₹15.', 'Use a ₹50 or ₹100 note to "buy" each item.', 'Calculate the exact change required in your notebook.', 'Have a family member play shopkeeper and verify your calculations.'],
    actOutput: 'Completed math change calculation sheet showing 3 correct transactions.',
    q: 'If you buy an eraser for ₹8 and give the shopkeeper a ₹20 note, how much change should you receive?',
    qContext: 'Calculating change at the school stationery counter.',
    optCorrect: '₹12 (one ₹10 coin and one ₹2 coin)',
    optWrong1: '₹8',
    optWrong2: '₹15',
    optWrong3: '₹2'
  },
  {
    month: 3, monthTheme: 'Understanding Money Basics', seq: 3,
    cat: 'life_money_management', catLabel: 'Money Management & Financial Literacy',
    title: 'Needs vs. Wants: Sorting Grocery and Toy Choices',
    why: 'Understanding the difference between what you truly need to live and learn versus what is nice to have helps you make smart spending choices.',
    objs: ['Define a "Need": essential for health, safety, food, shelter, and school', 'Define a "Want": fun or desirable, but you can live comfortably without it', 'Categorize 10 common household and school items into Needs or Wants', 'Recognize that buying needs first prevents money shortages later'],
    scenario: 'Aditya had ₹100 given to him for school notebooks. At the shop, he saw a flashy superhero spinning top for ₹90. He bought the top, but then could not buy the notebook required for class.',
    expl: 'Money is limited, but our desires are endless. A "Need" is something you cannot do without: drinking water, basic food, school uniform, and notebooks. A "Want" is something fun: video games, fancy stickers, and extra toys. Smart people buy their needs first, and save for wants later.',
    steps: ['Before buying anything, pause and ask yourself: "What will happen if I don’t buy this today?"', 'If the answer is "I will be hungry, sick, or cannot do schoolwork", it is a NEED.', 'If the answer is "I just want it because it looks fun", it is a WANT.', 'Check if you have fulfilled all your essential needs first.', 'If it is a want, decide if you can save for it over time instead of buying on impulse.'],
    example: {
      title: 'Aditya’s Shopping Cart Sort',
      scenario: 'Aditya has ₹200. He lists: School notebook (₹50), Healthy apple (₹30), Superhero action figure (₹180).',
      steps: ['Aditya marks: Notebook = NEED (for school).', 'Apple = NEED (for health and hunger).', 'Action figure = WANT (fun toy).', 'Total needs = ₹50 + ₹30 = ₹80.', 'He buys his needs for ₹80 and saves the remaining ₹120 toward the toy in his savings jar.'],
      takeaway: 'Needs come first. Leftover money can be saved toward exciting wants.'
    },
    mistakes: [
      { mistake: 'Calling everything you really, really like a "Need".', correction: 'Wanting something strongly does not make it a life requirement.' },
      { mistake: 'Spending lunch or bus money on candy or collectible cards.', correction: 'Never spend money allocated for safety or food on entertainment.' }
    ],
    checklist: ['Is this item necessary for school, health, or safety?', 'Can I still learn and stay healthy without it today?', 'Have all my essential needs been paid for first?', 'Am I buying this because of an impulse or a thoughtful plan?'],
    prompt: 'Think of one item you bought recently. Was it a Need or a Want? Do you still use it today?',
    takeaway: 'Take care of your needs first; saving for your wants makes enjoying them even sweeter.',
    actTitle: 'The Needs vs. Wants Home Audit',
    actObj: 'Audit 10 items in your bedroom or school bag and categorize each into Needs or Wants.',
    actSteps: ['Draw a two-column chart: Column 1 = Needs, Column 2 = Wants.', 'List 5 items from your school bag and 5 items from your room.', 'Write a 1-sentence reason next to each classification.', 'Discuss your chart with a parent to see if they agree with your sorting.'],
    actOutput: 'A completed 10-item Needs vs. Wants classification chart signed by a caregiver.',
    q: 'Which of the following items is an essential NEED for a Class 4 student?',
    qContext: 'Preparing for the new school term.',
    optCorrect: 'A geometry ruler and pencil for drawing diagrams in Math',
    optWrong1: 'A mechanical pencil that lights up and plays music',
    optWrong2: 'A pack of 50 cartoon sticker sheets',
    optWrong3: 'A third pair of sports sneakers in a bright neon color'
  }
]

console.log(`Writing Class 4 curriculum modules... Total base definitions: ${C4_TOPICS.length}`)
