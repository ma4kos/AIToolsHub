import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { EventFilters } from '../../components/events/EventFilters';
import { EventGrid } from '../../components/events/EventGrid';
import { useEvents } from '../../hooks/useEvents';

export function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { data: events = [], isLoading } = useEvents();

  const filteredEvents = events.filter(event => {
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !event.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCategory && event.category !== selectedCategory) return false;
    if (selectedFormat && event.format !== selectedFormat) return false;
    if (selectedMonth) {
      const eventMonth = event.start_date.substring(0, 7); // YYYY-MM
      if (eventMonth !== selectedMonth) return false;
    }
    return true;
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 pt-24">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Events & Conferences</h1>
          <p className="text-gray-600">
            Discover upcoming AI events, conferences, and workshops around the world.
          </p>
        </div>
        <Link
          to="/submit/event"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Submit Event
        </Link>
      </div>

      <EventFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedFormat={selectedFormat}
        onFormatChange={setSelectedFormat}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      <EventGrid events={filteredEvents} />
    </div>
  );
}