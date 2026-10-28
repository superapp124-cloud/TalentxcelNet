# scratch/build_class_6.py
import sys
import json
import os
from collections import Counter

sys.path.insert(0, os.path.abspath("scratch"))
from test_dict_mod import create_module

raw_topics_c6 = [
    # MONTH 1: Academic Independence & Backward Planning
    {
        "month": 1, "theme": "Academic Independence & Backward Planning", "seq": 1,
        "cat": "life_study_skills", "cat_label": "Study Skills & Learning Independence",
        "title": "Backward Planning for Multi-Week School Deadlines",
        "why": "Leaving major school projects until the night before causes rushed work, panic, and poor grades. Backward planning breaks large assignments into manageable daily milestones.",
        "objs": [
            "Identify the final project deadline and mark it on a monthly calendar",
            "Work backwards from the deadline to set 4 intermediate checkpoints: research, outline, draft, and final review",
            "Calculate daily required sprint durations (e.g. 25 minutes per day for 8 days)",
            "Build in a mandatory 48-hour buffer before the submission date"
        ],
        "scenario": "Aditi was assigned a 10-page Social Science project on Indian River Basins due on October 30. She forgot about it until October 29 at 9:00 PM, resulting in tears, frantic cutting, and sloppy presentation.",
        "expl": "A mountain is climbed step by step, not in one giant leap! Backward planning means looking at the summit (submission day) and planting base camps along the trail. When you divide a big assignment into 4 smaller checkpoints, each task feels lightweight and easy.",
        "steps": [
            "Open your calendar and circle the project submission deadline in bold red.",
            "Set Checkpoint 4 (Buffer & Final Polish) 2 days before the final deadline.",
            "Set Checkpoint 3 (First Full Draft) 5 days before the final deadline.",
            "Set Checkpoint 2 (Outline & Visual Gathering) 8 days before the final deadline.",
            "Set Checkpoint 1 (Research & Note-taking) immediately on the day the project is assigned.",
            "Allocate 25-minute study sprints into your weekday timetable to execute each checkpoint."
        ],
        "example": {
            "title": "Aditi's River Basin Project Plan",
            "scenario": "Aditi tests backward planning on her next assignment.",
            "steps": [
                "Submission: Friday, Nov 15.",
                "Nov 13: Final proofreading and cover page (Checkpoint 4).",
                "Nov 10: Complete handwritten draft and map labeling (Checkpoint 3).",
                "Nov 7: Collect river basin photographs and library facts (Checkpoint 2).",
                "Nov 4: Select 3 river systems and outline 5 chapter headings (Checkpoint 1).",
                "Finishes project two days early with zero stress and receives an A+."
            ],
            "takeaway": "Planting intermediate milestones eliminates last-night panic and produces superior school work."
        },
        "mistakes": [
            ("Starting work on the project only when the teacher gives a reminder 2 days before.", "Never rely on reminders; schedule your own intermediate milestones the day an assignment is given."),
            ("Planning to finish the entire project in one exhausting 6-hour marathon.", "Quality work requires incubation; three 1-hour sessions produce much better retention than one 6-hour cram.")
        ],
        "checklist": [
            "Is the final submission date clearly marked on my desk calendar?",
            "Did I establish at least 4 intermediate backward checkpoints?",
            "Is there a 48-hour buffer before the actual due date?",
            "Are daily 25-minute sprints scheduled into my study planner?"
        ],
        "prompt": "How does finishing a project two days early change your mood and confidence before school?",
        "takeaway": "Work backwards from your goal: intermediate checkpoints turn daunting projects into peaceful progress.",
        "vis1": {"title": "The Backward Planning Timeline", "caption": "Deadline -> 2-Day Buffer -> Full Draft -> Outline & Research -> Kickoff Sprint."},
        "vis2": {"title": "The Milestone Mountain", "caption": "Break a 10-page project into four 2.5-page checkpoints across two weeks."},
        "act": {
            "title": "The 14-Day Assignment Blueprint",
            "obj": "Create a backward planning calendar for an upcoming school project or exam preparation.",
            "steps": [
                "Select a real school assignment or unit test date.",
                "Draw a 14-day calendar grid.",
                "Mark the deadline and plot 4 backward milestone dates.",
                "Write specific deliverables next to each milestone.",
                "Review the timeline with a parent or subject teacher."
            ],
            "output": "A dated, itemized 14-Day Backward Planning Chart pinned above your study desk."
        },
        "guided": {
            "context": "Your Science exhibition model is due on December 12. Today is December 1.",
            "optimal": "Schedule materials purchase by Dec 3, base structure by Dec 6, wiring/labels by Dec 9, and rehearsal by Dec 10, leaving 2 buffer days.",
            "opt_reason": "Ensures every structural component is verified before the presentation date.",
            "non1": "Wait until December 11 after dinner to buy cardboard and glue.",
            "non1_reason": "High probability of finding closed shops, wet paint, and non-working models.",
            "non2": "Ask a parent to build the model for you.",
            "non2_reason": "Prevents personal learning and violates academic honesty.",
            "takeaway": "Plan intermediate model checkpoints so technical bugs are fixed days in advance."
        },
        "indep": {
            "context": "You have a 5-chapter History exam in 10 days. How will you apply backward planning?",
            "prompt": "Create a daily chapter revision and flashcard schedule working backwards from Day 10.",
            "rubric": "Allocated 1 chapter every 2 days, reserved Day 9 for full mock test and Day 10 for light formula review."
        },
        "quiz": {
            "q": "What is the primary purpose of scheduling a 48-hour buffer before a project submission deadline?",
            "opt_correct": "To provide breathing room for unexpected delays like printer breakdowns, missing glue, or illness without missing the deadline.",
            "opt_w1": "So you can play video games for two full days without studying.",
            "opt_w2": "Because teachers deduct marks if you submit early.",
            "opt_w3": "To hide your project from classmates."
        },
        "rubric": {
            "task": "Construct a backward planning schedule for a complex academic task and adhere to milestones.",
            "mastery": "Deconstructs complex tasks, sets realistic intermediate dates, includes contingency buffers, monitors progress independently.",
            "c1": "Deconstruction & Milestone Logic",
            "c2": "Buffer & Contingency Integration",
            "c3": "Progress Tracking Discipline"
        },
        "refs": [
            "Why is it harder to estimate how long creative projects will take compared to math homework?",
            "How does backward planning help athletes prepare for tournaments?",
            "What should you do if an intermediate milestone takes longer than planned?",
            "How can you coordinate backward milestones when working on a group school project?"
        ]
    },
    {
        "month": 1, "theme": "Academic Independence & Backward Planning", "seq": 2,
        "cat": "life_study_skills", "cat_label": "Study Skills & Learning Independence",
        "title": "Creating a Distraction-Free Study Zone at Home",
        "why": "Studying near televisions, bed sheets, or buzzing smartphones fractures concentration, causing 30-minute homework tasks to drag on for 3 agonizing hours. An intentional study zone triggers instant mental focus.",
        "objs": [
            "Identify the 4 elements of a high-focus study zone: clear desk surface, natural light/ergonomic lamp, comfortable chair, and zero digital notifications",
            "Perform a 3-minute desk declutter ritual before opening any textbook",
            "Implement the 'Phone in Another Room' protocol during study sprints",
            "Communicate study boundaries politely to family members using a 'Deep Work in Progress' door sign"
        ],
        "scenario": "Siddharth tried to study on his bed with his phone resting on his pillow. Every two minutes, a notification pinged. After two hours, he had only read half a page and felt mentally exhausted.",
        "expl": "Your brain associates physical environments with behaviors! Beds signal sleep; dining tables signal eating and chatting. A dedicated study desk signals: 'Time for sharp, victorious thinking.' Clearing your desk clears your mental bandwidth.",
        "steps": [
            "Choose a flat desk or table surface away from televisions and high-traffic hallways.",
            "Remove all clutter: leave only the current subject textbook, notebook, stationery pouch, and water bottle.",
            "Ensure lighting comes from in front or the side, never casting shadows over your writing hand.",
            "Place your phone or tablet on airplane mode in another room or hand it to a parent.",
            "Hang a quiet study tag on your door: 'Focus Sprint: 5:00 to 5:45 PM'.",
            "Sit with feet flat on the floor and back supported straight."
        ],
        "example": {
            "title": "Siddharth's Study Desk Transformation",
            "scenario": "Siddharth sets up his focus cockpit.",
            "steps": [
                "Clears old comic books and toys into a storage drawer.",
                "Sets up a desk lamp on the left side of his table.",
                "Leaves his phone charging in the kitchen counter.",
                "Completes his entire Science assignment in 35 focused minutes.",
                "Enjoys guilt-free outdoor play for the rest of the evening."
            ],
            "takeaway": "A clean physical study cockpit cuts study time in half while doubling conceptual retention."
        },
        "mistakes": [
            ("Studying lying down on a soft mattress or cozy sofa.", "Lying down triggers the brain's sleep response, slowing cognitive speed and causing eye strain."),
            ("Keeping social chat apps open in a browser tab while doing research.", "Every notification switch incurs a 15-minute mental reload cost; close all non-essential tabs.")
        ],
        "checklist": [
            "Is only the current subject material visible on the desk?",
            "Is the smartphone parked outside the study space?",
            "Is the chair height comfortable with feet flat on the floor?",
            "Is there a filled water bottle within arm's reach?"
        ],
        "prompt": "How does your mental calm change when you sit down at a completely clean desk versus a messy table?",
        "takeaway": "Clear space, clear mind: a distraction-free study zone turns hours of frustration into rapid mastery.",
        "vis1": {"title": "The Study Cockpit Layout", "caption": "Central book zone, left-side desk lamp, water bottle top-right, zero phones or clutter."},
        "vis2": {"title": "The Notification Cost", "caption": "1 ping = 60s distraction + 15 mins to regain deep cognitive flow."},
        "act": {
            "title": "The 10-Minute Desk Renovation",
            "obj": "Transform your current study spot into a dedicated distraction-free study cockpit.",
            "steps": [
                "Remove every single item from your study surface.",
                "Wipe surface clean with a damp microfiber cloth.",
                "Return only essential tools: lamp, pen stand, current subject books, water bottle.",
                "Create a handwritten 'Focus Sprint' door sign.",
                "Test the setup with a 25-minute uninterrupted study sprint."
            ],
            "output": "A before-and-after photo or parent verification of your redesigned study cockpit."
        },
        "guided": {
            "context": "Your younger sibling keeps running into your room asking to play while you are preparing for a Math test.",
            "optimal": "Kneel down, show them your door timer, and say: 'I have a 30-minute focus sprint. When my timer rings at 5:30 PM, I will play 15 minutes of blocks with you!'",
            "opt_reason": "Validates their wish while upholding firm academic study boundaries.",
            "non1": "Scream at them and slam the bedroom door.",
            "non1_reason": "Creates family tension and emotional agitation that ruins focus.",
            "non2": "Abandon your Math preparation and play immediately.",
            "non2_reason": "Fails academic responsibilities and establishes poor habits.",
            "takeaway": "Firm, loving boundaries with clear post-study reward times keep study sessions peaceful."
        },
        "indep": {
            "context": "You share a bedroom with a sibling who is practicing the flute or listening to audio.",
            "prompt": "How can you adapt your study environment to maintain deep focus without starting an argument?",
            "rubric": "Suggested noise-dampening earplugs, negotiating alternate practice time slots, or using school/local library."
        },
        "quiz": {
            "q": "Why is studying in bed considered counterproductive for academic focus?",
            "opt_correct": "The brain associates beds with relaxation and sleep, reducing alertness and causing mental sluggishness.",
            "opt_w1": "Because mattresses emit radiation that erases memory.",
            "opt_w2": "Because blankets make textbooks heavier.",
            "opt_w3": "Because school rules strictly forbid lying down."
        },
        "rubric": {
            "task": "Establish, maintain, and defend a dedicated distraction-free study zone at home.",
            "mastery": "Eliminates physical and digital distractions, sets up ergonomic lighting and seating, protects focus time consistently.",
            "c1": "Environmental Ergonomics & Decluttering",
            "c2": "Digital Distraction Elimination",
            "c3": "Boundary Communication & Defense"
        },
        "refs": [
            "What is the single biggest distraction in your current study area?",
            "How does natural daylight from a window affect your alertness while reading?",
            "Why do professional chess players and athletes demand complete silence during matches?",
            "What gentle routine can you do to mark the end of a study session and the start of free time?"
        ]
    },
    {
        "month": 1, "theme": "Academic Independence & Backward Planning", "seq": 3,
        "cat": "life_study_skills", "cat_label": "Study Skills & Learning Independence",
        "title": "Digital Folder Hierarchy: Organizing School Notes & Worksheets on a Computer",
        "why": "Saving files randomly to the Desktop or Downloads folder causes lost homework, duplicate work, and frantic searching right before submission. A structured folder hierarchy keeps digital life organized and stress-free.",
        "objs": [
            "Construct a standardized academic directory tree: Class_6 -> Subject -> Unit_Name",
            "Apply consistent file naming conventions: Subject_Unit_Topic_Date (e.g. Science_Ch04_Circuits_20261026)",
            "Move downloaded school worksheets from Downloads folder to subject folders immediately",
            "Perform a weekly 5-minute digital cleanup to clear desktop clutter and empty trash"
        ],
        "scenario": "Ishan spent 4 hours typing an English essay on 'My Favorite Historical Figure'. When his teacher asked him to email it, he couldn't find it among 300 random files named 'Document1', 'NewDoc', and 'Essay' scattered across his desktop.",
        "expl": "A computer hard drive is like a giant library! If librarians threw books into one massive pile at the entrance, no one could ever find a book. Creating clear folders for each subject turns your computer into a rapid search engine where any file is found in 5 seconds.",
        "steps": [
            "Open your computer's Documents folder.",
            "Create a root folder named 'Class_6_Academic'.",
            "Inside, create subfolders for each school subject: '01_English', '02_Mathematics', '03_Science', '04_Social_Science', '05_Second_Language'.",
            "Inside each subject folder, create two subfolders: 'Worksheets' and 'Projects'.",
            "Use the Universal Naming Rule whenever saving a file: [Subject]_[Topic]_[YYYYMMDD].",
            "Never leave downloaded school files in the Downloads folder; drag them into their home folder immediately."
        ],
        "example": {
            "title": "Ishan's Digital Library",
            "scenario": "Ishan organizes his computer files.",
            "steps": [
                "Creates 'Class_6_Academic' root folder with 5 subject subfolders.",
                "Renames 'Document1.docx' to 'English_Ch02_NelsonMandela_20261026.docx'.",
                "Moves 14 science worksheets out of Downloads into '03_Science/Worksheets'.",
                "Clears Desktop so only 3 active shortcuts remain.",
                "Emails his assignment to his teacher in under 30 seconds."
            ],
            "takeaway": "Consistent file naming and logical subject folders make digital schoolwork instantly retrievable."
        },
        "mistakes": [
            ("Naming files 'Untitled1', 'Final', 'Final2', or 'asdfghjkl'.", "Meaningless file names make search impossible; always include Subject, Topic, and Date."),
            ("Saving all files directly onto the Desktop until the screen is covered in icons.", "Desktop clutter slows down computer performance and increases cognitive stress.")
        ],
        "checklist": [
            "Do I have a Class_6 root folder with subject subfolders?",
            "Are all school files named with Subject, Topic, and Date?",
            "Is my Downloads folder empty of school documents?",
            "Is my computer Desktop clean and uncluttered?"
        ],
        "prompt": "How much time do you waste each week searching for misplaced files on devices?",
        "takeaway": "Name it right, file it tight: a tidy digital folder system keeps your academic work safe and instant to find.",
        "vis1": {"title": "The Academic Folder Tree", "caption": "Documents -> Class_6 -> 01_English / 02_Math / 03_Science -> Notes / Worksheets / Projects."},
        "vis2": {"title": "The Golden Naming Formula", "caption": "[Subject]_[Topic]_[Version/Date].pdf (e.g., Math_Fractions_WS03_20261026.pdf)."},
        "act": {
            "title": "Digital Workspace Overhaul",
            "obj": "Create a complete Class 6 academic directory hierarchy and file at least 10 documents properly.",
            "steps": [
                "Create 'Class_6_Academic' folder structure on your home computer or school drive.",
                "Inspect the Downloads folder and Desktop for school-related files.",
                "Rename at least 10 files using the taught naming convention.",
                "Sort them into their respective subject and topic folders.",
                "Take a screenshot of your clean directory tree."
            ],
            "output": "A screenshot showing your structured academic folder hierarchy with cleanly named files."
        },
        "guided": {
            "context": "You just downloaded a PDF named 'scan_092384_copy.pdf' sent by your teacher containing a Class 6 History revision sheet.",
            "optimal": "Immediately rename the file to 'History_Ch03_IndusValley_Revision_20261026.pdf' and move it into '04_Social_Science/Worksheets'.",
            "opt_reason": "Eliminates cryptic scanner names and places the file where it will be referenced during exam study.",
            "non1": "Leave it in Downloads with its scanner name.",
            "non1_reason": "File will be buried under new downloads and forgotten before tests.",
            "non2": "Delete it to keep the computer clean.",
            "non2_reason": "Loses vital study materials.",
            "takeaway": "Rename and file incoming academic downloads the very instant they arrive."
        },
        "indep": {
            "context": "You are collaborating with a classmate on a Science presentation. You both edit the same slide deck.",
            "prompt": "Explain how you will use version numbering in the file name to prevent overwriting each other's work.",
            "rubric": "Used version tags (e.g. Science_SolarEnergy_v1_Arjun, Science_SolarEnergy_v2_Priya) with date stamps."
        },
        "quiz": {
            "q": "Which of the following is the most effective and professional file name for a school history project?",
            "opt_correct": "History_MughalArchitecture_Project_20261026.docx",
            "opt_w1": "project_final_final_reallyfinal.docx",
            "opt_w2": "doc1.docx",
            "opt_w3": "history_stuff.docx"
        },
        "rubric": {
            "task": "Architect a logical digital filing structure, implement strict file naming, and perform regular digital maintenance.",
            "mastery": "Creates clean nested hierarchies, applies uniform naming syntax, keeps Desktop clear, demonstrates rapid retrieval.",
            "c1": "Hierarchical Directory Architecture",
            "c2": "File Naming Discipline & Metadata",
            "c3": "Digital Hygiene & Maintenance"
        },
        "refs": [
            "Why is organizing digital files just as important as organizing a physical school bag?",
            "What happens when computer hard drives run out of space due to duplicate junk files?",
            "How can cloud backup folders (like Google Drive) protect your school projects from computer crashes?",
            "What system can you use for photos taken on a smartphone for school assignments?"
        ]
    }
]

print(f"Authored Month 1 for Class 6 ({len(raw_topics_c6)} modules).")
