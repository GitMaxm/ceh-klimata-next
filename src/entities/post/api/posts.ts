import postsData from '@content/posts.json';

import type { TPost } from '../model/types';

const posts = (postsData as TPost[]).toSorted((a, b) => b.date.localeCompare(a.date));

export const getPosts = (): TPost[] => posts;

export const getPost = (slug: string): TPost | undefined => posts.find((post) => post.slug === slug);
