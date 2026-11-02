#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p out

SECS=(35 20 35 35 30 35 75 35 30 30)
n=1
for id in Escena01 Escena02 Escena03 Escena04 Escena05 Escena06 Escena07 Escena08 Escena09 Escena10; do
  nn=$(printf '%02d' $n)
  sec=${SECS[$((n - 1))]}
  out="out/escena${nn}.mp4"
  echo "=== render $id → $out (${sec}s) ==="
  npx remotion render "$id" "$out" \
    --codec=h264 --pixel-format=yuv420p --muted --crf=18 --gl=angle
  bash scripts/probe-mp4.sh "$out" 1920x1080 30 "$sec"
  n=$((n + 1))
done

list=out/concat.txt
: > "$list"
for nn in 01 02 03 04 05 06 07 08 09 10; do
  echo "file 'escena${nn}.mp4'" >> "$list"
done
ffmpeg -y -hide_banner -loglevel error -f concat -safe 0 -i "$list" -c copy out/video-motion-v3.mp4
bash scripts/probe-mp4.sh out/video-motion-v3.mp4 1920x1080 30 360
echo "DONE"
