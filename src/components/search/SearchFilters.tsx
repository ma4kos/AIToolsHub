import React from 'react';
import { Filter } from 'lucide-react';

interface SearchFiltersProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export function SearchFilters({
  selectedType,
  onTypeChange,
  selectedSort,
  onSortChange,
  showFilters,
  onToggleFilters
}: SearchFiltersProps) {
  const types = [
    { value: '', label: 'All Types' },
    { value: 'tool', label: 'Tools' },
    { value: 'news', label: 'News' },
    { value: 'article', label: 'Articles' },
    { value: 'event', label: 'Events' },
    { value: 'tutorial', label: 'Tutorials' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'date', label: 'Most Recent' },
    { value: 'popularity', label: 'Most Popular' }
  ];

  return (
    <div className="mb-6">
      <button
        onClick={onToggleFilters}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
      >
        <Filter className="w-5 h-5" />
        <span>Filters</span>
      </button>

      {showFilters && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => onTypeChange(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {types.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={selectedSort}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}