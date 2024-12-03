import React from 'react';
import { useInView } from 'react-intersection-observer';
import { SearchResultCard } from './SearchResultCard';
import type { SearchResult } from '../../types/search';

interface SearchResultListProps {
  results: SearchResult[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export function SearchResultList({ 
  results, 
  isLoading, 
  hasMore, 
  onLoadMore 
}: SearchResultListProps) {
  const { ref, inView } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasMore && !isLoading) {
        onLoadMore();
      }
    }
  });

  if (!results.length && !isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No results found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {results.map((result) => (
        <SearchResultCard key={`${result.type}-${result.id}`} result={result} />
      ))}
      
      {(isLoading || hasMore) && (
        <div ref={ref} className="py-8 text-center">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-100 h-32 rounded-lg" />
              ))}
            </div>
          ) : (
            hasMore && <p className="text-gray-500">Loading more results...</p>
          )}
        </div>
      )}
    </div>
  );
}