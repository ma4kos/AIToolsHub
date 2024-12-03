import React from 'react';
import { useForm } from 'react-hook-form';
import { Editor } from '../shared/Editor';
import { TagManager } from './TagManager';
import { useTags } from '../../hooks/useTags';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

interface ContentFormProps {
  type: 'news' | 'article' | 'tool' | 'course';
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function ContentForm({ type, initialData, onSubmit, onCancel }: ContentFormProps) {
  const { data: tagSuggestions = [] } = useTags();
  const [content, setContent] = React.useState('');
  const [tags, setTags] = React.useState<string[]>([]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: initialData || {}
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
      setContent(initialData.content || '');
      setTags(initialData.tags || []);
    }
  }, [initialData, reset]);

  const handleFormSubmit = (formData: any) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    const markdownContent = marked(sanitizedContent);

    onSubmit({
      ...formData,
      content: markdownContent,
      tags
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          {...register('title', { required: 'Title is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message as string}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.description && (
          <span className="text-red-500 text-sm">{errors.description.message as string}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          {...register('image', { required: 'Image URL is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.image && (
          <span className="text-red-500 text-sm">{errors.image.message as string}</span>
        )}
      </div>

      {type === 'article' && (
        <>
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
        </>
      )}

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

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {initialData ? 'Update' : 'Create'} {type}
        </button>
      </div>
    </form>
  );
}