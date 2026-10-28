# scratch/c6_months_2_to_6.py

months_2_to_6 = [
    # MONTH 2: Critical Thinking & Everyday Problem Solving
    {
        "month": 2, "theme": "Root-Cause Analysis, Fact-Checking & Navigation", "seq": 1,
        "cat": "life_critical_thinking", "cat_label": "Critical Thinking & Everyday Problem-Solving",
        "title": "The '5 Whys' Method: Finding the Root Cause of Everyday Mistakes",
        "why": "Fixing only the surface symptom of a mistake means the problem keeps repeating again and again. Asking 'Why?' 5 times digs past excuses to find the true root cause and prevent recurrence.",
        "objs": [
            "Explain the difference between a surface symptom and a root cause",
            "Apply the 5 Whys interrogation chain to an everyday academic or personal error",
            "Identify behavioral or environmental friction points causing recurring mistakes",
            "Formulate a foolproof preventative system based on the root cause discovery"
        ],
        "scenario": "Varun was late for school on Monday because he couldn't find his bus pass. His father scolded him for being careless, but the same thing happened again on Thursday.",
        "expl": "When a tree's leaves turn brown, spraying green paint on the leaves doesn't fix anything! You must look at the roots: does the tree need water? Asking 'Why?' five times drills straight past surface excuses down to the bedrock cause so you can install a permanent fix.",
        "steps": [
            "Write down the specific problem statement clearly: 'I was late for the school bus.'",
            "Ask Why #1: Why was I late? (Because I spent 12 minutes hunting for my bus pass).",
            "Ask Why #2: Why was I hunting for it? (Because it wasn't inside my school bag).",
            "Ask Why #3: Why wasn't it in the bag? (Because I left it in my weekend jeans pocket).",
            "Ask Why #4: Why did I leave it in my jeans? (Because I have no fixed docking station for cards).",
            "Ask Why #5: Why is there no docking station? (Because I never set up an entryway landing bowl).",
            "Deploy the root fix: Place a designated key & card bowl on the hall table and clip the pass to the bag lanyard immediately."
        ],
        "example": {
            "title": "Varun's 5 Whys Breakthrough",
            "scenario": "Varun drills into why he forgot his math homework book.",
            "steps": [
                "Problem: Math homework left on dining table.",
                "Why 1: Forgot to pack it in the morning.",
                "Why 2: Packed bag in a 3-minute morning rush.",
                "Why 3: Didn't pack the night before as planned.",
                "Why 4: Was exhausted and fell asleep watching videos in bed.",
                "Why 5: Took phone into bedroom instead of leaving it in hall.",
                "Root Fix: Charges phone in living room at 9 PM and packs bag immediately after dinner."
            ],
            "takeaway": "The true cause of forgotten homework wasn't morning memory; it was nighttime phone habits."
        },
        "mistakes": [
            ("Stopping after Why #1 or #2 and settling for a superficial blame answer like 'I was lazy'.", "Laziness is a symptom; look deeper into the physical setup or routine that permitted the failure."),
            ("Using the 5 Whys to attack and blame other people.", "The 5 Whys is a diagnostic tool to fix flawed systems, not an interrogation weapon to hurt others.")
        ],
        "checklist": [
            "Is the initial problem statement concrete and objective?",
            "Does each 'Why?' directly link to the answer above it?",
            "Did I dig through at least 4 to 5 layers?",
            "Does the final solution fix the root system rather than just the symptom?"
        ],
        "prompt": "Think of a mistake you have repeated more than twice. What might be the hidden root cause?",
        "takeaway": "Dig past excuses to root causes: asking 'Why?' five times builds systems that prevent recurring failures.",
        "vis1": {"title": "The Root Cause Iceberg", "caption": "Tip: 'Forgot bus pass' (Symptom) -> Underwater: 'No landing station at front door' (Root Cause)."},
        "vis2": {"title": "The 5 Whys Ladder", "caption": "Climb down 5 rungs from surface symptom to root system fix."},
        "act": {
            "title": "The 5 Whys Forensic Worksheet",
            "obj": "Conduct a 5 Whys investigation on an everyday recurring friction point and design a system fix.",
            "steps": [
                "Identify a recurring nuisance (e.g. lost water bottle, uncharged tablet, messy desk).",
                "Draw a 5-step ladder on paper.",
                "Write out all 5 consecutive questions and honest answers.",
                "Design a physical or schedule-based permanent countermeasure.",
                "Test the countermeasure for 5 consecutive days."
            ],
            "output": "A completed 5 Whys diagram with documented preventative countermeasure."
        },
        "guided": {
            "context": "Anaya scored poorly on her Science vocabulary quiz because she mixed up 'conductor' and 'insulator'.",
            "optimal": "Conduct 5 Whys: Why did she confuse them? Read them passively without testing. Why? Left revision to test morning. Why? No flashcard review scheduled. Fix: Make 2-sided flashcards on the day terms are introduced.",
            "opt_reason": "Identifies passive study habits as root cause and installs active flashcard testing.",
            "non1": "Tell herself 'I am just bad at Science' and give up.",
            "non1_reason": "Adopts a fixed, defeatist mindset that prevents academic growth.",
            "non2": "Blame the teacher for asking tricky questions.",
            "non2_reason": "Deflects personal accountability and learns nothing.",
            "takeaway": "Study failures are system bugs that can be solved with diagnostic root-cause thinking."
        },
        "indep": {
            "context": "Your bicycle tire went flat on the way to school because it had low pressure for two weeks.",
            "prompt": "Apply the 5 Whys to determine the root cause and propose a weekly maintenance habit.",
            "rubric": "Traced lack of routine tire check to lack of weekly calendar trigger; instituted Sunday morning air pump check."
        },
        "quiz": {
            "q": "Why is stopping at Why #1 usually ineffective when diagnosing everyday problems?",
            "opt_correct": "Because Why #1 only identifies the surface symptom, leaving the underlying behavioral or environmental cause untouched.",
            "opt_w1": "Because five is a lucky number in Japanese mathematics.",
            "opt_w2": "Because the first answer is always an intentional lie.",
            "opt_w3": "Because teachers require 5 pages of written excuses."
        },
        "rubric": {
            "task": "Perform a rigorous 5 Whys analysis on an authentic problem and formulate a preventative systemic solution.",
            "mastery": "Maintains tight logical causality across all 5 rungs, bypasses superficial self-blame, designs practical system fix.",
            "c1": "Logical Causality & Inquiry Depth",
            "c2": "Systemic vs Personal Attribution",
            "c3": "Preventative Countermeasure Design"
        },
        "refs": [
            "How do aviation investigators use root cause analysis when inspecting airplane incidents?",
            "Why is changing your environment (like where you charge your phone) easier than relying on willpower?",
            "How can you use the 5 Whys with a friend when working through a misunderstanding?",
            "What is a root cause in your morning routine that causes stress?"
        ]
    },
    {
        "month": 2, "theme": "Root-Cause Analysis, Fact-Checking & Navigation", "seq": 2,
        "cat": "life_critical_thinking", "cat_label": "Critical Thinking & Everyday Problem-Solving",
        "title": "Separating Emotional Assumptions from Verified Facts in Daily Arguments",
        "why": "Jumping to emotional conclusions ('She didn't wave because she hates me!') fuels unnecessary drama, anxiety, and broken friendships. Learning to separate observable facts from internal assumptions keeps you grounded and calm.",
        "objs": [
            "Distinguish between an objective fact (observable by a camera) and a subjective assumption (mind-reading)",
            "Identify common cognitive distortions: catastrophizing, mind-reading, and emotional reasoning",
            "Use the 'Camera Test' to strip drama and emotional bias from confusing social interactions",
            "Ask clarifying questions before reacting emotionally to perceived slights"
        ],
        "scenario": "Dev saw his friend Rohit talking and laughing with two other boys in the corridor. Dev immediately assumed: 'Rohit is making fun of my haircut and turning everyone against me!'",
        "expl": "Our brains love creating dramatic stories! A fact is something a video camera can record: 'Rohit was laughing with two boys.' An assumption is a story your brain made up: 'They are laughing at me.' Testing your assumptions against real facts prevents 90% of friendship misunderstandings.",
        "steps": [
            "Notice when your chest feels tight or you feel angry/hurt.",
            "Write down your immediate thought: 'They hate me and are mocking me.'",
            "Apply the Camera Test: What would a security camera actually record? (Three boys talking by lockers).",
            "Ask: What evidence do I have for my assumption? (Zero concrete evidence).",
            "Brainstorm 2 alternative realistic explanations: 'They were probably sharing a funny cartoon or talking about football.'",
            "If genuinely concerned, ask a neutral clarifying question later: 'Hey Rohit, what was so funny at lockers earlier?'"
        ],
        "example": {
            "title": "Dev's Camera Test",
            "scenario": "Dev tests his assumption about Rohit.",
            "steps": [
                "Recognizes he is mind-reading without proof.",
                "Applies Camera Test: Rohit smiled and looked at his phone, not at Dev.",
                "Decides not to send an angry text message.",
                "At lunch, Rohit says: 'Dev! Look at this hilarious dog video my cousin sent me this morning!'",
                "Dev realizes his emotional assumption was 100% false."
            ],
            "takeaway": "Pausing to verify facts before reacting prevents destroying good friendships over imaginary stories."
        },
        "mistakes": [
            ("Treating your feelings as proof: 'I feel rejected, therefore they must be excluding me.'", "Emotions are signals, not verified facts; never use feelings to judge reality without evidence."),
            ("Spreading rumors based on unverified assumptions about a classmate.", "Passing on gossip harms innocent people; only share what you personally know to be verified true.")
        ],
        "checklist": [
            "What are the cold, observable facts recorded by a camera?",
            "What story is my brain making up about those facts?",
            "Do I have actual evidence, or am I mind-reading?",
            "What are 2 other plausible reasons for their behavior?"
        ],
        "prompt": "Have you ever been completely convinced someone was angry with you, only to find out they were just tired or thinking about something else?",
        "takeaway": "Test the facts, drop the fiction: the camera test protects you from imaginary conflicts and emotional drama.",
        "vis1": {"title": "The Camera vs Storyboard Filter", "caption": "Camera: Observable reality. Storyboard: Assumptions, fears, and internal drama."},
        "vis2": {"title": "The 3 Alternative Explanations Ladder", "caption": "Before concluding 'they hate me', list 3 alternative reasons (tired, distracted, joking about something else)."},
        "act": {
            "title": "The Reality Check Journal",
            "obj": "Examine 2 emotionally charged situations and separate verified facts from personal assumptions.",
            "steps": [
                "Recall two recent times you felt upset, slighted, or anxious.",
                "Draw a 2-column table: 'What Actually Happened (Facts)' vs 'What I Assumed (Story)'.",
                "Write down at least 2 alternate interpretations for each.",
                "Reflect on how this shift in perspective changes your emotional reaction."
            ],
            "output": "A completed 2-column Reality Check worksheet."
        },
        "guided": {
            "context": "The teacher called on three other students to answer questions, but did not call on you even though your hand was raised.",
            "optimal": "Apply Camera Test: Teacher called on students seated on the left side of the room. Assumption: 'Teacher dislikes me.' Alternative: Teacher is giving quieter students a chance to participate.",
            "opt_reason": "Avoids personalizing a routine classroom management decision.",
            "non1": "Slam your textbook shut and pout for the rest of the period.",
            "non1_reason": "Immature emotional reaction based on faulty mind-reading.",
            "non2": "Whisper to a classmate that the teacher is unfair and biased.",
            "non2_reason": "Spreads negativity without factual justification.",
            "takeaway": "Teachers manage 35 students; don't interpret routine turns as personal rejection."
        },
        "indep": {
            "context": "A friend read your text message 3 hours ago (blue ticks) but hasn't replied.",
            "prompt": "List the objective camera facts and 3 realistic explanations other than 'they are ignoring me'.",
            "rubric": "Separated read timestamp from emotional story; suggested busy with family, phone battery dead, doing homework."
        },
        "quiz": {
            "q": "What is the primary difference between a fact and an assumption?",
            "opt_correct": "A fact is an objective reality verifiable by observation, while an assumption is an unproven internal interpretation.",
            "opt_w1": "A fact is what your best friend tells you, while an assumption is what strangers say.",
            "opt_w2": "An assumption is always true if you feel it strongly.",
            "opt_w3": "Facts change depending on how angry you feel."
        },
        "rubric": {
            "task": "Demonstrate the ability to distinguish objective facts from cognitive distortions and assumptions.",
            "mastery": "Applies the Camera Test reliably, identifies mind-reading distortions, generates plausible alternative hypotheses, regulates emotion.",
            "c1": "Objective Reality vs Subjective Interpretation",
            "c2": "Cognitive Distortion Identification",
            "c3": "Alternative Hypothesis Generation"
        },
        "refs": [
            "Why is our brain naturally wired to imagine the worst-case scenario first?",
            "How does social media amplify false assumptions between friends?",
            "What is a kind way to ask someone if they are upset with you without sounding accusatory?",
            "How can separating facts from feelings help you do better during stressful exam periods?"
        ]
    },
    {
        "month": 2, "theme": "Root-Cause Analysis, Fact-Checking & Navigation", "seq": 3,
        "cat": "life_critical_thinking", "cat_label": "Critical Thinking & Everyday Problem-Solving",
        "title": "Reading Public Transit & Metro Maps Independently",
        "why": "Relying strictly on parents or taxi drivers to navigate your city leaves you helpless if separated. Reading transit maps, identifying interchange stations, and tracking terminal directions builds real-world spatial confidence.",
        "objs": [
            "Identify transit network components: colored lines, terminal stations, interchange junctions, and direction of travel",
            "Plan a 2-line metro or bus journey between two arbitrary stations on a city transit map",
            "Determine the correct platform by checking the terminal station direction of the train",
            "Locate emergency help points, station master offices, and customer care counters"
        ],
        "scenario": "Aryan and his uncle were taking the Delhi/Mumbai Metro to a science museum. At Rajiv Chowk / Dadar interchange, the crowd was huge and Aryan felt bewildered by the multiple colored lines and platforms.",
        "expl": "A metro system is like a giant board game with colored tracks! Every train line has two ends (terminals). To know which platform to stand on, you look at which terminal the train is heading toward. Once you know how to read the line map, you can navigate any subway or metro in the world.",
        "steps": [
            "Find your starting station and circle your destination station on the metro map.",
            "Trace the colored line: does one line connect them directly, or is an interchange required?",
            "If an interchange is required, identify the junction station where the two colored lines cross.",
            "Check the Direction of Travel: look at the final terminal station on that line in your direction.",
            "Follow overhead signage on the platform matching that terminal station name.",
            "Count the number of intermediate stops and listen to bilingual platform announcements."
        ],
        "example": {
            "title": "Aryan's Metro Navigation",
            "scenario": "Aryan plans a journey from Yellow Line to Blue Line.",
            "steps": [
                "Start: Hauz Khas. Destination: Pragati Maidan (Supreme Court).",
                "Traces Yellow Line northbound toward Samaypur Badli.",
                "Identifies interchange at Central Secretariat.",
                "Switches to Violet Line toward Kashmere Gate, or changes at Rajiv Chowk for Blue Line toward Noida Electronic City.",
                "Checks platform display screens and leads his uncle calmly through the interchange."
            ],
            "takeaway": "Identifying your interchange station and terminal direction makes navigating massive transit hubs simple."
        },
        "mistakes": [
            ("Boarding a train simply because it arrived at the platform without checking its terminal destination.", "Trains on opposite sides of the platform travel in opposite directions; always check the end station sign."),
            ("Panicking if you miss your stop.", "If you miss a stop, simply alight calmly at the next station, cross to the opposite platform, and take the return train back.")
        ],
        "checklist": [
            "Do I know the name and color of the train line I need?",
            "Do I know the final terminal station in my direction of travel?",
            "Did I identify the exact interchange junction if switching lines?",
            "Do I know where the Station Master or Customer Care booth is located?"
        ],
        "prompt": "How does knowing how to read a city transit map make you feel about growing up and becoming independent?",
        "takeaway": "Find your line, follow the terminal: transit maps give you the freedom to navigate your city with calm mastery.",
        "vis1": {"title": "Anatomy of a Transit Map", "caption": "Colored Lines, Interchange Junctions (Dual Circles), Terminal Stations (Line Ends)."},
        "vis2": {"title": "Platform Overhead Sign Reading", "caption": "Platform 1: Towards [Terminal A] vs Platform 2: Towards [Terminal B]. Match your destination!"},
        "act": {
            "title": "The Metro Transit Route Planner",
            "obj": "Map out a complete round-trip journey between home/school and a cultural monument using a real city transit map.",
            "steps": [
                "Obtain a printed or digital map of your nearest city metro or suburban rail network.",
                "Choose starting station and destination monument.",
                "List: Boarding line color, Terminal direction, Interchange station, Connecting line, Total stops.",
                "Highlight customer care and emergency call points on the route map."
            ],
            "output": "A documented Metro Route Navigation Plan with line colors, junctions, and terminal directions."
        },
        "guided": {
            "context": "You accidentally stay on the train one stop past your intended destination station.",
            "optimal": "Stay calm, step off the train onto the platform, walk to the opposite platform traveling in the reverse direction, and take the train one stop back.",
            "opt_reason": "Calm, logical correction of an everyday navigation error with zero safety risk.",
            "non1": "Try to pry open the closing train doors and jump out while the train is moving.",
            "non1_reason": "Fatal safety hazard; never interfere with automatic doors.",
            "non2": "Cry loudly and run outside the station into traffic.",
            "non2_reason": "Leaves secure station infrastructure and creates extreme danger.",
            "takeaway": "Missing a stop is easy to fix: step off, cross the platform, and take the next train back."
        },
        "indep": {
            "context": "You get separated from your family member in a crowded metro interchange corridor.",
            "prompt": "Describe the 3 immediate actions you will take inside the station to reunite safely.",
            "rubric": "Stayed in designated spot or walked directly to Customer Care booth, approached uniformed station staff, avoided leaving station."
        },
        "quiz": {
            "q": "How do you know which platform to go to when boarding a metro line that runs in two directions?",
            "opt_correct": "Look at the terminal station listed on the platform sign that points in the direction your stop lies.",
            "opt_w1": "Whichever platform has fewer people standing on it.",
            "opt_w2": "Flip a coin and board the first train that arrives.",
            "opt_w3": "Wait until someone tells you where to go."
        },
        "rubric": {
            "task": "Demonstrate comprehensive transit map literacy, platform selection, and emergency protocol awareness.",
            "mastery": "Interprets interchange symbols accurately, determines correct terminal heading, calculates journey stops, articulates safety protocols.",
            "c1": "Map Symbol & Route Interpretation",
            "c2": "Directional & Terminal Platform Selection",
            "c3": "Contingency & Station Safety Awareness"
        },
        "refs": [
            "Why do transit maps use colors instead of just black and white lines?",
            "What should you always do if you see someone drop their metro smart card or token?",
            "How do tactile yellow paving tiles on platforms help visually impaired passengers?",
            "Why are food and open drinks strictly prohibited inside modern metro train cars?"
        ]
    },

    # MONTH 3: Money & Digital Payment Awareness
    {
        "month": 3, "theme": "Digital Payments, Receipt Auditing & Borrowing Ethics", "seq": 1,
        "cat": "life_money_management", "cat_label": "Money Management & Financial Literacy",
        "title": "How UPI QR Codes Work: Verifying Merchant Name & Amount Before Authorizing",
        "why": "UPI and QR code payments make spending frictionless, but scanning blindly leads to payment fraud, overpaying, and scams. Understanding how QR codes transmit data teaches digital financial security.",
        "objs": [
            "Explain what a UPI QR code contains: Virtual Payment Address (VPA), merchant name, and transaction reference",
            "Demonstrate the 3-point check before entering any UPI PIN: Merchant Name, Exact Rupee Amount, and Green Verification Tick",
            "Explain why you NEVER enter a UPI PIN to RECEIVE money",
            "Identify tampered or overlaid sticker QR codes at local retail counters"
        ],
        "scenario": "Rhea accompanied her mother to the stationery shop. Her mother scanned a QR code to pay ₹340 for notebooks. Before pressing pay, Rhea noticed the screen read ₹3,400 with an extra zero!",
        "expl": "A QR code is just a barcode that writes a payment address for you! But machines can make typos, and dishonest people can alter numbers. The most important rule in modern digital money is the 'Pause and Verify' checkpoint: always confirm the recipient's registered business name and the exact amount down to the rupee.",
        "steps": [
            "Position phone camera steady over the merchant's QR stand until recognized.",
            "Look at the screen before touching anything: Check 1: Is the merchant business name correct? (e.g. 'Sharma Stationery').",
            "Check 2: Is the rupee amount typed accurately? Check decimal points and zero count.",
            "GOLDEN SAFETY LAW: Remember that entering your UPI PIN always DEDUCTS money from your account. You NEVER enter a PIN to receive money.",
            "Show the green payment success screen to the shopkeeper so they can log the transaction reference number.",
            "Listen for the audio confirmation box ('₹340 received on PhonePe/Paytm')."
        ],
        "example": {
            "title": "Rhea's ₹3,060 Save",
            "scenario": "Rhea catches a clerical billing error.",
            "steps": [
                "Notices the cashier entered 3400 instead of 340.",
                "Points it out calmly before her mother enters the 6-digit PIN.",
                "Cashier apologizes: 'Sticky keypad! Thank you for catching that!'",
                "Re-enters ₹340 and completes transaction smoothly.",
                "Mother praises Rhea's vigilant financial observation."
            ],
            "takeaway": "Always verify the digits on the payment confirmation screen before entering a PIN."
        },
        "mistakes": [
            ("Entering your UPI PIN when a stranger on an online classifieds site claims 'Enter your PIN to receive ₹500'.", "Entering your PIN ALWAYS sends money OUT of your bank account; receiving money requires ZERO PIN."),
            ("Scanning a loose paper QR sticker pasted over a shop's official acrylic stand.", "Scammers paste fraudulent stickers over store codes; ensure the QR code belongs to the verified shop.")
        ],
        "checklist": [
            "Did I confirm the registered merchant name matches the shop?",
            "Did I verify the exact rupee amount before entering the PIN?",
            "Did I remember that receiving money NEVER requires entering a PIN?",
            "Did I wait for the audio chime or verified checkmark before leaving?"
        ],
        "prompt": "Why do digital payments feel less like spending real money than handing over physical cash notes?",
        "takeaway": "Verify before you validate: the 3-point check keeps your family's digital money safe from errors and fraud.",
        "vis1": {"title": "The 3-Point UPI Screen Check", "caption": "1. Merchant Name -> 2. Exact Rupee Digits -> 3. PIN only sends money out, never receives!"},
        "vis2": {"title": "The Golden Rule of Digital Money", "caption": "PIN = PAY. Receiving money requires NO PIN EVER. Reject anyone who says otherwise!"},
        "act": {
            "title": "The Digital Checkout Inspection",
            "obj": "Observe and verify 3 real-world merchant UPI transactions alongside a parent or guardian.",
            "steps": [
                "Accompany an adult on a grocery or neighborhood purchase.",
                "Inspect the merchant QR code stand for physical tampering.",
                "Audit the merchant name and amount on the screen before the adult inputs PIN.",
                "Verify the transaction reference code on the digital receipt.",
                "Record findings in your financial literacy log."
            ],
            "output": "A 3-transaction UPI verification audit sheet signed by a parent."
        },
        "guided": {
            "context": "An online buyer messages your older brother saying: 'I am sending you ₹1,000 for your old cricket bat. Scan this QR code and type your PIN to claim the funds.'",
            "optimal": "Immediately warn your brother: 'Stop! That is a classic scam. You never scan a QR code or enter a PIN to receive money. Block this user.'",
            "opt_reason": "Protects against one of the most common cyber-financial frauds targeting peer sellers.",
            "non1": "Scan the code quickly and enter the PIN to get the money fast.",
            "non1_reason": "Immediately drains ₹1,000 from your brother's bank account into the scammer's wallet.",
            "non2": "Send the cricket bat before receiving money.",
            "non2_reason": "Loses the cricket bat with zero compensation.",
            "takeaway": "Never enter a PIN to collect money: legitimate payments land directly into accounts automatically."
        },
        "indep": {
            "context": "The soundbox announces '₹150 received' at a bakery, but the shopkeeper claims the payment failed on their phone.",
            "prompt": "How can you show verified proof of payment using the app's UTR (Unique Transaction Reference) number?",
            "rubric": "Explained opening transaction details to show 12-digit UTR and bank timestamp for shopkeeper verification."
        },
        "quiz": {
            "q": "Under what circumstance should you enter your UPI PIN to RECEIVE money from someone?",
            "opt_correct": "NEVER. Entering your UPI PIN is only used to authorize outgoing payments from your account.",
            "opt_w1": "When selling an item on an online classifieds website.",
            "opt_w2": "When claiming a cash prize won in a school competition.",
            "opt_w3": "Whenever a bank manager asks for it on a phone call."
        },
        "rubric": {
            "task": "Demonstrate rigorous digital payment verification, fraud detection, and transactional auditing.",
            "mastery": "Performs 3-point check instinctively, articulates the PIN=PAY rule flawlessly, detects fraudulent QR schemes, verifies UTR logs.",
            "c1": "Transactional Parameter Verification",
            "c2": "Digital Scam & Fraud Awareness",
            "c3": "Receipt & UTR Auditing Discipline"
        },
        "refs": [
            "Why has India become the world leader in real-time digital payments?",
            "Why should children never be given access to an adult's confidential UPI PIN?",
            "What should you do immediately if you realize you made an incorrect payment to the wrong phone number?",
            "How does tracking digital payments in a bank passbook help families budget better?"
        ]
    },
    {
        "month": 3, "theme": "Digital Payments, Receipt Auditing & Borrowing Ethics", "seq": 2,
        "cat": "life_money_management", "cat_label": "Money Management & Financial Literacy",
        "title": "Auditing Supermarket Receipts for Billing Errors & Overcharges",
        "why": "Automated barcode scanners and cashiers make mistakes every day: double scans, wrong weights, or missed discount promotions. Learning to audit physical and digital receipts protects your household budget.",
        "objs": [
            "Identify key sections of a retail receipt: Store Tax ID, Date/Time, Itemized List, Quantities, Unit Rates, and Total Tax",
            "Detect the 3 most common billing errors: double scanning, charged full price for discounted item, and incorrect vegetable weighing",
            "Perform a 60-second receipt check before stepping away from the supermarket checkout area",
            "Politely request a billing correction at the Customer Service desk with receipt in hand"
        ],
        "scenario": "Kavya's family bought 1 packet of butter at the supermarket. When checking the paper slip at home, Kavya saw 'Butter 100g x 2 = ₹116'—the cashier had accidentally scanned the barcode twice!",
        "expl": "A receipt is not trash; it is legal proof of purchase! Computers only process what scanners beep. If a cashier accidentally double-taps an item, or an item on the shelf had a '20% Off' sticker that didn't register at the till, you pay extra unless you check. A 60-second audit catches errors while you are still inside the store.",
        "steps": [
            "Never throw the receipt into the supermarket bin; fold and keep it with your shopping bag.",
            "Step 2 paces away from the busy conveyor belt so you don't block the next customer.",
            "Scan the item count: does the total number of items on the receipt match the number of physical items in your cart?",
            "Scan high-value items: verify that promotional discounts (e.g. '₹50 Off') are reflected on the line items.",
            "Check weighed items: verify that 500g of tomatoes wasn't billed as 1.5kg.",
            "If an error is spotted, walk directly to Customer Service and say: 'Excuse me, I noticed a double scan on this item. Could you please verify and adjust?'"
        ],
        "example": {
            "title": "Kavya's 60-Second Audit",
            "scenario": "Kavya audits the bill right after billing.",
            "steps": [
                "Counts 6 items in cart; receipt lists 7 items.",
                "Identifies 'Dishwash Gel ₹85' scanned twice.",
                "Steps to Customer Service counter calmly.",
                "Supervisor checks security feed and basket, confirms error.",
                "Refunds ₹85 in cash with a store credit note in 2 minutes."
            ],
            "takeaway": "Auditing receipts before leaving the store recovers lost money instantly and without dispute."
        },
        "mistakes": [
            ("Checking the bill 3 days later after throwing away the packaging.", "Supermarkets can only process instant corrections if you report discrepancies promptly with receipt and items."),
            ("Shouting angrily at the cashier for an accidental double scan.", "Cashiers process hundreds of scans an hour; honest clerical slips happen. Always address errors with polite courtesy.")
        ],
        "checklist": [
            "Does the total item count on the bill match items in the bag?",
            "Were advertised shelf discounts applied correctly?",
            "Are produce weights reasonable and accurate?",
            "Do I have the receipt safely stored in case an item needs return?"
        ],
        "prompt": "Why do most people crumble up receipts and throw them away without even glancing at the numbers?",
        "takeaway": "Check the slip before you zip: a 60-second receipt audit protects your family from accidental overcharges.",
        "vis1": {"title": "The Anatomy of a Supermarket Bill", "caption": "Header (Store Info) -> Line Items (Rate x Qty) -> Discounts -> Subtotal & Taxes -> Total."},
        "vis2": {"title": "The 60-Second Sidewalk Audit", "caption": "Step aside from the till. Count items, check discounts, verify weights, file receipt."},
        "act": {
            "title": "The Family Receipt Audit Detective",
            "obj": "Audit 2 recent grocery or retail receipts from home and verify mathematical accuracy.",
            "steps": [
                "Find 2 receipts from recent family shopping trips.",
                "Use a pen to tick off item counts and multiply rate by quantity.",
                "Verify whether GST or sales taxes were added correctly.",
                "Check whether any items had promised discounts that were missed.",
                "Present your verified audit to your family."
            ],
            "output": "A highlighted audit worksheet verifying the accuracy of two real household shopping receipts."
        },
        "guided": {
            "context": "A shelf tag advertised 'Buy 2 Shampoo Bottles Get ₹40 Off'. At checkout, you notice the receipt charged full MRP for both bottles.",
            "optimal": "Keep the two bottles and receipt together, walk to the customer desk, and say: 'The shelf tag displays a ₹40 combo discount for these two bottles that didn't apply at the till. Could you please check the promotion code?'",
            "opt_reason": "Addresses the discrepancy with clear reference to shelf pricing and polite factual evidence.",
            "non1": "Throw the bottles on the floor and storm out of the store.",
            "non1_reason": "Destructive, disrespectful, and solves nothing.",
            "non2": "Say nothing and feel resentful all day.",
            "non2_reason": "Accepts being overcharged and allows store pricing errors to continue.",
            "takeaway": "Polite assertion backed by receipt evidence fixes billing errors every time."
        },
        "indep": {
            "context": "The receipt lists 'Loose Potatoes: 2.4 kg @ ₹30/kg = ₹72', but your bag only has 4 small potatoes.",
            "prompt": "Explain what mistake the weighing clerk made and how you will ask for a re-weighing.",
            "rubric": "Identified wrong vegetable code or heavy item placed on scale; requested re-weighing at the produce counter."
        },
        "quiz": {
            "q": "What is the very first thing you should verify when auditing a supermarket checkout receipt?",
            "opt_correct": "Verify that the total item count on the receipt matches the physical number of items purchased.",
            "opt_w1": "Check the store's company registration number.",
            "opt_w2": "Read the barcode numbers aloud.",
            "opt_w3": "Color in the letters with a highlighter."
        },
        "rubric": {
            "task": "Perform systematic receipt auditing, detect clerical discrepancies, and communicate politely for corrections.",
            "mastery": "Identifies item counts and unit rates quickly, catches promotional omissions, displays exemplary customer courtesy, files records.",
            "c1": "Receipt Structure & Data Interpretation",
            "c2": "Discrepancy Detection & Verification",
            "c3": "Courteous Remediation Communication"
        },
        "refs": [
            "Why is retaining a paper or digital receipt necessary if an electronic appliance stops working under warranty?",
            "What does GST stand for, and why is it listed on retail receipts in India?",
            "How does receipt auditing encourage retail stores to keep their shelf pricing accurate?",
            "What should you do if an ATM dispenses less cash than what is printed on the transaction slip?"
        ]
    },
    {
        "month": 3, "theme": "Digital Payments, Receipt Auditing & Borrowing Ethics", "seq": 3,
        "cat": "life_money_management", "cat_label": "Money Management & Financial Literacy",
        "title": "The Rules of Borrowing Pocket Money: Repayment Terms & Maintaining Trust",
        "why": "Borrowing money casually from friends or siblings without clear repayment terms creates resentment, broken trust, and ruined friendships. Understanding borrowing ethics builds reliable financial character.",
        "objs": [
            "Explain the difference between a gift (free to keep) and a loan (must be repaid in full)",
            "Establish the 3 Borrowing Rules: Exact Amount, Fixed Repayment Date, and Proactive Communication",
            "Maintain a personal Borrowing & Lending Ledger in a notebook",
            "Explain why borrowing to buy non-essential impulse luxuries is a dangerous financial habit"
        ],
        "scenario": "Zain borrowed ₹100 from his classmate Pranav to buy canteen snacks, promising: 'I will return it soon!' Two weeks passed, Zain bought a new comic book, and Pranav felt angry and avoided Zain.",
        "expl": "Trust is like a mirror: once cracked, it takes months to repair! When you borrow even ₹10, you are borrowing someone's hard work. Saying 'I will return it soon' is not a promise because 'soon' has no date. Honorable people agree on an exact day, repay on time, and never buy luxuries while in debt.",
        "steps": [
            "Ask yourself: Is this an absolute emergency or just a temporary craving? Never borrow for impulse treats.",
            "If borrowing is truly necessary, specify the exact amount: 'May I borrow ₹50?'",
            "Propose a concrete calendar repayment date: 'I will return this to you on Friday morning during recess.'",
            "Write the entry immediately in your pocket notebook: '[Date] Borrowed ₹50 from Pranav. Due: Friday Nov 7.'",
            "Repay on or before the agreed date without waiting for the lender to awkwardly ask for their money.",
            "If an unexpected delay occurs, inform the lender BEFORE the due date: 'I have ₹30 today and will give you the remaining ₹20 on Monday. Is that okay?'"
        ],
        "example": {
            "title": "Zain's Trust Restoration",
            "scenario": "Zain learns honorable borrowing ethics.",
            "steps": [
                "Realizes Pranav feels taken advantage of.",
                "Opens his savings jar at home and takes out ₹100.",
                "Hands the money to Pranav the next morning: 'Pranav, I am sorry I delayed. Here is the full ₹100. Thank you for helping me.'",
                "Starts a written pocket money ledger.",
                "Pranav feels respected and their friendship is restored."
            ],
            "takeaway": "Proactively repaying borrowed money without being asked proves you are a person of high integrity."
        },
        "mistakes": [
            ("Waiting for the lender to ask multiple times for their money back before repaying.", "Making someone ask for their own money is disrespectful; return funds proactively before the deadline."),
            ("Spending money on expensive personal treats while still owing money to a friend.", "Pay your debts first before spending pocket money on new toys or snacks.")
        ],
        "checklist": [
            "Did I borrow only for a genuine necessity?",
            "Is there an agreed-upon exact calendar repayment date?",
            "Did I write the transaction in my personal ledger?",
            "Did I return the money proactively without being reminded?"
        ],
        "prompt": "How do you feel when someone borrows your favorite pen or money and 'forgets' to return it?",
        "takeaway": "Honor your word, repay on time: clear borrowing terms preserve trust and deepen lifelong friendships.",
        "vis1": {"title": "The 3 Pillars of Borrowing", "caption": "1. Exact Amount -> 2. Fixed Repayment Date -> 3. Proactive Repayment Before Reminder."},
        "vis2": {"title": "The Personal Lending Ledger", "caption": "Date | Name | Borrowed/Lent | Amount | Due Date | Status (Settled/Pending)."},
        "act": {
            "title": "The Personal Trust Ledger",
            "obj": "Create a formal Borrowing and Lending Ledger in your personal journal or notebook.",
            "steps": [
                "Draw a 6-column table: Date, Person, Item/Money, Amount, Due Date, Settled Checkbox.",
                "Log any current items or rupees you have borrowed from family or friends.",
                "Set a firm calendar date to settle every outstanding item this week.",
                "Review the ledger weekly to ensure zero overdue debts."
            ],
            "output": "A structured, active Borrowing & Lending Ledger with all historical balances reconciled."
        },
        "guided": {
            "context": "You borrowed ₹80 from a classmate for bus fare when you forgot your wallet. On the promised repayment day, you only have ₹50 in your pocket.",
            "optimal": "Approach your classmate first thing in the morning, hand over the ₹50, explain the shortfall honestly, and give a specific day (e.g. tomorrow morning) for the remaining ₹30.",
            "opt_reason": "Exhibits transparency, partial fulfillment, and proactive communication before being confronted.",
            "non1": "Hide from your classmate all day and avoid eye contact.",
            "non1_reason": "Cowardly behavior that destroys personal trust and reputation.",
            "non2": "Pretend you never borrowed any money.",
            "non2_reason": "Blatant dishonesty that brands you as an untrustworthy person.",
            "takeaway": "When you cannot meet a deadline, communicate early and pay whatever portion you have."
        },
        "indep": {
            "context": "A friend asks to borrow ₹200 from your savings to buy a video game skin, promising to repay 'sometime next month'.",
            "prompt": "How will you decline or structure this loan respectfully without ruining the friendship?",
            "rubric": "Explained politely that savings are locked for personal goals, or set strict terms refusing loans for impulse virtual items."
        },
        "quiz": {
            "q": "What is the most honorable way to handle returning money you borrowed from a peer?",
            "opt_correct": "Repay the full amount on or before the agreed-upon date without waiting for the lender to ask for it.",
            "opt_w1": "Wait until they ask you three times before giving half back.",
            "opt_w2": "Give them an old toy instead of money without asking.",
            "opt_w3": "Tell them they are being greedy for wanting their money back."
        },
        "rubric": {
            "task": "Apply rigorous borrowing and lending ethics, maintain financial records, and honor commitments.",
            "mastery": "Defines clear repayment timelines, maintains a ledger, communicates shortfalls proactively, prioritizes debt clearance over luxuries.",
            "c1": "Commitment & Repayment Integrity",
            "c2": "Proactive Communication Discipline",
            "c3": "Record-Keeping & Financial Transparency"
        },
        "refs": [
            "Why do commercial banks charge interest on loans when people borrow money?",
            "What is a 'credit score', and how does adult borrowing behavior affect it?",
            "Why is borrowing things like clothes or books just as serious as borrowing money?",
            "How does being known as a reliable person help you in future school and career projects?"
        ]
    },

    # MONTH 4: Digital Hygiene & Online Safety
    {
        "month": 4, "theme": "Digital Footprint, Passphrase Hygiene & Online Scams", "seq": 1,
        "cat": "life_safety_health", "cat_label": "Safety, Health & Well-being",
        "title": "Creating Unbreakable 4-Word Passphrases & Password Vault Hygiene",
        "why": "Using simple passwords like 'password123', 'admin', or your pet's name leaves your email, school portal, and gaming accounts vulnerable to brute-force hacking in under 2 seconds. A 4-word passphrase creates mathematical invulnerability.",
        "objs": [
            "Explain why length beats complexity: why a 16-character passphrase is 10,000x stronger than a complex 8-character password",
            "Construct a memorable 4-word passphrase using random concrete nouns, numbers, and symbols",
            "Explain why passwords must NEVER be shared with friends or entered on public cyber café computers",
            "Demonstrate how to securely store passphrases in an offline master notebook"
        ],
        "scenario": "Tanmay used 'tanmay2014' for his school learning portal and his gaming account. A classmate guessed it in two tries, logged in, and posted silly messages from Tanmay's account.",
        "expl": "Hackers use supercomputers that test billions of password guesses every single second! Short passwords with numbers (like 'Arjun#1') take a computer 3 seconds to crack. But combining 4 completely unrelated words—like 'Mango-Guitar-Purple-Bicycle42'—creates trillions of combinations that would take a supercomputer 50,000 years to crack, while being effortless for human memory to remember!",
        "steps": [
            "Pick 4 completely unrelated physical nouns (e.g., Tiger, Teacup, Mountain, Blanket).",
            "Connect them with hyphens: 'Tiger-Teacup-Mountain-Blanket'.",
            "Capitalize the first letter of each word to make it readable.",
            "Add a 2-digit number and a special symbol at the end (e.g. 'Tiger-Teacup-Mountain-Blanket#88').",
            "Count the length: 30 characters! Mathematically unbreakable.",
            "Write it down in a dedicated offline 'Secret Passphrase Notebook' kept in your home study drawer.",
            "Golden Security Rule: Never write passwords in sticky notes stuck to monitor bezels or in plain text files named 'passwords.txt'."
        ],
        "example": {
            "title": "Tanmay's Unbreakable Passphrase",
            "scenario": "Tanmay upgrades his digital account security.",
            "steps": [
                "Discards 'tanmay2014'.",
                "Selects 4 random items from his desk: 'Pencil-Cricket-Banyan-River!77'.",
                "Memorizes the visual story: A cricket playing with a pencil under a banyan tree by a river.",
                "Updates his school portal and gaming login.",
                "His accounts remain completely secure against unauthorized access."
            ],
            "takeaway": "Four random words chained together are easy for humans to remember and impossible for supercomputers to crack."
        },
        "mistakes": [
            ("Using your birthdate, school name, pet's name, or best friend's name in your password.", "Personal details are easily found by classmates or social engineering; never use personal trivia in passwords."),
            ("Sharing your account password with your 'best friend' to prove friendship.", "Friendships change, but leaked passwords compromise your permanent digital identity; keep passwords strictly private.")
        ],
        "checklist": [
            "Is my passphrase at least 15 characters long?",
            "Does it contain 4 unrelated words rather than predictable dictionary phrases?",
            "Does it have an offline backup written in my private home study journal?",
            "Have I kept it strictly confidential from all friends and peers?"
        ],
        "prompt": "Why is a passphrase of 4 random words easier for you to remember than 'K8#m$9!z'?",
        "takeaway": "Length beats complexity: four random words build an unbreakable fortress around your digital identity.",
        "vis1": {"title": "Password Strength vs Crack Time", "caption": "8 chars ('P@ss123'): 3 seconds vs 18 chars ('Mango-Bicycle-Drum-Cloud!88'): 50,000 years!"},
        "vis2": {"title": "The Visual Storytelling Mnemonic", "caption": "Picture a mango riding a bicycle with a drum in the clouds. Memorable story = unbreakable passphrase."},
        "act": {
            "title": "The Master Passphrase Generator",
            "obj": "Create 2 original 4-word passphrases using physical nouns and store them in an offline security record.",
            "steps": [
                "Look around your room and choose 4 unrelated physical objects.",
                "Combine them with hyphens, capital letters, and a number/symbol.",
                "Verify length exceeds 16 characters.",
                "Draw a tiny visual story cartoon to anchor the memory.",
                "Record in your home private study ledger."
            ],
            "output": "Two verified 16+ character passphrases recorded in a secure offline study log."
        },
        "guided": {
            "context": "A close friend says: 'If you really trust me, tell me your password so I can log in and unlock a game character for you.'",
            "optimal": "Say with warm confidence: 'I trust our friendship completely, but my family rule is that passwords are like toothbrushes—we never share them with anyone! Let's play together after school instead.'",
            "opt_reason": "Maintains clear boundaries with warmth without making the friend feel accused.",
            "non1": "Give them the password immediately so they don't call you mean.",
            "non1_reason": "Surrenders digital sovereignty and risks account tampering or theft.",
            "non2": "Scream at them and report them to the school principal.",
            "non2_reason": "Overreacts aggressively to a common peer request.",
            "takeaway": "True friends respect digital privacy boundaries; keep passwords strictly personal."
        },
        "indep": {
            "context": "You must log into your school portal from a computer at a public library or cyber café.",
            "prompt": "List 3 vital security precautions you must take during and immediately after your session.",
            "rubric": "Unchecked 'Remember Me', used incognito mode, logged out completely, cleared browser cache/history."
        },
        "quiz": {
            "q": "Why is a 4-word passphrase like 'Elephant-Guitar-Sunshine-Rocket99' far superior to 'P@ssw0rd1'?",
            "opt_correct": "Because its greater length makes automated brute-force mathematical cracking virtually impossible, while remaining easy for humans to visualize.",
            "opt_w1": "Because elephants are lucky animals in online security.",
            "opt_w2": "Because hackers only search for words starting with the letter P.",
            "opt_w3": "Because school firewalls automatically block short words."
        },
        "rubric": {
            "task": "Construct secure multi-word passphrases, explain mathematical entropy principles, and practice digital privacy.",
            "mastery": "Generates 16+ char passphrases, explains length vs complexity advantages, demonstrates offline vault hygiene, upholds privacy boundaries.",
            "c1": "Passphrase Entropy & Construction",
            "c2": "Confidentiality & Boundary Defense",
            "c3": "Credential Management Hygiene"
        },
        "refs": [
            "What is 'Two-Factor Authentication' (2FA) and why does receiving an SMS code make logins safer?",
            "Why do computer security experts recommend using different passphrases for different accounts?",
            "What happens to accounts when an online gaming company suffers a data breach?",
            "How do password manager applications help adults manage dozens of complex passwords safely?"
        ]
    },
    {
        "month": 4, "theme": "Digital Footprint, Passphrase Hygiene & Online Scams", "seq": 2,
        "cat": "life_social_teamwork", "cat_label": "Social Skills, Empathy & Teamwork",
        "title": "Digital Reputation & Peer Respect: How Group Chat Behavior Reflects Character",
        "why": "Screens create a false sense of invisibility, tempting students to send cruel memes, exclude peers from class WhatsApp groups, or forward private screenshots. Digital behavior creates a permanent reflection of your character.",
        "objs": [
            "Apply the 'Billboard Test': Never write or post anything online that you wouldn't want displayed on a giant billboard outside your school",
            "Recognize digital exclusion: deliberately creating splinter groups to gossip about a classmate is cyberbullying",
            "Demonstrate how to be a constructive group chat member: stick to school topics, avoid spamming, and respect quiet hours",
            "Know when and how to take an emotionally heated conversation offline"
        ],
        "scenario": "In a Class 6 section group chat, someone posted an unflattering photo of a classmate who tripped during sports day. Several students responded with laughing emojis and mocking memes.",
        "expl": "Typing behind a glass screen makes it easy to forget there is a living, breathing human being with real feelings reading your words. Once a message or screenshot is sent, it is out of your control forever! The 'Billboard Rule' guarantees that your digital footprint reflects kindness, maturity, and honor.",
        "steps": [
            "Before pressing send on any text, meme, or comment, pause for 5 seconds.",
            "Apply the Billboard Test: Would I be proud if my parents, principal, and future college saw this message?",
            "If someone posts a mean meme about a classmate, DO NOT send a laughing emoji; silence or calling it out stops cruelty.",
            "Speak up with an Upstander comment: 'Hey guys, this isn't cool. Let's stick to discussing the history project.'",
            "Never forward someone's private message or photograph without their explicit written permission.",
            "Observe chat quiet hours: stop sending messages after 8:30 PM to respect classmates' sleep and study time."
        ],
        "example": {
            "title": "Karan's Upstander Voice",
            "scenario": "Karan stops a mocking thread in the class chat.",
            "steps": [
                "Sees classmates mocking an awkward photo of a peer.",
                "Refuses to add laughing stickers.",
                "Types calmly: 'Come on guys, everyone trips sometimes. Let's delete this and get back to science homework.'",
                "Two other classmates chime in agreeing with Karan.",
                "The original sender deletes the photo and apologizes privately."
            ],
            "takeaway": "One calm upstander voice in a group chat gives everyone else permission to do the right thing."
        },
        "mistakes": [
            ("Thinking that deleting a message removes it permanently from the internet.", "Screenshots take less than a second; anything sent into a group chat can be saved permanently by anyone."),
            ("Joining 'secret' chat groups formed specifically to mock or exclude a classmate.", "Participating in exclusionary gossip groups damages your integrity and inflicts deep emotional trauma.")
        ],
        "checklist": [
            "Does this message pass the Billboard Test?",
            "Is the tone respectful, clear, and free from sarcasm?",
            "Am I respecting group members' quiet time (no late-night pings)?",
            "Am I treating private information with absolute confidentiality?"
        ],
        "prompt": "How would you feel if a screenshot of your private thoughts was forwarded to thirty classmates?",
        "takeaway": "Your screen is your mirror: the Billboard Test ensures your digital footprint reflects dignity and kindness.",
        "vis1": {"title": "The Billboard Test", "caption": "Before hitting Send: Would you be proud to see this on a giant billboard outside your school gate?"},
        "vis2": {"title": "The Bystander vs Upstander Matrix", "caption": "Bystander: Laughs or stays silent -> Upstander: 'Hey, that's not cool, let's stop.'"},
        "act": {
            "title": "The Digital Citizenship Code of Conduct",
            "obj": "Draft a 5-point Charter of Respect for your class or project WhatsApp group.",
            "steps": [
                "Identify 5 key principles (e.g. No personal mocking, No forwarding private media, Study topics only, 8:30 PM curfew, No spam chains).",
                "Write each rule clearly using positive, encouraging language.",
                "Share the charter with your study group or class representatives.",
                "Pledge to uphold the charter in all digital interactions."
            ],
            "output": "A written 5-point Digital Group Chat Charter of Respect."
        },
        "guided": {
            "context": "A friend sends you a screenshot of another classmate venting in confidence about feeling sad, saying 'Look how dramatic they are!'",
            "optimal": "Reply firmly: 'It's not fair to share private messages. If they are feeling sad, we should support them, not pass around their private words.'",
            "opt_reason": "Shuts down gossip and protects the vulnerable classmate's dignity without aggression.",
            "non1": "Forward the screenshot to three other friends with laughing emojis.",
            "non1_reason": "Betrays trust, weaponizes vulnerability, and accelerates cyberbullying.",
            "non2": "Screenshot the screenshot and post it on social media.",
            "non2_reason": "Severely escalates cruelty and violates school safety codes.",
            "takeaway": "Refuse to be a link in the gossip chain: stop screenshots from circulating."
        },
        "indep": {
            "context": "A heated argument breaks out in the class group chat over who should be football captain.",
            "prompt": "Write a 2-sentence script proposing to move the discussion offline to school tomorrow.",
            "rubric": "Recognized text messaging inflames emotional tone; proposed meeting face-to-face during recess with coach."
        },
        "quiz": {
            "q": "What is the 'Billboard Test' in digital communication?",
            "opt_correct": "Asking yourself if you would feel proud having your message or photo displayed publicly on a giant billboard outside your school before sending it.",
            "opt_w1": "Advertising products on large highway signs.",
            "opt_w2": "Typing in all capital letters so everyone can read your text.",
            "opt_w3": "Testing whether your phone screen is bright enough outdoors."
        },
        "rubric": {
            "task": "Demonstrate exemplary digital citizenship, peer respect, upstander intervention, and privacy defense.",
            "mastery": "Applies Billboard Test instinctively, intervenes against cyberbullying constructively, respects digital boundaries, maintains confidentiality.",
            "c1": "Digital Empathy & Peer Respect",
            "c2": "Upstander Intervention Courage",
            "c3": "Digital Footprint & Privacy Awareness"
        },
        "refs": [
            "Why do people sometimes say things online that they would never dare say to someone's face?",
            "How can colleges and employers inspect public digital footprints years in the future?",
            "What should you do if someone in a group chat sends threatening or abusive messages?",
            "How does taking a 24-hour break from social messaging apps improve your mood?"
        ]
    },
    {
        "month": 4, "theme": "Digital Footprint, Passphrase Hygiene & Online Scams", "seq": 3,
        "cat": "life_safety_health", "cat_label": "Safety, Health & Well-being",
        "title": "Spotting Online Phishing, Suspicious Links & Fake Prize Contests",
        "why": "Cybercriminals target young students with flashy banners promising 'Free Gaming Skins', 'You Won an iPhone', or fake school contest links to steal passwords and install malware. Developing a skeptical eye keeps your devices safe.",
        "objs": [
            "Identify the 4 red flags of phishing links: artificial urgency ('Act in 2 minutes!'), spelling errors in URLs, promises of free luxury prizes, and requests for login credentials",
            "Inspect URL web addresses before clicking: verify exact domain names (e.g., .edu, official brand spellings)",
            "Explain why 'Free Robux/V-Bucks/Diamonds' generators are 100% fraudulent phishing traps",
            "Demonstrate the protocol for suspicious links: Do not click, take a screenshot, and report to an adult"
        ],
        "scenario": "Aarush received a message on a gaming platform: 'CONGRATULATIONS! You won 10,000 Free Diamonds! Click here: www.free-diamonds-claim-now.xyz and enter your game login to claim within 10 minutes!'",
        "expl": "If a stranger on the street offered you a free gold watch if you handed them your house keys, you would run away! Online phishing works the exact same way. Scammers bait hooks with promises of free game currency or panic messages. Once you inspect the strange URL and artificial urgency, the trap becomes obvious.",
        "steps": [
            "Spot the Bait: Does the message promise free money, free gaming currency, or threaten account deletion?",
            "Look for Artificial Urgency: Words like 'ACT NOW!', 'Only 3 minutes left!', or 'Urgent Warning!' are designed to stop your rational thinking.",
            "Inspect the URL: Look at the actual letters before the '.com' or '.xyz'. Is it 'google.com' or 'g00gle-security-login.xyz'?",
            "Never type usernames, passwords, or phone numbers on any page reached through an unsolicited link.",
            "Golden Rule: If an offer seems too good to be true, it is 100% a scam.",
            "Close the tab immediately, block the sender, and inform an adult guardian."
        ],
        "example": {
            "title": "Aarush's Trap Detection",
            "scenario": "Aarush analyzes the free diamonds link.",
            "steps": [
                "Notices high-pressure countdown clock: '9:59 remaining'.",
                "Inspects URL: '.xyz' domain with multiple hyphens.",
                "Asks: 'Why would a commercial company give away ₹8,000 worth of diamonds for free?'",
                "Closes browser tab without clicking.",
                "Reports link to gaming community safety moderators."
            ],
            "takeaway": "Recognizing artificial urgency and strange URLs neutralizes phishing scams before any damage is done."
        },
        "mistakes": [
            ("Clicking a link 'just to see if it's real' or to see what happens.", "Malicious websites can execute drive-by malware downloads the instant the page loads; never click suspicious links."),
            ("Forwarding a viral scam link to school friends because 'it says forward to 10 friends to win'.", "Chain scam links spread malware to your friends' phones; break the chain immediately.")
        ],
        "checklist": [
            "Does the message promise free prizes or gaming currency?",
            "Is there high-pressure urgency ('Act in 5 minutes!')?",
            "Does the web address have strange spellings or odd extensions (.xyz, .biz)?",
            "Did I avoid entering any passwords or personal details?"
        ],
        "prompt": "Why do cybercriminals use fear ('Your account will be deleted!') or greed ('You won an iPhone!') to trick people?",
        "takeaway": "Pause before you click: artificial urgency and free prize promises are the signature signs of online phishing.",
        "vis1": {"title": "The Anatomy of a Phishing Link", "caption": "Fake URL (g00gle-login.xyz) + Countdown Timer (Panic) + Free Prize Hook (Greed) = SCAM."},
        "vis2": {"title": "The Real vs Fake URL Inspector", "caption": "Legitimate: https://www.talentxcel.net vs Fake: http://talentxcel-free-test.xyz. Check the domain!"},
        "act": {
            "title": "The Phishing Link Detective Lab",
            "obj": "Analyze 3 simulated digital messages and categorize them as Legitimate or Phishing Scam with clear evidence.",
            "steps": [
                "Review 3 case studies: A. Bank alert asking for OTP via SMS link, B. Official school newsletter link, C. WhatsApp forward promising free laptop.",
                "Highlight specific red flags in each message (URL structure, urgency words, grammar errors).",
                "Document the safe protocol response for each scenario.",
                "Review findings with a parent or computer teacher."
            ],
            "output": "A completed Phishing Case Analysis worksheet identifying red flags with evidence."
        },
        "guided": {
            "context": "A WhatsApp message from an unknown number says: 'Dear student, your school scholarship of ₹5,000 is approved. Click here to submit bank details before 5 PM: bit.ly/claim-scholarship-today'.",
            "optimal": "Do not click the link; show the message to your parents and check directly with the school administration office tomorrow morning.",
            "opt_reason": "Verifies official institutional announcements through verified administrative channels rather than random shortlinks.",
            "non1": "Click the link immediately and fill in your parents' bank account details.",
            "non1_reason": "Enables scammers to siphon funds from the bank account.",
            "non2": "Forward the link to all your school classmates so they can claim money too.",
            "non2_reason": "Spreads financial fraud across the entire school student body.",
            "takeaway": "Never submit sensitive family or financial details through unsolicited messaging links."
        },
        "indep": {
            "context": "A friend's social media account suddenly sends you a message: 'Hey! Is this video of you? [weird link]'.",
            "prompt": "Explain why this usually means your friend's account was compromised and what you should do.",
            "rubric": "Recognized account hacking/bot hijacking; called friend via regular phone to alert them; did not click link."
        },
        "quiz": {
            "q": "What is the most reliable warning sign that an incoming digital message is a phishing scam?",
            "opt_correct": "It combines intense artificial urgency ('Act now or lose access!') with an unfamiliar URL requesting credentials or personal data.",
            "opt_w1": "It uses complete sentences and good punctuation.",
            "opt_w2": "It comes from your school's verified official portal.",
            "opt_w3": "It has the word 'The' in the subject line."
        },
        "rubric": {
            "task": "Identify online phishing lures, analyze URL structures, and demonstrate safe cyber security protocols.",
            "mastery": "Spots red flags accurately, inspects domain strings, resists emotional triggers (greed/fear), follows reporting protocols.",
            "c1": "Phishing & Social Engineering Detection",
            "c2": "URL Domain Analysis & Verification",
            "c3": "Incident Response & Reporting Discipline"
        },
        "refs": [
            "Why do scammers use URL shorteners (like bit.ly) to disguise where a link leads?",
            "What does the padlock icon or 'https://' in a browser address bar mean?",
            "How do cybersecurity teams protect banks and hospitals from phishing attacks?",
            "What should you do immediately if you accidentally clicked a suspicious link and typed your password?"
        ]
    },

    # MONTH 5: Everyday Problem-Solving & Navigating Systems
    {
        "month": 5, "theme": "Practical Troubleshooting, Healthcare Navigation & Lost Property", "seq": 1,
        "cat": "life_critical_thinking", "cat_label": "Critical Thinking & Everyday Problem-Solving",
        "title": "Evaluating Three Practical Solutions to a Household Breakdown",
        "why": "When things break at home (leaking tap, stuck zipper, flickering desk lamp), panicking or ignoring the problem makes matters worse. Generating and weighing multiple practical solutions builds resourceful resilience.",
        "objs": [
            "Apply the 3-Solution Brainstorming Rule: Quick Patch, Proper Repair, and Professional Assistance",
            "Evaluate solutions using a Cost-Effort-Safety decision matrix",
            "Recognize when a problem involves hazardous systems (gas, 220V electricity) that require adult intervention",
            "Execute a safe, low-cost fix for a common household malfunction"
        ],
        "scenario": "Neha sat down to study for exams when her study desk lamp refused to turn on. The room was dark, and she felt frustrated and ready to give up on studying.",
        "expl": "Resourceful people don't ask 'Why did this happen to me?'; they ask 'What are three things I can do right now?' Every problem has multiple pathways. Evaluating options by Cost, Effort, and Safety leads to calm, practical solutions every time.",
        "steps": [
            "Step 1 (Diagnose): Isolate the exact issue without guessing. (Is the plug loose? Is the wall switch on? Is the bulb loose?).",
            "Step 2 (Safety Check): Never poke metal into electrical sockets; verify hands are dry.",
            "Step 3 (Option A - Zero Cost Quick Patch): Check the wall switch and tighten bulb when cool.",
            "Step 4 (Option B - Alternate Resource): Move books to the dining room table or use a battery study light.",
            "Step 5 (Option C - Adult/Pro Help): Ask parent to test socket with another working appliance.",
            "Weigh options and execute the safest, fastest path to restore productivity."
        ],
        "example": {
            "title": "Neha's Troubleshooting Matrix",
            "scenario": "Neha evaluates her options calmly.",
            "steps": [
                "Checks wall socket: power switch was turned off by accident.",
                "Flicks switch ON: lamp still doesn't light.",
                "Unplugs lamp, lets bulb cool, tightens thread: lamp turns on brightly!",
                "Total time taken: 4 minutes.",
                "Resumes Math revision with zero disruption."
            ],
            "takeaway": "Methodical troubleshooting step-by-step solves everyday breakdowns without panic or wasted money."
        },
        "mistakes": [
            ("Trying to fix high-voltage electrical wires or gas connections yourself.", "Always respect hazards; 220V wall mains and gas pipes strictly require adult and certified technicians."),
            ("Kicking, hitting, or violently banging broken appliances.", "Physical violence damages electronic circuits and plastic gears; always troubleshoot gently.")
        ],
        "checklist": [
            "Did I identify the exact component that failed?",
            "Is the breakdown safe for student troubleshooting (low voltage / non-gas)?",
            "Did I generate at least 3 distinct solution options?",
            "Did I pick the option with the highest safety and lowest friction?"
        ],
        "prompt": "What household item broke recently in your home, and how did your family resolve it?",
        "takeaway": "Diagnose before you despair: generating three practical options turns breakdowns into easy solutions.",
        "vis1": {"title": "The Troubleshooting Decision Matrix", "caption": "Evaluate Option A, B, and C across Cost, Time, and Safety before acting."},
        "vis2": {"title": "The Safety Red Light Zone", "caption": "Green Zone: Mechanical / Loose screws / Cleaning. Red Zone: 220V Mains / Gas / Pressurized pipes."},
        "act": {
            "title": "The Household Troubleshooter Audit",
            "obj": "Diagnose an everyday minor malfunction (e.g. squeaky door hinge, stuck drawer, loose binder ring) and execute a safe solution.",
            "steps": [
                "Identify a safe minor malfunction at home.",
                "Write down 3 potential solution pathways.",
                "Score each pathway for Safety (1-5), Cost (1-5), and Time (1-5).",
                "Execute the highest-scoring safe solution under adult supervision.",
                "Record the before and after result."
            ],
            "output": "A 1-page Troubleshooting Decision Matrix with documented resolution."
        },
        "guided": {
            "context": "The zipper on your school backpack splits open in the middle while packing books for tomorrow.",
            "optimal": "Option A: Unzip completely back to the start and gently slide forward while pressing teeth together. Option B: Rub a pencil graphite tip or candle wax along teeth to lubricate. Option C: Use safety pins for tonight and seek tailor repair tomorrow.",
            "opt_reason": "Evaluates non-destructive lubrication and mechanical resetting before spending money.",
            "non1": "Yank the zipper violently with pliers until the teeth rip off.",
            "non1_reason": "Permanently destroys the bag zipper requiring complete replacement.",
            "non2": "Leave the bag open and let books fall out on the street tomorrow.",
            "non2_reason": "Irresponsible and causes lost school supplies.",
            "takeaway": "Patience and gentle lubrication fix 80% of stuck zipper mechanisms."
        },
        "indep": {
            "context": "Your bicycle chain slips off the rear cog while riding in your neighborhood.",
            "prompt": "Describe how you will safely pull over and reseat the chain using a stick or cloth without pinching fingers.",
            "rubric": "Pulled over away from traffic, shifted gear down, used stick/leaf to lift chain onto teeth while rotating pedal slowly."
        },
        "quiz": {
            "q": "What should you ALWAYS check first before attempting any minor troubleshooting on a household device?",
            "opt_correct": "Verify physical safety hazards: ensure the device is completely unplugged from electrical power and involves no gas or chemical risks.",
            "opt_w1": "Check how many likes the brand has on Instagram.",
            "opt_w2": "Bang the device with a hammer to see if it responds.",
            "opt_w3": "Throw it in the trash bin immediately."
        },
        "rubric": {
            "task": "Apply systematic troubleshooting methodologies to solve everyday mechanical and practical problems safely.",
            "mastery": "Isolates root malfunctions, generates multiple tiered solutions, respects safety red lines, demonstrates resourceful execution.",
            "c1": "Diagnostic Isolation & Methodology",
            "c2": "Safety Risk Assessment & Compliance",
            "c3": "Practical Resourcefulness & Execution"
        },
        "refs": [
            "Why do engineers and airplane pilots use troubleshooting checklists instead of relying on memory?",
            "How does learning basic repair skills reduce electronic waste and save money?",
            "What common household items (like baking soda, vinegar, or oil) can be used for practical fixes?",
            "How can you document a recurring breakdown so a professional technician can fix it faster?"
        ]
    },
    {
        "month": 5, "theme": "Practical Troubleshooting, Healthcare Navigation & Lost Property", "seq": 2,
        "cat": "life_citizenship_community", "cat_label": "Practical Citizenship & Community Life",
        "title": "How to Navigate a Government Hospital or Poly-Clinic Reception Safely",
        "why": "Medical clinics and hospitals can be intimidating, crowded environments with complex paperwork and long queues. Understanding basic healthcare reception protocols empowers young citizens to navigate medical facilities calmly.",
        "objs": [
            "Identify key hospital zones: Emergency/Casualty, OPD (Out-Patient Department) Registration, Pharmacy, and Diagnostic Labs",
            "Present essential patient information clearly: Patient Name, Age, Symptoms, and Government ID / Medical Card",
            "Practice hygiene discipline in healthcare settings: sanitizing hands, wearing masks, and avoiding touching hospital surfaces",
            "Understand basic triage: why emergency patients are treated ahead of routine OPD queues"
        ],
        "scenario": "Pranit accompanied his grandmother to the government poly-clinic for her blood pressure checkup. The waiting hall was crowded with hundreds of patients, and Pranit didn't know which counter to approach.",
        "expl": "A hospital is like a busy international airport: it has clear signs and procedures for everyone's safety! OPD means 'Out-Patient Department'—for people who visit the doctor and go home the same day. Casualty/Emergency is for life-threatening injuries. Knowing how to get a registration token and wait for your number makes clinic visits smooth and orderly.",
        "steps": [
            "Step 1 (Reception Counter): Walk to the OPD Registration desk; request an OPD slip or token for General Medicine.",
            "Step 2 (Provide Details): State grandmother's full name, age, and show her previous health card or Aadhaar card.",
            "Step 3 (Receive Token): Note down your Token Number and Room/Doctor Number (e.g. Room 14, Token #27).",
            "Step 4 (Waiting Area Hygiene): Sit calmly in designated waiting chairs; keep mask on and sanitize hands.",
            "Step 5 (Consultation Etiquette): When token is called, enter quietly; describe symptoms clearly without exaggeration.",
            "Step 6 (Pharmacy Counter): Take doctor's prescription to the hospital pharmacy counter for stamped medicine dispensation."
        ],
        "example": {
            "title": "Pranit's Hospital Guidance",
            "scenario": "Pranit leads his grandmother through the clinic.",
            "steps": [
                "Finds wheelchair at the front desk for his grandmother.",
                "Collects OPD token #18 from Counter 2.",
                "Locates Room 107 waiting lobby.",
                "Listens attentively to speaker announcements.",
                "Collects prescribed blood pressure tablets from Pharmacy Counter 4.",
                "His grandmother praises his calm, dependable leadership."
            ],
            "takeaway": "Following the Registration-Token-Consultation-Pharmacy sequence makes large healthcare centers simple to navigate."
        },
        "mistakes": [
            ("Touching eyes, nose, or mouth after touching hospital railings, elevator buttons, or counter desks.", "Hospitals carry airborne and surface pathogens; sanitize hands frequently and avoid touching your face."),
            ("Arguing with hospital staff when an emergency trauma patient is taken into the doctor's room before your token.", "Emergency triage prioritizes life-threatening cases first; always respect medical urgency.")
        ],
        "checklist": [
            "Do I have patient ID, previous prescription records, and pen ready?",
            "Did I obtain the OPD registration slip with doctor room number?",
            "Am I practicing strict hand hygiene and mask etiquette?",
            "Do I know where the exit and pharmacy counters are located?"
        ],
        "prompt": "How does staying calm and polite help busy doctors and nurses who are caring for hundreds of sick people?",
        "takeaway": "Token, queue, respect the triage: knowing hospital reception protocols makes healthcare visits smooth and safe.",
        "vis1": {"title": "The 4-Step Clinic Patient Flow", "caption": "1. OPD Registration -> 2. Triage & Vitals -> 3. Doctor Consultation -> 4. Pharmacy Dispensation."},
        "vis2": {"title": "Hospital Infection Defense Kit", "caption": "Well-fitted mask, alcohol hand sanitizer, zero surface touching, respectful 1-meter distancing."},
        "act": {
            "title": "The Healthcare Facility Field Map",
            "obj": "Draw an informational floor plan of a local neighborhood poly-clinic, dispensary, or community health center.",
            "steps": [
                "Visit or research your neighborhood community clinic or health center.",
                "Map key functional zones: Reception/Token desk, OPD rooms, Pharmacy, Washrooms, Emergency entrance.",
                "Note down working hours and emergency telephone helpline numbers.",
                "Keep the healthcare guide pinned on your family safety notice board."
            ],
            "output": "A detailed 1-page Community Healthcare Facility Guide with contact numbers and flow diagram."
        },
        "guided": {
            "context": "While waiting for your routine skin checkup token, a child arrives bleeding from a severe head cut from a playground fall.",
            "optimal": "Step aside immediately, offer the family bench space near the casualty door, and understand that doctors must treat the bleeding child first.",
            "opt_reason": "Demonstrates mature civic empathy and understanding of medical emergency triage.",
            "non1": "Complain loudly to the receptionist that you have been waiting 10 minutes longer.",
            "non1_reason": "Inhumane, selfish, and shows complete ignorance of emergency ethics.",
            "non2": "Crowd around the injured child to take photos.",
            "non2_reason": "Gross violation of medical privacy and hinders first responders.",
            "takeaway": "Critical emergencies always take precedence over routine scheduled checkups."
        },
        "indep": {
            "context": "Your family doctor gives you a handwritten prescription for an antibiotic syrup and throat lozenges.",
            "prompt": "Explain what 3 questions you will ask the pharmacist when receiving the medicine bottles.",
            "rubric": "Asked dosage amount/timing (before/after meals), storage instructions (refrigerate or cool dry), and expiry date check."
        },
        "quiz": {
            "q": "What does 'OPD' stand for in a hospital or poly-clinic setting?",
            "opt_correct": "Out-Patient Department, where patients receive diagnosis and treatment without being admitted overnight.",
            "opt_w1": "Office of Police Defense.",
            "opt_w2": "Only Private Doctors.",
            "opt_w3": "Online Prescription Database."
        },
        "rubric": {
            "task": "Demonstrate knowledge of healthcare facility navigation, patient registration, hygiene protocols, and triage ethics.",
            "mastery": "Articulates patient workflow accurately, exhibits strict healthcare hygiene, understands medical triage ethics, respects healthcare staff.",
            "c1": "Institutional Navigation & Workflow",
            "c2": "Healthcare Hygiene & Pathogen Awareness",
            "c3": "Triage Understanding & Civic Empathy"
        },
        "refs": [
            "Why do healthcare workers wear clean scrubs and sanitize hands between every patient?",
            "What is the difference between a primary healthcare centre (PHC) and a multi-specialty hospital?",
            "How does having a family health folder with past vaccination records save time during emergencies?",
            "What should you do if you feel faint or dizzy while waiting inside a crowded medical clinic?"
        ]
    },
    {
        "month": 5, "theme": "Practical Troubleshooting, Healthcare Navigation & Lost Property", "seq": 3,
        "cat": "life_independence", "cat_label": "Personal Independence & Daily Living",
        "title": "Managing Lost Belongings: Systematic Retracing and Lost & Found Desks",
        "why": "Losing a jacket, library book, or geometry box triggers instant panic, tears, and aimless rushing around. Practicing methodical backwards retracing and checking institutional lost-and-found systems recovers belongings calmly.",
        "objs": [
            "Execute the 3-Step Retracing Protocol: Calm Breathing, Mental Timeline Reconstruction, and Physical Spot Checks",
            "Identify the exact last confirmed timestamp and physical location where the item was in your hands",
            "Approach school and public Lost & Found desks with a precise description and identifying marks",
            "Label all personal school belongings with permanent waterproof identification tags"
        ],
        "scenario": "Rudra left his school blazer somewhere during the school day. At dismissal time (3:00 PM), he frantically sprinted through 4 floors of the school building, crying and checking random classrooms.",
        "expl": "Panic makes your eyes blind! Sprinting around in circles wastes energy and time. Items don't walk away on their own; they sit quietly right where you last placed them. Taking three deep breaths and constructing a reverse mental timeline locates lost belongings 90% of the time.",
        "steps": [
            "Stop moving immediately: sit down on a bench and take three slow, calming breaths.",
            "Anchor the Last Confirmed Sight: When was the very last moment you physically touched or saw the item? (e.g. 'I took off my blazer at 11:15 AM before football recess').",
            "Reconstruct the Physical Path: Where did you walk immediately after 11:15 AM? (Football pitch -> Water cooler -> Science Lab -> Library).",
            "Check High-Probability Drop Zones: Benches next to water coolers, under lab stools, and cubby corners.",
            "Visit the Official Lost & Found: Describe the item precisely: 'Navy blue Class 6 blazer, size 34, with name tag 'Rudra Sharma' stitched inside the collar.'",
            "Prevent future loss: Ensure every jacket, bottle, and pouch has a clear, permanent name label."
        ],
        "example": {
            "title": "Rudra's Systematic Recovery",
            "scenario": "Rudra applies systematic retracing.",
            "steps": [
                "Breathes deeply and remembers he took blazer off before football.",
                "Walks directly to the sports ground pavilion bench.",
                "Checks with sports coach who says: 'Someone left it on the goal post; I deposited it with the Estate Supervisor.'",
                "Visits Lost & Found room, identifies his stitched name tag, and claims blazer in 10 minutes.",
                "Learns that systematic thinking beats frantic running every time."
            ],
            "takeaway": "Anchor the last confirmed moment, retrace your steps calmly, and check official Lost & Found custodians."
        },
        "mistakes": [
            ("Running around frantically checking 20 random places without any logical sequence.", "Random rushing causes panic, exhaustion, and missed school buses; always retrace sequentially."),
            ("Carrying unlabelled expensive personal items like jackets, calculators, and water bottles.", "Without a name tag, a lost item cannot be returned even if a kind stranger finds it; label everything.")
        ],
        "checklist": [
            "Did I stop moving and calm my breathing first?",
            "Do I know the exact time and place I last held the item?",
            "Did I retrace my chronological walking path in reverse?",
            "Did I check the central school Lost & Found office?",
            "Are all my daily belongings labeled with my name and section?"
        ],
        "prompt": "Think of the last time you lost something. Where did you end up finding it, and how did it get there?",
        "takeaway": "Pause the panic, retrace the path: reverse timelines and labeled belongings turn lost items into found treasures.",
        "vis1": {"title": "The Reverse Chronological Timeline", "caption": "Present (3:00pm) <- Library (2:00pm) <- Science Lab (1:00pm) <- Recess Field (11:30am - LAST SEEN)."},
        "vis2": {"title": "The Identification Tag Rule", "caption": "Name + Class/Section + Contact Number permanently marked on inside collar or base."},
        "act": {
            "title": "The Belongings Audit & Labeling Sprint",
            "obj": "Audit 5 major everyday school belongings and ensure permanent waterproof identification tags are affixed.",
            "steps": [
                "Gather 5 items: School Bag, Water Bottle, Lunchbox, Winter Jacket/Blazer, Pencil Box.",
                "Inspect each for visible, legible name and contact identification.",
                "Apply waterproof label stickers or write with permanent fabric marker.",
                "Create a personal checklist of items to verify before leaving school every afternoon."
            ],
            "output": "A verified audit log showing 5 personal school belongings permanently identified with labels."
        },
        "guided": {
            "context": "You arrive at your tuition center and realize your Math textbook is missing from your bag.",
            "optimal": "Pause and remember: Did you pack it at home, or leave it on your school desk during last period? Check with home via phone, and if not there, note to check school desk first thing tomorrow.",
            "opt_reason": "Isolates the two probable locations logically without panic or tears.",
            "non1": "Cry and refuse to participate in tuition class.",
            "non1_reason": "Disrupts learning and solves nothing.",
            "non2": "Blame tuition classmates for stealing your book.",
            "non2_reason": "Accuses innocent people without evidence and creates hostility.",
            "takeaway": "Identify probable boundary locations calmly and maintain focus on your current task."
        },
        "indep": {
            "context": "You find a high-end stainless steel water bottle left behind on a park bench.",
            "prompt": "Describe the honorable, civic-minded procedure you will follow to help return it to its owner.",
            "rubric": "Inspected for name label, handed over to park security/caretaker booth, or posted polite notice on community board."
        },
        "quiz": {
            "q": "What is the very first step you should take upon realizing you have lost an important school item?",
            "opt_correct": "Stop moving, breathe calmly, and identify the exact last time and location you physically saw or held the item.",
            "opt_w1": "Sprint through the corridors screaming for help.",
            "opt_w2": "Accuse the person sitting next to you of theft.",
            "opt_w3": "Throw away your backpack in frustration."
        },
        "rubric": {
            "task": "Apply systematic retracing protocols, demonstrate emotional self-regulation, and implement preventive labeling.",
            "mastery": "Controls initial panic, reconstructs chronological paths, articulates precise descriptive metadata, maintains labeling discipline.",
            "c1": "Emotional Regulation & Composure",
            "c2": "Reverse Chronological Path Reconstruction",
            "c3": "Preventative Asset Labeling & Custodial Inquiries"
        },
        "refs": [
            "Why do public airports and train stations hold unclaimed lost property for months before auctioning it?",
            "How can keeping a dedicated pocket in your school bag for keys and bus pass prevent losing them?",
            "What should you do if you accidentally take home someone else's identical water bottle by mistake?",
            "Why does putting your phone number on a luggage tag make travel less stressful?"
        ]
    },

    # MONTH 6: Communication & Assertive Dialogue
    {
        "month": 6, "theme": "Assertive Refusal, Constructive Feedback & Active Listening", "seq": 1,
        "cat": "life_communication", "cat_label": "Communication & Confidence",
        "title": "The 3-Step Assertive Refusal: Saying 'No' to Peer Pressure with Calm Confidence",
        "why": "Giving in to peer pressure to look 'cool' leads to dangerous stunts, academic dishonesty, and guilt. Passive giving-in and aggressive fighting both fail; assertive refusal protects your integrity while keeping friendships intact.",
        "objs": [
            "Differentiate between Passive (weak surrender), Aggressive (hostile shouting), and Assertive (firm, calm, respectful)",
            "Execute the 3-Step Assertive Refusal: Clear 'No', Brief Reason, and Positive Alternative",
            "Maintain steady eye contact and erect posture without folding arms defensively",
            "Deploy the 'Broken Record' technique when peers persist in pressuring you"
        ],
        "scenario": "Two older classmates dared Sameer to sneak behind the school sports shed during recess to look at forbidden apps on a phone, mocking him: 'What, are you a scared little baby?'",
        "expl": "True strength is not doing whatever the crowd does; true strength is standing your ground! An aggressive response starts a fight; a passive response makes you do things you regret. An assertive 'No' shows that you are the captain of your own choices. When you say 'No' with calm dignity, people respect your backbone.",
        "steps": [
            "Stand tall, plant feet shoulder-width apart, and look the person directly in the eyes.",
            "Step 1 (Clear Statement): Say 'No thanks' or 'I am not doing that' with a firm, even voice tone.",
            "Step 2 (Brief Value-Based Reason): 'I am not risking getting suspended from the football team.' (Keep it short; never make up long fake excuses).",
            "Step 3 (Positive Alternative / Exit): 'I'm heading to the canteen for juice. You can come along if you want.'",
            "The Broken Record: If they push again, repeat your exact statement calmly without getting angry: 'Like I said, I'm not doing that.'",
            "If pressure continues, walk away with your head held high."
        ],
        "example": {
            "title": "Sameer's Firm Stance",
            "scenario": "Sameer handles the dare calmly.",
            "steps": [
                "Looks directly at the older boys without flinching.",
                "Says: 'No thanks. I play by the rules and I'm not getting banned from sports.'",
                "Boy sneers: 'Don't be so boring!'",
                "Sameer repeats calmly: 'Like I said, not interested. See you guys at practice.'",
                "Turns and walks to the basketball court to shoot hoops.",
                "The boys stop teasing and never dare him again."
            ],
            "takeaway": "A calm, unshakeable refusal makes pushy peers realize their pressure has zero power over you."
        },
        "mistakes": [
            ("Making up long, nervous excuses like 'My mother might call my teacher maybe'.", "Fake excuses invite pushy peers to argue and debate; give a short, firm, unarguable reason."),
            ("Shouting, insulting, or starting a fistfight to prove you are not scared.", "Aggression shows a loss of emotional control; calm firmness displays true unshakable strength.")
        ],
        "checklist": [
            "Is my posture erect with direct eye contact?",
            "Is my 'No' clear and unambiguous?",
            "Is my reason brief and value-centered?",
            "Did I offer an alternative or walk away calmly?"
        ],
        "prompt": "Why do people who dare others usually back down when someone responds with calm, relaxed confidence?",
        "takeaway": "Own your boundaries: a calm, 3-step assertive refusal turns peer pressure into self-respect.",
        "vis1": {"title": "Passive vs Aggressive vs Assertive", "caption": "Passive (Slumped head, mumbles) | Aggressive (Clenched fists, shouts) | Assertive (Straight spine, calm eyes, firm voice)."},
        "vis2": {"title": "The 3-Step Refusal Formula", "caption": "1. Clear No -> 2. Short Honest Reason -> 3. Alternative / Walk Away."},
        "act": {
            "title": "The Peer Pressure Roleplay Arena",
            "obj": "Practice and master the 3-Step Assertive Refusal across 3 realistic school peer pressure scenarios.",
            "steps": [
                "Scenario A: Peer asks to copy your homework right before class.",
                "Scenario B: Classmate dares you to climb an unsafe high boundary wall.",
                "Scenario C: Friend pressures you to make fun of a new student's accent.",
                "Write out and rehearse your 3-step assertive script for each scenario with a sibling or friend."
            ],
            "output": "A 3-scenario Assertive Refusal Script card memorized for everyday school defense."
        },
        "guided": {
            "context": "During an exam, your best friend taps your shoulder repeatedly asking you to show your answer sheet for question 4.",
            "optimal": "Keep your answer sheet shielded with your arm, shake your head once firmly, and say softly: 'Can't do it. Focus on your paper.' After exam, offer to study together for the next test.",
            "opt_reason": "Protects academic honesty, avoids mutual disqualification, and offers constructive future help.",
            "non1": "Slide your paper across so they can copy your entire paragraph.",
            "non1_reason": "Violates exam integrity, risks cancellation of both papers, and aids dishonesty.",
            "non2": "Stand up and scream in the middle of the quiet exam hall.",
            "non2_reason": "Disrupts the examination and causes chaos.",
            "takeaway": "Never risk your own integrity to cover someone else's lack of preparation."
        },
        "indep": {
            "context": "A group of popular classmates are planning to skip the last period to go buy street food and urge you to join.",
            "prompt": "Write your 3-step assertive response including posture and physical exit.",
            "rubric": "Delivered clear 'No', stated boundary (attendance record/values), walked to classroom with upright posture."
        },
        "quiz": {
            "q": "What is the key characteristic of an 'Assertive' response to peer pressure?",
            "opt_correct": "Standing tall, making eye contact, and stating a firm, calm 'No' with a brief reason without aggression or apology.",
            "opt_w1": "Looking at the floor, giggling nervously, and giving in after 10 seconds.",
            "opt_w2": "Punching the person in the arm and shouting insults.",
            "opt_w3": "Running away crying to the principal's office immediately."
        },
        "rubric": {
            "task": "Demonstrate the 3-step assertive refusal technique, maintain body language composure, and resist peer coercion.",
            "mastery": "Maintains confident posture and eye contact, delivers crisp refusal without defensiveness, applies broken record technique, exits calmly.",
            "c1": "Physical Posture & Non-Verbal Composure",
            "c2": "Verbal Refusal Clarity & Conciseness",
            "c3": "Peer Coercion Resistance & Boundary Defense"
        },
        "refs": [
            "Why is saying 'No' to a close friend often harder than saying 'No' to a stranger?",
            "How do advertisers and social media influencers use subtle peer pressure to sell products?",
            "What is the difference between healthy positive peer influence and harmful negative peer pressure?",
            "How does learning to refuse peer pressure now help you make sound career and life choices as an adult?"
        ]
    },
    {
        "month": 6, "theme": "Assertive Refusal, Constructive Feedback & Active Listening", "seq": 2,
        "cat": "life_communication", "cat_label": "Communication & Confidence",
        "title": "Delivering Constructive Feedback Without Insulting or Embarrassing Peers",
        "why": "Telling a classmate their work 'looks terrible' causes defensiveness and tears, while falsely saying 'it's perfect' prevents them from improving. The 'Feedback Sandwich' technique delivers honest, helpful improvements with kindness.",
        "objs": [
            "Differentiate between destructive criticism (personal insults) and constructive feedback (actionable improvements)",
            "Master the Feedback Sandwich architecture: Genuine Praise -> Specific Actionable Critique -> Encouraging Forward Look",
            "Deliver peer review feedback in private rather than announcing flaws in front of the entire class",
            "Focus feedback strictly on the work product (drawing, essay, code) rather than the person's character"
        ],
        "scenario": "Priya was asked to peer-review Varun's English speech on Environmental Conservation. Varun spoke very fast and looked at the floor the entire time. Priya wondered how to help him without hurting his feelings.",
        "expl": "Feedback is like medicine: if it tastes like poison, nobody will take it! If you attack a friend with harsh criticism, their brain goes into fight-or-flight defense mode and they ignore your advice. But when you wrap the improvement between two sincere slices of praise, they listen eagerly and improve rapidly.",
        "steps": [
            "Ask permission before giving feedback: 'Hey Varun, would you like a couple of quick tips on your speech rehearsal?'",
            "Slice 1 (Top Bread - Genuine Praise): Highlight something genuinely good: 'Your opening facts about ocean plastics were super interesting and powerful!'",
            "The Filling (Specific Actionable Critique): Target the exact behavior: 'If you slow down your speaking pace by 20% and look at the back row posters, your voice will sound much more commanding.'",
            "Slice 2 (Bottom Bread - Encouraging Forward Look): Finish with confidence: 'You know your facts so well; with that slow pace, your speech will be one of the best in class!'",
            "Keep feedback private: never broadcast critiques across a crowded classroom."
        ],
        "example": {
            "title": "Priya's Feedback Sandwich",
            "scenario": "Priya reviews Varun's speech using the technique.",
            "steps": [
                "Takes Varun aside near the library window.",
                "Praise: 'Your research is fantastic, especially the point about local recycling.'",
                "Actionable tip: 'Try pausing for two seconds between each main paragraph so the audience can absorb your points.'",
                "Encouragement: 'Your passion for the topic really shines through!'",
                "Varun smiles, practices the pauses, and delivers a stellar classroom presentation."
            ],
            "takeaway": "Constructive feedback strengthens both the quality of the work and the depth of the friendship."
        },
        "mistakes": [
            ("Using destructive blunt insults like 'Your speech was boring and you talk too fast.'", "Harsh insults cause shame and humiliation; always frame critiques as specific, actionable skills."),
            ("Giving fake praise like 'Everything is 100% flawless' when there are glaring mistakes.", "Dishonest praise deprives your friend of the chance to fix mistakes before final grading.")
        ],
        "checklist": [
            "Did I deliver the feedback privately rather than in public?",
            "Did I begin with sincere, specific praise?",
            "Is my critique focused on the work, not the person?",
            "Did I end with an encouraging forward-looking vote of confidence?"
        ],
        "prompt": "How do you feel when someone points out a mistake in your work kindly versus when they mock you?",
        "takeaway": "Praise, pinpoint, promote: the Feedback Sandwich turns helpful critique into collaborative growth.",
        "vis1": {"title": "The Feedback Sandwich Architecture", "caption": "Top Slice: Sincere Praise -> Filling: Specific Actionable Improvement -> Bottom Slice: Encouraging Forward Look."},
        "vis2": {"title": "Destructive vs Constructive Feedback", "caption": "Destructive: 'This chart looks awful!' vs Constructive: 'Great data! Using a ruler for the borders will make it look professional.'"},
        "act": {
            "title": "The Peer Review Protocol Challenge",
            "obj": "Write a 3-part Feedback Sandwich review for a peer's essay, art piece, or science project draft.",
            "steps": [
                "Review a real or sample student project piece.",
                "Write Slice 1: Identify 2 specific strengths.",
                "Write the Filling: Formulate 1 actionable, practical improvement.",
                "Write Slice 2: Write an encouraging forward-looking closing statement.",
                "Practice delivering it aloud with warm, friendly body language."
            ],
            "output": "A written 3-part Feedback Sandwich review card ready for collaborative peer review."
        },
        "guided": {
            "context": "Your project partner designed a poster for Social Science, but the handwriting is so small that nobody can read it from 3 feet away.",
            "optimal": "Deliver Feedback Sandwich: 'The colors and map layout you chose are fantastic! If we rewrite the title and bullet points twice as large with a bold marker, everyone will be able to read your great points from across the room. It's going to look like a professional museum poster!'",
            "opt_reason": "Praises design choices, gives actionable sizing guidance, and frames it toward professional quality.",
            "non1": "Laugh and say: 'Did an ant write this? Nobody can read this garbage!'",
            "non1_reason": "Humiliates the partner, creates bitter resentment, and ruins team collaboration.",
            "non2": "Say nothing, submit it, and let the teacher give the project a failing mark.",
            "non2_reason": "Passive failure that damages both team members' grades.",
            "takeaway": "Target functional visual clarity with encouraging, actionable suggestions."
        },
        "indep": {
            "context": "A classmate asks you to review their pencil sketch for art class. The proportions of the hands look awkward.",
            "prompt": "Draft a 3-sentence Feedback Sandwich to help them refine the hand proportions kindly.",
            "rubric": "Praised shading/facial expression, suggested using wrist/finger reference proportions, concluded with enthusiastic encouragement."
        },
        "quiz": {
            "q": "Why is the 'Feedback Sandwich' method so effective when reviewing a peer's school project?",
            "opt_correct": "It cushions actionable, honest critique between two layers of sincere encouragement, keeping the peer receptive rather than defensive.",
            "opt_w1": "Because it requires eating lunch together while studying.",
            "opt_w2": "Because it tricks the peer into doing all the project work.",
            "opt_w3": "Because teachers require sandwiches during examination reviews."
        },
        "rubric": {
            "task": "Deliver constructive peer feedback using the Feedback Sandwich framework with interpersonal empathy.",
            "mastery": "Identifies genuine strengths, formulates actionable specific improvements, maintains private delivery etiquette, builds peer confidence.",
            "c1": "Feedback Architecture (Praise / Critique / Encourage)",
            "c2": "Actionability & Specificity of Improvement",
            "c3": "Interpersonal Etiquette & Delivery Sensitivity"
        },
        "refs": [
            "How do film directors and athletic coaches deliver critique to elite performers without demoralizing them?",
            "Why is receiving critical feedback sometimes emotionally painful even when it is delivered kindly?",
            "What should you say when someone gives you constructive feedback on your own work?",
            "How can practicing the Feedback Sandwich at home improve family conversations?"
        ]
    },
    {
        "month": 6, "theme": "Assertive Refusal, Constructive Feedback & Active Listening", "seq": 3,
        "cat": "life_communication", "cat_label": "Communication & Confidence",
        "title": "Active Listening in Group Discussions: Paraphrasing Before Responding",
        "why": "In group projects, most students don't listen to understand; they just wait for their turn to speak or talk over others. Paraphrasing before responding ensures teammates feel heard, eliminates confusion, and builds leadership.",
        "objs": [
            "Define the difference between passive hearing (sound entering ears) and active listening (processing and reflecting meaning)",
            "Use the Paraphrase Bridge: 'What I am hearing is... is that accurate?' before presenting your own view",
            "Maintain attentive physical listening posture: head nodding, open shoulders, and zero interrupting",
            "Summarize group consensus points at the conclusion of a project planning session"
        ],
        "scenario": "During a group discussion on a Class 6 History skit, four students talked simultaneously, each shouting their own idea. After 20 minutes of shouting, nobody agreed on anything and everyone was exhausted.",
        "expl": "Most arguments happen not because people disagree, but because people feel unheard! When you paraphrase someone's point before stating yours, you perform magic: their tension drops, they realize you respected them enough to listen, and they become twice as willing to listen to your ideas.",
        "steps": [
            "Turn your body toward the person speaking and maintain gentle, respectful eye contact.",
            "Keep your mouth closed and your hands still while they explain their idea; never interrupt.",
            "Wait for a 2-second pause after they finish speaking.",
            "Deploy the Paraphrase Bridge: 'So Arjun, what you are proposing is that we stage the battle scene using shadow puppets on a sheet. Did I capture that correctly?'",
            "Wait for their confirmation ('Yes, exactly!').",
            "Add your perspective thoughtfully: 'Building on that shadow puppet idea, what if we use colored flashlights behind the sheet?'"
        ],
        "example": {
            "title": "Arjun & Tara's Skit Breakthrough",
            "scenario": "Tara uses paraphrasing to unite her team.",
            "steps": [
                "Notices Arjun and Kabir are arguing about set design.",
                "Steps in calmly: 'Kabir, wait. Let me make sure I understand Arjun's idea first.'",
                "Paraphrases: 'Arjun, you want a minimalist cardboard backdrop so we have more floor space to act. Right?'",
                "Arjun sighs with relief: 'Yes! Exactly!'",
                "Tara turns: 'Kabir, how can we paint that cardboard to make it look colorful like you wanted?'",
                "Both boys smile and agree within 3 minutes."
            ],
            "takeaway": "Paraphrasing bridges opposing views and turns chaotic arguments into creative teamwork."
        },
        "mistakes": [
            ("Interrupting someone mid-sentence to say 'No, that's wrong, listen to my idea!'", "Interrupting signals that you don't care about others; let them finish their thought completely."),
            ("Nodding like a robot while thinking about what snack you will eat after school.", "Active listening requires deep cognitive engagement; focus on their words and underlying intention.")
        ],
        "checklist": [
            "Did I allow the speaker to finish without interrupting?",
            "Did I paraphrase their core idea in my own words before responding?",
            "Did I confirm accuracy with them ('Is that right?')?",
            "Did I build constructively upon their idea?"
        ],
        "prompt": "How does it feel when someone truly listens to your idea and repeats it back accurately?",
        "takeaway": "Listen to understand, not to reply: paraphrasing before responding turns heated clashes into collaborative genius.",
        "vis1": {"title": "The Paraphrase Bridge", "caption": "Speaker's Idea -> 'What I hear you saying is [Idea]... right?' -> Validation -> Your Perspective."},
        "vis2": {"title": "Active Listening Body Posture", "caption": "Erect spine, body angled toward speaker, steady eye contact, slight nods, hands resting quietly."},
        "act": {
            "title": "The 3-Minute Paraphrase Drill",
            "obj": "Conduct a structured listening exercise with a peer or family member where every response must begin with an accurate paraphrase.",
            "steps": [
                "Partner A talks for 60 seconds about their favorite hobby or ideal weekend.",
                "Partner B must paraphrase the core message and emotion without adding opinions.",
                "Partner A confirms accuracy with a score (1-5).",
                "Switch roles and repeat with Partner B talking and Partner A paraphrasing."
            ],
            "output": "A signed Active Listening Reflection Worksheet documenting accuracy scores and learnings."
        },
        "guided": {
            "context": "In a group project, a classmate says passionately: 'We should not use PowerPoint slides because they are boring and everyone reads off the screen!'",
            "optimal": "Paraphrase: 'So you feel that slides often make presentations boring when people just read the text, and you'd prefer an engaging interactive format. Is that right?'",
            "opt_reason": "Validates their valid frustration with bad presentations before discussing slide design solutions.",
            "non1": "Shout: 'You are so old-fashioned! Slides are mandatory!'",
            "non1_reason": "Attacks the person, causes immediate defensiveness, and shuts down dialogue.",
            "non2": "Roll your eyes and look at your phone.",
            "non2_reason": "Rude, dismissive, and shows zero collaboration skills.",
            "takeaway": "Paraphrasing validates the speaker's emotional intention and creates common ground."
        },
        "indep": {
            "context": "Two teammates disagree on whether to spend project money on colored charts or digital printouts.",
            "prompt": "Write a 2-sentence script paraphrasing both sides to help the team reach a peaceful consensus.",
            "rubric": "Paraphrased Side A (hands-on handmade craft charm) and Side B (clean professional print typography); synthesized compromise."
        },
        "quiz": {
            "q": "What is the primary benefit of paraphrasing someone's idea before stating your own opinion?",
            "opt_correct": "It confirms you accurately understood their perspective and makes the speaker feel respected and willing to listen to you.",
            "opt_w1": "It gives you time to secretly check your phone.",
            "opt_w2": "It proves that your memory is superior to everyone else's.",
            "opt_w3": "It confuses the teacher so you get more speaking marks."
        },
        "rubric": {
            "task": "Demonstrate active listening, non-verbal engagement, accurate paraphrasing, and synthesis in group dialogue.",
            "mastery": "Listens without interruption, executes the Paraphrase Bridge seamlessly, validates emotional nuances, fosters group consensus.",
            "c1": "Non-Verbal Listening Posture & Presence",
            "c2": "Paraphrasing Accuracy & Perspective Synthesis",
            "c3": "Consensus Building & Dialogue Facilitation"
        },
        "refs": [
            "Why do international diplomats and peace negotiators rely heavily on paraphrasing during treaty talks?",
            "How does looking at a smartphone during a conversation communicate disrespect?",
            "What can you do if a teammate keeps interrupting everyone else in the group?",
            "How does being a great listener make you a natural group leader?"
        ]
    }
]

print(f"Months 2-6 authored successfully ({len(months_2_to_6)} modules).")
