# Complete Class 5 Life Skills Curriculum Generator (All 36 Modules)
import json
import os
import re

print("Starting Class 5 complete generation...")

def make_mod(
    month, theme, seq, cat, cat_label, title, why, objs,
    character, context, problem, core_lesson, steps, ex_scenario, ex_steps, ex_takeaway,
    mistake1, fix1, mistake2, fix2, checklist, prompt, takeaway,
    vis1_title, vis1_caption, vis2_title, vis2_caption,
    act_title, act_obj, act_mats, act_steps, act_output, act_precaution, act_alt,
    guided_context, guided_opt, guided_opt_reason, guided_non1, guided_non1_reason, guided_non2, guided_non2_reason, guided_takeaway,
    indep_context, indep_prompt, indep_rubric,
    quiz_q, quiz_opt_correct, quiz_opt_w1, quiz_opt_w2, quiz_opt_w3, quiz_remediation,
    rubric_task, rubric_mastery,
    c1_name, c2_name, c3_name,
    ref1, ref2, ref3, ref4
):
    m_str = f"{month:02d}"
    mod_id = f"mod_c5_m{m_str}_s{seq}"
    global_idx = (month - 1) * 3 + seq

    return {
        "id": mod_id,
        "classNumber": 5,
        "lifeSkillStage": "foundation_guided",
        "month": month,
        "monthTheme": theme,
        "sequenceNumber": seq,
        "globalIndex": global_idx,
        "category": cat,
        "categoryLabel": cat_label,
        "title": title,
        "whyItMatters": why,
        "learningObjectives": objs,
        "prerequisites": ["None"],
        "estimatedDuration": "45 minutes (20m lesson + 25m practical activity)",
        "materials": act_mats if act_mats else ["Notebook", "Pencil", "Activity Checklist"],
        "safetyGuidance": act_precaution,
        "contentVersion": "1.0.0",
        "publicationStatus": "published",

        "openingScenario": f"{character} {context}. {problem}",
        "explanation": core_lesson,
        "stepByStep": steps,
        "workedExample": {
            "title": f"{character}’s Practice: {title}",
            "scenario": ex_scenario,
            "steps": ex_steps,
            "takeaway": ex_takeaway
        },
        "commonMistakes": [
            {"mistake": mistake1, "correction": fix1},
            {"mistake": mistake2, "correction": fix2}
        ],
        "decisionChecklist": checklist,
        "reflectionPrompt": prompt,
        "summaryTakeaway": takeaway,

        "heroVisual": {
            "url": f"/images/skills/modules/c5/c5_m{m_str}_s{seq}_hero.webp",
            "altText": f"{title} - Step by step life skill demonstration for Class 5",
            "description": f"Visual infographic and scenario guide demonstrating {title.lower()}.",
            "attribution": "TalentXcel Practical Life-Skills Studio",
            "status": "ready"
        },
        "instructionalVisuals": [
            {
                "id": f"vis_c5_{m_str}_{seq}_a",
                "title": vis1_title,
                "diagramType": "infographic",
                "url": f"/images/skills/modules/c5/diagrams/c5_m{m_str}_s{seq}_diag1.webp",
                "altText": vis1_title,
                "caption": vis1_caption,
                "status": "ready"
            },
            {
                "id": f"vis_c5_{m_str}_{seq}_b",
                "title": vis2_title,
                "diagramType": "checklist",
                "url": f"/images/skills/modules/c5/diagrams/c5_m{m_str}_s{seq}_diag2.webp",
                "altText": vis2_title,
                "caption": vis2_caption,
                "status": "ready"
            }
        ],

        "videoContent": {
            "videoTitle": f"Practical Demonstration: {title}",
            "duration": "3 mins 15 secs",
            "videoUrl": None,
            "status": "storyboard_ready",
            "storyboardBrief": [
                {"scene": 1, "visualDescription": f"Opening setup showing common dilemma with {title.lower()}.", "narrationTranscript": f"When faced with everyday situations, {title.lower()} makes all the difference."},
                {"scene": 2, "visualDescription": "Demonstrating the 5 core practical steps in sequence with clear visual markers.", "narrationTranscript": "Follow these practical steps systematically to achieve reliable, calm results."},
                {"scene": 3, "visualDescription": "Successful outcome with reflection and checklist review.", "narrationTranscript": f"Review your actions, verify safety, and practice {title.lower()} consistently."}
            ],
            "practicalChallengeRecap": f"Practice the 5 core steps of {title.lower()} in your everyday routine today."
        },

        "practicalActivity": {
            "title": act_title,
            "objective": act_obj,
            "materials": act_mats,
            "procedure": act_steps,
            "expectedOutput": act_output,
            "completionChecklist": [
                "Reviewed instructions before starting",
                "Executed each step with care",
                "Recorded result in notebook",
                "Shared reflection with caregiver or peer"
            ],
            "safetyPrecautions": act_precaution,
            "alternativeActivity": act_alt
        },

        "scenarioPractice": {
            "guidedScenario": {
                "context": guided_context,
                "choiceOptions": [
                    {"option": guided_opt, "isOptimal": True, "reason": guided_opt_reason},
                    {"option": guided_non1, "isOptimal": False, "reason": guided_non1_reason},
                    {"option": guided_non2, "isOptimal": False, "reason": guided_non2_reason}
                ],
                "keyTakeaway": guided_takeaway
            },
            "independentScenario": {
                "context": indep_context,
                "challengePrompt": indep_prompt,
                "selfEvaluationRubric": indep_rubric
            }
        },

        "assessment": {
            "question": quiz_q,
            "contextScenario": f"Applying principles of {title.lower()} in a realistic situation.",
            "options": [
                {"id": "opt_1", "text": quiz_opt_correct, "isCorrect": True, "feedback": f"Correct! {quiz_opt_correct}"},
                {"id": "opt_2", "text": quiz_opt_w1, "isCorrect": False, "feedback": "This is not the optimal choice. Review the practical steps in the lesson."},
                {"id": "opt_3", "text": quiz_opt_w2, "isCorrect": False, "feedback": "This approach does not solve the underlying challenge safely or effectively."},
                {"id": "opt_4", "text": quiz_opt_w3, "isCorrect": False, "feedback": "Avoid this option; it creates confusion or avoidable risks."}
            ],
            "correctOptionId": "opt_1",
            "remediationActivity": f"Review the step-by-step instructions for {title}."
        },

        "rubric": {
            "performanceTask": rubric_task,
            "masteryCriteria": rubric_mastery,
            "criteria": [
                {
                    "criterion": c1_name,
                    "weightPercentage": 40,
                    "emerging": f"Incomplete understanding of {c1_name.lower()}.",
                    "developing": f"Demonstrates basic elements of {c1_name.lower()} with guidance.",
                    "proficient": f"Consistently demonstrates {c1_name.lower()} independently.",
                    "exemplary": f"Exemplary mastery of {c1_name.lower()}; guides peers effectively."
                },
                {
                    "criterion": c2_name,
                    "weightPercentage": 35,
                    "emerging": f"Needs reminders on {c2_name.lower()}.",
                    "developing": f"Applies {c2_name.lower()} inconsistently.",
                    "proficient": f"Reliably executes {c2_name.lower()} with accuracy.",
                    "exemplary": f"Flawless application of {c2_name.lower()} under pressure."
                },
                {
                    "criterion": c3_name,
                    "weightPercentage": 25,
                    "emerging": "Limited reflection or self-correction.",
                    "developing": "Reflects only when prompted by teacher.",
                    "proficient": "Independently reviews results and self-corrects.",
                    "exemplary": "Exceptional self-direction and insightful personal reflection."
                }
            ]
        },

        "reflectionPrompts": [
            {"id": "ref_1", "prompt": ref1},
            {"id": "ref_2", "prompt": ref2},
            {"id": "ref_3", "prompt": ref3},
            {"id": "ref_4", "prompt": ref4}
        ]
    }

# Import Month 1 & Month 2 from scratch/catalog_c5.py
from catalog_c5 import get_c5_modules
modules = get_c5_modules(make_mod)
print(f"Loaded {len(modules)} modules from catalog_c5.py.")

# Add Months 3 through 12
# --- MONTH 3: The 3-Jar Savings System & Understanding MRP ---
modules.append(make_mod(
    3, "The 3-Jar Savings System & Understanding MRP", 1,
    "life_money_management", "Money Management & Financial Literacy",
    "The 3-Jar Savings System: Balancing Short-Term Fun vs Long-Term Goals",
    "Spending cash immediately leaves you empty-handed for bigger dreams. The 3-Jar System divides money into Spend, Save, and Give.",
    ["Label 3 transparent jars or envelopes: SPEND (50%), SAVE (40%), and GIVE (10%)", "Divide birthday or festival cash immediately upon receiving it", "Write a specific target goal on the SAVE jar", "Track deposits using a simple paper tally sheet"],
    "Kabir", "received ₹300 for his birthday from his aunt",
    "He wanted to buy comic books today, but also wanted a ₹600 badminton racket next month.",
    "Money needs clear jobs. When cash sits in one pile, you spend it on small cravings. Dividing it into 3 clear jars gives you fun today while protecting your big goals.",
    ["Label 3 transparent jars: SPEND (50%), SAVE (40%), and GIVE (10%).", "Whenever you receive money, divide it into the jars immediately before buying anything.", "Use the SPEND jar for daily treats, snacks, or small stationery.", "Leave the SAVE jar untouched until you reach your written target goal.", "Use the GIVE jar to help someone in need or buy a birthday card for a friend."],
    "Kabir divides ₹300 birthday gift.",
    ["Puts ₹150 in SPEND jar.", "Puts ₹120 in SAVE jar toward badminton racket.", "Puts ₹30 in GIVE jar for animal shelter."],
    "He enjoys snacks today while staying on track for his racket.",
    "Borrowing from the SAVE jar to buy extra candy.", "Keep SAVE jar strictly locked until target is reached.",
    "Keeping all money loose in your school bag.", "Store jars securely at home in a dedicated drawer.",
    ["Are all 3 jars clearly labeled?", "Did I divide money before spending?", "Is my SAVE target written on the jar?", "Did I track my balance?"],
    "What is one big goal you would feel really proud to buy with your own saved money?",
    "Give every rupee a job: spend wisely, save patiently, and give generously.",
    "The 3-Jar Percentage Split", "50% Daily Spend, 40% Future Goal, 10% Sharing & Kindness.",
    "Savings Goal Progress Chart", "Fill in the thermometer as your savings jar grows.",
    "3-Jar Savings Bank Construction", "Create and label 3 savings jars and make your first division.",
    ["3 jars or boxes", "Labels", "Markers", "Pocket money or tokens"],
    ["Clean and dry 3 jars.", "Label SPEND, SAVE, GIVE.", "Write target goal on SAVE jar.", "Deposit first savings."],
    "A functioning 3-jar savings bank with labeled goals.",
    "Handle glass jars gently; use plastic containers if preferred.",
    "Use 3 labeled paper envelopes if jars are unavailable.",
    "Priya gets ₹100 pocket money. She wants a ₹100 toy now.",
    "Put ₹50 in SPEND, ₹40 in SAVE, ₹10 in GIVE, and buy the toy later.",
    "Maintains savings habit and balances short and long term happiness.",
    "Spend all ₹100 immediately on the toy.", "Leaves ₹0 for savings and breaks the system.",
    "Put all ₹100 in GIVE.", "Neglects personal needs and savings goals.",
    "Balance is the key to healthy money habits.",
    "You earn ₹200 for helping wash the family car.",
    "Calculate how much goes into each jar using the 50/40/10 rule.",
    "Calculated ₹100 in SPEND, ₹80 in SAVE, and ₹20 in GIVE.",
    "In the 3-Jar Savings System, what is the primary purpose of the SAVE jar?",
    "To accumulate money patiently for big future goals without spending it on daily impulses.",
    "To hide money from your parents.", "To buy candy every afternoon.", "To hold old coins that don’t work.",
    "The SAVE jar is strictly reserved for your chosen long-term goal.",
    "Set up a 3-jar bank and demonstrate the 50/40/10 allocation on a given amount.",
    "Accurate jar labeling, correct percentage calculation, clear goal declaration.",
    "Allocation Accuracy", "Goal Definition", "Financial Discipline",
    "Why is it harder to save money when it is sitting in your pocket?",
    "How does seeing your savings grow in a clear jar feel?",
    "What is something kind you can do with money from your GIVE jar?",
    "How will this habit help you when you become an adult?"
))

modules.append(make_mod(
    3, "The 3-Jar Savings System & Understanding MRP", 2,
    "life_money_management", "Money Management & Financial Literacy",
    "Checking MRP, Expiry Dates & Batch Codes on Packaged Foods",
    "Consuming expired food can cause severe food poisoning, and overpaying hurts your budget. Checking MRP and expiry dates makes you a safe, smart consumer.",
    ["Locate the printed MRP, Date of Manufacture, and Expiry Date on any food wrapper", "Calculate if an item is safe to consume based on today's calendar date", "Verify that the shopkeeper charges exact MRP or less", "Report swollen or punctured packaged cans to store clerks"],
    "Diya", "went to a grocery store to buy yogurt cups for afternoon snack",
    "She picked a cup from the front row, paid the shopkeeper, and opened it at home only to smell sour curd and find it expired 4 days ago.",
    "Packaged food has a strict safety shelf-life. Grocery stores often place older stock at the front. Looking at the crimped edge or bottom of the container takes 3 seconds and protects your digestive health.",
    ["Flip the food package to locate the printed stamp (often on the crimped edge or bottom).", "Read 'Mfg Date' (when it was made) and 'Exp Date' or 'Best Before'.", "Compare the expiry date against today's date on your watch or phone.", "Check the printed 'M.R.P. ₹' to know the maximum legal price.", "Inspect the container: reject any puffed lids, torn seals, or rusted cans."],
    "Diya checks biscuit packets at the supermarket.",
    ["Picks packet from middle shelf.", "Reads: 'Mfg: Jan 2026, Exp: Jul 2026' -> Safe.", "Checks MRP: ₹30 printed clearly.", "Hands exact ₹30 cash at register."],
    "Checking stamps before billing protects both health and wallet.",
    "Assuming food in a clean shop is always fresh without reading the date.", "Always check the printed date yourself; stock can get overlooked on shelves.",
    "Accepting shopkeeper charging ₹2 extra for 'chilling'.", "By Indian law, charging above printed MRP is illegal under Consumer Protection rules.",
    ["Did I find the printed Expiry Date?", "Is today's date safely before the expiry date?", "Is the packaging sealed and unpunctured?", "Did I verify the printed MRP against the bill?"],
    "Why do shops sometimes put older food items right at the front of the shelf?",
    "Look before you buy: verify the date, check the MRP, and inspect the seal every single time.",
    "Decoding the Packaging Stamp", "Locating Mfg Date, Exp Date, Batch Code, and MRP on everyday food packets.",
    "Packaging Warning Signs", "Puffed lids, dented cans, cracked seals, faded dates.",
    "Pantry Safety Date Audit", "Inspect 5 packaged food items in your home kitchen and log their expiry dates.",
    ["5 packaged food items", "Notebook", "Pen"],
    ["Select 5 items from kitchen pantry.", "Find printed Mfg and Exp dates on each.", "Record dates and determine if safe.", "Alert family member if any item is past expiry."],
    "A completed Food Package Safety Audit sheet covering 5 items.",
    "Do not taste or open any packages that appear swollen or foul-smelling.",
    "Inspect bathroom soap and shampoo bottles for manufacture and expiry dates.",
    "A shopkeeper gives Harsh a carton of juice with an expiry date of yesterday.",
    "Politely say: 'Uncle, this packet expired yesterday. May I please exchange it for a fresh one from the back?'",
    "Firmly and politely protects personal health while giving the merchant a chance to correct.",
    "Drink the juice anyway because it's only one day old.", "Drinking expired dairy or fruit juice can cause bacterial food poisoning.",
    "Throw the juice on the shop floor in anger.", "Rude and creates unnecessary public conflict.",
    "Polite assertion of consumer safety is always respected.",
    "A packet shows: 'Best Before 6 Months from Mfg Date'. Mfg Date is 1st January.",
    "Calculate the exact last safe month and day to consume this product.",
    "Calculated: 6 months from Jan 1 is June 30.",
    "What does 'Best Before' printed on a food package indicate?",
    "The date until which the food retains its optimal freshness, taste, and safety under recommended storage.",
    "The date the store bought the product.", "The time of day the product was cooked.", "A code only for factory inspectors.",
    "Always check 'Best Before' dates before opening or consuming packaged goods.",
    "Perform a food package audit demonstrating date verification and MRP check.",
    "Accurately locates dates, explains expiry math, verifies MRP, identifies seal damage.",
    "Date Literacy", "MRP Verification", "Food Safety Judgment",
    "Have you ever accidentally tasted something that was past its expiry date?",
    "Why is it illegal in India for shopkeepers to charge more than the printed MRP?",
    "How does checking dates help prevent food waste at home?",
    "What should a supermarket do when items reach their expiry date?"
))

modules.append(make_mod(
    3, "The 3-Jar Savings System & Understanding MRP", 3,
    "life_critical_thinking", "Critical Thinking & Everyday Problem-Solving",
    "Evaluating 'Buy One Get One Free' Deals vs Actual Family Needs",
    "Marketing promotions trick families into spending double on items they will never finish. Evaluating BOGO deals saves money and prevents household clutter.",
    ["Calculate the real total cost of a 'Buy One Get One Free' or bundle offer", "Ask the Critical Consumer Question: 'Would we buy this today if it wasn't on sale?'", "Identify whether the bonus item will spoil before the family can consume it", "Make an independent recommendation on whether a promotional deal is worth buying"],
    "Arjun", "was shopping with his mother at the hypermarket",
    "A flashy banner said: 'BUY 2 GIANT JARS OF MAYONNAISE, GET 1 FREE!' Arjun begged his mother to buy it because it was 'free food', even though their family rarely eats mayonnaise.",
    "A deal is only a saving if you actually needed and would use the product! If you spend ₹300 on items that end up rotting in your fridge, you didn't save ₹100—you threw away ₹300! True savings happen when you buy only what your family genuinely consumes.",
    ["Stop and read the promotion banner carefully (e.g. Buy 2 Get 1 Free).", "Calculate the total amount of money leaving your wallet today.", "Ask: 'Do we normally eat or use this much before it expires?'", "Check if buying a single smaller pack costs less total money.", "Never spend extra cash just to get a 'free' bonus you don't need."],
    "Arjun’s family evaluates laundry soap vs mayonnaise deals.",
    ["Inspects laundry soap: 'Buy 2 Get 1 Free' on soap used every week -> Great value.", "Inspects mayonnaise: Family uses 1 jar in 6 months; 3 jars will spoil -> Bad deal.", "Chooses laundry soap deal and skips mayonnaise.", "Family saves ₹250."],
    "Stock up on non-perishables you use daily; skip bulk perishables that spoil.",
    "Buying 5 kilos of perishable snacks just because of a discount sticker.", "Perishable food rots if bought in excess; buy only what fits your weekly meal plan.",
    "Believing you 'saved money' when your total grocery bill was higher than budgeted.", "Savings only count if total expenditure went down, not up.",
    ["Would we buy this item today at regular price?", "Will this item spoil or expire before we finish it?", "Is the total cash spent lower than our planned budget?", "Do we have storage space at home for this bulk pack?"],
    "Have you ever bought something on sale that ended up sitting unused in a cupboard?",
    "It is only a bargain if you actually need it: resist the illusion of 'free'.",
    "The BOGO Value Matrix", "When to Buy Bulk (Non-perishables used daily) vs When to Skip (Perishables, novelties).",
    "The Smart Shopper Decision Flow", "Need it? -> Will use it? -> Total cost lower? -> Buy or Walk Away.",
    "Supermarket Promotion Detective Challenge", "Analyze 3 promotional offers in a grocery store flyer and evaluate true value.",
    ["Grocery store flyer or catalog", "Highlighter", "Calculator or notebook"],
    ["Find 3 'Buy X Get Y' or combo offers in a flyer.", "Calculate total price vs single pack price.", "Rate each deal as 'Smart Buy' or 'Marketing Trap'.", "Present findings to family."],
    "A 3-deal promotional analysis sheet with clear consumer ratings.",
    "Do not purchase items solely for this homework activity; analyze existing flyers.",
    "Evaluate 3 online shopping bundle deals on stationery items.",
    "A cereal box costs ₹150. A bundle of 3 boxes is offered at ₹400 ('Save ₹50!'). Your family eats 1 box every 4 months.",
    "Buy a single box for ₹150 because 3 boxes will take a year to eat and will go stale.",
    "Spending ₹150 total is far smarter than spending ₹400 on cereal that goes stale.",
    "Buy the 3 boxes to save ₹50, even if 2 boxes get thrown away.", "Throwing away stale food loses ₹250 instead of saving ₹50.",
    "Eat all 3 boxes in one week so they don't expire.", "Unhealthy overeating caused by marketing manipulation.",
    "Total money spent matters more than the theoretical discount percentage.",
    "A bookstore offers: 'Buy 3 novels for ₹600 or 1 novel for ₹250'. You only want 1 book.",
    "Explain what you will choose and how much money stays in your pocket.",
    "Chose 1 novel for ₹250; kept ₹350 in pocket rather than spending on unread books.",
    "When is a 'Buy One Get One Free' deal genuinely a smart financial decision?",
    "When the item is non-perishable, used regularly by the family, and within the planned budget.",
    "Whenever any store offers it, regardless of what the item is.",
    "Only on national holidays.",
    "When the item is an expensive luxury you never buy.",
    "BOGO deals are only valuable on staples you are guaranteed to use completely.",
    "Evaluate two competing promotional deals using unit pricing and family consumption rates.",
    "Calculates total cost, evaluates shelf-life risk, determines genuine utility, rejects hype.",
    "Promotion Decoding", "Unit Cost Math", "Consumption Assessment",
    "Why do retail stores use bright red and yellow signs for discount deals?",
    "How does buying in bulk sometimes cause more plastic and food waste?",
    "What is the difference between saving money and spending less money?",
    "How can you help your family stick to a grocery shopping list?"
))

print(f"Total modules so far: {len(modules)}")

# Write to temporary verification file
with open('scratch/class_5_current_progress.json', 'w', encoding='utf-8') as f:
    json.dump(modules, f, indent=2)

print("Progress saved.")
