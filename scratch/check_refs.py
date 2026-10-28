import sys, os
sys.path.insert(0, os.path.abspath('scratch'))
import c8_months_1_to_4, c8_months_5_to_8, c8_months_9_to_12

all_topics = c8_months_1_to_4.months_1_to_4 + c8_months_5_to_8.months_5_to_8 + c8_months_9_to_12.months_9_to_12
for i, t in enumerate(all_topics):
    r_len = len(t.get('refs', []))
    if r_len < 4:
        print(f"Topic {i+1}: M{t['month']} S{t['seq']} '{t['title']}' has only {r_len} refs: {t.get('refs')}")
