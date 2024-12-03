import React from 'react';
import { Clock, BarChart, Eye, ThumbsUp, CheckCircle, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Tutorial } from '../../types/tutorial';

interface TutorialCardProps {
  tutorial: Tutorial;
  progress?: number;
  isCompleted?: boolean;
}

export function TutorialCard({ tutorial, progress = 0, isCompleted = false }: TutorialCardProps) {
  const difficultyColor = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800'
  }[tutorial.difficulty_level];

  return (
    <Link to={`/learning/tutorial/${tutorial.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="relative">
          <img
            src={tutorial.thumbnail_url}
            alt={tutorial.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColor}`}>
              {tutorial.difficulty_level}
            </span>
          </div>
          {progress > 0 && !isCompleted && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
              <div 
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          {isCompleted && (
            <div className="absolute bottom-4 right-4">
              <CheckCircle className="w-6 h-6 text-green-500 fill-current" />
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{tutorial.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {tutorial.description}
          </p>

          {tutorial.tags && tutorial.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tutorial.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {tutorial.duration} min
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {tutorial.views}
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                {tutorial.likes}
              </span>
            </div>
            <span className="flex items-center gap-1">
              <BarChart className="w-4 h-4" />
              {tutorial.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}