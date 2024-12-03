import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ContentList } from '../../components/admin/ContentList';
import { ContentGenerator } from '../../components/admin/ContentGenerator';

export function NewsAdmin() {
  const queryClient = useQueryClient();
  const [showGenerator, setShowGenerator] = useState(false);

  const { data: news, isLoading } = useQuery('admin-news', async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  });

  const deleteNews = useMutation(
    async (id: number) => {
      const { error } = await supabase.from('news').delete().eq('id', id);
      if (error) throw error;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('admin-news');
      },
    }
  );

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      await deleteNews.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">News Management</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowGenerator(!showGenerator)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            AI Generate
          </button>
          <Link
            to="/submit/news"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add News
          </Link>
        </div>
      </div>

      {showGenerator && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Generate News from URL</h2>
          <ContentGenerator 
            type="news"
            onSuccess={() => {
              queryClient.invalidateQueries('admin-news');
              setShowGenerator(false);
            }}
          />
        </div>
      )}
      
      <ContentList
        items={news || []}
        type="news"
        onDelete={handleDelete}
      />
    </div>
  );
}