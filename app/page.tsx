import Link from 'next/link';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { ProjectEntry } from '@/components/ProjectEntry';
import { ExtractionFigure } from '@/components/ExtractionFigure';
import { Reveal } from '@/components/Reveal';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
        <p className="eyebrow mb-6">
          {profile.title} · {profile.location}
        </p>

        <h1 className="display-xl mb-8 max-w-3xl">
          I build software that reads messy input and decides what it means.
        </h1>

        <p className="mb-12 max-w-prose text-lg leading-relaxed text-ash">
          {profile.intro}
        </p>

        <div className="mb-14 max-w-2xl">
          <ExtractionFigure />
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="/projects"
            className="rounded-sm bg-iris px-5 py-2.5 font-mono text-sm text-void transition-opacity hover:opacity-85"
          >
            See the work
          </Link>
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-chalk transition-colors hover:text-iris"
          >
            Download CV (PDF)
          </a>
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <h2 className="eyebrow">Selected work</h2>
          <span className="num eyebrow">{projects.length} projects</span>
        </div>

        <div>
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05}>
              <ProjectEntry project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <h2 className="eyebrow mb-8">Tools I work with</h2>
        <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {profile.skills.map((group) => (
            <div key={group.group} className="border-t border-rule pt-4">
              <dt className="mb-3 font-mono text-sm text-iris">{group.group}</dt>
              <dd className="flex flex-wrap gap-x-3 gap-y-1.5">
                {group.items.map((item) => (
                  <span key={item} className="text-sm text-ash">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
