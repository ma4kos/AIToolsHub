import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '../../components/shared/Editor';
import { TagManager } from '../../components/admin/TagManager';
import { useTags } from '../../hooks/useTags';
import { useTutorial } from '../../hooks/useTutorial';
import { validateYouTubeUrl, getYouTubeThumbnail } from '../../utils/youtube';
import { supabase } from '../../lib/supabase';
import slugify from 'slugify';

interface TutorialFormData {
  title: string;
  description: string;
  video_url: string;
  duration: number;
  difficulty_level: string;
  category: string;
  learning_outcomes: string;
  prerequisites: string;
  tags: string[];
}

export function TutorialForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: tagSuggestions = [] } = useTags();
  const { data: tutorial, isLoading } = useTutorial(Number(id));
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<TutorialFormData>({
    defaultValues: tutorial || {
      difficulty_level: 'Beginner',
      duration: 30,
      category: 'Machine Learning'
    }
  });
  
  const [content, setContent] = React.useState(tutorial?.content || '');
  const [tags, setTags] = React.useState<string[]>(tutorial?.tags || []);
  const videoUrl = watch('video_url');

  React.useEffect(() => {
    if (tutorial) {
      Object.entries(tutorial).forEach(([key, value]) => {
        setValue(key as keyof TutorialFormData, value);
      });
      setContent(tutorial.content || '');
      setTags(tutorial.tags || []);
    }
  }, [tutorial, setValue]);

  const onSubmit = async (data: TutorialFormData) => {
    try {
      if (!validateYouTubeUrl(data.video_url)) {
        alert('Please enter a valid YouTube URL');
        return;
      }

      const slug = slugify(data.title, { lower: true });
      const thumbnail_url = getYouTubeThumbnail(data.video_url);

      const tutorialData = {
        ...data,
        tags,
        content,
        slug,
        thumbnail_url,
        learning_outcomes: data.learning_outcomes.split('\n').filter(Boolean),
        prerequisites: data.prerequisites.split('\n').filter(Boolean),
        updated_at: new Date().toISOString()
      };

      if (id) {
        const { error } = await supabase
          .from('tutorials')
          .update(tutorialData)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('tutorials')
          .insert([{ ...tutorialData, created_at: new Date().toISOString() }]);
        if (error) throw error;
      }

      navigate('/admin/tutorials');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save tutorial');
    }
  };

  if (isLoading && id) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{id ? 'Edit' : 'Create'} Tutorial</h1>
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
          <label className="block text-sm font-medium text-gray-700">YouTube URL</label>
          <input
            type="url"
            {...register('video_url', { 
              required: 'YouTube URL is required',
              validate: validateYouTubeUrl
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.video_url && <span className="text-red-500">{errors.video_url.message}</span>}
          {videoUrl && validateYouTubeUrl(videoUrl) && (
            <div className="mt-2">
              <img
                src={getYouTubeThumbnail(videoUrl)}
                alt="Video thumbnail"
                className="w-full rounded-lg"
              />
            </div>
          )}
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
          <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
          <input
            type="number"
            {...register('duration', { required: true, min: 1 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Difficulty Level</label>
          <select
            {...register('difficulty_level')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            {...register('category')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Machine Learning">Machine Learning</option>
            <option value="Deep Learning">Deep Learning</option>
            <option value="Natural Language Processing">Natural Language Processing</option>
            <option value="Computer Vision">Computer Vision</option>
            <option value="Reinforcement Learning">Reinforcement Learning</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Learning Outcomes (one per line)</label>
          <textarea
            {...register('learning_outcomes')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="- Understand basic ML concepts&#10;- Implement your first model&#10;- Evaluate model performance"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Prerequisites (one per line)</label>
          <textarea
            {...register('prerequisites')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="- Basic Python knowledge&#10;- Understanding of statistics&#10;- Familiarity with NumPy"
          />
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Content</label>
          <Editor value={content} onChange={setContent} />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {id ? 'Update' : 'Create'} Tutorial
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/tutorials')}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}