import React from 'react';
import { useForm } from 'react-hook-form';
import { Editor } from '../../components/shared/Editor';
import { supabase } from '../../lib/supabase';
import slugify from 'slugify';

interface ToolFormData {
  name: string;
  category: string;
  pricing: string;
  description: string;
  logo: string;
  tags: string;
}

export function ToolForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ToolFormData>();
  const [content, setContent] = React.useState('');

  const onSubmit = async (data: ToolFormData) => {
    try {
      const slug = slugify(data.name, { lower: true });
      const { error } = await supabase.from('tools').insert({
        name: data.name,
        category: data.category,
        pricing: data.pricing,
        description: data.description,
        logo: data.logo,
        tags: data.tags.split(',').map(tag => tag.trim()),
        slug,
        rating: 0,
        reviews: 0,
        content
      });

      if (error) throw error;
      alert('Tool submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit tool');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Submit AI Tool</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tool Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && <span className="text-red-500">Tool name is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            {...register('category', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            <option value="Content Generation">Content Generation</option>
            <option value="Data Analysis">Data Analysis</option>
            <option value="Speech Recognition">Speech Recognition</option>
            <option value="Development">Development</option>
            <option value="Image Generation">Image Generation</option>
            <option value="Chatbots">Chatbots</option>
          </select>
          {errors.category && <span className="text-red-500">Category is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Pricing</label>
          <select
            {...register('pricing', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select pricing type</option>
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
            <option value="Freemium">Freemium</option>
          </select>
          {errors.pricing && <span className="text-red-500">Pricing is required</span>}
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
          <label className="block text-sm font-medium text-gray-700">Logo URL</label>
          <input
            type="url"
            {...register('logo', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.logo && <span className="text-red-500">Logo URL is required</span>}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description</label>
          <Editor value={content} onChange={setContent} />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Tool
        </button>
      </form>
    </div>
  );
}