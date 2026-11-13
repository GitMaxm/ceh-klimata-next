import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getProjectById, getProjectImages, ProjectGallery, projectsContent } from '@/entities/main/project';

interface IProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projectsContent.map((project) => ({
    id: project.id.toString(),
  }));
}

export async function generateMetadata({ params }: IProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return { title: 'Проект не найден' };
  }

  return {
    title: project.title,
    description: project.subtitle,
  };
}

const VentilationProjectPage = async ({ params }: IProjectPageProps) => {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const galleryImages = project.gallery && Array.isArray(project.gallery)
    ? project.gallery
    : project.galleryFolder
      ? getProjectImages(project.galleryFolder)
      : [];

  return (
    <main className="section ventilation-project" aria-labelledby="project-title">
      <div className="container">
        <div className="project-details">
          {/* Заголовок и основная информация */}
          <div className="project-header">
            <h1 id="project-title" className="title-1">{project.title}</h1>
            <p className="project-location">{project.location}</p>
            {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
          </div>

          {/* Главное изображение */}
          {project.mainImage && (
            <div className="project-main-image">
              <Image
                src={`/img/projects/${project.mainImage}`}
                alt={`Проект вентиляции: ${project.title}`}
                width={1920}
                height={1280}
                className="project-img-main"
                quality={95}
                priority
              />
            </div>
          )}

          {/* Ключевые показатели */}
          {project.stats && (
            <div className="project-stats">
              <div className="stats-grid">
                {project.stats.area && (
                  <div className="stat-item">
                    <span className="stat-label">Площадь</span>
                    <span className="stat-value">{project.stats.area}</span>
                  </div>
                )}
                {project.stats.duration && (
                  <div className="stat-item">
                    <span className="stat-label">Срок работ</span>
                    <span className="stat-value">{project.stats.duration}</span>
                  </div>
                )}
                {project.stats.design && (
                  <div className="stat-item">
                    <span className="stat-label">Проектирование</span>
                    <span className="stat-value">{project.stats.design}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Технологии */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="project-technologies">
              <h2 className="section-title">Технологии</h2>
              <div className="tech-tags">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          )}

          {/* Задача */}
          {project.task && (
            <div className="project-section task-section">
              <h2 className="section-title">Задача</h2>
              <p className="section-content">{project.task}</p>
            </div>
          )}

          {/* Решение и технологии */}
          {project.solution && project.solution.length > 0 && (
            <div className="project-section solution-section">
              <h2 className="section-title">Решение и реализованные технологии</h2>
              <div className="solution-items">
                {project.solution.map((item, index) => (
                  <div key={index} className="solution-item">
                    <h3 className="solution-title">{item.title}</h3>
                    <p className="solution-description">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Детали и уникальные моменты */}
          {project.details && project.details.length > 0 && (
            <div className="project-section details-section">
              <h2 className="section-title">Детали и уникальные моменты</h2>
              <ul className="details-list">
                {project.details.map((detail, index) => (
                  <li key={index} className="detail-item">{detail}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Результат */}
          {project.result && (
            <div className="project-section result-section">
              <h2 className="section-title">Результат</h2>
              <p className="section-content">{project.result}</p>
            </div>
          )}

          {/* Галерея со слайдером */}
          <ProjectGallery images={galleryImages} />

          {/* CTA блок */}
          {project.cta && (
            <div className="project-cta">
              <h3 className="cta-title">{project.cta.title}</h3>
              <p className="cta-text">{project.cta.text}</p>
              <Link href="/contacts/" className="btn-primary">
                Обсудить проект
              </Link>
            </div>
          )}

          {/* Навигация */}
          <div className="project-navigation">
            <Link href="/projects/" className="btn-outline">
              ← Все проекты
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VentilationProjectPage;
