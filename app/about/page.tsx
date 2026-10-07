import type { Metadata } from 'next';
import { profile } from '@/content/profile';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'About',
  description: profile.intro,
};

const education = [
  {
    school: 'TH Aschaffenburg',
    detail: 'B.Sc. Software Design International (5th semester)',
    years: '2024 to present',
  },
  {
    school: 'West Ukrainian National University, Ternopil',
    detail: 'B.Sc. Software Engineering (interrupted by the war, 75 ECTS)',
    years: '2020 to 2022',
  },
  {
    school: 'Limkokwing University, Sierra Leone',
    detail: 'B.Sc. (Hons) Software Engineering with Multimedia (57 credits)',
    years: '2018 to 2019',
  },
];

const experience = [
  {
    role: 'Freelancer, IT & software development',
    org: 'Upwork / Online Services, Heilbronn',
    years: '01/2025 to present',
    notes:
      'Risk and vulnerability assessments for client projects, with security strategies to protect their data and systems. Software built on clean principles with a privacy by design approach.',
  },
  {
    role: 'IT support',
    org: 'MediaMarkt',
    years: '2024 to present',
    notes:
      'Handle 5 to 10 customer and IT requests per shift: system and network setup, fault analysis. Often pulled in by colleagues on the trickier tickets.',
  },
  {
    role: 'Digital Media Manager',
    org: 'Sinkunia Autosale, Freetown',
    years: '01/2022 to 08/2022',
    notes: 'Ran the digital presence and vehicle listings for a used car dealer (full time).',
  },
  {
    role: 'Web Application Developer',
    org: 'BintexSL, Freetown',
    years: '05/2019 to 10/2020',
    notes: 'Maintained and extended client web projects; liaised with suppliers and buyers.',
  },
];

const certificates = [
  'Ethical Hacking',
  'Information Gathering & Footprinting',
  'Network Scanning',
  'Sniffing & Traffic Analysis',
  'Malware Analysis',
  'Session Hijacking',
  'DoS Attacks',
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <Reveal>
        <p className="eyebrow mb-5">About</p>
        <h1 className="editorial editorial-lg mb-10 max-w-3xl">
          {profile.name}
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mb-20 flex max-w-prose flex-col gap-6 text-lg leading-relaxed">
          {profile.about.map((para, i) => (
            <p key={i} className={i === 0 ? 'text-chalk' : 'text-ash'}>
              {para}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <section className="mb-20">
          <h2 className="eyebrow mb-8">Experience</h2>
          <ul>
            {experience.map((item) => (
              <li
                key={item.role + item.org}
                className="grid gap-2 border-t border-rule py-6 sm:grid-cols-[1fr_auto] sm:gap-8"
              >
                <div className="max-w-prose">
                  <p className="editorial text-xl sm:text-2xl">{item.role}</p>
                  <p className="mb-2 font-mono text-sm text-accent">{item.org}</p>
                  <p className="text-sm leading-relaxed text-ash">{item.notes}</p>
                </div>
                <span className="num eyebrow whitespace-nowrap">{item.years}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="mb-20">
          <h2 className="eyebrow mb-8">Education</h2>
          <ul>
            {education.map((item) => (
              <li
                key={item.school}
                className="grid gap-1 border-t border-rule py-5 sm:grid-cols-[1fr_auto] sm:gap-8"
              >
                <div>
                  <p className="mb-1">{item.school}</p>
                  <p className="text-sm text-ash">{item.detail}</p>
                </div>
                <span className="num eyebrow whitespace-nowrap">{item.years}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="mb-20 grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="eyebrow mb-6">Certificates</h2>
            <p className="mb-4 text-sm text-ash">
              Careerera, 2023 (seven cyber security modules)
            </p>
            <ul className="flex flex-col gap-2">
              {certificates.map((c) => (
                <li key={c} className="flex items-baseline gap-3 text-sm">
                  <span className="text-accent" aria-hidden>
                    &bull;
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-6">Languages</h2>
            <ul className="flex flex-col gap-3">
              <li className="text-sm">
                English <span className="text-ash">(native)</span>
              </li>
              <li className="text-sm">
                German <span className="text-ash">(B2, telc certified)</span>
              </li>
            </ul>
          </div>
        </section>
      </Reveal>

      <div className="border-t border-rule pt-8">
        <a
          href={profile.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-iris px-6 py-3 font-mono text-sm text-void transition-opacity hover:opacity-85"
        >
          Download full CV (PDF)
        </a>
      </div>
    </div>
  );
}
