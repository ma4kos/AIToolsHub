import { scrapeContent } from '../scraper';
import { enhanceWithGemini } from './gemini';
import { supabase } from '../../lib/supabase';
import slugify from 'slugify';
import type { ScrapedContent } from '../scraper/types';

export async function generateAndSaveContent(
  input: string | ScrapedContent,
  type: 'news' | 'article'
): Promise<any> {
  try {
    // Get content either from URL or parsed file
    const scrapedContent = typeof input === 'string'
      ? await scrapeContent(input, {
          requireImage: true,
          requireDate: type === 'news',
          requireAuthor: type === 'article'
        })
      : input;

    // Enhance content using Gemini AI
    const enhancedContent = await enhanceWithGemini(scrapedContent);

    // Generate a unique slug
    const baseSlug = slugify(enhancedContent.title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Check for existing slug
    while (true) {
      const { data } = await supabase
        .from(type === 'news' ? 'news' : 'articles')
        .select('slug')
        .eq('slug', slug)
        .single();

      if (!data) break;
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Prepare content data for saving
    const contentData = {
      title: enhancedContent.title,
      description: enhancedContent.description,
      content: enhancedContent.content,
      image: enhancedContent.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      tags: enhancedContent.tags,
      slug,
      source: enhancedContent.source,
      link: typeof input === 'string' ? input : '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...(type === 'article' ? {
        author: enhancedContent.author || 'AI Tools Hub',
        read_time: `${Math.ceil(enhancedContent.content.split(' ').length / 200)} min`,
        category: enhancedContent.tags[0] || 'Technology'
      } : {
        date: enhancedContent.date || new Date().toISOString()
      })
    };

    // Save to database
    const { data, error } = await supabase
      .from(type === 'news' ? 'news' : 'articles')
      .insert([contentData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error generating and saving content:', error);
    throw error;
  }
}