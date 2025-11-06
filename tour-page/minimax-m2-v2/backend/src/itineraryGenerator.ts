import { ItineraryRequest, Itinerary, ItineraryDay, Activity, Language } from './types.js';
import { attractions } from './data/attractions.js';
import { hotels } from './data/hotels.js';
import { transportOptions } from './data/transport.js';
import { restaurants } from './data/restaurants.js';

const seed = 42;
const rng = mulberry32(seed);

function mulberry32(a: number) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(rng() * array.length)];
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function calculateComfortScore(activities: Activity[], mobilityLevel: number): number {
  let score = 100;
  let totalTransfers = 0;
  let totalStairs = 0;

  for (const activity of activities) {
    if (activity.type === 'attraction' && activity.attractionId) {
      const attraction = attractions.find(a => a.id === activity.attractionId);
      if (attraction) {
        totalStairs += attraction.accessibility.stairsLevel;
        score -= (attraction.accessibility.stairsLevel - mobilityLevel) * 5;
      }
    }
  }

  return Math.max(0, Math.min(100, score));
}

function getIndoorAlternative(attractionId: string): string | undefined {
  const indoorMap: { [key: string]: string } = {
    'peterhof': 'catherine_palace',
    'kizhi': 'catherine_palace',
    'valaam': 'kronstadt',
    'viking_settlement': 'pavlovsk'
  };
  return indoorMap[attractionId];
}

export function generateItinerary(request: ItineraryRequest): Itinerary {
  const duration = request.duration;
  const mobilityLevel = request.mobilityLevel;
  const language: Language = 'ru';

  const selectedAttractions = selectAttractions(request, duration);
  const selectedHotels = selectHotels(request, selectedAttractions);
  const itineraryDays: ItineraryDay[] = [];

  let totalCost = 0;
  let totalDuration = 0;

  for (let day = 1; day <= duration; day++) {
    const dayActivities: Activity[] = [];
    let dayCost = 0;
    let dayDuration = 0;

    const dayAttractions = selectedAttractions[day - 1] || [];
    const dayHotels = selectedHotels[day - 1] || selectedHotels[0];

    for (let i = 0; i < dayAttractions.length; i++) {
      const attraction = dayAttractions[i];
      const startHour = 10 + i * 3;
      const endHour = startHour + Math.ceil(attraction.visitDuration / 60);

      const activity: Activity = {
        id: `activity-${day}-${i}`,
        type: 'attraction',
        attractionId: attraction.id,
        startTime: `${startHour.toString().padStart(2, '0')}:00`,
        endTime: `${endHour.toString().padStart(2, '0')}:00`,
        duration: attraction.visitDuration,
        cost: attraction.ticketPrice,
        indoorAlternative: request.weatherSensitive && !attraction.indoor
          ? getIndoorAlternative(attraction.id)
          : undefined,
        notes: `Комфортность: ${attraction.accessibility.restAreas} зон отдыха, Лифт: ${attraction.accessibility.elevator ? 'есть' : 'нет'}`
      };

      dayActivities.push(activity);
      dayCost += attraction.ticketPrice;
      dayDuration += attraction.visitDuration;

      if (i < dayAttractions.length - 1) {
        const restaurant = findNearbyRestaurant(attraction.location.city);
        if (restaurant) {
          const lunchActivity: Activity = {
            id: `lunch-${day}-${i}`,
            type: 'restaurant',
            restaurantId: restaurant.id,
            startTime: `${(startHour + Math.ceil(attraction.visitDuration / 60)).toString().padStart(2, '0')}:30`,
            endTime: `${(startHour + Math.ceil(attraction.visitDuration / 60) + 1).toString().padStart(2, '0')}:30`,
            duration: 60,
            cost: restaurant.avgBill
          };
          dayActivities.push(lunchActivity);
          dayCost += restaurant.avgBill;
        }
      }
    }

    if (dayHotels) {
      const hotelActivity: Activity = {
        id: `hotel-${day}`,
        type: 'hotel',
        hotelId: dayHotels.id,
        startTime: '19:00',
        endTime: '00:00',
        duration: 300,
        cost: dayHotels.pricePerNight,
        notes: `Удобства: ${dayHotels.accessibilityFeatures.elevator ? 'лифт, ' : ''}${dayHotels.accessibilityFeatures.wheelchairRoom ? 'номер для колясок' : ''}`
      };
      dayActivities.push(hotelActivity);
      dayCost += dayHotels.pricePerNight;
    }

    const dayTransport = findTransport(request.startCity, dayAttractions[0]?.location.city || 'Санкт-Петербург');
    if (dayTransport) {
      dayCost += dayTransport.price;
    }

    itineraryDays.push({
      day,
      date: new Date(Date.now() + (day - 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      activities: dayActivities,
      totalCost: dayCost,
      totalDuration: dayDuration,
      transport: dayTransport ? [dayTransport] : []
    });

    totalCost += dayCost;
    totalDuration += dayDuration;
  }

  const allActivities = itineraryDays.flatMap(d => d.activities);
  const comfortScore = calculateComfortScore(allActivities, mobilityLevel);

  const highlights = selectedAttractions.flat().slice(0, 5).map(a =>
    a.name[language]
  );

  const tips: { ru: string; en: string }[] = [
    {
      ru: 'Рекомендуем брать с собой удобную обувь на низкой подошве',
      en: 'We recommend comfortable low-heeled shoes'
    },
    {
      ru: 'Возьмите воду и легкий перекус в дорогу',
      en: 'Bring water and light snacks for the journey'
    },
    {
      ru: 'Проверьте прогноз погоды и возьмите зонт при необходимости',
      en: 'Check the weather forecast and take an umbrella if needed'
    }
  ];

  const itinerary: Itinerary = {
    id: `itinerary-${Date.now()}`,
    days: itineraryDays,
    totalCost,
    totalDuration,
    comfortScore,
    difficulty: mobilityLevel >= 4 ? 3 : mobilityLevel >= 2 ? 2 : 1,
    highlights,
    weatherPlan: {
      sunny: itineraryDays,
      rainy: itineraryDays.map(day => ({
        ...day,
        activities: day.activities.map(activity => {
          if (activity.indoorAlternative) {
            const indoorAttraction = attractions.find(a => a.id === activity.indoorAlternative);
            if (indoorAttraction) {
              return {
                ...activity,
                attractionId: indoorAttraction.id,
                cost: indoorAttraction.ticketPrice
              };
            }
          }
          return activity;
        })
      }))
    },
    tips,
    language
  };

  return itinerary;
}

function selectAttractions(request: ItineraryRequest, duration: number): any[][] {
  const filtered = attractions.filter(a => {
    if (request.interests.length > 0 && !request.interests.includes(a.category)) {
      return false;
    }
    if (a.accessibility.stairsLevel > request.mobilityLevel + 1) {
      return false;
    }
    return true;
  });

  const sorted = filtered.sort((a, b) => b.rating - a.rating);
  const perDay = Math.ceil(sorted.length / duration);
  const result: any[][] = [];

  for (let day = 0; day < duration; day++) {
    const dayAttractions = sorted.slice(day * perDay, (day + 1) * perDay);
    result.push(shuffleArray(dayAttractions).slice(0, 2));
  }

  return result;
}

function selectHotels(request: ItineraryRequest, attractionsByDay: any[][]): any[] {
  const budgetMultiplier = request.budget === 'economy' ? 0.7 : request.budget === 'comfort' ? 1.3 : 1;
  const cities = [...new Set(attractionsByDay.flat().map(a => a.location.city))];

  const suitable = hotels.filter(h => {
    if (cities.includes(h.location.city)) {
      if (h.accessibilityFeatures.elevator !== request.mobilityLevel < 3) {
        return false;
      }
      return true;
    }
    return false;
  });

  const sorted = suitable.sort((a, b) => b.rating - a.rating);
  return sorted.slice(0, request.duration);
}

function findTransport(from: string, to: string): any {
  const options = transportOptions.filter(t =>
    (t.from.includes(from) || from.includes(t.from)) &&
    (t.to.includes(to) || to.includes(t.to))
  );

  if (options.length === 0) {
    return transportOptions.find(t => t.to.includes(to)) || transportOptions[0];
  }

  return options.sort((a, b) => {
    const aScore = (5 - a.comfort.transfers) * 10 - a.price / 100;
    const bScore = (5 - b.comfort.transfers) * 10 - b.price / 100;
    return bScore - aScore;
  })[0];
}

function findNearbyRestaurant(city: string): any {
  const options = restaurants.filter(r => r.location.city === city);
  const seniorFriendly = options.filter(r => r.seniorFriendly.comfortableSeating);
  return getRandomElement(seniorFriendly.length > 0 ? seniorFriendly : options) || getRandomElement(restaurants);
}
