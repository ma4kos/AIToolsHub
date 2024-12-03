import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Clock, Tag } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function NewsDetailPage() {
  const { slug } = useParams();

  const { data: news, isLoading } = useQuery(['news', slug], async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data;
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 pt-24">Loading...</div>;
  }

  if (!news) {
    return <div className="container mx-auto px-4 py-8 pt-24">News article not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{new Date(news.date).toLocaleDateString()}</span>
            </div>
            {news.tags && news.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <div className="flex gap-2">
                  {news.tags.map((tag: string) => (
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
        </div>

        <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: news.content || news.description }} />
        </div>
      </article>
    </div>
  );
}