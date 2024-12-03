import { useQuery, useMutation, useQueryClient } from 'react-query';
import { supabase } from '../lib/supabase';
import { refreshRSSFeed } from '../services/rss';
import type { RSSFeed } from '../services/rss/types';

export function useRSSFeeds() {
  return useQuery('rss-feeds', async () => {
    const { data, error } = await supabase
      .from('rss_feeds')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as RSSFeed[];
  });
}

export function useRefreshRSSFeed() {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: number) => {
      await refreshRSSFeed(id);
    },
    {
      onSuccess: () => {
        // Invalidate both news and articles queries as the feed might update either
        queryClient.invalidateQueries('news');
        queryClient.invalidateQueries('articles');
        queryClient.invalidateQueries('rss-feeds');
      },
    }
  );
}

export function useAddRSSFeed() {
  const queryClient = useQueryClient();

  return useMutation(
    async (feed: Omit<RSSFeed, 'id' | 'last_fetch' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('rss_feeds')
        .insert([feed])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('rss-feeds');
      },
    }
  );
}

export function useUpdateRSSFeed() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, ...feed }: RSSFeed) => {
      const { data, error } = await supabase
        .from('rss_feeds')
        .update(feed)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('rss-feeds');
      },
    }
  );
}

export function useDeleteRSSFeed() {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: number) => {
      const { error } = await supabase
        .from('rss_feeds')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('rss-feeds');
      },
    }
  );
}