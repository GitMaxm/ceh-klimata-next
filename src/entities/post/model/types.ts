export type TPostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'project'; slug: string; text: string };

export type TPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  cover: string;
  coverAlt: string;
  og: string;
  blocks: TPostBlock[];
};
