import { useQuery } from 'react-query';
import { supabase } from '../lib/supabase';
import type { Tutorial } from '../types/tutorial';

export function useTutorial(id: number) {
  return useQuery(['tutorial', id], async () => {
    const { data, error } = await supabase
      .from('tutorials')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Tutorial;
  }, {
    enabled: Boolean(id)
  });
}