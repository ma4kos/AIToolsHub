import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ContentList } from '../../components/admin/ContentList';

export function EventsAdmin() {
  const queryClient = useQueryClient();

  const { data: events, isLoading } = useQuery('admin-events', async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: false });
    if (error) throw error;
    return data;
  });

  const deleteEvent = useMutation(
    async (id: number) => {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) throw error;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('admin-events');
      },
    }
  );

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await deleteEvent.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events Management</h1>
        <Link
          to="/submit/event"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </Link>
      </div>
      
      <ContentList
        items={events || []}
        type="events"
        onDelete={handleDelete}
      />
    </div>
  );
}