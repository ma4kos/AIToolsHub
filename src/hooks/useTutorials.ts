import { useQuery, useMutation, useQueryClient } from 'react-query';
import { supabase } from '../lib/supabase';
import type { Tutorial, TutorialProgress } from '../types/tutorial';

export function useTutorials() {
  return useQuery('tutorials', async () => {
    const { data, error } = await supabase
      .from('tutorials')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Tutorial[];
  });
}

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

export function useTutorialProgress(userId: string) {
  return useQuery(['tutorial-progress', userId], async () => {
    const { data, error } = await supabase
      .from('tutorial_progress')
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data as TutorialProgress[];
  }, {
    enabled: Boolean(userId)
  });
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ 
      tutorialId, 
      userId, 
      progress, 
      completed 
    }: {
      tutorialId: number;
      userId: string;
      progress: number;
      completed: boolean;
    }) => {
      const { error } = await supabase
        .from('tutorial_progress')
        .upsert({
          tutorial_id: tutorialId,
          user_id: userId,
          progress_percent: progress,
          completed,
          last_watched_at: new Date().toISOString()
        }, {
          onConflict: 'tutorial_id,user_id'
        });

      if (error) throw error;
    },
    {
      onSuccess: (_, { userId }) => {
        queryClient.invalidateQueries(['tutorial-progress', userId]);
      }
    }
  );
}