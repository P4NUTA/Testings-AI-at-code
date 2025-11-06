import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import type {
  Attraction,
  Restaurant,
  TransportRoute,
  ItineraryRequest,
  Itinerary,
  ItineraryDay,
  Activity
} from '../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load mock data
const attractions: Attraction[] = JSON.parse(
  readFileSync(join(__dirname, '../data/attractions.json'), 'utf-8')
);
const restaurants: Restaurant[] = JSON.parse(
  readFileSync(join(__dirname, '../data/restaurants.json'), 'utf-8')
);
const transportRoutes: TransportRoute[] = JSON.parse(
  readFileSync(join(__dirname, '../data/transport.json'), 'utf-8')
);

// Deterministic seeded random
class SeededRandom {
  private seed: number;

  constructor(seed: string) {
    this.seed = this.hashCode(seed);
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

export function generateItinerary(request: ItineraryRequest): Itinerary {
  const seed = `${request.date}-${request.days}-${request.budget}-${request.mobilityLevel}`;
  const rng = new SeededRandom(seed);

  // Filter attractions by mobility level
  const accessibilityThreshold =
    request.mobilityLevel === 'high' ? 4 :
    request.mobilityLevel === 'medium' ? 6 : 8;

  let suitableAttractions = attractions.filter(
    a => a.accessibilityScore >= accessibilityThreshold
  );

  // Filter by interests if specified
  if (request.interests.length > 0) {
    const filtered = suitableAttractions.filter(a =>
      request.interests.includes(a.category)
    );
    if (filtered.length > 0) {
      suitableAttractions = filtered;
    }
  }

  // Shuffle deterministically
  suitableAttractions = rng.shuffle(suitableAttractions);

  // Calculate budget per day
  const budgetPerDay = request.budget / request.days;
  const days: ItineraryDay[] = [];
  let totalTransfers = 0;

  for (let dayNum = 1; dayNum <= request.days; dayNum++) {
    const dayActivities: Activity[] = [];
    let dayCost = 0;
    let dayDuration = 0;

    // Select 2-3 attractions per day
    const attractionsPerDay = Math.min(
      dayNum === 1 ? 2 : 3,
      suitableAttractions.length
    );

    const dayAttractions = suitableAttractions.slice(0, attractionsPerDay);
    suitableAttractions = suitableAttractions.slice(attractionsPerDay);

    let currentTime = 540; // 09:00 in minutes

    for (let i = 0; i < dayAttractions.length; i++) {
      const attraction = dayAttractions[i];

      // Add transport to attraction
      const transport = transportRoutes.find(
        r => r.to === attraction.location
      ) || {
        from: 'Saint Petersburg',
        to: attraction.location,
        duration: 60,
        cost: 150,
        transfers: 0,
        type: 'bus' as const
      };

      dayActivities.push({
        time: formatTime(currentTime),
        type: 'transport',
        transport,
        cost: transport.cost,
        duration: transport.duration
      });

      dayCost += transport.cost;
      dayDuration += transport.duration;
      currentTime += transport.duration;
      totalTransfers += transport.transfers;

      // Add attraction
      dayActivities.push({
        time: formatTime(currentTime),
        type: 'attraction',
        attraction,
        cost: attraction.cost,
        duration: attraction.duration
      });

      dayCost += attraction.cost;
      dayDuration += attraction.duration;
      currentTime += attraction.duration;

      // Add lunch if it's around midday
      if (i === Math.floor(attractionsPerDay / 2)) {
        const restaurant = restaurants.find(
          r => r.location === attraction.location
        ) || restaurants[0];

        dayActivities.push({
          time: formatTime(currentTime),
          type: 'meal',
          restaurant,
          cost: restaurant.avgCost,
          duration: 60
        });

        dayCost += restaurant.avgCost;
        dayDuration += 60;
        currentTime += 60;
      }
    }

    // Add transport back
    const returnTransport = transportRoutes.find(
      r => r.from === dayAttractions[dayAttractions.length - 1]?.location
    );
    if (returnTransport) {
      dayActivities.push({
        time: formatTime(currentTime),
        type: 'transport',
        transport: {
          ...returnTransport,
          to: returnTransport.from,
          from: returnTransport.to
        },
        cost: returnTransport.cost,
        duration: returnTransport.duration
      });
      dayCost += returnTransport.cost;
      totalTransfers += returnTransport.transfers;
    }

    // Generate rainy-day alternatives (indoor venues)
    const rainyAlternatives: Activity[] = attractions
      .filter(a => !a.weatherDependent && a.accessibilityScore >= accessibilityThreshold)
      .slice(0, 2)
      .map(a => ({
        time: '10:00',
        type: 'attraction' as const,
        attraction: a,
        cost: a.cost,
        duration: a.duration
      }));

    days.push({
      day: dayNum,
      activities: dayActivities,
      totalCost: Math.round(dayCost * 1.1), // 10% buffer
      totalDuration: dayDuration,
      rainyDayAlternatives: rainyAlternatives
    });
  }

  const totalCost = days.reduce((sum, d) => sum + d.totalCost, 0);

  return {
    days,
    totalCost,
    totalTransfers,
    summary: {
      ru: `${request.days}-дневный тур по Ленинградской области. Оптимизирован для комфортного путешествия (мало пересадок, минимум лестниц). Общая стоимость: ${totalCost} руб.`,
      en: `${request.days}-day tour of Leningrad Oblast. Optimized for comfortable travel (few transfers, minimal stairs). Total cost: ${totalCost} RUB.`
    }
  };
}

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}
