import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Upload } from 'lucide-react';
import { generateAndSaveContent } from '../../services/ai/contentGenerator';
import { parseFile } from '../../services/fileParser';

interface ContentGeneratorProps {
  type: 'news' | 'article';
  onSuccess: () => void;
}

interface FormData {
  url: string;
  file?: FileList;
}

export function ContentGenerator({ type, onSuccess }: ContentGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setIsGenerating(true);

      if (data.file?.length) {
        // Handle file upload
        const file = data.file[0];
        const parsedContent = await parseFile(file);
        await generateAndSaveContent(parsedContent, type);
      } else if (data.url) {
        // Handle URL scraping
        await generateAndSaveContent(data.url, type);
      }

      reset();
      onSuccess();
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL or Upload File
        </label>
        <div className="space-y-4">
          <input
            type="url"
            {...register('url')}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="https://example.com/article"
            disabled={isGenerating}
          />
          
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  Word (.docx), XML, or HTML Archive (.zip)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".docx,.xml,.zip,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/xml,text/xml,application/zip"
                {...register('file')}
                disabled={isGenerating}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <p>The AI will:</p>
        <ul className="list-disc list-inside ml-2">
          <li>Extract and enhance the title</li>
          <li>Generate a suitable description</li>
          <li>Format content into well-structured sections</li>
          <li>Auto-generate relevant tags</li>
        </ul>
      </div>

      <button
        type="submit"
        disabled={isGenerating}
        className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating AI Content...
          </>
        ) : (
          <>Generate {type === 'news' ? 'News' : 'Article'}</>
        )}
      </button>
    </form>
  );
}