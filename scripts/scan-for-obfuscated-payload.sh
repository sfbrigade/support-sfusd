#!/usr/bin/env bash
# Guards against the postcss.config.js obfuscated-payload incident recurring
# (see the September 2026 security incident report).
#
# Two checks:
#   1. Known signature match — catches the exact payload if it reappears.
#   2. Generic long-line heuristic — catches variants of the same trick
#      (the payload is concealed by padding thousands of spaces after
#      legitimate-looking code on one line, so it's invisible without
#      scrolling horizontally).
#
# Exits non-zero (failing CI) if either check trips.

set -euo pipefail

FAIL=0

# Files/dirs that legitimately contain long lines and should be skipped.
EXCLUDE_ARGS=(
  ':!package-lock.json'
  ':!yarn.lock'
  ':!pnpm-lock.yaml'
  ':!*.min.js'
  ':!*.map'
  ':!public/*'
  ':!.next/*'
  ':!node_modules/*'
  ':!prisma/schools.json'
  ':!scripts/scan-for-obfuscated-payload.sh'
)

echo "== Check 1: known obfuscator signature =="
if git grep -lI -e '_\$_35f2' -e 'jsjiami' -e '_\$jsoToArr' -- . "${EXCLUDE_ARGS[@]}" 2>/dev/null; then
  echo "FAIL: found the known malicious payload signature in the files above."
  FAIL=1
else
  echo "OK: no known signature found."
fi

echo ""
echo "== Check 2: suspiciously long lines in tracked source/config files =="
# Any single line over this length in a config/source file is not normal
# hand-written code — it's the concealment technique this payload used.
MAX_LINE_LEN=2000
LONG_LINE_HITS=""
while IFS= read -r -d '' file; do
  longest=$(awk '{ print length }' "$file" 2>/dev/null | sort -rn | head -1)
  if [ -n "${longest:-}" ] && [ "$longest" -gt "$MAX_LINE_LEN" ]; then
    LONG_LINE_HITS="${LONG_LINE_HITS}${file} (longest line: ${longest} chars)\n"
  fi
done < <(git ls-files -z -- '*.js' '*.jsx' '*.ts' '*.tsx' '*.mjs' '*.cjs' "${EXCLUDE_ARGS[@]}")

if [ -n "$LONG_LINE_HITS" ]; then
  echo "FAIL: found suspiciously long lines (>${MAX_LINE_LEN} chars) in:"
  printf "%b" "$LONG_LINE_HITS"
  FAIL=1
else
  echo "OK: no suspiciously long lines found."
fi

exit $FAIL
