# scratch/build_class_9_final.py
import sys
import json
import os
from collections import Counter
import re

sys.path.insert(0, os.path.abspath("scratch"))
from test_dict_mod import create_module
import c9_months_1_to_4
import c9_months_5_to_8
import c9_months_9_to_12

all_c9_topics = []
all_c9_topics.extend(c9_months_1_to_4.months_1_to_4)
all_c9_topics.extend(c9_months_5_to_8.months_5_to_8)
all_c9_topics.extend(c9_months_9_to_12.months_9_to_12)

print(f"Total Class 9 raw topics loaded: {len(all_c9_topics)}")
assert len(all_c9_topics) == 36, f"Expected 36 topics, got {len(all_c9_topics)}"

# Check distribution of months and sequence numbers
month_counts = Counter(t['month'] for t in all_c9_topics)
print("Month distribution:")
for m in range(1, 13):
    count = month_counts[m]
    print(f"  Month {m:02d}: {count} modules")
    assert count == 3, f"Month {m} has {count} modules instead of 3"
    m_topics = [t for t in all_c9_topics if t['month'] == m]
    seqs = [t['seq'] for t in m_topics]
    assert seqs == [1, 2, 3], f"Month {m} has seqs {seqs} instead of [1, 2, 3]"

# Check domain distribution
cat_counts = Counter(t['cat'] for t in all_c9_topics)
print("\nDomain distribution for Class 9:")
for cat, count in sorted(cat_counts.items()):
    print(f"  {cat}: {count}")

freqs = sorted(cat_counts.values())
assert freqs == [4, 4, 4, 4, 5, 5, 5, 5], f"Expected four 4s and four 5s, got {freqs}"
print("\nDomain distribution matches requirements: exactly four 5s and four 4s!")

# Check uniqueness of titles within Class 9
titles = [t['title'] for t in all_c9_topics]
assert len(set(titles)) == 36, f"Duplicate titles found in Class 9: {len(titles) - len(set(titles))}"

# Check cross-class uniqueness against Class 4, Class 5, Class 6, Class 7, and Class 8
with open("packages/core/src/skills-engine/modules/class-4.ts", "r", encoding="utf-8") as f:
    c4_text = f.read()

with open("packages/core/src/skills-engine/modules/class-5.ts", "r", encoding="utf-8") as f:
    c5_text = f.read()

with open("packages/core/src/skills-engine/modules/class-6.ts", "r", encoding="utf-8") as f:
    c6_text = f.read()

with open("packages/core/src/skills-engine/modules/class-7.ts", "r", encoding="utf-8") as f:
    c7_text = f.read()

with open("packages/core/src/skills-engine/modules/class-8.ts", "r", encoding="utf-8") as f:
    c8_text = f.read()

c4_titles = set(re.findall(r'"title": "([^"]+)"', c4_text))
c5_titles = set(re.findall(r'"title": "([^"]+)"', c5_text))
c6_titles = set(re.findall(r'"title": "([^"]+)"', c6_text))
c7_titles = set(re.findall(r'"title": "([^"]+)"', c7_text))
c8_titles = set(re.findall(r'"title": "([^"]+)"', c8_text))
print(f"Loaded {len(c4_titles)} from C4, {len(c5_titles)} from C5, {len(c6_titles)} from C6, {len(c7_titles)} from C7, {len(c8_titles)} from C8.")

for t in titles:
    assert t not in c4_titles, f"Title duplicate between Class 9 and Class 4: '{t}'"
    assert t not in c5_titles, f"Title duplicate between Class 9 and Class 5: '{t}'"
    assert t not in c6_titles, f"Title duplicate between Class 9 and Class 6: '{t}'"
    assert t not in c7_titles, f"Title duplicate between Class 9 and Class 7: '{t}'"
    assert t not in c8_titles, f"Title duplicate between Class 9 and Class 8: '{t}'"

print("Zero title duplicates against Class 4, 5, 6, 7, and 8! Uniqueness verified.")

# Generate module objects
c9_modules = []
for t in all_c9_topics:
    mod = create_module(t, class_num=9, stage="applied_responsibility")
    c9_modules.append(mod)

print(f"Successfully generated {len(c9_modules)} modules for Class 9.")

# Output packages/core/src/skills-engine/modules/class-9.ts
ts_code = 'import { LifeSkillCurriculumModule } from "../curriculum-types";\n\n'
ts_code += '/**\n * Class 9 Life Skills Curriculum - 36 Modules across 12 Months\n'
ts_code += ' * Stage: Applied Responsibility (Classes 8-9)\n */\n'
ts_code += 'export const CLASS_9_MODULES: LifeSkillCurriculumModule[] = '
ts_code += json.dumps(c9_modules, indent=2) + ';\n'

output_path = "packages/core/src/skills-engine/modules/class-9.ts"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(ts_code)

print(f"Successfully wrote {output_path} ({os.path.getsize(output_path)} bytes).")
