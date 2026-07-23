# Portfolio — Abubakarr Jabbie

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion.
Static-generated, deploys to Vercel with no environment variables.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Adding a project

All projects live in one array: `content/projects.ts`. Nothing else needs to
change — the homepage, the `/projects` index, the `/projects/[slug]` routes and
the sitemap all read from it.

**A full case study** (`kind: 'case-study'`) needs `problem`, `approach`,
`hardPart` and `outcome`. It gets its own page at `/projects/<slug>`.

**A link-only entry** (`kind: 'link'`) needs only the shared fields and a
`links.repo`. It appears in listings and points straight at GitHub.

Copy an existing object, change `index`, `slug`, `year` and the content. That
is the whole workflow.

Personal details (name, email, bio, skills, CV path) are in `content/profile.ts`.

## Replacing the CV

Drop a new PDF at `public/abubakarr-jabbie-cv.pdf`, or change the `cv` path in
`content/profile.ts`.

## Before deploying

Update `metadataBase` in `app/layout.tsx` and `BASE` in `app/sitemap.ts` /
`app/robots.ts` to the real domain once it is set.

## Notes

Fonts are self-hosted from `app/fonts/` via `next/font/local`, so the build has
no network dependency and there is no third-party font request at runtime.

Requires Node 20.9+ (see `engines` in `package.json`).

### About `npm audit`

`npm audit` reports two advisories in transitive dependencies bundled inside
Next.js itself — `sharp` (image optimization) and `postcss` (build-time CSS).
Neither is reachable from this site: it is fully static, uses no `next/image`,
no middleware, no server actions, and no custom server.

There is no upgrade that clears them; npm's suggested `--force` fix would
downgrade Next.js to 9.3.3, which is far worse. Leave them. Re-check after each
Next.js release.
