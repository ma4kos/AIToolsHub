import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearch, useSearchCount } from '../hooks/useSearch';
import { SearchBar } from '../components/search/SearchBar';
import { SearchFilters } from '../components/search/SearchFilters';
import { SearchResultList } from '../components/search/SearchResultList';

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [selectedType, setSelectedType] = useState('');
  const [selectedSort, setSelectedSort] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const { data: results = [], isLoading } = useSearch(query);
  const { data: totalCount = 0 } = useSearchCount(query);

  // Filter results based on selected type
  const filteredResults = results.filter(result => 
    !selectedType || result.type === selectedType
  );

  // Sort results based on selected sort option
  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (selectedSort) {
      case 'date':
        return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
      case 'relevance':
        return b.relevance - a.relevance;
      default:
        return 0;
    }
  });

  const handleSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery });
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
        
        <div className="mb-8">
          <SearchBar initialQuery={query} onSearch={handleSearch} />
        </div>

        {query && (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {totalCount} {totalCount === 1 ? 'result' : 'results'} found for "{query}"
              </p>
            </div>

            <SearchFilters
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              selectedSort={selectedSort}
              onSortChange={setSelectedSort}
              showFilters={showFilters}
              onToggleFilters={() => setShowFilters(!showFilters)}
            />

            <SearchResultList
              results={sortedResults}
              isLoading={isLoading}
              hasMore={page * 15 < totalCount}
              onLoadMore={handleLoadMore}
            />
          </>
        )}

        {!query && (
          <div className="text-center py-12">
            <p className="text-gray-600">Enter a search term to begin</p>
          </div>
        )}

        {query && !isLoading && sortedResults.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}