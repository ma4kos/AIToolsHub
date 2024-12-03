import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTutorials } from '../../hooks/useTutorials';
import { TutorialCard } from '../learning/TutorialCard';

export function TutorialsSection() {
  const { data: tutorials = [], isLoading } = useTutorials();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Tutorials</h2>
          <Link 
            to="/learning" 
            className="text-blue-600 flex items-center gap-2 hover:text-blue-700"
          >
            View All Tutorials
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.slice(0, 3).map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}