import React from 'react';

interface GlossaryTermContentProps {
  definition: string;
  formattedDefinition: string;
  onTermClick: (term: string) => void;
}

export function GlossaryTermContent({ 
  definition, 
  formattedDefinition, 
  onTermClick 
}: GlossaryTermContentProps) {
  const renderFormattedDefinition = () => {
    const parts = formattedDefinition.split(/(\[\[[^\]]+\]\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('[[') && part.endsWith(']]')) {
        const linkedTerm = part.slice(2, -2);
        return (
          <button
            key={index}
            onClick={() => onTermClick(linkedTerm)}
            className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
          >
            {linkedTerm}
          </button>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <p className="text-gray-600 mb-4">
      {formattedDefinition ? renderFormattedDefinition() : definition}
    </p>
  );
}