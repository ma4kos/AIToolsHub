import { useQuery } from 'react-query';
import { supabase } from '../lib/supabase';

export function useTags() {
  return useQuery('tags', async () => {
    // Get all unique tags from all content types
    const tables = ['news', 'articles', 'tools', 'courses'];
    const allTags = new Set<string>();

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('tags');
      
      if (error) throw error;
      
      data?.forEach(item => {
        if (Array.isArray(item.tags)) {
          item.tags.forEach(tag => allTags.add(tag));
        }
      });
    }

    return Array.from(allTags).sort();
  });
}