import React from 'react';

interface GlossaryTermExamplesProps {
  examples?: string[];
}

export function GlossaryTermExamples({ examples }: GlossaryTermExamplesProps) {
  if (!examples?.length) return null;

  return (
    <div className="mb-4">
      <h4 className="font-semibold text-gray-700 mb-2">Examples:</h4>
      <ul className="list-disc list-inside space-y-1 text-gray-600">
        {examples.map((example, index) => (
          <li key={index}>{example}</li>
        ))}
      </ul>
    </div>
  );
}