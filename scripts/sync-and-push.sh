#!/usr/bin/env bash
# Runs on the NUC, called by n8n over SSH (see docs/grist-sync.md).
# Pulls main, runs the Grist sync, and pushes if content/ changed. Cloudflare deploys the push.
# Safe to call many times in a row: runs wait for each other and only real changes are pushed.
# Each outcome Cass needs to see is logged to the Site_Sync table in Grist (scripts/grist-log.mjs).
set -euo pipefail
cd "$(dirname "$0")/.."

log() { node --env-file-if-exists=.env.local scripts/grist-log.mjs "$1" "$2" || true; }
trap 'log "Not published" "The sync stopped unexpectedly. Landon has the details by email."' ERR

exec 9>.git/sync.lock
flock 9

git checkout -q main
git pull -q --ff-only origin main
npm install --no-audit --no-fund --silent

if ! out=$(npm run -s sync:grist 2>&1); then
  trap - ERR
  echo "$out"
  log "Not published" "Nothing changed on the site. $out"
  exit 1
fi
echo "$out"
waiting=$(grep '^Waiting: ' <<<"$out" | sed 's/^Waiting: //' | paste -sd ';' - | sed 's/;/; /g' || true)

if [ -z "$(git status --porcelain content/)" ]; then
  echo "No content changes."
  [ -n "$waiting" ] && log "Not published" "Waiting on: $waiting"
  exit 0
fi
git add content/
git commit -q -m "Sync content from Grist"
git push -q origin main
sha=$(git log -1 --format=%h)
echo "Pushed: $sha"
if [ -n "$waiting" ]; then
  log "Published, some rows waiting" "Live on the site in a few minutes ($sha). Still waiting on: $waiting"
else
  log "Published" "Live on the site in a few minutes ($sha)."
fi
