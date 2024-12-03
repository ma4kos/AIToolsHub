import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ContentList } from '../../components/admin/ContentList';

export function CoursesAdmin() {
  const queryClient = useQueryClient();

  const { data: courses, isLoading } = useQuery('admin-courses', async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  });

  const deleteCourse = useMutation(
    async (id: number) => {
      const { error } = await supabase.from('courses').delete().eq('id', id);
      if (error) throw error;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('admin-courses');
      },
    }
  );

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      await deleteCourse.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses Management</h1>
        <Link
          to="/submit/course"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Course
        </Link>
      </div>
      
      <ContentList
        items={courses || []}
        type="courses"
        onDelete={handleDelete}
      />
    </div>
  );
}