import type { Metadata } from 'next';
import { projects } from '@/content/projects';
import { ProjectEntry } from '@/components/ProjectEntry';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Independent and coursework projects, with case studies where there is something worth explaining.',
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <header className="mb-14">
        <p className="eyebrow mb-5">Projects</p>
        <h1 className="display-lg mb-6 max-w-2xl">
          Everything I have built that is worth showing.
        </h1>
        <p className="max-w-prose text-ash">
          Independent work first, coursework after. Where a project had a problem worth
          explaining, there is a full case study; where it did not, there is a link to the
          code.
        </p>
      </header>

      <div>
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.05}>
            <ProjectEntry project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
