export interface Attraction {
  id: string;
  name: { ru: string; en: string };
  description: { ru: string; en: string };
  location: string;
  coordinates: { lat: number; lng: number };
  accessibilityScore: number; // 1-10, higher = more accessible
  duration: number; // minutes
  cost: number; // rubles
  weatherDependent: boolean;
  category: 'museum' | 'park' | 'historical' | 'religious' | 'entertainment';
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
  duration: number; // minutes
  cost: number;
  transfers: number;
  type: 'bus' | 'train' | 'metro' | 'walk';
}

export interface ItineraryRequest {
  days: number;
  budget: number;
  mobilityLevel: 'high' | 'medium' | 'low';
  interests: string[];
  date: string; // ISO date for seed
}

export interface ItineraryDay {
  day: number;
  activities: Activity[];
  totalCost: number;
  totalDuration: number;
  rainyDayAlternatives: Activity[];
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

export interface Itinerary {
  days: ItineraryDay[];
  totalCost: number;
  totalTransfers: number;
  summary: {
    ru: string;
    en: string;
  };
}
