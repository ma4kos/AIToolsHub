import { ScrapedContent } from '../types';

export async function scrapeGoogleDoc(url: string): Promise<ScrapedContent> {
  try {
    // For Google Docs, we'll use a simpler approach since we can't directly access the content
    // Instead, we'll extract what's visible in the HTML
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch Google Doc: ${response.statusText}`);
    }
    const html = await response.text();

    // Extract title from the page
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1].replace(' - Google Docs', '').trim() : '';

    // Extract content from the document
    const contentMatch = html.match(/<div id="contents">(.*?)<\/div>/s);
    let content = contentMatch ? contentMatch[1] : '';

    // Clean up the content
    content = content
      .replace(/<[^>]+>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace &nbsp; with spaces
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    // Generate a description from the content
    const description = content.length > 200 
      ? content.slice(0, 197) + '...'
      : content;

    return {
      title,
      description,
      content,
      author: 'AI Tools Hub',
      date: new Date().toISOString(),
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      tags: ['AI', 'Documentation'],
      source: 'Google Docs',
      url
    };
  } catch (error) {
    console.error('Error scraping Google Doc:', error);
    throw error;
  }
}