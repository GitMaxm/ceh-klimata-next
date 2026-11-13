import type { TProjectSpec } from '../model/types';
import styles from './ProjectSpecs.module.css';

type TProjectSpecsProps = {
  specs: TProjectSpec[];
  tone?: 'on-dark' | 'on-light';
};

export const ProjectSpecs = ({ specs, tone = 'on-dark' }: TProjectSpecsProps) => (
  <dl className={styles.specs} data-tone={tone}>
    {specs.map((spec) => (
      <div key={spec.label}>
        <dt>{spec.label}</dt>
        <dd>{spec.value}</dd>
      </div>
    ))}
  </dl>
);
