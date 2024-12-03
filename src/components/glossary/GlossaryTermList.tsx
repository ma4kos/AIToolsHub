import React from 'react';
import { GlossaryCategory } from './GlossaryCategory';
import type { Term } from '../../types/glossary';

interface GlossaryTermListProps {
  terms: Term[];
  searchQuery: string;
  onTermClick: (term: string) => void;
}

export function GlossaryTermList({ terms, searchQuery, onTermClick }: GlossaryTermListProps) {
  const categories = ['core', 'applications', 'models', 'terminology', 'additional'] as const;
  
  const getCategoryTitle = (category: string): string => {
    const titles: Record<string, string> = {
      core: 'Core AI Concepts',
      applications: 'AI Applications',
      models: 'AI Models & Techniques',
      terminology: 'AI Terminology',
      additional: 'Additional Terms'
    };
    return titles[category] || category;
  };

  const filterTerms = (category: string) => {
    return terms.filter(term => 
      term.category === category && 
      (!searchQuery || 
       term.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
       term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
       term.related_terms?.some(rt => rt.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
  };

  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <GlossaryCategory 
          key={category}
          title={getCategoryTitle(category)}
          terms={filterTerms(category)}
          onTermClick={onTermClick}
        />
      ))}
    </div>
  );
}