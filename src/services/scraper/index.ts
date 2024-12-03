import { extractContent } from './extractor';
import { formatContent } from './formatter';
import { validateContent } from './validator';
import { scrapeGoogleDoc } from './providers/googleDocs';
import type { ScrapedContent, ScraperOptions } from './types';

export async function scrapeContent(url: string, options: ScraperOptions = {}): Promise<ScrapedContent> {
  try {
    let content: ScrapedContent;

    // Check if URL is from Google Docs
    if (url.includes('docs.google.com')) {
      content = await scrapeGoogleDoc(url);
    } else {
      // Extract raw content for other URLs
      const rawContent = await extractContent(url);
      content = formatContent(rawContent);
    }

    // Validate content
    const validation = validateContent(content, options);
    if (!validation.isValid) {
      throw new Error(`Content validation failed: ${validation.errors.join(', ')}`);
    }

    return content;
  } catch (error) {
    console.error('Error scraping content:', error);
    throw error;
  }
}

export * from './types';
export * from './extractor';
export * from './formatter';
export * from './validator';
export * from './providers/googleDocs';