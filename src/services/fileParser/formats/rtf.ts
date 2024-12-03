import type { ScrapedContent } from '../../scraper/types';

export async function parseRTFDocument(file: File): Promise<ScrapedContent> {
  try {
    const text = await file.text();
    const content = text.replace(/[{}\\]/g, ''); // Simple RTF cleaning

    const lines = content.split('\n').filter(line => line.trim());
    const title = lines[0] || file.name.replace('.rtf', '');

    return {
      title,
      description: content.slice(0, 200),
      content,
      author: 'AI Tools Hub',
      date: new Date().toISOString(),
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      tags: ['AI', 'Documentation'],
      source: 'Rich Text Format',
      url: ''
    };
  } catch (error) {
    console.error('Error parsing RTF document:', error);
    throw error;
  }
}