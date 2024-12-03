import TurndownService from 'turndown';
import { ScrapedContent } from './types';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '_',
  strongDelimiter: '**',
  linkStyle: 'referenced'
});

export function formatContent(content: ScrapedContent): ScrapedContent {
  return {
    ...content,
    content: turndownService.turndown(content.content),
    title: formatTitle(content.title),
    description: formatDescription(content.description),
    tags: formatTags(content.tags)
  };
}

function formatTitle(title: string): string {
  return title
    .replace(/\s+/g, ' ')
    .trim();
}

function formatDescription(description: string): string {
  return description
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 200) + (description.length > 200 ? '...' : '');
}

function formatTags(tags: string[]): string[] {
  return tags
    .map(tag => tag.toLowerCase())
    .map(tag => tag.replace(/[^a-z0-9-]/g, '-'))
    .map(tag => tag.replace(/-+/g, '-'))
    .map(tag => tag.replace(/^-|-$/g, ''))
    .filter(tag => tag.length > 0)
    .filter((tag, index, self) => self.indexOf(tag) === index);
}