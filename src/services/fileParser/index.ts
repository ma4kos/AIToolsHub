import { parseWordDocument } from './formats/word';
import { parseXMLFile } from './formats/xml';
import { parseHTMLArchive } from './formats/html';
import { sanitizeContent } from './sanitizer';
import type { ScrapedContent } from '../scraper/types';

export async function parseFile(file: File): Promise<ScrapedContent> {
  try {
    const fileType = file.type;
    const fileName = file.name.toLowerCase();
    let content: ScrapedContent;

    // Determine file type and parse accordingly
    if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        fileName.endsWith('.docx')) {
      content = await parseWordDocument(file);
    } else if (fileType === 'application/xml' || fileType === 'text/xml' ||
               fileName.endsWith('.xml')) {
      content = await parseXMLFile(file);
    } else if (fileType === 'application/zip' || fileName.endsWith('.zip')) {
      content = await parseHTMLArchive(file);
    } else {
      throw new Error('Unsupported file type');
    }

    // Sanitize the content
    return {
      ...content,
      content: sanitizeContent(content.content)
    };
  } catch (error) {
    console.error('Error parsing file:', error);
    throw error;
  }
}