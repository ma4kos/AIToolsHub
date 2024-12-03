import React from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { ToolsSection } from '../components/home/tools/ToolsSection';
import { ArticlesSection } from '../components/home/ArticlesSection';
import { NewsSection } from '../components/home/NewsSection';
import { TutorialsSection } from '../components/home/TutorialsSection';
import { EventsSection } from '../components/home/EventsSection';

export function HomePage() {
  return (
    <>
      <HeroBanner />
      <ToolsSection />
      <ArticlesSection />
      <NewsSection />
      <TutorialsSection />
      <EventsSection />
    </>
  );
}