// Records a built JAR in public/downloads/releases.json (newest first); the download page reads that file.
// Usage: node scripts/write-release-manifest.mjs <jarPath> <version> <minecraft> <fabricApi> [testResultsDir]
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'

const [jarPath, version, minecraft, fabricApi, testDir] = process.argv.slice(2)
if (!jarPath || !version || !minecraft || !fabricApi) {
  console.error('Usage: node scripts/write-release-manifest.mjs <jarPath> <version> <minecraft> <fabricApi> [testResultsDir]')
  process.exit(1)
}

function summarizeTests(dir) {
  const summary = { total: 0, failed: 0 }
  if (!dir || !existsSync(dir)) return summary
  for (const file of readdirSync(dir).filter((name) => name.endsWith('.xml'))) {
    const suite = readFileSync(join(dir, file), 'utf8').match(/<testsuite\b[^>]*>/)?.[0] ?? ''
    const count = (attribute) => Number(suite.match(new RegExp(`\\b${attribute}="(\\d+)"`))?.[1] ?? 0)
    summary.total += count('tests')
    summary.failed += count('failures') + count('errors')
  }
  return summary
}

const jar = readFileSync(jarPath)
const release = {
  version,
  file: basename(jarPath),
  bytes: jar.length,
  sha256: createHash('sha256').update(jar).digest('hex'),
  builtAt: new Date().toISOString(),
  tests: summarizeTests(testDir),
}

const manifestPath = join(dirname(jarPath), 'releases.json')
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : { releases: [] }
manifest.minecraft = minecraft
manifest.fabricApi = fabricApi
manifest.releases = [release, ...manifest.releases.filter((entry) => entry.version !== version)]
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)

console.log(
  `[build-mod] Published ${release.file} (${release.bytes} bytes, sha256 ${release.sha256.slice(0, 12)}, ` +
    `tests: ${release.tests.total} run, ${release.tests.failed} failed)`,
)
