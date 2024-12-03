import { parseWordDocument, parseXMLFile, parseHTMLArchive, parseODTDocument, parseRTFDocument } from './formats';
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
    } else if (fileType === 'application/vnd.oasis.opendocument.text' ||
               fileName.endsWith('.odt')) {
      content = await parseODTDocument(file);
    } else if (fileType === 'application/rtf' || fileName.endsWith('.rtf')) {
      content = await parseRTFDocument(file);
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