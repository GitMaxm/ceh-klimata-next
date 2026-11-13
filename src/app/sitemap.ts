import type { MetadataRoute } from 'next';

import { getPosts } from '@/entities/post';
import { getProjects } from '@/entities/project';
import { SITE_URL } from '@/shared/config';

export const dynamic = 'force-static';

const sitemap = (): MetadataRoute.Sitemap => [
  { url: `${SITE_URL}/`, changeFrequency: 'monthly', priority: 1 },
  { url: `${SITE_URL}/services/`, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${SITE_URL}/projects/`, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${SITE_URL}/about/`, changeFrequency: 'yearly', priority: 0.6 },
  { url: `${SITE_URL}/blog/`, changeFrequency: 'weekly', priority: 0.7 },
  { url: `${SITE_URL}/contacts/`, changeFrequency: 'yearly', priority: 0.7 },
  ...getProjects().map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  })),
  ...getPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: post.date,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  })),
];

export default sitemap;
