'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { COMPANY_CONTACTS } from '@/shared/config';
import { IconPhone, IconWhatsapp } from '@/shared/ui';

import styles from './ContactBar.module.css';

export const ContactBar = () => {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const targets = document.querySelectorAll('[data-primary-actions]');
    const visible = new Set<Element>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.add(entry.target);
        } else {
          visible.delete(entry.target);
        }
      });
      setHidden(visible.size > 0);
    });

    targets.forEach((target) => observer.observe(target));

    const frame = targets.length === 0 ? requestAnimationFrame(() => setHidden(false)) : 0;

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <div className={styles.bar} data-hidden={hidden} data-ground="dark">
      <a href={`tel:${COMPANY_CONTACTS.phone}`} className={styles.call} tabIndex={hidden ? -1 : undefined}>
        <IconPhone />
        Позвонить
      </a>
      <a
        href={COMPANY_CONTACTS.whatsappLink}
        className={styles.wa}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={hidden ? -1 : undefined}
      >
        <IconWhatsapp />
        WhatsApp
      </a>
    </div>
  );
};
