import { supabase } from '../lib/supabase';

export async function getNews() {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false })
    .limit(10);

  if (error) throw error;
  return data;
}

export async function getArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);

  if (error) throw error;
  return data;
}

export async function getCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .limit(3);

  if (error) throw error;
  return data;
}

export async function getTools() {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .order('rating', { ascending: false })
    .limit(6);

  if (error) throw error;
  return data;
}

export async function getRelatedContent(tags: string[], excludeId: number, table: string) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .contains('tags', tags)
    .neq('id', excludeId)
    .limit(3);

  if (error) throw error;
  return data;
}