import Link from 'next/link';

import styles from './Logo.module.css';

type TLogoProps = {
  tone?: 'light' | 'dark';
};

export const LogoMark = ({ tone = 'light' }: TLogoProps) => (
  <svg className={styles.mark} viewBox="0 0 64 64" aria-hidden="true">
    <path d="M12 14h42M12 14v38" stroke={tone === 'light' ? '#f1f0eb' : '#1d1d1b'} strokeWidth="5" fill="none" />
    <path d="M22 27c11 0 10 12 21 12h11" stroke="#8dc73f" strokeWidth="7" fill="none" />
  </svg>
);

export const Logo = ({ tone = 'light' }: TLogoProps) => (
  <Link href="/" className={styles.logo} data-tone={tone} aria-label="Цех Климата — на главную">
    <LogoMark tone={tone} />
    <span>Цех Климата</span>
  </Link>
);
