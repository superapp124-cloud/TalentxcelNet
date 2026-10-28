# scratch/c7_months_7_to_12.py

months_7_to_12 = [
    # MONTH 7: Advanced Revision & Knowledge Retention
    {
        "month": 7, "theme": "Spaced Repetition, Garment Pressing & Button Sewing", "seq": 1,
        "cat": "life_study_skills", "cat_label": "Study Skills & Learning Independence",
        "title": "The 4-Stage Spaced Repetition Schedule (Day 1, Day 3, Day 7, Day 21)",
        "why": "Studying a topic for 6 hours in one day and never looking at it again guarantees you will forget 80% of it within a week (the Ebbinghaus Forgetting Curve). Spaced review at expanding intervals locks information into permanent long-term memory.",
        "objs": [
            "Explain the biology of the Ebbinghaus Forgetting Curve: why memories decay without timely retrieval triggers",
            "Implement the 4-Stage Spaced Interval rhythm: Review at Day 1 (24h), Day 3, Day 7, and Day 21",
            "Spend only 10 to 15 minutes per spaced review sprint rather than marathon re-reading sessions",
            "Track spaced review dates on an index card taped inside the front cover of each subject notebook"
        ],
        "scenario": "Neha studied the circulatory system for 5 hours on a Sunday until she felt she knew everything. Three weeks later during her midterm exam, she couldn't remember whether the aorta carried oxygenated or deoxygenated blood.",
        "expl": "Your brain is like a muscle in a gym: lifting a 50 kg weight once a month does not make you strong; lifting 10 kg three times a week builds permanent power! When you review a concept right as your brain begins to forget it, your brain says: 'Aha! This information is important, I must strengthen the neural bridges!' Spacing your review across Day 1, 3, 7, and 21 turns temporary cramming into permanent genius.",
        "steps": [
            "Make an Interval Tracker: Draw a small 4-column stamp on the top corner of your study notes: [Day 1 | Day 3 | Day 7 | Day 21].",
            "Day 1 Review (24 Hours Later): Spend 10 minutes covering the notes and testing your recall using cue questions.",
            "Day 3 Review: Spend 5 minutes solving 2 practice problems or reciting key terms without looking at the book.",
            "Day 7 Review: Take a quick 3-minute glance at your formula flashcards; note how effortlessly the answers flow.",
            "Day 21 Review: One final 3-minute self-quiz cements the concept into permanent long-term memory.",
            "Total study time invested: only 21 minutes spread across a month, yielding 10x stronger retention than a 5-hour cram!"
        ],
        "example": {
            "title": "Neha's Spaced Circulatory Mastery",
            "scenario": "Neha tests spaced repetition on the Circulatory System.",
            "steps": [
                "Studies chapter on Oct 1.",
                "Oct 2 (Day 1): 10-minute active recall review (Aorta, Vena Cava).",
                "Oct 4 (Day 3): 5-minute flashcard quiz.",
                "Oct 8 (Day 7): 3-minute diagram redrawing.",
                "Oct 22 (Day 21): 3-minute mental walk-through.",
                "Scores 100% on the final exam without a single minute of late-night cramming."
            ],
            "takeaway": "Short, spaced retrieval sprints beat marathon cramming by aligning with the natural biology of human memory."
        },
        "mistakes": [
            ("Cramming for 8 straight hours the night before the exam without any prior review.", "Cramming stores data in fragile short-term working memory, causing severe exam blackouts under stress."),
            ("Passive re-reading of highlighted textbook pages during spaced review.", "Re-reading feels easy but tricks your brain; always practice active recall by testing yourself with book closed.")
        ],
        "checklist": [
            "Is the [D1 | D3 | D7 | D21] stamp marked on the top of my lesson notes?",
            "Did I perform Day 1 review within 24 hours of first learning?",
            "Are spaced review sessions kept short and focused (5 to 10 minutes)?",
            "Am I practicing active self-quizzing rather than passive re-reading?"
        ],
        "prompt": "How does spending just 5 minutes reviewing a topic 3 days later feel so much easier than re-learning it from scratch 3 weeks later?",
        "takeaway": "Space the reps, lock the memory: four short review checkpoints defeat the forgetting curve forever.",
        "vis1": {"title": "The Ebbinghaus Forgetting Curve with Spaced Review", "caption": "Without Review: Memory drops to 20% in 6 days. With Spaced Review (D1, D3, D7, D21): Memory rises back to 100% permanently!"},
        "vis2": {"title": "The Spaced Review Date Stamp", "caption": "[Topic: Photosynthesis | Initial: Oct 1 | D1: Oct 2 [x] | D3: Oct 4 [x] | D7: Oct 8 [x] | D21: Oct 22 [x]]."},
        "act": {
            "title": "The Spaced Repetition Subject Tracker",
            "obj": "Apply the 4-Stage Spaced Repetition schedule across 2 challenging chapters in Math, Science, or Social Studies.",
            "steps": [
                "Select 2 challenging chapters you are currently studying in school.",
                "Stamp or draw the [D1, D3, D7, D21] schedule box on the first page of notes.",
                "Calculate and write the exact calendar dates for each review.",
                "Execute the short active-recall sessions on those scheduled dates.",
                "Record your confidence rating (1-10) after each spaced review."
            ],
            "output": "A verified Spaced Repetition Chapter Tracker with dates and verified active recall sign-offs."
        },
        "guided": {
            "context": "You scheduled your Day 7 spaced review for Science on Tuesday, but an unexpected family dinner conflicts with your study hour.",
            "optimal": "Complete the 5-minute review immediately after school at 3:45 PM before leaving, or early Wednesday morning, maintaining the spaced interval without skipping.",
            "opt_reason": "Because spaced reviews take only 5 to 7 minutes, they can be squeezed into tiny transition windows easily.",
            "non1": "Cancel the review completely and decide to cram next month.",
            "non1_reason": "Breaks the neural reinforcement chain and allows the memory trace to decay.",
            "non2": "Refuse to attend family dinner and lock yourself in your room.",
            "non2_reason": "Extreme overreaction when a 5-minute review takes less time than brushing teeth.",
            "takeaway": "Spaced reviews take only 5 minutes: slide them into any morning or afternoon pocket."
        },
        "indep": {
            "context": "Why do digital flashcard apps like Anki and Quizlet use spaced repetition algorithms based on how difficult you rate a card?",
            "prompt": "Explain algorithmic scheduling: hard cards appear tomorrow, easy cards appear in 14 days.",
            "rubric": "Articulated dynamic interval expansion based on retrieval difficulty to optimize study efficiency."
        },
        "quiz": {
            "q": "What happens neurologically when you review a concept right as you are beginning to forget it (Spaced Repetition)?",
            "opt_correct": "The brain interprets the retrieval effort as a signal that the concept is vital, strengthening synaptic neural pathways for long-term storage.",
            "opt_w1": "The brain runs out of electricity and shuts down.",
            "opt_w2": "The memory turns into a chemical that makes you sneeze.",
            "opt_w3": "Textbooks delete old chapters automatically."
        },
        "rubric": {
            "task": "Schedule, track, and execute spaced interval learning sessions using active retrieval techniques.",
            "mastery": "Schedules D1/D3/D7/D21 intervals accurately, enforces 5-10m sprint caps, uses active self-quizzing exclusively, demonstrates long-term mastery.",
            "c1": "Spaced Interval Scheduling & Temporal Cadence",
            "c2": "Active Retrieval vs Passive Recognition",
            "c3": "Memory Architecture & Long-Term Consolidation"
        },
        "refs": [
            "Who was Hermann Ebbinghaus and how did his 1885 memory experiments discover the forgetting curve?",
            "How do medical students memorize 20,000 anatomical terms using spaced repetition software?",
            "What is the 'Leitner Box' physical flashcard system and how does it use 5 compartments for spaced review?",
            "Why is active testing superior to highlighting text with neon marker pens?"
        ]
    },
    {
        "month": 7, "theme": "Spaced Repetition, Garment Pressing & Button Sewing", "seq": 2,
        "cat": "life_independence", "cat_label": "Personal Independence & Daily Living",
        "title": "Safe Ironing of School Shirts & Trousers Under Guidance",
        "why": "Stepping out in wrinkled, crumpled uniforms looks sloppy, but electric irons reach 220°C and can easily scorch fabric or cause severe burns. Mastering proper ironing sequence, heat dials, and trouser pleat alignment builds self-reliance.",
        "objs": [
            "Match fabric types to temperature settings: Low/Synthetic (Polyester), Medium (Wool/Silk), High (Cotton/Linen)",
            "Master the professional shirt ironing sequence: Collar first, Cuffs second, Sleeves third, Back fourth, Front plackets last",
            "Align trouser side-seams to press a crisp center crease without double pleats",
            "Enforce strict thermal and electrical safety: always park iron vertically on its heel base and unplug with dry hands"
        ],
        "scenario": "Aditya wanted to iron his white school uniform shirt for Monday assembly. He set the dial to maximum heat, pressed the iron flat onto the synthetic polyester school badge, and melted a smoking black hole right through his shirt.",
        "expl": "Ironing is applied science: it uses controlled heat, steam, and pressure to relax bent molecular chains in fabric fibers! Different fabrics have different melting points. Synthetic polyester melts at high heat; cotton loves heat and moisture. Following the correct architectural order (small parts first, big parts last) keeps your clothes crisp without creating new wrinkles.",
        "steps": [
            "Check Fabric Care Tag: Identify fiber content (e.g. 65% Polyester / 35% Cotton). Set iron dial to Medium/Synthetic.",
            "Dampen Lightly: A fine mist spray of water makes wrinkles relax twice as fast with less heat.",
            "Step 1 (Collar): Lay collar flat on board, underside up; iron from outer points inward toward the center to avoid bunching.",
            "Step 2 (Cuffs & Sleeves): Iron cuffs flat, then smooth sleeves along the under-arm seam; glide iron in straight long sweeps.",
            "Step 3 (Yoke & Back): Drape shoulder yoke over the narrow tip of the ironing board; press flat, then slide and iron the main back panel.",
            "Step 4 (Front Panels): Iron front button band; glide the narrow iron tip between buttons, NEVER flat over plastic buttons (they melt!).",
            "Trousers: Align inseam and outseam together, lay legs flat, press from cuffs upward to form one sharp center crease.",
            "Hang immediately on a contoured hanger and fasten top button."
        ],
        "example": {
            "title": "Aditya's Assembly Shirt",
            "scenario": "Aditya applies the professional sequence.",
            "steps": [
                "Sets dial to Cotton-Poly blend.",
                "Irons collar points inward: crisp, zero curl.",
                "Presses sleeves along underarm seam.",
                "Glides around front buttons with iron tip.",
                "Hangs shirt on hanger immediately.",
                "Uniform looks brand new, and assembly inspection awards him top presentation marks."
            ],
            "takeaway": "Ironing small parts first (collars, cuffs) and gliding between buttons creates professional crispness."
        },
        "mistakes": [
            ("Running a hot iron soleplate directly over plastic shirt buttons.", "Plastic buttons melt and leave sticky chemical residue on the iron; always glide around buttons."),
            ("Leaving a hot iron resting face-down flat on the padded board while answering the phone.", "A face-down hot iron scorches board cloth and ignites house fires in under 30 seconds; always park upright on heel.")
        ],
        "checklist": [
            "Did I verify the heat dial matches the fabric care label?",
            "Is the iron parked upright on its heel when not in active motion?",
            "Did I follow the correct sequence: Collar -> Cuffs -> Sleeves -> Back -> Front?",
            "Did I glide around plastic buttons rather than over them?",
            "Is the iron dial turned OFF before safely unplugging?"
        ],
        "prompt": "Why does pressing the collar from the points inward prevent fabric bunching at the tips?",
        "takeaway": "Sequence and safety: mastering the collar-to-front ironing sequence turns wrinkled uniforms into crisp dignity.",
        "vis1": {"title": "The Professional Shirt Ironing Sequence", "caption": "1. Collar (Points inward) -> 2. Cuffs -> 3. Sleeves -> 4. Shoulders/Back -> 5. Front Plackets (Around buttons!)."},
        "vis2": {"title": "The Trouser Seam Alignment", "caption": "Align inner and outer side-seams flat on board. Press firmly to create ONE razor-sharp center pleat."},
        "act": {
            "title": "The Master Uniform Pressing Lab",
            "obj": "Safely press, crease, and hang one full school uniform (shirt and trousers) under adult observation.",
            "steps": [
                "Inspect garment labels for fabric composition.",
                "Set up sturdy, wobble-free ironing station with cord clear of walkways.",
                "Press shirt following the 5-step sequence.",
                "Align trouser seams and press crisp center leg creases.",
                "Park iron upright, power down, unplug with dry hands, and hang clothes neatly."
            ],
            "output": "A caregiver sign-off evaluating uniform crispness, button protection, and safety protocols."
        },
        "guided": {
            "context": "You accidentally touch the hot soleplate against a synthetic sports jersey and black melted plastic sticks to the iron base.",
            "optimal": "Unplug the iron immediately and let it cool completely. Rub with a baking soda and water paste on a cotton cloth to gently dissolve the residue without scratching the teflon/metal coating.",
            "opt_reason": "Safely cleans the soleplate without toxic burning fumes or abrasive knife scraping.",
            "non1": "Scrape the hot iron with a sharp metal kitchen knife while plugged in.",
            "non1_reason": "Severe electric shock hazard and permanently ruins the soleplate finish.",
            "non2": "Pour cold water over the hot iron in the sink.",
            "non2_reason": "Thermal shock cracks the internal ceramic element and destroys the iron.",
            "takeaway": "Unplug, cool down, and clean soleplates with non-abrasive paste."
        },
        "indep": {
            "context": "Why do dry cleaners and professional tailors use damp press cloths when ironing dark wool or school blazers?",
            "prompt": "Explain prevention of fabric shine (glazing) and protection of delicate wool fibers from scorching.",
            "rubric": "Explained press cloth prevents iron shine marks on dark wool, diffuses heat evenly, and generates safe steam."
        },
        "quiz": {
            "q": "What is the proper professional sequence for ironing a button-down school uniform shirt?",
            "opt_correct": "Collar first (from points inward), Cuffs second, Sleeves third, Back panel fourth, and Front plackets last (gliding between buttons).",
            "opt_w1": "Iron the front buttons flat first, then crumple the back.",
            "opt_w2": "Iron from the bottom hem up to the collar backwards.",
            "opt_w3": "Leave the shirt on your body while ironing."
        },
        "rubric": {
            "task": "Demonstrate professional garment ironing sequence, temperature dial matching, and thermal safety discipline.",
            "mastery": "Applies fabric-specific temperatures, follows 5-stage shirt sequence, creates crisp trouser pleats, adheres to heel-parking safety.",
            "c1": "Thermal & Electrical Safety Protocol",
            "c2": "Garment Sequencing & Button Navigation",
            "c3": "Trouser Seam Alignment & Finish Crispness"
        },
        "refs": [
            "Why were early 19th-century irons called 'sad irons' and heated on coal stoves?",
            "How does steam ironing work on a molecular level by breaking hydrogen bonds in cellulose?",
            "What is the difference between steam burst irons, dry irons, and vertical garment steamers?",
            "Why is wearing neat, pressed clothes associated with executive presence and professional respect?"
        ]
    },
    {
        "month": 7, "theme": "Spaced Repetition, Garment Pressing & Button Sewing", "seq": 3,
        "cat": "life_independence", "cat_label": "Personal Independence & Daily Living",
        "title": "Sewing on a Loose 2-Hole or 4-Hole Button with Needle and Thread",
        "why": "A popped shirt button right before school or an interview causes embarrassment and panic. Having to throw away good clothes or pay a tailor for a 2-minute fix is unnecessary. Learning to sew a button is an essential life skill.",
        "objs": [
            "Thread a hand-sewing needle, double the thread, and tie a secure tailor's knot at the end",
            "Sew a 4-hole button using parallel bars or cross-stitch with 6 to 8 passes through each pair of holes",
            "Create a thread 'shank' using a matchstick or toothpick underneath the button to allow fabric clearance",
            "Lock and finish the stitch securely on the reverse side with a double lock-knot"
        ],
        "scenario": "Ten minutes before leaving for a school debate competition, the middle button of Dev's uniform shirt popped off. His mother was at work, and Dev had no idea how to thread a needle.",
        "expl": "Buttons are mechanical fasteners that hold human civilization together! A button is not glued; it is anchored through fabric with loops of thread. The secret that separates amateurs from master tailors is the 'Thread Shank': leaving a tiny gap under the button so the buttonhole fabric has room to slide underneath without straining. Mastering this 3-minute repair saves clothes for life.",
        "steps": [
            "Thread the Needle: Cut 18 inches of matching thread; lick or wet the thread tip, pass through needle eye, pull ends even, and tie a double knot at the bottom.",
            "Position the Button: Align the button with the corresponding buttonhole on the shirt placket.",
            "Anchor: Push the needle from the underside of the fabric up through Hole 1, pulling until the knot catches.",
            "The Matchstick Shank: Place a wooden toothpick or matchstick flat on top of the button between the holes.",
            "Sew Passes: Pass needle down through Hole 2, up through Hole 1 (repeat 6 times over the toothpick).",
            "Cross Pattern: If 4-hole, repeat 6 passes between Hole 3 and Hole 4 in a parallel or X pattern.",
            "Wrap the Shank: Remove the toothpick; pull button up, bring needle up under the button (not through holes), and wrap thread tightly around the base 4 times to form a sturdy stem (shank).",
            "Lock Knot: Push needle through to back of fabric, make a small loop stitch, pass needle through loop twice, pull tight, and snip thread."
        ],
        "example": {
            "title": "Dev's 5-Minute Button Fix",
            "scenario": "Dev sews his debate shirt button.",
            "steps": [
                "Retrieves needle and white thread from home sewing tin.",
                "Doubles thread and ties knot.",
                "Uses a toothpick to create a 2mm shank.",
                "Executes 6 crisp passes in an X-pattern.",
                "Wraps thread stem 4 times and locks knot on back.",
                "Snips thread: button is firmer and sturdier than factory stitching!",
                "Arrives at debate confident and impeccably dressed."
            ],
            "takeaway": "Using a toothpick to create a thread shank ensures buttons fasten smoothly and never rip off."
        },
        "mistakes": [
            ("Sewing the button flat and tight against the fabric with zero shank clearance.", "Without a thread shank, the buttonhole cannot fit underneath, puckering the shirt fabric and snapping thread."),
            ("Using a single fragile strand of thread that snaps after two days.", "Always double your thread for hand sewing buttons to guarantee double tensile strength.")
        ],
        "checklist": [
            "Is the thread doubled and knotted securely at the base?",
            "Did I use a toothpick/spacer to build a flexible thread shank?",
            "Are there at least 6 secure passes through each pair of holes?",
            "Is the thread wrapped 4 times around the shank base?",
            "Is the final knot locked tightly on the reverse side?"
        ],
        "prompt": "How does repairing your own clothes make you feel more capable and self-reliant than relying on adults?",
        "takeaway": "Double the thread, build the shank, lock the knot: sewing a button keeps your clothes sharp and your independence strong.",
        "vis1": {"title": "The Thread Shank Secret", "caption": "Toothpick on button -> 6 passes over spacer -> Remove toothpick -> Wrap thread 4x around base (Shank) -> Lock knot on reverse."},
        "vis2": {"title": "Parallel vs Cross-Stitch Patterns", "caption": "Parallel Bars (Two clean lines) vs Cross Pattern (Crisp X). Both provide durable 4-hole anchors."},
        "act": {
            "title": "The Master Button Sewing Practical",
            "obj": "Independently sew a 4-hole button onto a scrap piece of fabric or loose shirt using the thread shank method.",
            "steps": [
                "Obtain needle, matching thread, button, and toothpick spacer.",
                "Double thread and tie tailor's knot.",
                "Execute 6 passes per pair of holes over the spacer.",
                "Wrap thread shank 4 times around stem.",
                "Tie double lock-knot on reverse and test button fastening in a buttonhole."
            ],
            "output": "A securely sewn 4-hole button with a verified 2mm thread shank inspected by a caregiver."
        },
        "guided": {
            "context": "The original button broke and you cannot find an exact matching replacement in the sewing tin.",
            "optimal": "Remove the bottom-most button of the shirt (which is tucked inside trousers and never seen) and sew it into the visible chest position; sew the mismatched button at the hidden bottom.",
            "opt_reason": "Brilliant practical tailoring trick that keeps all visible buttons perfectly uniform and matching.",
            "non1": "Leave the middle button missing so your undershirt shows.",
            "non1_reason": "Looks sloppy, unprofessional, and fails school dress codes.",
            "non2": "Staple the shirt closed with an office stapler.",
            "non2_reason": "Rips fabric holes, leaves sharp metal wires, and ruins the shirt.",
            "takeaway": "Borrow a hidden bottom button to replace a visible chest button."
        },
        "indep": {
            "context": "Why is keeping a tiny travel sewing kit (needle, black/white thread, safety pins) in your school bag a lifesaver?",
            "prompt": "Describe 2 emergency wardrobe malfunctions that a travel kit resolves in 5 minutes.",
            "rubric": "Described ripped uniform seam, popped blazer button, broken backpack strap, or fallen pant hem."
        },
        "quiz": {
            "q": "Why do skilled tailors use a toothpick or matchstick under a button while sewing it onto a shirt?",
            "opt_correct": "To create a raised thread 'shank' that gives the buttonhole fabric enough physical clearance to slide underneath without straining.",
            "opt_w1": "To make the button smell like wood.",
            "opt_w2": "To keep the needle from bending.",
            "opt_w3": "Because buttons are allergic to direct cotton contact."
        },
        "rubric": {
            "task": "Demonstrate manual needle threading, tailor knotting, 4-hole button attachment, thread shank creation, and lock-knotting.",
            "mastery": "Threads needle and knots cleanly, creates proper 2mm thread shank using spacer, wraps stem securely, ties invisible back knot.",
            "c1": "Needle Threading & Tension Knotting",
            "c2": "Shank Construction & Mechanical Spacing",
            "c3": "Pattern Geometry & Reverse Lock-Stitch Security"
        },
        "refs": [
            "How did military uniforms in the 18th century standardize brass button sewing for rapid battlefield repair?",
            "What is the difference between flat buttons, shank buttons, and snap press fasteners?",
            "How does learning basic garment mending reduce landfill textile waste and support the circular economy?",
            "What simple trick helps thread stubborn fraying thread through a tiny needle eye?"
        ]
    }
]

print(f"Months 7 authored successfully ({len(months_7_to_12)} modules).")
