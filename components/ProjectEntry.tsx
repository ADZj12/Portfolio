import Link from 'next/link';
import { Project, statusLabel } from '@/content/projects';

function StatusDot({ status }: { status: Project['status'] }) {
  const live = status === 'live';
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-moss' : 'bg-ash/60'}`}
        aria-hidden
      />
      <span className="eyebrow">{statusLabel[status]}</span>
    </span>
  );
}

export function ProjectEntry({ project }: { project: Project }) {
  const isCaseStudy = project.kind === 'case-study';
  const href = isCaseStudy ? `/projects/${project.slug}` : project.links.repo ?? '#';

  return (
    <article className="group grid gap-4 border-t border-rule py-8 sm:grid-cols-[3.5rem_1fr] sm:gap-8">
      <div className="flex items-baseline gap-3 sm:flex-col sm:gap-1">
        <span className="num font-mono text-2xl text-ash/50 transition-colors group-hover:text-iris sm:text-3xl">
          {project.index}
        </span>
        <span className="num eyebrow">{project.year}</span>
      </div>

      <div>
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <h3 className="display-md">
            <Link
              href={href}
              target={isCaseStudy ? undefined : '_blank'}
              rel={isCaseStudy ? undefined : 'noopener noreferrer'}
              className="transition-colors hover:text-iris"
            >
              {project.name}
            </Link>
          </h3>
          <StatusDot status={project.status} />
        </div>

        <p className="mb-4 max-w-prose text-ash">{project.tagline}</p>

        <p className="eyebrow mb-4 normal-case tracking-normal">{project.context}</p>

        <ul className="mb-5 flex flex-wrap gap-x-3 gap-y-1.5">
          {project.stack.slice(0, 6).map((tech) => (
            <li key={tech} className="font-mono text-xs text-ash">
              {tech}
            </li>
          ))}
          {project.stack.length > 6 && (
            <li className="font-mono text-xs text-ash">+{project.stack.length - 6}</li>
          )}
        </ul>

        <div className="flex flex-wrap items-center gap-5">
          {isCaseStudy && (
            <Link
              href={`/projects/${project.slug}`}
              className="font-mono text-sm text-iris transition-colors hover:text-chalk"
            >
              Read the case study &rarr;
            </Link>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow transition-colors hover:text-chalk"
            >
              Live site
            </a>
          )}
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow transition-colors hover:text-chalk"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
