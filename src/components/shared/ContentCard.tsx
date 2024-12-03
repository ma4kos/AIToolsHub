import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ExternalLink } from 'lucide-react';
import { TagDisplay } from './TagDisplay';

interface ContentCardProps {
  type: 'news' | 'article';
  title: string;
  description?: string;
  image: string;
  date?: string;
  author?: string;
  readTime?: string;
  tags: string[];
  slug: string;
  source?: string;
  link?: string;
}

export function ContentCard({
  type,
  title,
  description,
  image,
  date,
  author,
  readTime,
  tags,
  slug,
  source,
  link
}: ContentCardProps) {
  const isExternal = link && source;
  const ItemWrapper = isExternal ? 'a' : Link;
  const itemProps = isExternal 
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : { to: `/${type}/${slug}` };

  return (
    <ItemWrapper {...itemProps} className="block group">
      <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {date && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {new Date(date).toLocaleDateString()}
            </div>
          )}
          {author && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {author}
            </div>
          )}
          {readTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {readTime}
            </div>
          )}
          {isExternal && (
            <div className="flex items-center gap-1">
              <ExternalLink className="w-4 h-4" />
              {source}
            </div>
          )}
        </div>
        <h3 className="text-xl font-semibold group-hover:text-blue-600">
          {title}
        </h3>
        {description && (
          <p className="text-gray-600 line-clamp-2">{description}</p>
        )}
        <TagDisplay tags={tags} size="sm" linkable />
      </div>
    </ItemWrapper>
  );
}