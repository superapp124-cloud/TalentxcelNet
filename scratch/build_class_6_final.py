# scratch/build_class_6_final.py
import sys
import json
import os
from collections import Counter

sys.path.insert(0, os.path.abspath("scratch"))
from test_dict_mod import create_module
import build_class_6 as c6_m1
import c6_months_2_to_6 as c6_m2_6
import c6_months_7_to_12 as c6_m7_12

all_c6_topics = []
all_c6_topics.extend(c6_m1.raw_topics_c6)
all_c6_topics.extend(c6_m2_6.months_2_to_6)
all_c6_topics.extend(c6_m7_12.months_7_to_12)

print(f"Total Class 6 raw topics loaded: {len(all_c6_topics)}")
assert len(all_c6_topics) == 36, f"Expected 36 topics, got {len(all_c6_topics)}"

# Check distribution of months and sequence numbers
month_counts = Counter(t['month'] for t in all_c6_topics)
print("Month distribution:")
for m in range(1, 13):
    count = month_counts[m]
    print(f"  Month {m:02d}: {count} modules")
    assert count == 3, f"Month {m} has {count} modules instead of 3"

# Check domain distribution
cat_counts = Counter(t['cat'] for t in all_c6_topics)
print("\nDomain distribution for Class 6:")
for cat, count in sorted(cat_counts.items()):
    print(f"  {cat}: {count}")

freqs = sorted(cat_counts.values())
assert freqs == [4, 4, 4, 4, 5, 5, 5, 5], f"Expected four 4s and four 5s, got {freqs}"
print("\nDomain distribution matches requirements: exactly four 5s and four 4s!")

# Check uniqueness of titles within Class 6
titles = [t['title'] for t in all_c6_topics]
assert len(set(titles)) == 36, f"Duplicate titles found in Class 6: {len(titles) - len(set(titles))}"

# Check cross-class uniqueness against Class 4 and Class 5
# Load Class 4 and 5 modules
sys.path.insert(0, os.path.abspath("."))
with open("packages/core/src/skills-engine/modules/class-4.ts", "r", encoding="utf-8") as f:
    c4_text = f.read()

with open("packages/core/src/skills-engine/modules/class-5.ts", "r", encoding="utf-8") as f:
    c5_text = f.read()

import re
c4_titles = set(re.findall(r'"title": "([^"]+)"', c4_text))
c5_titles = set(re.findall(r'"title": "([^"]+)"', c5_text))
print(f"Loaded {len(c4_titles)} titles from Class 4, {len(c5_titles)} titles from Class 5.")

for t in titles:
    assert t not in c4_titles, f"Title duplicate between Class 6 and Class 4: '{t}'"
    assert t not in c5_titles, f"Title duplicate between Class 6 and Class 5: '{t}'"

print("Zero title duplicates against Class 4 and Class 5! Uniqueness verified.")

# Generate module objects
c6_modules = []
for t in all_c6_topics:
    mod = create_module(t, class_num=6, stage="developing_independence")
    c6_modules.append(mod)

print(f"Successfully generated {len(c6_modules)} modules for Class 6.")

# Output packages/core/src/skills-engine/modules/class-6.ts
ts_code = 'import { LifeSkillCurriculumModule } from "../curriculum-types";\n\n'
ts_code += '/**\n * Class 6 Life Skills Curriculum - 36 Modules across 12 Months\n'
ts_code += ' * Stage: Developing Independence (Classes 6-7)\n */\n'
ts_code += 'export const CLASS_6_MODULES: LifeSkillCurriculumModule[] = '
ts_code += json.dumps(c6_modules, indent=2) + ';\n'

output_path = "packages/core/src/skills-engine/modules/class-6.ts"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(ts_code)

print(f"Successfully wrote {output_path} ({os.path.getsize(output_path)} bytes).")
