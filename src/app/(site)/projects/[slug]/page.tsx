import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProject, getProjectFile, getProjectOg, getProjectPhoto, getProjectPhotos, getProjects, ProjectSpecs } from '@/entities/project';
import { PhotoViewer } from '@/features/photo-viewer';
import { pageMeta, typograph } from '@/shared/lib';
import { PageIntro } from '@/shared/ui';
import { ContactClose } from '@/widgets/contact-close';

import styles from '../../../styles/pages/project.module.css';

type TProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export const generateStaticParams = () => getProjects().map((project) => ({ slug: project.slug }));

export const generateMetadata = async ({ params }: TProps): Promise<Metadata> => {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return pageMeta({
    title: `${project.title}: вентиляция и кондиционирование`,
    description: project.summary,
    path: `/projects/${project.slug}/`,
    socialTitle: `${project.title} — Цех Климата`,
    image: getProjectOg(project.folder),
  });
};

export default async function ProjectPage({ params }: TProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const cover = getProjectPhoto(project.folder, project.cover);
  const before = getProjectPhoto(project.folder, project.before);
  const photos = getProjectPhotos(project.folder);
  const plan = project.plan ? getProjectFile(project.folder, project.plan) : null;

  return (
    <>
      <PageIntro
        crumbs={[
          { href: '/projects/', label: 'Проекты' },
          { href: `/projects/${project.slug}/`, label: project.title },
        ]}
        title={project.title}
        lede={`${project.objectType}. ${project.location}. ${project.summary}`}
        aside={
          <div className={styles.specs}>
            <ProjectSpecs specs={project.specs} />
          </div>
        }
      />

      {cover && before && (
        <section className={styles.stages} aria-label="Монтаж и готовый интерьер">
          <div className={`wrap ${styles.stagesGrid}`}>
            <figure className={styles.stage}>
              <figcaption>Монтаж до отделки</figcaption>
              <div className={styles.stageFrame}>
                <img src={before.src} alt={`${project.title}: трассы под бетонным потолком до отделки`} width={before.width} height={before.height} fetchPriority="high" />
              </div>
            </figure>
            <figure className={styles.stage}>
              <figcaption>Готовая квартира</figcaption>
              <div className={styles.stageFrame}>
                <img src={cover.src} alt={`${project.title}: готовая комната со щелевым диффузором`} width={cover.width} height={cover.height} fetchPriority="high" />
              </div>
            </figure>
          </div>
        </section>
      )}

      <section className={`section ${styles.work}`}>
        <div className={`wrap ${styles.workGrid}`}>
          <div>
            <h2 className="h2">Задача</h2>
            <p className={styles.task}>{typograph(project.task)}</p>
            <h3 className={styles.subTitle}>Оборудование</h3>
            <ul className={styles.equipment}>
              {project.equipment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h2">Что сделали</h2>
            <ol className={styles.solution}>
              {project.solution.map((item) => (
                <li key={item.title} data-route={item.route}>
                  <h3>{item.title}</h3>
                  <p>{typograph(item.text)}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {plan && (
        <section className={`section ${styles.plan}`}>
          <div className="wrap">
            <h2 className="h2">Схема трасс</h2>
            <p className="lede">Расположение воздуховодов, блоков и диффузоров по проекту.</p>
            <div className={styles.planFrame}>
              <img src={plan.src} alt={`Схема трасс вентиляции и кондиционирования, ${project.title}`} width={plan.width} height={plan.height} loading="lazy" decoding="async" />
            </div>
          </div>
        </section>
      )}

      <section className={`section ${styles.gallery}`}>
        <div className="wrap">
          <h2 className="h2">Фотоотчёт: {photos.length} фото</h2>
          <p className="lede">От открытого бетонного потолка с трассами до готовых комнат.</p>
          <div className={styles.viewer}>
            <PhotoViewer photos={photos} title={project.title} />
          </div>
        </div>
      </section>

      <ContactClose />
    </>
  );
}
