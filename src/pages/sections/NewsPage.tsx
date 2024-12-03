import React from 'react';
import { useNews } from '../../hooks/useContent';
import { Clock, ArrowUpRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NewsPage() {
  const { data: news, isLoading } = useNews();

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 pt-24">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Latest AI News</h1>
        <Link
          to="/submit/news"
          className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
        >
          Submit News
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news?.map((item) => {
          const isExternal = item.link && item.source;
          const ItemWrapper = isExternal ? 'a' : Link;
          const itemProps = isExternal 
            ? { href: item.link, target: "_blank", rel: "noopener noreferrer" }
            : { to: `/news/${item.slug}` };

          return (
            <ItemWrapper key={item.id} {...itemProps} className="group cursor-pointer">
              <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <Clock className="w-4 h-4" />
                <span>{new Date(item.date).toLocaleDateString()}</span>
                {isExternal && (
                  <>
                    <span className="mx-1">•</span>
                    <ExternalLink className="w-4 h-4" />
                    <span>{item.source}</span>
                  </>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                {item.title}
              </h3>
              <p className="text-gray-600 line-clamp-2">{item.description}</p>
            </ItemWrapper>
          );
        })}
      </div>
    </div>
  );
}