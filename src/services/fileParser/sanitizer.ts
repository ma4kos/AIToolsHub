import sanitizeHtml from 'sanitize-html';
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeContent(content: string): string {
  // First pass: Use sanitize-html for basic HTML cleaning
  const sanitizedHtml = sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title']
    }
  });

  // Second pass: Use DOMPurify for additional security
  return DOMPurify.sanitize(sanitizedHtml);
}