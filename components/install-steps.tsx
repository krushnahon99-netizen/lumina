import { minecraftVersion } from '@/lib/releases'

const STEPS = [
  {
    title: 'Create a Fabric profile',
    body: `In your launcher, make a Minecraft Java ${minecraftVersion} profile (instance) that uses Fabric Loader.`,
  },
  {
    title: 'Download both files',
    body: 'Get Echo Technology and Fabric API from this page. If the browser warns about .jar files, choose Download anyway.',
  },
  {
    title: 'Add them to the mods folder',
    body: "Use the launcher's Manage mods or Open mods folder option for that profile and add both .jar files.",
  },
  {
    title: 'Play',
    body: 'Open a Creative world and find the Echo Technology tab in the creative inventory.',
  },
]

export function InstallSteps() {
  return (
    <section aria-labelledby="install-heading">
      <h2 id="install-heading" className="text-lg font-semibold">
        Install on your phone
      </h2>
      <ol className="mt-3 flex flex-col gap-4">
        {STEPS.map((step, index) => (
          <li key={step.title} className="flex gap-3">
            <span
              aria-hidden="true"
              className="flex size-7 shrink-0 items-center justify-center rounded-md border border-primary/40 bg-accent font-mono text-sm text-accent-foreground"
            >
              {index + 1}
            </span>
            <div>
              <p className="font-medium">{step.title}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
