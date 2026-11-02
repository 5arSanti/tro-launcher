#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
out=$(npx remotion compositions)
python3 - "$out" <<'PY'
import json, re, sys
from pathlib import Path
out = sys.argv[1]
print(out)
expected = json.loads(Path("scripts/expected-compositions.json").read_text())
found = {}
for line in out.splitlines():
    m = re.search(r'(Escena\d+|Completo)\s+\d+\s+\d+x\d+\s+(\d+)', line)
    if m:
        found[m.group(1)] = int(m.group(2))
missing = [e["id"] for e in expected if e["id"] not in found]
extra = [k for k in found if k not in {e["id"] for e in expected}]
bad = [
    f"{e['id']}: got {found.get(e['id'])} expected {e['frames']}"
    for e in expected
    if found.get(e["id"]) != e["frames"]
]
if missing or extra or bad:
    print("FAIL compositions")
    if missing:
        print("  missing", missing)
    if extra:
        print("  extra", extra)
    for b in bad:
        print(" ", b)
    sys.exit(1)
print("PASS compositions", len(expected))
PY
