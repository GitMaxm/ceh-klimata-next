import '@/app/styles/globals.css';

import type { Metadata, Viewport } from 'next';
import { Geologica, Martian_Mono } from 'next/font/google';

import { COMPANY_CONTACTS, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/shared/config';
import { JsonLd } from '@/shared/ui';

const geologica = Geologica({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-geologica',
  display: 'swap',
});

const martian = Martian_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'],
  variable: '--font-martian',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Вентиляция и кондиционирование в Москве — Цех Климата',
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: SITE_NAME,
    url: SITE_URL,
    title: 'Вентиляция и кондиционирование, спрятанные в потолке — Цех Климата',
    description: SITE_DESCRIPTION,
  },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#1d1d1b',
  width: 'device-width',
  initialScale: 1,
};

const organization = {
  '@context': 'https://schema.org',
  '@type': 'HVACBusiness',
  '@id': `${SITE_URL}/#company`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  image: `${SITE_URL}/opengraph-image.jpg`,
  logo: `${SITE_URL}/icon.svg`,
  telephone: COMPANY_CONTACTS.phone,
  email: COMPANY_CONTACTS.email,
  areaServed: { '@type': 'City', name: 'Москва' },
  address: { '@type': 'PostalAddress', addressLocality: 'Москва', addressCountry: 'RU' },
  knowsAbout: ['Вентиляция', 'Кондиционирование', 'Рекуперация', 'VRF-системы', 'Канальные кондиционеры'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${geologica.variable} ${martian.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
