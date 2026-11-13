'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

type TRevealProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section';
};

export const Reveal = ({ children, className, as: Tag = 'div' }: TRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'in'>('idle');

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('in');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className} data-reveal={state}>
      {children}
    </Tag>
  );
};
