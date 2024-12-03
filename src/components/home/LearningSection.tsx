import React from 'react';
import { BookOpen, Clock, BarChart } from 'lucide-react';

const courses = [
  {
    title: "AI Fundamentals",
    description: "Master the basics of artificial intelligence and machine learning",
    level: "Beginner",
    duration: "6 weeks",
    progress: 65,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
  },
  {
    title: "Deep Learning Specialization",
    description: "Advanced concepts in neural networks and deep learning",
    level: "Advanced",
    duration: "12 weeks",
    progress: 40,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c"
  },
  {
    title: "Natural Language Processing",
    description: "Learn to process and analyze human language with AI",
    level: "Intermediate",
    duration: "8 weeks",
    progress: 25,
    image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387"
  }
];

export function LearningSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Learning Paths</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white bg-blue-600 px-3 py-1 rounded-full text-sm">
                  {course.level}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {course.level}
                </div>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-2 text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}