import React from 'react';
import { Clock, User, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useArticles } from '../../hooks/useContent';

export function ArticlesSection() {
  const { data: articles, isLoading } = useArticles();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Articles</h2>
          <Link 
            to="/articles" 
            className="text-blue-600 flex items-center gap-2 hover:text-blue-700"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles?.slice(0, 3).map((article) => {
            const isExternal = article.link && article.source;
            const ItemWrapper = isExternal ? 'a' : Link;
            const itemProps = isExternal 
              ? { href: article.link, target: "_blank", rel: "noopener noreferrer" }
              : { to: `/articles/${article.slug}` };

            return (
              <ItemWrapper key={article.id} {...itemProps} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {article.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.read_time}
                    </div>
                    {isExternal && (
                      <div className="flex items-center gap-1">
                        <ExternalLink className="w-4 h-4" />
                        <span>{article.source}</span>
                      </div>
                    )}
                  </div>
                </div>
              </ItemWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}