import type { SVGProps } from 'react';

type TIconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'square' as const,
  strokeLinejoin: 'miter' as const,
  'aria-hidden': true,
};

export const IconPhone = (props: TIconProps) => (
  <svg {...base} {...props}>
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
  </svg>
);

export const IconMail = (props: TIconProps) => (
  <svg {...base} {...props}>
    <path d="M3 5h18v14H3z" />
    <path d="m3 6 9 7 9-7" />
  </svg>
);

export const IconArrowRight = (props: TIconProps) => (
  <svg {...base} {...props}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const IconArrowLeft = (props: TIconProps) => (
  <svg {...base} {...props}>
    <path d="M20 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const IconClose = (props: TIconProps) => (
  <svg {...base} {...props}>
    <path d="M5 5l14 14M19 5 5 19" />
  </svg>
);

export const IconMenu = (props: TIconProps) => (
  <svg {...base} {...props}>
    <path d="M3 7h18M3 12h18M3 17h18" />
  </svg>
);
