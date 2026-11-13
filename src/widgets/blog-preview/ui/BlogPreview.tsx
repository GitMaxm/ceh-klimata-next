import Link from 'next/link';

import { PostCard, type TPost } from '@/entities/post';
import { IconArrowRight } from '@/shared/ui';

import styles from './BlogPreview.module.css';

type TBlogPreviewProps = {
  posts: TPost[];
  title?: string;
};

export const BlogPreview = ({ posts, title = 'Статьи о вентиляции и кондиционировании' }: TBlogPreviewProps) => (
  <section className={`section ${styles.section}`}>
    <div className="wrap">
      <div className={styles.head}>
        <h2 className="h2">{title}</h2>
        <Link href="/blog/" className={styles.all}>
          Читать все статьи
          <IconArrowRight />
        </Link>
      </div>
      <div className={styles.grid}>
        {posts.slice(0, 3).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  </section>
);
