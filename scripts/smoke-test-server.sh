#!/usr/bin/env bash
# Boots a headless Minecraft dedicated server with the mod (Loom `runServer` in the /tmp build copy), runs
# console commands that touch the mod's blocks, block states, tags, and loot tables, then stops the server.
# Proves the mod loads and its data resolves on a real server. It does not test client rendering or textures.
# Usage: bash scripts/build-mod.sh && bash scripts/smoke-test-server.sh
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORK_DIR="${ECHO_BUILD_DIR:-/tmp/echo-build}"
LOG="$WORK_DIR/server-smoke.log"
MANIFEST="$ROOT/public/downloads/releases.json"
VERSION="$(grep -E '^mod_version=' "$ROOT/echo-technology/gradle.properties" | cut -d= -f2-)"
[ -x "$WORK_DIR/gradlew" ] || { echo "[smoke] Run scripts/build-mod.sh first"; exit 1; }

# Stores the result on this version's entry in releases.json so the download page shows it.
record_result() {
  [ -f "$MANIFEST" ] || return 0
  node -e '
    const fs = require("fs")
    const [file, version, result] = process.argv.slice(1)
    const manifest = JSON.parse(fs.readFileSync(file, "utf8"))
    const release = manifest.releases.find((entry) => entry.version === version)
    if (release) release.serverSmokeTest = { result, at: new Date().toISOString() }
    fs.writeFileSync(file, `${JSON.stringify(manifest, null, 2)}\n`)
  ' "$MANIFEST" "$VERSION" "$1"
}

# A fresh flat world per run keeps startup fast; an empty generator-settings value makes vanilla log an error.
mkdir -p "$WORK_DIR/run"
echo "eula=true" >"$WORK_DIR/run/eula.txt"
cat >"$WORK_DIR/run/server.properties" <<EOF
level-name=smoke-world-$(date +%s)
level-type=minecraft\:flat
generator-settings={"biome":"minecraft:plains","layers":[{"block":"minecraft:bedrock","height":1},{"block":"minecraft:stone","height":3}]}
online-mode=false
spawn-protection=0
view-distance=4
simulation-distance=4
EOF

COMMANDS=(
  "setblock 0 100 0 echo_technology:echo_reactor[facing=east]"
  "execute if block 0 100 0 echo_technology:echo_reactor[facing=east] run say smoke:blockstate-ok"
  "execute if block 0 100 0 #minecraft:mineable/pickaxe run say smoke:pickaxe-tag-ok"
  "loot spawn 0 102 0 loot echo_technology:blocks/echo_reactor"
  "loot spawn 0 102 0 loot echo_technology:blocks/echo_fabricator"
  "loot spawn 0 102 0 loot echo_technology:blocks/echo_charger"
)

: >"$LOG"
echo "[smoke] Starting server (log: $LOG)"
{
  for _ in $(seq 1 150); do
    grep -qE 'Done \(|BUILD FAILED|BUILD SUCCESSFUL' "$LOG" && break
    sleep 2
  done
  for command in "${COMMANDS[@]}"; do echo "$command"; sleep 1; done
  sleep 3
  echo "stop"
  for _ in $(seq 1 15); do grep -q 'Stopping server' "$LOG" && break; sleep 2; done
  sleep 5
  pkill -f KnotServer 2>/dev/null || true
} | (cd "$WORK_DIR" && timeout 420 ./gradlew runServer --console=plain >"$LOG" 2>&1)

grep -nE 'Loading [0-9]+ mods|Echo Technology loaded|Done \(|Changed the block|smoke:|Dropped|/ERROR\]|Exception|Unknown or incomplete|Incorrect argument|BUILD FAILED' "$LOG" | head -n 40

failures=0
for expected in 'Echo Technology loaded' 'Done \(' 'Changed the block' 'smoke:blockstate-ok' 'smoke:pickaxe-tag-ok'; do
  grep -qE "$expected" "$LOG" || { echo "[smoke] MISSING: $expected"; failures=$((failures + 1)); }
done
drops=$(grep -c 'Dropped' "$LOG" || true)
[ "$drops" -ge 3 ] || { echo "[smoke] Expected 3 loot drops, saw $drops"; failures=$((failures + 1)); }
if grep -qE '/ERROR\]|Exception|Unknown or incomplete|Incorrect argument' "$LOG"; then
  echo "[smoke] Errors in server log"
  failures=$((failures + 1))
fi

if [ "$failures" -eq 0 ]; then
  record_result pass
  echo "[smoke] PASS: $VERSION loaded on a 1.21.1 dedicated server; block, block state, tag, and 3 loot tables OK"
else
  record_result fail
  echo "[smoke] FAIL ($failures problem(s)); full log: $LOG"
  exit 1
fi
