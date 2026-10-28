# scratch/c9_months_5_to_8.py

months_5_to_8 = [
    # MONTH 5: Complex Decision-Making, Heuristics & First-Principles Thinking
    {
        "month": 5, "theme": "Mental Models, First-Principles Reasoning & Probability", "seq": 1,
        "cat": "life_critical_thinking", "cat_label": "Critical Thinking & Everyday Problem-Solving",
        "title": "First-Principles Thinking: Breaking Real-World Problems Down to Fundamental Truths",
        "why": "Most adolescents and adults think by 'analogy'—copying what everyone else does with minor variations ('That's how it has always been done'). In Class 9, academic physics, mathematics, and real-life innovation require 'First-Principles Thinking'—boiling a problem down to its most fundamental physical or logical truths and reasoning upwards from there.",
        "objs": [
            "Distinguish between 'Reasoning by Analogy' (copying conventions) versus 'Reasoning from First Principles' (building from foundational truths)",
            "Apply the Cartesian Method of Doubt to strip away assumptions, traditions, and unverified rumors",
            "Deconstruct a complex practical problem (e.g. building a low-cost solar oven or organizing a zero-budget exhibition) to atomic physics and raw materials",
            "Formulate innovative, non-conventional solutions that bypass expensive commercial gatekeepers"
        ],
        "scenario": "Aman's school robotics club wanted to build an automated greenhouse watering system. The commercial kits cost Rs 25,000, which the club could not afford. The team leader gave up: 'We can't do it because commercial agricultural automation is too expensive.' Aman sat down with a paper: 'Wait. What is a watering system at the fundamental level of physics?'",
        "expl": "Thinking by analogy is like a chef who only follows a recipe book; if an ingredient is missing, they are helpless! Thinking from First Principles is like a master chemist who understands the molecular flavor compounds: they can invent delicious new dishes from whatever raw ingredients are on the table! Famously used by Aristotle, René Descartes, and modern innovators like Elon Musk, First-Principles Thinking asks: 'What do we know is 100% TRUE at the level of basic physics and logic? And how can we build a solution upwards from those raw truths?' When you stop copying the herd and start reasoning from first principles, impossible problems become solvable at a fraction of the cost.",
        "steps": [
            "Identify and Define Current Assumptions: State the problem clearly: 'We believe X is true because everyone says so.' (e.g. 'Automated watering requires a Rs 25,000 kit').",
            "Deconstruct into Fundamental Truths: Strip away branding and intermediate markups. Ask: What are the irreducible physical requirements? (1. A moisture sensor in soil, 2. A logic switch to detect dryness, 3. A small 5V pump, 4. A plastic tube).",
            "Price the Raw Physics & Materials: Look up the raw cost of individual components: Two galvanized nails (soil resistance sensor = Rs 5), a 5V relay module (Rs 60), a micro submersible pump (Rs 120), and an open-source microcontroller board (Rs 350). Total raw physics cost: Under Rs 600!",
            "Reconstruct Upward (The Synthesis): Rebuild the solution from the ground up using raw components, bypassing the 40x commercial markup.",
            "Test Against Reality: Build the prototype and test: Does it pump water when soil dries? Yes! You just engineered an enterprise solution for the price of a pizza.",
            "Apply to Everyday Life: Use first principles for study habits, career choices, and personal goals: ignore peer traditions and focus on what physically moves the needle."
        ],
        "example": {
            "title": "Aman's First-Principles Greenhouse",
            "scenario": "Aman builds the watering system for Rs 550 instead of Rs 25,000.",
            "steps": [
                "Rejects the assumption that commercial kits are required.",
                "Boils watering down to physics: measuring electrical conductivity between two nails in moist soil.",
                "Codes a simple 20-line microcontroller script to trigger a 5V toy pump.",
                "Uses a recycled 5-liter plastic water bottle as the gravity reservoir.",
                "Installs the prototype in the school biology greenhouse.",
                "The system waters plants automatically for 4 months with 100% reliability.",
                "School awards Aman the Annual Innovation Trophy for engineering excellence."
            ],
            "takeaway": "Boiling problems down to fundamental physical truths bypasses expensive gatekeepers and sparks revolutionary creativity."
        },
        "mistakes": [
            ("Accepting 'Because that's the way everyone does it' as a valid reason for doing anything.", "Tradition is often just peer pressure from dead people; always question whether the underlying assumptions still hold true today."),
            ("Over-complicating solutions by adding unnecessary expensive gadgets when simple physics works.", "Simplicity is the ultimate sophistication; the best engineering solutions have the fewest moving parts.")
        ],
        "checklist": [
            "Did I identify the core assumption being made ('Everyone says X')?",
            "Did I break the problem down to fundamental physical or logical truths?",
            "Did I calculate the cost of raw components rather than finished commercial packages?",
            "Did I reason upwards to construct an original, streamlined solution?",
            "Did I test the prototype against real physical performance metrics?"
        ],
        "prompt": "If rocket scientists accepted 'how things have always been done', would reusable landing rockets ever have been invented?",
        "takeaway": "Strip the assumptions, build from raw truths: first-principles thinking unlocks the genius of true innovation.",
        "vis1": {"title": "Reasoning by Analogy vs First Principles", "caption": "Analogy (Copying the Herd: High cost, conventional) <---> First Principles (Boil to Physics, Build Upwards: 10x breakthrough)."},
        "vis2": {"title": "The First-Principles Deconstruction Process", "caption": "Identify Assumption -> Strip to Raw Truths -> Price Raw Physics -> Reconstruct Upward -> Disrupt Status Quo."},
        "act": {
            "title": "The First-Principles Problem Deconstruction Lab",
            "obj": "Select an expensive commercial product or inefficient school tradition and deconstruct it to its raw fundamental truths to design a 10x superior alternative.",
            "steps": [
                "Select a target: An expensive consumer product (e.g. noise-canceling study pods, branded sports drinks) or an inefficient tradition (e.g. handwriting identical practical records).",
                "List all assumptions currently accepted without question.",
                "Deconstruct the problem into irreducible physical, biochemical, or logical requirements.",
                "Research raw material and energy costs for each requirement.",
                "Synthesize a 1-page 'First-Principles Blueprint' proposing an innovative, low-cost solution."
            ],
            "output": "A fully authored First-Principles Innovation Proposal with cost breakdowns and physical feasibility analyses."
        },
        "guided": {
            "context": "A friend tells you: 'You can't get into a top engineering or law college unless your parents spend Rs 3 Lakhs on a famous private coaching institute in Kota.'",
            "optimal": "Deconstruct from first principles: 'What does a competitive exam actually test? Mastery of standard NCERT physics, chemistry, and math concepts. The textbooks, previous 15 years' question papers, and world-class lectures are available for free on government portals and YouTube. The raw ingredient is my own disciplined daily problem-solving hours, not the coaching brand name.'",
            "opt_reason": "Replaces expensive commercial brand marketing with the fundamental truth of cognitive skill acquisition.",
            "non1": "Despair and decide you will never succeed because your family isn't rich.",
            "non1_reason": "Defeatist victim mentality based on false marketing assumptions.",
            "non2": "Demand your parents take high-interest loans to pay the coaching institute.",
            "non2_reason": "Destabilizes family finances based on herd mentality.",
            "takeaway": "Mastery comes from your daily practice and raw concepts, not from expensive institutional brand names."
        },
        "indep": {
            "context": "How did René Descartes formulate the foundational method of radical doubt in his 'Meditations on First Philosophy' to establish epistemological certainty?",
            "prompt": "Evaluate Cartesian skepticism, foundationalism versus coherentism, and algorithmic problem decomposition in computational complexity.",
            "rubric": "Comprehensive analysis of cogito ergo sum, axiomatic deduction, algorithmic reductionism, and ontological problem mapping."
        },
        "quiz": {
            "q": "What is the defining characteristic of First-Principles Thinking?",
            "opt_correct": "Boiling a problem down to its most fundamental physical or logical truths and reasoning upwards from there, rather than reasoning by analogy.",
            "opt_w1": "Copying what the smartest student in the class is doing.",
            "opt_w2": "Buying the most expensive textbook on the market.",
            "opt_w3": "Following a recipe book exactly without making any changes."
        },
        "rubric": {
            "task": "Explain first-principles methodology, deconstruct assumptions into foundational truths, analyze raw material costs, and synthesize novel solutions.",
            "mastery": "Applies radical doubt to conventional practices, isolates core physical/logical variables, computes bottom-up costs, and crafts disruptive practical solutions.",
            "c1": "Epistemological Deconstruction & Assumption Auditing",
            "c2": "Bottom-Up Physical & Logical Re-synthesis",
            "c3": "Innovative Engineering & Value Creation Architecture"
        },
        "refs": [
            "How did Aristotle define 'first principles' (archai) in his Metaphysics and Posterior Analytics?",
            "What did René Descartes establish regarding foundational epistemology in 'Discourse on the Method' (1637)?",
            "How did Elon Musk apply first principles to lithium-ion battery costs (spot market London Metal Exchange material costs vs pack prices)?",
            "Why is the Socratic Method considered the premier pedagogical tool for testing assumptions and uncovering first principles?"
        ]
    },
    {
        "month": 5, "theme": "Mental Models, First-Principles Reasoning & Probability", "seq": 2,
        "cat": "life_critical_thinking", "cat_label": "Critical Thinking & Everyday Problem-Solving",
        "title": "Probabilistic Thinking and Base Rates: Avoiding the Gambler's Fallacy and Catastrophizing",
        "why": "Adolescents in Class 9 tend to think in binary extremes: either something is 100% guaranteed, or it is a 100% catastrophic disaster ('If I fail this math quiz, my entire life is ruined!'). Furthermore, cognitive glitches like the Gambler's Fallacy ('I flipped tails five times, so heads is due!') fuel dangerous gambling behavior. Probabilistic Thinking—evaluating outcomes through probability distributions, base rates, and expected value—is the ultimate cognitive upgrade for rational adulthood.",
        "objs": [
            "Deconstruct the 'Gambler's Fallacy': understanding statistical independence in random events",
            "Incorporate 'Base Rates' (prior historical probability) before making wild emotional predictions",
            "Neutralize catastrophic cognitive distortions using probability distributions (Best-Case, Worst-Case, Most-Likely Case)",
            "Calculate Expected Monetary Value (Probability x Impact) to evaluate everyday risk decisions"
        ],
        "scenario": "Fourteen-year-old Karan studied for his physics quiz but received a mediocre 14 out of 25. He went into a downward spiral of catastrophic terror: 'I will fail my term exams, my GPA will tank, no good high school stream will accept me, I won't get into college, and I will be homeless!' He stopped studying completely because 'everything is hopeless.'",
        "expl": "The human brain is naturally terrible at math—it thinks in vivid, emotional stories rather than probabilities! When something bad happens, your amygdala catastrophizes: it treats a 2% chance of a setback as if it were a 100% certainty of doom. Simultaneously, when teenagers gamble on games, lottery apps, or lottery tickets, they fall for the 'Gambler's Fallacy'—believing that past random coin flips influence the next flip. In statistical reality, a coin has no memory! Every flip is 50/50. Real-world decision masters (like pilots, poker champions, and scientists) think in PROBABILITIES. They ask: 'What is the objective BASE RATE of this happening? What is the Most Likely outcome? And what is the Expected Value?' Calibrating your brain with probability kills catastrophizing and anchors you in rational calm.",
        "steps": [
            "Recognize the Gambler's Fallacy: If you flip a fair coin and get Tails 5 times in a row, the probability of Heads on the 6th flip is STILL EXACTLY 50%! Random events have zero memory; never bet money thinking a number is 'due'.",
            "Anchor in the Base Rate: Before panicking about an event (e.g. plane crashes, rare diseases, or failing a year), look up the historical statistical Base Rate. What percentage of students who score 14/25 actually fail the board exams? Less than 1%! You are panicking over a 1% risk.",
            "Deconstruct Catastrophizing with the 3-Tier Distribution: Draw 3 columns: 1. Worst-Case Outcome (What is the absolute worst that happens, and can I survive it? Yes, I score low on 1 quiz). 2. Best-Case Outcome (I score 25/25 on the next test). 3. Most-Likely Case (With 5 hours of Leitner flashcard review, I will score 20/25).",
            "Calculate Expected Value (EV): EV = (Probability of Win x Reward) - (Probability of Loss x Cost). If a mobile gaming spin has an EV of negative Rs 50, playing it is mathematically guaranteed to drain your money over time.",
            "Avoid Black-and-White Thinking: Replace binary words like 'Always', 'Never', 'Guaranteed', and 'Impossible' with probabilistic calibration: 'There is a 70% chance of rain' or 'There is an 85% probability I will improve my score.'",
            "Separate Decision Quality from Outcome Quality: You can make a brilliant probabilistic decision and still get a bad outcome due to luck; judge your decisions by the logic you used before the dice rolled."
        ],
        "example": {
            "title": "Karan's Probabilistic Anchor",
            "scenario": "Karan neutralizes his catastrophic exam spiral using probability distributions.",
            "steps": [
                "Catastrophic thought: 'My life is ruined because I scored 14/25 on a physics unit quiz.'",
                "Applies Base Rate reality: The unit quiz accounts for only 5% of the annual grade. 95% of the grade is still unwritten!",
                "Calculates Most-Likely Outcome: Re-studying the two missed chapters will bring his final term score to 88%.",
                "Realizes the probability of being 'homeless' from one quiz is 0.00001%!",
                "His chest tension releases; he laughs at the absurdity of his catastrophizing brain.",
                "Executes 4 hours of targeted problem sets and scores 24/25 on the next monthly test."
            ],
            "takeaway": "Replacing catastrophic emotional stories with objective probability distributions restores rational calm and agency."
        },
        "mistakes": [
            ("Believing that because you lost 4 rounds of an online loot box game, you are 'guaranteed to win' the next round.", "Algorithms and random number generators have zero memory; each pull has the exact same tiny odds; chasing losses is the definition of gambling addiction."),
            ("Treating the worst-case scenario as if it were the guaranteed most-likely scenario.", "The catastrophic worst-case scenario usually has less than a 1% probability; focus your energy on preparing for the 80% most-likely distribution.")
        ],
        "checklist": [
            "Do I understand statistical independence (coins and dice have no memory)?",
            "Did I check the objective historical Base Rate before panicking?",
            "Did I map the 3-tier distribution (Worst-Case, Best-Case, Most-Likely)?",
            "Do I avoid binary black-and-white words (Always/Never)?",
            "Can I compute Expected Monetary Value to identify rigged gambling games?"
        ],
        "prompt": "Why does writing down the worst-case scenario on paper immediately make you realize that even if it happens, it is not the end of the world?",
        "takeaway": "Think in odds, calculate base rates: probabilistic thinking liberates your mind from panic and gambling illusions.",
        "vis1": {"title": "The Gambler's Fallacy Illusion", "caption": "5 Tails in a row does NOT make Heads 'due'! Flip #6 is STILL exactly 50% Heads / 50% Tails. Coins have no memory."},
        "vis2": {"title": "The 3-Tier Probability Distribution", "caption": "Worst-Case (1% Probability) | Best-Case (5% Probability) | MOST LIKELY REALITY (94% Probability - Focus here!)."},
        "act": {
            "title": "The Probabilistic Decision & Anti-Catastrophizing Lab",
            "obj": "Deconstruct a current personal anxiety or high-risk decision using Base Rate analysis and Expected Value calculations.",
            "steps": [
                "Select a current worry (e.g. failing an upcoming exam, not making a sports team, moving to a new city).",
                "Write down the catastrophic narrative your brain is telling you.",
                "Research the objective statistical Base Rate for that outcome.",
                "Construct the 3-Tier Outcome Table (Worst, Best, Most-Likely) with assigned percentage probabilities.",
                "Compute the Expected Value of 2 alternative action choices.",
                "Synthesize a calibrated 1-paragraph rational action statement."
            ],
            "output": "A completed Probabilistic Anxiety Audit Worksheet with 3-tier distributions and an Expected Value analysis."
        },
        "guided": {
            "context": "A friend tells you: 'I've lost Rs 500 playing this online color-prediction app today, so the green color MUST hit on the next round! Lend me Rs 500 so I can win everything back!'",
            "optimal": "Refuse firmly: 'That is the Gambler's Fallacy; the app algorithm has no memory and has a negative Expected Value designed to take your money. Stop playing now, take the Rs 500 loss, and delete the app before you lose thousands.'",
            "opt_reason": "Identifies the core statistical fallacy and prevents predatory gambling addiction from escalating.",
            "non1": "Lend them the Rs 500 and ask for 50% of the profits.",
            "non1_reason": "Enables gambling addiction and guarantees losing your own Rs 500.",
            "non2": "Call them an idiot and post about it in the school group chat.",
            "non2_reason": "Cruel and unhelpful public shaming.",
            "takeaway": "Never chase losses; random algorithms have no memory and are mathematically rigged to drain players."
        },
        "indep": {
            "context": "How does Bayes' Theorem provide the mathematical engine for updating subjective belief probabilities in light of new incoming evidentiary data?",
            "prompt": "Evaluate Bayesian inference, base-rate neglect (Kahneman & Tversky), epistemic calibration in superforecasting, and decision theory under uncertainty.",
            "rubric": "Comprehensive analysis of prior probability, likelihood ratios, posterior probability calculation, base-rate fallacies, and Philip Tetlock's forecasting tournaments."
        },
        "quiz": {
            "q": "What is the 'Gambler's Fallacy' in probability and decision science?",
            "opt_correct": "The erroneous belief that past random, independent events influence the probability of future random events (e.g. believing a number is 'due').",
            "opt_w1": "Losing your wallet at a casino.",
            "opt_w2": "Playing chess without a timer.",
            "opt_w3": "Knowing how to count cards in blackjack."
        },
        "rubric": {
            "task": "Explain statistical independence, identify base-rate neglect, calculate Expected Value, and deconstruct catastrophic thinking using probability distributions.",
            "mastery": "Articulates Gambler's Fallacy mechanics accurately, incorporates prior base rates into predictions, constructs 3-tier probability distributions, and calculates EV.",
            "c1": "Statistical Independence & Fallacy Diagnosis",
            "c2": "Base Rate Integration & Probabilistic Calibration",
            "c3": "Anti-Catastrophizing & Expected Value Computation"
        },
        "refs": [
            "What did Daniel Kahneman and Amos Tversky discover about base-rate neglect in 'Judgment Under Uncertainty: Heuristics and Biases'?",
            "How does Annie Duke explain thinking in bets and outcome bias in 'Thinking in Bets: Making Smarter Decisions When You Don't Have All the Facts'?",
            "What did Philip Tetlock uncover about probability calibration in 'Superforecasting: The Art and Science of Prediction'?",
            "How does the Kelly Criterion determine optimal mathematical bet sizing to prevent portfolio ruin in financial markets?"
        ]
    },
    {
        "month": 5, "theme": "Mental Models, First-Principles Reasoning & Probability", "seq": 3,
        "cat": "life_critical_thinking", "cat_label": "Critical Thinking & Everyday Problem-Solving",
        "title": "Evaluating Second-Order Consequences: Thinking Beyond Immediate Short-Term Solutions",
        "why": "Adolescents habitually make decisions based solely on 'First-Order Consequences'—the immediate, instant gratification or immediate relief of a choice ('Staying up late to game feels fun!'). They ignore 'Second-Order' (tomorrow morning's exhaustion and exam failure) and 'Third-Order' consequences (chronic burnout and GPA collapse). Second-order thinking is the master mental model that separates mature wisdom from childish impulsivity.",
        "objs": [
            "Differentiate between First-Order Thinking (fast, immediate, obvious) versus Second-Order Thinking (deliberative, long-term, systemic)",
            "Apply the universal question: 'And then what?' across 3 chronological horizons (Tomorrow, Next Month, In 5 Years)",
            "Analyze historic policy disasters caused by first-order thinking (e.g. The Cobra Effect in colonial Delhi)",
            "Construct a 3-tier Consequence Decision Matrix before committing to major personal, academic, or social choices"
        ],
        "scenario": "Fourteen-year-old Rohan was struggling with a challenging physics homework problem set. A classmate offered him the complete teacher's solution manual PDF: 'Just copy the answers, you'll get full marks in 10 minutes and you can play video games all evening!' Rohan thought: 'Awesome! Quick marks and free gaming time!' and copied the answers.",
        "expl": "First-order thinking is easy, and everyone does it! First-order thinking asks only: 'What is the immediate, direct result of this action?' (Copying homework = High marks today and gaming fun!). But SECOND-ORDER thinking asks the life-altering question: 'AND THEN WHAT?' Second-order consequence: Because you copied the answers, you never learned the mathematical derivation. Third-order consequence: In the terminal board exam three months later, you face that exact problem on a blank test paper, freeze up, and fail the entire term! The classic historical example is 'The Cobra Effect': in British colonial Delhi, the government offered a cash bounty for every dead cobra to eliminate venomous snakes (First-Order). What happened next? People started BREEDING cobras in their basements to kill them for money (Second-Order)! When the government scrapped the bounty, breeders released thousands of snakes, making the problem ten times worse! Wisdom is the ability to foresee the ripples of your choices.",
        "steps": [
            "Ask the Magic Question: Whenever you face a tempting shortcut or major decision, immediately ask aloud: '...And then what?' Repeat this question at least three times.",
            "Trace Horizon 1 (First-Order / 1 Hour): What is the immediate direct effect? (Usually feels good, easy, or relieving).",
            "Trace Horizon 2 (Second-Order / 1 Month): What secondary ripples does Horizon 1 trigger? (Habit decay, knowledge deficit, erosion of trust).",
            "Trace Horizon 3 (Third-Order / 1 Year): What compound long-term reality does this choice cement into your character and reputation?",
            "Identify the Cobra Effect Trap: Beware of solutions that solve a problem in the short term while creating a ten times larger catastrophe in the long term (e.g. borrowing money to pay off credit card debt, or lying to cover up a mistake).",
            "Choose the 'Short-Term Pain, Long-Term Gain' Path: Almost all great human achievements require enduring slight first-order discomfort (studying, training, saving) to harvest massive second- and third-order triumph."
        ],
        "example": {
            "title": "Rohan's Second-Order Awakening",
            "scenario": "Rohan evaluates copying physics homework through second-order thinking.",
            "steps": [
                "First-Order thought: 'Copy answers -> Get an A+ from teacher tomorrow -> Play games for 3 hours.'",
                "Asks: 'And then what?'",
                "Second-Order consequence: 'When unit exams arrive in 4 weeks, I will not know how to solve rotational torque problems under timed conditions.'",
                "Asks: 'And then what?'",
                "Third-Order consequence: 'I score poorly on terminal exams, lose eligibility for the advanced science stream, and ruin my academic confidence.'",
                "Rejects the solution manual; spends 90 focused minutes struggling through the physics derivations with a study partner.",
                "Understands the concept deeply; aces the terminal board exam with distinction."
            ],
            "takeaway": "Asking 'And then what?' illuminates the dangerous traps of short-term shortcuts and ensures lifelong mastery."
        },
        "mistakes": [
            ("Lying to parents to escape an immediate minor scolding (First-Order).", "The second-order consequence is the inevitable discovery of the lie, which destroys parental trust for years and results in ten times harsher restrictions."),
            ("Assuming that because a solution feels relieving right now, it is a smart decision.", "Immediate relief is often the bait of a catastrophic second-order trap; always trace the ripples across time.")
        ],
        "checklist": [
            "Did I ask 'And then what?' across at least 3 chronological tiers?",
            "Did I evaluate Horizon 1 (Immediate), Horizon 2 (Next Month), and Horizon 3 (Next Year)?",
            "Did I check for 'Cobra Effect' feedback loops that could worsen the problem?",
            "Am I choosing short-term discipline to gain massive long-term compound rewards?",
            "Did I evaluate how this choice impacts my reputation and self-respect over time?"
        ],
        "prompt": "Why do the worst decisions in human history almost always feel wonderfully easy and attractive in the first 10 minutes?",
        "takeaway": "Look past the immediate, ask 'And then what?': second-order thinking turns short-sighted impulses into visionary wisdom.",
        "vis1": {"title": "The Consequence Ripple Effect", "caption": "First-Order (Immediate Splash: Easy shortcut) ---> Second-Order (Growing Ripple: Knowledge gap) ---> Third-Order (Tidal Wave: Exam failure)."},
        "vis2": {"title": "The Historical Cobra Effect Model", "caption": "Problem: Too many cobras -> First-Order Policy: Pay bounty for dead snakes -> Second-Order Trap: People breed cobras for cash!"},
        "act": {
            "title": "The 3-Horizon Second-Order Decision Matrix Lab",
            "obj": "Map out a real-world dilemma across 3 chronological consequence horizons using the 'And Then What?' framework.",
            "steps": [
                "Select a real decision dilemma (e.g. quitting a difficult sport, buying an expensive gadget with savings, or taking a study shortcut).",
                "Draw a 3-tier cascade table: Horizon 1 (1 Day), Horizon 2 (1 Month), Horizon 3 (1 Year).",
                "Trace both Option A (The Easy Instant Gratification Path) and Option B (The Disciplined Long-Term Path).",
                "Identify any latent 'Cobra Effects' where Option A creates compounding future crises.",
                "Synthesize a clear, courageous decision verdict grounded in third-order benefits."
            ],
            "output": "A fully charted 3-Horizon Consequence Cascade Matrix with an authored strategic decision memo."
        },
        "guided": {
            "context": "You feel tired and want to skip your scheduled 45-minute daily mathematics revision block to watch funny video reels.",
            "optimal": "Pause and run the second-order model: 'First-order: I get 45 minutes of fun reels. Second-order: Tomorrow's geometry class will make zero sense because I missed the practice. Third-order: Math anxiety compounds, and I spend exam week crying in panic.' Put the phone away and do the 45-minute math block.",
            "opt_reason": "Visualizing the third-order anxiety wave provides immediate emotional leverage to conquer instant procrastination.",
            "non1": "Watch reels for 4 hours and tell yourself you'll study for 8 hours on Sunday.",
            "non1_reason": "Classic first-order procrastination that creates impossible weekend backlogs.",
            "non2": "Smash your computer and scream in despair.",
            "non2_reason": "Childish emotional dysregulation that solves nothing.",
            "takeaway": "Run the second-order tape forward to conquer instant procrastination."
        },
        "indep": {
            "context": "How did Howard Marks's 'The Most Important Thing' establish second-order thinking as the foundational prerequisite for superior alpha generation in financial markets?",
            "prompt": "Evaluate systems dynamics, feedback loops (Meadows), unintended consequences (Merton), and complex adaptive systems in policy design.",
            "rubric": "Comprehensive analysis of Forrester system dynamics, balancing vs reinforcing loops, policy resistance, and non-linear emergent phenomena."
        },
        "quiz": {
            "q": "What is the historical origin of the term 'The Cobra Effect' in economics and second-order thinking?",
            "opt_correct": "A colonial policy in Delhi that paid cash for dead cobras, resulting in citizens breeding cobras for money, which made the snake population worse when the bounty ended.",
            "opt_w1": "A snake charmer who became a prime minister.",
            "opt_w2": "A brand of sports shoes that became popular.",
            "opt_w3": "A video game where you fight giant cobras."
        },
        "rubric": {
            "task": "Explain second-order thinking, trace multi-tier consequence cascades, diagnose Cobra Effect feedback loops, and apply long-term decision matrices.",
            "mastery": "Applies 'And Then What?' rigorously across multiple horizons, identifies counterproductive incentive structures, resists short-term gratification, and designs systemic solutions.",
            "c1": "Multi-Horizon Consequence Cascade Literacy",
            "c2": "Systemic Incentive & Cobra Effect Diagnosis",
            "c3": "Delayed Gratification & Long-Term Strategic Decision-Making"
        },
        "refs": [
            "What did Howard Marks define regarding 'Second-Level Thinking' in 'The Most Important Thing: Uncommon Sense for the Thoughtful Investor'?",
            "How does Donella Meadows analyze systemic feedback loops and unintended consequences in 'Thinking in Systems: A Primer'?",
            "What did sociologist Robert K. Merton establish in his 1936 paper 'The Unanticipated Consequences of Purposive Social Action'?",
            "Why is second-order thinking considered the primary cognitive differentiator between chess grandmasters and amateur players?"
        ]
    },

    # MONTH 6: Healthy Relationships, Consent & Digital Reputational Security
    {
        "month": 6, "theme": "Interpersonal Boundaries, Respectful Dating & Cyber-Reputation", "seq": 1,
        "cat": "life_safety_health", "cat_label": "Safety, Health & Well-being",
        "title": "Understanding Boundaries and Mutual Consent in Teenage Friendships and Crushes",
        "why": "Adolescents in Class 9 navigate the emergence of romantic crushes, intense friendships, and dating interests. Pop culture and cinema frequently romanticize toxic behaviors—such as stalking, refusing to take 'No' for an answer, pressure for physical touch, and persistent nagging—as 'romantic passion'. Learning the legal and ethical definition of affirmative, enthusiastic, and revocable consent establishes respectful, safe adult relationships.",
        "objs": [
            "Define Affirmative Consent using the FRIES model: Freely given, Reversible, Informed, Enthusiastic, and Specific",
            "Differentiate between movie 'persistence tropes' (stalking/harassment) versus real-world mutual respect",
            "Establish personal physical, digital, and emotional comfort boundaries and communicate them unapologetically",
            "Respect a boundary immediately upon hearing 'No' or observing hesitant, uncomfortable nonverbal cues"
        ],
        "scenario": "Fourteen-year-old Sahil had a crush on his classmate Ananya. He messaged her 15 times a day, followed her to the bus stop every afternoon, and blocked her path in the school hallway, saying: 'I know you like me secretly, just say yes to being my girlfriend!' Ananya felt terrified, uncomfortable, and started avoiding school hallways.",
        "expl": "Persistence after someone says 'No' is NOT romance—it is HARASSMENT! In Indian cinema, movies often show heroes stalking girls until they give up; in the real world, that behavior is toxic, scary, and legally classified as harassment under Indian law. Healthy relationships are built on MUTUAL EQUALITY, not coercion. The international gold standard is the FRIES model: Consent must be Freely given (no guilt or pressure), Reversible (anyone can change their mind at any second), Informed (total honesty), Enthusiastic (both people genuinely want it), and Specific (agreeing to hold hands is not agreeing to anything else). When someone says 'No', an honorable young man or woman respects it instantly with quiet dignity.",
        "steps": [
            "Deconstruct the FRIES Model: 1. Freely Given (Without pressure, fear, or manipulation), 2. Reversible (Can be withdrawn at any moment without penalty), 3. Informed (No hidden secrets or lies), 4. Enthusiastic (A clear, joyful YES; not a hesitant, pressured murmur), 5. Specific (Consent for one moment is not consent for another).",
            "Silence is NOT Consent: If someone does not say 'Yes' enthusiastically, their answer is NO. Hesitation, looking away, pulling back, or nervous laughter means STOP immediately.",
            "Banish the Persistence Myth: Real love does not beg, stalk, or corner people. If someone declines an invitation, accept it with a polite smile: 'No problem at all, I completely respect that.' Never ask again.",
            "Establish Your Personal Boundary Radar: You have 100% sovereign ownership over your physical body, your personal space, and your digital device. Nobody—no friend, crush, or senior—has the right to touch you or demand your passwords.",
            "Deploy the Direct Boundary Script: If someone crosses your boundary, look them in the eye and state clearly: 'I am not comfortable with this. Please step back.'",
            "Report Boundary Violations: If someone persists after being told to stop, report them immediately to a school counselor, parent, or trusted teacher."
        ],
        "example": {
            "title": "Sahil's Ethical Awakening",
            "scenario": "Sahil learns the true meaning of mutual respect.",
            "steps": [
                "A school counselor intervenes and explains that blocking Ananya's path is harassment, not romance.",
                "Sahil feels deeply shocked and ashamed, realizing he was blindly copying movie heroes.",
                "Steps up with genuine maturity: approaches Ananya during recess with the counselor present.",
                "Delivers a sincere apology: 'Ananya, I am deeply sorry for following you and blocking your path. I was completely wrong. I respect your boundaries 100% and I will never make you uncomfortable again.'",
                "Keeps his word: steps back completely, treating her with distant, polite respect.",
                "Learns that true masculinity and character are defined by respecting autonomy, not forcing desires."
            ],
            "takeaway": "Enthusiastic consent and immediate respect for 'No' are the unshakeable foundations of honor and healthy relationships."
        },
        "mistakes": [
            ("Believing that 'No' means 'Convince me harder' or 'Try again tomorrow.'", "No means NO—plain and simple; continuing to pursue someone who said no is harassment and a violation of consent."),
            ("Assuming that because you are in a relationship, you own your partner's time, phone, or physical choices.", "Even in close relationships, each individual retains 100% bodily and digital sovereignty; consent is active and ongoing.")
        ],
        "checklist": [
            "Do I understand the 5 pillars of the FRIES consent model?",
            "Do I recognize that silence, hesitation, or nervous smiles mean NO?",
            "Do I immediately step back and respect boundaries the moment someone says no?",
            "Do I reject movie stalking tropes in favor of real-world mutual respect?",
            "Do I feel empowered to say 'I am not comfortable with this' to protect my own boundaries?"
        ],
        "prompt": "Why does a confident, emotionally mature person walk away gracefully when rejected, while an insecure person gets angry and aggressive?",
        "takeaway": "Consent is freely given, enthusiastic, and reversible: respect every person's sovereign boundaries unconditionally.",
        "vis1": {"title": "The FRIES Consent Framework", "caption": "Freely Given | Reversible | Informed | Enthusiastic | Specific. Anything less is NOT consent!"},
        "vis2": {"title": "Real Respect vs Cinema Stalking Tropes", "caption": "Cinema Myth: 'Stalk until she says yes' (Toxic Harassment) <---> Real Respect: Accepts 'No' instantly with grace."},
        "act": {
            "title": "The Boundary Assertion & FRIES Consent Scenario Lab",
            "obj": "Evaluate 4 complex adolescent social scenarios, identifying boundary violations, consent deficits, and drafting assertiveness scripts.",
            "steps": [
                "Review Scenario 1 (Physical touch pressure), Scenario 2 (Digital password demands), Scenario 3 (Persistent unwanted invitations), Scenario 4 (Peer boundary overstepping).",
                "Apply the FRIES model to diagnose where consent is compromised.",
                "Draft clear, direct verbal assertion scripts for the person setting the boundary.",
                "Draft graceful, respectful acceptance scripts for the person hearing the refusal.",
                "Synthesize a personal 'Interpersonal Code of Honor' for adolescent relationships."
            ],
            "output": "A completed FRIES Case Analysis Dossier featuring authored boundary-assertion and rejection-acceptance scripts."
        },
        "guided": {
            "context": "Someone you have a crush on asks you out, but then demands that you share your smartphone unlock PIN and Instagram password to 'prove you have nothing to hide.'",
            "optimal": "Refuse firmly: 'I like you, but trust is built on mutual respect, not digital surveillance. My phone and passwords are my private personal space, and I don't share them with anyone.'",
            "opt_reason": "Identifies controlling relationship red flags early and establishes digital privacy boundaries.",
            "non1": "Hand over all passwords immediately so they don't break up with you.",
            "non1_reason": "Surrenders digital sovereignty and enables abusive controlling behavior.",
            "non2": "Demand their passwords in exchange.",
            "non2_reason": "Escalates toxic surveillance games instead of building mature trust.",
            "takeaway": "Demanding passwords is controlling, not romantic; protect your digital privacy."
        },
        "indep": {
            "context": "How does statutory jurisprudence in India under the Protection of Children from Sexual Offences (POCSO) Act 2012 and IPC Section 354D define stalking and consent regarding minors?",
            "prompt": "Evaluate affirmative consent standards, sexual citizenship (Hirsch & Khan), power asymmetries, and relational agency in adolescent developmental psychology.",
            "rubric": "Comprehensive analysis of legal consent thresholds under POCSO, cyber-stalking definitions under IT Act Section 66E, affirmative consent pedagogy, and peer norms."
        },
        "quiz": {
            "q": "What does the 'R' stand for in the widely recognized FRIES consent framework?",
            "opt_correct": "Reversible (a person has the absolute right to change their mind and withdraw consent at any time).",
            "opt_w1": "Romantic (must involve flowers).",
            "opt_w2": "Recorded (must be written on paper).",
            "opt_w3": "Required (forced by parents)."
        },
        "rubric": {
            "task": "Explain affirmative consent, apply the FRIES framework, identify boundary overstepping, and demonstrate graceful responses to rejection.",
            "mastery": "Articulates FRIES criteria accurately, distinguishes consent from coercion or silence, crafts assertive boundary defenses, and models emotional composure under refusal.",
            "c1": "Affirmative Consent Framework Literacy",
            "c2": "Boundary Assertion & Coercion Resistance",
            "c3": "Rejection Acceptance & Ethical Relationship Etiquette"
        },
        "refs": [
            "What did Jennifer S. Hirsch and Shamus Khan establish regarding 'Sexual Citizenship' in their landmark study of campus relationships?",
            "How does Section 354D of the Indian Penal Code legally define the criminal offense of stalking (physical and electronic)?",
            "What is the Planned Parenthood FRIES consent model utilized by international adolescent health educators?",
            "Why do developmental psychologists emphasize that the ability to accept 'no' gracefully is the supreme predictor of adult relationship stability?"
        ]
    },
    {
        "month": 6, "theme": "Interpersonal Boundaries, Respectful Dating & Cyber-Reputation", "seq": 2,
        "cat": "life_social_teamwork", "cat_label": "Social Skills, Empathy & Teamwork",
        "title": "Recognizing Gaslighting and Emotional Manipulation in Intimate Friendships",
        "why": "Adolescents in Class 9 frequently endure subtle, toxic psychological manipulation in close friendships or dating circles. 'Gaslighting'—making someone question their own sanity, memory, or perception of reality ('I never said that, you're crazy, you're too sensitive!')—erodes self-esteem, creates severe self-doubt, and traps students in abusive dynamics. Identifying manipulation tactics and anchoring in objective reality restores emotional freedom.",
        "objs": [
            "Define 'Gaslighting' and trace its origins to psychological manipulation designed to make victims doubt their own senses",
            "Identify the 4 classic manipulation tactics: Denial ('That never happened'), Invalidation ('You're just being crazy/sensitive'), Guilt-Tripping, and Isolation",
            "Anchor in Objective Reality using the 'Written Paper Trail' and trusted third-party sounding boards",
            "Deploy the 'Reality Anchor' verbal response to neutralize manipulative arguments without getting hooked"
        ],
        "scenario": "Fourteen-year-old Meera had a close friend, Ritu. Whenever Ritu made mean, humiliating jokes about Meera in front of the class and Meera expressed hurt, Ritu would laugh and say: 'Meera, you're so paranoid and overdramatic! I was just joking! You always ruin everyone's fun with your crazy insecurities.' Meera started believing she was truly crazy and defective.",
        "expl": "When someone treats you badly and then convinces you that YOU are the crazy one for feeling hurt, you are experiencing GASLIGHTING! Named after a classic 1944 film where a husband dimmed the gas lights and told his wife she was imagining it until she questioned her sanity, gaslighting is a psychological control tactic. Manipulators use phrases like: 'You're too sensitive,' 'I never said that, you have a terrible memory,' or 'You're making things up.' Over time, your internal compass breaks, and you become dependent on the manipulator to tell you what is real! True friends apologize when they hurt you; manipulators rewrite history to make you feel guilty for their cruelty.",
        "steps": [
            "Recognize the Red-Flag Phrases: Watch for: 'You're crazy,' 'You're making things up,' 'You're too sensitive,' 'Everyone agrees with me, nobody likes your attitude.'",
            "Trust Your Gut (The Internal Alarm): If a conversation consistently leaves you feeling confused, disoriented, questioning your own memory, and constantly apologizing when you did nothing wrong, you are being manipulated.",
            "Create the Reality Paper Trail: When dealing with a manipulative friend, keep written notes of agreements, texts, and timelines in a private journal. Written records provide objective truth that cannot be rewritten.",
            "Deploy the Reality Anchor Script: Do not argue or scream. State calmly: 'My memory of what you said is clear, and my feelings are valid. I am not discussing this if you continue to deny what happened.'",
            "Consult a Trusted Reality Anchor: Talk to a school counselor, parent, or independent friend outside the relationship: 'Here is what happened, word-for-word. Am I being unreasonable?' An objective outside perspective breaks the fog.",
            "Enforce Distance: If someone consistently invalidates your reality and refuses to take accountability, step away from the friendship. You deserve friends who honor truth and respect your feelings."
        ],
        "example": {
            "title": "Meera Breaks the Fog",
            "scenario": "Meera frees herself from Ritu's gaslighting control.",
            "steps": [
                "Recognizes the pattern: every time Ritu insults her, Ritu claims Meera is 'crazy and paranoid'.",
                "Shows the text messages to her older sister: sister confirms that Ritu's jokes were overtly cruel and that Ritu is gaslighting her.",
                "Next time Ritu snaps 'You're just too sensitive!', Meera stands firm.",
                "Says with calm dignity: 'I am not too sensitive, Ritu. Your joke was disrespectful, and calling me crazy doesn't change that. If you can't speak to me with respect, we aren't hanging out.'",
                "Walks away and joins a supportive group of friends from the drama club.",
                "Her self-esteem and happiness return within weeks as the toxic fog clears."
            ],
            "takeaway": "Trusting your own perception and refusing to let manipulators rewrite reality restores self-esteem and freedom."
        },
        "mistakes": [
            ("Spending hours arguing back and forth trying to 'convince' a gaslighter that they hurt you.", "Manipulators will never admit they were wrong; arguing simply exhausts you and gives them more opportunities to distort reality; state your truth and disengage."),
            ("Believing that you are 'too sensitive' simply because someone refuses to take responsibility for their cruelty.", "Your feelings are valid physiological signals; never let someone convince you that having self-respect is a flaw.")
        ],
        "checklist": [
            "Do I recognize classic gaslighting phrases ('You're crazy/too sensitive')?",
            "Do I trust my own memory and physical gut feelings?",
            "Do I maintain a written record of facts when conflicts arise?",
            "Did I consult an objective third-party reality anchor?",
            "Am I willing to distance myself from friends who consistently invalidate my reality?"
        ],
        "prompt": "Why does a manipulator feel terrified when you stop arguing and calmly say: 'I know what happened, and my memory is clear'?",
        "takeaway": "Trust your truth, anchor in reality: refuse to let anyone make you question your own sanity.",
        "vis1": {"title": "The Gaslighting Manipulation Loop", "caption": "Manipulator Hurts You -> You Express Pain -> Manipulator Flips Script ('You're crazy/sensitive!') -> You Apologize in Confusion."},
        "vis2": {"title": "The Reality Anchor Response", "caption": "'My memory is clear. My feelings are valid. I will not allow you to rewrite what happened.' Ground yourself in truth."},
        "act": {
            "title": "The Manipulation Detection & Reality Grounding Lab",
            "obj": "Analyze 3 recorded case studies of interpersonal relational manipulation, identify gaslighting markers, and script assertive boundaries.",
            "steps": [
                "Review Case 1 (Friendship history rewriting), Case 2 (Dating guilt-tripping and isolation), Case 3 (Academic project credit hijacking).",
                "Highlight the exact words that attempt to distort the victim's perception of reality.",
                "Draft an objective 'Chronological Fact Sheet' proving the reality of each case.",
                "Script 2 'Reality Anchor' verbal statements refusing to accept the distortion.",
                "Synthesize a personal 'Emotional Safety Checklist' for teenage friendships."
            ],
            "output": "A completed Forensic Manipulation Analysis Dossier with authored Reality Anchor boundary scripts."
        },
        "guided": {
            "context": "A close friend borrows your expensive jacket, stains it with grease, returns it damaged, and says: 'That stain was already there when you gave it to me! You're trying to blame me for your own mess!'",
            "optimal": "Stay calm, do not scream; show the photo on your phone taken the morning you lent it to them: 'Here is the photo of the jacket yesterday with zero stains. I expect you to get it dry-cleaned or pay for the cleaning, and I will not lend you clothes again.'",
            "opt_reason": "Busts the gaslighting lie instantly with undeniable photographic proof while setting a firm future boundary.",
            "non1": "Apologize and convince yourself you must have forgotten about the stain.",
            "non1_reason": "Total surrender to gaslighting that rewards dishonesty.",
            "non2": "Tear their backpack apart in a rage.",
            "non2_reason": "Violent loss of control that distracts from their dishonesty.",
            "takeaway": "Rely on objective facts and photos; never let someone manipulate your memory."
        },
        "indep": {
            "context": "How does George K. Simon's 'In Sheep's Clothing: Understanding and Dealing with Manipulative People' analyze covert-aggressive personality dynamics and impression management?",
            "prompt": "Evaluate psychological projection, projective identification, cognitive dissonance reduction, and trauma bonding in adolescent dyadic relationships.",
            "rubric": "Comprehensive analysis of covert aggression, shame induction, structural power differentials, boundary consolidation, and clinical intervention models."
        },
        "quiz": {
            "q": "What is the primary definition and goal of 'Gaslighting' in interpersonal relationships?",
            "opt_correct": "A psychological manipulation tactic designed to make the victim doubt their own memories, perceptions of reality, and sanity to maintain control.",
            "opt_w1": "Lighting a camping stove with matches.",
            "opt_w2": "Forgetting your friend's birthday by accident.",
            "opt_w3": "Telling a funny joke that everyone laughs at."
        },
        "rubric": {
            "task": "Identify gaslighting dynamics, decode emotional manipulation tactics, deploy Reality Anchor scripts, and establish independent sounding boards.",
            "mastery": "Diagnoses covert-aggressive manipulation accurately, protects personal cognitive sovereignty, grounds arguments in objective reality, and enforces interpersonal boundaries.",
            "c1": "Psychological Manipulation & Gaslighting Typology Literacy",
            "c2": "Reality Anchoring & Objective Evidentiary Grounding",
            "c3": "Interpersonal Boundary Enforcement & Toxic Relationship Detachment"
        },
        "refs": [
            "What did Dr. Robin Stern publish regarding emotional manipulation in 'The Gaslight Effect: How to Spot and Survive the Hidden Manipulation'?",
            "How does George K. Simon define covert-aggressive tactics (feigning innocence, rationalization) in 'In Sheep's Clothing'?",
            "What is 'Trauma Bonding' (Patrick Carnes) and why do victims stay attached to emotionally abusive partners?",
            "How does the concept of 'Locus of Control' (Julian Rotter) correlate with susceptibility to interpersonal psychological manipulation?"
        ]
    },
    {
        "month": 6, "theme": "Interpersonal Boundaries, Respectful Dating & Cyber-Reputation", "seq": 3,
        "cat": "life_safety_health", "cat_label": "Safety, Health & Well-being",
        "title": "The Permanent Digital Footprint: Protecting Privacy, Sexting Risks, and Future Career Background Checks",
        "why": "Adolescents in Class 9 treat social media apps (Snapchat, Instagram, WhatsApp) as temporary and ephemeral, naively believing that 'disappearing messages' vanish forever. In digital reality, anything uploaded or transmitted online—especially sensitive photos, intimate messages, or racist/edgy memes—can be screenshot, screen-recorded, leaked, and archived forever. Ignorance leads to catastrophic blackmail, legal charges under the POCSO/IT Act, and destroyed future university/career opportunities.",
        "objs": [
            "Debunk the 'Disappearing Message' myth: understanding server caching, screen recording, and forensic digital permanency",
            "Explain the severe legal, criminal, and psychological reality of 'Sexting' under the POCSO Act (where transmission of minor explicit imagery constitutes child pornography)",
            "Conduct a personal 'Digital Footprint Audit': Googling yourself, auditing privacy settings, and purging damaging legacy posts",
            "Apply the 'Billboard Rule': Never post, text, or send anything that you would not proudly display on an enormous billboard outside your school"
        ],
        "scenario": "Fourteen-year-old Rohan was pressured by a girl he had a crush on to send an intimate, shirtless private photo on a 'disappearing' Snapchat message. Three days later, they had an argument. The girl forwarded a screenshot of the photo to the school WhatsApp group. Rohan felt sick with terror, unable to sleep or face his classmates, as the photo circulated across 200 phones.",
        "expl": "In the digital world, DELETE DOES NOT MEAN DELETED! There is no such thing as an ephemeral disappearing message. Any app that claims messages disappear after 10 seconds is lying to your face: anyone can take a screenshot, use a second phone to film the screen, or retrieve cached files from the phone's operating system! Once an image or message enters the internet, YOU LOSE TOTAL CONTROL OF IT FOREVER. Even worse, in India, sending or possessing intimate photos of anyone under 18—even if you are 14 yourself!—is classified as a serious non-bailable criminal offense under the POCSO Act (Protection of Children from Sexual Offences) and IT Act! Furthermore, university admissions officers and corporate employers routinely hire forensic background check agencies to inspect your entire digital history back to age 13. Your digital footprint is your permanent lifetime resume.",
        "steps": [
            "Internalize the Golden Rule of the Internet: If you would not want it displayed on an enormous billboard in front of your school, your parents, and your future employer, DO NOT SEND IT, POST IT, OR TYPE IT!",
            "Never Share Intimate Media (Zero Exceptions): Under Indian law (POCSO Act Section 14/15 and IT Act Section 67B), creating, possessing, or forwarding sexually explicit media of minors is a severe criminal offense resulting in juvenile detention and a permanent criminal record.",
            "Beware of Sextortion Blackmail: Cyber-criminals create fake profiles of attractive teenagers, convince students to send intimate photos on video calls, and then immediately demand Rs 50,000, threatening to leak the video to school parents. If this happens: NEVER PAY MONEY! Tell a parent or dial the Cyber Crime helpline (1930) immediately.",
            "Audit Your Public Digital Footprint: Open an incognito browser tab and Google your full name in quotation marks (e.g. \"Rohan Verma Delhi\"). What pictures, old blog posts, or comments show up? Delete and untag anything unprofessional.",
            "Lock Down Social Privacy Controls: Set all personal accounts to PRIVATE. Turn off location geotagging on cameras so your home address is not embedded in photo metadata (EXIF data).",
            "Clean House Annually: Every December, review your social feeds. Delete edgy comments, aggressive arguments, and embarrassing legacy photos."
        ],
        "example": {
            "title": "Rohan's Digital Sovereignty",
            "scenario": "Rohan recovers from the cyber incident with adult intervention.",
            "steps": [
                "Overcomes his terror and tells his school counselor and parents immediately.",
                "School authorities step in: the students who forwarded the image are reprimanded under cyber-safety protocols and forced to delete all files.",
                "Rohan learns the brutal reality of digital permanency.",
                "Audits all his social media profiles: sets everything to private, deletes unverified followers, and turns off location sharing.",
                "Adopts the 'Billboard Rule' for all future messaging.",
                "Gives a presentation during Cyber Safety Week at school, educating 300 younger students on the dangers of disappearing messaging apps.",
                "Becomes a certified peer cyber-safety ambassador."
            ],
            "takeaway": "Remembering the Billboard Rule and keeping intimate media off digital networks protects your legal safety and future reputation."
        },
        "mistakes": [
            ("Believing that because an app says 'View Once' or 'Disappearing', it is 100% safe to send private photos.", "Anyone can photograph the screen with a second phone or run screen-recording software; view-once apps offer zero real privacy protection."),
            ("Paying ransom money to online blackmailers who threaten to leak private pictures.", "Paying money never stops blackmailers; it proves you have money, and they will demand ten times more the next day; cut contact and report to the police immediately.")
        ],
        "checklist": [
            "Do I live by the Billboard Rule (would I display this publicly outside school)?",
            "Do I understand that transmitting intimate minor imagery is a serious criminal offense under the POCSO Act?",
            "Are all my personal social accounts set to private with location tagging disabled?",
            "Have I Googled my own name to audit my public search footprint?",
            "Do I know that paying cyber-blackmailers never works and that 1930 is the emergency reporting helpline?"
        ],
        "prompt": "If an employer or college admissions officer audited everything you posted, liked, or messaged online over the last two years, would you be proud or terrified?",
        "takeaway": "The internet never forgets: protect your privacy, follow the Billboard Rule, and guard your digital reputation with ironclad integrity.",
        "vis1": {"title": "The Disappearing Message Myth", "caption": "App Claims: 'Disappears in 10s' <---> Reality: Screen Recording, Secondary Cameras, Forensic OS Cache = PERMANENT FOREVER."},
        "vis2": {"title": "The Billboard Test for Digital Safety", "caption": "Before hitting SEND, ask: 'Would I proudly display this on an enormous billboard outside my school?' If NO -> DELETE!"},
        "act": {
            "title": "The Digital Footprint Forensic Audit & Privacy Hardening Lab",
            "obj": "Conduct a comprehensive personal digital footprint audit across search engines and social platforms, implementing maximum privacy hardening.",
            "steps": [
                "Open an incognito browser session and search your full name, phone number, and primary usernames across Google, Bing, and image search.",
                "Document all publicly indexed personal details, photos, or old accounts.",
                "Audit privacy settings on 3 primary platforms: enable Two-Factor Authentication (2FA), restrict profile visibility to approved friends, and disable location geotagging.",
                "Delete or untag at least 5 legacy posts, comments, or photos that violate the Billboard Rule.",
                "Draft a personal 'Digital Code of Conduct' governing messaging ethics and device security."
            ],
            "output": "A completed Personal Digital Footprint Audit Report with before-and-after privacy hardening logs."
        },
        "guided": {
            "context": "An unknown user on Instagram with an attractive profile picture messages you: 'Hey, you look so hot, let's video call on WhatsApp and do something wild!'",
            "optimal": "Do NOT accept the call, do NOT reply; take a screenshot of their profile, block the account immediately, and report the profile for predatory behavior.",
            "opt_reason": "Classic sextortion honey-trap architecture designed to record video footage for immediate financial blackmail.",
            "non1": "Accept the video call to see who it is.",
            "non1_reason": "Puts you straight into the cyber-extortionist's screen-recording trap.",
            "non2": "Send them a friendly selfie to introduce yourself.",
            "non2_reason": "Gives the scammer your face to photoshop into compromised extortion images.",
            "takeaway": "Block unverified strangers demanding private video chats instantly; it is 100% an extortion scam."
        },
        "indep": {
            "context": "How does the Indian Protection of Children from Sexual Offences (POCSO) Act 2012 (Sections 14 & 15) and Information Technology Act 2000 (Section 67B) strictly penalize the electronic generation, transmission, and possession of minor explicit material without exception for peer consensual sexting?",
            "prompt": "Evaluate statutory strict liability, algorithmic content moderation (PhotoDNA hashing), digital forensic artifact recovery, and juvenile justice rehabilitative frameworks.",
            "rubric": "Comprehensive analysis of statutory strict liability under POCSO, forensic digital permanence (NAND flash wear-leveling and unallocated space recovery), and institutional cyber-governance."
        },
        "quiz": {
            "q": "What is the legal status in India regarding the transmission or possession of sexually explicit photos of anyone under 18 years of age (even between consensual teenage peers)?",
            "opt_correct": "It is a severe, non-bailable criminal offense under the POCSO Act and IT Act, punishable by severe legal penalties and juvenile justice proceedings.",
            "opt_w1": "It is completely legal as long as the app has a disappearing message timer.",
            "opt_w2": "It is permitted if both teenagers are in Class 9.",
            "opt_w3": "It is treated as a minor school prank with no legal consequences."
        },
        "rubric": {
            "task": "Explain digital permanency, analyze POCSO sexting legal realities, execute digital privacy audits, and defend against sextortion blackmail.",
            "mastery": "Debunks ephemeral messaging myths, articulates statutory strict liability under POCSO/IT acts, applies the Billboard Rule rigorously, and executes privacy hardening protocols.",
            "c1": "Digital Forensic Permanence & Architecture Literacy",
            "c2": "POCSO & Cyber Law Statutory Compliance",
            "c3": "Digital Reputation Auditing & Privacy Hardening Execution"
        },
        "refs": [
            "What does the Protection of Children from Sexual Offences (POCSO) Act 2012 mandate regarding digital child abuse material under Sections 14 and 15?",
            "How does Microsoft's 'PhotoDNA' and hash-matching technology automatically detect and flag illicit imagery across cloud platforms globally?",
            "What did the Pew Research Center uncover regarding college admissions officers routinely rescinding acceptances based on historical social media posts?",
            "How does the National Cyber Crime Helpline (1930) and Cyber Crime portal (cybercrime.gov.in) assist victims of financial and cyber extortion?"
        ]
    },

    # MONTH 7: Domestic Independence, Emergency Preparedness & Basic Mechanics
    {
        "month": 7, "theme": "Living Away from Home, Travel Readiness & Domestic Problem-Solving", "seq": 1,
        "cat": "life_independence", "cat_label": "Personal Independence & Daily Living",
        "title": "Bicycle and Two-Wheeler Emergency Field Maintenance: Fixing Punctures and Brake Tuning",
        "why": "Adolescents in Class 9 commute to schools and coaching centers using multi-gear bicycles or light two-wheelers. A flat tire, slipping chain, or failing brake cable in the middle of a busy highway leaves them stranded, vulnerable to road hazards, and dependent on strangers. Mastering basic mechanical diagnostics—patching a tube, tuning V-brakes, adjusting derailleur chain tension, and checking tire PSI—builds mechanical self-sufficiency.",
        "objs": [
            "Diagnose bicycle tire air pressure (PSI) and inspect tread wear, sidewall cracks, and valve stems (Presta vs Schrader)",
            "Remove a bicycle wheel safely, locate a tube puncture using the water submersion bubble test, and apply a vulcanizing rubber patch",
            "Tune and calibrate mechanical rim V-brakes or disc brakes to ensure symmetrical pad clearance and rapid stopping power",
            "Clean, degrease, and lubricate a drive chain with wet/dry synthetic lube, eliminating chain slippage"
        ],
        "scenario": "Fourteen-year-old Aditya was riding his bicycle to a Class 9 term exam 4 km away when his rear tire hit a sharp construction wire and went completely flat. He had no repair kit, didn't know how to remove the wheel, panicked, and arrived 40 minutes late in tears, missing the first half of his examination.",
        "expl": "Mechanical independence is the foundation of personal mobility! When you understand simple machines—levers, cables, pneumatic tires, and chain drives—you never get stranded. A bicycle flat tire is not a magical disaster; it is a simple rubber tube puncture that can be fixed on the roadside in 12 minutes using tire levers, sandpaper, vulcanizing rubber cement, and a patch! By carrying a compact saddle bag with an emergency hand pump, multi-tool, and patch kit, and learning how to adjust loose brake cables so your bike stops on a dime, you become a master of your own transport.",
        "steps": [
            "The Pre-Ride 'ABC' Quick Check: Air (Press tires firmly with thumbs; check recommended PSI on tire sidewall, typically 40-60 PSI). Brakes (Squeeze levers; levers should not touch handlebars, and pads must contact the rim squarely). Chain (Inspect drive chain for rust, debris, and smooth pedaling).",
            "Removing the Wheel: Shift chain to the smallest rear cog. Release the brake quick-release cable. Loosen axle nuts or flip the quick-release skewer; guide the wheel gently out of the frame dropouts.",
            "Dismounting the Tire: Insert two plastic tire levers under the tire bead (never use metal screwdrivers, which pinch tubes!). Pry the tire bead over the rim edge and pull out the inner tube.",
            "Locate the Puncture: Pump air into the bare tube. Listen for hissing air, or submerge the tube in a basin of water and watch for rising bubbles. Mark the hole with a chalk pencil.",
            "Apply the Vulcanizing Patch: Scuff the rubber around the hole with sandpaper to create texture. Apply a thin layer of rubber cement; wait 60 seconds until tacky. Press the vulcanizing rubber patch firmly for 2 minutes from center to edges.",
            "Reassemble and Check Tire Casing: CRITICAL: Run your bare fingers carefully along the inside of the outer tire casing to find and remove the embedded wire or glass that caused the puncture! Reinstall tube, seat tire bead, inflate to correct PSI, and reconnect brakes."
        ],
        "example": {
            "title": "Aditya's Roadside Mastery",
            "scenario": "Aditya handles a roadside puncture with mechanical poise.",
            "steps": [
                "Packs a compact saddlebag: mini hand pump, 2 plastic tire levers, patch kit, and multi-tool.",
                "When his front tire punctures on a weekend ride, he calmly pulls off onto a clean sidewalk.",
                "Dismounts wheel, uses tire levers to pull out the inner tube.",
                "Finds the tiny leak using a water splash from his water bottle.",
                "Scuffs rubber, applies vulcanizing cement and patch, and removes a sharp acacia thorn from the tire tread.",
                "Pumps tire back to 50 PSI, refits wheel, and tests brake alignment.",
                "Resumes riding in under 15 minutes, proud of his self-reliance."
            ],
            "takeaway": "Carrying an emergency saddle kit and mastering vulcanizing patch repair guarantees you never get stranded."
        },
        "mistakes": [
            ("Using metal flathead screwdrivers or butter knives to pry tires off bicycle rims.", "Sharp metal tools pinch and lacerate inner tubes, creating multiple severe blowouts; use only dedicated plastic tire levers."),
            ("Failing to inspect the inside of the outer tire casing before putting in the repaired tube.", "The sharp wire or thorn often remains stuck in the tire tread; if not removed, it will instantly puncture your new patch within 10 meters of riding.")
        ],
        "checklist": [
            "Did I perform the ABC check (Air, Brakes, Chain) before riding?",
            "Do I have a saddle repair kit (hand pump, tire levers, vulcanizing patches)?",
            "Did I scuff the tube rubber and wait for cement to become tacky before patching?",
            "Did I feel the inside of the tire casing for embedded glass or thorns?",
            "Are the brake pads aligned squarely against the rim without rubbing?"
        ],
        "prompt": "How does knowing how to fix your own flat tire and tune your own brakes make you feel free and capable when traveling around your city?",
        "takeaway": "Know your machine, carry your tools: basic mechanical mastery keeps your wheels turning and your journeys safe.",
        "vis1": {"title": "The ABC Pre-Ride Safety Inspection", "caption": "A = Air (Check Sidewall PSI) | B = Brakes (Firm lever, square pad grip) | C = Chain (Clean, lubed, smooth tension)."},
        "vis2": {"title": "The 6-Step Tube Puncture Patch Sequence", "caption": "Locate Leak -> Scuff Rubber -> Apply Cement (Wait 60s) -> Press Patch -> Clear Tire Thorn -> Reassemble."},
        "act": {
            "title": "The Bicycle Emergency Field Overhaul Workshop",
            "obj": "Demonstrate complete inner tube removal, puncture patching, tire casing debris inspection, and brake caliper alignment on a bicycle.",
            "steps": [
                "Set bicycle upside down on a protective mat or mount on a bike stand.",
                "Disconnect brake quick-release and dismount the front wheel.",
                "Use plastic tire levers to extract the tube safely.",
                "Locate a simulated puncture hole; execute the sandpaper scuffing and vulcanizing patch installation.",
                "Check the tire casing, reinstall the tube, inflate with hand pump to designated PSI, and tune brake pads to 1.5mm rim clearance."
            ],
            "output": "A successfully patched inner tube holding rated PSI pressure and an inspected, calibrated bicycle brake system verified by an adult."
        },
        "guided": {
            "context": "While riding down a steep hill, you squeeze your brake levers hard, but the bike barely slows down and the levers pull all the way against the rubber handlebars.",
            "optimal": "Use your shoes to drag against the road pavement to slow down safely, pull off the road, and use your multi-tool barrel adjuster to tighten the loose brake cable tension before riding another meter.",
            "opt_reason": "Loose brake cables are an acute life-threatening hazard; immediate tension calibration is mandatory before continued riding.",
            "non1": "Keep riding down the hill at top speed and hope for the best.",
            "non1_reason": "Catastrophic high-speed crash resulting in severe head trauma and fractures.",
            "non2": "Pour water on the brakes to make them stop.",
            "non2_reason": "Water acts as a lubricant on brake pads, reducing stopping friction even further.",
            "takeaway": "Never ride with spongy brakes; tighten cable barrel adjusters immediately."
        },
        "indep": {
            "context": "How does the mechanical advantage of bicycle lever ratios, pneumatic pressure (Boyle's Law in tires), and Coulomb friction in brake pad vulcanization govern vehicle dynamics?",
            "prompt": "Evaluate rolling resistance coefficients, torque transmission through chain drives, spoke tension truing physics, and hydraulic vs mechanical disc calipers.",
            "rubric": "Comprehensive analysis of kinetic friction coefficients, pneumatic tire deflection curves, gear mechanical advantages, and spoke wheel triangulation mechanics."
        },
        "quiz": {
            "q": "What must you ALWAYS do to the inside of the outer bicycle tire casing before reinstalling a patched inner tube?",
            "opt_correct": "Carefully run your fingers along the inside of the tire tread to find and remove the embedded thorn, wire, or glass shard that caused the flat.",
            "opt_w1": "Wash the inside with cooking oil.",
            "opt_w2": "Paint the inside with red nail polish.",
            "opt_w3": "Stuff the tire full of newspaper."
        },
        "rubric": {
            "task": "Perform bicycle safety inspections, execute tube extraction and vulcanizing patch repairs, clear tire thorns, and tune brake cable clearances.",
            "mastery": "Executes ABC pre-ride audits, uses tire levers without pinch flats, installs airtight vulcanizing patches, removes casing thorns, and calibrates brake lever tensions.",
            "c1": "Pneumatic Mechanical Literacy & ABC Auditing",
            "c2": "Puncture Localization & Vulcanization Patching Technique",
            "c3": "Brake Calibration & Drive-Train Maintenance Rigor"
        },
        "refs": [
            "What does the Bicycle Helmet Safety Institute and Park Tool School specify regarding mechanical safety checks?",
            "How does vulcanization chemistry bond patch rubber to inner tubes using sulfur cross-linking catalysts?",
            "What is the difference between Presta valves (high-pressure narrow road rims) and Schrader valves (automotive standard)?",
            "Why is chain lubrication with dedicated Teflon/wax synthetic oil essential for preventing drive-train component wear?"
        ]
    },
    {
        "month": 7, "theme": "Living Away from Home, Travel Readiness & Domestic Problem-Solving", "seq": 2,
        "cat": "life_independence", "cat_label": "Personal Independence & Daily Living",
        "title": "Deep Fabric Care: Machine Laundry Cycles, Stain Removal Chemistry & Garment Steaming",
        "why": "Adolescents in Class 9 prepare for boarding schools, sports hostels, or living independently in college. Washing white shirts with bleeding red socks turns uniforms pink, using boiling water shrinks wool into doll clothes, and treating oil stains with hot water bakes stains permanently into fabric fibers. Mastering fabric chemistry, stain removal, washing machine cycle programming, and vertical steaming guarantees self-reliance and impeccable personal presentation.",
        "objs": [
            "Decode international garment care laundry symbols: Wash Temperature, Bleaching, Drying, and Ironing icons",
            "Sort laundry into 4 distinct wash loads: Whites, Dark colors, Delicates/Wool, and Heavy linens/Gym wear",
            "Apply the chemistry of targeted stain removal: protein stains (cold water/enzymes), oil/grease (dish soap emulsifiers), ink/tannin",
            "Operate an automatic washing machine (detergent dosage, cycle selection: Quick vs Cotton vs Delicate) and garment steamer"
        ],
        "scenario": "Fourteen-year-old Kabir threw his white school uniform shirts, muddy football jersey, a red wool sweater, and two pairs of jeans into the washing machine. He poured two cups of detergent, turned the dial to 'Heavy Hot Wash 60°C,' and started the cycle. His white shirts came out light pink with grease smudges, and his wool sweater shrank to fit a toddler.",
        "expl": "Doing laundry is not dumping clothes in a tub; it is APPLIED TEXTILE CHEMISTRY! Different fabric fibers react radically to heat, enzymes, and mechanical friction. Plant fibers (cotton and linen) can handle hot water, but animal protein fibers (wool and silk) shrink and felt if washed in hot water! Color dyes from dark cottons bleed into porous white cottons if washed together. Furthermore, hot water BAKES protein and grease stains permanently into cloth fibers, turning temporary spills into permanent ruins. Learning to read garment care tags, sort loads, treat stains with the correct chemical counter-agents, and select wash cycles keeps your clothes pristine, saves thousands of rupees, and proves you are ready to live on your own.",
        "steps": [
            "Decode the Tag Symbols: The Tub = Washing temperature (dots = heat level); The Triangle = Bleach rules; The Square = Drying instructions; The Iron = Ironing heat limit; The Circle = Dry clean only.",
            "Sort into 4 Piles: 1. Whites (pure white shirts, undershirts), 2. Lights/Colors (khaki, pastels, blues), 3. Darks (black, dark jeans, navy), 4. Delicates & Wool (hand wash or gentle cold cycle only).",
            "Pre-Treat Stains with Chemistry (BEFORE the Wash): 1. Blood/Protein (Cold water ONLY + enzyme detergent; never hot water!). 2. Cooking Oil/Curry (Apply 2 drops of liquid dish soap directly to break grease bonds; let sit 15m). 3. Pen Ink (Dab with rubbing alcohol or hand sanitizer).",
            "Calibrate Detergent Dosage: More detergent does NOT mean cleaner clothes! Excess soap leaves gummy chemical residue in fibers that traps body odor and skin bacteria. Use exactly 1 cap / scoop.",
            "Select the Right Machine Cycle: 'Cottons 40°C' for everyday clothes; 'Delicate / Wool Cold' for sweaters; 'Quick 15m' for lightly worn summer t-shirts. Always use COLD water for colored loads.",
            "Air Drying & Vertical Steaming: Shake garments firmly before hanging to release wrinkles. Hang shirts on contoured hangers. Use a vertical handheld steamer to erase wrinkles from school blazers without scorching delicate fabrics."
        ],
        "example": {
            "title": "Kabir's Textile Restoration",
            "scenario": "Kabir masters garment care and restores his wardrobe.",
            "steps": [
                "Studies international care tag symbols with his mother.",
                "Sorts his dirty laundry into 3 separate laundry hampers: Whites, Dark/Colors, and Sports Gym wear.",
                "Pre-treats a turmeric curry stain on his shirt using liquid dish soap, dabbing gently with a damp cloth.",
                "Sets the washing machine to 'Eco Cold Wash' with correct detergent measurement.",
                "Air-dries his school shirts on wooden hangers in shaded ventilation.",
                "Uses a handheld garment steamer to make his school blazer look crisp and brand-new.",
                "Takes complete sovereign ownership of his personal laundry for the rest of his life."
            ],
            "takeaway": "Sorting fabrics, treating stains with chemistry, and choosing cold wash cycles keeps clothes durable, bright, and pristine."
        },
        "mistakes": [
            ("Pouring boiling hot water directly onto a fresh blood, milk, or egg stain.", "Heat coagulates and denatures proteins, permanently bonding the stain into the fabric fibers; always use cold water for protein stains."),
            ("Washing brand-new dark red, black, or indigo clothes together with crisp white shirts.", "New dye pigments bleed heavily in water, permanently staining white garments pink or gray; always wash whites completely separately.")
        ],
        "checklist": [
            "Did I check the garment care tag symbols before washing?",
            "Are clothes sorted into separate White and Colored loads?",
            "Did I pre-treat oil and protein stains before running the wash?",
            "Did I use the correct measured detergent dose (avoiding excess soap buildup)?",
            "Are delicate items and woolens washed on cold gentle cycles?"
        ],
        "prompt": "Why does using liquid dishwashing soap remove greasy food stains on clothing better than ordinary laundry powder?",
        "takeaway": "Sort with care, treat with chemistry: textile mastery preserves your wardrobe and keeps you looking sharp and self-reliant.",
        "vis1": {"title": "International Garment Care Tag Rosetta Stone", "caption": "Wash Tub (Temp) | Triangle (Bleach) | Square with Circle (Dryer) | Iron (Heat Dots) | Circle (Dry Clean)."},
        "vis2": {"title": "The Stain Removal Chemistry Matrix", "caption": "Grease/Oil -> Dish Soap Emulsifier | Protein/Blood -> Cold Water Enzymes | Ink -> Rubbing Alcohol. Never use hot water first!"},
        "act": {
            "title": "The Textile Chemistry & Laundry Master Workshop",
            "obj": "Decode 5 garment care labels, pre-treat 2 challenging fabric stains using chemical principles, and execute a complete sorted wash cycle.",
            "steps": [
                "Audit 5 clothing items from your wardrobe; sketch and decode their care tag symbols.",
                "Create two test fabric swatches: stain one with cooking oil/turmeric and one with ballpoint pen ink.",
                "Execute the targeted pre-treatment protocols (dish soap degreaser and alcohol solvent).",
                "Sort a week's laundry into 3 certified loads and program the automatic washing machine.",
                "Demonstrate hang-drying and handheld garment steaming on a formal school shirt."
            ],
            "output": "A documented Garment Care Tag Decoding Chart and an inspected, stain-free restored fabric sample."
        },
        "guided": {
            "context": "You accidentally drop oily curry gravy down the front of your favorite light-colored cotton shirt right before leaving for school.",
            "optimal": "Immediately blot (do not rub!) the gravy with a paper napkin, apply a drop of clear liquid dish soap directly to the stain, dab gently with cold water, and let it sit before washing.",
            "opt_reason": "Surfactants in dish soap break hydrophobic grease bonds, preventing oil from setting in cotton fibers.",
            "non1": "Scrub the stain violently with a dry towel.",
            "non1_reason": "Grinds the turmeric pigment deep into the weave, destroying the fabric.",
            "non2": "Pour hot boiling tea over the shirt to cover the stain.",
            "non2_reason": "Bakes the grease in permanently and adds a second massive tannin stain.",
            "takeaway": "Blot, apply dish soap surfactant, and rinse with cold water; never scrub aggressively."
        },
        "indep": {
            "context": "How does the chemical structure of synthetic anionic surfactants (hydrophilic head and lipophilic tail) form micelles that encapsulate non-polar grease in aqueous suspension?",
            "prompt": "Evaluate protein coagulation kinetics in stain removal, thermal shrinkage of keratin fiber scales in wool, and enzymatic protease action in laundry detergents.",
            "rubric": "Comprehensive analysis of micelle formation, critical micelle concentration (CMC), keratin felting mechanics, enzymatic hydrolysis of peptide bonds, and optical brightener fluorescence."
        },
        "quiz": {
            "q": "Why should you NEVER use hot water when washing or treating a fresh protein stain (like blood or egg) on fabric?",
            "opt_correct": "Hot water denatures and coagulates the protein molecules, chemically baking the stain permanently into the fabric fibers.",
            "opt_w1": "Hot water makes the fabric grow fungus instantly.",
            "opt_w2": "Hot water dissolves the washing machine drum.",
            "opt_w3": "Hot water makes the clothes weigh 50 kilograms."
        },
        "rubric": {
            "task": "Decode textile care tags, sort laundry loads, apply chemical stain removal protocols, and operate automated wash and steam equipment.",
            "mastery": "Translates international care symbols flawlessly, sorts fabrics by thermal/dye properties, executes targeted chemical pre-treatments, and demonstrates energy-efficient laundry habits.",
            "c1": "Textile Care Symbol & Fiber Property Literacy",
            "c2": "Stain Removal Chemistry & Surfactant Execution",
            "c3": "Laundry Workflow Sorting & Appliance Operation Mastery"
        },
        "refs": [
            "What do ISO 3758 standards establish regarding international textile care labeling codes?",
            "How do protease and lipase enzymes in modern bio-detergents biologically break down organic stains at low temperatures?",
            "What is the physical mechanism of wool 'felting' (barbed microscopic scales interlocking when exposed to heat and agitation)?",
            "Why is washing clothes in cold water (30°C or below) estimated by the EPA to eliminate 75% of domestic laundry energy consumption?"
        ]
    },
    {
        "month": 7, "theme": "Living Away from Home, Travel Readiness & Domestic Problem-Solving", "seq": 3,
        "cat": "life_independence", "cat_label": "Personal Independence & Daily Living",
        "title": "Assembling an All-Hazards Disaster Survival Kit for Floods, Earthquakes, and Cyclones",
        "why": "Adolescents in Class 9 live in regions exposed to seasonal monsoonal urban flooding, seismic earthquake risks, tropical cyclones, and grid electrical blackouts. In a sudden disaster, municipal rescue services take 48 to 72 hours to reach stranded neighborhoods. Assembling and maintaining an airtight '72-Hour All-Hazards Survival Kit' (Go-Bag) equips teenagers to protect their families when municipal services fail.",
        "objs": [
            "Explain the '72-Hour Rule' in disaster management: self-sufficiency requirements before emergency relief mobilization",
            "Assemble a certified 72-Hour Go-Bag: water purification tablets, non-perishable food, multi-band radio, first-aid, waterproof documents",
            "Calculate minimum family survival hydration needs (4 liters per person per day for drinking and basic sanitation)",
            "Formulate an emergency family evacuation rendezvous plan with designated out-of-area emergency contact anchors"
        ],
        "scenario": "During the monsoon in Mumbai, an unprecedented cloudburst dumped 400mm of rain in 6 hours. Water flooded the ground floor of fourteen-year-old Meera's building, the electrical grid failed, and tap water was contaminated with sewage. The family had zero bottled water, no batteries for flashlights, no dry food, and their medical prescriptions were soaked and unreadable. They spent 48 hours in terrifying darkness and thirst.",
        "expl": "Disasters do not give appointments; they strike in seconds! When a major flood, cyclone, or earthquake hits, city electricity grids fail, tap water becomes toxic, phone towers go offline, and roads are impassable. The National Disaster Management Authority (NDMA) emphasizes the '72-HOUR SURVIVAL RULE': every household must be 100% self-sufficient for the first 3 days before rescue boats, military helicopters, and relief camps reach full capacity. A 72-Hour 'Go-Bag' is an airtight, rugged backpack kept near your front door, packed with purified water rations, calories, first-aid trauma supplies, emergency lighting, and laminated copies of identity documents. When disaster strikes, prepared teenagers lead their families to safety.",
        "steps": [
            "Hydration is Life Priority #1: Store 4 liters of clean drinking water per person per day for 3 days (12 liters per person). Pack chlorine water purification tablets (each tablet purifies 5L of floodwater in 30 minutes) and a portable filtration straw.",
            "Calorie-Dense Non-Perishable Food: Pack high-energy foods that require zero cooking, refrigeration, or added water: peanut butter, roasted gram (chana), dry fruit mix, energy bars, and ready-to-eat meal pouches.",
            "Waterproof Document Vault: Place photocopies of critical family documents (Aadhaar cards, passports, property deeds, medical prescriptions, insurance policies) in a double-sealed heavy-duty Ziploc bag, plus a waterproof USB drive with encrypted digital scans.",
            "Power & Communications: Pack a hand-crank or solar-powered emergency AM/FM radio, a high-capacity 20,000mAh power bank (kept charged to 100%), LED headlamps with spare lithium batteries, and an emergency signal whistle.",
            "Medical Trauma Kit: Pack sterile gauze pads, elastic roller bandages, antiseptic solution (Povidone-Iodine), burn cream, oral rehydration salts (ORS), and a 14-day supply of personal prescription medications.",
            "The Family Out-of-Area Anchor: Designate an aunt, uncle, or friend living in a DIFFERENT city as your family's emergency communication hub. During local grid blackouts, local calls fail but long-distance text messages often transmit."
        ],
        "example": {
            "title": "Meera's Disaster Preparedness",
            "scenario": "Meera builds a certified 72-hour family survival kit.",
            "steps": [
                "Purchases a rugged 45-liter waterproof backpack.",
                "Packs 20 water purification tablets and three 2-liter sealed water containers.",
                "Packs high-calorie chana, nuts, and ORS packets.",
                "Scans family Aadhaar cards, medical papers, and house deeds onto an encrypted waterproof USB stick.",
                "Packs two LED headlamps and a solar-crank radio.",
                "Designates her uncle in Bangalore as the out-of-city check-in anchor.",
                "When a cyclone triggers a 36-hour power and water blackout next season, Meera's family drinks clean water, monitors news on the crank radio, and stays safe calmly."
            ],
            "takeaway": "Maintaining a certified 72-hour Go-Bag and family evacuation protocol turns life-threatening disasters into safe, controlled survival."
        },
        "mistakes": [
            ("Relying entirely on a smartphone for flashlight, news, and navigation during a multi-day disaster.", "Phone batteries die within 12 hours, and cellular towers collapse during cyclones; always have an analog crank radio, battery headlamps, and paper maps."),
            ("Storing food that requires boiling water or electricity to eat (like raw instant noodles or rice).", "During floods, gas lines are shut off and clean cooking water is scarce; pack only ready-to-eat, no-cook food rations.")
        ],
        "checklist": [
            "Do I have a designated waterproof Go-Bag kept near the exit?",
            "Are water purification tablets and sealed drinking water rations packed?",
            "Are photocopies and encrypted USB scans of family identity papers sealed in waterproof bags?",
            "Do I have a hand-crank radio, charged power banks, and headlamps with spare batteries?",
            "Does my family have a designated out-of-area telephone contact anchor?"
        ],
        "prompt": "If your neighborhood lost all electricity, tap water, and cellular phone connectivity right now for 72 hours, what would you eat, drink, and do?",
        "takeaway": "Prepare before the storm, lead when it strikes: an all-hazards survival kit safeguards your family through every emergency.",
        "vis1": {"title": "The 72-Hour All-Hazards Go-Bag Architecture", "caption": "Water & Purification Tablets | Ready-to-Eat Calories | Medical Kit | Solar/Crank Radio & Headlamp | Waterproof Documents."},
        "vis2": {"title": "The Family Emergency Contact Triangle", "caption": "Local Grid Down -> Mom, Dad & Teen text Out-of-City Relative in distant city -> Central rendezvous confirmed."},
        "act": {
            "title": "The 72-Hour Household Disaster Kit Audit & Assembly",
            "obj": "Assemble, audit, and document a functional 72-hour family emergency survival kit and author a family evacuation rendezvous plan.",
            "steps": [
                "Audit current household emergency supplies against NDMA guidelines.",
                "Assemble the 5 core survival categories: Hydration/Purification, Nutrition, Medical/Trauma, Lighting/Power, and Waterproof Documentation.",
                "Test water purification tablets and check expiration dates on canned rations.",
                "Map out 2 physical family rendezvous evacuation points (one near home, one outside neighborhood).",
                "Program the out-of-area emergency contact phone number into all family devices."
            ],
            "output": "A fully assembled 72-Hour Family Go-Bag verified by an audit inventory sheet and a laminated Family Evacuation Map."
        },
        "guided": {
            "context": "An earthquake strikes while you are in your Class 9 second-floor classroom. Several students scream and rush toward the stairwell doors.",
            "optimal": "Shout firmly: 'Drop, Cover, and Hold On! Do not run for the stairs!' Drop under your sturdy classroom desk, cover your head and neck with your arms, and hold onto the desk legs until all shaking stops completely.",
            "opt_reason": "Stairwells collapse easily during earthquakes, and rushing creates fatal human crush stampedes; desks protect from falling concrete.",
            "non1": "Run toward the windows and look outside.",
            "non1_reason": "Shattering window glass causes severe lacerations and fatal falls.",
            "non2": "Jump into the elevator.",
            "non2_reason": "Elevator cables sever and power failures trap passengers in collapsing shafts.",
            "takeaway": "Drop, Cover, and Hold On under sturdy furniture; never run for stairs or elevators during tremors."
        },
        "indep": {
            "context": "How does the Sendai Framework for Disaster Risk Reduction (2015-2030) shift international disaster policy from reactive disaster response to proactive multi-hazard vulnerability reduction?",
            "prompt": "Evaluate disaster logistics supply chain resiliency, humanitarian Sphere Standards for water and sanitation, and early warning telemetry networks.",
            "rubric": "Comprehensive analysis of Sendai framework priorities, Sphere Minimum Standards in humanitarian response, seismic attenuation curves, and decentralized civil protection."
        },
        "quiz": {
            "q": "What is the primary rationale behind the international '72-Hour Rule' in emergency disaster preparedness?",
            "opt_correct": "In major regional disasters, it typically takes up to 72 hours for organized municipal rescue services and relief supplies to mobilize and reach stranded neighborhoods.",
            "opt_w1": "Disasters always end in exactly 72 hours.",
            "opt_w2": "The government requires everyone to sleep for 72 hours.",
            "opt_w3": "It takes 72 hours to charge a phone."
        },
        "rubric": {
            "task": "Assemble an all-hazards disaster survival kit, calculate hydration rations, verify emergency power and communications, and design family evacuation protocols.",
            "mastery": "Applies NDMA/Sphere guidelines accurately, calculates family water requirements, secures waterproof document archives, and establishes out-of-area communications.",
            "c1": "Disaster Management & 72-Hour Self-Sufficiency Literacy",
            "c2": "Survival Kit Architecture & Emergency Logistics",
            "c3": "Evacuation Protocol & Incident Command Planning"
        },
        "refs": [
            "What does the National Disaster Management Authority (NDMA) of India mandate regarding family disaster kits in their 'Pocket Book on Disaster Management'?",
            "What are the international Sphere Standards regarding minimum daily water requirements (15L per person per day for survival and sanitation)?",
            "How does the United Nations Disaster Risk Reduction (UNDRR) Sendai Framework prioritize household-level resilience?",
            "What did the 2004 Indian Ocean Tsunami and 2015 Nepal Earthquake teach civil defense engineers about the failure of cellular communication grids?"
        ]
    },

    # MONTH 8: Consumer Law, Contracts & Digital Subscription Management
    {
        "month": 8, "theme": "Consumer Contracts, Terms of Service & Online Privacy Policies", "seq": 1,
        "cat": "life_money_management", "cat_label": "Money Management & Financial Literacy",
        "title": "Deconstructing Terms of Service and Privacy Agreements: Dark Patterns and Auto-Renewals",
        "why": "Adolescents in Class 9 sign legal contracts every single week—by clicking 'I Agree' on smartphone apps, gaming platforms, and social media services without reading a single word. App developers deliberately use deceptive UI designs ('Dark Patterns'), forced arbitration clauses, intrusive data-scraping permissions, and recurring hidden auto-renewals that silently drain family bank accounts. Learning to decode digital contracts and disable dark patterns builds legal and financial vigilance.",
        "objs": [
            "Define 'Dark Patterns' in software UI: Roach Motel, Sneak into Basket, Confirmshaming, and Forced Continuity",
            "Deconstruct a standard Terms of Service (ToS) agreement: identifying data-ownership clauses, location tracking, and binding arbitration",
            "Audit active smartphone app permissions (microphone, camera, contacts, background location) and revoke unnecessary access",
            "Manage and cancel recurring digital subscriptions and auto-renewals across Apple App Store and Google Play platforms"
        ],
        "scenario": "Fourteen-year-old Tanay downloaded a photo-editing app that advertised a 'Free 3-Day Trial'. He clicked 'Agree' without reading. Five days later, his father received a credit card charge of Rs 4,999. When Tanay tried to cancel, the app had no cancel button, and buried in paragraph 42 of the Terms was an automatic annual subscription auto-renewal clause. Tanay felt swindled.",
        "expl": "When you click 'I Agree' on an app, you are signing a LEGALLY BINDING CONTRACT! Tech companies hire teams of behavioral psychologists and corporate lawyers to design 'Dark Patterns'—tricky user interfaces designed to manipulate you into buying things, surrendering personal data, or agreeing to auto-renewals. A classic dark pattern is the 'Roach Motel': extremely easy to check in (one click to sign up for a free trial), but nearly impossible to check out (requiring 15 hidden menus to cancel). Another is 'Forced Continuity': quietly charging your card full annual fees when a trial ends. Under Indian Consumer Protection (E-Commerce) Rules and CCPA guidelines, dark patterns are increasingly recognized as illegal unfair trade practices. Becoming digitally contract-literate protects your family from predatory digital traps.",
        "steps": [
            "Beware the 'Free Trial' Trap: Never enter credit card or UPI details for a 'Free Trial' unless you immediately set a calendar alarm to cancel it 24 hours BEFORE the trial ends.",
            "Spot the Roach Motel: If an app makes it one click to subscribe, but hides the cancellation link inside obscure settings menus, you are dealing with a deceptive dark pattern.",
            "Deconstruct ToS Red Flags: Use summary tools (like Terms of Service; Didn't Read - tosdr.org). Search ToS documents for keywords: 'Arbitration' (gives up right to sue), 'Perpetual License' (they own your uploaded photos forever), and 'Third-Party Advertisers' (they sell your data).",
            "Audit Smartphone App Permissions: Go to Phone Settings -> Privacy -> Permission Manager. Ask: 'Does a simple flashlight app really need access to my microphone, contacts, and precise location?' If no, revoke permissions immediately!",
            "Cancel at the Platform Level: Never try to cancel subscriptions inside the predatory app itself! Cancel through the master platform: Google Play Store -> Payments & Subscriptions -> Cancel Subscription (or Apple ID -> Subscriptions).",
            "Disable Auto-Debit E-Mandates: Manage UPI recurring mandates inside your banking app (like BHIM or GPay); cancel any unauthorized recurring merchant authorizations."
        ],
        "example": {
            "title": "Tanay's Digital Contract Victory",
            "scenario": "Tanay reverses the predatory photo app subscription.",
            "steps": [
                "Recognizes the 'Forced Continuity' dark pattern.",
                "Cancels the active recurring auto-renewal immediately through Google Play Subscriptions.",
                "Lodges a formal dispute citing misleading dark patterns under the Consumer Protection (Prevention and Regulation of Dark Patterns) Guidelines 2023.",
                "Submits a refund ticket via Google Play support: 'Unauthorized recurring charge triggered by deceptive cancellation obstruction.'",
                "Receives a 100% refund of Rs 4,999 within 48 hours.",
                "Audits all phone app permissions, revoking microphone access from 12 non-essential games.",
                "Educates his classmates on how to spot and disable subscription dark patterns."
            ],
            "takeaway": "Auditing subscriptions through platform settings and knowing dark pattern regulations protects your finances from digital predators."
        },
        "mistakes": [
            ("Deleting an app icon from your smartphone screen thinking that cancels the recurring monthly subscription.", "Deleting an app does NOT cancel your subscription! The cloud server will continue charging your card every month; you must formally cancel subscriptions in app store settings."),
            ("Clicking 'Allow All Permissions' when installing a game without reading what is requested.", "Games frequently monetize by selling background location and contact data to data brokers; restrict permissions strictly to basic gameplay.")
        ],
        "checklist": [
            "Did I set a cancellation reminder before starting any 'Free Trial'?",
            "Do I know how to navigate Google Play / Apple ID to view and cancel active subscriptions?",
            "Have I audited smartphone permissions to revoke non-essential microphone and location access?",
            "Can I identify common dark patterns (Roach Motel, Confirmshaming, Forced Continuity)?",
            "Do I know that deceptive dark patterns are regulated under Indian consumer law?"
        ],
        "prompt": "If a flashlight or calculator app demands access to your microphone, camera, and contact list, what is the app's real business model?",
        "takeaway": "Inspect the terms, disable the dark patterns: digital contract literacy safeguards your family's data and financial sovereignty.",
        "vis1": {"title": "The 4 Classic Software Dark Patterns", "caption": "Roach Motel (Easy in, impossible to cancel) | Forced Continuity (Silent auto-renewals) | Confirmshaming | Sneak into Basket."},
        "vis2": {"title": "The Master Platform Subscription Cancellation Pathway", "caption": "Never cancel in-app! Go to: App Store / Play Store Account -> Subscriptions -> Manage -> Cancel Auto-Renewal."},
        "act": {
            "title": "The App Permissions & Dark Pattern Forensic Audit",
            "obj": "Conduct a privacy and financial audit of 10 mobile apps on your device, identifying dark patterns, active subscriptions, and revoking intrusive permissions.",
            "steps": [
                "Open your smartphone's Application Permission Manager.",
                "Audit 10 installed apps: record which apps have Camera, Microphone, and Background Location permissions.",
                "Revoke unnecessary permissions from at least 4 non-essential apps.",
                "Audit your active subscription list on Google Play or Apple App Store.",
                "Review the Terms of Service of 1 popular social app on 'Terms of Service; Didn't Read' (tosdr.org) and document 3 data-privacy concerns."
            ],
            "output": "A completed Mobile App Permission & Digital Subscription Audit Report with documented permission revocations."
        },
        "guided": {
            "context": "A website popup offers you a 20% discount on shoes, with two buttons: a bright green button saying 'YES, I LOVE SAVING MONEY!' and a tiny gray button saying 'No thanks, I prefer paying full price like a fool.'",
            "optimal": "Recognize the manipulative 'Confirmshaming' dark pattern designed to shame you into compliance; click the 'No' option calmly without emotional guilt, or close the browser tab.",
            "opt_reason": "Identifies behavioral emotional manipulation designed to circumvent rational consumer decision-making.",
            "non1": "Feel insulted and click the green button to buy shoes you don't need.",
            "non1_reason": "Surrenders to emotional manipulation and wastes money.",
            "non2": "Scream at your computer screen in anger.",
            "non2_reason": "Emotional dysregulation over a standard commercial dark pattern.",
            "takeaway": "Recognize confirmshaming; never let a website manipulate your emotions into spending money."
        },
        "indep": {
            "context": "How do the 'Guidelines for Prevention and Regulation of Dark Patterns, 2023' issued by the Central Consumer Protection Authority (CCPA) legally define and prohibit unfair digital commercial practices in India?",
            "prompt": "Evaluate choice architecture (Thaler & Sunstein), asymmetric information in clickwrap contracts, adhesion contract unconscionability, and regulatory privacy architectures (DPDP Act 2023).",
            "rubric": "Comprehensive analysis of CCPA dark pattern typologies, Digital Personal Data Protection (DPDP) Act compliance, clickwrap vs browsewrap enforceability, and algorithmic behavioral nudging."
        },
        "quiz": {
            "q": "What is the 'Roach Motel' dark pattern in mobile applications and digital software design?",
            "opt_correct": "A user interface design that makes it extremely easy for a user to subscribe or sign up, but deliberately difficult or convoluted to cancel.",
            "opt_w1": "A pest control application for cleaning houses.",
            "opt_w2": "A hotel booking website with high discounts.",
            "opt_w3": "An app that crashes when bugs appear on the screen."
        },
        "rubric": {
            "task": "Decode software Terms of Service, diagnose UI dark patterns, audit smartphone permissions, and manage recurring platform subscription billing.",
            "mastery": "Identifies deceptive design patterns accurately, navigates platform subscription cancellation interfaces, audits privacy permissions, and cites Indian CCPA dark pattern regulations.",
            "c1": "Dark Pattern Typology & Behavioral Manipulation Literacy",
            "c2": "Digital Privacy Hardening & Permission Management",
            "c3": "Subscription Billing Architecture & Consumer Redressal"
        },
        "refs": [
            "What did Harry Brignull document when coining the term 'Dark Patterns' in 2010 (darkpatterns.org)?",
            "How do the Central Consumer Protection Authority (CCPA) 'Guidelines for Prevention and Regulation of Dark Patterns 2023' penalize misleading advertisements?",
            "What is 'Terms of Service; Didn't Read' (ToS;DR) and how does its crowdsourced rating system classify digital contract fairness?",
            "How does India's Digital Personal Data Protection Act (DPDP 2023) restrict processing personal data of children without parental consent?"
        ]
    },
    {
        "month": 8, "theme": "Consumer Contracts, Terms of Service & Online Privacy Policies", "seq": 2,
        "cat": "life_critical_thinking", "cat_label": "Critical Thinking & Everyday Problem-Solving",
        "title": "Sunk Cost Fallacy: Knowing When to Quit a Dead-End Project, Habit, or Commitment",
        "why": "Adolescents in Class 9 frequently cling to dead-end hobbies, miserable friendship circles, failing academic projects, or boring 800-page books simply because they have 'already invested so much time or money.' Falling for the 'Sunk Cost Fallacy' wastes finite youth, compounds emotional misery, and prevents pursuing vibrant new opportunities. Learning to write off sunk costs and make forward-looking decisions is the hallmark of rational maturity.",
        "objs": [
            "Define the 'Sunk Cost Fallacy' as the irrational tendency to continue an endeavor once an investment in money, effort, or time has been made",
            "Explain the economic principle: 'Sunk costs are unrecoverable; rational choices depend ONLY on future costs and future benefits'",
            "Apply the 'Clean Slate Test': If I were starting fresh today with zero past investment, would I choose to begin this?",
            "Execute an ethical, strategic project pivot without feeling personal failure or defeat"
        ],
        "scenario": "Fourteen-year-old Aditya spent Rs 3,000 of his savings and six months practicing the flute. He despised practicing, felt zero joy, and dreaded music lessons. When an opportunity arose to join the school robotics team that he was passionately excited about, he refused: 'I can't quit flute; I've already spent Rs 3,000 and six months! That would be a total waste!' So he spent another year being miserable.",
        "expl": "The past is gone forever; you cannot get yesterday's hours or spent money back! Economists have a golden rule: SUNK COSTS ARE SUNK! Whether Aditya continues playing the flute or quits, that Rs 3,000 and six months are already gone. The only question that matters for your life is: 'What is the BEST use of my NEXT hour and my NEXT rupee?' When you continue a miserable commitment just because you already invested time, you are wasting FUTURE time to justify PAST waste! Smart leaders, scientists, and investors are not quitters—they are PIVOTERS! They ruthlessly drop dead-end paths to redirect their precious energy toward high-yield passions.",
        "steps": [
            "Identify Sunk Cost Language: Watch for your brain saying: 'I've come this far, I can't stop now,' 'I've already spent so much time on this,' or 'If I quit, my past work was wasted.'",
            "Acknowledge the Reality: The past investment is unrecoverable. It is gone. Continuing does NOT bring it back; it only wastes tomorrow.",
            "Apply the Clean Slate Test: Imagine you woke up this morning with total amnesia of your past investments. Looking at this project, hobby, or friendship with fresh eyes: 'Would I choose to start this today?' If the answer is NO, you must quit or pivot.",
            "Reframe Quitting as Strategic Re-allocation: Quitting a dead-end is NOT failure; it is courageously freeing up your finite life energy for endeavors where you can truly excel.",
            "Harvest the Lessons: Sunk costs are never a total waste if you learned something! Celebrate what you discovered: 'The flute taught me breath control and musical tempo; now I will apply that discipline to robotics.'",
            "Execute the Graceful Exit: Step down from dead-end commitments politely and formally: 'I am grateful for what I learned, but my priorities have shifted, and I am stepping down to focus on new academic commitments.'"
        ],
        "example": {
            "title": "Aditya's Courageous Pivot",
            "scenario": "Aditya applies the Sunk Cost model to his extracurricular commitments.",
            "steps": [
                "Runs the Clean Slate Test: 'If I had never touched a flute, would I pay Rs 3,000 today to learn it? Absolutely not.'",
                "Realizes staying in flute to justify past costs is stealing his future happiness.",
                "Sells his flute on an online classifieds portal for Rs 2,000, recovering two-thirds of his money.",
                "Invests that Rs 2,000 into a robotics sensor kit.",
                "Joins the school robotics team with high enthusiasm.",
                "His team wins the regional championship within 6 months.",
                "Realizes that quitting a dead-end opened the door to his true calling."
            ],
            "takeaway": "Recognizing unrecoverable sunk costs frees your time and resources to pursue high-impact passions."
        },
        "mistakes": [
            ("Continuing to read a boring, unhelpful 500-page book simply because you finished the first 100 pages.", "Life is too short to read bad books; drop it immediately and pick up a book that inspires and educates you."),
            ("Staying in a toxic, draining friendship group because 'we've been friends since Class 2.'", "Shared history is not a lifetime contract; if a dynamic has become toxic and unfixable, pivot toward uplifting communities.")
        ],
        "checklist": [
            "Do I understand that past invested time and money cannot be recovered?",
            "Did I apply the Clean Slate Test (would I start this today)?",
            "Do I realize that quitting a dead-end is strategic resource reallocation, not failure?",
            "Have I harvested the lessons from the experience before stepping away?",
            "Did I execute my exit gracefully and professionally?"
        ],
        "prompt": "If you bought a movie ticket for Rs 300, and after 20 minutes the movie is unwatchable and giving you a headache, why is staying in the theater for another 2 hours making the situation worse?",
        "takeaway": "Write off the past, invest in the future: abandoning sunk costs is the ultimate key to continuous growth.",
        "vis1": {"title": "The Sunk Cost Fallacy Mental Trap", "caption": "Past Investment (Gone forever!) ---> Trapped Mindset: 'I can't quit now!' ---> Wasting FUTURE Time to justify PAST waste."},
        "vis2": {"title": "The Clean Slate Decision Test", "caption": "Erase the Past -> Ask: 'If starting fresh today, would I choose this?' -> If NO -> PIVOT IMMEDIATELY!"},
        "act": {
            "title": "The Sunk Cost Audit & Strategic Pivot Lab",
            "obj": "Conduct a personal commitment audit across academic projects, personal hobbies, and extracurriculars, evaluating dead-ends using the Clean Slate Test.",
            "steps": [
                "List your top 5 major time and financial commitments over the past 6 months.",
                "Identify any commitment that consistently generates dread, emotional drain, or zero growth.",
                "Apply the Clean Slate Test to that commitment.",
                "Calculate the opportunity cost: what exciting new skills or projects are being blocked by this dead-end?",
                "Draft a formal 'Strategic Pivot Plan' outlining an honorable exit and reallocation of hours."
            ],
            "output": "A completed Sunk Cost Commitment Audit Matrix and an authored Strategic Pivot Memo."
        },
        "guided": {
            "context": "You have spent 3 weeks building a science project model out of papier-mâché, but the frame is structurally cracked and collapsing. Fixing it will take 20 hours and it will still look clumsy, whereas rebuilding it fresh with balsa wood will take only 4 hours and look brilliant.",
            "optimal": "Toss the papier-mâché model into recycling immediately, write off the 3 weeks as valuable learning, and build the clean balsa wood model in 4 hours.",
            "opt_reason": "Bypasses the sunk cost trap to choose the objectively superior, faster future outcome.",
            "non1": "Spend 25 hours trying to glue the cracking papier-mâché model together with tape.",
            "non1_reason": "Wastes 25 hours on a guaranteed failure out of irrational attachment.",
            "non2": "Quit the science exhibition completely in despair.",
            "non2_reason": "Emotional overreaction that forfeits academic opportunity.",
            "takeaway": "Scrap failing prototypes without tears; build the better solution forward."
        },
        "indep": {
            "context": "How did Hal Arkes and Catherine Blumer experimentally demonstrate the sunk cost effect in human decision-making (the theater ticket and ski trip experiments)?",
            "prompt": "Evaluate prospect theory (loss aversion), cognitive dissonance reduction, self-justification theory (Festinger), and escalation of commitment (Staw) in organizational project management.",
            "rubric": "Comprehensive analysis of sunk cost psychology, Concorde fallacy in public mega-projects, loss aversion asymmetry (Kahneman & Tversky), and de-escalation intervention architectures."
        },
        "quiz": {
            "q": "What is the rational economic definition of a 'Sunk Cost'?",
            "opt_correct": "A cost that has already been incurred in the past and cannot be recovered, which should have zero influence on rational forward-looking decisions.",
            "opt_w1": "Money that was lost in an ocean shipwreck.",
            "opt_w2": "The cost of building a swimming pool.",
            "opt_w3": "An investment that is guaranteed to double in 3 days."
        },
        "rubric": {
            "task": "Explain the sunk cost fallacy, execute the Clean Slate Test, differentiate persistence from irrational escalation, and manage strategic pivots.",
            "mastery": "Articulates unrecoverable cost principles flawlessly, applies the Clean Slate Test to personal dilemmas, eliminates self-justification traps, and designs elegant pivot strategies.",
            "c1": "Sunk Cost Economics & Loss Aversion Literacy",
            "c2": "Clean Slate Testing & Epistemic Objectivity",
            "c3": "Strategic Resource Reallocation & Pivot Execution"
        },
        "refs": [
            "What did Hal R. Arkes and Catherine Blumer publish in their landmark 1985 paper 'The Psychology of Sunk Cost'?",
            "Why is the Sunk Cost Fallacy frequently referred to by economists as the 'Concorde Fallacy'?",
            "What did Barry Staw discover about the 'Escalation of Commitment' in failing business and military campaigns?",
            "How does Annie Duke analyze the strategic power of quitting in her book 'Quit: The Power of Knowing When to Walk Away'?"
        ]
    },
    {
        "month": 8, "theme": "Consumer Contracts, Terms of Service & Online Privacy Policies", "seq": 3,
        "cat": "life_communication", "cat_label": "Communication & Confidence",
        "title": "Negotiating High-Stakes Interpersonal Agreements: Creating Win-Win Compromises",
        "why": "When adolescents in Class 9 encounter serious interpersonal disagreements with parents (curfews, smartphone usage, study schedules) or peers (group project roles, shared spaces), they default to positional warfare: either stubborn demands ('My way or the highway!') or bitter resentment. Learning the Harvard Principled Negotiation method—focusing on underlying interests rather than rigid positions—creates collaborative win-win agreements.",
        "objs": [
            "Distinguish between 'Positional Bargaining' (stubborn stubborn digging-in) versus 'Principled Negotiation' (collaborative problem-solving)",
            "Identify the 4 pillars of the Harvard Negotiation Project: Separate people from problem, Focus on interests not positions, Invent options for mutual gain, Use objective criteria",
            "Deconstruct parental/peer positions to uncover underlying core emotional and safety interests",
            "Author a formal 'Win-Win Interpersonal Agreement' with clear deliverables, review dates, and accountability clauses"
        ],
        "scenario": "Fourteen-year-old Tanvi wanted to attend an evening birthday party that ended at 10:30 PM. Her parents said: 'No, you must be home by 8:00 PM.' Tanvi screamed: 'You treat me like a baby! I hate you!' Her parents locked the door and grounded her. Both sides dug into their rigid positions, destroying family peace.",
        "expl": "Negotiation is NOT a tug-of-war where one person must lose for the other to win; it is two partners standing side-by-side solving a shared puzzle! Developed by Harvard Law School scholars Roger Fisher and William Ury, Principled Negotiation moves you from fighting over POSITIONS (Tanvi says 10:30 PM, Parents say 8:00 PM) to understanding underlying INTERESTS! What is Tanvi's real interest? Having fun and bonding with friends. What is her parents' real interest? Safety and knowing she won't be traveling alone on dark streets at midnight. When you solve for the underlying INTERESTS, win-win solutions appear: for example, Tanvi attends until 10:30 PM, and her father coordinates with another parent to pick them up directly from the venue door! Both sides get 100% of what they actually need.",
        "steps": [
            "Separate the People from the Problem: Do not attack character ('You're overprotective control freaks'). Treat family and friends with deep love, while treating the scheduling problem with analytical rigor.",
            "Focus on Interests, Not Positions: A position is what you DECIDED (e.g. 'I want to stay out until 10:30 PM'). An interest is the underlying NEED that caused that decision (e.g. 'I want to watch the cake cutting and not feel excluded'). Ask: 'Why is that important to you?'",
            "Discover the Other Party's Core Interest: Ask parents calmly: 'What specifically worries you about 10:30 PM (transit safety, sleep, or homework)?' Listen without interrupting.",
            "Brainstorm Multiple Options for Mutual Gain: Do not settle on one rigid solution. Generate 3 creative options: Option 1: Father picks up Tanvi and two friends at 10:15 PM. Option 2: Tanvi finishes all homework by Friday afternoon and shares live location on WhatsApp. Option 3: Host parents vouch for adult supervision.",
            "Anchor in Objective Criteria: Use objective standards of fairness rather than willpower: local transit safety data, school study guidelines, or verified peer parent networks.",
            "Write Down the Agreement: Document the negotiated compromise: 'Parties agree to 10:15 PM pickup with finished homework. Review in 30 days.' Both sign with a smile."
        ],
        "example": {
            "title": "Tanvi's Harvard Negotiation",
            "scenario": "Tanvi negotiates her evening party agreement using principled negotiation.",
            "steps": [
                "Apologizes for screaming and initiates a calm conversation after dinner.",
                "Separates people from problem: 'Mom, Dad, I know you love me and want me safe.'",
                "Uncovers parental interests: discovers parents are terrified of her traveling in an auto-rickshaw after dark.",
                "Proposes a win-win option: 'If Uncle Sharma and Dad take turns picking us up directly from the party gate in a car at 10:00 PM, my safety is 100% guaranteed, and I get to celebrate with my friends.'",
                "Parents smile and agree immediately: 'That solves our safety concern completely.'",
                "Tanvi attends the party, has a wonderful time, and earns deep parental trust."
            ],
            "takeaway": "Focusing on underlying interests and inventing win-win options resolves conflicts that screaming could never settle."
        },
        "mistakes": [
            ("Digging into stubborn ultimatums ('Either I stay until 10:30 or I will never speak to you again!').", "Ultimatums trigger authoritarian pushback and force the other person to defend their pride; always offer collaborative options."),
            ("Viewing negotiation as a battlefield where compromising means 'losing.'", "Principled negotiation expands the pie so both sides win; it is the highest form of emotional intelligence.")
        ],
        "checklist": [
            "Did I separate the person from the practical problem?",
            "Did I identify the underlying interests beneath our rigid positions?",
            "Did I listen to the other party's core safety/emotional needs without interrupting?",
            "Did I brainstorm multiple creative options for mutual gain?",
            "Did we author a written, mutually agreed-upon compromise?"
        ],
        "prompt": "Why does solving someone else's primary worry make them eager to give you what you want?",
        "takeaway": "Focus on interests, create mutual gain: principled negotiation turns bitter standoffs into lasting collaborative agreements.",
        "vis1": {"title": "Positional Bargaining vs Principled Negotiation", "caption": "Positional (Rigid Demands: Win/Lose tug-of-war) <---> Principled (Underlying Interests: Mutual Win/Win puzzle)."},
        "vis2": {"title": "The 4 Harvard Negotiation Pillars", "caption": "1. Separate People from Problem | 2. Focus on Interests | 3. Invent Mutual Gain Options | 4. Use Objective Criteria."},
        "act": {
            "title": "The Principled Negotiation & Win-Win Agreement Lab",
            "obj": "Structure and execute a principled negotiation on a real-life family or peer friction point, authoring a formal Win-Win Compromise Contract.",
            "steps": [
                "Identify an active area of disagreement (e.g. weekend curfew, smartphone screen limits, division of household chores, or group project roles).",
                "Map out both parties' surface Positions and underlying deep Interests.",
                "Brainstorm at least 3 innovative 'Mutual Gain' compromise options.",
                "Conduct a 15-minute principled negotiation dialogue using non-accusatory language.",
                "Author a 1-page formal written 'Interpersonal Agreement' signed by both parties with a 30-day review date."
            ],
            "output": "A fully charted Positions vs Interests Diagnostic Map and a signed, bilateral Win-Win Interpersonal Agreement."
        },
        "guided": {
            "context": "Your group project partner wants to do the oral presentation, but you also want to do the oral presentation, and neither of you is willing to back down.",
            "optimal": "Uncover interests: ask why they want to present. If they want public speaking practice and you want to ensure the visual slides are explained accurately, propose a co-presentation: divide the 10-minute speech into two 5-minute sections with equal stage time.",
            "opt_reason": "Creates an elegant win-win synthesis where both partners achieve their presentation goals without conflict.",
            "non1": "Complain to the teacher that your partner is selfish and demand they be removed.",
            "non1_reason": "Childish tattling that destroys team trust.",
            "non2": "Silently pout, let them do it, and sabotage the slides.",
            "non2_reason": "Passive-aggressive sabotage that ruins your own grade.",
            "takeaway": "Divide the stage or combine strengths; collaborative synthesis beats stubborn pride."
        },
        "indep": {
            "context": "How does the 'Integrative Bargaining' framework (expanding the pie) mathematically transcend zero-sum Pareto efficiency in game-theoretic negotiations?",
            "prompt": "Evaluate BATNA, reservation values, logrolling, interest-based bargaining (Fisher & Ury), and Nash equilibrium in multi-issue negotiations.",
            "rubric": "Comprehensive analysis of integrative vs distributive bargaining, non-zero-sum game theory, cognitive framing effects, and value creation mechanisms."
        },
        "quiz": {
            "q": "What is the core breakthrough principle of the Harvard Principled Negotiation method formulated by Fisher and Ury?",
            "opt_correct": "Focusing on underlying interests and needs rather than digging into stubborn surface positions, and inventing options for mutual gain.",
            "opt_w1": "Shouting louder than the other person until they give up.",
            "opt_w2": "Flipping a coin to decide who wins.",
            "opt_w3": "Always letting the other person have everything they want."
        },
        "rubric": {
            "task": "Apply principled negotiation principles, differentiate positions from interests, generate mutual gain options, and draft written interpersonal agreements.",
            "mastery": "Identifies underlying psychological interests accurately, avoids positional lock-in, brainstorms innovative win-win options, and authors enforceable bilateral agreements.",
            "c1": "Harvard Principled Negotiation Theory Literacy",
            "c2": "Positions vs Interests Diagnostics & Empathy",
            "c3": "Mutual Gain Innovation & Agreement Authoring"
        },
        "refs": [
            "What did Roger Fisher and William Ury establish in their foundational text 'Getting to Yes: Negotiating Agreement Without Giving In'?",
            "How does Chris Voss apply behavioral negotiation techniques in 'Never Split the Difference: Negotiating As If Your Life Depended On It'?",
            "What is 'Logrolling' in multi-issue negotiation (trading low-priority issues for high-priority concessions)?",
            "Why is emotional de-escalation considered the necessary biological prerequisite for integrative problem-solving?"
        ]
    }
]

print(f"Months 5-8 authored successfully ({len(months_5_to_8)} modules).")


