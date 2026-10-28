import urllib.request
import sys

endpoints = [
    "http://localhost:3000/admin/life-skills?preview=1",
    "http://localhost:3000/skills?class=4",
    "http://localhost:3000/skills?class=5",
    "http://localhost:3000/skills?class=6",
    "http://localhost:3000/skills?class=7",
    "http://localhost:3000/skills?class=8",
    "http://localhost:3000/skills?class=9",
]

all_ok = True
for url in endpoints:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            print(f"[{resp.status}] {url}")
            if resp.status != 200:
                all_ok = False
    except Exception as e:
        print(f"[FAIL] {url} -> {e}")
        all_ok = False

if all_ok:
    print("\nALL 7 ENDPOINTS RETURNED HTTP 200 OK!")
else:
    sys.exit(1)
