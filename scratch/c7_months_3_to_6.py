# scratch/c7_months_3_to_6.py

months_3_to_6 = [
    # MONTH 3: Teen Budgeting & Opportunity Cost
    {
        "month": 3, "theme": "Teen Budgeting, Expense Tracking & Opportunity Cost", "seq": 1,
        "cat": "life_money_management", "cat_label": "Money Management & Financial Literacy",
        "title": "The 50/30/20 Teen Budget: Needs, Wants, and Future Savings",
        "why": "Receiving pocket money or festival gifts without a budget structure results in spending everything on junk snacks in 4 days and having zero savings for meaningful goals. The 50/30/20 rule balances fun with lifelong wealth habits.",
        "objs": [
            "Deconstruct monthly income/pocket money into 3 percentage categories: 50% Needs, 30% Wants, and 20% Future Savings",
            "Differentiate strictly between a Need (essential stationery, bus fare, school supplies) and a Want (fancy snacks, gaming skins, trendy shoes)",
            "Allocate a minimum 20% to an untouched 'Future Dreams' savings reserve",
            "Perform a mid-month budget balance audit to adjust spending before running out of funds"
        ],
        "scenario": "Zain received ₹1,000 monthly allowance from his parents to cover school bus snacks, notebooks, and personal spending. By the 8th of the month, he had spent ₹850 on fast food and arcade games, leaving ₹150 for the remaining 22 days.",
        "expl": "A budget is your financial steering wheel! Without it, money drives straight into a ditch. The 50/30/20 framework used by top financial planners works brilliantly for students too: 50% (₹500) covers your practical Needs. 30% (₹300) is guilt-free fun money for your Wants. And 20% (₹200) goes directly into savings before you spend a single rupee.",
        "steps": [
            "Record your total monthly inflow at the top of your ledger (e.g. ₹1,000).",
            "Category 1 (Needs - 50% = ₹500): Mandatory stationery, school project charts, emergency bus fare.",
            "Category 2 (Wants - 30% = ₹300): Canteen samosas, comic books, weekend ice cream with friends.",
            "Category 3 (Savings - 20% = ₹200): Put directly into your locked savings bank or gullak on Day 1 (Pay Yourself First!).",
            "The Envelope System: Divide physical or digital cash into 3 labeled envelopes: Needs, Wants, Savings.",
            "The Hard Stop: When the 'Wants' envelope is empty, stop spending on luxuries until the 1st of next month."
        ],
        "example": {
            "title": "Zain's Budget Turnaround",
            "scenario": "Zain implements the 50/30/20 system.",
            "steps": [
                "Deposits ₹200 into his locked savings jar immediately on Day 1.",
                "Puts ₹500 into his Needs envelope for art supplies and geometry box.",
                "Keeps ₹300 in his Wants envelope, spending ₹75 per week on canteen snacks.",
                "At the end of 6 months, his savings jar holds ₹1,200!",
                "Buys his own professional badminton racket with pure pride."
            ],
            "takeaway": "Paying yourself 20% first ensures you build savings effortlessly while still enjoying guilt-free fun money."
        },
        "mistakes": [
            ("Treating a new video game or trendy branded t-shirt as a 'Need'.", "Needs are essentials required for health and school; luxuries and entertainment are always Wants."),
            ("Saving only 'whatever is left over' at the end of the month.", "There is NEVER anything left over; always transfer 20% to savings on the day you receive money.")
        ],
        "checklist": [
            "Did I transfer 20% into savings on Day 1 before spending anything?",
            "Are my mandatory school expenses budgeted under the 50% Needs limit?",
            "Is my recreation spending capped strictly at 30%?",
            "Do I stop spending on treats when the Wants budget runs out?"
        ],
        "prompt": "How does having a designated 'Wants' budget let you enjoy ice cream without feeling guilty about spending?",
        "takeaway": "50 Needs, 30 Wants, 20 Savings: the golden ratio gives you financial freedom today and wealth tomorrow.",
        "vis1": {"title": "The 50/30/20 Pie Chart", "caption": "50% Needs (School essentials) | 30% Wants (Fun, treats) | 20% Savings (Future dreams)."},
        "vis2": {"title": "The 3 Envelopes Method", "caption": "Divide physical cash into Needs, Wants, and Savings envelopes on Day 1. When Wants is empty, stop!"},
        "act": {
            "title": "The 1-Month 50/30/20 Budget Setup",
            "obj": "Create an itemized 50/30/20 monthly budget for your personal pocket money or a hypothetical ₹1,000 monthly allowance.",
            "steps": [
                "Establish total monthly budget pool.",
                "Calculate exact rupee amounts for 50%, 30%, and 20%.",
                "List specific items under Needs (₹500 limit).",
                "List permitted fun purchases under Wants (₹300 limit).",
                "Define a specific dream goal for the 20% savings reserve."
            ],
            "output": "A complete 1-page Itemized 50/30/20 Budget Blueprint signed by student and parent."
        },
        "guided": {
            "context": "On the 15th of the month, your 'Wants' envelope is completely empty, and your friends invite you to an expensive café.",
            "optimal": "Suggest meeting them at the community park for cycling or eating a homemade snack together before going, explaining honestly: 'My fun budget is spent for this fortnight; let's hang out at the park!'",
            "opt_reason": "Respects personal financial discipline while offering social connection that costs zero money.",
            "non1": "Raid your 'Needs' or 'Savings' envelope to buy café milkshakes.",
            "non1_reason": "Destroys budget integrity and leaves you unable to buy required school supplies.",
            "non2": "Lie and claim your parents locked you in the house.",
            "non2_reason": "Dishonest and avoids taking pride in personal financial responsibility.",
            "takeaway": "True friends respect financial boundaries; suggest free fun activities when your budget is met."
        },
        "indep": {
            "context": "You receive a special ₹500 festival cash gift from visiting relatives.",
            "prompt": "Explain how you will allocate this windfall using the 50/30/20 rule.",
            "rubric": "Allocated ₹100 to savings (20%), ₹250 to practical supplies/books (50%), ₹150 to celebration treats (30%)."
        },
        "quiz": {
            "q": "What is the core principle of 'Pay Yourself First' in the 50/30/20 budget framework?",
            "opt_correct": "Transferring the 20% savings portion into your savings vault immediately upon receiving money, before spending on anything else.",
            "opt_w1": "Buying yourself candy before buying textbooks.",
            "opt_w2": "Demanding a 50% increase in allowance from parents.",
            "opt_w3": "Spending 100% of money on clothes you like."
        },
        "rubric": {
            "task": "Construct, balance, and execute a 50/30/20 budget allocating resources across needs, wants, and savings.",
            "mastery": "Categorizes expenses rigorously, prioritizes 20% savings upfront, enforces wants caps, articulates trade-off decisions with maturity.",
            "c1": "Needs vs Wants Discrimination",
            "c2": "Budget Allocation & Mathematical Discipline (50/30/20)",
            "c3": "Delayed Gratification & Goal Setting"
        },
        "refs": [
            "Who is Senator Elizabeth Warren and how did her book popularize the 50/30/20 budgeting rule globally?",
            "How do automated recurring bank deposits help adults save 20% of their salary effortlessly?",
            "What is 'lifestyle inflation' and why do people who earn more money often end up with zero savings?",
            "How does tracking expenses build mathematical confidence and practical financial independence?"
        ]
    },
    {
        "month": 3, "theme": "Teen Budgeting, Expense Tracking & Opportunity Cost", "seq": 2,
        "cat": "life_money_management", "cat_label": "Money Management & Financial Literacy",
        "title": "Tracking Every Rupee: The 30-Day Expense Ledger in a Notebook",
        "why": "Where does all your money go? Small daily leaks—₹20 here for chips, ₹15 for a printout, ₹40 for a soft drink—add up to hundreds of vanished rupees without you realizing it. Keeping a daily expense ledger reveals hidden financial leaks.",
        "objs": [
            "Maintain a 5-column pocket ledger: Date, Description, Category (Need/Want), Outflow (₹), Inflow (₹), and Running Balance",
            "Log every single cash and digital expense within 12 hours of the transaction",
            "Identify the 'Latte Factor / Samosa Leak': recurring small impulse purchases that drain large amounts over time",
            "Conduct a weekly balance reconciliation comparing actual physical cash in wallet to ledger balance"
        ],
        "scenario": "Tanvi started the month with ₹600. After two weeks, she opened her coin purse and found only ₹40 left. She had zero big purchases and had no idea where the ₹560 had gone.",
        "expl": "Money has a magical ability to evaporate if you don't watch it! A big leak in a boat is easy to spot; it's the tiny pinhole leaks that sink ships unnoticed. Recording every single rupee spent in a simple pocket notebook turns on the lights so you can see exactly where your wealth is flowing.",
        "steps": [
            "Dedicate a small pocket notebook or digital note sheet as your 'Personal Cash Ledger'.",
            "Draw 5 columns: Date | Description | Category (Need/Want) | Amount Spent (-) | Balance Remaining.",
            "The 12-Hour Rule: Record every purchase before going to sleep; never rely on memory days later.",
            "Keep all physical receipts and ticket stubs in an envelope inside the back cover.",
            "Weekly Audit: On Sunday afternoon, calculate total spent on Needs vs total spent on Wants.",
            "Spot the Leak: Multiply small daily habits by 30 (e.g. ₹20 juice daily = ₹600 per month!) to see their true annual impact."
        ],
        "example": {
            "title": "Tanvi's Samosa Revelation",
            "scenario": "Tanvi tracks every rupee for two weeks.",
            "steps": [
                "Discovers she bought ₹25 packaged chips almost every day after school.",
                "Calculates: ₹25 × 20 school days = ₹500 spent on empty calories alone!",
                "Switches to packing roasted peanuts and homemade fruit from home.",
                "Saves ₹450 every month effortlessly.",
                "Her wallet balance remains healthy and transparent."
            ],
            "takeaway": "Tracking expenses reveals invisible daily leaks and gives you the power to plug them."
        },
        "mistakes": [
            ("Writing 'Misc' or 'Others' for half your expenses.", "Vague labels hide wasteful habits; always write the specific item (e.g. 'Cola can', 'Eraser')."),
            ("Giving up after missing one day of tracking.", "If you miss a day, estimate the balance and resume immediately; consistency over 30 days builds the habit.")
        ],
        "checklist": [
            "Are all 5 ledger columns laid out cleanly?",
            "Did I log every transaction from today?",
            "Does the running balance match the physical cash in my pocket?",
            "Have I calculated my weekly total in Wants vs Needs?"
        ],
        "prompt": "What is one small daily purchase you make that costs more than ₹500 when multiplied across an entire month?",
        "takeaway": "Track the drops, save the ocean: a daily 30-day expense ledger turns money chaos into total clarity.",
        "vis1": {"title": "The 5-Column Expense Ledger Layout", "caption": "Date | Item Description | Need/Want | Amount (₹) | Running Balance (₹)."},
        "vis2": {"title": "The Samosa Leak Multiplier", "caption": "₹25 daily treat = ₹175 per week = ₹750 per month = ₹9,000 PER YEAR! Small leaks sink big ships."},
        "act": {
            "title": "The 30-Day Rupee Tracking Challenge",
            "obj": "Maintain an uninterrupted 30-day personal expense ledger logging every cash and digital inflow and outflow.",
            "steps": [
                "Set up a dedicated pocket notebook with the 5 standard ledger columns.",
                "Record starting cash on Day 1.",
                "Log all transactions daily with exact descriptions and categories.",
                "Reconcile running balance with physical cash every Sunday.",
                "Write a 1-page financial reflection at Day 30 analyzing top spending leaks."
            ],
            "output": "A completed 30-Day Personal Cash Ledger with weekly reconciliations and a final spending analysis."
        },
        "guided": {
            "context": "At the end of the week, your ledger says you should have ₹180, but your wallet only contains ₹130 (₹50 missing).",
            "optimal": "Pause and retrace past 3 days of purchases to identify the unlogged item (e.g. ₹50 auto-rickshaw fare). Add the entry to reconcile the ledger accurately.",
            "opt_reason": "Teaches investigative financial reconciliation rather than ignoring discrepancies.",
            "non1": "Throw the ledger away because 'math is too hard'.",
            "non1_reason": "Gives up at the first friction point and abandons financial literacy.",
            "non2": "Blame a family member for stealing ₹50.",
            "non2_reason": "Unjustified accusation resulting from poor personal record keeping.",
            "takeaway": "Discrepancies are puzzles to solve; retrace your steps and reconcile the balance."
        },
        "indep": {
            "context": "How can modern digital payment apps make people spend more money than paying with physical paper cash notes?",
            "prompt": "Explain the psychological 'Pain of Paying' with physical paper rupee notes versus painless digital swiping.",
            "rubric": "Explained physical sensory loss of handing over physical notes vs frictionless taps reducing psychological resistance."
        },
        "quiz": {
            "q": "What is the 'Latte Factor' or 'Daily Leak' in personal financial literacy?",
            "opt_correct": "The concept that tiny, seemingly insignificant daily spending habits (like snacks or cold drinks) multiply into massive sums of lost money over a month or year.",
            "opt_w1": "A recipe for making sweet milky coffee.",
            "opt_w2": "A mathematical formula used only by rocket scientists.",
            "opt_w3": "The price of milk cartons in European supermarkets."
        },
        "rubric": {
            "task": "Maintain a rigorous financial expense ledger, perform regular reconciliations, and identify spending leak patterns.",
            "mastery": "Logs transactions within 12 hours consistently, categorizes spending accurately, reconciles discrepancies methodically, formulates leak reduction plans.",
            "c1": "Record-Keeping Rigor & Timeliness",
            "c2": "Mathematical Reconciliation & Accuracy",
            "c3": "Spending Leak Identification & Remediation"
        },
        "refs": [
            "Who is David Bach and how did his book 'The Automatic Millionaire' popularize the Latte Factor concept?",
            "How do commercial corporate accountants conduct monthly bank reconciliation audits?",
            "What simple mobile budgeting apps exist for young adults to track digital and cash expenses?",
            "How does tracking your spending give you greater confidence when negotiating allowance with parents?"
        ]
    },
    {
        "month": 3, "theme": "Teen Budgeting, Expense Tracking & Opportunity Cost", "seq": 3,
        "cat": "life_money_management", "cat_label": "Money Management & Financial Literacy",
        "title": "Calculating Opportunity Cost: 'If I Buy This ₹500 Game, What Do I Give Up?'",
        "why": "Every time you spend money on one thing, you automatically sacrifice the opportunity to buy something else. Understanding opportunity cost breaks impulse buying and leads to deliberate, mature choices.",
        "objs": [
            "Define 'Opportunity Cost': The value of the next best alternative given up when making a choice",
            "Ask the Golden Decision Question before any major purchase: 'If I spend ₹X on this now, what am I saying NO to?'",
            "Compare instant short-term gratification against lasting long-term value",
            "Calculate trade-offs between physical items, experiences, and future financial freedom"
        ],
        "scenario": "Karan had saved ₹800 over four months toward a ₹1,200 scientific telescope. At the mall, he saw a limited-edition branded graphic t-shirt for ₹750 and was ready to buy it immediately.",
        "expl": "Money is finite! You cannot spend the same rupee twice. When you buy the t-shirt, you aren't just buying clothes; you are actively saying NO to seeing the rings of Saturn through your telescope! Opportunity cost is the invisible price tag on every choice. Asking 'What am I giving up?' makes invisible trade-offs crystal clear.",
        "steps": [
            "Identify the Potential Purchase: Item name and exact price (e.g., T-shirt @ ₹750).",
            "Identify the Sacrificed Alternative: What existing goal or future experience loses funding? (Telescope fund delayed by 4 months).",
            "Apply the Joy Longevity Test: How much joy will the t-shirt give you in 6 months? (It will be just an old shirt in the laundry).",
            "Compare to the Long-term Goal: How much joy will the telescope give you in 6 months? (Years of stargazing with family).",
            "Weigh the trade-off rationally: Does the immediate impulse beat the long-term dream?",
            "Walk away from the impulse purchase with pride in your self-control."
        ],
        "example": {
            "title": "Karan's Stargazing Victory",
            "scenario": "Karan calculates the opportunity cost.",
            "steps": [
                "Asks: 'If I buy this shirt, what do I give up?'",
                "Realizes it delays his telescope until next year.",
                "Recognizes he already has 8 clean t-shirts at home.",
                "Puts the shirt back on the rack.",
                "Six weeks later, reaches ₹1,200 and buys his telescope.",
                "Views Jupiter's moons with his father on a clear winter night."
            ],
            "takeaway": "Sacrificing temporary impulse purchases unlocks lifelong, deeply rewarding dreams."
        },
        "mistakes": [
            ("Thinking that having enough cash in hand means you can 'afford' an impulse buy.", "Just because you have the money in your pocket doesn't mean you can afford it without sacrificing your bigger dreams."),
            ("Viewing opportunity cost only in money, ignoring time and energy trade-offs.", "Spending 4 hours playing video games has an opportunity cost of 4 hours of football practice or sleep.")
        ],
        "checklist": [
            "Did I ask: 'If I buy this, what am I saying NO to?'",
            "How long will the joy from this purchase realistically last (days vs years)?",
            "Does this purchase delay or sabotage my primary savings goal?",
            "Am I choosing short-term impulse over long-term pride?"
        ],
        "prompt": "Think of a past impulse purchase that you were excited about for 2 days and now sits forgotten in a drawer. What did you sacrifice for it?",
        "takeaway": "Every choice has an invisible price: calculating opportunity cost turns impulsive cravings into deliberate, powerful choices.",
        "vis1": {"title": "The Opportunity Cost Scale", "caption": "Left Pan: Instant Treat (T-shirt, 2 days joy) <---> Right Pan: Big Dream (Telescope, years of discovery)."},
        "vis2": {"title": "The Joy Longevity Curve", "caption": "Impulse Snack: Joy drops to zero in 20 mins. Long-term Asset: Joy and utility endure for years!"},
        "act": {
            "title": "The Opportunity Cost Decision Matrix",
            "obj": "Evaluate 2 significant past or planned purchases using a formal Opportunity Cost Matrix.",
            "steps": [
                "Select a recent or upcoming purchase over ₹500.",
                "Identify Option A (The Purchase) and Option B (The Next Best Alternative).",
                "Compare Joy Longevity (1 week, 1 month, 1 year).",
                "Calculate the trade-off in financial terms and time invested.",
                "Document your final conscious decision."
            ],
            "output": "A completed Opportunity Cost Trade-Off Matrix with documented rationale."
        },
        "guided": {
            "context": "You have ₹600 saved. You can buy 3 movie theatre popcorn tubs with friends this weekend OR buy the latest volume of your favorite book series that you will read 10 times.",
            "optimal": "Calculate the opportunity cost: 45 minutes of salty snacks versus a permanent book you treasure. Choose to eat a home snack before the movie and buy the book with your savings.",
            "opt_reason": "Optimizes value by enjoying the movie experience without blowing money on overpriced popcorn, securing lasting literary joy.",
            "non1": "Buy the popcorn, run out of money, and regret not having the book for the next 3 months.",
            "non1_reason": "Surrenders long-term lasting value for temporary fleeting consumption.",
            "non2": "Refuse to go to the movies with friends at all and sulk at home.",
            "non2_reason": "Sacrifices healthy social friendship needlessly when creative compromises exist.",
            "takeaway": "Enjoy shared social outings while bypassing overpriced concession traps."
        },
        "indep": {
            "context": "Explain how spending 3 hours every evening gaming has an opportunity cost in physical health and sports development.",
            "prompt": "Apply opportunity cost to time allocation between screen gaming and athletic team practice.",
            "rubric": "Articulated physical stamina, cardiovascular health, team camaraderie, and motor skill development sacrificed for sedentary gaming."
        },
        "quiz": {
            "q": "What is the economic definition of 'Opportunity Cost'?",
            "opt_correct": "The value of the next best alternative that you must give up when you choose to allocate limited money or time to something else.",
            "opt_w1": "The cost of shipping an item from another country.",
            "opt_w2": "The discount offered on Black Friday sales.",
            "opt_w3": "The penalty fee banks charge for bouncing a cheque."
        },
        "rubric": {
            "task": "Apply opportunity cost principles to analyze trade-offs, evaluate joy longevity, and make conscious financial choices.",
            "mastery": "Identifies next-best alternatives explicitly, calculates long-term utility curves, resists short-term impulse triggers, explains trade-off logic clearly.",
            "c1": "Opportunity Cost Conceptual Mastery",
            "c2": "Temporal Joy & Utility Evaluation",
            "c3": "Conscious Decision-Making & Trade-Off Defense"
        },
        "refs": [
            "Why is opportunity cost considered the foundational core principle of all modern economics?",
            "How do venture capitalists evaluate opportunity cost when deciding which startup companies to fund?",
            "How can understanding opportunity cost help you choose which school clubs or sports teams to join?",
            "Why does billionaire investor Warren Buffett avoid buying luxury sports cars?"
        ]
    },

    # MONTH 4: First Aid & Emergency Response
    {
        "month": 4, "theme": "First Aid Protocols, Sprain Management & Calling 112", "seq": 1,
        "cat": "life_safety_health", "cat_label": "Safety, Health & Well-being",
        "title": "First Aid for Minor Burns & Scalds: Cool Water Flush vs Dangerous Toothpaste Myths",
        "why": "Applying toothpaste, butter, or ice cubes to kitchen burns traps scorching heat inside skin tissues and causes severe infections. Practicing immediate, 20-minute cool running water flushing prevents deep tissue blistering and scarring.",
        "objs": [
            "Differentiate between 1st degree (red surface skin), 2nd degree (blistering), and 3rd degree (charred/white deep tissue) burns",
            "Execute the Golden Burn Protocol: Cool running water (15°C to 20°C) for a minimum of 20 continuous minutes",
            "Debunk dangerous folk myths: never apply toothpaste, butter, raw eggs, ice cubes, or turmeric to fresh burns",
            "Cover burns loosely with sterile cling wrap or clean non-stick gauze without popping blisters"
        ],
        "scenario": "While helping in the kitchen, Riya brushed her forearm against the hot metal rim of a boiling pressure cooker. In a panic, her cousin grabbed a tube of mint toothpaste and smeared it all over the red burn.",
        "expl": "A burn is trapped heat cooking deeper and deeper into your living skin layers! Applying toothpaste, butter, or turmeric acts like an insulating thermal blanket that traps the burning heat inside, cooking your skin cells and introducing mouth bacteria into open wounds. The ONLY medical treatment for a fresh burn is 20 continuous minutes of cool running tap water. Water draws the heat OUT of the skin.",
        "steps": [
            "Step 1 (Immediate Water Flush): Walk to the sink immediately; hold the burned skin under gentle, cool running tap water.",
            "The 20-Minute Timer: Keep the water flowing over the burn for a full 20 minutes by the clock (do NOT stop after 30 seconds).",
            "Never Use Ice: Ice causes frostbite tissue damage on already injured skin; use room-temperature or cool running tap water.",
            "Remove Constricting Jewelry: Gently slide off rings, bracelets, or watches near the burn before swelling begins.",
            "Protect: Cover the area loosely with clean plastic cling wrap (ideal because it doesn't stick to raw skin) or sterile non-stick gauze.",
            "Golden Medical Rule: NEVER pop, pierce, or peel blisters; blisters are nature's sterile biological bandage protecting raw skin from infection.",
            "Seek Medical Care: If the burn is larger than the palm of your hand, blistered on face/hands, or charred white, visit a hospital immediately."
        ],
        "example": {
            "title": "Riya's 20-Minute Water Rescue",
            "scenario": "Riya rinses off the toothpaste and applies proper first aid.",
            "steps": [
                "Gently washes off the irritating toothpaste with cool water.",
                "Keeps arm under running kitchen tap for 20 continuous minutes.",
                "The intense stinging burning sensation drops by 80%.",
                "Covers loosely with clean food cling wrap.",
                "Skin heals completely within 5 days with zero blistering or permanent scar."
            ],
            "takeaway": "Twenty minutes of cool running tap water draws heat out of the skin and prevents permanent burn scarring."
        },
        "mistakes": [
            ("Smearing toothpaste, butter, flour, or raw eggs over a fresh burn.", "These trap heat inside the wound, cause severe infections, and must be painfully scrubbed off by emergency doctors."),
            ("Applying freezing ice cubes directly onto burned flesh.", "Extreme freezing temperatures cause secondary thermal shock and cellular frostbite; use cool tap water only.")
        ],
        "checklist": [
            "Is the burn held under cool running water for a full 20 minutes?",
            "Are constricting rings and bracelets removed before swelling?",
            "Are all home remedies (toothpaste, butter, ice) strictly avoided?",
            "Are all blisters left intact without popping?",
            "Is the burn covered loosely with non-stick wrap or sterile gauze?"
        ],
        "prompt": "Why do people reach for toothpaste during burns, and how can you educate your family on the 20-minute water rule?",
        "takeaway": "Cool water, twenty minutes, zero toothpaste: proper burn first aid stops thermal damage and prevents scars.",
        "vis1": {"title": "The 20-Minute Water Rule", "caption": "Immediate Cool Running Tap Water (15-20°C) for 20 Full Minutes. Heat is drawn out of tissue!"},
        "vis2": {"title": "The Myth Buster Red Cross", "caption": "NO Toothpaste (Infection trap) | NO Butter (Thermal insulator) | NO Ice (Tissue necrosis). YES Cool Water!"},
        "act": {
            "title": "The Kitchen Burn Safety Protocol Drill",
            "obj": "Demonstrate the complete 20-minute cool water flushing, ring removal, and non-stick covering sequence.",
            "steps": [
                "Locate your kitchen sink and simulate immediate burn response.",
                "Set a timer for 20 minutes to experience how long true cooling takes.",
                "Demonstrate rapid safe removal of rings or bracelets before swelling.",
                "Demonstrate applying loose, non-stick cling film covering.",
                "Explain the danger of folk remedies to family members."
            ],
            "output": "A signed First Aid Burn Protocol verification checklist signed by a guardian or biology teacher."
        },
        "guided": {
            "context": "A cup of boiling hot chai spills over your younger brother's hand, causing immediate intense redness and crying.",
            "optimal": "Guide him directly to the bathroom sink, turn on gentle cool running water over his hand, remove his wrist watch immediately, keep water running for 20 minutes while comforting him, and inspect for blisters.",
            "opt_reason": "Instant cool water stops dermal heat damage and watch removal prevents arterial constriction from subsequent swelling.",
            "non1": "Run to the refrigerator to fetch a block of ice and press it hard on his skin.",
            "non1_reason": "Causes extreme cold-shock tissue necrosis on already damaged skin cells.",
            "non2": "Scream and fan his hand with a newspaper.",
            "non2_reason": "Air fanning does zero thermal cooling and allows heat to cook deeper.",
            "takeaway": "Cool running water immediately: keep it flowing for 20 minutes by the clock."
        },
        "indep": {
            "context": "Why is sterile food cling wrap considered one of the best emergency coverings for a clean, cooled burn?",
            "prompt": "Explain non-adherence, sterile interior layers, and prevention of fluid loss.",
            "rubric": "Cling wrap does not stick to raw tissue, prevents air exposure pain, allows visual monitoring, and peels off painlessly."
        },
        "quiz": {
            "q": "What is the single most important medical first-aid action for a fresh heat burn or scald?",
            "opt_correct": "Immediately flush the burn under gentle, cool running tap water for a full 20 minutes.",
            "opt_w1": "Smear mint toothpaste or butter over the red skin.",
            "opt_w2": "Press a block of freezing ice directly onto the skin.",
            "opt_w3": "Pop any blisters with a sewing needle."
        },
        "rubric": {
            "task": "Demonstrate thermal burn categorization, immediate running water cooling, jewelry removal, and sterile protection.",
            "mastery": "Enforces 20-minute water flush, articulates physiological rationale, rejects folk myths emphatically, protects blister integrity.",
            "c1": "Immediate Action & Running Water Thermal Control",
            "c2": "Folk Remedy Refutation & Evidence-Based First Aid",
            "c3": "Post-Cooling Protection & Secondary Injury Prevention"
        },
        "refs": [
            "What guidelines do the World Health Organization (WHO) and St. John Ambulance establish for burn first aid?",
            "Why is the 'Rule of Nines' used by emergency trauma doctors to calculate burn surface area?",
            "What should you do if clothing is melted and stuck to burned skin?",
            "How does dehydration occur in patients with severe large-area second-degree burns?"
        ]
    },
    {
        "month": 4, "theme": "First Aid Protocols, Sprain Management & Calling 112", "seq": 2,
        "cat": "life_safety_health", "cat_label": "Safety, Health & Well-being",
        "title": "The R.I.C.E. Protocol for Sports Sprains: Rest, Ice, Compression, Elevation",
        "why": "Twisting an ankle during basketball or football is common, but trying to 'walk it off' or massaging a fresh sprain violently causes internal bleeding, ligament tears, and months on crutches. The R.I.C.E. protocol stops swelling immediately.",
        "objs": [
            "Differentiate between a strain (muscle/tendon pull) and a sprain (ligament stretch/tear at a joint)",
            "Master the 4-part R.I.C.E. sequence: Rest, Ice (wrapped in cloth, 15m), Compression (crepe bandage), and Elevation (above heart)",
            "Identify the 'HARM' factors to avoid in the first 48 hours: No Heat, No Alcohol, No Running, No Massage",
            "Know when to suspect a bone fracture: inability to bear any weight, bone deformity, or intense pinpoint tenderness"
        ],
        "scenario": "During an inter-house football match, Arjun landed awkwardly on his left ankle. His ankle rolled inward with a sharp pop, swelling up like a tennis ball. Teammates shouted: 'Walk it off! Massage it hard!'",
        "expl": "When a joint twists, strong fibrous ligaments tear like ropes, bursting tiny blood vessels. Trying to 'massage' or walk on a fresh sprain tears the ligaments further and pours internal blood into the joint! Applying R.I.C.E. constricts blood vessels, limits swelling, and cuts recovery time in half.",
        "steps": [
            "R = REST: Stop playing immediately; sit down and do not bear any weight on the injured joint.",
            "I = ICE: Wrap ice cubes or a cold pack in a damp cloth (never bare ice on bare skin); apply for 15 to 20 minutes every 2 hours.",
            "C = COMPRESSION: Wrap an elastic crepe bandage firmly from toes upward toward the calf, maintaining snug support without turning toes blue or cold.",
            "E = ELEVATION: Prop the injured foot or wrist up on cushions so it rests ABOVE the level of the heart, allowing gravity to drain swelling away.",
            "The HARM Warning: For 48 hours, avoid Heat packs, Running, and aggressive Massages.",
            "Seek X-Ray if the student cannot take 4 steps or if pressing the ankle bone causes excruciating pain."
        ],
        "example": {
            "title": "Arjun's Rapid Ankle Recovery",
            "scenario": "Arjun applies R.I.C.E. immediately.",
            "steps": [
                "Sports coach stops Arjun from walking.",
                "Applies cloth-wrapped ice pack for 15 minutes.",
                "Wraps ankle with crepe bandage in figure-8 pattern.",
                "Props leg up on team bench cushions above chest level.",
                "Swelling remains minimal.",
                "Returns to training in 10 days rather than 6 weeks."
            ],
            "takeaway": "Immediate Rest, Ice, Compression, and Elevation prevents severe swelling and accelerates joint healing."
        },
        "mistakes": [
            ("Vigorously massaging a fresh sprained joint with hot oil.", "Massaging a fresh injury ruptures torn blood vessels, dramatically increasing internal bleeding and swelling."),
            ("Applying bare ice cubes directly onto bare skin until skin is numb.", "Bare ice causes ice-burn frostbite; always wrap ice in a damp towel or cloth.")
        ],
        "checklist": [
            "Did the player stop bearing weight immediately (Rest)?",
            "Is ice wrapped in a damp cloth and limited to 15-20 minutes?",
            "Is the crepe bandage snug without cutting off circulation?",
            "Is the injured limb propped up above heart level (Elevation)?",
            "Are hot water bags and vigorous massages strictly avoided for 48 hours?"
        ],
        "prompt": "Why does elevating your twisted ankle on pillows above your chest make the throbbing pain stop?",
        "takeaway": "Rest, ice, compress, elevate: the R.I.C.E. protocol stops sports swelling and heals joints fast.",
        "vis1": {"title": "The R.I.C.E. Protocol Sequence", "caption": "R = Rest (Off feet) | I = Ice (15m wrapped) | C = Compress (Crepe bandage) | E = Elevate (Above heart)."},
        "vis2": {"title": "The No-HARM 48-Hour Shield", "caption": "NO Heat | NO Alcohol | NO Running | NO Massage. All 4 increase internal bleeding in fresh sprains!"},
        "act": {
            "title": "The Crepe Bandage & R.I.C.E. Practical Drill",
            "obj": "Demonstrate proper figure-of-eight crepe bandage wrapping, ice pack preparation, and elevation positioning for an ankle sprain.",
            "steps": [
                "Prepare a cloth-wrapped cold pack.",
                "Practice wrapping an elastic crepe bandage in a figure-8 pattern around a partner's foot and ankle.",
                "Check circulation: pinch a toe for 3 seconds; pink color must return in under 2 seconds (Capillary Refill Test).",
                "Position partner with leg propped on pillows above heart level.",
                "Explain the 4 HARM factors to avoid."
            ],
            "output": "A practical first-aid demonstration verified by physical education instructor or sports coach."
        },
        "guided": {
            "context": "A friend twists their wrist during badminton. A teammate brings a steaming hot water bottle to press on it.",
            "optimal": "Intervene politely: 'Stop, heat opens up blood vessels and makes swelling worse during the first 48 hours! We need an ice pack and a crepe bandage first.'",
            "opt_reason": "Prevents vasodilation and severe localized edema caused by inappropriate early heat application.",
            "non1": "Let them apply the scalding hot pack to see what happens.",
            "non1_reason": "Causes massive swelling and prolonged joint impairment.",
            "non2": "Yank their hand hard to 'pop it back in place'.",
            "non2_reason": "Extremely dangerous; can tear nerves and dislocate bones.",
            "takeaway": "Cold for fresh injuries (48h), heat only for chronic muscle stiffness later."
        },
        "indep": {
            "context": "How do you know if an ankle injury is a simple sprain or a fractured bone that needs an immediate orthopedic cast?",
            "prompt": "Describe the Ottawa Ankle Rules: inability to bear weight and localized bone point tenderness.",
            "rubric": "Explained inability to take 4 weight-bearing steps, pinpoint tenderness on lateral/medial malleolus bone edges."
        },
        "quiz": {
            "q": "What should you NEVER do to a sprained joint during the first 48 hours following an injury?",
            "opt_correct": "Apply hot water bags, run on the joint, or vigorously massage it, as these dramatically increase internal bleeding and swelling.",
            "opt_w1": "Drink clean water.",
            "opt_w2": "Prop it up on soft pillows.",
            "opt_w3": "Wrap ice in a clean damp towel."
        },
        "rubric": {
            "task": "Demonstrate comprehensive sports sprain management using R.I.C.E. and avoid acute contraindications.",
            "mastery": "Applies R.I.C.E. steps in precise order, performs proper figure-8 bandaging with circulation checks, enforces HARM contraindications, identifies fracture red flags.",
            "c1": "R.I.C.E. Protocol Sequencing & Application",
            "c2": "Bandaging Biomechanics & Neurovascular Checking",
            "c3": "HARM Contraindications & Fracture Triage"
        },
        "refs": [
            "Why do professional football teams have cold plunge tubs and ice compression machines on the sideline?",
            "What is the biological difference between ligaments (bone-to-bone) and tendons (muscle-to-bone)?",
            "How does proper ankle proprioception training and balance board exercises prevent future sprains?",
            "When is it safe to begin gentle rehabilitation stretches after an ankle sprain?"
        ]
    },
    {
        "month": 4, "theme": "First Aid Protocols, Sprain Management & Calling 112", "seq": 3,
        "cat": "life_safety_health", "cat_label": "Safety, Health & Well-being",
        "title": "Calling Emergency 112: Stating Location, Patient Condition & Landmarks Clearly",
        "why": "When a family member collapses or a road accident occurs, panicking, screaming into the phone, or failing to give the exact address delays ambulances by 30 life-threatening minutes. Mastering emergency dispatch communication saves lives.",
        "objs": [
            "Memorize India's Unified Emergency Helpline number: 112 (integrating Police 100, Fire 101, and Ambulance 102)",
            "Master the 5-Point Emergency Dispatch Script: Who is calling, Exact Location & Landmark, What Happened, Patient Condition, and Callback Number",
            "Speak in a slow, deep, audible room voice without screaming into the smartphone microphone",
            "Never hang up the call until the emergency operator explicitly tells you it is safe to disconnect"
        ],
        "scenario": "Rohan's grandfather collapsed in the living room clutching his chest, breathing heavily. Rohan panicked, dialed 112, screamed 'Help, my grandfather is dying!' and hung up without giving the house address.",
        "expl": "Emergency dispatch operators are trained lifesavers, but they cannot read your mind! If you scream and hang up, the ambulance has no idea where to drive. Taking one deep breath, stating your exact street and landmark first, and keeping the line open allows the operator to dispatch an ambulance instantly while guiding you through life-saving first aid over the speakerphone.",
        "steps": [
            "Take one deep breath and press 1-1-2 on any mobile phone (works even with zero balance and locked screens).",
            "State your location FIRST before describing the injury: 'I need an ambulance at Flat 402, Green Valley Apartments, Sector 14, Gurgaon, behind the Metro Station.'",
            "State your Name and Age: 'My name is Rohan Sharma, I am 12 years old.'",
            "Describe the Situation: 'My 72-year-old grandfather collapsed; he is conscious but having severe chest pain and difficulty breathing.'",
            "Confirm Landmarks: Give the nearest major public gate, school, or petrol pump.",
            "Put phone on Speakerphone: Keep both hands free to follow the operator's instructions; NEVER disconnect until told to hang up.",
            "Send someone to the main street gate to wave the ambulance into the compound with a flashlight."
        ],
        "example": {
            "title": "Rohan's 112 Protocol Reset",
            "scenario": "Rohan executes the professional dispatch call.",
            "steps": [
                "Operator answers: 'Emergency 112, what is your emergency?'",
                "Rohan speaks slowly: 'Ambulance needed at House 42, Block B, Preet Vihar, opposite Mother Dairy booth.'",
                "'My grandfather collapsed with chest pain. He is breathing.'",
                "Operator: 'Ambulance dispatched from Preet Vihar hospital, 6 minutes away. Keep him resting seated upright.'",
                "Rohan sends his brother to wait at the street corner.",
                "Paramedics arrive in 6 minutes and stabilize his grandfather."
            ],
            "takeaway": "Giving the exact address and landmark first ensures emergency ambulances are rolling within 60 seconds."
        },
        "mistakes": [
            ("Giving the description of the injury for 5 minutes without ever stating the street address.", "Ambulances cannot move without an address; always state your location and nearest landmark first."),
            ("Hanging up the phone as soon as you finish speaking.", "Emergency operators provide continuous first-aid guidance and need to verify location; stay on the line until instructed to hang up.")
        ],
        "checklist": [
            "Did I dial 112 (or 102 for Ambulance)?",
            "Did I state the exact building, street, and landmark first?",
            "Did I describe the patient's consciousness and breathing state?",
            "Is the phone on speakerphone so I can follow operator instructions?",
            "Is someone stationed at the road gate to guide the ambulance in?"
        ],
        "prompt": "What is the exact landmark and gate number you would give an emergency driver to find your home right now?",
        "takeaway": "Address first, calm voice, stay on the line: dialing 112 with precision gets paramedics to your side fast.",
        "vis1": {"title": "The 5-Point 112 Dispatch Script", "caption": "1. Exact Address & Landmark -> 2. Name -> 3. What Happened -> 4. Consciousness & Breathing -> 5. Stay on line!"},
        "vis2": {"title": "The Road Gate Signaler", "caption": "Send a family member to the building gate to wave flashlight and guide the ambulance directly to the entrance."},
        "act": {
            "title": "The 112 Emergency Dispatch Simulation",
            "obj": "Conduct a realistic spoken role-play simulation of an emergency 112 call reporting a household medical crisis.",
            "steps": [
                "Write out your home's exact address and top 2 physical landmarks.",
                "Partner with a parent or teacher acting as the 112 dispatcher.",
                "Simulate dialing 112 on a disconnected phone.",
                "Deliver all 5 components in a calm, steady room voice under 45 seconds.",
                "Follow simulated operator first-aid guidance over speakerphone."
            ],
            "output": "An Emergency Home Information Card completed and posted next to the family phone."
        },
        "guided": {
            "context": "You witness a road accident on a highway where a motorcyclist is knocked down and lying unconscious on the road shoulder.",
            "optimal": "Dial 112. State: 'Accident at Ring Road flyover near HP Petrol Pump heading toward Airport. Motorcyclist unconscious on road shoulder. Traffic is heavy. Please send ambulance and police.'",
            "opt_reason": "Identifies highway direction, landmark, patient state, and safety hazards accurately.",
            "non1": "Pull out your phone to livestream the injured person on social media.",
            "non1_reason": "Callous, inhumane, and wastes critical minutes when medical help is needed.",
            "non2": "Try to yank the unconscious rider's helmet off their head violently.",
            "non2_reason": "Removing helmets unsafely can snap fractured cervical vertebrae and cause instant paralysis.",
            "takeaway": "Call 112 with landmarks and protect the scene; do not move spinal trauma victims."
        },
        "indep": {
            "context": "Why is 112 configured to connect on any mobile phone even if there is no SIM card or screen lock passcode entered?",
            "prompt": "Explain global telecommunications emergency standards and GSM SOS carrier bypass.",
            "rubric": "Explained GSM standard emergency bypass that connects to any available cellular carrier tower regardless of SIM/balance."
        },
        "quiz": {
            "q": "What is the single most important piece of information to state FIRST when calling Emergency 112 for an ambulance?",
            "opt_correct": "The exact physical location, building address, and nearest prominent landmark so the vehicle can be dispatched immediately.",
            "opt_w1": "Your favorite school subject.",
            "opt_w2": "A long story about what you were eating when the accident happened.",
            "opt_w3": "The brand name of the patient's shoes."
        },
        "rubric": {
            "task": "Demonstrate emergency calling protocols, precise geographic navigation, patient triage description, and call management.",
            "mastery": "States address and landmarks first, maintains calm acoustic clarity, describes vital signs accurately, follows operator speakerphone protocols.",
            "c1": "Geographic Landmark Precision & Address Primacy",
            "c2": "Acoustic Clarity & Emotional Composure Under Pressure",
            "c3": "Triage Reporting & Dispatch Operator Compliance"
        },
        "refs": [
            "What is the Golden Hour in emergency medicine and why does rapid response determine survival?",
            "How does India's Emergency Response Support System (ERSS 112) route calls via computer-aided dispatch (CAD)?",
            "What is the Good Samaritan Law in India and how does it protect citizens who help accident victims?",
            "Why should you never make prank or joke calls to emergency numbers?"
        ]
    },

    # MONTH 5: Media Literacy & Digital Critical Thinking
    {
        "month": 5, "theme": "Clickbait Verification, SIFT Method & Fake Review Detection", "seq": 1,
        "cat": "life_critical_thinking", "cat_label": "Critical Thinking & Everyday Problem-Solving",
        "title": "Deconstructing Clickbait & Viral Hoaxes: The S.I.F.T. Verification Method",
        "why": "Sensational headlines ('NASA Confirms 3 Days of Total Darkness!') and forwarded rumors spread like wildfire on WhatsApp, triggering mass panic and false beliefs. Learning the 4-step S.I.F.T. fact-checking method protects your mind from deception.",
        "objs": [
            "Identify the 4 characteristics of clickbait: Emotional rage/fear triggers, dramatic ALL-CAPS words, lack of reputable author, and cliffhanger curiosity gaps",
            "Master the S.I.F.T. verification framework: Stop, Investigate the source, Find trusted coverage, Trace claims back to original context",
            "Perform a 60-second Lateral Reading check: open a new tab and search what independent fact-checkers say about the claim",
            "Recognize AI-generated synthetic images: inspect hands, text lettering, reflections, and ear symmetry"
        ],
        "scenario": "A family group chat forwarded an alarming video with text: 'ALERT: Plastic rice made in factories being sold in local grocery stores! Share to save lives!' Aditi felt alarmed and almost forwarded it to 25 school classmates.",
        "expl": "Clickbait is like junk food for your brain: it tastes exciting, but it is 100% toxic fluff! Fake news creators use shocking headlines to hijack your emotions so you share before thinking. Developed by digital literacy experts, the S.I.F.T. method gives you mental armor. By pausing and doing a quick 30-second lateral search in a new tab, viral hoaxes evaporate instantly.",
        "steps": [
            "S = STOP: Whenever a post makes you feel sudden intense anger, panic, or shock, FREEZE. Do not like, share, or forward.",
            "I = INVESTIGATE the Source: Who published this? Is it a recognized news agency or an anonymous blog called 'DailyRealTruth.xyz'?",
            "F = FIND Trusted Coverage: Open a fresh browser tab and search the core claim + 'fact check' (e.g. 'plastic rice rumor fact check'). Are reputable outlets reporting it?",
            "T = TRACE to the Original Context: Follow the video or quote back to its earliest date; often old unrelated videos from other countries are repackaged with fake audio.",
            "Inspect AI Clues: Look closely at photographs: do human hands have 6 fingers? Are background signs written in garbled, unreadable alien squiggles?",
            "The Forwarding Firewall: If a claim cannot be verified on at least two established news sources, do NOT forward it. Break the rumor chain."
        ],
        "example": {
            "title": "Aditi's S.I.F.T. Investigation",
            "scenario": "Aditi investigates the plastic rice viral video.",
            "steps": [
                "STOP: Refuses to forward despite 'SHARE URGENTLY' banner.",
                "FIND: Searches 'plastic rice rumor fact check India' on Google.",
                "Discovers verified articles from official food safety authorities (FSSAI) proving it is an impossible myth (plastic costs 3x more than real rice!).",
                "TRACE: Discovers the video actually showed industrial plastic recycling pellets in a factory.",
                "Sends the fact-check link politely into her family group.",
                "Family thanks Aditi for stopping the viral panic."
            ],
            "takeaway": "A 30-second lateral fact-check stops viral hoaxes and prevents public panic."
        },
        "mistakes": [
            ("Forwarding unverified rumors with the excuse 'Just sharing in case it is true'.", "Forwarding unverified claims pollutes the information environment; verify first before sharing anything."),
            ("Judging the truth of an article based entirely on how professional the website logo looks.", "Scammers easily copy official logos; always check what independent outside sources say about the site.")
        ],
        "checklist": [
            "Did I pause when feeling an emotional shock trigger?",
            "Did I search the claim + 'fact check' in a separate tab?",
            "Is the news reported by recognized, established news organizations?",
            "Did I inspect images for AI generation glitches?",
            "Am I breaking the chain on unverified claims?"
        ],
        "prompt": "Why do false rumors spread 6 times faster on social messaging apps than verified scientific truths?",
        "takeaway": "Stop, investigate, find, trace: the S.I.F.T. method turns you into an unbeatable digital fact-checker.",
        "vis1": {"title": "The S.I.F.T. Framework", "caption": "S = STOP -> I = Investigate Source -> F = Find Trusted Coverage -> T = Trace to Origin Context."},
        "vis2": {"title": "Lateral Reading vs Vertical Reading", "caption": "Vertical: Reading down the suspicious page blindly. Lateral: Opening 3 tabs to see what outside experts say!"},
        "act": {
            "title": "The Viral Hoax Fact-Checker Lab",
            "obj": "Investigate and debunk a real-world viral hoax using the S.I.F.T. method and lateral reading.",
            "steps": [
                "Select a common viral myth (e.g. UNESCO declares Indian national anthem best in world, WhatsApp turning pink).",
                "Apply the 4 S.I.F.T. steps.",
                "Locate at least 2 verified fact-check reports (e.g. PIB Fact Check, BoomLive, AltNews).",
                "Write a 1-paragraph debunking summary with primary source links.",
                "Present the findings to your classmates."
            ],
            "output": "A 1-page S.I.F.T. Fact-Check Report verifying or debunking a viral claim."
        },
        "guided": {
            "context": "A viral forwarded audio clip claims: 'Schools will be closed for 3 weeks starting tomorrow due to sudden government order.'",
            "optimal": "Apply S.I.F.T. Check official Department of Education website or major national news portals. Notice zero news reports. Confirm with school administration before assuming holiday.",
            "opt_reason": "Verifies institutional administrative orders at official sources rather than anonymous audio forwards.",
            "non1": "Pack your school books into the closet and stay home without checking.",
            "non1_reason": "Unexcused absence that causes missed exams and school penalties.",
            "non2": "Forward the audio clip to 40 classmates claiming tomorrow is a holiday.",
            "non2_reason": "Spreads administrative chaos and panic across the student body.",
            "takeaway": "Official policies are published on official government websites, never anonymous audio clips."
        },
        "indep": {
            "context": "How can you spot whether a viral photograph of an animal or celebrity is real or AI-generated?",
            "prompt": "List 4 visual forensic checks for synthetic AI images (lighting consistency, finger counts, background text).",
            "rubric": "Listed warped fingers/teeth, asymmetrical ears/eyewear, unreadable background gibberish text, unnatural skin sheen."
        },
        "quiz": {
            "q": "What is 'Lateral Reading' in digital media literacy?",
            "opt_correct": "Opening a new browser tab to search what independent fact-checkers and reliable sources say about the original article, rather than staying on the page.",
            "opt_w1": "Reading a book while lying on your side on the bed.",
            "opt_w2": "Reading text from right to left.",
            "opt_w3": "Translating words into Latin."
        },
        "rubric": {
            "task": "Apply the S.I.F.T. verification methodology, conduct lateral reading, and identify synthetic media artifacts.",
            "mastery": "Applies S.I.F.T. steps systematically, conducts independent lateral searches, identifies AI image glitches, refrains from spreading unverified content.",
            "c1": "S.I.F.T. Framework Application Rigor",
            "c2": "Lateral Reading & Cross-Source Verification",
            "c3": "Synthetic Media & AI Artifact Identification"
        },
        "refs": [
            "Who is Mike Caulfield and how did his digital literacy research at Washington State University develop the SIFT model?",
            "How does the Press Information Bureau (PIB) Fact Check unit combat government misinformation in India?",
            "What is a 'deepfake' video and how is synthetic voice cloning used in phone scams?",
            "Why is emotional outrage the most profitable currency for social media engagement algorithms?"
        ]
    },
    {
        "month": 5, "theme": "Clickbait Verification, SIFT Method & Fake Review Detection", "seq": 2,
        "cat": "life_critical_thinking", "cat_label": "Critical Thinking & Everyday Problem-Solving",
        "title": "How Phishing Scams Steal OTPs: Why Bank Staff Never Ask for Verification Codes",
        "why": "Cybercriminals pose as bank managers, courier delivery agents, or school portal admins to trick families into revealing One-Time Passwords (OTPs), draining family savings accounts in seconds. Understanding OTP security prevents digital theft.",
        "objs": [
            "Explain what an OTP (One-Time Password) represents: the master digital key authorizing financial transfers or password resets",
            "Identify the #1 Cyber Rule: NO legitimate bank employee, police officer, or company representative will EVER ask for your OTP",
            "Deconstruct the 'Urgent Impersonation' scam script: fake blocked debit cards, electricity disconnection threats, or lottery verification",
            "Demonstrate how to report fraudulent cyber attempts on India's National Cyber Crime Portal (cybercrime.gov.in / 1930)"
        ],
        "scenario": "A caller phoned Rohan's mother claiming to be 'Customer Care Manager from SBI Bank', warning: 'Your debit card is blocked! To unblock it immediately, read the 6-digit verification code just sent to your phone.'",
        "expl": "An OTP is not a password; it is your digital signature on a bank cheque! It is generated to confirm that YOU are the person making a transfer. The text message explicitly says: 'Do not share this OTP with anyone, including bank staff.' When a caller asks for your OTP, they have already typed your card number into a theft portal and are asking YOU to open the bank vault door for them!",
        "steps": [
            "Inspect the SMS Header: Read the actual text of the OTP message. It will state: 'OTP for transaction of ₹X at Merchant Y. NEVER SHARE WITH ANYONE.'",
            "The Golden Law: Real bank employees have administrative tools inside their own computer systems; they NEVER need your OTP for anything.",
            "Recognize Threat Scripts: Scammers always invent panic: 'Your account will be suspended in 10 minutes!' or 'Electricity will be cut tonight!'",
            "Disconnect Immediately: Never argue with a scammer; hang up the phone call instantly.",
            "Verify Independently: Call the official customer care number printed on the back of your physical bank debit card.",
            "Emergency Cyber Reporting: If an OTP is ever accidentally shared, call the National Cyber Fraud Helpline at 1930 immediately to freeze transactions."
        ],
        "example": {
            "title": "Rohan's Cyber Shield",
            "scenario": "Rohan stops his mother from reading the code.",
            "steps": [
                "Hears caller demanding the 6-digit SMS code.",
                "Waves his hand: 'Mom, hang up! The SMS says never share OTP with bank staff!'",
                "Mother hangs up.",
                "Reads SMS: 'OTP to authorize payment of ₹25,000 on Flipkart. Do not share.'",
                "Realizes the scammer had stolen her card number and was trying to rob ₹25,000.",
                "Calls bank via number on back of card and blocks the compromised card safely."
            ],
            "takeaway": "Legitimate organizations never ask for OTPs; never read verification codes aloud to anyone on the phone."
        },
        "mistakes": [
            ("Reading an OTP aloud to a caller because they sounded polite and knew your mother's name and address.", "Scammers buy leaked phone directories with names; knowing your name does NOT make them legitimate."),
            ("Entering an OTP on an unverified web page reached through an SMS link.", "Only enter OTPs on official bank payment gateways when YOU personally initiated the purchase.")
        ],
        "checklist": [
            "Did I read the full text of the OTP SMS to see what it is authorizing?",
            "Did I remember that bank employees NEVER ask for OTPs under any circumstance?",
            "Did I hang up on threatening or panic-inducing callers?",
            "Do I know the National Cyber Crime Helpline number (1930)?"
        ],
        "prompt": "Why do cyber-scammers always use high-pressure panic ('Your card is blocked!') to make people act without thinking?",
        "takeaway": "Lock the door, keep the code: your OTP is your private key; real bank staff will never ask for it.",
        "vis1": {"title": "The OTP Vault Analogy", "caption": "OTP = The electronic key to your family bank vault. Giving it away lets the thief walk in and empty the vault!"},
        "vis2": {"title": "The Official Bank Rule", "caption": "SBI / HDFC / ICICI: 'We NEVER ask for your PIN, OTP, CVV, or Password.' Tattoo this rule into memory!"},
        "act": {
            "title": "The Cyber Safety Family Briefing",
            "obj": "Audit OTP SMS messages on a household phone and brief family members on the 1930 helpline.",
            "steps": [
                "Review recent legitimate OTP SMS messages with a parent.",
                "Highlight the safety warning: 'Do not share with anyone'.",
                "Save the National Cyber Crime Helpline number (1930) in family phones.",
                "Conduct a 5-minute roleplay where a caller demands an OTP and the student hangs up."
            ],
            "output": "A family cyber-security card signed by parents confirming 1930 is saved in emergency contacts."
        },
        "guided": {
            "context": "An SMS arrives: 'Dear customer, your electricity power will be disconnected at 9:30 PM tonight due to unpaid bill. Call electricity officer at 98xxxxxx immediately.'",
            "optimal": "Recognize the classic widespread utility scam. Do not call the personal mobile number. Show the message to parents, who can verify bill status directly on the official state electricity board portal.",
            "opt_reason": "Utility boards do not disconnect power via personal mobile SMS threats; verifies status at official utility portals.",
            "non1": "Call the mobile number in a panic and pay whatever fine they demand via UPI.",
            "non1_reason": "Directly transfers family money to a fraudulent scammer wallet.",
            "non2": "Sit in the dark waiting for power to turn off.",
            "non2_reason": "Irrational reaction to an unverified text message.",
            "takeaway": "Utility disconnection threats via personal mobile numbers are 100% fraudulent scams."
        },
        "indep": {
            "context": "Why are SIM-swap scams used by cybercriminals to intercept bank OTPs?",
            "prompt": "Explain mobile number cloning, sudden loss of cellular network bars, and urgent carrier contact.",
            "rubric": "Explained fraudulent duplicate SIM issuance, real SIM going dead, scammer receiving bank SMS OTPs directly."
        },
        "quiz": {
            "q": "Under what circumstance will an authentic bank customer care manager ask you to read your SMS OTP to them over the phone?",
            "opt_correct": "NEVER. Bank employees possess system verification tools and are strictly prohibited by law from asking customers for OTPs.",
            "opt_w1": "When unblocking a frozen debit card.",
            "opt_w2": "When upgrading your account to a gold credit card.",
            "opt_w3": "When refunding an overcharged utility payment."
        },
        "rubric": {
            "task": "Demonstrate understanding of two-factor authentication, identify social engineering fraud scripts, and practice cyber incident response.",
            "mastery": "Articulates OTP authorization principles, identifies urgency dark patterns, enforces zero-disclosure rules, demonstrates 1930 helpline reporting.",
            "c1": "Two-Factor Authentication & Cryptographic Literacy",
            "c2": "Social Engineering & Threat Script Identification",
            "c3": "Incident Response & National Cyber Helpline Reporting"
        },
        "refs": [
            "How does the Reserve Bank of India (RBI) regulate digital payment security and consumer liability?",
            "What is the difference between a 3-digit card CVV and a 6-digit SMS OTP?",
            "Why is the 'Golden Hour' (first 2 hours) critical when reporting cyber-financial fraud to 1930?",
            "How can biometric fingerprints and hardware security keys replace SMS OTPs in the future?"
        ]
    },
    {
        "month": 5, "theme": "Clickbait Verification, SIFT Method & Fake Review Detection", "seq": 3,
        "cat": "life_critical_thinking", "cat_label": "Critical Thinking & Everyday Problem-Solving",
        "title": "Spotting Fake Paid Product Reviews on Shopping Apps",
        "why": "Unscrupulous sellers buy thousands of fake 5-star reviews and bot ratings on shopping apps to fool customers into buying poor-quality electronics, toys, and clothes. Developing review forensics protects your family from buying junk.",
        "objs": [
            "Identify the 4 hallmarks of fake paid reviews: Cluster dates (50 reviews on same day), generic buzzwords ('Best product ever! Life-changing!'), broken bot grammar, and lack of verified purchase badges",
            "Filter reviews strategically: always sort by 'Most Recent' and read 2-star and 3-star reviews for balanced, honest critiques",
            "Inspect customer uploaded user photographs rather than glossy studio marketing renders",
            "Identify fake review syndicates and review incentivization schemes ('Leave a 5-star review for ₹50 cashback')"
        ],
        "scenario": "Tanmay wanted to buy a wireless gaming mouse online. The product had a '4.8 Star' rating with 2,000 reviews. Excited, he bought it, but the mouse broke in 3 days. When he looked closely at the reviews, dozens used the exact same identical sentences.",
        "expl": "Online star ratings can be completely bought and manufactured! Dishonest merchants hire 'review farms' where hundreds of people are paid ₹20 to write glowing 5-star praise without ever touching the product. Learning how to filter by verified buyers, inspect customer photos, and read 3-star reviews turns you into an unbeatable smart consumer.",
        "steps": [
            "Never trust the top-line Star Rating alone: a 4.9-star rating can be generated by 500 fake bot accounts.",
            "Step 1 (Check Verified Purchase): Ensure reviews carry the 'Verified Purchase' tag proving the buyer actually paid for the item.",
            "Step 2 (The Date Cluster Check): Scroll through review dates; if 100 glowing 5-star reviews were all posted in a single 48-hour window, they were bought in a bulk campaign.",
            "Step 3 (Read the 3-Star Reviews): 5-star reviews are often paid; 1-star reviews are often angry competitors. The 3-star and 4-star reviews are written by real, balanced humans explaining real pros and cons.",
            "Step 4 (Look at Real Photos): Click 'Customer Images' to see what the plastic, stitching, or packaging actually looks like in real home lighting.",
            "Watch for Review Cards: If a package arrives with a scratch card promising '₹100 Paytm cash for a 5-star review', report the seller for review fraud."
        ],
        "example": {
            "title": "Tanmay's Review Forensics",
            "scenario": "Tanmay investigates wireless earbuds before buying.",
            "steps": [
                "Sees 4.7 stars on unknown brand.",
                "Filters by 3-star reviews: discovers 15 buyers complain the left earbud stops charging after 2 weeks.",
                "Inspects user photos: sees cheap brittle plastic with rough seams.",
                "Decides not to buy; chooses a reputable brand with genuine balanced feedback.",
                "Saves his ₹800 savings from being wasted on disposable electronic junk."
            ],
            "takeaway": "Filtering by 3-star reviews and inspecting real customer photos exposes fake ratings and protects your money."
        },
        "mistakes": [
            ("Buying a product solely because the title says 'Amazon's Choice' or 'Bestseller'.", "Bestseller badges are based on sales velocity, which sellers manipulate with temporary discounts; always inspect reviews."),
            ("Writing a fake 5-star review in exchange for a ₹50 cashback coupon.", "Taking money to write fake reviews deceives other innocent consumers and violates consumer protection ethics.")
        ],
        "checklist": [
            "Are reviews distributed across months or clustered on one suspicious date?",
            "Did I filter by 'Verified Purchase' only?",
            "Did I read the 3-star reviews for balanced real-world critiques?",
            "Did I inspect user-uploaded photographs of the physical product?"
        ],
        "prompt": "Why do 3-star and 4-star reviews usually give you the most honest information about a product?",
        "takeaway": "Look past the stars, inspect the photos: 3-star reviews and user images reveal the honest truth about online products.",
        "vis1": {"title": "The Review Bell Curve Trap", "caption": "Fake Profile: 95% 5-star (Fake bots) + 5% 1-star (Disgusted real buyers). Real Profile: Balanced bell curve with 2, 3, and 4 stars."},
        "vis2": {"title": "The Customer Photo Filter", "caption": "Studio Marketing 3D Render (Flawless, deceptive) vs Real User Kitchen Counter Photo (Real plastic quality)."},
        "act": {
            "title": "The E-Commerce Review Forensic Audit",
            "obj": "Conduct a forensic review audit on 2 online products and categorize their review profiles as Genuine or Manipulated.",
            "steps": [
                "Find 2 competing products on a major shopping app (e.g. smart watch or school bag).",
                "Audit review date clusters, verified badges, and repetitive phrasing.",
                "Inspect 3-star review critiques and user-submitted photos.",
                "Assign a Trust Score (1-10) to each product's review profile with written evidence.",
                "Share recommendations with family members."
            ],
            "output": "A 1-page Comparative Review Forensic Report evaluating product authenticity."
        },
        "guided": {
            "context": "A product has twenty 5-star reviews that all say identical phrases: 'Very nice good quality fast shipping five star amazing seller'.",
            "optimal": "Identify repetitive generic phrasing as paid bot spam or translation-farm manipulation; avoid purchasing from this unverified seller.",
            "opt_reason": "Repetitive generic keywords and lack of specific product functional details are the signature hallmarks of bot reviews.",
            "non1": "Assume all twenty reviewers just happen to think alike and buy immediately.",
            "non1_reason": "Falls for obvious bot manipulation and receives low-grade counterfeit goods.",
            "non2": "Report the app to local police for computer hacking.",
            "non2_reason": "Inappropriate channel; review manipulation should be reported through consumer protection or app marketplace tools.",
            "takeaway": "Generic repetitive praise without specific product details is the hallmark of review bots."
        },
        "indep": {
            "context": "What are India's Bureau of Indian Standards (BIS) guidelines regarding fake consumer reviews on e-commerce platforms?",
            "prompt": "Explain the IS 19000:2022 standard for online consumer reviews and seller penalties.",
            "rubric": "Explained prohibition of paid fake reviews, mandatory verification of reviewer identity, and consumer protection penalties."
        },
        "quiz": {
            "q": "Why are 3-star and 4-star reviews generally the most reliable and informative reviews to read on shopping apps?",
            "opt_correct": "Because they are typically written by genuine verified buyers who evaluate both positive features and practical drawbacks objectively.",
            "opt_w1": "Because three is a lucky number in online shopping.",
            "opt_w2": "Because only professional scientists write 3-star reviews.",
            "opt_w3": "Because shopping apps delete all 5-star reviews every night."
        },
        "rubric": {
            "task": "Perform forensic consumer review analysis, detect fraudulent rating patterns, and verify product authenticity.",
            "mastery": "Identifies bot phrasing and date clusters, leverages customer photo forensics, mines 3-star reviews for balanced insights, cites consumer protection standards.",
            "c1": "Review Forensic Analysis & Bot Pattern Detection",
            "c2": "Visual Media Inspection & Photo Verification",
            "c3": "Consumer Protection Standards & Evidence-Based Purchasing"
        },
        "refs": [
            "How do review verification tools like Fakespot and ReviewMeta use machine learning to detect paid review clusters?",
            "What is 'brushing' in e-commerce, where sellers send fake packages to random people to generate reviews?",
            "How does the Consumer Protection Act 2019 protect Indian shoppers against deceptive trade practices?",
            "Why is checking return policies and manufacturer warranties vital when buying from new online brands?"
        ]
    },

    # MONTH 6: Group Leadership & Delegating
    {
        "month": 6, "theme": "Strengths Delegation, Accountability & Brainstorming Facilitation", "seq": 1,
        "cat": "life_social_teamwork", "cat_label": "Social Skills, Empathy & Teamwork",
        "title": "Delegating Group Tasks by Personal Strengths Rather Than Popularity",
        "why": "When group project roles are assigned based on who is best friends or who shouts loudest, tasks end up mismatched, deadlines fail, and team members feel alienated. Matching tasks to natural strengths guarantees project excellence and team harmony.",
        "objs": [
            "Map team member competencies across 4 project functional domains: Research/Data, Visual Design, Writing/Editing, and Verbal Presentation",
            "Conduct a 5-minute 'Strengths & Interests Round' before assigning any project roles",
            "Match tasks to competencies so every member feels valued, challenged, and capable",
            "Document role allocations on a shared Master Task Commitment Sheet with firm deadlines"
        ],
        "scenario": "During a Class 7 Geography project on Himalayan Glaciers, team leader Kabir assigned the public speaking role to his best friend Aryan (who got stage fright and hated speaking), while assigning research to Priya (who was a state-level orator). The presentation was a disaster.",
        "expl": "A great group leader is like a master football coach! A coach doesn't put the fastest sprinter in goal and the tallest defender on the wing just because they are friends. A coach puts every player where their natural talents shine brightest. When you assign roles based on what people love and do best, the project becomes effortless and everyone feels proud.",
        "steps": [
            "Step 1 (The Skills Inventory): Gather the group and ask each person: 'What are you best at, and what would you love to learn in this project?'",
            "Domain 1 (The Investigator): Loves reading, finding facts, checking statistics, and organizing references.",
            "Domain 2 (The Visual Architect): Loves drawing, designing charts, choosing color palettes, and formatting slides.",
            "Domain 3 (The Scribe): Loves writing clear sentences, proofreading spelling, and drafting summaries.",
            "Domain 4 (The Orator): Loves speaking, storytelling, engaging crowds, and answering questions.",
            "Step 2 (Cooperative Matching): Pair members to roles by consent, ensuring every member has a primary responsibility and a backup partner.",
            "Step 3 (Document & Date): Write down exact deliverables, names, and completion dates on a shared task sheet."
        ],
        "example": {
            "title": "Kabir's Team Reorganization",
            "scenario": "Kabir resets roles for their next project.",
            "steps": [
                "Conducts a 5-minute Strengths Round.",
                "Priya: 'I love public speaking and debate!' -> Assigned Orator.",
                "Aryan: 'I love building 3D models and terrain maps!' -> Assigned Model Architect.",
                "Tanvi: 'I love deep library research!' -> Assigned Lead Investigator.",
                "Kabir: Coordinates timelines, edits final report, and assists with materials.",
                "Their project wins First Prize across the entire school year."
            ],
            "takeaway": "Aligning project responsibilities with natural personal strengths creates winning teams and happy members."
        },
        "mistakes": [
            ("Assigning all the fun, prestigious roles to your close friends and dumping boring work on quiet classmates.", "Favoritism destroys team morale and guarantees low effort; distribute high-impact tasks by merit and passion."),
            ("Assuming leadership means doing 100% of the project yourself because 'nobody else will do it right'.", "Micromanagement burns you out and deprives your teammates of learning; true leaders empower others.")
        ],
        "checklist": [
            "Did every team member voice their personal strengths and interests?",
            "Are roles matched to demonstrated skills rather than popularity?",
            "Does every member have an explicit, itemized deliverable?",
            "Is the Master Task Sheet signed by all participants with completion dates?"
        ],
        "prompt": "Which of the 4 project roles (Investigator, Visual Architect, Scribe, Orator) matches your natural talents best?",
        "takeaway": "Match the task to the talent: strengths-based delegation turns diverse students into a powerhouse team.",
        "vis1": {"title": "The 4 Project Functional Domains", "caption": "The Investigator (Data/Facts) | The Architect (Design/Visuals) | The Scribe (Writing/Editing) | The Orator (Speech/Presentation)."},
        "vis2": {"title": "The Master Task Commitment Sheet", "caption": "Task Description | Assigned Member | Due Date | Review Checkpoint | Status (Signed)."},
        "act": {
            "title": "The Team Strengths Matrix Workshop",
            "obj": "Construct a functional Strengths Delegation Matrix for a 4-person collaborative school assignment.",
            "steps": [
                "Select a real or hypothetical school group project.",
                "List all required project components from start to finish.",
                "Interview 3 classmates or group peers to identify their top 2 strengths.",
                "Match tasks to members based on competency and developmental goals.",
                "Document the final delegation plan on a Master Task Sheet."
            ],
            "output": "A completed Team Strengths Delegation Matrix signed by all participants."
        },
        "guided": {
            "context": "A shy teammate says in a whisper: 'I don't know what I'm good at, just give me whatever is left over.'",
            "optimal": "Ask encouragingly: 'You drew those incredible biological cell diagrams in your notebook last week! Would you be willing to be our Lead Visual Designer for the chart?'",
            "opt_reason": "Notices and validates hidden individual talents, building confidence and integrating the shy member meaningfully.",
            "non1": "Say: 'Fine, you can carry the poster board and clean the desk after we finish.'",
            "non1_reason": "Treats the peer like a servant, causing deep humiliation and resentment.",
            "non2": "Exclude them from the project entirely.",
            "non2_reason": "Cruel, exclusionary, and violates academic collaboration ethics.",
            "takeaway": "Great leaders notice people's quiet superpowers and invite them into the light."
        },
        "indep": {
            "context": "Two team members both want to be the sole speaker for the final presentation.",
            "prompt": "How will you negotiate a shared speaking structure (e.g. Opening/Theory vs Demonstration/Conclusion)?",
            "rubric": "Divided presentation into two distinct speaking segments (Problem/Context vs Solutions/Results) with equal time."
        },
        "quiz": {
            "q": "What is the primary advantage of delegating group project tasks based on individual strengths rather than friendship or popularity?",
            "opt_correct": "It maximizes project quality, increases individual engagement and pride, and prevents resentment from mismatched responsibilities.",
            "opt_w1": "It ensures the leader gets to sleep during class.",
            "opt_w2": "It forces everyone to do the exact same amount of drawing.",
            "opt_w3": "It guarantees that no homework will be assigned next week."
        },
        "rubric": {
            "task": "Map team competencies, facilitate strengths discovery, and execute equitable project delegation.",
            "mastery": "Identifies team skills accurately, facilitates inclusive role matching, eliminates favoritism, maintains accountability task sheets.",
            "c1": "Competency Mapping & Skills Assessment",
            "c2": "Inclusive Delegation & Strengths Alignment",
            "c3": "Task Governance & Accountability Infrastructure"
        },
        "refs": [
            "How do Belbin Team Roles help corporate leadership teams balance strategic thinkers, implementers, and finishers?",
            "Why is cognitive diversity in teams scientifically proven to generate more innovative solutions than groups of identical thinkers?",
            "How does learning to delegate in Class 7 prepare you for managing multi-disciplinary engineering or medical teams?",
            "What should a group leader do if an assigned member encounters unexpected family difficulties during a project?"
        ]
    },
    {
        "month": 6, "theme": "Strengths Delegation, Accountability & Brainstorming Facilitation", "seq": 2,
        "cat": "life_social_teamwork", "cat_label": "Social Skills, Empathy & Teamwork",
        "title": "Holding Teammates Accountable Without Rudeness or Drama",
        "why": "When a project partner fails to submit their slides or misses a meeting, shouting at them creates defensive screaming fights, while staying silent forces you to do all their work at midnight. Calm, assertive accountability fixes problems early.",
        "objs": [
            "Establish intermediate milestone checkpoints 72 hours before the final deadline to spot delays early",
            "Use the S.B.I. (Situation - Behavior - Impact) feedback formula to address missed deadlines objectively",
            "Separate the missed task from the person's character (focus on the unfinished deliverable, not personal attacks)",
            "Negotiate a firm recovery plan with clear consequences before escalating to teachers"
        ],
        "scenario": "Ishan was responsible for writing the summary chapter of a Class 7 Science report due on Friday. On Thursday afternoon, Ishan had written zero words. Team leader Meera felt furious and was ready to scream at him in the school corridor.",
        "expl": "Accountability is not about punishing people; it is about keeping the project train on the tracks! If you attack someone with insults ('You are so lazy and irresponsible!'), their brain shuts down and they fight back. When you use the S.B.I. formula (Situation, Behavior, Impact), you present cold, indisputable facts calmly, leaving zero room for arguments and opening the door to immediate recovery.",
        "steps": [
            "Pull the person aside privately: NEVER call someone out or humiliate them in front of the entire class.",
            "Step 1 (Situation): State the objective time and place: 'On Tuesday, our team agreed that the summary section would be completed by Thursday at 3 PM.'",
            "Step 2 (Behavior): State the observable fact: 'Right now, the summary document is blank.'",
            "Step 3 (Impact): Explain the real consequence without drama: 'This means Tanvi cannot format the final slides tonight, and our whole team risks losing our on-time submission marks.'",
            "Step 4 (The Check-in Question): Ask neutrally: 'What happened, and what is blocking you from completing it?'",
            "Step 5 (The Recovery Contract): 'Can you finish the draft by 7:00 PM tonight so Tanvi can format it before 9 PM?'",
            "If they refuse or break the second commitment, inform them calmly: 'If it is not submitted by 7 PM, we will have to complete it without your section and let the teacher know our updated contribution log.'"
        ],
        "example": {
            "title": "Meera's S.B.I. Conversation",
            "scenario": "Meera addresses Ishan's delay using S.B.I.",
            "steps": [
                "Speaks to Ishan by the library steps privately.",
                "States: 'Ishan, we agreed to have the summary by 3 PM. It's blank, which delays Tanvi's slide formatting.'",
                "Asks: 'Is everything okay? What's holding you up?'",
                "Ishan admits: 'I got stuck on the conclusion and felt embarrassed to ask for help.'",
                "Meera explains the conclusion structure in 5 minutes.",
                "Ishan finishes the summary by 6:30 PM with gratitude.",
                "The project is submitted on time with full team unity."
            ],
            "takeaway": "Private, factual accountability with the S.B.I. formula turns defensive delays into immediate problem-solving."
        },
        "mistakes": [
            ("Shouting insults like 'You ruined our whole project, you are the worst teammate ever!'", "Emotional attacks trigger stubborn defiance and make you look like a bully; stick to objective facts."),
            ("Silently doing the missing teammate's work for them without saying a single word.", "Enabling free-riding causes deep burnout for you and teaches the teammate that they can slack off forever.")
        ],
        "checklist": [
            "Is the conversation happening privately away from the group?",
            "Did I use the Situation-Behavior-Impact structure?",
            "Did I avoid insulting character labels ('lazy', 'useless')?",
            "Is there a concrete, timed recovery deadline established?",
            "Do we have clear, professional next steps if the recovery deadline is missed?"
        ],
        "prompt": "How does speaking privately with someone about an overdue task make them much more cooperative than calling them out in a group chat?",
        "takeaway": "Facts over fury, private over public: the S.B.I. framework holds teammates accountable with dignity and results.",
        "vis1": {"title": "The S.B.I. Accountability Model", "caption": "Situation (Anchor time/place) -> Behavior (Observable fact) -> Impact (Project consequence) -> Recovery Plan."},
        "vis2": {"title": "Public Callout vs Private Alignment", "caption": "Public Callout = Shame, defensiveness, rebellion. Private Alignment = Problem-solving, mutual respect, fast completion."},
        "act": {
            "title": "The S.B.I. Accountability Roleplay",
            "obj": "Draft and rehearse an S.B.I. accountability conversation addressing a realistic project delay scenario.",
            "steps": [
                "Scenario: Teammate failed to bring poster colors and chart paper promised for today's workshop.",
                "Draft Situation statement (time and agreed commitment).",
                "Draft Behavior statement (factual absence of materials).",
                "Draft Impact statement (team cannot begin drawing).",
                "Draft Recovery Contract question.",
                "Role-play delivery with a partner maintaining a calm, steady room voice."
            ],
            "output": "A written S.B.I. Dialogue Script rehearsed for constructive peer accountability."
        },
        "guided": {
            "context": "A group member constantly makes excuses and fails to deliver their slides for the third consecutive checkpoint.",
            "optimal": "Speak privately: 'We agreed on three separate deadlines and none were met. I am informing the teacher today so she knows our team contribution split, and we will present without your section.'",
            "opt_reason": "Follows transparent, fair progressive escalation without emotional hostility or passive enabling.",
            "non1": "Physically push them or vandalize their school locker.",
            "non1_reason": "Criminal behavior that results in immediate expulsion.",
            "non2": "Put their name on the final presentation cover page and pretend they did equal work.",
            "non2_reason": "Enables academic fraud and breeds personal bitterness.",
            "takeaway": "Calm, transparent progressive escalation protects team integrity without drama."
        },
        "indep": {
            "context": "Why is establishing intermediate milestones 72 hours before the final submission the best defense against teammate failure?",
            "prompt": "Explain the concept of 'Buffer Windows' in project management and risk mitigation.",
            "rubric": "Explained early detection of non-delivery, sufficient time to adjust roles or self-correct, elimination of night-before panic."
        },
        "quiz": {
            "q": "What does 'S.B.I.' stand for in constructive professional peer feedback?",
            "opt_correct": "Situation (specific time/place), Behavior (observable objective fact), and Impact (the real consequence on the project).",
            "opt_w1": "Shouting, Blaming, and Insulting.",
            "opt_w2": "State Bank of India financial rules.",
            "opt_w3": "Silent Bitter Isolation.",
            "opt_w4": "Subject, Book, and Index."
        },
        "rubric": {
            "task": "Execute constructive peer accountability, utilize the S.B.I. framework, and manage progressive task escalation.",
            "mastery": "Applies S.B.I. framework with surgical factual precision, conducts conversations privately, avoids character defamation, establishes clear recovery contracts.",
            "c1": "S.B.I. Framework Application & Factual Grounding",
            "c2": "Interpersonal Delivery & Privacy Etiquette",
            "c3": "Progressive Escalation & Contract Recovery Design"
        },
        "refs": [
            "How does the Center for Creative Leadership (CCL) train executive CEOs using the Situation-Behavior-Impact model?",
            "What is 'social loafing' in psychology and how do individual accountability logs prevent it?",
            "Why is emotional detachment from project deliverables the secret to stress-free team leadership?",
            "How can clear written meeting minutes prevent teammates from claiming 'I never knew that was due'?"
        ]
    },
    {
        "month": 6, "theme": "Strengths Delegation, Accountability & Brainstorming Facilitation", "seq": 3,
        "cat": "life_communication", "cat_label": "Communication & Confidence",
        "title": "Facilitating a 15-Minute Brainstorming Session with the 'Yes, And...' Rule",
        "why": "In school project meetings, creative ideas are instantly killed by negative phrases like 'That's stupid', 'That won't work', or 'That costs too much'. The improvisational 'Yes, And...' rule builds massive creative momentum and team excitement.",
        "objs": [
            "Master the golden rule of improv theater: 'Yes, And...' (Accept the idea, then build and expand on it)",
            "Enforce Phase 1 (Divergent Ideation): Zero criticism or judgment for 10 minutes; quantity and wild ideas are celebrated",
            "Enforce Phase 2 (Convergent Selection): Filter and refine ideas using Feasibility and Impact criteria",
            "Lead a 15-minute structured brainstorm using sticky notes or a whiteboard"
        ],
        "scenario": "During a Class 7 Science exhibition brainstorm, Arjun suggested: 'What if we build a model of a space habitat on Mars?' Immediately, Kabir sneered: 'That's so dumb, we can't buy rocket fuel.' The room went dead silent and nobody suggested another idea.",
        "expl": "Creative ideas are like fragile baby green sprouts! If you step on them the instant they poke out of the soil with 'No, that's impossible', your garden dies. The secret used by Pixar, Google, and comedy writers is 'Yes, And...'. You never say 'No'; you say 'Yes! And what if we build the Mars habitat dome out of recycled clear plastic bottles?' One wild idea sparks the next breakthrough!",
        "steps": [
            "Step 1 (Establish the Magic Rule): 'For the next 10 minutes, the words 'No', 'Can't', and 'Impossible' are strictly banned.'",
            "Step 2 (The Sticky Note Blitz): Every member writes wild ideas on sticky notes—one idea per note; stick them rapidly on the wall.",
            "Step 3 (Deploy 'Yes, And...'): If someone suggests an extreme idea, build on it: 'Yes! And we can use colored LED lights inside to show oxygen generators!'",
            "Step 4 (Cluster Themes): Group similar sticky notes together into creative clusters (e.g. Models, Interactive Games, Visual Charts).",
            "Step 5 (Convergent Selection): Switch to evaluation mode: Vote with dot stickers on the top 2 ideas that have High Impact and Low Cost.",
            "Celebrate the collective team invention: everyone feels proud because the final idea was built together."
        ],
        "example": {
            "title": "Arjun & Kabir's Mars Habitat",
            "scenario": "The team uses 'Yes, And...' on the Mars project.",
            "steps": [
                "Arjun: 'What if we build a Mars dome habitat?'",
                "Kabir catches himself: 'Yes! And we can use a clear umbrella as the geodesic dome structure!'",
                "Tanvi: 'Yes! And we can make red sand using crushed brick powder from the garden!'",
                "Priya: 'Yes! And we can add a working hydroponic plant under the dome!'",
                "The room buzzes with electric creative energy.",
                "Their interactive Mars Hydroponic Dome wins Best in Show."
            ],
            "takeaway": "Building upon ideas with 'Yes, And...' transforms crazy initial thoughts into award-winning collaborative projects."
        },
        "mistakes": [
            ("Killing an idea in the first 30 seconds with practical budget complaints ('We don't have money for that').", "Separate ideation from budgeting; generate wild concepts first, then scale them down to practical materials in Phase 2."),
            ("Letting one loud member dominate the meeting while others sit silently.", "Use sticky notes or a structured round-robin so quiet members contribute equal creative ideas.")
        ],
        "checklist": [
            "Are judgment and negative phrases ('That won't work') banned during Phase 1?",
            "Did team members actively practice the 'Yes, And...' verbal bridge?",
            "Did every single person contribute at least 3 sticky notes?",
            "Did the group transition to Phase 2 (feasibility voting) only after 10 full minutes of ideation?"
        ],
        "prompt": "How does knowing that nobody is allowed to laugh at your idea change your willingness to share wild creative thoughts?",
        "takeaway": "Accept and expand: the 'Yes, And...' rule turns a quiet room into a blazing creative powerhouse.",
        "vis1": {"title": "The 'Yes, And...' Innovation Chain", "caption": "Idea A (Mars Dome) -> 'Yes, And...' (Clear Umbrella) -> 'Yes, And...' (Brick sand) -> 'Yes, And...' (Live Hydroponics) = GENIUS!"},
        "vis2": {"title": "Divergent vs Convergent Thinking", "caption": "Phase 1: Divergent (Open wide, wild ideas, zero criticism) ---> Phase 2: Convergent (Focus narrow, feasibility, dot voting)."},
        "act": {
            "title": "The 15-Minute 'Yes, And...' Brainstorm Sprint",
            "obj": "Facilitate a structured 15-minute divergent/convergent brainstorming sprint on a real school challenge.",
            "steps": [
                "Challenge: 'How can we make our school playground cleaner and greener on a ₹500 budget?'",
                "Phase 1 (10 mins): Collect at least 15 distinct sticky-note ideas using strict 'Yes, And...' rules.",
                "Cluster ideas into 3 thematic columns.",
                "Phase 2 (5 mins): Conduct dot-voting to select the single best High-Impact / Low-Cost solution.",
                "Record the winning concept and action steps."
            ],
            "output": "A photo or sketch of the Brainstorming Sticky Note Board showing divergent ideas and dot-voting selection."
        },
        "guided": {
            "context": "During an English drama script meeting, a teammate proposes: 'Let's have a live flying dragon on stage!'",
            "optimal": "Say with a smile: 'Yes! And we can build giant dragon wings out of bamboo sticks and black cloth with two students waving them from behind a shadow sheet!'",
            "opt_reason": "Embraces the creative theatrical essence of the dragon and grounds it into clever, low-cost shadow puppetry.",
            "non1": "Roll your eyes: 'Are you stupid? Where will we get a dragon?'",
            "non1_reason": "Crushes the creative spirit and silences the teammate for the rest of the term.",
            "non2": "Agree to buy an expensive robot drone with zero budget.",
            "non2_reason": "Impractical fantasy that fails during real-world stage execution.",
            "takeaway": "Capture the emotional magic of the idea and build a practical theatrical method."
        },
        "indep": {
            "context": "Why do corporate innovation labs at companies like IDEO and Apple ban negative critique during initial design thinking sprints?",
            "prompt": "Explain psychological safety and cognitive exploration in creative problem-solving.",
            "rubric": "Explained psychological safety, fear of peer judgment inhibiting breakthrough ideas, and separation of ideation from editing."
        },
        "quiz": {
            "q": "What is the primary function of the 'Yes, And...' rule during Phase 1 of a group brainstorming session?",
            "opt_correct": "To validate and accept the teammate's concept without immediate criticism, then expand upon it to build collaborative creative momentum.",
            "opt_w1": "To agree with whatever the teacher says without thinking.",
            "opt_w2": "To force everyone to talk at the exact same time.",
            "opt_w3": "To prove that you know more words than your classmates."
        },
        "rubric": {
            "task": "Facilitate creative group brainstorming, enforce divergent ideation rules, and guide convergent solution selection.",
            "mastery": "Bans premature critique flawlessly, deploys 'Yes, And...' bridges effortlessly, ensures equal participation across all members, facilitates objective dot-voting.",
            "c1": "Divergent Ideation & 'Yes, And...' Facilitation",
            "c2": "Psychological Safety & Inclusive Turn-Taking",
            "c3": "Convergent Synthesis & Feasibility Filtering"
        },
        "refs": [
            "How did improv theater pioneer Viola Spolin develop the 'Yes, And...' methodology in the 1960s?",
            "What are the 5 stages of Stanford d.school's Design Thinking framework (Empathize, Define, Ideate, Prototype, Test)?",
            "Why is 'Dot Voting' (giving each member 3 sticky dots) the most democratic way to pick winning ideas?",
            "How can applying 'Yes, And...' in everyday family conversations reduce dinner table arguments?"
        ]
    }
]

print(f"Months 3-6 authored successfully ({len(months_3_to_6)} modules).")
