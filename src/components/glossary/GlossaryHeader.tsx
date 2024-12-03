import React from 'react';

export function GlossaryHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-4">AI Glossary</h1>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <p className="text-blue-700">
          Welcome to our comprehensive AI Glossary. This resource provides clear, accessible definitions 
          for key artificial intelligence terms and concepts. Click on highlighted terms within definitions 
          to quickly navigate related concepts.
        </p>
      </div>
    </div>
  );
}