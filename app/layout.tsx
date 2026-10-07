import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { profile } from '@/content/profile';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Backdrop } from '@/components/Backdrop';

const display = localFont({
  src: './fonts/bricolage-grotesque-latin-wght-normal.woff2',
  variable: '--font-display',
  display: 'swap',
  weight: '200 800',
});

const serif = localFont({
  src: [
    { path: './fonts/fraunces-latin-opsz-normal.woff2', style: 'normal' },
    { path: './fonts/fraunces-latin-wght-normal.woff2', style: 'normal' },
  ],
  variable: '--font-serif',
  display: 'swap',
  weight: '100 900',
});


const body = localFont({
  src: [
    { path: './fonts/ibm-plex-sans-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/ibm-plex-sans-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/ibm-plex-sans-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
});

const mono = localFont({
  src: [
    { path: './fonts/ibm-plex-mono-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/ibm-plex-mono-latin-500-normal.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://abubakarr-jabbie.vercel.app'),
  title: {
    default: `${profile.name} | ${profile.title}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.intro,
  openGraph: {
    title: `${profile.name} | ${profile.title}`,
    description: profile.intro,
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} | ${profile.title}`,
    description: profile.intro,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${serif.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased flex min-h-screen flex-col text-chalk">
        <Backdrop />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-iris focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-void"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
