import Link from 'next/link';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { ProjectEntry } from '@/components/ProjectEntry';
import { ExtractionFigure } from '@/components/ExtractionFigure';
import { Reveal } from '@/components/Reveal';
import { ContactForm } from '@/components/ContactForm';
import { KineticHeadline } from '@/components/KineticHeadline';
import { HeroCanvas } from '@/components/HeroCanvas';

const stats = [
  { figure: '05', label: 'Projects on this site' },
  { figure: '02', label: 'Products live in production' },
  { figure: '01', label: 'Package published to PyPI' },
];

const allSkills = profile.skills.flatMap((g) => g.items);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-wrap mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pt-20">
        <HeroCanvas />
        <div className="hero-content">
        <Reveal>
          <p className="eyebrow mb-8">
            {profile.title} · {profile.location} · Open to {profile.seeking.toLowerCase()}
          </p>
        </Reveal>

        <KineticHeadline
          className="mb-10"
          words={[
            { text: 'I', style: 'fill' },
            { text: 'build', style: 'fill' },
            { text: 'software', style: 'accent' },
            { text: 'that', style: 'outline' },
            { text: 'reads', style: 'fill' },
            { text: 'messy', style: 'outline' },
            { text: 'input', style: 'fill' },
            { text: 'and', style: 'outline' },
            { text: 'decides', style: 'accent' },
            { text: 'what', style: 'fill' },
            { text: 'it', style: 'fill' },
            { text: 'means.', style: 'fill' },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <Reveal delay={0.3}>
            <p className="max-w-prose text-lg leading-relaxed text-ash">{profile.intro}</p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-full bg-iris px-6 py-3 font-mono text-sm text-void transition-opacity hover:opacity-85"
              >
                See the work
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
              <Link
                href="#contact"
                className="font-mono text-sm text-chalk transition-colors hover:text-iris"
              >
                Get in touch
              </Link>
              <Link
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-chalk transition-colors hover:text-iris"
              >
                CV (PDF)
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <ExtractionFigure />
          </Reveal>
        </div>
        </div>
      </section>

      {/* By the numbers */}
      <section className="border-y border-rule">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-rule sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="flex items-baseline gap-4 px-6 py-8">
                <span className="numeral text-5xl text-accent sm:text-6xl">{s.figure}</span>
                <span className="text-sm leading-tight text-ash">{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Skills marquee */}
      <section className="overflow-hidden border-b border-rule py-6">
        <div className="marquee-track">
          <div className="marquee">
            {[...allSkills, ...allSkills].map((item, i) => (
              <span key={i} className="mx-5 font-mono text-sm uppercase tracking-wider text-ash">
                {item}
                <span className="ml-5 text-iris">/</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-20">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="editorial editorial-lg max-w-2xl">Selected work</h2>
            <span className="num eyebrow whitespace-nowrap">{projects.length} projects</span>
          </div>
        </Reveal>

        <div>
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05}>
              <ProjectEntry project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Skills detail */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <h2 className="eyebrow mb-8">Tools I work with</h2>
        </Reveal>
        <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {profile.skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.06}>
              <div className="border-t-2 border-rule pt-4">
                <dt className="mb-3 font-mono text-sm text-accent">{group.group}</dt>
                <dd className="flex flex-col gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className="text-sm text-ash">
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="border-t border-rule pt-16">
          <Reveal>
            <p className="eyebrow mb-5">Contact</p>
            <h2 className="editorial editorial-lg mb-6 max-w-2xl">
              Let&apos;s <span className="text-accent">talk.</span>
            </h2>
            <p className="mb-12 max-w-prose text-ash">
              Looking for a {profile.seeking.toLowerCase()}, but happy to hear about anything.
              Fill in the form and it comes straight to my inbox.
            </p>
          </Reveal>
          <div className="max-w-2xl">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
