import { useQuery, useMutation, useQueryClient } from 'react-query';
import { supabase } from '../lib/supabase';

// Articles Hooks
export function useArticles() {
  return useQuery('articles', async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  });
}

export function useArticleItem(id: string) {
  return useQuery(['article', id], async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq(id.includes('-') ? 'slug' : 'id', id)
      .single();
    if (error) throw error;
    return data;
  }, {
    enabled: !!id,
    retry: false,
    staleTime: 0
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, ...data }: any) => {
      const { error } = await supabase
        .from('articles')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('articles');
      }
    }
  );
}

// News Hooks
export function useNews() {
  return useQuery('news', async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  });
}

export function useNewsItem(id: string) {
  return useQuery(['news', id], async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq(id.includes('-') ? 'slug' : 'id', id)
      .single();
    if (error) throw error;
    return data;
  }, {
    enabled: !!id,
    retry: false,
    staleTime: 0
  });
}

export function useUpdateNews() {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, ...data }: any) => {
      const { error } = await supabase
        .from('news')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('news');
      }
    }
  );
}

// Tools Hooks
export function useTools() {
  return useQuery('tools', async () => {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  });
}

export function useToolItem(id: string) {
  return useQuery(['tool', id], async () => {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq(id.includes('-') ? 'slug' : 'id', id)
      .single();
    if (error) throw error;
    return data;
  }, {
    enabled: !!id,
    staleTime: 0
  });
}

export function useUpdateTool() {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, ...data }: any) => {
      const { error } = await supabase
        .from('tools')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tools');
      }
    }
  );
}