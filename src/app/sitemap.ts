import type { MetadataRoute } from 'next';

import { projectsContent } from '@/entities/main/project';
import { SITE_URL } from '@/shared/config';

export const dynamic = 'force-static';

const sitemap = (): MetadataRoute.Sitemap => [
  { url: `${SITE_URL}/`, changeFrequency: 'monthly', priority: 1 },
  { url: `${SITE_URL}/projects/`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${SITE_URL}/contacts/`, changeFrequency: 'yearly', priority: 0.5 },
  ...projectsContent.map((project) => ({
    url: `${SITE_URL}/project/${project.id}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  })),
];

export default sitemap;
