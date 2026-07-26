import type { Metadata } from 'next';
import { profile } from '@/content/profile';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${profile.name}.`,
};

const contactLinks = [
  { label: 'Email', href: `mailto:${profile.email}`, text: profile.email },
  { label: 'GitHub', href: profile.links.github, text: 'github.com/ADZj12' },
  { label: 'LinkedIn', href: profile.links.linkedin, text: 'linkedin.com/in/abubakarr-jabbie' },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <p className="eyebrow mb-5">Contact</p>
      <h1 className="display-lg mb-6 max-w-2xl">Let&apos;s talk.</h1>
      <p className="mb-12 max-w-prose text-ash">
        Looking for a {profile.seeking.toLowerCase()} — but happy to hear about anything.
        Fill in the form and it comes straight to my inbox, or email me directly.
      </p>

      <div className="mb-14 max-w-2xl">
        <ContactForm />
      </div>

      <div className="max-w-2xl border-t border-rule pt-8">
        <dl className="grid gap-6 sm:grid-cols-3">
          {contactLinks.map((item) => (
            <div key={item.label}>
              <dt className="eyebrow mb-2">{item.label}</dt>
              <dd>
                <a href={item.href} className="link-underline text-sm">
                  {item.text}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}