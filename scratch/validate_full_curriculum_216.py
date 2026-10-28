# scratch/validate_full_curriculum_216.py
import os
import re
import json
from collections import Counter

modules_dir = "packages/core/src/skills-engine/modules"
class_files = [f"class-{c}.ts" for c in range(4, 10)]

total_modules = 0
all_titles = []
all_ids = []
domain_counts_by_class = {}
banned_keywords = [
    "kanji", "hiragana", "katakana", "chinese language", "mandarin", "pinyin",
    "python coding", "java programming", "javascript syntax", "c++ code", "scratch programming",
    "generative ai prompt", "train an ai", "neural network code", "robotics circuit", "arduino code",
    "microcontroller coding", "technical simulator"
]

print("=" * 80)
print("TALENTXCEL.NET — FULL CURRICULUM VALIDATION (216 MODULES, CLASSES 4-9)")
print("=" * 80)

for c_num, filename in enumerate(class_files, start=4):
    filepath = os.path.join(modules_dir, filename)
    assert os.path.exists(filepath), f"File missing: {filepath}"
    
    with open(filepath, "r", encoding="utf-8") as f:
        text = f.read()

    # Extract JSON array after `= [`
    eq_bracket = text.find("= [")
    assert eq_bracket != -1, f"Could not find '= [' in {filename}"
    json_start = eq_bracket + 2
    json_end = text.rfind("]") + 1
    
    modules = json.loads(text[json_start:json_end])
    count = len(modules)
    print(f"\nClass {c_num} ({filename}): {count} modules loaded.")
    assert count == 36, f"Class {c_num} has {count} modules, expected 36!"
    total_modules += count

    # Validate monthly distribution
    month_map = {}
    class_domains = Counter()
    for m in modules:
        # Check required keys
        assert m["classNumber"] == c_num, f"Wrong classNumber {m['classNumber']} in Class {c_num}"
        assert m["publicationStatus"] == "published"
        assert len(m["learningObjectives"]) >= 3
        assert len(m["stepByStep"]) >= 5
        assert len(m["commonMistakes"]) == 2
        assert len(m["decisionChecklist"]) >= 4
        assert len(m["reflectionPrompts"]) >= 4
        assert len(m["instructionalVisuals"]) == 2
        assert m["heroVisual"]["status"] == "ready"
        assert m["assessment"]["correctOptionId"] is not None
        assert len(m["rubric"]["criteria"]) == 3

        mo = m["month"]
        seq = m["sequenceNumber"]
        month_map.setdefault(mo, []).append(seq)
        
        all_ids.append(m["id"])
        all_titles.append(m["title"])
        class_domains[m["category"]] += 1

        # Check banned keywords
        full_text = json.dumps(m).lower()
        for kw in banned_keywords:
            if kw in full_text:
                print(f"WARNING: Banned keyword '{kw}' found in module {m['id']} ('{m['title']}')")

    # Verify months 1-12
    for mo in range(1, 13):
        seqs = sorted(month_map.get(mo, []))
        assert seqs == [1, 2, 3], f"Class {c_num} Month {mo} has sequences {seqs}, expected [1, 2, 3]"
    print(f"  All 12 months verified with exact sequence [1, 2, 3].")

    # Verify domain distribution
    domain_counts_by_class[c_num] = class_domains
    freqs = sorted(list(class_domains.values()))
    print(f"  Domain counts: {dict(class_domains)}")
    print(f"  Frequency profile: {freqs}")
    assert freqs == [4, 4, 4, 4, 5, 5, 5, 5], f"Class {c_num} domain distribution {freqs} != [4, 4, 4, 4, 5, 5, 5, 5]"

print("\n" + "=" * 80)
print("CURRICULUM UNIQUENESS & INTEGRITY AUDIT")
print("=" * 80)

print(f"Total modules verified: {total_modules} / 216")
assert total_modules == 216, f"Expected 216 total modules, got {total_modules}"

# Check ID uniqueness
id_counts = Counter(all_ids)
duplicate_ids = [k for k, v in id_counts.items() if v > 1]
print(f"Total Unique Module IDs: {len(set(all_ids))} / 216")
assert len(duplicate_ids) == 0, f"Duplicate IDs detected: {duplicate_ids}"

# Check Title uniqueness
title_counts = Counter(all_titles)
duplicate_titles = [k for k, v in title_counts.items() if v > 1]
print(f"Total Unique Module Titles: {len(set(all_titles))} / 216")
assert len(duplicate_titles) == 0, f"Duplicate Titles detected: {duplicate_titles}"

print("\n>>> ALL 216 MODULES ACROSS CLASSES 4-9 ARE FULLY AUTHORED, 100% UNIQUE, AND PASS ALL CHECKS! <<<")
