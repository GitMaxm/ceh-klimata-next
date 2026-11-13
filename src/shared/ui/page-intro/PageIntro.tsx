import type { ReactNode } from 'react';

import { typograph } from '@/shared/lib';

import { Breadcrumbs, type TCrumb } from '../breadcrumbs';
import styles from './PageIntro.module.css';

type TPageIntroProps = {
  title: ReactNode;
  lede?: ReactNode;
  crumbs: TCrumb[];
  aside?: ReactNode;
};

export const PageIntro = ({ title, lede, crumbs, aside }: TPageIntroProps) => (
  <section className={styles.intro} data-ground="dark">
    <div className="wrap">
      <Breadcrumbs items={crumbs} />
      <div className={styles.body}>
        <div className={styles.text} data-enter>
          <h1 className={styles.title}>{typeof title === 'string' ? typograph(title) : title}</h1>
          {lede && <p className={styles.lede}>{typeof lede === 'string' ? typograph(lede) : lede}</p>}
        </div>
        {aside && <div className={styles.aside}>{aside}</div>}
      </div>
    </div>
  </section>
);
