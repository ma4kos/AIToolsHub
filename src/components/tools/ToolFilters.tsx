import React from 'react';
import { Filter, Search } from 'lucide-react';

interface ToolFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedIndustry: string;
  onIndustryChange: (value: string) => void;
  selectedPricing: string;
  onPricingChange: (value: string) => void;
  selectedPlatform: string;
  onPlatformChange: (value: string) => void;
  selectedExpertise: string;
  onExpertiseChange: (value: string) => void;
  selectedDeployment: string;
  onDeploymentChange: (value: string) => void;
  showAdvancedFilters: boolean;
  onToggleAdvancedFilters: () => void;
}

const categories = ['NLP', 'Computer Vision', 'Machine Learning', 'Data Analysis', 'Automation'];
const industries = ['Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail'];
const platforms = ['Web', 'Desktop', 'Mobile', 'API'];
const pricingOptions = ['Free', 'Freemium', 'Paid'];
const expertiseLevels = ['Beginner', 'Intermediate', 'Advanced'];
const deploymentTypes = ['Cloud', 'On-Premise', 'Hybrid', 'Edge'];

export function ToolFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedIndustry,
  onIndustryChange,
  selectedPricing,
  onPricingChange,
  selectedPlatform,
  onPlatformChange,
  selectedExpertise,
  onExpertiseChange,
  selectedDeployment,
  onDeploymentChange,
  showAdvancedFilters,
  onToggleAdvancedFilters,
}: ToolFiltersProps) {
  return (
    <div className="mb-8">
      <div className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search AI tools..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={onToggleAdvancedFilters}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {showAdvancedFilters && (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
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
            value={selectedIndustry}
            onChange={(e) => onIndustryChange(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="">All Industries</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>

          <select
            value={selectedPricing}
            onChange={(e) => onPricingChange(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="">All Pricing</option>
            {pricingOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <select
            value={selectedPlatform}
            onChange={(e) => onPlatformChange(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="">All Platforms</option>
            {platforms.map(platform => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>

          <select
            value={selectedExpertise}
            onChange={(e) => onExpertiseChange(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="">All Expertise Levels</option>
            {expertiseLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>

          <select
            value={selectedDeployment}
            onChange={(e) => onDeploymentChange(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="">All Deployment Types</option>
            {deploymentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}