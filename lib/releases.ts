import manifest from '@/public/downloads/releases.json'

export type Release = {
  version: string
  file: string
  bytes: number
  sha256: string
  builtAt: string
  tests: { total: number; failed: number }
  serverSmokeTest?: { result: string; at: string }
}

type ReleaseManifest = {
  minecraft: string
  fabricApi: string
  releases: Release[]
}

const releaseManifest: ReleaseManifest = manifest

export const minecraftVersion = releaseManifest.minecraft
export const releases = releaseManifest.releases
export const [latestRelease, ...olderReleases] = releases

export function releaseUrl(release: Release) {
  return `/downloads/${release.file}`
}

export function formatSize(bytes: number) {
  return `${(bytes / 1024).toFixed(1)} KB`
}

const dateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' })

export function formatDate(iso: string) {
  return dateFormat.format(new Date(iso))
}
