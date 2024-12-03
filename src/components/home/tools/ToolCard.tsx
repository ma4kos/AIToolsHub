import React from 'react';
import { Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Tool } from '../../../types/tool';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="block bg-white rounded-xl p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg overflow-hidden">
          <img
            src={tool.logo}
            alt={tool.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold">{tool.name}</h3>
          <span className="text-sm text-gray-500">{tool.category}</span>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{tool.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="font-medium">{tool.rating}</span>
          <span className="text-gray-500">
            (<Users className="w-3 h-3 inline" /> {tool.reviews})
          </span>
        </div>
        <span className={`text-sm px-3 py-1 rounded-full ${
          tool.pricing === 'Free' ? 'bg-green-100 text-green-700' :
          tool.pricing === 'Paid' ? 'bg-blue-100 text-blue-700' :
          'bg-purple-100 text-purple-700'
        }`}>
          {tool.pricing}
        </span>
      </div>
    </Link>
  );
}