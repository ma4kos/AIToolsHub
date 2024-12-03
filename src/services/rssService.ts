import { supabase } from '../lib/supabase';
import slugify from 'slugify';

export async function refreshRSSFeed(id: number) {
  try {
    // Get feed details
    const { data: feed, error: feedError } = await supabase
      .from('rss_feeds')
      .select('*')
      .eq('id', id)
      .single();

    if (feedError) throw feedError;
    if (!feed) throw new Error('Feed not found');

    // Fetch and parse RSS feed
    const response = await fetch(feed.url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    if (xmlDoc.querySelector('parsererror')) {
      throw new Error('Invalid XML format');
    }

    const items = xmlDoc.querySelectorAll('item');
    if (!items.length) {
      throw new Error('No items found in feed');
    }

    const articles = Array.from(items)
      .slice(0, feed.max_articles || 5)
      .map(item => {
        const title = item.querySelector('title')?.textContent;
        if (!title) return null;

        const description = item.querySelector('description')?.textContent || '';
        const content = item.querySelector('content\\:encoded')?.textContent || description;
        const pubDate = item.querySelector('pubDate')?.textContent;
        const link = item.querySelector('link')?.textContent || '';

        return {
          title,
          description,
          content,
          link,
          pubDate: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
          category: feed.category,
          source: feed.name
        };
      })
      .filter(article => article !== null);

    if (!articles.length) {
      throw new Error('No valid articles found in feed');
    }

    // Insert articles into the appropriate table
    const table = feed.content_type === 'news' ? 'news' : 'articles';
    
    for (const article of articles) {
      if (!article) continue;

      try {
        const slug = await generateUniqueSlug(article.title, table);
        
        // Check if article already exists
        const { data: existing } = await supabase
          .from(table)
          .select('id')
          .eq('slug', slug)
          .single();

        if (existing) {
          console.log(`Article "${article.title}" already exists, skipping...`);
          continue;
        }

        const { error: insertError } = await supabase
          .from(table)
          .insert({
            title: article.title,
            description: article.description,
            content: article.content,
            date: article.pubDate,
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
            tags: [feed.category],
            slug,
            created_at: new Date().toISOString(),
            ...(table === 'articles' && {
              author: feed.name,
              read_time: '5 min',
              category: feed.category
            })
          });

        if (insertError) {
          console.error('Error inserting article:', insertError);
          continue;
        }
      } catch (error) {
        console.error('Error processing article:', error);
        continue;
      }
    }

    // Update last_fetch timestamp
    const { error: updateError } = await supabase
      .from('rss_feeds')
      .update({ last_fetch: new Date().toISOString() })
      .eq('id', id);

    if (updateError) throw updateError;

    return articles;
  } catch (error) {
    console.error('Error refreshing RSS feed:', error);
    throw error;
  }
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

export async function getRSSFeeds() {
  const { data, error } = await supabase
    .from('rss_feeds')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function addRSSFeed(feed: {
  name: string;
  url: string;
  category: string;
  content_type: 'news' | 'article';
  max_articles: number;
  active?: boolean;
}) {
  const { data, error } = await supabase
    .from('rss_feeds')
    .insert([{ ...feed, active: true }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateRSSFeed(id: number, feed: {
  name: string;
  url: string;
  category: string;
  content_type: 'news' | 'article';
  max_articles: number;
  active: boolean;
}) {
  const { data, error } = await supabase
    .from('rss_feeds')
    .update(feed)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteRSSFeed(id: number) {
  const { error } = await supabase
    .from('rss_feeds')
    .delete()
    .eq('id', id);

  if (error) throw error;
}