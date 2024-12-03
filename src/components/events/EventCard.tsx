import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Tag } from 'lucide-react';
import type { Event } from '../../types/event';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      case 'waitlist':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link to={`/events/${event.slug}`} className="block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="relative h-48">
          <img
            src={event.image_url || 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c'}
            alt={event.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${formatStatus(event.registration_status)}`}>
              {event.registration_status.charAt(0).toUpperCase() + event.registration_status.slice(1)}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(event.start_date)}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>

            {event.max_attendees && (
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>{event.current_attendees} / {event.max_attendees} attendees</span>
              </div>
            )}
          </div>

          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}