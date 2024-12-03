export interface Term {
  id: number;
  term: string;
  definition: string;
  formatted_definition?: string;
  category: 'core' | 'applications' | 'models' | 'terminology' | 'additional';
  examples?: string[];
  related_terms?: string[];
  created_at: string;
  updated_at: string;
}