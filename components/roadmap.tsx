import { CHECKPOINTS } from '@/lib/mod-info'
import { releases } from '@/lib/releases'
import { cn } from '@/lib/utils'

const STATUS_STYLES = {
  Done: 'border-primary/40 bg-accent text-accent-foreground',
  Next: 'border-primary/40 text-primary',
  Planned: 'border-border text-muted-foreground',
} as const

export function Roadmap() {
  const built = new Set(releases.map((release) => release.version))
  const nextIndex = CHECKPOINTS.findIndex((checkpoint) => !built.has(checkpoint.version))

  return (
    <section aria-labelledby="roadmap-heading">
      <h2 id="roadmap-heading" className="text-lg font-semibold">
        Roadmap
      </h2>
      <ol className="mt-3 rounded-xl border border-border bg-card">
        {CHECKPOINTS.map((checkpoint, index) => {
          const status = built.has(checkpoint.version) ? 'Done' : index === nextIndex ? 'Next' : 'Planned'
          return (
            <li
              key={checkpoint.version}
              className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0"
            >
              <span className="w-12 shrink-0 font-mono text-sm text-muted-foreground">{checkpoint.version}</span>
              <span className="flex-1 text-sm">{checkpoint.title}</span>
              <span className={cn('shrink-0 rounded-md border px-2 py-0.5 text-xs', STATUS_STYLES[status])}>
                {status}
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
