import React from 'react';
import { Star, Users as Community, Globe, Cpu, Gauge, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Tool } from '../../types/tool';

interface ToolListProps {
  tools: Tool[];
}

export function ToolList({ tools }: ToolListProps) {
  return (
    <div className="space-y-4">
      {tools.map((tool) => (
        <Link
          key={tool.id}
          to={`/tools/${tool.slug}`}
          className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
        >
          <div className="flex gap-6">
            <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{tool.name}</h3>
                  <span className="text-sm text-gray-500">{tool.category}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  tool.pricing === 'Free' ? 'bg-green-100 text-green-700' :
                  tool.pricing === 'Paid' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {tool.pricing}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{tool.description}</p>
              
              <div className="grid grid-cols-4 gap-4 mb-4">
                {tool.platform_compatibility && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe className="w-4 h-4" />
                    <span>{tool.platform_compatibility.join(', ')}</span>
                  </div>
                )}
                {tool.technical_specs?.frameworks && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Cpu className="w-4 h-4" />
                    <span>{tool.technical_specs.frameworks.join(', ')}</span>
                  </div>
                )}
                {tool.expertise_level && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Gauge className="w-4 h-4" />
                    <span>{tool.expertise_level}</span>
                  </div>
                )}
                {tool.compliance_certifications && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>{tool.compliance_certifications.join(', ')}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{tool.rating}</span>
                  <span className="text-gray-500">
                    (<Community className="w-4 h-4 inline" /> {tool.reviews})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}