import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Menu, X, Settings } from 'lucide-react';
import { SearchBar } from '../search/SearchBar';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Tools Hub
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/news" className="text-gray-700 hover:text-blue-600">News</Link>
            <Link to="/articles" className="text-gray-700 hover:text-blue-600">Articles</Link>
            <Link to="/learning" className="text-gray-700 hover:text-blue-600">Learning</Link>
            <Link to="/tools" className="text-gray-700 hover:text-blue-600">AI Tools</Link>
            <Link to="/events" className="text-gray-700 hover:text-blue-600">Events</Link>
            <Link to="/glossary" className="text-gray-700 hover:text-blue-600">AI Glossary</Link>
            <Link to="/admin" className="text-gray-700 hover:text-blue-600">
              <Settings className="w-5 h-5" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block w-64">
              <SearchBar />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-5 h-5 text-gray-700" />
            </button>
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100">
            <div className="mb-4">
              <SearchBar />
            </div>
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link to="/news" className="text-gray-700 hover:text-blue-600">News</Link>
              <Link to="/articles" className="text-gray-700 hover:text-blue-600">Articles</Link>
              <Link to="/learning" className="text-gray-700 hover:text-blue-600">Learning</Link>
              <Link to="/tools" className="text-gray-700 hover:text-blue-600">AI Tools</Link>
              <Link to="/events" className="text-gray-700 hover:text-blue-600">Events</Link>
              <Link to="/glossary" className="text-gray-700 hover:text-blue-600">AI Glossary</Link>
              <Link to="/admin" className="text-gray-700 hover:text-blue-600">Admin</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}