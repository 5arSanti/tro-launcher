#!/usr/bin/env bash
set -euo pipefail

FILE=${1:?uso: probe-mp4.sh archivo.mp4 [1920x1080] [30] [segundos]}
WH=${2:-1920x1080}
FPS=${3:-30}
SEC=${4:-}

if [[ ! -f "$FILE" ]]; then
  echo "no existe: $FILE" >&2
  exit 1
fi

W=${WH%x*}
H=${WH#*x}

probe() {
  ffprobe -v error -select_streams v:0 -show_entries "$1" -of default=nw=1:nk=1 "$FILE"
}

width=$(probe stream=width)
height=$(probe stream=height)
fps_raw=$(probe stream=r_frame_rate)
codec=$(probe stream=codec_name)
pix=$(probe stream=pix_fmt)
dur=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$FILE")
n_audio=$(ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$FILE" | wc -l)

fps=$(python3 - <<PY
num, den = "${fps_raw}".split("/")
print(round(float(num)/float(den), 4) if float(den) else float(num))
PY
)

ok=1
check() {
  local name=$1 got=$2 exp=$3
  if [[ "$got" != "$exp" ]]; then
    echo "FAIL $name: got $got expected $exp"
    ok=0
  else
    echo "OK   $name: $got"
  fi
}

check width "$width" "$W"
check height "$height" "$H"
check codec "$codec" "h264"
check pix_fmt "$pix" "yuv420p"

python3 - <<PY
fps=float("$fps")
exp=float("$FPS")
ok = abs(fps-exp) < 0.05
print(("OK  " if ok else "FAIL") + f" fps: {fps} expected {exp}")
raise SystemExit(0 if ok else 1)
PY
fps_ok=$?
if [[ $fps_ok -ne 0 ]]; then ok=0; fi

if [[ -n "$SEC" ]]; then
  python3 - <<PY
dur=float("$dur")
exp=float("$SEC")
ok = abs(dur-exp) < 0.08
print(("OK  " if ok else "FAIL") + f" duration: {dur:.3f}s expected {exp}s")
raise SystemExit(0 if ok else 1)
PY
  if [[ $? -ne 0 ]]; then ok=0; fi
else
  echo "INFO duration: ${dur}s"
fi

if [[ "$n_audio" -ne 0 ]]; then
  echo "FAIL audio streams: $n_audio (expected 0)"
  ok=0
else
  echo "OK   audio: none"
fi

if [[ $ok -ne 1 ]]; then
  exit 1
fi
echo "PASS $FILE"
