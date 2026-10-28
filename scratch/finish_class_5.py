# scratch/finish_class_5.py
import sys
import json
import os

sys.path.insert(0, os.path.abspath("scratch"))
from test_dict_mod import create_module
import build_class_5_complete as b5

raw_topics = list(b5.raw_topics)
print(f"Loaded {len(raw_topics)} topics from build_class_5_complete.")

months_8_to_12 = [
    # MONTH 8: Nutrition, Hydration & Kitchen Safety
    {
        "month": 8, "theme": "Daily Nutrition, Hydration & Safe Kitchen Preparation", "seq": 1,
        "cat": "life_safety_health", "cat_label": "Safety, Health & Well-being",
        "title": "The 5-Color Plate: Balancing Daily Meals with Fruits and Vegetables",
        "why": "Eating only beige foods like bread, rice, and fried snacks leads to sluggish digestion, low immunity, and afternoon fatigue. A 5-color plate ensures your body receives essential micronutrients naturally.",
        "objs": ["Identify the 5 color groups: red, green, orange/yellow, purple/blue, and white", "Assess your lunch and dinner plates to ensure at least 3 distinct natural colors are present", "Choose fresh whole fruits and raw salads over packaged vitamin gummies", "Explain how fiber from vegetables supports long-lasting brain energy"],
        "scenario": "Pooja only ate white bread with butter and plain noodles for three days straight. Soon, her lips became chapped, she felt sleepy during sports, and she caught a cold.",
        "expl": "Nature color-codes our vitamins! Red tomatoes provide heart antioxidants, green spinach provides iron, orange carrots give sharp eyesight, and purple berries protect brain cells. Making your plate colorful is the easiest way to guarantee top-tier athletic and learning stamina.",
        "steps": [
            "Look down at your lunch or dinner plate before taking the first bite.",
            "Count how many distinct colors of whole plant foods are visible.",
            "If the plate is only brown or white, ask for a bowl of cucumber coins, carrot sticks, or chopped spinach sabzi.",
            "Aim for half the plate to be filled with colorful vegetables and raw salad.",
            "Celebrate eating the rainbow every day by logging your colors in your wellness journal."
        ],
        "example": {
            "title": "Pooja's Rainbow Lunch",
            "scenario": "Pooja upgrades her school lunchbox.",
            "steps": [
                "Includes 2 rotis (brown) with homemade dal (yellow).",
                "Adds steamed spinach paneer (green).",
                "Adds sliced carrot rounds (orange) and cherry tomatoes (red).",
                "Enjoys high energy during her afternoon football match."
            ],
            "takeaway": "Adding three colors of vegetables to your lunch keeps you alert and energized through afternoon sports."
        },
        "mistakes": [
            ("Thinking artificial food colors in candy count as eating colors.", "Only natural pigments in fresh fruits and vegetables provide vitamins and dietary fiber."),
            ("Refusing all vegetables without trying a single crunchy bite.", "Try raw crunchy sticks with a curd dip if cooked curries feel too soft.")
        ],
        "checklist": [
            "Are there at least 3 distinct natural colors on my plate?",
            "Is at least one-third of the meal composed of raw vegetables or salad?",
            "Did I choose fresh fruit instead of an artificial sugary dessert?",
            "Did I wash my hands thoroughly before eating?"
        ],
        "prompt": "Which natural color is easiest for you to add to your everyday dinner?",
        "takeaway": "Eat the rainbow: colorful plates build strong immunity and clear, energetic minds.",
        "vis1": {"title": "The 5-Color Rainbow Chart", "caption": "Red (Heart), Green (Iron & Energy), Orange (Vision), Purple (Brain), White (Immunity)."},
        "vis2": {"title": "The Half-Plate Rule", "caption": "50% colorful vegetables & fruits, 25% whole grains, 25% healthy protein."},
        "act": {
            "title": "3-Day Rainbow Meal Tracker",
            "obj": "Log the colors of vegetables and fruits eaten across breakfast, lunch, and dinner for 3 days.",
            "steps": [
                "Draw a grid with columns for Red, Green, Orange/Yellow, Purple, and White.",
                "Tick off every color eaten during each meal.",
                "Calculate total colors consumed each day (target: at least 4 per day).",
                "Review findings with a parent or caregiver."
            ],
            "output": "A completed 3-Day Rainbow Tracker showing variety across meals."
        },
        "guided": {
            "context": "At a wedding buffet, you see hot samosas, chips, a fresh cucumber-beetroot salad counter, and paneer tikka.",
            "optimal": "Fill half your plate with crunchy cucumber and beetroot slices, take one samosa, and add paneer tikka for protein.",
            "opt_reason": "Balances festive treats with refreshing fiber and steady nutrition.",
            "non1": "Eat six samosas and two bowls of fried crisps with no vegetables.",
            "non1_reason": "Causes severe stomach upset, lethargy, and dehydration.",
            "non2": "Refuse to eat anything at all.",
            "non2_reason": "Leaves you hungry and irritable during a family celebration.",
            "takeaway": "Enjoy festive occasions by anchoring your plate with colorful fresh vegetables first."
        },
        "indep": {
            "context": "Your family is cooking khichdi for dinner on a rainy evening.",
            "prompt": "Suggest 3 colorful chopped vegetables you can ask to add into the pot to turn it into a 5-color meal.",
            "rubric": "Suggested green peas/spinach, orange carrots, and yellow turmeric/tomatoes with clear rationale."
        },
        "quiz": {
            "q": "Why is eating a variety of naturally colored fruits and vegetables better than relying only on grain carbs?",
            "opt_correct": "Different colors contain distinct antioxidants, vitamins, and fiber that strengthen immunity and prevent fatigue.",
            "opt_w1": "Because colored vegetables make food look pretty on social media.",
            "opt_w2": "Because white foods are poisonous.",
            "opt_w3": "Because doctors only recommend eating carrots."
        },
        "rubric": {
            "task": "Evaluate daily meal choices and assemble a balanced 5-color plate.",
            "mastery": "Identifies 5 color groups, builds balanced meals, understands fiber benefits, demonstrates self-directed choice.",
            "c1": "Color Diversity Awareness",
            "c2": "Plate Composition Balance",
            "c3": "Nutritional Decision-Making"
        },
        "refs": [
            "What is your favorite green leafy vegetable?",
            "How does your energy feel after eating a fresh fruit snack compared to a candy bar?",
            "What is one vegetable you disliked in the past that you are willing to taste again?",
            "How can you help prepare a colorful salad for tonight's dinner?"
        ]
    },
    {
        "month": 8, "theme": "Daily Nutrition, Hydration & Safe Kitchen Preparation", "seq": 2,
        "cat": "life_safety_health", "cat_label": "Safety, Health & Well-being",
        "title": "Daily Hydration Habits: Tracking Water Intake and Bottle Care",
        "why": "Even mild dehydration triggers afternoon headaches, loss of concentration, and sudden muscle cramps during physical play. Developing an automatic hydration routine keeps your brain sharp and body energized.",
        "objs": ["Calculate your daily water requirement (typically 6-8 glasses or 1.5 to 2 litres for Class 5)", "Establish 4 hydration anchor checkpoints throughout the school day", "Wash, sanitize, and refill your reusable water bottle independently every evening", "Recognize signs of mild dehydration before thirst becomes severe"],
        "scenario": "Aman forgot his water bottle at home. By 1:00 PM, his throat felt parched, he had a throbbing temple headache, and he could barely solve simple math word problems.",
        "expl": "Your brain is almost 75% water! When water drops, brain tissue literally shrinks slightly, causing headaches and brain fog. Drinking clean water regularly is the simplest, zero-cost intelligence booster you have.",
        "steps": [
            "Drink one glass of room-temperature water immediately upon waking up.",
            "Carry a clean 750ml or 1-litre reusable steel bottle to school daily.",
            "Drink half your bottle by mid-morning recess and finish the bottle by the end of lunch.",
            "Refill the bottle before after-school sports or the bus ride home.",
            "Wash the bottle cap and nozzle with warm soapy water every evening to prevent mold."
        ],
        "example": {
            "title": "Aman's Hydration Anchors",
            "scenario": "Aman establishes fixed hydration triggers.",
            "steps": [
                "Glass 1: Wake up beside bed.",
                "Glass 2 & 3: School recess at 10:30 AM.",
                "Glass 4 & 5: School lunch at 1:00 PM.",
                "Glass 6: Post-cricket playtime at 5:30 PM.",
                "Headaches completely vanish within two days."
            ],
            "takeaway": "Tying water intake to existing daily habits prevents dehydration headaches effortlessly."
        },
        "mistakes": [
            ("Waiting until your mouth feels like sandpaper before drinking.", "Thirst is a late signal; sip water periodically throughout the morning."),
            ("Leaving a damp water bottle unwashed inside a school bag for a week.", "Bacteria and black mold thrive in damp bottle caps; scrub and air-dry daily.")
        ],
        "checklist": [
            "Did I drink a glass of water upon waking?",
            "Is my school bottle cleaned and filled with safe drinking water?",
            "Did I finish at least one full refill during school hours?",
            "Is the bottle cap washed and drying on the dish rack tonight?"
        ],
        "prompt": "How does drinking a glass of water when you feel sleepy during study hours affect your focus?",
        "takeaway": "Water fuels the brain: anchor your sips to your daily routine to stay sharp and energized.",
        "vis1": {"title": "The 4 Daily Water Anchors", "caption": "Wake up (1 glass), Morning Recess (2 glasses), Lunch (2 glasses), Playtime (2 glasses)."},
        "vis2": {"title": "The Bottle Hygiene Guide", "caption": "Disassemble nozzle, scrub with bottle brush and soap, air-dry completely upside down."},
        "act": {
            "title": "5-Day Water Band Challenge",
            "obj": "Place 4 rubber bands on your water bottle; remove one band each time you finish a 250ml portion.",
            "steps": [
                "Wrap 4 clean colored rubber bands around your school water bottle.",
                "Every time you drink down to a band line, slide that band down to the base.",
                "Aim to move all 4 bands before the end of the school day.",
                "Record completion in your daily study log."
            ],
            "output": "A 5-day tracker showing all 4 water bands completed each school day."
        },
        "guided": {
            "context": "During lunch, a classmate offers you a sugary carbonated soda instead of finishing your water bottle.",
            "optimal": "Politely say: 'Thanks, but I drink water during lunch so I have stamina for football practice.'",
            "opt_reason": "Water hydrates cells efficiently without the sugar spike and crash of soda.",
            "non1": "Drink two cans of cold fizzy soda and throw away your water.",
            "non1_reason": "Causes dehydration, tooth erosion, and sudden sluggishness.",
            "non2": "Dump your water on the playground grass to make your bottle lighter.",
            "non2_reason": "Wastes precious drinking water and leaves you dehydrated later.",
            "takeaway": "Choose clean water as your primary daily fuel over sugary commercial drinks."
        },
        "indep": {
            "context": "You are going on a 4-hour school field trip to an outdoor botanical garden on a warm morning.",
            "prompt": "Plan your hydration preparation the evening before and the morning of the trip.",
            "rubric": "Mentioned freezing half a bottle or carrying 1L insulated bottle, drinking before departing, and pacing sips."
        },
        "quiz": {
            "q": "What is the best way to ensure you drink enough water throughout a busy school day?",
            "opt_correct": "Anchor water intake to specific routine events, like recess, lunch, and returning from play.",
            "opt_w1": "Gulp down two litres of water right before going to sleep.",
            "opt_w2": "Drink only sweet carbonated cold drinks whenever you feel thirsty.",
            "opt_w3": "Wait until your throat is completely dry before looking for water."
        },
        "rubric": {
            "task": "Maintain a daily hydration routine and demonstrate independent water bottle sanitization.",
            "mastery": "Meets 1.5-2L daily target, articulates hydration checkpoints, scrubs bottle independently, monitors urine clarity.",
            "c1": "Hydration Consistency",
            "c2": "Bottle Hygiene & Care",
            "c3": "Physical Self-Awareness"
        },
        "refs": [
            "How many glasses of water did you drink yesterday?",
            "Why do commercial soda drinks make you feel thirstier a few minutes after drinking them?",
            "What does clear or pale yellow urine tell you about your hydration level?",
            "How can you remind your family members to hydrate during hot weather?"
        ]
    },
    {
        "month": 8, "theme": "Daily Nutrition, Hydration & Safe Kitchen Preparation", "seq": 3,
        "cat": "life_independence", "cat_label": "Personal Independence & Daily Living",
        "title": "Safe Fruit Washing, Peeling & Slicing with a Round-Tipped Butter Knife",
        "why": "Relying on adults to wash, peel, and cut every snack leaves you helpless when hungry. Learning basic knife safety and fruit preparation builds kitchen confidence and lifelong independence.",
        "objs": ["Wash whole fruits thoroughly under cool running tap water to remove surface dirt and residue", "Peel bananas, oranges, and soft-skinned fruits neatly using your fingers", "Demonstrate the 'Bear Claw' grip to safely slice soft fruits with a round-tipped table knife", "Wipe the cutting board and return utensils to the sink immediately after prep"],
        "scenario": "Kunal wanted an apple and banana snack at 4:30 PM while his mother was on a work phone call. Instead of waiting for an hour, he prepared a neat fruit plate safely by himself.",
        "expl": "Chefs around the world use one golden safety rule: the 'Bear Claw'! By curling your fingertips inward like a bear holding a ball, the flat side of the round knife blade rests against your knuckles, making accidental finger cuts impossible.",
        "steps": [
            "Wash hands with soap for 20 seconds before touching cutting boards or food.",
            "Rinse apples, cucumbers, or guavas thoroughly under cold running water.",
            "Place a damp cloth under your cutting board so it does not slip on the counter.",
            "Form a 'Bear Claw' with your non-knife hand, curling your fingertips safely tucked inward.",
            "Use a round-tipped butter knife with gentle sawing motions to slice bananas or cucumbers into neat discs."
        ],
        "example": {
            "title": "Kunal's Safe Fruit Platter",
            "scenario": "Kunal prepares an after-school snack.",
            "steps": [
                "Washes a crisp apple and peels a ripe banana.",
                "Places non-slip mat under wooden chopping board.",
                "Holds butter knife with dominant hand and curls left fingers into a bear claw.",
                "Slices banana into uniform coins and plates them neatly.",
                "Wipes cutting board and rinses knife at the sink."
            ],
            "takeaway": "Using the Bear Claw grip and a round-tipped knife makes healthy snack preparation safe and independent."
        },
        "mistakes": [
            ("Using a sharp serrated meat knife or chef's knife without direct adult supervision.", "In Class 5, always use a round-tipped butter or table knife for soft fruits."),
            ("Holding fingers flat and straight next to the cutting blade.", "Always tuck fingertips under in the Bear Claw position to protect fingertips completely.")
        ],
        "checklist": [
            "Did I wash my hands with soap before touching the fruit?",
            "Is the cutting board resting firmly without sliding on the table?",
            "Am I using a safe, round-tipped butter knife?",
            "Are my fingertips curled in the protective Bear Claw grip?"
        ],
        "prompt": "How did it feel to prepare and plate your own healthy fruit snack without asking for help?",
        "takeaway": "Respect kitchen tools: curl your fingers like a bear claw and prepare snacks with calm confidence.",
        "vis1": {"title": "The Bear Claw Grip", "caption": "Fingertips tucked under like claws, thumb behind, blade gliding against knuckle."},
        "vis2": {"title": "The Non-Slip Board Setup", "caption": "Place a damp cloth or silicone mat underneath cutting board to prevent slips."},
        "act": {
            "title": "The Independent Fruit Salad Platter",
            "obj": "Safely prepare a 2-fruit snack plate using a round-tipped knife under adult observation.",
            "steps": [
                "Select a banana and a soft pear or cucumber.",
                "Wash produce and set up stable cutting board with damp towel underneath.",
                "Demonstrate the Bear Claw grip to an observing adult.",
                "Slice produce into neat discs, arrange on plate, and sprinkle light chaat masala.",
                "Wash knife and wipe counter completely."
            ],
            "output": "A photograph or adult verification of the safely prepared fruit platter and clean station."
        },
        "guided": {
            "context": "You want to slice a hard raw carrot, but your butter knife cannot cut through it easily.",
            "optimal": "Stop immediately, keep the knife down, and ask an adult to help slice the hard carrot into thin manageable batons.",
            "opt_reason": "Forcing a dull knife against hard food causes it to slip dangerously.",
            "non1": "Press your entire body weight onto the knife with two hands.",
            "non1_reason": "The knife can slip violently and injure fingers.",
            "non2": "Search through kitchen drawers for a giant sharp meat cleaver.",
            "non2_reason": "Extremely unsafe without formal training and direct adult supervision.",
            "takeaway": "Never force a knife against stubborn food; switch to soft foods or request adult assistance."
        },
        "indep": {
            "context": "Your younger sibling asks you to cut an apple for them while parents are outside.",
            "prompt": "Explain how you will safely handle this request using round-tipped tools.",
            "rubric": "Explained using butter knife for soft sections or offering peeled banana/orange segments instead."
        },
        "quiz": {
            "q": "What is the 'Bear Claw' technique in kitchen food preparation?",
            "opt_correct": "Curling your non-knife fingertips inward so the knife blade rests against knuckles, protecting fingertips.",
            "opt_w1": "Scratching the table like an angry animal.",
            "opt_w2": "Holding the knife with both hands and pressing down hard.",
            "opt_w3": "Cutting fruit in mid-air without using any board."
        },
        "rubric": {
            "task": "Demonstrate safe fruit washing, peeling, Bear Claw slicing, and kitchen clean-up.",
            "mastery": "Demonstrates strict hand hygiene, non-slip board setup, flawless Bear Claw grip, thorough post-prep sanitization.",
            "c1": "Hygiene & Prep Sanitation",
            "c2": "Knife Handling & Finger Safety",
            "c3": "Workstation Clean-up"
        },
        "refs": [
            "What soft fruit is your favorite to slice independently?",
            "Why should cutting boards always have a damp cloth underneath them?",
            "How does preparing your own snacks help your parents when they are busy?",
            "What should you always do immediately after finishing with a knife?"
        ]
    },

    # MONTH 9: Teamwork, Conflict Resolution & Fabric Care
    {
        "month": 9, "theme": "Sportsmanship, Constructive Conflict & Fabric Care", "seq": 1,
        "cat": "life_social_teamwork", "cat_label": "Social Skills, Empathy & Teamwork",
        "title": "Encouraging Teammates and Handling Defeat with Grace",
        "why": "Getting angry, blaming teammates, or sulking after losing damages friendships and ruins the joy of sports. True champions show dignity in defeat and lift their teammates up through mistakes.",
        "objs": ["Identify the difference between a sore loser and a gracious sportsman", "Use the 5-second silence rule when feeling frustrated after a referee call or missed goal", "Deliver genuine praise to an opponent who played well", "Encourage a teammate who made an error with a high-five and positive reinforcement"],
        "scenario": "During an inter-house football match, Kabir's team lost 2-1 after his teammate Aryan accidentally missed an easy pass. Kabir felt furious and wanted to scream at Aryan.",
        "expl": "In sports and life, games are won and lost as a team, never as one person. When you cheer a teammate who made an error, you rebuild their confidence to win the next match. How you behave after losing shows your true strength of character.",
        "steps": [
            "Take three deep breaths through your nose the second the final whistle blows.",
            "Walk up to your teammate who made a mistake, offer a high-five, and say: 'Tough break, we fought hard together!'",
            "Line up with your team to shake hands with opponents and thank the referee.",
            "Refrain from blaming the weather, pitch, or referee decisions for the loss.",
            "Discuss one specific skill the team can practice in the next practice session."
        ],
        "example": {
            "title": "Kabir's Sporting Spirit",
            "scenario": "Kabir leads after a tough match.",
            "steps": [
                "Swallows his initial disappointment and claps for the opponents.",
                "Pats Aryan on the back: 'We win together, we lose together. Great effort today.'",
                "Congratulates the opposing captain with a sincere handshake.",
                "His coach notices and names Kabir team vice-captain for leadership."
            ],
            "takeaway": "True leadership is proven when you support your teammates after a tough loss."
        },
        "mistakes": [
            ("Kicking water bottles, throwing equipment, or crying angrily after losing.", "Show emotional maturity; accept the result with your head held high."),
            ("Publicly blaming one player in front of classmates for the loss.", "Singling out friends creates deep embarrassment and ruins team trust.")
        ],
        "checklist": [
            "Did I shake hands with opponents and referee?",
            "Did I avoid blaming any single teammate?",
            "Did I offer words of encouragement to someone feeling down?",
            "Did I focus on what we can improve in next practice?"
        ],
        "prompt": "Think of a time someone encouraged you when you made a mistake. How did their words help you?",
        "takeaway": "Win with modesty, lose with dignity: great teammates lift each other up through every outcome.",
        "vis1": {"title": "The Champion's Handshake", "caption": "Look into opponent's eyes, firm grip, sincere 'Good game!'."},
        "vis2": {"title": "Blame vs Growth Mindset in Sports", "caption": "Blame: 'You lost us the match!' vs Growth: 'Tough luck, let's practice that pass together on Friday!'"},
        "act": {
            "title": "The Post-Game Sportsmanship Pledge",
            "obj": "Write and practice 3 specific encouragement scripts to use during after-school games.",
            "steps": [
                "Write an encouragement script for a teammate who dropped a catch.",
                "Write a congratulatory script for an opponent who scored a goal.",
                "Write a self-talk script for when you miss a shot yourself.",
                "Role-play all three scripts with a sibling or classmate."
            ],
            "output": "A signed Sportsmanship Pledge card kept inside your sports kit bag."
        },
        "guided": {
            "context": "Your team loses the inter-class relay race because the baton was dropped on the third changeover.",
            "optimal": "Walk over to the runner who dropped it, give them a shoulder pat, and say: 'Baton changes are tricky at full speed. We'll drill them next week!'",
            "opt_reason": "Restores team morale and focuses on constructive practice rather than humiliation.",
            "non1": "Point at them and shout: 'You ruined everything for our entire class!'",
            "non1_reason": "Causes emotional trauma and breaks team unity.",
            "non2": "Storm off the field and refuse to talk to anyone for the rest of the day.",
            "non2_reason": "Displays immature sportsmanship.",
            "takeaway": "Teams that support each other through mistakes improve faster than teams that blame."
        },
        "indep": {
            "context": "You won the school spelling bee and your best friend came in second place and looks tearful.",
            "prompt": "How will you celebrate your victory while showing deep empathy and respect for your friend?",
            "rubric": "Avoided gloating, hugged friend privately, acknowledged their hard work, shared the celebration."
        },
        "quiz": {
            "q": "What is the hallmark of a true sportsman when their team loses an important match?",
            "opt_correct": "Congratulating the winning team sincerely and encouraging teammates who gave their best effort.",
            "opt_w1": "Arguing with the referee until they change their score.",
            "opt_w2": "Throwing your bat or racket across the court in anger.",
            "opt_w3": "Refusing to shake hands and walking away silently."
        },
        "rubric": {
            "task": "Demonstrate exemplary sportsmanship, peer encouragement, and graceful response to defeat.",
            "mastery": "Maintains emotional composure, uses constructive peer encouragement, acknowledges opponents, models team unity.",
            "c1": "Emotional Self-Regulation",
            "c2": "Peer Support & Encouragement",
            "c3": "Opponent & Official Respect"
        },
        "refs": [
            "Why is it harder to be gracious when you lose than when you win?",
            "How do professional athletes handle losing major championship finals?",
            "What can you say to yourself in your head when you feel disappointed by a sports result?",
            "How does supporting your teammates make you a more trusted friend?"
        ]
    },
    {
        "month": 9, "theme": "Sportsmanship, Constructive Conflict & Fabric Care", "seq": 2,
        "cat": "life_social_teamwork", "cat_label": "Social Skills, Empathy & Teamwork",
        "title": "Disagreeing Respectfully Without Hurtful Words or Shouting",
        "why": "Disagreements are natural when people collaborate, but shouting, insults, or name-calling destroy relationships. Learning to state your opinion calmly while respecting others resolves disputes constructively.",
        "objs": ["Distinguish between attacking an idea versus attacking a person's character", "Use the 'I feel... because... what if we...' formula during a disagreement", "Listen to another person's counter-argument for 30 seconds without interrupting", "Identify win-win compromises where both sides give up a little to gain agreement"],
        "scenario": "Riya and Meera were assigned to design a science chart on Space. Riya wanted to paint black planets, Meera wanted bright neon colors. Within minutes, both were shouting and calling each other's ideas 'stupid'.",
        "expl": "Great minds do not always think alike! Disagreements are not fights to be won; they are puzzles to be solved together. When you attack someone's idea with logic rather than attacking their character with insults, people listen to you with respect.",
        "steps": [
            "Lower your voice tone and volume when you feel yourself getting excited or angry.",
            "Acknowledge the other person's thought first: 'I see what you mean about bright colors catching attention.'",
            "State your perspective using 'I': 'I feel that a dark background makes stars and planets look more realistic.'",
            "Propose a bridge compromise: 'What if we use a dark deep blue background and paint neon glowing rings around Saturn?'",
            "Confirm mutual agreement with a high-five before starting work."
        ],
        "example": {
            "title": "Riya & Meera's Galaxy Chart",
            "scenario": "Riya uses the respectful disagreement formula.",
            "steps": [
                "Pauses before shouting back.",
                "Says: 'Meera, your neon idea is super creative. How about neon planets on a deep navy background?'",
                "Meera smiles: 'That will look like a glowing galaxy!'",
                "Their project wins the class award for best collaborative design."
            ],
            "takeaway": "Combining two different viewpoints often creates a result better than either original idea."
        },
        "mistakes": [
            ("Using generalizations like 'You always ruin everything' or 'Your ideas are dumb'.", "Focus strictly on the specific task; never insult a friend's personality."),
            ("Interrupting the other person while they are explaining their thought.", "Let them complete their thought fully before offering your alternative suggestion.")
        ],
        "checklist": [
            "Did I keep my speaking voice calm and measured?",
            "Did I avoid insulting words or sarcasm?",
            "Did I listen without cutting in?",
            "Did I propose a compromise that considers both preferences?"
        ],
        "prompt": "How does speaking in a calm voice change the mood when a group discussion gets heated?",
        "takeaway": "Attack the problem, not the person: calm words turn arguments into brilliant collaborative solutions.",
        "vis1": {"title": "The Respectful Disagreement Formula", "caption": "'I understand [their point], I feel [my reason], what if we try [compromise]?'"},
        "vis2": {"title": "Idea vs Person Attack", "caption": "Red Light: 'You are so stubborn!' vs Green Light: 'I see that differently because of...'"},
        "act": {
            "title": "The Compromise Bridge Exercise",
            "obj": "Practice finding win-win compromises for 3 everyday school or family disagreement scenarios.",
            "steps": [
                "Scenario A: Which game to play during a 30-minute recess (Football vs Tag).",
                "Scenario B: What movie to watch with family on Friday night.",
                "Draft a compromise solution for each where both parties get part of their wish.",
                "Test one compromise in real life during this week's playtime."
            ],
            "output": "A written Compromise Bridge worksheet with 3 resolved scenarios."
        },
        "guided": {
            "context": "During a group presentation prep, a classmate insists on writing all the slides in yellow text, which is nearly unreadable.",
            "optimal": "Calmly say: 'Yellow is a cheerful color, but when projected on a white wall, the back row won't be able to read it. What if we use dark blue text with yellow highlights?'",
            "opt_reason": "Explains the practical visual problem objectively and offers a stylish compromise.",
            "non1": "Laugh loudly and say: 'Are you blind? Yellow looks ridiculous!'",
            "non1_reason": "Humiliates the classmate and creates stubborn defensiveness.",
            "non2": "Stay silent, let them do it, and blame them when the teacher gives a poor grade.",
            "non2_reason": "Passive-aggressive and harms the entire team.",
            "takeaway": "Address functional challenges with objective logic and creative alternatives."
        },
        "indep": {
            "context": "You and your cousin both want to use the family tablet at 5:00 PM for different activities (drawing vs homework).",
            "prompt": "Write a 3-sentence script negotiating a fair, respectful time-sharing plan.",
            "rubric": "Prioritized homework first, offered equal drawing time afterward, maintained respectful tone."
        },
        "quiz": {
            "q": "What is the most effective approach when you disagree with a teammate's creative suggestion?",
            "opt_correct": "Acknowledge their idea respectfully, explain your reasoning calmly, and propose a collaborative compromise.",
            "opt_w1": "Shout louder than them so they get intimidated into agreeing with you.",
            "opt_w2": "Refuse to speak to them for the rest of the week.",
            "opt_w3": "Tell the teacher that your teammate is being foolish."
        },
        "rubric": {
            "task": "Demonstrate constructive disagreement, active listening, and compromise negotiation.",
            "mastery": "Uses 'I' statements, listens without interrupting, refrains from personal insults, crafts mutually satisfying compromises.",
            "c1": "Respectful Phrasing & Tone",
            "c2": "Active Listening Discipline",
            "c3": "Win-Win Compromise Formulation"
        },
        "refs": [
            "Why do people sometimes get angry when someone disagrees with their idea?",
            "How does learning to compromise at home help you in the school classroom?",
            "What can you do if the other person keeps shouting even when you stay calm?",
            "Can you think of a historical example where two people with different ideas built something great together?"
        ]
    },
    {
        "month": 9, "theme": "Sportsmanship, Constructive Conflict & Fabric Care", "seq": 3,
        "cat": "life_independence", "cat_label": "Personal Independence & Daily Living",
        "title": "Safe Fabric Pressing: Ironing Handkerchiefs and Pillowcases Under Supervision",
        "why": "Wearing crumpled clothes looks messy, but electric irons reach 200°C and carry serious burn hazards. Learning safe iron handling, temperature settings, and flat-pressing techniques builds practical domestic capability.",
        "objs": ["Identify the 3 critical iron safety rules: upright rest position, dry hands, and never touching the soleplate", "Select appropriate temperature settings: low for synthetics, medium-high for cotton", "Dampen and press a cotton handkerchief flat from center outward to edges", "Unplug by gripping the wall plug head firmly, never yanking the electrical cord"],
        "scenario": "Dhruv wanted crisp handkerchiefs for school inspection. His father set up the iron and taught him how to press them flat safely without touching hot metal.",
        "expl": "An iron uses heat, weight, and moisture to relax wrinkled fabric fibers. The metal bottom (soleplate) gets as hot as an oven! Treating the iron with strict respect—always parking it upright like a rocket on its heel—guarantees safe, crisp results every time.",
        "steps": [
            "Ensure the ironing board is set up firmly with zero wobble and the cord is not a tripping hazard.",
            "Check that your hands and feet are completely dry before plugging in the iron.",
            "Turn the dial to 'Cotton' and place the iron upright on its heel while it heats.",
            "Lay the cotton handkerchief completely flat; smooth wrinkles with your dry hands before bringing the iron down.",
            "Grip the handle firmly, press gently, and glide the iron smoothly from the center outward to the corners.",
            "Park the iron upright, turn dial to 'Off', and ask an adult to help safely unplug the wall socket."
        ],
        "example": {
            "title": "Dhruv's Crisp Handkerchief",
            "scenario": "Dhruv irons his school items under his father's eye.",
            "steps": [
                "Sets iron upright on its heel.",
                "Smooths out white cotton hanky on the padded board.",
                "Glides iron in gentle sweeps, never leaving it stationary on fabric.",
                "Folds neatly into fourths and gives one final light press on the fold.",
                "Unplugs safely and lets iron cool for 20 minutes."
            ],
            "takeaway": "Gliding from center to edges while parking the iron upright keeps both fabric and hands safe."
        },
        "mistakes": [
            ("Leaving a hot iron face down resting flat on the ironing board cloth.", "A flat hot iron will scorch or catch fire within 15 seconds; always park it upright on its heel."),
            ("Touching the metal base with a finger to check if it has warmed up.", "Never touch the soleplate; hover your hand 5 inches away to feel rising warmth safely.")
        ],
        "checklist": [
            "Is the iron parked upright on its heel when not actively gliding?",
            "Are my hands completely dry before touching the plug?",
            "Am I keeping the iron moving constantly without pausing on fabric?",
            "Did I turn the heat dial off before unplugging?"
        ],
        "prompt": "Why is keeping the iron moving smoothly safer than holding it in one place?",
        "takeaway": "Park it upright, keep it gliding: careful iron safety turns crumpled fabric into crisp confidence.",
        "vis1": {"title": "The Rocket Heel Park", "caption": "Always rest the iron vertically on its heel base, cord clear of the board edge."},
        "vis2": {"title": "The Center-to-Edge Pressing Glide", "caption": "Start from center of fabric, glide outward toward edges in smooth straight sweeps."},
        "act": {
            "title": "The 2-Handkerchief Pressing Practical",
            "obj": "Safely press, fold, and store 2 cotton handkerchiefs under direct adult supervision.",
            "steps": [
                "Set up ironing station with adult guardian present.",
                "Check plug with dry hands and adjust dial to Cotton.",
                "Press handkerchief 1 flat from center to edges.",
                "Fold into a neat square and press fold seam.",
                "Repeat with handkerchief 2, park iron upright, and unplug safely."
            ],
            "output": "Two neatly pressed, folded cotton handkerchiefs inspected by caregiver."
        },
        "guided": {
            "context": "The doorbell rings while you are ironing a pillowcase.",
            "optimal": "Immediately stand the iron upright on its heel, step away from the board, and go to the door only after verifying the iron is safely parked.",
            "opt_reason": "Guarantees no hot surface touches fabric or causes an accidental burn while attention is diverted.",
            "non1": "Leave the iron face down on the pillowcase and run to open the door.",
            "non1_reason": "Will burn a hole right through the fabric and start a fire.",
            "non2": "Carry the hot iron with you to the front door.",
            "non2_reason": "Extremely hazardous; hot metal can cause severe burns if bumped.",
            "takeaway": "Any interruption requires parking the iron upright on its heel immediately."
        },
        "indep": {
            "context": "Your school uniform cotton shirt has wrinkled collars.",
            "prompt": "Describe the step-by-step procedure to press the collar flat without creasing.",
            "rubric": "Unfolded collar flat, pressed underside first from points inward, flipped and pressed front gently."
        },
        "quiz": {
            "q": "What must you ALWAYS do whenever you pause or finish gliding the iron across a piece of fabric?",
            "opt_correct": "Stand the iron upright on its heel base so the hot metal soleplate does not touch the board.",
            "opt_w1": "Leave it resting flat on the fabric to keep it warm.",
            "opt_w2": "Lay it on its side on a wooden chair.",
            "opt_w3": "Splash cold water directly over the hot electrical cord."
        },
        "rubric": {
            "task": "Demonstrate electrical safety, proper iron grip, upright heel parking, and crisp fabric pressing.",
            "mastery": "Follows all safety protocols, demonstrates steady glide technique, parks upright instinctively, unplugs safely.",
            "c1": "Electrical & Thermal Safety",
            "c2": "Pressing & Gliding Technique",
            "c3": "Neat Folding & Workstation Clean-down"
        },
        "refs": [
            "Why do synthetic fabrics require much lower heat settings than cotton?",
            "What should you do if an iron cord looks frayed or has exposed copper wires?",
            "How does wearing neat, pressed clothes make you feel on school presentation days?",
            "Why should children never use an iron without an adult present in the room?"
        ]
    },

    # MONTH 10: Smart Money Decisions & Grocery Math
    {
        "month": 10, "theme": "Smart Purchasing, Unit Pricing & Budget Planning", "seq": 1,
        "cat": "life_money_management", "cat_label": "Money Management & Financial Literacy",
        "title": "Price Comparison: Calculating Best Value per 100 Grams at the Supermarket",
        "why": "Glossy packaging and 'Buy 1 Get 1' banners often trick shoppers into spending more money on less product. Learning unit pricing helps you identify real bargains and save household money.",
        "objs": ["Explain the concept of unit pricing (price per 100g, 1kg, or 100ml)", "Compare two different package sizes of pulses, rice, or cereal to find the real deal", "Identify misleading 'Jumbo Pack' pricing where bigger packages cost more per unit", "Calculate savings on standard grocery shopping trips using simple mental math"],
        "scenario": "Simran went grocery shopping with her grandfather. A 200g jar of jam cost ₹80, while a 'Mega Family' 500g jar cost ₹225. Her grandfather asked: 'Which one is actually cheaper per spoon?'",
        "expl": "Marketers use big bright packaging to make you think bigger is always cheaper. But math never lies! By dividing the total price by the weight, you find the cost per 100 grams. Comparing unit prices turns you into an unbeatable smart consumer.",
        "steps": [
            "Locate the net weight printed near the bottom of both product packages.",
            "Calculate price per 100g: divide price by weight and multiply by 100.",
            "Jar A (200g @ ₹80) = ₹80 / 2 = ₹40 per 100g.",
            "Jar B (500g @ ₹225) = ₹225 / 5 = ₹45 per 100g.",
            "Notice that Jar A is actually ₹5 cheaper per 100g despite being in a smaller jar!",
            "Choose the product that gives maximum quality and quantity for your family's budget."
        ],
        "example": {
            "title": "Simran's Grocery Discovery",
            "scenario": "Simran tests unit pricing on breakfast cereal.",
            "steps": [
                "Pack 1: 250g @ ₹100 = ₹40 per 100g.",
                "Pack 2: 1kg (1000g) @ ₹360 = ₹36 per 100g.",
                "Recognizes the 1kg pack saves ₹4 per 100g (₹40 total savings).",
                "Checks expiry date to ensure family can eat 1kg before it expires.",
                "Saves ₹40 for her grandfather's monthly grocery budget."
            ],
            "takeaway": "Always calculate the price per 100 grams and verify expiry dates before choosing bulk packs."
        },
        "mistakes": [
            ("Assuming big boxes are always cheaper per gram than small boxes.", "Always check the math; sometimes promotional small packs are priced lower per unit."),
            ("Buying massive bulk quantities of perishable food that spoils before being eaten.", "A lower unit price is wasted money if half the food ends up in the garbage bin.")
        ],
        "checklist": [
            "Did I check the net weight printed on both labels?",
            "Did I calculate the price per 100g or 1kg?",
            "Did I check the 'Best Before' expiry date?",
            "Can our family consume this quantity safely before it spoils?"
        ],
        "prompt": "How does doing a quick mental calculation save real rupees for your family over an entire year?",
        "takeaway": "Do the math, beat the marketing: unit pricing reveals the true cost of every grocery purchase.",
        "vis1": {"title": "The Unit Price Formula", "caption": "Total Price ÷ Net Grams × 100 = Price per 100 Grams."},
        "vis2": {"title": "The Bulk Buying Rule", "caption": "Only buy bulk if Unit Price is lower AND food will be eaten before expiry date."},
        "act": {
            "title": "The 3-Product Supermarket Audit",
            "obj": "Compare two sizes of 3 pantry items at home or the local store and record their unit prices.",
            "steps": [
                "Select 3 items (e.g. Atta, Biscuits, Toothpaste).",
                "Record price and weight for Size 1 and Size 2 of each.",
                "Calculate price per 100g or 100ml for both sizes.",
                "Highlight the truly economical choice for each product."
            ],
            "output": "A completed Grocery Unit Price Comparison table."
        },
        "guided": {
            "context": "A brand sells 100g of soap for ₹30. They also offer a 'Super Saver' 3-pack (300g total) for ₹105.",
            "optimal": "Calculate: Three single 100g bars cost 3 × ₹30 = ₹90. The 'Super Saver' costs ₹105! Buy three single bars and save ₹15.",
            "opt_reason": "Exposes deceptive marketing where multipacks actually cost more than individual items.",
            "non1": "Buy the 3-pack immediately because it has the words 'Super Saver' on the label.",
            "non1_reason": "Falls for false advertising and wastes ₹15 unnecessarily.",
            "non2": "Refuse to buy soap at all.",
            "non2_reason": "Illogical reaction to basic price comparison.",
            "takeaway": "Never trust slogans on boxes; trust your own basic multiplication and addition."
        },
        "indep": {
            "context": "Brand X sells 500ml cooking oil for ₹110. Brand Y sells 1 Litre (1000ml) of equal quality for ₹200.",
            "prompt": "Which brand offers better value and how much do you save per litre?",
            "rubric": "Brand X is ₹220/L vs Brand Y at ₹200/L; Brand Y saves ₹20 per litre."
        },
        "quiz": {
            "q": "How do you calculate the unit price per 100 grams of a 400-gram bag of lentils costing ₹80?",
            "opt_correct": "Divide ₹80 by 4 = ₹20 per 100 grams.",
            "opt_w1": "Multiply ₹80 by 400 = ₹32,000.",
            "opt_w2": "Subtract 80 from 400 = ₹320.",
            "opt_w3": "Guess that it costs ₹50."
        },
        "rubric": {
            "task": "Perform unit price calculations, identify marketing traps, and justify smart purchasing choices.",
            "mastery": "Calculates unit rates accurately, checks expiry dates, balances unit savings with spoilage risk, explains math clearly.",
            "c1": "Mathematical Accuracy",
            "c2": "Deceptive Packaging Detection",
            "c3": "Household Budget Application"
        },
        "refs": [
            "Why do brands use bright colors and words like 'Mega' or 'Super Saver'?",
            "What items in your kitchen are bought in large bulk bags?",
            "When might buying a smaller pack be smarter even if its unit price is slightly higher?",
            "How can you help your parents check grocery bills after shopping?"
        ]
    },
    {
        "month": 10, "theme": "Smart Purchasing, Unit Pricing & Budget Planning", "seq": 2,
        "cat": "life_money_management", "cat_label": "Money Management & Financial Literacy",
        "title": "Planning a Simple Family Picnic Budget with a ₹500 Limit",
        "why": "Planning an outing without a clear budget leads to impulsive spending, overspending, and running out of money before the day ends. Setting and sticking to a spending cap teaches resource management.",
        "objs": ["Break a fixed ₹500 budget into 3 realistic categories: food/drink, park entry/activity, and emergency buffer", "Compare homemade sandwiches and snacks versus buying expensive park concession food", "Track actual expenses against the budget estimate in real time", "Reflect on how creative planning creates a memorable day without wasting money"],
        "scenario": "Zoya was given a ₹500 budget by her parents to plan Sunday afternoon snacks and games at the city park for herself and her brother. She had to allocate every rupee carefully.",
        "expl": "A budget is not a restriction; it is a game plan! When you have ₹500, every rupee gives you choices. By packing home-cut watermelon and sandwiches, Zoya saves ₹300, leaving plenty of budget for park boat rides and ice cream.",
        "steps": [
            "Write the total spending ceiling at the top of your planning sheet: ₹500 MAX.",
            "List mandatory expenses first: e.g. Park entry tickets (2 kids @ ₹30 = ₹60).",
            "Set aside an emergency buffer for unexpected needs: ₹50 buffer.",
            "Allocate remaining ₹390: ₹250 for snacks/drinks and ₹140 for rental games/boats.",
            "Decide which snacks can be prepped from home (free) to stretch the snack budget further.",
            "Track receipts during the outing and ensure final spending stays under ₹500."
        ],
        "example": {
            "title": "Zoya's Sunday Park Plan",
            "scenario": "Zoya creates her itemized budget.",
            "steps": [
                "Park entry tickets: ₹60 (₹30 × 2).",
                "Home-packed sandwiches & lemonade: ₹0 (from home pantry).",
                "Pedal boat ride (20 mins): ₹150.",
                "Post-game ice creams: ₹80 (₹40 × 2).",
                "Emergency water bottle purchase: ₹20.",
                "Total spent: ₹310! Leaves ₹190 saved in her family gullak."
            ],
            "takeaway": "Preparing food at home leaves plenty of budget for exciting activities while still saving money."
        },
        "mistakes": [
            ("Spending ₹450 on snacks in the first 20 minutes and having zero rupees left for park rides.", "Spread spending across the entire outing; never blow the whole budget upfront."),
            ("Forgetting an emergency buffer for transport or basic water needs.", "Always reserve 10% of any budget for unexpected needs.")
        ],
        "checklist": [
            "Does the sum of all planned categories equal ₹500 or less?",
            "Is there a dedicated ₹50 emergency buffer included?",
            "Are entry fees and transport tickets accounted for first?",
            "Did I write down each actual purchase on my tally sheet?"
        ],
        "prompt": "How did having a written plan prevent arguments about what snacks or games to buy?",
        "takeaway": "Plan the work, work the plan: a ₹500 budget creates maximum fun when every rupee has a purpose.",
        "vis1": {"title": "The Picnic Budget Pie", "caption": "Entry & Activities (40%), Food & Treats (50%), Emergency Buffer (10%)."},
        "vis2": {"title": "Home Prep vs Concession Stand", "caption": "Park Samosa: ₹50 vs Home Sandwich: ₹12. Save ₹38 per snack by prepping at home!"},
        "act": {
            "title": "The ₹500 Weekend Outing Blueprint",
            "obj": "Design a complete itemized budget for a 3-hour outing with a sibling or friend capped at ₹500.",
            "steps": [
                "Choose destination (neighborhood park, zoo, or community center).",
                "Draft an expense table with 4 columns: Category, Item, Estimated Cost, Actual Cost.",
                "Ensure total estimate is exactly ₹500 or less including ₹50 buffer.",
                "Present the plan to family members for approval."
            ],
            "output": "A complete 1-page Itemized Picnic Budget Plan."
        },
        "guided": {
            "context": "At the park, your brother begs to buy a ₹250 plastic bubble gun that will break in 10 minutes, leaving only ₹10 for food.",
            "optimal": "Remind him: 'Our budget for toys is ₹100. If we spend ₹250 on bubbles, we won't have money for our boat ride or evening kulfi. Let's do the boat ride instead!'",
            "opt_reason": "Redirects from low-value plastic junk to high-value shared experiences.",
            "non1": "Give in and spend ₹250, then cry when there is no money for drinking water.",
            "non1_reason": "Violates budget discipline and compromises health/hydration.",
            "non2": "Scream at him and snatch his pocket money.",
            "non2_reason": "Ruins the family outing with hostility.",
            "takeaway": "Reminding peers of shared fun activities prevents wasteful impulse spending on junk."
        },
        "indep": {
            "context": "You planned ₹100 for bus tickets, but the fare increased to ₹140 on the day of travel.",
            "prompt": "Explain how you will rebalance your remaining budget to stay under the ₹500 limit without running out of money.",
            "rubric": "Deducted ₹40 from luxury snack or toy category or utilized emergency buffer to absorb the cost."
        },
        "quiz": {
            "q": "Why is it essential to include an 'Emergency Buffer' when creating an outing budget?",
            "opt_correct": "To cover unexpected necessary costs like sudden ticket price changes, bandages, or extra water without exceeding the budget.",
            "opt_w1": "So you can buy extra candy at the end.",
            "opt_w2": "Because banks require it by law for kids.",
            "opt_w3": "To hide money from your parents."
        },
        "rubric": {
            "task": "Create, balance, and manage an itemized recreational budget with strict financial limits.",
            "mastery": "Accurately categorizes expenses, includes emergency buffer, demonstrates trade-off decisions, stays strictly within cap.",
            "c1": "Budget Structure & Realism",
            "c2": "Trade-off & Prioritization Reasoning",
            "c3": "Expense Tracking Discipline"
        },
        "refs": [
            "What was the most fun experience you had that cost very little or zero money?",
            "Why do amusement parks charge three times more for bottled water than local grocery shops?",
            "How does packing food from home give you more freedom to do activities?",
            "What would you do with any money left over from your picnic budget?"
        ]
    },
    {
        "month": 10, "theme": "Smart Purchasing, Unit Pricing & Budget Planning", "seq": 3,
        "cat": "life_money_management", "cat_label": "Money Management & Financial Literacy",
        "title": "Understanding Pocket Money: Earning, Budgeting, and Saving in a Gullak",
        "why": "Spending every rupee the moment you receive it leaves you empty-handed when you want something meaningful. Learning to divide money into Spend, Save, and Give builds lifelong wealth habits.",
        "objs": ["Understand the 3-Jar money system: Spend (50%), Save (40%), and Share/Give (10%)", "Differentiate between earned money (doing extra chores) and gifted money (birthdays/festivals)", "Set a specific multi-month savings goal with an illustrated visual progress tracker", "Experience the satisfaction of delayed gratification when buying a wanted item with your own savings"],
        "scenario": "Manish received ₹200 from his aunt for his birthday. He was tempted to buy 20 packets of salty snacks immediately, but he really wanted a ₹600 badminton racket.",
        "expl": "Money that slips through your fingers disappears into thin air. But money put into a Savings Jar or traditional Gullak grows until it can buy your dreams! Using the 3-Jar rule ensures you always have pocket money for today, savings for tomorrow, and a little to help someone else.",
        "steps": [
            "Label 3 clean glass jars or envelopes: 'SPEND' (50%), 'SAVE' (40%), and 'GIVE' (10%).",
            "Whenever you receive money (e.g. ₹100), divide it immediately before spending a rupee.",
            "Put ₹50 into SPEND for immediate small treats (pencils, ice cream).",
            "Put ₹40 into SAVE for your big goal (badminton racket, telescope, favorite book).",
            "Put ₹10 into GIVE for community charity, stray animal food, or a friend's card.",
            "Tape a picture of your savings goal onto the SAVE jar and track your progress weekly."
        ],
        "example": {
            "title": "Manish's Badminton Racket Goal",
            "scenario": "Manish applies the 3-Jar system to his ₹200 birthday gift.",
            "steps": [
                "SPEND: ₹100 (treats friends to lemon juice).",
                "SAVE: ₹80 (drops into racket fund; total now ₹360).",
                "GIVE: ₹20 (buys biscuits for neighborhood rescue dog).",
                "Reaches ₹600 within three months and buys his racket with pure pride."
            ],
            "takeaway": "Saving 40% of every rupee received turns distant dreams into reality through patient consistency."
        },
        "mistakes": [
            ("Opening the SAVE jar to buy candy when you run out of SPEND money.", "Keep the SAVE jar sealed with tape; never raid your long-term savings for temporary cravings."),
            ("Believing that only adults need to save money.", "Starting healthy saving habits in Class 5 creates financial wisdom that lasts a lifetime.")
        ],
        "checklist": [
            "Are my 3 jars clearly labeled (Spend, Save, Give)?",
            "Did I divide new money immediately before spending anything?",
            "Is there a clear visual picture of my goal on my Save jar?",
            "Did I leave my Save jar untouched for small impulse cravings?"
        ],
        "prompt": "How did it feel when you bought something meaningful with money you saved yourself?",
        "takeaway": "Pay your future self first: dividing money into Spend, Save, and Give builds real financial independence.",
        "vis1": {"title": "The 3-Jar System", "caption": "Spend 50% (Immediate Treats), Save 40% (Long-Term Dream Goal), Give 10% (Kindness)."},
        "vis2": {"title": "The Savings Ladder", "caption": "Color one rung of the ladder every time ₹50 is added to your Save jar."},
        "act": {
            "title": "Build Your 3-Jar Money Station",
            "obj": "Create and label 3 physical money containers and establish your first savings milestone.",
            "steps": [
                "Find 3 reusable jars, boxes, or sturdy envelopes.",
                "Decorate and label them: SPEND (50%), SAVE (40%), and GIVE (10%).",
                "Draw or paste a picture of your target savings goal on the SAVE jar.",
                "Allocate your next pocket money or festival gift across the 3 jars."
            ],
            "output": "A photo or parent confirmation of the decorated 3-jar station with an established goal."
        },
        "guided": {
            "context": "You have ₹240 in your SAVE jar towards a ₹500 board game. A friend tempts you to spend ₹200 on temporary carnival ride tokens.",
            "optimal": "Say: 'I am saving this for my board game goal! I have ₹30 in my SPEND pocket that I can use for one ride today.'",
            "opt_reason": "Protects your major savings milestone while still participating reasonably in current fun.",
            "non1": "Empty the entire SAVE jar and spend it all on carnival rides in 15 minutes.",
            "non1_reason": "Destroys months of patient progress and leaves deep regret tomorrow.",
            "non2": "Sulk and leave the carnival without talking to your friend.",
            "non2_reason": "Misses out on present joy due to poor budget allocation.",
            "takeaway": "Use your SPEND jar for spontaneous treats; keep your SAVE jar locked for your big goal."
        },
        "indep": {
            "context": "You earn ₹50 each week for washing the family car and watering plants. Your goal costs ₹400.",
            "prompt": "Calculate how much you put into SAVE each week (at 40%) and how many weeks it takes to reach your ₹400 goal.",
            "rubric": "40% of ₹50 = ₹20/week into SAVE; ₹400 ÷ ₹20 = 20 weeks."
        },
        "quiz": {
            "q": "What is the primary benefit of the 3-Jar money system (Spend, Save, Give)?",
            "opt_correct": "It balances enjoying money today with saving for important future goals and practicing community generosity.",
            "opt_w1": "It forces you to give all your money away to strangers.",
            "opt_w2": "It ensures you spend every rupee before bedtime.",
            "opt_w3": "It stops you from ever buying treats or books."
        },
        "rubric": {
            "task": "Establish a 3-jar savings system, calculate percentage splits, and demonstrate delayed gratification.",
            "mastery": "Applies 50/40/10 ratio accurately, articulates specific target goal, protects savings from impulse spending, displays generosity.",
            "c1": "Financial Partitioning (Spend/Save/Give)",
            "c2": "Goal Setting & Milestone Tracking",
            "c3": "Delayed Gratification Discipline"
        },
        "refs": [
            "What is a big goal you would love to save for over the next 6 months?",
            "Why does putting money into a physical Gullak make it easier not to spend it?",
            "What is a kind cause you would like to support with your GIVE jar?",
            "How do banks help adults save money securely?"
        ]
    },

    # MONTH 11: Empathy, Clear Classroom Communication & Respect for Seniors
    {
        "month": 11, "theme": "Classroom Confidence, Sincere Apologies & Senior Care", "seq": 1,
        "cat": "life_communication", "cat_label": "Communication & Confidence",
        "title": "Writing a Sincere Apology Letter When You Make a Mistake",
        "why": "Everyone makes mistakes, but giving excuses, lying, or mumbling a fake 'sorry' leaves hurt feelings unresolved. A sincere written apology acknowledges responsibility, shows empathy, and repairs damaged trust.",
        "objs": ["Identify the 4 components of a true apology: Regret, Responsibility, Remedy, and Reassurance", "Avoid defensive excuse words like 'sorry BUT you made me do it'", "Draft a 4-sentence handwritten apology note for an accidental mistake", "Deliver the apology with calm eye contact and sincere posture"],
        "scenario": "Aarav borrowed his friend Tanisha's favorite colored gel pens and accidentally lost the purple one. At first he wanted to pretend he never borrowed it, but his conscience bothered him.",
        "expl": "Saying 'sorry' is easy; being truly accountable is brave! A genuine apology doesn't make excuses ('I lost it BUT someone bumped me'). It takes ownership, repairs the loss, and restores friendship stronger than before.",
        "steps": [
            "Step 1 (Admit): State clearly what happened without hiding details or blaming others.",
            "Step 2 (Empathy): Acknowledge how your action made the other person feel: 'I know that was your favorite pen.'",
            "Step 3 (Remedy): Offer a practical fix: 'I bought a replacement purple pen with my pocket money.'",
            "Step 4 (Reassurance): Promise future care: 'In the future, I will put borrowed items back immediately.'",
            "Deliver the note in a clean envelope with a calm, polite voice."
        ],
        "example": {
            "title": "Aarav's Brave Apology",
            "scenario": "Aarav hands Tanisha his letter and replacement pen.",
            "steps": [
                "Writes: 'Dear Tanisha, I am very sorry I lost your purple pen.'",
                "'I know you loved using it for art class and I was careless.'",
                "'Here is a new replacement pen I bought yesterday.'",
                "'I promise to be much more careful with anything I borrow.'",
                "Tanisha smiles warmly and their friendship is completely restored."
            ],
            "takeaway": "Taking full responsibility and replacing what was damaged transforms a mistake into deeper trust."
        },
        "mistakes": [
            ("Adding excuses like 'Sorry, but it wouldn't have gotten lost if you hadn't given it to me!'", "The word 'BUT' cancels out an apology; never use excuses."),
            ("Refusing to look at the person while mumbling a half-hearted apology under your breath.", "Look the person in the eyes, stand tall, and speak with sincere respect.")
        ],
        "checklist": [
            "Did I clearly state what mistake I made?",
            "Did I avoid making excuses or using the word 'but'?",
            "Did I acknowledge how the other person was impacted?",
            "Did I offer a concrete way to make things right?"
        ],
        "prompt": "Why does admitting a mistake immediately feel lighter than carrying a secret lie?",
        "takeaway": "Own your errors with courage: a sincere apology repairs damaged bonds and builds honorable character.",
        "vis1": {"title": "The 4-Part Apology Architecture", "caption": "1. I am sorry for [Action]. 2. I realize it made you feel [Impact]. 3. To make it right, I will [Remedy]. 4. In future, I will [Change]."},
        "vis2": {"title": "The 'BUT' Eraser Rule", "caption": "Saying 'Sorry BUT...' erases your apology. Stop at the period!"},
        "act": {
            "title": "The 4-Step Apology Draft",
            "obj": "Write a complete 4-part apology letter for a past or hypothetical mistake.",
            "steps": [
                "Select a realistic scenario (e.g. accidentally breaking a sibling's toy or being rude when tired).",
                "Write each of the 4 components on lined paper.",
                "Highlight and eliminate any defensive excuse words.",
                "Read the letter aloud with calm, respectful delivery."
            ],
            "output": "A handwritten 4-part apology letter demonstrating genuine accountability."
        },
        "guided": {
            "context": "You accidentally bumped into a classmate's desk, spilling their open water bottle all over their fresh art drawing.",
            "optimal": "Immediately help clean the desk with tissues, say: 'I was careless walking between desks and ruined your drawing. I am so sorry. Can I help you repaint the outline?'",
            "opt_reason": "Takes immediate responsibility, assists with cleanup, and offers practical remediation.",
            "non1": "Laugh and say: 'Why was your bottle open anyway? It's your fault!'",
            "non1_reason": "Cruel, defensive, and escalates conflict into severe distress.",
            "non2": "Sprint out of the classroom so nobody realizes you were the one who bumped it.",
            "non2_reason": "Dishonest and cowardly evasion of responsibility.",
            "takeaway": "Accidents happen; stepping up immediately to fix the damage shows true maturity."
        },
        "indep": {
            "context": "You lost your temper and spoke rudely to your mother when she asked you to turn off the TV.",
            "prompt": "Draft a sincere 3-sentence apology note to leave on her desk.",
            "rubric": "Acknowledged rude tone, validated her reasonable request, promised respectful speech in future."
        },
        "quiz": {
            "q": "Which of the following phrases ruins an apology and makes it defensive?",
            "opt_correct": "'I am sorry I shouted, but you annoyed me first.'",
            "opt_w1": "'I am sorry I was careless with your book.'",
            "opt_w2": "'I take full responsibility for breaking the ruler.'",
            "opt_w3": "'How can I help you clean up this mess?'"
        },
        "rubric": {
            "task": "Construct and deliver an authentic 4-part apology demonstrating genuine accountability.",
            "mastery": "Takes unequivocal ownership, eliminates all excuses, offers concrete remediation, demonstrates respectful body language.",
            "c1": "Accountability & Ownership",
            "c2": "Absence of Defensive Justifications",
            "c3": "Constructive Remediation Offer"
        },
        "refs": [
            "Why is it scary to admit when we are in the wrong?",
            "How do you feel when someone gives you a fake apology compared to a real one?",
            "What can you do to make amends when an item cannot be replaced easily?",
            "How does apologizing quickly keep small misunderstandings from becoming big fights?"
        ]
    },
    {
        "month": 11, "theme": "Classroom Confidence, Sincere Apologies & Senior Care", "seq": 2,
        "cat": "life_communication", "cat_label": "Communication & Confidence",
        "title": "Asking Clear Questions in Class When You Are Confused",
        "why": "Sitting silently when you don't understand a lesson causes learning gaps that grow bigger with every passing week. Learning how to phrase specific, confident questions helps teachers help you succeed.",
        "objs": ["Identify the difference between helpless whining ('I don't get anything') and a precise question", "Formulate a 'Pinpoint Question' that identifies exactly where understanding stopped", "Raise your hand with confident posture and wait patiently to be acknowledged", "Note down the teacher's clarifying answer in your study margin immediately"],
        "scenario": "During a Class 5 Science lesson on electrical circuits, the teacher explained parallel versus series wiring. Bhavya got confused at step 3, but felt shy and stayed silent while everyone nodded.",
        "expl": "Teachers love questions! A question does not mean you are slow; it proves you are actively listening and thinking. When you say 'I don't understand anything', teachers cannot help you. When you pinpoint: 'I understood step 1 and 2, but could you clarify step 3?', you get instant clarity.",
        "steps": [
            "Identify the exact sentence or step where your understanding paused.",
            "Frame your question using the Pinpoint Formula: 'I understood [A], but I am confused about [B].'",
            "Raise your hand steadily at shoulder height with an attentive posture.",
            "When called upon, stand up or speak in a clear, audible room voice without mumbling.",
            "Listen to the teacher's explanation and jot down one sentence in your notebook margin.",
            "Thank the teacher politely: 'Thank you ma'am, that makes sense now!'"
        ],
        "example": {
            "title": "Bhavya's Pinpoint Question",
            "scenario": "Bhavya asks for clarity in Math.",
            "steps": [
                "Teacher finishes explaining long division with decimals.",
                "Bhavya raises hand: 'Sir, I followed multiplying by 10, but why does the decimal point move to the right?'",
                "Teacher smiles: 'Great question, Bhavya! Let's look at place value.'",
                "Three other classmates whisper: 'I was confused about that too! Thank you for asking!'",
                "Bhavya notes the tip and solves the next problem flawlessly."
            ],
            "takeaway": "When you ask a pinpoint question, you usually help half the class who was too shy to ask."
        },
        "mistakes": [
            ("Waiting until the test day to tell parents or teachers that you never understood the topic.", "Ask questions on the day the lesson is taught while concepts are fresh."),
            ("Shouting 'This makes no sense!' from your seat without raising your hand.", "Always raise your hand and frame your question with polite, respectful curiosity.")
        ],
        "checklist": [
            "Did I identify the exact step where I got confused?",
            "Did I frame my question using the Pinpoint Formula?",
            "Did I raise my hand politely and wait to be called?",
            "Did I write down the teacher's explanation in my notebook?"
        ],
        "prompt": "How did it feel the last time you asked a question in class and finally understood the concept?",
        "takeaway": "Curiosity is courage: pinpoint questions unlock understanding for you and your classmates.",
        "vis1": {"title": "The Pinpoint Question Formula", "caption": "'I understood [Part A], but can you please explain how [Part B] connects?'"},
        "vis2": {"title": "Helpless Whine vs Pinpoint Question", "caption": "Red: 'I don't get this math!' vs Green: 'Could you explain step 3 of the division problem again?'"},
        "act": {
            "title": "The 3-Pinpoint Question Challenge",
            "obj": "Formulate 3 precise pinpoint questions based on challenging passages in your current school textbooks.",
            "steps": [
                "Open your Math, Science, or Social Studies textbook to a difficult chapter.",
                "Find 3 paragraphs or problems where concepts feel tricky.",
                "Write out 3 formal pinpoint questions using the taught formula.",
                "Practice asking them aloud in front of a mirror or family member."
            ],
            "output": "A written list of 3 Pinpoint Questions ready for school class."
        },
        "guided": {
            "context": "The English teacher explains how to identify metaphors, but you cannot tell the difference between a simile and a metaphor.",
            "optimal": "Raise hand and say: 'Ma'am, I understand that both compare two things, but does a metaphor always leave out the words 'like' or 'as'?'",
            "opt_reason": "Demonstrates attentive listening and targets the exact differentiating rule.",
            "non1": "Put your head down on the desk and doodle cartoons.",
            "non1_reason": "Gives up on learning and disrespects the teacher.",
            "non2": "Whisper to your neighbor while the teacher is speaking.",
            "non2_reason": "Distracts others and creates classroom disruption.",
            "takeaway": "A targeted question shows intellectual curiosity and earns teacher respect."
        },
        "indep": {
            "context": "You read a history paragraph about the Indus Valley Civilization drainage system, but don't understand why covered drains were unique for that ancient era.",
            "prompt": "Write a 1-sentence pinpoint question to ask your history teacher tomorrow.",
            "rubric": "Targeted the covered drainage innovation and contrasted with other ancient civilizations."
        },
        "quiz": {
            "q": "What makes a 'Pinpoint Question' far more effective than simply saying 'I don't get this'?",
            "opt_correct": "It shows what you already understood and specifies the exact concept where you need help.",
            "opt_w1": "It makes the teacher talk for 45 minutes so homework gets cancelled.",
            "opt_w2": "It proves that the textbook is poorly written.",
            "opt_w3": "It lets you shout in class without getting scolded."
        },
        "rubric": {
            "task": "Formulate and present precise, respectful classroom inquiries using the Pinpoint Question method.",
            "mastery": "Identifies knowledge boundaries clearly, speaks with audible clarity, exhibits polite etiquette, records teacher guidance.",
            "c1": "Question Precision & Formulation",
            "c2": "Classroom Etiquette & Posture",
            "c3": "Information Recording Discipline"
        },
        "refs": [
            "Why do many students hesitate to raise their hands when they are confused?",
            "How does asking questions help teachers know if their explanation was clear?",
            "What can you do if there is no time left in class to ask your question?",
            "Who is a famous scientist who made discoveries simply by asking great questions?"
        ]
    },
    {
        "month": 11, "theme": "Classroom Confidence, Sincere Apologies & Senior Care", "seq": 3,
        "cat": "life_citizenship_community", "cat_label": "Practical Citizenship & Community Life",
        "title": "Respecting Elders and Assisting Senior Citizens Safely in the Neighborhood",
        "why": "Elderly neighbors often experience slower mobility, reduced eyesight, and loneliness. Learning how to interact with senior citizens respectfully, offer safe assistance, and listen to their stories enriches community life.",
        "objs": ["Demonstrate respectful verbal greetings across different cultural settings", "Identify safe physical ways to assist elderly neighbors (holding doors, carrying light bags, reading small print)", "Recognize safety boundaries: never enter a stranger's house alone or take medication on their behalf", "Engage in patient, attentive conversations without looking at phone screens"],
        "scenario": "Mrs. Sharma, an 78-year-old neighbor, was walking up the society stairs carrying a bag of vegetables. Dev saw her resting on the railing, breathing heavily.",
        "expl": "Senior citizens built the schools, roads, and communities we enjoy today! As our bodies grow stronger, their bodies become fragile. Offering a cheerful greeting, opening a heavy door, or carrying a grocery bag shows the highest level of community culture.",
        "steps": [
            "Greet senior neighbors with warmth, eye contact, and a respectful namaste or greeting.",
            "Ask permission before touching or moving anything: 'Namaste Mrs. Sharma, may I carry your vegetable bag up the stairs for you?'",
            "Keep assistance safe and manageable: carry light items, hold gates open, or pick up dropped objects.",
            "Match your walking pace to theirs; never rush or pull an elderly person.",
            "Remember personal safety: help in public common areas (stairs, lobby, garden); never go inside a house without your own parents' knowledge."
        ],
        "example": {
            "title": "Dev's Neighborly Courtesy",
            "scenario": "Dev helps Mrs. Sharma safely.",
            "steps": [
                "Greets Mrs. Sharma politely with a smile.",
                "Takes the heavy vegetable bag gently from her hand.",
                "Walks slowly beside her up the three steps to the building lobby.",
                "Places the bag on her bench and wishes her a pleasant evening.",
                "Mrs. Sharma blesses him warmly with a proud smile."
            ],
            "takeaway": "Small acts of courteous assistance bring immense joy and dignity to senior neighbors."
        },
        "mistakes": [
            ("Snatching a bag or cane from an elderly person's hand without asking first.", "Always ask permission politely first; sudden movements can cause them to lose balance."),
            ("Entering an unfamiliar person's apartment alone to put groceries inside.", "Always leave groceries at the doorway or lobby bench; maintain personal safety boundaries.")
        ],
        "checklist": [
            "Did I greet the elder with polite respect?",
            "Did I ask permission before offering assistance?",
            "Did I match my walking speed to their pace?",
            "Did I keep all assistance within safe public areas?"
        ],
        "prompt": "What can you learn about history by asking your grandparents about their childhood?",
        "takeaway": "Honor our elders: gentle assistance and patient ears build a compassionate, connected neighborhood.",
        "vis1": {"title": "The Safe Assistance Protocol", "caption": "1. Greet warmly -> 2. Ask permission -> 3. Walk at their pace -> 4. Keep in public spaces."},
        "vis2": {"title": "Respectful Posture with Seniors", "caption": "Unplug earphones, look in eyes, speak clearly at normal volume without rushing."},
        "act": {
            "title": "The Senior Neighbor Courtesy Log",
            "obj": "Perform 3 safe courteous actions for an elderly family member or neighbor over one week.",
            "steps": [
                "Action 1: Hold the society gate/lift door open for an elderly resident.",
                "Action 2: Spend 15 minutes asking a grandparent or senior about their favorite school memories.",
                "Action 3: Help read small print on a grocery package or water bill for an elder.",
                "Record the experiences and reflections in your citizenship journal."
            ],
            "output": "A 3-entry Senior Courtesy Reflection Log."
        },
        "guided": {
            "context": "You see an elderly gentleman struggling to read the bus numbers at a crowded bus stop.",
            "optimal": "Walk up, smile politely, and ask: 'Namaste uncle, which bus route are you looking for? I can read the board for you.'",
            "opt_reason": "Provides direct, helpful assistance using clear vision while showing respect.",
            "non1": "Ignore him and keep playing a mobile game with headphones on.",
            "non1_reason": "Indifferent, selfish, and shows poor community awareness.",
            "non2": "Point and laugh at him for squinting.",
            "non2_reason": "Extremely rude and disrespectful.",
            "takeaway": "Offer clear senses and steady hands to seniors navigating busy public places."
        },
        "indep": {
            "context": "Your grandmother has difficulty hearing when the television is on while you are speaking to her.",
            "prompt": "Describe 2 communication adjustments you will make to ensure she understands you easily without shouting.",
            "rubric": "Muted/lowered TV volume, sat facing her directly with good lighting, enunciated clearly at steady pace."
        },
        "quiz": {
            "q": "What is the most important rule to follow before assisting an elderly neighbor with their bags?",
            "opt_correct": "Always greet them politely and ask for permission before touching their belongings.",
            "opt_w1": "Grab the bag immediately and sprint away.",
            "opt_w2": "Demand ₹20 for your help.",
            "opt_w3": "Tell them they are too old to walk."
        },
        "rubric": {
            "task": "Demonstrate respectful communication, safe public assistance, and empathy toward senior citizens.",
            "mastery": "Displays courteous etiquette, asks permission, respects personal safety boundaries, exhibits genuine patience.",
            "c1": "Respectful Etiquette & Greeting",
            "c2": "Physical Assistance Safety",
            "c3": "Patient Listening & Intergenerational Empathy"
        },
        "refs": [
            "What is a story a grandparent told you that you still remember?",
            "Why is walking slowly beside an elder a sign of good manners?",
            "What challenges do seniors face when crossing busy roads with speeding traffic?",
            "How can children make housing societies friendlier for retired residents?"
        ]
    },

    # MONTH 12: Environmental Stewardship & Household Responsibility
    {
        "month": 12, "theme": "Energy Conservation, Plant Care & Community Cleanliness", "seq": 1,
        "cat": "life_citizenship_community", "cat_label": "Practical Citizenship & Community Life",
        "title": "Household Energy Audit: Turning Off Fans, Lights & Taps Responsibly",
        "why": "Leaving fans, tube lights, and dripping taps running in empty rooms wastes electricity, burns fossil fuels, and wastes family money. Becoming a mindful resource guardian conserves power and water.",
        "objs": ["Conduct a walk-through household energy audit across every room in your home", "Identify 'Phantom Power' devices that draw electricity when left on standby", "Demonstrate the 'Last Person Out' rule for lights and ceiling fans", "Detect leaking taps and report them for quick washer replacement"],
        "scenario": "Rohan noticed that whenever his family left the living room to eat dinner, 2 ceiling fans, 3 lamps, and the television remained buzzing in the empty room for two hours.",
        "expl": "Electricity doesn't come from magic; it comes from power stations burning coal or water turbines! Wasting power in an empty room increases pollution and inflates electricity bills. Practicing the 'Last Out, Lights Out' rule makes you an active planetary protector.",
        "steps": [
            "Make an Energy Audit Sheet listing all rooms: Bedrooms, Living Room, Kitchen, Bathrooms.",
            "Walk through the house twice daily (morning after leaving for school, evening before bed).",
            "Check 1: Are fans or lights spinning in rooms where nobody is sitting? Switch them off immediately.",
            "Check 2: Are phone chargers or gaming consoles plugged in and warm with switches left ON? Flick switches OFF.",
            "Check 3: Inspect bathroom and kitchen faucets for continuous drips into sinks.",
            "Place gentle 'Last Person Out: Switch Me Off!' reminder stickers near major doorways."
        ],
        "example": {
            "title": "Rohan's Family Energy Patrol",
            "scenario": "Rohan implements the energy audit.",
            "steps": [
                "Conducts daily 5 PM patrol.",
                "Switches off two empty bedroom fans.",
                "Catches a dripping guest bathroom faucet and informs his father to change the washer.",
                "Next month's electricity bill drops by ₹450!",
                "Family praises Rohan as the official Home Energy Captain."
            ],
            "takeaway": "Daily mindfulness about switches and taps saves hundreds of rupees and conserves vital natural resources."
        },
        "mistakes": [
            ("Thinking that leaving a fan running keeps the room cool while you are away at school.", "Fans cool human skin through wind evaporation; they do NOT cool empty air in vacant rooms."),
            ("Ignoring a slowly dripping tap because 'it's just a few drops'.", "A tap dripping one drop per second wastes over 2,000 litres of clean drinking water every year!")
        ],
        "checklist": [
            "Are all lights and fans off in empty rooms?",
            "Did I unplug unused chargers from wall sockets?",
            "Are all water taps closed tightly with zero drips?",
            "Did I switch off the geyser immediately after bathing?"
        ],
        "prompt": "How does turning off one fan in your room help reduce coal burning at power plants?",
        "takeaway": "Switch off to power on: guarding home energy and water protects your family budget and our planet.",
        "vis1": {"title": "The Last Person Out Rule", "caption": "Hand on door handle = Eye on light switch. Flick it off every single time."},
        "vis2": {"title": "The Dripping Tap Math", "caption": "1 drip per second = 30 drops a minute = 2,000+ litres of precious drinking water wasted per year!"},
        "act": {
            "title": "The 7-Day Home Energy Patrol",
            "obj": "Conduct morning and evening energy sweeps of your home for 7 consecutive days and log savings.",
            "steps": [
                "Create a 7-day checklist with columns: Fans Saved, Lights Saved, Chargers Unplugged, Taps Fixed.",
                "Perform patrol at 8:00 AM and 9:00 PM daily.",
                "Tally the total unnecessary appliances switched off.",
                "Present the final patrol report to your family at the Sunday dinner table."
            ],
            "output": "A signed 7-Day Home Energy Audit Log with verified tallies."
        },
        "guided": {
            "context": "You finish washing your hands in the bathroom. The tap valve is slightly loose and keeps dripping a steady stream.",
            "optimal": "Tighten the knob firmly without forcing it, place a small bowl underneath to catch drips for plants, and inform a parent immediately.",
            "opt_reason": "Prevents water wastage immediately while arranging a permanent washer repair.",
            "non1": "Ignore it and walk away leaving the door closed.",
            "non1_reason": "Wastes dozens of buckets of clean water unnecessarily.",
            "non2": "Smash the pipe with a wrench.",
            "non2_reason": "Causes severe pipe bursting and massive flooding.",
            "takeaway": "Catch temporary drips and report plumbing issues immediately to stop water loss."
        },
        "indep": {
            "context": "Your family is leaving the house for a 3-day weekend trip to visit cousins.",
            "prompt": "List 4 electrical and plumbing checks you will complete before locking the front door.",
            "rubric": "Listed main water inlet or all taps tight, geyser off, all room switches/ACs off, TV/appliances unplugged."
        },
        "quiz": {
            "q": "Why is it wasteful to leave a ceiling fan running in an empty bedroom while you are away?",
            "opt_correct": "Fans cool people by evaporating sweat from skin; they do not cool the temperature of empty air.",
            "opt_w1": "Because fans produce cold ice cubes when people are present.",
            "opt_w2": "Because fans consume all the oxygen in the room.",
            "opt_w3": "Because school rules prohibit spinning blades."
        },
        "rubric": {
            "task": "Execute comprehensive home energy and water audits, identifying and eliminating utility waste.",
            "mastery": "Demonstrates thorough inspection habits, explains phantom power concepts, prevents water leaks, fosters family awareness.",
            "c1": "Inspection Thoroughness",
            "c2": "Resource Conservation Reasoning",
            "c3": "Household Implementation Leadership"
        },
        "refs": [
            "How many switches did you turn off during your first home audit?",
            "Where does your city's electricity and drinking water come from?",
            "How does wasting electricity contribute to climate change and air pollution?",
            "What can you do to make sure you remember to turn off the bathroom geyser?"
        ]
    },
    {
        "month": 12, "theme": "Energy Conservation, Plant Care & Community Cleanliness", "seq": 2,
        "cat": "life_citizenship_community", "cat_label": "Practical Citizenship & Community Life",
        "title": "Caring for a Home Plant or Sapling: Watering, Soil Aeration & Sunlight",
        "why": "Plants purify our air, produce oxygen, and bring calm green beauty to our homes. Learning how to care for a living potted plant teaches patience, biological empathy, and consistent daily responsibility.",
        "objs": ["Assess a potted plant's sunlight needs (direct sun vs bright indirect balcony light)", "Perform the 'Finger Soil Test' to determine if watering is genuinely required", "Aerate the topsoil gently using an old spoon without damaging delicate root systems", "Prune yellowed dead leaves and clean dusty foliage with a damp cloth"],
        "scenario": "Ananya received a potted money plant on World Environment Day. After 4 days, she noticed the leaves drooping and the soil feeling like hard dry cement.",
        "expl": "A plant is a living companion that depends entirely on you for its food and drink! Through photosynthesis, its green leaves convert sunlight, air, and water into vibrant life. Caring for a plant teaches you that small, steady daily care creates flourishing results.",
        "steps": [
            "Place your potted plant where it receives appropriate morning light (balcony or windowsill).",
            "Perform the Finger Soil Test: insert your index finger one inch deep into the soil.",
            "If the soil feels cool and damp, do NOT water; overwatering rots roots!",
            "If the soil feels dry and crumbly, pour water gently around the base until moist.",
            "Use an old metal spoon to gently loosen the top layer of dry soil once a week (aeration).",
            "Wipe large leaves gently with a damp cotton cloth to remove dust so they can breathe."
        ],
        "example": {
            "title": "Ananya's Thriving Green Balcony",
            "scenario": "Ananya establishes a plant care routine.",
            "steps": [
                "Checks soil moisture every morning before school.",
                "Waters every two days using a gentle watering mug.",
                "Snips off dried brown leaf tips with blunt scissors.",
                "Loosens the soil every Sunday morning.",
                "Her plant sprouts three brand new vibrant green leaves within two weeks."
            ],
            "takeaway": "Consistent checking and gentle watering transforms a struggling sapling into a flourishing green companion."
        },
        "mistakes": [
            ("Flooding the pot with water every single day until muddy water overflows the tray.", "Overwatering drowns plant roots; only water when topsoil feels dry to the touch."),
            ("Keeping a sun-loving plant inside a dark closet or windowless room.", "Plants require natural sunlight for photosynthesis; place them near windows or balconies.")
        ],
        "checklist": [
            "Did I test soil moisture with my finger before watering?",
            "Does the pot have drainage holes at the bottom for excess water?",
            "Is the plant receiving adequate morning sunlight?",
            "Did I gently wipe dust off the green leaves?"
        ],
        "prompt": "What does watching a new green leaf unfurl teach you about patience and steady care?",
        "takeaway": "Nurture life: checking soil moisture and providing sunlight turns you into a patient green guardian.",
        "vis1": {"title": "The Finger Soil Test", "caption": "Push finger 1 inch into soil. Damp = Wait. Dry & powdery = Water gently."},
        "vis2": {"title": "Anatomy of a Healthy Potted Plant", "caption": "Sunlight on foliage, loose aerated soil, drainage holes at base to prevent root rot."},
        "act": {
            "title": "The 14-Day Plant Guardian Journal",
            "obj": "Adopt a single potted plant or sapling and track its watering, light, and growth for two weeks.",
            "steps": [
                "Select a potted plant in your home, balcony, or school garden.",
                "Record starting height and number of healthy green leaves.",
                "Check soil daily; water only when dry.",
                "Aerate topsoil on Day 7 and Day 14.",
                "Photograph or sketch the plant on Day 1 and Day 14 to compare growth."
            ],
            "output": "A 14-day Plant Guardian log with sketches or photo evidence of new growth."
        },
        "guided": {
            "context": "You notice your potted plant's leaves turning pale yellow and dropping, and the saucer underneath is overflowing with stagnant brown water.",
            "optimal": "Empty the flooded saucer immediately, move the pot into bright airy sunlight, and stop watering for 4 days until the soil dries out.",
            "opt_reason": "Yellow leaves and standing water indicate root suffocation from overwatering.",
            "non1": "Pour another bottle of cold water over the plant immediately.",
            "non1_reason": "Guarantees complete root death from fungal rotting.",
            "non2": "Throw the plant into the trash can.",
            "non2_reason": "Prematurely gives up on a living organism that can easily recover with proper drainage.",
            "takeaway": "Most sick house plants are drowning in too much water; let the roots breathe."
        },
        "indep": {
            "context": "You are going away for a 4-day weekend during summer. How will you ensure your balcony plant stays hydrated?",
            "prompt": "Describe a simple DIY drip-watering method using an inverted plastic bottle or wet cotton wick.",
            "rubric": "Explained filling bottle with tiny pinhole in cap placed upside down in soil or using wick from water bowl."
        },
        "quiz": {
            "q": "What is the most reliable way to tell if a potted plant needs water?",
            "opt_correct": "Press your finger 1 inch into the soil; if it feels dry and crumbly, it needs water.",
            "opt_w1": "Pour a bucket of water whenever you remember every few weeks.",
            "opt_w2": "Check if the leaves have turned completely black.",
            "opt_w3": "Always pour water 5 times every day regardless of weather."
        },
        "rubric": {
            "task": "Demonstrate independent potted plant maintenance, soil testing, aeration, and light optimization.",
            "mastery": "Applies finger test accurately, avoids overwatering, aerates soil carefully, documents botanical growth with pride.",
            "c1": "Moisture Assessment & Watering Discipline",
            "c2": "Soil & Foliage Care Technique",
            "c3": "Biological Stewardship & Patience"
        },
        "refs": [
            "What kind of plants grow best in your region's climate?",
            "How do plants help cool urban neighborhoods during scorching summers?",
            "Why do earthworms in garden soil help plant roots breathe better?",
            "What vegetable or herb would you like to grow from kitchen seeds (like coriander or methi)?"
        ]
    },
    {
        "month": 12, "theme": "Energy Conservation, Plant Care & Community Cleanliness", "seq": 3,
        "cat": "life_citizenship_community", "cat_label": "Practical Citizenship & Community Life",
        "title": "The 15-Minute Neighborhood Cleanup Drive: Safely Collecting Dry Waste",
        "why": "Littered parks, playgrounds, and stairwells degrade our living spaces and harm local wildlife and pets. Organizing a short, safe litter cleanup with peers builds active civic pride and community leadership.",
        "objs": ["Distinguish between safe dry litter (paper, clean plastic wrappers, cardboard) and hazardous waste (glass, syringes, wet waste)", "Wear protective rubber or cloth gloves and use trash tongs during waste collection", "Sort collected litter into dry recyclable paper and plastic recyclables", "Wash and sanitize hands thoroughly with soap immediately following cleanup"],
        "scenario": "Rishi and his society friends loved playing cricket in the community park, but empty snack packets, plastic bottles, and juice cartons were scattered all around the pitch.",
        "expl": "Public spaces belong to all of us! Waiting for 'someone else' to clean up means litter stays forever. A rapid 15-minute neighborhood cleanup with friends turns an untidy park into a sparkling, proud playing field.",
        "steps": [
            "Team up with 2 or 3 classmates or society friends with adult awareness.",
            "Gear up safely: put on sturdy shoes, protective gardening/cloth gloves, and carry 2 large trash bags.",
            "Bag 1 is for Recyclable Dry Waste (plastic bottles, cardboard, soda cans). Bag 2 is for General Non-Recyclable Waste.",
            "Set a timer for exactly 15 minutes; work systematically across the playground in a straight sweep line.",
            "Safety Golden Rule: NEVER touch broken glass, metal blades, batteries, or medical items; flag them to an adult.",
            "Deposit sorted bags into society municipal collection bins, remove gloves, and wash hands with soap for 30 seconds."
        ],
        "example": {
            "title": "Rishi's 15-Minute Park Blitz",
            "scenario": "Rishi and four friends clean the society cricket ground.",
            "steps": [
                "Put on rubber gloves and set a phone timer for 15 minutes.",
                "Collect 28 plastic water bottles and 40 dry chips wrappers.",
                "Leave a cracked bottle on the ground and inform security guard to sweep safely.",
                "Tie trash bags securely and drop into blue recycling bin.",
                "Play cricket on a spotless, safe ground with enormous pride."
            ],
            "takeaway": "Fifteen minutes of teamwork transforms littered public spaces into clean, safe community grounds."
        },
        "mistakes": [
            ("Picking up sharp metal cans, broken glass, or used medical masks with bare hands.", "Never touch sharp or sanitary waste; always wear gloves and report hazards to adults."),
            ("Throwing collected trash into an open storm drain or vacant plot.", "Always dispose of collected litter in authorized municipal or society recycling dustbins.")
        ],
        "checklist": [
            "Am I wearing protective gloves and closed-toe shoes?",
            "Did I avoid touching any sharp glass or hazardous waste?",
            "Did I separate plastic recyclables into the appropriate bin?",
            "Did I wash my hands thoroughly with soap after taking off gloves?"
        ],
        "prompt": "How does playing in a clean park make everyone feel happier and safer?",
        "takeaway": "Civic pride is an action: fifteen minutes of team cleanup makes community spaces shine with dignity.",
        "vis1": {"title": "The Safe Cleanup Gear Kit", "caption": "Closed shoes, rubber/cloth gloves, trash tongs, dual bags for paper and plastic."},
        "vis2": {"title": "The Red Flag Hazard Rule", "caption": "DO NOT TOUCH: Broken glass, needles, animal waste, exposed chemicals. Flag to adults immediately!"},
        "act": {
            "title": "The 15-Minute Community Sweep",
            "obj": "Conduct a safe, supervised 15-minute dry litter collection in your building compound, park, or school ground.",
            "steps": [
                "Enlist one adult supervisor and at least one peer.",
                "Put on protective gloves and prepare dry collection bags.",
                "Sweep designated area for 15 minutes collecting dry packaging litter.",
                "Weigh or count the items collected (e.g. 25 bottles, 30 wrappers).",
                "Deposit in recycling bins and wash hands thoroughly."
            ],
            "output": "A before-and-after photo or supervisor sign-off showing the cleaned area and tally of collected litter."
        },
        "guided": {
            "context": "While picking up crisp packets near park bushes, you spot a rusted tin can with sharp jagged edges sticking out of the dirt.",
            "optimal": "Do not touch it with your hands; mark the location and inform the park gardener or building supervisor with a shovel to remove it safely.",
            "opt_reason": "Prevents severe cuts and tetanus risk from rusted jagged metal edges.",
            "non1": "Grab it firmly and try to yank it out of the ground with bare hands.",
            "non1_reason": "High risk of deep cuts and severe bacterial infection.",
            "non2": "Kick it with your shoes deeper into the grass.",
            "non2_reason": "Creates a hidden puncture trap for running children and dogs.",
            "takeaway": "Never compromise physical safety for litter collection; flag sharp hazards to adults."
        },
        "indep": {
            "context": "You want to encourage classmates to stop throwing toffee wrappers on the classroom floor.",
            "prompt": "Design a catchy 4-word slogan and describe where you will place it in the classroom.",
            "rubric": "Created clear, positive civic slogan and suggested placement directly above the classroom dustbin."
        },
        "quiz": {
            "q": "What should you do if you encounter broken glass or medical waste during a neighborhood cleanup?",
            "opt_correct": "Do not touch it; report the exact location to an adult or municipal cleaner equipped with safety tools.",
            "opt_w1": "Pick it up quickly and hide it in your pocket.",
            "opt_w2": "Throw it into a friend's trash bag.",
            "opt_w3": "Smash it with your shoes into smaller pieces."
        },
        "rubric": {
            "task": "Plan and participate in a safe, cooperative dry-waste litter collection drive with civic responsibility.",
            "mastery": "Applies rigorous personal safety protocols, sorts recyclables appropriately, demonstrates peer collaboration, washes hands properly.",
            "c1": "Waste Safety & Hazard Identification",
            "c2": "Civic Collaboration & Efficiency",
            "c3": "Post-Drive Hygiene & Proper Disposal"
        },
        "refs": [
            "Why do people litter when dustbins are only a few steps away?",
            "How does plastic litter in parks harm birds, squirrels, and stray dogs?",
            "What can your school or housing society do to make recycling dustbins more noticeable?",
            "How did working together with friends for just 15 minutes change how the park looked?"
        ]
    }
]

print(f"Adding {len(months_8_to_12)} modules for Months 8 through 12...")
raw_topics.extend(months_8_to_12)
print(f"Total topics for Class 5: {len(raw_topics)}")
assert len(raw_topics) == 36, f"Expected 36 topics, got {len(raw_topics)}"

# Check domain counts
from collections import Counter
counts = Counter(t['cat'] for t in raw_topics)
print("Domain distribution for Class 5:")
for cat, count in sorted(counts.items()):
    print(f"  {cat}: {count}")

# Verify 4x5 and 4x4
freqs = sorted(counts.values())
assert freqs == [4, 4, 4, 4, 5, 5, 5, 5], f"Expected four 4s and four 5s, got {freqs}"
print("Domain distribution matches requirements: exactly four 5s and four 4s!")

# Now create modules
c5_modules = []
for t in raw_topics:
    mod = create_module(t, class_num=5, stage="foundation_guided")
    c5_modules.append(mod)

print(f"Successfully created {len(c5_modules)} full module objects for Class 5.")

# Write class-5.ts
ts_code = 'import { LifeSkillCurriculumModule } from "../curriculum-types";\n\n'
ts_code += '/**\n * Class 5 Life Skills Curriculum - 36 Modules across 12 Months\n'
ts_code += ' * Stage: Foundation and Guided Practice (Classes 4-5)\n */\n'
ts_code += 'export const CLASS_5_MODULES: LifeSkillCurriculumModule[] = '
ts_code += json.dumps(c5_modules, indent=2) + ';\n'

output_path = "packages/core/src/skills-engine/modules/class-5.ts"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(ts_code)

print(f"Successfully generated {output_path} ({os.path.getsize(output_path)} bytes).")
