import React from 'react';
import { Star, Users as Community, Globe, Cpu, Gauge, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Tool } from '../../types/tool';

interface ToolGridProps {
  tools: Tool[];
}

export function ToolGrid({ tools }: ToolGridProps) {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tools.map((tool) => (
        <Link
          key={tool.id}
          to={`/tools/${tool.slug}`}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm truncate">{tool.name}</h3>
              <span className="text-xs text-gray-500">{tool.category}</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-600 line-clamp-2 mb-3 h-8">
            {tool.description}
          </p>
          
          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            {tool.platform_compatibility && (
              <div className="flex items-center gap-1 text-gray-600">
                <Globe className="w-3 h-3" />
                <span>{tool.platform_compatibility.join(', ')}</span>
              </div>
            )}
            {tool.technical_specs?.frameworks && (
              <div className="flex items-center gap-1 text-gray-600">
                <Cpu className="w-3 h-3" />
                <span>{tool.technical_specs.frameworks.join(', ')}</span>
              </div>
            )}
            {tool.expertise_level && (
              <div className="flex items-center gap-1 text-gray-600">
                <Gauge className="w-3 h-3" />
                <span>{tool.expertise_level}</span>
              </div>
            )}
            {tool.compliance_certifications && (
              <div className="flex items-center gap-1 text-gray-600">
                <Shield className="w-3 h-3" />
                <span>{tool.compliance_certifications.join(', ')}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="font-medium">{tool.rating}</span>
              <span className="text-gray-500">
                (<Community className="w-3 h-3 inline" /> {tool.reviews})
              </span>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              tool.pricing === 'Free' ? 'bg-green-100 text-green-700' :
              tool.pricing === 'Paid' ? 'bg-blue-100 text-blue-700' :
              'bg-purple-100 text-purple-700'
            }`}>
              {tool.pricing}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}