#!/usr/bin/env bash
# Builds the Echo Technology mod and publishes the JAR to public/downloads/ for phone download.
# Gradle runs in a copy under /tmp, so thousands of cache files never land in v0's saved project versions.
# Usage: bash scripts/build-mod.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MOD_DIR="$ROOT/echo-technology"
WORK_DIR="${ECHO_BUILD_DIR:-/tmp/echo-build}"
OUT_DIR="$ROOT/public/downloads"

bash "$ROOT/scripts/setup-java.sh"
if ! javac -version 2>&1 | grep -qE 'javac 21(\.|$)' && [ -x "$HOME/.jdks/temurin-21/bin/javac" ]; then
  export JAVA_HOME="$HOME/.jdks/temurin-21"
  export PATH="$JAVA_HOME/bin:$PATH"
fi

prop() { grep -E "^$1=" "$MOD_DIR/gradle.properties" | cut -d= -f2-; }
VERSION="$(prop mod_version)"
JAR_NAME="$(prop archives_base_name)-$VERSION.jar"

echo "[build-mod] Syncing echo-technology/ to $WORK_DIR"
mkdir -p "$WORK_DIR"
rsync -a --delete --exclude /build/ --exclude /.gradle/ --exclude /run/ "$MOD_DIR/" "$WORK_DIR/"
chmod +x "$WORK_DIR/gradlew"

echo "[build-mod] Building $JAR_NAME (full log: $WORK_DIR/build.log)"
LOG="$WORK_DIR/build.log"
if ! (cd "$WORK_DIR" && ./gradlew build --console=plain >"$LOG" 2>&1); then
  echo "[build-mod] BUILD FAILED"
  grep -nE "error:|What went wrong|Caused by|> Task .*FAILED" -A3 "$LOG" | head -n 150 || true
  echo "--- last lines ---"
  tail -n 25 "$LOG"
  exit 1
fi
grep -E "^BUILD SUCCESSFUL" "$LOG" || true

mkdir -p "$OUT_DIR"
cp "$WORK_DIR/build/libs/$JAR_NAME" "$OUT_DIR/$JAR_NAME"

# The download page shows the real in-game textures.
ASSETS="$MOD_DIR/src/main/resources/assets/echo_technology"
mkdir -p "$ROOT/public/mod"
rsync -a --delete "$ASSETS/textures/" "$ROOT/public/mod/textures/"
cp "$ASSETS/icon.png" "$ROOT/public/mod/icon.png"
node "$ROOT/scripts/write-release-manifest.mjs" "$OUT_DIR/$JAR_NAME" "$VERSION" \
  "$(prop minecraft_version)" "$(prop fabric_version)" "$WORK_DIR/build/test-results/test"
