import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Clock, User, Tag } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function ArticleDetailPage() {
  const { slug } = useParams();

  const { data: article, isLoading } = useQuery(['article', slug], async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data;
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 pt-24">Loading...</div>;
  }

  if (!article) {
    return <div className="container mx-auto px-4 py-8 pt-24">Article not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.read_time}</span>
            </div>
          </div>
          {article.tags && article.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <div className="flex gap-2">
                {article.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              {article.category}
            </span>
          </div>
        </div>

        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </article>
    </div>
  );
}