import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Newspaper, FileText, Calendar, GraduationCap } from 'lucide-react';
import type { SearchResult } from '../../types/search';

interface SearchResultsProps {
  results: SearchResult[] | undefined;
  isLoading: boolean;
  query: string;
  onClose: () => void;
}

export function SearchResults({ results, isLoading, query, onClose }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!results?.length) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
        <p className="text-gray-500 text-center">No results found</p>
      </div>
    );
  }

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const getIcon = (type: string) => {
    switch (type) {
      case 'tool':
        return <Wrench className="w-5 h-5" />;
      case 'news':
        return <Newspaper className="w-5 h-5" />;
      case 'article':
        return <FileText className="w-5 h-5" />;
      case 'event':
        return <Calendar className="w-5 h-5" />;
      case 'tutorial':
        return <GraduationCap className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1) + 's';
  };

  return (
    <div 
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
      role="listbox"
      id="search-results"
    >
      {Object.entries(groupedResults).map(([type, items]) => (
        <div key={type} className="p-4 border-b last:border-b-0">
          <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
            {getIcon(type)}
            {getTypeLabel(type)}
          </h3>
          <div className="space-y-3">
            {items.slice(0, 3).map((result) => (
              <Link
                key={result.id}
                to={result.url}
                className="block hover:bg-gray-50 rounded-lg p-2 -mx-2"
                onClick={onClose}
              >
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {result.title}
                </div>
                <div className="text-xs text-gray-500 line-clamp-2">
                  {result.description}
                </div>
                {result.date && (
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(result.date).toLocaleDateString()}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}
      
      {query && (
        <div className="p-4 bg-gray-50 rounded-b-lg">
          <Link
            to={`/search?q=${encodeURIComponent(query)}`}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            onClick={onClose}
          >
            See all results for "{query}"
          </Link>
        </div>
      )}
    </div>
  );
}