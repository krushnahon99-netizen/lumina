import { CircleCheck, CircleDashed, CircleX, Download } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import {
  formatDate,
  formatSize,
  latestRelease,
  minecraftVersion,
  olderReleases,
  releaseUrl,
} from '@/lib/releases'
import { cn } from '@/lib/utils'

type CheckState = 'pass' | 'fail' | 'pending'

const CHECK_ICONS = {
  pass: { Icon: CircleCheck, className: 'text-primary', label: 'Passed' },
  fail: { Icon: CircleX, className: 'text-destructive', label: 'Failed' },
  pending: { Icon: CircleDashed, className: 'text-muted-foreground', label: 'Not yet' },
} as const

function toCheckState(result: string | undefined): CheckState {
  if (result === 'pass' || result === 'fail') return result
  return 'pending'
}

export function DownloadCard() {
  const release = latestRelease
  const checks: { label: string; state: CheckState }[] = [
    { label: 'Compiled', state: 'pass' },
    { label: `Loads on a ${minecraftVersion} server`, state: toCheckState(release.serverSmokeTest?.result) },
    { label: 'Tested in-game on your phone', state: 'pending' },
  ]

  return (
    <section
      aria-labelledby="download-heading"
      className="rounded-xl border border-border bg-card p-5 shadow-[0_0_40px_-12px] shadow-primary/30"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="download-heading" className="text-sm font-medium text-muted-foreground">
          Latest build
        </h2>
        <span className="font-mono text-xs text-muted-foreground">
          {'MC '}
          {minecraftVersion}
          {' · Fabric'}
        </span>
      </div>
      <p className="mt-2 font-mono text-4xl font-semibold tracking-tight text-accent-foreground">
        v{release.version}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        <span className="font-mono break-all">{release.file}</span>
        {' · '}
        {formatSize(release.bytes)}
        {' · built '}
        {formatDate(release.builtAt)}
      </p>

      <a
        href={releaseUrl(release)}
        download
        className={cn(buttonVariants({ size: 'lg' }), 'mt-5 h-12 w-full text-base font-semibold')}
      >
        <Download aria-hidden="true" className="size-5" />
        Download Echo Technology
      </a>

      <ul className="mt-5 flex flex-col gap-2" aria-label="Build checks">
        {checks.map(({ label, state }) => {
          const { Icon, className, label: stateLabel } = CHECK_ICONS[state]
          return (
            <li key={label} className="flex items-center gap-2 text-sm">
              <Icon aria-hidden="true" className={cn('size-4 shrink-0', className)} />
              <span>{label}</span>
              <span className="sr-only">{`: ${stateLabel}`}</span>
            </li>
          )
        })}
      </ul>

      <details className="mt-4 text-xs text-muted-foreground">
        <summary className="cursor-pointer select-none">SHA-256 checksum</summary>
        <p className="mt-2 font-mono break-all">{release.sha256}</p>
      </details>

      {olderReleases.length > 0 && (
        <details className="mt-3 text-sm">
          <summary className="cursor-pointer text-xs text-muted-foreground select-none">Older builds</summary>
          <ul className="mt-2 flex flex-col gap-1">
            {olderReleases.map((older) => (
              <li key={older.version}>
                <a href={releaseUrl(older)} download className="font-mono text-primary underline-offset-4 hover:underline">
                  {older.file}
                </a>
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  )
}
