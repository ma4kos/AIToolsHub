import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ContentList } from '../../components/admin/ContentList';

export function ToolsAdmin() {
  const queryClient = useQueryClient();

  const { data: tools, isLoading } = useQuery('admin-tools', async () => {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  });

  const deleteTool = useMutation(
    async (id: number) => {
      const { error } = await supabase.from('tools').delete().eq('id', id);
      if (error) throw error;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('admin-tools');
      },
    }
  );

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      await deleteTool.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tools Management</h1>
        <Link
          to="/submit/tool"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Tool
        </Link>
      </div>
      
      <ContentList
        items={tools || []}
        type="tools"
        onDelete={handleDelete}
      />
    </div>
  );
}