# scratch/verify_c9_all.py
import sys
from collections import Counter
sys.path.insert(0, 'scratch')

from c9_months_1_to_4 import months_1_to_4
from c9_months_5_to_8 import months_5_to_8
from c9_months_9_to_12 import months_9_to_12

all_c9 = months_1_to_4 + months_5_to_8 + months_9_to_12

print(f"Total Class 9 modules: {len(all_c9)}")
assert len(all_c9) == 36, f"Expected 36, got {len(all_c9)}"

# Check months and seqs
month_seqs = {}
for m in all_c9:
    month = m['month']
    seq = m['seq']
    month_seqs.setdefault(month, []).append(seq)

for mo in range(1, 13):
    seqs = month_seqs.get(mo, [])
    assert seqs == [1, 2, 3], f"Month {mo} has invalid seqs: {seqs}"
print("All 12 months have exact sequences [1, 2, 3]! PASS")

# Check domain distribution
counts = Counter(m['cat'] for m in all_c9)
freqs = sorted(list(counts.values()))
print(f"Domain distribution: {counts}")
print(f"Frequencies: {freqs}")
assert freqs == [4, 4, 4, 4, 5, 5, 5, 5], f"Expected [4, 4, 4, 4, 5, 5, 5, 5], got {freqs}"
print("Domain frequency profile [4, 4, 4, 4, 5, 5, 5, 5] matches perfectly! PASS")

# Check required fields and refs length
for i, m in enumerate(all_c9):
    title = m.get('title', f"Index {i}")
    refs = m.get('refs', [])
    assert len(refs) >= 4, f"Module '{title}' has {len(refs)} refs (< 4)"
    checklist = m.get('checklist', [])
    assert len(checklist) >= 4, f"Module '{title}' has {len(checklist)} checklist items"
    mistakes = m.get('mistakes', [])
    assert len(mistakes) >= 2, f"Module '{title}' has {len(mistakes)} mistakes"
print("All 36 modules have >= 4 refs, valid checklists and mistakes! PASS")
