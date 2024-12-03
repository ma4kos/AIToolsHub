import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroBanner() {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 to-purple-900 pt-24">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl relative z-10">
          <h1 className="text-5xl font-bold leading-tight mb-6 text-white">
            Discover the Future of AI Innovation
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Explore cutting-edge AI tools, stay updated with latest news, and enhance your skills with expert-curated resources.
          </p>
          <Link 
            to="/tools" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            Explore AI Tools
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <div 
        className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb')] bg-cover bg-center mix-blend-overlay"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80" />
    </div>
  );
}