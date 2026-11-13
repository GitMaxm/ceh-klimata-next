'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from '@/shared/config';
import { BtnDarkMode } from '@/shared/ui/main';

// Убираем трейлинг-слэш, чтобы корректно сравнивать путь с href пункта меню
const normalizePath = (path: string): string => (path !== '/' ? path.replace(/\/+$/, '') : path);

const NavBar = () => {
  const pathname = usePathname();
  const activeLink = 'nav-list__link nav-list__link--active';
  const normalLink = 'nav-list__link';

  const isActive = (href: string) => normalizePath(pathname) === normalizePath(href);

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-row">
          <Link href="/" className="logo">
            <Image src="/img/logo/logo.png" alt="Цех Климата — логотип" width={200} height={40} priority />
          </Link>

          <BtnDarkMode />

          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="nav-list__item">
                <Link
                  href={item.href}
                  className={isActive(item.href) ? activeLink : normalLink}
                  title={item.title}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { NavBar };
