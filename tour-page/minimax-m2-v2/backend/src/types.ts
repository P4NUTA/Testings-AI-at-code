export type Language = 'ru' | 'en';

export interface Attraction {
  id: string;
  name: { ru: string; en: string };
  description: { ru: string; en: string };
  category: 'museum' | 'palace' | 'nature' | 'church' | 'historical';
  location: {
    city: string;
    lat: number;
    lng: number;
    distanceFromSPb: number; // in km
  };
  accessibility: {
    stairsLevel: 1 | 2 | 3 | 4 | 5; // 1 = minimal stairs, 5 = many stairs
    elevator: boolean;
    wheelchairAccessible: boolean;
    restAreas: number; // number of benches/seating areas
  };
  visitDuration: number; // in minutes
  openingHours: { [key: string]: string };
  ticketPrice: number; // in rubles
  indoor: boolean; // for rainy day alternatives
  rating: number; // 1-5
  photos: string[];
}

export interface Hotel {
  id: string;
  name: { ru: string; en: string };
  location: {
    city: string;
    lat: number;
    lng: number;
  };
  stars: number;
  accessibilityFeatures: {
    elevator: boolean;
    wheelchairRoom: boolean;
    grabRails: boolean;
    lowFloors: boolean;
  };
  pricePerNight: number; // in rubles
  rating: number;
  amenities: string[];
}

export interface Transport {
  id: string;
  type: 'train' | 'bus' | 'taxi';
  from: string;
  to: string;
  duration: number; // in minutes
  price: number; // in rubles
  comfort: {
    transfers: number;
    hasSeating: boolean;
    airConditioning: boolean;
  };
}

export interface Restaurant {
  id: string;
  name: { ru: string; en: string };
  location: {
    city: string;
    lat: number;
    lng: number;
  };
  cuisine: string;
  seniorFriendly: {
    comfortableSeating: boolean;
    quiet: boolean;
    quickService: boolean;
  };
  avgBill: number; // in rubles
  rating: number;
}

export interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
  totalCost: number;
  totalDuration: number; // in minutes
  transport: Transport[];
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
  indoorAlternative?: string; // for outdoor activities on rainy days
}

export interface ItineraryRequest {
  duration: 1 | 2 | 3;
  startCity: string;
  interests: string[];
  budget: 'economy' | 'standard' | 'comfort';
  mobilityLevel: 1 | 2 | 3 | 4 | 5; // 1 = very limited mobility, 5 = full mobility
  transportPreference: 'private' | 'public' | 'mixed';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  weatherSensitive: boolean;
}

export interface Itinerary {
  id: string;
  days: ItineraryDay[];
  totalCost: number;
  totalDuration: number;
  comfortScore: number; // 1-100, higher is better
  difficulty: 1 | 2 | 3; // 1 = easy, 3 = challenging
  highlights: string[];
  weatherPlan: {
    sunny: ItineraryDay[];
    rainy: ItineraryDay[];
  };
  tips: { ru: string; en: string }[];
  language: Language;
}
