import type { Metadata } from 'next';
import { profile } from '@/content/profile';

export const metadata: Metadata = {
  title: 'About',
  description: profile.intro,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <p className="eyebrow mb-5">About</p>
      <h1 className="display-lg mb-10 max-w-2xl">{profile.name}</h1>

      <div className="mb-16 flex max-w-prose flex-col gap-6 text-lg leading-relaxed">
        {profile.about.map((para, i) => (
          <p key={i} className={i === 0 ? 'text-chalk' : 'text-ash'}>
            {para}
          </p>
        ))}
      </div>

      <section className="mb-16">
        <h2 className="eyebrow mb-6">Education</h2>
        <ul>
          {[
            {
              school: 'TH Aschaffenburg',
              detail: 'B.Sc. Software Design International',
              years: '2024 — present',
            },
            {
              school: 'West Ukrainian National University, Ternopil',
              detail: 'B.Sc. Software Engineering — interrupted by the war (75 ECTS)',
              years: '2020 — 2022',
            },
            {
              school: 'Limkokwing University, Sierra Leone',
              detail: 'B.Sc. (Hons) Software Engineering with Multimedia (57 credits)',
              years: '2018 — 2019',
            },
          ].map((item) => (
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

      <section className="mb-16">
        <h2 className="eyebrow mb-6">Languages</h2>
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          <li className="text-sm">
            English <span className="text-ash">— native</span>
          </li>
          <li className="text-sm">
            German <span className="text-ash">— C1 (telc certified)</span>
          </li>
        </ul>
      </section>

      <div className="border-t border-rule pt-8">
        <a
          href={profile.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm bg-iris px-5 py-2.5 font-mono text-sm text-void transition-opacity hover:opacity-85"
        >
          Download full CV (PDF)
        </a>
      </div>
    </div>
  );
}
