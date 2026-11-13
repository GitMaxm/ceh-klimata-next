import type { Metadata } from 'next';

import { getPosts, PostCard } from '@/entities/post';
import { PageIntro } from '@/shared/ui';
import { ContactClose } from '@/widgets/contact-close';

import styles from '../../styles/pages/blog.module.css';

export const metadata: Metadata = {
  title: 'Блог о вентиляции и кондиционировании',
  description:
    'Статьи «Цеха Климата» о приточной вентиляции, канальных кондиционерах и о том, на какой стадии ремонта закладывать климатическую систему.',
  alternates: { canonical: '/blog/' },
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <PageIntro
        crumbs={[{ href: '/blog/', label: 'Блог' }]}
        title="Блог о вентиляции и кондиционировании"
        lede="Разбираем, как выбрать систему, где спрятать оборудование и что решить до начала отделки."
      />
      <section className={`section ${styles.section}`}>
        <div className={`wrap ${styles.grid}`}>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
      <ContactClose />
    </>
  );
}
