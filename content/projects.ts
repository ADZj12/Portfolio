export type ProjectKind = 'case-study' | 'link';
export type ProjectStatus = 'live' | 'in-development' | 'complete' | 'archived';

export type Section = {
  heading: string;
  body: string[];
};

export type Project = {
  /** URL segment. Only used when kind === 'case-study'. */
  slug: string;
  index: string;
  name: string;
  year: string;
  kind: ProjectKind;
  status: ProjectStatus;
  /** One line. Shown in listings. */
  tagline: string;
  role: string;
  context: string;
  stack: string[];
  links: {
    live?: string;
    repo?: string;
  };
  /** Case-study fields. Ignored for kind === 'link'. */
  problem?: string;
  approach?: string[];
  hardPart?: Section;
  outcome?: string[];
  sections?: Section[];
};

export const projects: Project[] = [
  {
    slug: 'getvacant',
    index: '01',
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
        'What worked was refusing to trust any single pass: recover layout structure before reading text so column order survives, normalise the messy variants (date formats, section synonyms across both languages) into one internal shape, then validate the result and route low-confidence extractions to the manual form rather than guessing. The design principle I settled on was that the system should be willing to admit it could not read something. Falling back to a form is a small annoyance; a wrong work history is not.',
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
    index: '02',
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
    index: '03',
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
    index: '04',
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
