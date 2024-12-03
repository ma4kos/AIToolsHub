import React from 'react';
import { useForm } from 'react-hook-form';
import { Editor } from '../../components/shared/Editor';
import { supabase } from '../../lib/supabase';
import slugify from 'slugify';

interface CourseFormData {
  title: string;
  description: string;
  level: string;
  duration: string;
  image: string;
  tags: string;
}

export function CourseForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<CourseFormData>();
  const [content, setContent] = React.useState('');

  const onSubmit = async (data: CourseFormData) => {
    try {
      const slug = slugify(data.title, { lower: true });
      const { error } = await supabase.from('courses').insert({
        title: data.title,
        description: data.description,
        level: data.level,
        duration: data.duration,
        image: data.image,
        tags: data.tags.split(',').map(tag => tag.trim()),
        slug,
        content
      });

      if (error) throw error;
      alert('Course submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit course');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Submit Course</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            {...register('title', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.title && <span className="text-red-500">Title is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
          {errors.description && <span className="text-red-500">Description is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Level</label>
          <select
            {...register('level', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          {errors.level && <span className="text-red-500">Level is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Duration (e.g., "6 weeks")</label>
          <input
            type="text"
            {...register('duration', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.duration && <span className="text-red-500">Duration is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            {...register('image', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.image && <span className="text-red-500">Image URL is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
          <input
            type="text"
            {...register('tags', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.tags && <span className="text-red-500">Tags are required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <Editor value={content} onChange={setContent} />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Course
        </button>
      </form>
    </div>
  );
}