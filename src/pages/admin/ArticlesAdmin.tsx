import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ContentList } from '../../components/admin/ContentList';
import { ContentGenerator } from '../../components/admin/ContentGenerator';
import { ContentForm } from '../../components/admin/ContentForm';

export function ArticlesAdmin() {
  const queryClient = useQueryClient();
  const [showGenerator, setShowGenerator] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);

  const { data: articles, isLoading } = useQuery('admin-articles', async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  });

  const deleteArticle = useMutation(
    async (id: number) => {
      const { error } = await supabase.from('articles').delete().eq('id', id);
      if (error) throw error;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('admin-articles');
      },
    }
  );

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      await deleteArticle.mutate(id);
    }
  };

  const handleEdit = (article: any) => {
    setEditingArticle(article);
  };

  const handleSubmit = async (data: any) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update(data)
        .eq('id', editingArticle.id);
      
      if (error) throw error;
      
      queryClient.invalidateQueries('admin-articles');
      setEditingArticle(null);
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Failed to update article');
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Articles Management</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowGenerator(!showGenerator)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            AI Generate
          </button>
          <Link
            to="/submit/article"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Article
          </Link>
        </div>
      </div>

      {showGenerator && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Generate Article from URL</h2>
          <ContentGenerator 
            type="article"
            onSuccess={() => {
              queryClient.invalidateQueries('admin-articles');
              setShowGenerator(false);
            }}
          />
        </div>
      )}

      {editingArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <ContentForm
              type="article"
              initialData={editingArticle}
              onSubmit={handleSubmit}
              onCancel={() => setEditingArticle(null)}
            />
          </div>
        </div>
      )}
      
      <ContentList
        items={articles || []}
        type="articles"
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}