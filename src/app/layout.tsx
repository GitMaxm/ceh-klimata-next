import '@/app/styles/globals.css';
import '@/app/styles/projects.css';

import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';

import { SITE_NAME, SITE_URL } from '@/shared/config';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Цех Климата | Вентиляция и Кондиционирование | airceh.ru',
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Цех Климата — профессиональная вентиляция и кондиционирование под ключ. Проектирование, подбор оборудования, монтаж и обслуживание. Создаём комфортный и свежий воздух в квартирах, домах и коммерческих помещениях.',
  keywords:
    'Цех Климата, вентиляция, кондиционирование, приточная вентиляция, монтаж вентиляции, системы вентиляции, кондиционеры, воздух, климат, инженерные системы, климат под ключ',
  authors: [{ name: 'Цех Климата' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Цех Климата | Вентиляция и Кондиционирование под ключ',
    description:
      'Проектирование, монтаж и обслуживание систем вентиляции и кондиционирования. Профессиональные решения для дома и бизнеса.',
    url: SITE_URL,
    images: [
      {
        url: '/img/og/about-logo.jpg',
      },
    ],
    type: 'website',
  },
  other: {
    'msapplication-TileColor': '#26292d',
  },
};

export const viewport: Viewport = {
  themeColor: '#5c62ec',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={roboto.variable}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
