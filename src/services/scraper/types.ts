export interface ScrapedContent {
  title: string;
  description: string;
  content: string;
  author?: string;
  date?: string;
  image?: string;
  tags: string[];
  source?: string;
  url: string;
}

export interface ScraperOptions {
  maxContentLength?: number;
  minContentLength?: number;
  requireImage?: boolean;
  requireAuthor?: boolean;
  requireDate?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}