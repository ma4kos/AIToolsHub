import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';

interface EventFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedFormat: string;
  onFormatChange: (value: string) => void;
  selectedMonth: string;
  onMonthChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export function EventFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedFormat,
  onFormatChange,
  selectedMonth,
  onMonthChange,
  showFilters,
  onToggleFilters
}: EventFiltersProps) {
  const categories = [
    'All Categories',
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Computer Vision',
    'Natural Language Processing',
    'Robotics',
    'Cloud Computing',
    'Business & AI'
  ];

  const formats = ['All Formats', 'In-Person', 'Virtual', 'Hybrid'];
  
  const months = [
    { value: '', label: 'All Months' },
    { value: '2024-01', label: 'January 2024' },
    { value: '2024-02', label: 'February 2024' },
    { value: '2024-03', label: 'March 2024' },
    { value: '2024-04', label: 'April 2024' },
    { value: '2024-05', label: 'May 2024' },
    { value: '2024-06', label: 'June 2024' },
    { value: '2024-07', label: 'July 2024' },
    { value: '2024-08', label: 'August 2024' },
    { value: '2024-09', label: 'September 2024' },
    { value: '2024-10', label: 'October 2024' },
    { value: '2024-11', label: 'November 2024' },
    { value: '2024-12', label: 'December 2024' }
  ];

  return (
    <div className="mb-8">
      <div className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={onToggleFilters}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            {categories.map(category => (
              <option key={category} value={category === 'All Categories' ? '' : category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedFormat}
            onChange={(e) => onFormatChange(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            {formats.map(format => (
              <option key={format} value={format === 'All Formats' ? '' : format.toLowerCase()}>
                {format}
              </option>
            ))}
          </select>

          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            {months.map(month => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}