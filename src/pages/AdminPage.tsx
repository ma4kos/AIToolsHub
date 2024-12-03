import React from 'react';
import { PlusCircle, FileText, BookOpen, Wrench, NewspaperIcon, Rss, Calendar, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminPage() {
  const adminSections = [
    {
      title: 'News Management',
      description: 'Add and manage news articles about AI developments',
      icon: NewspaperIcon,
      link: '/admin/news',
      createLink: '/submit/news',
      color: 'bg-blue-500'
    },
    {
      title: 'Articles Management',
      description: 'Create and edit in-depth articles about AI topics',
      icon: FileText,
      link: '/admin/articles',
      createLink: '/submit/article',
      color: 'bg-purple-500'
    },
    {
      title: 'Tutorials Management',
      description: 'Create and manage video tutorials and learning content',
      icon: Video,
      link: '/admin/tutorials',
      createLink: '/submit/tutorial',
      color: 'bg-green-500'
    },
    {
      title: 'Tools Management',
      description: 'Submit and manage AI tools in the directory',
      icon: Wrench,
      link: '/admin/tools',
      createLink: '/submit/tool',
      color: 'bg-orange-500'
    },
    {
      title: 'Events Management',
      description: 'Manage AI events and conferences',
      icon: Calendar,
      link: '/admin/events',
      createLink: '/submit/event',
      color: 'bg-yellow-500'
    },
    {
      title: 'RSS Feeds Management',
      description: 'Configure and manage RSS feeds for automated content',
      icon: Rss,
      link: '/admin/rss',
      color: 'bg-pink-500'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your AI Tools Hub content from one place</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {adminSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div
              key={index}
              className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${section.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  <div className="flex items-center gap-4">
                    <Link
                      to={section.link}
                      className="flex items-center text-blue-600 hover:text-blue-700 gap-2"
                    >
                      <PlusCircle className="w-5 h-5" />
                      <span>Manage Content</span>
                    </Link>
                    {section.createLink && (
                      <Link
                        to={section.createLink}
                        className="flex items-center text-green-600 hover:text-green-700 gap-2"
                      >
                        <PlusCircle className="w-5 h-5" />
                        <span>Create New</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}