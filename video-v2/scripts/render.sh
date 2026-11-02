#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

COMP=${1:-Escena07}
OUT=${2:-out/${COMP,,}.mp4}

mkdir -p out out/stills
npx remotion render "$COMP" "$OUT" \
  --codec=h264 \
  --pixel-format=yuv420p \
  --muted \
  --crf=18 \
  --gl=angle
