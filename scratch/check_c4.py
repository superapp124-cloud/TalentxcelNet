import re

with open('packages/core/src/skills-engine/modules/class-4.ts', 'r', encoding='utf-8') as f:
    text = f.read()

titles = re.findall(r'"title":\s*"([^"]+)"', text)
print(f"Class 4 Titles Count: {len(titles)}")
for idx, t in enumerate(titles[:5]):
    print(f"  {idx + 1}. {t}")
