import React, { useState } from 'react';
import { useTools } from '../../hooks/useContent';
import { ArrowUpRight, Grid, List as ListIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ToolGrid } from '../../components/tools/ToolGrid';
import { ToolList } from '../../components/tools/ToolList';
import { ToolFilters } from '../../components/tools/ToolFilters';

type ViewMode = 'grid' | 'list';

export function ToolsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedPricing, setSelectedPricing] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [selectedDeployment, setSelectedDeployment] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const { data: tools, isLoading } = useTools();

  const filteredTools = tools?.filter(tool => {
    if (searchQuery && !tool.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tool.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCategory && tool.category !== selectedCategory) return false;
    if (selectedPricing && tool.pricing !== selectedPricing) return false;
    if (selectedPlatform && !tool.platform_compatibility?.includes(selectedPlatform)) return false;
    if (selectedExpertise && tool.expertise_level !== selectedExpertise) return false;
    if (selectedDeployment && !tool.deployment_type?.includes(selectedDeployment)) return false;
    return true;
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 pt-24">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">AI Tools Directory</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          >
            <ListIcon className="w-5 h-5" />
          </button>
          <Link
            to="/submit/tool"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            Submit Tool
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Filters */}
      <ToolFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedIndustry={selectedIndustry}
        onIndustryChange={setSelectedIndustry}
        selectedPricing={selectedPricing}
        onPricingChange={setSelectedPricing}
        selectedPlatform={selectedPlatform}
        onPlatformChange={setSelectedPlatform}
        selectedExpertise={selectedExpertise}
        onExpertiseChange={setSelectedExpertise}
        selectedDeployment={selectedDeployment}
        onDeploymentChange={setSelectedDeployment}
        showAdvancedFilters={showAdvancedFilters}
        onToggleAdvancedFilters={() => setShowAdvancedFilters(!showAdvancedFilters)}
      />

      {/* Tools Grid/List */}
      {viewMode === 'grid' ? (
        <ToolGrid tools={filteredTools || []} />
      ) : (
        <ToolList tools={filteredTools || []} />
      )}
    </div>
  );
}