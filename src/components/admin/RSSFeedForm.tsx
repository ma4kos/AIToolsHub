import React from 'react';
import { useForm } from 'react-hook-form';

interface RSSFeedFormData {
  name: string;
  url: string;
  category: string;
  content_type: 'news' | 'article';
  max_articles: number;
  active: boolean;
}

interface RSSFeedFormProps {
  onSubmit: (data: RSSFeedFormData) => void;
  onCancel: () => void;
  initialData?: Partial<RSSFeedFormData>;
}

export function RSSFeedForm({ onSubmit, onCancel, initialData }: RSSFeedFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<RSSFeedFormData>({
    defaultValues: {
      name: initialData?.name || '',
      url: initialData?.url || '',
      category: initialData?.category || '',
      content_type: initialData?.content_type || 'news',
      max_articles: initialData?.max_articles || 5,
      active: initialData?.active ?? true
    }
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? 'Edit RSS Feed' : 'Add RSS Feed'}
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feed Name
            </label>
            <input
              type="text"
              {...register('name', { required: 'Feed name is required' })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feed URL
            </label>
            <input
              type="url"
              {...register('url', { 
                required: 'Feed URL is required',
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: 'Please enter a valid URL'
                }
              })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.url && (
              <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              {...register('category', { required: 'Category is required' })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content Type
            </label>
            <select
              {...register('content_type', { required: 'Content type is required' })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="news">News</option>
              <option value="article">Article</option>
            </select>
            {errors.content_type && (
              <p className="text-red-500 text-sm mt-1">{errors.content_type.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Articles to Fetch
            </label>
            <input
              type="number"
              {...register('max_articles', { 
                required: 'Max articles is required',
                min: { value: 1, message: 'Must be at least 1' },
                max: { value: 50, message: 'Cannot exceed 50' }
              })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.max_articles && (
              <p className="text-red-500 text-sm mt-1">{errors.max_articles.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('active')}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700">Active</label>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {initialData ? 'Update' : 'Add'} Feed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}