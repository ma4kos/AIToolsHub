export interface Tutorial {
  id: number;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  duration: number;
  difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  tags: string[];
  views: number;
  likes: number;
  completion_count: number;
  learning_outcomes?: string[];
  prerequisites?: string[];
  created_at: string;
  updated_at: string;
}

export interface TutorialProgress {
  id: number;
  tutorial_id: number;
  user_id: string;
  completed: boolean;
  progress_percent: number;
  last_watched_at: string;
  created_at: string;
  updated_at: string;
}