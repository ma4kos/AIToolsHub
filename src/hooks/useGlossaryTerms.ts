import { useQuery } from 'react-query';
import { supabase } from '../lib/supabase';
import type { Term } from '../types/glossary';

export function useGlossaryTerms() {
  return useQuery('glossary-terms', async () => {
    const { data, error } = await supabase
      .from('glossary_terms')
      .select('*')
      .order('term');
      
    if (error) throw error;
    return data as Term[];
  });
}