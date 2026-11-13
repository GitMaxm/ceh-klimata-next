import Link from 'next/link';

import { formatDate, typograph } from '@/shared/lib';

import type { TPost } from '../model/types';
import styles from './PostCard.module.css';

type TPostCardProps = {
  post: TPost;
  tone?: 'on-dark' | 'on-light';
};

export const PostCard = ({ post, tone = 'on-light' }: TPostCardProps) => (
  <Link href={`/blog/${post.slug}/`} className={styles.card} data-tone={tone}>
    <div className={styles.media}>
      <img
        src={post.cover}
        alt=""
        width={800}
        height={600}
        loading="lazy"
        decoding="async"
      />
    </div>
    <p className={`${styles.meta} mono`}>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span>{post.readingMinutes} мин чтения</span>
    </p>
    <h3 className={styles.title}>{typograph(post.title)}</h3>
    <p className={styles.text}>{typograph(post.description)}</p>
  </Link>
);
