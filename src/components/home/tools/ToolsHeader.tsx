import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function ToolsHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-bold">Trending AI Tools</h2>
      <Link
        to="/tools"
        className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
      >
        View All Tools
        <ArrowUpRight className="w-4 h-4" />
      </Link>
    </div>
  );
}