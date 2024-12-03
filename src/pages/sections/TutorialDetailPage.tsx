import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, BarChart, Eye, ThumbsUp, Tag } from 'lucide-react';
import ReactPlayer from 'react-player/youtube';
import { useTutorial, useUpdateProgress } from '../../hooks/useTutorials';
import { generateUserId } from '../../utils/user';

export function TutorialDetailPage() {
  const { id } = useParams<{ id: string }>();
  const userId = generateUserId();
  const { data: tutorial, isLoading } = useTutorial(Number(id));
  const updateProgress = useUpdateProgress();

  useEffect(() => {
    if (tutorial) {
      updateProgress.mutate({
        tutorialId: tutorial.id,
        userId,
        progress: 0,
        completed: false
      });
    }
  }, [tutorial?.id]);

  const handleProgress = ({ played }: { played: number }) => {
    if (tutorial) {
      const progress = Math.round(played * 100);
      updateProgress.mutate({
        tutorialId: tutorial.id,
        userId,
        progress,
        completed: progress === 100
      });
    }
  };

  const handleComplete = () => {
    if (tutorial) {
      updateProgress.mutate({
        tutorialId: tutorial.id,
        userId,
        progress: 100,
        completed: true
      });
    }
  };

  if (isLoading || !tutorial) {
    return <div className="container mx-auto px-4 py-8 pt-24">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{tutorial.title}</h1>
          
          {tutorial.tags && tutorial.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tutorial.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700"
                >
                  <Tag className="w-4 h-4 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 text-gray-600">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {tutorial.duration} min
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {tutorial.views} views
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              {tutorial.likes} likes
            </span>
            <span className="flex items-center gap-1">
              <BarChart className="w-4 h-4" />
              {tutorial.category}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              tutorial.difficulty_level === 'Beginner' ? 'bg-green-100 text-green-800' :
              tutorial.difficulty_level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {tutorial.difficulty_level}
            </span>
          </div>
        </div>

        <div className="mb-8 aspect-video">
          <ReactPlayer
            url={tutorial.video_url}
            width="100%"
            height="100%"
            controls
            onProgress={handleProgress}
            onEnded={handleComplete}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0
                }
              }
            }}
          />
        </div>

        <div className="prose max-w-none">
          <h2>About this Tutorial</h2>
          <p>{tutorial.description}</p>

          {tutorial.learning_outcomes?.length > 0 && (
            <>
              <h2>What You'll Learn</h2>
              <ul>
                {tutorial.learning_outcomes.map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>
            </>
          )}

          {tutorial.prerequisites?.length > 0 && (
            <>
              <h2>Prerequisites</h2>
              <ul>
                {tutorial.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </>
          )}

          {tutorial.content && (
            <>
              <h2>Additional Resources</h2>
              <div dangerouslySetInnerHTML={{ __html: tutorial.content }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}