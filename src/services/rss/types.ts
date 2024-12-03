export interface RSSItem {
  title: string;
  description: string;
  content: string;
  link: string;
  pubDate: string;
}

export interface ParsedFeed {
  items: RSSItem[];
}

export interface RSSFeed {
  id: number;
  name: string;
  url: string;
  category: string;
  content_type: 'news' | 'article';
  active: boolean;
  max_articles: number;
  last_fetch: string | null;
  update_frequency: string;
  retention_days: number;
}

export interface ArticleData {
  title: string;
  description: string;
  content: string;
  date: string;
  image: string;
  tags: string[];
  slug: string;
  created_at: string;
  updated_at: string;
  author?: string;
  read_time?: string;
  category?: string;
}