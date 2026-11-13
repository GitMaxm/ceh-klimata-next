import Link from 'next/link';

import { typograph } from '@/shared/lib';
import { IconArrowRight } from '@/shared/ui';

import type { TPostBlock } from '../model/types';
import styles from './PostBody.module.css';

type TPostBodyProps = {
  blocks: TPostBlock[];
};

export const PostBody = ({ blocks }: TPostBodyProps) => (
  <div className={styles.body}>
    {blocks.map((block, index) => {
      switch (block.type) {
        case 'h2':
          return <h2 key={index}>{typograph(block.text)}</h2>;
        case 'ul':
          return (
            <ul key={index}>
              {block.items.map((item) => (
                <li key={item}>{typograph(item)}</li>
              ))}
            </ul>
          );
        case 'project':
          return (
            <Link key={index} href={`/projects/${block.slug}/`} className={styles.project} data-ground="dark">
              <span>{typograph(block.text)}</span>
              <span className={styles.projectGo}>
                Смотреть объект
                <IconArrowRight />
              </span>
            </Link>
          );
        default:
          return <p key={index}>{typograph(block.text)}</p>;
      }
    })}
  </div>
);
