import type {
  Attraction,
  Restaurant,
  TripPreferences,
  DayPlan,
  DayActivity,
  Itinerary,
  TransportOption,
} from '../types';
import attractionsData from '../data/attractions.json';
import restaurantsData from '../data/restaurants.json';
import transportData from '../data/transport.json';
import { seededRandom, shuffleArray } from '../utils/helpers';

const attractions = attractionsData as Attraction[];
const restaurants = restaurantsData as Restaurant[];
const transport = transportData as { routes: Array<{ fromLocationId: string; toLocationId: string; options: TransportOption[] }> };

function getMinAccessibilityScore(mobilityLevel: string): number {
  switch (mobilityLevel) {
    case 'limited':
      return 4;
    case 'good':
      return 3;
    default:
      return 1;
  }
}

function filterAttractionsByPreferences(
  allAttractions: Attraction[],
  preferences: TripPreferences
): Attraction[] {
  const minScore = getMinAccessibilityScore(preferences.mobilityLevel);

  return allAttractions.filter((a) => {
    if (a.accessibilityScore < minScore) return false;

    if (preferences.mobilityLevel === 'limited' && a.stairsLevel === 'many') {
      return false;
    }

    if (preferences.interests.length > 0) {
      const categoryMap: Record<string, string[]> = {
        museums: ['museum'],
        palaces: ['palace'],
        parks: ['park', 'nature'],
        history: ['fortress', 'church'],
        art: ['museum'],
        nature: ['park', 'nature'],
      };

      const relevantCategories = preferences.interests.flatMap(
        (i) => categoryMap[i] || []
      );
      if (
        relevantCategories.length > 0 &&
        !relevantCategories.includes(a.category)
      ) {
        return false;
      }
    }

    return true;
  });
}

function filterRestaurantsByPreferences(
  allRestaurants: Restaurant[],
  preferences: TripPreferences
): Restaurant[] {
  const minScore = getMinAccessibilityScore(preferences.mobilityLevel);

  return allRestaurants.filter((r) => {
    if (r.accessibilityScore < minScore) return false;

    if (preferences.budgetLevel === 'budget' && r.priceRange === 'expensive') {
      return false;
    }

    return true;
  });
}

function getTransportOption(
  toLocationId: string,
  preferences: TripPreferences
): TransportOption | undefined {
  const route = transport.routes.find((r) => r.toLocationId === toLocationId);
  if (!route) return undefined;

  const minScore = getMinAccessibilityScore(preferences.mobilityLevel);

  const suitable = route.options
    .filter((o) => o.accessibilityScore >= minScore)
    .sort((a, b) => {
      if (preferences.budgetLevel === 'comfortable') {
        return b.accessibilityScore - a.accessibilityScore;
      }
      if (preferences.budgetLevel === 'budget') {
        return a.cost - b.cost;
      }
      return a.transferCount - b.transferCount;
    });

  return suitable[0];
}

function getRainyAlternative(
  attraction: Attraction,
  usedIds: Set<string>
): Attraction | undefined {
  if (attraction.isIndoor) return undefined;

  if (attraction.rainyDayAlternativeId) {
    const alt = attractions.find(
      (a) => a.id === attraction.rainyDayAlternativeId && !usedIds.has(a.id)
    );
    if (alt) return alt;
  }

  return attractions.find((a) => a.isIndoor && !usedIds.has(a.id));
}

function generateDayPlan(
  availableAttractions: Attraction[],
  availableRestaurants: Restaurant[],
  usedAttractionIds: Set<string>,
  usedRestaurantIds: Set<string>,
  dayNumber: number,
  preferences: TripPreferences,
  randomFn: () => number
): DayPlan {
  const activities: DayActivity[] = [];
  const rainyAlternatives: Attraction[] = [];
  let totalCost = 0;
  let totalTravelTime = 0;

  const dayAttractions = shuffleArray(
    availableAttractions.filter((a) => !usedAttractionIds.has(a.id)),
    randomFn
  ).slice(0, 2);

  const times = ['10:00', '14:30'];

  dayAttractions.forEach((attraction, index) => {
    usedAttractionIds.add(attraction.id);

    const transportOpt = getTransportOption(attraction.id, preferences);
    const travelTime = transportOpt?.duration || 30;

    activities.push({
      time: times[index],
      attraction,
      transport: transportOpt,
      travelTime,
    });

    totalCost += attraction.entranceFee + (transportOpt?.cost || 0);
    totalTravelTime += travelTime;

    const rainyAlt = getRainyAlternative(attraction, usedAttractionIds);
    if (rainyAlt) {
      rainyAlternatives.push(rainyAlt);
    }
  });

  const dayRestaurants = shuffleArray(
    availableRestaurants.filter((r) => !usedRestaurantIds.has(r.id)),
    randomFn
  );

  const lunch = dayRestaurants[0];
  const dinner = dayRestaurants[1];

  if (lunch) {
    usedRestaurantIds.add(lunch.id);
    totalCost += lunch.averageCost;
  }
  if (dinner) {
    usedRestaurantIds.add(dinner.id);
    totalCost += dinner.averageCost;
  }

  return {
    dayNumber,
    activities,
    meals: { lunch, dinner },
    totalCost,
    totalTravelTime,
    rainyAlternatives,
  };
}

export function generateItinerary(preferences: TripPreferences): Itinerary {
  const seed = preferences.seed ?? Date.now();
  const randomFn = seededRandom(seed);

  const filteredAttractions = filterAttractionsByPreferences(
    attractions,
    preferences
  );
  const filteredRestaurants = filterRestaurantsByPreferences(
    restaurants,
    preferences
  );

  if (filteredAttractions.length < preferences.duration * 2) {
    throw new Error('noAttractions');
  }

  const usedAttractionIds = new Set<string>();
  const usedRestaurantIds = new Set<string>();
  const days: DayPlan[] = [];

  for (let i = 1; i <= preferences.duration; i++) {
    const dayPlan = generateDayPlan(
      filteredAttractions,
      filteredRestaurants,
      usedAttractionIds,
      usedRestaurantIds,
      i,
      preferences,
      randomFn
    );
    days.push(dayPlan);
  }

  const totalBudget = days.reduce((sum, d) => sum + d.totalCost, 0);
  const totalTravelTime = days.reduce((sum, d) => sum + d.totalTravelTime, 0);

  const avgAccessibility =
    days.flatMap((d) => d.activities.map((a) => a.attraction.accessibilityScore))
      .reduce((sum, score) => sum + score, 0) /
    (days.length * 2);

  const comfortScore = Math.round(avgAccessibility * 20);

  return {
    id: `itinerary-${seed}`,
    days,
    totalBudget,
    totalTravelTime,
    comfortScore,
    generatedAt: new Date(),
  };
}
