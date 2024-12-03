import React from 'react';
import { ToolCard } from './ToolCard';
import type { Tool } from '../../../types/tool';

interface ToolsGridProps {
  tools: Tool[];
}

export function ToolsGrid({ tools }: ToolsGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}