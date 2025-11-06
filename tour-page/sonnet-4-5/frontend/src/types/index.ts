export interface Attraction {
  id: string;
  name: { ru: string; en: string };
  description: { ru: string; en: string };
  location: string;
  coordinates: { lat: number; lng: number };
  accessibilityScore: number;
  duration: number;
  cost: number;
  weatherDependent: boolean;
  category: string;
  openingHours: string;
  stairCount: number;
  hasElevator: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  avgCost: number;
  cuisine: string;
  accessible: boolean;
}

export interface TransportRoute {
  from: string;
  to: string;
  duration: number;
  cost: number;
  transfers: number;
  type: string;
}

export interface Activity {
  time: string;
  type: 'attraction' | 'meal' | 'transport';
  attraction?: Attraction;
  restaurant?: Restaurant;
  transport?: TransportRoute;
  cost: number;
  duration: number;
}

export interface ItineraryDay {
  day: number;
  activities: Activity[];
  totalCost: number;
  totalDuration: number;
  rainyDayAlternatives: Activity[];
}

export interface Itinerary {
  days: ItineraryDay[];
  totalCost: number;
  totalTransfers: number;
  summary: {
    ru: string;
    en: string;
  };
}

export interface ItineraryRequest {
  days: number;
  budget: number;
  mobilityLevel: 'high' | 'medium' | 'low';
  interests: string[];
  date?: string;
}
