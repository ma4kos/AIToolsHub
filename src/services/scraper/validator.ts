import type { ScrapedContent, ScraperOptions, ValidationResult } from './types';

export function validateContent(content: ScrapedContent, options: ScraperOptions = {}): ValidationResult {
  const errors: string[] = [];
  const {
    maxContentLength = 50000,
    minContentLength = 50,
    requireImage = false,
    requireAuthor = false,
    requireDate = false
  } = options;

  // Required fields
  if (!content.title?.trim()) {
    errors.push('Title is required');
  }

  if (!content.content?.trim()) {
    errors.push('Content is required');
  }

  // Content length validation
  if (content.content && content.content.length < minContentLength) {
    errors.push(`Content must be at least ${minContentLength} characters`);
  }

  if (content.content && content.content.length > maxContentLength) {
    errors.push(`Content must not exceed ${maxContentLength} characters`);
  }

  // Optional requirements
  if (requireImage && !content.image) {
    errors.push('Image is required');
  }

  if (requireAuthor && !content.author) {
    errors.push('Author is required');
  }

  if (requireDate && !content.date) {
    errors.push('Date is required');
  }

  // URL validation
  if (!content.url) {
    errors.push('URL is required');
  } else {
    try {
      new URL(content.url);
    } catch {
      errors.push('Invalid URL format');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}