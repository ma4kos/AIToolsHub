import React from 'react';
import { TutorialCard } from './TutorialCard';
import type { Tutorial } from '../../types/tutorial';

interface TutorialGridProps {
  tutorials: Tutorial[];
  progress?: Record<number, number>;
  completedTutorials?: Set<number>;
}

export function TutorialGrid({ 
  tutorials,
  progress = {},
  completedTutorials = new Set()
}: TutorialGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tutorials.map((tutorial) => (
        <TutorialCard
          key={tutorial.id}
          tutorial={tutorial}
          progress={progress[tutorial.id]}
          isCompleted={completedTutorials.has(tutorial.id)}
        />
      ))}
    </div>
  );
}