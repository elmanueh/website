import ProjectRowCard from '@/components/ProjectRowCard'
import { projects } from '@/data/projects'

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <section>
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground">Alicante / Murcia</p>

          <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
            Manuel Bernabé Rodríguez
          </h1>

          <p className="max-w-prose text-base leading-relaxed text-muted-foreground sm:text-lg">
            Ingeniero de Software backend .NET, apasionado por la arquitectura
            del software y el diseño de sistemas que escalan y se mantienen en
            el tiempo.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-md">
            <a
              href="mailto:bernabe2003@gmail.com"
              className="text-muted-foreground underline underline-offset-6 hover:text-foreground hover:no-underline"
            >
              bernabe2003@gmail.com
            </a>
            <span>·</span>
            <a
              href="https://www.linkedin.com/in/manuel-bernabe-rodriguez/"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground underline underline-offset-6 hover:text-foreground hover:no-underline"
            >
              LinkedIn
            </a>
            <span>·</span>
            <a
              href="/CV_Manuel_Bernabe_Rodriguez.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground underline underline-offset-6 hover:text-foreground hover:no-underline"
            >
              CV
            </a>
          </div>
        </div>
      </section>

      <section id="projects" className="mt-14">
        <div className="mt-6 space-y-6">
          {projects.map((p) => (
            <ProjectRowCard
              key={p.slug}
              title={p.title}
              subtitle={p.subtitle}
              image={p.image}
              tags={p.tags}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
