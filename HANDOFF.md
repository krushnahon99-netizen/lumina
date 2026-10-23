# Echo Technology — Handoff (READ THIS FIRST)

Single source of truth for continuing this project. Any assistant (v0, Claude, ChatGPT, ...) must read
this whole file before editing code, then continue from **Next step**.
Update it at the **start** of every checkpoint (mark `IN PROGRESS` + files you plan to touch) and at the
**end** (mark `DONE` + date + one-line build result). That way an interrupted session — for example,
credits running out mid-turn — is always visible to the next assistant.

## Resume prompt (user: paste this into the next chat)

> Continue the Echo Technology Minecraft mod (Fabric, Minecraft 1.21.1). Get the code from the last v0 chat
> that worked on it (I'll paste its link) or from GitHub repo `krushnahon99-netizen/krushna` (newest `v0/*`
> branch first, then `main`). Read `HANDOFF.md` in the project root first, run `bash scripts/setup-java.sh`,
> check the last checkpoint still builds with `bash scripts/build-mod.sh`, then continue from "Next step".
> Update HANDOFF.md after every checkpoint. Do not change the Minecraft version, loader, mod ID, or package.

## Repositories

| Repo | Role |
|---|---|
| `krushnahon99-netizen/krushna` (public) | **Use this one from now on.** The second v0 chat (`nRAvhOlhhjF`) pushed the CP1 source here (merged into `main`, commit `7a2c04e`). The third v0 chat finished CP1 but was **not connected to GitHub**; connect it (or the next chat) to `krushna` so v0 pushes to a `v0/*` branch. |
| `krushnahon99-netizen/echo-8n` (public) | First v0 chat: CP0 only (this file + `scripts/setup-java.sh`). Superseded by `krushna`. |
| `krushnahon99-netizen/echo` (public) | Earlier attempt from 2026-10-22. **Not imported**: the user asked to stay inside this project. |

### Earlier attempt (`krushnahon99-netizen/echo`, folder `echo-technology/`)

- 44 Java files in the same architecture: `registry/`, `block/`, `block/entity/`, `energy/` (`EchoEnergyStorage`,
  `EnergyTransfer`, `EnergyNode`, `EnergyDistribution`), `machine/` (`ReactorCore`, `FabricatorCore`,
  `ChargerCore`), `recipe/`, `screen/` handlers, client screens, `item/` (`EchoDrillItem`, `EchoScannerItem`,
  `UpgradeItem`, `ChargeableItem`), `upgrade/`, `config/`, and an `EchoConduitBlock`. Includes a Gradle 8.14.3
  wrapper. No tests.
- Its own handoff says the skeleton built once; everything after that was written but never compiled, and the
  build was left **broken** (missing referenced classes). Resources contain only `fabric.mod.json`: no textures,
  models, blockstates, lang, recipes, or loot tables. No JAR was produced.
- Its versions: Loom 1.11.8, Gradle 8.14.3, Yarn 1.21.1+build.3, Loader 0.16.14, Fabric API 0.116.7+1.21.1.
  Not reviewed in this repo yet; treat all of it as unverified.

## Project in one paragraph

Fabric mod for Minecraft Java **1.21.1**, mod ID `echo_technology`, package `com.echotechnology`.
Dark sculk-tech style with cyan energy. Core loop: craft the **Echo Reactor** -> burn fuel -> **Echo Energy (EE)**
-> pushed into adjacent machines -> **Echo Fabricator** makes components -> **tools** and **upgrades**.
The user has **no PC** and plays Java Edition through a mobile launcher, so every checkpoint must end with a
downloadable `.jar`. The credit budget is small: work in verified steps, avoid redundant builds.

## Verified configuration (checked 2026-10-23 against meta.fabricmc.net / maven.fabricmc.net)

| Component | Version | Notes |
|---|---|---|
| Minecraft | 1.21.1 | fixed |
| Java | 21 | sandbox: Amazon Corretto 21.0.12.1 installed by `scripts/setup-java.sh` |
| Yarn mappings | 1.21.1+build.3 | latest for 1.21.1 |
| Fabric Loader (dev) | 0.19.5 | latest stable; `fabric.mod.json` should require `>=0.16.0` so older launcher installs work |
| Fabric API | 0.116.17+1.21.1 | latest build for 1.21.1 |
| Fabric Loom | 1.11.8 | its Gradle module metadata requires Gradle API 8.14 |
| Gradle wrapper | 8.14.3 | distribution URL responds 200 |

Confirmed by CP1: Loom 1.11.8 + Gradle 8.14.3 build this project (cold build 2m 7s, including Minecraft and
Fabric API downloads), and the JAR loads on a 1.21.1 dedicated server with Fabric API 0.116.17.

## Checkpoints

A checkpoint is `DONE` only after `scripts/build-mod.sh` succeeds and the JAR is in `public/downloads/`.
Mod version = `0.<checkpoint>.0` (CP1 -> 0.1.0), so the newest JAR is obvious on the phone. CP7 ships 1.0.0.

| # | Scope | Status |
|---|---|---|
| CP0 | Handoff system, sandbox inspection, version verification, JDK setup script | DONE (2026-10-23) |
| CP1 | Fabric project in `echo-technology/` (written fresh), `scripts/build-mod.sh`, every block and item registered with model/texture/lang/loot, first JAR, mobile download page | DONE (2026-10-23): 0.1.0 built, server smoke test PASS |
| CP2 | Energy API (`EnergyStorage` + interfaces, unit tests); Echo Reactor block entity: fuel slot, generation, NBT, screen with synced energy bar | TODO |
| CP3 | Push transfer to adjacent receivers; Echo Fabricator: inventory, 3+ recipes, energy per tick, progress bar, output-space checks, NBT, screen, tests | TODO |
| CP4 | Echo Drill + Echo Scanner (item energy, cooldowns, server-side checks); Echo Charger as the second powered machine | TODO |
| CP5 | Efficiency + Capacity upgrades wired into reactor/fabricator logic; all crafting recipes; upgrade tests | TODO |
| CP6 | Visual polish: final textures, GUI art, particles, lang, mod icon | TODO |
| CP7 | README, CHANGELOG, manual in-game checklist, final engineering report, version 1.0.0 | TODO |

Budget priority if credits run low: CP1 -> CP2 -> CP3 (minimum playable loop) -> CP4 -> CP5 -> CP6 -> CP7.

The earlier attempt in `krushnahon99-netizen/echo` was not imported, so write CP2-CP5 fresh in this project
unless the user says otherwise.

## Next step

**CP2 — TODO, start here.** CP1 is DONE (see the session log). Before coding, ask the user whether 0.1.0 starts
on their phone: the client side (models, textures, creative tab) has not been seen in-game yet.

CP2 plan (version `0.2.0`):
1. `echo-technology/gradle.properties`: set `mod_version=0.2.0`.
2. Energy API in `com.echotechnology.energy`: an `EnergyStorage` (long amount, capacity, max insert/extract,
   clamping, simulate-then-commit) plus provider/receiver interfaces. JUnit 5 unit tests: add the JUnit
   dependencies and `test { useJUnitPlatform() }` to `build.gradle`; `build-mod.sh` already reports test counts.
3. Echo Reactor block entity (registered in a new `ModBlockEntities`): one fuel slot that accepts furnace
   fuels, EE per tick while burning, energy + burn time + inventory saved in NBT (see the pitfalls below).
4. Reactor screen: screen handler opened with a `BlockPos` packet codec, energy synced as two 16-bit halves,
   client screen with an energy bar and burn indicator. This needs the first client entrypoint
   (`src/client/java` + `"client"` in `fabric.mod.json`) and a GUI texture from `gen-textures.mjs`.
5. Add a reactor command to `COMMANDS` in `scripts/smoke-test-server.sh` (for example
   `data get block 0 100 0` after placing it), update `lib/mod-info.ts` (0.2.0 notes, content details), then
   run `build-mod.sh` and `smoke-test-server.sh`, and update this file.

## Locked design decisions (change only with a written reason here)

- **Energy unit:** Echo Energy (EE), stored as `long`, always clamped to `[0, capacity]`. Own minimal API in
  `com.echotechnology.energy`; no Team Reborn Energy dependency, so the player only needs Fabric API.
- **Transfer:** push-based. Each server tick, a provider offers energy to adjacent receivers:
  `min(provider extract limit, receiver insert limit, stored)`. Simulate first, then commit, so energy is never
  created or destroyed. Skip neighbours in unloaded chunks or with removed block entities.
- **Server authority:** all machine processing runs in the server-side block entity tick; tools validate energy
  and cooldowns on the server.
- **Persistence:** every machine saves energy, inventory, progress, burn time, and upgrades in NBT.
- **Textures:** original 16x16 pixel art produced by a Node script (`echo-technology/tools/gen-textures.mjs`,
  created in CP1; uses only built-in `zlib`). Palette: slate `#0b1418`, sculk teal `#0f3b44`,
  metal `#2a3a40`, cyan energy `#29dfeb`, highlight `#b8fbff`. Generated PNGs are committed.
- **Build rule:** never run Gradle inside the saved project folder. `scripts/build-mod.sh` rsyncs
  `echo-technology/` to `/tmp/echo-build` (excluding `build/`, `.gradle/`, `run/`), runs
  `./gradlew build` there, then copies back only the JAR and a short test summary. This keeps thousands of
  Gradle cache files out of v0's saved versions.

## Minecraft 1.21.1 pitfalls (avoid mixing APIs from other versions)

- Use `Identifier.of("echo_technology", "name")`; the `Identifier` constructor is private since 1.21.
- Data folders are singular since 1.21: `data/<ns>/recipe/`, `loot_table/blocks/`, `tags/block/`, `tags/item/`.
- Recipe results use `"id"`: `"result": { "id": "echo_technology:echo_reactor", "count": 1 }`.
- Item stack data (for example tool energy) uses data components (a custom `ComponentType` with codec + packet
  codec registered in `Registries.DATA_COMPONENT_TYPE`), not raw stack NBT.
- Block entity `writeNbt`/`readNbt` and `Inventories.writeNbt`/`readNbt` take a `RegistryWrapper.WrapperLookup`.
- Screen property sync packets are 16-bit: send energy as low/high 16-bit halves through the
  `PropertyDelegate` (or custom data), never as one raw int.
- Fabric `ExtendedScreenHandlerType` takes a `PacketCodec` for opening data (for example `BlockPos.PACKET_CODEC`).
- Blocks need a loot table to drop themselves and a `minecraft:mineable/pickaxe` tag entry.
- Tutorials that use `new Identifier(...)`, plural `recipes/` folders, or `"item"` in recipe results target
  older versions; do not copy them as-is.

## Getting the JAR onto the phone

- Every checkpoint copies the JAR to `public/downloads/echo_technology-<version>.jar`; the page at `/` shows a
  download button. Open the v0 preview on the phone, or publish the project for a permanent link.
- The player also needs Fabric Loader for 1.21.1 (installed through the mobile launcher) and
  Fabric API 0.116.17+1.21.1 (from Modrinth) in the same `mods` folder.

## Where progress is saved

1. **v0 versions:** v0 saves the project after every turn in this chat. Returning to this chat (even after
   credits refill) continues exactly where work stopped.
2. **This file:** what is done, what is next, decisions, and pitfalls, for any assistant.
3. **v0 memory:** a note in the user's v0 memory points future v0 chats to this project and protocol.
4. **GitHub:** public repo `krushnahon99-netizen/krushna` holds the CP1 source from the second chat. The third
   chat (CP1 build, smoke test, download page) is not connected to GitHub; once a chat is connected, v0 pushes
   every turn to a `v0/*` branch that anyone can read without logging in. A GitHub Actions workflow could be
   added later to build the JAR in the cloud.
5. **Last good JAR:** `public/downloads/` always keeps the latest working build, so an unfinished checkpoint never
   costs the user a playable version.

## Rules for every assistant

1. Keep MC 1.21.1, Fabric, mod ID `echo_technology`, package `com.echotechnology`.
2. One checkpoint at a time; update this file at its start and end (status board, file map, session log).
3. Report status only as: Implemented / Compiled / Unit-tested / Tested in-game / Not tested.
   Never invent build output. The mod has not been launched in Minecraft unless the session log says so.
4. Build only with `scripts/build-mod.sh`, then run `scripts/smoke-test-server.sh`. Read the full error, fix
   the root cause, rerun.
   After 3 failed attempts on one issue, simplify that feature and record exactly what changed.
5. Never silently drop a required feature; record any reduction under Known issues.
6. Use targeted edits and short reports — the user's budget is small.

## File map

| Path | Purpose | Status |
|---|---|---|
| `HANDOFF.md` | This file | exists |
| `scripts/setup-java.sh` | Idempotent JDK 21 install; run at the start of every session | exists, tested |
| `.gitignore` | Ignores `echo-technology/` Gradle outputs | exists |
| `scripts/build-mod.sh` | Build in `/tmp`, run tests, copy JAR to `public/downloads/`, copy textures to `public/mod/` | exists, tested |
| `scripts/write-release-manifest.mjs` | Adds the JAR (size, sha256, tests) to `public/downloads/releases.json` | exists, tested |
| `scripts/smoke-test-server.sh` | Headless 1.21.1 server with the mod + console checks; writes the result to `releases.json` | exists, tested |
| `echo-technology/` | The Fabric mod Gradle project; `tools/gen-textures.mjs` makes all PNGs | exists, builds |
| `public/downloads/` | Every built JAR + `releases.json` (newest first), read by the page | 0.1.0 |
| `public/mod/` | Copies of the mod textures and icon for the page (written by `build-mod.sh`) | exists |
| `app/page.tsx`, `components/`, `lib/` | Mobile download page; `lib/mod-info.ts` holds content, roadmap, Fabric API link | exists, browser-checked |

## Known issues / blockers

- Client side not seen in-game yet: models, blockstates, textures, lang, and the creative tab are only checked by
  file references and the build. The server smoke test does not load client assets.
- No crafting recipes yet (Fabricator recipes in CP3, all recipes in CP5): items come from Creative mode only.
- The download page links Fabric API `0.116.17+1.21.1` directly (`lib/mod-info.ts`); update it together with
  `fabric_version`.
- Third v0 chat is not connected to GitHub (see Repositories).

## Session log (newest first)

- 2026-10-23 — CP1 DONE (third v0 chat) — Imported every file from the second chat. `gen-textures.mjs`: 12
  textures + icon, all model texture references resolve. `build-mod.sh`: BUILD SUCCESSFUL on the first try
  (2m 7s cold, no compile errors), `echo_technology-0.1.0.jar` 21,990 bytes, sha256 `f66d7d97a5e8...`, 0 unit
  tests (none written yet). New `smoke-test-server.sh` (Loom `runServer`, flat world): 44 mods loaded, "Echo
  Technology loaded", `setblock` with `facing=east`, `#minecraft:mineable/pickaxe` match, all 3 loot tables drop
  their block, clean log: PASS. Download page built and checked in a browser at 390 and 360 px (11 textures
  load, no horizontal scroll, JAR served as `application/java-archive`). Status: Implemented, Compiled,
  server smoke-tested; Not tested in-game.
- 2026-10-23 — GitHub check — User connected public repo `krushnahon99-netizen/echo-8n`. Verified without
  logging in: the repo is public, `main` @ 65a9026 matches v0, raw `HANDOFF.md` returns HTTP 200, no `.env` or
  secret files are tracked (`.env*.local` is ignored), and v0 memory is not in the repo. Found the earlier
  attempt in `krushnahon99-netizen/echo` and revised CP1 to import it. Work continues on branch `v0/echo-technology`.
- 2026-10-23 — CP0 — Inspected sandbox: Amazon Linux 2023 x86_64, 2 CPUs, 4 GB RAM, 61 GB free disk, sudo + dnf
  available, network to Fabric, Mojang, Gradle, and Adoptium OK, Java missing. Verified versions above.
  Added `scripts/setup-java.sh` (installed Corretto 21.0.12.1; a second run confirmed it is idempotent) and
  Gradle ignores in `.gitignore`. No mod code exists yet.
