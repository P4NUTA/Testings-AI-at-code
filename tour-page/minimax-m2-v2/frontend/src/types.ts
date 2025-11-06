export type Language = 'ru' | 'en';

export interface ItineraryRequest {
  duration: 1 | 2 | 3;
  startCity: string;
  interests: string[];
  budget: 'economy' | 'standard' | 'comfort';
  mobilityLevel: 1 | 2 | 3 | 4 | 5;
  transportPreference: 'private' | 'public' | 'mixed';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  weatherSensitive: boolean;
}

export interface Activity {
  id: string;
  type: 'attraction' | 'restaurant' | 'hotel';
  attractionId?: string;
  restaurantId?: string;
  hotelId?: string;
  startTime: string;
  endTime: string;
  duration: number;
  cost: number;
  notes?: string;
  indoorAlternative?: string;
}

export interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
  totalCost: number;
  totalDuration: number;
  transport: any[];
}

export interface Itinerary {
  id: string;
  days: ItineraryDay[];
  totalCost: number;
  totalDuration: number;
  comfortScore: number;
  difficulty: 1 | 2 | 3;
  highlights: string[];
  weatherPlan: {
    sunny: ItineraryDay[];
    rainy: ItineraryDay[];
  };
  tips: { ru: string; en: string }[];
  language: Language;
}
