# scratch/c6_months_7_to_12.py

months_7_to_12 = [
    # MONTH 7: Note-Taking, Study Systems & Uniform Care
    {
        "month": 7, "theme": "Cornell Notes, Garment Stain Care & Wardrobe Organization", "seq": 1,
        "cat": "life_study_skills", "cat_label": "Study Skills & Learning Independence",
        "title": "The Cornell Note-Taking System: Dividing Pages into Cues, Notes & Summary",
        "why": "Writing random sentences across a notebook during lectures leaves you with messy walls of text that are impossible to revise before exams. The Cornell method creates a self-quizzing revision tool on every page.",
        "objs": [
            "Format notebook pages into 3 functional zones: 2.5-inch Cue Column (left), 6-inch Notes Column (right), and 2-inch Summary Row (bottom)",
            "Record main lecture points, diagrams, and shorthand abbreviations in the Notes Column during class",
            "Write quiz questions, keywords, and dates in the Cue Column within 24 hours of the lesson",
            "Draft a 2-sentence synthesis summary in the bottom zone to lock in conceptual retention"
        ],
        "scenario": "Neha took 5 pages of chaotic, unorganized notes during a Class 6 History lecture on the Mauryan Empire. When exam week arrived, she couldn't tell which facts were important dates and which were teacher jokes.",
        "expl": "Cornell notes are like an interactive study guide built right into your notebook! Devised at Cornell University, this layout separates active lecture notes from future revision cues. When you cover the right side of the page, the left column turns into an instant flashcard quiz.",
        "steps": [
            "Draw a vertical line 2.5 inches from the left edge of your notebook page.",
            "Draw a horizontal line 2 inches from the bottom edge.",
            "Zone 1 (Notes - Large Right Area): During class, record bullet points, indent sub-points, and draw quick diagrams.",
            "Zone 2 (Cues - Left Margin): That evening, review your notes and write quiz questions and keywords (e.g. 'Who was Chanakya? Ashoka's Edicts?').",
            "Zone 3 (Summary - Bottom): In 2 to 3 sentences, summarize the big takeaway of the entire lecture in your own words.",
            "Study Mode: Cover the Notes column with a sheet of paper; look at the cues and recite answers aloud."
        ],
        "example": {
            "title": "Neha's Mauryan Empire Cornell Sheet",
            "scenario": "Neha structures her History lecture notes.",
            "steps": [
                "Right Column: Notes on Chandragupta, Chanakya's Arthashastra, Ashoka's Kalinga War.",
                "Left Cue Column: 'What was Arthashastra?' 'Why did Ashoka embrace Buddhism?'",
                "Bottom Summary: 'The Mauryan Empire unified ancient India; after Kalinga, Ashoka replaced military conquest with Dhamma (moral governance).'",
                "Revises for her midterm in 10 minutes by covering the right column and answering the left-hand cues.",
                "Scores 98% on the exam with effortless recall."
            ],
            "takeaway": "Dividing your page into notes, cues, and summary turns passive scribbling into an active retention machine."
        },
        "mistakes": [
            ("Writing full verbatim sentences word-for-word as the teacher speaks.", "Never write full sentences; use shorthand, symbols (e.g. ->, +, w/), and bullet fragments to keep pace."),
            ("Leaving the cue column and summary row blank until the night before exams.", "The cue column and summary must be completed within 24 hours while the lesson is fresh in memory.")
        ],
        "checklist": [
            "Is the page formatted with Cue column, Notes area, and Summary row?",
            "Are bullet points and abbreviations used instead of long paragraphs?",
            "Are active self-test questions written in the left cue column?",
            "Is there a 2-3 sentence conceptual summary at the bottom?"
        ],
        "prompt": "How does covering your notes and quizzing yourself from the left margin feel different from just rereading pages passively?",
        "takeaway": "Divide, record, summarize: Cornell notes turn ordinary notebooks into instant self-testing revision powerhouses.",
        "vis1": {"title": "The Cornell Page Layout", "caption": "Left: Cue Column (2.5 in) | Right: Notes Area (6 in) | Bottom: 2-Sentence Summary Box (2 in)."},
        "vis2": {"title": "The Fold & Test Technique", "caption": "Fold page in half along the vertical line. Read question on left, test memory, flip open to verify answer."},
        "act": {
            "title": "The 1-Chapter Cornell Conversion",
            "obj": "Transform a 2-page textbook section or teacher lecture into a complete Cornell note-taking sheet.",
            "steps": [
                "Format a fresh notebook page with Cornell margins.",
                "Read a 2-page section from Science or Social Studies.",
                "Fill the right column with bullet notes and shorthand diagrams.",
                "Add 4 pinpoint quiz questions in the left cue column.",
                "Write a 2-sentence summary in the bottom box.",
                "Test yourself using the cover-and-recall method."
            ],
            "output": "A pristine handwritten Cornell Note sheet verified with questions, notes, and summary."
        },
        "guided": {
            "context": "Your teacher is speaking rapidly about the 3 states of matter and phase changes (melting, evaporation, condensation).",
            "optimal": "Right Column: Draw 3 particle boxes (Solid=packed, Liquid=sliding, Gas=free) with transition arrows. Left Column: 'Define Sublimation? Why do gases compress?' Bottom: 'Matter changes state via thermal energy without altering molecular identity.'",
            "opt_reason": "Captures visual schemas quickly and prepares instant diagnostic self-quizzing questions.",
            "non1": "Try to write down every single word the teacher says in cursive.",
            "non1_reason": "Falls 3 paragraphs behind, gets overwhelmed, and stops listening.",
            "non2": "Stop taking notes completely and decide to read the textbook later.",
            "non2_reason": "Forgets 80% of teacher tips and exam hints shared in lecture.",
            "takeaway": "Use diagrams and shorthand to keep up with rapid verbal explanations."
        },
        "indep": {
            "context": "Review your Cornell notes for a Science chapter on Photosynthesis.",
            "prompt": "Explain how you will conduct a 5-minute self-quiz using only the left cue column.",
            "rubric": "Covered right notes column with index card, read each cue aloud, recited definition/equation, verified accuracy."
        },
        "quiz": {
            "q": "What is the primary function of the 2.5-inch left 'Cue Column' in the Cornell Note-Taking System?",
            "opt_correct": "To hold self-testing quiz questions, key dates, and vocabulary words used to test memory recall with the notes covered.",
            "opt_w1": "To draw artistic doodles when you get bored.",
            "opt_w2": "To record the names of students misbehaving in class.",
            "opt_w3": "To write down the price of school cafeteria snacks."
        },
        "rubric": {
            "task": "Construct and apply the Cornell Note-Taking System to organize academic concepts and facilitate active recall.",
            "mastery": "Formats page zones precisely, utilizes efficient shorthand and diagrams, generates insightful cue questions, synthesizes concise summaries.",
            "c1": "Format & Structural Layout Discipline",
            "c2": "Note Recording & Information Shorthand",
            "c3": "Active Recall Cues & Conceptual Synthesis"
        },
        "refs": [
            "Why does writing notes by hand stimulate stronger neural memory pathways than typing on a laptop?",
            "How can Cornell notes be color-coded with highlighters for rapid pre-exam scanning?",
            "What should you do if a teacher writes a formula on the board that wasn't in your textbook?",
            "How does summarizing a lesson in your own words prove whether you genuinely understand it?"
        ]
    },
    {
        "month": 7, "theme": "Cornell Notes, Garment Stain Care & Wardrobe Organization", "seq": 2,
        "cat": "life_independence", "cat_label": "Personal Independence & Daily Living",
        "title": "Washing, Treating Stains & Drying School Uniform Shirts Safely",
        "why": "Leaving ink marks, curry stains, or sweat collars unwashed ruins expensive school uniforms and looks unkempt. Learning targeted pre-treatment, gentle hand-washing, and proper drying extends fabric life and builds self-reliance.",
        "objs": [
            "Identify the golden rule of stain removal: Treat stains immediately with cold water; never use hot water on fresh proteins or dyes",
            "Pre-treat collar and cuff grime using laundry soap bar and a soft scrubbing brush",
            "Demonstrate gentle hand-wash agitation and rinsing in a bucket until water runs clear",
            "Hang uniform shirts on contoured hangers in shaded, breezy areas to prevent sun-fading and wrinkles"
        ],
        "scenario": "Aditya spilled yellow dal on his white school uniform shirt during lunch. He hid the shirt in his laundry basket without saying anything. Three days later, the turmeric stain had set like permanent yellow paint.",
        "expl": "Stains are like wet cement: if you rinse them immediately, they wash away in 10 seconds; if you let them dry or apply hot water, they set into the fabric forever! Knowing how to pretreat collars, wash gently, and dry uniforms in the breeze keeps you looking sharp and saves your family money.",
        "steps": [
            "Act Fast: Rinse fresh food or mud stains immediately from the reverse side under cold running tap water.",
            "Collar & Cuff Pre-treatment: Dampen the collar, rub a mild laundry soap bar across the sweat line, and let sit for 10 minutes.",
            "Bucket Wash: Fill a bucket with room-temperature water, dissolve 1 teaspoon of detergent powder, and submerge shirt.",
            "Agitate: Squeeze and swirl the fabric gently for 3 minutes; use a soft-bristle brush lightly on stubborn collar grime.",
            "Rinse: Drain soapy water, refill with clean water, and rinse shirt 2 to 3 times until zero soap bubbles remain.",
            "Hang to Dry: Button the top collar button, place shirt on a plastic hanger, and hang in a breezy, shaded balcony away from harsh bleaching sunlight."
        ],
        "example": {
            "title": "Aditya's White Shirt Rescue",
            "scenario": "Aditya learns the cold-water flush technique.",
            "steps": [
                "Flushes fresh ink smudge with cold water from the backside of fabric.",
                "Applies a drop of liquid detergent and rubs fabric gently against itself.",
                "Soaks in soapy bucket for 15 minutes.",
                "Rinses thoroughly until rinse water is crystal clear.",
                "Hangs on hanger in shaded balcony.",
                "Shirt dries crisp, spotless, and ready for school."
            ],
            "takeaway": "Immediate cold-water flushing and gentle soap pre-treatment removes 95% of school uniform stains."
        },
        "mistakes": [
            ("Pouring scalding hot water over fresh food, blood, or ink stains.", "Hot water literally cooks proteins and binds dyes into cotton fibers, making stains permanent."),
            ("Wringing and twisting a wet shirt with violent force.", "Aggressive twisting snaps fabric threads and distorts shirt collars; press water out gently between palms.")
        ],
        "checklist": [
            "Did I flush the stain immediately with cold water?",
            "Did I pre-treat collar and cuff lines with soap?",
            "Did I rinse until all detergent foam is completely gone?",
            "Is the shirt buttoned and drying on a hanger in the shade?"
        ],
        "prompt": "How does wearing a crisp, clean uniform you washed yourself change your pride at school assembly?",
        "takeaway": "Treat it fast, rinse it cold: proper uniform care preserves your clothes and demonstrates mature independence.",
        "vis1": {"title": "The Stain Removal Playbook", "caption": "Ink/Food -> Flush from reverse with Cold Water -> Pre-treat with soap -> Gentle rub -> Air dry in shade."},
        "vis2": {"title": "The Collar Button Drying Trick", "caption": "Fasten top button on hanger before drying to keep shirt collar sharp and prevent wrinkling."},
        "act": {
            "title": "The Uniform Wash & Stain Challenge",
            "obj": "Independently wash, rinse, and hang dry a school uniform shirt or sports jersey following correct protocols.",
            "steps": [
                "Inspect shirt for collar grime or lunch spots.",
                "Pre-treat collar line with laundry soap bar.",
                "Hand-wash in a detergent bucket with gentle agitation.",
                "Rinse twice in fresh water.",
                "Hang on a contoured hanger in a shaded drying area."
            ],
            "output": "A signed caregiver verification of an independently washed, rinsed, and neatly hung uniform shirt."
        },
        "guided": {
            "context": "A blue ballpoint pen leaks into your shirt pocket leaving a 2-centimeter dark ink stain.",
            "optimal": "Place paper towels beneath the stain, dab with cold water and rubbing alcohol/liquid sanitizer to dissolve the ink solvent, blot repeatedly, then wash.",
            "opt_reason": "Alcohol dissolves ink resins without damaging cotton fibers; blotting transfers ink to the paper towel.",
            "non1": "Throw the shirt in hot water with bleach immediately.",
            "non1_reason": "Bleach weakens cotton threads and hot water sets the ink permanently.",
            "non2": "Rub the ink furiously with a rough dry towel.",
            "non2_reason": "Spreads the ink spot over a 10-centimeter area.",
            "takeaway": "Dab and blot solvent through the stain; never scrub fresh ink outwards."
        },
        "indep": {
            "context": "Why should colored school sports jerseys never be dried under blazing direct mid-day sunlight for hours?",
            "prompt": "Explain the effect of ultraviolet (UV) solar rays on synthetic fabric dyes and elastic.",
            "rubric": "Explained UV photodegradation, fading of bright dye pigments, and breakdown of waistband elastic."
        },
        "quiz": {
            "q": "Why should fresh food or ink stains ALWAYS be flushed with cold water rather than hot water?",
            "opt_correct": "Hot water sets chemical and protein bonds into fabric fibers permanently, while cold water washes them away.",
            "opt_w1": "Because hot water makes clothes shrink to doll size instantly.",
            "opt_w2": "Because detergents only work in icy water.",
            "opt_w3": "Because cold water changes the color of the stain to invisible."
        },
        "rubric": {
            "task": "Demonstrate stain pre-treatment, bucket hand-washing agitation, rinsing, and hanger drying techniques.",
            "mastery": "Applies correct stain chemistry principles, avoids fabric damage during wringing, rinses thoroughly, hangs correctly.",
            "c1": "Stain Identification & Cold Pre-Treatment",
            "c2": "Agitation & Thorough Rinsing Technique",
            "c3": "Hanger Care & Shaded Drying Protocol"
        },
        "refs": [
            "Why is leaving detergent residue in clothes harmful to sensitive human skin?",
            "What do the laundry symbols on clothing care tags (tub, triangle, iron) mean?",
            "How does washing dark and white clothes in separate batches prevent color bleeding?",
            "How can hanging clothes properly on hangers reduce the need for heavy iron pressing?"
        ]
    },
    {
        "month": 7, "theme": "Cornell Notes, Garment Stain Care & Wardrobe Organization", "seq": 3,
        "cat": "life_independence", "cat_label": "Personal Independence & Daily Living",
        "title": "Folding & Stacking Clothes Using the KonMari Vertical Method",
        "why": "Stacking clothes in flat horizontal piles means pulling one shirt out causes the entire tower to collapse into a messy heap. Vertical folding lets you see every garment at a glance and keep drawers permanently organized.",
        "objs": [
            "Master the 3-step vertical fold for t-shirts: Side folds inward, fold in half lengthwise, fold into self-standing rectangle thirds",
            "Apply vertical folding to socks (flat tuck, never stretch into tight round balls)",
            "Organize a wardrobe drawer or shelf so every garment is visible without moving other clothes",
            "Maintain a clutter-free wardrobe system where items are returned to their exact vertical slot"
        ],
        "scenario": "Tanvi opened her clothes cupboard to find a blue sports t-shirt. She yanked it from the bottom of a 10-shirt tall pile; the whole stack collapsed onto the floor in an unwearable wrinkled heap.",
        "expl": "Think of a library: books stand upright on shelves with their spines showing so you can pull out any book without disturbing the others! When you fold clothes into compact, self-standing little rectangles and file them vertically, your drawer looks like a colorful book file where everything is visible instantly.",
        "steps": [
            "Lay the t-shirt completely flat on a table, smoothing out all wrinkles with open palms.",
            "Fold the right side inward to the center line and fold the sleeve back flat.",
            "Fold the left side inward to match, forming a long neat rectangle.",
            "Fold the rectangle in half lengthwise, leaving an inch of space before the bottom hem.",
            "Fold into thirds (or rolled thirds) so the garment forms a compact, firm little package.",
            "The Golden Test: Stand the folded garment upright on the table; if it stands unsupported, the fold is perfect!",
            "File vertically into your drawer from front to back like index cards."
        ],
        "example": {
            "title": "Tanvi's Vertical Wardrobe",
            "scenario": "Tanvi reorganizes her messy clothing drawer.",
            "steps": [
                "Empties drawer completely and wipes dust.",
                "Folds 8 t-shirts into self-standing vertical rectangles.",
                "Files them by color: dark blue to bright yellow.",
                "Folds socks flat in half and files vertically.",
                "Opens drawer: sees every single shirt instantly without touching a single pile.",
                "Drawer stays perfectly organized for months."
            ],
            "takeaway": "Vertical filing turns chaotic piles into a neat file drawer where picking any shirt disturbs nothing."
        },
        "mistakes": [
            ("Rolling socks into tight, stretched-out balls that ruin elastic cuffs.", "Folding socks flat into rectangles preserves the elastic stretch for years."),
            ("Stuffing clothes into the drawer without folding until the drawer jams stuck.", "Jamming wrinkles fabric and damages drawer slide tracks; maintain breathing room.")
        ],
        "checklist": [
            "Are clothes smoothed flat before folding?",
            "Does the folded garment stand upright unsupported on a flat surface?",
            "Can I see every item in the drawer without lifting other clothes?",
            "Are socks folded flat rather than stretched into tight balls?"
        ],
        "prompt": "How does seeing all your clothes neatly displayed in a drawer make choosing an outfit in the morning fast and fun?",
        "takeaway": "Fold it flat, stand it tall: vertical folding turns drawer chaos into an orderly, peaceful wardrobe library.",
        "vis1": {"title": "The Vertical T-Shirt Fold Sequence", "caption": "Sides inward -> Long rectangle -> Half fold -> Thirds roll -> Stands upright unsupported."},
        "vis2": {"title": "Horizontal Tower vs Vertical File", "caption": "Tower: Yank one, all collapse. Vertical File: Pull any shirt like a library book with zero mess!"},
        "act": {
            "title": "The 1-Drawer Wardrobe Transformation",
            "obj": "Completely empty, fold, and vertically organize one clothing drawer or shelf.",
            "steps": [
                "Take out all garments from one t-shirt or shorts drawer.",
                "Wipe drawer interior clean with a dry cloth.",
                "Fold at least 6 garments using the vertical self-standing method.",
                "File them vertically from front to back in color or usage order.",
                "Take a photo of the completed vertical drawer."
            ],
            "output": "A before-and-after photo of a drawer converted to the vertical filing system."
        },
        "guided": {
            "context": "You are folding a pair of denim school shorts that are stiff and thick.",
            "optimal": "Fold left leg over right leg, tuck the crotch point inward to form a clean rectangle, then fold in half and half again so it stands upright.",
            "opt_reason": "Tucking the crotch point creates straight rectangular edges required for vertical stability.",
            "non1": "Roll them into a tight messy cylinder.",
            "non1_reason": "Rolls unravel easily and take up double the drawer height.",
            "non2": "Stuff them balled up into the back of the shelf.",
            "non2_reason": "Creates deep wrinkles and wastes drawer storage space.",
            "takeaway": "Tucking odd corners creates clean rectangles that stand firmly on their own."
        },
        "indep": {
            "context": "Explain why folding socks flat in pairs is better for their lifespan than rolling them into tight inside-out balls.",
            "prompt": "Describe the effect of stretching on elastic threads and how flat folding prevents saggy sock ankles.",
            "rubric": "Explained elastic tension breakdown, loose ankle cuffs slipping during sports, and flat folding preservation."
        },
        "quiz": {
            "q": "What is the 'Golden Test' to verify that a t-shirt has been folded correctly using the KonMari vertical method?",
            "opt_correct": "The folded garment must be able to stand upright on a flat table unsupported without toppling over.",
            "opt_w1": "It must weigh less than 50 grams.",
            "opt_w2": "It must fit inside a pencil box.",
            "opt_w3": "It must bounce when dropped on the floor."
        },
        "rubric": {
            "task": "Execute vertical folding techniques across different garment types and organize storage spaces systematically.",
            "mastery": "Achieves self-standing vertical folds consistently, avoids elastic stretching, files clothes by accessibility, maintains order.",
            "c1": "Folding Geometry & Structural Self-Support",
            "c2": "Garment Care & Elastic Preservation",
            "c3": "Systemic Drawer Organization & Layout"
        },
        "refs": [
            "Who is Marie Kondo and why did her folding techniques become famous worldwide?",
            "How does having an organized wardrobe reduce morning decision fatigue?",
            "What can you do with clothes you have outgrown that are still in great condition?",
            "How can dividing a large drawer with shoe box lids create neat compartmentalized sections?"
        ]
    },

    # MONTH 8: Nutrition, No-Flame Cooking & Kitchen Sanitation
    {
        "month": 8, "theme": "Sprout Salads, Knife Dicing & Kitchen Hygiene", "seq": 1,
        "cat": "life_independence", "cat_label": "Personal Independence & Daily Living",
        "title": "Making a High-Protein Sprouted Moong & Vegetable Salad",
        "why": "Relying on deep-fried street snacks when hungry after school leads to digestive issues, acne, and sluggishness. Learning to assemble a delicious, high-protein sprouted bean salad builds independent culinary capability.",
        "objs": [
            "Explain why sprouting pulses multiplies their vitamin C, bioavailable protein, and digestive enzymes",
            "Assemble a balanced no-flame salad: sprouted green moong, diced cucumbers, tomatoes, grated carrots, and boiled peanuts",
            "Season balanced flavors naturally: fresh lemon juice, roasted cumin powder (jeera), pink salt, and fresh coriander",
            "Practice hygienic preparation: clean prep bowls, washed produce, and covered food storage"
        ],
        "scenario": "Rohit was starving after basketball practice at 5:00 PM. Instead of eating a packet of oily fried chips, he prepared a bowl of zesty sprouted moong chaat with diced cucumbers and lemon.",
        "expl": "A dormant seed is asleep; when it sprouts, it literally awakens with explosive life energy! Sprouted moong beans have triple the vitamins of unsprouted beans and are packed with plant protein that repairs muscle after sports. Tossing them with crunchy veggies, chaat spices, and fresh lemon creates a delicious gourmet snack in 5 minutes.",
        "steps": [
            "Rinse 1 cup of sprouted green moong beans thoroughly in clean drinking water and drain.",
            "Place sprouts in a large clean mixing bowl.",
            "Add 1/2 cup of finely diced cucumbers and 1/2 cup of diced ripe tomatoes.",
            "Add 2 tablespoons of grated carrot and chopped fresh coriander leaves for color and crunch.",
            "Season with 1/4 teaspoon roasted cumin powder, a pinch of black salt, and a squeeze of fresh lemon juice.",
            "Toss ingredients gently with two spoons until evenly coated.",
            "Taste and adjust seasoning before serving in a clean bowl with a spoon."
        ],
        "example": {
            "title": "Rohit's Power Sprout Chaat",
            "scenario": "Rohit prepares his post-sports snack.",
            "steps": [
                "Takes fresh refrigerated moong sprouts.",
                "Dices half cucumber and one small tomato.",
                "Mixes in bowl with lemon juice and chaat masala.",
                "Eats with a steel spoon while reviewing school notes.",
                "Feels energized, light, and full until dinner time."
            ],
            "takeaway": "Sprouted moong tossed with fresh vegetables provides clean, sustained athletic energy without frying or fire."
        },
        "mistakes": [
            ("Using sprouts that smell sour, have slime, or have been kept warm for over 3 days.", "Sprouts must be fresh and stored in a cold refrigerator; discard any sprouts with sour odors to prevent food poisoning."),
            ("Drowning healthy fresh vegetables in heavy commercial mayonnaise or oily dressings.", "Use lemon juice, roasted cumin, and herbs for vibrant, nutrient-dense natural flavor.")
        ],
        "checklist": [
            "Did I wash my hands with soap before handling ingredients?",
            "Are the sprouted beans fresh, clean, and odor-free?",
            "Are vegetables chopped into neat, bite-sized pieces?",
            "Did I balance flavor with fresh lemon juice and light spices?"
        ],
        "prompt": "How does your stomach feel after eating fresh crunchy sprouted salad compared to oily fried samosas?",
        "takeaway": "Fresh, crunchy, alive: sprouted moong salad gives you championship energy and chef-level kitchen confidence.",
        "vis1": {"title": "The Sprout Salad Anatomy", "caption": "50% Sprouted Moong (Protein) + 30% Diced Veggies (Crunch & Fiber) + 20% Lemon & Herb Dressing."},
        "vis2": {"title": "The Sprout Freshness Check", "caption": "Fresh: Crisp white tails, earthy aroma. Spoiled: Brown limp tails, sour slime. Discard spoiled batches!"},
        "act": {
            "title": "The Master Sprout Salad Chef",
            "obj": "Independently prepare, season, plate, and serve a bowl of sprouted moong salad for yourself or family.",
            "steps": [
                "Gather fresh moong sprouts, cucumber, tomato, lemon, and spices.",
                "Wash produce and prepare bite-sized vegetable pieces.",
                "Combine in mixing bowl and season with lemon and cumin.",
                "Plate neatly in a bowl garnished with coriander.",
                "Clean up mixing bowl, cutting board, and prep counter completely."
            ],
            "output": "A photograph or family feedback evaluation of the independently prepared sprout salad."
        },
        "guided": {
            "context": "You accidentally add a little too much salt to your sprout salad bowl.",
            "optimal": "Add more diced cucumber coins, grated carrots, or an extra squeeze of fresh lemon juice to dilute and balance the salinity naturally.",
            "opt_reason": "Adding fresh moisture-rich vegetables and acidity balances excess sodium without throwing food away.",
            "non1": "Throw the entire bowl into the trash can.",
            "non1_reason": "Extremely wasteful of good nutritious food.",
            "non2": "Pour a glass of water into the salad bowl making it soggy soup.",
            "non2_reason": "Destroys the crisp texture of the salad.",
            "takeaway": "Balance over-seasoning by adding more fresh vegetables and citrus."
        },
        "indep": {
            "context": "Design a 'Mediterranean' or 'South Indian' variation of the sprouted moong salad.",
            "prompt": "List 2 unique ingredients you can add to change the flavor profile (e.g., coconut/curry leaves or olives/oregano).",
            "rubric": "South Indian: grated fresh coconut, mustard seed tadka, curry leaves; Mediterranean: diced bell peppers, oregano, olive oil."
        },
        "quiz": {
            "q": "Why is sprouted green moong considered superior in nutrition compared to raw dry unsprouted moong seeds?",
            "opt_correct": "The sprouting process breaks down anti-nutrients and multiplies vitamin content, digestive enzymes, and bioavailable protein.",
            "opt_w1": "Because sprouts contain artificial sugar.",
            "opt_w2": "Because unsprouted beans are poisonous rocks.",
            "opt_w3": "Because sprouts turn into candy overnight."
        },
        "rubric": {
            "task": "Prepare, season, and serve a nutritious no-flame sprouted salad while maintaining strict food hygiene.",
            "mastery": "Applies rigorous produce sanitation, demonstrates precise vegetable dicing, balances flavor profiles, cleans prep area thoroughly.",
            "c1": "Hygiene & Food Safety Protocols",
            "c2": "Nutritional Composition & Texture Balance",
            "c3": "Flavor Seasoning & Workstation Cleanliness"
        },
        "refs": [
            "How do astronauts grow microgreens and sprouts on the International Space Station?",
            "Why is washing raw vegetables in clean drinking water crucial before eating?",
            "What other seeds and pulses can be sprouted at home (like black chana or alfalfa)?",
            "How does dietary fiber support healthy digestion and gut microbiome balance?"
        ]
    },
    {
        "month": 8, "theme": "Sprout Salads, Knife Dicing & Kitchen Hygiene", "seq": 2,
        "cat": "life_independence", "cat_label": "Personal Independence & Daily Living",
        "title": "Safe Knife Handling: Chopping Cucumbers, Tomatoes & Onions with Stable Board",
        "why": "Kitchen knives cause thousands of emergency room stitches every year when young cooks use dull blades, slippery boards, or flat fingers. Learning the stable cutting station setup and professional knife grip guarantees safety.",
        "objs": [
            "Set up a non-slip workstation: place a damp cloth under the cutting board to eliminate all board movement",
            "Master the 'Chef's Pinch Grip' on the knife handle for maximum mechanical control",
            "Demonstrate the 'Bear Claw' guide hand technique with curled knuckles guiding the blade",
            "Slice round vegetables safely by creating a flat reference base first (the 'Bridge Cut')"
        ],
        "scenario": "Karan wanted to slice an onion for his salad. The cutting board slipped on the granite counter, the round onion rolled away, and the knife blade slid dangerously close to his thumb.",
        "expl": "Professional chefs never chop on a moving board or cut rolling balls! The secret to knife safety is two physics tricks: 1. A damp towel under the board stops all slippage. 2. Cutting a rolling vegetable in half gives you a flat, stable base that sits flat like a brick. Combined with the Bear Claw finger curl, cuts become virtually impossible.",
        "steps": [
            "Dampen a paper towel or thin cotton cloth, wring it out, and place it flat under your cutting board.",
            "Push the board with your hand: it should grip the counter like glue with zero sliding.",
            "Hold the knife using the Chef's Pinch Grip: pinch the base of the blade with thumb and index finger, wrap remaining fingers around handle.",
            "Create a flat base: cut round produce (onions, cucumbers, potatoes) in half so the flat side rests face-down on the board.",
            "Form a Bear Claw with your guide hand: curl fingertips inward like claws, thumb tucked behind knuckles.",
            "Rest the flat side of the knife blade against your knuckles and use a smooth rocking motion from tip to heel."
        ],
        "example": {
            "title": "Karan's Safe Chopping Station",
            "scenario": "Karan resets his chopping station.",
            "steps": [
                "Places wet paper towel under chopping board: zero slips.",
                "Slices cucumber in half lengthwise to create two flat bricks.",
                "Rests flat side on board.",
                "Curls guide hand into a tight Bear Claw.",
                "Chops neat half-moon discs with smooth rocking sweeps.",
                "Completes chopping with zero slips and total confidence."
            ],
            "takeaway": "A stable board, a flat vegetable base, and curled knuckles make knife work safe, precise, and fast."
        },
        "mistakes": [
            ("Cutting on a loose, dry plastic board that slides across smooth kitchen countertops.", "A sliding board is the #1 cause of knife slips; always secure with a damp cloth underneath."),
            ("Pointing guide fingers straight out toward the blade while cutting.", "Straight fingers expose fingertips to the blade; always tuck fingertips back in the Bear Claw posture.")
        ],
        "checklist": [
            "Is the cutting board resting firmly on a damp non-slip towel?",
            "Are rolling vegetables halved to create a flat, stable base?",
            "Are guide hand fingertips tucked safely in the Bear Claw position?",
            "Am I keeping the knife moving with smooth rocking motions, never hacking violently?"
        ],
        "prompt": "Why is a sharp knife actually safer to use than a dull knife that slips and requires force?",
        "takeaway": "Stabilize the board, curl the claw: proper knife mechanics turn kitchen prep into a safe, joyful craft.",
        "vis1": {"title": "The Non-Slip Board Setup", "caption": "Granite Counter -> Damp Towel -> Cutting Board (Zero Slip Tested)."},
        "vis2": {"title": "The Flat Base Rule", "caption": "Round vegetable rolls dangerously. Slice in half -> place flat side down -> stable like a brick!"},
        "act": {
            "title": "The Precision Cucumber Dicing Lab",
            "obj": "Demonstrate the damp cloth setup, flat base creation, Bear Claw grip, and dicing technique on a whole cucumber.",
            "steps": [
                "Set up cutting station with damp towel underneath.",
                "Slice cucumber in half lengthwise to create flat bases.",
                "Cut each half into thin lengthwise spears using the Bridge Cut.",
                "Rotate spears 90 degrees and dice into uniform cubes using Bear Claw.",
                "Wash knife immediately, wipe board, and store safely."
            ],
            "output": "A plate of uniformly diced cucumber cubes verified by an observing adult."
        },
        "guided": {
            "context": "A knife accidentally slips off the cutting board and falls toward your feet.",
            "optimal": "Immediately jump back with both feet and let the knife fall to the floor; NEVER try to catch a falling knife in mid-air.",
            "opt_reason": "Attempting to grab a falling blade causes catastrophic hand lacerations. 'A falling knife has no handle!'",
            "non1": "Stick out your foot to break the knife's fall.",
            "non1_reason": "Severe foot puncture hazard.",
            "non2": "Lunge forward with both hands to catch the falling blade.",
            "non2_reason": "Extremely dangerous; guarantees severe lacerations.",
            "takeaway": "Step back and let it drop: never attempt to catch a falling sharp tool."
        },
        "indep": {
            "context": "How do you safely wash and dry a chef's knife without cutting your sponge or fingers?",
            "prompt": "Describe the proper sponge wiping direction along the spine rather than the sharp edge.",
            "rubric": "Held blade pointed away, wiped sponge along the dull spine edge towards blade, never pinched sharp edge directly."
        },
        "quiz": {
            "q": "What is the very first step you must take before cutting any round vegetable like an onion, apple, or potato?",
            "opt_correct": "Slice it in half using a stable cut so you can place the flat side down onto the cutting board, preventing it from rolling.",
            "opt_w1": "Peel it with your teeth.",
            "opt_w2": "Throw it in the microwave for 10 minutes.",
            "opt_w3": "Try to chop it while holding it in mid-air."
        },
        "rubric": {
            "task": "Demonstrate knife mechanics, non-slip board anchoring, flat-base vegetable orientation, and Bear Claw guidance.",
            "mastery": "Sets up non-slip base instinctively, maintains flawless Bear Claw posture, uses smooth rocking cuts, adheres to falling knife safety.",
            "c1": "Workstation Anchoring & Stability",
            "c2": "Guide Hand Biomechanics (Bear Claw)",
            "c3": "Cut Geometry & Tool Safety Protocols"
        },
        "refs": [
            "Why do professional cooking academies spend the entire first week only practicing knife skills on carrots?",
            "What is the difference between a serrated bread knife, a paring knife, and a chef's knife?",
            "Why should kitchen knives never be left hidden under soapy water in a deep washing sink?",
            "How does regular honing on a steel rod keep knife edges aligned?"
        ]
    },
    {
        "month": 8, "theme": "Sprout Salads, Knife Dicing & Kitchen Hygiene", "seq": 3,
        "cat": "life_safety_health", "cat_label": "Safety, Health & Well-being",
        "title": "Food Safety & Hygiene: Safe Refrigeration, Expiry Dates & Leftover Reheating",
        "why": "Leaving cooked rice or dairy at room temperature in warm climates breeds dangerous bacteria that cause food poisoning, vomiting, and hospital visits. Understanding temperature zones and safe food handling keeps your family healthy.",
        "objs": [
            "Explain the 'Temperature Danger Zone' (5°C to 60°C) where harmful bacteria double every 20 minutes",
            "Apply the 2-Hour Rule: Cooked food must be refrigerated within 2 hours of cooking",
            "Differentiate between 'Use By' (safety expiration) and 'Best Before' (quality preference) date labels",
            "Reheat leftovers to piping hot (>75°C) throughout, never lukewarm, and reheat leftovers only ONCE"
        ],
        "scenario": "Varun ate leftover chicken curry and rice that had been sitting covered on the dining table for 18 hours in 32°C summer heat. Four hours later, he suffered severe abdominal cramps, vomiting, and high fever.",
        "expl": "Bacteria like Salmonella and Bacillus cereus are invisible ninjas! Between 5°C and 60°C (the Temperature Danger Zone), one single bacterium multiplies into over 1,000,000 bacteria in just 6 hours. Refrigerators (below 4°C) put bacteria to sleep. Knowing how to chill food quickly and reheat to steaming hot protects your gut from painful foodborne illness.",
        "steps": [
            "The 2-Hour Clock: As soon as a meal ends, pack remaining food into clean, airtight containers and refrigerate within 2 hours.",
            "Cool Before Sealing: Divide large pots of hot stew or rice into shallow containers so they cool rapidly in the fridge.",
            "Inspect Expiry Labels: Check 'Use By' dates on milk, paneer, and yoghurt; discard items past their 'Use By' date.",
            "Reheating Protocol: Reheat leftovers until steaming hot throughout (>75°C), stirring midway so there are no cold spots.",
            "The 1-Reheat Law: Only reheat the exact portion you will eat; never re-refrigerate and reheat food a second time.",
            "The Golden Senses Check: When in doubt, look for mold fuzz, sniff for sour/acidic odors, and if doubtful, throw it out!"
        ],
        "example": {
            "title": "Varun's Food Safety Transformation",
            "scenario": "Varun manages dinner leftovers properly.",
            "steps": [
                "Dinner ends at 8:30 PM.",
                "Packs leftover dal into a shallow glass container by 9:00 PM.",
                "Labels lid with masking tape: 'Dal - Oct 26'.",
                "Places in center shelf of refrigerator (3°C).",
                "Next evening: scoops one bowl portion, heats in microwave until bubbling hot.",
                "Enjoys delicious, 100% safe homemade food."
            ],
            "takeaway": "Refrigerating leftovers within 2 hours and reheating portions thoroughly guarantees safe, nutritious meals."
        },
        "mistakes": [
            ("Leaving a giant pot of warm cooked rice on the counter overnight with the lid on.", "Bacillus cereus spores thrive in warm room-temperature cooked rice, producing heat-resistant toxins that survive microwave reheating."),
            ("Tasting spoiled food to 'check if it's still good'.", "Never taste suspicious food; microscopic bacterial toxins can cause severe illness from a single spoonful.")
        ],
        "checklist": [
            "Was cooked food placed in the refrigerator within 2 hours?",
            "Is the refrigerator temperature set below 4°C?",
            "Did I check the 'Use By' date on dairy or meat packaging?",
            "Was the food reheated until steaming hot with zero cold centers?",
            "Am I reheating only once?"
        ],
        "prompt": "Why can food look and smell completely normal even when it is loaded with food poisoning bacteria?",
        "takeaway": "Keep it cold, heat it hot: the 2-hour rule and thorough reheating protect your family from food poisoning.",
        "vis1": {"title": "The Temperature Danger Zone", "caption": "Danger Zone (5°C to 60°C) -> Bacteria doubles every 20m! Fridge (<4°C) / Boiling (>75°C)."},
        "vis2": {"title": "Use By vs Best Before", "caption": "Use By: Strict Health Safety Deadline (Discard past date). Best Before: Peak Taste & Crispness (Safe slightly past date)."},
        "act": {
            "title": "The Family Refrigerator Safety Audit",
            "obj": "Audit your household refrigerator for temperature settings, expiration dates, and leftover labeling.",
            "steps": [
                "Check refrigerator thermometer setting (should be between 1°C and 4°C).",
                "Inspect dairy and condiment door shelves for expired 'Use By' items.",
                "Verify that all leftover food containers are covered and dated with masking tape.",
                "Ensure raw vegetables and cooked foods are separated on different shelves.",
                "Present a Refrigerator Safety Report to your family."
            ],
            "output": "A completed Refrigerator Food Safety Audit checklist signed by a parent."
        },
        "guided": {
            "context": "You find a carton of milk in the fridge that is 2 days past its printed 'Use By' date. It smells slightly sour when sniffed.",
            "optimal": "Do not drink it; pour it down the sink or inform an adult to discard it, and open a fresh carton.",
            "opt_reason": "'Use By' dates on dairy represent strict safety limits; sour odors indicate active bacterial spoilage.",
            "non1": "Hold your nose, gulp down a glass, and hope you don't get sick.",
            "non1_reason": "High probability of severe bacterial gastroenteritis.",
            "non2": "Pour it into a sibling's cereal bowl without telling them.",
            "non2_reason": "Malicious and endangers another person's health.",
            "takeaway": "Respect 'Use By' dates on dairy; never consume sour-smelling animal products."
        },
        "indep": {
            "context": "Why is dividing a large 5-litre pot of hot soup into 3 smaller shallow containers better for cooling in the fridge than putting the giant deep pot in directly?",
            "prompt": "Explain surface-area-to-volume ratio and rapid cooling to escape the Danger Zone.",
            "rubric": "Explained deep pots insulate heat in the center, keeping core food in Danger Zone for hours; shallow containers cool rapidly."
        },
        "quiz": {
            "q": "What is the 'Temperature Danger Zone' where harmful food poisoning bacteria multiply most rapidly?",
            "opt_correct": "Between 5°C and 60°C (typical room temperatures where cooked food sits).",
            "opt_w1": "Between 100°C and 200°C.",
            "opt_w2": "Below -18°C in a deep freezer.",
            "opt_w3": "Inside an active baking oven."
        },
        "rubric": {
            "task": "Demonstrate knowledge of food temperature controls, pathogen prevention, expiration date decoding, and safe reheating.",
            "mastery": "Articulates Danger Zone temperatures, enforces the 2-Hour Rule, differentiates date labels, executes thorough reheating protocols.",
            "c1": "Thermal Danger Zone & Pathogen Understanding",
            "c2": "Date Label Interpretation & Spoilage Auditing",
            "c3": "Leftover Storage & Reheating Sanitation"
        },
        "refs": [
            "Why is pasteurization of milk one of the greatest public health innovations in human history?",
            "How does salt pickling and sun drying preserve food without a refrigerator?",
            "What is cross-contamination and why must raw chicken never touch salad cutting boards?",
            "Why should school tiffin lunchboxes be kept away from direct hot sunlight on classroom windowsills?"
        ]
    },

    # MONTH 9: Posture, Physical Well-being & Stress Management
    {
        "month": 9, "theme": "Ergonomics, Somatic Stress Awareness & Worry Journaling", "seq": 1,
        "cat": "life_safety_health", "cat_label": "Safety, Health & Well-being",
        "title": "Ergonomics for Young Students: Backpack Weight, Desk Posture & Eye Level",
        "why": "Carrying heavy backpacks over one shoulder and hunching over laptops like a boiled shrimp leads to chronic neck spasms, spinal curvature, and tension headaches. Applying ergonomic biomechanics protects your spine for life.",
        "objs": [
            "Calculate your maximum safe backpack load: Backpack must not exceed 10% to 15% of your total body weight",
            "Wear backpacks with two padded straps snug against the back, never slung casually over one shoulder",
            "Apply the 90-90-90 Rule for study desk sitting: 90° at elbows, 90° at hips, 90° at knees with feet flat on the floor",
            "Position computer and textbook screens at eye level to eliminate 'Tech Neck' forward head tilt"
        ],
        "scenario": "Aarav weighed 36 kg, but his school bag weighed 9 kg (25% of his body weight!). He walked to school hunched forward like an old man, complaining of stinging lower back and shoulder pain every afternoon.",
        "expl": "Your spine is a brilliant architectural column of 33 vertebrae! When your head tilts forward by just 3 inches to look down at a phone or desk, the effective weight on your neck muscles surges from 5 kg to 27 kg—like carrying an 8-year-old child on your neck! Ergonomic alignment balances your skeleton so muscles stay relaxed.",
        "steps": [
            "Step 1 (Weigh the Bag): Place your packed school bag on a bathroom scale; ensure it weighs under 10-15% of your body weight (e.g. max 4 kg for a 36 kg student).",
            "Step 2 (Pack the Heaviest Items Closest): Pack heavy encyclopedias and binders against the back panel closest to your spine; pack light items in front pockets.",
            "Step 3 (Dual Straps): Always wear both shoulder straps; tighten straps so the bottom of the bag rests at your waist, not drooping over your hips.",
            "Step 4 (90-90-90 Seating): Adjust chair height so knees bend at 90° with feet flat on the floor; back supported straight against the chair.",
            "Step 5 (Eye Level): Prop textbooks or screens on a bookstand so the top line of text is at eye level.",
            "The 20-20-20 Rule: Every 20 minutes of study, look at an object 20 feet away for 20 seconds to relax eye focus muscles."
        ],
        "example": {
            "title": "Aarav's Spinal Reset",
            "scenario": "Aarav declutters his bag and resets his desk.",
            "steps": [
                "Removes unnecessary storybooks, extra water bottles, and old folders.",
                "Reduces bag weight from 9 kg to 3.8 kg (under 11% of his weight).",
                "Props his Science textbook up on a wire bookstand at eye level.",
                "Wears both straps snugly.",
                "Neck and shoulder pain vanishes within 48 hours."
            ],
            "takeaway": "Keeping backpack weight under 12% and screens at eye level completely eliminates student postural pain."
        },
        "mistakes": [
            ("Slings a heavy 8 kg backpack over one single shoulder to look 'cool'.", "One-shoulder carrying twists the spine laterally, causing severe spinal asymmetry and shoulder impingement."),
            ("Looking straight down at a laptop or tablet placed flat on your lap for hours.", "'Tech Neck' exerts massive shearing pressure on cervical discs; always elevate screens to eye level.")
        ],
        "checklist": [
            "Does my packed bag weigh less than 15% of my body weight?",
            "Are the heaviest books placed against the back panel?",
            "Am I wearing both shoulder straps adjusted snugly?",
            "Are my feet flat on the floor with knees at a 90° angle?",
            "Is my textbook or screen propped up at eye level?"
        ],
        "prompt": "How does sitting up straight with your shoulders relaxed change how alert and confident you feel during a study session?",
        "takeaway": "Align your spine, lighten the load: ergonomic posture keeps your body pain-free and your mind sharp.",
        "vis1": {"title": "The Tech Neck Angle vs Weight Scale", "caption": "0° Tilt: 5 kg load | 30° Tilt: 18 kg load | 60° Tilt: 27 kg load on cervical neck spine!"},
        "vis2": {"title": "The 90-90-90 Ergonomic Desk Posture", "caption": "Elbows at 90°, Hips at 90°, Knees at 90°, Feet flat on floor, Screen top at eye level."},
        "act": {
            "title": "The Student Ergonomics & Backpack Audit",
            "obj": "Weigh yourself and your school bag, audit desk seating, and adjust your study space for ergonomic alignment.",
            "steps": [
                "Weigh yourself on a scale, then weigh your typical packed school backpack.",
                "Calculate: (Bag Weight ÷ Body Weight) × 100. Target: < 12%.",
                "Remove unnecessary items to hit target weight.",
                "Set up a bookstand or prop box on your desk so reading materials sit at eye level.",
                "Practice the 90-90-90 posture during a 30-minute homework session."
            ],
            "output": "A documented Ergonomics Audit Card recording body weight, bag weight ratio, and desk adjustments."
        },
        "guided": {
            "context": "Your school timetable requires 6 different heavy textbooks tomorrow, pushing your bag weight to 18% of your body weight.",
            "optimal": "Share book carrying with a trusted bench partner (one carries Math/Science, the other carries English/History), or check if school has locker storage.",
            "opt_reason": "Creative cooperative resource sharing cuts daily carry weight by 50% without missing materials.",
            "non1": "Carry all 6 heavy books and suffer severe back spasms.",
            "non1_reason": "Damages spinal growth plates and causes chronic postural injuries.",
            "non2": "Leave all books at home and get detention.",
            "non2_reason": "Irresponsible reaction that compromises academic learning.",
            "takeaway": "Coordinate bench-partner book sharing to keep daily backpack loads safe."
        },
        "indep": {
            "context": "You are using a smartphone to research a school project while sitting on a sofa.",
            "prompt": "Describe how you will position your arms and head to prevent neck strain.",
            "rubric": "Propped elbows on cushions/knees, brought phone up to eye level, avoided bending neck downward."
        },
        "quiz": {
            "q": "What is the medically recommended maximum weight for a student's school backpack relative to their body weight?",
            "opt_correct": "No more than 10% to 15% of the student's total body weight.",
            "opt_w1": "At least 50% of the student's weight.",
            "opt_w2": "Exactly 25 kilograms regardless of age.",
            "opt_w3": "As heavy as can possibly be crammed into the zipper."
        },
        "rubric": {
            "task": "Perform ergonomic assessments, optimize load distribution, and demonstrate biomechanical posture discipline.",
            "mastery": "Maintains 10-15% backpack threshold, packs with optimal weight distribution, models 90-90-90 posture, implements 20-20-20 visual hygiene.",
            "c1": "Load Calculation & Backpack Biomechanics",
            "c2": "Desk Seating & Eye-Level Ergonomics",
            "c3": "Visual Hygiene & Active Postural Awareness"
        },
        "refs": [
            "Why do orthopaedic surgeons warn against children carrying heavy weights on growing spinal plates?",
            "How do standing desks help adults stay active during long working hours?",
            "What simple neck and shoulder stretches can you do between classes to relieve tension?",
            "Why is walking with your chest open and shoulders back linked to higher psychological confidence?"
        ]
    },
    {
        "month": 9, "theme": "Ergonomics, Somatic Stress Awareness & Worry Journaling", "seq": 2,
        "cat": "life_safety_health", "cat_label": "Safety, Health & Well-being",
        "title": "Recognizing Physical Stress Signals: Tight Shoulders, Clenched Jaws & Fast Heartbeat",
        "why": "Students often don't realize they are stressed until they have an emotional meltdown, scream at family members, or suffer a migraine. Learning to read your body's early physical warning signals allows you to reset before stress boils over.",
        "objs": [
            "Identify the 4 somatic warning signs of rising stress: shoulder hitching, jaw clenching, shallow chest breathing, and churning stomach",
            "Perform a 30-second Somatic Body Scan from head to toes twice daily",
            "Execute the Physiological Sigh (two quick nasal inhales followed by one long mouth exhale) to instantly lower heart rate",
            "Implement a 3-minute physical reset when stress signals are detected: cold water on face, shoulder rolls, and hydration"
        ],
        "scenario": "Before his unit test, Kabir felt irritable, snapped at his sister for offering a cookie, and felt an upset stomach. He didn't realize his body was in high fight-or-flight adrenaline mode.",
        "expl": "Your body is like a car dashboard: before the engine overheats, warning lights flash! Your body warns you long before your mind realizes you are anxious. Clenched teeth, hunched shoulders, and shallow breathing are your body's dashboard warning lights. Resetting your breathing resets your nervous system in 60 seconds.",
        "steps": [
            "Notice the Dashboard: When irritable, pause and check your body: Are my teeth clenched? Are my shoulders up by my ears?",
            "Perform the Somatic Body Scan: Start at the crown of your head: unclench your forehead, soften your jaw, drop your shoulders away from your ears.",
            "The Physiological Sigh: Take a deep breath in through your nose... pause... take one more sharp sip of air in... then slowly sigh it all out through your mouth like blowing a candle.",
            "Repeat the Physiological Sigh 3 times: this pops collapsed alveoli in the lungs and signals the vagus nerve to slow down heart rate.",
            "Unclench hands and shake fingers gently.",
            "Drink half a glass of room-temperature water."
        ],
        "example": {
            "title": "Kabir's Pre-Exam Reset",
            "scenario": "Kabir catches his somatic signals.",
            "steps": [
                "Notices his shoulders are glued to his ears and his stomach is tight.",
                "Executes 3 Physiological Sighs in his school desk.",
                "Rolls shoulders backwards 5 times.",
                "Heart rate slows from 110 bpm to 78 bpm in 90 seconds.",
                "Reads the exam paper with calm, laser-focused clarity."
            ],
            "takeaway": "Using the Physiological Sigh directly activates the parasympathetic nervous system to dissolve physical tension."
        },
        "mistakes": [
            ("Trying to 'force' yourself to calm down by shouting at yourself in your head.", "You cannot think your way out of a physiological fight-or-flight response; you must use breath and body mechanics to signal safety."),
            ("Ignoring physical tension until it turns into chronic tension headaches or stomach ulcers.", "Check your somatic signals multiple times daily; release jaw clenching and shoulder tension early.")
        ],
        "checklist": [
            "Did I unclench my jaw and forehead?",
            "Are my shoulders dropped down and relaxed?",
            "Did I perform 3 Physiological Sighs?",
            "Has my breathing shifted from rapid chest puffs to slow belly breaths?"
        ],
        "prompt": "Where in your body do you feel stress first (stomach, shoulders, neck, or jaw)?",
        "takeaway": "Read the body's dashboard: three physiological sighs drop your shoulders and restore inner peace.",
        "vis1": {"title": "The Body's Stress Dashboard", "caption": "Forehead furrow -> Clenched Jaw -> Hunched Shoulders -> Shallow Chest Breathing -> Knotted Stomach."},
        "vis2": {"title": "The Physiological Sigh Mechanics", "caption": "Deep nasal inhale (80%) + Sharp second nasal sip (20%) -> Long, slow mouth exhale (100%). Heart rate drops immediately."},
        "act": {
            "title": "The 3-Checkpoint Somatic Log",
            "obj": "Conduct 3 daily Somatic Scans (Morning, After-School, Bedtime) for 5 days and record physical tension patterns.",
            "steps": [
                "Set 3 alarms: 8 AM, 4 PM, 9 PM.",
                "At each alarm, pause for 30 seconds and inspect: Jaw, Shoulders, Hands, Breath.",
                "Execute 3 Physiological Sighs and drop shoulder tension.",
                "Record tension level (1-5) and physical location in your wellness log.",
                "Review which times of day hold the highest physical stress."
            ],
            "output": "A 5-day Somatic Stress Tracker documenting daily tension patterns and physical resets."
        },
        "guided": {
            "context": "Five minutes before giving a school presentation, your heart is pounding in your chest and your hands feel cold and sweaty.",
            "optimal": "Recognize this is normal adrenaline preparing your body for peak performance. Execute 3 Physiological Sighs, shake hands gently, and say to yourself: 'My body is excited and ready to speak.'",
            "opt_reason": "Reframes sympathetic arousal as helpful energy while using physiological breathing to prevent panic.",
            "non1": "Sprint out of the classroom to hide in the restroom.",
            "non1_reason": "Reinforces panic avoidance and damages academic confidence.",
            "non2": "Breathe hyper-rapidly in short gasps.",
            "non2_reason": "Exacerbates hyperventilation and dizziness.",
            "takeaway": "Reframe adrenaline as energy: breathe slow and harness the power for your presentation."
        },
        "indep": {
            "context": "You notice your jaw is clenched tight while solving difficult Math geometry proofs.",
            "prompt": "Describe a physical physical cue (like placing the tongue on the roof of the mouth) to relax jaw muscles.",
            "rubric": "Explained placing tongue tip behind front teeth, parting teeth slightly, and releasing masseter muscle tension."
        },
        "quiz": {
            "q": "What is a 'Physiological Sigh' and why is it considered the fastest biological way to reduce acute stress?",
            "opt_correct": "Two rapid nasal inhales followed by a long, slow mouth exhale, which pops collapsed lung alveoli and triggers the vagus nerve to slow the heartbeat.",
            "opt_w1": "Holding your breath until you turn red.",
            "opt_w2": "Screaming into a pillow for 5 minutes.",
            "opt_w3": "Drinking three cans of iced soda."
        },
        "rubric": {
            "task": "Identify somatic stress markers, perform body scans, and apply autonomic nervous system breathing resets.",
            "mastery": "Spots tension markers early, executes Physiological Sigh with precision, reframes physiological arousal constructively, maintains somatic awareness.",
            "c1": "Somatic Self-Awareness & Body Scanning",
            "c2": "Autonomic Breathwork (Physiological Sigh)",
            "c3": "Cognitive Reframing of Stress Arousal"
        },
        "refs": [
            "How does neuroscientist Dr. Andrew Huberman describe the physiological sigh in laboratory research?",
            "Why do martial artists exhale forcefully when executing strikes or absorbing impact?",
            "What is the connection between chronic jaw clenching (bruxism) and morning headaches?",
            "How does spending 15 minutes walking in a green park reset human nervous systems?"
        ]
    },
    {
        "month": 9, "theme": "Ergonomics, Somatic Stress Awareness & Worry Journaling", "seq": 3,
        "cat": "life_communication", "cat_label": "Communication & Confidence",
        "title": "The Daily Worry Journal: Getting Anxious Thoughts Out of Your Head onto Paper",
        "why": "Keeping swirling worries, fears of failure, and social anxieties locked inside your head creates mental paralysis and insomnia. Externalizing worries onto paper takes away their emotional power and restores clarity.",
        "objs": [
            "Explain the psychological principle of 'Cognitive Offloading': why writing thoughts down frees working memory",
            "Execute a 5-minute 'Brain Dump' onto a designated worry page before bed or study",
            "Sort worries into 2 distinct categories: Things I Can Control vs Things I Cannot Control",
            "Formulate 1 concrete action step for things within control, and formally 'close the book' on things outside control"
        ],
        "scenario": "Pooja lay in bed at 11:00 PM with her eyes wide open. Her brain was spinning: 'What if it rains on sports day? What if I forget my speech? What if Meera is mad at me? What if I fail math?'",
        "expl": "A worried brain is like an internet browser with 50 tabs open and freezing up! Worries feel massive and scary when they bounce around in the dark corners of your mind. But when you write them down in black ink on paper, they shrink down to manageable size. Paper can hold your worries so your brain doesn't have to.",
        "steps": [
            "Keep a simple notebook and pen beside your bed or study desk: the 'Worry Vault'.",
            "Set a timer for 5 minutes: write down every single anxiety, fear, or task swirling in your head without filtering.",
            "Draw a vertical line down the page: Column 1: 'In My Control' | Column 2: 'Out of My Control'.",
            "Sort each worry: 'Will it rain?' -> Out of my control. 'Pack umbrella' -> In my control.",
            "Write 1 specific action step next to each item in Column 1: 'Review flashcards for 15 mins'.",
            "For Column 2 items: Take a deep breath, close the notebook firmly, and say: 'These are on paper now. My mind is free to rest.'"
        ],
        "example": {
            "title": "Pooja's Worry Vault",
            "scenario": "Pooja unloads her spinning thoughts.",
            "steps": [
                "Dumps 8 worries onto lined paper.",
                "Column 1 (Can Control): Math test prep (Action: do 5 sample problems), Speech prep (Action: rehearse once).",
                "Column 2 (Cannot Control): Weather on sports day, what other people think.",
                "Completes 10 minutes of math review.",
                "Closes the notebook: feels a massive weight lift from her chest.",
                "Falls asleep peacefully in 10 minutes."
            ],
            "takeaway": "Writing worries down and separating what you can control from what you cannot turns spinning anxiety into calm sleep."
        },
        "mistakes": [
            ("Lying in bed ruminating on the exact same worry loop for 2 hours in the dark.", "Looping thoughts never resolve themselves; get out of bed, turn on a dim lamp, and write them down."),
            ("Wasting energy agonizing over things completely outside human control (like weather or exam question difficulty).", "Focus 100% of your energy on your own preparation and zero energy on random uncontrollable outcomes.")
        ],
        "checklist": [
            "Did I write all nagging thoughts down on physical paper?",
            "Did I categorize worries into 'Can Control' vs 'Cannot Control'?",
            "Is there one concrete action step for items within my control?",
            "Did I close the book and give my mind permission to sleep?"
        ],
        "prompt": "How does looking at your worries written on paper make them look smaller than when they were spinning in your head?",
        "takeaway": "Offload the mind onto the page: sorting what you can control turns spinning anxiety into focused action.",
        "vis1": {"title": "The Circle of Control", "caption": "Inner Circle (Can Control): My effort, my words, my sleep, my prep. Outer Circle (Cannot Control): Weather, other people's moods, traffic."},
        "vis2": {"title": "The 5-Minute Brain Dump", "caption": "Swirling mental tornado -> Pen to Paper -> Sorted Columns -> Closed Notebook & Restful Sleep."},
        "act": {
            "title": "The 3-Day Worry Offloading Trial",
            "obj": "Perform a 5-minute bedtime or pre-study Worry Journal dump for 3 consecutive evenings.",
            "steps": [
                "Establish a dedicated Worry Notebook.",
                "Spend 5 minutes writing down all current mental friction points.",
                "Sort into 'Within Control' and 'Outside Control'.",
                "Assign one immediate micro-action for within-control items.",
                "Close the book and rate your mental calm before and after (1-10)."
            ],
            "output": "A 3-day Worry Journal log showing cognitive offloading and control sorting."
        },
        "guided": {
            "context": "The night before school elections, you are terrified that you might stutter during your speech and people will laugh.",
            "optimal": "Write the fear down. Sort: 'People laughing' = Out of my control. 'Stuttering' = Partially manageable. Action: Rehearse speech 3 times slowly focusing on pausing, and prepare a funny recovery line if a slip happens.",
            "opt_reason": "Converts irrational catastrophizing into practical preparation and resilient recovery planning.",
            "non1": "Stay awake until 3 AM biting fingernails in panic.",
            "non1_reason": "Leaves you exhausted, hoarse, and significantly increases speech errors tomorrow.",
            "non2": "Withdraw your name from the election in secret.",
            "non2_reason": "Surrenders your goals to temporary fear.",
            "takeaway": "Plan your actions and rehearse your recovery; paper holds your fears so you can stand brave."
        },
        "indep": {
            "context": "A close friend seems quiet and distant today, and your brain is spiraling that they hate you.",
            "prompt": "Apply the Circle of Control and write down what action you can take tomorrow.",
            "rubric": "Recognized friend's mood is out of personal control; action within control is asking kindly if they are okay."
        },
        "quiz": {
            "q": "Why is sorting worries into 'Things I Can Control' versus 'Things I Cannot Control' so powerful?",
            "opt_correct": "It directs your limited mental energy toward actionable personal steps while releasing anxiety over things you cannot change.",
            "opt_w1": "It guarantees you will get 100% on every test.",
            "opt_w2": "It magically changes the weather forecast.",
            "opt_w3": "It makes your homework disappear from your bag."
        },
        "rubric": {
            "task": "Execute cognitive offloading, apply the Circle of Control framework, and formulate actionable anxiety resolutions.",
            "mastery": "Dumps cognitive burdens without censorship, categorizes locus of control accurately, formulates pragmatic micro-actions, achieves emotional relief.",
            "c1": "Cognitive Offloading & Journaling Discipline",
            "c2": "Locus of Control Discrimination (Inner vs Outer)",
            "c3": "Constructive Action Formulation & Closure"
        },
        "refs": [
            "Why did Stoic philosophers like Marcus Aurelius keep daily journals to manage leadership stress?",
            "How does writing on paper reduce cortisol (stress hormone) levels in human saliva?",
            "What is the difference between healthy planning and unproductive rumination?",
            "How can sharing a worry with a trusted adult make a terrifying problem feel easily solvable?"
        ]
    },

    # MONTH 10: Comparison Shopping, Consumer Awareness & Smart Saving
    {
        "month": 10, "theme": "Mandi vs Supermarket, Digital Fine Print & Family Budgeting", "seq": 1,
        "cat": "life_money_management", "cat_label": "Money Management & Financial Literacy",
        "title": "Local Mandi vs Supermarket: Comparing Fresh Produce Prices & Seasonality",
        "why": "Buying vegetables wrapped in plastic at air-conditioned supermarkets often costs double or triple what fresh, seasonal produce costs at local vegetable mandis. Learning price differences and seasonal availability saves substantial family money.",
        "objs": [
            "Compare price per kilogram of 4 staple vegetables (potatoes, onions, tomatoes, spinach) between a local mandi and an AC supermarket",
            "Explain why in-season vegetables (e.g. cauliflower in winter, mangoes in summer) are cheaper, fresher, and more nutritious",
            "Recognize excess plastic packaging costs hidden in supermarket pre-cut vegetables",
            "Conduct a courteous price inquiry and weight check with a local vegetable vendor"
        ],
        "scenario": "Aarush went with his grandmother to the local sabzi mandi. She bought 2 kg of farm-fresh tomatoes for ₹40 total (₹20/kg). Later, at a fancy supermarket, Aarush saw plastic-wrapped tomatoes priced at ₹75/kg!",
        "expl": "Where does your food come from? Supermarkets charge you for shiny air-conditioned floors, plastic cling-wrap, and barcode labels! At the local sabzi mandi or weekly farmer bazaar, produce arrives fresh from nearby farms with zero plastic packaging. Learning to buy fresh and in-season makes you a master of household economy.",
        "steps": [
            "Pick 4 basic staples: Potatoes, Onions, Tomatoes, and Seasonal Greens.",
            "Check Seasonality: Ask: Is this vegetable currently in season in our region? (In-season = cheaper and sweeter).",
            "Price Check: Check the rate per kilogram at the local mandi vs online grocery apps vs supermarkets.",
            "Calculate the markup percentage: Supermarket Price ÷ Mandi Price.",
            "Assess freshness: Smell, firmness, and natural color beat refrigerated plastic packaging.",
            "Calculate family monthly savings by purchasing fresh produce at local markets."
        ],
        "example": {
            "title": "Aarush's ₹600 Monthly Basket Saving",
            "scenario": "Aarush compares a weekly 5 kg vegetable basket.",
            "steps": [
                "Supermarket Basket: 2kg potatoes (₹70) + 1kg onions (₹50) + 2kg tomatoes (₹150) = ₹270.",
                "Local Mandi Basket: 2kg potatoes (₹40) + 1kg onions (₹30) + 2kg tomatoes (₹40) = ₹110.",
                "Weekly Savings: ₹160 saved with zero single-use plastic wrap.",
                "Monthly Savings: ₹640 saved into the family groceries reserve.",
                "Grandmother praises Aarush's sharp consumer wisdom."
            ],
            "takeaway": "Buying fresh, in-season produce from local vendors cuts grocery costs in half and eliminates plastic waste."
        },
        "mistakes": [
            ("Buying pre-cut, plastic-wrapped diced vegetables at triple the price of whole produce.", "Pre-cut vegetables lose vitamins through oxidation and harbor bacteria; buy whole fresh vegetables and cut them at home."),
            ("Buying out-of-season exotic vegetables flown in from thousands of kilometers away.", "Out-of-season produce is expensive, tasteless, and has a massive carbon footprint; eat what is seasonal locally.")
        ],
        "checklist": [
            "Did I check the rate per kilogram at both local and supermarket outlets?",
            "Is the vegetable currently in season locally?",
            "Is the produce firm, vibrant, and free from plastic packaging?",
            "Did I verify the vendor's scale balanced to zero before weighing?"
        ],
        "prompt": "Why do winter vegetables like green peas and carrots taste so much sweeter in December than in June?",
        "takeaway": "Eat in season, buy from the source: local mandis give you fresher vegetables, lower bills, and zero plastic waste.",
        "vis1": {"title": "The Produce Price Markup Ladder", "caption": "Farm Gate (₹10/kg) -> Local Mandi (₹20/kg) -> Supermarket / App (₹60/kg in plastic)."},
        "vis2": {"title": "The Indian Seasonal Calendar", "caption": "Winter: Carrots, Peas, Spinach, Cauliflower | Summer: Gourds, Bhindi, Mangoes, Melons."},
        "act": {
            "title": "The Mandi vs Supermarket Price Audit",
            "obj": "Conduct a side-by-side price and packaging comparison of 3 common vegetables across two shopping channels.",
            "steps": [
                "Select 3 vegetables (e.g. Tomatoes, Potatoes, Spinach).",
                "Record the rate per kg at your neighborhood sabzi vendor or mandi.",
                "Record the rate per kg for the same items on a quick-commerce app or supermarket shelf.",
                "Calculate the percentage difference and note plastic packaging used.",
                "Present the findings to your family grocery planner."
            ],
            "output": "A 1-page Comparative Produce Audit table documenting price differences and packaging impact."
        },
        "guided": {
            "context": "Your family wants to make gajar ka halwa in December. Red carrots are ₹30/kg at the mandi and ₹85/kg on a quick-commerce app.",
            "optimal": "Walk 10 minutes to the local mandi with a cloth bag, buy 3 kg of fresh winter red carrots for ₹90, saving ₹165 and getting fresher carrots.",
            "opt_reason": "Directly supports local vendors, saves money, and yields superior culinary sweetness for seasonal dishes.",
            "non1": "Order imported baby carrots from Europe at ₹300/kg.",
            "non1_reason": "Extremely wasteful of money and unsuited for traditional halwa.",
            "non2": "Refuse to make halwa because grocery shopping is boring.",
            "non2_reason": "Misses out on joyful family culinary traditions.",
            "takeaway": "Seasonal staples at local markets deliver peak flavor at lowest cost."
        },
        "indep": {
            "context": "Explain how buying from local vegetable vendors keeps money circulating inside your local community.",
            "prompt": "Compare how rupees spent at a neighborhood mandi versus a corporate app benefit local families.",
            "rubric": "Articulated direct livelihood support for local farmers/vendors vs corporate overheads and delivery fees."
        },
        "quiz": {
            "q": "Why is buying seasonal produce from a local vegetable market generally superior to buying packaged out-of-season produce at a supermarket?",
            "opt_correct": "Seasonal local produce is fresher, richer in nutrients, significantly less expensive, and generates far less plastic packaging waste.",
            "opt_w1": "Because supermarkets are illegal.",
            "opt_w2": "Because vegetables only grow in winter.",
            "opt_w3": "Because plastic wrap makes vegetables taste like candy."
        },
        "rubric": {
            "task": "Conduct comparative market price analysis, evaluate food seasonality, and demonstrate sustainable consumer habits.",
            "mastery": "Calculates unit price differentials accurately, articulates seasonality benefits, assesses packaging sustainability, champions local commerce.",
            "c1": "Price Differential Calculation & Auditing",
            "c2": "Agricultural Seasonality & Nutritional Awareness",
            "c3": "Sustainable Packaging & Community Commerce Ethics"
        },
        "refs": [
            "What is 'food miles' and how does transporting food across continents contribute to carbon emissions?",
            "Why do traditional weighing scales with iron weights require official government verification stamps?",
            "How can carrying your own reusable cloth bags reduce plastic pollution in city drains?",
            "What seasonal fruits and vegetables are native to your specific state or province in India?"
        ]
    },
    {
        "month": 10, "theme": "Mandi vs Supermarket, Digital Fine Print & Family Budgeting", "seq": 2,
        "cat": "life_money_management", "cat_label": "Money Management & Financial Literacy",
        "title": "The Real Cost of 'Free Shipping' & Online Return Policies",
        "why": "Online shopping apps lure consumers with 'Free Delivery on orders above ₹499' and 'No-Questions-Asked Returns', tempting shoppers to buy unnecessary junk and return items constantly. Understanding e-commerce economics prevents impulse shopping traps.",
        "objs": [
            "Expose the 'Free Shipping' threshold trap: adding a ₹200 useless item just to save a ₹40 delivery fee",
            "Understand the hidden environmental cost of online returns: reverse logistics, repackaging, and landfill waste",
            "Apply the 'Cart Quarantine' rule: wait 24 hours before checking out any non-essential online shopping cart",
            "Calculate total actual transaction cost including handling fees, platform charges, and convenience taxes"
        ],
        "scenario": "Simran wanted a ₹350 school drawing compass online. The app showed: 'Delivery: ₹60 OR Add ₹150 more to get FREE DELIVERY!' Simran added a ₹220 pair of glitter pens she didn't need, spending ₹570 instead of ₹410!",
        "expl": "E-commerce companies hire top behavioral psychologists to trick your brain! When an app says 'Spend ₹150 more for FREE shipping', they are convincing you to spend ₹150 of real money to avoid a ₹40 fee. That is not saving; that is spending an extra ₹110 on clutter! Learning the 'Cart Quarantine' rule protects you from e-commerce psychological traps.",
        "steps": [
            "Spot the Free Shipping Trap: Are you adding items you never planned to buy just to hit a delivery threshold?",
            "Do the Cold Math: Compare Total A (Item + ₹40 delivery = ₹390) vs Total B (Item + Unneeded Extra = ₹550). Paying the small delivery fee saves you ₹160!",
            "Implement the 24-Hour Cart Quarantine: Leave items in the online cart for 24 hours before pressing Buy; 70% of impulse desires vanish by tomorrow.",
            "Inspect the Fine Print: Check platform convenience fees, return pickup charges, and restocking fees before paying.",
            "Recognize the Return Reality: Returning cheap clothes or toys burns delivery fuel and packaging that often ends up dumped in landfills.",
            "Buy only what you specifically came to buy, and close the app immediately."
        ],
        "example": {
            "title": "Simran's Cart Quarantine Victory",
            "scenario": "Simran tests the 24-hour rule on glitter pens.",
            "steps": [
                "Deletes the ₹220 glitter pens from her cart.",
                "Waits 24 hours: realizes she already has 12 colored pencils in her drawer.",
                "Orders only the required compass or buys it at the local neighborhood store for ₹350 with zero shipping fee.",
                "Saves ₹220 of her pocket money.",
                "Avoids adding unneeded plastic junk to her desk."
            ],
            "takeaway": "Waiting 24 hours before online checkout dissolves 70% of impulse buying urges effortlessly."
        },
        "mistakes": [
            ("Spending ₹250 on useless junk items just to avoid paying a ₹40 delivery fee.", "Paying ₹40 is far cheaper than spending ₹250 on items you never wanted in the first place."),
            ("Ordering three different sizes of the same shoe intending to return two of them.", "Massive return shipping burns excessive diesel fuel and damages small merchants through return logistics costs.")
        ],
        "checklist": [
            "Did I add any item to my cart solely to reach a 'free delivery' threshold?",
            "Did the items sit in cart quarantine for at least 24 hours?",
            "Did I check if the item is available at a local neighborhood store without shipping fees?",
            "Did I read the return policy fine print (non-returnable vs full refund)?"
        ],
        "prompt": "How do shopping apps use flashing countdown timers and 'Only 2 items left!' badges to make you feel panicked?",
        "takeaway": "Beware the free shipping hook: quarantine your cart for 24 hours to defeat online impulse buying tricks.",
        "vis1": {"title": "The Free Shipping Illusion Math", "caption": "Path A: Buy Item (₹350) + Fee (₹40) = ₹390. Path B: Buy Item (₹350) + Junk (₹200) = ₹550. You spent ₹160 MORE!"},
        "vis2": {"title": "The 24-Hour Cart Quarantine", "caption": "Add to Cart -> Close App -> Sleep 24 Hours -> Review Cart tomorrow. 70% of cravings disappear!"},
        "act": {
            "title": "The E-Commerce Cart Quarantine Challenge",
            "obj": "Conduct a 24-hour quarantine on a real or simulated online shopping cart and audit impulse desire decay.",
            "steps": [
                "Select 2 non-essential items you feel tempted to purchase online.",
                "Add them to a wishlist or cart, noting the total cost including delivery fees.",
                "Walk away for a full 24 hours without opening the app.",
                "Revisit the cart on Day 2: rate your desire on a scale of 1 to 10.",
                "Record how many items you choose to delete after sleeping on the decision."
            ],
            "output": "A documented Cart Quarantine Log showing desire decay and financial savings."
        },
        "guided": {
            "context": "An app sends a notification: 'MEGA SALE: 60% OFF ends in 45 minutes! Buy headphones now!' You already have working headphones.",
            "optimal": "Recognize artificial urgency and promotional manipulation; dismiss the notification without opening the app.",
            "opt_reason": "Buying something on sale that you do not need is 100% wasted money, not '60% savings'.",
            "non1": "Frantically buy the headphones using saved payment cards before the timer hits zero.",
            "non1_reason": "Falls directly into behavioral marketing FOMO and wastes family funds.",
            "non2": "Borrow money from a friend to buy three pairs on sale.",
            "non2_reason": "Creates debt and accumulates useless duplicate electronics.",
            "takeaway": "A 60% discount on something you don't need is still 100% waste."
        },
        "indep": {
            "context": "Why do e-commerce return policies often state that opened electronics or undergarments are non-returnable?",
            "prompt": "Explain hygiene standards, electronic testing costs, and fraud prevention in return terms.",
            "rubric": "Articulated health regulations, prevention of serial return fraud, and costs of inspecting opened microchips."
        },
        "quiz": {
            "q": "Why is adding a ₹200 item to an online order just to qualify for 'Free Delivery' (normally costing ₹50) a financial mistake?",
            "opt_correct": "Because you are spending an extra ₹150 of real money on an unneeded item simply to avoid a small ₹50 fee.",
            "opt_w1": "Because delivery drivers refuse to deliver orders above ₹500.",
            "opt_w2": "Because banks charge 50% interest on free shipping.",
            "opt_w3": "Because online shopping carts delete items automatically."
        },
        "rubric": {
            "task": "Analyze e-commerce pricing psychology, expose dark patterns, and implement disciplined purchasing habits.",
            "mastery": "Identifies threshold marketing traps, applies 24-Hour Cart Quarantine, audits fine print fees, articulates reverse logistics environmental costs.",
            "c1": "E-Commerce Psychological Traps Analysis",
            "c2": "Cart Quarantine & Impulse Regulation",
            "c3": "Total Cost Auditing & Environmental Return Awareness"
        },
        "refs": [
            "What are 'dark patterns' in web design and how do apps use sneaky checkboxes to subscribe you to paid services?",
            "How does algorithmic retargeting show you ads for products you searched for minutes ago?",
            "What happens to returned apparel items that cannot be resold as new by online retailers?",
            "Why is shopping with a written paper list the ultimate defense against marketing manipulation?"
        ]
    },
    {
        "month": 10, "theme": "Mandi vs Supermarket, Digital Fine Print & Family Budgeting", "seq": 3,
        "cat": "life_social_teamwork", "cat_label": "Social Skills, Empathy & Teamwork",
        "title": "Cooperative Family Decision Making: Planning a Shared Weekend Schedule Democratically",
        "why": "When family weekend plans are decided by whoever shouts loudest or sulks longest, someone always ends up feeling neglected, resentful, and bitter. Practicing democratic family planning ensures everyone's priorities are respected.",
        "objs": [
            "Define democratic decision-making: every family member gets a voice, priorities are pooled, and compromises are negotiated fairly",
            "Lead a 15-minute 'Family Weekend Council' with a structured agenda: Chores, Recreation, Rest, and Shared Meal",
            "Apply the 'One Non-Negotiable' rule: each member identifies their single highest priority for the weekend",
            "Synthesize individual priorities into a harmonious 48-hour master schedule"
        ],
        "scenario": "On Saturday morning, Dad wanted to service the car, Mom wanted to visit grandparents, Arjun wanted to play cricket for 4 hours, and his sister wanted to go to the bookshop. By 11:00 AM, everyone was arguing and nobody had left the house.",
        "expl": "A family is a team, not a dictatorship! When four people pull in four different directions, the boat spins in circles. A 15-minute Family Council lets everyone put their cards on the table. When each person gets their #1 priority scheduled, everyone works together enthusiastically on chores and family visits.",
        "steps": [
            "Call a 15-minute Family Council on Friday evening with a clean sheet of paper and a snack.",
            "Step 1 (The Chores Base): List mandatory shared tasks first: laundry, house cleaning, groceries.",
            "Step 2 (The Priority Round): Go around the table; each member names their ONE non-negotiable wish (e.g. 2 hours cricket, 1 hour bookshop).",
            "Step 3 (Slotting the Grid): Schedule Saturday morning for chores, Saturday afternoon for recreation, Sunday morning for family visits, Sunday evening for quiet rest.",
            "Step 4 (Pairing & Combining): Combine trips: dad services car near the bookshop while mom and sister browse books.",
            "Step 5 (Post the Schedule): Tape the agreed-upon timetable on the refrigerator where all can see it."
        ],
        "example": {
            "title": "Arjun's Family Weekend Council",
            "scenario": "Arjun chairs the Friday council.",
            "steps": [
                "Opens meeting: 'Let's make sure everyone gets their favorite activity this weekend!'",
                "Records wishes: Mom (Grandparents), Dad (Car), Arjun (Cricket), Sister (Bookshop).",
                "Combines: Saturday 9 AM (Chores) -> Saturday 11 AM (Car service & Bookshop combined) -> Saturday 4 PM (Cricket match) -> Sunday 11 AM (Grandparents lunch).",
                "Everyone smiles, feels respected, and agrees enthusiastically.",
                "The family enjoys one of their smoothest, most joyful weekends ever."
            ],
            "takeaway": "Combining destinations and scheduling everyone's top priority turns family chaos into smooth cooperative harmony."
        },
        "mistakes": [
            ("Insisting that the entire weekend must revolve 100% around your personal desires.", "Selfishness creates family resentment; a mature family member balances their fun with other members' needs."),
            ("Agreeing to a plan in the meeting and then sulking or refusing to get ready on Sunday morning.", "Honor democratic agreements; enthusiastic cooperation makes family outings fun for everyone.")
        ],
        "checklist": [
            "Did every family member share their priority without being interrupted?",
            "Are mandatory chores and school homework scheduled first?",
            "Did we find creative ways to combine errands and fun trips?",
            "Is the final master timetable agreed upon and posted on the fridge?"
        ],
        "prompt": "How does feeling heard during family planning change your willingness to help out with household chores?",
        "takeaway": "Voice your wish, respect the team: democratic family councils turn chaotic weekends into shared adventures.",
        "vis1": {"title": "The Family Council Agenda", "caption": "1. Mandatory Chores -> 2. Each Member's #1 Wish -> 3. Combine Errands -> 4. Master 48-Hour Grid."},
        "vis2": {"title": "The Win-Win Combination Trick", "caption": "Dad services car next door to Sister's bookshop while Mom calls grandparents. Zero wasted travel time!"},
        "act": {
            "title": "The Friday Family Council Facilitator",
            "obj": "Facilitate a real 15-minute Family Council to plan this upcoming weekend's schedule democratically.",
            "steps": [
                "Propose the meeting to your family for Friday evening.",
                "Draw a 48-hour Saturday/Sunday timetable grid.",
                "Record each family member's top recreational and errand priority.",
                "Facilitate the scheduling of chores, outings, and rest blocks.",
                "Display the finalized schedule on the kitchen refrigerator."
            ],
            "output": "A finalized, agreed-upon Family Weekend Timetable signed by all household members."
        },
        "guided": {
            "context": "Your brother wants to watch a movie on Sunday afternoon, but that is the exact time your mother planned a visit to your elderly grandparents.",
            "optimal": "Propose shifting movie time to Saturday evening or Sunday post-dinner, keeping Sunday afternoon clear for grandparents.",
            "opt_reason": "Protects important intergenerational family relationships while still preserving recreational movie entertainment.",
            "non1": "Throw a temper tantrum and demand that grandparents' visit be cancelled.",
            "non1_reason": "Extremely disrespectful to elders and disrupts family values.",
            "non2": "Sneak out of the house during the grandparents' visit.",
            "non2_reason": "Blatant disobedience and breaks family safety trust.",
            "takeaway": "Recreational entertainment can always be shifted to protect meaningful family relationships."
        },
        "indep": {
            "context": "Two siblings have conflicting homework needs and only one shared family computer.",
            "prompt": "Draft a fair 2-hour schedule allocating equal focused sprint blocks without fighting.",
            "rubric": "Divided into two 50-minute focused slots with 10-minute buffer; off-computer research planned during waiting slot."
        },
        "quiz": {
            "q": "What is the primary benefit of holding a democratic Family Weekend Council?",
            "opt_correct": "It ensures every family member's voice and priorities are respected, reducing arguments and building cooperative teamwork.",
            "opt_w1": "It lets children cancel all school homework.",
            "opt_w2": "It forces parents to buy toys every Saturday.",
            "opt_w3": "It proves which family member is the loudest arguer."
        },
        "rubric": {
            "task": "Facilitate collaborative family planning, negotiate balanced schedules, and practice democratic consensus building.",
            "mastery": "Elicits all stakeholders' priorities, combines errands creatively, resolves conflicting time slots calmly, secures group commitment.",
            "c1": "Democratic Facilitation & Active Inclusion",
            "c2": "Errand Synthesis & Schedule Optimization",
            "c3": "Conflict Negotiation & Consensus Building"
        },
        "refs": [
            "Why do successful businesses and democratic governments use councils and committees to plan complex projects?",
            "How does contributing to family chore planning build executive leadership skills for your future career?",
            "What can you do if unexpected rain or car trouble disrupts the agreed weekend plan?",
            "How does expressing gratitude to parents for family weekend outings build deeper household happiness?"
        ]
    },

    # MONTH 11: Empathy, Friendship & Resolving Peer Conflicts
    {
        "month": 11, "theme": "Conflict Mediation, Project Equity & Gratitude Correspondence", "seq": 1,
        "cat": "life_social_teamwork", "cat_label": "Social Skills, Empathy & Teamwork",
        "title": "Mediating a Heated Dispute Between Two Close Friends Fairly",
        "why": "When two friends fight over game rules, lunch seats, or secrets, picking sides destroys friendships and splits peer groups. Learning neutral mediation de-escalates anger and restores mutual respect.",
        "objs": [
            "Understand the role of a neutral mediator: you are not a judge choosing a winner; you are a bridge helping both sides be heard",
            "Enforce the 3 Ground Rules of Mediation: No interrupting, no name-calling, and speak only about the current issue",
            "Guide both parties to identify their underlying unmet need rather than trading accusations",
            "Facilitate a mutual 'Handshake Agreement' where both parties commit to a shared forward-looking solution"
        ],
        "scenario": "Rohan and Kabir were screaming at each other on the cricket pitch. Rohan yelled: 'You were run out, cheat!' Kabir yelled: 'Your throw was illegal, you always lie!' Other classmates took sides and a fistfight was seconds away.",
        "expl": "A mediator is like a neutral sports referee or an international peacekeeper! If you take a side, you pour gasoline on the fire. When you step between two friends with calm neutrality, enforce zero-interrupting rules, and help them hear each other's perspective, anger cools down and true friendship is saved.",
        "steps": [
            "Step In Calmly: Step physically between them with palms open: 'Whoa guys, stop. We are all friends here. Let's solve this without screaming.'",
            "Move to a Quiet Zone: Move them away from the cheering crowd to a quiet bench under a tree.",
            "State the Ground Rules: 'Rule 1: Person A speaks for 60 seconds without interruption. Rule 2: Person B speaks for 60 seconds without interruption. Rule 3: Zero insults or name-calling.'",
            "Listen and Paraphrase: Summarize Person A's view, then Person B's view without judging who is right.",
            "Ask the Bridge Question: 'What can we agree on right now so the game can continue fairly for everyone?'",
            "Seal the Solution: A re-bowl / neutral replay, a firm handshake, and resume play with clear rules."
        ],
        "example": {
            "title": "Aditya's Cricket Mediation",
            "scenario": "Aditya mediates the Rohan-Kabir clash.",
            "steps": [
                "Pulls Rohan and Kabir aside to the pavilion steps.",
                "Gives each boy 60 seconds to explain what happened without interruption.",
                "Summarizes: 'Rohan, you saw the bails light up before the bat crossed. Kabir, you felt your foot was inside the crease when the ball was thrown.'",
                "Proposes: 'Since nobody had a clear camera view, let's declare it a Dead Ball and re-bowl the delivery.'",
                "Both boys nod, shake hands, and the cricket match continues peacefully."
            ],
            "takeaway": "Neutral mediation moves friends from 'Who is right?' to 'What is fair for the game?'"
        },
        "mistakes": [
            ("Taking sides immediately based on who you like better or who sits next to you.", "Favoritism destroys mediator trust and permanently alienates the other friend."),
            ("Letting both friends shout over each other in an escalating screaming match.", "Never allow interruptions during mediation; enforce strict, timed speaking turns.")
        ],
        "checklist": [
            "Did I remain completely neutral without picking favorites?",
            "Did I enforce the zero-interruption and zero-insult ground rules?",
            "Did I paraphrase both perspectives accurately?",
            "Did both friends agree on a fair, forward-looking resolution?"
        ],
        "prompt": "Why do people usually stop shouting when an impartial friend steps in with calm, steady neutrality?",
        "takeaway": "Be the bridge, not the judge: neutral mediation transforms bitter playground fights into restored friendships.",
        "vis1": {"title": "The 3 Ground Rules of Mediation", "caption": "1. Timed Speaking Turns -> 2. Zero Interruptions -> 3. Focus on current issue, no past insults!"},
        "vis2": {"title": "The Dead Ball Compromise", "caption": "When two honest viewpoints clash without proof: reset to neutral baseline and play forward!"},
        "act": {
            "title": "The Playground Mediator Roleplay Lab",
            "obj": "Conduct a structured 3-person peer mediation simulation resolving an everyday school disagreement.",
            "steps": [
                "Form a 3-person group: Mediator, Disputant A, Disputant B.",
                "Scenario: Disagreement over whose turn it is to use the classroom tablet.",
                "Mediator establishes ground rules and gives 60-second timed turns.",
                "Mediator paraphrases both sides and proposes a time-sharing compromise.",
                "Disputants confirm satisfaction and complete a mutual handshake."
            ],
            "output": "A signed Peer Mediation Simulation debrief sheet signed by all 3 participants."
        },
        "guided": {
            "context": "Two classmates in your art group are fighting over who gets to paint the center rainbow on the project chart.",
            "optimal": "Step in: 'Both of you are amazing painters. What if Person A paints the rainbow arcs and Person B paints the golden clouds and shading at the base? That way both your painting styles are featured together.'",
            "opt_reason": "Divides the creative opportunity into collaborative complementary roles rather than an all-or-nothing contest.",
            "non1": "Scream: 'You both are behaving like kindergarten babies!'",
            "non1_reason": "Insults both peers and inflames emotional defensiveness.",
            "non2": "Paint the entire rainbow yourself while they argue.",
            "non2_reason": "Selfish takeover that alienates both group members.",
            "takeaway": "Divide complementary creative roles so both teammates can shine."
        },
        "indep": {
            "context": "A dispute turns physical with pushing and raised fists.",
            "prompt": "Explain why a student mediator must never physically tackle fighting peers and when to call a teacher immediately.",
            "rubric": "Recognized physical safety limits; maintained safe distance, used commanding verbal stop cue, called teacher/supervisor immediately."
        },
        "quiz": {
            "q": "What is the primary role of an effective peer mediator during a playground argument?",
            "opt_correct": "To act as an impartial bridge who helps both sides explain their view without interruption and negotiate a fair compromise.",
            "opt_w1": "To declare a winner and punish the loser.",
            "opt_w2": "To take their best friend's side no matter what.",
            "opt_w3": "To film the fight on a smartphone for social media."
        },
        "rubric": {
            "task": "Facilitate neutral dispute mediation, maintain conversational equity, and guide peers toward consensus agreements.",
            "mastery": "Maintains strict neutrality, enforces speaking rules firmly, paraphrases underlying emotional needs, secures durable handshake compromises.",
            "c1": "Impartiality & Ground Rule Enforcement",
            "c2": "Perspective Synthesis & Active Listening",
            "c3": "Compromise Negotiation & Conflict Resolution"
        },
        "refs": [
            "Why do high schools and universities train student peer mediators to reduce campus bullying?",
            "How does remaining calm when everyone else is furious give you natural leadership authority?",
            "What is the difference between a compromise (both give up something) and a consensus (both genuinely agree)?",
            "How does solving playground disputes peacefully prepare you for professional teamwork as an adult?"
        ]
    },
    {
        "month": 11, "theme": "Conflict Mediation, Project Equity & Gratitude Correspondence", "seq": 2,
        "cat": "life_social_teamwork", "cat_label": "Social Skills, Empathy & Teamwork",
        "title": "Sharing Credit: Acknowledging Quiet Contributors in School Group Projects",
        "why": "In school group projects, charismatic or loud students often take all the glory, while quiet teammates who did the research or drew the charts are ignored. Great leaders share credit generously and uplift every contributor.",
        "objs": [
            "Recognize different team contribution styles: orators, researchers, visual artists, and organizers",
            "Maintain an equitable project contribution log during multi-week school assignments",
            "Deliver public praise: specifically name quiet teammates and their exact contributions during project presentations",
            "Understand why hoarding credit destroys team trust and brands you as an insecure leader"
        ],
        "scenario": "During a Class 6 Science presentation on Renewable Energy, Rahul spoke for 8 minutes and received loud applause. His classmate Tanvi had spent 4 hours building the working solar turbine model, but Rahul never mentioned her name once.",
        "expl": "True leaders are like spotlights: they don't shine the light on themselves; they shine the spotlight on their teammates! When you take credit for other people's work, people secretly resent you and refuse to work with you again. When you publicly praise quiet contributors, everyone loves being on your team and your own leadership reputation multiplies ten-fold.",
        "steps": [
            "Maintain a Team Contribution Sheet from Day 1: list who researched, who built models, who typed slides, and who rehearsed.",
            "At the start of your presentation, introduce the full team with their specific roles: 'Our model was engineered by Tanvi, research gathered by Ishan, and visuals designed by Priya.'",
            "During the presentation, point directly to their work: 'As you can see in Tanvi's brilliant working turbine model...'",
            "When the teacher or audience asks a question about their area, pass the microphone to them: 'Tanvi did the wiring for the motor; she can explain the gearing best.'",
            "Never use the word 'I' when talking about group work; always say 'Our team' and 'We'.",
            "Thank each teammate privately after the presentation with a sincere high-five."
        ],
        "example": {
            "title": "Rahul's Leadership Upgrade",
            "scenario": "Rahul learns to spotlight his teammates.",
            "steps": [
                "Opens Science presentation: 'This project succeeded because of Tanvi's incredible model engineering.'",
                "Hands Tanvi the model pointer to explain the turbine gear ratios.",
                "Audience gives a standing ovation for Tanvi's model.",
                "Teacher awards the team an A+ and praises Rahul's outstanding leadership.",
                "Tanvi and Rahul become permanent, trusted project partners."
            ],
            "takeaway": "Spotlighting your teammates elevates the entire team and proves your maturity as a leader."
        },
        "mistakes": [
            ("Using the words 'I built this' and 'I designed this' when presenting collaborative group work.", "Claiming sole ownership of shared work is intellectual theft; always use 'We' and name individual creators."),
            ("Dismissing quiet teammates because they don't like speaking in front of the classroom.", "Deep research, neat drawing, and steady organization are just as vital as loud speaking; value every skill.")
        ],
        "checklist": [
            "Are all teammates' names and specific roles listed on the project title slide/sheet?",
            "Did I use the word 'We' instead of 'I' throughout the presentation?",
            "Did I hand speaking opportunities to teammates about their specific contributions?",
            "Did I thank each team member sincerely after concluding?"
        ],
        "prompt": "How does it feel when someone else takes all the credit for a project you spent hours working on?",
        "takeaway": "Shine the spotlight: true leaders share credit generously and celebrate every teammate's unique contribution.",
        "vis1": {"title": "The Spotlight Leadership Rule", "caption": "Insecure: 'I did this project!' -> True Leader: 'Tanvi built the model, Ishan verified the data, we succeeded together!'"},
        "vis2": {"title": "The 4 Pillars of Project Contribution", "caption": "The Orator (Speaking) + The Architect (Building) + The Scholar (Research) + The Scribe (Organization). All 4 are equal!"},
        "act": {
            "title": "The Project Contribution & Credit Log",
            "obj": "Create an equitable Team Contribution Charter for an upcoming or past group assignment.",
            "steps": [
                "Select a current or recent school group project.",
                "Draw a 4-column table: Team Member, Specific Deliverables, Time Invested, Presentation Spotlight Line.",
                "Draft exact verbal sentences to give public credit to each quiet member during presentation.",
                "Review the credit plan with your team members."
            ],
            "output": "A documented Team Contribution & Credit Charter signed by all group participants."
        },
        "guided": {
            "context": "The school principal stops by your science booth and compliments the beautiful hand-drawn charts that your shy teammate Priya drew.",
            "optimal": "Immediately say with pride: 'Thank you, sir! Priya drew all of these detailed diagrams by hand using her own scientific research. She did an extraordinary job!'",
            "opt_reason": "Directs high-level institutional praise directly to the quiet artist who earned it.",
            "non1": "Smile and say: 'Thank you sir, I worked very hard on them!'",
            "non1_reason": "Blatant credit theft that destroys personal integrity and crushes Priya's spirit.",
            "non2": "Stay silent and look at the floor.",
            "non2_reason": "Misses a golden opportunity to uplift a deserving classmate.",
            "takeaway": "Never accept credit for another person's labor; pass the praise forward immediately."
        },
        "indep": {
            "context": "One team member failed to complete their assigned slides, and another member worked late to finish them.",
            "prompt": "Explain how you will represent the situation fairly to the teacher without public humiliation.",
            "rubric": "Accurately reported contributions on the internal group sheet, acknowledged the savior's extra effort, handled accountability privately."
        },
        "quiz": {
            "q": "What is the hallmark of an exceptional team leader during a group project presentation?",
            "opt_correct": "Publicly spotlighting teammates' specific contributions, using 'We' instead of 'I', and passing questions to individual specialists.",
            "opt_w1": "Talking continuously for the entire time so nobody else has to speak.",
            "opt_w2": "Putting your name in bold letters twice as large as everyone else's.",
            "opt_w3": "Telling the teacher about everyone else's flaws before starting."
        },
        "rubric": {
            "task": "Demonstrate collaborative credit sharing, team equity logging, and inclusive presentation leadership.",
            "mastery": "Maintains detailed contribution logs, spotlights quiet peers effortlessly, replaces 'I' with 'We', facilitates equitable question handling.",
            "c1": "Contribution Logging & Role Valuation",
            "c2": "Inclusive Presentation & Credit Distribution",
            "c3": "Ethical Leadership & Peer Empowerment"
        },
        "refs": [
            "Why do championship cricket captains always hand the trophy to young debutants during celebration photos?",
            "How does credit hoarding in corporate teams lead to top performers quitting their jobs?",
            "What can you do to make sure shy teammates feel comfortable sharing their ideas during brainstorms?",
            "How does being known as a generous team player make more classmates want to collaborate with you?"
        ]
    },
    {
        "month": 11, "theme": "Conflict Mediation, Project Equity & Gratitude Correspondence", "seq": 3,
        "cat": "life_communication", "cat_label": "Communication & Confidence",
        "title": "Writing a Thoughtful Thank-You Letter to a Coach, Bus Driver, or Mentor",
        "why": "We often take everyday community contributors—school bus drivers, security guards, coaches, and sanitation staff—for granted. Writing a heartfelt, specific thank-you note practices deep gratitude and brings immense joy to essential workers.",
        "objs": [
            "Identify unsung contributors in your daily school and community routine",
            "Apply the 4-Part Gratitude Formula: Salutation, Specific Memory/Action, Personal Impact, and Sincere Well-Wishes",
            "Write with neat penmanship on high-quality paper or a handmade folded card",
            "Deliver the note in person with a warm smile, steady eye contact, and polite two-handed delivery"
        ],
        "scenario": "Mr. Ram, the school bus driver, safely navigated chaotic city traffic, rainstorms, and noisy students every morning for 6 years. Rudra noticed that students rushed off the bus every afternoon without even saying 'Thank you'.",
        "expl": "A quick verbal 'thanks' is nice, but a handwritten letter is a keepsake people treasure for decades! Essential workers often feel invisible and under-appreciated. When you take 15 minutes to write a specific letter describing how their care kept you safe, you give a gift of pure dignity and joy that costs zero money.",
        "steps": [
            "Choose a recipient: School bus driver, sports coach, library assistant, or security guard.",
            "Step 1 (Warm Greeting): Address them with proper respectful titles: 'Dear Ram Bhaiya' or 'Dear Coach Joseph'.",
            "Step 2 (The Specific Memory): Mention one concrete moment of care: 'I will never forget when you waited an extra minute in the heavy rain so I wouldn't miss the bus.'",
            "Step 3 (The Personal Impact): Explain what their dedication meant to you: 'Knowing you drive so carefully makes my parents and me feel safe every single morning.'",
            "Step 4 (Warm Well-Wishes): 'Wishing you and your family good health, safety, and joy.'",
            "Presentation: Deliver the card with both hands, look them in the eyes, and say: 'Thank you for everything you do for us.'"
        ],
        "example": {
            "title": "Rudra's Bus Driver Card",
            "scenario": "Rudra delivers his handwritten note.",
            "steps": [
                "Makes a card with a drawing of the yellow school bus.",
                "Writes a 4-part message thanking Mr. Ram for safe driving in monsoon floods.",
                "Hands it to Mr. Ram at the afternoon bus stop with both hands.",
                "Mr. Ram's eyes fill with tears of joy; he tapes the card to his driver dashboard.",
                "Rudra feels immense warmth and gratitude in his own heart."
            ],
            "takeaway": "A handwritten letter of gratitude honors unsung community heroes and builds a compassionate character."
        },
        "mistakes": [
            ("Writing a lazy, generic note like 'Thanks for driving the bus, from Rudra.'", "Generic notes feel like chores; always include a specific personal memory and sincere emotional impact."),
            ("Tossing the card casually onto a seat or counter while looking at your phone.", "Deliver gratitude notes with full physical presence: two hands, warm smile, and direct eye contact.")
        ],
        "checklist": [
            "Is the recipient addressed with warmth and respect?",
            "Did I mention a specific memory or instance of their care?",
            "Did I describe the positive impact on my life?",
            "Is the handwriting neat, clean, and delivered with polite two-handed posture?"
        ],
        "prompt": "Who is an unsung worker at your school who helps you every day without being noticed?",
        "takeaway": "Notice the quiet helpers, write the words: handwritten gratitude honors essential workers and fills your heart with joy.",
        "vis1": {"title": "The 4-Part Gratitude Architecture", "caption": "1. Respectful Salutation -> 2. Specific Concrete Memory -> 3. Personal Meaning/Impact -> 4. Warm Blessing & Sign-off."},
        "vis2": {"title": "The Two-Handed Delivery Protocol", "caption": "Offer card with both hands, stand tall, make warm eye contact, speak sincere words of thanks."},
        "act": {
            "title": "The Unsung Hero Gratitude Mission",
            "obj": "Write and deliver an original 4-part handwritten gratitude card to an essential worker in your school or neighborhood.",
            "steps": [
                "Select an unsung worker (bus driver, guard, sweeper, sports coach, librarian).",
                "Draft the 4 components on rough paper first.",
                "Transcribe neatly onto a clean card or folded drawing sheet.",
                "Deliver the card in person with two-handed respect.",
                "Record your reflection in your citizenship journal."
            ],
            "output": "A copy or draft of your delivered gratitude card with personal reflection notes."
        },
        "guided": {
            "context": "Your school basketball coach spent an extra hour after school every Tuesday helping you improve your free-throw shooting.",
            "optimal": "Write Coach a letter thanking him specifically for his patient feedback, explaining how your confidence grew, and promising to give your best effort in the upcoming tournament.",
            "opt_reason": "Validates the coach's invested personal time and reinforces mutual respect and dedication.",
            "non1": "Send a 1-word text message: 'thx'.",
            "non1_reason": "Lazy, dismissive, and shows zero appreciation for hours of dedicated coaching.",
            "non2": "Say nothing because 'coaching is his job anyway'.",
            "non2_reason": "Entitled, cold, and displays complete lack of empathy.",
            "takeaway": "Coaches and mentors pour their hearts into students; honor their extra effort with sincere written words."
        },
        "indep": {
            "context": "You want to organize your classmates to create a collective thank-you card for the school cleaning staff on Labor Day.",
            "prompt": "Describe how you will coordinate contributions from 10 classmates onto a single giant poster card.",
            "rubric": "Created organized border quadrants, assigned specific positive messages, ensured neat handwriting and group signature."
        },
        "quiz": {
            "q": "What makes a handwritten thank-you letter deeply meaningful to an essential worker compared to a casual spoken 'thanks'?",
            "opt_correct": "It captures a specific personal memory and articulates genuine emotional impact, becoming a permanent treasured keepsake of dignity.",
            "opt_w1": "Because letters can be exchanged for cash at the bank.",
            "opt_w2": "Because teachers give extra marks for envelopes.",
            "opt_w3": "Because essential workers are required to collect 100 letters a year."
        },
        "rubric": {
            "task": "Compose and deliver an authentic, specific handwritten gratitude letter demonstrating empathy and civic respect.",
            "mastery": "Applies the 4-part framework flawlessly, cites vivid concrete memories, demonstrates pristine penmanship, executes respectful delivery.",
            "c1": "Gratitude Structure & Specificity of Content",
            "c2": "Emotional Sincerity & Empathy Expression",
            "c3": "Presentation Craft & Delivery Etiquette"
        },
        "refs": [
            "Why do many elderly people and retired workers keep handwritten letters in special tin boxes for decades?",
            "How does writing expressions of gratitude rewire the human brain for higher optimism and resilience?",
            "What challenges do school bus drivers and municipal sanitation workers face in our cities every day?",
            "How can a simple 'Thank you' change someone's entire mood after a stressful working shift?"
        ]
    },

    # MONTH 12: Community Stewardship, Composting & Civic Care
    {
        "month": 12, "theme": "Balcony Composting, E-Waste Recycling & Stray Animal Care", "seq": 1,
        "cat": "life_citizenship_community", "cat_label": "Practical Citizenship & Community Life",
        "title": "Setting Up a Simple Balcony Kitchen-Waste Compost Pot",
        "why": "Over 50% of household garbage sent to overflowing city dump yards is organic food waste that rots and produces toxic methane gas. Learning to compost kitchen scraps at home turns waste into rich black soil for balcony plants.",
        "objs": [
            "Differentiate between Green Matter (nitrogen-rich: vegetable peels, fruit rinds, tea leaves) and Brown Matter (carbon-rich: dry leaves, torn cardboard, cocopeat)",
            "Identify what CANNOT be composted in a balcony pot: cooked oily curries, dairy, meat, and plastic stickers",
            "Assemble a 3-layer aerated terracotta compost pot with proper drainage and aeration holes",
            "Manage moisture and eliminate bad odors by maintaining the Golden 2:1 Brown-to-Green ratio"
        ],
        "scenario": "Kavya's family generated two plastic bags of wet kitchen waste every single day. She saw news reports of mountains of burning garbage at the city landfill and decided to start a no-smell balcony compost pot.",
        "expl": "Composting is nature's recycling factory! In nature, there is zero garbage: fallen leaves and fruit scraps rot down into rich black humus that feeds new trees. By layering nitrogen greens (fruit peels) with carbon browns (dry leaves or torn cardboard) in an aerated clay pot, friendly aerobic microbes turn kitchen waste into nutrient-dense plant food in 60 days with zero bad smell.",
        "steps": [
            "Get an earthen terracotta pot (or bucket with 15 drilled ventilation holes) and a saucer tray for drainage.",
            "Base Layer: Place 2 inches of dry crushed brown leaves or torn egg cartons at the bottom for airflow.",
            "Green Layer: Add finely chopped raw vegetable peels, fruit rinds, and used tea leaves (no oily gravies).",
            "Brown Cover: Immediately cover the wet green scraps completely with a 1-inch blanket of dry leaves, sawdust, or cocopeat (2:1 ratio).",
            "Aeration: Stir the pile with a small garden fork once a week to let oxygen reach aerobic bacteria.",
            "Harvest: In 6 to 8 weeks, the scraps will transform into dark, crumbly, sweet-smelling black compost for your balcony plants."
        ],
        "example": {
            "title": "Kavya's Black Gold",
            "scenario": "Kavya manages her balcony compost pot.",
            "steps": [
                "Collects daily apple cores, banana peels, and cucumber ends in a small bowl.",
                "Tears up cardboard delivery boxes into 1-inch brown postage stamp pieces.",
                "Layers greens then covers with twice as much brown cardboard.",
                "Stirs weekly: smells like a fresh rain-soaked forest, zero foul odors.",
                "After 60 days: harvests 5 kg of rich black organic compost for her tomato plants.",
                "Reduces her family's landfill garbage by half!"
            ],
            "takeaway": "Layering two parts brown carbon over one part green kitchen scraps creates odorless, rich organic plant food."
        },
        "mistakes": [
            ("Adding oily cooked curries, meat bones, or cheese into a simple balcony pot.", "Oily cooked foods and dairy attract flies, maggots, and rodent pests; keep balcony pots strictly for raw plant waste."),
            ("Letting the compost turn into a soggy, dripping wet swamp.", "Excess moisture causes anaerobic rotting and foul odors; always add dry brown leaves or shredded cardboard to absorb moisture.")
        ],
        "checklist": [
            "Are scraps chopped small for rapid decomposition?",
            "Are all wet green peels covered completely with dry brown matter?",
            "Is the compost pile aerated weekly with a garden trowel?",
            "Are cooked oily foods, dairy, and plastic fruit stickers kept out?"
        ],
        "prompt": "How does turning your vegetable scraps into soil change the way you look at 'garbage'?",
        "takeaway": "Browns over greens, nature does the rest: balcony composting turns kitchen waste into rich black life.",
        "vis1": {"title": "The 2:1 Compost Layering Architecture", "caption": "2 Parts Brown (Dry leaves, shredded cardboard) over 1 Part Green (Raw peels, tea leaves) in aerated pot."},
        "vis2": {"title": "The Compost Green vs Red List", "caption": "YES: Fruit peels, tea leaves, coffee, dry leaves, egg cartons. NO: Meat, oil, cooked food, plastic stickers!"},
        "act": {
            "title": "The Balcony Compost Station Setup",
            "obj": "Set up and manage a 1-pot aerated kitchen waste composting unit for 14 days.",
            "steps": [
                "Source an earthen pot or plastic bucket with ventilation holes.",
                "Collect dry leaves from park or shred brown cardboard boxes.",
                "Add daily chopped vegetable peels and cover with dry browns.",
                "Monitor moisture and smell daily; stir on Day 7 and Day 14.",
                "Document decomposition progress with photos."
            ],
            "output": "A 14-day Compost Journal with photos showing initial waste breaking down into dark organic matter."
        },
        "guided": {
            "context": "Your compost pot starts smelling like rotten sour vinegar and attracting tiny fruit flies.",
            "optimal": "Add two thick layers of dry brown shredded cardboard to absorb excess moisture, stop adding wet scraps for 4 days, and stir thoroughly to introduce oxygen.",
            "opt_reason": "Sour smells and flies indicate too much moisture and lack of oxygen (anaerobic conditions); dry browns and airflow fix this instantly.",
            "non1": "Spray chemical insect pesticide directly into the compost pot.",
            "non1_reason": "Kills beneficial composting microbes and poisons future plant soil.",
            "non2": "Dump the entire pot into the garbage chute.",
            "non2_reason": "Abandons a simple fixable process and sends waste to landfills.",
            "takeaway": "Whenever compost smells, add dry browns and stir for airflow."
        },
        "indep": {
            "context": "Why are fruit stickers (the tiny plastic PLU oval labels on apples) the biggest enemy of home composting?",
            "prompt": "Explain plastic non-biodegradability and why removing stickers before peeling is essential.",
            "rubric": "Explained plastic stickers never decompose, fragment into microplastics, and contaminate finished compost."
        },
        "quiz": {
            "q": "What is the secret formula to prevent a balcony kitchen-waste compost pot from smelling foul?",
            "opt_correct": "Maintain a 2:1 ratio of dry brown carbon matter (leaves/cardboard) covering wet green scraps, and stir weekly for aeration.",
            "opt_w1": "Pour a bottle of chemical perfume over the scraps every morning.",
            "opt_w2": "Keep the pot sealed airtight without any holes in a dark closet.",
            "opt_w3": "Add leftover deep-fried samosas and chicken gravies."
        },
        "rubric": {
            "task": "Construct, balance, and maintain a functional aerobic kitchen-waste composting system.",
            "mastery": "Applies correct Carbon:Nitrogen ratios, identifies non-compostable contaminants, manages moisture levels, troubleshoots odor issues.",
            "c1": "Carbon:Nitrogen Layering Discipline",
            "c2": "Moisture & Aeration Management",
            "c3": "Contaminant Elimination & Environmental Impact"
        },
        "refs": [
            "Why is landfill methane gas 25 times more potent than carbon dioxide as a greenhouse gas?",
            "What role do red wiggler earthworms play in vermicomposting systems?",
            "How can housing societies establish centralized composting pits for entire apartment complexes?",
            "How does using homemade compost reduce the need for synthetic chemical fertilizers?"
        ]
    },
    {
        "month": 12, "theme": "Balcony Composting, E-Waste Recycling & Stray Animal Care", "seq": 2,
        "cat": "life_citizenship_community", "cat_label": "Practical Citizenship & Community Life",
        "title": "Safe Household E-Waste Disposal: Recycling Batteries and Old Cables",
        "why": "Tossing old alkaline batteries, swollen phone batteries, and broken charging cables into regular trash bins leaches deadly heavy metals (lead, cadmium, mercury) into groundwater and poisons soil. Practicing responsible e-waste segregation protects our environment.",
        "objs": [
            "Identify household Electronic Waste (E-Waste): AA/AAA batteries, button cells, obsolete chargers, broken headphones, and old electronics",
            "Explain the extreme hazard of punctured or swollen Lithium-Ion batteries: fire hazard and toxic chemical leaks",
            "Tape the terminals of discarded 9V and lithium batteries with electrical or cellotape to prevent accidental short-circuits",
            "Locate certified authorized municipal or retailer E-Waste collection bins in your city"
        ],
        "scenario": "Dhruv was cleaning his study drawers and found 8 dead AA toy batteries and 3 frayed USB cables. He was about to dump them into the kitchen garbage bin with potato peels.",
        "expl": "Electronics are marvels of human engineering, but inside them are toxic heavy metals like lead, mercury, and cadmium! When batteries sit in rain-soaked garbage dumps, their metal casings corrode, releasing poisons that seep deep underground into the water wells that people drink from. Segregating e-waste ensures valuable copper and lithium are safely recycled.",
        "steps": [
            "Set up a dedicated 'Home E-Waste Box' (a sturdy cardboard shoe box with a lid kept in a dry cupboard).",
            "Collect: Dead alkaline batteries, button cells from watches, frayed charging cables, old headphones, broken calculators.",
            "Safety Terminal Taping: Place a piece of clear cellotape or electrical tape over the metal terminals of 9V and coin cell batteries to prevent sparks.",
            "Swollen Battery Red Alert: If a phone or tablet battery looks puffy or swollen, inform an adult immediately; do NOT bend, press, or puncture it.",
            "Locate Drop-off Point: Search for certified E-Waste collection bins at local electronics retail stores, metro stations, or municipal collection drives.",
            "Deposit the box every 6 months at an authorized e-waste recycling center."
        ],
        "example": {
            "title": "Dhruv's E-Waste Box Drive",
            "scenario": "Dhruv diverts toxic waste from landfills.",
            "steps": [
                "Stops himself from tossing batteries in kitchen trash.",
                "Labels a shoe box: 'DHRUV'S E-WASTE RECYCLING DOCK'.",
                "Tapes battery terminals and gathers 12 batteries and 4 dead cables from family.",
                "Drops them off at the recycling kiosk inside a local electronics store.",
                "Receives an eco-warrior certificate from the store manager."
            ],
            "takeaway": "Segregating electronic waste keeps toxic heavy metals out of drinking water and allows precious minerals to be reused."
        },
        "mistakes": [
            ("Throwing dead batteries into household trash bins that end up incinerated or dumped in landfills.", "Incinerating batteries releases airborne lead and mercury fumes; always dispose through dedicated e-waste recyclers."),
            ("Hammering, cutting, or puncturing old rechargeable batteries to see what is inside.", "Lithium reacts violently with moisture in the air, creating explosive fires and toxic hydrofluoric gas.")
        ],
        "checklist": [
            "Are batteries stored in a dry container away from metal keys and coins?",
            "Are battery positive and negative terminals taped with non-conductive tape?",
            "Are electronic items kept separate from food and wet garbage?",
            "Do I know the location of our nearest authorized e-waste collection bin?"
        ],
        "prompt": "Why do modern electronics like smartphones contain tiny amounts of real gold, silver, and rare earth elements?",
        "takeaway": "Box the batteries, recycle the wire: keeping e-waste out of landfills protects our soil and drinking water.",
        "vis1": {"title": "The Heavy Metal Leaching Cycle", "caption": "Battery in trash -> Landfill rainwater -> Toxic Lead/Cadmium leaches down -> Enters groundwater & crops!"},
        "vis2": {"title": "The Terminal Taping Rule", "caption": "Place clear cellotape over 9V terminals and coin cells to prevent accidental short-circuit fires in storage."},
        "act": {
            "title": "The Household E-Waste Roundup",
            "obj": "Create a designated home E-Waste box, collect all dormant household electronic waste, and deposit at an authorized recycling point.",
            "steps": [
                "Decorate and label a dedicated sturdy cardboard E-Waste collection box.",
                "Audit drawers across your home with family for dead batteries, broken cables, and dead gadgets.",
                "Tape terminals of button cells and 9V batteries.",
                "Locate an authorized collection point (e.g. Croma, Reliance Digital, or municipal drop box).",
                "Deposit collected items with parent supervision."
            ],
            "output": "A photograph of your labeled home E-Waste box and proof of deposit at an authorized e-waste recycler."
        },
        "guided": {
            "context": "An old wireless earbud charging case in your drawer has cracked open and the tiny battery inside has swollen like a puffy pillow.",
            "optimal": "Do not charge it, do not squeeze it, and do not put it near flammable paper; place it in a metal tin with sand or baking soda and ask an adult to deliver it to an authorized e-waste handler.",
            "opt_reason": "A swollen lithium battery is under severe internal pressure and can violently combust if punctured.",
            "non1": "Puncture the swollen battery with a sewing needle to pop the air out.",
            "non1_reason": "Extremely dangerous; triggers instantaneous explosive thermal runaway and toxic flames.",
            "non2": "Plug it into a wall fast-charger to see if it works.",
            "non2_reason": "Guaranteed thermal explosion and house fire.",
            "takeaway": "Swollen batteries are volatile fire hazards; never charge or puncture them."
        },
        "indep": {
            "context": "Your school is holding an annual scrap collection drive.",
            "prompt": "Draft a 3-bullet announcement explaining why students should bring dead batteries to school for the e-waste bin.",
            "rubric": "Highlighted groundwater protection from heavy metals, recovery of rare minerals, and convenience of school collection."
        },
        "quiz": {
            "q": "Why is it dangerous to dispose of household alkaline and lithium batteries in regular kitchen trash bins?",
            "opt_correct": "Corroded batteries leach toxic heavy metals like lead, cadmium, and mercury into soil and groundwater, poisoning drinking water supplies.",
            "opt_w1": "Because garbage collectors use batteries as weapons.",
            "opt_w2": "Because batteries make potato peels taste bitter.",
            "opt_w3": "Because trash trucks run on battery juice."
        },
        "rubric": {
            "task": "Establish domestic e-waste collection systems, execute safety protocols (terminal taping), and identify certified recycling pathways.",
            "mastery": "Identifies diverse e-waste streams, tapes battery terminals, recognizes lithium swelling hazards, executes certified drop-off disposal.",
            "c1": "E-Waste Categorization & Environmental Toxicology",
            "c2": "Battery Storage Safety & Terminal Insulation",
            "c3": "Civic Stewardship & Authorized Recycling Delivery"
        },
        "refs": [
            "What are the Government of India's E-Waste Management Rules and Extended Producer Responsibility (EPR)?",
            "How do specialized recycling factories extract copper, cobalt, and gold from old circuit boards?",
            "Why is informal e-waste burning in unorganized scrap yards devastating for worker health?",
            "How can buying durable electronics with repairable parts reduce overall global e-waste generation?"
        ]
    },
    {
        "month": 12, "theme": "Balcony Composting, E-Waste Recycling & Stray Animal Care", "seq": 3,
        "cat": "life_citizenship_community", "cat_label": "Practical Citizenship & Community Life",
        "title": "Organizing a Neighborhood Stray Animal Water & Feeding Station",
        "why": "During scorching Indian summers, thousands of community dogs, cats, and birds suffer and die from extreme dehydration. Setting up clean, safe community water bowls practices civic empathy and compassionate neighborhood responsibility.",
        "objs": [
            "Identify the severe risk of dehydration in community animals during hot weather (temperatures >38°C)",
            "Set up a heavy, broad-based earthen water bowl in a safe, shaded neighborhood location away from speeding traffic",
            "Establish a daily hygiene routine: scrub algae, rinse thoroughly, and refill with fresh clean water daily",
            "Practice safe animal interaction: observe from a respectful distance, avoid petting unfamiliar animals, and never provoke"
        ],
        "scenario": "During a 42°C June heatwave in Delhi/Ahmedabad, Meera saw a neighborhood stray dog panting heavily under a parked car, licking dry dust in search of a single drop of water.",
        "expl": "Community animals are our street companions! Dogs and birds cannot turn on water taps when they are parched. In scorching weather, clean drinking water is the difference between life and death. Setting up a simple earthen water bowl in a shaded corner and refilling it every morning brings life, comfort, and compassion to your neighborhood.",
        "steps": [
            "Choose the Right Bowl: Use a heavy, broad-based terracotta earthen bowl; clay keeps water naturally cool and cannot be easily knocked over by wind or running dogs.",
            "Find a Safe Shaded Spot: Place the bowl under a leafy tree, building boundary wall, or society garden edge away from car parking and speeding traffic.",
            "The Daily Scrub: Every morning, empty yesterday's leftover water onto nearby plants; scrub inside surfaces with a coir brush to remove slippery green algae.",
            "Refill with Clean Water: Fill with fresh, potable tap water to the brim.",
            "Mosquito Prevention: Clean and replace water every 24 hours so mosquito larvae can never hatch in stagnant water.",
            "Safety Golden Rule: Observe animals drinking peacefully from a respectful distance of 3 meters; never touch, startle, or corner eating or drinking animals."
        ],
        "example": {
            "title": "Meera's Community Water Bowl",
            "scenario": "Meera establishes a daily hydration station.",
            "steps": [
                "Places a large terracotta dish under the society banyan tree.",
                "Refills with 2 litres of fresh water every morning before school.",
                "Watches sparrows, pigeons, and two community dogs drink peacefully every afternoon.",
                "Scrubs bowl every Sunday with a brush to keep it spotless.",
                "Society committee praises Meera's compassionate initiative."
            ],
            "takeaway": "A simple earthen water bowl refilled daily saves dozens of neighborhood animals and birds from heatstroke."
        },
        "mistakes": [
            ("Leaving a plastic water bowl unwashed for weeks until thick green slime and mosquito larvae thrive.", "Stagnant, slimy water breeds malaria and dengue mosquitoes; scrub and refill daily without fail."),
            ("Placing the water bowl in the middle of a driveway or road where animals risk being struck by reversing cars.", "Always position bowls against secure boundary walls or under garden trees away from vehicle traffic.")
        ],
        "checklist": [
            "Is the bowl made of heavy, stable terracotta or stone?",
            "Is it located in a safe, shaded spot away from vehicle traffic?",
            "Is the water replaced and the bowl scrubbed clean every 24 hours?",
            "Am I respecting animal boundaries and observing from a safe distance?"
        ],
        "prompt": "How does watching birds and animals drink from a bowl you filled make you feel about your role in protecting nature?",
        "takeaway": "Quench their thirst, show compassion: a clean community water bowl brings life and kindness to your neighborhood.",
        "vis1": {"title": "The Earthen Water Station Setup", "caption": "Heavy Terracotta Bowl + Shaded Tree Base + Away from Traffic + Clean Daily Refill."},
        "vis2": {"title": "The 24-Hour Cleaning Cycle", "caption": "Dump old water on plants -> Scrub green algae with brush -> Refill with fresh tap water -> Zero mosquito larvae!"},
        "act": {
            "title": "The 7-Day Community Water Guardian Project",
            "obj": "Install, maintain, and log a daily clean water station for neighborhood birds and stray animals for 7 consecutive days.",
            "steps": [
                "Select a suitable heavy earthen or ceramic bowl.",
                "Obtain permission to place it in a safe shaded society or street corner.",
                "Refill with fresh water every morning for 7 days.",
                "Scrub inside walls every 2 days to prevent algae and mosquitoes.",
                "Record the birds and animals observed using the station."
            ],
            "output": "A 7-Day Water Station Guardian Log with photos and species observations."
        },
        "guided": {
            "context": "While refilling the water bowl, a street dog approaches wagging its tail and looking curious.",
            "optimal": "Stand calm and still, keep your hands relaxed at your sides, avoid direct aggressive staring or sudden shrieks, let the dog sniff the ground, finish placing the bowl calmly, and take three steps back.",
            "opt_reason": "Calm, non-threatening body language communicates peaceful intention to canines without triggering fear or territorial defense.",
            "non1": "Scream loudly, throw a rock at the dog, and sprint away.",
            "non1_reason": "Triggers predatory chase instincts in dogs and risks severe defensive bites.",
            "non2": "Lunge forward to grab and hug the unfamiliar dog.",
            "non2_reason": "Invades personal space and can cause startle-bites.",
            "takeaway": "Calm, steady posture and gentle movements keep human-animal interactions safe and peaceful."
        },
        "indep": {
            "context": "Design a simple bird water feeder made from an upcycled plastic container to hang from a balcony ceiling railing.",
            "prompt": "Describe how to hang it with sturdy twine and keep it out of reach of neighborhood cats.",
            "rubric": "Described shallow wide-rim dish, 3-point hanging twine balance, clear sightlines away from cat jump perches."
        },
        "quiz": {
            "q": "Why is it critically important to empty, scrub, and refill community water bowls every single day?",
            "opt_correct": "To eliminate slippery bacterial algae and prevent stagnant water from becoming a breeding ground for dengue and malaria mosquitoes.",
            "opt_w1": "Because water evaporates into gold after 24 hours.",
            "opt_w2": "Because birds only drink water that is carbonated.",
            "opt_w3": "Because street animals only drink at midnight."
        },
        "rubric": {
            "task": "Establish, sanitize, and maintain a humane community animal hydration station with civic responsibility.",
            "mastery": "Selects safe shaded locations, enforces daily 24-hour cleaning cycles, prevents mosquito vectors, demonstrates safe animal body language.",
            "c1": "Station Location & Environmental Safety",
            "c2": "Sanitation Discipline & Vector Prevention",
            "c3": "Humane Empathy & Safe Animal Interaction"
        },
        "refs": [
            "Why do earthen clay pots keep water several degrees cooler than plastic containers through evaporative cooling?",
            "What should you do if you encounter an injured or sick stray animal in your housing society?",
            "How does Rabies vaccination and animal birth control (ABC) programs keep communities safe?",
            "How did Mahatma Gandhi describe a society's greatness by the way its animals are treated?"
        ]
    }
]

print(f"Months 7-12 authored successfully ({len(months_7_to_12)} modules).")
