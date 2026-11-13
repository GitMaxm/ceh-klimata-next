import type { Metadata } from 'next';
import Link from 'next/link';

import { THEME_INIT_SCRIPT } from '@/shared/ui/main';
import { Footer } from '@/widgets/main/footer';
import { NavBar } from '@/widgets/main/navbar';

import styles from './styles/not-found.module.css';

export const metadata: Metadata = {
  title: '404 — Страница не найдена',
  robots: { index: false },
};

const NotFound = () => {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      <NavBar />

      <main className={styles.page}>
        <div className={styles.wrapper}>
          <div className={styles.code}>
            <span className={styles.digit}>4</span>

            <div className={styles.gifWrap}>
              <img src="/img/404/404.gif" alt="" className={styles.gif} loading="lazy" decoding="async" />
            </div>

            <span className={styles.digit}>4</span>
          </div>

          <p className={styles.title}>СТРАНИЦА НЕ НАЙДЕНА</p>
          <p className={styles.sub}>Такой страницы не существует или она была перемещена</p>

          <Link href="/" className={styles.btn}>
            НА ГЛАВНУЮ
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default NotFound;
