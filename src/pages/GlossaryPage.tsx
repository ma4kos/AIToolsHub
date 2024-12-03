import React, { useState, useCallback } from 'react';
import { GlossaryHeader } from '../components/glossary/GlossaryHeader';
import { GlossarySearch } from '../components/glossary/GlossarySearch';
import { GlossaryTermList } from '../components/glossary/GlossaryTermList';
import { useGlossaryTerms } from '../hooks/useGlossaryTerms';

export function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: terms = [], isLoading } = useGlossaryTerms();

  const handleTermClick = useCallback((term: string) => {
    setSearchQuery(term);
    
    const element = document.getElementById(`term-${term.toLowerCase().replace(/\s+/g, '-')}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('highlight-term');
      setTimeout(() => element.classList.remove('highlight-term'), 2000);
    }
  }, []);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 pt-24">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <GlossaryHeader />
        <GlossarySearch value={searchQuery} onChange={setSearchQuery} />
        <GlossaryTermList 
          terms={terms}
          searchQuery={searchQuery}
          onTermClick={handleTermClick}
        />
      </div>
    </div>
  );
}