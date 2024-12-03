import React from 'react';
import { useTools } from '../../../hooks/useContent';
import { ToolsHeader } from './ToolsHeader';
import { ToolsGrid } from './ToolsGrid';

export function ToolsSection() {
  const { data: tools, isLoading } = useTools();

  if (isLoading) {
    return <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">Loading...</div>
    </div>;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <ToolsHeader />
        <ToolsGrid tools={tools?.slice(0, 6) || []} />
      </div>
    </section>
  );
}