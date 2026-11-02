#!/usr/bin/env bash
set -euo pipefail

OUT=${1:?uso: contact-sheet.sh salida.png f1.png f2.png f3.png}
shift
ffmpeg -y -hide_banner -loglevel error \
  $(for f in "$@"; do printf -- '-i %s ' "$f"; done) \
  -filter_complex "hstack=inputs=$#" \
  "$OUT"
echo "wrote $OUT"
