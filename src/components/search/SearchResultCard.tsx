import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';
import type { SearchResult } from '../../types/search';

interface SearchResultCardProps {
  result: SearchResult;
}

export function SearchResultCard({ result }: SearchResultCardProps) {
  return (
    <Link to={result.url} className="block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">{result.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{result.description}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {result.date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(result.date).toLocaleDateString()}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}