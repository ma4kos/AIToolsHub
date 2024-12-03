import { RSSFeed } from './types';
import { supabase } from '../../lib/supabase';

export async function fetchRSSFeed(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.text();
}

export async function getFeedById(id: number): Promise<RSSFeed> {
  const { data, error } = await supabase
    .from('rss_feeds')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!data) throw new Error('Feed not found');

  return data;
}

export async function updateFeedLastFetch(id: number): Promise<void> {
  const { error } = await supabase
    .from('rss_feeds')
    .update({ last_fetch: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
}