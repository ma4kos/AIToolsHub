import React from 'react';
import { EventCard } from './EventCard';
import type { Event } from '../../types/event';

interface EventGridProps {
  events: Event[];
}

export function EventGrid({ events }: EventGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}