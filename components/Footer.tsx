import { profile } from '@/content/profile';

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-4xl px-6 py-14">
        <p className="eyebrow mb-4">Contact</p>
        <a
          href={`mailto:${profile.email}`}
          className="display-md link-underline inline-block"
        >
          {profile.email}
        </a>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-rule pt-6">
          <p className="font-mono text-xs text-ash">
            {profile.location} · Open to {profile.seeking.toLowerCase()}
          </p>
          <nav className="flex gap-6" aria-label="Elsewhere">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow transition-colors hover:text-chalk"
            >
              GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow transition-colors hover:text-chalk"
            >
              LinkedIn
            </a>
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow transition-colors hover:text-chalk"
            >
              CV (PDF)
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
