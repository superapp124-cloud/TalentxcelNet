# scratch/build_class_7_final.py
import sys
import json
import os
from collections import Counter
import re

sys.path.insert(0, os.path.abspath("scratch"))
from test_dict_mod import create_module
import c7_months_1_to_6
import c7_months_3_to_6
import c7_months_7_to_12
import c7_months_8_to_12
import c7_months_9_to_12

all_c7_topics = []
all_c7_topics.extend(c7_months_1_to_6.months_1_to_6)
all_c7_topics.extend(c7_months_3_to_6.months_3_to_6)
all_c7_topics.extend(c7_months_7_to_12.months_7_to_12)
all_c7_topics.extend(c7_months_8_to_12.months_8_to_12)
all_c7_topics.extend(c7_months_9_to_12.months_9_to_12)

print(f"Total Class 7 raw topics loaded: {len(all_c7_topics)}")
assert len(all_c7_topics) == 36, f"Expected 36 topics, got {len(all_c7_topics)}"

# Check distribution of months and sequence numbers
month_counts = Counter(t['month'] for t in all_c7_topics)
print("Month distribution:")
for m in range(1, 13):
    count = month_counts[m]
    print(f"  Month {m:02d}: {count} modules")
    assert count == 3, f"Month {m} has {count} modules instead of 3"
    m_topics = [t for t in all_c7_topics if t['month'] == m]
    seqs = [t['seq'] for t in m_topics]
    assert seqs == [1, 2, 3], f"Month {m} has seqs {seqs} instead of [1, 2, 3]"

# Check domain distribution
cat_counts = Counter(t['cat'] for t in all_c7_topics)
print("\nDomain distribution for Class 7:")
for cat, count in sorted(cat_counts.items()):
    print(f"  {cat}: {count}")

freqs = sorted(cat_counts.values())
assert freqs == [4, 4, 4, 4, 5, 5, 5, 5], f"Expected four 4s and four 5s, got {freqs}"
print("\nDomain distribution matches requirements: exactly four 5s and four 4s!")

# Check uniqueness of titles within Class 7
titles = [t['title'] for t in all_c7_topics]
assert len(set(titles)) == 36, f"Duplicate titles found in Class 7: {len(titles) - len(set(titles))}"

# Check cross-class uniqueness against Class 4, Class 5, and Class 6
with open("packages/core/src/skills-engine/modules/class-4.ts", "r", encoding="utf-8") as f:
    c4_text = f.read()

with open("packages/core/src/skills-engine/modules/class-5.ts", "r", encoding="utf-8") as f:
    c5_text = f.read()

with open("packages/core/src/skills-engine/modules/class-6.ts", "r", encoding="utf-8") as f:
    c6_text = f.read()

c4_titles = set(re.findall(r'"title": "([^"]+)"', c4_text))
c5_titles = set(re.findall(r'"title": "([^"]+)"', c5_text))
c6_titles = set(re.findall(r'"title": "([^"]+)"', c6_text))
print(f"Loaded {len(c4_titles)} titles from Class 4, {len(c5_titles)} from Class 5, {len(c6_titles)} from Class 6.")

for t in titles:
    assert t not in c4_titles, f"Title duplicate between Class 7 and Class 4: '{t}'"
    assert t not in c5_titles, f"Title duplicate between Class 7 and Class 5: '{t}'"
    assert t not in c6_titles, f"Title duplicate between Class 7 and Class 6: '{t}'"

print("Zero title duplicates against Class 4, Class 5, and Class 6! Uniqueness verified.")

# Generate module objects
c7_modules = []
for t in all_c7_topics:
    mod = create_module(t, class_num=7, stage="developing_independence")
    c7_modules.append(mod)

print(f"Successfully generated {len(c7_modules)} modules for Class 7.")

# Output packages/core/src/skills-engine/modules/class-7.ts
ts_code = 'import { LifeSkillCurriculumModule } from "../curriculum-types";\n\n'
ts_code += '/**\n * Class 7 Life Skills Curriculum - 36 Modules across 12 Months\n'
ts_code += ' * Stage: Developing Independence (Classes 6-7)\n */\n'
ts_code += 'export const CLASS_7_MODULES: LifeSkillCurriculumModule[] = '
ts_code += json.dumps(c7_modules, indent=2) + ';\n'

output_path = "packages/core/src/skills-engine/modules/class-7.ts"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(ts_code)

print(f"Successfully wrote {output_path} ({os.path.getsize(output_path)} bytes).")
