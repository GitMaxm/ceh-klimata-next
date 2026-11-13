import Link from 'next/link';
import type { ReactNode } from 'react';

import styles from './Button.module.css';

type TButtonProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'outline-light' | 'outline-dark' | 'dark';
  icon?: ReactNode;
  external?: boolean;
  className?: string;
};

export const Button = ({ href, children, variant = 'primary', icon, external, className }: TButtonProps) => {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ');
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if (external || !href.startsWith('/')) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
};
