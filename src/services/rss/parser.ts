import { RSSItem, ParsedFeed } from './types';

export function parseRSSFeed(xmlText: string): ParsedFeed {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

  if (xmlDoc.querySelector('parsererror')) {
    throw new Error('Invalid XML format');
  }

  const items = xmlDoc.querySelectorAll('item');
  if (!items.length) {
    throw new Error('No items found in feed');
  }

  const articles = Array.from(items)
    .map(item => parseRSSItem(item))
    .filter((item): item is RSSItem => item !== null);

  if (!articles.length) {
    throw new Error('No valid articles found in feed');
  }

  return { items: articles };
}

function parseRSSItem(item: Element): RSSItem | null {
  const title = item.querySelector('title')?.textContent;
  if (!title) return null;

  const description = item.querySelector('description')?.textContent || '';
  const content = item.querySelector('content\\:encoded')?.textContent || description;
  const pubDate = item.querySelector('pubDate')?.textContent;
  const link = item.querySelector('link')?.textContent || '';

  return {
    title,
    description,
    content,
    link,
    pubDate: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString()
  };
}