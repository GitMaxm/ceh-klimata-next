export const NAV_ITEMS = [
  { href: '/projects/', label: 'Проекты' },
  { href: '/services/', label: 'Услуги' },
  { href: '/about/', label: 'О компании' },
  { href: '/blog/', label: 'Блог' },
  { href: '/contacts/', label: 'Контакты' },
] as const;

export type TNavItem = (typeof NAV_ITEMS)[number];
