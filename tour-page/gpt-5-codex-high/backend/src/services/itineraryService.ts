import { ATTRACTIONS } from '../data/attractions';
import {
  Attraction,
  DayPlan,
  DayPlanSegment,
  ItineraryResponse,
  TravelerPreferences
} from '../types';

const MEAL_COST_BY_BUDGET: Record<TravelerPreferences['budgetLevel'], number> = {
  economy: 600,
  standard: 900,
  comfort: 1400
};

const TRANSFER_TIME_BY_CLUSTER: Record<Attraction['cluster'], number> = {
  south: 60,
  northwest: 90,
  center: 70
};

const deterministicSort = (items: Attraction[]): Attraction[] => {
  return [...items].sort((a, b) => {
    if (a.cluster !== b.cluster) {
      return a.cluster.localeCompare(b.cluster);
    }
    return a.id.localeCompare(b.id);
  });
};

const pickSegments = (
  attractions: Attraction[],
  language: TravelerPreferences['language'],
  limit: number,
  startIndex: number
): { segments: DayPlanSegment[]; nextIndex: number } => {
  const segments: DayPlanSegment[] = [];
  if (attractions.length === 0) {
    return { segments, nextIndex: 0 };
  }

  let cursor = startIndex;
  if (cursor >= attractions.length) {
    cursor = cursor % attractions.length;
  }

  while (segments.length < limit && cursor < attractions.length) {
    const spot = attractions[cursor];
    if (!spot) {
      break;
    }
    segments.push({
      slot: segments.length === 0 ? 'morning' : segments.length === 1 ? 'midday' : 'evening',
      attractionId: spot.id,
      title: spot.name,
      city: spot.city,
      indoor: spot.indoor,
      durationHours: spot.averageVisitHours,
      entryFeeRub: spot.entryFeeRub,
      travelMinutesFromPrev: segments.length === 0 ? TRANSFER_TIME_BY_CLUSTER[spot.cluster] : 20,
      mobilityNotes: {
        ru: spot.hasLowStairs ? 'Минимум ступеней и есть сиденья для отдыха.' : 'Есть пролеты ступеней, нужна поддержка.',
        en: spot.hasLowStairs ? 'Minimal stairs and frequent seating.' : 'Expect several stair spans, seek assistance.'
      }
    });
    cursor += 1;
  }

  const safeCursor = cursor >= attractions.length ? attractions.length : cursor;
  return { segments, nextIndex: safeCursor };
};

export const generateItinerary = (preferences: TravelerPreferences): ItineraryResponse => {
  const filtered = deterministicSort(
    ATTRACTIONS.filter((item) => {
      const mobilityOk = preferences.mobilityLevel === 'low-impact' ? item.hasLowStairs : true;
      const seasonOk =
        preferences.season === 'winter' ? item.indoor : true;
      return mobilityOk && seasonOk;
    })
  );

  if (filtered.length === 0) {
    throw new Error('Нет доступных вариантов для заданных параметров.');
  }

  const clusters = [...new Set(filtered.map((a) => a.cluster))] as Attraction['cluster'][];
  const clusterOffsets: Partial<Record<Attraction['cluster'], number>> = {};
  const plan: DayPlan[] = [];
  let totalBudget = 0;
  let totalTravel = 0;

  for (let day = 0; day < preferences.days; day += 1) {
    const cluster = clusters[day % clusters.length];
    if (!cluster) {
      throw new Error('Не удалось определить кластер для маршрута.');
    }
    const clusterSpots = filtered.filter((a) => a.cluster === cluster);
    if (clusterSpots.length === 0) {
      throw new Error('Для выбранного дня нет подходящих локаций.');
    }
    const offset = clusterOffsets[cluster] ?? 0;
    const { segments, nextIndex } = pickSegments(clusterSpots, preferences.language, 3, offset);
    clusterOffsets[cluster] = nextIndex;

    const ticketsSum = segments.reduce((sum, seg) => sum + seg.entryFeeRub, 0);
    const meals = MEAL_COST_BY_BUDGET[preferences.budgetLevel] * 2;
    const buffer = 400; // transfers, coffee stops
    const dayBudget = ticketsSum + meals + buffer;
    const travelMinutes = segments.reduce((sum, seg) => sum + seg.travelMinutesFromPrev, 0);

    totalBudget += dayBudget;
    totalTravel += travelMinutes;

    const rainyAlternatives = clusterSpots
      .filter((spot) => spot.rainFriendly && !segments.some((s) => s.attractionId === spot.id))
      .slice(0, 2)
      .map((spot) => ({
        slot: 'midday' as const,
        attractionId: spot.id,
        title: spot.name,
        city: spot.city,
        indoor: spot.indoor,
        durationHours: spot.averageVisitHours,
        entryFeeRub: spot.entryFeeRub,
        travelMinutesFromPrev: TRANSFER_TIME_BY_CLUSTER[spot.cluster],
        mobilityNotes: {
          ru: spot.hasLowStairs ? 'Минимум ступеней и теплые переходы.' : 'Нужно внимание к лестницам.',
          en: spot.hasLowStairs ? 'Minimal stairs and enclosed passages.' : 'Watch for stairs.'
        }
      }));

    plan.push({
      dayNumber: day + 1,
      cluster,
      segments,
      estimatedDayBudgetRub: dayBudget,
      estimatedTravelMinutes: travelMinutes,
      rainyAlternatives
    });
  }

  return {
    summary: {
      language: preferences.language,
      days: preferences.days,
      budgetLevel: preferences.budgetLevel,
      mobilityLevel: preferences.mobilityLevel,
      totalBudgetRub: totalBudget,
      totalTravelMinutes: totalTravel
    },
    plan
  };
};
