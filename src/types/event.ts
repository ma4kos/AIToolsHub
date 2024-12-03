export interface Event {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  venue_name?: string;
  format: 'in-person' | 'virtual' | 'hybrid';
  registration_url?: string;
  registration_deadline?: string;
  registration_status: 'open' | 'closed' | 'waitlist';
  max_attendees?: number;
  current_attendees: number;
  price?: number;
  currency?: string;
  category: string;
  tags: string[];
  image_url?: string;
  organizer?: string;
  website_url?: string;
  featured: boolean;
  slug: string;
  created_at: string;
  updated_at: string;
}

export type EventFormData = Omit<Event, 'id' | 'slug' | 'created_at' | 'updated_at'>;