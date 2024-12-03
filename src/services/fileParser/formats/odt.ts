import { odt2html } from 'odt2html';
import * as cheerio from 'cheerio';
import type { ScrapedContent } from '../../scraper/types';

export async function parseODTDocument(file: File): Promise<ScrapedContent> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const html = await odt2html(new Uint8Array(arrayBuffer));
    const $ = cheerio.load(html);

    // Extract content
    const title = $('title').text() || $('h1').first().text() || file.name.replace('.odt', '');
    const content = $('body').text() || '';
    const description = content.slice(0, 200);

    return {
      title,
      description,
      content,
      author: 'AI Tools Hub',
      date: new Date().toISOString(),
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      tags: ['AI', 'Documentation'],
      source: 'OpenDocument Text',
      url: ''
    };
  } catch (error) {
    console.error('Error parsing ODT document:', error);
    throw error;
  }
}