import { Download, ExternalLink } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { FABRIC_API, MIN_LOADER_VERSION } from '@/lib/mod-info'
import { minecraftVersion } from '@/lib/releases'
import { cn } from '@/lib/utils'

export function Requirements() {
  return (
    <section aria-labelledby="requirements-heading">
      <h2 id="requirements-heading" className="text-lg font-semibold">
        Also needed
      </h2>
      <ul className="mt-3 flex flex-col gap-3">
        <li className="rounded-xl border border-border bg-card p-4">
          <p className="font-medium">Fabric Loader for Minecraft {minecraftVersion}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Pick Fabric when you create the {minecraftVersion} profile in your launcher. Version {MIN_LOADER_VERSION} or
            newer works.
          </p>
        </li>
        <li className="rounded-xl border border-border bg-card p-4">
          <p className="font-medium">
            {'Fabric API '}
            <span className="font-mono text-sm font-normal text-muted-foreground">{FABRIC_API.version}</span>
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            A library mod that Echo Technology needs. It goes in the same mods folder.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={FABRIC_API.downloadUrl} className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'h-10')}>
              <Download aria-hidden="true" />
              Download Fabric API ({FABRIC_API.size})
            </a>
            <a
              href={FABRIC_API.pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'h-10 text-muted-foreground')}
            >
              Modrinth page
              <ExternalLink aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </li>
      </ul>
    </section>
  )
}
