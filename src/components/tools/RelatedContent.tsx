import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Calendar, ExternalLink } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface RelatedContentProps {
  toolId: number;
  tags: string[];
}

export function RelatedContent({ toolId, tags }: RelatedContentProps) {
  // Fetch latest news
  const { data: news } = useQuery(['related-news', toolId], async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .contains('tags', tags)
      .neq('id', toolId)
      .order('date', { ascending: false })
      .limit(3);

    if (error) throw error;
    return data;
  });

  // Fetch featured articles
  const { data: articles } = useQuery(['related-articles', toolId], async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .contains('tags', tags)
      .neq('id', toolId)
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) throw error;
    return data;
  });

  // Fetch upcoming events (within next 60 days)
  const { data: events } = useQuery(['related-events', toolId], async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 60);
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .contains('tags', tags)
      .gte('date', new Date().toISOString())
      .lte('date', futureDate.toISOString())
      .order('date', { ascending: true })
      .limit(3);

    if (error) throw error;
    return data;
  });

  // Fetch related tutorials
  const { data: tutorials } = useQuery(['related-tutorials', toolId], async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .contains('tags', tags)
      .eq('type', 'tutorial')
      .neq('id', toolId)
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) throw error;
    return data;
  });

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Latest News */}
      {news && news.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Latest News</h3>
            <Link to="/news" className="text-blue-600 hover:text-blue-700 text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {news.map((item) => {
              const isExternal = item.link && item.source;
              const ItemWrapper = isExternal ? 'a' : Link;
              const itemProps = isExternal 
                ? { href: item.link, target: "_blank", rel: "noopener noreferrer" }
                : { to: `/news/${item.slug}` };

              return (
                <ItemWrapper key={item.id} {...itemProps} className="block group">
                  <h4 className="font-medium group-hover:text-blue-600 mb-1">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                    {isExternal && (
                      <div className="flex items-center gap-1">
                        <ExternalLink className="w-4 h-4" />
                        {item.source}
                      </div>
                    )}
                  </div>
                </ItemWrapper>
              );
            })}
          </div>
        </div>
      )}

      {/* Featured Articles */}
      {articles && articles.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Featured Articles</h3>
            <Link to="/articles" className="text-blue-600 hover:text-blue-700 text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {articles.map((article) => {
              const isExternal = article.link && article.source;
              const ItemWrapper = isExternal ? 'a' : Link;
              const itemProps = isExternal 
                ? { href: article.link, target: "_blank", rel: "noopener noreferrer" }
                : { to: `/articles/${article.slug}` };

              return (
                <ItemWrapper key={article.id} {...itemProps} className="block group">
                  <h4 className="font-medium group-hover:text-blue-600 mb-1">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.read_time}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {article.difficulty || 'Intermediate'}
                    </div>
                  </div>
                </ItemWrapper>
              );
            })}
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      {events && events.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Upcoming Events</h3>
            <Link to="/events" className="text-blue-600 hover:text-blue-700 text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="block">
                <h4 className="font-medium mb-1">{event.title}</h4>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    event.format === 'virtual' 
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {event.format}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    event.registration_status === 'open'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {event.registration_status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Tutorials */}
      {tutorials && tutorials.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Related Tutorials</h3>
            <Link to="/tutorials" className="text-blue-600 hover:text-blue-700 text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {tutorials.map((tutorial) => (
              <Link key={tutorial.id} to={`/articles/${tutorial.slug}`} className="block group">
                <h4 className="font-medium group-hover:text-blue-600 mb-1">
                  {tutorial.title}
                </h4>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {tutorial.difficulty || 'Intermediate'}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {tutorial.read_time}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}