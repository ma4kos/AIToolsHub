import { parseString } from 'xml2js';
import type { ScrapedContent } from '../../scraper/types';

export async function parseXMLFile(file: File): Promise<ScrapedContent> {
  try {
    const text = await file.text();
    
    return new Promise((resolve, reject) => {
      parseString(text, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        // Extract content from XML structure
        const title = result?.article?.title?.[0] || 
                     result?.content?.title?.[0] || 
                     file.name.replace('.xml', '');

        const content = result?.article?.content?.[0] || 
                       result?.content?.body?.[0] || 
                       JSON.stringify(result, null, 2);

        resolve({
          title: typeof title === 'string' ? title : file.name.replace('.xml', ''),
          description: content.slice(0, 200),
          content: typeof content === 'string' ? content : JSON.stringify(result, null, 2),
          author: result?.article?.author?.[0] || 'AI Tools Hub',
          date: new Date().toISOString(),
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
          tags: ['AI', 'Documentation'],
          source: 'XML Document',
          url: ''
        });
      });
    });
  } catch (error) {
    console.error('Error parsing XML file:', error);
    throw error;
  }
}