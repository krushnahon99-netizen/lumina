import Image from 'next/image'
import { CHECKPOINTS, CONTENT_GROUPS } from '@/lib/mod-info'
import { latestRelease } from '@/lib/releases'

export function ModContents() {
  const notes = CHECKPOINTS.find((checkpoint) => checkpoint.version === latestRelease.version)?.notes

  return (
    <section aria-labelledby="contents-heading">
      <h2 id="contents-heading" className="text-lg font-semibold">
        {"What's in v"}
        {latestRelease.version}
      </h2>
      {notes && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{notes}</p>}

      <div className="mt-4 flex flex-col gap-5">
        {CONTENT_GROUPS.map((group) => (
          <div key={group.title}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-sm font-medium">{group.title}</h3>
              <p className="text-xs text-muted-foreground">{group.note}</p>
            </div>
            <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {group.entries.map((entry) => (
                <li key={entry.name} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <Image
                    src={`/mod/textures/${entry.texture}.png`}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 shrink-0 rounded-sm [image-rendering:pixelated]"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{entry.name}</p>
                    <p className="text-xs text-muted-foreground">{entry.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
