import { useQuery, useMutation, useQueryClient } from 'react-query';
import { supabase } from '../lib/supabase';
import type { Event } from '../types/event';

export function useEvents() {
  return useQuery('events', async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: true })
      .gte('end_date', new Date().toISOString());
    
    if (error) throw error;
    return data as Event[];
  });
}

export function useEvent(id: string | number) {
  return useQuery(['event', id], async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq(id.toString().includes('-') ? 'slug' : 'id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Return null for not found instead of throwing
      }
      throw error;
    }
    return data as Event;
  }, {
    enabled: Boolean(id),
    retry: false // Don't retry if event not found
  });
}

export function useFeaturedEvents() {
  return useQuery('featured-events', async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('featured', true)
      .order('start_date', { ascending: true })
      .gte('end_date', new Date().toISOString())
      .limit(3);
    
    if (error) throw error;
    return data as Event[];
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, ...data }: Partial<Event> & { id: number }) => {
      const { error } = await supabase
        .from('events')
        .update(data)
        .eq('id', id);
      
      if (error) throw error;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('events');
      }
    }
  );
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: number) => {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('events');
      }
    }
  );
}