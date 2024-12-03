import React, { useState } from 'react';
import { TutorialFilters } from '../../components/learning/TutorialFilters';
import { TutorialGrid } from '../../components/learning/TutorialGrid';
import { useTutorials, useTutorialProgress } from '../../hooks/useTutorials';
import { generateUserId } from '../../utils/user';

export function LearningPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const userId = generateUserId();
  const { data: tutorials = [], isLoading } = useTutorials();
  const { data: progress = [] } = useTutorialProgress(userId);

  const progressMap = progress.reduce((acc, item) => {
    acc[item.tutorial_id] = item.progress_percent;
    return acc;
  }, {} as Record<number, number>);

  const completedTutorials = new Set(
    progress
      .filter(item => item.completed)
      .map(item => item.tutorial_id)
  );

  const filteredTutorials = tutorials.filter(tutorial => {
    if (searchQuery && !tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tutorial.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCategory && tutorial.category !== selectedCategory) return false;
    if (selectedDifficulty && tutorial.difficulty_level !== selectedDifficulty) return false;
    if (selectedDuration) {
      const duration = tutorial.duration;
      if (selectedDuration === '< 30 min' && duration >= 30) return false;
      if (selectedDuration === '30-60 min' && (duration < 30 || duration > 60)) return false;
      if (selectedDuration === '> 60 min' && duration <= 60) return false;
    }
    return true;
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 pt-24">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">AI Learning Hub</h1>
        <p className="text-gray-600">
          Explore our curated collection of AI tutorials, from beginner concepts to advanced techniques.
          Track your progress and build your AI knowledge step by step.
        </p>
      </div>

      <TutorialFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        selectedDuration={selectedDuration}
        onDurationChange={setSelectedDuration}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      <TutorialGrid
        tutorials={filteredTutorials}
        progress={progressMap}
        completedTutorials={completedTutorials}
      />
    </div>
  );
}