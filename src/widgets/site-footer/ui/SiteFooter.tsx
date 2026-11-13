import Link from 'next/link';

import { COMPANY_CONTACTS, NAV_ITEMS, SITE_CITY } from '@/shared/config';
import { Logo } from '@/shared/ui';

import styles from './SiteFooter.module.css';

export const SiteFooter = () => (
  <footer className={styles.footer} data-ground="dark">
    <div className={`wrap ${styles.grid}`}>
      <div className={styles.brand}>
        <Logo />
        <p className={styles.about}>
          Вентиляция и кондиционирование для квартир, домов и офисов. Проектирование, монтаж,
          пусконаладка и обслуживание.
        </p>
      </div>
      <nav aria-label="Разделы сайта">
        <ul className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <ul className={`${styles.contacts} mono`}>
        <li>
          <a href={`tel:${COMPANY_CONTACTS.phone}`}>{COMPANY_CONTACTS.formattedPhone}</a>
        </li>
        <li>
          <a href={COMPANY_CONTACTS.emailLink}>{COMPANY_CONTACTS.email}</a>
        </li>
      </ul>
    </div>
    <div className={`wrap ${styles.legal}`}>
      <span>
        © {new Date().getFullYear()} Цех Климата · {SITE_CITY}
      </span>
      <span>airceh.ru</span>
    </div>
  </footer>
);
