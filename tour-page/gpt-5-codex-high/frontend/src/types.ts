import type { Locale } from './i18n';

export interface DayPlanSegment {
  slot: 'morning' | 'midday' | 'evening';
  attractionId: string;
  title: Record<Locale, string>;
  city: string;
  indoor: boolean;
  durationHours: number;
  entryFeeRub: number;
  travelMinutesFromPrev: number;
  mobilityNotes: Record<Locale, string>;
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
    language: Locale;
    days: number;
    budgetLevel: 'economy' | 'standard' | 'comfort';
    mobilityLevel: 'average' | 'low-impact';
    totalBudgetRub: number;
    totalTravelMinutes: number;
  };
  plan: DayPlan[];
}

export interface PlannerFormValues {
  days: number;
  budgetLevel: 'economy' | 'standard' | 'comfort';
  mobilityLevel: 'average' | 'low-impact';
  season: 'summer' | 'shoulder' | 'winter';
}
