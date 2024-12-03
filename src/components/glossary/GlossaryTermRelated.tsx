import React from 'react';

interface GlossaryTermRelatedProps {
  relatedTerms?: string[];
  onTermClick: (term: string) => void;
}

export function GlossaryTermRelated({ relatedTerms, onTermClick }: GlossaryTermRelatedProps) {
  if (!relatedTerms?.length) return null;

  return (
    <div>
      <h4 className="font-semibold text-gray-700 mb-2">Related Terms:</h4>
      <div className="flex flex-wrap gap-2">
        {relatedTerms.map((term, index) => (
          <button
            key={index}
            onClick={() => onTermClick(term)}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}