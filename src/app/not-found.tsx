import type { Metadata } from 'next';

import { Button } from '@/shared/ui';
import { ContactBar } from '@/widgets/contact-bar';
import { SiteFooter } from '@/widgets/site-footer';
import { SiteHeader } from '@/widgets/site-header';

import styles from './styles/pages/not-found.module.css';

export const metadata: Metadata = {
  title: 'Страница не найдена',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page} data-ground="dark">
        <div className={`wrap ${styles.inner}`} data-enter>
          <p className={`${styles.code} mono`}>404</p>
          <h1 className={styles.title}>Такой страницы нет</h1>
          <p className={styles.text}>Возможно, адрес изменился. Проекты, услуги и контакты — в меню или на главной.</p>
          <div className={styles.actions}>
            <Button href="/">Перейти на главную</Button>
            <Button href="/projects/" variant="outline-light">
              Смотреть проекты
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
      <ContactBar />
    </>
  );
}
