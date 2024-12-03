import React from 'react';
import { GlossaryTermContent } from './GlossaryTermContent';
import { GlossaryTermExamples } from './GlossaryTermExamples';
import { GlossaryTermRelated } from './GlossaryTermRelated';

interface GlossaryTermProps {
  term: string;
  definition: string;
  formattedDefinition?: string;
  examples?: string[];
  relatedTerms?: string[];
  onTermClick: (term: string) => void;
}

export function GlossaryTerm({ 
  term, 
  definition,
  formattedDefinition, 
  examples, 
  relatedTerms,
  onTermClick 
}: GlossaryTermProps) {
  const termId = `term-${term.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div id={termId} className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{term}</h3>
      
      <GlossaryTermContent 
        definition={definition}
        formattedDefinition={formattedDefinition || definition}
        onTermClick={onTermClick}
      />
      
      <GlossaryTermExamples examples={examples} />
      
      <GlossaryTermRelated 
        relatedTerms={relatedTerms}
        onTermClick={onTermClick}
      />
    </div>
  );
}