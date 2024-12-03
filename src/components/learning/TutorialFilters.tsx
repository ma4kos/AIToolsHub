import React from 'react';
import { Search, Filter } from 'lucide-react';

interface TutorialFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (value: string) => void;
  selectedDuration: string;
  onDurationChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export function TutorialFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedDuration,
  onDurationChange,
  showFilters,
  onToggleFilters
}: TutorialFiltersProps) {
  const categories = [
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Reinforcement Learning'
  ];

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  const durations = ['< 30 min', '30-60 min', '> 60 min'];

  return (
    <div className="mb-8">
      <div className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tutorials..."
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
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="">All Difficulties</option>
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>

          <select
            value={selectedDuration}
            onChange={(e) => onDurationChange(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="">All Durations</option>
            {durations.map(duration => (
              <option key={duration} value={duration}>{duration}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}