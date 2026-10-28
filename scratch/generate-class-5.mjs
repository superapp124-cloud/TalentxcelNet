import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { formatModuleTs } from './module-template.mjs'
import { C5_TOPICS as C5_MONTH_1 } from './author-c5.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('Building full Class 5 curriculum (36 modules)...')

// Define Months 2 through 12 for Class 5
const C5_MONTHS_2_12 = [
  // MONTH 2: Expressive Speaking, Asking Questions & Active Listening
  {
    month: 2, monthTheme: 'Expressive Speaking, Asking Questions & Active Listening', seq: 1,
    cat: 'life_communication', catLabel: 'Communication & Confidence',
    title: 'Speaking in Full Sentences When Answering Teachers in Class',
    why: 'Answering with one mumbled word hides your intelligence. Speaking in complete, structured sentences commands respect, boosts grades, and builds public speaking confidence.',
    objs: ['Stand up straight and make eye contact with the teacher before speaking', 'Answer using the Question-Stem method: turn the question into your opening sentence', 'Speak with clear projection and steady pacing without mumbling', 'Conclude with a clear finishing point rather than trailing off'],
    scenario: 'During Science class, Ms. Sharmila asked: "Dev, why do desert camels have wide padded feet?" Dev slouched, looked down at his sneakers, and mumbled: "Sand... walking." Nobody in the third row could hear him.',
    expl: 'Your voice is your most powerful tool. When you give half an answer, people assume you only half understand. Using the Question-Stem method (echoing the question in your answer) gives your brain two seconds to organize a brilliant, complete sentence.',
    steps: ['When called on, stand upright or sit tall and make direct eye contact with the teacher.', 'Take one silent breath through your nose before opening your mouth.', 'Echo the question stem: "Desert camels have wide padded feet because..."', 'State your core factual point clearly at medium volume.', 'End firmly with your period: "...which prevents them from sinking into soft hot sand."'],
    example: { title: 'Dev’s Sentence Upgrade', scenario: 'Teacher asks: "Dev, what is evaporation?"', steps: ['Dev stands tall.', 'Echoes: "Evaporation is the natural process where..."', 'Completes: "...liquid water turns into invisible water vapor when heated by the sun."', 'Teacher praises his clear scientific articulation.'], takeaway: 'Full sentences make you sound thoughtful, intelligent, and confident.' },
    mistakes: [
      { mistake: 'Blurting out a single fragmented word while looking at the floor.', correction: 'Stand tall, make eye contact, and complete the full subject-verb sentence.' },
      { mistake: 'Ending sentences with a questioning tone ("...right? ...maybe?").', correction: 'End sentences with a firm, calm downward tone of factual certainty.' }
    ],
    checklist: ['Did I stand or sit tall?', 'Did I use the Question-Stem method?', 'Was my voice audible to the back row?', 'Did I finish with a clear final point?'],
    prompt: 'How did speaking in a full sentence change how other students listened to you in class?',
    takeaway: 'Full thoughts deserve full sentences: stand tall, speak clearly, and let your brilliance shine.',
    heroDesc: 'Fifth-grade student standing proudly beside his classroom desk, answering teacher with clear eye contact and posture.',
    vis1: { title: 'The Question-Stem Bridge', caption: 'Question: "Why do leaves turn green?" -> Bridge: "Leaves turn green because chlorophyll..."' },
    vis2: { title: 'The 3 P’s of Vocal Presence', caption: '1. Posture (Spine straight), 2. Projection (Aim voice at back wall), 3. Pause (Breathe before speaking).' },
    videoTitle: 'Own the Classroom: Speaking in Full Sentences', videoDuration: '3 mins 10 secs',
    scenes: [
      { visual: "Student mumbling into chest vs student standing tall with clear voice.", narration: "Mumbling hides your intelligence. Your voice deserves to be heard." },
      { visual: "Demonstrating the Question-Stem Bridge on classroom blackboard.", narration: "Echo the question into your opening phrase. It buys you two seconds to think." },
      { visual: "Teacher nodding in deep appreciation as student finishes firmly.", narration: "Speak in complete sentences. Watch how people treat your ideas with respect." }
    ],
    recap: "Practice answering at least 2 questions in full sentences in school tomorrow.",
    act: {
      title: 'Full Sentence Family Dinner Challenge',
      obj: 'Answer all dinner table questions in complete sentences with Question-Stems for 3 days.',
      mats: ['Dinner conversation topic cards', 'Tracker card'],
      steps: ['At dinner, when asked how your day was, begin: "My day at school was productive because..."', 'Never give one-word answers like "fine" or "good".', 'Maintain calm eye contact with the speaker.', 'Ask family members questions using the same format.'],
      output: 'A signed 3-day full-sentence conversation log verified by a parent.',
      precautions: 'Do not use an aggressive or robotic tone; remain natural, friendly, and expressive.',
      alt: 'Record 3 practice answers on a voice recorder and listen back for vocal clarity.'
    },
    scenarioGuided: {
      context: 'History teacher asks: "Rohan, what was the capital city of Emperor Akbar?"',
      optimal: 'Stand up and answer: "The capital city of Emperor Akbar was Fatehpur Sikri during that period of his reign."',
      optReason: 'Uses the question stem and delivers an accurate, sophisticated complete answer.',
      nonOpt1: 'Mumble: "Fatehpur" while staring at shoes.',
      nonOptReason1: 'Shows low confidence and sounds rushed or uninterested.',
      nonOpt2: 'Shout: "Obviously Fatehpur Sikri, everyone knows that!"',
      nonOptReason2: 'Arrogant tone that disrupts classroom respect.',
      takeaway: 'Calm, polite, complete sentence delivery commands universal respect.'
    },
    scenarioIndep: {
      context: 'The school principal visits your classroom and asks you: "What are you studying in Geography today?"',
      prompt: 'Write the exact full sentence you will use to answer her clearly.',
      rubric: 'Answered: "In Geography today, we are learning how river deltas form through sediment deposition."'
    },
    quiz: {
      q: 'What is the "Question-Stem" technique in classroom speaking?',
      context: 'Technique for answering academic questions in full sentences.',
      optCorrect: 'Turning the teacher’s question into the first half of your complete answer sentence.',
      optWrong1: 'Asking the teacher a difficult question back.',
      optWrong2: 'Refusing to answer until three other students raise hands.',
      optWrong3: 'Memorizing the entire textbook chapter word for word.',
      remediation: 'Echo the question stem to create a smooth, intelligent opening for your response.'
    },
    rubric: {
      task: 'Deliver three spontaneous oral responses to academic questions using Question-Stem formulation.',
      mastery: 'Immediate posture adjustment, Question-Stem utilized, clear vocal projection, firm conclusion.',
      crit1: { name: 'Sentence Structure & Stem Use', weight: 40, emerging: 'Fragmented 1-2 words.', developing: 'Full sentence without stem.', proficient: 'Seamless Question-Stem incorporation.', exemplary: 'Sophisticated syntax and vocabulary enhancement.' },
      crit2: { name: 'Vocal Projection & Eye Contact', weight: 35, emerging: 'Mumbles; downcast eyes.', developing: 'Quiet voice.', proficient: 'Projected to entire room; steady eye contact.', exemplary: 'Poised oratorical presence and warm modulation.' },
      crit3: { name: 'Composure & Pacing', weight: 25, emerging: 'Rushes or panics.', developing: 'Hesitant pauses.', proficient: 'Calm pacing with natural breathing pauses.', exemplary: 'Imperturbable classroom speaking confidence.' }
    },
    refs: [
      'Why do adults often take people who speak in full sentences more seriously?',
      'How does taking a silent breath before speaking help stop you from saying "um"?',
      'What was the hardest question you had to answer in class this month?',
      'How will this skill help you when you give your first big stage presentation?'
    ]
  },
  {
    month: 2, monthTheme: 'Expressive Speaking, Asking Questions & Active Listening', seq: 2,
    cat: 'life_communication', catLabel: 'Communication & Confidence',
    title: 'Asking Polite Clarifying Questions When an Assignment Prompt is Unclear',
    why: 'Guessing what a homework prompt means leads to wasted hours doing the wrong work. Asking polite clarifying questions demonstrates maturity and saves time.',
    objs: ['Recognize the moment of confusion rather than pretending to understand', 'Wait for the teacher to pause or raise your hand politely during question time', 'Formulate a specific question: "Could you clarify whether we should write in points or a paragraph?"', 'Take quick notes on the teacher’s answer in your diary immediately'],
    scenario: 'Mr. Verma assigned: "Write an account of our museum visit for Friday." Pooja didn’t know whether to write a personal story, a factual list of exhibits, or draw a poster. She was afraid to ask, spent 4 hours drawing a poster, only to find the class was supposed to write an essay.',
    expl: 'Asking a clarifying question is NOT a sign of weakness—it is a sign of a sharp, serious student! Smart professionals ask questions constantly so they don’t waste days on the wrong direction. A specific, polite question takes 10 seconds and prevents hours of wasted effort.',
    steps: ['Notice when a homework prompt feels vague (e.g. format, length, due date).', 'Wait for the teacher to finish explaining, then raise your hand calmly.', 'Use the Clarification Formula: "Excuse me, Sir/Ma’am, could you please clarify [specific detail]?"', 'Listen carefully to the response without interrupting.', 'Jot the key requirement directly into your school diary with a star mark.'],
    example: { title: 'Pooja’s Clarification Triumph', scenario: 'Teacher assigns: "Prepare 10 facts on Mangrove forests."', steps: ['Pooja raises hand politely.', 'Asks: "Ma’am, should these 10 facts be written in our notebook or on chart paper?"', 'Teacher replies: "In your homework notebook, bullet points."', 'Pooja notes it in diary and finishes in 20 minutes.'], takeaway: 'One ten-second question saves four hours of guesswork.' },
    mistakes: [
      { mistake: 'Staying silent and hoping your friend knows what to do after school.', correction: 'Friends often guess too; ask the teacher directly while you are still in the classroom.' },
      { mistake: 'Interrupting the teacher in the middle of a sentence to shout your question.', correction: 'Always wait until the teacher finishes speaking and invites questions.' }
    ],
    checklist: ['Did I identify the exact confusing point?', 'Did I raise my hand respectfully?', 'Did I ask a specific question rather than "I don’t get it"?', 'Did I write the answer in my diary?'],
    prompt: 'Have you ever done homework the wrong way because you were shy to ask? How can you prevent that tomorrow?',
    takeaway: 'Never guess what is expected: ask polite, specific questions and aim with total clarity.',
    heroDesc: 'Student raising hand politely in a brightly lit classroom, smiling as the teacher gestures to him.',
    vis1: { title: 'The 3-Part Clarifying Question', caption: '1. Polite Address -> 2. The Specific Ambiguity -> 3. The Two Choices (e.g. chart or notebook?).' },
    vis2: { title: 'Vague vs Specific Questions', caption: 'BAD: "I don’t get it." GOOD: "Could you clarify if we need 5 sentences per paragraph or 3?"' },
    videoTitle: 'The Art of the Clarifying Question', videoDuration: '3 mins 05 secs',
    scenes: [
      { visual: "Student agonizing at home desk over ambiguous homework prompt.", narration: "Guessing what your teacher wants is a recipe for frustration and wasted hours." },
      { visual: "Raising hand calmly and speaking the clarification formula.", narration: "Raise your hand. Ask with precision. A two-second question illuminates the whole path." },
      { visual: "Writing crisp instructions into school planner.", narration: "Clear instructions mean fast homework and zero guesswork." }
    ],
    recap: "Ask one polite clarifying question whenever an assignment feels ambiguous this week.",
    act: {
      title: 'Precision Questioning Practice',
      obj: 'Identify an ambiguous instruction in daily life and formulate 3 precise clarifying questions.',
      mats: ['School assignment sheet or recipe prompt', 'Diary'],
      steps: ['Read an assignment prompt carefully.', 'Identify 2 things not fully explained (e.g. word count, colors allowed).', 'Draft 2 precise clarifying questions using the 3-part formula.', 'Ask teacher or caregiver and record answer.'],
      output: 'A written record of the ambiguous prompt, the question asked, and the answer received.',
      precautions: 'Do not ask questions already explicitly written on the board; read first, then ask.',
      alt: 'Role-play with a parent: parent gives vague chore instructions; child asks clarifying questions.'
    },
    scenarioGuided: {
      context: 'Science teacher says: "Create a model of an animal cell by Monday."',
      optimal: 'Raise hand and ask: "Sir, could you please clarify if 2D drawings on cardboard are acceptable, or if it must be a 3D clay model?"',
      optReason: 'Pinpoints the exact medium and dimensions expected, preventing costly mistakes.',
      nonOpt1: 'Say nothing and buy a ₹1,000 plastic kit from a commercial shop.',
      nonOptReason1: 'Wastes money and fails to learn the craft independently.',
      nonOpt2: 'Complain loudly to your desk partner that the teacher is confusing.',
      nonOptReason2: 'Negativity solves nothing and distracts the class.',
      takeaway: 'Clarify formats and materials before spending time or family money.'
    },
    scenarioIndep: {
      context: 'Your art teacher tells the class: "Bring leaves tomorrow for printing."',
      prompt: 'Write down two specific clarifying questions you would ask to bring the right materials.',
      rubric: 'Asked: 1. Fresh green leaves or dry fallen leaves? 2. What size leaves work best for the paper?'
    },
    quiz: {
      q: 'Which of the following is the most effective clarifying question to ask a teacher about an assignment?',
      context: 'Clarifying expectations for a Social Studies project.',
      optCorrect: '"Ma’am, could you please clarify whether our 500-word essay should be handwritten or typed?"',
      optWrong1: '"I don’t understand anything you just said."',
      optWrong2: '"Why do we have so much homework this week?"',
      optWrong3: '"Can you just tell me the answers to question four?"',
      remediation: 'Frame questions specifically around format, length, or criteria rather than vague helplessness.'
    },
    rubric: {
      task: 'Formulate and deliver a polite clarifying question in response to an intentionally ambiguous assignment prompt.',
      mastery: 'Identifies ambiguity, raises hand with decorum, uses specific formulation, records answer.',
      crit1: { name: 'Ambiguity Spotting', weight: 40, emerging: 'Does not notice ambiguity.', developing: 'Notices confusion but cannot articulate it.', proficient: 'Pinpoints specific missing parameters (format, length, date).', exemplary: 'Anticipates project constraints and edge cases.' },
      crit2: { name: 'Formulation & Politeness', weight: 35, emerging: 'Blunt or demanding.', developing: 'Vague inquiry.', proficient: 'Polite 3-part clarifying question delivered with poise.', exemplary: 'Flawless diplomatic inquiry framing.' },
      crit3: { name: 'Documentation & Follow-Through', weight: 25, emerging: 'Forgets answer immediately.', developing: 'Tries to remember mentally.', proficient: 'Records clarification directly into school diary.', exemplary: 'Shares clarification clearly with study group.' }
    },
    refs: [
      'Why are some students afraid to ask questions in front of the whole class?',
      'How does asking questions actually help other classmates who were also confused?',
      'What was the best clarifying question you ever asked a teacher?',
      'How will asking clear questions help you when you start working in teams later in life?'
    ]
  },
  {
    month: 2, monthTheme: 'Expressive Speaking, Asking Questions & Active Listening', seq: 3,
    cat: 'life_critical_thinking', catLabel: 'Critical Thinking & Everyday Problem-Solving',
    title: 'Distinguishing Between an Objective Fact and a Personal Opinion',
    why: 'Believing opinions as facts leads to bad decisions, heated arguments, and falling for marketing traps. Knowing the difference creates sharp, independent thinkers.',
    objs: ['Define a Fact: a statement that can be proven true or false with evidence, measurements, or records', 'Define an Opinion: a personal feeling, belief, or preference that cannot be objectively measured', 'Identify opinion clue words: "best", "worst", "delicious", "boring", "ugly", "cool"', 'Analyze 5 everyday statements and classify them accurately as Fact or Opinion'],
    scenario: 'During lunch break, Samar argued furiously with Kabir: "Cricket is the greatest sport in human history, that is a 100% scientific fact!" Kabir shouted back: "No, football is the best, you don’t know anything!" The argument almost turned into a playground scuffle.',
    expl: 'Facts and opinions live in completely different worlds! "The Earth orbits the Sun" is a FACT—you can verify it with telescopes and mathematics. "Mango ice cream is delicious" is an OPINION—it feels true to you, but someone who hates mangoes has a different preference. When you mistake your opinion for a universal fact, you argue over nothing!',
    steps: ['Read or listen to the statement carefully.', 'Ask the Verification Test: "Can this be measured with a ruler, scale, calendar, or camera?"', 'If YES, it is an OBJECTIVE FACT.', 'If it depends on personal feelings, taste buds, or values, it is a PERSONAL OPINION.', 'Look for opinion trigger words like: "best", "worst", "should", "fun", "scary".'],
    example: { title: 'Samar & Kabir’s Fact-Check Reset', scenario: 'Classmates analyze their lunch dispute.', steps: ['Statement A: "Cricket has 11 players per team." -> Can be verified by official rules -> FACT.', 'Statement B: "Cricket is more fun than football." -> Depends on personal joy -> OPINION.', 'Boys realize they have different opinions and shake hands.', 'Play joint game peacefully.'], takeaway: 'Facts build agreement; opinions deserve polite diversity.' },
    mistakes: [
      { mistake: 'Believing that an opinion is a fact just because millions of people agree with it.', correction: 'Popularity does not make an opinion a fact; facts require objective empirical proof.' },
      { mistake: 'Arguing aggressively that someone’s personal preference is "wrong".', correction: 'Preferences cannot be right or wrong; respect that different people enjoy different things.' }
    ],
    checklist: ['Can this statement be tested or measured?', 'Does it contain words like "best" or "boring"?', 'Would everyone in the world agree if they checked the evidence?', 'Did I separate my feelings from the proof?'],
    prompt: 'Think of something you love that a friend dislikes. Can both of your opinions be valid at the same time?',
    takeaway: 'Facts can be proven with evidence; opinions are personal tastes. Wise minds respect the difference.',
    heroDesc: 'Two students looking at a blackboard divided into two columns: FACTS (evidence-based) and OPINIONS (preference-based).',
    vis1: { title: 'The Fact vs Opinion Filter', caption: 'FACT: Provable, measurable, universal. OPINION: Personal, emotional, subjective.' },
    vis2: { title: 'Warning Signal Words', caption: 'Watch out for: Best, Worst, Terrible, Amazing, Should, Always, Never.' },
    videoTitle: 'Fact or Opinion: Train Your Critical Eye', videoDuration: '3 mins 15 secs',
    scenes: [
      { visual: "Two friends screaming over which superhero is 'best'.", narration: "Why do people get into heated fights over things that can never be proven?" },
      { visual: "Applying the scientific measuring tape test to statements.", narration: "Can you measure it with a ruler, scale, or camera? Then it's a fact." },
      { visual: "Friends smiling and nodding as they accept each other's different tastes.", narration: "Share your opinions with joy, but anchor your mind in verifiable facts." }
    ],
    recap: "Identify 3 facts and 3 opinions in today's newspaper or magazine article.",
    act: {
      title: 'The Headline Fact-Check Sifter',
      obj: 'Classify 10 statements from a school textbook or children’s magazine into Facts and Opinions.',
      mats: ['Newspaper or magazine article', 'Two highlighters (Yellow for Facts, Blue for Opinions)', 'Pencil'],
      steps: ['Select a 1-page article on animals or sports.', 'Highlight verifiable facts in yellow.', 'Highlight author opinions in blue.', 'Write the proof method next to 3 yellow facts.'],
      output: 'A color-coded article with an analysis table detailing 5 facts and 5 opinions.',
      precautions: 'Do not mark library books; use newspapers, old magazines, or printed sheets.',
      alt: 'Write 3 facts about your school and 3 personal opinions about your favorite subject.'
    },
    scenarioGuided: {
      context: 'An advertisement claims: "Speedy Sneakers are the most comfortable shoes in the universe and have shock-absorbing foam soles."',
      optimal: 'Identify that "shock-absorbing foam soles" is a verifiable fact, while "most comfortable in the universe" is an advertising opinion.',
      optReason: 'Skillfully separates the product’s physical component from marketing hype.',
      nonOpt1: 'Believe the entire sentence is an unshakeable scientific fact.',
      nonOptReason1: 'Falls victim to marketing exaggeration.',
      nonOpt2: 'Claim the entire sentence is a fake lie with no truth whatsoever.',
      nonOptReason2: 'Fails to acknowledge verifiable physical features.',
      takeaway: 'Advertisements blend facts and opinions together; untangle them carefully.'
    },
    scenarioIndep: {
      context: 'Your classmate says: "Class 5 Math is the hardest and most painful subject ever taught in any school."',
      prompt: 'Explain whether this is a fact or an opinion, and how you will respond politely.',
      rubric: 'Identified as an opinion because difficulty is subjective; offered to study together politely.'
    },
    quiz: {
      q: 'Which of the following statements is an OBJECTIVE FACT rather than an opinion?',
      context: 'Analyzing statements for scientific and logical validity.',
      optCorrect: '"Water freezes into solid ice at zero degrees Celsius at sea level."',
      optWrong1: '"Winter is the most wonderful season of the year."',
      optWrong2: '"Snowy days are much more fun than rainy afternoons."',
      optWrong3: '"Everyone should go ice skating during school holidays."',
      remediation: 'Freezing temperature can be measured with a thermometer; the others are personal emotional preferences.'
    },
    rubric: {
      task: 'Analyze an informational text, accurately sorting statements into facts and opinions with justification.',
      mastery: '100% sorting accuracy, articulates proof criteria, identifies opinion signal words, explains nuance.',
      crit1: { name: 'Classification Accuracy', weight: 40, emerging: 'Confuses feelings with facts.', developing: '1-2 errors on subtle claims.', proficient: '100% correct sorting across 10 diverse statements.', exemplary: 'Spots mixed statements with partial fact and partial opinion.' },
      crit2: { name: 'Evidentiary Justification', weight: 35, emerging: 'Cannot explain why.', developing: 'Says "it just is".', proficient: 'Explains specific measurement or verification method for facts.', exemplary: 'Cites empirical methodologies and subjective value triggers.' },
      crit3: { name: 'Nuance & Respect', weight: 25, emerging: 'Dismisses opposing opinions rudely.', developing: 'Accepts differences reluctantly.', proficient: 'Respects opinions while defending factual accuracy.', exemplary: 'Fosters civil dialogue bridging emotional preferences.' }
    },
    refs: [
      'Why do advertisements deliberately mix facts with opinions?',
      'How does recognizing opinions prevent arguments with friends during games?',
      'Can an opinion ever become a fact over time? Why or why not?',
      'How can you verify a scientific fact if someone challenges it?'
    ]
  }
]
