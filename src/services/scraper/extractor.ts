import * as cheerio from 'cheerio';
import { ScrapedContent } from './types';

export async function extractContent(url: string): Promise<ScrapedContent> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove unwanted elements
    $('script, style, iframe, nav, footer, .ads, .comments, .related-posts').remove();

    // Extract content
    const title = $('meta[property="og:title"]').attr('content') || 
                 $('title').text() || 
                 $('h1').first().text();

    const description = $('meta[name="description"]').attr('content') || 
                       $('meta[property="og:description"]').attr('content') || 
                       $('p').first().text();

    const image = $('meta[property="og:image"]').attr('content') || 
                 $('article img').first().attr('src') || 
                 $('img').first().attr('src');

    const author = $('meta[name="author"]').attr('content') || 
                  $('.author').first().text() || 
                  $('[rel="author"]').first().text();

    const date = $('meta[property="article:published_time"]').attr('content') || 
                $('time').attr('datetime') || 
                $('.date').first().text();

    // Extract main content
    const mainContent = $('article').first().html() || 
                       $('main').first().html() || 
                       $('.content').first().html() || 
                       $('body').html() || '';

    // Extract tags
    const tags = new Set<string>();
    $('meta[name="keywords"]').attr('content')?.split(',').forEach(tag => 
      tags.add(tag.trim())
    );
    $('.tags a, .categories a').each((_, el) => 
      tags.add($(el).text().trim())
    );

    // Extract source
    const source = $('meta[property="og:site_name"]').attr('content');

    return {
      title: title?.trim() || '',
      description: description?.trim() || '',
      content: mainContent?.trim() || '',
      author: author?.trim(),
      date: date ? new Date(date).toISOString() : undefined,
      image: image?.trim() || 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      tags: Array.from(tags).filter(tag => tag.length > 0),
      source: source?.trim(),
      url
    };
  } catch (error) {
    console.error('Error extracting content:', error);
    throw error;
  }
}