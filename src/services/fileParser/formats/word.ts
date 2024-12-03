import mammoth from 'mammoth';
import type { ScrapedContent } from '../../scraper/types';

export async function parseWordDocument(file: File): Promise<ScrapedContent> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    const content = result.value;

    // Extract title from first line
    const lines = content.split('\n').filter(line => line.trim());
    const title = lines[0] || file.name.replace('.docx', '');
    const description = lines[1] || lines[0] || '';

    return {
      title,
      description: description.slice(0, 200),
      content,
      author: 'AI Tools Hub',
      date: new Date().toISOString(),
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      tags: ['AI', 'Documentation'],
      source: 'Word Document',
      url: ''
    };
  } catch (error) {
    console.error('Error parsing Word document:', error);
    throw error;
  }
}