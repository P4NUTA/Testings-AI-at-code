export type LanguageCode = 'ru' | 'en';

export interface TravelerPreferences {
  days: number;
  language: LanguageCode;
  budgetLevel: 'economy' | 'standard' | 'comfort';
  mobilityLevel: 'average' | 'low-impact';
  season: 'summer' | 'shoulder' | 'winter';
}

export interface Attraction {
  id: string;
  name: Record<LanguageCode, string>;
  city: string;
  cluster: 'south' | 'northwest' | 'center';
  indoor: boolean;
  averageVisitHours: number;
  entryFeeRub: number;
  hasLowStairs: boolean;
  description: Record<LanguageCode, string>;
  transportMinutesFromSpb: number;
  rainFriendly: boolean;
}

export interface DayPlanSegment {
  slot: 'morning' | 'midday' | 'evening';
  attractionId: string;
  title: Record<LanguageCode, string>;
  city: string;
  indoor: boolean;
  durationHours: number;
  entryFeeRub: number;
  travelMinutesFromPrev: number;
  mobilityNotes: Record<LanguageCode, string>;
}

export interface DayPlan {
  dayNumber: number;
  cluster: string;
  segments: DayPlanSegment[];
  estimatedDayBudgetRub: number;
  estimatedTravelMinutes: number;
  rainyAlternatives: DayPlanSegment[];
}

export interface ItineraryResponse {
  summary: {
    language: LanguageCode;
    days: number;
    budgetLevel: TravelerPreferences['budgetLevel'];
    mobilityLevel: TravelerPreferences['mobilityLevel'];
    totalBudgetRub: number;
    totalTravelMinutes: number;
  };
  plan: DayPlan[];
}
