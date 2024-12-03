import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '../../components/shared/Editor';
import { TagManager } from '../../components/admin/TagManager';
import { useTags } from '../../hooks/useTags';
import { useArticleItem, useUpdateArticle } from '../../hooks/useContent';
import { supabase } from '../../lib/supabase';
import slugify from 'slugify';

interface ArticleFormData {
  title: string;
  description: string;
  author: string;
  read_time: string;
  category: string;
  image: string;
  tags: string[];
}

export function ArticleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: tagSuggestions = [] } = useTags();
  const { data: article, isLoading } = useArticleItem(id || '');
  const updateArticle = useUpdateArticle();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ArticleFormData>({
    defaultValues: article || {
      author: 'AI Tools Hub',
      read_time: '5 min',
      category: 'Technology'
    }
  });
  
  const [content, setContent] = React.useState(article?.content || '');
  const [tags, setTags] = React.useState<string[]>(article?.tags || []);

  React.useEffect(() => {
    if (article) {
      Object.entries(article).forEach(([key, value]) => {
        setValue(key as keyof ArticleFormData, value);
      });
      setContent(article.content || '');
      setTags(article.tags || []);
    }
  }, [article, setValue]);

  const onSubmit = async (data: ArticleFormData) => {
    try {
      const slug = slugify(data.title, { lower: true });
      const articleData = {
        ...data,
        tags,
        content,
        slug,
        updated_at: new Date().toISOString()
      };

      if (id) {
        await updateArticle.mutateAsync({ id, ...articleData });
      } else {
        const { error } = await supabase
          .from('articles')
          .insert([{ ...articleData, created_at: new Date().toISOString() }]);
        if (error) throw error;
      }

      navigate('/admin/articles');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save article');
    }
  };

  if (isLoading && id) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{id ? 'Edit' : 'Create'} Article</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.title && <span className="text-red-500">{errors.title.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            {...register('author')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            {...register('category')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Technology">Technology</option>
            <option value="AI">AI</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            {...register('image', { required: 'Image URL is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.image && <span className="text-red-500">{errors.image.message}</span>}
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
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {id ? 'Update' : 'Create'} Article
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/articles')}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}