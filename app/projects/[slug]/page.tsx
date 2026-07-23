import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, getProjectBySlug, statusLabel } from '@/content/projects';
import { Reveal } from '@/components/Reveal';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Not found' };
  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      title: project.name,
      description: project.tagline,
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <Link href="/projects" className="eyebrow transition-colors hover:text-chalk">
        &larr; All projects
      </Link>

      <header className="mb-12 mt-8">
        <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="num font-mono text-sm text-iris">{project.index}</span>
          <span className="eyebrow">{statusLabel[project.status]}</span>
          <span className="num eyebrow">{project.year}</span>
        </div>

        <h1 className="display-lg mb-6">{project.name}</h1>
        <p className="max-w-prose text-lg leading-relaxed text-ash">{project.tagline}</p>
      </header>

      <dl className="mb-16 grid gap-8 border-y border-rule py-8 sm:grid-cols-3">
        <div>
          <dt className="eyebrow mb-2">Role</dt>
          <dd className="text-sm leading-relaxed">{project.role}</dd>
        </div>
        <div>
          <dt className="eyebrow mb-2">Stack</dt>
          <dd className="text-sm leading-relaxed">{project.stack.join(' \u00b7 ')}</dd>
        </div>
        <div>
          <dt className="eyebrow mb-2">Links</dt>
          <dd className="flex flex-col gap-1.5 text-sm">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline w-fit"
              >
                Live site
              </a>
            )}
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline w-fit"
              >
                Source
              </a>
            )}
            {!project.links.live && !project.links.repo && (
              <span className="text-ash">Private</span>
            )}
          </dd>
        </div>
      </dl>

      {project.problem && (
        <Reveal className="mb-16">
          <h2 className="eyebrow mb-5">The problem</h2>
          <p className="max-w-prose text-lg leading-relaxed">{project.problem}</p>
        </Reveal>
      )}

      {project.approach && (
        <Reveal className="mb-16">
          <h2 className="eyebrow mb-6">What I built</h2>
          <ol className="max-w-prose">
            {project.approach.map((step, i) => (
              <li
                key={i}
                className="grid grid-cols-[2rem_1fr] gap-4 border-t border-rule py-5 last:border-b"
              >
                <span className="num font-mono text-sm text-iris">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      )}

      {project.hardPart && (
        <Reveal className="mb-16">
          <div className="rounded-sm border border-rule bg-slab p-6 sm:p-10">
            <p className="eyebrow mb-3 text-moss">The hard part</p>
            <h2 className="display-md mb-6">{project.hardPart.heading}</h2>
            <div className="flex max-w-prose flex-col gap-5">
              {project.hardPart.body.map((para, i) => (
                <p key={i} className="leading-relaxed text-chalk/90">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {project.outcome && (
        <Reveal className="mb-16">
          <h2 className="eyebrow mb-6">Where it stands</h2>
          <ul className="max-w-prose">
            {project.outcome.map((item, i) => (
              <li
                key={i}
                className="grid grid-cols-[1.25rem_1fr] gap-3 border-t border-rule py-4 last:border-b"
              >
                <span className="pt-1 text-iris" aria-hidden>
                  &mdash;
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      <div className="border-t border-rule pt-10">
        <Link
          href="/projects"
          className="font-mono text-sm text-iris transition-colors hover:text-chalk"
        >
          &larr; Back to all projects
        </Link>
      </div>
    </article>
  );
}
