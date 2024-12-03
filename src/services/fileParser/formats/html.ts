import JSZip from 'jszip';
import * as cheerio from 'cheerio';
import type { ScrapedContent } from '../../scraper/types';

export async function parseHTMLArchive(file: File): Promise<ScrapedContent> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const zip = new JSZip();
    const contents = await zip.loadAsync(arrayBuffer);
    
    // Find the main HTML file
    const htmlFile = Object.values(contents.files).find(file => 
      file.name.endsWith('.html') || file.name.endsWith('.htm')
    );

    if (!htmlFile) {
      throw new Error('No HTML file found in archive');
    }

    const html = await htmlFile.async('text');
    const $ = cheerio.load(html);

    // Extract content
    const title = $('title').text() || $('h1').first().text() || file.name.replace('.zip', '');
    const content = $('body').text() || '';
    const description = content.slice(0, 200);

    return {
      title,
      description,
      content,
      author: $('meta[name="author"]').attr('content') || 'AI Tools Hub',
      date: new Date().toISOString(),
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      tags: ['AI', 'Documentation'],
      source: 'HTML Archive',
      url: ''
    };
  } catch (error) {
    console.error('Error parsing HTML archive:', error);
    throw error;
  }
}