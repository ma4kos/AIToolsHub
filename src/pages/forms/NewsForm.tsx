import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '../../components/shared/Editor';
import { TagManager } from '../../components/admin/TagManager';
import { useTags } from '../../hooks/useTags';
import { useNewsItem, useUpdateNews } from '../../hooks/useContent';
import { supabase } from '../../lib/supabase';
import slugify from 'slugify';

interface NewsFormData {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export function NewsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: tagSuggestions = [] } = useTags();
  const { data: newsItem, isLoading } = useNewsItem(id || '');
  const updateNews = useUpdateNews();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<NewsFormData>({
    defaultValues: newsItem || {}
  });
  
  const [content, setContent] = React.useState(newsItem?.content || '');
  const [tags, setTags] = React.useState<string[]>(newsItem?.tags || []);

  React.useEffect(() => {
    if (newsItem) {
      Object.entries(newsItem).forEach(([key, value]) => {
        setValue(key as keyof NewsFormData, value);
      });
      setContent(newsItem.content || '');
      setTags(newsItem.tags || []);
    }
  }, [newsItem, setValue]);

  const onSubmit = async (data: NewsFormData) => {
    try {
      const slug = slugify(data.title, { lower: true });
      const newsData = {
        ...data,
        tags,
        content,
        slug
      };

      if (id) {
        await updateNews.mutateAsync({ id, ...newsData });
      } else {
        const { error } = await supabase.from('news').insert([newsData]);
        if (error) throw error;
      }

      navigate('/admin/news');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit news');
    }
  };

  if (isLoading && id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{id ? 'Edit' : 'Submit'} News</h1>
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
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            {...register('image', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.image && <span className="text-red-500">Image URL is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <TagManager
            tags={tags}
            onTagsChange={setTags}
            suggestions={tagSuggestions}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <Editor value={content} onChange={setContent} />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {id ? 'Update' : 'Submit'} News
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/news')}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}