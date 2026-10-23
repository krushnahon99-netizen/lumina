import Image from 'next/image'
import { DownloadCard } from '@/components/download-card'
import { InstallSteps } from '@/components/install-steps'
import { ModContents } from '@/components/mod-contents'
import { Requirements } from '@/components/requirements'
import { Roadmap } from '@/components/roadmap'
import { minecraftVersion } from '@/lib/releases'

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-10 px-4 pt-10 pb-16">
      <header className="flex items-center gap-4">
        <Image
          src="/mod/icon.png"
          alt=""
          width={64}
          height={64}
          className="size-16 shrink-0 rounded-lg border border-border [image-rendering:pixelated]"
        />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-balance">Echo Technology</h1>
          <p className="text-sm text-muted-foreground">
            Sculk-tech machines for Minecraft Java {minecraftVersion}
            {' · Fabric'}
          </p>
        </div>
      </header>

      <DownloadCard />
      <Requirements />
      <InstallSteps />
      <ModContents />
      <Roadmap />

      <footer className="border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
        {'Mod ID '}
        <span className="font-mono">echo_technology</span>
        {'. Each build is compiled from the project source, so this page always lists the newest JAR first.'}
      </footer>
    </main>
  )
}
