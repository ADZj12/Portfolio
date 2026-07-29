export type ProjectKind = 'case-study' | 'link';
export type ProjectStatus = 'live' | 'in-development' | 'complete' | 'archived';

export type Section = {
  heading: string;
  body: string[];
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  year: string;
  kind: ProjectKind;
  status: ProjectStatus;
  tagline: string;
  role: string;
  context: string;
  stack: string[];
  links: {
    live?: string;
    repo?: string;
  };
  problem?: string;
  approach?: string[];
  hardPart?: Section;
  outcome?: string[];
  sections?: Section[];
};

export const projects: Project[] = [
  {
    slug: 'slopstop',
    index: '01',
    name: 'slopstop',
    year: '2026',
    kind: 'case-study',
    status: 'live',
    tagline:
      'Catches hallucinated and slopsquatted package names at the moment an AI suggests them, before they are ever installed.',
    role: 'Solo — design, implementation, scorer calibration, MCP hook, release',
    context: 'Independent project · published on PyPI',
    stack: [
      'Python',
      'MCP',
      'PyPI',
      'npm',
      'CLI',
      'Supply-chain security',
      'Zero runtime dependencies',
    ],
    links: {
      live: 'https://pypi.org/project/slopstop/',
      repo: 'https://github.com/ADZj12/slopstop',
    },
    problem:
      'When an AI coding assistant suggests a dependency, that name is either real, hallucinated (it does not exist), or slopsquatted — an attacker has registered a name that models reliably invent. The dangerous case is the third: the same fake names recur across runs, which is exactly what makes them worth registering, and a brand-new slopsquat has no vulnerability history, so traditional scanners never see it. The strongest signal is also the cheapest — a name absent yesterday and registered today is an attack being planted in real time — but nothing was watching for it at the moment of suggestion.',
    approach: [
      'Check any package name against its live PyPI or npm registry and score it for the slopsquat signature, returning a verdict at the moment it is suggested rather than after install.',
      'Run entirely on the Python standard library — a tool that defends the software supply chain must not enlarge it, so there are zero third-party runtime dependencies to trust.',
      'Ship an MCP agent hook so packages are vetted the instant a model proposes them inside an assistant, not only later in CI.',
      'Keep a local corpus of names previously seen as absent and run a flip monitor that re-checks them, reporting any that have since been registered.',
      'Keep all state local: the corpus and collected names live under the user\u2019s home directory, telemetry is off by default, and nothing phones home silently.',
    ],
    hardPart: {
      heading: 'A fuzzy signal that does not cry wolf',
      body: [
        'The flip monitor is conceptually simple — re-check names that were absent and see if any now exist. The genuinely hard problem was the scorer: turning "does this name look like something a model would fabricate" into a number that is right often enough to trust.',
        'The naive version flagged any name whose tokens overlap real packages. That immediately flagged react-router-dom, eslint-plugin-react, and http-https as fakes, because legitimate packages reuse common tokens by convention. A checker that fires on real dependencies is worse than no checker — people learn to ignore it.',
        'The real work was calibration against roughly 2000 real packages, plus two guards. First, suppress the conflation signal for established packages — old, many releases, a linked repository — because a genuine conflation slopsquat is fresh and hollow, not mature. Second, require a distinctive shared segment rather than a generic word like "http" before treating overlap as suspicious.',
        'That combination brought the false-positive rate to about 0.1% across 2000 real packages while still catching the documented attacks. The discipline mattered more than the cleverness: a fuzzy signal is only useful if it stays quiet on the 99.9% of names that are fine.',
      ],
    },
    outcome: [
      'Published and installable from PyPI as v0.1.0, MIT-licensed, with zero runtime dependencies.',
      'Working MCP agent hook, verified catching a hallucinated package live inside Claude Desktop.',
      'Scorer calibrated against ~2000 real packages, plus deprecation detection, an advisory log, and a self-refreshing corpus loop.',
      'Built and shipped end to end; not yet adopted.',
    ],
  },
  {
    slug: 'getvacant',
    index: '02',
    name: 'GetVacant',
    year: '2026',
    kind: 'case-study',
    status: 'live',
    tagline:
      'Turns a job posting into a tailored German or English CV and cover letter in about a minute.',
    role: 'Solo — architecture, backend, frontend, deployment',
    context: 'Independent project',
    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'FastAPI',
      'Python',
      'Claude API',
      'Playwright',
      'Vercel',
      'Render',
    ],
    links: {
      live: 'https://getvacant-web.vercel.app/',
    },
    problem:
      'Applying for Werkstudent and Praktikum roles in Germany means rewriting your CV and cover letter for every posting. Most students give up and send the same generic documents everywhere. The AI tools that exist write fluent but hollow cover letters, and none of them produce a proper German Lebenslauf — the specific layout, the photo, the Sie-form conventions that recruiters here actually expect. I was doing this by hand for my own applications and wanted the tedious part automated without the output looking automated.',
    approach: [
      'Take a job link from StepStone, Indeed, LinkedIn, Xing, or a company careers page and scrape the posting. When a site blocks automation, fall back to a paste-the-description path instead of failing.',
      'Accept the applicant\u2019s existing CV as a PDF upload, extract it into structured fields, and offer a short manual form for anyone without one.',
      'Compare the extracted profile against the job description to produce a 0\u2013100 match score that also reports what is missing, so a bad-fit posting can be skipped rather than applied to.',
      'Generate an editable cover letter in German or English and render a formatted Lebenslauf with photo, downloadable as PDF or Word.',
      'Hold nothing. No accounts, no database — the CV is parsed in memory and discarded when the session ends.',
    ],
    hardPart: {
      heading: 'Parsing CVs that were never meant to be parsed',
      body: [
        'The generation was the easy half. The hard half was getting trustworthy structured data out of real CVs, because a CV is a document designed for human eyes and actively hostile to extraction.',
        'People upload two-column layouts where the reading order in the PDF bears no relation to the visual order. They use tables with invisible borders, icons instead of section labels, and headers that say "Werdegang" or "Beruflicher Hintergrund" instead of anything predictable. Dates appear as 2020–2022, 01/2022 – 08/2022, or "seit 2024". Plenty of CVs mix German and English in the same document.',
        'A naive text extraction handles the clean single-column case and silently mangles everything else — and silent failure is the dangerous kind here. If the parser drops a job or attaches the wrong dates to the wrong employer, the generated Lebenslauf is confidently wrong, and the applicant may not notice before sending it.',
        'What worked was refusing to trust any single pass: recover layout structure before reading text so column order survives, normalise the messy variants into one internal shape, then validate the result and route low-confidence extractions to the manual form rather than guessing. The principle I settled on was that the system should be willing to admit it could not read something. Falling back to a form is a small annoyance; a wrong work history is not.',
      ],
    },
    outcome: [
      'Live and running in production — Next.js frontend on Vercel, FastAPI backend on Render.',
      'Used by friends applying for real Werkstudent and Praktikum positions; their feedback drove most of the parsing and scoring changes after the first version.',
      'The no-storage decision turned out to simplify everything downstream: no accounts, no database, no data-retention questions to answer.',
      'Still in active development — the scraping coverage and the match scoring are where the remaining work is.',
    ],
  },
  {
    slug: 'cicd-security-pipeline',
    index: '03',
    name: 'CI/CD Security Pipeline',
    year: '2026',
    kind: 'link',
    status: 'complete',
    tagline:
      'A build pipeline with automated security checks, validated against the OWASP Juice Shop.',
    role: 'Coursework project',
    context: 'IT-Security module, TH Aschaffenburg',
    stack: ['CI/CD', 'OWASP', 'Security testing'],
    links: {
      repo: 'https://github.com/ADZj12',
    },
  },
  {
    slug: 'drone-network-planning',
    index: '04',
    name: 'Drone Network Planning',
    year: '2025',
    kind: 'link',
    status: 'complete',
    tagline:
      'Route and capacity planning over a drone network using BFS, Dijkstra, Ford–Fulkerson and Kruskal.',
    role: 'Group project',
    context: 'Algorithms coursework, TH Aschaffenburg',
    stack: ['Python', 'Graph algorithms'],
    links: {
      repo: 'https://github.com/ADZj12',
    },
  },
  {
    slug: 'campus-activity-planner',
    index: '05',
    name: 'Campus Activity Planner',
    year: '2026',
    kind: 'link',
    status: 'complete',
    tagline:
      'Java desktop app for browsing and registering for campus events, built on an inheritance hierarchy of activity and registration types with a Swing GUI.',
    role: 'Coursework project',
    context: 'Object-oriented programming, TH Aschaffenburg',
    stack: ['Java', 'Swing', 'OOP design'],
    links: {
      repo: 'https://github.com/ADZj12/CampusActivityPlannerSo26',
    },
  },
];

export const caseStudies = projects.filter((p) => p.kind === 'case-study');
export const linkProjects = projects.filter((p) => p.kind === 'link');

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug && p.kind === 'case-study');
}

export const statusLabel: Record<ProjectStatus, string> = {
  live: 'Live',
  'in-development': 'In development',
  complete: 'Complete',
  archived: 'Archived',
};
