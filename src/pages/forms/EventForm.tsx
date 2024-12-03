import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '../../components/shared/Editor';
import { TagManager } from '../../components/admin/TagManager';
import { useTags } from '../../hooks/useTags';
import { useEvent } from '../../hooks/useEvents';
import { supabase } from '../../lib/supabase';
import slugify from 'slugify';
import type { EventFormData } from '../../types/event';

export function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: tagSuggestions = [] } = useTags();
  const { data: event, isLoading } = useEvent(id || '');
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<EventFormData>({
    defaultValues: event || {
      format: 'in-person',
      registration_status: 'open',
      currency: 'USD',
      featured: false,
      current_attendees: 0
    }
  });
  
  const [content, setContent] = React.useState(event?.description || '');
  const [tags, setTags] = React.useState<string[]>(event?.tags || []);

  React.useEffect(() => {
    if (event) {
      Object.entries(event).forEach(([key, value]) => {
        setValue(key as keyof EventFormData, value);
      });
      setContent(event.description || '');
      setTags(event.tags || []);
    }
  }, [event, setValue]);

  const onSubmit = async (data: EventFormData) => {
    try {
      const slug = slugify(data.title, { lower: true });
      const eventData = {
        ...data,
        tags,
        description: content,
        slug,
        updated_at: new Date().toISOString()
      };

      if (id) {
        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('events')
          .insert([{ ...eventData, created_at: new Date().toISOString() }]);
        if (error) throw error;
      }

      navigate('/admin/events');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save event');
    }
  };

  if (isLoading && id) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{id ? 'Edit' : 'Create'} Event</h1>
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
          <Editor value={content} onChange={setContent} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="datetime-local"
              {...register('start_date', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="datetime-local"
              {...register('end_date', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            {...register('location', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Venue Name</label>
          <input
            type="text"
            {...register('venue_name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Format</label>
          <select
            {...register('format')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="in-person">In-Person</option>
            <option value="virtual">Virtual</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Registration URL</label>
          <input
            type="url"
            {...register('registration_url')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Registration Status</label>
          <select
            {...register('registration_status')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="waitlist">Waitlist</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Attendees</label>
            <input
              type="number"
              {...register('max_attendees')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              step="0.01"
              {...register('price')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            {...register('category', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Deep Learning">Deep Learning</option>
            <option value="Computer Vision">Computer Vision</option>
            <option value="Natural Language Processing">Natural Language Processing</option>
            <option value="Robotics">Robotics</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Business & AI">Business & AI</option>
          </select>
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
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            {...register('image_url')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Organizer</label>
          <input
            type="text"
            {...register('organizer')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Website URL</label>
          <input
            type="url"
            {...register('website_url')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('featured')}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="text-sm font-medium text-gray-700">Featured Event</label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {id ? 'Update' : 'Create'} Event
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/events')}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}