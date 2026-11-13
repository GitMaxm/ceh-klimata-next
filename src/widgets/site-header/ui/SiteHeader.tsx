'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { COMPANY_CONTACTS, NAV_ITEMS } from '@/shared/config';
import { ContactActions, IconClose, IconMenu, Logo } from '@/shared/ui';

import styles from './SiteHeader.module.css';

export const SiteHeader = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <header className={styles.header} data-ground="dark">
      <div className={`wrap ${styles.bar}`}>
        <Logo />
        <nav className={styles.nav} aria-label="Основная навигация">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.link}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a href={`tel:${COMPANY_CONTACTS.phone}`} className={`${styles.phone} mono`}>
          {COMPANY_CONTACTS.formattedPhone}
        </a>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      <div id="mobile-menu" className={styles.menu} data-open={menuOpen} inert={!menuOpen}>
        <nav className="wrap" aria-label="Меню">
          <ul className={styles.menuList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.menuActions}>
            <ContactActions withTelegram />
          </div>
        </nav>
      </div>
    </header>
  );
};
