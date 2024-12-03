export interface SearchResult {
  id: number;
  type: 'tool' | 'news' | 'article' | 'event' | 'tutorial';
  title: string;
  description: string;
  date?: string;
  url: string;
  relevance: number;
}