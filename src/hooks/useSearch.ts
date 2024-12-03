import { useQuery } from 'react-query';
import { supabase } from '../lib/supabase';
import type { SearchResult } from '../types/search';

export function useSearch(query: string) {
  return useQuery(
    ['search', query],
    async () => {
      if (!query) return [];

      const { data, error } = await supabase
        .rpc('search_content', { search_term: query });

      if (error) throw error;

      return data.map((item: any) => ({
        id: item.id,
        type: item.content_type,
        title: item.title,
        description: item.description,
        date: item.created_at,
        url: item.url,
        relevance: item.relevance
      })) as SearchResult[];
    },
    {
      enabled: query.length > 2,
      staleTime: 30000 // Results stay fresh for 30 seconds
    }
  );
}

export function useSearchCount(query: string) {
  return useQuery(
    ['search-count', query],
    async () => {
      if (!query) return 0;

      const { data, error } = await supabase
        .rpc('count_search_results', { search_term: query });

      if (error) throw error;
      return data;
    },
    {
      enabled: query.length > 2,
      staleTime: 30000
    }
  );
}