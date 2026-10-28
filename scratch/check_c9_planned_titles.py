# scratch/check_c9_planned_titles.py
import re, glob, sys

titles = set()
for path in glob.glob('packages/core/src/skills-engine/modules/class-*.ts'):
    content = open(path, encoding='utf-8').read()
    for m in re.finditer(r'"title":\s*"([^"]+)"', content):
        titles.add(m.group(1).lower().strip())
print(f"Total titles loaded from existing class files: {len(titles)}")

sys.path.insert(0, 'scratch')
from c9_months_1_to_4 import months_1_to_4
from c9_months_5_to_8 import months_5_to_8
from c9_months_9_to_12 import months_9_to_12

for m in months_1_to_4 + months_5_to_8 + months_9_to_12:
    titles.add(m['title'].lower().strip())
print(f"Total titles including C9 M1-9: {len(titles)}")

planned = [
    "Mastering 3-Hour Board Exam Writing Strategy: Section Pacing, Answer Layout & Word Limits",
    "The Interleaving Study Technique: Switching Between Subjects to Accelerate Math and Science Synapses",
    "Official Documentation Literacy: Updating Aadhaar Biometrics, School Records, and Marksheets at Age 15",
    "Filing a Right to Information (RTI) Application: Holding Public Authorities Accountable",
    "Organizing a Community Cleanliness and Waste Segregation Campaign Under Swachh Bharat",
    "Building Inclusive Community Spaces: Accessibility Audits for Persons with Disabilities (PwD)",
    "Understanding the Three Pillars of Indian Democracy: Legislature, Executive, and Judiciary",
    "Electoral Literacy: How Free and Fair Elections Work and the Value of the Sovereign Vote",
    "Designing a 5-Year Personal Vision Plan: Core Values, Academic Milestones & Ethical Integrity"
]

all_ok = True
for p in planned:
    if p.lower().strip() in titles:
        print("COLLISION:", p)
        all_ok = False
    else:
        print("OK (unique):", p)

if all_ok:
    print("ALL 9 PLANNED TITLES ARE 100% UNIQUE!")
