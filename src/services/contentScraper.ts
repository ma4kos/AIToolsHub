import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import slugify from 'slugify';
import { supabase } from '../lib/supabase';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

interface ScrapedContent {
  title: string;
  description: string;
  content: string;
  author?: string;
  date?: string;
  image?: string;
  tags: string[];
}

export async function scrapeContent(url: string): Promise<ScrapedContent> {
  try {
    // Fetch the content
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract content
    const title = $('title').text() || $('h1').first().text();
    const description = $('meta[name="description"]').attr('content') || 
                       $('meta[property="og:description"]').attr('content') ||
                       $('p').first().text();
    
    // Get main content
    const mainContent = $('article').first().html() || 
                       $('main').first().html() || 
                       $('.content').first().html() ||
                       $('body').html();

    // Convert HTML to Markdown
    const content = turndownService.turndown(mainContent || '');

    // Extract metadata
    const author = $('meta[name="author"]').attr('content') ||
                  $('.author').first().text();
    
    const date = $('meta[name="date"]').attr('content') ||
                $('time').attr('datetime') ||
                $('.date').first().text();

    // Get main image
    const image = $('meta[property="og:image"]').attr('content') ||
                 $('article img').first().attr('src') ||
                 $('img').first().attr('src');

    // Extract potential tags
    const tags = new Set<string>();
    $('meta[name="keywords"]').attr('content')?.split(',').forEach(tag => 
      tags.add(tag.trim())
    );
    $('.tags a, .categories a').each((_, el) => 
      tags.add($(el).text().trim())
    );

    return {
      title: title.trim(),
      description: description?.trim() || '',
      content: content.trim(),
      author: author?.trim(),
      date: date?.trim(),
      image: image?.trim(),
      tags: Array.from(tags)
    };
  } catch (error) {
    console.error('Error scraping content:', error);
    throw error;
  }
}

export async function generateContent(url: string, type: 'news' | 'article') {
  try {
    const scrapedContent = await scrapeContent(url);
    const slug = slugify(scrapedContent.title, { lower: true, strict: true });

    const contentData = {
      title: scrapedContent.title,
      description: scrapedContent.description,
      content: scrapedContent.content,
      image: scrapedContent.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      tags: scrapedContent.tags,
      slug,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (type === 'article') {
      Object.assign(contentData, {
        author: scrapedContent.author || 'AI Tools Hub',
        read_time: `${Math.ceil(scrapedContent.content.split(' ').length / 200)} min`,
        category: scrapedContent.tags[0] || 'Technology'
      });
    } else {
      Object.assign(contentData, {
        date: scrapedContent.date || new Date().toISOString()
      });
    }

    const { data, error } = await supabase
      .from(type === 'news' ? 'news' : 'articles')
      .insert([contentData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}