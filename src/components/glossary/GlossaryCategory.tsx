import React from 'react';
import { GlossaryTerm } from './GlossaryTerm';
import type { Term } from '../../types/glossary';

interface GlossaryCategoryProps {
  title: string;
  terms: Term[];
  onTermClick: (term: string) => void;
}

export function GlossaryCategory({ title, terms, onTermClick }: GlossaryCategoryProps) {
  if (!terms.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      <div className="space-y-6">
        {terms
          .sort((a, b) => a.term.localeCompare(b.term))
          .map((term) => (
            <GlossaryTerm 
              key={term.id} 
              term={term.term}
              definition={term.definition}
              formattedDefinition={term.formatted_definition}
              examples={term.examples}
              relatedTerms={term.related_terms}
              onTermClick={onTermClick}
            />
          ))}
      </div>
    </section>
  );
}