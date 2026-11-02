#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p out/stills

declare -A FRAMES=(
  [Escena01]=1050 [Escena02]=600 [Escena03]=1050 [Escena04]=1050
  [Escena05]=900 [Escena06]=1050 [Escena07]=2250 [Escena08]=1050
  [Escena09]=900 [Escena10]=900
)

n=1
for id in Escena01 Escena02 Escena03 Escena04 Escena05 Escena06 Escena07 Escena08 Escena09 Escena10; do
  dur=${FRAMES[$id]}
  last=$((dur - 1))
  mid=$((dur / 2))
  nn=$(printf '%02d' $n)
  npx remotion still "$id" "out/stills/escena${nn}-start.png" --frame=0 --gl=angle
  npx remotion still "$id" "out/stills/escena${nn}-mid.png" --frame="$mid" --gl=angle
  npx remotion still "$id" "out/stills/escena${nn}-end.png" --frame="$last" --gl=angle
  bash scripts/contact-sheet.sh "out/contact-sheet-escena${nn}.png" \
    "out/stills/escena${nn}-start.png" \
    "out/stills/escena${nn}-mid.png" \
    "out/stills/escena${nn}-end.png"
  n=$((n + 1))
done
