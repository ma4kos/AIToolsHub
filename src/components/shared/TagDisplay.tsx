import React from 'react';
import { Tag as TagIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TagDisplayProps {
  tags: string[];
  size?: 'sm' | 'md';
  linkable?: boolean;
}

export function TagDisplay({ tags, size = 'md', linkable = false }: TagDisplayProps) {
  if (!tags || tags.length === 0) return null;

  const baseClasses = `inline-flex items-center gap-1 rounded-full ${
    size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
  }`;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <TagIcon className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} text-gray-500`} />
      {tags.map((tag) => (
        linkable ? (
          <Link
            key={tag}
            to={`/search?tag=${encodeURIComponent(tag)}`}
            className={`${baseClasses} bg-blue-50 text-blue-600 hover:bg-blue-100`}
          >
            {tag}
          </Link>
        ) : (
          <span
            key={tag}
            className={`${baseClasses} bg-gray-100 text-gray-700`}
          >
            {tag}
          </span>
        )
      ))}
    </div>
  );
}