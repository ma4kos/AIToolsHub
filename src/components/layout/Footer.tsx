import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">AI Tools Hub</h3>
            <p className="text-sm">Your comprehensive resource for discovering and learning about the latest AI tools and technologies.</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/glossary" className="hover:text-white">AI Glossary</Link></li>
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/news" className="hover:text-white">News</Link></li>
              <li><Link to="/articles" className="hover:text-white">Articles</Link></li>
              <li><Link to="/learning" className="hover:text-white">Learning</Link></li>
              <li><Link to="/tools" className="hover:text-white">AI Tools</Link></li>
              <li><Link to="/support" className="hover:text-white">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Stay updated with the latest AI news and tools.</p>
            <form className="flex gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-gray-800 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} AI Tools Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}