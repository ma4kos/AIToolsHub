import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useFeaturedEvents } from '../../hooks/useEvents';
import { EventCard } from '../events/EventCard';

export function EventsSection() {
  const { data: events = [], isLoading } = useFeaturedEvents();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!events.length) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Upcoming Events</h2>
          <Link 
            to="/events" 
            className="text-blue-600 flex items-center gap-2 hover:text-blue-700"
          >
            View All Events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}