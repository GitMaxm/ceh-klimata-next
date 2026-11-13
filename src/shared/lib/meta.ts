import type { Metadata } from 'next';

const SITE_NAME = 'Цех Климата';
const DEFAULT_IMAGE = { url: '/opengraph-image.jpg', width: 1200, height: 630 };

type TPageMetaOptions = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number };
  type?: 'website' | 'article';
  publishedTime?: string;
  socialTitle?: string;
};

export const pageMeta = ({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = 'website',
  publishedTime,
  socialTitle,
}: TPageMetaOptions): Metadata => {
  const shareTitle = socialTitle ?? `${title} — ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: 'ru_RU',
      siteName: SITE_NAME,
      url: path,
      title: shareTitle,
      description,
      images: [image],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title: shareTitle, description, images: [image.url] },
  };
};
