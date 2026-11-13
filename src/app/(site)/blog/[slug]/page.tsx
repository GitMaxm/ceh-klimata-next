import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getPost, getPosts, PostBody } from '@/entities/post';
import { SITE_NAME, SITE_URL } from '@/shared/config';
import { formatDate } from '@/shared/lib';
import { JsonLd, PageIntro } from '@/shared/ui';
import { BlogPreview } from '@/widgets/blog-preview';
import { ContactClose } from '@/widgets/contact-close';

import styles from '../../../styles/pages/post.module.css';

type TProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export const generateStaticParams = () => getPosts().map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({ params }: TProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      images: [{ url: post.og, width: 1200, height: 630 }],
    },
  };
};

export default async function PostPage({ params }: TProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const others = getPosts().filter((item) => item.slug !== post.slug);

  return (
    <>
      <PageIntro
        crumbs={[
          { href: '/blog/', label: 'Блог' },
          { href: `/blog/${post.slug}/`, label: post.title },
        ]}
        title={post.title}
        lede={
          <span className={styles.meta}>
            <span>{post.description}</span>
            <span className="mono">
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} мин чтения
            </span>
          </span>
        }
      />
      <article className={`section ${styles.article}`}>
        <div className="wrap">
          <figure className={styles.cover}>
            <img src={post.cover} alt={post.coverAlt} width={800} height={600} />
          </figure>
          <PostBody blocks={post.blocks} />
        </div>
      </article>
      {others.length > 0 && <BlogPreview posts={others} title="Другие статьи" />}
      <ContactClose />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          inLanguage: 'ru',
          image: `${SITE_URL}${post.og}`,
          mainEntityOfPage: `${SITE_URL}/blog/${post.slug}/`,
          author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
          publisher: { '@id': `${SITE_URL}/#company` },
        }}
      />
    </>
  );
}
