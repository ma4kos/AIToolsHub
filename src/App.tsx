import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { NewsForm } from './pages/forms/NewsForm';
import { ArticleForm } from './pages/forms/ArticleForm';
import { TutorialForm } from './pages/forms/TutorialForm';
import { ToolForm } from './pages/forms/ToolForm';
import { EventForm } from './pages/forms/EventForm';
import { NewsAdmin } from './pages/admin/NewsAdmin';
import { ArticlesAdmin } from './pages/admin/ArticlesAdmin';
import { TutorialsAdmin } from './pages/admin/TutorialsAdmin';
import { ToolsAdmin } from './pages/admin/ToolsAdmin';
import { EventsAdmin } from './pages/admin/EventsAdmin';
import { RSSFeedsAdmin } from './pages/admin/RSSFeedsAdmin';
import { NewsPage } from './pages/sections/NewsPage';
import { ArticlesPage } from './pages/sections/ArticlesPage';
import { LearningPage } from './pages/sections/LearningPage';
import { ToolsPage } from './pages/sections/ToolsPage';
import { EventsPage } from './pages/sections/EventsPage';
import { NewsDetailPage } from './pages/sections/NewsDetailPage';
import { ArticleDetailPage } from './pages/sections/ArticleDetailPage';
import { TutorialDetailPage } from './pages/sections/TutorialDetailPage';
import { ToolDetailPage } from './pages/sections/ToolDetailPage';
import { EventDetailPage } from './pages/sections/EventDetailPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { SearchPage } from './pages/SearchPage';

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsDetailPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:slug" element={<ArticleDetailPage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/learning/tutorial/:id" element={<TutorialDetailPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/tools/:slug" element={<ToolDetailPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:slug" element={<EventDetailPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/news" element={<NewsAdmin />} />
            <Route path="/admin/articles" element={<ArticlesAdmin />} />
            <Route path="/admin/tutorials" element={<TutorialsAdmin />} />
            <Route path="/admin/tools" element={<ToolsAdmin />} />
            <Route path="/admin/events" element={<EventsAdmin />} />
            <Route path="/admin/rss" element={<RSSFeedsAdmin />} />
            <Route path="/submit/news" element={<NewsForm />} />
            <Route path="/submit/news/:id" element={<NewsForm />} />
            <Route path="/submit/article" element={<ArticleForm />} />
            <Route path="/submit/article/:id" element={<ArticleForm />} />
            <Route path="/submit/tutorial" element={<TutorialForm />} />
            <Route path="/submit/tutorial/:id" element={<TutorialForm />} />
            <Route path="/submit/tool" element={<ToolForm />} />
            <Route path="/submit/tool/:id" element={<ToolForm />} />
            <Route path="/submit/event" element={<EventForm />} />
            <Route path="/submit/event/:id" element={<EventForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;