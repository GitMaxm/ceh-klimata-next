import Link from 'next/link';

import { SITE_URL } from '@/shared/config';

import { JsonLd } from '../json-ld';
import styles from './Breadcrumbs.module.css';

export type TCrumb = { href: string; label: string };

type TBreadcrumbsProps = {
  items: TCrumb[];
};

export const Breadcrumbs = ({ items }: TBreadcrumbsProps) => {
  const trail = [{ href: '/', label: 'Главная' }, ...items];

  return (
    <>
      <nav aria-label="Навигационная цепочка" className={styles.crumbs}>
        <ol>
          {trail.map((item, index) => (
            <li key={item.href}>
              {index < trail.length - 1 ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: trail.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            item: `${SITE_URL}${item.href}`,
          })),
        }}
      />
    </>
  );
};
