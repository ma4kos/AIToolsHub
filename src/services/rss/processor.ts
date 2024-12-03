import { supabase } from '../../lib/supabase';
import { RSSItem, RSSFeed, ArticleData } from './types';
import slugify from 'slugify';

export async function processRSSItems(items: RSSItem[], feed: RSSFeed): Promise<void> {
  const table = feed.content_type === 'news' ? 'news' : 'articles';
  const limitedItems = items.slice(0, feed.max_articles || 5);

  for (const item of limitedItems) {
    try {
      const articleData = await createArticleData(item, feed);
      await insertArticle(articleData, table);
    } catch (error) {
      console.error('Error processing item:', error);
      continue;
    }
  }
}

async function createArticleData(item: RSSItem, feed: RSSFeed): Promise<ArticleData> {
  const slug = await generateUniqueSlug(item.title, feed.content_type === 'news' ? 'news' : 'articles');
  const now = new Date().toISOString();
  
  const baseData = {
    title: item.title,
    description: item.description,
    content: item.content,
    date: item.pubDate,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    tags: [feed.category],
    slug,
    created_at: now,
    updated_at: now
  };

  if (feed.content_type === 'article') {
    return {
      ...baseData,
      author: feed.name,
      read_time: '5 min',
      category: feed.category
    };
  }

  return baseData;
}

async function generateUniqueSlug(title: string, table: string): Promise<string> {
  let slug = slugify(title, { lower: true, strict: true });
  let counter = 0;
  let uniqueSlug = slug;
  
  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select('slug')
      .eq('slug', uniqueSlug)
      .single();

    if (error || !data) {
      return uniqueSlug;
    }

    counter++;
    uniqueSlug = `${slug}-${counter}`;
  }
}

async function insertArticle(articleData: ArticleData, table: string): Promise<void> {
  try {
    const { error } = await supabase
      .from(table)
      .insert([articleData]);

    if (error) {
      if (error.code === '23505') { // Unique violation
        console.log(`Article "${articleData.title}" already exists, skipping...`);
        return;
      }
      throw error;
    }
  } catch (error) {
    console.error('Error inserting article:', error);
    throw error;
  }
}