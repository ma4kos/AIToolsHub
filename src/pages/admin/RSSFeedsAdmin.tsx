import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Plus, RefreshCw, Edit, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { refreshRSSFeed } from '../../services/rss';
import { RSSFeedForm } from '../../components/admin/RSSFeedForm';

export function RSSFeedsAdmin() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingFeed, setEditingFeed] = useState<any>(null);

  const { data: feeds, isLoading } = useQuery('rss-feeds', async () => {
    const { data, error } = await supabase
      .from('rss_feeds')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  });

  const refreshFeed = useMutation(
    async (id: number) => {
      try {
        await refreshRSSFeed(id);
      } catch (error) {
        console.error('Error refreshing feed:', error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('rss-feeds');
      }
    }
  );

  const deleteFeed = useMutation(
    async (id: number) => {
      const { error } = await supabase.from('rss_feeds').delete().eq('id', id);
      if (error) throw error;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('rss-feeds');
      },
    }
  );

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this RSS feed?')) {
      await deleteFeed.mutate(id);
    }
  };

  const handleEdit = (feed: any) => {
    setEditingFeed(feed);
    setShowForm(true);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingFeed) {
        await supabase
          .from('rss_feeds')
          .update(data)
          .eq('id', editingFeed.id);
      } else {
        await supabase.from('rss_feeds').insert([data]);
      }
      queryClient.invalidateQueries('rss-feeds');
      setShowForm(false);
      setEditingFeed(null);
    } catch (error) {
      console.error('Error saving feed:', error);
      alert('Failed to save RSS feed');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingFeed(null);
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">RSS Feeds Management</h1>
        <button
          onClick={() => {
            setEditingFeed(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add RSS Feed
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Fetch
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Max Articles
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {feeds?.map((feed) => (
              <tr key={feed.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {feed.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate max-w-xs">
                    {feed.url}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {feed.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    feed.content_type === 'news' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {feed.content_type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {feed.last_fetch ? new Date(feed.last_fetch).toLocaleString() : 'Never'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {feed.max_articles || 5}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    feed.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {feed.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(feed)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit Feed"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => refreshFeed.mutate(feed.id)}
                      className="text-gray-400 hover:text-gray-600"
                      title="Refresh Feed"
                    >
                      <RefreshCw className={`w-4 h-4 ${refreshFeed.isLoading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleDelete(feed.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete Feed"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <RSSFeedForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={editingFeed}
        />
      )}
    </div>
  );
}