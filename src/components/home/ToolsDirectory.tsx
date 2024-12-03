import React from 'react';
import { Star, Users } from 'lucide-react';

const tools = [
  {
    name: "AI Writer Pro",
    category: "Content Generation",
    pricing: "Freemium",
    rating: 4.8,
    reviews: 1250,
    description: "Advanced AI writing assistant for content creators",
    logo: "https://images.unsplash.com/photo-1612178537253-bccd437b730e"
  },
  {
    name: "DataSense AI",
    category: "Data Analysis",
    pricing: "Paid",
    rating: 4.9,
    reviews: 850,
    description: "Intelligent data analysis and visualization platform",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
  },
  {
    name: "VoiceAI",
    category: "Speech Recognition",
    pricing: "Free",
    rating: 4.7,
    reviews: 2100,
    description: "Real-time speech recognition and translation",
    logo: "https://images.unsplash.com/photo-1589254065878-42c9da997008"
  },
  {
    name: "CodeAssist",
    category: "Development",
    pricing: "Freemium",
    rating: 4.6,
    reviews: 1800,
    description: "AI-powered code completion and analysis",
    logo: "https://images.unsplash.com/photo-1542831371-29b0f74f9713"
  },
  {
    name: "ImageGen Pro",
    category: "Image Generation",
    pricing: "Paid",
    rating: 4.9,
    reviews: 3200,
    description: "Advanced AI image generation and editing",
    logo: "https://images.unsplash.com/photo-1561736778-92e52a7769ef"
  },
  {
    name: "ChatBot Builder",
    category: "Chatbots",
    pricing: "Freemium",
    rating: 4.7,
    reviews: 950,
    description: "No-code AI chatbot creation platform",
    logo: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a"
  }
];

export function ToolsDirectory() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Trending AI Tools</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{tool.name}</h3>
                  <span className="text-sm text-gray-500">{tool.category}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{tool.rating}</span>
                  <span className="text-gray-500">
                    (<Users className="w-3 h-3 inline" /> {tool.reviews})
                  </span>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  tool.pricing === 'Free' ? 'bg-green-100 text-green-700' :
                  tool.pricing === 'Paid' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {tool.pricing}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}