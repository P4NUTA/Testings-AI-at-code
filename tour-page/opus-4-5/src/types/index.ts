export type Language = 'ru' | 'en';

export interface LocalizedText {
  ru: string;
  en: string;
}

export interface Attraction {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  location: string;
  category: 'museum' | 'park' | 'palace' | 'fortress' | 'church' | 'nature';
  accessibilityScore: number; // 1-5, 5 = most accessible
  stairsLevel: 'none' | 'few' | 'moderate' | 'many';
  isIndoor: boolean;
  estimatedDuration: number; // minutes
  entranceFee: number; // rubles
  openingHours: string;
  imageUrl: string;
  rainyDayAlternativeId?: string;
}

export interface Restaurant {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  location: string;
  cuisine: LocalizedText;
  priceRange: 'budget' | 'moderate' | 'expensive';
  averageCost: number; // rubles per person
  accessibilityScore: number;
  hasElevator: boolean;
  quietSeating: boolean;
}

export interface TransportOption {
  id: string;
  type: 'bus' | 'train' | 'metro' | 'taxi' | 'walking';
  name: LocalizedText;
  transferCount: number;
  duration: number; // minutes
  cost: number; // rubles
  accessibilityScore: number;
  frequency: string;
}

export interface TransportRoute {
  fromLocationId: string;
  toLocationId: string;
  options: TransportOption[];
}

export interface DayActivity {
  time: string;
  attraction: Attraction;
  transport?: TransportOption;
  travelTime?: number;
}

export interface DayPlan {
  dayNumber: number;
  activities: DayActivity[];
  meals: {
    lunch?: Restaurant;
    dinner?: Restaurant;
  };
  totalCost: number;
  totalTravelTime: number;
  rainyAlternatives: Attraction[];
}

export interface Itinerary {
  id: string;
  days: DayPlan[];
  totalBudget: number;
  totalTravelTime: number;
  comfortScore: number;
  generatedAt: Date;
}

export interface TripPreferences {
  duration: 1 | 2 | 3;
  budgetLevel: 'budget' | 'moderate' | 'comfortable';
  mobilityLevel: 'excellent' | 'good' | 'limited';
  interests: string[];
  seed?: number;
}
