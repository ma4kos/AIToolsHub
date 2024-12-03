import React from 'react';
import { HeroBanner } from './HeroBanner';
import { NewsSection } from './NewsSection';
import { ArticlesSection } from './ArticlesSection';
import { LearningSection } from './LearningSection';
import { ToolsSection } from './tools/ToolsSection';

export function HomePage() {
  return (
    <>
      <HeroBanner />
      <NewsSection />
      <ArticlesSection />
      <LearningSection />
      <ToolsSection />
    </>
  );
}