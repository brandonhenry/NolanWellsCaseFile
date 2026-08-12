#!/bin/zsh
set -euo pipefail

project_dir=${0:A:h:h}
ffmpeg_bin=${FFMPEG_BIN:-/opt/homebrew/bin/ffmpeg}
work_dir=$(mktemp -d "${TMPDIR:-/tmp}/nolan-alternate-ride.XXXXXX")
trap 'rm -rf -- "$work_dir"' EXIT

clip_one="$project_dir/media/dispatch-audio/2026-07-05-1130-lake-mars-boat-launch-search.mp3"
clip_two="$project_dir/media/dispatch-audio/2026-07-05-1221-boat-ramp-status-biloxi.mp3"
output="$project_dir/media/dispatch-audio/alternate-ride-dispatch-evidence.mp4"
poster="$project_dir/assets/alternate-ride-dispatch-evidence-poster.jpg"
audio="$work_dir/alternate-ride-audio.m4a"

for required in "$ffmpeg_bin" "$clip_one" "$clip_two"; do
  if [[ ! -e "$required" ]]; then
    print -u2 "Missing required input: $required"
    exit 1
  fi
done

"$ffmpeg_bin" -hide_banner -loglevel warning -y \
  -i "$clip_one" \
  -f lavfi -t 0.75 -i 'anullsrc=r=48000:cl=stereo' \
  -i "$clip_two" \
  -filter_complex \
  "[0:a]atrim=start=3.72:end=43.02,asetpts=PTS-STARTPTS,aformat=sample_rates=48000:channel_layouts=stereo[a1];\
   [2:a]atrim=start=20.38:end=39.42,asetpts=PTS-STARTPTS,aformat=sample_rates=48000:channel_layouts=stereo[a2];\
   [a1][1:a][a2]concat=n=3:v=0:a=1,loudnorm=I=-16:LRA=7:TP=-1.5[a]" \
  -map '[a]' -c:a aac -b:a 192k "$audio"

"$ffmpeg_bin" -hide_banner -loglevel warning -y \
  -f lavfi -t 59.09 -i 'color=c=black:s=1080x1920:r=30' \
  -i "$audio" \
  -filter_complex \
  "[1:a]showwaves=s=900x420:mode=cline:colors=white:scale=sqrt:draw=full:rate=30[wave];\
   [0:v][wave]overlay=x=90:y=750:format=auto[v]" \
  -map '[v]' -map 1:a \
  -c:v libx264 -preset medium -crf 18 -profile:v high -level 4.1 -pix_fmt yuv420p \
  -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$output"

"$ffmpeg_bin" -hide_banner -loglevel warning -y \
  -ss 15 -i "$output" -frames:v 1 -update 1 -q:v 2 "$poster"

print "Rendered: $output"
print "Poster:   $poster"
