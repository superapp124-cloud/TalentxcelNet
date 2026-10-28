# scratch/c7_months_8_to_12.py

months_8_to_12 = [
    # MONTH 8: Nutrition, Cooking & Home Stains
    {
        "month": 8, "theme": "Pressure Cooker Cooking, Steam Safety & Tough Stain Removal", "seq": 1,
        "cat": "life_independence", "cat_label": "Personal Independence & Daily Living",
        "title": "Cooking a Basic Vegetable Pulao or Khichdi in a Stovetop Cooker",
        "why": "Being able to cook a nourishing, warm 1-pot meal means you will never go hungry when parents are delayed or sick. Learning the rice-water ratio, vegetable sautéing, and spice tempering builds lifelong domestic mastery.",
        "objs": [
            "Measure the golden Rice-to-Water ratio: 1 cup washed rice to 2 cups water for fluffy pulao (or 1:3 for soft khichdi)",
            "Sauté whole spices safely in ghee or oil: cumin seeds (jeera), bay leaf (tejpatta), and cloves without burning",
            "Combine diced vegetables (carrots, green peas, potatoes) with washed rice and lentils (moong dal)",
            "Secure the pressure cooker lid correctly, ensuring the rubber gasket and vent pipe are aligned"
        ],
        "scenario": "Aman's parents were stuck in a highway traffic jam on a rainy evening and wouldn't be home until 9:30 PM. Aman (age 13) opened the pantry, washed 1 cup of rice and dal, and cooked a warm pot of vegetable khichdi for his younger sister.",
        "expl": "A stovetop pressure cooker is an Indian kitchen's greatest superhero! It cooks nutritious food 3 times faster than open pots by raising the boiling point of water with trapped steam. Knowing how to measure 1 cup of rice with 2 cups of water, sauté fragrant jeera in a teaspoon of ghee, and let the cooker whistle twice gives you the superpower to feed yourself and family anytime.",
        "steps": [
            "Wash 1/2 cup basmati rice and 1/2 cup yellow moong dal in a bowl with clean water 3 times until water runs clear; drain.",
            "Place cooker on medium stove flame; add 1 tablespoon ghee or oil.",
            "Tempering (Tadka): Add 1/2 teaspoon cumin seeds; watch them sizzle for 10 seconds until aromatic (never let them turn black).",
            "Add 1 cup of chopped mixed vegetables (carrots, peas, diced potatoes); stir-fry for 2 minutes.",
            "Add drained rice-dal mix, 1/2 teaspoon turmeric, 1/2 teaspoon salt, and pour exactly 2.5 cups of water.",
            "Stir gently once; inspect rubber gasket inside cooker lid; align lid notches and twist closed until handle locks firmly.",
            "Place weight (whistle) onto vent pipe; cook on medium flame for exactly 2 whistles, then turn stove flame OFF."
        ],
        "example": {
            "title": "Aman's 1-Pot Comfort Meal",
            "scenario": "Aman cooks dinner for himself and his sister.",
            "steps": [
                "Measures 1:2.5 rice-to-water ratio.",
                "Sautées jeera in ghee: fills kitchen with wonderful aroma.",
                "Adds carrots and peas with turmeric and salt.",
                "Locks lid and places weight whistle.",
                "Counts 2 whistles, turns flame OFF.",
                "Lets pressure drop naturally for 15 minutes.",
                "Opens lid to reveal fluffy, golden, fragrant vegetable khichdi.",
                "Serves sister with curd; parents arrive and feel immense pride."
            ],
            "takeaway": "Mastering the 1-pot rice, vegetable, and water ratio creates nourishing meals with complete independence."
        },
        "mistakes": [
            ("Opening the cooker lid while steam is still hissing under pressure.", "Fatal hazard! Never force a pressure cooker open while under pressure; always wait for the safety lock to drop naturally."),
            ("Guessing water amounts randomly without measuring cups.", "Too much water makes gluey soup; too little water burns the bottom of the pot to charcoal. Always measure water precisely.")
        ],
        "checklist": [
            "Did I wash rice and dal until rinse water is clear?",
            "Did I measure the exact 1:2.5 rice-to-water ratio?",
            "Is the rubber gasket clean and fitted flat inside the lid rim?",
            "Did I count the whistles and turn off the stove flame on time?",
            "Did I let the pressure drop naturally before opening?"
        ],
        "prompt": "How did it feel when you took your first bite of a warm, delicious meal that you cooked with your own hands?",
        "takeaway": "Measure the water, respect the steam: 1-pot cooker meals give you lifelong food independence and culinary pride.",
        "vis1": {"title": "The Golden Ratio Guide", "caption": "Fluffy Pulao: 1 Cup Rice : 2 Cups Water. Soft Khichdi: 1 Cup Rice/Dal : 2.5 Cups Water. Exact water = perfect grains!"},
        "vis2": {"title": "The Sautéing Tadka Window", "caption": "Medium Flame -> Sizzle Cumin 10 seconds -> Add Veggies -> Zero burning! Golden brown, never black."},
        "act": {
            "title": "The 1-Pot Culinary Independence Challenge",
            "obj": "Plan, prep, sauté, cook, and serve a 1-pot vegetable pulao or khichdi under adult observation.",
            "steps": [
                "Measure rice, dal, water, and chop mixed vegetables.",
                "Sauté cumin tadka in ghee inside cooker.",
                "Add vegetables, rice-dal, turmeric, salt, and measured water.",
                "Lock cooker lid and cook for 2 whistles under adult supervision.",
                "Let pressure release naturally, fluff with fork, and plate with curd."
            ],
            "output": "A photograph and family meal feedback evaluation of the independently cooked 1-pot dish."
        },
        "guided": {
            "context": "You smell a slight burning aroma from the cooker after the first whistle.",
            "optimal": "Immediately turn off the stove gas flame, move the cooker to an unheated burner, and let it cool naturally without opening.",
            "opt_reason": "Prevents severe base burning and scorched flavor from ruining the entire batch of food.",
            "non1": "Turn the flame up to high to finish cooking faster.",
            "non1_reason": "Incinerates the food completely into black charcoal.",
            "non2": "Pour cold tap water directly over the hot whistle while on the stove.",
            "non2_reason": "Sudden thermal shock can warp metal and spray scalding steam.",
            "takeaway": "At the first sign of burning aroma, kill the stove flame immediately."
        },
        "indep": {
            "context": "Why is yellow moong dal preferred over whole rajma or chana when cooking quick emergency meals in Class 7?",
            "prompt": "Explain cooking time, soaking requirements, and protein digestibility.",
            "rubric": "Split moong dal requires zero pre-soaking, cooks in 10 minutes, and is light and highly digestible."
        },
        "quiz": {
            "q": "What is the standard volumetric water-to-grain ratio for cooking fluffy vegetable pulao in a stovetop pressure cooker?",
            "opt_correct": "1 cup of rice to 2 cups of water.",
            "opt_w1": "1 cup of rice to 10 cups of water.",
            "opt_w2": "Zero water; dry rice cooks with air.",
            "opt_w3": "1 cup of rice to half a cup of water."
        },
        "rubric": {
            "task": "Demonstrate grain washing, measuring volumetric ratios, tadka spice tempering, and pressure cooker operation.",
            "mastery": "Measures ingredients with mathematical accuracy, executes tadka without scorching, locks cooker lid properly, monitors whistles, adheres to pressure release protocols.",
            "c1": "Volumetric Measurement & Recipe Staging",
            "c2": "Thermal Tempering (Tadka) & Flame Control",
            "c3": "Cooker Mechanical Safety & Natural Pressure Depressurization"
        },
        "refs": [
            "How does Boyle's and Gay-Lussac's gas laws explain why pressure cookers raise the boiling point of water from 100°C to 121°C?",
            "Why is pressure cooking at high altitudes (like Leh or Shimla) essential due to low atmospheric pressure?",
            "What is the safety fusible plug in a cooker lid and how does it prevent over-pressurization explosions?",
            "How does combining lentils (pulses) with rice create a complete protein with all 9 essential amino acids?"
        ]
    },
    {
        "month": 8, "theme": "Pressure Cooker Cooking, Steam Safety & Tough Stain Removal", "seq": 2,
        "cat": "life_independence", "cat_label": "Personal Independence & Daily Living",
        "title": "Safely Handling Hot Cooker Whistles, Steam Venting & Pressure Locks",
        "why": "Forcing a pressure cooker open while steam is trapped inside triggers explosive geysers of boiling food that cause catastrophic facial and chest burns. Understanding steam pressure physics and safety release rules guarantees kitchen safety.",
        "objs": [
            "Explain how the pressure cooker safety valve (vent pipe, weight whistle, safety plug) prevents structural explosion",
            "Perform the 'Vent Pipe Light Test' before every cooking session to ensure the steam hole is 100% free of food clogs",
            "Inspect the rubber gasket (safety ring) for cracks, brittleness, or loose fit",
            "Master the 2 Safe Pressure Release Methods: Natural Release (wait 15m) and Cold-Water Lid Run (never touch whistle)"
        ],
        "scenario": "Pooja wanted to serve dinner quickly. The pressure cooker had just whistled 2 minutes ago. She grabbed a metal fork, wedged it under the hot whistle, and pulled. An explosive geyser of boiling dal and scalding steam blasted toward the ceiling.",
        "expl": "A hot pressure cooker holds 15 pounds of explosive pressure per square inch—like a miniature jet engine! When you pry the whistle open with a fork, trapped boiling food erupts violently into your face. Modern cookers have safety interlocks for a reason. Respecting steam physics and letting pressure drop naturally keeps your kitchen safe and calm.",
        "steps": [
            "Pre-Cooking Safety Test: Hold the lid up to a window or light bulb; look through the hollow vent pipe to ensure zero grains or dried food are clogging the steam hole.",
            "Gasket Check: Stretch the black rubber gasket lightly; it must be flexible, smooth, and snug inside the lid groove with zero cracks.",
            "The Cooking Phase: Place the lid on, turn handle until locked, and place the weight whistle on firmly.",
            "Turn Off Flame: When recipe whistles are reached, turn stove off immediately.",
            "Method 1 (Natural Release - Recommended): Do nothing for 12 to 15 minutes; as the cooker cools, steam condenses into liquid and pressure drops to zero naturally.",
            "The Spoon Test: Gently tap the side of the whistle with a long spoon handle; if ZERO steam hisses out and the safety pin drops down, the lid can be opened safely.",
            "Open Away From Face: Twist lid open pointing the underside AWAY from your face so remaining steam drifts upward safely."
        ],
        "example": {
            "title": "Pooja's Steam Safety Protocol",
            "scenario": "Pooja learns safe pressure venting.",
            "steps": [
                "Holds lid to kitchen window: verifies vent pipe is 100% clear of rice grains.",
                "Fits gasket firmly into groove.",
                "Cooks dal for 3 whistles, turns flame off.",
                "Waits 14 minutes for natural depressurization.",
                "Safety lock pin drops down with a soft click.",
                "Opens lid angled away from her chest.",
                "Zero steam burns, zero mess, total confidence."
            ],
            "takeaway": "Inspecting the vent pipe before cooking and waiting for natural depressurization guarantees zero steam accidents."
        },
        "mistakes": [
            ("Lifting or yanking the hot metal whistle with your bare fingers while on the stove.", "Scalding 120°C steam causes instant 2nd-degree blistering on fingers; never touch hot whistles with bare hands."),
            ("Using a knife or fork to force open a lid that feels jammed or resistant.", "Resistance means steam is still pressurized inside; forcing it open causes a catastrophic explosive eruption.")
        ],
        "checklist": [
            "Did I look through the vent pipe against light to verify zero clogs?",
            "Is the rubber gasket flexible and properly seated in the lid rim?",
            "Did I allow the pressure to drop naturally (12-15 mins)?",
            "Did the safety lock pin drop before attempting to twist the lid?",
            "Did I angle the opening lid away from my face?"
        ],
        "prompt": "Why does a pressure cooker lid refuse to turn easily when steam pressure is trapped inside?",
        "takeaway": "Check the vent, respect the lock: letting steam depressurize naturally keeps you safe from explosive burns.",
        "vis1": {"title": "The Vent Pipe Light Test", "caption": "Hold lid up to window. Look through center hole. Clear circle of light = Safe to cook! Blocked = Wash with pin."},
        "vis2": {"title": "The Safety Lock Pin Indicator", "caption": "Pin UP = DANGER (High pressure steam trapped inside). Pin DOWN = SAFE (Pressure zero, lid opens smoothly)."},
        "act": {
            "title": "The Pressure Cooker Pre-Flight Inspection",
            "obj": "Perform a complete mechanical pre-flight inspection on a household pressure cooker lid under adult supervision.",
            "steps": [
                "Remove rubber gasket and inspect for tears, cracks, or stiffness.",
                "Hold vent pipe up to light and verify clear opening.",
                "Clean vent pipe with a wooden toothpick or water stream if clogged.",
                "Inspect metal safety fusible plug underneath handle.",
                "Reassemble gasket into rim and demonstrate proper lock alignment on empty pot."
            ],
            "output": "A completed Cooker Mechanical Inspection Log signed by a guardian or home science teacher."
        },
        "guided": {
            "context": "You need to open the cooker urgently because you are running late, but pressure is still high.",
            "optimal": "Carry the cooker carefully using both handles to the sink, and run a gentle stream of cold tap water over the METAL LID ONLY (away from the center whistle) for 60 seconds until pressure drops naturally.",
            "opt_reason": "Cold water on lid condenses internal steam instantly into liquid, dropping pressure safely without touching the whistle.",
            "non1": "Pull the whistle off with pliers and let boiling dal blast the walls.",
            "non1_reason": "Extreme scalding steam hazard and destroys kitchen ceiling.",
            "non2": "Hit the cooker handles with a wooden cricket bat.",
            "non2_reason": "Ruptures metal safety seals and risks explosive vessel failure.",
            "takeaway": "Run cold tap water over the metal lid to depressurize in an emergency; never yank the whistle."
        },
        "indep": {
            "context": "What is the function of the tiny metallic 'Safety Valve' located next to the main vent pipe on cooker lids?",
            "prompt": "Explain low-melting-point alloy fusible plugs and emergency pressure release if the main vent pipe clogs.",
            "rubric": "Explained fusible alloy melts under extreme overheating/pressure to vent steam downward safely, preventing pot explosion."
        },
        "quiz": {
            "q": "What visual test must you ALWAYS perform on a pressure cooker lid before turning on the gas flame?",
            "opt_correct": "Hold the lid up to the light and look directly through the vent pipe to ensure it is completely clear of dried food clogs.",
            "opt_w1": "Smell the metal to see if it smells like spices.",
            "opt_w2": "Paint the lid with nail polish.",
            "opt_w3": "Spin the lid like a frisbee on the floor."
        },
        "rubric": {
            "task": "Demonstrate mechanical pressure cooker inspection, vent pipe validation, steam physics understanding, and safe depressurization.",
            "mastery": "Performs Vent Pipe Light Test instinctively, evaluates gasket elasticity, articulates safety pin mechanics, executes cold-water lid release safely.",
            "c1": "Mechanical Safety Inspection (Vent & Gasket)",
            "c2": "Steam Thermodynamics & Depressurization Physics",
            "c3": "Emergency Procedure Execution & Scald Prevention"
        },
        "refs": [
            "How did French physicist Denis Papin invent the 'steam digester' in 1679, the ancestor of the modern pressure cooker?",
            "Why do modern smart electric pressure cookers (like Instant Pots) have digital sensors that prevent opening under pressure?",
            "What should you do if the rubber gasket smells like burnt rubber during cooking?",
            "Why should pressure cookers never be filled more than two-thirds full of liquid and grains?"
        ]
    },
    {
        "month": 8, "theme": "Pressure Cooker Cooking, Steam Safety & Tough Stain Removal", "seq": 3,
        "cat": "life_independence", "cat_label": "Personal Independence & Daily Living",
        "title": "Pre-Treating Tough Curry, Oil & Ink Stains Before Washing",
        "why": "Throwing garments with turmeric curry drops, bicycle grease, or ballpoint pen ink directly into the washing machine bakes stains into permanent yellow-brown scars. Using targeted stain chemistry before washing saves favorite clothes from the trash.",
        "objs": [
            "Match stain chemistry to targeted dissolving agents: Oil/Grease (dishwashing liquid), Turmeric/Curry (sunlight bleaching & detergent), Ink (rubbing alcohol/sanitizer)",
            "Apply the 'Blot, Don't Rub' rule to prevent pushing stain pigments deeper into woven threads",
            "Pre-treat turmeric curry stains by leveraging sunlight photobleaching on wet cotton",
            "Demonstrate complete stain removal without damaging delicate fabric colors"
        ],
        "scenario": "During lunch, a drop of bright yellow turmeric curry splashed right onto the chest of Zain's favorite white cotton kurta. His friend rubbed it furiously with a dry paper napkin, smearing the spot into a giant yellow circle.",
        "expl": "Stains are chemical bonds clinging to cotton threads! Water alone cannot dissolve oil because oil and water repel each other. Rubbing a stain furiously with a dry cloth just grinds the dye deeper into the woven fibers. By applying the right chemical match—dishwashing liquid to break oil, alcohol to break ink, and solar UV light to break turmeric—stains dissolve like magic.",
        "steps": [
            "Step 1 (Blot): Immediately place a clean paper towel behind the stain; gently blot (tap down, never rub side to side) to lift excess wet sauce.",
            "Treating Oil & Curry: Dishwashing liquid (like Vim/Pril) is engineered to break cooking oil! Rub 2 drops of liquid directly onto the curry spot; let sit for 15 minutes.",
            "Treating Ballpoint Ink: Dab with rubbing alcohol or liquid hand sanitizer; alcohol dissolves solvent ink bases immediately.",
            "Rinse Cold: Rinse the pre-treated spot thoroughly with cool running tap water from the REVERSE side of the fabric.",
            "The Turmeric Solar Secret: Turmeric contains curcumin, which is naturally broken down by sunlight! Hang the wet treated white garment in direct bright sunlight for 2 hours; the yellow stain literally vanishes into thin air.",
            "Wash Normally: Wash the garment in a regular bucket or cycle to remove all soap residues."
        ],
        "example": {
            "title": "Zain's Vanishing Curry Stain",
            "scenario": "Zain applies targeted stain chemistry.",
            "steps": [
                "Blots excess gravy with napkin (no rubbing).",
                "Applies 2 drops of concentrated dishwashing liquid to break the ghee/oil bond.",
                "Rinses with cold tap water after 15 minutes.",
                "Hangs the damp shirt in bright afternoon balcony sunlight.",
                "Curcumin breaks down under solar UV rays: yellow color completely disappears!",
                "Kurta is pristine, white, and completely saved."
            ],
            "takeaway": "Dishwashing liquid dissolves the oil and solar UV light bleaches turmeric naturally without harsh chemicals."
        },
        "mistakes": [
            ("Rubbing fresh stains furiously with a dry cloth or rough napkin.", "Furious rubbing acts like sandpaper, driving dye pigments deep into yarn cores and fraying fibers."),
            ("Ironing or throwing a stained shirt into a hot dryer before verifying the stain is gone.", "High heat acts as a permanent chemical fixative; only iron or dry clothes AFTER the stain is 100% removed.")
        ],
        "checklist": [
            "Did I blot gently rather than scrub or rub?",
            "Did I select the correct solvent (dish soap for oil, alcohol for ink)?",
            "Did I rinse from the reverse side with cool water?",
            "Did I verify the stain is completely gone before ironing or heat drying?",
            "Did I use direct sunlight for stubborn yellow turmeric spots?"
        ],
        "prompt": "Why does dishwashing liquid work 10 times better on food oil stains than regular laundry powder?",
        "takeaway": "Blot, dissolve, sun-bleach: matching stain chemistry to the right cleaner keeps your clothes spotless for years.",
        "vis1": {"title": "The Stain Chemistry Decoder", "caption": "Curry/Oil -> Dish Soap + Sun | Ink/Marker -> Rubbing Alcohol | Mud/Dirt -> Let dry, brush off, cold wash | Blood -> Pure Cold Water only!"},
        "vis2": {"title": "Blotting vs Scrubbing", "caption": "Scrubbing: Drives dye into fiber core + spreads circle. Blotting: Transfers pigment outward onto paper towel!"},
        "act": {
            "title": "The Master Stain Removal Experiment",
            "obj": "Pre-treat and remove an intentional test curry drop and ink mark on a scrap cotton cloth using targeted chemistry.",
            "steps": [
                "Place 1 drop of curry and 1 ballpoint pen mark on white cotton scrap cloth.",
                "Apply dish soap to curry; apply sanitizer to ink mark.",
                "Blot with paper towels and rinse with cold water.",
                "Place damp cloth in balcony sunlight for 2 hours.",
                "Document before and after removal results."
            ],
            "output": "A before-and-after photo comparison of the successfully treated cotton fabric swatch."
        },
        "guided": {
            "context": "You get a streak of black bicycle grease on your school uniform trousers from adjusting a dropped chain.",
            "optimal": "Apply concentrated dishwashing liquid or eucalyptus oil directly to the dry grease spot, massage gently with thumbs to break the petroleum bonds, let sit 20 minutes, then flush with warm soapy water.",
            "opt_reason": "Dish soap surfactants emulsify petroleum grease, lifting heavy carbon particles from synthetic/cotton blends.",
            "non1": "Throw the pants directly into cold water with no soap.",
            "non1_reason": "Water repels grease and permanently sets the black carbon into the weave.",
            "non2": "Use scissors to cut the stained section out of your trousers.",
            "non2_reason": "Destroys uniform trousers completely.",
            "takeaway": "Emulsify heavy petroleum grease with dish soap surfactants before introducing water."
        },
        "indep": {
            "context": "Why does hot water turn fresh blood stains into permanent rust-brown marks on white clothes?",
            "prompt": "Explain hemoglobin protein denaturation and thermal coagulation in fabric fibers.",
            "rubric": "Explained heat cooks hemoglobin proteins, coagulating them firmly into fiber pores; cold water dissolves uncoagulated protein."
        },
        "quiz": {
            "q": "Why is hanging a freshly pre-treated, damp white garment in bright sunlight so remarkably effective for yellow turmeric curry stains?",
            "opt_correct": "Solar ultraviolet (UV) radiation naturally photobleaches and breaks the molecular chemical bonds of curcumin, turning it colorless.",
            "opt_w1": "Because sunlight paints white paint over the clothes.",
            "opt_w2": "Because the heat makes the turmeric fly away into the sky.",
            "opt_w3": "Because curry is allergic to daylight."
        },
        "rubric": {
            "task": "Demonstrate stain chemistry identification, blotting technique, targeted pre-treatment, and solar photobleaching.",
            "mastery": "Matches chemical solvents to stain profiles flawlessly, enforces blotting mechanics, harnesses solar UV photobleaching, avoids thermal heat fixation.",
            "c1": "Stain Taxonomy & Chemical Solvent Selection",
            "c2": "Blotting Mechanics & Mechanical Preservation",
            "c3": "Photobleaching & Thermal Fixation Prevention"
        },
        "refs": [
            "What is a surfactant molecule and how does its hydrophobic tail bind to grease while its hydrophilic head binds to water?",
            "Why are oxygen bleaches (sodium percarbonate) safer for colored fabrics than chlorine bleaches (sodium hypochlorite)?",
            "How does dry cleaning work without water using liquid solvents like perchloroethylene (perc)?",
            "What common household kitchen ingredients (vinegar, baking soda, lemon juice) can be used as eco-friendly stain removers?"
        ]
    }
]

print(f"Months 8 authored successfully ({len(months_8_to_12)} modules).")
